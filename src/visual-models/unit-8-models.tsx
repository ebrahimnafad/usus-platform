import React from "react";
import type { ColorThemeId, VisualModelSpec } from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";
import { CANONICAL_SIZES_PX } from "@/components/worksheet/layout-standard";
import { AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { COLOR_PALETTES } from "@/visual-models/shapes-solids-coins";
import { registerVisualModel } from "@/visual-models/registry";

/**
 * Digicross Grid — Grade K Unit 8 (WORKSHEET_CONSTITUTION.md §3.4).
 *
 * A 3×3 number grid puzzle (GLOSSARY.md → Digicross, ديجيكروس) where each row
 * and each column is a consecutive counting sequence (forward or backward by
 * 1). Blank cells are the student's Answer Slots; every grid carries exactly
 * one solution because the given cells pin down a single counting model
 * (g(r, c) = T + x·r + y·c with x, y ∈ {+1, −1}) that is brute-verified at
 * generation time.
 *
 * Canonical size: 324 × 212 px — exactly two fit the 660 px card width with
 * the 12 px column gap. Right-to-left reading (§9.3): column index 0 is the
 * rightmost column, so every row reads its sequence right to left, and every
 * column reads top to bottom.
 *
 * Grayscale cue (ADR-0006): given cells use a solid stroke with a filled tint,
 * while blank cells use a dashed stroke with a white interior — in addition to
 * the dashed Answer Slot outline, so the page reads in grayscale.
 */

export interface DigicrossGridCell {
  /** 0 = top row → 2 = bottom row. */
  row: number;
  /** 0 = rightmost column → 2 = leftmost column (RTL reading, §9.3). */
  col: number;
  value: number;
  blank: boolean;
}

export type DigicrossCellKey = string; // `${row}-${col}`

export interface DigicrossGridSpecOptions {
  cells: DigicrossGridCell[];
  /** Blank cell keys (`"r-c"`) the student must fill. */
  blanks?: DigicrossCellKey[];
  colorTheme?: ColorThemeId;
  labelAr?: string;
  id?: string;
}

const CELL_W = 94;
const CELL_H = 56;
const MARGIN_X = 12;
const MARGIN_Y = 13;
const GAP = 9;

/** Layout geometry: screen positions (top-left corner) per cell. Column 0 is rightmost. */
function cellPos(row: number, col: number): { x: number; y: number } {
  return {
    x: MARGIN_X + (2 - col) * (CELL_W + GAP),
    y: MARGIN_Y + row * (CELL_H + GAP),
  };
}

export function digicrossCellKey(cell: { row: number; col: number }): string {
  return `${cell.row}-${cell.col}`;
}

export function createDigicrossGridSpec(
  options: DigicrossGridSpecOptions
): VisualModelSpec {
  const { cells, blanks = [], colorTheme = "coral", labelAr, id } = options;

  const blankSet = new Set(blanks);
  const normalizedCells: DigicrossGridCell[] = cells.map((cell) => ({
    ...cell,
    blank: cell.blank || blankSet.has(digicrossCellKey(cell)),
  }));

  return {
    kind: "digicross-grid",
    id:
      id ??
      `digicross-grid-${normalizedCells
        .map((cell) => cell.value)
        .join("-")}-${[...blankSet].sort().join(",")}-${colorTheme}`,
    labelAr: labelAr ?? "شبكة ديجيكروس",
    colorTheme,
    meta: {
      cells: normalizedCells,
      blanks,
      colorTheme,
    },
  };
}

export function DigicrossGridView({
  cells,
  blanks,
  solved = false,
  colorTheme = "coral",
}: {
  cells: DigicrossGridCell[];
  blanks: DigicrossCellKey[];
  solved?: boolean;
  colorTheme?: ColorThemeId;
}): React.ReactElement {
  const boxW = CANONICAL_SIZES_PX.digicrossGridBox.width; // 324
  const boxH = CANONICAL_SIZES_PX.digicrossGridBox.height; // 212
  const palette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.sky;
  const cellByKey = new Map(
    cells.map((cell) => [digicrossCellKey(cell), cell])
  );

  return (
    <div
      className="relative inline-block shrink-0 select-none"
      style={{ width: `${boxW}px`, height: `${boxH}px` }}
      data-visual-model="digicross-grid"
      data-direction="rtl"
      data-digicross-blanks={formatEasternNumber(blanks.length)}
      aria-label="شبكة ديجيكروس: كلّ صفّ وكلّ عمود متتالية عدّ (١ أكثر أو ١ أقل)"
    >
      <svg
        width={boxW}
        height={boxH}
        viewBox={`0 0 ${boxW} ${boxH}`}
        fill="none"
        className="pointer-events-none absolute inset-0"
      >
        {cells.map((cell) => {
          const { x, y } = cellPos(cell.row, cell.col);
          const key = digicrossCellKey(cell);
          if (cell.blank) {
            return (
              <rect
                key={key}
                x={x}
                y={y}
                width={CELL_W}
                height={CELL_H}
                rx="14"
                fill="#FFFFFF"
                stroke={palette.fill}
                strokeWidth="2.5"
                strokeDasharray="6 5"
                data-digicross-cell={key}
                data-digicross-blank-cell={key}
              />
            );
          }
          return (
            <g key={key}>
              <rect
                x={x}
                y={y}
                width={CELL_W}
                height={CELL_H}
                rx="14"
                fill={palette.accent}
                stroke={palette.fill}
                strokeWidth="2.5"
                data-digicross-cell={key}
              />
              <text
                x={x + CELL_W / 2}
                y={y + 37}
                textAnchor="middle"
                fontSize="28"
                fontWeight="900"
                fill={palette.stroke}
              >
                {formatEasternNumber(cell.value)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Answer Slots for blank cells (؟ / solved digit), same 48×48 size on
          Worksheet and Answer Key (§8.1, §8.2) */}
      {blanks.map((key) => {
        const cell = cellByKey.get(key);
        if (!cell) return null;
        const { x, y } = cellPos(cell.row, cell.col);
        return (
          <div
            key={key}
            data-digicross-slot={key}
            className="absolute"
            style={{ left: `${x + 23}px`, top: `${y + 4}px` }}
          >
            <AnswerSlot
              solved={solved}
              answer={formatEasternNumber(cell.value)}
              ariaLabel={`مربع الإجابة في شبكة ديجيكروس (${key})`}
              kind="unknown"
              tone="indigo"
              solvedDataAttributes={{
                "data-solved-digicross-cell": key,
                "data-solved-digicross-value": formatEasternNumber(cell.value),
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export function registerUnit8VisualModels(): void {
  registerVisualModel("digicross-grid", ({ model, solved }) => {
    const meta = (model.meta ?? {}) as Record<string, unknown>;
    const cells =
      (meta.cells as DigicrossGridCell[]) ?? ([] as DigicrossGridCell[]);
    const blanks = (meta.blanks as DigicrossCellKey[]) ?? [];
    const colorTheme = (meta.colorTheme as ColorThemeId) ?? model.colorTheme;

    return (
      <DigicrossGridView
        cells={cells}
        blanks={blanks}
        solved={solved}
        colorTheme={colorTheme}
      />
    );
  });
}

registerUnit8VisualModels();
