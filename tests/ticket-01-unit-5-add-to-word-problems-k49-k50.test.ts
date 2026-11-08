import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "@/lib/seed";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 01 (Unit 5) — Slice 1: SolveWordProblem Archetype (add-to learning, story, cloze-from-model)", () => {
  it("registers SolveWordProblem and generates/renders model-and-bond, story-and-slot, equation, and cloze-from-model for add-to learning and story problems", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson49 = getCurriculumCatalog().getLesson("K", 49)!;
    const lesson50 = getCurriculumCatalog().getLesson("K", 50)!;
    const solveDef = getExerciseArchetype("SolveWordProblem");
    expect(solveDef.displayNameAr).toBe("حلّ المسألة اللفظية");

    // 1. K-49 Learning Problem: model-and-bond (snap-cubes + Number Bond + كم في الكلّ؟ Answer Slot)
    const exLearnBond = solveDef.generate({
      lesson: lesson49,
      sourceLessonId: "K-49",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Easy",
      rng: createSeededRandom("SWP-LEARN-BOND-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "add-to",
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
    expect(dataLearnBond.kind).toBe("SolveWordProblem");
    expect(dataLearnBond.situation).toBe("add-to");
    expect(dataLearnBond.problemStyle).toBe("learning");
    expect(dataLearnBond.responseForm).toBe("model-and-bond");
    expect(dataLearnBond.items).toHaveLength(2);
    for (const item of dataLearnBond.items) {
      expect(item.part1 + item.part2).toBe(item.total);
      expect(item.problemTextAr).toContain(item.part1Ar);
      expect(item.problemTextAr).toContain(item.part2Ar);
      expect(item.representationModel?.kind).toBe("snap-cubes");
      expect(item.bondModel?.kind).toBe("number-bond");
    }

    const htmlLearnW = renderToStaticMarkup(
      solveDef.render({ exercise: exLearnBond, mode: "worksheet" })
    );
    const htmlLearnA = renderToStaticMarkup(
      solveDef.render({ exercise: exLearnBond, mode: "answer-key" })
    );
    expect(htmlLearnW).toContain('data-archetype="SolveWordProblem"');
    expect(htmlLearnW).toContain('data-visual-model="snap-cubes"');
    expect(htmlLearnW).toContain('data-visual-model="number-bond"');
    expect(htmlLearnW).toContain("كم في الكلّ؟");
    expect(htmlLearnW).toContain('data-answer-slot="unknown"');
    expect(htmlLearnA).toContain('data-answer-slot="solved-digit"');
    expect(findWesternNumeralsInRenderedHtml(htmlLearnW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlLearnA)).toEqual([]);

    // 2. K-50 Story Problem: story-and-slot (withdrawn model at Intermediate)
    const exStorySlot = solveDef.generate({
      lesson: lesson50,
      sourceLessonId: "K-50",
      sectionId: "practice",
      exerciseIndex: 1,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("SWP-STORY-SLOT-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "add-to",
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
    expect(dataStorySlot.items).toHaveLength(2);
    for (const item of dataStorySlot.items) {
      expect(item.part1 + item.part2).toBe(item.total);
      expect(item.problemTextAr).toContain(item.part1Ar);
      expect(item.problemTextAr).toContain(item.part2Ar);
      expect(item.representationModel).toBeUndefined();
    }

    const htmlStorySlotW = renderToStaticMarkup(
      solveDef.render({ exercise: exStorySlot, mode: "worksheet" })
    );
    expect(htmlStorySlotW).toContain('data-answer-slot="unknown"');
    expect(findWesternNumeralsInRenderedHtml(htmlStorySlotW)).toEqual([]);

    // 3. Problem of the Day: cloze-from-model
    const exCloze = solveDef.generate({
      lesson: lesson50,
      sourceLessonId: "K-50",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("SWP-CLOZE-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "add-to",
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
    expect(dataCloze.items).toHaveLength(1);
    const clozeItem = dataCloze.items[0];
    expect(clozeItem.part1 + clozeItem.part2).toBe(clozeItem.total);
    expect(clozeItem.representationModel).toBeDefined();

    const htmlClozeW = renderToStaticMarkup(
      solveDef.render({ exercise: exCloze, mode: "worksheet" })
    );
    const htmlClozeA = renderToStaticMarkup(
      solveDef.render({ exercise: exCloze, mode: "answer-key" })
    );
    expect(htmlClozeW).toContain('data-response-form="cloze-from-model"');
    // Cloze has digit slots for part1, part2, and total
    expect(
      (htmlClozeW.match(/data-answer-slot="unknown"/g) ?? []).length
    ).toBeGreaterThanOrEqual(3);
    expect(htmlClozeA).toContain(
      `data-solved-cloze-part1="${clozeItem.part1Ar}"`
    );
    expect(htmlClozeA).toContain(
      `data-solved-cloze-part2="${clozeItem.part2Ar}"`
    );
    expect(htmlClozeA).toContain(
      `data-solved-cloze-total="${clozeItem.totalAr}"`
    );
    expect(findWesternNumeralsInRenderedHtml(htmlClozeW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlClozeA)).toEqual([]);
  });
});

describe("Ticket 01 (Unit 5) — Slice 2: ConnectMatch model-to-word-problem (MATCHING A & B)", () => {
  it("supports matchingMode: model-to-word-problem for MATCHING A (K-49 Learning Problem, missing Total on Number Bond only) and MATCHING B (K-50 Story Problem, missing Total on both Number Bond and Story Problem card)", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson49 = getCurriculumCatalog().getLesson("K", 49)!;
    const lesson50 = getCurriculumCatalog().getLesson("K", 50)!;
    const matchDef = getExerciseArchetype("ConnectMatch");

    // 1. MATCHING A (K-49): Number Bond (missing Total) -> Add-To Learning Problem (no slot on problem card)
    const exMatchA = matchDef.generate({
      lesson: lesson49,
      sourceLessonId: "K-49",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 3,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCH-WP-A"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "model-to-word-problem",
          situation: "add-to",
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

    const dataA = exMatchA.data as any;
    expect(dataA.rightItems).toHaveLength(2);
    expect(dataA.leftItems).toHaveLength(2);
    expect(Object.keys(dataA.solutionMap)).toHaveLength(2);
    expect(new Set(Object.values(dataA.solutionMap)).size).toBe(2);

    for (const rItem of dataA.rightItems) {
      expect(rItem.model.kind).toBe("number-bond");
      expect(rItem.model.meta.missingPosition).toBe("total");
    }
    for (const lItem of dataA.leftItems) {
      expect(lItem.model.meta.isWordProblemEndpoint).toBe(true);
      expect(lItem.model.meta.showProblemSlot).toBe(false);
    }

    const htmlAW = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchA, mode: "worksheet" })
    );
    const htmlAA = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchA, mode: "answer-key" })
    );
    expect(htmlAW).toContain('data-word-problem-endpoint="true"');
    // Only the 2 Number Bonds have unknown Answer Slots (2 slots total)
    expect(htmlAW.match(/data-answer-slot="unknown"/g)).toHaveLength(2);
    expect(htmlAA.match(/data-answer-slot="solved-digit"/g)).toHaveLength(2);
    expect(findWesternNumeralsInRenderedHtml(htmlAW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlAA)).toEqual([]);

    // 2. MATCHING B (K-50): Number Bond (missing Total) -> Add-To Story Problem (also carries missing Total slot)
    const exMatchB = matchDef.generate({
      lesson: lesson50,
      sourceLessonId: "K-50",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 3,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCH-WP-B"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "model-to-word-problem",
          situation: "add-to",
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

    const dataB = exMatchB.data as any;
    expect(dataB.rightItems).toHaveLength(2);
    expect(dataB.leftItems).toHaveLength(2);
    expect(new Set(Object.values(dataB.solutionMap)).size).toBe(2);

    const htmlBW = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchB, mode: "worksheet" })
    );
    const htmlBA = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchB, mode: "answer-key" })
    );
    // 2 Number Bond slots + 2 Story Problem card slots = 4 unknown Answer Slots
    expect(htmlBW.match(/data-answer-slot="unknown"/g)).toHaveLength(4);
    expect(htmlBA.match(/data-answer-slot="solved-digit"/g)).toHaveLength(4);
    expect(findWesternNumeralsInRenderedHtml(htmlBW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlBA)).toEqual([]);
  });
});

describe("Ticket 01 (Unit 5) — Slice 3: Lessons K-49 & K-50 Blueprints, Localization, and Domain Invariants", () => {
  it("generates Lesson K-49 (Add-To Learning Problems, Warm-Up -> K-31, Practice Type 1 & Type 2, Challenge MATCHING A + PoD cloze-from-model) and Lesson K-50 (Add-To Story Problems, Warm-Up -> K-49, Practice Type 1 & Type 2, Challenge MATCHING B + PoD cloze-from-model)", async () => {
    const k49 = generateWorksheet({
      grade: "K",
      lessonNumber: 49,
      seed: "UNIT5-K49-A",
    });
    const k50 = generateWorksheet({
      grade: "K",
      lessonNumber: 50,
      seed: "UNIT5-K50-A",
    });

    // K-49 checks
    expect(k49.isAuthoredBlueprint).toBe(true);
    expect(k49.lesson.standards).toEqual(["K.OA.2"]);
    expect(k49.warmUpSourceLessonId).toBe("K-31");
    expect(k49.worksheet.sections[0].sourceLessonId).toBe("K-31");
    expect(k49.teacherNotes.summaryAr).toContain("البداية");
    expect(k49.teacherNotes.summaryAr).toContain("التغيير");
    expect(k49.teacherNotes.summaryAr).toContain("النتيجة");
    expect(k49.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k49.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    // K-49 Practice: 2 SolveWordProblem exercises (Type 1 model-and-bond + Type 2 story-and-slot/equation)
    expect(k49.worksheet.sections[1].exercises).toHaveLength(2);
    expect(k49.worksheet.sections[1].exercises[0].archetype).toBe(
      "SolveWordProblem"
    );
    expect(
      (k49.worksheet.sections[1].exercises[0].data as any).responseForm
    ).toBe("model-and-bond");
    expect(k49.worksheet.sections[1].exercises[1].archetype).toBe(
      "SolveWordProblem"
    );

    // K-49 Challenge: MATCHING A (ConnectMatch model-to-word-problem) + Problem of the Day (SolveWordProblem cloze-from-model)
    expect(k49.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k49.worksheet.sections[2].exercises[0].archetype).toBe(
      "ConnectMatch"
    );
    expect(k49.worksheet.sections[2].exercises[1].archetype).toBe(
      "SolveWordProblem"
    );
    expect(
      (k49.worksheet.sections[2].exercises[1].data as any).responseForm
    ).toBe("cloze-from-model");

    // K-50 checks
    expect(k50.isAuthoredBlueprint).toBe(true);
    expect(k50.lesson.standards).toEqual(["K.OA.2"]);
    expect(k50.warmUpSourceLessonId).toBe("K-49");
    expect(k50.worksheet.sections[0].sourceLessonId).toBe("K-49");
    expect(k50.teacherNotes.summaryAr).toContain("البداية");
    expect(k50.teacherNotes.summaryAr).toContain("التغيير");
    expect(k50.teacherNotes.summaryAr).toContain("النتيجة");
    expect(k50.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k50.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    // K-50 Practice: 2 SolveWordProblem exercises (story style)
    expect(k50.worksheet.sections[1].exercises).toHaveLength(2);
    for (const ex of k50.worksheet.sections[1].exercises) {
      expect(ex.archetype).toBe("SolveWordProblem");
      expect((ex.data as any).problemStyle).toBe("story");
    }

    // K-50 Challenge: MATCHING B (ConnectMatch model-to-word-problem with showProblemSlot: true) + Problem of the Day (cloze-from-model)
    expect(k50.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k50.worksheet.sections[2].exercises[0].archetype).toBe(
      "ConnectMatch"
    );
    expect(k50.worksheet.sections[2].exercises[1].archetype).toBe(
      "SolveWordProblem"
    );
    expect(
      (k50.worksheet.sections[2].exercises[1].data as any).responseForm
    ).toBe("cloze-from-model");

    // Render Worksheet, Answer Key, and Teacher Notes surfaces for K-49 & K-50
    for (const lessonNumber of [49, 50]) {
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

      expect(htmlW).toContain('data-archetype="SolveWordProblem"');
      expect(htmlW).toContain('data-archetype="ConnectMatch"');
      // Pedagogical terms البداية / التغيير / النتيجة never appear on child-facing worksheet or answer-key
      expect(htmlW).not.toMatch(/البداية|التغيير|النتيجة/);
      expect(htmlA).not.toMatch(/البداية|التغيير|النتيجة/);
      expect(htmlN).toContain("البداية");
      expect(htmlN).toContain("التغيير");
      expect(htmlN).toContain("النتيجة");

      expect(htmlA).toContain('data-strategy-hint="true"');
      expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlN)).toEqual([]);
    }
  });

  it("domain invariant across 25 seeds × 4 modes: every K-49 and K-50 item satisfies part1 + part2 = total, rendered text contains exact Eastern Arabic numerals for its Parts, cloze-from-model slots match the model, and ConnectMatch is 1-to-1", () => {
    for (const lessonNumber of [49, 50]) {
      for (let s = 1; s <= 25; s++) {
        const seed = `U5-DOMAIN-${lessonNumber}-${s}`;
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

                  // Problem text contains exact Eastern Arabic numerals for part1 and part2
                  expect(item.problemTextAr).toContain(item.part1Ar);
                  expect(item.problemTextAr).toContain(item.part2Ar);

                  // Cloze-from-model always has representationModel matching part1 and part2
                  if (swp.responseForm === "cloze-from-model") {
                    expect(item.representationModel).toBeDefined();
                    expect(item.representationModel.count).toBe(item.part1);
                    expect(item.representationModel.secondaryCount).toBe(
                      item.part2
                    );
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
