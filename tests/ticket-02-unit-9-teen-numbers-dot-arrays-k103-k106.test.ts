import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { VisualModelView } from "@/visual-models/registry";
import {
  createDotArraySpec,
  type DotArraySpecOptions,
} from "@/visual-models/dot-array";
import {
  createNumeralTraceSpec,
  getArabicNumberWord,
  createTallyMarksSpec,
} from "@/visual-models/unit-2-models";
import { getExerciseArchetype } from "@/archetypes/registry";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { createSeededRandom } from "@/lib/seed";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import type { ModelCountAndTraceData } from "@/archetypes/model-count-and-trace";
import type { SubitizePartWholeData } from "@/archetypes/subitize-part-whole";
import type { PictureGraphReadData } from "@/archetypes/picture-graph-read";
import type { MeasureAndCompareLengthData } from "@/archetypes/measure-and-compare-length";
import type { SequenceAndZeroData } from "@/archetypes/sequence-and-zero";
import type { ConnectMatchData } from "@/domain/types";
import { createPictureGraphSpec } from "@/visual-models/picture-graphs";
import "@/registry/bootstrap";

describe("Ticket 02 (Unit 9) — Slice 1: dot-array Visual Model", () => {
  it("renders a complete array at canonical size 212 × 160 px with RTL fill", () => {
    const spec = createDotArraySpec({ rows: 3, columns: 5 });

    const html = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );

    expect(html).toContain('data-visual-model="dot-array"');
    expect(html).toContain('data-direction="rtl"');
    expect(html).toContain("width:212px");
    // Canonical 212 × 160 box is carried by the svg (the wrapper stays fluid
    // so the array can scale down inside narrow columns).
    expect(html).toContain('width="212"');
    expect(html).toContain('height="160"');
    expect(html).toContain('viewBox="0 0 212 160"');
    expect(html).toContain('data-filled-count="١٥"');
    expect(html).toContain('data-rows="٣"');
    expect(html).toContain('data-columns="٥"');
    // Worksheet mode: no answer-key grouping containers
    expect(html).not.toContain("data-subitize-group=");
    // 15 filled dots
    const dotMatches = html.match(/data-dot-filled="true"/g);
    expect(dotMatches).not.toBeNull();
    expect(dotMatches?.length).toBe(15);
  });

  it("renders a near array with an incomplete bottom row", () => {
    // 3 × 5 with a gap of 2 in the bottom row → 13 dots
    const spec = createDotArraySpec({ rows: 3, columns: 5, gap: 2 });

    const html = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );

    expect(html).toContain('data-filled-count="١٣"');
    expect(html).toContain('data-near-array="true"');
    const filledMatches = html.match(/data-dot-filled="true"/g);
    expect(filledMatches?.length).toBe(13);
    const emptyMatches = html.match(/data-dot-filled="false"/g);
    expect(emptyMatches?.length).toBe(2);
  });

  it("fills dots right to left, top to bottom (first dot is top-right)", () => {
    // 2 × 3 array: the first filled position must be the top-right cell,
    // and a near array leaves the top-left of the bottom row empty.
    const spec = createDotArraySpec({ rows: 2, columns: 3, gap: 2 });

    const html = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );

    // Bottom row keeps only its rightmost cell filled (4 filled, 2 empty)
    const filledMatches = html.match(/data-dot-filled="true"/g);
    expect(filledMatches?.length).toBe(4);
    // The empty cells carry their RTL grid coordinates; the last filled dot
    // in the bottom row is the rightmost one.
    expect(html).toContain(
      'data-dot-r="٢" data-dot-c="١" data-dot-filled="true"'
    );
  });

  it("answer-key state shows dashed groups-of-5 containers in accent style", () => {
    const spec = createDotArraySpec({ rows: 3, columns: 5 });

    const akHtml = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: true })
    );

    // 15 dots → three dashed subitizing groups of 5
    const groupMatches = akHtml.match(/data-subitize-group="true"/g);
    expect(groupMatches).not.toBeNull();
    expect(groupMatches?.length).toBe(3);
    expect(akHtml).toContain('data-group-count="٥"');
  });

  it("domain invariant: filled count equals rows × columns (complete) or rows × columns − gap (near array)", () => {
    const optionSets: DotArraySpecOptions[] = [
      { rows: 2, columns: 5 },
      { rows: 4, columns: 4 },
      { rows: 3, columns: 5, gap: 2 },
      { rows: 4, columns: 5, gap: 4 },
      { rows: 2, columns: 10 },
      { rows: 3, columns: 4 },
    ];

    for (const options of optionSets) {
      const spec = createDotArraySpec(options);
      const expected = options.rows * options.columns - (options.gap ?? 0);
      expect(spec.count).toBe(expected);
      expect(spec.meta?.filledCount).toBe(expected);
    }
  });
});

describe("Ticket 02 (Unit 9) — Slice 2: composite numeral-trace 11–20", () => {
  it("builds a composite spec for teen digits with positional tens/ones guides", () => {
    const spec = createNumeralTraceSpec({ digit: 14, colorTheme: "amber" });

    expect(spec.kind).toBe("numeral-trace");
    expect(spec.digit).toBe(14);
    expect(spec.meta?.compositeDigits).toEqual([1, 4]);
    expect(spec.labelAr).toContain("١٤");
  });

  it("domain invariant: every teen 11–20 decomposes into valid single-digit guides", () => {
    for (let n = 11; n <= 20; n++) {
      const spec = createNumeralTraceSpec({ digit: n });
      const composite = spec.meta?.compositeDigits as number[] | undefined;
      const [tens, ones] = composite ?? [0, 0];
      expect(composite, `compositeDigits for ${n}`).toBeDefined();
      expect(composite?.length).toBe(2);
      expect(tens).toBeGreaterThanOrEqual(1);
      expect(tens).toBeLessThanOrEqual(2);
      expect(ones).toBeGreaterThanOrEqual(0);
      expect(ones).toBeLessThanOrEqual(9);
      expect(tens * 10 + ones).toBe(n);
    }
  });

  it("renders two side-by-side single-digit trace cards in positional order", () => {
    const spec = createNumeralTraceSpec({ digit: 14 });

    const html = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );

    expect(html).toContain('data-visual-model="numeral-trace"');
    expect(html).toContain('data-composite="true"');
    expect(html).toContain('data-digit="١٤"');
    // Tens guide and ones guide both present
    expect(html).toContain('data-digit="١"');
    expect(html).toContain('data-digit="٤"');
    // §9.3: positional digit order survives the RTL surface — the pair is
    // laid out LTR so the tens card sits left of the ones card
    expect(html).toContain('dir="ltr"');
    // Two handwriting cards (background rects per digit)
    const traceCards = html.match(/data-trace-card="true"/g);
    expect(traceCards?.length).toBe(2);
  });

  it("single digits keep the existing non-composite trace", () => {
    const spec = createNumeralTraceSpec({ digit: 7 });

    expect(spec.meta?.compositeDigits).toBeUndefined();

    const html = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );
    expect(html).not.toContain('data-composite="true"');
    expect(html).toContain('data-digit="٧"');
  });
});

describe("Ticket 02 (Unit 9) — Slice 2: Arabic number words 11–20", () => {
  it("covers teen words and 20", () => {
    expect(getArabicNumberWord(11)).toBe("أحد عشر");
    expect(getArabicNumberWord(12)).toBe("اثنا عشر");
    expect(getArabicNumberWord(13)).toBe("ثلاثة عشر");
    expect(getArabicNumberWord(14)).toBe("أربعة عشر");
    expect(getArabicNumberWord(15)).toBe("خمسة عشر");
    expect(getArabicNumberWord(16)).toBe("ستة عشر");
    expect(getArabicNumberWord(17)).toBe("سبعة عشر");
    expect(getArabicNumberWord(18)).toBe("ثمانية عشر");
    expect(getArabicNumberWord(19)).toBe("تسعة عشر");
    expect(getArabicNumberWord(20)).toBe("عشرون");
    expect(getArabicNumberWord(5)).toBe("خمسة");
  });
});

describe("Ticket 02 (Unit 9) — Slice 2: ModelCountAndTrace teen items (K-103)", () => {
  const archetype = getExerciseArchetype("ModelCountAndTrace");
  const catalog = getCurriculumCatalog();
  const lesson103 = catalog.getLesson("K", 103)!;

  it("generates everyday-object groups of 10 and some more across seeds and tiers", () => {
    const seeds = Array.from({ length: 6 }, (_, i) => `K103-SEED-${i + 1}`);
    const tiers = ["Easy", "Intermediate", "Advanced"] as const;

    for (const seed of seeds) {
      for (const tier of tiers) {
        const exercise = archetype.generate({
          lesson: lesson103,
          sourceLessonId: "K-103",
          sectionId: "practice",
          exerciseIndex: 0,
          exerciseNumber: 2,
          difficultyLevel: tier,
          rng: createSeededRandom(`${seed}-${tier}`),
          spec: {
            archetype: "ModelCountAndTrace",
            params: { modelKind: "everyday-object" },
          },
        });

        const data = exercise.data as ModelCountAndTraceData;
        for (const item of data.items) {
          expect(item.targetNumber).toBeGreaterThanOrEqual(11);
          expect(item.targetNumber).toBeLessThanOrEqual(20);
          expect(item.quantityModel.kind).toBe("everyday-object");
          // 10-group + ones-group: primary 10, secondary = the ones
          expect(item.quantityModel.count).toBe(10);
          expect(item.quantityModel.secondaryCount).toBe(
            item.targetNumber - 10
          );
          expect(item.traceModel.meta?.compositeDigits).toEqual([
            Math.floor(item.targetNumber / 10),
            item.targetNumber % 10,
          ]);
          // Teen part-whole note names the 10 part
          expect(item.partWholeNoteAr).toContain("١٠ و");
        }
      }
    }
  });

  it("renders composite traces and writes the total with no Western numerals", () => {
    const exercise = archetype.generate({
      lesson: lesson103,
      sourceLessonId: "K-103",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K103-RENDER"),
      spec: {
        archetype: "ModelCountAndTrace",
        params: { modelKind: "everyday-object" },
      },
    });

    const wsHtml = renderToStaticMarkup(
      archetype.render({ exercise, mode: "worksheet" })
    );
    expect(wsHtml).toContain('data-visual-model="numeral-trace"');
    expect(wsHtml).toContain('data-composite="true"');
    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);

    const akHtml = renderToStaticMarkup(
      archetype.render({ exercise, mode: "answer-key" })
    );
    expect(akHtml).toContain("data-solved-model-count=");
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });
});

describe("Ticket 02 (Unit 9) — Slice 2: SubitizePartWhole decompose-teen", () => {
  const archetype = getExerciseArchetype("SubitizePartWhole");
  const catalog = getCurriculumCatalog();
  const lesson103 = catalog.getLesson("K", 103)!;

  it("generates teen decomposition cards (10 + ones) across seeds and tiers", () => {
    const seeds = Array.from({ length: 6 }, (_, i) => `DT-SEED-${i + 1}`);
    const tiers = ["Easy", "Intermediate", "Advanced"] as const;

    for (const seed of seeds) {
      for (const tier of tiers) {
        const exercise = archetype.generate({
          lesson: lesson103,
          sourceLessonId: "K-103",
          sectionId: "challenge",
          exerciseIndex: 0,
          exerciseNumber: 5,
          difficultyLevel: tier,
          rng: createSeededRandom(`${seed}-${tier}`),
          spec: {
            archetype: "SubitizePartWhole",
            params: { subitizeMode: "decompose-teen" },
          },
        });

        const data = exercise.data as SubitizePartWholeData;
        expect(data.subitizeMode).toBe("decompose-teen");
        expect(data.cards.length).toBeGreaterThanOrEqual(2);

        for (const card of data.cards) {
          const maxTeen = tier === "Easy" ? 15 : 20;
          expect(card.totalCount).toBeGreaterThanOrEqual(11);
          expect(card.totalCount).toBeLessThanOrEqual(maxTeen);
          expect(card.filledCount).toBe(10);
          expect(card.missingCount).toBe(card.totalCount - 10);
          expect(card.equationRtlAr).toContain("١٠ و");
          expect(card.visualModel.kind).toBe("ten-frame");
          expect(card.visualModel.count).toBe(10);
          expect(card.companionModel).toBeDefined();
          expect(card.companionModel?.count).toBe(card.missingCount);
        }
      }
    }
  });

  it("renders the ١٠ part, the ones part, and the whole with slots; solved on the answer key", () => {
    const exercise = archetype.generate({
      lesson: lesson103,
      sourceLessonId: "K-103",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 5,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("DT-RENDER"),
      spec: {
        archetype: "SubitizePartWhole",
        params: { subitizeMode: "decompose-teen" },
      },
    });

    const data = exercise.data as SubitizePartWholeData;
    const wsHtml = renderToStaticMarkup(
      archetype.render({ exercise, mode: "worksheet" })
    );
    expect(wsHtml).toContain('data-subitize-mode="decompose-teen"');
    expect(wsHtml).toContain('data-decompose-ten="١٠"');
    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);

    const akHtml = renderToStaticMarkup(
      archetype.render({ exercise, mode: "answer-key" })
    );
    const onesSlot = akHtml.match(/data-solved-decompose-ones="(\d+)"/);
    // Eastern Arabic digits, so match on the data attribute existing with the teen ones
    expect(onesSlot).not.toBeNull();
    const firstCard = data.cards[0];
    expect(onesSlot?.[1]).toBe(String(firstCard.missingCount));
    expect(akHtml).toContain(
      `data-solved-decompose-total="${firstCard.totalCount}"`
    );
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });

  it("uses solid shapes when solidId is declared (K-104 Problem of the Day)", () => {
    const exercise = archetype.generate({
      lesson: catalog.getLesson("K", 104)!,
      sourceLessonId: "K-104",
      sectionId: "challenge",
      exerciseIndex: 0,
      exerciseNumber: 5,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("DT-SOLID"),
      spec: {
        archetype: "SubitizePartWhole",
        params: { subitizeMode: "decompose-teen", solidId: "cube" },
      },
    });

    const data = exercise.data as SubitizePartWholeData;
    for (const card of data.cards) {
      expect(card.companionModel?.kind).toBe("solid-3d");
      expect(card.solidId).toBe("cube");
    }
  });
});

describe("Ticket 02 (Unit 9) — Slice 2: K-103 blueprint and full surfaces", () => {
  it("renders K-103 with the K-62 warm-up, teen everyday-object practice, and a decompose-teen PoD", () => {
    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 103,
      seed: "K103-SEAM-TEST",
      difficultyLevel: "scaffolded",
    });

    expect(generated.warmUpSourceLessonId).toBe("K-62");
    expect(generated.worksheet.sections).toHaveLength(3);
    expect(generated.worksheet.header.lessonTitleAr).toContain(
      "الأعداد المراهقة"
    );
    // Warm-up + practice (≥2 items) + challenge (PoD + BB)
    expect(
      generated.worksheet.sections[0].exercises.length
    ).toBeGreaterThanOrEqual(1);
    expect(
      generated.worksheet.sections[1].exercises.length
    ).toBeGreaterThanOrEqual(2);
    expect(
      generated.worksheet.sections[2].exercises.length
    ).toBeGreaterThanOrEqual(2);

    const wsHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 103,
      seed: "K103-SEAM-TEST",
      viewMode: "worksheet",
    });
    const akHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 103,
      seed: "K103-SEAM-TEST",
      viewMode: "answer-key",
    });
    const tnHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 103,
      seed: "K103-SEAM-TEST",
      viewMode: "teacher-notes",
    });

    // PoD: decompose-teen slots on the challenge card
    expect(wsHtml).toContain('data-subitize-mode="decompose-teen"');
    expect(wsHtml).toContain('data-decompose-ten="١٠"');
    // BB: composite numeral traces of teens
    expect(wsHtml).toContain('data-composite="true"');
    // Teacher notes surface
    expect(tnHtml).toContain("ملاحظات المعلم");

    // No Western numerals anywhere student-facing
    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(tnHtml)).toEqual([]);
  });
});

describe("Ticket 02 (Unit 9) — Slice 3: picture-graph counts to 20 (K-104)", () => {
  it("builds a picture-graph spec with maxCount 20 and a 10-per-sub-row wrap", () => {
    const spec = createPictureGraphSpec({
      orientation: "horizontal",
      titleAr: "أدواتنا في الصف",
      categories: [
        { labelAr: "الدفاتر", objectId: "book", count: 14, colorTheme: "sky" },
        {
          labelAr: "الأقلام",
          objectId: "pencil",
          count: 6,
          colorTheme: "amber",
        },
      ],
      maxCount: 20,
    });

    expect(spec.meta?.maxCount).toBe(20);
    expect(spec.meta?.maxPerRow).toBe(10);

    const html = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );
    expect(html).toContain('data-orientation="horizontal"');
    expect(html).toContain('data-max-count="٢٠"');
    // 14-count row wraps into two sub-rows
    expect(html).toContain('data-sub-row="١"');
    expect(html).toContain('data-sub-row="٢"');
    // Total filled icons = 14 + 6
    const filled = html.match(/data-cell-filled="true"/g);
    expect(filled?.length).toBe(20);
    // Milestone guides highlight at 5 and 10 (and 15/20 align on the same columns)
    expect(html.match(/data-milestone="true"/g)?.length).toBeGreaterThanOrEqual(
      2
    );
  });

  it("generates PictureGraphRead items with counts to 20 and composite traces beyond 10", () => {
    const archetype = getExerciseArchetype("PictureGraphRead");
    const catalog = getCurriculumCatalog();
    const lesson104 = catalog.getLesson("K", 104)!;

    const seeds = Array.from({ length: 6 }, (_, i) => `K104-SEED-${i + 1}`);
    for (const seed of seeds) {
      const exercise = archetype.generate({
        lesson: lesson104,
        sourceLessonId: "K-104",
        sectionId: "practice",
        exerciseIndex: 0,
        exerciseNumber: 2,
        difficultyLevel: "Intermediate",
        rng: createSeededRandom(seed),
        spec: {
          archetype: "PictureGraphRead",
          params: {
            maxCount: 20,
            categories: [
              { labelAr: "الدفاتر", objectId: "book", count: 14 },
              { labelAr: "الأقلام", objectId: "pencil", count: 11 },
            ],
            responseMode: "trace-and-write",
          },
        },
      });

      const data = exercise.data as PictureGraphReadData;
      for (const cat of data.categories) {
        expect(cat.count).toBeGreaterThanOrEqual(11);
        expect(cat.count).toBeLessThanOrEqual(20);
        expect(cat.traceModel.meta?.compositeDigits).toEqual([
          Math.floor(cat.count / 10),
          cat.count % 10,
        ]);
      }

      const wsHtml = renderToStaticMarkup(
        archetype.render({ exercise, mode: "worksheet" })
      );
      expect(wsHtml).toContain('data-sub-row="٢"');
      expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    }
  });
});

describe("Ticket 02 (Unit 9) — Slice 3: K-104 blueprint and full surfaces", () => {
  it("renders K-104 with picture-graph practice to 20, a decompose-teen PoD with solids, and a comparison BB", () => {
    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 104,
      seed: "K104-SEAM-TEST",
      difficultyLevel: "scaffolded",
    });

    expect(generated.warmUpSourceLessonId).toBe("K-63");
    expect(generated.worksheet.sections).toHaveLength(3);
    expect(generated.worksheet.header.lessonTitleAr).toContain(
      "الأعداد المراهقة"
    );
    expect(
      generated.worksheet.sections[0].exercises.length
    ).toBeGreaterThanOrEqual(1);
    expect(
      generated.worksheet.sections[1].exercises.length
    ).toBeGreaterThanOrEqual(2);
    expect(
      generated.worksheet.sections[2].exercises.length
    ).toBeGreaterThanOrEqual(2);

    const wsHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 104,
      seed: "K104-SEAM-TEST",
      viewMode: "worksheet",
    });
    const akHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 104,
      seed: "K104-SEAM-TEST",
      viewMode: "answer-key",
    });

    // Practice: picture-graph rows wrapping at 10
    expect(wsHtml).toContain('data-sub-row="٢"');
    // PoD: decompose-teen with a solid companion
    expect(wsHtml).toContain('data-subitize-mode="decompose-teen"');
    // BB: comparison statement
    expect(akHtml).toContain("data-solved-comparison-answer");
    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });
});

describe("Ticket 02 (Unit 9) — Slice 4: K-105 polygon-perimeter reuse", () => {
  const catalog = getCurriculumCatalog();
  const lesson105 = catalog.getLesson("K", 105)!;
  const macArchetype = getExerciseArchetype("MeasureAndCompareLength");
  const cmArchetype = getExerciseArchetype("ConnectMatch");

  it("domain invariant: perimeter total equals sides × clips per side within tier ranges", () => {
    const tierPolygonSets: Record<
      string,
      Array<{
        shapeId: string;
        shapeNameAr: string;
        sideCount: number;
        clipsPerSide: number;
        colorTheme: string;
      }>
    > = {
      Easy: [
        {
          shapeId: "triangle",
          shapeNameAr: "مثلث",
          sideCount: 3,
          clipsPerSide: 2,
          colorTheme: "amber",
        },
        {
          shapeId: "square",
          shapeNameAr: "مربع",
          sideCount: 4,
          clipsPerSide: 1,
          colorTheme: "sky",
        },
      ],
      Intermediate: [
        {
          shapeId: "pentagon",
          shapeNameAr: "خماسي",
          sideCount: 5,
          clipsPerSide: 2,
          colorTheme: "violet",
        },
        {
          shapeId: "rectangle",
          shapeNameAr: "مستطيل",
          sideCount: 4,
          clipsPerSide: 2,
          colorTheme: "emerald",
        },
      ],
      Advanced: [
        {
          shapeId: "hexagon",
          shapeNameAr: "سداسي",
          sideCount: 6,
          clipsPerSide: 2,
          colorTheme: "teal",
        },
        {
          shapeId: "octagon",
          shapeNameAr: "ثماني",
          sideCount: 8,
          clipsPerSide: 1,
          colorTheme: "coral",
        },
      ],
    };

    for (const tier of ["Easy", "Intermediate", "Advanced"] as const) {
      const exercise = macArchetype.generate({
        lesson: lesson105,
        sourceLessonId: "K-105",
        sectionId: "practice",
        exerciseIndex: 0,
        exerciseNumber: 2,
        difficultyLevel: tier,
        rng: createSeededRandom(`K105-MAC-${tier}`),
        spec: {
          archetype: "MeasureAndCompareLength",
          params: {
            mode: "polygon-perimeter",
            polygons: tierPolygonSets[tier],
          },
        },
      });

      const data = exercise.data as MeasureAndCompareLengthData;
      expect(data.mode).toBe("polygon-perimeter");
      for (const poly of data.polygons ?? []) {
        expect(poly.sideCount).toBeGreaterThanOrEqual(3);
        expect(poly.sideCount).toBeLessThanOrEqual(8);
        expect(poly.clipsPerSide).toBeGreaterThanOrEqual(1);
        expect(poly.clipsPerSide).toBeLessThanOrEqual(2);
        // Total perimeter = sides × units per side
        expect(poly.totalClips).toBe(poly.sideCount * poly.clipsPerSide);
        expect(poly.totalClips).toBeLessThanOrEqual(20);
      }

      const wsHtml = renderToStaticMarkup(
        macArchetype.render({ exercise, mode: "worksheet" })
      );
      expect(wsHtml).toContain('data-visual-model="polygon-perimeter"');
      expect(wsHtml).toContain('data-edge-clips="true"');
      const akHtml = renderToStaticMarkup(
        macArchetype.render({ exercise, mode: "answer-key" })
      );
      expect(akHtml).toContain("data-solved-polygon-measure");
      expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
    }
  });

  it("generates ConnectMatch shape-to-description pairs consistent with polygon totals", () => {
    const exercise = cmArchetype.generate({
      lesson: lesson105,
      sourceLessonId: "K-105",
      sectionId: "challenge",
      exerciseIndex: 1,
      exerciseNumber: 5,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K105-CM"),
      spec: {
        archetype: "ConnectMatch",
        params: {
          matchingMode: "shape-to-description",
          pairCount: 2,
          customCandidatePairs: [
            {
              id: "tri",
              right: {
                id: "poly-tri",
                kind: "polygon-perimeter",
                count: 6,
                labelAr: "مثلث",
                colorTheme: "amber",
                meta: {
                  shapeId: "triangle",
                  sideCount: 3,
                  clipsPerSide: 2,
                  totalClips: 6,
                  mode: "polygon-perimeter",
                  compact: true,
                },
              },
              left: {
                id: "desc-tri",
                kind: "shape-description",
                count: 6,
                labelAr: "مثلث كلّ ضلع فيه مشبكان، محيطه بمشابك الورق يساوي",
                meta: {
                  textAr: "مثلث كلّ ضلع فيه مشبكان، محيطه بمشابك الورق يساوي",
                  missingNumber: 6,
                },
              },
              reasonAr: "المحيط = ٣ أضلاع × ٢ مشابك يساوي ٦",
            },
            {
              id: "hex",
              right: {
                id: "poly-hex",
                kind: "polygon-perimeter",
                count: 6,
                labelAr: "سداسي",
                colorTheme: "teal",
                meta: {
                  shapeId: "hexagon",
                  sideCount: 6,
                  clipsPerSide: 1,
                  totalClips: 6,
                  mode: "polygon-perimeter",
                  compact: true,
                },
              },
              left: {
                id: "desc-hex",
                kind: "shape-description",
                count: 6,
                labelAr:
                  "سداسي كلّ ضلع فيه مشبك واحد، محيطه بمشابك الورق يساوي",
                meta: {
                  textAr:
                    "سداسي كلّ ضلع فيه مشبك واحد، محيطه بمشابك الورق يساوي",
                  missingNumber: 6,
                },
              },
              reasonAr: "المحيط = ٦ أضلاع × ١ مشبك يساوي ٦",
            },
          ],
        },
      },
    });

    const data = exercise.data as ConnectMatchData;
    expect(data.pairs.length).toBe(2);
    for (const pair of data.pairs) {
      const meta = (pair.rightItem.meta ?? {}) as Record<string, unknown>;
      const sideCount = meta.sideCount as number;
      const clipsPerSide = meta.clipsPerSide as number;
      const totalClips = meta.totalClips as number;
      expect(totalClips).toBe(sideCount * clipsPerSide);
      const leftMeta = (pair.leftItem.meta ?? {}) as Record<string, unknown>;
      expect(leftMeta.missingNumber).toBe(totalClips);
    }
    // Every right item maps to exactly one left item (solution map)
    for (const right of data.rightItems) {
      const leftId = data.solutionMap[right.id];
      expect(leftId).toBeDefined();
      expect(data.leftItems.some((left) => left.id === leftId)).toBe(true);
    }

    const wsHtml = renderToStaticMarkup(
      cmArchetype.render({ exercise, mode: "worksheet" })
    );
    // ConnectMatch pairs use compact polygon cards
    expect(wsHtml).toContain('data-visual-model="polygon-perimeter-compact"');
    expect(wsHtml).toContain('data-visual-model="shape-description"');
    const akHtml = renderToStaticMarkup(
      cmArchetype.render({ exercise, mode: "answer-key" })
    );
    expect(akHtml).toContain("data-solved-missing-shape-number");
    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
  });
});

describe("Ticket 02 (Unit 9) — Slice 4: K-105 blueprint and full surfaces", () => {
  it("renders K-105 with the K-73 warm-up, polygon-perimeter practice, and a shape-to-description BB", () => {
    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 105,
      seed: "K105-SEAM-TEST",
      difficultyLevel: "scaffolded",
    });

    expect(generated.warmUpSourceLessonId).toBe("K-73");
    expect(generated.worksheet.sections).toHaveLength(3);
    expect(generated.worksheet.header.lessonTitleAr).toContain("محيط");
    expect(
      generated.worksheet.sections[0].exercises.length
    ).toBeGreaterThanOrEqual(1);
    expect(
      generated.worksheet.sections[1].exercises.length
    ).toBeGreaterThanOrEqual(2);
    expect(
      generated.worksheet.sections[2].exercises.length
    ).toBeGreaterThanOrEqual(2);

    const wsHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 105,
      seed: "K105-SEAM-TEST",
      viewMode: "worksheet",
    });
    const akHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 105,
      seed: "K105-SEAM-TEST",
      viewMode: "answer-key",
    });

    expect(wsHtml).toContain('data-archetype="MeasureAndCompareLength"');
    expect(wsHtml).toContain('data-visual-model="polygon-perimeter"');
    expect(wsHtml).toContain('data-edge-clips="true"');
    expect(wsHtml).toContain('data-archetype="ConnectMatch"');
    expect(wsHtml).toContain('data-visual-model="shape-description"');
    expect(akHtml).toContain("data-solved-polygon-measure");
    expect(akHtml).toContain("data-solved-missing-shape-number");

    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });
});

describe("Ticket 02 (Unit 9) — Slice 5: SequenceAndZero dot-arrays + tally to 20 (K-106)", () => {
  const catalog = getCurriculumCatalog();
  const lesson106 = catalog.getLesson("K", 106)!;
  const seqArchetype = getExerciseArchetype("SequenceAndZero");

  it("builds dot-array step models for teen sequences (value clamp lifted to 20)", () => {
    const exercise = seqArchetype.generate({
      lesson: lesson106,
      sourceLessonId: "K-106",
      sectionId: "practice",
      exerciseIndex: 0,
      exerciseNumber: 2,
      difficultyLevel: "Intermediate",
      rng: createSeededRandom("K106-SEQ"),
      spec: {
        archetype: "SequenceAndZero",
        params: {
          sequenceMode: "forward",
          visualKind: "dot-array",
          numbers: [16, 17, 18, 19, 20],
          missingValues: [17, 19],
        },
      },
    });

    const data = exercise.data as SequenceAndZeroData;
    expect(data.visualKind).toBe("dot-array");
    expect(data.steps.map((s) => s.value)).toEqual([16, 17, 18, 19, 20]);
    for (const step of data.steps) {
      expect(step.visualModel.kind).toBe("dot-array");
      expect(step.visualModel.meta?.filledCount).toBe(step.value);
    }

    const wsHtml = renderToStaticMarkup(
      seqArchetype.render({ exercise, mode: "worksheet" })
    );
    expect(wsHtml).toContain('data-visual-model="dot-array"');
    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    const akHtml = renderToStaticMarkup(
      seqArchetype.render({ exercise, mode: "answer-key" })
    );
    expect(akHtml).toContain("data-solved-missing-number");
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });

  it("extends tally marks beyond 10 for COUNT & CONNECT from 16", () => {
    const spec = createTallyMarksSpec({ count: 16, compact: true });
    expect(spec.count).toBe(16);

    const html = renderToStaticMarkup(
      React.createElement(VisualModelView, { model: spec, solved: false })
    );
    // 16 = 3 full bundles of 5 (4 verticals + slash each) + 1 single vertical
    const verticalStrokes = html.match(/data-tally-stroke="vertical"/g);
    expect(verticalStrokes?.length).toBe(13);
    const slashes = html.match(/data-tally-stroke="fifth-slash"/g);
    expect(slashes?.length).toBe(3);
    // 20 tallies stay within the cap
    const spec20 = createTallyMarksSpec({ count: 20 });
    expect(spec20.count).toBe(20);
  });
});

describe("Ticket 02 (Unit 9) — Slice 5: K-106 blueprint and full surfaces", () => {
  it("renders K-106 with the K-65 warm-up, dot-array teen practice, and a tally COUNT & CONNECT BB", () => {
    const generated = generateWorksheet({
      grade: "K",
      lessonNumber: 106,
      seed: "K106-SEAM-TEST",
      difficultyLevel: "scaffolded",
    });

    expect(generated.warmUpSourceLessonId).toBe("K-65");
    expect(generated.worksheet.sections).toHaveLength(3);
    expect(generated.worksheet.header.lessonTitleAr).toContain("المصفوفات");
    expect(
      generated.worksheet.sections[0].exercises.length
    ).toBeGreaterThanOrEqual(1);
    expect(
      generated.worksheet.sections[1].exercises.length
    ).toBeGreaterThanOrEqual(2);
    expect(
      generated.worksheet.sections[2].exercises.length
    ).toBeGreaterThanOrEqual(2);

    const wsHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 106,
      seed: "K106-SEAM-TEST",
      viewMode: "worksheet",
    });
    const akHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 106,
      seed: "K106-SEAM-TEST",
      viewMode: "answer-key",
    });

    // WB: dot-array sequences connected in counting order
    expect(wsHtml).toContain('data-visual-model="dot-array"');
    expect(wsHtml).toContain('data-archetype="SequenceAndZero"');
    // BB: tally marks beyond 10
    expect(wsHtml).toContain('data-variant="tally"');
    expect(findWesternNumeralsInRenderedHtml(wsHtml)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(akHtml)).toEqual([]);
  });
});
