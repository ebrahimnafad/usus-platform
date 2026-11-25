import { describe, expect, it } from "vitest";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 02 — Lessons K-2, K-3, K-4: 2D Shapes, 3D Solids & Localized Coins with ConnectMatch", () => {
  it("generates authored 3-section Worksheets and mirrored Answer Keys for K-2 (Match Shapes), K-3 (Match Solids), and K-4 (Match Coins) with Prerequisite Warm-Ups and full-color SVG Visual Models", () => {
    const k2 = generateWorksheet({
      grade: "K",
      lessonNumber: 2,
      seed: "TICKET02-K2",
    });
    const k3 = generateWorksheet({
      grade: "K",
      lessonNumber: 3,
      seed: "TICKET02-K3",
    });
    const k4 = generateWorksheet({
      grade: "K",
      lessonNumber: 4,
      seed: "TICKET02-K4",
    });

    // All three lessons have authored blueprints
    expect(k2.isAuthoredBlueprint).toBe(true);
    expect(k3.isAuthoredBlueprint).toBe(true);
    expect(k4.isAuthoredBlueprint).toBe(true);

    // Prerequisite Warm-Up resolution:
    // K-2 -> K-1, K-3 -> K-2, K-4 -> K-1
    expect(k2.warmUpSourceLessonId).toBe("K-1");
    expect(k2.worksheet.sections[0].sourceLessonId).toBe("K-1");

    expect(k3.warmUpSourceLessonId).toBe("K-2");
    expect(k3.worksheet.sections[0].sourceLessonId).toBe("K-2");

    expect(k4.warmUpSourceLessonId).toBe("K-1");
    expect(k4.worksheet.sections[0].sourceLessonId).toBe("K-1");

    // K-2 Practice & Challenge use "shape-2d" visual models
    const k2CoreModels = k2.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises)
      .flatMap((e) => e.visualModels);
    expect(k2CoreModels.some((m) => m.kind === "shape-2d")).toBe(true);

    // K-3 Practice & Challenge use "solid-3d" and "real-world-solid" visual models
    const k3CoreModels = k3.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises)
      .flatMap((e) => e.visualModels);
    expect(k3CoreModels.some((m) => m.kind === "solid-3d")).toBe(true);
    expect(k3CoreModels.some((m) => m.kind === "real-world-solid")).toBe(true);

    // K-4 Practice & Challenge use "coin" visual models with Egyptian denominations in {25, 50, 100, 500, 1000} (ADR-0016)
    const k4CoreModels = k4.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises)
      .flatMap((e) => e.visualModels);
    expect(k4CoreModels.some((m) => m.kind === "coin")).toBe(true);
    for (const model of k4CoreModels.filter((m) => m.kind === "coin")) {
      expect([25, 50, 100, 500, 1000]).toContain(model.denomination);
    }

    // Rendered HTML/SVG surface checks for K-2, K-3, K-4
    for (const lessonNumber of [2, 3, 4] as const) {
      const worksheetHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: "SURFACE-K234",
        viewMode: "worksheet",
      });
      const answerKeyHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: "SURFACE-K234",
        viewMode: "answer-key",
      });
      const teacherNotesHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: "SURFACE-K234",
        viewMode: "teacher-notes",
      });

      expect(worksheetHtml).not.toContain("data-solved-connection=");
      expect(answerKeyHtml).toContain("data-solved-connection=");
      expect(answerKeyHtml).toContain('data-strategy-hint="true"');
      expect(teacherNotesHtml).toContain("ملاحظات المعلم");

      // Strict Eastern Arabic Numerals invariant
      expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
    }

    // Verify custom SVG data attributes render for shape-2d, solid-3d, real-world-solid, and coin
    const k2Html = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 2,
      seed: "SVG-CHECK",
      viewMode: "worksheet",
    });
    expect(k2Html).toContain('data-visual-model="shape-2d"');

    const k3Html = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 3,
      seed: "SVG-CHECK",
      viewMode: "worksheet",
    });
    expect(k3Html).toContain('data-visual-model="solid-3d"');
    expect(k3Html).toContain('data-visual-model="real-world-solid"');

    const k4Html = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 4,
      seed: "SVG-CHECK",
      viewMode: "worksheet",
    });
    expect(k4Html).toContain('data-visual-model="coin"');
  });
});

describe("Ticket 02 — Lessons K-5, K-6, K-7, K-8: ClassifyAndCount (صنّف وحوّط وعدّ), Non-Defining Attributes & Part-Whole Reasoning", () => {
  it("generates ClassifyAndCount exercises for K-5 (2D Shapes), K-6 (3D Solids), K-7 (Varying Size), and K-8 (Varying Orientation) with compound Prerequisite Warm-Up resolution", () => {
    const k5 = generateWorksheet({
      grade: "K",
      lessonNumber: 5,
      seed: "TICKET02-K5",
    });
    const k6 = generateWorksheet({
      grade: "K",
      lessonNumber: 6,
      seed: "TICKET02-K6",
    });
    const k7 = generateWorksheet({
      grade: "K",
      lessonNumber: 7,
      seed: "TICKET02-K7",
    });
    const k8 = generateWorksheet({
      grade: "K",
      lessonNumber: 8,
      seed: "TICKET02-K8",
    });

    // All four lessons have authored blueprints
    expect(k5.isAuthoredBlueprint).toBe(true);
    expect(k6.isAuthoredBlueprint).toBe(true);
    expect(k7.isAuthoredBlueprint).toBe(true);
    expect(k8.isAuthoredBlueprint).toBe(true);

    // Co-presented badge on K-5
    expect(k5.lesson.isCoPresented).toBe(true);

    // Prerequisite Warm-Up resolution:
    // K-5 -> K-2
    // K-6 -> K-3
    // K-7 (Prerequisites: K-6, K-5) -> resolves to K-6 (first in compound prerequisite path)
    // K-8 -> K-7
    expect(k5.warmUpSourceLessonId).toBe("K-2");
    expect(k5.worksheet.sections[0].sourceLessonId).toBe("K-2");

    expect(k6.warmUpSourceLessonId).toBe("K-3");
    expect(k6.worksheet.sections[0].sourceLessonId).toBe("K-3");

    expect(k7.warmUpSourceLessonId).toBe("K-6");
    expect(k7.worksheet.sections[0].sourceLessonId).toBe("K-6");

    expect(k8.warmUpSourceLessonId).toBe("K-7");
    expect(k8.worksheet.sections[0].sourceLessonId).toBe("K-7");

    // Verify Practice & Challenge exercises use ClassifyAndCount and maintain Part-Whole invariants
    for (const bundle of [k5, k6, k7, k8]) {
      const coreExercises = bundle.worksheet.sections
        .slice(1)
        .flatMap((s) => s.exercises);
      expect(coreExercises.length).toBeGreaterThanOrEqual(3);

      for (const ex of coreExercises) {
        expect(ex.archetype).toBe("ClassifyAndCount");
        expect(ex.data.kind).toBe("ClassifyAndCount");

        if (ex.data.kind === "ClassifyAndCount") {
          const groups = ex.data.groups as Array<{
            groupId: string;
            count: number;
            labelAr: string;
          }>;
          const items = ex.data.items as Array<{
            id: string;
            groupId: string;
            isTargetGroup: boolean;
            model: { kind: string; size?: string; rotationDeg?: number };
          }>;
          const totalCount = ex.data.totalCount as number;

          expect(groups.length).toBeGreaterThanOrEqual(2);
          expect(items.length).toBe(totalCount);

          const sumOfParts = groups.reduce((acc, g) => acc + g.count, 0);
          expect(sumOfParts).toBe(totalCount);

          // Total is strictly greater than each individual part
          for (const group of groups) {
            expect(group.count).toBeGreaterThanOrEqual(1);
            expect(totalCount).toBeGreaterThan(group.count);
          }
        }
      }
    }

    // K-7 specifically varies item sizes (small, medium, large) as a non-defining attribute
    const k7Models = k7.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises)
      .flatMap((e) => e.visualModels);
    const k7Sizes = new Set(k7Models.map((m) => m.size));
    expect(k7Sizes.has("small")).toBe(true);
    expect(k7Sizes.has("large")).toBe(true);

    // K-8 specifically varies item rotation angles (rotationDeg !== 0) as a non-defining attribute
    const k8Models = k8.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises)
      .flatMap((e) => e.visualModels);
    expect(k8Models.some((m) => (m.rotationDeg ?? 0) !== 0)).toBe(true);
  });

  it("renders mirrored ClassifyAndCount Answer Keys, enforces Seed determinism & Difficulty clamping, and guarantees zero Western numerals across Lessons K-2 through K-8", () => {
    for (const lessonNumber of [2, 3, 4, 5, 6, 7, 8] as const) {
      // 1. Seed Determinism
      const firstRun = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `DET-K${lessonNumber}-A`,
      });
      const secondRun = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `DET-K${lessonNumber}-A`,
      });
      const differentSeedRun = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `DET-K${lessonNumber}-B`,
      });

      expect(firstRun.worksheet).toEqual(secondRun.worksheet);
      expect(firstRun.answerKey).toEqual(secondRun.answerKey);
      expect(firstRun.worksheet.sections).not.toEqual(
        differentSeedRun.worksheet.sections
      );

      // 2. Scaffolded progression vs. Single-tier Clamping
      expect(firstRun.worksheet.sections.map((s) => s.difficultyLevel)).toEqual(
        ["Easy", "Intermediate", "Advanced"]
      );

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
      }

      // 3. Render Surface & Strict Eastern Arabic Numerals Invariant
      const worksheetHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `RENDER-K${lessonNumber}`,
        viewMode: "worksheet",
      });
      const answerKeyHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `RENDER-K${lessonNumber}`,
        viewMode: "answer-key",
      });
      const teacherNotesHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `RENDER-K${lessonNumber}`,
        viewMode: "teacher-notes",
      });

      if (lessonNumber >= 5) {
        expect(worksheetHtml).toContain('data-archetype="ClassifyAndCount"');
        expect(worksheetHtml).not.toContain("data-solved-sorted-group=");
        expect(worksheetHtml).not.toContain("data-solved-part-count=");

        expect(answerKeyHtml).toContain("data-solved-sorted-group=");
        expect(answerKeyHtml).toContain("data-solved-part-count=");
        expect(answerKeyHtml).toContain("data-solved-total-count=");
      }

      expect(answerKeyHtml).toContain('data-strategy-hint="true"');
      expect(teacherNotesHtml).toContain("ملاحظات المعلم");

      expect(findWesternNumeralsInRenderedHtml(worksheetHtml)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(teacherNotesHtml)).toEqual([]);
    }
  });
});
