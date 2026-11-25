import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";
import {
  createEverydayObjectSpec,
  getEverydayObjectById,
} from "@/visual-models/everyday-objects";
import {
  createCoinSpec,
  createShape2DSpec,
  createSolid3DSpec,
} from "@/visual-models/shapes-solids-coins";
import {
  createCircularArrangementSpec,
  createDicePatternSpec,
  createDigitCardSpec,
  createFiveFrameSpec,
  createNumeralTraceSpec,
  createSnapCubesSpec,
  createTallyMarksSpec,
} from "@/visual-models/unit-2-models";

export const lessonK12Blueprint: LessonBlueprint = {
  lessonId: "K-12",
  grade: "K",
  lessonNumber: 12,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-12"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-12"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: وزّع لوحات الخمسة الفارغة وأقراص العدّ ذات الوجهين، واطلب من الطلاب وضع الأقراص واحداً تلو الآخر من اليمين إلى اليسار ونطق الكلّ عند الانتهاء.",
    commonMisconceptionsAr: [
      "الاعتقاد بأن العدد الأخير الذي ينطقه الطالب يمثّل القرص الأخير فقط بدلاً من تمثيل المجموعة كاملة (مبدأ القيمة الكلية للعدّ).",
      "البدء بملء لوحة الخمسة من اليسار أو بشكل عشوائي بدلاً من الترتيب المنظّم من اليمين إلى اليسار.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص الملوّنة من اليمين إلى اليسار ثم تتبّع الرقم المنقّط (١، ٢):",
          strategyHintAr:
            "ضع إصبعك على كل قرص في لوحة الخمسة بدءاً من الخانة الأولى في اليمين، ثم تتبّع الرقم من النقطة الخضراء باتجاه السهم.",
          params: {
            modelKind: "five-frame",
            itemCount: 2,
            items: [
              {
                targetNumber: 1,
                quantityModel: createFiveFrameSpec({
                  count: 1,
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "قرص واحد في الخانة الأولى من اليمين (١)",
              },
              {
                targetNumber: 2,
                quantityModel: createFiveFrameSpec({
                  count: 2,
                  colorTheme: "sky",
                }),
                partWholeNoteAr: "قرصان متجاوران من اليمين (٢)",
              },
              {
                targetNumber: 3,
                quantityModel: createFiveFrameSpec({
                  count: 3,
                  colorTheme: "emerald",
                }),
                partWholeNoteAr: "٣ أقراص متتالية من اليمين",
              },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص على كل لوحة خمسة (من اليمين إلى اليسار) وتتبّع الرقم الذي يمثّل المجموعة كلها:",
          strategyHintAr:
            "تذكّر أن آخر عدد تنطقه عند العدّ هو عدد جميع الأقراص على لوحة الخمسة.",
          params: {
            modelKind: "five-frame",
            targetNumbers: [1, 2, 3],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "لاحظ عدد الأقراص والخانات الفارغة على لوحة الخمسة، ثم تتبّع الرقم واكتبه:",
          strategyHintAr:
            "على لوحة الخمسة: ٣ أقراص تترك خانتين فارغتين، و٤ أقراص تترك خانة واحدة فارغة.",
          params: {
            modelKind: "five-frame",
            targetNumbers: [2, 3, 4],
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ الأقراص وتتبّع الرقم ثم أجب عن سؤال المفهوم:",
          strategyHintAr:
            "العدد الأخير الذي ننطقه عند العدّ يصف المجموعة بأكملها وليس القرص الأخير وحده.",
          params: {
            modelKind: "five-frame",
            targetNumbers: [3, 5],
            itemCount: 2,
            comparisonPromptAr:
              "عندما نعدّ ٤ أقراص على لوحة الخمسة (١، ٢، ٣، ٤)، فهل الرقم ٤ يدلّ على القرص الأخير فقط أم على جميع الأقراص الأربعة معاً؟",
            comparisonAnswerAr:
              "الرقم ٤ يدلّ على المجموعة كلها (جميع الأقراص الأربعة معاً)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص على لوحة الخمسة من اليمين إلى اليسار وتتبّع الأرقام (١، ٢، ٣):",
          strategyHintAr:
            "استخدم التقابل واحداً لواحد بين كل قرص والعدد الذي تنطقه.",
          params: {
            modelKind: "five-frame",
            targetNumbers: [1, 2, 3],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ الأقراص ثنائية اللون على لوحة الخمسة وتتبّع الرقم الذي يمثّل الكل:",
          strategyHintAr:
            "لاحظ كيف يجتمع اللونان معاً على لوحة الخمسة لتكوين الكلّ.",
          params: {
            modelKind: "five-frame",
            targetNumbers: [2, 3, 4, 5],
            itemCount: 3,
            showPartWholeBreakdown: true,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "مثّل الأعداد على لوحة الخمسة بإكمال الأقراص المنقّطة ثم تتبّع الرقم واكتبه:",
          strategyHintAr:
            "ابدأ من الأقراص الموجودة في اليمين وأكمل رسم الأقراص المنقّطة للوصول إلى العدد المستهدف.",
          params: {
            modelKind: "five-frame",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                quantityModel: createFiveFrameSpec({
                  count: 2,
                  ghostTargetCount: 1,
                  colorTheme: "emerald",
                }),
                partWholeNoteAr: "٢ و١ نرسمه يساوي ٣",
              },
              {
                targetNumber: 4,
                quantityModel: createFiveFrameSpec({
                  count: 2,
                  ghostTargetCount: 2,
                  colorTheme: "amber",
                }),
                partWholeNoteAr: "٢ و٢ نرسمهما يساوي ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createFiveFrameSpec({
                  count: 4,
                  ghostTargetCount: 1,
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "٤ و١ نرسمه يملأ لوحة الخمسة (٥)",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ الأقراص وتتبّع الرقم ثم قارن الخانات:",
          strategyHintAr:
            "في لوحة الخمسة: عدد الأقراص المملوءة + عدد الخانات الفارغة يساوي دائماً ٥.",
          params: {
            modelKind: "five-frame",
            targetNumbers: [4, 5],
            itemCount: 2,
            showPartWholeBreakdown: true,
            comparisonPromptAr:
              "إذا كان على لوحة الخمسة ٤ أقراص، فكم خانة فارغة تتبقّى لإكمال ٥؟",
            comparisonAnswerAr: "تتبقّى خانة فارغة واحدة (١)، لأن ٤ و١ يساوي ٥",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ الأقراص ثنائية اللون على لوحة الخمسة وتتبّع الأرقام:",
          strategyHintAr:
            "لاحظ الأجزاء المحدّدة بالإطار المنقّط وكيف تكوّن الكلّ.",
          params: {
            modelKind: "five-frame",
            targetNumbers: [3, 4, 5],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "حلّل الأجزاء ثنائية اللون على لوحة الخمسة وتتبّع الأرقام واكتبها:",
          strategyHintAr:
            "اجمع الجزء الأول (يمين) مع الجزء الثاني (يسار) لتعرف الكلّ على لوحة الخمسة.",
          params: {
            modelKind: "five-frame",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                quantityModel: createFiveFrameSpec({
                  count: 2,
                  secondaryCount: 1,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                  showPartOutline: true,
                }),
                partWholeNoteAr: "٢ أحمر و١ أزرق يساوي ٣",
              },
              {
                targetNumber: 4,
                quantityModel: createFiveFrameSpec({
                  count: 2,
                  secondaryCount: 2,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                  showPartOutline: true,
                }),
                partWholeNoteAr: "٢ أخضر و٢ أصفر يساوي ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createFiveFrameSpec({
                  count: 3,
                  secondaryCount: 2,
                  colorTheme: "violet",
                  secondaryColorTheme: "rose",
                  showPartOutline: true,
                }),
                partWholeNoteAr: "٣ بنفسجي و٢ وردي يساوي ٥",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "أكمل رسم الأقراص الناقصة على لوحة الخمسة وتتبّع الرقم واكتبه من ذاكرتك:",
          strategyHintAr:
            "عدّ الخانات المملوءة ثم أضف الأقراص المنقّطة حتى تصل إلى العدد المستهدف.",
          params: {
            modelKind: "five-frame",
            itemCount: 3,
            items: [
              {
                targetNumber: 2,
                quantityModel: createFiveFrameSpec({
                  count: 1,
                  ghostTargetCount: 1,
                  colorTheme: "sky",
                }),
                partWholeNoteAr: "١ و١ نرسمه يساوي ٢",
              },
              {
                targetNumber: 4,
                quantityModel: createFiveFrameSpec({
                  count: 2,
                  ghostTargetCount: 2,
                  colorTheme: "teal",
                }),
                partWholeNoteAr: "٢ و٢ نرسمهما يساوي ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createFiveFrameSpec({
                  count: 3,
                  ghostTargetCount: 2,
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "٣ و٢ نرسمهما يساوي ٥",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "مثّل الأعداد (٠، ٣، ٥) على لوحة الخمسة وتتبّع الأرقام ثم قارن:",
          strategyHintAr:
            "عند شطب جميع الأقراص يتبقّى صفر (٠)، وعند وجود ٣ أقراص نحتاج قرصين لإكمال ٥.",
          params: {
            modelKind: "five-frame",
            itemCount: 3,
            items: [
              {
                targetNumber: 0,
                quantityModel: createFiveFrameSpec({
                  count: 2,
                  crossedOutCount: 2,
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "قرصان شُطبا بالكامل فبقي صفر (٠)",
              },
              {
                targetNumber: 3,
                quantityModel: createFiveFrameSpec({
                  count: 2,
                  secondaryCount: 1,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                  showPartOutline: true,
                }),
                partWholeNoteAr: "٢ و١ يساوي ٣",
              },
              {
                targetNumber: 5,
                quantityModel: createFiveFrameSpec({
                  count: 3,
                  secondaryCount: 2,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                  showPartOutline: true,
                }),
                partWholeNoteAr: "٣ و٢ يساوي ٥",
              },
            ],
            comparisonPromptAr:
              "لوحة خمسة فيها ٣ أقراص حمراء؛ كم قرصاً أزرق نحتاج لتمتلئ اللوحة بالكامل وتصبح ٥؟",
            comparisonAnswerAr: "نحتاج قرصين أزرقين (٢)، لأن ٣ و٢ يساوي ٥",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK12Blueprint);

export const lessonK13Blueprint: LessonBlueprint = {
  lessonId: "K-13",
  grade: "K",
  lessonNumber: 13,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-13"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-13"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: أعطِ كل طالب ٥ مكعبات متداخلة بلونين مختلفين واطلب منه تركيبها في قطار واحد لتمثيل الكل، ثم فكّها إلى جزأين أصغر لاكتشاف مكوّنات العدد.",
    commonMisconceptionsAr: [
      "الظنّ بأن عدد المكعبات يتغيّر عندما نفكّ القطار إلى جزأين أو عندما نضعه بشكل عمودي بدلاً من الأفقي.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ المكعبات في كل قطار مترابط وتتبّع الرقم المنقّط (١، ٢، ٣):",
          strategyHintAr:
            "عدّ كل مكعب في القطار من اليمين إلى اليسار ثم تتبّع الرقم المقابل.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 2,
            items: [
              {
                targetNumber: 1,
                quantityModel: createSnapCubesSpec({
                  count: 1,
                  separated: false,
                  colorTheme: "emerald",
                }),
                partWholeNoteAr: "مكعب واحد (١)",
              },
              {
                targetNumber: 2,
                quantityModel: createSnapCubesSpec({
                  count: 2,
                  separated: false,
                  colorTheme: "sky",
                }),
                partWholeNoteAr: "قطار من مكعبين مترابطين (٢)",
              },
              {
                targetNumber: 3,
                quantityModel: createSnapCubesSpec({
                  count: 3,
                  separated: false,
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "قطار من ٣ مكعبات مترابطة",
              },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ قطارات المكعبات المترابطة وتتبّع الرقم الذي يمثّل الكلّ:",
          strategyHintAr:
            "المكعبات المتشابكة معاً تكوّن وحدة واحدة تسمّى الكل؛ عدّها وتتبّع الرقم.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 2,
            items: [
              {
                targetNumber: 2,
                quantityModel: createSnapCubesSpec({
                  count: 2,
                  separated: false,
                  colorTheme: "emerald",
                }),
                partWholeNoteAr: "مكعبان مترابطان (٢)",
              },
              {
                targetNumber: 3,
                quantityModel: createSnapCubesSpec({
                  count: 3,
                  separated: false,
                  colorTheme: "amber",
                }),
                partWholeNoteAr: "٣ مكعبات مترابطة في قطار واحد",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "لاحظ المكعبات المفكوكة إلى جزأين، ثم اجمع الجزأين لتجد الكل وتتبّع الرقم:",
          strategyHintAr: "عندما نركّب الجزأين معاً نحصل على الكلّ نفسه.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 2,
            items: [
              {
                targetNumber: 3,
                quantityModel: createSnapCubesSpec({
                  count: 2,
                  secondaryCount: 1,
                  separated: true,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٢ و١ عند تركيبهما معاً يصبحان ٣",
              },
              {
                targetNumber: 4,
                quantityModel: createSnapCubesSpec({
                  count: 2,
                  secondaryCount: 2,
                  separated: true,
                  colorTheme: "violet",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٢ و٢ عند تركيبهما معاً يصبحان ٤",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ المكعبات وتتبّع الرقم ثم أجب:",
          strategyHintAr: "فكّ القطار إلى جزأين لا يغيّر الكلّ للمكعبات.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 2,
            items: [
              {
                targetNumber: 4,
                quantityModel: createSnapCubesSpec({
                  count: 3,
                  secondaryCount: 1,
                  separated: true,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٣ مكعبات خضراء و١ أصفر = ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createSnapCubesSpec({
                  count: 5,
                  separated: false,
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "قطار مكتمل من ٥ مكعبات",
              },
            ],
            comparisonPromptAr:
              "قطار فيه ٤ مكعبات مترابطة؛ إذا فككناه إلى مكعبين ومكعبين (٢ و٢)، فكم يظلّ الكلّ للمكعبات؟",
            comparisonAnswerAr: "يظلّ الكلّ ٤ مكعبات، لأن ٢ و٢ يساوي ٤",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ قطارات المكعبات المتداخلة وتتبّع الأرقام (٢، ٣):",
          strategyHintAr:
            "لاحظ الأرقام المكتوبة على كل مكعب من اليمين إلى اليسار.",
          params: {
            modelKind: "snap-cubes",
            targetNumbers: [2, 3],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ قطارات المكعبات المترابطة ثنائية اللون وتتبّع الرقم الذي يمثّل الكل:",
          strategyHintAr:
            "اللونان في القطار المترابط يوضّحان الجزأين اللذين يكوّنان الكلّ.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                quantityModel: createSnapCubesSpec({
                  count: 2,
                  secondaryCount: 1,
                  separated: false,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "قطار مترابط: ٢ و١ يساوي ٣",
              },
              {
                targetNumber: 4,
                quantityModel: createSnapCubesSpec({
                  count: 3,
                  secondaryCount: 1,
                  separated: false,
                  colorTheme: "sky",
                  secondaryColorTheme: "coral",
                }),
                partWholeNoteAr: "قطار مترابط: ٣ و١ يساوي ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createSnapCubesSpec({
                  count: 3,
                  secondaryCount: 2,
                  separated: false,
                  colorTheme: "violet",
                  secondaryColorTheme: "rose",
                }),
                partWholeNoteAr: "قطار مترابط: ٣ و٢ يساوي ٥",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "اجمع أجزاء المكعبات المفكوكة لتعرف الكلّ (الكل)، ثم تتبّع الرقم واكتبه:",
          strategyHintAr:
            "عدّ الجزء الأول في اليمين ثم أضف إليه الجزء الثاني في اليسار.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                quantityModel: createSnapCubesSpec({
                  count: 2,
                  secondaryCount: 1,
                  separated: true,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "جزءان مفكوكان: ٢ و١ يساوي ٣",
              },
              {
                targetNumber: 4,
                quantityModel: createSnapCubesSpec({
                  count: 2,
                  secondaryCount: 2,
                  separated: true,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "جزءان مفكوكان: ٢ و٢ يساوي ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createSnapCubesSpec({
                  count: 4,
                  secondaryCount: 1,
                  separated: true,
                  colorTheme: "indigo",
                  secondaryColorTheme: "rose",
                }),
                partWholeNoteAr: "جزءان مفكوكان: ٤ و١ يساوي ٥",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ المكعبات وتتبّع الأرقام ثم أجب:",
          strategyHintAr:
            "ركّب الجزء الأول (٣ مكعبات) مع الجزء الثاني (مكعبان) لتحصل على قطار من ٥ مكعبات.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 2,
            items: [
              {
                targetNumber: 4,
                quantityModel: createSnapCubesSpec({
                  count: 3,
                  secondaryCount: 1,
                  separated: true,
                  colorTheme: "sky",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٣ و١ يساوي ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createSnapCubesSpec({
                  count: 3,
                  secondaryCount: 2,
                  separated: true,
                  colorTheme: "emerald",
                  secondaryColorTheme: "coral",
                }),
                partWholeNoteAr: "٣ و٢ يساوي ٥",
              },
            ],
            comparisonPromptAr:
              "إذا ركّبنا ٣ مكعبات خضراء مع مكعبين أحمرين (٢)، فكم مكعباً يصبح في القطار الكلي؟",
            comparisonAnswerAr: "يصبح في القطار الكلي ٥ مكعبات (٣ و٢ يساوي ٥)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ المكعبات المفكوكة والمترابطة وتتبّع الأرقام:",
          strategyHintAr: "انتبه للجزأين في كل قطار واجمعهما لتحديد الكلّ.",
          params: {
            modelKind: "snap-cubes",
            targetNumbers: [3, 4, 5],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "قارن بين القطار المترابط وأجزائه المفكوكة، وتتبّع الأرقام واكتبها:",
          strategyHintAr:
            "لاحظ كيف ينقسم العدد نفسه إلى جزأين أصغر عند فكّ المكعبات.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                companionModel: createSnapCubesSpec({
                  count: 3,
                  separated: false,
                  colorTheme: "emerald",
                  labelAr: "الكل مترابط: ٣",
                }),
                quantityModel: createSnapCubesSpec({
                  count: 2,
                  secondaryCount: 1,
                  separated: true,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                  labelAr: "مفكوك: ٢ و١",
                }),
                partWholeNoteAr: "الكل ٣ ينقسم إلى ٢ و١",
              },
              {
                targetNumber: 4,
                companionModel: createSnapCubesSpec({
                  count: 4,
                  separated: false,
                  colorTheme: "sky",
                  labelAr: "الكل مترابط: ٤",
                }),
                quantityModel: createSnapCubesSpec({
                  count: 2,
                  secondaryCount: 2,
                  separated: true,
                  colorTheme: "sky",
                  secondaryColorTheme: "coral",
                  labelAr: "مفكوك: ٢ و٢",
                }),
                partWholeNoteAr: "الكل ٤ ينقسم إلى ٢ و٢",
              },
              {
                targetNumber: 5,
                companionModel: createSnapCubesSpec({
                  count: 5,
                  separated: false,
                  colorTheme: "violet",
                  labelAr: "الكل مترابط: ٥",
                }),
                quantityModel: createSnapCubesSpec({
                  count: 3,
                  secondaryCount: 2,
                  separated: true,
                  colorTheme: "violet",
                  secondaryColorTheme: "rose",
                  labelAr: "مفكوك: ٣ و٢",
                }),
                partWholeNoteAr: "الكل ٥ ينقسم إلى ٣ و٢",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ أبراج المكعبات العمودية المفكوكة والمترابطة وتتبّع الأرقام:",
          strategyHintAr:
            "البرج العمودي يتكوّن من نفس عدد المكعبات سواء كان متصلاً أو مفكوكاً إلى جزأين.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                quantityModel: createSnapCubesSpec({
                  count: 2,
                  secondaryCount: 1,
                  separated: true,
                  orientation: "vertical",
                  colorTheme: "coral",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "برج من ٢ و١ يساوي ٣",
              },
              {
                targetNumber: 4,
                quantityModel: createSnapCubesSpec({
                  count: 3,
                  secondaryCount: 1,
                  separated: false,
                  orientation: "vertical",
                  colorTheme: "emerald",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "برج مترابط من ٣ و١ يساوي ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createSnapCubesSpec({
                  count: 4,
                  secondaryCount: 1,
                  separated: true,
                  orientation: "vertical",
                  colorTheme: "indigo",
                  secondaryColorTheme: "rose",
                }),
                partWholeNoteAr: "برج من ٤ و١ يساوي ٥",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "افحص قطارات المكعبات وتتبّع الأرقام ثم أجب عن سؤال التحليل:",
          strategyHintAr:
            "فكّر في طريقتين مختلفتين لفكّ قطار من ٥ مكعبات إلى جزأين غير فارغين.",
          params: {
            modelKind: "snap-cubes",
            itemCount: 2,
            items: [
              {
                targetNumber: 5,
                quantityModel: createSnapCubesSpec({
                  count: 4,
                  secondaryCount: 1,
                  separated: true,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "طريقة ١ لفكّ ٥: ٤ و١",
              },
              {
                targetNumber: 5,
                quantityModel: createSnapCubesSpec({
                  count: 3,
                  secondaryCount: 2,
                  separated: true,
                  colorTheme: "sky",
                  secondaryColorTheme: "coral",
                }),
                partWholeNoteAr: "طريقة ٢ لفكّ ٥: ٣ و٢",
              },
            ],
            comparisonPromptAr:
              "لدينا قطار من ٥ مكعبات؛ اذكر طريقتين لفكّه إلى جزأين أصغر.",
            comparisonAnswerAr: "يمكن فكّ ٥ إلى (٤ و١) أو إلى (٣ و٢)",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK13Blueprint);

export const lessonK14Blueprint: LessonBlueprint = {
  lessonId: "K-14",
  grade: "K",
  lessonNumber: 14,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-14"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-14"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: وزّع أعواداً خشبية ملوّنة أو مصاصات شرب ليمثّل الطلاب الأعداد من ١ إلى ٤ عمودياً، ثم يضعون العود الخامس مائلاً فوق الأربعة لتكوين حزمة خماسية واحدة.",
    commonMisconceptionsAr: [
      "رسم العلامة الخامسة عمودية بجانب الأربع علامات بدلاً من رسمها مائلة لتجميع الحزمة الخماسية، أو نسيان عدّ الخط المائل الخامس.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ العلامات العمودية والأعواد الملوّنة وتتبّع الرقم المنقّط (١، ٢، ٣):",
          strategyHintAr:
            "كل خط عمودي يمثّل ١؛ عدّ الخطوط من اليمين إلى اليسار ثم تتبّع الرقم.",
          params: {
            modelKind: "tally-marks",
            itemCount: 2,
            items: [
              {
                targetNumber: 1,
                quantityModel: createTallyMarksSpec({
                  count: 1,
                  variant: "tally-and-sticks",
                  colorTheme: "amber",
                }),
                partWholeNoteAr: "علامة عمودية واحدة وعود واحد (١)",
              },
              {
                targetNumber: 2,
                quantityModel: createTallyMarksSpec({
                  count: 2,
                  variant: "tally-and-sticks",
                  colorTheme: "sky",
                }),
                partWholeNoteAr: "علامتان عموديتان وعودان (٢)",
              },
              {
                targetNumber: 3,
                quantityModel: createTallyMarksSpec({
                  count: 3,
                  variant: "tally-and-sticks",
                  colorTheme: "emerald",
                }),
                partWholeNoteAr: "٣ علامات عمودية و٣ أعواد",
              },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ علامات العدّ العمودية من ١ إلى ٤ وتتبّع الرقم المقابل:",
          strategyHintAr:
            "العلامات من ١ إلى ٤ تُرسم خطوطاً عمودية متجاورة؛ عدّها وتتبّع الرقم.",
          params: {
            modelKind: "tally-marks",
            targetNumbers: [1, 2, 3, 4],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "لاحظ الأعواد الملوّنة وعلامات العدّ المقابلة لها ثم تتبّع الرقم واكتبه:",
          strategyHintAr:
            "قارن بين الأعواد الملموسة وعلامات العدّ المرسومة لتتحقّق من العدد.",
          params: {
            modelKind: "tally-marks",
            itemCount: 2,
            items: [
              {
                targetNumber: 3,
                quantityModel: createTallyMarksSpec({
                  count: 3,
                  variant: "tally-and-sticks",
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "٣ أعواد ملوّنة و٣ علامات عدّ",
              },
              {
                targetNumber: 4,
                quantityModel: createTallyMarksSpec({
                  count: 4,
                  variant: "tally-and-sticks",
                  colorTheme: "violet",
                }),
                partWholeNoteAr: "٤ أعواد ملوّنة و٤ علامات عدّ",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ علامات العدّ وتتبّع الرقم ثم أجب عن سؤال الفهم:",
          strategyHintAr:
            "نرسم العلامة الخامسة مائلة لنوحّد الخمس علامات في حزمة واحدة يسهل التعرّف عليها فوراً.",
          params: {
            modelKind: "tally-marks",
            itemCount: 2,
            items: [
              {
                targetNumber: 4,
                quantityModel: createTallyMarksSpec({
                  count: 4,
                  variant: "tally",
                  colorTheme: "sky",
                }),
                partWholeNoteAr: "٤ علامات عمودية منفردة",
              },
              {
                targetNumber: 5,
                quantityModel: createTallyMarksSpec({
                  count: 5,
                  variant: "tally",
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "حزمة خماسية كاملة (٥)",
              },
            ],
            comparisonPromptAr:
              "لماذا نرسم العلامة الخامسة مائلة فوق العلامات الأربع بدلاً من رسمها عمودية بجانبها؟",
            comparisonAnswerAr:
              "لتكوين حزمة واحدة من ٥ يسهل قراءتها بسرعة بدلاً من ٥ خطوط منفردة",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ علامات العدّ والأعواد الملوّنة وتتبّع الأرقام (٢، ٣، ٤):",
          strategyHintAr: "عدّ العلامات العمودية بالترتيب وتتبّع الرقم.",
          params: {
            modelKind: "tally-marks",
            targetNumbers: [2, 3, 4],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ علامات العدّ من ٢ إلى ٥ (بما فيها الحزمة الخماسية) وتتبّع الأرقام واكتبها:",
          strategyHintAr:
            "عندما ترى الخط المائل الخامس فاعلم فوراً أن الحزمة تمثّل العدد ٥.",
          params: {
            modelKind: "tally-marks",
            itemCount: 3,
            items: [
              {
                targetNumber: 2,
                quantityModel: createTallyMarksSpec({
                  count: 2,
                  variant: "tally",
                  colorTheme: "sky",
                }),
                partWholeNoteAr: "علامتان عموديتان (٢)",
              },
              {
                targetNumber: 4,
                quantityModel: createTallyMarksSpec({
                  count: 4,
                  variant: "tally",
                  colorTheme: "emerald",
                }),
                partWholeNoteAr: "٤ علامات عمودية",
              },
              {
                targetNumber: 5,
                quantityModel: createTallyMarksSpec({
                  count: 5,
                  variant: "tally",
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "٤ عمودية + ١ مائل = ٥",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "اربط بين الأعواد الملوّنة وعلامات العدّ لكل عدد، ثم تتبّع الرقم واكتبه:",
          strategyHintAr:
            "الأعواد الملوّنة تمثّل العدد حسّياً، وعلامات العدّ تمثّله بالرسم.",
          params: {
            modelKind: "tally-marks",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                quantityModel: createTallyMarksSpec({
                  count: 3,
                  variant: "tally-and-sticks",
                  colorTheme: "amber",
                }),
                partWholeNoteAr: "٣ أعواد و٣ علامات = ٣",
              },
              {
                targetNumber: 4,
                quantityModel: createTallyMarksSpec({
                  count: 4,
                  variant: "tally-and-sticks",
                  colorTheme: "violet",
                }),
                partWholeNoteAr: "٤ أعواد و٤ علامات = ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createTallyMarksSpec({
                  count: 5,
                  variant: "tally-and-sticks",
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "٥ أعواد وحزمة خماسية = ٥",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "قارن بين ٤ علامات وحزمة من ٥ علامات ثم أجب:",
          strategyHintAr:
            "الحزمة الخماسية تتكوّن من ٤ خطوط عمودية وخط خامس مائل يربطها معاً.",
          params: {
            modelKind: "tally-marks",
            itemCount: 2,
            items: [
              {
                targetNumber: 4,
                quantityModel: createTallyMarksSpec({
                  count: 4,
                  variant: "tally",
                  colorTheme: "amber",
                }),
                partWholeNoteAr: "٤ خطوط عمودية (ينقصها ١ لتصبح حزمة)",
              },
              {
                targetNumber: 5,
                quantityModel: createTallyMarksSpec({
                  count: 5,
                  variant: "tally",
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "حزمة خماسية مكتملة (٤ و١ مائل = ٥)",
              },
            ],
            comparisonPromptAr:
              "لدينا ٤ علامات عدّ عمودية؛ كيف نضيف العلامة الخامسة لنمثّل العدد ٥؟",
            comparisonAnswerAr:
              "نرسم العلامة الخامسة خطاً مائلاً يقطع العلامات الأربع العمودية لتكوين حزمة من ٥",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ علامات العدّ والأعواد وتتبّع الأرقام (٣، ٤، ٥):",
          strategyHintAr:
            "ميّز فوراً بين ٤ خطوط عمودية وحزمة الخمسة ذات الخط المائل.",
          params: {
            modelKind: "tally-marks",
            itemCount: 2,
            items: [
              {
                targetNumber: 4,
                quantityModel: createTallyMarksSpec({
                  count: 4,
                  variant: "tally-and-sticks",
                  colorTheme: "emerald",
                }),
                partWholeNoteAr: "٤ علامات عمودية",
              },
              {
                targetNumber: 5,
                quantityModel: createTallyMarksSpec({
                  count: 5,
                  variant: "tally-and-sticks",
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "حزمة خماسية (٤ و١ مائل = ٥)",
              },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "قارن بين التمثيل بالأعواد الملوّنة والتمثيل بعلامات العدّ للأعداد (٣، ٤، ٥) وتتبّع الأرقام:",
          strategyHintAr:
            "تحقّق من تطابق عدد الأعواد مع عدد علامات العدّ في كل صفّ.",
          params: {
            modelKind: "tally-marks",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                quantityModel: createTallyMarksSpec({
                  count: 3,
                  variant: "tally-and-sticks",
                  colorTheme: "sky",
                }),
                partWholeNoteAr: "٢ و١ من العلامات والأعواد = ٣",
              },
              {
                targetNumber: 4,
                quantityModel: createTallyMarksSpec({
                  count: 4,
                  variant: "tally-and-sticks",
                  colorTheme: "violet",
                }),
                partWholeNoteAr: "٢ و٢ من العلامات والأعواد = ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createTallyMarksSpec({
                  count: 5,
                  variant: "tally-and-sticks",
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "٤ عمودية + ١ مائل = حزمة واحدة من ٥",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ علامات العدّ وتتبّع الأرقام واكتبها بخط واضح (٢، ٤، ٥):",
          strategyHintAr:
            "لاحظ الفرق البصري الواضح بين ٤ خطوط عمودية وحزمة الـ ٥ المربوطة بالخط المائل.",
          params: {
            modelKind: "tally-marks",
            itemCount: 3,
            items: [
              {
                targetNumber: 2,
                quantityModel: createTallyMarksSpec({
                  count: 2,
                  variant: "tally",
                  colorTheme: "teal",
                }),
                partWholeNoteAr: "علامتان (٢)",
              },
              {
                targetNumber: 4,
                quantityModel: createTallyMarksSpec({
                  count: 4,
                  variant: "tally",
                  colorTheme: "amber",
                }),
                partWholeNoteAr: "٤ علامات عمودية",
              },
              {
                targetNumber: 5,
                quantityModel: createTallyMarksSpec({
                  count: 5,
                  variant: "tally",
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "حزمة خماسية (٥)",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "حلّل حزمة علامات العدّ الخماسية وتتبّع الرقمين ٣ و٥ ثم أجب:",
          strategyHintAr:
            "في الحزمة الخماسية توجد ٤ علامات عمودية وعلامة واحدة مائلة (٤ و١ يساوي ٥).",
          params: {
            modelKind: "tally-marks",
            itemCount: 2,
            items: [
              {
                targetNumber: 3,
                quantityModel: createTallyMarksSpec({
                  count: 3,
                  variant: "tally",
                  colorTheme: "emerald",
                }),
                partWholeNoteAr: "٣ علامات عمودية (ينقصها ٢ لتكتمل الحزمة)",
              },
              {
                targetNumber: 5,
                quantityModel: createTallyMarksSpec({
                  count: 5,
                  variant: "tally",
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "حزمة خماسية: ٤ عمودية و١ مائل = ٥",
              },
            ],
            comparisonPromptAr:
              "كم علامة عمودية وكم علامة مائلة توجد في حزمة العدد ٥؟ وكم علامة نضيف إلى ٣ لنحصل على حزمة من ٥؟",
            comparisonAnswerAr:
              "في حزمة الـ ٥ توجد ٤ علامات عمودية وعلامة واحدة (١) مائلة، ونضيف علامتين (٢) إلى ٣ لنحصل على ٥",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK14Blueprint);

export const lessonK15Blueprint: LessonBlueprint = {
  lessonId: "K-15",
  grade: "K",
  lessonNumber: 15,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-15"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-15"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: العب مع الطلاب بقطع النرد الكبيرة وبطاقات الدومينو؛ شجّعهم على تسمية العدد بنظرة سريعة دون عدّ النقاط واحدة تلو الأخرى، وملاحظة أن ٣ هي (٢ و١)، و٤ هي (٢ و٢)، و٥ هي (٤ في الزوايا و١ في الوسط).",
    commonMisconceptionsAr: [
      "الاستمرار في عدّ نقاط النرد فردياً في كل مرة بدلاً من التعرّف البصري على نمط النقاط ومجموعاته الفرعية.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "تعرّف على عدد النقاط على كل وجه نرد وتتبّع الرقم المنقّط (١، ٢، ٣):",
          strategyHintAr:
            "لاحظ ترتيب النقاط المميز على النرد: نقطة في الوسط (١)، نقطتان قطريتان (٢)، وثلاث نقاط (٣).",
          params: {
            modelKind: "dice-pattern",
            itemCount: 2,
            items: [
              {
                targetNumber: 1,
                quantityModel: createDicePatternSpec({
                  count: 1,
                  colorTheme: "coral",
                }),
                partWholeNoteAr: "نقطة واحدة في الوسط (١)",
              },
              {
                targetNumber: 2,
                quantityModel: createDicePatternSpec({
                  count: 2,
                  colorTheme: "sky",
                }),
                partWholeNoteAr: "نقطتان قطريتان (٢)",
              },
              {
                targetNumber: 3,
                quantityModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 1,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٣ هي ٢ و١ أكثر",
              },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "اعرف عدد النقاط على وجه النرد بنظرة سريعة ثم تتبّع الرقم (١، ٢، ٣):",
          strategyHintAr:
            "العدد ٣ على النرد يظهر كنقطتين في الطرفين ونقطة واحدة في الوسط (٢ و١).",
          params: {
            modelKind: "dice-pattern",
            itemCount: 2,
            items: [
              {
                targetNumber: 2,
                quantityModel: createDicePatternSpec({
                  count: 1,
                  secondaryCount: 1,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٢ هي ١ و١",
              },
              {
                targetNumber: 3,
                quantityModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 1,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٣ هي ٢ و١ أكثر",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "لاحظ الأجزاء الملوّنة على أوجه النرد للأعداد (٣، ٤) وتتبّع كل رقم:",
          strategyHintAr: "العدد ٤ على النرد يتكوّن من مجموعتين من ٢ (٢ و٢).",
          params: {
            modelKind: "dice-pattern",
            itemCount: 2,
            items: [
              {
                targetNumber: 3,
                quantityModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 1,
                  colorTheme: "violet",
                  secondaryColorTheme: "rose",
                }),
                partWholeNoteAr: "٣ هي ٢ و١ أكثر",
              },
              {
                targetNumber: 4,
                quantityModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 2,
                  colorTheme: "sky",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٤ هي مجموعتان من ٢ (٢ و٢)",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "قارن بين وجه ٤ ووجه ٥ على النرد وتتبّع الرقمين ثم أجب:",
          strategyHintAr:
            "لاحظ النقطة الموجودة في وسط وجه الـ ٥ التي تميّزه عن وجه الـ ٤.",
          params: {
            modelKind: "dice-pattern",
            itemCount: 2,
            items: [
              {
                targetNumber: 4,
                quantityModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 2,
                  colorTheme: "sky",
                  secondaryColorTheme: "emerald",
                }),
                partWholeNoteAr: "٤ هي ٢ و٢ في الزوايا",
              },
              {
                targetNumber: 5,
                quantityModel: createDicePatternSpec({
                  count: 4,
                  secondaryCount: 1,
                  colorTheme: "coral",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٥ هي ٤ و١ في الوسط",
              },
            ],
            comparisonPromptAr:
              "كيف يتحوّل نمط العدد ٤ على النرد إلى نمط العدد ٥؟",
            comparisonAnswerAr:
              "بإضافة نقطة واحدة (١) في الوسط إلى النقاط الأربع (٤ و١ يساوي ٥)",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "تعرّف على أنماط النقاط على النرد وتتبّع الأرقام (٢، ٣):",
          strategyHintAr:
            "انظر إلى مجموعات النقاط الملوّنة لتعرف العدد دون عدّ فردي.",
          params: {
            modelKind: "dice-pattern",
            targetNumbers: [2, 3],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "استخدم التفكير في الأجزاء والكل على أوجه النرد لتحديد العدد (٣، ٤، ٥) وتتبّع الرقم:",
          strategyHintAr: "٣ هي (٢ و١)، و٤ هي (٢ و٢)، و٥ هي (٤ و١ في الوسط).",
          params: {
            modelKind: "dice-pattern",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                quantityModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 1,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٣ هي ٢ و١ أكثر",
              },
              {
                targetNumber: 4,
                quantityModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 2,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٤ هي مجموعتان من ٢ (٢ و٢)",
              },
              {
                targetNumber: 5,
                quantityModel: createDicePatternSpec({
                  count: 4,
                  secondaryCount: 1,
                  colorTheme: "violet",
                  secondaryColorTheme: "rose",
                }),
                partWholeNoteAr: "٥ هي ٤ و١ في الوسط",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "اجمع نقاط جزأي بطاقة الدومينو لتعرف الكلّ، ثم تتبّع الرقم واكتبه:",
          strategyHintAr:
            "اقرأ النقاط في النصف الأيمن ثم أضف إليها النقاط في النصف الأيسر.",
          params: {
            modelKind: "dice-pattern",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                quantityModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 1,
                  diceVariant: "domino",
                  colorTheme: "sky",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "دومينو: ٢ و١ يساوي ٣",
              },
              {
                targetNumber: 4,
                quantityModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 2,
                  diceVariant: "domino",
                  colorTheme: "emerald",
                  secondaryColorTheme: "coral",
                }),
                partWholeNoteAr: "دومينو: ٢ و٢ يساوي ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createDicePatternSpec({
                  count: 3,
                  secondaryCount: 2,
                  diceVariant: "domino",
                  colorTheme: "indigo",
                  secondaryColorTheme: "rose",
                }),
                partWholeNoteAr: "دومينو: ٣ و٢ يساوي ٥",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "تتبّع الرقمين ٣ و٥ ثم اشرح مكوّناتهما:",
          strategyHintAr:
            "في النرد نرى ٣ كـ (٢ و١) ونرى ٥ كـ (٤ في الزوايا و١ في الوسط).",
          params: {
            modelKind: "dice-pattern",
            itemCount: 2,
            items: [
              {
                targetNumber: 3,
                quantityModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 1,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٣ هي ٢ و١ أكثر",
              },
              {
                targetNumber: 5,
                quantityModel: createDicePatternSpec({
                  count: 4,
                  secondaryCount: 1,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٥ هي ٤ و١ في الوسط",
              },
            ],
            comparisonPromptAr:
              "كيف نعرف العدد ٥ على النرد فوراً دون عدّ النقاط واحدةً واحدة؟",
            comparisonAnswerAr:
              "نلاحظ ٤ نقاط في الزوايا ونقطة ١ في الوسط، فنعرف فوراً أن ٤ و١ يساوي ٥",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "تعرّف على نقاط النرد والدومينو وتتبّع الأرقام (٣، ٤، ٥):",
          strategyHintAr: "استخدم الأجزاء الملوّنة لتحديد الكل فوراً.",
          params: {
            modelKind: "dice-pattern",
            targetNumbers: [3, 4, 5],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "قارن بين وجه النرد وبطاقة الدومينو للعدد نفسه وتتبّع الأرقام (٣، ٤، ٥):",
          strategyHintAr:
            "يمكن تمثيل العدد نفسه على وجه نرد واحد أو بجمع شقّي بطاقة الدومينو.",
          params: {
            modelKind: "dice-pattern",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                companionModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 1,
                  diceVariant: "die",
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                quantityModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 1,
                  diceVariant: "domino",
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "العدد ٣: (٢ و١) على النرد والدومينو",
              },
              {
                targetNumber: 4,
                companionModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 2,
                  diceVariant: "die",
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                quantityModel: createDicePatternSpec({
                  count: 3,
                  secondaryCount: 1,
                  diceVariant: "domino",
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "العدد ٤: (٢ و٢) أو (٣ و١)",
              },
              {
                targetNumber: 5,
                companionModel: createDicePatternSpec({
                  count: 4,
                  secondaryCount: 1,
                  diceVariant: "die",
                  colorTheme: "violet",
                  secondaryColorTheme: "rose",
                }),
                quantityModel: createDicePatternSpec({
                  count: 3,
                  secondaryCount: 2,
                  diceVariant: "domino",
                  colorTheme: "violet",
                  secondaryColorTheme: "rose",
                }),
                partWholeNoteAr: "العدد ٥: (٤ و١) أو (٣ و٢)",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "اجمع أجزاء النقاط على بطاقات الدومينو وتتبّع الرقم الكلي واكتبه:",
          strategyHintAr: "لاحظ كيف تكوّن الأجزاء المختلفة نفس الكلّ.",
          params: {
            modelKind: "dice-pattern",
            itemCount: 3,
            items: [
              {
                targetNumber: 2,
                quantityModel: createDicePatternSpec({
                  count: 1,
                  secondaryCount: 1,
                  diceVariant: "domino",
                  colorTheme: "sky",
                  secondaryColorTheme: "teal",
                }),
                partWholeNoteAr: "١ و١ يساوي ٢",
              },
              {
                targetNumber: 4,
                quantityModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 2,
                  diceVariant: "domino",
                  colorTheme: "coral",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٢ و٢ يساوي ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createDicePatternSpec({
                  count: 4,
                  secondaryCount: 1,
                  diceVariant: "domino",
                  colorTheme: "indigo",
                  secondaryColorTheme: "emerald",
                }),
                partWholeNoteAr: "٤ و١ يساوي ٥",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "قارن بين طريقتين لتكوين العدد ٥ بالنقاط وتتبّع الرقم ٥ ثم أجب:",
          strategyHintAr:
            "العدد ٥ يمكن رؤيته كـ (٤ و١) على النرد أو كـ (٣ و٢) على بطاقة الدومينو.",
          params: {
            modelKind: "dice-pattern",
            itemCount: 2,
            items: [
              {
                targetNumber: 5,
                quantityModel: createDicePatternSpec({
                  count: 4,
                  secondaryCount: 1,
                  diceVariant: "die",
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "٥ على النرد: ٤ و١ في الوسط",
              },
              {
                targetNumber: 5,
                quantityModel: createDicePatternSpec({
                  count: 3,
                  secondaryCount: 2,
                  diceVariant: "domino",
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٥ على الدومينو: ٣ و٢",
              },
            ],
            comparisonPromptAr:
              "ما الجزآن اللذان يكوّنان العدد ٤ على النرد؟ وما الجزآن اللذان يكوّنان العدد ٥ على النرد؟",
            comparisonAnswerAr:
              "العدد ٤ يتكوّن من مجموعتين من ٢ (٢ و٢)، والعدد ٥ يتكوّن من ٤ في الزوايا و١ في الوسط (٤ و١)",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK15Blueprint);

export const lessonK16Blueprint: LessonBlueprint = {
  lessonId: "K-16",
  grade: "K",
  lessonNumber: 16,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-16"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-16"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: ارسم دائرة على السجادة وضع حولها من ١ إلى ٥ أشياء ملوّنة؛ اطلب من الطلاب وضع علامة عند العنصر الأول (أعلى الدائرة مثل الساعة ١٢) قبل العدّ، ثم الانتقال إلى جمع المجموعات الفرعية المعروفة على الدائرة.",
    commonMisconceptionsAr: [
      "نسيان مكان بدء العدّ في الترتيب الدائري وإعادة عدّ العنصر الأول مرّتين.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "ابدأ من علامة البداية الخضراء أعلى الدائرة، وعدّ العناصر ثم تتبّع الرقم (١، ٢، ٣):",
          strategyHintAr:
            "ضع إصبعك على العنصر رقم ١ عند السهم الأخضر في أعلى الدائرة وتوقّف قبل أن تعود إليه مرّة ثانية.",
          params: {
            modelKind: "circular-arrangement",
            itemCount: 2,
            items: [
              {
                targetNumber: 1,
                quantityModel: createCircularArrangementSpec({
                  count: 1,
                  colorTheme: "violet",
                }),
                partWholeNoteAr: "عنصر واحد على الحلقة الدائرية (١)",
              },
              {
                targetNumber: 2,
                quantityModel: createCircularArrangementSpec({
                  count: 2,
                  colorTheme: "sky",
                }),
                partWholeNoteAr: "عنصران متقابلان على الدائرة (٢)",
              },
              {
                targetNumber: 3,
                quantityModel: createCircularArrangementSpec({
                  count: 3,
                  colorTheme: "emerald",
                }),
                partWholeNoteAr: "٣ عناصر مرتّبة حول الدائرة",
              },
            ],
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ العناصر المرتّبة حول الحلقة الدائرية بدءاً من علامة البداية وتتبّع الرقم (٢، ٣):",
          strategyHintAr:
            "ابدأ دائماً من العنصر الأول عند العلامة الخضراء الأعلى وتتبّع الحلقة باتجاه واحد.",
          params: {
            modelKind: "circular-arrangement",
            targetNumbers: [2, 3],
            itemCount: 2,
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "لاحظ مجموعتي الألوان حول الدائرة واجمعهما لتعرف الكلّ، ثم تتبّع الرقم (٣، ٤):",
          strategyHintAr:
            "في الدائرة يمكننا جمع جزأين معروفين مثل (٢ و١ يساوي ٣) أو (٢ و٢ يساوي ٤).",
          params: {
            modelKind: "circular-arrangement",
            itemCount: 2,
            items: [
              {
                targetNumber: 3,
                quantityModel: createCircularArrangementSpec({
                  count: 2,
                  secondaryCount: 1,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "على الدائرة: ٢ و١ يساوي ٣",
              },
              {
                targetNumber: 4,
                quantityModel: createCircularArrangementSpec({
                  count: 2,
                  secondaryCount: 2,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "على الدائرة: ٢ و٢ يساوي ٤",
              },
            ],
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ العناصر حول الدائرة وتتبّع الرقمين ثم أجب:",
          strategyHintAr:
            "تحديد نقطة البداية يمنعنا من الدوران المستمر وإعادة عدّ نفس العنصر.",
          params: {
            modelKind: "circular-arrangement",
            targetNumbers: [3, 5],
            itemCount: 2,
            comparisonPromptAr:
              "لماذا نضع علامة عند العنصر الأول عندما نعدّ أشياء مرتّبة في دائرة؟",
            comparisonAnswerAr:
              "لكي نعرف أين بدأنا ونتوقّف عند اكتمال الدورة فلا نعدّ العنصر الأول مرّتين",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "عدّ العناصر في الترتيب الدائري وتتبّع الأرقام (٢، ٣، ٤):",
          strategyHintAr: "ابدأ من العلامة الخضراء أعلى الدائرة وعدّ بالترتيب.",
          params: {
            modelKind: "circular-arrangement",
            targetNumbers: [2, 3, 4],
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "اجمع المجموعتين الفرعيتين حول كل دائرة لتجد الكلّ (٣، ٤، ٥) وتتبّع الرقم:",
          strategyHintAr:
            "لاحظ الألوان حول الدائرة: مثلاً ٣ عناصر بنفسجية وعنصران أصفران يكوّنان ٥.",
          params: {
            modelKind: "circular-arrangement",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                quantityModel: createCircularArrangementSpec({
                  count: 2,
                  secondaryCount: 1,
                  colorTheme: "violet",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "دائرة من ٢ و١ يساوي ٣",
              },
              {
                targetNumber: 4,
                quantityModel: createCircularArrangementSpec({
                  count: 2,
                  secondaryCount: 2,
                  colorTheme: "sky",
                  secondaryColorTheme: "coral",
                }),
                partWholeNoteAr: "دائرة من ٢ و٢ يساوي ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createCircularArrangementSpec({
                  count: 3,
                  secondaryCount: 2,
                  colorTheme: "emerald",
                  secondaryColorTheme: "rose",
                }),
                partWholeNoteAr: "دائرة من ٣ و٢ يساوي ٥",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "عدّ العناصر المرتّبة دائرياً وتتبّع الأرقام واكتبها في المربع (١، ٤، ٥):",
          strategyHintAr:
            "العمل مع الترتيب الدائري يمهّد لقراءة عقارب الساعة وقياس الزوايا لاحقاً.",
          params: {
            modelKind: "circular-arrangement",
            targetNumbers: [1, 4, 5],
            itemCount: 3,
            showPartWholeBreakdown: true,
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr: "تتبّع الرقمين ٤ و٥ ثم أجب عن سؤال التجميع:",
          strategyHintAr:
            "انظر إلى نصفي الدائرة لترى كيف يجتمع الجزآن لتكوين الكل.",
          params: {
            modelKind: "circular-arrangement",
            itemCount: 2,
            items: [
              {
                targetNumber: 4,
                quantityModel: createCircularArrangementSpec({
                  count: 3,
                  secondaryCount: 1,
                  colorTheme: "indigo",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "٣ و١ حول الدائرة = ٤",
              },
              {
                targetNumber: 5,
                quantityModel: createCircularArrangementSpec({
                  count: 3,
                  secondaryCount: 2,
                  colorTheme: "emerald",
                  secondaryColorTheme: "coral",
                }),
                partWholeNoteAr: "٣ و٢ حول الدائرة = ٥",
              },
            ],
            comparisonPromptAr:
              "على الحلقة الدائرية ٣ عناصر خضراء وعنصران أحمران (٢)؛ كم عنصراً في الدائرة كلها؟",
            comparisonAnswerAr: "في الدائرة كلها ٥ عناصر، لأن ٣ و٢ يساوي ٥",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "حدّد الكلّ في كل ترتيب دائري بالاعتماد على الأجزاء وتتبّع الرقم:",
          strategyHintAr: "اجمع المجموعتين الفرعيتين حول الدائرة وتتبّع الرقم.",
          params: {
            modelKind: "circular-arrangement",
            targetNumbers: [3, 4, 5],
            itemCount: 2,
            showPartWholeBreakdown: true,
          },
        },
      ],
      practice: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "قارن بين الترتيب الدائري ونمط النرد للعدد نفسه وتتبّع الأرقام (٣، ٤، ٥):",
          strategyHintAr:
            "العدد نفسه يظل ثابتاً سواء رُتّبت العناصر على وجه نرد أو حول دائرة.",
          params: {
            modelKind: "circular-arrangement",
            itemCount: 3,
            items: [
              {
                targetNumber: 3,
                companionModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 1,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                quantityModel: createCircularArrangementSpec({
                  count: 2,
                  secondaryCount: 1,
                  colorTheme: "coral",
                  secondaryColorTheme: "sky",
                }),
                partWholeNoteAr: "العدد ٣: (٢ و١) في النرد والدائرة",
              },
              {
                targetNumber: 4,
                companionModel: createDicePatternSpec({
                  count: 2,
                  secondaryCount: 2,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                quantityModel: createCircularArrangementSpec({
                  count: 2,
                  secondaryCount: 2,
                  colorTheme: "emerald",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "العدد ٤: (٢ و٢) في النرد والدائرة",
              },
              {
                targetNumber: 5,
                companionModel: createDicePatternSpec({
                  count: 4,
                  secondaryCount: 1,
                  colorTheme: "violet",
                  secondaryColorTheme: "rose",
                }),
                quantityModel: createCircularArrangementSpec({
                  count: 4,
                  secondaryCount: 1,
                  colorTheme: "violet",
                  secondaryColorTheme: "rose",
                }),
                partWholeNoteAr: "العدد ٥: (٤ و١) في النرد والدائرة",
              },
            ],
          },
        },
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "حلّل الأجزاء حول كل حلقة دائرية وتتبّع الرقم الكلي واكتبه (٣، ٤، ٥):",
          strategyHintAr:
            "انتبه لعلامة البداية واجمع الجزأين الملوّنين حول الحلقة.",
          params: {
            modelKind: "circular-arrangement",
            targetNumbers: [3, 4, 5],
            itemCount: 3,
            showPartWholeBreakdown: true,
          },
        },
      ],
      challenge: [
        {
          archetype: "ModelCountAndTrace",
          promptAr:
            "قارن بين دائرتين للعدد ٥ مقسّمتين بطريقتين مختلفتين وتتبّع الرقم ٥:",
          strategyHintAr:
            "سواء قسّمنا العناصر الخمسة حول الدائرة إلى (٤ و١) أو (٣ و٢)، فالكل دائماً ٥.",
          params: {
            modelKind: "circular-arrangement",
            itemCount: 2,
            items: [
              {
                targetNumber: 5,
                quantityModel: createCircularArrangementSpec({
                  count: 4,
                  secondaryCount: 1,
                  colorTheme: "violet",
                  secondaryColorTheme: "amber",
                }),
                partWholeNoteAr: "دائرة ٥: ٤ و١",
              },
              {
                targetNumber: 5,
                quantityModel: createCircularArrangementSpec({
                  count: 3,
                  secondaryCount: 2,
                  colorTheme: "emerald",
                  secondaryColorTheme: "coral",
                }),
                partWholeNoteAr: "دائرة ٥: ٣ و٢",
              },
            ],
            comparisonPromptAr:
              "إذا بدأ طالب العدّ في دائرة فيها ٥ عناصر ولم يتوقّف عند علامة البداية فعدّ العنصر الأول مرّة ثانية، فما الخطأ الذي سيقع فيه؟",
            comparisonAnswerAr:
              "سيحصل على العدد ٦ بدلاً من ٥ لأنّه عدّ العنصر الأول مرّتين",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK16Blueprint);

// Candidate quantity-to-digit pairs for Lesson K-17 (Match Quantities to 5 with Objects & Digits)
const K17_OBJECT_QUANTITY_PAIRS = [
  {
    id: "obj-qty-1-butterfly",
    right: createEverydayObjectSpec(getEverydayObjectById("butterfly"), {
      count: 1,
      size: "small",
      labelAr: "فراشة واحدة (١)",
    }),
    left: createDigitCardSpec(1),
    reasonAr: "مجموعة من عنصر واحد (١) تطابق الرقم ١",
  },
  {
    id: "obj-qty-2-apple",
    right: createEverydayObjectSpec(getEverydayObjectById("apple"), {
      count: 2,
      size: "small",
      labelAr: "تفاحتان: ١ و١ (٢)",
    }),
    left: createDigitCardSpec(2),
    reasonAr: "مجموعة من تفاحتين (٢) تطابق الرقم ٢",
  },
  {
    id: "obj-qty-3-bird",
    right: createEverydayObjectSpec(getEverydayObjectById("bird"), {
      count: 2,
      secondaryCount: 1,
      size: "small",
      labelAr: "٣ عصافير (مجموعتان فرعيتان: ٢ و١)",
    }),
    left: createDigitCardSpec(3),
    reasonAr: "٢ و١ أكثر من العصافير يكوّنان ٣ ويطابقان الرقم ٣",
  },
  {
    id: "obj-qty-4-star",
    right: createEverydayObjectSpec(getEverydayObjectById("star"), {
      count: 2,
      secondaryCount: 2,
      size: "small",
      labelAr: "٤ نجوم (مجموعتان من ٢: ٢ و٢)",
    }),
    left: createDigitCardSpec(4),
    reasonAr: "مجموعتان صغيرتان من ٢ (٢ و٢) تكوّنان ٤ وتطابقان الرقم ٤",
  },
  {
    id: "obj-qty-5-flower",
    right: createEverydayObjectSpec(getEverydayObjectById("flower"), {
      count: 3,
      secondaryCount: 2,
      size: "small",
      labelAr: "٥ زهرات (مجموعتان فرعيتان: ٣ و٢)",
    }),
    left: createDigitCardSpec(5),
    reasonAr: "٣ و٢ من الزهرات تكوّنان ٥ وتطابقان الرقم ٥",
  },
];

const K17_OBJECT_TRACE_PAIRS = [
  {
    id: "obj-trace-1-cat",
    right: createEverydayObjectSpec(getEverydayObjectById("cat"), {
      count: 1,
      size: "small",
      labelAr: "قطة واحدة (١)",
    }),
    left: createNumeralTraceSpec({ digit: 1, colorTheme: "amber" }),
    reasonAr: "قطة واحدة تطابق الرقم ١",
  },
  {
    id: "obj-trace-2-fish",
    right: createEverydayObjectSpec(getEverydayObjectById("fish"), {
      count: 2,
      size: "small",
      labelAr: "سمكتان (٢)",
    }),
    left: createNumeralTraceSpec({ digit: 2, colorTheme: "teal" }),
    reasonAr: "سمكتان تطابقان الرقم ٢",
  },
  {
    id: "obj-trace-3-strawberry",
    right: createEverydayObjectSpec(getEverydayObjectById("strawberry"), {
      count: 2,
      secondaryCount: 1,
      size: "small",
      labelAr: "٣ حبّات فراولة (٢ و١)",
    }),
    left: createNumeralTraceSpec({ digit: 3, colorTheme: "rose" }),
    reasonAr: "٢ و١ من الفراولة تساوي ٣",
  },
  {
    id: "obj-trace-4-car",
    right: createEverydayObjectSpec(getEverydayObjectById("car"), {
      count: 2,
      secondaryCount: 2,
      size: "small",
      labelAr: "٤ سيارات (٢ و٢)",
    }),
    left: createNumeralTraceSpec({ digit: 4, colorTheme: "coral" }),
    reasonAr: "٢ و٢ من السيارات تساوي ٤",
  },
  {
    id: "obj-trace-5-bee",
    right: createEverydayObjectSpec(getEverydayObjectById("bee"), {
      count: 4,
      secondaryCount: 1,
      size: "small",
      labelAr: "٥ نحلات (٤ و١)",
    }),
    left: createNumeralTraceSpec({ digit: 5, colorTheme: "amber" }),
    reasonAr: "٤ و١ من النحلات تساوي ٥",
  },
];

export const lessonK17Blueprint: LessonBlueprint = {
  lessonId: "K-17",
  grade: "K",
  lessonNumber: 17,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-17"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-17"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: رتّب أشياء الصف في مجموعات صغيرة واضحة (مثل قلمين وقلم لتكوين ٣، أو تفاحتين وتفاحتين لتكوين ٤) واطلب من الطلاب مطابقة كل مجموعة ببطاقة الرقم دون العدّ الفردي متى أمكن.",
    commonMisconceptionsAr: [
      "الاعتماد على الحجم الظاهري للأشياء بدلاً من عددها عند المطابقة مع الرقم.",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr: "عدّ الأشياء في كل مجموعة وصلها بالرقم المناسب (١، ٢، ٣):",
          strategyHintAr:
            "عدّ عناصر كل مجموعة في العمود الأيمن ثم صلها ببطاقة الرقم التي تمثّل الكلّ في العمود الأيسر.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "مجموعة الأشياء",
            leftColumnTitleAr: "الرقم المطابق",
            customCandidatePairs: K17_OBJECT_QUANTITY_PAIRS.slice(0, 3),
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل مجموعة أشياء في العمود الأيمن والرقم الصحيح في العمود الأيسر (٣ مجموعات):",
          strategyHintAr:
            "لاحظ المجموعات الصغيرة داخل كل مجموعة أكبر (مثل ٢ و١ لتكوين ٣).",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "المجموعات المصوّرة",
            leftColumnTitleAr: "الرقم",
            customCandidatePairs: K17_OBJECT_QUANTITY_PAIRS.slice(0, 4),
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "اعرف عدد الأشياء بالعدّ أو التعرّف السريع ثم صِلْ كل مجموعة برقمها (٣ مجموعات):",
          strategyHintAr: "مجموعتان من ٢ تعطيان ٤، و٣ مع ٢ تعطي ٥.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "الأشياء (مجموعات فرعية)",
            leftColumnTitleAr: "الرقم المطابق",
            customCandidatePairs: K17_OBJECT_QUANTITY_PAIRS.slice(1, 5),
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كل مجموعة برقمها (٣ مجموعات) ثم أجب:",
          strategyHintAr:
            "رؤية مجموعتين صغيرتين من ٢ داخل المجموعة تساعدنا على معرفة العدد ٤ فوراً.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "المجموعة",
            leftColumnTitleAr: "الرقم",
            customCandidatePairs: K17_OBJECT_QUANTITY_PAIRS.slice(1, 4),
            comparisonPromptAr:
              "إذا رأيت في المجموعة نجمتين (٢) وبجانبهما نجمتين (٢)، فما الرقم الذي تصل به المجموعة؟",
            comparisonAnswerAr: "نصلها بالرقم ٤، لأن ٢ و٢ يساوي ٤",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل مجموعة أشياء بالرقم الصحيح الذي يمثّل عددها (٤ مجموعات):",
          strategyHintAr:
            "استخدم المجموعات الفرعية المحدّدة بالإطار المنقّط لمعرفة العدد بسرعة.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "مجموعات الأشياء",
            leftColumnTitleAr: "الأرقام",
            customCandidatePairs: K17_OBJECT_QUANTITY_PAIRS.slice(0, 4),
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل مجموعة أشياء (من ١ إلى ٥) والرقم المطابق لها (٤ مجموعات):",
          strategyHintAr:
            "اجمع المجموعات الفرعية الصغيرة (٢ و١ = ٣، ٢ و٢ = ٤، ٣ و٢ = ٥) لتعرف الرقم الصحيح.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "مجموعات الأشياء",
            leftColumnTitleAr: "الرقم الصحيح",
            customCandidatePairs: K17_OBJECT_QUANTITY_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق كل مجموعة أشياء مع بطاقة تتبّع الرقم المناسبة لها (٤ مجموعات):",
          strategyHintAr:
            "انظر إلى تقسيم العناصر داخل المجموعة ثم صلها بالرقم وتتبّعه.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "الأشياء المصوّرة",
            leftColumnTitleAr: "تتبّع الرقم",
            customCandidatePairs: K17_OBJECT_TRACE_PAIRS,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "طابق المجموعات الأربع بأرقامها ثم أجب عن سؤال التجميع:",
          strategyHintAr: "مجموعة فيها ٣ زهرات وزهرتان (٢) تكوّن ٥ زهرات.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "مجموعات الأشياء",
            leftColumnTitleAr: "الأرقام ١–٥",
            customCandidatePairs: K17_OBJECT_QUANTITY_PAIRS,
            comparisonPromptAr:
              "كيف تساعدنا رؤية (٣ زهرات و٢ زهرتين) على معرفة الكلّ دون العدّ واحداً بواحد؟",
            comparisonAnswerAr:
              "نجمع الجزأين المعروفين (٣ و٢) فنربط المجموعة مباشرة بالرقم ٥",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق جميع الكميات من ١ إلى ٥ مع الأرقام المقابلة (٥ مجموعات):",
          strategyHintAr:
            "لاحظ الأجزاء الفرعية في كل مجموعة وصلها بالرقم الصحيح.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "الكميات ١–٥",
            leftColumnTitleAr: "الأرقام ١–٥",
            customCandidatePairs: K17_OBJECT_QUANTITY_PAIRS,
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل مجموعة أشياء مقسّمة إلى أجزاء بالرقم الذي يمثّل الكل (٥ مجموعات):",
          strategyHintAr:
            "تحقّق من مجموع الجزأين في كل صندوق قبل رسم خط التوصيل إلى الرقم.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "المجموعات والأجزاء",
            leftColumnTitleAr: "الرقم الكلي",
            customCandidatePairs: K17_OBJECT_QUANTITY_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل مجموعة أشياء ببطاقة تتبّع الرقم المناسبة وتتبّع الأرقام من ١ إلى ٥ (٥ مجموعات):",
          strategyHintAr:
            "اربط الكمية المصوّرة برمزها الرقمي وتتبّع الرقم على السطر.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "مجموعات الأشياء",
            leftColumnTitleAr: "تتبّع الأرقام ١–٥",
            customCandidatePairs: K17_OBJECT_TRACE_PAIRS,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل المجموعات الخمس بأرقامها (١–٥) ثم أجب عن سؤال الأجزاء والكل:",
          strategyHintAr:
            "العدد ٥ يمكن رؤيته كمجموعة من (٤ و١) أو كمجموعة من (٣ و٢).",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "المجموعات الخمس",
            leftColumnTitleAr: "الأرقام الخمسة",
            customCandidatePairs: K17_OBJECT_TRACE_PAIRS,
            comparisonPromptAr:
              "مجموعة فيها ٤ نحلات في صفّ ونحلة واحدة (١) بجانبها؛ بأي رقم نصلها؟ ولماذا؟",
            comparisonAnswerAr:
              "نصلها بالرقم ٥ لأن الجزأين ٤ و١ يكوّنان معاً الكل ٥",
          },
        },
      ],
    },
  },
};

// Candidate quantity-to-digit pairs for Lesson K-18 (Match Quantities to 5 with Shapes & Digits)
const K18_SHAPE_AND_SOLID_QUANTITY_PAIRS = [
  {
    id: "shape-qty-1-circle",
    right: createShape2DSpec("circle", {
      count: 1,
      size: "small",
      colorTheme: "coral",
      labelAr: "دائرة واحدة (١)",
    }),
    left: createDigitCardSpec(1),
    reasonAr: "دائرة واحدة (١) تطابق الرقم ١",
  },
  {
    id: "solid-qty-2-cube",
    right: createSolid3DSpec("cube", {
      count: 2,
      size: "small",
      colorTheme: "emerald",
      labelAr: "مكعبان: ١ و١ (٢)",
    }),
    left: createDigitCardSpec(2),
    reasonAr: "مكعبان ثلاثيا الأبعاد (٢) يطابقان الرقم ٢",
  },
  {
    id: "shape-qty-3-triangle",
    right: createShape2DSpec("triangle", {
      count: 3,
      size: "small",
      colorTheme: "amber",
      labelAr: "٣ مثلثات (٢ و١ يساوي ٣)",
    }),
    left: createDigitCardSpec(3),
    reasonAr: "٣ مثلثات مستوية تطابق الرقم ٣",
  },
  {
    id: "solid-qty-4-cylinder",
    right: createSolid3DSpec("cylinder", {
      count: 4,
      size: "small",
      colorTheme: "sky",
      labelAr: "٤ أسطوانات (٢ و٢ يساوي ٤)",
    }),
    left: createDigitCardSpec(4),
    reasonAr: "٤ أسطوانات ثلاثية الأبعاد تطابق الرقم ٤",
  },
  {
    id: "shape-qty-5-hexagon",
    right: createShape2DSpec("hexagon", {
      count: 5,
      size: "small",
      colorTheme: "violet",
      labelAr: "٥ أشكال سداسية (٣ و٢ يساوي ٥)",
    }),
    left: createDigitCardSpec(5),
    reasonAr: "٥ أشكال سداسية تطابق الرقم ٥",
  },
];

const K18_MIXED_GEOMETRY_TRACE_PAIRS = [
  {
    id: "solid-trace-1-sphere",
    right: createSolid3DSpec("sphere", {
      count: 1,
      size: "small",
      colorTheme: "coral",
      labelAr: "كرة واحدة (١)",
    }),
    left: createNumeralTraceSpec({ digit: 1, colorTheme: "coral" }),
    reasonAr: "مجسّم كرة واحد يطابق الرقم ١",
  },
  {
    id: "shape-trace-2-square",
    right: createShape2DSpec("square", {
      count: 2,
      size: "small",
      colorTheme: "sky",
      labelAr: "مربعان (٢)",
    }),
    left: createNumeralTraceSpec({ digit: 2, colorTheme: "sky" }),
    reasonAr: "مربعان يطابقان الرقم ٢",
  },
  {
    id: "solid-trace-3-cone",
    right: createSolid3DSpec("cone", {
      count: 3,
      size: "small",
      colorTheme: "amber",
      labelAr: "٣ مخاريط (٢ و١)",
    }),
    left: createNumeralTraceSpec({ digit: 3, colorTheme: "amber" }),
    reasonAr: "٣ مخاريط تطابق الرقم ٣",
  },
  {
    id: "shape-trace-4-pentagon",
    right: createShape2DSpec("pentagon", {
      count: 4,
      size: "small",
      colorTheme: "violet",
      labelAr: "٤ أشكال خماسية (٢ و٢)",
    }),
    left: createNumeralTraceSpec({ digit: 4, colorTheme: "violet" }),
    reasonAr: "٤ أشكال خماسية تطابق الرقم ٤",
  },
  {
    id: "solid-trace-5-pyramid",
    right: createSolid3DSpec("pyramid", {
      count: 5,
      size: "small",
      colorTheme: "teal",
      labelAr: "٥ أهرامات (٤ و١)",
    }),
    left: createNumeralTraceSpec({ digit: 5, colorTheme: "teal" }),
    reasonAr: "٥ أهرامات تطابق الرقم ٥",
  },
];

export const lessonK18Blueprint: LessonBlueprint = {
  lessonId: "K-18",
  grade: "K",
  lessonNumber: 18,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-18"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-18"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: اعرض مجموعات من الأشكال المستوية (مثلثات، مربعات، سداسيات) والمجسّمات (مكعبات، مخاريط، أسطوانات) من ١ إلى ٥، واطلب من الطلاب تسمية الشكل أولاً ثم مطابقة عدد المجموعة بالرقم الصحيح.",
    commonMisconceptionsAr: [
      "الخلط بين عدد أضلاع الشكل الهندسي (مثل ٣ أضلاع للمثلث) وعدد الأشكال الموجودة في المجموعة (مثل ٤ مثلثات).",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "عدّ الأشكال أو المجسّمات في كل مجموعة وصلها بالرقم المناسب (٣ مجموعات):",
          strategyHintAr:
            "عدّ كم شكلاً أو مجسّماً في المجموعة ثم صلها ببطاقة الرقم المقابل.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "مجموعة الأشكال والمجسّمات",
            leftColumnTitleAr: "الرقم المطابق",
            customCandidatePairs: K18_SHAPE_AND_SOLID_QUANTITY_PAIRS.slice(
              0,
              3
            ),
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل مجموعة من الأشكال المستوية أو المجسّمات والرقم الصحيح (٣ مجموعات):",
          strategyHintAr:
            "سمّ الشكل الهندسي (دائرة، مكعب، مثلث) ثم عدّ كم شكلاً في المجموعة.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "مجموعة الأشكال",
            leftColumnTitleAr: "الرقم",
            customCandidatePairs: K18_SHAPE_AND_SOLID_QUANTITY_PAIRS.slice(
              0,
              4
            ),
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "لاحظ المجموعات الفرعية للأشكال والمجسّمات وصِلْ كل مجموعة برقمها (٣ مجموعات):",
          strategyHintAr:
            "تنبّه: نعدّ عدد الأشكال في المجموعة كلها (وليس عدد أضلاع الشكل الواحد).",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "الأشكال والمجسّمات",
            leftColumnTitleAr: "الرقم الصحيح",
            customCandidatePairs: K18_SHAPE_AND_SOLID_QUANTITY_PAIRS.slice(
              1,
              5
            ),
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كل مجموعة برقمها (٣ مجموعات) ثم أجب:",
          strategyHintAr:
            "فرّق بين اسم الشكل (مثلث له ٣ أضلاع) وعدد المثلثات في المجموعة.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "الأشكال الهندسية",
            leftColumnTitleAr: "الرقم",
            customCandidatePairs: K18_SHAPE_AND_SOLID_QUANTITY_PAIRS.slice(
              1,
              4
            ),
            comparisonPromptAr:
              "إذا كان لدينا ٤ أسطوانات مرتّبة في مجموعتين (٢ و٢)، فبأي رقم نصلها؟",
            comparisonAnswerAr:
              "نصلها بالرقم ٤، لأن ٢ و٢ من الأسطوانات يساوي ٤",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل مجموعة من الأشكال والمجسّمات بالرقم الذي يمثّل عددها (٤ مجموعات):",
          strategyHintAr:
            "عدّ العناصر في كل مجموعة أو اجمع أجزاءها الصغيرة لتصلها بالرقم الصحيح.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "الأشكال والمجسّمات",
            leftColumnTitleAr: "الأرقام",
            customCandidatePairs: K18_SHAPE_AND_SOLID_QUANTITY_PAIRS.slice(
              0,
              4
            ),
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل مجموعة من الأشكال ثنائية أو ثلاثية الأبعاد والرقم الصحيح (٤ مجموعات):",
          strategyHintAr:
            "استخدم التعرّف السريع وتجميع الأجزاء (٢ و١ = ٣، ٢ و٢ = ٤، ٣ و٢ = ٥).",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "مجموعات الأشكال والمجسّمات",
            leftColumnTitleAr: "الرقم المطابق",
            customCandidatePairs: K18_SHAPE_AND_SOLID_QUANTITY_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق كل مجموعة من المجسّمات والأشكال مع بطاقة تتبّع الرقم المقابل (٤ مجموعات):",
          strategyHintAr:
            "راجع أسماء المجسّمات (كرة، مخروط، هرم) أثناء عدّ المجموعة وتتبّع الرقم.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "المجموعة الهندسية",
            leftColumnTitleAr: "تتبّع الرقم",
            customCandidatePairs: K18_MIXED_GEOMETRY_TRACE_PAIRS,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "طابق المجموعات الأربع بأرقامها ثم أجب:",
          strategyHintAr:
            "الشكل السداسي له ٦ أضلاع، لكن إذا كان لدينا ٥ أشكال سداسية فإن عدد المجموعة هو ٥.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "مجموعات هندسية",
            leftColumnTitleAr: "الأرقام",
            customCandidatePairs: K18_SHAPE_AND_SOLID_QUANTITY_PAIRS,
            comparisonPromptAr:
              "مجموعة تحتوي على ٥ أشكال سداسية؛ هل نصلها بالرقم ٥ (عدد الأشكال) أم بالرقم ٦ (عدد أضلاع السداسي)؟",
            comparisonAnswerAr:
              "نصلها بالرقم ٥ لأننا نعدّ عدد الأشكال في المجموعة (٥ أشكال سداسية)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل مجموعات الأشكال والمجسّمات من ١ إلى ٥ بأرقامها (٥ مجموعات):",
          strategyHintAr:
            "استخدم التعرّف السريع على المجموعات الفرعية لمطابقة كل مجموعة برقمها.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "الأشكال والمجسّمات ١–٥",
            leftColumnTitleAr: "الأرقام ١–٥",
            customCandidatePairs: K18_SHAPE_AND_SOLID_QUANTITY_PAIRS,
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق مجموعات الأشكال ثنائية الأبعاد والمجسّمات ثلاثية الأبعاد مع الأرقام (٥ مجموعات):",
          strategyHintAr:
            "سمّ كل شكل أو مجسّم، واجمع أجزاءه الفرعية لتحديد الرقم المطابق.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "مجموعات الأشكال والمجسّمات",
            leftColumnTitleAr: "الرقم الكلي",
            customCandidatePairs: K18_SHAPE_AND_SOLID_QUANTITY_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل مجموعة هندسية ببطاقة تتبّع الرقم المقابل لها وتتبّع الأرقام (٥ مجموعات):",
          strategyHintAr:
            "تأكّد من مطابقة الكرة (١)، المربعين (٢)، المخاريط (٣)، الخماسيات (٤)، والأهرامات (٥).",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "المجموعات الهندسية",
            leftColumnTitleAr: "تتبّع الأرقام ١–٥",
            customCandidatePairs: K18_MIXED_GEOMETRY_TRACE_PAIRS,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صل المجموعات الهندسية الخمس بأرقامها (١–٥) ثم أجب:",
          strategyHintAr:
            "قارن بين مجموعة المكعبين (٢) ومجموعة المخاريط الثلاثة (٣) ومجموعة الأهرامات الخمسة (٥).",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "المجموعات الهندسية",
            leftColumnTitleAr: "الأرقام الخمسة",
            customCandidatePairs: K18_MIXED_GEOMETRY_TRACE_PAIRS,
            comparisonPromptAr:
              "إذا جمعنا مجموعة المكعبين (٢) مع مجموعة المخاريط الثلاثة (٣)، فكم مجسّماً يصبح لدينا؟",
            comparisonAnswerAr: "يصبح لدينا ٥ مجسّمات، لأن ٢ و٣ يساوي ٥",
          },
        },
      ],
    },
  },
};

// Candidate quantity-to-digit pairs for Lesson K-19 (Match Quantities to 5 with Coins & Digits)
// Note: In Lesson K-19, coins are used as unit counters (each coin counts as 1 item) to build familiarity with coin attributes!
const K19_COIN_COUNTER_PAIRS = [
  {
    id: "coin-qty-1",
    right: createCoinSpec(25, {
      count: 1,
      size: "small",
      labelAr: "عملة فضية واحدة (٢٥ قرشاً): ١ قطعة عدّ",
    }),
    left: createDigitCardSpec(1),
    reasonAr: "عملة واحدة كقطعة عدّ (١) تطابق الرقم ١",
  },
  {
    id: "coin-qty-2",
    right: createCoinSpec(50, {
      count: 2,
      size: "small",
      labelAr: "عملتان فضيتان (٥٠ قرشاً): ١ و١ = ٢ قطع عدّ",
    }),
    left: createDigitCardSpec(2),
    reasonAr: "عملتان (٢ كقطع عدّ قيمة كل منها ١ في العدّ) تطابقان الرقم ٢",
  },
  {
    id: "coin-qty-3",
    right: createCoinSpec(100, {
      count: 3,
      size: "small",
      labelAr: "٣ عملات (١ جنيه): ٢ و١ = ٣ قطع عدّ",
    }),
    left: createDigitCardSpec(3),
    reasonAr: "٣ عملات (٢ و١ كقطع عدّ) تطابق الرقم ٣",
  },
  {
    id: "coin-qty-4",
    right: createCoinSpec(25, {
      count: 4,
      size: "small",
      labelAr: "٤ عملات فضية (٢ و٢ = ٤ قطع عدّ)",
    }),
    left: createDigitCardSpec(4),
    reasonAr: "٤ عملات (مجموعتان من ٢ كقطع عدّ) تطابق الرقم ٤",
  },
  {
    id: "coin-qty-5",
    right: createCoinSpec(100, {
      count: 5,
      size: "small",
      labelAr: "٥ عملات (٣ و٢ = ٥ قطع عدّ)",
    }),
    left: createDigitCardSpec(5),
    reasonAr: "٥ عملات (٣ و٢ كقطع عدّ) تطابق الرقم ٥",
  },
];

const K19_COIN_TRACE_PAIRS = [
  {
    id: "coin-trace-1",
    right: createCoinSpec(100, {
      count: 1,
      size: "small",
      labelAr: "عملة واحدة (١ قطعة عدّ)",
    }),
    left: createNumeralTraceSpec({ digit: 1, colorTheme: "amber" }),
    reasonAr: "عملة واحدة تطابق الرقم ١",
  },
  {
    id: "coin-trace-2",
    right: createCoinSpec(25, {
      count: 2,
      size: "small",
      labelAr: "عملتان فضيتان (٢ قطعتا عدّ)",
    }),
    left: createNumeralTraceSpec({ digit: 2, colorTheme: "sky" }),
    reasonAr: "عملتان تطابقان الرقم ٢",
  },
  {
    id: "coin-trace-3",
    right: createCoinSpec(50, {
      count: 3,
      size: "small",
      labelAr: "٣ عملات فضية (٢ و١ = ٣ قطع عدّ)",
    }),
    left: createNumeralTraceSpec({ digit: 3, colorTheme: "teal" }),
    reasonAr: "٣ عملات تطابق الرقم ٣",
  },
  {
    id: "coin-trace-4",
    right: createCoinSpec(100, {
      count: 4,
      size: "small",
      labelAr: "٤ عملات (٢ و٢ = ٤ قطع عدّ)",
    }),
    left: createNumeralTraceSpec({ digit: 4, colorTheme: "amber" }),
    reasonAr: "٤ عملات تطابق الرقم ٤",
  },
  {
    id: "coin-trace-5",
    right: createCoinSpec(25, {
      count: 5,
      size: "small",
      labelAr: "٥ عملات فضية (٤ و١ = ٥ قطع عدّ)",
    }),
    left: createNumeralTraceSpec({ digit: 5, colorTheme: "sky" }),
    reasonAr: "٥ عملات تطابق الرقم ٥",
  },
];

export const lessonK19Blueprint: LessonBlueprint = {
  lessonId: "K-19",
  grade: "K",
  lessonNumber: 19,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-19"].titleAr,
  teacherNotes: {
    ...AUTHORED_LESSON_LOCALIZATION["K-19"].teacherNotes,
    classroomActivityNoteAr:
      "نشاط صفّي: أعطِ الطلاب مجموعات من العملات المعدنية (من ١ إلى ٥ عملات) ليستخدموها كقطع عدّ قيمة كل قطعة منها (١)، واطلب منهم معرفة عدد العملات في كل مجموعة بالتجميع السريع ومطابقتها بالرقم.",
    commonMisconceptionsAr: [
      "قراءة الفئة المكتوبة على العملة (مثل ٥ أو ١٠ أو ٢٥) بدلاً من عدّ عدد العملات نفسها كقطع عدّ (١، ٢، ٣، ٤، ٥).",
    ],
  },
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "نستخدم كل عملة كقطعة عدّ واحدة (١)؛ عدّ العملات في كل مجموعة وصلها بالرقم المناسب (٣ مجموعات):",
          strategyHintAr:
            "عدّ كم عملة معدنية في الصندوق (١، ٢، ٣) وصل المجموعة ببطاقة الرقم المطابق لعدد العملات.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "مجموعة العملات (كقطع عدّ)",
            leftColumnTitleAr: "عدد العملات",
            customCandidatePairs: K19_COIN_COUNTER_PAIRS.slice(0, 3),
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "عدّ عدد العملات في كل مجموعة (كل عملة تُعدّ بـ ١) وصلها بالرقم الصحيح (٣ مجموعات):",
          strategyHintAr:
            "ركّز على عدد العملات في المجموعة (١، ٢، ٣، ٤) وليس الرقم المطبوع وسط العملة.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "مجموعات العملات",
            leftColumnTitleAr: "الرقم المطابق",
            customCandidatePairs: K19_COIN_COUNTER_PAIRS.slice(0, 4),
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "لاحظ المجموعات الفرعية للعملات (٢ و١، ٢ و٢، ٣ و٢) وصِلْ كل مجموعة برقمها (٣ مجموعات):",
          strategyHintAr:
            "انظر كيف تتجمّع العملات معاً لتعرف عددها بسرعة دون عدّ بطيء.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "العملات المعدنية",
            leftColumnTitleAr: "عدد العملات",
            customCandidatePairs: K19_COIN_COUNTER_PAIRS.slice(1, 5),
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كل مجموعة عملات برقمها (٣ مجموعات) ثم أجب:",
          strategyHintAr:
            "عندما نعدّ العملات كقطع عدّ، فإن كل عملة نحسبها بـ ١ مهما كانت فئتها.",
          params: {
            pairCount: 3,
            rightColumnTitleAr: "مجموعة العملات",
            leftColumnTitleAr: "الرقم",
            customCandidatePairs: K19_COIN_COUNTER_PAIRS.slice(0, 3),
            comparisonPromptAr:
              "لدينا ٣ عملات فضية في مجموعة؛ عندما نعدّ العملات كقطع عدّ (كل عملة = ١)، فبأي رقم نصل المجموعة؟",
            comparisonAnswerAr:
              "نصلها بالرقم ٣ لأن عدد العملات في المجموعة هو ٣ عملات",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "عدّ العملات في كل مجموعة كقطع عدّ وصلها بالرقم المناسب (٤ مجموعات):",
          strategyHintAr:
            "كل دائرة معدنية تمثّل عملة واحدة؛ عدّها أو اجمع أجزاءها الصغيرة.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "مجموعات العملات",
            leftColumnTitleAr: "الأرقام",
            customCandidatePairs: K19_COIN_COUNTER_PAIRS.slice(0, 4),
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل بخط بين كل مجموعة عملات (من ١ إلى ٥ عملات) والرقم الصحيح الذي يمثّل عددها (٤ مجموعات):",
          strategyHintAr:
            "استخدم التجميع السريع: عملتان وواحدة = ٣، عملتان وعملتان = ٤، ثلاث عملات وعملتان = ٥.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "مجموعات العملات (١–٥)",
            leftColumnTitleAr: "الرقم الصحيح",
            customCandidatePairs: K19_COIN_COUNTER_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق كل مجموعة عملات مع بطاقة تتبّع الرقم المقابل لعددها (٤ مجموعات):",
          strategyHintAr:
            "لاحظ لون العملات (نحاسي، فضي، ذهبي) وعدّ كم عملة في كل مجموعة.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "العملات النقدية",
            leftColumnTitleAr: "تتبّع الرقم",
            customCandidatePairs: K19_COIN_TRACE_PAIRS,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "طابق المجموعات الأربع بأرقامها ثم أجب عن السؤال:",
          strategyHintAr:
            "لا تنخدع بالرقم المكتوب على العملة؛ المطلوب هو عدد قطع العملات في المجموعة.",
          params: {
            pairCount: 4,
            rightColumnTitleAr: "مجموعات العملات",
            leftColumnTitleAr: "الأرقام",
            customCandidatePairs: K19_COIN_COUNTER_PAIRS,
            comparisonPromptAr:
              "مجموعة فيها عملتان فقط مكتوب على كل منهما ٥؛ هل عدد العملات في المجموعة هو ٢ أم ٥؟",
            comparisonAnswerAr:
              "عدد العملات في المجموعة هو ٢ (لأن لدينا قطعتين اثنتين من العملات)",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل مجموعات العملات الخمس (من ١ إلى ٥ عملات) بأرقامها (٥ مجموعات):",
          strategyHintAr: "عدّ قطع العملات في كل مجموعة وصلها بالرقم المطابق.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "مجموعات العملات ١–٥",
            leftColumnTitleAr: "الأرقام ١–٥",
            customCandidatePairs: K19_COIN_COUNTER_PAIRS,
          },
        },
      ],
      practice: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "طابق كل مجموعة عملات (باعتبار كل عملة قطعة عدّ = ١) مع الرقم الصحيح (٥ مجموعات):",
          strategyHintAr:
            "اجمع المجموعات الفرعية للعملات لتحديد الكلّ من ١ إلى ٥ بسرعة.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "مجموعات العملات",
            leftColumnTitleAr: "عدد العملات الكلي",
            customCandidatePairs: K19_COIN_COUNTER_PAIRS,
          },
        },
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل مجموعة عملات ببطاقة تتبّع الرقم المقابل لعددها وتتبّع الأرقام (٥ مجموعات):",
          strategyHintAr:
            "تأكّد من توصيل كل كمية من ١ إلى ٥ ببطاقة تتبّع الرقم المناسبة.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "العملات المعدنية",
            leftColumnTitleAr: "تتبّع الأرقام ١–٥",
            customCandidatePairs: K19_COIN_TRACE_PAIRS,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صل مجموعات العملات الخمس بأرقامها (١–٥) ثم أجب عن سؤال التفكير:",
          strategyHintAr:
            "مجموعة من ٤ عملات ذهبية وعملة واحدة إضافية تكوّن ٥ عملات.",
          params: {
            pairCount: 5,
            rightColumnTitleAr: "مجموعات العملات الخمس",
            leftColumnTitleAr: "الأرقام الخمسة",
            customCandidatePairs: K19_COIN_TRACE_PAIRS,
            comparisonPromptAr:
              "لدينا ٣ عملات نحاسية وعملتان فضيتان (٢)؛ كم عملة لدينا عند عدّ كل عملة بـ ١؟",
            comparisonAnswerAr: "لدينا ٥ عملات، لأن ٣ و٢ يساوي ٥",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK17Blueprint);
registerLessonBlueprint(lessonK18Blueprint);
registerLessonBlueprint(lessonK19Blueprint);
