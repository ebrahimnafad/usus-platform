import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getExerciseArchetype } from "@/archetypes/registry";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { createSeededRandom } from "@/lib/seed";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import type { CompareGroupsData } from "@/archetypes/compare-groups";
import type { PictureGraphReadData } from "@/archetypes/picture-graph-read";
import type { SubitizePartWholeData } from "@/archetypes/subitize-part-whole";
import "@/registry/bootstrap";

const catalog = getCurriculumCatalog();

const TIER_RANGES: Record<string, [number, number]> = {
  Easy: [1, 5],
  Intermediate: [2, 8],
  Advanced: [3, 10],
};

const TIER_DIFF_CAPS: Record<string, number> = {
  Easy: 2,
  Intermediate: 5,
  Advanced: 5,
};

describe("Ticket 03 (Unit 9) — Slice 1: CompareGroups find-difference mode", () => {
  it("generates find-difference items whose difference equals |count₁ − count₂| with per-tier caps", () => {
    const archetype = getExerciseArchetype("CompareGroups");
    const lessonK107 = catalog.getLesson("K", 107)!;
    const lessonK108 = catalog.getLesson("K", 108)!;

    for (const lesson of [lessonK107, lessonK108]) {
      for (const tier of ["Easy", "Intermediate", "Advanced"] as const) {
        for (let seedIdx = 0; seedIdx < 12; seedIdx++) {
          const exercise = archetype.generate({
            lesson,
            sourceLessonId: lesson.id,
            sectionId: "practice",
            exerciseIndex: 0,
            exerciseNumber: 2,
            difficultyLevel: tier,
            rng: createSeededRandom(`T03-FD-${lesson.id}-${tier}-${seedIdx}`),
            spec: {
              archetype: "CompareGroups",
              params: {
                compareMode: "find-difference",
                visualKind:
                  lesson.id === "K-107"
                    ? "linear-comparison"
                    : "ten-frame-pair",
                targetComparison: "more",
                numberRange: TIER_RANGES[tier],
                itemCount: 1,
              },
            },
          });

          const data = exercise.data as CompareGroupsData;
          expect(data.compareMode).toBe("find-difference");
          expect(data.items.length).toBeGreaterThanOrEqual(1);
          expect(exercise.titleAr).toBe("مقارنة المجموعات: كم أكثر أو كم أقل");

          for (const item of data.items) {
            // Core invariant: difference = |count₁ − count₂|
            expect(item.difference).toBe(Math.abs(item.countA - item.countB));
            expect(item.countA).toBeGreaterThanOrEqual(TIER_RANGES[tier][0]);
            expect(item.countA).toBeLessThanOrEqual(TIER_RANGES[tier][1]);
            expect(item.countB).toBeGreaterThanOrEqual(TIER_RANGES[tier][0]);
            expect(item.countB).toBeLessThanOrEqual(TIER_RANGES[tier][1]);
            // §6.2: Easy difference ≤ 2, Intermediate/Advanced ≤ 5
            expect(item.difference).toBeLessThanOrEqual(TIER_DIFF_CAPS[tier]);
            // §6.3: equal groups (difference = 0) are Advanced-only
            if (tier !== "Advanced") {
              expect(item.countA).not.toBe(item.countB);
            }
          }

          // Render check: 0 Western digits in visible text
          const html = renderToStaticMarkup(
            archetype.render({ exercise, mode: "worksheet" })
          );
          expect(html).toContain('data-find-difference="true"');
          expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);

          // Answer Key render: solved count and difference slots
          const akHtml = renderToStaticMarkup(
            archetype.render({ exercise, mode: "answer-key" })
          );
          expect(akHtml).toContain("data-solved-compare-count");
          expect(akHtml).toContain("data-solved-compare-difference");
          expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
        }
      }
    }
  });

  it("renders the difference = ٠ edge case only at Advanced difficulty (§6.3)", () => {
    const archetype = getExerciseArchetype("CompareGroups");
    const lessonK107 = catalog.getLesson("K", 107)!;

    // Advanced: across many seeds at least one equal pair (difference = 0) appears
    let sawEqualPair = false;
    for (let seedIdx = 0; seedIdx < 24; seedIdx++) {
      const exercise = archetype.generate({
        lesson: lessonK107,
        sourceLessonId: "K-107",
        sectionId: "practice",
        exerciseIndex: 0,
        exerciseNumber: 2,
        difficultyLevel: "Advanced",
        rng: createSeededRandom(`T03-EQ-ADV-${seedIdx}`),
        spec: {
          archetype: "CompareGroups",
          params: {
            compareMode: "find-difference",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
      });

      const data = exercise.data as CompareGroupsData;
      for (const item of data.items) {
        if (item.difference === 0) {
          sawEqualPair = true;
          expect(item.moreGroup).toBe("equal");
          expect(item.fewerGroup).toBe("equal");
        }
      }

      if (data.items.some((item) => item.difference === 0)) {
        const akHtml = renderToStaticMarkup(
          archetype.render({ exercise, mode: "answer-key" })
        );
        expect(akHtml).toContain('data-solved-compare-difference="0"');
        // The strategy hint names the equal-groups rule
        expect(exercise.strategyHintAr).toContain("الفرق ٠");
      }
    }
    expect(sawEqualPair).toBe(true);

    // Easy and Intermediate: no equal pairs across seeds
    for (const tier of ["Easy", "Intermediate"] as const) {
      for (let seedIdx = 0; seedIdx < 12; seedIdx++) {
        const exercise = archetype.generate({
          lesson: lessonK107,
          sourceLessonId: "K-107",
          sectionId: "practice",
          exerciseIndex: 0,
          exerciseNumber: 2,
          difficultyLevel: tier,
          rng: createSeededRandom(`T03-EQ-${tier}-${seedIdx}`),
          spec: {
            archetype: "CompareGroups",
            params: {
              compareMode: "find-difference",
              visualKind: "linear-comparison",
              targetComparison: "more",
              numberRange: TIER_RANGES[tier],
              itemCount: 1,
            },
          },
        });

        const data = exercise.data as CompareGroupsData;
        for (const item of data.items) {
          expect(item.difference).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe("Ticket 03 (Unit 9) — Slice 2: PictureGraphRead find-difference (K-107 BB)", () => {
  it("derives the difference from the first two categories and renders a difference slot", () => {
    const archetype = getExerciseArchetype("PictureGraphRead");
    const lessonK107 = catalog.getLesson("K", 107)!;

    const exercise = archetype.generate({
      lesson: lessonK107,
      sourceLessonId: "K-107",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 5,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("T03-GRAPH-FD"),
      spec: {
        archetype: "PictureGraphRead",
        params: {
          orientation: "horizontal",
          titleAr: "جرأة على المقارنة (أ) — أشياء من الطبيعة حتى ٢٠",
          categories: [
            { objectId: "flower", count: 15, colorTheme: "rose" },
            { objectId: "tree", count: 20, colorTheme: "emerald" },
          ],
          responseMode: "write",
          maxCount: 20,
          includeComparison: true,
          comparisonKind: "find-difference",
        },
      },
    });

    const data = exercise.data as PictureGraphReadData;
    expect(data.comparisonKind).toBe("find-difference");
    // DARE to COMPARE – A: no more/fewer choice chips, a numeric slot instead
    expect(data.comparisonChoices).toEqual([]);
    // Invariant: difference = |count₁ − count₂|
    expect(data.comparisonDifference).toBe(
      Math.abs(data.categories[0].count - data.categories[1].count)
    );
    expect(data.comparisonDifference).toBe(5);
    expect(data.comparisonMoreLabelAr.length).toBeGreaterThan(0);
    expect(data.comparisonFewerLabelAr.length).toBeGreaterThan(0);
    expect(data.comparisonPromptAr).toContain("أكثر");
    expect(data.comparisonAnswerAr).toContain("٥");

    const html = renderToStaticMarkup(
      archetype.render({ exercise, mode: "worksheet" })
    );
    expect(html).not.toContain("data-comparison-choice");
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);

    const akHtml = renderToStaticMarkup(
      archetype.render({ exercise, mode: "answer-key" })
    );
    expect(akHtml).toContain('data-solved-comparison-difference="5"');
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });
});

describe("Ticket 03 (Unit 9) — Slice 3: SubitizePartWhole stacked ten-frame pairs", () => {
  const subitizeArchetype = getExerciseArchetype("SubitizePartWhole");
  const lessonK109 = catalog.getLesson("K", 109)!;
  const lessonK110 = catalog.getLesson("K", 110)!;

  it("generates teen-frame-pair cards with teen = 10 + ones inside [11, 20]", () => {
    const exercise = subitizeArchetype.generate({
      lesson: lessonK109,
      sourceLessonId: "K-109",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("T03-TEEN-PAIR"),
      spec: {
        archetype: "SubitizePartWhole",
        params: {
          frameCount: 2,
          askKind: "total",
          cardCount: 2,
        },
      },
    });

    const data = exercise.data as SubitizePartWholeData;
    expect(data.frameCount).toBe(2);
    expect(data.teenPairCards).toBeDefined();
    expect(data.teenPairCards!.length).toBe(2);
    for (const card of data.teenPairCards!) {
      expect(card.teenTotal).toBeGreaterThanOrEqual(11);
      expect(card.teenTotal).toBeLessThanOrEqual(20);
      // Invariant: teen = ١٠ + ones
      expect(card.teenTotal).toBe(10 + card.onesCount);
      expect(card.bottomIsGhost).toBe(false);
    }

    const html = renderToStaticMarkup(
      subitizeArchetype.render({ exercise, mode: "worksheet" })
    );
    expect(html).toContain('data-subitize-mode="teen-frame-pair"');
    expect(html).toContain('data-frame-count="2"');
    const cardMatches = html.match(/data-teen-pair-card=/g);
    expect(cardMatches?.length).toBe(2);
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);

    const akHtml = renderToStaticMarkup(
      subitizeArchetype.render({ exercise, mode: "answer-key" })
    );
    expect(akHtml).toContain("data-solved-teen-total");
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });

  it("Easy tier restricts teen-frame-pair cards to 11–15", () => {
    for (let seedIdx = 0; seedIdx < 8; seedIdx++) {
      const exercise = subitizeArchetype.generate({
        lesson: lessonK109,
        sourceLessonId: "K-109",
        sectionId: "practice",
        exerciseIndex: 0,
        exerciseNumber: 2,
        difficultyLevel: "Easy",
        rng: createSeededRandom(`T03-TEEN-EASY-${seedIdx}`),
        spec: {
          archetype: "SubitizePartWhole",
          params: {
            frameCount: 2,
            askKind: "total",
            cardCount: 2,
          },
        },
      });

      const data = exercise.data as SubitizePartWholeData;
      for (const card of data.teenPairCards!) {
        expect(card.teenTotal).toBeGreaterThanOrEqual(11);
        expect(card.teenTotal).toBeLessThanOrEqual(15);
      }
    }
  });

  it("complementTarget 20 satisfies complement + teen = 20 and renders the complement slot", () => {
    for (const lesson of [lessonK109, lessonK110]) {
      const exercise = subitizeArchetype.generate({
        lesson,
        sourceLessonId: lesson.id,
        sectionId: "practice",
        exerciseIndex: 1,
        exerciseNumber: 3,
        difficultyLevel: "Advanced",
        rng: createSeededRandom(`T03-COMPLEMENT-${lesson.id}`),
        spec: {
          archetype: "SubitizePartWhole",
          params: {
            frameCount: 2,
            complementTarget: 20,
            askKind: "both",
            cardCount: 2,
          },
        },
      });

      const data = exercise.data as SubitizePartWholeData;
      expect(data.complementTarget).toBe(20);
      expect(data.askKind).toBe("both");
      for (const card of data.teenPairCards!) {
        // Invariant: complement + teen = ٢٠
        expect(card.complementCount + card.teenTotal).toBe(20);
      }

      const html = renderToStaticMarkup(
        subitizeArchetype.render({ exercise, mode: "worksheet" })
      );
      expect(html).toContain('data-subitize-mode="teen-frame-pair"');
      expect(html).toContain("كم ينقصه حتى ٢٠");
      expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);

      const akHtml = renderToStaticMarkup(
        subitizeArchetype.render({ exercise, mode: "answer-key" })
      );
      expect(akHtml).toContain("data-solved-teen-total");
      expect(akHtml).toContain("data-solved-teen-complement");
      expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
    }
  });

  it("imaginedParts PoD withdraws the bottom counters as ghosts (solid on the Answer Key)", () => {
    const exercise = subitizeArchetype.generate({
      lesson: lessonK109,
      sourceLessonId: "K-109",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 5,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("T03-IMAGINED"),
      spec: {
        archetype: "SubitizePartWhole",
        params: {
          frameCount: 2,
          imaginedParts: true,
          askKind: "total",
          cardCount: 2,
        },
      },
    });

    const data = exercise.data as SubitizePartWholeData;
    expect(data.imaginedParts).toBe(true);
    for (const card of data.teenPairCards!) {
      expect(card.bottomIsGhost).toBe(true);
    }

    const html = renderToStaticMarkup(
      subitizeArchetype.render({ exercise, mode: "worksheet" })
    );
    expect(html).toContain('data-bottom-ghost="true"');
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });
});

describe("Ticket 03 (Unit 9) — Slice 4: SubitizePartWhole draw-to-make (HOW MANY? A & B)", () => {
  const subitizeArchetype = getExerciseArchetype("SubitizePartWhole");
  const lessonK109 = catalog.getLesson("K", 109)!;
  const lessonK110 = catalog.getLesson("K", 110)!;

  it("generates draw-to-make cards with blank frames and solved 10 + ones models", () => {
    const exercise = subitizeArchetype.generate({
      lesson: lessonK109,
      sourceLessonId: "K-109",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 6,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("T03-DRAW-MAKE"),
      spec: {
        archetype: "SubitizePartWhole",
        params: {
          frameCount: 2,
          responseKind: "draw-to-make",
          cardCount: 2,
        },
      },
    });

    const data = exercise.data as SubitizePartWholeData;
    expect(data.responseKind).toBe("draw-to-make");
    expect(data.drawToMakeCards).toBeDefined();
    expect(data.drawToMakeCards!.length).toBe(2);
    for (const card of data.drawToMakeCards!) {
      expect(card.teenTotal).toBeGreaterThanOrEqual(11);
      expect(card.teenTotal).toBeLessThanOrEqual(20);
      // Invariant: the solved frames compose the teen (١٠ + ones)
      expect(card.teenTotal).toBe(10 + card.onesCount);
    }

    const html = renderToStaticMarkup(
      subitizeArchetype.render({ exercise, mode: "worksheet" })
    );
    expect(html).toContain('data-subitize-mode="draw-to-make"');
    const cardMatches = html.match(/data-draw-to-make-card=/g);
    expect(cardMatches?.length).toBe(2);
    // Two blank drawing frames per card
    const drawAreas = html.match(/data-draw-area="true"/g);
    expect(drawAreas?.length).toBe(4);
    // No complement slot when complementTarget is absent (K-109 HOW MANY? – A)
    expect(html).not.toContain("data-solved-teen-complement");
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);

    const akHtml = renderToStaticMarkup(
      subitizeArchetype.render({ exercise, mode: "answer-key" })
    );
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });

  it("HOW MANY? – B adds the complement 20 slot to the draw-to-make cards", () => {
    const exercise = subitizeArchetype.generate({
      lesson: lessonK110,
      sourceLessonId: "K-110",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 6,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("T03-DRAW-COMPLEMENT"),
      spec: {
        archetype: "SubitizePartWhole",
        params: {
          frameCount: 2,
          responseKind: "draw-to-make",
          complementTarget: 20,
          cardCount: 2,
        },
      },
    });

    const data = exercise.data as SubitizePartWholeData;
    for (const card of data.drawToMakeCards!) {
      // Invariant: complement + teen = ٢٠
      expect(card.complementCount + card.teenTotal).toBe(20);
    }

    const html = renderToStaticMarkup(
      subitizeArchetype.render({ exercise, mode: "worksheet" })
    );
    expect(html).toContain('data-subitize-mode="draw-to-make"');
    expect(html).toContain("كم ينقصه حتى ٢٠");
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);

    const akHtml = renderToStaticMarkup(
      subitizeArchetype.render({ exercise, mode: "answer-key" })
    );
    expect(akHtml).toContain("data-solved-teen-complement");
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });
});

describe("Ticket 03 (Unit 9) — Slice 5: K-108 PoD anchors and Brain Builder data", () => {
  const archetype = getExerciseArchetype("CompareGroups");
  const lessonK108 = catalog.getLesson("K", 108)!;

  it("anchorFullFrame PoD pins the larger frame at ١٠ so missing ghosts equal the difference, within the tier cap", () => {
    for (const tier of ["Easy", "Intermediate", "Advanced"] as const) {
      for (let seedIdx = 0; seedIdx < 8; seedIdx++) {
        const exercise = archetype.generate({
          lesson: lessonK108,
          sourceLessonId: "K-108",
          sectionId: "challenge",
          exerciseIndex: 0,
          exerciseNumber: 5,
          difficultyLevel: tier,
          rng: createSeededRandom(`T03-ANCHOR-${tier}-${seedIdx}`),
          spec: {
            archetype: "CompareGroups",
            params: {
              compareMode: "find-difference",
              visualKind: "ten-frame-pair",
              iconSetKind: "solids-3d",
              anchorFullFrame: true,
              showMissingAsGhost: true,
              targetComparison: "fewer",
              numberRange: [5, 10],
              itemCount: 1,
            },
          },
        });

        const data = exercise.data as CompareGroupsData;
        expect(data.iconSetKind).toBe("solids-3d");
        for (const item of data.items) {
          expect(item.difference).toBe(Math.abs(item.countA - item.countB));
          // §6.2: the tier difference cap holds even when anchored at ١٠
          expect(item.difference).toBeGreaterThanOrEqual(1);
          expect(item.difference).toBeLessThanOrEqual(TIER_DIFF_CAPS[tier]);
          // The larger group is anchored at the range max (١٠) and the
          // smaller frame is missing exactly `difference` shapes
          expect(Math.max(item.countA, item.countB)).toBe(10);
          expect(10 - item.difference).toBe(Math.min(item.countA, item.countB));
        }

        const akHtml = renderToStaticMarkup(
          archetype.render({ exercise, mode: "answer-key" })
        );
        expect(akHtml).toContain("data-solved-compare-difference");
        expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
      }
    }
  });

  it("showCounts Brain Builder gives the counts as data and asks only for the difference", () => {
    const exercise = archetype.generate({
      lesson: lessonK108,
      sourceLessonId: "K-108",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 6,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("T03-SHOW-COUNTS"),
      spec: {
        archetype: "CompareGroups",
        params: {
          compareMode: "find-difference",
          visualKind: "ten-frame-pair",
          showCounts: true,
          targetComparison: "more",
          numberRange: [5, 10],
          itemCount: 1,
        },
      },
    });

    const data = exercise.data as CompareGroupsData;
    expect(data.showCounts).toBe(true);
    const item = data.items[0];
    expect(item.difference).toBe(Math.abs(item.countA - item.countB));

    const html = renderToStaticMarkup(
      archetype.render({ exercise, mode: "worksheet" })
    );
    // Counts rendered as static given data
    expect(html).toContain("(أ) = ");
    expect(html).toContain("(ب) = ");
    // No count slots to fill — only the difference slot
    expect(html).not.toContain("عدد (أ):");
    expect(html).toContain('data-find-difference="true"');
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });
});

describe("Ticket 03 (Unit 9) — Slice 6: K-107 to K-110 registration and full surfaces", () => {
  it("renders K-107 with the K-100 warm-up, find-difference practice, and DARE to COMPARE – A", () => {
    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 107,
      seed: "K107-SEAM-TEST",
      difficultyLevel: "scaffolded",
    });

    expect(generated.warmUpSourceLessonId).toBe("K-100");
    expect(generated.worksheet.sections).toHaveLength(3);
    expect(generated.worksheet.header.lessonTitleAr).toContain(
      "مقارنة كم أكثر"
    );
    expect(
      generated.worksheet.sections[0].exercises.length
    ).toBeGreaterThanOrEqual(1);
    expect(
      generated.worksheet.sections[1].exercises.length
    ).toBeGreaterThanOrEqual(2);
    expect(
      generated.worksheet.sections[2].exercises.length
    ).toBeGreaterThanOrEqual(2);

    const wsHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 107,
      seed: "K107-SEAM-TEST",
      viewMode: "worksheet",
    });
    const akHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 107,
      seed: "K107-SEAM-TEST",
      viewMode: "answer-key",
    });
    const tnHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 107,
      seed: "K107-SEAM-TEST",
      viewMode: "teacher-notes",
    });

    // WB: find-difference on linear models
    expect(wsHtml).toContain('data-find-difference="true"');
    expect(wsHtml).toContain("data-compare-item=");
    expect(wsHtml).toContain('data-visual-model="linear-comparison"');
    // BB: PictureGraphRead find-difference (DARE to COMPARE – A)
    expect(wsHtml).toContain('data-archetype="PictureGraphRead"');
    expect(akHtml).toContain("data-solved-compare-difference");
    expect(akHtml).toContain("data-solved-comparison-difference");
    expect(akHtml).toContain("تلميح الاستراتيجية");
    // Starred (enrichment) lesson Teacher Notes
    expect(tnHtml).toContain("درس إثرائي");

    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(tnHtml)).toEqual([]);
  });

  it("renders K-108 with the K-107 warm-up, ten-frame find-difference practice, and DARE to COMPARE – B", () => {
    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 108,
      seed: "K108-SEAM-TEST",
      difficultyLevel: "scaffolded",
    });

    expect(generated.warmUpSourceLessonId).toBe("K-107");
    expect(generated.worksheet.sections).toHaveLength(3);
    expect(generated.worksheet.header.lessonTitleAr).toContain(
      "مقارنة كم أكثر"
    );
    expect(
      generated.worksheet.sections[0].exercises.length
    ).toBeGreaterThanOrEqual(1);
    expect(
      generated.worksheet.sections[1].exercises.length
    ).toBeGreaterThanOrEqual(2);
    expect(
      generated.worksheet.sections[2].exercises.length
    ).toBeGreaterThanOrEqual(2);

    const wsHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 108,
      seed: "K108-SEAM-TEST",
      viewMode: "worksheet",
    });
    const akHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 108,
      seed: "K108-SEAM-TEST",
      viewMode: "answer-key",
    });
    const tnHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 108,
      seed: "K108-SEAM-TEST",
      viewMode: "teacher-notes",
    });

    // WB: find-difference on ten-frame pairs
    expect(wsHtml).toContain('data-find-difference="true"');
    expect(wsHtml).toContain("data-compare-item=");
    expect(wsHtml).toContain('data-visual-model="ten-frame"');
    expect(akHtml).toContain("data-solved-compare-difference");
    expect(akHtml).toContain("تلميح الاستراتيجية");
    expect(tnHtml).toContain("درس إثرائي");

    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(tnHtml)).toEqual([]);
  });

  it("renders K-109 with the K-103 warm-up, teen-frame-pair practice, and HOW MANY? – A", () => {
    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 109,
      seed: "K109-SEAM-TEST",
      difficultyLevel: "scaffolded",
    });

    expect(generated.warmUpSourceLessonId).toBe("K-103");
    expect(generated.worksheet.sections).toHaveLength(3);
    expect(generated.worksheet.header.lessonTitleAr).toContain("جزء واحد");
    expect(
      generated.worksheet.sections[0].exercises.length
    ).toBeGreaterThanOrEqual(1);
    expect(
      generated.worksheet.sections[1].exercises.length
    ).toBeGreaterThanOrEqual(2);
    expect(
      generated.worksheet.sections[2].exercises.length
    ).toBeGreaterThanOrEqual(2);

    const wsHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 109,
      seed: "K109-SEAM-TEST",
      viewMode: "worksheet",
    });
    const akHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 109,
      seed: "K109-SEAM-TEST",
      viewMode: "answer-key",
    });

    // WB: stacked ten-frame pairs (write how many)
    expect(wsHtml).toContain('data-archetype="SubitizePartWhole"');
    expect(wsHtml).toContain('data-subitize-mode="teen-frame-pair"');
    expect(wsHtml).toContain('data-frame-count="2"');
    // BB: draw circles to make the teen number (HOW MANY? – A)
    expect(wsHtml).toContain('data-subitize-mode="draw-to-make"');
    expect(akHtml).toContain("data-solved-teen-total");
    expect(akHtml).toContain("تلميح الاستراتيجية");

    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });

  it("renders K-110 with the K-109 warm-up, both-parts practice with complement 20, and HOW MANY? – B", () => {
    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 110,
      seed: "K110-SEAM-TEST",
      difficultyLevel: "scaffolded",
    });

    expect(generated.warmUpSourceLessonId).toBe("K-109");
    expect(generated.worksheet.sections).toHaveLength(3);
    expect(generated.worksheet.header.lessonTitleAr).toContain("الجزأين");
    expect(
      generated.worksheet.sections[0].exercises.length
    ).toBeGreaterThanOrEqual(1);
    expect(
      generated.worksheet.sections[1].exercises.length
    ).toBeGreaterThanOrEqual(2);
    expect(
      generated.worksheet.sections[2].exercises.length
    ).toBeGreaterThanOrEqual(2);

    const wsHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 110,
      seed: "K110-SEAM-TEST",
      viewMode: "worksheet",
    });
    const akHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 110,
      seed: "K110-SEAM-TEST",
      viewMode: "answer-key",
    });

    // WB: stacked pairs asking both parts (how many + complement to 20)
    expect(wsHtml).toContain('data-subitize-mode="teen-frame-pair"');
    expect(wsHtml).toContain("كم ينقصه حتى ٢٠");
    // BB: draw circles + complement 20 (HOW MANY? – B)
    expect(wsHtml).toContain('data-subitize-mode="draw-to-make"');
    expect(akHtml).toContain("data-solved-teen-total");
    expect(akHtml).toContain("data-solved-teen-complement");
    expect(akHtml).toContain("تلميح الاستراتيجية");

    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });
});
