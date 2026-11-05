import { describe, expect, it } from "vitest";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { EverydayObjectSvg } from "@/visual-models/everyday-objects";
import { VisualModelView } from "@/visual-models/registry";
import * as fs from "fs";
import * as path from "path";

describe("Output Audit Fixes — Download PDF & Print Parity Seam Tests", () => {
  it("Seam 1 & 2: everyday-object visual models with total count >= 4 use tiny SVG size and ConnectMatch rows have min-h-[76px]", () => {
    // 1. Check EverydayObjectSvg supports tiny size (px = 30)
    const tinySvgHtml = renderToStaticMarkup(
      React.createElement(EverydayObjectSvg, {
        objectId: "flower",
        size: "tiny",
      })
    );
    expect(tinySvgHtml).toContain('width="30"');
    expect(tinySvgHtml).toContain('height="30"');

    // 2. VisualModelView for grouped objects with total count >= 4 uses tiny size
    const group4Html = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: {
          kind: "everyday-object",
          id: "flower",
          labelAr: "زهرة",
          count: 3,
          secondaryCount: 2,
        },
      })
    );
    // Should render SVGs of width 30, not 44
    expect(group4Html).toContain('width="30"');
    expect(group4Html).not.toContain('width="44"');

    // 3. ConnectMatch rows use min-h-[76px] instead of rigid standalone h-[76px]
    const k17Html = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 17,
      seed: "6NDAVW",
      viewMode: "worksheet",
      difficultyLevel: "scaffolded",
    });
    expect(k17Html).toContain("min-h-[76px]");
    // Make sure standalone " h-[76px]" (without min-) is gone from the rendered HTML
    expect(k17Html).not.toMatch(/(?<!min-)h-\[76px\]/);
  });

  it("Seam 3: Studio mobile bottom bar includes no-print class", async () => {
    const { StudioPanel } = await import("@/components/studio/StudioPanel");
    const catalog = (
      await import("@/curriculum/catalog")
    ).getCurriculumCatalog();
    const gradeK = catalog.grades["K"];

    const panelHtml = renderToStaticMarkup(
      React.createElement(StudioPanel, {
        grade: gradeK,
        lessonNumber: 17,
        difficultyMode: "scaffolded",
        seed: "6NDAVW",
        viewMode: "worksheet",
        onSelectLesson: () => undefined,
        onSelectDifficulty: () => undefined,
        onRegenerateSeed: () => undefined,
      })
    );

    expect(panelHtml).toContain('data-studio-mobile-bar="true"');
    expect(panelHtml).toMatch(
      /data-studio-mobile-bar="true"[^>]*class="[^"]*no-print/
    );
  });

  it("Seam 4: printPdfViaIframe helper is exported as a function", async () => {
    // Import the module — if the file doesn't exist or has TS errors, this fails.
    const mod = await import("@/lib/print-pdf-iframe");
    expect(typeof mod.printPdfViaIframe).toBe("function");
  });

  it("Seam 5: numeral-trace label span includes pb-1 padding class", () => {
    // Read the source (not rendered HTML) to verify the padding class was added.
    const srcPath = path.resolve(
      __dirname,
      "../src/visual-models/unit-2-models.tsx"
    );
    const src = fs.readFileSync(srcPath, "utf8");
    // The span holding the label below NumeralTraceSvg must have pb-1
    expect(src).toMatch(/text-\[11px\] font-bold text-slate-700 pb-1/);
  });

  it("Seam 6: ConnectMatch SVG rowHeight constant is at least 96px", () => {
    const srcPath = path.resolve(
      __dirname,
      "../src/archetypes/connect-match.tsx"
    );
    const src = fs.readFileSync(srcPath, "utf8");
    // ROW_HEIGHT_PX must be >= 96 to accommodate min-h-[76px] + content
    const match = src.match(/ROW_HEIGHT_PX\s*=\s*(\d+)/);
    expect(match).not.toBeNull();
    const value = parseInt(match![1], 10);
    expect(value).toBeGreaterThanOrEqual(96);
  });

  it("Seam 7: PDF exporter initial scale floor is at least 0.70", () => {
    const srcPath = path.resolve(__dirname, "../src/pdf/pdf-exporter.ts");
    const src = fs.readFileSync(srcPath, "utf8");
    // The Math.max(X, Math.min(1, ...)) initial floor must be >= 0.70
    const match = src.match(/Math\.max\((0\.\d+),\s*Math\.min\(1,/);
    expect(match).not.toBeNull();
    const value = parseFloat(match![1]);
    expect(value).toBeGreaterThanOrEqual(0.7);
  });

  it("Seam 8: StudioCanvas delegates print to printPdfViaIframe (no inline iframe logic)", () => {
    const srcPath = path.resolve(
      __dirname,
      "../src/components/studio/StudioCanvas.tsx"
    );
    const src = fs.readFileSync(srcPath, "utf8");
    // The helper should be imported
    expect(src).toContain("printPdfViaIframe");
    // The vague Q4 comment should be gone
    expect(src).not.toContain("per Q4");
    // No inline iframe creation in StudioCanvas itself
    expect(src).not.toContain('createElement("iframe")');
    expect(src).not.toContain("createElement('iframe')");
  });

  it("Seam 9: worksheet print uses a named page with running margin boxes", () => {
    const html = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 8,
      seed: "K1-2026",
      viewMode: "worksheet",
      difficultyLevel: "scaffolded",
    });

    // Named page + running header/footer, not the old zero-margin single sheet.
    expect(html).toContain('data-worksheet-surface="true"');
    expect(html).toContain("@page worksheet-page");
    expect(html).toContain("@page worksheet-page:first");
    expect(html).toContain("@top-center");
    expect(html).toContain("@bottom-center");
    expect(html).toContain("counter(page, arabic-indic)");
    expect(html).toContain("counter(pages, arabic-indic)");
    expect(html).toContain("الروضة • الدرس ٨");
    expect(html).toContain("رمز الورقة: K١-٢٠٢٦");

    // The in-flow footer must not print alongside the running footer.
    expect(html).toContain('data-worksheet-footer="true"');
  });

  it("Seam 10: worksheet print switches the flex sheet to block flow and keeps section headers with content", () => {
    const html = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 8,
      seed: "K1-2026",
      viewMode: "worksheet",
      difficultyLevel: "scaffolded",
    });

    // Chromium drops exercises when a tall flex sheet is fragmented in print.
    expect(html).toMatch(
      /\.a4-sheet\[data-worksheet-surface="true"\]\s*\{[^}]*display:\s*block !important/s
    );
    expect(html).toMatch(
      /\[data-section-id\]\s*>\s*div:first-child\s*\{[^}]*break-after:\s*avoid/s
    );
    expect(html).toContain("box-decoration-break: clone");
  });
});
