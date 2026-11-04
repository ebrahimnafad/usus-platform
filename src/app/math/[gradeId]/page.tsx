import React from "react";
import { notFound } from "next/navigation";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { generateWorksheet } from "@/engine/worksheet-engine";
import type { StudioSearchParamsInput } from "@/lib/studio-state";
import { normalizeGradeId } from "@/config/grades";
import {
  resolveStudioStateFromSearchParams,
  VALID_GRADES,
} from "@/lib/studio-state";
import { StudioPageContent } from "@/components/studio/StudioPageContent";

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

  const grade = getCurriculumCatalog().grades[normalizedGradeId];
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
    <StudioPageContent
      gradeId={normalizedGradeId}
      grade={grade}
      bundle={bundle}
      state={state}
    />
  );
}
