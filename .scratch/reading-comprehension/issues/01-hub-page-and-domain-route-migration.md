# 01: Hub page and domain route migration

**What to build:**
A welcoming, functional Arabic platform hub at `/` branded as **أُسُس (Usus)** where educators choose between Mathematics and Reading Comprehension. The existing Math TeacherStudio is cleanly relocated to `/math`, equipped with a slim top navigation bar (platform logo linking back to `/` and "الرياضيات" breadcrumb) so math worksheet generation and printing continue without interruption.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] The root route `/` renders a clean, responsive Arabic landing hub titled **أُسُس** with a welcome message and zero marketing clutter.
- [x] Two distinct domain cards appear side-by-side on desktop (stacked on mobile/tablet): Mathematics (Indigo theme) and Reading Comprehension (Emerald theme).
- [x] Each domain card displays its title, subtitle, visual preview illustration/icon, and a clear entry CTA button.
- [x] The existing Math TeacherStudio is accessible at `/math`, with all controls (grade pills, search, difficulty, seed, unit accordion, and preview) functioning identically to before.
- [x] The Math studio displays a slim top navigation bar with the **أُسُس** logo (linking to `/`) and a breadcrumb indicator (`الرئيسية > الرياضيات`).
- [x] Print and PDF routes for math worksheets (`/print`, `/api/pdf`) remain completely functional with no regressions.
