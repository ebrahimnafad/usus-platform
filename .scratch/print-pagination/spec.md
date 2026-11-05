# Print Pagination — Audit & Fix

**Triage:** ready-for-agent

## Context

Audit of the K-8 worksheet (`الروضة`, الدرس ٨, seed `K1-2026`, scaffolded) exported through the download/print pipeline. The delivered PDF was 4 A4 pages; the in-progress pipeline produced 3 pages but silently dropped exercises. Both outputs violated the zero-clipping and section-coordination standard.

## Findings

### F1 — Exercises were dropped during pagination (critical)

The `.a4-sheet` was `display: flex` with `justify-content: space-between` and `min-height: 297mm`. Chromium cannot reliably fragment a tall flex container in print. With `break-inside: avoid` on each exercise, the 3-page output lost practice exercise ٢ (مثلث) and most of practice exercise ٤ (خماسي):

- Page 1 ended after the warm-up, leaving an empty framed practice shell.
- Page 2 started at exercise ٣ and cut exercise ٤ after its first lines.
- Page 3 started at challenge exercise ٥.

Evidence: `pdftotext` page dumps from `K-8 / K1-2026` before the fix; exercise prompts ٢ and ٤ were absent.

### F2 — Continuation pages printed edge-to-edge (critical)

`@page { margin: 0 }` plus padding on the single sheet meant only the first and last fragments received padding. On pages 2–4 the exercise cards touched the physical paper edge; their top borders, rounded corners, and top padding were cut. Raster analysis of the delivered 4-page PDF showed content at row 0 and the last row on every continuation page.

### F3 — Section headers were orphaned (critical)

`break-inside: avoid` applied to exercises but not to the section header. The «تدرب» header sat alone at the bottom of page 1 and «تحدٍّ وتقييم» alone at the bottom of page 3, while their exercises began on the following pages. The orphaned section containers drew an empty coloured box down to the page edge.

### F4 — Page numbering was false and not repeated (moderate)

Every page footer was rendered only once, at the end of the flow, with the engine's hard-coded `صفحة ١ من ١`. A 4-page export therefore claimed to be 1 of 1, and pages 1–3 had no footer or running identity.

### F5 — Scale budget measured the wrong page height (minor)

The exporter used `1122.5px` as the printable page height while the sheet had 8mm/10mm padding and the new named page reserves 10mm/14mm. The estimate therefore under-counted pages; the actual PDF page count was used as a correction, but the two-page budget was optimistic.

## Fix

1. **Named print page + real margins.** `WorksheetSurface` now declares `@page worksheet-page { margin: 10mm 10mm 14mm; ... }` and the article sets `page: worksheet-page`. `@page` margins apply to every fragment, eliminating edge clipping. ADR-0012 records the decision and supersedes the zero-margin clause of ADR-0011.
2. **Block flow in print.** `.a4-sheet[data-worksheet-surface="true"]` becomes `display: block`, `width: auto`, `min-height: 0`, `padding: 0`. Chromium now fragments the normal flow and no exercises disappear.
3. **Keep headers with content.** `[data-section-id] > div:first-child` gets `break-after: avoid`; `box-decoration-break: clone` closes the coloured section frame at a page break instead of leaving open rails.
4. **Running margin boxes.** The `@top-center` margin box shows grade • lesson • seed (answer-key label included) on pages 2+, suppressed on page 1. The `@bottom-center` box shows `صفحة` + `counter(page, arabic-indic)` + `من` + `counter(pages, arabic-indic)` on every page. The in-flow footer is hidden in print and remains the screen preview's single-sheet footer.
5. **Accurate scale budget.** The exporter measures against the 273mm printable page height (297mm − 10mm − 14mm) and keeps the 0.75 legibility floor; the 0.65 retry remains for >3-page outputs.

## Verification

K-8 / `K1-2026` / scaffolded, download path:

| Check                         | Before                        | After                       |
| ----------------------------- | ----------------------------- | --------------------------- |
| Page count                    | 3 (content missing)           | 3                           |
| Exercises present             | ١, ٣, ٥ (٢ and ٤ lost)        | ١–٥                         |
| Continuation-page top edge    | row 0 (clipped)               | 10mm margin                 |
| Continuation-page bottom edge | last row (clipped)            | 14mm margin + footer        |
| Section header placement      | orphaned                      | attached to first exercise  |
| Footer                        | `صفحة ١ من ١`, last page only | `صفحة ١–٣ من ٣`, every page |

Answer-key export for the same lesson is also 3 pages with `مفتاح الإجابة` in the running header.

Regression coverage: `tests/output-audit-fixes.test.ts` seams 9–10 assert the named page, margin boxes, Eastern-Arabic page counters, block-flow override, header `break-after`, and `box-decoration-break` clone.
