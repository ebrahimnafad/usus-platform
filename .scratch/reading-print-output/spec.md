# Reading Domain — Standalone Printable Worksheet

> **Triage**: `ready-for-agent`

## Problem Statement

When a teacher clicks **🖨️ طباعة ورقة العمل** in the Reading domain's Story Cycle Runner, the printed output is broken and unusable as a standalone document:

1. Screen UI controls (tashkeel toggle bar, station content, teacher guidance) leak into the print because `<main>` lacks `no-print` — consuming an entire wasted page of duplicated content.
2. The story text appears twice: once from the leaked screen view, once from the intended `PrintableReadingSheet`.
3. `maxHeight: 297mm` with `overflow-hidden` silently clips any content that overflows a single page instead of paginating.
4. Answer writing lines are 6mm tall — unusable for young children's handwriting.
5. The printable is monochrome plain text with no visual section differentiation, despite the Math domain having colored section borders and the ADR mandating "children's-book-grade" visual richness.
6. The page number is hardcoded to "صفحة ١/١" regardless of actual content length.
7. No tashkeel level indicator on the paper — a teacher can't tell which tashkeel setting was active when the sheet was printed.

The goal: a printable that works **standalone** — a parent or teacher picks it up off the printer and everything makes sense with no screen needed.

## Solution

Redesign `PrintableReadingSheet` as a richly-designed, standalone A4 workbook page with colored sections, level-appropriate typography, tier-scaled answer lines, and proper print isolation. The printed output should look like a page from a published children's workbook, not a screen capture.

## User Stories

1. As a teacher, I want the print button to produce **only** the worksheet — no screen UI controls, navigation bars, or station content — so that the paper is clean and professional.
2. As a teacher, I want the printed story text to use **reading-grade typography** appropriate for my students' level (larger for Level 1, denser for Level 3), so that young children can comfortably read from the paper.
3. As a teacher, I want each QAR question to have **enough writing space** scaled to its tier (1 line for مباشر, 2 for استنتاجي, 3 for إبداعي), so that children have room to write answers appropriate to the question depth.
4. As a teacher, I want the three worksheet sections (📖 Story, 🔍 QAR Questions, 🧩 Grammar Lab) to be **visually distinct** with colored borders and tinted backgrounds, so that each section is immediately identifiable.
5. As a teacher, I want the printed worksheet to show a **tashkeel level badge** matching my current screen setting, so that I know which tashkeel mode was active when the sheet was printed.
6. As a teacher, I want the printed story text to **respect my current tashkeel selection** (full, partial, or none), so that the paper matches the reading difficulty I intended for this session.
7. As a teacher, I want a **toggle next to the print button** to include or exclude the story text from the printable, so that I can print a response-only sheet when children read from screen or a separate book.
8. As a teacher, I want long worksheets (e.g., Level 3 stories) to **paginate naturally** across multiple pages without clipping content, so that nothing is silently lost.
9. As a teacher, I want **continuation pages** to carry a mini-header (platform name, level, story title, student name field, page number), so that loose pages can be identified if separated in a classroom.
10. As a parent receiving the worksheet, I want the paper to carry **clear identification** (level, story number, story title, tashkeel mode), so that I know what my child was working on without needing the app.
11. As a student, I want a **self-assessment strip** (3 stars: "كيف أحسست بأدائي؟") at the bottom of the questions, so that I can reflect on my own performance.
12. As a teacher, I want the worksheet sections to remain **legible on a B&W printer** — with emoji icons (📖🔍🧩) as primary differentiators and color as enhancement — so that the worksheet works on any classroom printer.
13. As a teacher, I want the **free-reading printable variant** to remain a story-only layout (no questions, no grammar), so that it preserves the joy-of-reading intent.
14. As a teacher, I want the **transfer-test printable variant** to carry its 🎯 badge and behave like the standard variant (story + questions + grammar), so that assessment worksheets are clearly marked.
15. As a teacher, I want the **grammar lab production prompt** to include a writing line even when the prompt is oral, so that students can practice writing the grammatical pattern (aligning with the Production Ladder: oral → written).
16. As a teacher, I want the **date field** to use Hijri format (`.... / .... / ١٤٤...هـ`), matching the standard for the primary target audience.
17. As a teacher, I want the printed worksheet to have **no QR code** — the paper is fully self-contained and a QR contradicts the standalone goal.
18. As a teacher, I want the print flow to be **frictionless** — clicking 🖨️ fires `window.print()` immediately with no dialog, deriving all settings from the current screen state.

## Implementation Decisions

### Architecture

- The Reading domain continues to use `window.print()` with CSS `@media print` — no Playwright server-side PDF for Reading. The Math domain's Playwright pipeline is architecturally separate and out of scope.
- `PrintableReadingSheet` remains the single print-visible component (`hidden print:block`). All screen-facing content in the Story Cycle Runner is hidden via `no-print`.
- The `<main>` element in `StoryCycleRunnerClient` receives the `no-print` class — this is the root fix that stops screen content from leaking into print.

### Props & Data Flow

- `PrintableReadingSheet` gains two new props:
  - `tashkeelMode: "full" | "partial" | "none"` — controls which tashkeel variant of the story text is rendered on the printable. The component applies the same tashkeel text transformation that the screen stations use.
  - `includeStoryText: boolean` — when false, the 📖 Story section is omitted entirely from the printable.
- `StoryCycleRunnerClient` owns the state for both props (tashkeel mode is already in state; story toggle is a new `useState`) and passes them down.

### Story Toggle UI

- A checkbox labeled "مع نص القصة" appears inline next to the 🖨️ print button. Default: checked.
- No print settings dialog. The toggle is persistent in screen state — the teacher sees it at the moment of decision.

### Pagination

- Remove `maxHeight: "297mm"` and `overflow-hidden` from `PrintableReadingSheet`. Let the browser paginate naturally.
- Sections use `break-inside: avoid` (already in `globals.css`) to prevent mid-section page breaks.
- Page numbering: use CSS `counter(page)` for the current page number. Total page count (`counter(pages)`) has limited browser support in `window.print()`, so the format is "صفحة ١" (current only), not "صفحة ١ من ٢".

### Continuation Page Mini-Header

- A single-line repeated header appears at the top of page 2+ via a `position: fixed` CSS trick or repeated structural element with `break-before: page`.
- Content: `أُسُس | المستوى ١ | عصفور سامي | الاسم: _____ | صفحة X`

### Visual Design — Section Colors

Three sections, each with a distinct left border and lightly tinted background:

| Section       | Emoji | Border      | Background    |
| ------------- | ----- | ----------- | ------------- |
| Story         | 📖    | emerald-400 | emerald-50/40 |
| QAR Questions | 🔍    | sky-400     | sky-50/40     |
| Grammar Lab   | 🧩    | violet-400  | violet-50/40  |

Emoji icons are the primary section differentiators (B&W safe). Color is enhancement, not the only signal.

### Typography — Story Text Scaling by Reading Level

| Level   | Font Size | Line Height | Rationale                                        |
| ------- | --------- | ----------- | ------------------------------------------------ |
| Level 1 | 22px      | 2.6         | Early decoders; generous, screen-like typography |
| Level 2 | 19px      | 2.3         | Growing fluency; intermediate density            |
| Level 3 | 16px      | 2.1         | Fluent readers; reference-grade density          |

### Answer Lines — Scaled by QAR Tier

| QAR Tier               | Lines | Height per Line | Rationale                           |
| ---------------------- | ----- | --------------- | ----------------------------------- |
| direct (مباشر)         | 1     | 12mm            | Short factual phrase                |
| inferential (استنتاجي) | 2     | 12mm each       | Full sentence answer                |
| creative (إبداعي)      | 3     | 12mm each       | Multiple sentences, deeper thinking |

Answer areas use lightly tinted backgrounds matching their section color (sky-50 for QAR).

### Self-Assessment Strip

- Placed after the grammar lab section (or after QAR if no grammar lab).
- Content: "كيف أحسست بأدائي؟" followed by 3 empty stars (☆ ☆ ☆).
- Visually lightweight — should not compete with content sections.

### Date Format

- Hijri: `.... / .... / ١٤٤...هـ` — matches the primary audience (Arabic-first, Gulf/Saudi school systems).

### Out of Scope Items Encoded as Decisions

- **No QR code** — the paper is standalone; a QR implies the paper isn't self-sufficient.
- **No teacher companion printable** — teachers use the screen for guidance (Teacher Shield drawer).
- **No print settings dialog** — frictionless is paramount for daily classroom use.

## Testing Decisions

### What makes a good test

Tests assert on **external observable behavior**: the HTML structure, class names, text content, and element presence/absence of the rendered component. Tests do NOT assert on internal state, implementation details, or CSS computed styles (which require a browser).

### Seam 1 (Primary): `PrintableReadingSheet` SSR render

Render `PrintableReadingSheet` with `renderToString()` and assert on the HTML output. This is the existing pattern in `reading-ticket-06-printable-sheets.test.ts`.

New test cases to add:

1. **Section colors**: Assert that story section has `emerald` border/bg classes, QAR has `sky`, grammar has `violet`.
2. **Answer line count by tier**: Assert that a `direct` question produces 1 answer line element, `inferential` produces 2, `creative` produces 3.
3. **Answer line height**: Assert `h-[12mm]` class on answer line elements (vs. current `h-6`).
4. **Typography scaling**: Render with Level 1 → assert `text-[22px]` on story text. Render with Level 3 → assert `text-[16px]`.
5. **Tashkeel badge**: Render with `tashkeelMode="full"` → assert "تشكيل كامل" badge in header. Render with `"none"` → assert "بدون تشكيل".
6. **Story text toggle**: Render with `includeStoryText={false}` → assert story section absent, QAR and grammar still present.
7. **No overflow-hidden**: Assert the `a4-sheet` container does NOT contain `overflow-hidden` class.
8. **No maxHeight**: Assert the rendered style does not include `max-height`.
9. **Self-assessment strip**: Assert "كيف أحسست بأدائي؟" and star characters present.
10. **Eastern Arabic Numerals invariant**: Existing check — `findWesternNumeralsInRenderedHtml()` returns empty array.
11. **Free-reading variant preserved**: Assert free-reading stories still render story-only layout with no QAR or grammar.
12. **Transfer-test variant**: Assert transfer-test badge present alongside standard question layout.

### Seam 2 (Secondary): `StoryCycleRunnerPage` SSR render

Render the full page with `renderToString()` and assert:

1. **`<main>` has `no-print`**: Assert `no-print` class is present on the main content wrapper.
2. **Props wired**: Assert that `PrintableReadingSheet` is present in the rendered output (already tested, extend if new props need verification via data attributes).

### Prior art

- `tests/reading-ticket-06-printable-sheets.test.ts` — exact same pattern (SSR render → HTML assertions). Extend this file with the new test cases.
- `tests/ticket-06-studio-and-pdf.test.ts` — same SSR render pattern for the Math domain.

## Out of Scope

- **Math domain print improvements** — hardcoded page number, scale-to-fit floor, and other Math-specific issues are separate tickets.
- **Playwright/server-side PDF for Reading** — the Reading domain stays on `window.print()`.
- **Teacher companion printable** — teachers use the screen for station guidance.
- **QR codes** — the paper is standalone.
- **Print settings dialog** — settings derived from screen state.
- **Parent portal / public story pages** — future feature, not part of this print redesign.
- **New exercise archetypes or QAR question changes** — content authoring is unchanged.

## Further Notes

- The `PrintableReadingSheet` component currently has 199 lines. The redesign will expand it but should remain a single component — it's a leaf renderer with no complex state, just prop-driven layout.
- The existing `globals.css` `@media print` rules (A4 page size, `no-print` hiding, `break-inside: avoid`) are shared infrastructure that both Math and Reading use. Changes to this file should be additive (CSS counter rules, continuation header styles) without breaking Math print output.
- The `tashkeelMode` state already exists in `StoryCycleRunnerClient` — the only new state is the `includeStoryText` boolean.
- The tashkeel text transformation logic already exists in the station components. It needs to be extracted into a shared utility so `PrintableReadingSheet` can reuse it without duplicating the logic.
