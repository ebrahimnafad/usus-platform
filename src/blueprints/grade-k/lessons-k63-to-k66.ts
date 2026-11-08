import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lesson K-63: Horizontal Picture Graphs to 10
// ============================================================================
export const lessonK63Blueprint: LessonBlueprint = {
  lessonId: "K-63",
  grade: "K",
  lessonNumber: 63,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-63"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-63"].teacherNotes,
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
            titleAr: "تمثيل بياني أفقي بالصور حتى ٥",
            categories: [
              { objectId: "apple", count: 3, colorTheme: "coral" },
              { objectId: "banana", count: 4, colorTheme: "amber" },
              { objectId: "orange", count: 5, colorTheme: "emerald" },
            ],
            responseMode: "trace-and-write",
            maxCount: 5,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين صفّ الموز (٤) وصفّ التفاح (٣): هل عدد الموز هو (١ أكثر) أم (١ أقل) أم (نفس العدد)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد الموز (٤) هو ١ أكثر من عدد التفاح (٣)",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني الأفقي للفواكه حتى ١٠ ثم اكتب عدد كل فئة في المربع:",
          strategyHintAr:
            "عدّ عناصر كل صفّ بدءاً من ٥ ثم أكمل العدّ واكتب العدد الكلّي.",
          params: {
            orientation: "horizontal",
            titleAr: "فواكه الحديقة حتى ١٠",
            categories: [
              { objectId: "apple", count: 6, colorTheme: "coral" },
              { objectId: "banana", count: 7, colorTheme: "amber" },
              { objectId: "orange", count: 8, colorTheme: "emerald" },
            ],
            responseMode: "trace-and-write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين صفّ الموز (٧) وصفّ التفاح (٦): هل عدد الموز يمثّل (١ أكثر) أم (١ أقل)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد الموز (٧) هو ١ أكثر من عدد التفاح (٦)",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الألعاب في التمثيل البياني الأفقي حتى ١٠ ثم اكتب العدد وقارن بين الصفوف:",
          strategyHintAr:
            "انظر إلى أطوال الصفوف الأفقية من اليمين إلى اليسار لتحديد الصفّ الأطول.",
          params: {
            orientation: "horizontal",
            titleAr: "ألعاب الأطفال حتى ١٠",
            categories: [
              { objectId: "ball", count: 6, colorTheme: "sky" },
              { objectId: "car", count: 8, colorTheme: "coral" },
              { objectId: "star", count: 7, colorTheme: "amber" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين صفّ النجوم (٧) وصفّ الكرات (٦): هل عدد النجوم هو (١ أكثر) أم (١ أقل)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد النجوم (٧) هو ١ أكثر من عدد الكرات (٦)",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى التمثيل البياني الأفقي للأشكال المستوية ثم اكتب عدد كل شكل:",
          strategyHintAr:
            "عدّ الأشكال في كل صفّ مستعيناً بالخمسة كمرتكز واكتب العدد في المربع.",
          params: {
            orientation: "horizontal",
            titleAr: "الأشكال المستوية حتى ١٠",
            iconSet: "shapes-2d",
            categories: [
              {
                icon: { kind: "shape-2d", id: "circle" },
                count: 6,
                colorTheme: "emerald",
                labelAr: "دائرة",
              },
              {
                icon: { kind: "shape-2d", id: "triangle" },
                count: 7,
                colorTheme: "sky",
                labelAr: "مثلث",
              },
              {
                icon: { kind: "shape-2d", id: "square" },
                count: 8,
                colorTheme: "amber",
                labelAr: "مربع",
              },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين صفّ المثلثات (٧) وصفّ الدوائر (٦): كم يزيد عدد المثلثات على الدوائر؟",
            comparisonAnswerAr:
              "١ أكثر: عدد المثلثات (٧) يزيد بمقدار ١ على عدد الدوائر (٦)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ عناصر كل صفّ من اليمين إلى اليسار ثم اكتب العدد المقابل على المحور:",
          strategyHintAr:
            "انظر إلى نهاية الصفّ الأفقي واقرأ العدد على خط الأعداد الأفقي.",
          params: {
            orientation: "horizontal",
            titleAr: "مراجعة التمثيل الأفقي",
            categories: [
              { objectId: "flower", count: 4, colorTheme: "rose" },
              { objectId: "tree", count: 5, colorTheme: "emerald" },
              { objectId: "bird", count: 6, colorTheme: "sky" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني الأفقي للحيوانات حتى ١٠ ثم اكتب عدد كل حيوان في المربع:",
          strategyHintAr:
            "عدّ عناصر كل صفّ أفقياً وانطلق من ٥ لمعرفة عدد العناصر بسرعة.",
          params: {
            orientation: "horizontal",
            titleAr: "حيوانات المزرعة حتى ١٠",
            categories: [
              { objectId: "cat", count: 7, colorTheme: "amber" },
              { objectId: "fish", count: 9, colorTheme: "sky" },
              { objectId: "bird", count: 8, colorTheme: "violet" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين عدد الطيور (٨) والقطط (٧): هل عدد الطيور يمثّل (١ أكثر) أم (١ أقل)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد الطيور (٨) هو ١ أكثر من عدد القطط (٧)",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الأدوات المدرسية في التمثيل البياني الأفقي ثم اكتب الأعداد وقارن بينها:",
          strategyHintAr:
            "انظر إلى الخانات الفارغة المتبقية حتى ١٠ لتتحقق من صحة العدد بالعدّ التنازلي.",
          params: {
            orientation: "horizontal",
            titleAr: "أدوات الحقيبة المدرسية",
            categories: [
              { objectId: "book", count: 8, colorTheme: "emerald" },
              { objectId: "pencil", count: 10, colorTheme: "amber" },
              { objectId: "eraser", count: 9, colorTheme: "coral" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين عدد المماحي (٩) والكتب (٨): كم يزيد عدد المماحي على الكتب؟",
            comparisonAnswerAr:
              "١ أكثر: عدد المماحي (٩) يزيد بمقدار ١ على عدد الكتب (٨)",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني للأشكال المستوية حتى ١٠ ثم اكتب عدد كل شكل:",
          strategyHintAr:
            "انظر إلى نهاية كل صفّ من اليمين إلى اليسار واكتب العدد الكلّي من ذاكرتك.",
          params: {
            orientation: "horizontal",
            titleAr: "أشكال ورقية ملوّنة",
            iconSet: "shapes-2d",
            categories: [
              {
                icon: { kind: "shape-2d", id: "triangle" },
                count: 7,
                colorTheme: "sky",
                labelAr: "مثلث",
              },
              {
                icon: { kind: "shape-2d", id: "rectangle" },
                count: 10,
                colorTheme: "emerald",
                labelAr: "مستطيل",
              },
              {
                icon: { kind: "shape-2d", id: "square" },
                count: 9,
                colorTheme: "amber",
                labelAr: "مربع",
              },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين المستطيلات (١٠) والمربعات (٩): أي الشكلين أكثر وبكم يزيد؟",
            comparisonAnswerAr:
              "المستطيلات أكثر: عدد المستطيلات (١٠) يزيد بمقدار ١ على المربعات (٩)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني الأفقي حتى ١٠ ثم اكتب الأعداد وقارن بين الفئات:",
          strategyHintAr:
            "انظر إلى المحور الأفقي المرقّم حتى ١٠ واكتب العدد المقابل لنهاية كل صفّ.",
          params: {
            orientation: "horizontal",
            titleAr: "كائنات بحرية حتى ١٠",
            categories: [
              { objectId: "fish", count: 8, colorTheme: "sky" },
              { objectId: "star", count: 9, colorTheme: "amber" },
              { objectId: "boat", count: 10, colorTheme: "coral" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ عناصر التمثيل البياني الأفقي المتنوّع حتى ١٠ ثم اكتب عدد كل عنصر:",
          strategyHintAr:
            "انظر إلى الفئة التي تكمل العشرة كاملة (١٠) وقارن بينها وبين الفئات الأخرى.",
          params: {
            orientation: "horizontal",
            titleAr: "ثمار الأشجار حتى ١٠",
            categories: [
              { objectId: "apple", count: 7, colorTheme: "coral" },
              { objectId: "orange", count: 10, colorTheme: "amber" },
              { objectId: "flower", count: 9, colorTheme: "rose" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين صفّ البرتقال (١٠) وصفّ الزهور (٩): كم يزيد عدد البرتقال؟",
            comparisonAnswerAr:
              "١ أكثر: عدد البرتقال (١٠) يزيد بمقدار ١ على عدد الزهور (٩)",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني لوسائل النقل حتى ١٠ ثم اكتب الأعداد وقارن بين الصفوف:",
          strategyHintAr:
            "عدّ تنازلياً من ١٠ بملاحظة الخانات الفارغة في نهاية كل صفّ لكتابة العدد بدقة.",
          params: {
            orientation: "horizontal",
            titleAr: "وسائل النقل حتى ١٠",
            categories: [
              { objectId: "car", count: 6, colorTheme: "sky" },
              { objectId: "truck", count: 8, colorTheme: "emerald" },
              { objectId: "train", count: 10, colorTheme: "violet" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين صفّ القطارات (١٠) والسيارات (٦): ما الصفّ الأطول في التمثيل البياني؟",
            comparisonAnswerAr:
              "صفّ القطارات (١٠) هو الأطول ويمثّل الفئة الأكثر في التمثيل البياني",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ تمثيل المجسّمات ثلاثية الأبعاد حتى ١٠ ثم اكتب أعدادها وقارن الفروق:",
          strategyHintAr:
            "انظر إلى المحور الأفقي واكتب أعداد المكعبات والكرات والمخاريط بدقة.",
          params: {
            orientation: "horizontal",
            titleAr: "مجسّمات غرفة الألعاب",
            iconSet: "solids-3d",
            categories: [
              {
                icon: { kind: "solid-3d", id: "cube" },
                count: 7,
                colorTheme: "teal",
                labelAr: "مكعب",
              },
              {
                icon: { kind: "solid-3d", id: "cylinder" },
                count: 10,
                colorTheme: "coral",
                labelAr: "أسطوانة",
              },
              {
                icon: { kind: "solid-3d", id: "sphere" },
                count: 9,
                colorTheme: "violet",
                labelAr: "كرة",
              },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين الأسطوانات (١٠) والكرات (٩): هل عدد الأسطوانات (١ أكثر) أم (١ أقل)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد الأسطوانات (١٠) هو ١ أكثر من عدد الكرات (٩)",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK63Blueprint);

// ============================================================================
// Lesson K-64: Vertical Picture Graphs to 10
// ============================================================================
export const lessonK64Blueprint: LessonBlueprint = {
  lessonId: "K-64",
  grade: "K",
  lessonNumber: 64,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-64"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-64"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل عمود من الأسفل إلى الأعلى ثم اكتب العدد في المربع:",
          strategyHintAr:
            "انظر إلى كل عمود عمودي واقرأ الرقم على المحور العمودي المقابل للقمة.",
          params: {
            orientation: "vertical",
            titleAr: "تمثيل بياني عمودي حتى ٥",
            categories: [
              { objectId: "cat", count: 3, colorTheme: "amber" },
              { objectId: "bird", count: 4, colorTheme: "sky" },
              { objectId: "fish", count: 5, colorTheme: "rose" },
            ],
            responseMode: "trace-and-write",
            maxCount: 5,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين عمود العصافير (٤) والقطط (٣): هل عدد العصافير (١ أكثر) أم (١ أقل)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد العصافير (٤) هو ١ أكثر من عدد القطط (٣)",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني العمودي للفواكه حتى ١٠ ثم اكتب عدد كل فئة في المربع:",
          strategyHintAr:
            "عدّ الصور في العمود بدءاً من القاعدة السفلية وتتبّع المحور العمودي حتى ١٠.",
          params: {
            orientation: "vertical",
            titleAr: "فواكه الحديقة عمودياً",
            categories: [
              { objectId: "apple", count: 6, colorTheme: "coral" },
              { objectId: "orange", count: 7, colorTheme: "amber" },
              { objectId: "banana", count: 8, colorTheme: "emerald" },
            ],
            responseMode: "trace-and-write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين عمود البرتقال (٧) وعمود التفاح (٦): هل البرتقال (١ أكثر) أم (١ أقل)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد البرتقال (٧) هو ١ أكثر من عدد التفاح (٦)",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الألعاب في التمثيل البياني العمودي حتى ١٠ ثم اكتب الأعداد وقارن الارتفاع:",
          strategyHintAr:
            "انظر إلى العمود الأكثر ارتفاعاً لمعرفة الفئة التي تضمّ عدداً أكبر.",
          params: {
            orientation: "vertical",
            titleAr: "ألعاب غرفة الأطفال",
            categories: [
              { objectId: "star", count: 6, colorTheme: "amber" },
              { objectId: "car", count: 8, colorTheme: "sky" },
              { objectId: "ball", count: 7, colorTheme: "coral" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين عمود الكرات (٧) وعمود النجوم (٦): كم يزيد عدد الكرات على النجوم؟",
            comparisonAnswerAr:
              "١ أكثر: عدد الكرات (٧) يزيد بمقدار ١ على عدد النجوم (٦)",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى الشاحنات والسيارات في التمثيل العمودي ثم اكتب العدد الكلّي في الأعلى:",
          strategyHintAr:
            "اقرأ الرقم المقابل لقمة كل عمود على المحور العمودي واكتبه في المربع العلوي.",
          params: {
            orientation: "vertical",
            titleAr: "شاحنات وسيارات النقل",
            categories: [
              { objectId: "car", count: 6, colorTheme: "sky" },
              { objectId: "truck", count: 8, colorTheme: "emerald" },
              { objectId: "train", count: 7, colorTheme: "violet" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين عمود الشاحنات (٨) وعمود القطارات (٧): أي العمودين أطول؟",
            comparisonAnswerAr:
              "عمود الشاحنات (٨) أطول وهو يزيد بمقدار ١ على عمود القطارات (٧)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ عناصر كل عمود من الأسفل إلى الأعلى ثم اكتب العدد المقابل على المحور:",
          strategyHintAr:
            "انظر إلى قمة كل عمود واقرأ العدد على المحور العمودي المرقّم.",
          params: {
            orientation: "vertical",
            titleAr: "مراجعة التمثيل العمودي",
            categories: [
              { objectId: "tree", count: 5, colorTheme: "emerald" },
              { objectId: "flower", count: 6, colorTheme: "rose" },
              { objectId: "bird", count: 7, colorTheme: "sky" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني العمودي للحيوانات حتى ١٠ ثم اكتب عدد كل فئة في المربع:",
          strategyHintAr:
            "عدّ الحيوانات من الأسفل إلى الأعلى واستعن بالمحور العمودي لقراءة الأعداد حتى ١٠.",
          params: {
            orientation: "vertical",
            titleAr: "حيوانات المزرعة عمودياً",
            categories: [
              { objectId: "cat", count: 7, colorTheme: "amber" },
              { objectId: "bird", count: 9, colorTheme: "sky" },
              { objectId: "fish", count: 8, colorTheme: "teal" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين عمود الأسماك (٨) والقطط (٧): هل الأسماك (١ أكثر) أم (١ أقل)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد الأسماك (٨) هو ١ أكثر من عدد القطط (٧)",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الأدوات المدرسية في التمثيل البياني العمودي ثم اكتب الأعداد وقارن الأعمدة:",
          strategyHintAr:
            "انظر إلى أعلى عمود لتحديد الفئة الأكثر عدداً ثم قارن بين ارتفاعات الأعمدة.",
          params: {
            orientation: "vertical",
            titleAr: "أدوات الصف في أعمدة",
            categories: [
              { objectId: "book", count: 8, colorTheme: "emerald" },
              { objectId: "pencil", count: 10, colorTheme: "amber" },
              { objectId: "eraser", count: 9, colorTheme: "coral" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين عمود المماحي (٩) والكتب (٨): كم يزيد عمود المماحي؟",
            comparisonAnswerAr:
              "١ أكثر: عمود المماحي (٩) يزيد بمقدار ١ على عمود الكتب (٨)",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى الشاحنات والسيارات في التمثيل العمودي ثم اكتب العدد الكلّي في المربعات:",
          strategyHintAr:
            "اقرأ الرقم من المحور العمودي عند قمة كل عمود واكتب العدد من ذاكرتك.",
          params: {
            orientation: "vertical",
            titleAr: "شاحنات ومركبات حتى ١٠",
            categories: [
              { objectId: "truck", count: 9, colorTheme: "emerald" },
              { objectId: "car", count: 7, colorTheme: "sky" },
              { objectId: "train", count: 10, colorTheme: "violet" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين عمود القطارات (١٠) والشاحنات (٩): كم يزيد عدد القطارات؟",
            comparisonAnswerAr:
              "١ أكثر: عدد القطارات (١٠) يزيد بمقدار ١ على عدد الشاحنات (٩)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني العمودي حتى ١٠ ثم اكتب الأعداد وقارن بين الأعمدة:",
          strategyHintAr:
            "انظر إلى المحور العمودي المرقّم حتى ١٠ واكتب العدد المقابل لقمة كل عمود.",
          params: {
            orientation: "vertical",
            titleAr: "كائنات البحر عمودياً",
            categories: [
              { objectId: "fish", count: 8, colorTheme: "sky" },
              { objectId: "star", count: 9, colorTheme: "amber" },
              { objectId: "boat", count: 10, colorTheme: "coral" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ عناصر التمثيل البياني العمودي حتى ١٠ ثم اكتب الأعداد وقارن الفروق:",
          strategyHintAr:
            "انظر إلى العمود المكتمل حتى ١٠ وقارن بينه وبين الأعمدة الأقصر منه.",
          params: {
            orientation: "vertical",
            titleAr: "ثمار الأشجار في أعمدة",
            categories: [
              { objectId: "apple", count: 7, colorTheme: "coral" },
              { objectId: "orange", count: 10, colorTheme: "amber" },
              { objectId: "flower", count: 9, colorTheme: "rose" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين عمود البرتقال (١٠) وعمود الزهور (٩): كم يزيد البرتقال؟",
            comparisonAnswerAr:
              "١ أكثر: عمود البرتقال (١٠) يزيد بمقدار ١ على عمود الزهور (٩)",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني لوسائل النقل حتى ١٠ ثم اكتب الأعداد وحدّد العمود الأطول:",
          strategyHintAr:
            "عدّ تنازلياً من ١٠ بملاحظة الفارق بين قمم الأعمدة وأعلى نقطة في الشبكة.",
          params: {
            orientation: "vertical",
            titleAr: "مركبات النقل حتى ١٠",
            categories: [
              { objectId: "car", count: 6, colorTheme: "sky" },
              { objectId: "truck", count: 8, colorTheme: "emerald" },
              { objectId: "train", count: 10, colorTheme: "violet" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين عمود القطارات (١٠) وعمود السيارات (٦): أي الأعمدة هو الأطول؟",
            comparisonAnswerAr:
              "عمود القطارات (١٠) هو الأطول ويمثّل الفئة الأكثر عدداً",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى التمثيل العمودي للشاحنات حتى ١٠ ثم اكتب الأعداد في المربعات:",
          strategyHintAr:
            "انظر إلى ارتفاعات الأعمدة وقارن بينها لتكتشف مقدار الزيادة بين الفئات.",
          params: {
            orientation: "vertical",
            titleAr: "شاحنات النقل الثقيل",
            categories: [
              { objectId: "truck", count: 10, colorTheme: "emerald" },
              { objectId: "car", count: 8, colorTheme: "sky" },
              { objectId: "train", count: 9, colorTheme: "violet" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين الشاحنات (١٠) والقطارات (٩): كم يزيد عدد الشاحنات؟",
            comparisonAnswerAr:
              "١ أكثر: عدد الشاحنات (١٠) يزيد بمقدار ١ على عدد القطارات (٩)",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK64Blueprint);

// ============================================================================
// Lesson K-65: Count Forward to 10
// ============================================================================
export const lessonK65Blueprint: LessonBlueprint = {
  lessonId: "K-65",
  grade: "K",
  lessonNumber: 65,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-65"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-65"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات تصاعدياً من ١ إلى ٤ ثم اكتب العدد المفقود في المربع:",
          strategyHintAr:
            "انظر إلى كل خطوة تزيد بمكعب واحد (١ أكثر) واكتب العدد الناقص.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [1, 2, 3, 4],
            missingCount: 1,
            reasoningPromptAr: "بكم يزيد كل برج على البرج السابق له؟",
            reasoningAnswerAr: "يزيد بمقدار مكعب واحد (١ أكثر)",
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ الأقراص على لوحة العشرة تصاعدياً ثم اكتب العدد المفقود في المربع:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الكامل (٥) وعدّ الأقراص الإضافية لمعرفة العدد المفقود.",
          params: {
            sequenceMode: "forward",
            visualKind: "ten-frame",
            numbers: [6, 7, 8],
            missingCount: 1,
            reasoningPromptAr:
              "ما العدد الذي يزيد بمقدار ١ على ٧ في هذا التسلسل؟",
            reasoningAnswerAr: "العدد ٨ هو ١ أكثر من ٧",
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ علامات العدّ تصاعدياً باتجاه العشرة ثم اكتب العدد المفقود في الفراغ:",
          strategyHintAr:
            "انظر إلى الحزمة المكتملة (٥) وعدّ الخطوط الإضافية لتجد العدد التالي.",
          params: {
            sequenceMode: "forward",
            visualKind: "tally-marks",
            numbers: [8, 9, 10],
            missingCount: 1,
            reasoningPromptAr:
              "ما العدد الذي يزيد بمقدار ١ على ٩ ويصل إلى حزمتين كاملتين؟",
            reasoningAnswerAr:
              "العدد ١٠ هو ١ أكثر من ٩ ويمثّل حزمتين كاملتين (٥ و٥)",
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ علامات العدّ تصاعدياً من ٦ ثم اكتب الأعداد المفقودة في المربعات:",
          strategyHintAr:
            "انظر إلى كل بطاقة علامات عدّ تزيد بخط واحد (١ أكثر) واكتب العددين المفقودين.",
          params: {
            sequenceMode: "forward",
            visualKind: "tally-marks",
            numbers: [6, 7, 8, 9],
            missingCount: 2,
            reasoningPromptAr: "كيف يزيد تسلسل علامات العدّ في كل خطوة؟",
            reasoningAnswerAr: "يزيد بمقدار خط واحد في كل خطوة (١ أكثر)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ عناصر التسلسل تصاعدياً من ٥ إلى ٨ ثم اكتب العدد المفقود في المربع:",
          strategyHintAr:
            "انظر إلى كل خطوة تزيد بمقدار ١ أكثر واكتب العدد التالي في الفراغ.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [5, 6, 7, 8],
            missingCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ الأقراص على لوحة العشرة تصاعدياً حتى ١٠ ثم اكتب الأعداد المفقودة:",
          strategyHintAr:
            "انظر إلى زيادة الأقراص في الصفّ السفلي واكتب الأعداد الناقصة بالترتيب.",
          params: {
            sequenceMode: "forward",
            visualKind: "ten-frame",
            numbers: [6, 7, 8, 9],
            missingCount: 2,
            reasoningPromptAr:
              "ما العدد الذي يأتي مباشرة بعد ٧ ويزيد عليه بمقدار ١؟",
            reasoningAnswerAr: "العدد ٨ هو ١ أكثر من ٧",
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ علامات العدّ تصاعدياً حتى ١٠ ثم اكتب الأعداد الناقصة في المربعات:",
          strategyHintAr:
            "عدّ الخطوط الإضافية بجانب حزمة الخمسة واكتب الأعداد من الذاكرة.",
          params: {
            sequenceMode: "forward",
            visualKind: "tally-marks",
            numbers: [7, 8, 9, 10],
            missingCount: 2,
            reasoningPromptAr: "ما العدد الذي يلي ٨ في العدّ التصاعدي؟",
            reasoningAnswerAr: "العدد ٩ يلي ٨ في العدّ التصاعدي (١ أكثر)",
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات تصاعدياً من ٦ إلى ١٠ ثم اكتب الأعداد المفقودة:",
          strategyHintAr:
            "انظر إلى درج المكعبات التصاعدي وتأكد من كتابة كل عدد في مكانه الصحيح.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [6, 7, 8, 9, 10],
            missingValues: [7, 9],
            reasoningPromptAr:
              "بكم يزيد البرج الأخير (١٠) على البرج السابق له (٩)؟",
            reasoningAnswerAr: "يزيد بمقدار مكعب واحد (١٠ هو ١ أكثر من ٩)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ تصاعدياً بالارتكاز على ٥ ثم اكتب العدد المفقود في المربع:",
          strategyHintAr:
            "انظر إلى التسلسل واكتب العدد الذي يمثّل ١ أكثر من العدد السابق.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [6, 7, 8, 9],
            missingCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ الأقراص على لوحة العشرة تصاعدياً ثم اكتب الأعداد المفقودة في المربعات:",
          strategyHintAr:
            "انظر إلى امتلاء خانات لوحة العشرة واكتب الأعداد الناقصة حتى تصل إلى ١٠.",
          params: {
            sequenceMode: "forward",
            visualKind: "ten-frame",
            numbers: [7, 8, 9, 10],
            missingValues: [8, 10],
            reasoningPromptAr:
              "ما العدد الذي يملأ لوحة العشرة بالكامل في نهاية التسلسل؟",
            reasoningAnswerAr: "العدد ١٠ يملأ جميع خانات لوحة العشرة بالكامل",
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ علامات العدّ تصاعدياً من ٦ إلى ٩ ثم اكتب الأعداد المفقودة في الفراغ:",
          strategyHintAr:
            "انظر إلى زيادة الخطوط خطوة بخطوة واكتب الأعداد الناقصة من الذاكرة.",
          params: {
            sequenceMode: "forward",
            visualKind: "tally-marks",
            numbers: [6, 7, 8, 9],
            missingValues: [6, 8],
            reasoningPromptAr: "ما هو العدد الأول في هذا التسلسل؟",
            reasoningAnswerAr: "العدد الأول هو ٦ (حزمة ٥ مع خط واحد)",
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات تصاعدياً من ٦ إلى ١٠ ثم اكتب الأعداد المفقودة:",
          strategyHintAr:
            "انظر إلى كل برج مكعبات يرتفع بمقدار ١ أكثر واكتب الأعداد الناقصة بالترتيب.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [6, 7, 8, 9, 10],
            missingValues: [6, 8, 10],
            reasoningPromptAr:
              "ما هي الأعداد الثلاثة المفقودة في هذا الدرج التصاعدي؟",
            reasoningAnswerAr: "الأعداد المفقودة هي ٦ و٨ و١٠",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK65Blueprint);

// ============================================================================
// Lesson K-66: Count Backward from 10
// ============================================================================
export const lessonK66Blueprint: LessonBlueprint = {
  lessonId: "K-66",
  grade: "K",
  lessonNumber: 66,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-66"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-66"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات تنازلياً من ٤ إلى ١ ثم اكتب العدد المفقود في المربع:",
          strategyHintAr:
            "انظر إلى كل برج ينقص بمكعب واحد (١ أقل) واكتب العدد الناقص.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [4, 3, 2, 1],
            missingCount: 1,
            reasoningPromptAr: "بكم ينقص كل برج عن البرج الذي يسبقه؟",
            reasoningAnswerAr: "ينقص بمقدار مكعب واحد (١ أقل)",
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ الأقراص على لوحة العشرة تنازلياً ثم اكتب العدد المفقود في المربع:",
          strategyHintAr:
            "انظر إلى نقصان الأقراص من اليمين إلى اليسار واكتب العدد الناقص في الخانة.",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            numbers: [10, 9, 8],
            missingCount: 1,
            reasoningPromptAr:
              "ما العدد الذي يقلّ بمقدار ١ عن ١٠ ويأتي قبله مباشرة؟",
            reasoningAnswerAr: "العدد ٩ هو ١ أقل من ١٠",
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ علامات العدّ تنازلياً من ٨ إلى ٦ ثم اكتب العدد المفقود في الفراغ:",
          strategyHintAr:
            "انظر إلى نقصان خط واحد في كل بطاقة واكتب العدد السابق في التسلسل.",
          params: {
            sequenceMode: "backward",
            visualKind: "tally-marks",
            numbers: [8, 7, 6],
            missingCount: 1,
            reasoningPromptAr:
              "ما العدد الذي يقلّ بمقدار ١ عن ٨ في العدّ التنازلي؟",
            reasoningAnswerAr: "العدد ٧ هو ١ أقل من ٨",
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ الأقراص على لوحة العشرة تنازلياً من ١٠ ثم اكتب الأعداد المفقودة:",
          strategyHintAr:
            "انظر إلى كل لوحة تنقص قرصاً واحداً واكتب العددين الناقصين بالترتيب.",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            numbers: [10, 9, 8, 7],
            missingCount: 2,
            reasoningPromptAr: "كيف ينقص تسلسل لوحة العشرة في كل خطوة؟",
            reasoningAnswerAr: "ينقص قرصاً واحداً في كل خطوة (١ أقل)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr: "عدّ تنازلياً من ٨ إلى ٥ ثم اكتب العدد المفقود في المربع:",
          strategyHintAr:
            "انظر إلى كل خطوة تنقص بمقدار ١ أقل واكتب العدد السابق في الفراغ.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [8, 7, 6, 5],
            missingCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ الأقراص على لوحة العشرة تنازلياً من ١٠ ثم اكتب الأعداد المفقودة:",
          strategyHintAr:
            "انظر إلى اللوحة الممتلئة (١٠) ثم احذف قرصاً في كل خطوة واكتب الأعداد.",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            numbers: [10, 9, 8, 7],
            missingCount: 2,
            reasoningPromptAr:
              "ما العددان اللذان يقلان عن ١٠ بالترتيب التنازلي؟",
            reasoningAnswerAr: "العددان هما ٩ ثم ٨",
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ علامات العدّ تنازلياً من ٩ ثم اكتب الأعداد الناقصة في المربعات:",
          strategyHintAr:
            "عدّ العلامات وتأكد من إنقاص علامة واحدة في كل بطاقة تنازلية.",
          params: {
            sequenceMode: "backward",
            visualKind: "tally-marks",
            numbers: [9, 8, 7, 6],
            missingCount: 2,
            reasoningPromptAr: "ما العدد الذي يقلّ بمقدار ١ عن ٧؟",
            reasoningAnswerAr: "العدد ٦ هو ١ أقل من ٧",
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات تنازلياً من ١٠ إلى ٦ ثم اكتب الأعداد المفقودة:",
          strategyHintAr:
            "انظر إلى الدرج الهابط من اليمين إلى اليسار واكتب الأعداد الناقصة.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [10, 9, 8, 7, 6],
            missingValues: [9, 7],
            reasoningPromptAr: "بكم ينقص البرج (٦) عن البرج السابق له (٧)؟",
            reasoningAnswerAr: "ينقص بمقدار مكعب واحد (٦ هو ١ أقل من ٧)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr: "عدّ تنازلياً من ٩ إلى ٦ ثم اكتب العدد المفقود في المربع:",
          strategyHintAr:
            "انظر إلى التسلسل واكتب العدد الذي يمثّل ١ أقل من العدد السابق.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [9, 8, 7, 6],
            missingCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ الأقراص على لوحة العشرة تنازلياً ثم اكتب الأعداد المفقودة في المربعات:",
          strategyHintAr:
            "انظر إلى نقصان الأقراص واكتب الأعداد الناقصة وصولاً إلى ٧.",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            numbers: [10, 9, 8, 7],
            missingValues: [10, 8],
            reasoningPromptAr:
              "ما هو العدد الأكبر الذي نبدأ به هذا العدّ التنازلي؟",
            reasoningAnswerAr: "العدد الأكبر هو ١٠",
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ علامات العدّ تنازلياً من ٩ إلى ٦ ثم اكتب الأعداد المفقودة في الفراغ:",
          strategyHintAr:
            "انظر إلى النمط الذي ينقص خطاً في كل خطوة واكتب الأعداد الناقصة من الذاكرة.",
          params: {
            sequenceMode: "backward",
            visualKind: "tally-marks",
            numbers: [9, 8, 7, 6],
            missingValues: [8, 6],
            reasoningPromptAr: "ما هو العدد الأخير في هذا التسلسل التنازلي؟",
            reasoningAnswerAr: "العدد الأخير هو ٦ (حزمة ٥ مع خط واحد)",
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات تنازلياً من ١٠ إلى ٦ ثم اكتب الأعداد المفقودة:",
          strategyHintAr:
            "انظر إلى انخفاض المكعبات خطوة بخطوة واكتب الأعداد الثلاثة الناقصة.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [10, 9, 8, 7, 6],
            missingValues: [10, 8, 6],
            reasoningPromptAr:
              "ما هي الأعداد الثلاثة المفقودة في هذا الدرج التنازلي؟",
            reasoningAnswerAr: "الأعداد المفقودة هي ١٠ و٨ و٦",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK66Blueprint);
