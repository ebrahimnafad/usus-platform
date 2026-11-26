# 03: Add fixed mobile bottom bar with merged navigation and actions

**What to build:** A new fixed bottom bar visible only below 640px merges station navigation (Prev/Next) with the Teacher Shield and Print actions into a single thumb-friendly row: `[🛡️] [← Prev] [المحطة ٣ من ٦] [Next →] [🖨️]`. All five buttons are at least 44px tap targets. The bar clears the iPhone home indicator using `env(safe-area-inset-bottom)` padding. The existing in-flow bottom nav inside `<main>` hides on mobile. The header's right-side action buttons (Teacher Shield, Print, back-link) hide on mobile. On desktop (≥ 640px), only the existing in-flow nav and header actions render — no visual change.

**Blocked by:** None (can start immediately).

**Status:** done

- [ ] A new `fixed bottom-0 inset-x-0 z-30 sm:hidden` bar renders with white background and top border
- [ ] Bar contains five elements in a flex row: Shield icon button, Prev button, station indicator text ("المحطة ٣ من ٦"), Next button, Print icon button
- [ ] Shield button opens the Teacher Shield drawer; Print button opens the print modal; Prev/Next buttons change `activeStation`
- [ ] All buttons have `min-h-[44px] min-w-[44px]` for Apple HIG touch targets
- [ ] Bar has `pb-[env(safe-area-inset-bottom)]` padding for iPhone safe area
- [ ] The root layout's `<meta name="viewport">` includes `viewport-fit=cover` (add if missing)
- [ ] The existing in-flow bottom nav (`mt-8 pt-4 border-t`) gets `hidden sm:flex`
- [ ] The header's right-side `div` containing Shield, Print, and back-link gets `hidden sm:flex`
- [ ] On desktop (≥ sm), only the existing header actions and in-flow nav render — no visual change
- [ ] Test assertions verify the fixed bar exists with correct content and classes, the in-flow nav has mobile-hidden classes, and header actions have mobile-hidden classes
