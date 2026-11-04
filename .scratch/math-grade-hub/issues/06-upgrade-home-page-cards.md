# 06: Upgrade home page domain cards

**What to build:** The two domain cards on the home page (`/`) — Math and Reading — get the same motion and interaction polish as the grade cards, so the first impression matches the rest of the experience. Cards appear with a Framer Motion staggered fade-up entrance animation. Hovering a card produces a lift (`translateY(-4px)`) and border glow in the domain's accent color (indigo for Math, emerald for Reading). The existing inline SVG illustrations gain subtle idle or hover animations (gentle float, pulse, or shape movement). All animations respect `prefers-reduced-motion`. Card content, layout, and links remain unchanged.

**Blocked by:** 01 (Framer Motion)

**Status:** ready-for-agent

- [ ] Home page domain cards have staggered fade-up entrance animation
- [ ] Card hover: lift + border glow in domain accent color (indigo / emerald)
- [ ] SVG illustrations have subtle hover animation
- [ ] All animations suppressed when `prefers-reduced-motion` is active
- [ ] Card content, links (`/math`, `/reading`), and visual layout unchanged
- [ ] E2E test: home page renders both domain cards with correct links and text
