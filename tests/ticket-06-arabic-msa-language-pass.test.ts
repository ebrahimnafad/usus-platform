import { describe, expect, it } from "vitest";
import "@/registry/bootstrap";
import { listAuthoredLessonBlueprints } from "@/blueprints/registry";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";

/**
 * Constitution §9.1: a GLOSSARY.md term's `_Avoid_` forms never reach student-facing text.
 * Teacher Notes carry the teacher voice (§9.4) and are excluded from the Worksheet, so
 * scanning the rendered surfaces checks exactly the text a child reads.
 */
const AVOIDED_FORMS: Array<{ pattern: RegExp; term: string; use: string }> = [
  {
    pattern: /إشارات العدّ/,
    term: "Tally Marks",
    use: "علامات العدّ",
  },
  {
    pattern: /أنماط النرد|ترتيبات نقاط النرد/,
    term: "Dice Pattern",
    use: "نقاط النرد",
  },
  {
    pattern: /الجزء المفقود/,
    term: "Missing Part",
    use: "الجزء الناقص",
  },
  {
    // المجموعة / المجموعتين / المجموعات ("group") share this prefix and stay legal,
    // so المجموع only counts as "sum" when no Arabic letter follows it.
    pattern: /المجموع(?![\u0621-\u064A])|الناتج|العدد الكلي/,
    term: "Total",
    use: "الكلّ",
  },
];

/**
 * Openers that signal a topic label rather than an instruction (§9.5). نشاط صفّي is
 * absent on purpose: it opens Teacher Notes, which keep the teacher voice (§9.4).
 */
const LABEL_OPENERS = [
  "تهيئة",
  "تدرّب",
  "تحدٍّ وتقييم",
  "تحدّي",
  "مسألة اليوم",
  "بناء التفكير",
];

const authoredLessons = listAuthoredLessonBlueprints()
  .map((blueprint) => ({
    grade: blueprint.grade,
    lessonNumber: blueprint.lessonNumber,
  }))
  .sort((a, b) => a.lessonNumber - b.lessonNumber);

describe("Ticket 06 — Arabic White MSA language pass", () => {
  it("registers every authored lesson so the pass covers the whole curriculum", () => {
    expect(authoredLessons.length).toBeGreaterThanOrEqual(38);
  });

  it("keeps avoided Arabic forms out of every rendered Worksheet and Answer Key (§9.1)", () => {
    const violations: string[] = [];

    for (const lesson of authoredLessons) {
      for (const viewMode of ["worksheet", "answer-key"] as const) {
        const html = renderWorksheetSurface({
          grade: lesson.grade,
          lessonNumber: lesson.lessonNumber,
          seed: "MSA-PASS",
          viewMode,
        });

        for (const { pattern, term, use } of AVOIDED_FORMS) {
          const match = html.match(pattern);
          if (match) {
            violations.push(
              `K-${lesson.lessonNumber} ${viewMode}: "${match[0]}" is an _Avoid_ form of ${term}; use "${use}"`
            );
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it("opens every Exercise prompt with the instruction, not a topic label (§9.5)", () => {
    const violations: string[] = [];

    for (const blueprint of listAuthoredLessonBlueprints()) {
      for (const level of ["Easy", "Intermediate", "Advanced"] as const) {
        for (const sectionKey of ["warmUp", "practice", "challenge"] as const) {
          for (const spec of blueprint.tiers[level][sectionKey]) {
            const prompt = spec.promptAr?.trim() ?? "";
            const opener = LABEL_OPENERS.find((label) =>
              prompt.startsWith(label)
            );
            if (opener) {
              violations.push(
                `${blueprint.lessonId} ${level}/${sectionKey}: "${prompt}"`
              );
            }
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
