import React from "react";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import type {
  ColorThemeId,
  DifficultyLevel,
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { COLOR_PAIRS } from "@/lib/part-whole-facts";
import {
  createEverydayObjectSpec,
  getEverydayObjectById,
} from "@/visual-models/everyday-objects";
import { VisualModelView } from "@/visual-models/registry";
import {
  createFiveFrameSpec,
  type CrossOffMode,
} from "@/visual-models/unit-2-models";
import {
  createNumberBondSpec,
  type BondMissingPosition,
} from "@/visual-models/unit-3-models";

export type ShiftOneMode =
  "all-combinations" | "complete-pattern" | "give-away";

export type ShiftOneAction = "trace-first" | "write";

export interface ShiftOneDecomposeBlueprintParams {
  mode?: ShiftOneMode;
  targetTotal?: number;
  totalRange?: [number, number];
  action?: ShiftOneAction;
  showFiveFrames?: boolean;
  giveAwayCount?: number;
  crossOffMode?: CrossOffMode;
}

export interface ShiftOneCombinationStep {
  id: string;
  stepIndex: number;
  part1: number;
  part2: number;
  total: number;
  part1Ar: string;
  part2Ar: string;
  totalAr: string;
  factKey: string;
  isAnchor: boolean;
  missingPosition: BondMissingPosition;
  tracePositions: Array<"total" | "part1" | "part2">;
  fiveFrameModel?: VisualModelSpec;
  bondModel: VisualModelSpec;
}

export interface ShiftOneGiveAwayRow {
  id: string;
  rowIndex: number;
  total: number;
  partTakenAway: number;
  missingPart: number;
  totalAr: string;
  partTakenAwayAr: string;
  missingPartAr: string;
  factKey: string;
  promptAr: string;
  applesModel: VisualModelSpec;
}

export interface ShiftOneDecomposeData extends GenericArchetypeData {
  kind: "ShiftOneDecompose";
  mode: ShiftOneMode;
  targetTotal: number;
  targetTotalAr: string;
  action: ShiftOneAction;
  showFiveFrames: boolean;
  steps: ShiftOneCombinationStep[];
  giveAwayRows: ShiftOneGiveAwayRow[];
  comparisonPromptAr?: string;
  comparisonDifference?: number;
  comparisonDifferenceAr?: string;
}

function resolveTargetTotal(
  ctx: ArchetypeGeneratorContext,
  params: ShiftOneDecomposeBlueprintParams,
  mode: ShiftOneMode
): number {
  if (params.targetTotal !== undefined) {
    return Math.max(2, Math.min(5, params.targetTotal));
  }

  const defaultRange: [number, number] =
    mode === "give-away"
      ? ctx.difficultyLevel === "Easy"
        ? [3, 4]
        : [4, 5]
      : mode === "complete-pattern"
        ? ctx.difficultyLevel === "Easy"
          ? [3, 3]
          : ctx.difficultyLevel === "Intermediate"
            ? [4, 4]
            : [5, 5]
        : ctx.difficultyLevel === "Easy"
          ? [2, 3]
          : ctx.difficultyLevel === "Intermediate"
            ? [3, 4]
            : [4, 5];

  const [minT, maxT] = params.totalRange ?? defaultRange;
  const clampedMin = Math.max(2, Math.min(5, minT));
  const clampedMax = Math.max(clampedMin, Math.min(5, maxT));

  const candidates: number[] = [];
  for (let t = clampedMin; t <= clampedMax; t++) {
    candidates.push(t);
  }

  const unused = candidates.filter(
    (t) => !ctx.usedFacts || !ctx.usedFacts.has(`shift-total:${t}`)
  );
  const pool = unused.length > 0 ? unused : candidates;
  const picked = ctx.rng.pickOne(pool);
  ctx.usedFacts?.add(`shift-total:${picked}`);
  return picked;
}

function buildShiftOneSteps(params: {
  mode: "all-combinations" | "complete-pattern";
  targetTotal: number;
  difficultyLevel: DifficultyLevel;
  action: ShiftOneAction;
  showFiveFrames: boolean;
  primaryTheme: ColorThemeId;
  secondaryTheme: ColorThemeId;
}): ShiftOneCombinationStep[] {
  const {
    mode,
    targetTotal,
    action,
    showFiveFrames,
    primaryTheme,
    secondaryTheme,
  } = params;

  const totalAr = formatEasternNumber(targetTotal);
  const steps: ShiftOneCombinationStep[] = [];

  for (let i = 0; i <= targetTotal; i++) {
    const part1 = targetTotal - i;
    const part2 = i;
    const part1Ar = formatEasternNumber(part1);
    const part2Ar = formatEasternNumber(part2);
    const factKey = `${part1}+${part2}`;

    const isAnchor = mode === "complete-pattern" && i < 2;
    const isTracedFirst =
      mode === "all-combinations" && action === "trace-first" && i === 0;

    const missingPosition: BondMissingPosition =
      isAnchor || isTracedFirst ? "none" : "both-parts";
    const tracePositions: Array<"total" | "part1" | "part2"> = isTracedFirst
      ? ["part1", "part2"]
      : [];

    const fiveFrameModel = showFiveFrames
      ? createFiveFrameSpec({
          count: part1,
          secondaryCount: part2,
          colorTheme: primaryTheme,
          secondaryColorTheme: secondaryTheme,
          showPartOutline: true,
          highlightEmptySlots: true,
          labelAr: `لوحة الخمسة: ${part1Ar} و${part2Ar} يساوي ${totalAr}`,
        })
      : undefined;

    const bondModel = createNumberBondSpec({
      part1,
      part2,
      total: targetTotal,
      missingPosition,
      slotKind: "unknown",
      tracePositions,
      colorTheme: primaryTheme,
      secondaryColorTheme: secondaryTheme,
      labelAr: `رابطة الأعداد: الكلّ ${totalAr} والجزآن ${part1Ar} و${part2Ar}`,
    });

    steps.push({
      id: `shift-step-${i + 1}-${part1}-${part2}`,
      stepIndex: i,
      part1,
      part2,
      total: targetTotal,
      part1Ar,
      part2Ar,
      totalAr,
      factKey,
      isAnchor,
      missingPosition,
      tracePositions,
      fiveFrameModel,
      bondModel,
    });
  }

  return steps;
}

function generateShiftOneDecomposeExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as ShiftOneDecomposeBlueprintParams;
  const mode: ShiftOneMode = params.mode ?? "all-combinations";
  const targetTotal = resolveTargetTotal(ctx, params, mode);
  const targetTotalAr = formatEasternNumber(targetTotal);

  const defaultAction: ShiftOneAction =
    ctx.difficultyLevel === "Easy" ? "trace-first" : "write";
  const action: ShiftOneAction = params.action ?? defaultAction;

  const showFiveFrames =
    mode === "all-combinations" &&
    (params.showFiveFrames ?? ctx.difficultyLevel === "Easy");

  const [primaryTheme, secondaryTheme] =
    COLOR_PAIRS[ctx.exerciseIndex % COLOR_PAIRS.length];

  if (mode === "give-away") {
    const maxGiveFirst = Math.max(1, targetTotal - 2);
    const k =
      params.giveAwayCount !== undefined
        ? Math.max(1, Math.min(maxGiveFirst, params.giveAwayCount))
        : ctx.rng.int(1, maxGiveFirst);
    const crossOffMode: CrossOffMode = params.crossOffMode ?? "student";
    const appleDef = getEverydayObjectById("apple");

    const rowCounts = [k, k + 1];
    const giveAwayRows: ShiftOneGiveAwayRow[] = rowCounts.map(
      (taken, rowIdx) => {
        const remaining = targetTotal - taken;
        const totalAr = formatEasternNumber(targetTotal);
        const takenAr = formatEasternNumber(taken);
        const remainingAr = formatEasternNumber(remaining);

        const applesModel = createEverydayObjectSpec(appleDef, {
          id: `give-away-apples-row-${rowIdx + 1}-${targetTotal}-${taken}`,
          count: targetTotal,
          secondaryCount: 0,
          crossedOutCount: taken,
          size: "small",
          labelAr: `${totalAr} من ${appleDef.labelAr} شُطب منها ${takenAr} وبقي ${remainingAr}`,
          meta: { crossOffMode },
        });

        return {
          id: `give-away-row-${rowIdx + 1}-${targetTotal}-${taken}`,
          rowIndex: rowIdx,
          total: targetTotal,
          partTakenAway: taken,
          missingPart: remaining,
          totalAr,
          partTakenAwayAr: takenAr,
          missingPartAr: remainingAr,
          factKey: `${targetTotal}-${taken}`,
          promptAr: `اشطب ${takenAr} من الكلّ ${totalAr}، ثم اكتب كم بقي:`,
          applesModel,
        };
      }
    );

    const visualModels = giveAwayRows.map((r) => r.applesModel);
    const row1 = giveAwayRows[0];
    const row2 = giveAwayRows[1];
    const comparisonPromptAr =
      "عندما نشطب تفّاحة إضافية (إزاحة ١)، بكم يقلّ العدد الذي بقي؟";
    const comparisonDifference = row1.missingPart - row2.missingPart; // 1
    const comparisonDifferenceAr = formatEasternNumber(comparisonDifference);

    const defaultPromptAr =
      "اشطب التفّاحات المعطاة في كل صف، ثم اكتب كم بقي وقارن بين الصفّين:";
    const defaultStrategyHintAr = `اشطب ${row1.partTakenAwayAr} من ${targetTotalAr} فيبقى ${row1.missingPartAr}، ثم اشطب ${row2.partTakenAwayAr} من ${targetTotalAr} فيبقى ${row2.missingPartAr} (يقلّ العدد الذي بقي بمقدار ${comparisonDifferenceAr}).`;

    const data: ShiftOneDecomposeData = {
      kind: "ShiftOneDecompose",
      mode: "give-away",
      targetTotal,
      targetTotalAr,
      action,
      showFiveFrames: false,
      steps: [],
      giveAwayRows,
      comparisonPromptAr,
      comparisonDifference,
      comparisonDifferenceAr,
    };

    return {
      id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
      exerciseNumber: ctx.exerciseNumber,
      sectionId: ctx.sectionId,
      archetype: "ShiftOneDecompose",
      difficultyLevel: ctx.difficultyLevel,
      sourceLessonId: ctx.sourceLessonId,
      titleAr: "اشطب وقارن كم بقي",
      promptAr: ctx.spec.promptAr ?? defaultPromptAr,
      strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
      visualModels,
      data,
    };
  }

  const steps = buildShiftOneSteps({
    mode,
    targetTotal,
    difficultyLevel: ctx.difficultyLevel,
    action,
    showFiveFrames,
    primaryTheme,
    secondaryTheme,
  });

  const visualModels: VisualModelSpec[] = [];
  for (const step of steps) {
    if (step.fiveFrameModel) {
      visualModels.push(step.fiveFrameModel);
    }
    visualModels.push(step.bondModel);
  }

  const pairsSummaryAr = steps
    .map((s) => `${s.part1Ar} و${s.part2Ar}`)
    .join(" ← ");

  const defaultPromptAr =
    mode === "complete-pattern"
      ? `انظر إلى نمط إزاحة ١ للكلّ ${targetTotalAr}، ثم اكتب الأجزاء الناقصة لإكمال روابط الأعداد:`
      : showFiveFrames
        ? `انظر إلى لوحات الخمسة للكلّ ${targetTotalAr}، ثم اكتب جميع أزواج الأجزاء بإزاحة ١:`
        : `انظر إلى الكلّ ${targetTotalAr} في روابط الأعداد، ثم اكتب جميع أزواج الأجزاء بإزاحة ١:`;

  const defaultStrategyHintAr = `انظر إلى الزوج (${targetTotalAr} و٠) للكلّ ${targetTotalAr}، ثم نفّذ إزاحة ١ في كل خطوة (${pairsSummaryAr}).`;

  const data: ShiftOneDecomposeData = {
    kind: "ShiftOneDecompose",
    mode,
    targetTotal,
    targetTotalAr,
    action,
    showFiveFrames,
    steps,
    giveAwayRows: [],
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "ShiftOneDecompose",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr:
      mode === "complete-pattern"
        ? "أكمل النمط بإزاحة ١"
        : "فكّك الكلّ بإزاحة ١",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function renderGiveAwayMode({
  data,
  isAnswerKey,
}: {
  data: ShiftOneDecomposeData;
  isAnswerKey: boolean;
}): React.ReactElement {
  return (
    <div
      className="space-y-1"
      data-archetype="ShiftOneDecompose"
      data-shift-mode="give-away"
      data-target-total={data.targetTotalAr}
    >
      <ExerciseColumns columns={2}>
        {data.giveAwayRows.map((row, idx) => (
          <div
            key={row.id}
            className="flex flex-col items-center justify-between gap-1 rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/30 px-2 py-1 shadow-2xs"
            data-give-away-row-id={toEasternArabicNumerals(row.id)}
            data-fact={toEasternArabicNumerals(row.factKey)}
          >
            <div className="flex w-full items-center justify-between gap-1">
              <div className="flex items-center gap-1">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
                  {formatEasternNumber(idx + 1)}
                </span>
                <span className="text-[13px] font-extrabold leading-tight text-indigo-950">
                  {toEasternArabicNumerals(row.promptAr)}
                </span>
              </div>
              {isAnswerKey && (
                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
                  {`${row.totalAr} − ${row.partTakenAwayAr} = ${row.missingPartAr}`}
                </span>
              )}
            </div>

            <div className="flex w-full items-center justify-between gap-1.5">
              <div className="flex flex-1 items-center justify-center">
                <VisualModelView model={row.applesModel} solved={isAnswerKey} />
              </div>

              <div
                dir="rtl"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-2 py-0.5 shadow-2xs"
              >
                <span className="text-[13px] font-extrabold leading-none text-indigo-950">
                  كم بقي؟
                </span>
                <AnswerSlot
                  solved={isAnswerKey}
                  answer={row.missingPartAr}
                  ariaLabel={`مربع كتابة كم بقي في الصف ${formatEasternNumber(idx + 1)}`}
                  kind="unknown"
                  tone="indigo"
                  solvedDataAttributes={{
                    "data-solved-give-away-remaining": row.missingPartAr,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </ExerciseColumns>

      {data.comparisonPromptAr && data.comparisonDifferenceAr && (
        <ExerciseColumns columns={1}>
          <div
            dir="rtl"
            className="flex items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-2.5 py-0.5"
            data-give-away-comparison="true"
          >
            <span className="text-[13px] font-extrabold leading-tight text-amber-950">
              {toEasternArabicNumerals(data.comparisonPromptAr)}
            </span>
            <AnswerSlot
              solved={isAnswerKey}
              answer={data.comparisonDifferenceAr}
              ariaLabel="مربع كتابة مقدار النقصان عند إزاحة ١"
              kind="unknown"
              tone="amber"
              solvedDataAttributes={{
                "data-solved-give-away-diff": data.comparisonDifferenceAr,
              }}
            />
          </div>
        </ExerciseColumns>
      )}
    </div>
  );
}

function renderShiftOneDecomposeExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as ShiftOneDecomposeData;
  const isAnswerKey = mode === "answer-key";

  if (data.mode === "give-away") {
    return renderGiveAwayMode({ data, isAnswerKey });
  }

  return (
    <div
      className="space-y-1"
      data-archetype="ShiftOneDecompose"
      data-shift-mode={data.mode}
      data-target-total={data.targetTotalAr}
    >
      {/* Easy mode five-frame concrete support strip (2 columns × 324 px so 240 px five-frames fit cleanly) */}
      {data.showFiveFrames && (
        <ExerciseColumns columns={2}>
          {data.steps.map((step, idx) => (
            <div
              key={`frame-${step.id}`}
              className="flex flex-col items-center justify-between gap-0.5 rounded-xl border border-indigo-100 bg-indigo-50/35 px-2 py-0.5 shadow-2xs"
              data-shift-five-frame-step={formatEasternNumber(idx + 1)}
            >
              <div className="flex w-full items-center justify-between">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
                  {formatEasternNumber(idx + 1)}
                </span>
                <span className="rounded-full bg-white px-1.5 py-0.5 text-[13px] font-extrabold leading-none text-indigo-950">
                  {idx === 0
                    ? `ابدأ: ${step.part1Ar} و${step.part2Ar}`
                    : `إزاحة ١ ← ${step.part1Ar} و${step.part2Ar}`}
                </span>
              </div>
              {step.fiveFrameModel && (
                <div className="flex flex-1 flex-col items-center justify-center">
                  <VisualModelView
                    model={step.fiveFrameModel}
                    solved={isAnswerKey}
                  />
                </div>
              )}
            </div>
          ))}
        </ExerciseColumns>
      )}

      {/* 3-column RTL grid (212 px columns) of ordered Number Bonds (N, 0) <- ... <- (0, N) */}
      <ExerciseColumns columns={3}>
        {data.steps.map((step, idx) => (
          <div
            key={step.id}
            className="flex flex-col items-center justify-between gap-0.5"
            data-shift-step-id={toEasternArabicNumerals(step.id)}
            data-step-index={formatEasternNumber(idx + 1)}
            data-fact={toEasternArabicNumerals(step.factKey)}
          >
            <div className="flex w-full items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50/70 px-1.5 py-0.5">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
                {formatEasternNumber(idx + 1)}
              </span>
              <span
                className="text-[13px] font-extrabold leading-none text-indigo-950"
                data-shift-step-badge="true"
              >
                {idx === 0
                  ? `ابدأ (${step.totalAr} و٠)`
                  : step.isAnchor
                    ? `إزاحة ١ (${step.part1Ar} و${step.part2Ar})`
                    : "إزاحة ١ ←"}
              </span>
              {isAnswerKey && (
                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
                  {`${step.part1Ar} و${step.part2Ar}`}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col items-center justify-center">
              <VisualModelView model={step.bondModel} solved={isAnswerKey} />
            </div>
          </div>
        ))}
      </ExerciseColumns>
    </div>
  );
}

registerExerciseArchetype({
  id: "ShiftOneDecompose",
  displayNameAr: "فكّك بإزاحة ١",
  generate: generateShiftOneDecomposeExercise,
  render: renderShiftOneDecomposeExercise,
});
