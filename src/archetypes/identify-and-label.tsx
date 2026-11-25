import React from "react";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import type {
  CoinDenomination,
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { AnswerLine } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import { VisualModelView } from "@/visual-models/registry";
import { createMoneyCardSpec } from "@/visual-models/money-card";
import {
  COIN_CATALOG,
  getCoinByDenomination,
  type CurrencyKind,
} from "@/visual-models/shapes-solids-coins";

export type IdentifyAndLabelMode = "name" | "value";

export interface IdentifyAndLabelBlueprintParams {
  mode?: IdentifyAndLabelMode;
  denominations?: CoinDenomination[];
  itemCount?: number;
}

export interface IdentifyAndLabelItem {
  id: string;
  denomination: CoinDenomination;
  currencyKind: CurrencyKind;
  nameAr: string;
  valueAr: string;
  expectedAnswerAr: string;
  descriptionAr: string;
  model: VisualModelSpec;
}

export interface IdentifyAndLabelData extends GenericArchetypeData {
  kind: "IdentifyAndLabel";
  labelMode: IdentifyAndLabelMode;
  items: IdentifyAndLabelItem[];
}

function generateIdentifyAndLabelExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as IdentifyAndLabelBlueprintParams;
  const labelMode: IdentifyAndLabelMode = params.mode ?? "name";
  const pool: CoinDenomination[] =
    params.denominations && params.denominations.length > 0
      ? params.denominations
      : COIN_CATALOG.map((c) => c.denomination);

  const requestedCount = params.itemCount ?? (pool.length <= 2 ? 2 : 4);
  const count = Math.max(1, Math.min(pool.length, requestedCount));
  const selected = ctx.rng.shuffle([...pool]).slice(0, count);

  const items: IdentifyAndLabelItem[] = selected.map((denom, idx) => {
    const def = getCoinByDenomination(denom);
    const expectedAnswerAr = labelMode === "name" ? def.nameAr : def.valueAr;
    return {
      id: `identify-item-${idx + 1}`,
      denomination: def.denomination,
      currencyKind: def.currencyKind,
      nameAr: def.nameAr,
      valueAr: def.valueAr,
      expectedAnswerAr,
      descriptionAr: def.descriptionAr,
      model: createMoneyCardSpec(def.denomination),
    };
  });

  const summaryAr = items.map((it) => `${it.valueAr}: ${it.nameAr}`).join("؛ ");

  const defaultPromptAr =
    labelMode === "name"
      ? "انظر إلى كلّ عملة أو ورقة نقدية، ثم اكتب اسمها:"
      : "انظر إلى كلّ عملة أو ورقة نقدية، ثم اكتب قيمتها:";

  const defaultStrategyHintAr =
    labelMode === "name"
      ? `انظر إلى لون العملة وحجمها والرقم المكتوب عليها لتحديد اسمها (${summaryAr}).`
      : `اقرأ الرقم والوحدة على كلّ عملة أو ورقة نقدية لتحديد قيمتها (${summaryAr}).`;

  const resolvedStrategyHintAr = ctx.spec.strategyHintAr
    ? `${ctx.spec.strategyHintAr.replace(/\.$/, "")} (${summaryAr}).`
    : defaultStrategyHintAr;

  const data: IdentifyAndLabelData = {
    kind: "IdentifyAndLabel",
    labelMode,
    items,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "IdentifyAndLabel",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: labelMode === "name" ? "تسمية العملات" : "قيمة العملات",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: resolvedStrategyHintAr,
    visualModels: items.map((i) => i.model),
    data,
  };
}

function renderIdentifyAndLabelExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as IdentifyAndLabelData;
  const isAnswerKey = mode === "answer-key";
  const lineLabelAr = data.labelMode === "name" ? "الاسم:" : "القيمة:";

  return (
    <div
      className="space-y-2"
      data-archetype="IdentifyAndLabel"
      data-identify-mode={data.labelMode}
    >
      <ExerciseColumns columns={2}>
        {data.items.map((item, idx) => (
          <div
            key={item.id}
            dir="rtl"
            className="flex flex-col items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-2xs"
            data-identify-item={item.denomination}
          >
            <div className="flex w-full items-center justify-between">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-bold leading-none text-white">
                {formatEasternNumber(idx + 1)}
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[13px] font-bold leading-tight text-slate-700">
                {lineLabelAr}
              </span>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center">
              <VisualModelView model={item.model} solved={isAnswerKey} />
            </div>

            <div className="flex w-full items-center justify-center pt-0.5">
              <AnswerLine
                solved={isAnswerKey}
                answer={toEasternArabicNumerals(item.expectedAnswerAr)}
                ariaLabel={`${lineLabelAr} ${item.nameAr}`}
              />
            </div>
          </div>
        ))}
      </ExerciseColumns>
    </div>
  );
}

registerExerciseArchetype({
  id: "IdentifyAndLabel",
  displayNameAr: "تسمية العملات وقيمها",
  generate: generateIdentifyAndLabelExercise,
  render: renderIdentifyAndLabelExercise,
});
