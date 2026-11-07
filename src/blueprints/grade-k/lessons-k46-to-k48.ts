import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

export const lessonK46Blueprint: LessonBlueprint = {
  lessonId: "K-46",
  grade: "K",
  lessonNumber: 46,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-46"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-46"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة والرقم المطروح، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "انظر إلى الكلّ على لوحة الخمسة، ثم عدّ الأقراص غير المشطوبة واكتب كم بقي.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة والرقم المطروح، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "انظر إلى الأقراص المشطوبة بمقدار الرقم، ثم اكتب كم بقي في المربع.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح الرقم من الكلّ على لوحة الخمسة، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة على لوحة الخمسة، ثم اكتب العدد في المربع.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى معادلات الطرح في الصف، ثم اختر المعادلة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كل معادلة، ثم اختر المعادلة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            totalRange: [2, 4],
            minPart: 1,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح لإيجاد الجزء الناقص، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "انظر إلى الأقراص المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص في المربع.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [3, 4],
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
            "انظر إلى لوحة الخمسة والرقم المطروح، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "اطرح الرقم من الكلّ على لوحة الخمسة ذهنياً، ثم اكتب كم بقي في المربع.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            action: "write",
            crossOffMode: "none",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة والرقم المطروح، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "انظر إلى الكلّ على لوحة الخمسة، ثم اطرح الرقم ذهنياً واكتب كم بقي.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            action: "write",
            crossOffMode: "none",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح الرقم من الكلّ على لوحة الخمسة، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "اطرح الجزء المكتوب كرقم من أقراص لوحة الخمسة، ثم اكتب الجزء الناقص.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            action: "write",
            crossOffMode: "none",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى معادلات الطرح في الصف، ثم اختر المعادلة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كل معادلة، ثم اختر المعادلة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            totalRange: [3, 5],
            minPart: 1,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح لإيجاد الجزء الناقص، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "اطرح الرقم من الكلّ على لوحة الخمسة ذهنياً، ثم اكتب الجزء الناقص في المربع.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            action: "write",
            crossOffMode: "none",
            totalRange: [3, 5],
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
            "اطرح الرقم من الكلّ على لوحة الخمسة، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "انظر إلى الكلّ على لوحة الخمسة، ثم اطرح الرقم ذهنياً واكتب كم بقي.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            action: "write",
            crossOffMode: "none",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة والرقم المطروح، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "اطرح الرقم (بما في ذلك الصفر ٠) من الكلّ على لوحة الخمسة، ثم اكتب كم بقي.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            action: "write",
            crossOffMode: "none",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح الرقم من الكلّ على لوحة الخمسة، ثم اكتب الجزء الناقص في المربع:",
          strategyHintAr:
            "انظر إلى الكلّ على لوحة الخمسة، ثم اطرح الرقم ذهنياً واكتب الجزء الناقص.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            action: "write",
            crossOffMode: "none",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى معادلات الطرح في الصف، ثم اختر المعادلة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كل معادلة، ثم اختر المعادلة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            totalRange: [2, 5],
            minPart: 0,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح لإيجاد الجزء الناقص، ثم اكتب كم بقي في المربع:",
          strategyHintAr:
            "اطرح الرقم من الكلّ على لوحة الخمسة ذهنياً، ثم اكتب الجزء الناقص في المربع.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "answer-slot",
            action: "write",
            crossOffMode: "none",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK46Blueprint);

export const lessonK47Blueprint: LessonBlueprint = {
  lessonId: "K-47",
  grade: "K",
  lessonNumber: 47,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-47"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-47"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الأقراص المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الأقراص غير المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الأقراص المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص لإكمال رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الكلّ والأقراص المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح الجزء المشطوب على لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص في الدائرة اليسرى.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى روابط الأعداد في الصف، ثم اختر الرابطة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح أحد الجزأين من الكلّ في كل رابطة أعداد، ثم اختر الرابطة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "number-bond",
            rowCount: 1,
            totalRange: [2, 4],
            minPart: 1,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح أو عدّ من الجزء المعروف لإيجاد الجزء الناقص، ثم اكتبه في رابطة الأعداد:",
          strategyHintAr:
            "اطرح الجزء المعروف من الكلّ، ثم عدّ من الجزء المعروف حتى الكلّ للتحقّق من الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [3, 4],
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
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص لإكمال رابطة الأعداد:",
          strategyHintAr:
            "اطرح الجزء المعروف من الكلّ على لوحة الخمسة ذهنياً، ثم اكتب الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "none",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ على لوحة الخمسة، ثم اكتب الجزء الناقص لإكمال كل رابطة أعداد:",
          strategyHintAr:
            "اطرح الجزء المعروف من الكلّ على لوحة الخمسة ذهنياً، ثم اكتب كم بقي في رابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "none",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح الجزء المعروف من الكلّ ذهنياً، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى أقراص الكلّ على لوحة الخمسة، ثم اطرح الجزء المعروف واكتب الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "none",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى روابط الأعداد في الصف، ثم اختر الرابطة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح أحد الجزأين من الكلّ في كل رابطة أعداد، ثم اختر الرابطة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "number-bond",
            rowCount: 1,
            totalRange: [3, 5],
            minPart: 1,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح أو عدّ من الجزء المعروف لإيجاد الجزء الناقص، ثم اكتبه في رابطة الأعداد:",
          strategyHintAr:
            "اطرح الجزء المعروف من الكلّ، ثم عدّ من الجزء المعروف حتى الكلّ للتحقّق من الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "none",
            totalRange: [3, 5],
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
            "اطرح الجزء المعروف من الكلّ ذهنياً، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الكلّ على لوحة الخمسة، ثم اطرح الجزء المعروف واكتب الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "none",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ على لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "اطرح الجزء المعروف (بما في ذلك الصفر ٠) من الكلّ ذهنياً، ثم اكتب الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "none",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح الجزء المعروف من الكلّ، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المعروف، ثم اكتب الجزء الناقص في الدائرة الفارغة.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "none",
            swapBondParts: true,
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى روابط الأعداد في الصف، ثم اختر الرابطة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح أحد الجزأين من الكلّ في كل رابطة أعداد، ثم اختر الرابطة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "number-bond",
            rowCount: 1,
            totalRange: [2, 5],
            minPart: 0,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح أو عدّ من الجزء المعروف لإيجاد الجزء الناقص، ثم اكتبه في رابطة الأعداد:",
          strategyHintAr:
            "اطرح الجزء المعروف من الكلّ، ثم عدّ من الجزء المعروف حتى الكلّ للتحقّق من الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            crossOffMode: "none",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK47Blueprint);

export const lessonK48Blueprint: LessonBlueprint = {
  lessonId: "K-48",
  grade: "K",
  lessonNumber: 48,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-48"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-48"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "انظر إلى الأقراص غير المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص بعد علامة =.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة لإكمال كل معادلة طرح، ثم اكتب الجزء الناقص للكلّ والجزأين:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب، ثم اكتب الجزء الناقص في معادلة الطرح.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
            showTermLabels: true,
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح الجزء من الكلّ على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص بعد علامة =.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
            showTermLabels: true,
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى معادلات الطرح في الصف، ثم اختر المعادلة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كل معادلة، ثم اختر المعادلة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            totalRange: [2, 4],
            minPart: 1,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح أو عدّ من الجزء المعروف لإيجاد الجزء الناقص، ثم اكتبه في معادلة الطرح:",
          strategyHintAr:
            "اطرح الجزء المعروف من الكلّ، ثم عدّ من الجزء المعروف حتى الكلّ للتحقّق من الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [3, 4],
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
            "اطرح الجزء المعروف من الكلّ على لوحة الخمسة ذهنياً، ثم اكتب الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "none",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ على لوحة الخمسة، ثم اكتب الجزء الناقص لإكمال كل معادلة طرح:",
          strategyHintAr:
            "اطرح الجزء المعروف من الكلّ ذهنياً، ثم اكتب الجزء الناقص وحدّد الكلّ والجزأين.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "none",
            showTermLabels: true,
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح الجزء من الكلّ ذهنياً، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "انظر إلى الكلّ على لوحة الخمسة، ثم اطرح الجزء الأول واكتب الجزء الناقص بعد علامة =.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "none",
            showTermLabels: true,
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى معادلات الطرح في الصف، ثم اختر المعادلة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كل معادلة، ثم اختر المعادلة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            totalRange: [3, 5],
            minPart: 1,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح أو عدّ من الجزء المعروف لإيجاد الجزء الناقص، ثم اكتبه في معادلة الطرح:",
          strategyHintAr:
            "اطرح الجزء المعروف من الكلّ، ثم عدّ من الجزء المعروف حتى الكلّ للتحقّق من الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "none",
            totalRange: [3, 5],
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
            "اطرح الجزء من الكلّ ذهنياً، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "انظر إلى الكلّ على لوحة الخمسة، ثم اطرح الجزء المعروف واكتب الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "none",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الكلّ على لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "اطرح الجزء المعروف (بما في ذلك الصفر ٠) من الكلّ ذهنياً، ثم اكتب الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "none",
            showTermLabels: true,
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح لإيجاد الجزء الناقص في معادلة الطرح، ثم اكتب العدد في المربع:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المتبقي، ثم اكتب الجزء المأخوذ في معادلة الطرح.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "none",
            showTermLabels: true,
            unknownPosition: "partTakenAway",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى معادلات الطرح في الصف، ثم اختر المعادلة غير الصحيحة بعلامة ✕:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كل معادلة، ثم اختر المعادلة غير الصحيحة بعلامة ✕.",
          params: {
            operation: "subtract",
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            totalRange: [2, 5],
            minPart: 0,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح أو عدّ من الجزء المعروف لإيجاد الجزء الناقص، ثم اكتبه في معادلة الطرح:",
          strategyHintAr:
            "اطرح الجزء المعروف من الكلّ، ثم عدّ من الجزء المعروف حتى الكلّ للتحقّق من الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            equationLayout: "total-first",
            action: "write",
            crossOffMode: "none",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK48Blueprint);
