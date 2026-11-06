import React from "react";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import type {
  ColorThemeId,
  DifficultyLevel,
  EverydayObjectId,
  Exercise,
  GenericArchetypeData,
  Shape2DId,
  Solid3DId,
  VisualModelSpec,
} from "@/domain/types";
import { selectAdditionFacts } from "@/lib/part-whole-facts";
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
} from "@/visual-models/unit-2-models";
import {
  PartsTableView,
  createEquationStripSpec,
  createNumberBondSpec,
  type BondMissingPosition,
  type EquationLayout,
} from "@/visual-models/unit-3-models";
import { VisualModelView } from "@/visual-models/registry";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

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

const COLOR_PAIRS: Array<[ColorThemeId, ColorThemeId]> = [
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

function buildRepresentationModel(params: {
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
      // Show the non-zero Part as solid counters and the other Part as ghost counters (0 when part2 === 0)
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

  // "pictures" (objects): everyday objects grouped into two subitizable parts
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

function generateJoinPartsExercise(ctx: ArchetypeGeneratorContext): Exercise {
  const params = (ctx.spec.params ?? {}) as JoinPartsBlueprintParams;

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
    (r) => r === "five-frame" || r === "domino" || r === "five-frame-and-digit"
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
    // In five-frame-and-digit, the five frame should always show the non-zero concrete Part
    // when one of the Parts is 0 (e.g. 0+4 -> 4 on the five frame + digit 0)
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

  // Unknown position rule: Total is unknown, except a Part may be unknown only in Challenge & Assessment or at Advanced (§6.3)
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

    // In K-28 Workbook ("Trace the two parts and the total shown by each five-frame"),
    // when responseForm === "parts-table" and action === "trace", trace both Parts AND Total
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

    const representationModel = buildRepresentationModel({
      representation: itemRep,
      pictureSubkind: params.pictureSubkind,
      part1: fact.part1,
      part2: fact.part2,
      action,
      primaryTheme,
      secondaryTheme,
      itemIdx: idx,
    });

    const responseModel =
      responseForm === "parts-table"
        ? undefined
        : responseForm === "number-bond"
          ? createNumberBondSpec({
              part1: fact.part1,
              part2: fact.part2,
              total: fact.total,
              missingPosition,
              slotKind: "unknown",
              tracePositions,
              colorTheme: primaryTheme,
              secondaryColorTheme: secondaryTheme,
            })
          : createEquationStripSpec({
              part1: fact.part1,
              part2: fact.part2,
              total: fact.total,
              layout: params.equationLayout ?? "standard",
              missingPosition,
              slotKind: "unknown",
              tracePositions,
            });

    const companionBondModel = params.showCompanionBond
      ? createNumberBondSpec({
          part1: fact.part1,
          part2: fact.part2,
          total: fact.total,
          missingPosition,
          slotKind: "unknown",
          tracePositions,
          colorTheme: primaryTheme,
          secondaryColorTheme: secondaryTheme,
        })
      : undefined;

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
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "JoinParts",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "اجمع الجزأين لإيجاد الكلّ",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function renderJoinPartsExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as JoinPartsData;
  const isAnswerKey = mode === "answer-key";
  const columns = data.items.length === 1 ? 1 : 2;

  return (
    <div
      className="space-y-1"
      data-archetype="JoinParts"
      data-response-form={data.responseForm}
      data-action={data.action}
    >
      <ExerciseColumns columns={columns}>
        {data.items.map((item, idx) => (
          <div
            key={item.id}
            className={`${
              columns === 1
                ? "flex items-center justify-around gap-3 px-3 py-1"
                : "flex flex-col items-center justify-between gap-0.5 px-1 py-0.5"
            } rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/25 shadow-2xs`}
            data-join-item-id={toEasternArabicNumerals(item.id)}
            data-fact={toEasternArabicNumerals(item.factKey)}
          >
            {/* Item header bar + Concrete/Pictorial Representation */}
            {item.companionDigitModel && columns !== 1 ? (
              <div className="flex w-full flex-col gap-1">
                <div className="flex w-full items-center justify-between">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
                    {formatEasternNumber(idx + 1)}
                  </span>
                  {isAnswerKey ? (
                    <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
                      {item.totalAr}
                    </span>
                  ) : (
                    <span className="text-[13px] font-extrabold leading-none text-slate-600">
                      {item.part1Ar} و{item.part2Ar}
                    </span>
                  )}
                </div>
                <div className="flex w-full items-center justify-center gap-1">
                  <VisualModelView
                    model={item.representationModel}
                    solved={isAnswerKey}
                  />
                  <div className="flex items-center gap-1">
                    <span
                      className="text-[28px] font-black leading-none text-indigo-700"
                      aria-hidden="true"
                    >
                      +
                    </span>
                    <VisualModelView
                      model={item.companionDigitModel}
                      solved={isAnswerKey}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`flex items-center ${
                  columns === 1 ? "gap-3" : "w-full justify-between gap-1"
                }`}
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
                  {formatEasternNumber(idx + 1)}
                </span>
                <div className="flex items-center gap-1">
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
                        +
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
                    {item.totalAr}
                  </span>
                ) : (
                  <span className="text-[13px] font-extrabold leading-none text-slate-600">
                    {item.part1Ar} و{item.part2Ar}
                  </span>
                )}
              </div>
            )}

            {/* Response Form (Parts Table, Number Bond, or Equation Strip) */}
            <div className="flex flex-wrap items-center justify-center gap-1">
              {data.responseForm === "parts-table" ? (
                <PartsTableView
                  part1={item.part1}
                  part2={item.part2}
                  total={item.total}
                  missingPosition={item.unknownPosition}
                  tracePositions={item.tracePositions}
                  solved={isAnswerKey}
                />
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

            {/* Optional term labels (K-38: label the parts and total) */}
            {data.showTermLabels && (
              <div
                className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-50/70 px-2 py-0.5 text-[13px] font-extrabold text-indigo-950"
                data-term-labels="true"
              >
                <span className="text-sky-900">
                  الجزء{isAnswerKey ? ` (${item.part1Ar})` : ""}
                </span>
                <span className="text-indigo-400">+</span>
                <span className="text-amber-900">
                  الجزء{isAnswerKey ? ` (${item.part2Ar})` : ""}
                </span>
                <span className="text-indigo-400">=</span>
                <span className="text-indigo-900">
                  الكلّ{isAnswerKey ? ` (${item.totalAr})` : ""}
                </span>
              </div>
            )}
          </div>
        ))}
      </ExerciseColumns>
    </div>
  );
}

registerExerciseArchetype({
  id: "JoinParts",
  displayNameAr: "اجمع الجزأين",
  generate: generateJoinPartsExercise,
  render: renderJoinPartsExercise,
});
