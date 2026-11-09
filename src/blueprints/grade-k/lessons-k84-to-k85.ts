import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lesson K-84: Add-To Result-Unknown Story Problems (to 10, K.OA.2)
// ============================================================================
export const lessonK84Blueprint: LessonBlueprint = {
  lessonId: "K-84",
  grade: "K",
  lessonNumber: 84,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-84"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-84"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم تتبّع الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "اقرأ الجزأين في القصة، ثم عدّ الأقراص في لوحة العشرة وتتبّع الكلّ في رابطة الأعداد.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            action: "trace",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم تتبّع الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص في لوحة العشرة (الصفّ العلوي المكتمل يعني ٥)، ثم اكتب الكلّ في رابطة الأعداد والمربّع.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            action: "trace",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم اكتب الكلّ في المربّع:",
          strategyHintAr:
            "انظر إلى الجزأين في لوحة العشرة، ثم اكتب الكلّ في المربّع.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "ten-frame",
            action: "trace",
            showModel: true,
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الكلّ في كلّ رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اجمع الجزأين لكتابة الكلّ في رابطة الأعداد وفي المسألة القصصية، ثم صِلْ بينهما بخط.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "add-to",
            problemStyle: "story",
            showProblemSlot: true,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [6, 8],
            minPart: 1,
            pairCount: 1,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى لوحة العشرة، ثم أكمل المسألة القصصية ومعادلة الجمع:",
          strategyHintAr:
            "اكتب عددي الجزأين في المسألة القصصية، ثم اجمع الجزأين واكتب الكلّ في معادلة الجمع.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "ten-frame",
            clozeIncludeEquation: true,
            action: "write",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "اقرأ الجزء الأوّل والجزء الثاني في القصة، ثم اجمعهما واكتب الكلّ في رابطة الأعداد.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            action: "write",
            totalRange: [6, 9],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الجزأين على لوحة العشرة (الصفّ العلوي المكتمل يعني ٥)، ثم اجمعهما واكتب الكلّ في رابطة الأعداد والمربّع.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم اجمع الجزأين واكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "اجمع الجزء الممثّل بأقراص لوحة العشرة مع الجزء الآخر في القصة، ثم اكتب الكلّ في معادلة الجمع.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "equation",
            representation: "ten-frame",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الكلّ في كلّ رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اجمع الجزأين لكتابة الكلّ في رابطة الأعداد وفي المسألة القصصية، ثم صِلْ بينهما بخط.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "add-to",
            problemStyle: "story",
            showProblemSlot: true,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى لوحة العشرة، ثم أكمل المسألة القصصية ومعادلة الجمع:",
          strategyHintAr:
            "اكتب عددي الجزأين من لوحة العشرة في المسألة القصصية، ثم اكتب الكلّ في معادلة الجمع.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "ten-frame",
            clozeIncludeEquation: true,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الجزأين على لوحة العشرة، ثم اكتب الكلّ دون عدّ فردي (الصفّ العلوي كامل فهو ٥).",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            action: "write",
            totalRange: [7, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية، ثم اكتب الكلّ في رابطة الأعداد دون النظر إلى النموذج:",
          strategyHintAr:
            "اقرأ الجزأين في القصة وتخيّلهما على لوحة العشرة، ثم اجمعهما واكتب الكلّ في رابطة الأعداد وارسم للتحقّق.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            showModel: false,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية، ثم اجمع الجزأين واكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "اجمع الجزأين في ذهنك على لوحة العشرة، ثم اكتب الكلّ في المعادلة.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "equation",
            representation: "ten-frame",
            showModel: false,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الكلّ في كلّ رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اجمع الجزأين لكتابة الكلّ في رابطة الأعداد وفي المسألة القصصية، ثم صِلْ بينهما بخط.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "add-to",
            problemStyle: "story",
            showProblemSlot: true,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى لوحة العشرة، ثم أكمل المسألة القصصية ومعادلة الجمع:",
          strategyHintAr:
            "اكتب عددي الجزأين من لوحة العشرة في المسألة القصصية، ثم اكتب الكلّ في معادلة الجمع.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "ten-frame",
            clozeIncludeEquation: true,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK84Blueprint);

// ============================================================================
// Lesson K-85: Put-Together Total-Unknown Story Problems (to 10, K.OA.2)
// ============================================================================
export const lessonK85Blueprint: LessonBlueprint = {
  lessonId: "K-85",
  grade: "K",
  lessonNumber: 85,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-85"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-85"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم تتبّع الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الجزأين بلونين على لوحة العشرة، ثم تتبّع الكلّ في رابطة الأعداد.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            action: "trace",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم تتبّع الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الجزأين بلونين على لوحة العشرة، ثم تتبّع الكلّ في رابطة الأعداد والمربّع.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            action: "trace",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم اكتب الكلّ في المربّع:",
          strategyHintAr:
            "انظر إلى الجزأين بلونين على لوحة العشرة، ثم اكتب الكلّ في المربّع.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "ten-frame",
            action: "trace",
            showModel: true,
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب ما ينقص في كلّ رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اجمع الجزأين أو اطرح من الكلّ، ثم صِلْ كلَّ رابطة بمسألتها المطابقة.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "put-together",
            problemStyle: "story",
            showProblemSlot: true,
            wordProblemMissingPositions: ["total", "part2"],
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [6, 8],
            minPart: 1,
            pairCount: 1,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى لوحة العشرة، ثم أكمل المسألة القصصية ومعادلة الجمع:",
          strategyHintAr:
            "اكتب عددي الجزأين في المسألة القصصية، ثم اجمع الجزأين واكتب الكلّ في معادلة الجمع.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "ten-frame",
            action: "write",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الجزأين بلونين على لوحة العشرة، ثم اجمعهما واكتب الكلّ في رابطة الأعداد.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            action: "write",
            totalRange: [6, 9],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الجزأين بلونين على لوحة العشرة (الصفّ العلوي المكتمل يعني ٥)، ثم اجمعهما واكتب الكلّ في رابطة الأعداد والمربّع.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم اجمع الجزأين واكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "اجمع الجزأين الممثّلين بأقراص لوحة العشرة، ثم اكتب الكلّ في معادلة الجمع.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "equation",
            representation: "ten-frame",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب ما ينقص في كلّ رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اجمع الجزأين أو اطرح من الكلّ، ثم صِلْ كلَّ رابطة بمسألتها المطابقة.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "put-together",
            problemStyle: "story",
            showProblemSlot: true,
            wordProblemMissingPositions: ["total", "part2"],
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى لوحة العشرة، ثم أكمل المسألة القصصية ومعادلة الجمع:",
          strategyHintAr:
            "اكتب عددي الجزأين من لوحة العشرة في المسألة القصصية، ثم اكتب الكلّ في معادلة الجمع.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "ten-frame",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الجزأين بلونين على لوحة العشرة، ثم اكتب الكلّ دون عدّ فردي (الصفّ العلوي كامل فهو ٥).",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            action: "write",
            totalRange: [7, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية، ثم اكتب الكلّ في رابطة الأعداد دون النظر إلى النموذج:",
          strategyHintAr:
            "اقرأ الجزءَين في القصة وتخيّلهما على لوحة العشرة، ثم اجمعهما واكتب الكلّ في رابطة الأعداد وارسم للتحقّق.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            showModel: false,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية، ثم اجمع الجزأين واكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "اجمع الجزأين في ذهنك على لوحة العشرة، ثم اكتب الكلّ في المعادلة.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "equation",
            representation: "ten-frame",
            showModel: false,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب ما ينقص في كلّ رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اجمع الجزأين أو اطرح من الكلّ، ثم صِلْ كلَّ رابطة بمسألتها المطابقة.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "put-together",
            problemStyle: "story",
            showProblemSlot: true,
            wordProblemMissingPositions: ["total", "part2"],
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى لوحة العشرة، ثم أكمل المسألة القصصية ومعادلة الجمع:",
          strategyHintAr:
            "اكتب عددي الجزأين من لوحة العشرة في المسألة القصصية، ثم اكتب الكلّ في معادلة الجمع.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "ten-frame",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK85Blueprint);
