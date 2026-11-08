import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createTenFrameSpec, TenFrameSvg } from "@/visual-models/unit-2-models";
import { getExerciseArchetype } from "@/archetypes/registry";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { createSeededRandom } from "@/lib/seed";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import type { DifficultyLevel, Exercise } from "@/domain/types";
import type {
  SubitizePartWholeBlueprintParams,
  SubitizePartWholeData,
} from "@/archetypes/subitize-part-whole";
import type { ConnectMatchBlueprintParams } from "@/archetypes/connect-match";
import type { ConnectMatchData } from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import "@/registry/bootstrap";

describe("Ticket 02 (Unit 7) — Slice 1: Ten Frame secondary/tertiary categories", () => {
  it("renders three per-category runs (RTL primary → secondary → tertiary) with their own shape and color, keeping the 240×108 canonical size", () => {
    const html = renderToStaticMarkup(
      <TenFrameSvg
        count={5}
        secondaryCount={3}
        tertiaryCount={2}
        colorTheme="sky"
        secondaryColorTheme="coral"
        tertiaryColorTheme="emerald"
        shapeId="square"
        secondaryShapeId="circle"
        tertiaryShapeId="triangle"
      />
    );

    // Canonical size unchanged (constitution §3.4)
    expect(html).toContain('width="240"');
    expect(html).toContain('height="108"');

    // Run counts in header data attributes
    expect(html).toContain('data-primary-count="٥"');
    expect(html).toContain('data-secondary-count="٣"');
    expect(html).toContain('data-tertiary-count="٢"');

    // 10 filled cells in RTL order: 5 primary (rightmost), 3 secondary, 2 tertiary
    const tones =
      html.match(/data-counter-tone="(primary|secondary|tertiary)"/g) ?? [];
    expect(tones).toHaveLength(10);
    expect(
      tones.filter((t) => t === 'data-counter-tone="primary"')
    ).toHaveLength(5);
    expect(
      tones.filter((t) => t === 'data-counter-tone="secondary"')
    ).toHaveLength(3);
    expect(
      tones.filter((t) => t === 'data-counter-tone="tertiary"')
    ).toHaveLength(2);

    // Per-run shapes: squares in the primary run, circles secondary, triangles tertiary
    const shapeAttrs =
      html.match(/data-cell-shape="(square|circle|triangle)"/g) ?? [];
    expect(
      shapeAttrs.filter((s) => s === 'data-cell-shape="square"')
    ).toHaveLength(5);
    expect(
      shapeAttrs.filter((s) => s === 'data-cell-shape="circle"')
    ).toHaveLength(3);
    expect(
      shapeAttrs.filter((s) => s === 'data-cell-shape="triangle"')
    ).toHaveLength(2);
  });

  it("run order stays RTL: primary occupies the rightmost cells, tertiary the leftmost of the filled run", () => {
    const html = renderToStaticMarkup(
      <TenFrameSvg
        count={2}
        secondaryCount={3}
        tertiaryCount={2}
        secondaryShapeId="circle"
        tertiaryShapeId="triangle"
      />
    );

    // RTL cell 1 (rightmost) belongs to the primary run; cells 3..5 secondary; 6..7 tertiary; 8..10 empty
    expect(html).toContain('data-rtl-cell="١"'); // sanity
    // No empty-slot highlights while all categories sum to 7 < 10 leaves 3 empties — they should be marked
    const emptySlots = html.match(/data-cell-state="empty"/g) ?? [];
    expect(emptySlots).toHaveLength(3);
    const ghostSlots = (html.match(/data-ghost-counter="true"/g) ?? []).length;
    expect(ghostSlots).toBe(0);
  });

  it("createTenFrameSpec stores the tertiary category in meta while preserving the existing two-category behavior", () => {
    const spec = createTenFrameSpec({
      count: 5,
      secondaryCount: 3,
      tertiaryCount: 2,
      colorTheme: "sky",
      secondaryColorTheme: "coral",
      tertiaryColorTheme: "emerald",
      shapeId: "square",
      secondaryShapeId: "circle",
      tertiaryShapeId: "triangle",
    });

    expect(spec.count).toBe(5);
    expect(spec.secondaryCount).toBe(3);
    const meta = (spec.meta ?? {}) as Record<string, unknown>;
    expect(meta.tertiaryCount).toBe(2);
    expect(meta.secondaryShapeId).toBe("circle");
    expect(meta.secondarySolidId).toBeUndefined();
    expect(meta.tertiaryColorTheme).toBe("emerald");
    expect(meta.tertiaryShapeId).toBe("triangle");

    // Existing two-category behavior unchanged
    const plain = createTenFrameSpec({ count: 6, secondaryCount: 4 });
    expect(plain.count).toBe(6);
    expect(plain.secondaryCount).toBe(4);
    const plainMeta = (plain.meta ?? {}) as Record<string, unknown>;
    expect((plainMeta.tertiaryCount as number | undefined) ?? 0).toBe(0);
  });

  it("counts summing below 10 leave ghost/empty cells intact after the tertiary run", () => {
    const html = renderToStaticMarkup(
      <TenFrameSvg
        count={3}
        secondaryCount={2}
        tertiaryCount={1}
        ghostTargetCount={2}
        secondaryShapeId="circle"
        tertiaryShapeId="triangle"
      />
    );

    expect(html).toContain('data-primary-count="٣"');
    expect(html).toContain('data-secondary-count="٢"');
    expect(html).toContain('data-tertiary-count="١"');
    // 6 filled + 2 ghosts + 2 empty = 10
    const ghostCells = (html.match(/data-ghost-counter="true"/g) ?? []).length;
    expect(ghostCells).toBe(2);
    const emptyCells = (html.match(/data-cell-state="empty"/g) ?? []).length;
    expect(emptyCells).toBe(2);
  });
});

describe("Ticket 02 (Unit 7) — Slice 2: SubitizePartWhole three-parts-to-10", () => {
  const subitizeDef = getExerciseArchetype("SubitizePartWhole");
  const lesson76 = getCurriculumCatalog().getLesson("K", 76)!;

  function generateThreeParts(
    params: SubitizePartWholeBlueprintParams,
    seed: string,
    difficultyLevel: DifficultyLevel = "Intermediate"
  ): Exercise {
    return subitizeDef.generate({
      lesson: lesson76,
      sourceLessonId: "K-76",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel,
      rng: createSeededRandom(seed),
      spec: {
        archetype: "SubitizePartWhole",
        params: params as unknown as Record<string, unknown>,
      },
    });
  }

  it("generates a three-parts-to-10 card whose three category Parts sum to 10 with each Part ≥ 1", () => {
    const ex = generateThreeParts(
      { subitizeMode: "three-parts-to-10" },
      "S3-TP-1"
    );
    const data = ex.data as SubitizePartWholeData;
    expect(data.subitizeMode).toBe("three-parts-to-10");
    expect(data.threePartCards).toHaveLength(1);

    for (const card of data.threePartCards ?? []) {
      expect(card.totalCount).toBe(10);
      expect(card.categories).toHaveLength(3);
      const counts = card.categories.map((c) => c.count);
      expect(counts.reduce((a, b) => a + b, 0)).toBe(10);
      for (const count of counts) {
        expect(count).toBeGreaterThanOrEqual(1);
        expect(count).toBeLessThanOrEqual(8);
      }
      // Each category shows its own shape/solid and fixed blue → red → green color coding
      expect(card.categories[0].colorTheme).toBe("sky");
      expect(card.categories[1].colorTheme).toBe("coral");
      expect(card.categories[2].colorTheme).toBe("emerald");
      expect(card.categories.some((c) => c.shapeId || c.solidId)).toBe(true);
      // RTL equation reads right to left: الأجزاء ثم الكلّ
      expect(card.equationRtlAr).toBe(
        `${card.categories[0].countAr} و${card.categories[1].countAr} و${card.categories[2].countAr} يكوّنون الكلّ ١٠`
      );
    }
  });

  it("Easy anchors the first Part at 5 (full top row); pinned blueprint categories and counts pass through", () => {
    const easy = (
      generateThreeParts(
        { subitizeMode: "three-parts-to-10" },
        "S3-TP-E1",
        "Easy"
      ).data as SubitizePartWholeData
    ).threePartCards!.at(0)!;

    expect(easy.categories[0].count).toBe(5);

    const pinned = (
      generateThreeParts(
        {
          subitizeMode: "three-parts-to-10",
          threePartCategorySets: [
            {
              id: "triangle-hexagon-circle",
              categories: [
                { shapeId: "triangle", colorTheme: "sky" },
                { shapeId: "hexagon", colorTheme: "coral" },
                { shapeId: "circle", colorTheme: "emerald" },
              ],
            },
          ],
        },
        "S3-TP-P1"
      ).data as SubitizePartWholeData
    ).threePartCards!.at(0)!;

    expect(pinned.categories[0].shapeId).toBe("triangle");
    expect(pinned.categories[1].shapeId).toBe("hexagon");
    expect(pinned.categories[2].shapeId).toBe("circle");
    const counts = pinned.categories.map((c) => c.count);
    expect(counts.reduce((a, b) => a + b, 0)).toBe(10);
  });

  it("renders three per-category Answer Slots plus the الكلّ badge, plural category labels, and solved values on the Answer Key", () => {
    const ex = generateThreeParts(
      { subitizeMode: "three-parts-to-10" },
      "S3-TP-R1"
    );
    const htmlW = renderToStaticMarkup(
      subitizeDef.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      subitizeDef.render({ exercise: ex, mode: "answer-key" })
    );

    expect(htmlW).toContain('data-subitize-mode="three-parts-to-10"');
    expect(htmlW).toContain('data-archetype="SubitizePartWhole"');
    // Three write slots: one per category Part
    expect(htmlW.match(/data-answer-slot="write"/g) ?? []).toHaveLength(3);
    // Category labels use Arabic plurals (مثلثات / دوائر ...) and the Total badge label الكلّ
    expect(htmlW).toContain("مثلثات");
    expect(htmlW).toContain("دوائر");
    expect(htmlW).toContain("مربعات");
    expect(htmlW).toContain("الكلّ");
    // Ten frame multi-category runs visible for the shape + color cue (grayscale §2.5)
    expect(htmlW).toContain('data-tertiary-count="');
    expect(
      (htmlW.match(/data-cell-shape="/g) ?? []).length
    ).toBeGreaterThanOrEqual(10);

    // Answer key: per-category solved slots + solved total badge
    expect(htmlA.match(/data-answer-slot="solved-digit"/g) ?? []).toHaveLength(
      3
    );
    expect(
      htmlA.match(/data-solved-subitize-three-part="/g) ?? []
    ).toHaveLength(3);
    expect(htmlA).toContain('data-solved-subitize-total="١٠"');
  });

  it("domain invariant across 25 seeds × 3 difficulty modes × 2 category sets: every card is p1+p2+p3 = 10, each Part ≥ 1, deterministic per seed", () => {
    const seeds = Array.from({ length: 25 }, (_, i) => `TP-INV-${i + 1}`);
    let deterministicChecked = false;

    for (const difficultyLevel of [
      "Easy",
      "Intermediate",
      "Advanced",
    ] as const) {
      for (const seed of seeds) {
        const exA = generateThreeParts(
          { subitizeMode: "three-parts-to-10" },
          seed,
          difficultyLevel
        );
        const exB = generateThreeParts(
          { subitizeMode: "three-parts-to-10" },
          seed,
          difficultyLevel
        );
        if (!deterministicChecked) {
          expect(exA.data).toEqual(exB.data);
          deterministicChecked = true;
        }

        const data = exA.data as SubitizePartWholeData;
        for (const card of data.threePartCards ?? []) {
          const counts = card.categories.map((c) => c.count);
          expect(counts.reduce((a, b) => a + b, 0)).toBe(10);
          for (const count of counts) {
            expect(count).toBeGreaterThanOrEqual(1);
          }
          expect(card.categories[0].colorTheme).toBe("sky");
          expect(card.categories[1].colorTheme).toBe("coral");
          expect(card.categories[2].colorTheme).toBe("emerald");
        }
      }
    }
  });

  it("renders no Western numerals and keeps child-voice prompts opening with an approved imperative", () => {
    const ex = generateThreeParts(
      { subitizeMode: "three-parts-to-10" },
      "S3-TP-N1"
    );
    expect(ex.promptAr.startsWith("انظر")).toBe(true);
    expect(ex.promptAr).toContain("ثم");
    const htmlA = renderToStaticMarkup(
      subitizeDef.render({ exercise: ex, mode: "answer-key" })
    );
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });
});

describe("Ticket 02 (Unit 7) — Cycle 3: ConnectMatch ten-frame-to-description", () => {
  const connectDef = getExerciseArchetype("ConnectMatch");
  const lesson77 = getCurriculumCatalog().getLesson("K", 77)!;

  function generateMatch(
    params: ConnectMatchBlueprintParams,
    seed: string,
    difficultyLevel: DifficultyLevel = "Advanced"
  ): Exercise {
    return connectDef.generate({
      lesson: lesson77,
      sourceLessonId: "K-77",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 1,
      difficultyLevel,
      rng: createSeededRandom(seed),
      spec: {
        archetype: "ConnectMatch",
        params: params as unknown as Record<string, unknown>,
      },
    });
  }

  it("generates 2-category matches: multi-category ten frames ↔ Arabic plural descriptions with 1-to-1 solutions and no repeated compositions", () => {
    const ex = generateMatch(
      {
        matchKind: "ten-frame-to-description",
        categoryCount: 2,
        descriptionCategorySets: [
          {
            id: "square-circle",
            categories: [
              { shapeId: "square", colorTheme: "sky" },
              { shapeId: "circle", colorTheme: "coral" },
            ],
          },
        ],
        pairCount: 3,
      },
      "CM-2C-1"
    );
    const data = ex.data as ConnectMatchData;

    expect(data.kind).toBe("ConnectMatch");
    expect(data.rightItems).toHaveLength(3);
    expect(data.leftItems).toHaveLength(3);
    expect(data.rightColumnTitleAr).toBe("لوحة العشرة");
    expect(data.leftColumnTitleAr).toBe("الوصف");
    // Child-voice prompt without the "write the total" clause for A/B variants
    expect(ex.promptAr).toBe("صِلْ كلّ لوحة عشرة بالوصف المطابق:");

    const compositionKeys = new Set<string>();
    for (const pair of data.pairs) {
      const frame = pair.rightItem;
      expect(frame.kind).toBe("ten-frame");
      const parts = [frame.count ?? 0, frame.secondaryCount ?? 0];
      expect(parts.reduce((a, b) => a + b, 0)).toBe(10);
      for (const part of parts) {
        expect(part).toBeGreaterThanOrEqual(1);
      }
      compositionKeys.add(parts.join(":"));

      const meta = (frame.meta ?? {}) as Record<string, unknown>;
      expect(meta.shapeId).toBe("square");
      expect(meta.secondaryShapeId).toBe("circle");

      const desc = pair.leftItem;
      expect(desc.kind).toBe("shape-description");
      const descSplit = (desc.meta?.textAr as string).split(" و");
      // «٧ مربعات و٣ دوائر»: part-count followed by the plural label per side
      expect(descSplit).toHaveLength(2);
      expect(descSplit[0]).toContain("مربعات");
      expect(descSplit[1]).toContain("دوائر");
      expect(desc.meta?.textAr as string).toContain(
        `${formatEasternNumber(parts[0])}`
      );
    }
    // §7.3: every composition in the exercise is distinct
    expect(compositionKeys.size).toBe(3);

    // Solution map is a 1-to-1 bijection
    const solvedLeftIds = Object.values(data.solutionMap);
    expect(new Set(solvedLeftIds).size).toBe(3);
    for (const rightId of data.rightItems.map((r) => r.id)) {
      expect(data.solutionMap[rightId]).toBeDefined();
    }
    // Answer-key reason reflects parts and total
    expect(data.pairs[0].connectionReasonAr).toContain("١٠");
  });

  it("generates 3-category matches: tertiary ten-frame run and a three-part description", () => {
    const ex = generateMatch(
      {
        matchKind: "ten-frame-to-description",
        categoryCount: 3,
        pairCount: 3,
      },
      "CM-3C-1"
    );
    const data = ex.data as ConnectMatchData;

    for (const pair of data.pairs) {
      const frame = pair.rightItem;
      const meta = (frame.meta ?? {}) as Record<string, unknown>;
      expect(frame.secondaryCount ?? 0).toBeGreaterThanOrEqual(1);
      expect((meta.tertiaryCount as number) ?? 0).toBeGreaterThanOrEqual(1);
      expect(meta.tertiaryShapeId ?? meta.tertiarySolidId).toBeDefined();

      const descText = String(pair.leftItem.meta?.textAr ?? "");
      const descSplit = descText.split(" و");
      expect(descSplit).toHaveLength(3);
      const labels = new Set<string>();
      for (const clause of descSplit) {
        const words = clause.split(" ");
        expect(words).toHaveLength(2);
        expect(words[0]).toMatch(/^[٠-٩]+$/); // Eastern numerals count
        labels.add(words[1]);
      }
      // Grayscale cue (§2.5): all three Parts are named by distinct plural labels
      expect(labels.size).toBe(3);
    }
  });

  it("MATCHING C (missingTotal) renders the description text plus a canonical AnswerSlot for الكلّ and solves to 10", () => {
    const ex = generateMatch(
      {
        matchKind: "ten-frame-to-description",
        categoryCount: 2,
        missingTotal: true,
        pairCount: 3,
      },
      "CM-MT-1"
    );
    const data = ex.data as ConnectMatchData;
    expect(ex.promptAr).toBe(
      "صِلْ كلّ لوحة عشرة بالوصف المطابق، ثم اكتب الكلّ في المربّع:"
    );
    for (const pair of data.pairs) {
      const meta = (pair.leftItem.meta ?? {}) as Record<string, unknown>;
      expect(meta.isTenFrameDescriptionEndpoint).toBe(true);
      expect(meta.missingTotal).toBe(10);
    }

    const htmlW = renderToStaticMarkup(
      connectDef.render({ exercise: ex, mode: "worksheet" })
    );
    const htmlA = renderToStaticMarkup(
      connectDef.render({ exercise: ex, mode: "answer-key" })
    );

    // Worksheet: description endpoints are unsolved unknown slots
    expect(
      htmlW.match(/data-ten-frame-description-endpoint="true"/g) ?? []
    ).toHaveLength(3);
    expect((htmlW.match(/data-answer-slot="unknown"/g) ?? []).length).toBe(3);
    expect(htmlA).toContain("الكلّ");
    // Answer key: solved slots carry the total ١٠
    expect(
      htmlA.match(/data-solved-match-description-total/g) ?? []
    ).toHaveLength(3);
    expect(htmlA).toContain('data-solved-match-description-total="١٠"');
    // Grayscale-safe per-shape runs still present on the frames
    expect((htmlA.match(/data-cell-shape="/g) ?? []).length).toBe(30);
    expect(findWesternNumeralsInRenderedHtml(htmlA)).toEqual([]);
  });

  it("domain invariant across 30 seeds and both arities: parts ≥ 1, sum 10, distinct compositions, deterministic per seed", () => {
    const seeds = Array.from({ length: 30 }, (_, i) => `CM-INV-${i + 1}`);
    let deterministicChecked = false;

    for (const categoryCount of [2, 3] as const) {
      for (const seed of seeds) {
        const exA = generateMatch(
          { matchKind: "ten-frame-to-description", categoryCount },
          seed
        );
        const exB = generateMatch(
          { matchKind: "ten-frame-to-description", categoryCount },
          seed
        );
        if (!deterministicChecked) {
          expect(exA.data).toEqual(exB.data);
          deterministicChecked = true;
        }

        const data = exA.data as ConnectMatchData;
        const keys = new Set<string>();
        for (const pair of data.pairs) {
          const frame = pair.rightItem;
          const meta = (frame.meta ?? {}) as Record<string, unknown>;
          const parts = [frame.count ?? 0, frame.secondaryCount ?? 0];
          const tertiary = (meta.tertiaryCount as number) ?? 0;
          if (tertiary > 0) parts.push(tertiary);
          expect(parts.reduce((a, b) => a + b, 0)).toBe(10);
          for (const part of parts) {
            expect(part).toBeGreaterThanOrEqual(1);
          }
          keys.add(parts.join(":"));
        }
        expect(keys.size).toBe(data.pairs.length);
      }
    }
  });
});

describe("Ticket 02 (Unit 7) — Lesson blueprints K-75, K-76, K-77 (registered)", () => {
  it("generates Lessons K-75/K-76/K-77 with Warm-Ups sourced from the prerequisite graph (K-74 → K-75 → next lessons)", () => {
    const k75 = generateWorksheet({
      grade: "K",
      lessonNumber: 75,
      seed: "BP-75-A",
      difficultyLevel: "scaffolded",
    });
    const k76 = generateWorksheet({
      grade: "K",
      lessonNumber: 76,
      seed: "BP-76-A",
      difficultyLevel: "scaffolded",
    });
    const k77 = generateWorksheet({
      grade: "K",
      lessonNumber: 77,
      seed: "BP-77-A",
      difficultyLevel: "scaffolded",
    });

    expect(k75.warmUpSourceLessonId).toBe("K-74");
    expect(k76.warmUpSourceLessonId).toBe("K-75");
    expect(k77.warmUpSourceLessonId).toBe("K-75");

    for (const bundle of [k75, k76, k77]) {
      expect(bundle.worksheet.sections).toHaveLength(3);
      expect(bundle.answerKey.sections).toHaveLength(3);
      expect(
        bundle.worksheet.sections.flatMap((s) => s.exercises).length
      ).toBeGreaterThanOrEqual(4);
    }

    // K-75 header uses the authored Arabic title
    expect(k75.worksheet.header.lessonTitleAr).toBe(
      "نمذجة مكوّنات العدد ١٠ بجزأين"
    );
    expect(k76.worksheet.header.lessonTitleAr).toBe(
      "نمذجة مكوّنات العدد ١٠ بثلاثة أجزاء"
    );
  });

  it("renders Lessons K-75..K-77 across seeds and difficulty modes with zero Western numerals", () => {
    for (const lessonNumber of [75, 76, 77]) {
      for (const seed of ["LG-A", "LG-B"]) {
        for (const difficultyLevel of [
          "Easy",
          "Intermediate",
          "Advanced",
        ] as const) {
          for (const viewMode of ["worksheet", "answer-key"] as const) {
            const html = renderWorksheetSurface({
              grade: "K",
              lessonNumber,
              seed,
              difficultyLevel,
              viewMode,
            });
            const western = findWesternNumeralsInRenderedHtml(html);
            if (western.length > 0) {
              console.error(
                `K-${lessonNumber} seed=${seed} ${difficultyLevel}/${viewMode}: ${western.join(" | ")}`
              );
            }
            expect(western).toEqual([]);
          }
        }
      }
    }
  });

  it("keeps the K-75/K-77 two-part invariant (filled + empty = 10) and the K-76 three-part invariant (parts sum 10, all ≥ 1) on every practice card", () => {
    const catalog = getCurriculumCatalog();

    for (const lessonNumber of [75, 76, 77]) {
      for (const difficultyLevel of [
        "Easy",
        "Intermediate",
        "Advanced",
      ] as const) {
        for (const seed of ["INV-75-1", "INV-75-2", "INV-75-3"]) {
          const bundle = generateWorksheet({
            grade: "K",
            lessonNumber,
            seed,
            difficultyLevel,
          });

          const practice = bundle.worksheet.sections[1];
          for (const exercise of practice.exercises) {
            const data = exercise.data as unknown as
              SubitizePartWholeData | ConnectMatchData;
            if (data.kind === "SubitizePartWhole") {
              if (data.subitizeMode === "three-parts-to-10") {
                for (const card of data.threePartCards ?? []) {
                  const counts = card.categories.map((c) => c.count);
                  expect(counts.reduce((a, b) => a + b, 0)).toBe(10);
                  for (const count of counts) {
                    expect(count).toBeGreaterThanOrEqual(1);
                  }
                  expect(card.categories[0].colorTheme).toBe("sky");
                  expect(card.categories[1].colorTheme).toBe("coral");
                  expect(card.categories[2].colorTheme).toBe("emerald");
                }
              } else {
                for (const card of data.cards) {
                  expect(card.filledCount + card.missingCount).toBe(
                    card.totalCount
                  );
                  expect(card.totalCount).toBe(10);
                }
              }
            }
            if (data.kind === "ConnectMatch") {
              expect(data.rightColumnTitleAr).toBe("لوحة العشرة");
              for (const pair of data.pairs) {
                const frame = pair.rightItem;
                const meta = (frame.meta ?? {}) as Record<string, unknown>;
                const tertiary = (meta.tertiaryCount as number) ?? 0;
                const parts = [
                  frame.count ?? 0,
                  frame.secondaryCount ?? 0,
                  tertiary,
                ];
                expect(parts.reduce((a, b) => a + b, 0)).toBe(10);
              }
            }
          }
        }
      }
    }
    expect(catalog.getLesson("K", 75)).toBeDefined();
  });

  it("carries the authored challenge (Brain Builder only) for each lesson: MATCHING A 2-part, MATCHING B 3-part, MATCHING C missing total", () => {
    const cases = [
      { lessonNumber: 75, categoryCount: 2, missingTotal: false },
      { lessonNumber: 76, categoryCount: 3, missingTotal: false },
      { lessonNumber: 77, categoryCount: 2, missingTotal: true },
    ] as const;
    for (const { lessonNumber, categoryCount, missingTotal } of cases) {
      for (const difficultyLevel of [
        "Easy",
        "Intermediate",
        "Advanced",
      ] as const) {
        const bundle = generateWorksheet({
          grade: "K",
          lessonNumber,
          seed: `BB-${lessonNumber}`,
          difficultyLevel,
        });
        const challenge = bundle.worksheet.sections[2];
        // Brain Builder only (ticket-01 precedent: single challenge exercise)
        expect(challenge.exercises).toHaveLength(1);
        const exercise = challenge.exercises[0];
        expect(exercise.archetype).toBe("ConnectMatch");
        const data = exercise.data as ConnectMatchData;
        expect(data.pairs).toHaveLength(3);
        // A/B prompts omit the total clause; C has it
        if (missingTotal) {
          expect(exercise.promptAr).toBe(
            "صِلْ كلّ لوحة عشرة بالوصف المطابق، ثم اكتب الكلّ في المربّع:"
          );
        } else {
          expect(exercise.promptAr).toBe("صِلْ كلّ لوحة عشرة بالوصف المطابق:");
        }
        // MATCHING B runs three category Parts; A/C stay two-part
        for (const pair of data.pairs) {
          const meta = (pair.rightItem.meta ?? {}) as Record<string, unknown>;
          const tertiaryCount = (meta.tertiaryCount as number) ?? 0;
          if (categoryCount === 3) {
            expect(tertiaryCount).toBeGreaterThanOrEqual(1);
          } else {
            expect(tertiaryCount).toBe(0);
          }
        }
      }
    }
  });
});
