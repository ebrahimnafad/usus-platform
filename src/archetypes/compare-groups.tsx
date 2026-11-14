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
  /**
   * Icon catalog for the two groups (K-107/K-108 Problem of the Day use solid
   * shapes). Defaults to `everyday-objects`.
   */
  iconSetKind?: "everyday-objects" | "shapes-2d" | "solids-3d";
  /** `find-difference` only: explicit `[min, max]` cap on the difference (§6.2/§6.3 defaults by tier). */
  differenceRange?: [number, number];
  /** `find-difference` PoD: anchors the larger group at the range max (١٠) so the missing counters equal the difference. */
  anchorFullFrame?: boolean;
  /** `find-difference` ten-frame PoD: the smaller frame shows ghost counters for the missing shapes (solid on the Answer Key). */
  showMissingAsGhost?: boolean;
  /** `find-difference` Brain Builder: counts are given as data, only the difference slot is answered. */
  showCounts?: boolean;
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
  iconSetKind: "everyday-objects" | "shapes-2d" | "solids-3d";
  showCounts: boolean;
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

const DEFAULT_SOLID_PAIRS: Array<[string, string]> = [
  ["cube", "cone"],
  ["cylinder", "sphere"],
  ["cube", "cylinder"],
  ["pyramid", "cube"],
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

  const iconSetKind = params.iconSetKind ?? "everyday-objects";

  for (let idx = 0; idx < itemCount; idx++) {
    let cA: number;
    let cB: number;

    if (compareMode === "find-difference") {
      // §6.2/§6.3: Easy difference ≤ 2, Intermediate/Advanced ≤ 5, with
      // equal groups (difference = ٠) as an Advanced-only edge case.
      const tierDiffCap = ctx.difficultyLevel === "Easy" ? 2 : 5;
      const diffCap = Math.max(
        0,
        Math.min(params.differenceRange?.[1] ?? tierDiffCap, maxVal - minVal)
      );
      const isEqualCase = isAdvanced && ctx.rng.int(0, 3) === 0;
      if (isEqualCase) {
        cA = ctx.rng.int(minVal, maxVal);
        cB = cA;
      } else {
        const difference = ctx.rng.int(1, Math.max(1, diffCap));
        const larger = ctx.rng.int(minVal + difference, maxVal);
        if (ctx.rng.next() < 0.5) {
          cA = larger;
          cB = larger - difference;
        } else {
          cA = larger - difference;
          cB = larger;
        }
      }
      if (params.anchorFullFrame) {
        // K-108 Problem of the Day: anchor the larger group at ١٠ so the
        // missing ghost counters equal the difference, still within the
        // tier difference cap (§6.2). The anchored PoD always leaves some
        // missing shapes, so the equal case does not apply here.
        const anchoredDifference = ctx.rng.int(1, Math.max(1, diffCap));
        cA = maxVal;
        cB = maxVal - anchoredDifference;
      }
    } else {
      // Generate distinct counts (or equal only at Advanced difficulty per §6.3)
      cA = ctx.rng.int(minVal, maxVal);
      cB = ctx.rng.int(minVal, maxVal);

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
    const solidPair =
      DEFAULT_SOLID_PAIRS[
        (ctx.exerciseIndex + idx) % DEFAULT_SOLID_PAIRS.length
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
        iconKind:
          iconSetKind === "everyday-objects"
            ? "everyday-object"
            : iconSetKind === "shapes-2d"
              ? "shape-2d"
              : "solid-3d",
        ...(iconSetKind === "everyday-objects" ? { objectId: objA } : {}),
        ...(iconSetKind === "shapes-2d" ? { shapeId: shapePair[0] } : {}),
        ...(iconSetKind === "solids-3d" ? { solidId: solidPair[0] } : {}),
        colorTheme: "coral",
      };
      const groupBSpec: LinearComparisonGroupSpec = {
        id: `group-b-${idx}`,
        labelAr: "(ب)",
        count: cB,
        iconKind:
          iconSetKind === "everyday-objects"
            ? "everyday-object"
            : iconSetKind === "shapes-2d"
              ? "shape-2d"
              : "solid-3d",
        ...(iconSetKind === "everyday-objects" ? { objectId: objB } : {}),
        ...(iconSetKind === "shapes-2d" ? { shapeId: shapePair[1] } : {}),
        ...(iconSetKind === "solids-3d" ? { solidId: solidPair[1] } : {}),
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
      // K-108 PoD: the smaller frame carries ghost counters for the missing
      // shapes; they become solid on the Answer Key (§8.2).
      const missingGhostCount =
        params.showMissingAsGhost && moreGroup !== "equal" ? difference : 0;
      const smallerIsA = cA < cB;
      const ghostOnA = missingGhostCount > 0 && smallerIsA;
      const ghostOnB = missingGhostCount > 0 && !smallerIsA;

      visualModel = createTenFrameSpec({
        count: cA,
        colorTheme: "coral",
        shapeId: iconSetKind === "solids-3d" ? undefined : shapePair[0],
        solidId: iconSetKind === "solids-3d" ? solidPair[0] : undefined,
        highlightEmptySlots: true,
        ghostTargetCount: ghostOnA ? missingGhostCount : 0,
      });
      secondaryVisualModel = createTenFrameSpec({
        count: cB,
        colorTheme: "sky",
        shapeId: iconSetKind === "solids-3d" ? undefined : shapePair[1],
        solidId: iconSetKind === "solids-3d" ? solidPair[1] : undefined,
        highlightEmptySlots: true,
        ghostTargetCount: ghostOnB ? missingGhostCount : 0,
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
        ? `(أ) = ${cAAr} و(ب) = ${cBAr} متساويتان، الفرق ٠`
        : compareMode === "find-difference"
          ? `(أ) = ${cAAr} و(ب) = ${cBAr}، والفرق ${formatEasternNumber(difference)}`
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
      : compareMode === "find-difference"
        ? params.showCounts
          ? "انظر إلى العددين المعطى، ثم اكتب الفرق بينهما في المربع:"
          : visualKind === "ten-frame-pair"
            ? "انظر إلى لوحتي العشرة، ثم عدّ الأقراص واكتب العددين والفرق بينهما:"
            : "انظر إلى الصفّين، ثم عدّ قطع كلّ صفّ واكتب العددين والفرق بينهما:"
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

  const hasEqualPair = items.some((item) => item.difference === 0);
  const defaultStrategyHintAr =
    compareMode === "find-difference"
      ? hasEqualPair
        ? `انظر إلى المجموعتين المتساويتين — الفرق ٠ (${factSummaries.join("؛ ")}).`
        : params.showMissingAsGhost
          ? `انظر إلى الأشكال الناقصة في اللوحة الأقل ثم اكتب عددها (${factSummaries.join("؛ ")}).`
          : visualKind === "linear-comparison"
            ? `انظر إلى القطع الزائدة في الصفّ الأطول ثم اكتب عددها (${factSummaries.join("؛ ")}).`
            : `انظر إلى الأقراص الزائدة في اللوحة الأكثر ثم اكتب الفرق (${factSummaries.join("؛ ")}).`
      : params.strategy === "compare-the-parts"
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
    iconSetKind,
    showCounts: params.showCounts ?? false,
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
      compareMode === "find-difference"
        ? "مقارنة المجموعات: كم أكثر أو كم أقل"
        : compareMode === "quantify-and-compare"
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
                {/* Find-difference mode (K-107/K-108): count slots + difference slot */}
                {data.compareMode === "find-difference" && (
                  <div
                    className="flex flex-wrap items-center justify-center gap-4"
                    data-find-difference="true"
                  >
                    {data.showCounts ? (
                      // Brain Builder: the counts are given as data
                      <>
                        <span className="text-[13px] font-extrabold text-slate-700">
                          (أ) = {countAAr}
                        </span>
                        <span className="text-[13px] font-extrabold text-slate-700">
                          (ب) = {countBAr}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-extrabold text-slate-700">
                            عدد (أ):
                          </span>
                          <AnswerSlot
                            answer={countAAr}
                            solved={isAnswerKey}
                            kind="write"
                            tone="coral"
                            ariaLabel="مربع كتابة عدد قطع المجموعة أ"
                            solvedDataAttributes={{
                              "data-solved-compare-count": countAAr,
                            }}
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
                            tone="sky"
                            ariaLabel="مربع كتابة عدد قطع المجموعة ب"
                            solvedDataAttributes={{
                              "data-solved-compare-count": countBAr,
                            }}
                          />
                        </div>
                      </>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-extrabold text-slate-700">
                        {item.difference === 0
                          ? "المجموعتان متساويتان:"
                          : item.targetComparison === "fewer"
                            ? "كم أقل؟"
                            : "كم أكثر؟"}
                      </span>
                      <AnswerSlot
                        answer={formatEasternNumber(item.difference)}
                        solved={isAnswerKey}
                        kind="write"
                        tone="emerald"
                        ariaLabel="مربع كتابة الفرق بين المجموعتين"
                        solvedDataAttributes={{
                          "data-solved-compare-difference": String(
                            item.difference
                          ),
                        }}
                      />
                    </div>
                  </div>
                )}

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

                {/* Response choice: Circle group A or B (not used by find-difference) */}
                {data.compareMode !== "find-difference" &&
                  (data.responseKind === "circle" ? (
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
                  ))}
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
