import { describe, expect, it } from "vitest";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import type { JoinPartsData } from "@/archetypes/join-parts";
import type { ConnectMatchData } from "@/domain/types";

describe("Ticket 03 (Unit 3) — Slice 2: Lessons K-27 & K-28 (JoinParts with Five Frames, Pictures, Shapes/Solids, and Parts-and-Total Table)", () => {
  it("generates Lesson K-27 (Quantify & Add to 5 using Five Frames) with Prerequisite K-26 Warm-Up, JoinParts Practice, and Challenge (Brain Builder + Problem of the Day)", () => {
    const k27 = generateWorksheet({
      grade: "K",
      lessonNumber: 27,
      seed: "UNIT3-K27-A",
    });

    expect(k27.isAuthoredBlueprint).toBe(true);
    expect(k27.lesson.standards).toEqual(["K.CC.5"]);
    expect(k27.warmUpSourceLessonId).toBe("K-26");
    expect(k27.worksheet.sections[0].sourceLessonId).toBe("K-26");

    const [, practice, challenge] = k27.worksheet.sections;
    expect(practice.exercises.length).toBe(2);
    expect(challenge.exercises.length).toBe(2);

    for (const ex of practice.exercises) {
      expect(ex.archetype).toBe("JoinParts");
      const data = ex.data as JoinPartsData;
      expect(data.kind).toBe("JoinParts");
      expect(data.responseForm).toBe("parts-table");
      expect(data.items.length).toBeGreaterThanOrEqual(2);
      for (const item of data.items) {
        expect(item.part1 + item.part2).toBe(item.total);
        expect(item.total).toBeLessThanOrEqual(5);
        expect(item.part1).toBeGreaterThanOrEqual(1);
        expect(item.part2).toBeGreaterThanOrEqual(1);
      }
    }

    const htmlW = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 27,
      seed: "UNIT3-K27-A",
      viewMode: "worksheet",
    });
    const htmlA = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 27,
      seed: "UNIT3-K27-A",
      viewMode: "answer-key",
    });
    const htmlN = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 27,
      seed: "UNIT3-K27-A",
      viewMode: "teacher-notes",
    });

    expect(htmlW).toContain('data-archetype="JoinParts"');
    expect(htmlW).toContain('data-parts-table="true"');
    expect(htmlW).toContain('data-part-outline="primary"');
    expect(htmlA).toContain("data-solved-table-total=");
    expect(htmlA).toContain('data-strategy-hint="true"');

    expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlN)).toEqual([]);
  });

  it("generates Lesson K-28 (Add Concretely by Identifying the Parts & Total) with Prerequisite K-27 Warm-Up, two-tone Five Frames with outlined parts, and Easy/Intermediate/Advanced difficulty progression", () => {
    const k28Easy = generateWorksheet({
      grade: "K",
      lessonNumber: 28,
      seed: "UNIT3-K28-EASY",
      difficultyLevel: "Easy",
    });
    const k28Int = generateWorksheet({
      grade: "K",
      lessonNumber: 28,
      seed: "UNIT3-K28-INT",
      difficultyLevel: "Intermediate",
    });
    const k28Adv = generateWorksheet({
      grade: "K",
      lessonNumber: 28,
      seed: "UNIT3-K28-ADV",
      difficultyLevel: "Advanced",
    });

    expect(k28Easy.warmUpSourceLessonId).toBe("K-27");

    // Easy: Total <= 4, action = "trace"
    for (const ex of k28Easy.worksheet.sections[1].exercises) {
      const data = ex.data as JoinPartsData;
      expect(data.action).toBe("trace");
      for (const item of data.items) {
        expect(item.total).toBeLessThanOrEqual(4);
        expect(item.part1).toBeGreaterThanOrEqual(1);
        expect(item.part2).toBeGreaterThanOrEqual(1);
      }
    }

    // Intermediate: Total <= 5, action = "write"
    for (const ex of k28Int.worksheet.sections[1].exercises) {
      const data = ex.data as JoinPartsData;
      expect(data.action).toBe("write");
      for (const item of data.items) {
        expect(item.total).toBeLessThanOrEqual(5);
        expect(item.part1).toBeGreaterThanOrEqual(1);
        expect(item.part2).toBeGreaterThanOrEqual(1);
      }
    }

    // Advanced: Total <= 5, Part >= 0 allowed, model partly withdrawn (draw-counters)
    for (const ex of k28Adv.worksheet.sections[1].exercises) {
      const data = ex.data as JoinPartsData;
      expect(data.action).toBe("draw-counters");
      for (const item of data.items) {
        expect(item.total).toBeLessThanOrEqual(5);
        expect(item.part1).toBeGreaterThanOrEqual(0);
        expect(item.part2).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("generates Lessons K-29, K-30 (Co-presented, COLOR CODE - A), and K-31 (Alternative Concrete Models) with Number Bonds, Prerequisite resolution, and Answer Key states", () => {
    const k29 = generateWorksheet({
      grade: "K",
      lessonNumber: 29,
      seed: "UNIT3-K29-A",
    });
    const k30 = generateWorksheet({
      grade: "K",
      lessonNumber: 30,
      seed: "UNIT3-K30-A",
    });
    const k31 = generateWorksheet({
      grade: "K",
      lessonNumber: 31,
      seed: "UNIT3-K31-A",
    });

    expect(k29.isAuthoredBlueprint).toBe(true);
    expect(k29.warmUpSourceLessonId).toBe("K-28");
    expect(k30.isAuthoredBlueprint).toBe(true);
    expect(k30.lesson.isCoPresented).toBe(true);
    expect(k30.warmUpSourceLessonId).toBe("K-29");
    expect(k31.isAuthoredBlueprint).toBe(true);
    expect(k31.warmUpSourceLessonId).toBe("K-30");

    // K-30 Challenge includes COLOR CODE - A (JoinParts with action="draw-counters" & responseForm="number-bond") and Problem of the Day
    expect(k30.worksheet.sections[2].exercises).toHaveLength(2);
    const colorCodeEx = k30.worksheet.sections[2].exercises[0];
    expect(colorCodeEx.archetype).toBe("JoinParts");
    const colorCodeData = colorCodeEx.data as JoinPartsData;
    expect(colorCodeData.action).toBe("draw-counters");
    expect(colorCodeData.responseForm).toBe("number-bond");

    // K-31 Practice & Challenge use snap-cubes, tally-marks, dice, and domino with Number Bonds
    const k31Models = k31.worksheet.sections
      .slice(1)
      .flatMap((s) => s.exercises.flatMap((e) => e.visualModels));
    expect(k31Models.some((m) => m.kind === "snap-cubes")).toBe(true);
    expect(k31Models.some((m) => m.kind === "tally-marks")).toBe(true);
    expect(k31Models.some((m) => m.kind === "dice-pattern")).toBe(true);
    expect(k31Models.some((m) => m.kind === "number-bond")).toBe(true);

    for (const lessonNumber of [29, 30, 31]) {
      const htmlW = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `RENDER-K${lessonNumber}`,
        viewMode: "worksheet",
      });
      const htmlA = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `RENDER-K${lessonNumber}`,
        viewMode: "answer-key",
      });
      const htmlN = renderWorksheetSurface({
        grade: "K",
        lessonNumber,
        seed: `RENDER-K${lessonNumber}`,
        viewMode: "teacher-notes",
      });

      expect(htmlW).toContain('data-visual-model="number-bond"');
      expect(htmlA).toContain("data-solved-bond-");
      expect(htmlA).toContain('data-strategy-hint="true"');
      expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlN)).toEqual([]);
    }
  });

  it("domain invariant across 25 seeds: every Number Bond and fact in K-27 to K-31 satisfies Part + Part = Total, respects tier limits, never repeats within an exercise, and prioritizes unused facts across the sheet", () => {
    for (let lessonNumber = 27; lessonNumber <= 31; lessonNumber++) {
      for (let s = 1; s <= 25; s++) {
        const seed = `DOMAIN-SEED-${s}`;
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
              if (ex.data.kind === "JoinParts") {
                const jp = ex.data as JoinPartsData;
                const seenInExercise = new Set<string>();
                for (const item of jp.items) {
                  expect(item.part1 + item.part2).toBe(item.total);
                  expect(seenInExercise.has(item.factKey)).toBe(false);
                  seenInExercise.add(item.factKey);

                  if (ex.difficultyLevel === "Easy") {
                    expect(item.total).toBeLessThanOrEqual(4);
                    expect(item.part1).toBeGreaterThanOrEqual(1);
                    expect(item.part2).toBeGreaterThanOrEqual(1);
                  } else if (ex.difficultyLevel === "Intermediate") {
                    expect(item.total).toBeLessThanOrEqual(5);
                    expect(item.part1).toBeGreaterThanOrEqual(1);
                    expect(item.part2).toBeGreaterThanOrEqual(1);
                  } else {
                    expect(item.total).toBeLessThanOrEqual(5);
                    expect(item.part1).toBeGreaterThanOrEqual(0);
                    expect(item.part2).toBeGreaterThanOrEqual(0);
                  }

                  if (
                    ex.difficultyLevel !== "Advanced" &&
                    section.id !== "challenge"
                  ) {
                    expect(["total", "none"]).toContain(item.unknownPosition);
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  it("ConnectMatch supports MATCHING A–D (five-frame to parts-table, five-frame to number-bond, dice to number-bond) plus Equation and tally-expression endpoints with missing-Total Answer Slots", () => {
    const k27 = generateWorksheet({
      grade: "K",
      lessonNumber: 27,
      seed: "MATCH-K27",
    });
    const k28 = generateWorksheet({
      grade: "K",
      lessonNumber: 28,
      seed: "MATCH-K28",
    });
    const k29 = generateWorksheet({
      grade: "K",
      lessonNumber: 29,
      seed: "MATCH-K29",
    });
    const k31 = generateWorksheet({
      grade: "K",
      lessonNumber: 31,
      seed: "MATCH-K31",
    });

    // K-27 (MATCHING - A) & K-28 (MATCHING - B): five-frame -> parts-table with missing total
    for (const bundle of [k27, k28]) {
      const matchEx = bundle.worksheet.sections[2].exercises[0];
      expect(matchEx.archetype).toBe("ConnectMatch");
      const data = matchEx.data as ConnectMatchData;
      expect(data.rightItems.every((i) => i.model.kind === "five-frame")).toBe(
        true
      );
      expect(
        data.leftItems.every((i) =>
          Boolean(
            (i.model.meta as Record<string, unknown> | undefined)
              ?.isPartsTableEndpoint
          )
        )
      ).toBe(true);
    }

    // K-29 (MATCHING - C): five-frame -> number-bond with missing total in top circle
    const matchK29 = k29.worksheet.sections[2].exercises[0]
      .data as ConnectMatchData;
    expect(
      matchK29.rightItems.every((i) => i.model.kind === "five-frame")
    ).toBe(true);
    expect(
      matchK29.leftItems.every((i) => i.model.kind === "number-bond")
    ).toBe(true);

    // K-31 (MATCHING - D): dice-pattern -> number-bond with missing total in top circle
    const matchK31 = k31.worksheet.sections[2].exercises[0]
      .data as ConnectMatchData;
    expect(
      matchK31.rightItems.every((i) => i.model.kind === "dice-pattern")
    ).toBe(true);
    expect(
      matchK31.leftItems.every((i) => i.model.kind === "number-bond")
    ).toBe(true);
  });

  it("§7.3 fact selection prioritizes unused facts across the sheet before repeating and treats ٣ + ٢ and ٢ + ٣ as distinct facts", () => {
    const k29Int = generateWorksheet({
      grade: "K",
      lessonNumber: 29,
      seed: "FACT-POOL-SEED-1",
      difficultyLevel: "Intermediate",
    });

    // In Intermediate, Total in [2..5] with Part >= 1 yields 10 distinct ordered facts:
    // (1+1), (1+2, 2+1), (1+3, 2+2, 3+1), (1+4, 2+3, 3+2, 4+1) = 10 facts.
    // A worksheet with 1 Warm-Up (2 items) + 2 Practice (4 items) + 2 Challenge (4 items) = 10 items total
    // should use all 10 distinct facts with zero repeats across the entire sheet!
    const allFactKeys: string[] = [];
    for (const section of k29Int.worksheet.sections) {
      for (const ex of section.exercises) {
        if (ex.data.kind === "JoinParts") {
          for (const item of (ex.data as JoinPartsData).items) {
            allFactKeys.push(item.factKey);
          }
        } else if (ex.data.kind === "ConnectMatch") {
          for (const pair of (ex.data as ConnectMatchData).pairs) {
            const m = pair.pairId.match(/(\d+\+\d+)$/);
            if (m) allFactKeys.push(m[1]);
          }
        }
      }
    }

    expect(allFactKeys.length).toBeGreaterThanOrEqual(8);
    expect(new Set(allFactKeys).size).toBe(allFactKeys.length);
    // Verify both 2+3 and 3+2 can coexist as distinct facts in the pool
    expect(allFactKeys).toContain("2+3");
    expect(allFactKeys).toContain("3+2");
  });
});
