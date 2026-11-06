import type { DifficultyLevel } from "@/domain/types";
import type { SeededRandom } from "@/lib/seed";

export interface AdditionFact {
  part1: number;
  part2: number;
  total: number;
  key: string;
}

export interface SubtractionFact {
  total: number;
  partTakenAway: number;
  missingPart: number;
  key: string;
}

export interface FactSelectionLimits {
  totalRange?: [number, number];
  minPart?: number;
  count: number;
}

function resolveFactBounds(
  difficultyLevel: DifficultyLevel,
  limits: FactSelectionLimits
): { minPart: number; minTotal: number; maxTotal: number } {
  const defaultMaxTotal = difficultyLevel === "Easy" ? 4 : 5;
  const defaultMinPart = difficultyLevel === "Advanced" ? 0 : 1;

  const minPart = limits.minPart ?? defaultMinPart;
  const minTotal = Math.max(
    minPart * 2,
    limits.totalRange ? limits.totalRange[0] : Math.max(2, minPart * 2)
  );
  const maxTotal = Math.min(
    5,
    limits.totalRange ? limits.totalRange[1] : defaultMaxTotal
  );

  return { minPart, minTotal, maxTotal };
}

function pickFromCandidates<T extends { key: string }>(
  rng: SeededRandom,
  candidates: T[],
  count: number,
  usedFacts?: Set<string>
): T[] {
  const shuffled = rng.shuffle(candidates);
  const unused: T[] = [];
  const used: T[] = [];

  for (const fact of shuffled) {
    if (usedFacts && usedFacts.has(fact.key)) {
      used.push(fact);
    } else {
      unused.push(fact);
    }
  }

  const orderedPool = [...unused, ...used];
  const picked: T[] = [];
  const exerciseSeen = new Set<string>();

  for (const fact of orderedPool) {
    if (picked.length >= count) break;
    if (exerciseSeen.has(fact.key)) continue;
    exerciseSeen.add(fact.key);
    picked.push(fact);
    usedFacts?.add(fact.key);
  }

  return picked;
}

/**
 * Selects `count` addition facts within `[minTotal, maxTotal]` with `part >= minPart`.
 * - No fact repeats within one Exercise.
 * - Across the sheet (`usedFacts`), unused facts come first; repeats are allowed only once the pool is used up.
 * - `3 + 2` and `2 + 3` have distinct keys (`"3+2"` vs `"2+3"`) and are different facts (§7.3).
 */
export function selectAdditionFacts(
  rng: SeededRandom,
  difficultyLevel: DifficultyLevel,
  limits: FactSelectionLimits,
  usedFacts?: Set<string>
): AdditionFact[] {
  const { minPart, minTotal, maxTotal } = resolveFactBounds(
    difficultyLevel,
    limits
  );

  const candidates: AdditionFact[] = [];
  for (let total = minTotal; total <= maxTotal; total++) {
    for (let part1 = minPart; part1 <= total - minPart; part1++) {
      const part2 = total - part1;
      if (part2 < minPart) continue;
      candidates.push({
        part1,
        part2,
        total,
        key: `${part1}+${part2}`,
      });
    }
  }

  return pickFromCandidates(rng, candidates, limits.count, usedFacts);
}

/**
 * Selects `count` subtraction facts (`total - partTakenAway = missingPart`) within `[minTotal, maxTotal]`
 * with both `partTakenAway >= minPart` and `missingPart >= minPart`.
 * - No fact repeats within one Exercise.
 * - Across the sheet (`usedFacts`), unused facts come first; repeats are allowed only once the pool is used up.
 * - `5 - 2` and `5 - 3` have distinct keys (`"5-2"` vs `"5-3"`) and are different facts (§7.3).
 */
export function selectSubtractionFacts(
  rng: SeededRandom,
  difficultyLevel: DifficultyLevel,
  limits: FactSelectionLimits,
  usedFacts?: Set<string>
): SubtractionFact[] {
  const { minPart, minTotal, maxTotal } = resolveFactBounds(
    difficultyLevel,
    limits
  );

  const candidates: SubtractionFact[] = [];
  for (let total = minTotal; total <= maxTotal; total++) {
    for (
      let partTakenAway = minPart;
      partTakenAway <= total - minPart;
      partTakenAway++
    ) {
      const missingPart = total - partTakenAway;
      if (missingPart < minPart) continue;
      candidates.push({
        total,
        partTakenAway,
        missingPart,
        key: `${total}-${partTakenAway}`,
      });
    }
  }

  return pickFromCandidates(rng, candidates, limits.count, usedFacts);
}
