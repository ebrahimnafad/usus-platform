import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

export const lessonK54Blueprint: LessonBlueprint = {
  lessonId: "K-54",
  grade: "K",
  lessonNumber: 54,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-54"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-54"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
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
            "اقرأ المسألة وانظر إلى النموذج، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "انظر إلى العناصر المشطوبة في النموذج، ثم اكتب الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            allowedRepresentations: ["snap-cubes", "five-frame"],
            crossOffMode: "shown",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة التعليمية وانظر إلى المكعّبات، ثم اكتب كم بقي:",
          strategyHintAr:
            "انظر إلى الكلّ والمكعّبات المشطوبة، ثم عدّ كم بقي واكتب العدد في المربّع.",
          params: {
            situation: "take-from",
            problemStyle: "learning",
            responseForm: "story-and-slot",
            representation: "snap-cubes",
            crossOffMode: "shown",
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
            "اكتب الجزء الناقص في كل رابطة أعداد، ثم صِلْها بالمسألة التعليمية المطابقة:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في رابطة الأعداد، ثم صِلْها بالمسألة التي تحمل الكلّ والجزء نفسيهما.",
          params: {
            matchingMode: "model-to-word-problem",
            operation: "subtract",
            situation: "take-from",
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
            "انظر إلى المكعّبات لكتابة المسألة، ثم اكتب معادلة الطرح لإيجاد الجزء الناقص:",
          strategyHintAr:
            "عدّ الكلّ والمكعّبات المشطوبة لكتابة المسألة، ثم اطرح لإيجاد كم بقي في المعادلة.",
          params: {
            situation: "take-from",
            problemStyle: "learning",
            responseForm: "cloze-from-model",
            representation: "snap-cubes",
            crossOffMode: "shown",
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
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "اطرح الجزء المشطوب من الكلّ، ثم اكتب الجزء الناقص بعد علامة =.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
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
            "اقرأ المسألة واشطب الجزء المأخوذ، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "اشطب الجزء المأخوذ في النموذج، ثم اكتب الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            allowedRepresentations: ["snap-cubes", "five-frame"],
            crossOffMode: "student",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة التعليمية، ثم اطرح الجزء المأخوذ من الكلّ واكتب كم بقي:",
          strategyHintAr:
            "اقرأ الكلّ والجزء المأخوذ في المسألة، ثم اطرح لإيجاد الجزء الناقص الذي بقي.",
          params: {
            situation: "take-from",
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
            "اكتب الجزء الناقص في كل رابطة أعداد، ثم صِلْها بالمسألة التعليمية المطابقة:",
          strategyHintAr:
            "اطرح الجزء المأخوذ من الكلّ لكتابة الجزء الناقص في رابطة الأعداد، ثم صِلْها بالمسألة المطابقة.",
          params: {
            matchingMode: "model-to-word-problem",
            operation: "subtract",
            situation: "take-from",
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
            "انظر إلى المكعّبات لكتابة المسألة، ثم اكتب معادلة الطرح لإيجاد الجزء الناقص:",
          strategyHintAr:
            "عدّ الكلّ والمكعّبات المشطوبة لكتابة المسألة، ثم اكتب معادلة الطرح لإيجاد كم بقي.",
          params: {
            situation: "take-from",
            problemStyle: "learning",
            responseForm: "cloze-from-model",
            representation: "snap-cubes",
            crossOffMode: "shown",
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
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء المعطى على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "اشطب الأقراص على لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة واشطب الجزء المأخوذ، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "اشطب الجزء المأخوذ في النموذج، ثم اكتب الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            allowedRepresentations: ["five-frame", "snap-cubes"],
            crossOffMode: "student",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة التعليمية، ثم اطرح الجزء المأخوذ واكتب معادلة الطرح:",
          strategyHintAr:
            "اقرأ الكلّ والجزء المأخوذ في المسألة (بما في ذلك الصفر ٠)، ثم اكتب الجزء الناقص في معادلة الطرح.",
          params: {
            situation: "take-from",
            problemStyle: "learning",
            responseForm: "equation",
            representation: "five-frame",
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
            "اكتب الجزء الناقص في كل رابطة أعداد، ثم صِلْها بالمسألة التعليمية المطابقة:",
          strategyHintAr:
            "اطرح الجزء المأخوذ من الكلّ لكتابة الجزء الناقص في رابطة الأعداد، ثم صِلْها بالمسألة المطابقة.",
          params: {
            matchingMode: "model-to-word-problem",
            operation: "subtract",
            situation: "take-from",
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
            "انظر إلى النموذج لكتابة المسألة، ثم اكتب معادلة الطرح لإيجاد الجزء الناقص:",
          strategyHintAr:
            "عدّ الكلّ والأقراص المشطوبة على لوحة الخمسة لكتابة المسألة، ثم أكمل معادلة الطرح.",
          params: {
            situation: "take-from",
            problemStyle: "learning",
            responseForm: "cloze-from-model",
            representation: "five-frame",
            crossOffMode: "shown",
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

registerLessonBlueprint(lessonK54Blueprint);

export const lessonK55Blueprint: LessonBlueprint = {
  lessonId: "K-55",
  grade: "K",
  lessonNumber: 55,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-55"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-55"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة وانظر إلى النموذج، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "انظر إلى العناصر المشطوبة في النموذج، ثم اكتب الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            representation: "snap-cubes",
            crossOffMode: "shown",
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
            "اقرأ المسألة القصصية وانظر إلى الصور، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "عدّ الكلّ والصور المشطوبة، ثم اكتب الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "model-and-bond",
            allowedRepresentations: ["everyday-object", "five-frame"],
            crossOffMode: "shown",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr: "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب كم بقي:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب في النموذج، ثم عدّ كم بقي واكتب العدد في المربّع.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "story-and-slot",
            allowedRepresentations: ["everyday-object", "snap-cubes"],
            crossOffMode: "shown",
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
            "اكتب الجزء الناقص في كل رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اطرح الجزء المأخوذ من الكلّ لكتابة الجزء الناقص في رابطة الأعداد وفي المسألة القصصية، ثم صِلْ بينهما.",
          params: {
            matchingMode: "model-to-word-problem",
            operation: "subtract",
            situation: "take-from",
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
            "انظر إلى النموذج لكتابة المسألة القصصية، ثم اطرح لإيجاد كم بقي:",
          strategyHintAr:
            "عدّ الكلّ والعناصر المشطوبة لكتابة المسألة القصصية، ثم أكمل معادلة الطرح لإيجاد كم بقي.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "everyday-object",
            crossOffMode: "shown",
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
            "اقرأ المسألة واشطب الجزء المأخوذ، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "اشطب الجزء المأخوذ في النموذج، ثم اكتب الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            representation: "snap-cubes",
            crossOffMode: "student",
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
            "اقرأ المسألة القصصية واشطب الجزء المأخوذ، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "اشطب الجزء المأخوذ في النموذج، ثم اطرح لإيجاد الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "model-and-bond",
            allowedRepresentations: ["everyday-object", "five-frame"],
            crossOffMode: "student",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr: "اقرأ المسألة القصصية، ثم اطرح الجزء المأخوذ واكتب كم بقي:",
          strategyHintAr:
            "اقرأ الكلّ والجزء المأخوذ في المسألة القصصية، ثم اطرح واكتب كم بقي في المربّع.",
          params: {
            situation: "take-from",
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
            "اكتب الجزء الناقص في كل رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اطرح الجزء المأخوذ من الكلّ لكتابة الجزء الناقص في رابطة الأعداد وفي المسألة القصصية، ثم صِلْ بينهما.",
          params: {
            matchingMode: "model-to-word-problem",
            operation: "subtract",
            situation: "take-from",
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
            "انظر إلى النموذج لكتابة المسألة القصصية، ثم اطرح لإيجاد كم بقي:",
          strategyHintAr:
            "عدّ الكلّ والعناصر المشطوبة لكتابة المسألة القصصية، ثم أكمل معادلة الطرح لإيجاد كم بقي.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "everyday-object",
            crossOffMode: "shown",
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
            "اقرأ المسألة التعليمية، ثم اطرح الجزء المأخوذ واكتب معادلة الطرح:",
          strategyHintAr:
            "اقرأ الكلّ والجزء المأخوذ في المسألة، ثم اكتب الجزء الناقص في معادلة الطرح.",
          params: {
            situation: "take-from",
            problemStyle: "learning",
            responseForm: "equation",
            representation: "five-frame",
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
            "اقرأ المسألة القصصية واشطب الجزء المأخوذ، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "اشطب الجزء المأخوذ على لوحة الخمسة أو المكعّبات، ثم اكتب الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "model-and-bond",
            allowedRepresentations: ["five-frame", "snap-cubes"],
            crossOffMode: "student",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية، ثم اطرح الجزء المأخوذ واكتب معادلة الطرح:",
          strategyHintAr:
            "اقرأ الكلّ والجزء المأخوذ في المسألة القصصية، ثم اكتب الجزء الناقص في معادلة الطرح.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "equation",
            representation: "five-frame",
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
            "اكتب الجزء الناقص في كل رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اطرح الجزء المأخوذ من الكلّ لكتابة الجزء الناقص في رابطة الأعداد وفي المسألة القصصية، ثم صِلْ بينهما.",
          params: {
            matchingMode: "model-to-word-problem",
            operation: "subtract",
            situation: "take-from",
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
            "انظر إلى النموذج لكتابة المسألة القصصية، ثم اطرح في المعادلة لإيجاد كم بقي:",
          strategyHintAr:
            "عدّ الكلّ والأقراص المشطوبة على لوحة الخمسة لكتابة المسألة القصصية، ثم أكمل معادلة الطرح.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "five-frame",
            crossOffMode: "shown",
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

registerLessonBlueprint(lessonK55Blueprint);
