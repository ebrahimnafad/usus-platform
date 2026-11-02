import { describe, expect, it } from "vitest";
import {
  generateWorksheet,
  renderWorksheetSurface,
} from "@/engine/worksheet-engine";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 04 — Lessons K-12 to K-16: ModelCountAndTrace (عدّ ومثّل وتتبّع الرقم) & Unit 2 SVG Visual Models", () => {
  it("generates Lesson K-12 (Five Frames) using ModelCountAndTrace with RTL-filling Five Frames and Dotted Numeral Tracing Guides (٠–٥)", () => {
    const k12 = generateWorksheet({
      grade: "K",
      lessonNumber: 12,
      seed: "TICKET04-K12",
    });

    expect(k12.isAuthoredBlueprint).toBe(true);
    expect(k12.lesson.isCoPresented).toBe(true);
    expect(k12.lesson.standards).toEqual(["K.CC.3"]);
    // K-12 has no prerequisites, so Warm-Up falls back to K-12's own Easy tier
    expect(k12.warmUpSourceLessonId).toBe("K-12");
    expect(k12.worksheet.sections[0].sourceLessonId).toBe("K-12");

    const allExercises = k12.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(5);

    for (const ex of allExercises) {
      expect(ex.archetype).toBe("ModelCountAndTrace");
      expect(ex.data.kind).toBe("ModelCountAndTrace");
      expect(ex.visualModels.some((m) => m.kind === "five-frame")).toBe(true);
      expect(ex.visualModels.some((m) => m.kind === "numeral-trace")).toBe(true);
    }

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 12,
      seed: "TICKET04-K12",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 12,
      seed: "TICKET04-K12",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 12,
      seed: "TICKET04-K12",
      viewMode: "teacher-notes",
    });

    // Verify Five Frame RTL attributes and Numeral Trace guides
    expect(worksheetHtml).toContain('data-archetype="ModelCountAndTrace"');
    expect(worksheetHtml).toContain('data-visual-model="five-frame"');
    expect(worksheetHtml).toContain('data-direction="rtl"');
    expect(worksheetHtml).toContain('data-visual-model="numeral-trace"');
    expect(worksheetHtml).toContain('data-start-dot="true"');
    expect(worksheetHtml).toContain('data-direction-arrow="true"');
    expect(worksheetHtml).toContain('data-trace-stroke="dotted"');
    expect(worksheetHtml).not.toContain('data-trace-stroke="solid"');
    expect(worksheetHtml).not.toContain("data-solved-trace=");

    // Answer key renders solid traced strokes and strategy hints
    expect(answerKeyHtml).toContain('data-trace-stroke="solid"');
    expect(answerKeyHtml).toContain("data-solved-trace=");
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');

    // Strict Eastern Arabic Numerals invariant
    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });

  it("generates Lesson K-13 (Snap Cubes) with Prerequisite K-12 Warm-Up and renders joined and separated 3D Snap Cube trains", () => {
    const k13 = generateWorksheet({
      grade: "K",
      lessonNumber: 13,
      seed: "TICKET04-K13",
    });

    expect(k13.isAuthoredBlueprint).toBe(true);
    expect(k13.lesson.standards).toEqual(["K.CC.3"]);
    // K-13 Prerequisite is K-12
    expect(k13.warmUpSourceLessonId).toBe("K-12");
    expect(k13.worksheet.sections[0].sourceLessonId).toBe("K-12");

    // Practice & Challenge exercises use snap-cubes and numeral-trace
    const coreExercises = k13.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    expect(coreExercises.length).toBeGreaterThanOrEqual(4);

    const coreModels = coreExercises.flatMap((e) => e.visualModels);
    expect(coreModels.some((m) => m.kind === "snap-cubes")).toBe(true);
    expect(coreModels.some((m) => m.kind === "numeral-trace")).toBe(true);

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 13,
      seed: "TICKET04-K13",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 13,
      seed: "TICKET04-K13",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 13,
      seed: "TICKET04-K13",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-visual-model="snap-cubes"');
    expect(worksheetHtml).toContain('data-separated="false"');
    expect(worksheetHtml).toContain('data-separated="true"');
    expect(answerKeyHtml).toContain("data-solved-trace=");
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });

  it("generates Lesson K-14 (Tally Marks & Sticks) with Prerequisite K-13 Warm-Up and renders ١–٤ vertical strokes plus diagonal ٥ slash", () => {
    const k14 = generateWorksheet({
      grade: "K",
      lessonNumber: 14,
      seed: "TICKET04-K14",
    });

    expect(k14.isAuthoredBlueprint).toBe(true);
    expect(k14.lesson.standards).toEqual(["K.CC.3"]);
    // K-14 Prerequisite is K-13
    expect(k14.warmUpSourceLessonId).toBe("K-13");
    expect(k14.worksheet.sections[0].sourceLessonId).toBe("K-13");

    const coreExercises = k14.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    expect(coreExercises.length).toBeGreaterThanOrEqual(4);

    const coreModels = coreExercises.flatMap((e) => e.visualModels);
    expect(coreModels.some((m) => m.kind === "tally-marks")).toBe(true);
    expect(coreModels.some((m) => m.kind === "numeral-trace")).toBe(true);

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 14,
      seed: "TICKET04-K14",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 14,
      seed: "TICKET04-K14",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 14,
      seed: "TICKET04-K14",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-visual-model="tally-marks"');
    expect(worksheetHtml).toContain('data-tally-stroke="vertical"');
    expect(worksheetHtml).toContain('data-tally-stroke="fifth-slash"');
    expect(worksheetHtml).toContain('data-has-fifth-slash="true"');
    expect(answerKeyHtml).toContain("data-solved-trace=");
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });

  it("generates Lesson K-15 (Dice & Domino Dot Patterns) with Prerequisite K-14 Warm-Up and color-grouped subitizing dots", () => {
    const k15 = generateWorksheet({
      grade: "K",
      lessonNumber: 15,
      seed: "TICKET04-K15",
    });

    expect(k15.isAuthoredBlueprint).toBe(true);
    expect(k15.lesson.standards).toEqual(["K.CC.3"]);
    // K-15 Prerequisite is K-14
    expect(k15.warmUpSourceLessonId).toBe("K-14");
    expect(k15.worksheet.sections[0].sourceLessonId).toBe("K-14");

    const coreExercises = k15.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    expect(coreExercises.length).toBeGreaterThanOrEqual(4);

    const coreModels = coreExercises.flatMap((e) => e.visualModels);
    expect(coreModels.some((m) => m.kind === "dice-pattern")).toBe(true);
    expect(coreModels.some((m) => m.kind === "numeral-trace")).toBe(true);

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 15,
      seed: "TICKET04-K15",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 15,
      seed: "TICKET04-K15",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 15,
      seed: "TICKET04-K15",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-visual-model="dice-pattern"');
    expect(worksheetHtml).toContain('data-dot-group="primary"');
    expect(worksheetHtml).toContain('data-dot-group="secondary"');
    expect(answerKeyHtml).toContain("data-solved-trace=");
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });

  it("generates Lesson K-16 (Circular Arrangements) with Prerequisite K-15 Warm-Up and objects arranged evenly around a circular track with starting marker", () => {
    const k16 = generateWorksheet({
      grade: "K",
      lessonNumber: 16,
      seed: "TICKET04-K16",
    });

    expect(k16.isAuthoredBlueprint).toBe(true);
    expect(k16.lesson.standards).toEqual(["K.CC.3"]);
    // K-16 Prerequisite is K-15
    expect(k16.warmUpSourceLessonId).toBe("K-15");
    expect(k16.worksheet.sections[0].sourceLessonId).toBe("K-15");

    const coreExercises = k16.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    expect(coreExercises.length).toBeGreaterThanOrEqual(4);

    const coreModels = coreExercises.flatMap((e) => e.visualModels);
    expect(coreModels.some((m) => m.kind === "circular-arrangement")).toBe(true);
    expect(coreModels.some((m) => m.kind === "numeral-trace")).toBe(true);

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 16,
      seed: "TICKET04-K16",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 16,
      seed: "TICKET04-K16",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 16,
      seed: "TICKET04-K16",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-visual-model="circular-arrangement"');
    expect(worksheetHtml).toContain('data-circular-track="true"');
    expect(worksheetHtml).toContain('data-start-marker="true"');
    expect(answerKeyHtml).toContain("data-solved-trace=");
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });

  it("supports Five Frame cross-out marks for zero (٠) and Numeral Trace for digit ٠", () => {
    const k12Advanced = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 12,
      seed: "ZERO-TRACE-CHECK",
      difficultyLevel: "Advanced",
      viewMode: "worksheet",
    });
    expect(k12Advanced).toContain('data-visual-model="five-frame"');
    expect(k12Advanced).toContain('data-crossed-out-cell="true"');
    expect(k12Advanced).toContain('data-digit="٠"');
    expect(findWesternNumeralsInRenderedHtml(k12Advanced)).toEqual([]);
  });
});

describe("Ticket 04 — Lessons K-17, K-18, K-19: Match Quantities to 5 with Objects, Shapes/Solids, and Coins & Digits + Alternative (○) Prerequisite Resolution", () => {
  it("generates K-17 (Objects & Digits), K-18 (Shapes/Solids & Digits), and K-19 (Coins as Unit Counters of ١ & Digits) and resolves ○ alternative Prerequisites to the primary path", () => {
    const k17 = generateWorksheet({
      grade: "K",
      lessonNumber: 17,
      seed: "TICKET04-K17",
    });
    const k18 = generateWorksheet({
      grade: "K",
      lessonNumber: 18,
      seed: "TICKET04-K18",
    });
    const k19 = generateWorksheet({
      grade: "K",
      lessonNumber: 19,
      seed: "TICKET04-K19",
    });

    expect(k17.isAuthoredBlueprint).toBe(true);
    expect(k18.isAuthoredBlueprint).toBe(true);
    expect(k19.isAuthoredBlueprint).toBe(true);

    expect(k17.lesson.isCoPresented).toBe(true);
    expect(k17.lesson.standards).toEqual(["K.CC.4"]);
    expect(k18.lesson.standards).toEqual(["K.CC.4"]);
    expect(k19.lesson.standards).toEqual(["K.CC.4"]);

    // Alternative (○) Prerequisite resolution:
    // K-17: "K-12 ○ K-1" -> resolves to K-12
    expect(k17.lesson.prerequisites.raw).toBe("K-12 ○ K-1");
    expect(k17.warmUpSourceLessonId).toBe("K-12");
    expect(k17.worksheet.sections[0].sourceLessonId).toBe("K-12");

    // K-18: "K-17 ○ K-3, K-2" -> resolves to K-17
    expect(k18.lesson.prerequisites.raw).toBe("K-17 ○ K-3, K-2");
    expect(k18.warmUpSourceLessonId).toBe("K-17");
    expect(k18.worksheet.sections[0].sourceLessonId).toBe("K-17");

    // K-19: "K-18 ○ K-4" -> resolves to K-18
    expect(k19.lesson.prerequisites.raw).toBe("K-18 ○ K-4");
    expect(k19.warmUpSourceLessonId).toBe("K-18");
    expect(k19.worksheet.sections[0].sourceLessonId).toBe("K-18");

    // K-17 Practice & Challenge use ConnectMatch with everyday-object quantities (1..5) and digit cards
    const k17CoreExercises = k17.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    for (const ex of k17CoreExercises) {
      expect(ex.archetype).toBe("ConnectMatch");
      expect(ex.visualModels.some((m) => m.kind === "everyday-object")).toBe(true);
      expect(
        ex.visualModels.some(
          (m) => m.kind === "digit-card" || m.kind === "numeral-trace"
        )
      ).toBe(true);
    }

    // K-18 Practice & Challenge use ConnectMatch with shape-2d and solid-3d quantities (1..5) and digits
    const k18CoreModels = k18.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises)
      .flatMap((e) => e.visualModels);
    expect(k18CoreModels.some((m) => m.kind === "shape-2d")).toBe(true);
    expect(k18CoreModels.some((m) => m.kind === "solid-3d")).toBe(true);
    expect(
      k18CoreModels.some(
        (m) => m.kind === "digit-card" || m.kind === "numeral-trace"
      )
    ).toBe(true);

    // K-19 Practice & Challenge use ConnectMatch with coins counted as unit counters of 1 (quantities 1..5) and digits
    const k19CoreExercises = k19.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    for (const ex of k19CoreExercises) {
      expect(ex.archetype).toBe("ConnectMatch");
      if (ex.data.kind === "ConnectMatch") {
        for (const pair of ex.data.pairs) {
          expect(pair.rightItem.kind).toBe("coin");
          const coinCount =
            (pair.rightItem.count ?? 1) + (pair.rightItem.secondaryCount ?? 0);
          const matchedDigit = pair.leftItem.digit ?? pair.leftItem.count;
          expect(coinCount).toBeGreaterThanOrEqual(1);
          expect(coinCount).toBeLessThanOrEqual(5);
          // Coins are treated as unit counters (each coin counts as 1), so quantity matches the digit
          expect(matchedDigit).toBe(coinCount);
        }
      }
    }
  });

  it("enforces Seed determinism, Difficulty progression & clamping, mirrored Answer Keys, and zero Western numerals across all 8 Lessons (K-12 through K-19)", () => {
    for (const lessonNumber of [12, 13, 14, 15, 16, 17, 18, 19] as const) {
      // 1. Seed Determinism
      const run1 = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `DET-K${lessonNumber}-1`,
      });
      const run2 = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `DET-K${lessonNumber}-1`,
      });
      const runDiff = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `DET-K${lessonNumber}-2`,
      });

      expect(run1.worksheet).toEqual(run2.worksheet);
      expect(run1.answerKey).toEqual(run2.answerKey);
      expect(run1.worksheet.sections).not.toEqual(runDiff.worksheet.sections);

      // 2. Scaffolded progression vs. Clamping
      expect(run1.worksheet.sections.map((s) => s.difficultyLevel)).toEqual([
        "Easy",
        "Intermediate",
        "Advanced",
      ]);

      for (const tier of ["Easy", "Intermediate", "Advanced"] as const) {
        const clamped = generateWorksheet({
          grade: "K",
          lessonNumber,
          seed: `CLAMP-K${lessonNumber}`,
          difficultyLevel: tier,
        });
        expect(clamped.worksheet.sections.map((s) => s.difficultyLevel)).toEqual([
          tier,
          tier,
          tier,
        ]);
      }

      // 3. Render Surface & Strict Eastern Arabic Numerals Invariant
      const worksheetHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `SURFACE-K${lessonNumber}`,
        viewMode: "worksheet",
      });
      const answerKeyHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `SURFACE-K${lessonNumber}`,
        viewMode: "answer-key",
      });
      const teacherNotesHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `SURFACE-K${lessonNumber}`,
        viewMode: "teacher-notes",
      });

      expect(answerKeyHtml).toContain('data-strategy-hint="true"');
      expect(teacherNotesHtml).toContain("ملاحظات المعلم");

      if (lessonNumber >= 17) {
        expect(worksheetHtml).toContain('data-archetype="ConnectMatch"');
        expect(worksheetHtml).not.toContain("data-solved-connection=");
        expect(answerKeyHtml).toContain("data-solved-connection=");
      }

      expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
    }
  });
});
