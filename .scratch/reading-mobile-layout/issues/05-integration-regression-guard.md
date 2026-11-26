# 05: Eastern Arabic numerals and regression guard

**What to build:** A single integration test file that renders StoryCycleRunnerClient (standard story and Transfer Test story) and FreeReadingNook via `renderToString`, then asserts every mobile-layout element from tickets 01–04 is present, every desktop element is preserved, and no Western Arabic numerals leak into the rendered output. This is the green-light gate confirming the full mobile layout works end-to-end.

**Blocked by:** 01-trim-breadcrumbs-and-banner, 02-compact-emoji-stepper, 03-fixed-mobile-bottom-bar, 04-nook-icon-only-buttons.

**Status:** done

- [ ] Renders StoryCycleRunnerClient with a standard story and asserts: mobile bottom bar present with `sm:hidden`, mobile stepper present with six emoji icons, desktop stepper present with `hidden sm:`, in-flow nav present with `hidden sm:`, header actions present with `hidden sm:`, breadcrumb early segments present with `hidden sm:`
- [ ] Renders StoryCycleRunnerClient with a Transfer Test story and asserts: banner description has `hidden sm:`, mobile stepper active circle uses indigo theme colour, Transfer Test badge visible
- [ ] Renders FreeReadingNook and asserts: Shield and Print label spans have `hidden sm:`, no bottom bar element present
- [ ] All three renders pass the Eastern Arabic numerals check (`findWesternNumeralsInRenderedHtml` returns empty array)
- [ ] All existing reading-domain tests still pass (run `npm run test:fast` as a sanity check)
