import type { LessonBlueprint } from "@/domain/types";

const blueprintRegistry = new Map<string, LessonBlueprint>();

/**
 * Registers a declarative Lesson Blueprint.
 * Tickets 02-05 register their lesson blueprints here without touching engine logic.
 */
export function registerLessonBlueprint(blueprint: LessonBlueprint): void {
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
