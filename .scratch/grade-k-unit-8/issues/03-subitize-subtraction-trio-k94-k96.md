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

**Status:** needs-triage

- [ ] Localized Arabic titles, Teacher Notes (with timed flash activity notes), and blueprints registered for K-94, K-95, and K-96
- [ ] Cross-off mode correctly progresses across difficulty levels
- [ ] WHAT'S WRONG items carry correct truth values across many seeds
- [ ] Layout guard passes for `--lessons=K-94,K-95,K-96 --seeds=2`
