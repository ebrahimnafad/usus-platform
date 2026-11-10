# 02: Find Unknown Part and Balance Equations — K-91, K-92, K-93

**What to build:**

1. Author blueprints for K-91, K-92, and K-93 using existing archetypes with subtraction parameters.
2. Author Arabic titles, Teacher Notes (including co-presentation notes for K-91 and K-92), and classroom activities.

**Lesson details:**

- **K-91** (Find the Unknown Part with Number Bonds): Warm-up from K-87 (`JoinParts` addition missing-part with ten frames — bridges addition → subtraction). Practice: `TakeAway` with `representation: "ten-frame"`, `responseForm: "number-bond"`. Difficulty: Easy `totalRange: [6, 8]`, Intermediate/Advanced `[6, 10]`. Challenge: imagine total, cross off, draw to check. BB MATCHING A: `ConnectMatch` with `matchingMode: "ten-frame-to-bond"`, `operation: "subtract"`.
- **K-92** (Find the Unknown Part with Equations): Warm-up from K-91 (`TakeAway` bond). Practice: `TakeAway` with `representation: "ten-frame"`, `responseForm: "equation"`. Challenge: imagine total, cross off, draw to check. BB MATCHING B: `ConnectMatch` with `matchingMode: "ten-frame-to-equation"`, `operation: "subtract"`. Note: curriculum's "Fill in the missing total" = Missing Part (standard `Total − Part = ؟`).
- **K-93*** (Balance Equations — Subtract within 10): Warm-up from K-92 (`TakeAway` equation). Practice: `JudgeEquality` with `mode: "true-false"`, `operation: "subtract"`, `totalRange: [6, 10]`. Challenge: match expressions with same value, draw to check. BB TEETER TOTS: `JudgeEquality` with `modelKind: "balance-scale"`, `operation: "subtract"`, `totalRange: [6, 10]`.

**Blocked by:** Ticket 01 (K-92's warm-up chain traces back through K-91, which itself depends on K-87 from Unit 7 — but K-91's blueprint comes from this ticket)

**Status:** resolved

- [x] Localized Arabic titles, Teacher Notes, and blueprints registered for K-91, K-92, and K-93
- [x] Warm-up for K-91 correctly draws from K-87 (addition `JoinParts` missing-part)
- [x] K-93 Balance Scale correctly renders subtraction expressions on pans
- [x] Layout guard passes for `--lessons=K-91,K-92,K-93 --seeds=2`

## Comments

- Implemented on `feat/grade-k-unit-5` (the Unit 8 batch branch). New blueprint file `src/blueprints/grade-k/lessons-k91-to-k93.ts` registered via `src/registry/bootstrap.ts`; localization entries for K-91/K-92/K-93 added to `src/curriculum/arabic-localization.ts`. Domain + engine tests in `tests/ticket-02-unit-8-unknown-part-balance-k91-k93.test.ts` (10 tests, TDD red→green per lesson slice). Verified: warm-up chain K-91←K-87, K-92←K-91 (TakeAway bond), K-93←K-92 (TakeAway equation); MATCHING A/B pairs; TEETER TOTS pans carry `الكلّ − ؟` expression pans solved from the number bank (both fills in the bank, mirroring K-88); `−` (U+2212) everywhere; no Western numerals. `npm run guard:layout -- --lessons=K-91..K-93 --seeds=2` PASS (0/48; K-91 max 3 pages, K-92/K-93 2). `npm run test:fast` 318/318.
- Code review (two axes, post-commit): fixed three Arabic typos (وقالوا → وقُولوا twice, المعليمان → المعلّمان, بدأراً → بدءاً), removed a redundant dynamic import in the test helper, and de-duplicated the K-93 Easy tier so its closing true-false exercise follows the K-88 mirror pattern (same params/prompt, truncated hint) rather than a byte-identical repeat of practice[0]. Noted without code change: §6.3 reversed-form practice at Easy/Intermediate is shipped identically by K-88 (pre-existing; constitution-amendment candidate); «بنك الأعداد»/«كفّة» glossary entries are batch-close debt introduced by K-88; the Advanced twoExpressionPans item mixes add/subtract pans in one row per the user-approved plan decision covering the "match expressions with the same value" PotD (no expression-to-expression archetype exists); Advanced practice partTakenAway items use [6,9] matching K-87's blessed part1 analog ([6,10] is covered by other Advanced slots).
