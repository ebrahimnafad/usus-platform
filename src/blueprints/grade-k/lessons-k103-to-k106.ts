import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lessons K-103 to K-106 — Grade K Unit 9 (Numbers to 20): Teen Numbers
// Foundation, Measurement, and Dot Arrays
// ============================================================================

// ============================================================================
// Lesson K-103: Identify and Trace Numbers 11–20 (K.CC.3)
// ============================================================================
export const lessonK103Blueprint: LessonBlueprint = {
  lessonId: "K-103",
  grade: "K",
  lessonNumber: 103,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-103"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-103"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى مجموعة الأدوات اليومية، ثم اكتب العدد وتتبّع الرقم (١١، ١٢):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) ثم عدّ القليل الإضافي واكتب الكلّ.",
          params: {
            modelKind: "everyday-object",
            targetNumbers: [11, 12],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى مجموعة الأدوات اليومية، ثم اكتب العدد وتتبّع الرقم (١١–١٥):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) ثم عدّ القليل الإضافي واكتب الكلّ.",
          params: {
            modelKind: "everyday-object",
            targetNumbers: [11, 12, 13, 14, 15],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأدوات في كل مجموعة، ثم اكتب العدد وتتبّع الرقم (١١–١٥):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة ثم أضف عدد القليل الإضافي.",
          params: {
            modelKind: "everyday-object",
            targetNumbers: [11, 12, 13, 14, 15],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة الكاملة ثم عدّ القليل الإضافي واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) وتعرّف عليها بلمحة واحدة دون عدّ فردي، ثم أضف القليل الإضافي.",
          params: {
            subitizeMode: "decompose-teen",
            cardCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr: "انظر إلى المجموعة، ثم تتبّع الرقم واكتبه (١١–١٥):",
          strategyHintAr:
            "انظر إلى خانتَي العشرات والآحاد، ثم تتبّعهما واكتب العدد كاملاً.",
          params: {
            modelKind: "everyday-object",
            targetNumbers: [11, 12, 13, 14, 15],
            itemCount: 2,
            responseStyle: "trace-and-write",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى مجموعة الأدوات اليومية، ثم اكتب العدد وتتبّع الرقم (١٣، ١٤):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) ثم عدّ القليل الإضافي واكتب الكلّ.",
          params: {
            modelKind: "everyday-object",
            targetNumbers: [13, 14],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى مجموعة الأدوات اليومية، ثم اكتب العدد وتتبّع الرقم (١١–٢٠):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) ثم عدّ القليل الإضافي واكتب الكلّ.",
          params: {
            modelKind: "everyday-object",
            targetNumbers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأدوات في كل مجموعة، ثم اكتب العدد وتتبّع الرقم (١١–٢٠):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة ثم أضف عدد القليل الإضافي.",
          params: {
            modelKind: "everyday-object",
            targetNumbers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة الكاملة ثم عدّ القليل الإضافي واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) وتعرّف عليها بلمحة واحدة دون عدّ فردي، ثم أضف القليل الإضافي.",
          params: {
            subitizeMode: "decompose-teen",
            cardCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr: "انظر إلى المجموعة، ثم تتبّع الرقم واكتبه (١١–٢٠):",
          strategyHintAr:
            "انظر إلى خانتَي العشرات والآحاد، ثم تتبّعهما واكتب العدد كاملاً.",
          params: {
            modelKind: "everyday-object",
            targetNumbers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            itemCount: 2,
            responseStyle: "trace-and-write",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى مجموعة الأدوات اليومية، ثم اكتب العدد وتتبّع الرقم (١٥–٢٠):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) ثم عدّ القليل الإضافي واكتب الكلّ.",
          params: {
            modelKind: "everyday-object",
            targetNumbers: [15, 16, 17, 18, 19, 20],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى مجموعة الأدوات اليومية، ثم اكتب العدد وتتبّع الرقم (١١–٢٠):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) ثم عدّ القليل الإضافي واكتب الكلّ.",
          params: {
            modelKind: "everyday-object",
            targetNumbers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأدوات في كل مجموعة، ثم اكتب العدد وتتبّع الرقم (١١–٢٠):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة ثم أضف عدد القليل الإضافي.",
          params: {
            modelKind: "everyday-object",
            targetNumbers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة الكاملة ثم عدّ القليل الإضافي واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) وتعرّف عليها بلمحة واحدة دون عدّ فردي، ثم أضف القليل الإضافي.",
          params: {
            subitizeMode: "decompose-teen",
            cardCount: 2,
            candidateCounts: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr: "انظر إلى المجموعة، ثم تتبّع الرقم واكتبه (١١–٢٠):",
          strategyHintAr:
            "انظر إلى خانتَي العشرات والآحاد، ثم تتبّعهما واكتب العدد كاملاً.",
          params: {
            modelKind: "everyday-object",
            targetNumbers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            itemCount: 2,
            responseStyle: "trace-and-write",
          },
        },
      ],
    },
  },
};

// Register the lesson blueprint
registerLessonBlueprint(lessonK103Blueprint);

// ============================================================================
// Lesson K-104: Read and Write Teen Numbers in Picture Graphs (K.CC.3, K.MD.B.3 co-presented)
// ============================================================================
export const lessonK104Blueprint: LessonBlueprint = {
  lessonId: "K-104",
  grade: "K",
  lessonNumber: 104,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-104"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-104"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد في المربع:",
          strategyHintAr:
            "انظر إلى كل صفّ أفقي واقرأ الرقم المقابل لآخر خانة على المحور الأفقي.",
          params: {
            orientation: "horizontal",
            titleAr: "تمثيل بياني بالصور حتى ١٠",
            categories: [
              { objectId: "book", count: 6, colorTheme: "sky" },
              { objectId: "pencil", count: 7, colorTheme: "amber" },
            ],
            responseMode: "trace-and-write",
            maxCount: 10,
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد (١١–١٥):",
          strategyHintAr:
            "انظر إلى الصفّ الأول الكامل (١٠) ثم أكمل العدّ في الصفّ الثاني واكتب الكلّ.",
          params: {
            orientation: "horizontal",
            titleAr: "أدواتنا في الصف (١١–١٥)",
            categories: [
              { objectId: "book", count: 12, colorTheme: "sky" },
              { objectId: "pencil", count: 14, colorTheme: "amber" },
              { objectId: "crayon", count: 13, colorTheme: "coral" },
            ],
            responseMode: "trace-and-write",
            maxCount: 20,
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد (١١–١٥):",
          strategyHintAr:
            "انظر إلى الصفّ الأول الكامل (١٠) ثم أكمل العدّ في الصفّ الثاني واكتب الكلّ.",
          params: {
            orientation: "horizontal",
            titleAr: "أدواتنا في الصف (١١–١٥)",
            categories: [
              { objectId: "backpack", count: 11, colorTheme: "violet" },
              { objectId: "book", count: 13, colorTheme: "sky" },
            ],
            responseMode: "write",
            maxCount: 20,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة الكاملة والمكعبات الإضافية ثم اكتب الكلّ:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) وتعرّف عليها بلمحة واحدة دون عدّ فردي، ثم أضف القليل الإضافي.",
          params: {
            subitizeMode: "decompose-teen",
            solidId: "cube",
            cardCount: 2,
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الصور في كل صفّ ثم اختر المقارنة الصحيحة بين الصفّين:",
          strategyHintAr:
            "انظر إلى أطوال الصفوف لتحديد الفئة الأكثر أو الأقل ثم اختر.",
          params: {
            orientation: "horizontal",
            titleAr: "مقارنة الأدوات (١١–١٥)",
            categories: [
              { objectId: "pencil", count: 14, colorTheme: "amber" },
              { objectId: "book", count: 13, colorTheme: "sky" },
            ],
            responseMode: "write",
            maxCount: 20,
            includeComparison: true,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين صفّ الأقلام (١٤) وصفّ الدفاتر (١٣): هل عدد الأقلام هو (١ أكثر) أم (١ أقل) أم (نفس العدد)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد الأقلام (١٤) هو ١ أكثر من عدد الدفاتر (١٣)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد في المربع:",
          strategyHintAr:
            "انظر إلى كل صفّ أفقي واقرأ الرقم المقابل لآخر خانة على المحور الأفقي.",
          params: {
            orientation: "horizontal",
            titleAr: "تمثيل بياني بالصور حتى ١٥",
            categories: [
              { objectId: "book", count: 13, colorTheme: "sky" },
              { objectId: "pencil", count: 15, colorTheme: "amber" },
            ],
            responseMode: "trace-and-write",
            maxCount: 20,
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد (١١–٢٠):",
          strategyHintAr:
            "انظر إلى الصفّ الأول الكامل (١٠) ثم أكمل العدّ في الصفّ الثاني واكتب الكلّ.",
          params: {
            orientation: "horizontal",
            titleAr: "أدواتنا في الصف (١١–٢٠)",
            categories: [
              { objectId: "book", count: 17, colorTheme: "sky" },
              { objectId: "pencil", count: 19, colorTheme: "amber" },
              { objectId: "crayon", count: 15, colorTheme: "coral" },
            ],
            responseMode: "trace-and-write",
            maxCount: 20,
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد (١١–٢٠):",
          strategyHintAr:
            "انظر إلى الصفّ الأول الكامل (١٠) ثم أكمل العدّ في الصفّ الثاني واكتب الكلّ.",
          params: {
            orientation: "horizontal",
            titleAr: "أدواتنا في الصف (١١–٢٠)",
            categories: [
              { objectId: "backpack", count: 16, colorTheme: "violet" },
              { objectId: "book", count: 20, colorTheme: "sky" },
            ],
            responseMode: "write",
            maxCount: 20,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة الكاملة والمكعبات الإضافية ثم اكتب الكلّ:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) وتعرّف عليها بلمحة واحدة دون عدّ فردي، ثم أضف القليل الإضافي.",
          params: {
            subitizeMode: "decompose-teen",
            solidId: "cube",
            cardCount: 2,
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الصور في كل صفّ ثم اختر المقارنة الصحيحة بين الصفّين:",
          strategyHintAr:
            "انظر إلى أطوال الصفوف لتحديد الفئة الأكثر أو الأقل ثم اختر.",
          params: {
            orientation: "horizontal",
            titleAr: "مقارنة الأدوات (١١–٢٠)",
            categories: [
              { objectId: "pencil", count: 18, colorTheme: "amber" },
              { objectId: "book", count: 17, colorTheme: "sky" },
            ],
            responseMode: "write",
            maxCount: 20,
            includeComparison: true,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين صفّ الأقلام (١٨) وصفّ الدفاتر (١٧): هل عدد الأقلام هو (١ أكثر) أم (١ أقل) أم (نفس العدد)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد الأقلام (١٨) هو ١ أكثر من عدد الدفاتر (١٧)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد في المربع:",
          strategyHintAr:
            "انظر إلى كل صفّ أفقي واقرأ الرقم المقابل لآخر خانة على المحور الأفقي.",
          params: {
            orientation: "horizontal",
            titleAr: "تمثيل بياني بالصور حتى ٢٠",
            categories: [
              { objectId: "book", count: 16, colorTheme: "sky" },
              { objectId: "pencil", count: 18, colorTheme: "amber" },
            ],
            responseMode: "trace-and-write",
            maxCount: 20,
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد (١١–٢٠):",
          strategyHintAr:
            "انظر إلى الصفّ الأول الكامل (١٠) ثم أكمل العدّ في الصفّ الثاني واكتب الكلّ.",
          params: {
            orientation: "horizontal",
            titleAr: "أدواتنا في الصف (١١–٢٠)",
            categories: [
              { objectId: "book", count: 18, colorTheme: "sky" },
              { objectId: "pencil", count: 20, colorTheme: "amber" },
              { objectId: "crayon", count: 16, colorTheme: "coral" },
            ],
            responseMode: "trace-and-write",
            maxCount: 20,
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد (١١–٢٠):",
          strategyHintAr:
            "انظر إلى الصفّ الأول الكامل (١٠) ثم أكمل العدّ في الصفّ الثاني واكتب الكلّ.",
          params: {
            orientation: "horizontal",
            titleAr: "أدواتنا في الصف (١١–٢٠)",
            categories: [
              { objectId: "backpack", count: 19, colorTheme: "violet" },
              { objectId: "book", count: 20, colorTheme: "sky" },
            ],
            responseMode: "write",
            maxCount: 20,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة الكاملة والمكعبات الإضافية ثم اكتب الكلّ:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) وتعرّف عليها بلمحة واحدة دون عدّ فردي، ثم أضف القليل الإضافي.",
          params: {
            subitizeMode: "decompose-teen",
            solidId: "cube",
            cardCount: 2,
            candidateCounts: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الصور في كل صفّ ثم اختر المقارنة الصحيحة بين الصفّين:",
          strategyHintAr:
            "انظر إلى أطوال الصفوف لتحديد الفئة الأكثر أو الأقل ثم اختر.",
          params: {
            orientation: "horizontal",
            titleAr: "مقارنة الأدوات (١١–٢٠)",
            categories: [
              { objectId: "pencil", count: 20, colorTheme: "amber" },
              { objectId: "book", count: 19, colorTheme: "sky" },
            ],
            responseMode: "write",
            maxCount: 20,
            includeComparison: true,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين صفّ الأقلام (٢٠) وصفّ الدفاتر (١٩): هل عدد الأقلام هو (١ أكثر) أم (١ أقل) أم (نفس العدد)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد الأقلام (٢٠) هو ١ أكثر من عدد الدفاتر (١٩)",
          },
        },
      ],
    },
  },
};

// Register the lesson blueprint
registerLessonBlueprint(lessonK104Blueprint);

// ============================================================================
// Lesson K-105: Measure Total Side Length of Polygons (K.CC.5, K.G.4)
// Reuses MeasureAndCompareLength (polygon-perimeter) and ConnectMatch
// (shape-to-description) — no archetype changes needed.
// ============================================================================
export const lessonK105Blueprint: LessonBlueprint = {
  lessonId: "K-105",
  grade: "K",
  lessonNumber: 105,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-105"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-105"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ مشابك الورق حول محيط كل شكل ثم اكتب قياس المحيط في المربع:",
          strategyHintAr:
            "عدّ مشابك الورق على جميع أضلاع الشكل واجمعها لمعرفة قياس المحيط الكلّي.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "triangle",
                shapeNameAr: "مثلث",
                sideCount: 3,
                clipsPerSide: 1,
                totalClips: 3,
                colorTheme: "amber",
              },
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                clipsPerSide: 1,
                totalClips: 4,
                colorTheme: "sky",
              },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ محيط كل شكل بعدّ مشابك الورق على أضلاعه ثم اكتب المحيط في المربع:",
          strategyHintAr:
            "عدّ مشابك كل ضلع واجمعها معاً لإيجاد العدد الكلّي للمشابك حول الشكل.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "triangle",
                shapeNameAr: "مثلث",
                sideCount: 3,
                clipsPerSide: 2,
                totalClips: 6,
                colorTheme: "amber",
              },
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                clipsPerSide: 1,
                totalClips: 4,
                colorTheme: "sky",
              },
            ],
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ أضلاع كل شكل ثم عدّ مشابك المحيط واكتب العددين في المربعين:",
          strategyHintAr:
            "انظر إلى أضلاع كل شكل وعدّها أولاً، ثم اجمع مشابك كل ضلع لمعرفة المحيط.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                clipsPerSide: 2,
                totalClips: 8,
                colorTheme: "sky",
              },
              {
                shapeId: "triangle",
                shapeNameAr: "مثلث",
                sideCount: 3,
                clipsPerSide: 1,
                totalClips: 3,
                colorTheme: "coral",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "انظر إلى الشكل، ثم اكتب اسمه وعدد أضلاعه وعدد مشابك محيطه:",
          strategyHintAr:
            "انظر إلى الشكل وعدّ أضلاعه، ثم اجمع مشابك المحيط كلها واكتب العدد.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                clipsPerSide: 1,
                totalClips: 5,
                colorTheme: "violet",
              },
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                clipsPerSide: 2,
                totalClips: 8,
                colorTheme: "sky",
              },
            ],
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل شكل بالوصف المطابق لمحيطه ثم اكتب العدد الناقص في المربع:",
          strategyHintAr:
            "عدّ مشابك المحيط لكل مضلّع، ثم صِلْ بالوصف المناسب واكتب عدد المشابك في الفراغ.",
          params: {
            matchingMode: "shape-to-description",
            pairCount: 3,
            customCandidatePairs: [
              {
                id: "tri",
                right: {
                  id: "poly-tri",
                  kind: "polygon-perimeter",
                  count: 3,
                  labelAr: "مثلث",
                  colorTheme: "amber",
                  meta: {
                    shapeId: "triangle",
                    sideCount: 3,
                    clipsPerSide: 1,
                    totalClips: 3,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-tri",
                  kind: "shape-description",
                  count: 3,
                  labelAr: "مثلث محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr: "مثلث محيطه بمشابك الورق يساوي",
                    missingNumber: 3,
                  },
                },
                reasonAr: "محيط المثلث = ٣ أضلاع × ١ مشبك يساوي ٣",
              },
              {
                id: "square",
                right: {
                  id: "poly-square",
                  kind: "polygon-perimeter",
                  count: 4,
                  labelAr: "مربع",
                  colorTheme: "sky",
                  meta: {
                    shapeId: "square",
                    sideCount: 4,
                    clipsPerSide: 1,
                    totalClips: 4,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-square",
                  kind: "shape-description",
                  count: 4,
                  labelAr: "مربع محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr: "مربع محيطه بمشابك الورق يساوي",
                    missingNumber: 4,
                  },
                },
                reasonAr: "محيط المربع = ٤ أضلاع × ١ مشبك يساوي ٤",
              },
              {
                id: "rect",
                right: {
                  id: "poly-rect",
                  kind: "polygon-perimeter",
                  count: 8,
                  labelAr: "مستطيل",
                  colorTheme: "emerald",
                  meta: {
                    shapeId: "rectangle",
                    sideCount: 4,
                    clipsPerSide: 2,
                    totalClips: 8,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-rect",
                  kind: "shape-description",
                  count: 8,
                  labelAr:
                    "مستطيل كلّ ضلع فيه مشبكان، محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr:
                      "مستطيل كلّ ضلع فيه مشبكان، محيطه بمشابك الورق يساوي",
                    missingNumber: 8,
                  },
                },
                reasonAr: "محيط المستطيل = ٤ أضلاع × ٢ مشابك يساوي ٨",
              },
            ],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ مشابك الورق حول محيط كل شكل ثم اكتب قياس المحيط في المربع:",
          strategyHintAr:
            "عدّ مشابك الورق على جميع أضلاع الشكل واجمعها لمعرفة قياس المحيط الكلّي.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                clipsPerSide: 2,
                totalClips: 8,
                colorTheme: "sky",
              },
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                clipsPerSide: 1,
                totalClips: 5,
                colorTheme: "violet",
              },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ محيط كل شكل بعدّ مشابك الورق على أضلاعه ثم اكتب المحيط في المربع:",
          strategyHintAr:
            "عدّ مشابك كل ضلع واجمعها معاً لإيجاد العدد الكلّي للمشابك حول الشكل.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                clipsPerSide: 2,
                totalClips: 10,
                colorTheme: "violet",
              },
              {
                shapeId: "rectangle",
                shapeNameAr: "مستطيل",
                sideCount: 4,
                clipsPerSide: 2,
                totalClips: 8,
                colorTheme: "emerald",
              },
            ],
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ أضلاع كل شكل ثم عدّ مشابك المحيط واكتب العددين في المربعين:",
          strategyHintAr:
            "انظر إلى أضلاع كل شكل وعدّها أولاً، ثم اجمع مشابك كل ضلع لمعرفة المحيط.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "hexagon",
                shapeNameAr: "سداسي",
                sideCount: 6,
                clipsPerSide: 1,
                totalClips: 6,
                colorTheme: "teal",
              },
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                clipsPerSide: 2,
                totalClips: 10,
                colorTheme: "violet",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "انظر إلى الشكل، ثم اكتب اسمه وعدد أضلاعه وعدد مشابك محيطه:",
          strategyHintAr:
            "انظر إلى الشكل وعدّ أضلاعه، ثم اجمع مشابك المحيط كلها واكتب العدد.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "hexagon",
                shapeNameAr: "سداسي",
                sideCount: 6,
                clipsPerSide: 2,
                totalClips: 12,
                colorTheme: "teal",
              },
              {
                shapeId: "rectangle",
                shapeNameAr: "مستطيل",
                sideCount: 4,
                clipsPerSide: 2,
                totalClips: 8,
                colorTheme: "emerald",
              },
            ],
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل شكل بالوصف المطابق لمحيطه ثم اكتب العدد الناقص في المربع:",
          strategyHintAr:
            "عدّ مشابك المحيط لكل مضلّع، ثم صِلْ بالوصف المناسب واكتب عدد المشابك في الفراغ.",
          params: {
            matchingMode: "shape-to-description",
            pairCount: 3,
            customCandidatePairs: [
              {
                id: "pent",
                right: {
                  id: "poly-pent",
                  kind: "polygon-perimeter",
                  count: 10,
                  labelAr: "خماسي",
                  colorTheme: "violet",
                  meta: {
                    shapeId: "pentagon",
                    sideCount: 5,
                    clipsPerSide: 2,
                    totalClips: 10,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-pent",
                  kind: "shape-description",
                  count: 10,
                  labelAr: "خماسي كلّ ضلع فيه مشبكان، محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr:
                      "خماسي كلّ ضلع فيه مشبكان، محيطه بمشابك الورق يساوي",
                    missingNumber: 10,
                  },
                },
                reasonAr: "محيط الخماسي = ٥ أضلاع × ٢ مشابك يساوي ١٠",
              },
              {
                id: "rect",
                right: {
                  id: "poly-rect",
                  kind: "polygon-perimeter",
                  count: 8,
                  labelAr: "مستطيل",
                  colorTheme: "emerald",
                  meta: {
                    shapeId: "rectangle",
                    sideCount: 4,
                    clipsPerSide: 2,
                    totalClips: 8,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-rect",
                  kind: "shape-description",
                  count: 8,
                  labelAr:
                    "مستطيل كلّ ضلع فيه مشبكان، محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr:
                      "مستطيل كلّ ضلع فيه مشبكان، محيطه بمشابك الورق يساوي",
                    missingNumber: 8,
                  },
                },
                reasonAr: "محيط المستطيل = ٤ أضلاع × ٢ مشابك يساوي ٨",
              },
              {
                id: "hex",
                right: {
                  id: "poly-hex",
                  kind: "polygon-perimeter",
                  count: 6,
                  labelAr: "سداسي",
                  colorTheme: "teal",
                  meta: {
                    shapeId: "hexagon",
                    sideCount: 6,
                    clipsPerSide: 1,
                    totalClips: 6,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-hex",
                  kind: "shape-description",
                  count: 6,
                  labelAr:
                    "سداسي كلّ ضلع فيه مشبك واحد، محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr:
                      "سداسي كلّ ضلع فيه مشبك واحد، محيطه بمشابك الورق يساوي",
                    missingNumber: 6,
                  },
                },
                reasonAr: "محيط السداسي = ٦ أضلاع × ١ مشبك يساوي ٦",
              },
            ],
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ مشابك الورق حول محيط كل شكل ثم اكتب قياس المحيط في المربع:",
          strategyHintAr:
            "عدّ مشابك الورق على جميع أضلاع الشكل واجمعها لمعرفة قياس المحيط الكلّي.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "hexagon",
                shapeNameAr: "سداسي",
                sideCount: 6,
                clipsPerSide: 2,
                totalClips: 12,
                colorTheme: "teal",
              },
              {
                shapeId: "pentagon",
                shapeNameAr: "خماسي",
                sideCount: 5,
                clipsPerSide: 1,
                totalClips: 5,
                colorTheme: "violet",
              },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ محيط كل شكل بعدّ مشابك الورق على أضلاعه ثم اكتب المحيط في المربع:",
          strategyHintAr:
            "عدّ مشابك كل ضلع واجمعها معاً لإيجاد العدد الكلّي للمشابك حول الشكل.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "hexagon",
                shapeNameAr: "سداسي",
                sideCount: 6,
                clipsPerSide: 2,
                totalClips: 12,
                colorTheme: "teal",
              },
              {
                shapeId: "octagon",
                shapeNameAr: "ثماني",
                sideCount: 8,
                clipsPerSide: 1,
                totalClips: 8,
                colorTheme: "coral",
              },
            ],
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "عدّ أضلاع كل شكل ثم عدّ مشابك المحيط واكتب العددين في المربعين:",
          strategyHintAr:
            "انظر إلى أضلاع كل شكل وعدّها أولاً، ثم اجمع مشابك كل ضلع لمعرفة المحيط.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "octagon",
                shapeNameAr: "ثماني",
                sideCount: 8,
                clipsPerSide: 2,
                totalClips: 16,
                colorTheme: "coral",
              },
              {
                shapeId: "hexagon",
                shapeNameAr: "سداسي",
                sideCount: 6,
                clipsPerSide: 1,
                totalClips: 6,
                colorTheme: "teal",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "انظر إلى الشكل، ثم اكتب اسمه وعدد أضلاعه وعدد مشابك محيطه:",
          strategyHintAr:
            "انظر إلى الشكل وعدّ أضلاعه، ثم اجمع مشابك المحيط كلها واكتب العدد.",
          params: {
            mode: "polygon-perimeter",
            polygons: [
              {
                shapeId: "heptagon",
                shapeNameAr: "سباعي",
                sideCount: 7,
                clipsPerSide: 2,
                totalClips: 14,
                colorTheme: "rose",
              },
              {
                shapeId: "square",
                shapeNameAr: "مربع",
                sideCount: 4,
                clipsPerSide: 2,
                totalClips: 8,
                colorTheme: "sky",
              },
            ],
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل شكل بالوصف المطابق لمحيطه ثم اكتب العدد الناقص في المربع:",
          strategyHintAr:
            "عدّ مشابك المحيط لكل مضلّع، ثم صِلْ بالوصف المناسب واكتب عدد المشابك في الفراغ.",
          params: {
            matchingMode: "shape-to-description",
            pairCount: 3,
            customCandidatePairs: [
              {
                id: "hex",
                right: {
                  id: "poly-hex",
                  kind: "polygon-perimeter",
                  count: 12,
                  labelAr: "سداسي",
                  colorTheme: "teal",
                  meta: {
                    shapeId: "hexagon",
                    sideCount: 6,
                    clipsPerSide: 2,
                    totalClips: 12,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-hex",
                  kind: "shape-description",
                  count: 12,
                  labelAr: "سداسي كلّ ضلع فيه مشبكان، محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr:
                      "سداسي كلّ ضلع فيه مشبكان، محيطه بمشابك الورق يساوي",
                    missingNumber: 12,
                  },
                },
                reasonAr: "محيط السداسي = ٦ أضلاع × ٢ مشابك يساوي ١٢",
              },
              {
                id: "oct",
                right: {
                  id: "poly-oct",
                  kind: "polygon-perimeter",
                  count: 8,
                  labelAr: "ثماني",
                  colorTheme: "coral",
                  meta: {
                    shapeId: "octagon",
                    sideCount: 8,
                    clipsPerSide: 1,
                    totalClips: 8,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-oct",
                  kind: "shape-description",
                  count: 8,
                  labelAr:
                    "ثماني كلّ ضلع فيه مشبك واحد، محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr:
                      "ثماني كلّ ضلع فيه مشبك واحد، محيطه بمشابك الورق يساوي",
                    missingNumber: 8,
                  },
                },
                reasonAr: "محيط الثماني = ٨ أضلاع × ١ مشبك يساوي ٨",
              },
              {
                id: "hept",
                right: {
                  id: "poly-hept",
                  kind: "polygon-perimeter",
                  count: 14,
                  labelAr: "سباعي",
                  colorTheme: "rose",
                  meta: {
                    shapeId: "heptagon",
                    sideCount: 7,
                    clipsPerSide: 2,
                    totalClips: 14,
                    mode: "polygon-perimeter",
                    compact: true,
                  },
                },
                left: {
                  id: "desc-hept",
                  kind: "shape-description",
                  count: 14,
                  labelAr: "سباعي كلّ ضلع فيه مشبكان، محيطه بمشابك الورق يساوي",
                  meta: {
                    textAr:
                      "سباعي كلّ ضلع فيه مشبكان، محيطه بمشابك الورق يساوي",
                    missingNumber: 14,
                  },
                },
                reasonAr: "محيط السباعي = ٧ أضلاع × ٢ مشابك يساوي ١٤",
              },
            ],
          },
        },
      ],
    },
  },
};

// Register the lesson blueprint
registerLessonBlueprint(lessonK105Blueprint);

// ============================================================================
// Lesson K-106: Model Numbers using Arrays, Near Arrays & Digits (K.CC.2, K.CC.4)
// Uses SequenceAndZero with the new dot-array visual for teen counting
// (WB forward / PoD backward arrows) and tally marks to 20 (COUNT & CONNECT BB).
// ============================================================================
export const lessonK106Blueprint: LessonBlueprint = {
  lessonId: "K-106",
  grade: "K",
  lessonNumber: 106,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-106"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-106"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr: "عدّ المكعبات في كل خطوة ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "انظر إلى البرج في كل خطوة ثم اكتب العدد الذي يزيد بواحد.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [1, 2, 3, 4, 5],
            missingValues: [2, 4],
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr: "عدّ نقاط كل مصفوفة ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "انظر إلى الصفّ الكامل (١٠) بلمحة واحدة ثم عدّ نقاط الصفّ الثاني الملفوف.",
          params: {
            sequenceMode: "forward",
            visualKind: "dot-array",
            numbers: [11, 12, 13, 14, 15],
            missingValues: [12, 14],
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "صِلْ كل مصفوفة نقطية بالمصفوفة التي تزيد عنها بواحد ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "عدّ من اليمين إلى اليسار واكتب عدد النقاط في كل خطوة من العدّ.",
          params: {
            sequenceMode: "forward",
            visualKind: "dot-array",
            numbers: [10, 11, 12, 13, 14],
            missingValues: [11, 13],
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "ارسم أسهماً للعدّ التنازلي بين المصفوفات النقطية ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "انظر إلى كل مصفوفة نقطية ثم اكتب العدد الذي يقلّ بواحد في كل خطوة.",
          params: {
            sequenceMode: "backward",
            visualKind: "dot-array",
            numbers: [15, 14, 13, 12, 11],
            missingValues: [14, 12],
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "ارسم بقية علامات العدّ لكل عدد ثم عدّ تصاعدياً من ١٦ واكتب الأعداد الناقصة:",
          strategyHintAr:
            "عدّ الحزم الخماسية أولاً (كل حزمة تساوي ٥) ثم أكمل العدّ بالعصيّ الفردية.",
          params: {
            sequenceMode: "forward",
            visualKind: "tally-marks",
            numbers: [16, 17, 18, 19, 20],
            missingValues: [17, 19],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr: "عدّ المكعبات في كل خطوة ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "انظر إلى البرج في كل خطوة ثم اكتب العدد الذي يزيد بواحد حتى العشرة.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [6, 7, 8, 9, 10],
            missingValues: [7, 9],
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr: "عدّ نقاط كل مصفوفة ثم اكتب الأعداد الناقصة حتى ٢٠:",
          strategyHintAr:
            "انظر إلى الصفّين الكاملين (٢٠) بلمحة واحدة ثم عدّ النقاط الناقصة.",
          params: {
            sequenceMode: "forward",
            visualKind: "dot-array",
            numbers: [16, 17, 18, 19, 20],
            missingValues: [17, 19],
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "صِلْ كل مصفوفة نقطية بالمصفوفة التي تزيد عنها بواحد ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "عدّ من اليمين إلى اليسار واكتب عدد النقاط في كل خطوة من العدّ.",
          params: {
            sequenceMode: "forward",
            visualKind: "dot-array",
            numbers: [12, 13, 14, 15, 16],
            missingValues: [13, 15],
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "ارسم أسهماً للعدّ التنازلي بين المصفوفات النقطية ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "انظر إلى كل مصفوفة نقطية ثم اكتب العدد الذي يقلّ بواحد في كل خطوة حتى تصل إلى ١٦.",
          params: {
            sequenceMode: "backward",
            visualKind: "dot-array",
            numbers: [20, 19, 18, 17, 16],
            missingValues: [19, 17],
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "ارسم بقية علامات العدّ لكل عدد ثم عدّ تصاعدياً من ١٦ واكتب الأعداد الناقصة:",
          strategyHintAr:
            "عدّ الحزم الخماسية أولاً (كل حزمة تساوي ٥) ثم أكمل العدّ بالعصيّ الفردية.",
          params: {
            sequenceMode: "forward",
            visualKind: "tally-marks",
            numbers: [16, 17, 18, 19, 20],
            missingValues: [17, 19, 20],
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr: "عدّ المكعبات في كل خطوة ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "انظر إلى البرج في كل خطوة ثم اكتب العدد الذي يزيد بواحد حتى العشرة.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [5, 6, 7, 8, 9],
            missingValues: [6, 8],
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr: "عدّ نقاط كل مصفوفة ثم اكتب الأعداد الناقصة حتى ٢٠:",
          strategyHintAr:
            "انظر إلى الصفّين الكاملين (٢٠) بلمحة واحدة ثم عدّ النقاط الناقصة.",
          params: {
            sequenceMode: "forward",
            visualKind: "dot-array",
            numbers: [16, 17, 18, 19, 20],
            missingValues: [17, 19, 20],
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "صِلْ كل مصفوفة نقطية بالمصفوفة التي تزيد عنها بواحد ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "عدّ من اليمين إلى اليسار واكتب عدد النقاط في كل خطوة من العدّ.",
          params: {
            sequenceMode: "forward",
            visualKind: "dot-array",
            numbers: [14, 15, 16, 17, 18],
            missingValues: [15, 17, 18],
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "ارسم أسهماً للعدّ التنازلي بين المصفوفات النقطية ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "انظر إلى كل مصفوفة نقطية ثم اكتب العدد الذي يقلّ بواحد في كل خطوة حتى تصل إلى ١٦.",
          params: {
            sequenceMode: "backward",
            visualKind: "dot-array",
            numbers: [20, 19, 18, 17, 16],
            missingValues: [19, 17, 16],
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "ارسم بقية علامات العدّ لكل عدد ثم عدّ تصاعدياً من ١٦ واكتب الأعداد الناقصة:",
          strategyHintAr:
            "عدّ الحزم الخماسية أولاً (كل حزمة تساوي ٥) ثم أكمل العدّ بالعصيّ الفردية.",
          params: {
            sequenceMode: "forward",
            visualKind: "tally-marks",
            numbers: [16, 17, 18, 19, 20],
            missingValues: [18, 19, 20],
          },
        },
      ],
    },
  },
};

// Register the lesson blueprint
registerLessonBlueprint(lessonK106Blueprint);
