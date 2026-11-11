import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lessons K-99 to K-102 — Grade K Unit 9 (Numbers to 20): Comparison Foundation
// ============================================================================

// ============================================================================
// Lesson K-99: Compare Groups to 10 with Linear Models (K.CC.6)
// ============================================================================
export const lessonK99Blueprint: LessonBlueprint = {
  lessonId: "K-99",
  grade: "K",
  lessonNumber: 99,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-99"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-99"].teacherNotes,
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
            titleAr: "تمثيل بياني بالصور حتى ٥",
            categories: [
              { objectId: "apple", count: 3, colorTheme: "coral" },
              { objectId: "banana", count: 4, colorTheme: "amber" },
            ],
            responseMode: "trace-and-write",
            maxCount: 5,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين صفّ الموز (٤) وصفّ التفاح (٣): هل عدد الموز هو (١ أكثر) أم (١ أقل)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد الموز (٤) هو ١ أكثر من عدد التفاح (٣)",
          },
        },
      ],
      practice: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى المجموعتين، ثم حوّط المجموعة التي تحوي أكثر:",
          strategyHintAr:
            "انظر إلى التقابل بين الصفين لتحديد القطع الإضافية، ثم حوّط المجموعة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [1, 5],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى المجموعتين، ثم حوّط المجموعة التي تحوي أقل:",
          strategyHintAr:
            "انظر إلى الصف الأقصر الذي تنقصه قطع، ثم حوّط المجموعة الأقل.",
          params: {
            compareMode: "compare-only",
            visualKind: "linear-comparison",
            targetComparison: "fewer",
            numberRange: [1, 5],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى المجموعتين، ثم اكتب أيّهما تحوي أكثر:",
          strategyHintAr:
            "انظر إلى الصف الذي يمتد لمسافة أطول، ثم اكتب اسم المجموعة.",
          params: {
            compareMode: "compare-only",
            visualKind: "linear-comparison",
            responseKind: "fill-keyword",
            targetComparison: "more",
            numberRange: [1, 5],
            itemCount: 1,
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد في المربع:",
          strategyHintAr: "انظر إلى أطوال الصفوف لتحديد الفئة الأكثر أو الأقل.",
          params: {
            orientation: "horizontal",
            titleAr: "فواكه الحديقة حتى ٥",
            categories: [
              { objectId: "apple", count: 3, colorTheme: "coral" },
              { objectId: "banana", count: 5, colorTheme: "amber" },
            ],
            responseMode: "write",
            maxCount: 5,
            includeComparison: true,
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
            titleAr: "تمثيل بياني بالصور حتى ١٠",
            categories: [
              { objectId: "apple", count: 6, colorTheme: "coral" },
              { objectId: "banana", count: 7, colorTheme: "amber" },
            ],
            responseMode: "write",
            maxCount: 10,
          },
        },
      ],
      practice: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى المجموعتين، ثم حوّط المجموعة التي تحوي أكثر:",
          strategyHintAr:
            "انظر إلى التقابل بين الصفين لتحديد القطع الإضافية، ثم حوّط المجموعة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [2, 8],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى المجموعتين، ثم حوّط المجموعة التي تحوي أقل:",
          strategyHintAr:
            "انظر إلى الصف الأقصر الذي تنقصه قطع، ثم حوّط المجموعة الأقل.",
          params: {
            compareMode: "compare-only",
            visualKind: "linear-comparison",
            targetComparison: "fewer",
            numberRange: [2, 8],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى المجموعتين، ثم اكتب أيّهما تحوي أكثر:",
          strategyHintAr:
            "انظر إلى الصف الذي يمتد لمسافة أطول، ثم اكتب اسم المجموعة.",
          params: {
            compareMode: "compare-only",
            visualKind: "linear-comparison",
            responseKind: "fill-keyword",
            targetComparison: "more",
            numberRange: [2, 8],
            itemCount: 1,
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد في المربع:",
          strategyHintAr: "انظر إلى أطوال الصفوف لتحديد الفئة الأكثر أو الأقل.",
          params: {
            orientation: "horizontal",
            titleAr: "ألعاب الأطفال حتى ٨",
            categories: [
              { objectId: "ball", count: 5, colorTheme: "sky" },
              { objectId: "star", count: 7, colorTheme: "amber" },
            ],
            responseMode: "write",
            maxCount: 10,
            includeComparison: true,
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
            titleAr: "تمثيل بياني بالصور حتى ١٠",
            categories: [
              { objectId: "apple", count: 7, colorTheme: "coral" },
              { objectId: "banana", count: 9, colorTheme: "amber" },
            ],
            responseMode: "write",
            maxCount: 10,
          },
        },
      ],
      practice: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى المجموعتين، ثم حوّط المجموعة التي تحوي أكثر:",
          strategyHintAr:
            "انظر إلى التقابل بين الصفين لتحديد القطع الإضافية، ثم حوّط المجموعة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى المجموعتين، ثم حوّط المجموعة التي تحوي أقل:",
          strategyHintAr:
            "انظر إلى الصف الأقصر الذي تنقصه قطع، ثم حوّط المجموعة الأقل.",
          params: {
            compareMode: "compare-only",
            visualKind: "linear-comparison",
            targetComparison: "fewer",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى المجموعتين، ثم اكتب أيّهما تحوي أكثر:",
          strategyHintAr:
            "انظر إلى الصف الذي يمتد لمسافة أطول، ثم اكتب اسم المجموعة.",
          params: {
            compareMode: "compare-only",
            visualKind: "linear-comparison",
            responseKind: "fill-keyword",
            targetComparison: "more",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد في المربع:",
          strategyHintAr: "انظر إلى أطوال الصفوف لتحديد الفئة الأكثر أو الأقل.",
          params: {
            orientation: "horizontal",
            titleAr: "أشياء من الطبيعة حتى ١٠",
            categories: [
              { objectId: "tree", count: 8, colorTheme: "emerald" },
              { objectId: "flower", count: 10, colorTheme: "rose" },
            ],
            responseMode: "write",
            maxCount: 10,
            includeComparison: true,
          },
        },
      ],
    },
  },
};

// ============================================================================
// Lesson K-100: Compare and Quantify Groups to 10 with Linear Models (K.CC.5, K.CC.6)
// ============================================================================
export const lessonK100Blueprint: LessonBlueprint = {
  lessonId: "K-100",
  grade: "K",
  lessonNumber: 100,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-100"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-100"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى المجموعتين، ثم حوّط المجموعة التي تحوي أكثر:",
          strategyHintAr:
            "انظر إلى التقابل بين الصفين لتحديد القطع الإضافية، ثم حوّط المجموعة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [1, 5],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى كل صفّ واكتب العدد، ثم لاحظ القطع الزائدة لتحديد الأكثر.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [1, 5],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأقل:",
          strategyHintAr:
            "انظر إلى كل صفّ واكتب العدد، ثم لاحظ الصف الذي تنقصه قطع لتحديد الأقل.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "linear-comparison",
            targetComparison: "fewer",
            numberRange: [1, 5],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى الأجزاء المتطابقة في الصف الأول أولاً، ثم حوّط المجموعة التي تحوي قطعاً إضافية.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "linear-comparison",
            strategy: "compare-the-parts",
            targetComparison: "more",
            numberRange: [1, 5],
            itemCount: 1,
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "عدّ حيوانات كل فئة واكتب العدد، ثم حوّط العبارة الصحيحة واشطب غير الصحيحة:",
          strategyHintAr:
            "عدّ كل فئة واكتب العدد في المربّع، ثم انظر إلى الأعداد للحكم على صحّة كل عبارة.",
          params: {
            mode: "comparison-statement",
            judgementKind: "comparison-statement",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى المجموعتين، ثم حوّط المجموعة التي تحوي أكثر:",
          strategyHintAr:
            "انظر إلى التقابل بين الصفين لتحديد القطع الإضافية، ثم حوّط المجموعة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [2, 7],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى كل صفّ واكتب العدد، ثم لاحظ القطع الزائدة لتحديد الأكثر.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [2, 8],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأقل:",
          strategyHintAr:
            "انظر إلى كل صفّ واكتب العدد، ثم لاحظ الصف الذي تنقصه قطع لتحديد الأقل.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "linear-comparison",
            targetComparison: "fewer",
            numberRange: [2, 8],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى الأجزاء المتطابقة في الصف الأول أولاً، ثم حوّط المجموعة التي تحوي قطعاً إضافية.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "linear-comparison",
            strategy: "compare-the-parts",
            targetComparison: "more",
            numberRange: [2, 8],
            itemCount: 1,
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "عدّ حيوانات كل فئة واكتب العدد، ثم حوّط العبارة الصحيحة واشطب غير الصحيحة:",
          strategyHintAr:
            "عدّ كل فئة واكتب العدد في المربّع، ثم انظر إلى الأعداد للحكم على صحّة كل عبارة.",
          params: {
            mode: "comparison-statement",
            judgementKind: "comparison-statement",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى المجموعتين، ثم حوّط المجموعة التي تحوي أكثر:",
          strategyHintAr:
            "انظر إلى التقابل بين الصفين لتحديد القطع الإضافية، ثم حوّط المجموعة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [3, 9],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى كل صفّ واكتب العدد، ثم لاحظ القطع الزائدة لتحديد الأكثر.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأقل:",
          strategyHintAr:
            "انظر إلى كل صفّ واكتب العدد، ثم لاحظ الصف الذي تنقصه قطع لتحديد الأقل.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "linear-comparison",
            targetComparison: "fewer",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى الأجزاء المتطابقة في الصف الأول أولاً، ثم حوّط المجموعة التي تحوي قطعاً إضافية.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "linear-comparison",
            strategy: "compare-the-parts",
            targetComparison: "more",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "عدّ حيوانات كل فئة واكتب العدد، ثم حوّط العبارة الصحيحة واشطب غير الصحيحة:",
          strategyHintAr:
            "عدّ كل فئة واكتب العدد في المربّع، ثم انظر إلى الأعداد للحكم على صحّة كل عبارة.",
          params: {
            mode: "comparison-statement",
            judgementKind: "comparison-statement",
          },
        },
      ],
    },
  },
};

// ============================================================================
// Lesson K-101: Compare Groups to 10 with Ten Frames (K.CC.6)
// ============================================================================
export const lessonK101Blueprint: LessonBlueprint = {
  lessonId: "K-101",
  grade: "K",
  lessonNumber: 101,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-101"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-101"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى كل صفّ واكتب العدد، ثم لاحظ القطع الزائدة لتحديد الأكثر.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [1, 5],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم حوّط اللوحة التي تحوي أكثر:",
          strategyHintAr:
            "انظر إلى الخانات الممتلئة في كل لوحة عشرة، ثم حوّط اللوحة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "ten-frame-pair",
            targetComparison: "more",
            numberRange: [1, 6],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم حوّط اللوحة التي تحوي أقل:",
          strategyHintAr:
            "انظر إلى الخانات الفارغة في كل لوحة عشرة، ثم حوّط اللوحة الأقل.",
          params: {
            compareMode: "compare-only",
            visualKind: "ten-frame-pair",
            targetComparison: "fewer",
            numberRange: [1, 6],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب أيّهما تحوي أكثر:",
          strategyHintAr:
            "انظر إلى الخانات الممتلئة في اللوحتين، ثم اكتب اسم اللوحة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "ten-frame-pair",
            responseKind: "fill-keyword",
            targetComparison: "more",
            numberRange: [1, 6],
            itemCount: 1,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كلّ لوحة عشرة بوصف المقارنة المطابق:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم صِلْ بالوصف الذي يقارن بينهما.",
          params: {
            matchingMode: "ten-frame-to-comparison",
            pairCount: 3,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى كل صفّ واكتب العدد، ثم لاحظ القطع الزائدة لتحديد الأكثر.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [2, 8],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم حوّط اللوحة التي تحوي أكثر:",
          strategyHintAr:
            "انظر إلى الخانات الممتلئة في كل لوحة عشرة، ثم حوّط اللوحة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "ten-frame-pair",
            targetComparison: "more",
            numberRange: [2, 8],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم حوّط اللوحة التي تحوي أقل:",
          strategyHintAr:
            "انظر إلى الخانات الفارغة في كل لوحة عشرة، ثم حوّط اللوحة الأقل.",
          params: {
            compareMode: "compare-only",
            visualKind: "ten-frame-pair",
            targetComparison: "fewer",
            numberRange: [2, 8],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب أيّهما تحوي أكثر:",
          strategyHintAr:
            "انظر إلى الخانات الممتلئة في اللوحتين، ثم اكتب اسم اللوحة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "ten-frame-pair",
            responseKind: "fill-keyword",
            targetComparison: "more",
            numberRange: [2, 8],
            itemCount: 1,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كلّ لوحة عشرة بوصف المقارنة المطابق:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم صِلْ بالوصف الذي يقارن بينهما.",
          params: {
            matchingMode: "ten-frame-to-comparison",
            pairCount: 3,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى كل صفّ واكتب العدد، ثم لاحظ القطع الزائدة لتحديد الأكثر.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم حوّط اللوحة التي تحوي أكثر:",
          strategyHintAr:
            "انظر إلى الخانات الممتلئة في كل لوحة عشرة، ثم حوّط اللوحة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "ten-frame-pair",
            targetComparison: "more",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم حوّط اللوحة التي تحوي أقل:",
          strategyHintAr:
            "انظر إلى الخانات الفارغة في كل لوحة عشرة، ثم حوّط اللوحة الأقل.",
          params: {
            compareMode: "compare-only",
            visualKind: "ten-frame-pair",
            targetComparison: "fewer",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب أيّهما تحوي أكثر:",
          strategyHintAr:
            "انظر إلى الخانات الممتلئة في اللوحتين، ثم اكتب اسم اللوحة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "ten-frame-pair",
            responseKind: "fill-keyword",
            targetComparison: "more",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كلّ لوحة عشرة بوصف المقارنة المطابق:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم صِلْ بالوصف الذي يقارن بينهما.",
          params: {
            matchingMode: "ten-frame-to-comparison",
            pairCount: 3,
          },
        },
      ],
    },
  },
};

// ============================================================================
// Lesson K-102: Compare and Quantify Groups to 10 with Ten Frames (K.CC.5, K.CC.6, co-presented)
// ============================================================================
export const lessonK102Blueprint: LessonBlueprint = {
  lessonId: "K-102",
  grade: "K",
  lessonNumber: 102,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-102"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-102"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم حوّط اللوحة التي تحوي أكثر:",
          strategyHintAr:
            "انظر إلى الخانات الممتلئة في كل لوحة عشرة، ثم حوّط اللوحة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "ten-frame-pair",
            targetComparison: "more",
            numberRange: [1, 6],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى أقراص كل لوحة عشرة واكتب العدد، ثم حوّط اللوحة التي تحوي أقراصاً أكثر.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "ten-frame-pair",
            targetComparison: "more",
            numberRange: [2, 6],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب العدد وحوّط الأقل:",
          strategyHintAr:
            "انظر إلى أقراص كل لوحة عشرة واكتب العدد، ثم حوّط اللوحة التي تحوي أقراصاً أقل.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "ten-frame-pair",
            targetComparison: "fewer",
            numberRange: [2, 6],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى الأجزاء المتطابقة في الصف الأول أولاً، ثم حوّط المجموعة التي تحوي قطعاً إضافية.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "ten-frame-pair",
            strategy: "compare-the-parts",
            targetComparison: "more",
            numberRange: [2, 6],
            itemCount: 1,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة بوصف المقارنة المطابق، ثم اكتب الكلّ في المربّع:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم صِلْ بالوصف الذي يقارن بينهما واكتب الكلّ.",
          params: {
            matchingMode: "ten-frame-to-comparison",
            missingTotal: true,
            pairCount: 3,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم حوّط اللوحة التي تحوي أكثر:",
          strategyHintAr:
            "انظر إلى الخانات الممتلئة في كل لوحة عشرة، ثم حوّط اللوحة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "ten-frame-pair",
            targetComparison: "more",
            numberRange: [2, 8],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى أقراص كل لوحة عشرة واكتب العدد، ثم حوّط اللوحة التي تحوي أقراصاً أكثر.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "ten-frame-pair",
            targetComparison: "more",
            numberRange: [3, 8],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب العدد وحوّط الأقل:",
          strategyHintAr:
            "انظر إلى أقراص كل لوحة عشرة واكتب العدد، ثم حوّط اللوحة التي تحوي أقراصاً أقل.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "ten-frame-pair",
            targetComparison: "fewer",
            numberRange: [3, 8],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى الأجزاء المتطابقة في الصف الأول أولاً، ثم حوّط المجموعة التي تحوي قطعاً إضافية.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "ten-frame-pair",
            strategy: "compare-the-parts",
            targetComparison: "more",
            numberRange: [3, 8],
            itemCount: 1,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة بوصف المقارنة المطابق، ثم اكتب الكلّ في المربّع:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم صِلْ بالوصف الذي يقارن بينهما واكتب الكلّ.",
          params: {
            matchingMode: "ten-frame-to-comparison",
            missingTotal: true,
            pairCount: 3,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم حوّط اللوحة التي تحوي أكثر:",
          strategyHintAr:
            "انظر إلى الخانات الممتلئة في كل لوحة عشرة، ثم حوّط اللوحة الأكثر.",
          params: {
            compareMode: "compare-only",
            visualKind: "ten-frame-pair",
            targetComparison: "more",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى أقراص كل لوحة عشرة واكتب العدد، ثم حوّط اللوحة التي تحوي أقراصاً أكثر.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "ten-frame-pair",
            targetComparison: "more",
            numberRange: [4, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب العدد وحوّط الأقل:",
          strategyHintAr:
            "انظر إلى أقراص كل لوحة عشرة واكتب العدد، ثم حوّط اللوحة التي تحوي أقراصاً أقل.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "ten-frame-pair",
            targetComparison: "fewer",
            numberRange: [4, 10],
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى الأجزاء المتطابقة في الصف الأول أولاً، ثم حوّط المجموعة التي تحوي قطعاً إضافية.",
          params: {
            compareMode: "quantify-and-compare",
            visualKind: "ten-frame-pair",
            strategy: "compare-the-parts",
            targetComparison: "more",
            numberRange: [4, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة بوصف المقارنة المطابق، ثم اكتب الكلّ في المربّع:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم صِلْ بالوصف الذي يقارن بينهما واكتب الكلّ.",
          params: {
            matchingMode: "ten-frame-to-comparison",
            missingTotal: true,
            pairCount: 3,
          },
        },
      ],
    },
  },
};

// Register all four lesson blueprints
registerLessonBlueprint(lessonK99Blueprint);
registerLessonBlueprint(lessonK100Blueprint);
registerLessonBlueprint(lessonK101Blueprint);
registerLessonBlueprint(lessonK102Blueprint);
