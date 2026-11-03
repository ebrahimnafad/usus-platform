// src/registry/bootstrap.ts
//
// Single registration point for all visual models, exercise archetypes, and lesson blueprints.
//
// When adding a new visual model, archetype, or lesson blueprint:
//   1. Create the implementation file in the appropriate directory.
//   2. Add ONE import line here.
//
// This file is the ONLY place that needs editing when wiring new slices.
// worksheet-engine.ts imports this module once and never changes.

// --- Visual Models ---
import { registerBuiltInVisualModels } from "@/visual-models/registry";
import { registerShapesSolidsCoinsVisualModels } from "@/visual-models/shapes-solids-coins";
import {
  registerFiveFrameVisualModel,
  registerNumeralTraceVisualModel,
  registerSnapCubesVisualModel,
  registerTallyMarksVisualModel,
  registerDicePatternVisualModel,
  registerCircularArrangementVisualModel,
} from "@/visual-models/unit-2-models";
import { registerPictureGraphVisualModels } from "@/visual-models/picture-graphs";

registerBuiltInVisualModels();
registerShapesSolidsCoinsVisualModels();
registerFiveFrameVisualModel();
registerNumeralTraceVisualModel();
registerSnapCubesVisualModel();
registerTallyMarksVisualModel();
registerDicePatternVisualModel();
registerCircularArrangementVisualModel();
registerPictureGraphVisualModels();

// --- Exercise Archetypes ---
import { registerExerciseArchetype } from "@/archetypes/registry";
import { connectMatchArchetype } from "@/archetypes/connect-match";
import { classifyAndCountArchetype } from "@/archetypes/classify-and-count";
import { patternCompleteArchetype } from "@/archetypes/pattern-complete";
import { modelCountAndTraceArchetype } from "@/archetypes/model-count-and-trace";
import { pictureGraphReadArchetype } from "@/archetypes/picture-graph-read";
import { sequenceAndZeroArchetype } from "@/archetypes/sequence-and-zero";
import { subitizePartWholeArchetype } from "@/archetypes/subitize-part-whole";

registerExerciseArchetype(connectMatchArchetype);
registerExerciseArchetype(classifyAndCountArchetype);
registerExerciseArchetype(patternCompleteArchetype);
registerExerciseArchetype(modelCountAndTraceArchetype);
registerExerciseArchetype(pictureGraphReadArchetype);
registerExerciseArchetype(sequenceAndZeroArchetype);
registerExerciseArchetype(subitizePartWholeArchetype);

// --- Lesson Blueprints ---
import "@/blueprints/grade-k/lesson-k1";
import "@/blueprints/grade-k/lessons-k2-to-k8";
import "@/blueprints/grade-k/lessons-k9-to-k11";
import "@/blueprints/grade-k/lessons-k12-to-k19";
import "@/blueprints/grade-k/lessons-k20-to-k26";
