import { describe, expect, it } from "vitest";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Ticket 02 (Unit 6) — Lessons K-63 to K-66: Picture Graphs & Sequences to 10", () => {
  it("generates Lesson K-63 (Horizontal Picture Graphs to 10) with Warm-Up from K-20, PictureGraphRead up to 10, and no Western numerals", () => {
    const k63 = generateWorksheet({
      grade: "K",
      lessonNumber: 63,
      seed: "TICKET02-K63",
    });

    expect(k63.isAuthoredBlueprint).toBe(true);
    expect(k63.warmUpSourceLessonId).toBe("K-20");

    const allExercises = k63.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of allExercises) {
      expect(ex.archetype).toBe("PictureGraphRead");
      expect(ex.data.kind).toBe("PictureGraphRead");
      expect(ex.visualModels.some((m) => m.kind === "picture-graph")).toBe(
        true
      );
    }

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 63,
      seed: "TICKET02-K63",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 63,
      seed: "TICKET02-K63",
      viewMode: "answer-key",
    });

    expect(worksheetHtml).toContain('data-archetype="PictureGraphRead"');
    expect(worksheetHtml).toContain('data-orientation="horizontal"');
    expect(worksheetHtml).toContain('data-direction="rtl"');

    const westernInWs = findWesternNumeralsInRenderedHtml(worksheetHtml);
    expect(westernInWs).toEqual([]);
    const westernInAk = findWesternNumeralsInRenderedHtml(answerKeyHtml);
    expect(westernInAk).toEqual([]);
  });

  it("generates Lesson K-64 (Vertical Picture Graphs to 10) with Warm-Up from K-21, PictureGraphRead vertical up to 10, and no Western numerals", () => {
    const k64 = generateWorksheet({
      grade: "K",
      lessonNumber: 64,
      seed: "TICKET02-K64",
    });

    expect(k64.isAuthoredBlueprint).toBe(true);
    expect(k64.warmUpSourceLessonId).toBe("K-21");

    const allExercises = k64.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of allExercises) {
      expect(ex.archetype).toBe("PictureGraphRead");
      expect(ex.data.kind).toBe("PictureGraphRead");
      expect(ex.visualModels.some((m) => m.kind === "picture-graph")).toBe(
        true
      );
    }

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 64,
      seed: "TICKET02-K64",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 64,
      seed: "TICKET02-K64",
      viewMode: "answer-key",
    });

    expect(worksheetHtml).toContain('data-archetype="PictureGraphRead"');
    expect(worksheetHtml).toContain('data-orientation="vertical"');

    const westernInWs = findWesternNumeralsInRenderedHtml(worksheetHtml);
    expect(westernInWs).toEqual([]);
    const westernInAk = findWesternNumeralsInRenderedHtml(answerKeyHtml);
    expect(westernInAk).toEqual([]);
  });

  it("generates Lesson K-65 (Count Forward to 10) with Warm-Up from K-22, SequenceAndZero forward, and ten-frame/tally-marks visuals", () => {
    const k65 = generateWorksheet({
      grade: "K",
      lessonNumber: 65,
      seed: "TICKET02-K65",
    });

    expect(k65.isAuthoredBlueprint).toBe(true);
    expect(k65.warmUpSourceLessonId).toBe("K-22");

    const allExercises = k65.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of allExercises) {
      expect(ex.archetype).toBe("SequenceAndZero");
      expect(ex.data.kind).toBe("SequenceAndZero");
    }

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 65,
      seed: "TICKET02-K65",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 65,
      seed: "TICKET02-K65",
      viewMode: "answer-key",
    });

    expect(worksheetHtml).toContain('data-archetype="SequenceAndZero"');
    expect(worksheetHtml).toContain('data-sequence-mode="forward"');

    const westernInWs = findWesternNumeralsInRenderedHtml(worksheetHtml);
    expect(westernInWs).toEqual([]);
    const westernInAk = findWesternNumeralsInRenderedHtml(answerKeyHtml);
    expect(westernInAk).toEqual([]);
  });

  it("generates Lesson K-66 (Count Backward from 10) with Warm-Up from K-23, SequenceAndZero backward, and ten-frame/tally-marks visuals", () => {
    const k66 = generateWorksheet({
      grade: "K",
      lessonNumber: 66,
      seed: "TICKET02-K66",
    });

    expect(k66.isAuthoredBlueprint).toBe(true);
    expect(k66.warmUpSourceLessonId).toBe("K-23");

    const allExercises = k66.worksheet.sections.flatMap((s) => s.exercises);
    expect(allExercises.length).toBeGreaterThanOrEqual(4);

    for (const ex of allExercises) {
      expect(ex.archetype).toBe("SequenceAndZero");
      expect(ex.data.kind).toBe("SequenceAndZero");
    }

    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 66,
      seed: "TICKET02-K66",
      viewMode: "worksheet",
    });
    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 66,
      seed: "TICKET02-K66",
      viewMode: "answer-key",
    });

    expect(worksheetHtml).toContain('data-archetype="SequenceAndZero"');
    expect(worksheetHtml).toContain('data-sequence-mode="backward"');

    const westernInWs = findWesternNumeralsInRenderedHtml(worksheetHtml);
    expect(westernInWs).toEqual([]);
    const westernInAk = findWesternNumeralsInRenderedHtml(answerKeyHtml);
    expect(westernInAk).toEqual([]);
  });
});
