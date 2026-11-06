import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

export const lessonK32Blueprint: LessonBlueprint = {
  lessonId: "K-32",
  grade: "K",
  lessonNumber: 32,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-32"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-32"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "استخدم لوحة الخمسة لتتبّع الجزأين واكتب الكلّ في المعادلة:",
          strategyHintAr:
            "اقرأ المعادلة من اليمين إلى اليسار: الجزء الأول (+) الجزء الثاني (=) الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "أكمل معادلة الجمع واملأ رابطة الأعداد المطابقة باستخدام لوحة الخمسة:",
          strategyHintAr:
            "العددان قبل إشارة التساوي هما الجزآن، والعدد بعدها هو الكلّ في المعادلة ورابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            showCompanionBond: true,
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "أكمل معادلة الجمع من اليمين إلى اليسار، وتأكّد من صحّة الكلّ باستخدام لوحة الخمسة:",
          strategyHintAr:
            "تحقّق من أن مجموع الأقراص على لوحة الخمسة يساوي العدد المكتوب بعد إشارة (=).",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل لوحة خمسة بمعادلة الجمع المطابقة، ثم اكتب الكلّ في الفراغ:",
          strategyHintAr:
            "طابق أقراص الجزأين على لوحة الخمسة مع عددي الجزأين في المعادلة واكتب الكلّ.",
          params: {
            matchingMode: "five-frame-to-equation",
            totalRange: [2, 4],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "مثّل الجزأين بالصور ثم أوجد الكلّ في معادلة الجمع:",
          strategyHintAr:
            "عدّ عناصر الجزء الأول والثاني واكتب الكلّ بعد إشارة (=).",
          params: {
            representation: "pictures",
            responseForm: "equation",
            action: "trace",
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
          archetype: "JoinParts",
          promptAr:
            "أكمل معادلة الجمع باستخدام لوحة الخمسة (من اليمين إلى اليسار):",
          strategyHintAr: "اجمع الجزأين لكتابة الكلّ بعد إشارة التساوي (=).",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "أكمل معادلة الجمع واملأ رابطة الأعداد المطابقة باستخدام لوحة الخمسة:",
          strategyHintAr:
            "اربط بين الجزأين والكلّ في المعادلة ونظيراتها في رابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            showCompanionBond: true,
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "أكمل معادلة الجمع، واستعن بلوحة الخمسة للتحقّق من صحّة الكلّ:",
          strategyHintAr:
            "عدّ أو تعرّف بسرعة على الأقراص للتأكّد من صحّة الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كل لوحة خمسة بالمعادلة المطابقة واكتب الكلّ المفقود:",
          strategyHintAr:
            "ابحث عن المعادلة التي تبدأ بنفس الجزأين ثم اكتب الكلّ في المربع الفارغ.",
          params: {
            matchingMode: "five-frame-to-equation",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "وضّح الجزأين بالصور وأوجد الكلّ في معادلة الجمع:",
          strategyHintAr: "اجمع الجزأين معاً لكتابة الكلّ في المعادلة.",
          params: {
            representation: "pictures",
            responseForm: "equation",
            action: "write",
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
          archetype: "JoinParts",
          promptAr: "ارسم الأقراص على لوحة الخمسة وأكمل معادلة الجمع:",
          strategyHintAr: "ارسم الجزء الثاني على لوحة الخمسة ثم اكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "أكمل معادلة الجمع واملأ رابطة الأعداد المطابقة (بما في ذلك الصفر ٠):",
          strategyHintAr:
            "عند جمع صفر (٠) مع أي عدد يظل الكلّ مساوياً لذلك العدد.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            showCompanionBond: true,
            action: "write",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص لإكمال لوحة الخمسة وأوجد الجزء الناقص في المعادلة:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء الأول لتعرف ما يلزم في الجزء الثاني.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
            unknownPosition: "part2",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صل لوحة الخمسة بالمعادلة المطابقة واكتب الكلّ في الفراغ:",
          strategyHintAr:
            "انتبه إلى موضع الأقراص عند مطابقة لوحة الخمسة مع المعادلة.",
          params: {
            matchingMode: "five-frame-to-equation",
            totalRange: [2, 5],
            minPart: 0,
            pairCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "أوجد الكلّ بالصيغة العكسية للمعادلة (الكلّ = الجزء + الجزء):",
          strategyHintAr:
            "في هذه المعادلة يبدأ الكلّ في اليمين متبوعاً بإشارة التساوي ثم الجزأين.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            equationLayout: "total-first",
            action: "write",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK32Blueprint);

export const lessonK33Blueprint: LessonBlueprint = {
  lessonId: "K-33",
  grade: "K",
  lessonNumber: 33,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-33"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-33"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "استخدم لوحة الخمسة لتتبّع الجزأين وكتابة الكلّ في معادلة الجمع:",
          strategyHintAr:
            "تخيّل الجزأين على لوحة الخمسة واكتب الكلّ بعد إشارة (=).",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "استخدم لوحة الخمسة لإكمال كل معادلة جمع وتتبّع الجزأين واكتب الكلّ:",
          strategyHintAr:
            "عدّ الأقراص أو تعرّف عليها سريعاً واكتب الكلّ في مربع الإجابة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "تخيّل الجزأين على لوحة الخمسة ثم أكمل معادلة الجمع واكتب الكلّ:",
          strategyHintAr: "لوحة الخمسة تساعدك على معرفة الكلّ بلمحة واحدة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم ولوّن الأقراص على لوحة الخمسة، ثم املأ العدد المفقود في رابطة الأعداد:",
          strategyHintAr:
            "لوّن أقراص الجزء الثاني المنقّطة ثم اكتب الكلّ في أعلى رابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "وضّح الجزأين على لوحة الخمسة وأوجد الكلّ في المعادلة:",
          strategyHintAr: "اجمع الأقراص الملوّنة لتحصل على الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
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
          archetype: "JoinParts",
          promptAr:
            "استخدم لوحة الخمسة لإكمال معادلة الجمع من اليمين إلى اليسار:",
          strategyHintAr: "اجمع الجزأين ذهنياً واكتب الكلّ بعد إشارة (=).",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr: "استخدم لوحة الخمسة لإكمال كل معادلة جمع واكتب الكلّ:",
          strategyHintAr:
            "لاحظ كم خانة فارغة في لوحة الخمسة لمعرفة الكلّ دون عدّ فردي.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "تخيّل الجزأين ذهنياً على لوحة الخمسة ثم اكتب الكلّ في المعادلة:",
          strategyHintAr: "تحقّق من صحّة الكلّ بضمّ أقراص الجزأين.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم ولوّن الأقراص على لوحة الخمسة، ثم املأ العدد المفقود في رابطة الأعداد:",
          strategyHintAr:
            "ارسم أقراص الجزء الثاني وأكمل كتابة الكلّ في رابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "وضّح الجزأين وأوجد الكلّ في معادلة الجمع:",
          strategyHintAr: "ضمّ الجزأين واكتب الكلّ في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
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
          archetype: "JoinParts",
          promptAr: "ارسم الأقراص على لوحة الخمسة وأكمل المعادلة:",
          strategyHintAr: "أكمل رسم أقراص الجزء الثاني ثم اكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص لإكمال لوحة الخمسة واكتب الكلّ في معادلة الجمع:",
          strategyHintAr: "تذكّر أن الصفر (٠) لا يغيّر الكلّ عند الجمع.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص وأوجد الجزء الناقص في معادلة الجمع للوصول إلى الكلّ:",
          strategyHintAr: "عدّ الأقراص المضافة لتعرف الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
            unknownPosition: "part2",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم ولوّن الأقراص، ثم املأ الجزء الناقص في رابطة الأعداد:",
          strategyHintAr: "استنتج الجزء الناقص من عدد الأقراص التي لوّنتها.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            unknownPosition: "part2",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "أوجد الكلّ بالصيغة العكسية للمعادلة (الكلّ = الجزء + الجزء):",
          strategyHintAr: "اكتب الكلّ في الطرف الأيمن قبل إشارة (=).",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            equationLayout: "total-first",
            action: "write",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK33Blueprint);

export const lessonK34Blueprint: LessonBlueprint = {
  lessonId: "K-34",
  grade: "K",
  lessonNumber: 34,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-34"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-34"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "عدّ المكعبات وتتبّع الجزأين واكتب الكلّ في المعادلة:",
          strategyHintAr: "ضمّ مكعبات الجزأين واكتب الكلّ بعد إشارة (=).",
          params: {
            representation: "snap-cubes",
            responseForm: "equation",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "أكمل نموذج الجمع (المكعبات المتداخلة وعلامات العدّ) واكتب الكلّ:",
          strategyHintAr: "اجمع الجزأين معاً واكتب الكلّ في مربع الإجابة.",
          params: {
            allowedRepresentations: ["snap-cubes", "tally-marks"],
            responseForm: "equation",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "استخدم نقاط النرد والمكعبات لإكمال معادلة الجمع من اليمين إلى اليسار:",
          strategyHintAr:
            "عدّ النقاط في الجزأين واكتب الكلّ بعد إشارة التساوي.",
          params: {
            allowedRepresentations: ["dice", "snap-cubes"],
            responseForm: "equation",
            action: "trace",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل تعبير علامات العدّ بالكلّ المطابق واكتب الكلّ في المربع:",
          strategyHintAr: "اجمع حزمتي علامات العدّ وطابقهما مع الكلّ الصحيح.",
          params: {
            matchingMode: "tally-expression-to-total",
            showMissingTotalSlot: true,
            totalRange: [2, 4],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "وضّح الجزأين بالدومينو ثم أوجد الكلّ في المعادلة:",
          strategyHintAr: "عدّ نقاط شقّي الدومينو واكتب الكلّ في المعادلة.",
          params: {
            representation: "domino",
            responseForm: "equation",
            action: "trace",
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
          archetype: "JoinParts",
          promptAr: "عدّ المكعبات في كل جزء واكتب الكلّ في معادلة الجمع:",
          strategyHintAr: "اجمع مكعبات الجزأين واكتب الكلّ.",
          params: {
            representation: "snap-cubes",
            responseForm: "equation",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "أكمل كل نموذج جمع (المكعبات المتداخلة وعلامات العدّ) واكتب الكلّ في المعادلة:",
          strategyHintAr: "ضمّ الجزأين ذهنياً واكتب الكلّ في المعادلة.",
          params: {
            allowedRepresentations: ["snap-cubes", "tally-marks"],
            responseForm: "equation",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "استخدم نقاط النرد وعلامات العدّ لإكمال معادلات الجمع:",
          strategyHintAr: "تعرّف بسرعة على النقاط في كل جزء واكتب الكلّ.",
          params: {
            allowedRepresentations: ["dice", "tally-marks"],
            responseForm: "equation",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل تعبير علامات العدّ بالكلّ المطابق واكتب الكلّ في المربع:",
          strategyHintAr:
            "عدّ علامات العدّ في الجزأين وطابقهما مع الرقم المناسب واكتب الكلّ.",
          params: {
            matchingMode: "tally-expression-to-total",
            showMissingTotalSlot: true,
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "وضّح الجزأين بالدومينو وأوجد الكلّ في معادلة الجمع:",
          strategyHintAr: "اجمع نقاط الدومينو واكتب الكلّ.",
          params: {
            representation: "domino",
            responseForm: "equation",
            action: "write",
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
          archetype: "JoinParts",
          promptAr: "أوجد الكلّ باستخدام بطاقات الدومينو والمعادلات:",
          strategyHintAr: "الشقّ الفارغ من الدومينو يمثّل الصفر (٠).",
          params: {
            representation: "domino",
            responseForm: "equation",
            action: "write",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "أكمل نماذج الجمع (المكعبات وعلامات العدّ) واكتب الكلّ في المعادلة:",
          strategyHintAr: "اجمع الجزأين بدقّة واكتب الكلّ.",
          params: {
            allowedRepresentations: ["snap-cubes", "tally-marks"],
            responseForm: "equation",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "استخدم بطاقات الدومينو لإيجاد الجزء الناقص في معادلة الجمع:",
          strategyHintAr: "قارن نقاط الشقين لتحديد الجزء الناقص.",
          params: {
            representation: "domino",
            responseForm: "equation",
            action: "write",
            unknownPosition: "part2",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل تعبير علامات العدّ بالكلّ المطابق واكتب الكلّ في المربع:",
          strategyHintAr:
            "طابق تعبير علامات العدّ مع الكلّ واكتب الرقم في الفراغ.",
          params: {
            matchingMode: "tally-expression-to-total",
            showMissingTotalSlot: true,
            totalRange: [2, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "أوجد الكلّ بالصيغة العكسية للمعادلة (الكلّ = الجزء + الجزء):",
          strategyHintAr: "اكتب الكلّ في بداية المعادلة في اليمين.",
          params: {
            representation: "domino",
            responseForm: "equation",
            equationLayout: "total-first",
            action: "write",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK34Blueprint);

export const lessonK35Blueprint: LessonBlueprint = {
  lessonId: "K-35",
  grade: "K",
  lessonNumber: 35,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-35"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-35"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى الجزأين على لوحة الخمسة، ثم اكتب الكلّ في المعادلة:",
          strategyHintAr:
            "عدّ الجزأين على لوحة الخمسة، ثم اكتب الكلّ بعد علامة =.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
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
            "انظر إلى كل معادلة، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "عدّ الجزأين في كل معادلة، ثم اختر صح عندما تتساوى قيمة الطرفين.",
          params: {
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
            "عدّ الجزأين في كل معادلة، ثم اختر صح للمعادلة الصحيحة أو خطأ لغير الصحيحة:",
          strategyHintAr:
            "انظر إلى طرفي علامة =، ثم اختر صح إذا كان لهما نفس القيمة.",
          params: {
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
            "عدّ الجزأين في الكفّة الأولى، ثم اختر العدد المناسب لكل كفّة من بنك الأعداد.",
          params: {
            mode: "balance",
            modelKind: "balance-scale",
            rowCount: 1,
            itemCount: 2,
            totalRange: [2, 4],
            minPart: 1,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "لوّن نقاط النرد المنقّطة ليتساوى الطرفان، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "لوّن نقاط الجزء الناقص على الدومينو، ثم اكتب عدده ليتساوى مع الكلّ.",
          params: {
            representation: "domino",
            responseForm: "equation",
            action: "draw-counters",
            unknownPosition: "part2",
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
          archetype: "JoinParts",
          promptAr:
            "انظر إلى الجزأين على لوحة الخمسة، ثم اكتب الكلّ في المعادلة:",
          strategyHintAr:
            "عدّ الجزأين على لوحة الخمسة، ثم اكتب الكلّ في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
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
            "انظر إلى كل معادلة، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "انظر إلى الطرف الأيمن والطرف الأيسر حول علامة =، ثم اختر صح عند تساويهما.",
          params: {
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
            "عدّ الجزأين في كل معادلة، ثم اختر صح للمعادلة الصحيحة أو خطأ لغير الصحيحة:",
          strategyHintAr:
            "عدّ الجزأين في كل طرف، ثم اختر صح عندما تتساوى قيمة الطرفين.",
          params: {
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
            mode: "balance",
            modelKind: "balance-scale",
            rowCount: 1,
            itemCount: 2,
            totalRange: [2, 5],
            minPart: 1,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "لوّن نقاط النرد المنقّطة ليتساوى الطرفان، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "لوّن نقاط الجزء الناقص على الدومينو، ثم اكتب العدد لإكمال توازن المعادلة.",
          params: {
            representation: "domino",
            responseForm: "equation",
            action: "draw-counters",
            unknownPosition: "part2",
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
          archetype: "JoinParts",
          promptAr: "انظر إلى الجزأين على الدومينو، ثم اكتب الكلّ في المعادلة:",
          strategyHintAr:
            "عدّ نقاط الجزأين على الدومينو، ثم اكتب الكلّ في يمين المعادلة.",
          params: {
            representation: "domino",
            responseForm: "equation",
            equationLayout: "total-first",
            action: "write",
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
            "انظر إلى كل معادلة، ثم اختر صح إذا تساوى الطرفان أو خطأ إذا اختلفا:",
          strategyHintAr:
            "عدّ الجزأين في التعبير، ثم اختر صح إذا تساوى مع الكلّ على الطرف الآخر.",
          params: {
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
            "عدّ الجزأين في كل معادلة، ثم اختر صح عند تساوي القيمتين أو خطأ عند اختلافهما:",
          strategyHintAr:
            "انظر إلى الصفر (٠) في الجزء، ثم اختر صح إذا تساوت كفّتا المعادلة.",
          params: {
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
            "انظر إلى الكفّتين، ثم اكتب العدد المساوي في كل كفّة من بنك الأعداد.",
          params: {
            mode: "balance",
            modelKind: "balance-scale",
            rowCount: 1,
            itemCount: 2,
            totalRange: [3, 5],
            minPart: 0,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "لوّن نقاط النرد المنقّطة ليتساوى الطرفان، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "لوّن نقاط الجزء الناقص على الدومينو، ثم اكتب عدده ليتساوى طرفا المعادلة.",
          params: {
            representation: "domino",
            responseForm: "equation",
            equationLayout: "total-first",
            action: "draw-counters",
            unknownPosition: "part2",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK35Blueprint);

export const lessonK36Blueprint: LessonBlueprint = {
  lessonId: "K-36",
  grade: "K",
  lessonNumber: 36,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-36"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-36"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى لوحة الخمسة والرقم المضاف وتتبّع واكتب الكلّ:",
          strategyHintAr:
            "تخيّل إضافة أقراص بالعدد المكتوب إلى لوحة الخمسة لمعرفة الكلّ بسرعة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "تعرّف سريعاً على تعبير لوحة الخمسة مع الرقم، وتتبّع الجزأين واكتب الكلّ:",
          strategyHintAr:
            "استخدم التعرّف السريع على لوحة الخمسة لإيجاد الكلّ دون عدّ فردي.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "equation",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "في لمحة واحدة: تعرّف على الجزأين (لوحة الخمسة والرقم) واكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "ضمّ الجزء الموجود على لوحة الخمسة والجزء الرقمي ذهنياً واكتب الكلّ.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "equation",
            action: "trace",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr: "في كل صف، ضع علامة ✕ على المعادلة غير الصحيحة:",
          strategyHintAr:
            "تحقّق من كل معادلة بجمع الجزأين ذهنياً؛ المعادلة التي ناتجها خاطئ هي التي نشطبها.",
          params: {
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            totalRange: [2, 4],
            minPart: 1,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "ارسم ولوّن الأقراص لتكوين الكلّ المطلوب:",
          strategyHintAr: "أكمل رسم وتلوين الأقراص للوصول إلى الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
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
          archetype: "JoinParts",
          promptAr: "تعرّف بسرعة على لوحة الخمسة واكتب الكلّ في المعادلة:",
          strategyHintAr:
            "تخيّل الجزأين ذهنياً واكتب الكلّ فوراً دون عدّ فردي.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "تعرّف سريعاً على تعبيرات لوحة الخمسة مع الرقم واكتب الكلّ في كل معادلة:",
          strategyHintAr:
            "انطلق من الجزء الأكبر على لوحة الخمسة وأضف الجزء الآخر ذهنياً.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "equation",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "في لمحة واحدة دون عدّ فردي: ضمّ لوحة الخمسة والرقم واكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "استعن بالخانات الفارغة على لوحة الخمسة لتحديد الكلّ بسرعة.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "equation",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr: "في كل صف، ضع علامة ✕ على المعادلة غير الصحيحة:",
          strategyHintAr:
            "اجمع الجزأين في كل معادلة واستبعد المعادلة الخاطئة بوضع علامة ✕ عليها.",
          params: {
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            totalRange: [3, 5],
            minPart: 1,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "ارسم ولوّن الأقراص لتكوين الكلّ المطلوب:",
          strategyHintAr: "ارسم الأقراص لإكمال الكلّ واكتب المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
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
          archetype: "JoinParts",
          promptAr: "ارسم الأقراص على لوحة الخمسة وأكمل المعادلة:",
          strategyHintAr: "أكمل تمثيل الجزأين واكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "تعرّف بسرعة على مسائل الجمع (لوحة الخمسة والرقم) واكتب الكلّ (بما في ذلك الصفر ٠):",
          strategyHintAr: "التعرّف السريع يساعدك على جمع الأعداد بلمحة واحدة.",
          params: {
            representation: "five-frame-and-digit",
            responseForm: "equation",
            action: "write",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "ارسم الأقراص وأوجد الجزء الناقص في معادلة الجمع:",
          strategyHintAr:
            "عدّ كم قرصاً رسمته للوصول إلى الكلّ واكتبه كجزء ثانٍ.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
            unknownPosition: "part2",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr: "في كل صف، ضع علامة ✕ على المعادلة غير الصحيحة:",
          strategyHintAr:
            "تحقّق من المساواة في كل معادلة واشطب المعادلة غير الصحيحة.",
          params: {
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            totalRange: [2, 5],
            minPart: 0,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "أوجد الكلّ بالصيغة العكسية للمعادلة (الكلّ = الجزء + الجزء):",
          strategyHintAr: "الكلّ يسبق إشارة التساوي في الصيغة العكسية.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            equationLayout: "total-first",
            action: "write",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK36Blueprint);

export const lessonK37Blueprint: LessonBlueprint = {
  lessonId: "K-37",
  grade: "K",
  lessonNumber: 37,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-37"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-37"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "تتبّع الجزأين واكتب الكلّ:",
          strategyHintAr:
            "تخيّل الجزأين على لوحة الخمسة واكتب الكلّ في الدائرة العلوية.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "أكمل كل رابطة أعداد بالتعرّف السريع؛ تتبّع الجزأين واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى الجزأين في الأسفل وتخيّلهما على لوحة الخمسة لمعرفة الكلّ دون عدّ.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "في لمحة واحدة: ضمّ الجزأين واكتب الكلّ في رابطة الأعداد:",
          strategyHintAr: "اجمع الجزأين ذهنياً واكتب الكلّ في الدائرة العلوية.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "trace",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr: "ضع علامة ✕ على رابطة الأعداد غير الصحيحة في الصف:",
          strategyHintAr:
            "تحقّق من أن الدائرة العلوية تساوي مجموع الدائرتين السفليتين؛ واشطب الرابطة الخاطئة.",
          params: {
            mode: "whats-wrong",
            modelKind: "number-bond",
            rowCount: 1,
            totalRange: [2, 4],
            minPart: 1,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "كم تحتاج بعد؟ حوّط ولوّن المربعات لإكمال الكلّ واكتب الجزء الناقص:",
          strategyHintAr:
            "عدّ المربعات الملوّنة المكمّلة لتعرف كم تحتاج بعد للوصول إلى الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            unknownPosition: "part2",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "أكمل رابطة الأعداد بالتعرّف السريع واكتب الكلّ:",
          strategyHintAr: "تخيّل الجزأين على لوحة الخمسة لمعرفة الكلّ بسرعة.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr: "أكمل كل رابطة أعداد بالتعرّف السريع واكتب الكلّ:",
          strategyHintAr:
            "استخدم مهارة التجميع الذهني بدلاً من العدّ الفردي لإيجاد الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "ضمّ الجزأين في لمحة واحدة واكتب الكلّ في رابطة الأعداد:",
          strategyHintAr: "تحقّق من إجابتك ذهنياً باستخدام بنية العدد ٥.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr: "ضع علامة ✕ على رابطة الأعداد غير الصحيحة في الصف:",
          strategyHintAr:
            "اجمع الجزأين في كل رابطة واشطب الرابطة التي لا يتطابق كلّها مع الجزأين.",
          params: {
            mode: "whats-wrong",
            modelKind: "number-bond",
            rowCount: 1,
            totalRange: [3, 5],
            minPart: 1,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "كم تحتاج بعد؟ حوّط المربعات لإكمال الكلّ واكتب الجزء الناقص:",
          strategyHintAr:
            "انظر إلى الجزء الموجود لتكتشف كم ينقصه للوصول إلى الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            unknownPosition: "part2",
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
          archetype: "JoinParts",
          promptAr: "ارسم الأقراص على لوحة الخمسة وأكمل رابطة الأعداد:",
          strategyHintAr: "مثّل الجزأين واكتب الكلّ في الدائرة العلوية.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "أكمل روابط الأعداد بالتعرّف السريع واكتب الكلّ (بما في ذلك الصفر ٠):",
          strategyHintAr:
            "عندما يكون أحد الجزأين صفراً (٠)، فإن الكلّ يساوي الجزء الآخر.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "أوجد الجزء الناقص في رابطة الأعداد باستخدام لوحة الخمسة:",
          strategyHintAr: "قارن الكلّ بالجزء المعطى لمعرفة الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            unknownPosition: "part2",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr: "ضع علامة ✕ على رابطة الأعداد غير الصحيحة في الصف:",
          strategyHintAr:
            "تحقّق من صحّة جميع روابط الأعداد واشطب الرابطة غير الصحيحة.",
          params: {
            mode: "whats-wrong",
            modelKind: "number-bond",
            rowCount: 1,
            totalRange: [2, 5],
            minPart: 0,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "كم تحتاج بعد؟ حوّط ولوّن المربعات لإكمال الكلّ واكتب الجزء الناقص:",
          strategyHintAr:
            "كم مربعاً إضافياً يلزم للوصول إلى الكلّ؟ اكتب العدد في دائرة الجزء.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            unknownPosition: "part2",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK37Blueprint);

export const lessonK38Blueprint: LessonBlueprint = {
  lessonId: "K-38",
  grade: "K",
  lessonNumber: 38,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-38"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-38"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "تتبّع الجزأين واكتب الكلّ في معادلة الجمع:",
          strategyHintAr:
            "اقرأ المعادلة من اليمين إلى اليسار وحدّد الجزأين والكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr: "أكمل كل معادلة جمع؛ تتبّع الجزأين والكلّ وحدّد موضعهما:",
          strategyHintAr:
            "العددان المجموعان هما الجزآن، والعدد الأخير هو الكلّ في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            showTermLabels: true,
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "استرجع حقيقة الجمع بسرعة وأكمل كتابة الكلّ في المعادلة:",
          strategyHintAr:
            "تذكّر حقيقة الجمع بلمحة واحدة واكتب الكلّ بعد إشارة (=).",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            showTermLabels: true,
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr: "ضع علامة ✕ على المعادلة غير الصحيحة في الصف:",
          strategyHintAr:
            "اجمع الجزأين في كل معادلة واشطب المعادلة التي يكون ناتجها خاطئاً.",
          params: {
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            totalRange: [2, 4],
            minPart: 1,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "كم تحتاج بعد؟ ارسم دوائر لإكمال الكلّ واكتب الجزء الناقص:",
          strategyHintAr:
            "عدّ الدوائر الإضافية التي رسمتها واكتبها كجزء ثانٍ في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
            unknownPosition: "part2",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "استرجع حقيقة الجمع واكتب الكلّ في المعادلة مباشرة:",
          strategyHintAr: "ضمّ الجزأين ذهنياً واكتب الكلّ في مربع الإجابة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr: "أكمل كل معادلة جمع واكتب الكلّ وحدّد الجزأين والكلّ:",
          strategyHintAr:
            "استرجع حقيقة الجمع بسرعة: الجزء الأول + الجزء الثاني = الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            showTermLabels: true,
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "استرجع حقيقة الجمع بطلاقة واكتب الكلّ في المعادلة:",
          strategyHintAr: "تدرّب على الاسترجاع المباشر لحقائق الجمع ضمن ٥.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            showTermLabels: true,
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr: "ضع علامة ✕ على المعادلة غير الصحيحة في الصف:",
          strategyHintAr:
            "اجمع طرفي المعادلة واشطب المعادلة غير المتساوية بوضع علامة ✕ عليها.",
          params: {
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            totalRange: [3, 5],
            minPart: 1,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "كم تحتاج بعد؟ ارسم دوائر لإكمال الكلّ واكتب الجزء الناقص:",
          strategyHintAr:
            "اكتشف كم يلزم إضافته إلى الجزء الأول للوصول إلى الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
            unknownPosition: "part2",
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
          archetype: "JoinParts",
          promptAr: "ارسم الأقراص وأكمل معادلة الجمع:",
          strategyHintAr: "أكمل تمثيل الجزأين واكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "JoinParts",
          promptAr:
            "أكمل معادلات الجمع بالاسترجاع السريع وحدّد الجزأين والكلّ:",
          strategyHintAr: "تذكّر حقائق الجمع مع الصفر: ٥ + ٠ = ٥.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            showTermLabels: true,
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "أوجد الجزء الناقص في معادلة الجمع بطلاقة (كم يلزم لإكمال الكلّ؟):",
          strategyHintAr: "استنتج الجزء الناقص الذي يجعل المعادلة متساوية.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-counters",
            showTermLabels: true,
            unknownPosition: "part2",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "JudgeEquality",
          promptAr: "ضع علامة ✕ على المعادلة غير الصحيحة في الصف:",
          strategyHintAr:
            "تحقّق من صحّة كل معادلة واشطب المعادلة الخاطئة بعلامة ✕.",
          params: {
            mode: "whats-wrong",
            modelKind: "equation",
            rowCount: 1,
            totalRange: [2, 5],
            minPart: 0,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "أوجد الجزء الناقص بالصيغة العكسية للمعادلة (الكلّ = الجزء + الجزء):",
          strategyHintAr:
            "في الصيغة العكسية يبدأ الكلّ في اليمين متبوعاً بإشارة التساوي.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            equationLayout: "total-first",
            action: "write",
            unknownPosition: "part2",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK38Blueprint);
