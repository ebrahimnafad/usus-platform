// src/registry/bootstrap.ts
//
// Single registration point for all visual models, exercise archetypes, and lesson blueprints.
//
// When adding a new visual model, archetype, or lesson blueprint:
//   1. Create the implementation file in the appropriate directory.
//   2. Add ONE import line here (side-effect import triggers self-registration).
//
// This file is the ONLY place that needs editing when wiring new slices.
// worksheet-engine.ts imports this module once and never changes.

// --- Visual Models ---
// Each visual-models module self-registers its renderers on import.
import "@/visual-models/registry";
import "@/visual-models/everyday-objects";
import "@/visual-models/shapes-solids-coins";
import "@/visual-models/unit-2-models";
import "@/visual-models/unit-3-models";
import "@/visual-models/picture-graphs";
import "@/visual-models/measurement-models";
import "@/visual-models/unit-7-models";
import "@/visual-models/unit-8-models";
import "@/visual-models/linear-comparison";
import "@/visual-models/dot-array";
import "@/visual-models/ten-frame-grid";
import "@/visual-models/money-card";

// --- Exercise Archetypes ---
// Each archetype module self-registers its definition on import.
import "@/archetypes/connect-match";
import "@/archetypes/classify-and-count";
import "@/archetypes/pattern-complete";
import "@/archetypes/model-count-and-trace";
import "@/archetypes/picture-graph-read";
import "@/archetypes/sequence-and-zero";
import "@/archetypes/subitize-part-whole";
import "@/archetypes/join-parts";
import "@/archetypes/judge-equality";
import "@/archetypes/take-away";
import "@/archetypes/solve-word-problem";
import "@/archetypes/shift-one-decompose";
import "@/archetypes/measure-and-compare-length";
import "@/archetypes/numtanga";
import "@/archetypes/digicross";
import "@/archetypes/compare-groups";
import "@/archetypes/count-grid-items";
import "@/archetypes/identify-and-label";

// --- Lesson Blueprints ---
import "@/blueprints/grade-k/lesson-k1";
import "@/blueprints/grade-k/lessons-k2-to-k8";
import "@/blueprints/grade-k/lessons-k9-to-k11";
import "@/blueprints/grade-k/lessons-k12-to-k19";
import "@/blueprints/grade-k/lessons-k20-to-k26";
import "@/blueprints/grade-k/lessons-k27-to-k31";
import "@/blueprints/grade-k/lessons-k32-to-k38";
import "@/blueprints/grade-k/lesson-k39";
import "@/blueprints/grade-k/lessons-k40-to-k41";
import "@/blueprints/grade-k/lessons-k42-to-k44";
import "@/blueprints/grade-k/lesson-k45";
import "@/blueprints/grade-k/lessons-k46-to-k48";
import "@/blueprints/grade-k/lessons-k49-to-k50";
import "@/blueprints/grade-k/lessons-k51-to-k53";
import "@/blueprints/grade-k/lessons-k54-to-k55";
import "@/blueprints/grade-k/lessons-k56-to-k58";
import "@/blueprints/grade-k/lessons-k59-to-k62";
import "@/blueprints/grade-k/lessons-k63-to-k66";
import "@/blueprints/grade-k/lessons-k67-to-k68";
import "@/blueprints/grade-k/lessons-k69-to-k71";
import "@/blueprints/grade-k/lessons-k72-to-k73";
import "@/blueprints/grade-k/lessons-k75-to-k77";
import "@/blueprints/grade-k/lessons-k74-k78-to-k80";
import "@/blueprints/grade-k/lessons-k81-to-k83";
import "@/blueprints/grade-k/lessons-k84-to-k85";
import "@/blueprints/grade-k/lessons-k86-to-k88";
import "@/blueprints/grade-k/lessons-k89-to-k90";
import "@/blueprints/grade-k/lessons-k91-to-k93";
import "@/blueprints/grade-k/lessons-k94-to-k96";
import "@/blueprints/grade-k/lessons-k97-to-k98";
import "@/blueprints/grade-k/lessons-k99-to-k102";
import "@/blueprints/grade-k/lessons-k103-to-k106";
import "@/blueprints/grade-k/lessons-k107-to-k110";
import "@/blueprints/grade-k/lessons-k111-to-k112";
import "@/blueprints/grade-k/lessons-k113-to-k115";
import "@/blueprints/grade-k/lessons-k116-to-k118";
import "@/blueprints/grade-k/lessons-k119-to-k120";
