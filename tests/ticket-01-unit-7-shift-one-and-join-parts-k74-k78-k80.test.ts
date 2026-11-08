import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "@/lib/seed";
import { getExerciseArchetype } from "@/archetypes/registry";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { generateWorksheet } from "@/engine/worksheet-engine";
import "@/registry/bootstrap";

describe("Ticket 01 (Unit 7) — Slice 1: ShiftOneDecompose totals 6-10 and turnaround-pairs", () => {
  it("ShiftOneDecompose generates all N + 1 bonds in exact (N - i, i) RTL order for totals 6-10", () => {
    const catalog = getCurriculumCatalog();
    const lesson74 = catalog.getLesson("K", 74)!;
    const shiftDef = getExerciseArchetype("ShiftOneDecompose");

    for (const total of [6, 7, 8, 9, 10]) {
      const ex = shiftDef.generate({
        lesson: lesson74,
        sourceLessonId: "K-74",
        sectionId: "practice",
        exerciseIndex: 0,
        exerciseNumber: 1,
        difficultyLevel: "Intermediate",
        rng: createSeededRandom(`SHIFT-TOTAL-${total}`),
        spec: {
          archetype: "ShiftOneDecompose",
          params: {
            mode: "all-combinations",
            targetTotal: total,
            action: "write",
            showFiveFrames: false,
          },
        },
      });

      const data = ex.data as any;
      expect(data.mode).toBe("all-combinations");
      expect(data.targetTotal).toBe(total);
      expect(data.steps).toHaveLength(total + 1);

      for (let i = 0; i <= total; i++) {
        expect(data.steps[i].part1).toBe(total - i);
        expect(data.steps[i].part2).toBe(i);
        expect(data.steps[i].total).toBe(total);
      }
    }
  });

  it("ShiftOneDecompose supports turnaround-pairs mode with valid swapped Number Bonds", () => {
    const catalog = getCurriculumCatalog();
    const lesson74 = catalog.getLesson("K", 74)!;
    const shiftDef = getExerciseArchetype("ShiftOneDecompose");

    const ex = shiftDef.generate({
      lesson: lesson74,
      sourceLessonId: "K-74",
      sectionId: "practice",
      exerciseIndex: 1,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("SHIFT-TURNAROUND-1"),
      spec: {
        archetype: "ShiftOneDecompose",
        params: {
          mode: "turnaround-pairs",
          totalRange: [7, 10],
          action: "write",
        },
      },
    });

    const data = ex.data as any;
    expect(data.mode).toBe("turnaround-pairs");
    expect(data.turnaroundPairs.length).toBeGreaterThanOrEqual(1);

    for (const pair of data.turnaroundPairs) {
      expect(pair.part1 + pair.part2).toBe(pair.total);
      expect(pair.part1).not.toBe(pair.part2);
    }

    const htmlW = renderToStaticMarkup(
      shiftDef.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      shiftDef.render({ exercise: ex, mode: "answer-key" })
    );

    expect(htmlW).toContain('data-shift-mode="turnaround-pairs"');
    expect(htmlW).toContain("الزوج المعكوس");
    expect(htmlA).toContain('data-shift-mode="turnaround-pairs"');
  });

  it("ShiftOneDecompose supports give-away mode with pencils for K-74", () => {
    const catalog = getCurriculumCatalog();
    const lesson74 = catalog.getLesson("K", 74)!;
    const shiftDef = getExerciseArchetype("ShiftOneDecompose");

    const ex = shiftDef.generate({
      lesson: lesson74,
      sourceLessonId: "K-74",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 3,
      difficultyLevel: "Easy",
      rng: createSeededRandom("SHIFT-PENCILS-1"),
      spec: {
        archetype: "ShiftOneDecompose",
        params: {
          mode: "give-away",
          totalRange: [6, 8],
          objectId: "pencil",
        },
      },
    });

    const data = ex.data as any;
    expect(data.mode).toBe("give-away");
    expect(data.giveAwayRows).toHaveLength(2);
    expect(data.giveAwayRows[0].applesModel.id).toBe("pencil");

    const htmlW = renderToStaticMarkup(
      shiftDef.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      shiftDef.render({ exercise: ex, mode: "answer-key" })
    );

    // Renders pencil SVG and not cherry cupcake
    expect(htmlW).toContain('aria-label="قلم رصاص"');
    expect(htmlW).not.toContain("كعكة الكرز");
    expect(htmlA).toContain('aria-label="قلم رصاص"');
    expect(htmlA).not.toContain("كعكة الكرز");

    // Student worksheet has clean pencils without pre-drawn cross lines
    expect(htmlW).not.toContain('data-crossed-out-object="true"');

    // Answer key has crossed-out pencils showing the solved state
    expect(htmlA).toContain('data-crossed-out-object="true"');
  });
});

describe("Ticket 01 (Unit 7) — Slice 2: JoinParts & TakeAway Ten-Frame Support", () => {
  it("JoinParts generates ten-frame and ten-frame-and-digit representations up to total 10", () => {
    const catalog = getCurriculumCatalog();
    const lesson78 = catalog.getLesson("K", 78)!;
    const joinDef = getExerciseArchetype("JoinParts");

    const exTenFrame = joinDef.generate({
      lesson: lesson78,
      sourceLessonId: "K-78",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("JOIN-TEN-FRAME-1"),
      spec: {
        archetype: "JoinParts",
        params: {
          representation: "ten-frame",
          responseForm: "number-bond",
          totalRange: [6, 10],
          itemCount: 2,
        },
      },
    });

    const dataTF = exTenFrame.data as any;
    expect(dataTF.representation).toBe("ten-frame");
    expect(dataTF.items).toHaveLength(2);
    expect(dataTF.items[0].representationModel.kind).toBe("ten-frame");

    const htmlTFW = renderToStaticMarkup(
      joinDef.render({ exercise: exTenFrame, mode: "worksheet" })
    );
    expect(htmlTFW).toContain('data-visual-model="ten-frame"');
  });

  it("JoinParts supports ten-frame action draw-counters", () => {
    const catalog = getCurriculumCatalog();
    const lesson78 = catalog.getLesson("K", 78)!;
    const joinDef = getExerciseArchetype("JoinParts");

    const exDraw = joinDef.generate({
      lesson: lesson78,
      sourceLessonId: "K-78",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("JOIN-DRAW-1"),
      spec: {
        archetype: "JoinParts",
        params: {
          representation: "ten-frame",
          responseForm: "number-bond",
          action: "draw-counters",
          totalRange: [6, 10],
          itemCount: 2,
        },
      },
    });

    const dataDraw = exDraw.data as any;
    expect(dataDraw.action).toBe("draw-counters");
    expect(dataDraw.items[0].representationModel.meta.ghostTargetCount).toBe(
      dataDraw.items[0].part2
    );
  });
});

describe("Ticket 01 (Unit 7) — Slice 3: ConnectMatch ten-frame-to-bond and ten-frame-to-equation", () => {
  it("ConnectMatch generates ten-frame-to-bond and ten-frame-to-equation pairs", () => {
    const catalog = getCurriculumCatalog();
    const lesson78 = catalog.getLesson("K", 78)!;
    const matchDef = getExerciseArchetype("ConnectMatch");

    // 1. ten-frame-to-bond
    const exBond = matchDef.generate({
      lesson: lesson78,
      sourceLessonId: "K-78",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCH-TF-BOND-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "ten-frame-to-bond",
          pairCount: 2,
          totalRange: [6, 10],
        },
      },
    });

    const dataBond = exBond.data as any;
    expect(dataBond.pairs).toHaveLength(2);
    expect(dataBond.rightItems[0].model.kind).toBe("ten-frame");
    expect(dataBond.leftItems[0].model.kind).toBe("number-bond");

    const htmlBondW = renderToStaticMarkup(
      matchDef.render({ exercise: exBond, mode: "worksheet" })
    );
    expect(htmlBondW).toContain('data-visual-model="ten-frame"');
    expect(htmlBondW).toContain('data-visual-model="number-bond"');

    // 2. ten-frame-to-equation
    const exEq = matchDef.generate({
      lesson: lesson78,
      sourceLessonId: "K-80",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCH-TF-EQ-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "ten-frame-to-equation",
          pairCount: 2,
          totalRange: [6, 10],
        },
      },
    });

    const dataEq = exEq.data as any;
    expect(dataEq.pairs).toHaveLength(2);
    expect(dataEq.rightItems[0].model.kind).toBe("ten-frame");
    expect(dataEq.leftItems[0].model.kind).toBe("equation-strip");

    const htmlEqW = renderToStaticMarkup(
      matchDef.render({ exercise: exEq, mode: "worksheet" })
    );
    expect(htmlEqW).toContain('data-visual-model="ten-frame"');
    expect(htmlEqW).toContain('data-visual-model="equation-strip"');
  });
});

describe("Ticket 01 (Unit 7) — Slice 4: Lessons K-74, K-78, K-79, and K-80 registration and render", () => {
  const authoredLessons = [74, 78, 79, 80];

  for (const lessonNum of authoredLessons) {
    it(`generates and renders Lesson K-${lessonNum} across worksheet and answer-key without Western numerals`, () => {
      const generated = generateWorksheet({
        grade: "K",
        lessonNumber: lessonNum,
        seed: `TEST-K${lessonNum}`,
        difficultyLevel: "scaffolded",
      });

      expect(generated.worksheet.sections).toHaveLength(3);
      expect(generated.answerKey.sections).toHaveLength(3);

      for (const viewMode of ["worksheet", "answer-key"] as const) {
        const html = renderWorksheetSurface({
          grade: "K",
          lessonNumber: lessonNum,
          seed: `TEST-K${lessonNum}`,
          difficultyLevel: "scaffolded",
          viewMode,
        });

        const western = findWesternNumeralsInRenderedHtml(html);
        expect(
          western,
          `Western numerals found in K-${lessonNum} (${viewMode})`
        ).toEqual([]);
      }
    });
  }
});
