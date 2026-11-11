# 03: Compare Difference and Subitize to 20 — K-107 to K-110

**What to build:**

1. Extend `CompareGroups` archetype:
   - Add `compareMode: 'find-difference'` — count each group, then write how many more or fewer.
   - Support equal groups at Advanced difficulty (difference = 0, answer `٠`).
2. Extend `PictureGraphRead`: add `comparisonKind: 'find-difference'` for K-107 BB (DARE to COMPARE – A).
3. Extend `SubitizePartWhole`:
   - Support stacked ten-frame pair layout (`frameCount: 2`, numbers 11–20).
   - Add `complementTarget: 20` for "how many more make 20".
   - Add `responseKind: 'draw-to-make'` for K-109 and K-110 BB (HOW MANY? A & B).
4. Author blueprints, localized Arabic titles, and Teacher Notes for K-107, K-108, K-109, and K-110.

**Lesson details:**

- **K-107\*** (Compare How Many More or Fewer with Linear Models): Warm-up from K-100 (`CompareGroups`). Practice: `CompareGroups` (`find-difference`, `linear-comparison`). Challenge: PoD extra solid shapes. BB: `PictureGraphRead` with `find-difference` (DARE to COMPARE – A).
- **K-108\*** (Compare How Many More or Fewer with Ten Frames): Warm-up from K-107 (`CompareGroups`). Practice: `CompareGroups` (`find-difference`, `ten-frame-pair`). Challenge: PoD missing solid shapes. BB: `CompareGroups` (`find-difference`, ten-frame data) (DARE to COMPARE – B).
- **K-109** (Subitize with Ten Frames to Name One Part): Warm-up from K-103 (`ModelCountAndTrace`). Practice: `SubitizePartWhole` (stacked ten-frame pair, write how many or how many more make 20). Challenge: PoD imagine both parts. BB: `SubitizePartWhole` with `draw-to-make` (HOW MANY? – A).
- **K-110** (Subitize with Ten Frames to Name Both Parts): Warm-up from K-109 (`SubitizePartWhole`). Practice: `SubitizePartWhole` (write how many AND how many more make 20). Challenge: PoD imagine both parts. BB: `SubitizePartWhole` with `draw-to-make` and complement 20 (HOW MANY? – B).

**Blocked by:** Ticket 01 and Ticket 02

**Status:** ready-for-agent

- [ ] `CompareGroups` extended with `find-difference` mode and difference = 0 edge case handling
- [ ] `PictureGraphRead` extended with `find-difference` comparison mode
- [ ] `SubitizePartWhole` extended with stacked ten-frame pair, complement target 20, and `draw-to-make` response kind
- [ ] Blueprints, localized Arabic titles, and Teacher Notes registered for K-107 to K-110
- [ ] Domain test: difference equals |count₁ − count₂|; complement + count = 20; ten-frame counts within [11, 20]
- [ ] Layout guard passes for `--lessons=K-107..K-110 --seeds=2`
