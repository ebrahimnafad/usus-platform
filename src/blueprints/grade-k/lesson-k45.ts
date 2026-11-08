import { defineLessonBlueprint } from "@/blueprints/registry";

export const lessonK45Blueprint = defineLessonBlueprint({
  lessonId: "K-45",
  grade: "K",
  lessonNumber: 45,
  sections: {
    warmUp: [
      {
        archetype: "TakeAway",
        promptAr: "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
        params: {
          representation: "five-frame",
          responseForm: "equation",
          crossOffMode: "shown",
          minPart: 1,
          itemCount: 2,
        },
        byDifficulty: {
          Easy: {
            strategyHintAr:
              "عدّ الأقراص غير المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص بعد علامة =.",
            params: { action: "trace", totalRange: [2, 4] },
          },
          Intermediate: {
            strategyHintAr:
              "اطرح الجزء المشطوب من الكلّ على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة.",
            params: { action: "write", totalRange: [2, 5] },
          },
          Advanced: {
            promptAr:
              "اشطب الجزء المعطى على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة:",
            strategyHintAr:
              "اشطب الدوائر على لوحة الخمسة، ثم اكتب الجزء الناقص في يمين المعادلة.",
            params: {
              equationLayout: "total-first",
              action: "cross-off-and-write",
              crossOffMode: "student",
              totalRange: [3, 5],
            },
          },
        },
      },
    ],
    practice: [
      {
        archetype: "JudgeEquality",
        promptAr:
          "انظر إلى كل معادلة طرح، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
        params: {
          operation: "subtract",
          mode: "true-false",
          modelKind: "equation",
          rowCount: 1,
          itemCount: 3,
          minPart: 1,
        },
        byDifficulty: {
          Easy: {
            strategyHintAr:
              "اطرح الجزء من الكلّ في كل معادلة، ثم اختر صح عندما تتساوى قيمة الطرفين.",
            params: { totalRange: [2, 4] },
          },
          Intermediate: {
            strategyHintAr:
              "انظر إلى الطرف الأيمن والطرف الأيسر حول علامة =، ثم اختر صح عند تساويهما.",
            params: { totalRange: [2, 5] },
          },
          Advanced: {
            strategyHintAr:
              "اطرح الجزء من الكلّ في التعبير، ثم اختر صح إذا تساوى مع العدد على الطرف الآخر.",
            params: { totalRange: [2, 5], minPart: 0 },
          },
        },
      },
      {
        archetype: "JudgeEquality",
        promptAr:
          "اطرح في كل معادلة، ثم اختر صح للمعادلة الصحيحة أو خطأ لغير الصحيحة:",
        params: {
          operation: "subtract",
          mode: "true-false",
          modelKind: "equation",
          rowCount: 1,
          itemCount: 3,
          minPart: 1,
        },
        byDifficulty: {
          Easy: {
            strategyHintAr:
              "انظر إلى طرفي علامة =، ثم اختر صح إذا كان لهما نفس القيمة.",
            params: { totalRange: [2, 4] },
          },
          Intermediate: {
            strategyHintAr:
              "اطرح الجزء من الكلّ في كل طرف، ثم اختر صح عندما تتساوى قيمة الطرفين.",
            params: { totalRange: [2, 5] },
          },
          Advanced: {
            promptAr:
              "اطرح في كل معادلة، ثم اختر صح عند تساوي القيمتين أو خطأ عند اختلافهما:",
            strategyHintAr:
              "انظر إلى الصفر (٠) في الطرح، ثم اختر صح إذا تساوت كفّتا المعادلة.",
            params: { totalRange: [3, 5], minPart: 0 },
          },
        },
      },
    ],
    challenge: [
      {
        archetype: "JudgeEquality",
        promptAr:
          "اختر عدداً لكل كفّة من بنك الأعداد، ثم اكتبه لتتساوى كفّتا الميزان:",
        params: {
          operation: "subtract",
          mode: "balance",
          modelKind: "balance-scale",
          rowCount: 1,
          itemCount: 2,
          minPart: 1,
        },
        byDifficulty: {
          Easy: {
            strategyHintAr:
              "اطرح لإيجاد قيمة الكفّة، ثم اختر العدد المناسب لكل كفّة من بنك الأعداد.",
            params: { totalRange: [2, 4] },
          },
          Intermediate: {
            strategyHintAr:
              "انظر إلى الكفّتين، ثم اختر العدد المناسب لكل كفّة من بنك الأعداد.",
            params: { totalRange: [2, 5] },
          },
          Advanced: {
            strategyHintAr:
              "انظر إلى التعبيرين في الكفّتين، ثم اكتب العدد المناسب من بنك الأعداد لتتساوى القيمتان.",
            params: {
              twoExpressionPans: true,
              totalRange: [3, 5],
              minPart: 0,
            },
          },
        },
      },
      {
        archetype: "TakeAway",
        promptAr:
          "اشطب دوائر ليتساوى الطرفان، ثم اكتب الجزء الناقص في معادلة الطرح:",
        strategyHintAr:
          "اشطب الدوائر ليبقى العدد المعطى في المعادلة، ثم اكتب الجزء المشطوب ليتساوى الطرفان.",
        params: {
          representation: "five-frame",
          responseForm: "equation",
          action: "cross-off-and-write",
          crossOffMode: "student",
          unknownPosition: "partTakenAway",
          minPart: 1,
          itemCount: 1,
        },
        byDifficulty: {
          Easy: {
            params: { totalRange: [2, 4] },
          },
          Intermediate: {
            strategyHintAr:
              "اشطب الدوائر ليبقى العدد المعطى في المعادلة، ثم اكتب العدد لإكمال توازن المعادلة.",
            params: { totalRange: [3, 5] },
          },
          Advanced: {
            params: {
              equationLayout: "total-first",
              totalRange: [3, 5],
            },
          },
        },
      },
    ],
  },
});
