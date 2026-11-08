import { defineLessonBlueprint } from "@/blueprints/registry";

const decreasingGraphParams = {
  orientation: "horizontal",
  countsPattern: "decreasing-by-1",
  comparisonRelation: "١ أقل",
  includeComparison: false,
} as const;

export const lessonK39Blueprint = defineLessonBlueprint({
  lessonId: "K-39",
  grade: "K",
  lessonNumber: 39,
  sections: {
    warmUp: [
      {
        archetype: "PictureGraphRead",
        params: {
          ...decreasingGraphParams,
          titleAr: "صور تنقص واحداً",
          categoryCount: 3,
          responseMode: "write",
        },
        byDifficulty: {
          Easy: {
            promptAr:
              "عدّ الصور في كل صفّ من اليمين إلى اليسار، ثم تتبّع العدد واكتبه:",
            strategyHintAr:
              "عدّ الصور في كل صفّ، ثم لاحظ أن الصفّ التالي فيه ١ أقل.",
            params: { responseMode: "trace-and-write" },
          },
          Intermediate: {
            promptAr: "عدّ الصور في كل صفّ، ثم اكتب العدد في المربع:",
            strategyHintAr:
              "عدّ كل صفّ من اليمين إلى اليسار، ثم لاحظ نمط ١ أقل.",
          },
          Advanced: {
            promptAr: "عدّ الصور في كل صفّ، ثم اكتب عدد كل فئة:",
            strategyHintAr: "عدّ الصفّ الأول، ثم استخدم ١ أقل للصفّ الذي يليه.",
          },
        },
      },
    ],
    practice: [
      {
        archetype: "PictureGraphRead",
        params: {
          ...decreasingGraphParams,
          categoryCount: 3,
          responseMode: "write",
        },
        byDifficulty: {
          Easy: {
            promptAr:
              "عدّ الصور في كل صفّ من اليمين إلى اليسار، ثم تتبّع العدد واكتبه:",
            strategyHintAr:
              "عدّ من اليمين إلى اليسار، ثم قل العدد الذي يقلّ ١ في الصفّ التالي.",
            params: {
              titleAr: "ألعاب تنقص واحداً",
              responseMode: "trace-and-write",
            },
          },
          Intermediate: {
            promptAr: "عدّ الصور في كل صفّ أفقي، ثم اكتب كم صورة في كل فئة:",
            strategyHintAr:
              "انظر إلى نهاية كل صفّ، ثم اكتب العدد الذي يقلّ ١ عن الصفّ قبله.",
            params: { titleAr: "فئات تنقص واحداً" },
          },
          Advanced: {
            promptAr:
              "انظر إلى التمثيل البياني الأفقي، ثم اكتب عدد الصور في كل صفّ:",
            strategyHintAr:
              "انظر إلى أطوال الصفوف، ثم استخدم العدّ التنازلي للتحقق من الأعداد.",
            params: { titleAr: "تمثيل بياني تنازلي" },
          },
        },
      },
      {
        archetype: "PictureGraphRead",
        params: {
          ...decreasingGraphParams,
          categoryCount: 3,
          responseMode: "write",
        },
        byDifficulty: {
          Easy: {
            promptAr: "انظر إلى أطوال الصفوف، ثم عدّ الصور واكتب العدد:",
            strategyHintAr:
              "عدّ الصفّ الأطول أولاً، ثم عدّ تنازلياً ١ أقل للصفّ التالي.",
            params: {
              titleAr: "فئات تنقص واحداً",
              responseMode: "trace-and-write",
            },
          },
          Intermediate: {
            promptAr:
              "انظر إلى الصفوف المتنازلة، ثم عدّ الصور واكتب عدد كل فئة:",
            strategyHintAr:
              "عدّ الصور في الصفّ الأول، ثم عدّ تنازلياً صفاً صفاً.",
            params: { titleAr: "تمثيل بياني تنازلي" },
          },
          Advanced: {
            promptAr: "عدّ الصفوف المتنازلة، ثم اكتب كل عدد من الذاكرة:",
            strategyHintAr:
              "انظر إلى نمط الصفوف، ثم اكتب العدد الذي يسبق العدد السابق بواحد.",
            params: { titleAr: "صفوف تعدّ تنازلياً" },
          },
        },
      },
    ],
    challenge: [
      {
        archetype: "PictureGraphRead",
        params: {
          responseMode: "draw-missing",
          iconSet: "shapes-2d",
          countsPattern: "decreasing-by-1",
          categoryCount: 4,
          titleAr: "جدول العدّ والتمثيل البياني",
        },
        byDifficulty: {
          Easy: {
            promptAr:
              "ارسم الأشكال الناقصة في كل صفّ، ثم عدّ لتتأكد أن الجدول والتمثيل البياني متطابقان:",
            strategyHintAr:
              "عدّ الأشكال في جدول العدّ، ثم ارسم ما ينقص في الصفّ نفسه.",
            params: {
              categoryCount: 3,
              missingPerCategory: [1, 1],
            },
          },
          Intermediate: {
            promptAr:
              "ارسم الأشكال الناقصة في كل صفّ، ثم عدّ لتطابق كل صفّ مع جدول العدّ:",
            strategyHintAr:
              "عدّ العدد في جدول العدّ، ثم ارسم الأشكال الناقصة حتى يصل الصفّ إلى العدد نفسه.",
            params: { missingPerCategory: [1, 2] },
          },
          Advanced: {
            promptAr:
              "ارسم الأشكال الناقصة في كل صفّ، ثم عدّ لتراجع تطابقه مع جدول العدّ:",
            strategyHintAr:
              "انظر إلى العدد في جدول العدّ، ثم ارسم حتى يصبح عدد الأشكال في الصفّ مساوياً له.",
            params: { missingPerCategory: [1, 3] },
          },
        },
      },
      {
        archetype: "PictureGraphRead",
        params: {
          ...decreasingGraphParams,
          iconSet: "solids-3d",
          titleAr: "مجسّمات تنقص واحداً",
          categoryCount: 3,
          responseMode: "write",
          includeComparison: true,
        },
        byDifficulty: {
          Easy: {
            promptAr: "عدّ الأشكال في كل صفّ، ثم اكتب العدد وقارن بين الصفوف:",
            strategyHintAr:
              "انظر إلى الشكل في بداية الصفّ، ثم عدّ الخانات لتعرف أي صفّ فيه ١ أقل.",
          },
          Intermediate: {
            promptAr:
              "عدّ الأشكال في كل صفّ، ثم اكتب العدد وقارن العدد التالي:",
            strategyHintAr:
              "انظر إلى رمز الصفّ، ثم عدّ الخانات لتجد الصفّ الذي يقلّ ١.",
          },
          Advanced: {
            promptAr: "عدّ الأشكال في كل صفّ، ثم اكتب العدد وحدّد نمط ١ أقل:",
            strategyHintAr:
              "انظر إلى طول كل صفّ، ثم اكتب الأعداد بالترتيب التنازلي.",
          },
        },
      },
    ],
  },
});
