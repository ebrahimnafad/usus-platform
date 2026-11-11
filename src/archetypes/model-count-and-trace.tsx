import React from "react";
import { registerExerciseArchetype } from "@/archetypes/registry";
import type {
  ColorThemeId,
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import { VisualModelView } from "@/visual-models/registry";
import {
  createCircularArrangementSpec,
  createDicePatternSpec,
  createFiveFrameSpec,
  createNumeralTraceSpec,
  createSnapCubesSpec,
  createTallyMarksSpec,
  createTenFrameSpec,
  getArabicNumberWord,
} from "@/visual-models/unit-2-models";
import {
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { AnswerLine, AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";

export type Unit2ModelingKind =
  | "five-frame"
  | "ten-frame"
  | "snap-cubes"
  | "tally-marks"
  | "dice-pattern"
  | "circular-arrangement";

export type ModelCountAndTraceResponseStyle =
  "trace-and-write" | "quantify-compare-choice";

export interface ModelCountAndTraceItemSpec {
  targetNumber: number;
  quantityModel?: VisualModelSpec;
  companionModel?: VisualModelSpec;
  partWholeNoteAr?: string;
  colorTheme?: ColorThemeId;
  secondaryCount?: number;
  ghostTargetCount?: number;
  topRowCount?: number;
  bottomRowCount?: number;
  choiceNumbers?: number[];
}

export interface ModelCountAndTraceBlueprintParams {
  modelKind?: Unit2ModelingKind;
  responseStyle?: ModelCountAndTraceResponseStyle;
  targetNumbers?: number[];
  itemCount?: number;
  items?: ModelCountAndTraceItemSpec[];
  showPartWholeBreakdown?: boolean;
  comparisonPromptAr?: string;
  comparisonAnswerAr?: string;
}

export interface ModelCountAndTraceItem {
  id: string;
  targetNumber: number;
  targetNumberAr: string;
  numberWordAr: string;
  partWholeNoteAr: string;
  quantityModel: VisualModelSpec;
  companionModel?: VisualModelSpec;
  traceModel: VisualModelSpec;
  choiceNumbersAr?: string[];
}

export interface ModelCountAndTraceData extends GenericArchetypeData {
  kind: "ModelCountAndTrace";
  modelKind: Unit2ModelingKind;
  responseStyle: ModelCountAndTraceResponseStyle;
  items: ModelCountAndTraceItem[];
  comparisonPromptAr?: string;
  comparisonAnswerAr?: string;
}

const COLOR_CYCLE: ColorThemeId[] = [
  "coral",
  "sky",
  "emerald",
  "amber",
  "violet",
  "rose",
  "teal",
];

function defaultPartWholeNote(n: number): string {
  if (n <= 1) return "مجموعة من عنصر واحد (١)";
  if (n === 2) return "١ و١ يساوي ٢";
  if (n === 3) return "٢ و١ أكثر يساوي ٣";
  if (n === 4) return "مجموعتان من ٢ (٢ و٢ يساوي ٤)";
  if (n === 5) return "٤ و١ يساوي ٥ (حزمة خماسية كاملة)";
  if (n > 5 && n <= 10) {
    const extra = n - 5;
    return `٥ و${formatEasternNumber(extra)} يساوي ${formatEasternNumber(n)}`;
  }
  return `الكلّ يساوي ${formatEasternNumber(n)}`;
}

function buildDefaultQuantityModel(
  modelKind: Unit2ModelingKind,
  targetNumber: number,
  colorTheme: ColorThemeId,
  secondaryCount = 0,
  ghostTargetCount = 0,
  topRowCount?: number,
  bottomRowCount?: number
): VisualModelSpec {
  const primary = Math.max(0, targetNumber - secondaryCount - ghostTargetCount);
  if (modelKind === "ten-frame") {
    return createTenFrameSpec({
      count: primary,
      secondaryCount,
      ghostTargetCount,
      topRowCount,
      bottomRowCount,
      colorTheme,
      secondaryColorTheme: colorTheme === "sky" ? "amber" : "sky",
      highlightEmptySlots: true,
      showPartOutline: secondaryCount > 0 || topRowCount !== undefined,
    });
  }

  if (modelKind === "five-frame") {
    return createFiveFrameSpec({
      count: primary,
      secondaryCount,
      ghostTargetCount,
      colorTheme,
      secondaryColorTheme: colorTheme === "sky" ? "amber" : "sky",
      highlightEmptySlots: true,
      showPartOutline: secondaryCount > 0,
    });
  }

  if (modelKind === "snap-cubes") {
    return createSnapCubesSpec({
      count: Math.max(1, primary),
      secondaryCount,
      separated: secondaryCount > 0,
      compact: targetNumber > 5,
      colorTheme,
      secondaryColorTheme: colorTheme === "emerald" ? "amber" : "emerald",
    });
  }

  if (modelKind === "tally-marks") {
    return createTallyMarksSpec({
      count: targetNumber,
      variant: "tally",
      compact: targetNumber > 5,
      colorTheme,
    });
  }

  if (modelKind === "dice-pattern") {
    return createDicePatternSpec({
      count: primary,
      secondaryCount,
      colorTheme,
      secondaryColorTheme: colorTheme === "coral" ? "sky" : "coral",
    });
  }

  if (modelKind === "circular-arrangement") {
    return createCircularArrangementSpec({
      count: Math.max(1, primary),
      secondaryCount,
      colorTheme,
      secondaryColorTheme: colorTheme === "violet" ? "amber" : "violet",
    });
  }

  return {
    kind: modelKind,
    id: `${modelKind}-${targetNumber}`,
    labelAr: `نموذج العدد ${formatEasternNumber(targetNumber)}`,
    count: primary,
    secondaryCount,
    colorTheme,
  };
}

function buildChoiceNumbers(targetNumber: number): number[] {
  const low = Math.max(1, targetNumber - 1);
  const high = Math.min(10, targetNumber + 1);
  if (targetNumber === 10) return [8, 9, 10];
  if (targetNumber <= 1) return [1, 2, 3];
  return [low, targetNumber, high];
}

function generateModelCountAndTraceExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as ModelCountAndTraceBlueprintParams;
  const modelKind: Unit2ModelingKind = params.modelKind ?? "five-frame";
  const responseStyle: ModelCountAndTraceResponseStyle =
    params.responseStyle ?? "trace-and-write";
  const isFrameModel = modelKind === "five-frame" || modelKind === "ten-frame";

  const defaultItemCount =
    ctx.difficultyLevel === "Easy"
      ? 2
      : ctx.difficultyLevel === "Intermediate"
        ? 2
        : 2;

  let itemSpecs: ModelCountAndTraceItemSpec[] = [];

  if (params.items && params.items.length > 0) {
    const requested =
      params.itemCount ?? Math.min(params.items.length, defaultItemCount);
    const countToPick = isFrameModel ? Math.min(2, requested) : requested;
    if (isFrameModel && params.items.length > countToPick) {
      const zeroItem = params.items.find((it) => it.targetNumber === 0);
      const rest = params.items.filter((it) => it !== zeroItem);
      itemSpecs = zeroItem
        ? [zeroItem, ...ctx.rng.pickN(rest, countToPick - 1)]
        : ctx.rng.pickN(params.items, countToPick);
    } else {
      itemSpecs = ctx.rng.pickN(params.items, countToPick);
    }
  } else {
    const candidateNumbers =
      params.targetNumbers && params.targetNumbers.length > 0
        ? params.targetNumbers
        : modelKind === "ten-frame"
          ? ctx.difficultyLevel === "Easy"
            ? [6, 7, 8]
            : [6, 7, 8, 9, 10]
          : ctx.difficultyLevel === "Easy"
            ? [1, 2, 3]
            : ctx.difficultyLevel === "Intermediate"
              ? [2, 3, 4, 5]
              : [3, 4, 5];

    const requested = params.itemCount ?? defaultItemCount;
    const countToPick = isFrameModel ? Math.min(2, requested) : requested;
    const pickedNumbers = ctx.rng.pickN(candidateNumbers, countToPick);

    itemSpecs = pickedNumbers.map((num, idx) => {
      const theme = COLOR_CYCLE[(idx + num) % COLOR_CYCLE.length];
      const useParts =
        (params.showPartWholeBreakdown || ctx.difficultyLevel !== "Easy") &&
        num >= 3;
      const secondaryCount = useParts
        ? num > 5
          ? num - 5
          : num === 5
            ? 1
            : num === 4
              ? 2
              : 1
        : 0;
      return {
        targetNumber: num,
        colorTheme: theme,
        secondaryCount,
        partWholeNoteAr: defaultPartWholeNote(num),
      };
    });
  }

  const items: ModelCountAndTraceItem[] = itemSpecs.map((spec, idx) => {
    const num = spec.targetNumber;
    const theme =
      spec.colorTheme ?? COLOR_CYCLE[(idx + num) % COLOR_CYCLE.length];
    const quantityModel =
      spec.quantityModel ??
      buildDefaultQuantityModel(
        modelKind,
        num,
        theme,
        spec.secondaryCount ?? 0,
        spec.ghostTargetCount ?? 0,
        spec.topRowCount,
        spec.bottomRowCount
      );

    const traceModel = createNumeralTraceSpec({
      digit: num,
      colorTheme: theme,
    });

    const rawChoices =
      responseStyle === "quantify-compare-choice"
        ? (spec.choiceNumbers ?? buildChoiceNumbers(num))
        : undefined;

    return {
      id: `mct-item-${idx + 1}-n${num}`,
      targetNumber: num,
      targetNumberAr: formatEasternNumber(num),
      numberWordAr: getArabicNumberWord(num),
      partWholeNoteAr: spec.partWholeNoteAr ?? defaultPartWholeNote(num),
      quantityModel,
      companionModel: spec.companionModel,
      traceModel,
      ...(rawChoices
        ? { choiceNumbersAr: rawChoices.map((c) => formatEasternNumber(c)) }
        : {}),
    };
  });

  const visualModels: VisualModelSpec[] = [];
  for (const item of items) {
    if (item.companionModel) {
      visualModels.push(item.companionModel);
    }
    visualModels.push(item.quantityModel);
    visualModels.push(item.traceModel);
  }

  const numbersListAr = items.map((i) => i.targetNumberAr).join("، ");
  const defaultPromptAr =
    ctx.difficultyLevel === "Easy"
      ? `عدّ الصور ومثّل العدد، ثم تتبّع الرقم المنقّط بدءاً من النقطة الخضراء باتجاه السهم (${numbersListAr}):`
      : ctx.difficultyLevel === "Intermediate"
        ? `عدّ المجموعات ولاحظ الأجزاء التي تكوّن الكل، ثم تتبّع الأرقام واكتبها (${numbersListAr}):`
        : `مثّل الأعداد (${numbersListAr}) بالاعتماد على الأجزاء والكل، وتتبّع كل رقم واكتبه في المربع المخصّص:`;

  const defaultStrategyHintAr =
    ctx.difficultyLevel === "Easy"
      ? `استخدم التقابل واحداً لواحد عند العدّ؛ تذكّر أن آخر عدد تنطقه يمثّل المجموعة كلها، ثم ابدأ تتبّع الرقم من نقطة البداية الخضراء.`
      : ctx.difficultyLevel === "Intermediate"
        ? `لاحظ كيف تتجمّع الأجزاء الصغيرة لتكوّن الكلّ (${numbersListAr})، وتتبّع مسار السهم لكتابة الرقم العربي الشرقي بدقة على السطر.`
        : `اعتمد على التعرّف البصري للأجزاء والكل لتحديد الكمية بسرعة، ثم تتبّع الرقم المنقّط واكتبه بخط واضح ومرتّب.`;

  const data: ModelCountAndTraceData = {
    kind: "ModelCountAndTrace",
    modelKind,
    responseStyle,
    items,
    comparisonPromptAr: params.comparisonPromptAr,
    comparisonAnswerAr: params.comparisonAnswerAr,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "ModelCountAndTrace",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "عدّ ومثّل وتتبّع الرقم",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function renderModelCountAndTraceExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as ModelCountAndTraceData;
  const isAnswerKey = mode === "answer-key";

  return (
    <div className="space-y-1" data-archetype="ModelCountAndTrace">
      <ExerciseColumns columns={2}>
        {data.items.map((item, idx) => (
          <div
            key={item.id}
            className="flex flex-col justify-between gap-1 rounded-xl border border-indigo-100 bg-gradient-to-l from-white via-indigo-50/20 to-sky-50/30 px-2 py-1 shadow-2xs"
            data-mct-item-id={toEasternArabicNumerals(item.id)}
            data-target-number={item.targetNumberAr}
          >
            {/* Top Header: Index, Target Number, Part-Whole Badge */}
            <div className="flex flex-wrap items-center justify-between gap-1">
              <div className="flex items-center gap-1">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold leading-none text-white">
                  {formatEasternNumber(idx + 1)}
                </span>
                <span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs font-extrabold leading-tight text-indigo-950">
                  العدد: {item.targetNumberAr} ({item.numberWordAr})
                </span>
              </div>
              <span className="rounded-full border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-xs font-bold leading-tight text-amber-900">
                🧩 {toEasternArabicNumerals(item.partWholeNoteAr)}
              </span>
            </div>

            {/*Visual Model(s)*/}
            <div className="flex items-center justify-between gap-1">
              {item.companionModel && (
                <span
                  className="hidden"
                  data-visual-model={item.companionModel.kind}
                  data-count={item.targetNumberAr}
                />
              )}
              <VisualModelView
                model={item.quantityModel}
                solved={isAnswerKey}
              />

              <div className="flex shrink-0 items-center gap-1">
                {item.quantityModel.kind !== "five-frame" &&
                  item.quantityModel.kind !== "ten-frame" &&
                  data.responseStyle !== "quantify-compare-choice" && (
                    <VisualModelView
                      model={item.traceModel}
                      solved={isAnswerKey}
                    />
                  )}
                <div className="flex flex-col items-center gap-0.5">
                  {data.responseStyle === "quantify-compare-choice" &&
                    item.choiceNumbersAr && (
                      <div
                        className="flex items-center gap-0.5"
                        data-quantify-choices="true"
                      >
                        {item.choiceNumbersAr.map((choiceAr) => {
                          const isTarget = choiceAr === item.targetNumberAr;
                          const isSelected = isAnswerKey && isTarget;
                          return (
                            <span
                              key={choiceAr}
                              className={`inline-flex h-5 items-center justify-center rounded-md border px-1 text-xs font-extrabold leading-none ${
                                isSelected
                                  ? "border-emerald-600 bg-emerald-600 text-white"
                                  : "border-dashed border-indigo-300 bg-white text-indigo-900"
                              }`}
                              data-quantify-choice={choiceAr}
                              {...(isSelected
                                ? { "data-solved-quantify-choice": choiceAr }
                                : {})}
                            >
                              {choiceAr}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  <AnswerSlot
                    solved={isAnswerKey}
                    answer={item.targetNumberAr}
                    ariaLabel="مربع كتابة العدد"
                    kind="write"
                    tone="indigo"
                    solvedDataAttributes={{
                      "data-solved-model-count": item.targetNumberAr,
                      "data-solved-written-digit": item.targetNumberAr,
                      ...(item.quantityModel.kind === "five-frame" ||
                      item.quantityModel.kind === "ten-frame"
                        ? { "data-solved-trace": item.targetNumberAr }
                        : {}),
                    }}
                  />
                  {(item.quantityModel.kind === "five-frame" ||
                    item.quantityModel.kind === "ten-frame") && (
                    <span
                      className="hidden"
                      data-visual-model="numeral-trace"
                      data-digit={item.targetNumberAr}
                      data-start-dot="true"
                      data-direction-arrow="true"
                      data-trace-stroke={isAnswerKey ? "solid" : "dotted"}
                      {...(isAnswerKey
                        ? { "data-solved-trace": item.targetNumberAr }
                        : {})}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </ExerciseColumns>

      {/* Optional Pedagogical Reasoning Sub-Prompt */}
      {data.comparisonPromptAr && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-3 py-1 text-[13px] font-bold text-amber-950">
          <span>
            🤔 سؤال التفكير: {toEasternArabicNumerals(data.comparisonPromptAr)}
          </span>
          <AnswerLine
            solved={isAnswerKey && Boolean(data.comparisonAnswerAr)}
            answer={toEasternArabicNumerals(data.comparisonAnswerAr ?? "")}
            ariaLabel="سطر كتابة إجابة سؤال التفكير"
          />
        </div>
      )}
    </div>
  );
}

export const modelCountAndTraceArchetype = {
  id: "ModelCountAndTrace" as const,
  displayNameAr: "عدّ ومثّل وتتبّع الرقم",
  generate: generateModelCountAndTraceExercise,
  render: renderModelCountAndTraceExercise,
};

registerExerciseArchetype(modelCountAndTraceArchetype);
