import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

export const lessonK42Blueprint: LessonBlueprint = {
  lessonId: "K-42",
  grade: "K",
  lessonNumber: 42,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-42"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-42"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب، ثم اكتب الجزء الناقص بعد علامة =.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح لإكمال كل معادلة طرح، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الأقراص المشطوبة، ثم اكتب الجزء الناقص في المعادلة ورابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            showCompanionBond: true,
            action: "trace",
            crossOffMode: "shown",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الأقراص المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة للتحقّق، ثم اكتب الجزء الناقص في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
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
            "صِلْ كل رابطة أعداد بمعادلة الطرح المطابقة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "صِلْ كل رابطة أعداد بمعادلتها، ثم اكتب الجزء الناقص في المربع.",
          params: {
            operation: "subtract",
            matchingMode: "number-bond-to-equation",
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "معادلة الطرح",
            totalRange: [2, 4],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح لإيجاد الجزء الناقص، ثم اكتب العدد في معادلة الطرح:",
          strategyHintAr:
            "عدّ الأقراص المتبقية على لوحة الخمسة، ثم اكتب الجزء الناقص بعد علامة =.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
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
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "اطرح الجزء المشطوب من الكلّ، ثم اكتب الجزء الناقص في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح لإكمال كل معادلة طرح، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "اطرح الجزء المشطوب من الكلّ، ثم اكتب الجزء الناقص في المعادلة ورابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            showCompanionBond: true,
            action: "write",
            crossOffMode: "shown",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الأقراص المشطوبة للتحقّق، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
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
            "صِلْ كل رابطة أعداد بمعادلة الطرح المطابقة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "صِلْ كل رابطة أعداد بمعادلة الطرح المطابقة، ثم اكتب كم بقي.",
          params: {
            operation: "subtract",
            matchingMode: "number-bond-to-equation",
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "معادلة الطرح",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح لإيجاد الجزء الناقص، ثم اكتب العدد في معادلة الطرح:",
          strategyHintAr:
            "اشطب الجزء المعطى على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
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
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء المعطى على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "اشطب الأقراص على لوحة الخمسة، ثم اكتب كم بقي في معادلة الطرح.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "اطرح لإكمال كل معادلة طرح، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الأقراص المشطوبة (بما فيها الصفر ٠)، ثم اكتب الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            showCompanionBond: true,
            action: "write",
            crossOffMode: "shown",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى الأقراص المشطوبة للتحقّق، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "عدّ الأقراص المشطوبة على لوحة الخمسة، ثم اكتب الجزء في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            unknownPosition: "partTakenAway",
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
            "صِلْ كل رابطة أعداد بمعادلة الطرح المطابقة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "صِلْ كل رابطة أعداد بمعادلتها، ثم اكتب الجزء الناقص في المربع.",
          params: {
            operation: "subtract",
            matchingMode: "number-bond-to-equation",
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "معادلة الطرح",
            totalRange: [2, 5],
            minPart: 0,
            pairCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح لإيجاد الجزء الناقص، ثم اكتب العدد في معادلة الطرح:",
          strategyHintAr:
            "اشطب الجزء على لوحة الخمسة ليبقى العدد المعطى، ثم اكتب الجزء في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-and-cross-off",
            unknownPosition: "partTakenAway",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK42Blueprint);

export const lessonK43Blueprint: LessonBlueprint = {
  lessonId: "K-43",
  grade: "K",
  lessonNumber: 43,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-43"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-43"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص لإكمال كل معادلة طرح:",
          strategyHintAr:
            "انظر إلى الأقراص المشطوبة على لوحة الخمسة، ثم اكتب كم بقي في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "عدّ الأقراص المتبقية على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "اطرح الجزء المشطوب من الكلّ على لوحة الخمسة، ثم اكتب الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
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
            "صِلْ كل لوحة خمسة بمعادلة الطرح المطابقة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "صِلْ كل لوحة خمسة بمعادلة الطرح المطابقة، ثم اكتب كم بقي.",
          params: {
            operation: "subtract",
            matchingMode: "five-frame-to-equation",
            rightColumnTitleAr: "لوحة الخمسة",
            leftColumnTitleAr: "معادلة الطرح",
            totalRange: [2, 4],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح لإيجاد الجزء الناقص، ثم اكتب العدد في معادلة الطرح:",
          strategyHintAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص بعد علامة =.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
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
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "اطرح الجزء المشطوب من الكلّ، ثم اكتب الجزء الناقص بعد علامة =.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص لإكمال كل معادلة طرح:",
          strategyHintAr:
            "اطرح الجزء المشطوب من الكلّ على لوحة الخمسة، ثم اكتب كم بقي في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء المعطى على لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "اشطب الأقراص بمقدار الجزء المأخوذ من اليسار، ثم اكتب كم بقي في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
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
            "صِلْ كل لوحة خمسة بمعادلة الطرح المطابقة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "صِلْ كل لوحة خمسة بمعادلتها، ثم اكتب الجزء الناقص في المربع.",
          params: {
            operation: "subtract",
            matchingMode: "five-frame-to-equation",
            rightColumnTitleAr: "لوحة الخمسة",
            leftColumnTitleAr: "معادلة الطرح",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح لإيجاد الجزء الناقص، ثم اكتب العدد في معادلة الطرح:",
          strategyHintAr:
            "اشطب الجزء المعطى على لوحة الخمسة، ثم اكتب كم بقي في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
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
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء المعطى على لوحة الخمسة، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "اشطب الأقراص على لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
            totalRange: [2, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "لوّن أقراص الكلّ على لوحة الخمسة، ثم اشطب الجزء واكتب كم بقي في المعادلة:",
          strategyHintAr:
            "لوّن أقراص الكلّ على لوحة الخمسة، ثم اشطب الجزء المأخوذ واكتب كم بقي.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-and-cross-off",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء على لوحة الخمسة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "اشطب الأقراص ليبقى العدد المعطى على لوحة الخمسة، ثم اكتب الجزء المشطوب في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
            unknownPosition: "partTakenAway",
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
            "صِلْ كل لوحة خمسة بمعادلة الطرح المطابقة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "صِلْ كل لوحة خمسة بمعادلتها (بما فيها الصفر ٠)، ثم اكتب الجزء الناقص.",
          params: {
            operation: "subtract",
            matchingMode: "five-frame-to-equation",
            rightColumnTitleAr: "لوحة الخمسة",
            leftColumnTitleAr: "معادلة الطرح",
            totalRange: [2, 5],
            minPart: 0,
            pairCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح لإيجاد الجزء الناقص، ثم اكتب العدد في معادلة الطرح:",
          strategyHintAr:
            "اشطب الجزء على لوحة الخمسة ليبقى العدد المعطى، ثم اكتب الجزء في المعادلة.",
          params: {
            representation: "five-frame",
            responseForm: "equation",
            action: "draw-and-cross-off",
            unknownPosition: "partTakenAway",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK43Blueprint);

export const lessonK44Blueprint: LessonBlueprint = {
  lessonId: "K-44",
  grade: "K",
  lessonNumber: 44,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-44"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-44"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى المكعبات المتداخلة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "عدّ المكعبات غير المشطوبة، ثم اكتب الجزء الناقص بعد علامة =.",
          params: {
            representation: "snap-cubes",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى المكعبات المتداخلة وعلامات العدّ، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "عدّ العناصر المتبقية بعد الشطب في كل نموذج، ثم اكتب الجزء الناقص في المعادلة.",
          params: {
            allowedRepresentations: ["snap-cubes", "tally-marks"],
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى نقاط النرد والمكعبات، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "عدّ النقاط أو المكعبات غير المشطوبة، ثم اكتب الجزء الناقص بعد علامة =.",
          params: {
            allowedRepresentations: ["dice", "snap-cubes"],
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى التمثيل البياني بالصور لمعرفة الكلّ، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "عدّ صور كل فئة لمعرفة الكلّ، ثم اطرح الجزء المعطى في المعادلة.",
          params: {
            representation: "picture-graph",
            responseForm: "equation",
            action: "trace",
            totalRange: [2, 4],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح لإيجاد الجزء الناقص، ثم اكتب العدد في معادلة الطرح:",
          strategyHintAr:
            "انظر إلى نقاط النرد المشطوبة والمتبقية، ثم اكتب الجزء الناقص في المعادلة.",
          params: {
            representation: "dice",
            responseForm: "equation",
            action: "trace",
            crossOffMode: "shown",
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
          archetype: "TakeAway",
          promptAr:
            "انظر إلى المكعبات المتداخلة، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "اطرح المكعبات المشطوبة من الكلّ، ثم اكتب كم بقي في المعادلة.",
          params: {
            representation: "snap-cubes",
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى المكعبات المتداخلة وعلامات العدّ، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "اطرح الجزء المشطوب من الكلّ في كل نموذج، ثم اكتب الجزء الناقص في المعادلة.",
          params: {
            allowedRepresentations: ["snap-cubes", "tally-marks"],
            responseForm: "equation",
            action: "write",
            crossOffMode: "shown",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء المعطى على نقاط النرد وعلامات العدّ، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "اشطب العناصر بمقدار الجزء المأخوذ، ثم اكتب كم بقي في معادلة الطرح.",
          params: {
            allowedRepresentations: ["dice", "tally-marks"],
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى التمثيل البياني بالصور لمعرفة الكلّ، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "عدّ صور كل فئة لمعرفة الكلّ، ثم اطرح الجزء المعطى في المعادلة.",
          params: {
            representation: "picture-graph",
            responseForm: "equation",
            action: "write",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح لإيجاد الجزء الناقص، ثم اكتب العدد في معادلة الطرح:",
          strategyHintAr:
            "اشطب النقاط بمقدار الجزء المعطى على وجه النرد، ثم اكتب كم بقي في المعادلة.",
          params: {
            representation: "dice",
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
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
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء المعطى على نقاط النرد، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "اشطب النقاط بمقدار الجزء المأخوذ على النرد، ثم اكتب كم بقي في المعادلة.",
          params: {
            representation: "dice",
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      practice: [
        {
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء المعطى في المكعبات وعلامات العدّ، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "اشطب من الطرف الأيسر بمقدار الجزء المأخوذ، ثم اكتب كم بقي في معادلة الطرح.",
          params: {
            allowedRepresentations: ["snap-cubes", "tally-marks"],
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء على نقاط النرد والمكعبات، ثم اكتب الجزء الناقص في معادلة الطرح:",
          strategyHintAr:
            "اشطب العناصر ليبقى العدد المعطى في النموذج، ثم اكتب الجزء المشطوب في المعادلة.",
          params: {
            allowedRepresentations: ["dice", "snap-cubes"],
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
            unknownPosition: "partTakenAway",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى التمثيل البياني بالصور لمعرفة الكلّ، ثم اكتب الجزء الناقص في المعادلة:",
          strategyHintAr:
            "عدّ صور كل فئة لمعرفة الكلّ، ثم اطرح الجزء المعطى في المعادلة.",
          params: {
            representation: "picture-graph",
            responseForm: "equation",
            action: "write",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح لإيجاد الجزء الناقص، ثم اكتب العدد في معادلة الطرح:",
          strategyHintAr:
            "اشطب النقاط ليبقى العدد المعطى على وجه النرد، ثم اكتب الجزء المشطوب في المعادلة.",
          params: {
            representation: "dice",
            responseForm: "equation",
            action: "cross-off-and-write",
            crossOffMode: "student",
            unknownPosition: "partTakenAway",
            totalRange: [3, 5],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK44Blueprint);
