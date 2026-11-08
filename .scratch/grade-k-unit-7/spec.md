# Grade K Unit 7 — Add to 10 (K-74 to K-88)

**Status:** ready-for-agent

## Problem Statement

Grade K Units 1–6 (Lessons K-1 to K-73) are authored; Unit 7 _Add to 10_ (K-74 to K-88) currently has no blueprints, Arabic titles, or Teacher Notes. Unit 7 expands addition from totals within 5 up to 10 using Ten Frames, introducing Shift 1 decompositions for totals 6–10 and turnaround pairs (K-74), combinations of 10 modeled with flat shapes and 3D solids in 2 and 3 parts (K-75 to K-77), number bonds and equations with Ten Frames to find the total (K-78 to K-80), subitizing addition with digits, number bonds, and equations (K-81 to K-83), Add-To and Put-Together story problems to 10 (K-84, K-85), finding missing parts in number bonds and addition equations (K-86, K-87), and balance equations / true-false within 10 (K-88).

## Solution

Author K-74 to K-88 with:

1. **One new Exercise Archetype**: `Numtanga` (`324 × 212 px` canonical grid size) modeling triangular addition pyramids where each higher cell is the sum of two adjacent lower cells.
2. **Extensions to existing Exercise Archetypes and Visual Models**:
   - `JoinParts`: add `"ten-frame"` and `"ten-frame-and-digit"` representations and support for `unknownPosition: "part2" | "part1"`.
   - `TakeAway`: add `"ten-frame"` and `"ten-frame-and-digit"` representations.
   - `SubitizePartWhole`: add `subitizeMode: "three-parts-to-10"`.
   - `ConnectMatch`: add `matchKind: "ten-frame-to-description"`, `"ten-frame-to-bond"`, and `"ten-frame-to-equation"`.
   - `SolveWordProblem`: add `"ten-frame"` representation with `totalRange: [6, 10]`.
   - `ShiftOneDecompose`: scale `totalRange: [6, 10]` for all-combinations and complete-pattern.
   - `JudgeEquality`: scale `totalRange: [6, 10]` for addition balance scales and true/false statements.
3. **Domain model & Constitution updates**:
   - Terms added to `GLOSSARY.md`: **Numtanga** (`نمتنغا`) and **Turnaround Pair** (`الزوج المعكوس`).
   - Constitution §3.4 updated with `Numtanga Grid` (`324 × 212 px`).

## User Stories

1. As a Grade K teacher teaching K-74, I want students to use the Shift 1 strategy to find all number-bond pairs and turnaround pairs for 6, 7, 8, 9, and 10, complete Shift 1 patterns, and solve the GIVE AWAY pencil graph comparison.
2. As a Grade K teacher teaching K-75 to K-77, I want students to model combinations of 10 in 2 parts (K-75) and 3 parts (K-76) using Ten Frames filled with flat shapes and 3D solids, count and quantify items in Ten Frames to find how many in all (K-77), and match Ten Frames to descriptions.
3. As a Grade K teacher teaching K-78 to K-80, I want students to count and quantify using number bonds and Ten Frames (K-78), find the total by visualizing and completing number bonds (K-79) and addition equations (K-80), solve the Number Bond MAZE (total=9), and match Ten Frames to number bonds and equations.
4. As a Grade K teacher teaching K-81 to K-83, I want students to subitize Ten Frames with digits (K-81), number bonds (K-82), and equations (K-83) to find the total, and solve NUMTANGA addition pyramid puzzles A, B, and C.
5. As a Grade K teacher teaching K-84 and K-85, I want students to read and solve Add-To (K-84) and Put-Together (K-85) story problems within 10 using Ten Frames, part-total models, and equations, and solve WORD PROBLEM MATCH A and B.
6. As a Grade K teacher teaching K-86 to K-88, I want students to find missing parts in number bonds (K-86) and addition equations (K-87) using Ten Frames, judge whether addition equations are true or false (K-88), balance scales in TEETER TOTS, and match Ten Frames to missing-part models.

## Implementation Decisions

1. **Domain model** ([`GLOSSARY.md`](../../GLOSSARY.md)):
   - Added **Numtanga** (`نمتنغا`) and **Turnaround Pair** (`الزوج المعكوس`).
2. **Reuse ladder** (constitution §11.2):

   | Need                                              | Ladder step                         | Reason                                                                              |
   | ------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------- |
   | Shift 1 to 6–10, turnaround pairs (K-74)          | Use as-is (`ShiftOneDecompose`)     | Same student action; pass `totalRange: [6, 10]`                                     |
   | Ten-frame shape combos, 2 parts (K-75, K-77)      | Use as-is (`SubitizePartWhole`)     | Existing `"ten-frame-and-shapes"` visual and `"both-parts-to-10"` mode              |
   | Ten-frame shape combos, 3 parts (K-76)            | Add parameter (`SubitizePartWhole`) | Adds `subitizeMode: "three-parts-to-10"`                                            |
   | Number bonds + ten frames → total (K-78–K-80)     | Add parameter (`JoinParts`)         | Adds `representation: "ten-frame"`                                                  |
   | Subitize ten-frame + digit → total (K-81)         | Add parameter (`JoinParts`)         | Adds `representation: "ten-frame-and-digit"`                                        |
   | Subitize ten-frame + bonds/equations (K-82, K-83) | Add parameter (`JoinParts`)         | `representation: "ten-frame"`, `action: "draw-counters"`                            |
   | Add-to / put-together stories to 10 (K-84, K-85)  | Add parameter (`SolveWordProblem`)  | Adds `representation: "ten-frame"`, `totalRange: [6, 10]`                           |
   | Find missing part (K-86, K-87)                    | Add parameter (`JoinParts`)         | `representation: "ten-frame"`, `unknownPosition: "part2"`                           |
   | Balance equations add within 10 (K-88)            | Add parameter (`JudgeEquality`)     | `operation: "add"`, `totalRange: [6, 10]`                                           |
   | NUMTANGA puzzles (K-81–K-83 BB)                   | New `Numtanga` archetype            | New student action: infer values in addition pyramids                               |
   | MATCHING variants (K-75–K-80, K-86, K-87 BB)      | Add parameter (`ConnectMatch`)      | Adds `"ten-frame-to-description"`, `"ten-frame-to-bond"`, `"ten-frame-to-equation"` |
   | MAZE number bond (K-79 BB)                        | Use as-is (`SubitizePartWhole`)     | `subitizeMode: "number-bond-maze"`, `targetTotal: 9`                                |
   | GIVE AWAY (K-74 BB)                               | Use as-is (`ShiftOneDecompose`)     | `mode: "give-away"`, `totalRange: [6, 10]`                                          |
   | WORD PROBLEM MATCH (K-84–K-85 BB)                 | Use as-is (`SolveWordProblem`)      | `matchingMode: "model-to-word-problem"`                                             |
   | TEETER TOTS (K-88 BB)                             | Add parameter (`JudgeEquality`)     | `modelKind: "balance-scale"`, `totalRange: [6, 10]`                                 |

3. **Difficulty Ranges** (constitution §6.2, §6.3, §7.2–7.3):
   - **Easy**: Totals 6–8, both parts ≥ 1, standard `5+k` anchored decompositions, full Ten Frame shown, trace or choose response.
   - **Intermediate**: Full range 6–10, both parts ≥ 1, Ten Frame shown, write digits/equations.
   - **Advanced**: Full range 6–10, `0` allowed as missing part (§6.3), non-standard `unknownPosition` (e.g. `part1`), reversed equations, drawn counters.
