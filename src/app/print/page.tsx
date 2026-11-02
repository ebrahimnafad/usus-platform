import React from "react";
import type {
  GradeId,
  ViewMode,
  WorksheetDifficultyMode,
} from "@/domain/types";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";

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

  const validGrades: GradeId[] = ["K", "1", "2", "3", "4", "5"];
  const grade: GradeId = validGrades.includes(resolved.grade as GradeId)
    ? (resolved.grade as GradeId)
    : "K";

  const parsedLesson = parseInt(resolved.lesson ?? "1", 10);
  const lessonNumber =
    Number.isFinite(parsedLesson) && parsedLesson >= 1 && parsedLesson <= 135
      ? parsedLesson
      : 1;

  const seed = resolved.seed?.trim() || "K1-2026";

  const validDifficulties: WorksheetDifficultyMode[] = [
    "scaffolded",
    "Easy",
    "Intermediate",
    "Advanced",
  ];
  const difficultyLevel: WorksheetDifficultyMode = validDifficulties.includes(
    resolved.difficulty as WorksheetDifficultyMode
  )
    ? (resolved.difficulty as WorksheetDifficultyMode)
    : "scaffolded";

  const viewMode: ViewMode =
    resolved.view === "answer-key" ? "answer-key" : "worksheet";

  const bundle = generateWorksheet({
    grade,
    lessonNumber,
    seed,
    difficultyLevel,
  });

  return (
    <main className="min-h-screen bg-white p-0">
      <WorksheetSurface bundle={bundle} viewMode={viewMode} />
    </main>
  );
}
