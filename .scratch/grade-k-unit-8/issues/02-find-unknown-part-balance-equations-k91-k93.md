# 02: Find Unknown Part and Balance Equations — K-91, K-92, K-93

**What to build:**

1. Author blueprints for K-91, K-92, and K-93 using existing archetypes with subtraction parameters.
2. Author Arabic titles, Teacher Notes (including co-presentation notes for K-91 and K-92), and classroom activities.

**Lesson details:**

- **K-91** (Find the Unknown Part with Number Bonds): Warm-up from K-87 (`JoinParts` addition missing-part with ten frames — bridges addition → subtraction). Practice: `TakeAway` with `representation: "ten-frame"`, `responseForm: "number-bond"`. Difficulty: Easy `totalRange: [6, 8]`, Intermediate/Advanced `[6, 10]`. Challenge: imagine total, cross off, draw to check. BB MATCHING A: `ConnectMatch` with `matchingMode: "ten-frame-to-bond"`, `operation: "subtract"`.
- **K-92** (Find the Unknown Part with Equations): Warm-up from K-91 (`TakeAway` bond). Practice: `TakeAway` with `representation: "ten-frame"`, `responseForm: "equation"`. Challenge: imagine total, cross off, draw to check. BB MATCHING B: `ConnectMatch` with `matchingMode: "ten-frame-to-equation"`, `operation: "subtract"`. Note: curriculum's "Fill in the missing total" = Missing Part (standard `Total − Part = ؟`).
- **K-93*** (Balance Equations — Subtract within 10): Warm-up from K-92 (`TakeAway` equation). Practice: `JudgeEquality` with `mode: "true-false"`, `operation: "subtract"`, `totalRange: [6, 10]`. Challenge: match expressions with same value, draw to check. BB TEETER TOTS: `JudgeEquality` with `modelKind: "balance-scale"`, `operation: "subtract"`, `totalRange: [6, 10]`.

**Blocked by:** Ticket 01 (K-92's warm-up chain traces back through K-91, which itself depends on K-87 from Unit 7 — but K-91's blueprint comes from this ticket)

**Status:** needs-triage

- [ ] Localized Arabic titles, Teacher Notes, and blueprints registered for K-91, K-92, and K-93
- [ ] Warm-up for K-91 correctly draws from K-87 (addition `JoinParts` missing-part)
- [ ] K-93 Balance Scale correctly renders subtraction expressions on pans
- [ ] Layout guard passes for `--lessons=K-91,K-92,K-93 --seeds=2`
