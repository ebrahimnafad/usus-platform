import "@/registry/bootstrap";
import type {
  AnswerKey,
  BlueprintExerciseSpec,
  CurriculumCatalog,
  DifficultyLevel,
  Exercise,
  GenerateWorksheetInput,
  GeneratedWorksheetBundle,
  Lesson,
  LessonBlueprint,
  RenderWorksheetSurfaceInput,
  Section,
  SectionId,
  Worksheet,
  WorksheetDifficultyMode,
  WorksheetHeader,
} from "@/domain/types";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { getExerciseArchetype } from "@/archetypes/registry";
import { getLessonBlueprint } from "@/blueprints/registry";
import { createFallbackBlueprint } from "@/blueprints/fallback";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";
import { createSeededRandom, type SeededRandom } from "@/lib/seed";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export const DIFFICULTY_LABELS_AR: Record<WorksheetDifficultyMode, string> = {
  scaffolded: "متدرج (سهل ← متوسط ← متقدم)",
  Easy: "سهل",
  Intermediate: "متوسط",
  Advanced: "متقدم",
};

export const SECTION_METADATA: Record<
  SectionId,
  { titleAr: string; badgeEmoji: string; defaultDifficulty: DifficultyLevel }
> = {
  "warm-up": {
    titleAr: "تهيئة",
    badgeEmoji: "🌟",
    defaultDifficulty: "Easy",
  },
  practice: {
    titleAr: "تدرّب",
    badgeEmoji: "🎨",
    defaultDifficulty: "Intermediate",
  },
  challenge: {
    titleAr: "تحدٍّ وتقييم",
    badgeEmoji: "🚀",
    defaultDifficulty: "Advanced",
  },
};

/**
 * Resolves the target DifficultyLevel for a given section based on the worksheet's difficultyMode.
 * - "scaffolded" (default): Easy in warm-up, Intermediate in practice, Advanced in challenge.
 * - "Easy" | "Intermediate" | "Advanced": clamps all sections to that single tier.
 */
export function resolveSectionDifficulty(
  sectionId: SectionId,
  difficultyMode: WorksheetDifficultyMode
): DifficultyLevel {
  if (difficultyMode === "scaffolded") {
    return SECTION_METADATA[sectionId].defaultDifficulty;
  }
  return difficultyMode;
}

/**
 * Resolves the LessonBlueprint to pull Warm-Up (`تهيئة`) exercises from:
 * - Searches the lesson's Prerequisite graph (preferring the primary path before `○`)
 *   for the first prerequisite lesson that has an authored LessonBlueprint.
 * - Falls back to the current lesson's blueprint when no prerequisite exists or is authored yet.
 */
export function resolveWarmUpSourceBlueprint(
  lesson: Lesson,
  currentBlueprint: LessonBlueprint,
  catalog: CurriculumCatalog
): { blueprint: LessonBlueprint; sourceLessonId: string } {
  for (const pathGroup of lesson.prerequisites.paths) {
    for (const prereqRef of pathGroup) {
      const prereqLesson = catalog.getLesson(
        prereqRef.grade,
        prereqRef.lessonNumber
      );
      if (!prereqLesson) continue;
      const prereqBlueprint = getLessonBlueprint(prereqLesson.id);
      if (prereqBlueprint) {
        return {
          blueprint: prereqBlueprint,
          sourceLessonId: prereqLesson.id,
        };
      }
    }
  }

  return {
    blueprint: currentBlueprint,
    sourceLessonId: lesson.id,
  };
}

interface BuildWorksheetSectionInput {
  sectionId: SectionId;
  blueprint: LessonBlueprint;
  sourceLessonId: string;
  lesson: Lesson;
  catalog: CurriculumCatalog;
  rootRng: SeededRandom;
  difficultyMode: WorksheetDifficultyMode;
  pickSpecs: (
    tier: LessonBlueprint["tiers"][DifficultyLevel]
  ) => BlueprintExerciseSpec[];
  startingExerciseNumber: number;
  usedFacts: Set<string>;
}

const SECTION_MAX_EXERCISES: Record<SectionId, number> = {
  "warm-up": 2,
  practice: 4,
  challenge: 2,
};

function buildWorksheetSection(input: BuildWorksheetSectionInput): {
  section: Section;
  nextExerciseNumber: number;
} {
  const {
    sectionId,
    blueprint,
    sourceLessonId,
    lesson,
    catalog,
    rootRng,
    difficultyMode,
    pickSpecs,
    startingExerciseNumber,
    usedFacts,
  } = input;

  const targetDifficulty = resolveSectionDifficulty(sectionId, difficultyMode);
  const tierSpec = blueprint.tiers[targetDifficulty];
  const specs = pickSpecs(tierSpec).slice(0, SECTION_MAX_EXERCISES[sectionId]);
  const sectionRng = rootRng.fork(`section:${sectionId}:${sourceLessonId}`);

  const exercises: Exercise[] = specs.map((spec, idx) => {
    const archetypeDef = getExerciseArchetype(spec.archetype);
    const exRng = sectionRng.fork(`ex:${idx}`);
    const sourceLesson = catalog.getLessonByCode(sourceLessonId) ?? lesson;

    return archetypeDef.generate({
      lesson: sourceLesson,
      sourceLessonId,
      sectionId,
      exerciseIndex: idx,
      exerciseNumber: startingExerciseNumber + idx,
      difficultyLevel: targetDifficulty,
      rng: exRng,
      spec,
      usedFacts,
    });
  });

  return {
    section: {
      id: sectionId,
      titleAr: SECTION_METADATA[sectionId].titleAr,
      badgeEmoji: SECTION_METADATA[sectionId].badgeEmoji,
      difficultyLevel: targetDifficulty,
      sourceLessonId,
      exercises,
    },
    nextExerciseNumber: startingExerciseNumber + specs.length,
  };
}

/**
 * Primary Seam — Generates a deterministic Worksheet, mirrored Answer Key, and Teacher Notes
 * for a given `(grade, lessonNumber, seed, difficultyLevel)`.
 */
export function generateWorksheet(
  input: GenerateWorksheetInput
): GeneratedWorksheetBundle {
  const catalog = getCurriculumCatalog();
  const gradeObj = catalog.grades[input.grade];
  if (!gradeObj) {
    throw new Error(`Unknown grade: ${input.grade}`);
  }

  const lesson = catalog.getLesson(input.grade, input.lessonNumber);
  if (!lesson) {
    throw new Error(
      `Unknown lesson ${input.grade}-${input.lessonNumber} in curriculum catalog.`
    );
  }

  const unit =
    gradeObj.units.find((u) => u.unitNumber === lesson.unitNumber) ??
    gradeObj.units[0];

  const seed = (input.seed ?? "K5-DEFAULT").trim() || "K5-DEFAULT";
  const difficultyMode: WorksheetDifficultyMode =
    input.difficultyLevel ?? "scaffolded";

  const authoredBlueprint = getLessonBlueprint(lesson.id);
  const activeBlueprint = authoredBlueprint ?? createFallbackBlueprint(lesson);

  const warmUpSource = resolveWarmUpSourceBlueprint(
    lesson,
    activeBlueprint,
    catalog
  );

  const rootRng = createSeededRandom(`${lesson.id}::${seed}`);
  const usedFacts = new Set<string>();

  const warmUpBuilt = buildWorksheetSection({
    sectionId: "warm-up",
    blueprint: warmUpSource.blueprint,
    sourceLessonId: warmUpSource.sourceLessonId,
    lesson,
    catalog,
    rootRng,
    difficultyMode,
    pickSpecs: (tier) => tier.warmUp,
    startingExerciseNumber: 1,
    usedFacts,
  });

  const practiceBuilt = buildWorksheetSection({
    sectionId: "practice",
    blueprint: activeBlueprint,
    sourceLessonId: lesson.id,
    lesson,
    catalog,
    rootRng,
    difficultyMode,
    pickSpecs: (tier) => tier.practice,
    startingExerciseNumber: warmUpBuilt.nextExerciseNumber,
    usedFacts,
  });

  const challengeBuilt = buildWorksheetSection({
    sectionId: "challenge",
    blueprint: activeBlueprint,
    sourceLessonId: lesson.id,
    lesson,
    catalog,
    rootRng,
    difficultyMode,
    pickSpecs: (tier) => tier.challenge,
    startingExerciseNumber: practiceBuilt.nextExerciseNumber,
    usedFacts,
  });

  const authoredSections: [Section, Section, Section] = [
    warmUpBuilt.section,
    practiceBuilt.section,
    challengeBuilt.section,
  ];

  const fallbackSections: [Section, Section, Section] = [
    {
      id: "warm-up",
      titleAr: SECTION_METADATA["warm-up"].titleAr,
      badgeEmoji: SECTION_METADATA["warm-up"].badgeEmoji,
      difficultyLevel: resolveSectionDifficulty("warm-up", difficultyMode),
      sourceLessonId: lesson.id,
      exercises: [],
    },
    {
      id: "practice",
      titleAr: SECTION_METADATA.practice.titleAr,
      badgeEmoji: SECTION_METADATA.practice.badgeEmoji,
      difficultyLevel: resolveSectionDifficulty("practice", difficultyMode),
      sourceLessonId: lesson.id,
      exercises: [],
    },
    {
      id: "challenge",
      titleAr: SECTION_METADATA.challenge.titleAr,
      badgeEmoji: SECTION_METADATA.challenge.badgeEmoji,
      difficultyLevel: resolveSectionDifficulty("challenge", difficultyMode),
      sourceLessonId: lesson.id,
      exercises: [],
    },
  ];

  const sections: [Section, Section, Section] = authoredBlueprint
    ? authoredSections
    : fallbackSections;

  const seedAr = toEasternArabicNumerals(seed);
  const header: WorksheetHeader = {
    gradeId: lesson.grade,
    gradeLabelAr: gradeObj.labelAr,
    unitNumber: unit.unitNumber,
    unitNumberAr: formatEasternNumber(unit.unitNumber),
    unitTitleAr: unit.titleAr,
    lessonNumber: lesson.lessonNumber,
    lessonNumberAr: formatEasternNumber(lesson.lessonNumber),
    lessonTitleAr: activeBlueprint.titleAr || lesson.titleAr,
    standards: lesson.standards,
    seed,
    difficultyMode,
    difficultyLabelAr: DIFFICULTY_LABELS_AR[difficultyMode],
    studentNameLabelAr: "الاسم:",
    dateLabelAr: "التاريخ:",
    selfCheckLabelAr: "كيف كان أدائي؟",
  };

  const footerTextAr = `منصة أوراق العمل الرياضية للصفوف K–٥ • ${gradeObj.labelAr} • الدرس ${formatEasternNumber(
    lesson.lessonNumber
  )}`;
  const seedBadgeAr = `رمز الورقة: ${seedAr}`;
  const pageNumberAr = `صفحة ${formatEasternNumber(1)} من ${formatEasternNumber(1)}`;

  const worksheet: Worksheet = {
    lessonId: lesson.id,
    seed,
    difficultyMode,
    header,
    sections,
    footerTextAr,
    seedBadgeAr,
    pageNumberAr,
  };

  const strategyHintsByExerciseId: Record<string, string> = {};
  for (const section of sections) {
    for (const ex of section.exercises) {
      strategyHintsByExerciseId[ex.id] = ex.strategyHintAr;
    }
  }

  const answerKey: AnswerKey = {
    lessonId: lesson.id,
    seed,
    difficultyMode,
    header,
    sections,
    strategyHintsByExerciseId,
    footerTextAr,
    seedBadgeAr,
    pageNumberAr,
  };

  return {
    grade: gradeObj,
    unit,
    lesson,
    seed,
    difficultyMode,
    isAuthoredBlueprint: Boolean(authoredBlueprint),
    warmUpSourceLessonId: warmUpSource.sourceLessonId,
    worksheet,
    answerKey,
    teacherNotes: activeBlueprint.teacherNotes ?? lesson.teacherNotes,
  };
}

// (renderWorksheetSurface moved to src/lib/render-worksheet-surface.ts)
