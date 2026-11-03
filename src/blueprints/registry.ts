import type { DifficultyLevel, LessonBlueprint } from "@/domain/types";

const blueprintRegistry = new Map<string, LessonBlueprint>();

/**
 * Registers a declarative Lesson Blueprint.
 * Tickets 02-05 register their lesson blueprints here without touching engine logic.
 */
const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  "Easy",
  "Intermediate",
  "Advanced",
];

export function validateLessonBlueprint(blueprint: LessonBlueprint): void {
  if (!blueprint || typeof blueprint !== "object") {
    throw new Error("LessonBlueprint must be an object.");
  }
  if (!blueprint.lessonId || !blueprint.lessonId.trim()) {
    throw new Error("LessonBlueprint.lessonId must be a non-empty string.");
  }
  if (!blueprint.grade) {
    throw new Error("LessonBlueprint.grade is required.");
  }
  if (typeof blueprint.lessonNumber !== "number") {
    throw new Error("LessonBlueprint.lessonNumber must be a number.");
  }
  if (!blueprint.titleAr || !blueprint.titleAr.trim()) {
    throw new Error("LessonBlueprint.titleAr must be a non-empty string.");
  }
  if (!blueprint.teacherNotes) {
    throw new Error("LessonBlueprint.teacherNotes is required.");
  }
  if (!blueprint.tiers) {
    throw new Error("LessonBlueprint.tiers is required.");
  }

  for (const level of DIFFICULTY_LEVELS) {
    const tier = blueprint.tiers[level];
    if (!tier) {
      throw new Error(`LessonBlueprint.tiers.${level} is required.`);
    }
    for (const sectionKey of ["warmUp", "practice", "challenge"] as const) {
      const specs = tier[sectionKey];
      if (!Array.isArray(specs) || specs.length === 0) {
        throw new Error(
          `LessonBlueprint.tiers.${level}.${sectionKey} must be a non-empty array.`
        );
      }
      for (const spec of specs) {
        if (!spec || typeof spec.archetype !== "string") {
          throw new Error(
            `LessonBlueprint.tiers.${level}.${sectionKey} contains an invalid spec.`
          );
        }
      }
    }
  }
}

export function registerLessonBlueprint(blueprint: LessonBlueprint): void {
  validateLessonBlueprint(blueprint);
  blueprintRegistry.set(blueprint.lessonId, blueprint);
}

export function getLessonBlueprint(
  lessonId: string
): LessonBlueprint | undefined {
  return blueprintRegistry.get(lessonId);
}

export function hasAuthoredBlueprint(lessonId: string): boolean {
  return blueprintRegistry.has(lessonId);
}

export function listAuthoredLessonBlueprints(): LessonBlueprint[] {
  return Array.from(blueprintRegistry.values());
}
