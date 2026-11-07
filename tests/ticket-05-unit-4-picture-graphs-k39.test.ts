import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import "@/registry/bootstrap";
import { createPictureGraphSpec } from "@/visual-models/picture-graphs";
import { VisualModelView } from "@/visual-models/registry";
import { getExerciseArchetype } from "@/archetypes/registry";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { createSeededRandom } from "@/lib/seed";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { generateWorksheet } from "@/engine/worksheet-engine";
import type { PictureGraphReadData } from "@/archetypes/picture-graph-read";
import type {
  DifficultyLevel,
  BlueprintExerciseSpec,
  Exercise,
} from "@/domain/types";

function generateGraphExercise(
  level: DifficultyLevel,
  seed: string,
  params: Record<string, unknown>
): Exercise {
  const archetype = getExerciseArchetype("PictureGraphRead");
  return archetype.generate({
    lesson: getCurriculumCatalog().getLesson("K", 39)!,
    sourceLessonId: "K-39",
    sectionId: "challenge",
    exerciseIndex: 0,
    exerciseNumber: 1,
    difficultyLevel: level,
    rng: createSeededRandom(seed),
    spec: { archetype: "PictureGraphRead", params } as BlueprintExerciseSpec,
  });
}

function generateGraph(
  level: DifficultyLevel,
  seed: string,
  params: Record<string, unknown>
) {
  const archetype = getExerciseArchetype("PictureGraphRead");
  const exercise = generateGraphExercise(level, seed, params);
  const render = (mode: "worksheet" | "answer-key") =>
    renderToStaticMarkup(archetype.render({ exercise, mode }));
  return {
    exercise,
    data: exercise.data as PictureGraphReadData,
    worksheet: render("worksheet"),
    answerKey: render("answer-key"),
  };
}

function generateGraphData(
  level: DifficultyLevel,
  seed: string,
  params: Record<string, unknown>
): PictureGraphReadData {
  const exercise = generateGraphExercise(level, seed, params);
  return exercise.data as PictureGraphReadData;
}

const SHAPE_GRAPH_PARAMS = {
  responseMode: "draw-missing",
  iconSet: "shapes-2d",
  countsPattern: "decreasing-by-1",
  categoryCount: 4,
  missingPerCategory: [1, 3],
};

describe("Ticket 05 (Unit 4) — SHAPE GRAPH (draw-missing)", () => {
  it("shows a count table beside the graph; missing cells are blank dashed outlines on the Worksheet and drawn shapes on the Answer Key", () => {
    const { data, worksheet, answerKey } = generateGraph(
      "Advanced",
      "K39-SHAPE-GRAPH",
      SHAPE_GRAPH_PARAMS
    );

    expect(data.responseMode).toBe("draw-missing");
    expect(data.categories).toHaveLength(4);
    const totalMissing = data.categories.reduce(
      (sum, c) => sum + c.missingCount,
      0
    );
    expect(totalMissing).toBeGreaterThan(0);

    expect(worksheet).toContain('data-graph-mode="draw-missing"');
    expect(worksheet).toContain('data-exercise-columns="one"');
    expect(worksheet.match(/data-count-table-row=/g)).toHaveLength(4);
    expect(worksheet.match(/data-graph-cell-missing="true"/g)).toHaveLength(
      totalMissing
    );
    expect(worksheet).not.toContain('data-drawn-cell="true"');
    expect(worksheet).not.toContain("؟");
    expect(worksheet).not.toContain('data-graph-comparison="true"');

    expect(answerKey.match(/data-drawn-cell="true"/g)).toHaveLength(
      totalMissing
    );
    expect(answerKey.match(/data-graph-cell-missing="true"/g)).toHaveLength(
      totalMissing
    );
    expect(findWesternNumeralsInRenderedHtml(worksheet)).toEqual([]);
    expect(findWesternNumeralsInRenderedHtml(answerKey)).toEqual([]);
  });

  it("every category's icon is a distinct 2D shape, so each row reads in grayscale", () => {
    const { data, worksheet } = generateGraph(
      "Advanced",
      "K39-SHAPE-GRAPH-ICONS",
      SHAPE_GRAPH_PARAMS
    );
    const ids = data.categories.map((c) => c.icon.id);
    expect(data.categories.every((c) => c.icon.kind === "shape-2d")).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(worksheet).toContain(`data-shape-id="${id}"`);
    }
  });

  it("domain: across many Seeds and levels, the given cells plus the drawn cells equal each table count, and counts fall by 1", () => {
    const levels: Array<[DifficultyLevel, [number, number]]> = [
      ["Easy", [1, 1]],
      ["Intermediate", [1, 2]],
      ["Advanced", [1, 3]],
    ];
    for (const [level, range] of levels) {
      for (let i = 0; i < 20; i++) {
        const data = generateGraphData(level, `K39-DOMAIN-${level}-${i}`, {
          ...SHAPE_GRAPH_PARAMS,
          missingPerCategory: range,
        });
        data.categories.forEach((cat, idx) => {
          expect(cat.givenCount + cat.missingCount).toBe(cat.count);
          expect(cat.givenCount).toBeGreaterThanOrEqual(1);
          expect(cat.missingCount).toBeGreaterThanOrEqual(range[0]);
          expect(cat.missingCount).toBeLessThanOrEqual(range[1]);
          if (idx > 0) {
            expect(cat.count).toBe(data.categories[idx - 1].count - 1);
          }
        });
      }
    }
  });

  it("Problem of the Day: a solids graph shows 3D solid icons and keeps the count-and-compare responses", () => {
    const { data, worksheet, answerKey } = generateGraph(
      "Intermediate",
      "K39-SOLIDS",
      {
        iconSet: "solids-3d",
        countsPattern: "decreasing-by-1",
        categoryCount: 3,
      }
    );
    expect(data.categories.every((c) => c.icon.kind === "solid-3d")).toBe(true);
    expect(worksheet).toContain('data-graph-icon-kind="solid-3d"');
    expect(worksheet).toContain('data-graph-comparison="true"');
    expect(answerKey).toContain("data-solved-category-count=");
  });

  it("supports explicitly authored 2D and 3D icon categories in PictureGraphRead", () => {
    const { data, worksheet } = generateGraph("Easy", "K39-AUTHORED-ICONS", {
      categories: [
        {
          labelAr: "دائرة",
          icon: { kind: "shape-2d", id: "circle" },
          count: 3,
        },
        { labelAr: "مكعب", icon: { kind: "solid-3d", id: "cube" }, count: 2 },
      ],
      responseMode: "write",
    });

    expect(data.categories.map((cat) => cat.icon.kind)).toEqual([
      "shape-2d",
      "solid-3d",
    ]);
    expect(worksheet).toContain('data-shape-id="circle"');
    expect(worksheet).toContain('data-solid-id="cube"');
  });

  it("primary seam: K-39 renders deterministically in every mode, resolves Warm-Up from K-21, and carries Strategy Hints on the Answer Key", () => {
    for (const difficultyLevel of [
      "scaffolded",
      "Easy",
      "Intermediate",
      "Advanced",
    ] as const) {
      const worksheetA = renderWorksheetSurface({
        grade: "K",
        lessonNumber: 39,
        seed: `K39-SEAM-${difficultyLevel}`,
        viewMode: "worksheet",
        difficultyLevel,
      });
      const worksheetB = renderWorksheetSurface({
        grade: "K",
        lessonNumber: 39,
        seed: `K39-SEAM-${difficultyLevel}`,
        viewMode: "worksheet",
        difficultyLevel,
      });
      const answerKey = renderWorksheetSurface({
        grade: "K",
        lessonNumber: 39,
        seed: `K39-SEAM-${difficultyLevel}`,
        viewMode: "answer-key",
        difficultyLevel,
      });
      const bundle = generateWorksheet({
        grade: "K",
        lessonNumber: 39,
        seed: `K39-SEAM-${difficultyLevel}`,
        difficultyLevel,
      });

      expect(worksheetA).toBe(worksheetB);
      expect(bundle.worksheet.sections[0].sourceLessonId).toBe("K-21");
      expect(worksheetA).toContain("من المتطلب السابق");
      expect(worksheetA).toContain("التمثيل البياني بالصور للعدّ التنازلي");
      expect(worksheetA).toContain('data-graph-mode="draw-missing"');
      expect(worksheetA).toContain('data-exercise-columns="one"');
      expect(answerKey.match(/data-strategy-hint="true"/g)).toHaveLength(5);
      expect(findWesternNumeralsInRenderedHtml(worksheetA)).toEqual([]);
      expect(findWesternNumeralsInRenderedHtml(answerKey)).toEqual([]);
    }
  });
});

function renderModel(
  model: ReturnType<typeof createPictureGraphSpec>,
  solved = false
): string {
  return renderToStaticMarkup(
    React.createElement(VisualModelView, { model, solved })
  );
}

describe("Ticket 05 (Unit 4) — Picture graph icons", () => {
  it("draws 2D shape and 3D solid icons in graph cells, and keeps everyday-object graphs unchanged", () => {
    const shapesHtml = renderModel(
      createPictureGraphSpec({
        categories: [
          {
            labelAr: "دائرة",
            icon: { kind: "shape-2d", id: "circle" },
            count: 3,
          },
          {
            labelAr: "مثلث",
            icon: { kind: "shape-2d", id: "triangle" },
            count: 2,
          },
        ],
      })
    );
    expect(shapesHtml.match(/data-graph-cell-icon="circle"/g)).toHaveLength(3);
    expect(shapesHtml.match(/data-graph-cell-icon="triangle"/g)).toHaveLength(
      2
    );
    expect(shapesHtml).toContain('data-graph-icon-kind="shape-2d"');
    expect(shapesHtml).toContain('data-shape-id="triangle"');

    const solidsHtml = renderModel(
      createPictureGraphSpec({
        categories: [
          { labelAr: "مكعب", icon: { kind: "solid-3d", id: "cube" }, count: 4 },
          {
            labelAr: "كرة",
            icon: { kind: "solid-3d", id: "sphere" },
            count: 3,
          },
        ],
      })
    );
    expect(solidsHtml.match(/data-graph-cell-icon="cube"/g)).toHaveLength(4);
    expect(solidsHtml).toContain('data-graph-icon-kind="solid-3d"');
    expect(solidsHtml).toContain('data-solid-id="sphere"');

    const objectsHtml = renderModel(
      createPictureGraphSpec({
        categories: [{ labelAr: "تفاحة", objectId: "apple", count: 2 }],
      })
    );
    expect(objectsHtml.match(/data-graph-cell-icon="apple"/g)).toHaveLength(2);
    expect(objectsHtml).toContain('data-graph-icon-kind="everyday-object"');
  });
});
