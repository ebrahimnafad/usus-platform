# 06: Interactive 2-Pane RTL Teacher Studio & Headless Browser A4 PDF Export

**What to build:** The complete 2-pane RTL Arabic **Teacher Studio** web interface (Grade `K–5` switcher, searchable `Unit`/`Lesson` accordion with `Standard`, `تقديم مشترك`, and `إثرائي` badges, clickable **Prerequisite** navigation chips inside **Teacher Notes**, **Difficulty Level** and **Seed** regeneration controls, zoomable A4 preview tabs for **ورقة العمل** / **مفتاح الإجابة** / **ملاحظات المعلم**) and the server-side **Playwright headless Chromium A4 PDF export** (`تحميل PDF`) with full-color `print-color-adjust: exact` rendering.

**Blocked by:** 01: End-to-End Tracer Bullet — K–5 Curriculum Catalog, Seeded Worksheet Engine, A4 Renderer & Lesson K-1 (`Match Objects`)

**Status:** ready-for-agent

- [ ] Teachers can switch between all 6 **Grades** (`الروضة K` through `الصف ٥`), expand all 12 **Units** per grade, search/filter **Lessons** by title or **Standard** code, and see `تقديم مشترك` (Co-presented) and `إثرائي *` (Enrichment) badges in the RTL sidebar.
- [ ] Teachers can switch live preview tabs between **ورقة العمل** (**Worksheet**), **مفتاح الإجابة** (**Answer Key**), and **ملاحظات المعلم** (**Teacher Notes**), and click any **Prerequisite** chip in **Teacher Notes** to navigate directly to that prerequisite **Lesson**.
- [ ] Teachers can change the **Difficulty Level** (`متدرج`, `سهل`, `متوسط`, `متقدم`) or click `توليد نموذج جديد 🎲` to mint a new **Seed**, updating the URL query parameters and the live A4 preview deterministically.
- [ ] Clicking `تحميل PDF` renders the dedicated print-clean A4 route via Playwright (headless Chromium) with `@page { size: A4 portrait; margin: 0; }` and `print-color-adjust: exact`, returning a downloadable A4 PDF for the **Worksheet** or **Answer Key** that fits within the 1–2 page budget without splitting any **Exercise**.
- [ ] Automated tests verify studio navigation/state controls and run an integration check against the headless browser PDF exporter confirming valid A4 `%PDF-` output.
