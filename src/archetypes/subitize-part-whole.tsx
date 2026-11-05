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
} from "@/visual-models/shapes-solids-coins";
import {
  createDicePatternSpec,
  createFiveFrameSpec,
  getArabicNumberWord,
} from "@/visual-models/unit-2-models";
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

export type SubitizeMode = "identify-quantity" | "both-parts-to-5";

export type SubitizeVisualKind =
  "five-frame" | "five-frame-and-dice" | "five-frame-and-shapes";

export interface SubitizeCardInput {
  filledCount: number;
  secondaryFilledCount?: number;
  colorTheme?: ColorThemeId;
  secondaryColorTheme?: ColorThemeId;
  quickStrategyAr?: string;
  shapeId?: Shape2DId;
  solidId?: Solid3DId;
}

export interface SubitizePartWholeBlueprintParams {
  subitizeMode?: SubitizeMode;
  visualKind?: SubitizeVisualKind;
  candidateCounts?: number[];
  cardCount?: number;
  cards?: SubitizeCardInput[];
  reasoningPromptAr?: string;
  reasoningAnswerAr?: string;
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
}

export interface SubitizePartWholeData extends GenericArchetypeData {
  kind: "SubitizePartWhole";
  subitizeMode: SubitizeMode;
  visualKind: SubitizeVisualKind;
  cards: SubitizeCardItem[];
  reasoningPromptAr: string;
  reasoningAnswerAr: string;
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

function buildDefaultQuickStrategyAr(
  filledCount: number,
  missingCount: number,
  subitizeMode: SubitizeMode
): string {
  const filledAr = formatEasternNumber(filledCount);
  const missingAr = formatEasternNumber(missingCount);

  if (subitizeMode === "both-parts-to-5") {
    if (missingCount === 0) {
      return `اللوحة ممتلئة بالكامل: الجزء الموجود (${filledAr}) والجزء الفارغ (٠) يكوّنان معاً الكل (٥)`;
    }
    return `تعرّف سريع على الجزأين: (${filledAr}) موجود و(${missingAr}) فارغ يكوّنان معاً الكل (٥)`;
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

function generateSubitizePartWholeExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as SubitizePartWholeBlueprintParams;

  const defaultMode: SubitizeMode =
    ctx.lesson.lessonNumber === 26 ? "both-parts-to-5" : "identify-quantity";
  const subitizeMode: SubitizeMode = params.subitizeMode ?? defaultMode;

  const visualKind: SubitizeVisualKind = params.visualKind ?? "five-frame";

  const defaultCardCount =
    ctx.difficultyLevel === "Easy"
      ? 2
      : ctx.difficultyLevel === "Intermediate"
        ? 3
        : 3;
  const cardCount = Math.max(
    2,
    Math.min(3, params.cardCount ?? defaultCardCount)
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
    const filledCount = Math.max(1, Math.min(5, cardSpec.filledCount));
    const missingCount = Math.max(0, 5 - filledCount);
    const totalCount = 5;

    const filledCountAr = formatEasternNumber(filledCount);
    const missingCountAr = formatEasternNumber(missingCount);
    const totalCountAr = formatEasternNumber(totalCount);

    const primaryTheme =
      cardSpec.colorTheme ?? shuffledThemes[idx % shuffledThemes.length];
    const secondaryTheme =
      cardSpec.secondaryColorTheme ??
      shuffledThemes[(idx + 1) % shuffledThemes.length];

    const visualModel = createFiveFrameSpec({
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
    } else if (visualKind === "five-frame-and-shapes") {
      if (cardSpec.solidId) {
        const solidDef = getSolid3DById(cardSpec.solidId);
        companionModel = createSolid3DSpec(solidDef.id, {
          count: filledCount,
          colorTheme: primaryTheme,
          size: "small",
          labelAr: `${filledCountAr} (${solidDef.labelAr})`,
        });
      } else {
        const shapeId =
          cardSpec.shapeId ??
          SHAPE_IDS_CYCLE[(idx + filledCount) % SHAPE_IDS_CYCLE.length];
        const shapeDef = getShape2DById(shapeId);
        companionModel = createShape2DSpec(shapeDef.id, {
          count: filledCount,
          colorTheme: primaryTheme,
          size: "small",
          labelAr: `${filledCountAr} (${shapeDef.labelAr})`,
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
      buildDefaultQuickStrategyAr(filledCount, missingCount, subitizeMode);

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
    subitizeMode === "both-parts-to-5"
      ? `اعرف العدد بسرعة دون عدّ فردي: حدّد الجزأين على لوحة الخمسة (كم موجود؟ وكم ينقص لإكمال ٥؟) لتكوين الكل (٥):`
      : `اعرف العدد بسرعة (في لمحة واحدة دون عدّ فردي) من خلال ملاحظة الخانات المملوءة والخانات الفارغة على لوحة الخمسة:`;

  const cardsBreakdownAr = cards
    .map((c) => `${c.filledCountAr} موجود و${c.missingCountAr} فارغ = ٥`)
    .join("؛ ");

  const defaultStrategyHintAr =
    subitizeMode === "both-parts-to-5"
      ? `لا تعدّ واحداً بواحد! انظر إلى الجزأين معاً على لوحة الخمسة (${cardsBreakdownAr})؛ مجموع الجزء الموجود والجزء الفارغ يساوي دائماً الكل (٥).`
      : `استخدم الخانات الفارغة لمعرفة العدد فوراً دون عدّ فردي: اللوحة الكاملة = ٥، خانة واحدة فارغة = ٤، خانتان فارغتان = ٣ (${cardsBreakdownAr}).`;

  const firstCard = cards[0];
  const defaultReasoningPromptAr =
    subitizeMode === "both-parts-to-5"
      ? `في البطاقة الأولى يوجد (${firstCard.filledCountAr})؛ كم ينقصها لإكمال الكل (٥)؟ وكيف عرفت ذلك بسرعة دون العدّ واحداً بواحد؟`
      : `كيف نعرف فوراً أن على لوحة الخمسة ٤ أقراص عندما نرى خانة واحدة فارغة، أو ٣ أقراص عندما نرى خانتين فارغتين؟`;

  const defaultReasoningAnswerAr =
    subitizeMode === "both-parts-to-5"
      ? `ينقصها (${firstCard.missingCountAr}) لإكمال ٥، لأن ${firstCard.filledCountAr} و${firstCard.missingCountAr} يكوّنان معاً الكل (٥)`
      : `لأن لوحة الخمسة تتسع لـ ٥؛ فإذا كانت خانة واحدة فارغة يكون الموجود ٤، وإذا كانت خانتان فارغتين يكون الموجود ٣ دون حاجة للعدّ الفردي`;

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
      subitizeMode === "both-parts-to-5"
        ? "اعرف العدد بسرعة: الأجزاء والكل (مكوّنات ٥)"
        : "اعرف العدد بسرعة دون عدّ (لوحة الخمسة)",
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

  return (
    <div
      className="space-y-3"
      data-archetype="SubitizePartWhole"
      data-subitize-mode={data.subitizeMode}
    >
      {/* Subitizing Cards */}
      <div className="grid grid-cols-1 gap-3">
        {data.cards.map((card, idx) => (
          <div
            key={card.id}
            className="grid grid-cols-1 items-center gap-3 rounded-2xl border-2 border-indigo-100 bg-gradient-to-l from-white via-indigo-50/20 to-amber-50/30 p-3 shadow-2xs sm:grid-cols-[1.35fr_1fr]"
            data-subitize-card-id={toEasternArabicNumerals(card.id)}
          >
            {/* Right Column in RTL: Structured Visual Model(s) & Quick Subitizing Cue */}
            <div className="flex flex-col items-start gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold text-white">
                  {formatEasternNumber(idx + 1)}
                </span>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-950 border border-amber-300">
                  ⚡ لمحة سريعة (بدون عدّ فردي)
                </span>
                {isAnswerKey && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-900">
                    ✓ {toEasternArabicNumerals(card.equationRtlAr)}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
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

              <div className="text-[11px] font-bold text-slate-600">
                💡 {toEasternArabicNumerals(card.quickStrategyAr)}
              </div>
            </div>

            {/* Left Column in RTL: Part-Whole Breakdown Boxes (الموجود + الفارغ = الكل ٥) */}
            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-indigo-200 bg-white p-2.5 shadow-2xs">
              {/* Part 1: Filled / Present Count */}
              <div className="flex flex-col items-center justify-between gap-1 rounded-xl border border-sky-200 bg-sky-50/50 p-2">
                <span className="text-center text-[10px] font-extrabold text-sky-950">
                  الموجود (الجزء ١)
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
                <span className="text-[9px] font-bold text-slate-500">
                  كم قرصاً موجوداً؟
                </span>
              </div>

              {/* Part 2: Missing / Empty Count to make 5 */}
              <div className="flex flex-col items-center justify-between gap-1 rounded-xl border border-amber-200 bg-amber-50/50 p-2">
                <span className="text-center text-[10px] font-extrabold text-amber-950">
                  الفارغ (الجزء ٢)
                </span>
                <AnswerSlot
                  solved={isAnswerKey}
                  answer={card.missingCountAr}
                  ariaLabel="مربع كتابة العدد الفارغ المكمل لخمسة"
                  tone="amber"
                  solvedDataAttributes={{
                    "data-solved-subitize-missing": card.missingCountAr,
                  }}
                />
                <span className="text-[9px] font-bold text-slate-500">
                  كم خانة فارغة؟
                </span>
              </div>

              {/* Whole / Total = 5 */}
              <div className="flex flex-col items-center justify-between gap-1 rounded-xl border-2 border-indigo-300 bg-indigo-50/80 p-2">
                <span className="text-center text-[10px] font-extrabold text-indigo-950">
                  الكل (المجموع)
                </span>
                <span
                  className={`inline-flex ${ANSWER_SLOT_SIZE_CLASS} items-center justify-center rounded-2xl bg-indigo-700 text-xl font-black text-white shadow-2xs`}
                  {...(isAnswerKey
                    ? { "data-solved-subitize-total": card.totalCountAr }
                    : {})}
                >
                  {card.totalCountAr}
                </span>
                <span className="text-[9px] font-bold text-indigo-800">
                  يكوّنان معاً ٥
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reasoning Prompt */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-3.5 py-2 text-xs font-bold text-amber-950">
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
