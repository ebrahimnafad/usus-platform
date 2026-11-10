import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "@/lib/seed";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { getLessonBlueprint } from "@/blueprints/registry";
import { getExerciseArchetype } from "@/archetypes/registry";
import type { TakeAwayData } from "@/lib/part-whole-facts";
import type { JudgeEqualityData } from "@/archetypes/judge-equality";
import "@/registry/bootstrap";

type AnyData = Record<string, any>;

const buildArchetype = async (
  archetypeId: "TakeAway" | "ConnectMatch" | "JudgeEquality",
  lessonNumber: number
) => {
  const { getCurriculumCatalog } = await import("@/curriculum/catalog");
  return {
    def: getExerciseArchetype(archetypeId),
    lesson: getCurriculumCatalog().getLesson("K", lessonNumber)!,
  };
};

describe("Ticket 02 (Unit 8) — Slice 1: K-91 unknown part with number bonds", () => {
  it("TakeAway ten-frame practice items cross off the taken-away part and solve the bond's part2", async () => {
    const { def, lesson } = await buildArchetype("TakeAway", 91);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-91",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K91-BOND-1"),
      spec: {
        archetype: "TakeAway",
        params: {
          representation: "ten-frame",
          responseForm: "number-bond",
          action: "write",
          crossOffMode: "shown",
          totalRange: [6, 10],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const data = ex.data as TakeAwayData;
    expect(data.kind).toBe("TakeAway");
    expect(data.representation).toBe("ten-frame");
    expect(data.responseForm).toBe("number-bond");
    expect(data.items).toHaveLength(2);
    const factKeys = new Set<string>();
    for (const item of data.items) {
      // Domain invariant: Total − Part = Missing Part (§7.4)
      expect(item.total - item.partTakenAway).toBe(item.missingPart);
      expect(item.total).toBeGreaterThanOrEqual(6);
      expect(item.total).toBeLessThanOrEqual(10);
      expect(item.missingPart).toBeGreaterThanOrEqual(1);
      factKeys.add(item.factKey);
      // §7.3: no fact repeats within one exercise
      const frame = item.representationModel!;
      expect(frame.kind).toBe("ten-frame");
      expect(frame.crossedOutCount).toBe(item.partTakenAway);
      expect((frame.meta as AnyData).crossOffMode).toBe("shown");
      const bond = item.responseModel!;
      expect(bond.kind).toBe("number-bond");
      expect((bond.meta as AnyData).missingPosition).toBe("part2");
      expect((bond.meta as AnyData).part1).toBe(item.partTakenAway);
      expect((bond.meta as AnyData).part2).toBe(item.missingPart);
    }
    expect(factKeys.size).toBe(data.items.length);

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-visual-model="ten-frame"');
    expect(htmlW).toContain('data-crossed-out-cell="true"');
    expect(htmlW).toContain('data-missing-position="part2"');
    expect(htmlA).toContain("data-solved-bond-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("MATCHING A pairs a crossed-off ten frame with a bond missing its part2 under subtraction", async () => {
    const { def, lesson } = await buildArchetype("ConnectMatch", 91);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-91",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCHING-A-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "ten-frame-to-bond",
          operation: "subtract",
          totalRange: [6, 10],
          minPart: 1,
          pairCount: 2,
          rightColumnTitleAr: "لوحة العشرة",
          leftColumnTitleAr: "رابطة الأعداد",
        },
      },
    });

    const data = ex.data as AnyData;
    expect(data.kind).toBe("ConnectMatch");
    expect(data.pairs).toHaveLength(2);
    for (const pairData of data.pairs) {
      const right = pairData.rightItem as AnyData;
      const left = pairData.leftItem as AnyData;
      expect(right.kind).toBe("ten-frame");
      expect(right.count).toBe(left.meta.total);
      expect(right.crossedOutCount).toBe(left.meta.part1);
      expect(left.kind).toBe("number-bond");
      expect(left.meta.missingPosition).toBe("part2");
      expect(left.meta.part1 + left.meta.part2).toBe(left.meta.total);
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-visual-model="ten-frame"');
    expect(htmlW).toContain('data-visual-model="number-bond"');
    expect(htmlA).toContain("data-solved-connection=");
    expect(htmlA).toContain("data-solved-bond-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("generates and renders Lesson K-91 with K-87 bridging warm-up, bond practice, MATCHING A, and the imagine-and-draw PotD", () => {
    const seed = "TEST-K91";

    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 91,
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

    // §5.3: the warm-up draws from the first authored prerequisite (K-87,
    // the addition missing-part lesson — bridges addition → subtraction)
    expect(generated.warmUpSourceLessonId).toBe("K-87");
    expect(generated.worksheet.sections[0].exercises[0].archetype).toBe(
      "JoinParts"
    );

    // §5.2 anatomy: Warm-Up 1, Practice 2, Challenge 2
    expect(generated.worksheet.sections.map((s) => s.exercises.length)).toEqual(
      [1, 2, 2]
    );

    // Practice: both exercises write the missing part2 of a Number Bond
    for (const ex of generated.worksheet.sections[1].exercises) {
      const data = ex.data as TakeAwayData;
      expect(data.kind).toBe("TakeAway");
      expect(data.responseForm).toBe("number-bond");
      for (const item of data.items) {
        expect(item.total - item.partTakenAway).toBe(item.missingPart);
        expect(item.total).toBeGreaterThanOrEqual(6);
        expect(item.total).toBeLessThanOrEqual(10);
        expect(item.representationModel!.kind).toBe("ten-frame");
        expect(item.representationModel!.crossedOutCount).toBe(
          item.partTakenAway
        );
        expect((item.responseModel!.meta as AnyData).missingPosition).toBe(
          "part2"
        );
      }
    }

    // Challenge: MATCHING A (Brain Builder) then the imagine-and-draw PotD
    const challenge = generated.worksheet.sections[2].exercises;
    const matchEx = challenge.find((ex) => ex.archetype === "ConnectMatch")!;
    for (const pairData of (matchEx.data as AnyData).pairs) {
      expect(pairData.rightItem.kind).toBe("ten-frame");
      expect(pairData.leftItem.kind).toBe("number-bond");
      expect(pairData.leftItem.meta.missingPosition).toBe("part2");
    }
    const blueprintSpec = getLessonBlueprint(
      "K-91"
    )!.tiers.Intermediate.challenge.find(
      (spec) => spec.archetype === "ConnectMatch"
    )!;
    expect((blueprintSpec.params as AnyData).leftColumnTitleAr).toBe(
      "رابطة الأعداد"
    );
    const pod = challenge.find((ex) => ex.archetype === "TakeAway")!;
    const podData = pod.data as TakeAwayData;
    expect(podData.action).toBe("draw-and-cross-off");
    for (const item of podData.items) {
      // §5.5 static adaptation: the frame is pre-filled with the imagined
      // Total; the child crosses off the given Part themselves (student mode)
      const frame = item.representationModel!;
      expect(frame.kind).toBe("ten-frame");
      expect(frame.count).toBe(item.total);
      expect((frame.meta as AnyData).crossOffMode).toBe("student");
      expect(frame.crossedOutCount).toBe(item.partTakenAway);
      expect(item.responseModel!.kind).toBe("number-bond");
      expect((item.responseModel!.meta as AnyData).missingPosition).toBe(
        "part2"
      );
    }
    // The answer key shows the drawn X in the accent style (§8.2)
    const podKeyHtml = renderToStaticMarkup(
      getExerciseArchetype("TakeAway")!.render({
        exercise: pod,
        mode: "answer-key",
      })
    );
    expect(podKeyHtml).toContain('data-solved-cross-off="true"');

    // Easy mode keeps the anatomy with Easy-tier totals (§6.2)
    const easy = generateWorksheet({
      grade: "K",
      lessonNumber: 91,
      seed,
      difficultyLevel: "Easy",
    });
    const easyPractice = easy.worksheet.sections[1].exercises[0]
      .data as TakeAwayData;
    expect(easyPractice.items.every((item) => item.total <= 8)).toBe(true);
    const easyMatch = easy.worksheet.sections[2].exercises.find(
      (ex) => ex.archetype === "ConnectMatch"
    )!;
    expect((easyMatch.data as AnyData).pairs).toHaveLength(1);
    for (const section of easy.worksheet.sections) {
      for (const ex of section.exercises) {
        expect(easy.answerKey.strategyHintsByExerciseId[ex.id]).toBeTruthy();
      }
    }

    // No Western numerals anywhere on either surface
    for (const mode of ["worksheet", "answer-key"] as const) {
      const html = renderWorksheetSurface({
        grade: "K",
        lessonNumber: 91,
        seed,
        difficultyLevel: "scaffolded",
        viewMode: mode,
      });
      const western = findWesternNumeralsInRenderedHtml(html);
      expect(western, `Western numerals found in K-91 (${mode})`).toEqual([]);
    }
  });
});

describe("Ticket 02 (Unit 8) — Slice 2: K-92 unknown part with equations", () => {
  it("TakeAway ten-frame equation practice items solve the subtraction equation's part2", async () => {
    const { def, lesson } = await buildArchetype("TakeAway", 92);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-92",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K92-EQ-1"),
      spec: {
        archetype: "TakeAway",
        params: {
          representation: "ten-frame",
          responseForm: "equation",
          action: "write",
          crossOffMode: "shown",
          totalRange: [6, 10],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const data = ex.data as TakeAwayData;
    expect(data.kind).toBe("TakeAway");
    expect(data.representation).toBe("ten-frame");
    expect(data.responseForm).toBe("equation");
    const factKeys = new Set<string>();
    for (const item of data.items) {
      expect(item.total - item.partTakenAway).toBe(item.missingPart);
      expect(item.total).toBeGreaterThanOrEqual(6);
      expect(item.total).toBeLessThanOrEqual(10);
      factKeys.add(item.factKey);
      expect(item.representationModel!.kind).toBe("ten-frame");
      expect(item.representationModel!.crossedOutCount).toBe(
        item.partTakenAway
      );
      const eq = item.responseModel!;
      expect(eq.kind).toBe("equation-strip");
      expect((eq.meta as AnyData).operation).toBe("subtract");
      expect((eq.meta as AnyData).missingPosition).toBe("part2");
      expect((eq.meta as AnyData).part1).toBe(item.partTakenAway);
      expect((eq.meta as AnyData).part2).toBe(item.missingPart);
      expect((eq.meta as AnyData).total).toBe(item.total);
    }
    expect(factKeys.size).toBe(data.items.length);

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-visual-model="equation-strip"');
    expect(htmlW).toContain("−"); // U+2212, never a hyphen (§9.3)
    expect(htmlW).toContain('data-missing-position="part2"');
    expect(htmlA).toContain("data-solved-equation-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("MATCHING B pairs a crossed-off ten frame with a subtraction equation missing its part2", async () => {
    const { def, lesson } = await buildArchetype("ConnectMatch", 92);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-92",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("MATCHING-B-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "ten-frame-to-equation",
          operation: "subtract",
          totalRange: [6, 10],
          minPart: 1,
          pairCount: 2,
          rightColumnTitleAr: "لوحة العشرة",
          leftColumnTitleAr: "معادلة الطرح",
        },
      },
    });

    const data = ex.data as AnyData;
    expect(data.pairs).toHaveLength(2);
    for (const pairData of data.pairs) {
      const right = pairData.rightItem as AnyData;
      const left = pairData.leftItem as AnyData;
      expect(right.kind).toBe("ten-frame");
      expect(right.count).toBe(left.meta.total);
      expect(right.crossedOutCount).toBe(left.meta.part1);
      expect(left.kind).toBe("equation-strip");
      expect((left.meta as AnyData).operation).toBe("subtract");
      expect(left.meta.missingPosition).toBe("part2");
      expect(left.meta.part1 + left.meta.part2).toBe(left.meta.total);
    }

    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlA).toContain("data-solved-connection=");
    expect(htmlA).toContain("data-solved-equation-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("generates and renders Lesson K-92 with a K-91 TakeAway-bond warm-up, equation practice, and MATCHING B", () => {
    const seed = "TEST-K92";

    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 92,
      seed,
      difficultyLevel: "scaffolded",
    });

    expect(generated.worksheet.sections).toHaveLength(3);
    for (const section of generated.worksheet.sections) {
      for (const ex of section.exercises) {
        expect(
          generated.answerKey.strategyHintsByExerciseId[ex.id]
        ).toBeTruthy();
      }
    }

    // §5.3: the warm-up draws K-91's Easy TakeAway bond (bonds → equations)
    expect(generated.warmUpSourceLessonId).toBe("K-91");
    const warmUpData = generated.worksheet.sections[0].exercises[0]
      .data as TakeAwayData;
    expect(warmUpData.kind).toBe("TakeAway");
    expect(warmUpData.responseForm).toBe("number-bond");

    expect(generated.worksheet.sections.map((s) => s.exercises.length)).toEqual(
      [1, 2, 2]
    );

    // Practice: both exercises complete a subtraction equation
    for (const ex of generated.worksheet.sections[1].exercises) {
      const data = ex.data as TakeAwayData;
      expect(data.kind).toBe("TakeAway");
      expect(data.responseForm).toBe("equation");
      for (const item of data.items) {
        expect(item.total - item.partTakenAway).toBe(item.missingPart);
        expect(item.total).toBeGreaterThanOrEqual(6);
        expect(item.total).toBeLessThanOrEqual(10);
        expect(item.representationModel!.kind).toBe("ten-frame");
        expect((item.responseModel!.meta as AnyData).missingPosition).toBe(
          "part2"
        );
      }
    }

    // Challenge: MATCHING B (Brain Builder) then the imagine-and-draw PotD
    const challenge = generated.worksheet.sections[2].exercises;
    const matchEx = challenge.find((ex) => ex.archetype === "ConnectMatch")!;
    const matchData = matchEx.data as AnyData;
    expect(matchData.rightColumnTitleAr).toBe("لوحة العشرة");
    for (const pairData of matchData.pairs) {
      expect(pairData.rightItem.kind).toBe("ten-frame");
      expect(pairData.leftItem.kind).toBe("equation-strip");
      expect(pairData.leftItem.meta.missingPosition).toBe("part2");
    }
    const pod = challenge.find((ex) => ex.archetype === "TakeAway")!;
    expect((pod.data as TakeAwayData).action).toBe("draw-and-cross-off");

    // Easy mode keeps Easy-tier totals (§6.2)
    const easy = generateWorksheet({
      grade: "K",
      lessonNumber: 92,
      seed,
      difficultyLevel: "Easy",
    });
    const easyPractice = easy.worksheet.sections[1].exercises[0]
      .data as TakeAwayData;
    expect(easyPractice.items.every((item) => item.total <= 8)).toBe(true);

    for (const mode of ["worksheet", "answer-key"] as const) {
      const html = renderWorksheetSurface({
        grade: "K",
        lessonNumber: 92,
        seed,
        difficultyLevel: "scaffolded",
        viewMode: mode,
      });
      const western = findWesternNumeralsInRenderedHtml(html);
      expect(western, `Western numerals found in K-92 (${mode})`).toEqual([]);
    }
  });
});

describe("Ticket 02 (Unit 8) — Slice 3: K-93 balance equations with subtraction", () => {
  it("true-false subtraction items judge the equation value with صحيح/خطأ circled in the answer key", async () => {
    const { def, lesson } = await buildArchetype("JudgeEquality", 93);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-93",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K93-TF-1"),
      spec: {
        archetype: "JudgeEquality",
        params: {
          operation: "subtract",
          mode: "true-false",
          modelKind: "equation",
          rowCount: 1,
          itemCount: 3,
          minPart: 1,
          totalRange: [6, 10],
        },
      },
    });

    const data = ex.data as JudgeEqualityData;
    expect(data.kind).toBe("JudgeEquality");
    expect(data.operation).toBe("subtract");
    expect(data.mode).toBe("true-false");
    const items = data.rows.flatMap((r) => r.items);
    expect(items).toHaveLength(3);
    expect(items.every((i) => i.realTotal >= 6 && i.realTotal <= 10)).toBe(
      true
    );
    expect(items.some((i) => i.isCorrect)).toBe(true);
    expect(items.some((i) => !i.isCorrect)).toBe(true);
    for (const item of items) {
      // Domain invariant: the equation is true exactly when the shown
      // subtraction holds (Total − Part = shown Missing Part)
      expect(item.isCorrect).toBe(item.realTotal - item.part1 === item.part2);
      if (!item.isCorrect) {
        expect(item.explanationAr).toContain("وليس");
      }
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-judge-mode="true-false"');
    expect(htmlW).toContain("−"); // U+2212 (§9.3)
    expect(htmlW).not.toContain("data-circled-choice=");
    expect(htmlA).toContain("data-circled-choice=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("TEETER TOTS balances a subtraction expression against the number bank", async () => {
    const { def, lesson } = await buildArchetype("JudgeEquality", 93);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-93",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K93-BAL-1"),
      spec: {
        archetype: "JudgeEquality",
        params: {
          operation: "subtract",
          mode: "balance",
          modelKind: "balance-scale",
          rowCount: 1,
          itemCount: 2,
          minPart: 1,
          totalRange: [6, 10],
        },
      },
    });

    const data = ex.data as JudgeEqualityData;
    expect(data.mode).toBe("balance");
    expect(data.numberBank).toBeDefined();
    const items = data.rows.flatMap((r) => r.items);
    expect(items).toHaveLength(2);
    for (const item of items) {
      expect(item.rightValue).toBe(item.leftValue);
      expect(item.realTotal).toBeGreaterThanOrEqual(6);
      expect(item.realTotal).toBeLessThanOrEqual(10);
      expect(data.numberBank).toContain(item.solutionValue);
      expect(data.numberBank).toContain(item.secondarySolutionValue);
      // One pan carries the subtraction expression; the slot pan solves it
      const rightPan = (item.model.meta as AnyData).rightPan as AnyData;
      const leftPan = (item.model.meta as AnyData).leftPan as AnyData;
      const pans = [rightPan, leftPan];
      expect(pans.filter((p) => p.kind === "expression")).toHaveLength(1);
      expect(pans.filter((p) => p.kind === "slot")).toHaveLength(1);
      const exprPan = pans.find((p) => p.kind === "expression")!;
      expect(exprPan.expressionAr).toContain("−");
      expect(exprPan.missingTerm.operation).toBe("subtract");
      // The expression pan renders «الكلّ − ؟» (or «؟ − الجزء» for the
      // total-first layout); its missing term is solved from the bank
      expect(exprPan.missingTerm.missingValue).toBe(
        item.secondarySolutionValue
      );
      expect(exprPan.value).toBe(item.solutionValue);
      // The rendered model is the Balance Scale (§3.4: 212 × 136 px)
      expect(item.model.kind).toBe("balance-scale");
    }
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

  it("the PotD matches a subtraction expression with an addition expression of the same value at Advanced", async () => {
    const { def, lesson } = await buildArchetype("JudgeEquality", 93);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-93",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("K93-TWO-PANS-1"),
      spec: {
        archetype: "JudgeEquality",
        params: {
          operation: "subtract",
          mode: "balance",
          modelKind: "balance-scale",
          rowCount: 1,
          itemCount: 2,
          minPart: 1,
          totalRange: [6, 10],
          twoExpressionPans: true,
        },
      },
    });

    const data = ex.data as JudgeEqualityData;
    const items = data.rows.flatMap((r) => r.items);
    for (const item of items) {
      const rightPan = (item.model.meta as AnyData).rightPan as AnyData;
      const leftPan = (item.model.meta as AnyData).leftPan as AnyData;
      expect(rightPan.kind).toBe("expression");
      expect(leftPan.kind).toBe("expression");
      const subtractPan = [rightPan, leftPan].find((p) =>
        (p.expressionAr as string).includes("−")
      )!;
      const addPan = [rightPan, leftPan].find((p) =>
        (p.expressionAr as string).includes("+")
      )!;
      expect(subtractPan.missingTerm.operation).toBe("subtract");
      expect(addPan.missingTerm.operation).toBe("add");
      expect(subtractPan.value).toBe(addPan.value);
      expect(data.numberBank).toContain(item.solutionValue);
      expect(data.numberBank).toContain(item.secondarySolutionValue!);
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
  });

  it("generates and renders Lesson K-93 with a K-92 TakeAway-equation warm-up, true/false practice, and TEETER TOTS", () => {
    const seed = "TEST-K93";

    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 93,
      seed,
      difficultyLevel: "scaffolded",
    });

    expect(generated.worksheet.sections).toHaveLength(3);
    for (const section of generated.worksheet.sections) {
      for (const ex of section.exercises) {
        expect(
          generated.answerKey.strategyHintsByExerciseId[ex.id]
        ).toBeTruthy();
      }
    }

    // §5.3: the warm-up draws K-92's Easy TakeAway equation
    expect(generated.warmUpSourceLessonId).toBe("K-92");
    const warmUpData = generated.worksheet.sections[0].exercises[0]
      .data as TakeAwayData;
    expect(warmUpData.kind).toBe("TakeAway");
    expect(warmUpData.responseForm).toBe("equation");

    expect(generated.worksheet.sections.map((s) => s.exercises.length)).toEqual(
      [1, 2, 2]
    );

    // Practice: two true/false exercises on subtraction within 10
    for (const ex of generated.worksheet.sections[1].exercises) {
      const data = ex.data as JudgeEqualityData;
      expect(data.kind).toBe("JudgeEquality");
      expect(data.operation).toBe("subtract");
      expect(data.mode).toBe("true-false");
      for (const item of data.rows.flatMap((r) => r.items)) {
        expect(item.realTotal).toBeGreaterThanOrEqual(6);
        expect(item.realTotal).toBeLessThanOrEqual(10);
        expect(item.isCorrect).toBe(item.realTotal - item.part1 === item.part2);
      }
    }

    // Challenge: TEETER TOTS balance (Brain Builder) then true/false again
    const challenge = generated.worksheet.sections[2].exercises;
    const balanceEx = challenge.find(
      (ex) =>
        ex.archetype === "JudgeEquality" &&
        (ex.data as JudgeEqualityData).mode === "balance"
    )!;
    expect(balanceEx).toBeDefined();
    const balanceData = balanceEx.data as JudgeEqualityData;
    expect(balanceData.numberBank).toBeDefined();
    for (const item of balanceData.rows.flatMap((r) => r.items)) {
      expect(item.rightValue).toBe(item.leftValue);
      expect((item.model.meta as AnyData).rightPan).toBeDefined();
    }
    const blueprintSpec = getLessonBlueprint(
      "K-93"
    )!.tiers.Intermediate.challenge.find(
      (spec) =>
        spec.archetype === "JudgeEquality" &&
        (spec.params as AnyData).mode === "balance"
    )!;
    expect((blueprintSpec.params as AnyData).modelKind).toBe("balance-scale");

    // Easy mode keeps Easy-tier totals (§6.2)
    const easy = generateWorksheet({
      grade: "K",
      lessonNumber: 93,
      seed,
      difficultyLevel: "Easy",
    });
    for (const ex of easy.worksheet.sections[1].exercises) {
      const data = ex.data as JudgeEqualityData;
      for (const item of data.rows.flatMap((r) => r.items)) {
        expect(item.realTotal).toBeLessThanOrEqual(8);
      }
    }

    for (const mode of ["worksheet", "answer-key"] as const) {
      const html = renderWorksheetSurface({
        grade: "K",
        lessonNumber: 93,
        seed,
        difficultyLevel: "scaffolded",
        viewMode: mode,
      });
      const western = findWesternNumeralsInRenderedHtml(html);
      expect(western, `Western numerals found in K-93 (${mode})`).toEqual([]);
    }
  });
});
