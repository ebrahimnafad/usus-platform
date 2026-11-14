import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lessons K-107 to K-110 — Grade K Unit 9 (Numbers to 20): Compare Difference
// and Subitize to 20
// ============================================================================

// ============================================================================
// Lesson K-107*: Compare How Many More or Fewer with Linear Models (K.CC.6)
// ============================================================================
export const lessonK107Blueprint: LessonBlueprint = {
  lessonId: "K-107",
  grade: "K",
  lessonNumber: 107,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-107"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-107"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr: "انظر إلى الصفّين، ثم اكتب العدد وحوّط الأكثر:",
          strategyHintAr:
            "انظر إلى كل صفّ واكتب العدد، ثم انظر إلى القطع الزائدة لتحديد الأكثر.",
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
          promptAr:
            "انظر إلى الصفّين، ثم عدّ قطع كلّ صفّ واكتب كم أكثر في المربع:",
          strategyHintAr:
            "انظر إلى القطع الزائدة في الصفّ الأطول ثم اكتب عددها في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [1, 5],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى الصفّين، ثم عدّ قطع كلّ صفّ واكتب كم أقلّ في المربع:",
          strategyHintAr:
            "انظر إلى القطع الناقصة في الصفّ الأقصر ثم اكتب عددها في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
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
          promptAr:
            "انظر إلى مجسّمات الصفّين، ثم اكتب عدد القطع الإضافية في المجموعة الأكثر:",
          strategyHintAr:
            "انظر إلى الأجزاء المتطابقة بين الصفّين أولاً، ثم عدّ المجسّمات الزائدة في الصفّ الأطول.",
          params: {
            compareMode: "find-difference",
            visualKind: "linear-comparison",
            iconSetKind: "solids-3d",
            targetComparison: "more",
            numberRange: [3, 7],
            itemCount: 1,
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr: "اقرأ التمثيل البياني بالصور، ثم اكتب كم أكثر في المربع:",
          strategyHintAr:
            "اقرأ العددين من الصفّين ثم اكتب الفرق بينهما في مربّع الإجابة.",
          params: {
            orientation: "horizontal",
            titleAr: "جرأة على المقارنة (أ) — فواكه حتى ٢٠",
            categories: [
              { objectId: "apple", count: 10, colorTheme: "coral" },
              { objectId: "banana", count: 12, colorTheme: "amber" },
            ],
            responseMode: "write",
            maxCount: 20,
            includeComparison: true,
            comparisonKind: "find-difference",
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
            "انظر إلى كل صفّ واكتب العدد، ثم انظر إلى القطع الزائدة لتحديد الأكثر.",
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
          promptAr:
            "انظر إلى الصفّين، ثم عدّ قطع كلّ صفّ واكتب كم أكثر في المربع:",
          strategyHintAr:
            "انظر إلى القطع الزائدة في الصفّ الأطول ثم اكتب عددها في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [2, 8],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى الصفّين، ثم عدّ قطع كلّ صفّ واكتب كم أقلّ في المربع:",
          strategyHintAr:
            "انظر إلى القطع الناقصة في الصفّ الأقصر ثم اكتب عددها في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
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
          promptAr:
            "انظر إلى مجسّمات الصفّين، ثم اكتب عدد القطع الإضافية في المجموعة الأكثر:",
          strategyHintAr:
            "انظر إلى الأجزاء المتطابقة بين الصفّين أولاً، ثم عدّ المجسّمات الزائدة في الصفّ الأطول.",
          params: {
            compareMode: "find-difference",
            visualKind: "linear-comparison",
            iconSetKind: "solids-3d",
            targetComparison: "more",
            numberRange: [4, 9],
            itemCount: 1,
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr: "اقرأ التمثيل البياني بالصور، ثم اكتب كم أكثر في المربع:",
          strategyHintAr:
            "اقرأ العددين من الصفّين ثم اكتب الفرق بينهما في مربّع الإجابة.",
          params: {
            orientation: "horizontal",
            titleAr: "جرأة على المقارنة (أ) — أدوات حتى ٢٠",
            categories: [
              { objectId: "ball", count: 13, colorTheme: "sky" },
              { objectId: "star", count: 17, colorTheme: "amber" },
            ],
            responseMode: "write",
            maxCount: 20,
            includeComparison: true,
            comparisonKind: "find-difference",
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
            "انظر إلى كل صفّ واكتب العدد، ثم انظر إلى القطع الزائدة لتحديد الأكثر.",
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
          promptAr:
            "انظر إلى الصفّين، ثم عدّ قطع كلّ صفّ واكتب كم أكثر في المربع (قد تكون المجموعتان متساويتين):",
          strategyHintAr:
            "انظر إلى الأجزاء المتطابقة بين الصفّين أولاً؛ فإن كانتا متساويتين فاكتب ٠.",
          params: {
            compareMode: "find-difference",
            visualKind: "linear-comparison",
            targetComparison: "more",
            numberRange: [3, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى الصفّين، ثم عدّ قطع كلّ صفّ واكتب كم أقلّ في المربع (قد تكون المجموعتان متساويتين):",
          strategyHintAr:
            "انظر إلى الأجزاء المتطابقة بين الصفّين أولاً؛ فإن كانتا متساويتين فاكتب ٠.",
          params: {
            compareMode: "find-difference",
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
          promptAr:
            "انظر إلى مجسّمات الصفّين، ثم اكتب عدد القطع الإضافية في المجموعة الأكثر (قد تكون المجموعتان متساويتين):",
          strategyHintAr:
            "انظر إلى الأجزاء المتطابقة بين الصفّين أولاً؛ فإن كانتا متساويتين فاكتب ٠.",
          params: {
            compareMode: "find-difference",
            visualKind: "linear-comparison",
            iconSetKind: "solids-3d",
            targetComparison: "more",
            numberRange: [5, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr: "اقرأ التمثيل البياني بالصور، ثم اكتب كم أكثر في المربع:",
          strategyHintAr:
            "اقرأ العددين من الصفّين ثم اكتب الفرق بينهما في مربّع الإجابة.",
          params: {
            orientation: "horizontal",
            titleAr: "جرأة على المقارنة (أ) — أشياء من الطبيعة حتى ٢٠",
            categories: [
              { objectId: "flower", count: 15, colorTheme: "rose" },
              { objectId: "tree", count: 20, colorTheme: "emerald" },
            ],
            responseMode: "write",
            maxCount: 20,
            includeComparison: true,
            comparisonKind: "find-difference",
          },
        },
      ],
    },
  },
};

// ============================================================================
// Lesson K-108*: Compare How Many More or Fewer with Ten Frames (K.CC.6)
// ============================================================================
export const lessonK108Blueprint: LessonBlueprint = {
  lessonId: "K-108",
  grade: "K",
  lessonNumber: 108,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-108"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-108"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى الصفّين، ثم عدّ قطع كلّ صفّ واكتب كم أكثر في المربع:",
          strategyHintAr:
            "انظر إلى القطع الزائدة في الصفّ الأطول ثم اكتب عددها في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
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
          promptAr:
            "انظر إلى لوحتي العشرة، ثم عدّ الأقراص واكتب العددين وكم أكثر في المربع:",
          strategyHintAr:
            "انظر إلى الصفّ الخماسي المكتمل في كل لوحة كمرتكز سريع، ثم عدّ الأقراص الزائدة في اللوحة الأكثر واكتب عددها في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
            visualKind: "ten-frame-pair",
            targetComparison: "more",
            numberRange: [2, 6],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى لوحتي العشرة، ثم عدّ الأقراص واكتب العددين وكم أقلّ في المربع:",
          strategyHintAr:
            "انظر إلى الأقراص الناقصة في اللوحة الأقل ثم اكتب عددها في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
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
          promptAr:
            "انظر إلى الأشكال الناقصة في اللوحة الأقل، ثم اكتب كم أقلّ في المربع:",
          strategyHintAr:
            "انظر إلى الأشكال الشبحية الناقصة في اللوحة الأقل؛ اللوحة الأكثر ممتلئة حتى ١٠، فاكتب عددها مباشرة في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
            visualKind: "ten-frame-pair",
            iconSetKind: "solids-3d",
            anchorFullFrame: true,
            showMissingAsGhost: true,
            targetComparison: "fewer",
            numberRange: [5, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى العددين المعطى على لوحتي العشرة، ثم اكتب الفرق بينهما في المربع:",
          strategyHintAr:
            "اقرأ العددين المعطى ثم اكتب الفرق بينهما في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
            visualKind: "ten-frame-pair",
            showCounts: true,
            targetComparison: "more",
            numberRange: [4, 10],
            itemCount: 1,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى الصفّين، ثم عدّ قطع كلّ صفّ واكتب كم أكثر في المربع:",
          strategyHintAr:
            "انظر إلى القطع الزائدة في الصفّ الأطول ثم اكتب عددها في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
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
          promptAr:
            "انظر إلى لوحتي العشرة، ثم عدّ الأقراص واكتب العددين وكم أكثر في المربع:",
          strategyHintAr:
            "انظر إلى الصفّ الخماسي المكتمل في كل لوحة كمرتكز سريع، ثم عدّ الأقراص الزائدة في اللوحة الأكثر واكتب عددها في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
            visualKind: "ten-frame-pair",
            targetComparison: "more",
            numberRange: [3, 8],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى لوحتي العشرة، ثم عدّ الأقراص واكتب العددين وكم أقلّ في المربع:",
          strategyHintAr:
            "انظر إلى الأقراص الناقصة في اللوحة الأقل ثم اكتب عددها في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
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
          promptAr:
            "انظر إلى الأشكال الناقصة في اللوحة الأقل، ثم اكتب كم أقلّ في المربع:",
          strategyHintAr:
            "انظر إلى الأشكال الشبحية الناقصة في اللوحة الأقل؛ اللوحة الأكثر ممتلئة حتى ١٠، فاكتب عددها مباشرة في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
            visualKind: "ten-frame-pair",
            iconSetKind: "solids-3d",
            anchorFullFrame: true,
            showMissingAsGhost: true,
            targetComparison: "fewer",
            numberRange: [5, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى العددين المعطى على لوحتي العشرة، ثم اكتب الفرق بينهما في المربع:",
          strategyHintAr:
            "اقرأ العددين المعطى ثم اكتب الفرق بينهما في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
            visualKind: "ten-frame-pair",
            showCounts: true,
            targetComparison: "more",
            numberRange: [5, 10],
            itemCount: 1,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى الصفّين، ثم عدّ قطع كلّ صفّ واكتب كم أكثر في المربع (قد تكون المجموعتان متساويتين):",
          strategyHintAr:
            "انظر إلى الأجزاء المتطابقة بين الصفّين أولاً؛ فإن كانتا متساويتين فاكتب ٠.",
          params: {
            compareMode: "find-difference",
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
          promptAr:
            "انظر إلى لوحتي العشرة، ثم عدّ الأقراص واكتب العددين وكم أكثر في المربع (قد تكون اللوحتان متساويتين):",
          strategyHintAr:
            "انظر إلى الصفّ الخماسي المكتمل كمرتكز سريع؛ فإن كانت اللوحتان متساويتين فاكتب ٠.",
          params: {
            compareMode: "find-difference",
            visualKind: "ten-frame-pair",
            targetComparison: "more",
            numberRange: [4, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى لوحتي العشرة، ثم عدّ الأقراص واكتب العددين وكم أقلّ في المربع (قد تكون اللوحتان متساويتين):",
          strategyHintAr:
            "انظر إلى الأقراص الناقصة في اللوحة الأقل؛ فإن كانت اللوحتان متساويتين فاكتب ٠.",
          params: {
            compareMode: "find-difference",
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
          promptAr:
            "انظر إلى الأشكال الناقصة في اللوحة الأقل، ثم اكتب كم أقلّ في المربع:",
          strategyHintAr:
            "انظر إلى الأشكال الشبحية الناقصة في اللوحة الأقل؛ اللوحة الأكثر ممتلئة حتى ١٠، فاكتب عددها مباشرة في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
            visualKind: "ten-frame-pair",
            iconSetKind: "solids-3d",
            anchorFullFrame: true,
            showMissingAsGhost: true,
            targetComparison: "fewer",
            numberRange: [5, 10],
            itemCount: 1,
          },
        },
        {
          archetype: "CompareGroups",
          promptAr:
            "انظر إلى العددين المعطى على لوحتي العشرة، ثم اكتب الفرق بينهما في المربع:",
          strategyHintAr:
            "اقرأ العددين المعطى ثم اكتب الفرق بينهما في مربّع الإجابة.",
          params: {
            compareMode: "find-difference",
            visualKind: "ten-frame-pair",
            showCounts: true,
            targetComparison: "more",
            numberRange: [5, 10],
            itemCount: 1,
          },
        },
      ],
    },
  },
};

// ============================================================================
// Lesson K-109: Subitize with Ten Frames to Name One Part (K.CC.5, K.NBT.1)
// ============================================================================
export const lessonK109Blueprint: LessonBlueprint = {
  lessonId: "K-109",
  grade: "K",
  lessonNumber: 109,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-109"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-109"].teacherNotes,
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
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب الكلّ في المربع:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة ثم أضف قرصات اللوحة الثانية.",
          params: {
            frameCount: 2,
            askKind: "total",
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب الكلّ في المربع (١١–١٥):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة ثم أضف قرصات اللوحة الثانية.",
          params: {
            frameCount: 2,
            askKind: "total",
            cardCount: 2,
            candidateCounts: [11, 12, 13, 14, 15],
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى اللوحة الكاملة، ثم تخيّل قرصات اللوحة الثانية واكتب الكلّ في المربع:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة، ثم تخيّل قرصات اللوحة الثانية وأضفها.",
          params: {
            frameCount: 2,
            imaginedParts: true,
            askKind: "total",
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى العدد، ثم ارسم الأقراص في اللوحتين لتكوّنه:",
          strategyHintAr:
            "ارسم ١٠ أقراص في اللوحة الكاملة ثم القرصات الناقصة في اللوحة الثانية (١٠ وبعض الأقراص يساوي العدد).",
          params: {
            frameCount: 2,
            responseKind: "draw-to-make",
            cardCount: 2,
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
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب الكلّ في المربع:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة ثم أضف قرصات اللوحة الثانية.",
          params: {
            frameCount: 2,
            askKind: "total",
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب الكلّ في المربع (١١–٢٠):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة ثم أضف قرصات اللوحة الثانية.",
          params: {
            frameCount: 2,
            askKind: "total",
            cardCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى اللوحة الكاملة، ثم تخيّل قرصات اللوحة الثانية واكتب الكلّ في المربع:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة، ثم تخيّل قرصات اللوحة الثانية وأضفها.",
          params: {
            frameCount: 2,
            imaginedParts: true,
            askKind: "total",
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى العدد، ثم ارسم الأقراص في اللوحتين لتكوّنه:",
          strategyHintAr:
            "ارسم ١٠ أقراص في اللوحة الكاملة ثم القرصات الناقصة في اللوحة الثانية (١٠ وبعض الأقراص يساوي العدد).",
          params: {
            frameCount: 2,
            responseKind: "draw-to-make",
            cardCount: 2,
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
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب الكلّ في المربع:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة ثم أضف قرصات اللوحة الثانية.",
          params: {
            frameCount: 2,
            askKind: "total",
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب كم ينقصه حتى ٢٠ في المربع:",
          strategyHintAr:
            "انظر إلى الكلّ أولاً (١٠ وبعض الأقراص)، ثم استنتج الناقص حتى ٢٠ من الخانات الفارغة.",
          params: {
            frameCount: 2,
            complementTarget: 20,
            askKind: "complement",
            cardCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى اللوحة الكاملة، ثم تخيّل قرصات اللوحة الثانية واكتب الكلّ في المربع:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة، ثم تخيّل قرصات اللوحة الثانية وأضفها.",
          params: {
            frameCount: 2,
            imaginedParts: true,
            askKind: "total",
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى العدد، ثم ارسم الأقراص في اللوحتين لتكوّنه:",
          strategyHintAr:
            "ارسم ١٠ أقراص في اللوحة الكاملة ثم القرصات الناقصة في اللوحة الثانية (١٠ وبعض الأقراص يساوي العدد).",
          params: {
            frameCount: 2,
            responseKind: "draw-to-make",
            cardCount: 2,
          },
        },
      ],
    },
  },
};

// ============================================================================
// Lesson K-110: Subitize with Ten Frames to Name Both Parts (K.CC.5, K.NBT.1)
// ============================================================================
export const lessonK110Blueprint: LessonBlueprint = {
  lessonId: "K-110",
  grade: "K",
  lessonNumber: 110,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-110"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-110"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب الكلّ في المربع:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة ثم أضف قرصات اللوحة الثانية.",
          params: {
            frameCount: 2,
            askKind: "total",
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتي العشرة، ثم اكتب الكلّ وكم ينقصه حتى ٢٠ في المربعّين:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة واكتب الكلّ، ثم استنتج الناقص حتى ٢٠ من الخانات الفارغة.",
          params: {
            frameCount: 2,
            complementTarget: 20,
            askKind: "both",
            cardCount: 2,
            candidateCounts: [11, 12, 13, 14, 15],
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتي العشرة، ثم اكتب الكلّ وكم ينقصه حتى ٢٠ في المربعّين (١١–١٥):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة واكتب الكلّ، ثم استنتج الناقص حتى ٢٠ من الخانات الفارغة.",
          params: {
            frameCount: 2,
            complementTarget: 20,
            askKind: "both",
            cardCount: 2,
            candidateCounts: [11, 12, 13, 14, 15],
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى اللوحة الكاملة، ثم تخيّل قرصات اللوحة الثانية واكتب الكلّ وكم ينقصه حتى ٢٠ في المربعّين:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة، ثم تخيّل قرصات اللوحة الثانية واكتب الكلّ والناقص حتى ٢٠.",
          params: {
            frameCount: 2,
            imaginedParts: true,
            complementTarget: 20,
            askKind: "both",
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى العدد، ثم ارسم الأقراص في اللوحتين لتكوّنه واكتب كم ينقصه حتى ٢٠:",
          strategyHintAr:
            "ارسم ١٠ أقراص في اللوحة الكاملة ثم القرصات الناقصة في اللوحة الثانية، ثم اكتب كم ينقصه حتى ٢٠.",
          params: {
            frameCount: 2,
            responseKind: "draw-to-make",
            complementTarget: 20,
            cardCount: 2,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب الكلّ في المربع:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة ثم أضف قرصات اللوحة الثانية.",
          params: {
            frameCount: 2,
            askKind: "total",
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتي العشرة، ثم اكتب الكلّ وكم ينقصه حتى ٢٠ في المربعّين:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة واكتب الكلّ، ثم استنتج الناقص حتى ٢٠ من الخانات الفارغة.",
          params: {
            frameCount: 2,
            complementTarget: 20,
            askKind: "both",
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتي العشرة، ثم اكتب الكلّ وكم ينقصه حتى ٢٠ في المربعّين (١١–٢٠):",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة واكتب الكلّ، ثم استنتج الناقص حتى ٢٠ من الخانات الفارغة.",
          params: {
            frameCount: 2,
            complementTarget: 20,
            askKind: "both",
            cardCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى اللوحة الكاملة، ثم تخيّل قرصات اللوحة الثانية واكتب الكلّ وكم ينقصه حتى ٢٠ في المربعّين:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة، ثم تخيّل قرصات اللوحة الثانية واكتب الكلّ والناقص حتى ٢٠.",
          params: {
            frameCount: 2,
            imaginedParts: true,
            complementTarget: 20,
            askKind: "both",
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى العدد، ثم ارسم الأقراص في اللوحتين لتكوّنه واكتب كم ينقصه حتى ٢٠:",
          strategyHintAr:
            "ارسم ١٠ أقراص في اللوحة الكاملة ثم القرصات الناقصة في اللوحة الثانية، ثم اكتب كم ينقصه حتى ٢٠.",
          params: {
            frameCount: 2,
            responseKind: "draw-to-make",
            complementTarget: 20,
            cardCount: 2,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr: "انظر إلى لوحتي العشرة، ثم اكتب الكلّ في المربع:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة ثم أضف قرصات اللوحة الثانية.",
          params: {
            frameCount: 2,
            askKind: "total",
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتي العشرة، ثم اكتب الكلّ وكم ينقصه حتى ٢٠ في المربعّين:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة واكتب الكلّ، ثم استنتج الناقص حتى ٢٠ من الخانات الفارغة.",
          params: {
            frameCount: 2,
            complementTarget: 20,
            askKind: "both",
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتي العشرة، ثم اكتب الكلّ وكم ينقصه حتى ٢٠ في المربعّين (١١–٢٠):",
          strategyHintAr:
            "اختر الجزء الأسهل أولاً (الموجود بلمحة أو الناقص بالخانات الفارغة) ثم استنتج الآخر.",
          params: {
            frameCount: 2,
            complementTarget: 20,
            askKind: "both",
            cardCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى اللوحة الكاملة، ثم تخيّل قرصات اللوحة الثانية واكتب الكلّ وكم ينقصه حتى ٢٠ في المربعّين:",
          strategyHintAr:
            "انظر إلى المجموعة الكاملة (١٠) بلمحة واحدة، ثم تخيّل قرصات اللوحة الثانية واكتب الكلّ والناقص حتى ٢٠.",
          params: {
            frameCount: 2,
            imaginedParts: true,
            complementTarget: 20,
            askKind: "both",
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى العدد، ثم ارسم الأقراص في اللوحتين لتكوّنه واكتب كم ينقصه حتى ٢٠:",
          strategyHintAr:
            "ارسم ١٠ أقراص في اللوحة الكاملة ثم القرصات الناقصة في اللوحة الثانية، ثم اكتب كم ينقصه حتى ٢٠.",
          params: {
            frameCount: 2,
            responseKind: "draw-to-make",
            complementTarget: 20,
            cardCount: 2,
          },
        },
      ],
    },
  },
};

// Register all four lesson blueprints
registerLessonBlueprint(lessonK107Blueprint);
registerLessonBlueprint(lessonK108Blueprint);
registerLessonBlueprint(lessonK109Blueprint);
registerLessonBlueprint(lessonK110Blueprint);
