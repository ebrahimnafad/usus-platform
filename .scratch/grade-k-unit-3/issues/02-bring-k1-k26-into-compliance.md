# 02: Bring K-1 to K-26 into compliance with the layout guard

**What to build:** Every authored Grade K lesson (K-1 to K-26) passes the ticket-01 layout guard at scale 1.0, for every seed, Difficulty Mode, and view the guard covers. Fix archetype rendering against the size standard first; only reduce a blueprint's exercise count when the sheet still does not fit in 2 pages.

**Blocked by:** 01: Layout guard, size standard, and full-scale printing

**Status:** ready-for-agent

- [ ] The seven existing archetypes (`ConnectMatch`, `ClassifyAndCount`, `PatternComplete`, `ModelCountAndTrace`, `PictureGraphRead`, `SequenceAndZero`, `SubitizePartWhole`) lay out on the 1 / 2 / 3-column standard and use the fixed Visual Model sizes; no fixed heights that content can outgrow, no content-driven wrapping
- [ ] Every five frame renders with 48 px cells
- [ ] All student-facing text uses the constitution §4 type scale; the current 9, 10, and 11 px labels and ad-hoc `text-xs` / `text-xl` sizes are replaced, and nothing renders below 12 px
- [ ] Prompts longer than 2 lines are rewritten, not wrapped
- [ ] Section sizes follow the revised limits (Warm-Up 1–2, Practice 2–4, Challenge & Assessment 1–2), and the primary-seam tests are updated to match
- [ ] Exercises are removed from a blueprint only when the sheet still exceeds 2 pages after rendering fixes; each removal is listed in this ticket's Comments with the lesson and tier
- [ ] The guard passes for all 26 lessons; the existing test suite passes (constitution §12)
- [ ] The saved PNGs for every lesson have been reviewed by the user before this ticket closes
