import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lesson K-74: Number Bonds using the Shift 1 Strategy
// ============================================================================
export const lessonK74Blueprint: LessonBlueprint = {
  lessonId: "K-74",
  grade: "K",
  lessonNumber: 74,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-74"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-74"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى نمط إزاحة ١ في الرابطتين الأوليين، ثم اكتب الأجزاء لإكمال النمط:",
          strategyHintAr:
            "انظر إلى الزوجين الأولين، ثم اطرح ١ من الجزء الأيمن واجمع ١ إلى الجزء الأيسر.",
          params: {
            mode: "complete-pattern",
            totalRange: [5, 6],
            stepCount: 3,
          },
        },
      ],
      practice: [
        {
          archetype: "ShiftOneDecompose",
          promptAr: "انظر إلى روابط الأعداد، ثم اكتب أزواج الأجزاء بإزاحة ١:",
          strategyHintAr:
            "انظر إلى الزوج الأوّل (الكلّ و٠)، ثم نفّذ إزاحة ١ في كل خطوة.",
          params: {
            mode: "all-combinations",
            targetTotal: 6,
            action: "trace-first",
            showFiveFrames: false,
            stepCount: 3,
          },
        },
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى رابطة الأعداد الأصلية، ثم اكتب الزوج المعكوس للكلّ نفسه:",
          strategyHintAr:
            "اكتب الجزأين بالترتيب المعكوس لإيجاد الزوج المعكوس الذي يعطي الكلّ نفسه.",
          params: {
            mode: "turnaround-pairs",
            targetTotal: 6,
            action: "trace-first",
            pairCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "اشطب أقلام الرصاص المعطاة في كل صف، ثم اكتب كم بقي وقارن بين الصفّين:",
          strategyHintAr:
            "اشطب أقلام الرصاص في كل صف، ثم اكتب كم بقي واكتب مقدار النقصان عند إزاحة ١.",
          params: {
            mode: "give-away",
            targetTotal: 6,
            objectId: "pencil",
            crossOffMode: "student",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى نمط إزاحة ١ في الرابطتين الأوليين، ثم اكتب الأجزاء لإكمال النمط:",
          strategyHintAr:
            "انظر إلى الزوجين الأولين، ثم أكمل النمط بإزاحة ١ في كل خطوة.",
          params: {
            mode: "complete-pattern",
            totalRange: [6, 7],
            stepCount: 3,
          },
        },
      ],
      practice: [
        {
          archetype: "ShiftOneDecompose",
          promptAr: "انظر إلى روابط الأعداد، ثم اكتب أزواج الأجزاء بإزاحة ١:",
          strategyHintAr:
            "اكتب أزواج الأعداد بإزاحة ١ بطرح ١ من الجزء الأيمن وإضافته إلى الجزء الأيسر.",
          params: {
            mode: "all-combinations",
            totalRange: [8, 9],
            action: "write",
            showFiveFrames: false,
            stepCount: 3,
          },
        },
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى رابطة الأعداد الأصلية، ثم اكتب الزوج المعكوس للكلّ نفسه:",
          strategyHintAr:
            "اكتب الجزأين بالترتيب المعكوس لإيجاد الزوج المعكوس الذي يعطي الكلّ نفسه.",
          params: {
            mode: "turnaround-pairs",
            totalRange: [7, 8],
            action: "write",
            pairCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "اشطب أقلام الرصاص المعطاة في كل صف، ثم اكتب كم بقي وقارن بين الصفّين:",
          strategyHintAr:
            "اشطب أقلام الرصاص في كل صف، ثم اكتب كم بقي واكتب مقدار النقصان عند إزاحة ١.",
          params: {
            mode: "give-away",
            totalRange: [7, 9],
            objectId: "pencil",
            crossOffMode: "student",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى نمط إزاحة ١ في الرابطتين الأوليين، ثم اكتب الأجزاء لإكمال النمط:",
          strategyHintAr:
            "انظر إلى النمط واطرح ١ من الجزء الأيمن واجمع ١ إلى الجزء الأيسر في كل خطوة.",
          params: {
            mode: "complete-pattern",
            totalRange: [7, 8],
            stepCount: 3,
          },
        },
      ],
      practice: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى روابط الأعداد للكلّ ١٠، ثم اكتب أزواج الأجزاء بإزاحة ١:",
          strategyHintAr:
            "اكتب أزواج الأعداد للكلّ ١٠ بدءاً من (١٠ و٠) بطرح ١ وإضافته للجزء الآخر.",
          params: {
            mode: "all-combinations",
            targetTotal: 10,
            action: "write",
            showFiveFrames: false,
            stepCount: 3,
          },
        },
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "انظر إلى روابط الأعداد الأصلية، ثم اكتب الأزواج المعكوسة للكلّ نفسه:",
          strategyHintAr:
            "اكتب الجزأين بالترتيب المعكوس لإيجاد الزوج المعكوس الذي يعطي الكلّ نفسه.",
          params: {
            mode: "turnaround-pairs",
            totalRange: [8, 10],
            action: "write",
            pairCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ShiftOneDecompose",
          promptAr:
            "اشطب أقلام الرصاص المعطاة في كل صف، ثم اكتب كم بقي وقارن بين الصفّين:",
          strategyHintAr:
            "اشطب أقلام الرصاص في كل صف، ثم اكتب كم بقي واكتب مقدار النقصان عند إزاحة ١.",
          params: {
            mode: "give-away",
            totalRange: [8, 10],
            objectId: "pencil",
            crossOffMode: "student",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK74Blueprint);

// ============================================================================
// Lesson K-78: Count and Quantify using Number Bonds & Ten Frames
// ============================================================================
export const lessonK78Blueprint: LessonBlueprint = {
  lessonId: "K-78",
  grade: "K",
  lessonNumber: 78,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-78"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-78"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة، ثم تتبّع الجزأين والكلّ في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص في لوحة العشرة وتتبّع الأعداد المكتوبة في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "trace",
            totalRange: [6, 7],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص لتمثيل الجزأين في لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "ارسم أقراص الجزء الثاني لإكمال لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [6, 8],
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "عدّ المجسّمات في كل جزء، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "عدّ المجسّمات في الجزأين واكتب عددها الكلّي في دائرة الكلّ.",
          params: {
            representation: "pictures",
            pictureSubkind: "solid-shapes",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 8],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة برابطة الأعداد المطابقة، ثم اكتب الكلّ في الدائرة:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة برابطة الأعداد المطابقة، ثم اكتب الكلّ في الدائرة.",
          params: {
            matchingMode: "ten-frame-to-bond",
            pairCount: 2,
            totalRange: [6, 8],
            minPart: 1,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "رابطة الأعداد",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "اجمع الجزأين الممثّلين في لوحة العشرة واكتب الكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 8],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص لتمثيل الجزأين في لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "ارسم أقراص الجزء الثاني في لوحة العشرة واكتب الكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [6, 10],
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "عدّ المجسّمات في كل جزء، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "عدّ المجسّمات في كل جزء واكتب العدد الكلّي في رابطة الأعداد.",
          params: {
            representation: "pictures",
            pictureSubkind: "solid-shapes",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 10],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة برابطة الأعداد المطابقة، ثم اكتب الكلّ في الدائرة:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة برابطة الأعداد المطابقة، ثم اكتب الكلّ في الدائرة.",
          params: {
            matchingMode: "ten-frame-to-bond",
            pairCount: 2,
            totalRange: [6, 10],
            minPart: 1,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "رابطة الأعداد",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr: "اجمع أقراص لوحة العشرة واكتب الكلّ في دائرة الكلّ.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [7, 10],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص لتمثيل الجزأين في لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "ارسم أقراص الجزء الثاني في لوحة العشرة واكتب الكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [7, 10],
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "عدّ المجسّمات في كل جزء، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "عدّ المجسّمات في الجزأين واكتب الكلّ في رابطة الأعداد.",
          params: {
            representation: "pictures",
            pictureSubkind: "solid-shapes",
            responseForm: "number-bond",
            action: "write",
            totalRange: [7, 10],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة برابطة الأعداد المطابقة، ثم اكتب الكلّ في الدائرة:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة برابطة الأعداد المطابقة، ثم اكتب الكلّ في الدائرة.",
          params: {
            matchingMode: "ten-frame-to-bond",
            pairCount: 2,
            totalRange: [7, 10],
            minPart: 0,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "رابطة الأعداد",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK78Blueprint);

// ============================================================================
// Lesson K-79: Find the Total using Number Bonds & Ten Frames
// ============================================================================
export const lessonK79Blueprint: LessonBlueprint = {
  lessonId: "K-79",
  grade: "K",
  lessonNumber: 79,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-79"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-79"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم تتبّع الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص في لوحة العشرة وتتبّع العدد في دائرة الكلّ.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "trace",
            totalRange: [6, 8],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "اجمع أقراص الجزأين في لوحة العشرة واكتب الكلّ في الدائرة.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 8],
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص للتحقّق من لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "ارسم الأقراص لكلا الجزأين ثم اكتب الكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [6, 8],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى روابط الأعداد في المتاهة، ثم حوّط الرابطة التي يكون الكلّ فيها ٩:",
          strategyHintAr:
            "اجمع الجزأين في كل رابطة أعداد، وحوّط الرابطة التي مجموع جزأيها يساوي ٩.",
          params: {
            subitizeMode: "number-bond-maze",
            targetTotal: 9,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr: "اجمع الجزأين لإيجاد الكلّ واكتبه في دائرة الكلّ.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 9],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "اجمع أقراص لوحة العشرة واكتب الكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [7, 10],
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص للتحقّق من لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "ارسم الأقراص لكلا الجزأين ثم اكتب الكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [7, 10],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى روابط الأعداد في المتاهة، ثم حوّط الرابطة التي يكون الكلّ فيها ٩:",
          strategyHintAr:
            "اجمع الجزأين في كل رابطة أعداد، وحوّط الرابطة التي مجموع جزأيها يساوي ٩.",
          params: {
            subitizeMode: "number-bond-maze",
            targetTotal: 9,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "اجمع أقراص لوحة العشرة واكتب الكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [8, 10],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الجزء المعطى في لوحة العشرة واكتب الجزء الناقص في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [8, 10],
            unknownPosition: "part2",
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص للتحقّق من لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "ارسم الأقراص لكلا الجزأين ثم اكتب الكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [8, 10],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى روابط الأعداد في المتاهة، ثم حوّط الرابطة التي يكون الكلّ فيها ٩:",
          strategyHintAr:
            "اجمع الجزأين في كل رابطة أعداد، وحوّط الرابطة التي مجموع جزأيها يساوي ٩.",
          params: {
            subitizeMode: "number-bond-maze",
            targetTotal: 9,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK79Blueprint);

// ============================================================================
// Lesson K-80: Find the Total using Equations & Ten Frames
// ============================================================================
export const lessonK80Blueprint: LessonBlueprint = {
  lessonId: "K-80",
  grade: "K",
  lessonNumber: 80,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-80"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-80"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم تتبّع معادلة الجمع لكتابة الكلّ:",
          strategyHintAr:
            "عدّ أقراص لوحة العشرة وتتبّع ناتج الجمع في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "trace",
            totalRange: [6, 8],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم تتبّع الكلّ في معادلة الجمع:",
          strategyHintAr:
            "عدّ أقراص لوحة العشرة وتتبّع ناتج الجمع في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "trace",
            totalRange: [6, 8],
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr: "اجمع أقراص لوحة العشرة واكتب الكلّ في مربع الإجابة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 8],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص للتحقّق في لوحة العشرة، ثم اكتب الكلّ في المعادلة:",
          strategyHintAr:
            "ارسم الأقراص لكلا الجزأين ثم اكتب الكلّ في معادلة الجمع.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [6, 8],
            itemCount: 2,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة بمعادلة الجمع المطابقة، ثم اكتب الكلّ في المربّع:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة بمعادلة الجمع المطابقة، ثم اكتب الكلّ في المربّع.",
          params: {
            matchingMode: "ten-frame-to-equation",
            pairCount: 2,
            totalRange: [6, 8],
            minPart: 1,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "معادلة الجمع",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr: "اجمع أقراص لوحة العشرة واكتب الكلّ في مربع الإجابة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 9],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "اجمع الجزأين من اليمين إلى اليسار واكتب الكلّ في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [7, 10],
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr: "اجمع أقراص لوحة العشرة واكتب الكلّ في معادلة الجمع.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [7, 10],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص للتحقّق في لوحة العشرة، ثم اكتب الكلّ في المعادلة:",
          strategyHintAr:
            "ارسم الأقراص لكلا الجزأين ثم اكتب الكلّ في معادلة الجمع.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [7, 10],
            itemCount: 2,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة بمعادلة الجمع المطابقة، ثم اكتب الكلّ في المربّع:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة بمعادلة الجمع المطابقة، ثم اكتب الكلّ في المربّع.",
          params: {
            matchingMode: "ten-frame-to-equation",
            pairCount: 2,
            totalRange: [7, 10],
            minPart: 1,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "معادلة الجمع",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr: "اجمع أقراص لوحة العشرة واكتب الكلّ في مربع الإجابة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [8, 10],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الجمع:",
          strategyHintAr:
            "انظر إلى الجزء المعطى في لوحة العشرة واكتب الجزء الناقص في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [8, 10],
            unknownPosition: "part2",
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزء الناقص في معادلة الجمع:",
          strategyHintAr:
            "انظر إلى الجزء المعطى في لوحة العشرة واكتب الجزء الناقص في المعادلة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [8, 10],
            unknownPosition: "part1",
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص للتحقّق في لوحة العشرة، ثم اكتب الكلّ في المعادلة:",
          strategyHintAr:
            "ارسم الأقراص لكلا الجزأين ثم اكتب الكلّ في معادلة الجمع.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [8, 10],
            itemCount: 2,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة بمعادلة الجمع المطابقة، ثم اكتب الكلّ في المربّع:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة بمعادلة الجمع المطابقة، ثم اكتب الكلّ في المربّع.",
          params: {
            matchingMode: "ten-frame-to-equation",
            pairCount: 2,
            totalRange: [8, 10],
            minPart: 0,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "معادلة الجمع",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK80Blueprint);
