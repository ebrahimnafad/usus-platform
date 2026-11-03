# 04: Interactive Story Cycle runner and Scaffold Engine

**What to build:**
The core interactive story-cycle session runner at `/reading/level/[levelId]/story/[storyId]`. Renders a horizontal 6-station stepper (First Read, Guided Read, QAR, Inductive Grammar, Expression, Review). Incorporates contextual scaffold controls (Tashkeel toggle, sight word highlighting, QAR hint depth), a pinned condensed story text during later stations, and an interactive "أين الدليل؟" evidence locator that highlights the exact textual evidence in the story text.

**Blocked by:** 03: Reading level selection and story grid browser

**Status:** ready-for-agent

- [ ] Route `/reading/level/[levelId]/story/[storyId]` loads and renders the active story session with a horizontal 6-station stepper.
- [ ] Teachers can freely switch between the 6 stations by clicking tabs or using step buttons.
- [ ] Story text renders in the authentic **Amiri** (Naskh) Arabic font with comfortable line spacing and child-friendly font size.
- [ ] Stations 1 & 2 display contextual Tashkeel toggles (full diacritics, partial, none) that transform the rendered text smoothly.
- [ ] Station 2 (Guided Read) provides target word highlighting controls (colored, underlined, off) for sight words.
- [ ] Stations 3–6 display a condensed, pinned version of the story text at the top of the screen that can be expanded if needed.
- [ ] Station 3 renders the 3 QAR comprehension questions, each accompanied by an interactive "🔍 أين الدليل؟" button.
- [ ] Clicking "أين الدليل؟" highlights the corresponding `textEvidenceSnippet` directly inside the pinned story text.
- [ ] Station 4 renders the Inductive Grammar Lab: step 1 (examples), step 2 (observation), step 3 (concept label), and step 4 (production prompt).
- [ ] Station 5 renders the Expression ladder prompt with support for oral-first acceptance.
- [ ] Station 6 displays the session completion summary and link to the next story.
- [ ] Component tests verify station switching, scaffold text transformations, and evidence snippet highlighting.
