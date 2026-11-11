import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { chromium, type Browser, type Page } from "playwright";
import {
  CANONICAL_SIZES_PX,
  PRINTABLE_AREA_MM,
} from "@/components/worksheet/layout-standard";
import {
  countPdfPages,
  createPrintHarness,
  PDF_OPTS,
  printWidthCss,
  waitForPrintFonts,
} from "../scripts/lib/print-measure.mjs";

let browser: Browser;
let page: Page;
let harness: Awaited<ReturnType<typeof createPrintHarness>>;

async function render(
  lesson: number,
  difficulty: string,
  view: "worksheet" | "answer-key"
): Promise<void> {
  await page.goto(
    `${harness.baseUrl}/print?grade=K&lesson=${lesson}&seed=LG-A1&difficulty=${difficulty}&view=${view}`,
    { waitUntil: "domcontentloaded" }
  );
  await page.waitForSelector('.a4-sheet[data-worksheet-surface="true"]');
  await page.emulateMedia({ media: "print" });
  await page.addStyleTag({ content: printWidthCss(PRINTABLE_AREA_MM) });
  await waitForPrintFonts(page);
}

describe("layout guard geometry regressions", () => {
  beforeAll(async () => {
    harness = await createPrintHarness();
    browser = await chromium.launch({ channel: "msedge", headless: true });
    const context = await browser.newContext({
      viewport: { width: 794, height: 1123 },
    });
    await context.route("https://**", (route) => {
      const hostname = new URL(route.request().url()).hostname;
      if (
        hostname === "fonts.googleapis.com" ||
        hostname === "fonts.gstatic.com"
      ) {
        return route.continue();
      }
      return route.abort();
    });
    page = await context.newPage();
  }, 120_000);

  afterAll(async () => {
    await browser?.close();
    harness?.close();
  }, 120_000);

  it("measures the explicit 48×48 ten-frame cell boxes, not painted SVG groups", async () => {
    await render(59, "scaffolded", "worksheet");

    const geometry = await page.evaluate(() => {
      const rect = (element: Element) => {
        const bounds = element.getBoundingClientRect();
        return { width: bounds.width, height: bounds.height };
      };
      return {
        frames: Array.from(
          document.querySelectorAll('[data-visual-model="ten-frame"]')
        ).map(rect),
        cells: Array.from(
          document.querySelectorAll('[data-rtl-cell-box="true"]')
        ).map(rect),
      };
    });

    expect(geometry.frames.length).toBeGreaterThan(0);
    expect(geometry.cells.length).toBeGreaterThan(0);
    expect(geometry.frames).toEqual(
      expect.arrayContaining([
        {
          width: CANONICAL_SIZES_PX.tenFrameBox.width,
          height: CANONICAL_SIZES_PX.tenFrameBox.height,
        },
      ])
    );
    expect(
      geometry.cells.every(
        (cell) =>
          cell.width === CANONICAL_SIZES_PX.fiveFrameCell.width &&
          cell.height === CANONICAL_SIZES_PX.fiveFrameCell.height
      )
    ).toBe(true);

    const pdf = await page.pdf(PDF_OPTS);
    expect(countPdfPages(Buffer.from(pdf))).toBeLessThanOrEqual(2);
  }, 120_000);

  it("keeps ClassifyAndCount answer slots inside their 212px columns in both views", async () => {
    for (const view of ["worksheet", "answer-key"] as const) {
      await render(6, "scaffolded", view);

      const geometry = await page.evaluate(() => {
        const violations: number[] = [];
        for (const cell of document.querySelectorAll(
          '[data-exercise-columns="three"] > *'
        )) {
          const cellRect = cell.getBoundingClientRect();
          for (const slot of cell.querySelectorAll("[data-answer-slot]")) {
            const slotRect = slot.getBoundingClientRect();
            violations.push(
              Math.max(
                0,
                cellRect.left - slotRect.left,
                slotRect.right - cellRect.right,
                cellRect.top - slotRect.top,
                slotRect.bottom - cellRect.bottom
              )
            );
          }
        }
        return violations;
      });

      expect(geometry.length).toBeGreaterThan(0);
      expect(geometry.every((overflow) => overflow === 0)).toBe(true);
      const pdf = await page.pdf(PDF_OPTS);
      expect(countPdfPages(Buffer.from(pdf))).toBeLessThanOrEqual(2);
    }
  }, 120_000);

  it("keeps K-44 picture graphs inside their exercise cards and column cells (batch-close sweep regression)", async () => {
    for (const view of ["worksheet", "answer-key"] as const) {
      await render(44, "scaffolded", view);

      // Mirrors the layout guard's §3.1 containment check for the
      // picture-graph model: the graph must sit inside its exercise card and
      // column cell instead of overflowing them.
      const overflows = await page.evaluate(() => {
        const excess = (el: Element, container: Element): number => {
          const a = el.getBoundingClientRect();
          const b = container.getBoundingClientRect();
          return Math.round(
            Math.max(
              b.left - a.left,
              a.right - b.right,
              b.top - a.top,
              a.bottom - b.bottom
            )
          );
        };
        const results: number[] = [];
        for (const graph of document.querySelectorAll(
          '[data-visual-model="picture-graph"], svg[data-graph-type="picture-graph"]'
        )) {
          const card = graph.closest("[data-exercise-id]");
          if (card) results.push(excess(graph, card));
          const column = graph.closest("[data-exercise-columns] > *");
          if (column) results.push(excess(graph, column));
        }
        return results;
      });

      expect(overflows.length).toBeGreaterThan(0);
      expect(overflows.every((over) => over <= 0)).toBe(true);
    }
  }, 120_000);
});
