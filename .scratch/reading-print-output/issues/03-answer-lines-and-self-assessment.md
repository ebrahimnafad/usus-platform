# 03: Tier-Scaled Answer Lines and Self-Assessment

**What to build:** QAR comprehension questions on the Reading printable provide writing space scaled to the question's cognitive tier: مباشر (direct) gets 1 line, استنتاجي (inferential) gets 2 lines, إبداعي (creative) gets 3 lines — each line 12mm tall instead of the current 6mm. Answer areas carry the section's tinted background (sky-50). A self-assessment strip ("كيف أحسست بأدائي؟ ☆ ☆ ☆") appears after the last content section, giving students a metacognitive reflection moment. Young children now have physically usable writing space.

**Blocked by:** 02: Colored Sections (answer lines sit inside the QAR section whose visual treatment — sky border and tinted background — is established in ticket 02).

**Status:** ready-for-agent

- [ ] A QAR question with `tier: "direct"` renders exactly 1 answer line element
- [ ] A QAR question with `tier: "inferential"` renders exactly 2 answer line elements
- [ ] A QAR question with `tier: "creative"` renders exactly 3 answer line elements
- [ ] Each answer line element is 12mm tall (replacing the previous `h-6` / 24px / ~6mm)
- [ ] The grammar lab production prompt retains its single writing line (unchanged from current behavior, but at 12mm height)
- [ ] A self-assessment strip containing "كيف أحسست بأدائي؟" and three star characters appears after the grammar lab section (or after QAR if no grammar lab exists)
- [ ] The self-assessment strip does NOT appear on free-reading variant printables
- [ ] New test: render a standard story and count answer line elements per question — assert 1/2/3 by tier
- [ ] New test: assert answer line elements carry the 12mm height class
- [ ] New test: assert "كيف أحسست بأدائي؟" text present in standard/transfer-test variants, absent in free-reading
- [ ] Eastern Arabic Numerals invariant holds
