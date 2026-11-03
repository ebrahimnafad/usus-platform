import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
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
import { lessonK1Blueprint } from "@/blueprints/grade-k/lesson-k1";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";
import { createSeededRandom } from "@/lib/seed";
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

function createFallbackBlueprintForLesson(lesson: Lesson): LessonBlueprint {
  return {
    lessonId: lesson.id,
    grade: lesson.grade,
    lessonNumber: lesson.lessonNumber,
    titleAr: lesson.titleAr,
    teacherNotes: lesson.teacherNotes,
    tiers: lessonK1Blueprint.tiers,
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
  const activeBlueprint =
    authoredBlueprint ?? createFallbackBlueprintForLesson(lesson);

  const warmUpSource = resolveWarmUpSourceBlueprint(
    lesson,
    activeBlueprint,
    catalog
  );

  const rootRng = createSeededRandom(`${lesson.id}::${seed}`);

  let globalExerciseCounter = 0;

  const buildSection = (
    sectionId: SectionId,
    blueprint: LessonBlueprint,
    sourceLessonId: string,
    pickSpecs: (
      tier: LessonBlueprint["tiers"][DifficultyLevel]
    ) => BlueprintExerciseSpec[]
  ): Section => {
    const targetDifficulty = resolveSectionDifficulty(
      sectionId,
      difficultyMode
    );
    const tierSpec = blueprint.tiers[targetDifficulty];
    const specs = pickSpecs(tierSpec);
    const sectionRng = rootRng.fork(`section:${sectionId}:${sourceLessonId}`);

    const exercises: Exercise[] = specs.map((spec, idx) => {
      globalExerciseCounter += 1;
      const archetypeDef = getExerciseArchetype(spec.archetype);
      const exRng = sectionRng.fork(`ex:${idx}`);
      const sourceLesson = catalog.getLessonByCode(sourceLessonId) ?? lesson;

      return archetypeDef.generate({
        lesson: sourceLesson,
        sourceLessonId,
        sectionId,
        exerciseIndex: idx,
        exerciseNumber: globalExerciseCounter,
        difficultyLevel: targetDifficulty,
        rng: exRng,
        spec,
      });
    });

    return {
      id: sectionId,
      titleAr: SECTION_METADATA[sectionId].titleAr,
      badgeEmoji: SECTION_METADATA[sectionId].badgeEmoji,
      difficultyLevel: targetDifficulty,
      sourceLessonId,
      exercises,
    };
  };

  // 1. 🌟 تهيئة (Warm-Up): pulls 1-2 exercises from prerequisite blueprint (or current blueprint)
  const warmUpSection = buildSection(
    "warm-up",
    warmUpSource.blueprint,
    warmUpSource.sourceLessonId,
    (tier) => tier.warmUp
  );

  // 2. 🎨 تدرّب (Practice): core practice exercises from active blueprint
  const practiceSection = buildSection(
    "practice",
    activeBlueprint,
    lesson.id,
    (tier) => tier.practice
  );

  // 3. 🚀 تحدٍّ وتقييم (Challenge & Assessment): deeper reasoning exercises from active blueprint
  const challengeSection = buildSection(
    "challenge",
    activeBlueprint,
    lesson.id,
    (tier) => tier.challenge
  );

  const sections: [Section, Section, Section] = [
    warmUpSection,
    practiceSection,
    challengeSection,
  ];

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
  const seedBadgeAr = `رمز النموذج: ${seedAr}`;
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

/**
 * Primary Seam — Renders the full RTL HTML/SVG markup for a Worksheet, Answer Key, or Teacher Notes view.
 */
export function renderWorksheetSurface(
  input: RenderWorksheetSurfaceInput
): string {
  const bundle = generateWorksheet(input);
  return renderToStaticMarkup(
    React.createElement(WorksheetSurface, {
      bundle,
      viewMode: input.viewMode,
    })
  );
}
