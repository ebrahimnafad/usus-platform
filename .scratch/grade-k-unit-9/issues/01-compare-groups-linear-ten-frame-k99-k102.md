# 01: Compare Groups with Linear Models and Ten Frames — K-99 to K-102

**What to build:**

1. Create new `linear-comparison` Visual Model (`src/visual-models/linear-comparison.tsx` or similar): two horizontal rows of objects aligned 1-to-1, right-to-left, canonical size `660 × 120 px`.
2. Create new `CompareGroups` Exercise Archetype (`src/archetypes/compare-groups.tsx`):
   - Parameters: `compareMode` (`'compare-only' | 'quantify-and-compare' | 'find-difference'`), `visualKind` (`'linear-comparison' | 'ten-frame-pair'`), `numberRange: { min, max }`, `responseKind: 'circle' | 'fill-keyword'`.
   - Supports: circling group with more/fewer, writing group counts, fill-in comparison keyword.
3. Extend `ConnectMatch`: add mode `'ten-frame-to-comparison'` for K-101 and K-102 BB.
4. Extend `JudgeEquality`: add mode `'comparison-statement'` (judging whether comparison statements like "A has more than B" are true or false) for K-100 BB.
5. Author blueprints, localized Arabic titles, and Teacher Notes for K-99, K-100, K-101, and K-102.

**Lesson details:**

- **K-99** (Compare Groups to 10 with Linear Models): Warm-up from K-63 (`PictureGraphRead`). Practice: `CompareGroups` (`compare-only`, `linear-comparison`, circle more/fewer). Challenge: PoD fill-in keyword (`CompareGroups` `responseKind: 'fill-keyword'`). BB: `PictureGraphRead` with `includeComparison: true` (MORE OR LESS – A).
- **K-100** (Compare and Quantify Groups to 10 with Linear Models): Warm-up from K-99 (`CompareGroups`). Practice: `CompareGroups` (`quantify-and-compare`, `linear-comparison`, count + circle more/fewer). Challenge: PoD compare-the-parts. BB: `JudgeEquality` with `judgementKind: 'comparison-statement'` (MORE OR LESS – B).
- **K-101** (Compare Groups to 10 with Ten Frames): Warm-up from K-100 (`CompareGroups`). Practice: `CompareGroups` (`compare-only`, `ten-frame-pair`, circle more/fewer). Challenge: PoD fill-in keyword. BB: `ConnectMatch` with `ten-frame-to-comparison` (MATCHING – A).
- **K-102** (Compare and Quantify Groups to 10 with Ten Frames): Warm-up from K-101 (`CompareGroups`). Practice: `CompareGroups` (`quantify-and-compare`, `ten-frame-pair`, count + circle more/fewer). Challenge: PoD compare-the-parts. BB: `ConnectMatch` with `ten-frame-to-comparison` + total (MATCHING – B).

**Blocked by:** None (K-99's prereq K-63 is authored in Unit 6)

**Status:** resolved

- [x] `linear-comparison` visual model created with 1-to-1 alignment, RTL layout, grayscale distinction, and answer-key highlights
- [x] `CompareGroups` archetype created with modes `compare-only` and `quantify-and-compare`
- [x] `ConnectMatch` mode `ten-frame-to-comparison` implemented
- [x] `JudgeEquality` mode `comparison-statement` implemented
- [x] Blueprints, localized Arabic titles, and Teacher Notes registered for K-99 to K-102
- [x] Domain test: group with more has strictly greater count (or equal at Advanced); ten-frame counts within [1, 10]
- [x] Layout guard passes for `--lessons=K-99..K-102 --seeds=2`
