# Math grade hub route restructuring

ADR-0007 established a domain-split hub architecture with each domain owning its own chrome. We extend this pattern one level deeper: the Math domain now has its own **grade hub** at `/math` (a 3×2 card grid for grade selection) with the Teacher Studio moving to `/math/[gradeId]`.

Previously, `/math` rendered the studio directly with grade selection embedded as pill buttons in the sidebar and all state driven by URL search params (`?grade=k&lesson=1`) with full page reloads. This worked but provided no visual hierarchy for grade selection, no shareable grade-level URLs, and no route-level code splitting.

The new structure uses proper Next.js App Router dynamic routes (`/math/[gradeId]`), a shared `math/layout.tsx` for cross-route animation coordination, and `<Link>`-based client-side navigation replacing `window.location.search` manipulation.

## Considered Options

- **Client-side state (no route change)**: `/math` renders either hub or studio based on a `grade` state variable. Simpler but loses URL shareability, browser back-button, and server component eligibility.
- **Keep search params with visual hub**: Add a grade selection overlay before the studio, still at `/math?grade=k`. Avoids route restructuring but the hub isn't a real page — it can't have its own layout or be bookmarked independently.
