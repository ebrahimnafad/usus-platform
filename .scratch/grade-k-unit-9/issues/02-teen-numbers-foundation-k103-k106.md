# 02: Teen Numbers Foundation, Measurement, and Dot Arrays — K-103 to K-106

**What to build:**

1. Create new `dot-array` Visual Model (`src/visual-models/dot-array.tsx` or similar): rectangular grid of dots in rows and columns, supporting near arrays (incomplete bottom row), canonical size `212 × 160 px`.
2. Extend `numeral-trace` Visual Model to support composite 11–20 tracing (two side-by-side single digits).
3. Extend `picture-graph` Visual Model / `PictureGraphRead` archetype: support `maxPerRow: 10` wrapping so categories with up to 20 items wrap to a second row (ten-frame style).
4. Author blueprints, localized Arabic titles, and Teacher Notes for K-103, K-104, K-105, and K-106.

**Lesson details:**

- **K-103** (Identify and Trace Numbers 11-20): Warm-up from K-62 (`ModelCountAndTrace`). Practice: `ModelCountAndTrace` with composite numeral trace 11–20. Challenge: PoD write parts of ten-frame decomposition. BB: `ModelCountAndTrace` TRACE and WRITE (11–20).
- **K-104** (Picture Graphs to 20): Warm-up from K-63 (`PictureGraphRead`). Practice: `PictureGraphRead` with counts up to 20 and two-row wrapping. Challenge: PoD show total as "10 and some more" (`SubitizePartWhole` `responseKind: 'decompose-teen'`). BB: `PictureGraphRead` with `includeComparison: true` (MORE OR LESS – C).
- **K-105** (Measure Total Side Length of Polygons): Warm-up from K-73 (`MeasureAndCompareLength`). Practice: `MeasureAndCompareLength` (polygon perimeter with paper clips). Challenge: PoD shape names and paper-clip counts. BB: `ConnectMatch` with `shape-to-description` mode (MATCHING – C).
- **K-106** (Model Numbers using Arrays, Near Arrays & Digits): Warm-up from K-65 (`SequenceAndZero`). Practice: `SequenceAndZero` with `dot-array` visual models, connect arrays in counting order. Challenge: PoD draw arrows counting forward/backward. BB: `SequenceAndZero` tally marks forward from 16 (COUNT & CONNECT).

**Blocked by:** Ticket 01 (for clean dependency sequencing)

**Status:** ready-for-agent

- [ ] `dot-array` visual model created with full arrays, near arrays, RTL fill, and answer-key grouping containers
- [ ] `numeral-trace` extended to composite 11–20 digits
- [ ] `picture-graph` extended with `maxPerRow: 10` wrapping for counts up to 20
- [ ] Blueprints, localized Arabic titles, and Teacher Notes registered for K-103 to K-106
- [ ] Domain test: dot-array count matches dot layout; polygon perimeter matches sides × units; teen number traces valid
- [ ] Layout guard passes for `--lessons=K-103..K-106 --seeds=2`
