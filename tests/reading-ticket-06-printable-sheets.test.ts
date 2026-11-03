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
      // Ticket 05: hardcoded page number is replaced with dynamic CSS counter
      expect(html).not.toContain("الصفحة ١/١");
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

  describe("Tier-Scaled Answer Lines and Self-Assessment (Ticket 03)", () => {
    it("renders answer lines scaled by QAR tier (1 for direct, 2 for inferential, 3 for creative) and 1 for grammar", () => {
      const html = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
        })
      );

      // 1. Direct question: 1 answer line element
      const directMatches = html.match(
        /data-tier="direct"[^>]*>[\s\S]*?(?:data-answer-line|h-\[12mm\])/g
      );
      expect(directMatches).toBeTruthy();

      // Extract each QAR question block by data-tier
      const directBlock =
        html.match(
          /data-tier="direct"[\s\S]*?(?=data-tier=|<\/section>)/
        )?.[0] ?? "";
      const inferentialBlock =
        html.match(
          /data-tier="inferential"[\s\S]*?(?=data-tier=|<\/section>)/
        )?.[0] ?? "";
      const creativeBlock =
        html.match(
          /data-tier="creative"[\s\S]*?(?=data-tier=|<\/section>)/
        )?.[0] ?? "";

      const countLines = (block: string) =>
        (block.match(/h-\[12mm\]/g) || []).length;

      expect(countLines(directBlock)).toBe(1);
      expect(countLines(inferentialBlock)).toBe(2);
      expect(countLines(creativeBlock)).toBe(3);

      // Grammar lab production prompt has exactly 1 line at 12mm
      const grammarSection =
        html.match(/🧩 معمل اللغة[\s\S]*?<\/section>/)?.[0] ?? "";
      expect(countLines(grammarSection)).toBe(1);

      // Old h-6 answer lines are completely replaced with h-[12mm]
      expect(html).not.toContain("h-6 border-b border-dotted");

      // Total 12mm answer lines across the sheet: 1 + 2 + 3 + 1 = 7
      expect((html.match(/h-\[12mm\]/g) || []).length).toBe(7);
    });

    it("renders self-assessment strip in standard and transfer-test variants, but omits it in free-reading", () => {
      // Standard variant
      const standardHtml = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
        })
      );
      expect(standardHtml).toContain("كيف أحسست بأدائي؟");
      expect(standardHtml).toContain("☆");
      // 3 stars
      const standardStarCount = (standardHtml.match(/☆/g) || []).length;
      expect(standardStarCount).toBe(3);

      // Transfer-test variant
      const transferHtml = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: transferTestStory,
        })
      );
      expect(transferHtml).toContain("كيف أحسست بأدائي؟");
      expect(transferHtml).toContain("☆");

      // Free-reading variant: must NOT have self-assessment strip
      const freeHtml = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: freeReadingStory,
        })
      );
      expect(freeHtml).not.toContain("كيف أحسست بأدائي؟");
      expect(freeHtml).not.toContain("☆");

      // Story without grammarDiscovery: self-assessment strip still renders (after QAR)
      const storyWithoutGrammar = {
        ...standardStory,
        grammarDiscovery: undefined,
      };
      const noGrammarHtml = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: storyWithoutGrammar,
        })
      );
      expect(noGrammarHtml).not.toContain("🧩 معمل اللغة");
      expect(noGrammarHtml).toContain("كيف أحسست بأدائي؟");
      expect(noGrammarHtml).toContain("☆");

      // Eastern Arabic Numerals invariant holds across all rendered outputs
      expect(findWesternNumeralsInRenderedHtml(standardHtml)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(transferHtml)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(freeHtml)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(noGrammarHtml)).toEqual([]);
    });
  });

  describe("Page Integration", () => {
    it("includes PrintableReadingSheet inside the story cycle page", async () => {
      const pageComponent = await StoryCycleRunnerPage({
        params: Promise.resolve({ levelId: "level-1", storyId: "1" }),
      });
      const html = renderToString(pageComponent);

      expect(html).toContain("a4-sheet");
      // Ticket 05: hardcoded "الصفحة ١/١" replaced with CSS counter
      expect(html).not.toContain("الصفحة ١/١");
    });
  });

  describe("Tashkeel-Aware Print, Story Toggle, and Level Typography (Ticket 04)", () => {
    it("renders tashkeel level badge in the header reflecting tashkeelMode prop", () => {
      const htmlFull = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
          tashkeelMode: "full",
        })
      );
      expect(htmlFull).toContain("تشكيل كامل");

      const htmlPartial = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
          tashkeelMode: "partial",
        })
      );
      expect(htmlPartial).toContain("تشكيل جزئي");

      const htmlNone = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
          tashkeelMode: "none",
        })
      );
      expect(htmlNone).toContain("بدون تشكيل");

      // Defaults to "تشكيل كامل" when omitted
      const htmlDefault = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
        })
      );
      expect(htmlDefault).toContain("تشكيل كامل");

      // Numerals check
      expect(findWesternNumeralsInRenderedHtml(htmlFull)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlNone)).toEqual([]);
    });

    it("transforms story text according to tashkeelMode", () => {
      const htmlNone = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
          tashkeelMode: "none",
        })
      );

      // In "none" mode, diacritics are stripped from the story text
      expect(htmlNone).toContain("وقف عصفور صغير");
      expect(htmlNone).not.toContain("وَقَفَ عُصْفُورٌ صَغِيرٌ");

      const htmlFull = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
          tashkeelMode: "full",
        })
      );
      expect(htmlFull).toContain("وَقَفَ عُصْفُورٌ صَغِيرٌ");
    });

    it("omits story section when includeStoryText is false while preserving QAR and Grammar", () => {
      const htmlWithoutStory = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
          includeStoryText: false,
        })
      );

      // Story section is omitted
      expect(htmlWithoutStory).not.toContain("📖 نص القصة");
      expect(htmlWithoutStory).not.toContain("وَقَفَ عُصْفُورٌ");

      // QAR and Grammar sections remain intact
      expect(htmlWithoutStory).toContain("🔍 أسئلة الفهم");
      expect(htmlWithoutStory).toContain("🧩 معمل اللغة");
      expect(htmlWithoutStory).toContain("كيف أحسست بأدائي؟");

      // Numerals check
      expect(findWesternNumeralsInRenderedHtml(htmlWithoutStory)).toEqual([]);
    });

    it("scales story text typography based on Reading Level (22px for L1, 19px for L2, 16px for L3)", () => {
      const level2 = {
        ...level1,
        id: "level-2",
        levelNumber: 2,
        titleAr: "المستوى الثاني",
      };
      const level3 = {
        ...level1,
        id: "level-3",
        levelNumber: 3,
        titleAr: "المستوى الثالث",
      };

      const htmlL1 = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
        })
      );
      expect(htmlL1).toContain("text-[22px]");
      expect(htmlL1).toContain("leading-[2.6]");

      const htmlL2 = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level2,
          story: standardStory,
        })
      );
      expect(htmlL2).toContain("text-[19px]");
      expect(htmlL2).toContain("leading-[2.3]");

      const htmlL3 = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level3,
          story: standardStory,
        })
      );
      expect(htmlL3).toContain("text-[16px]");
      expect(htmlL3).toContain("leading-[2.1]");

      expect(findWesternNumeralsInRenderedHtml(htmlL1)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlL2)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlL3)).toEqual([]);
    });

    it("renders 'مع نص القصة' checkbox inline next to the print button in StoryCycleRunnerPage", async () => {
      const pageComponent = await StoryCycleRunnerPage({
        params: Promise.resolve({ levelId: "level-1", storyId: "1" }),
      });
      const html = renderToString(pageComponent);

      expect(html).toContain("مع نص القصة");
      expect(html).toMatch(/<input[^>]*type="checkbox"[^>]*checked[^>]*>/);
    });
  });

  describe("Continuation Headers and Page Numbers (Ticket 05)", () => {
    it("does not contain hardcoded 'الصفحة ١/١' in the rendered HTML", () => {
      const html = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
        })
      );

      expect(html).not.toContain("الصفحة ١/١");

      // Eastern Arabic Numerals invariant
      expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
    });

    it("renders a continuation mini-header element with platform name, level, story title, and name blank", () => {
      const html = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
        })
      );

      // The continuation header element is present in the DOM
      expect(html).toContain("reading-continuation-header");

      // Contains: platform name, level title, story title, name blank
      expect(html).toContain("أُسُس");
      expect(html).toContain(level1.titleAr);
      expect(html).toContain(standardStory.titleAr ?? standardStory.title);

      // Eastern Arabic Numerals invariant
      expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
    });

    it("continuation header is marked print-only (not visible on screen)", () => {
      const html = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: standardStory,
        })
      );

      // The continuation header div should carry the hidden class (screen-hidden, print-visible via CSS)
      expect(html).toMatch(
        /reading-continuation-header[^"]*hidden|hidden[^"]*reading-continuation-header/
      );
    });

    it("renders continuation header with correct content for free-reading variant", () => {
      const html = renderToString(
        React.createElement(PrintableReadingSheet, {
          level: level1,
          story: freeReadingStory,
        })
      );

      // Also has continuation header
      expect(html).toContain("reading-continuation-header");
      // No hardcoded page number
      expect(html).not.toContain("الصفحة ١/١");

      // Eastern Arabic Numerals invariant
      expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
    });
  });
});
