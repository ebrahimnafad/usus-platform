# 05: Arabic-aware search

**What to build:** Search starts hearing Arabic the way teachers type it. A near-miss spelling still finds the lesson, an undotted standard code still finds its standard, Eastern and Western numerals are interchangeable, and a unit-title query returns the whole unit for context. Results gain a count, a real empty state, match highlighting, and keyboard reach.

**Blocked by:** 02 (persistent panel with optimistic tuning)

**Status:** ready-for-agent

- [ ] Arabic normalisation strips tashkeel and tatweel, unifies alef forms, alef maqsura to yaa, taa marbuta to haa, hamza carriers to their base letter, converts Eastern digits to Western, lowercases, and collapses whitespace
- [ ] Standard-code normalisation uppercases and strips dots and spaces, so `KG4` matches `K.G.4`
- [ ] The catalogue filter matches lesson title in Arabic, title in English, lesson identifier, lesson number (exact and prefix), standard codes, and unit title
- [ ] A unit-title hit returns the complete unit rather than a single row
- [ ] Teacher Notes prose is not searched
- [ ] A result line reports `{n} دروس في {m} وحدات` with correct Arabic pluralisation (one, dual, three to ten, eleven-plus) in a polite live region, and is absent when the query is empty
- [ ] The empty state echoes the query, offers a clear action, and hints at standard-code search
- [ ] Matched title fragments are marked with a warm amber underline, never a filled background
- [ ] `/` focuses search when focus is not already in a field; `Escape` clears the query and returns focus to the catalogue
- [ ] Typing does not touch the URL; the whole grade filters instantly
- [ ] Server-render cases prove the behaviour end to end through the query parameter: a near-miss spelling, an undotted code, an Eastern numeral, and a unit-title hit; a junk query renders the empty state
- [ ] No unit test is added for the normaliser itself — it is an implementation detail that the query-parameter cases already cover
