import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

export const lessonK40Blueprint: LessonBlueprint = {
  lessonId: "K-40",
  grade: "K",
  lessonNumber: 40,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-40"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-40"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr:
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص غير المشطوبة على لوحة الخمسة، ثم اكتب الجزء الناقص في الدائرة اليسرى.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
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
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص لإكمال كل رابطة أعداد:",
          strategyHintAr:
            "انظر إلى الأقراص المشطوبة لمعرفة الجزء المأخوذ، ثم عدّ كم بقي واكتب الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
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
            "عدّ الأقراص المتبقية على لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ الأقراص التي لم تُشطب على لوحة الخمسة، ثم اكتب عددها في دائرة الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "trace",
            crossOffMode: "shown",
            totalRange: [3, 4],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل لوحة خمسة برابطة الأعداد المطابقة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب على لوحة الخمسة، ثم صِلْها برابطة الأعداد واكتب الجزء الناقص.",
          params: {
            operation: "subtract",
            matchingMode: "five-frame-to-number-bond",
            totalRange: [2, 4],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء الذي تعرفه على لوحة الخمسة، ثم اكتب كم بقي في رابطة الأعداد:",
          strategyHintAr:
            "اشطب من اليسار بعدد الجزء المكتوب في الدائرة اليمنى، ثم عدّ كم بقي واكتبه.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "cross-off-and-write",
            crossOffMode: "student",
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
            "انظر إلى لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب على لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
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
            "انظر إلى لوحة الخمسة لإيجاد الجزء الناقص، ثم اكتب العدد لإكمال رابطة الأعداد:",
          strategyHintAr:
            "اطرح الجزء المشطوب من الكلّ على لوحة الخمسة، ثم اكتب كم بقي في دائرة الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
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
            "اشطب الجزء المعطى على لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "اشطب الأقراص بمقدار الجزء الأول، ثم عدّ الأقراص المتبقية واكتبها في رابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "cross-off-and-write",
            crossOffMode: "student",
            totalRange: [2, 5],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل لوحة خمسة برابطة الأعداد المطابقة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب على لوحة الخمسة، ثم صِلْها بالرابطة المناسبة واكتب كم بقي.",
          params: {
            operation: "subtract",
            matchingMode: "five-frame-to-number-bond",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء الذي تعرفه على لوحة الخمسة، ثم اكتب كم بقي في رابطة الأعداد:",
          strategyHintAr:
            "اشطب من الطرف الأيسر بعدد الجزء المعروف، ثم اكتب عدد الأقراص المتبقية.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
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
            "اشطب الجزء المعطى على لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "اشطب الأقراص على لوحة الخمسة، ثم اكتب كم بقي في دائرة الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
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
            "لوّن أقراص الكلّ واشطب الجزء المعطى على لوحة الخمسة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "لوّن الأقراص المنقّطة لإكمال الكلّ واشطب الجزء المأخوذ، ثم اكتب كم بقي في رابطة الأعداد.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "draw-and-cross-off",
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء على لوحة الخمسة، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المكتوب في رابطة الأعداد، ثم اشطب واكتب الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
            action: "cross-off-and-write",
            crossOffMode: "student",
            swapBondParts: true,
            totalRange: [3, 5],
            minPart: 0,
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كل لوحة خمسة برابطة الأعداد المطابقة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "انظر إلى الأقراص المشطوبة والمتبقية (بما فيها الصفر ٠)، ثم صِلْ واكتب الجزء الناقص.",
          params: {
            operation: "subtract",
            matchingMode: "five-frame-to-number-bond",
            totalRange: [2, 5],
            minPart: 0,
            pairCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr:
            "اشطب الجزء الذي تعرفه على لوحة الخمسة، ثم اكتب كم بقي في رابطة الأعداد:",
          strategyHintAr:
            "لوّن الكلّ واشطب الجزء المعروف على لوحة الخمسة، ثم اكتب الجزء الناقص.",
          params: {
            representation: "five-frame",
            responseForm: "number-bond",
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

registerLessonBlueprint(lessonK40Blueprint);

export const lessonK41Blueprint: LessonBlueprint = {
  lessonId: "K-41",
  grade: "K",
  lessonNumber: 41,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-41"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-41"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "TakeAway",
          promptAr: "عدّ المكعبات المتبقية بعد الشطب، ثم اكتب كم بقي:",
          strategyHintAr:
            "انظر إلى المكعبات المشطوبة، ثم عدّ المكعبات المتبقية واكتب الرقم.",
          params: {
            representation: "snap-cubes",
            responseForm: "answer-slot",
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
            "انظر إلى المكعبات المتداخلة وعلامات العدّ، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "عدّ العناصر غير المشطوبة في كل نموذج، ثم اكتب الجزء الناقص كرقم.",
          params: {
            allowedRepresentations: ["snap-cubes", "tally-marks"],
            responseForm: "answer-slot",
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
            "انظر إلى نقاط النرد والدومينو، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "عدّ النقاط المتبقية غير المشطوبة، ثم اكتب الجزء الناقص في الدائرة اليسرى.",
          params: {
            allowedRepresentations: ["dice", "domino"],
            responseForm: "number-bond",
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
            "صِلْ كل وجه نرد برابطة الأعداد المطابقة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "انظر إلى نقاط النرد المشطوبة والمتبقية، ثم صِلْها برابطة الأعداد واكتب الجزء الناقص.",
          params: {
            operation: "subtract",
            matchingMode: "dice-to-number-bond",
            totalRange: [2, 4],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح الجزء الذي تعرفه من المكعبات، ثم اكتب كم بقي:",
          strategyHintAr:
            "اشطب المكعبات بمقدار الجزء المعروف من اليسار، ثم عدّ كم بقي واكتبه.",
          params: {
            representation: "snap-cubes",
            responseForm: "number-bond",
            action: "cross-off-and-write",
            crossOffMode: "student",
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
          promptAr: "انظر إلى المكعبات المتداخلة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "اطرح المكعبات المشطوبة من الكلّ، ثم اكتب عدد المكعبات المتبقية.",
          params: {
            representation: "snap-cubes",
            responseForm: "answer-slot",
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
            "انظر إلى المكعبات المتداخلة وعلامات العدّ، ثم اكتب الجزء الناقص كرقم:",
          strategyHintAr:
            "عدّ العناصر المتبقية بعد الشطب في كل نموذج، ثم اكتب الجزء الناقص.",
          params: {
            allowedRepresentations: ["snap-cubes", "tally-marks"],
            responseForm: "answer-slot",
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
            "اشطب الجزء المعطى على نقاط النرد والدومينو، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "اشطب النقاط بمقدار الجزء المأخوذ، ثم اكتب كم بقي في دائرة الجزء الناقص.",
          params: {
            allowedRepresentations: ["dice", "domino"],
            responseForm: "number-bond",
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
            "صِلْ كل وجه نرد برابطة الأعداد المطابقة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب على وجه النرد، ثم صِلْه بالرابطة المناسبة واكتب كم بقي.",
          params: {
            operation: "subtract",
            matchingMode: "dice-to-number-bond",
            totalRange: [3, 5],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح الجزء الذي تعرفه في النموذج، ثم اكتب كم بقي:",
          strategyHintAr:
            "اشطب الجزء المعروف من علامات العدّ، ثم عدّ كم بقي واكتب الجزء الناقص.",
          params: {
            representation: "tally-marks",
            responseForm: "number-bond",
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
            "اشطب الجزء المعطى على بطاقة الدومينو، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "اشطب نقاط الجزء المأخوذ على الدومينو، ثم اكتب كم بقي في المربع.",
          params: {
            representation: "domino",
            responseForm: "answer-slot",
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
            "اشطب الجزء المعطى في المكعبات وعلامات العدّ، ثم اكتب الجزء الناقص كرقم:",
          strategyHintAr:
            "اشطب من الطرف الأيسر بمقدار الجزء المأخوذ، ثم اكتب كم بقي.",
          params: {
            allowedRepresentations: ["snap-cubes", "tally-marks"],
            responseForm: "answer-slot",
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
            "اشطب الجزء على بطاقة الدومينو، ثم اكتب الجزء الناقص في رابطة الأعداد:",
          strategyHintAr:
            "انظر إلى شقّي الدومينو (بما فيها الصفر ٠)، ثم اشطب الجزء واكتب كم بقي.",
          params: {
            representation: "domino",
            responseForm: "number-bond",
            action: "cross-off-and-write",
            crossOffMode: "student",
            swapBondParts: true,
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
            "صِلْ كل نرد أو دومينو برابطة الأعداد المطابقة، ثم اكتب الجزء الناقص:",
          strategyHintAr:
            "انظر إلى النقاط المشطوبة والمتبقية بدقّة، ثم صِلْها برابطة الأعداد واكتب الجزء الناقص.",
          params: {
            operation: "subtract",
            matchingMode: "dice-to-number-bond",
            totalRange: [2, 5],
            minPart: 0,
            pairCount: 2,
          },
        },
        {
          archetype: "TakeAway",
          promptAr: "اطرح الجزء الذي تعرفه على وجه النرد، ثم اكتب كم بقي:",
          strategyHintAr:
            "اشطب النقاط بمقدار الجزء المأخوذ على وجه النرد، ثم اكتب الجزء الناقص.",
          params: {
            representation: "dice",
            responseForm: "number-bond",
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

registerLessonBlueprint(lessonK41Blueprint);
