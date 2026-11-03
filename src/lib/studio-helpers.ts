import type {
  Grade,
  GradeId,
  Unit,
  WorksheetDifficultyMode,
} from "@/domain/types";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import {
  VALID_DIFFICULTY_MODES,
  VALID_GRADES,
  VALID_VIEW_MODES,
  ZOOM_LEVELS,
  resolveStudioStateFromSearchParams,
  type StudioResolvedState,
} from "@/lib/studio-state";

export type ViewMode = "worksheet" | "answer-key" | "teacher-notes";

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
  | { type: "regenerate-seed"; step?: number }
  | { type: "step-zoom"; delta: -1 | 1 };

export const DIFFICULTY_OPTIONS: Array<{
  value: WorksheetDifficultyMode;
  labelAr: string;
}> = [
  { value: "scaffolded", labelAr: "متدرج" },
  { value: "Easy", labelAr: "سهل" },
  { value: "Intermediate", labelAr: "متوسط" },
  { value: "Advanced", labelAr: "متقدم" },
];

export function formatGradePillLabelAr(grade: Grade): string {
  if (grade.id === "K") {
    return "الروضة K";
  }
  const numAr = formatEasternNumber(Number(grade.id));
  return `الصف ${numAr} (${grade.labelAr})`;
}

export function buildStudioSearchParams(
  state: Pick<
    StudioResolvedState,
    "grade" | "lessonNumber" | "seed" | "difficultyLevel" | "viewMode"
  >
): string {
  const params = new URLSearchParams({
    grade: state.grade,
    lesson: String(state.lessonNumber),
    seed: state.seed,
    difficulty: state.difficultyLevel,
    view: state.viewMode,
  });
  return params.toString();
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

export function filterUnitsForStudioSearch(
  units: readonly Unit[],
  query: string
): Unit[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return [...units];
  }
  const qLower = trimmed.toLowerCase();

  const filteredUnits: Unit[] = [];
  for (const unit of units) {
    const matchedLessons = unit.lessons.filter((lesson) => {
      const lessonNumAr = formatEasternNumber(lesson.lessonNumber);
      const lessonNumWest = String(lesson.lessonNumber);
      return (
        lesson.titleAr.includes(trimmed) ||
        toEasternArabicNumerals(lesson.titleAr).includes(trimmed) ||
        lesson.titleEn.toLowerCase().includes(qLower) ||
        lesson.id.toLowerCase().includes(qLower) ||
        lessonNumAr === trimmed ||
        lessonNumWest === trimmed ||
        lesson.standards.some((std) => std.toLowerCase().includes(qLower))
      );
    });

    if (matchedLessons.length > 0) {
      filteredUnits.push({
        ...unit,
        lessons: matchedLessons,
      });
    }
  }
  return filteredUnits;
}

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
        seed: mintNextStudioSeed(current.seed, action.step ?? 1),
      };

    case "step-zoom": {
      const currentIdx = ZOOM_LEVELS.indexOf(current.zoomPercent);
      const baseIdx = currentIdx >= 0 ? currentIdx : 2;
      const nextIdx = Math.max(
        0,
        Math.min(ZOOM_LEVELS.length - 1, baseIdx + action.delta)
      );
      return {
        ...current,
        zoomPercent: ZOOM_LEVELS[nextIdx],
      };
    }
  }
}
