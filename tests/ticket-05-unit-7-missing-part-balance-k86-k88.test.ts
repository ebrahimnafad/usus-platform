import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "@/lib/seed";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { getLessonBlueprint } from "@/blueprints/registry";

describe("Ticket 05 (Unit 7) — Slice 1: ConnectMatch missing-part pairs (MATCHING - F and G)", () => {
  it("ten-frame-to-bond matches missing part2 in each bond with Ten Frames on the right", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson86 = getCurriculumCatalog().getLesson("K", 86)!;
    const matchDef = getExerciseArchetype("ConnectMatch");

    const ex = matchDef.generate({
      lesson: lesson86,
      sourceLessonId: "K-86",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCHING-F-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "ten-frame-to-bond",
          matchMissingPosition: "part2",
          totalRange: [6, 10],
          minPart: 1,
          pairCount: 2,
          rightColumnTitleAr: "لوحة العشرة",
          leftColumnTitleAr: "رابطة الأعداد",
        },
      },
    });

    const data = ex.data as any;
    expect(data.kind).toBe("ConnectMatch");
    expect(data.pairs).toHaveLength(2);
    for (const pairData of data.pairs) {
      // Right column (first in RTL): a complete Ten Frame showing both Parts
      const right = pairData.rightItem as any;
      expect(right.kind).toBe("ten-frame");
      // Left column: Number Bond missing its second Part
      const left = pairData.leftItem as any;
      expect(left.kind).toBe("number-bond");
      expect(left.meta.missingPosition).toBe("part2");
      expect(left.meta.part1).toBeGreaterThanOrEqual(1);
      expect(left.meta.part2 + left.meta.part1).toBe(left.meta.total);
    }

    const htmlW = renderToStaticMarkup(
      matchDef.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      matchDef.render({ exercise: ex, mode: "answer-key" })
    );
    // Worksheet shows the unknown `؟` slot in the bond's part2 circle
    expect(htmlW).toContain('data-visual-model="number-bond"');
    expect(htmlW).toContain('data-missing-position="part2"');
    // Answer key solves part2 in each bond slot
    expect((htmlA.match(/data-solved-bond-part2="[^"]+"/g) ?? []).length).toBe(
      2
    );
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("ten-frame-to-equation matches missing part2 in each equation (MATCHING - G)", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson87 = getCurriculumCatalog().getLesson("K", 87)!;
    const matchDef = getExerciseArchetype("ConnectMatch");

    const ex = matchDef.generate({
      lesson: lesson87,
      sourceLessonId: "K-87",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCHING-G-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "ten-frame-to-equation",
          matchMissingPosition: "part2",
          totalRange: [6, 10],
          minPart: 1,
          pairCount: 2,
          rightColumnTitleAr: "لوحة العشرة",
          leftColumnTitleAr: "معادلة الجمع",
        },
      },
    });

    const data = ex.data as any;
    for (const pairData of data.pairs) {
      const right = pairData.rightItem as any;
      expect(right.kind).toBe("ten-frame");
      const left = pairData.leftItem as any;
      expect(left.kind).toBe("equation-strip");
      expect(left.meta.missingPosition).toBe("part2");
      expect((left.meta as any).part1 + (left.meta as any).part2).toBe(
        (left.meta as any).total
      );
    }

    const htmlA = renderToStaticMarkup(
      matchDef.render({ exercise: ex, mode: "answer-key" })
    );
    expect(
      (htmlA.match(/data-solved-equation-part2="[^"]+"/g) ?? []).length
    ).toBe(2);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("Advanced can match missing part1 (non-standard unknown position, §6.3) and the gate suppresses it at Easy practice", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson86 = getCurriculumCatalog().getLesson("K", 86)!;
    const matchDef = getExerciseArchetype("ConnectMatch");

    const exAdv = matchDef.generate({
      lesson: lesson86,
      sourceLessonId: "K-86",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("MATCHING-F-ADV-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "ten-frame-to-bond",
          matchMissingPosition: "part1",
          totalRange: [6, 10],
          minPart: 1,
          pairCount: 2,
        },
      },
    });

    for (const pairData of (exAdv.data as any).pairs) {
      const left = pairData.leftItem as any;
      expect(left.meta.missingPosition).toBe("part1");
    }

    // §6.3: missing Part unknowns outside the lesson's own content appear at
    // Advanced or in Challenge — Easy practice without a challenge section falls back to total.
    const exEasyPractice = matchDef.generate({
      lesson: lesson86,
      sourceLessonId: "K-86",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Easy",
      rng: createSeededRandom("MATCHING-F-GATE-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "ten-frame-to-bond",
          matchMissingPosition: "part1",
          totalRange: [6, 8],
          minPart: 1,
          pairCount: 2,
        },
      },
    });
    for (const pairData of (exEasyPractice.data as any).pairs) {
      const left = pairData.leftItem as any;
      expect(left.meta.missingPosition).toBe("total");
    }
  });

  it("default (absent matchMissingPosition) keeps all bonds missing their total — pre-existing lessons unchanged", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");

    const lesson78 = getCurriculumCatalog().getLesson("K", 78)!;
    const matchDef = getExerciseArchetype("ConnectMatch");

    const exDefault = matchDef.generate({
      lesson: lesson78,
      sourceLessonId: "K-78",
      sectionId: "challenge",
      exerciseIndex: 0,
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
    for (const pairData of (exDefault.data as any).pairs) {
      const left = pairData.leftItem as any;
      expect(left.meta.missingPosition).toBe("total");
    }
  });
});

describe("Ticket 05 (Unit 7) — Slice 2: JoinParts missing-part unknowns with Ten Frame models (K-86 and K-87)", () => {
  const joinDef = async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");
    return {
      def: getExerciseArchetype("JoinParts"),
      lesson86: getCurriculumCatalog().getLesson("K", 86)!,
      lesson87: getCurriculumCatalog().getLesson("K", 87)!,
    };
  };

  it("JoinParts ten-frame number-bond items carry a missing part2 bond and a Ten Frame that does not leak the answer in its label", async () => {
    const { def, lesson86 } = await joinDef();

    const ex = def.generate({
      lesson: lesson86,
      sourceLessonId: "K-86",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K86-BOND-WRITE-1"),
      spec: {
        archetype: "JoinParts",
        params: {
          representation: "ten-frame",
          responseForm: "number-bond",
          action: "write",
          totalRange: [6, 10],
          minPart: 1,
          unknownPosition: "part2",
          itemCount: 2,
        },
      },
    });

    const data = ex.data as any;
    expect(data.representation).toBe("ten-frame");
    expect(data.items).toHaveLength(2);
    for (const item of data.items) {
      expect(item.unknownPosition).toBe("part2");
      const frame = item.representationModel;
      expect(frame.kind).toBe("ten-frame");
      // The frame draws the Total split into the known first-Part run and the
      // second-Part run (K-79 convention); its label must not print part2.
      expect(frame.count).toBe(item.part1);
      expect(frame.secondaryCount).toBe(item.part2);
      expect(frame.meta.showPartOutline).toBe(true);
      expect(frame.labelAr).not.toContain(item.part2Ar);
      expect(frame.labelAr).toContain(item.totalAr);
      const bond = item.responseModel;
      expect(bond.kind).toBe("number-bond");
      expect(bond.meta.missingPosition).toBe("part2");
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-visual-model="ten-frame"');
    expect(htmlW).toContain('data-missing-position="part2"');
    // Default prompt (spec omits promptAr) names the Missing Part (§9.4)
    expect(ex.promptAr).toContain("الجزء الناقص");
    expect(htmlA).toContain("data-solved-bond-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("JoinParts ten-frame equation items carry a missing part2 equation strip for K-87", async () => {
    const { def, lesson87 } = await joinDef();

    const ex = def.generate({
      lesson: lesson87,
      sourceLessonId: "K-87",
      sectionId: "practice",
      exerciseIndex: 1,
      exerciseNumber: 3,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K87-EQ-WRITE-1"),
      spec: {
        archetype: "JoinParts",
        params: {
          representation: "ten-frame",
          responseForm: "equation",
          action: "write",
          totalRange: [6, 10],
          minPart: 1,
          unknownPosition: "part2",
          itemCount: 2,
        },
      },
    });

    for (const item of (ex.data as any).items) {
      expect(item.unknownPosition).toBe("part2");
      const eq = item.responseModel;
      expect(eq.kind).toBe("equation-strip");
      expect(eq.meta.missingPosition).toBe("part2");
      expect(eq.meta.part1).toBe(item.part1);
    }

    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlA).toContain("data-solved-equation-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("JoinParts draw-counters keeps ghost targets at the missing part and the label states only the given Total", async () => {
    const { def, lesson86 } = await joinDef();

    const ex = def.generate({
      lesson: lesson86,
      sourceLessonId: "K-86",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 5,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("K86-POD-DRAW-1"),
      spec: {
        archetype: "JoinParts",
        params: {
          representation: "ten-frame",
          responseForm: "number-bond",
          action: "draw-counters",
          totalRange: [6, 10],
          minPart: 1,
          unknownPosition: "part2",
          itemCount: 1,
        },
      },
    });

    const item = (ex.data as any).items[0];
    expect(item.unknownPosition).toBe("part2");
    const frame = item.representationModel;
    expect(frame.meta.ghostTargetCount).toBe(item.part2);
    expect(frame.labelAr).not.toContain(item.part2Ar);
    expect(frame.labelAr).toContain(item.totalAr);

    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlA).toContain("data-solved-bond-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("Advanced supports the non-standard missing part1 in bonds and equations (§6.3), Easy practice falls back to the Total", async () => {
    const { def, lesson86 } = await joinDef();

    for (const responseForm of ["number-bond", "equation"] as const) {
      const ex = def.generate({
        lesson: lesson86,
        sourceLessonId: "K-86",
        sectionId: "challenge",
        exerciseIndex: 0,
        exerciseNumber: 4,
        difficultyLevel: "Advanced",
        rng: createSeededRandom(`K86-PART1-${responseForm}`),
        spec: {
          archetype: "JoinParts",
          params: {
            representation: "ten-frame",
            responseForm,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            unknownPosition: "part1",
            itemCount: 1,
          },
        },
      });
      const item = (ex.data as any).items[0];
      expect(item.unknownPosition).toBe("part1");
      expect(item.responseModel.meta.missingPosition).toBe("part1");
      // Full fact still drawn in the two runs; label names the given second part
      expect(item.representationModel.count).toBe(item.part1);
      expect(item.representationModel.secondaryCount).toBe(item.part2);
      // The label may not print the unknown Part's numeral. When part1 equals
      // part2 the printed numeral is the GIVEN part's same digit, so the leak
      // check only applies to distinct parts.
      if (item.part1 !== item.part2) {
        expect(item.representationModel.labelAr).not.toContain(item.part1Ar);
      }
    }

    // §6.3 gate: Easy practice resolves to the standard missing Total
    const exEasy = def.generate({
      lesson: lesson86,
      sourceLessonId: "K-86",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Easy",
      rng: createSeededRandom("K86-PART1-GATE"),
      spec: {
        archetype: "JoinParts",
        params: {
          representation: "ten-frame",
          responseForm: "number-bond",
          action: "write",
          totalRange: [6, 8],
          minPart: 1,
          unknownPosition: "part1",
          itemCount: 1,
        },
      },
    });
    expect((exEasy.data as any).items[0].unknownPosition).toBe("total");
  });
});

describe("Ticket 05 (Unit 7) — Slice 3: JudgeEquality addition to 10 with balance telescoping (K-88)", () => {
  const judgeDef = async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");
    await import("@/registry/bootstrap");
    return {
      def: getExerciseArchetype("JudgeEquality"),
      lesson88: getCurriculumCatalog().getLesson("K", 88)!,
    };
  };

  it("true-false addition items scale to 10 with صحيح/خطأ circled in the answer key", async () => {
    const { def, lesson88 } = await judgeDef();

    const ex = def.generate({
      lesson: lesson88,
      sourceLessonId: "K-88",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K88-TF-1"),
      spec: {
        archetype: "JudgeEquality",
        params: {
          operation: "add",
          mode: "true-false",
          itemCount: 3,
          totalRange: [6, 10],
          minPart: 1,
        },
      },
    });

    const data =
      ex.data as import("@/archetypes/judge-equality").JudgeEqualityData;
    expect(data.kind).toBe("JudgeEquality");
    expect(data.operation).toBe("add");
    expect(data.mode).toBe("true-false");
    const items = data.rows.flatMap((r) => r.items);
    expect(items).toHaveLength(3);
    // Totals are drawn from the K-88 stretch range (families within 10)
    expect(items.every((i) => i.realTotal >= 6 && i.realTotal <= 10)).toBe(
      true
    );
    expect(items.some((i) => i.isCorrect)).toBe(true);
    expect(items.some((i) => !i.isCorrect)).toBe(true);
    for (const item of items) {
      expect(item.isCorrect).toBe(item.part1 + item.part2 === item.shownTotal);
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-judge-mode="true-false"');
    expect(htmlW).not.toContain("data-circled-choice=");
    expect(htmlA).toContain("data-circled-choice=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("balance (TEETER TOTS) items use within-10 expressions whose solutions all appear in the number bank", async () => {
    const { def, lesson88 } = await judgeDef();

    const ex = def.generate({
      lesson: lesson88,
      sourceLessonId: "K-88",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K88-BAL-1"),
      spec: {
        archetype: "JudgeEquality",
        params: {
          operation: "add",
          mode: "balance",
          itemCount: 2,
          totalRange: [6, 10],
          minPart: 1,
        },
      },
    });

    const data =
      ex.data as import("@/archetypes/judge-equality").JudgeEqualityData;
    expect(data.mode).toBe("balance");
    expect(data.numberBank).toBeDefined();
    const items = data.rows.flatMap((r) => r.items);
    expect(items).toHaveLength(2);
    for (const item of items) {
      expect(item.rightValue).toBe(item.leftValue);
      expect(item.solutionValue).toBe(item.part1 + item.part2);
      expect(item.realTotal).toBeGreaterThanOrEqual(6);
      expect(item.realTotal).toBeLessThanOrEqual(10);
      expect(data.numberBank).toContain(item.solutionValue);
    }
    // Every bank number is within the K-88 stretch range (no 11+ dots)
    for (const bankNumber of data.numberBank!) {
      expect(bankNumber).toBeLessThanOrEqual(10);
      expect(bankNumber).toBeGreaterThanOrEqual(1);
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-judge-mode="balance"');
    expect(htmlW).toContain('data-number-bank="true"');
    expect(htmlW).toContain('data-visual-model="balance-scale"');
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });
});

describe("Ticket 05 (Unit 7) — Slice 4: Lessons K-86, K-87, and K-88 registration and render", () => {
  const expectedWarmUpSource: Record<number, string> = {
    86: "K-79",
    87: "K-86",
    88: "K-83",
  };

  for (const lessonNum of [86, 87]) {
    it(`generates and renders Lesson K-${lessonNum} with missing-part bonds/equations, matching, and no Western numerals`, () => {
      const seed = `TEST-K${lessonNum}`;
      const expectedResponseForm =
        lessonNum === 86 ? "number-bond" : "equation";
      const expectedMatchMode =
        lessonNum === 86 ? "ten-frame-to-bond" : "ten-frame-to-equation";
      const expectedMatchColumnTitle =
        lessonNum === 86 ? "رابطة الأعداد" : "معادلة الجمع";

      const generated = generateWorksheet({
        grade: "K",
        lessonNumber: lessonNum,
        seed,
        difficultyLevel: "scaffolded",
      });

      expect(generated.worksheet.sections).toHaveLength(3);
      expect(generated.answerKey.sections).toHaveLength(3);
      for (const section of generated.worksheet.sections) {
        for (const ex of section.exercises) {
          expect(
            generated.answerKey.strategyHintsByExerciseId[ex.id]
          ).toBeTruthy();
        }
      }

      // Section anatomy: Warm-Up 1-2, Practice 2, Challenge 2 (§5.2)
      expect(
        generated.worksheet.sections.map((s) => s.exercises.length)
      ).toEqual([1, 2, 2]);

      const responseForms = Array.from(
        new Set(
          generated.worksheet.sections
            .slice(1)
            .flatMap((s) => s.exercises)
            .filter((ex) => ex.archetype === "JoinParts")
            .map((ex) => (ex.data as Record<string, any>).responseForm)
        )
      );
      expect(responseForms).toEqual([expectedResponseForm]);

      // Practice: write the missing part2 from the Ten Frame, then draw to check
      const practice1 = generated.worksheet.sections[1].exercises[0]
        .data as Record<string, any>;
      expect(practice1.kind).toBe("JoinParts");
      for (const item of practice1.items) {
        expect(item.unknownPosition).toBe("part2");
        expect(item.total).toBeGreaterThanOrEqual(6);
        expect(item.total).toBeLessThanOrEqual(10);
        expect(item.representationModel.kind).toBe("ten-frame");
        // Label names Total and the given part, never the missing part (§8.1)
        expect(item.representationModel.labelAr).toContain(item.totalAr);
        expect(item.representationModel.labelAr).not.toContain(item.part2Ar);
        expect(item.responseModel.meta.missingPosition).toBe("part2");
      }
      const practice2 = generated.worksheet.sections[1].exercises[1]
        .data as Record<string, any>;
      expect(practice2.action).toBe("draw-counters");
      for (const item of practice2.items) {
        expect(item.unknownPosition).toBe("part2");
        expect(item.representationModel.meta.ghostTargetCount).toBe(item.part2);
      }

      // Challenge: MATCHING - F/G (fill the missing part) + Problem of the Day
      const challenge = generated.worksheet.sections[2].exercises;
      const brainBuilder = challenge.find(
        (ex) => ex.archetype === "ConnectMatch"
      )!;
      const brainBuilderData = brainBuilder.data as Record<string, any>;
      for (const pairData of brainBuilderData.pairs) {
        expect(pairData.rightItem.kind).toBe("ten-frame");
        expect(pairData.leftItem.kind).toBe(
          lessonNum === 86 ? "number-bond" : "equation-strip"
        );
        expect(pairData.leftItem.meta.missingPosition).toBe("part2");
      }
      // The authored blueprint carries the MATCHING - F/G column titles
      const blueprintSpec = getLessonBlueprint(
        `K-${lessonNum}`
      )!.tiers.Advanced.challenge.find(
        (spec) => spec.archetype === "ConnectMatch"
      )!;
      expect(
        (blueprintSpec.params as Record<string, any>).leftColumnTitleAr
      ).toBe(expectedMatchColumnTitle);
      const problemOfDay = challenge.find(
        (ex) => ex.archetype === "JoinParts"
      )!;
      const podData = problemOfDay.data as Record<string, any>;
      // §6.3: the second challenge slot is the non-standard missing part1 edge,
      // written from a frame that still shows the full fact in two runs
      expect(podData.action).toBe("write");
      for (const item of podData.items) {
        expect(item.unknownPosition).toBe("part1");
        expect(item.representationModel.count).toBe(item.part1);
        expect(item.representationModel.secondaryCount).toBe(item.part2);
        expect(item.representationModel.labelAr).toContain("الجزء الثاني");
        expect(item.responseModel.meta.missingPosition).toBe("part1");
      }

      // Easy mode keeps the same anatomy with Easy-tier practice content
      const easy = generateWorksheet({
        grade: "K",
        lessonNumber: lessonNum,
        seed,
        difficultyLevel: "Easy",
      });
      expect(
        easy.worksheet.sections.map((section) => section.exercises.length)
      ).toEqual([1, 2, 2]);
      const easyPractice1 = easy.worksheet.sections[1].exercises[0]
        .data as Record<string, any>;
      for (const item of easyPractice1.items) {
        expect(item.unknownPosition).toBe("part2");
        expect(item.total).toBeLessThanOrEqual(8);
      }
      const easyMatch = easy.worksheet.sections[2].exercises.find(
        (ex) => ex.archetype === "ConnectMatch"
      )!;
      expect((easyMatch.data as Record<string, any>).pairs).toHaveLength(1);
      for (const section of easy.worksheet.sections) {
        for (const ex of section.exercises) {
          expect(easy.answerKey.strategyHintsByExerciseId[ex.id]).toBeTruthy();
        }
      }

      // Warm-up source follows the authored prerequisite chain (§5.3)
      expect(generated.warmUpSourceLessonId).toBe(
        expectedWarmUpSource[lessonNum]
      );
    });

    it(`renders Lesson K-${lessonNum} without Western numerals in worksheet and answer key`, async () => {
      for (const mode of ["worksheet", "answer-key"] as const) {
        const html = renderWorksheetSurface({
          grade: "K",
          lessonNumber: lessonNum,
          seed: `TEST-K${lessonNum}`,
          difficultyLevel: "scaffolded",
          viewMode: mode,
        });
        const western = findWesternNumeralsInRenderedHtml(html);
        expect(
          western,
          `Western numerals found in K-${lessonNum} (${mode})`
        ).toEqual([]);
      }
    });
  }

  it("generates and renders Lesson K-88 with true/false equations to 10 and TEETER TOTS balance scales", () => {
    const seed = "TEST-K88";

    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 88,
      seed,
      difficultyLevel: "scaffolded",
    });

    expect(generated.worksheet.sections).toHaveLength(3);
    expect(generated.answerKey.sections).toHaveLength(3);
    for (const section of generated.worksheet.sections) {
      for (const ex of section.exercises) {
        expect(
          generated.answerKey.strategyHintsByExerciseId[ex.id]
        ).toBeTruthy();
      }
    }
    expect(generated.worksheet.sections.map((s) => s.exercises.length)).toEqual(
      [1, 2, 2]
    );
    expect(generated.warmUpSourceLessonId).toBe(expectedWarmUpSource[88]);

    // Practice: two true/false exercises on addition within 10
    for (const ex of generated.worksheet.sections[1].exercises) {
      const data = ex.data as Record<string, any>;
      expect(data.kind).toBe("JudgeEquality");
      expect(data.operation).toBe("add");
      expect(data.mode).toBe("true-false");
      for (const item of data.rows.flatMap((r: any) => r.items)) {
        expect(item.realTotal).toBeGreaterThanOrEqual(6);
        expect(item.realTotal).toBeLessThanOrEqual(10);
        expect(item.isCorrect).toBe(
          item.part1 + item.part2 === item.shownTotal
        );
      }
    }

    // Challenge: TEETER TOTS balance scales with a number bank, then true/false
    const challenge = generated.worksheet.sections[2].exercises;
    const balance = challenge.find(
      (ex) => (ex.data as Record<string, any>).mode === "balance"
    )!;
    const balanceData = balance.data as Record<string, any>;
    expect(balanceData.numberBank).toBeDefined();
    for (const bankNumber of balanceData.numberBank) {
      expect(bankNumber).toBeGreaterThanOrEqual(1);
      expect(bankNumber).toBeLessThanOrEqual(10);
    }
    for (const item of balanceData.rows.flatMap((r: any) => r.items)) {
      expect(item.rightValue).toBe(item.leftValue);
      expect(balanceData.numberBank).toContain(item.solutionValue);
    }

    const easy = generateWorksheet({
      grade: "K",
      lessonNumber: 88,
      seed,
      difficultyLevel: "Easy",
    });
    expect(
      easy.worksheet.sections.map((section) => section.exercises.length)
    ).toEqual([1, 2, 2]);
    for (const section of easy.worksheet.sections) {
      for (const ex of section.exercises) {
        expect(easy.answerKey.strategyHintsByExerciseId[ex.id]).toBeTruthy();
      }
    }

    for (const mode of ["worksheet", "answer-key"] as const) {
      const html = renderWorksheetSurface({
        grade: "K",
        lessonNumber: 88,
        seed,
        difficultyLevel: "scaffolded",
        viewMode: mode,
      });
      const western = findWesternNumeralsInRenderedHtml(html);
      expect(western, `Western numerals found in K-88 (${mode})`).toEqual([]);
    }
  });
});
