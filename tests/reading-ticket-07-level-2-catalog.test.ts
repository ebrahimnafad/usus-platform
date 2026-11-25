import { describe, it, expect } from "vitest";
import {
  READING_LEVEL_2,
  getReadingLevel,
  getReadingStory,
  countStoryWords,
} from "@/curriculum/reading-catalog";
import type { ReadingStory, QARTier } from "@/domain/reading-types";
import { getDefaultTashkeelMode } from "@/lib/reading-scaffold";
import React from "react";
import { renderToString } from "react-dom/server";
import PrintableReadingSheet from "@/components/reading/PrintableReadingSheet";
import {
  evaluateDiagnosticAnswers,
  DIAGNOSTIC_QUESTIONS,
} from "@/curriculum/reading-diagnostic";
import type { DiagnosticAnswerMap } from "@/curriculum/reading-diagnostic";
import ReadingHubPage from "@/app/reading/page";
import { GET as getReadingPrintHtml } from "@/app/api/reading-print-html/route";
import { NextRequest } from "next/server";

describe("Ticket 07 — Reading Level 2 Catalog Integrity", () => {
  it("defines Reading Level 2 with 12 complete story cycles", () => {
    expect(READING_LEVEL_2).toBeDefined();
    expect(READING_LEVEL_2.id).toBe("level-2");
    expect(READING_LEVEL_2.levelNumber).toBe(2);
    expect(READING_LEVEL_2.titleAr).toContain("المستوى الثاني");
    expect(READING_LEVEL_2.subtitleAr).toContain("التوسع والضمائر");
    expect(READING_LEVEL_2.stories).toHaveLength(12);
  });

  it("resolves Level 2 by all three canonical aliases", () => {
    expect(getReadingLevel("level-2")).toBe(READING_LEVEL_2);
    expect(getReadingLevel("read_l2")).toBe(READING_LEVEL_2);
    expect(getReadingLevel("2")).toBe(READING_LEVEL_2);
  });

  it("sets targetWordCount to { min: 75, max: 100 }", () => {
    expect(READING_LEVEL_2.targetWordCount.min).toBe(75);
    expect(READING_LEVEL_2.targetWordCount.max).toBe(100);
  });

  it("enforces word count bounds (75–100 words) across all 12 stories", () => {
    READING_LEVEL_2.stories.forEach((story: ReadingStory) => {
      const actualCount = countStoryWords(story.text);
      expect(
        actualCount,
        `Story ${story.storyNumber} "${story.title}" has ${actualCount} words (expected 75–100)`
      ).toBeGreaterThanOrEqual(75);
      expect(
        actualCount,
        `Story ${story.storyNumber} "${story.title}" has ${actualCount} words (expected 75–100)`
      ).toBeLessThanOrEqual(100);
      expect(story.wordCount).toBe(actualCount);
    });
  });

  it("designates Stories 4 and 10 as free-reading with zero questions and no grammar", () => {
    const story4 = getReadingStory("level-2", 4);
    const story10 = getReadingStory("level-2", 10);

    expect(story4?.type).toBe("free_reading");
    expect(story4?.qarQuestions).toHaveLength(0);
    expect(story4?.grammarDiscovery).toBeUndefined();
    expect(story4?.expressionPrompt).toBeUndefined();

    expect(story10?.type).toBe("free_reading");
    expect(story10?.qarQuestions).toHaveLength(0);
    expect(story10?.grammarDiscovery).toBeUndefined();
    expect(story10?.expressionPrompt).toBeUndefined();
  });

  it("designates Stories 6 and 12 as transfer-test stories", () => {
    const story6 = getReadingStory("level-2", 6);
    const story12 = getReadingStory("level-2", 12);

    expect(story6?.type).toBe("transfer_test");
    expect(story12?.type).toBe("transfer_test");
  });

  it("ensures the 10 non-free-reading stories have 3-tier QAR with text evidence", () => {
    const nonFreeStoryNumbers = [1, 2, 3, 5, 6, 7, 8, 9, 11, 12];

    nonFreeStoryNumbers.forEach((num) => {
      const story = getReadingStory("level-2", num);
      expect(story, `Story ${num} not found`).toBeDefined();
      expect(story?.qarQuestions).toHaveLength(3);

      const tiers: QARTier[] = story!.qarQuestions.map((q) => q.tier);
      expect(tiers).toContain("direct");
      expect(tiers).toContain("inferential");
      expect(tiers).toContain("creative");

      story!.qarQuestions.forEach((q) => {
        expect(q.textEvidenceSnippet.trim().length).toBeGreaterThan(0);
        const snippetFound = story!.text.includes(q.textEvidenceSnippet);
        expect(
          snippetFound,
          `Evidence snippet "${q.textEvidenceSnippet}" not found in story ${num} "${story!.title}"`
        ).toBe(true);
      });
    });
  });

  it("ensures the 8 standard stories define inductive grammar discovery", () => {
    const standardStoryNumbers = [1, 2, 3, 5, 7, 8, 9, 11];

    standardStoryNumbers.forEach((num) => {
      const story = getReadingStory("level-2", num);
      expect(story?.grammarDiscovery).toBeDefined();
      const grammar = story!.grammarDiscovery!;
      expect(grammar.targetRule.length).toBeGreaterThan(0);
      expect(grammar.examples.length).toBeGreaterThanOrEqual(2);
      expect(grammar.observation.length).toBeGreaterThan(0);
      expect(grammar.label.length).toBeGreaterThan(0);
      expect(grammar.productionPrompt.length).toBeGreaterThan(0);
    });
  });

  it("ensures all 12 stories define teacher guide with modeling script and blind-spot tips", () => {
    READING_LEVEL_2.stories.forEach((story: ReadingStory) => {
      expect(story.teacherGuide).toBeDefined();
      expect(story.teacherGuide.modelingScript.trim().length).toBeGreaterThan(
        0
      );
      expect(story.teacherGuide.blindSpotTips.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("ensures all stories have non-empty sight words and themes", () => {
    READING_LEVEL_2.stories.forEach((story) => {
      expect(story.targetSightWords.length).toBeGreaterThanOrEqual(3);
      expect(story.theme.trim().length).toBeGreaterThan(0);
      expect(story.title.trim().length).toBeGreaterThan(0);
      expect(story.text.trim().length).toBeGreaterThan(0);
    });
  });

  it("validates the 10-topic inductive grammar sequence across non-free-reading stories", () => {
    const grammarTopicMap: Record<number, string> = {
      1: "الضمائر المنفصلة",
      2: "الضمائر المتصلة",
      3: "الضمير المستتر",
      5: "ظرف الزمان",
      6: "ظرف المكان",
      7: "حروف العطف",
      8: "أسلوب النفي",
      9: "أسلوب الاستفهام",
      11: "الصفة والموصوف",
      12: "المفعول به",
    };

    Object.entries(grammarTopicMap).forEach(([numStr, expectedTopic]) => {
      const story = getReadingStory("level-2", Number(numStr));
      expect(
        story?.grammarDiscovery?.targetRule,
        `Story ${numStr} grammar topic`
      ).toContain(expectedTopic);
    });
  });
});

describe("Ticket 07 — Level 2 Default Tashkeel Scaffolding", () => {
  it("returns 'partial' as the default Tashkeel mode for Level 2", () => {
    expect(getDefaultTashkeelMode(2)).toBe("partial");
  });

  it("returns 'full' as the default Tashkeel mode for Level 1", () => {
    expect(getDefaultTashkeelMode(1)).toBe("full");
    expect(getDefaultTashkeelMode(undefined)).toBe("full");
  });

  it("returns 'none' as the default Tashkeel mode for Level 3+", () => {
    expect(getDefaultTashkeelMode(3)).toBe("none");
  });
});

describe("Ticket 07 — Level 2 Printable Sheet Rendering", () => {
  const level2 = READING_LEVEL_2;

  it("renders Level 2 standard story with QAR and grammar lab on A4 sheet", () => {
    const standardStory = getReadingStory("level-2", 1)!;
    const html = renderToString(
      React.createElement(PrintableReadingSheet, {
        level: level2,
        story: standardStory,
        tashkeelMode: "partial",
        alwaysVisible: true,
      })
    );

    expect(html).toContain("a4-sheet");
    expect(html).toContain("أُسُس — نادي القراءة والفهم القرائي");
    expect(html).toContain("مَرْصَدُ الأَصْدِقَاءِ الصَّغِيرُ");
    expect(html).toContain("أسئلة الفهم");
    expect(html).toContain("مباشر");
    expect(html).toContain("استنتاجي");
    expect(html).toContain("إبداعي");
    expect(html).toContain("معمل اللغة");
    expect(html).toContain(standardStory.grammarDiscovery?.targetRule ?? "");
    // Level 2 typography class
    expect(html).toContain("text-[19px]");
    expect(html).toContain("leading-[2.3]");
  });

  it("renders Level 2 free-reading nook without QAR or grammar sections", () => {
    const freeStory = getReadingStory("level-2", 4)!;
    const html = renderToString(
      React.createElement(PrintableReadingSheet, {
        level: level2,
        story: freeStory,
        tashkeelMode: "partial",
        alwaysVisible: true,
      })
    );

    expect(html).toContain("أُورْكِسْتْرَا المَطَرِ");
    expect(html).toContain("جلسة قراءة حرة للمتعة");
    expect(html).not.toContain("أسئلة الفهم");
    expect(html).not.toContain("معمل اللغة");
  });

  it("renders Level 2 transfer-test sheet with assessment badge", () => {
    const transferStory = getReadingStory("level-2", 6)!;
    const html = renderToString(
      React.createElement(PrintableReadingSheet, {
        level: level2,
        story: transferStory,
        tashkeelMode: "partial",
        alwaysVisible: true,
      })
    );

    expect(html).toContain("اختبار النقل");
    expect(html).toContain("أسئلة الفهم");
    expect(html).toContain("حَارِسُ المَنَارَةِ السَّاحِلِيَّةِ");
  });
});

describe("Ticket 07 — Diagnostic routes level-2 to /reading/level/level-2", () => {
  it("evaluates max-score diagnostic to level-2 with correct directLink", () => {
    const advancedAnswers: DiagnosticAnswerMap = {};
    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      advancedAnswers[q.id] = q.options[q.options.length - 1].id;
    });
    const result = evaluateDiagnosticAnswers(advancedAnswers);
    expect(result.recommendedLevelId).toBe("level-2");
    expect(result.directLink).toBe("/reading/level/level-2");
  });

  it("renders an active Level 2 card on the Reading Hub linking to /reading/level/level-2", () => {
    const html = renderToString(React.createElement(ReadingHubPage));
    expect(html).toContain("/reading/level/level-2");
    expect(html).toContain(READING_LEVEL_2.titleAr);
    expect(html).toContain(READING_LEVEL_2.subtitleAr);
  });

  it("defaults /api/reading-print-html to partial tashkeel for Level 2 when omitted", async () => {
    const req = new NextRequest(
      "http://localhost/api/reading-print-html?level=level-2&story=1&scope=story&viewOption=student"
    );
    const res = await getReadingPrintHtml(req);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { html: string };
    expect(body.html).toContain("تشكيل جزئي");
  });
});
