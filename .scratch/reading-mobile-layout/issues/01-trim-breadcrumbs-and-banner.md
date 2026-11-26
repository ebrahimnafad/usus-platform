# 01: Trim breadcrumbs and Transfer Test banner on mobile

**What to build:** On screens below 640px, the Story Cycle Runner header breadcrumb shows only the last two segments (level name and story title) — the "الرئيسية" and "القراءة" segments are hidden. The Transfer Test indigo banner collapses to show only the "🎯 اختبار النقل" badge, hiding the description text. On desktop (≥ 640px) everything renders exactly as it does today.

**Blocked by:** None (can start immediately).

**Status:** done

- [ ] The breadcrumb list items for "الرئيسية" and "القراءة" (and their separators) carry `hidden sm:inline-flex` classes so they disappear below `sm`
- [ ] The Transfer Test banner description span ("قياس الأداء المستقل: يُقرأ النص دون مساعدات…") carries a `hidden sm:inline` class
- [ ] On desktop (≥ sm), all four breadcrumb segments and the full banner text render unchanged
- [ ] Eastern Arabic numerals check passes — no Western numeral leaks
- [ ] Test assertions in a new or extended test file verify the `hidden sm:` classes are present on the correct breadcrumb and banner elements via `renderToString`
