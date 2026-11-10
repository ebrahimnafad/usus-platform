import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lesson K-86: Find the Missing Part with Number Bonds & Ten Frames
// (co-presented, K.OA.1)
// ============================================================================
export const lessonK86Blueprint: LessonBlueprint = {
  lessonId: "K-86",
  grade: "K",
  lessonNumber: 86,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-86"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-86"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى الكلّ والجزء الأول على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ تصاعدياً من الجزء الأول إلى الكلّ على لوحة العشرة، ثم اكتب الجزء الناقص في دائرة الجزء الفارغة.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 8],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى الكلّ والجزء الأول على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ تصاعدياً من الجزء الأول إلى الكلّ مع الاستعانة بالصفّ العلوي المكتمل (٥)، ثم اكتب الجزء الناقص في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 8],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص الناقصة على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "ارسم الأقراص حتى تكتمل سعة الكلّ، ثم عدّ الأقراص المرسومة واكتب الجزء الناقص.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [6, 8],
            minPart: 1,
            unknownPosition: "part2",
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
            "صِلْ كلَّ لوحة عشرة برابطة الأعداد التي تطابق أقراصها، ثم اكتب الجزء الناقص في كلّ رابطة مكتملة.",
          params: {
            matchingMode: "ten-frame-to-bond",
            matchMissingPosition: "part2",
            totalRange: [6, 8],
            minPart: 1,
            pairCount: 1,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "رابطة الأعداد",
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص الناقصة على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص المرسومة وارسم المكمل حتى تصل إلى الكلّ، ثم اكتب الجزء الناقص.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [6, 8],
            minPart: 1,
            unknownPosition: "part2",
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
            "انظر إلى الكلّ والجزء الأول على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ تصاعدياً من الجزء الأول إلى الكلّ، ثم اكتب الجزء الناقص في دائرة الجزء الفارغة.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 9],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى الكلّ والجزء الأول على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ تصاعدياً من الجزء الأول إلى الكلّ مع الاستعانة بالصفّ العلوي المكتمل (٥)، ثم اكتب الجزء الناقص في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص الناقصة على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "ارسم الأقراص حتى تكتمل سعة الكلّ، ثم عدّ الأقراص المرسومة واكتب الجزء الناقص.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [6, 10],
            minPart: 1,
            unknownPosition: "part2",
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
            "صِلْ كلَّ لوحة عشرة برابطة الأعداد التي تطابق أقراصها، ثم اكتب الجزء الناقص في كلّ رابطة مكتملة.",
          params: {
            matchingMode: "ten-frame-to-bond",
            matchMissingPosition: "part2",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "رابطة الأعداد",
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص الناقصة على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص المرسومة وارسم المكمل حتى تصل إلى الكلّ، ثم اكتب الجزء الناقص.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [6, 10],
            minPart: 1,
            unknownPosition: "part2",
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
            "انظر إلى الكلّ والجزء الأول على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد دون العدّ الفردي:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي المكتمل (٥) وعدّ المكمل من الجزء الأول إلى الكلّ، ثم اكتب الجزء الناقص.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [7, 10],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى الكلّ والجزء الأول على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي المكتمل (٥) وعدّ المكمل من الجزء الأول إلى الكلّ، ثم اكتب الجزء الناقص في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى الكلّ والجزء الثاني على لوحة العشرة، ثم اكتب الجزء الأول الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ تصاعدياً من الجزء الثاني إلى الكلّ، ثم اكتب الجزء الأول الناقص في دائرة الجزء اليمنى.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 9],
            minPart: 1,
            unknownPosition: "part1",
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
            "صِلْ كلَّ لوحة عشرة برابطة الأعداد التي تطابق أقراصها، ثم اكتب الجزء الناقص في كلّ رابطة مكتملة.",
          params: {
            matchingMode: "ten-frame-to-bond",
            matchMissingPosition: "part2",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "رابطة الأعداد",
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى الكلّ والجزء الثاني على لوحة العشرة، ثم اكتب الجزء الأول الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ تصاعدياً من الجزء الثاني إلى الكلّ، ثم اكتب الجزء الأول الناقص في دائرة الجزء اليمنى.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            unknownPosition: "part1",
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK86Blueprint);

// ============================================================================
// Lesson K-87: Find the Missing Part with Equations & Ten Frames
// (co-presented, K.OA.1)
// ============================================================================
export const lessonK87Blueprint: LessonBlueprint = {
  lessonId: "K-87",
  grade: "K",
  lessonNumber: 87,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-87"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-87"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى معادلة الجمع ولوحة العشرة، ثم اكتب العدد الناقص في المعادلة:",
          strategyHintAr:
            "عدّ تصاعدياً من الجزء الأول إلى الكلّ، ثم اكتب العدد الناقص بعد علامة +.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 8],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى معادلة الجمع ولوحة العشرة، ثم اكتب العدد الناقص في المعادلة:",
          strategyHintAr:
            "عدّ تصاعدياً من الجزء الأول إلى الكلّ مع الاستعانة بالصفّ العلوي المكتمل (٥)، ثم اكتب العدد الناقص في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 8],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص الناقصة على لوحة العشرة، ثم اكتب العدد الناقص في المعادلة:",
          strategyHintAr:
            "ارسم الأقراص حتى تكتمل سعة الكلّ، ثم عدّ الأقراص المرسومة واكتب العدد الناقص في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [6, 8],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب العدد الناقص في كلّ معادلة، ثم صِلْ كلَّ لوحة عشرة بمعادلتها المطابقة:",
          strategyHintAr:
            "صِلْ كلَّ لوحة عشرة بمعادلة الجمع التي تطابق أقراصها، ثم اكتب العدد الناقص في كلّ معادلة مكتملة.",
          params: {
            matchingMode: "ten-frame-to-equation",
            matchMissingPosition: "part2",
            totalRange: [6, 8],
            minPart: 1,
            pairCount: 1,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "معادلة الجمع",
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص الناقصة على لوحة العشرة، ثم اكتب العدد الناقص في المعادلة:",
          strategyHintAr:
            "عدّ الأقراص المرسومة وارسم المكمل حتى تصل إلى الكلّ، ثم اكتب العدد الناقص في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [6, 8],
            minPart: 1,
            unknownPosition: "part2",
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
            "انظر إلى معادلة الجمع ولوحة العشرة، ثم اكتب العدد الناقص في المعادلة:",
          strategyHintAr:
            "عدّ تصاعدياً من الجزء الأول إلى الكلّ، ثم اكتب العدد الناقص بعد علامة +.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 9],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى معادلة الجمع ولوحة العشرة، ثم اكتب العدد الناقص في المعادلة:",
          strategyHintAr:
            "عدّ تصاعدياً من الجزء الأول إلى الكلّ مع الاستعانة بالصفّ العلوي المكتمل (٥)، ثم اكتب العدد الناقص في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص الناقصة على لوحة العشرة، ثم اكتب العدد الناقص في المعادلة:",
          strategyHintAr:
            "ارسم الأقراص حتى تكتمل سعة الكلّ، ثم عدّ الأقراص المرسومة واكتب العدد الناقص في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [6, 10],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب العدد الناقص في كلّ معادلة، ثم صِلْ كلَّ لوحة عشرة بمعادلتها المطابقة:",
          strategyHintAr:
            "صِلْ كلَّ لوحة عشرة بمعادلة الجمع التي تطابق أقراصها، ثم اكتب العدد الناقص في كلّ معادلة مكتملة.",
          params: {
            matchingMode: "ten-frame-to-equation",
            matchMissingPosition: "part2",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "معادلة الجمع",
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص الناقصة على لوحة العشرة، ثم اكتب العدد الناقص في المعادلة:",
          strategyHintAr:
            "عدّ الأقراص المرسومة وارسم المكمل حتى تصل إلى الكلّ، ثم اكتب العدد الناقص في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [6, 10],
            minPart: 1,
            unknownPosition: "part2",
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
            "انظر إلى معادلة الجمع ولوحة العشرة، ثم اكتب العدد الناقص في المعادلة دون العدّ الفردي:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي المكتمل (٥) وعدّ المكمل من الجزء الأول إلى الكلّ، ثم اكتب العدد الناقص.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [7, 10],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى معادلة الجمع ولوحة العشرة، ثم اكتب العدد الناقص في المعادلة:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي المكتمل (٥) وعدّ المكمل من الجزء الأول إلى الكلّ، ثم اكتب العدد الناقص في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            unknownPosition: "part2",
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى الكلّ والجزء الثاني على لوحة العشرة، ثم اكتب الجزء الأول الناقص في المعادلة:",
          strategyHintAr:
            "عدّ تصاعدياً من الجزء الثاني إلى الكلّ، ثم اكتب الجزء الأول الناقص في مطلع المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 9],
            minPart: 1,
            unknownPosition: "part1",
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب العدد الناقص في كلّ معادلة، ثم صِلْ كلَّ لوحة عشرة بمعادلتها المطابقة:",
          strategyHintAr:
            "صِلْ كلَّ لوحة عشرة بمعادلة الجمع التي تطابق أقراصها، ثم اكتب العدد الناقص في كلّ معادلة مكتملة.",
          params: {
            matchingMode: "ten-frame-to-equation",
            matchMissingPosition: "part2",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "معادلة الجمع",
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى الكلّ والجزء الثاني على لوحة العشرة، ثم اكتب الجزء الأول الناقص في المعادلة:",
          strategyHintAr:
            "عدّ تصاعدياً من الجزء الثاني إلى الكلّ، ثم اكتب الجزء الأول الناقص في مطلع المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            unknownPosition: "part1",
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK87Blueprint);

// ============================================================================
// Lesson K-88: Balance Equations - Add within 10* (enrichment, K.CC.7)
// ============================================================================
export const lessonK88Blueprint: LessonBlueprint = {
  lessonId: "K-88",
  grade: "K",
  lessonNumber: 88,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-88"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-88"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JudgeEquality",
          promptAr: "اقرأ كلّ معادلة، ثم اختر صح أو خطأ:",
          strategyHintAr:
            "اجمع الجزأين في التعبير وقارن قيمته بالطرف الآخر، ثم اختر صح عند التساوي.",
          params: {
            operation: "add",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 8],
          },
        },
      ],
      practice: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "اقرأ كلّ معادلة، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "اجمع الجزأين في التعبير وقارن قيمته بالطرف الآخر، ثم اختر صح عند التساوي وخطأ عند الاختلاف.",
          params: {
            operation: "add",
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
            "عدّ الجزأين في كلّ معادلة، ثم اختر صح إذا تساوى الطرفان حول علامة =.",
          params: {
            operation: "add",
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
            "اجمع الجزأين في الكفّة، ثم اختر العدد المناسب من بنك الأعداد واكتبه في الكفّة الأخرى.",
          params: {
            operation: "add",
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
            "اجمع الجزأين في التعبير وقارن قيمته بالطرف الآخر، ثم اختر صح عند التساوي.",
          params: {
            operation: "add",
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
          archetype: "JudgeEquality",
          promptAr: "اقرأ كلّ معادلة، ثم اختر صح أو خطأ:",
          strategyHintAr:
            "اجمع الجزأين في التعبير وقارن قيمته بالطرف الآخر، ثم اختر صح عند التساوي.",
          params: {
            operation: "add",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [6, 9],
          },
        },
      ],
      practice: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "اقرأ كلّ معادلة، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "اجمع الجزأين في التعبير وقارن قيمته بالطرف الآخر، ثم اختر صح عند التساوي وخطأ عند الاختلاف.",
          params: {
            operation: "add",
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
            "عدّ الجزأين في كلّ معادلة، ثم اختر صح إذا تساوى الطرفان في الصيغة القياسية والمعكوسة.",
          params: {
            operation: "add",
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
            "اجمع الجزأين في الكفّة، ثم اختر العدد المناسب من بنك الأعداد واكتبه في الكفّة الأخرى.",
          params: {
            operation: "add",
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
            "اجمع الجزأين في التعبير وقارن قيمته بالطرف الآخر، ثم اختر صح عند التساوي.",
          params: {
            operation: "add",
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
          archetype: "JudgeEquality",
          promptAr: "اقرأ كلّ معادلة، ثم اختر صح أو خطأ:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي المكتمل (٥) واجمع الجزأين بلمحة، ثم اختر صح عند التساوي.",
          params: {
            operation: "add",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            minPart: 1,
            totalRange: [7, 10],
          },
        },
      ],
      practice: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "اقرأ كلّ معادلة، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "اجمع الجزأين في التعبير وقارن قيمته بالطرف الآخر، ثم اختر صح عند التساوي وخطأ عند الاختلاف.",
          params: {
            operation: "add",
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
            "عدّ الجزأين في كلّ معادلة، ثم اختر صح إذا تساوى الطرفان في الصيغة القياسية والمعكوسة.",
          params: {
            operation: "add",
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
            "اجمع الجزأين في كفّة، واجمع الجزأين في الكفّة الأخرى، ثم اختر العدد الذي يوازن الكفّتَين من بنك الأعداد.",
          params: {
            operation: "add",
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
            "اجمع الجزأين في كفّة، ثم اختر العدد المناسب من بنك الأعداد واكتبه في الكفّة الأخرى.",
          params: {
            operation: "add",
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

registerLessonBlueprint(lessonK88Blueprint);
