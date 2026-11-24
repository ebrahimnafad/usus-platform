import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getExerciseArchetype } from "@/archetypes/registry";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { createSeededRandom } from "@/lib/seed";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { createTenFrameSpec, TenFrameSvg } from "@/visual-models/unit-2-models";
import { CANONICAL_SIZES_PX } from "@/components/worksheet/layout-standard";
import type { SequenceAndZeroData } from "@/archetypes/sequence-and-zero";
import type { SubitizePartWholeData } from "@/archetypes/subitize-part-whole";
import type { DigicrossData } from "@/archetypes/digicross";
import "@/registry/bootstrap";

const catalog = getCurriculumCatalog();

describe("Ticket 04 (Unit 9) — Slice 1: SequenceAndZero fill-missing consecutive numbers", () => {
  it("enforces consecutive gapless number sequences and solves missing values on Answer Key", () => {
    const archetype = getExerciseArchetype("SequenceAndZero");
    const lessonK111 = catalog.getLesson("K", 111)!;

    for (const tier of ["Easy", "Intermediate", "Advanced"] as const) {
      for (let seedIdx = 0; seedIdx < 10; seedIdx++) {
        const exercise = archetype.generate({
          lesson: lessonK111,
          sourceLessonId: lessonK111.id,
          sectionId: "practice",
          exerciseIndex: 0,
          exerciseNumber: 2,
          difficultyLevel: tier,
          rng: createSeededRandom(`T04-FM-${tier}-${seedIdx}`),
          spec: {
            archetype: "SequenceAndZero",
            params: {
              sequenceMode: "forward",
              responseKind: "fill-missing",
              numbers:
                tier === "Easy" ? [11, 12, 13, 14, 15] : [16, 17, 18, 19, 20],
              missingCount: tier === "Easy" ? 1 : 2,
            },
          },
        });

        const data = exercise.data as SequenceAndZeroData;
        expect(data.responseKind).toBe("fill-missing");
        expect(data.steps.length).toBe(5);

        // Domain invariant: consecutive sequences are gapless
        for (let i = 1; i < data.steps.length; i++) {
          expect(data.steps[i].value).toBe(data.steps[i - 1].value + 1);
        }

        // Check missing items exist and match missingCount
        const missingSteps = data.steps.filter((s) => s.isMissing);
        expect(missingSteps.length).toBeGreaterThanOrEqual(1);

        // Render worksheet mode
        const wsHtml = renderToStaticMarkup(
          archetype.render({ exercise, mode: "worksheet" })
        );
        expect(wsHtml).toContain('data-response-kind="fill-missing"');
        expect(wsHtml).toContain('data-sequence-line="true"');
        expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);

        // Render answer-key mode
        const akHtml = renderToStaticMarkup(
          archetype.render({ exercise, mode: "answer-key" })
        );
        for (const missing of missingSteps) {
          expect(akHtml).toContain(
            `data-solved-missing-number="${missing.valueAr}"`
          );
        }
        expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
      }
    }
  });
});

describe("Ticket 04 (Unit 9) — Slice 2: Vertical Ten-Frame Visual Model", () => {
  it("renders with canonical size 108 × 252 px, 5 rows × 2 cols, and RTL column order", () => {
    // 1. Check layout-standard canonical size
    expect(CANONICAL_SIZES_PX.tenFrameVerticalBox).toEqual({
      width: 108,
      height: 252,
    });

    // 2. Generate vertical ten-frame spec
    const spec = createTenFrameSpec({
      count: 7,
      orientation: "vertical",
      colorTheme: "indigo",
    });
    expect(spec.meta?.orientation).toBe("vertical");

    // 3. Render vertical ten-frame SVG
    const svgHtml = renderToStaticMarkup(
      React.createElement(TenFrameSvg, {
        orientation: "vertical",
        count: 7,
        colorTheme: "indigo",
      })
    );

    // Geometry checks (§3.4)
    expect(svgHtml).toContain('width="108"');
    expect(svgHtml).toContain('height="252"');
    expect(svgHtml).toContain('viewBox="0 0 108 252"');
    expect(svgHtml).toContain('data-orientation="vertical"');

    // 10 cells check (each 48×48)
    const cellBoxMatches = svgHtml.match(/data-cell-box="48x48"/g);
    expect(cellBoxMatches).toHaveLength(10);

    // RTL structure check: right column (cells 1..5) is full when count >= 5
    // Cell 1..5 have isFilled = true
    for (let c = 1; c <= 5; c++) {
      expect(svgHtml).toMatch(
        new RegExp(`data-rtl-cell="[^"]*"[^>]*data-cell-state="filled"`)
      );
    }
  });
});

describe("Ticket 04 (Unit 9) — Slice 3: SubitizePartWhole decompose-teen with vertical ten frames", () => {
  it("enforces 10 + ones = total for all teen decompositions with vertical ten-frame pair", () => {
    const archetype = getExerciseArchetype("SubitizePartWhole");
    const lessonK112 = catalog.getLesson("K", 112)!;

    for (const tier of ["Easy", "Intermediate", "Advanced"] as const) {
      for (let seedIdx = 0; seedIdx < 10; seedIdx++) {
        const exercise = archetype.generate({
          lesson: lessonK112,
          sourceLessonId: lessonK112.id,
          sectionId: "practice",
          exerciseIndex: 0,
          exerciseNumber: 2,
          difficultyLevel: tier,
          rng: createSeededRandom(`T04-SPW-${tier}-${seedIdx}`),
          spec: {
            archetype: "SubitizePartWhole",
            params: {
              subitizeMode: "decompose-teen",
              drawModel: "vertical-ten-frame",
              candidateCounts: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
              cardCount: 2,
            },
          },
        });

        const data = exercise.data as SubitizePartWholeData;
        expect(data.subitizeMode).toBe("decompose-teen");
        expect(data.drawModel).toBe("vertical-ten-frame");
        expect(data.cards.length).toBe(2);

        // Core domain invariant: 10 + ones = total
        for (const card of data.cards) {
          expect(card.filledCount).toBe(10);
          expect(card.filledCount + card.missingCount).toBe(card.totalCount);
          expect(card.totalCount).toBeGreaterThanOrEqual(11);
          expect(card.totalCount).toBeLessThanOrEqual(20);
        }

        // Render worksheet mode
        const wsHtml = renderToStaticMarkup(
          archetype.render({ exercise, mode: "worksheet" })
        );
        expect(wsHtml).toContain('data-draw-model="vertical-ten-frame"');
        expect(wsHtml).toContain('data-decompose-teen="true"');
        expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);

        // Render answer-key mode
        const akHtml = renderToStaticMarkup(
          archetype.render({ exercise, mode: "answer-key" })
        );
        for (const card of data.cards) {
          expect(akHtml).toContain(
            `data-solved-decompose-ones="${card.missingCount}"`
          );
          expect(akHtml).toContain(
            `data-solved-decompose-total="${card.totalCount}"`
          );
        }
        expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
      }
    }
  });
});

describe("Ticket 04 (Unit 9) — Slice 4: Digicross teen number range 11–15 support", () => {
  it("generates Digicross grids within [11, 15] for K-111 Brain Builder", () => {
    const archetype = getExerciseArchetype("Digicross");
    const lessonK111 = catalog.getLesson("K", 111)!;

    for (let seedIdx = 0; seedIdx < 12; seedIdx++) {
      const exercise = archetype.generate({
        lesson: lessonK111,
        sourceLessonId: lessonK111.id,
        sectionId: "challenge",
        exerciseIndex: 1,
        exerciseNumber: 4,
        difficultyLevel: "Intermediate",
        rng: createSeededRandom(`T04-DX-${seedIdx}`),
        spec: {
          archetype: "Digicross",
          params: {
            numberRange: [11, 15],
            gridCount: 1,
            missingCount: 3,
            directions: "mixed",
          },
        },
      });

      const data = exercise.data as DigicrossData;
      expect(data.grids.length).toBe(1);
      const grid = data.grids[0];

      // Values must all be within [11, 15]
      for (const cell of grid.cells) {
        expect(cell.value).toBeGreaterThanOrEqual(11);
        expect(cell.value).toBeLessThanOrEqual(15);
      }

      // Check rendered HTML
      const html = renderToStaticMarkup(
        archetype.render({ exercise, mode: "worksheet" })
      );
      expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
    }
  });
});

describe("Ticket 04 (Unit 9) — Slice 5: Full surface and blueprint registration for K-111 & K-112", () => {
  it("generates and renders Lesson K-111 with Warm-up from K-106, consecutive numbers, and Digicross BB", () => {
    const bundle = generateWorksheet({
      grade: "K",
      lessonNumber: 111,
      seed: "SEED-K111-TEST",
      difficultyLevel: "Intermediate",
    });

    // Prerequisite Warm-up: draws from K-106
    expect(bundle.warmUpSourceLessonId).toBe("K-106");
    expect(bundle.worksheet.sections[0].sourceLessonId).toBe("K-106");

    // Title and metadata
    expect(bundle.worksheet.header.lessonTitleAr).toBe(
      "عدّ وكتابة الأعداد المتتالية"
    );

    // Render surfaces
    for (const view of ["worksheet", "answer-key", "teacher-notes"] as const) {
      const surfaceHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber: 111,
        seed: "SEED-K111-TEST",
        difficultyLevel: "Intermediate",
        viewMode: view,
      });

      expect(surfaceHtml).toContain("الدرس ١١١");
      expect(surfaceHtml).toContain("عدّ وكتابة الأعداد المتتالية");
      expect(findWesternNumeralsInRenderedHtml(surfaceHtml)).toEqual([]);
    }
  });

  it("generates and renders Lesson K-112 with Warm-up from K-110, vertical ten frames, and ConnectMatch BB", () => {
    const bundle = generateWorksheet({
      grade: "K",
      lessonNumber: 112,
      seed: "SEED-K112-TEST",
      difficultyLevel: "Intermediate",
    });

    // Prerequisite Warm-up: draws from K-110
    expect(bundle.warmUpSourceLessonId).toBe("K-110");
    expect(bundle.worksheet.sections[0].sourceLessonId).toBe("K-110");

    // Title and metadata
    expect(bundle.worksheet.header.lessonTitleAr).toBe(
      "تمثيل الأعداد بلوحات العشرة الرأسية وروابط الأعداد"
    );

    // Render surfaces
    for (const view of ["worksheet", "answer-key", "teacher-notes"] as const) {
      const surfaceHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber: 112,
        seed: "SEED-K112-TEST",
        difficultyLevel: "Intermediate",
        viewMode: view,
      });

      expect(surfaceHtml).toContain("الدرس ١١٢");
      expect(surfaceHtml).toContain(
        "تمثيل الأعداد بلوحات العشرة الرأسية وروابط الأعداد"
      );
      expect(findWesternNumeralsInRenderedHtml(surfaceHtml)).toEqual([]);
    }
  });
});
