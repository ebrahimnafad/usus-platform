import React from "react";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { generateWorksheet } from "@/engine/worksheet-engine";
import {
  TeacherStudio,
  type StudioSearchParamsInput,
} from "@/components/studio/TeacherStudioClient";
import { resolveStudioStateFromSearchParams } from "@/lib/studio-state";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<StudioSearchParamsInput>;
}): Promise<React.ReactElement> {
  const resolved = (await searchParams) ?? {};
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
