# 09: Phone — paper first

**What to build:** On a phone the worksheet comes first. The curriculum no longer stacks above the paper; it lives in a modal sheet behind a `المنهج` action, with previous/next lesson arrows on a persistent bottom bar, and the sheet closes the moment a lesson is chosen.

**Blocked by:** 07 (unit spine)

**Status:** ready-for-agent

- [ ] Below the large breakpoint the panel no longer renders in flow above the canvas; the paper is the default view
- [ ] A persistent bottom bar carries previous and next lesson arrows, the current lesson numeral, and a `المنهج` action, and respects the safe-area inset
- [ ] Arrows step linearly from lesson one to one hundred thirty-five across unit boundaries, disable at the ends with visible disabled styling, and name their target lesson for assistive technology
- [ ] The panel opens as a modal sheet: 88 dynamic viewport height, a 40% peek snap stop, a drag handle, a modal dialog announcement, trapped focus, and non-focusable background
- [ ] The sheet closes on backdrop tap, `Escape`, browser back, and lesson selection, returning focus to the `المنهج` action
- [ ] Cockpit, difficulty, seed ticket, spine, search, and catalogue are all usable inside the sheet
- [ ] Selecting a lesson navigates and closes the sheet so the teacher lands on the updated paper
- [ ] Sheet, peek, and drag transitions collapse to zero under reduced motion
- [ ] End to end at a mobile viewport: the sheet opens, a lesson selection closes it, the paper shows the new lesson, arrows move exactly one lesson, and no page scrolling is needed to reach the paper
