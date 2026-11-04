import { chromium, type Browser } from "playwright";
import type { GradeId, WorksheetDifficultyMode } from "@/domain/types";
import {
  buildPrintCleanA4Html,
  type PrintCleanA4Document,
  type PrintableViewMode,
} from "@/pdf/print-document";

export interface ExportWorksheetPdfInput {
  grade: GradeId;
  lessonNumber: number;
  seed: string;
  difficultyLevel?: WorksheetDifficultyMode;
  viewMode?: PrintableViewMode;
  /** Optional base URL to render the live `/print` route when a server is listening */
  baseUrl?: string;
}

export interface ExportedPdfResult extends PrintCleanA4Document {
  pdfBuffer: Buffer;
  contentType: "application/pdf";
  pageCount: number;
}
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

/**
 * Secondary Seam — Renders a Worksheet or Answer Key via Playwright (headless Chromium / msedge)
 * with `@page { size: A4 portrait; margin: 0; }` and `print-color-adjust: exact`
 * into a downloadable A4 PDF binary buffer within the 1–2 page budget.
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

    let loadedFromUrl = false;
    if (input.baseUrl) {
      try {
        const params = new URLSearchParams({
          grade: input.grade,
          lesson: String(input.lessonNumber),
          seed: doc.bundle.seed,
          difficulty: doc.bundle.difficultyMode,
          view: doc.viewMode,
        });
        const printUrl = `${input.baseUrl.replace(/\/$/, "")}/print?${params.toString()}`;
        const resp = await page.goto(printUrl, {
          waitUntil: "networkidle",
          timeout: 5000,
        });
        loadedFromUrl = Boolean(resp && resp.ok());
      } catch {
        loadedFromUrl = false;
      }
    }

    if (loadedFromUrl) {
      await page.evaluate(() => document.fonts?.ready);
    } else {
      await page.setContent(doc.html, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts?.ready);
    }

    // Measure document height in A4 portrait pixels (297mm ≈ 1122.5px at 96 DPI)
    const contentHeightPx = await page.evaluate(() => {
      const sheet = document.querySelector(".a4-sheet") as HTMLElement | null;
      return sheet ? sheet.scrollHeight : document.body.scrollHeight;
    });

    const twoPageBudgetPx = 1122 * 1.92;
    let scale =
      contentHeightPx > twoPageBudgetPx
        ? Math.max(0.75, Math.min(1, twoPageBudgetPx / contentHeightPx)) // floor: ~12pt minimum for K-grade legibility
        : 1.0;

    let pdfBytes = await page.pdf({
      format: "A4",
      landscape: false,
      printBackground: true,
      preferCSSPageSize: true,
      scale,
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
    });

    let pdfBuffer = Buffer.from(pdfBytes);
    const estimatedPageCount = Math.max(
      1,
      Math.ceil((contentHeightPx * scale) / 1122.5)
    );
    let pageCount = Math.max(countPdfPages(pdfBuffer), estimatedPageCount);

    // If page-break-inside: avoid pushed an exercise onto page 3, allow up to 3 pages
    // before tightening scale — floor of 0.65 prevents illegibly small text for K-grade.
    if (pageCount > 3) {
      scale = Math.max(0.65, scale * (1.8 / pageCount));
      pdfBytes = await page.pdf({
        format: "A4",
        landscape: false,
        printBackground: true,
        preferCSSPageSize: true,
        scale,
        margin: {
          top: "0mm",
          right: "0mm",
          bottom: "0mm",
          left: "0mm",
        },
      });
      pdfBuffer = Buffer.from(pdfBytes);
      const retriedEstimate = Math.max(
        1,
        Math.ceil((contentHeightPx * scale) / 1122.5)
      );
      pageCount = Math.max(countPdfPages(pdfBuffer), retriedEstimate);
    }

    return {
      ...doc,
      pdfBuffer,
      contentType: "application/pdf",
      pageCount,
    };
  } finally {
    await browser.close();
  }
}
