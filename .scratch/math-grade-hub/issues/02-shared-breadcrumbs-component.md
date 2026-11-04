# 02: Shared Breadcrumbs component

**What to build:** A reusable `<Breadcrumbs>` component that replaces all inline breadcrumb JSX across the app. It accepts a `segments` prop (array of `{ label, href? }`) and renders an accessible `<nav aria-label="التنقل">` with an `<ol>` of linked segments separated by a delimiter. Animated segment transitions (fade) when the breadcrumb trail changes. Every page that currently has hand-written breadcrumbs (math top bar, reading hub, reading level, reading story) switches to this component. The rendered output is visually identical to what exists today.

**Blocked by:** None (can start immediately)

**Status:** closed

- [x] `<Breadcrumbs>` component exists with a `segments` prop: `Array<{ label: string; href?: string }>`
- [x] Renders `<nav aria-label="التنقل">` wrapping an `<ol>` with `<li>` per segment
- [x] Segments with `href` render as `<Link>` (Next.js); the last segment (current page) has no link and uses `aria-current="page"`
- [x] All existing inline breadcrumb markup in the codebase is replaced with `<Breadcrumbs>`
- [x] Visual output matches the existing breadcrumb style (brand logo link, slash separator, text styling)
- [x] Existing E2E tests pass without modification — breadcrumbs render the same text and links
