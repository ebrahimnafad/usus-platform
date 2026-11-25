# 01: Numbers to 50 — Ten-Frame Grids and Decade Subitizing (K-113, K-114, K-115)

**What to build:** A teacher can generate worksheets for K-113, K-114, and K-115. The new `ten-frame-grid` Visual Model (660 × 160 px, 1-column, §10.1 definition) renders a 2×5 macro grid of micro ten-frames with RTL fill order, dashed outlines for empty frames, and subitizing-group containers in the Answer Key. `ModelCountAndTrace` accepts `modelKind: 'ten-frame-grid'` to render count-and-trace exercises with multiples-of-10 (K-113) and tens-plus-ones (K-114) configurations. `SubitizePartWhole` gains `subitizeMode: 'decade-subitize'` with `complementTarget: 'next-decade'` (engine computes `Math.ceil(count / 10) * 10`), `responseKind: 'draw-to-make'` for the HOW MANY? – A Brain Builder, and `writeNickname: true` for PoDs where the child writes the Base-10 Nickname. The new `CountGridItems` archetype renders dense icon grids (fruit for K-113 BB, pencil for K-114 BB) with configurable `rows × cols` and a digit answer slot. `CompareGroups` PoD exercises use `compareMode: 'find-difference'` with solids. All three lessons generate, render, print, and pass the layout guard with correct Answer Keys and Strategy Hints.

Difficulty ranges for K-113–K-115: Easy = multiples of 10 to 30; Intermediate = tens and ones to 50; Advanced = tens and ones to 50 + complement to next decade.

Warm-up mapping: K-113 ← K-112 Easy, K-114 ← K-113 Easy, K-115 ← K-114 Easy.

Arabic titles: K-113 أعداد حتى ٥٠ — العدّ بالعشرات, K-114 أعداد حتى ٥٠ — العدّ بالآحاد, K-115 أعداد حتى ٥٠ — التعرّف السريع بلوحات العشرة.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] `ten-frame-grid` Visual Model renders correctly: 2×5 macro grid, micro ten-frames with 48 px cells, RTL fill, dashed empty frames, subitizing-group containers in AK
- [ ] `ModelCountAndTrace` with `modelKind: 'ten-frame-grid'` generates count-and-trace exercises for K-113 (multiples of 10) and K-114 (tens + ones)
- [ ] `SubitizePartWhole` `decade-subitize` mode generates subitize exercises for K-115 WB with `complementTarget: 'next-decade'`
- [ ] `SubitizePartWhole` `writeNickname: true` generates PoD exercises where the child writes the Base-10 Nickname
- [ ] `SubitizePartWhole` `responseKind: 'draw-to-make'` generates HOW MANY? – A BB exercises with decade targets (30, 40, 50)
- [ ] `CountGridItems` archetype renders dense icon grids (fruit, pencil) with configurable `rows`, `cols`, `filledCount`, and digit answer slot
- [ ] `CompareGroups` `find-difference` PoD with solids generates correctly for K-113
- [ ] K-113, K-114, K-115 Warm-Up exercises draw from the correct prerequisite at Easy
- [ ] Every Answer Key exercise carries a non-empty Strategy Hint
- [ ] No Western digits in any student-facing rendered HTML
- [ ] All digit Answer Slots are 48 × 48 px; all line Answer Slots are 32 × 160 px
- [ ] Seed determinism: same `(grade, lesson, seed, difficulty)` → same worksheet
- [ ] Domain tests: `filledFrameCount × 10 + onesCount = total`; `Math.ceil(total / 10) * 10 − total = complement`; no duplicate grid config within one exercise
- [ ] Layout guard green for K-113, K-114, K-115 (`--lessons=K-113..K-115 --seeds=2`)
