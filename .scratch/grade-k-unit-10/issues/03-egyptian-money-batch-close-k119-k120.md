# 03: Egyptian Money and Batch Close (K-119, K-120)

**What to build:** A teacher can generate worksheets for K-119 and K-120. The existing `COIN_CATALOG` is revised to five proper Egyptian denominations: ٢٥ قرشاً (small silver), ٥٠ قرشاً (medium silver), ١ جنيه عملة (bimetallic gold/silver), ٥ جنيهات ورقة (green bill), ١٠ جنيهات ورقة (brown/gold bill) per ADR-0016. The new `money-card` Visual Model (212 × 160 px, 3-column friendly) renders Egyptian coin faces and bill rectangles with an AnswerLine below. The new `IdentifyAndLabel` archetype handles `mode: 'name'` (K-119 WB: child writes ربع جنيه / نصف جنيه / جنيه واحد / خمسة جنيهات / عشرة جنيهات) and `mode: 'value'` (K-120 WB: child writes ٢٥ قرشاً / ٥٠ قرشاً / ١ جنيه / ٥ جنيهات / ١٠ جنيهات). `ConnectMatch` gains `name-to-coin` mode (K-119 BB MONEY MATCH – A) and `value-to-coin` mode (K-120 BB MONEY MATCH – B). `JudgeEquality` gains `judgementKind: 'money-statement'` with a curated pool of ~8 true/false statements per difficulty about Egyptian coin attributes (K-120 PoD). The batch closes with the full Unit 10 layout guard sweep, Constitution §3.4 update, and Glossary terms committed.

Difficulty ranges for K-119–K-120: Easy = ٢٥ قرشاً and ٥٠ قرشاً only; Intermediate = all 5 denominations; Advanced = all 5 + true/false statements.

Warm-up mapping: K-119 ← K-4 Easy, K-120 ← K-119 Easy.

Arabic titles: K-119 النقود المصرية — أسماء العملات, K-120 النقود المصرية — قِيَم العملات.

**Blocked by:** 02 (Numbers to 100 — Extending to the Full Range).

**Status:** done

- [x] `COIN_CATALOG` revised to 5 Egyptian denominations with correct Arabic names, values, visual descriptions, and size/color metadata
- [x] K-4 (Match Coins) still generates and renders correctly with the revised catalog
- [x] `money-card` Visual Model renders Egyptian coin faces (copper/silver/bimetallic circles with denomination numeral) and bill rectangles at 212 × 160 px
- [x] `IdentifyAndLabel` `mode: 'name'` generates K-119 WB exercises: coin/bill image + AnswerLine for Arabic name
- [x] `IdentifyAndLabel` `mode: 'value'` generates K-120 WB exercises: coin/bill image + AnswerLine for mixed-unit value
- [x] `ConnectMatch` `name-to-coin` mode generates K-119 BB (MONEY MATCH – A) exercises
- [x] `ConnectMatch` `value-to-coin` mode generates K-120 BB (MONEY MATCH – B) exercises
- [x] `JudgeEquality` `money-statement` mode generates K-120 PoD with curated true/false statements about Egyptian coin attributes
- [x] No duplicate coin within one `IdentifyAndLabel` exercise
- [x] Domain test: every `IdentifyAndLabel` exercise shows name/value matching the catalog entry
- [x] Domain test: every money statement in the curated pool is factually correct
- [x] K-119, K-120 Warm-Up exercises draw from the correct prerequisite at Easy
- [x] Every Answer Key exercise carries a non-empty Strategy Hint
- [x] No Western digits in any student-facing rendered HTML
- [x] Layout guard green for K-119, K-120 (`--lessons=K-119..K-120 --seeds=2`)
- [x] **Batch close**: full unit layout guard green (`--lessons=K-113..K-120 --seeds=5`)
- [x] **Batch close**: all-lessons sweep green (`--seeds=5 --png=none`)
- [x] Constitution §3.4 updated with Ten-Frame Grid and Money Card canonical sizes
- [x] Glossary terms committed: Base-10 Nickname, Skip Count, Decade Number
