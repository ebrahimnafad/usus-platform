# 06: A catalogue you can scan

**What to build:** The browsing half becomes readable. The list fills the available height instead of guessing a percentage, unit headers stick while their lessons scroll, rows shrink to a scannable ladder, the active lesson stays findable, standards stop shouting, and the whole region is operable by keyboard with grade-tinted focus.

**Blocked by:** 02 (persistent panel with optimistic tuning)

**Status:** ready-for-agent

- [ ] The cockpit stays fixed; the catalogue is the only scrolling region, sized from the viewport height minus the sticky header, with a stable scrollbar gutter and no fixed percentage cap
- [ ] Unit headers stick to the top of the scrolling region and expose honest expanded state plus a chevron that rotates on open
- [ ] The active lesson scrolls into view on first paint and whenever the lesson changes, and never on filter or unrelated re-render
- [ ] Rows are 44–48px and show lesson number in tabular muted digits, a two-line clamped title, and a small co-presentation or enrichment mark
- [ ] Standard chips are always present in server-rendered markup inside the existing standard-code marker, visually hidden on inactive rows, and revealed on active, hover, and focus
- [ ] Enrichment unit headers keep the visible `إثرائي *` string
- [ ] The active row reads as a 2px accent bar on the inline-start edge, a tinted background, and an accent numeral instead of a saturated block, and keeps its current-page semantics
- [ ] The catalogue is a labelled navigation region
- [ ] Every control in the panel shows a visible focus ring tinted with the grade accent, and interactive targets are at least 24×24px
- [ ] Chevron rotation and hover tints use short durations and collapse to zero under reduced motion
- [ ] Server-render contracts hold: twelve unit wrappers with Western numeric identifiers, standard-code text still present while visually quiet, and no Western digits in visible Arabic text
