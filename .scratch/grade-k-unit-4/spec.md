# Grade K Unit 4 — Subtract to 5

**Status:** open

## Problem Statement

Grade K Units 1–3 (Lessons K-1 to K-38) are authored; Unit 4 _Subtract to 5_ (K-39 to K-48) shows only a fallback preview and has no Arabic titles or **Teacher Notes**. Unit 4 introduces **Take Away**: a known **Part** is removed from a **Total** to find the **Missing Part** that is left.

The Unit 3 engines assume addition throughout:

- Facts are always generated as Part + Part by `selectAdditionFacts` in `src/archetypes/join-parts.tsx`, which `JoinParts`, `ConnectMatch`, and `JudgeEquality` all share.
- The Equation Strip (`EquationStripView`, `src/visual-models/unit-3-models.tsx`) renders only `+`, and the Balance Scale's `missingAddend` pan is hard-coded as `given + slot`.
- Tally marks with two Parts draw a literal `+` between groups (`src/visual-models/unit-2-models.tsx`).
- Only the five frame can **Cross Off** counters (`crossedOutCount`), and its X looks the same on the Worksheet and the Answer Key; snap cubes, tally marks, dice, and dominoes cannot show anything taken away.
- Picture graphs show only everyday-object icons and have no mode where the child draws missing icons (needed for K-39's SHAPE GRAPH).

## Solution

Author K-39 to K-48 on one new archetype (`TakeAway`), a shared part-whole fact module, an `operation` parameter on `JudgeEquality` and `ConnectMatch`, subtraction support in the Equation Strip and Balance Scale, cross-off modes on every quantity model, and an extended `PictureGraphRead`. All rules in [`WORKSHEET_CONSTITUTION.md`](../../WORKSHEET_CONSTITUTION.md) apply, including the 2026-11-07 amendments (§9.3 minus sign and order, §9.4 imperatives `اشطب` and `اطرح`, §6.3 reversed forms in K-45).

## User Stories

1. As a Grade K teacher teaching K-39, I want students to read horizontal picture graphs whose categories each have 1 fewer item, write how many of each, count and compare solid shapes, and draw the missing shapes so a count table and a graph match (SHAPE GRAPH).
2. As a Grade K teacher teaching K-40, I want students to see a Total on a five frame, cross off the Part they know, and write the Missing Part in a Number Bond, and to match five frames to Number Bonds (MATCHING A).
3. As a Grade K teacher teaching K-41, I want students to take away a Part from snap cubes, tally marks, dice, and dominoes and write the Missing Part, and to match dice to Number Bonds (MATCHING B).
4. As a Grade K teacher teaching K-42, I want students to complete subtraction Equations (`٥ − ٢ = ؟`) checked against crossed-out counters and the matching Number Bond, and to match Number Bonds to Equations (MATCHING C).
5. As a Grade K teacher teaching K-43, I want students to use a five frame to complete subtraction Equations and to match five frames to Equations (MATCHING D).
6. As a Grade K teacher teaching K-44, I want students to complete subtraction models on snap cubes, tally marks, and dice with Equations, and to use a picture graph to complete take-away Equations (MORE OR LESS).
7. As a Grade K teacher teaching K-45, I want students to judge subtraction Equations true or false, cross off circles to make both sides equal, and fill a Balance Scale from a number bank (Teeter Tots).
8. As a Grade K teacher teaching K-46 to K-48, I want students to subitize subtraction Expressions that combine a five frame with a digit, Number Bonds, and Equations, and to cross off the item in each row that is not true (WHAT'S WRONG A–C).
9. As a teacher, I want "Regenerate" to produce new subtraction facts within the lesson's limits, without repeating a fact inside one exercise.
10. As a teacher, I want every Unit 4 Answer Key to show solved Number Bonds and Equations, crossed-off items in the accent style, circled صح / خطأ, drawn shapes, and a **Strategy Hint**.
11. As a teacher, I want Arabic titles, Teacher Notes, classroom activities (including the timed flash activities for K-46 to K-48), and common misconceptions for K-39 to K-48.

## Implementation Decisions

1. **Domain model** (`GLOSSARY.md`, already updated): Part, Total, and Missing Part cover subtraction; new terms **Take Away** (الطرح) and **Cross Off** (اشطب). The child is asked `كم بقي؟`; Difference, الفرق, الباقي (as a noun), minuend, and subtrahend never appear.

2. **Reuse ladder** (constitution §11.2):

   | Need                                                   | Ladder step                                 | Reason                                                       |
   | ------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------ |
   | Take away a Part, write the Missing Part               | New `TakeAway` archetype                    | New student action; `JoinParts` is named after joining       |
   | Seed-chosen facts for add and subtract                 | Extract a shared part-whole fact module     | Same facts, both operations need them                        |
   | True/false, WHAT'S WRONG, Teeter Tots with subtraction | Add `operation` to `JudgeEquality`          | Same student action (judge equality)                         |
   | MATCHING A–D, MORE OR LESS                             | Add `operation` to `ConnectMatch`, new pair | Same student action (match); new Number Bond → Equation pair |
   | `−` in Equations                                       | Add a mode to the Equation Strip            | Same representation, new operator                            |
   | Subtraction pans                                       | Add a mode to the Balance Scale             | Same representation, new pan contents                        |
   | Crossed-off items on snap cubes, tally, die, domino    | Add a mode to each model                    | Same representations, new state                              |
   | Student-drawn X on the five frame                      | Add a mode to the five frame                | Same representation, new Answer Key state                    |
   | Shape and solid icons, draw-missing SHAPE GRAPH        | Extend `PictureGraphRead` and picture graph | Same student action (read a graph), new icons and response   |

3. **`TakeAway`** (اطرح):
   - Representations: five frame, five frame with a digit (the frame shows the Total; the digit is the Part taken away), snap cubes, tally marks, die, domino. No pictures.
   - Response forms: Number Bond, Equation, or a single `كم بقي؟` Answer Slot.
   - Actions: trace, write, cross off then write; at Advanced only, draw the Total then cross off.

4. **Unknown positions**:
   - Default: the Missing Part (`٥ − ٢ = ؟`).
   - The Part taken away (`٥ − ؟ = ٣`) only at Advanced or in Challenge & Assessment.
   - An unknown Total and the reversed form (`٣ = ٥ − ٢`) only in K-45 and Advanced Challenge items.
   - Number Bond: the Part taken away is in the right (first) circle and the Missing Part on the left, matching Equation order; swapped only at Advanced.

5. **Cross Off** (every quantity model):
   - Modes: `shown` (X pre-drawn on both Worksheet and Answer Key) and `student` (Worksheet clean, Answer Key draws the X in the accent style, constitution §8.2).
   - Same X glyph as the five frame; the X is itself the grayscale cue (§2.5). Crossed items stay visible under the X.
   - Removal runs from the left end of the run (five frame, snap cubes, tally marks).
   - Die: the remaining pips form the Missing Part's die pattern where possible (`٥ − ٢` leaves the diagonal `٣`), otherwise a fixed pip order.
   - Domino: the Total is both halves; one whole half is crossed off as the Part taken away.

6. **Lesson rules**:
   - K-46 to K-48: the X is pre-drawn at Easy only; at Intermediate and Advanced the frame shows the Total and `− digit` with no X (the child crosses off mentally).
   - K-45 to K-48 items are subtraction only, except the K-47 and K-48 "subtract or add" Problems of the Day: a missing-Part item whose Strategy Hint offers both ways (take away, or count on from the known Part).
   - K-44 MORE OR LESS stays take-away: the graph gives one category's count as the Total; the Equation removes a given Part. Comparison subtraction is out of scope.
   - K-45 Balance Scale: one pan may hold a subtraction Expression (`٥ − ١`); Teeter Tots adds number-bank slots for a missing Part or missing Total; two-Expression pans (`٥ − ١` vs `٢ + ٢`) only at Advanced or in Challenge & Assessment. Problem of the Day: cross off circles so both sides are equal, then complete the Equation.
   - Timed flash activities stay in Teacher Notes (constitution §5.5).

7. **New Visual Model size** (constitution §3.5, §10.1): the SHAPE GRAPH is a count table (one row per category: a 32 px icon and a 48 px digit) beside the horizontal picture graph, together in the 1-column 660 px layout. Missing cells are dashed outlines; the Answer Key draws the shapes in the accent style. The canonical size is added to §3.4 after measuring the existing graph height in ticket 05.

8. **Unit 4 ranges** (constitution §6.2, §7.2–7.3): Blueprints declare a Total range, a minimum Part, and allowed representations; the Seed picks facts. `٥ − ٢` and `٥ − ٣` are different facts.
   - Easy: Total 2–4, Part taken away ≥ 1, Missing Part ≥ 1, full model shown, digits traced.
   - Intermediate: Total ≤ 5, both Parts ≥ 1, model shown, digits written.
   - Advanced: Total ≤ 5, taking away 0 or the whole Total allowed (`٥ − ٥ = ٠`, `٤ − ٠ = ٤`), model partly withdrawn.

9. **Arabic content**: Titles, Teacher Notes, classroom activities, misconceptions, prompts, and Strategy Hints for K-39 to K-48 are drafted in simplified Modern Standard Arabic per ticket and reviewed by the user, with the saved page PNGs, before each ticket closes. No separate language-pass ticket.

## Testing Decisions

- Constitution §12 is the definition of done; the layout guard gates every authored lesson, old and new.
- Primary-seam tests (`renderWorksheetSurface`) extend to K-39 to K-48: seed determinism, Warm-Up prerequisite resolution, difficulty progression, Strategy Hints on every Answer Key exercise, the Eastern Arabic Numerals invariant, Answer Slot sizes, and `−` (never a hyphen) in every subtraction Equation.
- Fact-selection tests: across many seeds, every subtraction fact respects the declared limits and the no-repeat rule; addition lessons K-27 to K-38 produce the same Worksheets after the fact module is extracted.
- Domain tests: Total − Part = Missing Part for every generated item; crossed-off counts equal the Part taken away; die cross-offs leave a valid pattern where one exists; `true-false` and `whats-wrong` items carry the correct truth value; Balance Scale solutions balance.

## Out of Scope

- Comparison subtraction ("how many more?") and mixed add/subtract rows.
- Picture representations for `TakeAway`.
- Interactive or timed on-screen flash activities.
- Unit 5 _Word Problems to 5_ and later units.

## Delivery

Branch `feat/grade-k-unit-4` from the tip of `feat/grade-k-unit-3`. Tickets 01 → 02 → 03 → 04 are ordered (each lesson's Warm-Up draws on the previous ticket's lessons, and WHAT'S WRONG reuses ticket 03's subtraction `JudgeEquality`); ticket 05 is independent.
