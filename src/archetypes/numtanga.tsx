import React from "react";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import { VisualModelView } from "@/visual-models/registry";
import type {
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";
import { COLOR_PAIRS } from "@/lib/part-whole-facts";
import {
  createNumtangaGridSpec,
  type NumtangaGridCellKey,
} from "@/visual-models/unit-7-models";

export type NumtangaBlankPosition = "top" | "midRight" | "midLeft";

export interface NumtangaBlueprintParams {
  /** Pyramids per exercise (1–2); two grids fill the 660 px card width exactly. */
  pyramidCount?: number;
  /** Blank Answer Slots per pyramid (0–3); positions are seed-random among the middle/top cells. */
  blankCount?: number;
  /** Cap on every sum in the pyramid; the standard allows sums ≤ 10. */
  maxTotal?: number;
  /** Smallest possible given value in the bottom row. */
  minCell?: number;
}

export interface NumtangaCellData {
  value: number;
  valueAr: string;
  blank: boolean;
}

export interface NumtangaPyramidData {
  id: string;
  pyramidIndex: number;
  cells: Record<NumtangaGridCellKey, NumtangaCellData>;
  /** The blank cells in the order the student fills them (bottom-up). */
  blankKeys: NumtangaGridCellKey[];
  factKeys: string[];
  topValue: number;
  topValueAr: string;
  solvedFactsAr: string[];
  gridModel: VisualModelSpec;
}

export interface NumtangaData extends GenericArchetypeData {
  kind: "Numtanga";
  maxTotal: number;
  maxTotalAr: string;
  pyramids: NumtangaPyramidData[];
}

const BLANK_CHOICE_POOL: NumtangaBlankPosition[] = [
  "top",
  "midRight",
  "midLeft",
];

interface BottomTripleCandidate {
  bottomLeft: number;
  bottomMiddle: number;
  bottomRight: number;
  keys: string[];
  usedCount: number;
}

/** Every addition fact this pyramid carries, right-hand cell first (§9.3). */
function pyramidFactKeys(cells: {
  bottomLeft: number;
  bottomMiddle: number;
  bottomRight: number;
}): string[] {
  const midRight = cells.bottomRight + cells.bottomMiddle;
  const midLeft = cells.bottomMiddle + cells.bottomLeft;
  const top = midRight + midLeft;
  return [
    `${cells.bottomRight}+${cells.bottomMiddle}`,
    `${cells.bottomMiddle}+${cells.bottomLeft}`,
    `${midRight}+${midLeft}`,
  ];
}

function sampleBottomTriple(
  pyrRng: ArchetypeGeneratorContext["rng"],
  minCell: number,
  maxTotal: number
): BottomTripleCandidate | null {
  for (let attempt = 0; attempt < 200; attempt++) {
    // Every cell ≤ maxTotal, including the top: given bottomMiddle, the two
    // side cells share the remaining budget, so each is capped to its half.
    const maxMiddle = Math.floor((maxTotal - 2 * minCell) / 2);
    if (maxMiddle < minCell) return null;
    const bottomMiddle = pyrRng.int(minCell, maxMiddle);
    const maxSide = Math.floor((maxTotal - 2 * bottomMiddle) / 2);
    if (maxSide < minCell) continue;
    const bottomRight = pyrRng.int(minCell, maxSide);
    const bottomLeft = pyrRng.int(minCell, maxSide);
    // All-equal bottoms duplicate an ordered fact key within the pyramid
    // (e.g. 1+1 / 1+1) — reject (§7.3).
    if (bottomRight === bottomMiddle && bottomMiddle === bottomLeft) continue;

    const keys = pyramidFactKeys({ bottomLeft, bottomMiddle, bottomRight });
    if (new Set(keys).size !== keys.length) continue;

    return { bottomLeft, bottomMiddle, bottomRight, keys, usedCount: 0 };
  }
  return null;
}

function pickBottomTriple(
  pyrRng: ArchetypeGeneratorContext["rng"],
  minCell: number,
  maxTotal: number,
  exerciseUsedKeys: Set<string>,
  usedFacts?: Set<string>
): BottomTripleCandidate {
  const candidates: BottomTripleCandidate[] = [];
  for (let i = 0; i < 24 && candidates.length < 12; i++) {
    const candidate = sampleBottomTriple(pyrRng, minCell, maxTotal);
    if (!candidate) break;
    const keySet = new Set(candidate.keys);
    if (
      candidate.keys.some((key) => exerciseUsedKeys.has(key)) ||
      new Set(candidate.keys).size !== candidate.keys.length
    ) {
      continue;
    }
    candidate.usedCount = candidate.keys.filter((key) =>
      usedFacts?.has(key)
    ).length;
    candidates.push(candidate);
  }

  if (candidates.length > 0) {
    // §7.3 — across the sheet, unused facts come first: prefer candidates whose
    // keys are all unseen, otherwise the least-used candidate.
    const clean = candidates.filter((c) => c.usedCount === 0);
    const pool = clean.length > 0 ? clean : candidates;
    return pool.reduce((best, cur) =>
      cur.usedCount < best.usedCount ? cur : best
    );
  }

  // Deterministic fallback for degenerate cases (1+3+1 keeps every sum ≤ 8,
  // with distinct ordered fact keys).
  const fallback = { bottomLeft: 1, bottomMiddle: 2, bottomRight: 1 };
  return {
    ...fallback,
    keys: pyramidFactKeys(fallback),
    usedCount: 0,
  };
}

export function buildNumtangaData(
  ctx: ArchetypeGeneratorContext,
  rawParams?: NumtangaBlueprintParams
): NumtangaData {
  const params = rawParams ?? {};
  const pyramidCount = Math.max(1, Math.min(2, params.pyramidCount ?? 2));
  const blankCount = Math.max(0, Math.min(3, params.blankCount ?? 1));
  const maxTotal = Math.max(4, Math.min(10, params.maxTotal ?? 10));
  const minCell = Math.max(0, params.minCell ?? 1);

  const exerciseUsedKeys = new Set<string>();
  const pyramids: NumtangaPyramidData[] = [];

  for (let idx = 0; idx < pyramidCount; idx++) {
    const pyrRng = ctx.rng.fork(`pyramid:${idx}`);
    const colorTheme = COLOR_PAIRS[idx % COLOR_PAIRS.length][0];

    const triple = pickBottomTriple(
      pyrRng,
      minCell,
      maxTotal,
      exerciseUsedKeys,
      ctx.usedFacts
    );

    const midRight = triple.bottomRight + triple.bottomMiddle;
    const midLeft = triple.bottomMiddle + triple.bottomLeft;
    const top = midRight + midLeft;

    // Seed-random blank positions among the middle/top cells; every blank
    // solves by pure addition because the bottom row stays given.
    const blankKeys = pyrRng.shuffle(BLANK_CHOICE_POOL).slice(0, blankCount);
    const blankSet = new Set<NumtangaBlankPosition>(blankKeys);

    const values: Record<NumtangaGridCellKey, number> = {
      top,
      midRight,
      midLeft,
      bottomRight: triple.bottomRight,
      bottomMiddle: triple.bottomMiddle,
      bottomLeft: triple.bottomLeft,
    };

    const cells = Object.fromEntries(
      (Object.keys(values) as NumtangaGridCellKey[]).map((key) => [
        key,
        {
          value: values[key],
          valueAr: formatEasternNumber(values[key]),
          blank: blankSet.has(key as NumtangaBlankPosition),
        },
      ])
    ) as Record<NumtangaGridCellKey, NumtangaCellData>;

    // Blank cells fill bottom-up: middles first (right to left), then the top.
    const orderedBlankKeys: NumtangaGridCellKey[] = (
      ["midRight", "midLeft", "top"] as const
    ).filter((key) => blankSet.has(key));

    const solvedFactsAr = orderedBlankKeys.map((key) => {
      if (key === "midRight") {
        return `${cells.bottomRight.valueAr} + ${cells.bottomMiddle.valueAr} = ${cells.midRight.valueAr}`;
      }
      if (key === "midLeft") {
        return `${cells.bottomLeft.valueAr} + ${cells.bottomMiddle.valueAr} = ${cells.midLeft.valueAr}`;
      }
      return `${cells.midLeft.valueAr} + ${cells.midRight.valueAr} = ${cells.top.valueAr}`;
    });

    for (const key of triple.keys) exerciseUsedKeys.add(key);

    const gridModel = createNumtangaGridSpec({
      cells: values,
      blanks: blankKeys,
      colorTheme,
      labelAr: `نمتنغا: كلّ مربّع أعلى هو مجموع القيمتين المتجاورتين (${formatEasternNumber(top)})`,
    });

    pyramids.push({
      id: `numtanga-pyramid-${idx + 1}-${triple.bottomRight}-${triple.bottomMiddle}-${triple.bottomLeft}`,
      pyramidIndex: idx,
      cells,
      blankKeys: orderedBlankKeys,
      factKeys: triple.keys,
      topValue: top,
      topValueAr: formatEasternNumber(top),
      solvedFactsAr,
      gridModel,
    });
  }

  for (const pyramid of pyramids) {
    for (const key of pyramid.factKeys) ctx.usedFacts?.add(key);
  }

  return {
    kind: "Numtanga",
    maxTotal,
    maxTotalAr: formatEasternNumber(maxTotal),
    pyramids,
  };
}

export function generateNumtangaExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as NumtangaBlueprintParams;
  const data = buildNumtangaData(ctx, params);

  const solvedSummaryAr = data.pyramids
    .flatMap((pyramid) =>
      pyramid.blankKeys.length > 0
        ? pyramid.solvedFactsAr
        : [
            `${pyramid.cells.midRight.valueAr} + ${pyramid.cells.midLeft.valueAr} = ${pyramid.topValueAr}`,
          ]
    )
    .join("؛ ");

  const hasBlanks = data.pyramids.some(
    (pyramid) => pyramid.blankKeys.length > 0
  );

  const defaultPromptAr = hasBlanks
    ? "انظر إلى بطاقات نمتنغا في كلّ صف، ثم اكتب قيمة كلّ مربّع فارغ بجمع القيمتين المتجاورتين:"
    : "انظر إلى بطاقات نمتنغا في كلّ صف، ثم اقرأ قيمة كلّ مربّع بجمع القيمتين المتجاورتين:";

  const authoredHintAr = ctx.spec.strategyHintAr?.trim();
  const summaryHintAr = `اجمع قيمة أيّ بطاقتين متجاورتين، ثم اكتب ناتج الجمع في المربّع الأعلى منها (${solvedSummaryAr})`;
  const strategyHintAr = authoredHintAr
    ? authoredHintAr.includes("(")
      ? authoredHintAr
      : `${authoredHintAr} (${solvedSummaryAr})`
    : summaryHintAr;

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "Numtanga",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "اجمع القيم المتجاورة في نمتنغا",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr,
    visualModels: data.pyramids.map((pyramid) => pyramid.gridModel),
    data,
  };
}

function PyramidBlock({
  pyramid,
  label,
  isAnswerKey,
}: {
  pyramid: NumtangaPyramidData;
  label: string;
  isAnswerKey: boolean;
}): React.ReactElement {
  return (
    <div
      data-numtanga-pyramid={pyramid.id}
      data-numtanga-blank-keys={pyramid.blankKeys.join(",")}
      className="flex flex-col items-center gap-1"
    >
      <div className="flex w-full items-center justify-between px-1">
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
          {label}
        </span>
        {isAnswerKey && (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
            ✓ القيمة العلوية {pyramid.topValueAr}
          </span>
        )}
      </div>
      <VisualModelView model={pyramid.gridModel} solved={isAnswerKey} />
    </div>
  );
}

export function renderNumtangaExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as NumtangaData;
  const isAnswerKey = mode === "answer-key";

  return (
    <div
      data-archetype="Numtanga"
      data-numtanga-blank-count={formatEasternNumber(
        data.pyramids.reduce((sum, p) => sum + p.blankKeys.length, 0)
      )}
      data-numtanga-max-total={data.maxTotalAr}
    >
      {data.pyramids.length === 2 ? (
        <ExerciseColumns columns={2}>
          {data.pyramids.map((pyramid, idx) => (
            <PyramidBlock
              key={pyramid.id}
              pyramid={pyramid}
              label={formatEasternNumber(idx + 1)}
              isAnswerKey={isAnswerKey}
            />
          ))}
        </ExerciseColumns>
      ) : (
        <ExerciseColumns columns={1}>
          <div dir="rtl" className="flex w-full items-center justify-center">
            <div className="w-[324px]">
              <PyramidBlock
                pyramid={data.pyramids[0]}
                label={formatEasternNumber(1)}
                isAnswerKey={isAnswerKey}
              />
            </div>
          </div>
        </ExerciseColumns>
      )}
    </div>
  );
}

registerExerciseArchetype({
  id: "Numtanga",
  displayNameAr: "نمتنغا",
  generate: generateNumtangaExercise,
  render: renderNumtangaExercise,
});
