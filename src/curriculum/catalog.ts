import fs from "fs";
import path from "path";
import type {
  CurriculumCatalog,
  Grade,
  GradeId,
  Lesson,
  LessonRef,
  PrerequisiteGraph,
  Unit,
} from "@/domain/types";
import {
  GRADE_LABELS_AR,
  UNIT_TITLES_AR,
  resolveLessonLocalization,
} from "@/curriculum/arabic-localization";

const GRADE_IDS: GradeId[] = ["K", "1", "2", "3", "4", "5"];

const GRADE_FILES: Record<GradeId, string> = {
  K: "Grade K/Grade_K_Curriculum.md",
  "1": "Grade 1/Grade 1 Curriculum.md",
  "2": "Grade 2/Grade 2 Curriculum.md",
  "3": "Grade 3/Grade 3 Curriculum.md",
  "4": "Grade 4/Grade 4 Curriculum.md",
  "5": "Grade 5/Grade 5 Curriculum.md",
};

/**
 * Parses a prerequisite expression such as:
 * - "K-1"
 * - "K-6, K-5" (compound prerequisites in a single path)
 * - "K-17 ○ K-3, K-2" (alternative paths separated by `○`, where second path is compound)
 */
export function parsePrerequisiteGraph(
  rawInput: string | undefined
): PrerequisiteGraph {
  const raw = (rawInput ?? "").trim();
  if (!raw) {
    return { raw: "", paths: [] };
  }

  const altSegments = raw
    .split("○")
    .map((s) => s.trim())
    .filter(Boolean);

  const paths: LessonRef[][] = altSegments
    .map((segment) => {
      const refs: LessonRef[] = [];
      for (const token of segment.split(",")) {
        const cleaned = token.trim();
        if (!cleaned) continue;
        const match = cleaned.match(/^(K|[1-5])-(\d+)(?:\.\d+)?$/);
        if (match) {
          refs.push({
            grade: match[1] as GradeId,
            lessonNumber: parseInt(match[2], 10),
            rawCode: cleaned,
          });
        }
      }
      return refs;
    })
    .filter((group) => group.length > 0);

  return { raw, paths };
}

/**
 * Parses a single Grade curriculum Markdown file into a strongly-typed Grade structure.
 */
export function parseGradeMarkdown(
  gradeId: GradeId,
  markdownContent: string
): Grade {
  const lines = markdownContent.replace(/\r\n/g, "\n").split("\n");

  const units: Unit[] = [];
  const allLessons: Lesson[] = [];
  let currentUnit: Unit | null = null;
  let currentLesson: {
    lessonNumber: number;
    titleEn: string;
    isEnrichmentFromTitle: boolean;
    standards: string[];
    isCoPresented: boolean;
    prerequisitesRaw: string;
    descriptionEn: string;
  } | null = null;

  let inOverview = false;
  const overviewLines: string[] = [];

  const flushLesson = () => {
    if (!currentLesson || !currentUnit) return;
    const isEnrichment =
      currentLesson.isEnrichmentFromTitle || currentUnit.isEnrichment;
    const lessonId = `${gradeId}-${currentLesson.lessonNumber}`;
    const localized = resolveLessonLocalization({
      lessonId,
      grade: gradeId,
      unitNumber: currentUnit.unitNumber,
      lessonNumber: currentLesson.lessonNumber,
      titleEn: currentLesson.titleEn,
      isCoPresented: currentLesson.isCoPresented,
      isEnrichment,
    });

    const lesson: Lesson = {
      id: lessonId,
      grade: gradeId,
      unitNumber: currentUnit.unitNumber,
      lessonNumber: currentLesson.lessonNumber,
      titleEn: currentLesson.titleEn,
      titleAr: localized.titleAr,
      standards: currentLesson.standards,
      prerequisites: parsePrerequisiteGraph(currentLesson.prerequisitesRaw),
      isCoPresented: currentLesson.isCoPresented,
      isEnrichment,
      descriptionEn: currentLesson.descriptionEn,
      teacherNotes: localized.teacherNotes,
    };

    currentUnit.lessons.push(lesson);
    allLessons.push(lesson);
    currentLesson = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Check ## headings
    if (line.startsWith("## ")) {
      flushLesson();
      const headingText = line.slice(3).trim();

      if (headingText === "Overview") {
        inOverview = true;
        currentUnit = null;
        continue;
      }

      if (
        headingText === "Table of Contents" ||
        headingText === "Standards Index"
      ) {
        inOverview = false;
        currentUnit = null;
        continue;
      }

      inOverview = false;
      const unitMatch = headingText.match(/^(\d+)\.\s+(.+)$/);
      if (unitMatch) {
        const unitNumber = parseInt(unitMatch[1], 10);
        const rawUnitTitle = unitMatch[2].trim();
        const isUnitEnrichment = rawUnitTitle.endsWith("*");
        const cleanUnitTitle = isUnitEnrichment
          ? rawUnitTitle.slice(0, -1).trim()
          : rawUnitTitle;

        currentUnit = {
          grade: gradeId,
          unitNumber,
          titleEn: cleanUnitTitle,
          titleAr: UNIT_TITLES_AR[gradeId]?.[unitNumber] ?? cleanUnitTitle,
          isEnrichment: isUnitEnrichment,
          lessonRange: [0, 0],
          lessons: [],
        };
        units.push(currentUnit);
      }
      continue;
    }

    if (inOverview) {
      if (line.length > 0 && !line.startsWith("---")) {
        overviewLines.push(line);
      }
      continue;
    }

    // Check ### Lesson headings
    if (line.startsWith("### ")) {
      flushLesson();
      const lessonHeading = line.slice(4).trim();
      const lessonMatch = lessonHeading.match(/^(\d+)\.\s+(.+)$/);
      if (lessonMatch && currentUnit) {
        const lessonNumber = parseInt(lessonMatch[1], 10);
        const rawTitle = lessonMatch[2].trim();
        const isEnrichmentFromTitle = rawTitle.endsWith("*");
        const cleanTitle = isEnrichmentFromTitle
          ? rawTitle.slice(0, -1).trim()
          : rawTitle;

        currentLesson = {
          lessonNumber,
          titleEn: cleanTitle,
          isEnrichmentFromTitle,
          standards: [],
          isCoPresented: false,
          prerequisitesRaw: "",
          descriptionEn: "",
        };
      }
      continue;
    }

    if (currentLesson) {
      if (line.startsWith("- **Standards:**")) {
        const stdRaw = line.replace("- **Standards:**", "").trim();
        currentLesson.standards = stdRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (line.startsWith("- **Notes:**")) {
        const notesRaw = line.replace("- **Notes:**", "").trim();
        if (/co-presented/i.test(notesRaw)) {
          currentLesson.isCoPresented = true;
        }
      } else if (line.startsWith("- **Prerequisites:**")) {
        currentLesson.prerequisitesRaw = line
          .replace("- **Prerequisites:**", "")
          .trim();
      } else if (line.startsWith("- **Description:**")) {
        currentLesson.descriptionEn = line
          .replace("- **Description:**", "")
          .trim();
      }
    }
  }

  flushLesson();

  for (const unit of units) {
    if (unit.lessons.length > 0) {
      unit.lessonRange = [
        unit.lessons[0].lessonNumber,
        unit.lessons[unit.lessons.length - 1].lessonNumber,
      ];
    }
  }

  return {
    id: gradeId,
    labelEn: gradeId === "K" ? "Grade K" : `Grade ${gradeId}`,
    labelAr: GRADE_LABELS_AR[gradeId],
    overviewEn: overviewLines.join("\n\n"),
    units,
    lessons: allLessons,
  };
}

let cachedCatalog: CurriculumCatalog | null = null;

export function parseCurriculumFromFiles(
  files: Record<GradeId, string>
): CurriculumCatalog {
  const grades = {} as Record<GradeId, Grade>;
  const gradeList: Grade[] = [];
  const lessonMap = new Map<string, Lesson>();

  for (const gradeId of GRADE_IDS) {
    const parsedGrade = parseGradeMarkdown(gradeId, files[gradeId] ?? "");
    grades[gradeId] = parsedGrade;
    gradeList.push(parsedGrade);
    for (const lesson of parsedGrade.lessons) {
      lessonMap.set(lesson.id, lesson);
    }
  }

  return {
    grades,
    gradeList,
    getLesson(grade: GradeId, lessonNumber: number): Lesson | undefined {
      return lessonMap.get(`${grade}-${lessonNumber}`);
    },
    getLessonByCode(code: string): Lesson | undefined {
      const normalized = code
        .trim()
        .replace(/^((?:K|[1-5])-\d+)(?:\.\d+)?$/, "$1");
      return lessonMap.get(normalized);
    },
  };
}

export function parseCurriculumFromDisk(
  rootDir: string = process.cwd()
): CurriculumCatalog {
  const files = {} as Record<GradeId, string>;
  for (const gradeId of GRADE_IDS) {
    const filePath = path.join(rootDir, GRADE_FILES[gradeId]);
    files[gradeId] = fs.readFileSync(filePath, "utf-8");
  }
  return parseCurriculumFromFiles(files);
}

export function getCurriculumCatalog(): CurriculumCatalog {
  if (!cachedCatalog) {
    cachedCatalog = parseCurriculumFromDisk();
  }
  return cachedCatalog;
}
