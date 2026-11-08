import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";
import {
  createEverydayObjectSpec,
  getEverydayObjectById,
} from "@/visual-models/everyday-objects";
import { createShape2DSpec } from "@/visual-models/shapes-solids-coins";
import {
  createCircularArrangementSpec,
  createDicePatternSpec,
  createSnapCubesSpec,
  createTallyMarksSpec,
  createTenFrameSpec,
} from "@/visual-models/unit-2-models";

export const lessonK59Blueprint: LessonBlueprint = {
  lessonId: "K-59",
  grade: "K",
  lessonNumber: 59,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-59"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-59"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص على لوحة العشرة بدءاً من ٥ ثم اكتب العدد (٦، ٧):",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الكامل (٥) ثم عدّ الأقراص الإضافية في الصفّ السفلي واكتب الكلّ.",
          params: {
            modelKind: "ten-frame",
            targetNumbers: [6, 7],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص وانسخ النموذج على لوحة العشرة ثم اكتب العدد (٦، ٧، ٨):",
          strategyHintAr:
            "انظر إلى الخمسة الكاملة في الأعلى ثم عدّ الأقراص المنقّطة في الأسفل واكتب الرقم.",
          params: {
            modelKind: "ten-frame",
            itemCount: 2,
            items: [
              {
                targetNumber: 6,
                quantityModel: createTenFrameSpec({
                  count: 5,
                  ghostTargetCount: 1,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٥ و١ يساوي ٦",
              },
              {
                targetNumber: 7,
                quantityModel: createTenFrameSpec({
                  count: 5,
                  ghostTargetCount: 2,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٥ و٢ يساوي ٧",
              },
              {
                targetNumber: 8,
                quantityModel: createTenFrameSpec({
                  count: 5,
                  ghostTargetCount: 3,
                  colorTheme: "violet",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٥ و٣ يساوي ٨",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص ثنائية اللون على لوحة العشرة ثم اكتب العدد الكلّي:",
          strategyHintAr:
            "اجمع ٥ في الصفّ العلوي مع الجزء الثاني في الصفّ السفلي لتجد الكلّ.",
          params: {
            modelKind: "ten-frame",
            targetNumbers: [6, 7, 8],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأشكال المستوية في كل مجموعة ثم اكتب كم شكلاً في الكلّ:",
          strategyHintAr:
            "عدّ الخمسة الأولى ثم أكمل العدّ لمعرفة عدد الأشكال المستوية في الكلّ.",
          params: {
            modelKind: "ten-frame",
            itemCount: 2,
            items: [
              {
                targetNumber: 6,
                companionModel: createShape2DSpec("triangle", {
                  count: 5,
                  secondaryCount: 1,
                  colorTheme: "amber",
                  size: "small",
                }),
                quantityModel: createTenFrameSpec({
                  count: 5,
                  secondaryCount: 1,
                  colorTheme: "amber",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٥ مثلثات و١ مثلث يساوي ٦",
              },
              {
                targetNumber: 8,
                companionModel: createShape2DSpec("square", {
                  count: 5,
                  secondaryCount: 3,
                  colorTheme: "sky",
                  size: "small",
                }),
                quantityModel: createTenFrameSpec({
                  count: 5,
                  secondaryCount: 3,
                  colorTheme: "sky",
                  secondaryColorTheme: "coral",
                }),
                partWholeNoteAr: "٥ مربعات و٣ مربعات يساوي ٨",
              },
            ],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص على لوحة العشرة بالارتكاز على ٥ ثم اكتب العدد:",
          strategyHintAr:
            "انظر إلى ٥ في الصفّ العلوي ثم أضف أقراص الصفّ السفلي واكتب الكلّ.",
          params: {
            modelKind: "ten-frame",
            targetNumbers: [6, 7, 8],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص وانسخ النموذج على لوحة العشرة ثم اكتب الأعداد (٦ إلى ١٠):",
          strategyHintAr:
            "ارسم الأقراص المنقّطة في الصفّ السفلي انطلاقاً من ٥ ثم اكتب العدد.",
          params: {
            modelKind: "ten-frame",
            itemCount: 2,
            items: [
              {
                targetNumber: 7,
                quantityModel: createTenFrameSpec({
                  count: 5,
                  ghostTargetCount: 2,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٥ و٢ يساوي ٧",
              },
              {
                targetNumber: 9,
                quantityModel: createTenFrameSpec({
                  count: 5,
                  ghostTargetCount: 4,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٥ و٤ يساوي ٩",
              },
              {
                targetNumber: 10,
                quantityModel: createTenFrameSpec({
                  count: 5,
                  ghostTargetCount: 5,
                  colorTheme: "indigo",
                  secondaryColorTheme: "rose",
                }),
                partWholeNoteAr: "٥ و٥ يساوي ١٠",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى الجزأين على لوحة العشرة ثم اكتب العدد الذي يمثّل الكلّ:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الكامل (٥) والصفّ السفلي لتحديد العدد من ٦ إلى ١٠ فوراً.",
          params: {
            modelKind: "ten-frame",
            targetNumbers: [6, 8, 9, 10],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأشكال المستوية ومثّلها على لوحة العشرة ثم اكتب العدد الكلّي:",
          strategyHintAr:
            "اجمع ٥ أشكال مع الأشكال الإضافية ثم اكتب الرقم من ٦ إلى ١٠.",
          params: {
            modelKind: "ten-frame",
            itemCount: 2,
            items: [
              {
                targetNumber: 8,
                companionModel: createShape2DSpec("circle", {
                  count: 5,
                  secondaryCount: 3,
                  colorTheme: "coral",
                  size: "small",
                }),
                quantityModel: createTenFrameSpec({
                  count: 5,
                  secondaryCount: 3,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٥ دوائر و٣ دوائر يساوي ٨",
              },
              {
                targetNumber: 9,
                companionModel: createShape2DSpec("hexagon", {
                  count: 5,
                  secondaryCount: 4,
                  colorTheme: "rose",
                  size: "small",
                }),
                quantityModel: createTenFrameSpec({
                  count: 5,
                  secondaryCount: 4,
                  colorTheme: "rose",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٥ سداسيات و٤ سداسيات يساوي ٩",
              },
            ],
            comparisonPromptAr:
              "كيف نمثّل العدد ٨ على لوحة العشرة بالارتكاز على ٥؟",
            comparisonAnswerAr: "٥ في الصفّ العلوي و٣ في الصفّ السفلي يساوي ٨",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى لوحة العشرة وحدّد الجزأين ثم اكتب العدد (٨، ٩، ١٠):",
          strategyHintAr:
            "انظر إلى بنية الخمسة في الصفّ العلوي لمعرفة الكلّ بسرعة.",
          params: {
            modelKind: "ten-frame",
            targetNumbers: [8, 9, 10],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى التوزيع غير المعتاد للأقراص على لوحة العشرة ثم اكتب الكلّ:",
          strategyHintAr:
            "اجمع أقراص الصفّ العلوي مع أقراص الصفّ السفلي (مثل ٤ و٤ يساوي ٨، و٣ و٥ يساوي ٨).",
          params: {
            modelKind: "ten-frame",
            itemCount: 2,
            items: [
              {
                targetNumber: 8,
                topRowCount: 4,
                bottomRowCount: 4,
                colorTheme: "sky",
                partWholeNoteAr: "٤ في الأعلى و٤ في الأسفل يساوي ٨",
              },
              {
                targetNumber: 8,
                topRowCount: 3,
                bottomRowCount: 5,
                colorTheme: "violet",
                partWholeNoteAr: "٣ في الأعلى و٥ في الأسفل يساوي ٨",
              },
              {
                targetNumber: 9,
                topRowCount: 4,
                bottomRowCount: 5,
                colorTheme: "emerald",
                partWholeNoteAr: "٤ في الأعلى و٥ في الأسفل يساوي ٩",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "ارسم الأقراص المنقّطة على لوحة العشرة ثم اكتب الأعداد (٨، ٩، ١٠):",
          strategyHintAr:
            "عدّ الأقراص الموجودة وأكمل رسم الأقراص المنقّطة للوصول إلى الكلّ.",
          params: {
            modelKind: "ten-frame",
            itemCount: 2,
            items: [
              {
                targetNumber: 9,
                quantityModel: createTenFrameSpec({
                  count: 5,
                  ghostTargetCount: 4,
                  colorTheme: "coral",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٥ و٤ يساوي ٩",
              },
              {
                targetNumber: 10,
                quantityModel: createTenFrameSpec({
                  count: 5,
                  ghostTargetCount: 5,
                  colorTheme: "indigo",
                  secondaryColorTheme: "emerald",
                }),
                partWholeNoteAr: "٥ و٥ يساوي ١٠ (لوحة عشرة كاملة)",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأشكال المستوية واكتب العدد ثم قارن بين طريقتي تمثيل ٨:",
          strategyHintAr:
            "اجمع الأجزاء في كل حالة (٥ و٣ أو ٤ و٤) لتتأكد أن الكلّ ٨.",
          params: {
            modelKind: "ten-frame",
            itemCount: 2,
            items: [
              {
                targetNumber: 8,
                topRowCount: 4,
                bottomRowCount: 4,
                colorTheme: "amber",
                partWholeNoteAr: "٤ و٤ يساوي ٨",
              },
              {
                targetNumber: 10,
                topRowCount: 5,
                bottomRowCount: 5,
                colorTheme: "teal",
                partWholeNoteAr: "٥ و٥ يساوي ١٠",
              },
            ],
            comparisonPromptAr:
              "إذا مثّلنا ٨ بـ (٥ و٣) أو بـ (٤ و٤) على لوحة العشرة، فهل يتغيّر الكلّ؟",
            comparisonAnswerAr: "لا يتغيّر الكلّ؛ في الحالتين الكلّ يساوي ٨",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK59Blueprint);

export const lessonK60Blueprint: LessonBlueprint = {
  lessonId: "K-60",
  grade: "K",
  lessonNumber: 60,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-60"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-60"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ قطار المكعبات المتداخلة بدءاً من وحدة الخمسة ثم اكتب العدد (٦، ٧):",
          strategyHintAr:
            "انظر إلى وحدة الخمسة أولاً ثم أضف المكعبات بلون الجزء الثاني واكتب الكلّ.",
          params: {
            modelKind: "snap-cubes",
            targetNumbers: [6, 7],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ المكعبات المتداخلة (٥ وبعض آخر) ثم تتبّع الرقم واكتبه (٦، ٧، ٨):",
          strategyHintAr:
            "انظر إلى وحدة الخمسة على اليمين والجزء الثاني على اليسار ثم اكتب العدد.",
          params: {
            modelKind: "snap-cubes",
            targetNumbers: [6, 7, 8],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى مجموعتي المكعبات المفصولتين ثم اكتب العدد الكلّي:",
          strategyHintAr:
            "اجمع وحدة الخمسة مع المكعبات الإضافية لتعرف كم مكعباً في الكلّ.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 2,
            items: [
              {
                targetNumber: 6,
                quantityModel: createSnapCubesSpec({
                  count: 5,
                  secondaryCount: 1,
                  separated: true,
                  compact: true,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "وحدة من ٥ ووحدة من ١ يساوي ٦",
              },
              {
                targetNumber: 8,
                quantityModel: createSnapCubesSpec({
                  count: 5,
                  secondaryCount: 3,
                  separated: true,
                  compact: true,
                  colorTheme: "sky",
                  secondaryColorTheme: "coral",
                }),
                partWholeNoteAr: "وحدة من ٥ ووحدة من ٣ يساوي ٨",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ المكعبات المتداخلة في كل قطار ثم اكتب كم مكعباً في الكلّ:",
          strategyHintAr: "عدّ بدءاً من وحدة الخمسة ثم أضف المكعبات المتبقية.",
          params: {
            modelKind: "snap-cubes",
            targetNumbers: [7, 8],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ المكعبات المتداخلة بالارتكاز على ٥ ثم اكتب العدد (٦، ٧، ٨):",
          strategyHintAr: "اجمع وحدة الخمسة مع الجزء الثاني لتجد الكلّ.",
          params: {
            modelKind: "snap-cubes",
            targetNumbers: [6, 7, 8],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ وحدات المكعبات المتداخلة ثم تتبّع الأرقام واكتبها (٦ إلى ١٠):",
          strategyHintAr:
            "انظر إلى وحدة الخمسة والوحدة الأصغر التي تكمّلها ثم اكتب الكلّ.",
          params: {
            modelKind: "snap-cubes",
            targetNumbers: [6, 7, 8, 9, 10],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى قطاري المكعبات (٥ وبعض آخر) ثم اكتب العدد الكلّي:",
          strategyHintAr: "اجمع ٥ و٤ لتحصل على ٩، واجمع ٥ و٥ لتحصل على ١٠.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 2,
            items: [
              {
                targetNumber: 9,
                quantityModel: createSnapCubesSpec({
                  count: 5,
                  secondaryCount: 4,
                  separated: true,
                  compact: true,
                  colorTheme: "violet",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "وحدة من ٥ ووحدة من ٤ يساوي ٩",
              },
              {
                targetNumber: 10,
                quantityModel: createSnapCubesSpec({
                  count: 5,
                  secondaryCount: 5,
                  separated: true,
                  compact: true,
                  colorTheme: "emerald",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "وحدتان من ٥ تساويان ١٠",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ المكعبات المتداخلة واكتب العدد ثم أجب عن سؤال التفكير:",
          strategyHintAr:
            "اجمع وحدتين متساويتين كلّ منهما ٥ مكعبات لتكوين العدد ١٠.",
          params: {
            modelKind: "snap-cubes",
            targetNumbers: [8, 10],
            itemCount: 2,
            showPartWholeBreakdown: true,
            comparisonPromptAr:
              "كم وحدة من ٥ مكعبات نحتاج إليها لتكوين ١٠ مكعبات في الكلّ؟",
            comparisonAnswerAr: "وحدتان من ٥ مكعبات (٥ و٥ يساوي ١٠)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى قطارات المكعبات المتداخلة ثم اكتب العدد (٨، ٩، ١٠):",
          strategyHintAr:
            "اجمع وحدة الخمسة مع الجزء الثاني دون العدّ واحداً بواحد.",
          params: {
            modelKind: "snap-cubes",
            targetNumbers: [8, 9, 10],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ وحدات المكعبات المتداخلة وتتبّع الأرقام ثم اكتبها (٧ إلى ١٠):",
          strategyHintAr:
            "انظر إلى تركيب كل عدد بوصفه ٥ وبعضاً آخر ثم اكتب الرقم بخطّ واضح.",
          params: {
            modelKind: "snap-cubes",
            targetNumbers: [7, 8, 9, 10],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى تمثيل المكعبات المتداخلة بطرائق مختلفة ثم اكتب الكلّ:",
          strategyHintAr:
            "اجمع الجزأين في كل قطار مكعبات لتحدّد العدد الكلّي بدقة.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 2,
            items: [
              {
                targetNumber: 8,
                quantityModel: createSnapCubesSpec({
                  count: 4,
                  secondaryCount: 4,
                  separated: true,
                  compact: true,
                  colorTheme: "sky",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "وحدتان من ٤ تساويان ٨",
              },
              {
                targetNumber: 10,
                quantityModel: createSnapCubesSpec({
                  count: 5,
                  secondaryCount: 5,
                  separated: true,
                  compact: true,
                  colorTheme: "coral",
                  secondaryColorTheme: "emerald",
                }),
                partWholeNoteAr: "وحدتان من ٥ تساويان ١٠",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ المكعبات المتداخلة واكتب الكلّ ثم اشرح علاقة الأجزاء بالكلّ:",
          strategyHintAr:
            "اجمع وحدة الخمسة مع وحدة الثلاثة أو الأربعة لمعرفة الكلّ.",
          params: {
            modelKind: "snap-cubes",
            targetNumbers: [9, 10],
            itemCount: 2,
            showPartWholeBreakdown: true,
            comparisonPromptAr:
              "إذا كان لدينا وحدة من ٥ مكعبات ووحدة من ٣ مكعبات، فكم مكعباً في الكلّ؟",
            comparisonAnswerAr: "٨ مكعبات في الكلّ (٥ و٣ يساوي ٨)",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK60Blueprint);

export const lessonK61Blueprint: LessonBlueprint = {
  lessonId: "K-61",
  grade: "K",
  lessonNumber: 61,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-61"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-61"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ علامات العدّ بالارتكاز على الحزمة الخماسية ثم اكتب العدد (٦، ٧):",
          strategyHintAr:
            "انظر إلى الحزمة الخماسية (٥) ثم عدّ الخطوط التي بعدها واكتب الكلّ.",
          params: {
            modelKind: "tally-marks",
            targetNumbers: [6, 7],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ نقاط النرد (٥ وبعض آخر) ثم تتبّع الرقم واكتبه (٦، ٧، ٨):",
          strategyHintAr:
            "انظر إلى النرد الأيمن (٥ نقاط) ثم أضف نقاط النرد الأيسر واكتب الكلّ.",
          params: {
            modelKind: "dice-pattern",
            targetNumbers: [6, 7, 8],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ العناصر المرتّبة في دائرة بدءاً من السهم الأخضر ثم اكتب العدد:",
          strategyHintAr:
            "انظر إلى العناصر الخمسة الأولى ثم أكمل العدّ حول الدائرة دون تكرار.",
          params: {
            modelKind: "circular-arrangement",
            targetNumbers: [6, 7, 8],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ العناصر في كل نموذج ثم اكتب كم في الكلّ:",
          strategyHintAr:
            "عدّ بدءاً من الخمسة الأولى في كل نموذج ثم أضف الباقي لتجد الكلّ.",
          params: {
            modelKind: "tally-marks",
            targetNumbers: [7, 8],
            itemCount: 2,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ علامات العدّ ونقاط النرد بالارتكاز على ٥ ثم اكتب العدد:",
          strategyHintAr:
            "عدّ انطلاقاً من الحزمة الخماسية (٥) ثم أضف العلامات الإضافية.",
          params: {
            modelKind: "tally-marks",
            targetNumbers: [6, 7, 8],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ علامات العدّ (حزمة خماسية وبعض آخر) ثم تتبّع الرقم واكتبه (٦ إلى ١٠):",
          strategyHintAr:
            "انظر إلى الحزمة الخماسية (٥) ثم اجمع معها الخطوط الإضافية لمعرفة الكلّ.",
          params: {
            modelKind: "tally-marks",
            targetNumbers: [6, 7, 8, 9, 10],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ نقاط النرد والترتيب الدائري بالارتكاز على ٥ ثم اكتب العدد الكلّي:",
          strategyHintAr:
            "اجمع ٥ مع الجزء الثاني لمعرفة العدد من ٦ إلى ١٠ بسرعة.",
          params: {
            modelKind: "dice-pattern",
            itemCount: 2,
            items: [
              {
                targetNumber: 8,
                quantityModel: createDicePatternSpec({
                  count: 5,
                  secondaryCount: 3,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٥ و٣ يساوي ٨",
              },
              {
                targetNumber: 9,
                quantityModel: createCircularArrangementSpec({
                  count: 5,
                  secondaryCount: 4,
                  colorTheme: "violet",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٥ و٤ يساوي ٩",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ العناصر في النماذج البديلة واكتب الكلّ ثم أجب عن السؤال:",
          strategyHintAr:
            "انظر إلى الخمسة الأولى في علامات العدّ والنرد والدائرة لمعرفة الكلّ فوراً.",
          params: {
            modelKind: "circular-arrangement",
            targetNumbers: [8, 10],
            itemCount: 2,
            showPartWholeBreakdown: true,
            comparisonPromptAr:
              "كم يساوي مجموع حزمة خماسية من علامات العدّ مع ٤ علامات إضافية؟",
            comparisonAnswerAr: "٩ في الكلّ (٥ و٤ يساوي ٩)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى نقاط النرد وعلامات العدّ ثم اكتب العدد (٨، ٩، ١٠):",
          strategyHintAr:
            "انظر إلى الخمسة الأولى في لمحة واحدة ثم أضف الجزء الثاني.",
          params: {
            modelKind: "dice-pattern",
            targetNumbers: [8, 9, 10],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ العناصر في الترتيب الدائري وعلامات العدّ ثم اكتب الأعداد (٧ إلى ١٠):",
          strategyHintAr:
            "اجمع الجزء الأوّل (٥) مع الجزء الثاني لتحديد العدد الكلّي دون عدّ فردي بطيء.",
          params: {
            modelKind: "circular-arrangement",
            targetNumbers: [7, 8, 9, 10],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى النماذج البديلة للأعداد (٨، ٩، ١٠) ثم تتبّع الرقم واكتبه:",
          strategyHintAr:
            "عدّ حزمتين خماسيتين لتحصل على ١٠، واجمع ٥ مع ٤ لتحصل على ٩.",
          params: {
            modelKind: "tally-marks",
            itemCount: 2,
            items: [
              {
                targetNumber: 9,
                quantityModel: createTallyMarksSpec({
                  count: 9,
                  compact: true,
                  colorTheme: "amber",
                }),
                partWholeNoteAr: "٥ و٤ يساوي ٩",
              },
              {
                targetNumber: 10,
                quantityModel: createTallyMarksSpec({
                  count: 10,
                  compact: true,
                  colorTheme: "emerald",
                }),
                partWholeNoteAr: "٥ و٥ يساوي ١٠",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ العناصر واكتب الكلّ ثم اشرح كيف يساعدنا الارتكاز على ٥:",
          strategyHintAr:
            "اجمع الجزء الأوّل (٥) مع الجزء الثاني لمعرفة الكلّ بسرعة.",
          params: {
            modelKind: "dice-pattern",
            targetNumbers: [9, 10],
            itemCount: 2,
            showPartWholeBreakdown: true,
            comparisonPromptAr:
              "كيف نعرف بسرعة أن حزمتين خماسيتين من علامات العدّ تساويان ١٠؟",
            comparisonAnswerAr: "لأن كل حزمة خماسية تساوي ٥، و٥ و٥ يساوي ١٠",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK61Blueprint);

export const lessonK62Blueprint: LessonBlueprint = {
  lessonId: "K-62",
  grade: "K",
  lessonNumber: 62,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-62"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-62"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص على لوحة العشرة بدءاً من ٥ ثم اكتب العدد (٦، ٧):",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الكامل (٥) ثم عدّ الأقراص في الصفّ السفلي واكتب الكلّ.",
          params: {
            modelKind: "ten-frame",
            targetNumbers: [6, 7],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص في كل لوحة عشرة ثم اختر الرقم الصحيح واكتبه (٦، ٧، ٨):",
          strategyHintAr:
            "انظر إلى لوحة العشرة ثم اختر الرقم الذي يمثّل الكمية الحقيقية.",
          params: {
            modelKind: "ten-frame",
            responseStyle: "quantify-compare-choice",
            targetNumbers: [6, 7, 8],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى لوحة العشرة وعدّ بدءاً من ٥ ثم اختر الرقم المطابق واكتبه:",
          strategyHintAr:
            "انظر إلى الفرق بين العدد الحقيقي والعدد الذي يزيد أو ينقص بمقدار ١.",
          params: {
            modelKind: "ten-frame",
            responseStyle: "quantify-compare-choice",
            itemCount: 2,
            items: [
              {
                targetNumber: 6,
                choiceNumbers: [5, 6, 7],
                colorTheme: "coral",
                secondaryCount: 1,
                partWholeNoteAr: "٥ و١ يساوي ٦ (وليس ٥ أو ٧)",
              },
              {
                targetNumber: 8,
                choiceNumbers: [7, 8, 9],
                colorTheme: "sky",
                secondaryCount: 3,
                partWholeNoteAr: "٥ و٣ يساوي ٨ (وليس ٧ أو ٩)",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ عناصر الطعام ومثّلها على لوحة العشرة ثم اكتب العدد:",
          strategyHintAr:
            "عدّ الخمسة الأولى ثم أضف الباقي لتعرف كم قطعة طعام في الكلّ.",
          params: {
            modelKind: "ten-frame",
            itemCount: 2,
            items: [
              {
                targetNumber: 6,
                companionModel: createEverydayObjectSpec(
                  getEverydayObjectById("apple"),
                  { count: 6, size: "small" }
                ),
                colorTheme: "coral",
                secondaryCount: 1,
                partWholeNoteAr: "٥ تفاحات و١ تفاحة يساوي ٦",
              },
              {
                targetNumber: 7,
                companionModel: createEverydayObjectSpec(
                  getEverydayObjectById("banana"),
                  { count: 7, size: "small" }
                ),
                colorTheme: "amber",
                secondaryCount: 2,
                partWholeNoteAr: "٥ موزات و٢ موزة يساوي ٧",
              },
            ],
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص على لوحة العشرة ثم اختر الرقم الصحيح واكتبه (٦، ٧، ٨):",
          strategyHintAr:
            "عدّ من ٥ في الصفّ العلوي ثم أضف الصفّ السفلي لتحدّد الرقم الصحيح.",
          params: {
            modelKind: "ten-frame",
            responseStyle: "quantify-compare-choice",
            targetNumbers: [6, 7, 8],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص في كل لوحة عشرة ثم اختر الرقم الذي يخبرنا كم العدد واكتبه:",
          strategyHintAr:
            "اختر العدد المطابق للوحة العشرة واستبعد العدد الذي يقلّ أو يزيد بواحد.",
          params: {
            modelKind: "ten-frame",
            responseStyle: "quantify-compare-choice",
            targetNumbers: [6, 7, 8, 9, 10],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "لوّن الأقراص المنقّطة لإكمال لوحة العشرة ثم اختر الرقم الصحيح واكتبه:",
          strategyHintAr:
            "لوّن الأقراص المنقّطة ثم عدّ من ٥ لتكتب الرقم الذي يمثّل الكلّ.",
          params: {
            modelKind: "ten-frame",
            responseStyle: "quantify-compare-choice",
            itemCount: 2,
            items: [
              {
                targetNumber: 7,
                choiceNumbers: [6, 7, 8],
                quantityModel: createTenFrameSpec({
                  count: 5,
                  ghostTargetCount: 2,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٥ و٢ يساوي ٧",
              },
              {
                targetNumber: 9,
                choiceNumbers: [8, 9, 10],
                quantityModel: createTenFrameSpec({
                  count: 5,
                  ghostTargetCount: 4,
                  colorTheme: "violet",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٥ و٤ يساوي ٩",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ عناصر الطعام على لوحة العشرة واكتب العدد ثم أجب عن السؤال:",
          strategyHintAr:
            "انظر إلى الكمية الحقيقية وقارنها بالكميات التي تزيد أو تنقص بمقدار ١ أو ٢.",
          params: {
            modelKind: "ten-frame",
            responseStyle: "quantify-compare-choice",
            itemCount: 2,
            items: [
              {
                targetNumber: 8,
                choiceNumbers: [6, 8, 10],
                companionModel: createEverydayObjectSpec(
                  getEverydayObjectById("strawberry"),
                  { count: 8, size: "small" }
                ),
                colorTheme: "rose",
                secondaryCount: 3,
                partWholeNoteAr: "٥ و٣ يساوي ٨ حبات فراولة",
              },
              {
                targetNumber: 9,
                choiceNumbers: [7, 8, 9],
                companionModel: createEverydayObjectSpec(
                  getEverydayObjectById("orange"),
                  { count: 9, size: "small" }
                ),
                colorTheme: "amber",
                secondaryCount: 4,
                partWholeNoteAr: "٥ و٤ يساوي ٩ برتقالات",
              },
            ],
            comparisonPromptAr:
              "إذا كان على لوحة العشرة ٨ أقراص، فما العدد الذي يزيد عليها بمقدار ١ وما العدد الذي يقلّ عنها بمقدار ١؟",
            comparisonAnswerAr:
              "العدد ٩ يزيد عليها بـ ١، والعدد ٧ يقلّ عنها بـ ١",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "انظر إلى لوحة العشرة واختر الرقم المطابق للكمية ثم اكتبه (٨، ٩، ١٠):",
          strategyHintAr:
            "انظر إلى الخانات المملوءة والخانات الفارغة لتحديد العدد الصحيح فوراً.",
          params: {
            modelKind: "ten-frame",
            responseStyle: "quantify-compare-choice",
            targetNumbers: [8, 9, 10],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص على لوحة العشرة وقارن بالخيارات التي تختلف بمقدار ١ أو ٢ ثم اكتب العدد:",
          strategyHintAr:
            "عدّ الأقراص في الصفّين العلوي والسفلي ثم اختر الرقم المطابق.",
          params: {
            modelKind: "ten-frame",
            responseStyle: "quantify-compare-choice",
            itemCount: 2,
            items: [
              {
                targetNumber: 8,
                choiceNumbers: [6, 8, 10],
                colorTheme: "sky",
                secondaryCount: 3,
                partWholeNoteAr: "٨ هي ٢ أكثر من ٦ و٢ أقل من ١٠",
              },
              {
                targetNumber: 9,
                choiceNumbers: [7, 9, 10],
                colorTheme: "coral",
                secondaryCount: 4,
                partWholeNoteAr: "٩ هي ٢ أكثر من ٧ و١ أقل من ١٠",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "لوّن الأشكال على لوحة العشرة ثم اختر الرقم الذي يمثّل الكلّ واكتبه:",
          strategyHintAr:
            "لوّن الأقراص المنقّطة ثم اختر الرقم الصحيح من بين الأعداد الثلاثة.",
          params: {
            modelKind: "ten-frame",
            responseStyle: "quantify-compare-choice",
            itemCount: 2,
            items: [
              {
                targetNumber: 8,
                choiceNumbers: [7, 8, 9],
                quantityModel: createTenFrameSpec({
                  count: 5,
                  ghostTargetCount: 3,
                  colorTheme: "amber",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٥ و٣ يساوي ٨",
              },
              {
                targetNumber: 10,
                choiceNumbers: [8, 9, 10],
                quantityModel: createTenFrameSpec({
                  count: 5,
                  ghostTargetCount: 5,
                  colorTheme: "indigo",
                  secondaryColorTheme: "emerald",
                }),
                partWholeNoteAr: "٥ و٥ يساوي ١٠",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ عناصر الطعام واختر العدد الصحيح ثم أجب عن سؤال المقارنة:",
          strategyHintAr:
            "انظر إلى بنية لوحة العشرة لمعرفة كم يزيد العدد أو يقلّ عن ١٠.",
          params: {
            modelKind: "ten-frame",
            responseStyle: "quantify-compare-choice",
            itemCount: 2,
            items: [
              {
                targetNumber: 8,
                choiceNumbers: [6, 8, 9],
                companionModel: createEverydayObjectSpec(
                  getEverydayObjectById("cupcake"),
                  { count: 8, size: "small" }
                ),
                colorTheme: "violet",
                secondaryCount: 3,
                partWholeNoteAr: "٥ و٣ يساوي ٨ كعكات",
              },
              {
                targetNumber: 10,
                choiceNumbers: [8, 9, 10],
                companionModel: createEverydayObjectSpec(
                  getEverydayObjectById("apple"),
                  { count: 10, size: "small" }
                ),
                colorTheme: "emerald",
                secondaryCount: 5,
                partWholeNoteAr: "٥ و٥ يساوي ١٠ تفاحات",
              },
            ],
            comparisonPromptAr:
              "ما العدد الذي يقلّ بمقدار ٢ عن ١٠ على لوحة العشرة؟",
            comparisonAnswerAr:
              "العدد ٨ يقلّ بمقدار ٢ عن ١٠ (تبقى خانتان فارغتان)",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK62Blueprint);
