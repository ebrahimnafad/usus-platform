import React from "react";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { PartWholeCardGrid } from "@/components/worksheet/PartWholeCardGrid";
import type { Exercise } from "@/domain/types";
import {
  buildJoinPartsPayload,
  type JoinPartsBlueprintParams,
  type JoinPartsData,
} from "@/lib/part-whole-facts";

export {
  type JoinPartsAction,
  type JoinPartsBlueprintParams,
  type JoinPartsData,
  type JoinPartsItem,
  type JoinPartsPictureSubkind,
  type JoinPartsRepresentation,
  type JoinPartsResponseForm,
} from "@/lib/part-whole-facts";

function generateJoinPartsExercise(ctx: ArchetypeGeneratorContext): Exercise {
  const params = (ctx.spec.params ?? {}) as JoinPartsBlueprintParams;
  const { data, visualModels, defaultPromptAr, defaultStrategyHintAr } =
    buildJoinPartsPayload(ctx, params);

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "JoinParts",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "اجمع الجزأين لإيجاد الكلّ",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function renderJoinPartsExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  return (
    <PartWholeCardGrid data={exercise.data as JoinPartsData} mode={mode} />
  );
}

registerExerciseArchetype({
  id: "JoinParts",
  displayNameAr: "اجمع الجزأين",
  generate: generateJoinPartsExercise,
  render: renderJoinPartsExercise,
});
