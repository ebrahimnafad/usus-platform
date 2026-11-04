import type { LessonBlueprint } from "@/domain/types";

/**
 * Default tier template reused by lessons that have no authored blueprint.
 *
 * Extracted from the former inline K-1 tiers so the fallback seam no longer
 * depends on a specific authored lesson's blueprint instance.
 */
export const DEFAULT_TIER_TEMPLATE: LessonBlueprint["tiers"] = {
  Easy: {
    warmUp: [
      {
        archetype: "ConnectMatch",
        promptAr:
          "انظر إلى الفواكه الملوّنة: صل بخط بين كل فاكهة في العمود الأيمن والفاكهة المطابقة لها تماماً في العمود الأيسر (٣ عناصر):",
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
          "صل بخط بين كل حيوان في العمود الأيمن والحيوان المطابق له في العمود الأيسر (٣ عناصر):",
        strategyHintAr:
          "ركّز على شكل كل حيوان (الأجنحة، الأذنان، الزعانف) لتصل كل حيوان في العمود الأيمن بنظيره في العمود الأيسر دون ترك أي عنصر.",
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
          "صل بخط بين كل لعبة في العمود الأيمن واللعبة المطابقة لها في العمود الأيسر (٣ عناصر):",
        strategyHintAr:
          "تتبّع الألعاب من الأعلى إلى الأسفل عنصراً تلو الآخر لتحقيق التقابل الأحادي (١ إلى ١).",
        params: {
          pairCount: 3,
          categories: ["toys"],
          rightColumnTitleAr: "صندوق الألعاب",
          leftColumnTitleAr: "اللعبة المطابقة",
        },
      },
      {
        archetype: "ConnectMatch",
        promptAr:
          "صل بخط بين كل عنصر من عناصر الطبيعة في العمود الأيمن وما يطابقه في العمود الأيسر (٣ عناصر):",
        strategyHintAr:
          "قارن بين الزهرة والنجمة والشجرة والشمس من حيث الشكل واللون قبل التوصيل.",
        params: {
          pairCount: 3,
          categories: ["nature"],
          rightColumnTitleAr: "عناصر الطبيعة",
          leftColumnTitleAr: "العنصر المطابق",
        },
      },
    ],
    challenge: [
      {
        archetype: "ConnectMatch",
        promptAr:
          "تحدّي المطابقة: صل كل أداة مدرسية في العمود الأيمن بالأداة المطابقة لها في العمود الأيسر (٣ عناصر):",
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
          "صل بخط بين كل عنصر في العمود الأيمن والعنصر المطابق له في العمود الأيسر (٤ عناصر):",
        strategyHintAr:
          "قارن بين العناصر الأربعة في العمودين، وصل كل عنصر بنظيره المطابق تماماً في الشكل واللون.",
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
          "لاحظ الصور جيداً: صل بخط بين كل صورة في العمود الأيمن والصورة التي تطابقها في العمود الأيسر (٤ عناصر):",
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
          "صل كل غرض من أغراض الصف والطبيعة في العمود الأيمن بمطابقه في العمود الأيسر (٤ عناصر):",
        strategyHintAr:
          "استخدم إصبعك لتتبّع المسار من النقطة اليمنى إلى النقطة اليسرى قبل رسم خط التوصيل.",
        params: {
          pairCount: 4,
          categories: ["school", "nature"],
          rightColumnTitleAr: "أغراض متنوّعة",
          leftColumnTitleAr: "الغرض المطابق",
        },
      },
      {
        archetype: "ConnectMatch",
        promptAr:
          "صل بخط بين كل فاكهة أو حلوى في العمود الأيمن وما يطابقها تماماً في العمود الأيسر (٤ عناصر):",
        strategyHintAr:
          "تأكّد من مطابقة كل فاكهة أو كعكة مع نظيرتها التي تحمل نفس الشكل واللون.",
        params: {
          pairCount: 4,
          categories: ["fruits", "treats"],
          rightColumnTitleAr: "الفواكه والحلوى",
          leftColumnTitleAr: "الصورة المطابقة",
        },
      },
    ],
    challenge: [
      {
        archetype: "ConnectMatch",
        promptAr:
          "تحدّي الدقة البصرية: صل بخط بين كل عنصر وما يطابقه في العمود المقابل (٤ عناصر) ثم أجب:",
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
          "تهيئة متقدّمة: قارن بدقة بين العناصر الخمسة وصل كل عنصر في العمود الأيمن بنظيره المطابق في العمود الأيسر (٥ عناصر):",
        strategyHintAr:
          "عند وجود ٥ عناصر متقاربة، ابدأ بالعناصر ذات العلامات البارزة أولاً ثم أكمل الباقي بالتتابع.",
        params: {
          pairCount: 5,
          categories: ["fruits", "animals"],
          rightColumnTitleAr: "العمود الأيمن (٥ عناصر)",
          leftColumnTitleAr: "العمود الأيسر (٥ عناصر)",
        },
      },
    ],
    practice: [
      {
        archetype: "ConnectMatch",
        promptAr:
          "تدرّب متقدّم: صل بخط بين كل صورة في العمود الأيمن والصورة المطابقة لها تماماً في العمود الأيسر (٥ عناصر):",
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
          "قارن وطابق واحداً لواحد بين عناصر الطبيعة والحيوانات في العمودين (٥ عناصر):",
        strategyHintAr:
          "تحقّق بعد الانتهاء من أن كل نقطة في العمود الأيمن يخرج منها خط واحد فقط إلى العمود الأيسر.",
        params: {
          pairCount: 5,
          categories: ["nature", "animals", "treats"],
          rightColumnTitleAr: "المجموعة الأولى",
          leftColumnTitleAr: "المجموعة الثانية",
        },
      },
      {
        archetype: "ConnectMatch",
        promptAr:
          "طابق بين كل عنصر في العمود الأيمن وتوأمه المطابق في العمود الأيسر (٥ عناصر):",
        strategyHintAr:
          "راقب الفروق الدقيقة بين الأشكال المتقاربة وتأكّد من توصيل كل زوج متطابق بدقة.",
        params: {
          pairCount: 5,
          categories: ["fruits", "toys", "school"],
          rightColumnTitleAr: "مجموعة المقارنة",
          leftColumnTitleAr: "المجموعة المطابقة",
        },
      },
    ],
    challenge: [
      {
        archetype: "ConnectMatch",
        promptAr:
          "تحدٍّ وتقييم: طابق جميع العناصر الخمسة واحداً لواحد (٥ عناصر) ثم تحقّق من التساوي:",
        strategyHintAr:
          "المطابقة واحداً لواحد تثبت أن المجموعتين متساويتان في العدد دون الحاجة إلى العدّ التقليدي.",
        params: {
          pairCount: 5,
          categories: ["fruits", "animals", "toys", "school", "nature"],
          rightColumnTitleAr: "العمود الأيمن",
          leftColumnTitleAr: "العمود الأيسر",
          comparisonPromptAr:
            "إذا اتصل كل عنصر في اليمين بعنصر واحد في اليسار ولم يتبقَّ أي عنصر، فهل المجموعتان متساويتان؟",
          comparisonAnswerAr:
            "نعم، المجموعتان متساويتان بالتقابل الأحادي (٥ مقابل ٥)",
        },
      },
    ],
  },
};
