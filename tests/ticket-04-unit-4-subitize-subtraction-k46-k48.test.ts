import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import "@/registry/bootstrap";
import type { TakeAwayData } from "@/archetypes/take-away";
import { createSeededRandom } from "@/lib/seed";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 04 (Unit 4) — Slice 1: Subitize Subtraction in TakeAway (K-46 to K-48)", () => {
  it("renders K-46 (five-frame-and-digit + كم بقي؟), K-47 (five-frame + Number Bond), and K-48 (five-frame + Equation with Total/Part labels), with X pre-drawn (shown) at Easy and no X (none) at Intermediate and Advanced", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");

    const takeAwayDef = getExerciseArchetype("TakeAway");
    const catalog = getCurriculumCatalog();
    const lessonK46 = catalog.getLesson("K", 46)!;
    const lessonK47 = catalog.getLesson("K", 47)!;
    const lessonK48 = catalog.getLesson("K", 48)!;

    // 1. K-46 Easy: five-frame-and-digit + answer-slot (كم بقي؟) with pre-drawn X (shown)
    const exK46Easy = takeAwayDef.generate({
      lesson: lessonK46,
      sourceLessonId: "K-46",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Easy",
      rng: createSeededRandom("K46-EASY-SUBITIZE"),
      spec: {
        archetype: "TakeAway",
        params: {
          representation: "five-frame-and-digit",
          responseForm: "answer-slot",
          totalRange: [2, 4],
          minPart: 1,
          itemCount: 2,
        },
      },
    });

    const dataK46Easy = exK46Easy.data as TakeAwayData;
    expect(dataK46Easy.representation).toBe("five-frame-and-digit");
    expect(dataK46Easy.responseForm).toBe("answer-slot");
    for (const item of dataK46Easy.items) {
      expect(item.crossOffMode).toBe("shown");
      expect(item.representationModel?.crossedOutCount).toBe(
        item.partTakenAway
      );
      expect(item.companionDigitModel?.kind).toBe("digit-card");
      expect(item.companionDigitModel?.digit).toBe(item.partTakenAway);
    }

    const htmlK46EasyW = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exK46Easy, mode: "worksheet" })
    );
    const htmlK46EasyA = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exK46Easy, mode: "answer-key" })
    );
    expect(htmlK46EasyW).toContain('data-visual-model="five-frame"');
    expect(htmlK46EasyW).toContain('data-visual-model="digit-card"');
    expect(htmlK46EasyW).toContain('data-crossed-out-cell="true"');
    expect(htmlK46EasyW).toContain("كم بقي؟");
    expect(htmlK46EasyW).toContain("−");
    expect(htmlK46EasyA).toContain("data-solved-take-away=");
    expect(findWesternNumeralsInRenderedHtml(htmlK46EasyW)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlK46EasyA)).toEqual([]);

    // 2. K-46 Intermediate & Advanced: five-frame shows the Total with NO X (crossOffMode: "none") in both Worksheet and Answer Key
    for (const level of ["Intermediate", "Advanced"] as const) {
      const exK46NoX = takeAwayDef.generate({
        lesson: lessonK46,
        sourceLessonId: "K-46",
        sectionId: "practice",
        exerciseIndex: 0,
        exerciseNumber: 1,
        difficultyLevel: level,
        rng: createSeededRandom(`K46-${level}-SUBITIZE`),
        spec: {
          archetype: "TakeAway",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      });

      const dataNoX = exK46NoX.data as TakeAwayData;
      for (const item of dataNoX.items) {
        expect(item.crossOffMode).toBe("none");
        expect(item.representationModel?.crossedOutCount).toBe(0);
        expect(
          (item.representationModel?.meta as Record<string, unknown>)
            .crossOffMode
        ).toBe("none");
      }

      const htmlW = renderToStaticMarkup(
        takeAwayDef.render({ exercise: exK46NoX, mode: "worksheet" })
      );
      const htmlA = renderToStaticMarkup(
        takeAwayDef.render({ exercise: exK46NoX, mode: "answer-key" })
      );
      expect(htmlW).toContain('data-cross-off-mode="none"');
      expect(htmlW).not.toContain('data-crossed-out-cell="true"');
      expect(htmlA).not.toContain('data-crossed-out-cell="true"');
      expect(htmlW).not.toContain('data-ghost-counter="true"');
    }

    // 3. K-47: five-frame + Number Bond (shown X at Easy, no X at Intermediate & Advanced)
    const exK47Easy = takeAwayDef.generate({
      lesson: lessonK47,
      sourceLessonId: "K-47",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Easy",
      rng: createSeededRandom("K47-EASY"),
      spec: {
        archetype: "TakeAway",
        params: {
          representation: "five-frame",
          totalRange: [2, 4],
          minPart: 1,
          itemCount: 2,
        },
      },
    });
    const dataK47Easy = exK47Easy.data as TakeAwayData;
    expect(dataK47Easy.responseForm).toBe("number-bond");
    for (const item of dataK47Easy.items) {
      expect(item.crossOffMode).toBe("shown");
      expect(item.representationModel?.crossedOutCount).toBe(
        item.partTakenAway
      );
    }

    const exK47Inter = takeAwayDef.generate({
      lesson: lessonK47,
      sourceLessonId: "K-47",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K47-INTER"),
      spec: {
        archetype: "TakeAway",
        params: {
          representation: "five-frame",
          totalRange: [3, 5],
          minPart: 1,
          itemCount: 2,
        },
      },
    });
    const dataK47Inter = exK47Inter.data as TakeAwayData;
    expect(dataK47Inter.responseForm).toBe("number-bond");
    for (const item of dataK47Inter.items) {
      expect(item.crossOffMode).toBe("none");
      expect(item.representationModel?.crossedOutCount).toBe(0);
    }

    // 4. K-48: five-frame + Equation with showTermLabels: true (الكلّ − الجزء = الجزء), shown at Easy and none at Intermediate/Advanced
    const exK48Adv = takeAwayDef.generate({
      lesson: lessonK48,
      sourceLessonId: "K-48",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel: "Advanced",
      rng: createSeededRandom("K48-ADV"),
      spec: {
        archetype: "TakeAway",
        params: {
          representation: "five-frame",
          showTermLabels: true,
          totalRange: [3, 5],
          minPart: 0,
          itemCount: 2,
        },
      },
    });
    const dataK48Adv = exK48Adv.data as TakeAwayData;
    expect(dataK48Adv.responseForm).toBe("equation");
    expect(dataK48Adv.showTermLabels).toBe(true);
    for (const item of dataK48Adv.items) {
      expect(item.crossOffMode).toBe("none");
      expect(item.representationModel?.crossedOutCount).toBe(0);
    }

    const htmlK48W = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exK48Adv, mode: "worksheet" })
    );
    const htmlK48A = renderToStaticMarkup(
      takeAwayDef.render({ exercise: exK48Adv, mode: "answer-key" })
    );
    expect(htmlK48W).toContain('data-term-labels="true"');
    expect(htmlK48W).toContain("الكلّ");
    expect(htmlK48W).toContain("الجزء");
    expect(htmlK48W).toContain('data-cross-off-mode="none"');
    expect(htmlK48W).not.toContain('data-crossed-out-cell="true"');
    expect(htmlK48A).not.toContain('data-crossed-out-cell="true"');
    expect(findWesternNumeralsInRenderedHtml(htmlK48W)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(htmlK48A)).toEqual([]);
  });
});

describe("Ticket 04 (Unit 4) — Slice 2: Subtraction WHAT'S WRONG A–C in JudgeEquality", () => {
  it("generates and renders WHAT'S WRONG A (Equations), B (Number Bonds), and C (Equations) in whats-wrong mode with operation: subtract, subtraction-only rows, and exactly one false item per row across 30 seeds", async () => {
    const { getExerciseArchetype } = await import("@/archetypes/registry");
    const { getCurriculumCatalog } = await import("@/curriculum/catalog");

    const judgeDef = getExerciseArchetype("JudgeEquality");
    const catalog = getCurriculumCatalog();
    const lessonK46 = catalog.getLesson("K", 46)!;
    const lessonK47 = catalog.getLesson("K", 47)!;
    const lessonK48 = catalog.getLesson("K", 48)!;

    const configs = [
      {
        label: "WHAT'S WRONG A (K-46 Equations)",
        lesson: lessonK46,
        modelKind: "equation" as const,
      },
      {
        label: "WHAT'S WRONG B (K-47 Number Bonds)",
        lesson: lessonK47,
        modelKind: "number-bond" as const,
      },
      {
        label: "WHAT'S WRONG C (K-48 Equations)",
        lesson: lessonK48,
        modelKind: "equation" as const,
      },
    ];

    for (const { lesson, modelKind } of configs) {
      for (let s = 1; s <= 30; s++) {
        for (const difficultyLevel of [
          "Easy",
          "Intermediate",
          "Advanced",
        ] as const) {
          const ex = judgeDef.generate({
            lesson,
            sourceLessonId: lesson.id,
            sectionId: "challenge",
            exerciseIndex: 0,
            exerciseNumber: 1,
            difficultyLevel,
            rng: createSeededRandom(`WW-${lesson.id}-${difficultyLevel}-${s}`),
            spec: {
              archetype: "JudgeEquality",
              params: {
                operation: "subtract",
                mode: "whats-wrong",
                modelKind,
                rowCount: 1,
                totalRange: difficultyLevel === "Easy" ? [2, 4] : [2, 5],
                minPart: difficultyLevel === "Advanced" ? 0 : 1,
              },
            },
          });

          const data =
            ex.data as import("@/archetypes/judge-equality").JudgeEqualityData;
          expect(data.operation).toBe("subtract");
          expect(data.mode).toBe("whats-wrong");
          expect(data.modelKind).toBe(modelKind);

          for (const row of data.rows) {
            expect(row.items).toHaveLength(3);
            const falseItems = row.items.filter((it) => !it.isCorrect);
            // Every whats-wrong row has exactly one false item
            expect(falseItems).toHaveLength(1);

            for (const item of row.items) {
              expect(item.operation).toBe("subtract");
              const actualDiff = item.realTotal - item.part1;
              expect(item.isCorrect).toBe(item.part2 === actualDiff);
              if (modelKind === "equation") {
                expect(item.model.kind).toBe("equation-strip");
                expect(
                  (item.model.meta as Record<string, unknown>).operation
                ).toBe("subtract");
              } else {
                expect(item.model.kind).toBe("number-bond");
              }
            }
          }

          if (s === 1) {
            const htmlW = renderToStaticMarkup(
              judgeDef.render({ exercise: ex, mode: "worksheet" })
            );
            const htmlA = renderToStaticMarkup(
              judgeDef.render({ exercise: ex, mode: "answer-key" })
            );

            expect(htmlW).toContain('data-judge-mode="whats-wrong"');
            expect(htmlW).toContain(`data-model-kind="${modelKind}"`);
            expect(htmlW).not.toContain("+");
            if (modelKind === "equation") {
              expect(htmlW).toContain('data-equation-operation="subtract"');
              expect(htmlW).toContain("−");
            }
            // Answer key crosses off exactly one false item per row
            expect(htmlA.match(/data-crossed-off="true"/g)).toHaveLength(
              data.rows.length
            );
            expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
            expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
          }
        }
      }
    }
  });
});

describe("Ticket 04 (Unit 4) — Slice 3: Lessons K-46 to K-48 Blueprints, Localization, Timed Teacher Notes & Domain Invariants", () => {
  it("generates and renders Lessons K-46, K-47, and K-48 with Prerequisite Warm-Ups (K-43, K-46, K-47), localized titles and Teacher Notes (with 5-second flash activities only in Teacher Notes), Problems of the Day (including both-ways Strategy Hints on K-47 & K-48), and Eastern Arabic Numerals", async () => {
    const { generateWorksheet } = await import("@/engine/worksheet-engine");
    const { renderWorksheetSurface } =
      await import("@/lib/render-worksheet-surface");

    const k46 = generateWorksheet({
      grade: "K",
      lessonNumber: 46,
      seed: "UNIT4-K46-SLICE3",
    });
    const k47 = generateWorksheet({
      grade: "K",
      lessonNumber: 47,
      seed: "UNIT4-K47-SLICE3",
    });
    const k48 = generateWorksheet({
      grade: "K",
      lessonNumber: 48,
      seed: "UNIT4-K48-SLICE3",
    });

    // 1. K-46: Prerequisite K-43, Co-presented, Practice has five-frame-and-digit + answer-slot (كم بقي؟), Challenge has WHAT'S WRONG A (equation) + Problem of the Day ("Subtract to find the Missing Part")
    expect(k46.isAuthoredBlueprint).toBe(true);
    expect(k46.lesson.standards).toEqual(["K.OA.5"]);
    expect(k46.lesson.isCoPresented).toBe(true);
    expect(k46.warmUpSourceLessonId).toBe("K-43");
    expect(k46.worksheet.sections[0].sourceLessonId).toBe("K-43");
    expect(k46.teacherNotes.coPresentationNoteAr).toBeDefined();
    expect(k46.teacherNotes.classroomActivityNoteAr).toContain("٥ ثوانٍ");
    expect(
      k46.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    expect(k46.worksheet.sections[1].exercises).toHaveLength(2);
    for (const ex of k46.worksheet.sections[1].exercises) {
      expect(ex.archetype).toBe("TakeAway");
      const data = ex.data as TakeAwayData;
      expect(data.representation).toBe("five-frame-and-digit");
      expect(data.responseForm).toBe("answer-slot");
    }

    expect(k46.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k46.worksheet.sections[2].exercises[0].archetype).toBe(
      "JudgeEquality"
    );
    const k46Ww = k46.worksheet.sections[2].exercises[0]
      .data as import("@/archetypes/judge-equality").JudgeEqualityData;
    expect(k46Ww.operation).toBe("subtract");
    expect(k46Ww.mode).toBe("whats-wrong");
    expect(k46Ww.modelKind).toBe("equation");
    expect(k46.worksheet.sections[2].exercises[1].archetype).toBe("TakeAway");

    // 2. K-47: Prerequisite K-46 ○ K-40 -> resolves to K-46, Co-presented, Practice has five-frame + number-bond, Challenge has WHAT'S WRONG B (number-bond) + Problem of the Day ("Subtract or add to find the Missing Part")
    expect(k47.isAuthoredBlueprint).toBe(true);
    expect(k47.lesson.standards).toEqual(["K.OA.5"]);
    expect(k47.lesson.isCoPresented).toBe(true);
    expect(k47.warmUpSourceLessonId).toBe("K-46");
    expect(k47.worksheet.sections[0].sourceLessonId).toBe("K-46");
    expect(k47.teacherNotes.coPresentationNoteAr).toBeDefined();
    expect(k47.teacherNotes.classroomActivityNoteAr).toContain("٥ ثوانٍ");
    expect(
      k47.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    expect(k47.worksheet.sections[1].exercises).toHaveLength(2);
    for (const ex of k47.worksheet.sections[1].exercises) {
      expect(ex.archetype).toBe("TakeAway");
      const data = ex.data as TakeAwayData;
      expect(data.representation).toBe("five-frame");
      expect(data.responseForm).toBe("number-bond");
    }

    expect(k47.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k47.worksheet.sections[2].exercises[0].archetype).toBe(
      "JudgeEquality"
    );
    const k47Ww = k47.worksheet.sections[2].exercises[0]
      .data as import("@/archetypes/judge-equality").JudgeEqualityData;
    expect(k47Ww.operation).toBe("subtract");
    expect(k47Ww.mode).toBe("whats-wrong");
    expect(k47Ww.modelKind).toBe("number-bond");

    const k47Potd = k47.worksheet.sections[2].exercises[1];
    expect(k47Potd.archetype).toBe("TakeAway");
    // K-47 Problem of the Day Strategy Hint offers both ways (take away, or count on from the known Part)
    expect(k47Potd.strategyHintAr).toMatch(/اطرح|اشطب/);
    expect(k47Potd.strategyHintAr).toContain("عدّ");

    // 3. K-48: Prerequisite K-47, Practice has five-frame + equation with showTermLabels: true, Challenge has WHAT'S WRONG C (equation) + Problem of the Day ("Subtract or add to find the Missing Part")
    expect(k48.isAuthoredBlueprint).toBe(true);
    expect(k48.lesson.standards).toEqual(["K.OA.5"]);
    expect(k48.warmUpSourceLessonId).toBe("K-47");
    expect(k48.worksheet.sections[0].sourceLessonId).toBe("K-47");
    expect(k48.teacherNotes.classroomActivityNoteAr).toContain("٥ ثوانٍ");
    expect(
      k48.teacherNotes.commonMisconceptionsAr?.length
    ).toBeGreaterThanOrEqual(1);

    expect(k48.worksheet.sections[1].exercises).toHaveLength(2);
    for (const ex of k48.worksheet.sections[1].exercises) {
      expect(ex.archetype).toBe("TakeAway");
      const data = ex.data as TakeAwayData;
      expect(data.representation).toBe("five-frame");
      expect(data.responseForm).toBe("equation");
      expect(data.showTermLabels).toBe(true);
    }

    expect(k48.worksheet.sections[2].exercises).toHaveLength(2);
    expect(k48.worksheet.sections[2].exercises[0].archetype).toBe(
      "JudgeEquality"
    );
    const k48Ww = k48.worksheet.sections[2].exercises[0]
      .data as import("@/archetypes/judge-equality").JudgeEqualityData;
    expect(k48Ww.operation).toBe("subtract");
    expect(k48Ww.mode).toBe("whats-wrong");
    expect(k48Ww.modelKind).toBe("equation");

    const k48Potd = k48.worksheet.sections[2].exercises[1];
    expect(k48Potd.archetype).toBe("TakeAway");
    expect(k48Potd.strategyHintAr).toMatch(/اطرح|اشطب/);
    expect(k48Potd.strategyHintAr).toContain("عدّ");

    // 4. Rendered surfaces: timed flash activities ("٥ ثوانٍ") appear ONLY in Teacher Notes, never on Worksheet or Answer Key
    for (const lessonNumber of [46, 47, 48]) {
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

      expect(htmlN).toContain("٥ ثوانٍ");
      expect(htmlW).not.toContain("ثوانٍ");
      expect(htmlA).not.toContain("ثوانٍ");
      expect(htmlA).toContain('data-strategy-hint="true"');

      // Answer Slot canonical 48×48 digit size (h-12 w-12) and − (never hyphen) in subtraction Equations
      const digitSlots = [
        ...htmlW.matchAll(/<span[^>]*data-answer-slot="unknown"[^>]*>/g),
        ...htmlA.matchAll(/<span[^>]*data-answer-slot="solved-digit"[^>]*>/g),
      ];
      expect(digitSlots.length).toBeGreaterThan(0);
      for (const s of digitSlots) {
        expect(s[0]).toContain("h-12 w-12");
      }

      const eqStrips = [
        ...htmlW.matchAll(
          /<div[^>]*data-visual-model="equation-strip"[\s\S]*?<\/div>/g
        ),
        ...htmlA.matchAll(
          /<div[^>]*data-visual-model="equation-strip"[\s\S]*?<\/div>/g
        ),
      ];
      if (lessonNumber === 46 || lessonNumber === 48) {
        expect(eqStrips.length).toBeGreaterThan(0);
      }
      for (const strip of eqStrips) {
        expect(strip[0]).toContain("−");
        expect(strip[0]).not.toMatch(/aria-hidden="true">-<\/span>/);
      }

      // Seed determinism: same seed produces identical bundle, different seed varies
      const b1 = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `DET-K${lessonNumber}-A`,
      });
      const b2 = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `DET-K${lessonNumber}-A`,
      });
      const bDiff = generateWorksheet({
        grade: "K",
        lessonNumber,
        seed: `DET-K${lessonNumber}-B`,
      });
      expect(b1.worksheet).toEqual(b2.worksheet);
      expect(b1.answerKey).toEqual(b2.answerKey);
      expect(b1.worksheet.sections).not.toEqual(bDiff.worksheet.sections);

      expect(findWesternNumeralsInRenderedHtml(htmlW)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(htmlN)).toEqual([]);
    }
  });

  it("domain invariant across 25 seeds × 4 modes: every item in K-46 to K-48 satisfies Total − Part = Missing Part, every whats-wrong row has exactly one false item, and X is shown at Easy only (none at Intermediate & Advanced)", async () => {
    const { generateWorksheet } = await import("@/engine/worksheet-engine");

    const modes = ["scaffolded", "Easy", "Intermediate", "Advanced"] as const;
    for (const lessonNumber of [46, 47, 48]) {
      for (let s = 1; s <= 25; s++) {
        for (const difficultyLevel of modes) {
          const bundle = generateWorksheet({
            grade: "K",
            lessonNumber,
            seed: `K${lessonNumber}-INV-${s}`,
            difficultyLevel,
          });

          for (const section of bundle.worksheet.sections) {
            for (const ex of section.exercises) {
              expect(
                bundle.answerKey.strategyHintsByExerciseId[ex.id]?.trim().length
              ).toBeGreaterThan(0);

              if (ex.archetype === "TakeAway") {
                const ta = ex.data as TakeAwayData;
                const seenInEx = new Set<string>();
                for (const item of ta.items) {
                  expect(item.total - item.partTakenAway).toBe(
                    item.missingPart
                  );
                  expect(seenInEx.has(item.factKey)).toBe(false);
                  seenInEx.add(item.factKey);

                  if (ex.difficultyLevel === "Easy") {
                    expect(item.total).toBeLessThanOrEqual(4);
                    expect(item.partTakenAway).toBeGreaterThanOrEqual(1);
                    expect(item.missingPart).toBeGreaterThanOrEqual(1);
                  } else if (ex.difficultyLevel === "Intermediate") {
                    expect(item.total).toBeLessThanOrEqual(5);
                    expect(item.partTakenAway).toBeGreaterThanOrEqual(1);
                    expect(item.missingPart).toBeGreaterThanOrEqual(1);
                  } else {
                    expect(item.total).toBeLessThanOrEqual(5);
                    expect(item.partTakenAway).toBeGreaterThanOrEqual(0);
                    expect(item.missingPart).toBeGreaterThanOrEqual(0);
                  }

                  // For exercises sourced from K-46..K-48: X is pre-drawn (shown) at Easy only; at Intermediate and Advanced the frame shows Total with no X (none)
                  if (
                    ex.sourceLessonId === "K-46" ||
                    ex.sourceLessonId === "K-47" ||
                    ex.sourceLessonId === "K-48"
                  ) {
                    if (ex.difficultyLevel === "Easy") {
                      expect(item.crossOffMode).toBe("shown");
                      expect(item.representationModel?.crossedOutCount).toBe(
                        item.partTakenAway
                      );
                    } else {
                      expect(item.crossOffMode).toBe("none");
                      expect(item.representationModel?.crossedOutCount).toBe(0);
                    }
                  }
                }
              }

              if (ex.archetype === "JudgeEquality") {
                const jd =
                  ex.data as import("@/archetypes/judge-equality").JudgeEqualityData;
                expect(jd.operation).toBe("subtract");
                expect(jd.mode).toBe("whats-wrong");
                for (const row of jd.rows) {
                  const falseCount = row.items.filter(
                    (it) => !it.isCorrect
                  ).length;
                  expect(falseCount).toBe(1);
                }
              }
            }
          }
        }
      }
    }
  });
});
