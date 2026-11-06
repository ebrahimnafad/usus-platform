# 06: Arabic White MSA language pass (Lessons K-1 to K-38)

**What to build:** A single vocabulary and phrasing pass across every authored lesson, acting on the Arabic Language and Content Evaluation Report (K-31, 7.5/10, "targeted refinement rather than extensive rewriting"). The report's recommendations land in `GLOSSARY.md` and `WORKSHEET_CONSTITUTION.md` §9 rather than a standalone style guide, so the rules are enforced where the rest of the worksheet rules already live (ADR-0014).

**Guiding principle:** Every instruction must be linguistically correct, sound natural read aloud by an Egyptian teacher, and be understandable to a five-year-old without translation into colloquial Arabic.

**Status:** ready-for-human

- [x] `GLOSSARY.md` gains **Tally Marks** (`علامات العدّ`), **Dice Pattern** (`نقاط النرد`), **Missing Part** (`الجزء الناقص`), and **Snap Cubes** (`المكعبات المتداخلة`), each listing the superseded form under `_Avoid_`
- [x] **Total** keeps `الكلّ` as its child-facing term; `العدد الكلي` is permitted only in teacher-facing text
- [x] Constitution §9.4 separates teacher-facing from child-facing language and limits a prompt to at most two steps joined by `ثم` using an approved imperative (`عدّ`، `انظر`، `صِلْ`، `لوّن`، `اختر`، `اكتب`)
- [x] Constitution §9.6 limits diacritics to disambiguation and read-aloud; §9.1 upgraded from `[review]` to `[test]`
- [x] A test renders every authored lesson and fails on any `_Avoid_` form or topic-label prompt opener
- [x] `إشارات العدّ` (41), `أنماط النرد` (9), and `الجزء المفقود` (38) replaced across K-12 to K-38, including the K-14 and K-15 lesson titles
- [x] The five K-27 to K-31 prompts reading `الكلّ الناتج من ضمّ الجزأين` rewritten in child voice
- [x] Constitution §9.5 keeps Section names, **Brain Builder**, and **Problem of the Day** structural, not printed: 178 prompts no longer open with a topic label
- [x] The six K-31 revisions named in the report are applied, with `الكلّ` substituted for the report's `العدد الكلي`
- [x] Snap Cubes render flush, with the connector visible only at a free end of each run
- [x] Layout guard green for K-1 to K-38 after the rewrites (0/1480 renders violate the constitution)
- [ ] Arabic text for K-1 to K-38 is reviewed by the user, superseding the open sign-off in ticket 04
