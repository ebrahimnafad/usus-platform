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
  createLinearComparisonSpec,
  type LinearComparisonSpecOptions,
} from "@/visual-models/linear-comparison";
import type {
  CompareGroupsBlueprintParams,
  CompareGroupsData,
} from "@/archetypes/compare-groups";
import type { ConnectMatchData } from "@/domain/types";
import type { JudgeEqualityData } from "@/archetypes/judge-equality";
import "@/registry/bootstrap";

const TEST_SEEDS = Array.from({ length: 15 }, (_, i) => `K9-SEED-${i + 1}`);
const DIFFICULTY_TIERS = ["Easy", "Intermediate", "Advanced"] as const;

describe("Ticket 01 (Unit 9) — Slice 1: linear-comparison Visual Model", () => {
  it("renders at canonical size 660 × 120 px with RTL layout and data-visual-model marker", () => {
    const spec = createLinearComparisonSpec({
      groupA: {
        id: "A",
        labelAr: "(أ)",
        count: 6,
        iconKind: "everyday-object",
        objectId: "apple",
      },
      groupB: {
        id: "B",
        labelAr: "(ب)",
        count: 4,
        iconKind: "everyday-object",
        objectId: "banana",
      },
      targetComparison: "more",
    });

    const worksheetHtml = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );

    expect(worksheetHtml).toContain('data-visual-model="linear-comparison"');
    expect(worksheetHtml).toContain('data-direction="rtl"');
    expect(worksheetHtml).toContain("width:660px");
    expect(worksheetHtml).toContain("height:120px");
    expect(worksheetHtml).toContain('data-count-a="٦"');
    expect(worksheetHtml).toContain('data-count-b="٤"');
    // In worksheet mode, extra items are not highlighted with data-extra-item
    expect(worksheetHtml).not.toContain("data-extra-item=");
    expect(worksheetHtml).not.toContain("data-circled-group=");
  });

  it("in Answer Key mode, highlights extra items in the larger row and marks circled group", () => {
    const spec = createLinearComparisonSpec({
      groupA: {
        id: "A",
        labelAr: "(أ)",
        count: 7,
        iconKind: "everyday-object",
        objectId: "star",
      },
      groupB: {
        id: "B",
        labelAr: "(ب)",
        count: 4,
        iconKind: "everyday-object",
        objectId: "ball",
      },
      targetComparison: "more",
      circledGroup: "A",
    });

    const answerKeyHtml = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: true })
    );

    expect(answerKeyHtml).toContain('data-circled-group="A"');
    // Group A has 7 items, Group B has 4 items -> exactly 3 extra items in row A
    const extraMatches = answerKeyHtml.match(/data-extra-item="true"/g);
    expect(extraMatches).not.toBeNull();
    expect(extraMatches?.length).toBe(3);
  });
});

describe("Ticket 01 (Unit 9) — Slice 2: CompareGroups Archetype Domain Invariants", () => {
  it("generates comparison items where the more group is strictly greater (or equal at Advanced) across seeds and tiers", () => {
    const archetype = getExerciseArchetype("CompareGroups");
    const catalog = getCurriculumCatalog();
    const lesson99 = catalog.getLesson("K", 99)!;

    for (const seed of TEST_SEEDS) {
      for (const tier of DIFFICULTY_TIERS) {
        const exercise = archetype.generate({
          lesson: lesson99,
          sourceLessonId: "K-99",
          sectionId: "practice",
          exerciseIndex: 0,
          exerciseNumber: 2,
          difficultyLevel: tier,
          rng: createSeededRandom(`${seed}-${tier}`),
          spec: {
            archetype: "CompareGroups",
            params: {
              compareMode: "quantify-and-compare",
              visualKind: "linear-comparison",
              targetComparison: "more",
              numberRange: [1, 10],
            },
          },
        });

        const data = exercise.data as CompareGroupsData;
        expect(data.kind).toBe("CompareGroups");
        expect(data.items.length).toBeGreaterThanOrEqual(1);

        for (const item of data.items) {
          expect(item.countA).toBeGreaterThanOrEqual(1);
          expect(item.countA).toBeLessThanOrEqual(10);
          expect(item.countB).toBeGreaterThanOrEqual(1);
          expect(item.countB).toBeLessThanOrEqual(10);

          if (tier !== "Advanced") {
            expect(item.countA).not.toBe(item.countB);
          }

          if (item.countA > item.countB) {
            expect(item.moreGroup).toBe("A");
            expect(item.fewerGroup).toBe("B");
          } else if (item.countB > item.countA) {
            expect(item.moreGroup).toBe("B");
            expect(item.fewerGroup).toBe("A");
          } else {
            expect(item.moreGroup).toBe("equal");
            expect(item.fewerGroup).toBe("equal");
          }

          expect(item.difference).toBe(Math.abs(item.countA - item.countB));
        }

        // Render check: 0 Western digits in HTML
        const html = renderToStaticMarkup(
          archetype.render({ exercise, mode: "worksheet" })
        );
        expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);

        // Answer key render: contains solved digits and circled choice
        const akHtml = renderToStaticMarkup(
          archetype.render({ exercise, mode: "answer-key" })
        );
        expect(akHtml).toContain('data-circled-choice="true"');
      }
    }
  });

  it("supports ten-frame-pair visualKind with compare-the-parts strategy", () => {
    const archetype = getExerciseArchetype("CompareGroups");
    const catalog = getCurriculumCatalog();
    const lesson101 = catalog.getLesson("K", 101)!;

    const exercise = archetype.generate({
      lesson: lesson101,
      sourceLessonId: "K-101",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("TEN-FRAME-PAIR-TEST"),
      spec: {
        archetype: "CompareGroups",
        params: {
          compareMode: "compare-only",
          visualKind: "ten-frame-pair",
          strategy: "compare-the-parts",
          targetComparison: "more",
          numberRange: [5, 10],
        },
      },
    });

    const data = exercise.data as CompareGroupsData;
    expect(data.visualKind).toBe("ten-frame-pair");
    expect(data.items[0].countA).toBeGreaterThanOrEqual(5);
    expect(data.items[0].countB).toBeGreaterThanOrEqual(5);

    const akHtml = renderToStaticMarkup(
      archetype.render({ exercise, mode: "answer-key" })
    );
    expect(akHtml).toContain("data-ten-frame-group=");
    expect(akHtml).toContain("data-circled-group=");
    expect(akHtml).toContain('data-circled-choice="true"');
  });
});

describe("Ticket 01 (Unit 9) — Slice 3: ConnectMatch and JudgeEquality Extensions", () => {
  it("ConnectMatch mode ten-frame-to-comparison generates valid more/fewer matching pairs", () => {
    const archetype = getExerciseArchetype("ConnectMatch");
    const catalog = getCurriculumCatalog();
    const lesson101 = catalog.getLesson("K", 101)!;

    const exercise = archetype.generate({
      lesson: lesson101,
      sourceLessonId: "K-101",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 5,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("CM-COMP-TEST"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "ten-frame-to-comparison",
          pairCount: 3,
        },
      },
    });

    const data = exercise.data as ConnectMatchData;
    expect(data.kind).toBe("ConnectMatch");
    expect(data.pairs.length).toBe(3);
    for (const p of data.pairs) {
      expect(p.rightItem.kind).toBe("ten-frame");
      expect(p.leftItem.kind).toBe("shape-description");
      expect(p.connectionReasonAr).toContain("أكثر");
    }

    const html = renderToStaticMarkup(
      archetype.render({ exercise, mode: "worksheet" })
    );
    expect(html).toContain('data-ten-frame-description-endpoint="true"');
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });

  it("ConnectMatch mode ten-frame-to-comparison with missingTotal: true carries total AnswerSlot", () => {
    const archetype = getExerciseArchetype("ConnectMatch");
    const catalog = getCurriculumCatalog();
    const lesson102 = catalog.getLesson("K", 102)!;

    const exercise = archetype.generate({
      lesson: lesson102,
      sourceLessonId: "K-102",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 5,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("CM-COMP-TOTAL-TEST"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "ten-frame-to-comparison",
          missingTotal: true,
          pairCount: 3,
        },
      },
    });

    const akHtml = renderToStaticMarkup(
      archetype.render({ exercise, mode: "answer-key" })
    );
    expect(akHtml).toContain('data-solved-match-description-total="١٠"');
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });

  it("JudgeEquality mode comparison-statement generates animal count slots and true/false items", () => {
    const archetype = getExerciseArchetype("JudgeEquality");
    const catalog = getCurriculumCatalog();
    const lesson100 = catalog.getLesson("K", 100)!;

    const exercise = archetype.generate({
      lesson: lesson100,
      sourceLessonId: "K-100",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 5,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("JE-COMP-STMT-TEST"),
      spec: {
        archetype: "JudgeEquality",
        params: {
          mode: "comparison-statement",
          judgementKind: "comparison-statement",
        },
      },
    });

    const data = exercise.data as JudgeEqualityData;
    expect(data.mode).toBe("comparison-statement");
    expect(data.comparisonCategories?.length).toBe(3);
    expect(data.comparisonStatements?.length).toBe(3);

    const akHtml = renderToStaticMarkup(
      archetype.render({ exercise, mode: "answer-key" })
    );
    expect(akHtml).toContain("data-category-card=");
    expect(akHtml).toContain("data-statement-id=");
    expect(akHtml).toContain('data-tf-choice="true"');
    expect(akHtml).toContain('data-tf-choice="false"');
    expect(akHtml).toContain('data-circled-choice="');
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });
});

describe("Ticket 01 (Unit 9) — Slice 4: Lessons K-99 to K-102 Registration and Full Surfaces", () => {
  it("renders K-99 with Warm-Up from K-63, CompareGroups linear practice, and PictureGraphRead MORE OR LESS A", () => {
    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 99,
      seed: "K99-SEAM-TEST",
      difficultyLevel: "scaffolded",
    });

    expect(generated.worksheet.sections).toHaveLength(3);
    expect(generated.worksheet.header.lessonTitleAr).toContain(
      "مقارنة المجموعات"
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
      lessonNumber: 99,
      seed: "K99-SEAM-TEST",
      viewMode: "worksheet",
    });
    const akHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 99,
      seed: "K99-SEAM-TEST",
      viewMode: "answer-key",
    });
    const tnHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 99,
      seed: "K99-SEAM-TEST",
      viewMode: "teacher-notes",
    });

    expect(wsHtml).toContain('data-visual-model="linear-comparison"');
    expect(akHtml).toContain("تلميح الاستراتيجية");
    expect(tnHtml).toContain("ملاحظات المعلم");

    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(tnHtml)).toEqual([]);
  });

  it("renders K-100 with Warm-Up from K-99, quantify-and-compare practice, and JudgeEquality MORE OR LESS B", () => {
    const wsHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 100,
      seed: "K100-SEAM-TEST",
      viewMode: "worksheet",
    });
    const akHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 100,
      seed: "K100-SEAM-TEST",
      viewMode: "answer-key",
    });

    expect(wsHtml).toContain('data-visual-model="linear-comparison"');
    expect(wsHtml).toContain('data-judge-mode="comparison-statement"');
    expect(akHtml).toContain("تلميح الاستراتيجية");

    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });

  it("renders K-101 with Warm-Up from K-100, ten-frame-pair practice, and ConnectMatch MATCHING A", () => {
    const wsHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 101,
      seed: "K101-SEAM-TEST",
      viewMode: "worksheet",
    });
    const akHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 101,
      seed: "K101-SEAM-TEST",
      viewMode: "answer-key",
    });

    expect(wsHtml).toContain('data-visual-model="ten-frame"');
    expect(wsHtml).toContain('data-ten-frame-description-endpoint="true"');
    expect(akHtml).toContain("تلميح الاستراتيجية");

    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });

  it("renders K-102 with Warm-Up from K-101, quantify ten-frame practice, and ConnectMatch MATCHING B with total", () => {
    const wsHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 102,
      seed: "K102-SEAM-TEST",
      viewMode: "worksheet",
    });
    const akHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 102,
      seed: "K102-SEAM-TEST",
      viewMode: "answer-key",
    });

    expect(wsHtml).toContain('data-visual-model="ten-frame"');
    expect(akHtml).toContain('data-solved-match-description-total="١٠"');
    expect(akHtml).toContain("تلميح الاستراتيجية");

    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });
});
