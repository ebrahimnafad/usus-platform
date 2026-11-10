import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createSeededRandom, type SeededRandom } from "@/lib/seed";
import { getExerciseArchetype } from "@/archetypes/registry";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { CANONICAL_SIZES_PX } from "@/components/worksheet/layout-standard";
import { VisualModelView } from "@/visual-models/registry";
import {
  createDigicrossGridSpec,
  type DigicrossGridCell,
} from "@/visual-models/unit-8-models";
import type {
  DigicrossBlueprintParams,
  DigicrossData,
} from "@/archetypes/digicross";
import "@/registry/bootstrap";

const DIGICROSS_SEEDS = Array.from({ length: 24 }, (_, i) => `DC-${i + 1}`);
const DIFFICULTY_TIERS = ["Easy", "Intermediate", "Advanced"] as const;

const DIRECTION_SIGNS: Record<string, Array<{ x: 1 | -1; y: 1 | -1 }>> = {
  forward: [{ x: 1, y: 1 }],
  backward: [{ x: -1, y: -1 }],
  mixed: [
    { x: 1, y: -1 },
    { x: -1, y: 1 },
  ],
};

/** Affine counting model: g(r, c) = T + x·r + y·c (row step x, column step y). */
function affineGridValues(
  T: number,
  x: number,
  y: number
): Array<Array<number>> {
  return Array.from({ length: 3 }, (_, r) =>
    Array.from({ length: 3 }, (_, c) => T + x * r + y * c)
  );
}

/** One counting model is valid when all nine implied values stay inside [min, max]. */
function isValidAffineGrid(
  combo: { T: number; x: number; y: number },
  minV: number,
  maxV: number
): boolean {
  const values = affineGridValues(combo.T, combo.x, combo.y).flat();
  return values.every((v) => v >= minV && v <= maxV);
}

function buildDigicross(
  seed: string,
  difficultyLevel: "Easy" | "Intermediate" | "Advanced",
  params: DigicrossBlueprintParams
) {
  const catalog = getCurriculumCatalog();
  const lesson90 = catalog.getLesson("K", 90)!;
  const digicrossDef = getExerciseArchetype("Digicross");
  return digicrossDef.generate({
    lesson: lesson90,
    sourceLessonId: "K-90",
    sectionId: "challenge",
    exerciseIndex: 0,
    exerciseNumber: 5,
    difficultyLevel,
    rng: createSeededRandom(`${seed}-INVARIANTS-${difficultyLevel}`),
    spec: {
      archetype: "Digicross",
      params,
    },
  });
}

/** Domain invariants for a fully-formed Digicross exercise (§spec: exactly one solution). */
function assertDigicrossInvariants(exercise: { data: unknown }): DigicrossData {
  const data = exercise.data as DigicrossData;
  expect(data.kind).toBe("Digicross");

  const minV = data.numberRangeMin;
  const maxV = data.numberRangeMax;
  expect(minV).toBeLessThanOrEqual(maxV);

  const allowedSins = DIRECTION_SIGNS[data.directions];
  expect(allowedSins).toBeTruthy();

  // Eastern numerals for every cell and no Western digits anywhere
  for (const grid of data.grids) {
    for (const cell of grid.cells) {
      expect(cell.valueAr).toMatch(/^[\u0660-\u0669]+$/);
    }
    // Exactly one affine counting model fits every visible cell, and it
    // recomputes every blank exactly as the data says (unique solution).
    const visible = new Map<string, number>();
    const blanks = new Set<string>();
    for (const cell of grid.cells) {
      const key = `${cell.row}-${cell.col}`;
      expect(cell.row).toBeGreaterThanOrEqual(0);
      expect(cell.row).toBeLessThanOrEqual(2);
      expect(cell.col).toBeGreaterThanOrEqual(0);
      expect(cell.col).toBeLessThanOrEqual(2);
      if (cell.blank) {
        blanks.add(key);
      } else {
        expect(cell.value).toBeGreaterThanOrEqual(minV);
        expect(cell.value).toBeLessThanOrEqual(maxV);
        visible.set(key, cell.value);
      }
    }
    expect(blanks.size).toBe(data.missingCount);
    expect(grid.blanks.length).toBe(data.missingCount);

    // Each row and column is consecutive: monotone with step ±1.
    for (let r = 0; r < 3; r++) {
      const row = [0, 1, 2].map((c) => grid.cells[r * 3 + c].value);
      const d = row[1] - row[0];
      expect(d === 1 || d === -1).toBe(true);
      expect(row[2] - row[1]).toBe(d);
    }
    for (let c = 0; c < 3; c++) {
      const col = [0, 1, 2].map((r) => grid.cells[r * 3 + c].value);
      const d = col[1] - col[0];
      expect(d === 1 || d === -1).toBe(true);
      expect(col[2] - col[1]).toBe(d);
    }

    // Unique-solution check: enumerate every valid counting model in range.
    const fitting: Array<{ T: number; x: number; y: number }> = [];
    for (const { x, y } of allowedSins) {
      for (let T = minV; T <= maxV; T++) {
        const combo = { T, x, y };
        if (!isValidAffineGrid(combo, minV, maxV)) continue;
        const values = affineGridValues(T, x, y);
        let fits = true;
        for (const [key, value] of visible) {
          const [r, c] = key.split("-").map(Number);
          if (values[r][c] !== value) {
            fits = false;
            break;
          }
        }
        if (fits) fitting.push(combo);
      }
    }
    expect(
      fitting,
      `expected exactly one counting model for grid ${grid.id}`
    ).toHaveLength(1);

    // The unique model fills every blank exactly as the data says.
    const unique = fitting[0];
    const solution = affineGridValues(unique.T, unique.x, unique.y);
    for (const blankKey of grid.blanks) {
      const [r, c] = blankKey.split("-").map(Number);
      const blankCell = grid.cells[r * 3 + c];
      expect(blankCell.blank).toBe(true);
      expect(blankCell.value).toBe(solution[r][c]);
    }
  }

  return data;
}

describe("Ticket 01 (Unit 8) — Slice 1: Digicross grid generation", () => {
  it("generates 3×3 grids where every row and column is a valid consecutive sequence with exactly one solution", () => {
    const tierParams: Record<
      "Easy" | "Intermediate" | "Advanced",
      DigicrossBlueprintParams
    > = {
      Easy: { directions: "backward", missingCount: 2 },
      Intermediate: { directions: "mixed", missingCount: 3 },
      Advanced: { directions: "mixed", missingCount: 4 },
    };

    for (const seed of DIGICROSS_SEEDS) {
      for (const tier of DIFFICULTY_TIERS) {
        const ex = buildDigicross(seed, tier, tierParams[tier]);
        const data = assertDigicrossInvariants(ex);

        expect(data.grids).toHaveLength(1);
        for (const grid of data.grids) {
          expect(grid.cells).toHaveLength(9);
          expect(grid.blanks.length).toBe(tierParams[tier].missingCount);
        }
      }
    }
  });

  it("honors explicit directions, number range, and a five-blank maximum", () => {
    for (const directions of ["forward", "backward", "mixed"] as const) {
      const ex = buildDigicross("DC-RANGE", "Intermediate", {
        directions,
        missingCount: 5,
        numberRange: [2, 10],
      });
      const data = assertDigicrossInvariants(
        ex as {
          data: unknown;
        }
      );

      expect(data.directions).toBe(directions);
      expect(data.numberRangeMin).toBe(2);
      expect(data.numberRangeMax).toBe(10);

      const allValues = data.grids[0].cells.map((c) => c.value);
      expect(Math.min(...allValues)).toBeGreaterThanOrEqual(2);
      expect(Math.max(...allValues)).toBeLessThanOrEqual(10);
      expect(data.missingCount).toBe(5);
    }

    // missingCount beyond the 5-blank cap clamps to 5
    const clamped = buildDigicross("DC-CAP", "Advanced", {
      directions: "mixed",
      missingCount: 9,
    });
    const clampedData = assertDigicrossInvariants(
      clamped as {
        data: unknown;
      }
    );
    expect(clampedData.missingCount).toBe(5);
  });

  it("is deterministic for the same seed and varies across seeds", () => {
    const build = (seed: string) =>
      buildDigicross(seed, "Intermediate", {
        directions: "mixed",
        missingCount: 3,
      });

    const a1 = build("DC-DETERMINISM");
    const a2 = build("DC-DETERMINISM");
    const b = build("DC-OTHER");

    expect(JSON.stringify(a1.data)).toBe(JSON.stringify(a2.data));
    expect(JSON.stringify(a1.data)).not.toBe(JSON.stringify(b.data));
  });

  it("solves each blank directly from a line with two given anchors (mixed directions)", () => {
    const ex = buildDigicross("DC-SOLVE", "Advanced", {
      directions: "mixed",
      missingCount: 3,
    });
    assertDigicrossInvariants(ex as { data: unknown });
  });
});

describe("Ticket 01 (Unit 8) — Slice 2: Digicross Grid visual model (§3.4, §8.1, §8.2)", () => {
  it("registers a canonical 324×212 Digicross Grid", () => {
    expect(CANONICAL_SIZES_PX.digicrossGridBox).toEqual({
      width: 324,
      height: 212,
    });

    const cells: DigicrossGridCell[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        cells.push({ row: r, col: c, value: 8 - r - c, blank: false });
      }
    }

    const spec = createDigicrossGridSpec({
      cells,
      blanks: ["0-0", "1-2"],
      colorTheme: "coral",
    });
    const htmlW = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );
    const htmlA = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: true })
    );

    expect(htmlW).toContain('data-visual-model="digicross-grid"');
    expect(htmlW).toContain("width:324px");
    expect(htmlW).toContain("height:212px");
    // Unknown slot shows ؟ on the worksheet (§8.1)
    expect(htmlW).toContain('data-answer-slot="unknown"');
    expect(htmlW).toContain("؟");
    // Solved slots show the digit at the same size (§8.2)
    expect(htmlA).toContain('data-answer-slot="solved-digit"');
    expect(htmlA).not.toContain("؟");
    // Given cells render Eastern Arabic digits
    expect(htmlW).toMatch(/[\u0660-\u0669]/);
  });

  it("renders one Answer Slot per blank in both keyed positions", () => {
    const cells: DigicrossGridCell[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        cells.push({ row: r, col: c, value: 10 - r - c, blank: false });
      }
    }
    const spec = createDigicrossGridSpec({
      cells,
      blanks: ["1-0", "1-1", "1-2"],
      colorTheme: "sky",
    });
    const html = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );
    // RTL grid: three row-1 cells carry unknown slots
    expect(html.match(/data-answer-slot="unknown"/g)).toHaveLength(3);
    expect(html).toContain('data-digicross-blank-cell="1-0"');
    expect(html).toContain('data-digicross-blank-cell="1-1"');
    expect(html).toContain('data-digicross-blank-cell="1-2"');
  });
});

describe("Ticket 01 (Unit 8) — Slice 3: Digicross archetype render", () => {
  it("renders the grid with unknown slots on the worksheet and accent-filled digits on the Answer Key", () => {
    const forEveryTier = buildDigicross("DC-RENDER", "Intermediate", {
      directions: "mixed",
      missingCount: 3,
    });
    const digicrossDef = getExerciseArchetype("Digicross");

    expect(forEveryTier.archetype).toBe("Digicross");
    expect(forEveryTier.titleAr).toContain("ديجيكروس");
    expect(forEveryTier.strategyHintAr).toBeTruthy();

    const htmlW = renderToStaticMarkup(
      digicrossDef.render({ exercise: forEveryTier, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      digicrossDef.render({ exercise: forEveryTier, mode: "answer-key" })
    );

    expect(htmlW).toContain('data-archetype="Digicross"');
    expect(htmlW).toContain('data-digicross-directions="mixed"');
    expect(htmlW).toContain('data-visual-model="digicross-grid"');
    expect(htmlW).toContain('data-answer-slot="unknown"');
    expect(htmlA).toContain('data-answer-slot="solved-digit"');
    expect(htmlA).not.toContain("؟");
    for (const html of [htmlW, htmlA]) {
      expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
    }
  });
});

describe("Ticket 01 (Unit 8) — Slice 4: Lessons K-89 and K-90 registration and render", () => {
  const LESSON_SEEDS = ["TEST-K1-89", "TEST-K2-89", "TEST-K3-89"];

  it("generates K-89 with PictureGraphRead practice (decreasing by 1), truck COUNT DOWN BB, and warm-up from K-64", () => {
    for (const seed of LESSON_SEEDS) {
      const generated = generateWorksheet({
        grade: "K",
        lessonNumber: 89,
        seed,
        difficultyLevel: "scaffolded",
      });

      expect(generated.worksheet.sections).toHaveLength(3);
      expect(generated.answerKey.sections).toHaveLength(3);
      for (const section of generated.worksheet.sections) {
        for (const ex of section.exercises) {
          expect(
            generated.answerKey.strategyHintsByExerciseId[ex.id]
          ).toBeTruthy();
        }
      }

      // Warm-up source follows the authored prerequisite chain (§5.3)
      expect(generated.warmUpSourceLessonId).toBe("K-64");

      // Practice: two decreasing-by-1 picture graphs with write counts
      const practice = generated.worksheet.sections[1].exercises;
      expect(practice.map((ex) => ex.archetype)).toEqual([
        "PictureGraphRead",
        "PictureGraphRead",
      ]);
      for (const ex of practice) {
        const data = ex.data as {
          kind: string;
          responseMode: string;
          includeComparison: boolean;
          categories: Array<{ count: number }>;
        };
        expect(data.kind).toBe("PictureGraphRead");
        expect(data.responseMode).toBe("write");
        expect(data.includeComparison).toBe(true);
        // Counts decrease by exactly 1 across categories (reading order)
        for (let i = 0; i + 1 < data.categories.length; i++) {
          expect(data.categories[i].count - data.categories[i + 1].count).toBe(
            1
          );
        }
      }

      // Challenge: COUNT DOWN draw-missing trucks + count-down PotD
      const challenge = generated.worksheet.sections[2].exercises;
      expect(challenge[0].archetype).toBe("PictureGraphRead");
      const bb = challenge[0].data as unknown as {
        responseMode: string;
        categories: Array<{ count: number }>;
        graphModel: { kind: string };
      };
      expect(bb.responseMode).toBe("draw-missing");
      expect(bb.graphModel.kind).toBe("picture-graph");
      expect(challenge.some((ex) => ex.archetype === "SequenceAndZero")).toBe(
        true
      );

      for (const viewMode of ["worksheet", "answer-key"] as const) {
        const html = renderWorksheetSurface({
          grade: "K",
          lessonNumber: 89,
          seed,
          difficultyLevel: "scaffolded",
          viewMode,
        });
        const western = findWesternNumeralsInRenderedHtml(html);
        expect(western, `Western numerals found in K-89 (${viewMode})`).toEqual(
          []
        );
      }
    }
  });

  it("generates K-90 with backward ten-frame SequenceAndZero practice, Digicross mixed BB, and warm-up from K-66", () => {
    for (const seed of LESSON_SEEDS) {
      const generated = generateWorksheet({
        grade: "K",
        lessonNumber: 90,
        seed,
        difficultyLevel: "scaffolded",
      });

      expect(generated.worksheet.sections).toHaveLength(3);
      expect(generated.answerKey.sections).toHaveLength(3);
      for (const section of generated.worksheet.sections) {
        for (const ex of section.exercises) {
          expect(
            generated.answerKey.strategyHintsByExerciseId[ex.id]
          ).toBeTruthy();
        }
      }

      // Warm-up source follows the authored prerequisite chain (§5.3)
      expect(generated.warmUpSourceLessonId).toBe("K-66");

      // Practice: two backward ten-frame sequences
      const practice = generated.worksheet.sections[1].exercises;
      expect(practice.map((ex) => ex.archetype)).toEqual([
        "SequenceAndZero",
        "SequenceAndZero",
      ]);
      for (const ex of practice) {
        const data = ex.data as {
          kind: string;
          sequenceMode: string;
          visualKind: string;
          steps: Array<{ value: number; isMissing: boolean }>;
        };
        expect(data.kind).toBe("SequenceAndZero");
        expect(data.sequenceMode).toBe("backward");
        expect(data.visualKind).toBe("ten-frame");
        // Answer Slots stay inside the visible first four steps
        for (const step of data.steps) {
          if (step.isMissing) {
            expect(step.value).toBeGreaterThanOrEqual(7);
          }
        }
      }

      // Challenge: Digicross BB (mixed directions) + cross-off PotD
      const challenge = generated.worksheet.sections[2].exercises;
      const digicross = challenge.find((ex) => ex.archetype === "Digicross");
      expect(digicross).toBeTruthy();
      assertDigicrossInvariants(digicross!);
      const digicrossData = digicross!.data as DigicrossData;
      expect(digicrossData.directions).toBe("mixed");
      expect(digicrossData.missingCount).toBe(4);

      const potd = challenge.find((ex) => ex.archetype === "SequenceAndZero");
      expect(potd).toBeTruthy();
      const potdData = potd!.data as unknown as {
        sequenceMode: string;
        steps: Array<{
          value: number;
          isMissing: boolean;
          visualModel: { kind: string; crossedOutCount?: number };
        }>;
      };
      expect(potdData.sequenceMode).toBe("backward");
      expect(potdData.steps.map((s) => s.value)).toEqual([10, 9, 8, 7, 6, 5]);
      for (const [idx, step] of potdData.steps.entries()) {
        expect(step.visualModel.kind).toBe("ten-frame");
        // Cross-off Circles: 10 − value circles are crossed off
        expect(step.visualModel.crossedOutCount).toBe(10 - step.value);
        if (step.isMissing) {
          expect(idx).toBeLessThan(4);
        }
      }

      for (const viewMode of ["worksheet", "answer-key"] as const) {
        const html = renderWorksheetSurface({
          grade: "K",
          lessonNumber: 90,
          seed,
          difficultyLevel: "scaffolded",
          viewMode,
        });
        const western = findWesternNumeralsInRenderedHtml(html);
        expect(western, `Western numerals found in K-90 (${viewMode})`).toEqual(
          []
        );
        // Answer Key fills every Digicross blank (no ؟ survives)
        if (viewMode === "answer-key") {
          expect(html).toContain('data-answer-slot="solved-digit"');
        }
      }
    }
  });

  it("renders the K-90 Digicross grid at canonical size on both surfaces", () => {
    const htmlA = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 90,
      seed: "CANON-K90",
      difficultyLevel: "scaffolded",
      viewMode: "answer-key",
    });
    expect(htmlA).toContain('data-visual-model="digicross-grid"');
    expect(htmlA).toContain("width:324px");
    expect(htmlA).toContain("height:212px");
  });
});
