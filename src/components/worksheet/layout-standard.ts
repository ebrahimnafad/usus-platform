import standard from "@/components/worksheet/layout-standard.json";

/**
 * Typed view of the Worksheet layout standard. WORKSHEET_CONSTITUTION.md §3–4
 * is the authority; the JSON is shared with scripts/layout-guard.mjs.
 */

export type ExerciseColumnCount = 1 | 2 | 3;

export interface PixelSize {
  width: number;
  height: number;
}

export const EXERCISE_BODY_WIDTH_PX: number = standard.exerciseBodyWidthPx;
export const COLUMN_GAP_PX: number = standard.columnGapPx;

export const COLUMN_WIDTHS_PX: Record<ExerciseColumnCount, number> = {
  1: standard.columnWidthsPx["1"],
  2: standard.columnWidthsPx["2"],
  3: standard.columnWidthsPx["3"],
};

export const CANONICAL_SIZES_PX: {
  answerSlotDigit: PixelSize;
  answerSlotLine: PixelSize;
  fiveFrameCell: PixelSize;
  fiveFrameWidth: number;
  numberBondCircle: PixelSize;
  numberBondBox: PixelSize;
  equationStripHeight: number;
  balanceScaleBox: PixelSize;
} = standard.canonicalSizesPx;

export type TypeRole = keyof typeof standard.typeScalePx;

export const TYPE_SCALE_PX: Record<TypeRole, number> = standard.typeScalePx;
export const MIN_TEXT_PX: number = standard.minTextPx;
export const PROMPT_MAX_LINES: number = standard.promptMaxLines;
export const PAGE_BUDGET: number = standard.pageBudget;

export const PRINTABLE_AREA_MM: { width: number; height: number } =
  standard.printableAreaMm;
