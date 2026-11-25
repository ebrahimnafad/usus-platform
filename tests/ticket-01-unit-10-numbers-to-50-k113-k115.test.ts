import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getExerciseArchetype } from "@/archetypes/registry";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { CANONICAL_SIZES_PX } from "@/components/worksheet/layout-standard";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { createSeededRandom } from "@/lib/seed";
import { VisualModelView } from "@/visual-models/registry";
import { createTenFrameGridSpec } from "@/visual-models/ten-frame-grid";
import type { ModelCountAndTraceData } from "@/archetypes/model-count-and-trace";
import type { SubitizePartWholeData } from "@/archetypes/subitize-part-whole";
import type { CountGridItemsData } from "@/archetypes/count-grid-items";
import "@/registry/bootstrap";

const catalog = getCurriculumCatalog();

describe("Ticket 01 (Unit 10) — Slice 1: ten-frame-grid Visual Model", () => {
  it("renders a 2x5 macro grid of micro ten-frames at 660 × 160 px with RTL fill, dashed empty frames, and AK subitizing-group containers", () => {
    expect(CANONICAL_SIZES_PX.tenFrameGridBox).toEqual({
      width: 660,
      height: 160,
    });

    const spec = createTenFrameGridSpec({
      count: 34,
      colorTheme: "indigo",
    });
    expect(spec.kind).toBe("ten-frame-grid");
    expect(spec.count).toBe(34);
    expect(spec.meta?.filledFrameCount).toBe(3);
    expect(spec.meta?.onesCount).toBe(4);
    expect(spec.meta?.perceptionMode).toBe("group");

    const wsHtml = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );
    expect(wsHtml).toContain('data-visual-model="ten-frame-grid"');
    expect(wsHtml).toContain('width="660"');
    expect(wsHtml).toContain('height="160"');
    expect(wsHtml).toContain('data-direction="rtl"');
    expect(wsHtml).toContain('data-perception-mode="group"');
    expect(wsHtml).toContain('data-filled-frames="3"');
    expect(wsHtml).toContain('data-ones-count="4"');
    expect(wsHtml).toContain('data-empty-frames="6"');
    expect(wsHtml.match(/data-macro-frame="/g)).toHaveLength(10);
    expect(wsHtml.match(/data-frame-state="empty"/g)).toHaveLength(6);
    expect(wsHtml).toContain("stroke-dasharray");
    expect(wsHtml.match(/data-counter-state="filled"/g)).toHaveLength(34);
    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);

    const akHtml = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: true })
    );
    expect(
      akHtml.match(/data-subitize-group-container="true"/g)?.length
    ).toBeGreaterThanOrEqual(4);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });
});

describe("Ticket 01 (Unit 10) — Slice 2: ModelCountAndTrace with ten-frame-grid", () => {
  it("generates distinct multiples-of-10 and tens+ones grids where filledFrameCount*10 + onesCount = total", () => {
    const archetype = getExerciseArchetype("ModelCountAndTrace");
    const lessonK114 = catalog.getLesson("K", 114)!;

    for (const tier of ["Easy", "Intermediate", "Advanced"] as const) {
      for (let seedIdx = 0; seedIdx < 15; seedIdx++) {
        const exercise = archetype.generate({
          lesson: lessonK114,
          sourceLessonId: lessonK114.id,
          sectionId: "practice",
          exerciseIndex: 0,
          exerciseNumber: 2,
          difficultyLevel: tier,
          rng: createSeededRandom(`T01-MCT-${tier}-${seedIdx}`),
          spec: {
            archetype: "ModelCountAndTrace",
            params: {
              modelKind: "ten-frame-grid",
              targetNumbers:
                tier === "Easy"
                  ? [10, 20, 30]
                  : [21, 24, 27, 32, 35, 38, 43, 46, 49],
              itemCount: 2,
            },
          },
        });

        const data = exercise.data as ModelCountAndTraceData;
        expect(data.modelKind).toBe("ten-frame-grid");
        expect(data.items.length).toBe(2);

        const seenTotals = new Set<number>();
        for (const item of data.items) {
          expect(seenTotals.has(item.targetNumber)).toBe(false);
          seenTotals.add(item.targetNumber);
          const meta = item.quantityModel.meta as {
            filledFrameCount: number;
            onesCount: number;
          };
          expect(meta.filledFrameCount * 10 + meta.onesCount).toBe(
            item.targetNumber
          );
        }
      }
    }
  });
});

describe("Ticket 01 (Unit 10) — Slice 3: SubitizePartWhole decade-subitize, draw-to-make, and writeNickname", () => {
  it("enforces Math.ceil(total/10)*10 - total = complement and no duplicate configs within one exercise", () => {
    const archetype = getExerciseArchetype("SubitizePartWhole");
    const lessonK115 = catalog.getLesson("K", 115)!;

    for (let seedIdx = 0; seedIdx < 20; seedIdx++) {
      const exercise = archetype.generate({
        lesson: lessonK115,
        sourceLessonId: lessonK115.id,
        sectionId: "practice",
        exerciseIndex: 0,
        exerciseNumber: 2,
        difficultyLevel: "Intermediate",
        rng: createSeededRandom(`T01-DECADE-${seedIdx}`),
        spec: {
          archetype: "SubitizePartWhole",
          params: {
            subitizeMode: "decade-subitize",
            complementTarget: "next-decade",
            askKind: "both",
            candidateCounts: [21, 23, 25, 32, 34, 36, 41, 43, 47],
            cardCount: 2,
          },
        },
      });

      const data = exercise.data as SubitizePartWholeData;
      const cards = data.decadeCards ?? [];
      expect(cards.length).toBe(2);
      const seen = new Set<number>();
      for (const card of cards) {
        expect(seen.has(card.total)).toBe(false);
        seen.add(card.total);
        expect(card.tensCount * 10 + card.onesCount).toBe(card.total);
        expect(card.complementTarget).toBe(Math.ceil(card.total / 10) * 10);
        expect(card.complementTarget - card.total).toBe(card.complementCount);
      }
    }
  });

  it("renders draw-to-make BB and writeNickname PoD cleanly in WS and AK without Western digits", () => {
    const archetype = getExerciseArchetype("SubitizePartWhole");
    const lessonK115 = catalog.getLesson("K", 115)!;

    const bbExercise = archetype.generate({
      lesson: lessonK115,
      sourceLessonId: lessonK115.id,
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("T01-BB-DRAW"),
      spec: {
        archetype: "SubitizePartWhole",
        params: {
          subitizeMode: "decade-subitize",
          responseKind: "draw-to-make",
          complementTarget: "next-decade",
          candidateCounts: [23, 34, 42],
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

    const podExercise = archetype.generate({
      lesson: lessonK115,
      sourceLessonId: lessonK115.id,
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 5,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("T01-POD-NICK"),
      spec: {
        archetype: "SubitizePartWhole",
        params: {
          subitizeMode: "decade-subitize",
          writeNickname: true,
          candidateCounts: [34],
          cardCount: 1,
        },
      },
    });
    const podAkHtml = renderToStaticMarkup(
      archetype.render({ exercise: podExercise, mode: "answer-key" })
    );
    expect(podAkHtml).toContain("٣ عشرات و٤ آحاد");
    expect(findWesternNumeralsInRenderedHtml(podAkHtml)).toEqual([]);
  });
});

describe("Ticket 01 (Unit 10) — Slice 4: CountGridItems archetype", () => {
  it("renders dense icon grids where filledCount equals the rendered icon count", () => {
    const archetype = getExerciseArchetype("CountGridItems");
    const lessonK114 = catalog.getLesson("K", 114)!;

    for (const iconType of ["fruit", "pencil"] as const) {
      const exercise = archetype.generate({
        lesson: lessonK114,
        sourceLessonId: lessonK114.id,
        sectionId: "challenge",
        exerciseIndex: 0,
        exerciseNumber: 4,
        difficultyLevel: "Intermediate",
        rng: createSeededRandom(`T01-CGI-${iconType}`),
        spec: {
          archetype: "CountGridItems",
          params: {
            iconType,
            rows: 5,
            cols: 10,
            candidateCounts: [24, 33, 42],
            gridCount: 2,
          },
        },
      });

      const data = exercise.data as CountGridItemsData;
      expect(data.grids.length).toBe(2);

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
});

describe("Ticket 01 (Unit 10) — Slice 5: Primary Seam K-113 to K-115", () => {
  it("resolves authored titles, warm-up prerequisites, seed determinism, strategy hints, and Eastern Arabic numerals", () => {
    const expectedWarmUps: Record<number, string> = {
      113: "K-112",
      114: "K-113",
      115: "K-114",
    };

    const expectedTitles: Record<number, string> = {
      113: "أعداد حتى ٥٠ — العدّ بالعشرات",
      114: "أعداد حتى ٥٠ — العدّ بالآحاد",
      115: "أعداد حتى ٥٠ — التعرّف السريع بلوحات العشرة",
    };

    for (const lessonNum of [113, 114, 115] as const) {
      const bundle = generateWorksheet({
        grade: "K",
        lessonNumber: lessonNum,
        seed: "u10-seed-1",
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

      // Every AK exercise carries a non-empty Strategy Hint
      for (const section of bundle.answerKey.sections) {
        for (const ex of section.exercises) {
          expect(ex.strategyHintAr.trim().length).toBeGreaterThan(0);
        }
      }

      // Seed determinism
      const htmlA = renderWorksheetSurface({
        grade: "K",
        lessonNumber: lessonNum,
        seed: "u10-seed-1",
        difficultyLevel: "scaffolded",
        viewMode: "worksheet",
      });
      const htmlB = renderWorksheetSurface({
        grade: "K",
        lessonNumber: lessonNum,
        seed: "u10-seed-1",
        difficultyLevel: "scaffolded",
        viewMode: "worksheet",
      });
      expect(htmlA).toBe(htmlB);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      // Answer Slot canonical sizes: 48x48 digit slots (h-12 w-12) and 32x160 line slots (h-8 w-40)
      expect(htmlA).toContain("h-12 w-12");
      if (lessonNum === 115) {
        expect(htmlA).toContain("h-8 w-40");
      }

      const akHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber: lessonNum,
        seed: "u10-seed-1",
        difficultyLevel: "scaffolded",
        viewMode: "answer-key",
      });
      expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
    }
  });
});
