# Framer Motion for navigation animations

The platform's navigation is purely functional — instant page changes, no visual continuity between routes. To deliver the "Grade Hub" design (shared-element hero transitions from grade cards to studio, staggered card entrances, hover micro-animations), we need a motion library. We chose **Framer Motion** over CSS-only animations and the View Transitions API.

CSS-only animations (Tailwind `animate-*` + custom keyframes) have zero runtime cost but cannot do shared-element transitions across routes — the core interaction of the grade hub design. The View Transitions API is native and zero-bundle, but has limited browser support and less control over intermediate animation states. Framer Motion (~30 KB gzipped) handles shared-element (`layoutId`), `AnimatePresence` for route transitions, gesture support, and `useReducedMotion()` for accessibility — all requirements of this design.

## Consequences

- New runtime dependency (~30 KB gzipped) in the client bundle
- `src/app/math/layout.tsx` must wrap children in `AnimatePresence` and `LayoutGroup`
- All navigation animations must check `useReducedMotion()` and degrade gracefully
