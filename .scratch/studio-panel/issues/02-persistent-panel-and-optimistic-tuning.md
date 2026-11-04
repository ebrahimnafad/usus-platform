# 02: Persistent panel with optimistic tuning

**What to build:** The curriculum panel becomes persistent chrome for the studio route, fed by the URL through a thin adapter, so it never unmounts. Adjusting difficulty or rolling a seed updates the controls on the next frame and replaces the URL; choosing a lesson pushes. Only the A4 canvas reports loading — the previous sheet dims and a thin accent bar runs along the seam after a short delay. A skip link jumps straight to the worksheet.

**Blocked by:** 01 (extract panel and canvas)

**Status:** ready-for-agent

- [ ] The panel survives every difficulty, seed, and lesson change with its scroll offset, open units, and search text intact
- [ ] The panel is props-driven and holds optimistic state; a thin route adapter reads search params and supplies lesson, seed, difficulty, and view. The panel never calls router hooks, so the composite stays server-renderable outside a router
- [ ] Difficulty and seed render optimistically on the next frame, then reconcile when incoming params match; the control never waits for the server
- [ ] Difficulty and seed replace the URL; lesson selection pushes. Ten seed rolls leave one history entry, and back returns to the previously selected lesson
- [ ] Same-route updates do not replay the studio entrance fade; the hub-to-studio arrival fade is unchanged
- [ ] The route's loading fallback covers the canvas only and never renders the panel
- [ ] While generating, the canvas keeps the previous sheet at roughly 55% opacity with a 2px indeterminate accent bar on the panel seam, appearing only after about 150ms; the canvas toolbar does not move
- [ ] The panel receives one grade's catalog rather than all six
- [ ] A skip link is the studio's first focusable element and targets the worksheet region
- [ ] The legacy grade-query route, the scripted loading state, and the server-render helper keep their current behaviour and markup hooks
- [ ] Server-render contracts are unchanged: the exact studio heading, all twelve unit wrappers with Western numeric identifiers, standard-code markers, and the numeral invariant
- [ ] End to end: scroll the catalogue, change difficulty, and confirm the panel did not remount while the in-flight state appeared on the canvas only
