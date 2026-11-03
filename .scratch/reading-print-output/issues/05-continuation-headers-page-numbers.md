# 05: Continuation Page Mini-Headers and Dynamic Page Numbers

**What to build:** When a Reading printable worksheet flows to page 2 or beyond (e.g., a long Level 3 story with 150+ words, or a worksheet with story + questions + grammar that exceeds one A4 page), each continuation page starts with a one-line mini-header identifying the document: platform name, reading level, story title, student name field, and page number. The hardcoded "الصفحة ١/١" is replaced with a dynamic page number using CSS counters. Any loose page picked up off a classroom floor can be identified and returned to the right student.

**Blocked by:** 01: Print Isolation (pagination must work before continuation headers make sense), 04: Tashkeel + Story Toggle + Typography (header content is settled in 04 — the mini-header mirrors it).

**Status:** done

- [x] The hardcoded `[الصفحة ١/١]` text is removed from the printable header
- [x] Page numbers are rendered dynamically — at minimum the current page number (via CSS `counter(page)` or equivalent)
- [x] If the browser supports `counter(pages)` (total page count), the format is "صفحة X من Y"; otherwise "صفحة X" is acceptable
- [x] When content flows to page 2+, a one-line mini-header appears at the top of each continuation page containing: أُسُس, the reading level title, the story title, a student name blank, and the page number
- [x] The mini-header does NOT appear on page 1 (the full header serves that purpose)
- [x] CSS changes to `globals.css` for page counters and continuation headers are additive — they do not break Math domain print output
- [x] New test: rendering `PrintableReadingSheet` confirms the hardcoded "الصفحة ١/١" string is absent from the HTML
- [x] Eastern Arabic Numerals invariant holds across all page elements
