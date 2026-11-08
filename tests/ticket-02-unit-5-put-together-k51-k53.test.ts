import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "@/lib/seed";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 02 (Unit 5) — Slice 1: SolveWordProblem & ConnectMatch (situation: 'put-together', MATCHING C & D)", () => {
  it("supports situation: 'put-together' in SolveWordProblem for learning (K-51), story (K-52), and cloze-from-model with addition EquationStrip", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson51 = getCurriculumCatalog().getLesson("K", 51)!;
    const lesson52 = getCurriculumCatalog().getLesson("K", 52)!;
    const solveDef = getExerciseArchetype("SolveWordProblem");

    // 1. K-51 Put-Together Learning Problem: model-and-bond (two cube Parts joined together + Number Bond + كم في الكلّ؟)
    const exLearnBond = solveDef.generate({
      lesson: lesson51,
      sourceLessonId: "K-51",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Easy",
      rng: createSeededRandom("SWP-PUT-LEARN-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "put-together",
          problemStyle: "learning",
          responseForm: "model-and-bond",
          representation: "snap-cubes",
          totalRange: [2, 4],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const dataLearnBond = exLearnBond.data as any;
    expect(dataLearnBond.situation).toBe("put-together");
    expect(dataLearnBond.problemStyle).toBe("learning");
    expect(dataLearnBond.responseForm).toBe("model-and-bond");
    expect(dataLearnBond.items).toHaveLength(2);
    for (const item of dataLearnBond.items) {
      expect(item.situation).toBe("put-together");
      expect(item.part1 + item.part2).toBe(item.total);
      expect(item.problemTextAr).toContain(item.part1Ar);
      expect(item.problemTextAr).toContain(item.part2Ar);
      expect(item.questionLabelAr).toBe("كم في الكلّ؟");
      // Put-together learning problems describe two Parts joined together rather than "أضفنا إليها"
      expect(item.problemTextAr).not.toContain("أضفنا إليها");
      expect(item.representationModel?.kind).toBe("snap-cubes");
      expect(item.bondModel?.kind).toBe("number-bond");
    }

    const htmlLearnW = renderToStaticMarkup(
      solveDef.render({ exercise: exLearnBond, mode: "worksheet" })
    );
    const htmlLearnA = renderToStaticMarkup(
      solveDef.render({ exercise: exLearnBond, mode: "answer-key" })
    );
    expect(htmlLearnW).toContain('data-situation="put-together"');
    expect(htmlLearnW).toContain("كم في الكلّ؟");
    expect(findWesternNumeralsInRenderedHtml(htmlLearnW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlLearnA)).toEqual([]);

    // 2. K-52 Put-Together Story Problem: story-and-slot (joining two Parts, answers كم في الكلّ؟)
    const exStorySlot = solveDef.generate({
      lesson: lesson52,
      sourceLessonId: "K-52",
      sectionId: "practice",
      exerciseIndex: 1,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("SWP-PUT-STORY-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "put-together",
          problemStyle: "story",
          responseForm: "story-and-slot",
          showModel: false,
          totalRange: [2, 5],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const dataStorySlot = exStorySlot.data as any;
    expect(dataStorySlot.situation).toBe("put-together");
    expect(dataStorySlot.problemStyle).toBe("story");
    for (const item of dataStorySlot.items) {
      expect(item.part1 + item.part2).toBe(item.total);
      expect(item.problemTextAr).toContain(item.part1Ar);
      expect(item.problemTextAr).toContain(item.part2Ar);
      expect(item.questionLabelAr).toBe("كم في الكلّ؟");
      expect(item.problemTextAr).not.toContain("كم أصبح");
    }

    // 3. K-51 & K-52 Problem of the Day: cloze-from-model defaults to clozeIncludeEquation = true for put-together
    const exCloze = solveDef.generate({
      lesson: lesson52,
      sourceLessonId: "K-52",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("SWP-PUT-CLOZE-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "put-together",
          problemStyle: "story",
          responseForm: "cloze-from-model",
          representation: "everyday-object",
          totalRange: [3, 5],
          minPart: 1,
          itemCount: 1,
        },
      },
    });

    const dataCloze = exCloze.data as any;
    expect(dataCloze.clozeIncludeEquation).toBe(true);
    const clozeItem = dataCloze.items[0];
    expect(clozeItem.equationModel?.kind).toBe("equation-strip");

    const htmlClozeW = renderToStaticMarkup(
      solveDef.render({ exercise: exCloze, mode: "worksheet" })
    );
    const htmlClozeA = renderToStaticMarkup(
      solveDef.render({ exercise: exCloze, mode: "answer-key" })
    );
    expect(htmlClozeW).toContain('data-visual-model="equation-strip"');
    expect(htmlClozeA).toContain(
      `data-solved-cloze-part1="${clozeItem.part1Ar}"`
    );
    expect(htmlClozeA).toContain(
      `data-solved-cloze-part2="${clozeItem.part2Ar}"`
    );
    expect(findWesternNumeralsInRenderedHtml(htmlClozeW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlClozeA)).toEqual([]);
  });

  it("supports ConnectMatch model-to-word-problem for MATCHING C (K-51 Put-Together Learning Problem) and MATCHING D (K-52 Put-Together Story Problem)", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson51 = getCurriculumCatalog().getLesson("K", 51)!;
    const lesson52 = getCurriculumCatalog().getLesson("K", 52)!;
    const matchDef = getExerciseArchetype("ConnectMatch");

    // 1. MATCHING C (K-51): Number Bond (missing Total) -> Put-Together Learning Problem (no slot on problem card)
    const exMatchC = matchDef.generate({
      lesson: lesson51,
      sourceLessonId: "K-51",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 3,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCH-WP-C"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "model-to-word-problem",
          situation: "put-together",
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

    const dataC = exMatchC.data as any;
    expect(dataC.rightItems).toHaveLength(2);
    expect(dataC.leftItems).toHaveLength(2);
    expect(new Set(Object.values(dataC.solutionMap)).size).toBe(2);

    for (const lItem of dataC.leftItems) {
      expect(lItem.model.meta.isWordProblemEndpoint).toBe(true);
      expect(lItem.model.meta.situation).toBe("put-together");
      expect(lItem.model.meta.showProblemSlot).toBe(false);
      expect(lItem.model.meta.problemTextAr).not.toContain("أضفنا إليها");
    }

    const htmlCW = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchC, mode: "worksheet" })
    );
    expect(htmlCW.match(/data-answer-slot="unknown"/g)).toHaveLength(2);

    // 2. MATCHING D (K-52): Number Bond (missing Total) -> Put-Together Story Problem (also carries missing Total slot)
    const exMatchD = matchDef.generate({
      lesson: lesson52,
      sourceLessonId: "K-52",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 3,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCH-WP-D"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "model-to-word-problem",
          situation: "put-together",
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

    const dataD = exMatchD.data as any;
    expect(dataD.rightItems).toHaveLength(2);
    expect(dataD.leftItems).toHaveLength(2);
    for (const lItem of dataD.leftItems) {
      expect(lItem.model.meta.situation).toBe("put-together");
      expect(lItem.model.meta.showProblemSlot).toBe(true);
      expect(lItem.model.meta.questionLabelAr).toBe("كم في الكلّ؟");
    }

    const htmlDW = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchD, mode: "worksheet" })
    );
    expect(htmlDW.match(/data-answer-slot="unknown"/g)).toHaveLength(4);
  });
});

describe("Ticket 02 (Unit 5) — Slice 2: Lessons K-51, K-52, and K-53 Blueprints, Localization, and Domain Invariants", () => {
  it("generates Lesson K-51 (Put-Together Learning Problems, Warm-Up -> K-49, Practice Type 1 & Type 2, Challenge MATCHING C + PoD cloze-from-model with equation), Lesson K-52 (Put-Together Story Problems, Warm-Up -> K-51, Practice Type 1 & Type 2, Challenge MATCHING D + PoD cloze-from-model with equation), and Lesson K-53 (Put-Together Five Frames, Warm-Up -> K-52, Practice JoinParts five-frame, Challenge ClassifyAndCount HOW MANY? + PoD JoinParts solid-shapes equation)", () => {
    const k51 = generateWorksheet({
      grade: "K",
      lessonNumber: 51,
      seed: "UNIT5-K51-A",
    });
    const k52 = generateWorksheet({
      grade: "K",
      lessonNumber: 52,
      seed: "UNIT5-K52-A",
    });
    const k53 = generateWorksheet({
      grade: "K",
      lessonNumber: 53,
      seed: "UNIT5-K53-A",
    });

    // K-51 checks
    expect(k51.isAuthoredBlueprint).toBe(true);
    expect(k51.lesson.standards).toEqual(["K.OA.2"]);
    expect(k51.warmUpSourceLessonId).toBe("K-49");
    expect(k51.worksheet.sections[0].sourceLessonId).toBe("K-49");
    expect(k51.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k51.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);
    expect(k51.worksheet.sections[1].exercises).toHaveLength(2);
    expect(k51.worksheet.sections[1].exercises[0].archetype).toBe(
      "SolveWordProblem"
    );
    expect((k51.worksheet.sections[1].exercises[0].data as any).situation).toBe(
      "put-together"
    );
    expect(
      (k51.worksheet.sections[1].exercises[0].data as any).responseForm
    ).toBe("model-and-bond");
    expect(k51.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k51.worksheet.sections[2].exercises[0].archetype).toBe(
      "ConnectMatch"
    );
    expect(k51.worksheet.sections[2].exercises[1].archetype).toBe(
      "SolveWordProblem"
    );
    expect(
      (k51.worksheet.sections[2].exercises[1].data as any).responseForm
    ).toBe("cloze-from-model");
    expect(
      (k51.worksheet.sections[2].exercises[1].data as any).clozeIncludeEquation
    ).toBe(true);

    // K-52 checks
    expect(k52.isAuthoredBlueprint).toBe(true);
    expect(k52.lesson.standards).toEqual(["K.OA.2"]);
    expect(k52.warmUpSourceLessonId).toBe("K-51");
    expect(k52.worksheet.sections[0].sourceLessonId).toBe("K-51");
    expect(k52.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k52.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);
    expect(k52.worksheet.sections[1].exercises).toHaveLength(2);
    for (const ex of k52.worksheet.sections[1].exercises) {
      expect(ex.archetype).toBe("SolveWordProblem");
      expect((ex.data as any).situation).toBe("put-together");
      expect((ex.data as any).problemStyle).toBe("story");
    }
    expect(k52.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k52.worksheet.sections[2].exercises[0].archetype).toBe(
      "ConnectMatch"
    );
    expect(k52.worksheet.sections[2].exercises[1].archetype).toBe(
      "SolveWordProblem"
    );
    expect(
      (k52.worksheet.sections[2].exercises[1].data as any).responseForm
    ).toBe("cloze-from-model");
    expect(
      (k52.worksheet.sections[2].exercises[1].data as any).clozeIncludeEquation
    ).toBe(true);

    // K-53 checks
    expect(k53.isAuthoredBlueprint).toBe(true);
    expect(k53.lesson.standards).toEqual(["K.OA.2"]);
    expect(k53.warmUpSourceLessonId).toBe("K-52");
    expect(k53.worksheet.sections[0].sourceLessonId).toBe("K-52");
    expect(k53.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k53.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);
    // K-53 Practice: 2 JoinParts exercises on five-frame
    expect(k53.worksheet.sections[1].exercises).toHaveLength(2);
    for (const ex of k53.worksheet.sections[1].exercises) {
      expect(ex.archetype).toBe("JoinParts");
      expect((ex.data as any).representation).toBe("five-frame");
    }
    // K-53 Challenge: Brain Builder ClassifyAndCount (HOW MANY?) + Problem of the Day JoinParts (solid-shapes equation)
    expect(k53.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k53.worksheet.sections[2].exercises[0].archetype).toBe(
      "ClassifyAndCount"
    );
    expect(k53.worksheet.sections[2].exercises[1].archetype).toBe("JoinParts");
    expect(
      (k53.worksheet.sections[2].exercises[1].data as any).responseForm
    ).toBe("equation");
    expect(
      k53.worksheet.sections[2].exercises[1].visualModels.some(
        (m) => m.kind === "solid-3d"
      )
    ).toBe(true);

    // Render Worksheet, Answer Key, and Teacher Notes surfaces for K-51..K-53
    for (const lessonNumber of [51, 52, 53]) {
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
      expect(htmlA).toContain('data-strategy-hint="true"');
      expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlN)).toEqual([]);
    }
  });

  it("domain invariant across 25 seeds × 4 modes: every K-51 to K-53 item satisfies part1 + part2 = total, rendered text matches generated quantities, and MATCHING C and D solutions are 1-to-1", () => {
    for (const lessonNumber of [51, 52, 53]) {
      for (let s = 1; s <= 25; s++) {
        const seed = `U5-PUT-DOMAIN-${lessonNumber}-${s}`;
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
                  expect(item.part1 + item.part2).toBe(item.total);
                  expect(seenInEx.has(item.factKey)).toBe(false);
                  seenInEx.add(item.factKey);
                  expect(item.problemTextAr).toContain(item.part1Ar);
                  expect(item.problemTextAr).toContain(item.part2Ar);
                  if (swp.responseForm === "cloze-from-model") {
                    expect(item.representationModel).toBeDefined();
                    expect(item.representationModel.count).toBe(item.part1);
                    expect(item.representationModel.secondaryCount).toBe(
                      item.part2
                    );
                    if (swp.clozeIncludeEquation) {
                      expect(item.equationModel?.kind).toBe("equation-strip");
                      expect(item.equationModel?.meta?.part1).toBe(item.part1);
                      expect(item.equationModel?.meta?.part2).toBe(item.part2);
                      expect(item.equationModel?.meta?.total).toBe(item.total);
                    }
                  }
                }
              } else if (ex.data.kind === "JoinParts") {
                const jp = ex.data as any;
                const seenInEx = new Set<string>();
                for (const item of jp.items) {
                  expect(item.part1 + item.part2).toBe(item.total);
                  expect(seenInEx.has(item.factKey)).toBe(false);
                  seenInEx.add(item.factKey);
                }
              } else if (ex.data.kind === "ClassifyAndCount") {
                const cc = ex.data as any;
                const sumParts = cc.groups.reduce(
                  (acc: number, g: any) => acc + g.count,
                  0
                );
                expect(sumParts).toBe(cc.totalCount);
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
                    expect(rMeta.part1 + rMeta.part2).toBe(rMeta.total);
                    expect(lMeta.part1).toBe(rMeta.part1);
                    expect(lMeta.part2).toBe(rMeta.part2);
                    expect(lMeta.total).toBe(rMeta.total);
                    expect(lMeta.problemTextAr).toContain(lMeta.part1Ar);
                    expect(lMeta.problemTextAr).toContain(lMeta.part2Ar);
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
