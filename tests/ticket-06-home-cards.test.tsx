import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import HomePage from "@/app/page";
import { HomeDomainCards } from "@/components/home/HomeDomainCards";

describe("Ticket 06 — Home Page Domain Cards Upgrade", () => {
  it("renders both Math and Reading domain cards with data attributes", () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(html).toContain('data-domain-card="math"');
    expect(html).toContain('data-domain-card="reading"');
  });

  it("links correctly to /math and /reading", () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(html).toMatch(
      /<a[^>]*href="\/math"[^>]*>[\s\S]*?دخول استوديو الرياضيات[\s\S]*?<\/a>/
    );
    expect(html).toMatch(
      /<a[^>]*href="\/reading"[^>]*>[\s\S]*?دخول نادي القراءة[\s\S]*?<\/a>/
    );
  });

  it("displays titles, badges, and curriculum feature bullet points", () => {
    const html = renderToStaticMarkup(<HomeDomainCards />);

    // Math card
    expect(html).toContain("استوديو المعلم");
    expect(html).toContain("الرياضيات");
    expect(html).toContain("طباعة ورقية نظيفة بدون إعلانات");
    expect(html).toContain("توليد عشوائي محدد بالبذور");

    // Reading card
    expect(html).toContain("نادي القراءة");
    expect(html).toContain("الفهم القرائي");
    expect(html).toContain("ست محطات تعليمية");
    expect(html).toContain("ركن القراءة الحرة");
  });

  it("renders SVG illustrations for both cards", () => {
    const html = renderToStaticMarkup(<HomeDomainCards />);

    // Math SVG contains Eastern Arabic numeral ٥
    expect(html).toContain("٥");
    // Both cards have SVG elements
    const svgMatches = html.match(/<svg/g);
    expect(svgMatches?.length).toBeGreaterThanOrEqual(2);
  });
});
