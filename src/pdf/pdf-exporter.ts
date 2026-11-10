import { chromium, type Browser, type Page } from "playwright";
import type { GradeId, WorksheetDifficultyMode } from "@/domain/types";
import printFonts from "@/config/print-fonts.json";
import {
  buildPrintCleanA4Html,
  type PrintCleanA4Document,
  type PrintableViewMode,
} from "@/pdf/print-document";
import { PAGE_BUDGET } from "@/components/worksheet/layout-standard";

export interface ExportWorksheetPdfInput {
  grade: GradeId;
  lessonNumber: number;
  seed: string;
  difficultyLevel?: WorksheetDifficultyMode;
  viewMode?: PrintableViewMode;
  /** Optional base URL to render the live `/print` route when a server is listening */
  baseUrl?: string;
  /** When true, throws an Error if the rendered PDF exceeds PAGE_BUDGET at full scale */
  enforcePageBudget?: boolean;
}

export interface ExportedPdfResult extends PrintCleanA4Document {
  pdfBuffer: Buffer;
  contentType: "application/pdf";
  pageCount: number;
  withinPageBudget: boolean;
}

export const PRINT_SCALE = 1;
export function countPdfPages(pdfBuffer: Buffer): number {
  const rawLatin1 = pdfBuffer.toString("latin1");
  const pageMatches = rawLatin1.match(/\/Type\s*\/Page\b(?!s)/g);
  if (pageMatches && pageMatches.length > 0) {
    return pageMatches.length;
  }
  const countMatch = rawLatin1.match(/\/Count\s+(\d+)/);
  if (countMatch) {
    return parseInt(countMatch[1], 10);
  }
  return 1;
}

const EDGE_EXECUTABLE_CANDIDATES = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];

async function launchHeadlessBrowser(): Promise<Browser> {
  try {
    return await chromium.launch({
      channel: "msedge",
      headless: true,
    });
  } catch {
    for (const executablePath of EDGE_EXECUTABLE_CANDIDATES) {
      try {
        return await chromium.launch({
          executablePath,
          headless: true,
        });
      } catch {
        // Continue to next fallback
      }
    }
    throw new Error(
      "Microsoft Edge is required for PDF export but was not found."
    );
  }
}

async function waitForPrintFonts(page: Page): Promise<void> {
  await page.evaluate(async (families) => {
    await Promise.all(
      families.map((family) =>
        document.fonts.load(
          `400 16px "${family}"`,
          family === "Cairo" ? "الروضة" : "Worksheet"
        )
      )
    );
    await document.fonts.ready;

    const loadedFamilies = new Set(
      Array.from(document.fonts)
        .filter((font) => font.status === "loaded")
        .map((font) => font.family.replaceAll('"', ""))
    );
    for (const family of families) {
      if (!loadedFamilies.has(family)) {
        throw new Error(`Required print font "${family}" did not load`);
      }
    }
  }, printFonts.families);
}

/**
 * Secondary Seam — Renders a Worksheet or Answer Key via Playwright (headless Chromium / msedge)
 * with a named A4 portrait page (`worksheet-page`), running margin boxes, and
 * `print-color-adjust: exact` into a downloadable A4 PDF binary buffer at
 * full scale, reporting whether it stays within the 2-page budget.
 */
export async function exportWorksheetPdf(
  input: ExportWorksheetPdfInput
): Promise<ExportedPdfResult> {
  const doc = await buildPrintCleanA4Html(input);
  const browser = await launchHeadlessBrowser();

  try {
    const page = await browser.newPage({
      viewport: { width: 794, height: 1123 },
    });

    await page.emulateMedia({ media: "print" });

    if (input.baseUrl) {
      const params = new URLSearchParams({
        grade: input.grade,
        lesson: String(input.lessonNumber),
        seed: doc.bundle.seed,
        difficulty: doc.bundle.difficultyMode,
        view: doc.viewMode,
      });
      const printUrl = `${input.baseUrl.replace(/\/$/, "")}/print?${params.toString()}`;
      const response = await page.goto(printUrl, {
        waitUntil: "domcontentloaded",
      });
      if (!response?.ok()) {
        throw new Error(
          `Printable worksheet route failed: ${response?.status() ?? "no response"} (${printUrl})`
        );
      }
      await page.waitForSelector('.a4-sheet[data-worksheet-surface="true"]', {
        state: "attached",
      });
      await page.waitForFunction(
        (href) =>
          Array.from(
            document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
          ).some((link) => link.href === href && link.sheet),
        printFonts.stylesheetHref
      );
      await waitForPrintFonts(page);
    } else {
      await page.setContent(doc.html, { waitUntil: "domcontentloaded" });
      await page.waitForSelector('.a4-sheet[data-worksheet-surface="true"]', {
        state: "attached",
      });
      await page.waitForFunction(
        (href) =>
          Array.from(
            document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
          ).some((link) => link.href === href && link.sheet),
        printFonts.stylesheetHref
      );
      await waitForPrintFonts(page);
    }

    // Always full scale (ADR-0013): every standardized size prints at its
    // real size. A sheet over budget is a blueprint error caught by the
    // layout guard, never shrunk here.
    const pdfBytes = await page.pdf({
      format: "A4",
      landscape: false,
      printBackground: true,
      preferCSSPageSize: true,
      scale: PRINT_SCALE,
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
    });

    const pdfBuffer = Buffer.from(pdfBytes);
    const pageCount = countPdfPages(pdfBuffer);
    const withinPageBudget = pageCount <= PAGE_BUDGET;

    if (input.enforcePageBudget && !withinPageBudget) {
      throw new Error(
        `Worksheet PDF exceeded the ${PAGE_BUDGET}-page budget (${pageCount} pages) at full scale`
      );
    }

    return {
      ...doc,
      pdfBuffer,
      contentType: "application/pdf",
      pageCount,
      withinPageBudget,
    };
  } finally {
    await browser.close();
  }
}
