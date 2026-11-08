import { describe, expect, it } from "vitest";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import {
  SHAPE_2D_CATALOG,
  getShape2DById,
} from "@/visual-models/shapes-solids-coins";

describe("Ticket 05 (Unit 6) — Lessons K-72..K-73: Polygon Sides, Perimeter & Shape Descriptions", () => {
  it("verifies SHAPE_2D_CATALOG contains heptagon (7), octagon (8), and nonagon (9)", () => {
    const heptagon = getShape2DById("heptagon");
    expect(heptagon.sides).toBe(7);
    expect(heptagon.corners).toBe(7);

    const octagon = getShape2DById("octagon");
    expect(octagon.sides).toBe(8);
    expect(octagon.corners).toBe(8);

    const nonagon = getShape2DById("nonagon");
    expect(nonagon.sides).toBe(9);
    expect(nonagon.corners).toBe(9);
  });

  it("generates Lesson K-72 (Perimeter of Shapes - Count) with Warm-Up from K-71, polygon-sides, ConnectMatch shape-to-description, and no Western numerals", () => {
    const k72 = generateWorksheet({
      grade: "K",
      lessonNumber: 72,
      seed: "TICKET05-K72",
    });

    expect(k72.isAuthoredBlueprint).toBe(true);
    expect(k72.warmUpSourceLessonId).toBe("K-72");

    const allExercises = k72.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(4);

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 72,
      seed: "TICKET05-K72",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 72,
      seed: "TICKET05-K72",
      viewMode: "answer-key",
    });

    expect(worksheetHtml).toContain('data-archetype="MeasureAndCompareLength"');
    expect(worksheetHtml).toContain('data-visual-model="polygon-perimeter"');
    expect(worksheetHtml).toContain('data-polygon-mode="polygon-sides"');
    expect(worksheetHtml).toContain('data-edge-ticks="true"');
    expect(worksheetHtml).toContain('data-archetype="ConnectMatch"');
    expect(worksheetHtml).toContain('data-visual-model="shape-description"');
    expect(answerKeyHtml).toContain("data-solved-polygon-measure");

    const westernInWs = findWesternNumeralsInRenderedHtml(worksheetHtml);
    expect(westernInWs).toEqual([]);
    const westernInAk = findWesternNumeralsInRenderedHtml(answerKeyHtml);
    expect(westernInAk).toEqual([]);
  });

  it("generates Lesson K-73 (Perimeter of Shapes - Count & Measure) with Warm-Up from K-72, polygon-perimeter, ConnectMatch with missing numbers, and no Western numerals", () => {
    const k73 = generateWorksheet({
      grade: "K",
      lessonNumber: 73,
      seed: "TICKET05-K73",
    });

    expect(k73.isAuthoredBlueprint).toBe(true);
    expect(k73.warmUpSourceLessonId).toBe("K-72");

    const allExercises = k73.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(4);

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 73,
      seed: "TICKET05-K73",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 73,
      seed: "TICKET05-K73",
      viewMode: "answer-key",
    });

    expect(worksheetHtml).toContain('data-archetype="MeasureAndCompareLength"');
    expect(worksheetHtml).toContain('data-visual-model="polygon-perimeter"');
    expect(worksheetHtml).toContain('data-polygon-mode="polygon-perimeter"');
    expect(worksheetHtml).toContain('data-edge-clips="true"');
    expect(worksheetHtml).toContain('data-archetype="ConnectMatch"');
    expect(worksheetHtml).toContain('data-visual-model="shape-description"');
    expect(answerKeyHtml).toContain("data-solved-polygon-measure");
    expect(answerKeyHtml).toContain("data-solved-missing-shape-number");

    const westernInWs = findWesternNumeralsInRenderedHtml(worksheetHtml);
    expect(westernInWs).toEqual([]);
    const westernInAk = findWesternNumeralsInRenderedHtml(answerKeyHtml);
    expect(westernInAk).toEqual([]);
  });
});
