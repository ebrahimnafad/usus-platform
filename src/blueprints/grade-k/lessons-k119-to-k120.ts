import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lessons K-119 to K-120 — Grade K Unit 10 (Egyptian Money, ADR-0016):
// K-119: Egyptian Money — Coin & Bill Names
// K-120: Egyptian Money — Coin & Bill Values
// ============================================================================

export const lessonK119Blueprint: LessonBlueprint = {
  lessonId: "K-119",
  grade: "K",
  lessonNumber: 119,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-119"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-119"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ بخط بين كل عملة في العمود الأيمن والعملة المطابقة لها في العمود الأيسر:",
          strategyHintAr:
            "انظر إلى لون العملة وحجمها والرقم المكتوب عليها لتصِلْ كل عملة بمطابقتها.",
          params: {
            pairCount: 2,
            matchingMode: "name-to-coin",
            denominations: [25, 50],
          },
        },
      ],
      practice: [
        {
          archetype: "IdentifyAndLabel",
          promptAr:
            "انظر إلى كلّ عملة فضية، ثم اكتب اسمها (ربع جنيه أو نصف جنيه):",
          strategyHintAr:
            "انظر إلى الرقم المكتوب على العملة: ٢٥ قرشاً هي ربع جنيه، و٥٠ قرشاً هي نصف جنيه.",
          params: {
            mode: "name",
            denominations: [25, 50],
            itemCount: 2,
          },
        },
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى حجم كلّ عملة ولونها، ثم اكتب اسمها:",
          strategyHintAr:
            "انظر إلى الحجم: العملة الأصغر (٢٥) هي ربع جنيه، والعملة الأكبر (٥٠) هي نصف جنيه.",
          params: {
            mode: "name",
            denominations: [25, 50],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ اسم كلّ عملة بالصورة المطابقة لها:",
          strategyHintAr:
            "اقرأ اسم العملة في اليمين ثم ابحث عن العملة التي تحمل الرقم المطابق في اليسار.",
          params: {
            matchingMode: "name-to-coin",
            denominations: [25, 50],
            pairCount: 2,
            rightColumnTitleAr: "اسم العملة",
            leftColumnTitleAr: "العملة",
          },
        },
        {
          archetype: "IdentifyAndLabel",
          promptAr:
            "انظر إلى لون العملة وحجمها والرقم عليها لتستنتج اسمها، ثم اكتبه:",
          strategyHintAr:
            "انظر إلى اللون الفضي وحجم الدائرة والرقم (٢٥ أو ٥٠) لتعرف الاسم ثم تكتبه.",
          params: {
            mode: "name",
            denominations: [25, 50],
            itemCount: 2,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى كلّ عملة فضية، ثم اكتب اسمها:",
          strategyHintAr:
            "انظر إلى الرقم: ٢٥ قرشاً تُسمّى ربع جنيه، و٥٠ قرشاً تُسمّى نصف جنيه.",
          params: {
            mode: "name",
            denominations: [25, 50],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى كلّ عملة أو ورقة نقدية، ثم اكتب اسمها:",
          strategyHintAr:
            "انظر إلى كلّ بطاقة ثم اكتب اسمها (ربع جنيه، نصف جنيه، جنيه واحد، خمسة جنيهات، عشرة جنيهات).",
          params: {
            mode: "name",
            denominations: [25, 50, 100, 500, 1000],
            itemCount: 4,
          },
        },
        {
          archetype: "IdentifyAndLabel",
          promptAr:
            "انظر إلى العملات والأوراق النقدية التالية، ثم اكتب اسم كلّ منها:",
          strategyHintAr:
            "انظر للتمييز بين العملات المعدنية (٢٥، ٥٠، ١ جنيه) والأوراق النقدية (٥ جنيهات خضراء، ١٠ جنيهات بنية).",
          params: {
            mode: "name",
            denominations: [25, 50, 100, 500, 1000],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ اسم كلّ عملة أو ورقة نقدية بالصورة المطابقة لها:",
          strategyHintAr:
            "اقرأ الاسم في اليمين وابحث عن العملة أو الورقة المطابقة في اليسار.",
          params: {
            matchingMode: "name-to-coin",
            denominations: [25, 50, 100, 500, 1000],
            pairCount: 3,
            rightColumnTitleAr: "اسم العملة",
            leftColumnTitleAr: "العملة أو الورقة",
          },
        },
        {
          archetype: "IdentifyAndLabel",
          promptAr:
            "انظر إلى صفات كلّ عملة (اللون والشكل والرقم) لتستنتج اسمها، ثم اكتبه:",
          strategyHintAr:
            "انظر إلى صفات الشكل واللون: الورقة الخضراء خمسة جنيهات، والعملة ذات الإطار الذهبي جنيه واحد.",
          params: {
            mode: "name",
            denominations: [100, 500, 1000],
            itemCount: 2,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى كلّ عملة فضية، ثم اكتب اسمها:",
          strategyHintAr:
            "انظر إلى الرقم: ٢٥ قرشاً تُسمّى ربع جنيه، و٥٠ قرشاً تُسمّى نصف جنيه.",
          params: {
            mode: "name",
            denominations: [25, 50],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى كلّ عملة أو ورقة نقدية، ثم اكتب اسمها:",
          strategyHintAr:
            "انظر إلى الفئات الخمس ثم اكتب الاسم (ربع جنيه، نصف جنيه، جنيه واحد، خمسة جنيهات، عشرة جنيهات).",
          params: {
            mode: "name",
            denominations: [25, 50, 100, 500, 1000],
            itemCount: 4,
          },
        },
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى كلّ فئة نقدية مصرية، ثم اكتب اسمها الصحيح:",
          strategyHintAr:
            "اقرأ الرقم والوحدة على كلّ بطاقة ثم اكتب الاسم العربي الصحيح.",
          params: {
            mode: "name",
            denominations: [25, 50, 100, 500, 1000],
            itemCount: 4,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ اسم كلّ عملة أو ورقة نقدية بالصورة المطابقة لها:",
          strategyHintAr: "اقرأ الاسم بدقة وصِلْه بالصورة المطابقة.",
          params: {
            matchingMode: "name-to-coin",
            denominations: [25, 50, 100, 500, 1000],
            pairCount: 3,
            rightColumnTitleAr: "اسم العملة",
            leftColumnTitleAr: "العملة أو الورقة",
          },
        },
        {
          archetype: "IdentifyAndLabel",
          promptAr:
            "انظر إلى كلّ عملة أو ورقة نقدية واستنتج اسمها من لونها ورقمها، ثم اكتبه:",
          strategyHintAr:
            "انظر إلى كلّ فئة: ربع جنيه (٢٥)، نصف جنيه (٥٠)، جنيه واحد (١)، خمسة جنيهات (٥)، عشرة جنيهات (١٠).",
          params: {
            mode: "name",
            denominations: [25, 50, 100, 500, 1000],
            itemCount: 4,
          },
        },
      ],
    },
  },
};

export const lessonK120Blueprint: LessonBlueprint = {
  lessonId: "K-120",
  grade: "K",
  lessonNumber: 120,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-120"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-120"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى كلّ عملة، ثم اكتب اسمها:",
          strategyHintAr:
            "انظر إلى الرقم: ٢٥ قرشاً تُسمّى ربع جنيه، و٥٠ قرشاً تُسمّى نصف جنيه.",
          params: {
            mode: "name",
            denominations: [25, 50],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى كلّ عملة فضية، ثم اكتب قيمتها بالقروش:",
          strategyHintAr:
            "اقرأ الرقم والوحدة على العملة: ٢٥ قرشاً أو ٥٠ قرشاً.",
          params: {
            mode: "value",
            denominations: [25, 50],
            itemCount: 2,
          },
        },
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى حجم كلّ عملة ورقمها، ثم اكتب قيمتها:",
          strategyHintAr:
            "انظر إلى الرقم: العملة الأصغر قيمتها ٢٥ قرشاً، والعملة الأكبر قيمتها ٥٠ قرشاً.",
          params: {
            mode: "value",
            denominations: [25, 50],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كلّ قيمة بالعملة المطابقة لها:",
          strategyHintAr:
            "اقرأ القيمة في اليمين (٢٥ قرشاً أو ٥٠ قرشاً) ثم صِلْها بالعملة المناسبة.",
          params: {
            matchingMode: "value-to-coin",
            denominations: [25, 50],
            pairCount: 2,
            rightColumnTitleAr: "قيمة العملة",
            leftColumnTitleAr: "العملة",
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى العملتين، ثم حوّط (صح) للعبارة الصحيحة و(خطأ) للعبارة غير الصحيحة:",
          strategyHintAr:
            "انظر إلى لون العملتين الفضي، وأن ٥٠ قرشاً أكبر حجماً وقيمةً من ٢٥ قرشاً.",
          params: {
            judgementKind: "money-statement",
            denominations: [25, 50],
            statementCount: 3,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى كلّ عملة، ثم اكتب اسمها:",
          strategyHintAr:
            "انظر إلى الرقم: ٢٥ قرشاً تُسمّى ربع جنيه، و٥٠ قرشاً تُسمّى نصف جنيه.",
          params: {
            mode: "name",
            denominations: [25, 50],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى كلّ عملة أو ورقة نقدية، ثم اكتب قيمتها:",
          strategyHintAr:
            "اكتب وحدة القروش للعملات الصغيرة (٢٥ قرشاً، ٥٠ قرشاً) والجنيهات للأكبر (١ جنيه، ٥ جنيهات، ١٠ جنيهات).",
          params: {
            mode: "value",
            denominations: [25, 50, 100, 500, 1000],
            itemCount: 4,
          },
        },
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى البطاقات النقدية، ثم اكتب قيمة كلّ فئة:",
          strategyHintAr:
            "اقرأ الرقم والوحدة المكتوبين على كلّ عملة أو ورقة نقدية.",
          params: {
            mode: "value",
            denominations: [25, 50, 100, 500, 1000],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كلّ قيمة بالعملة أو الورقة النقدية المطابقة لها:",
          strategyHintAr: "اقرأ الوحدة (قرشاً أم جنيهاً/جنيهات) عند التوصيل.",
          params: {
            matchingMode: "value-to-coin",
            denominations: [25, 50, 100, 500, 1000],
            pairCount: 3,
            rightColumnTitleAr: "قيمة العملة",
            leftColumnTitleAr: "العملة أو الورقة",
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى العملات والأوراق النقدية، ثم حوّط (صح) للعبارة الصحيحة و(خطأ) للعبارة غير الصحيحة:",
          strategyHintAr:
            "انظر إلى اللون والشكل والقيمة: الورقة الخضراء ٥ جنيهات، والبنية ١٠ جنيهات، والعملة ثنائية اللون ١ جنيه.",
          params: {
            judgementKind: "money-statement",
            denominations: [25, 50, 100, 500, 1000],
            statementCount: 3,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى كلّ عملة، ثم اكتب اسمها:",
          strategyHintAr:
            "انظر إلى الرقم: ٢٥ قرشاً تُسمّى ربع جنيه، و٥٠ قرشاً تُسمّى نصف جنيه.",
          params: {
            mode: "name",
            denominations: [25, 50],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى كلّ عملة أو ورقة نقدية، ثم اكتب قيمتها:",
          strategyHintAr:
            "اكتب القيمة مع وحدتها الصحيحة: ٢٥ قرشاً، ٥٠ قرشاً، ١ جنيه، ٥ جنيهات، ١٠ جنيهات.",
          params: {
            mode: "value",
            denominations: [25, 50, 100, 500, 1000],
            itemCount: 4,
          },
        },
        {
          archetype: "IdentifyAndLabel",
          promptAr: "انظر إلى الفئات النقدية التالية، ثم اكتب قيمة كلّ منها:",
          strategyHintAr:
            "اقرأ القيمة وتذكّر أن ١ جنيه يساوي ١٠٠ قرش، وهو أكبر قيمة من ٥٠ قرشاً.",
          params: {
            mode: "value",
            denominations: [25, 50, 100, 500, 1000],
            itemCount: 4,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كلّ قيمة بالعملة أو الورقة النقدية المطابقة لها:",
          strategyHintAr:
            "اقرأ القيمة ووحدتها (قرشاً أو جنيهاً) وصِلْها بالصورة المطابقة.",
          params: {
            matchingMode: "value-to-coin",
            denominations: [25, 50, 100, 500, 1000],
            pairCount: 3,
            rightColumnTitleAr: "قيمة العملة",
            leftColumnTitleAr: "العملة أو الورقة",
          },
        },
        {
          archetype: "JudgeEquality",
          promptAr:
            "انظر إلى العملات والأوراق النقدية، ثم حوّط (صح) للعبارة الصحيحة و(خطأ) للعبارة غير الصحيحة:",
          strategyHintAr:
            "انظر لاختلاف الوحدات: الجنيهات أكبر قيمة من القروش حتى لو كان عدد القروش أكبر (١ جنيه أكبر من ٥٠ قرشاً).",
          params: {
            judgementKind: "money-statement",
            denominations: [25, 50, 100, 500, 1000],
            statementCount: 3,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK119Blueprint);
registerLessonBlueprint(lessonK120Blueprint);
