import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { BackButton } from "@/components/layout/back-button";
import { StudioHeader } from "@/components/math/studio-header";
import GradeStudioPage from "@/app/math/[gradeId]/page";

describe("Ticket 04 — Migrate Studio to Route Params & Studio Header", () => {
  it("BackButton component renders a link to /math with proper aria-label and RTL arrow", () => {
    const html = renderToStaticMarkup(<BackButton href="/math" />);

    expect(html).toContain('href="/math"');
    expect(html).toContain('aria-label="العودة لاختيار الصف"');
    // RTL back arrow points right (→)
    expect(html).toContain("→");
  });

  it("StudioHeader renders grade label, gradient wash, visual model, back arrow and 3-level breadcrumbs", () => {
    const html = renderToStaticMarkup(<StudioHeader gradeId="K" />);

    // 1. Grade label
    expect(html).toContain("الروضة");

    // 2. Gradient background in grade color (rose for Grade K)
    expect(html).toContain("from-rose-600");
    expect(html).toContain("to-rose-500");

    // 3. Back button linking to /math
    expect(html).toContain('href="/math"');
    expect(html).toContain('aria-label="العودة لاختيار الصف"');

    // 4. Breadcrumbs showing الرئيسية > الرياضيات > الروضة
    expect(html).toContain("الرئيسية");
    expect(html).toContain("الرياضيات");
    expect(html).toMatch(
      /<a[^>]*href="\/math"[^>]*>[\s\S]*?الرياضيات[\s\S]*?<\/a>/
    );
    expect(html).toContain("الروضة");

    // 5. Hero transition layoutId for Grade K
    expect(html).toContain('data-layout-id="grade-k"');
  });

  it("/math/[gradeId] page renders Teacher Studio for Grade K without sidebar grade pills", async () => {
    const pageElement = await GradeStudioPage({
      params: Promise.resolve({ gradeId: "k" }),
      searchParams: Promise.resolve({ lesson: "1" }),
    });
    const html = renderToStaticMarkup(pageElement);

    // Studio renders
    expect(html).toContain("استوديو المعلم");
    expect(html).toContain("الروضة");
    expect(html).toContain("K.G.4");

    // Sidebar grade pills should NOT be present in route-param studio
    expect(html).not.toContain('data-grade-pill="K"');
    expect(html).not.toContain('data-grade-pill="1"');
  });

  it("/math/[gradeId] page renders Teacher Studio for Grade 1", async () => {
    const pageElement = await GradeStudioPage({
      params: Promise.resolve({ gradeId: "1" }),
      searchParams: Promise.resolve({ lesson: "1" }),
    });
    const html = renderToStaticMarkup(pageElement);

    expect(html).toContain("الصف الأول");
    expect(html).toContain("الوحدة ١: تهيئة ومراجعة المهارات الأساسية");
  });
});
