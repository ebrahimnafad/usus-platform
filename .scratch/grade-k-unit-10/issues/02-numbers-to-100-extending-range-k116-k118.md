# 02: Numbers to 100 — Extending to the Full Range (K-116, K-117, K-118)

**What to build:** A teacher can generate worksheets for K-116, K-117, and K-118. The `ten-frame-grid` model, `ModelCountAndTrace`, `SubitizePartWhole` decade-subitize mode, and `CountGridItems` archetype from ticket 01 are configured for the 100-range. `ModelCountAndTrace` renders ten-frame grids with up to 10 filled frames for counting to 100 (K-116 multiples of 10, K-117 tens + ones). `SubitizePartWhole` decade-subitize uses `gridRange: { min: 51, max: 100 }` with decade complements to 70/80/90/100 (K-118 WB), `writeNickname: true` for K-118 PoD, and `responseKind: 'draw-to-make'` for HOW MANY? – B BB. `CountGridItems` renders 10×10 icon grids (ball for K-116 BB, peace-sign for K-117 BB). `CompareGroups` PoD exercises use count-on-from-50 strategy for K-116.

Difficulty ranges for K-116–K-118: Easy = multiples of 10 to 50; Intermediate = tens and ones to 100; Advanced = tens and ones to 100 + complement to next decade.

Warm-up mapping: K-116 ← K-115 Easy, K-117 ← K-116 Easy, K-118 ← K-117 Easy.

Arabic titles: K-116 أعداد حتى ١٠٠ — العدّ بالعشرات, K-117 أعداد حتى ١٠٠ — العدّ بالآحاد, K-118 أعداد حتى ١٠٠ — التعرّف السريع بلوحات العشرة.

**Blocked by:** 01 (Numbers to 50 — Ten-Frame Grids and Decade Subitizing).

**Status:** ready-for-agent

- [ ] `ModelCountAndTrace` with ten-frame grids generates exercises for K-116 (multiples of 10 to 100) and K-117 (tens + ones to 100)
- [ ] `SubitizePartWhole` decade-subitize mode works for the 51–100 range with decade complements to 70/80/90/100
- [ ] `SubitizePartWhole` `writeNickname` generates PoD exercises for numbers up to 100
- [ ] `SubitizePartWhole` `draw-to-make` generates HOW MANY? – B BB exercises with targets up to 100
- [ ] `CountGridItems` renders 10×10 icon grids (ball, peace-sign) for counting to 100
- [ ] `CompareGroups` `find-difference` PoD with count-on-from-50 strategy generates correctly for K-116
- [ ] K-116, K-117, K-118 Warm-Up exercises draw from the correct prerequisite at Easy
- [ ] Every Answer Key exercise carries a non-empty Strategy Hint
- [ ] No Western digits in any student-facing rendered HTML
- [ ] Seed determinism holds across the 51–100 range
- [ ] Domain tests: grid totals correct for numbers up to 100; decade complements correct
- [ ] Layout guard green for K-116, K-117, K-118 (`--lessons=K-116..K-118 --seeds=2`)
