import React from "react";
import type {
  ColorThemeId,
  EverydayObjectId,
  Shape2DId,
  Solid3DId,
  VisualModelSpec,
} from "@/domain/types";
import {
  COLOR_PALETTES,
  Shape2DSvg,
  Solid3DSvg,
} from "@/visual-models/shapes-solids-coins";
import {
  EverydayObjectSvg,
  getEverydayObjectById,
} from "@/visual-models/everyday-objects";
import { registerVisualModel } from "@/visual-models/registry";
import { CANONICAL_SIZES_PX } from "@/components/worksheet/layout-standard";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export type PictureGraphOrientation = "horizontal" | "vertical";

export type PictureGraphIcon =
  | { kind: "everyday-object"; id: EverydayObjectId }
  | { kind: "shape-2d"; id: Shape2DId }
  | { kind: "solid-3d"; id: Solid3DId };

/** `draw-missing` is the SHAPE GRAPH: a count table beside a horizontal graph whose missing cells the child draws. */
export type PictureGraphMode = "read" | "draw-missing";

export interface PictureGraphCategorySpec {
  categoryId: string;
  labelAr: string;
  icon: PictureGraphIcon;
  count: number;
  colorTheme: ColorThemeId;
  /** `draw-missing` only: cells shown filled; the rest up to `count` are drawn by the child. */
  givenCount?: number;
}

export interface PictureGraphOptions {
  orientation?: PictureGraphOrientation;
  mode?: PictureGraphMode;
  titleAr?: string;
  categories: Array<{
    categoryId?: string;
    labelAr: string;
    objectId?: EverydayObjectId;
    icon?: PictureGraphIcon;
    count: number;
    givenCount?: number;
    colorTheme?: ColorThemeId;
    iconId?: string;
  }>;
  maxCount?: number;
  labelAr?: string;
}

export function createPictureGraphSpec(
  options: PictureGraphOptions
): VisualModelSpec {
  const mode: PictureGraphMode = options.mode ?? "read";
  const orientation: PictureGraphOrientation =
    mode === "draw-missing"
      ? "horizontal"
      : (options.orientation ?? "horizontal");
  const maxCount = Math.max(5, options.maxCount ?? 5);
  const categories: PictureGraphCategorySpec[] = options.categories.map(
    (cat, idx) => {
      const icon: PictureGraphIcon = cat.icon ?? {
        kind: "everyday-object",
        id: (cat.objectId ?? cat.iconId ?? "star") as EverydayObjectId,
      };
      const count = Math.max(1, Math.min(5, cat.count));
      return {
        categoryId: cat.categoryId ?? `cat-${idx + 1}-${icon.id}`,
        labelAr: cat.labelAr,
        icon,
        count,
        colorTheme: cat.colorTheme ?? "sky",
        ...(mode === "draw-missing"
          ? {
              givenCount: Math.max(0, Math.min(count, cat.givenCount ?? count)),
            }
          : {}),
      };
    }
  );

  const defaultTitleAr =
    mode === "draw-missing"
      ? "الجدول والتمثيل البياني بالأشكال"
      : orientation === "vertical"
        ? "تمثيل بياني عمودي بالصور حتى ٥"
        : "تمثيل بياني أفقي بالصور حتى ٥";

  const categoriesSummaryAr = categories
    .map((c) => `${c.labelAr} (${formatEasternNumber(c.count)})`)
    .join("، ");

  return {
    kind: "picture-graph",
    id: `picture-graph-${mode === "draw-missing" ? "draw-missing" : orientation}-${categories
      .map((c) => `${c.icon.id}${c.count}`)
      .join("-")}`,
    labelAr:
      options.labelAr ??
      `${options.titleAr ?? defaultTitleAr}: ${categoriesSummaryAr}`,
    colorTheme: categories[0]?.colorTheme ?? "indigo",
    count: categories.length,
    meta: {
      orientation,
      mode,
      titleAr: options.titleAr ?? defaultTitleAr,
      maxCount,
      categories,
    },
  };
}

export function createPictureGraphSpecFromCategories(
  categories: Array<{
    labelAr: string;
    count: number;
    colorTheme?: ColorThemeId;
    objectId?: EverydayObjectId;
  }>,
  orientation: PictureGraphOrientation = "horizontal",
  maxCount?: number
): VisualModelSpec {
  return createPictureGraphSpec({ categories, orientation, maxCount });
}

/** Standalone icon (its own `<svg>`), for HTML contexts such as response rows. */
export function PictureGraphIconSvg({
  icon,
  colorTheme,
  sizePx = 30,
}: {
  icon: PictureGraphIcon;
  colorTheme: ColorThemeId;
  sizePx?: number;
}): React.ReactElement {
  if (icon.kind === "everyday-object") {
    return (
      <span className="inline-flex shrink-0" data-graph-icon-kind={icon.kind}>
        <EverydayObjectSvg objectId={icon.id} size="tiny" />
      </span>
    );
  }
  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox={`0 0 ${sizePx} ${sizePx}`}
      fill="none"
      data-graph-icon-kind={icon.kind}
    >
      <GraphIconGlyph
        icon={icon}
        cx={sizePx / 2}
        cy={sizePx / 2}
        sizePx={sizePx}
        colorTheme={colorTheme}
      />
    </svg>
  );
}

const SHAPE_SVG_PX = 30;
const OBJECT_ICON_BASE_PX = 24;

function GraphIconGlyph({
  icon,
  cx,
  cy,
  sizePx,
  colorTheme,
}: {
  icon: PictureGraphIcon;
  cx: number;
  cy: number;
  sizePx: number;
  colorTheme: ColorThemeId;
}): React.ReactElement {
  const half = sizePx / 2;

  if (icon.kind === "everyday-object") {
    const palette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.coral;
    // EverydayObjectSvg with size="small" renders a 32×32 <svg viewBox="0 0 64 64"> with internal padding.
    // Scaling by 24/32 = 0.75 maps the 32×32 viewport onto the full 24×24 badge centered at (12, 12).
    return (
      <g
        transform={`translate(${cx - half}, ${cy - half}) scale(${sizePx / OBJECT_ICON_BASE_PX})`}
      >
        <circle
          cx={12}
          cy={12}
          r={10.5}
          fill={palette.accent}
          stroke={palette.stroke}
          strokeWidth="1.2"
        />
        <g transform="scale(0.75)">
          <EverydayObjectSvg objectId={icon.id} size="small" />
        </g>
      </g>
    );
  }

  // Shapes and solids carry no colored backing: the silhouette is the grayscale cue (§2.5).
  return (
    <g
      transform={`translate(${cx - half}, ${cy - half}) scale(${sizePx / SHAPE_SVG_PX})`}
    >
      {icon.kind === "shape-2d" ? (
        <Shape2DSvg shapeId={icon.id} colorTheme={colorTheme} size="large" />
      ) : (
        <Solid3DSvg solidId={icon.id} colorTheme={colorTheme} size="large" />
      )}
    </g>
  );
}

function GraphCellIconSvg({
  icon,
  cx,
  cy,
  colorTheme,
  sizePx = 24,
}: {
  icon: PictureGraphIcon;
  cx: number;
  cy: number;
  colorTheme: ColorThemeId;
  sizePx?: number;
}): React.ReactElement {
  return (
    <g data-graph-cell-icon={icon.id} data-graph-icon-kind={icon.kind}>
      <GraphIconGlyph
        icon={icon}
        cx={cx}
        cy={cy}
        sizePx={sizePx}
        colorTheme={colorTheme}
      />
    </g>
  );
}

export function PictureGraphSvg({
  orientation = "horizontal",
  titleAr = "تمثيل بياني بالصور",
  categories = [],
  maxCount = 5,
  solved = false,
}: {
  orientation?: PictureGraphOrientation;
  titleAr?: string;
  categories?: PictureGraphCategorySpec[];
  maxCount?: number;
  solved?: boolean;
}): React.ReactElement {
  const safeMax = Math.max(5, maxCount);
  const safeCategories: PictureGraphCategorySpec[] =
    categories.length > 0
      ? categories
      : [
          {
            categoryId: "cat-apple",
            labelAr: getEverydayObjectById("apple").labelAr,
            icon: { kind: "everyday-object", id: "apple" },
            count: 3,
            colorTheme: "coral",
          },
          {
            categoryId: "cat-banana",
            labelAr: getEverydayObjectById("banana").labelAr,
            icon: { kind: "everyday-object", id: "banana" },
            count: 4,
            colorTheme: "amber",
          },
          {
            categoryId: "cat-strawberry",
            labelAr: getEverydayObjectById("strawberry").labelAr,
            icon: { kind: "everyday-object", id: "strawberry" },
            count: 2,
            colorTheme: "rose",
          },
        ];

  if (orientation === "vertical") {
    const colWidth = 56;
    const cellHeight = 20;
    const topHeaderH = 22;
    const bottomLabelH = 36;
    const axisWidth = 28;
    const leftPad = 6;
    const rightPad = 6;

    const gridWidth = safeCategories.length * colWidth;
    const gridHeight = safeMax * cellHeight;
    const svgWidth = leftPad + gridWidth + axisWidth + rightPad;
    const svgHeight = topHeaderH + gridHeight + bottomLabelH;
    const gridLeftX = leftPad;
    const gridRightX = leftPad + gridWidth;
    const gridTopY = topHeaderH;
    const gridBottomY = topHeaderH + gridHeight;

    const getRtlColX = (colIdx: number): number =>
      gridRightX - (colIdx + 1) * colWidth;

    return (
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        fill="none"
        aria-label={toEasternArabicNumerals(titleAr)}
        data-orientation="vertical"
        data-direction="rtl"
        data-graph-type="picture-graph"
      >
        <rect
          x="3"
          y="3"
          width={svgWidth - 6}
          height={svgHeight - 6}
          rx="16"
          fill="#F8FAFC"
          stroke="#4F46E5"
          strokeWidth="2.2"
        />

        <rect
          x="8"
          y="5"
          width={svgWidth - 16}
          height="18"
          rx="6"
          fill="#EEF2FF"
        />
        <text
          x={svgWidth / 2}
          y="18"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill="#312E81"
        >
          📊 {toEasternArabicNumerals(titleAr)}
        </text>

        <rect
          x={gridLeftX}
          y={gridTopY}
          width={gridWidth}
          height={gridHeight}
          rx="8"
          fill="#FFFFFF"
          stroke="#4338CA"
          strokeWidth="2"
        />

        <g data-graph-axis="vertical">
          {Array.from({ length: safeMax }, (_, levelIdx) => {
            const levelNum = levelIdx + 1;
            const rowTopY = gridBottomY - levelNum * cellHeight;
            const cy = rowTopY + cellHeight / 2;

            return (
              <g key={levelNum} data-axis-tick={formatEasternNumber(levelNum)}>
                {levelIdx > 0 && (
                  <line
                    x1={gridLeftX}
                    y1={rowTopY + cellHeight}
                    x2={gridRightX}
                    y2={rowTopY + cellHeight}
                    stroke="#CBD5E1"
                    strokeWidth="1.4"
                    strokeDasharray="4 3"
                  />
                )}
                <rect
                  x={gridRightX + 6}
                  y={cy - 11}
                  width="26"
                  height="22"
                  rx="7"
                  fill="#E0E7FF"
                  stroke="#4338CA"
                  strokeWidth="1.4"
                />
                <text
                  x={gridRightX + 19}
                  y={cy + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="900"
                  fill="#1E1B4B"
                >
                  {formatEasternNumber(levelNum)}
                </text>
              </g>
            );
          })}
        </g>

        {safeCategories.map((cat, colIdx) => {
          const colX = getRtlColX(colIdx);
          const colCenterX = colX + colWidth / 2;
          const pal = COLOR_PALETTES[cat.colorTheme] ?? COLOR_PALETTES.coral;

          return (
            <g
              key={cat.categoryId}
              data-graph-category={toEasternArabicNumerals(cat.categoryId)}
              data-category-count={formatEasternNumber(cat.count)}
            >
              {colIdx < safeCategories.length - 1 && (
                <line
                  x1={colX}
                  y1={gridTopY}
                  x2={colX}
                  y2={gridBottomY}
                  stroke="#6366F1"
                  strokeWidth="1.8"
                />
              )}

              {Array.from({ length: safeMax }, (_, levelIdx) => {
                const levelNum = levelIdx + 1;
                const cellTopY = gridBottomY - levelNum * cellHeight;
                const cellCenterY = cellTopY + cellHeight / 2;
                const isFilled = levelNum <= cat.count;

                return (
                  <g
                    key={levelNum}
                    data-graph-cell={formatEasternNumber(levelNum)}
                    data-cell-filled={isFilled ? "true" : "false"}
                  >
                    {isFilled ? (
                      <>
                        <rect
                          x={colX + 4}
                          y={cellTopY + 1.5}
                          width={colWidth - 8}
                          height={cellHeight - 3}
                          rx="7"
                          fill={pal.accent}
                          stroke={pal.fill}
                          strokeWidth="1.4"
                        />
                        <GraphCellIconSvg
                          icon={cat.icon}
                          cx={colCenterX}
                          cy={cellCenterY}
                          colorTheme={cat.colorTheme}
                          sizePx={16}
                        />
                      </>
                    ) : (
                      <circle
                        cx={colCenterX}
                        cy={cellCenterY}
                        r="6"
                        fill="#F8FAFC"
                        stroke="#E2E8F0"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                      />
                    )}
                  </g>
                );
              })}

              <rect
                x={colX + 4}
                y={gridBottomY + 2}
                width={colWidth - 8}
                height="30"
                rx="8"
                fill={pal.accent}
                stroke={pal.stroke}
                strokeWidth="1.6"
              />
              <text
                x={colCenterX}
                y={gridBottomY + 14}
                textAnchor="middle"
                fontSize="12"
                fontWeight="900"
                fill={pal.stroke}
              >
                {toEasternArabicNumerals(cat.labelAr.split(" ")[0])}
              </text>
              <text
                x={colCenterX}
                y={gridBottomY + 26}
                textAnchor="middle"
                fontSize="12"
                fontWeight="900"
                fill={solved ? "#047857" : "#475569"}
              >
                {solved
                  ? `العدد: ${formatEasternNumber(cat.count)}`
                  : `العمود ${formatEasternNumber(colIdx + 1)}`}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  const cellWidth = 28;
  const rowHeight = 24;
  const topHeaderH = 22;
  const bottomAxisH = 26;
  const rightCategoryColW = 92;
  // The count summary is answer-key-only. In worksheet mode the child derives
  // the count and writes it in the dedicated response row, so a second "؟"
  // column here would create two competing answer slots for one quantity.
  const showSummaryColumn = solved;
  const leftSummaryColW = showSummaryColumn ? 36 : 0;
  const padX = 8;

  const cellsGridW = safeMax * cellWidth;
  const svgWidth = padX * 2 + leftSummaryColW + cellsGridW + rightCategoryColW;
  const gridHeight = safeCategories.length * rowHeight;
  const svgHeight = topHeaderH + gridHeight + bottomAxisH;

  const gridLeftX = padX + leftSummaryColW;
  const gridRightX = gridLeftX + cellsGridW;
  const categoryColRightX = gridRightX + rightCategoryColW;
  const gridTopY = topHeaderH;
  const gridBottomY = topHeaderH + gridHeight;

  const getRtlCellX = (cellIdx: number): number =>
    gridRightX - (cellIdx + 1) * cellWidth;

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      fill="none"
      aria-label={toEasternArabicNumerals(titleAr)}
      data-orientation="horizontal"
      data-direction="rtl"
      data-graph-type="picture-graph"
    >
      <rect
        x="3"
        y="3"
        width={svgWidth - 6}
        height={svgHeight - 6}
        rx="16"
        fill="#F8FAFC"
        stroke="#4F46E5"
        strokeWidth="2.2"
      />

      <rect
        x="8"
        y="5"
        width={svgWidth - 16}
        height="18"
        rx="6"
        fill="#EEF2FF"
      />
      <text
        x={svgWidth / 2}
        y="18"
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fill="#312E81"
      >
        📊 {toEasternArabicNumerals(titleAr)}
      </text>

      <rect
        x={padX}
        y={gridTopY}
        width={leftSummaryColW + cellsGridW + rightCategoryColW}
        height={gridHeight}
        rx="10"
        fill="#FFFFFF"
        stroke="#4338CA"
        strokeWidth="2"
      />

      <line
        x1={gridRightX}
        y1={gridTopY}
        x2={gridRightX}
        y2={gridBottomY}
        stroke="#3730A3"
        strokeWidth="2.2"
      />

      <line
        x1={gridLeftX}
        y1={gridTopY}
        x2={gridLeftX}
        y2={gridBottomY}
        stroke="#3730A3"
        strokeWidth="2"
      />

      {safeCategories.map((cat, rowIdx) => {
        const rowY = gridTopY + rowIdx * rowHeight;
        const rowCenterY = rowY + rowHeight / 2;
        const pal = COLOR_PALETTES[cat.colorTheme] ?? COLOR_PALETTES.coral;

        return (
          <g
            key={cat.categoryId}
            data-graph-category={toEasternArabicNumerals(cat.categoryId)}
            data-category-count={formatEasternNumber(cat.count)}
          >
            {rowIdx > 0 && (
              <line
                x1={padX}
                y1={rowY}
                x2={categoryColRightX}
                y2={rowY}
                stroke="#CBD5E1"
                strokeWidth="1.6"
              />
            )}

            <rect
              x={gridRightX + 4}
              y={rowY + 4}
              width={rightCategoryColW - 8}
              height={rowHeight - 8}
              rx="8"
              fill={pal.accent}
              stroke={pal.stroke}
              strokeWidth="1.5"
            />
            <text
              x={gridRightX + rightCategoryColW / 2}
              y={rowCenterY + 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="900"
              fill={pal.stroke}
            >
              {toEasternArabicNumerals(cat.labelAr)}
            </text>

            {Array.from({ length: safeMax }, (_, cellIdx) => {
              const cellX = getRtlCellX(cellIdx);
              const cellCenterX = cellX + cellWidth / 2;
              const isFilled = cellIdx < cat.count;

              return (
                <g
                  key={cellIdx}
                  data-graph-cell={formatEasternNumber(cellIdx + 1)}
                  data-cell-filled={isFilled ? "true" : "false"}
                >
                  {cellIdx < safeMax - 1 && (
                    <line
                      x1={cellX}
                      y1={rowY}
                      x2={cellX}
                      y2={rowY + rowHeight}
                      stroke="#E2E8F0"
                      strokeWidth="1.4"
                      strokeDasharray="3 3"
                    />
                  )}
                  {isFilled ? (
                    <>
                      <rect
                        x={cellX + 3}
                        y={rowY + 2}
                        width={cellWidth - 6}
                        height={rowHeight - 4}
                        rx="7"
                        fill={pal.accent}
                        stroke={pal.fill}
                        strokeWidth="1.4"
                      />
                      <GraphCellIconSvg
                        icon={cat.icon}
                        cx={cellCenterX}
                        cy={rowCenterY}
                        colorTheme={cat.colorTheme}
                        sizePx={19}
                      />
                    </>
                  ) : (
                    <circle
                      cx={cellCenterX}
                      cy={rowCenterY}
                      r="6.5"
                      fill="#F8FAFC"
                      stroke="#E2E8F0"
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                    />
                  )}
                </g>
              );
            })}

            {showSummaryColumn && (
              <>
                <rect
                  x={padX + 7}
                  y={rowY + 6}
                  width={leftSummaryColW - 14}
                  height={rowHeight - 12}
                  rx="8"
                  fill="#ECFDF5"
                  stroke="#059669"
                  strokeWidth="1.8"
                />
                <text
                  x={padX + leftSummaryColW / 2}
                  y={rowCenterY + 5}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="900"
                  fill="#047857"
                >
                  {formatEasternNumber(cat.count)}
                </text>
              </>
            )}
          </g>
        );
      })}

      <g data-graph-axis="horizontal">
        <text
          x={gridRightX + rightCategoryColW / 2}
          y={gridBottomY + 19}
          textAnchor="middle"
          fontSize="12"
          fontWeight="900"
          fill="#312E81"
        >
          الفئة
        </text>
        {Array.from({ length: safeMax }, (_, cellIdx) => {
          const cellX = getRtlCellX(cellIdx);
          const cx = cellX + cellWidth / 2;
          const numAr = formatEasternNumber(cellIdx + 1);
          return (
            <g key={cellIdx} data-axis-tick={numAr}>
              <rect
                x={cx - 11}
                y={gridBottomY + 4}
                width="22"
                height="19"
                rx="6"
                fill="#E0E7FF"
                stroke="#4338CA"
                strokeWidth="1.2"
              />
              <text
                x={cx}
                y={gridBottomY + 18}
                textAnchor="middle"
                fontSize="12"
                fontWeight="900"
                fill="#1E1B4B"
              >
                {numAr}
              </text>
            </g>
          );
        })}
        {showSummaryColumn && (
          <text
            x={padX + leftSummaryColW / 2}
            y={gridBottomY + 19}
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#312E81"
          >
            العدد
          </text>
        )}
      </g>
    </svg>
  );
}

const SHAPE_GRAPH_MAX_ROWS = 4;
const SHAPE_GRAPH_COLUMNS = 5;
const DRAWN_ACCENT = "#059669";

function regularPolygonPoints(
  cx: number,
  cy: number,
  radius: number,
  sides: number
): string {
  return Array.from({ length: sides }, (_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / sides;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

/** The child's drawing on the Answer Key: an outline in the accent style (§8.2). */
function DrawnShapeOutline({
  icon,
  cx,
  cy,
  colorTheme,
}: {
  icon: PictureGraphIcon;
  cx: number;
  cy: number;
  colorTheme: ColorThemeId;
}): React.ReactElement {
  const stroke = {
    stroke: DRAWN_ACCENT,
    strokeWidth: 3,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  if (icon.kind !== "shape-2d") {
    return (
      <>
        <rect
          x={cx - 18}
          y={cy - 18}
          width="36"
          height="36"
          rx="8"
          {...stroke}
        />
        <GraphIconGlyph
          icon={icon}
          cx={cx}
          cy={cy}
          sizePx={28}
          colorTheme={colorTheme}
        />
      </>
    );
  }

  switch (icon.id) {
    case "circle":
      return <circle cx={cx} cy={cy} r="14" {...stroke} />;
    case "triangle":
      return (
        <polygon
          points={`${cx},${cy - 15} ${cx + 15},${cy + 12} ${cx - 15},${cy + 12}`}
          {...stroke}
        />
      );
    case "square":
      return (
        <rect x={cx - 13} y={cy - 13} width="26" height="26" {...stroke} />
      );
    case "rectangle":
      return (
        <rect x={cx - 16} y={cy - 10} width="32" height="20" {...stroke} />
      );
    case "pentagon":
      return (
        <polygon points={regularPolygonPoints(cx, cy, 15, 5)} {...stroke} />
      );
    case "hexagon":
      return (
        <polygon points={regularPolygonPoints(cx, cy, 15, 6)} {...stroke} />
      );
  }
}

/**
 * SHAPE GRAPH: a count table (right) beside a horizontal graph (left), read right to left.
 * The box is sized for 4 categories (§3.3); fewer rows are centred vertically.
 */
export function ShapeGraphSvg({
  titleAr,
  categories,
  solved = false,
}: {
  titleAr: string;
  categories: PictureGraphCategorySpec[];
  solved?: boolean;
}): React.ReactElement {
  const { width: boxW, height: boxH } = CANONICAL_SIZES_PX.shapeGraphBox;
  const cell = CANONICAL_SIZES_PX.shapeGraphCell.width;
  const tableIcon = CANONICAL_SIZES_PX.shapeGraphTableIcon;
  const digitBox = CANONICAL_SIZES_PX.answerSlotDigit.width;

  const padX = 8;
  const titleTop = 6;
  const titleH = 22;
  const headerH = 24;
  const tableIconColW = cell;
  const tableDigitColW = 60;
  const tableW = tableIconColW + tableDigitColW;
  const tableGap = 16;
  const labelColW = cell;

  const rows = categories.slice(0, SHAPE_GRAPH_MAX_ROWS);
  const tableRightX = boxW - padX;
  const tableLeftX = tableRightX - tableW;
  const graphRightX = tableLeftX - tableGap;
  const labelLeftX = graphRightX - labelColW;
  const cellsLeftX = labelLeftX - SHAPE_GRAPH_COLUMNS * cell;

  const blockOffset = ((SHAPE_GRAPH_MAX_ROWS - rows.length) * cell) / 2;
  const headerTop = titleTop + titleH + 6 + blockOffset;
  const rowsTop = headerTop + headerH;
  const rowsBottom = rowsTop + rows.length * cell;

  const getRtlCellX = (cellIdx: number): number =>
    labelLeftX - (cellIdx + 1) * cell;

  return (
    <svg
      width={boxW}
      height={boxH}
      viewBox={`0 0 ${boxW} ${boxH}`}
      fill="none"
      aria-label={toEasternArabicNumerals(titleAr)}
      data-orientation="horizontal"
      data-direction="rtl"
      data-graph-type="picture-graph"
      data-shape-graph-box={`${boxW}x${boxH}`}
    >
      <rect
        x="2"
        y="2"
        width={boxW - 4}
        height={boxH - 4}
        rx="16"
        fill="#F8FAFC"
        stroke="#4F46E5"
        strokeWidth="2.2"
      />
      <rect
        x={padX}
        y={titleTop}
        width={boxW - padX * 2}
        height={titleH}
        rx="6"
        fill="#EEF2FF"
      />
      <text
        x={boxW / 2}
        y={titleTop + 16}
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fill="#312E81"
      >
        {toEasternArabicNumerals(titleAr)}
      </text>

      <g data-count-table="true">
        <text
          x={tableRightX - tableIconColW / 2}
          y={headerTop + 17}
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill="#312E81"
        >
          الشكل
        </text>
        <text
          x={tableLeftX + tableDigitColW / 2}
          y={headerTop + 17}
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill="#312E81"
        >
          العدد
        </text>
        <rect
          x={tableLeftX}
          y={rowsTop}
          width={tableW}
          height={rows.length * cell}
          rx="8"
          fill="#FFFFFF"
          stroke="#4338CA"
          strokeWidth="2"
        />
        <line
          x1={tableRightX - tableIconColW}
          y1={rowsTop}
          x2={tableRightX - tableIconColW}
          y2={rowsBottom}
          stroke="#A5B4FC"
          strokeWidth="1.6"
        />
        {rows.map((cat, rowIdx) => {
          const rowTop = rowsTop + rowIdx * cell;
          const rowCenterY = rowTop + cell / 2;
          return (
            <g
              key={cat.categoryId}
              data-count-table-row={formatEasternNumber(rowIdx + 1)}
              data-category-count={formatEasternNumber(cat.count)}
            >
              {rowIdx > 0 && (
                <line
                  x1={tableLeftX}
                  y1={rowTop}
                  x2={tableRightX}
                  y2={rowTop}
                  stroke="#A5B4FC"
                  strokeWidth="1.6"
                />
              )}
              <GraphIconGlyph
                icon={cat.icon}
                cx={tableRightX - tableIconColW / 2}
                cy={rowCenterY}
                sizePx={tableIcon}
                colorTheme={cat.colorTheme}
              />
              <rect
                x={tableRightX - tableIconColW / 2 - tableIcon / 2}
                y={rowCenterY - tableIcon / 2}
                width={tableIcon}
                height={tableIcon}
                fill="none"
                data-shape-graph-table-icon={tableIcon}
              />
              <rect
                x={tableLeftX + (tableDigitColW - digitBox) / 2}
                y={rowTop}
                width={digitBox}
                height={digitBox}
                fill="none"
                data-count-table-digit-box={`${digitBox}x${digitBox}`}
              />
              <text
                x={tableLeftX + tableDigitColW / 2}
                y={rowCenterY + 10}
                textAnchor="middle"
                fontSize="28"
                fontWeight="900"
                fill="#1E1B4B"
              >
                {formatEasternNumber(cat.count)}
              </text>
            </g>
          );
        })}
      </g>

      <rect
        x={cellsLeftX}
        y={rowsTop}
        width={graphRightX - cellsLeftX}
        height={rows.length * cell}
        rx="8"
        fill="#FFFFFF"
        stroke="#4338CA"
        strokeWidth="2"
      />
      <line
        x1={labelLeftX}
        y1={rowsTop}
        x2={labelLeftX}
        y2={rowsBottom}
        stroke="#3730A3"
        strokeWidth="2.2"
      />

      {rows.map((cat, rowIdx) => {
        const rowTop = rowsTop + rowIdx * cell;
        const rowCenterY = rowTop + cell / 2;
        const givenCount = cat.givenCount ?? cat.count;

        return (
          <g
            key={cat.categoryId}
            data-graph-category={toEasternArabicNumerals(cat.categoryId)}
            data-category-count={formatEasternNumber(cat.count)}
          >
            {rowIdx > 0 && (
              <line
                x1={cellsLeftX}
                y1={rowTop}
                x2={graphRightX}
                y2={rowTop}
                stroke="#CBD5E1"
                strokeWidth="1.6"
              />
            )}
            <g data-graph-row-label="true">
              <GraphIconGlyph
                icon={cat.icon}
                cx={labelLeftX + labelColW / 2}
                cy={rowCenterY}
                sizePx={tableIcon}
                colorTheme={cat.colorTheme}
              />
              <rect
                x={labelLeftX + labelColW / 2 - tableIcon / 2}
                y={rowCenterY - tableIcon / 2}
                width={tableIcon}
                height={tableIcon}
                fill="none"
                data-shape-graph-table-icon={tableIcon}
              />
            </g>

            {Array.from({ length: SHAPE_GRAPH_COLUMNS }, (_, cellIdx) => {
              const cellX = getRtlCellX(cellIdx);
              const cellCenterX = cellX + cell / 2;
              const isGiven = cellIdx < givenCount;
              const isMissing = !isGiven && cellIdx < cat.count;

              return (
                <g
                  key={cellIdx}
                  data-graph-cell={formatEasternNumber(cellIdx + 1)}
                  data-cell-filled={isGiven ? "true" : "false"}
                  {...(isMissing ? { "data-graph-cell-missing": "true" } : {})}
                >
                  <rect
                    x={cellX}
                    y={rowTop}
                    width={cell}
                    height={cell}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    data-shape-graph-cell={`${cell}x${cell}`}
                  />
                  {isGiven && (
                    <GraphCellIconSvg
                      icon={cat.icon}
                      cx={cellCenterX}
                      cy={rowCenterY}
                      colorTheme={cat.colorTheme}
                      sizePx={tableIcon}
                    />
                  )}
                  {isMissing && (
                    <rect
                      x={cellX + 4}
                      y={rowTop + 4}
                      width={cell - 8}
                      height={cell - 8}
                      rx="8"
                      fill="#FFFFFF"
                      stroke="#64748B"
                      strokeWidth="1.6"
                      strokeDasharray="5 4"
                    />
                  )}
                  {isMissing && solved && (
                    <g
                      data-drawn-cell="true"
                      data-solved-drawn-shape={cat.icon.id}
                    >
                      <DrawnShapeOutline
                        icon={cat.icon}
                        cx={cellCenterX}
                        cy={rowCenterY}
                        colorTheme={cat.colorTheme}
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      <g data-graph-axis="horizontal">
        {Array.from({ length: SHAPE_GRAPH_COLUMNS }, (_, cellIdx) => {
          const cx = getRtlCellX(cellIdx) + cell / 2;
          const numAr = formatEasternNumber(cellIdx + 1);
          return (
            <g key={cellIdx} data-axis-tick={numAr}>
              <rect
                x={cx - 11}
                y={rowsBottom + 4}
                width="22"
                height="19"
                rx="6"
                fill="#E0E7FF"
                stroke="#4338CA"
                strokeWidth="1.2"
              />
              <text
                x={cx}
                y={rowsBottom + 18}
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#1E1B4B"
              >
                {numAr}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function registerPictureGraphVisualModels(): void {
  registerVisualModel("picture-graph", ({ model, solved }) => {
    const meta = (model.meta ?? {}) as Record<string, unknown>;
    const orientation =
      (meta.orientation as PictureGraphOrientation) ?? "horizontal";
    const titleAr = (meta.titleAr as string) ?? "تمثيل بياني بالصور";
    const maxCount = (meta.maxCount as number) ?? 5;
    const categories = (meta.categories as PictureGraphCategorySpec[]) ?? [];

    if (meta.mode === "draw-missing") {
      return (
        <div
          className="inline-flex"
          data-visual-model="picture-graph"
          data-graph-mode="draw-missing"
          data-orientation="horizontal"
          data-direction="rtl"
          data-category-count={formatEasternNumber(categories.length)}
        >
          <ShapeGraphSvg
            titleAr={titleAr}
            categories={categories}
            solved={solved}
          />
        </div>
      );
    }

    return (
      <div
        className="inline-flex flex-col items-center gap-1"
        data-visual-model="picture-graph"
        data-orientation={orientation}
        data-direction="rtl"
        data-category-count={formatEasternNumber(categories.length)}
      >
        <PictureGraphSvg
          orientation={orientation}
          titleAr={titleAr}
          categories={categories}
          maxCount={maxCount}
          solved={solved}
        />
        {solved && (
          <span className="text-[13px] font-bold text-slate-700">
            {toEasternArabicNumerals(model.labelAr)}
          </span>
        )}
      </div>
    );
  });
}
registerPictureGraphVisualModels();
