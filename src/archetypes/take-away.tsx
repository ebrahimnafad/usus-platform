import React from "react";
import {
  registerExerciseArchetype,
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { PartWholeCardGrid } from "@/components/worksheet/PartWholeCardGrid";
import type { Exercise } from "@/domain/types";
import {
  buildTakeAwayPayload,
  type TakeAwayBlueprintParams,
  type TakeAwayData,
} from "@/lib/part-whole-facts";

export {
  type TakeAwayAction,
  type TakeAwayBlueprintParams,
  type TakeAwayData,
  type TakeAwayItem,
  type TakeAwayRepresentation,
  type TakeAwayResponseForm,
  type TakeAwayUnknownKind,
} from "@/lib/part-whole-facts";

function generateTakeAwayExercise(ctx: ArchetypeGeneratorContext): Exercise {
  const params = (ctx.spec.params ?? {}) as TakeAwayBlueprintParams;
  const { data, visualModels, defaultPromptAr, defaultStrategyHintAr } =
    buildTakeAwayPayload(ctx, params);

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "TakeAway",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "اطرح لإيجاد الجزء الناقص",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels,
    data,
  };
}

function renderTakeAwayExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  return <PartWholeCardGrid data={exercise.data as TakeAwayData} mode={mode} />;
}

registerExerciseArchetype({
  id: "TakeAway",
  displayNameAr: "اطرح",
  generate: generateTakeAwayExercise,
  render: renderTakeAwayExercise,
});
