import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lessons K-116 to K-118 — Grade K Unit 10 (Numbers to 100):
// Extending to the Full Range: Counting by 10s/1s and Decade Subitizing to 100
// ============================================================================

// ============================================================================
// Lesson K-116: Numbers to 100 - Count All by 10s (K.CC.1)
// ============================================================================
export const lessonK116Blueprint: LessonBlueprint = {
  lessonId: "K-116",
  grade: "K",
  lessonNumber: 116,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-116"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-116"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
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
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ مجموعات العشرة في شبكة لوحات العشرة، ثم اكتب الكلّ:",
          strategyHintAr:
            "عدّ اللوحات الكاملة بالعشرات من اليمين إلى اليسار (١٠، ٢٠، ٣٠، ٤٠، ٥٠) ثم اكتب العدد.",
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
            "انظر إلى اللوحات الكاملة (كل لوحة تساوي ١٠)، ثم انطق اللقب العشري واكتب العدد.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30, 40, 50],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "CountGridItems",
          promptAr: "انظر إلى شبكة الكرات، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى الصفوف الكاملة (كل صفّ يحتوي على ١٠ كرات)، ثم عدّ الصفوف بالعشرات.",
          params: {
            iconType: "ball",
            rows: 10,
            cols: 10,
            candidateCounts: [20, 30, 40, 50],
            gridCount: 2,
            directionNoteAr: "عدّ الصفوف الكاملة بالعشرات لتعرف الكلّ.",
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى مجموعتَي المجسّمات، ثم اكتب عدد كلّ مجموعة وكم تزيد إحداهما على الأخرى:",
          strategyHintAr:
            "انظر إلى الأزواج المتقابلة ثم عدّ القطع الإضافية، وتدرّب أيضاً على العدّ تصاعدياً من ٥٠.",
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
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ مجموعات العشرة في شبكة لوحات العشرة، ثم اكتب الكلّ:",
          strategyHintAr:
            "عدّ اللوحات الكاملة بالعشرات من اليمين إلى اليسار (٦٠، ٧٠، ٨٠، ٩٠، ١٠٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [60, 70, 80, 90, 100],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr: "انظر إلى اللوحات الكاملة، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr:
            "عدّ بالعدّ القفزي بالعشرات بعد الخمسين (ستون، سبعون، ثمانون، تسعون، مئة).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [50, 60, 70, 80, 90, 100],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "CountGridItems",
          promptAr: "انظر إلى شبكة الكرات، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr:
            "عدّ الصفوف الكاملة بالعشرات من الأعلى إلى الأسفل حتى ١٠٠.",
          params: {
            iconType: "ball",
            rows: 10,
            cols: 10,
            candidateCounts: [60, 70, 80, 90, 100],
            gridCount: 2,
            directionNoteAr: "عدّ الصفوف الكاملة بالعشرات لتعرف الكلّ.",
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى مجموعتَي المجسّمات، ثم اكتب عدد كلّ مجموعة وكم تزيد إحداهما على الأخرى:",
          strategyHintAr:
            "انظر إلى الأزواج المتقابلة ثم عدّ المجسّمات الإضافية لتعرف كم أكثر أو كم أقل، وتدرّب على العدّ تصاعدياً من ٥٠.",
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
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ مجموعات العشرة في شبكة لوحات العشرة، ثم اكتب الكلّ:",
          strategyHintAr:
            "عدّ اللوحات الكاملة بالعشرات من اليمين إلى اليسار حتى ١٠٠.",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [60, 70, 80, 90, 100],
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
            targetNumbers: [50, 70, 80, 90, 100],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "CountGridItems",
          promptAr: "انظر إلى شبكة الكرات، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr: "عدّ الصفوف الكاملة بالعشرات لتحديد الكلّ بسرعة.",
          params: {
            iconType: "ball",
            rows: 10,
            cols: 10,
            candidateCounts: [60, 70, 80, 90, 100],
            gridCount: 2,
            directionNoteAr: "عدّ الصفوف الكاملة بالعشرات لتعرف الكلّ.",
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى مجموعتَي المجسّمات، ثم اكتب عدد كلّ مجموعة وكم تزيد إحداهما على الأخرى:",
          strategyHintAr:
            "انظر إلى الأزواج المتقابلة وتدرّب على العدّ تصاعدياً من ٥٠؛ وإذا تساوت المجموعتان فلا توجد قطع إضافية (٠).",
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
// Lesson K-117: Numbers to 100 - Count All and Count On by 1s (K.CC.1)
// ============================================================================
export const lessonK117Blueprint: LessonBlueprint = {
  lessonId: "K-117",
  grade: "K",
  lessonNumber: 117,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-117"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-117"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ مجموعات العشرة في شبكة لوحات العشرة، ثم اكتب الكلّ:",
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات (١٠، ٢٠، ٣٠، ٤٠، ٥٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30, 40, 50],
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
            targetNumbers: [10, 20, 30, 40, 50],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr: "انظر إلى شبكة لوحات العشرة، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr:
            "عدّ اللوحات الكاملة بالعشرات من اليمين إلى اليسار ثم اكتب العدد.",
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
          promptAr: "انظر إلى شبكة رموز السلام، ثم عدّ بالعشرات واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى الصفوف الكاملة (كل صفّ يحتوي على ١٠ رموز)، ثم عدّ الصفوف بالعشرات.",
          params: {
            iconType: "peace-sign",
            rows: 10,
            cols: 10,
            candidateCounts: [20, 30, 40, 50],
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
            targetNumbers: [30, 40, 50],
            itemCount: 1,
            comparisonPromptAr: "كم لوحة عشرة كاملة في الشبكة؟",
            comparisonAnswerAr: "ثلاث أو أربع أو خمس لوحات كاملة",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ مجموعات العشرة في شبكة لوحات العشرة، ثم اكتب الكلّ:",
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات (١٠، ٢٠، ٣٠، ٤٠، ٥٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30, 40, 50],
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
            targetNumbers: [51, 54, 58, 63, 67, 72, 76, 84, 89, 95],
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
            targetNumbers: [52, 57, 61, 65, 73, 78, 82, 86, 91, 97],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "CountGridItems",
          promptAr:
            "انظر إلى شبكة رموز السلام، ثم عدّ بالعشرات والآحاد واكتب الكلّ:",
          strategyHintAr:
            "عدّ الصفوف الكاملة بالعشرات ثم أكمل عدّ الرموز المتبقية بالآحاد.",
          params: {
            iconType: "peace-sign",
            rows: 10,
            cols: 10,
            candidateCounts: [54, 63, 72, 85, 96],
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
            targetNumbers: [64, 75, 83],
            itemCount: 1,
            comparisonPromptAr: "كيف تساعدك مجموعات العشرة على العدّ بسرعة؟",
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
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات (١٠، ٢٠، ٣٠، ٤٠، ٥٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30, 40, 50],
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
            targetNumbers: [53, 59, 64, 68, 71, 77, 85, 88, 93, 99, 100],
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
            targetNumbers: [56, 62, 69, 74, 79, 83, 87, 94, 98, 100],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "CountGridItems",
          promptAr:
            "انظر إلى شبكة رموز السلام، ثم عدّ بالعشرات والآحاد واكتب الكلّ:",
          strategyHintAr:
            "عدّ الصفوف الكاملة بالعشرات ثم أكمل عدّ الرموز في الصفّ الأخير.",
          params: {
            iconType: "peace-sign",
            rows: 10,
            cols: 10,
            candidateCounts: [58, 67, 79, 88, 94],
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
            targetNumbers: [76, 87, 95],
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
// Lesson K-118: Numbers to 100 - Subitize with Ten Frames (K.CC.5, K.OA.4)
// ============================================================================
export const lessonK118Blueprint: LessonBlueprint = {
  lessonId: "K-118",
  grade: "K",
  lessonNumber: 118,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-118"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-118"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ اللوحات الكاملة بالعشرات، ثم اكتب الكلّ:",
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات (١٠، ٢٠، ٣٠، ٤٠، ٥٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30, 40, 50],
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
            candidateCounts: [10, 20, 30, 40, 50],
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
            candidateCounts: [10, 20, 30, 40, 50],
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
            candidateCounts: [22, 35, 48],
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
            candidateCounts: [30, 40, 50],
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
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات (١٠، ٢٠، ٣٠، ٤٠، ٥٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30, 40, 50],
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
            "اقرأ اللوحات الكاملة بالعشرات واللوحة الناقصة بالآحاد، ثم انظر إلى الخانات الفارغة فيها لتجد المكمل إلى ٧٠ أو ٨٠ أو ٩٠ أو ١٠٠.",
          params: {
            subitizeMode: "decade-subitize",
            complementTarget: "next-decade",
            askKind: "both",
            candidateCounts: [61, 64, 67, 72, 75, 78, 83, 86, 91, 94],
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى شبكة لوحات العشرة، ثم اكتب كم ينقص العدد حتى عدد العقد التالي:",
          strategyHintAr:
            "انظر إلى الخانات الفارغة في اللوحة الأخيرة لتعرف كم ينقص العدد حتى يكتمل العقد (٧٠، ٨٠، ٩٠، ١٠٠).",
          params: {
            subitizeMode: "decade-subitize",
            complementTarget: "next-decade",
            askKind: "complement",
            candidateCounts: [62, 66, 73, 77, 84, 88, 92, 96],
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
            "ارسم الآحاد في اللوحة التالية ثم اكتب كم خانة بقيت فارغة لتصل إلى ٧٠ أو ٨٠ أو ٩٠ أو ١٠٠.",
          params: {
            subitizeMode: "decade-subitize",
            responseKind: "draw-to-make",
            complementTarget: "next-decade",
            candidateCounts: [63, 74, 82, 96],
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى شبكة لوحات العشرة، ثم اكتب الكلّ واللقب العشري للعدد:",
          strategyHintAr:
            "اكتب الكلّ أولاً، ثم اكتب اللقب العشري بصيغة (عشرات وآحاد).",
          params: {
            subitizeMode: "decade-subitize",
            writeNickname: true,
            candidateCounts: [54, 67, 72, 85, 93],
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
          strategyHintAr: "عدّ اللوحات الكاملة بالعشرات (١٠، ٢٠، ٣٠، ٤٠، ٥٠).",
          params: {
            modelKind: "ten-frame-grid",
            targetNumbers: [10, 20, 30, 40, 50],
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
            "انظر إلى العشرات والآحاد بلمحة واحدة ثم أوجد المكمل إلى عدد العقد التالي (٧٠ أو ٨٠ أو ٩٠ أو ١٠٠).",
          params: {
            subitizeMode: "decade-subitize",
            complementTarget: "next-decade",
            askKind: "both",
            candidateCounts: [63, 68, 71, 76, 82, 89, 93, 97],
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
            candidateCounts: [65, 69, 74, 79, 81, 87, 95, 98],
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
            "ارسم الآحاد في اللوحة التالية واكتب كم ينقصها لتصل إلى ٧٠ أو ٨٠ أو ٩٠ أو ١٠٠.",
          params: {
            subitizeMode: "decade-subitize",
            responseKind: "draw-to-make",
            complementTarget: "next-decade",
            candidateCounts: [66, 73, 89, 94],
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى شبكة لوحات العشرة، ثم اكتب الكلّ واللقب العشري للعدد:",
          strategyHintAr:
            "اكتب الكلّ أولاً، ثم اكتب اللقب العشري بصيغة (عشرات وآحاد).",
          params: {
            subitizeMode: "decade-subitize",
            writeNickname: true,
            candidateCounts: [68, 76, 84, 97, 100],
            cardCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK116Blueprint);
registerLessonBlueprint(lessonK117Blueprint);
registerLessonBlueprint(lessonK118Blueprint);
