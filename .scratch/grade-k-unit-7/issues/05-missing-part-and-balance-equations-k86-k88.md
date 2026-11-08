# 05: Missing Part, Balance Equations, and Lessons K-86 to K-88

**What to build:**

1. Support missing-part exercises in `JoinParts` using `unknownPosition: "part2"` (and `"part1"` at Advanced) with Ten Frame models and number bonds (K-86) and equations (K-87).
2. Extend `ConnectMatch` for missing-part matching (`MATCHING - F` and `MATCHING - G`).
3. Author blueprints, Arabic titles, and Teacher Notes for K-86, K-87, and K-88 (Balance Equations & TEETER TOTS).
4. Run full Unit 7 verification (`--lessons=K-74..K-88 --seeds=5`) followed by the single batch-close all-lessons sweep (`--seeds=5 --png=none`).

**Blocked by:** 01, 02, 03, 04

**Status:** ready-for-agent

- [ ] `JoinParts` correctly handles missing-part unknowns with Ten Frame models
- [ ] `ConnectMatch` supports missing-part pairs for number bonds and equations
- [ ] `JudgeEquality` scales addition to 10 with balance scales (TEETER TOTS) and true/false equations
- [ ] Localized Arabic titles, Teacher Notes, and blueprints registered for K-86, K-87, and K-88
- [ ] Ticket guard passes for `--lessons=K-86..K-88 --seeds=2`
- [ ] Unit 7 sweep passes for `--lessons=K-74..K-88 --seeds=5`
- [ ] Batch-close sweep passes across all authored lessons (`--seeds=5 --png=none`)
