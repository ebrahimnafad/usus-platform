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
  EverydayObjectSvg,
  createEverydayObjectSpec,
} from "@/visual-models/everyday-objects";
import { PartsTableView } from "@/components/worksheet/PartsTableView";
import {
  buildPartWholeMatchPairs,
  type PartWholeMatchMode,
} from "@/lib/part-whole-facts";
import {
  CUBE_CONE_CYLINDER_SET,
  SQUARE_CIRCLE_SET,
  TRIANGLE_HEXAGON_CIRCLE_SET,
  TRIANGLE_SQUARE_CIRCLE_SET,
  type TenFrameCategoryDef,
  type TenFrameCategorySet,
} from "@/lib/ten-frame-category-sets";
import type {
  WordProblemSituation,
  WordProblemStyle,
} from "@/lib/word-problems";
import { VisualModelView } from "@/visual-models/registry";
import {
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { AnswerLine, AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import {
  createShape2DSpec,
  getShapePluralAr,
  getSolidPluralAr,
} from "@/visual-models/shapes-solids-coins";
import { createTenFrameSpec } from "@/visual-models/unit-2-models";
import {
  createPolygonPerimeterSpec,
  createShapeDescriptionSpec,
} from "@/visual-models/measurement-models";

export type ConnectMatchMode =
  | PartWholeMatchMode
  | "shape-to-description"
  | "ten-frame-to-description"
  | "ten-frame-to-comparison";

export interface ConnectMatchBlueprintParams {
  pairCount?: number;
  categories?: EverydayObjectCategory[];
  matchingMode?: ConnectMatchMode;
  matchKind?: ConnectMatchMode;
  operation?: "add" | "subtract";
  situation?: WordProblemSituation;
  problemStyle?: WordProblemStyle;
  showProblemSlot?: boolean;
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
  /** ten-frame-to-description: parts per frame — 2 (MATCHING A/C) or 3 (MATCHING B) */
  categoryCount?: 2 | 3;
  /** ten-frame-to-description MATCHING C: each description card carries an AnswerSlot for the missing total */
  missingTotal?: boolean;
  /** ten-frame-to-description: pinned category sets; row i uses set (i mod list length). Defaults branch by arity. */
  descriptionCategorySets?: TenFrameCategorySet[];
  /**
   * model-to-word-problem (add-to / put-together): per-row unknown position,
   * cycled across rows (WORD PROBLEM MATCH B alternates totals and parts).
   * Defaults to ["total"] — WORD PROBLEM MATCH A behavior.
   */
  wordProblemMissingPositions?: Array<"total" | "part2" | "part1">;
  /**
   * Unknown position carried by the matched Number Bond / Equation column
   * (MATCHING - F and G fill the Missing Part instead of the Total).
   * Defaults to `"total"`; a Part unknown is a non-standard position, so it is
   * suppressed to `"total"` outside Advanced tiers and Challenge sections (§6.3).
   */
  matchMissingPosition?: "total" | "part2" | "part1";
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

/**
 * ten-frame-to-description category pools (blue → red → green fixed coding).
 * The MATCHING A pair (square/circle) and the K-76-style trios are the shared
 * named sets; the remaining 2-part alternates live here because only this
 * mode's unpinned pool uses them (§2.5 grayscale holds via per-part shape +
 * solid cue).
 */
const TEN_FRAME_DESCRIPTION_DEFAULT_SETS: Record<2 | 3, TenFrameCategorySet[]> =
  {
    2: [
      SQUARE_CIRCLE_SET,
      {
        id: "triangle-circle",
        categories: [
          { shapeId: "triangle", colorTheme: "sky" },
          { shapeId: "circle", colorTheme: "coral" },
        ],
      },
      {
        id: "hexagon-circle",
        categories: [
          { shapeId: "hexagon", colorTheme: "sky" },
          { shapeId: "circle", colorTheme: "coral" },
        ],
      },
      {
        id: "square-triangle",
        categories: [
          { shapeId: "square", colorTheme: "sky" },
          { shapeId: "triangle", colorTheme: "coral" },
        ],
      },
    ],
    3: [
      TRIANGLE_SQUARE_CIRCLE_SET,
      TRIANGLE_HEXAGON_CIRCLE_SET,
      CUBE_CONE_CYLINDER_SET,
    ],
  };

/** Arabic plural label (or fallback) for a description-match category */
function descriptionCategoryLabelAr(category: TenFrameCategoryDef): string {
  if (category.shapeId) return getShapePluralAr(category.shapeId);
  if (category.solidId) return getSolidPluralAr(category.solidId);
  return "أقراص";
}

/**
 * Builds candidates as every ordered composition of `total` into `categoryCount`
 * parts ≥ 1 (2 parts → 9; 3 parts → 36 distinct compositions), then seeds a
 * non-repeating pick (§7.3). Caller adds the keys to `usedFacts`.
 */
function listTenFrameCompositions(
  total: number,
  categoryCount: 2 | 3
): Array<{ parts: number[]; key: string }> {
  const candidates: Array<{ parts: number[]; key: string }> = [];
  const maxFirstPart = categoryCount === 2 ? total - 1 : total - 2;
  for (let part1 = 1; part1 <= maxFirstPart; part1++) {
    if (categoryCount === 2) {
      const part2 = total - part1;
      candidates.push({ parts: [part1, part2], key: `${part1}:${part2}` });
      continue;
    }
    for (let part2 = 1; part2 <= total - part1 - 1; part2++) {
      const part3 = total - part1 - part2;
      candidates.push({
        parts: [part1, part2, part3],
        key: `${part1}:${part2}:${part3}`,
      });
    }
  }
  return candidates;
}

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

  const matchingMode = params.matchingMode ?? params.matchKind;
  // §6.3: an unknown in a non-standard position (a Missing Part) appears only
  // at Advanced or in Challenge & Assessment; elsewhere the match falls back
  // to the standard missing Total.
  const allowNonStandardMatchUnknown =
    ctx.sectionId === "challenge" || ctx.difficultyLevel === "Advanced";
  const resolvedMatchMissingPosition =
    params.matchMissingPosition === undefined ||
    params.matchMissingPosition === "total" ||
    allowNonStandardMatchUnknown
      ? params.matchMissingPosition
      : "total";
  let pairs: ConnectMatchPair[] = [];

  if (matchingMode === "shape-to-description") {
    const defaultShapePairs =
      ctx.lesson.lessonNumber === 73
        ? [
            {
              id: "triangle",
              right: createPolygonPerimeterSpec({
                shapeId: "triangle",
                sideCount: 3,
                clipsPerSide: 1,
                totalClips: 3,
                colorTheme: "amber",
                mode: "polygon-perimeter",
                compact: true,
              }),
              left: createShapeDescriptionSpec({
                id: "desc-tri",
                textAr: "مثلث محيطه بمشابك الورق يساوي",
                missingNumber: 3,
              }),
              reasonAr: "مثلث ٣ أضلاع × ١ مشبك = ٣ مشابك",
            },
            {
              id: "square",
              right: createPolygonPerimeterSpec({
                shapeId: "square",
                sideCount: 4,
                clipsPerSide: 2,
                totalClips: 8,
                colorTheme: "sky",
                mode: "polygon-perimeter",
                compact: true,
              }),
              left: createShapeDescriptionSpec({
                id: "desc-sq",
                textAr: "مربع محيطه بمشابك الورق يساوي",
                missingNumber: 8,
              }),
              reasonAr: "مربع ٤ أضلاع × ٢ مشبك = ٨ مشابك",
            },
            {
              id: "rectangle",
              right: createPolygonPerimeterSpec({
                shapeId: "rectangle",
                sideCount: 4,
                clipsPerSide: 1,
                totalClips: 4,
                colorTheme: "emerald",
                mode: "polygon-perimeter",
                compact: true,
              }),
              left: createShapeDescriptionSpec({
                id: "desc-rect",
                textAr: "مستطيل محيطه بمشابك الورق يساوي",
                missingNumber: 4,
              }),
              reasonAr: "مستطيل ٤ أضلاع = ٤ مشابك",
            },
            {
              id: "pentagon",
              right: createPolygonPerimeterSpec({
                shapeId: "pentagon",
                sideCount: 5,
                clipsPerSide: 1,
                totalClips: 5,
                colorTheme: "violet",
                mode: "polygon-perimeter",
                compact: true,
              }),
              left: createShapeDescriptionSpec({
                id: "desc-pent",
                textAr: "خماسي محيطه بمشابك الورق يساوي",
                missingNumber: 5,
              }),
              reasonAr: "خماسي ٥ أضلاع = ٥ مشابك",
            },
            {
              id: "hexagon",
              right: createPolygonPerimeterSpec({
                shapeId: "hexagon",
                sideCount: 6,
                clipsPerSide: 1,
                totalClips: 6,
                colorTheme: "rose",
                mode: "polygon-perimeter",
                compact: true,
              }),
              left: createShapeDescriptionSpec({
                id: "desc-hex",
                textAr: "سداسي محيطه بمشابك الورق يساوي",
                missingNumber: 6,
              }),
              reasonAr: "سداسي ٦ أضلاع = ٦ مشابك",
            },
          ]
        : [
            {
              id: "triangle",
              right: createShape2DSpec("triangle", { colorTheme: "amber" }),
              left: createShapeDescriptionSpec({
                id: "desc-tri",
                textAr: "شكل له ٣ أضلاع مستقيمة و٣ زوايا",
              }),
              reasonAr: "المثلث له ٣ أضلاع مستقيمة و٣ زوايا",
            },
            {
              id: "square",
              right: createShape2DSpec("square", { colorTheme: "sky" }),
              left: createShapeDescriptionSpec({
                id: "desc-sq",
                textAr: "شكل له ٤ أضلاع متساوية في الطول",
              }),
              reasonAr: "المربع له ٤ أضلاع متساوية في الطول و٤ زوايا",
            },
            {
              id: "rectangle",
              right: createShape2DSpec("rectangle", { colorTheme: "emerald" }),
              left: createShapeDescriptionSpec({
                id: "desc-rect",
                textAr: "شكل له ٤ أضلاع (ضلعان طويلان وضلعان قصيران)",
              }),
              reasonAr: "المستطيل له ٤ أضلاع متقابلة متطابقة",
            },
            {
              id: "pentagon",
              right: createShape2DSpec("pentagon", { colorTheme: "violet" }),
              left: createShapeDescriptionSpec({
                id: "desc-pent",
                textAr: "شكل له ٥ أضلاع مستقيمة و٥ زوايا",
              }),
              reasonAr: "الخماسي له ٥ أضلاع مستقيمة و٥ زوايا",
            },
            {
              id: "hexagon",
              right: createShape2DSpec("hexagon", { colorTheme: "rose" }),
              left: createShapeDescriptionSpec({
                id: "desc-hex",
                textAr: "شكل له ٦ أضلاع مستقيمة و٦ زوايا",
              }),
              reasonAr: "السداسي له ٦ أضلاع مستقيمة و٦ زوايا",
            },
            {
              id: "octagon",
              right: createShape2DSpec("octagon", { colorTheme: "indigo" }),
              left: createShapeDescriptionSpec({
                id: "desc-oct",
                textAr: "شكل له ٨ أضلاع مستقيمة و٨ زوايا",
              }),
              reasonAr: "الثماني له ٨ أضلاع مستقيمة و٨ زوايا",
            },
          ];

    const sourcePairs = params.customCandidatePairs ?? defaultShapePairs;
    const picked = ctx.rng.pickN(sourcePairs, pairCount);
    pairs = picked.map((item, idx) => ({
      pairId: `pair-${idx + 1}-${item.id}`,
      rightItem: item.right,
      leftItem: item.left,
      connectionReasonAr: item.reasonAr,
    }));
  } else if (matchingMode === "ten-frame-to-description") {
    const categoryCount = Math.max(
      2,
      Math.min(3, params.categoryCount ?? 2)
    ) as 2 | 3;
    const totalCount = 10;
    const totalAr = formatEasternNumber(totalCount);
    const categorySetPool: TenFrameCategorySet[] =
      params.descriptionCategorySets &&
      params.descriptionCategorySets.length > 0
        ? params.descriptionCategorySets
        : TEN_FRAME_DESCRIPTION_DEFAULT_SETS[categoryCount];

    const compositions = ctx.rng.pickN(
      listTenFrameCompositions(totalCount, categoryCount),
      Math.min(pairCount, categoryCount === 2 ? 9 : 36)
    );

    pairs = compositions.map((composition, idx) => {
      const set = categorySetPool[idx % categorySetPool.length];
      const categories = set.categories;
      // listTenFrameCompositions already yields exactly `categoryCount` parts ≥ 1
      const parts = composition.parts;
      const partsAr = parts.map((part) => formatEasternNumber(part));
      const labelsAr = [0, 1, 2]
        .slice(0, categoryCount)
        .map((i) => descriptionCategoryLabelAr(categories[i] ?? {}));

      const descriptionTextAr = partsAr
        .map((partAr, i) => `${partAr} ${labelsAr[i]}`)
        .join(" و");

      const rightModel = createTenFrameSpec({
        count: parts[0],
        secondaryCount: parts[1],
        tertiaryCount: categoryCount === 3 ? parts[2] : undefined,
        colorTheme: categories[0]?.colorTheme ?? "sky",
        secondaryColorTheme: categories[1]?.colorTheme ?? "coral",
        tertiaryColorTheme:
          categoryCount === 3
            ? (categories[2]?.colorTheme ?? "emerald")
            : undefined,
        shapeId: categories[0]?.shapeId,
        solidId: categories[0]?.solidId,
        secondaryShapeId: categories[1]?.shapeId,
        secondarySolidId: categories[1]?.solidId,
        tertiaryShapeId:
          categoryCount === 3 ? categories[2]?.shapeId : undefined,
        tertiarySolidId:
          categoryCount === 3 ? categories[2]?.solidId : undefined,
        showPartOutline: categoryCount === 2,
        highlightEmptySlots: true,
      });

      const leftModel = createShapeDescriptionSpec({
        id: `td-${set.id}-${composition.key}-${idx + 1}`,
        textAr: descriptionTextAr,
        meta: params.missingTotal
          ? {
              isTenFrameDescriptionEndpoint: true,
              missingTotal: totalCount,
              missingTotalAr: totalAr,
            }
          : undefined,
      });

      const factKey = `td-${composition.key}`;
      ctx.usedFacts?.add(factKey);

      return {
        pairId: `pair-${idx + 1}-td-${set.id}-${composition.key}`,
        rightItem: rightModel,
        leftItem: leftModel,
        connectionReasonAr: params.missingTotal
          ? `الوصف ${descriptionTextAr} ينطبق على اللوحة، والكلّ يساوي ${totalAr}`
          : `${descriptionTextAr} على اللوحة — والكلّ ${totalAr}`,
      };
    });
  } else if (matchingMode === "ten-frame-to-comparison") {
    const totalCount = 10;
    const totalAr = formatEasternNumber(totalCount);
    const set = SQUARE_CIRCLE_SET;
    const name0 = "المربعات";
    const name1 = "الدوائر";
    const candidateParts: Array<[number, number]> = [
      [7, 3],
      [4, 6],
      [8, 2],
      [3, 7],
      [6, 4],
      [2, 8],
    ];
    const pickedComps = ctx.rng.pickN(candidateParts, pairCount);

    pairs = pickedComps.map(([p0, p1], idx) => {
      const p0Ar = formatEasternNumber(p0);
      const p1Ar = formatEasternNumber(p1);
      const comparisonDescAr =
        p0 > p1 ? `${name0} أكثر من ${name1}` : `${name1} أكثر من ${name0}`;

      const rightModel = createTenFrameSpec({
        count: p0,
        secondaryCount: p1,
        colorTheme: set.categories[0]?.colorTheme ?? "sky",
        secondaryColorTheme: set.categories[1]?.colorTheme ?? "coral",
        shapeId: set.categories[0]?.shapeId,
        secondaryShapeId: set.categories[1]?.shapeId,
        showPartOutline: true,
        highlightEmptySlots: true,
      });

      const leftModel = createShapeDescriptionSpec({
        id: `tc-${idx + 1}-${p0}-${p1}`,
        textAr: comparisonDescAr,
        meta: {
          isTenFrameDescriptionEndpoint: true,
          ...(params.missingTotal
            ? {
                missingTotal: totalCount,
                missingTotalAr: totalAr,
              }
            : {}),
        },
      });

      const factKey = `tc-${p0}-${p1}`;
      ctx.usedFacts?.add(factKey);

      return {
        pairId: `pair-${idx + 1}-tc-${p0}-${p1}`,
        rightItem: rightModel,
        leftItem: leftModel,
        connectionReasonAr: params.missingTotal
          ? `${p0Ar} مربعات و${p1Ar} دوائر — ${comparisonDescAr}، والكلّ يساوي ${totalAr}`
          : `${p0Ar} مربعات و${p1Ar} دوائر — ${comparisonDescAr}`,
      };
    });
  } else if (matchingMode) {
    pairs = buildPartWholeMatchPairs({
      rng: ctx.rng,
      difficultyLevel: ctx.difficultyLevel,
      matchingMode,
      operation: params.operation,
      situation: params.situation,
      problemStyle: params.problemStyle,
      showProblemSlot: params.showProblemSlot,
      pairCount,
      totalRange: params.totalRange,
      minPart: params.minPart,
      showMissingTotalSlot: params.showMissingTotalSlot,
      usedFacts: ctx.usedFacts,
      wordProblemMissingPositions: params.wordProblemMissingPositions,
      matchMissingPosition: resolvedMatchMissingPosition,
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
  const isTakeApartMatch =
    matchingMode === "model-to-word-problem" &&
    params.situation === "take-apart";
  const isTenFrameBondMatch =
    matchingMode === "ten-frame-to-bond" ||
    matchingMode === "ten-frame-to-number-bond";
  const isTenFrameEqMatch = matchingMode === "ten-frame-to-equation";
  const isTenFrameDescMatch = matchingMode === "ten-frame-to-description";
  const isTenFrameCompMatch = matchingMode === "ten-frame-to-comparison";

  const defaultRightTitle =
    isTenFrameBondMatch ||
    isTenFrameEqMatch ||
    isTenFrameDescMatch ||
    isTenFrameCompMatch
      ? "لوحة العشرة"
      : "العمود الأيمن";
  const defaultLeftTitle = isTenFrameCompMatch
    ? "المقارنة"
    : isTenFrameDescMatch
      ? "الوصف"
      : isTenFrameBondMatch
        ? "رابطة الأعداد"
        : isTenFrameEqMatch
          ? params.operation === "subtract"
            ? "معادلة الطرح"
            : "معادلة الجمع"
          : "العمود الأيسر";

  const takeApartMatchSummaryAr = isTakeApartMatch
    ? pairs.map((p) => p.connectionReasonAr).join("؛ ")
    : "";
  const tenFrameDescSummaryAr =
    isTenFrameDescMatch || isTenFrameCompMatch
      ? pairs.map((p) => p.connectionReasonAr).join("؛ ")
      : "";

  const isMatchMissingPart =
    resolvedMatchMissingPosition === "part1" ||
    resolvedMatchMissingPosition === "part2";

  const defaultPromptAr = isTakeApartMatch
    ? "صِلْ كلّ رابطة أعداد بالمسألة التي تحمل الكلّ نفسه، ثم اكتب الجزأين:"
    : isTenFrameCompMatch
      ? params.missingTotal
        ? "صِلْ كلّ لوحة عشرة بوصف المقارنة المطابق، ثم اكتب الكلّ في المربّع:"
        : "صِلْ كلّ لوحة عشرة بوصف المقارنة المطابق:"
      : isTenFrameDescMatch
        ? params.missingTotal
          ? "صِلْ كلّ لوحة عشرة بالوصف المطابق، ثم اكتب الكلّ في المربّع:"
          : "صِلْ كلّ لوحة عشرة بالوصف المطابق:"
        : isTenFrameBondMatch
          ? isMatchMissingPart
            ? "صِلْ كلّ لوحة عشرة برابطة الأعداد المطابقة، ثم اكتب الجزء الناقص في الرابطة:"
            : "صِلْ كلّ لوحة عشرة برابطة الأعداد المطابقة، ثم اكتب الكلّ في الدائرة:"
          : isTenFrameEqMatch
            ? isMatchMissingPart
              ? "صِلْ كلّ لوحة عشرة بالمعادلة المطابقة، ثم اكتب العدد الناقص في المعادلة:"
              : "صِلْ كلّ لوحة عشرة بالمعادلة المطابقة، ثم اكتب الكلّ في المربّع:"
            : ctx.difficultyLevel === "Easy"
              ? `صل بخط بين كل شكل في العمود الأيمن وما يطابقه تماماً في العمود الأيسر (${pairCountAr} أشياء):`
              : ctx.difficultyLevel === "Intermediate"
                ? `قارن بدقة ثم صل بخط بين كل صورة في العمود الأيمن والصورة المطابقة لها في العمود الأيسر (${pairCountAr} أشياء):`
                : `لاحظ التفاصيل الدقيقة للصور (${pairCountAr} أشياء)، وصل كل شيء في العمود الأيمن بنظيره المطابق في العمود الأيسر:`;

  const defaultStrategyHintAr = isTenFrameCompMatch
    ? `عدّ أشكال كل جزء على اللوحة، ثم صِلْ بالوصف الذي يقارن بينهما${
        params.missingTotal ? " واكتب الكلّ" : ""
      } (${tenFrameDescSummaryAr}).`
    : isTenFrameDescMatch
      ? `عدّ أشكال كل جزء على اللوحة، ثم صِلْ اللوحة بالوصف الذي يذكر الأعداد نفسها${
          params.missingTotal ? "، واكتب الكلّ في المربّع" : ""
        } (${tenFrameDescSummaryAr}).`
      : isTakeApartMatch
        ? `صِلْ بالمسألة المطابقة للكلّ واكتب الجزأين (${takeApartMatchSummaryAr}).`
        : ctx.difficultyLevel === "Easy"
          ? `ابدأ من أول صورة في العمود الأيمن، لاحظ شكلها ولونها المميّز، ثم ابحث عن توأمها في العمود الأيسر وارسم خطاً يصل بينهما (التقابل ١ إلى ١).`
          : ctx.difficultyLevel === "Intermediate"
            ? `ركّز على الصفة المميّزة لكل شيء (الشكل الخارجي والتفاصيل الداخلية) وتحقّق من أن كل شيء في اليمين يتصل بشيء واحد فقط في اليسار.`
            : `قارن الأشياء المتشابهة في الفئة بعناية، واستبعد الصور المختلفة في الشكل أو التفاصيل، ثم تأكّد من تساوي عدد الأشياء في العمودين (${pairCountAr} مقابل ${pairCountAr}).`;

  const resolvedStrategyHintAr = ctx.spec.strategyHintAr
    ? isTenFrameDescMatch || isTenFrameCompMatch
      ? `${ctx.spec.strategyHintAr.replace(/\.$/, "")} (${tenFrameDescSummaryAr}).`
      : isTakeApartMatch
        ? `${ctx.spec.strategyHintAr.replace(/\.$/, "")} (${takeApartMatchSummaryAr}).`
        : ctx.spec.strategyHintAr
    : (ctx.spec.strategyHintAr ?? defaultStrategyHintAr);

  const data: ConnectMatchData = {
    kind: "ConnectMatch",
    rightColumnTitleAr: params.rightColumnTitleAr ?? defaultRightTitle,
    leftColumnTitleAr: params.leftColumnTitleAr ?? defaultLeftTitle,
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
    strategyHintAr: resolvedStrategyHintAr,
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
  const hasTenFrame = allModels.some((m) => m.kind === "ten-frame");
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
  const hasPolygonPerimeter = allModels.some(
    (m) => m.kind === "polygon-perimeter" || m.kind === "shape-description"
  );
  const isWideUnit3Match = hasNumberBond || hasMediumUnit3Model || hasTenFrame;

  const rowHeightPx = hasNumberBond
    ? 162
    : hasTenFrame
      ? 118
      : hasMediumUnit3Model
        ? 80
        : hasNumeralTraceOrDigitCard
          ? 62
          : hasPolygonPerimeter
            ? 58
            : ROW_HEIGHT_PX;
  const rowMinHeightClass = hasNumberBond
    ? "min-h-[160px]"
    : hasTenFrame
      ? "min-h-[114px]"
      : hasMediumUnit3Model
        ? "min-h-[76px]"
        : hasNumeralTraceOrDigitCard
          ? "min-h-[58px]"
          : hasPolygonPerimeter
            ? "min-h-[52px]"
            : "min-h-[46px]";
  // Word-problem story cards (left column in model-to-word-problem) hold no canonical-
  // size model; they can use 8 px less min-height than the bond side without violating
  // §3.4 (which applies to the Number Bond itself, living in the right column).
  const isWordProblemMatchLayout =
    hasNumberBond &&
    data.leftItems.every((i) =>
      Boolean((i.model.meta as Record<string, unknown>)?.isWordProblemEndpoint)
    );
  const leftRowMinHeightClass = isWordProblemMatchLayout
    ? "min-h-[152px]"
    : rowMinHeightClass;
  const centerWidthPx = isWideUnit3Match ? 52 : 110;
  const gridColsClass = isWideUnit3Match
    ? "grid-cols-[1fr_52px_1fr] gap-0.5 p-0.5"
    : "grid-cols-[1fr_110px_1fr] gap-1.5 p-1.5";
  const rowPadClass = isWideUnit3Match
    ? "px-1 py-0 gap-0.5"
    : hasPolygonPerimeter
      ? "px-1.5 py-0.5"
      : "px-2 py-0.5";
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
          <div className="flex flex-col justify-between pt-[22px]">
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
                const cardGapPx = isWideUnit3Match ? 2 : 4;
                const cardActualHPx = rowHeightPx - cardGapPx;
                const yRight = rIdx * rowHeightPx + cardActualHPx / 2;
                const matchedLeftId = data.solutionMap[rightItem.id];
                const lIdx = data.leftItems.findIndex(
                  (li) => li.id === matchedLeftId
                );
                const yLeft =
                  (lIdx >= 0 ? lIdx : rIdx) * rowHeightPx + cardActualHPx / 2;
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
                      <>
                        <line
                          x1={rightPortX - 6}
                          y1={yRight}
                          x2={rightPortX - 18}
                          y2={yRight}
                          stroke="#CBD5E1"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        <line
                          x1={leftPortX + 6}
                          y1={yLeft}
                          x2={leftPortX + 18}
                          y2={yLeft}
                          stroke="#CBD5E1"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                      </>
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
              const isWordProblemEndpoint = Boolean(
                itemMeta.isWordProblemEndpoint
              );
              const isTenFrameDescriptionEndpoint = Boolean(
                itemMeta.isTenFrameDescriptionEndpoint
              );
              const missingTotal = itemMeta.missingTotal as number | undefined;

              return (
                <div
                  key={item.id}
                  className={`flex ${leftRowMinHeightClass} items-center justify-between rounded-xl border border-slate-200 bg-white ${rowPadClass} shadow-2xs`}
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
                    ) : isWordProblemEndpoint ? (
                      (() => {
                        const isTakeFromEndpoint =
                          itemMeta.situation === "take-from";
                        const isTakeApartEndpoint =
                          itemMeta.situation === "take-apart";
                        const firstEndpointPartAr = String(
                          itemMeta.part1Ar ?? ""
                        );
                        const secondEndpointPartAr = String(
                          itemMeta.part2Ar ?? ""
                        );
                        const solvedEndpointAnswerAr = String(
                          itemMeta.solvedAnswerAr ??
                            (isTakeApartEndpoint
                              ? `${firstEndpointPartAr} و${secondEndpointPartAr}`
                              : isTakeFromEndpoint
                                ? itemMeta.missingPartAr
                                : itemMeta.totalAr) ??
                            ""
                        );
                        const validPairsSummaryAr = isTakeApartEndpoint
                          ? String(itemMeta.validPairsSummaryAr ?? "")
                          : "";
                        const endpointMissingPosition = isTakeApartEndpoint
                          ? undefined
                          : (itemMeta.endpointMissingPosition as
                              "total" | "part2" | "part1" | undefined);
                        const isEndpointPartMissing =
                          endpointMissingPosition === "part2" ||
                          endpointMissingPosition === "part1";
                        const solvedEndpointAttrKey = isTakeFromEndpoint
                          ? "data-solved-match-problem-missing-part"
                          : endpointMissingPosition === "part1"
                            ? "data-solved-match-problem-part1"
                            : endpointMissingPosition === "part2"
                              ? "data-solved-match-problem-part2"
                              : "data-solved-match-problem-total";
                        const endpointSlotLabelAr = isEndpointPartMissing
                          ? endpointMissingPosition === "part2"
                            ? "الجزء ٢:"
                            : "الجزء ١:"
                          : String(itemMeta.questionLabelAr ?? "كم في الكلّ؟");
                        const endpointSlotAriaLabel = isEndpointPartMissing
                          ? endpointMissingPosition === "part2"
                            ? "مربع كتابة الجزء الثاني في المسألة اللفظية"
                            : "مربع كتابة الجزء الأوّل في المسألة اللفظية"
                          : isTakeFromEndpoint
                            ? "مربع كتابة الجزء الناقص في المسألة اللفظية"
                            : "مربع كتابة الكلّ في المسألة اللفظية";
                        return (
                          <div
                            dir="rtl"
                            className="flex w-full flex-col items-center justify-center gap-1 rounded-xl border border-indigo-100 bg-indigo-50/40 px-2 py-1"
                            data-word-problem-endpoint="true"
                            data-word-problem-situation={String(
                              itemMeta.situation ?? "add-to"
                            )}
                          >
                            <div className="flex w-full items-center justify-between gap-1">
                              <div className="flex items-center gap-1">
                                {itemMeta.problemStyle === "story" && (
                                  <EverydayObjectSvg
                                    objectId={String(
                                      itemMeta.objectId ?? "apple"
                                    )}
                                    size="tiny"
                                  />
                                )}
                                <span className="text-[13px] font-extrabold leading-none text-indigo-950">
                                  {itemMeta.problemStyle === "story"
                                    ? "مسألة قصصية"
                                    : "مسألة تعليمية"}
                                </span>
                              </div>
                              {mode === "answer-key" && (
                                <span
                                  className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900"
                                  {...(isTakeApartEndpoint
                                    ? { "data-valid-take-apart-pairs": "true" }
                                    : {})}
                                >
                                  {isTakeApartEndpoint && validPairsSummaryAr
                                    ? `${solvedEndpointAnswerAr} (${toEasternArabicNumerals(validPairsSummaryAr)})`
                                    : solvedEndpointAnswerAr}
                                </span>
                              )}
                            </div>
                            <p className="text-[13px] font-bold leading-snug text-slate-900">
                              {toEasternArabicNumerals(
                                String(itemMeta.problemTextAr ?? "")
                              )}
                            </p>
                            {Boolean(itemMeta.showProblemSlot) &&
                              (isTakeApartEndpoint ? (
                                <div className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-2 py-0.5 shadow-2xs">
                                  <AnswerSlot
                                    solved={mode === "answer-key"}
                                    answer={String(itemMeta.part1Ar ?? "")}
                                    ariaLabel="مربع كتابة الجزء الأوّل في المسألة اللفظية"
                                    kind="unknown"
                                    tone="sky"
                                    solvedDataAttributes={{
                                      "data-solved-match-problem-part1": String(
                                        itemMeta.part1Ar ?? ""
                                      ),
                                    }}
                                  />
                                  <AnswerSlot
                                    solved={mode === "answer-key"}
                                    answer={String(itemMeta.part2Ar ?? "")}
                                    ariaLabel="مربع كتابة الجزء الثاني في المسألة اللفظية"
                                    kind="unknown"
                                    tone="amber"
                                    solvedDataAttributes={{
                                      "data-solved-match-problem-part2": String(
                                        itemMeta.part2Ar ?? ""
                                      ),
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-2 py-0.5 shadow-2xs">
                                  <span className="text-[13px] font-extrabold leading-none text-indigo-950">
                                    {toEasternArabicNumerals(
                                      endpointSlotLabelAr
                                    )}
                                  </span>
                                  <AnswerSlot
                                    solved={mode === "answer-key"}
                                    answer={solvedEndpointAnswerAr}
                                    ariaLabel={endpointSlotAriaLabel}
                                    kind="unknown"
                                    tone="indigo"
                                    solvedDataAttributes={{
                                      [solvedEndpointAttrKey]:
                                        solvedEndpointAnswerAr,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        );
                      })()
                    ) : isTenFrameDescriptionEndpoint ? (
                      (() => {
                        const descriptionTextAr = String(itemMeta.textAr ?? "");
                        const endpointMissingTotal = itemMeta.missingTotal as
                          number | undefined;
                        const missingTotalAr =
                          endpointMissingTotal !== undefined
                            ? formatEasternNumber(endpointMissingTotal)
                            : "";
                        return (
                          <div
                            dir="rtl"
                            className="flex min-h-[46px] w-full flex-col items-center justify-center gap-1 rounded-xl border border-teal-200 bg-teal-50/50 px-1.5 py-1"
                            data-ten-frame-description-endpoint="true"
                          >
                            <span className="text-center text-[13px] font-extrabold leading-snug text-teal-950">
                              {toEasternArabicNumerals(descriptionTextAr)}
                            </span>
                            {endpointMissingTotal !== undefined ? (
                              <div className="flex items-center justify-center gap-1">
                                <span className="text-[13px] font-extrabold leading-none text-teal-950">
                                  الكلّ
                                </span>
                                <AnswerSlot
                                  solved={mode === "answer-key"}
                                  answer={missingTotalAr}
                                  ariaLabel="مربع كتابة الكلّ المفقود في بطاقة الوصف"
                                  kind="unknown"
                                  tone="indigo"
                                  solvedDataAttributes={{
                                    "data-solved-match-description-total":
                                      missingTotalAr,
                                  }}
                                />
                              </div>
                            ) : null}
                          </div>
                        );
                      })()
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
