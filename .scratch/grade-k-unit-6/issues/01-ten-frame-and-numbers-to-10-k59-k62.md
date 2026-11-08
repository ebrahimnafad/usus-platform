# 01: Ten Frame Visual Model, Scaling Unit 2/3 Models to 10, and Lessons K-59 to K-62

**What to build:** The `ten-frame` (`240 × 108 px`) Visual Model, scaling `snap-cubes`, `tally-marks`, `dice-pattern`, `circular-arrangement`, `numeral-trace`, `digit-card`, `number-bond`, and `equation-strip` up to `10`, extending `ModelCountAndTrace` (`ten-frame`, multi-trace/write slots, and `quantify-compare-choice`), and authoring Lessons K-59 to K-62.

**Blocked by:** None

**Status:** closed

- [x] `ten-frame` is registered in `src/domain/types.ts`, `src/visual-models/unit-2-models.tsx`, and `src/components/worksheet/layout-standard.json` (`240 × 108 px` box with `48 × 48 px` RTL cells)
- [x] `snap-cubes`, `tally-marks`, `dice-pattern`, `circular-arrangement`, `numeral-trace`, `digit-card`, `number-bond`, and `equation-strip` support quantities up to `10` (anchored at `5`)
- [x] `ModelCountAndTrace` supports `modelKind: "ten-frame"`, 6–10 part-whole notes, multi-slot trace/write (`WRITING NUMBERS 6-10 A/B/C`), and `quantify-compare-choice` (K-62)
- [x] Localized Arabic titles, Teacher Notes, and blueprints for K-59, K-60, K-61, and K-62 are registered
- [x] Layout guard passes for `--lessons=K-59..K-62 --seeds=2`
