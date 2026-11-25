import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lessons K-113 to K-115 — Grade K Unit 10 (Numbers to 100):
// Numbers to 50: Ten-Frame Grids, Counting by 10s/1s, and Decade Subitizing
// ============================================================================

// ============================================================================
// Lesson K-113: Numbers to 50 - Count All by 10s (K.CC.1)
// ============================================================================
export const lessonK113Blueprint: LessonBlueprint = {
  lessonId: "K-113",
  grade: "K",
  lessonNumber: 113,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-113"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-113"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتَي العشرة الرأسيتين، ثم اكتب الكلّ في رابط العدد:",
          strategyHintAr:
            "انظر إلى اللوحة اليمنى الكاملة (١٠) واللوحة اليسرى التي تحمل الآحاد، ثم اكتب الكلّ في دائرة الكلّ.",
          params: {
            subitizeMode: "decompose-teen",
            drawModel: "vertical-ten-frame",
            candidateCounts: [11, 12, 13, 14, 15],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ مجموعات العشرة في شبكة لوحات العشرة، ثم اكتب الكلّ:",
          strategyHintAr:
            "عدّ اللوحات الكاملة بالعشرات من اليمين إلى اليسار (١٠، ٢٠، ٣٠) ثم اكتب العدد.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr: "انظر إلى اللوحات الكاملة، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى اللوحات الكاملة (كل لوحة تساوي ١٠)، ثم انطق اللقب العشري واكتب العدد.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "CountGridItems",
          promptAr: "انظر إلى شبكة الفواكه، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى الصفوف الكاملة (كل صفّ يحتوي على ١٠ فواكه)، ثم عدّ الصفوف بالعشرات (١٠، ٢٠، ٣٠).",
          params: {
            iconType: "fruit",
            rows: 3,
            cols: 10,
            candidateCounts: [10, 20, 30],
            gridCount: 2,
            directionNoteAr:
              "عدّ الصفوف الكاملة بالعشرات لتعرف عدد الفواكه الكلّي.",
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى مجموعتَي المجسّمات، ثم اكتب عدد كلّ مجموعة وكم تزيد إحداهما على الأخرى:",
          strategyHintAr:
            "انظر إلى الأزواج المتقابلة أولاً، ثم عدّ المجسّمات الإضافية لتعرف كم أكثر أو كم أقل.",
          params: {
            compareMode: "find-difference",
            visualKind: "linear-comparison",
            iconSetKind: "solids-3d",
            numberRange: [3, 8],
            itemCount: 1,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتَي العشرة الرأسيتين، ثم اكتب الكلّ في رابط العدد:",
          strategyHintAr:
            "انظر إلى اللوحة اليمنى الكاملة (١٠) واللوحة اليسرى التي تحمل الآحاد، ثم اكتب الكلّ في دائرة الكلّ.",
          params: {
            subitizeMode: "decompose-teen",
            drawModel: "vertical-ten-frame",
            candidateCounts: [11, 12, 13, 14, 15],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ مجموعات العشرة في شبكة لوحات العشرة، ثم اكتب الكلّ:",
          strategyHintAr:
            "عدّ اللوحات الكاملة بالعشرات من اليمين إلى اليسار (١٠، ٢٠، ٣٠، ٤٠، ٥٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30, 40, 50],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr: "انظر إلى اللوحات الكاملة، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr:
            "عدّ بالعدّ القفزي بالعشرات (عشرة، عشرون، ثلاثون، أربعون، خمسون).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [20, 30, 40, 50],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "CountGridItems",
          promptAr: "انظر إلى شبكة الفواكه، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr:
            "عدّ الصفوف الكاملة بالعشرات من الأعلى إلى الأسفل (١٠، ٢٠، ٣٠، ٤٠، ٥٠).",
          params: {
            iconType: "fruit",
            rows: 5,
            cols: 10,
            candidateCounts: [20, 30, 40, 50],
            gridCount: 2,
            directionNoteAr:
              "عدّ الصفوف الكاملة بالعشرات لتعرف عدد الفواكه الكلّي.",
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى مجموعتَي المجسّمات، ثم اكتب عدد كلّ مجموعة وكم تزيد إحداهما على الأخرى:",
          strategyHintAr:
            "انظر إلى الأزواج المتقابلة أولاً، ثم عدّ المجسّمات الإضافية لتعرف كم أكثر أو كم أقل.",
          params: {
            compareMode: "find-difference",
            visualKind: "linear-comparison",
            iconSetKind: "solids-3d",
            numberRange: [4, 10],
            itemCount: 1,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتَي العشرة الرأسيتين، ثم اكتب الكلّ في رابط العدد:",
          strategyHintAr:
            "انظر إلى اللوحة اليمنى الكاملة (١٠) واللوحة اليسرى التي تحمل الآحاد، ثم اكتب الكلّ في دائرة الكلّ.",
          params: {
            subitizeMode: "decompose-teen",
            drawModel: "vertical-ten-frame",
            candidateCounts: [11, 12, 13, 14, 15],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ مجموعات العشرة في شبكة لوحات العشرة، ثم اكتب الكلّ:",
          strategyHintAr:
            "عدّ اللوحات الكاملة بالعشرات من اليمين إلى اليسار حتى ٥٠.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [20, 30, 40, 50],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr: "انظر إلى اللوحات الكاملة، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى اللوحات الكاملة واربط عددها باللقب العشري، ثم اكتب الكلّ.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 30, 40, 50],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "CountGridItems",
          promptAr: "انظر إلى شبكة الفواكه، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr: "عدّ الصفوف الكاملة بالعشرات لتحديد الكلّ بسرعة.",
          params: {
            iconType: "fruit",
            rows: 5,
            cols: 10,
            candidateCounts: [30, 40, 50],
            gridCount: 2,
            directionNoteAr:
              "عدّ الصفوف الكاملة بالعشرات لتعرف عدد الفواكه الكلّي.",
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى مجموعتَي المجسّمات، ثم اكتب عدد كلّ مجموعة وكم تزيد إحداهما على الأخرى:",
          strategyHintAr:
            "انظر إلى الأزواج المتقابلة؛ إذا تساوت المجموعتان فلا توجد قطع إضافية (٠).",
          params: {
            compareMode: "find-difference",
            visualKind: "linear-comparison",
            iconSetKind: "solids-3d",
            numberRange: [4, 10],
            itemCount: 1,
          },
        },
      ],
    },
  },
};

// ============================================================================
// Lesson K-114: Numbers to 50 - Count All and Count On by 1s (K.CC.1)
// ============================================================================
export const lessonK114Blueprint: LessonBlueprint = {
  lessonId: "K-114",
  grade: "K",
  lessonNumber: 114,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-114"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-114"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ مجموعات العشرة في شبكة لوحات العشرة، ثم اكتب الكلّ:",
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات (١٠، ٢٠، ٣٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ اللوحات الكاملة بالعشرات، ثم اكتب الكلّ:",
          strategyHintAr:
            "انظر إلى اللوحات الكاملة (كل لوحة تساوي ١٠)، ثم عدّ بالعشرات واكتب العدد.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr: "انظر إلى شبكة لوحات العشرة، ثم عدّ واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى اللوحات الكاملة التي تمثّل العشرات واللوحة الأخيرة التي تمثّل الآحاد، ثم اكتب العدد.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "CountGridItems",
          promptAr: "انظر إلى شبكة أقلام الرصاص، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى الصفوف الكاملة (كل صفّ يحتوي على ١٠ أقلام)، ثم عدّ الصفوف بالعشرات.",
          params: {
            iconType: "pencil",
            rows: 3,
            cols: 10,
            candidateCounts: [10, 20, 30],
            gridCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ جميع الأقراص في الشبكة، ثم تحقّق بالعدّ القفزي بالعشرات:",
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات لتتأكّد من الكلّ.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [20, 30],
            itemCount: 1,
            comparisonPromptAr: "كم لوحة عشرة كاملة في الشبكة؟",
            comparisonAnswerAr: "لوحتان أو ثلاث لوحات كاملة",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ مجموعات العشرة في شبكة لوحات العشرة، ثم اكتب الكلّ:",
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات (١٠، ٢٠، ٣٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ اللوحات الكاملة بالعشرات ثم أكمل بالآحاد، واكتب الكلّ:",
          strategyHintAr:
            "عدّ اللوحات الكاملة بالعشرات أولاً، ثم عدّ الأقراص الإضافية بالآحاد.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [21, 24, 27, 32, 35, 38, 43, 46, 49],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr: "انظر إلى اللوحات الكاملة والآحاد الإضافية، ثم اكتب الكلّ:",
          strategyHintAr:
            "اكتب عدد العشرات في خانة العشرات وعدد الآحاد المتبقية في خانة الآحاد.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [22, 25, 29, 33, 36, 41, 44, 48],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "CountGridItems",
          promptAr:
            "انظر إلى شبكة أقلام الرصاص، ثم عدّ بالعشرات والآحاد واكتب الكلّ:",
          strategyHintAr:
            "عدّ الصفوف الكاملة بالعشرات ثم أكمل عدّ الأقلام المتبقية بالآحاد.",
          params: {
            iconType: "pencil",
            rows: 5,
            cols: 10,
            candidateCounts: [24, 33, 42, 47],
            gridCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ جميع الأقراص في الشبكة، ثم تحقّق بالعدّ القفزي بالعشرات والآحاد:",
          strategyHintAr:
            "عدّ اللوحات الكاملة بالعشرات ثم أضف الآحاد في اللوحة الأخيرة.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [34, 45],
            itemCount: 1,
            comparisonPromptAr: "كيف يساعدك العدّ بالعشرات على التحقّق؟",
            comparisonAnswerAr: "أعدّ اللوحات الكاملة بالعشرات ثم أضيف الآحاد",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ مجموعات العشرة في شبكة لوحات العشرة، ثم اكتب الكلّ:",
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات (١٠، ٢٠، ٣٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ اللوحات الكاملة بالعشرات ثم أكمل بالآحاد، واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى العشرات الكاملة بلمحة واحدة ثم أضف الآحاد دون عدّ اللوحات الكاملة واحداً واحداً.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [23, 26, 29, 34, 37, 41, 45, 48, 50],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr: "انظر إلى اللوحات الكاملة والآحاد الإضافية، ثم اكتب الكلّ:",
          strategyHintAr:
            "انظر إلى اللوحات الكاملة واربط عددها باللقب العشري، ثم اكتب العدد الصحيح.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [28, 31, 39, 42, 47, 50],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "CountGridItems",
          promptAr:
            "انظر إلى شبكة أقلام الرصاص، ثم عدّ بالعشرات والآحاد واكتب الكلّ:",
          strategyHintAr:
            "عدّ الصفوف الكاملة بالعشرات ثم أكمل عدّ الأقلام في الصفّ الأخير.",
          params: {
            iconType: "pencil",
            rows: 5,
            cols: 10,
            candidateCounts: [28, 36, 44, 49],
            gridCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ جميع الأقراص في الشبكة، ثم تحقّق بالعدّ القفزي بالعشرات والآحاد:",
          strategyHintAr:
            "عدّ اللوحات الكاملة بالعشرات ثم أضف الآحاد في اللوحة الأخيرة.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [38, 47],
            itemCount: 1,
            comparisonPromptAr: "كيف يساعدك العدّ بالعشرات على التحقّق؟",
            comparisonAnswerAr: "أعدّ اللوحات الكاملة بالعشرات ثم أضيف الآحاد",
          },
        },
      ],
    },
  },
};

// ============================================================================
// Lesson K-115: Numbers to 50 - Subitize with Ten Frames (K.CC.5, K.OA.4)
// ============================================================================
export const lessonK115Blueprint: LessonBlueprint = {
  lessonId: "K-115",
  grade: "K",
  lessonNumber: 115,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-115"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-115"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ اللوحات الكاملة بالعشرات، ثم اكتب الكلّ:",
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات (١٠، ٢٠، ٣٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى شبكة لوحات العشرة بلمحة واحدة، ثم اكتب الكلّ:",
          strategyHintAr:
            "انظر إلى اللوحات الكاملة بالعشرات دون عدّ فردي ثم اكتب الكلّ.",
          params: {
            subitizeMode: "decade-subitize",
            candidateCounts: [10, 20, 30],
            askKind: "total",
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى شبكة لوحات العشرة، ثم اكتب الكلّ:",
          strategyHintAr:
            "انظر إلى اللوحات الكاملة (كل لوحة تساوي ١٠)، ثم اجمع العشرات بسرعة.",
          params: {
            subitizeMode: "decade-subitize",
            candidateCounts: [10, 20, 30],
            askKind: "total",
            cardCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "ارسم الأقراص الناقصة في الشبكة لتكوين العدد، ثم اكتب الكلّ وكم ينقصه حتى عدد العقد التالي:",
          strategyHintAr:
            "ارسم الأقراص المتبقية في اللوحة التالية بعد اللوحات الكاملة المرسومة، ثم اكتب كم ينقصها لتكتمل.",
          params: {
            subitizeMode: "decade-subitize",
            responseKind: "draw-to-make",
            complementTarget: "next-decade",
            candidateCounts: [22, 25, 28],
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى شبكة لوحات العشرة، ثم اكتب الكلّ واللقب العشري للعدد:",
          strategyHintAr:
            "اكتب الكلّ أولاً، ثم اكتب عدد العشرات والآحاد في اللقب العشري.",
          params: {
            subitizeMode: "decade-subitize",
            writeNickname: true,
            candidateCounts: [20, 30],
            cardCount: 1,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ اللوحات الكاملة بالعشرات، ثم اكتب الكلّ:",
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات (١٠، ٢٠، ٣٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى شبكة لوحات العشرة، ثم اكتب الكلّ وكم ينقصه حتى عدد العقد التالي:",
          strategyHintAr:
            "اقرأ اللوحات الكاملة بالعشرات واللوحة الناقصة بالآحاد، ثم انظر إلى الخانات الفارغة فيها لتجد المكمل.",
          params: {
            subitizeMode: "decade-subitize",
            complementTarget: "next-decade",
            askKind: "both",
            candidateCounts: [21, 23, 25, 32, 34, 36, 41, 43, 47],
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى شبكة لوحات العشرة، ثم اكتب كم ينقص العدد حتى عدد العقد التالي:",
          strategyHintAr:
            "انظر إلى الخانات الفارغة في اللوحة الأخيرة لتعرف كم ينقص العدد حتى يكتمل العقد.",
          params: {
            subitizeMode: "decade-subitize",
            complementTarget: "next-decade",
            askKind: "complement",
            candidateCounts: [24, 27, 33, 38, 42, 46],
            cardCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "ارسم الأقراص الناقصة في الشبكة لتكوين العدد، ثم اكتب الكلّ وكم ينقصه حتى عدد العقد التالي:",
          strategyHintAr:
            "ارسم الآحاد في اللوحة التالية ثم اكتب كم خانة بقيت فارغة لتصل إلى ٣٠ أو ٤٠ أو ٥٠.",
          params: {
            subitizeMode: "decade-subitize",
            responseKind: "draw-to-make",
            complementTarget: "next-decade",
            candidateCounts: [23, 27, 34, 38, 42, 46],
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى شبكة لوحات العشرة، ثم اكتب الكلّ واللقب العشري للعدد:",
          strategyHintAr:
            "اكتب الكلّ في المربع، ثم اكتب اللقب العشري بصيغة (عشرات وآحاد).",
          params: {
            subitizeMode: "decade-subitize",
            writeNickname: true,
            candidateCounts: [24, 32, 37, 43],
            cardCount: 1,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ اللوحات الكاملة بالعشرات، ثم اكتب الكلّ:",
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات (١٠، ٢٠، ٣٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى شبكة لوحات العشرة، ثم اكتب الكلّ وكم ينقصه حتى عدد العقد التالي:",
          strategyHintAr:
            "انظر إلى العشرات والآحاد بلمحة واحدة ثم أوجد المكمل إلى عدد العقد التالي (٣٠ أو ٤٠ أو ٥٠).",
          params: {
            subitizeMode: "decade-subitize",
            complementTarget: "next-decade",
            askKind: "both",
            candidateCounts: [22, 24, 27, 31, 35, 38, 42, 46, 49],
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى شبكة لوحات العشرة، ثم اكتب كم ينقص العدد حتى عدد العقد التالي:",
          strategyHintAr:
            "انظر إلى اللوحة الناقصة وأكمل ١٠ لتعرف المكمل إلى عدد العقد التالي.",
          params: {
            subitizeMode: "decade-subitize",
            complementTarget: "next-decade",
            askKind: "complement",
            candidateCounts: [26, 29, 34, 37, 43, 48],
            cardCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "ارسم الأقراص الناقصة في الشبكة لتكوين العدد، ثم اكتب الكلّ وكم ينقصه حتى عدد العقد التالي:",
          strategyHintAr:
            "ارسم الآحاد في اللوحة التالية واكتب كم ينقصها لتصل إلى ٣٠ أو ٤٠ أو ٥٠.",
          params: {
            subitizeMode: "decade-subitize",
            responseKind: "draw-to-make",
            complementTarget: "next-decade",
            candidateCounts: [26, 33, 39, 44, 48],
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى شبكة لوحات العشرة، ثم اكتب الكلّ واللقب العشري للعدد:",
          strategyHintAr:
            "اكتب الكلّ في المربع، ثم اكتب اللقب العشري بصيغة (عشرات وآحاد).",
          params: {
            subitizeMode: "decade-subitize",
            writeNickname: true,
            candidateCounts: [36, 44, 48],
            cardCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK113Blueprint);
registerLessonBlueprint(lessonK114Blueprint);
registerLessonBlueprint(lessonK115Blueprint);
