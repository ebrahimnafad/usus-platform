import React from "react";
import { registerExerciseArchetype } from "@/archetypes/registry";
import type {
  ColorThemeId,
  Exercise,
  GenericArchetypeData,
  Shape2DId,
  Solid3DId,
  VisualModelSpec,
} from "@/domain/types";
import {
  createShape2DSpec,
  createSolid3DSpec,
  getShape2DById,
  getSolid3DById,
  getShapePluralAr,
  getSolidPluralAr,
  Shape2DSvg,
  Solid3DSvg,
} from "@/visual-models/shapes-solids-coins";
import {
  createDicePatternSpec,
  createFiveFrameSpec,
  createTenFrameSpec,
  getArabicNumberWord,
} from "@/visual-models/unit-2-models";
import { createNumberBondSpec } from "@/visual-models/unit-3-models";
import {
  createEverydayObjectSpec,
  EVERYDAY_OBJECT_CATALOG,
  getEverydayObjectById,
} from "@/visual-models/everyday-objects";
import {
  CUBE_CONE_CYLINDER_SET,
  TRIANGLE_HEXAGON_CIRCLE_SET,
  TRIANGLE_SQUARE_CIRCLE_SET,
  type TenFrameCountedCategory,
} from "@/lib/ten-frame-category-sets";
import { VisualModelView } from "@/visual-models/registry";
import {
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import {
  ANSWER_SLOT_SIZE_CLASS,
  AnswerLine,
  AnswerSlot,
} from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";

export type SubitizeMode =
  | "identify-quantity"
  | "both-parts-to-5"
  | "both-parts-to-10"
  | "number-bond-maze"
  | "three-parts-to-10"
  | "decompose-teen";

export type SubitizeVisualKind =
  | "five-frame"
  | "five-frame-and-dice"
  | "five-frame-and-shapes"
  | "ten-frame"
  | "ten-frame-and-shapes"
  | "ten-frame-ghost";

export interface SubitizeCardInput {
  filledCount: number;
  secondaryFilledCount?: number;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  quickStrategyAr?: string;
  shapeId?: Shape2DId;
  solidId?: Solid3DId;
}

export type SubitizeCategoryInput = TenFrameCountedCategory;

export interface SubitizeThreePartCategorySet {
  id: string;
  categories: SubitizeCategoryInput[];
}

export interface SubitizeThreePartCardItem {
  id: string;
  cardIndex: number;
  categories: Array<{
    count: number;
    countAr: string;
    labelAr: string;
    colorTheme: ColorThemeId;
    shapeId?: Shape2DId;
    solidId?: Solid3DId;
  }>;
  totalCount: number;
  totalCountAr: string;
  equationRtlAr: string;
  quickStrategyAr: string;
  visualModel: VisualModelSpec;
}

export interface SubitizeMazeBondInput {
  part1: number;
  part2: number;
  total?: number;
}

export interface SubitizeMazeBondItem {
  id: string;
  part1: number;
  part2: number;
  total: number;
  isTarget: boolean;
  visualModel: VisualModelSpec;
}

export interface SubitizePartWholeBlueprintParams {
  subitizeMode?: SubitizeMode;
  visualKind?: SubitizeVisualKind;
  candidateCounts?: number[];
  cardCount?: number;
  cards?: SubitizeCardInput[];
  /** decompose-teen: optional shape shown with the ones-group companion */
  shapeId?: Shape2DId;
  /** decompose-teen: solid shown with the ones-group companion (K-104 PoD) */
  solidId?: Solid3DId;
  reasoningPromptAr?: string;
  reasoningAnswerAr?: string;
  targetTotal?: number;
  mazeBonds?: SubitizeMazeBondInput[];
  /** three-parts-to-10: category trios (blue → red → green) that fill each card's Ten Frame */
  threePartCategorySets?: SubitizeThreePartCategorySet[];
}

export interface SubitizeCardItem {
  id: string;
  cardIndex: number;
  filledCount: number;
  filledCountAr: string;
  filledWordAr: string;
  missingCount: number;
  missingCountAr: string;
  missingWordAr: string;
  totalCount: number;
  totalCountAr: string;
  quickStrategyAr: string;
  equationRtlAr: string;
  visualModel: VisualModelSpec;
  companionModel?: VisualModelSpec;
  shapeId?: Shape2DId;
  solidId?: Solid3DId;
}

export interface SubitizePartWholeData extends GenericArchetypeData {
  kind: "SubitizePartWhole";
  subitizeMode: SubitizeMode;
  visualKind: SubitizeVisualKind;
  cards: SubitizeCardItem[];
  reasoningPromptAr: string;
  reasoningAnswerAr: string;
  targetTotal?: number;
  mazeBonds?: SubitizeMazeBondItem[];
  threePartCards?: SubitizeThreePartCardItem[];
}

const SUBITIZE_THEMES: ColorThemeId[] = [
  "coral",
  "sky",
  "emerald",
  "violet",
  "amber",
  "rose",
  "teal",
];

const SHAPE_IDS_CYCLE: Shape2DId[] = [
  "triangle",
  "square",
  "hexagon",
  "pentagon",
  "circle",
];

const SOLID_IDS_CYCLE: Solid3DId[] = [
  "cube",
  "cone",
  "cylinder",
  "sphere",
  "pyramid",
];

/**
 * K-76 category trios: every category = one Part, fixed blue → red → green color
 * coding (a color cue paired with a distinct shape/solid so the page reads in
 * grayscale — constitution §2.5). Counts come from the Seed.
 */
const DEFAULT_THREE_PART_CATEGORY_SETS: SubitizeThreePartCategorySet[] = [
  TRIANGLE_SQUARE_CIRCLE_SET,
  TRIANGLE_HEXAGON_CIRCLE_SET,
  CUBE_CONE_CYLINDER_SET,
];

const THREE_PART_ANCHORED_THEMES: ColorThemeId[] = ["sky", "coral", "emerald"];

function buildDefaultQuickStrategyAr(
  filledCount: number,
  missingCount: number,
  subitizeMode: SubitizeMode,
  totalCount: number
): string {
  const filledAr = formatEasternNumber(filledCount);
  const missingAr = formatEasternNumber(missingCount);
  const totalAr = formatEasternNumber(totalCount);

  if (subitizeMode === "decompose-teen") {
    return `تعرّف سريع على المجموعة الكاملة (${filledAr}) في لوحة العشرة ثم ${missingAr} أكثر يساوي ${totalAr}`;
  }

  if (subitizeMode === "both-parts-to-10") {
    if (missingCount === 0) {
      return `لوحة العشرة ممتلئة بالكامل: الجزء الموجود (${filledAr}) والفارغ (٠) يكوّنان معاً الكل (١٠)`;
    }
    return `تعرّف سريع على الجزأين: (${filledAr}) موجود و(${missingAr}) فارغ يكوّنان معاً الكل (١٠)`;
  }

  if (subitizeMode === "both-parts-to-5") {
    if (missingCount === 0) {
      return `اللوحة ممتلئة بالكامل: الجزء الموجود (${filledAr}) والجزء الفارغ (٠) يكوّنان معاً الكل (٥)`;
    }
    return `تعرّف سريع على الجزأين: (${filledAr}) موجود و(${missingAr}) فارغ يكوّنان معاً الكل (٥)`;
  }

  if (totalCount === 10) {
    if (filledCount === 10) {
      return "لوحة العشرة ممتلئة بالكامل (٠ فارغ) ← العدد هو ١٠ فوراً دون عدّ";
    }
    if (filledCount >= 5) {
      const extra = filledCount - 5;
      return `الصفّ العلوي ممتلئ (٥) مع ${formatEasternNumber(extra)} في الأسفل ← العدد هو ${filledAr} فوراً`;
    }
    return `${missingAr} خانات فارغة في لوحة العشرة ← العدد هو ${filledAr}`;
  }

  if (filledCount === 5) {
    return "لوحة الخمسة ممتلئة بالكامل (٠ فارغ) ← العدد هو ٥ فوراً دون عدّ";
  }
  if (filledCount === 4) {
    return "خانة واحدة (١) فارغة فقط ← العدد الموجود هو ٤ فوراً";
  }
  if (filledCount === 3) {
    return "خانتان (٢) فارغتان ← العدد الموجود هو ٣ فوراً";
  }
  if (filledCount === 2) {
    return "قرصان متجاوران في اليمين و٣ خانات فارغة ← العدد هو ٢";
  }
  return "قرص واحد في اليمين و٤ خانات فارغة ← العدد هو ١";
}

/**
 * K-76 «Model Combinations of 10 with 3 Parts»: three shape/solid Parts
 * (blue → red → green) whose counts always sum to 10 (§7.4). Easy anchors the
 * first Part at 5 (full top row); Advanced breaks the 5-anchor.
 */
function generateThreePartsTo10Exercise(
  ctx: ArchetypeGeneratorContext,
  params: SubitizePartWholeBlueprintParams
): Exercise {
  const subitizeMode: SubitizeMode = "three-parts-to-10";
  const categorySets =
    params.threePartCategorySets && params.threePartCategorySets.length > 0
      ? params.threePartCategorySets
      : DEFAULT_THREE_PART_CATEGORY_SETS;
  const cardCount = Math.max(1, Math.min(2, params.cardCount ?? 1));
  const totalCount = 10;
  const totalCountAr = formatEasternNumber(totalCount);

  const defaultPart1Range =
    ctx.difficultyLevel === "Easy"
      ? [5]
      : ctx.difficultyLevel === "Intermediate"
        ? [3, 4, 5, 6, 7]
        : [2, 3, 4, 6, 7, 8];

  const cards: SubitizeThreePartCardItem[] = Array.from(
    { length: cardCount },
    (_, cardIdx) => {
      const set = categorySets[cardIdx % categorySets.length];
      const inputs = set.categories;

      // Seed unpinned counts, keeping every Part ≥ 1 and the sum at 10:
      // part1 ∈ [1,8], part2 clamped to [1, 10-part1-1], part3 = the remainder.
      const part1 = Math.max(
        1,
        Math.min(8, inputs[0].count ?? ctx.rng.pickOne(defaultPart1Range))
      );
      const part2 = Math.max(
        1,
        Math.min(
          inputs[1].count ?? ctx.rng.int(1, totalCount - part1 - 1),
          totalCount - part1 - 1
        )
      );
      const part3 = totalCount - part1 - part2;
      const counts = [part1, part2, part3];

      const categories = inputs.map((input, i) => {
        const colorTheme = input.colorTheme ?? THREE_PART_ANCHORED_THEMES[i];
        const labelAr = input.shapeId
          ? getShapePluralAr(input.shapeId)
          : input.solidId
            ? getSolidPluralAr(input.solidId)
            : "قرصون";
        return {
          count: counts[i],
          countAr: formatEasternNumber(counts[i]),
          labelAr,
          colorTheme,
          shapeId: input.shapeId,
          solidId: input.solidId,
        };
      });

      const countsAr = categories.map((c) => c.countAr);
      const equationRtlAr = `${countsAr[0]} و${countsAr[1]} و${countsAr[2]} يكوّنون الكلّ ${totalCountAr}`;

      const isAnchored = counts[0] === 5;
      const quickStrategyAr = isAnchored
        ? `بلمحة واحدة: الصفّ العلوي الكامل (٥) والصفّ السفلي الكامل (٥) ← الكلّ ${totalCountAr} دون عدّ فردي`
        : `بلمحة واحدة: ثلاثة أجزاء (${countsAr[0]} و${countsAr[1]} و${countsAr[2]}) تجتمع معاً في لوحة العشرة لتساوي الكلّ ${totalCountAr}`;

      const visualModel = createTenFrameSpec({
        count: counts[0],
        secondaryCount: counts[1],
        tertiaryCount: counts[2],
        colorTheme: categories[0].colorTheme,
        secondaryColorTheme: categories[1].colorTheme,
        tertiaryColorTheme: categories[2].colorTheme,
        shapeId: categories[0].shapeId,
        solidId: categories[0].solidId,
        secondaryShapeId: categories[1].shapeId,
        secondarySolidId: categories[1].solidId,
        tertiaryShapeId: categories[2].shapeId,
        tertiarySolidId: categories[2].solidId,
        highlightEmptySlots: true,
        showPartOutline: true,
      });

      return {
        id: `three-parts-card-${cardIdx + 1}-${set.id}`,
        cardIndex: cardIdx,
        categories,
        totalCount,
        totalCountAr,
        equationRtlAr,
        quickStrategyAr:
          params.cards?.[cardIdx]?.quickStrategyAr ?? quickStrategyAr,
        visualModel,
      };
    }
  );

  const visualModels = cards.map((card) => card.visualModel);

  const firstCard = cards[0];
  const countsAr = firstCard.categories.map((c) => c.countAr);
  const defaultPromptAr = `انظر إلى لوحة العشرة، ثم عدّ الأجزاء الثلاثة واكتب عدد كلّ جزء:`;
  const defaultStrategyHintAr = firstCard.quickStrategyAr;
  const defaultReasoningPromptAr = `كيف عرفت الكلّ (${totalCountAr}) على اللوحة دون أن تعدّ الأشكال واحدة واحدة؟`;
  const defaultReasoningAnswerAr = `الأجزاء الثلاثة (${countsAr[0]} و${countsAr[1]} و${countsAr[2]}) تجتمع معاً في لوحة العشرة فتساوي الكلّ ${totalCountAr} بترتيب من اليمين إلى اليسار`;

  const data: SubitizePartWholeData = {
    kind: "SubitizePartWhole",
    subitizeMode,
    visualKind: "ten-frame",
    cards: [],
    threePartCards: cards,
    reasoningPromptAr: params.reasoningPromptAr ?? defaultReasoningPromptAr,
    reasoningAnswerAr: params.reasoningAnswerAr ?? defaultReasoningAnswerAr,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "SubitizePartWhole",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: `اعرف العدد بسرعة: الأجزاء الثلاثة والكلّ (مكوّنات ${totalCountAr})`,
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function generateDecomposeTeenExercise(
  ctx: ArchetypeGeneratorContext,
  params: SubitizePartWholeBlueprintParams
): Exercise {
  // Teen decomposition cards: the full 10-group (Ten Frame) plus a ones-group
  // companion (10 and some more). Easy tier keeps teens 11–15; beyond that the
  // full range 11–20 is in play.
  const candidateCounts =
    params.candidateCounts && params.candidateCounts.length > 0
      ? params.candidateCounts
      : ctx.difficultyLevel === "Easy"
        ? [11, 12, 13, 14, 15]
        : [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const cardCount = Math.max(
    1,
    Math.min(candidateCounts.length, params.cardCount ?? 2)
  );

  const pickedTeens = ctx.rng.pickN(candidateCounts, cardCount);
  const shuffledThemes = ctx.rng.shuffle(SUBITIZE_THEMES);

  const cards: SubitizeCardItem[] = pickedTeens.map((teen, idx) => {
    const filledCount = 10;
    const missingCount = teen - 10;
    const totalCount = teen;

    const filledCountAr = formatEasternNumber(filledCount);
    const missingCountAr = formatEasternNumber(missingCount);
    const totalCountAr = formatEasternNumber(totalCount);

    const primaryTheme = shuffledThemes[idx % shuffledThemes.length];
    const secondaryTheme = shuffledThemes[(idx + 1) % shuffledThemes.length];

    const visualModel = createTenFrameSpec({
      count: filledCount,
      secondaryCount: 0,
      colorTheme: primaryTheme,
      secondaryColorTheme: secondaryTheme,
      highlightEmptySlots: false,
      showPartOutline: false,
      labelAr: `المجموعة الكاملة: ${filledCountAr}`,
    });

    let companionModel: VisualModelSpec | undefined;
    if (params.solidId) {
      const solidDef = getSolid3DById(params.solidId);
      companionModel = createSolid3DSpec(solidDef.id, {
        count: missingCount,
        colorTheme: secondaryTheme,
        size: "small",
        labelAr: `${missingCountAr} (${solidDef.labelAr})`,
      });
    } else if (params.shapeId) {
      const shapeDef = getShape2DById(params.shapeId);
      companionModel = createShape2DSpec(shapeDef.id, {
        count: missingCount,
        colorTheme: secondaryTheme,
        size: "small",
        labelAr: `${missingCountAr} (${shapeDef.labelAr})`,
      });
    } else {
      // Default companion: the ones-group of everyday objects (10 and some more).
      const objDef = getEverydayObjectById(
        EVERYDAY_OBJECT_CATALOG[idx % EVERYDAY_OBJECT_CATALOG.length].id
      );
      companionModel = createEverydayObjectSpec(objDef, {
        count: missingCount,
        size: "tiny",
        colorTheme: secondaryTheme,
        labelAr: `${missingCountAr} (${objDef.labelAr})`,
        meta: { objectId: objDef.id, groupedItems: true },
      });
    }

    const quickStrategyAr = buildDefaultQuickStrategyAr(
      filledCount,
      missingCount,
      "decompose-teen",
      totalCount
    );
    const equationRtlAr = `${filledCountAr} و${missingCountAr} يكوّنان ${totalCountAr}`;

    return {
      id: `subitize-teen-card-${idx + 1}-t${totalCount}`,
      cardIndex: idx,
      filledCount,
      filledCountAr,
      filledWordAr: getArabicNumberWord(filledCount),
      missingCount,
      missingCountAr,
      missingWordAr: getArabicNumberWord(missingCount),
      totalCount,
      totalCountAr,
      quickStrategyAr,
      equationRtlAr,
      visualModel,
      companionModel,
      shapeId: params.shapeId,
      solidId: params.solidId,
    };
  });

  const visualModels: VisualModelSpec[] = [];
  for (const card of cards) {
    visualModels.push(card.visualModel);
    if (card.companionModel) {
      visualModels.push(card.companionModel);
    }
  }

  const defaultPromptAr =
    "انظر إلى لوحة العشرة الكاملة ثم عدّ القليل الإضافي واكتب الكلّ";
  const defaultStrategyHintAr =
    "انظر إلى المجموعة الكاملة (١٠) وتعرّف عليها بلمحة واحدة دون عدّ فردي، ثم أضف القليل الإضافي";
  const defaultAnswerAr = `${formatEasternNumber(10)} وأكثر يساوي الكلّ`;

  const data: SubitizePartWholeData = {
    kind: "SubitizePartWhole",
    subitizeMode: "decompose-teen",
    visualKind: "ten-frame",
    cards,
    reasoningPromptAr: params.reasoningPromptAr ?? defaultPromptAr,
    reasoningAnswerAr: params.reasoningAnswerAr ?? defaultAnswerAr,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "SubitizePartWhole",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "اعرف العدد بسرعة: تفكيك الأعداد المراهقة (١٠ وقليل أكثر)",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function generateSubitizePartWholeExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as SubitizePartWholeBlueprintParams;

  const defaultMode: SubitizeMode =
    ctx.lesson.lessonNumber === 26
      ? "both-parts-to-5"
      : ctx.lesson.lessonNumber === 68
        ? "both-parts-to-10"
        : "identify-quantity";
  const subitizeMode: SubitizeMode = params.subitizeMode ?? defaultMode;

  if (subitizeMode === "three-parts-to-10") {
    return generateThreePartsTo10Exercise(ctx, params);
  }

  if (subitizeMode === "decompose-teen") {
    return generateDecomposeTeenExercise(ctx, params);
  }

  const isTenLesson =
    ctx.lesson.lessonNumber >= 67 ||
    subitizeMode === "both-parts-to-10" ||
    params.visualKind === "ten-frame" ||
    params.visualKind === "ten-frame-and-shapes" ||
    params.visualKind === "ten-frame-ghost";

  const totalCount = isTenLesson ? 10 : 5;

  const defaultVisualKind: SubitizeVisualKind = isTenLesson
    ? "ten-frame"
    : "five-frame";
  const visualKind: SubitizeVisualKind = params.visualKind ?? defaultVisualKind;

  if (subitizeMode === "number-bond-maze") {
    const targetTotal = params.targetTotal ?? 9;
    const defaultMazeBonds: SubitizeMazeBondInput[] = [
      { part1: 5, part2: 4, total: 9 },
      { part1: 6, part2: 3, total: 9 },
      { part1: 7, part2: 2, total: 9 },
      { part1: 8, part2: 1, total: 9 },
      { part1: 5, part2: 3, total: 8 },
      { part1: 6, part2: 4, total: 10 },
    ];
    const inputBonds =
      params.mazeBonds && params.mazeBonds.length > 0
        ? params.mazeBonds
        : defaultMazeBonds;
    const mazeBonds: SubitizeMazeBondItem[] = inputBonds.map((b, idx) => {
      const tot = b.total ?? b.part1 + b.part2;
      const isTarget = tot === targetTotal;
      const visualModel = createNumberBondSpec({
        part1: b.part1,
        part2: b.part2,
        total: tot,
        missingPosition: "none",
        colorTheme: isTarget ? "emerald" : "indigo",
      });
      return {
        id: `maze-bond-${idx + 1}-${b.part1}-${b.part2}`,
        part1: b.part1,
        part2: b.part2,
        total: tot,
        isTarget,
        visualModel,
      };
    });

    const targetTotalAr = formatEasternNumber(targetTotal);
    const defaultPromptAr = `ابحث عن طريقك في المتاهة ثم حوّط رابطة الأعداد إذا كان الكلّ ${targetTotalAr}:`;
    const defaultStrategyHintAr = `انظر إلى دائرة الكلّ في أعلى كل رابطة عددية، وحوّط الروابط التي مجموع جزأيها يساوي ${targetTotalAr}.`;
    const defaultReasoningPromptAr = `ما روابط الأعداد التي يبلغ مجموعها ${targetTotalAr} في المتاهة؟`;
    const defaultReasoningAnswerAr = `الروابط التي يبلغ مجموعها ٩ هي: (٥ و٤)، (٦ و٣)، (٧ و٢)، (٨ و١)`;

    const data: SubitizePartWholeData = {
      kind: "SubitizePartWhole",
      subitizeMode,
      visualKind,
      cards: [],
      mazeBonds,
      targetTotal,
      reasoningPromptAr: params.reasoningPromptAr ?? defaultReasoningPromptAr,
      reasoningAnswerAr: params.reasoningAnswerAr ?? defaultReasoningAnswerAr,
    };

    return {
      id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
      exerciseNumber: ctx.exerciseNumber,
      sectionId: ctx.sectionId,
      archetype: "SubitizePartWhole",
      difficultyLevel: ctx.difficultyLevel,
      sourceLessonId: ctx.sourceLessonId,
      titleAr: `متاهة روابط الأعداد (الكلّ ${targetTotalAr})`,
      promptAr: ctx.spec.promptAr ?? defaultPromptAr,
      strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
      visualModels: mazeBonds.map((b) => b.visualModel),
      data,
    };
  }

  const defaultCardCount = 2;
  const cardCount = Math.max(
    2,
    Math.min(2, params.cardCount ?? defaultCardCount)
  );

  const shuffledThemes = ctx.rng.shuffle(SUBITIZE_THEMES);

  let rawCards: SubitizeCardInput[] = [];
  if (params.cards && params.cards.length > 0) {
    const picked = ctx.rng.pickN(params.cards, cardCount);
    rawCards = picked.map((c, idx) => ({
      ...c,
      colorTheme: c.colorTheme ?? shuffledThemes[idx % shuffledThemes.length],
    }));
  } else {
    const candidateCounts =
      params.candidateCounts && params.candidateCounts.length > 0
        ? params.candidateCounts
        : totalCount === 10
          ? subitizeMode === "both-parts-to-10"
            ? [6, 7, 8, 9]
            : [6, 7, 8, 10]
          : subitizeMode === "both-parts-to-5"
            ? [2, 3, 4, 5]
            : [3, 4, 5, 2];

    const pickedCounts = ctx.rng.pickN(candidateCounts, cardCount);
    rawCards = pickedCounts.map((count, idx) => ({
      filledCount: count,
      colorTheme: shuffledThemes[idx % shuffledThemes.length],
      secondaryColorTheme: shuffledThemes[(idx + 2) % shuffledThemes.length],
    }));
  }

  const cards: SubitizeCardItem[] = rawCards.map((cardSpec, idx) => {
    const filledCount = Math.max(1, Math.min(totalCount, cardSpec.filledCount));
    const missingCount = Math.max(0, totalCount - filledCount);

    const filledCountAr = formatEasternNumber(filledCount);
    const missingCountAr = formatEasternNumber(missingCount);
    const totalCountAr = formatEasternNumber(totalCount);

    const primaryTheme =
      cardSpec.colorTheme ?? shuffledThemes[idx % shuffledThemes.length];
    const secondaryTheme =
      cardSpec.secondaryColorTheme ??
      shuffledThemes[(idx + 1) % shuffledThemes.length];

    const resolvedShapeId =
      cardSpec.shapeId ??
      (visualKind === "ten-frame-and-shapes" && !cardSpec.solidId
        ? SHAPE_IDS_CYCLE[idx % SHAPE_IDS_CYCLE.length]
        : undefined);
    const resolvedSolidId = cardSpec.solidId;

    let visualModel: VisualModelSpec;
    if (
      visualKind === "ten-frame" ||
      visualKind === "ten-frame-and-shapes" ||
      visualKind === "ten-frame-ghost"
    ) {
      const isGhost = visualKind === "ten-frame-ghost";
      const primary = Math.min(5, filledCount);
      const secondary = Math.max(0, filledCount - 5);
      const ghostCount = isGhost ? missingCount : 0;

      visualModel = createTenFrameSpec({
        count: primary + secondary,
        secondaryCount: 0,
        ghostTargetCount: ghostCount,
        colorTheme: primaryTheme,
        secondaryColorTheme: secondaryTheme,
        highlightEmptySlots: true,
        showPartOutline: true,
        shapeId: resolvedShapeId,
        solidId: resolvedSolidId,
        labelAr:
          missingCount > 0
            ? `لوحة العشرة: ${filledCountAr} موجود و${missingCountAr} فارغ (الكل ١٠)`
            : `لوحة العشرة ممتلئة: ${filledCountAr} من ١٠`,
      });
    } else {
      visualModel = createFiveFrameSpec({
        count: filledCount,
        secondaryCount: 0,
        colorTheme: primaryTheme,
        secondaryColorTheme: secondaryTheme,
        highlightEmptySlots: true,
        showPartOutline: true,
        labelAr:
          missingCount > 0
            ? `لوحة الخمسة: ${filledCountAr} مملوء و${missingCountAr} فارغ (الكل ٥)`
            : `لوحة الخمسة ممتلئة: ${filledCountAr} من ٥`,
      });
    }

    let companionModel: VisualModelSpec | undefined;
    if (visualKind === "five-frame-and-dice") {
      const subA =
        filledCount >= 3 ? Math.floor(filledCount / 2) + 1 : filledCount;
      const subB = Math.max(0, filledCount - subA);
      companionModel = createDicePatternSpec({
        count: subA,
        secondaryCount: subB,
        colorTheme: primaryTheme,
        secondaryColorTheme: secondaryTheme,
        labelAr: `نرد التعرّف السريع: ${filledCountAr}`,
      });
    } else if (
      visualKind === "five-frame-and-shapes" ||
      visualKind === "ten-frame-and-shapes"
    ) {
      if (cardSpec.solidId) {
        const solidDef = getSolid3DById(cardSpec.solidId);
        companionModel = createSolid3DSpec(solidDef.id, {
          count: missingCount > 0 ? missingCount : filledCount,
          colorTheme: primaryTheme,
          size: "small",
          labelAr: `${formatEasternNumber(missingCount > 0 ? missingCount : filledCount)} (${solidDef.labelAr})`,
        });
      } else {
        const shapeId =
          cardSpec.shapeId ??
          SHAPE_IDS_CYCLE[(idx + filledCount) % SHAPE_IDS_CYCLE.length];
        const shapeDef = getShape2DById(shapeId);
        companionModel = createShape2DSpec(shapeDef.id, {
          count: missingCount > 0 ? missingCount : filledCount,
          colorTheme: primaryTheme,
          size: "small",
          labelAr: `${formatEasternNumber(missingCount > 0 ? missingCount : filledCount)} (${shapeDef.labelAr})`,
        });
      }
    } else if (cardSpec.solidId) {
      const solidDef = getSolid3DById(cardSpec.solidId);
      companionModel = createSolid3DSpec(solidDef.id, {
        count: filledCount,
        colorTheme: primaryTheme,
        size: "small",
        labelAr: `${filledCountAr} (${solidDef.labelAr})`,
      });
    } else if (cardSpec.shapeId) {
      const shapeDef = getShape2DById(cardSpec.shapeId);
      companionModel = createShape2DSpec(shapeDef.id, {
        count: filledCount,
        colorTheme: primaryTheme,
        size: "small",
        labelAr: `${filledCountAr} (${shapeDef.labelAr})`,
      });
    }

    const quickStrategyAr =
      cardSpec.quickStrategyAr ??
      buildDefaultQuickStrategyAr(
        filledCount,
        missingCount,
        subitizeMode,
        totalCount
      );

    const equationRtlAr = `${filledCountAr} و${missingCountAr} يكوّنان ${totalCountAr}`;

    return {
      id: `subitize-card-${idx + 1}-f${filledCount}`,
      cardIndex: idx,
      filledCount,
      filledCountAr,
      filledWordAr: getArabicNumberWord(filledCount),
      missingCount,
      missingCountAr,
      missingWordAr: getArabicNumberWord(missingCount),
      totalCount,
      totalCountAr,
      quickStrategyAr,
      equationRtlAr,
      visualModel,
      companionModel,
      shapeId: resolvedShapeId,
      solidId: resolvedSolidId,
    };
  });

  const visualModels: VisualModelSpec[] = [];
  for (const card of cards) {
    visualModels.push(card.visualModel);
    if (card.companionModel) {
      visualModels.push(card.companionModel);
    }
  }

  const frameNameAr = totalCount === 10 ? "لوحة العشرة" : "لوحة الخمسة";
  const defaultPromptAr =
    subitizeMode === "both-parts-to-10" || subitizeMode === "both-parts-to-5"
      ? `اعرف العدد بسرعة دون عدّ فردي: حدّد الجزأين على ${frameNameAr} (كم موجود؟ وكم ينقص لإكمال ${formatEasternNumber(totalCount)}؟) لتكوين الكل (${formatEasternNumber(totalCount)}):`
      : `اعرف العدد بسرعة (في لمحة واحدة دون عدّ فردي) من خلال ملاحظة الخانات المملوءة والخانات الفارغة على ${frameNameAr}:`;

  const cardsBreakdownAr = cards
    .map(
      (c) =>
        `${c.filledCountAr} موجود و${c.missingCountAr} فارغ = ${c.totalCountAr}`
    )
    .join("؛ ");

  const defaultStrategyHintAr =
    subitizeMode === "both-parts-to-10" || subitizeMode === "both-parts-to-5"
      ? `لا تعدّ واحداً بواحد! انظر إلى الجزأين معاً على ${frameNameAr} (${cardsBreakdownAr})؛ مجموع الجزء الموجود والجزء الفارغ يساوي دائماً الكل (${formatEasternNumber(totalCount)}).`
      : `استخدم الخانات الفارغة لمعرفة العدد فوراً دون عدّ فردي (${cardsBreakdownAr}).`;

  const firstCard = cards[0];
  const defaultReasoningPromptAr =
    subitizeMode === "both-parts-to-10" || subitizeMode === "both-parts-to-5"
      ? `في البطاقة الأولى يوجد (${firstCard.filledCountAr})؛ كم ينقصها لإكمال الكل (${formatEasternNumber(totalCount)})؟ وكيف عرفت ذلك بسرعة دون العدّ واحداً بواحد؟`
      : `كيف نعرف فوراً أن على ${frameNameAr} أعداد الأقراص بملاحظة الخانات الفارغة دون حاجة للعدّ الفردي؟`;

  const defaultReasoningAnswerAr =
    subitizeMode === "both-parts-to-10" || subitizeMode === "both-parts-to-5"
      ? `ينقصها (${firstCard.missingCountAr}) لإكمال ${formatEasternNumber(totalCount)}، لأن ${firstCard.filledCountAr} و${firstCard.missingCountAr} يكوّنان معاً الكل (${formatEasternNumber(totalCount)})`
      : `لأن ${frameNameAr} تتسع لـ ${formatEasternNumber(totalCount)}؛ فبملاحظة الخانات الفارغة نعرف العدد الموجود فوراً دون عدّ`;

  const data: SubitizePartWholeData = {
    kind: "SubitizePartWhole",
    subitizeMode,
    visualKind,
    cards,
    reasoningPromptAr: params.reasoningPromptAr ?? defaultReasoningPromptAr,
    reasoningAnswerAr: params.reasoningAnswerAr ?? defaultReasoningAnswerAr,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "SubitizePartWhole",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr:
      subitizeMode === "both-parts-to-10" || subitizeMode === "both-parts-to-5"
        ? `اعرف العدد بسرعة: الأجزاء والكل (مكوّنات ${formatEasternNumber(totalCount)})`
        : `اعرف العدد بسرعة دون عدّ (${frameNameAr})`,
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function renderSubitizePartWholeExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as SubitizePartWholeData;
  const isAnswerKey = mode === "answer-key";

  if (data.subitizeMode === "three-parts-to-10" && data.threePartCards) {
    return (
      <div
        className="space-y-1"
        data-archetype="SubitizePartWhole"
        data-subitize-mode={data.subitizeMode}
      >
        <ExerciseColumns columns={2}>
          {data.threePartCards.map((card, idx) => (
            <div
              key={card.id}
              className="flex flex-col justify-between gap-1 rounded-xl border-2 border-indigo-100 bg-gradient-to-l from-white via-indigo-50/20 to-emerald-50/30 p-1.5 shadow-2xs"
              data-three-part-card-id={card.id}
              data-card-index={formatEasternNumber(idx + 1)}
            >
              {/* Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold leading-none text-white">
                  {formatEasternNumber(idx + 1)}
                </span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-extrabold leading-tight text-amber-950 border border-amber-300">
                  ⚡ لمحة سريعة
                </span>
                {isAnswerKey && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-extrabold leading-tight text-emerald-900">
                    ✓ {toEasternArabicNumerals(card.equationRtlAr)}
                  </span>
                )}
              </div>

              {/* Ten Frame with three category runs */}
              <div className="flex items-center justify-center">
                <VisualModelView
                  model={card.visualModel}
                  solved={isAnswerKey}
                />
              </div>

              {/* Answer Slots: three category Parts + the Whole */}
              <div className="grid grid-cols-4 gap-1 rounded-xl border border-indigo-200 bg-white p-1">
                {card.categories.map((category, catIdx) => (
                  <div
                    key={`${card.id}-cat-${catIdx}`}
                    className={`flex flex-col items-center gap-0.5 rounded-lg px-0.5 pt-0.5 pb-1 border ${
                      catIdx === 0
                        ? "border-sky-200 bg-sky-50/50"
                        : catIdx === 1
                          ? "border-red-200 bg-red-50/50"
                          : "border-emerald-200 bg-emerald-50/50"
                    }`}
                    data-category={category.labelAr}
                  >
                    <span
                      className={`text-[13px] font-extrabold leading-tight text-center ${
                        catIdx === 0
                          ? "text-sky-950"
                          : catIdx === 1
                            ? "text-red-900"
                            : "text-emerald-950"
                      }`}
                    >
                      {toEasternArabicNumerals(category.labelAr)}
                    </span>
                    <AnswerSlot
                      solved={isAnswerKey}
                      answer={category.countAr}
                      ariaLabel={`مربع كتابة عدد ${category.labelAr}`}
                      kind="write"
                      tone={
                        catIdx === 0
                          ? "sky"
                          : catIdx === 1
                            ? "coral"
                            : "emerald"
                      }
                      solvedDataAttributes={{
                        "data-solved-subitize-three-part": category.countAr,
                      }}
                    />
                  </div>
                ))}

                {/* Whole / Total */}
                <div className="flex flex-col items-center gap-0.5 rounded-lg border-2 border-indigo-300 bg-indigo-50/80 px-0.5 pt-0.5 pb-1">
                  <span className="text-[13px] font-extrabold leading-tight text-indigo-950">
                    الكلّ
                  </span>
                  <span
                    className={`inline-flex ${ANSWER_SLOT_SIZE_CLASS} items-center justify-center rounded-2xl bg-indigo-700 text-[28px] font-black leading-none text-white shadow-2xs`}
                    {...(isAnswerKey
                      ? { "data-solved-subitize-total": card.totalCountAr }
                      : {})}
                  >
                    {card.totalCountAr}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </ExerciseColumns>

        {/* Reasoning Prompt */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-2.5 py-1 text-[13px] font-bold leading-tight text-amber-950">
          <span>
            🤔 سؤال التعرّف السريع:{" "}
            {toEasternArabicNumerals(data.reasoningPromptAr)}
          </span>
          <AnswerLine
            solved={isAnswerKey}
            answer={toEasternArabicNumerals(data.reasoningAnswerAr)}
            ariaLabel="سطر كتابة إجابة سؤال التفكير"
            solvedDataAttributes={{ "data-solved-subitize-reasoning": "true" }}
          />
        </div>
      </div>
    );
  }

  if (data.subitizeMode === "number-bond-maze" && data.mazeBonds) {
    return (
      <div
        className="space-y-1"
        data-archetype="SubitizePartWhole"
        data-subitize-mode={data.subitizeMode}
      >
        <ExerciseColumns columns={3}>
          {data.mazeBonds.map((bond, idx) => {
            const isSolved = isAnswerKey && bond.isTarget;
            return (
              <div
                key={bond.id}
                className={`relative flex flex-col items-center justify-between gap-1 rounded-2xl border-2 p-1.5 transition ${
                  isSolved
                    ? "border-emerald-500 bg-emerald-50/90 shadow-xs"
                    : "border-slate-200 bg-white shadow-2xs"
                }`}
                data-maze-bond={bond.id}
                data-is-target={bond.isTarget ? "true" : "false"}
                {...(isSolved ? { "data-solved-maze-bond": "true" } : {})}
              >
                <div className="flex w-full items-center justify-between text-xs font-black">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
                    {formatEasternNumber(idx + 1)}
                  </span>
                  {isSolved && (
                    <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-xs font-black text-emerald-950">
                      ✓ الكلّ {formatEasternNumber(data.targetTotal ?? 9)}
                    </span>
                  )}
                </div>
                <VisualModelView
                  model={bond.visualModel}
                  solved={isAnswerKey}
                />
              </div>
            );
          })}
        </ExerciseColumns>
      </div>
    );
  }

  if (data.subitizeMode === "decompose-teen") {
    return (
      <div
        className="space-y-1"
        data-archetype="SubitizePartWhole"
        data-subitize-mode={data.subitizeMode}
      >
        <ExerciseColumns columns={2}>
          {data.cards.map((card, idx) => (
            <div
              key={card.id}
              className="flex flex-col justify-between gap-1 rounded-xl border-2 border-indigo-100 bg-gradient-to-l from-white via-indigo-50/20 to-emerald-50/30 p-1.5 shadow-2xs"
              data-subitize-card-id={toEasternArabicNumerals(card.id)}
              data-teen-total={card.totalCountAr}
            >
              {/* Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold leading-none text-white">
                  {formatEasternNumber(idx + 1)}
                </span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-extrabold leading-tight text-amber-950 border border-amber-300">
                  ⚡ لمحة سريعة
                </span>
                {card.solidId && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-xs font-extrabold leading-tight text-teal-950 border border-teal-300">
                    <Solid3DSvg solidId={card.solidId} size="small" />
                    <span>
                      {toEasternArabicNumerals(
                        getSolid3DById(card.solidId).labelAr
                      )}
                    </span>
                  </span>
                )}
                {card.shapeId && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-xs font-extrabold leading-tight text-sky-950 border border-sky-300">
                    <Shape2DSvg shapeId={card.shapeId} size="small" />
                    <span>
                      {toEasternArabicNumerals(
                        getShape2DById(card.shapeId).labelAr
                      )}
                    </span>
                  </span>
                )}
                {isAnswerKey && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-extrabold leading-tight text-emerald-900">
                    ✓ {toEasternArabicNumerals(card.equationRtlAr)}
                  </span>
                )}
              </div>

              {/* Visual Models: the full 10-group + the ones-group companion
                  (CODING_STANDARDS §5: flex-1 centering wrapper keeps the
                  models off the bottom border in taller sibling grids) */}
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="flex flex-wrap items-center justify-center gap-1">
                  <VisualModelView
                    model={card.visualModel}
                    solved={isAnswerKey}
                  />
                  {card.companionModel && (
                    <VisualModelView
                      model={card.companionModel}
                      solved={isAnswerKey}
                    />
                  )}
                </div>
              </div>

              {/* Slot Row (RTL): ١٠ part rightmost, و, ones part, the whole */}
              <div className="grid grid-cols-4 items-center gap-1 rounded-xl border border-indigo-200 bg-white p-0.5 shadow-2xs">
                {/* The full 10-group (given) */}
                <div
                  className="flex flex-col items-center gap-0.5 rounded-lg border-2 border-sky-300 bg-sky-50/80 px-0.5 py-0.5"
                  data-decompose-ten={card.filledCountAr}
                  data-decompose-ten-count={card.filledCount}
                >
                  <span className="text-[13px] font-extrabold leading-tight text-sky-950">
                    المجموعة الكاملة
                  </span>
                  <span className="inline-flex h-7 min-w-9 items-center justify-center rounded-lg bg-sky-600 px-1 text-[16px] font-black leading-none text-white shadow-2xs">
                    {card.filledCountAr}
                  </span>
                </div>

                {/* و separator */}
                <span className="text-center text-[13px] font-black leading-none text-slate-500">
                  و
                </span>

                {/* Ones part (student writes) */}
                <AnswerSlot
                  solved={isAnswerKey}
                  answer={card.missingCountAr}
                  ariaLabel="مربع كتابة عدد القليل الإضافي"
                  kind="write"
                  tone="amber"
                  solvedDataAttributes={{
                    "data-solved-decompose-ones": String(card.missingCount),
                  }}
                />

                {/* The whole (student writes) */}
                <div className="flex flex-col items-center gap-0.5 rounded-lg border-2 border-indigo-300 bg-indigo-50/80 px-0.5 py-0.5">
                  <span className="text-[13px] font-extrabold leading-tight text-indigo-950">
                    الكلّ
                  </span>
                  <AnswerSlot
                    solved={isAnswerKey}
                    answer={card.totalCountAr}
                    ariaLabel="مربع كتابة العدد الكلّ"
                    kind="write"
                    tone="indigo"
                    solvedDataAttributes={{
                      "data-solved-decompose-total": String(card.totalCount),
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </ExerciseColumns>

        {/* Reasoning Prompt */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-2.5 py-1 text-[13px] font-bold leading-tight text-amber-950">
          <span>
            🤔 سؤال التفكير: {toEasternArabicNumerals(data.reasoningPromptAr)}
          </span>
          <AnswerLine
            solved={isAnswerKey}
            answer={toEasternArabicNumerals(data.reasoningAnswerAr)}
            ariaLabel="سطر كتابة إجابة سؤال التفكير"
            solvedDataAttributes={{ "data-solved-subitize-reasoning": "true" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="space-y-1"
      data-archetype="SubitizePartWhole"
      data-subitize-mode={data.subitizeMode}
    >
      {/* Subitizing Cards */}
      <ExerciseColumns columns={2}>
        {data.cards.map((card, idx) => (
          <div
            key={card.id}
            className="flex flex-col justify-between gap-1 rounded-xl border-2 border-indigo-100 bg-gradient-to-l from-white via-indigo-50/20 to-amber-50/30 p-1.5 shadow-2xs"
            data-subitize-card-id={toEasternArabicNumerals(card.id)}
          >
            {/* Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold leading-none text-white">
                {formatEasternNumber(idx + 1)}
              </span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-extrabold leading-tight text-amber-950 border border-amber-300">
                ⚡ لمحة سريعة
              </span>
              {card.shapeId && (
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-xs font-extrabold leading-tight text-sky-950 border border-sky-300">
                  <Shape2DSvg shapeId={card.shapeId} size="small" />
                  <span>
                    {toEasternArabicNumerals(
                      getShape2DById(card.shapeId).labelAr
                    )}
                  </span>
                </span>
              )}
              {card.solidId && (
                <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-xs font-extrabold leading-tight text-teal-950 border border-teal-300">
                  <Solid3DSvg solidId={card.solidId} size="small" />
                  <span>
                    {toEasternArabicNumerals(
                      getSolid3DById(card.solidId).labelAr
                    )}
                  </span>
                </span>
              )}
              {isAnswerKey && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-extrabold leading-tight text-emerald-900">
                  ✓ {toEasternArabicNumerals(card.equationRtlAr)}
                </span>
              )}
            </div>

            {/* Visual Model(s) */}
            <div className="flex items-center justify-center gap-1">
              <VisualModelView model={card.visualModel} solved={isAnswerKey} />
              {card.companionModel && (
                <span
                  className="hidden"
                  data-visual-model={card.companionModel.kind}
                  data-count={card.filledCountAr}
                />
              )}
            </div>

            {/* Answer Slots: Part-Whole Breakdown Boxes */}
            <div className="grid grid-cols-3 gap-1 rounded-xl border border-indigo-200 bg-white p-0.5 shadow-2xs">
              {/* Part 1: Filled / Present Count */}
              <div className="flex items-center justify-between gap-0.5 rounded-lg border border-sky-200 bg-sky-50/50 px-1 py-0.5">
                <span className="text-xs font-extrabold leading-tight text-sky-950">
                  الموجود
                </span>
                <AnswerSlot
                  solved={isAnswerKey}
                  answer={card.filledCountAr}
                  ariaLabel="مربع كتابة العدد الموجود"
                  tone="sky"
                  solvedDataAttributes={{
                    "data-solved-subitize-filled": card.filledCountAr,
                  }}
                />
              </div>

              {/* Part 2: Missing / Empty Count */}
              <div className="flex items-center justify-between gap-0.5 rounded-lg border border-amber-200 bg-amber-50/50 px-1 py-0.5">
                <span className="text-xs font-extrabold leading-tight text-amber-950">
                  الفارغ
                </span>
                <AnswerSlot
                  solved={isAnswerKey}
                  answer={card.missingCountAr}
                  ariaLabel={`مربع كتابة العدد الفارغ المكمل لـ ${card.totalCountAr}`}
                  tone="amber"
                  solvedDataAttributes={{
                    "data-solved-subitize-missing": card.missingCountAr,
                  }}
                />
              </div>

              {/* Whole / Total */}
              <div className="flex items-center justify-between gap-0.5 rounded-lg border-2 border-indigo-300 bg-indigo-50/80 px-1 py-0.5">
                <span className="text-xs font-extrabold leading-tight text-indigo-950">
                  الكلّ
                </span>
                <span
                  className={`inline-flex ${ANSWER_SLOT_SIZE_CLASS} items-center justify-center rounded-2xl bg-indigo-700 text-[28px] font-black leading-none text-white shadow-2xs`}
                  {...(isAnswerKey
                    ? { "data-solved-subitize-total": card.totalCountAr }
                    : {})}
                >
                  {card.totalCountAr}
                </span>
              </div>
            </div>
          </div>
        ))}
      </ExerciseColumns>

      {/* Reasoning Prompt */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-2.5 py-1 text-[13px] font-bold leading-tight text-amber-950">
        <span>
          🤔 سؤال التعرّف السريع (الأجزاء والكل):{" "}
          {toEasternArabicNumerals(data.reasoningPromptAr)}
        </span>
        <AnswerLine
          solved={isAnswerKey}
          answer={toEasternArabicNumerals(data.reasoningAnswerAr)}
          ariaLabel="سطر كتابة إجابة سؤال التفكير"
          solvedDataAttributes={{ "data-solved-subitize-reasoning": "true" }}
        />
      </div>
    </div>
  );
}

export const subitizePartWholeArchetype = {
  id: "SubitizePartWhole" as const,
  displayNameAr: "اعرف العدد بسرعة: الأجزاء والكل",
  generate: generateSubitizePartWholeExercise,
  render: renderSubitizePartWholeExercise,
};

registerExerciseArchetype(subitizePartWholeArchetype);
