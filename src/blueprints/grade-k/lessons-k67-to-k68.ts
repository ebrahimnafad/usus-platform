import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lesson K-67: Subitize Numbers to 10 with Ten Frames: Part I
// ============================================================================
export const lessonK67Blueprint: LessonBlueprint = {
  lessonId: "K-67",
  grade: "K",
  lessonNumber: 67,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-67"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-67"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة الخمسة في لمحة سريعة ثم اكتب العدد الموجود في المربع:",
          strategyHintAr:
            "انظر إلى الخانات الممتلئة واعرف العدد فوراً دون عدّ فردي.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame",
            candidateCounts: [3, 4],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة في لمحة سريعة ثم اكتب كم قرصاً موجوداً في المربع:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الكامل (٥) واجمع معه الأقراص الإضافية لمعرفة العدد فوراً.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "ten-frame",
            candidateCounts: [6, 7],
            cardCount: 2,
            reasoningPromptAr:
              "كيف تعرف العدد ٦ أو ٧ في لمحة واحدة على لوحة العشرة؟",
            reasoningAnswerAr:
              "نرى ٥ في الصفّ العلوي مع قرص واحد (٦) أو قرصين (٧) في الصفّ السفلي",
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى الأقراص على لوحة العشرة بالارتكاز على ٥ ثم اكتب العدد الكلّي:",
          strategyHintAr:
            "عدّ الأقراص بدءاً من ٥ في الصفّ العلوي لمعرفة العدد في لمحة سريعة.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "ten-frame",
            candidateCounts: [7, 8],
            cardCount: 2,
            reasoningPromptAr: "ما العدد الذي يمثّل ٥ في الأعلى و٣ في الأسفل؟",
            reasoningAnswerAr: "العدد هو ٨ (٥ و٣ يكوّنان معاً ٨)",
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى روابط الأعداد في المتاهة ثم حوّط الرابطة التي مجموعها ٩:",
          strategyHintAr:
            "انظر إلى دائرة الكلّ في أعلى كل رابطة عددية، وحوّط الرابطة التي تجمع ٩.",
          params: {
            subitizeMode: "number-bond-maze",
            targetTotal: 9,
            mazeBonds: [
              { part1: 5, part2: 4, total: 9 },
              { part1: 6, part2: 3, total: 9 },
              { part1: 7, part2: 2, total: 9 },
              { part1: 5, part2: 3, total: 8 },
              { part1: 6, part2: 4, total: 10 },
              { part1: 4, part2: 4, total: 8 },
            ],
            reasoningPromptAr:
              "ما الروابط العددية التي يبلغ مجموعها ٩ في المتاهة؟",
            reasoningAnswerAr: "الروابط هي: ٥ و٤، ٦ و٣، ٧ و٢",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة الخمسة في لمحة واحدة ثم اكتب العدد الموجود في المربع:",
          strategyHintAr:
            "انظر إلى الخانات الفارغة لتحديد العدد الموجود فوراً دون عدّ فردي.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "five-frame",
            candidateCounts: [4, 5],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة في لمحة سريعة ثم اكتب عدد الأقراص في المربع:",
          strategyHintAr:
            "انظر إلى الخانات الفارغة: إذا كانت خانتان فارغتين فالعدد ٨، وإذا كانت خانة واحدة فالعدد ٩.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "ten-frame",
            candidateCounts: [8, 9],
            cardCount: 2,
            reasoningPromptAr:
              "كيف تعرف فوراً أن العدد هو ٨ بملاحظة الخانات الفارغة؟",
            reasoningAnswerAr:
              "لأن لوحة العشرة تتسع لـ ١٠؛ وخانتان فارغتان تعنيان أن الموجود هو ٨",
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "عدّ الأقراص على لوحة العشرة بسرعة ثم اكتب العدد الكلّي في المربع:",
          strategyHintAr:
            "انظر إلى امتلاء لوحة العشرة بالكامل لمعرفة أن العدد هو ١٠ فوراً.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "ten-frame",
            candidateCounts: [7, 10],
            cardCount: 2,
            reasoningPromptAr:
              "ما العدد الذي يملأ جميع خانات لوحة العشرة بالكامل؟",
            reasoningAnswerAr:
              "العدد ١٠ يملأ جميع خانات لوحة العشرة دون أي خانة فارغة",
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى الأشكال المستوية على لوحة العشرة ثم اكتب كم شكلاً ينقص لإكمال ١٠:",
          strategyHintAr:
            "عدّ الخانات الفارغة على لوحة العشرة لمعرفة عدد الأشكال الناقصة لإكمال ١٠.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            cardCount: 2,
            cards: [
              { filledCount: 8, shapeId: "triangle", colorTheme: "sky" },
              { filledCount: 7, shapeId: "square", colorTheme: "amber" },
            ],
            reasoningPromptAr:
              "كم مثلثاً ينقص لإكمال ١٠ إذا كان الموجود ٨ مثلثات؟",
            reasoningAnswerAr: "ينقص مثلثان (٢) لأن ٨ و٢ يكوّنان معاً ١٠",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة في لمحة سريعة ثم اكتب العدد الموجود في المربع:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الممتلئ واعرف العدد الإجمالي فوراً.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "ten-frame",
            candidateCounts: [6, 8],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة وحدّد العدد في لمحة خاطفة ثم اكتبه في المربع:",
          strategyHintAr:
            "اجمع ٥ مع الجزء السفلي أو اطرح الخانات الفارغة من ١٠ لمعرفة العدد بدقة.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "ten-frame",
            candidateCounts: [7, 9],
            cardCount: 2,
            reasoningPromptAr:
              "ما العلاقة بين الخانات الفارغة والعدد الموجود على لوحة العشرة؟",
            reasoningAnswerAr:
              "الخانات الفارغة مع الأقراص الموجودة يكوّنان دائماً الكلّ ١٠",
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة في لمحة واحدة ثم اكتب العددين الموجودين:",
          strategyHintAr:
            "انظر إلى اللوحة الكاملة (١٠) أو اللوحة التي تنقص خانة واحدة (٩) واكتب العدد.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "ten-frame",
            candidateCounts: [9, 10],
            cardCount: 2,
            reasoningPromptAr: "بكم يزيد العدد ١٠ على العدد ٩ على لوحة العشرة؟",
            reasoningAnswerAr: "يزيد بمقدار قرص واحد (١٠ هو ١ أكثر من ٩)",
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى روابط الأعداد في المتاهة ثم حوّط كل رابطة مجموعها الكلّي ٩:",
          strategyHintAr:
            "انظر إلى العددين في الجزأين واجمعهما، وحوّط الرابطة إذا كان الكلّ ٩.",
          params: {
            subitizeMode: "number-bond-maze",
            targetTotal: 9,
            mazeBonds: [
              { part1: 8, part2: 1, total: 9 },
              { part1: 7, part2: 2, total: 9 },
              { part1: 6, part2: 3, total: 9 },
              { part1: 5, part2: 4, total: 9 },
              { part1: 7, part2: 3, total: 10 },
              { part1: 5, part2: 3, total: 8 },
            ],
            reasoningPromptAr:
              "اذكر جميع أزواج الأعداد التي يبلغ مجموعها ٩ في المتاهة:",
            reasoningAnswerAr: "الأزواج هي: (٨ و١)، (٧ و٢)، (٦ و٣)، (٥ و٤)",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK67Blueprint);

// ============================================================================
// Lesson K-68: Subitize Numbers to 10 with Ten Frames: Part II
// ============================================================================
export const lessonK68Blueprint: LessonBlueprint = {
  lessonId: "K-68",
  grade: "K",
  lessonNumber: 68,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-68"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-68"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة الخمسة في لمحة سريعة ثم اكتب كم موجوداً وكم فارغاً:",
          strategyHintAr:
            "انظر إلى الجزأين معاً لتكوين الكلّ ٥ واكتب العددين في المربعين.",
          params: {
            subitizeMode: "both-parts-to-5",
            visualKind: "five-frame",
            candidateCounts: [3, 4],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة ثم اكتب كم قرصاً موجوداً وكم قرصاً ينقص لإكمال ١٠:",
          strategyHintAr:
            "عدّ الأقراص الموجودة في المربع الأول، ثم عدّ الخانات الفارغة في المربع الثاني.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame",
            candidateCounts: [6, 7],
            cardCount: 2,
            reasoningPromptAr:
              "في البطاقة التي تضمّ ٦ أقراص، كم قرصاً ينقص لتكوين ١٠؟",
            reasoningAnswerAr: "ينقص ٤ أقراص لأن ٦ و٤ يكوّنان معاً الكلّ ١٠",
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى جزأي لوحة العشرة في لمحة سريعة ثم اكتب العددين لتكوين ١٠:",
          strategyHintAr:
            "انظر إلى الأقراص والخانات الفارغة معاً؛ الجزآن معاً يكوّنان دائماً الكلّ ١٠.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame",
            candidateCounts: [7, 8],
            cardCount: 2,
            reasoningPromptAr:
              "ما مكوّنات العدد ١٠ عندما يكون الجزء الموجود ٨؟",
            reasoningAnswerAr: "المكوّنات هي ٨ و٢ (٨ و٢ يكوّنان معاً ١٠)",
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "ارسم الدوائر الناقصة على لوحة العشرة ثم اكتب الأعداد في المربعات:",
          strategyHintAr:
            "ارسم الدوائر في الخانات المنقّطة لإكمال العشرة ثم اكتب العدد الموجود والعدد المرسوم.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-ghost",
            cardCount: 2,
            cards: [
              { filledCount: 7, colorTheme: "emerald" },
              { filledCount: 8, colorTheme: "violet" },
            ],
            reasoningPromptAr:
              "كم دائرة رسمت لإكمال لوحة العشرة في البطاقة الأولى؟",
            reasoningAnswerAr: "رسمت ٣ دوائر لأن ٧ و٣ يكوّنان معاً ١٠",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة في لمحة سريعة ثم اكتب العدد الموجود في المربع:",
          strategyHintAr:
            "انظر إلى الخمسة الكاملة في الصفّ العلوي واعرف العدد الموجود فوراً.",
          params: {
            subitizeMode: "identify-quantity",
            visualKind: "ten-frame",
            candidateCounts: [6, 8],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة ثم اكتب كم قرصاً موجوداً وكم ينقص لإكمال الكلّ ١٠:",
          strategyHintAr:
            "اجمع الجزء الموجود مع الجزء الفارغ لتتأكد دائماً أن الكلّ يساوي ١٠.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame",
            candidateCounts: [8, 9],
            cardCount: 2,
            reasoningPromptAr: "ما العدد الذي نضعه مع ٩ لنكوّن ١٠؟",
            reasoningAnswerAr: "نضع ١ لأن ٩ و١ يكوّنان معاً الكلّ ١٠",
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى جزأي لوحة العشرة بسرعة ثم اكتب العددين في المربعات المخصّصة:",
          strategyHintAr:
            "انظر إلى الخانات الفارغة لتكتب الجزء الثاني في لمحة واحدة.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame",
            candidateCounts: [6, 9],
            cardCount: 2,
            reasoningPromptAr:
              "اذكر طريقتين مختلفتين لتكوين العدد ١٠ من بطاقاتك:",
            reasoningAnswerAr: "٦ و٤ يكوّنان ١٠، وكذلك ٩ و١ يكوّنان ١٠",
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "ارسم الدوائر في الخانات الفارغة على لوحة العشرة ثم اكتب الأعداد في المربعات:",
          strategyHintAr:
            "ارسم الدوائر في الخانات الفارغة لتصل إلى ١٠ ثم اكتب مكوّنات العدد.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-ghost",
            cardCount: 2,
            cards: [
              { filledCount: 6, colorTheme: "coral" },
              { filledCount: 9, colorTheme: "sky" },
            ],
            reasoningPromptAr:
              "كم دائرة تحتاج لرسمها لإكمال ١٠ إذا كان في اللوحة ٦ دوائر؟",
            reasoningAnswerAr: "نحتاج لرسم ٤ دوائر لأن ٦ و٤ يكوّنان معاً ١٠",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة ثم اكتب كم موجوداً وكم ينقص لتكوين ١٠:",
          strategyHintAr:
            "انظر إلى الجزأين معاً واكتب عدد الأقراص وعدد الخانات الفارغة.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame",
            candidateCounts: [7, 8],
            cardCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة في لمحة واحدة ثم اكتب مكوّني العدد ١٠ بدقة:",
          strategyHintAr:
            "انظر إلى الجزأين معاً وحدّد مكوّنات العشرة بسرعة من خلال نمط اللوحة.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame",
            candidateCounts: [7, 9],
            cardCount: 2,
            reasoningPromptAr:
              "إذا كان الجزء الموجود ٧، فكم يكون الجزء الفارغ؟",
            reasoningAnswerAr: "الجزء الفارغ هو ٣ لأن ٧ و٣ يكوّنان معاً ١٠",
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى جزأي لوحة العشرة ثم اكتب كم موجوداً وكم ينقص لإكمال الكلّ ١٠:",
          strategyHintAr:
            "انظر إلى اللوحة الكاملة؛ هي تضمّ ١٠ أقراص ولا ينقصها أي قرص (صفر فارغ).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame",
            candidateCounts: [8, 10],
            cardCount: 2,
            reasoningPromptAr:
              "عندما تكون لوحة العشرة ممتلئة بالكامل (١٠)، كم قرصاً ينقصها؟",
            reasoningAnswerAr: "ينقصها صفر (٠) لأن ١٠ و٠ يكوّنان معاً ١٠",
          },
        },
      ],
      challenge: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى المجسّمات ثلاثية الأبعاد ثم اكتب كم مجسّماً ينقص لإكمال ١٠:",
          strategyHintAr:
            "عدّ المجسّمات المعروضة واطرحها من ١٠ لمعرفة كم مجسّماً ينقص لإكمال الكلّ.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            cardCount: 2,
            cards: [
              { filledCount: 8, solidId: "cube", colorTheme: "teal" },
              { filledCount: 9, solidId: "cylinder", colorTheme: "rose" },
            ],
            reasoningPromptAr:
              "كم أسطوانة تنقص لإكمال ١٠ إذا كان المعروض ٩ أسطوانات؟",
            reasoningAnswerAr:
              "تنقص أسطوانة واحدة (١) لأن ٩ و١ يكوّنان معاً ١٠",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK68Blueprint);
