# Grade K Unit 8 — Subtract to 10 (K-89 to K-98)

**Status:** ready-for-agent

## Problem Statement

Grade K Units 1–7 (Lessons K-1 to K-88) are authored; Unit 8 _Subtract to 10_ (K-89 to K-98) currently has no blueprints, Arabic titles, or Teacher Notes. Unit 8 mirrors Unit 4 (Subtract to 5) scaled from five frames to ten frames, just as Unit 7 mirrored Unit 3 (Add to 5) scaled to 10.

Unit 8 introduces counting backward from 10 with picture graphs and sequence exercises (K-89, K-90), finding the unknown part with number bonds and equations on ten frames (K-91, K-92), balance equations for subtraction within 10 (K-93*), subitizing subtraction with ten-frame counters, number bonds, and equations (K-94 to K-96), and take-from and take-apart story problems within 10 (K-97, K-98).

The Unit 7 batch already added `"ten-frame"` and `"ten-frame-and-digit"` representations to `TakeAway`, `"ten-frame-to-bond"` and `"ten-frame-to-equation"` match kinds to `ConnectMatch`, subtraction `operation` support to `JudgeEquality` and `ConnectMatch` (from Unit 4), and `totalRange: [6, 10]` scaling to `SolveWordProblem`. Nearly all of Unit 8's question types are achievable with existing archetypes used as-is or with parameter values. The only new archetype is **Digicross** for K-90's Brain Builder.

## Solution

Author K-89 to K-98 with:

1. **One new Exercise Archetype**: `Digicross` (`324 × 212 px` canonical grid size) — a 3×3 number grid where each horizontal and vertical line is a consecutive counting sequence (forward or backward); the student fills in missing cells.
2. **Existing archetypes used as-is or with parameters**:
   - `PictureGraphRead`: `countsPattern: "decreasing-by-1"` for K-89 WB/BB.
   - `SequenceAndZero`: `sequenceMode: "backward"`, `visualKind: "ten-frame"` for K-90 WB.
   - `TakeAway`: `representation: "ten-frame"` / `"ten-frame-and-digit"`, `responseForm: "number-bond"` / `"equation"` / `"answer-slot"`, `crossOffMode: "shown"` / `"student"` for K-91, K-92, K-94, K-95, K-96.
   - `JudgeEquality`: `operation: "subtract"`, `totalRange: [6, 10]`, modes `"true-false"`, `"whats-wrong"`, `"balance"` for K-93 and K-94–96 BB.
   - `ConnectMatch`: `operation: "subtract"`, `matchingMode: "ten-frame-to-bond"` / `"ten-frame-to-equation"` for K-91/K-92 BB.
   - `SolveWordProblem`: `situation: "take-from"` / `"take-apart"`, `totalRange: [6, 10]` for K-97, K-98.
3. **Constitution §3.4 update**: Add `Digicross Grid (324 × 212 px)` canonical size per §3.5 and §10.1.

## User Stories

1. As a Grade K teacher teaching K-89, I want students to read picture graphs counting backward from 10, write how many of each item, answer more/fewer questions, and color trucks to count down (COUNT DOWN BB).
2. As a Grade K teacher teaching K-90, I want students to count backward from 10 connecting groups of ten-frame visuals in order, cross off circles to count backward, and fill in blanks in a crossing number grid where each line counts forward or backward (DIGICROSS BB).
3. As a Grade K teacher teaching K-91, I want students to use ten frames to find the unknown part and complete number bonds, imagine the total and cross off a part to find how many are left, and match ten frames to number bonds filling in the missing part (MATCHING A BB).
4. As a Grade K teacher teaching K-92, I want students to use ten frames to complete subtraction equations, imagine the total and cross off a part, and match ten frames to equations filling in the missing part (MATCHING B BB).
5. As a Grade K teacher teaching K-93, I want students to judge whether subtraction equations within 10 are true or false, match expressions with the same value, and fill a Balance Scale from a number bank (TEETER TOTS BB).
6. As a Grade K teacher teaching K-94, I want students to subitize ten-frame counters, cross off the given part and write how much is left, and identify the subtraction problem in each row that is NOT true (WHAT'S WRONG A BB).
7. As a Grade K teacher teaching K-95, I want students to use ten-frame models to complete subtraction number bonds and identify the incorrect bond in each row (WHAT'S WRONG B BB).
8. As a Grade K teacher teaching K-96, I want students to use ten frames to show subtraction and complete equations, and identify the incorrect equation in each row (WHAT'S WRONG C BB).
9. As a Grade K teacher teaching K-97, I want students to read take-from stories within 10, complete models and equations, answer how many are left, and match diagrams to take-from word problems (WORD PROBLEM MATCH A BB).
10. As a Grade K teacher teaching K-98, I want students to read take-apart stories within 10, complete models showing how many could be in each part, and match diagrams to take-apart word problems (WORD PROBLEM MATCH B BB).
11. As a teacher, I want "Regenerate" to produce new subtraction facts within the lesson's limits, without repeating a fact inside one exercise.
12. As a teacher, I want every Unit 8 Answer Key to show solved Number Bonds and Equations, crossed-off items in the accent style, filled blanks, and a **Strategy Hint**.
13. As a teacher, I want Arabic titles, Teacher Notes, classroom activities (including timed flash activities for K-94 to K-96), and common misconceptions for K-89 to K-98.

## Implementation Decisions

1. **Domain model** ([`GLOSSARY.md`](../../GLOSSARY.md)):
   - No new terms required. All terms (Take Away, Missing Part, Number Bond, Equation, Balance Scale, Picture Graph, Cross Off, Story Problem, Take-Apart, Ten Frame) already exist.

2. **Reuse ladder** (constitution §11.2):

   | Need                                                    | Ladder step                    | Reason                                                                     |
   | ------------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------- |
   | Count backward picture graphs (K-89 WB/BB)              | Use as-is (`PictureGraphRead`) | `countsPattern: "decreasing-by-1"` already exists                          |
   | Count backward with ten-frame sets (K-90 WB)            | Use as-is (`SequenceAndZero`)  | `sequenceMode: "backward"`, `visualKind: "ten-frame"` already exist        |
   | DIGICROSS grid puzzle (K-90 BB)                         | New `Digicross` archetype      | New student action: infer values in a crossing number grid                 |
   | Find unknown part with bonds + ten frames (K-91 WB)     | Use as-is (`TakeAway`)         | `representation: "ten-frame"`, `responseForm: "number-bond"`               |
   | Find unknown part with equations + ten frames (K-92 WB) | Use as-is (`TakeAway`)         | `representation: "ten-frame"`, `responseForm: "equation"`                  |
   | Balance equations subtract within 10 (K-93 WB/BB)       | Use as-is (`JudgeEquality`)    | `operation: "subtract"`, `totalRange: [6, 10]`                             |
   | Subitize and cross off ten-frame counters (K-94 WB)     | Use as-is (`TakeAway`)         | `representation: "ten-frame-and-digit"`, `crossOffMode: "student"`         |
   | Subitize subtraction bonds (K-95 WB)                    | Use as-is (`TakeAway`)         | `representation: "ten-frame"`, `responseForm: "number-bond"`               |
   | Subitize subtraction equations (K-96 WB)                | Use as-is (`TakeAway`)         | `representation: "ten-frame"`, `responseForm: "equation"`                  |
   | WHAT'S WRONG A–C (K-94–96 BB)                           | Use as-is (`JudgeEquality`)    | `mode: "whats-wrong"`, `operation: "subtract"`, `totalRange: [6, 10]`      |
   | MATCHING A–B (K-91–92 BB)                               | Use as-is (`ConnectMatch`)     | `"ten-frame-to-bond"` / `"ten-frame-to-equation"`, `operation: "subtract"` |
   | Take-from stories to 10 (K-97 WB/BB)                    | Use as-is (`SolveWordProblem`) | `situation: "take-from"`, `totalRange: [6, 10]`                            |
   | Take-apart stories to 10 (K-98 WB/BB)                   | Use as-is (`SolveWordProblem`) | `situation: "take-apart"`, `totalRange: [6, 10]`                           |
   | COUNT DOWN (K-89 BB)                                    | Use as-is (`PictureGraphRead`) | Decreasing-by-1 pattern, color and count                                   |
   | WORD PROBLEM MATCH A–B (K-97–98 BB)                     | Use as-is (`SolveWordProblem`) | `matchingMode: "model-to-word-problem"` with subtraction                   |

3. **Digicross** (new archetype):
   - A 3×3 grid of number cells where each horizontal and vertical line forms a consecutive counting sequence (forward or backward).
   - Canonical size: `324 × 212 px` (fits 2-column layout, same as Numtanga).
   - Parameters: `gridSize` (default 3×3), `numberRange: [min, max]`, `missingCount`, `directions: "forward" | "backward" | "mixed"`.
   - Easy: more given numbers, backward only. Advanced: mixed directions, fewer given numbers.
   - Answer Key: fills blanks in accent style with Strategy Hint.
   - Constitution §3.4: add `Digicross Grid (324 × 212 px)`.

4. **Difficulty ranges** (constitution §6.2, §6.3, §7.2–7.3):
   - **Easy**: Totals 6–8, both parts ≥ 1, ten frame fully shown, X pre-drawn (`crossOffMode: "shown"`), trace or choose response.
   - **Intermediate**: Full range 6–10, both parts ≥ 1, ten frame shown, write digits/equations.
   - **Advanced**: Full range 6–10, `0` allowed as a part (`١٠ − ١٠ = ٠`, `٧ − ٠ = ٧`), non-standard unknown positions (missing Total) only at Advanced or Challenge, ten frame partly withdrawn.

5. **Unknown positions**:
   - Default: Missing Part (`١٠ − ٣ = ؟`).
   - Missing Part taken away (`١٠ − ؟ = ٧`) only at Advanced or in Challenge & Assessment (§6.3).
   - Missing Total (`؟ − ٣ = ٧`) and reversed forms only at Advanced Challenge items.

6. **Warm-up prerequisite mapping** (§5.3):
   - K-89: K-64 (picture graph reading)
   - K-90: K-66 (count backward with sets)
   - K-91: K-87 (addition missing-part with equations — bridges addition → subtraction)
   - K-92–K-98: each draws from its first prerequisite (the immediately preceding lesson in the unit chain)

7. **K-92 BB clarification**: The curriculum's "Fill in the missing total" means the Missing Part (the answer of a standard subtraction equation `Total − Part = ؟`). The BB uses standard subtraction, not a non-standard unknown position.

8. **Arabic content**: Titles, Teacher Notes, classroom activities, misconceptions, prompts, and Strategy Hints for K-89 to K-98 are drafted in simplified Modern Standard Arabic per ticket and reviewed by the user, with saved page PNGs, before each ticket closes. Timed flash activities (K-94 to K-96) stay in Teacher Notes (§5.5).

## Testing Decisions

- Constitution §12 is the definition of done; the layout guard gates every authored lesson, old and new.
- Primary-seam tests (`renderWorksheetSurface`) extend to K-89 to K-98: seed determinism, Warm-Up prerequisite resolution, difficulty progression, Strategy Hints on every Answer Key exercise, the Eastern Arabic Numerals invariant, Answer Slot sizes, and `−` (never a hyphen) in every subtraction Equation.
- Fact-selection tests: across many seeds, every subtraction fact respects the declared limits and the no-repeat rule.
- Domain tests: Total − Part = Missing Part for every generated item; crossed-off counts equal the Part taken away; `true-false` and `whats-wrong` items carry the correct truth value; Balance Scale solutions balance; Digicross grids have exactly one solution and each line is a valid consecutive sequence.

## Out of Scope

- Comparison subtraction ("how many more/fewer?") — deferred to Unit 9.
- Mixed add/subtract rows in a single exercise.
- Interactive or timed on-screen flash activities.
- Units 9–12.

## Delivery

Branch `feat/grade-k-unit-8` from the tip of `feat/grade-k-unit-7`. Four tickets:

| Ticket | Lessons          | Scope                                                        |
| ------ | ---------------- | ------------------------------------------------------------ |
| 01     | K-89, K-90       | Picture graphs + count backward; **new Digicross archetype** |
| 02     | K-91, K-92, K-93 | Find unknown part (bonds, equations) + balance equations     |
| 03     | K-94, K-95, K-96 | Subitize subtraction trio + WHAT'S WRONG A–C                 |
| 04     | K-97, K-98       | Word problems (take-from, take-apart) + **batch close**      |

Per-ticket layout guard: `--lessons=<ticket-range> --seeds=2`. On ticket 04: validate the full unit `--lessons=K-89..K-98 --seeds=5` first, then batch-close all-lessons sweep `--seeds=5 --png=none` (§12).
