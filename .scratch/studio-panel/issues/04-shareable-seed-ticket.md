# 04: A seed you can share

**What to build:** The seed becomes the shareable artifact it actually is. It is renamed `رمز الورقة` on screen and in the printed footer, styled as a perforated ticket, copyable as a raw code or as a reproducible link with an inline confirmation, and regeneration gets its own full-width row.

**Blocked by:** 03 (cockpit)

**Status:** closed

- [x] The visible label `رمز النموذج` becomes `رمز الورقة` in the panel and in the printed footer, so the code on paper matches the code on screen
- [x] The printed-footer test is deliberately updated to the new label
- [x] The ticket shows the label, a dashed perforation boundary, the seed in mono with Eastern digits around the Latin characters, and keeps the existing seed-badge hook
- [x] Copying the code writes the raw seed; copying the link writes an absolute URL that reproduces seed, difficulty, and view mode
- [x] Both actions confirm inline for about 1.2 seconds inside a polite live region, then revert
- [x] Clipboard failure fails silently, never throws, and leaves the code selectable
- [x] Regeneration becomes a full-width row beneath the ticket and keeps its existing hook
- [x] The ticket carries the tooltip `نفس الرمز = نفس الورقة`, and both copy actions have explicit Arabic labels for assistive technology
- [x] The confirmation is instant, with no transition, under reduced motion
- [x] End to end with a stubbed clipboard: both payloads are exactly right, and the confirmation appears then reverts
