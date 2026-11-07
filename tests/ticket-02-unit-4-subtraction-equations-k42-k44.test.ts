import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { ConnectMatchData } from "@/domain/types";
import type { TakeAwayData } from "@/archetypes/take-away";
import type { PictureGraphCategorySpec } from "@/visual-models/picture-graphs";
import { createSeededRandom } from "@/lib/seed";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 02 (Unit 4) — Slice 1: ConnectMatch Subtraction (MATCHING C & D)", () => {
  it("supports MATCHING C (number-bond-to-equation) and MATCHING D (five-frame-to-equation) with operation: subtract, Missing Part Answer Slot, − sign, and Answer Key match lines", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const matchDef = getExerciseArchetype("ConnectMatch");
    const lessonK42 = getCurriculumCatalog().getLesson("K", 42)!;
    const lessonK43 = getCurriculumCatalog().getLesson("K", 43)!;

    // 1. MATCHING C: Number Bond -> Equation (K-42 Brain Builder)
    const exMatchC = matchDef.generate({
      lesson: lessonK42,
      sourceLessonId: "K-42",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCH-C-K42"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          operation: "subtract",
          matchingMode: "number-bond-to-equation",
          totalRange: [3, 5],
          minPart: 1,
          pairCount: 2,
        },
      },
    });

    const dataC = exMatchC.data as ConnectMatchData;
    expect(dataC.rightItems).toHaveLength(2);
    expect(dataC.leftItems).toHaveLength(2);

    for (const rItem of dataC.rightItems) {
      expect(rItem.model.kind).toBe("number-bond");
      const meta = rItem.model.meta as Record<string, unknown>;
      expect(meta.missingPosition).toBe("none");
      expect((meta.total as number) - (meta.part1 as number)).toBe(
        meta.part2 as number
      );
    }

    for (const lItem of dataC.leftItems) {
      expect(lItem.model.kind).toBe("equation-strip");
      const meta = lItem.model.meta as Record<string, unknown>;
      expect(meta.operation).toBe("subtract");
      expect(meta.missingPosition).toBe("part2");
    }

    const htmlCW = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchC, mode: "worksheet" })
    );
    const htmlCA = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchC, mode: "answer-key" })
    );

    expect(htmlCW).toContain('data-visual-model="number-bond"');
    expect(htmlCW).toContain('data-visual-model="equation-strip"');
    expect(htmlCW).toContain('data-equation-operation="subtract"');
    expect(htmlCW).toContain("−");
    expect(htmlCW).not.toContain("+");
    expect(htmlCW).toContain('data-answer-slot="unknown"');
    expect(htmlCA).toContain("data-solved-connection=");
    expect(htmlCA).toContain("data-solved-equation-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlCW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlCA)).toEqual([]);

    // 2. MATCHING D: Five Frame -> Equation (K-43 Brain Builder)
    const exMatchD = matchDef.generate({
      lesson: lessonK43,
      sourceLessonId: "K-43",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCH-D-K43"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          operation: "subtract",
          matchingMode: "five-frame-to-equation",
          totalRange: [3, 5],
          minPart: 1,
          pairCount: 2,
        },
      },
    });

    const dataD = exMatchD.data as ConnectMatchData;
    expect(dataD.rightItems).toHaveLength(2);
    for (const rItem of dataD.rightItems) {
      expect(rItem.model.kind).toBe("five-frame");
      expect(rItem.model.crossedOutCount).toBeGreaterThanOrEqual(1);
    }
    for (const lItem of dataD.leftItems) {
      expect(lItem.model.kind).toBe("equation-strip");
      const meta = lItem.model.meta as Record<string, unknown>;
      expect(meta.operation).toBe("subtract");
      expect(meta.missingPosition).toBe("part2");
    }

    const htmlDW = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchD, mode: "worksheet" })
    );
    const htmlDA = renderToStaticMarkup(
      matchDef.render({ exercise: exMatchD, mode: "answer-key" })
    );
    expect(htmlDW).toContain('data-visual-model="five-frame"');
    expect(htmlDW).toContain('data-visual-model="equation-strip"');
    expect(htmlDW).toContain("−");
    expect(htmlDW).toContain('data-answer-slot="unknown"');
    expect(htmlDA).toContain("data-solved-connection=");
    expect(htmlDA).toContain("data-solved-equation-part2=");
  });
});

describe("Ticket 02 (Unit 4) — Slice 2: TakeAway Subtraction Equations & MORE OR LESS Picture Graph", () => {
  it("supports TakeAway subtraction Equations with companion Number Bond (K-42), five-frame (K-43), snap-cubes/tally-marks/dice (K-44), and MORE OR LESS picture-graph take-away mode (K-44 Brain Builder)", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const takeAwayDef = getExerciseArchetype("TakeAway");
    const catalog = getCurriculumCatalog();

    // 1. K-42: Equation + companion Number Bond + shown crossed-out five-frame
    const exK42 = takeAwayDef.generate({
      lesson: catalog.getLesson("K", 42)!,
      sourceLessonId: "K-42",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("TA-K42-EQ-BOND"),
      spec: {
        archetype: "TakeAway",
        params: {
          representation: "five-frame",
          responseForm: "equation",
          showCompanionBond: true,
          action: "write",
          crossOffMode: "shown",
          totalRange: [3, 5],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const dataK42 = exK42.data as TakeAwayData;
    expect(dataK42.items).toHaveLength(2);
    for (const item of dataK42.items) {
      expect(item.responseModel?.kind).toBe("equation-strip");
      expect(
        (item.responseModel?.meta as Record<string, unknown>).operation
      ).toBe("subtract");
      expect(item.companionBondModel).toBeDefined();
      expect(item.companionBondModel?.kind).toBe("number-bond");
      expect(item.representationModel?.crossedOutCount).toBe(
        item.partTakenAway
      );
      expect(
        (item.representationModel?.meta as Record<string, unknown>).crossOffMode
      ).toBe("shown");
    }

    const htmlK42W = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exK42, mode: "worksheet" })
    );
    const htmlK42A = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exK42, mode: "answer-key" })
    );
    expect(htmlK42W).toContain('data-visual-model="equation-strip"');
    expect(htmlK42W).toContain('data-visual-model="number-bond"');
    expect(htmlK42W).toContain('data-crossed-out-cell="true"');
    expect(htmlK42W).toContain("−");
    expect(htmlK42A).toContain("data-solved-equation-part2=");
    expect(htmlK42A).toContain("data-solved-bond-part2=");

    // 2. K-44 Workbook: snap-cubes, tally-marks, and dice with subtraction Equation
    const exK44Models = takeAwayDef.generate({
      lesson: catalog.getLesson("K", 44)!,
      sourceLessonId: "K-44",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("TA-K44-MODELS"),
      spec: {
        archetype: "TakeAway",
        params: {
          allowedRepresentations: ["snap-cubes", "tally-marks", "dice"],
          responseForm: "equation",
          action: "write",
          crossOffMode: "shown",
          totalRange: [3, 5],
          minPart: 1,
          itemCount: 2,
        },
      },
    });
    const htmlK44ModelsW = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exK44Models, mode: "worksheet" })
    );
    expect(htmlK44ModelsW).toContain('data-visual-model="equation-strip"');
    expect(htmlK44ModelsW).toContain("−");
    expect(htmlK44ModelsW).not.toContain("+");

    // 3. K-44 Brain Builder (MORE OR LESS): picture-graph gives each category's count as Total, each Equation takes away a given Part
    const exMoreOrLess = takeAwayDef.generate({
      lesson: catalog.getLesson("K", 44)!,
      sourceLessonId: "K-44",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("TA-K44-GRAPH"),
      spec: {
        archetype: "TakeAway",
        params: {
          representation: "picture-graph",
          responseForm: "equation",
          action: "write",
          totalRange: [3, 5],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const dataGraph = exMoreOrLess.data as TakeAwayData;
    expect(dataGraph.representation).toBe("picture-graph");
    expect(dataGraph.graphModel).toBeDefined();
    expect(dataGraph.graphModel?.kind).toBe("picture-graph");
    const graphCategories = (
      dataGraph.graphModel?.meta as { categories: PictureGraphCategorySpec[] }
    ).categories;
    expect(graphCategories).toHaveLength(2);

    for (let i = 0; i < dataGraph.items.length; i++) {
      const item = dataGraph.items[i];
      // Each category's count in the picture graph is that item's Total
      expect(graphCategories[i].count).toBe(item.total);
      expect(item.total - item.partTakenAway).toBe(item.missingPart);
      expect(item.responseModel?.kind).toBe("equation-strip");
      expect(
        (item.responseModel?.meta as Record<string, unknown>).operation
      ).toBe("subtract");
    }

    const htmlGraphW = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exMoreOrLess, mode: "worksheet" })
    );
    const htmlGraphA = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exMoreOrLess, mode: "answer-key" })
    );

    expect(htmlGraphW).toContain('data-visual-model="picture-graph"');
    expect(htmlGraphW).toContain('data-visual-model="equation-strip"');
    expect(htmlGraphW).toContain("−");
    expect(htmlGraphW).not.toContain("+");
    // No comparison subtraction UI (no ١ أكثر / ١ أقل / الفرق)
    expect(htmlGraphW).not.toContain("data-graph-comparison");
    expect(htmlGraphW).not.toContain("الفرق");
    expect(htmlGraphA).toContain("data-solved-equation-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlGraphW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlGraphA)).toEqual([]);
  });
});

describe("Ticket 02 (Unit 4) — Slice 3: Lessons K-42, K-43 & K-44 Blueprints, Localization, and Domain Invariants", () => {
  it("generates Lessons K-42, K-43, and K-44 with Prerequisite Warm-Ups (K-41, K-42, K-43), localized titles and Teacher Notes, Strategy Hints, Eastern Arabic Numerals, and − (never hyphen) in every subtraction Equation", async () => {
    const { generateWorksheet } = await import("@/engine/worksheet-engine");
    const { renderWorksheetSurface } =
      await import("@/lib/render-worksheet-surface");

    const k42 = generateWorksheet({
      grade: "K",
      lessonNumber: 42,
      seed: "UNIT4-K42-A",
    });
    const k43 = generateWorksheet({
      grade: "K",
      lessonNumber: 43,
      seed: "UNIT4-K43-A",
    });
    const k44 = generateWorksheet({
      grade: "K",
      lessonNumber: 44,
      seed: "UNIT4-K44-A",
    });

    // 1. K-42 checks: Warm-Up from K-41, Practice has Equation + companion Number Bond and Equation + shown five-frame, Challenge has MATCHING C (number-bond-to-equation) + Problem of the Day
    expect(k42.isAuthoredBlueprint).toBe(true);
    expect(k42.lesson.standards).toEqual(["K.OA.1", "K.OA.5"]);
    expect(k42.warmUpSourceLessonId).toBe("K-41");
    expect(k42.worksheet.sections[0].sourceLessonId).toBe("K-41");
    expect(k42.teacherNotes.summaryAr.length).toBeGreaterThan(20);
    expect(k42.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k42.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    expect(k42.worksheet.sections[1].exercises).toHaveLength(2);
    const k42PracticeModels = k42.worksheet.sections[1].exercises.flatMap(
      (e) => e.visualModels
    );
    expect(k42PracticeModels.some((m) => m.kind === "equation-strip")).toBe(
      true
    );
    expect(k42PracticeModels.some((m) => m.kind === "number-bond")).toBe(true);
    expect(k42PracticeModels.some((m) => m.kind === "five-frame")).toBe(true);

    expect(k42.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k42.worksheet.sections[2].exercises[0].archetype).toBe(
      "ConnectMatch"
    );
    const k42MatchData = k42.worksheet.sections[2].exercises[0]
      .data as ConnectMatchData;
    expect(k42MatchData.rightItems[0].model.kind).toBe("number-bond");
    expect(k42MatchData.leftItems[0].model.kind).toBe("equation-strip");
    expect(k42.worksheet.sections[2].exercises[1].archetype).toBe("TakeAway");

    // 2. K-43 checks: Warm-Up from K-42, Practice uses five-frame to complete subtraction Equations, Challenge has MATCHING D (five-frame-to-equation) + Problem of the Day
    expect(k43.isAuthoredBlueprint).toBe(true);
    expect(k43.lesson.standards).toEqual(["K.OA.1", "K.OA.5"]);
    expect(k43.warmUpSourceLessonId).toBe("K-42");
    expect(k43.worksheet.sections[0].sourceLessonId).toBe("K-42");
    expect(k43.teacherNotes.summaryAr.length).toBeGreaterThan(20);
    expect(k43.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k43.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    expect(k43.worksheet.sections[1].exercises).toHaveLength(2);
    for (const ex of k43.worksheet.sections[1].exercises) {
      expect(ex.archetype).toBe("TakeAway");
      const data = ex.data as TakeAwayData;
      expect(data.representation).toBe("five-frame");
      expect(data.responseForm).toBe("equation");
    }

    expect(k43.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k43.worksheet.sections[2].exercises[0].archetype).toBe(
      "ConnectMatch"
    );
    const k43MatchData = k43.worksheet.sections[2].exercises[0]
      .data as ConnectMatchData;
    expect(k43MatchData.rightItems[0].model.kind).toBe("five-frame");
    expect(k43MatchData.leftItems[0].model.kind).toBe("equation-strip");
    expect(k43.worksheet.sections[2].exercises[1].archetype).toBe("TakeAway");

    // 3. K-44 checks: Warm-Up from K-43, Practice has snap-cubes, tally-marks, and dice with subtraction Equations, Challenge has MORE OR LESS (picture-graph) + Problem of the Day
    expect(k44.isAuthoredBlueprint).toBe(true);
    expect(k44.lesson.standards).toEqual(["K.OA.1", "K.OA.5"]);
    expect(k44.warmUpSourceLessonId).toBe("K-43");
    expect(k44.worksheet.sections[0].sourceLessonId).toBe("K-43");
    expect(k44.teacherNotes.summaryAr.length).toBeGreaterThan(20);
    expect(k44.teacherNotes.classroomActivityNoteAr).toBeDefined();
    expect(
      k44.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    expect(k44.worksheet.sections[1].exercises).toHaveLength(2);
    const k44PracticeModels = k44.worksheet.sections[1].exercises.flatMap(
      (e) => e.visualModels
    );
    expect(k44PracticeModels.some((m) => m.kind === "snap-cubes")).toBe(true);
    expect(k44PracticeModels.some((m) => m.kind === "tally-marks")).toBe(true);
    expect(k44PracticeModels.some((m) => m.kind === "dice-pattern")).toBe(true);
    expect(k44PracticeModels.some((m) => m.kind === "equation-strip")).toBe(
      true
    );

    expect(k44.worksheet.sections[2].exercises).toHaveLength(2);
    const k44BrainBuilder = k44.worksheet.sections[2].exercises[0];
    expect(k44BrainBuilder.archetype).toBe("TakeAway");
    expect((k44BrainBuilder.data as TakeAwayData).representation).toBe(
      "picture-graph"
    );
    expect(k44.worksheet.sections[2].exercises[1].archetype).toBe("TakeAway");

    // 4. Primary-seam rendering & − operator invariant (never a hyphen)
    for (const lessonNumber of [42, 43, 44]) {
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

      expect(htmlW).toContain('data-visual-model="equation-strip"');
      expect(htmlA).toContain('data-strategy-hint="true"');
      expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlN)).toEqual([]);

      // Every subtraction Equation Strip uses − (U+2212), never a hyphen (-) in its operator span
      const eqStrips = [
        ...htmlW.matchAll(
          /<div[^>]*data-visual-model="equation-strip"[\s\S]*?<\/div>/g
        ),
        ...htmlA.matchAll(
          /<div[^>]*data-visual-model="equation-strip"[\s\S]*?<\/div>/g
        ),
      ];
      expect(eqStrips.length).toBeGreaterThan(0);
      for (const strip of eqStrips) {
        expect(strip[0]).toContain("−");
        expect(strip[0]).not.toMatch(/aria-hidden="true">-<\/span>/);
      }
    }
  });

  it("domain invariant across 25 seeds × 4 modes: every item in K-42 to K-44 satisfies Total − Part = Missing Part, picture-graph counts equal Total, and difficulty/unknown rules hold", async () => {
    const { generateWorksheet } = await import("@/engine/worksheet-engine");

    for (const lessonNumber of [42, 43, 44]) {
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
                const ta = ex.data as TakeAwayData;
                const seenInEx = new Set<string>();
                for (let idx = 0; idx < ta.items.length; idx++) {
                  const item = ta.items[idx];
                  expect(item.total - item.partTakenAway).toBe(
                    item.missingPart
                  );
                  expect(seenInEx.has(item.factKey)).toBe(false);
                  seenInEx.add(item.factKey);

                  if (ta.graphModel) {
                    const categories = (
                      ta.graphModel.meta as {
                        categories: PictureGraphCategorySpec[];
                      }
                    ).categories;
                    expect(categories[idx].count).toBe(item.total);
                  } else if (item.crossOffMode !== "none") {
                    expect(item.representationModel?.crossedOutCount).toBe(
                      item.partTakenAway
                    );
                  }

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
                }
              }
            }
          }
        }
      }
    }
  });
});
