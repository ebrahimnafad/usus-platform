import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "@/app/page";
import MathPage from "@/app/math/page";
import { GRADES } from "@/config/grades";

describe("E2E Navigation Flow — Home to Math Grade Hub to Grades", () => {
  it("home page provides entry point to /math", () => {
    const homeHtml = renderToStaticMarkup(<HomePage />);
    expect(homeHtml).toContain('data-domain-card="math"');
    expect(homeHtml).toContain('href="/math"');
  });

  it("navigating to /math renders Grade Hub with 6 responsive grade cards", async () => {
    const hubElement = await MathPage({});
    const hubHtml = renderToStaticMarkup(hubElement);

    // Hub container and hero
    expect(hubHtml).toContain('data-math-grade-hub="true"');
    expect(hubHtml).toContain('data-grade-grid="true"');
    expect(hubHtml).toContain("استوديو المعلم");

    // All 6 grade cards with respective destination routes
    for (const grade of GRADES) {
      const gradeKey = grade.id.toLowerCase();
      expect(hubHtml).toContain(`data-grade-card="${gradeKey}"`);
      expect(hubHtml).toContain(`href="/math/${gradeKey}"`);
      expect(hubHtml).toContain(grade.label);
      expect(hubHtml).toContain(grade.shortLabel);
    }
  });

  it("guarantees RTL order and proper responsive grid classes", async () => {
    const hubElement = await MathPage({});
    const hubHtml = renderToStaticMarkup(hubElement);

    expect(hubHtml).toContain('dir="rtl"');
    expect(hubHtml).toContain("grid-cols-1 md:grid-cols-2 lg:grid-cols-3");
  });
});
