import type { LessonBlueprint } from "@/domain/types";
import { DEFAULT_TIER_TEMPLATE } from "@/blueprints/default-tier-template";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

const k1Localization = AUTHORED_LESSON_LOCALIZATION["K-1"];

export const lessonK1Blueprint: LessonBlueprint = {
  lessonId: "K-1",
  grade: "K",
  lessonNumber: 1,
  titleAr: k1Localization.titleAr,
  teacherNotes: k1Localization.teacherNotes,
  tiers: DEFAULT_TIER_TEMPLATE,
};


registerLessonBlueprint(lessonK1Blueprint);
