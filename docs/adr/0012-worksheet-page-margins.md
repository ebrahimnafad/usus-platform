# Worksheet print pagination uses named-page margins

The math worksheet's print CSS used `@page { margin: 0 }` and pushed the A4 padding onto the single `.a4-sheet` flex container. That works for a one-page sheet, but the padding exists only at the start and end of the box, not on each printed page. Continuation pages therefore printed edge-to-edge: exercise borders and labels were cut at the top and bottom, and the `break-inside: avoid` exercises were dropped by Chromium when the tall flex sheet fragmented. A second coordination bug left section headers (تدرب / تحدٍ وتقييم) alone at the bottom of a page while their exercises started on the next page.

We now declare a named page for the worksheet:

```css
@page worksheet-page {
  size: A4 portrait;
  margin: 10mm 10mm 14mm;
  @top-center {
    content: "…grade • lesson • seed…";
  }
  @bottom-center {
    content: "صفحة " counter(page, arabic-indic) " من "
      counter(pages, arabic-indic);
  }
}
```

The worksheet article sets `page: worksheet-page`, switches to block flow in print (no `display: flex`, no fixed `width: 210mm`, no `padding: 10mm`), and keeps each section header with its first exercise via `break-after: avoid`. The in-flow footer is screen-preview only; printed pages get identity and page numbers from the margin boxes.

## Considered Options

- **Keep zero margins and add fixed-position padding on every page**: Chromium's fixed-element positioning inside paged media is unreliable and page counters do not work in normal flow, so this could not produce correct page numbers.
- **Pre-paginate exercises into individual 297mm page containers**: gives complete control over page composition, but requires a second layout engine and duplicates the browser's fragmentation rules.
- **Use Playwright `displayHeaderFooter` templates**: reliable page numbers, but the `pageNumber` placeholders only emit Western digits, violating ADR-0001.
- **Leave the flex sheet and only shrink the scale**: hides some clipping but Chromium still drops exercises when the flex container fragments.

## Consequences

- Continuation pages have a 10mm top margin, 10mm side margins, and a 14mm bottom margin, so no content touches the paper edge.
- Printed pages carry an Eastern-Arabic page count and a running grade/lesson/seed header (page 1 suppresses the header because it already has the full illustrated header).
- Section headers can no longer be orphaned; a sheet may end earlier than before, trading some whitespace for readable grouping.
- Page numbers no longer come from the generated `pageNumberAr` string ("صفحة ١ من ١"), which was only correct for a single sheet. It remains the screen preview's label.
- This supersedes the "zero-margin `@page` rules" part of ADR-0011. Print/Download parity is still preserved because both paths use the same `/api/pdf` Playwright pipeline.
