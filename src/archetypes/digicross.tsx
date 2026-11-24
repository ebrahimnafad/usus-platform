import React from "react";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";
import { VisualModelView } from "@/visual-models/registry";
import type {
  ColorThemeId,
  Exercise,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";
import { COLOR_PAIRS } from "@/lib/part-whole-facts";
import {
  createDigicrossGridSpec,
  digicrossCellKey,
  type DigicrossCellKey,
} from "@/visual-models/unit-8-models";

/**
 * Digicross (GLOSSARY.md → Digicross, ديجيكروس) — a 3×3 number grid where every
 * row and every column is a consecutive counting sequence stepped by 1.
 *
 * Domain model: every grid that satisfies that rule is an affine counting
 * model g(r, c) = T + x·r + y·c with (x, y) ∈ {+1, −1}², where x is the
 * top-to-bottom column step and y is the right-to-left row step (§9.3).
 * `directions` maps to those sign pairs:
 *   forward  → (+1, +1): rows and columns count up in reading order
 *   backward → (−1, −1): rows and columns count down in reading order
 *   mixed    → one axis counts up and the other counts down (seed-random)
 *
 * Exactly one solution: rows read right to left and columns top to bottom, so
 * a blank is filled by following a line's sequence. Uniqueness is guaranteed
 * by placing blanks only in provably per-line-anchored patterns and then
 * brute-verifying that exactly one of the ≤ 40 in-range counting models fits
 * every visible cell (retry on failure).
 */

export type DigicrossDirections = "forward" | "backward" | "mixed";

export interface DigicrossBlueprintParams {
  /** Inclusive bounds for every grid value; defaults to [1, 10]. */
  numberRange?: [number, number];
  /** Blank Answer Slots per grid (1–5); difficulty default 2 / 3 / 4. */
  missingCount?: number;
  /** Line direction: forward, backward, or one axis each (mixed). */
  directions?: DigicrossDirections;
  /** Grids per exercise (1–2); two fill the 660 px card width exactly. */
  gridCount?: number;
}

export interface DigicrossCellData {
  row: number;
  col: number;
  value: number;
  valueAr: string;
  blank: boolean;
}

export interface DigicrossGridData {
  id: string;
  gridIndex: number;
  cells: DigicrossCellData[];
  /** Blank cell keys (`"r-c"`) in fill order (row-major reading order §9.3). */
  blanks: DigicrossCellKey[];
  colorTheme: ColorThemeId;
  gridModel: VisualModelSpec;
}

export interface DigicrossData extends GenericArchetypeData {
  kind: "Digicross";
  numberRangeMin: number;
  numberRangeMax: number;
  missingCount: number;
  directions: DigicrossDirections;
  grids: DigicrossGridData[];
}

const MAX_MISSING = 5;

const MIXED_SIGNS: Array<{ x: 1 | -1; y: 1 | -1 }> = [
  { x: 1, y: -1 },
  { x: -1, y: 1 },
];

const DIRECTION_SIGNS: Record<
  DigicrossDirections,
  Array<{ x: 1 | -1; y: 1 | -1 }>
> = {
  forward: [{ x: 1, y: 1 }],
  backward: [{ x: -1, y: -1 }],
  mixed: MIXED_SIGNS,
};

const FALLBACK_BLANKS: Record<number, DigicrossCellKey[]> = {
  1: ["0-0"],
  2: ["1-0", "1-1"],
  3: ["1-0", "1-1", "1-2"],
  4: ["1-0", "1-1", "1-2", "2-0"],
  5: ["1-0", "1-1", "1-2", "0-0", "0-1"],
};

/** All nine values implied by a counting model, flattened row-major. */
function modelValues(
  T: number,
  x: number,
  y: number
): Array<{ row: number; col: number; value: number }> {
  const values: Array<{ row: number; col: number; value: number }> = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      values.push({ row: r, col: c, value: T + x * r + y * c });
    }
  }
  return values;
}

/** Count how many in-range counting models agree with every visible cell. */
function countFittingModels(
  visible: Map<string, number>,
  minV: number,
  maxV: number
): number {
  let fitting = 0;
  for (const { x, y } of [
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: -1, y: -1 },
  ]) {
    for (let T = minV; T <= maxV; T++) {
      let fits = true;
      for (const value of modelValues(T, x, y)) {
        if (value.value < minV || value.value > maxV) {
          fits = false;
          break;
        }
        const visibleValue = visible.get(digicrossCellKey(value));
        if (visibleValue !== undefined && visibleValue !== value.value) {
          fits = false;
          break;
        }
      }
      if (fits) fitting++;
    }
  }
  return fitting;
}

interface GridSampling {
  values: Array<Array<number>>;
  signer: { x: 1 | -1; y: 1 | -1 };
  T: number;
  minV: number;
  maxV: number;
}

function sampleGridValues(
  gridRng: ArchetypeGeneratorContext["rng"],
  directions: DigicrossDirections,
  rangeMin: number,
  rangeMax: number
): GridSampling {
  let minV = Math.max(1, rangeMin);
  let maxV = Math.min(20, rangeMax);

  const signer =
    directions === "mixed"
      ? gridRng.pickOne(MIXED_SIGNS)
      : DIRECTION_SIGNS[directions][0];

  const { x, y } = signer;
  const minOffset = Math.min(0, 2 * x) + Math.min(0, 2 * y);
  const maxOffset = Math.max(0, 2 * x) + Math.max(0, 2 * y);
  let lo = Math.max(minV, minV - minOffset);
  let hi = Math.min(maxV, maxV - maxOffset);

  if (lo > hi) {
    // Degenerate range narrower than a line span: centre it and widen the
    // effective range just enough to host one valid counting model.
    const mid = Math.round((minV + maxV) / 2);
    minV = mid + minOffset;
    maxV = mid + maxOffset;
    lo = minV - minOffset;
    hi = maxV - maxOffset;
  }

  const T = gridRng.int(lo, hi);
  return { values: [], signer, T, minV, maxV };
}

function buildModel(
  gridRng: ArchetypeGeneratorContext["rng"],
  directions: DigicrossDirections,
  rangeMin: number,
  rangeMax: number
) {
  const { signer, T, minV, maxV } = sampleGridValues(
    gridRng,
    directions,
    rangeMin,
    rangeMax
  );
  const { x, y } = signer;
  const grid = modelValues(T, x, y).map((cell) => cell.value);
  return { grid, signer, T, minV, maxV };
}

/** Value at (row, col) from a flat row-major grid. */
function valueAt(grid: number[], row: number, col: number): number {
  return grid[row * 3 + col];
}

/** Reads a blank-key list back into row-major reading order (§9.3). */
function sortBlankKeysRowMajor(keys: DigicrossCellKey[]): DigicrossCellKey[] {
  return [...keys].sort((a, b) => {
    const [ar, ac] = a.split("-").map(Number);
    const [br, bc] = b.split("-").map(Number);
    return ar - br || ac - bc;
  });
}

function sampleBlankPattern(
  gridRng: ArchetypeGeneratorContext["rng"],
  missingCount: number
): DigicrossCellKey[] {
  if (missingCount <= 3) {
    // All blanks inside a single row; the other rows anchor its base.
    const row = gridRng.int(0, 2);
    const cols = gridRng.shuffle([0, 1, 2]).slice(0, missingCount);
    return cols.map((c) => `${row}-${c}`);
  }

  if (missingCount === 4) {
    // One row fully blank + one extra blank in a different row.
    const fullRow = gridRng.int(0, 2);
    const otherRow = (fullRow + gridRng.int(1, 2)) % 3;
    const extraCol = gridRng.int(0, 2);
    return [
      ...[0, 1, 2].map((c) => `${fullRow}-${c}`),
      `${otherRow}-${extraCol}`,
    ];
  }

  // missingCount === 5: one row fully blank + a second row keeps exactly one
  // given cell, which anchors the third row through a shared column.
  const fullRow = gridRng.int(0, 2);
  const otherRow = (fullRow + gridRng.int(1, 2)) % 3;
  const keptCol = gridRng.int(0, 2);
  return [
    ...[0, 1, 2].map((c) => `${fullRow}-${c}`),
    ...[0, 1, 2].filter((c) => c !== keptCol).map((c) => `${otherRow}-${c}`),
  ];
}

function chooseBlankPattern(
  gridRng: ArchetypeGeneratorContext["rng"],
  grid: number[],
  missingCount: number,
  minV: number,
  maxV: number
): DigicrossCellKey[] {
  const visible = new Map<string, number>();
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      visible.set(`${r}-${c}`, valueAt(grid, r, c));
    }
  }

  for (let attempt = 0; attempt < 80; attempt++) {
    const blanks = sampleBlankPattern(gridRng, missingCount);
    const visibleCells = new Map(visible);
    for (const key of blanks) visibleCells.delete(key);
    if (countFittingModels(visibleCells, minV, maxV) === 1) {
      return sortBlankKeysRowMajor(blanks);
    }
  }

  // Deterministic, provably unique fallback per blank count.
  return FALLBACK_BLANKS[missingCount] ?? FALLBACK_BLANKS[1];
}

export function buildDigicrossData(
  ctx: ArchetypeGeneratorContext,
  rawParams?: DigicrossBlueprintParams
): DigicrossData {
  const params = rawParams ?? {};
  const gridCount = Math.max(1, Math.min(2, params.gridCount ?? 1));
  const [rangeMinRaw, rangeMaxRaw] = params.numberRange ?? [1, 10];
  const rangeMin = Math.max(
    1,
    Math.min(16, Math.min(rangeMinRaw, rangeMaxRaw))
  );
  const rangeMax = Math.max(
    rangeMin + 4,
    Math.min(20, Math.max(rangeMinRaw, rangeMaxRaw))
  );

  const defaultMissing =
    ctx.difficultyLevel === "Easy"
      ? 2
      : ctx.difficultyLevel === "Intermediate"
        ? 3
        : 4;
  const missingCount = Math.max(
    1,
    Math.min(MAX_MISSING, params.missingCount ?? defaultMissing)
  );
  const directions: DigicrossDirections = params.directions ?? "mixed";

  const grids: DigicrossGridData[] = [];

  for (let idx = 0; idx < gridCount; idx++) {
    const gridRng = ctx.rng.fork(`grid:${idx}`);
    const colorTheme = COLOR_PAIRS[idx % COLOR_PAIRS.length][0];

    const model = buildModel(gridRng, directions, rangeMin, rangeMax);
    const grid = model.grid;
    const blanks = sortBlankKeysRowMajor(
      chooseBlankPattern(
        gridRng.fork("pattern"),
        grid,
        missingCount,
        model.minV,
        model.maxV
      )
    );

    const cells: DigicrossCellData[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const value = valueAt(grid, r, c);
        cells.push({
          row: r,
          col: c,
          value,
          valueAr: formatEasternNumber(value),
          blank: blanks.includes(`${r}-${c}`),
        });
      }
    }

    const gridModel = createDigicrossGridSpec({
      cells: cells.map((cell) => ({
        row: cell.row,
        col: cell.col,
        value: cell.value,
        blank: cell.blank,
      })),
      blanks,
      colorTheme,
      labelAr: `شبكة ديجيكروس ${formatEasternNumber(idx + 1)}`,
      id: `digicross-grid-${idx + 1}-${grid.join("-")}-${blanks.join(",")}`,
    });

    grids.push({
      id: gridModel.id,
      gridIndex: idx,
      cells,
      blanks,
      colorTheme,
      gridModel,
    });
  }

  // The reported range is the parameter range widened only for degenerate
  // inputs, so every grid value always stays inside it.
  const allValues = grids.flatMap((grid) =>
    grid.cells.map((cell) => cell.value)
  );
  const numberRangeMin = Math.min(rangeMin, ...allValues);
  const numberRangeMax = Math.max(rangeMax, ...allValues);

  return {
    kind: "Digicross",
    numberRangeMin,
    numberRangeMax,
    missingCount,
    directions,
    grids,
  };
}

export function generateDigicrossExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as DigicrossBlueprintParams;
  const data = buildDigicrossData(ctx, params);

  const missingValuesAr = data.grids
    .flatMap((grid) =>
      grid.blanks.map((key) => {
        const [r, c] = key.split("-").map(Number);
        return grid.cells[r * 3 + c].valueAr;
      })
    )
    .join("، ");

  const blankCount = data.grids.reduce(
    (sum, grid) => sum + grid.blanks.length,
    0
  );

  const defaultPromptAr = `انظر إلى شبكة ديجيكروس، ثم حدّد اتجاه كلّ صفّ وعمود واكتب الرقم المفقود في كلّ مربّع فارغ:`;
  const defaultStrategyHintAr = `انظر إلى الخانات المملوءة في كلّ صفّ وعمود لمعرفة إن كانت المتتالية تزيد أو تنقص بمقدار ١، ثم املأ الفراغ بالعدد التالي فيها (الحل: القيم المفقودة هي ${missingValuesAr}).`;

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "Digicross",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "املأ الفراغات في شبكة ديجيكروس",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels: data.grids.map((grid) => grid.gridModel),
    data,
  };
}

function GridBlock({
  grid,
  label,
  isAnswerKey,
}: {
  grid: DigicrossGridData;
  label: string;
  isAnswerKey: boolean;
}): React.ReactElement {
  const solvedValuesAr = grid.blanks
    .map((key) => {
      const [r, c] = key.split("-").map(Number);
      return grid.cells[r * 3 + c].valueAr;
    })
    .join("، ");

  return (
    <div
      data-digicross-grid={grid.id}
      data-digicross-blank-keys={grid.blanks.join(",")}
      className="flex flex-col items-center gap-1"
    >
      <div className="flex w-full items-center justify-between px-1">
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[13px] font-extrabold leading-none text-white">
          {label}
        </span>
        {isAnswerKey && (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[13px] font-extrabold leading-none text-emerald-900">
            ✓ القيم الناقصة {solvedValuesAr}
          </span>
        )}
      </div>
      <VisualModelView model={grid.gridModel} solved={isAnswerKey} />
    </div>
  );
}

export function renderDigicrossExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as DigicrossData;
  const isAnswerKey = mode === "answer-key";
  const blankCount = data.grids.reduce(
    (sum, grid) => sum + grid.blanks.length,
    0
  );

  return (
    <div
      data-archetype="Digicross"
      data-digicross-directions={data.directions}
      data-digicross-missing-count={formatEasternNumber(blankCount)}
      data-digicross-range={`${formatEasternNumber(
        data.numberRangeMin
      )}-${formatEasternNumber(data.numberRangeMax)}`}
    >
      {data.grids.length === 2 ? (
        <ExerciseColumns columns={2}>
          {data.grids.map((grid, idx) => (
            <GridBlock
              key={grid.id}
              grid={grid}
              label={formatEasternNumber(idx + 1)}
              isAnswerKey={isAnswerKey}
            />
          ))}
        </ExerciseColumns>
      ) : (
        <ExerciseColumns columns={1}>
          <div dir="rtl" className="flex w-full items-center justify-center">
            <div className="w-[324px]">
              <GridBlock
                grid={data.grids[0]}
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
  id: "Digicross",
  displayNameAr: "شبكة ديجيكروس",
  generate: generateDigicrossExercise,
  render: renderDigicrossExercise,
});
