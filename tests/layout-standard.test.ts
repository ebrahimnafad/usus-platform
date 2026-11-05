import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CANONICAL_SIZES_PX,
  COLUMN_GAP_PX,
  COLUMN_WIDTHS_PX,
  EXERCISE_BODY_WIDTH_PX,
  MIN_TEXT_PX,
  PAGE_BUDGET,
  PRINTABLE_AREA_MM,
  PROMPT_MAX_LINES,
  TYPE_SCALE_PX,
} from "@/components/worksheet/layout-standard";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { PRINT_SCALE } from "@/pdf/pdf-exporter";

/**
 * These values are copied from WORKSHEET_CONSTITUTION.md §3–4 on purpose.
 * If this test fails, the code and the constitution have drifted apart:
 * amend the constitution (§1.3) before changing the code.
 */
describe("Layout standard matches WORKSHEET_CONSTITUTION.md", () => {
  it("§3.2 exercise card width and column layouts", () => {
    expect(EXERCISE_BODY_WIDTH_PX).toBe(660);
    expect(COLUMN_GAP_PX).toBe(12);
    expect(COLUMN_WIDTHS_PX).toEqual({ 1: 660, 2: 324, 3: 212 });
  });

  it("§3.2 every column layout fills the card width exactly", () => {
    for (const columns of [1, 2, 3] as const) {
      const total =
        COLUMN_WIDTHS_PX[columns] * columns + COLUMN_GAP_PX * (columns - 1);
      expect(total, `${columns}-column layout`).toBe(EXERCISE_BODY_WIDTH_PX);
    }
  });

  it("§3.4 canonical sizes", () => {
    expect(CANONICAL_SIZES_PX).toEqual({
      answerSlotDigit: { width: 48, height: 48 },
      answerSlotLine: { width: 160, height: 32 },
      fiveFrameCell: { width: 48, height: 48 },
      numberBondCircle: { width: 56, height: 56 },
      numberBondBox: { width: 212, height: 160 },
      equationStripHeight: 48,
    });
  });

  it("§4 type scale, text floor, and prompt length", () => {
    expect(TYPE_SCALE_PX).toEqual({
      sectionTitle: 20,
      prompt: 16,
      label: 13,
      digit: 28,
      metadata: 12,
    });
    expect(MIN_TEXT_PX).toBe(12);
    expect(PROMPT_MAX_LINES).toBe(2);
  });

  it("§2.2 full-scale print, page budget, and printable area (ADR-0012, ADR-0013)", () => {
    expect(PRINT_SCALE).toBe(1);
    expect(PAGE_BUDGET).toBe(2);
    expect(PRINTABLE_AREA_MM).toEqual({ width: 190, height: 273 });
  });
});

describe("Exercise layout primitives", () => {
  it("ExerciseColumns renders fixed 1, 2, and 3 column widths from the standard", () => {
    const cases = [
      { columns: 1 as const, attr: "one", width: 660 },
      { columns: 2 as const, attr: "two", width: 324 },
      { columns: 3 as const, attr: "three", width: 212 },
    ];
    for (const { columns, attr, width } of cases) {
      const html = renderToStaticMarkup(
        React.createElement(ExerciseColumns, {
          columns,
          children: React.createElement("span", null, "أ"),
        })
      );
      expect(html).toContain(`data-exercise-columns="${attr}"`);
      expect(html).toContain(
        `grid-template-columns:repeat(${columns}, ${width}px)`
      );
      expect(html).toContain("column-gap:12px");
      expect(html).toContain("row-gap:12px");
    }
  });

  it("every exercise renders its content inside the fixed-width body", () => {
    const html = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 12,
      seed: "LS-K12",
      viewMode: "worksheet",
      difficultyLevel: "scaffolded",
    });
    const cards = html.match(/data-exercise-id=/g) ?? [];
    const bodies = html.match(/data-exercise-body="true"/g) ?? [];
    const prompts = html.match(/data-exercise-prompt="true"/g) ?? [];
    expect(cards.length).toBeGreaterThan(0);
    expect(bodies.length).toBe(cards.length);
    expect(prompts.length).toBe(cards.length);
    expect(html).toContain("width:660px");
    expect(html).toContain(`font-size: ${TYPE_SCALE_PX.metadata}px`);
  });
});
