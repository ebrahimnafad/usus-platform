import React from "react";
import type { ColorThemeId, VisualModelSpec } from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";
import { CANONICAL_SIZES_PX } from "@/components/worksheet/layout-standard";
import { AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { COLOR_PALETTES } from "@/visual-models/shapes-solids-coins";
import { registerVisualModel } from "@/visual-models/registry";

/**
 * Numtanga Grid — Grade K Unit 7 (WORKSHEET_CONSTITUTION.md §3.4).
 *
 * A triangular-pyramid grid puzzle (GLOSSARY.md → Numtanga, نمتنغا) where each
 * cell above holds the sum of the two adjacent cells below it. Blank cells are
 * the student's Answer Slots and are always solvable by pure addition, because
 * the bottom row stays given (K-81's only prerequisite is K-36 — no missing-part
 * subtraction yet).
 *
 * Canonical size: 324 × 212 px — exactly two fit the 660 px card width with the
 * 12 px column gap. Right-to-left reading (§9.3): each row fills right to left,
 * the first Part of every sum is the right-hand cell of the pair.
 *
 * Grayscale cue (ADR-0006): given cards use a solid stroke with a filled tint,
 * while blank cells use a dashed stroke with a white interior — in addition to
 * the dashed Answer Slot outline, so the page reads in grayscale.
 *
 * Unknown positions: only `midLeft`, `midRight`, and `top` can be blank.
 */

export type NumtangaGridCellKey =
  | "top"
  | "midRight"
  | "midLeft"
  | "bottomRight"
  | "bottomMiddle"
  | "bottomLeft";

export type NumtangaGridCells = Record<NumtangaGridCellKey, number>;

export interface NumtangaGridCell {
  value: number;
  blank: boolean;
}

const CELL_W = 92;
const CELL_H = 50;

/** Layout geometry: screen positions (top-left corner) per cell. */
const CELL_POS: Record<NumtangaGridCellKey, { x: number; y: number }> = {
  top: { x: 116, y: 2 },
  midRight: { x: 169, y: 79 },
  midLeft: { x: 63, y: 79 },
  bottomRight: { x: 222, y: 156 },
  bottomMiddle: { x: 116, y: 156 },
  bottomLeft: { x: 10, y: 156 },
};

const CONNECTORS: Array<[NumtangaGridCellKey, NumtangaGridCellKey]> = [
  ["bottomRight", "midRight"],
  ["bottomMiddle", "midRight"],
  ["bottomMiddle", "midLeft"],
  ["bottomLeft", "midLeft"],
  ["midRight", "top"],
  ["midLeft", "top"],
];

export interface NumtangaGridSpecOptions {
  cells: NumtangaGridCells;
  /** Upper cells the student must fill; defaults to none (fully given). */
  blanks?: NumtangaGridCellKey[];
  colorTheme?: ColorThemeId;
  labelAr?: string;
  id?: string;
}

export function createNumtangaGridSpec(
  options: NumtangaGridSpecOptions
): VisualModelSpec {
  const { cells, blanks = [], colorTheme = "coral", labelAr, id } = options;
  const blanksKey = [...blanks].sort().join("-");

  return {
    kind: "numtanga-grid",
    id:
      id ??
      `numtanga-grid-${blanks.length}-${blanksKey}-${cells.top}-${cells.midRight}-${cells.midLeft}-${cells.bottomRight}-${cells.bottomMiddle}-${cells.bottomLeft}-${colorTheme}`,
    labelAr: labelAr ?? "نمتنغا",
    colorTheme,
    count: cells.top,
    meta: {
      cells: Object.fromEntries(
        (Object.keys(cells) as NumtangaGridCellKey[]).map((key) => [
          key,
          {
            value: cells[key],
            blank: blanks.includes(key),
          } satisfies NumtangaGridCell,
        ])
      ),
      blanks,
      colorTheme,
    },
  };
}

export function NumtangaGridView({
  cells,
  blanks,
  solved = false,
  colorTheme = "coral",
}: {
  cells: Record<NumtangaGridCellKey, NumtangaGridCell>;
  blanks: NumtangaGridCellKey[];
  solved?: boolean;
  colorTheme?: ColorThemeId;
}): React.ReactElement {
  const boxW = CANONICAL_SIZES_PX.numtangaGridBox.width; // 324
  const boxH = CANONICAL_SIZES_PX.numtangaGridBox.height; // 212
  const palette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.sky;

  const connectorStart = (key: NumtangaGridCellKey) => ({
    x: CELL_POS[key].x + CELL_W / 2,
    y: CELL_POS[key].y,
  });
  const connectorEnd = (key: NumtangaGridCellKey) => ({
    x: CELL_POS[key].x + CELL_W / 2,
    y: CELL_POS[key].y + CELL_H,
  });

  return (
    <div
      className="relative inline-block shrink-0 select-none"
      style={{ width: `${boxW}px`, height: `${boxH}px` }}
      data-visual-model="numtanga-grid"
      data-direction="rtl"
      data-numtanga-blanks={formatEasternNumber(blanks.length)}
      aria-label="شبكة نمتنغا: كلّ مربّع أعلى هو مجموع القيمتين المتجاورتين تحته"
    >
      <svg
        width={boxW}
        height={boxH}
        viewBox={`0 0 ${boxW} ${boxH}`}
        fill="none"
        className="pointer-events-none absolute inset-0"
      >
        {/* Connectors from each adjacent pair up to its sum cell */}
        {CONNECTORS.map(([lower, upper]) => {
          const start = connectorStart(lower);
          const end = connectorEnd(upper);
          return (
            <line
              key={`${lower}-to-${upper}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          );
        })}

        {(Object.keys(CELL_POS) as NumtangaGridCellKey[]).map((key) => {
          const cell = cells[key];
          const { x, y } = CELL_POS[key];
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
                data-numtanga-cell={key}
                data-numtanga-blank-cell="true"
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
                data-numtanga-cell={key}
              />
              <text
                x={x + CELL_W / 2}
                y={y + 34}
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
        const { x, y } = CELL_POS[key];
        const cell = cells[key];
        return (
          <div
            key={key}
            data-numtanga-slot={key}
            className="absolute"
            style={{ left: `${x + 22}px`, top: `${y + 1}px` }}
          >
            <AnswerSlot
              solved={solved}
              answer={formatEasternNumber(cell.value)}
              ariaLabel={`مربع الإجابة في شبكة نمتنغا (${key})`}
              kind="unknown"
              tone={key === "top" ? "coral" : "indigo"}
              solvedDataAttributes={{
                "data-solved-numtanga-cell": key,
                "data-solved-numtanga-value": formatEasternNumber(cell.value),
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export function registerUnit7VisualModels(): void {
  registerVisualModel("numtanga-grid", ({ model, solved }) => {
    const meta = (model.meta ?? {}) as Record<string, unknown>;
    const cells =
      (meta.cells as Record<NumtangaGridCellKey, NumtangaGridCell>) ??
      ({} as Record<NumtangaGridCellKey, NumtangaGridCell>);
    const blanks = (meta.blanks as NumtangaGridCellKey[]) ?? [];
    const colorTheme = (meta.colorTheme as ColorThemeId) ?? model.colorTheme;

    return (
      <NumtangaGridView
        cells={cells}
        blanks={blanks}
        solved={solved}
        colorTheme={colorTheme}
      />
    );
  });
}

registerUnit7VisualModels();
