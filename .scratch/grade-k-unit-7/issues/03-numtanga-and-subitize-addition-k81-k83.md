# 03: Numtanga Archetype, Subitize Addition to 10, and Lessons K-81 to K-83

**What to build:**

1. Implement and register new `Numtanga` exercise archetype (`src/archetypes/numtanga.tsx`) with triangular pyramid grids at canonical size `324 × 212 px` (sums ≤ 10, configurable blanks).
2. Register `Numtanga` in `src/domain/types.ts`, `src/blueprints/registry.ts`, and `src/registry/bootstrap.ts`.
3. Author blueprints, Arabic titles, and Teacher Notes for K-81, K-82, and K-83 using `JoinParts` (ten-frame with digits, bonds, equations, and drawn counters) and `Numtanga` Brain Builders A, B, and C.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] `Numtanga` archetype implemented with triangular addition pyramid SVG grid (`324 × 212 px`), seed-driven generation, and answer key solved state
- [ ] Registered in `TypedArchetypeParamsMap` and `src/registry/bootstrap.ts`
- [ ] Localized Arabic titles, Teacher Notes, and blueprints registered for K-81, K-82, and K-83
- [ ] Layout guard passes for `--lessons=K-81..K-83 --seeds=2`
