# 0019 - Shared Client-Side Print Preferences and Typographic Live Preview

## Context

`PrintModal` (Math) and `ReadingPrintModal` (Reading) previously initialized `fontFamily` (`"cairo"`) and `colorMode` (`"color"`) with ephemeral `useState` on every mount, forcing teachers to re-select their preferred Arabic font and ink-saving B&W mode every session. Additionally, teachers had no visual confirmation of the combined font family and color mode before clicking `طباعة الآن`.

## Decision

1. **Single shared `localStorage` key (`print-prefs`) via `usePrintPrefs`**:
   - Both `PrintModal` and `ReadingPrintModal` read and write `{ fontFamily, colorMode }` under one shared `localStorage` key (`print-prefs`), validated against the supported `PrintFontId` and `PrintColorMode` values with safe fallback to defaults (`"cairo"`, `"color"`).
   - Transient, context-dependent options (`scope`, `viewOption`, `difficulty`, `seed`, `tashkeelMode`, `includeStoryText`) remain per-modal session state and are not persisted.
2. **Compact typographic live preview (`PrintPreviewStrip`)**:
   - Rendered inline immediately below `PrintFontSelector` in both modals.
   - Displays a fixed platform-branded Arabic sample (`أُسُس — نموذج الطباعة`) styled in the selected font stack alongside a visual indicator for the active color mode (`color` vs. `bw`).

## Consequences

- Teachers' font and ink-saving preferences persist across page reloads and are shared seamlessly between Math and Reading.
- Adding server-side user profiles later will require migrating or syncing the `print-prefs` client key.
- Because `usePrintPrefs` reads `localStorage` in a lazy `useState` initializer, both modals remain client-only (`"use client"`) and avoid an initial default-value flash on open.
