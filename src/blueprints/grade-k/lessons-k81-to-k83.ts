import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lesson K-81: Add by Subitizing Counters in Ten Frames & Digits
// ============================================================================
export const lessonK81Blueprint: LessonBlueprint = {
  lessonId: "K-81",
  grade: "K",
  lessonNumber: 81,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-81"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-81"].teacherNotes,
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
            totalRange: [6, 8],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة والرقم، ثم تتبّع الكلّ في معادلة الجمع:",
          strategyHintAr:
            "انظر إلى أقراص لوحة العشرة واعرف عددها بلمحة (الصفّ العلوي كامل فهو ٥)، ثم أضف الرقم المكتوب وتتبّع الكلّ في المعادلة.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "equation",
            action: "trace",
            totalRange: [6, 8],
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة والرقم، ثم اكتب الكلّ في معادلة الجمع دون عدّ فردي:",
          strategyHintAr:
            "اجمع الجزء الممثّل بأقراص لوحة العشرة مع الرقم المكتوب ذهنياً (الصفّ العلوي كامل فهو ٥)، ثم اكتب الكلّ في مربع الإجابة.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 8],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "Numtanga",
          promptAr:
            "انظر إلى بطاقات نمتنغا، ثم اكتب في كل مربّع فارغ ناتج جمع القيمتين المتجاورتين:",
          strategyHintAr:
            "اجمع قيمة أيّ بطاقتين متجاورتين، ثم اكتب ناتج الجمع في المربّع الأعلى منهما.",
          params: {
            blankCount: 1,
            maxTotal: 8,
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
            "اجمع الجزأين الممثّلين في لوحة العشرة واكتب الكلّ في دائرة الكلّ.",
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
          promptAr:
            "انظر إلى لوحة العشرة والرقم، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "اجمع الجزء الممثّل بأقراص لوحة العشرة مع الرقم المكتوب ذهنياً (الصفّ العلوي كامل فهو ٥)، ثم اكتب الكلّ في مربع الإجابة.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 10],
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة والرقم، ثم اكتب الجزأين والكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى أقراص لوحة العشرة واكتب عددهم في الرابطة من جهة اليمين، ثم أضف الرقم المكتوب كجزء ثانٍ واكتب الكلّ في دائرة الكلّ.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 10],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "Numtanga",
          promptAr:
            "انظر إلى بطاقات نمتنغا، ثم اكتب في كل مربّع فارغ ناتج جمع القيمتين المتجاورتين:",
          strategyHintAr:
            "اجمع قيمة أيّ بطاقتين متجاورتين، ثم اكتب ناتج الجمع في المربّع الأعلى منهما.",
          params: {
            blankCount: 1,
            maxTotal: 10,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة والرقم، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "اجمع الجزء الممثّل بأقراص لوحة العشرة مع الرقم المكتوب ذهنياً ثم اكتب الكلّ في مربع الإجابة دون عدّ فردي.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "equation",
            action: "write",
            totalRange: [7, 10],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة والرقم (قد يكون الجزء ٠)، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "انظر إلى الأقراص واكتب الكلّ نفسه في المعادلة، فحتى لو كان أحد الجزأين ٠ لا يتغيّر الكلّ.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 10],
            itemCount: 2,
            minPart: 0,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص لتمثيل الجزأين في لوحة العشرة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "ارسم أقراص الجزأين من اليمين إلى اليسار في لوحة العشرة ثم اكتب الكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [6, 10],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "Numtanga",
          promptAr:
            "انظر إلى بطاقات نمتنغا، ثم اكتب في كل مربّع فارغ ناتج جمع القيمتين المتجاورتين:",
          strategyHintAr:
            "اجمع قيمة أيّ بطاقتين متجاورتين، ثم اكتب ناتج الجمع في المربّع أعلى منهما مباشرة؛ ابدأ بالمربّع الفارغ الأقرب إلى الصفّ السفلي.",
          params: {
            blankCount: 2,
            maxTotal: 10,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK81Blueprint);

// ============================================================================
// Lesson K-82: Add by Subitizing Counters in Ten Frames & Number Bonds
// ============================================================================
export const lessonK82Blueprint: LessonBlueprint = {
  lessonId: "K-82",
  grade: "K",
  lessonNumber: 82,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-82"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-82"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة والرقم، ثم تتبّع الكلّ في معادلة الجمع:",
          strategyHintAr:
            "انظر إلى أقراص لوحة العشرة واعرف عددها بلمحة (الصفّ العلوي كامل فهو ٥)، ثم أضف الرقم المكتوب وتتبّع الكلّ في المعادلة.",
          params: {
            representation: "ten-frame-and-digit",
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
          promptAr:
            "اقرأ رابطة الأعداد، ثم ارسم الأقراص في لوحة العشرة واكتب الكلّ:",
          strategyHintAr:
            "اقرأ الجزأين من رابطة الأعداد ثم ارسمهما أقراصاً في لوحة العشرة من اليمين إلى اليسار، واكتب الكلّ في الدائرة.",
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
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزأين والكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى أقراص لوحة العشرة واكتب الجزأين والكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 8],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "Numtanga",
          promptAr:
            "انظر إلى بطاقات نمتنغا، ثم اكتب في كل مربّع فارغ ناتج جمع القيمتين المتجاورتين:",
          strategyHintAr:
            "اجمع قيمة أيّ بطاقتين متجاورتين، ثم اكتب ناتج الجمع في المربّع الأعلى منهما.",
          params: {
            blankCount: 1,
            maxTotal: 8,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزأين والكلّ في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص في لوحة العشرة واكتب الجزأين والكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 9],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "اقرأ رابطة الأعداد، ثم ارسم الأقراص في لوحة العشرة واكتب الكلّ:",
          strategyHintAr:
            "اقرأ الجزأين من رابطة الأعداد ثم ارسمهما أقراصاً في لوحة العشرة من اليمين إلى اليسار، واكتب الكلّ في الدائرة.",
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
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزأين والكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى أقراص لوحة العشرة واكتب الجزأين والكلّ في رابطة الأعداد.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [6, 10],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "Numtanga",
          promptAr:
            "انظر إلى بطاقات نمتنغا، ثم اكتب في كل مربّع فارغ ناتج جمع القيمتين المتجاورتين:",
          strategyHintAr:
            "اجمع قيمة أيّ بطاقتين متجاورتين واكتب الكلّ في المربّع أعلاهما، ثم اعتمد نتيجة الطبقة السفلية لحساب المربّع العلوي.",
          params: {
            blankCount: 2,
            maxTotal: 10,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة والرقم (قد يكون الجزء ٠)، ثم اكتب الجزأين والكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الأقراص واكتب الجزأين والكلّ نفسه في الرابطة، فحتى مع وجود ٠ في أحد الجزأين يبقى الكلّ كما هو.",
          params: {
            representation: "ten-frame-and-digit",
            responseForm: "number-bond",
            action: "write",
            totalRange: [7, 10],
            itemCount: 2,
            minPart: 0,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "اقرأ رابطة الأعداد، ثم ارسم الأقراص في لوحة العشرة واكتب الكلّ:",
          strategyHintAr:
            "اقرأ الجزأين من رابطة الأعداد وابدأ بالجزء الأكبر لتجميعه بلمحة، ثم ارسم الأقراص في لوحة العشرة واكتب الكلّ في الدائرة.",
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
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزأين والكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى أقراص لوحة العشرة واكتب الكلّ من الذاكرة بلمحة، ثم تحقّق بالعدّ مرة واحدة عند الحاجة.",
          params: {
            representation: "ten-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [7, 10],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "Numtanga",
          promptAr:
            "انظر إلى بطاقات نمتنغا، ثم اكتب في كل مربّع فارغ ناتج جمع القيمتين المتجاورتين:",
          strategyHintAr:
            "اجمع قيمة أيّ بطاقتين متجاورتين واكتب الكلّ في المربّع أعلاهما، ثم اعتمد نتيجة الطبقة السفلية لحساب المربّع العلوي.",
          params: {
            blankCount: 2,
            maxTotal: 10,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص في لوحة العشرة لتمثيل الجزأين، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "ارسم أقراص الجزء الأول من جهة اليمين ثم الجزء الثاني بعده، واكتب الكلّ في مربع الإجابة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [7, 10],
            itemCount: 2,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK82Blueprint);

// ============================================================================
// Lesson K-83: Add by Subitizing Counters in Ten Frames & Equations
// ============================================================================
export const lessonK83Blueprint: LessonBlueprint = {
  lessonId: "K-83",
  grade: "K",
  lessonNumber: 83,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-83"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-83"].teacherNotes,
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
          promptAr:
            "اقرأ معادلة الجمع، ثم ارسم الأقراص في لوحة العشرة واكتب الكلّ:",
          strategyHintAr:
            "اقرأ معادلة الجمع من اليمين إلى اليسار ثم ارسم أقراص الجزأين في لوحة العشرة، واكتب ناتج الجمع في مربع الإجابة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [6, 10],
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "انظر إلى أقراص لوحة العشرة واعرف الكلّ بلمحة (الصفّ العلوي كامل فهو ٥) ثم اكتب ناتج الجمع في مربع الإجابة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 10],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "Numtanga",
          promptAr:
            "انظر إلى بطاقات نمتنغا، ثم اكتب في كل مربّع فارغ ناتج جمع القيمتين المتجاورتين:",
          strategyHintAr:
            "اجمع قيمة أيّ بطاقتين متجاورتين، ثم اكتب ناتج الجمع في المربّع الأعلى منهما.",
          params: {
            blankCount: 1,
            maxTotal: 8,
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
          promptAr:
            "اقرأ معادلة الجمع، ثم ارسم الأقراص في لوحة العشرة واكتب الكلّ:",
          strategyHintAr:
            "اقرأ معادلة الجمع من اليمين إلى اليسار ثم ارسم أقراص الجزأين في لوحة العشرة، واكتب ناتج الجمع في مربع الإجابة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [6, 10],
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "انظر إلى أقراص لوحة العشرة واكتب الكلّ من الذاكرة بلمحة دون عدّ فردي.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [6, 10],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "Numtanga",
          promptAr:
            "انظر إلى بطاقات نمتنغا، ثم اكتب في كل مربّع فارغ ناتج جمع القيمتين المتجاورتين:",
          strategyHintAr:
            "اجمع قيمة أيّ بطاقتين متجاورتين واكتب الكلّ في المربّع أعلاهما، ثم اعتمد نتيجة الطبقة السفلية لحساب المربّع العلوي.",
          params: {
            blankCount: 2,
            maxTotal: 10,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة العشرة، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "انظر إلى أقراص لوحة العشرة واعرف الكلّ من الذاكرة ثم اكتب ناتج الجمع دون عدّ فردي.",
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
            "اقرأ معادلة الجمع، ثم ارسم الأقراص في لوحة العشرة واكتب الكلّ:",
          strategyHintAr:
            "اقرأ معادلة الجمع من اليمين إلى اليسار ثم ارسم أقراص الجزأين في لوحة العشرة، واكتب ناتج الجمع في مربع الإجابة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [7, 10],
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى لوحة العشرة (قد يكون أحد الجزأين ٠)، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "انظر إلى الأقراص واكتب الكلّ في مربع الإجابة، فحتى مع وجود ٠ في أحد الجزأين يبقى ناتج الجمع نفسه.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [7, 10],
            itemCount: 2,
            minPart: 0,
          },
        },
      ],
      challenge: [
        {
          archetype: "Numtanga",
          promptAr:
            "انظر إلى بطاقات نمتنغا، ثم اكتب في كل مربّع فارغ ناتج جمع القيمتين المتجاورتين:",
          strategyHintAr:
            "اجمع قيمة أيّ بطاقتين متجاورتين واكتب الكلّ في المربّع أعلاهما، ثم اعتمد نتيجة الطبقة السفلية لحساب المربّع العلوي.",
          params: {
            blankCount: 3,
            maxTotal: 10,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص في لوحة العشرة لتمثيل الجزأين، ثم اكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "ارسم أقراص الجزء الأول من جهة اليمين ثم الجزء الثاني بعده، واكتب الكلّ في مربع الإجابة.",
          params: {
            representation: "ten-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [7, 10],
            itemCount: 2,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK83Blueprint);
