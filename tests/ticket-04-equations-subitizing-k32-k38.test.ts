import { describe, expect, it } from "vitest";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import type { JudgeEqualityData } from "@/archetypes/judge-equality";

describe("Ticket 04 (Unit 3) — Slice 1: JudgeEquality Archetype (mode whats-wrong)", () => {
  it("generates and renders JudgeEquality in mode whats-wrong with exactly one false item per row and crossed-off overlay in Answer Key", () => {
    // We will test K-36 which uses WHAT'S WRONG? - A
    const k36 = generateWorksheet({
      grade: "K",
      lessonNumber: 36,
      seed: "SLICE1-K36",
    });

    expect(k36.isAuthoredBlueprint).toBe(true);
    const challengeEx = k36.worksheet.sections[2].exercises.find(
      (e) => e.archetype === "JudgeEquality"
    );
    expect(challengeEx).toBeDefined();

    const data = challengeEx!.data as JudgeEqualityData;
    expect(data.kind).toBe("JudgeEquality");
    expect(data.mode).toBe("whats-wrong");
    expect(data.rows.length).toBeGreaterThanOrEqual(1);

    for (const row of data.rows) {
      expect(row.items).toHaveLength(3);
      const falseItems = row.items.filter((item) => !item.isCorrect);
      const trueItems = row.items.filter((item) => item.isCorrect);
      expect(falseItems).toHaveLength(1);
      expect(trueItems).toHaveLength(2);
    }

    const htmlW = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 36,
      seed: "SLICE1-K36",
      viewMode: "worksheet",
    });
    const htmlA = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 36,
      seed: "SLICE1-K36",
      viewMode: "answer-key",
    });

    expect(htmlW).toContain('data-archetype="JudgeEquality"');
    expect(htmlW).toContain('data-judge-mode="whats-wrong"');
    expect(htmlW).not.toContain('data-crossed-off="true"');

    expect(htmlA).toContain('data-crossed-off="true"');
    expect(htmlA).toContain('data-strategy-hint="true"');

    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("generates Lessons K-32 (Co-presented, MATCHING - E) and K-33 (COLOR CODE - B) with Equations, Five Frames, Number Bonds, and Prerequisite resolution", () => {
    const k32 = generateWorksheet({
      grade: "K",
      lessonNumber: 32,
      seed: "SLICE2-K32",
    });
    const k33 = generateWorksheet({
      grade: "K",
      lessonNumber: 33,
      seed: "SLICE2-K33",
    });

    expect(k32.isAuthoredBlueprint).toBe(true);
    expect(k32.lesson.isCoPresented).toBe(true);
    expect(k32.lesson.standards).toEqual(["K.OA.1", "K.OA.5"]);
    expect(k32.warmUpSourceLessonId).toBe("K-31");
    expect(k32.worksheet.sections[0].sourceLessonId).toBe("K-31");

    expect(k33.isAuthoredBlueprint).toBe(true);
    expect(k33.lesson.standards).toEqual(["K.OA.1", "K.OA.5"]);
    expect(k33.warmUpSourceLessonId).toBe("K-32");
    expect(k33.worksheet.sections[0].sourceLessonId).toBe("K-32");

    // K-32 Practice: Complete each addition equation and fill in the matching number bond
    const k32Practice1 = k32.worksheet.sections[1].exercises[0];
    expect(k32Practice1.archetype).toBe("JoinParts");
    expect(
      k32Practice1.visualModels.some((m) => m.kind === "equation-strip")
    ).toBe(true);
    expect(
      k32Practice1.visualModels.some((m) => m.kind === "number-bond")
    ).toBe(true);

    // K-32 Challenge includes MATCHING - E (ConnectMatch five-frame to equation)
    const matchE = k32.worksheet.sections[2].exercises[0];
    expect(matchE.archetype).toBe("ConnectMatch");
    expect(matchE.visualModels.some((m) => m.kind === "five-frame")).toBe(true);
    expect(matchE.visualModels.some((m) => m.kind === "equation-strip")).toBe(
      true
    );

    // K-33 Challenge includes COLOR CODE - B (JoinParts with action="draw-counters" and responseForm="number-bond")
    const colorCodeB = k33.worksheet.sections[2].exercises[0];
    expect(colorCodeB.archetype).toBe("JoinParts");

    for (const [lessonNumber, seed] of [
      [32, "SLICE2-K32"],
      [33, "SLICE2-K33"],
    ] as const) {
      const htmlW = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed,
        viewMode: "worksheet",
      });
      const htmlA = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed,
        viewMode: "answer-key",
      });
      const htmlN = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed,
        viewMode: "teacher-notes",
      });

      expect(htmlW).toContain('data-visual-model="equation-strip"');
      expect(htmlA).toContain("data-solved-equation-");
      expect(htmlA).toContain('data-strategy-hint="true"');
      expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlN)).toEqual([]);
    }
  });

  it("generates Lesson K-34 (Find the Total using Abstract Alternative Models) with Prerequisite K-33 Warm-Up and MATCHING - F (tally expressions to total)", () => {
    const k34 = generateWorksheet({
      grade: "K",
      lessonNumber: 34,
      seed: "SLICE3-K34",
    });

    expect(k34.isAuthoredBlueprint).toBe(true);
    expect(k34.lesson.standards).toEqual(["K.OA.1", "K.OA.5"]);
    expect(k34.warmUpSourceLessonId).toBe("K-33");
    expect(k34.worksheet.sections[0].sourceLessonId).toBe("K-33");

    // Practice uses alternative models (snap cubes, tally marks, dice) with Equations
    const practiceModels = k34.worksheet.sections[1].exercises.flatMap(
      (e) => e.visualModels
    );
    expect(practiceModels.some((m) => m.kind === "snap-cubes")).toBe(true);
    expect(practiceModels.some((m) => m.kind === "tally-marks")).toBe(true);
    expect(practiceModels.some((m) => m.kind === "dice-pattern")).toBe(true);
    expect(practiceModels.some((m) => m.kind === "equation-strip")).toBe(true);

    // Challenge includes MATCHING - F (ConnectMatch tally-expression to total with missing-total slot)
    const matchF = k34.worksheet.sections[2].exercises[0];
    expect(matchF.archetype).toBe("ConnectMatch");
    expect(matchF.visualModels.some((m) => m.kind === "tally-marks")).toBe(
      true
    );
    expect(matchF.visualModels.some((m) => m.kind === "digit-card")).toBe(true);

    const htmlW = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 34,
      seed: "SLICE3-K34",
      viewMode: "worksheet",
    });
    const htmlA = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 34,
      seed: "SLICE3-K34",
      viewMode: "answer-key",
    });

    expect(htmlW).toContain('data-visual-model="tally-marks"');
    expect(htmlA).toContain('data-strategy-hint="true"');
    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("generates Lessons K-36 (WHAT'S WRONG A), K-37 (WHAT'S WRONG B), and K-38 (WHAT'S WRONG C & labeled Parts/Total) with correct unknown Part handling and Prerequisite Warm-Ups", () => {
    const k36 = generateWorksheet({
      grade: "K",
      lessonNumber: 36,
      seed: "SLICE4-K36",
    });
    const k37 = generateWorksheet({
      grade: "K",
      lessonNumber: 37,
      seed: "SLICE4-K37",
    });
    const k38 = generateWorksheet({
      grade: "K",
      lessonNumber: 38,
      seed: "SLICE4-K38",
    });

    expect(k36.isAuthoredBlueprint).toBe(true);
    expect(k36.warmUpSourceLessonId).toBe("K-34");
    expect(k37.isAuthoredBlueprint).toBe(true);
    expect(k37.warmUpSourceLessonId).toBe("K-36");
    expect(k38.isAuthoredBlueprint).toBe(true);
    expect(k38.warmUpSourceLessonId).toBe("K-37");

    // K-36 Practice: Subitize Expressions that combine a five frame with a digit
    const k36Practice = k36.worksheet.sections[1].exercises[0];
    expect(k36Practice.archetype).toBe("JoinParts");
    expect(k36Practice.visualModels.some((m) => m.kind === "five-frame")).toBe(
      true
    );
    expect(k36Practice.visualModels.some((m) => m.kind === "digit-card")).toBe(
      true
    );

    // K-36 Advanced (e.g. seed YHZ3JF): five-frame-and-digit places the non-zero Part on the five frame
    const k36Adv = generateWorksheet({
      grade: "K",
      lessonNumber: 36,
      seed: "YHZ3JF",
      difficultyLevel: "Advanced",
    });
    const k36AdvPractice = k36Adv.worksheet.sections[1].exercises[0];
    const k36AdvData = k36AdvPractice.data as any;
    for (const item of k36AdvData.items) {
      expect(item.part1).toBeGreaterThanOrEqual(1);
    }

    // K-37 Problem of the Day: "How many more do you need?" uses unknown Part
    const k37Pod = k37.worksheet.sections[2].exercises[1];
    expect(k37Pod.archetype).toBe("JoinParts");
    expect(k37Pod.data.kind).toBe("JoinParts");
    const k37PodData = k37Pod.data as any;
    expect(k37PodData.items[0].unknownPosition).toBe("part2");

    // K-38 Practice: Labeled Parts and Total
    const k38Practice = k38.worksheet.sections[1].exercises[0];
    expect(k38Practice.archetype).toBe("JoinParts");
    const k38PracticeData = k38Practice.data as any;
    expect(k38PracticeData.showTermLabels).toBe(true);

    // K-38 Problem of the Day: "How many more do you need?" uses unknown Part
    const k38Pod = k38.worksheet.sections[2].exercises[1];
    expect(k38Pod.archetype).toBe("JoinParts");
    const k38PodData = k38Pod.data as any;
    expect(k38PodData.items[0].unknownPosition).toBe("part2");

    for (const [lessonNumber, seed] of [
      [36, "SLICE4-K36"],
      [37, "SLICE4-K37"],
      [38, "SLICE4-K38"],
    ] as const) {
      const htmlW = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed,
        viewMode: "worksheet",
      });
      const htmlA = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed,
        viewMode: "answer-key",
      });
      const htmlN = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed,
        viewMode: "teacher-notes",
      });

      expect(htmlW).toContain('data-archetype="JudgeEquality"');
      expect(htmlA).toContain('data-crossed-off="true"');
      expect(htmlA).toContain('data-strategy-hint="true"');

      // Teacher Notes carries timed subitizing flash activity notes
      expect(htmlN).toMatch(/ثوانٍ|ثانيتين/);

      expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlN)).toEqual([]);
    }
  });

  it("domain invariant across 25 seeds: every whats-wrong row has exactly 1 false item and 2 true items, every true item matches its arithmetic, every false item differs from its arithmetic, and total-first equations appear only in Advanced Challenge", () => {
    for (const lessonNumber of [32, 33, 34, 36, 37, 38]) {
      for (let s = 1; s <= 25; s++) {
        const seed = `DOMAIN-K${lessonNumber}-${s}`;
        for (const mode of [
          "scaffolded",
          "Easy",
          "Intermediate",
          "Advanced",
        ] as const) {
          const bundle = generateWorksheet({
            grade: "K",
            lessonNumber,
            seed,
            difficultyLevel: mode,
          });

          for (const section of bundle.worksheet.sections) {
            for (const ex of section.exercises) {
              if (ex.data.kind === "JudgeEquality") {
                const je = ex.data as JudgeEqualityData;
                for (const row of je.rows) {
                  const falseItems = row.items.filter((it) => !it.isCorrect);
                  const trueItems = row.items.filter((it) => it.isCorrect);
                  expect(falseItems).toHaveLength(1);
                  expect(trueItems).toHaveLength(2);

                  for (const it of trueItems) {
                    expect(it.part1 + it.part2).toBe(it.shownTotal);
                  }
                  for (const it of falseItems) {
                    expect(it.part1 + it.part2).not.toBe(it.shownTotal);
                  }
                }
              }

              if (ex.data.kind === "JoinParts") {
                const jp = ex.data as any;
                for (const item of jp.items) {
                  expect(item.part1 + item.part2).toBe(item.total);
                  // Total-first equation form appears only in Advanced Challenge
                  if (item.responseModel?.meta?.layout === "total-first") {
                    expect(section.id).toBe("challenge");
                    expect(ex.difficultyLevel).toBe("Advanced");
                  }
                }
              }
            }
          }
        }
      }
    }
  });
});
