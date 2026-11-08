# 01: Shift 1 to 10, JoinParts Ten-Frame Support, and Lessons K-74, K-78 to K-80

**What to build:**

1. Extend `ShiftOneDecompose` for `totalRange: [6, 10]` to support all-combinations (Shift 1 and turnaround pairs), complete-pattern, and GIVE AWAY pencil graphs for K-74.
2. Extend `JoinParts` (and `TakeAway`) in `src/lib/part-whole-facts.ts` with `"ten-frame"` and `"ten-frame-and-digit"` representations.
3. Extend `ConnectMatch` with `"ten-frame-to-bond"` and `"ten-frame-to-equation"` matching modes.
4. Author blueprints, Arabic titles, and Teacher Notes for K-74, K-78, K-79, and K-80.

**Blocked by:** None

**Status:** resolved

- [x] `ShiftOneDecompose` handles totals 6–10 for `all-combinations` (including turnaround pairs), `complete-pattern`, and `give-away`
- [x] `JoinPartsRepresentation` and `TakeAwayRepresentation` include `"ten-frame"` and `"ten-frame-and-digit"`
- [x] `ConnectMatch` supports `matchKind: "ten-frame-to-bond"` and `"ten-frame-to-equation"`
- [x] Localized Arabic titles, Teacher Notes, and blueprints registered for K-74, K-78, K-79, and K-80
- [x] Layout guard passes for `--lessons=K-74,K-78,K-79,K-80 --seeds=2`
