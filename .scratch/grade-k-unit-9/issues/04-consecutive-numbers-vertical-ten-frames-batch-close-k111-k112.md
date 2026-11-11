# 04: Consecutive Numbers, Vertical Ten Frames, and Batch Close — K-111, K-112

**What to build:**

1. Extend `SequenceAndZero` archetype:
   - Add `responseKind: 'fill-missing'` — student writes missing consecutive numbers in answer slots along a sequence line.
2. Extend `ten-frame` Visual Model:
   - Add `orientation: 'vertical'` parameter (5 rows × 2 cols, canonical size `108 × 252 px`).
3. Extend `SubitizePartWhole`:
   - Add `responseKind: 'decompose-teen'` with `drawModel: 'vertical-ten-frame'` for K-112 WB.
4. Author blueprints, localized Arabic titles, and Teacher Notes for K-111 and K-112.
5. Perform full unit validation (`--lessons=K-99..K-112 --seeds=5`) and batch-close sweep across all authored lessons (`--seeds=5 --png=none`) per constitution §12.

**Lesson details:**

- **K-111** (Count and Write Consecutive Numbers): Warm-up from K-106 (`SequenceAndZero`). Practice: `SequenceAndZero` (`fill-missing`, numbers 11–20). Challenge: PoD count forward, write 1 more / 1 less. BB: `Digicross` with `numberRange: { min: 11, max: 15 }`.
- **K-112** (Model Numbers with Vertical Ten Frames & Number Bonds): Warm-up from K-110 (`SubitizePartWhole`). Practice: `SubitizePartWhole` (`decompose-teen`, vertical ten-frame pair, write 10 and some more). Challenge: PoD show snap cubes in words, ten frames, and expanded form. BB: `ConnectMatch` with `ten-frame-to-number-bond` mode (MATCHING – D).

**Blocked by:** Tickets 01, 02, and 03

**Status:** ready-for-agent

- [ ] `SequenceAndZero` extended with `fill-missing` mode for consecutive numbers
- [ ] `ten-frame` extended with `orientation: 'vertical'` parameter
- [ ] `SubitizePartWhole` extended with `decompose-teen` mode
- [ ] Blueprints, localized Arabic titles, and Teacher Notes registered for K-111 and K-112
- [ ] Domain test: consecutive sequences are gapless; teen decompositions satisfy 10 + ones = total
- [ ] Layout guard passes for `--lessons=K-111,K-112 --seeds=2`
- [ ] Unit 9 full-suite validation passes: `--lessons=K-99..K-112 --seeds=5`
- [ ] Batch-close all-lessons sweep passes: `--seeds=5 --png=none` per constitution §12
