import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "@/lib/seed";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { formatValidTakeApartPairsAr } from "@/lib/word-problems";

describe("Ticket 04 (Unit 5) — Slice 1: ShiftOneDecompose archetype (all-combinations, complete-pattern, give-away)", () => {
  it("registers ShiftOneDecompose and renders all-combinations, complete-pattern, and give-away modes in exact (N - i, i) RTL order", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson56 = getCurriculumCatalog().getLesson("K", 56)!;
    const shiftDef = getExerciseArchetype("ShiftOneDecompose");
    expect(shiftDef.displayNameAr).toBe("فكّك بإزاحة ١");

    // 1. all-combinations at Easy (N = 3, with five-frames and traced first bond)
    const exAllEasy = shiftDef.generate({
      lesson: lesson56,
      sourceLessonId: "K-56",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Easy",
      rng: createSeededRandom("SHIFT-EASY-1"),
      spec: {
        archetype: "ShiftOneDecompose",
        params: {
          mode: "all-combinations",
          targetTotal: 3,
          action: "trace-first",
          showFiveFrames: true,
        },
      },
    });

    const dataAllEasy = exAllEasy.data as any;
    expect(dataAllEasy.mode).toBe("all-combinations");
    expect(dataAllEasy.targetTotal).toBe(3);
    expect(dataAllEasy.showFiveFrames).toBe(true);
    expect(dataAllEasy.steps).toHaveLength(4);
    expect(dataAllEasy.steps.map((s: any) => [s.part1, s.part2])).toEqual([
      [3, 0],
      [2, 1],
      [1, 2],
      [0, 3],
    ]);
    expect(dataAllEasy.steps[0].missingPosition).toBe("none");
    expect(dataAllEasy.steps[0].tracePositions).toEqual(["part1", "part2"]);
    for (let i = 1; i < dataAllEasy.steps.length; i++) {
      expect(dataAllEasy.steps[i].missingPosition).toBe("both-parts");
      expect(dataAllEasy.steps[i].fiveFrameModel?.kind).toBe("five-frame");
    }

    const htmlAllEasyW = renderToStaticMarkup(
      shiftDef.render({ exercise: exAllEasy, mode: "worksheet" })
    );
    const htmlAllEasyA = renderToStaticMarkup(
      shiftDef.render({ exercise: exAllEasy, mode: "answer-key" })
    );
    expect(htmlAllEasyW).toContain('data-archetype="ShiftOneDecompose"');
    expect(htmlAllEasyW).toContain('data-shift-mode="all-combinations"');
    expect(htmlAllEasyW).toContain("إزاحة ١");
    expect(htmlAllEasyW.match(/data-answer-slot="unknown"/g)).toHaveLength(6);
    expect(htmlAllEasyA.match(/data-answer-slot="solved-digit"/g)).toHaveLength(
      6
    );

    // 2. complete-pattern (Problem of the Day): first two bonds (N, 0) and (N - 1, 1) are anchors
    const exPattern = shiftDef.generate({
      lesson: lesson56,
      sourceLessonId: "K-56",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("SHIFT-PATTERN-1"),
      spec: {
        archetype: "ShiftOneDecompose",
        params: {
          mode: "complete-pattern",
          targetTotal: 4,
        },
      },
    });

    const dataPattern = exPattern.data as any;
    expect(dataPattern.mode).toBe("complete-pattern");
    expect(dataPattern.steps).toHaveLength(5);
    expect(dataPattern.steps.map((s: any) => [s.part1, s.part2])).toEqual([
      [4, 0],
      [3, 1],
      [2, 2],
      [1, 3],
      [0, 4],
    ]);
    expect(dataPattern.steps[0].isAnchor).toBe(true);
    expect(dataPattern.steps[1].isAnchor).toBe(true);
    expect(dataPattern.steps[0].missingPosition).toBe("none");
    expect(dataPattern.steps[1].missingPosition).toBe("none");
    for (let i = 2; i < dataPattern.steps.length; i++) {
      expect(dataPattern.steps[i].isAnchor).toBe(false);
      expect(dataPattern.steps[i].missingPosition).toBe("both-parts");
    }

    const htmlPatternW = renderToStaticMarkup(
      shiftDef.render({ exercise: exPattern, mode: "worksheet" })
    );
    expect(htmlPatternW.match(/data-answer-slot="unknown"/g)).toHaveLength(6);

    // 3. give-away (Brain Builder GIVE AWAY): two parallel apple rows giving away k and k + 1 apples
    const exGiveAway = shiftDef.generate({
      lesson: lesson56,
      sourceLessonId: "K-56",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 3,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("SHIFT-GIVE-AWAY-1"),
      spec: {
        archetype: "ShiftOneDecompose",
        params: {
          mode: "give-away",
          targetTotal: 5,
          crossOffMode: "student",
        },
      },
    });

    const dataGiveAway = exGiveAway.data as any;
    expect(dataGiveAway.mode).toBe("give-away");
    expect(dataGiveAway.giveAwayRows).toHaveLength(2);
    const [row1, row2] = dataGiveAway.giveAwayRows;
    expect(row1.total).toBe(5);
    expect(row2.total).toBe(5);
    expect(row2.partTakenAway).toBe(row1.partTakenAway + 1);
    expect(row1.missingPart).toBe(5 - row1.partTakenAway);
    expect(row2.missingPart).toBe(5 - row2.partTakenAway);
    expect(dataGiveAway.comparisonDifference).toBe(1);

    const htmlGiveW = renderToStaticMarkup(
      shiftDef.render({ exercise: exGiveAway, mode: "worksheet" })
    );
    const htmlGiveA = renderToStaticMarkup(
      shiftDef.render({ exercise: exGiveAway, mode: "answer-key" })
    );
    expect(htmlGiveW).toContain('data-shift-mode="give-away"');
    expect(htmlGiveW).toContain('data-give-away-comparison="true"');
    expect(htmlGiveW).not.toContain('data-crossed-out-object="true"');
    expect(
      (htmlGiveA.match(/data-crossed-out-object="true"/g) ?? []).length
    ).toBe(row1.partTakenAway + row2.partTakenAway);
    expect(htmlGiveA).toContain(
      `data-solved-give-away-remaining="${row1.missingPartAr}"`
    );
    expect(htmlGiveA).toContain(
      `data-solved-give-away-remaining="${row2.missingPartAr}"`
    );
    expect(htmlGiveA).toContain('data-solved-give-away-diff="١"');
  });
});

describe("Ticket 04 (Unit 5) — Slice 2: SolveWordProblem situation: 'take-apart' (model-fixed, open-ended, cloze-from-model)", () => {
  it("supports model-fixed, open-ended ('answers will vary'), and cloze-from-model modes for learning (K-57) and story (K-58) Take-Apart word problems", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson57 = getCurriculumCatalog().getLesson("K", 57)!;
    const lesson58 = getCurriculumCatalog().getLesson("K", 58)!;
    const solveDef = getExerciseArchetype("SolveWordProblem");

    // 1. Model-fixed mode (Workbook Type 1): concrete model shown, Number Bond has missingPosition: "both-parts", two Part Answer Slots
    const exFixed = solveDef.generate({
      lesson: lesson57,
      sourceLessonId: "K-57",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("SWP-APART-FIXED-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-apart",
          problemStyle: "learning",
          responseForm: "model-and-bond",
          representation: "snap-cubes",
          takeApartMode: "model-fixed",
          totalRange: [3, 5],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const dataFixed = exFixed.data as any;
    expect(dataFixed.situation).toBe("take-apart");
    expect(dataFixed.items).toHaveLength(2);
    for (const item of dataFixed.items) {
      expect(item.takeApartMode).toBe("model-fixed");
      expect(item.part1 + item.part2).toBe(item.total);
      expect(item.showModel).toBe(true);
      expect(item.representationModel).toBeDefined();
      expect(item.bondModel?.meta?.missingPosition).toBe("both-parts");
      expect(item.problemTextAr).toContain(item.totalAr);
    }

    const htmlFixedW = renderToStaticMarkup(
      solveDef.render({ exercise: exFixed, mode: "worksheet" })
    );
    const htmlFixedA = renderToStaticMarkup(
      solveDef.render({ exercise: exFixed, mode: "answer-key" })
    );
    // 2 items × (2 bond part slots + 2 response part slots) = 8 unknown slots
    expect(htmlFixedW.match(/data-answer-slot="unknown"/g)).toHaveLength(8);
    expect(htmlFixedA.match(/data-answer-slot="solved-digit"/g)).toHaveLength(
      8
    );
    expect(htmlFixedA).toContain(
      `data-solved-word-problem-part1="${dataFixed.items[0].part1Ar}"`
    );
    expect(htmlFixedA).toContain(
      `data-solved-word-problem-part2="${dataFixed.items[0].part2Ar}"`
    );

    // 2. Open-ended mode (Workbook Type 2): only Total N given, both Part slots unknown on Worksheet, canonical pair + all valid pairs in Answer Key & Strategy Hint
    const exOpen = solveDef.generate({
      lesson: lesson58,
      sourceLessonId: "K-58",
      sectionId: "practice",
      exerciseIndex: 1,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("SWP-APART-OPEN-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-apart",
          problemStyle: "story",
          responseForm: "story-and-slot",
          takeApartMode: "open-ended",
          showModel: false,
          totalRange: [4, 5],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const dataOpen = exOpen.data as any;
    expect(dataOpen.items).toHaveLength(2);
    for (const item of dataOpen.items) {
      expect(item.takeApartMode).toBe("open-ended");
      expect(item.showModel).toBe(false);
      expect(item.representationModel).toBeUndefined();
      expect(item.part1).toBeGreaterThanOrEqual(1);
      expect(item.part2).toBeGreaterThanOrEqual(1);
      expect(item.part1 + item.part2).toBe(item.total);
      expect(item.validPairsSummaryAr).toBe(
        formatValidTakeApartPairsAr(item.total)
      );
      expect(exOpen.strategyHintAr).toContain(item.validPairsSummaryAr);
    }

    const htmlOpenW = renderToStaticMarkup(
      solveDef.render({ exercise: exOpen, mode: "worksheet" })
    );
    const htmlOpenA = renderToStaticMarkup(
      solveDef.render({ exercise: exOpen, mode: "answer-key" })
    );
    expect(htmlOpenW.match(/data-answer-slot="unknown"/g)).toHaveLength(4);
    expect(htmlOpenW).not.toContain('data-valid-take-apart-pairs="true"');
    expect(htmlOpenA).toContain('data-valid-take-apart-pairs="true"');
    expect(htmlOpenA).toContain("تتنوّع الإجابات، مثل:");

    // 3. Problem of the Day: cloze-from-model with addition Equation
    const exCloze = solveDef.generate({
      lesson: lesson58,
      sourceLessonId: "K-58",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 4,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("SWP-APART-CLOZE-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-apart",
          problemStyle: "story",
          responseForm: "cloze-from-model",
          representation: "five-frame",
          equationLayout: "total-first",
          totalRange: [3, 5],
          minPart: 1,
          itemCount: 1,
        },
      },
    });

    const dataCloze = exCloze.data as any;
    expect(dataCloze.clozeIncludeEquation).toBe(true);
    const clozeItem = dataCloze.items[0];
    expect(clozeItem.part1 + clozeItem.part2).toBe(clozeItem.total);
    expect(clozeItem.equationModel?.kind).toBe("equation-strip");
    expect(clozeItem.equationModel?.meta?.operation).toBe("add");
    expect(clozeItem.equationModel?.meta?.layout).toBe("total-first");

    const htmlClozeA = renderToStaticMarkup(
      solveDef.render({ exercise: exCloze, mode: "answer-key" })
    );
    expect(htmlClozeA).toContain(
      `data-solved-cloze-part1="${clozeItem.part1Ar}"`
    );
    expect(htmlClozeA).toContain(
      `data-solved-cloze-part2="${clozeItem.part2Ar}"`
    );
    expect(htmlClozeA).toContain(
      `data-solved-equation-total="${clozeItem.totalAr}"`
    );
  });
});

describe("Ticket 04 (Unit 5) — Slice 3: ConnectMatch model-to-word-problem with situation: 'take-apart' (MATCHING G & H)", () => {
  it("generates distinct Totals across rows in MATCHING G (K-57) and MATCHING H (K-58) with both Part circles unknown on each Number Bond and part-answers-vary annotations in the Answer Key", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson57 = getCurriculumCatalog().getLesson("K", 57)!;
    const lesson58 = getCurriculumCatalog().getLesson("K", 58)!;
    const matchDef = getExerciseArchetype("ConnectMatch");

    for (const [lesson, style] of [
      [lesson57, "learning"],
      [lesson58, "story"],
    ] as const) {
      const exMatch = matchDef.generate({
        lesson,
        sourceLessonId: lesson.id,
        sectionId: "challenge",
        exerciseIndex: 0,
        exerciseNumber: 3,
        difficultyLevel: "Intermediate",
        rng: createSeededRandom(`MATCH-TAKE-APART-${lesson.id}`),
        spec: {
          archetype: "ConnectMatch",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "take-apart",
            problemStyle: style,
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr:
              style === "story" ? "المسألة القصصية" : "المسألة التعليمية",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 3,
          },
        },
      });

      const data = exMatch.data as any;
      expect(data.rightItems).toHaveLength(3);
      expect(data.leftItems).toHaveLength(3);
      expect(new Set(Object.values(data.solutionMap)).size).toBe(3);

      const rightTotals = data.rightItems.map(
        (ri: any) => ri.model.meta.total as number
      );
      expect(new Set(rightTotals).size).toBe(3);
      expect([...rightTotals].sort((a, b) => a - b)).toEqual([3, 4, 5]);

      for (const rItem of data.rightItems) {
        expect(rItem.model.kind).toBe("number-bond");
        expect(rItem.model.meta.missingPosition).toBe("both-parts");
      }

      for (const lItem of data.leftItems) {
        expect(lItem.model.meta.isWordProblemEndpoint).toBe(true);
        expect(lItem.model.meta.situation).toBe("take-apart");
        expect(lItem.model.meta.problemStyle).toBe(style);
        expect(lItem.model.meta.problemTextAr).toContain(
          lItem.model.meta.totalAr
        );
        expect(lItem.model.meta.validPairsSummaryAr).toContain(
          "تتنوّع الإجابات، مثل:"
        );
      }

      expect(exMatch.strategyHintAr).toContain("تتنوّع الإجابات، مثل:");

      const htmlW = renderToStaticMarkup(
        matchDef.render({ exercise: exMatch, mode: "worksheet" })
      );
      const htmlA = renderToStaticMarkup(
        matchDef.render({ exercise: exMatch, mode: "answer-key" })
      );
      // 3 Number Bonds × 2 unknown Part circles = 6 unknown slots
      expect(htmlW.match(/data-answer-slot="unknown"/g)).toHaveLength(6);
      expect(htmlA.match(/data-answer-slot="solved-digit"/g)).toHaveLength(6);
      expect(htmlA).toContain('data-valid-take-apart-pairs="true"');
      expect(htmlA).toContain("تتنوّع الإجابات، مثل:");
    }
  });
});

describe("Ticket 04 (Unit 5) — Slice 4: Lessons K-56 to K-58 Blueprints, Prerequisites, Localization & Domain Invariants", () => {
  it("generates K-56 (Warm-Up -> K-47), K-57 (Warm-Up -> K-56), and K-58 (Warm-Up -> K-57) with complete Teacher Notes and zero Western numerals", () => {
    const k56 = generateWorksheet({
      grade: "K",
      lessonNumber: 56,
      seed: "UNIT5-K56-A",
    });
    const k57 = generateWorksheet({
      grade: "K",
      lessonNumber: 57,
      seed: "UNIT5-K57-A",
    });
    const k58 = generateWorksheet({
      grade: "K",
      lessonNumber: 58,
      seed: "UNIT5-K58-A",
    });

    // Prerequisite resolution checks: K-56 -> K-47, K-57 -> K-56, K-58 -> K-57
    expect(k56.isAuthoredBlueprint).toBe(true);
    expect(k56.lesson.standards).toEqual(["K.OA.3"]);
    expect(k56.lesson.isCoPresented).toBe(true);
    expect(k56.warmUpSourceLessonId).toBe("K-47");
    expect(k56.worksheet.sections[0].sourceLessonId).toBe("K-47");

    expect(k57.isAuthoredBlueprint).toBe(true);
    expect(k57.lesson.standards).toEqual(["K.OA.2"]);
    expect(k57.lesson.isCoPresented).toBe(true);
    expect(k57.warmUpSourceLessonId).toBe("K-56");
    expect(k57.worksheet.sections[0].sourceLessonId).toBe("K-56");

    expect(k58.isAuthoredBlueprint).toBe(true);
    expect(k58.lesson.standards).toEqual(["K.OA.2"]);
    expect(k58.warmUpSourceLessonId).toBe("K-57");
    expect(k58.worksheet.sections[0].sourceLessonId).toBe("K-57");

    for (const bundle of [k56, k57, k58]) {
      expect(bundle.teacherNotes.summaryAr.length).toBeGreaterThan(20);
      expect(
        bundle.teacherNotes.pedagogicalStepsAr.length
      ).toBeGreaterThanOrEqual(3);
      expect(bundle.teacherNotes.classroomActivityNoteAr).toBeDefined();
      expect(
        bundle.teacherNotes.commonMisconceptionsAr?.length
      ).toBeGreaterThanOrEqual(2);
    }
    expect(k56.teacherNotes.coPresentationNoteAr).toBeDefined();
    expect(k57.teacherNotes.coPresentationNoteAr).toBeDefined();

    for (const lessonNumber of [56, 57, 58]) {
      const htmlW = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `RENDER-K${lessonNumber}`,
        viewMode: "worksheet",
      });
      const htmlA = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `RENDER-K${lessonNumber}`,
        viewMode: "answer-key",
      });
      const htmlN = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `RENDER-K${lessonNumber}`,
        viewMode: "teacher-notes",
      });

      expect(htmlA).toContain('data-strategy-hint="true"');
      expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlN)).toEqual([]);
    }
  });

  it("domain invariant across 25 seeds × 4 modes: ShiftOneDecompose generates all N + 1 bonds in exact (N - i, i) order, give-away rows satisfy N - k and N - (k + 1), take-apart items satisfy part1 + part2 = total and list all valid pairs, and MATCHING G & H rows have distinct Totals", () => {
    for (const lessonNumber of [56, 57, 58]) {
      for (let s = 1; s <= 25; s++) {
        const seed = `U5-T04-DOMAIN-${lessonNumber}-${s}`;
        for (const mode of [
          "scaffolded",
          "Easy",
          "Intermediate",
          "Advanced",
        ] as const) {
          const bundle = generateWorksheet({
            grade: "K",
            lessonNumber,
            seed,
            difficultyLevel: mode,
          });

          for (const section of bundle.worksheet.sections) {
            for (const ex of section.exercises) {
              if (ex.data.kind === "ShiftOneDecompose") {
                const sod = ex.data as any;
                const N = sod.targetTotal as number;
                expect(N).toBeGreaterThanOrEqual(2);
                expect(N).toBeLessThanOrEqual(5);

                if (
                  sod.mode === "all-combinations" ||
                  sod.mode === "complete-pattern"
                ) {
                  expect(sod.steps).toHaveLength(N + 1);
                  for (let i = 0; i <= N; i++) {
                    const step = sod.steps[i];
                    expect(step.part1).toBe(N - i);
                    expect(step.part2).toBe(i);
                    expect(step.total).toBe(N);
                    expect(step.bondModel.meta.part1).toBe(N - i);
                    expect(step.bondModel.meta.part2).toBe(i);
                    expect(step.bondModel.meta.total).toBe(N);
                  }
                } else if (sod.mode === "give-away") {
                  expect(sod.giveAwayRows).toHaveLength(2);
                  const [r1, r2] = sod.giveAwayRows;
                  expect(r1.total).toBe(N);
                  expect(r2.total).toBe(N);
                  expect(r2.partTakenAway).toBe(r1.partTakenAway + 1);
                  expect(r1.missingPart).toBe(N - r1.partTakenAway);
                  expect(r2.missingPart).toBe(N - r2.partTakenAway);
                  expect(sod.comparisonDifference).toBe(1);
                }
              } else if (ex.data.kind === "SolveWordProblem") {
                const swp = ex.data as any;
                const seenInEx = new Set<string>();
                for (const item of swp.items) {
                  expect(item.situation).toBe("take-apart");
                  expect(item.part1).toBeGreaterThanOrEqual(1);
                  expect(item.part2).toBeGreaterThanOrEqual(1);
                  expect(item.part1 + item.part2).toBe(item.total);
                  expect(seenInEx.has(item.factKey)).toBe(false);
                  seenInEx.add(item.factKey);
                  expect(item.problemTextAr).toContain(item.totalAr);

                  if (item.takeApartMode === "open-ended") {
                    const expectedSummary = formatValidTakeApartPairsAr(
                      item.total
                    );
                    expect(item.validPairsSummaryAr).toBe(expectedSummary);
                    expect(ex.strategyHintAr).toContain(expectedSummary);
                  }
                }
              } else if (ex.data.kind === "ConnectMatch") {
                const cm = ex.data as any;
                expect(cm.rightItems.length).toBeGreaterThanOrEqual(2);
                expect(cm.leftItems.length).toBe(cm.rightItems.length);
                expect(new Set(Object.values(cm.solutionMap)).size).toBe(
                  cm.leftItems.length
                );

                const rowTotals = cm.rightItems.map(
                  (ri: any) => ri.model.meta.total as number
                );
                expect(new Set(rowTotals).size).toBe(rowTotals.length);

                for (const pair of cm.pairs) {
                  const rMeta = pair.rightItem.meta as any;
                  const lMeta = pair.leftItem.meta as any;
                  expect(rMeta.missingPosition).toBe("both-parts");
                  expect(rMeta.part1 + rMeta.part2).toBe(rMeta.total);
                  expect(lMeta.total).toBe(rMeta.total);
                  expect(lMeta.problemTextAr).toContain(lMeta.totalAr);
                  expect(lMeta.validPairsSummaryAr).toBe(
                    formatValidTakeApartPairsAr(rMeta.total)
                  );
                }
                expect(ex.strategyHintAr).toContain("تتنوّع الإجابات، مثل:");
              }
            }
          }
        }
      }
    }
  });
});
