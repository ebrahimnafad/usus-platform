import React from "react";
import type { ViewMode } from "@/domain/types";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";
import { resolveStudioStateFromSearchParams } from "@/lib/studio-state";

interface PrintSearchParams {
  grade?: string;
  lesson?: string;
  seed?: string;
  difficulty?: string;
  view?: string;
}

export default async function PrintPage({
  searchParams,
}: {
  searchParams?: Promise<PrintSearchParams>;
}): Promise<React.ReactElement> {
  const resolved = (await searchParams) ?? {};

  const state = resolveStudioStateFromSearchParams({
    grade: resolved.grade,
    lesson: resolved.lesson,
    seed: resolved.seed,
    difficulty: resolved.difficulty,
    view: resolved.view,
  });

  const viewMode: ViewMode =
    state.viewMode === "answer-key" ? "answer-key" : "worksheet";

  const bundle = generateWorksheet({
    grade: state.grade,
    lessonNumber: state.lessonNumber,
    seed: state.seed,
    difficultyLevel: state.difficultyLevel,
  });

  return (
    <main className="min-h-screen bg-white p-0">
      <WorksheetSurface bundle={bundle} viewMode={viewMode} />
    </main>
  );
}
