# Reading Domain — Mobile-Friendly Layout

Status: done

## Problem Statement

The Reading Story Cycle Runner, its 6-Station stepper, and the Reading Level Grid are built for desktop-width screens. On a mobile phone held in portrait (≈375px), the header crams five interactive elements into one row (logo, breadcrumbs, Teacher Shield, Print, back-link), the stepper forces a 620px horizontal scroll (`min-w-[620px]`), and the bottom station-navigation buttons are undersized for thumb use. A teacher circulating the classroom with a phone, or a student using a tablet, finds the UI cramped and hard to operate one-handed.

## Solution

Reorganise the below-`sm` (< 640px) layout around three changes: (1) a **fixed bottom action bar** in the thumb zone that merges station navigation with the Teacher Shield and Print actions, (2) a **compact icon-only stepper** that fits six 40px emoji circles on any screen ≥ 320px, and (3) **trimmed breadcrumbs** showing only the last two segments. All changes are scoped to the `sm:` breakpoint — the desktop layout remains pixel-identical. See ADR-0018 for the full decision rationale.

## User Stories

1. As a teacher holding a phone in portrait, I want the Prev/Next station buttons and Print/Shield actions in a fixed bottom bar, so that I can reach them with my thumb without stretching to the top of the screen.
2. As a teacher on a phone, I want all interactive buttons to be at least 44px tall, so that I can tap them reliably without mis-taps.
3. As a teacher on a phone, I want to see all six stations at a glance without horizontal scrolling, so that I know where I am in the Story Cycle without swiping.
4. As a teacher on a phone, I want the stepper to show recognisable emoji icons (📖 ⚡ 🔍 🧩 ✍️ 🏁) instead of text labels, so that each Station is identifiable at a compact size.
5. As a teacher on a phone, I want completed Stations to show a green fill behind their icon, so that I can see my progress at a glance.
6. As a teacher on a phone, I want the header to show only the level name and story title in the breadcrumb, so that the top bar stays compact and readable.
7. As a teacher on a phone viewing a Transfer Test story, I want the banner to show only the "🎯 اختبار النقل" badge without the long description, so that it doesn't push the content down.
8. As a teacher on a phone in the Reading Nook, I want Teacher Shield and Print to appear as small icon-only buttons in the top header, so that the chrome-free reading surface is maximised without a bottom bar.
9. As a teacher on a desktop or laptop (≥ 640px), I want the layout to look exactly the same as it does today, so that nothing I'm used to changes.
10. As a teacher on an iPhone with a home indicator, I want the fixed bottom bar to clear the safe area, so that the bottom buttons aren't obscured by the gesture bar.
11. As a teacher on a phone, I want the in-flow bottom navigation (Prev/Next inside `<main>`) to be hidden, so that it doesn't duplicate the fixed bottom bar.
12. As a teacher on a tablet in portrait (≈768px), I want the full desktop layout since the screen is wide enough, so that I get the richer label-based stepper and inline header actions.
13. As a teacher on a phone, I want to see the station indicator text ("المحطة ٣ من ٦") in the bottom bar between Prev and Next, so that I always know my position without looking at the stepper.

## Implementation Decisions

### Components modified

- **StoryCycleRunnerClient**: The main component that renders the header, stepper, station content, and bottom navigation for standard and Transfer Test stories. All four mobile-layout changes (header trimming, compact stepper, fixed bottom bar, Transfer Test banner collapse) happen here.
- **FreeReadingNook**: The variant component for free-reading stories. Gets icon-only Shield + Print buttons on mobile in the top header; no bottom bar.
- **Breadcrumbs**: The shared breadcrumb component. Early segments need to be hideable via responsive classes. This can be done at the call site (wrapping segments in `hidden sm:inline` spans) or by adding a prop — call-site approach is simpler and avoids changing the shared interface.

### No components modified

- **ReadingLevelGridPage**: The Level Grid page and its header are left untouched per the design decisions. Cards are already single-column on mobile with adequate padding.
- All station content components (StationFirstRead, StationGuidedRead, etc.) are unaffected — they render inside `<main>` and are already responsive.

### Layout structure (StoryCycleRunnerClient)

The below-`sm` layout introduces two new DOM regions and modifies two existing ones:

1. **Header (modified)**: On mobile, the right-side action buttons (Teacher Shield, Print, back-link) are hidden (`hidden sm:flex`). The breadcrumb hides the first two segments ("الرئيسية" and "القراءة") with `hidden sm:inline-flex` on their list items. Only the logo + level name + story title remain visible.

2. **Desktop stepper (modified)**: The existing stepper section gets `hidden sm:block` so it only appears on desktop.

3. **Mobile compact stepper (new)**: A new `sm:hidden` section renders six `w-10 h-10` (40px) circles in a flex row. Each circle contains the Station's emoji icon. Active station gets the theme colour fill (emerald-600, or indigo-600 for Transfer Tests). Past stations get `bg-emerald-50 border-emerald-200`. Future stations get `bg-slate-100 border-slate-200`.

4. **In-flow bottom nav (modified)**: Gets `hidden sm:flex` to hide on mobile.

5. **Fixed mobile bottom bar (new)**: A new `fixed bottom-0 inset-x-0 sm:hidden` bar with `z-30`, white background, top border, and `pb-[env(safe-area-inset-bottom)]` padding. Layout is a single flex row: `[🛡️ Shield] [← Prev] [المحطة ٣ من ٦] [Next →] [🖨️ Print]`. All buttons are at least 44px tap targets. The Shield and Print buttons are icon-only. The existing `pb-24` on the outer container provides scroll clearance for the bar.

### Layout structure (FreeReadingNook)

On mobile, the header's Teacher Shield and Print buttons switch to icon-only: the `<span>` containing the text label gets `hidden sm:inline`. No bottom bar is added — the Nook has no station navigation.

### Transfer Test banner

The description text span ("قياس الأداء المستقل: يُقرأ النص دون مساعدات…") gets `hidden sm:inline`. On mobile, only the badge "🎯 اختبار النقل" shows. The right-side text "الدعامات مقفلة للملاحظة الحرة" is already `hidden sm:inline` — no change needed there.

### Breakpoint strategy

All responsive changes use a single breakpoint: Tailwind's default `sm` (640px). Below `sm` = mobile layout. At and above `sm` = existing desktop layout unchanged. No custom breakpoints are introduced.

### Touch target sizing

All interactive elements in the mobile bottom bar and compact stepper use a minimum of 44×44px (Apple HIG). This is enforced by sizing classes (`w-10 h-10` for stepper circles, `min-h-[44px] min-w-[44px]` for bottom bar buttons). Desktop button sizes are not changed.

### iPhone safe area

The fixed bottom bar uses `pb-[env(safe-area-inset-bottom)]` to clear the home indicator on iPhones. The app's `<meta name="viewport">` tag must include `viewport-fit=cover` for `env()` values to be non-zero. If this meta tag is not already present, it must be added to the root layout.

## Testing Decisions

### Test philosophy

Tests verify **external behaviour**: the rendered DOM structure contains the correct elements with the correct responsive CSS classes. Tests do not verify visual layout (pixel positions, computed styles) — that is a Playwright/visual-regression concern and is out of scope.

### Seam

All tests use the existing **server-rendered HTML** seam (`renderToString` / `renderToStaticMarkup`), consistent with the reading domain test files (`reading-ticket-03`, `reading-ticket-04`).

### Test file

A single new test file covering all mobile-layout assertions. Prior art: `tests/reading-ticket-04-story-cycle.test.ts` (same rendering approach, same catalog imports).

### What to assert

1. **Mobile bottom bar exists** in StoryCycleRunnerClient rendered output with `sm:hidden` class, containing: a button with Teacher Shield icon, a Prev button, a station indicator, a Next button, and a Print button.
2. **In-flow bottom nav** has `hidden` (mobile-hidden) class.
3. **Mobile compact stepper** exists with `sm:hidden`, containing six emoji icons (📖 ⚡ 🔍 🧩 ✍️ 🏁).
4. **Desktop stepper** has `hidden` (mobile-hidden) with `sm:` visibility restore.
5. **Breadcrumb early segments** ("الرئيسية", "القراءة") carry `hidden sm:` classes.
6. **Transfer Test banner** description text carries `hidden sm:` class.
7. **FreeReadingNook** header buttons: the text label spans carry `hidden sm:` classes.
8. **Eastern Arabic numerals** check passes (existing pattern — no Western numerals leak).

## Out of Scope

- **Visual regression testing**: Playwright viewport-resize tests or screenshot comparison are not part of this spec.
- **Desktop layout changes**: All desktop behaviour remains pixel-identical.
- **Level Grid page changes**: The grid cards and header are adequate on mobile as-is.
- **Station content responsiveness**: The content rendered inside each Station (StationFirstRead, StationGuidedRead, etc.) is not modified. Those components are already responsive.
- **Animations and transitions**: No new motion is introduced for the mobile layout. The stepper and bottom bar appear/disappear via CSS class toggling at the breakpoint.
- **State persistence**: Station selection, tashkeel mode, sight word mode, and other state are unaffected. This is a layout-only change.
- **Accessibility audit**: While the bottom bar uses semantic `<button>` and `<nav>` elements, a full accessibility audit (screen reader, focus management) is a separate effort.

## Further Notes

- **ADR-0018** (`docs/adr/0018-reading-mobile-layout-strategy.md`) records the full design rationale, considered alternatives, and consequences.
- The `viewport-fit=cover` meta tag requirement should be verified in the root layout before implementation begins. If missing, it must be added — otherwise `env(safe-area-inset-bottom)` resolves to `0` on all devices.
- The existing `pb-24` on the StoryCycleRunnerClient outer `<div>` already provides ~96px of bottom padding, which is more than enough clearance for the fixed bottom bar (~56px + safe area). No adjustment needed.
- The `STATIONS` array already contains the emoji icons needed for the compact stepper — no new data is required.
