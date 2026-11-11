import React from "react";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import type {
  ColorThemeId,
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import {
  createBalanceScaleSpec,
  createEquationStripSpec,
  createNumberBondSpec,
  type BalancePanSpec,
  type EquationOperation,
} from "@/visual-models/unit-3-models";
import { VisualModelView } from "@/visual-models/registry";
import { AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { EverydayObjectSvg } from "@/visual-models/everyday-objects";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import {
  selectAdditionFacts,
  selectSubtractionFacts,
  type AdditionFact,
  type SubtractionFact,
} from "@/lib/part-whole-facts";

export type JudgeEqualityMode =
  "whats-wrong" | "true-false" | "balance" | "comparison-statement";
export type JudgeEqualityModelKind =
  "equation" | "number-bond" | "balance-scale";

export interface ComparisonCategoryItem {
  id: string;
  nameAr: string;
  count: number;
  countAr: string;
  objectId: string;
  colorTheme?: ColorThemeId;
}

export interface ComparisonStatementItem {
  id: string;
  statementAr: string;
  isCorrect: boolean;
  explanationAr: string;
}

export interface JudgeEqualityBlueprintParams {
  operation?: EquationOperation;
  mode?: JudgeEqualityMode;
  judgementKind?: "equation" | "comparison-statement";
  modelKind?: JudgeEqualityModelKind;
  twoExpressionPans?: boolean;
  rowCount?: number;
  itemCount?: number;
  totalRange?: [number, number];
  minPart?: number;
}

export interface JudgeEqualityItem {
  id: string;
  itemIndex: number;
  operation?: EquationOperation;
  part1: number;
  part2: number;
  shownTotal: number;
  realTotal: number;
  missingPart?: number;
  shownMissingPart?: number;
  isCorrect: boolean;
  explanationAr: string;
  equationLayout?: "standard" | "total-first";
  rightValue?: number;
  leftValue?: number;
  solutionValue?: number;
  secondarySolutionValue?: number;
  model: VisualModelSpec;
}

export interface JudgeEqualityRow {
  id: string;
  rowIndex: number;
  items: JudgeEqualityItem[];
}

export interface JudgeEqualityData extends GenericArchetypeData {
  kind: "JudgeEquality";
  operation: EquationOperation;
  mode: JudgeEqualityMode;
  modelKind: JudgeEqualityModelKind;
  numberBank?: number[];
  rows: JudgeEqualityRow[];
  comparisonCategories?: ComparisonCategoryItem[];
  comparisonStatements?: ComparisonStatementItem[];
}

function pickWrongValue(
  rowRng: ArchetypeGeneratorContext["rng"],
  realValue: number,
  minCandidate: number,
  maxCandidate: number
): number {
  const candidates: number[] = [];
  for (let c = minCandidate; c <= maxCandidate; c++) {
    if (c !== realValue) candidates.push(c);
  }
  return candidates.length > 0
    ? rowRng.pickOne(candidates)
    : realValue === maxCandidate
      ? realValue - 1
      : realValue + 1;
}

function buildBalanceItem(
  fact: AdditionFact,
  r: number,
  idx: number,
  bankSolutions: number[],
  summaryNotes: string[]
): JudgeEqualityItem {
  const { part1, part2, total: realTotal } = fact;
  const p1Ar = formatEasternNumber(part1);
  const p2Ar = formatEasternNumber(part2);
  const realTotalAr = formatEasternNumber(realTotal);
  const equationLayout: "standard" | "total-first" =
    idx % 2 === 0 ? "standard" : "total-first";

  const exprPan: BalancePanSpec = {
    kind: "expression",
    value: realTotal,
    expressionAr: `${p1Ar} + ${p2Ar}`,
    missingTerm: {
      operation: "add",
      missingRole: "part",
      givenValue: part1,
      missingValue: part2,
    },
  };
  const slotPan: BalancePanSpec = {
    kind: "slot",
    value: realTotal,
    slotKind: "unknown",
  };

  const rightPan = equationLayout === "standard" ? exprPan : slotPan;
  const leftPan = equationLayout === "standard" ? slotPan : exprPan;

  const model = createBalanceScaleSpec({
    rightPan,
    leftPan,
    tilt: "level",
  });

  bankSolutions.push(realTotal, part2);
  const explanationAr =
    equationLayout === "standard"
      ? `${p1Ar} + ${p2Ar} = ${realTotalAr}`
      : `${realTotalAr} = ${p1Ar} + ${p2Ar}`;
  summaryNotes.push(explanationAr);

  return {
    id: `judge-row-${r + 1}-item-${idx + 1}`,
    itemIndex: idx,
    operation: "add",
    part1,
    part2,
    shownTotal: realTotal,
    realTotal,
    isCorrect: true,
    explanationAr,
    equationLayout,
    rightValue: rightPan.value,
    leftValue: leftPan.value,
    solutionValue: realTotal,
    secondarySolutionValue: part2,
    model,
  };
}

function buildSubtractionBalanceItem(
  fact: SubtractionFact,
  r: number,
  idx: number,
  allowTwoExpressionPans: boolean,
  bankSolutions: number[],
  summaryNotes: string[]
): JudgeEqualityItem {
  const { total, partTakenAway, missingPart } = fact;
  const totalAr = formatEasternNumber(total);
  const p1Ar = formatEasternNumber(partTakenAway);
  const missingAr = formatEasternNumber(missingPart);
  const equationLayout: "standard" | "total-first" =
    idx % 2 === 0 ? "standard" : "total-first";
  const missingRole: "part" | "total" = idx % 2 === 0 ? "part" : "total";
  const missingTermAnswer = missingRole === "part" ? partTakenAway : total;

  const exprPan: BalancePanSpec = {
    kind: "expression",
    value: missingPart,
    expressionAr: `${totalAr} − ${p1Ar}`,
    missingTerm: {
      operation: "subtract",
      missingRole,
      givenValue: missingRole === "part" ? total : partTakenAway,
      missingValue: missingTermAnswer,
    },
  };

  const addA = Math.ceil(missingPart / 2);
  const addB = missingPart - addA;
  const addExprAr = `${formatEasternNumber(addA)} + ${formatEasternNumber(addB)}`;

  const otherPan: BalancePanSpec = allowTwoExpressionPans
    ? {
        kind: "expression",
        value: missingPart,
        expressionAr: addExprAr,
        missingTerm: {
          operation: "add",
          missingRole: "part",
          givenValue: addA,
          missingValue: addB,
        },
      }
    : {
        kind: "slot",
        value: missingPart,
        slotKind: "unknown",
      };

  const rightPan = equationLayout === "standard" ? exprPan : otherPan;
  const leftPan = equationLayout === "standard" ? otherPan : exprPan;

  const model = createBalanceScaleSpec({
    rightPan,
    leftPan,
    tilt: "level",
  });

  const solutionValue = allowTwoExpressionPans
    ? missingTermAnswer
    : missingPart;
  const secondarySolutionValue = allowTwoExpressionPans
    ? addB
    : missingTermAnswer;

  bankSolutions.push(solutionValue, secondarySolutionValue);

  const counterSideAr = allowTwoExpressionPans ? addExprAr : missingAr;
  const explanationAr =
    equationLayout === "standard"
      ? `${totalAr} − ${p1Ar} = ${counterSideAr}`
      : `${counterSideAr} = ${totalAr} − ${p1Ar}`;
  summaryNotes.push(explanationAr);

  return {
    id: `judge-row-${r + 1}-item-${idx + 1}`,
    itemIndex: idx,
    operation: "subtract",
    part1: partTakenAway,
    part2: missingPart,
    shownTotal: total,
    realTotal: total,
    missingPart,
    shownMissingPart: missingPart,
    isCorrect: true,
    explanationAr,
    equationLayout,
    rightValue: rightPan.value,
    leftValue: leftPan.value,
    solutionValue,
    secondarySolutionValue,
    model,
  };
}

function generateJudgeEqualityExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as JudgeEqualityBlueprintParams;
  const operation: EquationOperation = params.operation ?? "add";
  const mode: JudgeEqualityMode =
    params.mode ??
    (params.judgementKind === "comparison-statement"
      ? "comparison-statement"
      : "whats-wrong");

  if (
    mode === "comparison-statement" ||
    params.judgementKind === "comparison-statement"
  ) {
    const catDefs = [
      {
        id: "cat",
        nameAr: "القطط",
        objectId: "cat",
        colorTheme: "coral" as ColorThemeId,
      },
      {
        id: "bird",
        nameAr: "الطيور",
        objectId: "bird",
        colorTheme: "sky" as ColorThemeId,
      },
      {
        id: "fish",
        nameAr: "الأسماك",
        objectId: "fish",
        colorTheme: "emerald" as ColorThemeId,
      },
    ];

    const availableCounts = ctx.rng.shuffle([3, 4, 5, 6, 7, 8]).slice(0, 3);
    const comparisonCategories: ComparisonCategoryItem[] = catDefs.map(
      (def, idx) => {
        const cnt = availableCounts[idx];
        return {
          id: def.id,
          nameAr: def.nameAr,
          count: cnt,
          countAr: formatEasternNumber(cnt),
          objectId: def.objectId,
          colorTheme: def.colorTheme,
        };
      }
    );

    const c0 = comparisonCategories[0];
    const c1 = comparisonCategories[1];
    const c2 = comparisonCategories[2];

    const stmts: ComparisonStatementItem[] = [];
    const notes: string[] = [];

    const s1IsMore = c0.count > c1.count;
    stmts.push({
      id: "stmt-1",
      statementAr: `عدد ${c0.nameAr} أكثر من عدد ${c1.nameAr}`,
      isCorrect: s1IsMore,
      explanationAr: s1IsMore
        ? `عدد ${c0.nameAr} (${c0.countAr}) أكثر من عدد ${c1.nameAr} (${c1.countAr})`
        : `عدد ${c0.nameAr} (${c0.countAr}) أقل من عدد ${c1.nameAr} (${c1.countAr})`,
    });
    notes.push(stmts[0].explanationAr);

    const s2IsMore = c1.count > c2.count;
    stmts.push({
      id: "stmt-2",
      statementAr: `عدد ${c1.nameAr} أقل من عدد ${c2.nameAr}`,
      isCorrect: !s2IsMore,
      explanationAr: !s2IsMore
        ? `عدد ${c1.nameAr} (${c1.countAr}) أقل من عدد ${c2.nameAr} (${c2.countAr})`
        : `عدد ${c1.nameAr} (${c1.countAr}) أكثر من عدد ${c2.nameAr} (${c2.countAr})`,
    });
    notes.push(stmts[1].explanationAr);

    const s3IsMore = c2.count > c0.count;
    stmts.push({
      id: "stmt-3",
      statementAr: `عدد ${c2.nameAr} أكثر من عدد ${c0.nameAr}`,
      isCorrect: s3IsMore,
      explanationAr: s3IsMore
        ? `عدد ${c2.nameAr} (${c2.countAr}) أكثر من عدد ${c0.nameAr} (${c0.countAr})`
        : `عدد ${c2.nameAr} (${c2.countAr}) أقل من عدد ${c0.nameAr} (${c0.countAr})`,
    });
    notes.push(stmts[2].explanationAr);

    const defaultPromptAr =
      "عدّ حيوانات كل فئة واكتب العدد، ثم حوّط العبارة الصحيحة واشطب غير الصحيحة:";
    const defaultStrategyHintAr = `عدّ كل فئة واكتب العدد في المربّع، ثم انظر إلى الأعداد للحكم على صحّة كل عبارة (${notes.join("؛ ")}).`;

    const data: JudgeEqualityData = {
      kind: "JudgeEquality",
      operation: "add",
      mode: "comparison-statement",
      modelKind: "equation",
      rows: [],
      comparisonCategories,
      comparisonStatements: stmts,
    };

    return {
      id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
      exerciseNumber: ctx.exerciseNumber,
      sectionId: ctx.sectionId,
      archetype: "JudgeEquality",
      difficultyLevel: ctx.difficultyLevel,
      sourceLessonId: ctx.sourceLessonId,
      titleAr: "أكثر أم أقل (ب)",
      promptAr: ctx.spec.promptAr ?? defaultPromptAr,
      strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
      visualModels: [],
      data,
    };
  }
  const modelKind: JudgeEqualityModelKind =
    params.modelKind ?? (mode === "balance" ? "balance-scale" : "equation");
  const rowCount = Math.max(1, Math.min(2, params.rowCount ?? 1));
  const defaultItemsPerRow = mode === "balance" ? 2 : 3;
  const itemsPerRow = Math.max(
    2,
    Math.min(3, params.itemCount ?? defaultItemsPerRow)
  );
  // Two-Expression pans appear only at Advanced or in Challenge & Assessment
  const allowTwoExpressionPans =
    Boolean(params.twoExpressionPans) &&
    (ctx.difficultyLevel === "Advanced" || ctx.sectionId === "challenge");

  const rows: JudgeEqualityRow[] = [];
  const allVisualModels: VisualModelSpec[] = [];
  const summaryNotes: string[] = [];
  const bankSolutions: number[] = [];

  for (let r = 0; r < rowCount; r++) {
    const rowRng = ctx.rng.fork(`row:${r}`);

    if (operation === "subtract") {
      const subFacts = selectSubtractionFacts(
        rowRng,
        ctx.difficultyLevel,
        {
          totalRange: params.totalRange ?? [2, 5],
          minPart: params.minPart ?? 1,
          count: itemsPerRow,
        },
        ctx.usedFacts
      );

      if (mode === "balance") {
        const items = subFacts.map((fact, idx) => {
          const item = buildSubtractionBalanceItem(
            fact,
            r,
            idx,
            allowTwoExpressionPans,
            bankSolutions,
            summaryNotes
          );
          allVisualModels.push(item.model);
          return item;
        });
        rows.push({ id: `judge-row-${r + 1}`, rowIndex: r, items });
        continue;
      }

      const wrongIndex = rowRng.int(0, subFacts.length - 1);
      const secondWrongIndex =
        mode === "true-false" && subFacts.length >= 3 && rowRng.int(0, 1) === 1
          ? (wrongIndex + 1) % subFacts.length
          : -1;

      const items: JudgeEqualityItem[] = subFacts.map((fact, idx) => {
        const isWrong = idx === wrongIndex || idx === secondWrongIndex;
        const { total, partTakenAway, missingPart } = fact;
        const minSubCandidate = Math.max(0, params.minPart ?? 1);
        const maxSubCandidate = Math.max(
          minSubCandidate + 1,
          Math.min(5, total)
        );
        const shownMissingPart = isWrong
          ? pickWrongValue(
              rowRng,
              missingPart,
              minSubCandidate,
              maxSubCandidate
            )
          : missingPart;

        const equationLayout: "standard" | "total-first" =
          mode === "true-false" && idx % 2 === 1 ? "total-first" : "standard";

        const totalAr = formatEasternNumber(total);
        const p1Ar = formatEasternNumber(partTakenAway);
        const missingAr = formatEasternNumber(missingPart);
        const shownMissingAr = formatEasternNumber(shownMissingPart);

        const explanationAr = isWrong
          ? `${totalAr} − ${p1Ar} = ${missingAr} وليس ${shownMissingAr}`
          : equationLayout === "total-first"
            ? `${missingAr} = ${totalAr} − ${p1Ar}`
            : `${totalAr} − ${p1Ar} = ${missingAr}`;

        if (mode === "true-false" || isWrong) {
          summaryNotes.push(explanationAr);
        }

        const model =
          modelKind === "number-bond"
            ? createNumberBondSpec({
                part1: partTakenAway,
                part2: shownMissingPart,
                total,
                missingPosition: "none",
                labelAr: `رابطة الأعداد: الكلّ ${totalAr} والجزآن ${p1Ar} و${shownMissingAr}`,
              })
            : createEquationStripSpec({
                operation: "subtract",
                total,
                part1: partTakenAway,
                part2: shownMissingPart,
                layout: equationLayout,
                missingPosition: "none",
                labelAr:
                  equationLayout === "total-first"
                    ? `معادلة طرح: ${shownMissingAr} = ${totalAr} − ${p1Ar}`
                    : `معادلة طرح: ${totalAr} − ${p1Ar} = ${shownMissingAr}`,
              });

        allVisualModels.push(model);

        return {
          id: `judge-row-${r + 1}-item-${idx + 1}`,
          itemIndex: idx,
          operation: "subtract",
          part1: partTakenAway,
          part2: shownMissingPart,
          shownTotal: total,
          realTotal: total,
          missingPart,
          shownMissingPart,
          isCorrect: !isWrong,
          explanationAr,
          equationLayout,
          rightValue:
            equationLayout === "total-first" ? shownMissingPart : missingPart,
          leftValue:
            equationLayout === "total-first" ? missingPart : shownMissingPart,
          model,
        };
      });

      rows.push({
        id: `judge-row-${r + 1}`,
        rowIndex: r,
        items,
      });
      continue;
    }

    const baseFacts = selectAdditionFacts(
      rowRng,
      ctx.difficultyLevel,
      {
        totalRange: params.totalRange ?? [2, 5],
        minPart: params.minPart ?? 1,
        count: itemsPerRow,
      },
      ctx.usedFacts
    );

    if (mode === "balance") {
      const items = baseFacts.map((fact, idx) => {
        const item = buildBalanceItem(
          fact,
          r,
          idx,
          bankSolutions,
          summaryNotes
        );
        allVisualModels.push(item.model);
        return item;
      });
      rows.push({ id: `judge-row-${r + 1}`, rowIndex: r, items });
      continue;
    }

    const wrongIndex = rowRng.int(0, baseFacts.length - 1);
    const secondWrongIndex =
      mode === "true-false" && baseFacts.length >= 3 && rowRng.int(0, 1) === 1
        ? (wrongIndex + 1) % baseFacts.length
        : -1;

    const items: JudgeEqualityItem[] = baseFacts.map((fact, idx) => {
      const isWrong = idx === wrongIndex || idx === secondWrongIndex;
      const { part1, part2, total: realTotal } = fact;
      const [minT, maxT] = params.totalRange ?? [2, 5];
      const shownTotal = isWrong
        ? pickWrongValue(rowRng, realTotal, minT, maxT)
        : realTotal;

      const equationLayout: "standard" | "total-first" =
        mode === "true-false" && idx % 2 === 1 ? "total-first" : "standard";

      const p1Ar = formatEasternNumber(part1);
      const p2Ar = formatEasternNumber(part2);
      const shownTotalAr = formatEasternNumber(shownTotal);
      const realTotalAr = formatEasternNumber(realTotal);

      const explanationAr = isWrong
        ? `${p1Ar} + ${p2Ar} = ${realTotalAr} وليس ${shownTotalAr}`
        : equationLayout === "total-first"
          ? `${realTotalAr} = ${p1Ar} + ${p2Ar}`
          : `${p1Ar} + ${p2Ar} = ${realTotalAr}`;

      if (mode === "true-false" || isWrong) {
        summaryNotes.push(explanationAr);
      }

      const model =
        modelKind === "number-bond"
          ? createNumberBondSpec({
              part1,
              part2,
              total: shownTotal,
              missingPosition: "none",
              labelAr: `رابطة الأعداد: ${p1Ar} و${p2Ar} والكلّ ${shownTotalAr}`,
            })
          : createEquationStripSpec({
              part1,
              part2,
              total: shownTotal,
              layout: equationLayout,
              missingPosition: "none",
              labelAr:
                equationLayout === "total-first"
                  ? `معادلة: ${shownTotalAr} = ${p1Ar} + ${p2Ar}`
                  : `معادلة: ${p1Ar} + ${p2Ar} = ${shownTotalAr}`,
            });

      allVisualModels.push(model);

      return {
        id: `judge-row-${r + 1}-item-${idx + 1}`,
        itemIndex: idx,
        operation: "add",
        part1,
        part2,
        shownTotal,
        realTotal,
        isCorrect: !isWrong,
        explanationAr,
        equationLayout,
        rightValue: equationLayout === "total-first" ? shownTotal : realTotal,
        leftValue: equationLayout === "total-first" ? realTotal : shownTotal,
        model,
      };
    });

    rows.push({
      id: `judge-row-${r + 1}`,
      rowIndex: r,
      items,
    });
  }

  let numberBank: number[] | undefined;
  if (mode === "balance") {
    const [minT, maxT] = params.totalRange ?? [2, 5];
    const distinct = Array.from(new Set(bankSolutions));
    for (let candidate = minT; candidate <= maxT; candidate++) {
      if (distinct.length >= 5) break;
      if (!distinct.includes(candidate)) {
        distinct.push(candidate);
      }
    }
    numberBank = ctx.rng.fork("bank").shuffle(distinct);
  }

  const defaultPromptAr =
    mode === "balance"
      ? "اختر عدداً لكل كفّة من بنك الأعداد، ثم اكتبه لتتساوى كفّتا الميزان:"
      : mode === "true-false"
        ? "انظر إلى كل معادلة، ثم اختر صح أو خطأ:"
        : modelKind === "number-bond"
          ? "انظر إلى روابط الأعداد في الصف، ثم اختر الرابطة غير الصحيحة بعلامة ✕:"
          : "انظر إلى المعادلات في الصف، ثم اختر المعادلة غير الصحيحة بعلامة ✕:";

  const defaultStrategyHintAr =
    operation === "subtract"
      ? mode === "balance"
        ? `اطرح لإيجاد قيمة الكفّة، ثم اكتب العدد المناسب من بنك الأعداد (${summaryNotes.join("؛ ")}).`
        : mode === "true-false"
          ? `اطرح الجزء من الكلّ في المعادلة، ثم اختر صح إذا تساوى الطرفان (${summaryNotes.join("؛ ")}).`
          : `اطرح الجزء من الكلّ في كل نموذج، ثم اختر غير الصحيح بعلامة ✕ (${summaryNotes.join("؛ ")}).`
      : mode === "balance"
        ? `عدّ الجزأين في الكفّة، ثم اكتب العدد المناسب من بنك الأعداد (${summaryNotes.join("؛ ")}).`
        : mode === "true-false"
          ? `عدّ الجزأين في المعادلة، ثم اختر صح إذا تساوى الطرفان (${summaryNotes.join("؛ ")}).`
          : `عدّ الجزأين في كل نموذج، ثم اختر غير الصحيح بعلامة ✕ (${summaryNotes.join("؛ ")}).`;

  const data: JudgeEqualityData = {
    kind: "JudgeEquality",
    operation,
    mode,
    modelKind,
    ...(numberBank ? { numberBank } : {}),
    rows,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "JudgeEquality",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr:
      mode === "balance"
        ? "توازن الكفّتين"
        : mode === "true-false"
          ? "صح أم خطأ"
          : "اختر غير الصحيح",
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

  if (
    data.mode === "comparison-statement" &&
    data.comparisonCategories &&
    data.comparisonStatements
  ) {
    return (
      <div
        className="space-y-2"
        data-archetype="JudgeEquality"
        data-judge-mode={data.mode}
      >
        <ExerciseColumns columns={1}>
          <div className="flex flex-col gap-3 py-1" dir="rtl">
            {/* Top: 3 animal count cards */}
            <div className="flex w-full items-center justify-around gap-3">
              {data.comparisonCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 bg-white p-1.5 px-3 shadow-2xs"
                  data-category-card={cat.id}
                >
                  <div className="flex items-center gap-2">
                    <EverydayObjectSvg objectId={cat.objectId} size="medium" />
                    <span className="text-[13px] font-extrabold text-slate-800">
                      {cat.nameAr}
                    </span>
                  </div>
                  {/* Icons row */}
                  <div className="flex min-h-[30px] max-w-[150px] flex-wrap items-center justify-center gap-1">
                    {Array.from({ length: cat.count }, (_, i) => (
                      <EverydayObjectSvg
                        key={i}
                        objectId={cat.objectId}
                        size="tiny"
                      />
                    ))}
                  </div>
                  {/* Count AnswerSlot */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="text-[13px] font-extrabold text-slate-700">
                      العدد:
                    </span>
                    <AnswerSlot
                      answer={cat.countAr}
                      solved={isAnswerKey}
                      kind="write"
                      ariaLabel={`مربع كتابة عدد ${cat.nameAr}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom: 3 comparison statements */}
            <div className="flex flex-col gap-2">
              {data.comparisonStatements.map((stmt) => {
                const chooseTrue = isAnswerKey && stmt.isCorrect;
                const chooseFalse = isAnswerKey && !stmt.isCorrect;
                return (
                  <div
                    key={stmt.id}
                    className={`flex items-center justify-between rounded-xl border-2 px-3 py-1.5 transition-all ${
                      isAnswerKey && !stmt.isCorrect
                        ? "border-rose-300 bg-rose-50/60"
                        : "border-slate-200 bg-white shadow-2xs"
                    }`}
                    data-statement-id={stmt.id}
                  >
                    <span className="text-[13px] font-extrabold text-slate-900">
                      {toEasternArabicNumerals(stmt.statementAr)}
                    </span>

                    <div className="flex items-center gap-2">
                      <span
                        data-tf-choice="true"
                        {...(chooseTrue
                          ? { "data-circled-choice": "true" }
                          : {})}
                        className={`inline-flex h-7 min-w-12 items-center justify-center rounded-full px-2.5 text-[13px] font-extrabold leading-none ${
                          chooseTrue
                            ? "border-2 border-emerald-700 bg-emerald-100 text-emerald-950 ring-2 ring-emerald-500"
                            : "border-2 border-dashed border-slate-300 bg-slate-50 text-slate-800"
                        }`}
                      >
                        صح
                      </span>
                      <span
                        data-tf-choice="false"
                        {...(chooseFalse
                          ? { "data-circled-choice": "false" }
                          : {})}
                        className={`inline-flex h-7 min-w-12 items-center justify-center rounded-full px-2.5 text-[13px] font-extrabold leading-none ${
                          chooseFalse
                            ? "border-2 border-rose-700 bg-rose-100 text-rose-950 ring-2 ring-rose-500"
                            : "border-2 border-dashed border-slate-300 bg-slate-50 text-slate-800"
                        }`}
                      >
                        خطأ
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ExerciseColumns>
      </div>
    );
  }

  return (
    <div
      className="space-y-1.5"
      data-archetype="JudgeEquality"
      data-judge-mode={data.mode}
      data-model-kind={data.modelKind}
    >
      {data.mode === "balance" &&
        data.numberBank &&
        data.numberBank.length > 0 && (
          <div
            dir="rtl"
            className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/60 px-3 py-1"
            data-number-bank="true"
          >
            <span className="text-[13px] font-extrabold leading-tight text-indigo-950">
              بنك الأعداد:
            </span>
            {data.numberBank.map((num, idx) => {
              const numAr = formatEasternNumber(num);
              return (
                <span
                  key={`${num}-${idx}`}
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border-2 border-indigo-400 bg-white px-2 text-[28px] font-black leading-none text-indigo-950 shadow-2xs"
                  data-bank-number={numAr}
                >
                  {numAr}
                </span>
              );
            })}
          </div>
        )}

      {data.rows.map((row) => {
        const cols = row.items.length === 2 ? 2 : 3;
        return (
          <div
            key={row.id}
            className="rounded-xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50/20 p-1 shadow-2xs"
            data-judge-row={toEasternArabicNumerals(row.id)}
          >
            <ExerciseColumns columns={cols}>
              {row.items.map((item, idx) => {
                const isFalseInAnswerKey =
                  data.mode === "whats-wrong" && isAnswerKey && !item.isCorrect;
                const chooseTrue =
                  data.mode === "true-false" && isAnswerKey && item.isCorrect;
                const chooseFalse =
                  data.mode === "true-false" && isAnswerKey && !item.isCorrect;

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
                    data-equation-layout={item.equationLayout ?? "standard"}
                    {...(isFalseInAnswerKey
                      ? { "data-crossed-off": "true" }
                      : {})}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
                        {formatEasternNumber(idx + 1)}
                      </span>
                      {data.mode === "whats-wrong" ? (
                        isFalseInAnswerKey ? (
                          <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[13px] font-extrabold leading-none text-white shadow-2xs">
                            ✕ غير صحيحة
                          </span>
                        ) : isAnswerKey ? (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
                            ✓ صحيحة
                          </span>
                        ) : null
                      ) : isAnswerKey ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
                          {toEasternArabicNumerals(item.explanationAr)}
                        </span>
                      ) : null}
                    </div>

                    <div className="relative flex w-full items-center justify-center py-0.5">
                      <VisualModelView
                        model={item.model}
                        solved={isAnswerKey}
                      />

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

                    {data.mode === "true-false" && (
                      <div
                        dir="rtl"
                        className="flex w-full items-center justify-center gap-3 pt-0.5"
                      >
                        <span
                          data-tf-choice="true"
                          {...(chooseTrue
                            ? { "data-circled-choice": "true" }
                            : {})}
                          className={`inline-flex h-8 min-w-16 items-center justify-center rounded-full px-3 text-[16px] font-extrabold leading-none ${
                            chooseTrue
                              ? "border-2 border-emerald-700 bg-emerald-100 text-emerald-950 ring-2 ring-emerald-500"
                              : "border-2 border-dashed border-slate-300 bg-slate-50 text-slate-800"
                          }`}
                        >
                          صح
                        </span>
                        <span
                          data-tf-choice="false"
                          {...(chooseFalse
                            ? { "data-circled-choice": "false" }
                            : {})}
                          className={`inline-flex h-8 min-w-16 items-center justify-center rounded-full px-3 text-[16px] font-extrabold leading-none ${
                            chooseFalse
                              ? "border-2 border-rose-700 bg-rose-100 text-rose-950 ring-2 ring-rose-500"
                              : "border-2 border-dashed border-slate-300 bg-slate-50 text-slate-800"
                          }`}
                        >
                          خطأ
                        </span>
                      </div>
                    )}

                    {isFalseInAnswerKey && (
                      <div className="w-full rounded-lg bg-rose-100/90 px-1.5 py-0.5 text-center text-[13px] font-extrabold leading-tight text-rose-950">
                        {toEasternArabicNumerals(item.explanationAr)}
                      </div>
                    )}
                  </div>
                );
              })}
            </ExerciseColumns>
          </div>
        );
      })}
    </div>
  );
}

registerExerciseArchetype({
  id: "JudgeEquality",
  displayNameAr: "صح أم خطأ",
  generate: generateJudgeEqualityExercise,
  render: renderJudgeEqualityExercise,
});
