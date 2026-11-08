# 01: SolveWordProblem, ConnectMatch Word Problems, and Add-To Lessons (Lessons K-49 and K-50)

**What to build:** The `SolveWordProblem` (حلّ المسألة اللفظية) archetype for `add-to` Learning Problems and Story Problems, the `model-to-word-problem` mode in `ConnectMatch` (MATCHING A and B), the `اقرأ` and `اجمع` imperatives in the language test, and complete localized blueprints, Answer Keys, and Teacher Notes for K-49 and K-50.

**Blocked by:** None

**Status:** closed

- [x] `APPROVED_IMPERATIVES` in `tests/ticket-06-arabic-msa-language-pass.test.ts` includes `اقرأ` and `اجمع` (matching constitution §9.4's 2026-11-08 amendment)
- [x] `SolveWordProblem` is registered in `src/domain/types.ts`, `src/archetypes/registry.ts`, and `src/registry/bootstrap.ts`, supporting `situation: "add-to"`, `problemStyle: "learning" | "story"`, and response forms `model-and-bond`, `story-and-slot` (or `equation`), and `cloze-from-model`
- [x] Child-facing problem cards, Number Bonds, prompts, and Strategy Hints use only `الجزء` and `الكلّ`; pedagogical terms (`البداية`, `التغيير`, `النتيجة`) appear only in Teacher Notes
- [x] K-49 Workbook (`learning`): Type 1 uses snap cubes + a Number Bond + a `كم في الكلّ؟` Answer Slot; Type 2 acts out the Add-To Learning Problem with numbers and writes the Total (concrete model shown at Easy, partly or fully withdrawn at Intermediate and Advanced)
- [x] K-50 Workbook (`story`): Type 1 reads a curated 1–2 line MSA Add-To Story Problem with matching visual icons (`everyday-object` / `five-frame` / `snap-cubes`), completes the Number Bond, and answers how many the person has now (`كم أصبح الآن؟` / `كم في الكلّ؟`); Type 2 reads the Add-To Story Problem and writes how many in all/now
- [x] Problems of the Day (`cloze-from-model`): K-49 ("Use the model to write the problem. Add the parts to find the total") and K-50 ("Use the model to write the story. Add the parts to find how many in all") render a concrete model and a cloze Arabic problem/story sentence with `48 × 48 px` digit Answer Slots for the Parts plus an Equation Strip or Total Answer Slot
- [x] `ConnectMatch` gains `matchingMode: "model-to-word-problem"`, covering MATCHING A (K-49: missing-Total Answer Slot on the Number Bond only, matched to the Add-To Learning Problem card) and MATCHING B (K-50: missing-Total Answer Slot on both the Number Bond and the Add-To Story Problem card)
- [x] Prerequisite Warm-Ups resolve K-49 → K-31 and K-50 → K-49
- [x] Arabic titles, Teacher Notes, classroom activities, misconceptions, prompts, and Strategy Hints for K-49 and K-50 are drafted and reviewed by the user
- [x] Domain tests across many Seeds: every K-49 and K-50 item satisfies `part1 + part2 = total`, rendered problem text contains the exact Eastern Arabic numerals for its Parts, `cloze-from-model` solved slots match the model, and `ConnectMatch` solutions are 1-to-1
- [x] Constitution §12 holds for K-49 and K-50 (guard green for K-1 to K-50)
