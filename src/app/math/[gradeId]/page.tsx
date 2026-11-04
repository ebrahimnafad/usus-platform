import React from "react";
import { notFound } from "next/navigation";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { generateWorksheet } from "@/engine/worksheet-engine";
import {
  TeacherStudio,
  type StudioSearchParamsInput,
} from "@/components/studio/TeacherStudioClient";
import { normalizeGradeId } from "@/config/grades";
import {
  resolveStudioStateFromSearchParams,
  VALID_GRADES,
} from "@/lib/studio-state";
import type { GradeId } from "@/domain/types";

export default async function GradeStudioPage({
  params,
  searchParams,
}: {
  params: Promise<{ gradeId: string }>;
  searchParams?: Promise<StudioSearchParamsInput>;
}): Promise<React.ReactElement> {
  const { gradeId: rawGradeId } = await params;
  const normalizedGradeId = normalizeGradeId(rawGradeId);

  if (!VALID_GRADES.includes(normalizedGradeId)) {
    notFound();
  }

  const catalog = getCurriculumCatalog();
  const resolved = (await searchParams) ?? {};
  const state = resolveStudioStateFromSearchParams({
    ...resolved,
    grade: normalizedGradeId,
  });

  const bundle = generateWorksheet({
    grade: normalizedGradeId,
    lessonNumber: state.lessonNumber,
    seed: state.seed,
    difficultyLevel: state.difficultyLevel,
  });

  return (
    <TeacherStudio
      gradeId={normalizedGradeId}
      grades={catalog.gradeList}
      initialBundle={bundle}
      initialViewMode={state.viewMode}
      initialSearchQuery={state.searchQuery}
      initialZoomPercent={state.zoomPercent}
      showGradePills={false}
    />
  );
}
