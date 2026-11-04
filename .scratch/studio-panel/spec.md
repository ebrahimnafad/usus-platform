Status: resolved

## Problem Statement

The curriculum panel is the door to the Teacher Studio's only artifact, and it is the least finished surface in the product. From a teacher's chair it feels like this:

- Every adjustment behaves like leaving the page. Tapping a difficulty, rolling a new seed, or picking a lesson sends me through a full-page loading skeleton; the panel comes back scrolled to the top, with my unit collapsed and my search gone. Tuning a worksheet should feel like turning a knob, not navigating away.
- It tells me "٨١٠ درساً" while I am working inside a single grade, so the number is simultaneously impressive and meaningless.
- Search doesn't hear Arabic. If I type تهيئه instead of تهيئة I get nothing; if I type KG4 instead of K.G.4 I get nothing; and a miss leaves a blank void with no explanation.
- The difficulty row is labelled "مستوى الصعوبة" but one of its four choices is not a level at all, so the control contradicts its own words.
- The seed reads like a build identifier ("رمز النموذج"), appears in the printed footer under the same name, and cannot be copied — the one string I would share with a colleague is the one string I cannot click.
- 135 lessons live in a small scrolling box with no sticky unit headers, no result count, and a current lesson that is a solid colour block shouting louder than the titles I am trying to scan.
- On my phone the worksheet is buried underneath the entire curriculum, so checking a sheet means scrolling past 135 buttons.
- If I use a keyboard or a screen reader, I cross that entire curriculum before reaching the worksheet, and no control shows a focus ring.

## Solution

Two changes, one structural and one experiential.

Structurally, the panel becomes persistent chrome: it lives with the studio's route layout, stays mounted across every tuning change, and owns its own browsing state. Only the A4 canvas is allowed to reload. Difficulty and seed adjustments update optimistically and replace the URL rather than pushing it; choosing a lesson still pushes, so the back button keeps meaning "previous lesson". While a tuned worksheet is generating, the previous sheet dims slightly and a thin accent bar reports progress along the seam — nothing else moves.

Experientially, the panel becomes a cockpit over a catalogue. It is warm paper against the cool canvas, with a hairline seam between them. At the top sits the current sheet's identity as a poster — unit line, lesson number in a grade-tinted tab, title, standards — plus a grade monogram that leads back to the Grade Hub. Below it: an honestly labelled difficulty control that explains its selection in one sentence, and the seed as a perforated ticket you can copy as a code or as a link. Then a twelve-segment spine that shows the shape of the grade, a search box that understands Arabic as it is actually typed, and a quiet catalogue with sticky unit headers and an active lesson that is always findable. On desktop the panel collapses to a rail so the paper can take the full stage; on mobile it becomes a sheet behind a "المنهج" button, with previous/next lesson arrows on a persistent bar, and it closes the moment a lesson is chosen.

## User Stories

1. As a teacher, I want the curriculum panel to stay exactly where it is while I adjust difficulty or roll a new seed, so that tuning feels like turning a knob rather than leaving the page.
2. As a teacher, I want the panel to keep its scroll position, open units, and search text across every lesson, difficulty, and seed change, so that I never lose my place mid-planning.
3. As a teacher, I want the sheet I am looking at to be the only thing that visibly reloads, so that my attention stays on the paper.
4. As a teacher, I want to see the current lesson as a poster — number, title, unit, and standards — so that I always know exactly what I am about to print.
5. As a teacher, I want the poster to carry my grade's colour, so that I can feel which grade I am in without reading.
6. As a teacher, I want to leave this grade in one click from the poster, so that switching grades doesn't require hunting for a back arrow.
7. As a teacher, I want to understand what "متدرج" means compared with "سهل", so that I choose the right worksheet for my class.
8. As a teacher, I want the difficulty control to describe the option I selected in one sentence, so that I don't have to remember the difference.
9. As a teacher, I want the seed shown as a ticket I can copy as a code, so that I can write it on the board or read it to a colleague.
10. As a teacher, I want to copy a link that reproduces the same sheet, so that sharing in a chat yields exactly what I am looking at.
11. As a teacher, I want a clear confirmation when I copy, so that I know it worked.
12. As a teacher, I want to roll a new seed repeatedly without filling my back history, so that the back button still means "previous lesson".
13. As a teacher, I want to see all twelve units as a spine, so that I can feel the shape of the grade and where I am inside it.
14. As a teacher, I want to jump to a unit from the spine, so that I don't have to scroll through a long list to reach it.
15. As a teacher, I want search to understand Arabic the way I actually type it, so that a missing hamza or a taa marbuta typed as haa still finds the lesson.
16. As a teacher, I want to search by standard code even when I type it without dots, so that KG4 finds K.G.4.
17. As a teacher, I want to search by unit title and see the whole unit, so that a topic search gives me context instead of one orphan row.
18. As a teacher, I want to see why a row matched, so that I trust the list.
19. As a teacher, I want a result count, so that I know whether the filter found three things or thirty.
20. As a teacher, I want a helpful empty state, so that a miss doesn't look like a broken application.
21. As a teacher, I want to reach search with the keyboard, so that I can filter without reaching for the mouse.
22. As a teacher, I want the current lesson visible whenever I open the studio, so that I start from my place instead of hunting for it.
23. As a teacher, I want each row to stay quiet — number, title, a small marker — so that I can scan 135 lessons quickly.
24. As a teacher, I want standard codes available when I need them but not shouting on every row, so that reference data doesn't compete with titles.
25. As a teacher, I want to collapse the panel to a rail so the paper gets the full width, so that I can read the sheet properly.
26. As a teacher, I want that collapsed state remembered after a reload, so that reading mode sticks.
27. As a teacher on a phone, I want the worksheet first and the curriculum behind a button, so that checking a sheet doesn't require scrolling past the whole curriculum.
28. As a teacher on a phone, I want previous and next lesson arrows, so that I can flip through a unit's sheets without opening a list.
29. As a teacher on a phone, I want the panel to close as soon as I pick a lesson, so that I land back on the paper.
30. As a keyboard or screen-reader user, I want to skip the curriculum and jump straight to the worksheet, so that I don't cross 135 buttons to reach the only thing I came for.
31. As a keyboard user, I want visible focus rings in my grade's colour, so that I can always see where I am.
32. As a screen-reader user, I want the curriculum announced as a navigation region with honest expanded states, so that I can understand its structure.
33. As a teacher with motion sensitivity, I want every transition removed when my system asks for reduced motion, so that the studio stays comfortable.
34. As a teacher, I want all numbers in Eastern Arabic digits, so that the interface matches the worksheets I print.
35. As a teacher, I want the printed footer and the panel to call the seed the same thing, so that the code on paper matches the code on screen.
36. As a teacher, I want the old grade-switching link to keep working, so that a bookmark I saved months ago doesn't break.

## Implementation Decisions

### Route and state ownership

- The studio route's layout owns the curriculum panel; the studio page owns the canvas. The layout supplies the current grade and the remembered rail state; the page supplies the generated worksheet bundle.
- The panel is a pure, props-driven component. A thin route-level adapter reads the URL's search params and supplies lesson, seed, difficulty, view mode, and query. Keeping the panel free of router hooks is deliberate: it preserves server rendering of the composite studio outside a router, which the legacy inline route and the server-render helper both depend on.
- The composite studio component survives and composes panel plus canvas. It remains the rendering path for the legacy grade-query route, for the scripted loading state, and for server-render tests.
- Choosing a lesson pushes history. Changing difficulty or seed replaces it, so repeated seed rolls leave one history entry.
- Tuning is optimistic: the control and its explainer render from pending values on the next frame, and pending state clears when the incoming params match the request.
- Same-route updates do not replay the studio's entrance fade. The delayed fade remains for the Grade Hub → studio arrival only.
- The route's loading fallback covers the canvas only. It must never render the panel, and the panel must never show a skeleton.
- The panel receives a single grade's catalog rather than all six, which also removes unreachable grades from the serialized payload.

### Panel anatomy

Regions, top to bottom:

1. Brand line: the studio name as a small `h1`, a palette glyph, and a grade monogram at the inline end.
2. Identity poster: unit line, grade-tinted lesson-number tab, lesson title as `h2`, standard chips.
3. Difficulty group: four exclusive options and a one-line explainer.
4. Seed ticket: label, copyable code, copy-link action, full-width regenerate row.
5. Unit spine: twelve segments.
6. Search field.
7. Units controls: expand-all toggle.
8. Catalogue: sticky unit headers and lesson rows inside a scroller.

```
┌──────────────────────────────┐
│ استوديو المعلم        [الروضة K] │
├──────────────────────────────┤
│ الوحدة ١ · المطابقة والتصنيف      │
│ ┌──┐ ١  مطابقة الأشياء           │
│ └──┘   K.G.4                    │
│ نمط الصعوبة                      │
│ [متدرج][سهل][متوسط][متقدم]        │
│ يبدأ سهلًا ويشتدّ عبر الأقسام الثلاثة │
│ رمز الورقة  ┌ ٤XK٢ ┐ ⧉ 🔗        │
│ [ توليد نموذج جديد ]             │
├──────────────────────────────┤
│ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ١٠ ١١ ١٢      │
├──────────────────────────────┤
│ ابحث بعنوان الدرس أو المعيار       │
│ ٧ دروس في وحدتين                 │
│ ▼ الوحدة ١: تهيئة…    (١–١١)     │
│   ١. مطابقة الأشياء          ●    │
└──────────────────────────────┘
```

### Material and design tokens

The panel is its own material: warm paper, not another white card. The repo gains its first theme-token block in the global stylesheet, scoped to the studio.

| Token           | Value                                                                   |
| --------------- | ----------------------------------------------------------------------- |
| Panel surface   | `#fbfaf7`                                                               |
| Seam / hairline | `#e7e2d8`                                                               |
| Dot-grid ink    | `#e9e4da`                                                               |
| Plate shadow    | `0 1px 2px rgb(28 25 23 / 0.06), 0 8px 24px -12px rgb(28 25 23 / 0.18)` |
| Plate radius    | `1.25rem`                                                               |

- Panel text and borders use warm `stone` neutrals; the canvas and the rest of the application keep cool `slate`. Mixing warm paper with cool text makes the surface look dirty.
- The catalogue zone alone carries a 16px dot grid, masked out at its top and bottom edges. The cockpit stays clean.
- A one-pixel seam replaces the current hard border, and the A4 canvas keeps its own cool background so it reads as the bright object on the desk.
- Icons are hand-built inline SVG in the existing model house style (1.5–2px strokes, rounded caps, current colour) and replace the current emoji. No icon dependency is added.

### Identity poster

- The `h1` keeps the exact studio string used by the current contracts, demoted to a 12px brand line beside a palette glyph. This is deliberate: the poster, not a caption, should be the loudest thing in the panel.
- The grade monogram (`K`, `١`–`٥`) links to the Grade Hub.
- The unit line reads `الوحدة {n} · {unit title}`.
- The lesson number sits in a grade-tinted index tab as a display numeral; the lesson title follows as `h2` and clamps to two lines.
- Standard chips render in mono at 10px, muted, always present in markup inside the standard-code marker used by the numeral tests.
- The hardcoded 810-lesson subtitle and its helper call are removed. Grade scope is conveyed by the monogram and the unit line.
- In the legacy grade-query mode, the six grade pills move into a compact "تغيير الصف" row below the poster. They no longer outrank the current selection. Route mode emits none.

### Difficulty

- The group is labelled `نمط الصعوبة`, keeps four mutually exclusive options, and keeps its per-option data attribute.
- A one-line explainer sits beneath, referenced by `aria-describedby`, with reserved height so selection never shifts layout:
  - Scaffolded → `يبدأ سهلًا ويشتدّ عبر الأقسام الثلاثة`
  - Easy → `كل التمارين بمستوى سهل`
  - Intermediate → `كل التمارين بمستوى متوسط`
  - Advanced → `كل التمارين بمستوى متقدم`
- The generated model is unchanged. The domain glossary now separates **Difficulty Mode** (Scaffolded versus a single level, mutually exclusive) from **Difficulty Level** (the three tiers).

### Seed ticket

- The visible label changes from `رمز النموذج` to `رمز الورقة` in both the panel and the printed footer. One term, both surfaces; the printed code and the on-screen code must be spoken the same way.
- The seed renders inside a dashed, perforated ticket with the code in mono and Eastern digits around the Latin characters.
- Tapping the code copies the raw seed. A link action copies the absolute URL that encodes seed, difficulty, and view mode, so the recipient lands on the identical sheet.
- Both actions confirm inline for 1.2 seconds inside a polite live region.
- Clipboard failure fails silently, leaves the code selectable, and never throws.
- Regeneration becomes a full-width row beneath the ticket rather than a competing button squeezed beside it.
- The ticket carries the tooltip "نفس الرمز = نفس الورقة" and keeps the existing seed-badge and regenerate hooks.

### Search

- A new search module normalises Arabic before comparison: strips tashkeel and tatweel; unifies alef forms to bare alef, alef maqsura to yaa, taa marbuta to haa, hamza on waw to waw, hamza on yaa to yaa; converts Eastern digits to Western; lowercases; collapses whitespace.
- A second normaliser handles standard codes: uppercase, strip dots and spaces, so `KG4` matches `K.G.4`.
- The curriculum filter matches, in order: lesson title in Arabic, lesson title in English, lesson identifier, lesson number (exact and prefix), standard codes, and unit title. A unit-title hit returns the complete unit so the teacher keeps context.
- Teacher Notes prose is not searched: its vocabulary would manufacture false positives in a surface that never displays the match.
- A result line reports `{n} دروس في {m} وحدات` with correct Arabic pluralisation (one, dual, 3–10, 11+) inside a polite live region. It is absent when the query is empty.
- The empty state echoes the query, offers a clear action, and hints at standard-code search.
- Matched title fragments are marked with a warm amber underline, never a filled background.
- `/` focuses search when focus is not already in a field; `Escape` clears the query and returns focus to the catalogue.
- Typing does not touch the URL. A hundred and thirty-five rows filter instantly; only a selection navigates.

### Catalogue

- The cockpit is fixed. The catalogue is a flex child with `min-height: 0` and its own scrolling, sized from the viewport height minus the sticky header, with a stable scrollbar gutter. The current fixed max-height percentage is removed.
- Unit headers stick to the top of the scroller and expose honest expanded state plus a rotating chevron.
- The active lesson scrolls into view on first paint and whenever the lesson changes — never on filter or unrelated re-render, so typing never yanks the list.
- Row information ladder: lesson number (tabular, muted, fixed width), two-line title, and a small co-presentation or enrichment mark. Rows are 44–48px.
- Standard chips remain in the markup at all times but are visually hidden on inactive rows and revealed on active, hover, and focus. They are never removed from the server-rendered output.
- Enrichment unit headers keep the visible "إثرائي *" string.
- The active row reads as a 2px accent bar on the inline-start edge, a tinted background, and an accent numeral — not a solid saturated block. It keeps its current-page semantics.
- The catalogue is a labelled navigation region.

### Unit spine

- Twelve segments with Eastern numerals replace the unit-count label.
- Current unit: grade-accent fill. Units containing search matches: dotted outline. Enrichment unit: amber dot.
- Each segment names its unit for assistive technology and marks the current one.
- Hover and focus reveal a tooltip with the unit title and lesson range.
- Clicking expands the unit and scrolls its header into view. It never selects a lesson and never changes the URL.
- The spine stays visible in the mobile sheet and fits twelve segments at the narrowest supported width.

### Collapse rail

- A 72px rail, toggled from the panel, remembered in a `studio_rail` cookie read during server rendering so the first paint already has the correct width. No snap on load.
- Rail contents: expand action, grade monogram linking to the hub, current lesson numeral in the grade accent, and the seed stub.
- The canvas reflows into the freed width without clipping the paper or introducing horizontal scroll.
- Collapsing moves focus to the expand action; the toggle exposes expanded state and controls the panel body.

### Mobile

- Below the large breakpoint the panel no longer sits in flow above the canvas. The paper is the default view.
- A persistent bottom bar carries previous/next lesson arrows, the current lesson numeral, and a "المنهج" action. It respects the safe-area inset.
- Arrows step linearly 1–135 across unit boundaries, disable at the ends, and name their target lesson for assistive technology.
- The panel becomes a modal sheet: 88 dynamic viewport height, a 40% peek snap point, a drag handle, focus trapped, background not focusable, and focus returned to the trigger on close.
- The sheet closes on backdrop tap, `Escape`, browser back, and lesson selection.

### Motion

- Accordion height 180ms ease-out; rail width 220ms; spine fill 180ms; copy confirmation 120ms; hover tints 120ms.
- A grade change crossfades tinted surfaces only — spine fill, ticket border, poster tab — over 300ms. Text and chip fills snap.
- No entrance stagger on filter results, no animation on the active row, and no shared-layout active marker. A marker that slides between accordions reports the framework's reconciliation on every keystroke, not the teacher's action.
- Every duration collapses to zero under reduced motion, including the accent crossfade and the rail width.
- Motion is limited to transform, opacity, and measured height. No ambient or looping animation in the panel.

### Canvas in-flight state

- While a tuned worksheet generates, the canvas keeps the previous sheet at 55% opacity and shows a 2px indeterminate accent bar along the panel seam, appearing only after 150ms so fast responses do not flicker.
- The canvas toolbar stays mounted and derives only from params, so it renders identically before and after. Nothing in the frame moves except the paper.

### Accessibility

- A skip link is the studio's first focusable element and targets the worksheet region.
- Every control gains a visible focus ring, tinted with the grade accent via a new entry in the grade accent configuration.
- Heading order: the studio brand line is the only `h1`; the current lesson title is `h2`. Unit toggles are buttons, not headings.
- Minimum interactive target of 24×24px across the panel, including spine segments and chevrons.

### Compatibility and terminology

- The legacy grade-query route, the scripted loading state, and the server-render helper keep their current public behaviour and markup hooks.
- The panel must never be required for the canvas to render, and the canvas must never be required for the panel to render.
- Glossary terms **Teacher Studio** and **Difficulty Mode** were added, and **Difficulty Level** was tightened to the three tiers. The seed's visible name is `رمز الورقة`; the domain term remains **Seed**.

## Testing Decisions

A good test here asserts what a teacher can observe: rendered content, URLs after an interaction, visible state, copied payloads, and whether something survived a reload. It does not assert class names, component structure, internal helper calls, or markup snapshots. Where a contract already exists for print/PDF or no-JavaScript first paint, that contract is asserted in server-rendered markup rather than in a browser.

**Seam one — server rendering (Vitest, node, static markup).** The highest seam that still runs without a browser, and the existing home of the studio's content contracts. It covers:

- The poster: unit line, lesson number, title, and standards for the current lesson.
- The removal of the 810 subtitle and the presence of the exact studio heading.
- All twelve unit wrappers, with `data-unit-number` remaining a Western integer.
- Standard-code text present in markup even when visually collapsed on inactive rows; enrichment and co-presentation labels present.
- No grade pills on the route variant; grade pills and their labels still present in legacy mode.
- Search outcomes driven through `?q=`: a near-miss Arabic spelling, an undotted code, an Eastern-number query, and a unit-title query that returns a whole unit. This deliberately exercises the normaliser end to end.
- The numeral invariant across every rendered variant.

Prior art: the existing studio-route, studio-and-PDF, and primary-seam server-render tests.

**Seam two — end to end (Playwright, Edge, existing script).** The highest seam overall, and the only place where persistence, cookies, clipboard, and responsive behaviour are real. It covers:

- Tuning difficulty does not remount the panel: scroll offset, open unit, and query survive; the in-flight state appears on the canvas only.
- Ten seed rolls leave one history entry, and back returns to the previous lesson.
- Collapsing the rail, reloading, and seeing the collapsed width on first paint.
- Copy code and copy link produce the expected payloads (clipboard stubbed at page start for determinism) and show the confirmation.
- Spine click expands and scrolls without changing the lesson.
- At a mobile viewport: the sheet opens, a lesson selection closes it, and the chevrons move exactly one lesson.
- With reduced motion, the rail and accordion apply instantly.

Prior art: the existing hub-to-studio walkthrough in the end-to-end runner.

**Deliberately not a seam.** No direct unit tests for the Arabic normaliser. Every case that matters is expressible through `?q=` at seam one, and pinning the normaliser directly would freeze an implementation detail we should stay free to replace. If a normalisation bug appears, the failing `?q=` case names the symptom precisely.

**Contracts that survive unchanged.** The unit-number integers, the exact studio heading and its absence during the scripted loading state, standard-code markers, co-presentation and enrichment strings, legacy grade pills, the unit-header text shape, and the studio content and skeleton hooks.

**Contracts deliberately re-cut.** The printed footer label becomes `رمز الورقة` and its test is updated. Any assertion on `مستوى الصعوبة` becomes `نمط الصعوبة`. The 810 subtitle is asserted nowhere.

**Numeral lint** must pass with no new Western digits in visible Arabic strings.

## Out of Scope

- Generating worksheets in the browser. Kept as a future option; the route restructuring makes it cheaper but it is not part of this work.
- Recently viewed lessons in the cockpit, considered and deferred because it competes with the poster.
- Progress or completion tracking of any kind.
- Changes to worksheet content, print styles, or the PDF pipeline beyond the footer label.
- Searching Teacher Notes prose.
- The Reading domain.
- Replacing the hand-rolled end-to-end runner with a test framework. If the runner becomes unwieldy, that is a separate ticket.

## Further Notes

- The persistent-panel decision and its rejected alternatives are recorded in ADR-0010.
- The glossary gained **Teacher Studio** and **Difficulty Mode**, and **Difficulty Level** was tightened to three tiers.
- Risks worth naming: reading search params inside a layout requires a suspense boundary; cookie reading is asynchronous; clipboard access needs a secure context and must degrade silently; the legacy grade-query route must keep working untouched.
- The work is split into nine tracer-bullet slices in the issues directory: a prefactor (01), then the persistent-panel bet (02). After that the cockpit (03), search (05), catalogue (06), and reading mode (08) are independent, with the unit spine (07) and the mobile sheet (09) completing the chain.
