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
import { AnswerLine, AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import { VisualModelView } from "@/visual-models/registry";
import {
  createLinearComparisonSpec,
  type LinearComparisonGroupSpec,
} from "@/visual-models/linear-comparison";
import { createTenFrameSpec } from "@/visual-models/unit-2-models";
import { EVERYDAY_OBJECT_CATALOG } from "@/visual-models/everyday-objects";
import { SHAPE_2D_CATALOG } from "@/visual-models/shapes-solids-coins";

export type CompareGroupsMode =
  "compare-only" | "quantify-and-compare" | "find-difference";

export type CompareGroupsVisualKind = "linear-comparison" | "ten-frame-pair";

export type CompareGroupsResponseKind = "circle" | "fill-keyword";

export interface CompareGroupsBlueprintParams {
  compareMode?: CompareGroupsMode;
  visualKind?: CompareGroupsVisualKind;
  targetComparison?: "more" | "fewer";
  responseKind?: CompareGroupsResponseKind;
  numberRange?: [number, number];
  itemCount?: number;
  strategy?: "extra-objects" | "compare-the-parts";
}

export interface CompareGroupsItem {
  id: string;
  countA: number;
  countB: number;
  labelAAr: string;
  labelBAr: string;
  moreGroup: "A" | "B" | "equal";
  fewerGroup: "A" | "B" | "equal";
  targetComparison: "more" | "fewer";
  winningGroup: "A" | "B" | "equal";
  difference: number;
  visualKind: CompareGroupsVisualKind;
  visualModel: VisualModelSpec;
  secondaryVisualModel?: VisualModelSpec; // for ten-frame-pair Group B
  keywordAr: string;
}

export interface CompareGroupsData extends GenericArchetypeData {
  kind: "CompareGroups";
  compareMode: CompareGroupsMode;
  visualKind: CompareGroupsVisualKind;
  responseKind: CompareGroupsResponseKind;
  targetComparison: "more" | "fewer";
  strategy?: "extra-objects" | "compare-the-parts";
  items: CompareGroupsItem[];
}

const DEFAULT_OBJECT_PAIRS: Array<[string, string]> = [
  ["apple", "banana"],
  ["star", "ball"],
  ["car", "train"],
  ["cat", "bird"],
  ["orange", "strawberry"],
  ["flower", "tree"],
];

const DEFAULT_SHAPE_PAIRS: Array<[string, string]> = [
  ["circle", "triangle"],
  ["square", "circle"],
  ["triangle", "square"],
];

export function generateCompareGroupsExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as CompareGroupsBlueprintParams;
  const compareMode: CompareGroupsMode = params.compareMode ?? "compare-only";
  const visualKind: CompareGroupsVisualKind =
    params.visualKind ?? "linear-comparison";
  const targetComparison: "more" | "fewer" = params.targetComparison ?? "more";
  const responseKind: CompareGroupsResponseKind =
    params.responseKind ?? "circle";
  const numberRange = params.numberRange ?? [1, 10];
  const itemCount = Math.max(1, Math.min(2, params.itemCount ?? 1));

  const minVal = Math.max(1, numberRange[0]);
  const maxVal = Math.min(10, numberRange[1]);
  const isAdvanced = ctx.difficultyLevel === "Advanced";

  const items: CompareGroupsItem[] = [];
  const factSummaries: string[] = [];

  for (let idx = 0; idx < itemCount; idx++) {
    // Generate distinct counts (or equal only at Advanced difficulty per §6.3)
    let cA = ctx.rng.int(minVal, maxVal);
    let cB = ctx.rng.int(minVal, maxVal);

    if (!isAdvanced && cA === cB) {
      if (cA < maxVal) cA += 1;
      else cB -= 1;
    }

    // In compare-the-parts mode (K-100/K-102 PoD): make top rows both full (≥5)
    // to highlight the strategy of balancing the top row and comparing remaining ones
    if (
      params.strategy === "compare-the-parts" &&
      visualKind === "ten-frame-pair"
    ) {
      cA = Math.max(5, cA);
      cB = Math.max(5, cB);
      if (cA === cB && !isAdvanced) {
        if (cA < maxVal) cA += 1;
        else cB -= 1;
      }
    }

    const moreGroup = cA > cB ? "A" : cB > cA ? "B" : "equal";
    const fewerGroup = cA < cB ? "A" : cB < cA ? "B" : "equal";
    const winningGroup = targetComparison === "fewer" ? fewerGroup : moreGroup;
    const difference = Math.abs(cA - cB);

    const pairIdx = (ctx.exerciseIndex + idx) % DEFAULT_OBJECT_PAIRS.length;
    const [objA, objB] = DEFAULT_OBJECT_PAIRS[pairIdx];
    const shapePair =
      DEFAULT_SHAPE_PAIRS[
        (ctx.exerciseIndex + idx) % DEFAULT_SHAPE_PAIRS.length
      ];

    const labelAAr = "المجموعة (أ)";
    const labelBAr = "المجموعة (ب)";

    let visualModel: VisualModelSpec;
    let secondaryVisualModel: VisualModelSpec | undefined = undefined;

    if (visualKind === "linear-comparison") {
      const groupASpec: LinearComparisonGroupSpec = {
        id: `group-a-${idx}`,
        labelAr: "(أ)",
        count: cA,
        iconKind: "everyday-object",
        objectId: objA,
        colorTheme: "coral",
      };
      const groupBSpec: LinearComparisonGroupSpec = {
        id: `group-b-${idx}`,
        labelAr: "(ب)",
        count: cB,
        iconKind: "everyday-object",
        objectId: objB,
        colorTheme: "sky",
      };

      visualModel = createLinearComparisonSpec({
        id: `linear-comp-item-${idx + 1}`,
        groupA: groupASpec,
        groupB: groupBSpec,
        targetComparison,
        circledGroup: winningGroup === "equal" ? "none" : winningGroup,
      });
    } else {
      // ten-frame-pair
      visualModel = createTenFrameSpec({
        count: cA,
        colorTheme: "coral",
        shapeId: shapePair[0],
        highlightEmptySlots: true,
      });
      secondaryVisualModel = createTenFrameSpec({
        count: cB,
        colorTheme: "sky",
        shapeId: shapePair[1],
        highlightEmptySlots: true,
      });
    }

    const keywordAr =
      winningGroup === "A"
        ? "(أ) أكثر"
        : winningGroup === "B"
          ? "(ب) أكثر"
          : "متساويتان";

    items.push({
      id: `item-${idx + 1}`,
      countA: cA,
      countB: cB,
      labelAAr,
      labelBAr,
      moreGroup,
      fewerGroup,
      targetComparison,
      winningGroup,
      difference,
      visualKind,
      visualModel,
      secondaryVisualModel,
      keywordAr,
    });

    const cAAr = formatEasternNumber(cA);
    const cBAr = formatEasternNumber(cB);
    const winAr =
      winningGroup === "A"
        ? "(أ)"
        : winningGroup === "B"
          ? "(ب)"
          : "المجموعتان";
    factSummaries.push(
      winningGroup === "equal"
        ? `(أ) = ${cAAr} و(ب) = ${cBAr} متساويتان`
        : targetComparison === "fewer"
          ? `(أ) = ${cAAr} و(ب) = ${cBAr}، والمجموعة الأقل هي ${winAr}`
          : `(أ) = ${cAAr} و(ب) = ${cBAr}، والمجموعة الأكثر هي ${winAr}`
    );
  }

  const defaultPromptAr =
    responseKind === "fill-keyword"
      ? targetComparison === "fewer"
        ? "انظر إلى المجموعتين، ثم اكتب أيّهما تحوي أقل:"
        : "انظر إلى المجموعتين، ثم اكتب أيّهما تحوي أكثر:"
      : compareMode === "quantify-and-compare"
        ? visualKind === "ten-frame-pair"
          ? targetComparison === "fewer"
            ? "انظر إلى لوحتي العشرة، ثم اكتب العدد وحوّط الأقل:"
            : "انظر إلى لوحتي العشرة، ثم اكتب العدد وحوّط الأكثر:"
          : targetComparison === "fewer"
            ? "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأقل:"
            : "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأكثر:"
        : targetComparison === "fewer"
          ? "انظر إلى المجموعتين، ثم حوّط المجموعة التي تحوي أقل:"
          : "انظر إلى المجموعتين، ثم حوّط المجموعة التي تحوي أكثر:";

  const defaultStrategyHintAr =
    params.strategy === "compare-the-parts"
      ? `انظر إلى الأجزاء المتطابقة في الصف الأول أولاً، ثم حوّط المجموعة التي تحوي قطعاً إضافية (${factSummaries.join("؛ ")}).`
      : visualKind === "linear-comparison"
        ? `انظر إلى التقابل بين الصفين لتحديد القطع الزائدة، ثم حوّط المجموعة (${factSummaries.join("؛ ")}).`
        : `انظر إلى الخانات الممتلئة في كل لوحة عشرة، ثم حوّط المجموعة المطلوبة (${factSummaries.join("؛ ")}).`;

  const data: CompareGroupsData = {
    kind: "CompareGroups",
    compareMode,
    visualKind,
    responseKind,
    targetComparison,
    strategy: params.strategy,
    items,
  };

  const allModels: VisualModelSpec[] = [];
  for (const item of items) {
    allModels.push(item.visualModel);
    if (item.secondaryVisualModel) {
      allModels.push(item.secondaryVisualModel);
    }
  }

  return {
    id: `compare-groups-${ctx.sourceLessonId}-${ctx.exerciseIndex + 1}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "CompareGroups",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr:
      compareMode === "quantify-and-compare"
        ? "مقارنة المجموعات وعدّها"
        : "مقارنة المجموعات",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels: allModels,
    data,
  };
}

export function renderCompareGroupsExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as CompareGroupsData;
  const isAnswerKey = mode === "answer-key";

  return (
    <ExerciseColumns columns={1}>
      <div className="flex flex-col gap-3 py-1" dir="rtl">
        {data.items.map((item) => {
          const isWinA = isAnswerKey && item.winningGroup === "A";
          const isWinB = isAnswerKey && item.winningGroup === "B";
          const countAAr = formatEasternNumber(item.countA);
          const countBAr = formatEasternNumber(item.countB);

          return (
            <div
              key={item.id}
              className="flex flex-col items-center gap-1.5 w-full"
              data-compare-item={item.id}
            >
              {/* Visual representation */}
              {item.visualKind === "linear-comparison" ? (
                <div className="flex w-full justify-center">
                  <VisualModelView
                    model={item.visualModel}
                    solved={isAnswerKey}
                  />
                </div>
              ) : (
                /* ten-frame-pair: two 240px ten-frames side by side */
                <div className="flex w-full items-center justify-center gap-6">
                  {/* Group A */}
                  <div
                    className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-2 transition-all ${
                      isWinA
                        ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500 shadow-xs"
                        : "border-slate-200 bg-slate-50/40"
                    }`}
                    data-ten-frame-group="A"
                    {...(isWinA ? { "data-circled-group": "A" } : {})}
                  >
                    <span className="text-[13px] font-extrabold text-slate-800">
                      {item.labelAAr}
                    </span>
                    <VisualModelView
                      model={item.visualModel}
                      solved={isAnswerKey}
                    />
                  </div>

                  {/* Group B */}
                  {item.secondaryVisualModel && (
                    <div
                      className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-2 transition-all ${
                        isWinB
                          ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500 shadow-xs"
                          : "border-slate-200 bg-slate-50/40"
                      }`}
                      data-ten-frame-group="B"
                      {...(isWinB ? { "data-circled-group": "B" } : {})}
                    >
                      <span className="text-[13px] font-extrabold text-slate-800">
                        {item.labelBAr}
                      </span>
                      <VisualModelView
                        model={item.secondaryVisualModel}
                        solved={isAnswerKey}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Response controls */}
              <div className="flex w-full flex-wrap items-center justify-around gap-4 pt-1">
                {/* Quantify slots: show count boxes for A and B */}
                {data.compareMode === "quantify-and-compare" && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-extrabold text-slate-700">
                        عدد (أ):
                      </span>
                      <AnswerSlot
                        answer={countAAr}
                        solved={isAnswerKey}
                        kind="write"
                        ariaLabel="مربع كتابة عدد قطع المجموعة أ"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-extrabold text-slate-700">
                        عدد (ب):
                      </span>
                      <AnswerSlot
                        answer={countBAr}
                        solved={isAnswerKey}
                        kind="write"
                        ariaLabel="مربع كتابة عدد قطع المجموعة ب"
                      />
                    </div>
                  </div>
                )}

                {/* Response choice: Circle group A or B */}
                {data.responseKind === "circle" ? (
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-extrabold text-slate-700">
                      {item.targetComparison === "fewer"
                        ? "المجموعة الأقل:"
                        : "المجموعة الأكثر:"}
                    </span>
                    <span
                      data-choice="A"
                      {...(isWinA ? { "data-circled-choice": "true" } : {})}
                      className={`inline-flex h-8 min-w-16 items-center justify-center rounded-full px-3 text-[13px] font-extrabold leading-none transition-all ${
                        isWinA
                          ? "border-2 border-emerald-600 bg-emerald-100 text-emerald-950 ring-2 ring-emerald-500"
                          : "border-2 border-dashed border-slate-300 bg-slate-50 text-slate-800"
                      }`}
                    >
                      المجموعة (أ)
                    </span>
                    <span
                      data-choice="B"
                      {...(isWinB ? { "data-circled-choice": "true" } : {})}
                      className={`inline-flex h-8 min-w-16 items-center justify-center rounded-full px-3 text-[13px] font-extrabold leading-none transition-all ${
                        isWinB
                          ? "border-2 border-emerald-600 bg-emerald-100 text-emerald-950 ring-2 ring-emerald-500"
                          : "border-2 border-dashed border-slate-300 bg-slate-50 text-slate-800"
                      }`}
                    >
                      المجموعة (ب)
                    </span>
                  </div>
                ) : (
                  /* fill-keyword mode (PoD) */
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-extrabold text-slate-700">
                      {item.targetComparison === "fewer"
                        ? "المجموعة التي تحوي أقل هي:"
                        : "المجموعة التي تحوي أكثر هي:"}
                    </span>
                    <AnswerLine
                      answer={item.winningGroup === "A" ? "(أ)" : "(ب)"}
                      solved={isAnswerKey}
                      ariaLabel="سطر كتابة المجموعة التي تحوي أكثر أو أقل"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ExerciseColumns>
  );
}

// Register archetype
registerExerciseArchetype({
  id: "CompareGroups",
  displayNameAr: "مقارنة المجموعات",
  generate: generateCompareGroupsExercise,
  render: renderCompareGroupsExercise,
});
