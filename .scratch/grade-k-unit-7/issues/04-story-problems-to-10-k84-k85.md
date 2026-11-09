# 04: Story Problems to 10 and Lessons K-84 and K-85

**What to build:**

1. Extend `SolveWordProblem` (`src/lib/word-problems.ts`) with `representation: "ten-frame"` for totals up to 10.
2. Support WORD PROBLEM MATCH A and B Brain Builders via `matchingMode: "model-to-word-problem"`.
3. Author blueprints, Arabic titles, and Teacher Notes for K-84 (Add-To) and K-85 (Put-Together).

**Blocked by:** 01

**Status:** resolved

- [x] `SolveWordProblem` supports `representation: "ten-frame"` with totals up to 10
- [x] WORD PROBLEM MATCH handles Add-To (K-84) and Put-Together (K-85) with Ten Frames and equations
- [x] Localized Arabic titles, Teacher Notes, and blueprints registered for K-84 and K-85
- [x] Layout guard passes for `--lessons=K-84..K-85 --seeds=2`

**Comments:**

- Slices: (1) ten-frame `representation` on `SolveWordProblem` — part-total RTL frames with Part outline + empty slots, correlated `NumberBondBuild` missing-total slot, totals locked 6–10, `minPart: 1` everywhere so no zero cases (§6.3 zero handling intentionally unused); (2) WORD PROBLEM MATCH via `ConnectMatch` `matchingMode: "model-to-word-problem"` with the K-52 double-write convention (bond slot + story card per row), solved-total/matching slots driven by `data-solved-match-problem-*`; (3) K-84 «المسائل القصصية للجمع (الإضافة) حتى العدد ١٠» / K-85 «الضمّ» titles + Teacher Notes + `story-and-slot`@trace Easy practice[1] mirroring K-49/K-52 (§6.2: fully-shown model + trace/choose).
- WORD PROBLEM MATCH B cycles `wordProblemMissingPositions: ["total","part2"]` per row (RTL: total → part2 → total); default (absent) keeps all rows missing-total, verified against K-52 so pre-existing lessons are unchanged.
- Separation of counts: `ConnectMatch` pairCount per tier; Advanced runs `SolveWordProblem` with `showModel: false` (§6.2 row: no model, equation only).
- Layout-fit cuts (all blueprint-level, per §2.2 fix ladder — nothing shrunk at model level): challenge `pairCount` 3 → 2 at Intermediate+Advanced match sites; Easy practice[1] `itemCount` 2 → 1; warm-up/practice item trims; prompts/hints rewritten to one line (§9.4 voice prefixes kept: «اجمع…»/«اكتب…»/«صِلْ…»).
- Final verification: layout guard PASS 32/32 (max pages 2, 0 violations) for `--lessons=K-84..K-85 --seeds=2`; `check-numerals` clean; `npm run test:fast` 279/279; `tsc --noEmit` clean.
- Code-review disposition (two axes): Standards — pass, no hard violations; judgement calls recorded: shared meta-bag casts follow house style, the `part1` branch of `wordProblemMissingPositions` is kept deliberately (WB-B slots reuse the `part1/part2/total` attr set by design even though only ["total","part2"] is authored today). Spec — faithful to all 4 ACs; one documented trade-off: on MATCH B `part2`-missing rows the story text still prints the missing part (the card must stay fully informative for story→bond matching; the derive-the-missing-part demand is carried by the bond slot and the SWP cloze chains). Story-blanking the missing part is candidate future polish and not a ticket requirement.
