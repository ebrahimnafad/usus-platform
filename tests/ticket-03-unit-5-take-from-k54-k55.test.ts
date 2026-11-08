import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "@/lib/seed";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import {
  createEverydayObjectSpec,
  getEverydayObjectById,
} from "@/visual-models/everyday-objects";
import { VisualModelView } from "@/visual-models/registry";

describe("Ticket 03 (Unit 5) — Slice 1: everyday-object Cross Off support", () => {
  it("renders crossed-out X marks on everyday-object groups in shown and student crossOffMode", async () => {
    await import("@/registry/bootstrap");
    const appleDef = getEverydayObjectById("apple");

    // 1. crossOffMode: "shown" crosses out on both worksheet and answer-key
    const shownSpec = createEverydayObjectSpec(appleDef, {
      count: 5,
      crossedOutCount: 2,
      size: "small",
      meta: { crossOffMode: "shown" },
    });

    const htmlShownW = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: shownSpec, solved: false })
    );
    const htmlShownA = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: shownSpec, solved: true })
    );

    expect(htmlShownW).toContain('data-crossed-out="٢"');
    expect(htmlShownW).toContain('data-cross-off-mode="shown"');
    expect(
      (htmlShownW.match(/data-crossed-out-object="true"/g) ?? []).length
    ).toBe(2);
    expect(
      (htmlShownA.match(/data-crossed-out-object="true"/g) ?? []).length
    ).toBe(2);

    // 2. crossOffMode: "student" hides cross-off on worksheet and shows solved cross-off on answer-key
    const studentSpec = createEverydayObjectSpec(appleDef, {
      count: 4,
      crossedOutCount: 1,
      size: "small",
      meta: { crossOffMode: "student" },
    });

    const htmlStudentW = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: studentSpec,
        solved: false,
      })
    );
    const htmlStudentA = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: studentSpec, solved: true })
    );

    expect(htmlStudentW).toContain('data-crossed-out="١"');
    expect(htmlStudentW).toContain('data-cross-off-mode="student"');
    expect(htmlStudentW).not.toContain('data-crossed-out-object="true"');
    expect(
      (htmlStudentA.match(/data-crossed-out-object="true"/g) ?? []).length
    ).toBe(1);
    expect(
      (htmlStudentA.match(/data-solved-cross-off="true"/g) ?? []).length
    ).toBe(1);
  });
});

describe("Ticket 03 (Unit 5) — Slice 2: SolveWordProblem situation: 'take-from' (learning, story, cloze-from-model)", () => {
  it("supports situation: 'take-from' in SolveWordProblem for learning (K-54), story (K-55), and cloze-from-model with subtraction EquationStrip and Cross Off models", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson54 = getCurriculumCatalog().getLesson("K", 54)!;
    const lesson55 = getCurriculumCatalog().getLesson("K", 55)!;
    const solveDef = getExerciseArchetype("SolveWordProblem");

    // 1. K-54 Take-From Learning Problem: model-and-bond (snap-cubes / five-frame in Cross Off mode + Number Bond with partTakenAway on right & missingPart on left + كم بقي؟ Answer Slot)
    const exLearnBond = solveDef.generate({
      lesson: lesson54,
      sourceLessonId: "K-54",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Easy",
      rng: createSeededRandom("SWP-TAKE-LEARN-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-from",
          problemStyle: "learning",
          responseForm: "model-and-bond",
          allowedRepresentations: ["snap-cubes", "five-frame"],
          crossOffMode: "shown",
          totalRange: [2, 4],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const dataLearnBond = exLearnBond.data as any;
    expect(dataLearnBond.situation).toBe("take-from");
    expect(dataLearnBond.problemStyle).toBe("learning");
    expect(dataLearnBond.responseForm).toBe("model-and-bond");
    expect(dataLearnBond.items).toHaveLength(2);
    for (const item of dataLearnBond.items) {
      expect(item.situation).toBe("take-from");
      expect(item.total - item.partTakenAway).toBe(item.missingPart);
      expect(item.part1).toBe(item.partTakenAway);
      expect(item.part2).toBe(item.missingPart);
      expect(item.problemTextAr).toContain(item.totalAr);
      expect(item.problemTextAr).toContain(item.partTakenAwayAr);
      expect(item.questionLabelAr).toBe("كم بقي؟");
      expect(item.representationModel?.count).toBe(item.total);
      expect(item.representationModel?.crossedOutCount).toBe(
        item.partTakenAway
      );
      expect(item.bondModel?.kind).toBe("number-bond");
      expect(item.bondModel?.meta?.total).toBe(item.total);
      expect(item.bondModel?.meta?.part1).toBe(item.partTakenAway);
      expect(item.bondModel?.meta?.part2).toBe(item.missingPart);
      expect(item.bondModel?.meta?.missingPosition).toBe("part2");
    }

    const htmlLearnW = renderToStaticMarkup(
      solveDef.render({ exercise: exLearnBond, mode: "worksheet" })
    );
    const htmlLearnA = renderToStaticMarkup(
      solveDef.render({ exercise: exLearnBond, mode: "answer-key" })
    );
    expect(htmlLearnW).toContain('data-situation="take-from"');
    expect(htmlLearnW).toContain("كم بقي؟");
    expect(htmlLearnA).toContain(
      `data-solved-word-problem-missing-part="${dataLearnBond.items[0].missingPartAr}"`
    );

    // 2. K-55 Take-From Story Problem: story-and-slot & equation (subtraction Equation uses true minus sign −)
    const exStoryEq = solveDef.generate({
      lesson: lesson55,
      sourceLessonId: "K-55",
      sectionId: "practice",
      exerciseIndex: 1,
      exerciseNumber: 2,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("SWP-TAKE-STORY-EQ-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-from",
          problemStyle: "story",
          responseForm: "equation",
          showModel: false,
          totalRange: [3, 5],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const dataStoryEq = exStoryEq.data as any;
    expect(dataStoryEq.situation).toBe("take-from");
    expect(dataStoryEq.problemStyle).toBe("story");
    for (const item of dataStoryEq.items) {
      expect(item.total - item.partTakenAway).toBe(item.missingPart);
      expect(item.problemTextAr).toContain(item.totalAr);
      expect(item.problemTextAr).toContain(item.partTakenAwayAr);
      expect(item.questionLabelAr).toBe("كم بقي؟");
      expect(item.equationModel?.kind).toBe("equation-strip");
      expect(item.equationModel?.meta?.operation).toBe("subtract");
      expect(item.equationModel?.meta?.total).toBe(item.total);
      expect(item.equationModel?.meta?.part1).toBe(item.partTakenAway);
      expect(item.equationModel?.meta?.part2).toBe(item.missingPart);
      expect(item.equationModel?.meta?.missingPosition).toBe("part2");
    }

    const htmlStoryEqW = renderToStaticMarkup(
      solveDef.render({ exercise: exStoryEq, mode: "worksheet" })
    );
    expect(htmlStoryEqW).toContain('data-equation-operation="subtract"');
    expect(htmlStoryEqW).toContain("−");

    // 3. K-54 & K-55 Problem of the Day: cloze-from-model with crossed-off model, Total & Part taken away slots, and subtraction EquationStrip
    const exCloze = solveDef.generate({
      lesson: lesson55,
      sourceLessonId: "K-55",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("SWP-TAKE-CLOZE-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-from",
          problemStyle: "story",
          responseForm: "cloze-from-model",
          representation: "everyday-object",
          crossOffMode: "shown",
          totalRange: [3, 5],
          minPart: 1,
          itemCount: 1,
        },
      },
    });

    const dataCloze = exCloze.data as any;
    expect(dataCloze.clozeIncludeEquation).toBe(true);
    const clozeItem = dataCloze.items[0];
    expect(clozeItem.total - clozeItem.partTakenAway).toBe(
      clozeItem.missingPart
    );
    expect(clozeItem.representationModel?.count).toBe(clozeItem.total);
    expect(clozeItem.representationModel?.crossedOutCount).toBe(
      clozeItem.partTakenAway
    );
    expect(clozeItem.equationModel?.kind).toBe("equation-strip");
    expect(clozeItem.equationModel?.meta?.operation).toBe("subtract");

    const htmlClozeW = renderToStaticMarkup(
      solveDef.render({ exercise: exCloze, mode: "worksheet" })
    );
    const htmlClozeA = renderToStaticMarkup(
      solveDef.render({ exercise: exCloze, mode: "answer-key" })
    );
    expect(htmlClozeW).toContain('data-visual-model="equation-strip"');
    expect(htmlClozeW).toContain("−");
    expect(htmlClozeA).toContain(
      `data-solved-cloze-total="${clozeItem.totalAr}"`
    );
    expect(htmlClozeA).toContain(
      `data-solved-cloze-part1="${clozeItem.partTakenAwayAr}"`
    );
    expect(htmlClozeA).toContain(
      `${clozeItem.totalAr} − ${clozeItem.partTakenAwayAr} = ${clozeItem.missingPartAr}`
    );
  });
});

describe("Ticket 03 (Unit 5) — Slice 3: ConnectMatch model-to-word-problem with operation: 'subtract' (MATCHING E & F)", () => {
  it("supports ConnectMatch model-to-word-problem for MATCHING E (K-54 Take-From Learning Problem, Missing Part on Number Bond only) and MATCHING F (K-55 Take-From Story Problem, Missing Part on both Number Bond and Story Problem card)", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson54 = getCurriculumCatalog().getLesson("K", 54)!;
    const lesson55 = getCurriculumCatalog().getLesson("K", 55)!;
    const matchDef = getExerciseArchetype("ConnectMatch");

    // 1. MATCHING E (K-54): Number Bond (missingPosition: "part2" on left circle, part1 = partTakenAway on right) -> Take-From Learning Problem (no slot on problem card)
    const exMatchE = matchDef.generate({
      lesson: lesson54,
      sourceLessonId: "K-54",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 3,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCH-WP-E"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "model-to-word-problem",
          operation: "subtract",
          situation: "take-from",
          problemStyle: "learning",
          showProblemSlot: false,
          rightColumnTitleAr: "رابطة الأعداد",
          leftColumnTitleAr: "المسألة التعليمية",
          totalRange: [3, 5],
          minPart: 1,
          pairCount: 2,
        },
      },
    });

    const dataE = exMatchE.data as any;
    expect(dataE.rightItems).toHaveLength(2);
    expect(dataE.leftItems).toHaveLength(2);
    expect(new Set(Object.values(dataE.solutionMap)).size).toBe(2);

    for (const rItem of dataE.rightItems) {
      expect(rItem.model.kind).toBe("number-bond");
      expect(rItem.model.meta.missingPosition).toBe("part2");
    }
    for (const lItem of dataE.leftItems) {
      expect(lItem.model.meta.isWordProblemEndpoint).toBe(true);
      expect(lItem.model.meta.situation).toBe("take-from");
      expect(lItem.model.meta.showProblemSlot).toBe(false);
      expect(lItem.model.meta.total - lItem.model.meta.partTakenAway).toBe(
        lItem.model.meta.missingPart
      );
      expect(lItem.model.meta.problemTextAr).toContain(
        lItem.model.meta.totalAr
      );
      expect(lItem.model.meta.problemTextAr).toContain(
        lItem.model.meta.partTakenAwayAr
      );
    }

    const htmlEW = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchE, mode: "worksheet" })
    );
    const htmlEA = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchE, mode: "answer-key" })
    );
    expect(htmlEW.match(/data-answer-slot="unknown"/g)).toHaveLength(2);
    expect(htmlEA.match(/data-answer-slot="solved-digit"/g)).toHaveLength(2);

    // 2. MATCHING F (K-55): Number Bond (missingPosition: "part2") -> Take-From Story Problem (also carries Missing Part slot answering كم بقي؟)
    const exMatchF = matchDef.generate({
      lesson: lesson55,
      sourceLessonId: "K-55",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 3,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCH-WP-F"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "model-to-word-problem",
          operation: "subtract",
          situation: "take-from",
          problemStyle: "story",
          showProblemSlot: true,
          rightColumnTitleAr: "رابطة الأعداد",
          leftColumnTitleAr: "المسألة القصصية",
          totalRange: [3, 5],
          minPart: 1,
          pairCount: 2,
        },
      },
    });

    const dataF = exMatchF.data as any;
    expect(dataF.rightItems).toHaveLength(2);
    expect(dataF.leftItems).toHaveLength(2);
    for (const lItem of dataF.leftItems) {
      expect(lItem.model.meta.situation).toBe("take-from");
      expect(lItem.model.meta.showProblemSlot).toBe(true);
      expect(lItem.model.meta.questionLabelAr).toBe("كم بقي؟");
    }

    const htmlFW = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchF, mode: "worksheet" })
    );
    const htmlFA = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchF, mode: "answer-key" })
    );
    expect(htmlFW.match(/data-answer-slot="unknown"/g)).toHaveLength(4);
    expect(htmlFA.match(/data-answer-slot="solved-digit"/g)).toHaveLength(4);
    expect(htmlFA).toContain(
      `data-solved-match-problem-missing-part="${dataF.leftItems[0].model.meta.missingPartAr}"`
    );
  });
});

describe("Ticket 03 (Unit 5) — Slice 4: Lessons K-54 & K-55 Blueprints, Localization, and Domain Invariants", () => {
  it("generates Lesson K-54 (Take-From Learning Problems, Co-presented, Warm-Up -> K-43, Practice Type 1 & Type 2, Challenge MATCHING E + PoD cloze-from-model) and Lesson K-55 (Take-From Story Problems, Warm-Up -> K-54, Practice Type 1 & Type 2, Challenge MATCHING F + PoD cloze-from-model)", () => {
    const k54 = generateWorksheet({
      grade: "K",
      lessonNumber: 54,
      seed: "UNIT5-K54-A",
    });
    const k55 = generateWorksheet({
      grade: "K",
      lessonNumber: 55,
      seed: "UNIT5-K55-A",
    });

    // K-54 checks
    expect(k54.isAuthoredBlueprint).toBe(true);
    expect(k54.lesson.standards).toEqual(["K.OA.2"]);
    expect(k54.lesson.isCoPresented).toBe(true);
    expect(k54.warmUpSourceLessonId).toBe("K-43");
    expect(k54.worksheet.sections[0].sourceLessonId).toBe("K-43");
    expect(k54.teacherNotes.summaryAr).toContain("البداية");
    expect(k54.teacherNotes.summaryAr).toContain("التغيير");
    expect(k54.teacherNotes.summaryAr).toContain("النتيجة");
    expect(k54.teacherNotes.coPresentationNoteAr).toBeDefined();
    expect(k54.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k54.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    expect(k54.worksheet.sections[1].exercises).toHaveLength(2);
    expect(k54.worksheet.sections[1].exercises[0].archetype).toBe(
      "SolveWordProblem"
    );
    expect((k54.worksheet.sections[1].exercises[0].data as any).situation).toBe(
      "take-from"
    );
    expect(
      (k54.worksheet.sections[1].exercises[0].data as any).responseForm
    ).toBe("model-and-bond");
    expect(k54.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k54.worksheet.sections[2].exercises[0].archetype).toBe(
      "ConnectMatch"
    );
    expect(k54.worksheet.sections[2].exercises[1].archetype).toBe(
      "SolveWordProblem"
    );
    expect(
      (k54.worksheet.sections[2].exercises[1].data as any).responseForm
    ).toBe("cloze-from-model");
    expect(
      (k54.worksheet.sections[2].exercises[1].data as any).clozeIncludeEquation
    ).toBe(true);

    // K-55 checks
    expect(k55.isAuthoredBlueprint).toBe(true);
    expect(k55.lesson.standards).toEqual(["K.OA.2"]);
    expect(k55.warmUpSourceLessonId).toBe("K-54");
    expect(k55.worksheet.sections[0].sourceLessonId).toBe("K-54");
    expect(k55.teacherNotes.summaryAr).toContain("البداية");
    expect(k55.teacherNotes.summaryAr).toContain("التغيير");
    expect(k55.teacherNotes.summaryAr).toContain("النتيجة");
    expect(k55.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k55.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    expect(k55.worksheet.sections[1].exercises).toHaveLength(2);
    for (const ex of k55.worksheet.sections[1].exercises) {
      expect(ex.archetype).toBe("SolveWordProblem");
      expect((ex.data as any).situation).toBe("take-from");
      expect((ex.data as any).problemStyle).toBe("story");
    }
    expect(k55.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k55.worksheet.sections[2].exercises[0].archetype).toBe(
      "ConnectMatch"
    );
    expect(k55.worksheet.sections[2].exercises[1].archetype).toBe(
      "SolveWordProblem"
    );
    expect(
      (k55.worksheet.sections[2].exercises[1].data as any).responseForm
    ).toBe("cloze-from-model");
    expect(
      (k55.worksheet.sections[2].exercises[1].data as any).clozeIncludeEquation
    ).toBe(true);

    // Render Worksheet, Answer Key, and Teacher Notes surfaces for K-54 & K-55
    for (const lessonNumber of [54, 55]) {
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

      expect(htmlW).not.toMatch(/البداية|التغيير|النتيجة/);
      expect(htmlA).not.toMatch(/البداية|التغيير|النتيجة/);
      expect(htmlN).toContain("البداية");
      expect(htmlN).toContain("التغيير");
      expect(htmlN).toContain("النتيجة");
      expect(htmlW).toContain("−");
      expect(htmlA).toContain("−");
      expect(htmlA).toContain('data-strategy-hint="true"');
      expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlN)).toEqual([]);
    }
  });

  it("domain invariant across 25 seeds × 4 modes: every K-54 and K-55 item satisfies total − partTakenAway = missingPart, crossed-off counts equal partTakenAway, every subtraction Equation uses −, and MATCHING E and F solutions are 1-to-1", () => {
    for (const lessonNumber of [54, 55]) {
      for (let s = 1; s <= 25; s++) {
        const seed = `U5-TAKE-DOMAIN-${lessonNumber}-${s}`;
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
              if (ex.data.kind === "SolveWordProblem") {
                const swp = ex.data as any;
                const seenInEx = new Set<string>();
                for (const item of swp.items) {
                  expect(item.situation).toBe("take-from");
                  expect(item.total - item.partTakenAway).toBe(
                    item.missingPart
                  );
                  expect(item.part1).toBe(item.partTakenAway);
                  expect(item.part2).toBe(item.missingPart);
                  expect(seenInEx.has(item.factKey)).toBe(false);
                  seenInEx.add(item.factKey);

                  expect(item.problemTextAr).toContain(item.totalAr);
                  expect(item.problemTextAr).toContain(item.partTakenAwayAr);

                  if (item.representationModel) {
                    expect(item.representationModel.count).toBe(item.total);
                    expect(item.representationModel.crossedOutCount).toBe(
                      item.partTakenAway
                    );
                  }
                  if (item.bondModel) {
                    expect(item.bondModel.meta.total).toBe(item.total);
                    expect(item.bondModel.meta.part1).toBe(item.partTakenAway);
                    expect(item.bondModel.meta.part2).toBe(item.missingPart);
                    expect(item.bondModel.meta.missingPosition).toBe("part2");
                  }
                  if (item.equationModel) {
                    expect(item.equationModel.meta.operation).toBe("subtract");
                    expect(item.equationModel.meta.total).toBe(item.total);
                    expect(item.equationModel.meta.part1).toBe(
                      item.partTakenAway
                    );
                    expect(item.equationModel.meta.part2).toBe(
                      item.missingPart
                    );
                    expect(item.equationModel.labelAr).toContain("−");
                    expect(item.equationModel.labelAr).not.toContain("-");
                  }
                }
              } else if (ex.data.kind === "TakeAway") {
                const ta = ex.data as any;
                const seenInEx = new Set<string>();
                for (const item of ta.items) {
                  expect(item.total - item.partTakenAway).toBe(
                    item.missingPart
                  );
                  expect(seenInEx.has(item.factKey)).toBe(false);
                  seenInEx.add(item.factKey);
                  if (item.representationModel) {
                    expect(item.representationModel.crossedOutCount).toBe(
                      item.partTakenAway
                    );
                  }
                  if (item.responseModel?.kind === "equation-strip") {
                    expect(item.responseModel.meta.operation).toBe("subtract");
                    expect(item.responseModel.labelAr).toContain("−");
                    expect(item.responseModel.labelAr).not.toContain("-");
                  }
                }
              } else if (ex.data.kind === "ConnectMatch") {
                const cm = ex.data as any;
                expect(cm.rightItems.length).toBeGreaterThanOrEqual(2);
                expect(cm.leftItems.length).toBe(cm.rightItems.length);
                expect(Object.keys(cm.solutionMap)).toHaveLength(
                  cm.rightItems.length
                );
                expect(new Set(Object.values(cm.solutionMap)).size).toBe(
                  cm.leftItems.length
                );

                for (const pair of cm.pairs) {
                  const rMeta = pair.rightItem.meta as any;
                  const lMeta = pair.leftItem.meta as any;
                  if (lMeta?.isWordProblemEndpoint) {
                    expect(rMeta.total - rMeta.part1).toBe(rMeta.part2);
                    expect(rMeta.missingPosition).toBe("part2");
                    expect(lMeta.total).toBe(rMeta.total);
                    expect(lMeta.partTakenAway).toBe(rMeta.part1);
                    expect(lMeta.missingPart).toBe(rMeta.part2);
                    expect(lMeta.problemTextAr).toContain(lMeta.totalAr);
                    expect(lMeta.problemTextAr).toContain(
                      lMeta.partTakenAwayAr
                    );
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
