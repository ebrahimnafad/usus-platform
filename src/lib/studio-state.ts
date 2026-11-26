import type {
  Grade,
  GradeId,
  ViewMode,
  WorksheetDifficultyMode,
} from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";

export type { ViewMode } from "@/domain/types";

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

export type StudioNavigationAction =
  | { type: "select-grade"; grade: GradeId }
  | { type: "select-lesson"; grade: GradeId; lessonNumber: number }
  | {
      type: "select-prerequisite";
      prerequisiteCode?: string;
      grade?: GradeId;
      lessonNumber?: number;
    }
  | { type: "select-difficulty"; difficultyLevel: WorksheetDifficultyMode }
  | { type: "select-view"; viewMode: ViewMode }
  | { type: "regenerate-seed"; seed?: string; step?: number }
  | { type: "step-zoom"; delta: -1 | 1 };

export type StudioHistoryMode = "push" | "replace";

export interface StudioNavigationTransition {
  nextState: StudioResolvedState;
  historyMode: StudioHistoryMode;
  pathname: string;
  searchParams: string;
  href: string;
}

export const DIFFICULTY_OPTIONS: Array<{
  value: WorksheetDifficultyMode;
  labelAr: string;
  explainerAr: string;
}> = [
  {
    value: "scaffolded",
    labelAr: "متدرج",
    explainerAr: "يبدأ سهلًا ويشتدّ عبر الأقسام الثلاثة",
  },
  {
    value: "Easy",
    labelAr: "سهل",
    explainerAr: "كل التمارين بمستوى سهل",
  },
  {
    value: "Intermediate",
    labelAr: "متوسط",
    explainerAr: "كل التمارين بمستوى متوسط",
  },
  {
    value: "Advanced",
    labelAr: "متقدم",
    explainerAr: "كل التمارين بمستوى متقدم",
  },
];

const EASTERN_TO_WESTERN_DIGITS: Record<string, string> = {
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
};

function normalizeEasternDigits(raw: string): string {
  return raw.replace(/[٠-٩]/g, (ch) => EASTERN_TO_WESTERN_DIGITS[ch] ?? ch);
}

export function formatGradePillLabelAr(grade: Grade): string {
  if (grade.id === "K") {
    return "الروضة K";
  }
  const numAr = formatEasternNumber(Number(grade.id));
  return `الصف ${numAr} (${grade.labelAr})`;
}

export function routeForGrade(grade: GradeId): string {
  return `/math/${grade.toLowerCase()}`;
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

export function buildStudioSearchParams(
  state: Pick<
    StudioResolvedState,
    "grade" | "lessonNumber" | "seed" | "difficultyLevel" | "viewMode"
  > & {
    searchQuery?: string;
  }
): string {
  const params = new URLSearchParams({
    grade: state.grade,
    lesson: String(state.lessonNumber),
    seed: state.seed,
    difficulty: state.difficultyLevel,
    view: state.viewMode,
  });
  const trimmedQuery = state.searchQuery?.trim();
  if (trimmedQuery) {
    params.set("q", trimmedQuery);
  }
  return params.toString();
}

export function buildStudioRouteHref(
  state: Pick<
    StudioResolvedState,
    "grade" | "lessonNumber" | "seed" | "difficultyLevel" | "viewMode"
  > & {
    searchQuery?: string;
  },
  pathnameOverride?: string
): string {
  const pathname = pathnameOverride ?? routeForGrade(state.grade);
  const query = buildStudioSearchParams(state);
  return `${pathname}?${query}`;
}

export function buildPdfExportUrl(
  state: Pick<
    StudioResolvedState,
    "grade" | "lessonNumber" | "seed" | "difficultyLevel" | "viewMode"
  >
): string {
  const targetView: "worksheet" | "answer-key" =
    state.viewMode === "answer-key" ? "answer-key" : "worksheet";
  const params = new URLSearchParams({
    grade: state.grade,
    lesson: String(state.lessonNumber),
    seed: state.seed,
    difficulty: state.difficultyLevel,
    view: targetView,
  });
  // NOTE: /api/pdf no longer exists in production (ADR-0020).
  // This URL is retained for local layout-guard scripts that run against a
  // local dev server with the full Playwright-backed PDF pipeline.
  return `/api/pdf?${params.toString()}`;
}

export function mintNextStudioSeed(
  currentSeed: string,
  step: number = 1
): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const input = `${currentSeed || "K1-2026"}::regen::${step}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  let state = h >>> 0 || 0x6d2b79f5;
  let code = "";
  for (let i = 0; i < 6; i++) {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    const idx = ((t ^ (t >>> 14)) >>> 0) % chars.length;
    code += chars[idx];
  }
  return code === currentSeed ? `${code}2` : code;
}

export function stepStudioZoom(currentZoom: number, delta: -1 | 1): number {
  const currentIdx = ZOOM_LEVELS.indexOf(currentZoom);
  const baseIdx = currentIdx >= 0 ? currentIdx : 2;
  const nextIdx = Math.max(
    0,
    Math.min(ZOOM_LEVELS.length - 1, baseIdx + delta)
  );
  return ZOOM_LEVELS[nextIdx];
}

export function applyStudioNavigationAction(
  current: StudioResolvedState,
  action: StudioNavigationAction
): StudioResolvedState {
  switch (action.type) {
    case "select-grade":
      return {
        ...current,
        grade: action.grade,
        lessonNumber: 1,
      };

    case "select-lesson":
      return {
        ...current,
        grade: action.grade,
        lessonNumber: Math.max(1, Math.min(135, action.lessonNumber)),
      };

    case "select-prerequisite": {
      if (action.grade && typeof action.lessonNumber === "number") {
        return {
          ...current,
          grade: action.grade,
          lessonNumber: Math.max(1, Math.min(135, action.lessonNumber)),
        };
      }
      const normalized = normalizeEasternDigits(
        (action.prerequisiteCode ?? "").trim()
      );
      const match = normalized.match(/^(K|[1-5])-(\d+)(?:\.\d+)?$/);
      if (!match) {
        return current;
      }
      return {
        ...current,
        grade: match[1] as GradeId,
        lessonNumber: Math.max(1, Math.min(135, parseInt(match[2], 10))),
      };
    }

    case "select-difficulty":
      return {
        ...current,
        difficultyLevel: action.difficultyLevel,
      };

    case "select-view":
      return {
        ...current,
        viewMode: action.viewMode,
      };

    case "regenerate-seed":
      return {
        ...current,
        seed:
          action.seed?.trim() ||
          mintNextStudioSeed(current.seed, action.step ?? 1),
      };

    case "step-zoom":
      return {
        ...current,
        zoomPercent: stepStudioZoom(current.zoomPercent, action.delta),
      };
  }
}

export function resolveStudioNavigationTransition(
  current: StudioResolvedState,
  action: StudioNavigationAction,
  currentPathname?: string
): StudioNavigationTransition {
  const nextState = applyStudioNavigationAction(current, action);
  const historyMode: StudioHistoryMode =
    action.type === "select-lesson" || action.type === "select-prerequisite"
      ? "push"
      : "replace";
  const pathname =
    action.type === "select-lesson" ||
    action.type === "select-prerequisite" ||
    action.type === "select-grade"
      ? routeForGrade(nextState.grade)
      : (currentPathname ?? routeForGrade(nextState.grade));
  const searchParams = buildStudioSearchParams(nextState);

  return {
    nextState,
    historyMode,
    pathname,
    searchParams,
    href: `${pathname}?${searchParams}`,
  };
}
