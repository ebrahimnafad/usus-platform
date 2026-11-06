/**
 * Core domain types following GLOSSARY.md vocabulary.
 */

export type GradeId = "K" | "1" | "2" | "3" | "4" | "5";

export type DifficultyLevel = "Easy" | "Intermediate" | "Advanced";

export type WorksheetDifficultyMode = "scaffolded" | DifficultyLevel;

export type SectionId = "warm-up" | "practice" | "challenge";

export type ViewMode = "worksheet" | "answer-key" | "teacher-notes";

export interface LessonRef {
  grade: GradeId;
  lessonNumber: number;
  rawCode: string; // e.g., "K-1", "1-12"
}

/**
 * Prerequisite graph supporting both alternative paths (separated by `○`)
 * and compound prerequisites within a path (separated by `,`).
 * Example: "K-17 ○ K-3, K-2" ->
 *   paths: [
 *     [{ grade: "K", lessonNumber: 17, rawCode: "K-17" }],
 *     [
 *       { grade: "K", lessonNumber: 3, rawCode: "K-3" },
 *       { grade: "K", lessonNumber: 2, rawCode: "K-2" }
 *     ]
 *   ]
 */
export interface PrerequisiteGraph {
  raw: string;
  /** Alternative prerequisite paths (`○`). First element is the primary path. */
  paths: LessonRef[][];
}

export interface TeacherNotes {
  summaryAr: string;
  pedagogicalStepsAr: string[];
  coPresentationNoteAr?: string;
  enrichmentNoteAr?: string;
  classroomActivityNoteAr?: string;
  commonMisconceptionsAr?: string[];
}

export interface Lesson {
  id: string; // e.g., "K-1"
  grade: GradeId;
  unitNumber: number;
  lessonNumber: number;
  titleEn: string;
  titleAr: string;
  standards: string[];
  prerequisites: PrerequisiteGraph;
  isCoPresented: boolean;
  isEnrichment: boolean;
  descriptionEn: string;
  teacherNotes: TeacherNotes;
}

export interface Unit {
  grade: GradeId;
  unitNumber: number;
  titleEn: string;
  titleAr: string;
  isEnrichment: boolean;
  lessonRange: [number, number];
  lessons: Lesson[];
}

export interface Grade {
  id: GradeId;
  labelEn: string;
  labelAr: string;
  overviewEn: string;
  units: Unit[];
  lessons: Lesson[];
}

export interface CurriculumCatalog {
  grades: Record<GradeId, Grade>;
  gradeList: Grade[];
  getLesson(grade: GradeId, lessonNumber: number): Lesson | undefined;
  getLessonByCode(code: string): Lesson | undefined;
}

/**
 * First-Class SVG Visual Model specifications (ADR-0006).
 * Extensible across all 11 visual model types for Tickets 01-05.
 */
export type VisualModelKind =
  | "everyday-object"
  | "shape-2d"
  | "solid-3d"
  | "real-world-solid"
  | "coin"
  | "five-frame"
  | "snap-cubes"
  | "tally-marks"
  | "dice-pattern"
  | "circular-arrangement"
  | "picture-graph"
  | "numeral-trace"
  | "digit-card"
  | "number-bond"
  | "equation-strip";

export type EverydayObjectCategory =
  "animals" | "fruits" | "toys" | "school" | "nature" | "treats";

export type EverydayObjectId =
  | "apple"
  | "banana"
  | "strawberry"
  | "orange"
  | "butterfly"
  | "cat"
  | "bird"
  | "fish"
  | "bee"
  | "car"
  | "ball"
  | "kite"
  | "train"
  | "pencil"
  | "book"
  | "backpack"
  | "crayon"
  | "flower"
  | "star"
  | "tree"
  | "sun"
  | "leaf"
  | "cupcake";

export type Shape2DId =
  "circle" | "triangle" | "square" | "rectangle" | "pentagon" | "hexagon";

export type Solid3DId =
  "sphere" | "cone" | "cylinder" | "cube" | "rectangular-prism" | "pyramid";

export type RealWorldSolidId =
  | "soup-can"
  | "ice-cream-cone"
  | "ice-cube"
  | "gift-box"
  | "basketball"
  | "party-hat"
  | "juice-box"
  | "tent";

export type CoinDenomination = 1 | 5 | 10 | 25 | 50;

export type VisualSize = "small" | "medium" | "large";

export type ColorThemeId =
  "coral" | "amber" | "emerald" | "sky" | "violet" | "rose" | "teal" | "indigo";

export interface VisualModelSpec {
  kind: VisualModelKind;
  id: string;
  labelAr: string;
  category?: string;
  colorTheme?: ColorThemeId;
  size?: VisualSize;
  rotationDeg?: number;
  count?: number;
  secondaryCount?: number;
  crossedOutCount?: number;
  denomination?: CoinDenomination;
  digit?: number;
  items?: VisualModelSpec[];
  meta?: Record<string, unknown>;
}

/**
 * Canonical Exercise Archetype identifiers (ADR-0005).
 */
export type ExerciseArchetypeId =
  | "ConnectMatch"
  | "ClassifyAndCount"
  | "PatternComplete"
  | "ModelCountAndTrace"
  | "PictureGraphRead"
  | "SequenceAndZero"
  | "SubitizePartWhole"
  | "JoinParts"
  | "JudgeEquality";

export interface ConnectMatchPair {
  pairId: string;
  rightItem: VisualModelSpec;
  leftItem: VisualModelSpec;
  connectionReasonAr: string;
}

export interface ConnectMatchData {
  kind: "ConnectMatch";
  rightColumnTitleAr: string;
  leftColumnTitleAr: string;
  rightItems: Array<{ id: string; model: VisualModelSpec }>;
  leftItems: Array<{ id: string; model: VisualModelSpec }>;
  /** Maps rightItem.id -> leftItem.id */
  solutionMap: Record<string, string>;
  pairs: ConnectMatchPair[];
  comparisonPromptAr?: string;
  comparisonAnswerAr?: string;
}

export interface GenericArchetypeData {
  kind: Exclude<ExerciseArchetypeId, "ConnectMatch">;
  [key: string]: unknown;
}

export type ExerciseData = ConnectMatchData | GenericArchetypeData;

export interface Exercise {
  id: string;
  exerciseNumber: number;
  sectionId: SectionId;
  archetype: ExerciseArchetypeId;
  difficultyLevel: DifficultyLevel;
  sourceLessonId: string;
  titleAr: string;
  promptAr: string;
  strategyHintAr: string;
  visualModels: VisualModelSpec[];
  data: ExerciseData;
}

export interface Section {
  id: SectionId;
  titleAr: string;
  badgeEmoji: string;
  difficultyLevel: DifficultyLevel;
  sourceLessonId: string;
  exercises: Exercise[];
}

export interface WorksheetHeader {
  gradeId: GradeId;
  gradeLabelAr: string;
  unitNumber: number;
  unitNumberAr: string;
  unitTitleAr: string;
  lessonNumber: number;
  lessonNumberAr: string;
  lessonTitleAr: string;
  standards: string[];
  seed: string;
  difficultyMode: WorksheetDifficultyMode;
  difficultyLabelAr: string;
  studentNameLabelAr: string;
  dateLabelAr: string;
  selfCheckLabelAr: string;
}

export interface Worksheet {
  lessonId: string;
  seed: string;
  difficultyMode: WorksheetDifficultyMode;
  header: WorksheetHeader;
  sections: [Section, Section, Section];
  footerTextAr: string;
  seedBadgeAr: string;
  pageNumberAr: string;
}

export interface AnswerKey {
  lessonId: string;
  seed: string;
  difficultyMode: WorksheetDifficultyMode;
  header: WorksheetHeader;
  sections: [Section, Section, Section];
  strategyHintsByExerciseId: Record<string, string>;
  footerTextAr: string;
  seedBadgeAr: string;
  pageNumberAr: string;
}

export interface GeneratedWorksheetBundle {
  grade: Grade;
  unit: Unit;
  lesson: Lesson;
  seed: string;
  difficultyMode: WorksheetDifficultyMode;
  isAuthoredBlueprint: boolean;
  warmUpSourceLessonId: string;
  worksheet: Worksheet;
  answerKey: AnswerKey;
  teacherNotes: TeacherNotes;
}

export interface GenerateWorksheetInput {
  grade: GradeId;
  lessonNumber: number;
  seed: string;
  difficultyLevel?: WorksheetDifficultyMode;
}

export interface RenderWorksheetSurfaceInput extends GenerateWorksheetInput {
  viewMode: ViewMode;
}

/**
 * Declarative Lesson Blueprint interface (ADR-0005).
 */
export interface BlueprintExerciseSpec {
  archetype: ExerciseArchetypeId;
  promptAr?: string;
  strategyHintAr?: string;
  params?: Record<string, unknown>;
}

export interface BlueprintTierSpec {
  warmUp: BlueprintExerciseSpec[];
  practice: BlueprintExerciseSpec[];
  challenge: BlueprintExerciseSpec[];
}

export interface LessonBlueprint {
  lessonId: string; // e.g., "K-1"
  grade: GradeId;
  lessonNumber: number;
  titleAr: string;
  teacherNotes: TeacherNotes;
  /**
   * Declarative exercise configurations per DifficultyLevel.
   * For a given section and target DifficultyLevel, the engine selects the specs from that tier.
   */
  tiers: Record<DifficultyLevel, BlueprintTierSpec>;
}
