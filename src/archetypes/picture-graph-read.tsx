import React from "react";
import { registerExerciseArchetype } from "@/archetypes/registry";
import type {
  ColorThemeId,
  EverydayObjectId,
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import { EVERYDAY_OBJECT_CATALOG } from "@/visual-models/everyday-objects";
import {
  createPictureGraphSpec,
  PictureGraphIconSvg,
  type PictureGraphCategorySpec,
  type PictureGraphIcon,
  type PictureGraphOrientation,
} from "@/visual-models/picture-graphs";
import {
  SHAPE_2D_CATALOG,
  SOLID_3D_CATALOG,
} from "@/visual-models/shapes-solids-coins";
import {
  createNumeralTraceSpec,
  getArabicNumberWord,
} from "@/visual-models/unit-2-models";
import { VisualModelView } from "@/visual-models/registry";
import {
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";

export type PictureGraphCountsPattern =
  "increasing-by-1" | "decreasing-by-1" | "with-equal-pair" | "mixed";

/** `draw-missing` is the SHAPE GRAPH: the child draws the missing icons so the graph matches its count table. */
export type PictureGraphResponseMode =
  "trace" | "write" | "trace-and-write" | "draw-missing";

export type PictureGraphIconSet =
  "everyday-objects" | "shapes-2d" | "solids-3d";

export type ComparisonRelationLabelAr = "١ أكثر" | "١ أقل" | "نفس العدد";

export interface PictureGraphCategoryInput {
  objectId?: EverydayObjectId;
  icon?: PictureGraphIcon;
  count: number;
  colorTheme?: ColorThemeId;
  labelAr?: string;
}

export interface PictureGraphReadBlueprintParams {
  orientation?: PictureGraphOrientation;
  titleAr?: string;
  categories?: PictureGraphCategoryInput[];
  categoryCount?: number;
  countsPattern?: PictureGraphCountsPattern;
  responseMode?: PictureGraphResponseMode;
  iconSet?: PictureGraphIconSet;
  /** `draw-missing` only: inclusive range of missing cells per category; at least 1 cell per row stays given. */
  missingPerCategory?: [number, number];
  includeComparison?: boolean;
  comparisonRelation?: ComparisonRelationLabelAr;
  comparisonPromptAr?: string;
  comparisonAnswerAr?: string;
}

export interface PictureGraphCategoryItem extends PictureGraphCategorySpec {
  countAr: string;
  numberWordAr: string;
  traceModel: VisualModelSpec;
  givenCount: number;
  missingCount: number;
}

interface IconChoice {
  icon: PictureGraphIcon;
  labelAr: string;
  colorTheme?: ColorThemeId;
}

const ICON_SETS: Record<PictureGraphIconSet, IconChoice[]> = {
  "everyday-objects": EVERYDAY_OBJECT_CATALOG.map((obj) => ({
    icon: { kind: "everyday-object", id: obj.id },
    labelAr: obj.labelAr,
    colorTheme: obj.colorTheme,
  })),
  "shapes-2d": SHAPE_2D_CATALOG.map((shape) => ({
    icon: { kind: "shape-2d", id: shape.id },
    labelAr: shape.labelAr,
    colorTheme: shape.defaultColorTheme,
  })),
  "solids-3d": SOLID_3D_CATALOG.map((solid) => ({
    icon: { kind: "solid-3d", id: solid.id },
    labelAr: solid.labelAr,
    colorTheme: solid.defaultColorTheme,
  })),
};

function getIconChoice(icon: PictureGraphIcon): IconChoice {
  for (const choices of Object.values(ICON_SETS)) {
    const found = choices.find(
      (choice) => choice.icon.kind === icon.kind && choice.icon.id === icon.id
    );
    if (found) return found;
  }
  return { icon, labelAr: icon.id, colorTheme: "sky" };
}

export interface PictureGraphReadData extends GenericArchetypeData {
  kind: "PictureGraphRead";
  orientation: PictureGraphOrientation;
  responseMode: PictureGraphResponseMode;
  graphModel: VisualModelSpec;
  categories: PictureGraphCategoryItem[];
  comparisonRelation: ComparisonRelationLabelAr;
  includeComparison: boolean;
  comparisonChoices: ComparisonRelationLabelAr[];
  comparisonPromptAr: string;
  comparisonAnswerAr: string;
}

const GRAPH_COLOR_CYCLE: ColorThemeId[] = [
  "coral",
  "amber",
  "sky",
  "emerald",
  "violet",
  "rose",
  "teal",
];

const COMPARISON_CHOICES: ComparisonRelationLabelAr[] = [
  "١ أكثر",
  "١ أقل",
  "نفس العدد",
];

function buildDefaultCountsForPattern(
  pattern: PictureGraphCountsPattern,
  categoryCount: number,
  rng: ArchetypeGeneratorContext["rng"],
  minCount = 1
): number[] {
  if (pattern === "increasing-by-1") {
    const maxStart = Math.max(minCount, 6 - categoryCount);
    const start = rng.int(minCount, maxStart);
    return Array.from({ length: categoryCount }, (_, i) =>
      Math.min(5, start + i)
    );
  }

  if (pattern === "decreasing-by-1") {
    const minStart = Math.min(5, categoryCount + minCount - 1);
    const start = rng.int(minStart, 5);
    return Array.from({ length: categoryCount }, (_, i) =>
      Math.max(1, start - i)
    );
  }

  if (pattern === "with-equal-pair") {
    const base = rng.int(2, 4);
    const other = base < 5 ? base + 1 : base - 1;
    const raw = [base, base, other, Math.max(1, base - 1)];
    return raw.slice(0, categoryCount);
  }

  const pool = [1, 2, 3, 4, 5];
  return rng.pickN(pool, categoryCount);
}

function deriveComparisonFromCategories(
  categories: PictureGraphCategoryItem[],
  orientation: PictureGraphOrientation,
  explicitRelation?: ComparisonRelationLabelAr
): {
  relation: ComparisonRelationLabelAr;
  promptAr: string;
  answerAr: string;
} {
  const first = categories[0];
  const second = categories[1] ?? categories[0];
  const unitNameAr = orientation === "vertical" ? "العمود" : "الصف";

  // Check if there is an adjacent pair that matches explicitRelation if provided
  let pairA = first;
  let pairB = second;

  if (explicitRelation) {
    for (let i = 0; i < categories.length - 1; i++) {
      const a = categories[i];
      const b = categories[i + 1];
      if (explicitRelation === "١ أكثر" && b.count === a.count + 1) {
        pairA = a;
        pairB = b;
        break;
      }
      if (explicitRelation === "١ أقل" && b.count === a.count - 1) {
        pairA = a;
        pairB = b;
        break;
      }
      if (explicitRelation === "نفس العدد" && b.count === a.count) {
        pairA = a;
        pairB = b;
        break;
      }
    }
  } else {
    // Prefer a pair with diff +1, -1, or 0
    for (let i = 0; i < categories.length - 1; i++) {
      const a = categories[i];
      const b = categories[i + 1];
      if (Math.abs(b.count - a.count) <= 1) {
        pairA = a;
        pairB = b;
        break;
      }
    }
  }

  const diff = pairB.count - pairA.count;
  const relation: ComparisonRelationLabelAr =
    explicitRelation ??
    (diff === 0 ? "نفس العدد" : diff > 0 ? "١ أكثر" : "١ أقل");

  const promptAr = `قارن في التمثيل البياني بين «${pairB.labelAr}» و«${pairA.labelAr}»: هل عدد «${pairB.labelAr}» في ${unitNameAr} يمثّل (١ أكثر) أم (١ أقل) أم (نفس العدد)؟`;

  const answerAr =
    relation === "نفس العدد"
      ? `نفس العدد: «${pairB.labelAr}» (${pairB.countAr}) و«${pairA.labelAr}» (${pairA.countAr}) لهما نفس العدد`
      : relation === "١ أكثر"
        ? `١ أكثر: عدد «${pairB.labelAr}» (${pairB.countAr}) هو ١ أكثر من «${pairA.labelAr}» (${pairA.countAr})`
        : `١ أقل: عدد «${pairB.labelAr}» (${pairB.countAr}) هو ١ أقل من «${pairA.labelAr}» (${pairA.countAr})`;

  return { relation, promptAr, answerAr };
}

function generatePictureGraphReadExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as PictureGraphReadBlueprintParams;
  const orientation: PictureGraphOrientation =
    params.orientation ??
    (ctx.lesson.lessonNumber === 21 ? "vertical" : "horizontal");

  const defaultResponseMode: PictureGraphResponseMode =
    ctx.difficultyLevel === "Advanced" ? "write" : "trace-and-write";
  const responseMode: PictureGraphResponseMode =
    params.responseMode ?? defaultResponseMode;

  const defaultCategoryCount =
    ctx.difficultyLevel === "Easy"
      ? 3
      : ctx.difficultyLevel === "Intermediate"
        ? 3
        : 4;
  const categoryCount = Math.max(
    2,
    Math.min(4, params.categoryCount ?? defaultCategoryCount)
  );

  const defaultPattern: PictureGraphCountsPattern =
    orientation === "vertical" ? "decreasing-by-1" : "increasing-by-1";
  const countsPattern = params.countsPattern ?? defaultPattern;

  const isDrawMissing = responseMode === "draw-missing";
  const defaultMissingRange: [number, number] =
    ctx.difficultyLevel === "Easy"
      ? [1, 1]
      : ctx.difficultyLevel === "Intermediate"
        ? [1, 2]
        : [1, 3];
  const [missingMin, missingMax] =
    params.missingPerCategory ?? defaultMissingRange;

  let rawCategories: Array<IconChoice & { count: number }> = [];
  if (params.categories && params.categories.length > 0) {
    rawCategories = params.categories.map((cat) => {
      const icon: PictureGraphIcon = cat.icon ?? {
        kind: "everyday-object",
        id: cat.objectId ?? "star",
      };
      const def = getIconChoice(icon);
      return {
        icon,
        labelAr: cat.labelAr ?? def.labelAr,
        colorTheme: cat.colorTheme ?? def.colorTheme,
        count: cat.count,
      };
    });
  } else {
    const picked = ctx.rng.pickN(
      ICON_SETS[params.iconSet ?? "everyday-objects"],
      categoryCount
    );
    const counts = buildDefaultCountsForPattern(
      countsPattern,
      picked.length,
      ctx.rng,
      isDrawMissing ? missingMin + 1 : 1
    );
    rawCategories = picked.map((choice, idx) => ({
      ...choice,
      count: counts[idx] ?? 1,
    }));
  }

  const categories: PictureGraphCategoryItem[] = rawCategories.map(
    (cat, idx) => {
      const safeCount = Math.max(1, Math.min(5, cat.count));
      const colorTheme =
        cat.colorTheme ?? GRAPH_COLOR_CYCLE[idx % GRAPH_COLOR_CYCLE.length];
      const missingCount = isDrawMissing
        ? ctx.rng.int(missingMin, Math.min(missingMax, safeCount - 1))
        : 0;

      return {
        categoryId: `cat-${idx + 1}-${cat.icon.id}`,
        icon: cat.icon,
        labelAr: cat.labelAr,
        count: safeCount,
        countAr: formatEasternNumber(safeCount),
        numberWordAr: getArabicNumberWord(safeCount),
        colorTheme,
        traceModel: createNumeralTraceSpec({
          digit: safeCount,
          colorTheme,
        }),
        givenCount: safeCount - missingCount,
        missingCount,
      };
    }
  );

  const graphModel = createPictureGraphSpec({
    orientation,
    titleAr: params.titleAr,
    categories,
    mode: isDrawMissing ? "draw-missing" : "read",
  });

  const derived = deriveComparisonFromCategories(
    categories,
    orientation,
    params.comparisonRelation
  );

  const includeComparison = params.includeComparison ?? !isDrawMissing;
  const comparisonRelation = derived.relation;
  const comparisonPromptAr = params.comparisonPromptAr ?? derived.promptAr;
  const comparisonAnswerAr = params.comparisonAnswerAr ?? derived.answerAr;

  const visualModels: VisualModelSpec[] = isDrawMissing
    ? [graphModel]
    : [graphModel, ...categories.map((c) => c.traceModel)];

  const orientationWordAr =
    orientation === "vertical" ? "العمودي (الأعمدة)" : "الأفقي (الصفوف)";

  const defaultPromptAr = isDrawMissing
    ? "ارسم الأشكال الناقصة في كل صفّ، ثم عدّ لتتأكد أن التمثيل البياني يطابق الجدول:"
    : responseMode === "write"
      ? `اقرأ التمثيل البياني ${orientationWordAr} بالصور، وعدّ عناصر كل فئة ثم اكتب الرقم من ذاكرتك وقارن بين الفئات:`
      : `اقرأ التمثيل البياني ${orientationWordAr} بالصور، وعدّ عناصر كل فئة ثم تتبّع الرقم واكتبه وقارن (١ أكثر / ١ أقل / نفس العدد):`;

  const countsBreakdownAr = categories
    .map((c) => `${c.labelAr}: ${c.countAr}`)
    .join("، ");

  const defaultStrategyHintAr = isDrawMissing
    ? `عدّ الأشكال في كل صفّ ثم ارسم ما ينقص حتى يساوي عدد الجدول (${countsBreakdownAr}).`
    : orientation === "vertical"
      ? `عدّ الصور في كل عمود من الأسفل إلى الأعلى أو اقرأ المحور العمودي (${countsBreakdownAr})، ثم قارن أطوال الأعمدة لتحدّد أي فئة هي (${comparisonRelation}).`
      : `عدّ الصور في كل صفّ من اليمين إلى اليسار أو اقرأ المحور الأفقي (${countsBreakdownAr})، ثم قارن أطوال الصفوف لتحدّد أي فئة هي (${comparisonRelation}).`;

  const data: PictureGraphReadData = {
    kind: "PictureGraphRead",
    orientation,
    responseMode,
    graphModel,
    categories,
    comparisonRelation,
    includeComparison,
    comparisonChoices: COMPARISON_CHOICES,
    comparisonPromptAr,
    comparisonAnswerAr,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "PictureGraphRead",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: isDrawMissing
      ? "ارسم الأشكال الناقصة في التمثيل البياني"
      : orientation === "vertical"
        ? "اقرأ التمثيل البياني العمودي بالصور"
        : "اقرأ التمثيل البياني الأفقي بالصور",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function renderPictureGraphReadExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as PictureGraphReadData;
  const isAnswerKey = mode === "answer-key";

  if (data.responseMode === "draw-missing") {
    return (
      <div
        data-archetype="PictureGraphRead"
        data-graph-orientation={data.orientation}
        data-graph-response-mode="draw-missing"
      >
        <ExerciseColumns columns={1}>
          <div className="flex items-center justify-center">
            <VisualModelView model={data.graphModel} solved={isAnswerKey} />
          </div>
        </ExerciseColumns>
      </div>
    );
  }

  return (
    <div
      className="space-y-1"
      data-archetype="PictureGraphRead"
      data-graph-orientation={data.orientation}
    >
      <ExerciseColumns columns={2}>
        {/* Column 1 (Right in RTL): Picture Graph Visual Model */}
        <div className="flex items-center justify-center rounded-xl border-2 border-indigo-100 bg-gradient-to-b from-white to-indigo-50/30 p-1 shadow-2xs">
          <VisualModelView model={data.graphModel} solved={isAnswerKey} />
        </div>

        {/* Column 2 (Left in RTL): Category Count, Digit Tracing & Writing Stack */}
        <div
          className="flex flex-col justify-between gap-1"
          data-graph-category-responses="true"
        >
          {data.categories.map((cat, idx) => (
            <div
              key={cat.categoryId}
              className="flex items-center justify-between gap-1 rounded-xl border border-slate-200 bg-white px-1.5 py-0.5 shadow-2xs"
              data-category-response-id={toEasternArabicNumerals(
                cat.categoryId
              )}
            >
              <div className="flex items-center gap-1">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold leading-none text-white">
                  {formatEasternNumber(idx + 1)}
                </span>
                <PictureGraphIconSvg
                  icon={cat.icon}
                  colorTheme={cat.colorTheme}
                  sizePx={30}
                />
                <div className="text-[13px] font-extrabold leading-tight text-slate-900">
                  {toEasternArabicNumerals(cat.labelAr)}
                </div>
              </div>

              <div className="flex items-center gap-1">
                {data.responseMode !== "write" && (
                  <span
                    className="hidden"
                    data-visual-model="numeral-trace"
                    data-digit={cat.countAr}
                    data-start-dot="true"
                    data-direction-arrow="true"
                    data-trace-stroke={isAnswerKey ? "solid" : "dotted"}
                    {...(isAnswerKey
                      ? { "data-solved-trace": cat.countAr }
                      : {})}
                  />
                )}

                <AnswerSlot
                  solved={isAnswerKey}
                  answer={cat.countAr}
                  ariaLabel="مربع كتابة عدد الفئة"
                  tone="indigo"
                  solvedDataAttributes={{
                    "data-solved-category-count": cat.countAr,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </ExerciseColumns>

      {data.includeComparison && (
        <div
          className="space-y-0.5 rounded-xl border-2 border-amber-300 bg-amber-50/80 px-2 py-0.5 text-[13px] font-bold leading-tight text-amber-950"
          data-graph-comparison="true"
        >
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span>
              🤔 قارن بين الفئات:{" "}
              {toEasternArabicNumerals(data.comparisonPromptAr)}
            </span>

            <div className="flex flex-wrap items-center gap-1">
              {data.comparisonChoices.map((choice) => {
                const isSelected =
                  isAnswerKey && choice === data.comparisonRelation;
                return (
                  <span
                    key={choice}
                    className={`rounded-xl border-2 px-2 py-0.5 text-[13px] font-extrabold transition ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-600 text-white shadow-2xs"
                        : "border-dashed border-amber-400 bg-white text-amber-900"
                    }`}
                    data-comparison-choice={toEasternArabicNumerals(choice)}
                    {...(isSelected
                      ? {
                          "data-solved-comparison-relation":
                            toEasternArabicNumerals(choice),
                        }
                      : {})}
                  >
                    {isSelected
                      ? `✓ ${toEasternArabicNumerals(choice)}`
                      : toEasternArabicNumerals(choice)}
                  </span>
                );
              })}
            </div>
          </div>

          {isAnswerKey && (
            <div
              className="rounded-lg bg-emerald-600 px-2 py-0.5 text-[13px] leading-tight text-white"
              data-solved-comparison-answer="true"
            >
              الإجابة النموذجية:{" "}
              {toEasternArabicNumerals(data.comparisonAnswerAr)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const pictureGraphReadArchetype = {
  id: "PictureGraphRead" as const,
  displayNameAr: "اقرأ التمثيل البياني بالصور",
  generate: generatePictureGraphReadExercise,
  render: renderPictureGraphReadExercise,
};

registerExerciseArchetype(pictureGraphReadArchetype);
