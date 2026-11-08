import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lesson K-69: Measure the Length of 1 Bar
// ============================================================================
export const lessonK69Blueprint: LessonBlueprint = {
  lessonId: "K-69",
  grade: "K",
  lessonNumber: 69,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-69"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-69"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة واكتب كم قرصاً موجوداً وكم خانة فارغة في المربعين:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الكامل (٥) واجمع معه الأقراص الإضافية فوراً دون عدّ فردي.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "ten-frame",
            candidateCounts: [5, 6],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ طول الشريط بمشابك الورق المصطفّة طرفاً لطرف ثم اكتب طوله في المربع:",
          strategyHintAr:
            "عدّ مشابك الورق بدءاً من خط البدء الأحمر حتى نهاية الشريط واكتب العدد.",
          params: {
            mode: "measure-bars",
            barCount: 1,
            bars: [{ nameAr: "الشريط السماوي", length: 4, colorTheme: "sky" }],
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ سلاسل مشابك الورق لدى الصديقين ثم اكتب طول كل سلسلة في المربع:",
          strategyHintAr:
            "عدّ مشابك الورق لكل صديق من خط البدء واكتب العدد في المربع المخصص.",
          params: {
            mode: "friends-clips",
            barCount: 2,
            bars: [
              { nameAr: "أحمد", length: 3, colorTheme: "coral" },
              { nameAr: "سارة", length: 5, colorTheme: "teal" },
            ],
            comparisonPromptAr: "كم مشبك ورق تملك سارة؟",
            comparisonAnswerAr: "تملك سارة ٥ مشابك ورقية",
          },
        },
      ],
      challenge: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "اقرأ الأدلّة لتحديد أطوال الأشرطة ثم اكتب طول كل شريط في المربع ولَوّنه:",
          strategyHintAr:
            "انظر إلى الأدلّة وحدّد الشريط الأقصر أولاً ثم استخدم المقارنة لتحديد باقي الأشرطة.",
          params: {
            mode: "mystery-clues",
            barCount: 2,
            bars: [
              {
                nameAr: "شريط الورد",
                length: 3,
                colorTheme: "rose",
                barType: "ribbon",
              },
              {
                nameAr: "شريط البحر",
                length: 6,
                colorTheme: "sky",
                barType: "ribbon",
              },
            ],
            cluesAr: [
              "شريط الورد طوله ٣ مشابك.",
              "شريط البحر أطول من شريط الورد بمقدار ٣ مشابك.",
            ],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة واكتب كم قرصاً موجوداً وكم قرصاً فارغاً في المربعين:",
          strategyHintAr:
            "انظر إلى الأقراص الملوّنة في لمحة، واطرحها من ١٠ لمعرفة الخانات الفارغة.",
          params: {
            subitizeMode: "ten-frame",
            targetTotal: 10,
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ طول الشريط بمشابك الورق المصطفّة طرفاً لطرف ثم اكتب طوله في المربع:",
          strategyHintAr:
            "عدّ مشابك الورق بدءاً من خط البدء الأحمر حتى نهاية الشريط واكتب العدد.",
          params: {
            mode: "measure-bars",
            barCount: 1,
            bars: [
              { nameAr: "الشريط البرتقالي", length: 6, colorTheme: "amber" },
            ],
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ سلاسل مشابك الورق لدى الصديقين ثم اكتب طول كل سلسلة في المربع:",
          strategyHintAr:
            "عدّ مشابك كل صديق بدءاً من خط البدء الأيمن، واكتب العدد في مربّع الإجابة.",
          params: {
            mode: "friends-clips",
            barCount: 2,
            bars: [
              { nameAr: "مريم", length: 4, colorTheme: "rose" },
              { nameAr: "عمر", length: 7, colorTheme: "sky" },
            ],
            comparisonPromptAr: "من يملك مشابك أكثر: مريم أم عمر؟",
            comparisonAnswerAr: "عمر يملك ٧ مشابك وهو أكثر من مريم (٤ مشابك)",
          },
        },
      ],
      challenge: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "اقرأ الأدلّة لتحديد أطوال الأشرطة ثم اكتب طول كل شريط في المربع ولَوّنه:",
          strategyHintAr:
            "انظر إلى الأدلّة وحدّد الشريط الأقصر أولاً ثم استخدم المقارنة لتحديد باقي الأشرطة.",
          params: {
            mode: "mystery-clues",
            barCount: 2,
            bars: [
              {
                nameAr: "شريط الذهب",
                length: 4,
                colorTheme: "amber",
                barType: "ribbon",
              },
              {
                nameAr: "شريط الزمرد",
                length: 8,
                colorTheme: "emerald",
                barType: "ribbon",
              },
            ],
            cluesAr: [
              "شريط الذهب طوله ٤ مشابك.",
              "شريط الزمرد أطول من شريط الذهب بمقدار ٤ مشابك.",
            ],
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة واكتب كم قرصاً موجوداً وكم ينقص لتكوين ١٠:",
          strategyHintAr:
            "عدّ الخانات الفارغة في لوحة العشرة لمعرفة كم ينقص لإكمال العدد ١٠.",
          params: {
            subitizeMode: "ten-frame",
            targetTotal: 10,
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ طول الشريط بمشابك الورق المصطفّة طرفاً لطرف ثم اكتب طوله في المربع:",
          strategyHintAr:
            "عدّ مشابك الورق من نقطة البدء على اليمين حتى النهاية وسجّل قياس الطول.",
          params: {
            mode: "measure-bars",
            barCount: 1,
            bars: [
              { nameAr: "الشريط البنفسجي", length: 8, colorTheme: "violet" },
            ],
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ سلاسل مشابك الورق لدى الصديقين ثم اكتب طول كل سلسلة في المربع:",
          strategyHintAr:
            "عدّ مشابك كل صديق بدقة واكتب قياس كل سلسلة في مربّعها الخاص.",
          params: {
            mode: "friends-clips",
            barCount: 2,
            bars: [
              { nameAr: "خالد", length: 6, colorTheme: "emerald" },
              { nameAr: "فاطمة", length: 9, colorTheme: "violet" },
            ],
            comparisonPromptAr: "كم مشبك ورق تملك فاطمة مقارنة بخالد؟",
            comparisonAnswerAr:
              "تملك فاطمة ٩ مشابك وتزيد بمقدار ٣ مشابك على خالد (٦ مشابك)",
          },
        },
      ],
      challenge: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "اقرأ الأدلّة لتحديد أطوال الأشرطة ثم اكتب طول كل شريط في المربع ولَوّنه:",
          strategyHintAr:
            "انظر إلى الأدلّة وحدّد الشريط الأقصر أولاً ثم استخدم المقارنة لتحديد باقي الأشرطة.",
          params: {
            mode: "mystery-clues",
            barCount: 2,
            bars: [
              {
                nameAr: "شريط الفيروز",
                length: 5,
                colorTheme: "teal",
                barType: "ribbon",
              },
              {
                nameAr: "شريط الياقوت",
                length: 9,
                colorTheme: "coral",
                barType: "ribbon",
              },
            ],
            cluesAr: [
              "شريط الفيروز طوله ٥ مشابك.",
              "شريط الفيروز أقصر من شريط الياقوت بمقدار ٤ مشابك.",
            ],
          },
        },
      ],
    },
  },
};

// ============================================================================
// Lesson K-70: Measure and Compare the Lengths of 2 Bars
// ============================================================================
export const lessonK70Blueprint: LessonBlueprint = {
  lessonId: "K-70",
  grade: "K",
  lessonNumber: 70,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-70"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-70"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ طول الشريط بمشابك الورق المصطفّة طرفاً لطرف ثم اكتب طوله في المربع:",
          strategyHintAr:
            "عدّ مشابك الورق بدءاً من خط البدء الأحمر حتى نهاية الشريط واكتب العدد.",
          params: {
            mode: "measure-bars",
            barCount: 1,
            bars: [
              { nameAr: "الشريط الأخضر", length: 5, colorTheme: "emerald" },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ طول كل شريط بمشابك الورق واكتب الطولين، ثم قارن لمعرفة الشريط الأطول:",
          strategyHintAr:
            "قِسْ طول الشريط الأقصر أولاً ثم عُدّ تصاعدياً لمعرفة كم يزيد الشريط الأطول.",
          params: {
            mode: "measure-bars",
            barCount: 2,
            bars: [
              { nameAr: "الشريط السماوي", length: 4, colorTheme: "sky" },
              { nameAr: "الشريط المرجاني", length: 7, colorTheme: "coral" },
            ],
            comparisonTarget: "longest",
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ سلاسل مشابك الورق لدى الصديقين ثم اكتب طول كل سلسلة لمعرفة كم يزيد الأطول:",
          strategyHintAr:
            "اطرح طول السلسلة الأقصر من طول السلسلة الأطول لمعرفة مقدار الزيادة.",
          params: {
            mode: "friends-clips",
            barCount: 2,
            bars: [
              { nameAr: "أحمد", length: 3, colorTheme: "amber" },
              { nameAr: "مريم", length: 6, colorTheme: "teal" },
            ],
            comparisonTarget: "difference",
          },
        },
      ],
      challenge: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "اقرأ الأدلّة لتحديد أطوال اليرقات ثم اكتب طول كل يرقة في المربع المخصص:",
          strategyHintAr:
            "انظر إلى الأدلّة لمعرفة اليرقة الأقصر أولاً ثم عُدّ مقدار الزيادة لمعرفة اليرقة الأطول.",
          params: {
            mode: "mystery-clues",
            barCount: 2,
            bars: [
              {
                nameAr: "اليرقة الخضراء",
                length: 3,
                colorTheme: "emerald",
                barType: "caterpillar",
              },
              {
                nameAr: "اليرقة الصفراء",
                length: 6,
                colorTheme: "amber",
                barType: "caterpillar",
              },
            ],
            cluesAr: [
              "اليرقة الخضراء طولها ٣ مشابك.",
              "اليرقة الصفراء أطول من اليرقة الخضراء بمقدار ٣ مشابك.",
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
            "قِسْ طول الشريط بمشابك الورق المصطفّة طرفاً لطرف ثم اكتب طوله في المربع:",
          strategyHintAr:
            "عدّ مشابك الورق بدءاً من خط البدء الأحمر حتى نهاية الشريط واكتب العدد.",
          params: {
            mode: "measure-bars",
            barCount: 1,
            bars: [{ nameAr: "شريط المراجعة", length: 6, colorTheme: "teal" }],
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ طول كل شريط بمشابك الورق واكتب الطولين، ثم قارن لمعرفة الشريط الأطول:",
          strategyHintAr:
            "قِسْ طول الشريط الأقصر أولاً ثم عُدّ تصاعدياً لمعرفة كم يزيد الشريط الأطول.",
          params: {
            mode: "measure-bars",
            barCount: 2,
            bars: [
              { nameAr: "الشريط الأخضر", length: 5, colorTheme: "emerald" },
              { nameAr: "الشريط البنفسجي", length: 9, colorTheme: "violet" },
            ],
            comparisonTarget: "longest",
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ سلاسل مشابك الورق لدى الصديقين ثم اكتب طول كل سلسلة لمعرفة كم يزيد الأطول:",
          strategyHintAr:
            "اطرح طول السلسلة الأقصر من طول السلسلة الأطول لمعرفة مقدار الزيادة.",
          params: {
            mode: "friends-clips",
            barCount: 2,
            bars: [
              { nameAr: "سارة", length: 4, colorTheme: "rose" },
              { nameAr: "عمر", length: 8, colorTheme: "sky" },
            ],
            comparisonTarget: "difference",
          },
        },
      ],
      challenge: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "اقرأ الأدلّة لتحديد أطوال اليرقات ثم اكتب طول كل يرقة في المربع المخصص:",
          strategyHintAr:
            "انظر إلى الأدلّة لمعرفة اليرقة الأقصر أولاً ثم عُدّ مقدار الزيادة لمعرفة اليرقة الأطول.",
          params: {
            mode: "mystery-clues",
            barCount: 2,
            bars: [
              {
                nameAr: "يرقة الغابة",
                length: 4,
                colorTheme: "emerald",
                barType: "caterpillar",
              },
              {
                nameAr: "يرقة الزهر",
                length: 8,
                colorTheme: "rose",
                barType: "caterpillar",
              },
            ],
            cluesAr: [
              "يرقة الغابة طولها ٤ مشابك.",
              "يرقة الزهر أطول من يرقة الغابة بمقدار ٤ مشابك.",
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
            "قِسْ طول الشريط بمشابك الورق المصطفّة طرفاً لطرف ثم اكتب طوله في المربع:",
          strategyHintAr:
            "عدّ مشابك الورق بدءاً من خط البدء الأحمر حتى نهاية الشريط واكتب العدد.",
          params: {
            mode: "measure-bars",
            barCount: 1,
            bars: [{ nameAr: "شريط التهيئة", length: 7, colorTheme: "coral" }],
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ طول كل شريط بمشابك الورق واكتب الطولين، ثم قارن لمعرفة الشريط الأطول:",
          strategyHintAr:
            "قِسْ طول الشريط الأقصر أولاً ثم عُدّ تصاعدياً لمعرفة كم يزيد الشريط الأطول.",
          params: {
            mode: "measure-bars",
            barCount: 2,
            bars: [
              { nameAr: "الشريط الذهبي", length: 6, colorTheme: "amber" },
              { nameAr: "الشريط الفيروزي", length: 10, colorTheme: "teal" },
            ],
            comparisonTarget: "longest",
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ سلاسل مشابك الورق لدى الصديقين ثم اكتب طول كل سلسلة لمعرفة كم يزيد الأطول:",
          strategyHintAr:
            "اطرح طول السلسلة الأقصر من طول السلسلة الأطول لمعرفة مقدار الزيادة.",
          params: {
            mode: "friends-clips",
            barCount: 2,
            bars: [
              { nameAr: "خالد", length: 5, colorTheme: "violet" },
              { nameAr: "فاطمة", length: 10, colorTheme: "rose" },
            ],
            comparisonTarget: "difference",
          },
        },
      ],
      challenge: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "اقرأ الأدلّة لتحديد أطوال اليرقات ثم اكتب طول كل يرقة في المربع المخصص:",
          strategyHintAr:
            "انظر إلى الأدلّة لمعرفة اليرقة الأقصر أولاً ثم عُدّ مقدار الزيادة لمعرفة اليرقة الأطول.",
          params: {
            mode: "mystery-clues",
            barCount: 2,
            bars: [
              {
                nameAr: "اليرقة الصغيرة",
                length: 5,
                colorTheme: "sky",
                barType: "caterpillar",
              },
              {
                nameAr: "اليرقة الكبيرة",
                length: 10,
                colorTheme: "coral",
                barType: "caterpillar",
              },
            ],
            cluesAr: [
              "اليرقة الصغيرة طولها ٥ مشابك.",
              "اليرقة الكبيرة أطول من اليرقة الصغيرة بمقدار ٥ مشابك.",
            ],
          },
        },
      ],
    },
  },
};

// ============================================================================
// Lesson K-71: Measure and Compare the Lengths of 3 Bars
// ============================================================================
export const lessonK71Blueprint: LessonBlueprint = {
  lessonId: "K-71",
  grade: "K",
  lessonNumber: 71,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-71"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-71"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ طول كل شريط بمشابك الورق ثم اكتب الطولين وحوّط الشريط الأطول:",
          strategyHintAr:
            "عدّ مشابك كل شريط بدءاً من خط البدء الأحمر واكتب الطول.",
          params: {
            mode: "measure-bars",
            barCount: 2,
            bars: [
              { nameAr: "الشريط السماوي", length: 3, colorTheme: "sky" },
              { nameAr: "الشريط الوردي", length: 5, colorTheme: "rose" },
            ],
            comparisonTarget: "longest",
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ أطوال الأشرطة الثلاثة بمشابك الورق واكتب أطوالها، ثم رتّبها من الأقصر إلى الأطول:",
          strategyHintAr:
            "قِسْ الشريط الأقصر أولاً واكتب الأطوال الثلاثة، ثم رتّبها تصاعدياً من الأصغر إلى الأكبر.",
          params: {
            mode: "measure-bars",
            barCount: 3,
            bars: [
              { nameAr: "الشريط (١)", length: 2, colorTheme: "sky" },
              { nameAr: "الشريط (٢)", length: 4, colorTheme: "emerald" },
              { nameAr: "الشريط (٣)", length: 6, colorTheme: "coral" },
            ],
            comparisonTarget: "order-all",
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ سلاسل مشابك الورق لدى الأصدقاء الثلاثة واكتب الأطوال ورتّبها من الأقصر إلى الأطول:",
          strategyHintAr:
            "رتّب الأعداد الثلاثة تصاعدياً من الأصغر إلى الأكبر بعد قياس كل سلسلة.",
          params: {
            mode: "friends-clips",
            barCount: 3,
            bars: [
              { nameAr: "سارة", length: 3, colorTheme: "rose" },
              { nameAr: "أحمد", length: 5, colorTheme: "amber" },
              { nameAr: "عمر", length: 7, colorTheme: "teal" },
            ],
            comparisonTarget: "order-all",
          },
        },
      ],
      challenge: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "اقرأ الأدلّة لتحديد أطوال اليرقات الثلاث ثم اكتب أطوالها ورتّبها في المربعات:",
          strategyHintAr:
            "انظر إلى اليرقة الأقصر واليرقة الأطول، ثم رتّب الأطوال الثلاثة من الأقصر إلى الأطول.",
          params: {
            mode: "mystery-clues",
            barCount: 3,
            bars: [
              {
                nameAr: "يرقة الروضة",
                length: 2,
                colorTheme: "emerald",
                barType: "caterpillar",
              },
              {
                nameAr: "يرقة الحقل",
                length: 4,
                colorTheme: "amber",
                barType: "caterpillar",
              },
              {
                nameAr: "يرقة البستان",
                length: 6,
                colorTheme: "coral",
                barType: "caterpillar",
              },
            ],
            cluesAr: [
              "يرقة الروضة هي الأقصر وطولها مشبكان (٢).",
              "يرقة الحقل تزيد بمقدار مشبكين (٢) على يرقة الروضة.",
              "يرقة البستان هي الأطول وتزيد بمقدار مشبكين (٢) على يرقة الحقل.",
            ],
            comparisonTarget: "order-all",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ طول كل شريط بمشابك الورق ثم اكتب الطولين وحوّط الشريط الأطول:",
          strategyHintAr:
            "عدّ مشابك كل شريط بدءاً من خط البدء الأحمر واكتب الطول.",
          params: {
            mode: "measure-bars",
            barCount: 2,
            bars: [
              { nameAr: "الشريط الأخضر", length: 4, colorTheme: "emerald" },
              { nameAr: "الشريط البرتقالي", length: 7, colorTheme: "amber" },
            ],
            comparisonTarget: "longest",
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ أطوال الأشرطة الثلاثة بمشابك الورق واكتب أطوالها، ثم رتّبها من الأقصر إلى الأطول:",
          strategyHintAr:
            "قِسْ الشريط الأقصر أولاً واكتب الأطوال الثلاثة، ثم رتّبها تصاعدياً من الأصغر إلى الأكبر.",
          params: {
            mode: "measure-bars",
            barCount: 3,
            bars: [
              { nameAr: "الشريط (١)", length: 3, colorTheme: "emerald" },
              { nameAr: "الشريط (٢)", length: 6, colorTheme: "teal" },
              { nameAr: "الشريط (٣)", length: 8, colorTheme: "violet" },
            ],
            comparisonTarget: "order-all",
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ سلاسل مشابك الورق لدى الأصدقاء الثلاثة واكتب الأطوال ورتّبها من الأقصر إلى الأطول:",
          strategyHintAr:
            "رتّب الأعداد الثلاثة تصاعدياً من الأصغر إلى الأكبر بعد قياس كل سلسلة.",
          params: {
            mode: "friends-clips",
            barCount: 3,
            bars: [
              { nameAr: "مريم", length: 3, colorTheme: "rose" },
              { nameAr: "خالد", length: 6, colorTheme: "sky" },
              { nameAr: "فاطمة", length: 8, colorTheme: "amber" },
            ],
            comparisonTarget: "order-all",
          },
        },
      ],
      challenge: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "اقرأ الأدلّة لتحديد أطوال اليرقات الثلاث ثم اكتب أطوالها ورتّبها في المربعات:",
          strategyHintAr:
            "انظر إلى اليرقة الأقصر واليرقة الأطول، ثم رتّب الأطوال الثلاثة من الأقصر إلى الأطول.",
          params: {
            mode: "mystery-clues",
            barCount: 3,
            bars: [
              {
                nameAr: "يرقة الحديقة",
                length: 3,
                colorTheme: "emerald",
                barType: "caterpillar",
              },
              {
                nameAr: "يرقة الشجرة",
                length: 6,
                colorTheme: "teal",
                barType: "caterpillar",
              },
              {
                nameAr: "يرقة الورد",
                length: 8,
                colorTheme: "coral",
                barType: "caterpillar",
              },
            ],
            cluesAr: [
              "يرقة الحديقة هي الأقصر وطولها ٣ مشابك.",
              "يرقة الشجرة تزيد بمقدار ٣ مشابك على يرقة الحديقة.",
              "يرقة الورد هي الأطول وتزيد بمقدار مشبكين (٢) على يرقة الشجرة.",
            ],
            comparisonTarget: "order-all",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ طول كل شريط بمشابك الورق ثم اكتب الطولين وحوّط الشريط الأطول:",
          strategyHintAr:
            "عدّ مشابك كل شريط بدءاً من خط البدء الأحمر واكتب الطول.",
          params: {
            mode: "measure-bars",
            barCount: 2,
            bars: [
              { nameAr: "الشريط السماوي", length: 5, colorTheme: "sky" },
              { nameAr: "الشريط البنفسجي", length: 8, colorTheme: "violet" },
            ],
            comparisonTarget: "longest",
          },
        },
      ],
      practice: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ أطوال الأشرطة الثلاثة بمشابك الورق واكتب أطوالها، ثم رتّبها من الأقصر إلى الأطول:",
          strategyHintAr:
            "قِسْ الشريط الأقصر أولاً واكتب الأطوال الثلاثة، ثم رتّبها تصاعدياً من الأصغر إلى الأكبر.",
          params: {
            mode: "measure-bars",
            barCount: 3,
            bars: [
              { nameAr: "الشريط (١)", length: 4, colorTheme: "amber" },
              { nameAr: "الشريط (٢)", length: 7, colorTheme: "teal" },
              { nameAr: "الشريط (٣)", length: 10, colorTheme: "rose" },
            ],
            comparisonTarget: "order-all",
          },
        },
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "قِسْ سلاسل مشابك الورق لدى الأصدقاء الثلاثة واكتب الأطوال ورتّبها من الأقصر إلى الأطول:",
          strategyHintAr:
            "رتّب الأعداد الثلاثة تصاعدياً من الأصغر إلى الأكبر بعد قياس كل سلسلة.",
          params: {
            mode: "friends-clips",
            barCount: 3,
            bars: [
              { nameAr: "عمر", length: 4, colorTheme: "emerald" },
              { nameAr: "سارة", length: 7, colorTheme: "coral" },
              { nameAr: "علي", length: 10, colorTheme: "violet" },
            ],
            comparisonTarget: "order-all",
          },
        },
      ],
      challenge: [
        {
          archetype: "MeasureAndCompareLength",
          promptAr:
            "اقرأ الأدلّة لتحديد أطوال اليرقات الثلاث ثم اكتب أطوالها ورتّبها في المربعات:",
          strategyHintAr:
            "انظر إلى اليرقة الأقصر واليرقة الأطول، ثم رتّب الأطوال الثلاثة من الأقصر إلى الأطول.",
          params: {
            mode: "mystery-clues",
            barCount: 3,
            bars: [
              {
                nameAr: "يرقة النخيل",
                length: 4,
                colorTheme: "amber",
                barType: "caterpillar",
              },
              {
                nameAr: "يرقة السرو",
                length: 7,
                colorTheme: "emerald",
                barType: "caterpillar",
              },
              {
                nameAr: "يرقة الياسمين",
                length: 10,
                colorTheme: "violet",
                barType: "caterpillar",
              },
            ],
            cluesAr: [
              "يرقة النخيل هي الأقصر وطولها ٤ مشابك.",
              "يرقة السرو تزيد بمقدار ٣ مشابك على يرقة النخيل.",
              "يرقة الياسمين هي الأطول وتزيد بمقدار ٣ مشابك على يرقة السرو.",
            ],
            comparisonTarget: "order-all",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK69Blueprint);
registerLessonBlueprint(lessonK70Blueprint);
registerLessonBlueprint(lessonK71Blueprint);
