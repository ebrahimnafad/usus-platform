# 02: Bring K-1 to K-26 into compliance with the layout guard

**What to build:** Every authored Grade K lesson (K-1 to K-26) passes the ticket-01 layout guard at scale 1.0, for every seed, Difficulty Mode, and view the guard covers. Fix archetype rendering against the size standard first; only reduce a blueprint's exercise count when the sheet still does not fit in 2 pages.

**Blocked by:** 01: Layout guard, size standard, and full-scale printing

**Status:** ready-for-human

- [x] The seven existing archetypes (`ConnectMatch`, `ClassifyAndCount`, `PatternComplete`, `ModelCountAndTrace`, `PictureGraphRead`, `SequenceAndZero`, `SubitizePartWhole`) lay out on the 1 / 2 / 3-column standard and use the fixed Visual Model sizes; no fixed heights that content can outgrow, no content-driven wrapping
- [x] Every five frame renders with 48 px cells
- [x] All student-facing text uses the constitution §4 type scale; the current 9, 10, and 11 px labels and ad-hoc `text-xs` / `text-xl` sizes are replaced, and nothing renders below 12 px
- [x] Prompts longer than 2 lines are rewritten, not wrapped
- [x] Section sizes follow the revised limits (Warm-Up 1–2, Practice 2–4, Challenge & Assessment 1–2), and the primary-seam tests are updated to match
- [x] Exercises are removed from a blueprint only when the sheet still exceeds 2 pages after rendering fixes; each removal is listed in this ticket's Comments with the lesson and tier
- [x] The guard passes for all 26 lessons; the existing test suite passes (constitution §12)
- [ ] The saved PNGs for every lesson have been reviewed by the user before this ticket closes

## Comments

### Blueprint Exercise Removals (for 2-Page Budget at Scale 1.0)

At full scale 1.0 (`ADR-0013`), a 5-exercise sheet (`1 Warm-Up + 3 Practice + 1 Challenge`) with Answer Key Strategy Hints and `break-inside: avoid` places 2 cards on Page 1, 2 cards on Page 2, and spills the 5th card onto Page 3 (`3 pages > 2 page budget`). Removing the 3rd Practice exercise (`practice[2]`) in each tier brings every lesson to `1 Warm-Up + 2 Practice + 1 Challenge = 4 exercises` (within the constitution §5.2 limits: Warm-Up 1–2, Practice 2–4, Challenge 1–2) so both Worksheet and Answer Key fit within 2 pages across all seeds and difficulty modes:

- **K-1 (`src/blueprints/default-tier-template.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ConnectMatch`)
- **K-2 (`src/blueprints/grade-k/lessons-k2-to-k8.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ConnectMatch`)
- **K-3 (`src/blueprints/grade-k/lessons-k2-to-k8.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ConnectMatch`)
- **K-4 (`src/blueprints/grade-k/lessons-k2-to-k8.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ConnectMatch`)
- **K-5 (`src/blueprints/grade-k/lessons-k2-to-k8.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ClassifyAndCount`)
- **K-6 (`src/blueprints/grade-k/lessons-k2-to-k8.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ClassifyAndCount`)
- **K-7 (`src/blueprints/grade-k/lessons-k2-to-k8.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ClassifyAndCount`)
- **K-8 (`src/blueprints/grade-k/lessons-k2-to-k8.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ClassifyAndCount`)
- **K-9 (`src/blueprints/grade-k/lessons-k9-to-k11.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`PatternComplete`)
- **K-10 (`src/blueprints/grade-k/lessons-k9-to-k11.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`PatternComplete`)
- **K-11 (`src/blueprints/grade-k/lessons-k9-to-k11.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`PatternComplete`)
- **K-12 (`src/blueprints/grade-k/lessons-k12-to-k19.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ModelCountAndTrace`)
- **K-13 (`src/blueprints/grade-k/lessons-k12-to-k19.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ModelCountAndTrace`)
- **K-14 (`src/blueprints/grade-k/lessons-k12-to-k19.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ModelCountAndTrace`)
- **K-15 (`src/blueprints/grade-k/lessons-k12-to-k19.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ModelCountAndTrace`)
- **K-16 (`src/blueprints/grade-k/lessons-k12-to-k19.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ModelCountAndTrace`)
- **K-17 (`src/blueprints/grade-k/lessons-k12-to-k19.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ConnectMatch`)
- **K-18 (`src/blueprints/grade-k/lessons-k12-to-k19.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ConnectMatch`)
- **K-19 (`src/blueprints/grade-k/lessons-k12-to-k19.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`ConnectMatch`)
- **K-20 (`src/blueprints/grade-k/lessons-k20-to-k26.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`PictureGraphRead`)
- **K-21 (`src/blueprints/grade-k/lessons-k20-to-k26.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`PictureGraphRead`)
- **K-22 (`src/blueprints/grade-k/lessons-k20-to-k26.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`SequenceAndZero`)
- **K-23 (`src/blueprints/grade-k/lessons-k20-to-k26.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`SequenceAndZero`)
- **K-24 (`src/blueprints/grade-k/lessons-k20-to-k26.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`SequenceAndZero`)
- **K-25 (`src/blueprints/grade-k/lessons-k20-to-k26.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`SubitizePartWhole`)
- **K-26 (`src/blueprints/grade-k/lessons-k20-to-k26.ts`)**: `Easy.practice[2]`, `Intermediate.practice[2]`, `Advanced.practice[2]` (`SubitizePartWhole`)
