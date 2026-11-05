# Worksheets print at full scale; layouts are designed to fit, never shrunk

The PDF exporter used to scale a worksheet down (to a 0.75 floor, retrying at 0.65) so it would fit the page budget. That silently broke the fixed size standard: a 48×48 px Answer Slot printed at about 36 px, and five-frame cells and Number Bonds shrank with it, so no two worksheets had the same physical sizes. We now always print at scale 1.0 with a hard limit of 2 A4 pages. A worksheet that does not fit is treated as a design error in its Lesson Blueprint (fewer or narrower exercises), and an automated layout guard catches it before release. This supersedes the scale-budget step of the print-pagination fix; the named-page margins from ADR-0012 still apply.

## Considered Options

- **Keep shrink-to-fit with a higher floor (e.g. 0.9)**: smaller distortion, but sizes still vary from sheet to sheet, so no size can be guaranteed on paper.
- **Allow 3+ pages instead of shrinking**: keeps sizes but breaks the 1-page-default / 2-page-maximum printing budget teachers rely on.

## Consequences

- Every fixed size (Answer Slot, five-frame cell, Number Bond, card column widths) is also its printed size, so it can be verified.
- Authored lessons that only fit because they were shrunk (e.g. K-8 at 3 pages) must have their blueprints trimmed.
