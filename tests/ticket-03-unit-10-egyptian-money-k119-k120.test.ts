import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  COIN_CATALOG,
  getCoinByDenomination,
} from "@/visual-models/shapes-solids-coins";
import { createMoneyCardSpec } from "@/visual-models/money-card";
import { VisualModelView } from "@/visual-models/registry";
import { getExerciseArchetype } from "@/archetypes/registry";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { createSeededRandom } from "@/lib/seed";
import type { IdentifyAndLabelData } from "@/archetypes/identify-and-label";
import type { ConnectMatchData } from "@/domain/types";
import {
  MONEY_STATEMENT_POOLS,
  type JudgeEqualityData,
} from "@/archetypes/judge-equality";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import "@/registry/bootstrap";

describe("Ticket 03 (Unit 10) — Slice 1: Revised Egyptian COIN_CATALOG, money-card, and K-4", () => {
  it("revises COIN_CATALOG to the 5 Egyptian denominations from ADR-0016", () => {
    expect(COIN_CATALOG.map((c) => c.denomination)).toEqual([
      25, 50, 100, 500, 1000,
    ]);

    const c25 = getCoinByDenomination(25);
    expect(c25.nameAr).toBe("ربع جنيه");
    expect(c25.valueAr).toBe("٢٥ قرشاً");
    expect(c25.currencyKind).toBe("coin");

    const c50 = getCoinByDenomination(50);
    expect(c50.nameAr).toBe("نصف جنيه");
    expect(c50.valueAr).toBe("٥٠ قرشاً");
    expect(c50.currencyKind).toBe("coin");

    const c100 = getCoinByDenomination(100);
    expect(c100.nameAr).toBe("جنيه واحد");
    expect(c100.valueAr).toBe("١ جنيه");
    expect(c100.currencyKind).toBe("coin");

    const c500 = getCoinByDenomination(500);
    expect(c500.nameAr).toBe("خمسة جنيهات");
    expect(c500.valueAr).toBe("٥ جنيهات");
    expect(c500.currencyKind).toBe("bill");

    const c1000 = getCoinByDenomination(1000);
    expect(c1000.nameAr).toBe("عشرة جنيهات");
    expect(c1000.valueAr).toBe("١٠ جنيهات");
    expect(c1000.currencyKind).toBe("bill");
  });

  it("renders money-card Visual Model at canonical 212 × 160 px with no Western digits", () => {
    for (const denom of [25, 50, 100, 500, 1000] as const) {
      const spec = createMoneyCardSpec(denom);
      expect(spec.kind).toBe("money-card");
      expect(spec.meta?.perceptionMode).toBe("perceive");

      const html = renderToStaticMarkup(
        React.createElement(VisualModelView, { model: spec })
      );
      expect(html).toContain('data-visual-model="money-card"');
      expect(html).toContain('width="212"');
      expect(html).toContain('height="160"');
      expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
    }
  });

  it("keeps K-4 (Match Coins) generating and rendering cleanly with the revised catalog", () => {
    const bundle = generateWorksheet({
      grade: "K",
      lessonNumber: 4,
      seed: "T03-K4-CHECK",
      difficultyLevel: "scaffolded",
    });
    expect(bundle.worksheet.sections.length).toBe(3);
    const html = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 4,
      seed: "T03-K4-CHECK",
      difficultyLevel: "scaffolded",
      viewMode: "worksheet",
    });
    expect(html).toContain('data-archetype="ConnectMatch"');
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });
});

describe("Ticket 03 (Unit 10) — Slice 2: IdentifyAndLabel, ConnectMatch money modes, and JudgeEquality money-statement", () => {
  it("IdentifyAndLabel generates unique coins per exercise and matches catalog name/value across 25 seeds", () => {
    const archetype = getExerciseArchetype("IdentifyAndLabel");
    const catalog = getCurriculumCatalog();
    const lessonK119 = catalog.getLesson("K", 119)!;
    const lessonK120 = catalog.getLesson("K", 120)!;

    for (let seedIdx = 0; seedIdx < 25; seedIdx++) {
      const exName = archetype.generate({
        lesson: lessonK119,
        sourceLessonId: lessonK119.id,
        sectionId: "practice",
        exerciseIndex: 0,
        exerciseNumber: 2,
        difficultyLevel: "Intermediate",
        rng: createSeededRandom(`T03-ID-NAME-${seedIdx}`),
        spec: {
          archetype: "IdentifyAndLabel",
          params: {
            mode: "name",
            denominations: [25, 50, 100, 500, 1000],
            itemCount: 4,
          },
        },
      });
      const dataName = exName.data as IdentifyAndLabelData;
      expect(dataName.labelMode).toBe("name");
      expect(dataName.items.length).toBe(4);
      const seenName = new Set<number>();
      for (const item of dataName.items) {
        expect(seenName.has(item.denomination)).toBe(false);
        seenName.add(item.denomination);
        const def = getCoinByDenomination(item.denomination);
        expect(item.expectedAnswerAr).toBe(def.nameAr);
      }

      const exVal = archetype.generate({
        lesson: lessonK120,
        sourceLessonId: lessonK120.id,
        sectionId: "practice",
        exerciseIndex: 0,
        exerciseNumber: 2,
        difficultyLevel: "Intermediate",
        rng: createSeededRandom(`T03-ID-VAL-${seedIdx}`),
        spec: {
          archetype: "IdentifyAndLabel",
          params: {
            mode: "value",
            denominations: [25, 50, 100, 500, 1000],
            itemCount: 4,
          },
        },
      });
      const dataVal = exVal.data as IdentifyAndLabelData;
      expect(dataVal.labelMode).toBe("value");
      expect(dataVal.items.length).toBe(4);
      const seenVal = new Set<number>();
      for (const item of dataVal.items) {
        expect(seenVal.has(item.denomination)).toBe(false);
        seenVal.add(item.denomination);
        const def = getCoinByDenomination(item.denomination);
        expect(item.expectedAnswerAr).toBe(def.valueAr);
      }
    }
  });

  it("ConnectMatch supports name-to-coin and value-to-coin modes", () => {
    const archetype = getExerciseArchetype("ConnectMatch");
    const catalog = getCurriculumCatalog();
    const lessonK119 = catalog.getLesson("K", 119)!;

    const exName = archetype.generate({
      lesson: lessonK119,
      sourceLessonId: lessonK119.id,
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("T03-MATCH-NAME"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "name-to-coin",
          denominations: [25, 50, 100, 500, 1000],
          pairCount: 4,
        },
      },
    });
    const dName = exName.data as ConnectMatchData;
    expect(dName.pairs.length).toBe(3);
    for (const pair of dName.pairs) {
      const def = getCoinByDenomination(pair.leftItem.denomination!);
      expect(pair.rightItem.labelAr).toBe(def.nameAr);
    }

    const exVal = archetype.generate({
      lesson: lessonK119,
      sourceLessonId: lessonK119.id,
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 4,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("T03-MATCH-VAL"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "value-to-coin",
          denominations: [25, 50, 100, 500, 1000],
          pairCount: 4,
        },
      },
    });
    const dVal = exVal.data as ConnectMatchData;
    expect(dVal.pairs.length).toBe(3);
    for (const pair of dVal.pairs) {
      const def = getCoinByDenomination(pair.leftItem.denomination!);
      expect(pair.rightItem.labelAr).toBe(def.valueAr);
    }
  });

  it("JudgeEquality money-statement pool has ~8 factually accurate statements per difficulty and generates mixed true/false subsets", () => {
    for (const tier of ["Easy", "Intermediate", "Advanced"] as const) {
      const pool = MONEY_STATEMENT_POOLS[tier];
      expect(pool.length).toBe(8);
      expect(pool.filter((s) => s.isCorrect).length).toBe(4);
      expect(pool.filter((s) => !s.isCorrect).length).toBe(4);
      for (const stmt of pool) {
        expect(findWesternNumeralsInRenderedHtml(stmt.statementAr)).toEqual([]);
        expect(stmt.explanationAr.length).toBeGreaterThan(0);
      }
    }

    const archetype = getExerciseArchetype("JudgeEquality");
    const catalog = getCurriculumCatalog();
    const lessonK120 = catalog.getLesson("K", 120)!;
    const ex = archetype.generate({
      lesson: lessonK120,
      sourceLessonId: lessonK120.id,
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 5,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("T03-JUDGE-MONEY"),
      spec: {
        archetype: "JudgeEquality",
        params: {
          judgementKind: "money-statement",
          statementCount: 3,
        },
      },
    });
    const data = ex.data as JudgeEqualityData;
    expect(data.mode).toBe("money-statement");
    expect(data.comparisonStatements?.length).toBe(3);
    const hasTrue = data.comparisonStatements?.some((s) => s.isCorrect);
    const hasFalse = data.comparisonStatements?.some((s) => !s.isCorrect);
    expect(hasTrue).toBe(true);
    expect(hasFalse).toBe(true);
  });
});

describe("Ticket 03 (Unit 10) — Slice 3: Primary seam for K-119 and K-120", () => {
  it("resolves Warm-Up prerequisites (K-119 <- K-4, K-120 <- K-119), enforces seed determinism, strategy hints, and Eastern Arabic numerals", () => {
    const k119 = generateWorksheet({
      grade: "K",
      lessonNumber: 119,
      seed: "u10-t03-seed-1",
      difficultyLevel: "scaffolded",
    });
    expect(k119.warmUpSourceLessonId).toBe("K-4");
    expect(k119.worksheet.sections[0].sourceLessonId).toBe("K-4");
    expect(k119.lesson.titleAr).toBe("النقود المصرية — أسماء العملات");

    const k120 = generateWorksheet({
      grade: "K",
      lessonNumber: 120,
      seed: "u10-t03-seed-1",
      difficultyLevel: "scaffolded",
    });
    expect(k120.warmUpSourceLessonId).toBe("K-119");
    expect(k120.worksheet.sections[0].sourceLessonId).toBe("K-119");
    expect(k120.lesson.titleAr).toBe("النقود المصرية — قِيَم العملات");

    // Easy tier only uses 25 and 50 piasters
    const k119Easy = generateWorksheet({
      grade: "K",
      lessonNumber: 119,
      seed: "u10-t03-easy",
      difficultyLevel: "Easy",
    });
    for (const ex of k119Easy.worksheet.sections[1].exercises) {
      if (ex.archetype === "IdentifyAndLabel") {
        const d = ex.data as IdentifyAndLabelData;
        for (const item of d.items) {
          expect([25, 50]).toContain(item.denomination);
        }
      }
    }

    for (const lessonNum of [119, 120] as const) {
      const bundle = generateWorksheet({
        grade: "K",
        lessonNumber: lessonNum,
        seed: "u10-t03-seed-1",
        difficultyLevel: "scaffolded",
      });
      for (const sec of bundle.answerKey.sections) {
        for (const ex of sec.exercises) {
          expect(ex.strategyHintAr.trim().length).toBeGreaterThan(0);
        }
      }

      const htmlA = renderWorksheetSurface({
        grade: "K",
        lessonNumber: lessonNum,
        seed: "u10-t03-seed-1",
        difficultyLevel: "scaffolded",
        viewMode: "worksheet",
      });
      const htmlB = renderWorksheetSurface({
        grade: "K",
        lessonNumber: lessonNum,
        seed: "u10-t03-seed-1",
        difficultyLevel: "scaffolded",
        viewMode: "worksheet",
      });
      expect(htmlA).toBe(htmlB);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);

      const akHtml = renderWorksheetSurface({
        grade: "K",
        lessonNumber: lessonNum,
        seed: "u10-t03-seed-1",
        difficultyLevel: "scaffolded",
        viewMode: "answer-key",
      });
      expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
    }
  });
});
