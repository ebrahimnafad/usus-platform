import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "@/lib/seed";
import { generateWorksheet } from "@/engine/worksheet-engine";
import {
  selectAdditionFacts,
  selectSubtractionFacts,
} from "@/lib/part-whole-facts";
import { createEquationStripSpec } from "@/visual-models/unit-3-models";
import {
  createDicePatternSpec,
  createFiveFrameSpec,
  createSnapCubesSpec,
  createTallyMarksSpec,
} from "@/visual-models/unit-2-models";
import { VisualModelView } from "@/visual-models/registry";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 01 (Unit 4) — Slice 1: Shared Part-Whole Fact Module", () => {
  it("selects subtraction facts respecting Easy/Intermediate/Advanced limits, treats ٥ − ٢ and ٥ − ٣ as distinct facts, and prioritizes unused facts across the sheet", () => {
    const rngEasy = createSeededRandom("SUB-EASY-1");
    const easyFacts = selectSubtractionFacts(rngEasy, "Easy", { count: 3 });
    expect(easyFacts).toHaveLength(3);
    for (const f of easyFacts) {
      expect(f.total).toBeGreaterThanOrEqual(2);
      expect(f.total).toBeLessThanOrEqual(4);
      expect(f.partTakenAway).toBeGreaterThanOrEqual(1);
      expect(f.missingPart).toBeGreaterThanOrEqual(1);
      expect(f.total - f.partTakenAway).toBe(f.missingPart);
    }

    // Intermediate: Total in [2..5] with both Parts >= 1 yields 10 distinct subtraction facts:
    // (2-1), (3-1, 3-2), (4-1, 4-2, 4-3), (5-1, 5-2, 5-3, 5-4) = 10 facts.
    const used = new Set<string>();
    const rngInt = createSeededRandom("SUB-INT-POOL");
    const allPicked = [
      ...selectSubtractionFacts(
        rngInt.fork("1"),
        "Intermediate",
        { count: 4 },
        used
      ),
      ...selectSubtractionFacts(
        rngInt.fork("2"),
        "Intermediate",
        { count: 4 },
        used
      ),
      ...selectSubtractionFacts(
        rngInt.fork("3"),
        "Intermediate",
        { count: 2 },
        used
      ),
    ];
    expect(allPicked).toHaveLength(10);
    const keys = allPicked.map((f) => f.key);
    expect(new Set(keys).size).toBe(10);
    expect(keys).toContain("5-2");
    expect(keys).toContain("5-3");

    // Advanced allows taking away 0 or all (missingPart = 0 or partTakenAway = 0)
    const rngAdv = createSeededRandom("SUB-ADV-POOL");
    const advUsed = new Set<string>();
    const advFacts = selectSubtractionFacts(
      rngAdv,
      "Advanced",
      { totalRange: [2, 5], minPart: 0, count: 18 },
      advUsed
    );
    expect(
      advFacts.some((f) => f.partTakenAway === 0 || f.missingPart === 0)
    ).toBe(true);
    for (const f of advFacts) {
      expect(f.total - f.partTakenAway).toBe(f.missingPart);
    }
  });

  it("extracts selectAdditionFacts without changing K-27 to K-38 generated Worksheets", () => {
    const rng1 = createSeededRandom("ADD-CHECK");
    const addFacts = selectAdditionFacts(rng1, "Intermediate", { count: 4 });
    expect(addFacts.map((f) => f.key)).toEqual(["1+4", "2+1", "1+2", "1+1"]);

    for (let lessonNumber = 27; lessonNumber <= 38; lessonNumber++) {
      const b1 = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `REGRESSION-K${lessonNumber}`,
      });
      const b2 = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `REGRESSION-K${lessonNumber}`,
      });
      expect(b1.isAuthoredBlueprint).toBe(true);
      expect(b1.worksheet).toEqual(b2.worksheet);
      expect(b1.answerKey).toEqual(b2.answerKey);
    }
  });
});

describe("Ticket 01 (Unit 4) — Slice 2a: Subtraction Equation Strip", () => {
  it("renders subtraction Equation Strip with − (U+2212), Total rightmost (٥ − ٢ = ٣), reversed form (٣ = ٥ − ٢), expression form (٥ − ٢), any term as Answer Slot, and طرح labels", () => {
    const standardSubSpec = createEquationStripSpec({
      operation: "subtract",
      total: 5,
      part1: 2,
      part2: 3,
      layout: "standard",
      missingPosition: "part2",
    });

    expect(standardSubSpec.labelAr).not.toContain("جمع");
    expect(standardSubSpec.labelAr).toContain("طرح");
    expect(standardSubSpec.labelAr).toContain("٥ − ٢ = ٣");

    const htmlStdW = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: standardSubSpec,
        solved: false,
      })
    );
    const htmlStdA = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: standardSubSpec,
        solved: true,
      })
    );

    expect(htmlStdW).toContain('data-equation-operation="subtract"');
    expect(htmlStdW).toContain("−");
    expect(htmlStdW).not.toContain("+");
    // In standard subtraction, Total (٥) comes first in RTL DOM order, then −, then part1 (٢), then =, then AnswerSlot for part2 (٣)
    const idxTotal = htmlStdW.indexOf('data-given-position="total"');
    const idxPart1 = htmlStdW.indexOf('data-given-position="part1"');
    const idxSlot = htmlStdW.indexOf('data-answer-slot="unknown"');
    expect(idxTotal).toBeGreaterThan(-1);
    expect(idxPart1).toBeGreaterThan(idxTotal);
    expect(idxSlot).toBeGreaterThan(idxPart1);
    expect(htmlStdA).toContain('data-solved-equation-part2="٣"');

    // Reversed form: ٣ = ٥ − ٢ with missing part1 (٥ − ؟)
    const reversedSubSpec = createEquationStripSpec({
      operation: "subtract",
      total: 5,
      part1: 2,
      part2: 3,
      layout: "total-first",
      missingPosition: "part1",
    });
    expect(reversedSubSpec.labelAr).toContain("٣ = ٥ − ٢");
    expect(reversedSubSpec.labelAr).not.toContain("جمع");
    const htmlRevW = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: reversedSubSpec,
        solved: false,
      })
    );
    const htmlRevA = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: reversedSubSpec,
        solved: true,
      })
    );
    expect(htmlRevW).toContain('data-equation-layout="total-first"');
    expect(htmlRevW).toContain("−");
    expect(htmlRevA).toContain('data-solved-equation-part1="٢"');

    // Expression form: ٥ − ٢
    const exprSubSpec = createEquationStripSpec({
      operation: "subtract",
      total: 5,
      part1: 2,
      part2: 3,
      layout: "expression",
      missingPosition: "none",
    });
    expect(exprSubSpec.labelAr).toContain("٥ − ٢");
    expect(exprSubSpec.labelAr).not.toContain("جمع");
    const htmlExpr = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: exprSubSpec,
        solved: false,
      })
    );
    expect(htmlExpr).toContain("−");
    expect(htmlExpr).not.toMatch(/aria-hidden="true">=<\/span>/);

    expect(findWesternNumeralsInRenderedHtml(htmlStdW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlStdA)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlRevW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlExpr)).toEqual([]);
  });
});

describe("Ticket 01 (Unit 4) — Slice 2b: Cross Off Modes (shown & student) Across Quantity Models", () => {
  it("supports shown and student Cross Off modes on five-frame, snap-cubes, tally-marks (with no + when crossed off), die (leaving valid pattern where possible), and domino (crossing one whole half)", () => {
    // 1. Five Frame: shown vs student mode
    const ffShown = createFiveFrameSpec({
      count: 5,
      crossedOutCount: 2,
      crossOffMode: "shown",
    });
    const ffStudent = createFiveFrameSpec({
      count: 5,
      crossedOutCount: 2,
      crossOffMode: "student",
    });

    const ffShownW = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: ffShown, solved: false })
    );
    const ffStudentW = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: ffStudent, solved: false })
    );
    const ffStudentA = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: ffStudent, solved: true })
    );

    expect(ffShownW.match(/data-crossed-out-cell="true"/g)).toHaveLength(2);
    expect(ffStudentW.match(/data-crossed-out-cell="true"/g)).toBeNull();
    expect(ffStudentA.match(/data-crossed-out-cell="true"/g)).toHaveLength(2);
    expect(ffStudentA).toContain('data-cross-off-mode="student"');

    // 2. Snap Cubes: shown vs student mode, removing from left end
    const cubesShown = createSnapCubesSpec({
      count: 4,
      crossedOutCount: 3,
      crossOffMode: "shown",
    });
    const cubesStudent = createSnapCubesSpec({
      count: 4,
      crossedOutCount: 3,
      crossOffMode: "student",
    });
    const cubesShownW = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: cubesShown, solved: false })
    );
    const cubesStudentW = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: cubesStudent,
        solved: false,
      })
    );
    const cubesStudentA = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: cubesStudent,
        solved: true,
      })
    );
    expect(cubesShownW.match(/data-crossed-out-cube="true"/g)).toHaveLength(3);
    expect(cubesStudentW.match(/data-crossed-out-cube="true"/g)).toBeNull();
    expect(cubesStudentA.match(/data-crossed-out-cube="true"/g)).toHaveLength(
      3
    );

    // 3. Tally Marks: shown vs student mode, no '+' drawn when crossedOutCount > 0
    const tallyShown = createTallyMarksSpec({
      count: 5,
      crossedOutCount: 2,
      crossOffMode: "shown",
    });
    const tallyStudent = createTallyMarksSpec({
      count: 4,
      crossedOutCount: 1,
      crossOffMode: "student",
    });
    const tallyShownW = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: tallyShown, solved: false })
    );
    const tallyStudentW = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: tallyStudent,
        solved: false,
      })
    );
    const tallyStudentA = renderToStaticMarkup(
      React.createElement(VisualModelView, {
        model: tallyStudent,
        solved: true,
      })
    );
    expect(tallyShownW.match(/data-crossed-out-tally="true"/g)).toHaveLength(2);
    expect(tallyShownW).not.toContain("+");
    expect(tallyStudentW.match(/data-crossed-out-tally="true"/g)).toBeNull();
    expect(tallyStudentA.match(/data-crossed-out-tally="true"/g)).toHaveLength(
      1
    );

    // 4. Die: 5 - 2 leaves the diagonal 3 pattern ([48,16], [16,48], [32,32]); 4 - 2 leaves diagonal 2
    const die5Minus2 = createDicePatternSpec({
      count: 5,
      crossedOutCount: 2,
      diceVariant: "die",
      crossOffMode: "shown",
    });
    const die5Minus2W = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: die5Minus2, solved: false })
    );
    expect(die5Minus2W.match(/data-crossed-out-pip="true"/g)).toHaveLength(2);
    expect(die5Minus2W).toContain('data-remaining-die-pattern="valid"');

    // 5. Domino: crosses one whole half (left half = secondaryCount)
    const dominoSub = createDicePatternSpec({
      count: 3,
      secondaryCount: 2,
      crossedOutCount: 2,
      diceVariant: "domino",
      crossOffMode: "student",
    });
    const dominoW = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: dominoSub, solved: false })
    );
    const dominoA = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: dominoSub, solved: true })
    );
    expect(dominoW.match(/data-crossed-out-domino-half="true"/g)).toBeNull();
    expect(dominoA.match(/data-crossed-out-domino-half="true"/g)).toHaveLength(
      1
    );
    expect(dominoA.match(/data-crossed-out-pip="true"/g)).toHaveLength(2);
  });
});

describe("Ticket 01 (Unit 4) — Slice 3: TakeAway Archetype & ConnectMatch Subtraction", () => {
  it("generates and renders TakeAway across representations (five-frame, five-frame-and-digit, snap-cubes, tally-marks, dice, domino), responseForms (number-bond, equation, answer-slot), and actions (trace, write, cross-off-and-write, draw-and-cross-off)", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson = getCurriculumCatalog().getLesson("K", 40)!;
    const takeAwayDef = getExerciseArchetype("TakeAway");
    expect(takeAwayDef.displayNameAr).toBe("اطرح");

    // 1. Five-frame with Number Bond and cross-off-and-write (student cross-off mode)
    const exBond = takeAwayDef.generate({
      lesson,
      sourceLessonId: "K-40",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("TA-BOND-1"),
      spec: {
        archetype: "TakeAway",
        params: {
          representation: "five-frame",
          responseForm: "number-bond",
          action: "cross-off-and-write",
          totalRange: [3, 5],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const dataBond = exBond.data as any;
    expect(dataBond.kind).toBe("TakeAway");
    expect(dataBond.items).toHaveLength(2);
    for (const item of dataBond.items) {
      expect(item.total - item.partTakenAway).toBe(item.missingPart);
      // Number Bond puts Part taken away in right circle (part1) and Missing Part on left (part2)
      expect(item.responseModel.meta.part1).toBe(item.partTakenAway);
      expect(item.responseModel.meta.part2).toBe(item.missingPart);
      expect(item.responseModel.meta.total).toBe(item.total);
      expect(item.unknownPosition).toBe("part2");
      expect(item.representationModel.crossedOutCount).toBe(item.partTakenAway);
      expect(item.representationModel.meta.crossOffMode).toBe("student");
    }

    const htmlBondW = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exBond, mode: "worksheet" })
    );
    const htmlBondA = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exBond, mode: "answer-key" })
    );
    expect(htmlBondW).toContain('data-archetype="TakeAway"');
    expect(htmlBondW).not.toContain('data-crossed-out-cell="true"');
    expect(htmlBondA).toContain('data-crossed-out-cell="true"');
    expect(htmlBondA).toContain("data-solved-bond-part2=");

    // 2. Alternative models (snap-cubes, tally-marks, dice, domino) with كم بقي؟ Answer Slot
    const exSlot = takeAwayDef.generate({
      lesson: getCurriculumCatalog().getLesson("K", 41)!,
      sourceLessonId: "K-41",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("TA-SLOT-1"),
      spec: {
        archetype: "TakeAway",
        params: {
          allowedRepresentations: [
            "snap-cubes",
            "tally-marks",
            "dice",
            "domino",
          ],
          responseForm: "answer-slot",
          action: "cross-off-and-write",
          totalRange: [3, 5],
          minPart: 1,
          itemCount: 2,
        },
      },
    });
    const htmlSlotW = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exSlot, mode: "worksheet" })
    );
    const htmlSlotA = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exSlot, mode: "answer-key" })
    );
    expect(htmlSlotW).toContain("كم بقي؟");
    expect(htmlSlotW).toContain('data-answer-slot="unknown"');
    expect(htmlSlotA).toContain('data-answer-slot="solved-digit"');

    // 3. ConnectMatch with operation: "subtract" for MATCHING A (five-frame -> number-bond) and MATCHING B (dice -> number-bond)
    const matchDef = getExerciseArchetype("ConnectMatch");
    const exMatchA = matchDef.generate({
      lesson,
      sourceLessonId: "K-40",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 3,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCH-SUB-A"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          operation: "subtract",
          matchingMode: "five-frame-to-number-bond",
          totalRange: [3, 5],
          minPart: 1,
          pairCount: 2,
        },
      },
    });
    const matchData = exMatchA.data as any;
    expect(matchData.rightItems).toHaveLength(2);
    for (const rItem of matchData.rightItems) {
      expect(rItem.model.kind).toBe("five-frame");
      expect(rItem.model.crossedOutCount).toBeGreaterThanOrEqual(1);
    }
    for (const lItem of matchData.leftItems) {
      expect(lItem.model.kind).toBe("number-bond");
      // Missing Part is on the left circle (part2)
      expect(lItem.model.meta.missingPosition).toBe("part2");
    }
  });
});

describe("Ticket 01 (Unit 4) — Slice 4: Lessons K-40 & K-41 Blueprints, Localization, and Domain Invariants", () => {
  it("generates Lesson K-40 (Co-presented, Warm-Up from K-30, Five Frame + Number Bond Practice, MATCHING A + Cross off the part you know Challenge) and Lesson K-41 (Warm-Up from K-40, Alternative Models + Digit Slot Practice, MATCHING B + Take away the part you know Challenge)", async () => {
    const { renderWorksheetSurface } =
      await import("@/lib/render-worksheet-surface");

    const k40 = generateWorksheet({
      grade: "K",
      lessonNumber: 40,
      seed: "UNIT4-K40-A",
    });
    const k41 = generateWorksheet({
      grade: "K",
      lessonNumber: 41,
      seed: "UNIT4-K41-A",
    });

    // K-40 checks
    expect(k40.isAuthoredBlueprint).toBe(true);
    expect(k40.lesson.isCoPresented).toBe(true);
    expect(k40.lesson.standards).toEqual(["K.OA.1"]);
    expect(k40.warmUpSourceLessonId).toBe("K-30");
    expect(k40.worksheet.sections[0].sourceLessonId).toBe("K-30");
    expect(k40.teacherNotes.summaryAr.length).toBeGreaterThan(20);
    expect(k40.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k40.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    // K-40 Practice: TakeAway with five-frame and number-bond
    expect(k40.worksheet.sections[1].exercises).toHaveLength(2);
    for (const ex of k40.worksheet.sections[1].exercises) {
      expect(ex.archetype).toBe("TakeAway");
      const data = ex.data as any;
      expect(data.representation).toBe("five-frame");
      expect(data.responseForm).toBe("number-bond");
    }

    // K-40 Challenge: MATCHING A (five-frame -> number-bond) + Problem of the Day ("Cross off the part you know. How many are left?")
    expect(k40.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k40.worksheet.sections[2].exercises[0].archetype).toBe(
      "ConnectMatch"
    );
    expect(k40.worksheet.sections[2].exercises[1].archetype).toBe("TakeAway");

    // K-41 checks
    expect(k41.isAuthoredBlueprint).toBe(true);
    expect(k41.lesson.standards).toEqual(["K.OA.1"]);
    expect(k41.warmUpSourceLessonId).toBe("K-40");
    expect(k41.worksheet.sections[0].sourceLessonId).toBe("K-40");
    expect(k41.teacherNotes.summaryAr.length).toBeGreaterThan(20);
    expect(k41.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k41.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    // K-41 Practice: TakeAway with alternative concrete models (snap-cubes, tally-marks, dice, domino)
    expect(k41.worksheet.sections[1].exercises).toHaveLength(2);
    const k41PracticeModels = k41.worksheet.sections[1].exercises.flatMap(
      (e) => e.visualModels
    );
    expect(k41PracticeModels.some((m) => m.kind === "snap-cubes")).toBe(true);
    expect(k41PracticeModels.some((m) => m.kind === "tally-marks")).toBe(true);
    expect(k41PracticeModels.some((m) => m.kind === "dice-pattern")).toBe(true);

    // K-41 Challenge: MATCHING B (dice -> number-bond) + Problem of the Day ("Take away the part you know. How many are left?")
    expect(k41.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k41.worksheet.sections[2].exercises[0].archetype).toBe(
      "ConnectMatch"
    );
    expect(k41.worksheet.sections[2].exercises[1].archetype).toBe("TakeAway");

    for (const lessonNumber of [40, 41]) {
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

      expect(htmlW).toContain('data-archetype="TakeAway"');
      expect(htmlA).toContain('data-strategy-hint="true"');
      expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlN)).toEqual([]);
    }
  });

  it("domain invariant across 25 seeds × 4 modes: every item in K-40 and K-41 satisfies Total − Part = Missing Part, crossed-off counts equal Part taken away, die cross-offs leave a valid pattern where one exists, and unknown/swap rules hold", () => {
    const validDieRemovals = new Set([
      "5-1",
      "5-2",
      "5-3",
      "5-4",
      "5-5",
      "4-2",
      "4-4",
      "3-1",
      "3-2",
      "3-3",
      "2-2",
      "1-1",
    ]);

    for (const lessonNumber of [40, 41]) {
      for (let s = 1; s <= 25; s++) {
        const seed = `U4-DOMAIN-${lessonNumber}-${s}`;
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
              if (ex.data.kind === "TakeAway") {
                const ta = ex.data as any;
                const seenInEx = new Set<string>();
                for (const item of ta.items) {
                  expect(item.total - item.partTakenAway).toBe(
                    item.missingPart
                  );
                  expect(seenInEx.has(item.factKey)).toBe(false);
                  seenInEx.add(item.factKey);

                  // Crossed-off count equals Part taken away
                  if (item.crossOffMode !== "none") {
                    expect(item.representationModel.crossedOutCount).toBe(
                      item.partTakenAway
                    );
                  }

                  // Die cross-off leaves valid pattern where one exists
                  if (
                    item.representation === "dice" &&
                    validDieRemovals.has(`${item.total}-${item.partTakenAway}`)
                  ) {
                    const html = renderToStaticMarkup(
                      React.createElement(VisualModelView, {
                        model: item.representationModel,
                        solved: true,
                      })
                    );
                    expect(html).toContain(
                      'data-remaining-die-pattern="valid"'
                    );
                  }

                  // Difficulty limits
                  if (ex.difficultyLevel === "Easy") {
                    expect(item.total).toBeLessThanOrEqual(4);
                    expect(item.partTakenAway).toBeGreaterThanOrEqual(1);
                    expect(item.missingPart).toBeGreaterThanOrEqual(1);
                  } else if (ex.difficultyLevel === "Intermediate") {
                    expect(item.total).toBeLessThanOrEqual(5);
                    expect(item.partTakenAway).toBeGreaterThanOrEqual(1);
                    expect(item.missingPart).toBeGreaterThanOrEqual(1);
                  } else {
                    expect(item.total).toBeLessThanOrEqual(5);
                    expect(item.partTakenAway).toBeGreaterThanOrEqual(0);
                    expect(item.missingPart).toBeGreaterThanOrEqual(0);
                  }

                  // Swapped bond parts only at Advanced
                  if (ex.difficultyLevel !== "Advanced") {
                    expect(item.swapBondParts).toBe(false);
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
