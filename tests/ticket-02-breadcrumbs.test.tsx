import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

describe("Ticket 02 — Shared Breadcrumbs Component", () => {
  it('renders an accessible <nav aria-label="التنقل"> wrapping an <ol>', () => {
    const html = renderToStaticMarkup(
      <Breadcrumbs
        segments={[{ label: "الرئيسية", href: "/" }, { label: "الرياضيات" }]}
      />
    );

    expect(html).toContain('<nav aria-label="التنقل"');
    expect(html).toContain("<ol");
    expect(html).toContain("</ol>");
    expect(html).toContain("</nav>");
  });

  it("renders non-terminal segments with href as Next.js links", () => {
    const html = renderToStaticMarkup(
      <Breadcrumbs
        segments={[
          { label: "الرئيسية", href: "/" },
          { label: "القراءة", href: "/reading" },
          { label: "المستوى الأول" },
        ]}
      />
    );

    expect(html).toMatch(/<a[^>]*href="\/"[^>]*>[\s\S]*?الرئيسية[\s\S]*?<\/a>/);
    expect(html).toMatch(
      /<a[^>]*href="\/reading"[^>]*>[\s\S]*?القراءة[\s\S]*?<\/a>/
    );
  });

  it('renders the last segment with aria-current="page" and without a link', () => {
    const html = renderToStaticMarkup(
      <Breadcrumbs
        segments={[
          { label: "الرئيسية", href: "/" },
          { label: "الرياضيات", href: "/math" },
        ]}
      />
    );

    // Last segment should not be a link even if href was passed
    expect(html).toContain('aria-current="page"');
    expect(html).toMatch(
      /<span[^>]*aria-current="page"[^>]*>[\s\S]*?الرياضيات[\s\S]*?<\/span>/
    );
    expect(html).not.toMatch(/<a[^>]*href="\/math"/);
  });

  it("renders separators between segments matching (>|&gt;)", () => {
    const html = renderToStaticMarkup(
      <Breadcrumbs
        segments={[{ label: "الرئيسية", href: "/" }, { label: "الرياضيات" }]}
      />
    );

    expect(html).toMatch(/الرئيسية[\s\S]*?(>|&gt;)[\s\S]*?الرياضيات/);
  });

  it("applies active and custom class names", () => {
    const html = renderToStaticMarkup(
      <Breadcrumbs
        segments={[
          { label: "الرئيسية", href: "/" },
          { label: "الصفحة الحالية" },
        ]}
        className="custom-nav"
        activeItemClassName="active-segment-highlight"
        linkClassName="custom-link-class"
      />
    );

    expect(html).toContain("custom-nav");
    expect(html).toContain("active-segment-highlight");
    expect(html).toContain("custom-link-class");
  });
});
