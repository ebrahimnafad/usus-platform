import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "@/lib/seed";
import { getExerciseArchetype } from "@/archetypes/registry";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { CANONICAL_SIZES_PX } from "@/components/worksheet/layout-standard";
import { VisualModelView } from "@/visual-models/registry";
import {
  createNumtangaGridSpec,
  type NumtangaGridCellKey,
} from "@/visual-models/unit-7-models";
import type { NumtangaData } from "@/archetypes/numtanga";
import "@/registry/bootstrap";

const NUMTANGA_SEEDS = Array.from({ length: 24 }, (_, i) => `NTG-${i + 1}`);
const DIFFICULTY_TIERS = ["Easy", "Intermediate", "Advanced"] as const;

describe("Ticket 03 (Unit 7) — Slice 1: Numtanga pyramid generation (§7.4)", () => {
  it("generates pyramids where every upper cell equals the sum of the two adjacent lower cells, within the max total", () => {
    const catalog = getCurriculumCatalog();
    const lesson81 = catalog.getLesson("K", 81)!;
    const numtangaDef = getExerciseArchetype("Numtanga");

    for (const seed of NUMTANGA_SEEDS) {
      for (const difficultyLevel of DIFFICULTY_TIERS) {
        const ex = numtangaDef.generate({
          lesson: lesson81,
          sourceLessonId: "K-81",
          sectionId: "challenge",
          exerciseIndex: 0,
          exerciseNumber: 4,
          difficultyLevel,
          rng: createSeededRandom(`${seed}-INVARIANTS-${difficultyLevel}`),
          spec: {
            archetype: "Numtanga",
            params: {
              pyramidCount: 2,
              blankCount: difficultyLevel === "Advanced" ? 2 : 1,
              maxTotal: difficultyLevel === "Easy" ? 8 : 10,
            },
          },
        });

        const data = ex.data as NumtangaData;
        expect(data.kind).toBe("Numtanga");
        expect(data.pyramids).toHaveLength(2);
        const maxTotal = difficultyLevel === "Easy" ? 8 : 10;

        const allFactKeys: string[] = [];
        for (const pyramid of data.pyramids) {
          const cells = pyramid.cells;
          // Upper cells must equal the sum of the two adjacent lower cells
          expect(cells.midRight.value).toBe(
            cells.bottomRight.value + cells.bottomMiddle.value
          );
          expect(cells.midLeft.value).toBe(
            cells.bottomMiddle.value + cells.bottomLeft.value
          );
          expect(cells.top.value).toBe(
            cells.midRight.value + cells.midLeft.value
          );

          // Every cell value stays within the sanctioned range (sums ≤ maxTotal, §spec)
          for (const cell of Object.values(cells)) {
            expect(cell.value).toBeGreaterThanOrEqual(1);
            expect(cell.value).toBeLessThanOrEqual(maxTotal);
          }

          // Only middle/top cells may be blank; bottom row stays given
          const blankCells = Object.entries(cells).filter(([, c]) => c.blank);
          expect(blankCells.length).toBe(
            difficultyLevel === "Advanced" ? 2 : 1
          );
          for (const [key] of blankCells) {
            expect(
              key === "top" || key === "midLeft" || key === "midRight"
            ).toBe(true);
          }

          allFactKeys.push(...pyramid.factKeys);
          // Blank facts solve by pure addition of adjacent known values
          for (const key of pyramid.blankKeys) {
            if (key === "top") {
              expect(pyramid.cells.top.blank).toBe(true);
            } else if (key === "midLeft") {
              expect(pyramid.cells.midLeft.blank).toBe(true);
            } else if (key === "midRight") {
              expect(pyramid.cells.midRight.blank).toBe(true);
            } else {
              throw new Error("unexpected blank key " + key);
            }
          }
        }

        // §7.3 — no fact repeats within one Exercise
        expect(new Set(allFactKeys).size).toBe(allFactKeys.length);
      }
    }
  });

  it("is deterministic for the same seed and varies across seeds", () => {
    const catalog = getCurriculumCatalog();
    const lesson81 = catalog.getLesson("K", 81)!;
    const numtangaDef = getExerciseArchetype("Numtanga");

    const build = (seed: string) =>
      numtangaDef.generate({
        lesson: lesson81,
        sourceLessonId: "K-81",
        sectionId: "challenge",
        exerciseIndex: 0,
        exerciseNumber: 4,
        difficultyLevel: "Intermediate",
        rng: createSeededRandom(seed),
        spec: {
          archetype: "Numtanga",
          params: { pyramidCount: 2, blankCount: 1, maxTotal: 10 },
        },
      });

    const a1 = build("NTG-DETERMINISM");
    const a2 = build("NTG-DETERMINISM");
    const b = build("NTG-OTHER");

    expect(JSON.stringify(a1.data)).toBe(JSON.stringify(a2.data));
    expect(JSON.stringify(a1.data)).not.toBe(JSON.stringify(b.data));
  });

  it("supports a 3-blank pyramid at Advanced (top and both middles) solved by chained addition", () => {
    const catalog = getCurriculumCatalog();
    const lesson83 = catalog.getLesson("K", 83)!;
    const numtangaDef = getExerciseArchetype("Numtanga");

    const ex = numtangaDef.generate({
      lesson: lesson83,
      sourceLessonId: "K-83",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("NTG-THREE-BLANKS"),
      spec: {
        archetype: "Numtanga",
        params: { blankCount: 3, maxTotal: 10, pyramidCount: 2 },
      },
    });

    const data = ex.data as NumtangaData;
    for (const pyramid of data.pyramids) {
      expect(pyramid.blankKeys.length).toBe(3);
      expect(pyramid.cells.bottomLeft.blank).toBe(false);
      expect(pyramid.cells.bottomMiddle.blank).toBe(false);
      expect(pyramid.cells.bottomRight.blank).toBe(false);
      expect(pyramid.cells.midLeft.blank).toBe(true);
      expect(pyramid.cells.midRight.blank).toBe(true);
      expect(pyramid.cells.top.blank).toBe(true);
    }
  });
});

describe("Ticket 03 (Unit 7) — Slice 2: Numtanga Grid visual model (§3.4, §8.1, §8.2)", () => {
  it("registers a canonical 324×212 Numtanga Grid", () => {
    expect(CANONICAL_SIZES_PX.numtangaGridBox).toEqual({
      width: 324,
      height: 212,
    });

    const spec = createNumtangaGridSpec({
      cells: {
        top: 7,
        midRight: 3,
        midLeft: 4,
        bottomRight: 1,
        bottomMiddle: 2,
        bottomLeft: 2,
      },
      blanks: ["top"],
      colorTheme: "coral",
    });
    const htmlW = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );
    const htmlA = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: true })
    );

    expect(htmlW).toContain('data-visual-model="numtanga-grid"');
    expect(htmlW).toContain("width:324px");
    expect(htmlW).toContain("height:212px");
    // Unknown slot shows ؟ on the worksheet (§8.1)
    expect(htmlW).toContain('data-answer-slot="unknown"');
    expect(htmlW).toContain("؟");
    // Solved slot shows the digit at the same size (§8.2)
    expect(htmlA).toContain('data-answer-slot="solved-digit"');
    expect(htmlA).toContain("٧");
    expect(htmlA).not.toContain("؟");
    // Given cells render Eastern Arabic digits
    expect(htmlW).toContain("١");
    expect(htmlW).toContain("٢");
    expect(htmlW).toContain("٣");
    expect(htmlW).toContain("٤");
  });

  it("renders blank-position marks for seeded blanks", () => {
    const spec = createNumtangaGridSpec({
      cells: {
        top: 9,
        midRight: 5,
        midLeft: 4,
        bottomRight: 2,
        bottomMiddle: 3,
        bottomLeft: 1,
      },
      blanks: ["midLeft", "midRight"],
      colorTheme: "sky",
    });
    const html = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );
    expect(html.match(/data-answer-slot="unknown"/g)).toHaveLength(2);
  });
});

describe("Ticket 03 (Unit 7) — Slice 3: Numtanga archetype render", () => {
  it("renders two pyramid cards in an RTL row with exercise columns and a prompt", () => {
    const catalog = getCurriculumCatalog();
    const lesson81 = catalog.getLesson("K", 81)!;
    const numtangaDef = getExerciseArchetype("Numtanga");

    const ex = numtangaDef.generate({
      lesson: lesson81,
      sourceLessonId: "K-81",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("NTG-RENDER-1"),
      spec: {
        archetype: "Numtanga",
        params: { pyramidCount: 2, blankCount: 1, maxTotal: 10 },
      },
    });

    expect(ex.archetype).toBe("Numtanga");
    expect(ex.titleAr).toContain("نمتنغا");

    const htmlW = renderToStaticMarkup(
      numtangaDef.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      numtangaDef.render({ exercise: ex, mode: "answer-key" })
    );

    expect(htmlW).toMatch(/data-exercise-columns="(one|two)"/);
    expect(htmlW.match(/data-visual-model="numtanga-grid"/g)).toHaveLength(2);
    expect(htmlW).toContain('data-answer-slot="unknown"');
    expect(htmlA).toContain('data-answer-slot="solved-digit"');
    expect(htmlA).not.toContain("؟");
  });
});

describe("Ticket 03 (Unit 7) — Slice 4: Lessons K-81, K-82, K-83 registration and render", () => {
  const lessonExpectations: Record<
    number,
    {
      practiceRepresentation?: string;
      practiceAction?: string;
      responseForm?: string;
    }
  > = {
    81: {
      practiceRepresentation: "ten-frame-and-digit",
      practiceAction: "write",
      responseForm: "equation",
    },
    82: {
      practiceRepresentation: "ten-frame",
      practiceAction: "draw-counters",
      responseForm: "number-bond",
    },
    83: {
      practiceRepresentation: "ten-frame",
      practiceAction: "draw-counters",
      responseForm: "equation",
    },
  };

  for (const lessonNum of [81, 82, 83]) {
    it(`generates and renders Lesson K-${lessonNum} across worksheet and answer-key without Western numerals`, () => {
      const seed = `TEST-K${lessonNum}`;
      const generated = generateWorksheet({
        grade: "K",
        lessonNumber: lessonNum,
        seed,
        difficultyLevel: "scaffolded",
      });

      expect(generated.worksheet.sections).toHaveLength(3);
      expect(generated.answerKey.sections).toHaveLength(3);
      // Every answer key exercise carries a Strategy Hint (§8.3)
      for (const section of generated.worksheet.sections) {
        for (const ex of section.exercises) {
          expect(
            generated.answerKey.strategyHintsByExerciseId[ex.id]
          ).toBeTruthy();
        }
      }

      const practice = generated.worksheet.sections[1].exercises[0];
      const practiceData = practice.data as Record<string, unknown>;
      const expectation = lessonExpectations[lessonNum];
      expect(practice.archetype).toBe("JoinParts");
      expect(practiceData.representation).toBe(
        expectation.practiceRepresentation
      );
      expect(practiceData.action).toBe(expectation.practiceAction);
      expect(practiceData.responseForm).toBe(expectation.responseForm);

      const challenge = generated.worksheet.sections[2].exercises;
      expect(challenge.some((ex) => ex.archetype === "Numtanga")).toBe(true);

      // Warm-up source follows the authored prerequisite chain (§5.3)
      const expectedWarmUpSource: Record<number, string> = {
        81: "K-36",
        82: "K-81",
        83: "K-82",
      };
      expect(generated.warmUpSourceLessonId).toBe(
        expectedWarmUpSource[lessonNum]
      );

      for (const viewMode of ["worksheet", "answer-key"] as const) {
        const html = renderWorksheetSurface({
          grade: "K",
          lessonNumber: lessonNum,
          seed,
          difficultyLevel: "scaffolded",
          viewMode,
        });
        const western = findWesternNumeralsInRenderedHtml(html);
        expect(
          western,
          `Western numerals found in K-${lessonNum} (${viewMode})`
        ).toEqual([]);
      }
    });
  }
});
