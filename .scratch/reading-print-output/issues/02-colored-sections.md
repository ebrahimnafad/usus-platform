# 02: Colored Sections and Visual Richness

**What to build:** The three sections of the Reading printable worksheet — 📖 Story, 🔍 QAR Questions, 🧩 Grammar Lab — each have a visually distinct colored left-border and lightly tinted background, transforming the output from monochrome plain text into a richly designed workbook page. The emoji icons (📖🔍🧩) remain the primary section differentiators so the worksheet is legible on B&W printers; color is enhancement, not the only signal.

**Blocked by:** 01: Print Isolation (print must be isolated before visual work makes sense — otherwise you're styling content buried under leaked screen UI).

**Status:** ready-for-agent

- [ ] Story section (📖) renders with an emerald-400 left border and emerald-50/40 tinted background
- [ ] QAR section (🔍) renders with a sky-400 left border and sky-50/40 tinted background
- [ ] Grammar Lab section (🧩) renders with a violet-400 left border and violet-50/40 tinted background
- [ ] The uniform `border-slate-300` on all sections is replaced with section-specific colors
- [ ] `print-color-adjust: exact` (already in `globals.css` base layer) ensures tinted backgrounds print faithfully on color printers
- [ ] New test: rendering `PrintableReadingSheet` for a standard story confirms the story section HTML contains emerald border/bg classes, QAR contains sky classes, grammar contains violet classes
- [ ] Free-reading variant still renders its amber-themed story-only layout (no regression)
- [ ] Transfer-test variant renders with the 🎯 badge alongside the standard colored sections
- [ ] Eastern Arabic Numerals invariant holds
