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
  createTenFrameSpec,
  type CrossOffMode,
} from "@/visual-models/unit-2-models";
import {
  createEquationStripSpec,
  createNumberBondSpec,
  type BondMissingPosition,
  type EquationLayout,
} from "@/visual-models/unit-3-models";

export {
  COLOR_PAIRS,
  formatAdditionFactKey,
  formatSubtractionFactKey,
  selectAdditionFacts,
  selectSubtractionFacts,
  type AdditionFact,
  type FactSelectionLimits,
  type SubtractionFact,
} from "@/lib/math-facts";
import {
  COLOR_PAIRS,
  selectAdditionFacts,
  selectSubtractionFacts,
  type AdditionFact,
  type FactSelectionLimits,
  type SubtractionFact,
} from "@/lib/math-facts";

export type {
  JoinPartsAction,
  JoinPartsBlueprintParams,
  JoinPartsData,
  JoinPartsItem,
  JoinPartsPayload,
  JoinPartsPictureSubkind,
  JoinPartsRepresentation,
  JoinPartsResponseForm,
} from "@/archetypes/join-parts";

export type {
  TakeAwayAction,
  TakeAwayBlueprintParams,
  TakeAwayData,
  TakeAwayItem,
  TakeAwayPayload,
  TakeAwayRepresentation,
  TakeAwayResponseForm,
  TakeAwayUnknownKind,
} from "@/archetypes/take-away";

export type PartWholeMatchMode =
  | "five-frame-to-parts-table"
  | "five-frame-to-number-bond"
  | "dice-to-number-bond"
  | "number-bond-to-equation"
  | "five-frame-to-equation"
  | "tally-expression-to-total"
  | "model-to-word-problem"
  | "ten-frame-to-bond"
  | "ten-frame-to-number-bond"
  | "ten-frame-to-equation";

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
  /**
   * model-to-word-problem (add-to / put-together): per-row unknown position,
   * cycled RTL across rows (WORD PROBLEM MATCH B alternates totals and parts).
   * Defaults to ["total"] — WORD PROBLEM MATCH A behavior.
   */
  wordProblemMissingPositions?: Array<"total" | "part2" | "part1">;
  /**
   * Position of the unknown in the matched bond/equation column (MATCHING - F
   * and G fill a Missing Part instead of the Total). Defaults to `"total"`;
   * non-standard Part positions are gated at the ConnectMatch call site (§6.3).
   */
  matchMissingPosition?: "total" | "part2" | "part1";
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

export type PartWholeRepresentation =
  | "pictures"
  | "shapes"
  | "solids"
  | "five-frame"
  | "ten-frame"
  | "domino"
  | "five-frame-and-digit"
  | "ten-frame-and-digit"
  | "picture-graph"
  | string;

export function isZeroCapableRepresentation(
  r: PartWholeRepresentation
): boolean {
  return (
    r === "five-frame" ||
    r === "ten-frame" ||
    r === "domino" ||
    r === "five-frame-and-digit" ||
    r === "ten-frame-and-digit" ||
    r === "picture-graph"
  );
}

export function buildAbstractResponseAndCompanionModels(params: {
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
    wordProblemMissingPositions,
    matchMissingPosition,
  } = input;

  const minPart =
    explicitMinPart !== undefined
      ? explicitMinPart
      : mode === "tally-expression-to-total" || mode === "model-to-word-problem"
        ? 1
        : difficultyLevel === "Advanced"
          ? 0
          : 1;

  // Unknown position of the matched bond/equation column (§6.3 gating lives at
  // the ConnectMatch call site): Part positions swap the Easy trace set so a
  // traced slot never hides the unknown AnswerSlot.
  const matchUnknown: BondMissingPosition =
    matchMissingPosition === "part1" || matchMissingPosition === "part2"
      ? matchMissingPosition
      : "total";
  const matchTracePositions: Array<"part1" | "part2"> =
    difficultyLevel !== "Easy"
      ? []
      : matchUnknown === "part1"
        ? ["part2"]
        : matchUnknown === "part2"
          ? ["part1"]
          : ["part1", "part2"];

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
            : mode === "ten-frame-to-bond" ||
                mode === "ten-frame-to-number-bond" ||
                mode === "ten-frame-to-equation"
              ? createTenFrameSpec({
                  count: fact.total,
                  secondaryCount: 0,
                  crossedOutCount: fact.partTakenAway,
                  crossOffMode: "shown",
                  colorTheme: "coral",
                })
              : createFiveFrameSpec({
                  count: fact.total,
                  secondaryCount: 0,
                  crossedOutCount: fact.partTakenAway,
                  crossOffMode: "shown",
                  colorTheme: "coral",
                });

      const leftModel: VisualModelSpec =
        mode === "five-frame-to-number-bond" ||
        mode === "dice-to-number-bond" ||
        mode === "ten-frame-to-bond" ||
        mode === "ten-frame-to-number-bond"
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

  const tracePositions: Array<"part1" | "part2"> = matchTracePositions;

  if (mode === "model-to-word-problem") {
    const scenePool = getStoryScenesForSituation(situation);
    const pickedScenes =
      problemStyle === "story" ? rng.pickN(scenePool, facts.length) : [];
    const effectiveShowProblemSlot =
      showProblemSlot ?? problemStyle === "story";
    const missingPositionPool: Array<"total" | "part2" | "part1"> =
      wordProblemMissingPositions && wordProblemMissingPositions.length > 0
        ? wordProblemMissingPositions
        : ["total"];

    return facts.map((fact, idx) => {
      const p1Ar = formatEasternNumber(fact.part1);
      const p2Ar = formatEasternNumber(fact.part2);
      const totalAr = formatEasternNumber(fact.total);
      const [primaryTheme, secondaryTheme] =
        COLOR_PAIRS[idx % COLOR_PAIRS.length];
      const rowMissingPosition =
        missingPositionPool[idx % missingPositionPool.length];

      const rightModel = createNumberBondSpec({
        part1: fact.part1,
        part2: fact.part2,
        total: fact.total,
        missingPosition: rowMissingPosition,
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
          endpointMissingPosition: rowMissingPosition,
          ...(rowMissingPosition === "total"
            ? {}
            : {
                solvedAnswerAr: rowMissingPosition === "part2" ? p2Ar : p1Ar,
              }),
        },
      });

      return {
        pairId: `pair-${idx + 1}-${fact.key}`,
        rightItem: rightModel,
        leftItem: leftModel,
        connectionReasonAr:
          rowMissingPosition === "total"
            ? `الجزءان ${p1Ar} و${p2Ar} يكوّنان الكلّ ${totalAr}`
            : rowMissingPosition === "part2"
              ? `الجزءان ${p1Ar} والجزء الناقص ${p2Ar} يكوّنان الكلّ ${totalAr}`
              : `الجزء الناقص ${p1Ar} والجزءان ${p2Ar} يكوّنان الكلّ ${totalAr}`,
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
          : mode === "ten-frame-to-bond" ||
              mode === "ten-frame-to-number-bond" ||
              mode === "ten-frame-to-equation"
            ? createTenFrameSpec({
                count: fact.part1,
                secondaryCount: fact.part2,
                showPartOutline: true,
                colorTheme: "coral",
                secondaryColorTheme: "sky",
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
        : mode === "five-frame-to-number-bond" ||
            mode === "dice-to-number-bond" ||
            mode === "ten-frame-to-bond" ||
            mode === "ten-frame-to-number-bond"
          ? createNumberBondSpec({
              part1: fact.part1,
              part2: fact.part2,
              total: fact.total,
              missingPosition: matchUnknown,
              tracePositions,
            })
          : mode === "five-frame-to-equation" ||
              mode === "ten-frame-to-equation"
            ? createEquationStripSpec({
                part1: fact.part1,
                part2: fact.part2,
                total: fact.total,
                missingPosition: matchUnknown,
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
