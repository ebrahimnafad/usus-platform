# Teacher Studio panel as persistent chrome

The Teacher Studio's curriculum panel lived inside the studio page, so every knob turn — a difficulty tap, a seed roll, a lesson pick — was a `router.push` to a dynamic, server-rendered route whose `loading.tsx` is the whole studio skeleton. The panel unmounted mid-interaction, its scroll offset, expanded units, and search were discarded, and the content replayed a 0.3 s-delayed fade. We move the panel into `src/app/math/[gradeId]/layout.tsx`, driven by `useSearchParams` and only the current grade's catalog, leaving the A4 canvas as the sole occupant of the page segment. Tuning controls (`difficulty`, `seed`) use `router.replace` with optimistic local state; lesson selection keeps `router.push` so back returns to the previous lesson.

## Considered Options

- **Optimistic UI only, keep the panel in the page**: cheapest, but the route-level skeleton and remount remain, so the panel still flashes on every knob turn and browsing position is still lost.
- **Generate worksheets in the client**: removes the round-trip entirely, but requires lifting the `fs`-backed curriculum catalog out of the engine and duplicating the server PDF pipeline. Kept as a later option that this move makes cheap.
- **Leave it**: the panel is the product's primary control surface, and a knob turn behaving like leaving the page is the single largest gap between the studio and a tool a teacher would call fast.

## Consequences

- `TeacherStudio` stays as the composite used by `renderTeacherStudio`, the legacy `/math?grade=` route, and the `isLoading` skeleton contract; `StudioPanel` and `StudioCanvas` are the new split used by the route.
- `[gradeId]/layout.tsx` reads the `studio_rail` cookie (async `cookies()`) and wraps the `useSearchParams`-driven panel in `Suspense`, because the panel now depends on router state instead of page props.
- The panel receives one grade instead of six, cutting the serialized curriculum payload roughly sixfold.
- Route-level loading can only ever cover the canvas, so any future panel data must arrive with the layout.
