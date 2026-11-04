"use client";

import React from "react";
import type { Unit } from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";

export interface UnitSpineProps {
  units: readonly Unit[];
  currentUnitNumber: number;
  matchedUnitNumbers: readonly number[];
  allExpanded: boolean;
  onSelectUnit: (unitNumber: number) => void;
  onToggleAllUnits: () => void;
}

/**
 * Twelve segments that show the shape of the grade: where the current unit
 * sits, which units carry search matches, and which unit is enrichment.
 */
export function UnitSpine({
  units,
  currentUnitNumber,
  matchedUnitNumbers,
  allExpanded,
  onSelectUnit,
  onToggleAllUnits,
}: UnitSpineProps): React.ReactElement {
  const matched = new Set(matchedUnitNumbers);

  return (
    <section aria-label="وحدات الصف" data-unit-spine="true">
      <div className="mb-1 flex items-center justify-between gap-2 px-1">
        <span className="text-[11px] font-extrabold text-stone-600">
          الوحدات
        </span>
        <button
          type="button"
          onClick={onToggleAllUnits}
          data-expand-all-units="true"
          className="min-h-6 rounded px-1 text-[11px] font-bold text-[var(--studio-accent)] transition-colors duration-150 hover:underline"
        >
          {allExpanded ? "طي الوحدات" : "توسيع كل الوحدات"}
        </button>
      </div>

      <div
        className="grid grid-cols-12 gap-px"
        role="group"
        aria-label="وحدات المنهج"
      >
        {units.map((unit) => {
          const isCurrent = unit.unitNumber === currentUnitNumber;
          const hasMatch = matched.has(unit.unitNumber);

          return (
            <div key={unit.unitNumber} className="group relative">
              <button
                type="button"
                data-spine-unit={unit.unitNumber}
                aria-label={`الوحدة ${formatEasternNumber(
                  unit.unitNumber
                )} — ${unit.titleAr}`}
                aria-current={isCurrent ? "true" : undefined}
                onClick={() => onSelectUnit(unit.unitNumber)}
                className={`relative flex min-h-6 w-full items-center justify-center rounded-[4px] border text-[10px] font-extrabold tabular-nums transition-colors duration-[180ms] motion-reduce:transition-none ${
                  isCurrent
                    ? "studio-tint-surface border-transparent text-white"
                    : "border-[var(--studio-seam)] bg-[var(--studio-panel)] text-stone-500 hover:bg-stone-100"
                } ${
                  hasMatch && !isCurrent ? "border-dashed border-stone-500" : ""
                }`}
                style={
                  isCurrent
                    ? { backgroundColor: "var(--studio-accent)" }
                    : undefined
                }
              >
                {formatEasternNumber(unit.unitNumber)}
                {unit.isEnrichment && (
                  <span
                    aria-hidden="true"
                    className="absolute end-0.5 top-0.5 size-1 rounded-full bg-amber-500"
                  />
                )}
              </button>

              <span
                role="tooltip"
                className="pointer-events-none absolute start-1/2 top-full z-30 mt-1 hidden w-max max-w-[14rem] -translate-x-1/2 rounded-lg border border-stone-200 bg-stone-900 px-2 py-1 text-[10px] font-bold leading-4 text-white shadow-lg group-hover:block group-focus-within:block"
              >
                {unit.titleAr} · {formatEasternNumber(unit.lessonRange[0])}–
                {formatEasternNumber(unit.lessonRange[1])}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default UnitSpine;
