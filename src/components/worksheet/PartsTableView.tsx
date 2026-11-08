import React from "react";
import {
  ANSWER_SLOT_SIZE_CLASS,
  AnswerSlot,
  type AnswerSlotKind,
} from "@/components/worksheet/AnswerSlot";
import { formatEasternNumber } from "@/lib/numerals";

export type BondMissingPosition =
  "total" | "part1" | "part2" | "both-parts" | "none";

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

  const missing =
    missingPosition === pos ||
    (missingPosition === "both-parts" && (pos === "part1" || pos === "part2"));
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

/**
 * Parts-and-Total response table module (uses solid vs dashed border pattern
 * on Part 1 vs Part 2 for grayscale distinction per §2.5, and standardizes
 * cell sizes via `ANSWER_SLOT_SIZE_CLASS`).
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
      tracedClassName: `inline-flex ${ANSWER_SLOT_SIZE_CLASS} items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 text-[28px] font-black leading-none ${
        solved
          ? "text-emerald-700 border-emerald-500 bg-emerald-50"
          : "text-slate-400"
      }`,
      givenClassName: `inline-flex ${ANSWER_SLOT_SIZE_CLASS} items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[28px] font-black leading-none text-slate-900`,
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
