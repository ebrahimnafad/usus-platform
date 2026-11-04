# 04: Migrate TeacherStudioClient to route params + studio header

**What to build:** The Teacher Studio now lives at `/math/[gradeId]` instead of `/math`. It receives `gradeId` from the route param and no longer manages grade selection internally. The grade pill buttons are removed from the sidebar. A `StudioHeader` component replaces the old inline top bar: it displays the grade's Arabic label, a gradient-wash background in the grade's color (`from-[grade]-600 to-[grade]-400`), the grade's visual model as a small icon, a `BackButton` (RTL-aware back arrow with `aria-label="العودة لاختيار الصف"`) that navigates to `/math`, and `Breadcrumbs` showing `أُسُس > الرياضيات > [الصف]`. The header container carries `layoutId={`grade-${gradeId}`}` matching the hub's grade card for the future hero transition. Lesson, seed, and difficulty remain as internal state (or search params) within the studio. The existing `math-studio.spec.ts` E2E test is updated: it now navigates to `/math/k` instead of `/math` and no longer tests grade switching via sidebar pills.

**Blocked by:** 01 (grade config), 02 (Breadcrumbs), 03 (Grade Hub — so `/math` serves the hub and `/math/[gradeId]` serves the studio)

**Status:** closed

- [x] `/math/[gradeId]` renders the Teacher Studio with the correct grade loaded
- [x] `TeacherStudioClient` accepts `gradeId` as a prop instead of reading from URL search params
- [x] Grade pill buttons are removed from the sidebar
- [x] `StudioHeader` renders: grade label, gradient-wash background, visual model icon, back arrow, breadcrumbs
- [x] Back arrow navigates to `/math` (the Grade Hub)
- [x] Clicking "الرياضيات" in the breadcrumb navigates to `/math`
- [x] `StudioHeader` has `layoutId` matching the corresponding grade card
- [x] `BackButton` component with `aria-label="العودة لاختيار الصف"`
- [x] Grade theme context provides the active grade's color to descendant components
- [x] Existing E2E test (`math-studio.spec.ts`) updated for new URL structure and passes
- [x] E2E test: navigate from hub to studio, verify studio loads with correct grade, navigate back to hub
