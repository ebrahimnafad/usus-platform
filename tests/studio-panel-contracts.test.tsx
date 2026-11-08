import React from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { renderTeacherStudio } from "@/lib/render-teacher-studio";
import {
  buildStudioSearchParams,
  resolveStudioNavigationTransition,
  resolveStudioStateFromSearchParams,
} from "@/lib/studio-state";
import { StudioPanel } from "@/components/studio/StudioPanel";
import { StudioCanvas } from "@/components/studio/StudioCanvas";

const catalog = getCurriculumCatalog();
const gradeK = catalog.grades.K;

function renderRoutePanel(
  props: Partial<React.ComponentProps<typeof StudioPanel>> = {}
): string {
  return renderToStaticMarkup(
    <StudioPanel
      grade={gradeK}
      lessonNumber={5}
      seed="PANEL-SEED"
      difficultyMode="scaffolded"
      {...props}
      onSelectLesson={() => undefined}
      onSelectDifficulty={() => undefined}
      onRegenerateSeed={() => undefined}
    />
  );
}

describe("Studio panel — cockpit, poster and honest controls", () => {
  it("renders the poster from explicit props and removes the 810-lesson subtitle", () => {
    const html = renderRoutePanel({ lessonNumber: 5 });

    expect(html).toContain("استوديو المعلم لأوراق العمل");
    expect(html).toContain("الوحدة ١ ·");
    expect(html).toContain("مطابقة");
    expect(html).toContain("K.MD.3");
    expect(html).toContain("K.G.2");
    expect(html).toContain('data-poster-lesson-number="true"');
    expect(html).not.toContain("٨١٠");
    expect(html).not.toContain("درساً");
  });

  it("labels the control نمط الصعوبة and explains the selected option", () => {
    const html = renderRoutePanel({ difficultyMode: "scaffolded" });

    expect(html).toContain("نمط الصعوبة");
    expect(html).not.toContain("مستوى الصعوبة");
    expect(html).toContain("يبدأ سهلًا ويشتدّ عبر الأقسام الثلاثة");
    expect(html).toContain('data-difficulty-option="Advanced"');
    expect(html).toContain(
      'aria-describedby="studio-panel-difficulty-explainer"'
    );
  });

  it("renders the seed as a copyable ticket with the shared label", () => {
    const html = renderRoutePanel();

    expect(html).toContain("رمز الورقة");
    expect(html).not.toContain("رمز النموذج");
    expect(html).toContain('data-seed-ticket="true"');
    expect(html).toContain('data-seed-badge="true"');
    expect(html).toContain('data-regenerate-seed="true"');
    expect(html).toContain("نفس الرمز = نفس الورقة");
    expect(html).toContain("نسخ رابط الورقة");
  });

  it("emits no grade pills in route mode and keeps them in legacy mode", () => {
    const routeHtml = renderRoutePanel();
    expect(routeHtml).not.toContain('data-grade-pill="K"');

    const legacy = renderTeacherStudio({ grade: "K", lesson: 1 });
    expect(legacy.html).toContain('data-grade-pill="K"');
    expect(legacy.html).toContain("تغيير الصف");
  });

  it("renders twelve unit wrappers with Western numeric identifiers and quiet standard chips", () => {
    const html = renderRoutePanel({ expandAllUnitsByDefault: true });

    for (let unitNumber = 1; unitNumber <= 12; unitNumber += 1) {
      expect(html).toContain(`data-unit-number="${unitNumber}"`);
    }
    expect(html).toContain("إثرائي *");
    expect(html).toContain("تقديم مشترك");
    expect(html).toContain("K.MD.3");
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });

  it("renders a twelve-segment spine with the current unit marked and the enrichment dot", () => {
    const html = renderRoutePanel({ lessonNumber: 5 });

    expect(html).toContain('data-unit-spine="true"');
    for (let unitNumber = 1; unitNumber <= 12; unitNumber += 1) {
      expect(html).toContain(`data-spine-unit="${unitNumber}"`);
    }
    expect(html).toContain('aria-current="true"');
    expect(html).toContain('data-unit-enrichment="true"');
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });
});

describe("Studio search — server-rendered through the query parameter", () => {
  it("finds a unit from a near-miss Arabic spelling and returns the whole unit", () => {
    const { html } = renderTeacherStudio({
      grade: "K",
      lesson: 1,
      q: "تهيئه",
    });

    expect(html).toContain('data-unit-number="1"');
    expect(html).toContain('data-lesson-item="K-١"');
    expect(html).toContain('data-lesson-item="K-١١"');
    expect(html).toContain('data-search-count="true"');
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });

  it("finds an undotted standard code", () => {
    const { html } = renderTeacherStudio({
      grade: "K",
      lesson: 1,
      q: "KG4",
    });

    expect(html).toContain("K.G.4");
    expect(html).toContain('data-lesson-item="K-١"');
    expect(html).toContain('data-search-count="true"');
    expect(html).not.toContain('data-search-empty="true"');
  });

  it("accepts Eastern Arabic numerals in the query", () => {
    const { html } = renderTeacherStudio({
      grade: "K",
      lesson: 1,
      q: "١",
    });

    expect(html).toContain('data-lesson-item="K-١"');
    expect(html).not.toContain('data-lesson-item="K-٢"');
  });

  it("renders a helpful empty state for a junk query", () => {
    const { html } = renderTeacherStudio({
      grade: "K",
      lesson: 1,
      q: "زززز",
    });

    expect(html).toContain('data-search-empty="true"');
    expect(html).toContain("لا توجد نتائج");
    expect(html).toContain("K.G.4");
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Readiness-protocol contracts
//
// The E2E openStudio() helper waits for three data attributes before
// interacting with the studio. If any of these attributes are renamed or
// removed, the E2E suite will time out silently. These tests lock the
// server-rendered half of the protocol at the unit level so a breaking
// change is caught by `npm test` (which runs in CI) rather than by the
// slower E2E suite.
//
// data-hydrated is set by a useEffect in StudioPanel — it is intentionally
// absent from SSR output. The contract here is "absent on server, present
// after mount". The "present after mount" half is enforced by the E2E
// selector `[data-studio-panel="true"][data-hydrated="true"]`.
// ---------------------------------------------------------------------------
describe("Readiness-protocol attributes", () => {
  it('StudioPanel SSR emits data-studio-panel="true"', () => {
    const html = renderRoutePanel();
    expect(html).toContain('data-studio-panel="true"');
  });

  it("StudioPanel SSR does NOT emit data-hydrated (set by useEffect on client)", () => {
    const html = renderRoutePanel();
    // Absence on SSR is the contract — the E2E suite waits for client mount
    expect(html).not.toContain("data-hydrated");
  });

  it('StudioCanvas SSR emits data-studio-canvas="true"', () => {
    const { bundle } = renderTeacherStudio({ grade: "K", lesson: 5 });
    const html = renderToStaticMarkup(
      <StudioCanvas
        bundle={bundle}
        viewMode="worksheet"
        zoomPercent={100}
        isPending={false}
      />
    );
    expect(html).toContain('data-studio-canvas="true"');
  });

  it('StudioCanvas SSR emits data-canvas-pending="false" when idle', () => {
    const { bundle } = renderTeacherStudio({ grade: "K", lesson: 5 });
    const html = renderToStaticMarkup(
      <StudioCanvas
        bundle={bundle}
        viewMode="worksheet"
        zoomPercent={100}
        isPending={false}
      />
    );
    expect(html).toContain('data-canvas-pending="false"');
    expect(html).not.toContain('data-canvas-pending="true"');
  });
});

describe("Teacher Studio navigation & URL state seam", () => {
  it("preserves non-empty q across replace transitions (difficulty, seed, view) and uses push for lesson/prerequisite jumps", () => {
    const base = resolveStudioStateFromSearchParams({
      grade: "K",
      lesson: "5",
      seed: "S1",
      difficulty: "scaffolded",
      view: "worksheet",
      q: "طرح",
    });

    const diffTransition = resolveStudioNavigationTransition(
      base,
      { type: "select-difficulty", difficultyLevel: "Advanced" },
      "/math/k"
    );
    expect(diffTransition.historyMode).toBe("replace");
    expect(diffTransition.href).toBe(
      `/math/k?${buildStudioSearchParams({
        ...base,
        difficultyLevel: "Advanced",
      })}`
    );
    expect(diffTransition.searchParams).toContain("q=");

    const viewTransition = resolveStudioNavigationTransition(
      base,
      { type: "select-view", viewMode: "answer-key" },
      "/math/k"
    );
    expect(viewTransition.historyMode).toBe("replace");
    expect(viewTransition.nextState.viewMode).toBe("answer-key");
    expect(viewTransition.nextState.searchQuery).toBe("طرح");

    const lessonTransition = resolveStudioNavigationTransition(
      base,
      { type: "select-lesson", grade: "K", lessonNumber: 12 },
      "/math/k"
    );
    expect(lessonTransition.historyMode).toBe("push");
    expect(lessonTransition.pathname).toBe("/math/k");
    expect(lessonTransition.nextState.lessonNumber).toBe(12);

    const prereqTransition = resolveStudioNavigationTransition(
      base,
      { type: "select-prerequisite", prerequisiteCode: "K-٢" },
      "/math/k"
    );
    expect(prereqTransition.historyMode).toBe("push");
    expect(prereqTransition.nextState.lessonNumber).toBe(2);
  });

  it("omits q from query string when searchQuery is empty", () => {
    const state = resolveStudioStateFromSearchParams({
      grade: "K",
      lesson: 1,
      seed: "K1-2026",
      difficulty: "scaffolded",
      view: "worksheet",
    });
    expect(buildStudioSearchParams(state)).toBe(
      "grade=K&lesson=1&seed=K1-2026&difficulty=scaffolded&view=worksheet"
    );
  });
});
