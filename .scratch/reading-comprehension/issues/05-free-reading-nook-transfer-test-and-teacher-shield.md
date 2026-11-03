# 05: Free-Reading Nook, Transfer-Test mode, and Teacher Shield drawer

**What to build:**
Specialized story cycle modes and instructor support tools:

1. A distinct, peaceful "Reading Nook" aesthetic for free-reading sessions (Stories 4 & 10) featuring warm parchment styling, large Amiri font, and zero steppers or assessment questions.
2. A strict Transfer-Test mode for Stories 6 & 12 with all scaffold controls locked to off and an assessment badge.
3. A collapsible Teacher Shield right drawer featuring pedagogical blind-spot alerts, session modeling scripts, and an interactive one-click tracking matrix saved to `localStorage`.

**Blocked by:** 04: Interactive Story Cycle runner and Scaffold Engine

**Status:** ready-for-agent

- [ ] Navigating to a free-reading story (Story 4 or 10) renders the "Reading Nook" view: warm parchment background (`amber-50` / `stone-100`), centered story text, decorative border, zero questions, zero steppers, and a simple "أتممت القراءة 🎉" completion action.
- [ ] Navigating to a transfer-test story (Story 6 or 12) displays a prominent "🎯 اختبار النقل" badge, locks all scaffold controls (Tashkeel, highlighting, hints) to unassisted state, and alerts the teacher to observe independent performance.
- [ ] The story runner includes a "👩‍🏫 درع المعلم" button toggling a collapsible right drawer.
- [ ] The drawer defaults to open on desktop screens and closed on mobile/tablet screens.
- [ ] The drawer displays the 6 pedagogical blind-spot warnings (e.g. accepting colloquial answers, decoding pause is not an error).
- [ ] The drawer includes the story's specific modeling script and teaching tips.
- [ ] The drawer features a one-click tracking matrix: assistance level (independent, general hint, line pointer, full modeling), comprehension tier (deep, partial, weak), and next-step recommendation.
- [ ] Matrix selections persist to the browser's `localStorage` per story and reload accurately.
- [ ] Tests verify Reading Nook rendering, scaffold locking in transfer tests, and `localStorage` persistence.
