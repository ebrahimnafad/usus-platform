# Grade K Unit 6 — Numbers to 10 (K-59 to K-73)

**Status:** in-progress

## Problem Statement

Grade K Units 1–5 (Lessons K-1 to K-58) are authored; Unit 6 _Numbers to 10_ (K-59 to K-73) shows only a fallback preview and has no Arabic titles or **Teacher Notes**. Unit 6 expands quantities from 5 to 10 by anchoring at 5 across Ten Frames, Snap Cubes, Tally Marks, Dice Patterns, Circular Arrangements, Picture Graphs, Counting Sequences, and Subitizing (including combinations of 10), then introduces non-standard length measurement with Paper Clip Units (1, 2, and 3 bars plus Mystery Measures) and 2D polygon side counting and perimeter in paper clips.

## Solution

Author K-59 to K-73 with:

1. **Three new Visual Models**: `ten-frame` (`240 × 108 px` with `48 px` cells), `paper-clip-bar` (`312 × 56 px`), and `polygon-perimeter` (`212 × 160 px`).
2. **Scaling Unit 2 & Unit 3 Visual Models to 10**: `snap-cubes`, `tally-marks`, `dice-pattern`, `circular-arrangement`, `numeral-trace`, `digit-card`, `number-bond`, `equation-strip`, and `picture-graph` (`maxCount: 10`), plus extending `Shape2DId` with `heptagon` (`سباعي`), `octagon` (`ثماني`), and `nonagon` (`تساعي`).
3. **One new Exercise Archetype**: `MeasureAndCompareLength` (`measure-bars`, `friends-clips`, `mystery-clues`, `polygon-sides`, `polygon-perimeter`).
4. **Extensions to existing Exercise Archetypes**: `ModelCountAndTrace`, `PictureGraphRead`, `SequenceAndZero`, `SubitizePartWhole` (including `number-bond-maze`), and `ConnectMatch` (`shape-to-description`).

All rules in [`WORKSHEET_CONSTITUTION.md`](../../WORKSHEET_CONSTITUTION.md) apply, including the 2026-11-08 Unit 6 amendments (§3.4 canonical sizes and §9.4 imperatives `قِسْ` and `رتّب`).

## User Stories

1. As a Grade K teacher teaching K-59 to K-61, I want students to model and count numbers 6–10 anchored at 5 using Ten Frames (K-59), Snap Cubes (K-60), and Tally Marks, Dice Patterns, and Circular Arrangements (K-61), copy models with ghost counters, and trace and write the digits 6–10 (`WRITING NUMBERS 6-10 A/B/C`).
2. As a Grade K teacher teaching K-62, I want students to quantify Ten Frames to 10 by counting all and counting on from 5, compare the true quantity against candidates that are 1 or 2 more or fewer, and color/count shapes to 10 (`QUANTIFY NUMBERS TO 10`).
3. As a Grade K teacher teaching K-63 and K-64, I want students to read horizontal (K-63) and vertical (K-64) Picture Graphs up to 10, write category counts from memory, compare categories (more/fewer/difference), and complete `GRAPHS TO 10 A/B`.
4. As a Grade K teacher teaching K-65 and K-66, I want students to count forward to 10 (K-65) and backward from 10 (K-66) by connecting groups/steps in counting order, drawing arrows from 5 to 10 or 10 to 5, and completing `COUNT & CONNECT A/B`.
5. As a Grade K teacher teaching K-67 and K-68, I want students to subitize Ten Frames to 10 as 5 and some more, find how many flat/solid shapes are missing to make 10, write both parts of a Ten Frame (`how many` and `how many more make 10`), solve the Number Bond `MAZE` (total is 9) in K-67, and draw circles in `HOW MANY?` in K-68.
6. As a Grade K teacher teaching K-69 to K-71, I want students to measure 1 bar (K-69), compare 2 bars (K-70), and compare and order 3 bars from shortest to longest (K-71) using Paper Clip Units placed end to end, compare friends' paper clips in Problems of the Day, and solve `MYSTERY MEASURES A–C`.
7. As a Grade K teacher teaching K-72 and K-73, I want students to count the sides of regular 2D polygons (3–9 sides in K-72), measure polygon perimeter in paper clips (K-73), and match shapes to their side/perimeter descriptions (`MATCHING A` and `MATCHING B`).

## Implementation Decisions

1. **Domain model** ([`GLOSSARY.md`](../../GLOSSARY.md)):
   - Added **Ten Frame** (`لوحة العشرة`), **Paper Clip Unit** (`مشبك الورق`), **Side** (`الضلع`), and **Perimeter** (`المحيط`).
   - Extended `Shape2DId` with `heptagon` (`سباعي`, 7 sides), `octagon` (`ثماني`, 8 sides), and `nonagon` (`تساعي`, 9 sides).

2. **Reuse ladder** (constitution §11.2):

   | Need                                                                                      | Ladder step                                    | Reason                                                                                           |
   | ----------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------ |
   | Model, count, trace & write 6–10 (`ten-frame`, `snap-cubes`, `tally-marks`, `dice`, etc.) | Extend `ModelCountAndTrace`                    | Same student action; adds `"ten-frame"`, 6–10 scaling, multi-trace/write, and `quantify-choice`  |
   | Horizontal & vertical Picture Graphs to 10 (K-63, K-64)                                   | Add parameter to `PictureGraphRead`            | Same student action; passes `maxCount: 10` to `PictureGraphSvg` and `ShapeGraphSvg`              |
   | Count forward to 10 & backward from 10 + `COUNT & CONNECT A/B` (K-65, K-66)               | Extend `SequenceAndZero`                       | Same student action; lifts max-5 clamp to 10 and adds `ten-frame` / `tally-marks` step visuals   |
   | Subitize Ten Frames to 10, missing shapes, `HOW MANY?`, and `MAZE` (K-67, K-68)           | Extend `SubitizePartWhole`                     | Same part-whole recognition family; adds `ten-frame` (`totalCount = 10`) and `number-bond-maze`  |
   | Measure 1–3 bars in paper clips, compare friends' clips, `MYSTERY MEASURES`, & perimeter  | New `MeasureAndCompareLength` archetype        | New student action: non-standard linear measurement, length ordering, and polygon perimeter      |
   | Match 2D polygons to side/perimeter descriptions (`MATCHING A & B` in K-72, K-73)         | Extend `ConnectMatch` (`shape-to-description`) | Same 1-to-1 matching action; adds polygon-to-description pairs with optional missing-number slot |

3. **Unit 6 Difficulty Ranges** (constitution §6.2, §6.3, §7.2–7.3):
   - **Numbers, Graphs, Sequences & Subitizing to 10 (K-59 to K-68)**:
     - Easy: Numbers `6–8` (anchored at `5`), canonical `5 + k` decompositions (`5+1`, `5+2`, `5+3`), full visual models with traced/choice support.
     - Intermediate: Full range `6–10`, canonical `5 + k` decompositions (`5+1` to `5+5`), models shown, student writes digits `٦–١٠` and missing parts to `10`.
     - Advanced: Full range `6–10` (`1–10` / `10–1` in sequences and graphs), includes non-standard Ten Frame splits (`4+4`, `3+5`, `4+5` per K-59), `10` with `0` missing (in K-67/K-68), and multi-step comparisons.
   - **Bar Length Measurement in Paper Clips (K-69 to K-71)**:
     - Easy: Bar lengths `2–6` paper clips; guided/traced length slots and direct longer/shorter choice.
     - Intermediate: Bar lengths `3–9` paper clips; write lengths, compare 2–3 bars (`الأطول` / `الأقصر`), and order 3 bars shortest-to-longest.
     - Advanced: Bar lengths `4–10` paper clips; comparative difference questions and multi-clue Mystery Measures.
   - **Polygon Sides & Perimeter (K-72 to K-73)**:
     - Easy: Polygons with `3–5` sides (`triangle`, `square`, `rectangle`, `pentagon`); in K-73, `1` paper clip per side (perimeter `3–5`).
     - Intermediate: Polygons with `3–6` sides (adding `hexagon`); in K-73, `1–2` paper clips per side (perimeter `3–8`).
     - Advanced: Polygons with `3–9` sides (adding `heptagon`, `octagon`, `nonagon`); in K-73, perimeter `6–10` paper clips and missing-number description matches (`MATCHING - B`).
