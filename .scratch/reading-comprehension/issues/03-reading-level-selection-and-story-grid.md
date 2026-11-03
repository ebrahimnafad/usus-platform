# 03: Reading level selection and story grid browser

**What to build:**
The reading domain home page at `/reading` presenting available Reading Levels with an eye-catching diagnostic banner, and the level story browser at `/reading/level/[levelId]` showing all 12 story cycles in a responsive card grid. Teachers can scan story metadata (type badges, word counts, grammar goals) and launch any story cycle session.

**Blocked by:** 01: Hub page and domain route migration, 02: Reading Level 1 curriculum catalog and diagnostic questionnaire

**Status:** ready-for-agent

- [ ] Route `/reading` displays a prominent top banner inviting instructors to take the starting-point diagnostic tool (`/reading/diagnostic`).
- [ ] Route `/reading` renders horizontal cards for reading levels, highlighting Level 1 ("الانطلاق وبناء المعنى") with emerald theming and metadata (12 stories, 50–75 words).
- [ ] Clicking Level 1 navigates to `/reading/level/read_l1` (or `/reading/level/1`).
- [ ] Route `/reading/level/[levelId]` displays a responsive grid of 12 story cards.
- [ ] Each story card clearly displays the story number, title, word count, core grammar goal, and visual type badge (standard, 🌟 قراءة حرة للمتعة, 🎯 اختبار النقل).
- [ ] The level browser includes breadcrumb navigation (`الرئيسية > القراءة > المستوى الأول`) linking back to parent pages.
- [ ] Clicking any story card navigates to the story cycle runner for that story.
