import React from "react";
import type {
  ColorThemeId,
  EverydayObjectId,
  VisualModelSpec,
} from "@/domain/types";
import { COLOR_PALETTES } from "@/visual-models/shapes-solids-coins";
import {
  EverydayObjectSvg,
  getEverydayObjectById,
} from "@/visual-models/everyday-objects";
import { registerVisualModel } from "@/visual-models/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export type PictureGraphOrientation = "horizontal" | "vertical";

export interface PictureGraphCategorySpec {
  categoryId: string;
  labelAr: string;
  objectId: EverydayObjectId;
  count: number;
  colorTheme: ColorThemeId;
}

export interface PictureGraphOptions {
  orientation?: PictureGraphOrientation;
  titleAr?: string;
  categories: Array<{
    categoryId?: string;
    labelAr: string;
    objectId?: EverydayObjectId;
    count: number;
    colorTheme?: ColorThemeId;
    iconId?: string;
  }>;
  maxCount?: number;
  labelAr?: string;
}

export function createPictureGraphSpec(
  options: PictureGraphOptions
): VisualModelSpec {
  const orientation: PictureGraphOrientation =
    options.orientation ?? "horizontal";
  const maxCount = Math.max(5, options.maxCount ?? 5);
  const categories: PictureGraphCategorySpec[] = options.categories.map(
    (cat, idx) => {
      const objectId = (cat.objectId ??
        cat.iconId ??
        "star") as EverydayObjectId;
      return {
        categoryId: cat.categoryId ?? `cat-${idx + 1}-${objectId}`,
        labelAr: cat.labelAr,
        objectId,
        count: Math.max(1, Math.min(5, cat.count)),
        colorTheme: cat.colorTheme ?? "sky",
      };
    }
  );

  const defaultTitleAr =
    orientation === "vertical"
      ? "تمثيل بياني عمودي بالصور حتى ٥"
      : "تمثيل بياني أفقي بالصور حتى ٥";

  const categoriesSummaryAr = categories
    .map((c) => `${c.labelAr} (${formatEasternNumber(c.count)})`)
    .join("، ");

  return {
    kind: "picture-graph",
    id: `picture-graph-${orientation}-${categories
      .map((c) => `${c.objectId}${c.count}`)
      .join("-")}`,
    labelAr:
      options.labelAr ??
      `${options.titleAr ?? defaultTitleAr}: ${categoriesSummaryAr}`,
    colorTheme: categories[0]?.colorTheme ?? "indigo",
    count: categories.length,
    meta: {
      orientation,
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

function GraphCellIconSvg({
  objectId,
  cx,
  cy,
  colorTheme,
}: {
  objectId: EverydayObjectId;
  cx: number;
  cy: number;
  colorTheme: ColorThemeId;
}): React.ReactElement {
  const palette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.coral;
  const half = 17;

  return (
    <g
      transform={`translate(${cx - half}, ${cy - half})`}
      data-graph-cell-icon={objectId}
    >
      <circle
        cx={half}
        cy={half}
        r={15.5}
        fill={palette.accent}
        stroke={palette.stroke}
        strokeWidth="1.4"
      />
      <g transform="translate(3, 3) scale(0.44)">
        <EverydayObjectSvg objectId={objectId} size="small" />
      </g>
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
            objectId: "apple",
            count: 3,
            colorTheme: "coral",
          },
          {
            categoryId: "cat-banana",
            labelAr: getEverydayObjectById("banana").labelAr,
            objectId: "banana",
            count: 4,
            colorTheme: "amber",
          },
          {
            categoryId: "cat-strawberry",
            labelAr: getEverydayObjectById("strawberry").labelAr,
            objectId: "strawberry",
            count: 2,
            colorTheme: "rose",
          },
        ];

  if (orientation === "vertical") {
    const colWidth = 84;
    const cellHeight = 40;
    const topHeaderH = 34;
    const bottomLabelH = 54;
    const axisWidth = 42;
    const leftPad = 14;
    const rightPad = 14;

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
          x="10"
          y="7"
          width={svgWidth - 20}
          height="22"
          rx="8"
          fill="#EEF2FF"
        />
        <text
          x={svgWidth / 2}
          y="22"
          textAnchor="middle"
          fontSize="11.5"
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
                          y={cellTopY + 3}
                          width={colWidth - 8}
                          height={cellHeight - 6}
                          rx="8"
                          fill={pal.accent}
                          stroke={pal.fill}
                          strokeWidth="1.5"
                        />
                        <GraphCellIconSvg
                          objectId={cat.objectId}
                          cx={colCenterX}
                          cy={cellCenterY}
                          colorTheme={cat.colorTheme}
                        />
                      </>
                    ) : (
                      <circle
                        cx={colCenterX}
                        cy={cellCenterY}
                        r="8"
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
                y={gridBottomY + 6}
                width={colWidth - 8}
                height="40"
                rx="10"
                fill={pal.accent}
                stroke={pal.stroke}
                strokeWidth="1.6"
              />
              <text
                x={colCenterX}
                y={gridBottomY + 23}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="900"
                fill={pal.stroke}
              >
                {toEasternArabicNumerals(cat.labelAr)}
              </text>
              <text
                x={colCenterX}
                y={gridBottomY + 38}
                textAnchor="middle"
                fontSize="10"
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

  const cellWidth = 46;
  const rowHeight = 46;
  const topHeaderH = 34;
  const bottomAxisH = 36;
  const rightCategoryColW = 116;
  const leftSummaryColW = 54;
  const padX = 12;

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
        x="10"
        y="7"
        width={svgWidth - 20}
        height="22"
        rx="8"
        fill="#EEF2FF"
      />
      <text
        x={svgWidth / 2}
        y="22"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="900"
        fill="#312E81"
      >
        📊 {toEasternArabicNumerals(titleAr)} (من اليمين إلى اليسار)
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
              fontSize="11"
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
                        y={rowY + 4}
                        width={cellWidth - 6}
                        height={rowHeight - 8}
                        rx="8"
                        fill={pal.accent}
                        stroke={pal.fill}
                        strokeWidth="1.4"
                      />
                      <GraphCellIconSvg
                        objectId={cat.objectId}
                        cx={cellCenterX}
                        cy={rowCenterY}
                        colorTheme={cat.colorTheme}
                      />
                    </>
                  ) : (
                    <circle
                      cx={cellCenterX}
                      cy={rowCenterY}
                      r="7.5"
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
              x={padX + 7}
              y={rowY + 6}
              width={leftSummaryColW - 14}
              height={rowHeight - 12}
              rx="8"
              fill={solved ? "#ECFDF5" : "#F8FAFC"}
              stroke={solved ? "#059669" : "#94A3B8"}
              strokeWidth="1.8"
              strokeDasharray={solved ? "none" : "4 3"}
            />
            <text
              x={padX + leftSummaryColW / 2}
              y={rowCenterY + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="900"
              fill={solved ? "#047857" : "#94A3B8"}
            >
              {solved ? formatEasternNumber(cat.count) : "؟"}
            </text>
          </g>
        );
      })}

      <g data-graph-axis="horizontal">
        <text
          x={gridRightX + rightCategoryColW / 2}
          y={gridBottomY + 22}
          textAnchor="middle"
          fontSize="10.5"
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
                x={cx - 12}
                y={gridBottomY + 6}
                width="24"
                height="22"
                rx="7"
                fill="#E0E7FF"
                stroke="#4338CA"
                strokeWidth="1.4"
              />
              <text
                x={cx}
                y={gridBottomY + 21}
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="900"
                fill="#1E1B4B"
              >
                {numAr}
              </text>
            </g>
          );
        })}
        <text
          x={padX + leftSummaryColW / 2}
          y={gridBottomY + 22}
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="900"
          fill="#312E81"
        >
          العدد
        </text>
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

    return (
      <div
        className="inline-flex flex-col items-center gap-1.5"
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
        <span className="text-xs font-bold text-slate-700">
          {toEasternArabicNumerals(model.labelAr)}
        </span>
      </div>
    );
  });
}
registerPictureGraphVisualModels();
