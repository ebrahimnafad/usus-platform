import type { LessonBlueprint } from "@/domain/types";
import { AUTHORED_LESSON_LOCALIZATION } from "@/curriculum/arabic-localization";
import { registerLessonBlueprint } from "@/blueprints/registry";

// ============================================================================
// Lessons K-97 / K-98 — Unit 8 (Subtract to 10): story problems + batch close
// ============================================================================
// The story-problem pair scales Unit 5's take-from (K-54/K-55) and take-apart
// (K-58) lessons to ten frames within 10: K-97 reads take-from stories and
// completes the part-total model and equation (WORD PROBLEM MATCH A), while
// K-98 breaks a known Total into two Parts with multiple valid answers
// (WORD PROBLEM MATCH B). K-97 is co-presented: its Teacher Notes bridge
// K-96's abstract subtraction equations to the story context.
// ============================================================================

// ============================================================================
// Lesson K-97: Take-From Story Problems (K.OA.2, co-presented)
// ============================================================================
export const lessonK97Blueprint: LessonBlueprint = {
  lessonId: "K-97",
  grade: "K",
  lessonNumber: 97,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-97"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-97"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        // §5.3 chain: K-98's rendered warm-up draws this Easy tier (the
        // take-from story problem); K-97's own rendered warm-up comes from
        // K-96's blueprint.
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "انظر إلى الأقراص المشطوبة في النموذج، ثم اكتب الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            crossOffMode: "shown",
            action: "trace",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "انظر إلى الأقراص المشطوبة في النموذج، ثم اكتب الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            crossOffMode: "shown",
            action: "trace",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr: "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب كم بقي:",
          strategyHintAr:
            "انظر إلى الكلّ والجزء المشطوب في النموذج، ثم عدّ كم بقي واكتب العدد في المربّع.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "ten-frame",
            crossOffMode: "shown",
            action: "trace",
            showModel: true,
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الجزء الناقص في كل رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اطرح الجزء المأخوذ من الكلّ لكتابة الجزء الناقص في رابطة الأعداد وفي المسألة القصصية، ثم صِلْ بينهما.",
          params: {
            matchingMode: "model-to-word-problem",
            operation: "subtract",
            situation: "take-from",
            problemStyle: "story",
            showProblemSlot: true,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [6, 8],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لكتابة المسألة القصصية، ثم اطرح لإيجاد كم بقي:",
          strategyHintAr:
            "عدّ الكلّ والأقراص المشطوبة على لوحة العشرة لكتابة المسألة القصصية، ثم أكمل معادلة الطرح لإيجاد كم بقي.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "ten-frame",
            crossOffMode: "shown",
            clozeIncludeEquation: true,
            action: "trace",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية واشطب الجزء المأخوذ، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "اشطب الجزء المأخوذ في النموذج، ثم اكتب الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            crossOffMode: "student",
            action: "write",
            totalRange: [6, 9],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية واشطب الجزء المأخوذ، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "اشطب الجزء المأخوذ في النموذج، ثم اطرح لإيجاد الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            crossOffMode: "student",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr: "اقرأ المسألة القصصية، ثم اطرح الجزء المأخوذ واكتب كم بقي:",
          strategyHintAr:
            "اقرأ الكلّ والجزء المأخوذ في المسألة القصصية، ثم اطرح واكتب كم بقي في المربّع.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "ten-frame",
            action: "write",
            showModel: false,
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الجزء الناقص في كل رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اطرح الجزء المأخوذ من الكلّ لكتابة الجزء الناقص في رابطة الأعداد وفي المسألة القصصية، ثم صِلْ بينهما.",
          params: {
            matchingMode: "model-to-word-problem",
            operation: "subtract",
            situation: "take-from",
            problemStyle: "story",
            showProblemSlot: true,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لكتابة المسألة القصصية، ثم اطرح لإيجاد كم بقي:",
          strategyHintAr:
            "عدّ الكلّ والأقراص المشطوبة على لوحة العشرة لكتابة المسألة القصصية، ثم أكمل معادلة الطرح لإيجاد كم بقي.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "ten-frame",
            crossOffMode: "shown",
            clozeIncludeEquation: true,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية، ثم اطرح الجزء المأخوذ واكتب معادلة الطرح:",
          strategyHintAr:
            "اقرأ الكلّ والجزء المأخوذ في المسألة، ثم اكتب الجزء الناقص في معادلة الطرح.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "equation",
            representation: "ten-frame",
            action: "write",
            showModel: false,
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية واشطب الجزء المأخوذ، ثم أكمل رابطة الأعداد واكتب كم بقي:",
          strategyHintAr:
            "اشطب الجزء المأخوذ على لوحة العشرة، ثم اكتب الجزء الناقص في رابطة الأعداد والمربّع.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            crossOffMode: "student",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية، ثم اطرح الجزء المأخوذ واكتب معادلة الطرح:",
          strategyHintAr:
            "اقرأ الكلّ والجزء المأخوذ في المسألة القصصية، ثم اكتب الجزء الذي بقي في معادلة الطرح.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "equation",
            representation: "ten-frame",
            action: "write",
            showModel: false,
            totalRange: [6, 10],
            minPart: 0,
            itemCount: 2,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "اكتب الجزء الناقص في كل رابطة أعداد ومسألة قصصية، ثم صِلْ بينهما بخط:",
          strategyHintAr:
            "اطرح الجزء المأخوذ من الكلّ لكتابة الجزء الناقص في رابطة الأعداد وفي المسألة القصصية، ثم صِلْ بينهما.",
          params: {
            matchingMode: "model-to-word-problem",
            operation: "subtract",
            situation: "take-from",
            problemStyle: "story",
            showProblemSlot: true,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [6, 10],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لكتابة المسألة القصصية، ثم اطرح في المعادلة لإيجاد كم بقي:",
          strategyHintAr:
            "عدّ الكلّ والأقراص المشطوبة على لوحة العشرة لكتابة المسألة القصصية، ثم أكمل معادلة الطرح.",
          params: {
            situation: "take-from",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "ten-frame",
            crossOffMode: "shown",
            clozeIncludeEquation: true,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK97Blueprint);

// ============================================================================
// Lesson K-98: Take-Apart Story Problems (K.OA.2)
// ============================================================================
export const lessonK98Blueprint: LessonBlueprint = {
  lessonId: "K-98",
  grade: "K",
  lessonNumber: 98,
  titleAr: AUTHORED_LESSON_LOCALIZATION["K-98"].titleAr,
  teacherNotes: AUTHORED_LESSON_LOCALIZATION["K-98"].teacherNotes,
  tiers: {
    Easy: {
      warmUp: [
        // Authored fallback only: K-98's rendered warm-up draws K-97's tier.
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب الجزأين في المربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في المربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "ten-frame",
            takeApartMode: "model-fixed",
            showModel: true,
            action: "trace",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            takeApartMode: "model-fixed",
            action: "trace",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب الجزأين في المربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في المربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "ten-frame",
            takeApartMode: "model-fixed",
            showModel: true,
            action: "trace",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ رابطة أعداد بالمسألة القصصية المطابقة للكلّ، ثم اكتب الجزأين:",
          strategyHintAr:
            "صِلْ كلَّ رابطة أعداد بالقصة التي تحمل الكلّ نفسه، ثم اكتب جزأين مناسبين.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "take-apart",
            problemStyle: "story",
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [6, 8],
            minPart: 1,
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لملء المسألة القصصية، ثم اكتب معادلة الجمع:",
          strategyHintAr:
            "عدّ العناصر في كلّ جزء لملء القصة، ثم اجمع الجزأين لكتابة الكلّ في المعادلة.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "ten-frame",
            takeApartMode: "model-fixed",
            clozeIncludeEquation: true,
            action: "trace",
            totalRange: [6, 8],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Intermediate: {
      warmUp: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب الجزأين في المربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في المربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "ten-frame",
            takeApartMode: "model-fixed",
            showModel: true,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            takeApartMode: "model-fixed",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب الجزأين في المربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في المربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "ten-frame",
            takeApartMode: "model-fixed",
            showModel: true,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ رابطة أعداد بالمسألة القصصية المطابقة للكلّ، ثم اكتب الجزأين:",
          strategyHintAr:
            "صِلْ كلَّ رابطة أعداد بالقصة التي تحمل الكلّ نفسه، ثم اكتب جزأين مناسبين.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "take-apart",
            problemStyle: "story",
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [6, 10],
            minPart: 1,
            // Difficulty ladder: Easy/Intermediate match 2 pairs (mirrors
            // K-97's BB); Advanced keeps 3 pairs.
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لملء المسألة القصصية، ثم اكتب معادلة الجمع:",
          strategyHintAr:
            "عدّ العناصر في كلّ جزء لملء القصة، ثم اجمع الجزأين لكتابة الكلّ في المعادلة.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "ten-frame",
            takeApartMode: "model-fixed",
            clozeIncludeEquation: true,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
    Advanced: {
      warmUp: [
        // Open-ended: only the Total is given, so any valid Part pair works.
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية لتحديد الكلّ، ثم اكتب كم يمكن أن يكون في كلّ جزء:",
          strategyHintAr: "اختر أيّ جزأين يساويان الكلّ واكتبهما في المربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "ten-frame",
            takeApartMode: "open-ended",
            showModel: false,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      practice: [
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية وانظر إلى النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين:",
          strategyHintAr:
            "عدّ عناصر كلّ جزء في النموذج، ثم اكتب الجزأين في رابطة الأعداد والمربّعين.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "model-and-bond",
            representation: "ten-frame",
            takeApartMode: "model-fixed",
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "اقرأ المسألة القصصية لتحديد الكلّ، ثم اكتب كم يمكن أن يكون في كلّ جزء:",
          strategyHintAr:
            "اختر أيّ جزأين يساويان الكلّ واكتبهما في المربّعين، ثم تحقّق من أنّ مجموعهما يساوي الكلّ.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "story-and-slot",
            representation: "ten-frame",
            takeApartMode: "open-ended",
            showModel: false,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
      challenge: [
        {
          archetype: "ConnectMatch",
          promptAr:
            "صِلْ كلّ رابطة أعداد بالمسألة القصصية المطابقة للكلّ، ثم اكتب الجزأين:",
          strategyHintAr:
            "صِلْ كلَّ رابطة أعداد بالقصة التي تحمل الكلّ نفسه، ثم اكتب جزأين مناسبين.",
          params: {
            matchingMode: "model-to-word-problem",
            situation: "take-apart",
            problemStyle: "story",
            showProblemSlot: false,
            rightColumnTitleAr: "رابطة الأعداد",
            leftColumnTitleAr: "المسألة القصصية",
            totalRange: [6, 10],
            minPart: 1,
            // All tiers match 2 pairs (mirrors K-97's BB; the difficulty
            // ladder lives in totalRange). The 3-pair WORD PROBLEM MATCH B
            // capability is covered at the archetype level in the tests.
            pairCount: 2,
          },
        },
        {
          archetype: "SolveWordProblem",
          promptAr:
            "انظر إلى النموذج لملء المسألة القصصية، ثم اكتب معادلة الجمع:",
          strategyHintAr:
            "عدّ العناصر في كلّ جزء لملء القصة، ثم اجمع الجزأين لكتابة الكلّ في المعادلة.",
          params: {
            situation: "take-apart",
            problemStyle: "story",
            responseForm: "cloze-from-model",
            representation: "ten-frame",
            takeApartMode: "model-fixed",
            clozeIncludeEquation: true,
            action: "write",
            totalRange: [6, 10],
            minPart: 1,
            itemCount: 1,
          },
        },
      ],
    },
  },
};

registerLessonBlueprint(lessonK98Blueprint);
