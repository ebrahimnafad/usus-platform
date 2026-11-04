# 01: Install Framer Motion + shared grade config + reduced-motion hook

**What to build:** After this ticket lands, any component in the codebase can import `framer-motion` and use it. The `GRADES` constant (grade IDs, Arabic labels, color tokens, visual model mappings) is extracted from `TeacherStudioClient` into a shared module that both the future Grade Hub and the studio can import — a single source of truth for grade metadata. A thin `useReducedMotion` wrapper is available so every downstream animation ticket doesn't have to figure out accessibility on its own.

**Blocked by:** None (can start immediately)

**Status:** closed

- [x] `framer-motion` is installed as a production dependency
- [x] A shared grade config module exports the `GRADES` array with: `id`, `label` (Arabic), `color` (Tailwind token: rose/orange/amber/emerald/sky/violet), and `visualModel` (component reference or key)
- [x] `TeacherStudioClient` imports `GRADES` from the shared module instead of defining it inline — no behaviour change, existing E2E tests still pass
- [x] A `useReducedMotion` hook (wrapping Framer Motion's built-in) is exported from a shared location
- [x] `npm run build` succeeds with no new warnings
