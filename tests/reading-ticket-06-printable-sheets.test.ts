import { describe, expect, it } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { getReadingStory, getReadingLevel } from "@/curriculum/reading-catalog";
import PrintableReadingSheet from "@/components/reading/PrintableReadingSheet";
import StoryCycleRunnerPage from "@/app/reading/level/[levelId]/story/[storyId]/page";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 06 — Zero-Overflow Printable A4 Reading Worksheets", () => {
  const level1 = getReadingLevel("level-1")!;
  const standardStory = getReadingStory("level-1", 1)!;
  const freeReadingStory = getReadingStory("level-1", 4)!;
  const transferTestStory = getReadingStory("level-1", 6)!;

  describe("Standard Printable Sheet Variant", () => {
    it("renders A4 sheet container with header, story, QAR questions, and grammar lab", () => {
      const html = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
        })
      );

      // 1. A4 Sheet structure & print classes
      expect(html).toContain("a4-sheet");
      expect(html).toContain("أُسُس — نادي القراءة والفهم القرائي");
      expect(html).toContain("الصفحة ١/١");
      expect(html).toContain("الاسم:");
      expect(html).toContain("التاريخ:");

      // 2. Story text present in Naskh typography
      expect(html).toContain("عُصْفُورُ سَامِي");
      expect(html).toContain("وَقَفَ عُصْفُورٌ صَغِيرٌ");

      // 3. QAR questions section with 3 tiers
      expect(html).toContain("أسئلة الفهم (أين تعيش الإجابة؟)");
      expect(html).toContain("مباشر");
      expect(html).toContain("استنتاجي");
      expect(html).toContain("إبداعي");

      // 4. Grammar lab section
      expect(html).toContain("معمل اللغة (اكتشف القاعدة)");
      expect(html).toContain(standardStory.grammarDiscovery?.targetRule ?? "");

      // 5. Eastern Arabic Numerals check
      const westernNums = findWesternNumeralsInRenderedHtml(html);
      expect(westernNums).toEqual([]);
    });
  });

  describe("Free-Reading Printable Sheet Variant", () => {
    it("renders story-only printable sheet without QAR or grammar boxes", () => {
      const html = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: freeReadingStory,
        })
      );

      // 1. Story text present
      expect(html).toContain("رِحْلَةُ الغَيْمَةِ البَيْضَاءِ");
      expect(html).toContain("جلسة قراءة حرة للمتعة");

      // 2. Zero questions or grammar sections
      expect(html).not.toContain("أسئلة الفهم");
      expect(html).not.toContain("معمل اللغة");

      // 3. Zero Western numerals
      const westernNums = findWesternNumeralsInRenderedHtml(html);
      expect(westernNums).toEqual([]);
    });
  });

  describe("Transfer-Test Printable Sheet Variant", () => {
    it("renders unassisted assessment sheet with transfer-test badge", () => {
      const html = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: transferTestStory,
        })
      );

      expect(html).toContain("اختبار النقل");
      expect(html).toContain("أسئلة الفهم");

      // Zero Western numerals
      const westernNums = findWesternNumeralsInRenderedHtml(html);
      expect(westernNums).toEqual([]);
    });
  });

  describe("Print Isolation and Natural Pagination (Ticket 01)", () => {
    it("renders PrintableReadingSheet without overflow-hidden and without max-height", () => {
      const html = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
        })
      );

      // Container should have a4-sheet but not overflow-hidden
      expect(html).toContain("a4-sheet");
      expect(html).not.toContain("overflow-hidden");
      expect(html).not.toContain("max-height");
      expect(html).not.toContain("maxHeight");

      // Verify sections have break-inside avoid
      expect(html).toContain("break-inside-avoid");
    });

    it("ensures StoryCycleRunnerPage has no-print on main wrapper to isolate printable sheet", async () => {
      const pageComponent = await StoryCycleRunnerPage({
        params: Promise.resolve({ levelId: "level-1", storyId: "1" }),
      });
      const html = renderToString(pageComponent);

      // <main> wrapper must be hidden in print
      expect(html).toMatch(/<main[^>]*class="[^"]*no-print[^"]*"/);
    });
  });

  describe("Colored Sections and Visual Richness (Ticket 02)", () => {
    it("renders story with emerald border/bg, QAR with sky, and grammar with violet", () => {
      const html = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
        })
      );

      // 1. Story section (📖) with emerald-400 left border and emerald-50/40 background
      expect(html).toContain("border-l-emerald-400");
      expect(html).toContain("bg-emerald-50/40");

      // 2. QAR section (🔍) with sky-400 left border and sky-50/40 background
      expect(html).toContain("border-l-sky-400");
      expect(html).toContain("bg-sky-50/40");

      // 3. Grammar Lab section (🧩) with violet-400 left border and violet-50/40 background
      expect(html).toContain("border-l-violet-400");
      expect(html).toContain("bg-violet-50/40");

      // 4. Uniform border-slate-300 is replaced
      expect(html).not.toContain("border-slate-300");

      // 5. Eastern Arabic Numerals invariant holds
      const westernNums = findWesternNumeralsInRenderedHtml(html);
      expect(westernNums).toEqual([]);
    });

    it("preserves colored sections when rendering transfer-test variant with target badge", () => {
      const html = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: transferTestStory,
        })
      );

      // Transfer test badge present
      expect(html).toContain("🎯 اختبار النقل");

      // Colored sections present
      expect(html).toContain("border-l-emerald-400");
      expect(html).toContain("bg-emerald-50/40");
      expect(html).toContain("border-l-sky-400");
      expect(html).toContain("bg-sky-50/40");
      expect(html).toContain("border-l-violet-400");
      expect(html).toContain("bg-violet-50/40");

      // Zero Western numerals
      const westernNums = findWesternNumeralsInRenderedHtml(html);
      expect(westernNums).toEqual([]);
    });

    it("preserves amber-themed story-only layout for free-reading variant", () => {
      const html = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: freeReadingStory,
        })
      );

      // Amber styling intact
      expect(html).toContain("border-amber-300");
      expect(html).toContain("bg-amber-50/20");

      // No QAR or Grammar sections
      expect(html).not.toContain("border-l-sky-400");
      expect(html).not.toContain("border-l-violet-400");

      // Zero Western numerals
      const westernNums = findWesternNumeralsInRenderedHtml(html);
      expect(westernNums).toEqual([]);
    });
  });

  describe("Page Integration", () => {
    it("includes PrintableReadingSheet inside the story cycle page", async () => {
      const pageComponent = await StoryCycleRunnerPage({
        params: Promise.resolve({ levelId: "level-1", storyId: "1" }),
      });
      const html = renderToString(pageComponent);

      expect(html).toContain("a4-sheet");
      expect(html).toContain("الصفحة ١/١");
    });
  });
});
