import { describe, expect, it } from "vitest";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { EverydayObjectSvg } from "@/visual-models/everyday-objects";
import { VisualModelView } from "@/visual-models/registry";

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
});
