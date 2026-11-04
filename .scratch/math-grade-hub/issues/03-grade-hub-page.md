# 03: Grade Hub page + math layout with theme provider

**What to build:** Navigating to `/math` shows a Grade Hub — a visually rich screen where the teacher chooses a grade before entering the studio. The hub displays a hero section header ("استوديو المعلم" title, subtitle, decorative background) above a 3×2 responsive card grid (3 columns desktop, 2 columns tablet, 1 column mobile). Each of the six grade cards (K–5) shows: Arabic grade label, per-grade color (rose/orange/amber/emerald/sky/violet), a characteristic visual model SVG from the existing `visual-models` system, and the unit/lesson count from the curriculum catalog. The Grade 5 card uses a new simplified `CoordinateGrid` visual model component. Cards appear with a staggered fade-up animation in RTL order (50ms stagger). Hovering a card produces a lift (`translateY(-4px)`), border glow in the grade's color, and a subtle animation on the visual model SVG. All animations respect `prefers-reduced-motion`. A new `math/layout.tsx` wraps the hub (and future studio) with Framer Motion `AnimatePresence` + `LayoutGroup` and a `GradeThemeProvider` context. Each card wraps a Next.js `<Link>` to `/math/[gradeId]` and carries a `layoutId` for the future hero transition. Grid flows RTL naturally (K top-right, Grade 5 bottom-left).

**Blocked by:** 01 (Framer Motion + grade config), 02 (Breadcrumbs)

**Status:** closed

- [x] `/math` renders the Grade Hub (not the studio directly)
- [x] Hero section header displays "استوديو المعلم" title and subtitle
- [x] Six grade cards render in a 3×2 grid with correct labels, colors, visual models, and unit/lesson counts
- [x] Grid is responsive: 3 columns → 2 columns → 1 column at tablet/mobile breakpoints
- [x] Grid reading order is RTL (K top-right, Grade 5 bottom-left)
- [x] Cards entrance: staggered fade-up, 50ms stagger, RTL order
- [x] Card hover: lift + border glow + visual model animation (0.2–0.3s)
- [x] All animations suppressed when `prefers-reduced-motion` is active
- [x] New `CoordinateGrid` visual model component in `visual-models/` for Grade 5 card
- [x] `math/layout.tsx` provides `AnimatePresence`, `LayoutGroup`, and `GradeThemeProvider`
- [x] Each card links to `/math/[gradeId]` and has `layoutId={`grade-${gradeId}`}`
- [x] Breadcrumbs show `أُسُس > الرياضيات`
- [x] E2E test: hub renders 6 cards, clicking a card navigates to `/math/[gradeId]`
