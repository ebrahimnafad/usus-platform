import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

export const lessonK49Blueprint: LessonBlueprint = {
  lessonId: "K-49",
  grade: "K",
  lessonNumber: 49,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-49"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-49"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "عدّ المكعّبات المتداخلة في كل جزء، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "عدّ المكعّبات في الجزأين، ثم اكتب الكلّ في الدائرة العلوية.",
          params: {
            representation: "snap-cubes",
            responseForm: "number-bond",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة وانظر إلى المكعّبات، ثم اكتب الكلّ في رابطة الأعداد والمربّع:",
          strategyHintAr:
            "انظر إلى مكعّبات كل جزء، ثم اجمع الجزأين واكتب الكلّ.",
          params: {
            situation: "add-to",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            representation: "snap-cubes",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة التعليمية وانظر إلى المكعّبات، ثم اكتب الكلّ في المربّع:",
          strategyHintAr:
            "عدّ المكعّبات في الجزأين معاً، ثم اكتب الكلّ في المربّع.",
          params: {
            situation: "add-to",
            problemStyle: "learning",
            responseForm: "story-and-slot",
            representation: "snap-cubes",
            action: "trace",
            showModel: true,
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الكلّ في كل رابطة أعداد، ثم صِلْها بالمسألة التعليمية المطابقة:",
          strategyHintAr:
            "اجمع الجزأين في رابطة الأعداد، ثم صِلْها بالمسألة التي تحمل العددين نفسيهما.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "add-to",
            problemStyle: "learning",
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة التعليمية",
            totalRange: [2, 4],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى المكعّبات لكتابة العددين في المسألة، ثم اجمع الجزأين لإيجاد الكلّ:",
          strategyHintAr:
            "عدّ مكعّبات كل جزء واكتب العددين، ثم اجمع الجزأين لإيجاد الكلّ.",
          params: {
            situation: "add-to",
            problemStyle: "learning",
            responseForm: "cloze-from-model",
            representation: "snap-cubes",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "عدّ المكعّبات المتداخلة في كل جزء، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "اجمع مكعّبات الجزء الأيمن والجزء الأيسر، ثم اكتب الكلّ.",
          params: {
            representation: "snap-cubes",
            responseForm: "number-bond",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة وانظر إلى المكعّبات، ثم اكتب الكلّ في رابطة الأعداد والمربّع:",
          strategyHintAr:
            "انظر إلى مكعّبات كل جزء، ثم اجمع الجزأين لإيجاد الكلّ.",
          params: {
            situation: "add-to",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            representation: "snap-cubes",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة التعليمية، ثم اجمع الجزأين واكتب الكلّ في المربّع:",
          strategyHintAr:
            "اقرأ العددين في المسألة، ثم اجمع الجزأين واكتب الكلّ في المربّع.",
          params: {
            situation: "add-to",
            problemStyle: "learning",
            responseForm: "story-and-slot",
            representation: "snap-cubes",
            action: "write",
            showModel: false,
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الكلّ في كل رابطة أعداد، ثم صِلْها بالمسألة التعليمية المطابقة:",
          strategyHintAr:
            "اجمع الجزأين لكتابة الكلّ في رابطة الأعداد، ثم صِلْها بالمسألة المطابقة.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "add-to",
            problemStyle: "learning",
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة التعليمية",
            totalRange: [2, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى المكعّبات لكتابة العددين في المسألة، ثم اجمع الجزأين لإيجاد الكلّ:",
          strategyHintAr:
            "عدّ مكعّبات كل جزء واكتب العددين، ثم اجمع الجزأين لإيجاد الكلّ.",
          params: {
            situation: "add-to",
            problemStyle: "learning",
            responseForm: "cloze-from-model",
            representation: "snap-cubes",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "عدّ النقاط على بطاقة الدومينو، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "اجمع نقاط الجزأين على بطاقة الدومينو، ثم اكتب الكلّ في الدائرة العلوية.",
          params: {
            representation: "domino",
            responseForm: "number-bond",
            action: "write",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة وانظر إلى المكعّبات، ثم اكتب الكلّ في رابطة الأعداد والمربّع:",
          strategyHintAr:
            "انظر إلى مكعّبات كل جزء، ثم اجمع الجزأين لإيجاد الكلّ.",
          params: {
            situation: "add-to",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            representation: "snap-cubes",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة التعليمية، ثم اجمع الجزأين واكتب معادلة الجمع:",
          strategyHintAr:
            "اقرأ العددين في المسألة (بما في ذلك الصفر ٠)، ثم اكتب الكلّ في معادلة الجمع.",
          params: {
            situation: "add-to",
            problemStyle: "learning",
            responseForm: "equation",
            representation: "snap-cubes",
            action: "write",
            showModel: false,
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الكلّ في كل رابطة أعداد، ثم صِلْها بالمسألة التعليمية المطابقة:",
          strategyHintAr:
            "اجمع الجزأين لكتابة الكلّ في رابطة الأعداد، ثم صِلْها بالمسألة المطابقة.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "add-to",
            problemStyle: "learning",
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة التعليمية",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لكتابة العددين في المسألة، ثم اجمع الجزأين في المعادلة:",
          strategyHintAr:
            "عدّ مكعّبات كل جزء واكتب العددين، ثم اجمع الجزأين في معادلة الجمع.",
          params: {
            situation: "add-to",
            problemStyle: "learning",
            responseForm: "cloze-from-model",
            representation: "snap-cubes",
            clozeIncludeEquation: true,
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK49Blueprint);

export const lessonK50Blueprint: LessonBlueprint = {
  lessonId: "K-50",
  grade: "K",
  lessonNumber: 50,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-50"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-50"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة وانظر إلى المكعّبات، ثم اكتب الكلّ في رابطة الأعداد والمربّع:",
          strategyHintAr:
            "انظر إلى مكعّبات كل جزء، ثم اجمع الجزأين واكتب الكلّ.",
          params: {
            situation: "add-to",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            representation: "snap-cubes",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى الصور، ثم أكمل رابطة الأعداد واكتب الكلّ:",
          strategyHintAr:
            "عدّ الصور في كل جزء، ثم اجمع الجزأين واكتب الكلّ في رابطة الأعداد والمربّع.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "model-and-bond",
            allowedRepresentations: ["everyday-object", "five-frame"],
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب كم أصبح الآن:",
          strategyHintAr:
            "انظر إلى الجزأين في النموذج، ثم اجمع العددين واكتب الكلّ في المربّع.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "story-and-slot",
            allowedRepresentations: ["everyday-object", "snap-cubes"],
            action: "trace",
            showModel: true,
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الكلّ في كل رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اجمع الجزأين لكتابة الكلّ في رابطة الأعداد وفي المسألة القصصية، ثم صِلْ بينهما.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "add-to",
            problemStyle: "story",
            showProblemSlot: true,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [2, 4],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لكتابة المسألة القصصية، ثم اجمع الجزأين لإيجاد كم في الكلّ:",
          strategyHintAr:
            "عدّ العناصر في كل جزء واكتب العددين في المسألة القصصية، ثم اجمع الجزأين لإيجاد الكلّ.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "everyday-object",
            action: "trace",
            totalRange: [2, 4],
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
            "اقرأ المسألة وانظر إلى المكعّبات، ثم اكتب الكلّ في رابطة الأعداد والمربّع:",
          strategyHintAr:
            "انظر إلى مكعّبات كل جزء، ثم اجمع الجزأين لإيجاد الكلّ.",
          params: {
            situation: "add-to",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            representation: "snap-cubes",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية، ثم أكمل رابطة الأعداد واكتب كم أصبح الآن:",
          strategyHintAr:
            "انظر إلى الجزأين في المسألة القصصية والنموذج، ثم اجمع العددين واكتب الكلّ.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "model-and-bond",
            allowedRepresentations: ["everyday-object", "five-frame"],
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية، ثم اجمع الجزأين واكتب كم في الكلّ الآن:",
          strategyHintAr:
            "اقرأ العددين في المسألة القصصية، ثم اجمع الجزأين واكتب الكلّ في المربّع.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "everyday-object",
            action: "write",
            showModel: false,
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الكلّ في كل رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اجمع الجزأين لكتابة الكلّ في رابطة الأعداد وفي المسألة القصصية، ثم صِلْ بينهما.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "add-to",
            problemStyle: "story",
            showProblemSlot: true,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [2, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لكتابة المسألة القصصية، ثم اجمع الجزأين لإيجاد كم في الكلّ:",
          strategyHintAr:
            "عدّ العناصر في كل جزء واكتب العددين في المسألة القصصية، ثم اجمع الجزأين لإيجاد الكلّ.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "everyday-object",
            action: "write",
            totalRange: [2, 5],
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
            "اقرأ المسألة التعليمية، ثم اجمع الجزأين واكتب الكلّ في المربّع:",
          strategyHintAr:
            "اقرأ العددين في المسألة، ثم اجمع الجزأين لإيجاد الكلّ.",
          params: {
            situation: "add-to",
            problemStyle: "learning",
            responseForm: "story-and-slot",
            representation: "snap-cubes",
            action: "write",
            showModel: false,
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية، ثم أكمل رابطة الأعداد واكتب كم أصبح الآن:",
          strategyHintAr:
            "انظر إلى الجزأين في المسألة القصصية، ثم اجمع العددين واكتب الكلّ في رابطة الأعداد والمربّع.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "model-and-bond",
            allowedRepresentations: ["five-frame", "snap-cubes"],
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr: "اقرأ المسألة القصصية، ثم اجمع الجزأين واكتب معادلة الجمع:",
          strategyHintAr:
            "اقرأ العددين في المسألة القصصية، ثم اكتب الكلّ في معادلة الجمع.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "equation",
            representation: "everyday-object",
            action: "write",
            showModel: false,
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الكلّ في كل رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اجمع الجزأين لكتابة الكلّ في رابطة الأعداد وفي المسألة القصصية، ثم صِلْ بينهما.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "add-to",
            problemStyle: "story",
            showProblemSlot: true,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لكتابة المسألة القصصية، ثم اجمع الجزأين في معادلة الجمع:",
          strategyHintAr:
            "عدّ الأقراص في كل جزء واكتب العددين في المسألة القصصية، ثم اجمع الجزأين في المعادلة.",
          params: {
            situation: "add-to",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "five-frame",
            clozeIncludeEquation: true,
            action: "write",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK50Blueprint);
