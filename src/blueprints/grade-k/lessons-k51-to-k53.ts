import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

export const lessonK51Blueprint: LessonBlueprint = {
  lessonId: "K-51",
  grade: "K",
  lessonNumber: 51,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-51"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-51"].teacherNotes,
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
            "اقرأ المسألة وانظر إلى المكعّبات، ثم أكمل رابطة الأعداد واكتب الكلّ:",
          strategyHintAr:
            "عدّ مكعّبات الجزء الأوّل والجزء الثاني، ثم اجمع الجزأين واكتب الكلّ.",
          params: {
            situation: "put-together",
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
            "اقرأ المسألة التعليمية وانظر إلى المكعّبات، ثم اكتب كم في الكلّ:",
          strategyHintAr:
            "عدّ المكعّبات في الجزأين معاً، ثم اكتب الكلّ في المربّع.",
          params: {
            situation: "put-together",
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
            situation: "put-together",
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
            "انظر إلى المكعّبات لكتابة المسألة، ثم اكتب معادلة الجمع لإيجاد الكلّ:",
          strategyHintAr:
            "عدّ مكعّبات كل جزء واكتب العددين، ثم اجمع الجزأين في معادلة الجمع.",
          params: {
            situation: "put-together",
            problemStyle: "learning",
            responseForm: "cloze-from-model",
            representation: "snap-cubes",
            clozeIncludeEquation: true,
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
            "اقرأ المسألة وانظر إلى المكعّبات، ثم أكمل رابطة الأعداد واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى مكعّبات كل جزء، ثم اجمع الجزأين لإيجاد الكلّ.",
          params: {
            situation: "put-together",
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
            "اقرأ المسألة التعليمية، ثم اجمع الجزأين واكتب كم في الكلّ:",
          strategyHintAr:
            "اقرأ العددين في المسألة، ثم اجمع الجزأين واكتب الكلّ في المربّع.",
          params: {
            situation: "put-together",
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
            situation: "put-together",
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
            "انظر إلى المكعّبات لكتابة المسألة، ثم اكتب معادلة الجمع لإيجاد الكلّ:",
          strategyHintAr:
            "عدّ مكعّبات كل جزء واكتب العددين، ثم اجمع الجزأين في معادلة الجمع.",
          params: {
            situation: "put-together",
            problemStyle: "learning",
            responseForm: "cloze-from-model",
            representation: "snap-cubes",
            clozeIncludeEquation: true,
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
            "اقرأ المسألة وانظر إلى المكعّبات، ثم أكمل رابطة الأعداد واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى مكعّبات كل جزء، ثم اجمع الجزأين لإيجاد الكلّ.",
          params: {
            situation: "put-together",
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
            "اقرأ العددين في المسألة، ثم اكتب الكلّ في معادلة الجمع.",
          params: {
            situation: "put-together",
            problemStyle: "learning",
            responseForm: "equation",
            representation: "snap-cubes",
            action: "write",
            showModel: false,
            totalRange: [3, 5],
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
            situation: "put-together",
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
            "انظر إلى النموذج لكتابة المسألة، ثم اكتب معادلة الجمع لإيجاد الكلّ:",
          strategyHintAr:
            "عدّ مكعّبات كل جزء واكتب العددين، ثم اجمع الجزأين في معادلة الجمع.",
          params: {
            situation: "put-together",
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

registerLessonBlueprint(lessonK51Blueprint);

export const lessonK52Blueprint: LessonBlueprint = {
  lessonId: "K-52",
  grade: "K",
  lessonNumber: 52,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-52"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-52"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة وانظر إلى المكعّبات، ثم أكمل رابطة الأعداد واكتب الكلّ:",
          strategyHintAr:
            "عدّ مكعّبات الجزء الأوّل والجزء الثاني، ثم اجمع الجزأين واكتب الكلّ.",
          params: {
            situation: "put-together",
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
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم أكمل رابطة الأعداد واكتب الكلّ:",
          strategyHintAr:
            "عدّ العناصر في كل جزء، ثم اجمع الجزأين واكتب الكلّ في رابطة الأعداد والمربّع.",
          params: {
            situation: "put-together",
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
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب كم في الكلّ:",
          strategyHintAr:
            "انظر إلى الجزأين في النموذج، ثم اجمع العددين واكتب الكلّ في المربّع.",
          params: {
            situation: "put-together",
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
            situation: "put-together",
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
            "انظر إلى النموذج لكتابة المسألة القصصية، ثم اكتب معادلة الجمع لإيجاد الكلّ:",
          strategyHintAr:
            "عدّ العناصر في كل جزء واكتب العددين، ثم اجمع الجزأين في معادلة الجمع.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "everyday-object",
            clozeIncludeEquation: true,
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
            "اقرأ المسألة وانظر إلى المكعّبات، ثم أكمل رابطة الأعداد واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى مكعّبات كل جزء، ثم اجمع الجزأين لإيجاد الكلّ.",
          params: {
            situation: "put-together",
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
            "اقرأ المسألة القصصية، ثم أكمل رابطة الأعداد واكتب كم في الكلّ:",
          strategyHintAr:
            "انظر إلى الجزأين في المسألة القصصية والنموذج، ثم اجمع العددين واكتب الكلّ.",
          params: {
            situation: "put-together",
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
          promptAr: "اقرأ المسألة القصصية، ثم اجمع الجزأين واكتب كم في الكلّ:",
          strategyHintAr:
            "اقرأ العددين في المسألة القصصية، ثم اجمع الجزأين واكتب الكلّ في المربّع.",
          params: {
            situation: "put-together",
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
            situation: "put-together",
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
            "انظر إلى النموذج لكتابة المسألة القصصية، ثم اكتب معادلة الجمع لإيجاد الكلّ:",
          strategyHintAr:
            "عدّ العناصر في كل جزء واكتب العددين، ثم اجمع الجزأين في معادلة الجمع.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "everyday-object",
            clozeIncludeEquation: true,
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
            "اقرأ المسألة التعليمية، ثم اجمع الجزأين واكتب كم في الكلّ:",
          strategyHintAr:
            "اقرأ العددين في المسألة، ثم اجمع الجزأين لإيجاد الكلّ.",
          params: {
            situation: "put-together",
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
            "اقرأ المسألة القصصية، ثم أكمل رابطة الأعداد واكتب كم في الكلّ:",
          strategyHintAr:
            "انظر إلى الجزأين في المسألة القصصية، ثم اجمع العددين واكتب الكلّ في رابطة الأعداد والمربّع.",
          params: {
            situation: "put-together",
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
            situation: "put-together",
            problemStyle: "story",
            responseForm: "equation",
            representation: "everyday-object",
            action: "write",
            showModel: false,
            totalRange: [3, 5],
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
            situation: "put-together",
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
            situation: "put-together",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "five-frame",
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

registerLessonBlueprint(lessonK52Blueprint);

export const lessonK53Blueprint: LessonBlueprint = {
  lessonId: "K-53",
  grade: "K",
  lessonNumber: 53,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-53"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-53"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى الصور، ثم أكمل رابطة الأعداد واكتب الكلّ:",
          strategyHintAr:
            "عدّ الصور في كل جزء، ثم اجمع الجزأين واكتب الكلّ في رابطة الأعداد والمربّع.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "everyday-object",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة الخمسة لعدّ كل جزء، ثم اكتب الجزأين والكلّ في الجدول:",
          strategyHintAr:
            "انظر إلى الأقراص في كل جزء على لوحة الخمسة، ثم اجمع الجزأين واكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "عدّ كل جزء على لوحة الخمسة، ثم اكتب كم في الكلّ في معادلة الجمع:",
          strategyHintAr:
            "انظر إلى الجزأين على لوحة الخمسة، ثم اجمع العددين واكتب الكلّ في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          promptAr:
            "عدّ كل شكل في الصندوق لملء جدول الأجزاء والكلّ، ثم أجب عن السؤال:",
          strategyHintAr:
            "عدّ عناصر كل جزء على حدة، ثم اجمع الجزأين لكتابة الكلّ والمقارنة بينهما.",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [1, 3],
            candidateShapeIds: ["circle", "square"],
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "عدّ المجسّمات في كل جزء، ثم اكتب معادلة الجمع لإيجاد الكلّ:",
          strategyHintAr:
            "عدّ المجسّمات في الجزء الأوّل والجزء الثاني، ثم اجمع الجزأين في المعادلة.",
          params: {
            representation: "pictures",
            pictureSubkind: "solid-shapes",
            responseForm: "equation",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية، ثم أكمل رابطة الأعداد واكتب كم في الكلّ:",
          strategyHintAr:
            "انظر إلى الجزأين في المسألة القصصية والنموذج، ثم اجمع العددين واكتب الكلّ.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "five-frame",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة الخمسة لعدّ كل جزء، ثم اكتب الكلّ في الجدول:",
          strategyHintAr:
            "انظر إلى الأقراص في كل جزء على لوحة الخمسة دون عدّ فردي، ثم اكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "عدّ كل جزء على لوحة الخمسة، ثم اكتب كم في الكلّ في معادلة الجمع:",
          strategyHintAr:
            "اجمع الجزء الأوّل والجزء الثاني على لوحة الخمسة، ثم اكتب الكلّ في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          promptAr:
            "عدّ كل شكل في الصندوق لملء جدول الأجزاء والكلّ، ثم أجب عن السؤال:",
          strategyHintAr:
            "عدّ عناصر كل جزء في الصندوق، ثم اجمع الجزأين لكتابة الكلّ والمقارنة بينهما.",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateShapeIds: ["triangle", "square", "circle"],
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "عدّ المجسّمات في كل جزء، ثم اكتب معادلة الجمع لإيجاد الكلّ:",
          strategyHintAr:
            "عدّ المجسّمات في الجزء الأوّل والجزء الثاني، ثم اجمع الجزأين في المعادلة.",
          params: {
            representation: "pictures",
            pictureSubkind: "solid-shapes",
            responseForm: "equation",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr: "اقرأ المسألة القصصية، ثم اجمع الجزأين واكتب كم في الكلّ:",
          strategyHintAr:
            "اقرأ العددين في المسألة القصصية، ثم اجمع الجزأين واكتب الكلّ في المربّع.",
          params: {
            situation: "put-together",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "everyday-object",
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
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة الخمسة لعدّ كل جزء، ثم اكتب الكلّ في الجدول:",
          strategyHintAr:
            "انظر إلى الأقراص والخانات في لوحة الخمسة، ثم اجمع الجزأين واكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم أقراص الجزء الثاني على لوحة الخمسة، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "لوّن أقراص الجزء الثاني على لوحة الخمسة، ثم اجمع الجزأين واكتب الكلّ في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          promptAr:
            "عدّ كل مجسّم في الصندوق لملء جدول الأجزاء والكلّ، ثم أجب عن السؤال:",
          strategyHintAr:
            "عدّ المجسّمات في كل جزء، ثم اجمع الجزأين لكتابة الكلّ والمقارنة بينهما.",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateSolidIds: ["cube", "cylinder", "cone", "sphere"],
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "عدّ المجسّمات في كل جزء، ثم اكتب معادلة الجمع لإيجاد الكلّ:",
          strategyHintAr:
            "عدّ المجسّمات في الجزء الأوّل والجزء الثاني، ثم اجمع الجزأين في المعادلة.",
          params: {
            representation: "pictures",
            pictureSubkind: "solid-shapes",
            responseForm: "equation",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK53Blueprint);
