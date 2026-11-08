import React from "react";
import { registerExerciseArchetype } from "@/archetypes/registry";
import type {
  ColorThemeId,
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import {
  createPaperClipBarSpec,
  createPolygonPerimeterSpec,
  type PaperClipBarType,
} from "@/visual-models/measurement-models";
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

export type MeasureAndCompareMode =
  | "measure-bars"
  | "friends-clips"
  | "mystery-clues"
  | "polygon-sides"
  | "polygon-perimeter";

export interface MeasureBarItem {
  id: string;
  nameAr: string;
  length: number;
  lengthAr: string;
  colorTheme: ColorThemeId;
  barType?: PaperClipBarType;
  model: VisualModelSpec;
}

export interface MeasurePolygonParam {
  shapeId: string;
  shapeNameAr: string;
  sideCount: number;
  clipsPerSide?: number;
  totalClips?: number;
  colorTheme?: ColorThemeId;
}

export interface MeasurePolygonItem {
  id: string;
  shapeId: string;
  shapeNameAr: string;
  sideCount: number;
  clipsPerSide: number;
  totalClips: number;
  model: VisualModelSpec;
}

export interface MeasureAndCompareBlueprintParams {
  mode?: MeasureAndCompareMode;
  barCount?: number;
  bars?: Array<{
    nameAr?: string;
    length: number;
    colorTheme?: ColorThemeId;
    barType?: PaperClipBarType;
  }>;
  comparisonTarget?: "longest" | "shortest" | "difference" | "order-all";
  comparisonPromptAr?: string;
  comparisonAnswerAr?: string;
  cluesAr?: string[];
  // Polygon perimeter params (Ticket 05)
  polygons?: MeasurePolygonParam[];
  polygonShapeId?: string;
  polygonSideCount?: number;
  polygonClipsPerSide?: number;
}

export interface MeasureAndCompareLengthData extends GenericArchetypeData {
  kind: "MeasureAndCompareLength";
  mode: MeasureAndCompareMode;
  bars: MeasureBarItem[];
  polygons?: MeasurePolygonItem[];
  comparisonTarget?: "longest" | "shortest" | "difference" | "order-all";
  comparisonPromptAr: string;
  comparisonAnswerAr: string;
  cluesAr: string[];
  orderedLengthsAr?: string[];
  longestBarNameAr?: string;
  shortestBarNameAr?: string;
  polygonModel?: VisualModelSpec;
}

const BAR_THEMES: ColorThemeId[] = [
  "coral",
  "sky",
  "emerald",
  "amber",
  "violet",
  "rose",
  "teal",
];

const DEFAULT_FRIEND_NAMES = ["أحمد", "مريم", "سارة", "عمر"];

function generateMeasureAndCompareExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as MeasureAndCompareBlueprintParams;
  const defaultMode: MeasureAndCompareMode =
    ctx.lesson.lessonNumber === 72
      ? "polygon-sides"
      : ctx.lesson.lessonNumber === 73
        ? "polygon-perimeter"
        : "measure-bars";
  const mode: MeasureAndCompareMode = params.mode ?? defaultMode;

  const shuffledThemes = ctx.rng.shuffle(BAR_THEMES);

  // Default bar count based on lesson
  const defaultBarCount =
    ctx.lesson.lessonNumber === 69 ? 1 : ctx.lesson.lessonNumber === 70 ? 2 : 3;
  const barCount = Math.max(1, Math.min(3, params.barCount ?? defaultBarCount));

  let rawBars = params.bars;
  if (!rawBars || rawBars.length === 0) {
    if (mode === "friends-clips") {
      const names = ctx.rng.shuffle(DEFAULT_FRIEND_NAMES).slice(0, barCount);
      const lengths = [4, 7, 5].slice(0, barCount);
      rawBars = names.map((name, idx) => ({
        nameAr: name,
        length: lengths[idx],
        colorTheme: shuffledThemes[idx % shuffledThemes.length],
        barType: "bar",
      }));
    } else if (mode === "mystery-clues") {
      const lengths = barCount === 2 ? [5, 8] : [4, 7, 9];
      rawBars = lengths.map((len, idx) => ({
        nameAr: `شريط ${idx + 1}`,
        length: len,
        colorTheme: shuffledThemes[idx % shuffledThemes.length],
        barType: ctx.lesson.lessonNumber >= 70 ? "caterpillar" : "ribbon",
      }));
    } else {
      // measure-bars
      const lengths =
        barCount === 1 ? [5] : barCount === 2 ? [4, 7] : [3, 6, 8];
      rawBars = lengths.map((len, idx) => ({
        nameAr: barCount === 1 ? "الشريط" : `الشريط (${idx + 1})`,
        length: len,
        colorTheme: shuffledThemes[idx % shuffledThemes.length],
        barType: "bar",
      }));
    }
  }

  const isMystery = mode === "mystery-clues";
  const bars: MeasureBarItem[] = rawBars.map((b, idx) => {
    const len = Math.max(1, Math.min(10, b.length));
    const nameAr = b.nameAr ?? `الشريط (${formatEasternNumber(idx + 1)})`;
    const theme = b.colorTheme ?? shuffledThemes[idx % shuffledThemes.length];
    const barType = b.barType ?? "bar";

    const model = createPaperClipBarSpec({
      length: len,
      colorTheme: theme,
      barType,
      labelAr: nameAr,
      mysteryMode: isMystery,
    });

    return {
      id: `bar-${idx + 1}-${len}`,
      nameAr,
      length: len,
      lengthAr: formatEasternNumber(len),
      colorTheme: theme,
      barType,
      model,
    };
  });

  // Calculate comparison metadata
  const sortedByLen = [...bars].sort((a, b) => a.length - b.length);
  const shortest = sortedByLen[0];
  const longest = sortedByLen[sortedByLen.length - 1];
  const orderedLengthsAr = sortedByLen.map((b) => b.lengthAr);

  let defaultComparisonPromptAr = "";
  let defaultComparisonAnswerAr = "";

  if (barCount === 1) {
    defaultComparisonPromptAr = "كم مشبك ورق يبلغ طول الشريط؟";
    defaultComparisonAnswerAr = `طول الشريط هو ${bars[0]?.lengthAr} مشابك`;
  } else if (barCount === 2) {
    const diff = longest.length - shortest.length;
    defaultComparisonPromptAr = `أيّ الشريطين أطول؟ وكم الفرق بينهما؟`;
    defaultComparisonAnswerAr = `«${longest.nameAr}» هو الأطول (${longest.lengthAr})، ويزيد بمقدار ${formatEasternNumber(diff)} على «${shortest.nameAr}» (${shortest.lengthAr})`;
  } else {
    // 3 bars
    defaultComparisonPromptAr = "رتّب الأطوال من الأقصر إلى الأطول:";
    defaultComparisonAnswerAr = `الترتيب من الأقصر إلى الأطول: ${orderedLengthsAr.join(" ← ")} (الأقصر: ${shortest.nameAr}، والأطول: ${longest.nameAr})`;
  }

  const cluesAr =
    params.cluesAr ??
    (mode === "mystery-clues"
      ? [
          `الشريط الأقصر طوله ${shortest.lengthAr} مشابك.`,
          `الشريط الأطول طوله ${longest.lengthAr} مشابك.`,
        ]
      : []);

  let polygonModel: VisualModelSpec | undefined;
  let polygons: MeasurePolygonItem[] | undefined;

  if (mode === "polygon-sides" || mode === "polygon-perimeter") {
    const rawPolys: MeasurePolygonParam[] =
      params.polygons && params.polygons.length > 0
        ? params.polygons
        : ctx.lesson.lessonNumber === 72
          ? [
              {
                shapeId: "triangle",
                shapeNameAr: "مثلث",
                sideCount: 3,
                colorTheme: "amber",
              },
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                colorTheme: "sky",
              },
            ]
          : [
              {
                shapeId: "rectangle",
                shapeNameAr: "مستطيل",
                sideCount: 4,
                clipsPerSide: 1,
                totalClips: 4,
                colorTheme: "emerald",
              },
              {
                shapeId: "triangle",
                shapeNameAr: "مثلث",
                sideCount: 3,
                clipsPerSide: 1,
                totalClips: 3,
                colorTheme: "coral",
              },
            ];

    polygons = rawPolys.map((p, pIdx) => {
      const clipsPerSide = p.clipsPerSide ?? 1;
      const totalClips = p.totalClips ?? p.sideCount * clipsPerSide;
      const theme =
        p.colorTheme ?? shuffledThemes[pIdx % shuffledThemes.length];
      const model = createPolygonPerimeterSpec({
        shapeId: p.shapeId,
        sideCount: p.sideCount,
        clipsPerSide,
        totalClips,
        colorTheme: theme,
        mode,
        showTicks: mode === "polygon-sides",
      });

      return {
        id: `poly-${pIdx + 1}-${p.shapeId}`,
        shapeId: p.shapeId,
        shapeNameAr: p.shapeNameAr,
        sideCount: p.sideCount,
        clipsPerSide,
        totalClips,
        model,
      };
    });

    polygonModel = polygons[0]?.model;
  }

  const visualModels: VisualModelSpec[] = [
    ...(mode === "polygon-sides" || mode === "polygon-perimeter"
      ? (polygons ?? []).map((p) => p.model)
      : bars.map((b) => b.model)),
  ];

  const defaultPromptAr =
    mode === "polygon-sides"
      ? "عدّ أضلاع كل شكل من الأشكال المستوية ثم اكتب عدد أضلاعه في المربع:"
      : mode === "polygon-perimeter"
        ? "عدّ مشابك الورق حول محيط كل شكل ثم اكتب قياس المحيط في المربع:"
        : mode === "mystery-clues"
          ? "اقرأ الأدلّة لتحديد أطوال الأشرطة ثم اكتب طول كل شريط في المربع ولَوّنه:"
          : mode === "friends-clips"
            ? "قِسْ سلاسل مشابك الورق لدى الأصدقاء ثم اكتب عدد مشابك كل صديق وقارن بينها:"
            : barCount === 1
              ? "قِسْ طول الشريط بمشابك الورق المصطفّة طرفاً لطرف ثم اكتب طوله في المربع:"
              : barCount === 2
                ? "قِسْ طول كل شريط بمشابك الورق ثم اكتب الطولين وحوّط الشريط الأطول:"
                : "قِسْ أطوال الأشرطة الثلاثة بمشابك الورق ثم اكتب طول كل شريط ورتّبها من الأقصر إلى الأطول:";

  const defaultStrategyHintAr =
    mode === "polygon-sides"
      ? "انظر إلى أضلاع كل شكل وضع علامة صغيرة أثناء العدّ حول الشكل حتى نقطة البدء."
      : mode === "polygon-perimeter"
        ? "عدّ مشابك الورق على جميع أضلاع الشكل واجمعها لمعرفة قياس المحيط الكلّي."
        : mode === "mystery-clues"
          ? "انظر إلى الأدلّة وحدّد الشريط الأقصر أولاً ثم استخدم المقارنة لتحديد باقي الأشرطة."
          : barCount === 1
            ? "عدّ مشابك الورق من خط البدء على اليمين حتى نهاية الشريط واكتب العدد."
            : barCount === 2
              ? "قِسْ طول الشريط الأقصر أولاً ثم عُدّ تصاعدياً لمعرفة كم يزيد الشريط الأطول."
              : "قِسْ الشريط الأقصر أولاً واكتب الأطوال الثلاثة، ثم رتّبها تصاعدياً من الأصغر إلى الأكبر.";

  const data: MeasureAndCompareLengthData = {
    kind: "MeasureAndCompareLength",
    mode,
    bars: mode === "polygon-sides" || mode === "polygon-perimeter" ? [] : bars,
    polygons,
    comparisonTarget:
      params.comparisonTarget ?? (barCount === 2 ? "longest" : "order-all"),
    comparisonPromptAr: params.comparisonPromptAr ?? defaultComparisonPromptAr,
    comparisonAnswerAr: params.comparisonAnswerAr ?? defaultComparisonAnswerAr,
    cluesAr,
    orderedLengthsAr,
    longestBarNameAr: longest?.nameAr,
    shortestBarNameAr: shortest?.nameAr,
    polygonModel,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "MeasureAndCompareLength",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr:
      mode === "polygon-sides"
        ? "عدّ أضلاع الأشكال المستوية"
        : mode === "polygon-perimeter"
          ? "قياس محيط الأشكال بمشابك الورق"
          : mode === "mystery-clues"
            ? "ألغاز القياس بمشابك الورق"
            : mode === "friends-clips"
              ? "مشابك الأصدقاء والمقارنة"
              : barCount === 1
                ? "قياس طول شريط واحد"
                : barCount === 2
                  ? "قياس طول شريطين ومقارنتهما"
                  : "قياس أطوال ٣ أشرطة وترتيبها",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function renderMeasureAndCompareExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as MeasureAndCompareLengthData;
  const isAnswerKey = mode === "answer-key";

  return (
    <div
      className="space-y-1"
      data-archetype="MeasureAndCompareLength"
      data-measure-mode={data.mode}
      data-bar-count={data.bars.length}
      data-polygon-count={data.polygons?.length ?? 0}
    >
      {/* Mystery Clues Banner (if mystery mode) */}
      {data.cluesAr.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 px-2.5 py-0.5 text-[12.5px] font-bold text-indigo-950">
          <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white">
            🔍 أدلّة القياس
          </span>
          {data.cluesAr.map((clue, idx) => (
            <span key={idx} className="inline-flex items-center gap-1">
              • {toEasternArabicNumerals(clue)}
            </span>
          ))}
        </div>
      )}

      {/* Polygons Measurement Row (for polygon-sides and polygon-perimeter) */}
      {(data.mode === "polygon-sides" || data.mode === "polygon-perimeter") &&
        data.polygons &&
        data.polygons.length > 0 && (
          <div
            className="flex flex-wrap items-center justify-around gap-2"
            data-polygons-container="true"
            dir="rtl"
          >
            {data.polygons.map((poly) => {
              const answerValue =
                data.mode === "polygon-sides"
                  ? formatEasternNumber(poly.sideCount)
                  : formatEasternNumber(poly.totalClips);
              const unitLabel =
                data.mode === "polygon-sides" ? "أضلاع" : "مشابك";

              return (
                <div
                  key={poly.id}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-2xs"
                  data-measured-polygon={poly.shapeId}
                >
                  <VisualModelView model={poly.model} solved={isAnswerKey} />

                  <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5">
                    <span className="text-[13px] font-bold text-slate-800">
                      {toEasternArabicNumerals(poly.shapeNameAr)}:
                    </span>
                    <AnswerSlot
                      solved={isAnswerKey}
                      answer={answerValue}
                      ariaLabel={`مربع ${poly.shapeNameAr}`}
                      tone="amber"
                      solvedDataAttributes={{
                        "data-solved-polygon-measure": answerValue,
                      }}
                    />
                    <span className="text-xs font-bold text-slate-600">
                      {unitLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      {/* Bars Measurement Grid */}
      {data.bars.length > 0 && (
        <div className="space-y-0.5" dir="rtl" data-bars-container="true">
          {data.bars.map((bar, idx) => {
            const isLongest = bar.nameAr === data.longestBarNameAr;
            return (
              <div
                key={bar.id}
                className={`flex items-center justify-between gap-1.5 rounded-xl border p-0.5 transition ${
                  isAnswerKey && isLongest && data.bars.length === 2
                    ? "border-emerald-500 bg-emerald-50/70 shadow-xs"
                    : "border-slate-200 bg-white shadow-2xs"
                }`}
                data-measured-bar={bar.id}
              >
                {/* Paper Clip Bar SVG */}
                <div className="flex-1 overflow-hidden">
                  <VisualModelView model={bar.model} solved={isAnswerKey} />
                </div>

                {/* Bar Name and Length AnswerSlot */}
                <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5">
                  <span className="text-[13px] font-bold text-slate-800">
                    {toEasternArabicNumerals(bar.nameAr)}:
                  </span>
                  <AnswerSlot
                    solved={isAnswerKey}
                    answer={bar.lengthAr}
                    ariaLabel={`مربع طول ${bar.nameAr}`}
                    tone="amber"
                    solvedDataAttributes={{
                      "data-solved-bar-length": bar.lengthAr,
                    }}
                  />
                  <span className="text-xs font-bold text-slate-600">
                    مشابك
                  </span>
                  {isAnswerKey && isLongest && data.bars.length === 2 && (
                    <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs font-black text-emerald-900 border border-emerald-300">
                      الأطول ⭐
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Comparison & Ordering Section (for 2 or 3 bars) */}
      {data.bars.length > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-1.5 rounded-xl border border-amber-300 bg-amber-50/80 px-2 py-0.5 text-[13px] font-bold leading-tight text-amber-950">
          <div className="flex items-center gap-1.5">
            🤔 {toEasternArabicNumerals(data.comparisonPromptAr)}
          </div>

          {data.bars.length === 3 && data.orderedLengthsAr ? (
            <div className="flex items-center gap-1" data-ordering-slots="true">
              <span className="text-xs text-slate-700">الأقصر</span>
              {data.orderedLengthsAr.map((lenAr, slotIdx) => (
                <React.Fragment key={slotIdx}>
                  <AnswerSlot
                    solved={isAnswerKey}
                    answer={lenAr}
                    ariaLabel={`الترتيب ${formatEasternNumber(slotIdx + 1)}`}
                    tone="sky"
                    solvedDataAttributes={{
                      "data-solved-order-slot": lenAr,
                    }}
                  />
                  {slotIdx < (data.orderedLengthsAr?.length ?? 0) - 1 && (
                    <span className="text-slate-500 font-bold">←</span>
                  )}
                </React.Fragment>
              ))}
              <span className="text-xs text-slate-700">الأطول</span>
            </div>
          ) : (
            <AnswerLine
              solved={isAnswerKey}
              answer={toEasternArabicNumerals(data.comparisonAnswerAr)}
              ariaLabel="سطر إجابة المقارنة"
              solvedDataAttributes={{ "data-solved-comparison": "true" }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export const measureAndCompareLengthArchetype = {
  id: "MeasureAndCompareLength" as const,
  displayNameAr: "قياس الطول ومقارنته بالمشابك",
  generate: generateMeasureAndCompareExercise,
  render: renderMeasureAndCompareExercise,
};

registerExerciseArchetype(measureAndCompareLengthArchetype);
