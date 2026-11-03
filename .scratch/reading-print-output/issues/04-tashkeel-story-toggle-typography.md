# 04: Tashkeel-Aware Print with Story Toggle and Level Typography

**What to build:** The printed Reading worksheet becomes tashkeel-aware and typography-scaled. The story text on the printable respects the teacher's current tashkeel screen selection (full / partial / none), and a small badge in the header indicates which mode is active (e.g., "تشكيل كامل"). Story text font size and line height scale by Reading Level: Level 1 uses generous 22px/2.6 (early decoders), Level 2 uses 19px/2.3 (growing fluency), Level 3 uses 16px/2.1 (fluent readers). A "مع نص القصة" checkbox next to the 🖨️ button lets the teacher exclude the story section from the printable when children read from screen. This ticket wires the new props (`tashkeelMode`, `includeStoryText`) from `StoryCycleRunnerClient` through to `PrintableReadingSheet`.

**Blocked by:** 01: Print Isolation (needs the clean print surface), 02: Colored Sections (story section styling must exist before typography scaling is applied to it).

**Status:** done

- [x] `PrintableReadingSheet` accepts a `tashkeelMode` prop (`"full" | "partial" | "none"`) and renders the story text with the corresponding tashkeel transformation
- [x] The header displays a tashkeel level badge (e.g., "تشكيل كامل", "تشكيل جزئي", "بدون تشكيل") reflecting the passed mode
- [x] `PrintableReadingSheet` accepts an `includeStoryText` prop — when `false`, the 📖 Story section is omitted entirely; QAR and Grammar sections still render
- [x] `StoryCycleRunnerClient` renders a "مع نص القصة" checkbox inline next to the 🖨️ print button, default checked
- [x] The checkbox state is wired as the `includeStoryText` prop to `PrintableReadingSheet`
- [x] The existing `tashkeelMode` state in `StoryCycleRunnerClient` is passed through to `PrintableReadingSheet`
- [x] Story text renders at 22px / line-height 2.6 when the level is Level 1
- [x] Story text renders at 19px / line-height 2.3 when the level is Level 2
- [x] Story text renders at 16px / line-height 2.1 when the level is Level 3
- [x] The tashkeel text transformation logic is extracted into a shared utility (not duplicated between station components and the printable)
- [x] New test: render with `tashkeelMode="full"` → assert "تشكيل كامل" badge in HTML
- [x] New test: render with `tashkeelMode="none"` → assert "بدون تشكيل" badge in HTML
- [x] New test: render with `includeStoryText={false}` → assert story section absent, QAR and grammar present
- [x] New test: render with Level 1 → assert `text-[22px]` class on story text container; Level 3 → assert `text-[16px]`
- [x] Eastern Arabic Numerals invariant holds
