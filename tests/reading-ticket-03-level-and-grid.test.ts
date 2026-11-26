import { describe, expect, it } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import ReadingHubPage from "@/app/reading/page";
import ReadingLevelGridPage from "@/app/reading/level/[levelId]/page";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 03 — Reading Level Selection and Story Grid Browser", () => {
  describe("Reading Domain Home (/reading)", () => {
    it("renders diagnostic banner, Level 1 card, preview levels, and breadcrumb", () => {
      const html = renderToString(React.createElement(ReadingHubPage));

      // 1. Breadcrumbs and Header
      expect(html).toContain("الرئيسية");
      expect(html).toContain("القراءة والفهم");
      expect(html).toContain('href="/"');

      // 2. Diagnostic banner
      expect(html).toContain("/reading/diagnostic");
      expect(html).toContain("اختيار مستوى القراءة المناسب");

      // 3. Level 1 card with details
      expect(html).toContain("المستوى الأول");
      expect(html).toContain("الانطلاق وبناء المعنى");
      expect(html).toContain("/reading/level/level-1");
      expect(html).toContain("١٢ قصة");

      // 4. Upcoming preview levels
      expect(html).toContain("المستوى الثاني");
      expect(html).toContain("المستوى الثالث");

      // 5. Eastern Arabic Numerals check
      const westernNums = findWesternNumeralsInRenderedHtml(html);
      expect(westernNums).toEqual([]);
    });
  });

  describe("Reading Level Story Grid (/reading/level/[levelId])", () => {
    it("renders all 12 story cards with titles, badges, and links to story cycles", async () => {
      const pageComponent = await ReadingLevelGridPage({
        params: Promise.resolve({ levelId: "level-1" }),
      });
      const html = renderToString(pageComponent);

      // 1. Breadcrumbs
      expect(html).toContain("الرئيسية");
      expect(html).toContain("القراءة");
      expect(html).toContain("المستوى الأول");

      // 2. All 12 stories present
      for (let i = 1; i <= 12; i++) {
        expect(html).toContain(`/reading/level/level-1/story/${i}`);
      }

      // 3. Special story type badges
      expect(html).toContain("قراءة حرة للمتعة");
      expect(html).toContain("اختبار النقل");

      // 4. Target word counts and grammar hints present
      expect(html).toContain("كلمة");

      // 5. Eastern Arabic Numerals check
      const westernNums = findWesternNumeralsInRenderedHtml(html);
      expect(westernNums).toEqual([]);
    });

    it("renders fallback message if level is not found", async () => {
      const pageComponent = await ReadingLevelGridPage({
        params: Promise.resolve({ levelId: "unknown-level" }),
      });
      const html = renderToString(pageComponent);

      expect(html).toContain("المستوى غير موجود");
      expect(html).toContain("/reading");
    });
  });
});
