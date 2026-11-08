# Grade K Unit 5 — Word Problems to 5

**Status:** open

## Problem Statement

Grade K Units 1–4 (Lessons K-1 to K-48) are authored; Unit 5 _Word Problems to 5_ (K-49 to K-58) shows only a fallback preview and has no Arabic titles or **Teacher Notes**. Unit 5 introduces verbal problem solving across four situations — Add-To, Put-Together, Take-From, and **Take-Apart** — progressing from explicit **Learning Problems** to contextual **Story Problems**, along with the **Shift 1** strategy for systematically finding all decompositions of a Total.

The Units 1–4 engines cannot express these lessons as they stand:

- `JoinParts` and `TakeAway` render purely visual and symbolic cards (`PartWholeCardGrid`) with no verbal problem statement, no cloze problem-writing prompt ("Use the model to write the problem/story"), and no open-ended Take-Apart mode where only the Total is given and "answers will vary".
- `ConnectMatch` connects visual models only to visual models, tables, Number Bonds, or Equations; it has no word-problem card endpoint for MATCHING A–H (including story cards that also carry their own missing-Total or missing-Part **Answer Slot**, and Take-Apart matches with two unknown Parts).
- No archetype enumerates all $N + 1$ ordered Number Bond decompositions `(N, 0) ← ... ← (0, N)` by shifting 1 from one Part to the other (K-56, and later K-74), or compares two shifted take-away rows (`GIVE AWAY`).

## Solution

Author K-49 to K-58 on two new archetypes (`SolveWordProblem` and `ShiftOneDecompose`), an extended `ConnectMatch` (`matchingMode: "model-to-word-problem"`), and direct reuse of `JoinParts`, `ClassifyAndCount`, `Number Bond`, and `PartsTableView` (for K-53). All rules in [`WORKSHEET_CONSTITUTION.md`](../../WORKSHEET_CONSTITUTION.md) apply, including the 2026-11-08 amendments (§6.3 exception for `0` as a Part in K-56's Shift 1 decompositions, and §9.4 imperatives `اقرأ` and `اجمع`).

## User Stories

1. As a Grade K teacher teaching K-49, I want students to use snap cubes to act out explicit Add-To Learning Problems, complete the Number Bond and write how many in all, use a model to fill in a cloze problem and add the Parts, and match Number Bonds to Add-To Learning Problems (MATCHING A).
2. As a Grade K teacher teaching K-50, I want students to read contextual Add-To Story Problems, complete the Number Bond and answer how many in all/now, use a model to complete a cloze story, and fill in the missing Total in both the Number Bond and the Story Problem before matching them (MATCHING B).
3. As a Grade K teacher teaching K-51, I want students to use snap cubes to put two Parts together in explicit Learning Problems, complete the Number Bond and answer how many in all, use a model to complete a cloze problem and write an addition Equation, and match Number Bonds to Put-Together Learning Problems (MATCHING C).
4. As a Grade K teacher teaching K-52, I want students to read Put-Together Story Problems, complete the Number Bond and answer how many in all, use a model to complete a cloze story and write an addition Equation, and fill in the missing Total in both the Number Bond and the Story Problem before matching them (MATCHING D).
5. As a Grade K teacher teaching K-53, I want students to use five frames to count each Part and write how many in all, write an addition Equation for the Total number of solid shapes, and complete the `HOW MANY?` classification table and comparison questions.
6. As a Grade K teacher teaching K-54, I want students to use snap cubes and five frames to act out explicit Take-From Learning Problems, complete the Number Bond and write how many are left, use a model to complete a cloze problem and write a subtraction Equation, and match Number Bonds to Take-From Learning Problems (MATCHING E).
7. As a Grade K teacher teaching K-55, I want students to read Take-From Story Problems, complete the Number Bond and answer how many are left, use a model to complete a cloze story and subtract to find how many are left, and fill in the missing Part in both the Number Bond and the Story Problem before matching them (MATCHING F).
8. As a Grade K teacher teaching K-56, I want students to use the Shift 1 strategy to write all Number Bond combinations for 2–5 starting from `(N, 0)` down to `(0, N)`, complete a Shift 1 Number Bond pattern, and cross off apples in two shifted take-away rows to compare how many are left (`GIVE AWAY`).
9. As a Grade K teacher teaching K-57 and K-58, I want students to solve Take-Apart Learning Problems and Story Problems by finding how many could be in each Part (both when a model fixes the two Parts and when only the Total is given so answers vary), use a model to fill in a cloze sentence and Equation, and match Number Bonds to Take-Apart problems while filling in missing Parts (MATCHING G and H).
10. As a teacher, I want "Regenerate" to produce new word-problem facts and scenes within the lesson's limits, without repeating a fact inside one exercise.
11. As a teacher, I want every Unit 5 Answer Key to show solved Number Bonds, Equations, and cloze slots (plus all valid decompositions noted in the badge and Strategy Hint for open-ended Take-Apart items), drawn match lines, accent-style crossed-off items, and a **Strategy Hint**.
12. As a teacher, I want Arabic titles, Teacher Notes (including `البداية` / `التغيير` / `النتيجة` delivery guidance for Add-To and Take-From), classroom activities, and common misconceptions for K-49 to K-58.

## Implementation Decisions

1. **Domain model** (`GLOSSARY.md`, already updated):
   - Added **Take-Apart** (تفكيك الكلّ), **Shift 1** (إزاحة ١), **Learning Problem** (المسألة التعليمية), and **Story Problem** (المسألة القصصية).
   - Child-facing models, prompts, and hints name only `الجزء`, `الكلّ`, and `الجزء الناقص`. Pedagogical structure labels (`البداية`, `التغيير`, `النتيجة`) appear only in **Teacher Notes** (§9.1, §9.4).
   - The curriculum's "part-total diagram / model" in Grade K is the existing **Number Bond** (`number-bond`, `212 × 160 px`), plus `PartsTableView` in K-53. Rectangular bar models are saved for Grade 1.

2. **Reuse ladder** (constitution §11.2):

   | Need                                                                                              | Ladder step                                     | Reason                                                                                      |
   | ------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------- |
   | Act out and solve Learning & Story Problems (`add-to`, `put-together`, `take-from`, `take-apart`) | New `SolveWordProblem` archetype                | New student action: read and interpret a verbal problem into Parts and a Total              |
   | Enumerate all decompositions of a Total by shifting 1 (K-56, K-74)                                | New `ShiftOneDecompose` archetype               | New student action: systematic ordered decomposition `(N, 0) ← ... ← (0, N)`                |
   | MATCHING A–H (Number Bond diagram to Learning or Story Problem)                                   | Extend `ConnectMatch` (`model-to-word-problem`) | Same student action (match 1-to-1); adds a word-problem text card endpoint                  |
   | Part-total diagram in K-49 to K-58                                                                | Reuse `Number Bond` (`number-bond`) as-is       | Same representation (`212 × 160 px`)                                                        |
   | K-53 Workbook (five frames + parts/total) & PoD (solid shapes Equation)                           | Reuse `JoinParts` as-is                         | Already supports `five-frame` and `pictures` (`solid-shapes`) with `parts-table`/`equation` |
   | K-53 Brain Builder (`HOW MANY?` table and questions)                                              | Reuse `ClassifyAndCount` as-is                  | Already renders a mixed tray, per-Part and Total count slots, and a comparison question     |

3. **`SolveWordProblem`** (حلّ المسألة اللفظية):
   - **Situations**: `add-to` (K-49, K-50), `put-together` (K-51, K-52), `take-from` (K-54, K-55), `take-apart` (K-57, K-58).
   - **Problem styles**:
     - `learning`: explicit cube, shape, or number statement (e.g., starting cubes and added/removed cubes, or breaking a train of cubes into two color Parts).
     - `story`: curated 1–2 line simplified MSA story scenes paired with matching visual icons (`everyday-object` or `shape-2d`).
   - **Response forms**:
     - `model-and-bond` (Workbook Type 1): Arabic problem statement + concrete Visual Model (`snap-cubes`, `five-frame`, or story icons; with `Cross Off` in `take-from`) + `Number Bond` + final question `AnswerSlot` (`كم في الكلّ؟` / `كم أصبح الآن؟` / `كم بقي؟`, or two Part `AnswerSlot`s in `take-apart`).
     - `story-and-slot` / `equation` (Workbook Type 2): Arabic problem statement + `EquationStripView` or final `AnswerSlot`(s); concrete model shown at Easy and partly or fully withdrawn at Intermediate and Advanced (§6.2).
     - `cloze-from-model` (Problems of the Day: "Use the model to write the problem/story" and "Use the model to fill in each sentence and write an equation"): concrete Visual Model + cloze Arabic sentence containing `48 × 48 px` digit `AnswerSlot`s for the quantities + `EquationStripView` or Total/Part `AnswerSlot`.

4. **Open-ended Take-Apart (`answers will vary` in K-57 and K-58)**:
   - **Model-fixed** (Workbook Type 1, Problems of the Day): the concrete model shows the two color/shape Parts, so the two Part `AnswerSlot`s have one exact answer (`part1`, `part2`).
   - **Open-ended** (Workbook Type 2, MATCHING G & H): only the Total $N$ is given in the text (`في السلة ٤ تفاحات حمراء وخضراء...`). Both Part slots are `unknown` (`؟`) on the Worksheet; on the Answer Key, the slots display the Seed's canonical non-zero decomposition `(part1, part2)` while the solved badge and **Strategy Hint** explicitly list every valid non-zero pair (`تتنوّع الإجابات، مثل: ٣ و١ أو ٢ و٢ أو ١ و٣`).

5. **`ConnectMatch` (`matchingMode: "model-to-word-problem"`, MATCHING A–H)**:
   - Right column: `Number Bond` (`212 × 160 px`). Left column: Arabic Learning Problem or Story Problem card.
   - **Learning Problem matches** (MATCHING A in K-49, C in K-51, E in K-54): the missing Total (`A`, `C`) or Missing Part (`E`) `AnswerSlot` is on the `Number Bond` only; the Learning Problem card states the two given numbers.
   - **Story Problem matches** (MATCHING B in K-50, D in K-52, F in K-55): per curriculum ("Fill in the missing total/part in each model and word problem"), both the `Number Bond` and the Story Problem card carry the missing `AnswerSlot`.
   - **Take-Apart matches** (MATCHING G in K-57, H in K-58): each row uses a **distinct Total** (`٣`, `٤`, `٥`) so matching each `Number Bond` (Total shown at top, both Part circles `unknown`) to its Take-Apart problem is 1-to-1 and unambiguous; the student fills in the two missing Parts (`answers will vary`).

6. **`ShiftOneDecompose`** (فكّك بإزاحة ١ — K-56):
   - **`all-combinations`** (Workbook): for a target Total $N$, renders all $N + 1$ `Number Bond`s in a 3-column RTL grid (`212 px` columns) ordered from `(N, 0)` on the right to `(0, N)` on the left, with an `إزاحة ١` step indicator. At Easy ($N \in \{2, 3\}$), each step is paired with a two-part `five-frame` and the first bond is traced; at Intermediate ($N \in \{3, 4\}$) and Advanced ($N \in \{4, 5\}$), the student writes the missing Parts in the bonds.
   - **`complete-pattern`** (Problem of the Day): shows the first two `Number Bond`s `(N, 0)` and `(N − 1, 1)` as completed pattern anchors, and the student completes the remaining bonds by shifting 1.
   - **`give-away`** (Brain Builder `GIVE AWAY`): two parallel apple-subtraction rows starting with the same Total $N$ (e.g., `٤` or `٥` apples) and giving away $k$ vs. $k + 1$ apples (`student` Cross Off mode + `كم بقي؟` `AnswerSlot`), followed by a comparison question asking how many are left when we give away 1 more.

7. **Unit 5 ranges** (constitution §6.2, §6.3, §7.2–7.3):
   - **Word problem lessons (K-49 to K-55, K-57 to K-58)**:
     - Easy: Total `2–4`, both Parts `≥ 1`, concrete model fully shown, traced support on given terms.
     - Intermediate: Total `2–5`, both Parts `≥ 1`, model shown in Type 1 and withdrawn in Type 2, digits written.
     - Advanced: Total `3–5`, model partly or fully withdrawn, `0` allowed as a change Part in Add-To / Take-From where appropriate, or unknown in a non-standard position in Challenge items.
   - **Shift 1 lesson (K-56)**:
     - Easy: Totals `2–3`, all $N + 1$ combinations from `(N, 0)` to `(0, N)` (per §6.3 K-56 exception), with five-frame support.
     - Intermediate: Totals `3–4`, all $N + 1$ combinations `(N, 0)` to `(0, N)` on Number Bonds.
     - Advanced: Totals `4–5`, all $N + 1$ combinations `(N, 0)` to `(0, N)` on Number Bonds with more open Part slots.

8. **Arabic content**: Titles, Teacher Notes, classroom activities, misconceptions, problem templates, prompts (opening with `اقرأ`, `اجمع`, `عدّ`, `انظر`, `صِلْ`, `لوّن`, `اختر`, `اكتب`, `ارسم`, `اشطب`, or `اطرح` per §9.4), and Strategy Hints for K-49 to K-58 are drafted in simplified Modern Standard Arabic per ticket and reviewed by the user, with the saved page PNGs, before each ticket closes.

## Testing Decisions

- Constitution §12 is the definition of done: per ticket, the layout guard gates the ticket's new lessons (`--lessons=<ticket-range>`); at batch close, the layout guard runs once across all authored lessons (K-1 to K-58).
- Primary-seam tests (`renderWorksheetSurface`) extend to K-49 to K-58: seed determinism, Warm-Up prerequisite resolution, difficulty progression, Strategy Hints on every Answer Key exercise, the Eastern Arabic Numerals invariant, Answer Slot sizes, no worksheet answer leaks, and `−` (never a hyphen) in every subtraction Equation.
- Language tests (`tests/ticket-06-arabic-msa-language-pass.test.ts`): `APPROVED_IMPERATIVES` includes `اقرأ` and `اجمع`; avoided terms never appear in rendered student-facing HTML.
- Domain tests across many Seeds:
  - Every `SolveWordProblem` item satisfies `part1 + part2 = total` (or `total − partTakenAway = missingPart`), and its rendered Arabic text contains the Eastern Arabic numerals matching its generated quantities.
  - Every `cloze-from-model` item has solved digit slots matching the model's Parts and Total.
  - Every open-ended `take-apart` item has `part1 + part2 = total` in the Answer Key and lists all $N - 1$ valid non-zero pairs in its Strategy Hint.
  - Every `ShiftOneDecompose` (`all-combinations` and `complete-pattern`) exercise for Total $N$ generates exactly $N + 1$ bonds in strict `(N − i, i)` order for $i = 0 \dots N$.
  - Every `ConnectMatch` (`model-to-word-problem`) exercise has a 1-to-1 bijection between Number Bonds and word problems, and Take-Apart matches (G & H) have distinct Totals across rows.

## Out of Scope

- Rectangular bar models (introduced in Grade 1).
- Comparison word problems ("how many more / fewer" as a subtraction story), which belong to Grade 1.
- Freeform student prose writing on `AnswerLine` for story creation (Problems of the Day use structured cloze sentences with `48 × 48 px` digit slots).
- Unit 6 _Numbers to 10_ (K-59+) and later units.

## Delivery

Branch `feat/grade-k-unit-5` from the tip of `feat/grade-k-unit-4`. Ticket 01 builds `SolveWordProblem` and `ConnectMatch` (`model-to-word-problem`) with K-49 and K-50; Tickets 02 (K-51 to K-53), 03 (K-54 and K-55), and 04 (`ShiftOneDecompose` and Take-Apart K-56 to K-58) depend on Ticket 01.
