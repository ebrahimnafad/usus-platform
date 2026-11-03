import React from "react";
import type {
  ColorThemeId,
  EverydayObjectId,
  VisualModelSpec,
  VisualSize,
} from "@/domain/types";
import { COLOR_PALETTES } from "@/visual-models/shapes-solids-coins";
import {
  EVERYDAY_OBJECT_CATALOG,
  EverydayObjectSvg,
  getEverydayObjectById,
} from "@/visual-models/everyday-objects";
import { registerVisualModel } from "@/visual-models/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export interface FiveFrameOptions {
  count: number;
  secondaryCount?: number;
  crossedOutCount?: number;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  highlightEmptySlots?: boolean;
  showPartOutline?: boolean;
  /** Number of ghost counters in worksheet mode that become solid in answer-key mode */
  ghostTargetCount?: number;
  labelAr?: string;
}

export function createFiveFrameSpec(
  options: FiveFrameOptions
): VisualModelSpec {
  const primary = Math.max(0, Math.min(5, options.count));
  const secondary = Math.max(
    0,
    Math.min(5 - primary, options.secondaryCount ?? 0)
  );
  const total = primary + secondary;
  const crossedOut = Math.max(0, Math.min(total, options.crossedOutCount ?? 0));
  const remaining = Math.max(0, total - crossedOut);

  const defaultLabelAr =
    crossedOut > 0
      ? `لوحة الخمسة: ${formatEasternNumber(total)} شُطب منها ${formatEasternNumber(
          crossedOut
        )} وبقي ${formatEasternNumber(remaining)}`
      : secondary > 0
        ? `لوحة الخمسة: ${formatEasternNumber(primary)} و${formatEasternNumber(
            secondary
          )} يساوي ${formatEasternNumber(total)}`
        : `لوحة الخمسة: ${formatEasternNumber(total)} من ٥`;

  return {
    kind: "five-frame",
    id: `five-frame-${primary}-${secondary}-${crossedOut}`,
    labelAr: options.labelAr ?? defaultLabelAr,
    colorTheme: options.colorTheme ?? "coral",
    count: primary,
    secondaryCount: secondary,
    crossedOutCount: crossedOut,
    meta: {
      secondaryColorTheme: options.secondaryColorTheme ?? "sky",
      highlightEmptySlots: options.highlightEmptySlots ?? true,
      showPartOutline: options.showPartOutline ?? secondary > 0,
      ghostTargetCount: options.ghostTargetCount ?? 0,
    },
  };
}

export function FiveFrameSvg({
  count = 1,
  secondaryCount = 0,
  crossedOutCount = 0,
  colorTheme = "coral",
  secondaryColorTheme = "sky",
  highlightEmptySlots = true,
  showPartOutline = false,
  ghostTargetCount = 0,
  solved = false,
}: {
  count?: number;
  secondaryCount?: number;
  crossedOutCount?: number;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  highlightEmptySlots?: boolean;
  showPartOutline?: boolean;
  ghostTargetCount?: number;
  solved?: boolean;
}): React.ReactElement {
  const primary = Math.max(0, Math.min(5, count));
  const secondary = Math.max(0, Math.min(5 - primary, secondaryCount));
  const totalFilled = primary + secondary;
  const crossedOut = Math.max(0, Math.min(totalFilled, crossedOutCount));
  const ghostCount = Math.max(0, Math.min(5 - totalFilled, ghostTargetCount));

  const primaryPalette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.coral;
  const secondaryPalette =
    COLOR_PALETTES[secondaryColorTheme] ?? COLOR_PALETTES.sky;

  const cellWidth = 42;
  const cellHeight = 44;
  const frameX = 12;
  const frameY = 14;
  const totalWidth = cellWidth * 5;

  // RTL cell ordering: cell index 0 is rightmost (x = frameX + 4 * cellWidth)
  const getRtlCellX = (rtlIndex: number): number =>
    frameX + (4 - rtlIndex) * cellWidth;

  return (
    <svg
      width="234"
      height="76"
      viewBox="0 0 234 76"
      fill="none"
      aria-label={`لوحة الخمسة: ${formatEasternNumber(totalFilled)}`}
      data-direction="rtl"
      data-primary-count={formatEasternNumber(primary)}
      data-secondary-count={formatEasternNumber(secondary)}
      data-crossed-out={formatEasternNumber(crossedOut)}
    >
      {/* Outer Frame Shadow & Background */}
      <rect
        x={frameX - 3}
        y={frameY - 3}
        width={totalWidth + 6}
        height={cellHeight + 6}
        rx="10"
        fill="#E0E7FF"
        stroke="#3730A3"
        strokeWidth="2.5"
      />
      <rect
        x={frameX}
        y={frameY}
        width={totalWidth}
        height={cellHeight}
        rx="7"
        fill="#FFFFFF"
        stroke="#312E81"
        strokeWidth="2"
      />

      {/* Dotted Part-Grouping Outlines when requested or when secondaryCount > 0 */}
      {(showPartOutline || secondary > 0) && primary > 0 && (
        <rect
          x={getRtlCellX(primary - 1) + 2}
          y={frameY - 7}
          width={primary * cellWidth - 4}
          height={cellHeight + 14}
          rx="9"
          fill="none"
          stroke={primaryPalette.stroke}
          strokeWidth="2"
          strokeDasharray="4 3"
          data-part-outline="primary"
        />
      )}
      {(showPartOutline || secondary > 0) && secondary > 0 && (
        <rect
          x={getRtlCellX(primary + secondary - 1) + 2}
          y={frameY - 7}
          width={secondary * cellWidth - 4}
          height={cellHeight + 14}
          rx="9"
          fill="none"
          stroke={secondaryPalette.stroke}
          strokeWidth="2"
          strokeDasharray="4 3"
          data-part-outline="secondary"
        />
      )}

      {/* 5 RTL Cells */}
      {[0, 1, 2, 3, 4].map((rtlIdx) => {
        const cellX = getRtlCellX(rtlIdx);
        const cx = cellX + cellWidth / 2;
        const cy = frameY + cellHeight / 2;

        const isPrimary = rtlIdx < primary;
        const isSecondary = rtlIdx >= primary && rtlIdx < totalFilled;
        const isGhost =
          !isPrimary &&
          !isSecondary &&
          rtlIdx >= totalFilled &&
          rtlIdx < totalFilled + ghostCount;
        const isFilled = isPrimary || isSecondary || (isGhost && solved);
        // Cross out from the left end of filled counters (taking away one by one)
        const isCrossedOut =
          (isPrimary || isSecondary) &&
          rtlIdx >= totalFilled - crossedOut &&
          rtlIdx < totalFilled;

        const activePalette = isSecondary ? secondaryPalette : primaryPalette;

        return (
          <g
            key={rtlIdx}
            data-rtl-cell={formatEasternNumber(rtlIdx + 1)}
            data-cell-state={
              isCrossedOut
                ? "crossed-out"
                : isFilled
                  ? "filled"
                  : isGhost
                    ? "ghost"
                    : "empty"
            }
          >
            {/* Vertical Cell Divider */}
            {rtlIdx < 4 && (
              <line
                x1={cellX}
                y1={frameY}
                x2={cellX}
                y2={frameY + cellHeight}
                stroke="#4338CA"
                strokeWidth="1.8"
              />
            )}

            {/* Small RTL cell index label in top-right corner */}
            <text
              x={cellX + cellWidth - 5}
              y={frameY + 10}
              textAnchor="end"
              fontSize="8.5"
              fontWeight="800"
              fill="#94A3B8"
            >
              {formatEasternNumber(rtlIdx + 1)}
            </text>

            {/* Empty-slot highlight */}
            {!isFilled && !isGhost && highlightEmptySlots && (
              <circle
                cx={cx}
                cy={cy}
                r="13"
                fill="#F8FAFC"
                stroke="#CBD5E1"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                data-empty-slot="true"
              />
            )}

            {/* Ghost counter for student drawing in worksheet mode */}
            {isGhost && !solved && (
              <circle
                cx={cx}
                cy={cy}
                r="14"
                fill={primaryPalette.accent}
                stroke={primaryPalette.fill}
                strokeWidth="2.2"
                strokeDasharray="4 3"
                data-ghost-counter="true"
              />
            )}

            {/* Filled 3D two-tone counter */}
            {isFilled && (
              <g
                data-counter-tone={isSecondary ? "secondary" : "primary"}
                {...(isGhost && solved
                  ? { "data-solved-counter": "true" }
                  : {})}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r="14.5"
                  fill={activePalette.fill}
                  stroke={activePalette.stroke}
                  strokeWidth="2.2"
                />
                {/* Inner ring for grayscale distinction (dashed on secondary tone) */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="9.5"
                  fill="none"
                  stroke={activePalette.fillLight}
                  strokeWidth="1.8"
                  strokeDasharray={isSecondary ? "3 2" : "none"}
                />
                {/* Specular highlight */}
                <circle
                  cx={cx - 4.5}
                  cy={cy - 4.5}
                  r="2.5"
                  fill={activePalette.accent}
                />
              </g>
            )}

            {/* Cross-out mark for zero / taking away */}
            {isCrossedOut && (
              <g data-crossed-out-cell="true">
                <line
                  x1={cx - 13}
                  y1={cy - 13}
                  x2={cx + 13}
                  y2={cy + 13}
                  stroke="#BE123C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <line
                  x1={cx + 13}
                  y1={cy - 13}
                  x2={cx - 13}
                  y2={cy + 13}
                  stroke="#BE123C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export interface NumeralTraceOptions {
  digit: number;
  colorTheme?: ColorThemeId;
  labelAr?: string;
}

const ARABIC_NUMBER_WORDS: Record<number, string> = {
  0: "صفر",
  1: "واحد",
  2: "اثنان",
  3: "ثلاثة",
  4: "أربعة",
  5: "خمسة",
  6: "ستة",
  7: "سبعة",
  8: "ثمانية",
  9: "تسعة",
};

export function getArabicNumberWord(n: number): string {
  return ARABIC_NUMBER_WORDS[n] ?? formatEasternNumber(n);
}

export function createNumeralTraceSpec(
  options: NumeralTraceOptions
): VisualModelSpec {
  const digit = Math.max(0, Math.min(9, options.digit));
  const digitAr = formatEasternNumber(digit);
  const wordAr = getArabicNumberWord(digit);
  return {
    kind: "numeral-trace",
    id: `numeral-trace-${digit}`,
    labelAr: options.labelAr ?? `تتبّع الرقم ${digitAr} (${wordAr})`,
    digit,
    count: digit,
    colorTheme: options.colorTheme ?? "indigo",
  };
}

interface DigitStrokeGuide {
  pathD: string;
  startX: number;
  startY: number;
  arrowPoints: string;
}

const DIGIT_STROKE_GUIDES: Record<number, DigitStrokeGuide> = {
  0: {
    // Eastern Arabic ٠ (diamond dot in middle zone)
    pathD: "M 44 25 L 54 35 L 44 45 L 34 35 Z",
    startX: 44,
    startY: 25,
    arrowPoints: "53,27 58,33 50,32",
  },
  1: {
    // Eastern Arabic ١ (vertical stroke top to bottom)
    pathD: "M 44 13 C 45 26, 44 41, 44 55",
    startX: 44,
    startY: 13,
    arrowPoints: "37,24 41,24 39,31",
  },
  2: {
    // Eastern Arabic ٢ (right-top cup curve then vertical stem down)
    pathD: "M 57 15 C 53 28, 39 28, 36 15 L 36 55",
    startX: 57,
    startY: 15,
    arrowPoints: "51,26 44,25 48,20",
  },
  3: {
    // Eastern Arabic ٣ (two top scallops from right to left then vertical stem down)
    pathD: "M 60 15 C 57 26, 49 26, 47 15 C 45 26, 37 26, 34 15 L 34 55",
    startX: 60,
    startY: 15,
    arrowPoints: "55,25 48,24 52,19",
  },
  4: {
    // Eastern Arabic ٤ (two stacked rightward open curves)
    pathD: "M 53 14 C 34 16, 34 33, 50 34 C 33 35, 33 52, 54 55",
    startX: 53,
    startY: 14,
    arrowPoints: "41,14 35,19 42,21",
  },
  5: {
    // Eastern Arabic ٥ (rounded teardrop loop)
    pathD: "M 44 16 C 60 22, 60 53, 44 53 C 28 53, 28 22, 44 16 Z",
    startX: 44,
    startY: 16,
    arrowPoints: "54,19 59,26 51,25",
  },
  6: {
    pathD: "M 32 16 L 52 16 L 52 55",
    startX: 32,
    startY: 16,
    arrowPoints: "40,11 47,14 40,17",
  },
  7: {
    pathD: "M 30 15 L 44 55 L 58 15",
    startX: 30,
    startY: 15,
    arrowPoints: "32,26 36,33 39,25",
  },
  8: {
    pathD: "M 30 55 L 44 15 L 58 55",
    startX: 30,
    startY: 55,
    arrowPoints: "32,43 36,35 39,44",
  },
  9: {
    pathD: "M 52 26 C 52 14, 34 14, 34 26 C 34 36, 52 36, 52 26 L 52 55",
    startX: 52,
    startY: 26,
    arrowPoints: "43,12 36,15 43,19",
  },
};

export function NumeralTraceSvg({
  digit = 1,
  solved = false,
  colorTheme = "indigo",
}: {
  digit?: number;
  solved?: boolean;
  colorTheme?: ColorThemeId;
}): React.ReactElement {
  const safeDigit = Math.max(0, Math.min(9, digit));
  const digitAr = formatEasternNumber(safeDigit);
  const guide = DIGIT_STROKE_GUIDES[safeDigit] ?? DIGIT_STROKE_GUIDES[1];
  const palette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.indigo;

  return (
    <svg
      width="88"
      height="72"
      viewBox="0 0 88 72"
      fill="none"
      aria-label={`تتبّع الرقم ${digitAr}`}
      data-digit={digitAr}
      data-traced={solved ? "true" : "false"}
    >
      {/* Ruled Handwriting Card Background */}
      <rect
        x="4"
        y="4"
        width="80"
        height="64"
        rx="12"
        fill={solved ? "#ECFDF5" : "#F8FAFC"}
        stroke={solved ? "#10B981" : "#CBD5E1"}
        strokeWidth="2"
      />

      {/* Top Ascender Line (Sky Blue) */}
      <line
        x1="10"
        y1="14"
        x2="78"
        y2="14"
        stroke="#93C5FD"
        strokeWidth="1.4"
      />
      {/* Dashed Midline (Amber/Slate) */}
      <line
        x1="10"
        y1="35"
        x2="78"
        y2="35"
        stroke="#CBD5E1"
        strokeWidth="1.4"
        strokeDasharray="4 4"
      />
      {/* Bottom Baseline (Rose/Red ruled baseline) */}
      <line x1="10" y1="56" x2="78" y2="56" stroke="#FDA4AF" strokeWidth="2" />

      {/* Soft Ghost Track Underneath */}
      <path
        d={guide.pathD}
        fill="none"
        stroke={solved ? "#A7F3D0" : "#E2E8F0"}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Main Numeral Stroke: Dotted in Worksheet, Solid in Answer Key */}
      <path
        d={guide.pathD}
        fill="none"
        stroke={solved ? "#059669" : palette.fillDark}
        strokeWidth={solved ? "5.5" : "3.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={solved ? "none" : "5 5"}
        data-trace-stroke={solved ? "solid" : "dotted"}
        {...(solved ? { "data-solved-trace": digitAr } : {})}
      />

      {/* Directional Arrow Guide */}
      <polygon
        points={guide.arrowPoints}
        fill="#F59E0B"
        stroke="#78350F"
        strokeWidth="1"
        data-direction-arrow="true"
      />

      {/* Starting Dot (نقطة البداية) */}
      <circle
        cx={guide.startX}
        cy={guide.startY}
        r="5"
        fill="#10B981"
        stroke="#064E3B"
        strokeWidth="1.8"
        data-start-dot="true"
      />

      {/* Corner Reference Numeral Badge */}
      <text
        x="18"
        y="27"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill={solved ? "#047857" : "#64748B"}
      >
        {digitAr}
      </text>
    </svg>
  );
}

// Register "five-frame"
export function registerFiveFrameVisualModel(): void {
  registerVisualModel("five-frame", ({ model, solved }) => {
    const meta = (model.meta ?? {}) as Record<string, unknown>;
    const primary = model.count ?? 1;
    const secondary = model.secondaryCount ?? 0;
    const crossedOut = model.crossedOutCount ?? 0;
    const total = Math.max(0, primary + secondary - crossedOut);

    return (
      <div
        className="inline-flex flex-col items-center gap-1"
        data-visual-model="five-frame"
        data-direction="rtl"
        data-count={formatEasternNumber(total)}
      >
        <FiveFrameSvg
          count={primary}
          secondaryCount={secondary}
          crossedOutCount={crossedOut}
          colorTheme={model.colorTheme ?? "coral"}
          secondaryColorTheme={
            (meta.secondaryColorTheme as ColorThemeId) ?? "sky"
          }
          highlightEmptySlots={(meta.highlightEmptySlots as boolean) ?? true}
          showPartOutline={(meta.showPartOutline as boolean) ?? secondary > 0}
          ghostTargetCount={(meta.ghostTargetCount as number) ?? 0}
          solved={solved}
        />
        <span className="text-xs font-bold text-slate-700">
          {toEasternArabicNumerals(model.labelAr)}
        </span>
      </div>
    );
  });
}

// Register "numeral-trace"
export function registerNumeralTraceVisualModel(): void {
  registerVisualModel("numeral-trace", ({ model, solved }) => {
    const digit = model.digit ?? model.count ?? 1;
    return (
      <div
        className="inline-flex flex-col items-center gap-1"
        data-visual-model="numeral-trace"
        data-digit={formatEasternNumber(digit)}
      >
        <NumeralTraceSvg
          digit={digit}
          solved={solved}
          colorTheme={model.colorTheme ?? "indigo"}
        />
        <span className="text-[11px] font-bold text-slate-700">
          {toEasternArabicNumerals(model.labelAr)}
        </span>
      </div>
    );
  });
}

export interface SnapCubesOptions {
  count: number;
  secondaryCount?: number;
  separated?: boolean;
  orientation?: "horizontal" | "vertical";
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  labelAr?: string;
}

export function createSnapCubesSpec(
  options: SnapCubesOptions
): VisualModelSpec {
  const primary = Math.max(1, Math.min(5, options.count));
  const secondary = Math.max(
    0,
    Math.min(5 - primary, options.secondaryCount ?? 0)
  );
  const total = primary + secondary;
  const separated = options.separated ?? false;
  const orientation = options.orientation ?? "horizontal";

  const defaultLabelAr =
    separated && secondary > 0
      ? `مكعبات مفكوكة: ${formatEasternNumber(primary)} و${formatEasternNumber(
          secondary
        )} (الكل ${formatEasternNumber(total)})`
      : secondary > 0
        ? `قطار مكعبات متداخلة: ${formatEasternNumber(
            primary
          )} و${formatEasternNumber(secondary)} يساوي ${formatEasternNumber(total)}`
        : `مكعبات متداخلة: ${formatEasternNumber(total)}`;

  return {
    kind: "snap-cubes",
    id: `snap-cubes-${primary}-${secondary}-${separated ? "sep" : "joined"}-${orientation}`,
    labelAr: options.labelAr ?? defaultLabelAr,
    colorTheme: options.colorTheme ?? "emerald",
    count: primary,
    secondaryCount: secondary,
    meta: {
      separated,
      orientation,
      secondaryColorTheme: options.secondaryColorTheme ?? "amber",
    },
  };
}

export function SnapCubesSvg({
  count = 1,
  secondaryCount = 0,
  separated = false,
  orientation = "horizontal",
  colorTheme = "emerald",
  secondaryColorTheme = "amber",
}: {
  count?: number;
  secondaryCount?: number;
  separated?: boolean;
  orientation?: "horizontal" | "vertical";
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
}): React.ReactElement {
  const primary = Math.max(1, Math.min(5, count));
  const secondary = Math.max(0, Math.min(5 - primary, secondaryCount));
  const total = primary + secondary;

  const primaryPalette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.emerald;
  const secondaryPalette =
    COLOR_PALETTES[secondaryColorTheme] ?? COLOR_PALETTES.amber;

  if (orientation === "vertical") {
    const cubeSize = 26;
    const gap = separated && secondary > 0 ? 14 : 0;
    const svgHeight = Math.max(76, total * cubeSize + gap + 24);
    const baseX = 28;
    const bottomY = svgHeight - 12;

    return (
      <svg
        width="88"
        height={svgHeight}
        viewBox={`0 0 88 ${svgHeight}`}
        fill="none"
        aria-label={`برج مكعبات: ${formatEasternNumber(total)}`}
        data-separated={separated ? "true" : "false"}
        data-orientation="vertical"
      >
        {Array.from({ length: total }, (_, idx) => {
          const isSecondary = idx >= primary;
          const extraGap = isSecondary && separated ? gap : 0;
          const y = bottomY - (idx + 1) * cubeSize - extraGap;
          const pal = isSecondary ? secondaryPalette : primaryPalette;

          return (
            <g key={idx} data-cube-index={formatEasternNumber(idx + 1)}>
              {/* Top 3D skew face */}
              <polygon
                points={`${baseX},${y} ${baseX + 8},${y - 7} ${
                  baseX + cubeSize + 8
                },${y - 7} ${baseX + cubeSize},${y}`}
                fill={pal.fillLight}
                stroke={pal.stroke}
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              {/* Right 3D skew face */}
              <polygon
                points={`${baseX + cubeSize},${y} ${
                  baseX + cubeSize + 8
                },${y - 7} ${baseX + cubeSize + 8},${y + cubeSize - 7} ${
                  baseX + cubeSize
                },${y + cubeSize}`}
                fill={pal.fillDark}
                stroke={pal.stroke}
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              {/* Front square face */}
              <rect
                x={baseX}
                y={y}
                width={cubeSize}
                height={cubeSize}
                fill={pal.fill}
                stroke={pal.stroke}
                strokeWidth="2"
              />
              {/* Interlocking stud on top */}
              <rect
                x={baseX + 9}
                y={y - 5}
                width="8"
                height="4"
                rx="1.5"
                fill={pal.fill}
                stroke={pal.stroke}
                strokeWidth="1.4"
              />
              {/* Center circular dimple */}
              <circle
                cx={baseX + cubeSize / 2}
                cy={y + cubeSize / 2}
                r="4.5"
                fill={pal.fillLight}
                stroke={pal.stroke}
                strokeWidth="1.2"
              />
            </g>
          );
        })}
      </svg>
    );
  }

  // Horizontal RTL cube train: cube 1 starts on the right and extends left
  const cubeW = 32;
  const cubeH = 32;
  const splitGap = separated && secondary > 0 ? 22 : 0;
  const totalTrainWidth = total * cubeW + splitGap;
  const svgWidth = Math.max(150, totalTrainWidth + 34);
  const startRightX = svgWidth - 18;
  const baseY = 22;

  return (
    <svg
      width={svgWidth}
      height="68"
      viewBox={`0 0 ${svgWidth} 68`}
      fill="none"
      aria-label={`قطار مكعبات متداخلة: ${formatEasternNumber(total)}`}
      data-separated={separated ? "true" : "false"}
      data-orientation="horizontal"
    >
      {/* Render from left to right in painter's order so right faces layer cleanly */}
      {Array.from({ length: total }, (_, revIdx) => {
        const idx = total - 1 - revIdx; // RTL index (0 is rightmost)
        const isSecondary = idx >= primary;
        const gapOffset = isSecondary && separated ? splitGap : 0;
        const x = startRightX - (idx + 1) * cubeW - gapOffset;
        const pal = isSecondary ? secondaryPalette : primaryPalette;

        return (
          <g key={idx} data-cube-index={formatEasternNumber(idx + 1)}>
            {/* Top 3D skew face */}
            <polygon
              points={`${x},${baseY} ${x + 8},${baseY - 8} ${
                x + cubeW + 8
              },${baseY - 8} ${x + cubeW},${baseY}`}
              fill={pal.fillLight}
              stroke={pal.stroke}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Right 3D skew face */}
            <polygon
              points={`${x + cubeW},${baseY} ${x + cubeW + 8},${
                baseY - 8
              } ${x + cubeW + 8},${baseY + cubeH - 8} ${x + cubeW},${
                baseY + cubeH
              }`}
              fill={pal.fillDark}
              stroke={pal.stroke}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Front face */}
            <rect
              x={x}
              y={baseY}
              width={cubeW}
              height={cubeH}
              rx="2"
              fill={pal.fill}
              stroke={pal.stroke}
              strokeWidth="2"
            />
            {/* Left interlocking peg (stud) */}
            <rect
              x={x - 5}
              y={baseY + 10}
              width="5"
              height="12"
              rx="1.5"
              fill={pal.fillDark}
              stroke={pal.stroke}
              strokeWidth="1.5"
            />
            {/* Center stud recess & RTL cube count number */}
            <circle
              cx={x + cubeW / 2}
              cy={baseY + cubeH / 2}
              r="9"
              fill={pal.accent}
              stroke={pal.stroke}
              strokeWidth="1.3"
            />
            <text
              x={x + cubeW / 2}
              y={baseY + cubeH / 2 + 4}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="900"
              fill={pal.stroke}
            >
              {formatEasternNumber(idx + 1)}
            </text>
          </g>
        );
      })}

      {/* Unsnapped separation indicator line when separated === true */}
      {separated && secondary > 0 && (
        <g data-unsnapped-indicator="true">
          <line
            x1={startRightX - primary * cubeW - splitGap / 2}
            y1={baseY - 10}
            x2={startRightX - primary * cubeW - splitGap / 2}
            y2={baseY + cubeH + 6}
            stroke="#6366F1"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
        </g>
      )}
    </svg>
  );
}

// Register "snap-cubes"
export function registerSnapCubesVisualModel(): void {
  registerVisualModel("snap-cubes", ({ model }) => {
    const meta = (model.meta ?? {}) as Record<string, unknown>;
    const primary = model.count ?? 1;
    const secondary = model.secondaryCount ?? 0;
    const separated = Boolean(meta.separated);
    const orientation =
      (meta.orientation as "horizontal" | "vertical") ?? "horizontal";
    const total = primary + secondary;

    return (
      <div
        className="inline-flex flex-col items-center gap-1"
        data-visual-model="snap-cubes"
        data-count={formatEasternNumber(total)}
        data-separated={separated ? "true" : "false"}
        data-orientation={orientation}
      >
        <SnapCubesSvg
          count={primary}
          secondaryCount={secondary}
          separated={separated}
          orientation={orientation}
          colorTheme={model.colorTheme ?? "emerald"}
          secondaryColorTheme={
            (meta.secondaryColorTheme as ColorThemeId) ?? "amber"
          }
        />
        <span className="text-xs font-bold text-slate-700">
          {toEasternArabicNumerals(model.labelAr)}
        </span>
      </div>
    );
  });
}

export type TallyMarksVariant = "tally" | "sticks" | "tally-and-sticks";

export interface TallyMarksOptions {
  count: number;
  variant?: TallyMarksVariant;
  colorTheme?: ColorThemeId;
  labelAr?: string;
}

export function createTallyMarksSpec(
  options: TallyMarksOptions
): VisualModelSpec {
  const count = Math.max(1, Math.min(5, options.count));
  const variant = options.variant ?? "tally";
  const countAr = formatEasternNumber(count);

  const defaultLabelAr =
    variant === "sticks"
      ? `أعواد عدّ ملوّنة: ${countAr}`
      : count === 5
        ? `إشارات العدّ: حزمة خماسية (${countAr})`
        : `إشارات العدّ: ${countAr}`;

  return {
    kind: "tally-marks",
    id: `tally-marks-${count}-${variant}`,
    labelAr: options.labelAr ?? defaultLabelAr,
    colorTheme: options.colorTheme ?? "amber",
    count,
    meta: {
      variant,
    },
  };
}

export function TallyMarksSvg({
  count = 1,
  variant = "tally",
  colorTheme = "amber",
}: {
  count?: number;
  variant?: TallyMarksVariant;
  colorTheme?: ColorThemeId;
}): React.ReactElement {
  const safeCount = Math.max(1, Math.min(5, count));
  const verticalCount = Math.min(4, safeCount);
  const hasFifthSlash = safeCount >= 5;
  const palette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.amber;

  const showSticks = variant === "sticks" || variant === "tally-and-sticks";
  const showTally = variant === "tally" || variant === "tally-and-sticks";
  const svgWidth = variant === "tally-and-sticks" ? 210 : 124;

  // RTL vertical positions for the 4 vertical strokes (right to left)
  const tallyBaseRightX = variant === "tally-and-sticks" ? 190 : 98;
  const spacing = 18;

  return (
    <svg
      width={svgWidth}
      height="68"
      viewBox={`0 0 ${svgWidth} 68`}
      fill="none"
      aria-label={`إشارات العدّ: ${formatEasternNumber(safeCount)}`}
      data-has-fifth-slash={hasFifthSlash ? "true" : "false"}
      data-variant={variant}
    >
      {/* Background Board */}
      <rect
        x="4"
        y="4"
        width={svgWidth - 8}
        height="60"
        rx="12"
        fill="#FFFBEB"
        stroke="#F59E0B"
        strokeWidth="2"
      />

      {/* Pictorial Tally Marks (١–٤ vertical + ٥ diagonal slash) */}
      {showTally && (
        <g data-tally-bundle="true">
          {Array.from({ length: verticalCount }, (_, idx) => {
            const x = tallyBaseRightX - idx * spacing;
            return (
              <g key={idx}>
                <line
                  x1={x}
                  y1="14"
                  x2={x}
                  y2="54"
                  stroke={palette.stroke}
                  strokeWidth="6"
                  strokeLinecap="round"
                  data-tally-stroke="vertical"
                />
                <line
                  x1={x}
                  y1="15"
                  x2={x}
                  y2="53"
                  stroke={palette.fill}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </g>
            );
          })}

          {hasFifthSlash && (
            <g>
              <line
                x1={tallyBaseRightX + 9}
                y1="20"
                x2={tallyBaseRightX - 3 * spacing - 9}
                y2="48"
                stroke="#991B1B"
                strokeWidth="6.5"
                strokeLinecap="round"
                data-tally-stroke="fifth-slash"
              />
              <line
                x1={tallyBaseRightX + 9}
                y1="20"
                x2={tallyBaseRightX - 3 * spacing - 9}
                y2="48"
                stroke="#EF4444"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      )}

      {/* Concrete Craft Sticks / Straws (أعواد ومصاصات العدّ) */}
      {showSticks && (
        <g data-craft-sticks="true">
          {Array.from({ length: safeCount }, (_, idx) => {
            const stickRightX = variant === "tally-and-sticks" ? 92 : 98;
            const x = stickRightX - idx * 17;
            const stickColors = [
              "#0EA5E9",
              "#10B981",
              "#F43F5E",
              "#8B5CF6",
              "#F59E0B",
            ];
            const fillCol = stickColors[idx % stickColors.length];
            const isFifthBundled = idx === 4 && variant === "sticks";

            return isFifthBundled ? (
              <g key={idx}>
                <line
                  x1={stickRightX + 7}
                  y1="22"
                  x2={stickRightX - 3 * 17 - 7}
                  y2="46"
                  stroke="#0F172A"
                  strokeWidth="6"
                  strokeLinecap="round"
                  data-tally-stroke="fifth-slash"
                />
                <line
                  x1={stickRightX + 7}
                  y1="22"
                  x2={stickRightX - 3 * 17 - 7}
                  y2="46"
                  stroke={fillCol}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                />
              </g>
            ) : (
              <g key={idx} data-tally-stroke="vertical">
                <rect
                  x={x - 3}
                  y="13"
                  width="6.5"
                  height="42"
                  rx="3.2"
                  fill={fillCol}
                  stroke="#1E293B"
                  strokeWidth="1.5"
                />
                <line
                  x1={x - 2}
                  y1="23"
                  x2={x + 2}
                  y2="21"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <line
                  x1={x - 2}
                  y1="37"
                  x2={x + 2}
                  y2="35"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}

// Register "tally-marks"
export function registerTallyMarksVisualModel(): void {
  registerVisualModel("tally-marks", ({ model }) => {
    const meta = (model.meta ?? {}) as Record<string, unknown>;
    const count = model.count ?? 1;
    const variant = (meta.variant as TallyMarksVariant) ?? "tally";

    return (
      <div
        className="inline-flex flex-col items-center gap-1"
        data-visual-model="tally-marks"
        data-count={formatEasternNumber(count)}
        data-has-fifth-slash={count >= 5 ? "true" : "false"}
      >
        <TallyMarksSvg
          count={count}
          variant={variant}
          colorTheme={model.colorTheme ?? "amber"}
        />
        <span className="text-xs font-bold text-slate-700">
          {toEasternArabicNumerals(model.labelAr)}
        </span>
      </div>
    );
  });
}

export type DicePatternVariant = "die" | "domino";

export interface DicePatternOptions {
  count: number;
  secondaryCount?: number;
  diceVariant?: DicePatternVariant;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  labelAr?: string;
}

export function createDicePatternSpec(
  options: DicePatternOptions
): VisualModelSpec {
  const primary = Math.max(0, Math.min(5, options.count));
  const secondary = Math.max(
    0,
    Math.min(5 - primary, options.secondaryCount ?? 0)
  );
  const total = Math.max(1, primary + secondary);
  const diceVariant = options.diceVariant ?? "die";

  const defaultLabelAr =
    diceVariant === "domino"
      ? `بطاقة دومينو: ${formatEasternNumber(primary)} و${formatEasternNumber(
          secondary
        )} يساوي ${formatEasternNumber(total)}`
      : secondary > 0
        ? `وجه النرد (${formatEasternNumber(total)}): ${formatEasternNumber(
            primary
          )} و${formatEasternNumber(secondary)}`
        : `وجه النرد: ${formatEasternNumber(total)}`;

  return {
    kind: "dice-pattern",
    id: `dice-pattern-${primary}-${secondary}-${diceVariant}`,
    labelAr: options.labelAr ?? defaultLabelAr,
    colorTheme: options.colorTheme ?? "coral",
    count: primary,
    secondaryCount: secondary,
    meta: {
      diceVariant,
      secondaryColorTheme: options.secondaryColorTheme ?? "sky",
    },
  };
}

const DIE_DOT_COORDS: Record<number, Array<[number, number]>> = {
  0: [],
  1: [[34, 34]],
  2: [
    [48, 20],
    [20, 48],
  ],
  3: [
    [50, 18],
    [18, 50],
    [34, 34], // 3rd dot in center ("2 and 1 more")
  ],
  4: [
    [48, 20],
    [48, 48],
    [20, 20],
    [20, 48],
  ],
  5: [
    [50, 18],
    [50, 50],
    [18, 18],
    [18, 50],
    [34, 34], // 5th dot in middle ("4 plus 1 more in the middle")
  ],
};

export function DicePatternSvg({
  count = 1,
  secondaryCount = 0,
  diceVariant = "die",
  colorTheme = "coral",
  secondaryColorTheme = "sky",
}: {
  count?: number;
  secondaryCount?: number;
  diceVariant?: DicePatternVariant;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
}): React.ReactElement {
  const primary = Math.max(0, Math.min(5, count));
  const secondary = Math.max(0, Math.min(5 - primary, secondaryCount));
  const total = Math.max(1, Math.min(5, primary + secondary));

  const primaryPalette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.coral;
  const secondaryPalette =
    COLOR_PALETTES[secondaryColorTheme] ?? COLOR_PALETTES.sky;

  if (diceVariant === "domino") {
    const rightCoords = DIE_DOT_COORDS[primary] ?? [];
    const leftCoords = DIE_DOT_COORDS[secondary] ?? [];

    return (
      <svg
        width="140"
        height="68"
        viewBox="0 0 140 68"
        fill="none"
        aria-label={`دومينو: ${formatEasternNumber(total)}`}
        data-variant="domino"
      >
        {/* Domino Outer Tile */}
        <rect
          x="6"
          y="4"
          width="128"
          height="60"
          rx="12"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="2.5"
        />
        {/* Center Divider Line */}
        <line
          x1="70"
          y1="10"
          x2="70"
          y2="58"
          stroke="#475569"
          strokeWidth="2.2"
        />
        {/* Right Half Dots (Primary Part in RTL) */}
        {rightCoords.map(([cx, cy], idx) => (
          <g key={`r-${idx}`} data-dot-group="primary">
            <circle
              cx={cx + 68}
              cy={cy}
              r="5.8"
              fill={primaryPalette.fill}
              stroke={primaryPalette.stroke}
              strokeWidth="1.8"
            />
          </g>
        ))}
        {/* Left Half Dots (Secondary Part in RTL) */}
        {leftCoords.map(([cx, cy], idx) => (
          <g key={`l-${idx}`} data-dot-group="secondary">
            <circle
              cx={cx}
              cy={cy}
              r="5.8"
              fill={secondaryPalette.fill}
              stroke={secondaryPalette.stroke}
              strokeWidth="1.8"
              strokeDasharray="2 1"
            />
          </g>
        ))}
      </svg>
    );
  }

  const coords = DIE_DOT_COORDS[total] ?? DIE_DOT_COORDS[1];
  // Color-group dots for subitizing: if secondary > 0, first `primary` dots use primaryPalette, remaining use secondaryPalette
  const effectivePrimaryCount = secondary > 0 ? primary : total;

  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      aria-label={`وجه النرد: ${formatEasternNumber(total)}`}
      data-variant="die"
    >
      {/* 3D Die Shadow & Face */}
      <rect x="7" y="7" width="56" height="56" rx="14" fill="#CBD5E1" />
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="14"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="2.5"
      />
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="10"
        fill="#F8FAFC"
        stroke="#E2E8F0"
        strokeWidth="1.4"
      />

      {coords.map(([cx, cy], idx) => {
        const isSecondaryDot = idx >= effectivePrimaryCount;
        const pal = isSecondaryDot ? secondaryPalette : primaryPalette;
        // Adjust coordinates slightly inside the 56x56 face (center at 32,32)
        const px = cx - 2;
        const py = cy - 2;

        return (
          <g
            key={idx}
            data-dot-group={isSecondaryDot ? "secondary" : "primary"}
          >
            <circle
              cx={px}
              cy={py}
              r="6.2"
              fill={pal.fill}
              stroke={pal.stroke}
              strokeWidth="1.8"
            />
            {isSecondaryDot && (
              <circle cx={px} cy={py} r="3.2" fill={pal.accent} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// Register "dice-pattern"
export function registerDicePatternVisualModel(): void {
  registerVisualModel("dice-pattern", ({ model }) => {
    const meta = (model.meta ?? {}) as Record<string, unknown>;
    const primary = model.count ?? 1;
    const secondary = model.secondaryCount ?? 0;
    const total = Math.max(1, primary + secondary);
    const diceVariant = (meta.diceVariant as DicePatternVariant) ?? "die";

    return (
      <div
        className="inline-flex flex-col items-center gap-1"
        data-visual-model="dice-pattern"
        data-count={formatEasternNumber(total)}
        data-variant={diceVariant}
      >
        <DicePatternSvg
          count={primary}
          secondaryCount={secondary}
          diceVariant={diceVariant}
          colorTheme={model.colorTheme ?? "coral"}
          secondaryColorTheme={
            (meta.secondaryColorTheme as ColorThemeId) ?? "sky"
          }
        />
        <span className="text-xs font-bold text-slate-700">
          {toEasternArabicNumerals(model.labelAr)}
        </span>
      </div>
    );
  });
}

export interface CircularArrangementOptions {
  count: number;
  secondaryCount?: number;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  itemMotif?: "star" | "flower" | "apple" | "gem";
  labelAr?: string;
}

export function createCircularArrangementSpec(
  options: CircularArrangementOptions
): VisualModelSpec {
  const primary = Math.max(1, Math.min(5, options.count));
  const secondary = Math.max(
    0,
    Math.min(5 - primary, options.secondaryCount ?? 0)
  );
  const total = primary + secondary;
  const itemMotif = options.itemMotif ?? "star";

  const defaultLabelAr =
    secondary > 0
      ? `ترتيب دائري (${formatEasternNumber(total)}): ${formatEasternNumber(
          primary
        )} و${formatEasternNumber(secondary)}`
      : `ترتيب دائري: ${formatEasternNumber(total)} عناصر`;

  return {
    kind: "circular-arrangement",
    id: `circular-${primary}-${secondary}-${itemMotif}`,
    labelAr: options.labelAr ?? defaultLabelAr,
    colorTheme: options.colorTheme ?? "violet",
    count: primary,
    secondaryCount: secondary,
    meta: {
      secondaryColorTheme: options.secondaryColorTheme ?? "amber",
      itemMotif,
    },
  };
}

export function CircularArrangementSvg({
  count = 3,
  secondaryCount = 0,
  colorTheme = "violet",
  secondaryColorTheme = "amber",
  itemMotif = "star",
}: {
  count?: number;
  secondaryCount?: number;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  itemMotif?: "star" | "flower" | "apple" | "gem";
}): React.ReactElement {
  const primary = Math.max(1, Math.min(5, count));
  const secondary = Math.max(0, Math.min(5 - primary, secondaryCount));
  const total = Math.max(1, Math.min(5, primary + secondary));

  const primaryPalette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.violet;
  const secondaryPalette =
    COLOR_PALETTES[secondaryColorTheme] ?? COLOR_PALETTES.amber;

  const centerX = 48;
  const centerY = 46;
  const radius = 26;

  return (
    <svg
      width="96"
      height="90"
      viewBox="0 0 96 90"
      fill="none"
      aria-label={`ترتيب دائري: ${formatEasternNumber(total)}`}
      data-count={formatEasternNumber(total)}
    >
      {/* Outer Soft Ring Backdrop */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius + 11}
        fill="#F5F3FF"
        stroke="#DDD6FE"
        strokeWidth="1.5"
      />

      {/* Dashed Circular Track Guide */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="#6366F1"
        strokeWidth="2.2"
        strokeDasharray="5 4"
        data-circular-track="true"
      />

      {/* Center Hub Dot */}
      <circle cx={centerX} cy={centerY} r="3.5" fill="#CBD5E1" />

      {/* Starting Flag / Arrow at Top (12 o'clock) */}
      <g data-start-marker="true">
        <polygon
          points="48,3 43,10 53,10"
          fill="#10B981"
          stroke="#064E3B"
          strokeWidth="1.2"
        />
      </g>

      {/* Evenly Spaced Items Around the Circle */}
      {Array.from({ length: total }, (_, idx) => {
        const angleRad = -Math.PI / 2 + (idx * 2 * Math.PI) / total;
        const x = Math.round((centerX + radius * Math.cos(angleRad)) * 10) / 10;
        const y = Math.round((centerY + radius * Math.sin(angleRad)) * 10) / 10;

        const isSecondary = idx >= primary;
        const pal = isSecondary ? secondaryPalette : primaryPalette;

        return (
          <g
            key={idx}
            data-circle-item-index={formatEasternNumber(idx + 1)}
            data-circle-part={isSecondary ? "secondary" : "primary"}
          >
            {/* Outer Badge Disc */}
            <circle
              cx={x}
              cy={y}
              r="10.5"
              fill={pal.fill}
              stroke={pal.stroke}
              strokeWidth={idx === 0 ? "2.6" : "1.8"}
            />
            {/* Inner Motif Ring / Diamond */}
            {itemMotif === "gem" || isSecondary ? (
              <polygon
                points={`${x},${y - 6.5} ${x + 6.5},${y} ${x},${y + 6.5} ${
                  x - 6.5
                },${y}`}
                fill={pal.accent}
                stroke={pal.stroke}
                strokeWidth="1"
              />
            ) : (
              <circle cx={x} cy={y} r="6.5" fill={pal.accent} />
            )}
            {/* Eastern Arabic Number Label Inside Each Circular Node */}
            <text
              x={x}
              y={y + 3.5}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="900"
              fill={pal.stroke}
            >
              {formatEasternNumber(idx + 1)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Register "circular-arrangement"
export function registerCircularArrangementVisualModel(): void {
  registerVisualModel("circular-arrangement", ({ model }) => {
    const meta = (model.meta ?? {}) as Record<string, unknown>;
    const primary = model.count ?? 1;
    const secondary = model.secondaryCount ?? 0;
    const total = Math.max(1, primary + secondary);

    return (
      <div
        className="inline-flex flex-col items-center gap-1"
        data-visual-model="circular-arrangement"
        data-count={formatEasternNumber(total)}
      >
        <CircularArrangementSvg
          count={primary}
          secondaryCount={secondary}
          colorTheme={model.colorTheme ?? "violet"}
          secondaryColorTheme={
            (meta.secondaryColorTheme as ColorThemeId) ?? "amber"
          }
          itemMotif={
            (meta.itemMotif as "star" | "flower" | "apple" | "gem") ?? "star"
          }
        />
        <span className="text-xs font-bold text-slate-700">
          {toEasternArabicNumerals(model.labelAr)}
        </span>
      </div>
    );
  });
}

export function createDigitCardSpec(
  digit: number,
  overrides?: Partial<VisualModelSpec>
): VisualModelSpec {
  const safeDigit = Math.max(0, Math.min(9, digit));
  const digitAr = formatEasternNumber(safeDigit);
  return {
    kind: "digit-card",
    id: `digit-${safeDigit}`,
    labelAr: `الرقم ${digitAr} (${getArabicNumberWord(safeDigit)})`,
    digit: safeDigit,
    count: safeDigit,
    colorTheme: "indigo",
    ...overrides,
  };
}

export type { EverydayObjectId, VisualSize };
