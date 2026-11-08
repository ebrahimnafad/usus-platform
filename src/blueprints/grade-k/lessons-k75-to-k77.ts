import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";
import {
  CUBE_CONE_CYLINDER_SET,
  SQUARE_CIRCLE_SET,
  TRIANGLE_HEXAGON_CIRCLE_SET,
  TRIANGLE_SQUARE_CIRCLE_SET,
} from "@/lib/ten-frame-category-sets";

// Pinned solid cards: each card = one solid category filling the frame, rest empty
const SOLID_CARDS_EASY = [
  { filledCount: 5, solidId: "cube" },
  { filledCount: 6, solidId: "cone" },
  { filledCount: 7, solidId: "cylinder" },
  { filledCount: 8, solidId: "sphere" },
];

const SOLID_CARDS_INTERMEDIATE = [
  { filledCount: 6, solidId: "cube" },
  { filledCount: 7, solidId: "cone" },
  { filledCount: 8, solidId: "cylinder" },
  { filledCount: 9, solidId: "sphere" },
];

const SOLID_CARDS_ADVANCED = [
  { filledCount: 6, solidId: "cube" },
  { filledCount: 9, solidId: "cone" },
  { filledCount: 8, solidId: "cylinder" },
  { filledCount: 10, solidId: "sphere" },
];

// ============================================================================
// Lesson K-75: Model Combinations of 10 with 2 Parts
// ============================================================================
export const lessonK75Blueprint: LessonBlueprint = {
  lessonId: "K-75",
  grade: "K",
  lessonNumber: 75,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-75"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-75"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزأين (الموجود والفارغ) بلمحة واحدة:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الكامل (٥) أولاً، ثم عدّ الخانات الفارغة المكمّلة للكلّ.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            candidateCounts: [5, 6, 7, 8],
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأشكال الموجودة واكتب عددها والعدد الفارغ:",
          strategyHintAr:
            "عدّ الأشكال الموجودة بلمحة من الصفّ العلوي، ثم اكتب الخانات الفارغة المكمّلة للكلّ (١٠).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            candidateCounts: [5, 6, 7, 8],
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ المجسّمات واكتب العددين (الموجود والفارغ):",
          strategyHintAr:
            "عدّ المجسّمات الموجودة في اللوحة، ثم اكتب عدد الخانات الفارغة التي يكملها الكلّ (١٠).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            cards: SOLID_CARDS_EASY,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كلّ لوحة عشرة بالوصف المطابق:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة بالوصف الذي يذكر العددين نفسهما للمربعات والدوائر.",
          params: {
            matchKind: "ten-frame-to-description",
            categoryCount: 2,
            pairCount: 3,
            descriptionCategorySets: SQUARE_CIRCLE_SET,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "الوصف",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزأين (الموجود والفارغ) بلمحة واحدة:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الكامل (٥) أولاً، ثم عدّ الخانات الفارغة المكمّلة للكلّ.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            candidateCounts: [6, 7, 8, 9],
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأشكال الموجودة واكتب عددها والعدد الفارغ:",
          strategyHintAr:
            "عدّ الأشكال الموجودة بلمحة من الصفّ العلوي، ثم اكتب الخانات الفارغة المكمّلة للكلّ (١٠).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            candidateCounts: [6, 7, 8, 9],
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ المجسّمات واكتب العددين (الموجود والفارغ):",
          strategyHintAr:
            "عدّ المجسّمات الموجودة في اللوحة، ثم اكتب عدد الخانات الفارغة التي يكملها الكلّ (١٠).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            cards: SOLID_CARDS_INTERMEDIATE,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كلّ لوحة عشرة بالوصف المطابق:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة بالوصف الذي يذكر العددين نفسهما للمربعات والدوائر.",
          params: {
            matchKind: "ten-frame-to-description",
            categoryCount: 2,
            pairCount: 3,
            descriptionCategorySets: SQUARE_CIRCLE_SET,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "الوصف",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزأين (الموجود والفارغ) بلمحة واحدة:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الكامل (٥) أولاً، ثم عدّ الخانات الفارغة المكمّلة للكلّ.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            candidateCounts: [6, 7, 8, 9, 10],
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأشكال الموجودة واكتب عددها والعدد الفارغ:",
          strategyHintAr:
            "عدّ الأشكال الموجودة بلمحة من الصفّ العلوي، ثم اكتب الخانات الفارغة المكمّلة للكلّ (١٠).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            candidateCounts: [6, 7, 8, 9, 10],
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ المجسّمات واكتب العددين (الموجود والفارغ):",
          strategyHintAr:
            "عدّ المجسّمات الموجودة في اللوحة، ثم اكتب عدد الخانات الفارغة التي يكملها الكلّ (١٠).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            cards: SOLID_CARDS_ADVANCED,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كلّ لوحة عشرة بالوصف المطابق:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة بالوصف الذي يذكر العددين نفسهما للمربعات والدوائر.",
          params: {
            matchKind: "ten-frame-to-description",
            categoryCount: 2,
            pairCount: 3,
            descriptionCategorySets: SQUARE_CIRCLE_SET,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "الوصف",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK75Blueprint);

// ============================================================================
// Lesson K-76: Model Combinations of 10 with 3 Parts
// ============================================================================
export const lessonK76Blueprint: LessonBlueprint = {
  lessonId: "K-76",
  grade: "K",
  lessonNumber: 76,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-76"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-76"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأجزاء الثلاثة المميّزة بالأشكال:",
          strategyHintAr:
            "عدّ أشكال كل جزء من اليمين إلى اليسار، ثم اجمع الأعداد الثلاثة لترى أنها تساوي الكلّ (١٠).",
          params: {
            subitizeMode: "three-parts-to-10",
            cardCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأجزاء الثلاثة (مثلثات، مربعات، دوائر) واكتب عدد كلّ جزء:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم اكتب العدد في مربّعه مع الكلّ (١٠).",
          params: {
            subitizeMode: "three-parts-to-10",
            threePartCategorySets: TRIANGLE_SQUARE_CIRCLE_SET,
            cardCount: 1,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأجزاء الثلاثة (مثلثات، سداسيات، دوائر) واكتب عدد كلّ جزء:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم اكتب العدد في مربّعه مع الكلّ (١٠).",
          params: {
            subitizeMode: "three-parts-to-10",
            threePartCategorySets: TRIANGLE_HEXAGON_CIRCLE_SET,
            cardCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كلّ لوحة عشرة بالوصف المطابق:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة بالوصف الذي يذكر الأعداد نفسها للمثلثات والمربعات والدوائر.",
          params: {
            matchKind: "ten-frame-to-description",
            categoryCount: 3,
            pairCount: 3,
            descriptionCategorySets: TRIANGLE_SQUARE_CIRCLE_SET,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "الوصف",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأجزاء الثلاثة المميّزة بالأشكال:",
          strategyHintAr:
            "عدّ أشكال كل جزء من اليمين إلى اليسار، ثم اجمع الأعداد الثلاثة لترى أنها تساوي الكلّ (١٠).",
          params: {
            subitizeMode: "three-parts-to-10",
            cardCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأجزاء الثلاثة (مثلثات، سداسيات، دوائر) واكتب عدد كلّ جزء:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم اكتب العدد في مربّعه مع الكلّ (١٠).",
          params: {
            subitizeMode: "three-parts-to-10",
            threePartCategorySets: TRIANGLE_HEXAGON_CIRCLE_SET,
            cardCount: 1,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأجزاء الثلاثة (مثلثات، مربعات، دوائر) واكتب عدد كلّ جزء:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم اكتب العدد في مربّعه مع الكلّ (١٠).",
          params: {
            subitizeMode: "three-parts-to-10",
            threePartCategorySets: TRIANGLE_SQUARE_CIRCLE_SET,
            cardCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كلّ لوحة عشرة بالوصف المطابق:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة بالوصف الذي يذكر الأعداد نفسها للمثلثات والمربعات والدوائر.",
          params: {
            matchKind: "ten-frame-to-description",
            categoryCount: 3,
            pairCount: 3,
            descriptionCategorySets: TRIANGLE_SQUARE_CIRCLE_SET,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "الوصف",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأجزاء الثلاثة المميّزة بالأشكال:",
          strategyHintAr:
            "عدّ أشكال كل جزء من اليمين إلى اليسار، ثم اجمع الأعداد الثلاثة لترى أنها تساوي الكلّ (١٠).",
          params: {
            subitizeMode: "three-parts-to-10",
            cardCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأجزاء الثلاثة (مكعبات، مخاريط، أسطوانات) واكتب عدد كلّ جزء:",
          strategyHintAr:
            "عدّ المجسّمات في كل جزء على اللوحة، ثم اكتب العدد في مربّعه مع الكلّ (١٠).",
          params: {
            subitizeMode: "three-parts-to-10",
            threePartCategorySets: CUBE_CONE_CYLINDER_SET,
            cardCount: 1,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأجزاء الثلاثة (مثلثات، سداسيات، دوائر) واكتب عدد كلّ جزء:",
          strategyHintAr:
            "عدّ أشكال كل جزء على اللوحة، ثم اكتب العدد في مربّعه مع الكلّ (١٠).",
          params: {
            subitizeMode: "three-parts-to-10",
            threePartCategorySets: TRIANGLE_HEXAGON_CIRCLE_SET,
            cardCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr: "صِلْ كلّ لوحة عشرة بالوصف المطابق:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة بالوصف الذي يذكر الأعداد نفسها للمثلثات والمربعات والدوائر.",
          params: {
            matchKind: "ten-frame-to-description",
            categoryCount: 3,
            pairCount: 3,
            descriptionCategorySets: TRIANGLE_SQUARE_CIRCLE_SET,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "الوصف",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK76Blueprint);

// ============================================================================
// Lesson K-77: Count and Quantify using Ten Frames
// ============================================================================
export const lessonK77Blueprint: LessonBlueprint = {
  lessonId: "K-77",
  grade: "K",
  lessonNumber: 77,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-77"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-77"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزأين (الموجود والفارغ) بلمحة واحدة:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الكامل (٥) أولاً، ثم عدّ الخانات الفارغة المكمّلة للكلّ.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            candidateCounts: [5, 6, 7, 8],
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ المجسّمات في كل جزء واكتب العددين (الموجود والفارغ):",
          strategyHintAr:
            "عدّ المجسّمات الموجودة في اللوحة، ثم اكتب عدد الخانات الفارغة المكمّلة للكلّ (١٠).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            cards: SOLID_CARDS_EASY,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأشكال الموجودة واكتب عددها والعدد الفارغ:",
          strategyHintAr:
            "عدّ الأشكال الموجودة بلمحة من الصفّ العلوي، ثم اكتب الخانات الفارغة المكمّلة للكلّ (١٠).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            candidateCounts: [5, 6, 7, 8],
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة بالوصف المطابق، ثم اكتب الكلّ في المربّع:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة بالوصف الذي يذكر العددين نفسهما، ثم اكتب الكلّ ١٠ في المربّع.",
          params: {
            matchKind: "ten-frame-to-description",
            categoryCount: 2,
            missingTotal: true,
            pairCount: 3,
            descriptionCategorySets: SQUARE_CIRCLE_SET,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "الوصف",
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزأين (الموجود والفارغ) بلمحة واحدة:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الكامل (٥) أولاً، ثم عدّ الخانات الفارغة المكمّلة للكلّ.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            candidateCounts: [6, 7, 8, 9],
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ المجسّمات في كل جزء واكتب العددين (الموجود والفارغ):",
          strategyHintAr:
            "عدّ المجسّمات الموجودة في اللوحة، ثم اكتب عدد الخانات الفارغة المكمّلة للكلّ (١٠).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            cards: SOLID_CARDS_INTERMEDIATE,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأشكال الموجودة واكتب عددها والعدد الفارغ:",
          strategyHintAr:
            "عدّ الأشكال الموجودة بلمحة من الصفّ العلوي، ثم اكتب الخانات الفارغة المكمّلة للكلّ (١٠).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            candidateCounts: [6, 7, 8, 9],
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة بالوصف المطابق، ثم اكتب الكلّ في المربّع:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة بالوصف الذي يذكر العددين نفسهما، ثم اكتب الكلّ ١٠ في المربّع.",
          params: {
            matchKind: "ten-frame-to-description",
            categoryCount: 2,
            missingTotal: true,
            pairCount: 3,
            descriptionCategorySets: SQUARE_CIRCLE_SET,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "الوصف",
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم اكتب الجزأين (الموجود والفارغ) بلمحة واحدة:",
          strategyHintAr:
            "انظر إلى الصفّ العلوي الكامل (٥) أولاً، ثم عدّ الخانات الفارغة المكمّلة للكلّ.",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            candidateCounts: [6, 7, 8, 9, 10],
          },
        },
      ],
      practice: [
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ المجسّمات في كل جزء واكتب العددين (الموجود والفارغ):",
          strategyHintAr:
            "عدّ المجسّمات الموجودة في اللوحة، ثم اكتب عدد الخانات الفارغة المكمّلة للكلّ (١٠).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            cards: SOLID_CARDS_ADVANCED,
          },
        },
        {
          archetype: "SubitizePartWhole",
          promptAr:
            "انظر إلى لوحة العشرة، ثم عدّ الأشكال الموجودة واكتب عددها والعدد الفارغ:",
          strategyHintAr:
            "عدّ الأشكال الموجودة بلمحة من الصفّ العلوي، ثم اكتب الخانات الفارغة المكمّلة للكلّ (١٠).",
          params: {
            subitizeMode: "both-parts-to-10",
            visualKind: "ten-frame-and-shapes",
            candidateCounts: [6, 7, 8, 9, 10],
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ لوحة عشرة بالوصف المطابق، ثم اكتب الكلّ في المربّع:",
          strategyHintAr:
            "صِلْ كلّ لوحة عشرة بالوصف الذي يذكر العددين نفسهما، ثم اكتب الكلّ ١٠ في المربّع.",
          params: {
            matchKind: "ten-frame-to-description",
            categoryCount: 2,
            missingTotal: true,
            pairCount: 3,
            descriptionCategorySets: SQUARE_CIRCLE_SET,
            rightColumnTitleAr: "لوحة العشرة",
            leftColumnTitleAr: "الوصف",
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK77Blueprint);
