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
import { selectSubtractionFacts } from "@/lib/part-whole-facts";
import {
  createDicePatternSpec,
  createDigitCardSpec,
  createFiveFrameSpec,
  createSnapCubesSpec,
  createTallyMarksSpec,
  type CrossOffMode,
} from "@/visual-models/unit-2-models";
import {
  createEquationStripSpec,
  createNumberBondSpec,
  type BondMissingPosition,
  type EquationLayout,
} from "@/visual-models/unit-3-models";
import { VisualModelView } from "@/visual-models/registry";
import { AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export type TakeAwayRepresentation =
  | "five-frame"
  | "five-frame-and-digit"
  | "snap-cubes"
  | "tally-marks"
  | "dice"
  | "domino";

export type TakeAwayResponseForm = "number-bond" | "equation" | "answer-slot";

export type TakeAwayAction =
  "trace" | "write" | "cross-off-and-write" | "draw-and-cross-off";

export type TakeAwayUnknownKind = "missingPart" | "partTakenAway" | "total";

export interface TakeAwayBlueprintParams {
  representation?: TakeAwayRepresentation;
  allowedRepresentations?: TakeAwayRepresentation[];
  responseForm?: TakeAwayResponseForm;
  action?: TakeAwayAction;
  crossOffMode?: CrossOffMode | "none";
  totalRange?: [number, number];
  minPart?: number;
  itemCount?: number;
  unknownPosition?: TakeAwayUnknownKind;
  swapBondParts?: boolean;
  equationLayout?: EquationLayout;
  showCompanionBond?: boolean;
  firstItemWorkedExample?: boolean;
  showTermLabels?: boolean;
}

export interface TakeAwayItem {
  id: string;
  itemIndex: number;
  total: number;
  partTakenAway: number;
  missingPart: number;
  totalAr: string;
  partTakenAwayAr: string;
  missingPartAr: string;
  factKey: string;
  representation: TakeAwayRepresentation;
  crossOffMode: CrossOffMode | "none";
  unknownKind: TakeAwayUnknownKind;
  unknownPosition: BondMissingPosition;
  swapBondParts: boolean;
  tracePositions: Array<"total" | "part1" | "part2">;
  representationModel: VisualModelSpec;
  companionDigitModel?: VisualModelSpec;
  responseModel?: VisualModelSpec;
  companionBondModel?: VisualModelSpec;
}

export interface TakeAwayData extends GenericArchetypeData {
  kind: "TakeAway";
  representation: TakeAwayRepresentation;
  responseForm: TakeAwayResponseForm;
  action: TakeAwayAction;
  showTermLabels?: boolean;
  items: TakeAwayItem[];
}

const COLOR_PAIRS: Array<[ColorThemeId, ColorThemeId]> = [
  ["coral", "sky"],
  ["emerald", "amber"],
  ["violet", "teal"],
  ["rose", "indigo"],
];

function buildTakeAwayRepresentationModel(params: {
  representation: TakeAwayRepresentation;
  total: number;
  partTakenAway: number;
  missingPart: number;
  action: TakeAwayAction;
  crossOffMode: CrossOffMode | "none";
  primaryTheme: ColorThemeId;
  secondaryTheme: ColorThemeId;
}): VisualModelSpec {
  const {
    representation,
    total,
    partTakenAway,
    missingPart,
    action,
    crossOffMode,
    primaryTheme,
    secondaryTheme,
  } = params;
  const totalAr = formatEasternNumber(total);
  const partAr = formatEasternNumber(partTakenAway);
  const missingAr = formatEasternNumber(missingPart);

  const effectiveCrossedOut = crossOffMode === "none" ? 0 : partTakenAway;
  const effectiveCrossOffMode: CrossOffMode =
    crossOffMode === "student" ? "student" : "shown";

  if (representation === "five-frame-and-digit") {
    return createFiveFrameSpec({
      count: total,
      secondaryCount: 0,
      crossedOutCount: effectiveCrossedOut,
      crossOffMode: effectiveCrossOffMode,
      colorTheme: primaryTheme,
      highlightEmptySlots: true,
      labelAr: `لوحة الخمسة: الكلّ ${totalAr} ناقص الرقم ${partAr}`,
    });
  }

  if (representation === "five-frame") {
    if (action === "draw-and-cross-off") {
      // Student draws the Total (all `total` counters start as ghost outlines) then crosses off `partTakenAway`
      return createFiveFrameSpec({
        count: 0,
        secondaryCount: 0,
        ghostTargetCount: total,
        crossedOutCount: effectiveCrossedOut,
        crossOffMode: "student",
        colorTheme: primaryTheme,
        secondaryColorTheme: secondaryTheme,
        highlightEmptySlots: true,
        labelAr: `لوحة الخمسة: ارسم الكلّ ${totalAr} واشطب ${partAr} فيبقى ${missingAr}`,
      });
    }

    return createFiveFrameSpec({
      count: total,
      secondaryCount: 0,
      crossedOutCount: effectiveCrossedOut,
      crossOffMode: effectiveCrossOffMode,
      colorTheme: primaryTheme,
      highlightEmptySlots: true,
      labelAr: `لوحة الخمسة: الكلّ ${totalAr} شُطب منها ${partAr} وبقي ${missingAr}`,
    });
  }

  if (representation === "snap-cubes") {
    return createSnapCubesSpec({
      count: Math.max(1, total),
      secondaryCount: 0,
      crossedOutCount: effectiveCrossedOut,
      crossOffMode: effectiveCrossOffMode,
      orientation: "horizontal",
      compact: true,
      colorTheme: primaryTheme,
      labelAr: `مكعبات متداخلة: الكلّ ${totalAr} شُطب منها ${partAr} وبقي ${missingAr}`,
    });
  }

  if (representation === "tally-marks") {
    return createTallyMarksSpec({
      count: Math.max(1, total),
      crossedOutCount: Math.max(0, effectiveCrossedOut),
      crossOffMode: effectiveCrossOffMode,
      compact: true,
      colorTheme: primaryTheme,
      labelAr: `علامات العدّ: الكلّ ${totalAr} شُطب منها ${partAr} وبقي ${missingAr}`,
    });
  }

  if (representation === "domino") {
    return createDicePatternSpec({
      count: missingPart,
      secondaryCount: partTakenAway,
      crossedOutCount: effectiveCrossedOut,
      crossOffMode: effectiveCrossOffMode,
      diceVariant: "domino",
      colorTheme: primaryTheme,
      secondaryColorTheme: secondaryTheme,
      hideLabel: true,
      compact: true,
      labelAr: `دومينو: الكلّ ${totalAr} شُطب منها ${partAr} وبقي ${missingAr}`,
    });
  }

  // representation === "dice"
  return createDicePatternSpec({
    count: Math.max(1, total),
    secondaryCount: 0,
    crossedOutCount: effectiveCrossedOut,
    crossOffMode: effectiveCrossOffMode,
    diceVariant: "die",
    colorTheme: primaryTheme,
    secondaryColorTheme: secondaryTheme,
    hideLabel: true,
    compact: true,
    labelAr: `نقاط النرد: الكلّ ${totalAr} شُطب منها ${partAr} وبقي ${missingAr}`,
  });
}

function generateTakeAwayExercise(ctx: ArchetypeGeneratorContext): Exercise {
  const params = (ctx.spec.params ?? {}) as TakeAwayBlueprintParams;

  const defaultAction: TakeAwayAction =
    ctx.difficultyLevel === "Easy"
      ? "trace"
      : ctx.difficultyLevel === "Intermediate"
        ? "write"
        : "draw-and-cross-off";
  const action: TakeAwayAction = params.action ?? defaultAction;

  const defaultResponseForm: TakeAwayResponseForm =
    ctx.lesson.lessonNumber <= 40
      ? "number-bond"
      : ctx.lesson.lessonNumber === 41
        ? "answer-slot"
        : "equation";
  const responseForm: TakeAwayResponseForm =
    params.responseForm ?? defaultResponseForm;

  const representationPool: TakeAwayRepresentation[] =
    params.allowedRepresentations && params.allowedRepresentations.length > 0
      ? params.allowedRepresentations
      : [params.representation ?? "five-frame"];

  const itemCount = Math.max(1, Math.min(2, params.itemCount ?? 2));

  const usesZeroCapableModel = representationPool.every(
    (r) => r === "five-frame" || r === "domino" || r === "five-frame-and-digit"
  );
  const effectiveMinPart =
    params.minPart !== undefined
      ? params.minPart
      : ctx.difficultyLevel === "Advanced" && usesZeroCapableModel
        ? 0
        : 1;

  const facts = selectSubtractionFacts(
    ctx.rng,
    ctx.difficultyLevel,
    {
      totalRange: params.totalRange,
      minPart: effectiveMinPart,
      count: itemCount,
    },
    ctx.usedFacts
  );

  // Unknown position rule: Missing Part is unknown, except Part taken away may be unknown only at Advanced or in Challenge & Assessment (§6.3)
  const allowNonStandardUnknown =
    ctx.sectionId === "challenge" || ctx.difficultyLevel === "Advanced";
  const requestedUnknown = params.unknownPosition ?? "missingPart";
  const resolvedUnknownKind: TakeAwayUnknownKind =
    requestedUnknown !== "missingPart" && allowNonStandardUnknown
      ? requestedUnknown
      : "missingPart";

  // Number Bond puts the Part taken away in the right circle (part1) and Missing Part on the left (part2); swapped only at Advanced
  const swapBondParts =
    Boolean(params.swapBondParts) && ctx.difficultyLevel === "Advanced";

  const items: TakeAwayItem[] = facts.map((fact, idx) => {
    const [primaryTheme, secondaryTheme] =
      COLOR_PAIRS[idx % COLOR_PAIRS.length];
    const itemRep = representationPool[idx % representationPool.length];
    const isWorkedExample = Boolean(params.firstItemWorkedExample && idx === 0);

    // When action === "draw-and-cross-off" on a non-five-frame model, fall back to "student" cross-off
    const itemAction: TakeAwayAction =
      action === "draw-and-cross-off" && itemRep !== "five-frame"
        ? "cross-off-and-write"
        : action;
    const itemCrossOffMode: CrossOffMode | "none" =
      params.crossOffMode ??
      (itemAction === "cross-off-and-write" ||
      itemAction === "draw-and-cross-off"
        ? "student"
        : "shown");

    const bondPart1 = swapBondParts ? fact.missingPart : fact.partTakenAway;
    const bondPart2 = swapBondParts ? fact.partTakenAway : fact.missingPart;

    const bondMissingPos: BondMissingPosition = isWorkedExample
      ? "none"
      : resolvedUnknownKind === "total"
        ? "total"
        : resolvedUnknownKind === "partTakenAway"
          ? swapBondParts
            ? "part2"
            : "part1"
          : swapBondParts
            ? "part1"
            : "part2";

    const eqMissingPos: BondMissingPosition = isWorkedExample
      ? "none"
      : resolvedUnknownKind === "total"
        ? "total"
        : resolvedUnknownKind === "partTakenAway"
          ? "part1"
          : "part2";

    const tracePositions: Array<"total" | "part1" | "part2"> = isWorkedExample
      ? ["total", "part1", "part2"]
      : action === "trace"
        ? ["total", "part1"]
        : [];

    const representationModel = buildTakeAwayRepresentationModel({
      representation: itemRep,
      total: fact.total,
      partTakenAway: fact.partTakenAway,
      missingPart: fact.missingPart,
      action: itemAction,
      crossOffMode: itemCrossOffMode,
      primaryTheme,
      secondaryTheme,
    });

    const responseModel =
      responseForm === "answer-slot"
        ? undefined
        : responseForm === "number-bond"
          ? createNumberBondSpec({
              part1: bondPart1,
              part2: bondPart2,
              total: fact.total,
              missingPosition: bondMissingPos,
              slotKind: "unknown",
              tracePositions:
                swapBondParts && action === "trace" && !isWorkedExample
                  ? ["total", "part2"]
                  : tracePositions,
              colorTheme: primaryTheme,
              secondaryColorTheme: secondaryTheme,
            })
          : createEquationStripSpec({
              operation: "subtract",
              total: fact.total,
              part1: fact.partTakenAway,
              part2: fact.missingPart,
              layout: params.equationLayout ?? "standard",
              missingPosition: eqMissingPos,
              slotKind: "unknown",
              tracePositions,
            });

    const companionBondModel = params.showCompanionBond
      ? createNumberBondSpec({
          part1: bondPart1,
          part2: bondPart2,
          total: fact.total,
          missingPosition: bondMissingPos,
          slotKind: "unknown",
          tracePositions:
            swapBondParts && action === "trace" && !isWorkedExample
              ? ["total", "part2"]
              : tracePositions,
          colorTheme: primaryTheme,
          secondaryColorTheme: secondaryTheme,
        })
      : undefined;

    const companionDigitModel =
      itemRep === "five-frame-and-digit"
        ? createDigitCardSpec(fact.partTakenAway, {
            colorTheme: secondaryTheme,
            labelAr: `الرقم ${formatEasternNumber(fact.partTakenAway)}`,
          })
        : undefined;

    return {
      id: `take-away-item-${idx + 1}-${fact.key}`,
      itemIndex: idx,
      total: fact.total,
      partTakenAway: fact.partTakenAway,
      missingPart: fact.missingPart,
      totalAr: formatEasternNumber(fact.total),
      partTakenAwayAr: formatEasternNumber(fact.partTakenAway),
      missingPartAr: formatEasternNumber(fact.missingPart),
      factKey: fact.key,
      representation: itemRep,
      crossOffMode: itemCrossOffMode,
      unknownKind: resolvedUnknownKind,
      unknownPosition:
        responseForm === "equation" ? eqMissingPos : bondMissingPos,
      swapBondParts,
      tracePositions,
      representationModel,
      companionDigitModel,
      responseModel,
      companionBondModel,
    };
  });

  const visualModels: VisualModelSpec[] = [];
  for (const item of items) {
    visualModels.push(item.representationModel);
    if (item.companionDigitModel) {
      visualModels.push(item.companionDigitModel);
    }
    if (item.responseModel) {
      visualModels.push(item.responseModel);
    }
    if (item.companionBondModel) {
      visualModels.push(item.companionBondModel);
    }
  }

  const factsSummaryAr = items
    .map((it) => `${it.totalAr} − ${it.partTakenAwayAr} = ${it.missingPartAr}`)
    .join("؛ ");

  const defaultPromptAr =
    responseForm === "number-bond"
      ? action === "cross-off-and-write" || action === "draw-and-cross-off"
        ? "اشطب الجزء المعطى على لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد:"
        : "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد:"
      : responseForm === "answer-slot"
        ? "اشطب الجزء المعطى في كل نموذج، ثم اكتب كم بقي؟"
        : "اطرح الجزء المعطى من الكلّ، ثم اكتب الجزء الناقص في المعادلة:";

  const defaultStrategyHintAr = `اشطب الجزء من الكلّ، ثم عدّ كم بقي لإيجاد الجزء الناقص (${factsSummaryAr}).`;

  const data: TakeAwayData = {
    kind: "TakeAway",
    representation: representationPool[0],
    responseForm,
    action,
    showTermLabels: Boolean(params.showTermLabels),
    items,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "TakeAway",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "اطرح لإيجاد الجزء الناقص",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function renderTakeAwayExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as TakeAwayData;
  const isAnswerKey = mode === "answer-key";
  const columns = data.items.length === 1 ? 1 : 2;

  return (
    <div
      className="space-y-1"
      data-archetype="TakeAway"
      data-response-form={data.responseForm}
      data-action={data.action}
    >
      <ExerciseColumns columns={columns}>
        {data.items.map((item, idx) => {
          const solvedUnknownAr =
            item.unknownKind === "partTakenAway"
              ? item.partTakenAwayAr
              : item.unknownKind === "total"
                ? item.totalAr
                : item.missingPartAr;

          const worksheetSummaryAr =
            item.unknownKind === "partTakenAway"
              ? `الكلّ ${item.totalAr} وبقي ${item.missingPartAr}`
              : item.unknownKind === "total"
                ? `شُطب ${item.partTakenAwayAr} وبقي ${item.missingPartAr}`
                : `${item.totalAr} − ${item.partTakenAwayAr}`;

          const isWideModelInMultiColumn =
            columns !== 1 &&
            (item.representation === "five-frame" ||
              item.representation === "five-frame-and-digit");

          return (
            <div
              key={item.id}
              className={`${
                columns === 1
                  ? "flex items-center justify-around gap-3 px-3 py-1"
                  : "flex flex-col items-center justify-between gap-0.5 px-1 py-0.5"
              } rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/25 shadow-2xs`}
              data-take-away-item-id={toEasternArabicNumerals(item.id)}
              data-fact={toEasternArabicNumerals(item.factKey)}
            >
              {/* Item header bar + Concrete/Pictorial Representation (CODING_STANDARDS.md §5) */}
              {isWideModelInMultiColumn ? (
                <div className="flex w-full flex-1 flex-col items-center justify-center gap-0.5">
                  <div className="flex w-full items-center justify-between">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
                      {formatEasternNumber(idx + 1)}
                    </span>
                    {isAnswerKey ? (
                      <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
                        {solvedUnknownAr}
                      </span>
                    ) : (
                      <span className="text-[13px] font-extrabold leading-none text-slate-600">
                        {worksheetSummaryAr}
                      </span>
                    )}
                  </div>
                  <div className="flex w-full items-center justify-center gap-1">
                    <VisualModelView
                      model={item.representationModel}
                      solved={isAnswerKey}
                    />
                    {item.companionDigitModel && (
                      <div className="flex items-center gap-1">
                        <span
                          className="text-[28px] font-black leading-none text-indigo-700"
                          aria-hidden="true"
                        >
                          −
                        </span>
                        <VisualModelView
                          model={item.companionDigitModel}
                          solved={isAnswerKey}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className={`flex flex-1 items-center ${
                    columns === 1 ? "gap-3" : "w-full justify-between gap-1"
                  }`}
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
                    {formatEasternNumber(idx + 1)}
                  </span>
                  <div className="flex flex-1 items-center justify-center gap-1">
                    <VisualModelView
                      model={item.representationModel}
                      solved={isAnswerKey}
                    />
                    {item.companionDigitModel && (
                      <div className="flex items-center gap-1">
                        <span
                          className="text-[28px] font-black leading-none text-indigo-700"
                          aria-hidden="true"
                        >
                          −
                        </span>
                        <VisualModelView
                          model={item.companionDigitModel}
                          solved={isAnswerKey}
                        />
                      </div>
                    )}
                  </div>
                  {isAnswerKey ? (
                    <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
                      {solvedUnknownAr}
                    </span>
                  ) : (
                    <span className="text-[13px] font-extrabold leading-none text-slate-600">
                      {worksheetSummaryAr}
                    </span>
                  )}
                </div>
              )}

              {/* Response Form (Number Bond, Equation Strip, or كم بقي؟ Answer Slot) */}
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {data.responseForm === "answer-slot" ? (
                  <div
                    dir="rtl"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-2.5 py-1 shadow-2xs"
                    data-take-away-slot-box="true"
                  >
                    {data.action === "trace" && (
                      <div className="inline-flex items-center gap-1 border-l border-slate-200 pl-2">
                        <span
                          className={`text-[28px] font-black leading-none ${
                            isAnswerKey ? "text-emerald-700" : "text-slate-400"
                          }`}
                          data-trace-state={isAnswerKey ? "solid" : "dotted"}
                        >
                          {item.totalAr}
                        </span>
                        <span
                          className="text-[28px] font-black leading-none text-indigo-700"
                          aria-hidden="true"
                        >
                          −
                        </span>
                        <span
                          className={`text-[28px] font-black leading-none ${
                            isAnswerKey ? "text-emerald-700" : "text-slate-400"
                          }`}
                          data-trace-state={isAnswerKey ? "solid" : "dotted"}
                        >
                          {item.partTakenAwayAr}
                        </span>
                      </div>
                    )}
                    <span className="text-[13px] font-extrabold leading-none text-indigo-950">
                      كم بقي؟
                    </span>
                    <AnswerSlot
                      solved={isAnswerKey}
                      answer={solvedUnknownAr}
                      ariaLabel="مربع كتابة الجزء الناقص (كم بقي؟)"
                      kind="unknown"
                      tone="amber"
                      solvedDataAttributes={{
                        "data-solved-take-away": solvedUnknownAr,
                      }}
                    />
                  </div>
                ) : (
                  item.responseModel && (
                    <VisualModelView
                      model={item.responseModel}
                      solved={isAnswerKey}
                    />
                  )
                )}
                {item.companionBondModel && (
                  <VisualModelView
                    model={item.companionBondModel}
                    solved={isAnswerKey}
                  />
                )}
              </div>

              {/* Optional term labels (K-48: label the total and parts) */}
              {data.showTermLabels && (
                <div
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-50/70 px-2 py-0.5 text-[13px] font-extrabold text-indigo-950"
                  data-term-labels="true"
                >
                  <span className="text-indigo-900">
                    الكلّ{isAnswerKey ? ` (${item.totalAr})` : ""}
                  </span>
                  <span className="text-indigo-400">−</span>
                  <span className="text-sky-900">
                    الجزء{isAnswerKey ? ` (${item.partTakenAwayAr})` : ""}
                  </span>
                  <span className="text-indigo-400">=</span>
                  <span className="text-amber-900">
                    الجزء{isAnswerKey ? ` (${item.missingPartAr})` : ""}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </ExerciseColumns>
    </div>
  );
}

registerExerciseArchetype({
  id: "TakeAway",
  displayNameAr: "اطرح",
  generate: generateTakeAwayExercise,
  render: renderTakeAwayExercise,
});
