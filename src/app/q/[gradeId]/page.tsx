import React from "react";
import { notFound } from "next/navigation";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { getGradeConfig } from "@/config/grades";
import { resolveStudioStateFromSearchParams } from "@/lib/studio-state";
import { QuickViewClient } from "@/components/worksheet/QuickViewClient";

interface QuickViewSearchParams {
  lesson?: string;
  seed?: string;
  difficulty?: string;
  view?: string;
}

export default async function QuickViewPage({
  params,
  searchParams,
}: {
  params: Promise<{ gradeId: string }>;
  searchParams?: Promise<QuickViewSearchParams>;
}): Promise<React.ReactElement> {
  const { gradeId } = await params;
  const gradeConfig = getGradeConfig(gradeId);
  if (!gradeConfig) {
    notFound();
  }

  const resolved = (await searchParams) ?? {};
  const state = resolveStudioStateFromSearchParams({
    grade: gradeConfig.id,
    lesson: resolved.lesson,
    seed: resolved.seed,
    difficulty: resolved.difficulty,
    view: resolved.view,
  });

  const viewMode: "answer-key" | "teacher-notes" =
    state.viewMode === "teacher-notes" ? "teacher-notes" : "answer-key";

  const bundle = generateWorksheet({
    grade: state.grade,
    lessonNumber: state.lessonNumber,
    seed: state.seed,
    difficultyLevel: state.difficultyLevel,
  });

  return <QuickViewClient bundle={bundle} initialViewMode={viewMode} />;
}
