import type { LessonBlueprint } from "@/domain/types";
import type { SequenceStepInput } from "@/archetypes/sequence-and-zero";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";
import { formatEasternNumber } from "@/lib/numerals";
import { createTenFrameSpec } from "@/visual-models/unit-2-models";

// ============================================================================
// Lessons K-89 / K-90 — Unit 8 (Subtract to 10): counting backward
// ============================================================================
// K-89 reads decreasing-by-1 Picture Graphs, answers the more/fewer questions,
// colors circles to count backward from 10 to 5 (Problem of the Day), and
// colors trucks and writes their totals (COUNT DOWN Brain Builder).
// K-90 counts backward with ten-frame sets in place, crosses circles off
// (PotD), and fills the Digicross grid where every row and column is a
// consecutive counting sequence (DIGICROSS Brain Builder, directions "mixed").
// ============================================================================

const STEP_COLOR_CYCLE = [
  "coral",
  "amber",
  "sky",
  "emerald",
  "violet",
  "rose",
  "teal",
] as const;

const COUNTDOWN_TOTAL = 10;

/** Count-backward values 10 → 5 shown across the Problem-of-the-Day frames. */
const COUNTDOWN_VALUES = [10, 9, 8, 7, 6, 5];

function colorCircleSteps(missingValues: number[]): SequenceStepInput[] {
  return COUNTDOWN_VALUES.map((value, idx) => ({
    value,
    isMissing: missingValues.includes(value),
    colorTheme: STEP_COLOR_CYCLE[idx % STEP_COLOR_CYCLE.length],
    visualModel: createTenFrameSpec({
      count: value,
      colorTheme: STEP_COLOR_CYCLE[idx % STEP_COLOR_CYCLE.length],
      highlightEmptySlots: true,
    }),
  }));
}

function crossOffStepNoteAr(value: number): string {
  if (value >= COUNTDOWN_TOTAL) {
    return `الكَلّ: ${formatEasternNumber(COUNTDOWN_TOTAL)} أقراص`;
  }
  return `شُطب ${formatEasternNumber(
    COUNTDOWN_TOTAL - value
  )} فبقي ${formatEasternNumber(value)}`;
}

function crossOffSteps(missingValues: number[]): SequenceStepInput[] {
  return COUNTDOWN_VALUES.map((value, idx) => ({
    value,
    isMissing: missingValues.includes(value),
    colorTheme: STEP_COLOR_CYCLE[idx % STEP_COLOR_CYCLE.length],
    stepNoteAr: crossOffStepNoteAr(value),
    visualModel: createTenFrameSpec({
      count: COUNTDOWN_TOTAL,
      crossedOutCount: COUNTDOWN_TOTAL - value,
      colorTheme: STEP_COLOR_CYCLE[idx % STEP_COLOR_CYCLE.length],
      highlightEmptySlots: true,
    }),
  }));
}

// ============================================================================
// Lesson K-89: Count Backward with Picture Graphs
// ============================================================================
export const lessonK89Blueprint: LessonBlueprint = {
  lessonId: "K-89",
  grade: "K",
  lessonNumber: 89,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-89"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-89"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ الصور في كل صفّ من اليمين إلى اليسار ثم اكتب العدد في المربع:",
          strategyHintAr:
            "انظر إلى نهاية كل صفّ واقرأ العدد على المحور الأفقي.",
          params: {
            orientation: "horizontal",
            titleAr: "تمثيل بياني أفقي بالصور حتى ٥",
            categories: [
              { objectId: "apple", count: 5, colorTheme: "coral" },
              { objectId: "banana", count: 4, colorTheme: "amber" },
              { objectId: "orange", count: 3, colorTheme: "emerald" },
            ],
            responseMode: "trace-and-write",
            maxCount: 5,
            comparisonRelation: "١ أقل",
            comparisonPromptAr:
              "قارن بين صفّ الموز (٤) وصفّ التفاح (٥): هل عدد الموز يمثّل (١ أكثر) أم (١ أقل)؟",
            comparisonAnswerAr:
              "١ أقل: عدد الموز (٤) هو ١ أقل من عدد التفاح (٥)",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى التمثيل البياني بالصور، ثم عدّ صور كل فئة وتتبّع الرقم واكتبه:",
          strategyHintAr:
            "انظر إلى الفئة الأطول، ثم انقص من عددها صورةً واحداً في كل فئة تالية فكل متتالية تنقص بمقدار (١ أقل).",
          params: {
            countsPattern: "decreasing-by-1",
            responseMode: "trace-and-write",
            maxCount: 8,
            comparisonRelation: "١ أقل",
            titleAr: "العدّ التنازلي في التمثيل البياني",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى التمثيل البياني بالصور، ثم اكتب عدد كل فئة، وقارن: أيّ فئة تمثّل (١ أقل) من سابقتها؟",
          strategyHintAr:
            "انظر إلى الفئة الأطول واكتب عددها، ثم اطرح من كل فئة واحدة وقارن بين صفيّ متجاورين واحداً بعد الآخر.",
          params: {
            countsPattern: "decreasing-by-1",
            responseMode: "write",
            maxCount: 8,
            comparisonRelation: "١ أقل",
            titleAr: "العدّ التنازلي في التمثيل البياني",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى الجدول، ثم لوّن الشاحنات الناقصة في كل صفّ حتى يطابق عدد الصفّ العدد المكتوب في الجدول:",
          strategyHintAr:
            "عدّ الشاحنات الملوّنة في كل صفّ، ثم ارسم ما ينقص حتى يساوي عدد الجدول.",
          params: {
            responseMode: "draw-missing",
            orientation: "horizontal",
            titleAr: "COUNT DOWN: شاحنات ملوّنة",
            categories: [
              {
                objectId: "car",
                labelAr: "شاحنة حمراء",
                count: 4,
                colorTheme: "coral",
              },
              {
                objectId: "car",
                labelAr: "شاحنة صفراء",
                count: 3,
                colorTheme: "amber",
              },
              {
                objectId: "car",
                labelAr: "شاحنة زرقاء",
                count: 2,
                colorTheme: "sky",
              },
            ],
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "انظر إلى دوائر العدّ التنازلي من ١٠ إلى ٥، ثم اكتب عدد الدوائر الملوّنة في كل لوحة:",
          strategyHintAr:
            "انظر إلى كل لوحة وعدّ الدوائر الملوّنة، فكل لوحة تنقص دائرةً واحدة عن سابقتها (١ أقل).",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            steps: colorCircleSteps([9]),
            reasoningPromptAr:
              "ما العدد الذي يأتي بعد ٩ مباشرة عند العدّ التنازلي من ١٠ إلى ٥؟",
            reasoningAnswerAr:
              "العدد ٨ يأتي بعد ٩ مباشرة (٩ هو ١ أقل من ١٠، و٨ هو ١ أقل من ٩)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "عدّ عناصر كل عمود من الأسفل إلى الأعلى ثم اكتب العدد المقابل على المحور:",
          strategyHintAr:
            "انظر إلى قمة كل عمود واقرأ العدد على المحور العمودي.",
          params: {
            orientation: "vertical",
            titleAr: "تمثيل بياني عمودي تنازلي",
            categories: [
              { objectId: "star", count: 5, colorTheme: "amber" },
              { objectId: "flower", count: 4, colorTheme: "rose" },
              { objectId: "leaf", count: 3, colorTheme: "emerald" },
            ],
            responseMode: "write",
            maxCount: 5,
            comparisonRelation: "١ أقل",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى التمثيل البياني بالصور، ثم عدّ صور كل فئة واكتب العدد من ذاكرتك:",
          strategyHintAr:
            "انظر إلى الفئة الأطول واكتب عددها دون عدّ فردي، ثم انقص من كل فئة تالية صورةً واحداً (١ أقل).",
          params: {
            countsPattern: "decreasing-by-1",
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أقل",
            titleAr: "العدّ التنازلي في التمثيل البياني",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى التمثيل البياني بالصور، ثم اكتب عدد كل فئة، وقارن أيّ فئة تمثّل (١ أقل) من سابقتها في التسلسل:",
          strategyHintAr:
            "انظر إلى الفئة الأكثر صوراً واكتب عددها، ثم قارن بين صفيّ متجاورين لتنقل (١ أقل) في المتتالية التنازلية.",
          params: {
            countsPattern: "decreasing-by-1",
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أقل",
            titleAr: "العدّ التنازلي في التمثيل البياني",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى الجدول، ثم لوّن الشاحنات الناقصة في كل صفّ حتى يطابق عدد الصفّ العدد المكتوب في الجدول:",
          strategyHintAr:
            "عدّ الشاحنات الملوّنة في كل صفّ من اليمين، ثم ارسم ما ينقص حتى يساوي عدد الجدول.",
          params: {
            responseMode: "draw-missing",
            orientation: "horizontal",
            titleAr: "COUNT DOWN: شاحنات ملوّنة",
            categories: [
              {
                objectId: "car",
                labelAr: "شاحنة حمراء",
                count: 4,
                colorTheme: "coral",
              },
              {
                objectId: "car",
                labelAr: "شاحنة صفراء",
                count: 3,
                colorTheme: "amber",
              },
              {
                objectId: "car",
                labelAr: "شاحنة زرقاء",
                count: 2,
                colorTheme: "sky",
              },
            ],
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "انظر إلى دوائر العدّ التنازلي من ١٠ إلى ٥، ثم اكتب عدد الدوائر الملوّنة في كل لوحة:",
          strategyHintAr:
            "انظر إلى كل لوحة واعرف عدد الدوائر الملوّنة بلمحة، فكل لوحة تنقص دائرةً واحدة عن سابقتها (١ أقل).",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            steps: colorCircleSteps([9, 7]),
            reasoningPromptAr:
              "ما العددان اللذان يليان العدد ١٠ مباشرة في العدّ التنازلي حتى ٥؟",
            reasoningAnswerAr: "العددان هما ٩ ثم ٨ (١ أقل في كل خطوة)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "اقرأ التمثيل البياني العمودي حتى ١٠ ثم اكتب الأعداد وقارن بين الأعمدة:",
          strategyHintAr:
            "انظر إلى المحور العمودي المرقّم واكتب العدد المقابل لقمة كل عمود.",
          params: {
            orientation: "vertical",
            titleAr: "تمثيل بياني عمودي تنازلي حتى ١٠",
            categories: [
              { objectId: "fish", count: 10, colorTheme: "sky" },
              { objectId: "cat", count: 9, colorTheme: "amber" },
              { objectId: "ball", count: 8, colorTheme: "coral" },
              { objectId: "kite", count: 7, colorTheme: "violet" },
            ],
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أقل",
          },
        },
      ],
      practice: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى التمثيل البياني بالصور، ثم عدّ صور كل فئة واكتب العدد من ذاكرتك بقول العدّ التنازلي:",
          strategyHintAr:
            "انظر إلى الفئة الأولى واكتب عددها، ثم تلا سلسلة الصفوف تنقص صورةً واحداً في كل مرة (١ أقل) واكتب أعدادها بالترديد.",
          params: {
            countsPattern: "decreasing-by-1",
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أقل",
            titleAr: "العدّ التنازلي في التمثيل البياني",
          },
        },
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى التمثيل البياني بالصور، ثم اكتب عدد كل فئة، وقارن بين كلّ فئتين متجاورتين في التسلسل التنازلي:",
          strategyHintAr:
            "انظر إلى الفئة الأطول واكتب عددها بلمحة، ثم قارن بين أيّ صفّين متجاورين لاستكمال السلسلة التنازلية حتى آخر فئة.",
          params: {
            countsPattern: "decreasing-by-1",
            responseMode: "write",
            maxCount: 10,
            comparisonRelation: "١ أقل",
            titleAr: "العدّ التنازلي في التمثيل البياني",
          },
        },
      ],
      challenge: [
        {
          archetype: "PictureGraphRead",
          promptAr:
            "انظر إلى الجدول، ثم لوّن الشاحنات الناقصة في كل صفّ حتى يطابق عدد الصفّ العدد المكتوب في الجدول:",
          strategyHintAr:
            "عدّ الشاحنات الملوّنة في كل صفّ، ثم ارسم ما ينقص حتى يساوي عدد الجدول، وتأكّد من أنّ الصفوف تتناقص بمقدار صورة في كل مرّة.",
          params: {
            responseMode: "draw-missing",
            orientation: "horizontal",
            titleAr: "COUNT DOWN: شاحنات ملوّنة",
            categories: [
              {
                objectId: "car",
                labelAr: "شاحنة حمراء",
                count: 5,
                colorTheme: "coral",
              },
              {
                objectId: "car",
                labelAr: "شاحنة صفراء",
                count: 4,
                colorTheme: "amber",
              },
              {
                objectId: "car",
                labelAr: "شاحنة زرقاء",
                count: 3,
                colorTheme: "sky",
              },
            ],
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "انظر إلى دوائر العدّ التنازلي من ١٠ إلى ٥، ثم اكتب عدد الدوائر الملوّنة في كل لوحة:",
          strategyHintAr:
            "انظر إلى كل لوحة واعرف عدد الدوائر الملوّنة بلمحة، فكل لوحة تنقص دائرةً واحدة عن سابقتها (١ أقل).",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            steps: colorCircleSteps([10, 9, 8]),
            reasoningPromptAr:
              "ما الأعداد الثلاثة المفقودة في بداية سلسلة العدّ التنازلي من ١٠ إلى ٥؟",
            reasoningAnswerAr: "الأعداد المفقودة هي ١٠ و٩ و٨",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK89Blueprint);

// ============================================================================
// Lesson K-90: Count Backward with Sets & Digits
// ============================================================================
export const lessonK90Blueprint: LessonBlueprint = {
  lessonId: "K-90",
  grade: "K",
  lessonNumber: 90,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-90"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-90"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ أبراج المكعبات تنازلياً من ٤ إلى ١ ثم اكتب العدد المفقود في المربع:",
          strategyHintAr:
            "انظر إلى كل برج ينقص بمكعب واحد (١ أقل) واكتب العدد الناقص.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [4, 3, 2, 1],
            missingCount: 1,
            reasoningPromptAr: "بكم ينقص كل برج عن البرج الذي يسبقه؟",
            reasoningAnswerAr: "ينقص بمقدار مكعب واحد (١ أقل)",
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ تنازلياً على لوحات العشرة من اليمين إلى اليسار (١ أقل في كل خطوة)، ثم اكتب الأعداد المفقودة في التسلسل:",
          strategyHintAr:
            "انظر إلى اللوحة الأولى الممتلئة (١٠)، ثم اطرح قرصاً واحداً في كل خطوة واكتب العدد الذي يليه.",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            numbers: [10, 9, 8, 7],
            missingValues: [9],
            reasoningPromptAr:
              "ما العدد الذي يقلّ بمقدار ١ عن ١٠ ويأتي قبله في العدّ التنازلي؟",
            reasoningAnswerAr: "العدد ٩ هو ١ أقل من ١٠",
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ تنازلياً على لوحات العشرة من ١٠ إلى ٦ (١ أقل في كل خطوة)، ثم اكتب الأعداد المفقودة في المربعات:",
          strategyHintAr:
            "انظر إلى اللوحة الممتلئة (١٠) ثم انقص قرصاً واحداً في كل خطوة، واكتب الأعداد الناقصة في ترتيبها.",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            numbers: [10, 9, 8, 7, 6],
            missingValues: [9, 7],
            reasoningPromptAr: "كيف ينقص تسلسل لوحات العشرة في كل خطوة؟",
            reasoningAnswerAr: "ينقص قرصاً واحداً في كل خطوة (١ أقل)",
          },
        },
      ],
      challenge: [
        {
          archetype: "Digicross",
          promptAr:
            "انظر إلى شبكة ديجيكروس، ثم حدّد اتجاه كلّ خطّة واكتب الرقم المفقود في كل مربّع فارغ:",
          strategyHintAr:
            "انظر إلى الخانتين المعطاتين في كل خطّة لمعرفة إن كانت تزيد أم تنقص بمقدار ١، ثم املأ الفراغ بالعدد التالي.",
          params: {
            directions: "backward",
            missingCount: 2,
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "اشطب دائرةً واحدة في كل خطوة على لوحات العشرة من ١٠ إلى ٥، ثم اكتب كم بقي من الأقراص بعد كل شطب:",
          strategyHintAr:
            "انظر إلى كل لوحة وعدّ الأقراص غير المشطوبة، فالعدّ التنازلي ينقص قرصاً مشطوباً واحداً في كل خطوة (١ أقل).",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            steps: crossOffSteps([9, 7]),
            reasoningPromptAr:
              "كم قرصاً يبقى على لوحة العشرة بعد أن نشطب دائرتين منها؟",
            reasoningAnswerAr: "يبقى ٨ أقراص (١٠ بدون ٢)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr: "عدّ تنازلياً من ٨ إلى ٥ ثم اكتب العدد المفقود في المربع:",
          strategyHintAr:
            "انظر إلى كل خطوة تنقص بمقدار ١ أقل واكتب العدد السابق في الفراغ.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [8, 7, 6, 5],
            missingCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ تنازلياً على لوحات العشرة من ١٠ (١ أقل في كل خطوة)، ثم اكتب الأعداد المفقودة في التسلسل:",
          strategyHintAr:
            "انظر إلى اللوحة الممتلئة (١٠)، ثم انقص قرصاً واحداً في كل لوحة تالية واكتب الأعداد بالترتيب دون عدّ فردي.",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            numbers: [10, 9, 8, 7],
            missingValues: [9, 8],
            reasoningPromptAr:
              "ما العددان اللذان يقلّان عن ١٠ بالترتيب التنازلي؟",
            reasoningAnswerAr: "العددان هما ٩ ثم ٨",
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ تنازلياً على لوحات العشرة من ١٠ إلى ٦، ثم اكتب الأعداد المفقودة في المربعات:",
          strategyHintAr:
            "انظر إلى نقصان قرص واحد من لوحة إلى اللوحة التالية، واكتب الأعداد الناقصة من ذاكرتك.",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            numbers: [10, 9, 8, 7, 6],
            missingValues: [9, 7],
            reasoningPromptAr: "ما العدد الذي يقلّ بمقدار ١ عن ٨؟",
            reasoningAnswerAr: "العدد ٧ هو ١ أقل من ٨",
          },
        },
      ],
      challenge: [
        {
          archetype: "Digicross",
          promptAr:
            "انظر إلى شبكة ديجيكروس، ثم حدّد اتجاه كلّ خطّة (تصاعدي أم تنازلي) واكتب الرقم المفقود في كل مربّع فارغ:",
          strategyHintAr:
            "انظر إلى الخانتين المعطاتين في كل خطّة لمعرفة إن كانت تزيد أم تنقص بمقدار ١، ثم املأ الفراغ بالعدد التالي.",
          params: {
            directions: "mixed",
            missingCount: 3,
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "اشطب دائرةً واحدة في كل خطوة على لوحات العشرة من ١٠ إلى ٥، ثم اكتب كم بقي من الأقراص بعد كل شطب:",
          strategyHintAr:
            "انظر إلى كل لوحة واعرف كم بقي من الأقراص بلمحة، فكل شطب ينقص قرصاً واحداً (١ أقل).",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            steps: crossOffSteps([9, 7]),
            reasoningPromptAr:
              "كم قرصاً يبقى على لوحة العشرة بعد أن نشطب ثلاثة أقراص منها؟",
            reasoningAnswerAr: "يبقى ٧ أقراص (١٠ بدون ٣)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SequenceAndZero",
          promptAr: "عدّ تنازلياً من ٩ إلى ٦ ثم اكتب العدد المفقود في المربع:",
          strategyHintAr:
            "انظر إلى التسلسل واكتب العدد الذي يمثّل ١ أقل من العدد السابق.",
          params: {
            sequenceMode: "backward",
            visualKind: "snap-cubes",
            numbers: [9, 8, 7, 6],
            missingCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ تنازلياً على لوحات العشرة من ١٠ (١ أقل في كل خطوة)، ثم اكتب الأعداد المفقودة في المربعات:",
          strategyHintAr:
            "انظر إلى النقصان من لوحة إلى اللوحة التالية، واكتب الأعداد الناقصة وصولاً إلى ٧.",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            numbers: [10, 9, 8, 7],
            missingValues: [10, 7],
            reasoningPromptAr:
              "ما العدد الأكبر الذي نبدأ به العدّ التنازلي، وما العدد الذي يليه؟",
            reasoningAnswerAr: "نبدأ بالعدد ١٠، ثم يليه العدد ٩ (١ أقل)",
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "عدّ تنازلياً على لوحات العشرة من ١٠ إلى ٦، ثم اكتب الأعداد المفقودة في المربعات:",
          strategyHintAr:
            "انظر إلى النمط الذي ينقص قرصاً في كل خطوة، واكتب الأعداد الناقصة من الذاكرة.",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            numbers: [10, 9, 8, 7, 6],
            missingValues: [9, 8],
            reasoningPromptAr: "بكم ينقص آخر عدد (٦) عن العدد الأول (١٠)؟",
            reasoningAnswerAr: "ينقص بمقدار ٤ (كل خطوة ١ أقل)",
          },
        },
      ],
      challenge: [
        {
          archetype: "Digicross",
          promptAr:
            "انظر إلى شبكة ديجيكروس، ثم حدّد اتجاه كلّ خطّة (تصاعدي أم تنازلي) واكتب الرقم المفقود في كل مربّع فارغ:",
          strategyHintAr:
            "انظر إلى الخانتين المعطاتين في كل خطّة لمعرفة إن كانت تزيد أم تنقص بمقدار ١، وابدأ بأقرب فراغ إلى خانتين معطاتين، ثم املأ الفراغ بالعدد التالي.",
          params: {
            directions: "mixed",
            missingCount: 4,
          },
        },
        {
          archetype: "SequenceAndZero",
          promptAr:
            "اشطب دائرةً واحدة في كل خطوة على لوحات العشرة من ١٠ إلى ٥، ثم اكتب كم بقي من الأقراص بعد كل شطب:",
          strategyHintAr:
            "انظر إلى كل لوحة واعرف كم بقي من الأقراص بلمحة، فكل شطب ينقص قرصاً واحداً (١ أقل).",
          params: {
            sequenceMode: "backward",
            visualKind: "ten-frame",
            steps: crossOffSteps([10, 9, 7]),
            reasoningPromptAr:
              "كم قرصاً يبقى على لوحة العشرة بعد أن نشطب خمسة أقراص منها؟",
            reasoningAnswerAr: "يبقى ٥ أقراص (١٠ بدون ٥)",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK90Blueprint);
