import React from "react";
import { registerExerciseArchetype } from "@/archetypes/registry";
import type {
  ConnectMatchData,
  ConnectMatchPair,
  EverydayObjectCategory,
  Exercise,
  VisualModelSpec,
} from "@/domain/types";
import {
  EVERYDAY_OBJECT_CATALOG,
  createEverydayObjectSpec,
} from "@/visual-models/everyday-objects";
import { PartsTableView } from "@/components/worksheet/PartsTableView";
import {
  buildPartWholeMatchPairs,
  type PartWholeMatchMode,
} from "@/lib/part-whole-facts";
import { VisualModelView } from "@/visual-models/registry";
import {
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { AnswerLine, AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";

export type ConnectMatchMode = PartWholeMatchMode;

export interface ConnectMatchBlueprintParams {
  pairCount?: number;
  categories?: EverydayObjectCategory[];
  matchingMode?: ConnectMatchMode;
  operation?: "add" | "subtract";
  totalRange?: [number, number];
  minPart?: number;
  showMissingTotalSlot?: boolean;
  rightColumnTitleAr?: string;
  leftColumnTitleAr?: string;
  comparisonPromptAr?: string;
  comparisonAnswerAr?: string;
  /** Optional custom pairs list for specialized lessons (shapes, solids, coins, quantities) */
  customCandidatePairs?: Array<{
    id: string;
    right: VisualModelSpec;
    left: VisualModelSpec;
    reasonAr: string;
  }>;
}

const CONNECTION_STROKE_COLORS = [
  "#2563EB", // blue
  "#16A34A", // green
  "#D97706", // amber
  "#9333EA", // purple
  "#E11D48", // rose
];

/**
 * Row height in px for ConnectMatch rows and SVG connection canvas.
 */
const ROW_HEIGHT_PX = 52;

function generateConnectMatchExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as ConnectMatchBlueprintParams;

  const defaultPairCount =
    ctx.difficultyLevel === "Easy"
      ? 3
      : ctx.difficultyLevel === "Intermediate"
        ? 4
        : 5;
  const rawPairCount = params.pairCount ?? defaultPairCount;
  const pairCount =
    ctx.lesson.lessonNumber >= 17 ? Math.min(3, rawPairCount) : rawPairCount;

  let pairs: ConnectMatchPair[] = [];

  if (params.matchingMode) {
    pairs = buildPartWholeMatchPairs({
      rng: ctx.rng,
      difficultyLevel: ctx.difficultyLevel,
      matchingMode: params.matchingMode,
      operation: params.operation,
      pairCount,
      totalRange: params.totalRange,
      minPart: params.minPart,
      showMissingTotalSlot: params.showMissingTotalSlot,
      usedFacts: ctx.usedFacts,
    });
  } else if (
    params.customCandidatePairs &&
    params.customCandidatePairs.length > 0
  ) {
    const picked = ctx.rng.pickN(params.customCandidatePairs, pairCount);
    pairs = picked.map((item, idx) => ({
      pairId: `pair-${idx + 1}-${item.id}`,
      rightItem: item.right,
      leftItem: item.left,
      connectionReasonAr: item.reasonAr,
    }));
  } else {
    const candidateObjects =
      params.categories && params.categories.length > 0
        ? EVERYDAY_OBJECT_CATALOG.filter((obj) =>
            params.categories!.includes(obj.category)
          )
        : EVERYDAY_OBJECT_CATALOG;

    const pool =
      candidateObjects.length >= pairCount
        ? candidateObjects
        : EVERYDAY_OBJECT_CATALOG;

    const selectedObjects = ctx.rng.pickN(pool, pairCount);
    pairs = selectedObjects.map((obj, idx) => {
      const spec = createEverydayObjectSpec(obj);
      return {
        pairId: `pair-${idx + 1}-${obj.id}`,
        rightItem: { ...spec },
        leftItem: { ...spec },
        connectionReasonAr: `تطابق تام في الشكل واللون: «${obj.labelAr}» (${obj.silhouetteNoteAr})`,
      };
    });
  }

  const rightItems = pairs.map((p, idx) => ({
    id: `R-${idx + 1}-${p.pairId}`,
    model: p.rightItem,
  }));

  // Deterministic derangement of left items so matching lines cross visually
  const derangedPairs = ctx.rng.derange(pairs);
  const leftItems = derangedPairs.map((p, idx) => ({
    id: `L-${idx + 1}-${p.pairId}`,
    model: p.leftItem,
  }));

  const solutionMap: Record<string, string> = {};
  for (const pair of pairs) {
    const r = rightItems.find((item) => item.id.endsWith(pair.pairId));
    const l = leftItems.find((item) => item.id.endsWith(pair.pairId));
    if (r && l) {
      solutionMap[r.id] = l.id;
    }
  }

  const pairCountAr = formatEasternNumber(pairs.length);
  const defaultPromptAr =
    ctx.difficultyLevel === "Easy"
      ? `صل بخط بين كل شكل في العمود الأيمن وما يطابقه تماماً في العمود الأيسر (${pairCountAr} عناصر):`
      : ctx.difficultyLevel === "Intermediate"
        ? `قارن بدقة ثم صل بخط بين كل صورة في العمود الأيمن والصورة المطابقة لها في العمود الأيسر (${pairCountAr} عناصر):`
        : `لاحظ التفاصيل الدقيقة للصور (${pairCountAr} عناصر)، وصل كل عنصر في العمود الأيمن بنظيره المطابق في العمود الأيسر:`;

  const defaultStrategyHintAr =
    ctx.difficultyLevel === "Easy"
      ? `ابدأ من أول صورة في العمود الأيمن، لاحظ شكلها ولونها المميّز، ثم ابحث عن توأمها في العمود الأيسر وارسم خطاً يصل بينهما (التقابل ١ إلى ١).`
      : ctx.difficultyLevel === "Intermediate"
        ? `ركّز على الصفة المميّزة لكل عنصر (الشكل الخارجي والتفاصيل الداخلية) وتحقّق من أن كل عنصر في اليمين يتصل بعنصر واحد فقط في اليسار.`
        : `قارن العناصر المتشابهة في الفئة بعناية، واستبعد الصور المختلفة في الشكل أو التفاصيل، ثم تأكّد من تساوي عدد العناصر في العمودين (${pairCountAr} مقابل ${pairCountAr}).`;

  const data: ConnectMatchData = {
    kind: "ConnectMatch",
    rightColumnTitleAr: params.rightColumnTitleAr ?? "العمود الأيمن",
    leftColumnTitleAr: params.leftColumnTitleAr ?? "العمود الأيسر",
    rightItems,
    leftItems,
    solutionMap,
    pairs,
    comparisonPromptAr: params.comparisonPromptAr,
    comparisonAnswerAr: params.comparisonAnswerAr,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "ConnectMatch",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "صل بخط (المطابقة واحداً لواحد)",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels: [
      ...rightItems.map((i) => i.model),
      ...leftItems.map((i) => i.model),
    ],
    data,
  };
}

function renderConnectMatchExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as ConnectMatchData;
  const rowCount = data.rightItems.length;
  const allModels = [
    ...data.rightItems.map((i) => i.model),
    ...data.leftItems.map((i) => i.model),
  ];
  const hasNumberBond = allModels.some((m) => m.kind === "number-bond");
  const hasMediumUnit3Model = allModels.some(
    (m) =>
      Boolean(
        (m.meta as Record<string, unknown> | undefined)?.isPartsTableEndpoint
      ) ||
      m.kind === "five-frame" ||
      m.kind === "equation-strip" ||
      (m.kind === "tally-marks" && (m.secondaryCount ?? 0) > 0)
  );
  const hasNumeralTraceOrDigitCard = allModels.some(
    (m) => m.kind === "numeral-trace" || m.kind === "digit-card"
  );
  const isWideUnit3Match = hasNumberBond || hasMediumUnit3Model;

  const rowHeightPx = hasNumberBond
    ? 162
    : hasMediumUnit3Model
      ? 80
      : hasNumeralTraceOrDigitCard
        ? 62
        : ROW_HEIGHT_PX;
  const rowMinHeightClass = hasNumberBond
    ? "min-h-[160px]"
    : hasMediumUnit3Model
      ? "min-h-[76px]"
      : hasNumeralTraceOrDigitCard
        ? "min-h-[58px]"
        : "min-h-[46px]";
  const centerWidthPx = isWideUnit3Match ? 52 : 110;
  const gridColsClass = isWideUnit3Match
    ? "grid-cols-[1fr_52px_1fr] gap-0.5 p-0.5"
    : "grid-cols-[1fr_110px_1fr] gap-1.5 p-1.5";
  const rowPadClass = isWideUnit3Match ? "px-1 py-0 gap-0.5" : "px-2 py-0.5";
  const rightPortX = isWideUnit3Match ? 44 : 98;
  const leftPortX = isWideUnit3Match ? 8 : 12;
  const svgHeight = Math.max(rowCount * rowHeightPx, rowHeightPx);

  return (
    <div className="space-y-1" data-archetype="ConnectMatch">
      <ExerciseColumns columns={1}>
        <div
          className={`grid ${gridColsClass} items-stretch rounded-2xl border-2 border-indigo-100 bg-gradient-to-b from-white to-indigo-50/30`}
        >
          {/* Right Column (First in RTL) */}
          <div
            className={`flex flex-col justify-between ${isWideUnit3Match ? "gap-0.5" : "gap-1"}`}
          >
            <div className="rounded-lg bg-indigo-100/80 px-2 py-0.5 text-center text-[13px] font-extrabold leading-tight text-indigo-950">
              {toEasternArabicNumerals(data.rightColumnTitleAr)}
            </div>
            {data.rightItems.map((item, idx) => (
              <div
                key={item.id}
                className={`flex ${rowMinHeightClass} items-center justify-between rounded-xl border border-slate-200 bg-white ${rowPadClass} shadow-2xs`}
                data-match-right-id={item.id}
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold leading-none text-white">
                  {formatEasternNumber(idx + 1)}
                </span>
                <div className="flex flex-1 items-center justify-center">
                  <VisualModelView
                    model={item.model}
                    solved={mode === "answer-key"}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Center Matching Canvas (SVG ports + solved curves in Answer Key) */}
          <div className="flex flex-col justify-between pt-5">
            <svg
              width="100%"
              height={svgHeight}
              viewBox={`0 0 ${centerWidthPx} ${svgHeight}`}
              className="overflow-visible"
              aria-label={
                mode === "answer-key"
                  ? "خطوط المطابقة المحلولة"
                  : "منطقة توصيل الخطوط"
              }
            >
              {data.rightItems.map((rightItem, rIdx) => {
                const yRight = rIdx * rowHeightPx + rowHeightPx / 2;
                const matchedLeftId = data.solutionMap[rightItem.id];
                const lIdx = data.leftItems.findIndex(
                  (li) => li.id === matchedLeftId
                );
                const yLeft =
                  (lIdx >= 0 ? lIdx : rIdx) * rowHeightPx + rowHeightPx / 2;
                const strokeColor =
                  CONNECTION_STROKE_COLORS[
                    rIdx % CONNECTION_STROKE_COLORS.length
                  ];
                const ctrlRightX = isWideUnit3Match ? 32 : 68;
                const ctrlLeftX = isWideUnit3Match ? 20 : 42;

                return (
                  <g key={rightItem.id}>
                    {/* Single Right & Left port circles in SVG */}
                    <circle
                      cx={rightPortX}
                      cy={yRight}
                      r="5"
                      fill="#EEF2FF"
                      stroke="#4F46E5"
                      strokeWidth="2"
                      data-match-port="right"
                    />
                    <circle
                      cx={leftPortX}
                      cy={yLeft}
                      r="5"
                      fill="#F0FDFA"
                      stroke="#0D9488"
                      strokeWidth="2"
                      data-match-port="left"
                    />

                    {mode === "worksheet" ? (
                      <line
                        x1={rightPortX - 6}
                        y1={yRight}
                        x2={rightPortX - 18}
                        y2={yRight}
                        stroke="#CBD5E1"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    ) : (
                      <path
                        d={`M ${rightPortX} ${yRight} C ${ctrlRightX} ${yRight}, ${ctrlLeftX} ${yLeft}, ${leftPortX} ${yLeft}`}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        data-solved-connection={`${rightItem.id}->${matchedLeftId}`}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Left Column (Second in RTL) */}
          <div
            className={`flex flex-col justify-between ${isWideUnit3Match ? "gap-0.5" : "gap-1"}`}
          >
            <div className="rounded-lg bg-teal-100/80 px-2 py-0.5 text-center text-[13px] font-extrabold leading-tight text-teal-950">
              {toEasternArabicNumerals(data.leftColumnTitleAr)}
            </div>
            {data.leftItems.map((item, idx) => {
              const itemMeta = (item.model.meta ?? {}) as Record<
                string,
                unknown
              >;
              const isPartsTableEndpoint = Boolean(
                itemMeta.isPartsTableEndpoint
              );
              const missingTotal = itemMeta.missingTotal as number | undefined;

              return (
                <div
                  key={item.id}
                  className={`flex ${rowMinHeightClass} items-center justify-between rounded-xl border border-slate-200 bg-white ${rowPadClass} shadow-2xs`}
                  data-match-left-id={item.id}
                >
                  <div className="flex flex-1 items-center justify-center gap-1">
                    {isPartsTableEndpoint ? (
                      <PartsTableView
                        part1={(itemMeta.part1 as number) ?? 1}
                        part2={(itemMeta.part2 as number) ?? 1}
                        total={(itemMeta.total as number) ?? 2}
                        missingPosition="total"
                        tracePositions={
                          (itemMeta.tracePositions as Array<
                            "part1" | "part2"
                          >) ?? []
                        }
                        solved={mode === "answer-key"}
                      />
                    ) : missingTotal !== undefined ? (
                      <AnswerSlot
                        solved={mode === "answer-key"}
                        answer={formatEasternNumber(missingTotal)}
                        ariaLabel="مربع كتابة الكلّ المفقود"
                        tone="indigo"
                      />
                    ) : (
                      <VisualModelView
                        model={item.model}
                        solved={mode === "answer-key"}
                      />
                    )}
                  </div>
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold leading-none text-white">
                    {formatEasternNumber(idx + 1)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </ExerciseColumns>

      {/* Optional Comparison Reasoning Sub-prompt */}
      {data.comparisonPromptAr && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-2.5 py-1 text-[13px] font-bold leading-tight text-amber-950">
          <span>
            🤔 سؤال التفكير: {toEasternArabicNumerals(data.comparisonPromptAr)}
          </span>
          <AnswerLine
            solved={mode === "answer-key" && Boolean(data.comparisonAnswerAr)}
            answer={data.comparisonAnswerAr}
            ariaLabel="سطر كتابة إجابة سؤال التفكير"
          />
        </div>
      )}
    </div>
  );
}

registerExerciseArchetype({
  id: "ConnectMatch",
  displayNameAr: "صل بخط",
  generate: generateConnectMatchExercise,
  render: renderConnectMatchExercise,
});
