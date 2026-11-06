# Arabic language rules live in the Glossary and the Constitution, not a separate style guide

An Arabic language evaluation of K-31 recommended establishing a standalone "Arabic White MSA Style Guide" covering approved vocabulary, instructional verbs, teacher versus child voice, and diacritics. We instead split that material across the two documents that already govern worksheets: approved vocabulary becomes `GLOSSARY.md` terms carrying their Arabic form and an `_Avoid_` list, and phrasing rules become clauses under `WORKSHEET_CONSTITUTION.md` §9. §9.1 moves from `[review]` to `[test]`, enforced by a guard that renders every authored lesson and fails on any `_Avoid_` form, so vocabulary drift is caught rather than reviewed. The evaluation's literal wording is followed except for Total, where `الكلّ` stays the child-facing term and the evaluation's `العدد الكلي` is permitted only in teacher-facing text.

## Considered Options

- **A standalone style guide document**: matches the evaluation's recommendation and reads well on its own, but creates a third place where a term can be defined, so the three drift apart and an author has to consult all of them.
- **Leave §9.1 as `[review]`**: cheaper, but `إشارات العدّ` had already reached 41 occurrences across six files and 101 prompts had come to open with their own Section name, all under review-only enforcement.

## Consequences

- A new manipulative or mathematical term must be added to `GLOSSARY.md` before it can appear in a prompt, which the guard enforces for `_Avoid_` forms.
- Renaming a term is a glossary edit plus a mechanical substitution, and the guard proves the rename is complete.
- The guard reads rendered Worksheet and Answer Key surfaces, so Teacher Notes stay free to use the teacher voice §9.4 allows.
