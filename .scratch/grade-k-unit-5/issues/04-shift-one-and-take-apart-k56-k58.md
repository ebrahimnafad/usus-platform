# 04: Shift 1 Strategy and Take-Apart Word Problems (Lessons K-56 to K-58)

**What to build:** The `ShiftOneDecompose` (فكّك بإزاحة ١) archetype (`all-combinations`, `complete-pattern`, and `give-away` modes) for K-56, `situation: "take-apart"` (model-fixed and open-ended `answers will vary` modes) in `SolveWordProblem` and `ConnectMatch` (MATCHING G and H) for K-57 and K-58, and complete localized blueprints, Answer Keys, and Teacher Notes for K-56 to K-58.

**Blocked by:** 01: SolveWordProblem, ConnectMatch Word Problems, and Add-To Lessons (Lessons K-49 and K-50)

**Status:** open

- [ ] `ShiftOneDecompose` is registered in `src/domain/types.ts`, `src/archetypes/registry.ts`, and `src/registry/bootstrap.ts` with three modes:
  - `all-combinations` (K-56 Workbook): for a target Total $N$, renders all $N + 1$ Number Bonds in a 3-column RTL grid (`212 px` columns) in strict `(N, 0) ← (N − 1, 1) ← ... ← (0, N)` order with `إزاحة ١` step indicators; Easy ($N \in \{2, 3\}$) pairs each step with a two-part five frame and traces `(N, 0)`, while Intermediate ($N \in \{3, 4\}$) and Advanced ($N \in \{4, 5\}$) write the missing Parts (including `0` per constitution §6.3's K-56 exception)
  - `complete-pattern` (K-56 Problem of the Day): shows the first two Number Bonds `(N, 0)` and `(N − 1, 1)` as given pattern anchors, and the student completes the remaining bonds by shifting 1
  - `give-away` (K-56 Brain Builder `GIVE AWAY`): renders two parallel apple-subtraction rows starting from the same Total $N$ and giving away $k$ vs. $k + 1$ apples (`student` Cross Off mode + `كم بقي؟` Answer Slot), plus a comparison question on how many are left
- [ ] `SolveWordProblem` supports `situation: "take-apart"` for `problemStyle: "learning"` (K-57, Co-presented) and `problemStyle: "story"` (K-58):
  - Model-fixed mode (Workbook Type 1, and Problems of the Day `cloze-from-model` "Use the model to fill in each sentence and write an equation"): the concrete model (two-color snap cubes or two shape/object groups) fixes `part1` and `part2`, and the student fills in the Number Bond, the two Part Answer Slots, and/or the Equation (`total = part1 + part2` or `part1 + part2 = total`)
  - Open-ended mode (Workbook Type 2: only the Total $N$ is given in text, so "answers will vary"): both Part Answer Slots are `unknown` (`؟`) on the Worksheet; on the Answer Key, the slots show the Seed's canonical non-zero decomposition `(part1, part2)` while the solved badge and Strategy Hint list all valid non-zero pairs (`تتنوّع الإجابات، مثل: ٣ و١ أو ٢ و٢ أو ١ و٣`)
- [ ] `ConnectMatch` (`model-to-word-problem` with `situation: "take-apart"`) covers MATCHING G (K-57) and MATCHING H (K-58): each row uses a distinct Total (`٣`, `٤`, `٥`) so matching each Number Bond (Total shown at top, both Part circles `unknown`) to its Take-Apart word problem is 1-to-1 and unambiguous, and the Answer Key notes that part answers vary
- [ ] Prerequisite Warm-Ups resolve K-56 → K-47, K-57 → K-56, and K-58 → K-57
- [ ] Arabic titles, Teacher Notes, classroom activities, misconceptions, prompts, and Strategy Hints for K-56 to K-58 are drafted and reviewed by the user
- [ ] Domain tests across many Seeds: `ShiftOneDecompose` generates all $N + 1$ bonds in exact `(N − i, i)` order; `give-away` rows satisfy `N − k` and `N − (k + 1)`; every `take-apart` item satisfies `part1 + part2 = total` and open-ended items list all valid pairs in their Strategy Hint; MATCHING G and H rows have distinct Totals
- [ ] Constitution §12 holds for K-56 to K-58 (guard green for every authored lesson K-1 to K-58)
