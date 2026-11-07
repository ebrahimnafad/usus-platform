import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

export const lessonK45Blueprint: LessonBlueprint = {
  lessonId: "K-45",
  grade: "K",
  lessonNumber: 45,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-45"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-45"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص بعد علامة =.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى كل معادلة طرح، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كل معادلة، ثم اختر صح عندما تتساوى قيمة الطرفين.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            totalRange: [2, 4],
            minPart: 1,
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "اطرح في كل معادلة، ثم اختر صح للمعادلة الصحيحة أو خطأ لغير الصحيحة:",
          strategyHintAr:
            "انظر إلى طرفي علامة =، ثم اختر صح إذا كان لهما نفس القيمة.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            totalRange: [2, 4],
            minPart: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "اختر عدداً لكل كفّة من بنك الأعداد، ثم اكتبه لتتساوى كفّتا الميزان:",
          strategyHintAr:
            "اطرح لإيجاد قيمة الكفّة، ثم اختر العدد المناسب لكل كفّة من بنك الأعداد.",
          params: {
            operation: "subtract",
            mode: "balance",
            modelKind: "balance-scale",
            rowCount: 1,
            itemCount: 2,
            totalRange: [2, 4],
            minPart: 1,
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
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "اطرح الجزء المشطوب من الكلّ على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى كل معادلة طرح، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "انظر إلى الطرف الأيمن والطرف الأيسر حول علامة =، ثم اختر صح عند تساويهما.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            totalRange: [2, 5],
            minPart: 1,
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "اطرح في كل معادلة، ثم اختر صح للمعادلة الصحيحة أو خطأ لغير الصحيحة:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في كل طرف، ثم اختر صح عندما تتساوى قيمة الطرفين.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            totalRange: [2, 5],
            minPart: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "اختر عدداً لكل كفّة من بنك الأعداد، ثم اكتبه لتتساوى كفّتا الميزان:",
          strategyHintAr:
            "انظر إلى الكفّتين، ثم اختر العدد المناسب لكل كفّة من بنك الأعداد.",
          params: {
            operation: "subtract",
            mode: "balance",
            modelKind: "balance-scale",
            rowCount: 1,
            itemCount: 2,
            totalRange: [2, 5],
            minPart: 1,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اشطب دوائر ليتساوى الطرفان، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "اشطب الدوائر ليبقى العدد المعطى في المعادلة، ثم اكتب العدد لإكمال توازن المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
            unknownPosition: "partTakenAway",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء المعطى على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "اشطب الدوائر على لوحة الخمسة، ثم اكتب الجزء الناقص في يمين المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            equationLayout: "total-first",
            action: "cross-off-and-write",
            crossOffMode: "student",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى كل معادلة طرح، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "اطرح الجزء من الكلّ في التعبير، ثم اختر صح إذا تساوى مع العدد على الطرف الآخر.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            totalRange: [2, 5],
            minPart: 0,
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "اطرح في كل معادلة، ثم اختر صح عند تساوي القيمتين أو خطأ عند اختلافهما:",
          strategyHintAr:
            "انظر إلى الصفر (٠) في الطرح، ثم اختر صح إذا تساوت كفّتا المعادلة.",
          params: {
            operation: "subtract",
            mode: "true-false",
            modelKind: "equation",
            rowCount: 1,
            itemCount: 3,
            totalRange: [3, 5],
            minPart: 0,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr:
            "اختر عدداً لكل كفّة من بنك الأعداد، ثم اكتبه لتتساوى كفّتا الميزان:",
          strategyHintAr:
            "انظر إلى التعبيرين في الكفّتين، ثم اكتب العدد المناسب من بنك الأعداد لتتساوى القيمتان.",
          params: {
            operation: "subtract",
            mode: "balance",
            modelKind: "balance-scale",
            twoExpressionPans: true,
            rowCount: 1,
            itemCount: 2,
            totalRange: [3, 5],
            minPart: 0,
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
            equationLayout: "total-first",
            action: "cross-off-and-write",
            crossOffMode: "student",
            unknownPosition: "partTakenAway",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK45Blueprint);
