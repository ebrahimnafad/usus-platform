import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

export const lessonK27Blueprint: LessonBlueprint = {
  lessonId: "K-27",
  grade: "K",
  lessonNumber: 27,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-27"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-27"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "لاحظ الجزأين على لوحة الخمسة وتتبّع الجزأين واكتب الكلّ:",
          strategyHintAr:
            "انظر إلى الأقراص في كل جزء على لوحة الخمسة ثم اجمع الجزأين لمعرفة الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
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
          promptAr: "عدّ الصّور في كل جزء، وتتبّع الجزأين ثم اكتب كم في الكلّ:",
          strategyHintAr: "عدّ عناصر الجزأين، ثم اكتب الكلّ في الخانة.",
          params: {
            representation: "pictures",
            responseForm: "parts-table",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "استخدم لوحة الخمسة لتحديد الجزأين، وتتبّع كل جزء ثم اكتب الكلّ:",
          strategyHintAr:
            "الأقراص ذات اللون الأول تمثّل الجزء الأول، والأقراص ذات اللون الثاني تمثّل الجزء الثاني.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل لوحة خمسة بجدول الأجزاء والكلّ المطابق، ثم اكتب الكلّ المفقود:",
          strategyHintAr:
            "طابق عدد الأقراص في الجزأين على لوحة الخمسة مع رقمي الجزأين في الجدول، ثم اكتب الكلّ.",
          params: {
            matchingMode: "five-frame-to-parts-table",
            totalRange: [2, 4],
            minPart: 1,
            pairCount: 3,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "كم شكلاً مستوياً؟ عدّ كل جزء وتتبّع الجزأين واكتب كم في الكلّ:",
          strategyHintAr:
            "عدّ الأشكال المستوية في الجزأين واكتب الكلّ في خانة الكلّ.",
          params: {
            representation: "pictures",
            pictureSubkind: "flat-shapes",
            responseForm: "parts-table",
            action: "trace",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "لاحظ الجزأين على لوحة الخمسة واكتب الكلّ في جدول الأجزاء والكلّ:",
          strategyHintAr:
            "تعرّف على عدد الأقراص في كل جزء دون عدّ فردي ثم اكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
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
            "عدّ الصّور في كل مجموعة (الجزء الأول والجزء الثاني) ثم اكتب كم في الكلّ:",
          strategyHintAr:
            "ضمّ الجزء الأول والجزء الثاني معاً لمعرفة الكلّ للصور.",
          params: {
            representation: "pictures",
            responseForm: "parts-table",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "حدّد الجزأين على لوحة الخمسة بالتعرّف السريع، ثم اكتب الكلّ في الجدول:",
          strategyHintAr:
            "استخدم الخانات المملوءة والفارغة على لوحة الخمسة لمعرفة الكلّ بسرعة.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل لوحة خمسة بجدول الأجزاء والكلّ المطابق، ثم اكتب الكلّ المفقود:",
          strategyHintAr:
            "انظر إلى الجزأين على لوحة الخمسة وفي الجدول، ثم اكتب الكلّ في المربع.",
          params: {
            matchingMode: "five-frame-to-parts-table",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 3,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "كم شكلاً مستوياً في الكلّ؟ عدّ الجزأين واكتب الكلّ:",
          strategyHintAr:
            "اجمع عدد الأشكال المستوية في الجزأين لتحصل على الكلّ.",
          params: {
            representation: "pictures",
            pictureSubkind: "flat-shapes",
            responseForm: "parts-table",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "ارسم الأقراص لإكمال الجزأين على لوحة الخمسة واكتب الكلّ:",
          strategyHintAr: "أكمل رسم الأقراص المنقّطة ثم اكتب الكلّ في الجدول.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
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
            "ارسم الأقراص لتمثيل الجزء الثاني على لوحة الخمسة، ثم اكتب الكلّ في الجدول:",
          strategyHintAr:
            "حتّى عندما يكون أحد الجزأين صفراً (٠)، فإن الكلّ يساوي مجموع الجزأين.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
            action: "draw-counters",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "عدّ الصّور في الجزأين واكتب الجزء الناقص في جدول الأجزاء والكلّ:",
          strategyHintAr:
            "اسأل نفسك: كم نحتاج مع الجزء الأول للوصول إلى الكلّ؟",
          params: {
            representation: "pictures",
            responseForm: "parts-table",
            action: "write",
            unknownPosition: "part2",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل لوحة خمسة بجدول الأجزاء والكلّ المطابق، ثم اكتب الكلّ المفقود:",
          strategyHintAr:
            "انتبه إلى الأجزاء التي تحتوي على صفر (٠) عند المطابقة وكتابة الكلّ.",
          params: {
            matchingMode: "five-frame-to-parts-table",
            totalRange: [2, 5],
            minPart: 0,
            pairCount: 3,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "كم شكلاً مستوياً؟ أكمل الجزء الناقص في جدول الأجزاء والكلّ:",
          strategyHintAr:
            "عدّ الأشكال المستوية وقارنها بالكلّ لمعرفة الجزء الناقص.",
          params: {
            representation: "pictures",
            pictureSubkind: "flat-shapes",
            responseForm: "parts-table",
            action: "write",
            unknownPosition: "part2",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK27Blueprint);

export const lessonK28Blueprint: LessonBlueprint = {
  lessonId: "K-28",
  grade: "K",
  lessonNumber: 28,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-28"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-28"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "لاحظ الجزأين المحاطين على لوحة الخمسة وتتبّع الجزأين واكتب الكلّ:",
          strategyHintAr:
            "كل إطار متقطّع يحيط بجزء واحد؛ اجمع الجزأين معاً لتحصل على الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
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
          promptAr: "تتبّع الجزأين والكلّ الممثّلة على كل لوحة خمسة:",
          strategyHintAr:
            "اربط بين عدد الأقراص في كل جزء محاط على لوحة الخمسة والرقم الذي تتبّعه تحت كلمة «الجزء».",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "اقرأ كلمتي «الجزء» و«الكلّ»، وتتبّع الجزأين ثم اكتب الكلّ لكل لوحة خمسة:",
          strategyHintAr:
            "الكلّ هو مجموع الأقراص في الجزأين معاً على لوحة الخمسة.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
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
            "صِلْ كل لوحة خمسة بجدول الأجزاء والكلّ المطابق، ثم اكتب الكلّ المفقود:",
          strategyHintAr:
            "لاحظ عدد الأقراص في كل جزء محاط على لوحة الخمسة وطابقه مع الجدول الصحيح.",
          params: {
            matchingMode: "five-frame-to-parts-table",
            totalRange: [2, 4],
            minPart: 1,
            pairCount: 3,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "كم مجسّماً ثلاثي الأبعاد في الكلّ؟ أكمل نموذج الأجزاء والكلّ:",
          strategyHintAr:
            "عدّ المجسّمات في كل جزء ثم اكتب مجموعها في خانة الكلّ.",
          params: {
            representation: "pictures",
            pictureSubkind: "solid-shapes",
            responseForm: "parts-table",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "حدّد الجزأين المحاطين على لوحة الخمسة واكتب الكلّ:",
          strategyHintAr: "استخدم التعرّف السريع لمعرفة عدد كل جزء والكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
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
            "حدّد الجزأين الموضّحين على كل لوحة خمسة واكتب الكلّ في جدول الأجزاء والكلّ:",
          strategyHintAr:
            "عدّ أو تعرّف بسرعة على الأقراص في الجزء الأيمن والجزء الأيسر ثم اكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "اقرأ الجزأين على لوحة الخمسة وأكمل كتابة الكلّ في نموذج الأجزاء والكلّ:",
          strategyHintAr:
            "تأكّد من أن الكلّ يساوي مجموع الجزأين الأول والثاني.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
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
            "صِلْ كل لوحة خمسة بجدول الأجزاء والكلّ المطابق، ثم اكتب الكلّ المفقود:",
          strategyHintAr:
            "طابق الجزأين من اليمين إلى اليسار ثم اكتب الكلّ في الخانة المخصّصة.",
          params: {
            matchingMode: "five-frame-to-parts-table",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 3,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "كم مجسّماً ثلاثي الأبعاد في الكلّ؟ أكمل نموذج الأجزاء والكلّ:",
          strategyHintAr:
            "اجمع عدد المجسّمات في الجزء الأول والجزء الثاني لإيجاد الكلّ.",
          params: {
            representation: "pictures",
            pictureSubkind: "solid-shapes",
            responseForm: "parts-table",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "ارسم الأقراص لإكمال الجزأين على لوحة الخمسة واكتب الكلّ:",
          strategyHintAr: "لوّن الأقراص المنقّطة للجزء الثاني ثم اكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
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
            "ارسم الأقراص لإكمال تمثيل الجزأين على لوحة الخمسة واكتب الكلّ في الجدول:",
          strategyHintAr: "لاحظ قيمة كل جزء (بما فيها الصفر ٠) ثم اكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
            action: "draw-counters",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص على لوحة الخمسة وأكمل الجزء الناقص للوصول إلى الكلّ:",
          strategyHintAr:
            "عدّ الأقراص المرسومة في الجزء الثاني لتعرف الجزء الناقص في الجدول.",
          params: {
            representation: "five-frame",
            responseForm: "parts-table",
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
          promptAr:
            "صِلْ كل لوحة خمسة بجدول الأجزاء والكلّ المطابق، ثم اكتب الكلّ المفقود:",
          strategyHintAr: "قارن الجزأين بعناية واكتب الكلّ في كل صفّ.",
          params: {
            matchingMode: "five-frame-to-parts-table",
            totalRange: [2, 5],
            minPart: 0,
            pairCount: 3,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "كم مجسّماً ثلاثي الأبعاد؟ أوجد الجزء الناقص في جدول الأجزاء والكلّ:",
          strategyHintAr:
            "قارن بين الكلّ والجزء الأول لمعرفة عدد المجسّمات في الجزء الثاني.",
          params: {
            representation: "pictures",
            pictureSubkind: "solid-shapes",
            responseForm: "parts-table",
            action: "write",
            unknownPosition: "part2",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK28Blueprint);

export const lessonK29Blueprint: LessonBlueprint = {
  lessonId: "K-29",
  grade: "K",
  lessonNumber: 29,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-29"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-29"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "انظر إلى الجزأين على لوحة الخمسة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "الدائرتان في الأسفل تمثّلان الجزأين (نبدأ من اليمين)، والدائرة العلوية تمثّل الكلّ.",
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
            "استخدم لوحة الخمسة لإيجاد الكلّ، وتتبّع الجزأين ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص في الجزأين على لوحة الخمسة، ثم اكتب الكلّ في الدائرة.",
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
          promptAr:
            "لاحظ الجزأين على لوحة الخمسة وفي رابطة الأعداد، وتتبّع الجزأين واكتب الكلّ:",
          strategyHintAr:
            "يجتمع الجزء الأول والجزء الثاني معاً في الدائرة العلوية لتكوين الكلّ.",
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
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل لوحة خمسة برابطة الأعداد المناسبة، ثم اكتب الكلّ في الدائرة:",
          strategyHintAr:
            "طابق الجزأين على لوحة الخمسة مع دائرتي الجزأين في رابطة الأعداد، ثم اكتب الكلّ.",
          params: {
            matchingMode: "five-frame-to-number-bond",
            totalRange: [2, 4],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "كم في كل جزء؟ وكم في الكلّ؟ أكمل رابطة الأعداد:",
          strategyHintAr:
            "عدّ كل جزء على لوحة الخمسة ثم اكتب الكلّ في الدائرة العلوية.",
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
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "استخدم لوحة الخمسة لإيجاد الكلّ واكتبه في رابطة الأعداد:",
          strategyHintAr:
            "ضمّ الجزأين الملوّنين على لوحة الخمسة واكتب الكلّ في الأعلى.",
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
          promptAr:
            "استخدم لوحة الخمسة لإيجاد الكلّ واكتبه في دائرة الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "لاحظ الجزأين في الأسفل (يمين ويسار) واجمع بينهما لكتابة الكلّ في الدائرة العلوية.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ضمّ الجزأين بالتعرّف السريع على لوحة الخمسة، واكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "تعرّف على الكلّ من عدد الخانات المملوءة على لوحة الخمسة دون العدّ واحداً بواحد.",
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
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل لوحة خمسة برابطة الأعداد المناسبة، ثم اكتب الكلّ في الدائرة:",
          strategyHintAr:
            "ابحث عن رابطة الأعداد التي تحمل نفس الجزأين من اليمين إلى اليسار ثم اكتب الكلّ.",
          params: {
            matchingMode: "five-frame-to-number-bond",
            totalRange: [2, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "كم في كل جزء؟ وكم في الكلّ؟ أكمل رابطة الأعداد:",
          strategyHintAr: "اجمع الجزأين للوصول إلى الكلّ في رابطة الأعداد.",
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
    },
    Advanced: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "ارسم الأقراص على لوحة الخمسة وأكمل رابطة الأعداد:",
          strategyHintAr: "ارسم الجزء الثاني على لوحة الخمسة ثم اكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
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
            "ارسم الأقراص لإكمال الجزأين على لوحة الخمسة واكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "عند إضافة صفر (٠) إلى أي جزء، يبقى الكلّ مساوياً لذلك الجزء.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "استخدم لوحة الخمسة لإيجاد الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الكلّ وإلى الجزء الأول لتعرف كم نحتاج في الجزء الثاني.",
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
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل لوحة خمسة برابطة الأعداد المناسبة، ثم اكتب الكلّ في الدائرة:",
          strategyHintAr: "طابق الجزأين بدقّة واكتب الكلّ في الدائرة العلوية.",
          params: {
            matchingMode: "five-frame-to-number-bond",
            totalRange: [2, 5],
            minPart: 0,
            pairCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "كم نحتاج أكثر للوصول إلى الكلّ؟ أكمل الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص المكمّلة للكلّ واكتب العدد في دائرة الجزء الناقص.",
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
    },
  },
};

registerLessonBlueprint(lessonK29Blueprint);

export const lessonK30Blueprint: LessonBlueprint = {
  lessonId: "K-30",
  grade: "K",
  lessonNumber: 30,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-30"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-30"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "انظر إلى الجزأين، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr: "تخيّل الجزأين على لوحة الخمسة ثم تحقّق من الكلّ.",
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
            "استخدم لوحة الخمسة لإيجاد الكلّ واكتبه في رابطة الأعداد (المثال الأول محلول للتتبّع):",
          strategyHintAr:
            "تتبّع المثال الأول المحلول، ثم أوجد الكلّ في المثال الثاني بالطريقة نفسها.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "trace",
            firstItemWorkedExample: true,
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "تخيّل الجزأين على لوحة الخمسة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الجزأين على لوحة الخمسة، ثم اكتب الكلّ في الدائرة.",
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
          archetype: "JoinParts",
          promptAr:
            "ارسم ولوّن العدد الصحيح من الأقراص على لوحة الخمسة، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "لوّن أقراص الجزء الثاني المنقّطة على لوحة الخمسة ثم اكتب الكلّ في أعلى رابطة الأعداد.",
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
          promptAr:
            "ارسم الجزأين على لوحة الخمسة ثم أوجد الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "تحقّق من تفكيرك برسم الأقراص في لوحة الخمسة ثم عدّ الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "تخيّل الجزأين على لوحة الخمسة واكتب الكلّ في رابطة الأعداد:",
          strategyHintAr: "استخدم بنية لوحة الخمسة لمعرفة الكلّ بسرعة.",
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
          promptAr:
            "استخدم لوحة الخمسة لإيجاد الكلّ واكتبه في رابطة الأعداد (المثال الأول محلول):",
          strategyHintAr:
            "راجع المثال الأول المحلول، ثم اجمع الجزأين في المثال الثاني واكتب الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "write",
            firstItemWorkedExample: true,
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "تخيّل الجزأين ذهنياً على لوحة الخمسة ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "تحقّق من إجابتك بملاحظة عدد الأقراص على لوحة الخمسة.",
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
          archetype: "JoinParts",
          promptAr:
            "ارسم ولوّن الأقراص على لوحة الخمسة، ثم اكتب الكلّ في أعلى رابطة الأعداد:",
          strategyHintAr:
            "ارسم الأقراص المنقّطة للجزء الثاني، ثم اكتب مجموع الجزأين في دائرة الكلّ.",
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
          promptAr: "ارسم الجزأين على لوحة الخمسة وأوجد الكلّ:",
          strategyHintAr:
            "ضمّ الجزء الأول والجزء الثاني على لوحة الخمسة واكتب الكلّ في رابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص على لوحة الخمسة واكتب الكلّ في رابطة الأعداد:",
          strategyHintAr: "مثّل الجزأين على لوحة الخمسة ثم اكتب الكلّ.",
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
            "ارسم الأقراص لإكمال لوحة الخمسة واكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "تخيّل الجزأين أولاً ثم ارسم الأقراص للتحقّق من الكلّ.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "ارسم الأقراص لإكمال الكلّ على لوحة الخمسة واكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "قارن بين الكلّ والجزء الأول لمعرفة كم قرصاً نرسمه في الجزء الثاني.",
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
          archetype: "JoinParts",
          promptAr:
            "ارسم ولوّن الأقراص على لوحة الخمسة، ثم اكتب الكلّ في أعلى رابطة الأعداد:",
          strategyHintAr:
            "مثّل كل جزء بلونه على لوحة الخمسة ثم اكتب الكلّ في الدائرة العلوية.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-counters",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "ارسم الجزأين وأوجد الجزء الناقص للوصول إلى الكلّ:",
          strategyHintAr:
            "عدّ الأقراص التي رسمتها لإكمال الكلّ واكتب عددها في دائرة الجزء الناقص.",
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
    },
  },
};

registerLessonBlueprint(lessonK30Blueprint);

export const lessonK31Blueprint: LessonBlueprint = {
  lessonId: "K-31",
  grade: "K",
  lessonNumber: 31,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-31"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-31"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "JoinParts",
          promptAr: "عدّ المكعبات في كل جزء، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr: "عدّ المكعبات في الجزأين، ثم اكتب الكلّ في الدائرة.",
          params: {
            representation: "snap-cubes",
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
          promptAr: "عدّ المكعبات المتداخلة وعلامات العدّ، ثم اكتب الكلّ:",
          strategyHintAr:
            "ضمّ الجزأين معاً سواء كانا مكعبات متداخلة أو علامات عدّ واكتب الكلّ.",
          params: {
            allowedRepresentations: ["snap-cubes", "tally-marks"],
            responseForm: "number-bond",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "عدّ نقاط النرد والمكعبات في كل جزء، وتتبّع الجزأين ثم اكتب الكلّ:",
          strategyHintAr:
            "تعرّف على عدد النقاط في كل جزء واجمعها لكتابة الكلّ في رابطة الأعداد.",
          params: {
            allowedRepresentations: ["dice", "snap-cubes"],
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
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل حجر نرد أو دومينو برابطة الأعداد المناسبة، ثم اكتب الكلّ في الدائرة:",
          strategyHintAr:
            "طابق الجزأين الممثّلين بالنقاط مع دائرتي الجزأين في رابطة الأعداد، ثم اكتب الكلّ.",
          params: {
            matchingMode: "dice-to-number-bond",
            totalRange: [2, 4],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "كم نقطة على بطاقة الدومينو؟ تتبّع الجزأين وأوجد الكلّ:",
          strategyHintAr:
            "عدّ النقاط في الشقّ الأيمن والشقّ الأيسر من بطاقة الدومينو واكتب الكلّ.",
          params: {
            representation: "domino",
            responseForm: "number-bond",
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
            "عدّ المكعبات المتداخلة في كل جزء واكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "اجمع مكعبات الجزء الأيمن والجزء الأيسر للوصول إلى الكلّ.",
          params: {
            representation: "snap-cubes",
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
          promptAr:
            "عدّ المكعبات المتداخلة وعلامات العدّ، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "لاحظ عدد كل جزء في المكعبات أو علامات العدّ ثم اكتب الكلّ.",
          params: {
            allowedRepresentations: ["snap-cubes", "tally-marks"],
            responseForm: "number-bond",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "عدّ نقاط النرد وعلامات العدّ، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr: "تعرّف بسرعة على كل جزء ثم ضمّ الجزأين لإيجاد الكلّ.",
          params: {
            allowedRepresentations: ["dice", "tally-marks"],
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
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل بطاقة نرد برابطة الأعداد المناسبة، ثم اكتب الكلّ في الدائرة:",
          strategyHintAr:
            "قارن بين نقاط الجزأين والعددين في أسفل رابطة الأعداد، ثم اكتب الكلّ.",
          params: {
            matchingMode: "dice-to-number-bond",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr: "كم نقطة على كل بطاقة دومينو؟ أوجد الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "اجمع نقاط الشقّين الأيمن والأيسر لبطاقة الدومينو واكتب الكلّ.",
          params: {
            representation: "domino",
            responseForm: "number-bond",
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
          promptAr: "أوجد الكلّ باستخدام بطاقات الدومينو ورابطة الأعداد:",
          strategyHintAr: "لاحظ أن الشقّ الفارغ على الدومينو يمثّل الصفر (٠).",
          params: {
            representation: "domino",
            responseForm: "number-bond",
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
            "عدّ المكعبات المتداخلة وعلامات العدّ، ثم اكتب الكلّ في رابطة الأعداد:",
          strategyHintAr:
            "اجمع الجزأين في كل نموذج محسوس واكتب الكلّ في الدائرة العلوية.",
          params: {
            allowedRepresentations: ["snap-cubes", "tally-marks"],
            responseForm: "number-bond",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "استخدم بطاقات الدومينو لإيجاد الكلّ أو الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "قارن بين نقاط شقّي الدومينو (حتى عندما يكون أحدهما صفراً ٠) وأكمل الدائرة المفقودة.",
          params: {
            representation: "domino",
            responseForm: "number-bond",
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
            "صِلْ كل بطاقة نرد أو دومينو برابطة الأعداد المناسبة، ثم اكتب الكلّ في الدائرة:",
          strategyHintAr:
            "طابق الجزأين بدقّة ثم اكتب الكلّ في الدائرة العلوية.",
          params: {
            matchingMode: "dice-to-number-bond",
            totalRange: [2, 5],
            minPart: 0,
            pairCount: 2,
          },
        },
        {
          archetype: "JoinParts",
          promptAr:
            "كم نقطة على كل بطاقة دومينو؟ أوجد الجزء الناقص للوصول إلى الكلّ:",
          strategyHintAr:
            "انظر إلى الشقّ الثاني من بطاقة الدومينو لتعرف الجزء الناقص في رابطة الأعداد.",
          params: {
            representation: "domino",
            responseForm: "number-bond",
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

registerLessonBlueprint(lessonK31Blueprint);
