import { describe, expect, it } from "vitest";
import {
  generateWorksheet,
  renderWorksheetSurface,
} from "@/engine/worksheet-engine";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 05 — Lessons K-20 & K-21: PictureGraphRead (اقرأ التمثيل البياني بالصور) & Horizontal/Vertical Picture Graph Visual Models", () => {
  it("generates Lesson K-20 (Horizontal Picture Graphs to 5) with RTL horizontal category rows, digit tracing/writing boxes, and comparison prompts (١ أكثر / ١ أقل / نفس العدد)", () => {
    const k20 = generateWorksheet({
      grade: "K",
      lessonNumber: 20,
      seed: "TICKET05-K20",
    });

    expect(k20.isAuthoredBlueprint).toBe(true);
    expect(k20.lesson.isCoPresented).toBe(true);
    expect(k20.lesson.standards).toEqual(["K.CC.5", "K.CC.6"]);
    // K-20 has no prerequisite, so Warm-Up falls back to K-20's own Easy tier
    expect(k20.warmUpSourceLessonId).toBe("K-20");
    expect(k20.worksheet.sections[0].sourceLessonId).toBe("K-20");

    const allExercises = k20.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(5);

    for (const ex of allExercises) {
      expect(ex.archetype).toBe("PictureGraphRead");
      expect(ex.data.kind).toBe("PictureGraphRead");
      expect(ex.visualModels.some((m) => m.kind === "picture-graph")).toBe(true);
    }

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 20,
      seed: "TICKET05-K20",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 20,
      seed: "TICKET05-K20",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 20,
      seed: "TICKET05-K20",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-archetype="PictureGraphRead"');
    expect(worksheetHtml).toContain('data-visual-model="picture-graph"');
    expect(worksheetHtml).toContain('data-orientation="horizontal"');
    expect(worksheetHtml).toContain('data-direction="rtl"');
    expect(worksheetHtml).toContain('data-graph-axis="horizontal"');
    expect(worksheetHtml).toContain("data-graph-category=");
    expect(worksheetHtml).toContain('data-visual-model="numeral-trace"');
    expect(worksheetHtml).toMatch(/١ أكثر|١ أقل|نفس العدد/);
    expect(worksheetHtml).not.toContain("data-solved-category-count=");

    // Answer key renders solved category counts, comparison relation, and strategy hints
    expect(answerKeyHtml).toContain("data-solved-category-count=");
    expect(answerKeyHtml).toContain("data-solved-comparison-relation=");
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');

    // Strict Eastern Arabic Numerals invariant
    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });

  it("generates Lesson K-21 (Vertical Picture Graphs to 5) with Prerequisite K-20 Warm-Up and renders RTL vertical columns of SVG icons", () => {
    const k21 = generateWorksheet({
      grade: "K",
      lessonNumber: 21,
      seed: "TICKET05-K21",
    });

    expect(k21.isAuthoredBlueprint).toBe(true);
    expect(k21.lesson.standards).toEqual(["K.CC.5", "K.CC.6"]);
    // K-21 Prerequisite is K-20
    expect(k21.warmUpSourceLessonId).toBe("K-20");
    expect(k21.worksheet.sections[0].sourceLessonId).toBe("K-20");

    const coreExercises = k21.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    expect(coreExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of coreExercises) {
      expect(ex.archetype).toBe("PictureGraphRead");
      expect(ex.visualModels.some((m) => m.kind === "picture-graph")).toBe(true);
    }

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 21,
      seed: "TICKET05-K21",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 21,
      seed: "TICKET05-K21",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 21,
      seed: "TICKET05-K21",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-visual-model="picture-graph"');
    expect(worksheetHtml).toContain('data-orientation="vertical"');
    expect(worksheetHtml).toContain('data-graph-axis="vertical"');
    expect(worksheetHtml).toMatch(/١ أكثر|١ أقل|نفس العدد/);
    expect(answerKeyHtml).toContain("data-solved-category-count=");
    expect(answerKeyHtml).toContain("data-solved-comparison-relation=");
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });
});

describe("Ticket 05 — Lessons K-22, K-23, K-24: SequenceAndZero (العدّ التصاعدي والتنازلي والعدد صفر)", () => {
  it("generates Lesson K-22 (Count Forward to 5) with Prerequisite K-13 Warm-Up and renders increasing ١→٥ Snap Cube & object sequences with missing numbers and ١ أكثر reasoning", () => {
    const k22 = generateWorksheet({
      grade: "K",
      lessonNumber: 22,
      seed: "TICKET05-K22",
    });

    expect(k22.isAuthoredBlueprint).toBe(true);
    expect(k22.lesson.standards).toEqual(["K.CC.4"]);
    // K-22 Prerequisite is K-13
    expect(k22.warmUpSourceLessonId).toBe("K-13");
    expect(k22.worksheet.sections[0].sourceLessonId).toBe("K-13");

    const coreExercises = k22.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    expect(coreExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of coreExercises) {
      expect(ex.archetype).toBe("SequenceAndZero");
      expect(ex.data.kind).toBe("SequenceAndZero");
    }

    const coreModels = coreExercises.flatMap((e) => e.visualModels);
    expect(coreModels.some((m) => m.kind === "snap-cubes")).toBe(true);

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 22,
      seed: "TICKET05-K22",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 22,
      seed: "TICKET05-K22",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 22,
      seed: "TICKET05-K22",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-archetype="SequenceAndZero"');
    expect(worksheetHtml).toContain('data-sequence-mode="forward"');
    expect(worksheetHtml).toContain('data-visual-model="snap-cubes"');
    expect(worksheetHtml).toContain('data-step-missing="true"');
    expect(worksheetHtml).toContain("١ أكثر");
    expect(worksheetHtml).not.toContain("data-solved-sequence-step=");

    expect(answerKeyHtml).toContain("data-solved-sequence-step=");
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });

  it("generates Lesson K-23 (Count Backward from 5) with Prerequisite K-22 Warm-Up and renders decreasing ٥→١ sequences with missing numbers and ١ أقل reasoning", () => {
    const k23 = generateWorksheet({
      grade: "K",
      lessonNumber: 23,
      seed: "TICKET05-K23",
    });

    expect(k23.isAuthoredBlueprint).toBe(true);
    expect(k23.lesson.isCoPresented).toBe(true);
    expect(k23.lesson.standards).toEqual(["K.CC.4"]);
    // K-23 Prerequisite is K-22
    expect(k23.warmUpSourceLessonId).toBe("K-22");
    expect(k23.worksheet.sections[0].sourceLessonId).toBe("K-22");

    const coreExercises = k23.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    expect(coreExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of coreExercises) {
      expect(ex.archetype).toBe("SequenceAndZero");
      expect(ex.data.kind).toBe("SequenceAndZero");
    }

    const coreModels = coreExercises.flatMap((e) => e.visualModels);
    expect(coreModels.some((m) => m.kind === "snap-cubes")).toBe(true);

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 23,
      seed: "TICKET05-K23",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 23,
      seed: "TICKET05-K23",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 23,
      seed: "TICKET05-K23",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-archetype="SequenceAndZero"');
    expect(worksheetHtml).toContain('data-sequence-mode="backward"');
    expect(worksheetHtml).toContain('data-step-missing="true"');
    expect(worksheetHtml).toContain("١ أقل");
    expect(answerKeyHtml).toContain("data-solved-sequence-step=");
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });

  it("generates Lesson K-24 (Number Zero) with Prerequisite K-23 Warm-Up and models taking away objects one by one and crossing off Five Frame counters until ٠ remain with dotted ٠ tracing", () => {
    const k24 = generateWorksheet({
      grade: "K",
      lessonNumber: 24,
      seed: "TICKET05-K24",
    });

    expect(k24.isAuthoredBlueprint).toBe(true);
    expect(k24.lesson.standards).toEqual(["K.CC.3", "K.CC.5"]);
    // K-24 Prerequisite is K-23
    expect(k24.warmUpSourceLessonId).toBe("K-23");
    expect(k24.worksheet.sections[0].sourceLessonId).toBe("K-23");

    const coreExercises = k24.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    expect(coreExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of coreExercises) {
      expect(ex.archetype).toBe("SequenceAndZero");
      expect(ex.data.kind).toBe("SequenceAndZero");
    }

    const coreModels = coreExercises.flatMap((e) => e.visualModels);
    expect(coreModels.some((m) => m.kind === "five-frame")).toBe(true);
    expect(
      coreModels.some((m) => m.kind === "numeral-trace" && m.digit === 0)
    ).toBe(true);

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 24,
      seed: "TICKET05-K24",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 24,
      seed: "TICKET05-K24",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 24,
      seed: "TICKET05-K24",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-archetype="SequenceAndZero"');
    expect(worksheetHtml).toContain('data-sequence-mode="zero-take-away"');
    expect(worksheetHtml).toContain('data-visual-model="five-frame"');
    expect(worksheetHtml).toContain('data-crossed-out-cell="true"');
    expect(worksheetHtml).toContain('data-visual-model="numeral-trace"');
    expect(worksheetHtml).toContain('data-digit="٠"');
    expect(answerKeyHtml).toContain('data-solved-trace="٠"');
    expect(answerKeyHtml).toContain("data-solved-sequence-step=");
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });
});

describe("Ticket 05 — Lessons K-25 & K-26: SubitizePartWhole (اعرف العدد بسرعة: الأجزاء والكل) & Timed 3-Second Flash-Card Teacher Notes", () => {
  it("generates Lesson K-25 (Subitize to 5 Part I) with Prerequisite K-12 Warm-Up, structured Five Frame & dot-pattern subitizing on paper, and timed ٣ ثوانٍ flash-card instructions in Teacher Notes", () => {
    const k25 = generateWorksheet({
      grade: "K",
      lessonNumber: 25,
      seed: "TICKET05-K25",
    });

    expect(k25.isAuthoredBlueprint).toBe(true);
    expect(k25.lesson.isCoPresented).toBe(true);
    expect(k25.lesson.standards).toEqual(["K.CC.5"]);
    // K-25 Prerequisite is K-12
    expect(k25.warmUpSourceLessonId).toBe("K-12");
    expect(k25.worksheet.sections[0].sourceLessonId).toBe("K-12");

    const coreExercises = k25.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    expect(coreExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of coreExercises) {
      expect(ex.archetype).toBe("SubitizePartWhole");
      expect(ex.data.kind).toBe("SubitizePartWhole");
      expect(
        ex.visualModels.some(
          (m) => m.kind === "five-frame" || m.kind === "dice-pattern"
        )
      ).toBe(true);
    }

    // Teacher Notes must include the timed 3-second flash-card classroom guidance
    expect(k25.teacherNotes.classroomActivityNoteAr).toContain("٣ ثوانٍ");

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 25,
      seed: "TICKET05-K25",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 25,
      seed: "TICKET05-K25",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 25,
      seed: "TICKET05-K25",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-archetype="SubitizePartWhole"');
    expect(worksheetHtml).toContain('data-visual-model="five-frame"');
    expect(worksheetHtml).toContain('data-empty-slot="true"');
    expect(worksheetHtml).not.toContain("data-solved-subitize-filled=");
    expect(worksheetHtml).not.toContain("ملاحظات المعلم");

    expect(answerKeyHtml).toContain("data-solved-subitize-filled=");
    expect(answerKeyHtml).toContain("data-solved-subitize-missing=");
    expect(answerKeyHtml).toContain('data-solved-subitize-total="٥"');
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');

    // Teacher Notes view contains the 3-second flash-card instructions
    expect(teacherNotesHtml).toContain("٣ ثوانٍ");

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });

  it("generates Lesson K-26 (Subitize to 5 Part II) with Prerequisite K-25 Warm-Up, part-whole combinations of ٥ (filled part + missing part = ٥), and timed ٣ ثوانٍ flash-card Teacher Notes", () => {
    const k26 = generateWorksheet({
      grade: "K",
      lessonNumber: 26,
      seed: "TICKET05-K26",
    });

    expect(k26.isAuthoredBlueprint).toBe(true);
    expect(k26.lesson.standards).toEqual(["K.CC.5"]);
    // K-26 Prerequisite is K-25
    expect(k26.warmUpSourceLessonId).toBe("K-25");
    expect(k26.worksheet.sections[0].sourceLessonId).toBe("K-25");

    const allExercises = k26.worksheet.sections.flatMap((s) => s.exercises);
    for (const ex of allExercises) {
      expect(ex.archetype).toBe("SubitizePartWhole");
      expect(ex.data.kind).toBe("SubitizePartWhole");
    }

    expect(k26.teacherNotes.classroomActivityNoteAr).toContain("٣ ثوانٍ");

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 26,
      seed: "TICKET05-K26",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 26,
      seed: "TICKET05-K26",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 26,
      seed: "TICKET05-K26",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-archetype="SubitizePartWhole"');
    expect(worksheetHtml).toContain('data-subitize-mode="both-parts-to-5"');
    expect(answerKeyHtml).toContain("data-solved-subitize-filled=");
    expect(answerKeyHtml).toContain("data-solved-subitize-missing=");
    expect(answerKeyHtml).toContain('data-solved-subitize-total="٥"');
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');
    expect(teacherNotesHtml).toContain("٣ ثوانٍ");

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });
});

describe("Ticket 05 — Complete Grade K Units 1–2 (Lessons K-1 through K-26) End-to-End Seam Verification", () => {
  it("achieves 100% authored Lesson Blueprint coverage across all 26 Lessons (K-1 to K-26), exercises all 7 Archetypes and all SVG Visual Models, and enforces Seed determinism, Difficulty clamping, Strategy Hints, and strict Eastern Arabic Numerals", () => {
    const observedArchetypes = new Set<string>();
    const observedVisualModelKinds = new Set<string>();

    for (let lessonNumber = 1; lessonNumber <= 26; lessonNumber++) {
      const bundle1 = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `E2E-K${lessonNumber}-A`,
      });
      const bundle2 = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `E2E-K${lessonNumber}-A`,
      });
      const bundleDiff = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `E2E-K${lessonNumber}-B`,
      });

      // 1. 100% authored blueprint coverage for K-1..K-26
      expect(bundle1.isAuthoredBlueprint).toBe(true);
      expect(bundle1.lesson.id).toBe(`K-${lessonNumber}`);

      // 2. Seed determinism & variation
      expect(bundle1.worksheet).toEqual(bundle2.worksheet);
      expect(bundle1.answerKey).toEqual(bundle2.answerKey);
      expect(bundle1.worksheet.sections).not.toEqual(bundleDiff.worksheet.sections);

      // 3. Default scaffolded progression (Easy -> Intermediate -> Advanced)
      expect(bundle1.worksheet.sections.map((s) => s.difficultyLevel)).toEqual([
        "Easy",
        "Intermediate",
        "Advanced",
      ]);

      // 4. Difficulty clamping check
      const clampedEasy = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `E2E-K${lessonNumber}-EASY`,
        difficultyLevel: "Easy",
      });
      expect(
        clampedEasy.worksheet.sections.map((s) => s.difficultyLevel)
      ).toEqual(["Easy", "Easy", "Easy"]);

      // 5. Track archetypes, visual models, and Strategy Hints
      const exercises = bundle1.worksheet.sections.flatMap((s) => s.exercises);
      expect(exercises.length).toBeGreaterThanOrEqual(4);
      for (const ex of exercises) {
        observedArchetypes.add(ex.archetype);
        expect(ex.strategyHintAr.length).toBeGreaterThan(10);
        expect(bundle1.answerKey.strategyHintsByExerciseId[ex.id]).toBe(
          ex.strategyHintAr
        );
        for (const vm of ex.visualModels) {
          observedVisualModelKinds.add(vm.kind);
        }
      }

      // 6. Render Worksheet, Answer Key, and Teacher Notes and verify zero Western numerals
      const worksheetHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `E2E-RENDER-K${lessonNumber}`,
        viewMode: "worksheet",
      });
      const answerKeyHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `E2E-RENDER-K${lessonNumber}`,
        viewMode: "answer-key",
      });
      const teacherNotesHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `E2E-RENDER-K${lessonNumber}`,
        viewMode: "teacher-notes",
      });

      expect(answerKeyHtml).toContain('data-strategy-hint="true"');
      expect(teacherNotesHtml).toContain("ملاحظات المعلم");

      expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
    }

    // All 7 canonical Exercise Archetypes are exercised across K-1..K-26
    expect(Array.from(observedArchetypes).sort()).toEqual(
      [
        "ClassifyAndCount",
        "ConnectMatch",
        "ModelCountAndTrace",
        "PatternComplete",
        "PictureGraphRead",
        "SequenceAndZero",
        "SubitizePartWhole",
      ].sort()
    );

    // Core SVG Visual Model kinds are exercised across K-1..K-26
    for (const expectedKind of [
      "everyday-object",
      "shape-2d",
      "solid-3d",
      "real-world-solid",
      "coin",
      "five-frame",
      "snap-cubes",
      "tally-marks",
      "dice-pattern",
      "circular-arrangement",
      "picture-graph",
      "numeral-trace",
    ]) {
      expect(observedVisualModelKinds.has(expectedKind)).toBe(true);
    }
  });
});

