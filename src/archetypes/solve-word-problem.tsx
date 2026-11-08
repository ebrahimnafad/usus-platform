import React from "react";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import type { Exercise } from "@/domain/types";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import {
  buildSolveWordProblemPayload,
  type SolveWordProblemBlueprintParams,
  type SolveWordProblemData,
  type SolveWordProblemItem,
} from "@/lib/word-problems";
import { EverydayObjectSvg } from "@/visual-models/everyday-objects";
import { VisualModelView } from "@/visual-models/registry";

function generateSolveWordProblemExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as SolveWordProblemBlueprintParams;
  const { data, visualModels, defaultPromptAr, defaultStrategyHintAr } =
    buildSolveWordProblemPayload(ctx, params);

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "SolveWordProblem",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr:
      data.problemStyle === "story"
        ? "حلّ المسألة القصصية"
        : "حلّ المسألة التعليمية",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function renderClozeFromModelItem({
  item,
  idx,
  isAnswerKey,
  clozeIncludeEquation,
}: {
  item: SolveWordProblemItem;
  idx: number;
  isAnswerKey: boolean;
  clozeIncludeEquation: boolean;
}): React.ReactElement {
  const isTakeFrom = item.situation === "take-from";
  const firstClozeAnswerAr = isTakeFrom ? item.totalAr : item.part1Ar;
  const secondClozeAnswerAr = isTakeFrom ? item.part1Ar : item.part2Ar;
  const firstClozeAttrKey = isTakeFrom
    ? "data-solved-cloze-total"
    : "data-solved-cloze-part1";
  const secondClozeAttrKey = isTakeFrom
    ? "data-solved-cloze-part1"
    : "data-solved-cloze-part2";
  const fallbackSlotAnswerAr = isTakeFrom ? item.missingPartAr : item.totalAr;
  const fallbackSlotAttrKey = isTakeFrom
    ? "data-solved-cloze-missing-part"
    : "data-solved-cloze-total";

  return (
    <div
      key={item.id}
      className="flex flex-col gap-1.5 rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/25 px-3 py-1.5 shadow-2xs"
      data-word-problem-item-id={toEasternArabicNumerals(item.id)}
      data-fact={toEasternArabicNumerals(item.factKey)}
    >
      {/* Top row: badge + concrete visual model + solved badge */}
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
            {formatEasternNumber(idx + 1)}
          </span>
          {item.problemStyle === "story" && (
            <EverydayObjectSvg objectId={item.objectId} size="tiny" />
          )}
          <span className="text-[13px] font-extrabold leading-none text-indigo-950">
            {item.problemStyle === "story"
              ? "أكمل المسألة القصصية من النموذج:"
              : "أكمل المسألة التعليمية من النموذج:"}
          </span>
        </div>

        <div className="flex items-center justify-center">
          {item.representationModel && (
            <VisualModelView
              model={item.representationModel}
              solved={isAnswerKey}
            />
          )}
        </div>

        {isAnswerKey ? (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
            {isTakeFrom
              ? `${item.totalAr} − ${item.part1Ar} = ${item.part2Ar}`
              : `${item.part1Ar} + ${item.part2Ar} = ${item.totalAr}`}
          </span>
        ) : (
          <span className="text-[13px] font-extrabold leading-none text-slate-600">
            الجزء والجزء والكلّ
          </span>
        )}
      </div>

      {/* Bottom row: Cloze sentence with 48×48 digit slots + Total/Part answer slot / equation */}
      <div
        dir="rtl"
        className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-indigo-100 bg-white px-2.5 py-1"
        data-cloze-sentence="true"
      >
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[13px] font-extrabold leading-tight text-slate-900">
            {toEasternArabicNumerals(item.clozeLeadAr)}
          </span>
          <AnswerSlot
            solved={isAnswerKey}
            answer={firstClozeAnswerAr}
            ariaLabel={
              isTakeFrom
                ? "مربع كتابة الكلّ في المسألة"
                : "مربع كتابة الجزء الأوّل في المسألة"
            }
            kind="unknown"
            tone={isTakeFrom ? "indigo" : "sky"}
            solvedDataAttributes={{
              [firstClozeAttrKey]: firstClozeAnswerAr,
            }}
          />
          <span className="text-[13px] font-extrabold leading-tight text-slate-900">
            {toEasternArabicNumerals(item.clozeMiddleAr)}
          </span>
          <AnswerSlot
            solved={isAnswerKey}
            answer={secondClozeAnswerAr}
            ariaLabel={
              isTakeFrom
                ? "مربع كتابة الجزء المأخوذ في المسألة"
                : "مربع كتابة الجزء الثاني في المسألة"
            }
            kind="unknown"
            tone="amber"
            solvedDataAttributes={{
              [secondClozeAttrKey]: secondClozeAnswerAr,
            }}
          />
          <span className="text-[13px] font-extrabold leading-tight text-slate-900">
            {toEasternArabicNumerals(item.clozeTrailAr)}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {clozeIncludeEquation && item.equationModel ? (
            <VisualModelView model={item.equationModel} solved={isAnswerKey} />
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/40 px-2 py-0.5">
              <span className="text-[13px] font-extrabold leading-none text-indigo-950">
                {toEasternArabicNumerals(item.questionLabelAr)}
              </span>
              <AnswerSlot
                solved={isAnswerKey}
                answer={fallbackSlotAnswerAr}
                ariaLabel={
                  isTakeFrom
                    ? "مربع كتابة الجزء الناقص في المسألة"
                    : "مربع كتابة الكلّ في المسألة"
                }
                kind="unknown"
                tone="indigo"
                solvedDataAttributes={{
                  [fallbackSlotAttrKey]: fallbackSlotAnswerAr,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function renderSolveWordProblemExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as SolveWordProblemData;
  const isAnswerKey = mode === "answer-key";

  if (data.responseForm === "cloze-from-model") {
    return (
      <div
        className="space-y-1"
        data-archetype="SolveWordProblem"
        data-situation={data.situation}
        data-problem-style={data.problemStyle}
        data-response-form={data.responseForm}
      >
        <ExerciseColumns columns={1}>
          {data.items.map((item, idx) =>
            renderClozeFromModelItem({
              item,
              idx,
              isAnswerKey,
              clozeIncludeEquation: data.clozeIncludeEquation,
            })
          )}
        </ExerciseColumns>
      </div>
    );
  }

  const columns: 1 | 2 = data.items.length === 1 ? 1 : 2;

  return (
    <div
      className="space-y-1"
      data-archetype="SolveWordProblem"
      data-situation={data.situation}
      data-problem-style={data.problemStyle}
      data-response-form={data.responseForm}
      data-action={data.action}
    >
      <ExerciseColumns columns={columns}>
        {data.items.map((item, idx) => {
          const isTakeFrom = item.situation === "take-from";
          const solvedValueAr =
            item.solvedAnswerAr ??
            (isTakeFrom ? item.missingPartAr : item.totalAr);
          const solvedSlotAttrKey = isTakeFrom
            ? "data-solved-word-problem-missing-part"
            : "data-solved-word-problem-total";
          const slotAriaLabel = isTakeFrom
            ? `مربع كتابة الجزء الناقص (${item.questionLabelAr})`
            : `مربع كتابة الكلّ (${item.questionLabelAr})`;

          return (
            <div
              key={item.id}
              className="flex flex-col items-center justify-between gap-1 rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/25 px-2 py-1 shadow-2xs"
              data-word-problem-item-id={toEasternArabicNumerals(item.id)}
              data-fact={toEasternArabicNumerals(item.factKey)}
            >
              {/* Header + Problem Statement Box */}
              <div className="flex w-full flex-col gap-0.5 rounded-lg border border-indigo-100 bg-indigo-50/50 px-2 py-1">
                <div className="flex w-full items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
                      {formatEasternNumber(idx + 1)}
                    </span>
                    {item.problemStyle === "story" && (
                      <EverydayObjectSvg objectId={item.objectId} size="tiny" />
                    )}
                    <span className="text-[13px] font-extrabold leading-none text-indigo-950">
                      {item.problemStyle === "story"
                        ? "مسألة قصصية"
                        : "مسألة تعليمية"}
                    </span>
                  </div>
                  {isAnswerKey ? (
                    <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
                      {solvedValueAr}
                    </span>
                  ) : (
                    <span className="text-[13px] font-extrabold leading-none text-slate-600">
                      {isTakeFrom
                        ? `${item.totalAr} − ${item.part1Ar}`
                        : `${item.part1Ar} و${item.part2Ar}`}
                    </span>
                  )}
                </div>

                <p
                  className="text-[13px] font-bold leading-snug text-slate-900"
                  data-word-problem-text="true"
                >
                  {toEasternArabicNumerals(item.problemTextAr)}
                </p>
              </div>

              {/* Optional Concrete Model */}
              {item.representationModel && (
                <div className="flex flex-1 items-center justify-center py-0.5">
                  <VisualModelView
                    model={item.representationModel}
                    solved={isAnswerKey}
                  />
                </div>
              )}

              {/* Response Zone: model-and-bond vs equation vs story-and-slot */}
              {data.responseForm === "model-and-bond" ? (
                <div className="flex w-full items-center justify-center gap-1.5">
                  {item.bondModel && (
                    <VisualModelView
                      model={item.bondModel}
                      solved={isAnswerKey}
                    />
                  )}
                  <div
                    dir="rtl"
                    className="flex flex-col items-center justify-center gap-1 rounded-xl border border-indigo-200 bg-white px-2 py-1.5 shadow-2xs"
                    data-word-problem-slot-box="true"
                  >
                    <span className="text-[13px] font-extrabold leading-tight text-indigo-950">
                      {toEasternArabicNumerals(item.questionLabelAr)}
                    </span>
                    <AnswerSlot
                      solved={isAnswerKey}
                      answer={solvedValueAr}
                      ariaLabel={slotAriaLabel}
                      kind="unknown"
                      tone="indigo"
                      solvedDataAttributes={{
                        [solvedSlotAttrKey]: solvedValueAr,
                      }}
                    />
                  </div>
                </div>
              ) : data.responseForm === "equation" && item.equationModel ? (
                <div className="flex w-full items-center justify-center py-0.5">
                  <VisualModelView
                    model={item.equationModel}
                    solved={isAnswerKey}
                  />
                </div>
              ) : (
                <div
                  dir="rtl"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-2.5 py-1 shadow-2xs"
                  data-word-problem-slot-box="true"
                >
                  {data.action === "trace" && (
                    <div className="inline-flex items-center gap-1 border-l border-slate-200 pl-2">
                      <span
                        className={`text-[28px] font-black leading-none ${
                          isAnswerKey ? "text-emerald-700" : "text-slate-400"
                        }`}
                        data-trace-state={isAnswerKey ? "solid" : "dotted"}
                      >
                        {isTakeFrom ? item.totalAr : item.part1Ar}
                      </span>
                      <span
                        className="text-[28px] font-black leading-none text-indigo-700"
                        aria-hidden="true"
                      >
                        {isTakeFrom ? "−" : "+"}
                      </span>
                      <span
                        className={`text-[28px] font-black leading-none ${
                          isAnswerKey ? "text-emerald-700" : "text-slate-400"
                        }`}
                        data-trace-state={isAnswerKey ? "solid" : "dotted"}
                      >
                        {isTakeFrom ? item.part1Ar : item.part2Ar}
                      </span>
                    </div>
                  )}
                  <span className="text-[13px] font-extrabold leading-none text-indigo-950">
                    {toEasternArabicNumerals(item.questionLabelAr)}
                  </span>
                  <AnswerSlot
                    solved={isAnswerKey}
                    answer={solvedValueAr}
                    ariaLabel={slotAriaLabel}
                    kind="unknown"
                    tone="indigo"
                    solvedDataAttributes={{
                      [solvedSlotAttrKey]: solvedValueAr,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </ExerciseColumns>
    </div>
  );
}

registerExerciseArchetype({
  id: "SolveWordProblem",
  displayNameAr: "حلّ المسألة اللفظية",
  generate: generateSolveWordProblemExercise,
  render: renderSolveWordProblemExercise,
});
