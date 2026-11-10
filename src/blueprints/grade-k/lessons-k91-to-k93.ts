import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lessons K-91 / K-92 / K-93 — Unit 8 (Subtract to 10): unknown part & balance
// ============================================================================
// K-91 finds the unknown part of a subtraction fact with number bonds on
// ten frames (co-presented, bridging the addition missing-part of K-87),
// matches ten frames to bonds (MATCHING A), and draws to check the PotD.
// K-92 repeats the same flow with subtraction equations (MATCHING B).
// K-93* is the enrichment lesson judging subtraction equations true/false
// and balancing scales with a number bank (TEETER TOTS).
// ============================================================================

// ============================================================================
// Lesson K-91: Find the Unknown Part with Number Bonds (co-presented, K.OA.1)
// ============================================================================
export const lessonK91Blueprint: LessonBlueprint = {
  lessonId: "K-91",
  grade: "K",
  lessonNumber: 91,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-91"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-91"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب، ثم اكتب الجزء الذي بقي في دائرة الجزء الفارغة.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب، ثم عدّ الأقراص غير المشطوبة واكتب الجزء الذي بقي في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الأقراص المشطوبة على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة للتحقّق، ثم اكتب الجزء الذي بقي في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "shown",
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
            "اكتب الجزء الناقص في كلّ رابطة أعداد، ثم صِلْ كلَّ لوحة عشرة برابطة الأعداد المطابقة لها:",
          strategyHintAr:
            "صِلْ كلَّ لوحة عشرة برابطة الأعداد التي تطابق أقراصها المشطوبة، ثم اكتب الجزء الذي بقي في كلّ رابطة مكتملة.",
          params: {
            matchingMode: "ten-frame-to-bond",
            operation: "subtract",
            totalRange: [6, 8],
            minPart: 1,
            pairCount: 1,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "رابطة الأعداد",
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "ارسم الكلّ واشطب الجزء على لوحة العشرة، ثم اكتب ما بقي في رابطة الأعداد:",
          strategyHintAr:
            "ارسم أقراص الكلّ على لوحة العشرة، ثم اشطب الجزء المعطى وعدّ ما بقي لتكتب الجزء الناقص.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-and-cross-off",
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
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب، ثم اكتب الجزء الذي بقي في دائرة الجزء الفارغة.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 9],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي المكتمل (٥) وعدّ الأقراص غير المشطوبة، ثم اكتب الجزء الذي بقي في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الأقراص المشطوبة على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة بلمحة بدءاً من الصفّ العلوي المكتمل (٥)، ثم اكتب الجزء الذي بقي في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "shown",
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
            "اكتب الجزء الناقص في كلّ رابطة أعداد، ثم صِلْ كلَّ لوحة عشرة برابطة الأعداد المطابقة لها:",
          strategyHintAr:
            "صِلْ كلَّ لوحة عشرة برابطة الأعداد التي تطابق أقراصها المشطوبة، ثم اكتب الجزء الذي بقي في كلّ رابطة مكتملة.",
          params: {
            matchingMode: "ten-frame-to-bond",
            operation: "subtract",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "رابطة الأعداد",
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "ارسم الكلّ واشطب الجزء على لوحة العشرة، ثم اكتب ما بقي في رابطة الأعداد:",
          strategyHintAr:
            "ارسم أقراص الكلّ على لوحة العشرة، ثم اشطب الجزء المعطى وعدّ ما بقي لتكتب الجزء الناقص.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-and-cross-off",
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
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد دون العدّ الفردي:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي المكتمل (٥) وعدّ الأقراص غير المشطوبة بلمحة، ثم اكتب الجزء الذي بقي.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "shown",
            totalRange: [7, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب (بما فيها الصفر ٠)، ثم اكتب الجزء الذي بقي في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 10],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ والجزء الذي بقي على لوحة العشرة، ثم اكتب الجزء المشطوب الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الكلّ وما بقي غير مشطوب، ثم اكتب في دائرة الجزء اليمنى عدد الأقراص المشطوبة.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 9],
            minPart: 1,
            unknownPosition: "partTakenAway",
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الجزء الناقص في كلّ رابطة أعداد، ثم صِلْ كلَّ لوحة عشرة برابطة الأعداد المطابقة لها:",
          strategyHintAr:
            "صِلْ كلَّ لوحة عشرة برابطة الأعداد التي تطابق أقراصها المشطوبة، ثم اكتب الجزء الذي بقي في كلّ رابطة مكتملة.",
          params: {
            matchingMode: "ten-frame-to-bond",
            operation: "subtract",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "رابطة الأعداد",
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "ارسم الكلّ واشطب الجزء على لوحة العشرة، ثم اكتب ما بقي في رابطة الأعداد:",
          strategyHintAr:
            "ارسم أقراص الكلّ على لوحة العشرة، ثم اشطب الجزء المعطى وعدّ ما بقي لتكتب الجزء الناقص.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-and-cross-off",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK91Blueprint);

// ============================================================================
// Lesson K-92: Find the Unknown Part with Equations (co-presented, K.OA.1)
// ============================================================================
export const lessonK92Blueprint: LessonBlueprint = {
  lessonId: "K-92",
  grade: "K",
  lessonNumber: 92,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-92"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-92"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب، ثم اكتب الجزء الذي بقي بعد علامة =.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب، ثم عدّ الأقراص غير المشطوبة واكتب الجزء الذي بقي في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الأقراص المشطوبة على لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة للتحقّق، ثم اكتب الجزء الذي بقي في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
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
            "اكتب الجزء الناقص في كلّ معادلة، ثم صِلْ كلَّ لوحة عشرة بمعادلتها المطابقة:",
          strategyHintAr:
            "صِلْ كلَّ لوحة عشرة بمعادلة الطرح التي تطابق أقراصها المشطوبة، ثم اكتب الجزء الذي بقي في كلّ معادلة مكتملة.",
          params: {
            matchingMode: "ten-frame-to-equation",
            operation: "subtract",
            totalRange: [6, 8],
            minPart: 1,
            pairCount: 1,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "معادلة الطرح",
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "ارسم الكلّ واشطب الجزء على لوحة العشرة، ثم اكتب ما بقي في المعادلة:",
          strategyHintAr:
            "ارسم أقراص الكلّ على لوحة العشرة، ثم اشطب الجزء المعطى وعدّ ما بقي لتكتب الجزء الناقص.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-and-cross-off",
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
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب، ثم اكتب الجزء الذي بقي بعد علامة =.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 9],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي المكتمل (٥) وعدّ الأقراص غير المشطوبة، ثم اكتب الجزء الذي بقي في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الأقراص المشطوبة على لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة بلمحة بدءاً من الصفّ العلوي المكتمل (٥)، ثم اكتب الجزء الذي بقي في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
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
            "اكتب الجزء الناقص في كلّ معادلة، ثم صِلْ كلَّ لوحة عشرة بمعادلتها المطابقة:",
          strategyHintAr:
            "صِلْ كلَّ لوحة عشرة بمعادلة الطرح التي تطابق أقراصها المشطوبة، ثم اكتب الجزء الذي بقي في كلّ معادلة مكتملة.",
          params: {
            matchingMode: "ten-frame-to-equation",
            operation: "subtract",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "معادلة الطرح",
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "ارسم الكلّ واشطب الجزء على لوحة العشرة، ثم اكتب ما بقي في المعادلة:",
          strategyHintAr:
            "ارسم أقراص الكلّ على لوحة العشرة، ثم اشطب الجزء المعطى وعدّ ما بقي لتكتب الجزء الناقص.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-and-cross-off",
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
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الطرح دون العدّ الفردي:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي المكتمل (٥) وعدّ الأقراص غير المشطوبة بلمحة، ثم اكتب الجزء الذي بقي.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [7, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب (بما فيها الصفر ٠)، ثم اكتب الجزء الذي بقي في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 10],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ والجزء الذي بقي على لوحة العشرة، ثم اكتب الجزء المأخوذ الناقص في المعادلة:",
          strategyHintAr:
            "انظر إلى الكلّ وما بقي غير مشطوب، ثم اكتب في مطلع المعادلة عدد الأقراص المشطوبة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 9],
            minPart: 1,
            unknownPosition: "partTakenAway",
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الجزء الناقص في كلّ معادلة، ثم صِلْ كلَّ لوحة عشرة بمعادلتها المطابقة:",
          strategyHintAr:
            "صِلْ كلَّ لوحة عشرة بمعادلة الطرح التي تطابق أقراصها المشطوبة، ثم اكتب الجزء الذي بقي في كلّ معادلة مكتملة.",
          params: {
            matchingMode: "ten-frame-to-equation",
            operation: "subtract",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "معادلة الطرح",
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "ارسم الكلّ واشطب الجزء على لوحة العشرة، ثم اكتب ما بقي في المعادلة:",
          strategyHintAr:
            "ارسم أقراص الكلّ على لوحة العشرة، ثم اشطب الجزء المعطى وعدّ ما بقي لتكتب الجزء الناقص.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-and-cross-off",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK92Blueprint);

// ============================================================================
// Lesson K-93: Balance Equations - Subtract within 10* (enrichment, K.CC.7)
// ============================================================================
export const lessonK93Blueprint: LessonBlueprint = {
  lessonId: "K-93",
  grade: "K",
  lessonNumber: 93,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-93"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-93"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب، ثم اكتب الجزء الذي بقي بعد علامة =.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "اقرأ كلّ معادلة، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في التعبير وقارن قيمته بالطرف الآخر، ثم اختر صح عند التساوي وخطأ عند الاختلاف.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 8],
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى طرفي علامة =، ثم اختر صح إذا تساوت قيمتاهما أو خطأ إذا اختلفتا:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كلّ معادلة، ثم اختر صح إذا تساوى الطرفان حول علامة =.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 8],
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "اختر عدداً لكلّ كفّة من بنك الأعداد، ثم اكتبه لتتساوى كفّتا الميزان:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في الكفّة، ثم اختر العدد المناسب من بنك الأعداد واكتبه في الكفّة الأخرى.",
          params: {
            operation: "subtract",
            mode: "balance",
            modelKind: "balance-scale",
            rowCount: 1,
            itemCount: 2,
            minPart: 1,
            totalRange: [6, 8],
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "اقرأ كلّ معادلة، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في التعبير وقارن قيمته بالطرف الآخر، ثم اختر صح عند التساوي.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 8],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "اطرح الجزء المشطوب من الكلّ، ثم اكتب الجزء الذي بقي في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [6, 9],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "اقرأ كلّ معادلة، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في التعبير وقارن قيمته بالطرف الآخر، ثم اختر صح عند التساوي وخطأ عند الاختلاف.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 10],
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى طرفي علامة =، ثم اختر صح إذا تساوت قيمتاهما أو خطأ إذا اختلفتا:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كلّ معادلة، ثم اختر صح إذا تساوى الطرفان في الصيغة القياسية والمعكوسة.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 10],
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "اختر عدداً لكلّ كفّة من بنك الأعداد، ثم اكتبه لتتساوى كفّتا الميزان:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في الكفّة، ثم اختر العدد المناسب من بنك الأعداد واكتبه في الكفّة الأخرى.",
          params: {
            operation: "subtract",
            mode: "balance",
            modelKind: "balance-scale",
            rowCount: 1,
            itemCount: 2,
            minPart: 1,
            totalRange: [6, 10],
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "اقرأ كلّ معادلة، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في التعبير وقارن قيمته بالطرف الآخر، ثم اختر صح عند التساوي.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 10],
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الطرح دون العدّ الفردي:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي المكتمل (٥) واطرح الجزء بلمحة، ثم اكتب الجزء الذي بقي.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [7, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "اقرأ كلّ معادلة، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في التعبير (بما فيها الصفر ٠) وقارن قيمته بالطرف الآخر، ثم اختر صح عند التساوي وخطأ عند الاختلاف.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 0,
            totalRange: [6, 10],
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى طرفي علامة =، ثم اختر صح إذا تساوت قيمتاهما أو خطأ إذا اختلفتا:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كلّ معادلة، ثم اختر صح إذا تساوى الطرفان في الصيغة القياسية والمعكوسة.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 0,
            totalRange: [6, 10],
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "اختر عدداً لكلّ كفّة من بنك الأعداد، ثم اكتبه لتتساوى كفّتا الميزان:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كفّة، واجمع الجزأين في الكفّة الأخرى، ثم اختر العدد الذي يوازن الكفّتَين من بنك الأعداد.",
          params: {
            operation: "subtract",
            mode: "balance",
            modelKind: "balance-scale",
            rowCount: 1,
            itemCount: 2,
            minPart: 1,
            totalRange: [6, 10],
            twoExpressionPans: true,
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "اختر عدداً لكلّ كفّة من بنك الأعداد، ثم اكتبه لتتساوى كفّتا الميزان:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في الكفّة، ثم اختر العدد المناسب من بنك الأعداد واكتبه في الكفّة الأخرى.",
          params: {
            operation: "subtract",
            mode: "balance",
            modelKind: "balance-scale",
            rowCount: 1,
            itemCount: 2,
            minPart: 1,
            totalRange: [6, 10],
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK93Blueprint);
