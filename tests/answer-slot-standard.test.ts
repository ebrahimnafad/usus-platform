import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import {
  AnswerLine,
  AnswerSlot,
  ANSWER_LINE_SIZE_CLASS,
  ANSWER_SLOT_SIZE_CLASS,
} from "@/components/worksheet/AnswerSlot";

function renderWorksheet(lessonNumber: number, seed: string): string {
  return renderWorksheetSurface({
    grade: "K",
    lessonNumber,
    seed,
    viewMode: "worksheet",
    difficultyLevel: "scaffolded",
  });
}

function renderAnswerKey(lessonNumber: number, seed: string): string {
  return renderWorksheetSurface({
    grade: "K",
    lessonNumber,
    seed,
    viewMode: "answer-key",
    difficultyLevel: "scaffolded",
  });
}

function slotTags(html: string): Array<{ kind: string; tag: string }> {
  return [
    ...html.matchAll(
      /<span[^>]*data-answer-slot="(unknown|write|line|solved-digit|solved-line)"[^>]*>/g
    ),
  ].map((match) => ({ kind: match[1], tag: match[0] }));
}

/** Lessons spanning every archetype that owns an answer slot. */
const LESSONS = [
  { lessonNumber: 8, seed: "AS-K8" }, // ClassifyAndCount
  { lessonNumber: 9, seed: "AS-K9" }, // PatternComplete
  { lessonNumber: 12, seed: "AS-K12" }, // ModelCountAndTrace
  { lessonNumber: 17, seed: "AS-K17" }, // ConnectMatch + reasoning line
  { lessonNumber: 20, seed: "AS-K20" }, // PictureGraphRead (horizontal)
  { lessonNumber: 22, seed: "AS-K22" }, // SequenceAndZero
  { lessonNumber: 26, seed: "AS-K26" }, // SubitizePartWhole
];

const DIGIT_LESSONS = LESSONS.filter((lesson) => lesson.lessonNumber !== 17);
const LINE_LESSONS = LESSONS.filter((lesson) => lesson.lessonNumber !== 20);

describe("Answer Slot standard", () => {
  it("exposes one digit size and one line size", () => {
    expect(ANSWER_SLOT_SIZE_CLASS).toBe("h-12 w-12");
    expect(ANSWER_LINE_SIZE_CLASS).toBe("h-8 w-40");
  });

  it("keeps the question mark out of write and line slots", () => {
    const unknown = renderToStaticMarkup(
      React.createElement(AnswerSlot, {
        solved: false,
        ariaLabel: "مربع كتابة العدد",
        kind: "unknown",
      })
    );
    const write = renderToStaticMarkup(
      React.createElement(AnswerSlot, {
        solved: false,
        ariaLabel: "مربع كتابة العدد",
        kind: "write",
      })
    );
    const line = renderToStaticMarkup(
      React.createElement(AnswerLine, { solved: false })
    );

    expect(unknown).toContain("؟");
    expect(unknown).toContain(ANSWER_SLOT_SIZE_CLASS);
    expect(write).not.toContain("؟");
    expect(write).toContain(ANSWER_SLOT_SIZE_CLASS);
    expect(line).not.toContain("؟");
    expect(line).toContain(ANSWER_LINE_SIZE_CLASS);
  });

  it("uses the same 48×48 digit size in every worksheet archetype", () => {
    for (const lesson of DIGIT_LESSONS) {
      const html = renderWorksheet(lesson.lessonNumber, lesson.seed);
      const slots = slotTags(html).filter(
        (slot) => slot.kind === "unknown" || slot.kind === "write"
      );

      expect(
        slots.length,
        `lesson K-${lesson.lessonNumber} should render an answer slot`
      ).toBeGreaterThan(0);

      for (const slot of slots) {
        expect(
          slot.tag,
          `K-${lesson.lessonNumber} ${slot.kind} slot`
        ).toContain(ANSWER_SLOT_SIZE_CLASS);
      }
    }
  });

  it("uses the same 32×160 line size for every free-response slot", () => {
    for (const lesson of LINE_LESSONS) {
      const html = renderWorksheet(lesson.lessonNumber, lesson.seed);
      const lines = slotTags(html).filter((slot) => slot.kind === "line");

      expect(
        lines.length,
        `lesson K-${lesson.lessonNumber} should render a line slot`
      ).toBeGreaterThan(0);

      for (const line of lines) {
        expect(line.tag, `K-${lesson.lessonNumber} line slot`).toContain(
          ANSWER_LINE_SIZE_CLASS
        );
      }
    }
  });

  it("marks only unknown-value slots with ؟", () => {
    for (const lesson of LESSONS) {
      const html = renderWorksheet(lesson.lessonNumber, lesson.seed);

      const unknownBlocks = [
        ...html.matchAll(
          /<span[^>]*data-answer-slot="unknown"[^>]*>[\s\S]*?<\/span>/g
        ),
      ];
      for (const block of unknownBlocks) {
        expect(block[0]).toContain("؟");
      }

      const writeBlocks = [
        ...html.matchAll(
          /<span[^>]*data-answer-slot="write"[^>]*>[\s\S]*?<\/span>/g
        ),
      ];
      for (const block of writeBlocks) {
        expect(block[0]).not.toContain("؟");
      }

      const lineTags = slotTags(html).filter((slot) => slot.kind === "line");
      for (const line of lineTags) {
        expect(line.tag).not.toContain("؟");
      }
    }
  });

  it("replaces worksheet slots with solved slots in the answer key", () => {
    for (const lesson of LESSONS) {
      const worksheet = renderWorksheet(lesson.lessonNumber, lesson.seed);
      const answerKey = renderAnswerKey(lesson.lessonNumber, lesson.seed);

      expect(worksheet).not.toContain('data-answer-slot="solved-digit"');
      expect(worksheet).not.toContain('data-answer-slot="solved-line"');

      const solvedDigits = slotTags(answerKey).filter(
        (slot) => slot.kind === "solved-digit"
      );
      for (const slot of solvedDigits) {
        expect(slot.tag).toContain(ANSWER_SLOT_SIZE_CLASS);
      }

      expect(answerKey).not.toContain('data-answer-slot="unknown"');
      expect(answerKey).not.toContain('data-answer-slot="write"');
      expect(answerKey).not.toContain('data-answer-slot="line"');
    }
  });

  it("keeps the picture-graph model free of a second ؟ answer slot", () => {
    const worksheet = renderWorksheet(20, "AS-K20");
    const graphSvgs = [
      ...worksheet.matchAll(
        /<svg[^>]*data-graph-type="picture-graph"[\s\S]*?<\/svg>/g
      ),
    ];

    expect(graphSvgs.length).toBeGreaterThan(0);
    for (const svg of graphSvgs) {
      expect(svg[0]).not.toContain("؟");
    }

    // The single remaining slot is the dedicated response box below the graph.
    expect(worksheet).toContain('data-answer-slot="unknown"');

    const answerKey = renderAnswerKey(20, "AS-K20");
    const keySvgs = [
      ...answerKey.matchAll(
        /<svg[^>]*data-graph-type="picture-graph"[\s\S]*?<\/svg>/g
      ),
    ];
    expect(keySvgs.length).toBeGreaterThan(0);
    for (const svg of keySvgs) {
      expect(svg[0]).not.toContain("؟");
    }
    expect(answerKey).toContain('data-answer-slot="solved-digit"');
  });

  it("never leaks category counts in picture-graph captions or comparison prompts on the student worksheet", () => {
    for (const lessonNumber of [20, 21, 39]) {
      const worksheet = renderWorksheet(
        lessonNumber,
        `AS-NO-LEAK-K${lessonNumber}`
      );

      // Extract all picture-graph visual model containers and comparison prompts on the worksheet
      const graphContainers = [
        ...worksheet.matchAll(
          /<div[^>]*data-visual-model="picture-graph"[\s\S]*?<\/svg>([\s\S]*?)<\/div>/g
        ),
      ];
      for (const match of graphContainers) {
        const afterSvgCaption = match[1] ?? "";
        // Worksheet mode must not print a caption listing category counts like "(٣)" or "(٥)"
        expect(
          afterSvgCaption,
          `K-${lessonNumber} worksheet graph caption must not leak category counts`
        ).not.toMatch(/\([٠-٩]+\)/);
      }

      const comparisonBlocks = [
        ...worksheet.matchAll(
          /<div[^>]*data-graph-comparison="true"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g
        ),
      ];
      for (const block of comparisonBlocks) {
        // Comparison prompt in worksheet mode must not leak category counts like «نجمة مضيئة» (٣)
        expect(
          block[1],
          `K-${lessonNumber} worksheet comparison prompt must not leak category counts`
        ).not.toMatch(/»\s*\([٠-٩]+\)/);
      }
    }
  });
});
