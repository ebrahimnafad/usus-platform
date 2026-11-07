import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

const decreasingGraphParams = {
  orientation: "horizontal",
  countsPattern: "decreasing-by-1",
  comparisonRelation: "١ أقل",
  includeComparison: false,
} as const;

export const lessonK39Blueprint: LessonBlueprint = {
  lessonId: "K-39",
  grade: "K",
  lessonNumber: 39,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-39"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-39"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار، ثم تتبّع العدد واكتبه:",
          strategyHintAr:
            "عدّ الصور في كل صفّ، ثم لاحظ أن الصفّ التالي فيه ١ أقل.",
          params: {
            ...decreasingGraphParams,
            titleAr: "صور تنقص واحداً",
            categoryCount: 3,
            responseMode: "trace-and-write",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الصور في كل صفّ، ثم تتبّع العدد واكتبه وقارن الصفوف:",
          strategyHintAr:
            "عدّ من اليمين إلى اليسار، ثم قل العدد الذي يقلّ ١ في الصفّ التالي.",
          params: {
            ...decreasingGraphParams,
            titleAr: "ألعاب تنقص واحداً",
            categoryCount: 3,
            responseMode: "trace-and-write",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr: "انظر إلى أطوال الصفوف، ثم عدّ الصور واكتب العدد:",
          strategyHintAr:
            "عدّ الصفّ الأطول أولاً، ثم عدّ تنازلياً ١ أقل للصفّ التالي.",
          params: {
            ...decreasingGraphParams,
            titleAr: "فئات تنقص واحداً",
            categoryCount: 3,
            responseMode: "trace-and-write",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "ارسم الأشكال الناقصة في كل صفّ، ثم عدّ لتتأكد أن الجدول والتمثيل البياني متطابقان:",
          strategyHintAr:
            "عدّ الأشكال في جدول العدّ، ثم ارسم ما ينقص في الصفّ نفسه.",
          params: {
            responseMode: "draw-missing",
            iconSet: "shapes-2d",
            countsPattern: "decreasing-by-1",
            categoryCount: 3,
            missingPerCategory: [1, 1],
            titleAr: "جدول العدّ والتمثيل البياني",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الأشكال في كل صفّ، ثم اكتب العدد وقارن بين الصفوف:",
          strategyHintAr:
            "انظر إلى الشكل في بداية الصفّ، ثم عدّ الخانات لتعرف أي صفّ فيه ١ أقل.",
          params: {
            ...decreasingGraphParams,
            iconSet: "solids-3d",
            titleAr: "مجسّمات تنقص واحداً",
            categoryCount: 3,
            responseMode: "write",
            includeComparison: true,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الصور في كل صفّ، ثم اكتب العدد وقارن الصفوف:",
          strategyHintAr: "عدّ كل صفّ من اليمين إلى اليسار، ثم لاحظ نمط ١ أقل.",
          params: {
            ...decreasingGraphParams,
            titleAr: "صور تنقص واحداً",
            categoryCount: 3,
            responseMode: "write",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الصور في كل صفّ أفقي، ثم اكتب العدد وقارن (١ أقل):",
          strategyHintAr:
            "انظر إلى نهاية كل صفّ، ثم اكتب العدد الذي يقلّ ١ عن الصفّ قبله.",
          params: {
            ...decreasingGraphParams,
            titleAr: "فئات تنقص واحداً",
            categoryCount: 3,
            responseMode: "write",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr: "اكتب عدد الصور في كل صفّ، ثم حدّد الصفّ الذي فيه ١ أقل:",
          strategyHintAr:
            "عدّ الصور في الصفّ الأول، ثم عدّ تنازلياً صفاً صفاً.",
          params: {
            ...decreasingGraphParams,
            titleAr: "تمثيل بياني تنازلي",
            categoryCount: 3,
            responseMode: "write",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "ارسم الأشكال الناقصة في كل صفّ، ثم عدّ لتطابق كل صفّ مع جدول العدّ:",
          strategyHintAr:
            "عدّ العدد في جدول العدّ، ثم ارسم الأشكال الناقصة حتى يصل الصفّ إلى العدد نفسه.",
          params: {
            responseMode: "draw-missing",
            iconSet: "shapes-2d",
            countsPattern: "decreasing-by-1",
            categoryCount: 4,
            missingPerCategory: [1, 2],
            titleAr: "جدول العدّ والتمثيل البياني",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الأشكال في كل صفّ، ثم اكتب العدد وقارن العدد التالي:",
          strategyHintAr:
            "انظر إلى رمز الصفّ، ثم عدّ الخانات لتجد الصفّ الذي يقلّ ١.",
          params: {
            ...decreasingGraphParams,
            iconSet: "solids-3d",
            titleAr: "مجسّمات تنقص واحداً",
            categoryCount: 3,
            responseMode: "write",
            includeComparison: true,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr: "اكتب عدد الصور في كل صفّ، ثم قارن نمط العدّ التنازلي:",
          strategyHintAr: "عدّ الصفّ الأول، ثم استخدم ١ أقل للصفّ الذي يليه.",
          params: {
            ...decreasingGraphParams,
            titleAr: "صور تنقص واحداً",
            categoryCount: 3,
            responseMode: "write",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr: "اكتب عدد كل صفّ، ثم اشرح كيف ينقص كل صفّ عن الصفّ قبله:",
          strategyHintAr:
            "انظر إلى أطوال الصفوف، ثم استخدم العدّ التنازلي للتحقق من الأعداد.",
          params: {
            ...decreasingGraphParams,
            titleAr: "تمثيل بياني تنازلي",
            categoryCount: 3,
            responseMode: "write",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الصفوف المتنازلة، ثم اكتب كل عدد من الذاكرة:",
          strategyHintAr:
            "انظر إلى نمط الصفوف، ثم اكتب العدد الذي يسبق العدد السابق بواحد.",
          params: {
            ...decreasingGraphParams,
            titleAr: "صفوف تعدّ تنازلياً",
            categoryCount: 3,
            responseMode: "write",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "ارسم الأشكال الناقصة في كل صفّ، ثم عدّ لتراجع تطابقه مع جدول العدّ:",
          strategyHintAr:
            "انظر إلى العدد في جدول العدّ، ثم ارسم حتى يصبح عدد الأشكال في الصفّ مساوياً له.",
          params: {
            responseMode: "draw-missing",
            iconSet: "shapes-2d",
            countsPattern: "decreasing-by-1",
            categoryCount: 4,
            missingPerCategory: [1, 3],
            titleAr: "جدول العدّ والتمثيل البياني",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الأشكال في كل صفّ، ثم اكتب العدد وحدّد نمط ١ أقل:",
          strategyHintAr:
            "انظر إلى طول كل صفّ، ثم اكتب الأعداد بالترتيب التنازلي.",
          params: {
            ...decreasingGraphParams,
            iconSet: "solids-3d",
            titleAr: "مجسّمات تنقص واحداً",
            categoryCount: 3,
            responseMode: "write",
            includeComparison: true,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK39Blueprint);
