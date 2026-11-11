# Grade K Unit 9 — Numbers to 20 (K-99 to K-112)

**Status:** ready-for-agent

## Problem Statement

Grade K Units 1–8 (Lessons K-1 to K-98) are authored; Unit 9 _Numbers to 20_ (K-99 to K-112) currently has no blueprints, Arabic titles, or Teacher Notes. Unit 9 is the largest unit so far (14 lessons) and transitions from numbers within 10 to teen numbers (11–20), introducing comparison, place-value foundations, and extended measurement.

Unit 9 introduces comparing groups of objects using linear models and ten-frame pairs (K-99 to K-102), identifying and tracing teen numbers 11–20 (K-103), picture graphs to 20 (K-104), measuring total side length of polygons in paper clips (K-105), modeling teen numbers with dot arrays (K-106), finding the difference — how many more or fewer — with linear models and ten frames (K-107*, K-108*), subitizing stacked ten-frame pairs to 20 and their complement (K-109, K-110), counting and writing consecutive numbers (K-111), and modeling teen numbers with vertical ten frames and number bonds (K-112).

## Solution

Author K-99 to K-112 with:

1. **Two new Visual Models**:
   - `linear-comparison` (`660 × 120 px`, 1-column only) — two horizontal rows of objects aligned 1-to-1 for visual comparison of group sizes.
   - `dot-array` (`212 × 160 px`, 3-column friendly) — a rectangular grid of dots in rows and columns, supporting near arrays with one incomplete row.

2. **One new Exercise Archetype**: `CompareGroups` — the student compares two visual groups and identifies or quantifies which has more, fewer, or the difference. Three modes:
   - `compare-only`: circle the group with more / the group with fewer (K-99, K-101).
   - `quantify-and-compare`: count each group, then circle more/fewer (K-100, K-102).
   - `find-difference`: count each group, write how many more or fewer (K-107, K-108).

3. **Visual Model extensions**:
   - `ten-frame`: add `orientation: 'vertical'` parameter (108 × 252 px box for vertical orientation). Used in K-112.
   - `numeral-trace`: extend to 11–20 as composite of two single-digit traces placed side by side. Used in K-103.
   - `picture-graph`: add `maxPerRow: 10` wrapping — categories with >10 items wrap to a second row, ten-frame style. Used in K-104.

4. **Existing archetype extensions** (add-parameter, step 2 on the reuse ladder):
   - `JudgeEquality`: add `judgementKind: 'comparison-statement'` — student circles true/false on comparison statements like "A has more than B" (K-100 BB).
   - `PictureGraphRead`: add `comparisonKind: 'find-difference'` — prompts ask "how many more/fewer" using graph data (K-107 BB). Raise max category count to 20 (K-104).
   - `SubitizePartWhole`: add `responseKind: 'draw-to-make'` — student draws circles in ten-frames to compose a teen number (K-109, K-110 BB). Add `responseKind: 'decompose-teen'` — student decomposes a teen number into 10 + ones with vertical ten-frames (K-104 PoD, K-112 WB). Add `frameCount: 2` and `complementTarget: 20` for stacked ten-frame pairs (K-109, K-110 WB). Add `includeComplement: 20` for "how many more make 20" (K-110).
   - `ConnectMatch`: add mode `ten-frame-to-comparison` — match ten-frame pairs to "more/fewer" descriptions (K-101, K-102 BB).
   - `SequenceAndZero`: add `responseKind: 'fill-missing'` — student writes missing numbers in a sequence instead of drawing connecting lines (K-111 WB).

5. **Existing archetypes used as-is**:
   - `PictureGraphRead`: K-99 BB, K-104 WB/BB with `includeComparison`.
   - `ModelCountAndTrace`: K-103 WB/BB with composite numeral-trace range 11–20.
   - `MeasureAndCompareLength`: K-105 WB (polygon perimeter, already supports polygons).
   - `ConnectMatch`: K-105 BB (`shape-to-description`, exists), K-112 BB (`ten-frame-to-number-bond`, exists).
   - `SequenceAndZero`: K-106 WB/BB/PoD with tally marks and dot arrays, counting forward from teen numbers.
   - `Digicross`: K-111 BB with `numberRange: { min: 11, max: 15 }` (parameter already exists).

6. **Constitution amendments**:
   - §3.4: Add `Linear Comparison (660 × 120 px)`, `Dot Array (212 × 160 px)`, `Ten-frame vertical (108 × 252 px)`.
   - §6.3: Add Difference = 0 (equal groups in comparison) as an Advanced-only edge case.
   - §9.4: Add imperative `حوّط` (circle/encircle).

## User Stories

1. As a Grade K teacher teaching K-99, I want students to compare two groups on a linear model and circle which has more and which has fewer (Workbook), write comparison keywords to make statements true (PoD), and complete more/fewer prompts using graph data (MORE OR LESS – A BB).
2. As a Grade K teacher teaching K-100, I want students to count each group on a linear model, circle more/fewer (Workbook), use a compare-the-parts strategy (PoD), and circle true comparison statements and cross out false ones (MORE OR LESS – B BB).
3. As a Grade K teacher teaching K-101, I want students to compare two ten-frame pairs and circle which has more/fewer (Workbook), write keywords to make comparisons true (PoD), and match ten-frames to more/fewer descriptions (MATCHING – A BB).
4. As a Grade K teacher teaching K-102, I want students to count ten-frame pairs, circle more/fewer (Workbook), use a compare-the-parts strategy (PoD), and match ten-frames to descriptions with totals (MATCHING – B BB).
5. As a Grade K teacher teaching K-103, I want students to count objects and trace the correct teen number 11–20 (Workbook), write the parts of a ten-frame decomposition (PoD), and trace/write numbers 11–20 (TRACE and WRITE BB).
6. As a Grade K teacher teaching K-104, I want students to read a picture graph with counts up to 20 (Workbook), show each total as "10 and some more" (PoD), and complete more/fewer prompts from graph data (MORE OR LESS – C BB).
7. As a Grade K teacher teaching K-105, I want students to count polygon sides, measure perimeter in paper clips, and write the total (Workbook), identify shape names and paper-clip counts (PoD), and match shapes to descriptions of sides and paper clips (MATCHING – C BB).
8. As a Grade K teacher teaching K-106, I want students to count dot arrays of teen numbers and connect them in counting order (Workbook), draw arrows counting forward/backward (PoD), and draw tally marks then count forward from 16 (COUNT & CONNECT BB).
9. As a Grade K teacher teaching K-107, I want students to count two groups on a linear model and write how many more or fewer (Workbook), compare and count extra solid shapes (PoD), and use graph data to complete how-many-more/fewer prompts (DARE to COMPARE – A BB).
10. As a Grade K teacher teaching K-108, I want students to count two ten-frame groups and write how many more/fewer (Workbook), compare and count missing shapes (PoD), and use ten-frame data to complete how-many-more/fewer prompts (DARE to COMPARE – B BB).
11. As a Grade K teacher teaching K-109, I want students to subitize stacked ten-frame pairs and write how many (Workbook), imagine parts on ten-frames and find the total (PoD), and draw circles in ten-frames to make a given teen number (HOW MANY? – A BB).
12. As a Grade K teacher teaching K-110, I want students to subitize stacked pairs and write both how many and how many more make 20 (Workbook), find totals and complements (PoD), and draw circles and write how many more make 20 (HOW MANY? – B BB).
13. As a Grade K teacher teaching K-111, I want students to write missing consecutive numbers in teen-number sequences (Workbook), count forward and write 1 more / 1 less (PoD), and fill a Digicross grid with numbers 11–15 (DIGICROSS BB).
14. As a Grade K teacher teaching K-112, I want students to write each teen number as 10 and some more with vertical ten-frames (Workbook), show snap-cube decompositions in multiple representations (PoD), and match vertical ten-frames to number bonds (MATCHING – D BB).
15. As a teacher, I want "Regenerate" to produce new comparison pairs and teen-number items within the lesson's limits, without repeating a fact inside one exercise.
16. As a teacher, I want every Unit 9 Answer Key to show circled groups, highlighted extras/missing objects, filled ten-frames, solved slots, and a **Strategy Hint** on every exercise.
17. As a teacher, I want Arabic titles, Teacher Notes, and common misconceptions for K-99 to K-112.

## Implementation Decisions

1. **Domain model** ([`GLOSSARY.md`](../../GLOSSARY.md)):
   - Five new terms: **Linear Model** (نموذج المقارنة الخطّي), **Difference** (الفرق — scoped to comparison, coexists with existing _Avoid_ entries under Missing Part and Take Away), **Consecutive Numbers** (أعداد متتالية), **Teen Number** (عدد عشريني), **Dot Array** (مصفوفة النقاط).

2. **Reuse ladder** (constitution §11.2):

   | Need                                                      | Ladder step                           | Reason                                                              |
   | --------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------- |
   | Compare groups, circle more/fewer, linear model (K-99 WB) | **New `CompareGroups`** archetype     | New student action: compare two visual groups                       |
   | Compare groups, circle more/fewer, ten frames (K-101 WB)  | Use new `CompareGroups`               | Same archetype, `visualKind: 'ten-frame-pair'`                      |
   | Compare groups, count + circle, linear (K-100 WB)         | Use new `CompareGroups`               | `compareMode: 'quantify-and-compare'`                               |
   | Compare groups, count + circle, ten frames (K-102 WB)     | Use new `CompareGroups`               | Same mode, `visualKind: 'ten-frame-pair'`                           |
   | Find difference, linear (K-107 WB)                        | Use new `CompareGroups`               | `compareMode: 'find-difference'`                                    |
   | Find difference, ten frames (K-108 WB)                    | Use new `CompareGroups`               | Same mode, `visualKind: 'ten-frame-pair'`                           |
   | Fill-keyword comparison PoD (K-99, K-101 PoD)             | Use new `CompareGroups`               | `responseKind: 'fill-keyword'`                                      |
   | Compare-the-parts PoD (K-100, K-102 PoD)                  | Use new `CompareGroups`               | Strategy-driven comparison                                          |
   | Count and trace teen numbers (K-103 WB/BB)                | Use as-is (`ModelCountAndTrace`)      | Numeral-trace extended to composite 11–20                           |
   | Picture graphs to 20 (K-104 WB/BB)                        | Use as-is (`PictureGraphRead`)        | `maxPerRow: 10` wrapping + `includeComparison`                      |
   | Polygon perimeter (K-105 WB)                              | Use as-is (`MeasureAndCompareLength`) | Already supports polygons                                           |
   | Count dot arrays + connect (K-106 WB)                     | Use as-is (`SequenceAndZero`)         | Dot-array visual + forward counting                                 |
   | Graph-based more/fewer prompts (K-99, K-104 BB)           | Use as-is (`PictureGraphRead`)        | `includeComparison: true`                                           |
   | Circle true/false comparison statements (K-100 BB)        | Add parameter (`JudgeEquality`)       | `judgementKind: 'comparison-statement'`                             |
   | Ten-frame to comparison MATCHING (K-101, K-102 BB)        | Add parameter (`ConnectMatch`)        | Mode `ten-frame-to-comparison`                                      |
   | Graph-based how-many-more/fewer (K-107 BB)                | Add parameter (`PictureGraphRead`)    | `comparisonKind: 'find-difference'`                                 |
   | Ten-frame how-many-more/fewer (K-108 BB)                  | Use new `CompareGroups`               | `compareMode: 'find-difference'`, prompt fill-in                    |
   | Subitize stacked ten-frames (K-109, K-110 WB)             | Add parameter (`SubitizePartWhole`)   | `frameCount: 2`, `complementTarget: 20`                             |
   | Draw circles to make teen number (K-109, K-110 BB)        | Add parameter (`SubitizePartWhole`)   | `responseKind: 'draw-to-make'`, `includeComplement: 20`             |
   | Decompose teen as 10 + ones (K-104 PoD, K-112 WB)         | Add parameter (`SubitizePartWhole`)   | `responseKind: 'decompose-teen'`, `drawModel: 'vertical-ten-frame'` |
   | Write missing consecutive numbers (K-111 WB)              | Add parameter (`SequenceAndZero`)     | `responseKind: 'fill-missing'`                                      |
   | Digicross 11–15 (K-111 BB)                                | Use as-is (`Digicross`)               | `numberRange: { min: 11, max: 15 }`                                 |
   | Shape-to-description match (K-105 BB)                     | Use as-is (`ConnectMatch`)            | `shape-to-description` mode exists                                  |
   | Ten-frame-to-number-bond match (K-112 BB)                 | Use as-is (`ConnectMatch`)            | `ten-frame-to-number-bond` mode exists                              |
   | Tally marks + count forward (K-106 BB)                    | Use as-is (`SequenceAndZero`)         | Tallies + forward counting                                          |
   | Imagine + subitize PoDs (K-109, K-110 PoD)                | Use as-is (`SubitizePartWhole`)       | Mental subitizing prompts                                           |

3. **`CompareGroups`** (new archetype):
   - Student action: compare two visual groups and identify or quantify which has more, fewer, or the difference.
   - Parameters:
     - `compareMode`: `'compare-only' | 'quantify-and-compare' | 'find-difference'`
     - `visualKind`: `'linear-comparison' | 'ten-frame-pair'`
     - `numberRange`: `{ min, max }` (e.g., `{ min: 1, max: 10 }`)
     - `responseKind`: `'circle'` (default) | `'fill-keyword'` (PoD mode)
   - `compare-only`: student circles the group with more, circles the group with fewer. No numerical response.
   - `quantify-and-compare`: student writes the count of each group in answer slots, then circles more/fewer.
   - `find-difference`: student writes both counts and the difference (how many more/fewer) in answer slots.
   - Answer Key: circles the group with more in accent, highlights "extra" objects in the longer row, fills answer slots.

4. **`linear-comparison`** (new Visual Model, §10.1):
   - Canonical size: `660 × 120 px` (1-column only).
   - Worksheet state: two horizontal rows of icons aligned 1-to-1, right to left. Each row uses a different icon type (e.g., circles vs. triangles). Label identifies each group (أ / ب).
   - Answer-key state: group with more is circled in accent. Extra objects highlighted with accent fill. Solved answer slots.
   - RTL fill: both rows fill right to left; first object is rightmost.
   - Grayscale cue: distinct icon shapes per row (not just color).
   - Unknown positions: none in `compare-only`. Count slots per row in `quantify-and-compare`. Count + difference slots in `find-difference`.

5. **`dot-array`** (new Visual Model, §10.1):
   - Canonical size: `212 × 160 px` (3-column friendly).
   - Worksheet state: rectangular grid of uniform filled dots. Near arrays have one incomplete bottom row. Digit answer slot below.
   - Answer-key state: dashed-border subitizing-group containers (groups of 5) in accent style. Solved digit slot.
   - RTL fill: dots fill right to left, top to bottom.
   - Grayscale cue: filled dots vs. empty cells; no color dependency.
   - Unknown positions: the digit below (how many dots).

6. **Difficulty ranges** (constitution §6.2, §6.3, §7.2–7.3):

   | Level            | Comparison (K-99–102, K-107, K-108)                    | Teen numbers (K-103, K-109–110, K-112) | Counting/measurement (K-104–106, K-111) |
   | ---------------- | ------------------------------------------------------ | -------------------------------------- | --------------------------------------- |
   | **Easy**         | Groups of 1–5, difference ≤ 2                          | 11–15                                  | Counts to 15, 3–4 sided polygons        |
   | **Intermediate** | Groups of 1–10, difference ≤ 5                         | 11–20                                  | Counts to 20, 3–6 sided polygons        |
   | **Advanced**     | Groups of 1–10, equal groups possible (difference 0–5) | 11–20 with "how many more make 20"     | Counts to 20, 6–8 sided polygons        |

7. **Equal groups edge case**: when both groups have the same count (difference = 0), the student writes `٠` in the difference slot. Standard prompt form (`كم أكثر؟` / `كم أقلّ؟`). Strategy hint: `المجموعتان متساويتان — الفرق ٠`. Advanced difficulty only (§6.3).

8. **Warm-up prerequisite mapping** (§5.3):

   | Lesson | First prerequisite | Warm-up draws from                               |
   | ------ | ------------------ | ------------------------------------------------ |
   | K-99   | K-63               | K-63 Easy (Horizontal Picture Graphs to 10)      |
   | K-100  | K-99               | K-99 Easy (Compare Groups, linear)               |
   | K-101  | K-100              | K-100 Easy (Compare & Quantify, linear)          |
   | K-102  | K-101              | K-101 Easy (Compare Groups, ten frames)          |
   | K-103  | K-62               | K-62 Easy (Quantify and Compare, ten frames)     |
   | K-104  | K-63               | K-63 Easy (Horizontal Picture Graphs to 10)      |
   | K-105  | K-73               | K-73 Easy (Perimeter Count & Measure)            |
   | K-106  | K-65               | K-65 Easy (Count Forward to 10)                  |
   | K-107  | K-100              | K-100 Easy (Compare & Quantify, linear)          |
   | K-108  | K-107              | K-107 Easy (Compare How Many More/Fewer, linear) |
   | K-109  | K-103              | K-103 Easy (Identify and Trace 11–20)            |
   | K-110  | K-109              | K-109 Easy (Subitize, name one part)             |
   | K-111  | K-106              | K-106 Easy (Model with Arrays, count forward)    |
   | K-112  | K-110              | K-110 Easy (Subitize, name both parts)           |

9. **Arabic content**: Titles, Teacher Notes, classroom activities, misconceptions, prompts, and Strategy Hints for K-99 to K-112 are drafted per ticket and reviewed by the user with saved page PNGs before each ticket closes.

## Testing Decisions

- Constitution §12 is the definition of done; the layout guard gates every authored lesson, old and new.
- Primary-seam tests (`renderWorksheetSurface`) extend to K-99 to K-112: seed determinism, Warm-Up prerequisite resolution, difficulty progression, Strategy Hints on every Answer Key exercise, the Eastern Arabic Numerals invariant, Answer Slot sizes, and circled/highlighted states in comparison exercises.
- Fact-selection tests: across many seeds, comparison pairs respect declared ranges, no group pair repeats within one exercise.
- Domain tests: in every `CompareGroups` item the "more" group has strictly more objects (or equal at Advanced); difference = |count₁ − count₂| for every `find-difference` item; ten-frame counts ≤ 10 per frame; teen number decompositions satisfy 10 + ones = total; dot-array `filledCount` equals rows × columns (complete) or rows × columns − gap (near array); consecutive-number sequences are gapless; polygon perimeters equal sides × unit-length.

## Out of Scope

- Addition or subtraction within 20 — deferred to later units.
- Interactive or timed on-screen subitizing flash activities.
- Units 10–12.
- Place-value notation beyond "10 and some more" (formal tens/ones columns).

## Delivery

Branch `feat/grade-k-unit-9` from the tip of `feat/grade-k-unit-8`. Four tickets:

| Ticket | Lessons                    | Scope                                                                                                                                                                                                                  |
| ------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01     | K-99, K-100, K-101, K-102  | Comparison (more/fewer): **new `linear-comparison` model**, **new `CompareGroups` archetype**, ten-frame pair comparison, `ConnectMatch` `ten-frame-to-comparison` mode, `JudgeEquality` comparison-statement mode     |
| 02     | K-103, K-104, K-105, K-106 | Teen numbers foundation: numeral-trace 11–20 extension, picture-graph to 20 wrapping, polygon perimeter reuse, **new `dot-array` model**, `SequenceAndZero` with dot arrays                                            |
| 03     | K-107, K-108, K-109, K-110 | Enrichment comparison + subitize to 20: `CompareGroups` `find-difference` mode, `PictureGraphRead` `find-difference`, `SubitizePartWhole` `frameCount: 2` + `complementTarget: 20` + `draw-to-make` + `decompose-teen` |
| 04     | K-111, K-112               | Consecutive numbers + vertical ten frames: `SequenceAndZero` `fill-missing` mode, `ten-frame` vertical orientation, + **batch close**                                                                                  |

Per-ticket layout guard: `--lessons=<ticket-range> --seeds=2`. On ticket 04: validate the full unit `--lessons=K-99..K-112 --seeds=5` first, then batch-close all-lessons sweep `--seeds=5 --png=none` (§12).
