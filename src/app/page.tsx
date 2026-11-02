import React from "react";
import type {
  GradeId,
  ViewMode,
  WorksheetDifficultyMode,
} from "@/domain/types";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { TeacherStudioClient } from "@/components/studio/TeacherStudioClient";

interface PageSearchParams {
  grade?: string;
  lesson?: string;
  seed?: string;
  difficulty?: string;
  view?: string;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<PageSearchParams>;
}): Promise<React.ReactElement> {
  const resolved = (await searchParams) ?? {};
  const catalog = getCurriculumCatalog();

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

  const validViews: ViewMode[] = ["worksheet", "answer-key", "teacher-notes"];
  const viewMode: ViewMode = validViews.includes(resolved.view as ViewMode)
    ? (resolved.view as ViewMode)
    : "worksheet";

  const bundle = generateWorksheet({
    grade,
    lessonNumber,
    seed,
    difficultyLevel,
  });

  return (
    <TeacherStudioClient
      grades={catalog.gradeList}
      initialBundle={bundle}
      initialViewMode={viewMode}
    />
  );
}
