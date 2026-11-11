# 04: Word Problems and Batch Close — K-97, K-98

**What to build:**

1. Author blueprints for K-97 and K-98 using existing `SolveWordProblem` archetype with subtraction situations at `totalRange: [6, 10]`.
2. Author Arabic titles, Teacher Notes (including co-presentation notes for K-97), and classroom activities.
3. Run batch-close validation.

**Lesson details:**

- **K-97** (Take-From Story Problems): Warm-up from K-96 (`TakeAway` equation). Practice: `SolveWordProblem` with `situation: "take-from"`, `totalRange: [6, 10]`, `representation: "ten-frame"`. Easy: complete the part-total model and equation, answer how many are left. Intermediate: read story and answer. Advanced: write the equation independently. Challenge: use model to write a take-from story. BB WORD PROBLEM MATCH A: `SolveWordProblem` with `matchingMode: "model-to-word-problem"`, `situation: "take-from"`.
- **K-98** (Take-Apart Story Problems): Warm-up from K-97 (`SolveWordProblem` take-from). Practice: `SolveWordProblem` with `situation: "take-apart"`, `totalRange: [6, 10]`, `representation: "ten-frame"`. Multiple valid answers (any pair of Parts summing to the Total). Challenge: use model to write a take-apart story and equation. BB WORD PROBLEM MATCH B: `SolveWordProblem` with `matchingMode: "model-to-word-problem"`, `situation: "take-apart"`.

**Batch close checklist (§12):**

1. Validate full unit: `npm run guard:layout -- --lessons=K-89,K-90,K-91,K-92,K-93,K-94,K-95,K-96,K-97,K-98 --seeds=5`
2. Full all-lessons sweep: `npm run guard:layout -- --seeds=5 --png=none`
3. Primary-seam tests and domain tests pass for K-89 to K-98
4. Every new term (none expected) is in `GLOSSARY.md`; `Digicross Grid` size is in §3.4
5. User has reviewed saved page PNGs and Arabic text of every new lesson

**Blocked by:** Ticket 03 (K-97's warm-up draws from K-96)

**Status:** resolved

- [x] Localized Arabic titles, Teacher Notes, and blueprints registered for K-97 and K-98
- [x] Take-apart exercises correctly accept any valid Part pair
- [x] WORD PROBLEM MATCH items correctly pair diagrams to word problems
- [x] Layout guard passes for `--lessons=K-97,K-98 --seeds=2`
- [x] Unit-wide guard passes: `--lessons=K-89..K-98 --seeds=5`
- [x] Batch-close all-lessons sweep passes: `--seeds=5 --png=none`
- [x] User review of all saved page PNGs and Arabic text complete

## Comments

### 2026-11-11 — verification (agent)

- Blueprints, Arabic titles, Teacher Notes (including K-97's co-presentation notes), and classroom activities authored for K-97/K-98 (`src/blueprints/grade-k/lessons-k97-to-k98.ts`, `src/curriculum/arabic-localization.ts`; registered via `src/registry/bootstrap.ts`).
- Take-apart "any valid pair" verified: `formatValidTakeApartPairsAr` had clamped totals to ≤5; fixed so totals ≤5 keep the Unit-5 pinned enumeration and totals 6–10 list unordered pairs (p1 ≥ p2, min p1 = ⌈total/2⌉). K-98's answer keys mark `data-valid-take-apart-pairs="true"` with the "answers vary" message.
- WORD PROBLEM MATCH A/B implemented as `ConnectMatch` with `matchingMode: "model-to-word-problem"` — the ticket text said `SolveWordProblem`, but `matchingMode` lives on ConnectMatch (Unit 5/7 precedent: K-54/K-56–58/K-84–85). K-97 BB A: 2 pairs, `take-from`; K-98 BB B: 2 pairs, `take-apart` (difficulty ladder in `totalRange`; the 3-pair capability is asserted at the archetype level).
- Warm-up chain verified per §5.3: K-97 ← K-96 (TakeAway equation), K-98 ← K-97 (SolveWordProblem take-from). Note K-97's authored warm-up tiers are take-from SolveWordProblem — they are what K-98's rendered warm-up draws; K-97's own rendered warm-up comes from K-96.
- Ticket tests 15/15; full `test:fast` 50 files / 344 tests passing; typecheck and numeral linter clean; no new GLOSSARY terms (Take-From never had an entry; Take-Apart already carries the answers-vary semantics).
- Layout guards: per-ticket `--lessons=K-97,K-98 --seeds=2` PASS 0/32; unit-wide `--lessons=K-89..K-98 --seeds=5` PASS 0/400; all-lessons sweep `--seeds=5 --png=none` PASS 0/3920.
- Page budget: all student worksheets fit 2 pages in every mode. Four answer keys render 3 pages (K-97 Easy; K-98 Easy/scaffolded/Intermediate) — a content-driven allowance under §2.2, at the §5.2 exercise minimums with every sensible ladder rung exhausted (itemCount 1, BB pairCount 2, PotD 1).
- The sweep surfaced a latent K-44 overflow: `PartWholeCardGrid`'s picture-graph branch hardcoded a 324px column while commit 755c3c9's redesigned graph is 390/430px wide. Fixed in `src/components/worksheet/PartWholeCardGrid.tsx`: the graph now takes the full-width row with equations stacked beneath, mirroring the `picture-graph-read` archetype; regression pinned in `tests/layout-guard-geometry.test.ts`. Outside this ticket's lesson range but required by the sweep gate.
- Code review: one §9.4 fix (K-97 Advanced hint trimmed to the two-step child voice, commit 8a84aae). The redesigned picture graph's 390/430px intrinsic widths have no §3.4 canonical-size entry (predates this batch, commit 755c3c9); flagged to the user, who opted not to amend the constitution at this close.
- User PNG/Arabic review completed this session (saved under `layout-guard-output/png/K-97/**` and `K-98/**`).
- Commits: 1cfa728 (implementation), b4b2ae2 (K-44 fix), 8a84aae (code-review fix), this commit (status flip).
