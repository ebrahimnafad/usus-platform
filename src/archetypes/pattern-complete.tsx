import React from "react";
import { registerExerciseArchetype } from "@/archetypes/registry";
import type {
  ColorThemeId,
  EverydayObjectId,
  Exercise,
  GenericArchetypeData,
  Shape2DId,
  Solid3DId,
  VisualModelSpec,
} from "@/domain/types";
import {
  EVERYDAY_OBJECT_CATALOG,
  createEverydayObjectSpec,
  getEverydayObjectById,
} from "@/visual-models/everyday-objects";
import {
  SHAPE_2D_CATALOG,
  SOLID_3D_CATALOG,
  createShape2DSpec,
  createSolid3DSpec,
  getShape2DById,
  getSolid3DById,
} from "@/visual-models/shapes-solids-coins";
import { VisualModelView } from "@/visual-models/registry";
import {
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { AnswerLine, AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";

export type PatternUnitRule = "AB" | "ABC";
export type PatternDirection = "forward" | "backward";
export type PatternDomainMode =
  "everyday-objects" | "shapes-2d" | "solids-3d" | "mixed";

export interface PatternCompleteBlueprintParams {
  unitRule?: PatternUnitRule;
  direction?: PatternDirection;
  sequenceLength?: number;
  domainMode?: PatternDomainMode;
  candidateObjectIds?: EverydayObjectId[];
  candidateShapeIds?: Shape2DId[];
  candidateSolidIds?: Solid3DId[];
  choiceCount?: number;
  attributePromptAr?: string;
  attributeAnswerAr?: string;
}

export interface PatternSlot {
  slotIndex: number;
  positionNumber: number;
  roleLabelAr: string;
  isMissing: boolean;
  item: VisualModelSpec;
}

export interface PatternChoice {
  id: string;
  item: VisualModelSpec;
  isCorrect: boolean;
}

export interface PatternCompleteData extends GenericArchetypeData {
  kind: "PatternComplete";
  unitRule: PatternUnitRule;
  direction: PatternDirection;
  domainMode: PatternDomainMode;
  unitLength: 2 | 3;
  sequenceLength: number;
  missingIndex: number;
  unitItems: VisualModelSpec[];
  slots: PatternSlot[];
  missingItem: VisualModelSpec;
  choices: PatternChoice[];
  correctChoiceId: string;
  attributePromptAr: string;
  attributeAnswerAr: string;
}

const ROLE_LABELS_AR = ["أ", "ب", "ج"] as const;

const DISTINCT_COLOR_THEMES: ColorThemeId[] = [
  "coral",
  "sky",
  "amber",
  "emerald",
  "violet",
  "rose",
  "teal",
  "indigo",
];

function buildCandidatePool(
  params: PatternCompleteBlueprintParams
): VisualModelSpec[] {
  const domainMode: PatternDomainMode = params.domainMode ?? "everyday-objects";

  const objectIds =
    params.candidateObjectIds && params.candidateObjectIds.length > 0
      ? params.candidateObjectIds
      : EVERYDAY_OBJECT_CATALOG.map((o) => o.id);
  const objectSpecs = objectIds.map((id) =>
    createEverydayObjectSpec(getEverydayObjectById(id), { size: "large" })
  );

  const shapeIds =
    params.candidateShapeIds && params.candidateShapeIds.length > 0
      ? params.candidateShapeIds
      : SHAPE_2D_CATALOG.map((s) => s.id);
  const shapeSpecs = shapeIds.map((id, idx) => {
    const def = getShape2DById(id);
    return createShape2DSpec(def.id, {
      colorTheme:
        def.defaultColorTheme ??
        DISTINCT_COLOR_THEMES[idx % DISTINCT_COLOR_THEMES.length],
      size: "large",
    });
  });

  const solidIds =
    params.candidateSolidIds && params.candidateSolidIds.length > 0
      ? params.candidateSolidIds
      : SOLID_3D_CATALOG.map((s) => s.id);
  const solidSpecs = solidIds.map((id, idx) => {
    const def = getSolid3DById(id);
    return createSolid3DSpec(def.id, {
      colorTheme:
        def.defaultColorTheme ??
        DISTINCT_COLOR_THEMES[idx % DISTINCT_COLOR_THEMES.length],
      size: "large",
    });
  });

  if (domainMode === "shapes-2d") {
    return shapeSpecs;
  }
  if (domainMode === "solids-3d") {
    return solidSpecs;
  }
  if (domainMode === "mixed") {
    return [...shapeSpecs, ...solidSpecs, ...objectSpecs.slice(0, 6)];
  }
  return objectSpecs;
}

function buildFullDomainDistractorPool(
  domainMode: PatternDomainMode
): VisualModelSpec[] {
  if (domainMode === "shapes-2d") {
    return SHAPE_2D_CATALOG.map((s) =>
      createShape2DSpec(s.id, { size: "medium" })
    );
  }
  if (domainMode === "solids-3d") {
    return SOLID_3D_CATALOG.map((s) =>
      createSolid3DSpec(s.id, { size: "medium" })
    );
  }
  if (domainMode === "mixed") {
    return [
      ...SHAPE_2D_CATALOG.map((s) =>
        createShape2DSpec(s.id, { size: "medium" })
      ),
      ...SOLID_3D_CATALOG.map((s) =>
        createSolid3DSpec(s.id, { size: "medium" })
      ),
    ];
  }
  return EVERYDAY_OBJECT_CATALOG.map((o) =>
    createEverydayObjectSpec(o, { size: "medium" })
  );
}

function buildDefaultAttributeReasoning(
  domainMode: PatternDomainMode,
  direction: PatternDirection,
  unitRule: PatternUnitRule,
  unitItems: VisualModelSpec[],
  missingItem: VisualModelSpec
): { promptAr: string; answerAr: string } {
  if (direction === "backward") {
    const reverseUnitStr = [...unitItems]
      .reverse()
      .map((item) => item.labelAr)
      .join(" ← ");
    return {
      promptAr: `كيف نعرف العنصر الأول المفقود في بداية النمط عندما نبدأ من النهاية ونرجع للخلف؟`,
      answerAr: `نبدأ من آخر عنصر في اليسار ونرجع خطوة بخطوة (${reverseUnitStr}) فنجد أن العنصر الأول في البداية هو «${missingItem.labelAr}»`,
    };
  }

  if (domainMode === "shapes-2d") {
    return {
      promptAr: `كم ضلعاً وكم زاوية للمثلث؟ وكم ضلعاً وكم زاوية للمربع؟`,
      answerAr: `للمثلث ٣ أضلاع و٣ زوايا، وللمربع ٤ أضلاع متساوية و٤ زوايا`,
    };
  }

  if (domainMode === "solids-3d") {
    return {
      promptAr: `كم وجهاً مسطّحاً وكم رأساً للمكعب؟ وكم وجهاً مسطّحاً ورأساً للكرة والمخروط؟`,
      answerAr: `للمكعب ٦ أوجه مسطّحة و٨ رؤوس، وللكرة ٠ أوجه مسطّحة و٠ رؤوس، وللمخروط وجه مسطّح دائري ١ ورأس مدبّب ١`,
    };
  }

  const unitLabel = unitItems.map((u) => u.labelAr).join("، ");
  return {
    promptAr:
      unitRule === "AB"
        ? `ما العنصران اللذان يتكرران في وحدة النمط الثنائي؟ وما العنصر الأخير المفقود؟`
        : `ما العناصر الثلاثة التي تتكرر في وحدة النمط الثلاثي؟ وما العنصر الأخير المفقود؟`,
    answerAr: `وحدة النمط المتكررة هي (${unitLabel})، والعنصر المفقود هو «${missingItem.labelAr}»`,
  };
}

function generatePatternCompleteExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as PatternCompleteBlueprintParams;

  const unitRule: PatternUnitRule = params.unitRule ?? "AB";
  const unitLength: 2 | 3 = unitRule === "ABC" ? 3 : 2;
  const direction: PatternDirection = params.direction ?? "forward";
  const domainMode: PatternDomainMode = params.domainMode ?? "everyday-objects";
  const sequenceLength = params.sequenceLength ?? 6;

  // In forward mode (K-9, K-10), the last slot is missing.
  // In backward mode (K-11), the first/starting slot is missing.
  const missingIndex = direction === "backward" ? 0 : sequenceLength - 1;

  const candidatePool = buildCandidatePool(params);
  const fullPool = buildFullDomainDistractorPool(domainMode);

  const unitPool =
    candidatePool.length >= unitLength ? candidatePool : fullPool;
  const unitItems = ctx.rng
    .pickN(unitPool, unitLength)
    .map((item) => ({ ...item }));

  const slots: PatternSlot[] = Array.from(
    { length: sequenceLength },
    (_, slotIndex) => {
      const unitPos = slotIndex % unitLength;
      const item = { ...unitItems[unitPos] };
      return {
        slotIndex,
        positionNumber: slotIndex + 1,
        roleLabelAr: ROLE_LABELS_AR[unitPos] ?? "أ",
        isMissing: slotIndex === missingIndex,
        item,
      };
    }
  );

  const missingItem = { ...slots[missingIndex].item };

  // Build choice bank: correct missing item + distinct distractors
  const defaultChoiceCount = ctx.difficultyLevel === "Advanced" ? 4 : 3;
  const choiceCount = Math.max(2, params.choiceCount ?? defaultChoiceCount);

  // Include the other unit items first as natural distractors, then pull from fullPool
  const otherUnitItems = unitItems.filter((u) => u.id !== missingItem.id);
  const externalDistractors = fullPool.filter(
    (item) => !unitItems.some((u) => u.id === item.id)
  );
  const pickedExternal = ctx.rng.pickN(
    externalDistractors,
    Math.max(0, choiceCount - 1 - otherUnitItems.length)
  );

  const distractorModels = [...otherUnitItems, ...pickedExternal].slice(
    0,
    choiceCount - 1
  );

  const rawChoices: PatternChoice[] = [
    {
      id: `choice-correct-${missingItem.id}`,
      item: { ...missingItem },
      isCorrect: true,
    },
    ...distractorModels.map((d, idx) => ({
      id: `choice-dist-${idx + 1}-${d.id}`,
      item: { ...d },
      isCorrect: false,
    })),
  ];

  const choices = ctx.rng.shuffle(rawChoices);
  const correctChoiceId =
    choices.find((c) => c.isCorrect)?.id ?? rawChoices[0].id;

  const unitNamesAr = unitItems.map((u) => u.labelAr).join(" ← ");
  const reverseUnitNamesAr = [...unitItems]
    .reverse()
    .map((u) => u.labelAr)
    .join(" ← ");

  const defaultReasoning = buildDefaultAttributeReasoning(
    domainMode,
    direction,
    unitRule,
    unitItems,
    missingItem
  );

  const defaultPromptAr =
    direction === "backward"
      ? `العنصر الأول في بداية النمط مفقود! ابدأ من نهاية النمط وارجع للخلف خطوة بخطوة لتحدّد الشكل الأول المفقود وتحوّطه:`
      : unitRule === "AB"
        ? `تتبّع النمط الثنائي (أ، ب، أ، ب، أ، ب) من اليمين إلى اليسار، ثم حوّط العنصر الأخير المفقود لإكمال النمط:`
        : `تتبّع النمط الثلاثي (أ، ب، ج، أ، ب، ج) من اليمين إلى اليسار، ثم حوّط العنصر الأخير المفقود لإكمال النمط:`;

  const defaultStrategyHintAr =
    direction === "backward"
      ? `عندما تكون بداية النمط غير معروفة، ابدأ من النهاية (يسار الشريط) وارجع للخلف نحو اليمين (${reverseUnitNamesAr}) لتكتشف أن العنصر الأول المفقود هو «${missingItem.labelAr}».`
      : unitRule === "AB"
        ? `اقرأ النمط من اليمين إلى اليسار (${unitNamesAr}) ولاحظ تكرار العنصرين بالتناوب (أ، ب، أ، ب، أ، ب)؛ إذن العنصر السادس والأخير هو «${missingItem.labelAr}».`
        : `اقرأ النمط من اليمين إلى اليسار (${unitNamesAr}) وحدّد الثلاثية المتكررة (أ، ب، ج، أ، ب، ج)؛ إذن العنصر السادس والأخير هو «${missingItem.labelAr}».`;

  const data: PatternCompleteData = {
    kind: "PatternComplete",
    unitRule,
    direction,
    domainMode,
    unitLength,
    sequenceLength,
    missingIndex,
    unitItems,
    slots,
    missingItem,
    choices,
    correctChoiceId,
    attributePromptAr: params.attributePromptAr ?? defaultReasoning.promptAr,
    attributeAnswerAr: params.attributeAnswerAr ?? defaultReasoning.answerAr,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "PatternComplete",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr:
      direction === "backward"
        ? "أكمل النمط بالرجوع للخلف"
        : unitRule === "ABC"
          ? "أكمل النمط الثلاثي للأمام"
          : "أكمل النمط الثنائي للأمام",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels: slots.map((s) => s.item),
    data,
  };
}

function renderPatternCompleteExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as PatternCompleteData;
  const isAnswerKey = mode === "answer-key";
  const ruleBadgeAr =
    data.unitRule === "ABC" ? "نمط ثلاثي: أ - ب - ج" : "نمط ثنائي: أ - ب";

  return (
    <div
      className="space-y-1.5"
      data-archetype="PatternComplete"
      data-pattern-rule={data.unitRule}
      data-pattern-direction={data.direction}
    >
      {/* RTL Pattern Strip Container + Choice Bank */}
      <ExerciseColumns columns={1}>
        <div className="rounded-xl border-2 border-indigo-100 bg-gradient-to-b from-white to-indigo-50/40 p-1.5">
          {/* RTL Strip of Slots (Slot 1 on right -> Slot N on left) */}
          <div
            className="grid grid-cols-6 gap-1"
            data-pattern-strip="rtl"
            dir="rtl"
          >
            {data.slots.map((slot) => {
              const posAr = formatEasternNumber(slot.positionNumber);

              if (slot.isMissing) {
                return (
                  <div
                    key={slot.slotIndex}
                    className={`relative flex flex-col items-center justify-between gap-0.5 rounded-xl border-2 p-1 transition ${
                      isAnswerKey
                        ? "border-emerald-500 bg-emerald-50/90 shadow-xs"
                        : "border-dashed border-amber-500 bg-amber-50/70"
                    }`}
                    data-pattern-slot={posAr}
                    data-slot-missing="true"
                    {...(isAnswerKey
                      ? {
                          "data-solved-missing-slot": toEasternArabicNumerals(
                            slot.item.id
                          ),
                        }
                      : {})}
                  >
                    <div className="flex w-full items-center justify-between text-xs font-extrabold">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white">
                        {posAr}
                      </span>
                      <span className="rounded-md bg-amber-200/80 px-1 py-0.5 text-amber-950">
                        {slot.roleLabelAr}
                      </span>
                    </div>

                    {isAnswerKey ? (
                      <div
                        className="flex flex-1 flex-col items-center justify-center py-1 [&>div]:flex-col [&>div]:justify-center [&>div]:gap-1 [&>div]:text-center"
                        data-pattern-slot-body="centered"
                      >
                        <VisualModelView model={slot.item} solved={true} />
                      </div>
                    ) : (
                      <div
                        className="flex flex-1 flex-col items-center justify-center gap-0.5"
                        data-pattern-slot-body="centered"
                      >
                        <AnswerSlot
                          solved={false}
                          ariaLabel="الخانة المفقودة في النمط"
                          kind="unknown"
                          tone="amber"
                          className="shadow-2xs"
                        />
                        <span className="text-center text-xs font-extrabold leading-tight text-amber-900">
                          {data.direction === "backward"
                            ? "البداية المفقودة"
                            : "النهاية المفقودة"}
                        </span>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div
                  key={slot.slotIndex}
                  className="relative flex flex-col items-center justify-between gap-0.5 rounded-xl border-2 border-slate-200 bg-white p-1 shadow-2xs"
                  data-pattern-slot={posAr}
                  data-slot-missing="false"
                >
                  <div className="flex w-full items-center justify-between text-xs font-extrabold">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                      {posAr}
                    </span>
                    <span className="rounded-md bg-indigo-50 px-1 py-0.5 text-indigo-900">
                      {slot.roleLabelAr}
                    </span>
                  </div>

                  <div
                    className="flex flex-1 flex-col items-center justify-center py-1 [&>div]:flex-col [&>div]:justify-center [&>div]:gap-1 [&>div]:text-center"
                    data-pattern-slot-body="centered"
                  >
                    <VisualModelView model={slot.item} solved={isAnswerKey} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Choice Bank inline */}
          <div className="mt-1 flex flex-wrap items-center justify-between gap-1 border-t border-indigo-100 pt-1">
            <span className="text-xs font-extrabold leading-tight text-sky-950">
              🎯 {ruleBadgeAr} • اختر العنصر المفقود (
              {formatEasternNumber(data.choices.length)}):
            </span>

            <div className="flex flex-wrap items-center gap-1">
              {data.choices.map((choice, idx) => {
                const isSolvedCorrect = isAnswerKey && choice.isCorrect;
                return (
                  <div
                    key={choice.id}
                    className={`flex items-center gap-1 rounded-xl border-2 px-1 py-0.5 transition ${
                      isSolvedCorrect
                        ? "border-emerald-600 bg-emerald-50/90 shadow-xs"
                        : "border-dashed border-slate-300 bg-white"
                    }`}
                    data-pattern-choice-id={toEasternArabicNumerals(choice.id)}
                    {...(isSolvedCorrect
                      ? { "data-solved-choice": "true" }
                      : {})}
                  >
                    <span className="text-xs font-bold text-slate-500">
                      {formatEasternNumber(idx + 1)}
                    </span>
                    <VisualModelView model={choice.item} solved={isAnswerKey} />
                    {isSolvedCorrect && (
                      <span className="rounded-full bg-emerald-600 px-1 py-0.5 text-xs font-extrabold leading-none text-white">
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ExerciseColumns>

      {/* Attribute & Reasoning Prompt */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-2.5 py-1 text-[13px] font-bold leading-tight text-amber-950">
        <span>
          🤔 سؤال التفكير والخصائص:{" "}
          {toEasternArabicNumerals(data.attributePromptAr)}
        </span>
        <AnswerLine
          solved={isAnswerKey}
          answer={toEasternArabicNumerals(data.attributeAnswerAr)}
          ariaLabel="سطر كتابة إجابة سؤال الخصائص"
          solvedDataAttributes={{ "data-solved-attribute-answer": "true" }}
        />
      </div>
    </div>
  );
}

export const patternCompleteArchetype = {
  id: "PatternComplete" as const,
  displayNameAr: "أكمل النمط",
  generate: generatePatternCompleteExercise,
  render: renderPatternCompleteExercise,
};

registerExerciseArchetype(patternCompleteArchetype);
