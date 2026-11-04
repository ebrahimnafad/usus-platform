import React from "react";
import { registerExerciseArchetype } from "@/archetypes/registry";
import type {
  ColorThemeId,
  EverydayObjectId,
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import {
  EVERYDAY_OBJECT_CATALOG,
  createEverydayObjectSpec,
  getEverydayObjectById,
} from "@/visual-models/everyday-objects";
import {
  createFiveFrameSpec,
  createNumeralTraceSpec,
  createSnapCubesSpec,
  getArabicNumberWord,
} from "@/visual-models/unit-2-models";
import { VisualModelView } from "@/visual-models/registry";
import {
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export type SequenceMode = "forward" | "backward" | "zero-take-away";

export type SequenceVisualKind =
  "snap-cubes" | "everyday-object" | "five-frame";

export interface SequenceStepInput {
  value: number;
  isMissing?: boolean;
  visualModel?: VisualModelSpec;
  stepNoteAr?: string;
  colorTheme?: ColorThemeId;
  crossedOutFrom?: number;
}

export interface SequenceAndZeroBlueprintParams {
  sequenceMode?: SequenceMode;
  visualKind?: SequenceVisualKind;
  numbers?: number[];
  missingValues?: number[];
  missingCount?: number;
  steps?: SequenceStepInput[];
  includeZeroTrace?: boolean;
  objectId?: EverydayObjectId;
  reasoningPromptAr?: string;
  reasoningAnswerAr?: string;
}

export interface SequenceStepItem {
  id: string;
  stepIndex: number;
  value: number;
  valueAr: string;
  numberWordAr: string;
  isMissing: boolean;
  stepDeltaLabelAr: string;
  stepNoteAr: string;
  visualModel: VisualModelSpec;
  traceModel?: VisualModelSpec;
}

export interface SequenceAndZeroData extends GenericArchetypeData {
  kind: "SequenceAndZero";
  sequenceMode: SequenceMode;
  visualKind: SequenceVisualKind;
  stepRuleBadgeAr: string;
  steps: SequenceStepItem[];
  zeroTraceModel?: VisualModelSpec;
  reasoningPromptAr: string;
  reasoningAnswerAr: string;
}

const STEP_COLORS: ColorThemeId[] = [
  "emerald",
  "sky",
  "amber",
  "coral",
  "violet",
  "rose",
  "teal",
];

function buildStepVisualModel(
  visualKind: SequenceVisualKind,
  value: number,
  colorTheme: ColorThemeId,
  objectId: EverydayObjectId,
  crossedOutFrom?: number
): VisualModelSpec {
  if (
    visualKind === "five-frame" ||
    value === 0 ||
    crossedOutFrom !== undefined
  ) {
    const startTotal =
      crossedOutFrom !== undefined
        ? Math.max(value, crossedOutFrom)
        : value === 0
          ? 3
          : value;
    const crossedOut = Math.max(0, startTotal - value);
    return createFiveFrameSpec({
      count: startTotal,
      crossedOutCount: crossedOut,
      colorTheme,
      highlightEmptySlots: true,
    });
  }

  if (visualKind === "everyday-object") {
    const def = getEverydayObjectById(objectId);
    return createEverydayObjectSpec(def, {
      count: Math.max(1, value),
      size: "small",
      colorTheme,
      labelAr: `${formatEasternNumber(value)} (${def.labelAr})`,
    });
  }

  // Default: snap-cubes (vertical tower staircase or horizontal train)
  return createSnapCubesSpec({
    count: Math.max(1, value),
    orientation: "vertical",
    separated: false,
    colorTheme,
  });
}

function defaultStepNoteAr(
  sequenceMode: SequenceMode,
  value: number,
  stepIndex: number,
  prevValue?: number
): string {
  if (sequenceMode === "zero-take-away") {
    if (value === 0) {
      return "لم يتبقَّ أي عنصر (صفر = ٠)";
    }
    if (stepIndex === 0) {
      return `البداية: ${formatEasternNumber(value)} عناصر`;
    }
    return `نأخذ ١ فيبقى ${formatEasternNumber(value)}`;
  }

  if (sequenceMode === "backward") {
    if (stepIndex === 0 || prevValue === undefined) {
      return `البداية من ${formatEasternNumber(value)}`;
    }
    return `${formatEasternNumber(value)} هو ١ أقل من ${formatEasternNumber(
      prevValue
    )}`;
  }

  if (stepIndex === 0 || prevValue === undefined) {
    return `البداية من ${formatEasternNumber(value)}`;
  }
  return `${formatEasternNumber(value)} هو ١ أكثر من ${formatEasternNumber(
    prevValue
  )}`;
}

function generateSequenceAndZeroExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as SequenceAndZeroBlueprintParams;

  const defaultMode: SequenceMode =
    ctx.lesson.lessonNumber === 24
      ? "zero-take-away"
      : ctx.lesson.lessonNumber === 23
        ? "backward"
        : "forward";

  const sequenceMode: SequenceMode = params.sequenceMode ?? defaultMode;

  const defaultVisualKind: SequenceVisualKind =
    sequenceMode === "zero-take-away" ? "five-frame" : "snap-cubes";
  const visualKind: SequenceVisualKind = params.visualKind ?? defaultVisualKind;

  const pickedObject =
    params.objectId ?? ctx.rng.pickOne(EVERYDAY_OBJECT_CATALOG).id;

  let rawSteps: SequenceStepInput[] = [];

  if (params.steps && params.steps.length > 0) {
    rawSteps = params.steps;
  } else {
    const defaultNumbers =
      params.numbers && params.numbers.length > 0
        ? params.numbers
        : sequenceMode === "zero-take-away"
          ? [3, 2, 1, 0]
          : sequenceMode === "backward"
            ? [5, 4, 3, 2, 1]
            : [1, 2, 3, 4, 5];

    const defaultMissingCount =
      ctx.difficultyLevel === "Easy"
        ? 1
        : ctx.difficultyLevel === "Intermediate"
          ? 2
          : 2;

    let missingSet: Set<number>;
    if (params.missingValues && params.missingValues.length > 0) {
      missingSet = new Set(params.missingValues);
    } else if (sequenceMode === "zero-take-away") {
      // Always make 0 (and optionally 1) a target response in zero-take-away
      const extraMissing = ctx.difficultyLevel === "Easy" ? [0] : [1, 0];
      missingSet = new Set(extraMissing);
    } else {
      // Pick non-first items to be missing so the starting anchor is visible
      const candidates = defaultNumbers.slice(1);
      const pickedMissing = ctx.rng.pickN(
        candidates,
        params.missingCount ?? defaultMissingCount
      );
      missingSet = new Set(pickedMissing);
    }

    const startMax = defaultNumbers[0] ?? 3;
    const shuffledStepColors = ctx.rng.shuffle(STEP_COLORS);
    rawSteps = defaultNumbers.map((val, idx) => ({
      value: val,
      isMissing: missingSet.has(val),
      colorTheme: shuffledStepColors[idx % shuffledStepColors.length],
      crossedOutFrom: sequenceMode === "zero-take-away" ? startMax : undefined,
    }));
  }

  const fallbackStepColors = ctx.rng.shuffle(STEP_COLORS);

  const stepRuleBadgeAr =
    sequenceMode === "zero-take-away"
      ? "نأخذ ١ في كل مرة حتى يبقى صفر (٠)"
      : sequenceMode === "backward"
        ? "عدّ تنازلي: ١ أقل في كل خطوة (٥ ← ١)"
        : "عدّ تصاعدي: ١ أكثر في كل خطوة (١ ← ٥)";

  const stepDeltaLabelAr =
    sequenceMode === "zero-take-away"
      ? "شطب ١ (١ أقل)"
      : sequenceMode === "backward"
        ? "١ أقل"
        : "١ أكثر";

  const steps: SequenceStepItem[] = rawSteps.map((step, idx) => {
    const val = Math.max(0, Math.min(5, step.value));
    const valAr = formatEasternNumber(val);
    const theme =
      step.colorTheme ?? fallbackStepColors[idx % fallbackStepColors.length];
    const prevVal = idx > 0 ? rawSteps[idx - 1].value : undefined;

    const visualModel =
      step.visualModel ??
      buildStepVisualModel(
        visualKind,
        val,
        theme,
        pickedObject,
        step.crossedOutFrom
      );

    const shouldIncludeTrace =
      val === 0 || Boolean(step.isMissing) || Boolean(params.includeZeroTrace);

    const traceModel = shouldIncludeTrace
      ? createNumeralTraceSpec({
          digit: val,
          colorTheme: theme,
        })
      : undefined;

    return {
      id: `seq-step-${idx + 1}-v${val}`,
      stepIndex: idx,
      value: val,
      valueAr: valAr,
      numberWordAr: getArabicNumberWord(val),
      isMissing: Boolean(step.isMissing),
      stepDeltaLabelAr,
      stepNoteAr:
        step.stepNoteAr ?? defaultStepNoteAr(sequenceMode, val, idx, prevVal),
      visualModel,
      traceModel,
    };
  });

  const zeroTraceModel =
    sequenceMode === "zero-take-away" ||
    steps.some((s) => s.value === 0) ||
    params.includeZeroTrace
      ? createNumeralTraceSpec({
          digit: 0,
          colorTheme: "indigo",
        })
      : undefined;

  const visualModels: VisualModelSpec[] = [];
  for (const step of steps) {
    visualModels.push(step.visualModel);
    if (step.traceModel) {
      visualModels.push(step.traceModel);
    }
  }
  if (
    zeroTraceModel &&
    !visualModels.some((m) => m.kind === "numeral-trace" && m.digit === 0)
  ) {
    visualModels.push(zeroTraceModel);
  }

  const sequenceTextAr = steps.map((s) => s.valueAr).join(" ← ");

  const defaultPromptAr =
    sequenceMode === "zero-take-away"
      ? `تتبّع قصة أخذ العناصر واحداً تلو الآخر على لوحة الخمسة، وتتبّع الرقم المنقّط (٠) واكتب الأعداد المتبقية:`
      : sequenceMode === "backward"
        ? `عدّ تنازلياً من اليمين إلى اليسار (١ أقل في كل خطوة)، ثم تتبّع واكتب الأعداد المفقودة في التسلسل:`
        : `عدّ تصاعدياً من اليمين إلى اليسار (١ أكثر في كل خطوة)، ثم تتبّع واكتب الأعداد المفقودة في التسلسل:`;

  const defaultStrategyHintAr =
    sequenceMode === "zero-take-away"
      ? `ابدأ بعدد الأقراص الكلي على لوحة الخمسة واشطب قرصاً واحداً في كل مرة (${sequenceTextAr})؛ عندما تُشطب جميع الأقراص لا يبقى شيء ونكتبه بالرقم (٠).`
      : sequenceMode === "backward"
        ? `في العدّ التنازلي (${sequenceTextAr}) ينقص كل عدد بمقدار (١ أقل) عن العدد الذي يسبقه؛ فمثلاً ٤ هو ١ أقل من ٥، و٣ هو ١ أقل من ٤.`
        : `في العدّ التصاعدي (${sequenceTextAr}) يزيد كل عدد بمقدار (١ أكثر) على العدد الذي يسبقه؛ فمثلاً ٢ هو ١ أكثر من ١، و٣ هو ١ أكثر من ٢.`;

  const defaultReasoningPromptAr =
    sequenceMode === "zero-take-away"
      ? `إذا كان لدينا ٣ أقراص على لوحة الخمسة وشطبناها واحداً بعد الآخر (٣ ← ٢ ← ١ ← ٠)، فكم قرصاً يتبقّى في النهاية؟`
      : sequenceMode === "backward"
        ? `ما العدد الذي يمثّل (١ أقل) من ٥ ويأتي قبله عند العدّ التنازلي؟ وما العدد الذي يمثّل (١ أقل) من ٤؟`
        : `لماذا يزيد ارتفاع كل برج مكعبات في التسلسل التصاعدي؟ وما العدد الذي يمثّل (١ أكثر) من ٣ و(١ أكثر) من ٤؟`;

  const defaultReasoningAnswerAr =
    sequenceMode === "zero-take-away"
      ? `لا يتبقّى أي قرص، ونعبّر عن هذه الكمية بالعدد صفر (٠)`
      : sequenceMode === "backward"
        ? `العدد ٤ هو (١ أقل) من ٥، والعدد ٣ هو (١ أقل) من ٤`
        : `لأن كل عدد يزيد بمقدار (١ أكثر)؛ فالعدد ٤ هو ١ أكثر من ٣، والعدد ٥ هو ١ أكثر من ٤`;

  const data: SequenceAndZeroData = {
    kind: "SequenceAndZero",
    sequenceMode,
    visualKind,
    stepRuleBadgeAr,
    steps,
    zeroTraceModel,
    reasoningPromptAr: params.reasoningPromptAr ?? defaultReasoningPromptAr,
    reasoningAnswerAr: params.reasoningAnswerAr ?? defaultReasoningAnswerAr,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "SequenceAndZero",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr:
      sequenceMode === "zero-take-away"
        ? "العدد صفر (٠) وشطب العناصر"
        : sequenceMode === "backward"
          ? "العدّ التنازلي من ٥ (١ أقل)"
          : "العدّ التصاعدي حتى ٥ (١ أكثر)",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function renderSequenceAndZeroExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as SequenceAndZeroData;
  const isAnswerKey = mode === "answer-key";

  return (
    <div
      className="space-y-3"
      data-archetype="SequenceAndZero"
      data-sequence-mode={data.sequenceMode}
    >
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-indigo-200 bg-indigo-50/70 px-3.5 py-2 text-xs font-extrabold text-indigo-950">
        <span>
          🔢 قاعدة التسلسل: {toEasternArabicNumerals(data.stepRuleBadgeAr)}
        </span>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-slate-700 border border-indigo-200">
          الاتجاه: من اليمين إلى اليسار (⬅️)
        </span>
      </div>

      {/* RTL Sequence Steps Grid */}
      <div
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3"
        dir="rtl"
        data-sequence-strip="rtl"
      >
        {data.steps.map((step, idx) => {
          const isSolvedStep = isAnswerKey && step.isMissing;
          return (
            <div
              key={step.id}
              className={`relative flex flex-col items-center justify-between gap-2 rounded-2xl border-2 p-3 transition ${
                isSolvedStep
                  ? "border-emerald-500 bg-emerald-50/90 shadow-xs"
                  : step.isMissing
                    ? "border-dashed border-amber-500 bg-amber-50/50"
                    : "border-slate-200 bg-white shadow-2xs"
              }`}
              data-sequence-step={formatEasternNumber(idx + 1)}
              data-step-value={step.valueAr}
              data-step-missing={step.isMissing ? "true" : "false"}
              {...(isSolvedStep
                ? { "data-solved-sequence-step": step.valueAr }
                : {})}
            >
              {/* Top Step Badge & Delta Pill */}
              <div className="flex w-full items-center justify-between gap-1 text-[11px] font-extrabold">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-indigo-950">
                  خطوة {formatEasternNumber(idx + 1)}
                </span>
                {idx > 0 && (
                  <span className="rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-amber-950">
                    {toEasternArabicNumerals(step.stepDeltaLabelAr)}
                  </span>
                )}
              </div>

              {/* Visual Model */}
              <div className="my-1 flex items-center justify-center">
                <VisualModelView
                  model={step.visualModel}
                  solved={isAnswerKey}
                />
              </div>

              {/* Step Note */}
              <div className="text-center text-[11px] font-bold text-slate-600">
                {toEasternArabicNumerals(step.stepNoteAr)}
              </div>

              {/* Numeral Trace + Digit Box */}
              <div className="flex w-full items-center justify-center gap-2 border-t border-slate-100 pt-2">
                {step.traceModel && (
                  <div className="scale-90">
                    <VisualModelView
                      model={step.traceModel}
                      solved={isAnswerKey}
                    />
                  </div>
                )}

                {step.isMissing ? (
                  isAnswerKey ? (
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-black text-white shadow-xs"
                      data-solved-missing-number={step.valueAr}
                    >
                      {step.valueAr}
                    </span>
                  ) : (
                    <span
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-dashed border-amber-500 bg-white text-lg font-black text-amber-600"
                      aria-label="مربع العدد المفقود في التسلسل"
                    >
                      ؟
                    </span>
                  )
                ) : (
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-indigo-500 bg-indigo-50 text-xl font-black text-indigo-950"
                    {...(isAnswerKey
                      ? { "data-solved-sequence-step": step.valueAr }
                      : {})}
                  >
                    {step.valueAr}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dedicated Zero Tracing Highlight Card when in zero-take-away mode */}
      {data.zeroTraceModel && (
        <div
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-3"
          data-zero-trace-card="true"
        >
          <div className="space-y-1">
            <div className="text-xs font-extrabold text-indigo-950">
              ✍️ تدريب كتابة وتتبع العدد صفر (٠):
            </div>
            <p className="text-[11px] font-bold text-slate-700">
              عندما نأخذ جميع العناصر ولا يتبقّى أي عنصر نسمّي الكمية «صفر»
              ونكتبها على شكل نقطة المعيّن (٠).
            </p>
          </div>
          <VisualModelView model={data.zeroTraceModel} solved={isAnswerKey} />
        </div>
      )}

      {/* Reasoning Prompt (١ أكثر / ١ أقل / معنى الصفر) */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-3.5 py-2 text-xs font-bold text-amber-950">
        <span>
          🤔 سؤال التفكير العددي:{" "}
          {toEasternArabicNumerals(data.reasoningPromptAr)}
        </span>
        {isAnswerKey ? (
          <span
            className="rounded-lg bg-emerald-600 px-2.5 py-1 text-white"
            data-solved-reasoning-answer="true"
          >
            الإجابة: {toEasternArabicNumerals(data.reasoningAnswerAr)}
          </span>
        ) : (
          <span className="inline-block h-6 w-36 rounded-lg border-2 border-dashed border-amber-400 bg-white" />
        )}
      </div>
    </div>
  );
}

export const sequenceAndZeroArchetype = {
  id: "SequenceAndZero" as const,
  displayNameAr: "العدّ التصاعدي والتنازلي والعدد صفر",
  generate: generateSequenceAndZeroExercise,
  render: renderSequenceAndZeroExercise,
};

registerExerciseArchetype(sequenceAndZeroArchetype);
