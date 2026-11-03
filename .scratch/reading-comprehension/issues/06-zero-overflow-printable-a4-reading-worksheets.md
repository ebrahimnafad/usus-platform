# 06: Zero-overflow printable A4 reading worksheets

**What to build:**
Direct header print functionality producing pixel-perfect, single-page A4 reading worksheets conforming to the strict vertical budget (< 275mm) and zero-overflow guarantee. Implements three distinct print layouts based on story type: Standard (story text + 3-tier QAR questions + grammar lab), Free-reading (large story text only), and Transfer-test (clean assessment layout with no visual scaffolds).

**Blocked by:** 04: Interactive Story Cycle runner and Scaffold Engine

**Status:** ready-for-agent

- [ ] A dedicated print button in the story cycle header triggers standard browser print dialog (`window.print()`).
- [ ] In print mode, all application navigation, steppers, teacher drawer, buttons, and chrome are hidden (`no-print`).
- [ ] Standard stories print on a single A4 page containing:
  - Header: Platform title, student name line, date, and story title.
  - Story text: Large, clear Arabic Naskh font with diacritics.
  - QAR section: 3 questions with lined response spaces (10mm baseline).
  - Language lab: Inductive grammar examples, rule summary, and production line.
- [ ] Free-reading stories print a single A4 page containing only the header and the story text in generous, comfortable print typography with no questions or grammar box.
- [ ] Transfer-test stories print the comprehension and grammar sections without any target word highlighting or strategy hints.
- [ ] All print layouts strictly observe the < 275mm height ceiling, guaranteeing zero extra blank pages across standard A4 printers.
- [ ] Tests verify that print-specific markup and classes are correctly emitted for all 3 story variants.
