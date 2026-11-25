/**
 * Core domain types for Reading Comprehension Club (نادي القراءة والفهم القرائي).
 */

export type ReadingLevelId =
  | "level-1"
  | "read_l1"
  | "1"
  | "level-2"
  | "read_l2"
  | "2"
  | "level-3"
  | "level-0";

export type ReadingStoryType = "standard" | "free_reading" | "transfer_test";

export type QARTier = "direct" | "inferential" | "creative";

export interface QARQuestion {
  id: string;
  tier: QARTier; // "direct" | "inferential" | "creative"
  question: string;
  prompt?: string; // alias for question
  sampleAnswer: string;
  textEvidenceSnippet: string; // Exact substring from the story text
  hint?: string;
}

export interface InductiveGrammarDiscovery {
  targetRule: string;
  examples: string[];
  observation: string;
  label: string;
  ruleLabel?: string; // alias for label
  productionPrompt: string;
}

export interface TeacherGuide {
  modelingScript: string;
  blindSpotTips: string[];
  focusWordsNote?: string;
}

export interface ReadingStory {
  id: string; // e.g. "story-1"
  storyNumber: number; // 1 to 12
  title: string;
  titleAr?: string; // alias
  type: ReadingStoryType;
  wordCount: number; // 50 to 75
  text: string;
  textAr?: string; // alias
  targetSightWords: string[];
  theme: string;
  qarQuestions: QARQuestion[];
  grammarDiscovery?: InductiveGrammarDiscovery;
  teacherGuide: TeacherGuide;
  expressionPrompt?: string;
}

export interface ReadingLevel {
  id: ReadingLevelId; // e.g. "level-1"
  levelNumber: number; // 1
  titleAr: string; // "المستوى الأول"
  subtitleAr: string; // "الانطلاق وبناء المعنى"
  descriptionAr: string;
  targetWordCount: { min: number; max: number };
  stories: ReadingStory[];
}
