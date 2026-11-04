import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { GradeCard } from "@/components/math/grade-card";
import { StudioHeader } from "@/components/math/studio-header";
import { TeacherStudio } from "@/components/studio/TeacherStudioClient";
import { StudioSkeleton } from "@/components/studio/StudioSkeleton";
import { GRADES } from "@/config/grades";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { generateWorksheet } from "@/engine/worksheet-engine";
import * as reducedMotionHook from "@/hooks/use-reduced-motion";

describe("Ticket 05: Shared-element hero transition (card ↔ header)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("Shared layout identifiers (normal motion)", () => {
    beforeEach(() => {
      vi.spyOn(reducedMotionHook, "useReducedMotion").mockReturnValue(false);
    });

    it("GradeCard sets layoutId and data attributes on container, visual model, and badge", () => {
      const gradeK = GRADES[0]; // Kindergarten
      const html = renderToStaticMarkup(<GradeCard grade={gradeK} />);

      expect(html).toContain('data-grade-card="k"');
      expect(html).toContain('data-layout-id="grade-k"');
      expect(html).toContain('data-model-layout-id="grade-model-k"');
      expect(html).toContain('data-badge-layout-id="grade-badge-k"');
      expect(html).toContain("روضة");
    });

    it("StudioHeader sets matching layoutId on header container, visual model, and badge", () => {
      const html = renderToStaticMarkup(<StudioHeader gradeId="K" />);

      expect(html).toContain('data-math-topbar="true"');
      expect(html).toContain('data-layout-id="grade-k"');
      expect(html).toContain('data-model-layout-id="grade-model-k"');
      expect(html).toContain('data-badge-layout-id="grade-badge-k"');
      expect(html).toContain("روضة");
    });

    it("maps all 6 grades correctly between GradeCard and StudioHeader", () => {
      for (const grade of GRADES) {
        const gradeKey = grade.id.toLowerCase();

        const cardHtml = renderToStaticMarkup(<GradeCard grade={grade} />);
        expect(cardHtml).toContain(`data-layout-id="grade-${gradeKey}"`);
        expect(cardHtml).toContain(
          `data-model-layout-id="grade-model-${gradeKey}"`
        );
        expect(cardHtml).toContain(
          `data-badge-layout-id="grade-badge-${gradeKey}"`
        );

        const headerHtml = renderToStaticMarkup(
          <StudioHeader gradeId={grade.id} />
        );
        expect(headerHtml).toContain(`data-layout-id="grade-${gradeKey}"`);
        expect(headerHtml).toContain(
          `data-model-layout-id="grade-model-${gradeKey}"`
        );
        expect(headerHtml).toContain(
          `data-badge-layout-id="grade-badge-${gradeKey}"`
        );
      }
    });
  });

  describe("prefers-reduced-motion suppression (instant navigation)", () => {
    beforeEach(() => {
      vi.spyOn(reducedMotionHook, "useReducedMotion").mockReturnValue(true);
    });

    it("suppresses layoutId on GradeCard when reduced motion is preferred", () => {
      const grade1 = GRADES[1]; // Grade 1
      const html = renderToStaticMarkup(<GradeCard grade={grade1} />);

      expect(html).toContain('data-grade-card="1"');
      // Sub-elements suppress layout-id bindings when reduced motion is preferred
      expect(html).not.toContain('data-model-layout-id="grade-model-1"');
      expect(html).not.toContain('data-badge-layout-id="grade-badge-1"');
    });

    it("suppresses layoutId on StudioHeader when reduced motion is preferred", () => {
      const html = renderToStaticMarkup(<StudioHeader gradeId="1" />);

      expect(html).not.toContain('data-model-layout-id="grade-model-1"');
      expect(html).not.toContain('data-badge-layout-id="grade-badge-1"');
    });
  });

  describe("Reverse transition seams (Studio back navigation)", () => {
    it("renders back button navigating to /math with proper RTL accessibility label", () => {
      const html = renderToStaticMarkup(<StudioHeader gradeId="2" />);

      expect(html).toContain('href="/math"');
      expect(html).toContain('aria-label="العودة لاختيار الصف"');
      expect(html).toContain("→");
    });

    it("renders breadcrumbs containing /math link to return to Grade Hub", () => {
      const html = renderToStaticMarkup(<StudioHeader gradeId="3" />);

      expect(html).toContain('href="/math"');
      expect(html).toContain("الرياضيات");
    });
  });

  describe("Studio loading state & skeleton shimmer", () => {
    it("renders skeleton shimmer when isLoading is true", () => {
      const catalog = getCurriculumCatalog();
      const bundle = generateWorksheet({
        grade: "K",
        lessonNumber: 1,
        seed: "seed-test",
        difficultyLevel: "scaffolded",
      });

      const html = renderToStaticMarkup(
        <TeacherStudio
          gradeId="K"
          grades={catalog.gradeList}
          initialBundle={bundle}
          isLoading={true}
        />
      );

      expect(html).toContain('data-sidebar-skeleton="true"');
      expect(html).toContain('data-canvas-skeleton="true"');
      expect(html).toContain("animate-pulse");
      expect(html).toContain('aria-busy="true"');
      // Real curriculum heading should not be present during loading
      expect(html).not.toContain("استوديو المعلم لأوراق العمل");
    });

    it("renders normal curriculum studio when isLoading is false or omitted", () => {
      const catalog = getCurriculumCatalog();
      const bundle = generateWorksheet({
        grade: "K",
        lessonNumber: 1,
        seed: "seed-test",
        difficultyLevel: "scaffolded",
      });

      const html = renderToStaticMarkup(
        <TeacherStudio
          gradeId="K"
          grades={catalog.gradeList}
          initialBundle={bundle}
          isLoading={false}
        />
      );

      expect(html).not.toContain('data-sidebar-skeleton="true"');
      expect(html).toContain('data-studio-content="true"');
      expect(html).toContain("استوديو المعلم لأوراق العمل");
    });

    it("StudioSkeleton component exports standalone structure for streaming", () => {
      const html = renderToStaticMarkup(<StudioSkeleton />);

      expect(html).toContain('data-sidebar-skeleton="true"');
      expect(html).toContain('data-canvas-skeleton="true"');
      expect(html).toContain("animate-pulse");
    });
  });
});
