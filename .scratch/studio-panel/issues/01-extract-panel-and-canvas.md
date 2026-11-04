# 01: Extract panel and canvas as independently renderable halves

**What to build:** The Teacher Studio's curriculum panel and A4 canvas become two independently renderable halves, each fed by explicit props, with no visual or behavioural change. The composite studio component still renders both together. This is a prefactor: it makes the persistent-panel change a wiring job instead of surgery on a 600-line component, and it is verified by the existing studio contracts passing without edits.

**Blocked by:** None (can start immediately)

**Status:** closed

- [x] The curriculum panel renders standalone from explicit props: the current grade's catalog, current lesson number, seed, difficulty mode, and search query
- [x] The canvas renders standalone from a generated worksheet bundle, view mode, and zoom level
- [x] Neither half reaches for router hooks, global state, or the other half's state; the composite owns orchestration
- [x] The composite still renders panel plus canvas and every existing studio contract test passes with no edits
- [x] Rendered markup is unchanged: no new visible strings, no new attributes, no reordered sections
- [x] Navigating lessons, regenerating a seed, switching view modes, zooming, printing, and exporting the PDF all behave exactly as before
- [x] The legacy grade-query route, the scripted loading state, and the server-render helper keep working untouched
