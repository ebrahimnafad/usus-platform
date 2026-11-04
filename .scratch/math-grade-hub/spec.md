Status: ready-for-agent

## Problem Statement

The Math domain's navigation is purely functional: `/math` drops the teacher directly into a 543-line monolithic studio component with grade selection buried as small pill buttons in the sidebar. There is no visual hierarchy for choosing a grade, no spatial continuity between screens, no entrance animations, and no delight. The home page domain cards are similarly minimal. Teachers land in a complex workspace without a clear moment of orientation — "which grade am I working in?" — and grade-switching via pills provides no sense of place.

## Solution

Add a **Grade Hub** — a visually rich intermediate screen at `/math` presenting all six grades (K–5) as a 3×2 card grid with per-grade colors, visual model illustrations, and staggered entrance animations. Clicking a grade card triggers a **shared-element hero transition** (card expands into the studio header bar) and navigates to `/math/[gradeId]`, where the Teacher Studio loads with the selected grade's curriculum. Back-navigation (via back arrow or breadcrumb) reverses the hero transition. The home page domain cards are upgraded to match the same design language.

## User Stories

1. As a teacher, I want to see all six grades displayed as visually distinct cards on a hub screen, so that I can immediately identify and select the grade I teach.
2. As a teacher, I want each grade card to show a recognizable visual model (five-frame for K, ten-frame for Grade 1, etc.), so that I can associate the card with the grade's mathematical content at a glance.
3. As a teacher, I want each grade card to display the unit and lesson count, so that I know the scope of curriculum available for each grade.
4. As a teacher, I want the grade cards to appear with a staggered fade-up animation in RTL order, so that the screen feels alive and polished when I arrive.
5. As a teacher, I want to hover over a grade card and see it lift with a color glow and a subtle animation on the visual model, so that the interface feels responsive and tactile.
6. As a teacher, I want clicking a grade card to trigger a smooth hero transition where the card expands into the studio header, so that I maintain spatial orientation as I enter the studio.
7. As a teacher, I want the studio header bar and active elements to adopt the selected grade's color (via gradient wash), so that I always know which grade I'm working in.
8. As a teacher, I want a back arrow in the studio top bar that reverses the hero transition back to the hub, so that I can switch grades without losing my sense of place.
9. As a teacher, I want breadcrumbs showing `أُسُس > الرياضيات > [الصف]` that I can click to navigate back to the hub or home, so that I always know where I am.
10. As a teacher, I want the grade hub URL to be `/math` and the studio URL to be `/math/k` (or `/math/1`, etc.), so that I can bookmark or share a direct link to a specific grade's studio.
11. As a teacher, I want all grades (1–5) to be fully clickable even though only Grade K has worksheet blueprints, so that I can explore the curriculum for any grade without hitting a "coming soon" wall.
12. As a teacher, I want the hub to display a hero section header ("استوديو المعلم") above the card grid, so that the screen sets the right tone for my work session.
13. As a teacher using a tablet, I want the card grid to reflow to 2×3 on tablet and 1×6 on mobile, with a large contextual back arrow for navigation, so that the experience works well on touch devices.
14. As a teacher with motion sensitivity, I want all animations to be suppressed when my OS has `prefers-reduced-motion` enabled, so that I can use the platform without discomfort.
15. As a teacher, I want the home page domain cards (Math and Reading) to have the same visual polish as the grade cards (entrance animation, hover effects), so that the first impression matches the rest of the experience.
16. As a teacher, I want the hero transition to visually cover the data loading time, so that I never see a blank screen or loading spinner when entering the studio.

## Implementation Decisions

### Route structure

- **Current**: `/math` renders `TeacherStudioClient` directly; state via `window.location.search` (`?grade=k&lesson=1`) with `window.history.replaceState`
- **New**: `/math` = grade hub page, `/math/[gradeId]` = studio page. Standard Next.js App Router dynamic routes with `<Link>` navigation
- A new `src/app/math/layout.tsx` wraps both pages with `AnimatePresence`, `LayoutGroup`, and `GradeThemeProvider` from Framer Motion + React context
- The root layout (`src/app/layout.tsx`) is unchanged
- This extends ADR-0007's domain-split hub architecture one level deeper (recorded as ADR-0009)

### New dependency: Framer Motion

- Install `framer-motion` (~30 KB gzipped) for shared-element transitions (`layoutId`), staggered entrance animations, hover micro-interactions, and `useReducedMotion()` accessibility hook
- Recorded as ADR-0008
- No other animation library or CSS animation framework needed

### TeacherStudioClient migration

- Remove the grade pill buttons from the sidebar (grade selection is now the hub)
- Accept `gradeId` as a prop (from the route param) instead of reading from `window.location.search`
- Remove `window.history.replaceState` URL sync for grade — the route handles it. Keep search-param sync for `lesson`, `seed`, and `difficulty` within the studio (or migrate those to route params too in a future effort)
- The `GRADES` constant moves to a shared module (needed by both the hub and the studio)

### New components

- **`GradeCard`**: Individual grade card — renders Arabic label, per-grade color, visual model SVG component, unit/lesson count. Supports hover states (lift, border glow, visual model animation) via Framer Motion. Uses `layoutId` for hero transition. Wraps a Next.js `<Link>` to `/math/[gradeId]`.
- **`GradeGrid`**: 3×2 responsive grid (`grid-cols-3` → `md:grid-cols-2` → `grid-cols-1`) rendering 6 `GradeCard` components with staggered fade-up entrance (50ms stagger, RTL order). Container for the Framer Motion `staggerChildren` orchestration.
- **`GradeHubHero`**: Hero section header above the card grid — "استوديو المعلم" title, subtitle, decorative background.
- **`StudioHeader`**: Studio header bar that is the hero transition target (`layoutId` matches the source card). Displays grade label, grade color gradient wash, visual model as small icon, back arrow, and breadcrumbs.
- **`Breadcrumbs`**: Shared layout component with a `segments` prop, animated segment transitions. Replaces all inline breadcrumb JSX across pages. Uses `<nav aria-label="التنقل">` with `<ol>` structure.
- **`BackButton`**: RTL-aware back arrow with `aria-label="العودة لاختيار الصف"`.

### Grade theme system

- A `GradeThemeProvider` React context provides the active grade's color tokens to all descendants
- Mounted in `src/app/math/layout.tsx`, reads `gradeId` from the route params (null on the hub page)
- Color palette:

  | Grade | Tailwind token |
  | ----- | -------------- |
  | K     | `rose`         |
  | 1     | `orange`       |
  | 2     | `amber`        |
  | 3     | `emerald`      |
  | 4     | `sky`          |
  | 5     | `violet`       |

- Studio header uses `bg-gradient-to-l from-[grade]-600 to-[grade]-400`
- Active lesson and generate button use grade color as accent
- Hub page (no grade selected) uses neutral indigo

### Visual model per grade card

- K → `FiveFrame` (exists)
- 1 → `TenFrame` (exists)
- 2 → `NumberLine` (exists)
- 3 → `ArrayModel` (exists)
- 4 → `BarModel` (exists)
- 5 → New `CoordinateGrid` component needed (does not exist in `src/visual-models/`)

### Hero transition flow

1. Each `GradeCard` has `layoutId={`grade-${gradeId}`}` on its container
2. `StudioHeader` has the same `layoutId` on its container
3. `AnimatePresence` in `math/layout.tsx` coordinates the cross-route animation
4. Card elements map to header elements: label → title, color → background gradient, visual model → small icon
5. Sidebar and canvas fade in after the header settles (~300ms)
6. Back navigation reverses the animation

### Home page upgrades

- Apply Framer Motion staggered fade-up entrance to the two domain cards
- Add hover interactions matching grade cards: lift (`translateY(-4px)`), border glow, subtle SVG illustration animation
- Maintain existing card content and layout; only add motion and interaction polish

### Reduced motion

- All Framer Motion animations check `useReducedMotion()` hook
- When active: no stagger, no hero transition (instant page change), no hover motion
- Static visual hover states preserved (border color change, shadow change)

### Grid reading order

- CSS `grid` with `dir="rtl"` naturally flows items right-to-left
- K appears top-right, Grade 5 appears bottom-left
- No `direction` overrides needed

## Testing Decisions

### Primary seam: Playwright E2E

Navigation is a user-facing flow — the right seam is the browser. Tests exercise the full journey from the user's perspective:

- **Navigate hub → studio → hub**: Click a grade card, verify URL changes to `/math/[gradeId]`, studio renders, click back, verify return to `/math`
- **All six grade cards render**: Verify card count, labels, and data attributes
- **Breadcrumb navigation**: Click breadcrumb segments, verify correct navigation
- **Mobile viewport**: Verify grid reflows, back button visible
- **Reduced motion**: Set `prefers-reduced-motion: reduce` in browser context, verify navigation still works (instant transitions)
- **Home page**: Verify domain cards render and link correctly

Prior art: `tests/e2e/math-studio.spec.ts` tests the existing math navigation. A new `tests/e2e/math-navigation.spec.ts` tests the hub flow. The existing `math-studio.spec.ts` needs updating: its `page.goto('/math')` and `page.click('[data-grade="k"]')` assumptions change (the page now shows the hub, not the studio).

### Secondary seam: Vitest component render

For the data-driven rendering logic of `GradeCard`:

- Renders correct Arabic label for each grade
- Renders correct visual model component
- Renders correct unit/lesson count
- Applies correct color class

Prior art: `src/visual-models/__tests__/*.test.tsx` use `@testing-library/react` with `render()` + `screen.getByTestId()`. `GradeCard` tests follow the same pattern.

### What NOT to test

- Animation timing, easing curves, or visual smoothness — these are aesthetic, not behavioral
- Framer Motion internals (`layoutId` wiring, `AnimatePresence` lifecycle)
- CSS class names or Tailwind tokens — test visible behavior, not implementation

## Out of Scope

- **Reading domain navigation redesign** — follows later using the same patterns
- **Studio sidebar redesign** — only the grade pills are removed; the unit accordion, search, difficulty selector, and seed controls stay as-is
- **Unit/lesson navigation within the studio** — separate design effort
- **User progress tracking or analytics** — no tracking system exists
- **Lesson/seed/difficulty URL param migration to route segments** — keep as search params within the studio for now
- **Mobile-specific navigation patterns** (hamburger, bottom tabs) — contextual back + breadcrumbs suffice
- **Grade 5 coordinate grid visual model for worksheets** — only a simplified card illustration version is created; the full exercise archetype is a separate effort

## Further Notes

- Only Grade K has lesson blueprints. Grades 1–5 cards are fully clickable and the studio loads with curriculum data, but the "generate worksheet" functionality won't appear for lessons without blueprints. No visual distinction on the cards.
- The existing `math-studio.spec.ts` E2E test will need updating since it currently navigates to `/math` expecting the studio directly. After this change, `/math` shows the hub, and the studio is at `/math/k`.
- The `GRADES` constant currently lives inside `TeacherStudioClient.tsx`. It should move to a shared module (e.g., alongside the catalog or in a grades config) since both the hub and studio need it.
- The Grade 5 card needs a new `CoordinateGrid` visual model component. It's a simplified illustration-only version for the card — not a full exercise archetype. Keep it in `src/visual-models/` following the existing component pattern.
