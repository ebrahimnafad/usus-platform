import { describe, it, expect } from "vitest";
import {
  READING_LEVEL_3,
  getReadingLevel,
  getReadingStory,
  countStoryWords,
} from "@/curriculum/reading-catalog";
import type { ReadingStory, QARTier } from "@/domain/reading-types";
import { getDefaultTashkeelMode } from "@/lib/reading-scaffold";
import React from "react";
import { renderToString } from "react-dom/server";
import PrintableReadingSheet from "@/components/reading/PrintableReadingSheet";
import ReadingHubPage from "@/app/reading/page";
import { GET as getReadingPrintHtml } from "@/app/api/reading-print-html/route";
import { NextRequest } from "next/server";

describe("Ticket 08 — Reading Level 3 Catalog Integrity", () => {
  it("defines Reading Level 3 with 12 complete story cycles", () => {
    expect(READING_LEVEL_3).toBeDefined();
    expect(READING_LEVEL_3.id).toBe("level-3");
    expect(READING_LEVEL_3.levelNumber).toBe(3);
    expect(READING_LEVEL_3.titleAr).toContain("المستوى الثالث");
    expect(READING_LEVEL_3.subtitleAr).toContain("الاستقلال والاستنتاج المركب");
    expect(READING_LEVEL_3.stories).toHaveLength(12);
  });

  it("resolves Level 3 by all three canonical aliases", () => {
    expect(getReadingLevel("level-3")).toBe(READING_LEVEL_3);
    expect(getReadingLevel("read_l3")).toBe(READING_LEVEL_3);
    expect(getReadingLevel("3")).toBe(READING_LEVEL_3);
  });

  it("sets targetWordCount to { min: 100, max: 140 }", () => {
    expect(READING_LEVEL_3.targetWordCount.min).toBe(100);
    expect(READING_LEVEL_3.targetWordCount.max).toBe(140);
  });

  it("enforces word count bounds (100–140 words) and 2–3 paragraphs across all 12 stories", () => {
    READING_LEVEL_3.stories.forEach((story: ReadingStory) => {
      const actualCount = countStoryWords(story.text);
      expect(
        actualCount,
        `Story ${story.storyNumber} "${story.title}" has ${actualCount} words (expected 100–140)`
      ).toBeGreaterThanOrEqual(100);
      expect(
        actualCount,
        `Story ${story.storyNumber} "${story.title}" has ${actualCount} words (expected 100–140)`
      ).toBeLessThanOrEqual(140);
      expect(story.wordCount).toBe(actualCount);

      const paragraphs = story.text.split("\n\n").filter(Boolean);
      expect(
        paragraphs.length,
        `Story ${story.storyNumber} "${story.title}" should have 2–3 paragraphs`
      ).toBeGreaterThanOrEqual(2);
      expect(paragraphs.length).toBeLessThanOrEqual(3);
    });
  });

  it("designates Stories 4 and 10 as free-reading with zero questions and no grammar", () => {
    const story4 = getReadingStory("level-3", 4);
    const story10 = getReadingStory("level-3", 10);

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
    const story6 = getReadingStory("level-3", 6);
    const story12 = getReadingStory("level-3", 12);

    expect(story6?.type).toBe("transfer_test");
    expect(story12?.type).toBe("transfer_test");
  });

  it("ensures the 10 non-free-reading stories have 4 QAR questions (1 direct, 2 inferential, 1 creative) with verbatim evidence", () => {
    const nonFreeStoryNumbers = [1, 2, 3, 5, 6, 7, 8, 9, 11, 12];

    nonFreeStoryNumbers.forEach((num) => {
      const story = getReadingStory("level-3", num);
      expect(story, `Story ${num} not found`).toBeDefined();
      expect(story?.qarQuestions).toHaveLength(4);

      const tiers: QARTier[] = story!.qarQuestions.map((q) => q.tier);
      expect(tiers.filter((t) => t === "direct")).toHaveLength(1);
      expect(tiers.filter((t) => t === "inferential")).toHaveLength(2);
      expect(tiers.filter((t) => t === "creative")).toHaveLength(1);

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

  it("validates the 10-topic Level 3 inductive grammar sequence across non-free-reading stories", () => {
    const grammarTopicMap: Record<number, string> = {
      1: "الجملة الاسمية",
      2: "كان وأخواتها",
      3: "إنَّ وأخواتها",
      5: "المفعول لأجله",
      6: "المفعول المطلق",
      7: "الحال",
      8: "أسلوب التفضيل",
      9: "أسلوب الشرط البسيط",
      11: "أسلوب النداء",
      12: "المبني للمعلوم والمبني للمجهول",
    };

    Object.entries(grammarTopicMap).forEach(([numStr, expectedTopic]) => {
      const story = getReadingStory("level-3", Number(numStr));
      expect(
        story?.grammarDiscovery?.targetRule,
        `Story ${numStr} grammar topic`
      ).toContain(expectedTopic);
      expect(story?.grammarDiscovery?.examples.length).toBeGreaterThanOrEqual(
        2
      );
      expect(story?.grammarDiscovery?.observation.length).toBeGreaterThan(0);
      expect(story?.grammarDiscovery?.label.length).toBeGreaterThan(0);
      expect(story?.grammarDiscovery?.productionPrompt.length).toBeGreaterThan(
        0
      );
    });
  });

  it("ensures all 12 stories define teacher guide, sight words, and themes", () => {
    READING_LEVEL_3.stories.forEach((story: ReadingStory) => {
      expect(story.teacherGuide).toBeDefined();
      expect(story.teacherGuide.modelingScript.trim().length).toBeGreaterThan(
        0
      );
      expect(story.teacherGuide.blindSpotTips.length).toBeGreaterThanOrEqual(1);
      expect(story.targetSightWords.length).toBeGreaterThanOrEqual(3);
      expect(story.theme.trim().length).toBeGreaterThan(0);
    });
  });
});

describe("Ticket 08 — Level 3 Printable Sheet & Hub Integration", () => {
  it("defaults Level 3 to 'none' Tashkeel and renders Level 3 typography and multi-page QAR flow", () => {
    expect(getDefaultTashkeelMode(3)).toBe("none");

    const story1 = getReadingStory("level-3", 1)!;
    const html = renderToString(
      React.createElement(PrintableReadingSheet, {
        level: READING_LEVEL_3,
        story: story1,
        alwaysVisible: true,
      })
    );

    expect(html).toContain("text-[16px]");
    expect(html).toContain("leading-[2.1]");
    expect(html).toContain("whitespace-pre-line");
    expect(html).toContain("بدون تشكيل");
    expect(html).toContain("الجملة الاسمية");
  });

  it("renders an active Level 3 card on the Reading Hub linking to /reading/level/level-3", () => {
    const html = renderToString(React.createElement(ReadingHubPage));
    expect(html).toContain("/reading/level/level-3");
    expect(html).toContain(READING_LEVEL_3.titleAr);
    expect(html).toContain(READING_LEVEL_3.subtitleAr);
  });

  it("defaults /api/reading-print-html to no tashkeel for Level 3 when omitted", async () => {
    const req = new NextRequest(
      "http://localhost/api/reading-print-html?level=level-3&story=1&scope=story&viewOption=student"
    );
    const res = await getReadingPrintHtml(req);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { html: string };
    expect(body.html).toContain("بدون تشكيل");
  });
});
