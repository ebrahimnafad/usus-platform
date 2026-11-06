import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

export const lessonK20Blueprint: LessonBlueprint = {
  lessonId: "K-20",
  grade: "K",
  lessonNumber: 20,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-20"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-20"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: ارسم جدول تمثيل بياني أفقي كبير على السبورة واطلب من الطلاب لصق بطاقات الفواكه المفضلة لديهم في صفوف أفقية من اليمين إلى اليسار، ثم عدّ كل صفّ ومقارنة الصفوف (١ أكثر، ١ أقل، نفس العدد).",
    commonMisconceptionsAr: [
      "البدء بعدّ الصور من اليسار أو ترك فراغات بين الصور في الصف الأفقي مما يعيق المقارنة البصرية المباشرة لأطوال الصفوف.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار، ثم تتبّع الرقم وقارن بين الصفوف:",
          strategyHintAr:
            "عدّ عناصر كل صفّ أفقياً من اليمين إلى اليسار، ولاحظ كيف يزيد كل صفّ بمقدار ١ أكثر.",
          params: {
            orientation: "horizontal",
            titleAr: "فواكه السلة الملوّنة",
            categoryCount: 3,
            countsPattern: "increasing-by-1",
            responseMode: "trace-and-write",
            comparisonRelation: "١ أكثر",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني الأفقي للحيوانات، وعدّ كل صفّ ثم تتبّع الرقم واكتبه وقارن (١ أكثر):",
          strategyHintAr:
            "انظر إلى أطوال الصفوف الأفقية من اليمين إلى اليسار؛ الصفّ الأطول بخانة واحدة يمثّل ١ أكثر.",
          params: {
            orientation: "horizontal",
            titleAr: "حيوانات الحديقة",
            categories: [
              { objectId: "cat", count: 2, colorTheme: "amber" },
              { objectId: "bird", count: 3, colorTheme: "sky" },
              { objectId: "butterfly", count: 4, colorTheme: "violet" },
            ],
            responseMode: "trace-and-write",
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "قارن بين صفّ العصفور (٣) وصفّ القطة (٢): هل عدد العصافير هو (١ أكثر) أم (١ أقل) أم (نفس العدد)؟",
            comparisonAnswerAr:
              "١ أكثر: عدد العصافير (٣) هو ١ أكثر من عدد القطط (٢)",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الألعاب في كل صفّ أفقي، وتتبّع الأرقام ثم حدّد العلاقة بين الفئتين (نفس العدد):",
          strategyHintAr:
            "عندما ينتهي صفّان عند نفس الخانة على المحور الأفقي فهذا يعني أن لهما نفس العدد.",
          params: {
            orientation: "horizontal",
            titleAr: "ألعاب غرفة الصف",
            categories: [
              { objectId: "car", count: 3, colorTheme: "coral" },
              { objectId: "ball", count: 3, colorTheme: "sky" },
              { objectId: "train", count: 4, colorTheme: "emerald" },
            ],
            responseMode: "trace-and-write",
            comparisonRelation: "نفس العدد",
            comparisonPromptAr:
              "قارن بين صفّ كرة الشاطئ (٣) وصفّ السيارة الصغيرة (٣): هل لهما (نفس العدد) أم (١ أكثر) أم (١ أقل)؟",
            comparisonAnswerAr:
              "نفس العدد: صفّ الكرة (٣) وصفّ السيارة (٣) ينتهيان عند الخانة ٣ نفسها",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr: "اقرأ الصفوف واكتب الأعداد من ذاكرتك ثم اكتشف نمط الزيادة:",
          strategyHintAr:
            "لاحظ النمط في أطوال الصفوف من الأعلى إلى الأسفل: كل صفّ يزيد بمقدار ١ أكثر على الصفّ الذي يسبقه.",
          params: {
            orientation: "horizontal",
            titleAr: "نجوم وزهور الطبيعة",
            categories: [
              { objectId: "flower", count: 3, colorTheme: "rose" },
              { objectId: "star", count: 4, colorTheme: "amber" },
              { objectId: "tree", count: 5, colorTheme: "emerald" },
            ],
            responseMode: "write",
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "هل يوجد نمط في هذا التمثيل البياني؟ كم يزيد كل صفّ تالٍ على الصفّ السابق له؟",
            comparisonAnswerAr:
              "نعم، يوجد نمط تصاعدي؛ كل صفّ تالٍ يحتوي على (١ أكثر) من الصفّ السابق له (٣ ← ٤ ← ٥)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الصور في كل صفّ أفقي وتتبّع الرقم المقابل (١–٥):",
          strategyHintAr:
            "استخدم المحور الأفقي المرقّم من ١ إلى ٥ للتحقّق من عدد الصور في كل صفّ.",
          params: {
            orientation: "horizontal",
            titleAr: "فواكه الصباح",
            categoryCount: 3,
            countsPattern: "increasing-by-1",
            responseMode: "trace-and-write",
            comparisonRelation: "١ أكثر",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني الأفقي وعدّ عناصر كل فئة، ثم تتبّع الرقم واكتبه وقارن (١ أكثر):",
          strategyHintAr:
            "قارن بين الصفوف المتجاورة لمعرفة أي فئة تزيد بعنصر واحد (١ أكثر).",
          params: {
            orientation: "horizontal",
            titleAr: "حديقة الفراشات والطيور",
            categoryCount: 3,
            countsPattern: "increasing-by-1",
            responseMode: "trace-and-write",
            comparisonRelation: "١ أكثر",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني الأفقي، وحدّد الفئتين اللتين لهما (نفس العدد) وتتبّع الأرقام:",
          strategyHintAr:
            "الصفّان المتساويان في الطول يحتويان على نفس العدد من الصور.",
          params: {
            orientation: "horizontal",
            titleAr: "معرض الألعاب الملوّنة",
            categoryCount: 3,
            countsPattern: "with-equal-pair",
            responseMode: "trace-and-write",
            comparisonRelation: "نفس العدد",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr: "اكتب أعداد الفئات الأربع من ذاكرتك وقارن بينها:",
          strategyHintAr:
            "اقرأ المحور الأفقي من اليمين إلى اليسار وقارن بين أطول صفّ وأقصر صفّ.",
          params: {
            orientation: "horizontal",
            titleAr: "مهرجان الفواكه والحلوى",
            categories: [
              { objectId: "apple", count: 2, colorTheme: "coral" },
              { objectId: "strawberry", count: 3, colorTheme: "rose" },
              { objectId: "orange", count: 4, colorTheme: "amber" },
              { objectId: "cupcake", count: 5, colorTheme: "violet" },
            ],
            responseMode: "write",
            comparisonRelation: "١ أكثر",
            comparisonPromptAr:
              "ما النمط الذي تلاحظه في أعداد الصفوف الأربعة من الأعلى إلى الأسفل (٢، ٣، ٤، ٥)؟",
            comparisonAnswerAr:
              "كل صفّ تالٍ يحتوي على (١ أكثر) من الصفّ الذي يسبقه بالتتابع حتى ٥",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr: "اقرأ التمثيل البياني الأفقي واكتب عدد كل فئة من ذاكرتك:",
          strategyHintAr:
            "اعتمد على قراءة المحور الأفقي (١–٥) لتحديد العدد فوراً.",
          params: {
            orientation: "horizontal",
            titleAr: "طيور وأسماك الطبيعة",
            categoryCount: 3,
            countsPattern: "increasing-by-1",
            responseMode: "write",
            comparisonRelation: "١ أكثر",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اكتب أعداد الفئات الأربع في التمثيل البياني الأفقي من ذاكرتك وقارن (١ أكثر):",
          strategyHintAr:
            "لاحظ الفرق بين كل صفّين متجاورين على شبكة التمثيل البياني.",
          params: {
            orientation: "horizontal",
            titleAr: "رحلة الطبيعة",
            categoryCount: 4,
            countsPattern: "increasing-by-1",
            responseMode: "write",
            comparisonRelation: "١ أكثر",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني الأفقي واكتب الأرقام ثم حدّد الفئات المتساوية (نفس العدد):",
          strategyHintAr:
            "ابحث عن الصفّين اللذين يصلان إلى نفس الرقم على المحور الأفقي.",
          params: {
            orientation: "horizontal",
            titleAr: "مكتبة الصفّ",
            categoryCount: 4,
            countsPattern: "with-equal-pair",
            responseMode: "write",
            comparisonRelation: "نفس العدد",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "حلّل التمثيل البياني الأفقي واكتب الأعداد من ذاكرتك ثم أجب:",
          strategyHintAr:
            "إذا أضفنا صورة واحدة إلى صفّ يحتوي على ٤ صور فسيصبح فيه ٥ صور ويساوي الصفّ المكتمل.",
          params: {
            orientation: "horizontal",
            titleAr: "نجوم التميّز في الروضة",
            categories: [
              { objectId: "star", count: 5, colorTheme: "amber" },
              { objectId: "sun", count: 4, colorTheme: "coral" },
              { objectId: "flower", count: 4, colorTheme: "rose" },
              { objectId: "leaf", count: 3, colorTheme: "teal" },
            ],
            responseMode: "write",
            comparisonRelation: "نفس العدد",
            comparisonPromptAr:
              "أي فئتين لهما (نفس العدد)؟ وكم يقلّ صفّ ورقة الشجر (٣) عن صفّ الزهرة (٤)؟",
            comparisonAnswerAr:
              "الشمس (٤) والزهرة (٤) لهما نفس العدد، وصفّ ورقة الشجر (٣) هو ١ أقل من الزهرة (٤)",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK20Blueprint);

export const lessonK21Blueprint: LessonBlueprint = {
  lessonId: "K-21",
  grade: "K",
  lessonNumber: 21,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-21"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-21"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: حوّل التمثيل البياني الأفقي من الدرس السابق إلى تمثيل بياني عمودي برصّ البطاقات من الأسفل إلى الأعلى، واطلب من الطلاب ملاحظة أن الأعداد تبقى كما هي بينما نقارن ارتفاع الأعمدة.",
    commonMisconceptionsAr: [
      "البدء بملء أو عدّ العمود من الأعلى إلى الأسفل بدلاً من الانطلاق من القاعدة السفلية (١) باتجاه الأعلى (٥).",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الصور في كل عمود من الأسفل إلى الأعلى وتتبّع الرقم:",
          strategyHintAr:
            "ابدأ العدّ من الخانة السفلية (١) صعوداً إلى الأعلى، أو اقرأ الرقم المقابل على المحور العمودي.",
          params: {
            orientation: "vertical",
            titleAr: "أبراج الفواكه العمودية",
            categoryCount: 3,
            countsPattern: "decreasing-by-1",
            responseMode: "trace-and-write",
            comparisonRelation: "١ أقل",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني العمودي، وعدّ كل عمود من الأسفل إلى الأعلى ثم تتبّع الرقم وقارن (١ أقل):",
          strategyHintAr:
            "العمود الأقصر بخانة واحدة عن العمود المجاور له يحتوي على (١ أقل).",
          params: {
            orientation: "vertical",
            titleAr: "طيور وفراشات الحديقة",
            categories: [
              { objectId: "butterfly", count: 4, colorTheme: "violet" },
              { objectId: "bird", count: 3, colorTheme: "sky" },
              { objectId: "bee", count: 2, colorTheme: "amber" },
            ],
            responseMode: "trace-and-write",
            comparisonRelation: "١ أقل",
            comparisonPromptAr:
              "قارن بين عمود العصفور (٣) وعمود الفراشة (٤): هل عدد العصافير هو (١ أقل) أم (١ أكثر) أم (نفس العدد)؟",
            comparisonAnswerAr:
              "١ أقل: عمود العصفور (٣) أقصر بخانة واحدة فهو ١ أقل من عمود الفراشة (٤)",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الأعمدة في التمثيل البياني العمودي وتتبّع الأرقام ثم حدّد العمودين المتساويين (نفس العدد):",
          strategyHintAr:
            "العمودان اللذان يصلان إلى نفس الارتفاع على المحور العمودي لهما (نفس العدد).",
          params: {
            orientation: "vertical",
            titleAr: "ألعاب الصندوق",
            categories: [
              { objectId: "kite", count: 4, colorTheme: "violet" },
              { objectId: "ball", count: 4, colorTheme: "sky" },
              { objectId: "car", count: 3, colorTheme: "coral" },
            ],
            responseMode: "trace-and-write",
            comparisonRelation: "نفس العدد",
            comparisonPromptAr:
              "قارن بين عمود الكرة (٤) وعمود الطائرة الورقية (٤): هل لهما (نفس العدد) أم (١ أكثر) أم (١ أقل)؟",
            comparisonAnswerAr:
              "نفس العدد: العمودان يصلان إلى نفس الارتفاع (٤) على المحور العمودي",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr: "اكتب الأعداد من ذاكرتك واكتشف نمط تناقص الأعمدة:",
          strategyHintAr:
            "لاحظ كيف ينقص ارتفاع كل عمود تالٍ بمقدار خانة واحدة (١ أقل) من اليمين إلى اليسار.",
          params: {
            orientation: "vertical",
            titleAr: "تدرّج الأعمدة",
            categories: [
              { objectId: "star", count: 5, colorTheme: "amber" },
              { objectId: "sun", count: 4, colorTheme: "coral" },
              { objectId: "flower", count: 3, colorTheme: "rose" },
            ],
            responseMode: "write",
            comparisonRelation: "١ أقل",
            comparisonPromptAr:
              "كيف يتغيّر عدد الصور من العمود الأول (٥) إلى العمود الثاني (٤) ثم الثالث (٣)؟",
            comparisonAnswerAr:
              "ينقص كل عمود بمقدار (١ أقل) في كل خطوة: ٥ ثم ٤ ثم ٣",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr: "عدّ الصور في كل عمود وتتبّع الأرقام وقارن الارتفاعات:",
          strategyHintAr:
            "عدّ من الأسفل إلى الأعلى في كل عمود للتحقّق من العدد.",
          params: {
            orientation: "vertical",
            titleAr: "فواكه الطاولة",
            categoryCount: 3,
            countsPattern: "decreasing-by-1",
            responseMode: "trace-and-write",
            comparisonRelation: "١ أقل",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني العمودي وتتبّع الأرقام واكتبها، ثم حدّد العلاقة (١ أقل):",
          strategyHintAr: "قارن ارتفاع كل عمود بالعمود الذي يسبقه على اليمين.",
          params: {
            orientation: "vertical",
            titleAr: "أدوات مكتبتي",
            categoryCount: 3,
            countsPattern: "decreasing-by-1",
            responseMode: "trace-and-write",
            comparisonRelation: "١ أقل",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ عناصر الأعمدة وتتبّع الأرقام ثم قارن بين الفئات المتساوية (نفس العدد):",
          strategyHintAr: "ابحث عن العمودين اللذين يتساويان في الطول.",
          params: {
            orientation: "vertical",
            titleAr: "حيوانات المزرعة والبحر",
            categoryCount: 3,
            countsPattern: "with-equal-pair",
            responseMode: "trace-and-write",
            comparisonRelation: "نفس العدد",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr: "اكتب أعداد الأعمدة من ذاكرتك وقارن بينها:",
          strategyHintAr:
            "قارن بين كل عمودين متجاورين: كل عمود نحو اليسار يقلّ بمقدار ١ عن العمود الذي على يمينه.",
          params: {
            orientation: "vertical",
            titleAr: "حصاد الفواكه",
            categories: [
              { objectId: "apple", count: 5, colorTheme: "coral" },
              { objectId: "orange", count: 4, colorTheme: "amber" },
              { objectId: "banana", count: 3, colorTheme: "emerald" },
              { objectId: "strawberry", count: 2, colorTheme: "rose" },
            ],
            responseMode: "write",
            comparisonRelation: "١ أقل",
            comparisonPromptAr:
              "ما العلاقة بين كل عمود والعمود الذي يليه من اليمين إلى اليسار (٥، ٤، ٣، ٢)؟",
            comparisonAnswerAr:
              "كل عمود تالٍ يمثّل (١ أقل) من العمود السابق له بالتتابع",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr: "اقرأ التمثيل البياني العمودي واكتب الأعداد من ذاكرتك:",
          strategyHintAr:
            "اقرأ ارتفاع كل عمود بمحاذاة الأرقام ١–٥ على المحور العمودي.",
          params: {
            orientation: "vertical",
            titleAr: "أعمدة النجوم",
            categoryCount: 3,
            countsPattern: "decreasing-by-1",
            responseMode: "write",
            comparisonRelation: "١ أقل",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اكتب أعداد الفئات الأربع في التمثيل العمودي من ذاكرتك وقارن (١ أقل):",
          strategyHintAr:
            "لاحظ الترتيب التنازلي لأطوال الأعمدة من اليمين إلى اليسار.",
          params: {
            orientation: "vertical",
            titleAr: "أعمدة الطبيعة",
            categoryCount: 4,
            countsPattern: "decreasing-by-1",
            responseMode: "write",
            comparisonRelation: "١ أقل",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل العمودي للأعمدة الأربعة واكتب الأعداد ثم حدّد (نفس العدد):",
          strategyHintAr: "العمودان اللذان لهما نفس الارتفاع يمثلان نفس العدد.",
          params: {
            orientation: "vertical",
            titleAr: "أدواتي المفضلة",
            categoryCount: 4,
            countsPattern: "with-equal-pair",
            responseMode: "write",
            comparisonRelation: "نفس العدد",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "حلّل التمثيل البياني العمودي واكتب الأرقام من ذاكرتك ثم أجب:",
          strategyHintAr:
            "سواء رتّبنا الصور أفقياً أو عمودياً فإن الكلّ لكل فئة لا يتغيّر.",
          params: {
            orientation: "vertical",
            titleAr: "مقارنة الحلوى والفواكه",
            categories: [
              { objectId: "cupcake", count: 5, colorTheme: "rose" },
              { objectId: "strawberry", count: 4, colorTheme: "coral" },
              { objectId: "apple", count: 4, colorTheme: "emerald" },
              { objectId: "banana", count: 3, colorTheme: "amber" },
            ],
            responseMode: "write",
            comparisonRelation: "١ أقل",
            comparisonPromptAr:
              "بكم يقلّ عمود الفراولة (٤) عن عمود كعكة الكرز (٥)؟ وأي عمودين لهما نفس العدد؟",
            comparisonAnswerAr:
              "عمود الفراولة (٤) هو ١ أقل من كعكة الكرز (٥)، والفراولة والتفاحة لهما نفس العدد (٤)",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK21Blueprint);

export const lessonK22Blueprint: LessonBlueprint = {
  lessonId: "K-22",
  grade: "K",
  lessonNumber: 22,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-22"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-22"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: اطلب من الطلاب بناء (درج المكعبات) من ١ إلى ٥ بوضع الأبراج من اليمين إلى اليسار، وملاحظة أن كل برج جديد يرتفع بمكعب واحد (١ أكثر) عن البرج الذي يسبقه.",
    commonMisconceptionsAr: [
      "ترديد أسماء الأعداد آلياً (١، ٢، ٣، ٤، ٥) دون إدراك أن كل عدد تالٍ يمثّل كمية تزيد بمقدار ١ بالضبط على الكمية السابقة.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات المتداخلة من ١ إلى ٣ واكتب العدد المفقود (١ أكثر):",
          strategyHintAr:
            "لاحظ أن كل برج يزيد بمكعب واحد (١ أكثر)؛ ٢ هو ١ أكثر من ١، و٣ هو ١ أكثر من ٢.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [1, 2, 3],
            missingCount: 1,
            reasoningPromptAr: "بكم يزيد البرج الثاني (٢) على البرج الأول (١)؟",
            reasoningAnswerAr: "يزيد بمقدار مكعب واحد (٢ هو ١ أكثر من ١)",
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "رتّب وعدّ أبراج المكعبات تصاعدياً من ١ إلى ٤، وتتبّع واكتب العدد المفقود (١ أكثر):",
          strategyHintAr: "اتبع الزيادة بمقدار ١ في كل خطوة: ١، ٢، ٣، ٤.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [1, 2, 3, 4],
            missingCount: 1,
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ المجموعات المصوّرة تصاعدياً (٢ ← ٣ ← ٤ ← ٥) واكتب العدد المفقود:",
          strategyHintAr: "كل مجموعة تالية تحتوي على عنصر واحد إضافي (١ أكثر).",
          params: {
            sequenceMode: "forward",
            visualKind: "everyday-object",
            numbers: [2, 3, 4, 5],
            missingCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr: "أكمل الأعداد المفقودة في درج المكعبات (١ ← ٥) وأجب:",
          strategyHintAr:
            "تذكّر قاعدة العدّ التصاعدي: كل عدد تالٍ هو ١ أكثر من العدد السابق له.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [1, 2, 3, 4, 5],
            missingCount: 2,
            reasoningPromptAr:
              "ما العدد الذي يمثّل (١ أكثر) من ٣؟ وما العدد الذي يمثّل (١ أكثر) من ٤؟",
            reasoningAnswerAr:
              "العدد ٤ هو ١ أكثر من ٣، والعدد ٥ هو ١ أكثر من ٤",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات تصاعدياً من ١ إلى ٤ واكتب العدد المفقود:",
          strategyHintAr: "كل خطوة نحو اليسار تزيد بمكعب واحد (١ أكثر).",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [1, 2, 3, 4],
            missingCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات المتداخلة تصاعدياً من ١ إلى ٥، وتتبّع واكتب العددين المفقودين:",
          strategyHintAr:
            "راقب ارتفاع الأبراج: ٢ هو ١ أكثر من ١، و٣ هو ١ أكثر من ٢، و٤ هو ١ أكثر من ٣، و٥ هو ١ أكثر من ٤.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [1, 2, 3, 4, 5],
            missingCount: 2,
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ مجموعات الأشياء تصاعدياً (١ ← ٢ ← ٣ ← ٤ ← ٥) وأكمل الأعداد المفقودة:",
          strategyHintAr: "استخدم قاعدة (١ أكثر) للتحقّق من كل عدد في السلسلة.",
          params: {
            sequenceMode: "forward",
            visualKind: "everyday-object",
            numbers: [1, 2, 3, 4, 5],
            missingCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "أكمل الأعداد المفقودة في درج المكعبات من ١ إلى ٥ وفسّر العلاقة:",
          strategyHintAr: "قارن بين كل برج والبرج الذي يسبقه مباشرة.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [1, 2, 3, 4, 5],
            missingCount: 3,
            reasoningPromptAr:
              "كيف نعرف العدد الذي يأتي بعد ٣ مباشرة وبعد ٤ مباشرة باستخدام مفهوم (١ أكثر)؟",
            reasoningAnswerAr:
              "نضيف ١ إلى ٣ فنحصل على ٤ (٤ هو ١ أكثر من ٣)، ونضيف ١ إلى ٤ فنحصل على ٥ (٥ هو ١ أكثر من ٤)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr: "أكمل تسلسل المكعبات التصاعدي من ١ إلى ٥:",
          strategyHintAr: "تحقّق من أن الفرق بين كل عددين متتاليين هو ١ أكثر.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [1, 2, 3, 4, 5],
            missingCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr: "أكمل ثلاثة أعداد مفقودة في درج المكعبات التصاعدي (١ ← ٥):",
          strategyHintAr: "ابدأ من ١ وأضف ١ في كل خطوة (١ أكثر).",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [1, 2, 3, 4, 5],
            missingCount: 3,
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "أكمل تسلسل لوحات الخمسة التصاعدي من ١ إلى ٥ واكتب الأعداد المفقودة:",
          strategyHintAr:
            "عدّ الأقراص في كل لوحة ولاحظ نقصان الخانات الفارغة بواحدة في كل خطوة.",
          params: {
            sequenceMode: "forward",
            visualKind: "five-frame",
            numbers: [1, 2, 3, 4, 5],
            missingCount: 3,
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "أكمل تسلسل المكعبات التصاعدي من ١ إلى ٥ وأجب عن سؤال الاستنتاج:",
          strategyHintAr: "كل خطوة للأمام تضيف ١؛ خطوتان للأمام تضيفان ١ ثم ١.",
          params: {
            sequenceMode: "forward",
            visualKind: "snap-cubes",
            numbers: [1, 2, 3, 4, 5],
            missingValues: [2, 3, 4, 5],
            reasoningPromptAr:
              "إذا بدأنا بالعدد ٢ وأخذنا خطوة واحدة للأمام (١ أكثر) ثم خطوة أخرى (١ أكثر)، فإلى أي عدد نصل؟",
            reasoningAnswerAr:
              "نصل إلى ٣ في الخطوة الأولى ثم إلى ٤ في الخطوة الثانية",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK22Blueprint);

export const lessonK23Blueprint: LessonBlueprint = {
  lessonId: "K-23",
  grade: "K",
  lessonNumber: 23,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-23"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-23"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: ابدأ بقطار من ٥ مكعبات متداخلة، واطلب من الطلاب العدّ التنازلي أثناء فكّ مكعب واحد في كل مرة (٥، ٤، ٣، ٢، ١) لتمثيل مفهوم (١ أقل) والتمهيد لعملية الطرح.",
    commonMisconceptionsAr: [
      "العودة التلقائية إلى العدّ التصاعدي بعد الرقم ٤ أو الخلط بين مفهوم (يأتي قبل / ١ أقل) ومفهوم (يأتي بعد / ١ أكثر).",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات تنازلياً من ٤ إلى ١ واكتب العدد المفقود (١ أقل):",
          strategyHintAr:
            "لاحظ أن كل برج ينقص بمكعب واحد (١ أقل) عن البرج الذي يسبقه.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [4, 3, 2, 1],
            missingCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات المتداخلة تنازلياً من ٥ إلى ٢، وتتبّع واكتب العدد المفقود (١ أقل):",
          strategyHintAr:
            "ما العدد الذي يقلّ بـ ١ عن ٥؟ إنه ٤؛ وما العدد الذي يقلّ بـ ١ عن ٤؟ إنه ٣.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [5, 4, 3, 2],
            missingCount: 1,
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ المجموعات المصوّرة تنازلياً (٥ ← ٤ ← ٣ ← ٢ ← ١) واكتب العدد المفقود:",
          strategyHintAr:
            "كل مجموعة تالية تقلّ بعنصر واحد (١ أقل) عن المجموعة السابقة لها.",
          params: {
            sequenceMode: "backward",
            visualKind: "everyday-object",
            numbers: [5, 4, 3, 2, 1],
            missingCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr: "أكمل الأعداد المفقودة من ٥ إلى ١ وأجب عن سؤال (١ أقل):",
          strategyHintAr:
            "العدد الذي يأتي قبل ٥ هو ١ أقل من ٥ أي ٤، والعدد الذي يأتي قبل ٤ هو ٣.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [5, 4, 3, 2, 1],
            missingCount: 2,
            reasoningPromptAr:
              "ما العدد الذي يقلّ بـ ١ عن ٥ ويأتي قبله؟ وما العدد الذي يقلّ بـ ١ عن ٤ ويأتي قبله؟",
            reasoningAnswerAr:
              "العدد ٤ يقلّ بـ ١ عن ٥، والعدد ٣ يقلّ بـ ١ عن ٤",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ تنازلياً من ٥ إلى ٢ باستخدام أبراج المكعبات واكتب العدد المفقود:",
          strategyHintAr: "في كل خطوة نحو اليسار ننقص مكعباً واحداً (١ أقل).",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [5, 4, 3, 2],
            missingCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات المتداخلة تنازلياً من ٥ إلى ١، وتتبّع واكتب العددين المفقودين:",
          strategyHintAr:
            "٥ ثم ٤ (١ أقل)، ثم ٣ (١ أقل)، ثم ٢ (١ أقل)، ثم ١ (١ أقل).",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [5, 4, 3, 2, 1],
            missingCount: 2,
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "رتّب وعدّ مجموعات العناصر تنازلياً من ٥ إلى ١ واكتب الأعداد المفقودة:",
          strategyHintAr:
            "تحقّق من أن كل مجموعة تقلّ بعنصر واحد عن المجموعة التي تسبقها.",
          params: {
            sequenceMode: "backward",
            visualKind: "everyday-object",
            numbers: [5, 4, 3, 2, 1],
            missingCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr: "أكمل الأعداد المفقودة في درج المكعبات التنازلي وأجب:",
          strategyHintAr: "العدّ التنازلي يمهّد للطرح لأننا نأخذ ١ في كل خطوة.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [5, 4, 3, 2, 1],
            missingCount: 3,
            reasoningPromptAr:
              "كيف يساعدنا العدّ التنازلي (٥، ٤، ٣، ٢، ١) على معرفة كم يتبقّى عند أخذ مكعب واحد؟",
            reasoningAnswerAr:
              "لأن كل عدد في العدّ التنازلي يمثّل (١ أقل) أي ناتج أخذ مكعب واحد من العدد السابق",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr: "أكمل تسلسل المكعبات التنازلي من ٥ إلى ١:",
          strategyHintAr: "تحقّق من نقصان مكعب واحد (١ أقل) في كل خطوة.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [5, 4, 3, 2, 1],
            missingCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr: "أكمل ثلاثة أعداد مفقودة في درج المكعبات التنازلي (٥ ← ١):",
          strategyHintAr: "ابدأ من ٥ وانزل خطوة واحدة (١ أقل) في كل مرة.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [5, 4, 3, 2, 1],
            missingCount: 3,
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "أكمل تسلسل لوحات الخمسة التنازلي من ٥ إلى ١ واكتب الأعداد المفقودة:",
          strategyHintAr: "كل لوحة تالية تحتوي على خانة فارغة إضافية (١ أقل).",
          params: {
            sequenceMode: "backward",
            visualKind: "five-frame",
            numbers: [5, 4, 3, 2, 1],
            missingCount: 3,
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr: "أكمل السلسلة التنازلية من ٥ إلى ١ وأجب عن سؤال الاستنتاج:",
          strategyHintAr:
            "ارجع خطوة واحدة من ٤ لتحصل على ٣، ثم خطوة أخرى لتحصل على ٢.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [5, 4, 3, 2, 1],
            missingValues: [4, 3, 2, 1],
            reasoningPromptAr:
              "إذا بدأنا من البرج ذي ٤ مكعبات وأخذنا مكعباً واحداً (١ أقل)، ثم أخذنا مكعباً آخر (١ أقل)، فكم مكعباً يتبقّى؟",
            reasoningAnswerAr:
              "يتبقّى ٣ مكعبات بعد الخطوة الأولى، ثم يتبقّى مكعبان (٢) بعد الخطوة الثانية",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK23Blueprint);

export const lessonK24Blueprint: LessonBlueprint = {
  lessonId: "K-24",
  grade: "K",
  lessonNumber: 24,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-24"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-24"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: ضع ٣ تفاحات أو مكعبات أمام الطلاب، واطلب من طالب أخذ ١ (يبقى ٢)، ثم أخذ ١ (يبقى ١)، ثم أخذ ١، واسأل: كم بقي الآن؟ (لا شيء = صفر ٠)، ثم مثّل ذلك بشطب الأقراص على لوحة الخمسة وتتبع الرقم ٠.",
    commonMisconceptionsAr: [
      "الاعتقاد بأن الصفر (٠) ليس عدداً، أو الخلط بين شكل الرقم العربي الشرقي (٠) على هيئة نقطة معيّنة والحرف أو الرقم ٥.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "نبدأ بقرصين على لوحة الخمسة ونشطب قرصاً واحداً في كل مرة حتى يبقى صفر (٠):",
          strategyHintAr:
            "عندما نشطب جميع الأقراص على لوحة الخمسة لا يتبقّى أي قرص، ونكتب العدد صفر (٠).",
          params: {
            sequenceMode: "zero-take-away",
            visualKind: "five-frame",
            numbers: [2, 1, 0],
            missingValues: [0],
            includeZeroTrace: true,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "ابدأ بـ ٣ أقراص على لوحة الخمسة، واشطب ١ في كل خطوة (٣ ← ٢ ← ١ ← ٠) ثم تتبّع الرقم ٠ واكتبه:",
          strategyHintAr:
            "٣ شطبنا منها ١ فبقي ٢، ثم شطبنا ١ فبقي ١، ثم شطبنا ١ فلم يبقَ شيء (٠).",
          params: {
            sequenceMode: "zero-take-away",
            visualKind: "five-frame",
            numbers: [3, 2, 1, 0],
            missingValues: [0],
            includeZeroTrace: true,
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "لاحظ الأقراص المشطوبة على لوحات الخمسة، وتتبّع الرقم المنقّط (٠) واكتب الأعداد المتبقية:",
          strategyHintAr:
            "عدّ فقط الأقراص السليمة غير المشطوبة؛ إذا كانت كل الأقراص مشطوبة فالعدد هو ٠.",
          params: {
            sequenceMode: "zero-take-away",
            visualKind: "five-frame",
            steps: [
              {
                value: 2,
                crossedOutFrom: 3,
                isMissing: false,
                stepNoteAr: "٣ شُطب منها ١ فبقي ٢",
              },
              {
                value: 1,
                crossedOutFrom: 3,
                isMissing: true,
                stepNoteAr: "٣ شُطب منها ٢ فبقي ١",
              },
              {
                value: 0,
                crossedOutFrom: 3,
                isMissing: true,
                stepNoteAr: "٣ شُطبت كلها فبقي صفر (٠)",
              },
            ],
            includeZeroTrace: true,
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr: "أكمل قصة أخذ الأقراص من ٣ حتى ٠ وأجب عن السؤال:",
          strategyHintAr:
            "العدد صفر (٠) يصف المجموعة الفارغة التي لم يتبقَّ فيها أي عنصر.",
          params: {
            sequenceMode: "zero-take-away",
            visualKind: "five-frame",
            numbers: [3, 2, 1, 0],
            missingValues: [1, 0],
            includeZeroTrace: true,
            reasoningPromptAr:
              "كان على لوحة الخمسة ٣ أقراص، أخذنا ١ ثم ١ ثم ١؛ كم قرصاً بقي؟ وما اسم هذا العدد؟",
            reasoningAnswerAr: "لم يبقَ أي قرص (٠)، ويسمّى هذا العدد «صفر» (٠)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "تتبّع أخذ الأقراص واحداً بعد الآخر (٣ ← ٢ ← ١ ← ٠) وتتبّع الرقم ٠:",
          strategyHintAr:
            "كل خطوة نشطب قرصاً واحداً (١ أقل) حتى نصل إلى الصفر (٠).",
          params: {
            sequenceMode: "zero-take-away",
            visualKind: "five-frame",
            numbers: [3, 2, 1, 0],
            missingValues: [0],
            includeZeroTrace: true,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "أكمل الأعداد المتبقية على لوحات الخمسة من ٣ إلى ٠ وتتبّع الرقم (٠):",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة في كل لوحة خمسة ثم تتبّع الرقم ٠.",
          params: {
            sequenceMode: "zero-take-away",
            visualKind: "five-frame",
            numbers: [3, 2, 1, 0],
            missingValues: [2, 0],
            includeZeroTrace: true,
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "ابدأ بـ ٤ أقراص على لوحة الخمسة واشطب ١ في كل خطوة حتى تصل إلى الصفر (٠):",
          strategyHintAr:
            "٤ ثم ٣ ثم ٢ ثم ١ ثم ٠ عندما تُشطب جميع الأقراص الأربعة.",
          params: {
            sequenceMode: "zero-take-away",
            visualKind: "five-frame",
            numbers: [4, 3, 2, 1, 0],
            missingValues: [1, 0],
            includeZeroTrace: true,
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr: "تتبّع من ٥ حتى ٠ وأجب عن السؤال:",
          strategyHintAr:
            "عندما نشطب ٥ أقراص من أصل ٥ أقراص على لوحة الخمسة فإن الباقي يساوي ٠.",
          params: {
            sequenceMode: "zero-take-away",
            visualKind: "five-frame",
            steps: [
              {
                value: 5,
                crossedOutFrom: 5,
                isMissing: false,
                stepNoteAr: "لوحة خمسة ممتلئة (٥)",
              },
              {
                value: 2,
                crossedOutFrom: 5,
                isMissing: true,
                stepNoteAr: "٥ شُطب منها ٣ فبقي ٢",
              },
              {
                value: 0,
                crossedOutFrom: 5,
                isMissing: true,
                stepNoteAr: "٥ شُطبت كلها فبقي صفر (٠)",
              },
            ],
            includeZeroTrace: true,
            reasoningPromptAr:
              "إذا كانت لوحة الخمسة ممتلئة بـ ٥ أقراص وشطبنا الأقراص الخمسة جميعها، فكم قرصاً يبقى؟",
            reasoningAnswerAr:
              "يبقى صفر (٠) من الأقراص لأننا شطبنا الخمسة كلها",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr: "أكمل العدّ التنازلي مع الصفر (٣ ← ٢ ← ١ ← ٠):",
          strategyHintAr: "العدد صفر (٠) هو ١ أقل من ١.",
          params: {
            sequenceMode: "zero-take-away",
            visualKind: "five-frame",
            numbers: [3, 2, 1, 0],
            missingValues: [1, 0],
            includeZeroTrace: true,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "أكمل سلسلة الشطب التنازلية من ٤ إلى ٠ على لوحات الخمسة وتتبّع الرقم ٠:",
          strategyHintAr:
            "في كل خطوة نشطب قرصاً إضافياً حتى لا يبقى أي قرص (٠).",
          params: {
            sequenceMode: "zero-take-away",
            visualKind: "five-frame",
            numbers: [4, 3, 2, 1, 0],
            missingValues: [3, 1, 0],
            includeZeroTrace: true,
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "اقرأ لوحات الخمسة واكتب عدد الأقراص المتبقية بعد الشطب بما فيها الصفر (٠):",
          strategyHintAr:
            "عندما تكون جميع الأقراص مشطوبة بعلامة ✕ فإن العدد المتبقي هو ٠.",
          params: {
            sequenceMode: "zero-take-away",
            visualKind: "five-frame",
            steps: [
              {
                value: 0,
                crossedOutFrom: 2,
                isMissing: true,
                stepNoteAr: "قرصان شُطبا بالكامل فبقي ٠",
              },
              {
                value: 2,
                crossedOutFrom: 5,
                isMissing: true,
                stepNoteAr: "٥ شُطب منها ٣ فبقي ٢",
              },
              {
                value: 0,
                crossedOutFrom: 5,
                isMissing: true,
                stepNoteAr: "٥ شُطبت بالكامل فبقي ٠",
              },
            ],
            includeZeroTrace: true,
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr: "قارن بين لوحات الخمسة واكتب الأعداد المتبقية ثم أجب:",
          strategyHintAr:
            "سواء شطبنا ٣ من ٣ أو ٥ من ٥، فإن النتيجة المتبقية هي دائماً صفر (٠).",
          params: {
            sequenceMode: "zero-take-away",
            visualKind: "five-frame",
            steps: [
              {
                value: 0,
                crossedOutFrom: 3,
                isMissing: true,
                stepNoteAr: "٣ شُطبت كلها ← ٠",
              },
              {
                value: 0,
                crossedOutFrom: 5,
                isMissing: true,
                stepNoteAr: "٥ شُطبت كلها ← ٠",
              },
              {
                value: 1,
                crossedOutFrom: 4,
                isMissing: true,
                stepNoteAr: "٤ شُطب منها ٣ ← ١",
              },
            ],
            includeZeroTrace: true,
            reasoningPromptAr:
              "في اللوحة الأولى شطبنا ٣ من ٣، وفي اللوحة الثانية شطبنا ٥ من ٥؛ هل الكمية المتبقية في اللوحتين متساوية؟",
            reasoningAnswerAr:
              "نعم، الكمية المتبقية في اللوحتين متساوية وتساوي صفراً (٠) لأنه لم يتبقَّ أي قرص",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK24Blueprint);

export const lessonK25Blueprint: LessonBlueprint = {
  lessonId: "K-25",
  grade: "K",
  lessonNumber: 25,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-25"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-25"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي زمني (خارج الورقة): اعرض بطاقات لوحة الخمسة أمام الطلاب لمدة ٣ ثوانٍ فقط ثم أخفِها (وقت لا يكفي للعدّ الفردي)، واطلب منهم تسمية العدد بسرعة بالاعتماد على الخانات المملوءة والخانات الفارغة (كاملة = ٥، ١ فارغ = ٤، ٢ فارغ = ٣).",
    commonMisconceptionsAr: [
      "محاولة العدّ الفردي بالأصبع (١، ٢، ٣...) بدلاً من استخدام بنية لوحة الخمسة والخانات الفارغة للتعرّف السريع على الكمية.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة الخمسة في لمحة واحدة وحدّد كم قرصاً موجوداً وكم خانة فارغة لإكمال ٥:",
          strategyHintAr:
            "إذا كانت لوحة الخمسة ممتلئة فالعدد ٥؛ وإذا كانت خانة واحدة فارغة فالعدد ٤.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame",
            candidateCounts: [5, 4, 3],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "اعرف العدد بسرعة دون عدّ فردي: لاحظ الخانات الفارغة على لوحة الخمسة واكتب الموجود والفارغ:",
          strategyHintAr:
            "خانة واحدة فارغة تعني أن الموجود هو ٤؛ وخانتان فارغتان تعنيان أن الموجود هو ٣.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame",
            candidateCounts: [5, 4, 3],
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "تعرّف بسرعة على الكمية الممثّلة على لوحة الخمسة وبطاقة النرد دون عدّ فردي:",
          strategyHintAr:
            "اربط بين شكل النقاط على النرد والخانات المملوءة على لوحة الخمسة.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame-and-dice",
            candidateCounts: [3, 4, 5],
            cardCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr: "حدّد الأعداد بسرعة دون عدّ وأجب عن سؤال الاستراتيجية:",
          strategyHintAr:
            "بدلاً من عدّ ٤ أقراص واحداً تلو الآخر، نلاحظ وجود خانة واحدة فارغة فقط من أصل ٥.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame",
            candidateCounts: [4, 3, 5],
            cardCount: 2,
            reasoningPromptAr:
              "كيف نعرف فوراً بدون عدّ أن لوحة الخمسة تحتوي على ٤ أقراص عندما نرى خانة واحدة فارغة؟",
            reasoningAnswerAr:
              "لأن لوحة الخمسة الكاملة تتسع لـ ٥، وعندما تكون خانة واحدة فارغة يكون الموجود ٤ فوراً",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "اعرف العدد بسرعة على لوحة الخمسة بالاعتماد على الخانات المملوءة والفارغة:",
          strategyHintAr:
            "اللوحة الكاملة = ٥، خانة فارغة = ٤، خانتان فارغتان = ٣.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame",
            candidateCounts: [5, 4, 3],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "في لمحة واحدة دون عدّ فردي: اكتب عدد الأقراص الموجودة وعدد الخانات الفارغة على كل لوحة خمسة:",
          strategyHintAr:
            "انظر إلى مجموعة الأقراص كوحدة واحدة وإلى الخانات الفارغة كوحدة مكمّلة لـ ٥.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame",
            candidateCounts: [2, 3, 4, 5],
            cardCount: 3,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "تعرّف بسرعة على الأعداد الممثّلة بلوحة الخمسة ونقاط النرد واكتب الجزأين:",
          strategyHintAr:
            "قارن بين تجميع النقاط على النرد والخانات المملوءة في لوحة الخمسة.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame-and-dice",
            candidateCounts: [2, 3, 4, 5],
            cardCount: 3,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr: "حدّد الموجود والفارغ في كل لوحة خمسة وأجب عن السؤال:",
          strategyHintAr: "خانتان فارغتان من ٥ تتركان ٣ خانات مملوءة.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame-and-dice",
            candidateCounts: [3, 4, 5],
            cardCount: 3,
            reasoningPromptAr:
              "كم قرصاً يوجد على لوحة الخمسة إذا كانت خانتان (٢) فارغتين؟ وكم إذا كانت اللوحة ممتلئة بالكامل؟",
            reasoningAnswerAr:
              "إذا كانت خانتان فارغتين يوجد ٣ أقراص، وإذا كانت ممتلئة بالكامل يوجد ٥ أقراص",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr: "تعرّف بسرعة على الكميات في لوحة الخمسة والنرد:",
          strategyHintAr: "لاحظ المجموعات الجزئية داخل العدد.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame-and-dice",
            candidateCounts: [3, 4, 5],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "حدّد بسرعة العدد الموجود والعدد الفارغ على لوحات الخمسة ونقاط النرد:",
          strategyHintAr:
            "استنتج الموجود من عدد الخانات الفارغة في لمحة واحدة.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame-and-dice",
            candidateCounts: [1, 2, 3, 4, 5],
            cardCount: 3,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "اربط بين لوحة الخمسة ومجموعات الأشكال الهندسية بالتعرّف السريع دون عدّ فردي:",
          strategyHintAr: "لاحظ عدد الأشكال ومثيله على لوحة الخمسة.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame-and-shapes",
            candidateCounts: [2, 3, 4, 5],
            cardCount: 3,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr: "حلّل بطاقات التعرّف السريع واكتب الموجود والفارغ ثم أجب:",
          strategyHintAr:
            "معرفة العدد المفقود هي أسرع طريق لمعرفة العدد الموجود على لوحة الخمسة.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame-and-dice",
            candidateCounts: [2, 3, 4],
            cardCount: 3,
            reasoningPromptAr:
              "أيهما أسرع لمعرفة أن على لوحة الخمسة ٤ أقراص: عدّ الأقراص الأربعة واحداً بواحد أم رؤية خانة واحدة فارغة؟ ولماذا؟",
            reasoningAnswerAr:
              "رؤية خانة واحدة فارغة أسرع، لأننا ندرك فوراً أن ٤ و١ يكوّنان ٥ دون الحاجة للعدّ الفردي",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK25Blueprint);

export const lessonK26Blueprint: LessonBlueprint = {
  lessonId: "K-26",
  grade: "K",
  lessonNumber: 26,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-26"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-26"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي زمني (خارج الورقة): اعرض بطاقات لوحة الخمسة ومجموعات الأشكال الهندسية لمدة ٣ ثوانٍ فقط، واطلب من الطلاب تسمية الجزأين معاً (كم موجود؟ وكم ينقص لإكمال ٥؟) لترسيخ مكوّنات العدد ٥.",
    commonMisconceptionsAr: [
      "تسمية الجزء الموجود فقط ونسيان الجزء الفارغ المكمل للعدد ٥، أو عدم إدراك أن مجموع الجزأين يساوي دائماً الكل (٥).",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة الخمسة وحدّد الجزأين (الموجود والفارغ) اللذين يكوّنان ٥:",
          strategyHintAr:
            "الجزء الموجود والجزء الفارغ على لوحة الخمسة يجتمعان معاً لتكوين الكل (٥).",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame",
            candidateCounts: [4, 3, 2],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "تعرّف بسرعة على الجزأين في كل لوحة خمسة: اكتب كم قرصاً موجوداً وكم قرصاً ينقص لإكمال ٥:",
          strategyHintAr:
            "إذا كان الموجود ٤ ينقصه ١؛ وإذا كان الموجود ٣ ينقصه ٢ لإكمال ٥.",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame",
            candidateCounts: [4, 3, 2, 5],
            cardCount: 2,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "لاحظ لوحة الخمسة والأشكال الهندسية المرافقة، واكتب الجزأين اللذين يكوّنان العدد ٥:",
          strategyHintAr:
            "سمِّ الشكل الهندسي ثم حدّد كم موجود منه وكم ينقصه للوصول إلى ٥.",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame-and-shapes",
            candidateCounts: [3, 4, 2],
            cardCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr: "حدّد الجزأين في كل بطاقة وأجب عن سؤال الأجزاء والكل:",
          strategyHintAr: "معاً، الجزء الموجود والجزء الناقص يصنعان الكل (٥).",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame-and-shapes",
            candidateCounts: [3, 2, 4],
            cardCount: 2,
            reasoningPromptAr:
              "إذا رأيت ٣ مثلثات في الجزء الأول، فكم مثلثاً ينقص في الجزء الثاني ليكتمل الكل (٥)؟",
            reasoningAnswerAr:
              "ينقص مثلثان (٢)، لأن ٣ و٢ يكوّنان معاً الكل (٥)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "سمِّ الجزأين اللذين يكوّنان ٥ على لوحة الخمسة في لمحة واحدة:",
          strategyHintAr: "لاحظ الخانات المملوءة والخانات الفارغة معاً.",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame",
            candidateCounts: [3, 4, 2],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "اعرف العدد بسرعة: اكتب الجزأين (الموجود والفارغ) اللذين يكوّنان الكل (٥) على لوحة الخمسة:",
          strategyHintAr:
            "ركّز على أزواج الأعداد التي تصنع ٥: (٤ و١)، (٣ و٢)، (٢ و٣)، (١ و٤)، (٥ و٠).",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame",
            candidateCounts: [1, 2, 3, 4, 5],
            cardCount: 3,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "تعرّف بسرعة على الأشكال الهندسية ولوحة الخمسة، واكتب الجزأين المكوّنين للعدد ٥:",
          strategyHintAr:
            "اربط بين التعرّف السريع على الكميات وتسمية الأشكال الهندسية.",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame-and-shapes",
            candidateCounts: [2, 3, 4, 5],
            cardCount: 3,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr: "أكمل البطاقات الثلاث ثم أجب عن السؤال:",
          strategyHintAr: "جميع أزواج الأجزاء على لوحة الخمسة تجتمع لتساوي ٥.",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame-and-shapes",
            candidateCounts: [2, 3, 4],
            cardCount: 3,
            reasoningPromptAr:
              "اذكر طريقتين مختلفتين لتكوين العدد ٥ من جزأين على لوحة الخمسة.",
            reasoningAnswerAr:
              "الطريقة الأولى: ٤ موجود و١ فارغ (٤ و١ = ٥)، والطريقة الثانية: ٣ موجود و٢ فارغ (٣ و٢ = ٥)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr: "حدّد الجزأين المكوّنين للعدد ٥ مع الأشكال الهندسية:",
          strategyHintAr: "انظر إلى الموجود والفارغ في لمحة واحدة.",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame-and-shapes",
            candidateCounts: [2, 3, 4],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "أكمل مكوّنات العدد ٥ (الأجزاء والكل) باستخدام لوحة الخمسة والأشكال الهندسية:",
          strategyHintAr:
            "تأكّد من أن مجموع الموجود والفارغ في كل بطاقة يساوي ٥.",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame-and-shapes",
            candidateCounts: [1, 2, 3, 4, 5],
            cardCount: 3,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "تعرّف بسرعة على الجزأين والكل (٥) باستخدام لوحة الخمسة ونقاط النرد:",
          strategyHintAr: "قارن بين البطاقات المتعاكسة مثل (٣ و٢) و(٢ و٣).",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame-and-dice",
            candidateCounts: [1, 2, 3, 4],
            cardCount: 3,
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr: "حلّل أجزاء العدد ٥ على لوحات الخمسة والأشكال ثم أجب:",
          strategyHintAr:
            "عند تبديل عدد الخانات المملوءة والفارغة (مثل ٣ و٢ إلى ٢ و٣) يظل الكل ثابتاً ويساوي ٥.",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame-and-shapes",
            candidateCounts: [1, 2, 3, 4],
            cardCount: 3,
            reasoningPromptAr:
              "في لوحة خمسة أولى لدينا ٣ أقراص موجودة و٢ فارغة، وفي لوحة ثانية لدينا قرصان موجودان (٢) و٣ فارغة؛ هل الكل في اللوحتين متساوٍ؟",
            reasoningAnswerAr:
              "نعم، الكل متساوٍ في اللوحتين ويساوي ٥، لأن (٣ و٢) وكذلك (٢ و٣) يكوّنان ٥",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK26Blueprint);
