# 08: Reading mode

**What to build:** The teacher can collapse the curriculum panel to a narrow rail so the A4 sheet takes the full stage, and that choice survives a reload with the correct width on the very first paint.

**Blocked by:** 03 (cockpit)

**Status:** closed

- [x] A 72px rail replaces the panel when collapsed, and expanding restores the full panel
- [x] The collapsed state is stored in a cookie read during server rendering, so the first painted frame already has the correct width and there is no snap
- [x] The rail shows an expand action, the grade monogram linking to the Grade Hub, the current lesson numeral in the grade accent, and the seed stub
- [x] The canvas reflows into the freed width without clipping the paper or introducing horizontal scrolling
- [x] The toggle exposes expanded state and controls the panel body, and collapsing moves focus to the expand action rather than leaving it on a hidden node
- [x] Width transition is about 220ms and collapses to zero under reduced motion
- [x] End to end: collapse, reload, and confirm the rail is collapsed on first paint with no intermediate expanded frame
