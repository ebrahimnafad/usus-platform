# 01: TakeAway, Cross Off, and the subtraction Equation Strip (Lessons K-40 and K-41)

**What to build:** The shared part-whole fact module, the `−` operator in the Equation Strip, the `shown` and `student` Cross Off modes on every quantity model, the `TakeAway` (اطرح) archetype, and complete localized blueprints, Answer Keys, and Teacher Notes for K-40 and K-41.

**Blocked by:** None

**Status:** open

- [x] `selectAdditionFacts` is extracted into a shared part-whole fact module that serves both operations; `٥ − ٢` and `٥ − ٣` are different facts; K-27 to K-38 Worksheets are unchanged for the same Seeds
- [x] Equation Strip renders `−` (U+2212) with the Total rightmost (`٥ − ٢ = ٣`); any term can be an Answer Slot; the reversed form (`٣ = ٥ − ٢`) is supported for later tickets; default labels no longer say جمع for subtraction
- [x] Five frame Cross Off gains a `student` mode: Worksheet clean, Answer Key draws the X in the accent style; the existing pre-drawn behavior becomes `shown`
- [x] Snap cubes and tally marks support Cross Off (`shown` and `student`), removing from the left end; tally marks with a crossed-off Part draw no `+`
- [x] Die Cross Off leaves the Missing Part's die pattern where possible, otherwise a fixed pip order; domino Cross Off crosses one whole half
- [x] `TakeAway` supports representations (five frame, five frame with a digit, snap cubes, tally marks, die, domino), response forms (Number Bond, Equation, `كم بقي؟` Answer Slot), and actions (trace, write, cross off then write; draw the Total then cross off at Advanced only)
- [x] The Missing Part is the unknown; the Part taken away may be unknown only at Advanced or in Challenge & Assessment
- [x] Number Bonds put the Part taken away in the right circle and the Missing Part on the left; swapped only at Advanced
- [x] Difficulty follows the spec ranges: Easy (Total 2–4, Parts ≥ 1, traced), Intermediate (Total ≤ 5, Parts ≥ 1, written), Advanced (taking away 0 or all allowed, model partly withdrawn)
- [x] `ConnectMatch` gains `operation: add | subtract`, covering MATCHING A (five frame → Number Bond) and MATCHING B (dice → Number Bond) with a "write the Missing Part" slot
- [x] Practice uses each lesson's Workbook question types; Challenge & Assessment uses one Brain Builder and one Problem of the Day ("Cross off the part you know", "Take away the part you know")
- [ ] Arabic titles, Teacher Notes, classroom activities, misconceptions, prompts (opening with `اشطب`, `اطرح`, or another §9.4 imperative), and Strategy Hints for K-40 and K-41 are drafted and reviewed by the user
- [x] Domain tests: across many Seeds every item satisfies Total − Part = Missing Part, crossed-off counts equal the Part taken away, die cross-offs leave a valid pattern where one exists
- [ ] Constitution §12 holds for K-40 and K-41 (guard green for K-1 to K-41)
