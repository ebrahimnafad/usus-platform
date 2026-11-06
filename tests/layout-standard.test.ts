import { describe, expect, it, vi } from "vitest";
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
import { exportWorksheetPdf, PRINT_SCALE } from "@/pdf/pdf-exporter";
import { VisualModelView } from "@/visual-models/registry";

let mockPdfPageCount = 3;

vi.mock("playwright", () => ({
  chromium: {
    launch: async () => ({
      newPage: async () => ({
        emulateMedia: async () => undefined,
        goto: async () => ({ ok: () => true }),
        setContent: async () => undefined,
        evaluate: async () => undefined,
        pdf: async () => {
          const pages = Array.from(
            { length: mockPdfPageCount },
            (_, idx) => `${idx + 1} 0 obj << /Type /Page >> endobj`
          ).join("\n");
          return Buffer.from(`%PDF-1.4\n${pages}\n`, "latin1");
        },
      }),
      close: async () => undefined,
    }),
  },
}));

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
      fiveFrameWidth: 240,
      numberBondCircle: { width: 56, height: 56 },
      numberBondBox: { width: 212, height: 160 },
      equationStripHeight: 48,
      balanceScaleBox: { width: 212, height: 136 },
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

  it("§2.2 exportWorksheetPdf reports withinPageBudget by default and throws when enforcePageBudget is true and pageCount > PAGE_BUDGET", async () => {
    mockPdfPageCount = 3;

    const unforced = await exportWorksheetPdf({
      grade: "K",
      lessonNumber: 1,
      seed: "BUDGET-TEST",
      difficultyLevel: "scaffolded",
      viewMode: "worksheet",
    });
    expect(unforced.pageCount).toBe(3);
    expect(unforced.withinPageBudget).toBe(false);

    await expect(
      exportWorksheetPdf({
        grade: "K",
        lessonNumber: 1,
        seed: "BUDGET-TEST",
        difficultyLevel: "scaffolded",
        viewMode: "worksheet",
        enforcePageBudget: true,
      })
    ).rejects.toThrow(
      "Worksheet PDF exceeded the 2-page budget (3 pages) at full scale"
    );

    mockPdfPageCount = 2;
    const withinBudget = await exportWorksheetPdf({
      grade: "K",
      lessonNumber: 1,
      seed: "BUDGET-TEST",
      difficultyLevel: "scaffolded",
      viewMode: "worksheet",
      enforcePageBudget: true,
    });
    expect(withinBudget.pageCount).toBe(2);
    expect(withinBudget.withinPageBudget).toBe(true);
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

  it("§3.4 FiveFrameSvg renders a 240px wide frame with five 48×48px RTL cells and 13px cell labels", () => {
    const html = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 12,
      seed: "LS-K12-FRAME",
      viewMode: "worksheet",
      difficultyLevel: "scaffolded",
    });
    expect(html).toContain('width="240"');
    expect(html).toContain('viewBox="0 0 240 60"');
    expect(html).toContain('data-cell-box="48x48"');
    expect(html).not.toContain('font-size="8.5"');
  });

  it("§3.4 & §4 AnswerSlot and AnswerLine render exact canonical dimensions and type scale in worksheet and answer-key modes", () => {
    const htmlW = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 12,
      seed: "LS-SLOT-SCALE",
      viewMode: "worksheet",
      difficultyLevel: "scaffolded",
    });
    const htmlA = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 12,
      seed: "LS-SLOT-SCALE",
      viewMode: "answer-key",
      difficultyLevel: "scaffolded",
    });

    // Solved AnswerLine must carry ANSWER_LINE_SIZE_CLASS (h-8 w-40 = 32×160px)
    expect(htmlA).toMatch(
      /data-answer-slot="solved-line"[^>]*class="[^"]*h-8 w-40/
    );
    // Digit AnswerSlot uses 28px (text-[28px])
    expect(htmlW).toMatch(
      /data-answer-slot="write"[^>]*class="[^"]*text-\[28px\]/
    );
    expect(htmlA).toMatch(
      /data-answer-slot="solved-digit"[^>]*class="[^"]*text-\[28px\]/
    );
    // No sub-12px classes on WorksheetSurface chrome
    expect(htmlW).not.toMatch(/text-\[(8|8\.5|9|9\.5|10|10\.5|11|11\.5)px\]/);
    expect(htmlA).not.toMatch(/text-\[(8|8\.5|9|9\.5|10|10\.5|11|11\.5)px\]/);
  });

  it("§3.2 & §4 all archetypes use ExerciseColumns (1 / 2 / 3) and only constitution §4 type sizes (no text below 12px)", () => {
    const archetypeLessons = [
      { lessonNumber: 1, archetype: "ConnectMatch" },
      { lessonNumber: 5, archetype: "ClassifyAndCount" },
      { lessonNumber: 9, archetype: "PatternComplete" },
      { lessonNumber: 12, archetype: "ModelCountAndTrace" },
      { lessonNumber: 20, archetype: "PictureGraphRead" },
      { lessonNumber: 22, archetype: "SequenceAndZero" },
      { lessonNumber: 26, archetype: "SubitizePartWhole" },
      { lessonNumber: 29, archetype: "JoinParts" },
      { lessonNumber: 36, archetype: "JudgeEquality" },
      { lessonNumber: 40, archetype: "TakeAway" },
    ];

    for (const { lessonNumber, archetype } of archetypeLessons) {
      for (const viewMode of ["worksheet", "answer-key"] as const) {
        const html = renderWorksheetSurface({
          grade: "K",
          lessonNumber,
          seed: `ARCH-STD-K${lessonNumber}`,
          viewMode,
          difficultyLevel: "scaffolded",
        });

        expect(html, `${archetype} in K-${lessonNumber}`).toContain(
          `data-archetype="${archetype}"`
        );
        expect(html, `${archetype} uses ExerciseColumns`).toMatch(
          /data-exercise-columns="(one|two|three)"/
        );
        // No sub-12px or off-scale Tailwind classes
        expect(
          html,
          `${archetype} (${viewMode}) has no sub-12px or off-scale text classes`
        ).not.toMatch(
          /text-\[(8|8\.5|9|9\.5|10|10\.5|11|11\.5)px\]|\btext-(sm|base|lg|xl|2xl|3xl|4xl)\b/
        );
      }
    }
  });

  it("§3.4 NumberBond and EquationStrip Visual Models render exact canonical attributes, RTL ordering, and unknown/solved Answer Slots", () => {
    const bondUnknownSpec = {
      kind: "number-bond" as const,
      id: "nb-3-2-unknown-total",
      labelAr: "رابطة الأعداد: ٣ و٢",
      count: 3,
      secondaryCount: 2,
      meta: {
        part1: 3,
        part2: 2,
        total: 5,
        missingPosition: "total",
      },
    };

    const htmlBondW = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: bondUnknownSpec,
        solved: false,
      })
    );
    const htmlBondA = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: bondUnknownSpec,
        solved: true,
      })
    );

    expect(htmlBondW).toContain('data-visual-model="number-bond"');
    expect(htmlBondW).toContain("width:212px");
    expect(htmlBondW).toContain("height:160px");
    expect(htmlBondW.match(/data-number-bond-circle=/g)).toHaveLength(3);
    expect(htmlBondW).toContain('data-number-bond-circle="total"');
    expect(htmlBondW).toContain('data-number-bond-circle="part-right"');
    expect(htmlBondW).toContain('data-number-bond-circle="part-left"');
    expect(htmlBondW).toContain('data-answer-slot="unknown"');
    expect(htmlBondA).toContain('data-answer-slot="solved-digit"');
    expect(htmlBondA).toContain("٥");

    const eqStandardSpec = {
      kind: "equation-strip" as const,
      id: "eq-3-2-5",
      labelAr: "معادلة الجمع: ٣ + ٢ = ٥",
      count: 3,
      secondaryCount: 2,
      meta: {
        part1: 3,
        part2: 2,
        total: 5,
        missingPosition: "total",
        layout: "standard",
      },
    };
    const eqTotalFirstSpec = {
      kind: "equation-strip" as const,
      id: "eq-total-first-5-3-2",
      labelAr: "معادلة الجمع: ٥ = ٣ + ٢",
      count: 3,
      secondaryCount: 2,
      meta: {
        part1: 3,
        part2: 2,
        total: 5,
        missingPosition: "part1",
        layout: "total-first",
      },
    };

    const htmlEqW = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: eqStandardSpec,
        solved: false,
      })
    );
    const htmlEqA = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: eqStandardSpec,
        solved: true,
      })
    );
    const htmlEqTotalFirst = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: eqTotalFirstSpec,
        solved: false,
      })
    );

    expect(htmlEqW).toContain('data-visual-model="equation-strip"');
    expect(htmlEqW).toContain("height:48px");
    expect(htmlEqW).toContain('data-equation-layout="standard"');
    expect(htmlEqW).toContain('data-answer-slot="unknown"');
    expect(htmlEqA).toContain('data-answer-slot="solved-digit"');
    expect(htmlEqTotalFirst).toContain('data-equation-layout="total-first"');
    expect(htmlEqTotalFirst).toContain('data-missing-position="part1"');
  });
});
