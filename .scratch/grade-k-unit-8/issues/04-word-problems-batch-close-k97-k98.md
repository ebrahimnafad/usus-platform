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

**Status:** needs-triage

- [ ] Localized Arabic titles, Teacher Notes, and blueprints registered for K-97 and K-98
- [ ] Take-apart exercises correctly accept any valid Part pair
- [ ] WORD PROBLEM MATCH items correctly pair diagrams to word problems
- [ ] Layout guard passes for `--lessons=K-97,K-98 --seeds=2`
- [ ] Unit-wide guard passes: `--lessons=K-89..K-98 --seeds=5`
- [ ] Batch-close all-lessons sweep passes: `--seeds=5 --png=none`
- [ ] User review of all saved page PNGs and Arabic text complete
