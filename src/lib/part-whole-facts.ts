import type { ArchetypeGeneratorContext } from "@/archetypes/registry";
import type {
  ColorThemeId,
  ConnectMatchPair,
  DifficultyLevel,
  EverydayObjectId,
  GenericArchetypeData,
  Shape2DId,
  Solid3DId,
  VisualModelSpec,
} from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";
import type { SeededRandom } from "@/lib/seed";
import {
  buildWordProblemText,
  formatValidTakeApartPairsAr,
  getStoryScenesForSituation,
  type WordProblemSituation,
  type WordProblemStyle,
} from "@/lib/word-problems";
import {
  EVERYDAY_OBJECT_CATALOG,
  createEverydayObjectSpec,
} from "@/visual-models/everyday-objects";
import { createPictureGraphSpec } from "@/visual-models/picture-graphs";
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
  type CrossOffMode,
} from "@/visual-models/unit-2-models";
import {
  createEquationStripSpec,
  createNumberBondSpec,
  type BondMissingPosition,
  type EquationLayout,
} from "@/visual-models/unit-3-models";

export interface AdditionFact {
  part1: number;
  part2: number;
  total: number;
  key: string;
}

export interface SubtractionFact {
  total: number;
  partTakenAway: number;
  missingPart: number;
  key: string;
}

export interface FactSelectionLimits {
  totalRange?: [number, number];
  minPart?: number;
  count: number;
}

export type JoinPartsRepresentation =
  | "five-frame"
  | "five-frame-and-digit"
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
}

export type TakeAwayRepresentation =
  | "five-frame"
  | "five-frame-and-digit"
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
}

export type PartWholeMatchMode =
  | "five-frame-to-parts-table"
  | "five-frame-to-number-bond"
  | "dice-to-number-bond"
  | "number-bond-to-equation"
  | "five-frame-to-equation"
  | "tally-expression-to-total"
  | "model-to-word-problem";

export interface BuildPartWholeMatchPairsInput {
  rng: SeededRandom;
  difficultyLevel: DifficultyLevel;
  matchingMode: PartWholeMatchMode;
  operation?: "add" | "subtract";
  situation?: WordProblemSituation;
  problemStyle?: WordProblemStyle;
  showProblemSlot?: boolean;
  pairCount: number;
  totalRange?: [number, number];
  minPart?: number;
  showMissingTotalSlot?: boolean;
  usedFacts?: Set<string>;
}

export const COLOR_PAIRS: Array<[ColorThemeId, ColorThemeId]> = [
  ["coral", "sky"],
  ["emerald", "amber"],
  ["violet", "teal"],
  ["rose", "indigo"],
];

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

function resolveFactBounds(
  difficultyLevel: DifficultyLevel,
  limits: FactSelectionLimits
): { minPart: number; minTotal: number; maxTotal: number } {
  const defaultMaxTotal = difficultyLevel === "Easy" ? 4 : 5;
  const defaultMinPart = difficultyLevel === "Advanced" ? 0 : 1;

  const minPart = limits.minPart ?? defaultMinPart;
  const minTotal = Math.max(
    minPart * 2,
    limits.totalRange ? limits.totalRange[0] : Math.max(2, minPart * 2)
  );
  const maxTotal = Math.max(
    minTotal,
    limits.totalRange ? limits.totalRange[1] : defaultMaxTotal
  );

  return { minPart, minTotal, maxTotal };
}

function pickFromCandidates<T extends { key: string }>(
  rng: SeededRandom,
  candidates: T[],
  count: number,
  usedFacts?: Set<string>
): T[] {
  const shuffled = rng.shuffle(candidates);
  const unused: T[] = [];
  const used: T[] = [];

  for (const fact of shuffled) {
    if (usedFacts && usedFacts.has(fact.key)) {
      used.push(fact);
    } else {
      unused.push(fact);
    }
  }

  const orderedPool = [...unused, ...used];
  const picked: T[] = [];
  const exerciseSeen = new Set<string>();

  for (const fact of orderedPool) {
    if (picked.length >= count) break;
    if (exerciseSeen.has(fact.key)) continue;
    exerciseSeen.add(fact.key);
    picked.push(fact);
    usedFacts?.add(fact.key);
  }

  return picked;
}

/**
 * Selects `count` addition facts within `[minTotal, maxTotal]` with `part >= minPart`.
 * - No fact repeats within one Exercise.
 * - Across the sheet (`usedFacts`), unused facts come first; repeats are allowed only once the pool is used up.
 * - `3 + 2` and `2 + 3` have distinct keys (`"3+2"` vs `"2+3"`) and are different facts (§7.3).
 */
export function selectAdditionFacts(
  rng: SeededRandom,
  difficultyLevel: DifficultyLevel,
  limits: FactSelectionLimits,
  usedFacts?: Set<string>
): AdditionFact[] {
  const { minPart, minTotal, maxTotal } = resolveFactBounds(
    difficultyLevel,
    limits
  );

  const candidates: AdditionFact[] = [];
  for (let total = minTotal; total <= maxTotal; total++) {
    for (let part1 = minPart; part1 <= total - minPart; part1++) {
      const part2 = total - part1;
      if (part2 < minPart) continue;
      candidates.push({
        part1,
        part2,
        total,
        key: `${part1}+${part2}`,
      });
    }
  }

  return pickFromCandidates(rng, candidates, limits.count, usedFacts);
}

/**
 * Selects `count` subtraction facts (`total - partTakenAway = missingPart`) within `[minTotal, maxTotal]`
 * with both `partTakenAway >= minPart` and `missingPart >= minPart`.
 * - No fact repeats within one Exercise.
 * - Across the sheet (`usedFacts`), unused facts come first; repeats are allowed only once the pool is used up.
 * - `5 - 2` and `5 - 3` have distinct keys (`"5-2"` vs `"5-3"`) and are different facts (§7.3).
 */
export function selectSubtractionFacts(
  rng: SeededRandom,
  difficultyLevel: DifficultyLevel,
  limits: FactSelectionLimits,
  usedFacts?: Set<string>
): SubtractionFact[] {
  const { minPart, minTotal, maxTotal } = resolveFactBounds(
    difficultyLevel,
    limits
  );

  const candidates: SubtractionFact[] = [];
  for (let total = minTotal; total <= maxTotal; total++) {
    for (
      let partTakenAway = minPart;
      partTakenAway <= total - minPart;
      partTakenAway++
    ) {
      const missingPart = total - partTakenAway;
      if (missingPart < minPart) continue;
      candidates.push({
        total,
        partTakenAway,
        missingPart,
        key: `${total}-${partTakenAway}`,
      });
    }
  }

  return pickFromCandidates(rng, candidates, limits.count, usedFacts);
}

function isZeroCapableRepresentation(
  r: JoinPartsRepresentation | TakeAwayRepresentation
): boolean {
  return (
    r === "five-frame" ||
    r === "domino" ||
    r === "five-frame-and-digit" ||
    r === "picture-graph"
  );
}

function buildJoinConcreteModel(params: {
  representation: JoinPartsRepresentation;
  pictureSubkind?: JoinPartsPictureSubkind;
  part1: number;
  part2: number;
  action: JoinPartsAction;
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
    primaryTheme,
    secondaryTheme,
    itemIdx,
  } = params;
  const total = part1 + part2;
  const p1Ar = formatEasternNumber(part1);
  const p2Ar = formatEasternNumber(part2);
  const totalAr = formatEasternNumber(total);

  if (
    representation === "five-frame" ||
    representation === "five-frame-and-digit"
  ) {
    if (representation === "five-frame-and-digit") {
      return createFiveFrameSpec({
        count: part1,
        secondaryCount: 0,
        colorTheme: primaryTheme,
        showPartOutline: true,
        highlightEmptySlots: true,
        labelAr: `لوحة الخمسة: ${p1Ar} زائد الرقم ${p2Ar}`,
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
        labelAr: `لوحة الخمسة: ارسم ولوّن لإكمال ${p1Ar} و${p2Ar} (الكلّ ${totalAr})`,
      });
    }

    return createFiveFrameSpec({
      count: part1,
      secondaryCount: part2,
      colorTheme: primaryTheme,
      secondaryColorTheme: secondaryTheme,
      showPartOutline: true,
      highlightEmptySlots: true,
      labelAr: `لوحة الخمسة: ${p1Ar} و${p2Ar} يساوي ${totalAr}`,
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

function buildAbstractResponseAndCompanionModels(params: {
  operation: "add" | "subtract";
  responseForm: "number-bond" | "equation" | "parts-table" | "answer-slot";
  bondPart1: number;
  bondPart2: number;
  eqPart1: number;
  eqPart2: number;
  total: number;
  bondMissingPosition: BondMissingPosition;
  eqMissingPosition: BondMissingPosition;
  bondTracePositions: Array<"total" | "part1" | "part2">;
  eqTracePositions: Array<"total" | "part1" | "part2">;
  equationLayout?: EquationLayout;
  showCompanionBond?: boolean;
  primaryTheme: ColorThemeId;
  secondaryTheme: ColorThemeId;
}): {
  responseModel?: VisualModelSpec;
  companionBondModel?: VisualModelSpec;
} {
  const {
    operation,
    responseForm,
    bondPart1,
    bondPart2,
    eqPart1,
    eqPart2,
    total,
    bondMissingPosition,
    eqMissingPosition,
    bondTracePositions,
    eqTracePositions,
    equationLayout = "standard",
    showCompanionBond,
    primaryTheme,
    secondaryTheme,
  } = params;

  const responseModel =
    responseForm === "parts-table" || responseForm === "answer-slot"
      ? undefined
      : responseForm === "number-bond"
        ? createNumberBondSpec({
            part1: bondPart1,
            part2: bondPart2,
            total,
            missingPosition: bondMissingPosition,
            slotKind: "unknown",
            tracePositions: bondTracePositions,
            colorTheme: primaryTheme,
            secondaryColorTheme: secondaryTheme,
          })
        : createEquationStripSpec({
            operation,
            part1: eqPart1,
            part2: eqPart2,
            total,
            layout: equationLayout,
            missingPosition: eqMissingPosition,
            slotKind: "unknown",
            tracePositions: eqTracePositions,
          });

  const companionBondModel = showCompanionBond
    ? createNumberBondSpec({
        part1: bondPart1,
        part2: bondPart2,
        total,
        missingPosition: bondMissingPosition,
        slotKind: "unknown",
        tracePositions: bondTracePositions,
        colorTheme: primaryTheme,
        secondaryColorTheme: secondaryTheme,
      })
    : undefined;

  return { responseModel, companionBondModel };
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
      itemRep === "five-frame-and-digit" &&
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

  const allowMissingPart =
    ctx.sectionId === "challenge" || ctx.difficultyLevel === "Advanced";
  const requestedUnknown = params.unknownPosition ?? "total";
  const resolvedUnknown: "total" | "part1" | "part2" =
    requestedUnknown !== "total" && allowMissingPart
      ? requestedUnknown
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
      itemRep === "five-frame-and-digit"
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

  const defaultPromptAr =
    responseForm === "parts-table"
      ? action === "trace"
        ? "تتبّع الجزأين والكلّ على لوحة الخمسة وفي جدول الأجزاء والكلّ:"
        : "عدّ كل جزء في النموذج واكتب الكلّ في جدول الأجزاء والكلّ:"
      : responseForm === "number-bond"
        ? action === "draw-counters"
          ? "ارسم ولوّن الأقراص لتمثيل الجزأين على لوحة الخمسة، ثم اكتب الكلّ في رابطة الأعداد:"
          : "استخدم النموذج لإيجاد الكلّ واكتبه في دائرة الكلّ في رابطة الأعداد:"
        : "أكمل معادلة الجمع من اليمين إلى اليسار باستخدام النموذج:";

  const defaultStrategyHintAr = `اجمع الجزأين معاً من اليمين إلى اليسار للوصول إلى الكلّ (${factsSummaryAr}).`;

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
  };
}

export function resolveTakeAwaySolvedUnknownAr(item: TakeAwayItem): string {
  return item.unknownKind === "partTakenAway"
    ? item.partTakenAwayAr
    : item.unknownKind === "total"
      ? item.totalAr
      : item.missingPartAr;
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
          (itemRep === "five-frame-and-digit" || isSubitizeLesson
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
      itemRep === "five-frame-and-digit"
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
  };
}

export function buildPartWholeMatchPairs(
  input: BuildPartWholeMatchPairsInput
): ConnectMatchPair[] {
  const {
    rng,
    difficultyLevel,
    matchingMode: mode,
    operation = "add",
    situation = "add-to",
    problemStyle = "learning",
    showProblemSlot,
    pairCount,
    totalRange,
    minPart: explicitMinPart,
    showMissingTotalSlot,
    usedFacts,
  } = input;

  const minPart =
    explicitMinPart !== undefined
      ? explicitMinPart
      : mode === "tally-expression-to-total" || mode === "model-to-word-problem"
        ? 1
        : difficultyLevel === "Advanced"
          ? 0
          : 1;

  const isTakeFromMatch =
    mode === "model-to-word-problem" &&
    (operation === "subtract" || situation === "take-from");

  const isTakeApartMatch =
    mode === "model-to-word-problem" && situation === "take-apart";

  if (isTakeApartMatch) {
    const minT = Math.max(3, totalRange ? totalRange[0] : 3);
    const maxT = Math.max(minT, totalRange ? Math.max(5, totalRange[1]) : 5);

    const candidateTotals: number[] = [];
    for (let t = minT; t <= maxT; t++) {
      candidateTotals.push(t);
    }

    const shuffledTotals = rng.shuffle(candidateTotals);
    const pickedTotals = shuffledTotals.slice(
      0,
      Math.min(pairCount, shuffledTotals.length)
    );
    while (pickedTotals.length < pairCount) {
      const nextT = 2 + (pickedTotals.length % 4);
      if (!pickedTotals.includes(nextT)) {
        pickedTotals.push(nextT);
      } else {
        break;
      }
    }

    const tracePositions: Array<"total"> =
      difficultyLevel === "Easy" ? ["total"] : [];
    const scenePool = getStoryScenesForSituation("take-apart");
    const pickedScenes =
      problemStyle === "story" ? rng.pickN(scenePool, pickedTotals.length) : [];
    const effectiveShowProblemSlot = Boolean(showProblemSlot);

    return pickedTotals.map((total, idx) => {
      const candidateParts: number[] = [];
      for (let p1 = 1; p1 <= total - 1; p1++) {
        candidateParts.push(p1);
      }
      const part1 = candidateParts.length > 0 ? rng.pickOne(candidateParts) : 1;
      const part2 = total - part1;
      const factKey = `${part1}+${part2}`;
      usedFacts?.add(factKey);

      const p1Ar = formatEasternNumber(part1);
      const p2Ar = formatEasternNumber(part2);
      const totalAr = formatEasternNumber(total);
      const validPairsSummaryAr = formatValidTakeApartPairsAr(total);
      const [primaryTheme, secondaryTheme] =
        COLOR_PAIRS[idx % COLOR_PAIRS.length];

      const rightModel = createNumberBondSpec({
        part1,
        part2,
        total,
        missingPosition: "both-parts",
        slotKind: "unknown",
        tracePositions,
        colorTheme: primaryTheme,
        secondaryColorTheme: secondaryTheme,
      });

      const textBundle = buildWordProblemText({
        situation: "take-apart",
        problemStyle,
        part1,
        part2,
        total,
        templateIndex: idx,
        scene: pickedScenes[idx],
      });

      const leftModel = createDigitCardSpec(total, {
        id: `word-problem-card-take-apart-${total}-${part1}-${part2}`,
        labelAr: textBundle.problemTextAr,
        count: part1,
        secondaryCount: part2,
        meta: {
          isWordProblemEndpoint: true,
          situation: "take-apart",
          problemStyle,
          part1,
          part2,
          total,
          part1Ar: p1Ar,
          part2Ar: p2Ar,
          totalAr,
          solvedAnswerAr: `${p1Ar} و${p2Ar}`,
          validPairsSummaryAr,
          objectId: textBundle.objectId,
          problemTextAr: textBundle.problemTextAr,
          questionLabelAr: textBundle.questionLabelAr,
          showProblemSlot: effectiveShowProblemSlot,
        },
      });

      return {
        pairId: `pair-${idx + 1}-take-apart-${total}`,
        rightItem: rightModel,
        leftItem: leftModel,
        connectionReasonAr: `الكلّ ${totalAr} يتفكّك إلى ${p1Ar} و${p2Ar} (${validPairsSummaryAr})`,
      };
    });
  }

  if (isTakeFromMatch) {
    const subFacts = selectSubtractionFacts(
      rng,
      difficultyLevel,
      {
        totalRange,
        minPart,
        count: pairCount,
      },
      usedFacts
    );

    const tracePositions: Array<"total" | "part1"> =
      difficultyLevel === "Easy" ? ["total", "part1"] : [];

    const scenePool = getStoryScenesForSituation("take-from");
    const pickedScenes =
      problemStyle === "story" ? rng.pickN(scenePool, subFacts.length) : [];
    const effectiveShowProblemSlot =
      showProblemSlot ?? problemStyle === "story";

    return subFacts.map((fact, idx) => {
      const totalAr = formatEasternNumber(fact.total);
      const p1Ar = formatEasternNumber(fact.partTakenAway);
      const p2Ar = formatEasternNumber(fact.missingPart);
      const [primaryTheme, secondaryTheme] =
        COLOR_PAIRS[idx % COLOR_PAIRS.length];

      const rightModel = createNumberBondSpec({
        part1: fact.partTakenAway,
        part2: fact.missingPart,
        total: fact.total,
        missingPosition: "part2",
        slotKind: "unknown",
        tracePositions,
        colorTheme: primaryTheme,
        secondaryColorTheme: secondaryTheme,
      });

      const textBundle = buildWordProblemText({
        situation: "take-from",
        problemStyle,
        part1: fact.partTakenAway,
        part2: fact.missingPart,
        total: fact.total,
        templateIndex: idx,
        scene: pickedScenes[idx],
      });

      const leftModel = createDigitCardSpec(fact.missingPart, {
        id: `word-problem-card-${fact.total}-${fact.partTakenAway}-${fact.missingPart}`,
        labelAr: textBundle.problemTextAr,
        count: fact.total,
        secondaryCount: fact.partTakenAway,
        meta: {
          isWordProblemEndpoint: true,
          situation: "take-from",
          problemStyle,
          part1: fact.partTakenAway,
          part2: fact.missingPart,
          total: fact.total,
          partTakenAway: fact.partTakenAway,
          missingPart: fact.missingPart,
          part1Ar: p1Ar,
          part2Ar: p2Ar,
          totalAr,
          partTakenAwayAr: p1Ar,
          missingPartAr: p2Ar,
          solvedAnswerAr: p2Ar,
          objectId: textBundle.objectId,
          problemTextAr: textBundle.problemTextAr,
          questionLabelAr: textBundle.questionLabelAr,
          showProblemSlot: effectiveShowProblemSlot,
        },
      });

      return {
        pairId: `pair-${idx + 1}-${fact.key}`,
        rightItem: rightModel,
        leftItem: leftModel,
        connectionReasonAr: `الكلّ ${totalAr} شُطب منه ${p1Ar} فبقي الجزء الناقص ${p2Ar}`,
      };
    });
  }

  if (operation === "subtract") {
    const subFacts = selectSubtractionFacts(
      rng,
      difficultyLevel,
      {
        totalRange,
        minPart,
        count: pairCount,
      },
      usedFacts
    );

    const tracePositions: Array<"total" | "part1"> =
      difficultyLevel === "Easy" ? ["total", "part1"] : [];

    return subFacts.map((fact, idx) => {
      const totalAr = formatEasternNumber(fact.total);
      const p1Ar = formatEasternNumber(fact.partTakenAway);
      const p2Ar = formatEasternNumber(fact.missingPart);

      const rightModel: VisualModelSpec =
        mode === "number-bond-to-equation"
          ? createNumberBondSpec({
              part1: fact.partTakenAway,
              part2: fact.missingPart,
              total: fact.total,
              missingPosition: "none",
              tracePositions,
            })
          : mode === "dice-to-number-bond"
            ? createDicePatternSpec({
                count:
                  fact.partTakenAway === 0 || fact.missingPart === 0
                    ? fact.missingPart
                    : fact.total,
                secondaryCount:
                  fact.partTakenAway === 0 || fact.missingPart === 0
                    ? fact.partTakenAway
                    : 0,
                crossedOutCount: fact.partTakenAway,
                crossOffMode: "shown",
                diceVariant:
                  fact.partTakenAway === 0 || fact.missingPart === 0
                    ? "domino"
                    : "die",
                colorTheme: "coral",
                secondaryColorTheme: "sky",
                hideLabel: true,
              })
            : createFiveFrameSpec({
                count: fact.total,
                secondaryCount: 0,
                crossedOutCount: fact.partTakenAway,
                crossOffMode: "shown",
                colorTheme: "coral",
              });

      const leftModel: VisualModelSpec =
        mode === "five-frame-to-number-bond" || mode === "dice-to-number-bond"
          ? createNumberBondSpec({
              part1: fact.partTakenAway,
              part2: fact.missingPart,
              total: fact.total,
              missingPosition: "part2",
              tracePositions,
            })
          : createEquationStripSpec({
              operation: "subtract",
              total: fact.total,
              part1: fact.partTakenAway,
              part2: fact.missingPart,
              missingPosition: "part2",
              tracePositions,
            });

      return {
        pairId: `pair-${idx + 1}-${fact.key}`,
        rightItem: rightModel,
        leftItem: leftModel,
        connectionReasonAr: `الكلّ ${totalAr} شُطب منه ${p1Ar} فبقي الجزء الناقص ${p2Ar}`,
      };
    });
  }

  const facts = selectAdditionFacts(
    rng,
    difficultyLevel,
    {
      totalRange,
      minPart,
      count: pairCount,
    },
    usedFacts
  );

  const tracePositions: Array<"part1" | "part2"> =
    difficultyLevel === "Easy" ? ["part1", "part2"] : [];

  if (mode === "model-to-word-problem") {
    const scenePool = getStoryScenesForSituation(situation);
    const pickedScenes =
      problemStyle === "story" ? rng.pickN(scenePool, facts.length) : [];
    const effectiveShowProblemSlot =
      showProblemSlot ?? problemStyle === "story";

    return facts.map((fact, idx) => {
      const p1Ar = formatEasternNumber(fact.part1);
      const p2Ar = formatEasternNumber(fact.part2);
      const totalAr = formatEasternNumber(fact.total);
      const [primaryTheme, secondaryTheme] =
        COLOR_PAIRS[idx % COLOR_PAIRS.length];

      const rightModel = createNumberBondSpec({
        part1: fact.part1,
        part2: fact.part2,
        total: fact.total,
        missingPosition: "total",
        slotKind: "unknown",
        tracePositions,
        colorTheme: primaryTheme,
        secondaryColorTheme: secondaryTheme,
      });

      const textBundle = buildWordProblemText({
        situation,
        problemStyle,
        part1: fact.part1,
        part2: fact.part2,
        templateIndex: idx,
        scene: pickedScenes[idx],
      });

      const leftModel = createDigitCardSpec(fact.total, {
        id: `word-problem-card-${fact.part1}-${fact.part2}-${fact.total}`,
        labelAr: textBundle.problemTextAr,
        count: fact.part1,
        secondaryCount: fact.part2,
        meta: {
          isWordProblemEndpoint: true,
          situation,
          problemStyle,
          part1: fact.part1,
          part2: fact.part2,
          total: fact.total,
          part1Ar: p1Ar,
          part2Ar: p2Ar,
          totalAr,
          objectId: textBundle.objectId,
          problemTextAr: textBundle.problemTextAr,
          questionLabelAr: textBundle.questionLabelAr,
          showProblemSlot: effectiveShowProblemSlot,
        },
      });

      return {
        pairId: `pair-${idx + 1}-${fact.key}`,
        rightItem: rightModel,
        leftItem: leftModel,
        connectionReasonAr: `الجزءان ${p1Ar} و${p2Ar} يكوّنان الكلّ ${totalAr}`,
      };
    });
  }

  return facts.map((fact, idx) => {
    const p1Ar = formatEasternNumber(fact.part1);
    const p2Ar = formatEasternNumber(fact.part2);
    const totalAr = formatEasternNumber(fact.total);

    const rightModel: VisualModelSpec =
      mode === "dice-to-number-bond"
        ? createDicePatternSpec({
            count: fact.part1,
            secondaryCount: fact.part2,
            diceVariant:
              fact.part1 === 0 || fact.part2 === 0 ? "domino" : "die",
            colorTheme: "coral",
            secondaryColorTheme: "sky",
            hideLabel: true,
          })
        : mode === "tally-expression-to-total"
          ? createTallyMarksSpec({
              count: Math.max(1, fact.part1),
              secondaryCount: Math.max(1, fact.part2),
            })
          : createFiveFrameSpec({
              count: fact.part1,
              secondaryCount: fact.part2,
              showPartOutline: true,
              colorTheme: "coral",
              secondaryColorTheme: "sky",
            });

    const leftModel: VisualModelSpec =
      mode === "five-frame-to-parts-table"
        ? createDigitCardSpec(fact.total, {
            id: `parts-table-${fact.part1}-${fact.part2}-${fact.total}`,
            labelAr: `جدول الأجزاء والكلّ: ${p1Ar} و${p2Ar} والكلّ ${totalAr}`,
            count: fact.part1,
            secondaryCount: fact.part2,
            meta: {
              isPartsTableEndpoint: true,
              part1: fact.part1,
              part2: fact.part2,
              total: fact.total,
              missingPosition: "total",
              tracePositions,
            },
          })
        : mode === "five-frame-to-number-bond" || mode === "dice-to-number-bond"
          ? createNumberBondSpec({
              part1: fact.part1,
              part2: fact.part2,
              total: fact.total,
              missingPosition: "total",
              tracePositions,
            })
          : mode === "five-frame-to-equation"
            ? createEquationStripSpec({
                part1: fact.part1,
                part2: fact.part2,
                total: fact.total,
                missingPosition: "total",
                tracePositions,
              })
            : createDigitCardSpec(fact.total, {
                meta: {
                  missingTotal: showMissingTotalSlot ? fact.total : undefined,
                },
              });

    return {
      pairId: `pair-${idx + 1}-${fact.key}`,
      rightItem: rightModel,
      leftItem: leftModel,
      connectionReasonAr: `الجزءان ${p1Ar} و${p2Ar} يكوّنان الكلّ ${totalAr}`,
    };
  });
}
