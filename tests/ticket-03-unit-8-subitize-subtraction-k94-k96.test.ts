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
  archetypeId: "TakeAway" | "JudgeEquality",
  lessonNumber: number
) => {
  const { getCurriculumCatalog } = await import("@/curriculum/catalog");
  return {
    def: getExerciseArchetype(archetypeId),
    lesson: getCurriculumCatalog().getLesson("K", lessonNumber)!,
  };
};

describe("Ticket 03 (Unit 8) — Slice 1: K-94 subitize counters in ten frames", () => {
  it("TakeAway ten-frame-and-digit answer-slot practice shows the digit part and solves كم بقي؟", async () => {
    const { def, lesson } = await buildArchetype("TakeAway", 94);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-94",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K94-SLOT-1"),
      spec: {
        archetype: "TakeAway",
        params: {
          representation: "ten-frame-and-digit",
          responseForm: "answer-slot",
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
    expect(data.representation).toBe("ten-frame-and-digit");
    expect(data.responseForm).toBe("answer-slot");
    expect(data.action).toBe("write");
    expect(data.items).toHaveLength(2);
    const factKeys = new Set<string>();
    for (const item of data.items) {
      // Domain invariant: Total − Part = Missing Part (§7.4)
      expect(item.total - item.partTakenAway).toBe(item.missingPart);
      expect(item.total).toBeGreaterThanOrEqual(6);
      expect(item.total).toBeLessThanOrEqual(10);
      factKeys.add(item.factKey);
      // The frame shows the Total counters with the X pre-drawn (shown mode)
      const frame = item.representationModel!;
      expect(frame.kind).toBe("ten-frame");
      expect(frame.count).toBe(item.total);
      expect(frame.crossedOutCount).toBe(item.partTakenAway);
      expect((frame.meta as AnyData).crossOffMode).toBe("shown");
      // The digit card is the given Part taken away (the subtrahend digit)
      const digitCard = item.companionDigitModel!;
      expect(digitCard.kind).toBe("digit-card");
      expect((digitCard as AnyData).digit).toBe(item.partTakenAway);
    }
    // §7.3: no fact repeats within one exercise
    expect(factKeys.size).toBe(data.items.length);

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-visual-model="ten-frame"');
    expect(htmlW).toContain('data-cross-off-mode="shown"');
    expect(htmlW).toContain('data-crossed-out-cell="true"');
    expect(htmlW).toContain('data-visual-model="digit-card"');
    expect(htmlW).toContain('data-take-away-slot-box="true"');
    expect(htmlW).toContain("كم بقي؟");
    expect(htmlA).toContain("data-solved-take-away=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("Advanced practice withdraws the X (student cross-off) and the answer key solves it in the accent style", async () => {
    const { def, lesson } = await buildArchetype("TakeAway", 94);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-94",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("K94-STUDENT-1"),
      spec: {
        archetype: "TakeAway",
        params: {
          representation: "ten-frame-and-digit",
          responseForm: "answer-slot",
          action: "write",
          crossOffMode: "student",
          totalRange: [6, 10],
          minPart: 0,
          itemCount: 2,
        },
      },
    });

    const data = ex.data as TakeAwayData;
    expect(data.items).toHaveLength(2);
    for (const item of data.items) {
      expect(item.total - item.partTakenAway).toBe(item.missingPart);
      expect(item.total).toBeGreaterThanOrEqual(6);
      expect(item.total).toBeLessThanOrEqual(10);
      // §6.3: 0 is allowed as a Part at Advanced (incl. partTakenAway = 0)
      expect(item.partTakenAway).toBeGreaterThanOrEqual(0);
      expect(item.missingPart).toBeGreaterThanOrEqual(0);
      expect(item.crossOffMode).toBe("student");
      expect((item.representationModel!.meta as AnyData).crossOffMode).toBe(
        "student"
      );
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    // Worksheet: the X is withdrawn; the child crosses off the digit themselves
    expect(htmlW).toContain('data-cross-off-mode="student"');
    expect(htmlW).not.toContain('data-crossed-out-cell="true"');
    // Answer key: the drawn X appears in the accent style (§8.2)
    expect(htmlA).toContain('data-crossed-out-cell="true"');
    expect(htmlA).toContain('data-solved-cross-off="true"');
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("WHAT'S WRONG A marks exactly one not-true equation per row with correct truth values", async () => {
    const { def, lesson } = await buildArchetype("JudgeEquality", 94);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-94",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("K94-WW-1"),
      spec: {
        archetype: "JudgeEquality",
        params: {
          operation: "subtract",
          mode: "whats-wrong",
          modelKind: "equation",
          rowCount: 1,
          itemCount: 3,
          minPart: 0,
          totalRange: [6, 10],
        },
      },
    });

    const data = ex.data as JudgeEqualityData;
    expect(data.kind).toBe("JudgeEquality");
    expect(data.operation).toBe("subtract");
    expect(data.mode).toBe("whats-wrong");
    expect(data.modelKind).toBe("equation");
    const items = data.rows.flatMap((r) => r.items);
    expect(items).toHaveLength(3);
    // Exactly one NOT-true equation per row (the one to cross off)
    expect(items.filter((i) => !i.isCorrect)).toHaveLength(1);
    // §7.3: no fact repeats within one exercise
    expect(new Set(items.map((i) => `${i.realTotal}-${i.part1}`)).size).toBe(
      items.length
    );
    for (const item of items) {
      // Domain invariant: the item is NOT true exactly when the shown
      // subtraction fails (Total − Part ≠ shown Missing Part)
      expect(item.isCorrect).toBe(item.realTotal - item.part1 === item.part2);
      expect(item.realTotal).toBeGreaterThanOrEqual(6);
      expect(item.realTotal).toBeLessThanOrEqual(10);
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-judge-mode="whats-wrong"');
    expect(htmlW).toContain('data-model-kind="equation"');
    expect(htmlW).toContain("−"); // U+2212, never a hyphen (§9.3)
    // The worksheet shows no marking; the answer key crosses off the wrong one
    expect(htmlW).not.toContain("data-crossed-off");
    expect(htmlA.split('data-crossed-off="true"')).toHaveLength(2);
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("generates and renders Lesson K-94 with a K-92 TakeAway-equation warm-up, answer-slot practice, WHAT'S WRONG A, and the PotD", () => {
    const seed = "TEST-K94";

    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 94,
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

    // §5.3: the warm-up draws K-92's Easy TakeAway equation (§6.2)
    expect(generated.warmUpSourceLessonId).toBe("K-92");
    const warmUpData = generated.worksheet.sections[0].exercises[0]
      .data as TakeAwayData;
    expect(warmUpData.kind).toBe("TakeAway");
    expect(warmUpData.responseForm).toBe("equation");

    // §5.2 anatomy: Warm-Up 1, Practice 2, Challenge 2
    expect(generated.worksheet.sections.map((s) => s.exercises.length)).toEqual(
      [1, 2, 2]
    );

    // Practice (Intermediate tier): subitize the counters, X pre-drawn, write
    for (const ex of generated.worksheet.sections[1].exercises) {
      const data = ex.data as TakeAwayData;
      expect(data.kind).toBe("TakeAway");
      expect(data.representation).toBe("ten-frame-and-digit");
      expect(data.responseForm).toBe("answer-slot");
      expect(data.action).toBe("write");
      const factKeys = new Set<string>();
      for (const item of data.items) {
        expect(item.total - item.partTakenAway).toBe(item.missingPart);
        expect(item.total).toBeGreaterThanOrEqual(6);
        expect(item.total).toBeLessThanOrEqual(10);
        expect(item.crossOffMode).toBe("shown");
        expect(item.representationModel!.crossedOutCount).toBe(
          item.partTakenAway
        );
        expect((item.companionDigitModel as AnyData).digit).toBe(
          item.partTakenAway
        );
        factKeys.add(item.factKey);
      }
      expect(factKeys.size).toBe(data.items.length);
    }

    // Challenge: WHAT'S WRONG A (Brain Builder) then the imagine-and-cross-off PotD
    const challenge = generated.worksheet.sections[2].exercises;
    const bb = challenge.find((ex) => ex.archetype === "JudgeEquality")!;
    const bbData = bb.data as JudgeEqualityData;
    expect(bbData.mode).toBe("whats-wrong");
    expect(bbData.modelKind).toBe("equation");
    expect(bbData.operation).toBe("subtract");
    for (const item of bbData.rows.flatMap((r) => r.items)) {
      expect(item.realTotal).toBeGreaterThanOrEqual(6);
      expect(item.realTotal).toBeLessThanOrEqual(10);
      expect(item.isCorrect).toBe(item.realTotal - item.part1 === item.part2);
    }
    const blueprintSpec = getLessonBlueprint(
      "K-94"
    )!.tiers.Advanced.challenge.find(
      (spec) => spec.archetype === "JudgeEquality"
    )!;
    expect((blueprintSpec.params as AnyData).modelKind).toBe("equation");
    expect((blueprintSpec.params as AnyData).mode).toBe("whats-wrong");
    const potd = challenge.find((ex) => ex.archetype === "TakeAway")!;
    const potdData = potd.data as TakeAwayData;
    expect(potdData.responseForm).toBe("answer-slot");
    for (const item of potdData.items) {
      // §5.5 static adaptation: the frame is pre-filled with the imagined
      // Total; the child crosses off the digit's Part themselves (student mode)
      expect(item.crossOffMode).toBe("student");
      expect((item.representationModel!.meta as AnyData).crossOffMode).toBe(
        "student"
      );
    }
    // The answer key shows the drawn X in the accent style (§8.2)
    const potdKeyHtml = renderToStaticMarkup(
      getExerciseArchetype("TakeAway")!.render({
        exercise: potd,
        mode: "answer-key",
      })
    );
    expect(potdKeyHtml).toContain('data-solved-cross-off="true"');

    // Easy mode: trace response and Easy-tier totals (§6.2 cross-off table)
    const easy = generateWorksheet({
      grade: "K",
      lessonNumber: 94,
      seed,
      difficultyLevel: "Easy",
    });
    const easyPractice = easy.worksheet.sections[1].exercises[0]
      .data as TakeAwayData;
    expect(easyPractice.action).toBe("trace");
    expect(
      easyPractice.items.every((item) => item.crossOffMode === "shown")
    ).toBe(true);
    expect(easyPractice.items.every((item) => item.total <= 8)).toBe(true);
    const easyBB = easy.worksheet.sections[2].exercises.find(
      (ex) => ex.archetype === "JudgeEquality"
    )!;
    for (const item of (easyBB.data as JudgeEqualityData).rows.flatMap(
      (r) => r.items
    )) {
      expect(item.realTotal).toBeLessThanOrEqual(8);
    }

    // Advanced mode: the X is withdrawn (student) on the main practice line,
    // and the second exercise carries the partTakenAway edge case (§6.3)
    const advanced = generateWorksheet({
      grade: "K",
      lessonNumber: 94,
      seed,
      difficultyLevel: "Advanced",
    });
    const advMain = advanced.worksheet.sections[1].exercises[0]
      .data as TakeAwayData;
    expect(advMain.action).toBe("write");
    expect(advMain.items.every((item) => item.crossOffMode === "student")).toBe(
      true
    );
    const advEdge = advanced.worksheet.sections[1].exercises[1]
      .data as TakeAwayData;
    expect(advEdge.responseForm).toBe("equation");
    expect(
      advEdge.items.every((item) => item.unknownKind === "partTakenAway")
    ).toBe(true);
    expect(
      advEdge.items.every(
        (item) => item.total >= 6 && item.total <= 9 && item.partTakenAway >= 1
      )
    ).toBe(true);

    // No Western numerals anywhere on either surface
    for (const mode of ["worksheet", "answer-key"] as const) {
      const html = renderWorksheetSurface({
        grade: "K",
        lessonNumber: 94,
        seed,
        difficultyLevel: "scaffolded",
        viewMode: mode,
      });
      const western = findWesternNumeralsInRenderedHtml(html);
      expect(western, `Western numerals found in K-94 (${mode})`).toEqual([]);
    }
  });
});

describe("Ticket 03 (Unit 8) — Slice 2: K-95 subitize subtraction number bonds", () => {
  it("TakeAway ten-frame bond practice crosses off the given part and solves the bond's part2", async () => {
    const { def, lesson } = await buildArchetype("TakeAway", 95);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-95",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K95-BOND-1"),
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
      factKeys.add(item.factKey);
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
    // §7.3: no fact repeats within one exercise
    expect(factKeys.size).toBe(data.items.length);

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-visual-model="ten-frame"');
    expect(htmlW).toContain('data-crossed-out-cell="true"');
    expect(htmlW).toContain('data-visual-model="number-bond"');
    expect(htmlW).toContain('data-missing-position="part2"');
    expect(htmlA).toContain("data-solved-bond-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("WHAT'S WRONG B marks exactly one not-true number bond per row", async () => {
    const { def, lesson } = await buildArchetype("JudgeEquality", 95);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-95",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("K95-WW-1"),
      spec: {
        archetype: "JudgeEquality",
        params: {
          operation: "subtract",
          mode: "whats-wrong",
          modelKind: "number-bond",
          rowCount: 1,
          itemCount: 3,
          minPart: 0,
          totalRange: [6, 10],
        },
      },
    });

    const data = ex.data as JudgeEqualityData;
    expect(data.kind).toBe("JudgeEquality");
    expect(data.operation).toBe("subtract");
    expect(data.mode).toBe("whats-wrong");
    expect(data.modelKind).toBe("number-bond");
    const items = data.rows.flatMap((r) => r.items);
    expect(items).toHaveLength(3);
    // Exactly one NOT-true bond per row (the one to cross off)
    expect(items.filter((i) => !i.isCorrect)).toHaveLength(1);
    // §7.3: no fact repeats within one exercise
    expect(new Set(items.map((i) => `${i.realTotal}-${i.part1}`)).size).toBe(
      items.length
    );
    for (const item of items) {
      // Domain invariant: the bond is NOT true exactly when its shown parts
      // do not compose the Total
      expect(item.isCorrect).toBe(item.realTotal - item.part1 === item.part2);
      expect(item.realTotal).toBeGreaterThanOrEqual(6);
      expect(item.realTotal).toBeLessThanOrEqual(10);
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-judge-mode="whats-wrong"');
    expect(htmlW).toContain('data-model-kind="number-bond"');
    expect(htmlW).toContain('data-visual-model="number-bond"');
    // The worksheet shows no marking; the answer key crosses off the wrong bond
    expect(htmlW).not.toContain("data-crossed-off");
    expect(htmlA.split('data-crossed-off="true"')).toHaveLength(2);
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("generates and renders Lesson K-95 with a K-94 answer-slot warm-up, bond practice, WHAT'S WRONG B, and the PotD", () => {
    const seed = "TEST-K95";

    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 95,
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

    // §5.3: the warm-up draws K-94's Easy TakeAway cross-off (answer-slot)
    expect(generated.warmUpSourceLessonId).toBe("K-94");
    const warmUpData = generated.worksheet.sections[0].exercises[0]
      .data as TakeAwayData;
    expect(warmUpData.kind).toBe("TakeAway");
    expect(warmUpData.representation).toBe("ten-frame-and-digit");
    expect(warmUpData.responseForm).toBe("answer-slot");

    // §5.2 anatomy: Warm-Up 1, Practice 2, Challenge 2
    expect(generated.worksheet.sections.map((s) => s.exercises.length)).toEqual(
      [1, 2, 2]
    );

    // Practice (Intermediate tier): complete each subtraction number bond
    for (const ex of generated.worksheet.sections[1].exercises) {
      const data = ex.data as TakeAwayData;
      expect(data.kind).toBe("TakeAway");
      expect(data.representation).toBe("ten-frame");
      expect(data.responseForm).toBe("number-bond");
      expect(data.action).toBe("write");
      const factKeys = new Set<string>();
      for (const item of data.items) {
        expect(item.total - item.partTakenAway).toBe(item.missingPart);
        expect(item.total).toBeGreaterThanOrEqual(6);
        expect(item.total).toBeLessThanOrEqual(10);
        expect(item.crossOffMode).toBe("shown");
        expect(item.representationModel!.crossedOutCount).toBe(
          item.partTakenAway
        );
        expect((item.responseModel!.meta as AnyData).missingPosition).toBe(
          "part2"
        );
        factKeys.add(item.factKey);
      }
      expect(factKeys.size).toBe(data.items.length);
    }

    // Challenge: WHAT'S WRONG B (Brain Builder) then the imagine-and-cross-off PotD
    const challenge = generated.worksheet.sections[2].exercises;
    const bb = challenge.find((ex) => ex.archetype === "JudgeEquality")!;
    const bbData = bb.data as JudgeEqualityData;
    expect(bbData.mode).toBe("whats-wrong");
    expect(bbData.modelKind).toBe("number-bond");
    expect(bbData.operation).toBe("subtract");
    for (const item of bbData.rows.flatMap((r) => r.items)) {
      expect(item.realTotal).toBeGreaterThanOrEqual(6);
      expect(item.realTotal).toBeLessThanOrEqual(10);
      expect(item.isCorrect).toBe(item.realTotal - item.part1 === item.part2);
    }
    const blueprintSpec = getLessonBlueprint(
      "K-95"
    )!.tiers.Advanced.challenge.find(
      (spec) => spec.archetype === "JudgeEquality"
    )!;
    expect((blueprintSpec.params as AnyData).modelKind).toBe("number-bond");
    const potd = challenge.find((ex) => ex.archetype === "TakeAway")!;
    const potdData = potd.data as TakeAwayData;
    expect(potdData.responseForm).toBe("number-bond");
    for (const item of potdData.items) {
      // §5.5 static adaptation: the frame is pre-filled with the imagined
      // Total; the child crosses off the given Part themselves (student mode)
      expect(item.crossOffMode).toBe("student");
      expect((item.representationModel!.meta as AnyData).crossOffMode).toBe(
        "student"
      );
    }
    // The answer key shows the drawn X in the accent style (§8.2)
    const potdKeyHtml = renderToStaticMarkup(
      getExerciseArchetype("TakeAway")!.render({
        exercise: potd,
        mode: "answer-key",
      })
    );
    expect(potdKeyHtml).toContain('data-solved-cross-off="true"');

    // Easy mode: trace response and Easy-tier totals (§6.2 cross-off table)
    const easy = generateWorksheet({
      grade: "K",
      lessonNumber: 95,
      seed,
      difficultyLevel: "Easy",
    });
    const easyPractice = easy.worksheet.sections[1].exercises[0]
      .data as TakeAwayData;
    expect(easyPractice.action).toBe("trace");
    expect(
      easyPractice.items.every((item) => item.crossOffMode === "shown")
    ).toBe(true);
    expect(easyPractice.items.every((item) => item.total <= 8)).toBe(true);
    const easyBB = easy.worksheet.sections[2].exercises.find(
      (ex) => ex.archetype === "JudgeEquality"
    )!;
    for (const item of (easyBB.data as JudgeEqualityData).rows.flatMap(
      (r) => r.items
    )) {
      expect(item.realTotal).toBeLessThanOrEqual(8);
    }

    // Advanced mode: the X is withdrawn (student) on the main practice line,
    // and the second exercise carries the partTakenAway edge case (§6.3)
    const advanced = generateWorksheet({
      grade: "K",
      lessonNumber: 95,
      seed,
      difficultyLevel: "Advanced",
    });
    const advMain = advanced.worksheet.sections[1].exercises[0]
      .data as TakeAwayData;
    expect(advMain.action).toBe("write");
    expect(advMain.items.every((item) => item.crossOffMode === "student")).toBe(
      true
    );
    const advEdge = advanced.worksheet.sections[1].exercises[1]
      .data as TakeAwayData;
    expect(advEdge.responseForm).toBe("number-bond");
    expect(
      advEdge.items.every((item) => item.unknownKind === "partTakenAway")
    ).toBe(true);
    expect(
      advEdge.items.every(
        (item) => item.total >= 6 && item.total <= 9 && item.partTakenAway >= 1
      )
    ).toBe(true);

    // No Western numerals anywhere on either surface
    for (const mode of ["worksheet", "answer-key"] as const) {
      const html = renderWorksheetSurface({
        grade: "K",
        lessonNumber: 95,
        seed,
        difficultyLevel: "scaffolded",
        viewMode: mode,
      });
      const western = findWesternNumeralsInRenderedHtml(html);
      expect(western, `Western numerals found in K-95 (${mode})`).toEqual([]);
    }
  });
});

describe("Ticket 03 (Unit 8) — Slice 3: K-96 subitize subtraction equations", () => {
  it("TakeAway ten-frame equation practice crosses off the given part and solves the equation's part2", async () => {
    const { def, lesson } = await buildArchetype("TakeAway", 96);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-96",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K96-EQ-1"),
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
    expect(data.items).toHaveLength(2);
    const factKeys = new Set<string>();
    for (const item of data.items) {
      // Domain invariant: Total − Part = Missing Part (§7.4)
      expect(item.total - item.partTakenAway).toBe(item.missingPart);
      expect(item.total).toBeGreaterThanOrEqual(6);
      expect(item.total).toBeLessThanOrEqual(10);
      factKeys.add(item.factKey);
      const frame = item.representationModel!;
      expect(frame.kind).toBe("ten-frame");
      expect(frame.crossedOutCount).toBe(item.partTakenAway);
      expect((frame.meta as AnyData).crossOffMode).toBe("shown");
      const eq = item.responseModel!;
      expect(eq.kind).toBe("equation-strip");
      expect((eq.meta as AnyData).operation).toBe("subtract");
      expect((eq.meta as AnyData).missingPosition).toBe("part2");
      expect((eq.meta as AnyData).part1).toBe(item.partTakenAway);
      expect((eq.meta as AnyData).part2).toBe(item.missingPart);
      expect((eq.meta as AnyData).total).toBe(item.total);
    }
    // §7.3: no fact repeats within one exercise
    expect(factKeys.size).toBe(data.items.length);

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-visual-model="ten-frame"');
    expect(htmlW).toContain('data-crossed-out-cell="true"');
    expect(htmlW).toContain('data-visual-model="equation-strip"');
    expect(htmlW).toContain("−"); // U+2212, never a hyphen (§9.3)
    expect(htmlW).toContain('data-missing-position="part2"');
    expect(htmlA).toContain("data-solved-equation-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("generates and renders Lesson K-96 with a K-95 TakeAway-bond warm-up, equation practice, WHAT'S WRONG C, and the PotD", () => {
    const seed = "TEST-K96";

    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 96,
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

    // §5.3: the warm-up draws K-95's Easy TakeAway bond (bonds → equations)
    expect(generated.warmUpSourceLessonId).toBe("K-95");
    const warmUpData = generated.worksheet.sections[0].exercises[0]
      .data as TakeAwayData;
    expect(warmUpData.kind).toBe("TakeAway");
    expect(warmUpData.responseForm).toBe("number-bond");

    // §5.2 anatomy: Warm-Up 1, Practice 2, Challenge 2
    expect(generated.worksheet.sections.map((s) => s.exercises.length)).toEqual(
      [1, 2, 2]
    );

    // Practice (Intermediate tier): complete each subtraction equation
    for (const ex of generated.worksheet.sections[1].exercises) {
      const data = ex.data as TakeAwayData;
      expect(data.kind).toBe("TakeAway");
      expect(data.representation).toBe("ten-frame");
      expect(data.responseForm).toBe("equation");
      expect(data.action).toBe("write");
      const factKeys = new Set<string>();
      for (const item of data.items) {
        expect(item.total - item.partTakenAway).toBe(item.missingPart);
        expect(item.total).toBeGreaterThanOrEqual(6);
        expect(item.total).toBeLessThanOrEqual(10);
        expect(item.crossOffMode).toBe("shown");
        expect(item.representationModel!.crossedOutCount).toBe(
          item.partTakenAway
        );
        expect((item.responseModel!.meta as AnyData).missingPosition).toBe(
          "part2"
        );
        factKeys.add(item.factKey);
      }
      expect(factKeys.size).toBe(data.items.length);
    }

    // Challenge: WHAT'S WRONG C (Brain Builder) then the imagine-and-cross-off PotD
    const challenge = generated.worksheet.sections[2].exercises;
    const bb = challenge.find((ex) => ex.archetype === "JudgeEquality")!;
    const bbData = bb.data as JudgeEqualityData;
    expect(bbData.mode).toBe("whats-wrong");
    expect(bbData.modelKind).toBe("equation");
    expect(bbData.operation).toBe("subtract");
    for (const item of bbData.rows.flatMap((r) => r.items)) {
      expect(item.realTotal).toBeGreaterThanOrEqual(6);
      expect(item.realTotal).toBeLessThanOrEqual(10);
      expect(item.isCorrect).toBe(item.realTotal - item.part1 === item.part2);
    }
    const blueprintSpec = getLessonBlueprint(
      "K-96"
    )!.tiers.Advanced.challenge.find(
      (spec) => spec.archetype === "JudgeEquality"
    )!;
    expect((blueprintSpec.params as AnyData).modelKind).toBe("equation");
    const potd = challenge.find((ex) => ex.archetype === "TakeAway")!;
    const potdData = potd.data as TakeAwayData;
    expect(potdData.responseForm).toBe("equation");
    for (const item of potdData.items) {
      // §5.5 static adaptation: the frame is pre-filled with the imagined
      // Total; the child crosses off the given Part themselves (student mode)
      expect(item.crossOffMode).toBe("student");
      expect((item.representationModel!.meta as AnyData).crossOffMode).toBe(
        "student"
      );
    }
    // The answer key shows the drawn X in the accent style (§8.2)
    const potdKeyHtml = renderToStaticMarkup(
      getExerciseArchetype("TakeAway")!.render({
        exercise: potd,
        mode: "answer-key",
      })
    );
    expect(potdKeyHtml).toContain('data-solved-cross-off="true"');

    // Easy mode: trace response and Easy-tier totals (§6.2 cross-off table)
    const easy = generateWorksheet({
      grade: "K",
      lessonNumber: 96,
      seed,
      difficultyLevel: "Easy",
    });
    const easyPractice = easy.worksheet.sections[1].exercises[0]
      .data as TakeAwayData;
    expect(easyPractice.action).toBe("trace");
    expect(
      easyPractice.items.every((item) => item.crossOffMode === "shown")
    ).toBe(true);
    expect(easyPractice.items.every((item) => item.total <= 8)).toBe(true);
    const easyBB = easy.worksheet.sections[2].exercises.find(
      (ex) => ex.archetype === "JudgeEquality"
    )!;
    for (const item of (easyBB.data as JudgeEqualityData).rows.flatMap(
      (r) => r.items
    )) {
      expect(item.realTotal).toBeLessThanOrEqual(8);
    }

    // Advanced mode: the X is withdrawn (student) on the main practice line,
    // and the second exercise carries the partTakenAway edge case (§6.3)
    const advanced = generateWorksheet({
      grade: "K",
      lessonNumber: 96,
      seed,
      difficultyLevel: "Advanced",
    });
    const advMain = advanced.worksheet.sections[1].exercises[0]
      .data as TakeAwayData;
    expect(advMain.action).toBe("write");
    expect(advMain.items.every((item) => item.crossOffMode === "student")).toBe(
      true
    );
    const advEdge = advanced.worksheet.sections[1].exercises[1]
      .data as TakeAwayData;
    expect(advEdge.responseForm).toBe("equation");
    expect(
      advEdge.items.every((item) => item.unknownKind === "partTakenAway")
    ).toBe(true);
    expect(
      advEdge.items.every(
        (item) => item.total >= 6 && item.total <= 9 && item.partTakenAway >= 1
      )
    ).toBe(true);

    // No Western numerals anywhere on either surface
    for (const mode of ["worksheet", "answer-key"] as const) {
      const html = renderWorksheetSurface({
        grade: "K",
        lessonNumber: 96,
        seed,
        difficultyLevel: "scaffolded",
        viewMode: mode,
      });
      const western = findWesternNumeralsInRenderedHtml(html);
      expect(western, `Western numerals found in K-96 (${mode})`).toEqual([]);
    }
  });

  it("WHAT'S WRONG A/B/C carry correct truth values across many seeds and tiers", async () => {
    for (const lessonNumber of [94, 95, 96]) {
      const { def, lesson } = await buildArchetype(
        "JudgeEquality",
        lessonNumber
      );
      const blueprint = getLessonBlueprint(`K-${lessonNumber}`)!;
      const expectedModelKind =
        lessonNumber === 95 ? "number-bond" : "equation";
      for (const tier of ["Easy", "Intermediate", "Advanced"] as const) {
        const spec = blueprint.tiers[tier].challenge.find(
          (s) => s.archetype === "JudgeEquality"
        )!;
        const maxTotal = tier === "Easy" ? 8 : 10;
        for (let seedIdx = 0; seedIdx < 8; seedIdx++) {
          const ex = def.generate({
            lesson,
            sourceLessonId: `K-${lessonNumber}`,
            sectionId: "challenge",
            exerciseIndex: 0,
            exerciseNumber: 4,
            difficultyLevel: tier,
            rng: createSeededRandom(`K${lessonNumber}-WW-${tier}-${seedIdx}`),
            spec,
          });
          const data = ex.data as JudgeEqualityData;
          expect(data.mode).toBe("whats-wrong");
          expect(data.modelKind).toBe(expectedModelKind);
          expect(data.operation).toBe("subtract");
          const items = data.rows.flatMap((r) => r.items);
          // Exactly one NOT-true item per row, with correct truth values
          expect(items.filter((i) => !i.isCorrect)).toHaveLength(1);
          for (const item of items) {
            expect(item.isCorrect).toBe(
              item.realTotal - item.part1 === item.part2
            );
            expect(item.realTotal).toBeGreaterThanOrEqual(6);
            expect(item.realTotal).toBeLessThanOrEqual(maxTotal);
          }
        }
      }
    }
  });
});
