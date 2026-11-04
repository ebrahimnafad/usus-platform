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

export function getGradeConfig(id: GradeId | string): GradeConfig | undefined {
  if (!id) return undefined;
  const normalized = id.trim().toUpperCase() === "K" ? "K" : id.trim();
  return GRADE_CONFIG_MAP[normalized as GradeId];
}
