import React from "react";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { PartWholeCardGrid } from "@/components/worksheet/PartWholeCardGrid";
import type {
  ColorThemeId,
  EverydayObjectId,
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import { COLOR_PAIRS, selectSubtractionFacts } from "@/lib/math-facts";
import { formatEasternNumber } from "@/lib/numerals";
import {
  buildAbstractResponseAndCompanionModels,
  isZeroCapableRepresentation,
} from "@/lib/part-whole-facts";
import { EVERYDAY_OBJECT_CATALOG } from "@/visual-models/everyday-objects";
import { createPictureGraphSpec } from "@/visual-models/picture-graphs";
import {
  createDicePatternSpec,
  createDigitCardSpec,
  createFiveFrameSpec,
  createSnapCubesSpec,
  createTallyMarksSpec,
  createTenFrameSpec,
  type CrossOffMode,
} from "@/visual-models/unit-2-models";
import type {
  BondMissingPosition,
  EquationLayout,
} from "@/visual-models/unit-3-models";

export type TakeAwayRepresentation =
  | "five-frame"
  | "five-frame-and-digit"
  | "ten-frame"
  | "ten-frame-and-digit"
  | "snap-cubes"
  | "tally-marks"
  | "dice"
  | "domino"
  | "picture-graph";

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
  solvedUnknownAr: string;
  representationModel?: VisualModelSpec;
  companionDigitModel?: VisualModelSpec;
  responseModel?: VisualModelSpec;
  companionBondModel?: VisualModelSpec;
  categoryObjectId?: EverydayObjectId;
  categoryLabelAr?: string;
}

export interface TakeAwayData extends GenericArchetypeData {
  kind: "TakeAway";
  representation: TakeAwayRepresentation;
  responseForm: TakeAwayResponseForm;
  action: TakeAwayAction;
  showTermLabels?: boolean;
  graphModel?: VisualModelSpec;
  items: TakeAwayItem[];
}

export interface TakeAwayPayload {
  data: TakeAwayData;
  visualModels: VisualModelSpec[];
  defaultPromptAr: string;
  defaultStrategyHintAr: string;
  factsSummaryAr: string;
}

export function resolveTakeAwaySolvedUnknownAr(item: {
  unknownKind: TakeAwayUnknownKind;
  partTakenAwayAr: string;
  totalAr: string;
  missingPartAr: string;
}): string {
  return item.unknownKind === "partTakenAway"
    ? item.partTakenAwayAr
    : item.unknownKind === "total"
      ? item.totalAr
      : item.missingPartAr;
}

function buildTakeAwayConcreteModel(params: {
  representation: Exclude<TakeAwayRepresentation, "picture-graph">;
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
  const fiveFrameCrossOffMode: CrossOffMode | "none" =
    crossOffMode === "none" ? "none" : effectiveCrossOffMode;

  if (representation === "ten-frame-and-digit") {
    return createTenFrameSpec({
      count: total,
      secondaryCount: 0,
      crossedOutCount: effectiveCrossedOut,
      crossOffMode: fiveFrameCrossOffMode,
      colorTheme: primaryTheme,
      highlightEmptySlots: true,
      labelAr: `لوحة العشرة: الكلّ ${totalAr} ناقص الرقم ${partAr}`,
    });
  }

  if (representation === "ten-frame") {
    if (action === "draw-and-cross-off") {
      return createTenFrameSpec({
        count: 0,
        secondaryCount: 0,
        ghostTargetCount: total,
        crossedOutCount: effectiveCrossedOut,
        crossOffMode: "student",
        colorTheme: primaryTheme,
        secondaryColorTheme: secondaryTheme,
        highlightEmptySlots: true,
        labelAr: `لوحة العشرة: ارسم الكلّ ${totalAr} واشطب ${partAr} فيبقى ${missingAr}`,
      });
    }

    return createTenFrameSpec({
      count: total,
      secondaryCount: 0,
      crossedOutCount: effectiveCrossedOut,
      crossOffMode: fiveFrameCrossOffMode,
      colorTheme: primaryTheme,
      highlightEmptySlots: true,
      labelAr:
        fiveFrameCrossOffMode === "none"
          ? `لوحة العشرة: الكلّ ${totalAr}`
          : `لوحة العشرة: الكلّ ${totalAr} شُطب منها ${partAr} وبقي ${missingAr}`,
    });
  }

  if (representation === "five-frame-and-digit") {
    return createFiveFrameSpec({
      count: total,
      secondaryCount: 0,
      crossedOutCount: effectiveCrossedOut,
      crossOffMode: fiveFrameCrossOffMode,
      colorTheme: primaryTheme,
      highlightEmptySlots: true,
      labelAr: `لوحة الخمسة: الكلّ ${totalAr} ناقص الرقم ${partAr}`,
    });
  }

  if (representation === "five-frame") {
    if (action === "draw-and-cross-off") {
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
      crossOffMode: fiveFrameCrossOffMode,
      colorTheme: primaryTheme,
      highlightEmptySlots: true,
      labelAr:
        fiveFrameCrossOffMode === "none"
          ? `لوحة الخمسة: الكلّ ${totalAr}`
          : `لوحة الخمسة: الكلّ ${totalAr} شُطب منها ${partAr} وبقي ${missingAr}`,
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

export function buildTakeAwayPayload(
  ctx: ArchetypeGeneratorContext,
  rawParams?: TakeAwayBlueprintParams
): TakeAwayPayload {
  const params = rawParams ?? {};

  const isSubitizeLesson =
    ctx.lesson.lessonNumber >= 46 && ctx.lesson.lessonNumber <= 48;

  const defaultAction: TakeAwayAction =
    ctx.difficultyLevel === "Easy"
      ? "trace"
      : ctx.difficultyLevel === "Intermediate" || isSubitizeLesson
        ? "write"
        : "draw-and-cross-off";
  const action: TakeAwayAction = params.action ?? defaultAction;

  const defaultResponseForm: TakeAwayResponseForm =
    ctx.lesson.lessonNumber <= 40 || ctx.lesson.lessonNumber === 47
      ? "number-bond"
      : ctx.lesson.lessonNumber === 41 || ctx.lesson.lessonNumber === 46
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
    isZeroCapableRepresentation
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

  const allowNonStandardUnknown =
    ctx.sectionId === "challenge" || ctx.difficultyLevel === "Advanced";
  const requestedUnknown = params.unknownPosition ?? "missingPart";
  const resolvedUnknownKind: TakeAwayUnknownKind =
    requestedUnknown !== "missingPart" && allowNonStandardUnknown
      ? requestedUnknown
      : "missingPart";

  const swapBondParts =
    Boolean(params.swapBondParts) && ctx.difficultyLevel === "Advanced";

  const isPictureGraphMode = representationPool[0] === "picture-graph";
  const pickedObjects = isPictureGraphMode
    ? ctx.rng.pickN(EVERYDAY_OBJECT_CATALOG, itemCount)
    : [];

  const items: TakeAwayItem[] = facts.map((fact, idx) => {
    const [primaryTheme, secondaryTheme] =
      COLOR_PAIRS[idx % COLOR_PAIRS.length];
    const itemRep = representationPool[idx % representationPool.length];
    const isWorkedExample = Boolean(params.firstItemWorkedExample && idx === 0);

    const itemAction: TakeAwayAction =
      action === "draw-and-cross-off" && itemRep !== "five-frame"
        ? "cross-off-and-write"
        : action;
    const defaultSubitizeCrossOff: CrossOffMode | "none" =
      ctx.difficultyLevel === "Easy" ? "shown" : "none";
    const itemCrossOffMode: CrossOffMode | "none" =
      itemRep === "picture-graph"
        ? "none"
        : (params.crossOffMode ??
          (itemRep === "five-frame-and-digit" ||
          itemRep === "ten-frame-and-digit" ||
          isSubitizeLesson
            ? defaultSubitizeCrossOff
            : itemAction === "cross-off-and-write" ||
                itemAction === "draw-and-cross-off"
              ? "student"
              : "shown"));

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

    const bondTracePositions: Array<"total" | "part1" | "part2"> =
      swapBondParts && action === "trace" && !isWorkedExample
        ? ["total", "part2"]
        : tracePositions;

    const representationModel =
      itemRep === "picture-graph"
        ? undefined
        : buildTakeAwayConcreteModel({
            representation: itemRep,
            total: fact.total,
            partTakenAway: fact.partTakenAway,
            missingPart: fact.missingPart,
            action: itemAction,
            crossOffMode: itemCrossOffMode,
            primaryTheme,
            secondaryTheme,
          });

    const { responseModel, companionBondModel } =
      buildAbstractResponseAndCompanionModels({
        operation: "subtract",
        responseForm,
        bondPart1,
        bondPart2,
        eqPart1: fact.partTakenAway,
        eqPart2: fact.missingPart,
        total: fact.total,
        bondMissingPosition: bondMissingPos,
        eqMissingPosition: eqMissingPos,
        bondTracePositions,
        eqTracePositions: tracePositions,
        equationLayout: params.equationLayout,
        showCompanionBond: params.showCompanionBond,
        primaryTheme,
        secondaryTheme,
      });

    const companionDigitModel =
      itemRep === "five-frame-and-digit" || itemRep === "ten-frame-and-digit"
        ? createDigitCardSpec(fact.partTakenAway, {
            colorTheme: secondaryTheme,
            labelAr: `الرقم ${formatEasternNumber(fact.partTakenAway)}`,
          })
        : undefined;

    const pickedObj = pickedObjects[idx];

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
      solvedUnknownAr: resolveTakeAwaySolvedUnknownAr({
        unknownKind: resolvedUnknownKind,
        partTakenAwayAr: formatEasternNumber(fact.partTakenAway),
        totalAr: formatEasternNumber(fact.total),
        missingPartAr: formatEasternNumber(fact.missingPart),
      }),
      representationModel,
      companionDigitModel,
      responseModel,
      companionBondModel,
      categoryObjectId: pickedObj?.id,
      categoryLabelAr: pickedObj?.labelAr,
    };
  });

  const graphModel = isPictureGraphMode
    ? createPictureGraphSpec({
        orientation: "horizontal",
        titleAr: "تمثيل بياني بالصور",
        categories: items.map((item, idx) => ({
          categoryId: `cat-${idx + 1}-${item.categoryObjectId ?? "star"}`,
          labelAr:
            item.categoryLabelAr ?? `فئة ${formatEasternNumber(idx + 1)}`,
          objectId: item.categoryObjectId ?? "star",
          count: item.total,
          colorTheme: COLOR_PAIRS[idx % COLOR_PAIRS.length][0],
        })),
      })
    : undefined;

  const visualModels: VisualModelSpec[] = [];
  if (graphModel) {
    visualModels.push(graphModel);
  }
  for (const item of items) {
    if (!graphModel && item.representationModel) {
      visualModels.push(item.representationModel);
    }
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
    graphModel,
    items,
  };

  return {
    data,
    visualModels,
    defaultPromptAr,
    defaultStrategyHintAr,
    factsSummaryAr,
  };
}

function generateTakeAwayExercise(ctx: ArchetypeGeneratorContext): Exercise {
  const params = (ctx.spec.params ?? {}) as TakeAwayBlueprintParams;
  const {
    data,
    visualModels,
    defaultPromptAr,
    defaultStrategyHintAr,
    factsSummaryAr,
  } = buildTakeAwayPayload(ctx, params);

  const strategyHintAr = ctx.spec.strategyHintAr
    ? factsSummaryAr && !ctx.spec.strategyHintAr.includes(factsSummaryAr)
      ? `${ctx.spec.strategyHintAr} (${factsSummaryAr})`
      : ctx.spec.strategyHintAr
    : defaultStrategyHintAr;

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "TakeAway",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "اطرح لإيجاد الجزء الناقص",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr,
    visualModels,
    data,
  };
}

function renderTakeAwayExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  return <PartWholeCardGrid data={exercise.data as TakeAwayData} mode={mode} />;
}

registerExerciseArchetype({
  id: "TakeAway",
  displayNameAr: "اطرح",
  generate: generateTakeAwayExercise,
  render: renderTakeAwayExercise,
});
