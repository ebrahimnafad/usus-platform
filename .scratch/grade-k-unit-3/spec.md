# Grade K Unit 3 — Add to 5 (with a pixel-exact layout standard)

**Status:** ready-for-agent

## Problem Statement

Grade K Units 1–2 (Lessons K-1 to K-26) are authored; Unit 3 *Add to 5* (K-27 to K-38) shows only a fallback preview and has no Arabic titles or **Teacher Notes**. Unit 3 introduces ideas the platform cannot yet draw or name: **Parts** and a **Total**, the **Number Bond**, **Equations** and **Expressions**, true/false judgment, and the **Balance Scale**.

At the same time, nothing guarantees that a printed **Worksheet** is free of jammed, clipped, or overflowing content. Only **Answer Slot** sizes are tested; each **Exercise Archetype** sizes itself (the source of past bugs such as the fixed-height ConnectMatch rows), and the PDF exporter shrinks oversized sheets to 0.75×/0.65×, so the same 48 px Answer Slot prints at different physical sizes on different sheets.

## Solution

1. Establish a measurable layout standard (fixed sizes for exercise-card columns and **Visual Models**) and an automated layout guard that renders every authored lesson in print conditions and fails on any overflow, clipping, overlap, split exercise, page-budget breach, or resized Answer Slot. Worksheets print at scale 1.0 (`ADR-0013`).
2. Bring K-1 to K-26 into compliance with the guard.
3. Author Unit 3 (K-27 to K-38) on two new archetypes (`JoinParts`, `JudgeEquality`), an extended `ConnectMatch`, and three new Visual Models (Number Bond, Equation Strip, Balance Scale), with seed-chosen addition facts.

## User Stories

1. As a teacher, I want every printed **Worksheet** and **Answer Key** to have no content spilling outside its card, no clipped text, and no overlapping elements, so that every sheet looks professionally typeset.
2. As a teacher, I want an **Answer Slot**, a five-frame cell, and a **Number Bond** to have the same physical size on every sheet I print, so that students meet one consistent visual language.
3. As a teacher, I want each Worksheet to fit on 1 A4 page by default and never exceed 2 pages, without the content being shrunk to make it fit.
4. As a teacher, I want no **Exercise** split across a page break and no **Section** header stranded at the bottom of a page.
5. As a Grade K teacher teaching K-27 and K-28, I want students to see two **Parts** on a five frame (two-tone counters with outlined parts) and count or trace each Part and the **Total** in a parts-and-total table.
6. As a Grade K teacher teaching K-29 to K-31, I want students to find the Total of two Parts shown on five frames, snap cubes, tally marks, or dice/dominoes and write it in a **Number Bond**.
7. As a Grade K teacher teaching K-32 to K-34, I want students to complete addition **Equations** (`٣ + ٢ = ؟`) read right to left, linked to a five frame or alternative model and to the matching Number Bond.
8. As a Grade K teacher teaching K-35, I want students to judge whether Equations are true or false (circle صح / خطأ), color pips to make both sides equal, and fill a **Balance Scale** (Teeter Tots) from a number bank.
9. As a Grade K teacher teaching K-36 to K-38, I want students to subitize **Expressions** that combine a five frame with a digit, Number Bonds, and Equations, and to cross off the item in each row that is not true ("What's Wrong?").
10. As a Grade K teacher, I want the MATCHING Brain Builders (A–F) as `ConnectMatch` exercises that join five frames, dice, or tally-mark Expressions to parts tables, Number Bonds, Equations, or Totals, followed by a "write the missing Total" slot.
11. As a teacher, I want "Regenerate" to produce genuinely new addition facts within the lesson's limits, without repeating a fact inside one exercise.
12. As a teacher, I want the **Answer Key** for every Unit 3 exercise to show filled Number Bonds, solved Equations, drawn counters, circled صح / خطأ, crossed-off false items, and a **Strategy Hint**.
13. As a teacher, I want Arabic titles, Teacher Notes, classroom activities (including the timed flash activities for subitizing lessons), and common misconceptions for K-27 to K-38.

## Implementation Decisions

All rules in [`WORKSHEET_CONSTITUTION.md`](../../WORKSHEET_CONSTITUTION.md) apply. This batch first builds the tooling that enforces them (decisions 1–2), then adds Unit 3 (decisions 3–6).

1. **Constitution enforcement**: Implement constitution §2.2 (full-scale printing, `ADR-0013`), the size constants of §3 and the type scale of §4 as exported constants, each asserted by a test.

2. **Layout guard** (Playwright, `channel: 'msedge'`):
   - Renders the real print route with print styles applied at A4 size: every authored lesson × 5 fixed seeds × 4 Difficulty Modes × worksheet and Answer Key.
   - Fails with **0 px tolerance** on every **[guard]** rule of the constitution: an element's box extends past its exercise card or Section; any text element has `scrollWidth > clientWidth` or `scrollHeight > clientHeight`; sibling elements overlap; an exercise is split across a page break; the PDF exceeds 2 pages; a canonical size (§3.4) or type size (§4.1) renders at any other size; a prompt exceeds 2 lines.
   - Saves a PNG of every page to a git-ignored folder for manual review. No pixel-diff baselines.

3. **Domain model** (`GLOSSARY.md`): Part (الجزء), Total (الكلّ), Number Bond, Equation (معادلة), Expression (تعبير), Balance Scale.
   - Number Bond: Total circle on top, two Part circles below, first Part on the right; one size; no rotated variants in Grade K.
   - Equations flow right to left (`٣ + ٢ = ٥`, first Part rightmost). The total-first form (`٥ = ٣ + ٢`) appears only in K-35 and in Advanced Challenge items.

4. **Exercise Archetypes** (constitution §11.2 reuse ladder):

   | Need | Ladder step | Reason |
   | --- | --- | --- |
   | MATCHING A–F | Extend `ConnectMatch` | Same student action (match); only new endpoint types |
   | Parts → Total (tables, bonds, equations, COLOR CODE) | New `JoinParts` | New student action: join two Parts into a Total |
   | True/False, What's Wrong?, Teeter Tots | New `JudgeEquality` | New student action: judge whether two sides are equal |
   | Number Bond, Equation Strip, Balance Scale | New Visual Models | New representations |
   | Five frame with two Parts | Add a mode to the five frame | Same representation, adds two-tone Parts |


   - **`JoinParts`** (اجمع الجزأين): two Parts in one representation (five frame, snap cubes, tally marks, dice/domino, pictures) and one response form (parts-and-total table, Number Bond, Equation). Response actions: trace, write, or draw (color counters into an empty five frame). The unknown is the Total, except in Challenge & Assessment or at Advanced, where a Part may be unknown ("How many more do you need?").
   - **`JudgeEquality`** (صح أم خطأ): modes `true-false` (circle صح / خطأ), `whats-wrong` (cross off the one false item in a row of Equations, Expressions, or Number Bonds), `balance` (fill a Balance Scale from a number bank so both pans are equal).
   - **`ConnectMatch`** extended with Number Bond, Equation, parts-table, and tally-expression endpoints, plus an optional "write the missing Total" Answer Slot per row.

5. **Unit 3 ranges** (applying constitution §6.2 and §7.2–7.3): Blueprints declare a Total range, a minimum Part, and allowed representations; the Seed picks facts.
   - Easy: Total ≤ 4, Part ≥ 1, full concrete model shown, digits traced.
   - Intermediate: Total ≤ 5, Part ≥ 1, model shown, digits written.
   - Advanced: Total ≤ 5, Part ≥ 0, model partly withdrawn (student draws a Part).

6. **Arabic content**: Titles, Teacher Notes, classroom activities, misconceptions, prompts, and Strategy Hints for K-27 to K-38 are drafted in simplified Modern Standard Arabic matching K-1 to K-26, and reviewed by the user before each ticket closes.

## Testing Decisions

- Constitution §12 is the definition of done; the layout guard (decision 2) gates every authored lesson, old and new.
- Primary seam tests (`renderWorksheetSurface`) extend to K-27 to K-38: seed determinism, Warm-Up prerequisite resolution, difficulty progression and clamping, Answer Key Strategy Hints on every exercise, the Eastern Arabic Numerals invariant, and Answer Slot sizes.
- Fact-selection tests: across many seeds, every generated fact respects the declared limits and the no-repeat rule.
- Domain tests: Number Bonds always satisfy Part + Part = Total; `true-false` and `whats-wrong` items carry the correct truth value; Balance Scale solutions balance.

## Out of Scope

- Unit 4 *Subtract to 5* and later units (the new Visual Models are built to be reused there).
- Pixel-diff visual regression baselines.
- Interactive or timed on-screen flash activities (these stay in Teacher Notes).

## Delivery

Branch `feat/grade-k-unit-3` from `integration/studio-panel`. Tickets 01 and 02 merge together, since the guard is red between them.
