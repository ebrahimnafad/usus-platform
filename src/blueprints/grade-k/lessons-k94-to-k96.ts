import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lessons K-94 / K-95 / K-96 — Unit 8 (Subtract to 10): subitize subtraction
// ============================================================================
// The subitizing trio scales K-46..K-48's five-frame subitizing to ten frames:
// K-94 subtracts the digit's part by mentally crossing off counters
// (WHAT'S WRONG A), K-95 completes subtraction number bonds (WHAT'S WRONG B),
// and K-96 completes subtraction equations (WHAT'S WRONG C). The timed flash
// ("quick images") fluency routine lives in the Teacher Notes only (§5.5).
// ============================================================================

// ============================================================================
// Lesson K-94: Subtract by Subitizing Counters in Ten Frames (K.OA.1)
// ============================================================================
export const lessonK94Blueprint: LessonBlueprint = {
  lessonId: "K-94",
  grade: "K",
  lessonNumber: 94,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-94"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-94"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة العشرة والرقم المطروح، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "انظر إلى الكلّ والرقم المطروح، ثم اكتب الجزء الذي بقي في المربع.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "answer-slot",
            action: "trace",
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
            "انظر إلى لوحة العشرة والرقم المطروح، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "انظر إلى الكلّ والأقراص المشطوبة بمقدار الرقم، ثم اكتب كم بقي في المربع.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "answer-slot",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الأقراص المشطوبة على لوحة العشرة، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة للتحقّق، ثم اكتب الجزء الذي بقي في المربع.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "answer-slot",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى معادلات الطرح في الصف، ثم اشطب المعادلة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كلّ معادلة، ثم اشطب المعادلة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 8],
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ والرقم المطروح على لوحة العشرة، ثم اشطب الجزء واكتب كم بقي في المربع:",
          strategyHintAr:
            "اشطب الرقم المطروح من أقراص الكلّ، ثم اكتب الجزء الذي بقي في المربع.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "answer-slot",
            action: "draw-and-cross-off",
            crossOffMode: "student",
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
            "انظر إلى لوحة العشرة والرقم المطروح، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "انظر إلى الكلّ والرقم المطروح، ثم اكتب الجزء الذي بقي في المربع.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "answer-slot",
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
            "انظر إلى لوحة العشرة والرقم المطروح، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي المكتمل (٥) وعدّ الأقراص غير المشطوبة، ثم اكتب الجزء الذي بقي في المربع.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "answer-slot",
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
            "انظر إلى الأقراص المشطوبة على لوحة العشرة، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة بلمحة بدءاً من الصفّ العلوي المكتمل (٥)، ثم اكتب الجزء الذي بقي في المربع.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "answer-slot",
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
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى معادلات الطرح في الصف، ثم اشطب المعادلة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كلّ معادلة، ثم اشطب المعادلة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 10],
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ والرقم المطروح على لوحة العشرة، ثم اشطب الجزء واكتب كم بقي في المربع:",
          strategyHintAr:
            "اشطب الرقم المطروح من أقراص الكلّ، ثم اكتب الجزء الذي بقي في المربع.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "answer-slot",
            action: "draw-and-cross-off",
            crossOffMode: "student",
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
            "انظر إلى لوحة العشرة والرقم المطروح، ثم اكتب كم بقي في المربع دون العدّ الفردي:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي المكتمل (٥)، ثم اكتب عدد الأقراص غير المشطوبة بلمحة في المربع.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "answer-slot",
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
            "انظر إلى لوحة العشرة والرقم المطروح، ثم اشطب الأقراص واكتب كم بقي في المربع:",
          strategyHintAr:
            "اشطب الرقم المطروح من أقراص الكلّ (بما فيها الصفر ٠)، ثم اكتب الجزء الذي بقي في المربع.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "answer-slot",
            action: "write",
            crossOffMode: "student",
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
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى معادلات الطرح في الصف، ثم اشطب المعادلة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كلّ معادلة (بما فيها الصفر ٠)، ثم اشطب المعادلة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 0,
            totalRange: [6, 10],
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ والرقم المطروح على لوحة العشرة، ثم اشطب الجزء واكتب كم بقي في المربع:",
          strategyHintAr:
            "اشطب الرقم المطروح من أقراص الكلّ، ثم اكتب الجزء الذي بقي في المربع.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "answer-slot",
            action: "draw-and-cross-off",
            crossOffMode: "student",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK94Blueprint);

// ============================================================================
// Lesson K-95: Subtract by Subitizing Number Bonds (K.OA.1)
// ============================================================================
export const lessonK95Blueprint: LessonBlueprint = {
  lessonId: "K-95",
  grade: "K",
  lessonNumber: 95,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-95"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-95"].teacherNotes,
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
            "انظر إلى الكلّ والأقراص المشطوبة، ثم اكتب الجزء الذي بقي في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "trace",
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
            action: "trace",
            crossOffMode: "shown",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى روابط الأعداد في الصف، ثم اشطب الرابطة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كلّ رابطة، ثم اشطب الرابطة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "number-bond",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 8],
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ على لوحة العشرة، ثم اشطب الجزء واكتب ما بقي في رابطة الأعداد:",
          strategyHintAr:
            "اشطب الجزء المعطى من أقراص الكلّ، ثم اكتب الجزء الذي بقي في رابطة الأعداد.",
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
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى روابط الأعداد في الصف، ثم اشطب الرابطة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كلّ رابطة، ثم اشطب الرابطة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "number-bond",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 10],
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ على لوحة العشرة، ثم اشطب الجزء واكتب ما بقي في رابطة الأعداد:",
          strategyHintAr:
            "اشطب الجزء المعطى من أقراص الكلّ، ثم اكتب الجزء الذي بقي في رابطة الأعداد.",
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
            "انظر إلى الصفّ العلوي المكتمل (٥)، ثم اكتب عدد الأقراص غير المشطوبة بلمحة في الرابطة.",
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
            "انظر إلى لوحة العشرة، ثم اشطب الجزء واكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "اشطب الجزء المعطى من أقراص الكلّ (بما فيها الصفر ٠)، ثم اكتب الجزء الذي بقي في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "student",
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
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى روابط الأعداد في الصف، ثم اشطب الرابطة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كلّ رابطة (بما فيها الصفر ٠)، ثم اشطب الرابطة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "number-bond",
            rowCount: 1,
            itemCount: 3,
            minPart: 0,
            totalRange: [6, 10],
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ على لوحة العشرة، ثم اشطب الجزء واكتب ما بقي في رابطة الأعداد:",
          strategyHintAr:
            "اشطب الجزء المعطى من أقراص الكلّ، ثم اكتب الجزء الذي بقي في رابطة الأعداد.",
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

registerLessonBlueprint(lessonK95Blueprint);

// ============================================================================
// Lesson K-96: Subtract by Subitizing Equations (K.OA.1)
// ============================================================================
export const lessonK96Blueprint: LessonBlueprint = {
  lessonId: "K-96",
  grade: "K",
  lessonNumber: 96,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-96"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-96"].teacherNotes,
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
            "انظر إلى الكلّ والأقراص المشطوبة، ثم اكتب الجزء الذي بقي في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "trace",
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
            action: "trace",
            crossOffMode: "shown",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى معادلات الطرح في الصف، ثم اشطب المعادلة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كلّ معادلة، ثم اشطب المعادلة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 8],
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ على لوحة العشرة، ثم اشطب الجزء واكتب ما بقي في المعادلة:",
          strategyHintAr:
            "اشطب الجزء المعطى من أقراص الكلّ، ثم اكتب الجزء الذي بقي في المعادلة.",
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
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى معادلات الطرح في الصف، ثم اشطب المعادلة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كلّ معادلة، ثم اشطب المعادلة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 10],
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ على لوحة العشرة، ثم اشطب الجزء واكتب ما بقي في المعادلة:",
          strategyHintAr:
            "اشطب الجزء المعطى من أقراص الكلّ، ثم اكتب الجزء الذي بقي في المعادلة.",
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
            "انظر إلى الصفّ العلوي المكتمل (٥)، ثم اكتب عدد الأقراص غير المشطوبة بلمحة بعد علامة =.",
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
            "انظر إلى لوحة العشرة والمعادلة، ثم اشطب الأقراص واكتب ما بقي في المعادلة:",
          strategyHintAr:
            "اشطب الجزء المعطى في المعادلة من أقراص الكلّ (بما فيها الصفر ٠)، ثم اكتب الجزء الذي بقي في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "student",
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
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى معادلات الطرح في الصف، ثم اشطب المعادلة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كلّ معادلة (بما فيها الصفر ٠)، ثم اشطب المعادلة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 0,
            totalRange: [6, 10],
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ على لوحة العشرة، ثم اشطب الجزء واكتب ما بقي في المعادلة:",
          strategyHintAr:
            "اشطب الجزء المعطى من أقراص الكلّ، ثم اكتب الجزء الذي بقي في المعادلة.",
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

registerLessonBlueprint(lessonK96Blueprint);
