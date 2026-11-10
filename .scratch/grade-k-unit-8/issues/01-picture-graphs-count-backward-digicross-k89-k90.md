# 01: Picture Graphs, Count Backward, and Digicross — K-89, K-90

**What to build:**

1. Create new `Digicross` archetype (`src/archetypes/digicross.tsx`): a 3×3 number grid where each row and column is a consecutive counting sequence (forward or backward). Canonical size `324 × 212 px`. Parameters: `numberRange`, `missingCount`, `directions: "forward" | "backward" | "mixed"`. Answer Key fills blanks in accent style.
2. Update constitution §3.4 with `Digicross Grid (324 × 212 px)` and add amendment log entry.
3. Author blueprints, Arabic titles, and Teacher Notes for K-89 and K-90.

**Lesson details:**

- **K-89** (Count Backward with Picture Graphs): Warm-up from K-64 (`PictureGraphRead`). Practice: `PictureGraphRead` with `countsPattern: "decreasing-by-1"`, write counts, answer more/fewer. Challenge: `PictureGraphRead` COUNT DOWN (color trucks, figure out how many). BB: COUNT DOWN.
- **K-90** (Count Backward with Sets & Digits): Warm-up from K-66 (`SequenceAndZero` backward). Practice: `SequenceAndZero` with `sequenceMode: "backward"`, `visualKind: "ten-frame"`, connect groups in counting order. Challenge: `SequenceAndZero` cross off circles to count backward. BB: `Digicross` with `directions: "mixed"`.

**Blocked by:** None (K-89's prereq K-64 and K-90's prereq K-66 are both in Unit 6, already authored)

**Status:** needs-triage

- [ ] `Digicross` archetype created with SVG rendering, answer-key accent fills, and Strategy Hints
- [ ] Constitution §3.4 updated with `Digicross Grid (324 × 212 px)` and amendment log entry added
- [ ] Localized Arabic titles, Teacher Notes, and blueprints registered for K-89 and K-90
- [ ] Domain test: every Digicross grid has exactly one solution; each line is a valid consecutive sequence
- [ ] Layout guard passes for `--lessons=K-89,K-90 --seeds=2`
