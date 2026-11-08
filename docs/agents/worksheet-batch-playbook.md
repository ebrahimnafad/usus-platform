# Worksheet Batch Playbook

How to start a new batch of math Worksheets (usually one Unit). Every rule a batch must obey is in [`WORKSHEET_CONSTITUTION.md`](../../WORKSHEET_CONSTITUTION.md); this file is only the sequence of steps.

1. **Read the unit.** Read every lesson of the unit in `Grade <N>/<curriculum>.md`: Standards, Prerequisites, Description, Notes, and question types. Done when you can list every distinct question type in the unit.

2. **Inventory what exists.** List the registered Exercise Archetypes (`src/archetypes/`), Visual Models (`src/visual-models/`), and the glossary terms. Done when each question type from step 1 is paired with the closest existing archetype and Visual Model, or marked as having none.

3. **Climb the reuse ladder.** For each question type, take the lowest step of constitution §11.2 that works: use as-is, add a parameter or mode, extend, or build new. Done when every question type has one step recorded with a one-line reason.

4. **Find the gaps.** Collect everything this batch needs that the constitution and glossary do not settle: new terms, new Visual Models (with their canonical size, states, RTL behavior, grayscale cue, and unknown positions), new archetypes, the batch's number ranges per Difficulty Level, and the question-type mapping if the curriculum lacks one. Done when the list is complete; anything not on it is already decided.

5. **Grill only the gaps.** Run `/grill-with-docs` on the list from step 4, with a recommended answer for each item. Update `GLOSSARY.md` as terms settle. A gap that would change a constitution rule goes through constitution §1.3. Done when the user confirms shared understanding.

6. **Write the spec.** Create `.scratch/<batch-slug>/spec.md` containing only what is new: the problem, the user stories per lesson, the new terms, Visual Models, and archetypes, the reuse-ladder table from step 3, and the batch's ranges. Refer to the constitution for everything else.

7. **Write the tickets.** Create `.scratch/<batch-slug>/issues/NN-<slug>.md`, one per vertical slice (new models and archetypes together with the first lessons that use them). Per ticket, run the layout guard only on the lessons that ticket delivers (`--lessons=<ticket-range>`); run the full all-lessons layout guard once on the final ticket when closing the batch (§12).

8. **Commit discipline.** `.husky/pre-commit` runs `lint-staged`, `tsc --noEmit`, numeral/console linters, and `npm run test:fast` (~45 s). Do not run a separate `npm test` right before `git commit` (since the pre-commit hook already runs the suite). Always run `git commit` with a foreground timeout of at least `300000 ms` (`5 min`), and never edit tracked files while a commit command is still running (`lint-staged` stashes and restores the working tree, which will overwrite concurrent edits).
