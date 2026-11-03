import { describe, expect, it } from "vitest";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 03 — Lesson K-9: Identify Patterns working Forward with 2 Objects (ABABAB)", () => {
  it("generates a 3-section Worksheet and mirrored Answer Key for K-9 with Prerequisite Warm-Up from K-1, forward ABABAB patterns of everyday objects and 2D Shapes, missing last slot, and 2D shape attribute prompts (sides/corners)", () => {
    const k9 = generateWorksheet({
      grade: "K",
      lessonNumber: 9,
      seed: "TICKET03-K9",
    });

    expect(k9.isAuthoredBlueprint).toBe(true);
    expect(k9.lesson.standards).toEqual(["K.G.1"]);

    // Prerequisite Warm-Up resolution: K-9 -> K-1
    expect(k9.warmUpSourceLessonId).toBe("K-1");
    expect(k9.worksheet.sections[0].sourceLessonId).toBe("K-1");

    // Practice & Challenge sections use PatternComplete with forward ABABAB patterns
    const coreExercises = k9.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    expect(coreExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of coreExercises) {
      expect(ex.archetype).toBe("PatternComplete");
      expect(ex.data.kind).toBe("PatternComplete");

      if (ex.data.kind === "PatternComplete") {
        expect(ex.data.unitRule).toBe("AB");
        expect(ex.data.direction).toBe("forward");
        expect(ex.data.sequenceLength).toBe(6);
        expect(ex.data.missingIndex).toBe(5); // Last slot missing (0-based index 5)

        const slots = ex.data.slots as Array<{
          slotIndex: number;
          isMissing: boolean;
          item: { kind: string; id: string };
        }>;
        expect(slots).toHaveLength(6);
        expect(slots.filter((s) => s.isMissing)).toHaveLength(1);
        expect(slots[5].isMissing).toBe(true);

        // Verify ABABAB repeating structure: slot[0]=A, slot[1]=B, slot[2]=A, slot[3]=B, slot[4]=A, slot[5]=B
        expect(slots[0].item.id).toBe(slots[2].item.id);
        expect(slots[2].item.id).toBe(slots[4].item.id);
        expect(slots[1].item.id).toBe(slots[3].item.id);
        expect(slots[3].item.id).toBe(slots[5].item.id);
        expect(slots[0].item.id).not.toBe(slots[1].item.id);

        // Choice bank has the correct missing item + distractors
        const choices = ex.data.choices as Array<{
          id: string;
          isCorrect: boolean;
          item: { id: string };
        }>;
        expect(choices.length).toBeGreaterThanOrEqual(3);
        const correctChoices = choices.filter((c) => c.isCorrect);
        expect(correctChoices).toHaveLength(1);
        expect(correctChoices[0].item.id).toBe(slots[5].item.id);
      }
    }

    // K-9 uses both everyday objects and 2D Shapes (circles, triangles, squares, pentagons, hexagons)
    const k9CoreModels = coreExercises.flatMap((e) => e.visualModels);
    expect(k9CoreModels.some((m) => m.kind === "everyday-object")).toBe(true);
    expect(k9CoreModels.some((m) => m.kind === "shape-2d")).toBe(true);

    // K-9 includes prompts/answers on sides and corners of 2D shapes (such as triangle 3 sides/corners, square 4 sides/corners)
    const k9AttributeTexts = coreExercises
      .map((e) =>
        e.data.kind === "PatternComplete"
          ? `${String(e.data.attributePromptAr ?? "")} ${String(
              e.data.attributeAnswerAr ?? ""
            )}`
          : ""
      )
      .join(" ");
    expect(k9AttributeTexts).toContain("أضلاع");
    expect(k9AttributeTexts).toContain("زوايا");

    // Render surface checks
    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 9,
      seed: "TICKET03-K9",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 9,
      seed: "TICKET03-K9",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 9,
      seed: "TICKET03-K9",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-archetype="PatternComplete"');
    expect(worksheetHtml).toContain('data-pattern-strip="rtl"');
    expect(worksheetHtml).not.toContain("data-solved-missing-slot=");
    expect(worksheetHtml).not.toContain('data-solved-choice="true"');

    expect(answerKeyHtml).toContain("data-solved-missing-slot=");
    expect(answerKeyHtml).toContain('data-solved-choice="true"');
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');
    expect(teacherNotesHtml).toContain("ملاحظات المعلم");

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });
});

describe("Ticket 03 — Lesson K-10: Identify Patterns working Forward with 3 Objects (ABCABC)", () => {
  it("generates a 3-section Worksheet and mirrored Answer Key for K-10 with Prerequisite Warm-Up from K-9, forward ABCABC patterns of everyday objects and 3D Solids, missing last slot, and 3D solid flat-face/corner prompts", () => {
    const k10 = generateWorksheet({
      grade: "K",
      lessonNumber: 10,
      seed: "TICKET03-K10",
    });

    expect(k10.isAuthoredBlueprint).toBe(true);
    expect(k10.lesson.standards).toEqual(["K.G.1"]);

    // Prerequisite Warm-Up resolution: K-10 -> K-9
    expect(k10.warmUpSourceLessonId).toBe("K-9");
    expect(k10.worksheet.sections[0].sourceLessonId).toBe("K-9");
    expect(k10.worksheet.sections[0].exercises[0].archetype).toBe(
      "PatternComplete"
    );

    // Practice & Challenge sections use PatternComplete with forward ABCABC patterns
    const coreExercises = k10.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    expect(coreExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of coreExercises) {
      expect(ex.archetype).toBe("PatternComplete");
      expect(ex.data.kind).toBe("PatternComplete");

      if (ex.data.kind === "PatternComplete") {
        expect(ex.data.unitRule).toBe("ABC");
        expect(ex.data.direction).toBe("forward");
        expect(ex.data.sequenceLength).toBe(6);
        expect(ex.data.missingIndex).toBe(5); // Last slot missing (0-based index 5)

        const slots = ex.data.slots as Array<{
          slotIndex: number;
          isMissing: boolean;
          item: { kind: string; id: string };
        }>;
        expect(slots).toHaveLength(6);
        expect(slots.filter((s) => s.isMissing)).toHaveLength(1);
        expect(slots[5].isMissing).toBe(true);

        // Verify ABCABC repeating structure: slot[0]=A=slot[3], slot[1]=B=slot[4], slot[2]=C=slot[5]
        expect(slots[0].item.id).toBe(slots[3].item.id);
        expect(slots[1].item.id).toBe(slots[4].item.id);
        expect(slots[2].item.id).toBe(slots[5].item.id);
        expect(
          new Set([slots[0].item.id, slots[1].item.id, slots[2].item.id]).size
        ).toBe(3);

        const choices = ex.data.choices as Array<{
          id: string;
          isCorrect: boolean;
          item: { id: string };
        }>;
        expect(choices.length).toBeGreaterThanOrEqual(3);
        const correctChoices = choices.filter((c) => c.isCorrect);
        expect(correctChoices).toHaveLength(1);
        expect(correctChoices[0].item.id).toBe(slots[5].item.id);
      }
    }

    // K-10 uses both everyday objects and 3D Solids (spheres, cones, cylinders, cubes, pyramids)
    const k10CoreModels = coreExercises.flatMap((e) => e.visualModels);
    expect(k10CoreModels.some((m) => m.kind === "everyday-object")).toBe(true);
    expect(k10CoreModels.some((m) => m.kind === "solid-3d")).toBe(true);

    // K-10 includes prompts/answers on flat faces and corners of 3D solids (cube, sphere, cone)
    const k10AttributeTexts = coreExercises
      .map((e) =>
        e.data.kind === "PatternComplete"
          ? `${String(e.data.attributePromptAr ?? "")} ${String(
              e.data.attributeAnswerAr ?? ""
            )}`
          : ""
      )
      .join(" ");
    expect(k10AttributeTexts).toContain("أوجه مسطّحة");
    expect(k10AttributeTexts).toContain("رؤوس");

    // Render surface checks
    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 10,
      seed: "TICKET03-K10",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 10,
      seed: "TICKET03-K10",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 10,
      seed: "TICKET03-K10",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-pattern-rule="ABC"');
    expect(worksheetHtml).toContain('data-visual-model="solid-3d"');
    expect(worksheetHtml).not.toContain("data-solved-missing-slot=");
    expect(answerKeyHtml).toContain("data-solved-missing-slot=");
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });
});

describe("Ticket 03 — Lesson K-11: Identify Patterns working Backward & Comprehensive Seam Invariants (K-9 to K-11)", () => {
  it("generates a 3-section Worksheet and mirrored Answer Key for K-11 with Prerequisite Warm-Up from K-10, backward RTL patterns where the first/starting item is missing (missingIndex === 0), and Strategy Hints guiding students to start at the end and work backward", () => {
    const k11 = generateWorksheet({
      grade: "K",
      lessonNumber: 11,
      seed: "TICKET03-K11",
    });

    expect(k11.isAuthoredBlueprint).toBe(true);
    expect(k11.lesson.standards).toEqual(["K.G.1"]);

    // Prerequisite Warm-Up resolution: K-11 -> K-10
    expect(k11.warmUpSourceLessonId).toBe("K-10");
    expect(k11.worksheet.sections[0].sourceLessonId).toBe("K-10");
    expect(k11.worksheet.sections[0].exercises[0].archetype).toBe(
      "PatternComplete"
    );

    // Practice & Challenge sections use PatternComplete with backward direction (missingIndex === 0)
    const coreExercises = k11.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises);
    expect(coreExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of coreExercises) {
      expect(ex.archetype).toBe("PatternComplete");
      expect(ex.data.kind).toBe("PatternComplete");

      if (ex.data.kind === "PatternComplete") {
        expect(ex.data.direction).toBe("backward");
        expect(ex.data.sequenceLength).toBe(6);
        expect(ex.data.missingIndex).toBe(0); // First/starting slot missing!

        const slots = ex.data.slots as Array<{
          slotIndex: number;
          isMissing: boolean;
          item: { kind: string; id: string };
        }>;
        expect(slots).toHaveLength(6);
        expect(slots.filter((s) => s.isMissing)).toHaveLength(1);
        expect(slots[0].isMissing).toBe(true);
        expect(slots.slice(1).every((s) => !s.isMissing)).toBe(true);

        const choices = ex.data.choices as Array<{
          id: string;
          isCorrect: boolean;
          item: { id: string };
        }>;
        expect(choices.length).toBeGreaterThanOrEqual(3);
        const correctChoices = choices.filter((c) => c.isCorrect);
        expect(correctChoices).toHaveLength(1);
        expect(correctChoices[0].item.id).toBe(slots[0].item.id);
      }

      // Strategy Hint in Answer Key guides student to start at the end and work backward
      expect(ex.strategyHintAr).toMatch(/النهاية|للخلف/);
      expect(k11.answerKey.strategyHintsByExerciseId[ex.id]).toBe(
        ex.strategyHintAr
      );
    }

    // Verify rendered surface for K-11
    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 11,
      seed: "TICKET03-K11",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 11,
      seed: "TICKET03-K11",
      viewMode: "answer-key",
    });
    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 11,
      seed: "TICKET03-K11",
      viewMode: "teacher-notes",
    });

    expect(worksheetHtml).toContain('data-pattern-direction="backward"');
    expect(worksheetHtml).toContain("البداية المفقودة");
    expect(worksheetHtml).not.toContain("data-solved-missing-slot=");
    expect(answerKeyHtml).toContain("data-solved-missing-slot=");
    expect(answerKeyHtml).toContain('data-strategy-hint="true"');
    expect(teacherNotesHtml).toContain("ملاحظات المعلم");

    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });

  it("enforces Seed determinism, Difficulty progression vs. clamping, and strict Eastern Arabic Numerals across Lessons K-9, K-10, and K-11", () => {
    for (const lessonNumber of [9, 10, 11] as const) {
      const runA1 = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `DET-K${lessonNumber}-A`,
      });
      const runA2 = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `DET-K${lessonNumber}-A`,
      });
      const runB = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `DET-K${lessonNumber}-B`,
      });

      expect(runA1.worksheet).toEqual(runA2.worksheet);
      expect(runA1.answerKey).toEqual(runA2.answerKey);
      expect(runA1.worksheet.sections).not.toEqual(runB.worksheet.sections);

      // Default scaffolded progression
      expect(runA1.worksheet.sections.map((s) => s.difficultyLevel)).toEqual([
        "Easy",
        "Intermediate",
        "Advanced",
      ]);

      // Single-tier clamping
      for (const tier of ["Easy", "Intermediate", "Advanced"] as const) {
        const clamped = generateWorksheet({
          grade: "K",
          lessonNumber,
          seed: `CLAMP-K${lessonNumber}`,
          difficultyLevel: tier,
        });
        expect(
          clamped.worksheet.sections.map((s) => s.difficultyLevel)
        ).toEqual([tier, tier, tier]);

        const htmlW = renderWorksheetSurface({
          grade: "K",
          lessonNumber,
          seed: `CLAMP-K${lessonNumber}`,
          difficultyLevel: tier,
          viewMode: "worksheet",
        });
        const htmlA = renderWorksheetSurface({
          grade: "K",
          lessonNumber,
          seed: `CLAMP-K${lessonNumber}`,
          difficultyLevel: tier,
          viewMode: "answer-key",
        });
        expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
        expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      }
    }
  });
});
