import { describe, expect, it } from "vitest";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 04 (Unit 6) — Lessons K-69..K-71: Measure and Compare Length with Paper Clips", () => {
  it("generates Lesson K-69 (Measure 1 Bar) with Warm-Up from K-68, friends-clips, mystery-clues ribbons, and no Western numerals", () => {
    const k69 = generateWorksheet({
      grade: "K",
      lessonNumber: 69,
      seed: "TICKET04-K69",
    });

    expect(k69.isAuthoredBlueprint).toBe(true);
    expect(k69.warmUpSourceLessonId).toBe("K-69");

    const allExercises = k69.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(4);

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 69,
      seed: "TICKET04-K69",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 69,
      seed: "TICKET04-K69",
      viewMode: "answer-key",
    });

    expect(worksheetHtml).toContain('data-archetype="MeasureAndCompareLength"');
    expect(worksheetHtml).toContain('data-visual-model="paper-clip-bar"');
    expect(worksheetHtml).toContain('data-bar-count="1"');
    expect(worksheetHtml).toContain('data-measure-mode="mystery-clues"');
    expect(answerKeyHtml).toContain("data-solved-bar-length");

    const westernInWs = findWesternNumeralsInRenderedHtml(worksheetHtml);
    expect(westernInWs).toEqual([]);
    const westernInAk = findWesternNumeralsInRenderedHtml(answerKeyHtml);
    expect(westernInAk).toEqual([]);
  });

  it("generates Lesson K-70 (Measure and Compare 2 Bars) with Warm-Up from K-69, difference comparison, caterpillars, and no Western numerals", () => {
    const k70 = generateWorksheet({
      grade: "K",
      lessonNumber: 70,
      seed: "TICKET04-K70",
    });

    expect(k70.isAuthoredBlueprint).toBe(true);
    expect(k70.warmUpSourceLessonId).toBe("K-69");

    const allExercises = k70.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(4);

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 70,
      seed: "TICKET04-K70",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 70,
      seed: "TICKET04-K70",
      viewMode: "answer-key",
    });

    expect(worksheetHtml).toContain('data-archetype="MeasureAndCompareLength"');
    expect(worksheetHtml).toContain('data-bar-count="2"');
    expect(worksheetHtml).toContain('data-bar-type="caterpillar"');
    expect(answerKeyHtml).toContain("data-solved-bar-length");

    const westernInWs = findWesternNumeralsInRenderedHtml(worksheetHtml);
    expect(westernInWs).toEqual([]);
    const westernInAk = findWesternNumeralsInRenderedHtml(answerKeyHtml);
    expect(westernInAk).toEqual([]);
  });

  it("generates Lesson K-71 (Measure and Compare 3 Bars) with Warm-Up from K-70, 3-slot ordering, and no Western numerals", () => {
    const k71 = generateWorksheet({
      grade: "K",
      lessonNumber: 71,
      seed: "TICKET04-K71",
    });

    expect(k71.isAuthoredBlueprint).toBe(true);
    expect(k71.warmUpSourceLessonId).toBe("K-70");

    const allExercises = k71.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(4);

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 71,
      seed: "TICKET04-K71",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 71,
      seed: "TICKET04-K71",
      viewMode: "answer-key",
    });

    expect(worksheetHtml).toContain('data-archetype="MeasureAndCompareLength"');
    expect(worksheetHtml).toContain('data-bar-count="3"');
    expect(worksheetHtml).toContain('data-ordering-slots="true"');
    expect(answerKeyHtml).toContain("data-solved-order-slot");

    const westernInWs = findWesternNumeralsInRenderedHtml(worksheetHtml);
    expect(westernInWs).toEqual([]);
    const westernInAk = findWesternNumeralsInRenderedHtml(answerKeyHtml);
    expect(westernInAk).toEqual([]);
  });
});
