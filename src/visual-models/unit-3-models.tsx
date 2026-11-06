import React from "react";
import type { ColorThemeId, VisualModelSpec } from "@/domain/types";
import { COLOR_PALETTES } from "@/visual-models/shapes-solids-coins";
import { registerVisualModel } from "@/visual-models/registry";
import { CANONICAL_SIZES_PX } from "@/components/worksheet/layout-standard";
import {
  AnswerSlot,
  type AnswerSlotKind,
} from "@/components/worksheet/AnswerSlot";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export type BondMissingPosition = "total" | "part1" | "part2" | "none";

export interface PartWholeSlotConfig {
  part1: number;
  part2: number;
  total?: number;
  missingPosition?: BondMissingPosition;
  slotKind?: AnswerSlotKind;
  tracePositions?: Array<"total" | "part1" | "part2">;
}

export interface NumberBondOptions extends PartWholeSlotConfig {
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  labelAr?: string;
}

export function createNumberBondSpec(
  options: NumberBondOptions
): VisualModelSpec {
  const part1 = Math.max(0, Math.min(5, options.part1));
  const part2 = Math.max(0, Math.min(5, options.part2));
  const total = options.total ?? part1 + part2;
  const missingPosition = options.missingPosition ?? "total";

  const p1Ar = formatEasternNumber(part1);
  const p2Ar = formatEasternNumber(part2);
  const totalAr = formatEasternNumber(total);

  return {
    kind: "number-bond",
    id: `number-bond-${part1}-${part2}-${total}-${missingPosition}`,
    labelAr:
      options.labelAr ??
      `رابطة الأعداد: الجزء الأول ${p1Ar} والجزء الثاني ${p2Ar} والكلّ ${totalAr}`,
    colorTheme: options.colorTheme ?? "coral",
    count: part1,
    secondaryCount: part2,
    meta: {
      part1,
      part2,
      total,
      missingPosition,
      slotKind: options.slotKind ?? "unknown",
      tracePositions: options.tracePositions ?? [],
      secondaryColorTheme: options.secondaryColorTheme ?? "sky",
    },
  };
}

export function renderPartWholeValue(params: {
  pos: "total" | "part1" | "part2";
  valueAr: string;
  ariaLabel: string;
  tone: "indigo" | "sky" | "amber";
  missingPosition: BondMissingPosition;
  tracePositions: Array<"total" | "part1" | "part2">;
  slotKind: AnswerSlotKind;
  solved: boolean;
  solvedAttrPrefix: string;
  tracedClassName: string;
  givenClassName: string;
  slotClassName?: string;
}): React.ReactNode {
  const {
    pos,
    valueAr,
    ariaLabel,
    tone,
    missingPosition,
    tracePositions,
    slotKind,
    solved,
    solvedAttrPrefix,
    tracedClassName,
    givenClassName,
    slotClassName,
  } = params;

  const missing = missingPosition === pos;
  const traced = tracePositions.includes(pos);

  if (missing) {
    return (
      <AnswerSlot
        solved={solved}
        answer={valueAr}
        ariaLabel={ariaLabel}
        kind={traced ? "write" : slotKind}
        tone={tone}
        className={slotClassName}
        solvedDataAttributes={{
          [`${solvedAttrPrefix}-${pos}`]: valueAr,
        }}
      />
    );
  }

  if (traced) {
    return (
      <span
        className={tracedClassName}
        data-trace-state={solved ? "solid" : "dotted"}
        {...(solved ? { [`${solvedAttrPrefix}-${pos}`]: valueAr } : {})}
      >
        {valueAr}
      </span>
    );
  }

  return (
    <span className={givenClassName} data-given-position={pos}>
      {valueAr}
    </span>
  );
}

export function NumberBondView({
  part1,
  part2,
  total,
  missingPosition = "total",
  slotKind = "unknown",
  tracePositions = [],
  colorTheme = "coral",
  secondaryColorTheme = "sky",
  solved = false,
}: {
  part1: number;
  part2: number;
  total: number;
  missingPosition?: BondMissingPosition;
  slotKind?: AnswerSlotKind;
  tracePositions?: Array<"total" | "part1" | "part2">;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  solved?: boolean;
}): React.ReactElement {
  const p1Ar = formatEasternNumber(part1);
  const p2Ar = formatEasternNumber(part2);
  const totalAr = formatEasternNumber(total);

  const primaryPalette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.coral;
  const secondaryPalette =
    COLOR_PALETTES[secondaryColorTheme] ?? COLOR_PALETTES.sky;

  const boxW = CANONICAL_SIZES_PX.numberBondBox.width; // 212
  const boxH = CANONICAL_SIZES_PX.numberBondBox.height; // 160
  const circleW = CANONICAL_SIZES_PX.numberBondCircle.width; // 56
  const circleH = CANONICAL_SIZES_PX.numberBondCircle.height; // 56

  const renderCircleContent = (
    pos: "total" | "part1" | "part2",
    valueAr: string,
    ariaLabel: string,
    tone: "indigo" | "sky" | "amber"
  ): React.ReactNode =>
    renderPartWholeValue({
      pos,
      valueAr,
      ariaLabel,
      tone,
      missingPosition,
      tracePositions,
      slotKind,
      solved,
      solvedAttrPrefix: "data-solved-bond",
      tracedClassName: `text-[28px] font-black leading-none ${
        solved ? "text-emerald-700" : "text-slate-400"
      }`,
      givenClassName: "text-[28px] font-black leading-none text-slate-900",
      slotClassName: "rounded-full",
    });

  return (
    <div
      className="relative inline-block shrink-0 select-none"
      style={{ width: `${boxW}px`, height: `${boxH}px` }}
      data-visual-model="number-bond"
      data-direction="rtl"
      data-part1={p1Ar}
      data-part2={p2Ar}
      data-total={totalAr}
      data-missing-position={missingPosition}
    >
      {/* Connecting arms SVG (Total at top (106,46) -> Part 1 right (164,114) & Part 2 left (48,114)) */}
      <svg
        width={boxW}
        height={boxH}
        viewBox={`0 0 ${boxW} ${boxH}`}
        fill="none"
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="2"
          width={boxW - 4}
          height={boxH - 4}
          rx="14"
          fill="#F8FAFC"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />
        {/* Right arm (First Part in RTL — solid stroke) */}
        <line
          x1="106"
          y1="46"
          x2="164"
          y2="114"
          stroke={primaryPalette.stroke}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Left arm (Second Part in RTL — dashed stroke for grayscale cue) */}
        <line
          x1="106"
          y1="46"
          x2="48"
          y2="114"
          stroke={secondaryPalette.stroke}
          strokeWidth="3.2"
          strokeDasharray="5 3"
          strokeLinecap="round"
        />
      </svg>

      {/* Top Label: الكلّ */}
      <span
        className="absolute text-center text-[13px] font-extrabold leading-none text-indigo-950"
        style={{ left: "78px", top: "3px", width: "56px" }}
      >
        الكلّ
      </span>

      {/* Top Circle: Total (56×56 px) */}
      <div
        data-number-bond-circle="total"
        data-bond-role="total"
        className="absolute flex items-center justify-center rounded-full border-2 border-indigo-700 bg-white shadow-2xs"
        style={{
          left: "78px",
          top: "18px",
          width: `${circleW}px`,
          height: `${circleH}px`,
        }}
      >
        {renderCircleContent(
          "total",
          totalAr,
          "دائرة الكلّ في رابطة الأعداد",
          "indigo"
        )}
      </div>

      {/* Bottom-Right Circle: First Part in RTL (56×56 px) */}
      <div
        data-number-bond-circle="part-right"
        data-bond-role="part1"
        className="absolute flex items-center justify-center rounded-full border-2 bg-white shadow-2xs"
        style={{
          left: "136px",
          top: "86px",
          width: `${circleW}px`,
          height: `${circleH}px`,
          borderColor: primaryPalette.stroke,
        }}
      >
        {renderCircleContent("part1", p1Ar, "دائرة الجزء الأول (يمين)", "sky")}
      </div>
      <span
        className="absolute text-center text-[13px] font-extrabold leading-none text-slate-700"
        style={{ left: "136px", top: "143px", width: "56px" }}
      >
        الجزء
      </span>

      {/* Bottom-Left Circle: Second Part in RTL (56×56 px, dashed ring for grayscale distinction) */}
      <div
        data-number-bond-circle="part-left"
        data-bond-role="part2"
        className="absolute flex items-center justify-center rounded-full border-2 border-dashed bg-white shadow-2xs"
        style={{
          left: "20px",
          top: "86px",
          width: `${circleW}px`,
          height: `${circleH}px`,
          borderColor: secondaryPalette.stroke,
        }}
      >
        {renderCircleContent(
          "part2",
          p2Ar,
          "دائرة الجزء الثاني (يسار)",
          "amber"
        )}
      </div>
      <span
        className="absolute text-center text-[13px] font-extrabold leading-none text-slate-700"
        style={{ left: "20px", top: "143px", width: "56px" }}
      >
        الجزء
      </span>
    </div>
  );
}

export type EquationLayout = "standard" | "total-first" | "expression";
export type EquationOperation = "add" | "subtract";
export type EquationMissingPosition = BondMissingPosition;

export interface EquationStripOptions extends PartWholeSlotConfig {
  operation?: EquationOperation;
  layout?: EquationLayout;
  labelAr?: string;
}

export function createEquationStripSpec(
  options: EquationStripOptions
): VisualModelSpec {
  const operation: EquationOperation = options.operation ?? "add";
  const part1 = Math.max(0, Math.min(5, options.part1));
  const part2 = Math.max(0, Math.min(5, options.part2));
  const total = options.total ?? part1 + part2;
  const layout = options.layout ?? "standard";
  const missingPosition =
    options.missingPosition ?? (operation === "subtract" ? "part2" : "total");

  const p1Ar = formatEasternNumber(part1);
  const p2Ar = formatEasternNumber(part2);
  const totalAr = formatEasternNumber(total);

  const defaultLabelAr =
    operation === "subtract"
      ? layout === "expression"
        ? `تعبير طرح: ${totalAr} − ${p1Ar}`
        : layout === "total-first"
          ? `معادلة طرح: ${p2Ar} = ${totalAr} − ${p1Ar}`
          : `معادلة طرح: ${totalAr} − ${p1Ar} = ${p2Ar}`
      : layout === "expression"
        ? `تعبير جمع: ${p1Ar} + ${p2Ar}`
        : layout === "total-first"
          ? `معادلة جمع: ${totalAr} = ${p1Ar} + ${p2Ar}`
          : `معادلة جمع: ${p1Ar} + ${p2Ar} = ${totalAr}`;

  return {
    kind: "equation-strip",
    id: `equation-strip-${operation}-${part1}-${part2}-${total}-${layout}-${missingPosition}`,
    labelAr: options.labelAr ?? defaultLabelAr,
    count: part1,
    secondaryCount: part2,
    meta: {
      operation,
      part1,
      part2,
      total,
      layout,
      missingPosition,
      slotKind: options.slotKind ?? "unknown",
      tracePositions: options.tracePositions ?? [],
    },
  };
}

export function EquationStripView({
  part1,
  part2,
  total,
  operation = "add",
  layout = "standard",
  missingPosition = "total",
  slotKind = "unknown",
  tracePositions = [],
  solved = false,
}: {
  part1: number;
  part2: number;
  total: number;
  operation?: EquationOperation;
  layout?: EquationLayout;
  missingPosition?: EquationMissingPosition;
  slotKind?: AnswerSlotKind;
  tracePositions?: Array<"total" | "part1" | "part2">;
  solved?: boolean;
}): React.ReactElement {
  const p1Ar = formatEasternNumber(part1);
  const p2Ar = formatEasternNumber(part2);
  const totalAr = formatEasternNumber(total);
  const stripH = CANONICAL_SIZES_PX.equationStripHeight; // 48

  const renderTerm = (
    pos: "part1" | "part2" | "total",
    valueAr: string,
    ariaLabel: string,
    tone: "indigo" | "sky" | "amber"
  ): React.ReactNode =>
    renderPartWholeValue({
      pos,
      valueAr,
      ariaLabel,
      tone,
      missingPosition,
      tracePositions,
      slotKind,
      solved,
      solvedAttrPrefix: "data-solved-equation",
      tracedClassName: `inline-flex h-12 w-10 items-center justify-center rounded-xl bg-slate-50 text-[28px] font-black leading-none ${
        solved ? "text-emerald-700" : "text-slate-400"
      }`,
      givenClassName:
        "inline-flex h-12 min-w-8 items-center justify-center px-1 text-[28px] font-black leading-none text-slate-900",
    });

  const opSpan = (symbol: string) => (
    <span
      className="inline-flex h-12 items-center justify-center px-0.5 text-[28px] font-black leading-none text-indigo-700"
      aria-hidden="true"
    >
      {symbol}
    </span>
  );

  return (
    <div
      dir="rtl"
      className="inline-flex shrink-0 items-center justify-center gap-1"
      style={{ height: `${stripH}px` }}
      data-visual-model="equation-strip"
      data-direction="rtl"
      data-equation-operation={operation}
      data-equation-layout={layout}
      data-missing-position={missingPosition}
      data-part1={p1Ar}
      data-part2={p2Ar}
      data-total={totalAr}
    >
      {operation === "subtract" ? (
        layout === "total-first" ? (
          <>
            {renderTerm(
              "part2",
              p2Ar,
              "مربع الجزء الناقص في المعادلة",
              "amber"
            )}
            {opSpan("=")}
            {renderTerm("total", totalAr, "مربع الكلّ في المعادلة", "indigo")}
            {opSpan("−")}
            {renderTerm("part1", p1Ar, "مربع الجزء الأول في المعادلة", "sky")}
          </>
        ) : layout === "expression" ? (
          <>
            {renderTerm("total", totalAr, "مربع الكلّ في التعبير", "indigo")}
            {opSpan("−")}
            {renderTerm("part1", p1Ar, "مربع الجزء الأول في التعبير", "sky")}
          </>
        ) : (
          <>
            {renderTerm("total", totalAr, "مربع الكلّ في المعادلة", "indigo")}
            {opSpan("−")}
            {renderTerm("part1", p1Ar, "مربع الجزء الأول في المعادلة", "sky")}
            {opSpan("=")}
            {renderTerm(
              "part2",
              p2Ar,
              "مربع الجزء الناقص في المعادلة",
              "amber"
            )}
          </>
        )
      ) : layout === "total-first" ? (
        <>
          {renderTerm("total", totalAr, "مربع الكلّ في المعادلة", "indigo")}
          {opSpan("=")}
          {renderTerm("part1", p1Ar, "مربع الجزء الأول في المعادلة", "sky")}
          {opSpan("+")}
          {renderTerm("part2", p2Ar, "مربع الجزء الثاني في المعادلة", "amber")}
        </>
      ) : layout === "expression" ? (
        <>
          {renderTerm("part1", p1Ar, "مربع الجزء الأول في التعبير", "sky")}
          {opSpan("+")}
          {renderTerm("part2", p2Ar, "مربع الجزء الثاني في التعبير", "amber")}
        </>
      ) : (
        <>
          {renderTerm("part1", p1Ar, "مربع الجزء الأول في المعادلة", "sky")}
          {opSpan("+")}
          {renderTerm("part2", p2Ar, "مربع الجزء الثاني في التعبير", "amber")}
          {opSpan("=")}
          {renderTerm("total", totalAr, "مربع الكلّ في المعادلة", "indigo")}
        </>
      )}
    </div>
  );
}

/**
 * Parts-and-Total response table component (not a standalone Visual Model;
 * uses solid vs dashed border pattern on Part 1 vs Part 2 for grayscale distinction per §2.5).
 */
export function PartsTableView({
  part1,
  part2,
  total,
  missingPosition = "total",
  slotKind = "unknown",
  tracePositions = [],
  solved = false,
}: {
  part1: number;
  part2: number;
  total: number;
  missingPosition?: BondMissingPosition;
  slotKind?: AnswerSlotKind;
  tracePositions?: Array<"total" | "part1" | "part2">;
  solved?: boolean;
}): React.ReactElement {
  const p1Ar = formatEasternNumber(part1);
  const p2Ar = formatEasternNumber(part2);
  const totalAr = formatEasternNumber(total);

  const renderCellValue = (
    pos: "part1" | "part2" | "total",
    valueAr: string,
    ariaLabel: string,
    tone: "indigo" | "sky" | "amber"
  ): React.ReactNode =>
    renderPartWholeValue({
      pos,
      valueAr,
      ariaLabel,
      tone,
      missingPosition,
      tracePositions,
      slotKind,
      solved,
      solvedAttrPrefix: "data-solved-table",
      tracedClassName: `inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 text-[28px] font-black leading-none ${
        solved
          ? "text-emerald-700 border-emerald-500 bg-emerald-50"
          : "text-slate-400"
      }`,
      givenClassName:
        "inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[28px] font-black leading-none text-slate-900",
    });

  return (
    <div
      dir="rtl"
      className="inline-grid grid-cols-3 gap-1 rounded-xl border border-indigo-200 bg-white p-1 shadow-2xs"
      data-parts-table="true"
      data-direction="rtl"
      data-part1={p1Ar}
      data-part2={p2Ar}
      data-total={totalAr}
      data-missing-position={missingPosition}
    >
      {/* Part 1 (Rightmost in RTL — solid border for grayscale cue) */}
      <div
        className="flex flex-col items-center gap-0.5 rounded-lg border border-sky-300 bg-sky-50/60 px-1.5 py-0.5"
        data-part-cell="part1"
      >
        <span className="text-[13px] font-extrabold leading-tight text-sky-950">
          الجزء
        </span>
        {renderCellValue("part1", p1Ar, "مربع الجزء الأول", "sky")}
      </div>

      {/* Part 2 (Middle in RTL — dashed border for grayscale cue) */}
      <div
        className="flex flex-col items-center gap-0.5 rounded-lg border border-dashed border-amber-400 bg-amber-50/60 px-1.5 py-0.5"
        data-part-cell="part2"
      >
        <span className="text-[13px] font-extrabold leading-tight text-amber-950">
          الجزء
        </span>
        {renderCellValue("part2", p2Ar, "مربع الجزء الثاني", "amber")}
      </div>

      {/* Total (Leftmost in RTL) */}
      <div
        className="flex flex-col items-center gap-0.5 rounded-lg border-2 border-indigo-300 bg-indigo-50/80 px-1.5 py-0.5"
        data-part-cell="total"
      >
        <span className="text-[13px] font-extrabold leading-tight text-indigo-950">
          الكلّ
        </span>
        {renderCellValue("total", totalAr, "مربع الكلّ", "indigo")}
      </div>
    </div>
  );
}

function unpackPartWholeMeta(model: VisualModelSpec): {
  part1: number;
  part2: number;
  total: number;
  missingPosition: BondMissingPosition;
  slotKind: AnswerSlotKind;
  tracePositions: Array<"total" | "part1" | "part2">;
  secondaryColorTheme: ColorThemeId;
} {
  const meta = (model.meta ?? {}) as Record<string, unknown>;
  const part1 = (meta.part1 as number) ?? model.count ?? 1;
  const part2 = (meta.part2 as number) ?? model.secondaryCount ?? 1;
  const total = (meta.total as number) ?? part1 + part2;
  const missingPosition =
    (meta.missingPosition as BondMissingPosition) ?? "total";
  const slotKind = (meta.slotKind as AnswerSlotKind) ?? "unknown";
  const tracePositions =
    (meta.tracePositions as Array<"total" | "part1" | "part2">) ?? [];
  const secondaryColorTheme =
    (meta.secondaryColorTheme as ColorThemeId) ?? "sky";

  return {
    part1,
    part2,
    total,
    missingPosition,
    slotKind,
    tracePositions,
    secondaryColorTheme,
  };
}

export type BalancePanKind = "digit" | "expression" | "slot";
export type BalanceScaleTilt = "level" | "right-heavy" | "left-heavy";

export interface BalancePanSpec {
  kind: BalancePanKind;
  value: number;
  expressionAr?: string;
  slotKind?: AnswerSlotKind;
  /** Optional missing addend inside an expression pan so the student fills this pan too */
  missingAddend?: {
    givenPart: number;
    missingValue: number;
  };
}

export interface BalanceScaleOptions {
  rightPan: BalancePanSpec;
  leftPan: BalancePanSpec;
  tilt?: BalanceScaleTilt;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  labelAr?: string;
}

export function deriveBalanceScaleTilt(
  rightValue: number,
  leftValue: number
): BalanceScaleTilt {
  if (rightValue === leftValue) return "level";
  return rightValue > leftValue ? "right-heavy" : "left-heavy";
}

function normalizeBalancePan(pan: BalancePanSpec): BalancePanSpec {
  return {
    kind: pan.kind,
    value: pan.value,
    expressionAr: pan.expressionAr,
    slotKind: pan.slotKind ?? "unknown",
    missingAddend: pan.missingAddend,
  };
}

function formatBalancePanLabel(pan: BalancePanSpec): string {
  if (pan.kind === "expression" && pan.expressionAr) {
    return toEasternArabicNumerals(pan.expressionAr);
  }
  return formatEasternNumber(pan.value);
}

export function createBalanceScaleSpec(
  options: BalanceScaleOptions
): VisualModelSpec {
  const rightPan = normalizeBalancePan(options.rightPan);
  const leftPan = normalizeBalancePan(options.leftPan);
  const tilt =
    options.tilt ?? deriveBalanceScaleTilt(rightPan.value, leftPan.value);

  const rightLabel = formatBalancePanLabel(rightPan);
  const leftLabel = formatBalancePanLabel(leftPan);

  return {
    kind: "balance-scale",
    id: `balance-scale-${rightPan.kind}-${rightPan.value}-${leftPan.kind}-${leftPan.value}-${tilt}`,
    labelAr:
      options.labelAr ??
      `ميزان ذو كفّتين: الكفّة اليمنى ${rightLabel} والكفّة اليسرى ${leftLabel}`,
    colorTheme: options.colorTheme ?? "sky",
    count: rightPan.value,
    secondaryCount: leftPan.value,
    meta: {
      rightPan,
      leftPan,
      tilt,
      secondaryColorTheme: options.secondaryColorTheme ?? "amber",
    },
  };
}

export function BalanceScaleView({
  rightPan,
  leftPan,
  tilt,
  colorTheme = "sky",
  secondaryColorTheme = "amber",
  solved = false,
}: {
  rightPan: BalancePanSpec;
  leftPan: BalancePanSpec;
  tilt?: BalanceScaleTilt;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  solved?: boolean;
}): React.ReactElement {
  const effectiveTilt =
    tilt ?? deriveBalanceScaleTilt(rightPan.value, leftPan.value);
  const boxW = CANONICAL_SIZES_PX.balanceScaleBox.width; // 212
  const boxH = CANONICAL_SIZES_PX.balanceScaleBox.height; // 136

  const primaryPalette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.sky;
  const secondaryPalette =
    COLOR_PALETTES[secondaryColorTheme] ?? COLOR_PALETTES.amber;

  // Vertical coordinates for beam ends and pan tops based on tilt
  const rightOffset =
    effectiveTilt === "right-heavy"
      ? 6
      : effectiveTilt === "left-heavy"
        ? -6
        : 0;
  const leftOffset = -rightOffset;

  const pivotY = 90;
  const beamRightY = pivotY + rightOffset;
  const beamLeftY = pivotY + leftOffset;
  const rightTrayY = 74 + rightOffset;
  const leftTrayY = 74 + leftOffset;
  const rightPanTop = 22 + rightOffset;
  const leftPanTop = 22 + leftOffset;

  const renderPanContent = (
    pan: BalancePanSpec,
    side: "right" | "left"
  ): React.ReactNode => {
    const valueAr = formatEasternNumber(pan.value);
    const isRight = side === "right";
    const ariaLabel = isRight
      ? "مربع الكفّة اليمنى في الميزان"
      : "مربع الكفّة اليسرى في الميزان";

    if (pan.kind === "slot") {
      return (
        <AnswerSlot
          solved={solved}
          answer={valueAr}
          ariaLabel={ariaLabel}
          kind={pan.slotKind ?? "unknown"}
          tone={isRight ? "sky" : "amber"}
          solvedDataAttributes={{
            [`data-solved-balance-${side}`]: valueAr,
          }}
        />
      );
    }

    if (pan.kind === "expression") {
      if (pan.missingAddend) {
        const givenAr = formatEasternNumber(pan.missingAddend.givenPart);
        const missingAr = formatEasternNumber(pan.missingAddend.missingValue);
        return (
          <div
            dir="rtl"
            className="inline-flex items-center justify-center gap-0.5"
            data-pan-content="expression"
          >
            <span className="text-[28px] font-black leading-none text-slate-900">
              {givenAr}+
            </span>
            <AnswerSlot
              solved={solved}
              answer={missingAr}
              ariaLabel={ariaLabel}
              kind={pan.slotKind ?? "unknown"}
              tone={isRight ? "sky" : "amber"}
              solvedDataAttributes={{
                [`data-solved-balance-${side}`]: missingAr,
              }}
            />
          </div>
        );
      }

      const exprText = toEasternArabicNumerals(pan.expressionAr ?? valueAr);
      return (
        <span
          dir="rtl"
          className={`inline-flex h-12 min-w-16 items-center justify-center rounded-xl border-2 bg-white px-1.5 text-[28px] font-black leading-none text-slate-900 shadow-2xs ${
            isRight ? "border-sky-500" : "border-dashed border-amber-500"
          }`}
          data-pan-content="expression"
        >
          {exprText}
        </span>
      );
    }

    return (
      <span
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 bg-white text-[28px] font-black leading-none text-slate-900 shadow-2xs ${
          isRight ? "border-sky-500" : "border-dashed border-amber-500"
        }`}
        data-pan-content="digit"
      >
        {valueAr}
      </span>
    );
  };

  const rightValueAr = formatEasternNumber(rightPan.value);
  const leftValueAr = formatEasternNumber(leftPan.value);

  return (
    <div
      className="relative inline-block shrink-0 select-none"
      style={{ width: `${boxW}px`, height: `${boxH}px` }}
      data-visual-model="balance-scale"
      data-direction="rtl"
      data-scale-tilt={effectiveTilt}
      data-right-value={rightValueAr}
      data-left-value={leftValueAr}
    >
      <svg
        width={boxW}
        height={boxH}
        viewBox={`0 0 ${boxW} ${boxH}`}
        fill="none"
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Outer card background */}
        <rect
          x="2"
          y="2"
          width={boxW - 4}
          height={boxH - 4}
          rx="14"
          fill="#F8FAFC"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />

        {/* Base pedestal */}
        <rect x="74" y="120" width="64" height="8" rx="4" fill="#475569" />

        {/* Fulcrum triangle */}
        <polygon
          points={`106,${pivotY} 88,120 124,120`}
          fill="#6366F1"
          stroke="#312E81"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Equality / inequality sign on fulcrum */}
        <text
          x="106"
          y="116"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill="#FFFFFF"
        >
          {effectiveTilt === "level" ? "=" : "≠"}
        </text>

        {/* Balance beam: right side solid, left side dashed for grayscale distinction */}
        <line
          x1="106"
          y1={pivotY}
          x2="156"
          y2={beamRightY}
          stroke={primaryPalette.stroke}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="106"
          y1={pivotY}
          x2="56"
          y2={beamLeftY}
          stroke={secondaryPalette.stroke}
          strokeWidth="4"
          strokeDasharray="6 3"
          strokeLinecap="round"
        />

        {/* Right hanger stem and pan tray (solid stroke) */}
        <line
          x1="156"
          y1={beamRightY}
          x2="156"
          y2={rightTrayY}
          stroke={primaryPalette.stroke}
          strokeWidth="2.5"
        />
        <path
          d={`M 118 ${rightTrayY} L 194 ${rightTrayY} L 186 ${rightTrayY + 6} L 126 ${rightTrayY + 6} Z`}
          fill={primaryPalette.fillLight}
          stroke={primaryPalette.stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* Left hanger stem and pan tray (dashed stroke for grayscale cue) */}
        <line
          x1="56"
          y1={beamLeftY}
          x2="56"
          y2={leftTrayY}
          stroke={secondaryPalette.stroke}
          strokeWidth="2.5"
          strokeDasharray="4 2"
        />
        <path
          d={`M 18 ${leftTrayY} L 94 ${leftTrayY} L 86 ${leftTrayY + 6} L 26 ${leftTrayY + 6} Z`}
          fill={secondaryPalette.fillLight}
          stroke={secondaryPalette.stroke}
          strokeWidth="1.8"
          strokeDasharray="5 2"
          strokeLinejoin="round"
        />

        {/* Center pivot pin */}
        <circle
          cx="106"
          cy={pivotY}
          r="5"
          fill="#EEF2FF"
          stroke="#312E81"
          strokeWidth="2"
        />
      </svg>

      {[
        {
          side: "right" as const,
          pan: rightPan,
          leftPx: 110,
          topPx: rightPanTop,
        },
        { side: "left" as const, pan: leftPan, leftPx: 10, topPx: leftPanTop },
      ].map(({ side, pan, leftPx, topPx }) => (
        <div
          key={side}
          data-scale-pan={side}
          data-pan-kind={pan.kind}
          className="absolute flex items-center justify-center"
          style={{
            left: `${leftPx}px`,
            top: `${topPx}px`,
            width: "92px",
            height: "48px",
          }}
        >
          {renderPanContent(pan, side)}
        </div>
      ))}
    </div>
  );
}

export function registerUnit3VisualModels(): void {
  registerVisualModel("number-bond", ({ model, solved }) => {
    const unpacked = unpackPartWholeMeta(model);
    return (
      <NumberBondView
        {...unpacked}
        colorTheme={model.colorTheme ?? "coral"}
        solved={solved}
      />
    );
  });

  registerVisualModel("equation-strip", ({ model, solved }) => {
    const unpacked = unpackPartWholeMeta(model);
    const meta = (model.meta ?? {}) as Record<string, unknown>;
    const layout = (meta.layout as EquationLayout) ?? "standard";
    const operation = (meta.operation as EquationOperation) ?? "add";

    return (
      <EquationStripView
        {...unpacked}
        operation={operation}
        layout={layout}
        solved={solved}
      />
    );
  });

  registerVisualModel("balance-scale", ({ model, solved }) => {
    const meta = (model.meta ?? {}) as Record<string, unknown>;
    const rightPan = (meta.rightPan as BalancePanSpec) ?? {
      kind: "digit",
      value: model.count ?? 1,
    };
    const leftPan = (meta.leftPan as BalancePanSpec) ?? {
      kind: "digit",
      value: model.secondaryCount ?? 1,
    };
    const tilt = meta.tilt as BalanceScaleTilt | undefined;
    const secondaryColorTheme =
      (meta.secondaryColorTheme as ColorThemeId) ?? "amber";

    return (
      <BalanceScaleView
        rightPan={rightPan}
        leftPan={leftPan}
        tilt={tilt}
        colorTheme={model.colorTheme ?? "sky"}
        secondaryColorTheme={secondaryColorTheme}
        solved={solved}
      />
    );
  });
}

registerUnit3VisualModels();
