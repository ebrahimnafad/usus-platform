import React from "react";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import type {
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import {
  createEquationStripSpec,
  createNumberBondSpec,
} from "@/visual-models/unit-3-models";
import { VisualModelView } from "@/visual-models/registry";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { selectAdditionFacts } from "@/archetypes/join-parts";

export type JudgeEqualityMode = "whats-wrong" | "true-false" | "balance";
export type JudgeEqualityModelKind = "equation" | "number-bond";

export interface JudgeEqualityBlueprintParams {
  mode?: JudgeEqualityMode;
  modelKind?: JudgeEqualityModelKind;
  rowCount?: number;
  totalRange?: [number, number];
  minPart?: number;
}

export interface JudgeEqualityItem {
  id: string;
  itemIndex: number;
  part1: number;
  part2: number;
  shownTotal: number;
  realTotal: number;
  isCorrect: boolean;
  explanationAr: string;
  model: VisualModelSpec;
}

export interface JudgeEqualityRow {
  id: string;
  rowIndex: number;
  items: JudgeEqualityItem[];
}

export interface JudgeEqualityData extends GenericArchetypeData {
  kind: "JudgeEquality";
  mode: JudgeEqualityMode;
  modelKind: JudgeEqualityModelKind;
  rows: JudgeEqualityRow[];
}

function generateJudgeEqualityExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as JudgeEqualityBlueprintParams;
  const mode: JudgeEqualityMode = params.mode ?? "whats-wrong";
  const modelKind: JudgeEqualityModelKind = params.modelKind ?? "equation";
  const rowCount = Math.max(1, Math.min(2, params.rowCount ?? 1));

  const rows: JudgeEqualityRow[] = [];
  const allVisualModels: VisualModelSpec[] = [];
  const wrongExplanations: string[] = [];

  for (let r = 0; r < rowCount; r++) {
    const rowRng = ctx.rng.fork(`row:${r}`);
    // Select 3 distinct base facts for this row
    const baseFacts = selectAdditionFacts(
      rowRng,
      ctx.difficultyLevel,
      {
        totalRange: params.totalRange ?? [2, 5],
        minPart: params.minPart ?? 1,
        count: 3,
      },
      ctx.usedFacts
    );

    // Pick one position (0, 1, or 2) to be the false item
    const wrongIndex = rowRng.int(0, baseFacts.length - 1);

    const items: JudgeEqualityItem[] = baseFacts.map((fact, idx) => {
      const isWrong = idx === wrongIndex;
      const part1 = fact.part1;
      const part2 = fact.part2;
      const realTotal = fact.total;

      let shownTotal = realTotal;
      if (isWrong) {
        // Derive an incorrect shown total respecting params.totalRange that differs from realTotal
        const [minT, maxT] = params.totalRange ?? [2, 5];
        const candidateTotals: number[] = [];
        for (let t = minT; t <= maxT; t++) {
          if (t !== realTotal) candidateTotals.push(t);
        }
        shownTotal =
          candidateTotals.length > 0
            ? rowRng.pickOne(candidateTotals)
            : realTotal === maxT
              ? realTotal - 1
              : realTotal + 1;
      }

      const p1Ar = formatEasternNumber(part1);
      const p2Ar = formatEasternNumber(part2);
      const shownTotalAr = formatEasternNumber(shownTotal);
      const realTotalAr = formatEasternNumber(realTotal);

      const explanationAr = isWrong
        ? `${p1Ar} + ${p2Ar} = ${realTotalAr} وليس ${shownTotalAr}`
        : `${p1Ar} + ${p2Ar} = ${realTotalAr}`;

      if (isWrong) {
        wrongExplanations.push(explanationAr);
      }

      let model: VisualModelSpec;
      if (modelKind === "number-bond") {
        model = createNumberBondSpec({
          part1,
          part2,
          total: shownTotal,
          missingPosition: "none",
          labelAr: `رابطة الأعداد: ${p1Ar} و${p2Ar} والكلّ ${shownTotalAr}`,
        });
      } else {
        model = createEquationStripSpec({
          part1,
          part2,
          total: shownTotal,
          layout: "standard",
          missingPosition: "none",
          labelAr: `معادلة: ${p1Ar} + ${p2Ar} = ${shownTotalAr}`,
        });
      }

      allVisualModels.push(model);

      return {
        id: `judge-row-${r + 1}-item-${idx + 1}`,
        itemIndex: idx,
        part1,
        part2,
        shownTotal,
        realTotal,
        isCorrect: !isWrong,
        explanationAr,
        model,
      };
    });

    rows.push({
      id: `judge-row-${r + 1}`,
      rowIndex: r,
      items,
    });
  }

  const defaultPromptAr =
    modelKind === "number-bond"
      ? "في كل صف، ضع علامة ✕ على رابطة الأعداد غير الصحيحة:"
      : "في كل صف، ضع علامة ✕ على المعادلة غير الصحيحة:";

  const defaultStrategyHintAr = `تحقّق من صحّة كل مسألة بجمع الجزأين معاً؛ المسألة غير الصحيحة هي التي لا يساوي فيها الكلّ مجموع الجزأين (${wrongExplanations.join("؛ ")}).`;

  const data: JudgeEqualityData = {
    kind: "JudgeEquality",
    mode,
    modelKind,
    rows,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "JudgeEquality",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "ما الخطأ؟ (اكتشف المسألة غير الصحيحة)",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels: allVisualModels,
    data,
  };
}

function renderJudgeEqualityExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as JudgeEqualityData;
  const isAnswerKey = mode === "answer-key";

  return (
    <div
      className="space-y-1.5"
      data-archetype="JudgeEquality"
      data-judge-mode={data.mode}
      data-model-kind={data.modelKind}
    >
      {data.rows.map((row) => (
        <div
          key={row.id}
          className="rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/20 p-1 shadow-2xs"
          data-judge-row={toEasternArabicNumerals(row.id)}
        >
          <ExerciseColumns columns={3}>
            {row.items.map((item, idx) => {
              const isFalseInAnswerKey = isAnswerKey && !item.isCorrect;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col items-center justify-between gap-1 rounded-xl border-2 p-1.5 transition-colors ${
                    isFalseInAnswerKey
                      ? "border-rose-400 bg-rose-50/50 shadow-2xs"
                      : "border-slate-200 bg-white shadow-2xs"
                  }`}
                  data-judge-item-id={toEasternArabicNumerals(item.id)}
                  data-item-correct={item.isCorrect ? "true" : "false"}
                  {...(isFalseInAnswerKey
                    ? { "data-crossed-off": "true" }
                    : {})}
                >
                  {/* Item index badge */}
                  <div className="flex w-full items-center justify-between">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[12px] font-extrabold leading-none text-white">
                      {formatEasternNumber(idx + 1)}
                    </span>
                    {isFalseInAnswerKey ? (
                      <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[12px] font-extrabold leading-none text-white shadow-2xs">
                        ✕ غير صحيحة
                      </span>
                    ) : isAnswerKey ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[12px] font-extrabold leading-none text-emerald-900">
                        ✓ صحيحة
                      </span>
                    ) : null}
                  </div>

                  {/* Visual Model (EquationStrip, NumberBond, or FiveFrame) */}
                  <div className="relative flex w-full items-center justify-center py-1">
                    <VisualModelView model={item.model} solved={isAnswerKey} />

                    {/* Prominent Red X cross-off overlay in Answer Key for false item */}
                    {isFalseInAnswerKey && (
                      <svg
                        className="pointer-events-none absolute inset-0 h-full w-full"
                        viewBox="0 0 212 80"
                        preserveAspectRatio="none"
                        aria-label="علامة الشطب باللون الأحمر"
                      >
                        <line
                          x1="12"
                          y1="8"
                          x2="200"
                          y2="72"
                          stroke="#BE123C"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                        />
                        <line
                          x1="200"
                          y1="8"
                          x2="12"
                          y2="72"
                          stroke="#BE123C"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* In Answer Key, display clear mathematical reason */}
                  {isFalseInAnswerKey && (
                    <div className="w-full rounded-lg bg-rose-100/90 px-1.5 py-0.5 text-center text-[12px] font-extrabold leading-tight text-rose-950">
                      {toEasternArabicNumerals(item.explanationAr)}
                    </div>
                  )}
                </div>
              );
            })}
          </ExerciseColumns>
        </div>
      ))}
    </div>
  );
}

registerExerciseArchetype({
  id: "JudgeEquality",
  displayNameAr: "صح أم خطأ",
  generate: generateJudgeEqualityExercise,
  render: renderJudgeEqualityExercise,
});
