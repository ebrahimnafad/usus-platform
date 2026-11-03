import type { GradeId, WorksheetDifficultyMode } from "@/domain/types";

export type ViewMode = "worksheet" | "answer-key" | "teacher-notes";

export const VALID_GRADES: readonly GradeId[] = ["K", "1", "2", "3", "4", "5"];

export const VALID_DIFFICULTY_MODES: readonly WorksheetDifficultyMode[] = [
  "scaffolded",
  "Easy",
  "Intermediate",
  "Advanced",
];

export const VALID_VIEW_MODES: readonly ViewMode[] = [
  "worksheet",
  "answer-key",
  "teacher-notes",
];

export const ZOOM_LEVELS: readonly number[] = [75, 90, 100, 115, 125];

export interface StudioResolvedState {
  grade: GradeId;
  lessonNumber: number;
  seed: string;
  difficultyLevel: WorksheetDifficultyMode;
  viewMode: ViewMode;
  searchQuery: string;
  zoomPercent: number;
}

export interface StudioSearchParamsInput {
  grade?: string;
  lesson?: string | number;
  seed?: string;
  difficulty?: string;
  view?: string;
  q?: string;
  zoom?: string | number;
}

export function resolveStudioStateFromSearchParams(
  raw: StudioSearchParamsInput = {}
): StudioResolvedState {
  const grade: GradeId = VALID_GRADES.includes(raw.grade as GradeId)
    ? (raw.grade as GradeId)
    : "K";

  const parsedLesson =
    typeof raw.lesson === "number"
      ? raw.lesson
      : parseInt(String(raw.lesson ?? "1"), 10);
  const lessonNumber =
    Number.isFinite(parsedLesson) && parsedLesson >= 1 && parsedLesson <= 135
      ? parsedLesson
      : 1;

  const seed = String(raw.seed ?? "").trim() || "K1-2026";

  const difficultyLevel: WorksheetDifficultyMode =
    VALID_DIFFICULTY_MODES.includes(raw.difficulty as WorksheetDifficultyMode)
      ? (raw.difficulty as WorksheetDifficultyMode)
      : "scaffolded";

  const viewMode: ViewMode = VALID_VIEW_MODES.includes(raw.view as ViewMode)
    ? (raw.view as ViewMode)
    : "worksheet";

  const searchQuery = String(raw.q ?? "").trim();

  const parsedZoom =
    typeof raw.zoom === "number"
      ? raw.zoom
      : parseInt(String(raw.zoom ?? "100"), 10);
  const zoomPercent = ZOOM_LEVELS.includes(parsedZoom) ? parsedZoom : 100;

  return {
    grade,
    lessonNumber,
    seed,
    difficultyLevel,
    viewMode,
    searchQuery,
    zoomPercent,
  };
}
