import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";
import {
  COIN_CATALOG,
  SHAPE_2D_CATALOG,
  SOLID_3D_CATALOG,
  createCoinSpec,
  createRealWorldSolidSpec,
  createShape2DSpec,
  createSolid3DSpec,
} from "@/visual-models/shapes-solids-coins";

// Candidate pair builders for K-2 (Match Shapes)
const K2_SHAPE_TO_SHAPE_PAIRS = SHAPE_2D_CATALOG.map((shape) => ({
  id: `shape-${shape.id}`,
  right: createShape2DSpec(shape.id),
  left: createShape2DSpec(shape.id),
  reasonAr: `تطابق في عدد الأضلاع والزوايا: «${shape.labelAr}» (${shape.attributeNoteAr})`,
}));

const K2_VARIED_COLOR_SHAPE_PAIRS = SHAPE_2D_CATALOG.map((shape, idx) => {
  const altThemes = [
    "teal",
    "indigo",
    "amber",
    "rose",
    "emerald",
    "sky",
  ] as const;
  return {
    id: `shape-attr-${shape.id}`,
    right: createShape2DSpec(shape.id, { colorTheme: shape.defaultColorTheme }),
    left: createShape2DSpec(shape.id, {
      colorTheme: altThemes[idx % altThemes.length],
      labelAr: `${shape.labelAr} (${shape.attributeNoteAr})`,
    }),
    reasonAr: `كلاهما «${shape.labelAr}» لأن لهما نفس عدد الأضلاع والزوايا`,
  };
});

// Candidate pair builders for K-3 (Match Solids & Real-World Counterparts)
const K3_SOLID_TO_SOLID_PAIRS = SOLID_3D_CATALOG.map((solid) => ({
  id: `solid-${solid.id}`,
  right: createSolid3DSpec(solid.id),
  left: createSolid3DSpec(solid.id),
  reasonAr: `تطابق هندسي تام لمجسّم «${solid.labelAr}»`,
}));

const K3_SOLID_TO_REAL_WORLD_PAIRS = [
  {
    id: "cylinder-soup-can",
    right: createSolid3DSpec("cylinder"),
    left: createRealWorldSolidSpec("soup-can"),
    reasonAr: "الأسطوانة تشبه علبة الحساء (قاعدتان دائريتان وسطح منحنٍ)",
  },
  {
    id: "cone-ice-cream",
    right: createSolid3DSpec("cone"),
    left: createRealWorldSolidSpec("ice-cream-cone"),
    reasonAr: "المخروط يشبه قمع المثلجات (قاعدة دائرية ورأس مدبّب)",
  },
  {
    id: "cube-ice-cube",
    right: createSolid3DSpec("cube"),
    left: createRealWorldSolidSpec("ice-cube"),
    reasonAr: "المكعب يشبه مكعب الثلج (٦ أوجه مربعة متساوية)",
  },
  {
    id: "prism-gift-box",
    right: createSolid3DSpec("rectangular-prism"),
    left: createRealWorldSolidSpec("gift-box"),
    reasonAr: "متوازي المستطيلات يشبه صندوق الهدايا",
  },
  {
    id: "sphere-basketball",
    right: createSolid3DSpec("sphere"),
    left: createRealWorldSolidSpec("basketball"),
    reasonAr: "مجسّم الكرة يشبه كرة السلة المستديرة",
  },
  {
    id: "pyramid-tent",
    right: createSolid3DSpec("pyramid"),
    left: createRealWorldSolidSpec("tent"),
    reasonAr: "الهرم يشبه خيمة التخييم ذات الأوجه المثلثة",
  },
];

// Candidate pair builders for K-4 (Match Coins)
const K4_COIN_PAIRS = COIN_CATALOG.map((coin) => ({
  id: `coin-${coin.denomination}`,
  right: createCoinSpec(coin.denomination),
  left: createCoinSpec(coin.denomination),
  reasonAr: `تطابق في اللون (${coin.metalNameAr}) والحجم والفئة المكتوبة بالأرقام العربية الشرقية`,
}));

export const lessonK2Blueprint: LessonBlueprint = {
  lessonId: "K-2",
  grade: "K",
  lessonNumber: 2,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-2"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-2"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: اطلب من الطلاب البحث عن أشياء في غرفة الصف تشبه الدائرة (الساعة) أو المستطيل (الباب والسبورة) أو المربع (البلاطة) وعدّ أضلاعها وزواياها.",
    commonMisconceptionsAr: [
      "الخلط بين المربع والمستطيل دون ملاحظة أن أضلاع المربع الأربعة متساوية تماماً في الطول.",
      "الخلط بين الخماسي (٥ أضلاع) والسداسي (٦ أضلاع) عند النظر السريع دون عدّ الأضلاع والزوايا.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تهيئة الأشكال: صل بخط بين كل شكل هندسي في العمود الأيمن والشكل المطابق له في العمود الأيسر (٣ أشكال):",
          strategyHintAr:
            "انظر إلى الشكل الهندسي (دائرة، مثلث، مربع) وعدّ أضلاعه وزواياه لتصل كل شكل بتوأمه.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "الشكل الهندسي",
            leftColumnTitleAr: "الشكل المطابق",
            customCandidatePairs: K2_SHAPE_TO_SHAPE_PAIRS.slice(0, 4),
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل شكل ثنائي الأبعاد في العمود الأيمن والشكل المطابق له تماماً في العمود الأيسر (٣ أشكال):",
          strategyHintAr:
            "مرّر إصبعك حول أضلاع الشكل: الدائرة بلا زوايا، والمثلث له ٣ زوايا، والمربع له ٤ زوايا.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "الأشكال الأساسية",
            leftColumnTitleAr: "الشكل المطابق",
            customCandidatePairs: K2_SHAPE_TO_SHAPE_PAIRS.slice(0, 4),
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "قارن الأضلاع والزوايا ثم صل كل مضلّع في العمود الأيمن بمطابقه في العمود الأيسر (٣ أشكال):",
          strategyHintAr:
            "عدّ الرؤوس (النقاط البارزة) في كل شكل لتتحقّق من التطابق واحداً لواحد.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "المضلّعات",
            leftColumnTitleAr: "المضلّع المطابق",
            customCandidatePairs: K2_SHAPE_TO_SHAPE_PAIRS.slice(1, 5),
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق كل شكل هندسي في العمود الأيمن بالشكل الذي يملك نفس عدد الأضلاع والزوايا في العمود الأيسر (٣ أشكال):",
          strategyHintAr:
            "حتى لو اختلف اللون، فإن الشكل الذي له ٣ أضلاع يظل مثلثاً والشكل الذي له ٤ أضلاع متساوية يظل مربعاً.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "الشكل الأول",
            leftColumnTitleAr: "نفس عدد الأضلاع",
            customCandidatePairs: K2_VARIED_COLOR_SHAPE_PAIRS.slice(0, 4),
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تحدّي الأضلاع والزوايا: صل كل شكل بمطابقه (٣ أشكال) ثم أجب عن سؤال المقارنة:",
          strategyHintAr:
            "قارن بين المثلث (٣ أضلاع) والمربع (٤ أضلاع): المربع يزيد بضلع واحد وزاوية واحدة على المثلث.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "الأشكال المستوية",
            leftColumnTitleAr: "الشكل المطابق",
            customCandidatePairs: K2_SHAPE_TO_SHAPE_PAIRS.slice(0, 4),
            comparisonPromptAr:
              "للمثلث ٣ أضلاع وللمربع ٤ أضلاع؛ أيّهما يحتوي على أضلاع أكثر؟",
            comparisonAnswerAr:
              "المربع له أضلاع أكثر (٤ أضلاع)، والمثلث له أضلاع أقل (٣ أضلاع)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل شكل مستوٍ في العمود الأيمن ونظيره المطابق في العمود الأيسر (٤ أشكال):",
          strategyHintAr:
            "عدّ الأضلاع والزوايا بدقة للتمييز بين المثلث والمربع والمستطيل والخماسي.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "العمود الأيمن",
            leftColumnTitleAr: "العمود الأيسر",
            customCandidatePairs: K2_SHAPE_TO_SHAPE_PAIRS.slice(0, 5),
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل شكل في العمود الأيمن والشكل المطابق له في العمود الأيسر (٤ أشكال):",
          strategyHintAr:
            "لاحظ الفرق بين المربع (٤ أضلاع متساوية) والمستطيل (ضلعان طويلان وضلعان قصيران).",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "الأشكال الهندسية",
            leftColumnTitleAr: "الشكل المطابق",
            customCandidatePairs: K2_SHAPE_TO_SHAPE_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق كل شكل في العمود الأيمن مع الشكل الذي يملك نفس عدد الأضلاع والزوايا في العمود الأيسر (٤ أشكال):",
          strategyHintAr:
            "اعتمد على عدّ الأضلاع والزوايا (٠، ٣، ٤، ٥، ٦) ولا تنخدع بتغيّر اللون.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "الشكل الهندسي",
            leftColumnTitleAr: "الشكل ذو الأضلاع المطابقة",
            customCandidatePairs: K2_VARIED_COLOR_SHAPE_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "ميّز بين الخماسي والسداسي وبقية الأشكال وصل كل شكل بمطابقه (٤ أشكال):",
          strategyHintAr:
            "الخماسي له ٥ أضلاع و٥ رؤوس، أما السداسي فله ٦ أضلاع و٦ رؤوس.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "مجموعة المضلّعات",
            leftColumnTitleAr: "المضلّع المطابق",
            customCandidatePairs: K2_SHAPE_TO_SHAPE_PAIRS.slice(1, 6),
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تحدّي الهندسة: طابق الأشكال الأربعة بحسب عدد الأضلاع والزوايا (٤ أشكال) ثم أجب:",
          strategyHintAr:
            "قارن بين السداسي (٦ أضلاع) والخماسي (٥ أضلاع): السداسي له ضلع إضافي واحد.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "المجموعة (أ)",
            leftColumnTitleAr: "المجموعة (ب)",
            customCandidatePairs: K2_VARIED_COLOR_SHAPE_PAIRS,
            comparisonPromptAr:
              "إذا كان للسداسي ٦ أضلاع وللخماسي ٥ أضلاع، فهل للخماسي أضلاع أقل؟",
            comparisonAnswerAr:
              "نعم، الخماسي له أضلاع أقل بـ ١ من السداسي (٥ أقل من ٦)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تهيئة متقدّمة: صل كل شكل مستوٍ في العمود الأيمن بمطابقه في العمود الأيسر (٥ أشكال):",
          strategyHintAr:
            "عدّ الأضلاع والزوايا في كل شكل من الأشكال الخمسة لتحقيق المطابقة الصحيحة.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "الأشكال الخمسة",
            leftColumnTitleAr: "الأشكال المطابقة",
            customCandidatePairs: K2_SHAPE_TO_SHAPE_PAIRS,
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تدرّب متقدّم: صل كل شكل هندسي في العمود الأيمن بنظيره الذي يشاركه عدد الأضلاع والزوايا (٥ أشكال):",
          strategyHintAr:
            "قارن عدد الرؤوس (٠ في الدائرة، ٣ في المثلث، ٤ في المربع والمستطيل، ٥ في الخماسي، ٦ في السداسي).",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "الأشكال الأساسية",
            leftColumnTitleAr: "الأشكال المطابقة بالخصائص",
            customCandidatePairs: K2_VARIED_COLOR_SHAPE_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "افحص الأضلاع والزوايا بدقة وصل كل شكل في العمود الأيمن بتوأمه في العمود الأيسر (٥ أشكال):",
          strategyHintAr:
            "تأكّد من التمييز بين المربع والمستطيل بمقارنة أطوال الأضلاع الأربعة.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "العمود الأيمن",
            leftColumnTitleAr: "العمود الأيسر",
            customCandidatePairs: K2_SHAPE_TO_SHAPE_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق واحداً لواحد بين الأشكال المستوية الخمسة في العمودين (٥ أشكال):",
          strategyHintAr:
            "ابحث عن الشكل الذي يتفق في عدد الأضلاع ونوع الزوايا مع كل شكل في العمود الأيمن.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "أشكال هندسية",
            leftColumnTitleAr: "المطابق الهندسي",
            customCandidatePairs: K2_VARIED_COLOR_SHAPE_PAIRS,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تحدٍّ وتقييم: صل الأشكال الخمسة بمطابقاتها الهندسية (٥ أشكال) ثم قارن عدد الزوايا:",
          strategyHintAr:
            "عدد زوايا أي مضلّع مغلق يساوي عدد أضلاعه المستقيمة (المثلث ٣، المربع ٤، الخماسي ٥، السداسي ٦).",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "الأشكال المستوية",
            leftColumnTitleAr: "الأشكال المطابقة",
            customCandidatePairs: K2_VARIED_COLOR_SHAPE_PAIRS,
            comparisonPromptAr:
              "أي شكل له ٦ أضلاع و٦ زوايا؟ وبكم يزيد عدد أضلاعه على المربع؟",
            comparisonAnswerAr:
              "الشكل السداسي له ٦ أضلاع و٦ زوايا، ويزيد على المربع بضلعين (٢)",
          },
        },
      ],
    },
  },
};

export const lessonK3Blueprint: LessonBlueprint = {
  lessonId: "K-3",
  grade: "K",
  lessonNumber: 3,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-3"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-3"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: ضع مجسّمات حقيقية (علبة، كرة، قمع ورقي، مكعب خشبي) على الطاولة واطلب من الطلاب تسمية كل مجسّم وربطه بالشيء المشابه له في المنزل.",
    commonMisconceptionsAr: [
      "تسمية المجسّمات ثلاثية الأبعاد بأسماء الأشكال المسطّحة (مثل قول «دائرة» بدلاً من «كرة» أو «مربع» بدلاً من «مكعب»).",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تهيئة المجسّمات: صل بخط بين كل مجسّم ثلاثي الأبعاد في العمود الأيمن والمجسّم المطابق له في العمود الأيسر (٣ مجسّمات):",
          strategyHintAr:
            "لاحظ الأوجه المسطّحة والأسطح المنحنية في كل مجسّم لتصل بين المجسّمين المتماثلين.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "المجسّم الهندسي",
            leftColumnTitleAr: "المجسّم المطابق",
            customCandidatePairs: K3_SOLID_TO_SOLID_PAIRS.slice(0, 4),
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل مجسّم في العمود الأيمن والمجسّم المطابق له في العمود الأيسر (٣ مجسّمات):",
          strategyHintAr:
            "قارن بين الكرة والمخروط والأسطوانة والمكعب من حيث الشكل الثلاثي الأبعاد.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "المجسّمات الأساسية",
            leftColumnTitleAr: "المجسّم المطابق",
            customCandidatePairs: K3_SOLID_TO_SOLID_PAIRS.slice(0, 4),
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل مجسّم هندسي في العمود الأيمن والشيء الحقيقي الذي يشبهه في العمود الأيسر (٣ عناصر):",
          strategyHintAr:
            "الأسطوانة تشبه علبة الحساء، والمخروط يشبه قمع المثلجات، والمكعب يشبه مكعب الثلج.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "المجسّم الهندسي",
            leftColumnTitleAr: "الشيء المشابه من حولنا",
            customCandidatePairs: K3_SOLID_TO_REAL_WORLD_PAIRS.slice(0, 4),
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق كل مجسّم ثلاثي الأبعاد بالشيء المألوف الذي يماثله في الشكل (٣ عناصر):",
          strategyHintAr:
            "اسأل نفسك: هل هذا الشيء كروي مثل الكرة أم له أوجه مستطيلة مثل صندوق الهدايا؟",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "المجسّمات",
            leftColumnTitleAr: "أشياء من حياتنا",
            customCandidatePairs: K3_SOLID_TO_REAL_WORLD_PAIRS.slice(1, 5),
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تحدّي المجسّمات في حياتنا: صل كل مجسّم بالشيء الذي يشبهه (٣ عناصر) ثم أجب:",
          strategyHintAr:
            "لاحظ القاعدتين الدائريتين في علبة الحساء لتعرف أنها تطابق مجسّم الأسطوانة.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "المجسّم الهندسي",
            leftColumnTitleAr: "الشيء الحقيقي",
            customCandidatePairs: K3_SOLID_TO_REAL_WORLD_PAIRS.slice(0, 3),
            comparisonPromptAr:
              "أي مجسّم يشبه علبة الحساء؟ وأي مجسّم يشبه قمع المثلجات؟",
            comparisonAnswerAr:
              "الأسطوانة تشبه علبة الحساء، والمخروط يشبه قمع المثلجات",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل كل مجسّم ثلاثي الأبعاد في العمود الأيمن بنظيره المطابق في العمود الأيسر (٤ مجسّمات):",
          strategyHintAr:
            "ميّز بين الكرة والمخروط والأسطوانة والمكعب ومتوازي المستطيلات.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "العمود الأيمن",
            leftColumnTitleAr: "العمود الأيسر",
            customCandidatePairs: K3_SOLID_TO_SOLID_PAIRS.slice(0, 5),
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل مجسّم هندسي في العمود الأيمن والشيء الحقيقي الذي يشبهه في العمود الأيسر (٤ عناصر):",
          strategyHintAr:
            "اربط كل مجسّم بالشيء المشابه له: علبة الحساء (أسطوانة)، قمع المثلجات (مخروط)، مكعب الثلج (مكعب)، صندوق الهدايا (متوازي مستطيلات).",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "المجسّمات ثلاثية الأبعاد",
            leftColumnTitleAr: "أشياء من الواقع",
            customCandidatePairs: K3_SOLID_TO_REAL_WORLD_PAIRS.slice(0, 5),
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "قارن بين المجسّمات في العمودين وصل كل مجسّم بمطابقه الهندسي (٤ مجسّمات):",
          strategyHintAr:
            "تنبّه للفرق بين المكعب (أوجهه مربعة) ومتوازي المستطيلات (أوجهه مستطيلة) والهرم (أوجهه الجانبية مثلثة).",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "المجسّم الأول",
            leftColumnTitleAr: "المجسّم المطابق",
            customCandidatePairs: K3_SOLID_TO_SOLID_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق كل مجسّم هندسي بالشيء اليومي الذي يشاركه نفس الشكل الثلاثي الأبعاد (٤ عناصر):",
          strategyHintAr:
            "خيمة التخييم تشبه الهرم، وكرة السلة تشبه الكرة، وصندوق الهدايا يشبه متوازي المستطيلات.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "المجسّم الهندسي",
            leftColumnTitleAr: "المثيل في الحياة اليومية",
            customCandidatePairs: K3_SOLID_TO_REAL_WORLD_PAIRS.slice(1, 6),
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تحدّي الأجسام الهندسية: صل كل مجسّم بما يشبهه في الواقع (٤ عناصر) ثم أجب:",
          strategyHintAr:
            "مكعب الثلج له ٦ أوجه مربعة متساوية تماماً مثل المكعب الهندسي.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "المجسّمات",
            leftColumnTitleAr: "الأشياء المشابهة",
            customCandidatePairs: K3_SOLID_TO_REAL_WORLD_PAIRS,
            comparisonPromptAr:
              "أي مجسّم يشبه مكعب الثلج؟ وأي مجسّم يشبه صندوق الهدايا؟",
            comparisonAnswerAr:
              "المكعب يشبه مكعب الثلج، ومتوازي المستطيلات يشبه صندوق الهدايا",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تهيئة متقدّمة: صل كل مجسّم ثلاثي الأبعاد في العمود الأيمن بنظيره في العمود الأيسر (٥ مجسّمات):",
          strategyHintAr:
            "تعرّف على المجسّمات الخمسة من خلال أوجهها المسطّحة أو المنحنية ورؤوسها.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "المجسّمات الخمسة",
            leftColumnTitleAr: "المجسّم المطابق",
            customCandidatePairs: K3_SOLID_TO_SOLID_PAIRS,
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تدرّب متقدّم: صل كل مجسّم ثلاثي الأبعاد بالشيء الحقيقي الذي يمثّله في العمود المقابل (٥ عناصر):",
          strategyHintAr:
            "افحص القواعد والأوجه الجانبية لكل مجسّم وقارنها بشكل الشيء الحقيقي.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "المجسّمات الهندسية",
            leftColumnTitleAr: "الأشياء الحقيقية المطابقة",
            customCandidatePairs: K3_SOLID_TO_REAL_WORLD_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق بدقة بين المجسّمات الثلاثية الأبعاد في العمودين (٥ مجسّمات):",
          strategyHintAr:
            "ميّز بين الأسطوانة والمخروط والكرة والمكعب ومتوازي المستطيلات والهرم.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "العمود الأيمن",
            leftColumnTitleAr: "العمود الأيسر",
            customCandidatePairs: K3_SOLID_TO_SOLID_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل كل مجسّم هندسي بنظيره في الحياة اليومية (٥ عناصر):",
          strategyHintAr:
            "تحقّق من اتصال كل مجسّم بالشيء الواحد الذي يطابق خصائصه الثلاثية الأبعاد.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "المجسّم",
            leftColumnTitleAr: "نظيره في الواقع",
            customCandidatePairs: K3_SOLID_TO_REAL_WORLD_PAIRS,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تحدٍّ وتقييم: صل المجسّمات الخمسة بأمثلتها الواقعية (٥ عناصر) ثم قارن خصائصها:",
          strategyHintAr:
            "الكرة ليس لها أي وجه مسطّح أو رأس، بينما للمكعب ٦ أوجه مربعة مسطّحة و٨ رؤوس.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "المجسّم الهندسي",
            leftColumnTitleAr: "المثال الواقعي",
            customCandidatePairs: K3_SOLID_TO_REAL_WORLD_PAIRS,
            comparisonPromptAr:
              "أي مجسّم يشبه الكرة ويتدحرج دون أي وجه مسطّح؟ وأي مجسّم له قاعدة دائرية ورأس مدبّب؟",
            comparisonAnswerAr:
              "مجسّم الكرة يتدحرج بلا أوجه مسطّحة، والمخروط له قاعدة دائرية ورأس مدبّب واحد",
          },
        },
      ],
    },
  },
};

export const lessonK4Blueprint: LessonBlueprint = {
  lessonId: "K-4",
  grade: "K",
  lessonNumber: 4,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-4"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-4"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: اعرض عملات معدنية بلاستيكية أو حقيقية واطلب من الطلاب فرزها حسب اللون (نحاسي، فضي، ذهبي) ومقارنة أحجامها (الأكبر والأصغر).",
    commonMisconceptionsAr: [
      "الاعتقاد بأن العملات الفضية المتقاربة (٥ و١٠) متطابقة دون قراءة الرقم العربي الشرقي المكتوب وسط العملة وملاحظة فرق الحجم.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تهيئة العملات: صل بخط بين كل عملة معدنية في العمود الأيمن والعملة المطابقة لها في العمود الأيسر (٣ عملات):",
          strategyHintAr:
            "انظر إلى لون العملة (نحاسي أو فضي أو ذهبي) والرقم المكتوب عليها (١، ٥، ١٠).",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "العملة النقدية",
            leftColumnTitleAr: "العملة المطابقة",
            customCandidatePairs: K4_COIN_PAIRS.slice(0, 3),
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل عملة معدنية في العمود الأيمن والعملة التي تطابقها في اللون والحجم والرقم (٣ عملات):",
          strategyHintAr:
            "قارن لون المعدن وحجم الدائرة والرقم المكتوب في وسط كل عملة قبل التوصيل.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "مجموعة العملات الأولى",
            leftColumnTitleAr: "العملة المطابقة",
            customCandidatePairs: K4_COIN_PAIRS.slice(0, 4),
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "لاحظ الفرق في اللون والحجم ثم صل كل عملة بنظيرتها في العمود المقابل (٣ عملات):",
          strategyHintAr:
            "عملة ١ نحاسية وصغيرة، وعملتا ٥ و١٠ فضيتان، وعملتا ٢٥ و٥٠ ذهبيتان وكبيرتان.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "عملات متنوّعة",
            leftColumnTitleAr: "العملة المطابقة تماماً",
            customCandidatePairs: K4_COIN_PAIRS.slice(1, 5),
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "اقرأ الرقم العربي الشرقي على كل عملة وصلها بتوأمها في العمود الأيسر (٣ عملات):",
          strategyHintAr:
            "طابق عملة ١ مع ١، وعملة ١٠ مع ١٠، وعملة ٥٠ مع ٥٠.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "العمود الأيمن",
            leftColumnTitleAr: "العمود الأيسر",
            customCandidatePairs: [
              K4_COIN_PAIRS[0],
              K4_COIN_PAIRS[2],
              K4_COIN_PAIRS[4],
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تحدّي مقارنة العملات: صل كل عملة بمطابقتها (٣ عملات) ثم أجب عن سؤال اللون والحجم:",
          strategyHintAr:
            "لاحظ أن عملة ١ هي العملة النحاسية الأصغر حجماً، بينما عملتا ٥ و١٠ فضيتا اللون.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "العملات المعدنية",
            leftColumnTitleAr: "العملة المطابقة",
            customCandidatePairs: K4_COIN_PAIRS.slice(0, 3),
            comparisonPromptAr:
              "بين العملات (١، ٥، ١٠): أي عملة ليست فضية اللون؟ وأيّها الأصغر حجماً؟",
            comparisonAnswerAr:
              "عملة ١ نحاسية وليست فضية، وهي الأصغر حجماً",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل عملة معدنية في العمود الأيمن والعملة المطابقة لها في العمود الأيسر (٤ عملات):",
          strategyHintAr:
            "افحص لون العملة وحجمها والرقم المكتوب عليها (١، ٥، ١٠، ٢٥).",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "العمود الأيمن",
            leftColumnTitleAr: "العمود الأيسر",
            customCandidatePairs: K4_COIN_PAIRS.slice(0, 4),
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "قارن اللون والحجم والرقم ثم صل كل عملة في العمود الأيمن بمطابقتها في العمود الأيسر (٤ عملات):",
          strategyHintAr:
            "انتبه للفرق بين العملتين الفضيتين (٥ و١٠) والعملتين الذهبيتين (٢٥ و٥٠).",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "العملات النقدية",
            leftColumnTitleAr: "العملة المطابقة",
            customCandidatePairs: K4_COIN_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق كل عملة معدنية مع نظيرتها التي تحمل نفس الحجم واللون والفئة (٤ عملات):",
          strategyHintAr:
            "تتبّع العملات من الأصغر حجماً (عملة ١) حتى الأكبر حجماً (عملة ٥٠).",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "المجموعة الأولى",
            leftColumnTitleAr: "المجموعة المطابقة",
            customCandidatePairs: K4_COIN_PAIRS.slice(1, 5),
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل عملة في العمود الأيمن والعملة المماثلة لها في العمود الأيسر (٤ عملات):",
          strategyHintAr:
            "تحقّق من النقش الدائري والرقم المكتوب وسط العملة للتأكّد من التطابق.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "حصّالة العملات",
            leftColumnTitleAr: "العملة المماثلة",
            customCandidatePairs: K4_COIN_PAIRS,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تحدّي الحجم واللون: صل العملات الأربع بمطابقاتها (٤ عملات) ثم قارن بينها:",
          strategyHintAr:
            "قارن قطري الدائرتين: عملة ١٠ أكبر حجماً من عملة ١، وعملة ٥٠ هي الأكبر بين جميع العملات.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "المجموعة (أ)",
            leftColumnTitleAr: "المجموعة (ب)",
            customCandidatePairs: K4_COIN_PAIRS,
            comparisonPromptAr:
              "أيهما أكبر حجماً: عملة ٥ أم عملة ١؟ وأيهما أصغر حجماً: عملة ١ أم عملة ١٠؟",
            comparisonAnswerAr:
              "عملة ٥ أكبر حجماً من عملة ١، وعملة ١ أصغر حجماً من عملة ١٠",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تهيئة متقدّمة: طابق جميع فئات العملات الخمس بين العمود الأيمن والعمود الأيسر (٥ عملات):",
          strategyHintAr:
            "رتّب ذهنياً العملات الخمس (١، ٥، ١٠، ٢٥، ٥٠) بحسب اللون والحجم والرقم.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "الفئات الخمس",
            leftColumnTitleAr: "الفئات المطابقة",
            customCandidatePairs: K4_COIN_PAIRS,
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تدرّب متقدّم: صل كل عملة من العملات الخمس (١، ٥، ١٠، ٢٥، ٥٠) بنظيرتها المطابقة تماماً (٥ عملات):",
          strategyHintAr:
            "لاحظ التدرّج في الحجم واللون من عملة ١ النحاسية الصغيرة إلى عملة ٥٠ الذهبية الكبرى.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "العمود الأيمن",
            leftColumnTitleAr: "العمود الأيسر",
            customCandidatePairs: K4_COIN_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "قارن بدقة بين العملات الفضية والذهبية والنحاسية وصل كل عملة بتوأمها (٥ عملات):",
          strategyHintAr:
            "استخدم كلاً من حجم العملة والرقم المكتوب عليها للتمييز بين عملتي ٢٥ و٥٠ الذهبيتين.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "العملات المعدنية",
            leftColumnTitleAr: "العملة المطابقة",
            customCandidatePairs: K4_COIN_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق واحداً لواحد بين العملات الخمس في العمودين (٥ عملات):",
          strategyHintAr:
            "تأكّد من أن كل عملة في اليمين تتصل بعملة واحدة فقط تحمل نفس الرقم واللون والحجم في اليسار.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "مجموعة العملات (١)",
            leftColumnTitleAr: "مجموعة العملات (٢)",
            customCandidatePairs: K4_COIN_PAIRS,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "تحدٍّ وتقييم: طابق العملات الخمس جميعها (٥ عملات) ثم أجب عن سؤال المقارنة الشامل:",
          strategyHintAr:
            "قارن أحجام العملات الخمس (١، ٥، ١٠، ٢٥، ٥٠) وألوانها الثلاثة (نحاسي، فضي، ذهبي).",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "العملات الخمس",
            leftColumnTitleAr: "المطابق لها",
            customCandidatePairs: K4_COIN_PAIRS,
            comparisonPromptAr:
              "أي عملة هي الأكبر حجماً بين العملات الخمس؟ وأي عملتين لونهما فضي؟",
            comparisonAnswerAr:
              "عملة ٥٠ الذهبية هي الأكبر حجماً، والعملتان الفضيتان هما ٥ و١٠",
          },
        },
      ],
    },
  },
};

export const lessonK5Blueprint: LessonBlueprint = {
  lessonId: "K-5",
  grade: "K",
  lessonNumber: 5,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-5"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-5"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: وزّع قطعاً منطقية للأشكال المستوية على مجموعات الطلاب واطلب منهم فرز كل شكل في سلة وتسمية كل سلة «جزءاً» وجميع السلال معاً «الكل».",
    commonMisconceptionsAr: [
      "الاعتقاد بأن أحد الأجزاء يمكن أن يكون أكبر من الكل بدلاً من إدراك أن الكل يضمّ جميع الأجزاء معاً.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateShapeIds: ["circle", "triangle", "square"],
          },
        },
      ],
      practice: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateShapeIds: ["circle", "square"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateShapeIds: ["triangle", "rectangle"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateShapeIds: ["circle", "triangle", "pentagon"],
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateShapeIds: ["square", "hexagon"],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 4],
            candidateShapeIds: ["circle", "triangle", "square", "rectangle"],
          },
        },
      ],
      practice: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 4],
            candidateShapeIds: ["circle", "triangle", "square"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 4],
            candidateShapeIds: ["square", "rectangle", "pentagon"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 4],
            candidateShapeIds: ["triangle", "pentagon", "hexagon"],
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
      ],
      practice: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 3,
            partCountRange: [2, 3],
            candidateShapeIds: ["circle", "triangle", "square", "pentagon"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 3,
            partCountRange: [2, 3],
            candidateShapeIds: ["triangle", "rectangle", "pentagon", "hexagon"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "color-group",
            groupCount: 3,
            partCountRange: [2, 4],
          },
        },
      ],
    },
  },
};

export const lessonK6Blueprint: LessonBlueprint = {
  lessonId: "K-6",
  grade: "K",
  lessonNumber: 6,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-6"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-6"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: اطلب من الطلاب تصنيف المجسّمات الثلاثية الأبعاد في سلال ملوّنة ومقارنة عدد كل مجموعة (جزء) بالعدد الكلي للمجسّمات (الكل).",
    commonMisconceptionsAr: [
      "نسيان عدّ بعض المجسّمات عند حساب الكل، أو الخلط بين الأسطوانة والمخروط أثناء الفرز.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateSolidIds: ["sphere", "cube", "cylinder"],
          },
        },
      ],
      practice: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateSolidIds: ["sphere", "cone"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateSolidIds: ["cylinder", "cube"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateSolidIds: ["cone", "rectangular-prism", "pyramid"],
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateSolidIds: ["cube", "pyramid"],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 4],
          },
        },
      ],
      practice: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 4],
            candidateSolidIds: ["sphere", "cone", "cylinder"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 4],
            candidateSolidIds: ["cube", "rectangular-prism", "pyramid"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 2,
            partCountRange: [2, 4],
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
      ],
      practice: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 3,
            partCountRange: [2, 3],
            candidateSolidIds: ["sphere", "cone", "cylinder", "cube"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 3,
            partCountRange: [2, 3],
            candidateSolidIds: ["cone", "cube", "rectangular-prism", "pyramid"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "color-group",
            groupCount: 3,
            partCountRange: [2, 4],
          },
        },
      ],
    },
  },
};

export const lessonK7Blueprint: LessonBlueprint = {
  lessonId: "K-7",
  grade: "K",
  lessonNumber: 7,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-7"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-7"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: اعرض مثلثاً كبيراً ومثلثاً صغيراً وسداسياً صغيراً وسداسياً كبيراً، وأكّد أن الحجم صفة تصف الشكل لكنها لا تغيّر نوعه الهندسي.",
    commonMisconceptionsAr: [
      "استبعاد الأشكال الصغيرة جداً أو الكبيرة جداً من المجموعة عند التصنيف ظنّاً أن تغيّر الحجم يغيّر اسم الشكل.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "vary-size",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateShapeIds: ["triangle", "square", "hexagon"],
          },
        },
      ],
      practice: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "vary-size",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateShapeIds: ["triangle", "hexagon"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "vary-size",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateSolidIds: ["cube", "cylinder"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "mixed-shapes-solids",
            variationMode: "vary-size",
            groupCount: 2,
            partCountRange: [2, 3],
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "vary-size",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateShapeIds: ["triangle", "pentagon", "hexagon"],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "vary-size",
            groupCount: 2,
            partCountRange: [2, 4],
          },
        },
      ],
      practice: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "vary-size",
            groupCount: 2,
            partCountRange: [2, 4],
            candidateShapeIds: ["triangle", "square", "hexagon"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "vary-size",
            groupCount: 2,
            partCountRange: [2, 4],
            candidateSolidIds: ["sphere", "cone", "cube"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "mixed-shapes-solids",
            variationMode: "vary-size",
            groupCount: 2,
            partCountRange: [2, 4],
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "mixed-shapes-solids",
            variationMode: "vary-size",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "mixed-shapes-solids",
            variationMode: "vary-size",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
      ],
      practice: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "vary-size",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "vary-size",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "mixed-shapes-solids",
            variationMode: "vary-size",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "mixed-shapes-solids",
            variationMode: "vary-size",
            groupCount: 3,
            partCountRange: [2, 4],
          },
        },
      ],
    },
  },
};

export const lessonK8Blueprint: LessonBlueprint = {
  lessonId: "K-8",
  grade: "K",
  lessonNumber: 8,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-8"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-8"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: أمسك مثلثاً ومخروطاً وقم بتدويرهما في الهواء أمام الطلاب واسأل: هل تحوّل المثلث المقلوب إلى شكل آخر؟ أم بقي مثلثاً بثلاثة أضلاع؟",
    commonMisconceptionsAr: [
      "اعتقاد بعض الطلاب أن المربع المدوّر بزاوية ٤٥ درجة لم يعد مربعاً، أو أن المخروط المقلوب لم يعد مخروطاً.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "vary-orientation",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateShapeIds: ["triangle", "square", "rectangle"],
          },
        },
      ],
      practice: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "vary-orientation",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateShapeIds: ["triangle", "rectangle"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "vary-orientation",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateSolidIds: ["cone", "cylinder"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "mixed-shapes-solids",
            variationMode: "vary-orientation",
            groupCount: 2,
            partCountRange: [2, 3],
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "vary-orientation",
            groupCount: 2,
            partCountRange: [2, 3],
            candidateSolidIds: ["cone", "pyramid"],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "vary-orientation",
            groupCount: 2,
            partCountRange: [2, 4],
          },
        },
      ],
      practice: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "vary-orientation",
            groupCount: 2,
            partCountRange: [2, 4],
            candidateShapeIds: ["triangle", "square", "pentagon", "hexagon"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "vary-orientation",
            groupCount: 2,
            partCountRange: [2, 4],
            candidateSolidIds: ["cone", "cylinder", "pyramid", "rectangular-prism"],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "mixed-shapes-solids",
            variationMode: "vary-orientation",
            groupCount: 2,
            partCountRange: [2, 4],
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "mixed-shapes-solids",
            variationMode: "vary-orientation",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "mixed-shapes-solids",
            variationMode: "vary-orientation",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
      ],
      practice: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "shapes-2d",
            variationMode: "vary-orientation",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "solids-3d",
            variationMode: "vary-orientation",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "mixed-shapes-solids",
            variationMode: "vary-orientation",
            groupCount: 3,
            partCountRange: [2, 3],
          },
        },
      ],
      challenge: [
        {
          archetype: "ClassifyAndCount",
          params: {
            domainMode: "mixed-shapes-solids",
            variationMode: "vary-orientation",
            groupCount: 3,
            partCountRange: [2, 4],
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK2Blueprint);
registerLessonBlueprint(lessonK3Blueprint);
registerLessonBlueprint(lessonK4Blueprint);
registerLessonBlueprint(lessonK5Blueprint);
registerLessonBlueprint(lessonK6Blueprint);
registerLessonBlueprint(lessonK7Blueprint);
registerLessonBlueprint(lessonK8Blueprint);

