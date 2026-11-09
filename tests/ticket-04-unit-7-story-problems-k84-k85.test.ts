import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "@/lib/seed";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 04 (Unit 7) — Slice 1: SolveWordProblem ten-frame representation to 10", () => {
  it("SolveWordProblem story problems build right-to-left part-total Ten Frames with totals 6-10", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson84 = getCurriculumCatalog().getLesson("K", 84)!;
    const solveDef = getExerciseArchetype("SolveWordProblem");

    const ex = solveDef.generate({
      lesson: lesson84,
      sourceLessonId: "K-84",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("SWP-TENFRAME-ADD-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "add-to",
          problemStyle: "story",
          responseForm: "model-and-bond",
          representation: "ten-frame",
          totalRange: [6, 10],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const data = ex.data as any;
    expect(data.situation).toBe("add-to");
    expect(data.problemStyle).toBe("story");
    expect(data.responseForm).toBe("model-and-bond");
    expect(data.items).toHaveLength(2);
    for (const item of data.items) {
      expect(item.part1 + item.part2).toBe(item.total);
      expect(item.total).toBeGreaterThanOrEqual(6);
      expect(item.total).toBeLessThanOrEqual(10);
      // Story add-to scenes answer "كم أصبح الآن؟" or "كم في الكلّ؟"
      expect(["كم أصبح الآن؟", "كم في الكلّ؟"]).toContain(item.questionLabelAr);
      // Ten Frame: Part 1 (rightmost RTL) + Part 2, with Part outline and empty slots shown
      expect(item.representationModel?.kind).toBe("ten-frame");
      expect(item.representationModel?.count).toBe(item.part1);
      expect(item.representationModel?.secondaryCount).toBe(item.part2);
      expect(item.representationModel?.meta?.showPartOutline).toBe(true);
      expect(item.bondModel?.kind).toBe("number-bond");
      expect(item.bondModel?.meta?.missingPosition).toBe("total");
    }

    const htmlW = renderToStaticMarkup(
      solveDef.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      solveDef.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-visual-model="ten-frame"');
    expect(htmlW).toContain("كم");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("SolveWordProblem put-together ten-frame problems keep Part+Part=Total across many seeds", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson85 = getCurriculumCatalog().getLesson("K", 85)!;
    const solveDef = getExerciseArchetype("SolveWordProblem");

    const SEEDS = [
      "K85-TEN-A",
      "K85-TEN-B",
      "K85-TEN-C",
      "K85-TEN-D",
      "K85-TEN-E",
    ];
    for (const seed of SEEDS) {
      for (const difficultyLevel of [
        "Easy",
        "Intermediate",
        "Advanced",
      ] as const) {
        const ex = solveDef.generate({
          lesson: lesson85,
          sourceLessonId: "K-85",
          sectionId: difficultyLevel === "Easy" ? "warm-up" : "practice",
          exerciseIndex: 0,
          exerciseNumber: 1,
          difficultyLevel,
          rng: createSeededRandom(`${seed}-${difficultyLevel}`),
          spec: {
            archetype: "SolveWordProblem",
            params: {
              situation: "put-together",
              problemStyle: "story",
              responseForm: "equation",
              representation: "ten-frame",
              ...(difficultyLevel === "Advanced" ? { showModel: false } : {}),
              totalRange: [6, 10],
              minPart: 1,
              itemCount: 2,
            },
          },
        });

        const data = ex.data as any;
        for (const item of data.items) {
          expect(item.part1 + item.part2).toBe(item.total);
          expect(item.total).toBeGreaterThanOrEqual(6);
          expect(item.total).toBeLessThanOrEqual(10);
          expect(item.questionLabelAr).toBe("كم في الكلّ؟");
          if (item.representationModel) {
            expect(item.representationModel.kind).toBe("ten-frame");
            expect(
              item.representationModel.count +
                item.representationModel.secondaryCount
            ).toBe(item.total);
          }
          expect(item.equationModel?.kind).toBe("equation-strip");
        }
      }
    }
  });
});

describe("Ticket 04 (Unit 7) — Slice 2: WORD PROBLEM MATCH A & B (ConnectMatch model-to-word-problem to 10)", () => {
  it("WORD PROBLEM MATCH A keeps every diagram missing its total, with solved total slots on the problem card", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson84 = getCurriculumCatalog().getLesson("K", 84)!;
    const matchDef = getExerciseArchetype("ConnectMatch");

    const ex = matchDef.generate({
      lesson: lesson84,
      sourceLessonId: "K-84",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Easy",
      rng: createSeededRandom("WPM-A-EASY-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "model-to-word-problem",
          situation: "add-to",
          problemStyle: "story",
          showProblemSlot: true,
          totalRange: [6, 8],
          minPart: 1,
          pairCount: 2,
        },
      },
    });

    const data = ex.data as any;
    expect(data.kind).toBe("ConnectMatch");
    for (const item of data.rightItems) {
      expect(item.model.kind).toBe("number-bond");
      expect(item.model.meta.missingPosition).toBe("total");
    }
    for (const item of data.leftItems) {
      expect(item.model.meta.isWordProblemEndpoint).toBe(true);
      expect(item.model.meta.situation).toBe("add-to");
    }
    const htmlA = renderToStaticMarkup(
      matchDef.render({ exercise: ex, mode: "answer-key" })
    );
    // One solved total slot per pair on the word-problem cards
    expect(
      (htmlA.match(/data-solved-match-problem-total="[^"]+"/g) ?? []).length
    ).toBe(2);
    expect(htmlA).not.toContain('data-solved-match-problem-part2="');
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("WORD PROBLEM MATCH B cycles missing totals and missing parts per row on put-together stories", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson85 = getCurriculumCatalog().getLesson("K", 85)!;
    const matchDef = getExerciseArchetype("ConnectMatch");

    const ex = matchDef.generate({
      lesson: lesson85,
      sourceLessonId: "K-85",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("WPM-B-INT-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "model-to-word-problem",
          situation: "put-together",
          problemStyle: "story",
          showProblemSlot: true,
          wordProblemMissingPositions: ["total", "part2"],
          totalRange: [6, 10],
          minPart: 1,
          pairCount: 3,
        },
      },
    });

    const data = ex.data as any;
    // RTL row cycle: total, part2, total
    expect(
      data.rightItems.map((item: any) => item.model.meta.missingPosition)
    ).toEqual(["total", "part2", "total"]);

    const htmlA = renderToStaticMarkup(
      matchDef.render({ exercise: ex, mode: "answer-key" })
    );
    const totalSlotCount = (
      htmlA.match(/data-solved-match-problem-total="[^"]+"/g) ?? []
    ).length;
    const part2SlotCount = (
      htmlA.match(/data-solved-match-problem-part2="[^"]+"/g) ?? []
    ).length;
    expect(totalSlotCount).toBe(2);
    expect(part2SlotCount).toBe(1);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("defaults are unchanged: no wordProblemMissingPositions keeps all rows missing their total", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson52 = getCurriculumCatalog().getLesson("K", 52)!;
    const matchDef = getExerciseArchetype("ConnectMatch");

    const ex = matchDef.generate({
      lesson: lesson52,
      sourceLessonId: "K-52",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("WPM-DEFAULT-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "model-to-word-problem",
          situation: "put-together",
          problemStyle: "learning",
          showProblemSlot: false,
          totalRange: [2, 5],
          minPart: 1,
          pairCount: 3,
        },
      },
    });

    const data = ex.data as any;
    expect(data.rightItems.length).toBe(3);
    for (const item of data.rightItems) {
      expect(item.model.meta.missingPosition).toBe("total");
    }
  });
});

describe("Ticket 04 (Unit 7) — Slice 3: Lessons K-84 and K-85 registration and render", () => {
  const lessonExpectations: Record<
    number,
    { situation: string; matchSituation: string }
  > = {
    84: { situation: "add-to", matchSituation: "add-to" },
    85: { situation: "put-together", matchSituation: "put-together" },
  };

  // §5.3: Warm-Up draws from the lesson's primary authored Prerequisite
  const expectedWarmUpSource: Record<number, string> = {
    84: "K-50",
    85: "K-52",
  };

  for (const lessonNum of [84, 85]) {
    it(`generates and renders Lesson K-${lessonNum} across worksheet and answer-key without Western numerals`, () => {
      const seed = `TEST-K${lessonNum}`;
      const generated = generateWorksheet({
        grade: "K",
        lessonNumber: lessonNum,
        seed,
        difficultyLevel: "scaffolded",
      });

      expect(generated.worksheet.sections).toHaveLength(3);
      expect(generated.answerKey.sections).toHaveLength(3);
      // Every answer key exercise carries a Strategy Hint (§8.3)
      for (const section of generated.worksheet.sections) {
        for (const ex of section.exercises) {
          expect(
            generated.answerKey.strategyHintsByExerciseId[ex.id]
          ).toBeTruthy();
        }
      }

      const expectation = lessonExpectations[lessonNum];

      // Section anatomy: Warm-Up 1-2, Practice 2, Challenge 2 (§5.2)
      expect(generated.worksheet.sections[0].exercises.length).toBe(1);
      expect(generated.worksheet.sections[1].exercises.length).toBe(2);
      expect(generated.worksheet.sections[2].exercises.length).toBe(2);

      // Practice: story + ten-frame part-total model, then story-and-slot fill
      // (Easy-tier practice[1] mirrors the K-49/K-52 convention; §6.2 Easy row)
      const practice1 = generated.worksheet.sections[1].exercises[0];
      const practice1Data = practice1.data as Record<string, any>;
      expect(practice1.archetype).toBe("SolveWordProblem");
      expect(practice1Data.situation).toBe(expectation.situation);
      expect(practice1Data.problemStyle).toBe("story");
      expect(practice1Data.responseForm).toBe("model-and-bond");
      for (const item of practice1Data.items) {
        expect(item.representationModel?.kind).toBe("ten-frame");
        expect(item.total).toBeGreaterThanOrEqual(6);
        expect(item.total).toBeLessThanOrEqual(10);
      }
      const practice2 = generated.worksheet.sections[1].exercises[1];
      expect(practice2.archetype).toBe("SolveWordProblem");
      expect((practice2.data as Record<string, any>).responseForm).toBe(
        "equation"
      );

      // §6.2 Easy tier: fully shown model + trace support — practice[1] is the
      // K-49/K-52 Easy mirror (story-and-slot, trace) rather than an equation.
      const easy = generateWorksheet({
        grade: "K",
        lessonNumber: lessonNum,
        seed,
        difficultyLevel: "Easy",
      });
      expect(
        easy.worksheet.sections.map((section) => section.exercises.length)
      ).toEqual([1, 2, 2]);
      const easyPractice2 = easy.worksheet.sections[1].exercises[1];
      expect((easyPractice2.data as Record<string, any>).responseForm).toBe(
        "story-and-slot"
      );
      const easyPractice2Items = (easyPractice2.data as Record<string, any>)
        .items;
      expect(easyPractice2Items).toHaveLength(1);
      for (const item of easyPractice2Items) {
        expect(item.representationModel?.kind).toBe("ten-frame");
        expect(
          item.representationModel?.count +
            item.representationModel?.secondaryCount
        ).toBe(item.total);
      }
      for (const section of easy.worksheet.sections) {
        for (const ex of section.exercises) {
          expect(easy.answerKey.strategyHintsByExerciseId[ex.id]).toBeTruthy();
        }
      }

      // Challenge: WORD PROBLEM MATCH (Brain Builder) + Problem of the Day
      const challenge = generated.worksheet.sections[2].exercises;
      const brainBuilder = challenge.find(
        (ex) => ex.archetype === "ConnectMatch"
      );
      expect(brainBuilder).toBeTruthy();
      const brainBuilderData = brainBuilder!.data as Record<string, any>;
      for (const item of brainBuilderData.leftItems) {
        expect(item.model.meta.isWordProblemEndpoint).toBe(true);
        expect(item.model.meta.situation).toBe(expectation.matchSituation);
      }
      const problemOfDay = challenge.find(
        (ex) => ex.archetype === "SolveWordProblem"
      );
      expect(problemOfDay).toBeTruthy();
      const problemOfDayData = problemOfDay!.data as Record<string, any>;
      expect(problemOfDayData.responseForm).toBe("cloze-from-model");
      const easyMatch = easy.worksheet.sections[2].exercises.find(
        (ex) => ex.archetype === "ConnectMatch"
      );
      expect((easyMatch!.data as Record<string, any>).rightItems).toHaveLength(
        1
      );

      // Warm-up source follows the authored prerequisite chain (§5.3)
      expect(generated.warmUpSourceLessonId).toBe(
        expectedWarmUpSource[lessonNum]
      );

      for (const viewMode of ["worksheet", "answer-key"] as const) {
        const html = renderWorksheetSurface({
          grade: "K",
          lessonNumber: lessonNum,
          seed,
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
