import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getExerciseArchetype } from "@/archetypes/registry";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { createSeededRandom } from "@/lib/seed";
import type { ModelCountAndTraceData } from "@/archetypes/model-count-and-trace";
import type { SubitizePartWholeData } from "@/archetypes/subitize-part-whole";
import type { CountGridItemsData } from "@/archetypes/count-grid-items";
import type { CompareGroupsData } from "@/archetypes/compare-groups";
import "@/registry/bootstrap";

const catalog = getCurriculumCatalog();

function assertModelCountAndTraceGrid(
  exercise: ReturnType<ReturnType<typeof getExerciseArchetype>["generate"]>,
  min: number,
  max: number,
  multiplesOfTenOnly: boolean
) {
  const data = exercise.data as ModelCountAndTraceData;
  expect(data.items.length).toBe(2);
  const seen = new Set<number>();
  for (const item of data.items) {
    if (multiplesOfTenOnly) {
      expect(item.targetNumber % 10).toBe(0);
    }
    expect(item.targetNumber).toBeGreaterThanOrEqual(min);
    expect(item.targetNumber).toBeLessThanOrEqual(max);
    expect(seen.has(item.targetNumber)).toBe(false);
    seen.add(item.targetNumber);
    const meta = item.quantityModel.meta as {
      filledFrameCount: number;
      onesCount: number;
    };
    expect(meta.filledFrameCount * 10 + meta.onesCount).toBe(item.targetNumber);
  }
}

describe("Ticket 02 (Unit 10) — Domain: ModelCountAndTrace 100-range", () => {
  it("generates multiples of 10 to 100 (K-116) and tens+ones to 100 (K-117) with exact grid totals", () => {
    const archetype = getExerciseArchetype("ModelCountAndTrace");
    const lessonK116 = catalog.getLesson("K", 116)!;
    const lessonK117 = catalog.getLesson("K", 117)!;

    for (let seedIdx = 0; seedIdx < 15; seedIdx++) {
      const ex116 = archetype.generate({
        lesson: lessonK116,
        sourceLessonId: lessonK116.id,
        sectionId: "practice",
        exerciseIndex: 0,
        exerciseNumber: 2,
        difficultyLevel: "Intermediate",
        rng: createSeededRandom(`T02-K116-MCT-${seedIdx}`),
        spec: {
          archetype: "ModelCountAndTrace",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [60, 70, 80, 90, 100],
            itemCount: 2,
          },
        },
      });
      assertModelCountAndTraceGrid(ex116, 60, 100, true);

      const ex117 = archetype.generate({
        lesson: lessonK117,
        sourceLessonId: lessonK117.id,
        sectionId: "practice",
        exerciseIndex: 0,
        exerciseNumber: 2,
        difficultyLevel: "Advanced",
        rng: createSeededRandom(`T02-K117-MCT-${seedIdx}`),
        spec: {
          archetype: "ModelCountAndTrace",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [53, 59, 64, 68, 71, 77, 85, 88, 93, 99, 100],
            itemCount: 2,
          },
        },
      });
      assertModelCountAndTraceGrid(ex117, 51, 100, false);
    }
  });
});

describe("Ticket 02 (Unit 10) — Domain: SubitizePartWhole 51–100 decade-subitize, draw-to-make, and writeNickname", () => {
  it("computes decade complements to 70/80/90/100 accurately across seeds", () => {
    const archetype = getExerciseArchetype("SubitizePartWhole");
    const lessonK118 = catalog.getLesson("K", 118)!;

    for (let seedIdx = 0; seedIdx < 20; seedIdx++) {
      const exercise = archetype.generate({
        lesson: lessonK118,
        sourceLessonId: lessonK118.id,
        sectionId: "practice",
        exerciseIndex: 0,
        exerciseNumber: 2,
        difficultyLevel: "Intermediate",
        rng: createSeededRandom(`T02-DECADE-${seedIdx}`),
        spec: {
          archetype: "SubitizePartWhole",
          params: {
            subitizeMode: "decade-subitize",
            complementTarget: "next-decade",
            askKind: "both",
            candidateCounts: [61, 64, 67, 72, 75, 78, 83, 86, 91, 94],
            cardCount: 2,
          },
        },
      });

      const data = exercise.data as SubitizePartWholeData;
      const cards = data.decadeCards ?? [];
      expect(cards.length).toBe(2);
      const seen = new Set<number>();
      for (const card of cards) {
        expect(card.total).toBeGreaterThanOrEqual(61);
        expect(card.total).toBeLessThanOrEqual(99);
        expect(seen.has(card.total)).toBe(false);
        seen.add(card.total);
        expect(card.tensCount * 10 + card.onesCount).toBe(card.total);
        expect(card.complementTarget).toBe(Math.ceil(card.total / 10) * 10);
        expect([70, 80, 90, 100]).toContain(card.complementTarget);
        expect(card.complementTarget - card.total).toBe(card.complementCount);
      }
    }
  });

  it("renders draw-to-make BB and writeNickname PoD up to 100 cleanly in WS and AK", () => {
    const archetype = getExerciseArchetype("SubitizePartWhole");
    const lessonK118 = catalog.getLesson("K", 118)!;

    const bbExercise = archetype.generate({
      lesson: lessonK118,
      sourceLessonId: lessonK118.id,
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("T02-BB-DRAW"),
      spec: {
        archetype: "SubitizePartWhole",
        params: {
          subitizeMode: "decade-subitize",
          responseKind: "draw-to-make",
          complementTarget: "next-decade",
          candidateCounts: [63, 74, 82, 96],
          cardCount: 2,
        },
      },
    });
    const bbWsHtml = renderToStaticMarkup(
      archetype.render({ exercise: bbExercise, mode: "worksheet" })
    );
    const bbAkHtml = renderToStaticMarkup(
      archetype.render({ exercise: bbExercise, mode: "answer-key" })
    );
    expect(bbWsHtml).toContain('data-response-kind="draw-to-make"');
    expect(bbWsHtml).toContain('data-counter-state="ghost"');
    expect(bbAkHtml).toContain('data-counter-state="filled-ghost"');
    expect(findWesternNumeralsInRenderedHtml(bbWsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(bbAkHtml)).toEqual([]);

    for (const [count, expectedNickname] of [
      [84, "٨ عشرات و٤ آحاد"],
      [100, "١٠ عشرات"],
    ] as const) {
      const podExercise = archetype.generate({
        lesson: lessonK118,
        sourceLessonId: lessonK118.id,
        sectionId: "challenge",
        exerciseIndex: 1,
        exerciseNumber: 5,
        difficultyLevel: "Advanced",
        rng: createSeededRandom(`T02-POD-NICK-${count}`),
        spec: {
          archetype: "SubitizePartWhole",
          params: {
            subitizeMode: "decade-subitize",
            writeNickname: true,
            candidateCounts: [count],
            cardCount: 1,
          },
        },
      });
      const podAkHtml = renderToStaticMarkup(
        archetype.render({ exercise: podExercise, mode: "answer-key" })
      );
      expect(podAkHtml).toContain(expectedNickname);
      expect(findWesternNumeralsInRenderedHtml(podAkHtml)).toEqual([]);
    }
  });
});

describe("Ticket 02 (Unit 10) — Domain: CountGridItems 10×10 grids (ball, peace-sign) & CompareGroups PoD", () => {
  it("renders 10×10 icon grids for ball and peace-sign with exact icon counts", () => {
    const archetype = getExerciseArchetype("CountGridItems");
    const lessonK116 = catalog.getLesson("K", 116)!;

    for (const iconType of ["ball", "peace-sign"] as const) {
      const exercise = archetype.generate({
        lesson: lessonK116,
        sourceLessonId: lessonK116.id,
        sectionId: "challenge",
        exerciseIndex: 0,
        exerciseNumber: 4,
        difficultyLevel: "Intermediate",
        rng: createSeededRandom(`T02-CGI-${iconType}`),
        spec: {
          archetype: "CountGridItems",
          params: {
            iconType,
            rows: 10,
            cols: 10,
            candidateCounts: [63, 74, 85, 96, 100],
            gridCount: 2,
          },
        },
      });

      const data = exercise.data as CountGridItemsData;
      expect(data.grids.length).toBe(2);
      for (const grid of data.grids) {
        expect(grid.rows).toBe(10);
        expect(grid.cols).toBe(10);
      }

      const wsHtml = renderToStaticMarkup(
        archetype.render({ exercise, mode: "worksheet" })
      );
      const totalRenderedIcons =
        wsHtml.match(/data-grid-icon="true"/g)?.length ?? 0;
      const expectedTotal = data.grids.reduce(
        (acc, g) => acc + g.filledCount,
        0
      );
      expect(totalRenderedIcons).toBe(expectedTotal);
      expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    }
  });

  it("generates CompareGroups find-difference PoD with count-on-from-50 strategy for K-116", () => {
    const bundle = generateWorksheet({
      grade: "K",
      lessonNumber: 116,
      seed: "T02-K116-CG",
      difficultyLevel: "scaffolded",
    });
    const challengeSection = bundle.answerKey.sections[2];
    const podEx = challengeSection.exercises[1];
    expect(podEx.archetype).toBe("CompareGroups");
    const data = podEx.data as CompareGroupsData;
    expect(data.compareMode).toBe("find-difference");
    expect(podEx.strategyHintAr).toContain("٥٠");
  });
});

describe("Ticket 02 (Unit 10) — Primary Seam: K-116, K-117, K-118", () => {
  it("resolves authored titles, warm-up prerequisites, seed determinism, strategy hints, and Eastern Arabic numerals", () => {
    const expectedWarmUps: Record<number, string> = {
      116: "K-115",
      117: "K-116",
      118: "K-117",
    };

    const expectedTitles: Record<number, string> = {
      116: "أعداد حتى ١٠٠ — العدّ بالعشرات",
      117: "أعداد حتى ١٠٠ — العدّ بالآحاد",
      118: "أعداد حتى ١٠٠ — التعرّف السريع بلوحات العشرة",
    };

    for (const lessonNum of [116, 117, 118] as const) {
      const bundle = generateWorksheet({
        grade: "K",
        lessonNumber: lessonNum,
        seed: "u10-t02-seed-1",
        difficultyLevel: "scaffolded",
      });
      expect(bundle.isAuthoredBlueprint).toBe(true);
      expect(bundle.warmUpSourceLessonId).toBe(expectedWarmUps[lessonNum]);
      expect(bundle.worksheet.header.lessonTitleAr).toBe(
        expectedTitles[lessonNum]
      );
      expect(bundle.worksheet.sections.map((s) => s.difficultyLevel)).toEqual([
        "Easy",
        "Intermediate",
        "Advanced",
      ]);

      for (const section of bundle.answerKey.sections) {
        for (const ex of section.exercises) {
          expect(ex.strategyHintAr.trim().length).toBeGreaterThan(0);
        }
      }

      const htmlA = renderWorksheetSurface({
        grade: "K",
        lessonNumber: lessonNum,
        seed: "u10-t02-seed-1",
        difficultyLevel: "scaffolded",
        viewMode: "worksheet",
      });
      const htmlB = renderWorksheetSurface({
        grade: "K",
        lessonNumber: lessonNum,
        seed: "u10-t02-seed-1",
        difficultyLevel: "scaffolded",
        viewMode: "worksheet",
      });
      expect(htmlA).toBe(htmlB);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      expect(htmlA).toContain("h-12 w-12");
      if (lessonNum === 118) {
        expect(htmlA).toContain("h-8 w-40");
      }

      const akHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber: lessonNum,
        seed: "u10-t02-seed-1",
        difficultyLevel: "scaffolded",
        viewMode: "answer-key",
      });
      expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
    }
  });
});
