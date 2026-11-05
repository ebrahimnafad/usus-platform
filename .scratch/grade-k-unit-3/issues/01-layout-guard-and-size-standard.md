# 01: Layout guard, size standard, and full-scale printing

**What to build:** A measurable layout standard and an automated guard that enforces it on every authored lesson in real print conditions, plus removal of the PDF exporter's shrink-to-fit so that every standardized size is also its printed size (`ADR-0013`). This ticket is expected to leave the guard red on some of K-1 to K-26; ticket 02 turns it green, and both merge together.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] The sizes of `WORKSHEET_CONSTITUTION.md` §3 and the type scale of §4 are exported from one module, and a unit test hard-codes the same values so the code and the constitution cannot drift
- [ ] The worksheet exercise card exposes its usable width as exactly 660 px at A4 print size, and offers the three column layouts for archetypes to choose from
- [ ] The PDF exporter always renders at scale 1.0; the 0.75 / 0.65 scale budget is removed; a worksheet longer than 2 pages is reported as an error instead of being shrunk
- [ ] A Playwright guard (`channel: 'msedge'`) renders the print route with print styles applied at A4 size for every authored lesson × 5 fixed seeds × 4 Difficulty Modes × worksheet and Answer Key
- [ ] With 0 px tolerance, the guard fails when an element's box extends past its exercise card or Section, when text has `scrollWidth > clientWidth` or `scrollHeight > clientHeight`, when sibling elements overlap, when an exercise is split across a page break, when the PDF has more than 2 pages, when a canonical size (§3.4) or type size (§4.1) renders at any other size, when any student-facing text is smaller than 12 px, or when a prompt exceeds 2 lines
- [ ] Each failure names the lesson, seed, Difficulty Mode, view, page, exercise number, and offending element, so it can be fixed without rerunning in a debugger
- [ ] Every run saves a PNG of each page to a git-ignored folder; no pixel-diff baselines are stored
- [ ] The guard runs from one npm script and reports a per-lesson pass/fail table
