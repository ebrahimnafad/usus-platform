# 0017 - Client-Side Print Modal, Eradicating Download PDF, and Header QR Links

## Context

Previously, clicking `طباعة` fetched `/api/pdf` (launching a headless Edge browser via Playwright per ADR-0011), while `تحميل PDF` pointed to the same slow endpoint. Launching Playwright on every print or download took several seconds, could not print an entire Unit in one fast action, and offered no print customization (Color vs. B&W, Lesson vs. Unit, Difficulty/Seed). Additionally, printed student Worksheets lacked a direct, instant way for teachers or parents to jump to the exact Answer Key or Teacher Notes on a phone.

## Decision

1. **Eradicate `تحميل PDF` from the Teacher Studio toolbar**: Modern browsers provide "Save as PDF" natively inside the print dialog, so the separate `تحميل PDF` link (`data-pdf-download`) is removed from `StudioCanvas`.
2. **Instant client-side HTML print iframe + Print Options Modal**: Clicking `طباعة` opens a responsive Print Options Modal supporting:
   - **Scope**: Current Lesson (`الدرس الحالي`) or Entire Unit (`الوحدة كاملة`, printing all authored lessons in the unit via `/api/print-html`).
   - **View**: Worksheet (`ورقة العمل`), Answer Key (`مفتاح الإجابة`), or Both (`الاثنان معاً`).
   - **Color Mode**: Full Color (`ملوّن`) or Ink-Saving B&W (`أبيض وأسود`).
   - **Difficulty Mode & Seed**: Live-synced with the Teacher Studio so teachers can adjust difficulty or generate a new Seed right before printing.
     Printing injects clean A4 HTML (`PRINT_CLEAN_A4_CSS` + `worksheet-page` `@page` rules) into a hidden same-origin iframe and calls `iframe.contentWindow.print()`, completing in milliseconds without Playwright.
3. **Two compact inline-SVG QR codes in the Worksheet Header**: Every student Worksheet renders two 44×44 px inline-SVG QR codes with 12 px Arabic labels (`الإجابة` and `للمعلم`) on opposite edges of the header, pointing to a lightweight, mobile-responsive quick-view route `/q/[gradeId]?lesson=...&seed=...&difficulty=...&view=...`.
4. **Reading Comprehension (`نادي القراءة`) parity**: `StoryCycleRunnerClient` and `FreeReadingNook` replace direct `window.print()` with `ReadingPrintModal` backed by `/api/reading-print-html` and `printHtmlInIframe` (supporting single story vs. entire level, Student Sheet / Answer Key / Both, Color vs. B&W, Tashkeel mode, and `includeStoryText`), and `PrintableReadingSheet` renders opposite-edge header QR codes (`للمعلم` and `الإجابة`, with `للمعلم` only for `free_reading`) linking to `/reading/q/[levelId]`.

## Consequences

- **Supersedes ADR-0011** and amends `WORKSHEET_CONSTITUTION.md` §2.4 and §5.1.
- Printing a single lesson or an entire unit is near-instantaneous and works offline-friendly once loaded.
- `/api/pdf` and `pdf-exporter.ts` remain available for automated layout-guard tooling without slowing down teacher workflows.
