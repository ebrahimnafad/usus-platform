import { describe, expect, it } from "vitest";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 03 (Unit 6) — Lessons K-67 & K-68: Subitize Ten Frames & Number Bond Maze", () => {
  it("generates Lesson K-67 (Subitize Ten Frames to 10: Part I) with Warm-Up from K-25, identify-quantity, number-bond-maze, and no Western numerals", () => {
    const k67 = generateWorksheet({
      grade: "K",
      lessonNumber: 67,
      seed: "TICKET03-K67",
    });

    expect(k67.isAuthoredBlueprint).toBe(true);
    expect(k67.warmUpSourceLessonId).toBe("K-25");

    const allExercises = k67.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of allExercises) {
      expect(ex.archetype).toBe("SubitizePartWhole");
      expect(ex.data.kind).toBe("SubitizePartWhole");
    }

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 67,
      seed: "TICKET03-K67",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 67,
      seed: "TICKET03-K67",
      viewMode: "answer-key",
    });

    expect(worksheetHtml).toContain('data-archetype="SubitizePartWhole"');
    expect(worksheetHtml).toContain('data-subitize-mode="number-bond-maze"');
    expect(answerKeyHtml).toContain('data-solved-maze-bond="true"');

    const westernInWs = findWesternNumeralsInRenderedHtml(worksheetHtml);
    expect(westernInWs).toEqual([]);
    const westernInAk = findWesternNumeralsInRenderedHtml(answerKeyHtml);
    expect(westernInAk).toEqual([]);
  });

  it("generates Lesson K-68 (Subitize Ten Frames to 10: Part II) with Warm-Up from K-67, both-parts-to-10, ghost-circle drawing, and no Western numerals", () => {
    const k68 = generateWorksheet({
      grade: "K",
      lessonNumber: 68,
      seed: "TICKET03-K68",
    });

    expect(k68.isAuthoredBlueprint).toBe(true);
    expect(k68.warmUpSourceLessonId).toBe("K-67");

    const allExercises = k68.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of allExercises) {
      expect(ex.archetype).toBe("SubitizePartWhole");
      expect(ex.data.kind).toBe("SubitizePartWhole");
    }

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 68,
      seed: "TICKET03-K68",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 68,
      seed: "TICKET03-K68",
      viewMode: "answer-key",
    });

    expect(worksheetHtml).toContain('data-archetype="SubitizePartWhole"');
    expect(worksheetHtml).toContain('data-subitize-mode="both-parts-to-10"');
    expect(answerKeyHtml).toContain("data-solved-subitize-missing=");

    const westernInWs = findWesternNumeralsInRenderedHtml(worksheetHtml);
    expect(westernInWs).toEqual([]);
    const westernInAk = findWesternNumeralsInRenderedHtml(answerKeyHtml);
    expect(westernInAk).toEqual([]);
  });
});
