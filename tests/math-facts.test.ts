import { describe, expect, it } from "vitest";
import {
  COLOR_PAIRS,
  formatAdditionFactKey,
  formatSubtractionFactKey,
  selectAdditionFacts,
  selectSubtractionFacts,
} from "@/lib/math-facts";
import { createSeededRandom } from "@/lib/seed";

describe("math-facts — arithmetic fact engine seam", () => {
  it("provides valid contrasting COLOR_PAIRS", () => {
    expect(COLOR_PAIRS.length).toBeGreaterThanOrEqual(4);
    for (const [primary, secondary] of COLOR_PAIRS) {
      expect(primary).toBeTruthy();
      expect(secondary).toBeTruthy();
      expect(primary).not.toBe(secondary);
    }
  });

  describe("selectAdditionFacts", () => {
    it("generates valid addition facts respecting part1 + part2 = total across seeds", () => {
      for (let s = 1; s <= 20; s++) {
        const rng = createSeededRandom(`FACT-ADD-${s}`);
        const facts = selectAdditionFacts(rng, "Intermediate", { count: 4 });

        expect(facts).toHaveLength(4);
        for (const fact of facts) {
          expect(fact.part1 + fact.part2).toBe(fact.total);
          expect(fact.part1).toBeGreaterThanOrEqual(1);
          expect(fact.part2).toBeGreaterThanOrEqual(1);
          expect(fact.total).toBeLessThanOrEqual(5);
          expect(fact.key).toBe(formatAdditionFactKey(fact.part1, fact.part2));
        }

        // No duplicates within a single exercise
        const keys = facts.map((f) => f.key);
        expect(new Set(keys).size).toBe(keys.length);
      }
    });

    it("respects custom totalRange and minPart constraints", () => {
      const rng = createSeededRandom("FACT-ADD-RANGE");
      const facts = selectAdditionFacts(rng, "Intermediate", {
        count: 5,
        totalRange: [6, 10],
        minPart: 2,
      });

      expect(facts).toHaveLength(5);
      for (const fact of facts) {
        expect(fact.part1 + fact.part2).toBe(fact.total);
        expect(fact.total).toBeGreaterThanOrEqual(6);
        expect(fact.total).toBeLessThanOrEqual(10);
        expect(fact.part1).toBeGreaterThanOrEqual(2);
        expect(fact.part2).toBeGreaterThanOrEqual(2);
      }
    });

    it("prioritizes unused facts across a sheet via usedFacts (§7.3)", () => {
      const rng = createSeededRandom("FACT-ADD-SHEET");
      const usedFacts = new Set<string>();

      // Total range [2, 3] with minPart 1 has only: 1+1=2, 1+2=3, 2+1=3 (3 facts total)
      const firstBatch = selectAdditionFacts(
        rng,
        "Easy",
        { count: 3, totalRange: [2, 3], minPart: 1 },
        usedFacts
      );
      expect(firstBatch).toHaveLength(3);
      expect(usedFacts.size).toBe(3);

      // Second batch must cycle through remaining/used because pool is exhausted
      const secondBatch = selectAdditionFacts(
        rng,
        "Easy",
        { count: 2, totalRange: [2, 3], minPart: 1 },
        usedFacts
      );
      expect(secondBatch).toHaveLength(2);
    });
  });
  describe("selectSubtractionFacts", () => {
    it("generates valid subtraction facts respecting total - part = missing across seeds", () => {
      for (let s = 1; s <= 20; s++) {
        const rng = createSeededRandom(`FACT-SUB-${s}`);
        const facts = selectSubtractionFacts(rng, "Intermediate", { count: 3 });

        expect(facts).toHaveLength(3);
        for (const fact of facts) {
          expect(fact.total - fact.partTakenAway).toBe(fact.missingPart);
          expect(fact.partTakenAway).toBeGreaterThanOrEqual(1);
          expect(fact.missingPart).toBeGreaterThanOrEqual(1);
          expect(fact.total).toBeLessThanOrEqual(5);
          expect(fact.key).toBe(
            formatSubtractionFactKey(fact.total, fact.partTakenAway)
          );
        }

        const keys = facts.map((f) => f.key);
        expect(new Set(keys).size).toBe(keys.length);
      }
    });

    it("respects custom totalRange and minPart for subtraction", () => {
      const rng = createSeededRandom("FACT-SUB-RANGE");
      const facts = selectSubtractionFacts(rng, "Intermediate", {
        count: 4,
        totalRange: [7, 10],
        minPart: 2,
      });

      expect(facts).toHaveLength(4);
      for (const fact of facts) {
        expect(fact.total - fact.partTakenAway).toBe(fact.missingPart);
        expect(fact.total).toBeGreaterThanOrEqual(7);
        expect(fact.total).toBeLessThanOrEqual(10);
        expect(fact.partTakenAway).toBeGreaterThanOrEqual(2);
        expect(fact.missingPart).toBeGreaterThanOrEqual(2);
      }
    });
  });
});
