# 07: The unit spine

**What to build:** The twelve units stop being a count in a label and become a spine: a single strip that shows the shape of the grade, where the current unit sits, which units contain search matches, and which unit is enrichment. Clicking a segment jumps to that unit without changing the lesson.

**Blocked by:** 05 (Arabic-aware search), 06 (scannable catalogue)

**Status:** ready-for-agent

- [ ] Twelve segments render with Eastern numerals and replace the unit-count label
- [ ] The current unit is filled with the grade accent, units containing search matches get a dotted outline, and the enrichment unit carries an amber dot
- [ ] Each segment names its unit for assistive technology (`الوحدة {n} — {title}`) and marks the current one
- [ ] Hover and keyboard focus reveal a tooltip with the unit title and its lesson range
- [ ] Clicking a segment expands that unit and scrolls its header into view; it never selects a lesson and never changes the URL
- [ ] The expand-all control remains available as a text action beside the spine
- [ ] The spine fits twelve segments at the narrowest supported panel width without wrapping, with segments meeting the 24×24px target through padding
- [ ] The spine remains visible inside the mobile sheet
- [ ] Segment fill transitions over about 180ms and collapses to zero under reduced motion
- [ ] Server-render test: twelve segments, the enrichment marker present, the current unit marked, and no Western digits in labels
- [ ] End to end: clicking a distant unit expands it and scrolls it into view while the current lesson and URL stay unchanged
