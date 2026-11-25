# Grade K Unit 10 — Numbers to 100 (K-113 to K-120)

**Status:** ready-for-agent

## Problem Statement

Grade K Units 1–9 (Lessons K-1 to K-112) are authored; Unit 10 _Numbers to 100_ (K-113 to K-120) currently has no blueprints, Arabic titles, or Teacher Notes. Unit 10 is a compact unit (8 lessons) that transitions from teen numbers (11–20) to full two-digit counting by tens and ones up to 100, plus two enrichment lessons on Egyptian money.

Teachers cannot generate worksheets for K-113 to K-120 today. The unit introduces counting groups of 10 using ten-frame grids and writing numbers to 50 (K-113, K-114), subitizing multi-ten-frame layouts with decade complements to 50 (K-115), counting groups of 10 to 100 (K-116, K-117), subitizing multi-ten-frame layouts with decade complements to 100 (K-118), identifying Egyptian coins and bills by name (K-119\*), and identifying Egyptian coins and bills by value (K-120\*).

## Solution

Author K-113 to K-120 with two new Visual Models (`ten-frame-grid`, `money-card`), two new Exercise Archetypes (`IdentifyAndLabel`, `CountGridItems`), parameter extensions to three existing archetypes (`SubitizePartWhole`, `ConnectMatch`, `JudgeEquality`), and a revision of the existing `COIN_CATALOG` to proper Egyptian currency (ADR-0016). Three glossary terms are added: Base-10 Nickname, Skip Count, Decade Number.

## User Stories

1. As a Grade K teacher teaching K-113, I want students to count groups of 10 on a ten-frame grid and trace the correct number to 50 (Workbook), so that they transition from counting by ones to counting by tens.
2. As a Grade K teacher teaching K-113, I want students to compare and find the difference between groups of solid shapes (PoD), so that they practice the find-difference skill from Unit 9 in a new context.
3. As a Grade K teacher teaching K-113, I want students to follow directions to count fruits in a visual grid (COUNT ON – A BB), so that they build counting-by-10s fluency with real-world objects.
4. As a Grade K teacher teaching K-114, I want students to count full ten-frames and extra ones, tracing or writing the number to 50 (Workbook), so that they learn to combine tens and ones.
5. As a Grade K teacher teaching K-114, I want students to count all circles and check by skip-counting by 10 (PoD), so that they practice the connection between count-all and skip-counting strategies.
6. As a Grade K teacher teaching K-114, I want students to count pencils in a visual grid (COUNT the PENCILS BB), so that they build fluency counting dense sets of objects.
7. As a Grade K teacher teaching K-115, I want students to subitize ten-frame grids and write how many / how many more make the next multiple of 10 to 50 (Workbook), so that they develop decade-complement number sense.
8. As a Grade K teacher teaching K-115, I want students to find the total and write each number's Base-10 Nickname (PoD), so that they articulate place value using tens-and-ones language.
9. As a Grade K teacher teaching K-115, I want students to draw dots in ten-frames to make a given amount and write how many more make 30/40/50 (HOW MANY? – A BB), so that they practice composing decade numbers concretely.
10. As a Grade K teacher teaching K-116, I want students to count groups of 10 on a ten-frame grid and trace the correct number to 100 (Workbook), so that they extend skip-counting by 10s beyond 50.
11. As a Grade K teacher teaching K-116, I want students to use a counting-on strategy from 50 and compare left/right totals for the difference (PoD), so that they practice counting on from a known anchor.
12. As a Grade K teacher teaching K-116, I want students to count balls in a visual grid (COUNT ON – B BB), so that they practice counting by 10s with a new icon type.
13. As a Grade K teacher teaching K-117, I want students to count full ten-frames and extra ones, tracing or writing the number to 100 (Workbook), so that they combine tens and ones for any two-digit number.
14. As a Grade K teacher teaching K-117, I want students to find groups of 10 and count by 10s (PoD), so that they recognize the structure of tens within a visual display.
15. As a Grade K teacher teaching K-117, I want students to count peace signs in a visual grid (COUNT the PEACE SIGNS BB), so that they count dense grids of up to 100 items.
16. As a Grade K teacher teaching K-118, I want students to subitize ten-frame grids and write how many / how many more make the next multiple of 10 to 100 (Workbook), so that they extend decade-complement subitizing to the full 100 range.
17. As a Grade K teacher teaching K-118, I want students to find the total and write each number's Base-10 Nickname (PoD), so that they articulate place value for numbers up to 100.
18. As a Grade K teacher teaching K-118, I want students to fill in missing numbers and add dots in ten-frames to make the correct amount (HOW MANY? – B BB), so that they compose numbers to 100 concretely.
19. As a Grade K teacher teaching K-119, I want students to write the name of each Egyptian coin and bill (Workbook), so that they learn to identify coins and bills by name.
20. As a Grade K teacher teaching K-119, I want students to use a smart strategy to figure out and write each coin's name (PoD), so that they practice reasoning about visual attributes.
21. As a Grade K teacher teaching K-119, I want students to draw lines from each coin/bill name to the matching picture (MONEY MATCH – A BB), so that they consolidate name-to-image associations.
22. As a Grade K teacher teaching K-120, I want students to write the value of each Egyptian coin and bill (Workbook), so that they learn the monetary value of each denomination.
23. As a Grade K teacher teaching K-120, I want students to judge true/false money statements (PoD), so that they reason about size-value relationships.
24. As a Grade K teacher teaching K-120, I want students to draw lines from each value to the matching coin or bill (MONEY MATCH – B BB), so that they consolidate value-to-image associations.
25. As a teacher, I want "Regenerate" to produce new ten-frame-grid configurations and coin orderings within the lesson's limits, without repeating a configuration inside one exercise, so that I can generate varied worksheets.
26. As a teacher, I want every Unit 10 Answer Key to show filled ten-frame grids, labeled coins, solved slots, and a **Strategy Hint** on every exercise, so that I can mark student work efficiently.
27. As a teacher, I want Arabic titles, Teacher Notes, and common misconceptions for K-113 to K-120, so that I have full instructional support.

## Implementation Decisions

1. **Domain model** ([`GLOSSARY.md`](../../GLOSSARY.md)):
   - Three new terms: **Base-10 Nickname** (اللقب العشري — an explicit place-value reading of a number as groups of ten and leftover ones), **Skip Count** (العدّ القفزي — counting forward or backward by a fixed interval), **Decade Number** (عدد العقد — a multiple of 10 from 10 to 100).
   - Egyptian coin names are catalog data in the `COIN_CATALOG`, not glossary terms.

2. **Egyptian currency catalog revision** (ADR-0016): the existing `COIN_CATALOG` is replaced with five proper Egyptian denominations: ٢٥ قرشاً (small silver), ٥٠ قرشاً (medium silver), ١ جنيه عملة (bimetallic), ٥ جنيهات ورقة (green bill), ١٠ جنيهات ورقة (brown/gold bill). Child-facing values use mixed units as in real life: قروش for coins, جنيهات for bills. K-4 (Match Coins) adapts automatically since it uses only visual attributes.

3. **New Visual Models**:
   - `ten-frame-grid` (`660 × 160 px`, 1-column only): a 2×5 macro grid where each cell is a micro ten-frame (48 px cells). Fully filled frames show 10 counters; the last frame may be partially filled. Empty frames show dashed outlines. Fill order: RTL, top then bottom. Perception mode: `group`. Unknown positions: total digit below; optionally complement to next decade.
   - `money-card` (`212 × 160 px`, 3-column friendly): a richly styled SVG Egyptian coin face or simplified bill rectangle. Below: an `AnswerLine` for name or value. Perception mode: `perceive`. Unknown positions: name or value below.

4. **New Exercise Archetypes**:
   - `IdentifyAndLabel`: the student identifies an Egyptian coin or bill image and writes its name (`mode: 'name'`) or value (`mode: 'value'`). Uses `AnswerLine` (32 × 160 px) for responses.
   - `CountGridItems`: the student counts objects in a dense visual grid of repeated icons and writes the total. Parameters: `iconType` (fixed catalog: fruit, pencil, ball, peace-sign, star, heart), `rows`, `cols`, `filledCount`. Grid rendered inline (not a separate Visual Model). Canonical height is content-driven.

5. **Existing archetype extensions**:
   - `SubitizePartWhole`: add `subitizeMode: 'decade-subitize'` with `complementTarget: 'next-decade'` (engine computes `Math.ceil(count / 10) * 10`), `responseKind: 'draw-to-make'` for BB exercises, `writeNickname: true` for PoDs where the child writes the Base-10 Nickname.
   - `ConnectMatch`: add modes `name-to-coin` and `value-to-coin` for MONEY MATCH exercises.
   - `JudgeEquality`: add `judgementKind: 'money-statement'` with a blueprint-fixed pool of ~8 curated true/false statements per difficulty about Egyptian coin attributes (size, color, value relationships). Seed picks a subset.

6. **Reuse ladder** (constitution §11.2):

   | Need                                                   | Ladder step                         | Reason                             |
   | ------------------------------------------------------ | ----------------------------------- | ---------------------------------- |
   | Count groups of 10 to 50/100 (K-113, K-116 WB)         | Use as-is (`ModelCountAndTrace`)    | `modelKind: 'ten-frame-grid'`      |
   | Count tens + ones to 50/100 (K-114, K-117 WB)          | Use as-is (`ModelCountAndTrace`)    | Same, with partial last frame      |
   | Subitize grid, complement to 50/100 (K-115, K-118 WB)  | Add parameter (`SubitizePartWhole`) | `subitizeMode: 'decade-subitize'`  |
   | Write coin/bill name (K-119 WB)                        | **New `IdentifyAndLabel`**          | New student action                 |
   | Write coin/bill value (K-120 WB)                       | Use `IdentifyAndLabel`              | `mode: 'value'`                    |
   | COUNT ON / COUNT the X (K-113, K-114, K-116, K-117 BB) | **New `CountGridItems`**            | New student action                 |
   | HOW MANY? draw-to-make (K-115, K-118 BB)               | Add parameter (`SubitizePartWhole`) | `responseKind: 'draw-to-make'`     |
   | MONEY MATCH (K-119, K-120 BB)                          | Add parameter (`ConnectMatch`)      | `name-to-coin`, `value-to-coin`    |
   | Compare solids, find difference (K-113, K-116 PoD)     | Use as-is (`CompareGroups`)         | `compareMode: 'find-difference'`   |
   | Write total + nickname (K-115, K-118 PoD)              | Add parameter (`SubitizePartWhole`) | `writeNickname: true`              |
   | True/false money statements (K-120 PoD)                | Add parameter (`JudgeEquality`)     | `judgementKind: 'money-statement'` |

7. **Difficulty ranges** (constitution §6.2):

   | Level        | Numbers to 50 (K-113–K-115)      | Numbers to 100 (K-116–K-118)      | Money (K-119–K-120)        |
   | ------------ | -------------------------------- | --------------------------------- | -------------------------- |
   | Easy         | Multiples of 10 to 30            | Multiples of 10 to 50             | ٢٥ قرشاً and ٥٠ قرشاً only |
   | Intermediate | Tens and ones to 50              | Tens and ones to 100              | All 5 denominations        |
   | Advanced     | Tens and ones to 50 + complement | Tens and ones to 100 + complement | All 5 + true/false         |

8. **Warm-up prerequisite mapping** (§5.3): K-113 ← K-112, K-114 ← K-113, K-115 ← K-114, K-116 ← K-115 ○ K-113, K-117 ← K-116 ○ K-114, K-118 ← K-117 ○ K-115, K-119 ← K-4, K-120 ← K-119.

9. **Constitution amendments**: §3.4 adds `Ten-Frame Grid (660 × 160 px)` and `Money Card (212 × 160 px)`. No new imperatives, edge cases, or perception modes beyond the §10.1 definitions.

10. **Arabic lesson titles**: K-113 أعداد حتى ٥٠ — العدّ بالعشرات, K-114 أعداد حتى ٥٠ — العدّ بالآحاد, K-115 أعداد حتى ٥٠ — التعرّف السريع بلوحات العشرة, K-116 أعداد حتى ١٠٠ — العدّ بالعشرات, K-117 أعداد حتى ١٠٠ — العدّ بالآحاد, K-118 أعداد حتى ١٠٠ — التعرّف السريع بلوحات العشرة, K-119 النقود المصرية — أسماء العملات, K-120 النقود المصرية — قِيَم العملات.

## Testing Decisions

All tests assert **external behavior** at the highest seam available. No test inspects implementation details (internal state shapes, private helpers, rendering internals).

**Primary seam** (`renderWorksheetSurface` in `tests/primary-seam.test.ts`): the existing seam used by every prior unit. For K-113 to K-120, extend with:

- Seed determinism: same `(grade, lesson, seed, difficulty)` → same worksheet HTML.
- Warm-Up prerequisite resolution: each lesson's Warm-Up draws from the correct prerequisite at Easy.
- Difficulty progression: Scaffolded mode ramps Easy → Intermediate → Advanced across Sections.
- Strategy Hints: every Answer Key exercise carries a non-empty `strategyHintAr`.
- Eastern Arabic Numerals invariant: no Western digits in rendered student-facing HTML.
- Answer Slot sizes: all digit slots are 48 × 48 px, all line slots are 32 × 160 px.

**Domain seam** (following `tests/math-facts.test.ts` pattern): extend with:

- TenFrameGrid: across many seeds, `filledFrameCount × 10 + onesCount = total`.
- Decade complement: `Math.ceil(total / 10) * 10 − total = complement`.
- Egyptian coin identity: every `IdentifyAndLabel` exercise shows a name/value that matches the catalog entry for that denomination.
- CountGridItems: `filledCount` equals the shown grid's icon count.
- Money statements: static assertion that every statement in the curated pool is factually correct.
- Fact selection: no duplicate ten-frame-grid configuration within one exercise; no duplicate coin within one `IdentifyAndLabel` exercise.

**Layout guard** (`tests/layout-guard-geometry.test.ts` / Playwright): the existing guard runs on all authored lessons. Per-ticket: `--lessons=<ticket-range> --seeds=2`. Batch close: `--lessons=K-113..K-120 --seeds=5`, then all-lessons sweep `--seeds=5 --png=none`.

## Out of Scope

- Addition or subtraction with decade numbers.
- Coin arithmetic (adding coin values, making change).
- Place-value columns (formal tens/ones notation beyond "nicknames").
- Units 11–12 (Geometry and Fraction Enrichment).
- Interactive skip-counting animations or timed flash activities.
- Non-Egyptian currency or multi-locale coin catalogs.

## Further Notes

**Delivery**: branch `feat/grade-k-unit-10` from the tip of `feat/grade-k-unit-9`. Three tickets:

| Ticket | Lessons             | Scope                                                                                                                                                                                                                          |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 01     | K-113, K-114, K-115 | Numbers to 50: **new `ten-frame-grid` model**, `ModelCountAndTrace` with grid, `SubitizePartWhole` `decade-subitize` mode + `complementTarget: 'next-decade'` + `writeNickname`, **new `CountGridItems`**, `CompareGroups` PoD |
| 02     | K-116, K-117, K-118 | Numbers to 100: extend K-113–K-115 patterns to 100-range, `CountGridItems` with 10×10 grids, `SubitizePartWhole` complement to 100                                                                                             |
| 03     | K-119, K-120        | Egyptian money: **new `money-card` model**, revised `COIN_CATALOG` (ADR-0016), **new `IdentifyAndLabel`**, `ConnectMatch` `name-to-coin`/`value-to-coin`, `JudgeEquality` `money-statement` + **batch close**                  |

Per-ticket layout guard: `--lessons=<ticket-range> --seeds=2`. On ticket 03: validate the full unit first, then batch-close all-lessons sweep.

**Related ADR**: [ADR-0016 — Egyptian Coins Instead of U.S. Money](../../docs/adr/0016-egyptian-coins-not-us-money.md).
