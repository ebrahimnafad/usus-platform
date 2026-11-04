import { describe, expect, it } from "vitest";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Primary Seam — Curriculum Catalog Integrity", () => {
  it("parses all 6 Grades (K–5), 12 Units per grade, and 135 Lessons per grade with accurate Standards, Co-presented/Enrichment flags, and Prerequisite graphs", () => {
    const catalog = getCurriculumCatalog();

    // 1. All 6 Grades exist in order K through 5
    expect(catalog.gradeList.map((g) => g.id)).toEqual([
      "K",
      "1",
      "2",
      "3",
      "4",
      "5",
    ]);

    let totalLessons = 0;
    for (const grade of catalog.gradeList) {
      // 12 Units per grade
      expect(grade.units).toHaveLength(12);
      // 135 Lessons per grade
      expect(grade.lessons).toHaveLength(135);
      // Lesson numbers are 1..135 sequentially
      expect(grade.lessons.map((l) => l.lessonNumber)).toEqual(
        Array.from({ length: 135 }, (_, i) => i + 1)
      );
      totalLessons += grade.lessons.length;
    }
    expect(totalLessons).toBe(810);

    // 2. Check Lesson K-1 (Match Objects): Standards K.G.4, no prerequisites, localized Arabic title & Teacher Notes
    const k1 = catalog.getLesson("K", 1);
    expect(k1).toBeDefined();
    expect(k1?.titleEn).toBe("Match Objects");
    expect(k1?.titleAr).toContain("مطابقة الأشياء");
    expect(k1?.standards).toEqual(["K.G.4"]);
    expect(k1?.prerequisites.paths).toEqual([]);
    expect(k1?.isCoPresented).toBe(false);
    expect(k1?.isEnrichment).toBe(false);
    expect(k1?.teacherNotes.summaryAr.length).toBeGreaterThan(20);

    // 3. Check Co-presented flag and multiple standards on K-5 (Sort and Group 2D Shapes)
    const k5 = catalog.getLesson("K", 5);
    expect(k5?.standards).toEqual(["K.MD.3", "K.G.2"]);
    expect(k5?.isCoPresented).toBe(true);
    expect(k5?.prerequisites.paths).toEqual([
      [{ grade: "K", lessonNumber: 2, rawCode: "K-2" }],
    ]);

    // 4. Check compound prerequisites (`,`) on K-7 (Sort Shapes & Solids that vary in Size: K-6, K-5)
    const k7 = catalog.getLesson("K", 7);
    expect(k7?.prerequisites.raw).toBe("K-6, K-5");
    expect(k7?.prerequisites.paths).toEqual([
      [
        { grade: "K", lessonNumber: 6, rawCode: "K-6" },
        { grade: "K", lessonNumber: 5, rawCode: "K-5" },
      ],
    ]);

    // 5. Check alternative (`○`) and compound (`,`) prerequisites on K-18 (K-17 ○ K-3, K-2)
    const k18 = catalog.getLesson("K", 18);
    expect(k18?.prerequisites.raw).toBe("K-17 ○ K-3, K-2");
    expect(k18?.prerequisites.paths).toEqual([
      [{ grade: "K", lessonNumber: 17, rawCode: "K-17" }],
      [
        { grade: "K", lessonNumber: 3, rawCode: "K-3" },
        { grade: "K", lessonNumber: 2, rawCode: "K-2" },
      ],
    ]);

    // 6. Check Enrichment flag on K-45 (asterisk on lesson title) and K-131..135 (Unit 12 Fraction Enrichment*)
    const k45 = catalog.getLesson("K", 45);
    expect(k45?.isEnrichment).toBe(true);
    const k131 = catalog.getLesson("K", 131);
    expect(k131?.isEnrichment).toBe(true);
    expect(catalog.grades.K.units[11].isEnrichment).toBe(true);
  });
});

describe("Primary Seam — Seeded Worksheet Generation & Determinism (Lesson K-1)", () => {
  it("produces identical Worksheets and Answer Keys for the same (grade, lessonNumber, seed, difficultyLevel) and varies exercises across different Seeds", () => {
    const runA1 = generateWorksheet({
      grade: "K",
      lessonNumber: 1,
      seed: "SEED-K1-A",
    });
    const runA2 = generateWorksheet({
      grade: "K",
      lessonNumber: 1,
      seed: "SEED-K1-A",
    });
    const runB = generateWorksheet({
      grade: "K",
      lessonNumber: 1,
      seed: "SEED-K1-B",
    });

    // Same seed produces deep-equal Worksheet and AnswerKey
    expect(runA1.worksheet).toEqual(runA2.worksheet);
    expect(runA1.answerKey).toEqual(runA2.answerKey);

    // Different seed produces different randomized exercises/items
    expect(runA1.worksheet.sections).not.toEqual(runB.worksheet.sections);

    // Three canonical sections: تهيئة (Warm-Up), تدرّب (Practice), تحدٍّ وتقييم (Challenge & Assessment)
    expect(runA1.worksheet.sections.map((s) => s.titleAr)).toEqual([
      "تهيئة",
      "تدرّب",
      "تحدٍّ وتقييم",
    ]);

    // Lesson K-1 exercises use ConnectMatch and Everyday Object SVG Bank visual models
    const allExercises = runA1.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(5);
    for (const ex of allExercises) {
      expect(ex.archetype).toBe("ConnectMatch");
      expect(ex.data.kind).toBe("ConnectMatch");
      if (ex.data.kind === "ConnectMatch") {
        expect(ex.data.rightItems.length).toBeGreaterThanOrEqual(3);
        expect(ex.data.leftItems.length).toBe(ex.data.rightItems.length);
        // Every right item maps to a unique matching left item in solutionMap
        for (const rightItem of ex.data.rightItems) {
          expect(rightItem.model.kind).toBe("everyday-object");
          const matchedLeftId = ex.data.solutionMap[rightItem.id];
          expect(matchedLeftId).toBeDefined();
          const leftItem = ex.data.leftItems.find(
            (li) => li.id === matchedLeftId
          );
          expect(leftItem).toBeDefined();
        }
      }
      // Every exercise has a Strategy Hint in the Answer Key
      expect(ex.strategyHintAr.length).toBeGreaterThan(10);
      expect(runA1.answerKey.strategyHintsByExerciseId[ex.id]).toBe(
        ex.strategyHintAr
      );
    }
  });
});

describe("Primary Seam — Difficulty Level Progression, Clamping & Prerequisite Warm-Up Resolution", () => {
  it("progresses Easy → Intermediate → Advanced in default scaffolded mode and clamps all sections when a single Difficulty Level is selected", () => {
    const scaffolded = generateWorksheet({
      grade: "K",
      lessonNumber: 1,
      seed: "DIFF-SEED-1",
    });

    expect(scaffolded.worksheet.sections.map((s) => s.difficultyLevel)).toEqual(
      ["Easy", "Intermediate", "Advanced"]
    );
    // In Easy: 3 pairs per ConnectMatch; Intermediate: 4 pairs; Advanced: 5 pairs
    const [warmUp, practice, challenge] = scaffolded.worksheet.sections;
    expect(
      warmUp.exercises.every(
        (e) =>
          e.difficultyLevel === "Easy" &&
          e.data.kind === "ConnectMatch" &&
          e.data.rightItems.length === 3
      )
    ).toBe(true);
    expect(
      practice.exercises.every(
        (e) =>
          e.difficultyLevel === "Intermediate" &&
          e.data.kind === "ConnectMatch" &&
          e.data.rightItems.length === 4
      )
    ).toBe(true);
    expect(
      challenge.exercises.every(
        (e) =>
          e.difficultyLevel === "Advanced" &&
          e.data.kind === "ConnectMatch" &&
          e.data.rightItems.length === 5
      )
    ).toBe(true);

    // Clamping to Easy, Intermediate, or Advanced
    for (const targetTier of ["Easy", "Intermediate", "Advanced"] as const) {
      const clamped = generateWorksheet({
        grade: "K",
        lessonNumber: 1,
        seed: "DIFF-SEED-1",
        difficultyLevel: targetTier,
      });

      expect(clamped.worksheet.sections.map((s) => s.difficultyLevel)).toEqual([
        targetTier,
        targetTier,
        targetTier,
      ]);
      for (const section of clamped.worksheet.sections) {
        for (const ex of section.exercises) {
          expect(ex.difficultyLevel).toBe(targetTier);
        }
      }
    }

    // Prerequisite Warm-Up resolution: K-2 declares prerequisite K-1 (which is authored)
    const k2Bundle = generateWorksheet({
      grade: "K",
      lessonNumber: 2,
      seed: "PREREQ-SEED",
    });
    expect(k2Bundle.warmUpSourceLessonId).toBe("K-1");
    expect(k2Bundle.worksheet.sections[0].sourceLessonId).toBe("K-1");
  });
});

describe("Primary Seam — A4 Worksheet, Mirrored Answer Key, Teacher Notes Rendering & Strict Eastern Arabic Numerals", () => {
  it("renders full-color A4 Worksheet, mirrored Answer Key with solved curves and Strategy Hints, and Teacher Notes with zero Western numerals in visible text", () => {
    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 1,
      seed: "RENDER-2026",
      viewMode: "worksheet",
    });

    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 1,
      seed: "RENDER-2026",
      viewMode: "answer-key",
    });

    const teacherNotesHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 1,
      seed: "RENDER-2026",
      viewMode: "teacher-notes",
    });

    // 1. Worksheet layout assertions: RTL, A4 header fields, 3 sections, seed footer
    expect(worksheetHtml).toContain('dir="rtl"');
    expect(worksheetHtml).toContain("الروضة");
    expect(worksheetHtml).toContain("الوحدة ١");
    expect(worksheetHtml).toContain("الدرس ١");
    expect(worksheetHtml).toContain("مطابقة الأشياء");
    expect(worksheetHtml).toContain("K.G.4");
    expect(worksheetHtml).toContain("الاسم:");
    expect(worksheetHtml).toContain("التاريخ:");
    expect(worksheetHtml).toContain("كيف كان أدائي؟");
    expect(worksheetHtml).toContain("🌟");
    expect(worksheetHtml).toContain("تهيئة");
    expect(worksheetHtml).toContain("🎨");
    expect(worksheetHtml).toContain("تدرّب");
    expect(worksheetHtml).toContain("🚀");
    expect(worksheetHtml).toContain("تحدٍّ وتقييم");
    expect(worksheetHtml).toContain("رمز الورقة: RENDER-٢٠٢٦");
    expect(worksheetHtml).toContain('data-visual-model="everyday-object"');
    // Student worksheet must NOT contain solved connection curves or teacher notes
    expect(worksheetHtml).not.toContain("data-solved-connection=");
    expect(worksheetHtml).not.toContain("ملاحظات المعلم");

    // 2. Answer Key assertions: mirrored visual overlay with solved curves and Strategy Hints
    expect(answerKeyHtml).toContain("مفتاح الإجابة");
    expect(answerKeyHtml).toContain("data-solved-connection=");
    expect(answerKeyHtml).toContain("تلميح الاستراتيجية");

    // 3. Teacher Notes assertions: pedagogical guidance shown in teacher-notes view
    expect(teacherNotesHtml).toContain("ملاحظات المعلم");
    expect(teacherNotesHtml).toContain("التقابل الأحادي");

    // 4. Strict Eastern Arabic Numerals Invariant across all 3 rendered surfaces
    expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
  });

  it("enforces Eastern Arabic Numerals across Teacher Notes and Prerequisite badges for lessons with compound (,) and alternative (○) prerequisites", () => {
    for (const [grade, lessonNumber] of [
      ["K", 7], // K-6, K-5
      ["K", 17], // K-12 ○ K-1
      ["K", 18], // K-17 ○ K-3, K-2
      ["2", 50], // 2-49 ○ 2-46, 2-44.2, 2-26
      ["5", 135],
    ] as const) {
      const notesHtml = renderWorksheetSurface({
        grade,
        lessonNumber,
        seed: "NUM-CHECK-99",
        viewMode: "teacher-notes",
      });
      expect(findWesternNumeralsInRenderedHtml(notesHtml)).toEqual([]);
    }
  });
});
