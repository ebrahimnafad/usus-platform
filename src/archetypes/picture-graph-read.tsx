import React from "react";
import type {
  ColorThemeId,
  EverydayObjectId,
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import {
  EVERYDAY_OBJECT_CATALOG,
  EverydayObjectSvg,
  getEverydayObjectById,
} from "@/visual-models/everyday-objects";
import {
  createPictureGraphSpec,
  type PictureGraphCategorySpec,
  type PictureGraphOrientation,
} from "@/visual-models/picture-graphs";
import {
  createNumeralTraceSpec,
  getArabicNumberWord,
} from "@/visual-models/unit-2-models";
import { VisualModelView } from "@/visual-models/registry";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export type PictureGraphCountsPattern =
  | "increasing-by-1"
  | "decreasing-by-1"
  | "with-equal-pair"
  | "mixed";

export type PictureGraphResponseMode = "trace" | "write" | "trace-and-write";

export type ComparisonRelationLabelAr = "١ أكثر" | "١ أقل" | "نفس العدد";

export interface PictureGraphCategoryInput {
  objectId: EverydayObjectId;
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
  comparisonRelation?: ComparisonRelationLabelAr;
  comparisonPromptAr?: string;
  comparisonAnswerAr?: string;
}

export interface PictureGraphCategoryItem extends PictureGraphCategorySpec {
  countAr: string;
  numberWordAr: string;
  traceModel: VisualModelSpec;
}

export interface PictureGraphReadData extends GenericArchetypeData {
  kind: "PictureGraphRead";
  orientation: PictureGraphOrientation;
  responseMode: PictureGraphResponseMode;
  graphModel: VisualModelSpec;
  categories: PictureGraphCategoryItem[];
  comparisonRelation: ComparisonRelationLabelAr;
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
  rng: ArchetypeGeneratorContext["rng"]
): number[] {
  if (pattern === "increasing-by-1") {
    const maxStart = Math.max(1, 6 - categoryCount);
    const start = rng.int(1, maxStart);
    return Array.from({ length: categoryCount }, (_, i) =>
      Math.min(5, start + i)
    );
  }

  if (pattern === "decreasing-by-1") {
    const minStart = Math.min(5, categoryCount);
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

  const promptAr = `قارن في التمثيل البياني بين «${pairB.labelAr}» (${pairB.countAr}) و«${pairA.labelAr}» (${pairA.countAr}): هل عدد «${pairB.labelAr}» في ${unitNameAr} يمثّل (١ أكثر) أم (١ أقل) أم (نفس العدد)؟`;

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
    params.orientation ?? (ctx.lesson.lessonNumber === 21 ? "vertical" : "horizontal");

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

  let rawCategories: PictureGraphCategoryInput[] = [];
  if (params.categories && params.categories.length > 0) {
    rawCategories = params.categories;
  } else {
    const pickedObjects = ctx.rng.pickN(EVERYDAY_OBJECT_CATALOG, categoryCount);
    const counts = buildDefaultCountsForPattern(
      countsPattern,
      pickedObjects.length,
      ctx.rng
    );
    rawCategories = pickedObjects.map((obj, idx) => ({
      objectId: obj.id,
      count: counts[idx] ?? 1,
      colorTheme:
        obj.colorTheme ?? GRAPH_COLOR_CYCLE[idx % GRAPH_COLOR_CYCLE.length],
      labelAr: obj.labelAr,
    }));
  }

  const categories: PictureGraphCategoryItem[] = rawCategories.map(
    (cat, idx) => {
      const def = getEverydayObjectById(cat.objectId);
      const safeCount = Math.max(1, Math.min(5, cat.count));
      const colorTheme =
        cat.colorTheme ??
        def.colorTheme ??
        GRAPH_COLOR_CYCLE[idx % GRAPH_COLOR_CYCLE.length];
      const countAr = formatEasternNumber(safeCount);
      const labelAr = cat.labelAr ?? def.labelAr;

      return {
        categoryId: `cat-${idx + 1}-${cat.objectId}`,
        objectId: cat.objectId,
        labelAr,
        count: safeCount,
        countAr,
        numberWordAr: getArabicNumberWord(safeCount),
        colorTheme,
        traceModel: createNumeralTraceSpec({
          digit: safeCount,
          colorTheme,
        }),
      };
    }
  );

  const graphModel = createPictureGraphSpec({
    orientation,
    titleAr: params.titleAr,
    categories,
  });

  const derived = deriveComparisonFromCategories(
    categories,
    orientation,
    params.comparisonRelation
  );

  const comparisonRelation = derived.relation;
  const comparisonPromptAr = params.comparisonPromptAr ?? derived.promptAr;
  const comparisonAnswerAr = params.comparisonAnswerAr ?? derived.answerAr;

  const visualModels: VisualModelSpec[] = [
    graphModel,
    ...categories.map((c) => c.traceModel),
  ];

  const orientationWordAr =
    orientation === "vertical" ? "العمودي (الأعمدة)" : "الأفقي (الصفوف)";

  const defaultPromptAr =
    responseMode === "write"
      ? `اقرأ التمثيل البياني ${orientationWordAr} بالصور، وعدّ عناصر كل فئة ثم اكتب الرقم من ذاكرتك وقارن بين الفئات:`
      : `اقرأ التمثيل البياني ${orientationWordAr} بالصور، وعدّ عناصر كل فئة ثم تتبّع الرقم واكتبه وقارن (١ أكثر / ١ أقل / نفس العدد):`;

  const countsBreakdownAr = categories
    .map((c) => `${c.labelAr}: ${c.countAr}`)
    .join("، ");

  const defaultStrategyHintAr =
    orientation === "vertical"
      ? `عدّ الصور في كل عمود من الأسفل إلى الأعلى أو اقرأ المحور العمودي (${countsBreakdownAr})، ثم قارن أطوال الأعمدة لتحدّد أي فئة هي (${comparisonRelation}).`
      : `عدّ الصور في كل صفّ من اليمين إلى اليسار أو اقرأ المحور الأفقي (${countsBreakdownAr})، ثم قارن أطوال الصفوف لتحدّد أي فئة هي (${comparisonRelation}).`;

  const data: PictureGraphReadData = {
    kind: "PictureGraphRead",
    orientation,
    responseMode,
    graphModel,
    categories,
    comparisonRelation,
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
    titleAr:
      orientation === "vertical"
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

  return (
    <div
      className="space-y-3"
      data-archetype="PictureGraphRead"
      data-graph-orientation={data.orientation}
    >
      {/* 1. Picture Graph Visual Model */}
      <div className="flex justify-center rounded-2xl border-2 border-indigo-100 bg-gradient-to-b from-white to-indigo-50/30 p-3 shadow-2xs">
        <VisualModelView model={data.graphModel} solved={isAnswerKey} />
      </div>

      {/* 2. Category Count, Digit Tracing & Writing Row */}
      <div
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-3"
        data-graph-category-responses="true"
      >
        {data.categories.map((cat, idx) => (
          <div
            key={cat.categoryId}
            className="flex items-center justify-between gap-2 rounded-2xl border-2 border-slate-200 bg-white p-2.5 shadow-2xs"
            data-category-response-id={toEasternArabicNumerals(cat.categoryId)}
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold text-white">
                {formatEasternNumber(idx + 1)}
              </span>
              <EverydayObjectSvg objectId={cat.objectId} size="small" />
              <div>
                <div className="text-xs font-extrabold text-slate-900">
                  {toEasternArabicNumerals(cat.labelAr)}
                </div>
                <div className="text-[10px] font-bold text-slate-500">
                  {data.responseMode === "write"
                    ? "اكتب الرقم من ذاكرتك"
                    : "تتبّع واكتب العدد"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {data.responseMode !== "write" && (
                <div className="scale-90">
                  <VisualModelView model={cat.traceModel} solved={isAnswerKey} />
                </div>
              )}

              {isAnswerKey ? (
                <span
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-black text-white shadow-xs"
                  data-solved-category-count={cat.countAr}
                >
                  {cat.countAr}
                </span>
              ) : (
                <span
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-indigo-400 bg-indigo-50/30 text-base font-bold text-slate-400"
                  aria-label="مربع كتابة عدد الفئة"
                >
                  ؟
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Comparison & Pattern Reasoning Prompt (١ أكثر / ١ أقل / نفس العدد) */}
      <div
        className="space-y-2 rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-3 text-xs font-bold text-amber-950"
        data-graph-comparison="true"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>
            🤔 قارن بين الفئات:{" "}
            {toEasternArabicNumerals(data.comparisonPromptAr)}
          </span>

          <div className="flex flex-wrap items-center gap-1.5">
            {data.comparisonChoices.map((choice) => {
              const isSelected =
                isAnswerKey && choice === data.comparisonRelation;
              return (
                <span
                  key={choice}
                  className={`rounded-xl border-2 px-2.5 py-1 text-xs font-extrabold transition ${
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
                  {isSelected ? `✓ ${toEasternArabicNumerals(choice)}` : toEasternArabicNumerals(choice)}
                </span>
              );
            })}
          </div>
        </div>

        {isAnswerKey && (
          <div
            className="rounded-xl bg-emerald-600 px-3 py-1.5 text-white"
            data-solved-comparison-answer="true"
          >
            الإجابة النموذجية:{" "}
            {toEasternArabicNumerals(data.comparisonAnswerAr)}
          </div>
        )}
      </div>
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
