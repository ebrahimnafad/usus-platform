# 05: Wire hero transition (card ↔ header)

**What to build:** The shared-element hero transition connects the Grade Hub and Teacher Studio visually. When the teacher clicks a grade card on the hub, the card container smoothly animates (position, size, border-radius) into the studio's `StudioHeader` — both share the same Framer Motion `layoutId`. The card's color becomes the header's gradient wash. The card's visual model shrinks to the header's icon position. After the header settles (~300ms), the sidebar and canvas fade in. If curriculum data hasn't loaded by then, the sidebar shows a skeleton shimmer. Navigating back (via back arrow or breadcrumb) reverses the transition: the header morphs back into the card at its original grid position. With `prefers-reduced-motion` active, navigation is instant — no morphing animation, the pages simply swap.

**Blocked by:** 03 (Grade Hub with `layoutId` on cards), 04 (Studio with `layoutId` on header)

**Status:** closed

- [x] Clicking a grade card triggers a smooth hero transition: card morphs into studio header
- [x] Card elements map to header elements: container shape/position, color → gradient, visual model → icon
- [x] Sidebar and canvas fade in after the header animation settles
- [x] If data isn't ready after animation, sidebar shows a skeleton shimmer
- [x] Back navigation (back arrow or breadcrumb) reverses the hero transition
- [x] Card appears at its original grid position after reverse transition
- [x] With `prefers-reduced-motion`: navigation is instant, no animation, pages swap directly
- [x] E2E test: full round-trip hub → studio → hub works in both normal and reduced-motion modes
