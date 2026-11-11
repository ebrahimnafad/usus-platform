# 01: Picture Graphs, Count Backward, and Digicross — K-89, K-90

**What to build:**

1. Create new `Digicross` archetype (`src/archetypes/digicross.tsx`): a 3×3 number grid where each row and column is a consecutive counting sequence (forward or backward). Canonical size `324 × 212 px`. Parameters: `numberRange`, `missingCount`, `directions: "forward" | "backward" | "mixed"`. Answer Key fills blanks in accent style.
2. Update constitution §3.4 with `Digicross Grid (324 × 212 px)` and add amendment log entry.
3. Author blueprints, Arabic titles, and Teacher Notes for K-89 and K-90.

**Lesson details:**

- **K-89** (Count Backward with Picture Graphs): Warm-up from K-64 (`PictureGraphRead`). Practice: `PictureGraphRead` with `countsPattern: "decreasing-by-1"`, write counts, answer more/fewer. Challenge: `PictureGraphRead` COUNT DOWN (color trucks, figure out how many). BB: COUNT DOWN.
- **K-90** (Count Backward with Sets & Digits): Warm-up from K-66 (`SequenceAndZero` backward). Practice: `SequenceAndZero` with `sequenceMode: "backward"`, `visualKind: "ten-frame"`, connect groups in counting order. Challenge: `SequenceAndZero` cross off circles to count backward. BB: `Digicross` with `directions: "mixed"`.

**Blocked by:** None (K-89's prereq K-64 and K-90's prereq K-66 are both in Unit 6, already authored)

**Status:** resolved

- [x] `Digicross` archetype created with SVG rendering, answer-key accent fills, and Strategy Hints
- [x] Constitution §3.4 updated with `Digicross Grid (324 × 212 px)` and amendment log entry added
- [x] Localized Arabic titles, Teacher Notes, and blueprints registered for K-89 and K-90
- [x] Domain test: every Digicross grid has exactly one solution; each line is a valid consecutive sequence
- [x] Layout guard passes for `--lessons=K-89,K-90 --seeds=2`

## Comments

### 2026-11-11 — verification (agent)

- `Digicross` archetype at `src/archetypes/digicross.tsx` — SVG rendering, answer-key accent fills, Strategy Hints. Domain test asserts every 3×3 grid has exactly one solution and every row/column is a valid consecutive sequence (`tests/ticket-01-unit-8-picture-graphs-count-backward-digicross-k89-k90.test.ts`, 10/10 passing).
- Constitution §3.4 row `Digicross Grid | 324 × 212 px` landed in e0f3b85; the dated amendment-log entry required by §1.3 was missing and is added alongside this flip (commit verification pass).
- K-89/K-90 blueprints, Arabic titles, and Teacher Notes registered (`src/blueprints/grade-k/lessons-k89-to-k90.ts`, `src/curriculum/arabic-localization.ts`); warm-ups resolve from K-64 and K-66 per the spec.
- Full `test:fast` in this session: 49 files / 328 tests passing; typecheck and numeral linter clean.
- Layout guard `--lessons=K-89,K-90 --seeds=2` (run in this session): PASS, 0/32 violations, max pages 4 (K-89) / 3 (K-90).
- Commits: e0f3b85 (implementation), this commit (amendment-log fix + status flip). Per §12, the user PNG/Arabic review happens once at batch close (ticket 04).
