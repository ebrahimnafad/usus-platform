import { describe, expect, it } from "vitest";
import {
  defineLessonBlueprint,
  resolveBlueprintLocalization,
} from "@/blueprints/registry";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";

describe("Blueprint Registry — Localization Purity", () => {
  it("resolves blueprint localization without mutating AUTHORED_LESSON_LOCALIZATION", () => {
    const unauthoredLessonId = "K-999";
    expect(AUTHORED_LESSON_LOCALIZATION[unauthoredLessonId]).toBeUndefined();

    const customTitle = "عنوان تجريبي للدرس";
    const customSummary = "ملخص تجريبي لملاحظات المعلم لاختبار النقاء البرمجي.";

    const resolved = resolveBlueprintLocalization({
      lessonId: unauthoredLessonId,
      titleAr: customTitle,
      teacherNotes: {
        summaryAr: customSummary,
      },
    });

    expect(resolved.titleAr).toBe(customTitle);
    expect(resolved.teacherNotes.summaryAr).toBe(customSummary);

    // Assert that the global AUTHORED_LESSON_LOCALIZATION table is NOT mutated
    expect(AUTHORED_LESSON_LOCALIZATION[unauthoredLessonId]).toBeUndefined();
  });

  it("defineLessonBlueprint produces a valid blueprint without mutating the global localization dictionary", () => {
    const unauthoredLessonId = "K-998";
    expect(AUTHORED_LESSON_LOCALIZATION[unauthoredLessonId]).toBeUndefined();

    const blueprint = defineLessonBlueprint({
      lessonId: unauthoredLessonId,
      grade: "K",
      lessonNumber: 998,
      titleAr: "درس إثرائي نقي",
      teacherNotes: {
        summaryAr: "شرح نقي خالٍ من الآثار الجانبية العالمية.",
      },
      tiers: {
        Easy: {
          warmUp: [{ archetype: "ConnectMatch", promptAr: "صل" }],
          practice: [{ archetype: "ConnectMatch", promptAr: "صل" }],
          challenge: [{ archetype: "ConnectMatch", promptAr: "صل" }],
        },
        Intermediate: {
          warmUp: [{ archetype: "ConnectMatch", promptAr: "صل" }],
          practice: [{ archetype: "ConnectMatch", promptAr: "صل" }],
          challenge: [{ archetype: "ConnectMatch", promptAr: "صل" }],
        },
        Advanced: {
          warmUp: [{ archetype: "ConnectMatch", promptAr: "صل" }],
          practice: [{ archetype: "ConnectMatch", promptAr: "صل" }],
          challenge: [{ archetype: "ConnectMatch", promptAr: "صل" }],
        },
      },
    });

    expect(blueprint.titleAr).toBe("درس إثرائي نقي");
    expect(blueprint.teacherNotes.summaryAr).toBe(
      "شرح نقي خالٍ من الآثار الجانبية العالمية."
    );
    expect(AUTHORED_LESSON_LOCALIZATION[unauthoredLessonId]).toBeUndefined();
  });
});
