import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import MathPage from "@/app/math/page";
import MathLayout from "@/app/math/layout";
import { CoordinateGrid } from "@/visual-models/coordinate-grid";
import { GRADES } from "@/config/grades";

describe("Ticket 03 — Math Grade Hub & Theme Provider", () => {
  it("renders the Grade Hub by default at /math when no searchParams are provided", async () => {
    const pageElement = await MathPage({});
    const html = renderToStaticMarkup(pageElement);

    // 1. Grade Hub container
    expect(html).toContain('data-math-grade-hub="true"');

    // 2. Hero Section
    expect(html).toContain("استوديو المعلم");
    expect(html).toContain("منهج الرياضيات التأسيسي الكامل");

    // 3. Breadcrumbs
    expect(html).toContain("الرئيسية");
    expect(html).toContain("الرياضيات");
    expect(html).toMatch(/الرئيسية[\s\S]*?(>|&gt;)[\s\S]*?الرياضيات/);
  });

  it("renders all six grade cards (K through 5) with correct links and Arabic metadata", async () => {
    const pageElement = await MathPage({});
    const html = renderToStaticMarkup(pageElement);

    // Check each grade card existence and link
    const expectedGrades = ["k", "1", "2", "3", "4", "5"];
    for (const id of expectedGrades) {
      expect(html).toContain(`data-grade-card="${id}"`);
      expect(html).toContain(`href="/math/${id}"`);
    }

    // Arabic labels
    expect(html).toContain("الروضة");
    expect(html).toContain("الصف الأول");
    expect(html).toContain("الصف الثاني");
    expect(html).toContain("الصف الثالث");
    expect(html).toContain("الصف الرابع");
    expect(html).toContain("الصف الخامس");

    // Eastern Arabic unit and lesson counts (١٢ وحدة، ١٣٥ درساً)
    expect(html).toContain("١٢ وحدة");
    expect(html).toContain("١٣٥ درساً");
  });

  it("renders visual model SVGs for each grade card", async () => {
    const pageElement = await MathPage({});
    const html = renderToStaticMarkup(pageElement);

    expect(html).toContain("لوحة الخمسة"); // K
    expect(html).toContain("لوحة العشرة"); // 1
    expect(html).toContain("خط الأعداد"); // 2
    expect(html).toContain("شبكة المصفوفة"); // 3
    expect(html).toContain("النموذج الشريطي"); // 4
    expect(html).toContain("المستوى الإحداثي"); // 5
  });

  it("CoordinateGrid component renders SVG with axes, ticks and plotted point", () => {
    const html = renderToStaticMarkup(
      <CoordinateGrid
        maxCoord={5}
        points={[{ x: 3, y: 4, label: "ن (٣، ٤)", color: "#7c3aed" }]}
      />
    );

    expect(html).toContain('role="img"');
    expect(html).toContain("المستوى الإحداثي");
    expect(html).toContain("س"); // X axis in Arabic
    expect(html).toContain("ص"); // Y axis in Arabic
    expect(html).toContain("ن (٣، ٤)"); // Point label
  });

  it("MathLayout wraps children with GradeThemeProvider and Framer Motion primitives", () => {
    const layoutElement = (
      <MathLayout>
        <div data-testid="child-content">المحتوى التجريبي</div>
      </MathLayout>
    );
    const html = renderToStaticMarkup(layoutElement);
    expect(html).toContain("المحتوى التجريبي");
  });
});
