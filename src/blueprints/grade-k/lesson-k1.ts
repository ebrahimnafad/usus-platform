import { defineLessonBlueprint } from "@/blueprints/registry";

export const lessonK1Blueprint = defineLessonBlueprint({
  lessonId: "K-1",
  grade: "K",
  lessonNumber: 1,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "انظر إلى الفواكه الملوّنة: صل بخط بين كل فاكهة في العمود الأيمن والفاكهة المطابقة لها تماماً في العمود الأيسر (٣ أشياء):",
          strategyHintAr:
            "ابدأ من التفاحة أو الموزة في العمود الأيمن، لاحظ شكلها ولونها، ثم ابحث عن الفاكهة المطابقة لها في العمود الأيسر وصل بينهما بخط واحد.",
          params: {
            pairCount: 3,
            categories: ["fruits"],
            rightColumnTitleAr: "المجموعة الأولى",
            leftColumnTitleAr: "المجموعة المطابقة",
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل حيوان في العمود الأيمن والحيوان المطابق له في العمود الأيسر (٣ أشياء):",
          strategyHintAr:
            "ركّز على شكل كل حيوان (الأجنحة، الأذنان، الزعانف) لتصِلْ كل حيوان في العمود الأيمن بنظيره في العمود الأيسر دون ترك أي عنصر.",
          params: {
            pairCount: 3,
            categories: ["animals"],
            rightColumnTitleAr: "حيوانات المزرعة والطبيعة",
            leftColumnTitleAr: "الحيوان المطابق",
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل لعبة في العمود الأيمن واللعبة المطابقة لها في العمود الأيسر (٣ أشياء):",
          strategyHintAr:
            "تتبّع الألعاب من الأعلى إلى الأسفل عنصراً تلو الآخر لتحقيق التقابل الأحادي (١ إلى ١).",
          params: {
            pairCount: 3,
            categories: ["toys"],
            rightColumnTitleAr: "صندوق الألعاب",
            leftColumnTitleAr: "اللعبة المطابقة",
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل أداة مدرسية في العمود الأيمن بالأداة المطابقة لها في العمود الأيسر (٣ أشياء):",
          strategyHintAr:
            "ميّز بين القلم والكتاب والحقيبة من خلال الشكل الخارجي والتفاصيل، ثم أجب عن سؤال المقارنة.",
          params: {
            pairCount: 3,
            categories: ["school"],
            rightColumnTitleAr: "أدواتي المدرسية",
            leftColumnTitleAr: "الأداة المطابقة",
            comparisonPromptAr:
              "هل يتساوى عدد الأدوات في العمود الأيمن والعمود الأيسر؟",
            comparisonAnswerAr:
              "نعم، كل عنصر يقابله عنصر واحد تماماً (٣ مقابل ٣)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل عنصر في العمود الأيمن والعنصر المطابق له في العمود الأيسر (٤ أشياء):",
          strategyHintAr:
            "قارن بين العناصر الأربعة في العمودين، وصِلْ كل عنصر بنظيره المطابق تماماً في الشكل واللون.",
          params: {
            pairCount: 4,
            categories: ["fruits", "nature"],
            rightColumnTitleAr: "العمود الأيمن",
            leftColumnTitleAr: "العمود الأيسر",
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "لاحظ الصور جيداً: صل بخط بين كل صورة في العمود الأيمن والصورة التي تطابقها في العمود الأيسر (٤ أشياء):",
          strategyHintAr:
            "افحص كل صورة في العمود الأيمن (الفراشة، السمكة، السيارة، الزهرة...) وابحث عن الشكل المطابق لها في العمود المقابل.",
          params: {
            pairCount: 4,
            categories: ["animals", "toys"],
            rightColumnTitleAr: "الصور الأساسية",
            leftColumnTitleAr: "الصور المطابقة",
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل غرض من أغراض الصف والطبيعة في العمود الأيمن بمطابقه في العمود الأيسر (٤ أشياء):",
          strategyHintAr:
            "استخدم إصبعك لتتبّع المسار من النقطة اليمنى إلى النقطة اليسرى قبل رسم خط التوصيل.",
          params: {
            pairCount: 4,
            categories: ["school", "nature"],
            rightColumnTitleAr: "أغراض متنوّعة",
            leftColumnTitleAr: "الغرض المطابق",
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل عنصر وما يطابقه في العمود المقابل (٤ أشياء) ثم أجب:",
          strategyHintAr:
            "تأكّد من فحص جميع التفاصيل الصغيرة في كل رسمة للتحقّق من التطابق التام (١ إلى ١).",
          params: {
            pairCount: 4,
            categories: ["fruits", "school", "treats"],
            rightColumnTitleAr: "المجموعة (أ)",
            leftColumnTitleAr: "المجموعة (ب)",
            comparisonPromptAr: "كيف عرفت أن الصورتين متطابقتان؟",
            comparisonAnswerAr:
              "لأنهما متماثلتان في الشكل واللون والتفاصيل (تقابل ١ إلى ١)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "قارن بدقة بين العناصر الخمسة وصِلْ كل عنصر في العمود الأيمن بنظيره المطابق في العمود الأيسر (٥ أشياء):",
          strategyHintAr:
            "عند وجود ٥ عناصر متقاربة، ابدأ بالعناصر ذات العلامات البارزة أولاً ثم أكمل الباقي بالتتابع.",
          params: {
            pairCount: 5,
            categories: ["fruits", "animals"],
            rightColumnTitleAr: "العمود الأيمن (٥ أشياء)",
            leftColumnTitleAr: "العمود الأيسر (٥ أشياء)",
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل صورة في العمود الأيمن والصورة المطابقة لها تماماً في العمود الأيسر (٥ أشياء):",
          strategyHintAr:
            "ميّز بدقة بين الأدوات المتشابهة (مثل قلم الرصاص وقلم التلوين الشمعي) قبل رسم خط التوصيل.",
          params: {
            pairCount: 5,
            categories: ["school", "toys", "nature"],
            rightColumnTitleAr: "عناصر متنوّعة",
            leftColumnTitleAr: "العنصر المطابق تماماً",
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "قارن وطابق واحداً لواحد بين عناصر الطبيعة والحيوانات في العمودين (٥ أشياء):",
          strategyHintAr:
            "تحقّق بعد الانتهاء من أن كل نقطة في العمود الأيمن يخرج منها خط واحد فقط إلى العمود الأيسر.",
          params: {
            pairCount: 5,
            categories: ["nature", "animals", "treats"],
            rightColumnTitleAr: "المجموعة الأولى",
            leftColumnTitleAr: "المجموعة الثانية",
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق جميع العناصر الخمسة واحداً لواحد (٥ أشياء) ثم تحقّق من التساوي:",
          strategyHintAr:
            "المطابقة واحداً لواحد تثبت أن المجموعتين متساويتان في العدد دون الحاجة إلى العدّ التقليدي.",
          params: {
            pairCount: 5,
            categories: ["fruits", "animals", "toys", "school", "nature"],
            rightColumnTitleAr: "العمود الأيمن",
            leftColumnTitleAr: "العمود الأيسر",
            comparisonPromptAr:
              "إذا اتصِلْ كل عنصر في اليمين بعنصر واحد في اليسار ولم يتبقَّ أي عنصر، فهل المجموعتان متساويتان؟",
            comparisonAnswerAr:
              "نعم، المجموعتان متساويتان بالتقابل الأحادي (٥ مقابل ٥)",
          },
        },
      ],
    },
  },
});
