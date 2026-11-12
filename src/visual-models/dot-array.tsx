import React from "react";
import type { ColorThemeId, VisualModelSpec } from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";
import { registerVisualModel } from "@/visual-models/registry";
import { COLOR_PALETTES } from "@/visual-models/shapes-solids-coins";
import { CANONICAL_SIZES_PX } from "@/components/worksheet/layout-standard";

/**
 * Dot Array Visual Model — Grade K Unit 9 (WORKSHEET_CONSTITUTION.md §3.4).
 *
 * Canonical size: 212 × 160 px (3-column friendly).
 * A rectangular grid of uniform filled dots in rows and columns. Near arrays
 * leave one incomplete bottom row (the `gap` rightmost-to-leftmost empty cells
 * of the last row in RTL fill order).
 *
 * - RTL fill (§9.3): Dots fill right to left, top to bottom; column 0 is rightmost.
 * - Grayscale cue (§2.5): filled dots vs. dashed empty cells — never color alone.
 * - Answer Key state (§8.2): dashed-border subitizing-group containers (groups
 *   of 5) in the accent style, making "count by fives" strategies visible.
 * - Perception mode (§10.3): `perceive` — the array is grouped for direct
 *   recognition; the digit below is the only unknown position.
 */

export interface DotArraySpecOptions {
  rows: number;
  columns: number;
  /** Empty cells at the end of the bottom row (near array); 0 = complete array. */
  gap?: number;
  colorTheme?: ColorThemeId;
  labelAr?: string;
}

export function createDotArraySpec(
  options: DotArraySpecOptions
): VisualModelSpec {
  const rows = Math.max(1, Math.min(5, options.rows));
  const columns = Math.max(1, Math.min(10, options.columns));
  const gap = Math.max(0, Math.min(rows * columns - 1, options.gap ?? 0));
  const filledCount = rows * columns - gap;
  const countAr = formatEasternNumber(filledCount);
  const nearArray = gap > 0;

  const defaultLabelAr = nearArray
    ? `مصفوفة النقاط: ${countAr} نقطة (صفّ ناقص)`
    : `مصفوفة النقاط: ${countAr} نقطة`;

  return {
    kind: "dot-array",
    id: `dot-array-${rows}x${columns}${nearArray ? `-gap-${gap}` : ""}`,
    labelAr: options.labelAr ?? defaultLabelAr,
    colorTheme: options.colorTheme ?? "violet",
    count: filledCount,
    meta: {
      rows,
      columns,
      gap,
      filledCount,
      nearArray,
    },
  };
}

const BOX_WIDTH = CANONICAL_SIZES_PX.dotArrayBox.width;
const BOX_HEIGHT = CANONICAL_SIZES_PX.dotArrayBox.height;
const BOX_PAD = 14;
const GROUP_SIZE = 5;

function gridGeometry(columns: number, rows: number) {
  const cell = columns <= 6 ? 18 : columns <= 8 ? 15 : 13;
  const gapPx = columns <= 6 ? 7 : 5;
  const gridW = columns * cell + (columns - 1) * gapPx;
  const gridH = rows * cell + (rows - 1) * gapPx;
  const gridLeft = Math.max(BOX_PAD, (BOX_WIDTH - gridW) / 2);
  const gridTop = Math.max(BOX_PAD, (BOX_HEIGHT - gridH) / 2);
  // RTL: column 0 is rightmost.
  const cellX = (col: number): number =>
    gridLeft + (columns - 1 - col) * (cell + gapPx);
  const cellY = (row: number): number => gridTop + row * (cell + gapPx);
  return { cell, gapPx, gridW, gridH, gridLeft, gridTop, cellX, cellY };
}

export function DotArrayView({
  model,
  solved = false,
}: {
  model: VisualModelSpec;
  solved?: boolean;
}): React.ReactElement {
  const meta = (model.meta ?? {}) as Record<string, unknown>;
  const rows = (meta.rows as number | undefined) ?? 3;
  const columns = (meta.columns as number | undefined) ?? 5;
  const gap = (meta.gap as number | undefined) ?? 0;
  const filledCount =
    (meta.filledCount as number | undefined) ?? model.count ?? rows * columns;
  const colorTheme = model.colorTheme ?? "violet";
  const palette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.violet;
  const { cell, cellX, cellY } = gridGeometry(columns, rows);
  const box = CANONICAL_SIZES_PX.dotArrayBox;

  const totalCells = rows * columns;
  const cells = Array.from({ length: totalCells }, (_, i) => i);
  const groupCount = Math.ceil(filledCount / GROUP_SIZE);

  return (
    <div
      dir="rtl"
      data-visual-model="dot-array"
      data-direction="rtl"
      data-filled-count={formatEasternNumber(filledCount)}
      data-rows={formatEasternNumber(rows)}
      data-columns={formatEasternNumber(columns)}
      data-near-array={gap > 0 ? "true" : "false"}
      className="relative max-w-full min-w-0 rounded-xl border border-slate-200 bg-white shadow-2xs select-none"
      style={{ width: `${box.width}px` }}
    >
      {/* Answer Key: dashed subitizing-group containers (groups of 5) in accent style */}
      {solved &&
        Array.from({ length: groupCount }, (_, g) => {
          const start = g * GROUP_SIZE;
          const end = Math.min((g + 1) * GROUP_SIZE, filledCount);
          const positions = Array.from(
            { length: end - start },
            (_, k) => start + k
          ).map((i) => ({
            row: Math.floor(i / columns),
            col: i % columns,
          }));
          const minX = Math.min(...positions.map((p) => cellX(p.col)));
          const maxX = Math.max(...positions.map((p) => cellX(p.col))) + cell;
          const minY = Math.min(...positions.map((p) => cellY(p.row)));
          const maxY = Math.max(...positions.map((p) => cellY(p.row))) + cell;
          // Percentages of the box so the dashed containers track the grid
          // when the array scales down inside narrow columns.
          return (
            <div
              key={`group-${g}`}
              data-subitize-group="true"
              data-group-count={formatEasternNumber(end - start)}
              className="pointer-events-none absolute rounded-xl border-2 border-dashed border-emerald-600 bg-emerald-50/40"
              style={{
                left: `${((minX - 3) / BOX_WIDTH) * 100}%`,
                top: `${((minY - 3) / BOX_HEIGHT) * 100}%`,
                width: `${((maxX - minX + 6) / BOX_WIDTH) * 100}%`,
                height: `${((maxY - minY + 6) / BOX_HEIGHT) * 100}%`,
              }}
            />
          );
        })}

      {/* Dot grid */}
      <svg
        width={box.width}
        height={box.height}
        viewBox={`0 0 ${BOX_WIDTH} ${BOX_HEIGHT}`}
        fill="none"
        aria-label="مصفوفة النقاط"
        className="block h-auto w-full"
      >
        {cells.map((i) => {
          const row = Math.floor(i / columns);
          const col = i % columns;
          const isFilled = i < filledCount;
          const cx = cellX(col) + cell / 2;
          const cy = cellY(row) + cell / 2;
          return (
            <g
              key={`dot-${i}`}
              data-dot-r={formatEasternNumber(row + 1)}
              data-dot-c={formatEasternNumber(col + 1)}
              data-dot-filled={isFilled ? "true" : "false"}
            >
              {isFilled ? (
                <circle
                  cx={cx}
                  cy={cy}
                  r={cell / 2 - 1.5}
                  fill={palette.accent}
                  stroke={palette.stroke}
                  strokeWidth="1.6"
                />
              ) : (
                <circle
                  cx={cx}
                  cy={cy}
                  r={cell / 2 - 1.5}
                  fill="#F8FAFC"
                  stroke="#CBD5E1"
                  strokeWidth="1.4"
                  strokeDasharray="3 3"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// Self-register visual model
registerVisualModel("dot-array", ({ model, solved }) => {
  return <DotArrayView model={model} solved={solved} />;
});
