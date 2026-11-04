import React from "react";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { generateWorksheet } from "@/engine/worksheet-engine";
import {
  TeacherStudio,
  type StudioSearchParamsInput,
} from "@/components/studio/TeacherStudioClient";
import { resolveStudioStateFromSearchParams } from "@/lib/studio-state";
import { GradeHubHero } from "@/components/math/grade-hub-hero";
import { GradeGrid } from "@/components/math/grade-grid";

export default async function MathPage({
  searchParams,
}: {
  searchParams?: Promise<StudioSearchParamsInput>;
}): Promise<React.ReactElement> {
  const resolved = (await searchParams) ?? {};

  // If a specific grade is requested via query param (backward compatibility for legacy links and tests):
  if (resolved.grade) {
    const catalog = getCurriculumCatalog();
    const state = resolveStudioStateFromSearchParams(resolved);

    const bundle = generateWorksheet({
      grade: state.grade,
      lessonNumber: state.lessonNumber,
      seed: state.seed,
      difficultyLevel: state.difficultyLevel,
    });

    return (
      <TeacherStudio
        grades={catalog.gradeList}
        initialBundle={bundle}
        initialViewMode={state.viewMode}
        initialSearchQuery={state.searchQuery}
        initialZoomPercent={state.zoomPercent}
      />
    );
  }

  // Canonical Grade Hub at /math
  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen bg-slate-50 text-slate-900 pb-16"
      data-math-grade-hub="true"
    >
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <GradeHubHero />
        <section aria-label="اختيار الصف الدراسي">
          <GradeGrid />
        </section>
      </main>
    </div>
  );
}
