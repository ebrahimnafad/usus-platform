import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

export const lessonK56Blueprint: LessonBlueprint = {
  lessonId: "K-56",
  grade: "K",
  lessonNumber: 56,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-56"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-56"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى لوحات الخمسة، ثم اكتب جميع أزواج الكلّ بإزاحة ١ في روابط الأعداد:",
          strategyHintAr:
            "انظر إلى الزوج الأوّل (الكلّ و٠)، ثم نفّذ إزاحة ١ من اليمين إلى اليسار.",
          params: {
            mode: "all-combinations",
            targetTotal: 2,
            action: "trace-first",
            showFiveFrames: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى لوحات الخمسة للكلّ ٢، ثم اكتب جميع أزواج الأجزاء بإزاحة ١:",
          strategyHintAr:
            "انظر إلى الزوج الأوّل (٢ و٠)، ثم نفّذ إزاحة ١ في كل خطوة لكتابة بقية الأزواج.",
          params: {
            mode: "all-combinations",
            targetTotal: 2,
            action: "trace-first",
            showFiveFrames: true,
          },
        },
      ],
      challenge: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "اشطب التفّاحات المعطاة في كل صف، ثم اكتب كم بقي وقارن بين الصفّين:",
          strategyHintAr:
            "اشطب التفّاحات في الصفّين، ثم عدّ كم بقي واكتب مقدار النقصان عند إزاحة ١.",
          params: {
            mode: "give-away",
            totalRange: [3, 4],
            crossOffMode: "student",
          },
        },
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى نمط إزاحة ١ في الرابطتين الأوليين، ثم اكتب الأجزاء لإكمال النمط:",
          strategyHintAr:
            "انظر إلى الزوجين الأولين، ثم اطرح ١ من الجزء الأيمن واجمع ١ إلى الجزء الأيسر.",
          params: {
            mode: "complete-pattern",
            totalRange: [2, 3],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى رابطة البداية، ثم اكتب جميع أزواج الكلّ بإزاحة ١ في روابط الأعداد:",
          strategyHintAr:
            "انظر إلى الزوج الأوّل (الكلّ و٠)، ثم نفّذ إزاحة ١ من اليمين إلى اليسار.",
          params: {
            mode: "all-combinations",
            totalRange: [3, 4],
            action: "write",
            showFiveFrames: false,
          },
        },
      ],
      practice: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى الكلّ ٣ في روابط الأعداد، ثم اكتب جميع أزواج الأجزاء بإزاحة ١:",
          strategyHintAr:
            "اكتب الزوج (٣ و٠) أولاً، ثم نفّذ إزاحة ١ في كل خطوة حتى تصل إلى (٠ و٣).",
          params: {
            mode: "all-combinations",
            targetTotal: 3,
            action: "write",
            showFiveFrames: false,
          },
        },
      ],
      challenge: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "اشطب التفّاحات المعطاة في كل صف، ثم اكتب كم بقي وقارن بين الصفّين:",
          strategyHintAr:
            "اشطب التفّاحات في الصفّين، ثم اطرح لإيجاد كم بقي وقارن بين الصفّين.",
          params: {
            mode: "give-away",
            totalRange: [4, 5],
            crossOffMode: "student",
          },
        },
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى نمط إزاحة ١ في الرابطتين الأوليين، ثم اكتب الأجزاء لإكمال النمط:",
          strategyHintAr:
            "انظر إلى الزوجين الأولين، ثم نفّذ إزاحة ١ لإكمال بقية روابط الأعداد.",
          params: {
            mode: "complete-pattern",
            totalRange: [3, 4],
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى روابط الأعداد، ثم اكتب جميع أزواج الكلّ بإزاحة ١ من اليمين إلى اليسار:",
          strategyHintAr:
            "اكتب الزوج (الكلّ و٠) أولاً، ثم نفّذ إزاحة ١ في كل خطوة حتى (٠ والكلّ).",
          params: {
            mode: "all-combinations",
            totalRange: [4, 5],
            action: "write",
            showFiveFrames: false,
          },
        },
      ],
      practice: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى الكلّ ٤ في روابط الأعداد، ثم اكتب جميع أزواج الأجزاء بإزاحة ١:",
          strategyHintAr:
            "اكتب الزوج (٤ و٠) أولاً، ثم نفّذ إزاحة ١ في كل خطوة حتى تصل إلى (٠ و٤).",
          params: {
            mode: "all-combinations",
            targetTotal: 4,
            action: "write",
            showFiveFrames: false,
          },
        },
      ],
      challenge: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "اشطب التفّاحات المعطاة في كل صف، ثم اكتب كم بقي وقارن بين الصفّين:",
          strategyHintAr:
            "اشطب التفّاحات في الصفّين، ثم اطرح لإيجاد كم بقي وقارن بين الصفّين.",
          params: {
            mode: "give-away",
            totalRange: [4, 5],
            crossOffMode: "student",
          },
        },
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى نمط إزاحة ١ في الرابطتين الأوليين، ثم اكتب الأجزاء لإكمال النمط:",
          strategyHintAr:
            "انظر إلى الزوجين الأولين، ثم نفّذ إزاحة ١ لإكمال بقية روابط الأعداد.",
          params: {
            mode: "complete-pattern",
            totalRange: [4, 5],
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK56Blueprint);

export const lessonK57Blueprint: LessonBlueprint = {
  lessonId: "K-57",
  grade: "K",
  lessonNumber: 57,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-57"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-57"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة وانظر إلى المكعّبات، ثم اكتب الجزأين في المربّعين:",
          strategyHintAr:
            "عدّ مكعّبات كلّ جزء في النموذج، ثم اكتب الجزأين في المربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "learning",
            responseForm: "story-and-slot",
            representation: "snap-cubes",
            takeApartMode: "model-fixed",
            showModel: true,
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
            "اقرأ المسألة وانظر إلى المكعّبات، ثم اكتب الجزأين في رابطة الأعداد والمربّعين:",
          strategyHintAr:
            "عدّ مكعّبات كلّ لون في النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            representation: "snap-cubes",
            takeApartMode: "model-fixed",
            action: "trace",
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
            "صِلْ كلّ رابطة أعداد بالمسألة التعليمية المطابقة للكلّ، ثم اكتب الجزأين:",
          strategyHintAr:
            "صِلْ كلّ رابطة أعداد بالمسألة التي تحمل الكلّ نفسه واكتب جزأين مناسبين.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "take-apart",
            problemStyle: "learning",
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة التعليمية",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 3,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى المكعّبات لملء جملة المسألة، ثم اكتب معادلة الجمع:",
          strategyHintAr:
            "عدّ مكعّبات كلّ جزء لملء الجملة، ثم اجمع الجزأين لكتابة الكلّ في المعادلة.",
          params: {
            situation: "take-apart",
            problemStyle: "learning",
            responseForm: "cloze-from-model",
            representation: "snap-cubes",
            takeApartMode: "model-fixed",
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
            "اقرأ المسألة وانظر إلى المكعّبات، ثم اكتب الجزأين في المربّعين:",
          strategyHintAr:
            "عدّ مكعّبات كلّ لون في النموذج، ثم اكتب الجزأين في المربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "learning",
            responseForm: "story-and-slot",
            representation: "snap-cubes",
            takeApartMode: "model-fixed",
            showModel: true,
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
            "اقرأ المسألة وانظر إلى النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            allowedRepresentations: ["snap-cubes", "five-frame"],
            takeApartMode: "model-fixed",
            action: "write",
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
            "صِلْ كلّ رابطة أعداد بالمسألة التعليمية المطابقة للكلّ، ثم اكتب الجزأين:",
          strategyHintAr:
            "صِلْ كلّ رابطة أعداد بالمسألة التي تحمل الكلّ نفسه واكتب جزأين مناسبين.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "take-apart",
            problemStyle: "learning",
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة التعليمية",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 3,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى المكعّبات لملء جملة المسألة، ثم اكتب معادلة الجمع:",
          strategyHintAr:
            "عدّ مكعّبات كلّ جزء لملء الجملة، ثم اجمع الجزأين لكتابة الكلّ في المعادلة.",
          params: {
            situation: "take-apart",
            problemStyle: "learning",
            responseForm: "cloze-from-model",
            representation: "snap-cubes",
            takeApartMode: "model-fixed",
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
            "اقرأ المسألة التعليمية لتحديد الكلّ، ثم اكتب كم يمكن أن يكون في كلّ جزء:",
          strategyHintAr: "اختر أيّ جزأين يساويان الكلّ واكتبهما في المربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "learning",
            responseForm: "story-and-slot",
            representation: "five-frame",
            takeApartMode: "open-ended",
            showModel: false,
            action: "write",
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
            "اقرأ المسألة وانظر إلى النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "learning",
            responseForm: "model-and-bond",
            allowedRepresentations: ["five-frame", "snap-cubes"],
            takeApartMode: "model-fixed",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SolveWordProblem",
          promptAr: "انظر إلى النموذج لملء جملة المسألة، ثم اكتب معادلة الجمع:",
          strategyHintAr:
            "عدّ أقراص كلّ جزء على لوحة الخمسة لملء الجملة، ثم اجمع الجزأين في المعادلة.",
          params: {
            situation: "take-apart",
            problemStyle: "learning",
            responseForm: "cloze-from-model",
            representation: "five-frame",
            takeApartMode: "model-fixed",
            clozeIncludeEquation: true,
            equationLayout: "total-first",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 1,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ رابطة أعداد بالمسألة التعليمية المطابقة للكلّ، ثم اكتب الجزأين:",
          strategyHintAr:
            "صِلْ كلّ رابطة أعداد بالمسألة التي تحمل الكلّ نفسه واكتب جزأين مناسبين.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "take-apart",
            problemStyle: "learning",
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة التعليمية",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 3,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK57Blueprint);

export const lessonK58Blueprint: LessonBlueprint = {
  lessonId: "K-58",
  grade: "K",
  lessonNumber: 58,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-58"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-58"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى الصور، ثم اكتب الجزأين في المربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في الصور، ثم اكتب الجزأين في المربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "everyday-object",
            takeApartMode: "model-fixed",
            showModel: true,
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
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "model-and-bond",
            allowedRepresentations: ["everyday-object", "five-frame"],
            takeApartMode: "model-fixed",
            action: "trace",
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
            "صِلْ كلّ رابطة أعداد بالمسألة القصصية المطابقة للكلّ، ثم اكتب الجزأين:",
          strategyHintAr:
            "صِلْ كلّ رابطة أعداد بالقصة التي تحمل الكلّ نفسه واكتب جزأين مناسبين.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "take-apart",
            problemStyle: "story",
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 3,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لملء المسألة القصصية، ثم اكتب معادلة الجمع:",
          strategyHintAr:
            "عدّ العناصر في كلّ جزء لملء القصة، ثم اجمع الجزأين لكتابة الكلّ في المعادلة.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "everyday-object",
            takeApartMode: "model-fixed",
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
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب الجزأين في المربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في المربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "everyday-object",
            takeApartMode: "model-fixed",
            showModel: true,
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
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "model-and-bond",
            allowedRepresentations: ["everyday-object", "five-frame"],
            takeApartMode: "model-fixed",
            action: "write",
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
            "صِلْ كلّ رابطة أعداد بالمسألة القصصية المطابقة للكلّ، ثم اكتب الجزأين:",
          strategyHintAr:
            "صِلْ كلّ رابطة أعداد بالقصة التي تحمل الكلّ نفسه واكتب جزأين مناسبين.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "take-apart",
            problemStyle: "story",
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 3,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لملء المسألة القصصية، ثم اكتب معادلة الجمع:",
          strategyHintAr:
            "عدّ العناصر في كلّ جزء لملء القصة، ثم اجمع الجزأين لكتابة الكلّ في المعادلة.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "everyday-object",
            takeApartMode: "model-fixed",
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
            "اقرأ المسألة القصصية لتحديد الكلّ، ثم اكتب كم يمكن أن يكون في كلّ جزء:",
          strategyHintAr: "اختر أيّ جزأين يساويان الكلّ واكتبهما في المربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "five-frame",
            takeApartMode: "open-ended",
            showModel: false,
            action: "write",
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
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "model-and-bond",
            allowedRepresentations: ["five-frame", "snap-cubes"],
            takeApartMode: "model-fixed",
            action: "write",
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
            "صِلْ كلّ رابطة أعداد بالمسألة القصصية المطابقة للكلّ، ثم اكتب الجزأين:",
          strategyHintAr:
            "صِلْ كلّ رابطة أعداد بالقصة التي تحمل الكلّ نفسه واكتب جزأين مناسبين.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "take-apart",
            problemStyle: "story",
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 3,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لملء المسألة القصصية، ثم اكتب معادلة الجمع:",
          strategyHintAr:
            "عدّ أقراص كلّ جزء على لوحة الخمسة لملء القصة، ثم اجمع الجزأين في المعادلة.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "five-frame",
            takeApartMode: "model-fixed",
            clozeIncludeEquation: true,
            equationLayout: "total-first",
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

registerLessonBlueprint(lessonK58Blueprint);
