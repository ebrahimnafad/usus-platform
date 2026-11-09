# 03: Numtanga Archetype, Subitize Addition to 10, and Lessons K-81 to K-83

**What to build:**

1. Implement and register new `Numtanga` exercise archetype (`src/archetypes/numtanga.tsx`) with triangular pyramid grids at canonical size `324 × 212 px` (sums ≤ 10, configurable blanks).
2. Register `Numtanga` in `src/domain/types.ts`, `src/blueprints/registry.ts`, and `src/registry/bootstrap.ts`.
3. Author blueprints, Arabic titles, and Teacher Notes for K-81, K-82, and K-83 using `JoinParts` (ten-frame with digits, bonds, equations, and drawn counters) and `Numtanga` Brain Builders A, B, and C.

**Blocked by:** 01

**Status:** resolved

- [x] `Numtanga` archetype implemented with triangular addition pyramid SVG grid (`324 × 212 px`), seed-driven generation, and answer key solved state
- [x] Registered in `TypedArchetypeParamsMap` and `src/registry/bootstrap.ts`
- [x] Localized Arabic titles, Teacher Notes, and blueprints registered for K-81, K-82, and K-83
- [x] Layout guard passes for `--lessons=K-81..K-83 --seeds=2`

## Comments

- Implemented ticket 03 as a TDD seam: `createNumtangaGridSpec` / `NumtangaGridView` render the canonical grid (`data-visual-model="numtanga-grid"`, exactly 324 × 212 px), and the `Numtanga` archetype (`src/archetypes/numtanga.tsx`) generates seed-driven pyramids — bottom row always fully given, blank Answer Slots seeded only among `midLeft`/`midRight`/`top` so every blank solves by pure addition (K-81's only prerequisite is K-36; no missing-part subtraction is introduced).
- Two pyramids fill the 660 px two-column layout exactly (324 + 12 + 324); one-pyramid exercises center inside a single 660 px column. Sums are capped at the authored `maxTotal` (Easy ≤ 8, Intermediate/Advanced ≤ 10); ordered fact keys follow §9.3 (right-hand cell first) with §7.3 no-repeat/unused-first dedup via `ctx.usedFacts`.
- Blueprints for K-81/K-82/K-83 (`src/blueprints/grade-k/lessons-k81-to-k83.ts`) ramp `JoinParts` from subitized ten-frame-and-digit equations (K-81) through drawn-counter number bonds (K-82) to equations (K-83), with Numtanga Brain Builders A/B/C as challenge (blank ramp 1→2→3 over the three lessons), plus the §6.3 `minPart: 0` edge at Advanced. Arabic titles and Teacher Notes added to `AUTHORED_LESSON_LOCALIZATION`; warm-up chain resolves to K-36 → K-81 → K-82.
- Verification: `tests/ticket-03-unit-7-numtanga-k81-k83.test.ts` 9/9; `tsc --noEmit` clean; `check-numerals.cjs` clean (three `strategyHintAr` openers reworded to approved imperatives; the `_Avoid_` form الناتج replaced with الكلّ); layout guard `--lessons=K-81..K-83 --seeds=2` PASS 0/48 renders (max 2 pages); full suite 42 files / 272 tests green (also run by the pre-commit hook on commit `f406e20`).
