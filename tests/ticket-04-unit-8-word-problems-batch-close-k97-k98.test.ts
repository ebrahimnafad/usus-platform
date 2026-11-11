import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createSeededRandom } from "@/lib/seed";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { getLessonBlueprint } from "@/blueprints/registry";
import { getExerciseArchetype } from "@/archetypes/registry";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { formatValidTakeApartPairsAr } from "@/lib/word-problems";
import type { SolveWordProblemData } from "@/lib/word-problems";
import type { ConnectMatchData } from "@/domain/types";
import type { TakeAwayData } from "@/lib/part-whole-facts";
import "@/registry/bootstrap";

type AnyData = Record<string, any>;

const EASTERN_DIGITS = "٠١٢٣٤٥٦٧٨٩";

const toWesternDigits = (s: string): string =>
  [...s]
    .map((ch) => {
      const idx = EASTERN_DIGITS.indexOf(ch);
      return idx < 0 ? "" : String(idx);
    })
    .join("");

/** Parses `تتنوّع الإجابات، مثل: ٩ و١ أو ٨ و٢` into numeric pairs. */
const parseValidPairs = (summaryAr: string): Array<[number, number]> =>
  summaryAr
    .replace("تتنوّع الإجابات، مثل:", "")
    .split(" أو ")
    .map((piece) => {
      const [a, b] = piece.trim().split(" و");
      return [Number(toWesternDigits(a)), Number(toWesternDigits(b))];
    });

const buildArchetype = async (
  archetypeId: "SolveWordProblem" | "ConnectMatch",
  lessonNumber: number
) => {
  const { getCurriculumCatalog } = await import("@/curriculum/catalog");
  return {
    def: getExerciseArchetype(archetypeId),
    lesson: getCurriculumCatalog().getLesson("K", lessonNumber)!,
  };
};

describe("Ticket 04 (Unit 8) — Slice 1: K-97 take-from story problems (SolveWordProblem)", () => {
  it("Easy practice completes the ten-frame model and part-total bond with trace (totals 6-8)", async () => {
    const { def, lesson } = await buildArchetype("SolveWordProblem", 97);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-97",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Easy",
      rng: createSeededRandom("K97-EASY-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-from",
          problemStyle: "story",
          responseForm: "model-and-bond",
          representation: "ten-frame",
          crossOffMode: "shown",
          action: "trace",
          totalRange: [6, 8],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const data = ex.data as SolveWordProblemData;
    expect(data.kind).toBe("SolveWordProblem");
    expect(data.situation).toBe("take-from");
    expect(data.problemStyle).toBe("story");
    expect(data.responseForm).toBe("model-and-bond");
    expect(data.action).toBe("trace");
    expect(data.items).toHaveLength(2);

    const factKeys = new Set<string>();
    for (const item of data.items) {
      // Domain invariant: Total − Part taken away = how many are left (§7.4)
      expect(item.total - item.partTakenAway).toBe(item.missingPart);
      expect(item.total).toBeGreaterThanOrEqual(6);
      expect(item.total).toBeLessThanOrEqual(8);
      expect(item.missingPart).toBeGreaterThanOrEqual(1);
      factKeys.add(item.factKey);
      // The ten-frame shows the Total with the X pre-drawn on the taken Part
      const frame = item.representationModel!;
      expect(frame.kind).toBe("ten-frame");
      expect(frame.count).toBe(item.total);
      expect(frame.crossedOutCount).toBe(item.partTakenAway);
      expect((frame.meta as AnyData).crossOffMode).toBe("shown");
      // The bond is the part-total model with the missing Part unknown
      const bond = item.bondModel!;
      expect(bond.kind).toBe("number-bond");
      expect((bond.meta as AnyData).missingPosition).toBe("part2");
      expect((bond.meta as AnyData).part1).toBe(item.partTakenAway);
      expect((bond.meta as AnyData).part2).toBe(item.missingPart);
      expect(item.tracePositions).toEqual(["total", "part1"]);
      // Story scenes ask كم بقي؟ and never carry Western digits
      expect(item.questionLabelAr).toBe("كم بقي؟");
      expect(item.problemTextAr).not.toMatch(/[0-9]/);
    }
    // §7.3: no fact repeats within one exercise
    expect(factKeys.size).toBe(data.items.length);

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-archetype="SolveWordProblem"');
    expect(htmlW).toContain('data-situation="take-from"');
    expect(htmlW).toContain('data-visual-model="ten-frame"');
    expect(htmlW).toContain('data-crossed-out-cell="true"');
    expect(htmlW).toContain('data-visual-model="number-bond"');
    expect(htmlW).toContain('data-missing-position="part2"');
    expect(htmlA).toContain("data-solved-word-problem-missing-part=");
    expect(htmlA).toContain("data-solved-bond-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("Intermediate practice reads the story and answers كم بقي؟ with the model withdrawn (totals 6-10)", async () => {
    const { def, lesson } = await buildArchetype("SolveWordProblem", 97);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-97",
      sectionId: "practice",
      exerciseIndex: 1,
      exerciseNumber: 3,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K97-INT-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-from",
          problemStyle: "story",
          responseForm: "story-and-slot",
          representation: "ten-frame",
          crossOffMode: "shown",
          action: "write",
          showModel: false,
          totalRange: [6, 10],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const data = ex.data as SolveWordProblemData;
    expect(data.responseForm).toBe("story-and-slot");
    expect(data.action).toBe("write");
    expect(data.items).toHaveLength(2);
    for (const item of data.items) {
      expect(item.total - item.partTakenAway).toBe(item.missingPart);
      expect(item.total).toBeGreaterThanOrEqual(6);
      expect(item.total).toBeLessThanOrEqual(10);
      // §6.2: the model is withdrawn at Intermediate in story-and-slot
      expect(item.representationModel).toBeUndefined();
      expect(item.problemTextAr).not.toMatch(/[0-9]/);
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    expect(htmlW).toContain('data-response-form="story-and-slot"');
    expect(htmlW).toContain('data-action="write"');
    expect(htmlW).toContain('data-situation="take-from"');
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
  });

  it("Advanced practice writes the subtraction equation independently and allows 0 as the taken Part (§6.3)", async () => {
    const { def, lesson } = await buildArchetype("SolveWordProblem", 97);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-97",
      sectionId: "practice",
      exerciseIndex: 1,
      exerciseNumber: 3,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("K97-ADV-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-from",
          problemStyle: "story",
          responseForm: "equation",
          representation: "ten-frame",
          action: "write",
          showModel: false,
          totalRange: [6, 10],
          minPart: 0,
          itemCount: 2,
        },
      },
    });

    const data = ex.data as SolveWordProblemData;
    expect(data.responseForm).toBe("equation");
    expect(data.items).toHaveLength(2);
    const takenParts = new Set<number>();
    for (const item of data.items) {
      expect(item.total - item.partTakenAway).toBe(item.missingPart);
      expect(item.total).toBeGreaterThanOrEqual(6);
      expect(item.total).toBeLessThanOrEqual(10);
      // minPart: 0 lets the taken Part be 0 (٧ − ٠ = ٧); the remainder stays ≥ 1
      expect(item.partTakenAway).toBeGreaterThanOrEqual(0);
      expect(item.missingPart).toBeGreaterThanOrEqual(1);
      takenParts.add(item.partTakenAway);
      // §6.2: the model is fully withdrawn for independent equation writing
      expect(item.representationModel).toBeUndefined();
      const equation = item.equationModel!;
      expect((equation.meta as AnyData).missingPosition).toBe("part2");
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    // Subtraction uses − (U+2212), never a hyphen (§9.3)
    expect(htmlW).toContain("−");
    expect(htmlA).toContain("data-solved-equation-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("Problem of the Day completes the take-from story from the model and writes the equation", async () => {
    const { def, lesson } = await buildArchetype("SolveWordProblem", 97);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-97",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 5,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("K97-POTD-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-from",
          problemStyle: "story",
          responseForm: "cloze-from-model",
          representation: "ten-frame",
          crossOffMode: "shown",
          clozeIncludeEquation: true,
          action: "write",
          totalRange: [6, 10],
          minPart: 1,
          itemCount: 1,
        },
      },
    });

    const data = ex.data as SolveWordProblemData;
    expect(data.responseForm).toBe("cloze-from-model");
    expect(data.clozeIncludeEquation).toBe(true);
    expect(data.items).toHaveLength(1);
    const item = data.items[0];
    expect(item.total - item.partTakenAway).toBe(item.missingPart);
    // The concrete model stays shown for cloze-from-model
    expect(item.representationModel).toBeDefined();
    expect(item.representationModel!.kind).toBe("ten-frame");
    // The equation strip follows Total − Part = ؟ with the missing part unknown
    expect((item.equationModel!.meta as AnyData).missingPosition).toBe("part2");

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-response-form="cloze-from-model"');
    expect(htmlW).toContain('data-cloze-sentence="true"');
    expect(htmlW).toContain('data-visual-model="equation-strip"');
    expect(htmlA).toContain("data-solved-cloze-total=");
    expect(htmlA).toContain("data-solved-cloze-part1=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });
});

describe("Ticket 04 (Unit 8) — Slice 2: K-97 BB WORD PROBLEM MATCH A (ConnectMatch)", () => {
  it("matches take-from diagrams to story problems and fills the missing part (totals 6-10)", async () => {
    const { def, lesson } = await buildArchetype("ConnectMatch", 97);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-97",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K97-MATCH-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "model-to-word-problem",
          operation: "subtract",
          situation: "take-from",
          problemStyle: "story",
          showProblemSlot: true,
          rightColumnTitleAr: "رابطة الأعداد",
          leftColumnTitleAr: "المسألة القصصية",
          totalRange: [6, 10],
          minPart: 1,
          pairCount: 2,
        },
      },
    });

    const data = ex.data as ConnectMatchData;
    expect(data.kind).toBe("ConnectMatch");
    expect(data.rightItems).toHaveLength(2);
    expect(data.leftItems).toHaveLength(2);
    expect(new Set(Object.values(data.solutionMap)).size).toBe(2);

    const totals = data.leftItems.map(
      (li: AnyData) => li.model.meta.total as number
    );
    expect(new Set(totals).size).toBe(2);
    for (const total of totals) {
      expect(total).toBeGreaterThanOrEqual(6);
      expect(total).toBeLessThanOrEqual(10);
    }

    for (const rItem of data.rightItems) {
      const bondMeta = (rItem.model.meta ?? {}) as AnyData;
      expect(rItem.model.kind).toBe("number-bond");
      expect(bondMeta.missingPosition).toBe("part2");
      // WORD PROBLEM MATCH A fills the missing part (how many are left)
      expect(bondMeta.part2).toBeGreaterThanOrEqual(1);
    }

    for (const lItem of data.leftItems) {
      const meta = lItem.model.meta as AnyData;
      expect(meta.isWordProblemEndpoint).toBe(true);
      expect(meta.situation).toBe("take-from");
      expect(meta.problemStyle).toBe("story");
      expect(meta.problemTextAr).toContain(meta.totalAr);
      expect(meta.solvedAnswerAr).toBe(meta.missingPartAr);
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-word-problem-endpoint="true"');
    expect(htmlW).toContain('data-word-problem-situation="take-from"');
    expect(htmlA).toContain("data-solved-match-problem-missing-part=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });
});

describe("Ticket 04 (Unit 8) — Slice 3: K-98 take-apart story problems (SolveWordProblem)", () => {
  it("Easy practice completes the ten-frame model and both Parts in the bond (model-fixed, totals 6-8)", async () => {
    const { def, lesson } = await buildArchetype("SolveWordProblem", 98);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-98",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Easy",
      rng: createSeededRandom("K98-EASY-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-apart",
          problemStyle: "story",
          responseForm: "model-and-bond",
          representation: "ten-frame",
          takeApartMode: "model-fixed",
          action: "trace",
          totalRange: [6, 8],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const data = ex.data as SolveWordProblemData;
    expect(data.situation).toBe("take-apart");
    expect(data.responseForm).toBe("model-and-bond");
    expect(data.items).toHaveLength(2);
    const factKeys = new Set<string>();
    for (const item of data.items) {
      // Domain invariant: Part + Part = Total (§7.4); both Parts ≥ 1
      expect(item.part1 + item.part2).toBe(item.total);
      expect(item.part1).toBeGreaterThanOrEqual(1);
      expect(item.part2).toBeGreaterThanOrEqual(1);
      expect(item.total).toBeGreaterThanOrEqual(6);
      expect(item.total).toBeLessThanOrEqual(8);
      factKeys.add(item.factKey);
      // The ten-frame shows the two Parts concretely (model-fixed)
      const frame = item.representationModel!;
      expect(frame.kind).toBe("ten-frame");
      expect(frame.count).toBe(item.part1);
      expect(frame.secondaryCount).toBe(item.part2);
      // Both Part circles are unknown in the take-apart bond
      const bond = item.bondModel!;
      expect(bond.kind).toBe("number-bond");
      expect((bond.meta as AnyData).missingPosition).toBe("both-parts");
      expect(item.questionLabelAr).toBe("كم في كلّ جزء؟");
      expect(item.takeApartMode).toBe("model-fixed");
      expect(item.problemTextAr).not.toMatch(/[0-9]/);
    }
    expect(factKeys.size).toBe(data.items.length);

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-situation="take-apart"');
    expect(htmlW).toContain('data-take-apart-mode="model-fixed"');
    expect(htmlW).toContain('data-missing-position="both-parts"');
    expect(htmlA).toContain("data-solved-word-problem-part1=");
    expect(htmlA).toContain("data-solved-word-problem-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("Advanced open-ended accepts any valid Part pair and the valid-answers summary sums to the Total (§6.3)", async () => {
    const { def, lesson } = await buildArchetype("SolveWordProblem", 98);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-98",
      sectionId: "practice",
      exerciseIndex: 1,
      exerciseNumber: 3,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("K98-OPEN-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-apart",
          problemStyle: "story",
          responseForm: "story-and-slot",
          representation: "ten-frame",
          takeApartMode: "open-ended",
          showModel: false,
          action: "write",
          totalRange: [6, 10],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const data = ex.data as SolveWordProblemData;
    expect(data.responseForm).toBe("story-and-slot");
    expect(data.items).toHaveLength(2);
    for (const item of data.items) {
      expect(item.takeApartMode).toBe("open-ended");
      expect(item.part1 + item.part2).toBe(item.total);
      expect(item.total).toBeGreaterThanOrEqual(6);
      expect(item.total).toBeLessThanOrEqual(10);
      expect(item.representationModel).toBeUndefined();
      // The answer-key summary lists valid pairs that all sum to THIS Total
      const pairs = parseValidPairs(item.validPairsSummaryAr!);
      expect(pairs.length).toBeGreaterThan(0);
      for (const [a, b] of pairs) {
        expect(a + b).toBe(item.total);
      }
      expect(item.solvedAnswerAr).toContain(item.validPairsSummaryAr!);
    }

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlW).toContain('data-take-apart-mode="open-ended"');
    expect(htmlA).toContain('data-valid-take-apart-pairs="true"');
    expect(htmlA).toContain("تتنوّع الإجابات، مثل:");
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("Problem of the Day completes the take-apart story and the Total-first equation", async () => {
    const { def, lesson } = await buildArchetype("SolveWordProblem", 98);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-98",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 5,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("K98-POTD-1"),
      spec: {
        archetype: "SolveWordProblem",
        params: {
          situation: "take-apart",
          problemStyle: "story",
          responseForm: "cloze-from-model",
          representation: "ten-frame",
          takeApartMode: "model-fixed",
          clozeIncludeEquation: true,
          action: "write",
          totalRange: [6, 10],
          minPart: 1,
          itemCount: 1,
        },
      },
    });

    const data = ex.data as SolveWordProblemData;
    expect(data.responseForm).toBe("cloze-from-model");
    const item = data.items[0];
    expect(item.part1 + item.part2).toBe(item.total);
    expect(item.representationModel!.kind).toBe("ten-frame");
    // The take-apart cloze equation is the addition Part + Part = ؟
    const equationMeta = item.equationModel!.meta as AnyData;
    expect(equationMeta.missingPosition).toBe("total");
    expect(equationMeta.layout).toBe("standard");

    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    expect(htmlA).toContain("data-solved-cloze-part1=");
    expect(htmlA).toContain("data-solved-cloze-part2=");
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });
});

describe("Ticket 04 (Unit 8) — Slice 4: K-98 BB WORD PROBLEM MATCH B (ConnectMatch)", () => {
  it("matches take-apart bonds to story problems with 3 pairs and answers that vary (totals 6-10)", async () => {
    const { def, lesson } = await buildArchetype("ConnectMatch", 98);

    const ex = def.generate({
      lesson,
      sourceLessonId: "K-98",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K98-MATCH-1"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "model-to-word-problem",
          situation: "take-apart",
          problemStyle: "story",
          showProblemSlot: false,
          rightColumnTitleAr: "رابطة الأعداد",
          leftColumnTitleAr: "المسألة القصصية",
          totalRange: [6, 10],
          minPart: 1,
          pairCount: 3,
        },
      },
    });

    const data = ex.data as ConnectMatchData;
    expect(data.rightItems).toHaveLength(3);
    expect(data.leftItems).toHaveLength(3);
    expect(new Set(Object.values(data.solutionMap)).size).toBe(3);

    const totals = data.leftItems.map(
      (li: AnyData) => li.model.meta.total as number
    );
    expect(new Set(totals).size).toBe(3);
    for (const total of totals) {
      expect(total).toBeGreaterThanOrEqual(6);
      expect(total).toBeLessThanOrEqual(10);
      // Every endpoint's valid-answers summary must pair to ITS OWN total
      const meta = data.leftItems.find(
        (li: AnyData) => (li.model.meta as AnyData).total === total
      )!.model.meta as AnyData;
      for (const [a, b] of parseValidPairs(meta.validPairsSummaryAr)) {
        expect(a + b).toBe(total);
      }
    }

    for (const rItem of data.rightItems) {
      const bondMeta = (rItem.model.meta ?? {}) as AnyData;
      expect(rItem.model.kind).toBe("number-bond");
      expect(bondMeta.missingPosition).toBe("both-parts");
    }

    for (const lItem of data.leftItems) {
      const meta = lItem.model.meta as AnyData;
      expect(meta.isWordProblemEndpoint).toBe(true);
      expect(meta.situation).toBe("take-apart");
      expect(meta.problemTextAr).toContain(meta.totalAr);
      expect(meta.validPairsSummaryAr).toContain("تتنوّع الإجابات، مثل:");
      expect(meta.solvedAnswerAr).toContain("و");
    }

    expect(ex.strategyHintAr).toContain("تتنوّع الإجابات، مثل:");

    const htmlW = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      def.render({ exercise: ex, mode: "answer-key" })
    );
    // 3 Number Bonds × 2 unknown Part circles = 6 unknown slots
    expect(htmlW.match(/data-answer-slot="unknown"/g)).toHaveLength(6);
    expect(htmlA.match(/data-answer-slot="solved-digit"/g)).toHaveLength(6);
    expect(htmlA).toContain('data-valid-take-apart-pairs="true"');
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });
});

describe("Ticket 04 (Unit 8) — Slice 5: K-97/K-98 engine worksheets and localization", () => {
  it("generates Lesson K-97 with a K-96 equation warm-up, take-from practice, WORD PROBLEM MATCH A, and the PotD", () => {
    const seed = "TEST-K97";

    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 97,
      seed,
      difficultyLevel: "scaffolded",
    });

    expect(generated.isAuthoredBlueprint).toBe(true);
    expect(generated.lesson.standards).toEqual(["K.OA.2"]);
    expect(generated.lesson.isCoPresented).toBe(true);
    // §5.3: the warm-up draws K-96's Easy TakeAway equation
    expect(generated.warmUpSourceLessonId).toBe("K-96");
    const warmUpData = generated.worksheet.sections[0].exercises[0]
      .data as TakeAwayData;
    expect(warmUpData.kind).toBe("TakeAway");
    expect(warmUpData.representation).toBe("ten-frame");
    expect(warmUpData.responseForm).toBe("equation");
    expect(warmUpData.action).toBe("trace");

    // §5.2 anatomy: Warm-Up 1, Practice 2, Challenge 2
    expect(generated.worksheet.sections.map((s) => s.exercises.length)).toEqual(
      [1, 2, 2]
    );

    // Practice (Intermediate tier): take-from story problems
    for (const ex of generated.worksheet.sections[1].exercises) {
      const data = ex.data as SolveWordProblemData;
      expect(data.kind).toBe("SolveWordProblem");
      expect(data.situation).toBe("take-from");
    }

    // Challenge: BB WORD PROBLEM MATCH A + take-from PotD
    const [bb, potd] = generated.worksheet.sections[2].exercises;
    const bbData = bb.data as ConnectMatchData;
    expect(bbData.kind).toBe("ConnectMatch");
    expect((bbData.leftItems[0].model.meta as AnyData).situation).toBe(
      "take-from"
    );
    const potdData = potd.data as SolveWordProblemData;
    expect(potdData.kind).toBe("SolveWordProblem");
    expect(potdData.situation).toBe("take-from");
    expect(potdData.responseForm).toBe("cloze-from-model");

    // §8.3: every Answer Key exercise carries a Strategy Hint
    for (const section of generated.worksheet.sections) {
      for (const ex of section.exercises) {
        expect(
          generated.answerKey.strategyHintsByExerciseId[ex.id]
        ).toBeTruthy();
      }
    }
  });

  it("generates Lesson K-98 with a K-97 take-from warm-up, take-apart practice, WORD PROBLEM MATCH B, and the PotD", () => {
    const seed = "TEST-K98";

    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 98,
      seed,
      difficultyLevel: "scaffolded",
    });

    expect(generated.isAuthoredBlueprint).toBe(true);
    expect(generated.lesson.standards).toEqual(["K.OA.2"]);
    // §5.3: the warm-up draws K-97's Easy take-from story problem
    expect(generated.warmUpSourceLessonId).toBe("K-97");
    const warmUpData = generated.worksheet.sections[0].exercises[0]
      .data as SolveWordProblemData;
    expect(warmUpData.kind).toBe("SolveWordProblem");
    expect(warmUpData.situation).toBe("take-from");

    expect(generated.worksheet.sections.map((s) => s.exercises.length)).toEqual(
      [1, 2, 2]
    );

    // Practice (Intermediate tier): take-apart story problems
    for (const ex of generated.worksheet.sections[1].exercises) {
      const data = ex.data as SolveWordProblemData;
      expect(data.kind).toBe("SolveWordProblem");
      expect(data.situation).toBe("take-apart");
    }

    // Challenge: BB WORD PROBLEM MATCH B + take-apart PotD (scaffolded
    // challenge draws the Advanced tier; the BB matches 2 pairs at all tiers)
    const [bb, potd] = generated.worksheet.sections[2].exercises;
    const bbData = bb.data as ConnectMatchData;
    expect(bbData.kind).toBe("ConnectMatch");
    expect(bbData.rightItems).toHaveLength(2);
    expect((bbData.leftItems[0].model.meta as AnyData).situation).toBe(
      "take-apart"
    );
    const potdData = potd.data as SolveWordProblemData;
    expect(potdData.kind).toBe("SolveWordProblem");
    expect(potdData.situation).toBe("take-apart");
    expect(potdData.responseForm).toBe("cloze-from-model");

    for (const section of generated.worksheet.sections) {
      for (const ex of section.exercises) {
        expect(
          generated.answerKey.strategyHintsByExerciseId[ex.id]
        ).toBeTruthy();
      }
    }
  });

  it("registers localized Arabic titles, Teacher Notes (K-97 co-presented), and blueprint titles", () => {
    const k97 = AUTHORED_LESSON_LOCALIZATION["K-97"];
    const k98 = AUTHORED_LESSON_LOCALIZATION["K-98"];

    expect(k97?.titleAr.trim()).toBeTruthy();
    expect(k97?.teacherNotes.summaryAr.trim()).toBeTruthy();
    expect(k97?.teacherNotes.pedagogicalStepsAr.length).toBeGreaterThan(0);
    // The curriculum marks K-97 as co-presented
    expect(k97?.teacherNotes.coPresentationNoteAr?.trim()).toBeTruthy();
    expect(k97?.teacherNotes.classroomActivityNoteAr?.trim()).toBeTruthy();
    expect(k97?.teacherNotes.commonMisconceptionsAr?.length).toBeGreaterThan(0);

    expect(k98?.titleAr.trim()).toBeTruthy();
    expect(k98?.teacherNotes.summaryAr.trim()).toBeTruthy();
    expect(k98?.teacherNotes.pedagogicalStepsAr.length).toBeGreaterThan(0);
    expect(k98?.teacherNotes.classroomActivityNoteAr?.trim()).toBeTruthy();
    expect(k98?.teacherNotes.commonMisconceptionsAr?.length).toBeGreaterThan(0);

    // Teacher-facing notes never print but must follow §9.2 (Eastern numerals)
    for (const entry of [k97, k98]) {
      expect(entry.titleAr).not.toMatch(/[0-9]/);
      expect(entry.teacherNotes.summaryAr).not.toMatch(/[0-9]/);
    }

    expect(getLessonBlueprint("K-97")?.titleAr).toBe(k97.titleAr);
    expect(getLessonBlueprint("K-98")?.titleAr).toBe(k98.titleAr);
  });

  it("is seed-deterministic for K-97 and K-98 (same seed → same Worksheet)", () => {
    for (const lessonNumber of [97, 98]) {
      const first = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: "DETERMINISM-1",
        difficultyLevel: "scaffolded",
        viewMode: "worksheet",
      });
      const second = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: "DETERMINISM-1",
        difficultyLevel: "scaffolded",
        viewMode: "worksheet",
      });
      expect(first).toBe(second);
    }
  });

  it("passes the domain sweep across seeds and difficulty modes for K-97/K-98 (§7.4)", () => {
    for (const seed of ["SWEEP-A", "SWEEP-B", "SWEEP-C"]) {
      for (const lessonNumber of [97, 98]) {
        for (const difficultyLevel of [
          "Easy",
          "Intermediate",
          "Advanced",
        ] as const) {
          const generated = generateWorksheet({
            grade: "K",
            lessonNumber,
            seed,
            difficultyLevel,
          });

          // The sweep is only meaningful with authored blueprints (§5.2)
          expect(generated.isAuthoredBlueprint).toBe(true);
          expect(
            generated.worksheet.sections.map((s) => s.exercises.length)
          ).toEqual([1, 2, 2]);

          for (const section of generated.worksheet.sections) {
            for (const ex of section.exercises) {
              if (ex.archetype === "SolveWordProblem") {
                const data = ex.data as SolveWordProblemData;
                for (const item of data.items) {
                  if (data.situation === "take-from") {
                    expect(item.total - item.partTakenAway).toBe(
                      item.missingPart
                    );
                    expect(item.missingPart).toBeGreaterThanOrEqual(1);
                  } else if (data.situation === "take-apart") {
                    expect(item.part1 + item.part2).toBe(item.total);
                    expect(item.part1).toBeGreaterThanOrEqual(1);
                    expect(item.part2).toBeGreaterThanOrEqual(1);
                  }
                  expect(item.total).toBeGreaterThanOrEqual(6);
                  expect(item.total).toBeLessThanOrEqual(10);
                }
              }
              if (ex.archetype === "ConnectMatch") {
                const data = ex.data as ConnectMatchData;
                expect(new Set(Object.values(data.solutionMap)).size).toBe(
                  data.rightItems.length
                );
              }
            }
          }
        }
      }
    }
  });

  it("keeps formatValidTakeApartPairsAr correct across the whole unit range", () => {
    // Pairs are non-zero parts that compose the Total (§6.3: no 0 pairs)
    for (let total = 2; total <= 10; total++) {
      const summaryAr = formatValidTakeApartPairsAr(total);
      expect(summaryAr).toContain("تتنوّع الإجابات، مثل:");
      for (const [a, b] of parseValidPairs(summaryAr)) {
        expect(a + b).toBe(total);
        expect(a).toBeGreaterThanOrEqual(1);
        expect(b).toBeGreaterThanOrEqual(1);
      }
    }
  });
});
