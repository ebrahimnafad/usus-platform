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
import "@/visual-models/shapes-solids-coins";
import "@/visual-models/frames-cubes-tallies-dice-circles-tracing";
import "@/visual-models/picture-graphs";

// --- Exercise Archetypes ---
import "@/archetypes/connect-match";
import "@/archetypes/classify-and-count";
import "@/archetypes/pattern-complete";
import "@/archetypes/model-count-and-trace";
import "@/archetypes/graphs-sequences-subitize";

// --- Lesson Blueprints ---
import "@/blueprints/grade-k/lesson-k1";
import "@/blueprints/grade-k/lessons-k2-to-k8";
import "@/blueprints/grade-k/lessons-k9-to-k11";
import "@/blueprints/grade-k/lessons-k12-to-k19";
import "@/blueprints/grade-k/lessons-k20-to-k26";
