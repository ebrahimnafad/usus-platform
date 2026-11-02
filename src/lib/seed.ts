export interface SeededRandom {
  /** Deterministic float in [0, 1) */
  next(): number;
  /** Deterministic integer in [min, max] inclusive */
  int(min: number, max: number): number;
  /** Deterministic pick of a single element */
  pickOne<T>(items: readonly T[]): T;
  /** Deterministic non-repeating pick of `count` elements */
  pickN<T>(items: readonly T[], count: number): T[];
  /** Deterministic Fisher-Yates shuffle returning a new array */
  shuffle<T>(items: readonly T[]): T[];
  /**
   * Deterministic shuffle that avoids leaving all items in the same positions
   * when length >= 2 (useful for ConnectMatch columns).
   */
  derange<T>(items: readonly T[]): T[];
  /** Creates an independent child PRNG seeded from the current seed + subKey */
  fork(subKey: string | number): SeededRandom;
}

/**
 * FNV-1a 32-bit string hash.
 */
export function hashSeedString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Creates a pure, deterministic Mulberry32 PRNG from a human-readable seed string.
 */
export function createSeededRandom(seed: string): SeededRandom {
  const normalizedSeed = String(seed || "DEFAULT-SEED");
  let state = hashSeedString(normalizedSeed) || 0x6d2b79f5;

  const next = (): number => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const int = (min: number, max: number): number => {
    const low = Math.ceil(Math.min(min, max));
    const high = Math.floor(Math.max(min, max));
    return Math.floor(next() * (high - low + 1)) + low;
  };

  const shuffle = <T>(items: readonly T[]): T[] => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  };

  const derange = <T>(items: readonly T[]): T[] => {
    if (items.length <= 1) return [...items];
    const shuffled = shuffle(items);
    const allSame = shuffled.every((item, idx) => item === items[idx]);
    if (allSame) {
      // Rotate by 1 position deterministically so it never matches 1:1 row-for-row
      const first = shuffled.shift()!;
      shuffled.push(first);
    }
    return shuffled;
  };

  const pickOne = <T>(items: readonly T[]): T => {
    if (items.length === 0) {
      throw new Error("Cannot pickOne from an empty array");
    }
    return items[Math.floor(next() * items.length)];
  };

  const pickN = <T>(items: readonly T[], count: number): T[] => {
    const shuffled = shuffle(items);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  };

  const fork = (subKey: string | number): SeededRandom => {
    return createSeededRandom(`${normalizedSeed}::${subKey}`);
  };

  return {
    next,
    int,
    pickOne,
    pickN,
    shuffle,
    derange,
    fork,
  };
}
