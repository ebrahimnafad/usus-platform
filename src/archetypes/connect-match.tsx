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
import { VisualModelView } from "@/visual-models/registry";
import {
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export interface ConnectMatchBlueprintParams {
  pairCount?: number;
  categories?: EverydayObjectCategory[];
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
 * Row height in px. Must exceed the tallest possible ConnectMatch row
 * (min-h-[76px] + content). Subitize groups of up to 5 items at "tiny"
 * (30px) + padding stay comfortably under 100px, so SVG port y-coordinates
 * computed from this constant remain aligned with their DOM anchor points.
 */
const ROW_HEIGHT_PX = 100;

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
  const pairCount = params.pairCount ?? defaultPairCount;

  let pairs: ConnectMatchPair[] = [];

  if (params.customCandidatePairs && params.customCandidatePairs.length > 0) {
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
  const svgHeight = Math.max(rowCount * ROW_HEIGHT_PX, ROW_HEIGHT_PX);

  return (
    <div className="space-y-3" data-archetype="ConnectMatch">
      <div className="grid grid-cols-[1fr_180px_1fr] items-stretch gap-2 rounded-2xl border-2 border-indigo-100 bg-gradient-to-b from-white to-indigo-50/30 p-3">
        {/* Right Column (First in RTL) */}
        <div className="flex flex-col justify-between gap-2">
          <div className="rounded-lg bg-indigo-100/80 px-2.5 py-1 text-center text-xs font-extrabold text-indigo-950">
            {toEasternArabicNumerals(data.rightColumnTitleAr)}
          </div>
          {data.rightItems.map((item, idx) => (
            <div
              key={item.id}
              className="flex min-h-[76px] items-center justify-between rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 shadow-2xs"
              data-match-right-id={item.id}
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {formatEasternNumber(idx + 1)}
              </span>
              <VisualModelView
                model={item.model}
                solved={mode === "answer-key"}
              />
              <span
                className="h-4 w-4 rounded-full border-2 border-indigo-600 bg-indigo-100"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Center Matching Canvas (SVG ports + solved curves in Answer Key) */}
        <div className="flex flex-col justify-between pt-7">
          <svg
            width="100%"
            height={svgHeight}
            viewBox={`0 0 180 ${svgHeight}`}
            className="overflow-visible"
            aria-label={
              mode === "answer-key"
                ? "خطوط المطابقة المحلولة"
                : "منطقة توصيل الخطوط"
            }
          >
            {data.rightItems.map((rightItem, rIdx) => {
              const yRight = rIdx * ROW_HEIGHT_PX + ROW_HEIGHT_PX / 2;
              const matchedLeftId = data.solutionMap[rightItem.id];
              const lIdx = data.leftItems.findIndex(
                (li) => li.id === matchedLeftId
              );
              const yLeft =
                (lIdx >= 0 ? lIdx : rIdx) * ROW_HEIGHT_PX + ROW_HEIGHT_PX / 2;
              const strokeColor =
                CONNECTION_STROKE_COLORS[
                  rIdx % CONNECTION_STROKE_COLORS.length
                ];

              return (
                <g key={rightItem.id}>
                  {/* Right & Left port circles in SVG */}
                  <circle cx="168" cy={yRight} r="5" fill="#4F46E5" />
                  <circle cx="12" cy={yLeft} r="5" fill="#0D9488" />

                  {mode === "worksheet" ? (
                    <line
                      x1="160"
                      y1={yRight}
                      x2="145"
                      y2={yRight}
                      stroke="#CBD5E1"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  ) : (
                    <path
                      d={`M 168 ${yRight} C 110 ${yRight}, 70 ${yLeft}, 12 ${yLeft}`}
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
        <div className="flex flex-col justify-between gap-2">
          <div className="rounded-lg bg-teal-100/80 px-2.5 py-1 text-center text-xs font-extrabold text-teal-950">
            {toEasternArabicNumerals(data.leftColumnTitleAr)}
          </div>
          {data.leftItems.map((item, idx) => (
            <div
              key={item.id}
              className="flex min-h-[76px] items-center justify-between rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 shadow-2xs"
              data-match-left-id={item.id}
            >
              <span
                className="h-4 w-4 rounded-full border-2 border-teal-600 bg-teal-100"
                aria-hidden="true"
              />
              <VisualModelView
                model={item.model}
                solved={mode === "answer-key"}
              />
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">
                {formatEasternNumber(idx + 1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Comparison Reasoning Sub-prompt */}
      {data.comparisonPromptAr && (
        <div className="flex items-center justify-between rounded-xl border border-amber-300 bg-amber-50/80 px-3.5 py-2 text-xs font-bold text-amber-950">
          <span>
            🤔 سؤال التفكير: {toEasternArabicNumerals(data.comparisonPromptAr)}
          </span>
          {mode === "answer-key" && data.comparisonAnswerAr ? (
            <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-white">
              الإجابة: {data.comparisonAnswerAr}
            </span>
          ) : (
            <span className="inline-block h-6 w-28 rounded-lg border-2 border-dashed border-amber-400 bg-white" />
          )}
        </div>
      )}
    </div>
  );
}

export const connectMatchArchetype = {
  id: "ConnectMatch" as const,
  displayNameAr: "صل بخط",
  generate: generateConnectMatchExercise,
  render: renderConnectMatchExercise,
};

registerExerciseArchetype(connectMatchArchetype);
