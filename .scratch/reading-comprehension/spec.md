# Feature Spec: Reading Comprehension Club (نادي القراءة والفهم القرائي)

Status: resolved

## Problem Statement

Teachers and parents currently use the platform exclusively for mathematics worksheet generation. However, teaching early reading and reading comprehension in Arabic after the foundational phonics phase (ما بعد مرحلة التأسيس) presents distinct challenges:

- Existing tools treat reading comprehension as either a passive question bank or an unguided silent test.
- Instructors lack a structured, step-by-step interactive partner (co-pilot) that models evidence location, teaches inductive grammar naturally from text, and protects children from cognitive overload.
- Printed reading materials are often cluttered, lack standard A4 alignment, or fail to balance reading text with question-answer relationships (QAR).
- Teachers frequently fall into common pedagogical traps (e.g., mistaking decoding pauses for reading errors, penalizing colloquial understanding over meaning, or turning every reading session into an exam).

## Solution

Extend the platform under the unified identity **أُسُس (Usus)** with a dedicated **Reading Comprehension Club** module alongside the Mathematics module. The solution provides:

1. A clean domain-selection hub page at the application root allowing instructors to choose between Mathematics and Reading.
2. A comprehensive 12-story curriculum for Level 1 ("الانطلاق وبناء المعنى") structured around 50–75 word Arabic stories.
3. An interactive Story Cycle session runner walking teacher and student through six pedagogical stations: First Read, Guided Read, QAR Questions, Inductive Grammar Lab, Expression Ladder, and Post-Review.
4. An evidence locator ("أين يعيش الجواب؟") visually demonstrating where answers reside within the text.
5. An adjustable Scaffold Engine that lets teachers calibrate Tashkeel levels, sight word highlighting, and hint depths in accordance with the "one-variable-at-a-time" rule.
6. A cozy "Reading Nook" view for free-reading sessions completely free of questions, testing, or UI chrome to foster reading for pure pleasure.
7. A strict "Transfer Test" mode locking all scaffolds to verify independent mastery on unseen texts.
8. A collapsible Teacher Shield drawer providing blind-spot guardrails and one-click session tracking persisted to local storage.
9. Pixel-perfect, zero-overflow printable A4 worksheets in three specialized variants: standard comprehension sheets, free-reading sheets, and transfer-test sheets.

## User Stories

1. As a teacher opening the platform, I want a clean Arabic home hub, so that I can immediately choose between Mathematics and Reading Comprehension.
2. As a teacher in the Reading module, I want to see a clear overview of available Reading Levels, so that I understand the curriculum trajectory.
3. As a teacher with a new student, I want an interactive starting-point diagnostic questionnaire, so that I can determine which reading level fits the student's current proficiency.
4. As a teacher selecting Level 1, I want a grid of all 12 story cycles with distinct visual badges (standard, free-reading 🌟, transfer-test 🎯), so that I can browse and launch any session quickly.
5. As an instructor launching a standard story cycle, I want a 6-station stepper, so that I can guide the child through a structured 20–25 minute pedagogical routine.
6. As a teacher in Station 1 (First Read), I want the Arabic story displayed in a clear, large Naskh font with diacritics, so that the child can focus on meaning without premature interruptions.
7. As an instructor in Station 1 and 2, I want to toggle Tashkeel levels (full, partial, none), so that I can adjust decoding support based on the child's needs.
8. As a teacher in Station 2 (Guided Read), I want target sight words highlighted with customizable styles (color, underline, off), so that the student builds automatic visual word recognition.
9. As an instructor moving to Stations 3 through 6, I want a condensed, expandable story text pinned at the top, so that the text remains referenced without occupying excessive screen space.
10. As a student answering comprehension questions in Station 3, I want questions classified by relationship (direct, inferential, creative), so that I learn how different types of answers are derived.
11. As a teacher facilitating Station 3, I want a per-question evidence toggle ("أين الدليل؟"), so that I can visually highlight the exact textual snippet that proves the answer.
12. As a teacher in Station 4 (Inductive Grammar Lab), I want step-by-step example discovery prompts before rule labeling, so that the child deduces grammar rules inductively from story context.
13. As an instructor in Station 5 (Expression), I want prompts aligned with the Production Ladder (from oral response to written sentence), so that expressive output is requested gradually.
14. As a teacher in Station 6 (Review), I want to see a summary of the session and a direct link to the next connected story, so that continuity is maintained.
15. As a child entering a Free-Reading session (Story 4 or 10), I want to experience a cozy "Reading Nook" page devoid of questions, tests, or stepper bars, so that I read purely for the joy of literature.
16. As a teacher conducting a Transfer-Test session (Story 6 or 12), I want all scaffolds permanently locked to off and an assessment badge displayed, so that independent mastery is measured accurately.
17. As an instructor during any session, I want a collapsible Teacher Shield drawer accessible on demand, so that I can review blind-spot warnings and modeling scripts without losing my place.
18. As a teacher completing a session, I want a quick one-click tracking matrix to record assistance level and comprehension rating in local storage, so that I can track progress across sessions on my device.
19. As a teacher preparing for class, I want a print button generating a standard A4 worksheet combining the story, 3-tier QAR questions, and the grammar lab within a 275mm vertical budget, so that it prints on a single page without overflow.
20. As a teacher preparing for a free-reading session, I want to print an A4 sheet containing only the story text in large Naskh font, so that the student has a distraction-free physical reading page.
21. As a teacher preparing for a transfer test, I want to print an A4 test sheet devoid of sight word colors or hints, so that the assessment is standardized.
22. As an existing user of the Mathematics module, I want the math worksheet studio accessible at `/math` with a subtle navigation breadcrumb back to the hub, so that all existing math workflows remain intact.

## Implementation Decisions

- **Platform Branding & Identity**: The platform is branded as **أُسُس (Usus)**. All references to third-party names (including Tang) are strictly omitted while preserving the underlying pedagogical principles.
- **Architectural Seam**: The application uses Next.js App Router file-based routing. The home page (`/`) serves as the domain hub; Mathematics lives at `/math`; Reading lives at `/reading`. Each domain manages its own layout and session workflow independently while sharing core print utilities, font configurations, and RTL constraints.
- **Color Systems**: Mathematics is styled with an **Indigo** primary theme; Reading is styled with an **Emerald** primary theme. The Free-Reading "Reading Nook" adopts a warm parchment/stone aesthetic.
- **Typography**: Story narratives render in the **Amiri** (Naskh) font to provide authentic pedagogical readability for young Arabic readers. Platform chrome, navigation, and badges utilize **Cairo** and **Readex Pro**.
- **Reading Data Model**: All Reading Level 1 curriculum data (12 story cycles, story texts, word counts, target sight words, 3-tier QAR questions with text evidence snippets, inductive grammar structures, and teacher guidance scripts) is structured statically in a dedicated curriculum module.
- **Scaffold Engine**: Dynamic controls for Tashkeel (full, partial, none), sight word highlighting (colored, underlined, none), and QAR hints are contextualized per station rather than presented as a global toolbar.
- **Evidence Highlighting**: Activating "أين الدليل؟" queries the active question's evidence snippet and applies inline visual highlighting to the pinned story element.
- **Print Engine Alignment**: Reading print styles reuse the established `@page { size: A4 portrait; margin: 0 }` rules, enforcing zero vertical overflow (< 275mm height) and omitting interactive UI elements using print-specific utility classes.
- **Data Persistence**: Teacher session notes and tracking matrix records are persisted in browser `localStorage`, supporting instant retrieval and client-side PDF export without requiring external user accounts or backend services.

## Testing Decisions

- **Testing Philosophy**: Tests must exercise external behavior and user-visible outcomes rather than implementation details or internal component state. Tests verify rendered text, visual presence of scaffolds, correct text transformations, and navigation accessibility.
- **Modules Tested**:
  1. _Reading Curriculum Catalog_: Validates complete data integrity across all 12 stories in Level 1, ensuring required fields (target words, questions, evidence snippets, grammar steps) are populated and correctly formatted.
  2. _Story Cycle & Station Renderer_: Validates station switching, scaffold state changes (Tashkeel stripping, sight word wrapping), pinned story visibility, Reading Nook rendering, and Transfer Test scaffold locking.
  3. _QAR Evidence Locator_: Tests that triggering the evidence action correctly maps the snippet to the story text.
  4. _Print Surface Integrity_: Validates that standard, free-reading, and transfer-test print modes render valid markup complying with print classes and A4 structure.
  5. _Navigation & Hub Integration_: Tests route rendering, breadcrumbs, and domain transitions between Hub, Math, and Reading.
- **Prior Art**: Reuses testing conventions established in `tests/primary-seam.test.ts` and `tests/ticket-06-studio-and-pdf.test.ts`.

## Out of Scope

- Audio text-to-speech (TTS) or pre-recorded audio models (deferred to future phases; teacher models aloud).
- Levels 2 and 3 story content generation (the architectural support is established, but Level 1 is the focus of this build).
- Cloud user authentication, multi-tenant databases, or server-side student profiles.
- Automatic scoring or natural language processing of student written answers.

## Further Notes

- All numeral displays in the reading module conform to Eastern Arabic Numerals (`٠١٢٣٤٥٦٧٨٩`) per ADR-0001, except within system IDs.
- Story word counts and text lengths in Level 1 strictly adhere to the 50–75 word limit to avoid cognitive fatigue in the target demographic.
