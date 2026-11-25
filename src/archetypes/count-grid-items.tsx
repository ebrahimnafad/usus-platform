import React from "react";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import type {
  ColorThemeId,
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import { COLOR_PALETTES } from "@/visual-models/shapes-solids-coins";

export type CountGridIconType =
  "fruit" | "pencil" | "ball" | "peace-sign" | "star" | "heart";

export interface CountGridItemsGridSpec {
  iconType?: CountGridIconType;
  rows: number;
  cols: number;
  filledCount: number;
  colorTheme?: ColorThemeId;
}

export interface CountGridItemsBlueprintParams {
  iconType?: CountGridIconType;
  rows?: number;
  cols?: number;
  filledCount?: number;
  candidateCounts?: number[];
  gridCount?: number;
  grids?: CountGridItemsGridSpec[];
  directionNoteAr?: string;
}

export interface CountGridItemsCard {
  id: string;
  iconType: CountGridIconType;
  iconLabelAr: string;
  rows: number;
  cols: number;
  filledCount: number;
  filledCountAr: string;
  colorTheme: ColorThemeId;
}

export interface CountGridItemsData extends GenericArchetypeData {
  kind: "CountGridItems";
  grids: CountGridItemsCard[];
  directionNoteAr?: string;
}

const ICON_LABELS_AR: Record<CountGridIconType, string> = {
  fruit: "فواكه",
  pencil: "أقلام رصاص",
  ball: "كرات",
  "peace-sign": "رموز السلام",
  star: "نجوم",
  heart: "قلوب",
};

const ICON_DEFAULT_THEMES: Record<CountGridIconType, ColorThemeId> = {
  fruit: "coral",
  pencil: "amber",
  ball: "sky",
  "peace-sign": "violet",
  star: "amber",
  heart: "rose",
};

function renderGridIcon(
  iconType: CountGridIconType,
  cx: number,
  cy: number,
  theme: ColorThemeId
): React.ReactElement {
  const palette = COLOR_PALETTES[theme] ?? COLOR_PALETTES.coral;

  if (iconType === "fruit") {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy + 1.5}
          r={7}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth="1.2"
        />
        <path
          d={`M ${cx} ${cy - 5.5} Q ${cx + 2} ${cy - 9} ${cx + 4} ${cy - 8}`}
          stroke="#15803D"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse
          cx={cx - 2.2}
          cy={cy - 1}
          rx={1.6}
          ry={2.2}
          fill="#FFFFFF"
          opacity="0.4"
        />
      </g>
    );
  }

  if (iconType === "pencil") {
    return (
      <g transform={`translate(${cx}, ${cy}) rotate(-35)`}>
        <rect
          x={-2.5}
          y={-7}
          width={5}
          height={11}
          rx={1}
          fill={palette.fill}
          stroke={palette.stroke}
          strokeWidth="1.1"
        />
        <polygon
          points="-2.5,4 2.5,4 0,8.5"
          fill="#FDE68A"
          stroke={palette.stroke}
          strokeWidth="1"
        />
        <polygon points="-0.8,7 0.8,7 0,8.5" fill="#1E293B" />
        <rect
          x={-2.5}
          y={-9}
          width={5}
          height={2.5}
          rx={0.6}
          fill="#FDA4AF"
          stroke={palette.stroke}
          strokeWidth="1"
        />
      </g>
    );
  }

  if (iconType === "ball") {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={7.5}
          fill={palette.fillLight}
          stroke={palette.stroke}
          strokeWidth="1.2"
        />
        <path
          d={`M ${cx - 5.5} ${cy - 4.5} Q ${cx} ${cy} ${cx - 5.5} ${cy + 4.5}`}
          stroke={palette.stroke}
          strokeWidth="1.1"
          fill="none"
        />
        <path
          d={`M ${cx + 5.5} ${cy - 4.5} Q ${cx} ${cy} ${cx + 5.5} ${cy + 4.5}`}
          stroke={palette.stroke}
          strokeWidth="1.1"
          fill="none"
        />
      </g>
    );
  }

  if (iconType === "peace-sign") {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={7.5}
          fill={palette.accent}
          stroke={palette.stroke}
          strokeWidth="1.4"
        />
        <line
          x1={cx}
          y1={cy - 7.5}
          x2={cx}
          y2={cy + 7.5}
          stroke={palette.stroke}
          strokeWidth="1.3"
        />
        <line
          x1={cx}
          y1={cy}
          x2={cx - 5}
          y2={cy + 5.2}
          stroke={palette.stroke}
          strokeWidth="1.3"
        />
        <line
          x1={cx}
          y1={cy}
          x2={cx + 5}
          y2={cy + 5.2}
          stroke={palette.stroke}
          strokeWidth="1.3"
        />
      </g>
    );
  }

  if (iconType === "heart") {
    return (
      <path
        d={`M ${cx} ${cy + 6.5} C ${cx - 8} ${cy + 1}, ${cx - 8} ${cy - 6.5}, ${cx} ${cy - 2} C ${cx + 8} ${cy - 6.5}, ${cx + 8} ${cy + 1}, ${cx} ${cy + 6.5} Z`}
        fill={palette.fill}
        stroke={palette.stroke}
        strokeWidth="1.2"
      />
    );
  }

  // star
  return (
    <polygon
      points={`${cx},${cy - 8} ${cx + 2.3},${cy - 2.5} ${cx + 8},${cy - 2} ${cx + 3.6},${cy + 1.8} ${cx + 5},${cy + 7.5} ${cx},${cy + 4.2} ${cx - 5},${cy + 7.5} ${cx - 3.6},${cy + 1.8} ${cx - 8},${cy - 2} ${cx - 2.3},${cy - 2.5}`}
      fill={palette.fill}
      stroke={palette.stroke}
      strokeWidth="1.1"
    />
  );
}

function generateCountGridItemsExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as CountGridItemsBlueprintParams;
  const defaultIcon: CountGridIconType = params.iconType ?? "fruit";
  const defaultRows = Math.max(1, Math.min(10, params.rows ?? 5));
  const defaultCols = Math.max(1, Math.min(10, params.cols ?? 10));
  const capacity = defaultRows * defaultCols;

  let gridCards: CountGridItemsCard[];

  if (params.grids && params.grids.length > 0) {
    gridCards = params.grids.map((g, idx) => {
      const iconType = g.iconType ?? defaultIcon;
      const rows = Math.max(1, Math.min(10, g.rows));
      const cols = Math.max(1, Math.min(10, g.cols));
      const filledCount = Math.max(1, Math.min(rows * cols, g.filledCount));
      return {
        id: `grid-${idx + 1}-n${filledCount}`,
        iconType,
        iconLabelAr: ICON_LABELS_AR[iconType],
        rows,
        cols,
        filledCount,
        filledCountAr: formatEasternNumber(filledCount),
        colorTheme: g.colorTheme ?? ICON_DEFAULT_THEMES[iconType],
      };
    });
  } else if (typeof params.filledCount === "number") {
    const filledCount = Math.max(1, Math.min(capacity, params.filledCount));
    gridCards = [
      {
        id: `grid-1-n${filledCount}`,
        iconType: defaultIcon,
        iconLabelAr: ICON_LABELS_AR[defaultIcon],
        rows: defaultRows,
        cols: defaultCols,
        filledCount,
        filledCountAr: formatEasternNumber(filledCount),
        colorTheme: ICON_DEFAULT_THEMES[defaultIcon],
      },
    ];
  } else {
    const pool =
      params.candidateCounts && params.candidateCounts.length > 0
        ? params.candidateCounts.filter((c) => c >= 1 && c <= capacity)
        : ctx.difficultyLevel === "Easy"
          ? [10, 20, 30].filter((c) => c <= capacity)
          : [23, 28, 34, 37, 42, 46].filter((c) => c <= capacity);
    const gridCount = Math.max(1, Math.min(pool.length, params.gridCount ?? 2));
    const picked = ctx.rng.pickN(pool, gridCount);
    gridCards = picked.map((filledCount, idx) => ({
      id: `grid-${idx + 1}-n${filledCount}`,
      iconType: defaultIcon,
      iconLabelAr: ICON_LABELS_AR[defaultIcon],
      rows: defaultRows,
      cols: defaultCols,
      filledCount,
      filledCountAr: formatEasternNumber(filledCount),
      colorTheme: ICON_DEFAULT_THEMES[defaultIcon],
    }));
  }

  const labelAr = ICON_LABELS_AR[defaultIcon];
  const defaultPromptAr = `انظر إلى شبكة ${labelAr}، ثم عدّ بالعشرات والآحاد واكتب الكلّ:`;
  const defaultStrategyHintAr = gridCards
    .map((g) => {
      const fullRows = Math.floor(g.filledCount / g.cols);
      const rem = g.filledCount % g.cols;
      return rem === 0
        ? `عدّ الصفوف الكاملة بالعشرات (${formatEasternNumber(fullRows)} صفوف × ${formatEasternNumber(g.cols)} = ${g.filledCountAr}).`
        : `عدّ الصفوف الكاملة أولاً (${formatEasternNumber(fullRows * g.cols)}) ثم أكمل العدّ (${formatEasternNumber(rem)}) ليصبح الكلّ ${g.filledCountAr}.`;
    })
    .join("؛ ");

  const visualModels: VisualModelSpec[] = gridCards.map((g) => ({
    kind: "everyday-object",
    id: g.id,
    labelAr: `${g.iconLabelAr}: ${g.filledCountAr}`,
    count: g.filledCount,
    colorTheme: g.colorTheme,
  }));

  const data: CountGridItemsData = {
    kind: "CountGridItems",
    grids: gridCards,
    directionNoteAr: params.directionNoteAr,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "CountGridItems",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: `عدّ ${labelAr} في الشبكة`,
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function renderCountGridItemsExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as CountGridItemsData;
  const isAnswerKey = mode === "answer-key";
  const columns = data.grids.length >= 2 ? 2 : 1;

  return (
    <div className="space-y-1.5" data-archetype="CountGridItems">
      {data.directionNoteAr && (
        <div className="rounded-lg border border-sky-200 bg-sky-50/70 px-2.5 py-1 text-[13px] font-bold text-sky-950">
          {toEasternArabicNumerals(data.directionNoteAr)}
        </div>
      )}

      <ExerciseColumns columns={columns}>
        {data.grids.map((grid, idx) => {
          const cellSize = grid.cols <= 10 ? 26 : 22;
          const svgWidth = grid.cols * cellSize;
          const svgHeight = grid.rows * cellSize;
          const fullRows = Math.floor(grid.filledCount / grid.cols);

          return (
            <div
              key={grid.id}
              className="flex flex-col items-center justify-between gap-1.5 rounded-xl border-2 border-indigo-100 bg-white p-2 shadow-2xs"
              data-count-grid-card={grid.id}
              data-filled-count={String(grid.filledCount)}
              data-rows={String(grid.rows)}
              data-cols={String(grid.cols)}
              data-icon-type={grid.iconType}
            >
              {/* Card Header */}
              <div className="flex w-full items-center justify-between gap-1">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold leading-none text-white">
                  {formatEasternNumber(idx + 1)}
                </span>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-extrabold leading-tight text-indigo-950">
                  {grid.iconLabelAr}
                </span>
              </div>

              {/* Inline Dense Icon Grid SVG */}
              <div className="flex flex-1 items-center justify-center">
                <svg
                  width={svgWidth}
                  height={svgHeight}
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  fill="none"
                  aria-label={`شبكة ${grid.iconLabelAr}: ${grid.filledCountAr}`}
                  data-inline-icon-grid="true"
                  data-direction="rtl"
                >
                  <rect
                    x={0.5}
                    y={0.5}
                    width={svgWidth - 1}
                    height={svgHeight - 1}
                    rx={6}
                    fill="#F8FAFC"
                    stroke="#CBD5E1"
                    strokeWidth="1"
                  />

                  {/* Grid cells (RTL: col 0 is rightmost) */}
                  {Array.from(
                    { length: grid.rows * grid.cols },
                    (_, cellIdx) => {
                      const r = Math.floor(cellIdx / grid.cols);
                      const cRtl = cellIdx % grid.cols;
                      const x = (grid.cols - 1 - cRtl) * cellSize;
                      const y = r * cellSize;
                      const cx = x + cellSize / 2;
                      const cy = y + cellSize / 2;
                      const isFilled = cellIdx < grid.filledCount;

                      return (
                        <g key={cellIdx}>
                          <rect
                            x={x}
                            y={y}
                            width={cellSize}
                            height={cellSize}
                            fill="none"
                            stroke="#E2E8F0"
                            strokeWidth="0.75"
                          />
                          {isFilled && (
                            <g
                              data-grid-icon="true"
                              data-icon-type={grid.iconType}
                            >
                              {renderGridIcon(
                                grid.iconType,
                                cx,
                                cy,
                                grid.colorTheme
                              )}
                            </g>
                          )}
                        </g>
                      );
                    }
                  )}

                  {/* AK: highlight full rows of 10 */}
                  {isAnswerKey &&
                    grid.cols === 10 &&
                    Array.from({ length: fullRows }, (_, r) => (
                      <rect
                        key={`row-hl-${r}`}
                        x={1}
                        y={r * cellSize + 1}
                        width={svgWidth - 2}
                        height={cellSize - 2}
                        rx={4}
                        fill="none"
                        stroke="#059669"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        data-ten-row-group="true"
                      />
                    ))}
                </svg>
              </div>

              {/* Digit Answer Slot */}
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-extrabold text-slate-700">
                  الكلّ:
                </span>
                <AnswerSlot
                  solved={isAnswerKey}
                  answer={grid.filledCountAr}
                  ariaLabel="مربع كتابة الكلّ"
                  kind="write"
                  tone="indigo"
                  solvedDataAttributes={{
                    "data-solved-grid-count": String(grid.filledCount),
                  }}
                />
              </div>
            </div>
          );
        })}
      </ExerciseColumns>
    </div>
  );
}

registerExerciseArchetype({
  id: "CountGridItems",
  displayNameAr: "عدّ الأشياء في الشبكة",
  generate: generateCountGridItemsExercise,
  render: renderCountGridItemsExercise,
});
