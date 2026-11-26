import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import HomePage from "@/app/page";
import MathPage from "@/app/math/page";
import { NextRequest } from "next/server";
import { GET as getPrintHtmlRoute } from "@/app/api/print-html/route";

describe("Ticket 01 — Hub Page and Domain Route Migration", () => {
  describe("Root Hub Page (/)", () => {
    it("renders the أُسُس domain hub with welcome message and responsive layout", async () => {
      const pageElement = HomePage();
      const html = renderToStaticMarkup(pageElement);

      // 1. Title and Platform Branding
      expect(html).toContain("أُسُس");
      expect(html).toContain("منصة");

      // 2. Responsive layout for domain cards (side-by-side desktop, stacked mobile)
      expect(html).toMatch(/grid-cols-1.*(md|lg):grid-cols-2/);

      // 3. Mathematics Domain Card (Indigo theme)
      expect(html).toContain("الرياضيات");
      expect(html).toContain('href="/math"');
      expect(html).toMatch(/indigo|Indigo/);

      // 4. Reading Comprehension Domain Card (Emerald theme)
      expect(html).toMatch(/القراءة|الفهم القرائي/);
      expect(html).toContain('href="/reading"');
      expect(html).toMatch(/emerald|Emerald/);

      // 5. Visual illustrations / icons and CTA entry buttons for both domains
      expect(html).toContain('data-domain-card="math"');
      expect(html).toContain('data-domain-card="reading"');

      // 6. Strict Eastern Arabic Numerals invariant
      expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
    });
  });

  describe("Math Studio Route (/math)", () => {
    it("renders Math Studio with slim top navigation bar, logo linking to /, and breadcrumbs", async () => {
      const pageElement = await MathPage({
        searchParams: Promise.resolve({
          grade: "K",
          lesson: "1",
        }),
      });
      const html = renderToStaticMarkup(pageElement);

      // 1. Slim top navigation bar
      expect(html).toContain('data-math-topbar="true"');

      // 2. أُسُس logo linking back to /
      expect(html).toMatch(/<a[^>]*href="\/"[^>]*>[\s\S]*?أُسُس[\s\S]*?<\/a>/);

      // 3. Breadcrumb indicator (الرئيسية > الرياضيات)
      expect(html).toContain("الرئيسية");
      expect(html).toContain("الرياضيات");
      expect(html).toMatch(/الرئيسية[\s\S]*?(>|&gt;)[\s\S]*?الرياضيات/);

      // 4. Studio controls intact (Grade pills, search, difficulty, accordion)
      expect(html).toContain("الروضة K");
      expect(html).toContain("الصف ١");
      expect(html).toContain("نمط الصعوبة");
      expect(html).toContain('data-grade-pill="K"');

      // 5. Strict Eastern Arabic Numerals invariant
      expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
    });
  });

  describe("Existing Math Routes Integrity (/api/print-html)", () => {
    it("preserves printable HTML generation endpoint for math worksheets", async () => {
      const request = new NextRequest(
        "http://localhost:3000/api/print-html?grade=K&lesson=1&seed=PDF-HUB-01&difficulty=scaffolded&viewOption=worksheet&scope=lesson"
      );
      const response = await getPrintHtmlRoute(request);
      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toContain(
        "application/json"
      );
      const data = (await response.json()) as { html: string; title: string };
      expect(data.html).toContain("a4-sheet");
    }, 60000);
  });
});
