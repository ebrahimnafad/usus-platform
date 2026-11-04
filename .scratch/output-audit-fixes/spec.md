# Output Audit Fixes — Download PDF & Print

**Triage:** ready-for-agent

## Context

An audit of the **تحميل PDF** (download) and **طباعة** (print) buttons for worksheet K-17/6NDAVW/scaffolded revealed 9 bugs: 4 critical, 3 moderate, 2 minor. Both output pathways fail the pixel-perfect standard.

## Bugs

### Critical

1. **Print produces 4 pages vs. Download's 2 pages** — The print path (`window.print()`) has no scale budget; the PDF path enforces a 2-page maximum via Playwright scaling. Fix: replace `window.print()` with PDF-through-iframe per ADR-0011.

2. **Print page 3: blank whitespace** — `break-inside: avoid` pushes exercises to page 4, leaving section header + empty page. Fix is subsumed by #1 (PDF-through-iframe).

3. **Visual model SVG overflow in ConnectMatch rows** — Match row containers use fixed `h-[76px]` but grouped objects (3+ with subitize sub-groups) render at 44px SVGs that exceed the box. Hybrid fix:
   - `connect-match.tsx:179,263` → change `h-[76px]` to `min-h-[76px]`
   - `print-document.ts:104` → change `height: 70px` to `min-height: 76px`
   - `registry.tsx` everyday-object renderer → when `total >= 4`, override size to a new `"tiny"` tier (28–32px)
   - `connect-match.tsx:165` → make `rowHeight` dynamic or increase constant for subitize exercises

4. **Mobile bottom bar bleeds into print** — `StudioPanel.tsx:840` element `data-studio-mobile-bar` missing `no-print` class. Fix: add `no-print` to its className.

### Moderate

5. **Tracing card labels clipped in PDF** — "تتبّع الرقم" labels in model-count-and-trace archetype need more bottom padding in their containers.

6. **Print filename is generic site title** — `document.title` should be set dynamically before `window.print()` (or before iframe print) to reflect the specific worksheet identity: `ورقة عمل – الروضة – الدرس ١٧ – 6NDAVW`.

7. **`PRINT_CLEAN_A4_CSS` fallback missing Tailwind** — The `page.setContent()` fallback path in `pdf-exporter.ts` renders HTML with Tailwind class names but no Tailwind CSS. Either embed critical Tailwind CSS into `PRINT_CLEAN_A4_CSS` or remove the fallback and always use the live-URL path.

### Minor

8. **Math correctness verification** — ConnectMatch flower exercise: label says "٥ زهرات" but matched number is ٣. Verify the archetype's answer generation distinguishes total count vs. subgroup count correctly.

9. **PDF compression readability** — The 2-page budget can scale content down to 0.55× which may be too small for K-grade. Add a minimum font-size floor (e.g., 12pt) that pushes the budget to 3 pages rather than crushing text.

## Files to Change

| File                                             | Changes                                                |
| ------------------------------------------------ | ------------------------------------------------------ |
| `src/components/studio/StudioCanvas.tsx:157-164` | Replace `window.print()` with PDF-through-iframe logic |
| `src/archetypes/connect-match.tsx:165,179,263`   | `min-h-[76px]` + dynamic `rowHeight`                   |
| `src/visual-models/everyday-objects.tsx:224`     | Add `"tiny"` size tier (28–32px)                       |
| `src/visual-models/registry.tsx:62-111`          | Use `"tiny"` when `total >= 4`                         |
| `src/pdf/print-document.ts:104`                  | `min-height: 76px`                                     |
| `src/components/studio/StudioPanel.tsx:840`      | Add `no-print` to mobile bar                           |

## Related

- ADR: `docs/adr/0011-print-via-pdf-iframe.md`
- Glossary: Added **Subitize Grouping** term
- Audit images: `output/download/` and `output/print/`
