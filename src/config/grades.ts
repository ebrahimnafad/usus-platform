import type { GradeId } from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";

export type GradeColorToken =
  "rose" | "orange" | "amber" | "emerald" | "sky" | "violet";

export type GradeVisualModelKey =
  | "FiveFrame"
  | "TenFrame"
  | "NumberLine"
  | "ArrayModel"
  | "BarModel"
  | "CoordinateGrid";

export interface GradeConfig {
  id: GradeId;
  label: string;
  shortLabel: string;
  color: GradeColorToken;
  visualModel: GradeVisualModelKey;
  descriptionAr: string;
  unitCount: number;
  lessonCount: number;
}

export const GRADES: readonly GradeConfig[] = [
  {
    id: "K",
    label: "الروضة",
    shortLabel: "الروضة K",
    color: "rose",
    visualModel: "FiveFrame",
    descriptionAr: "الأعداد حتى ٢٠، العد والمقارنة، والأشكال الهندسية",
    unitCount: 12,
    lessonCount: 135,
  },
  {
    id: "1",
    label: "الصف الأول",
    shortLabel: `الصف ${formatEasternNumber(1)}`,
    color: "orange",
    visualModel: "TenFrame",
    descriptionAr: "العمليات حتى ٢٠، القيمة المنزلية حتى ١٢٠، والقياس",
    unitCount: 12,
    lessonCount: 135,
  },
  {
    id: "2",
    label: "الصف الثاني",
    shortLabel: `الصف ${formatEasternNumber(2)}`,
    color: "amber",
    visualModel: "NumberLine",
    descriptionAr: "الجمع والطرح حتى ١٠٠٠، القيمة المنزلية، والكسور",
    unitCount: 12,
    lessonCount: 135,
  },
  {
    id: "3",
    label: "الصف الثالث",
    shortLabel: `الصف ${formatEasternNumber(3)}`,
    color: "emerald",
    visualModel: "ArrayModel",
    descriptionAr: "مفاهيم الضرب والقسمة، المساحة والمحيط، وتكافؤ الكسور",
    unitCount: 12,
    lessonCount: 135,
  },
  {
    id: "4",
    label: "الصف الرابع",
    shortLabel: `الصف ${formatEasternNumber(4)}`,
    color: "sky",
    visualModel: "BarModel",
    descriptionAr: "العمليات متعددة الخانات، جمع وطرح الكسور، والزوايا",
    unitCount: 12,
    lessonCount: 135,
  },
  {
    id: "5",
    label: "الصف الخامس",
    shortLabel: `الصف ${formatEasternNumber(5)}`,
    color: "violet",
    visualModel: "CoordinateGrid",
    descriptionAr: "ضرب وقسمة الكسور والكسور العشرية، الحجم، والمستوى الإحداثي",
    unitCount: 12,
    lessonCount: 135,
  },
] as const;

export const GRADE_CONFIG_MAP: Record<GradeId, GradeConfig> = GRADES.reduce(
  (acc, grade) => {
    acc[grade.id] = grade;
    return acc;
  },
  {} as Record<GradeId, GradeConfig>
);

export function normalizeGradeId(id: string): GradeId {
  const trimmed = id.trim();
  return (trimmed.toUpperCase() === "K" ? "K" : trimmed) as GradeId;
}

export function getGradeConfig(id: GradeId | string): GradeConfig | undefined {
  if (!id) return undefined;
  const normalized = normalizeGradeId(id);
  return GRADE_CONFIG_MAP[normalized];
}

export interface GradeAccentStyles {
  activeButtonBg: string;
  activeBadgeBg: string;
  activeTabBg: string;
  primaryButtonBg: string;
}

export const GRADE_ACCENTS: Record<GradeColorToken, GradeAccentStyles> = {
  rose: {
    activeButtonBg: "bg-rose-600 text-white",
    activeBadgeBg: "bg-rose-800 text-rose-100",
    activeTabBg: "bg-rose-600 text-white shadow-2xs",
    primaryButtonBg: "bg-rose-600 hover:bg-rose-700 text-white",
  },
  orange: {
    activeButtonBg: "bg-orange-600 text-white",
    activeBadgeBg: "bg-orange-800 text-orange-100",
    activeTabBg: "bg-orange-600 text-white shadow-2xs",
    primaryButtonBg: "bg-orange-600 hover:bg-orange-700 text-white",
  },
  amber: {
    activeButtonBg: "bg-amber-600 text-white",
    activeBadgeBg: "bg-amber-800 text-amber-100",
    activeTabBg: "bg-amber-600 text-white shadow-2xs",
    primaryButtonBg: "bg-amber-600 hover:bg-amber-700 text-white",
  },
  emerald: {
    activeButtonBg: "bg-emerald-600 text-white",
    activeBadgeBg: "bg-emerald-800 text-emerald-100",
    activeTabBg: "bg-emerald-600 text-white shadow-2xs",
    primaryButtonBg: "bg-emerald-600 hover:bg-emerald-700 text-white",
  },
  sky: {
    activeButtonBg: "bg-sky-600 text-white",
    activeBadgeBg: "bg-sky-800 text-sky-100",
    activeTabBg: "bg-sky-600 text-white shadow-2xs",
    primaryButtonBg: "bg-sky-600 hover:bg-sky-700 text-white",
  },
  violet: {
    activeButtonBg: "bg-violet-600 text-white",
    activeBadgeBg: "bg-violet-800 text-violet-100",
    activeTabBg: "bg-violet-600 text-white shadow-2xs",
    primaryButtonBg: "bg-violet-600 hover:bg-violet-700 text-white",
  },
};

export const DEFAULT_GRADE_ACCENTS: GradeAccentStyles = {
  activeButtonBg: "bg-indigo-600 text-white",
  activeBadgeBg: "bg-indigo-800 text-indigo-100",
  activeTabBg: "bg-indigo-600 text-white shadow-2xs",
  primaryButtonBg: "bg-indigo-600 hover:bg-indigo-700 text-white",
};

export function getGradeAccents(color?: GradeColorToken): GradeAccentStyles {
  return (color && GRADE_ACCENTS[color]) ?? DEFAULT_GRADE_ACCENTS;
}
