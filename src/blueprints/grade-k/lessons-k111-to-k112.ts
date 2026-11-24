import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lessons K-111 & K-112 — Grade K Unit 9 (Numbers to 20):
// Consecutive Numbers, Vertical Ten Frames, and Number Bonds
// ============================================================================

// ============================================================================
// Lesson K-111: Count and Write Consecutive Numbers (K.CC.2)
// ============================================================================
export const lessonK111Blueprint: LessonBlueprint = {
  lessonId: "K-111",
  grade: "K",
  lessonNumber: 111,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-111"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-111"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "انظر إلى مصفوفات النقاط، ثم تتبّع واكتب الأعداد في التسلسل:",
          strategyHintAr:
            "عدّ النقاط في كل مصفوفة واكتب العدد الذي يزيد بمقدار (١ أكثر).",
          params: {
            sequenceMode: "forward",
            visualKind: "dot-array",
            numbers: [11, 12, 13, 14, 15],
            missingValues: [12, 14],
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "انظر إلى خط الأعداد المتتالية، ثم اكتب الأعداد الناقصة في المربعات:",
          strategyHintAr:
            "انظر إلى الأعداد المتتالية التي تتتابع دون انقطاع، واكتب في كل مربع ناقص العدد الذي يزيد بـ (١ أكثر).",
          params: {
            sequenceMode: "forward",
            responseKind: "fill-missing",
            visualKind: "none",
            numbers: [11, 12, 13, 14, 15],
            missingValues: [12, 14],
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "انظر إلى خط الأعداد المتتالية، ثم اكتب الأعداد الناقصة في المربعات:",
          strategyHintAr:
            "عدّ الأعداد المتتالية بالترتيب واكتب العدد الذي يكمل خط العدّ بانتظام.",
          params: {
            sequenceMode: "forward",
            responseKind: "fill-missing",
            visualKind: "none",
            numbers: [16, 17, 18, 19, 20],
            missingValues: [17, 19],
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ تصاعدياً على خط الأعداد المتتالية، ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "انظر إلى العدد المعطى واكتب العدد الذي يقلّ بـ ١ قبله والعدد الذي يزيد بـ ١ بعده.",
          params: {
            sequenceMode: "forward",
            responseKind: "fill-missing",
            visualKind: "none",
            numbers: [12, 13, 14, 15, 16],
            missingValues: [13, 15],
            reasoningPromptAr:
              "ما العدد الذي يمثّل (١ أقل) من ١٤ وما العدد الذي يمثّل (١ أكثر) من ١٤؟",
            reasoningAnswerAr:
              "العدد ١٣ هو ١ أقل من ١٤، والعدد ١٥ هو ١ أكثر من ١٤",
          },
        },
        {
          archetype: "Digicross",
          promptAr:
            "اكتب الأعداد من ١١ إلى ١٥ في المربعات الفارغة ليتحقق العدّ الصحيح في كل سطر:",
          strategyHintAr:
            "انظر إلى الأعداد المعطاة وتتبّع خطوط العدّ أفقياً ورأسياً لإيجاد الأعداد الناقصة بين ١١ و١٥.",
          params: {
            numberRange: [11, 15],
            missingCount: 2,
            gridCount: 1,
            directions: "mixed",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "انظر إلى مصفوفات النقاط، ثم تتبّع واكتب الأعداد في التسلسل:",
          strategyHintAr:
            "عدّ النقاط في كل مصفوفة واكتب العدد الذي يزيد بمقدار (١ أكثر).",
          params: {
            sequenceMode: "forward",
            visualKind: "dot-array",
            numbers: [11, 12, 13, 14, 15],
            missingValues: [12, 14],
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "انظر إلى خط الأعداد المتتالية، ثم اكتب الأعداد الناقصة في المربعات:",
          strategyHintAr:
            "انظر إلى الأعداد المتتالية التي تتتابع دون انقطاع، واكتب في كل مربع ناقص العدد الذي يزيد بـ (١ أكثر).",
          params: {
            sequenceMode: "forward",
            responseKind: "fill-missing",
            visualKind: "none",
            numbers: [11, 12, 13, 14, 15],
            missingValues: [12, 14, 15],
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "انظر إلى خط الأعداد المتتالية، ثم اكتب الأعداد الناقصة في المربعات:",
          strategyHintAr:
            "عدّ الأعداد المتتالية بالترتيب واكتب العدد الذي يكمل خط العدّ بانتظام.",
          params: {
            sequenceMode: "forward",
            responseKind: "fill-missing",
            visualKind: "none",
            numbers: [15, 16, 17, 18, 19],
            missingValues: [16, 18],
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ تصاعدياً على خط الأعداد المتتالية، ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "انظر إلى العدد المعطى واكتب العدد الذي يقلّ بـ ١ قبله والعدد الذي يزيد بـ ١ بعده.",
          params: {
            sequenceMode: "forward",
            responseKind: "fill-missing",
            visualKind: "none",
            numbers: [14, 15, 16, 17, 18],
            missingValues: [14, 16, 18],
            reasoningPromptAr:
              "ما العدد الذي يمثّل (١ أقل) من ١٦ وما العدد الذي يمثّل (١ أكثر) من ١٦؟",
            reasoningAnswerAr:
              "العدد ١٥ هو ١ أقل من ١٦، والعدد ١٧ هو ١ أكثر من ١٦",
          },
        },
        {
          archetype: "Digicross",
          promptAr:
            "اكتب الأعداد من ١١ إلى ١٥ في المربعات الفارغة ليتحقق العدّ الصحيح في كل سطر:",
          strategyHintAr:
            "انظر إلى الأعداد المعطاة وتتبّع خطوط العدّ أفقياً ورأسياً لإيجاد الأعداد الناقصة بين ١١ و١٥.",
          params: {
            numberRange: [11, 15],
            missingCount: 3,
            gridCount: 1,
            directions: "mixed",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "انظر إلى مصفوفات النقاط، ثم تتبّع واكتب الأعداد في التسلسل:",
          strategyHintAr:
            "عدّ النقاط في كل مصفوفة واكتب العدد الذي يزيد بمقدار (١ أكثر).",
          params: {
            sequenceMode: "forward",
            visualKind: "dot-array",
            numbers: [11, 12, 13, 14, 15],
            missingValues: [12, 14],
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "انظر إلى خط الأعداد المتتالية، ثم اكتب الأعداد الناقصة في المربعات:",
          strategyHintAr:
            "انظر إلى الأعداد المتتالية التي تتتابع دون انقطاع، واكتب في كل مربع ناقص العدد الذي يزيد بـ (١ أكثر).",
          params: {
            sequenceMode: "forward",
            responseKind: "fill-missing",
            visualKind: "none",
            numbers: [11, 12, 13, 14, 15],
            missingValues: [11, 13, 15],
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "انظر إلى خط الأعداد المتتالية، ثم اكتب الأعداد الناقصة في المربعات:",
          strategyHintAr:
            "عدّ الأعداد المتتالية بالترتيب واكتب العدد الذي يكمل خط العدّ بانتظام.",
          params: {
            sequenceMode: "forward",
            responseKind: "fill-missing",
            visualKind: "none",
            numbers: [16, 17, 18, 19, 20],
            missingValues: [16, 18, 20],
          },
        },
      ],
      challenge: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ تصاعدياً على خط الأعداد المتتالية، ثم اكتب الأعداد الناقصة:",
          strategyHintAr:
            "انظر إلى العدد المعطى واكتب العدد الذي يقلّ بـ ١ قبله والعدد الذي يزيد بـ ١ بعده.",
          params: {
            sequenceMode: "forward",
            responseKind: "fill-missing",
            visualKind: "none",
            numbers: [15, 16, 17, 18, 19],
            missingValues: [15, 17, 19],
            reasoningPromptAr:
              "ما العدد الذي يمثّل (١ أقل) من ١٧ وما العدد الذي يمثّل (١ أكثر) من ١٧؟",
            reasoningAnswerAr:
              "العدد ١٦ هو ١ أقل من ١٧، والعدد ١٨ هو ١ أكثر من ١٧",
          },
        },
        {
          archetype: "Digicross",
          promptAr:
            "اكتب الأعداد من ١١ إلى ١٥ في المربعات الفارغة ليتحقق العدّ الصحيح في كل سطر:",
          strategyHintAr:
            "انظر إلى الأعداد المعطاة وتتبّع خطوط العدّ أفقياً ورأسياً لإيجاد الأعداد الناقصة بين ١١ و١٥.",
          params: {
            numberRange: [11, 15],
            missingCount: 4,
            gridCount: 1,
            directions: "mixed",
          },
        },
      ],
    },
  },
};

// ============================================================================
// Lesson K-112: Model Numbers with Vertical Ten Frames & Number Bonds (K.NBT.1)
// ============================================================================
export const lessonK112Blueprint: LessonBlueprint = {
  lessonId: "K-112",
  grade: "K",
  lessonNumber: 112,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-112"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-112"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتَي العشرة بلمحة واحدة، ثم اكتب العدد الإجمالي في المربع:",
          strategyHintAr:
            "انظر إلى اللوحة العلوية الممتلئة (١٠)، ثم انظر إلى أقراص اللوحة السفلية واكتب الكلّ فوراً.",
          params: {
            frameCount: 2,
            subitizeMode: "identify-quantity",
            candidateCounts: [11, 12, 13, 14, 15],
            cardCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتَي العشرة الرأسيتين، ثم اكتب عدد الآحاد والعدد الكلّ:",
          strategyHintAr:
            "انظر إلى اللوحة الأولى الكاملة (١٠) بلمحة واحدة، ثم انظر إلى أقراص اللوحة الثانية واكتب الكلّ في مكانه.",
          params: {
            subitizeMode: "decompose-teen",
            drawModel: "vertical-ten-frame",
            candidateCounts: [11, 12, 13, 14, 15],
            cardCount: 2,
            reasoningPromptAr:
              "كيف تساعدك اللوحة الرأسية الكاملة (١٠) على معرفة العدد الإجمالي بسرعة؟",
            reasoningAnswerAr:
              "لأنني أعرف أنها ١٠ فوراً دون عدّ، ثم أضيف إليها أقراص اللوحة الثانية",
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتَي العشرة الرأسيتين، ثم اكتب عدد الآحاد والعدد الكلّ:",
          strategyHintAr:
            "اكتب الجزأين والكلّ بدقة مستفيداً من أن (١٠ وقليل أكثر) يكوّنان عدداً عشرينياً.",
          params: {
            subitizeMode: "decompose-teen",
            drawModel: "vertical-ten-frame",
            candidateCounts: [12, 13, 14, 15],
            cardCount: 2,
            reasoningPromptAr:
              "إذا كانت اللوحة الأولى بها ١٠ والثانية بها ٤، فما هو العدد الإجمالي؟",
            reasoningAnswerAr: "العدد الإجمالي هو ١٤ (١٠ و٤ يكوّنان ١٤)",
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى تمثيل العدد بالمكعبات ولوحة العشرة، ثم اكتب الجزأين والكلّ:",
          strategyHintAr:
            "انظر إلى مجموعة العشرة الكاملة والآحاد الإضافية لكتابة التفكيك بصيغة ١٠ وأكثر.",
          params: {
            subitizeMode: "decompose-teen",
            drawModel: "vertical-ten-frame",
            solidId: "cube",
            candidateCounts: [12, 13, 14],
            cardCount: 1,
            reasoningPromptAr:
              "ما هو التفكيك الموسّع للعدد ١٣ باستخدام ١٠ والآحاد؟",
            reasoningAnswerAr: "العدد ١٣ يتفكك إلى ١٠ و٣",
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة برابطة الأعداد المطابقة، ثم اكتب الكلّ في الدائرة:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم صِلْ برابطة الأعداد التي تحمل الجزأين نفسيهما واكتب الكلّ.",
          params: {
            matchingMode: "ten-frame-to-number-bond",
            pairCount: 3,
            totalRange: [5, 10],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتَي العشرة بلمحة واحدة، ثم اكتب العدد الإجمالي في المربع:",
          strategyHintAr:
            "انظر إلى اللوحة العلوية الممتلئة (١٠)، ثم انظر إلى أقراص اللوحة السفلية واكتب الكلّ فوراً.",
          params: {
            frameCount: 2,
            subitizeMode: "identify-quantity",
            candidateCounts: [11, 12, 13, 14, 15],
            cardCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتَي العشرة الرأسيتين، ثم اكتب عدد الآحاد والعدد الكلّ:",
          strategyHintAr:
            "انظر إلى اللوحة الأولى الكاملة (١٠) بلمحة واحدة، ثم انظر إلى أقراص اللوحة الثانية واكتب الكلّ في مكانه.",
          params: {
            subitizeMode: "decompose-teen",
            drawModel: "vertical-ten-frame",
            candidateCounts: [11, 12, 13, 14, 15, 16],
            cardCount: 2,
            reasoningPromptAr:
              "كيف تساعدك اللوحة الرأسية الكاملة (١٠) على معرفة العدد الإجمالي بسرعة؟",
            reasoningAnswerAr:
              "لأنني أعرف أنها ١٠ فوراً دون عدّ، ثم أضيف إليها أقراص اللوحة الثانية",
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتَي العشرة الرأسيتين، ثم اكتب عدد الآحاد والعدد الكلّ:",
          strategyHintAr:
            "اكتب الجزأين والكلّ بدقة مستفيداً من أن (١٠ وقليل أكثر) يكوّنان عدداً عشرينياً.",
          params: {
            subitizeMode: "decompose-teen",
            drawModel: "vertical-ten-frame",
            candidateCounts: [14, 15, 16, 17, 18],
            cardCount: 2,
            reasoningPromptAr:
              "إذا كانت اللوحة الأولى بها ١٠ والثانية بها ٦، فما هو العدد الإجمالي؟",
            reasoningAnswerAr: "العدد الإجمالي هو ١٦ (١٠ و٦ يكوّنان ١٦)",
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى تمثيل العدد بالمكعبات ولوحة العشرة، ثم اكتب الجزأين والكلّ:",
          strategyHintAr:
            "انظر إلى مجموعة العشرة الكاملة والآحاد الإضافية لكتابة التفكيك بصيغة ١٠ وأكثر.",
          params: {
            subitizeMode: "decompose-teen",
            drawModel: "vertical-ten-frame",
            solidId: "cube",
            candidateCounts: [14, 15, 16],
            cardCount: 1,
            reasoningPromptAr:
              "ما هو التفكيك الموسّع للعدد ١٥ باستخدام ١٠ والآحاد؟",
            reasoningAnswerAr: "العدد ١٥ يتفكك إلى ١٠ و٥",
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة برابطة الأعداد المطابقة، ثم اكتب الجزء الناقص في الرابطة:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم صِلْ برابطة الأعداد التي تحمل الجزأين نفسيهما واكتب الجزء الناقص.",
          params: {
            matchingMode: "ten-frame-to-number-bond",
            pairCount: 3,
            totalRange: [6, 10],
            matchMissingPosition: "part2",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتَي العشرة بلمحة واحدة، ثم اكتب العدد الإجمالي في المربع:",
          strategyHintAr:
            "انظر إلى اللوحة العلوية الممتلئة (١٠)، ثم انظر إلى أقراص اللوحة السفلية واكتب الكلّ فوراً.",
          params: {
            frameCount: 2,
            subitizeMode: "identify-quantity",
            candidateCounts: [11, 12, 13, 14, 15],
            cardCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتَي العشرة الرأسيتين، ثم اكتب عدد الآحاد والعدد الكلّ:",
          strategyHintAr:
            "انظر إلى اللوحة الأولى الكاملة (١٠) بلمحة واحدة، ثم انظر إلى أقراص اللوحة الثانية واكتب الكلّ في مكانه.",
          params: {
            subitizeMode: "decompose-teen",
            drawModel: "vertical-ten-frame",
            candidateCounts: [11, 12, 13, 14, 15, 16, 17, 18],
            cardCount: 2,
            reasoningPromptAr:
              "كيف تساعدك اللوحة الرأسية الكاملة (١٠) على معرفة العدد الإجمالي بسرعة؟",
            reasoningAnswerAr:
              "لأنني أعرف أنها ١٠ فوراً دون عدّ، ثم أضيف إليها أقراص اللوحة الثانية",
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحتَي العشرة الرأسيتين، ثم اكتب عدد الآحاد والعدد الكلّ:",
          strategyHintAr:
            "اكتب الجزأين والكلّ بدقة مستفيداً من أن (١٠ وقليل أكثر) يكوّنان عدداً عشرينياً.",
          params: {
            subitizeMode: "decompose-teen",
            drawModel: "vertical-ten-frame",
            candidateCounts: [16, 17, 18, 19, 20],
            cardCount: 2,
            reasoningPromptAr:
              "إذا كانت اللوحة الأولى بها ١٠ والثانية بها ٨، فما هو العدد الإجمالي؟",
            reasoningAnswerAr: "العدد الإجمالي هو ١٨ (١٠ و٨ يكوّنان ١٨)",
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى تمثيل العدد بالمكعبات ولوحة العشرة، ثم اكتب الجزأين والكلّ:",
          strategyHintAr:
            "انظر إلى مجموعة العشرة الكاملة والآحاد الإضافية لكتابة التفكيك بصيغة ١٠ وأكثر.",
          params: {
            subitizeMode: "decompose-teen",
            drawModel: "vertical-ten-frame",
            solidId: "cube",
            candidateCounts: [16, 17, 18],
            cardCount: 1,
            reasoningPromptAr:
              "ما هو التفكيك الموسّع للعدد ١٧ باستخدام ١٠ والآحاد؟",
            reasoningAnswerAr: "العدد ١٧ يتفكك إلى ١٠ و٧",
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة برابطة الأعداد المطابقة، ثم اكتب الجزء الناقص في الرابطة:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم صِلْ برابطة الأعداد التي تحمل الجزأين نفسيهما واكتب الجزء الناقص.",
          params: {
            matchingMode: "ten-frame-to-number-bond",
            pairCount: 4,
            totalRange: [6, 10],
            matchMissingPosition: "part2",
          },
        },
      ],
    },
  },
};

// ============================================================================
// Blueprint Registrations
// ============================================================================
registerLessonBlueprint(lessonK111Blueprint);
registerLessonBlueprint(lessonK112Blueprint);
