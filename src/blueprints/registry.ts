import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import type {
  ArchetypeParamsByArchetypeId,
  BlueprintExerciseSpec,
  BlueprintTierSpec,
  DifficultyLevel,
  ExerciseArchetypeId,
  GradeId,
  LessonBlueprint,
  TeacherNotes,
} from "@/domain/types";
import type { ClassifyAndCountBlueprintParams } from "@/archetypes/classify-and-count";
import type { ConnectMatchBlueprintParams } from "@/archetypes/connect-match";
import type { JoinPartsBlueprintParams } from "@/archetypes/join-parts";
import type { JudgeEqualityBlueprintParams } from "@/archetypes/judge-equality";
import type { ModelCountAndTraceBlueprintParams } from "@/archetypes/model-count-and-trace";
import type { NumtangaBlueprintParams } from "@/archetypes/numtanga";
import type { PatternCompleteBlueprintParams } from "@/archetypes/pattern-complete";
import type { PictureGraphReadBlueprintParams } from "@/archetypes/picture-graph-read";
import type { SequenceAndZeroBlueprintParams } from "@/archetypes/sequence-and-zero";
import type { SubitizePartWholeBlueprintParams } from "@/archetypes/subitize-part-whole";
import type { TakeAwayBlueprintParams } from "@/archetypes/take-away";
import type { SolveWordProblemBlueprintParams } from "@/lib/word-problems";

export interface TypedArchetypeParamsMap extends ArchetypeParamsByArchetypeId {
  ConnectMatch: ConnectMatchBlueprintParams & Record<string, unknown>;
  ClassifyAndCount: ClassifyAndCountBlueprintParams & Record<string, unknown>;
  PatternComplete: PatternCompleteBlueprintParams & Record<string, unknown>;
  ModelCountAndTrace: ModelCountAndTraceBlueprintParams &
    Record<string, unknown>;
  PictureGraphRead: PictureGraphReadBlueprintParams & Record<string, unknown>;
  SequenceAndZero: SequenceAndZeroBlueprintParams & Record<string, unknown>;
  SubitizePartWhole: SubitizePartWholeBlueprintParams & Record<string, unknown>;
  JoinParts: JoinPartsBlueprintParams & Record<string, unknown>;
  JudgeEquality: JudgeEqualityBlueprintParams & Record<string, unknown>;
  TakeAway: TakeAwayBlueprintParams & Record<string, unknown>;
  SolveWordProblem: SolveWordProblemBlueprintParams & Record<string, unknown>;
  Numtanga: NumtangaBlueprintParams & Record<string, unknown>;
}

const blueprintRegistry = new Map<string, LessonBlueprint>();

const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  "Easy",
  "Intermediate",
  "Advanced",
];

const SECTION_KEYS = ["warmUp", "practice", "challenge"] as const;

export type BlueprintExerciseTierOverride<
  K extends ExerciseArchetypeId = ExerciseArchetypeId,
> = {
  promptAr?: string;
  strategyHintAr?: string;
  params?: TypedArchetypeParamsMap[K];
};

export type DeclarativeExerciseSpecFor<K extends ExerciseArchetypeId> = {
  archetype: K;
  promptAr?: string;
  strategyHintAr?: string;
  params?: TypedArchetypeParamsMap[K];
  /**
   * Optional per-Difficulty-Level overrides merged on top of the base spec:
   * - `promptAr` and `strategyHintAr` replace the base string when provided.
   * - `params` shallow-merges `{ ...baseParams, ...tierOverride.params }`.
   */
  byDifficulty?: Partial<
    Record<DifficultyLevel, BlueprintExerciseTierOverride<K>>
  >;
};

export type DeclarativeExerciseSpec = {
  [K in ExerciseArchetypeId]: DeclarativeExerciseSpecFor<K>;
}[ExerciseArchetypeId];

export interface DeclarativeSectionSpecs {
  warmUp: DeclarativeExerciseSpec[];
  practice: DeclarativeExerciseSpec[];
  challenge: DeclarativeExerciseSpec[];
}

export interface DefineLessonBlueprintInput {
  lessonId: string;
  grade: GradeId;
  lessonNumber: number;
  /**
   * Optional when `AUTHORED_LESSON_LOCALIZATION[lessonId]` exists; resolved
   * automatically and synced back into `AUTHORED_LESSON_LOCALIZATION`.
   */
  titleAr?: string;
  /**
   * Optional or partial when `AUTHORED_LESSON_LOCALIZATION[lessonId]` exists;
   * merged with `AUTHORED_LESSON_LOCALIZATION[lessonId].teacherNotes` and synced back.
   */
  teacherNotes?: Partial<TeacherNotes>;
  /** Explicit 3-tier definition (Easy, Intermediate, Advanced). */
  tiers?: Record<DifficultyLevel, BlueprintTierSpec>;
  /** Compact section definition expanded across Easy, Intermediate, Advanced via `byDifficulty`. */
  sections?: DeclarativeSectionSpecs;
}

export function compileBlueprintTiers(
  sections: DeclarativeSectionSpecs
): Record<DifficultyLevel, BlueprintTierSpec> {
  const tiers = {} as Record<DifficultyLevel, BlueprintTierSpec>;

  for (const level of DIFFICULTY_LEVELS) {
    const tierSpec = {} as BlueprintTierSpec;
    for (const sectionKey of SECTION_KEYS) {
      const specs = sections[sectionKey];
      tierSpec[sectionKey] = specs.map((spec): BlueprintExerciseSpec => {
        const override = spec.byDifficulty?.[level];
        const mergedParams =
          spec.params || override?.params
            ? { ...(spec.params ?? {}), ...(override?.params ?? {}) }
            : undefined;
        return {
          archetype: spec.archetype,
          promptAr: override?.promptAr ?? spec.promptAr,
          strategyHintAr: override?.strategyHintAr ?? spec.strategyHintAr,
          ...(mergedParams ? { params: mergedParams } : {}),
        };
      });
    }
    tiers[level] = tierSpec;
  }

  return tiers;
}

function resolveAndSyncLocalization(input: {
  lessonId: string;
  titleAr?: string;
  teacherNotes?: Partial<TeacherNotes>;
}): { titleAr: string; teacherNotes: TeacherNotes } {
  const existing = AUTHORED_LESSON_LOCALIZATION[input.lessonId];
  const resolvedTitleAr = (input.titleAr ?? existing?.titleAr ?? "").trim();

  const baseNotes = existing?.teacherNotes;
  const incomingNotes = input.teacherNotes;
  const resolvedTeacherNotes: TeacherNotes | undefined =
    baseNotes || incomingNotes
      ? {
          summaryAr: incomingNotes?.summaryAr ?? baseNotes?.summaryAr ?? "",
          pedagogicalStepsAr:
            incomingNotes?.pedagogicalStepsAr ??
            baseNotes?.pedagogicalStepsAr ??
            [],
          ...((incomingNotes?.coPresentationNoteAr ??
          baseNotes?.coPresentationNoteAr)
            ? {
                coPresentationNoteAr:
                  incomingNotes?.coPresentationNoteAr ??
                  baseNotes?.coPresentationNoteAr,
              }
            : {}),
          ...((incomingNotes?.enrichmentNoteAr ?? baseNotes?.enrichmentNoteAr)
            ? {
                enrichmentNoteAr:
                  incomingNotes?.enrichmentNoteAr ??
                  baseNotes?.enrichmentNoteAr,
              }
            : {}),
          ...((incomingNotes?.classroomActivityNoteAr ??
          baseNotes?.classroomActivityNoteAr)
            ? {
                classroomActivityNoteAr:
                  incomingNotes?.classroomActivityNoteAr ??
                  baseNotes?.classroomActivityNoteAr,
              }
            : {}),
          ...((incomingNotes?.commonMisconceptionsAr ??
          baseNotes?.commonMisconceptionsAr)
            ? {
                commonMisconceptionsAr:
                  incomingNotes?.commonMisconceptionsAr ??
                  baseNotes?.commonMisconceptionsAr,
              }
            : {}),
        }
      : undefined;

  if (
    resolvedTitleAr &&
    resolvedTeacherNotes &&
    resolvedTeacherNotes.summaryAr
  ) {
    AUTHORED_LESSON_LOCALIZATION[input.lessonId] = {
      titleAr: resolvedTitleAr,
      teacherNotes: resolvedTeacherNotes,
    };
  }

  return {
    titleAr: resolvedTitleAr,
    teacherNotes: resolvedTeacherNotes as TeacherNotes,
  };
}

export function defineLessonBlueprint(
  input: DefineLessonBlueprintInput
): LessonBlueprint {
  const { titleAr, teacherNotes } = resolveAndSyncLocalization({
    lessonId: input.lessonId,
    titleAr: input.titleAr,
    teacherNotes: input.teacherNotes,
  });

  const tiers = input.tiers
    ? input.tiers
    : input.sections
      ? compileBlueprintTiers(input.sections)
      : (undefined as unknown as Record<DifficultyLevel, BlueprintTierSpec>);

  const blueprint: LessonBlueprint = {
    lessonId: input.lessonId,
    grade: input.grade,
    lessonNumber: input.lessonNumber,
    titleAr,
    teacherNotes,
    tiers,
  };

  registerLessonBlueprint(blueprint);
  return blueprint;
}

export function validateLessonBlueprint(blueprint: LessonBlueprint): void {
  if (!blueprint || typeof blueprint !== "object") {
    throw new Error("LessonBlueprint must be an object.");
  }
  if (!blueprint.lessonId || !blueprint.lessonId.trim()) {
    throw new Error("LessonBlueprint.lessonId must be a non-empty string.");
  }
  if (!blueprint.grade) {
    throw new Error("LessonBlueprint.grade is required.");
  }
  if (typeof blueprint.lessonNumber !== "number") {
    throw new Error("LessonBlueprint.lessonNumber must be a number.");
  }
  if (!blueprint.titleAr || !blueprint.titleAr.trim()) {
    throw new Error("LessonBlueprint.titleAr must be a non-empty string.");
  }
  if (!blueprint.teacherNotes || !blueprint.teacherNotes.summaryAr) {
    throw new Error("LessonBlueprint.teacherNotes is required.");
  }
  if (!blueprint.tiers) {
    throw new Error("LessonBlueprint.tiers is required.");
  }

  for (const level of DIFFICULTY_LEVELS) {
    const tier = blueprint.tiers[level];
    if (!tier) {
      throw new Error(`LessonBlueprint.tiers.${level} is required.`);
    }
    for (const sectionKey of SECTION_KEYS) {
      const specs = tier[sectionKey];
      if (!Array.isArray(specs) || specs.length === 0) {
        throw new Error(
          `LessonBlueprint.tiers.${level}.${sectionKey} must be a non-empty array.`
        );
      }
      for (const spec of specs) {
        if (!spec || typeof spec.archetype !== "string") {
          throw new Error(
            `LessonBlueprint.tiers.${level}.${sectionKey} contains an invalid spec.`
          );
        }
      }
    }
  }
}

export function registerLessonBlueprint(blueprint: LessonBlueprint): void {
  const { titleAr, teacherNotes } = resolveAndSyncLocalization({
    lessonId: blueprint.lessonId,
    titleAr: blueprint.titleAr,
    teacherNotes: blueprint.teacherNotes,
  });
  blueprint.titleAr = titleAr;
  blueprint.teacherNotes = teacherNotes;
  validateLessonBlueprint(blueprint);
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
