# 03: Cockpit — warm paper, identity poster, honest difficulty

**What to build:** The panel stops being another white form and becomes the cockpit of the studio: warm paper against the cool canvas with a hairline seam, the current lesson rendered as a poster, a grade monogram that leads back to the Grade Hub, and a difficulty control that names itself honestly and explains its selection. The hardcoded 810-lesson subtitle disappears, and legacy grade pills are demoted beneath the poster.

**Blocked by:** 02 (persistent panel with optimistic tuning)

**Status:** ready-for-agent

- [ ] The studio gains a five-token theme layer: panel surface `#fbfaf7`, seam `#e7e2d8`, dot-grid ink `#e9e4da`, a plate shadow, and a 1.25rem plate radius
- [ ] Panel text and borders use warm neutrals while the canvas and the rest of the application keep cool neutrals; body text meets at least 4.5:1 contrast on the panel surface
- [ ] A one-pixel seam replaces the hard border; the panel reads as paper, the canvas as the bright object on the desk
- [ ] A 16px dot grid appears only in the catalogue zone and fades out at its top and bottom edges; the cockpit stays clean
- [ ] The brand line keeps the exact studio heading at 12px with a palette icon; the grade monogram sits at the inline end and links to the Grade Hub
- [ ] The poster renders, in order: unit line (`الوحدة {n} · {title}`), grade-tinted lesson-number tab, lesson title as the page's `h2` clamped to two lines, and the lesson's standard chips inside the existing standard-code marker
- [ ] The hardcoded 810-lesson subtitle and its helper call are removed
- [ ] The difficulty group is labelled `نمط الصعوبة`, keeps four mutually exclusive options and their per-option hook, and is described by a one-line explainer with reserved height: `يبدأ سهلًا ويشتدّ عبر الأقسام الثلاثة`, `كل التمارين بمستوى سهل`, `كل التمارين بمستوى متوسط`, `كل التمارين بمستوى متقدم`
- [ ] The generated worksheet model is unchanged; only labels and explanations move
- [ ] In legacy grade-query mode the six pills move into a compact `تغيير الصف` row below the poster; route mode emits none
- [ ] Emoji in the panel are replaced by hand-built inline SVG icons in the existing model house style; no icon dependency is added
- [ ] A grade change crossfades only the tinted surfaces over about 300ms while text snaps, and the crossfade collapses to zero under reduced motion
- [ ] The numeral lint passes with no new Western digits in visible Arabic strings
