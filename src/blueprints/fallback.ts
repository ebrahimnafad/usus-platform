import type { Lesson, LessonBlueprint } from "@/domain/types";
import { DEFAULT_TIER_TEMPLATE } from "@/blueprints/default-tier-template";

/**
 * Builds a fallback LessonBlueprint for a lesson that has no authored blueprint.
 * Reuses the default tier template so unauthored lessons still generate a valid
 * three-section Worksheet and Answer Key, without depending on a specific lesson.
 */
export function createFallbackBlueprint(lesson: Lesson): LessonBlueprint {
  return {
    lessonId: lesson.id,
    grade: lesson.grade,
    lessonNumber: lesson.lessonNumber,
    titleAr: lesson.titleAr,
    teacherNotes: lesson.teacherNotes,
    tiers: DEFAULT_TIER_TEMPLATE,
  };
}
