import { describe, expect, it } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { getReadingStory, getReadingLevel } from "@/curriculum/reading-catalog";
import StoryCycleRunnerPage from "@/app/reading/level/[levelId]/story/[storyId]/page";
import { stripTashkeel, highlightTextSnippet } from "@/lib/reading-scaffold";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 04 — Interactive Story Cycle Runner and Scaffold Engine", () => {
  const level1 = getReadingLevel("level-1")!;
  const story1 = getReadingStory("level-1", 1)!;

  describe("Tashkeel & Scaffold Text Utilities", () => {
    it("strips Arabic diacritics cleanly without corrupting letters", () => {
      const textWithTashkeel = "وَقَفَ عُصْفُورٌ صَغِيرٌ عَلَى نَافِذَةِ";
      const stripped = stripTashkeel(textWithTashkeel);
      expect(stripped).toBe("وقف عصفور صغير على نافذة");
      expect(stripped).not.toContain("َ");
      expect(stripped).not.toContain("ْ");
      expect(stripped).not.toContain("ٌ");
      expect(stripped).not.toContain("ِ");
    });

    it("highlights an evidence snippet inside story text", () => {
      const baseText = "وقف عصفور صغير على نافذة سامي.";
      const snippet = "عصفور صغير";
      const html = highlightTextSnippet(baseText, snippet);
      expect(html).toContain("<mark");
      expect(html).toContain("عصفور صغير</mark>");
    });
  });

  describe("Story Cycle Page Route (/reading/level/[levelId]/story/[storyId])", () => {
    it("loads and renders Story 1 with 6-station stepper and story text", async () => {
      const pageComponent = await StoryCycleRunnerPage({
        params: Promise.resolve({ levelId: "level-1", storyId: "1" }),
      });
      const html = renderToString(pageComponent);

      // 1. Breadcrumb navigation
      expect(html).toContain("الرئيسية");
      expect(html).toContain("القراءة");
      expect(html).toContain("المستوى الأول");
      expect(html).toContain("عُصْفُورُ سَامِي");

      // 2. All 6 station names in stepper
      expect(html).toContain("اكتشاف المعنى");
      expect(html).toContain("الطلاقة");
      expect(html).toContain("الأسئلة والتحليل");
      expect(html).toContain("معمل النحو");
      expect(html).toContain("التعبير");
      expect(html).toContain("المراجعة");

      // 3. Story text rendered in Amiri font class
      expect(html).toContain("font-serif");
      expect(html).toContain("وَقَفَ عُصْفُورٌ صَغِيرٌ");

      // 4. Eastern Arabic Numerals check
      const westernNums = findWesternNumeralsInRenderedHtml(html);
      expect(westernNums).toEqual([]);
    });

    it("renders fallback when story does not exist", async () => {
      const pageComponent = await StoryCycleRunnerPage({
        params: Promise.resolve({ levelId: "level-1", storyId: "99" }),
      });
      const html = renderToString(pageComponent);

      expect(html).toContain("القصة غير موجودة");
      expect(html).toContain("/reading/level/level-1");
    });
  });
});
