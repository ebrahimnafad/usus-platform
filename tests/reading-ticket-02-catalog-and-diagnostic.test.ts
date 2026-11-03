import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  READING_LEVEL_1,
  getReadingLevel,
  getReadingStory,
  countStoryWords,
} from "@/curriculum/reading-catalog";
import type { ReadingStory, QARTier } from "@/domain/reading-types";
import {
  DIAGNOSTIC_QUESTIONS,
  evaluateDiagnosticAnswers,
  type DiagnosticAnswerMap,
} from "@/curriculum/reading-diagnostic";
import DiagnosticPage from "@/app/reading/diagnostic/page";

describe("Ticket 02 — Reading Level 1 Catalog Integrity", () => {
  it("defines Reading Level 1 with 12 complete story cycles", () => {
    expect(READING_LEVEL_1).toBeDefined();
    expect(READING_LEVEL_1.id).toBe("level-1");
    expect(READING_LEVEL_1.titleAr).toContain("المستوى الأول");
    expect(READING_LEVEL_1.subtitleAr).toContain("الانطلاق وبناء المعنى");
    expect(READING_LEVEL_1.stories).toHaveLength(12);

    // Can resolve by alias
    expect(getReadingLevel("level-1")).toBe(READING_LEVEL_1);
    expect(getReadingLevel("read_l1")).toBe(READING_LEVEL_1);
    expect(getReadingLevel("1")).toBe(READING_LEVEL_1);
  });

  it("enforces word count bounds (50–75 words) across all 12 stories", () => {
    READING_LEVEL_1.stories.forEach((story: ReadingStory) => {
      const actualCount = countStoryWords(story.text);
      expect(actualCount).toBeGreaterThanOrEqual(50);
      expect(actualCount).toBeLessThanOrEqual(75);
      expect(story.wordCount).toBe(actualCount);
    });
  });

  it("correctly designates Stories 4 and 10 as free-reading with zero questions", () => {
    const story4 = getReadingStory("level-1", 4);
    const story10 = getReadingStory("level-1", 10);

    expect(story4).toBeDefined();
    expect(story4?.type).toBe("free_reading");
    expect(story4?.qarQuestions).toHaveLength(0);
    expect(story4?.grammarDiscovery).toBeUndefined();

    expect(story10).toBeDefined();
    expect(story10?.type).toBe("free_reading");
    expect(story10?.qarQuestions).toHaveLength(0);
    expect(story10?.grammarDiscovery).toBeUndefined();
  });

  it("correctly designates Stories 6 and 12 as transfer-test stories", () => {
    const story6 = getReadingStory("level-1", 6);
    const story12 = getReadingStory("level-1", 12);

    expect(story6).toBeDefined();
    expect(story6?.type).toBe("transfer_test");

    expect(story12).toBeDefined();
    expect(story12?.type).toBe("transfer_test");
  });

  it("ensures standard stories have 3-tier QAR questions with exact text evidence snippets", () => {
    const standardStoryNumbers = [1, 2, 3, 5, 7, 8, 9, 11];

    standardStoryNumbers.forEach((num) => {
      const story = getReadingStory("level-1", num);
      expect(story).toBeDefined();
      expect(story?.type).toBe("standard");
      expect(story?.qarQuestions).toHaveLength(3);

      const tiers: QARTier[] = story!.qarQuestions.map((q) => q.tier);
      expect(tiers).toContain("direct");
      expect(tiers).toContain("inferential");
      expect(tiers).toContain("creative");

      // Verify each question has non-empty text evidence snippet that is an exact substring of story text
      story!.qarQuestions.forEach((q) => {
        expect(q.textEvidenceSnippet.trim().length).toBeGreaterThan(0);
        const snippetFound = story!.text.includes(q.textEvidenceSnippet);
        expect(
          snippetFound,
          `Expected evidence snippet "${q.textEvidenceSnippet}" to exist in story "${story!.title}"`
        ).toBe(true);
      });
    });
  });

  it("ensures standard stories define inductive grammar discovery steps", () => {
    const standardStoryNumbers = [1, 2, 3, 5, 7, 8, 9, 11];

    standardStoryNumbers.forEach((num) => {
      const story = getReadingStory("level-1", num);
      expect(story?.grammarDiscovery).toBeDefined();
      const grammar = story!.grammarDiscovery!;
      expect(grammar.targetRule.length).toBeGreaterThan(0);
      expect(grammar.examples.length).toBeGreaterThanOrEqual(2);
      expect(grammar.observation.length).toBeGreaterThan(0);
      expect(grammar.label.length).toBeGreaterThan(0);
      expect(grammar.productionPrompt.length).toBeGreaterThan(0);
    });
  });

  it("ensures all stories define teacher guide modeling scripts and blind-spot tips", () => {
    READING_LEVEL_1.stories.forEach((story: ReadingStory) => {
      expect(story.teacherGuide).toBeDefined();
      expect(story.teacherGuide.modelingScript.trim().length).toBeGreaterThan(0);
      expect(story.teacherGuide.blindSpotTips.length).toBeGreaterThanOrEqual(2);
    });
  });
});

describe("Ticket 02 — Starting-Point Diagnostic Questionnaire", () => {
  it("provides 5 to 6 comprehensive diagnostic questions", () => {
    expect(DIAGNOSTIC_QUESTIONS.length).toBeGreaterThanOrEqual(5);
    expect(DIAGNOSTIC_QUESTIONS.length).toBeLessThanOrEqual(6);

    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      expect(q.id).toBeDefined();
      expect(q.title).toBeDefined();
      expect(q.options.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("evaluates diagnostic answers to recommend appropriate reading levels", () => {
    // All high-score answers -> Level 2
    const advancedAnswers: DiagnosticAnswerMap = {};
    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      advancedAnswers[q.id] = q.options[q.options.length - 1].id;
    });
    const advancedResult = evaluateDiagnosticAnswers(advancedAnswers);
    expect(advancedResult.recommendedLevelId).toBe("level-2");
    expect(advancedResult.totalScore).toBe(12);

    // Medium-score answers -> Level 1 (target audience)
    const midAnswers: DiagnosticAnswerMap = {};
    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      midAnswers[q.id] = q.options[1].id;
    });
    const midResult = evaluateDiagnosticAnswers(midAnswers);
    expect(midResult.recommendedLevelId).toBe("level-1");
    expect(midResult.directLink).toBe("/reading/level/level-1");
    expect(midResult.titleAr).toContain("المستوى الأول");
    expect(midResult.totalScore).toBe(6);

    // Low-score answers -> Foundational (Level 0)
    const lowAnswers: DiagnosticAnswerMap = {};
    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      lowAnswers[q.id] = q.options[0].id;
    });
    const lowResult = evaluateDiagnosticAnswers(lowAnswers);
    expect(lowResult.recommendedLevelId).toBe("level-0");
    expect(lowResult.totalScore).toBe(0);

    // Boundary test: score 4 -> Level 0
    // 4 questions with score 1, 2 questions with score 0 => score 4
    const boundary4: DiagnosticAnswerMap = {
      [DIAGNOSTIC_QUESTIONS[0].id]: DIAGNOSTIC_QUESTIONS[0].options[1].id, // 1
      [DIAGNOSTIC_QUESTIONS[1].id]: DIAGNOSTIC_QUESTIONS[1].options[1].id, // 1
      [DIAGNOSTIC_QUESTIONS[2].id]: DIAGNOSTIC_QUESTIONS[2].options[1].id, // 1
      [DIAGNOSTIC_QUESTIONS[3].id]: DIAGNOSTIC_QUESTIONS[3].options[1].id, // 1
      [DIAGNOSTIC_QUESTIONS[4].id]: DIAGNOSTIC_QUESTIONS[4].options[0].id, // 0
      [DIAGNOSTIC_QUESTIONS[5].id]: DIAGNOSTIC_QUESTIONS[5].options[0].id, // 0
    };
    expect(evaluateDiagnosticAnswers(boundary4).recommendedLevelId).toBe("level-0");

    // Boundary test: score 5 -> Level 1
    // 5 questions with score 1, 1 question with score 0 => score 5
    const boundary5: DiagnosticAnswerMap = {
      ...boundary4,
      [DIAGNOSTIC_QUESTIONS[4].id]: DIAGNOSTIC_QUESTIONS[4].options[1].id, // 1
    };
    expect(evaluateDiagnosticAnswers(boundary5).recommendedLevelId).toBe("level-1");

    // Boundary test: score 9 -> Level 1
    // 3 questions with score 2, 3 questions with score 1 => score 9
    const boundary9: DiagnosticAnswerMap = {
      [DIAGNOSTIC_QUESTIONS[0].id]: DIAGNOSTIC_QUESTIONS[0].options[2].id, // 2
      [DIAGNOSTIC_QUESTIONS[1].id]: DIAGNOSTIC_QUESTIONS[1].options[2].id, // 2
      [DIAGNOSTIC_QUESTIONS[2].id]: DIAGNOSTIC_QUESTIONS[2].options[2].id, // 2
      [DIAGNOSTIC_QUESTIONS[3].id]: DIAGNOSTIC_QUESTIONS[3].options[1].id, // 1
      [DIAGNOSTIC_QUESTIONS[4].id]: DIAGNOSTIC_QUESTIONS[4].options[1].id, // 1
      [DIAGNOSTIC_QUESTIONS[5].id]: DIAGNOSTIC_QUESTIONS[5].options[1].id, // 1
    };
    expect(evaluateDiagnosticAnswers(boundary9).recommendedLevelId).toBe("level-1");

    // Boundary test: score 10 -> Level 2
    // 4 questions with score 2, 2 questions with score 1 => score 10
    const boundary10: DiagnosticAnswerMap = {
      ...boundary9,
      [DIAGNOSTIC_QUESTIONS[3].id]: DIAGNOSTIC_QUESTIONS[3].options[2].id, // 2
    };
    expect(evaluateDiagnosticAnswers(boundary10).recommendedLevelId).toBe("level-2");
  });

  it("verifies all stories have non-empty sight words and themes", () => {
    READING_LEVEL_1.stories.forEach((story) => {
      expect(story.targetSightWords.length).toBeGreaterThanOrEqual(3);
      expect(story.theme.trim().length).toBeGreaterThan(0);
      expect(story.title.trim().length).toBeGreaterThan(0);
      expect(story.text.trim().length).toBeGreaterThan(0);
    });
  });

  it("renders the diagnostic questionnaire page at /reading/diagnostic", () => {
    const html = renderToString(React.createElement(DiagnosticPage));
    expect(html).toContain("التشخيص");
    expect(html).toContain("الانطلاق وبناء المعنى");
    // Verify Arabic labels and question rendering
    expect(html).toContain(DIAGNOSTIC_QUESTIONS[0].title);
  });
});
