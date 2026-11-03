import type { Lesson, LessonBlueprint } from "@/domain/types";
import { lessonK1Blueprint } from "@/blueprints/grade-k/lesson-k1";

/**
 * Builds a fallback LessonBlueprint for a lesson that has no authored blueprint.
 * Reuses the default tier template (currently K-1's tiers) so unauthored lessons
 * still generate a valid three-section Worksheet and Answer Key.
 */
export function createFallbackBlueprint(lesson: Lesson): LessonBlueprint {
  return {
    lessonId: lesson.id,
    grade: lesson.grade,
    lessonNumber: lesson.lessonNumber,
    titleAr: lesson.titleAr,
    teacherNotes: lesson.teacherNotes,
    tiers: lessonK1Blueprint.tiers,
  };
}
