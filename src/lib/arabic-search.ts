import type { Lesson, Unit } from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";

const EASTERN_DIGITS = "٠١٢٣٤٥٦٧٨٩";

const TASHKEEL_AND_TATWEEL = /[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g;
const ALEF_FORMS = /[أإآٱ]/g;
const ALEF_MAQSURA = /ى/g;
const TAA_MARBUTA = /ة/g;
const HAMZA_ON_WAW = /ؤ/g;
const HAMZA_ON_YAA = /ئ/g;

function easternDigitToWestern(ch: string): string {
  const index = EASTERN_DIGITS.indexOf(ch);
  return index >= 0 ? String(index) : ch;
}

/**
 * Normalizes Arabic the way teachers actually type it: no tashkeel, no
 * tatweel, unified alef/yaa/taa-marbuta forms, and interchangeable numerals.
 */
export function normalizeArabicSearchText(input: string): string {
  return input
    .replace(TASHKEEL_AND_TATWEEL, "")
    .replace(ALEF_FORMS, "ا")
    .replace(ALEF_MAQSURA, "ي")
    .replace(TAA_MARBUTA, "ه")
    .replace(HAMZA_ON_WAW, "و")
    .replace(HAMZA_ON_YAA, "ي")
    .replace(/[٠-٩]/g, easternDigitToWestern)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Standard codes are compared without dots or spaces: `KG4` matches `K.G.4`. */
export function normalizeStandardCode(input: string): string {
  return normalizeArabicSearchText(input).replace(/[.\s]/g, "").toUpperCase();
}

export interface LessonSearchMatch {
  titleAr: boolean;
  titleEn: boolean;
  lessonId: boolean;
  lessonNumber: boolean;
  standards: boolean;
}

export function matchLessonSearch(
  lesson: Lesson,
  query: string
): LessonSearchMatch {
  const normalizedQuery = normalizeArabicSearchText(query);
  const normalizedTitleAr = normalizeArabicSearchText(lesson.titleAr);
  const normalizedTitleEn = normalizeArabicSearchText(lesson.titleEn);
  const normalizedId = normalizeArabicSearchText(lesson.id);
  const numericQuery = /^\d+$/.test(normalizedQuery) ? normalizedQuery : null;
  const lessonNumber = String(lesson.lessonNumber);
  const standardQuery = normalizeStandardCode(query);

  return {
    titleAr:
      normalizedQuery.length > 0 && normalizedTitleAr.includes(normalizedQuery),
    titleEn:
      normalizedQuery.length > 0 && normalizedTitleEn.includes(normalizedQuery),
    lessonId:
      normalizedQuery.length > 0 && normalizedId.includes(normalizedQuery),
    lessonNumber:
      numericQuery !== null &&
      (lessonNumber === numericQuery || lessonNumber.startsWith(numericQuery)),
    standards:
      standardQuery.length > 0 &&
      lesson.standards.some((standard) =>
        normalizeStandardCode(standard).includes(standardQuery)
      ),
  };
}

export function unitMatchesSearch(unit: Unit, query: string): boolean {
  const normalizedQuery = normalizeArabicSearchText(query);
  if (!normalizedQuery) return true;
  return (
    normalizeArabicSearchText(unit.titleAr).includes(normalizedQuery) ||
    normalizeArabicSearchText(unit.titleEn).includes(normalizedQuery)
  );
}

/**
 * Filters one grade's catalogue. A unit-title hit keeps the whole unit so the
 * teacher retains context; otherwise only matching lessons survive.
 */
export function filterUnitsForStudioSearch(
  units: readonly Unit[],
  query: string
): Unit[] {
  const trimmed = query.trim();
  if (!trimmed) return [...units];

  const filtered: Unit[] = [];
  for (const unit of units) {
    if (unitMatchesSearch(unit, trimmed)) {
      filtered.push({ ...unit, lessons: [...unit.lessons] });
      continue;
    }
    const matchedLessons = unit.lessons.filter((lesson) => {
      const match = matchLessonSearch(lesson, trimmed);
      return (
        match.titleAr ||
        match.titleEn ||
        match.lessonId ||
        match.lessonNumber ||
        match.standards
      );
    });
    if (matchedLessons.length > 0) {
      filtered.push({ ...unit, lessons: matchedLessons });
    }
  }
  return filtered;
}

export interface SearchResultSummary {
  lessonCount: number;
  unitCount: number;
  labelAr: string;
}

function pluralise(
  count: number,
  forms: { one: string; two: string; few: string; many: string }
): string {
  if (count === 1) return forms.one;
  if (count === 2) return forms.two;
  if (count >= 3 && count <= 10) {
    return `${formatEasternNumber(count)} ${forms.few}`;
  }
  return `${formatEasternNumber(count)} ${forms.many}`;
}

export function formatLessonCountAr(count: number): string {
  return pluralise(count, {
    one: "درس واحد",
    two: "درسان",
    few: "دروس",
    many: "درساً",
  });
}

export function formatUnitCountAr(count: number): string {
  return pluralise(count, {
    one: "وحدة واحدة",
    two: "وحدتان",
    few: "وحدات",
    many: "وحدة",
  });
}

export function summariseSearchResults(
  filteredUnits: readonly Unit[]
): SearchResultSummary {
  const lessonCount = filteredUnits.reduce(
    (total, unit) => total + unit.lessons.length,
    0
  );
  const unitCount = filteredUnits.length;
  return {
    lessonCount,
    unitCount,
    labelAr: `${formatLessonCountAr(lessonCount)} في ${formatUnitCountAr(
      unitCount
    )}`,
  };
}

export interface HighlightSegment {
  text: string;
  matched: boolean;
}

/**
 * Marks the words in a title that carry the match. Ambiguous multi-word hits
 * fall back to the whole title rather than inventing a false fragment.
 */
export function highlightArabicMatch(
  text: string,
  query: string
): HighlightSegment[] {
  const normalizedQuery = normalizeArabicSearchText(query);
  if (!normalizedQuery) return [{ text, matched: false }];

  const tokens = text.split(/(\s+)/);
  let matchedToken = false;
  const segments = tokens.map((token) => {
    if (!token.trim()) return { text: token, matched: false };
    const matched = normalizeArabicSearchText(token).includes(normalizedQuery);
    if (matched) matchedToken = true;
    return { text: token, matched };
  });

  if (matchedToken) return segments;
  if (normalizeArabicSearchText(text).includes(normalizedQuery)) {
    return [{ text, matched: true }];
  }
  return [{ text, matched: false }];
}
