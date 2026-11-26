# 04: Make Reading Nook header buttons icon-only on mobile

**What to build:** In the Free Reading Nook variant, the Teacher Shield and Print buttons in the top header become icon-only on screens below 640px: the text labels ("درع المعلم" and "طباعة ورقة العمل") are hidden, leaving only the emoji icons (👩‍🏫 and 🖨️). No bottom bar is added — the Nook has no station navigation. On desktop (≥ 640px), the full labels render as they do today.

**Blocked by:** None (can start immediately).

**Status:** done

- [ ] The Teacher Shield button's text label span ("درع المعلم") gets `hidden sm:inline`
- [ ] The Print button's text label span ("طباعة ورقة العمل") gets `hidden sm:inline`
- [ ] Both buttons remain at least 44px tap targets on mobile (add `min-h-[44px]` if needed)
- [ ] On desktop (≥ sm), both buttons show their full text labels unchanged
- [ ] Test assertions verify the label spans carry `hidden sm:` classes via `renderToString` of the FreeReadingNook component
