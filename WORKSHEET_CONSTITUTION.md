# Worksheet Constitution

The standing rules for every math **Worksheet** and **Answer Key**, Grades K–5. A batch of new lessons inherits all of them; a batch spec states only what is new. To start a batch, follow [`docs/agents/worksheet-batch-playbook.md`](docs/agents/worksheet-batch-playbook.md).

Terms are defined in [`GLOSSARY.md`](GLOSSARY.md); reasons live in [`docs/adr/`](docs/adr/); code rules live in [`CODING_STANDARDS.md`](CODING_STANDARDS.md).

Each rule names its enforcement:

- **[guard]**: the print layout guard (Playwright, Edge) fails the build.
- **[test]**: a Vitest test fails.
- **[review]**: checked in code review and by the user before a batch closes.

## 1. Scope, precedence, amendments

1.1 This constitution governs math Worksheets and Answer Keys for all grades. Reading worksheets are out of scope.

1.2 Order of authority: this constitution, then the batch spec, then the **Lesson Blueprint**. A batch spec that needs a different rule amends the constitution first.

1.3 A rule changes only with the user's approval. Edit the rule in place, add a dated line to the amendment log at the bottom, and write an ADR when the change is hard to reverse, surprising without context, and the result of a real trade-off.

## 2. Page and print

2.1 A4 portrait, named page `worksheet-page` with margins 10 mm top, 10 mm sides, 14 mm bottom (ADR-0012). **[test]**

2.2 Print at scale 1.0, always (ADR-0013). A Worksheet fits on 1 page by default and on 2 pages at most; a sheet that does not fit is a blueprint design error, fixed by fewer or narrower exercises. **[guard]**

2.3 An Exercise stays whole on one page, and a Section header stays on the same page as its first Exercise. **[guard]**

2.4 Print and Download produce the same PDF through the same pipeline (ADR-0011). **[test]**

2.5 Full color with `print-color-adjust: exact`, and every color cue paired with a shape, pattern, or silhouette cue so the page reads in grayscale (ADR-0006). **[review]**

## 3. Layout and size standard

3.1 Every element sits fully inside its exercise card and its Section, no text is clipped, and no sibling elements overlap. Tolerance is 0 px. **[guard]**

3.2 The exercise card's usable width is 660 px. An exercise lays out its content on exactly one of these column layouts, chosen from its parameters: **[test]** **[guard]**

| Layout    | Column width | Gap   |
| --------- | ------------ | ----- |
| 1 column  | 660 px       | –     |
| 2 columns | 324 px       | 12 px |
| 3 columns | 212 px       | 12 px |

3.3 Heights come from parameters, never from content wrapping: a box is sized for the largest content its parameters allow. **[guard]**

3.4 Canonical sizes. Every instance of these renders at exactly this size: **[test]** **[guard]**

| Element             | Size                                |
| ------------------- | ----------------------------------- |
| Answer Slot (digit) | 48 × 48 px                          |
| Answer Slot (line)  | 32 × 160 px                         |
| Five-frame cell     | 48 px (frame 240 px wide)           |
| Number Bond         | 56 px circles in a 212 × 160 px box |
| Equation Strip      | 48 px tall                          |
| Balance Scale       | 212 × 136 px                        |

3.5 Each new Visual Model adds its canonical size to the table in 3.4, sized to fit one column of 3.2.

## 4. Type scale

4.1 Student-facing text uses only these sizes, and nothing on a Worksheet or Answer Key is smaller than 12 px: **[test]** **[guard]**

| Use                                  | Size  |
| ------------------------------------ | ----- |
| Section title                        | 20 px |
| Exercise prompt                      | 16 px |
| Labels inside models, Strategy Hints | 13 px |
| Digits in Answer Slots and models    | 28 px |
| Header and footer metadata           | 12 px |

4.2 An exercise prompt is at most 2 lines. A longer prompt is rewritten, never wrapped further. **[guard]**

## 5. Worksheet anatomy

5.1 Every Worksheet has the illustrated header (Grade, Unit, Lesson number and Arabic title, Standard pills, الاسم, التاريخ, كيف كان أدائي؟), the three Sections in order (تهيئة, تدرّب, تحدٍّ وتقييم), and a footer carrying the Seed. **[test]**

5.2 Section sizes: Warm-Up 1–2, Practice 2–4, Challenge & Assessment 1–2 Exercises. **[test]**

5.3 Warm-Up draws `Easy` Exercises from the lesson's first authored **Prerequisite** (primary path before `○`), falling back to the lesson's own `Easy` tier. **[test]**

5.4 Curriculum question types map to Sections: Practice uses the lesson's **Workbook** types; Challenge & Assessment uses one **Brain Builder** and one **Problem of the Day**. For a grade whose curriculum does not list question types yet, the batch spec states the mapping. **[review]**

5.5 **Teacher Notes** never print. Activities that depend on timing or live interaction (flash cards, quick images) go in Teacher Notes; the Worksheet adapts the objective to a static exercise. **[test]** **[review]**

## 6. Difficulty

6.1 **Difficulty Mode** is Scaffolded (Easy → Intermediate → Advanced across the three Sections) or one Difficulty Level held across all Sections. **[test]**

6.2 Difficulty Levels follow concrete → pictorial → abstract: **[review]**

| Level        | Number range                     | Model                     | Response                       |
| ------------ | -------------------------------- | ------------------------- | ------------------------------ |
| Easy         | Narrower than the lesson's range | Fully shown               | Most support: trace or choose  |
| Intermediate | The lesson's full range          | Shown                     | Write                          |
| Advanced     | The lesson's full range          | Partly or fully withdrawn | Write or draw, with edge cases |

6.3 Edge cases (0 as a quantity, an unknown in a non-standard position such as a missing Part, reversed forms such as `٥ = ٣ + ٢` outside K-35) appear only at Advanced or in Challenge & Assessment. **[review]**

## 7. Generation

7.1 Generation is template- and Seed-driven, with no runtime AI (ADR-0002). The same `(grade, lesson, seed, difficulty)` produces the same Worksheet and Answer Key (ADR-0004). **[test]**

7.2 Blueprints declare limits (ranges, minimums, allowed representations) and the Seed picks the values. Blueprints authored before Unit 3 of Grade K (K-1 to K-26) keep their fixed values; every other rule still applies to them. **[review]**

7.3 Fact selection: no fact repeats within one Exercise; across the sheet, unused facts come first and repeats are allowed only once the pool is used up. Facts that differ only in order (`٣ + ٢`, `٢ + ٣`) are different facts. **[test]**

7.4 Every generated item is mathematically correct by construction, and a domain test checks it across many Seeds (for example, every Number Bond satisfies Part + Part = Total). **[test]**

## 8. Answer Slots and the Answer Key

8.1 `؟` appears only in an Answer Slot that stands for an unknown value inside a mathematical model; slots for tracing, copying, and free responses stay blank. **[test]**

8.2 The Answer Key mirrors its Worksheet in the same layout: every Answer Slot becomes a solved slot of the same size, and every drawn response (lines, circles, crossed-off items, filled counters) is shown in the accent style. **[test]** **[guard]**

8.3 Every Answer Key Exercise carries a **Strategy Hint**. **[test]**

## 9. Language, numerals, direction

9.1 All student-facing text is simplified Modern Standard Arabic and uses the terms in `GLOSSARY.md`; a term's `_Avoid_` forms never appear. **[test]**

9.2 Every visible number uses **Eastern Arabic Numerals**; Western digits appear only in Standard codes and SVG attributes (ADR-0001, `CODING_STANDARDS.md` §3). **[test]**

9.3 Equations, sequences, patterns, and frame fills flow right to left; the first Part is rightmost. Multi-digit numbers keep positional order (`١٢`). **[review]**

9.4 Child-facing and teacher-facing text are written in different voices. A child-facing prompt or Strategy Hint states what the child does, in at most two steps joined by `ثم`, opening with an approved imperative (`عدّ`، `انظر`، `صِلْ`، `لوّن`، `اختر`، `اكتب`), and naming only `GLOSSARY.md` terms. Teacher-facing text may state objectives and explain reasoning, and may use a descriptive phrase such as `العدد الكلي` where the child-facing term is `الكلّ`. **[review]**

9.5 An Exercise prompt opens with the instruction, never with a topic label naming the Section, the exercise type, or the lesson subject (`تهيئة الأشكال:`, `تحدّي المجسّمات:`, `مسألة اليوم:`). Section names belong to the Section header alone, and **Problem of the Day** (§5.4) is a structural type, not printed text. **[test]**

9.6 Diacritics appear only where they disambiguate a word or guide reading aloud (`الكلّ`, `صِلْ`, `تدرّب`); text is neither fully vocalized nor fully stripped. **[review]**

## 10. Visual Models

10.1 Every new Visual Model defines: its canonical size (added to 3.4), its Worksheet and Answer Key states, how it fills or reads right to left, its grayscale cue, and every position that can hold an unknown, so later units reuse it unchanged. **[review]**

10.2 Visual Models are richly styled SVG (ADR-0006) and render the same in preview and PDF. **[review]**

## 11. Exercise Archetypes

11.1 An archetype is named after what the student does (join, match, judge, trace), never after a lesson or a Visual Model. **[review]**

11.2 Reuse before you build, in this order: use an existing archetype or Visual Model as it is; add a parameter or mode; extend it; create a new archetype only for a new student action, or a new Visual Model only for a new representation. The batch spec records which step each new need reached and why. **[review]**

11.3 Registration follows `CODING_STANDARDS.md` §2 and §4. **[review]**

## 12. Definition of done for a batch

A batch closes when all of these hold:

- The layout guard is green for every authored lesson, not only the new ones.
- The primary-seam tests and domain tests pass for the new lessons.
- Every new term is in `GLOSSARY.md` and every new size is in §3 or §4.
- The user has reviewed the saved page PNGs and the Arabic text of every new lesson.

## Amendment log

- 2026-11-06: Constitution adopted.
- 2026-11-06: §9.1 upgraded to `[test]`; §9.4 (child vs. teacher voice), §9.5 (Section names), and §9.6 (diacritics) added, acting on the Arabic language evaluation of K-31 (ADR-0014).
- 2026-11-06: Added Balance Scale (`212 × 136 px`) to §3.4 canonical sizes per §3.5 and §10.1, and noted K-35's curriculum exception for reversed equations (`٥ = ٣ + ٢`) in §6.3.
