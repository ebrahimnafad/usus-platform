# 03: Subitize Subtraction Trio — K-94, K-95, K-96

**What to build:**

1. Author blueprints for K-94, K-95, and K-96 using existing `TakeAway` and `JudgeEquality` archetypes with subtraction parameters.
2. Author Arabic titles, Teacher Notes (including timed flash activity notes — Teacher Notes only, §5.5), and classroom activities.

**Lesson details:**

- **K-94** (Subtract by Subitizing Counters in Ten Frames): Warm-up from K-92 (`TakeAway` equation). Practice: `TakeAway` with `representation: "ten-frame-and-digit"`, `crossOffMode: "shown"` (Easy) / `"student"` (Advanced), `responseForm: "answer-slot"`. BB WHAT'S WRONG A: `JudgeEquality` with `mode: "whats-wrong"`, `operation: "subtract"`, `modelKind: "equation"`, `totalRange: [6, 10]`.
- **K-95** (Subtract by Subitizing Number Bonds): Warm-up from K-94 (`TakeAway` cross-off). Practice: `TakeAway` with `representation: "ten-frame"`, `responseForm: "number-bond"`. BB WHAT'S WRONG B: `JudgeEquality` with `mode: "whats-wrong"`, `operation: "subtract"`, `modelKind: "number-bond"`, `totalRange: [6, 10]`.
- **K-96** (Subtract by Subitizing Equations): Warm-up from K-95 (`TakeAway` bond). Practice: `TakeAway` with `representation: "ten-frame"`, `responseForm: "equation"`. BB WHAT'S WRONG C: `JudgeEquality` with `mode: "whats-wrong"`, `operation: "subtract"`, `modelKind: "equation"`, `totalRange: [6, 10]`.

**Cross-off progression:**

| Difficulty   | crossOffMode                   | Response |
| ------------ | ------------------------------ | -------- |
| Easy         | `"shown"` (X pre-drawn)        | Trace    |
| Intermediate | `"shown"`                      | Write    |
| Advanced     | `"student"` (mental cross-off) | Write    |

**Blocked by:** Ticket 02 (K-94's warm-up draws from K-92)

**Status:** resolved

- [x] Localized Arabic titles, Teacher Notes (with timed flash activity notes), and blueprints registered for K-94, K-95, and K-96
- [x] Cross-off mode correctly progresses across difficulty levels
- [x] WHAT'S WRONG items carry correct truth values across many seeds
- [x] Layout guard passes for `--lessons=K-94,K-95,K-96 --seeds=2`

## Comments

### 2026-11-11 — verification (agent)

- Blueprints, Arabic titles, Teacher Notes, and classroom activities authored for K-94/K-95/K-96 (`src/blueprints/grade-k/lessons-k94-to-k96.ts`, `src/curriculum/arabic-localization.ts`; registered via `src/registry/bootstrap.ts`). The timed flash activity (3-second quick images) lives in `classroomActivityNoteAr` only — Teacher Notes never print (§5.5).
- Cross-off progression verified per difficulty mode in the ticket tests: Easy = `shown` + `trace`, Intermediate = `shown` + `write`, Advanced = `student` + `write` on the main practice line, with the `partTakenAway` edge-case exercise at Advanced only (§6.3). K-94's edge case uses bare ten-frame + `equation` form so the digit card cannot leak the answer.
- WHAT'S WRONG A/B/C (`equation` / `number-bond` / `equation`, `operation: subtract`) verified across 8 seeds × 3 tiers × 3 lessons: `isCorrect === (realTotal − part1 === part2)` and exactly one false item per row.
- Ticket tests 10/10; full `test:fast` 49 files / 328 tests passing; typecheck and numeral linter clean.
- Layout guard `--lessons=K-94,K-95,K-96 --seeds=2`: PASS, 0/48 violations, max pages 2.
- Code review found one §6.2 deviation (K-95/K-96 Easy warm-ups `write` instead of `trace`, which propagated to K-96's rendered warm-up via §5.3); fixed and pinned with warm-up action assertions.
- Warm-up sources verified: K-94 ← K-92, K-95 ← K-94, K-96 ← K-95.
- Commits: 35cfce5 (implementation), 79b66b1 (code-review fix), this commit (status flip). Per §12, the user PNG/Arabic review happens once at batch close (ticket 04).
