import React from "react";
import type {
  BlueprintExerciseSpec,
  DifficultyLevel,
  Exercise,
  ExerciseArchetypeId,
  Lesson,
  SectionId,
} from "@/domain/types";
import type { SeededRandom } from "@/lib/seed";

export interface ArchetypeGeneratorContext {
  lesson: Lesson;
  sourceLessonId: string;
  sectionId: SectionId;
  exerciseIndex: number;
  exerciseNumber: number;
  difficultyLevel: DifficultyLevel;
  rng: SeededRandom;
  spec: BlueprintExerciseSpec;
  /** Sheet-wide used addition/operation facts so unused facts come first across the sheet (§7.3) */
  usedFacts?: Set<string>;
}

export interface ArchetypeRenderProps {
  exercise: Exercise;
  mode: "worksheet" | "answer-key";
}

export interface ExerciseArchetypeDefinition {
  id: ExerciseArchetypeId;
  displayNameAr: string;
  generate(ctx: ArchetypeGeneratorContext): Exercise;
  render(props: ArchetypeRenderProps): React.ReactElement;
}

const archetypeRegistry = new Map<
  ExerciseArchetypeId,
  ExerciseArchetypeDefinition
>();

/**
 * Registers an Exercise Archetype definition.
 * Subsequent tickets (02-05) register their archetypes here without modifying engine internals.
 */
export function registerExerciseArchetype(
  definition: ExerciseArchetypeDefinition
): void {
  archetypeRegistry.set(definition.id, definition);
}

export function getExerciseArchetype(
  id: ExerciseArchetypeId
): ExerciseArchetypeDefinition {
  const found = archetypeRegistry.get(id);
  if (!found) {
    throw new Error(`ExerciseArchetype "${id}" is not registered.`);
  }
  return found;
}

export function listRegisteredArchetypes(): ExerciseArchetypeDefinition[] {
  return Array.from(archetypeRegistry.values());
}
