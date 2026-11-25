import React from "react";
import type { ColorThemeId, VisualModelSpec } from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";
import { registerVisualModel } from "@/visual-models/registry";
import { COLOR_PALETTES } from "@/visual-models/shapes-solids-coins";
import { CANONICAL_SIZES_PX } from "@/components/worksheet/layout-standard";

/**
 * Ten-Frame Grid Visual Model — Grade K Unit 10 (WORKSHEET_CONSTITUTION.md §3.4 & §10.1).
 *
 * Canonical size: 660 × 160 px (1-column only).
 * A 2×5 macro grid of 10 micro ten-frames (100 cells total).
 *
 * - RTL fill (§9.3): Macro frames fill right to left, top row then bottom row
 *   (frame 0 is top-right, frame 4 is top-left, frame 5 is bottom-right).
 *   Within each micro ten-frame, cells also fill RTL, top row (5) then bottom row (5).
 * - Grayscale cue (§2.5): filled counters vs. dashed empty frames & dashed ghost circles.
 * - Answer Key state (§8.2): dashed-border subitizing-group containers around active
 *   frames; ghost counters render as solid accent counters.
 * - Perception mode (§10.3): `group` — the child anchors to groups of 10 without
 *   counting individual cells.
 * - Unknown positions (§10.1): total digit below the grid; optionally complement
 *   to the next decade or Base-10 Nickname below.
 */

export interface TenFrameGridOptions {
  count: number;
  ghostTargetCount?: number;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  labelAr?: string;
}

export function createTenFrameGridSpec(
  options: TenFrameGridOptions
): VisualModelSpec {
  const count = Math.max(0, Math.min(100, options.count));
  const ghostTargetCount = Math.max(
    0,
    Math.min(100 - count, options.ghostTargetCount ?? 0)
  );
  const filledFrameCount = Math.floor(count / 10);
  const onesCount = count % 10;
  const countAr = formatEasternNumber(count);

  const defaultLabelAr =
    onesCount === 0
      ? `شبكة لوحات العشرة: ${formatEasternNumber(filledFrameCount)} عشرات (${countAr})`
      : `شبكة لوحات العشرة: ${formatEasternNumber(filledFrameCount)} عشرات و${formatEasternNumber(onesCount)} آحاد (${countAr})`;

  return {
    kind: "ten-frame-grid",
    id: `ten-frame-grid-${count}-g${ghostTargetCount}`,
    labelAr: options.labelAr ?? defaultLabelAr,
    colorTheme: options.colorTheme ?? "indigo",
    count,
    meta: {
      filledFrameCount,
      onesCount,
      ghostTargetCount,
      secondaryColorTheme: options.secondaryColorTheme ?? "emerald",
      perceptionMode: "group",
    },
  };
}

export function TenFrameGridSvg({
  count = 10,
  ghostTargetCount = 0,
  colorTheme = "indigo",
  secondaryColorTheme = "emerald",
  solved = false,
}: {
  count?: number;
  ghostTargetCount?: number;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  solved?: boolean;
}): React.ReactElement {
  const totalFilled = Math.max(0, Math.min(100, count));
  const ghostCount = Math.max(0, Math.min(100 - totalFilled, ghostTargetCount));
  const totalWithGhost = totalFilled + ghostCount;
  const filledFrameCount = Math.floor(totalFilled / 10);
  const onesCount = totalFilled % 10;
  const emptyFrameCount = 10 - Math.ceil(totalWithGhost / 10);

  const primaryPalette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.indigo;
  const ghostPalette =
    COLOR_PALETTES[secondaryColorTheme] ?? COLOR_PALETTES.emerald;

  const { width: svgWidth, height: svgHeight } =
    CANONICAL_SIZES_PX.tenFrameGridBox;

  const microCellW = 24;
  const microCellH = 26;
  const microW = microCellW * 5; // 120
  const microH = microCellH * 2; // 52
  const gapX = 12;
  const gapY = 16;
  const padX = (svgWidth - (5 * microW + 4 * gapX)) / 2; // 6
  const padY = (svgHeight - (2 * microH + gapY)) / 2; // 20

  const macroFrames = Array.from({ length: 10 }, (_, frameIdx) => {
    const macroRow = Math.floor(frameIdx / 5);
    const macroColRtl = frameIdx % 5; // 0 = rightmost
    const frameX = padX + (4 - macroColRtl) * (microW + gapX);
    const frameY = padY + macroRow * (microH + gapY);

    const frameStart = frameIdx * 10;
    const frameFilled = Math.max(0, Math.min(10, totalFilled - frameStart));
    const frameGhost = Math.max(
      0,
      Math.min(10 - frameFilled, totalWithGhost - frameStart - frameFilled)
    );
    const frameState: "full" | "partial" | "empty" =
      frameFilled === 10
        ? "full"
        : frameFilled > 0 || frameGhost > 0
          ? "partial"
          : "empty";

    return {
      frameIdx,
      frameX,
      frameY,
      frameFilled,
      frameGhost,
      frameState,
    };
  });

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      fill="none"
      aria-label={`شبكة لوحات العشرة: ${formatEasternNumber(totalFilled)}`}
      data-visual-model="ten-frame-grid"
      data-direction="rtl"
      data-perception-mode="group"
      data-filled-frames={String(filledFrameCount)}
      data-ones-count={String(onesCount)}
      data-empty-frames={String(emptyFrameCount)}
    >
      {macroFrames.map(
        ({ frameIdx, frameX, frameY, frameFilled, frameGhost, frameState }) => {
          const isEmpty = frameState === "empty";
          const hasContent = frameFilled > 0 || frameGhost > 0;

          return (
            <g
              key={frameIdx}
              data-macro-frame={String(frameIdx)}
              data-frame-state={frameState}
            >
              {/* AK subitizing-group container around active frames */}
              {solved && hasContent && (
                <rect
                  x={frameX - 4}
                  y={frameY - 4}
                  width={microW + 8}
                  height={microH + 8}
                  rx="9"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                  data-subitize-group-container="true"
                />
              )}

              {/* Micro Ten-Frame Box */}
              <rect
                x={frameX}
                y={frameY}
                width={microW}
                height={microH}
                rx="6"
                fill={isEmpty ? "#F8FAFC" : "#FFFFFF"}
                stroke={isEmpty ? "#94A3B8" : "#312E81"}
                strokeWidth={isEmpty ? "1.5" : "2"}
                strokeDasharray={isEmpty ? "4 3" : undefined}
              />

              {/* Horizontal row divider */}
              <line
                x1={frameX}
                y1={frameY + microCellH}
                x2={frameX + microW}
                y2={frameY + microCellH}
                stroke={isEmpty ? "#CBD5E1" : "#94A3B8"}
                strokeWidth="1"
                strokeDasharray={isEmpty ? "3 3" : undefined}
              />

              {/* 4 vertical column dividers */}
              {[1, 2, 3, 4].map((col) => (
                <line
                  key={col}
                  x1={frameX + col * microCellW}
                  y1={frameY}
                  x2={frameX + col * microCellW}
                  y2={frameY + microH}
                  stroke={isEmpty ? "#CBD5E1" : "#94A3B8"}
                  strokeWidth="1"
                  strokeDasharray={isEmpty ? "3 3" : undefined}
                />
              ))}

              {/* 10 micro cells (RTL: cell 0 is top-right) */}
              {Array.from({ length: 10 }, (_, cellIdx) => {
                const cellRow = Math.floor(cellIdx / 5);
                const cellColRtl = cellIdx % 5;
                const cx =
                  frameX + (4 - cellColRtl) * microCellW + microCellW / 2;
                const cy = frameY + cellRow * microCellH + microCellH / 2;

                const isFilled = cellIdx < frameFilled;
                const isGhost = !isFilled && cellIdx < frameFilled + frameGhost;

                if (isFilled || (isGhost && solved)) {
                  const palette = isFilled ? primaryPalette : ghostPalette;
                  return (
                    <g
                      key={cellIdx}
                      data-counter-state={isFilled ? "filled" : "filled-ghost"}
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r={8.5}
                        fill={palette.fill}
                        stroke={palette.stroke}
                        strokeWidth="1.5"
                      />
                      <circle
                        cx={cx - 2.5}
                        cy={cy - 2.5}
                        r={2}
                        fill="#FFFFFF"
                        opacity="0.55"
                      />
                    </g>
                  );
                }

                if (isGhost) {
                  return (
                    <circle
                      key={cellIdx}
                      cx={cx}
                      cy={cy}
                      r={8}
                      fill={ghostPalette.accent}
                      stroke={ghostPalette.fillDark}
                      strokeWidth="1.5"
                      strokeDasharray="2.5 2"
                      data-counter-state="ghost"
                    />
                  );
                }

                return null;
              })}
            </g>
          );
        }
      )}
    </svg>
  );
}

registerVisualModel("ten-frame-grid", ({ model, solved = false }) => {
  const meta = (model.meta ?? {}) as {
    ghostTargetCount?: number;
    secondaryColorTheme?: ColorThemeId;
  };
  return (
    <TenFrameGridSvg
      count={model.count ?? 10}
      ghostTargetCount={meta.ghostTargetCount ?? 0}
      colorTheme={model.colorTheme ?? "indigo"}
      secondaryColorTheme={meta.secondaryColorTheme ?? "emerald"}
      solved={solved}
    />
  );
});
