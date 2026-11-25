/**
 * Diagnostic questionnaire assessing early reading vs. listening comprehension,
 * decoding fluency, and sight word recognition to recommend an optimal starting level.
 */

export interface DiagnosticOption {
  id: string;
  textAr: string;
  score: number; // 0: struggling/foundational, 1: target Level 1, 2: advanced/Level 2
}

export interface DiagnosticQuestion {
  id: string;
  questionNumber: number;
  title: string;
  category:
    | "decoding"
    | "sight_words"
    | "listening_vs_reading"
    | "fluency"
    | "evidence"
    | "expression";
  promptAr: string;
  options: DiagnosticOption[];
}

export type DiagnosticAnswerMap = Record<string, string>; // questionId -> optionId

export interface DiagnosticResult {
  recommendedLevelId: "level-0" | "level-1" | "level-2";
  titleAr: string;
  subtitleAr: string;
  descriptionAr: string;
  directLink: string;
  totalScore: number;
  maxScore: number;
  levelBadgeAr: string;
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "diag-q1",
    questionNumber: 1,
    title: "التهجئة وفك التشفير الصوتي",
    category: "decoding",
    promptAr:
      "كيف يتعامل الطفل مع قراءة الكلمات الثلاثية والرباعية بالحركات القصيرة والمدود؟",
    options: [
      {
        id: "q1-opt0",
        textAr:
          "يتعثر في نطق أصوات الحروف بحركاتها ويحتاج دعماً كبيراً لدمج الأصوات وقراءة كلمة واحدة.",
        score: 0,
      },
      {
        id: "q1-opt1",
        textAr:
          "يتهجى الكلمات بصوت مسموع رويداً رويداً، وينجح في تجميع معظم الكلمات المألوفة والمضبوطة.",
        score: 1,
      },
      {
        id: "q1-opt2",
        textAr:
          "يقرأ الكلمات المشكولة والممدودة بطلاقة دون حاجة إلى تهجئة صوتية منفصلة.",
        score: 2,
      },
    ],
  },
  {
    id: "diag-q2",
    questionNumber: 2,
    title: "التعرف البصري على الكلمات الشائعة",
    category: "sight_words",
    promptAr:
      "عند مصادفة كلمات شائعة مثل (هَذَا، فِي، عَلَى، قَالَ، كَانَ) في النص:",
    options: [
      {
        id: "q2-opt0",
        textAr:
          "يتوقف عندها طويلاً ويحاول فك حروفها حرفاً بحرف كأي كلمة غريبة جديدة.",
        score: 0,
      },
      {
        id: "q2-opt1",
        textAr:
          "يتعرف عليها بعد تكرارها أو بعد ثوانٍ قليلة دون الحاجة لتهجئة كاملة.",
        score: 1,
      },
      {
        id: "q2-opt2",
        textAr:
          "يتعرف عليها فوراً بمجرد النظر كصورة بصرية تلقائية ودون أدنى تردد.",
        score: 2,
      },
    ],
  },
  {
    id: "diag-q3",
    questionNumber: 3,
    title: "الفهم القرائي الذاتي مقابل الفهم السماعي",
    category: "listening_vs_reading",
    promptAr:
      "عند مقارنة استيعاب الطفل لنص قصير (نحو ٥٠ كلمة) حين يقرؤه بنفسه مقابل استيعابه حين تقرؤه له بصوتك:",
    options: [
      {
        id: "q3-opt0",
        textAr:
          "يفهم القصة عند الاستماع فقط؛ أما عند القراءة الذاتية فيستهلك طاقته في التهجئة ولا يتذكر الأحداث.",
        score: 0,
      },
      {
        id: "q3-opt1",
        textAr:
          "يستوعب الفكرة الرئيسية للقصة وبعض تفاصيلها بنفسه عند القراءة الهادئة مع دعم خفيف.",
        score: 1,
      },
      {
        id: "q3-opt2",
        textAr:
          "يستوعب التفاصيل والمعاني العميقة عند القراءة الذاتية بمستوى يماثل استيعابه السماعي تماماً.",
        score: 2,
      },
    ],
  },
  {
    id: "diag-q4",
    questionNumber: 4,
    title: "طلاقة الجمل والوقف عند علامات الترقيم",
    category: "fluency",
    promptAr: "عند قراءة جملة بسيطة تتألف من أربع إلى ست كلمات:",
    options: [
      {
        id: "q4-opt0",
        textAr:
          "يقرأ بنمط كلمة... توقف طويل... كلمة... وتفقد الجملة ترابطها وسياقها.",
        score: 0,
      },
      {
        id: "q4-opt1",
        textAr:
          "يقرأ الجملة كوحدة متصلة متأنية، ويصل إلى نهايتها بوعي لمعناها العام.",
        score: 1,
      },
      {
        id: "q4-opt2",
        textAr:
          "يقرأ بتنغيم معبر يراعي علامات الترقيم (الوقف عند الفاصلة والنقطة ونبرة الاستفهام).",
        score: 2,
      },
    ],
  },
  {
    id: "diag-q5",
    questionNumber: 5,
    title: "استخراج الدليل والإجابة عن الأسئلة الصريحة",
    category: "evidence",
    promptAr:
      "عند سؤال الطفل: (أين حدثت القصة؟) وإجابته مكتوبة صراحة في السطر الأول:",
    options: [
      {
        id: "q5-opt0",
        textAr:
          "يعتمد على التخمين العشوائي أو النظر في الرسوم دون محاولة فحص الكلمات المكتوبة.",
        score: 0,
      },
      {
        id: "q5-opt1",
        textAr:
          "يعود إلى السطر المكتوب ويشير بإصبعه إلى الكلمة أو العبارة الدالة على الجواب عند توجيهه.",
        score: 1,
      },
      {
        id: "q5-opt2",
        textAr:
          "يستخرج الجواب الصريح تلقائياً ويعلل إجابته بنص الدليل من السطر فوراً وبثقة.",
        score: 2,
      },
    ],
  },
  {
    id: "diag-q6",
    questionNumber: 6,
    title: "التعبير الشفهي وإعادة السرد",
    category: "expression",
    promptAr:
      "بعد الفراغ من قراءة قصة قصيرة، هل يستطيع الطفل إعادة سرد ما فهمه بأسلوبه الخاص؟",
    options: [
      {
        id: "q6-opt0",
        textAr:
          "يكتفي بنعم/لا أو كلمة واحدة معزولة ولا يستطيع صياغة جملة مفيدة عما حدث.",
        score: 0,
      },
      {
        id: "q6-opt1",
        textAr:
          "يذكر الشخصيات والحدث الرئيسي بلغة مفهومة حتى وإن استخدم بعض العبارات الدارجة.",
        score: 1,
      },
      {
        id: "q6-opt2",
        textAr:
          "يعيد سرد تسلسل الأحداث منطقياً ويوظف مفردات جديدة استقاها من القصة.",
        score: 2,
      },
    ],
  },
];

/**
 * Evaluates the selected diagnostic answers and computes a recommended starting reading level.
 */
export function evaluateDiagnosticAnswers(
  answers: DiagnosticAnswerMap
): DiagnosticResult {
  let totalScore = 0;
  const maxScore = DIAGNOSTIC_QUESTIONS.length * 2; // 6 * 2 = 12

  for (const q of DIAGNOSTIC_QUESTIONS) {
    const selectedOptionId = answers[q.id];
    const option = q.options.find((opt) => opt.id === selectedOptionId);
    if (option) {
      totalScore += option.score;
    }
  }

  // Recommendation bands:
  // 0 - 4: Foundational Phase (Level 0)
  // 5 - 9: Level 1 (الانطلاق وبناء المعنى) - Target level for 50-75 words
  // 10 - 12: Level 2 (التوسع والاستنتاج) - Ready for advanced 75+ words
  if (totalScore <= 4) {
    return {
      recommendedLevelId: "level-0",
      titleAr: "مرحلة التأسيس القرائي والصوتي",
      subtitleAr: "بناء الوعي الصوتي وفك التشفير",
      descriptionAr:
        "يُظهر الطفل حاجة لتعزيز مهارات دمج الأصوات والمدود والكلمات البصرية الأساسية قبل الانتقال لنصوص القراءة الموسعة. يُوصى بالتركيز على الوعي الفونيمي والقراءة المشتركة المنطوقة.",
      directLink: "/reading",
      totalScore,
      maxScore,
      levelBadgeAr: "مرحلة التأسيس",
    };
  }

  if (totalScore <= 9) {
    return {
      recommendedLevelId: "level-1",
      titleAr: "المستوى الأول: الانطلاق وبناء المعنى",
      subtitleAr:
        "قصص قصيرة (٥٠–٧٥ كلمة) مع أسئلة علاقات السؤال والجواب واستخراج الدليل",
      descriptionAr:
        "هذا هو المستوى المثالي والمطابق تماماً لقدرات الطفل! الطفل جاهز لقراءة نصوص متدرجة واستخراج الأدلة وبناء الفهم القرائي المتين خطوة بخطوة.",
      directLink: "/reading/level/level-1",
      totalScore,
      maxScore,
      levelBadgeAr: "المستوى الأول 🌟 (موصى به)",
    };
  }

  return {
    recommendedLevelId: "level-2",
    titleAr: "المستوى الثاني: التوسع والاستنتاج",
    subtitleAr: "قصص متقدمة (٧٥–١٠٠ كلمة) مع استنتاجات عميقة",
    descriptionAr:
      "يتمتع الطفل بطلاقة واستيعاب قرائي عالٍ! يمكنه الانطلاق في المستوى الثاني، أو البدء باختبارات النقل (القصتين ٦ و١٢) في المستوى الأول لتأكيد رسوخ الاستراتيجيات المستقلة.",
    directLink: "/reading/level/level-2",
    totalScore,
    maxScore,
    levelBadgeAr: "مستوى متقدم (المستوى الثاني)",
  };
}
