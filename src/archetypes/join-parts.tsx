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
  Shape2DId,
  Solid3DId,
  VisualModelSpec,
} from "@/domain/types";
import { COLOR_PAIRS, selectAdditionFacts } from "@/lib/math-facts";
import { formatEasternNumber } from "@/lib/numerals";
import {
  buildAbstractResponseAndCompanionModels,
  isZeroCapableRepresentation,
} from "@/lib/part-whole-facts";
import {
  EVERYDAY_OBJECT_CATALOG,
  createEverydayObjectSpec,
} from "@/visual-models/everyday-objects";
import {
  createShape2DSpec,
  createSolid3DSpec,
  getShape2DById,
  getSolid3DById,
} from "@/visual-models/shapes-solids-coins";
import {
  createDicePatternSpec,
  createDigitCardSpec,
  createFiveFrameSpec,
  createSnapCubesSpec,
  createTallyMarksSpec,
  createTenFrameSpec,
} from "@/visual-models/unit-2-models";
import type {
  BondMissingPosition,
  EquationLayout,
} from "@/visual-models/unit-3-models";

export type JoinPartsRepresentation =
  | "five-frame"
  | "five-frame-and-digit"
  | "ten-frame"
  | "ten-frame-and-digit"
  | "snap-cubes"
  | "tally-marks"
  | "dice"
  | "domino"
  | "pictures";

export type JoinPartsPictureSubkind =
  "objects" | "flat-shapes" | "solid-shapes";

export type JoinPartsResponseForm = "parts-table" | "number-bond" | "equation";

export type JoinPartsAction = "trace" | "write" | "draw-counters";

export interface JoinPartsBlueprintParams {
  representation?: JoinPartsRepresentation;
  allowedRepresentations?: JoinPartsRepresentation[];
  pictureSubkind?: JoinPartsPictureSubkind;
  responseForm?: JoinPartsResponseForm;
  action?: JoinPartsAction;
  totalRange?: [number, number];
  minPart?: number;
  itemCount?: number;
  unknownPosition?: "total" | "part2" | "part1";
  equationLayout?: EquationLayout;
  showCompanionBond?: boolean;
  firstItemWorkedExample?: boolean;
  showTermLabels?: boolean;
}

export interface JoinPartsItem {
  id: string;
  itemIndex: number;
  part1: number;
  part2: number;
  total: number;
  part1Ar: string;
  part2Ar: string;
  totalAr: string;
  factKey: string;
  representation: JoinPartsRepresentation;
  unknownPosition: BondMissingPosition;
  tracePositions: Array<"total" | "part1" | "part2">;
  representationModel: VisualModelSpec;
  companionDigitModel?: VisualModelSpec;
  responseModel?: VisualModelSpec;
  companionBondModel?: VisualModelSpec;
}

export interface JoinPartsData extends GenericArchetypeData {
  kind: "JoinParts";
  representation: JoinPartsRepresentation;
  responseForm: JoinPartsResponseForm;
  action: JoinPartsAction;
  showTermLabels?: boolean;
  items: JoinPartsItem[];
}

export interface JoinPartsPayload {
  data: JoinPartsData;
  visualModels: VisualModelSpec[];
  defaultPromptAr: string;
  defaultStrategyHintAr: string;
  factsSummaryAr: string;
}

const FLAT_SHAPES: Shape2DId[] = [
  "triangle",
  "square",
  "circle",
  "hexagon",
  "pentagon",
];

const SOLID_SHAPES: Solid3DId[] = [
  "cube",
  "cylinder",
  "cone",
  "sphere",
  "pyramid",
];

const PICTURE_OBJECT_IDS: EverydayObjectId[] = [
  "apple",
  "strawberry",
  "bird",
  "butterfly",
  "flower",
  "star",
];

function buildJoinConcreteModel(params: {
  representation: JoinPartsRepresentation;
  pictureSubkind?: JoinPartsPictureSubkind;
  part1: number;
  part2: number;
  action: JoinPartsAction;
  /** Missing value of this item's response model (frame labels never print it) */
  unknownPosition: BondMissingPosition;
  primaryTheme: ColorThemeId;
  secondaryTheme: ColorThemeId;
  itemIdx: number;
}): VisualModelSpec {
  const {
    representation,
    pictureSubkind = "objects",
    part1,
    part2,
    action,
    unknownPosition,
    primaryTheme,
    secondaryTheme,
    itemIdx,
  } = params;
  const total = part1 + part2;
  const p1Ar = formatEasternNumber(part1);
  const p2Ar = formatEasternNumber(part2);
  const totalAr = formatEasternNumber(total);
  // §8.1: a Missing Part lives in the response model's AnswerSlot, so any
  // student-visible frame label must not print the unknown's number.
  const missingPart2Ar = unknownPosition === "part2" ? p2Ar : "";
  const missingPart1Ar = unknownPosition === "part1" ? p1Ar : "";

  if (
    representation === "ten-frame" ||
    representation === "ten-frame-and-digit"
  ) {
    if (representation === "ten-frame-and-digit") {
      return createTenFrameSpec({
        count: part1,
        secondaryCount: 0,
        colorTheme: primaryTheme,
        showPartOutline: true,
        highlightEmptySlots: true,
        labelAr: `لوحة العشرة: ${p1Ar} زائد الرقم ${p2Ar}`,
      });
    }

    if (action === "draw-counters") {
      const shownPrimary = part1;
      const ghostTarget = Math.max(0, part2);
      return createTenFrameSpec({
        count: shownPrimary,
        secondaryCount: 0,
        ghostTargetCount: ghostTarget,
        colorTheme: primaryTheme,
        secondaryColorTheme: secondaryTheme,
        showPartOutline: true,
        highlightEmptySlots: true,
        labelAr: missingPart2Ar
          ? `لوحة العشرة: ارسم ولوّن لإكمال الكلّ ${totalAr}`
          : `لوحة العشرة: ارسم ولوّن لإكمال ${p1Ar} و${p2Ar} (الكلّ ${totalAr})`,
      });
    }

    return createTenFrameSpec({
      count: part1,
      secondaryCount: part2,
      colorTheme: primaryTheme,
      secondaryColorTheme: secondaryTheme,
      showPartOutline: true,
      highlightEmptySlots: true,
      labelAr: missingPart1Ar
        ? `لوحة العشرة: الكلّ ${totalAr} والجزء الثاني ${p2Ar}`
        : missingPart2Ar
          ? `لوحة العشرة: الكلّ ${totalAr} والجزء الأول ${p1Ar}`
          : `لوحة العشرة: ${p1Ar} و${p2Ar} يساوي ${totalAr}`,
    });
  }

  if (
    representation === "five-frame" ||
    representation === "five-frame-and-digit"
  ) {
    if (representation === "five-frame-and-digit") {
      return createFiveFrameSpec({
        count: missingPart1Ar ? 0 : part1,
        secondaryCount: 0,
        colorTheme: primaryTheme,
        showPartOutline: true,
        highlightEmptySlots: true,
        labelAr: missingPart1Ar
          ? `لوحة الخمسة: الكلّ ${totalAr} والجزء الثاني ${p2Ar}`
          : `لوحة الخمسة: ${p1Ar} زائد الرقم ${p2Ar}`,
      });
    }

    if (action === "draw-counters") {
      const shownPrimary = part1;
      const ghostTarget = Math.max(0, part2);
      return createFiveFrameSpec({
        count: shownPrimary,
        secondaryCount: 0,
        ghostTargetCount: ghostTarget,
        colorTheme: primaryTheme,
        secondaryColorTheme: secondaryTheme,
        showPartOutline: true,
        highlightEmptySlots: true,
        labelAr: missingPart2Ar
          ? `لوحة الخمسة: ارسم ولوّن لإكمال الكلّ ${totalAr}`
          : `لوحة الخمسة: ارسم ولوّن لإكمال ${p1Ar} و${p2Ar} (الكلّ ${totalAr})`,
      });
    }

    return createFiveFrameSpec({
      count: part1,
      secondaryCount: part2,
      colorTheme: primaryTheme,
      secondaryColorTheme: secondaryTheme,
      showPartOutline: true,
      highlightEmptySlots: true,
      labelAr: missingPart1Ar
        ? `لوحة الخمسة: الكلّ ${totalAr} والجزء الثاني ${p2Ar}`
        : missingPart2Ar
          ? `لوحة الخمسة: الكلّ ${totalAr} والجزء الأول ${p1Ar}`
          : `لوحة الخمسة: ${p1Ar} و${p2Ar} يساوي ${totalAr}`,
    });
  }

  if (representation === "snap-cubes") {
    return createSnapCubesSpec({
      count: Math.max(1, part1),
      secondaryCount: part2,
      separated: true,
      orientation: "horizontal",
      compact: true,
      colorTheme: primaryTheme,
      secondaryColorTheme: secondaryTheme,
      labelAr: `مكعبات متداخلة: ${p1Ar} و${p2Ar} (الكلّ ${totalAr})`,
    });
  }

  if (representation === "tally-marks") {
    return createTallyMarksSpec({
      count: Math.max(1, part1),
      secondaryCount: Math.max(1, part2),
      colorTheme: primaryTheme,
      secondaryColorTheme: secondaryTheme,
    });
  }

  if (representation === "dice" || representation === "domino") {
    return createDicePatternSpec({
      count: part1,
      secondaryCount: part2,
      diceVariant: representation === "domino" ? "domino" : "die",
      colorTheme: primaryTheme,
      secondaryColorTheme: secondaryTheme,
      hideLabel: true,
      compact: true,
      ghostSecondPart: action === "draw-counters",
      labelAr:
        representation === "domino"
          ? `دومينو: ${p1Ar} و${p2Ar} (الكلّ ${totalAr})`
          : `نرد: ${p1Ar} و${p2Ar} (الكلّ ${totalAr})`,
    });
  }

  if (pictureSubkind === "flat-shapes") {
    const shapeId = FLAT_SHAPES[itemIdx % FLAT_SHAPES.length];
    const shapeDef = getShape2DById(shapeId);
    return createShape2DSpec(shapeDef.id, {
      count: Math.max(1, part1),
      secondaryCount: part2,
      colorTheme: primaryTheme,
      size: "small",
      labelAr: `${p1Ar} و${p2Ar} (${shapeDef.labelAr})`,
      meta: { secondaryColorTheme: secondaryTheme },
    });
  }

  if (pictureSubkind === "solid-shapes") {
    const solidId = SOLID_SHAPES[itemIdx % SOLID_SHAPES.length];
    const solidDef = getSolid3DById(solidId);
    return createSolid3DSpec(solidDef.id, {
      count: Math.max(1, part1),
      secondaryCount: part2,
      colorTheme: primaryTheme,
      size: "small",
      labelAr: `${p1Ar} و${p2Ar} (${solidDef.labelAr})`,
      meta: { secondaryColorTheme: secondaryTheme },
    });
  }

  const objId = PICTURE_OBJECT_IDS[itemIdx % PICTURE_OBJECT_IDS.length];
  const objDef =
    EVERYDAY_OBJECT_CATALOG.find((o) => o.id === objId) ??
    EVERYDAY_OBJECT_CATALOG[0];
  return createEverydayObjectSpec(objDef, {
    count: Math.max(1, part1),
    secondaryCount: part2,
    size: "small",
    labelAr: `${p1Ar} و${p2Ar} من ${objDef.labelAr}`,
  });
}

export function buildJoinPartsPayload(
  ctx: ArchetypeGeneratorContext,
  rawParams?: JoinPartsBlueprintParams
): JoinPartsPayload {
  const params = rawParams ?? {};

  const defaultAction: JoinPartsAction =
    ctx.difficultyLevel === "Easy"
      ? "trace"
      : ctx.difficultyLevel === "Intermediate"
        ? "write"
        : "draw-counters";
  const action: JoinPartsAction = params.action ?? defaultAction;

  const defaultResponseForm: JoinPartsResponseForm =
    ctx.lesson.lessonNumber <= 28
      ? "parts-table"
      : ctx.lesson.lessonNumber <= 31
        ? "number-bond"
        : "equation";
  const responseForm: JoinPartsResponseForm =
    params.responseForm ?? defaultResponseForm;

  const representationPool: JoinPartsRepresentation[] =
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

  const facts = selectAdditionFacts(
    ctx.rng,
    ctx.difficultyLevel,
    {
      totalRange: params.totalRange,
      minPart: effectiveMinPart,
      count: itemCount,
    },
    ctx.usedFacts
  ).map((fact, idx) => {
    const itemRep = representationPool[idx % representationPool.length];
    if (
      (itemRep === "five-frame-and-digit" ||
        itemRep === "ten-frame-and-digit") &&
      fact.part1 === 0 &&
      fact.part2 > 0
    ) {
      return {
        part1: fact.part2,
        part2: 0,
        total: fact.total,
        key: `${fact.part2}+0`,
      };
    }
    return fact;
  });

  // §6.3: Missing Part unknowns are the K-79+ content line. The standard
  // missing second Part may appear anywhere from lesson 79 on; the
  // non-standard missing first Part is an edge case reserved for Advanced or
  // Challenge (mirroring the ConnectMatch gate).
  const allowMissingPart2 =
    ctx.sectionId === "challenge" ||
    ctx.difficultyLevel === "Advanced" ||
    ctx.lesson.lessonNumber >= 79;
  const allowNonStandardPart1 =
    ctx.sectionId === "challenge" || ctx.difficultyLevel === "Advanced";
  const requestedUnknown = params.unknownPosition ?? "total";
  const resolvedUnknown: "total" | "part1" | "part2" =
    requestedUnknown === "part2" && allowMissingPart2
      ? "part2"
      : requestedUnknown === "part1" && allowNonStandardPart1
        ? "part1"
        : "total";

  const items: JoinPartsItem[] = facts.map((fact, idx) => {
    const [primaryTheme, secondaryTheme] =
      COLOR_PAIRS[idx % COLOR_PAIRS.length];
    const itemRep = representationPool[idx % representationPool.length];
    const isWorkedExample = Boolean(params.firstItemWorkedExample && idx === 0);

    const tracePositions: Array<"total" | "part1" | "part2"> = isWorkedExample
      ? ["part1", "part2", "total"]
      : action === "trace" && responseForm === "parts-table"
        ? ["part1", "part2", "total"]
        : action === "trace"
          ? ["part1", "part2"]
          : [];

    const missingPosition: BondMissingPosition = isWorkedExample
      ? "none"
      : resolvedUnknown;

    const representationModel = buildJoinConcreteModel({
      representation: itemRep,
      pictureSubkind: params.pictureSubkind,
      part1: fact.part1,
      part2: fact.part2,
      action,
      unknownPosition: missingPosition,
      primaryTheme,
      secondaryTheme,
      itemIdx: idx,
    });

    const { responseModel, companionBondModel } =
      buildAbstractResponseAndCompanionModels({
        operation: "add",
        responseForm,
        bondPart1: fact.part1,
        bondPart2: fact.part2,
        eqPart1: fact.part1,
        eqPart2: fact.part2,
        total: fact.total,
        bondMissingPosition: missingPosition,
        eqMissingPosition: missingPosition,
        bondTracePositions: tracePositions,
        eqTracePositions: tracePositions,
        equationLayout: params.equationLayout,
        showCompanionBond: params.showCompanionBond,
        primaryTheme,
        secondaryTheme,
      });

    const companionDigitModel =
      itemRep === "five-frame-and-digit" || itemRep === "ten-frame-and-digit"
        ? createDigitCardSpec(fact.part2, {
            colorTheme: secondaryTheme,
            labelAr: `الرقم ${formatEasternNumber(fact.part2)}`,
          })
        : undefined;

    return {
      id: `join-item-${idx + 1}-${fact.key}`,
      itemIndex: idx,
      part1: fact.part1,
      part2: fact.part2,
      total: fact.total,
      part1Ar: formatEasternNumber(fact.part1),
      part2Ar: formatEasternNumber(fact.part2),
      totalAr: formatEasternNumber(fact.total),
      factKey: fact.key,
      representation: itemRep,
      unknownPosition: missingPosition,
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
    .map((it) => `${it.part1Ar} و${it.part2Ar} يساوي ${it.totalAr}`)
    .join("؛ ");

  const isTenFrame =
    representationPool[0] === "ten-frame" ||
    representationPool[0] === "ten-frame-and-digit";
  const frameNameAr = isTenFrame ? "لوحة العشرة" : "لوحة الخمسة";

  const defaultPromptAr =
    resolvedUnknown !== "total"
      ? responseForm === "number-bond"
        ? action === "draw-counters"
          ? `ارسم الأقراص الناقصة على ${frameNameAr}، ثم اكتب الجزء الناقص في رابطة الأعداد:`
          : "انظر إلى النموذج، ثم اكتب الجزء الناقص في رابطة الأعداد:"
        : responseForm === "equation"
          ? action === "draw-counters"
            ? `ارسم الأقراص الناقصة على ${frameNameAr}، ثم اكتب الجزء الناقص في المعادلة:`
            : "انظر إلى النموذج، ثم اكتب الجزء الناقص في المعادلة:"
          : action === "trace"
            ? "تتبّع الأجزاء المعطاة، ثم اكتب الجزء الناقص في جدول الأجزاء والكلّ:"
            : "عدّ الأجزاء المعطاة، ثم اكتب الجزء الناقص في جدول الأجزاء والكلّ:"
      : responseForm === "parts-table"
        ? action === "trace"
          ? `تتبّع الجزأين والكلّ على ${frameNameAr} وفي جدول الأجزاء والكلّ:`
          : "عدّ كل جزء في النموذج واكتب الكلّ في جدول الأجزاء والكلّ:"
        : responseForm === "number-bond"
          ? action === "draw-counters"
            ? `ارسم ولوّن الأقراص لتمثيل الجزأين على ${frameNameAr}، ثم اكتب الكلّ في رابطة الأعداد:`
            : "استخدم النموذج لإيجاد الكلّ واكتبه في دائرة الكلّ في رابطة الأعداد:"
          : action === "draw-counters"
            ? `ارسم ولوّن الأقراص لتمثيل الجزأين على ${frameNameAr}، ثم اكتب الكلّ في المعادلة:`
            : "أكمل معادلة الجمع من اليمين إلى اليسار باستخدام النموذج:";

  const defaultStrategyHintAr =
    resolvedUnknown !== "total"
      ? `استخدم الكلّ والجزء المعطى لإيجاد الجزء الناقص (${factsSummaryAr}).`
      : `اجمع الجزأين معاً من اليمين إلى اليسار للوصول إلى الكلّ (${factsSummaryAr}).`;

  const data: JoinPartsData = {
    kind: "JoinParts",
    representation: representationPool[0],
    responseForm,
    action,
    showTermLabels: Boolean(params.showTermLabels),
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

function generateJoinPartsExercise(ctx: ArchetypeGeneratorContext): Exercise {
  const params = (ctx.spec.params ?? {}) as JoinPartsBlueprintParams;
  const {
    data,
    visualModels,
    defaultPromptAr,
    defaultStrategyHintAr,
    factsSummaryAr,
  } = buildJoinPartsPayload(ctx, params);

  const strategyHintAr = ctx.spec.strategyHintAr
    ? factsSummaryAr && !ctx.spec.strategyHintAr.includes(factsSummaryAr)
      ? `${ctx.spec.strategyHintAr} (${factsSummaryAr})`
      : ctx.spec.strategyHintAr
    : defaultStrategyHintAr;

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "JoinParts",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "اجمع الجزأين لإيجاد الكلّ",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr,
    visualModels,
    data,
  };
}

function renderJoinPartsExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  return (
    <PartWholeCardGrid data={exercise.data as JoinPartsData} mode={mode} />
  );
}

registerExerciseArchetype({
  id: "JoinParts",
  displayNameAr: "اجمع الجزأين",
  generate: generateJoinPartsExercise,
  render: renderJoinPartsExercise,
});
