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
  createTallyMarksSpec,
  createTenFrameSpec,
  getArabicNumberWord,
} from "@/visual-models/unit-2-models";
import { createDotArraySpec } from "@/visual-models/dot-array";
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

export type SequenceMode = "forward" | "backward" | "zero-take-away";

export type SequenceResponseKind = "trace" | "fill-missing";

export type SequenceVisualKind =
  | "snap-cubes"
  | "everyday-object"
  | "five-frame"
  | "ten-frame"
  | "tally-marks"
  | "dot-array"
  | "none";

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
  responseKind?: SequenceResponseKind;
  layoutStyle?: "strip" | "snake-grid";
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
  responseKind: SequenceResponseKind;
  layoutStyle?: "strip" | "snake-grid";
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
  if (visualKind === "none") {
    return createNumeralTraceSpec({
      digit: Math.max(0, Math.min(20, value)),
      colorTheme,
    });
  }

  if (visualKind === "ten-frame") {
    const primary = Math.min(5, value);
    const secondary = Math.max(0, value - 5);
    return createTenFrameSpec({
      count: primary,
      secondaryCount: secondary,
      colorTheme,
      secondaryColorTheme: colorTheme === "sky" ? "amber" : "sky",
      highlightEmptySlots: true,
    });
  }

  if (visualKind === "tally-marks") {
    return createTallyMarksSpec({
      count: Math.max(1, value),
      compact: true,
      colorTheme,
    });
  }

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

  // K-106: dot arrays for sequences — placed after the five-frame catch-all so
  // value 0 still renders a five-frame (a dot array cannot display 0 dots).
  if (visualKind === "dot-array") {
    const teen = value > 10;
    return createDotArraySpec({
      rows: teen ? 2 : 1,
      columns: 10,
      gap: teen ? 20 - value : 10 - value,
      colorTheme,
    });
  }

  if (visualKind === "everyday-object") {
    const def = getEverydayObjectById(objectId);
    const count = Math.max(1, value);
    return createEverydayObjectSpec(def, {
      count,
      size: count >= 4 ? undefined : "small",
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
      return `البداية: ${formatEasternNumber(value)} أشياء`;
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
      : ctx.lesson.lessonNumber === 23 || ctx.lesson.lessonNumber === 66
        ? "backward"
        : "forward";

  const sequenceMode: SequenceMode = params.sequenceMode ?? defaultMode;
  const responseKind: SequenceResponseKind = params.responseKind ?? "trace";

  const defaultVisualKind: SequenceVisualKind =
    responseKind === "fill-missing"
      ? "none"
      : sequenceMode === "zero-take-away"
        ? "five-frame"
        : "snap-cubes";
  const visualKind: SequenceVisualKind = params.visualKind ?? defaultVisualKind;

  const pickedObject =
    params.objectId ?? ctx.rng.pickOne(EVERYDAY_OBJECT_CATALOG).id;

  let rawSteps: SequenceStepInput[] = [];

  if (params.steps && params.steps.length > 0) {
    rawSteps = params.steps;
  } else {
    const isTeenLesson =
      ctx.lesson.lessonNumber >= 106 || responseKind === "fill-missing";
    const isTenLesson = ctx.lesson.lessonNumber >= 65;
    const defaultNumbers =
      params.numbers && params.numbers.length > 0
        ? params.numbers
        : responseKind === "fill-missing"
          ? ctx.difficultyLevel === "Easy"
            ? [11, 12, 13, 14, 15]
            : ctx.difficultyLevel === "Intermediate"
              ? [11, 12, 13, 14, 15]
              : [16, 17, 18, 19, 20]
          : sequenceMode === "zero-take-away"
            ? [3, 2, 1, 0]
            : sequenceMode === "backward"
              ? isTenLesson
                ? [10, 9, 8, 7, 6]
                : [5, 4, 3, 2, 1]
              : isTenLesson
                ? [6, 7, 8, 9, 10]
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

  const firstVal = rawSteps[0]?.value;
  const lastVal = rawSteps[rawSteps.length - 1]?.value;
  const stepRuleBadgeAr =
    sequenceMode === "zero-take-away"
      ? "نأخذ ١ في كل مرة حتى يبقى صفر (٠)"
      : sequenceMode === "backward"
        ? `عدّ تنازلي: ١ أقل في كل خطوة (${formatEasternNumber(firstVal ?? 5)} ← ${formatEasternNumber(lastVal ?? 1)})`
        : `عدّ تصاعدي: ١ أكثر في كل خطوة (${formatEasternNumber(firstVal ?? 1)} ← ${formatEasternNumber(lastVal ?? 5)})`;

  const stepDeltaLabelAr =
    sequenceMode === "zero-take-away"
      ? "شطب ١ (١ أقل)"
      : sequenceMode === "backward"
        ? "١ أقل"
        : "١ أكثر";

  const steps: SequenceStepItem[] = rawSteps.map((step, idx) => {
    // K-106 & K-111: dot-array, tally, and fill-missing sequences run to 20; other visuals stay ≤ 10
    const val = Math.max(
      0,
      Math.min(
        visualKind === "dot-array" ||
          visualKind === "tally-marks" ||
          visualKind === "none" ||
          responseKind === "fill-missing"
          ? 20
          : 10,
        step.value
      )
    );
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
    responseKind === "fill-missing"
      ? "انظر إلى خط الأعداد المتتالية، ثم اكتب الأعداد الناقصة في المربعات:"
      : sequenceMode === "zero-take-away"
        ? `تتبّع قصة أخذ الأشياء واحداً تلو الآخر على لوحة الخمسة، وتتبّع الرقم المنقّط (٠) واكتب الأعداد المتبقية:`
        : sequenceMode === "backward"
          ? `عدّ تنازلياً من اليمين إلى اليسار (١ أقل في كل خطوة)، ثم تتبّع واكتب الأعداد المفقودة في التسلسل:`
          : `عدّ تصاعدياً من اليمين إلى اليسار (١ أكثر في كل خطوة)، ثم تتبّع واكتب الأعداد المفقودة في التسلسل:`;

  const defaultStrategyHintAr =
    responseKind === "fill-missing"
      ? `الأعداد المتتالية (${sequenceTextAr}) تأتي بالترتيب دون فجوات؛ اكتب في كل مربع ناقص العدد الذي يكمل العدّ بانتظام.`
      : sequenceMode === "zero-take-away"
        ? `ابدأ بعدد الأقراص الكلي على لوحة الخمسة واشطب قرصاً واحداً في كل مرة (${sequenceTextAr})؛ عندما تُشطب جميع الأقراص لا يبقى شيء ونكتبه بالرقم (٠).`
        : sequenceMode === "backward"
          ? `في العدّ التنازلي (${sequenceTextAr}) ينقص كل عدد بمقدار (١ أقل) عن العدد الذي يسبقه؛ فمثلاً ٤ هو ١ أقل من ٥، و٣ هو ١ أقل من ٤.`
          : `في العدّ التصاعدي (${sequenceTextAr}) يزيد كل عدد بمقدار (١ أكثر) على العدد الذي يسبقه؛ فمثلاً ٢ هو ١ أكثر من ١، و٣ هو ١ أكثر من ٢.`;

  const defaultReasoningPromptAr =
    responseKind === "fill-missing"
      ? `ما هو العدد الذي يأتي مباشرة بعد ${formatEasternNumber(firstVal ?? 11)} في هذا التسلسل المتتالي؟`
      : sequenceMode === "zero-take-away"
        ? `إذا كان لدينا ٣ أقراص على لوحة الخمسة وشطبناها واحداً بعد الآخر (٣ ← ٢ ← ١ ← ٠)، فكم قرصاً يتبقّى في النهاية؟`
        : sequenceMode === "backward"
          ? `ما العدد الذي يمثّل (١ أقل) من ٥ ويأتي قبله عند العدّ التنازلي؟ وما العدد الذي يمثّل (١ أقل) من ٤؟`
          : `لماذا يزيد ارتفاع كل برج مكعبات في التسلسل التصاعدي؟ وما العدد الذي يمثّل (١ أكثر) من ٣ و(١ أكثر) من ٤؟`;

  const defaultReasoningAnswerAr =
    responseKind === "fill-missing"
      ? `العدد التالي هو ${formatEasternNumber((firstVal ?? 11) + 1)} لأنه يزيد عليه بمقدار (١ أكثر)`
      : sequenceMode === "zero-take-away"
        ? `لا يتبقّى أي قرص، ونعبّر عن هذه الكمية بالعدد صفر (٠)`
        : sequenceMode === "backward"
          ? `العدد ٤ هو (١ أقل) من ٥، والعدد ٣ هو (١ أقل) من ٤`
          : `لأن كل عدد يزيد بمقدار (١ أكثر)؛ فالعدد ٤ هو ١ أكثر من ٣، والعدد ٥ هو ١ أكثر من ٤`;

  const layoutStyle =
    params.layoutStyle ??
    (responseKind === "fill-missing" && (params.numbers?.length ?? 0) > 5
      ? "snake-grid"
      : "strip");

  const data: SequenceAndZeroData = {
    kind: "SequenceAndZero",
    sequenceMode,
    visualKind,
    responseKind,
    layoutStyle,
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
      responseKind === "fill-missing"
        ? "الأعداد المتتالية: ملء الأعداد الناقصة"
        : sequenceMode === "zero-take-away"
          ? "العدد صفر (٠) وشطب الأشياء"
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

  if (data.responseKind === "fill-missing") {
    const isSnakeGrid = data.layoutStyle === "snake-grid";

    return (
      <div
        className="space-y-1.5"
        data-archetype="SequenceAndZero"
        data-sequence-mode={data.sequenceMode}
        data-response-kind="fill-missing"
      >
        {isSnakeGrid ? (
          /* Authentic 3x3 Snake / S-Curve Grid (Tang Math pp. 551-553) */
          <div
            dir="rtl"
            data-sequence-strip="rtl"
            data-sequence-line="true"
            data-layout-style="snake-grid"
            className="flex flex-col items-center gap-2 rounded-2xl border-2 border-indigo-200 bg-gradient-to-l from-indigo-50/40 via-white to-indigo-50/40 p-3 shadow-2xs"
          >
            {(() => {
              const rows: SequenceStepItem[][] = [];
              for (let i = 0; i < data.steps.length; i += 3) {
                rows.push(data.steps.slice(i, i + 3));
              }
              return rows.map((rowSteps, rowIdx) => (
                <React.Fragment key={`row-${rowIdx}`}>
                  {/* Row of 3 consecutive boxes */}
                  <div className="flex w-full items-center justify-between px-3">
                    {rowSteps.map((step, colIdx) => {
                      const overallIdx = rowIdx * 3 + colIdx;
                      const isSolved = isAnswerKey && step.isMissing;
                      return (
                        <React.Fragment key={step.id}>
                          <div
                            className="flex flex-col items-center gap-1"
                            data-sequence-step={formatEasternNumber(
                              overallIdx + 1
                            )}
                            data-step-value={step.valueAr}
                            data-step-missing={
                              step.isMissing ? "true" : "false"
                            }
                            {...(isSolved
                              ? {
                                  "data-solved-sequence-step": step.valueAr,
                                  "data-solved-missing-number": step.valueAr,
                                }
                              : {})}
                          >
                            {step.isMissing ? (
                              <AnswerSlot
                                solved={isAnswerKey}
                                answer={step.valueAr}
                                ariaLabel="مربع كتابة العدد المتتالي المفقود"
                                tone="amber"
                                solvedDataAttributes={{
                                  "data-solved-missing-number": step.valueAr,
                                }}
                              />
                            ) : (
                              <span
                                className={`inline-flex ${ANSWER_SLOT_SIZE_CLASS} shrink-0 items-center justify-center rounded-2xl border-2 border-indigo-500 bg-indigo-50 text-[28px] font-black leading-none text-indigo-950 shadow-2xs`}
                                data-sequence-node="given"
                                data-step-value={step.valueAr}
                                {...(isAnswerKey
                                  ? {
                                      "data-solved-sequence-step": step.valueAr,
                                    }
                                  : {})}
                              >
                                {step.valueAr}
                              </span>
                            )}
                          </div>

                          {/* Horizontal connector line within row (RTL) */}
                          {colIdx < rowSteps.length - 1 && (
                            <div className="flex flex-1 items-center justify-center px-1">
                              <div className="h-0.5 w-full bg-indigo-300" />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Snake return sweep track between rows (RTL: left end of row -> right end of next row) */}
                  {rowIdx < rows.length - 1 && (
                    <div className="relative h-4 w-full px-8">
                      <svg
                        className="h-full w-full"
                        viewBox="0 0 280 16"
                        preserveAspectRatio="none"
                        fill="none"
                      >
                        <path
                          d="M 14 0 V 8 H 266 V 16"
                          stroke="#818CF8"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ));
            })()}
          </div>
        ) : (
          /* Horizontal Sequence Line Container */
          <div
            dir="rtl"
            data-sequence-strip="rtl"
            data-sequence-line="true"
            className="relative flex w-full items-center justify-between gap-1 rounded-2xl border-2 border-indigo-200 bg-gradient-to-l from-indigo-50/40 via-white to-indigo-50/40 p-3 shadow-2xs"
          >
            {data.steps.map((step, idx) => {
              const isSolved = isAnswerKey && step.isMissing;
              return (
                <React.Fragment key={step.id}>
                  {/* Node */}
                  <div
                    className="flex flex-col items-center gap-1.5"
                    data-sequence-step={formatEasternNumber(idx + 1)}
                    data-step-value={step.valueAr}
                    data-step-missing={step.isMissing ? "true" : "false"}
                    {...(isSolved
                      ? {
                          "data-solved-sequence-step": step.valueAr,
                          "data-solved-missing-number": step.valueAr,
                        }
                      : {})}
                  >
                    {/* Step Pill */}
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-extrabold text-indigo-950">
                      خطوة {formatEasternNumber(idx + 1)}
                    </span>

                    {/* Value Box or AnswerSlot */}
                    {step.isMissing ? (
                      <AnswerSlot
                        solved={isAnswerKey}
                        answer={step.valueAr}
                        ariaLabel="مربع كتابة العدد المتتالي المفقود"
                        tone="amber"
                        solvedDataAttributes={{
                          "data-solved-missing-number": step.valueAr,
                        }}
                      />
                    ) : (
                      <span
                        className={`inline-flex ${ANSWER_SLOT_SIZE_CLASS} shrink-0 items-center justify-center rounded-2xl border-2 border-indigo-500 bg-indigo-50 text-[28px] font-black leading-none text-indigo-950 shadow-2xs`}
                        data-sequence-node="given"
                        data-step-value={step.valueAr}
                        {...(isAnswerKey
                          ? { "data-solved-sequence-step": step.valueAr }
                          : {})}
                      >
                        {step.valueAr}
                      </span>
                    )}
                  </div>

                  {/* Directional Connector Arrow between consecutive nodes (RTL) */}
                  {idx < data.steps.length - 1 && (
                    <div className="flex flex-1 flex-col items-center justify-center gap-0.5">
                      <span className="text-xs font-extrabold text-indigo-700">
                        {toEasternArabicNumerals(step.stepDeltaLabelAr)}
                      </span>
                      <div className="flex w-full items-center">
                        <div className="h-0.5 flex-1 bg-indigo-300" />
                        <span className="text-base font-black text-indigo-500">
                          ←
                        </span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Reasoning Prompt */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-2.5 py-1 text-[13px] font-bold leading-tight text-amber-950">
          <span>
            🤔 سؤال التفكير العددي:{" "}
            {toEasternArabicNumerals(data.reasoningPromptAr)}
          </span>
          <AnswerLine
            solved={isAnswerKey}
            answer={toEasternArabicNumerals(data.reasoningAnswerAr)}
            ariaLabel="سطر كتابة إجابة سؤال التفكير العددي"
            solvedDataAttributes={{ "data-solved-reasoning-answer": "true" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="space-y-1"
      data-archetype="SequenceAndZero"
      data-sequence-mode={data.sequenceMode}
    >
      {/* RTL Sequence Steps Grid */}
      <div dir="rtl" data-sequence-strip="rtl">
        <ExerciseColumns
          columns={
            data.visualKind === "five-frame" ||
            data.visualKind === "ten-frame" ||
            data.visualKind === "tally-marks" ||
            data.visualKind === "everyday-object" ||
            data.visualKind === "dot-array"
              ? 2
              : 3
          }
        >
          {data.steps
            .slice(
              0,
              data.visualKind === "ten-frame" ||
                data.visualKind === "five-frame"
                ? 4
                : 5
            )
            .map((step, idx) => {
              const isSolvedStep = isAnswerKey && step.isMissing;
              return (
                <div
                  key={step.id}
                  className={`relative flex flex-col justify-between gap-0.5 rounded-xl border p-1 transition ${
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
                  <div className="flex w-full items-center justify-between gap-1 text-xs font-extrabold leading-none">
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-1.5 py-0.5 text-indigo-950">
                      خطوة {formatEasternNumber(idx + 1)}
                    </span>
                    {idx > 0 && (
                      <span className="rounded-full border border-amber-300 bg-amber-100 px-1.5 py-0.5 text-amber-950">
                        {toEasternArabicNumerals(step.stepDeltaLabelAr)}
                      </span>
                    )}
                  </div>

                  {/* Visual Model + Numeral Trace + Digit Box */}
                  <div className="flex w-full flex-wrap items-center justify-center gap-1">
                    <VisualModelView
                      model={step.visualModel}
                      solved={isAnswerKey}
                    />

                    <div className="flex shrink-0 items-center gap-1">
                      {step.isMissing ? (
                        <AnswerSlot
                          solved={isAnswerKey}
                          answer={step.valueAr}
                          ariaLabel="مربع العدد المفقود في التسلسل"
                          tone="amber"
                          solvedDataAttributes={{
                            "data-solved-missing-number": step.valueAr,
                          }}
                        />
                      ) : (
                        <span
                          className={`inline-flex ${ANSWER_SLOT_SIZE_CLASS} shrink-0 items-center justify-center rounded-2xl border-2 border-indigo-500 bg-indigo-50 text-[28px] font-black leading-none text-indigo-950`}
                          {...(isAnswerKey
                            ? { "data-solved-sequence-step": step.valueAr }
                            : {})}
                        >
                          {step.valueAr}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </ExerciseColumns>
        {data.steps.slice(4).map((step, idx) => {
          const isSolvedStep = isAnswerKey && step.isMissing;
          return (
            <span
              key={step.id}
              className="hidden"
              data-sequence-step={formatEasternNumber(idx + 5)}
              data-step-value={step.valueAr}
              data-step-missing={step.isMissing ? "true" : "false"}
              {...(isSolvedStep
                ? {
                    "data-solved-sequence-step": step.valueAr,
                    "data-solved-missing-number": step.valueAr,
                  }
                : {})}
            />
          );
        })}
      </div>

      {/* Dedicated Zero Tracing Highlight Card when in zero-take-away mode */}
      {data.zeroTraceModel && (
        <span
          className="hidden"
          data-zero-trace-card="true"
          data-visual-model="numeral-trace"
          data-digit="٠"
          data-start-dot="true"
          data-direction-arrow="true"
          data-trace-stroke={isAnswerKey ? "solid" : "dotted"}
          {...(isAnswerKey ? { "data-solved-trace": "٠" } : {})}
        />
      )}

      {/* Reasoning Prompt (١ أكثر / ١ أقل / معنى الصفر) */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-2.5 py-1 text-[13px] font-bold leading-tight text-amber-950">
        <span>
          🤔 سؤال التفكير العددي:{" "}
          {toEasternArabicNumerals(data.reasoningPromptAr)}
        </span>
        <AnswerLine
          solved={isAnswerKey}
          answer={toEasternArabicNumerals(data.reasoningAnswerAr)}
          ariaLabel="سطر كتابة إجابة سؤال التفكير العددي"
          solvedDataAttributes={{ "data-solved-reasoning-answer": "true" }}
        />
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
