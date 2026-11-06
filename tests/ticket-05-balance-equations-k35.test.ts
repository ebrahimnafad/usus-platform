import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import "@/registry/bootstrap";
import { VisualModelView } from "@/visual-models/registry";
import { createBalanceScaleSpec } from "@/visual-models/unit-3-models";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 05 (Unit 3) — Slice 1: Balance Scale Visual Model", () => {
  it("renders a 212×136px Balance Scale with RTL pans (digit, Expression, Answer Slot), tilt states, grayscale cues, and Eastern Arabic numerals", () => {
    // 1. Level scale with Expression on right pan and Answer Slot on left pan (Teeter Tots puzzle)
    const levelSlotScale = createBalanceScaleSpec({
      rightPan: {
        kind: "expression",
        value: 4,
        expressionAr: "٣ + ١",
      },
      leftPan: {
        kind: "slot",
        value: 4,
        slotKind: "unknown",
      },
    });

    const htmlW = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: levelSlotScale,
        solved: false,
      })
    );
    const htmlA = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: levelSlotScale,
        solved: true,
      })
    );

    expect(htmlW).toContain('data-visual-model="balance-scale"');
    expect(htmlW).toContain("width:212px");
    expect(htmlW).toContain("height:136px");
    expect(htmlW).toContain('data-direction="rtl"');
    expect(htmlW).toContain('data-scale-tilt="level"');
    expect(htmlW).toContain('data-scale-pan="right"');
    expect(htmlW).toContain('data-scale-pan="left"');
    expect(htmlW).toContain("٣ + ١");
    expect(htmlW).toContain('data-answer-slot="unknown"');

    // In Answer Key mode, the Answer Slot resolves to ٤
    expect(htmlA).toContain('data-answer-slot="solved-digit"');
    expect(htmlA).toContain('data-solved-balance-left="٤"');

    // 2. Tilted scale with unequal values (right-heavy: 5 vs 3; left-heavy: 2 vs 4) and reusable subtraction expression (K-45: ٥ - ١)
    const rightHeavyScale = createBalanceScaleSpec({
      rightPan: {
        kind: "digit",
        value: 5,
      },
      leftPan: {
        kind: "expression",
        value: 3,
        expressionAr: "٤ − ١",
      },
    });
    const leftHeavyScale = createBalanceScaleSpec({
      rightPan: {
        kind: "digit",
        value: 2,
      },
      leftPan: {
        kind: "digit",
        value: 4,
      },
    });

    const htmlRightHeavy = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: rightHeavyScale,
        solved: true,
      })
    );
    const htmlLeftHeavy = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: leftHeavyScale,
        solved: true,
      })
    );

    expect(htmlRightHeavy).toContain('data-scale-tilt="right-heavy"');
    expect(htmlRightHeavy).toContain("٤ − ١");
    expect(htmlLeftHeavy).toContain('data-scale-tilt="left-heavy"');

    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlRightHeavy)).toEqual([]);
  });

  it("Slice 2a: JudgeEquality mode true-false renders صح/خطأ choices, circles the right choice in Answer Key, and includes both ٣ + ٢ = ٥ and ٥ = ٣ + ٢ forms", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { createSeededRandom } = await import("@/lib/seed");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");

    const lesson = getCurriculumCatalog().getLesson("K", 35)!;
    const def = getExerciseArchetype("JudgeEquality")!;

    const ex = def.generate({
      lesson,
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      rng: createSeededRandom("TF-SLICE2"),
      difficultyLevel: "Intermediate",
      sourceLessonId: "K-35",
      spec: {
        archetype: "JudgeEquality",
        params: {
          mode: "true-false",
          itemCount: 3,
          totalRange: [2, 5],
          minPart: 1,
        },
      },
    });

    const data =
      ex.data as import("@/archetypes/judge-equality").JudgeEqualityData;
    expect(data.mode).toBe("true-false");
    const items = data.rows.flatMap((r) => r.items);
    expect(items).toHaveLength(3);

    // Must contain at least one true and at least one false item, and every item's isCorrect matches its arithmetic
    expect(items.some((i) => i.isCorrect)).toBe(true);
    expect(items.some((i) => !i.isCorrect)).toBe(true);
    for (const item of items) {
      expect(item.isCorrect).toBe(item.part1 + item.part2 === item.shownTotal);
    }

    // Both standard (٣ + ٢ = ٥) and total-first (٥ = ٣ + ٢) layouts appear
    const layouts = new Set(items.map((i) => i.equationLayout));
    expect(layouts.has("standard")).toBe(true);
    expect(layouts.has("total-first")).toBe(true);

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );

    expect(htmlW).toContain('data-judge-mode="true-false"');
    expect(htmlW).toContain('data-tf-choice="true"');
    expect(htmlW).toContain('data-tf-choice="false"');
    expect(htmlW).not.toContain("data-circled-choice=");

    expect(htmlA).toContain("data-circled-choice=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("Slice 2b: JudgeEquality mode balance (Teeter Tots) renders a number bank and Balance Scales where every solution is in the bank and balances both pans", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { createSeededRandom } = await import("@/lib/seed");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");

    const lesson = getCurriculumCatalog().getLesson("K", 35)!;
    const def = getExerciseArchetype("JudgeEquality")!;

    const ex = def.generate({
      lesson,
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 1,
      rng: createSeededRandom("BAL-SLICE2"),
      difficultyLevel: "Intermediate",
      sourceLessonId: "K-35",
      spec: {
        archetype: "JudgeEquality",
        params: {
          mode: "balance",
          itemCount: 2,
          totalRange: [2, 5],
          minPart: 1,
        },
      },
    });

    const data =
      ex.data as import("@/archetypes/judge-equality").JudgeEqualityData;
    expect(data.mode).toBe("balance");
    expect(data.numberBank).toBeDefined();
    expect(data.numberBank!.length).toBeGreaterThanOrEqual(2);

    const items = data.rows.flatMap((r) => r.items);
    expect(items).toHaveLength(2);
    for (const item of items) {
      expect(item.rightValue).toBe(item.leftValue);
      expect(item.solutionValue).toBe(item.part1 + item.part2);
      expect(data.numberBank).toContain(item.solutionValue);
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );

    expect(htmlW).toContain('data-judge-mode="balance"');
    expect(htmlW).toContain('data-number-bank="true"');
    expect(htmlW).toContain('data-visual-model="balance-scale"');
    expect(htmlW).toContain('data-answer-slot="unknown"');
    expect(htmlA).toContain('data-answer-slot="solved-digit"');
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("Slice 3: generates and renders Lesson K-35 (Warm-Up from K-26, True/False Equations, Teeter Tots Balance Scales, Problem of the Day color pips, and both equation forms)", async () => {
    const { generateWorksheet } = await import("@/engine/worksheet-engine");
    const { renderWorksheetSurface } =
      await import("@/lib/render-worksheet-surface");

    const k35 = generateWorksheet({
      grade: "K",
      lessonNumber: 35,
      seed: "K35-SLICE3",
    });

    expect(k35.isAuthoredBlueprint).toBe(true);
    expect(k35.warmUpSourceLessonId).toBe("K-26");
    expect(k35.teacherNotes.summaryAr).toContain("=");

    const practiceExercises = k35.worksheet.sections[1].exercises;
    expect(
      practiceExercises.some(
        (ex) =>
          ex.archetype === "JudgeEquality" &&
          (ex.data as { mode?: string }).mode === "true-false"
      )
    ).toBe(true);

    const challengeExercises = k35.worksheet.sections[2].exercises;
    expect(
      challengeExercises.some(
        (ex) =>
          ex.archetype === "JudgeEquality" &&
          (ex.data as { mode?: string }).mode === "balance"
      )
    ).toBe(true);
    expect(challengeExercises.some((ex) => ex.archetype === "JoinParts")).toBe(
      true
    );

    const htmlW = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 35,
      seed: "K35-SLICE3",
      viewMode: "worksheet",
    });
    const htmlA = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 35,
      seed: "K35-SLICE3",
      viewMode: "answer-key",
    });

    expect(htmlW).toContain('data-judge-mode="true-false"');
    expect(htmlW).toContain('data-judge-mode="balance"');
    expect(htmlW).toContain('data-visual-model="balance-scale"');
    expect(htmlW).toContain('data-ghost-pip="true"');
    expect(htmlW).toContain('data-equation-layout="standard"');
    expect(htmlW).toContain('data-equation-layout="total-first"');

    expect(htmlA).toContain("data-circled-choice=");
    expect(htmlA).toContain('data-colored-pip="true"');
    expect(htmlA).toContain('data-strategy-hint="true"');
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("Slice 3 domain invariant across 25 seeds × 4 modes: every true-false item matches its arithmetic and every balance puzzle balances", async () => {
    const { generateWorksheet } = await import("@/engine/worksheet-engine");

    const modes = ["scaffolded", "Easy", "Intermediate", "Advanced"] as const;
    for (let s = 1; s <= 25; s++) {
      for (const difficultyLevel of modes) {
        const bundle = generateWorksheet({
          grade: "K",
          lessonNumber: 35,
          seed: `K35-INV-${s}`,
          difficultyLevel,
        });

        for (const section of bundle.worksheet.sections) {
          for (const ex of section.exercises) {
            expect(
              bundle.answerKey.strategyHintsByExerciseId[ex.id]?.trim().length
            ).toBeGreaterThan(0);

            if (ex.archetype === "JudgeEquality") {
              const data =
                ex.data as import("@/archetypes/judge-equality").JudgeEqualityData;
              const items = data.rows.flatMap((r) => r.items);

              if (data.mode === "true-false") {
                for (const item of items) {
                  expect(item.isCorrect).toBe(
                    item.part1 + item.part2 === item.shownTotal
                  );
                }
              }

              if (data.mode === "balance") {
                expect(data.numberBank).toBeDefined();
                for (const item of items) {
                  expect(item.rightValue).toBe(item.leftValue);
                  expect(item.solutionValue).toBe(item.part1 + item.part2);
                  expect(data.numberBank).toContain(item.solutionValue);
                }
              }
            }
          }
        }
      }
    }
  });
});
