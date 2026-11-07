import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import "@/registry/bootstrap";
import { VisualModelView } from "@/visual-models/registry";
import { createBalanceScaleSpec } from "@/visual-models/unit-3-models";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 03 (Unit 4) — Slice 1: Balance Scale Subtraction & Missing Part/Total Pans", () => {
  it("renders subtraction expression pans (٥ − ١), generalized missingTerm pans for missing Part (٥ − ؟) and missing Total (؟ − ١), and two-Expression pans (٥ − ١ vs ٢ + ٢)", () => {
    // 1. Missing Part in a subtraction expression pan (٥ − ؟) against a slot pan (٤)
    const missingPartScale = createBalanceScaleSpec({
      rightPan: {
        kind: "expression",
        value: 4,
        expressionAr: "٥ − ١",
        missingTerm: {
          operation: "subtract",
          missingRole: "part",
          givenValue: 5,
          missingValue: 1,
        },
      },
      leftPan: {
        kind: "slot",
        value: 4,
        slotKind: "unknown",
      },
    });

    const htmlPartW = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: missingPartScale,
        solved: false,
      })
    );
    const htmlPartA = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: missingPartScale,
        solved: true,
      })
    );

    expect(htmlPartW).toContain('data-visual-model="balance-scale"');
    expect(htmlPartW).toContain('data-missing-role="part"');
    expect(htmlPartW).toContain("٥−");
    expect(htmlPartW).toContain('data-answer-slot="unknown"');
    expect(htmlPartA).toContain('data-solved-balance-right="١"');
    expect(htmlPartA).toContain('data-solved-balance-left="٤"');

    // 2. Missing Total in a subtraction expression pan (؟ − ٢) against a digit pan (٣)
    const missingTotalScale = createBalanceScaleSpec({
      rightPan: {
        kind: "expression",
        value: 3,
        expressionAr: "٥ − ٢",
        missingTerm: {
          operation: "subtract",
          missingRole: "total",
          givenValue: 2,
          missingValue: 5,
        },
      },
      leftPan: {
        kind: "digit",
        value: 3,
      },
    });

    const htmlTotalW = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: missingTotalScale,
        solved: false,
      })
    );
    const htmlTotalA = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: missingTotalScale,
        solved: true,
      })
    );

    expect(htmlTotalW).toContain('data-missing-role="total"');
    expect(htmlTotalW).toContain("−٢");
    expect(htmlTotalA).toContain('data-solved-balance-right="٥"');

    // 3. Two-Expression pans: ٥ − ١ against ٢ + ٢
    const twoExprScale = createBalanceScaleSpec({
      rightPan: {
        kind: "expression",
        value: 4,
        expressionAr: "٥ − ١",
      },
      leftPan: {
        kind: "expression",
        value: 4,
        expressionAr: "٢ + ٢",
      },
    });

    const htmlTwoExpr = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: twoExprScale,
        solved: false,
      })
    );
    expect(htmlTwoExpr).toContain('data-scale-tilt="level"');
    expect(htmlTwoExpr).toContain("٥ − ١");
    expect(htmlTwoExpr).toContain("٢ + ٢");

    expect(findWesternNumeralsInRenderedHtml(htmlPartW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlPartA)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlTotalW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlTotalA)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlTwoExpr)).toEqual([]);
  });
});

describe("Ticket 03 (Unit 4) — Slice 2: JudgeEquality with operation: subtract and K-35 Seed Preservation", () => {
  it("preserves K-35 output for the same Seeds and supports operation: subtract in true-false (standard & reversed ٣ = ٥ − ٢) and balance (missing Part, missing Total, and Advanced/Challenge two-Expression pans)", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { createSeededRandom } = await import("@/lib/seed");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");

    const catalog = getCurriculumCatalog();
    const lessonK45 = catalog.getLesson("K", 45)!;
    const def = getExerciseArchetype("JudgeEquality")!;

    // 1. K-35 output is unchanged when operation defaults to "add" vs explicit operation: "add"
    const lessonK35 = catalog.getLesson("K", 35)!;
    for (const mode of ["true-false", "balance", "whats-wrong"] as const) {
      const exImplicit = def.generate({
        lesson: lessonK35,
        sectionId: mode === "balance" ? "challenge" : "practice",
        exerciseIndex: 0,
        exerciseNumber: 1,
        rng: createSeededRandom(`K35-REG-${mode}`),
        difficultyLevel: "Intermediate",
        sourceLessonId: "K-35",
        spec: {
          archetype: "JudgeEquality",
          params: { mode, totalRange: [2, 5], minPart: 1 },
        },
      });
      const exExplicit = def.generate({
        lesson: lessonK35,
        sectionId: mode === "balance" ? "challenge" : "practice",
        exerciseIndex: 0,
        exerciseNumber: 1,
        rng: createSeededRandom(`K35-REG-${mode}`),
        difficultyLevel: "Intermediate",
        sourceLessonId: "K-35",
        spec: {
          archetype: "JudgeEquality",
          params: { operation: "add", mode, totalRange: [2, 5], minPart: 1 },
        },
      });
      expect(exImplicit).toEqual(exExplicit);
      expect(
        renderToStaticMarkup(
          def.render({ exercise: exImplicit, mode: "worksheet" })
        )
      ).toBe(
        renderToStaticMarkup(
          def.render({ exercise: exExplicit, mode: "worksheet" })
        )
      );
    }

    // 2. Subtraction true-false mode: standard (٥ − ١ = ٣) and reversed (٣ = ٥ − ٢)
    const exTrueFalse = def.generate({
      lesson: lessonK45,
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      rng: createSeededRandom("K45-TF-SUB"),
      difficultyLevel: "Intermediate",
      sourceLessonId: "K-45",
      spec: {
        archetype: "JudgeEquality",
        params: {
          operation: "subtract",
          mode: "true-false",
          itemCount: 3,
          totalRange: [2, 5],
          minPart: 1,
        },
      },
    });

    const tfData =
      exTrueFalse.data as import("@/archetypes/judge-equality").JudgeEqualityData;
    expect(tfData.operation).toBe("subtract");
    const tfItems = tfData.rows.flatMap((r) => r.items);
    expect(tfItems).toHaveLength(3);
    expect(tfItems.some((i) => i.isCorrect)).toBe(true);
    expect(tfItems.some((i) => !i.isCorrect)).toBe(true);

    // Both standard and total-first (reversed: ٣ = ٥ − ٢) layouts appear
    const layouts = new Set(tfItems.map((i) => i.equationLayout));
    expect(layouts.has("standard")).toBe(true);
    expect(layouts.has("total-first")).toBe(true);

    for (const item of tfItems) {
      expect(item.isCorrect).toBe(item.realTotal - item.part1 === item.part2);
      expect(item.isCorrect).toBe(item.rightValue === item.leftValue);
    }

    const htmlTfW = renderToStaticMarkup(
      def.render({ exercise: exTrueFalse, mode: "worksheet" })
    );
    const htmlTfA = renderToStaticMarkup(
      def.render({ exercise: exTrueFalse, mode: "answer-key" })
    );
    expect(htmlTfW).toContain('data-equation-operation="subtract"');
    expect(htmlTfW).toContain("−");
    expect(htmlTfW).not.toContain("+");
    expect(htmlTfW).toContain('data-tf-choice="true"');
    expect(htmlTfW).toContain('data-tf-choice="false"');
    expect(htmlTfA).toContain("data-circled-choice=");
    expect(findWesternNumeralsInRenderedHtml(htmlTfW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlTfA)).toEqual([]);

    // 3. Subtraction balance mode (Teeter Tots): missing Part (٥ − ؟) and missing Total (؟ − ٢)
    const exBalance = def.generate({
      lesson: lessonK45,
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 1,
      rng: createSeededRandom("K45-BAL-SUB"),
      difficultyLevel: "Intermediate",
      sourceLessonId: "K-45",
      spec: {
        archetype: "JudgeEquality",
        params: {
          operation: "subtract",
          mode: "balance",
          itemCount: 2,
          totalRange: [2, 5],
          minPart: 1,
        },
      },
    });

    const balData =
      exBalance.data as import("@/archetypes/judge-equality").JudgeEqualityData;
    expect(balData.operation).toBe("subtract");
    expect(balData.numberBank).toBeDefined();
    const balItems = balData.rows.flatMap((r) => r.items);
    expect(balItems).toHaveLength(2);

    const htmlBalW = renderToStaticMarkup(
      def.render({ exercise: exBalance, mode: "worksheet" })
    );
    const htmlBalA = renderToStaticMarkup(
      def.render({ exercise: exBalance, mode: "answer-key" })
    );
    expect(htmlBalW).toContain('data-missing-role="part"');
    expect(htmlBalW).toContain('data-missing-role="total"');

    for (const item of balItems) {
      expect(item.rightValue).toBe(item.leftValue);
      expect(balData.numberBank).toContain(item.solutionValue);
      if (item.secondarySolutionValue !== undefined) {
        expect(balData.numberBank).toContain(item.secondarySolutionValue);
      }
    }
    expect(findWesternNumeralsInRenderedHtml(htmlBalW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlBalA)).toEqual([]);

    // 4. Two-Expression pans allowed at Advanced / Challenge, but suppressed at Easy / Practice
    const exBalAdv = def.generate({
      lesson: lessonK45,
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 1,
      rng: createSeededRandom("K45-BAL-ADV"),
      difficultyLevel: "Advanced",
      sourceLessonId: "K-45",
      spec: {
        archetype: "JudgeEquality",
        params: {
          operation: "subtract",
          mode: "balance",
          twoExpressionPans: true,
          itemCount: 2,
          totalRange: [3, 5],
          minPart: 1,
        },
      },
    });
    const advItems = (
      exBalAdv.data as import("@/archetypes/judge-equality").JudgeEqualityData
    ).rows.flatMap((r) => r.items);
    for (const item of advItems) {
      const meta = item.model.meta as {
        rightPan: import("@/visual-models/unit-3-models").BalancePanSpec;
        leftPan: import("@/visual-models/unit-3-models").BalancePanSpec;
      };
      expect(meta.rightPan.kind).toBe("expression");
      expect(meta.leftPan.kind).toBe("expression");
      expect(meta.rightPan.value).toBe(meta.leftPan.value);
    }

    const exBalEasyPractice = def.generate({
      lesson: lessonK45,
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      rng: createSeededRandom("K45-BAL-EASY"),
      difficultyLevel: "Easy",
      sourceLessonId: "K-45",
      spec: {
        archetype: "JudgeEquality",
        params: {
          operation: "subtract",
          mode: "balance",
          twoExpressionPans: true,
          itemCount: 2,
          totalRange: [2, 4],
          minPart: 1,
        },
      },
    });
    const easyItems = (
      exBalEasyPractice.data as import("@/archetypes/judge-equality").JudgeEqualityData
    ).rows.flatMap((r) => r.items);
    for (const item of easyItems) {
      const meta = item.model.meta as {
        rightPan: import("@/visual-models/unit-3-models").BalancePanSpec;
        leftPan: import("@/visual-models/unit-3-models").BalancePanSpec;
      };
      // Not both expression pans in Easy Practice
      expect(
        meta.rightPan.kind === "expression" &&
          meta.leftPan.kind === "expression"
      ).toBe(false);
    }
  });
});

describe("Ticket 03 (Unit 4) — Slice 3: Lesson K-45 Blueprint, Localization & Domain Invariants", () => {
  it("generates and renders Lesson K-45 (Warm-Up from K-42, True/False subtraction Equations, Teeter Tots Balance Scales, Problem of the Day student cross-off, reversed form ٣ = ٥ − ٢, and unknown Totals)", async () => {
    const { generateWorksheet } = await import("@/engine/worksheet-engine");
    const { renderWorksheetSurface } =
      await import("@/lib/render-worksheet-surface");

    const k45 = generateWorksheet({
      grade: "K",
      lessonNumber: 45,
      seed: "UNIT4-K45-SLICE3",
    });

    expect(k45.isAuthoredBlueprint).toBe(true);
    expect(k45.lesson.standards).toEqual(["K.CC.7"]);
    expect(k45.lesson.isEnrichment).toBe(true);
    expect(k45.warmUpSourceLessonId).toBe("K-42");
    expect(k45.worksheet.sections[0].sourceLessonId).toBe("K-42");
    expect(k45.teacherNotes.summaryAr).toContain("=");
    expect(k45.teacherNotes.enrichmentNoteAr).toBeDefined();
    expect(k45.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k45.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    // Practice (Workbook): two true-false subtraction JudgeEquality exercises
    const practiceExercises = k45.worksheet.sections[1].exercises;
    expect(practiceExercises).toHaveLength(2);
    for (const ex of practiceExercises) {
      expect(ex.archetype).toBe("JudgeEquality");
      const data =
        ex.data as import("@/archetypes/judge-equality").JudgeEqualityData;
      expect(data.operation).toBe("subtract");
      expect(data.mode).toBe("true-false");
    }

    // Challenge & Assessment: Teeter Tots (balance) + Problem of the Day (TakeAway with student cross-off)
    const challengeExercises = k45.worksheet.sections[2].exercises;
    expect(challengeExercises).toHaveLength(2);
    expect(challengeExercises[0].archetype).toBe("JudgeEquality");
    const balData = challengeExercises[0]
      .data as import("@/archetypes/judge-equality").JudgeEqualityData;
    expect(balData.operation).toBe("subtract");
    expect(balData.mode).toBe("balance");

    expect(challengeExercises[1].archetype).toBe("TakeAway");
    const potdData = challengeExercises[1]
      .data as import("@/archetypes/take-away").TakeAwayData;
    expect(potdData.responseForm).toBe("equation");
    expect(potdData.items[0].crossOffMode).toBe("student");

    const htmlW = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 45,
      seed: "UNIT4-K45-SLICE3",
      viewMode: "worksheet",
    });
    const htmlA = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 45,
      seed: "UNIT4-K45-SLICE3",
      viewMode: "answer-key",
    });
    const htmlN = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 45,
      seed: "UNIT4-K45-SLICE3",
      viewMode: "teacher-notes",
    });

    expect(htmlW).toContain('data-judge-mode="true-false"');
    expect(htmlW).toContain('data-judge-mode="balance"');
    expect(htmlW).toContain('data-visual-model="balance-scale"');
    expect(htmlW).toContain('data-cross-off-mode="student"');
    expect(htmlW).toContain('data-equation-layout="standard"');
    expect(htmlW).toContain('data-equation-layout="total-first"');

    expect(htmlA).toContain("data-circled-choice=");
    expect(htmlA).toContain('data-solved-cross-off="true"');
    expect(htmlA).toContain('data-strategy-hint="true"');

    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlN)).toEqual([]);
  });

  it("domain invariant across 25 seeds × 4 modes: every K-45 true-false item matches its subtraction arithmetic, every balance puzzle has a solution in the bank and balances, and two-Expression pans appear only at Advanced or in Challenge", async () => {
    const { generateWorksheet } = await import("@/engine/worksheet-engine");

    const modes = ["scaffolded", "Easy", "Intermediate", "Advanced"] as const;
    for (let s = 1; s <= 25; s++) {
      for (const difficultyLevel of modes) {
        const bundle = generateWorksheet({
          grade: "K",
          lessonNumber: 45,
          seed: `K45-INV-${s}`,
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
              expect(data.operation).toBe("subtract");
              const items = data.rows.flatMap((r) => r.items);

              if (data.mode === "true-false") {
                for (const item of items) {
                  expect(item.isCorrect).toBe(
                    item.realTotal - item.part1 === item.part2
                  );
                  expect(item.isCorrect).toBe(
                    item.rightValue === item.leftValue
                  );
                }
              }

              if (data.mode === "balance") {
                expect(data.numberBank).toBeDefined();
                for (const item of items) {
                  expect(item.rightValue).toBe(item.leftValue);
                  expect(item.realTotal - item.part1).toBe(item.missingPart);
                  expect(data.numberBank).toContain(item.solutionValue);
                  if (item.secondarySolutionValue !== undefined) {
                    expect(data.numberBank).toContain(
                      item.secondarySolutionValue
                    );
                  }

                  const meta = item.model.meta as {
                    rightPan: import("@/visual-models/unit-3-models").BalancePanSpec;
                    leftPan: import("@/visual-models/unit-3-models").BalancePanSpec;
                  };
                  const isTwoExpression =
                    meta.rightPan.kind === "expression" &&
                    meta.leftPan.kind === "expression";
                  if (isTwoExpression) {
                    expect(
                      ex.difficultyLevel === "Advanced" ||
                        section.id === "challenge"
                    ).toBe(true);
                  }
                }
              }
            }
          }
        }
      }
    }
  });
});
