# 01: Print Isolation — Stop Screen Leak and Content Clipping

**What to build:** When a teacher clicks 🖨️ طباعة ورقة العمل in the Reading domain's Story Cycle Runner, the browser print output contains ONLY the `PrintableReadingSheet` component — no tashkeel toggle bar, no station content (story preview, teacher guidance), no navigation bars, no duplicated story text. Long worksheets (e.g., Level 3 stories with 150+ words) paginate naturally across multiple A4 pages instead of being silently clipped at 297mm. The teacher sees a clean, single-purpose worksheet the moment the print dialog opens.

**Blocked by:** None (can start immediately).

**Status:** done

- [x] The `<main>` element in `StoryCycleRunnerClient` carries the `no-print` class, hiding all station content (including `StationFirstRead`, `StationGuidedRead`, `StationQarQuestions`, `StationGrammarLab`, `StationExpression`, `StationReview`, and `PinnedStorySnippet`) from print output
- [x] `PrintableReadingSheet` no longer sets `maxHeight: 297mm` or `overflow-hidden` on its container — content that exceeds one A4 page flows naturally to subsequent pages
- [x] The `break-inside: avoid` rule (already in `globals.css`) prevents mid-section page breaks on the printable's story, QAR, and grammar sections
- [x] Existing tests in `reading-ticket-06-printable-sheets.test.ts` continue to pass
- [x] New test: rendering `StoryCycleRunnerPage` via SSR confirms the `<main>` wrapper contains the `no-print` class
- [x] New test: rendering `PrintableReadingSheet` via SSR confirms the container does NOT include `overflow-hidden` and does NOT include a `max-height` inline style
- [x] Eastern Arabic Numerals invariant holds across all rendered HTML
