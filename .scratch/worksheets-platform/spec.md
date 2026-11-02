# Worksheets Platform Specification

**Status:** ready-for-agent

## Problem Statement

Elementary mathematics teachers teaching Grades K–5 in Arabic need lesson-specific, pedagogically aligned, printable A4 **Worksheets** and **Answer Keys** that match the 810-lesson curriculum (6 **Grades** × 12 **Units** × 135 **Lessons** per grade). Currently, the curriculum exists only as English Markdown outlines describing each **Lesson**, its **Standards**, **Prerequisites**, and delivery guidance. Teachers lack a way to browse the curriculum in Arabic, view pedagogical **Teacher Notes**, and instantly generate vibrant, children's-book-grade full-color A4 **Worksheets** and mirrored visual **Answer Keys** using **Eastern Arabic Numerals** (`٠١٢٣٤٥٦٧٨٩`), rich SVG **Visual Models**, scaffolded or differentiated **Difficulty Levels**, and reproducible **Seeds**.

## Solution

Build a stateless, zero-login RTL Arabic web application (**Teacher Studio**) and deterministic worksheet generation engine that:
1. Parses and indexes the entire Grades K–5 curriculum hierarchy (**Grade** → **Unit** → **Lesson**, **Standards**, **Prerequisites**, co-presentation and enrichment metadata).
2. Provides a rich 2-pane RTL Arabic **Teacher Studio** where teachers browse **Grades**, **Units**, and **Lessons**, read localized **Teacher Notes** (with clickable **Prerequisite** navigation), preview live full-color A4 **Worksheets** and mirrored visual **Answer Keys**, switch **Difficulty Levels** (scaffolded progression or single-tier differentiation), regenerate randomized instances via a deterministic **Seed**, and export/print full-color A4 PDFs via a headless browser.
3. Implements a reusable generation architecture separating declarative per-lesson **Lesson Blueprints** from parameterized **Exercise Archetypes** and a rich library of full-color SVG **Visual Models**, delivering the complete end-to-end implementation of **Grade K Units 1–2 (Lessons 1–26)** alongside full K–5 curriculum browsing.

## User Stories

1. As a teacher, I want to view the entire application interface, navigation, instructions, and generated **Worksheets** in simplified Modern Standard Arabic (فصحى مبسطة), so that my students and I can use the platform naturally in an Arabic classroom.
2. As a teacher, I want every number across the UI, **Worksheets**, **Answer Keys**, and **Teacher Notes** (except alphanumeric **Standard** codes like `K.CC.3`) rendered exclusively in **Eastern Arabic Numerals** (`٠١٢٣٤٥٦٧٨٩`), so that all materials conform to our numeral system requirement.
3. As a teacher, I want to switch between all six **Grades** (`الروضة K` through `الصف ٥`) in the RTL sidebar, so that I can explore the curriculum for any elementary grade band.
4. As a teacher, I want to browse the 12 **Units** within a selected **Grade** and expand any **Unit** to see its ordered **Lessons** (`١–١٣٥`), so that I can quickly locate the topic I am teaching today.
5. As a teacher, I want to search or filter **Lessons** by keyword or **Standard** code (e.g., `K.CC.3`, `K.G.4`), so that I can find lessons aligned with a specific learning objective.
6. As a teacher, I want to see visual badges on **Lessons** that are marked as co-presented (`تقديم مشترك`) or enrichment (`إثرائي *`), so that I know how each **Lesson** fits into classroom pacing.
7. As a teacher, I want to view dedicated **Teacher Notes** for any selected **Lesson** on the web without those notes appearing on the printable student **Worksheet**, so that I get pedagogical guidance while keeping the student page uncluttered.
8. As a teacher, I want **Teacher Notes** to display clickable links to the **Lesson**'s **Prerequisites** (distinguishing compound `,` prerequisites from alternative `○` prerequisite paths), so that I can jump directly to foundational lessons if my students need remediation.
9. As a teacher, I want time-based classroom activities (such as flashing five frames for 3 seconds in subitizing lessons) explained clearly in **Teacher Notes** while the printable **Worksheet** adapts the objective into structured part-whole visual grouping **Exercises**, so that both live instruction and paper practice are pedagogically sound.
10. As a teacher, I want every generated **Worksheet** to follow a polished, full-color children's-workbook A4 layout with an illustrated header (showing **Grade**, **Unit**, **Lesson** number and Arabic title, **Standard** pills, student Name `الاسم`, Date `التاريخ`, and a self-check star box `كيف كان أدائي؟`), so that worksheets feel joyful and engaging for young learners.
11. As a teacher, I want every **Worksheet** organized into three color-coded, icon-badged **Sections**—🌟 **تهيئة** (Warm-Up), 🎨 **تدرّب** (Practice), and 🚀 **تحدٍّ وتقييم** (Challenge & Assessment)—so that students experience a predictable instructional flow on every sheet.
12. As a teacher, I want the **تهيئة** (Warm-Up) **Section** of a **Worksheet** to automatically pull 1–2 `Easy` **Exercises** from the **Lesson**'s primary authored **Prerequisite** **Lesson Blueprint** (and gracefully fall back to the current **Lesson**'s own `Easy` tier when no prerequisite exists or is authored yet), so that students activate prior knowledge before tackling new concepts.
13. As a teacher, I want the default **Worksheet** generation mode (`متدرج`) to progress across **Difficulty Levels**—from `Easy` in **تهيئة**, to `Intermediate` in **تدرّب**, to `Advanced` in **تحدٍّ وتقييم**—so that a standard worksheet scaffolds learning from entry to mastery.
14. As a teacher, I want the option to select a single target **Difficulty Level** (`سهل` Easy, `متوسط` Intermediate, or `متقدم` Advanced) before generating a **Worksheet**, so that I can print differentiated worksheets for struggling, on-level, or advanced students while keeping the same three-**Section** layout.
15. As a teacher, I want every generated **Worksheet** to be driven by a deterministic **Seed** displayed in the studio URL and printed in the A4 footer (`رمز النموذج`), so that I can reproduce or share the exact same randomized **Worksheet** and its matching **Answer Key** at any time without needing an account or database.
16. As a teacher, I want a "Regenerate" (`توليد نموذج جديد 🎲`) button that mints a fresh **Seed** and immediately updates the live A4 preview with new randomized numbers, shapes, and visual objects, so that I can create multiple distinct practice versions of the same **Lesson** in seconds.
17. As a teacher, I want to switch between three live view tabs in the studio—**ورقة العمل** (**Worksheet**), **مفتاح الإجابة** (**Answer Key**), and **ملاحظات المعلم** (**Teacher Notes**)—so that I can inspect student pages, solutions, and teaching tips side by side.
18. As a teacher, I want the **Answer Key** rendered as a mirrored A4 visual overlay of the student **Worksheet**—showing drawn matching curves, circled/sorted items, completed patterns, filled frames, traced numerals in a distinct accent style, and a **Strategy Hint** callout for each **Exercise**—so that I can grade visual K–5 work at a glance.
19. As a teacher, I want all mathematical equations (`٣ + ٢ = ٥`), pattern sequences, and five/ten frame cell fills to flow right-to-left (RTL) while multi-digit numbers (`١٢`, `١٠٠`) retain standard positional digit order (tens left, ones right), so that mathematical notation matches Arabic elementary curriculum standards.
20. As a teacher, I want every **Worksheet** to fit cleanly on 1 A4 page by default (with a strict maximum of 2 A4 pages for graphics-heavy lessons and zero **Exercises** split across page breaks), so that classroom printing is predictable and economical.
21. As a teacher, I want all **Visual Models** to render in vibrant full color (`print-color-adjust: exact`) while pairing colors with distinct shapes, patterns, and silhouettes, so that worksheets look like a premium full-color workbook and remain legible even if printed on a grayscale printer.
22. As a Grade K teacher teaching Lessons 1–4 (*Match Objects*, *Match Shapes*, *Match Solids*, *Match Coins*), I want `ConnectMatch` (**صل بخط**) **Exercises** that pair vibrant everyday SVG objects, 2D shapes, 3D solids (and real-world counterparts like a soup can, ice-cream cone, box, or ball), and localized metallic coins (`١`, `٥`, `١٠`, `٢٥`, `٥٠`), so that students build 1-to-1 correspondence and comparison skills.
23. As a Grade K teacher teaching Lessons 5–8 (*Sort and Group 2D Shapes*, *Sort and Group 3D Solids*, *Sort by Size*, *Sort by Orientation*), I want `ClassifyAndCount` (**صنّف وحوّط وعدّ**) **Exercises** where 2D shapes and 3D solids vary in color, size, and rotation angle and students group matching shapes and compare part counts against the whole, so that students distinguish defining attributes from non-defining attributes and build part-total thinking.
24. As a Grade K teacher teaching Lessons 9–11 (*Patterns Forward with 2 Objects*, *Patterns Forward with 3 Objects*, *Patterns Backward*), I want `PatternComplete` (**أكمل النمط**) **Exercises** that present RTL visual sequences (`AB` and `ABC`) with shapes, solids, or icons where either the last item (working forward) or the first item (working backward) is missing, so that students develop flexible algebraic reasoning.
25. As a Grade K teacher teaching Lessons 12–16 (*Model and Trace Numbers to 5* using Five Frames, Snap Cubes, Tally Marks, Dice Patterns, and Circular Arrangements), I want `ModelCountAndTrace` (**عدّ ومثّل وتتبّع الرقم**) **Exercises** that pair each specific SVG **Visual Model** with custom dotted-stroke SVG numeral tracing guides (`١–٥`) showing starting dots and directional arrows, so that students connect concrete/pictorial quantities to written digits.
26. As a Grade K teacher teaching Lessons 17–19 (*Match Quantities to 5* with Objects, Shapes/Solids, and Coins & Digits), I want `ConnectMatch` and quantity-matching **Exercises** linking grouped objects, 2D/3D shapes, and localized coins (counted as units of `١`) to the digits `١–٥`, so that students transition from counting to subitizing groups within groups.
27. As a Grade K teacher teaching Lessons 20–21 (*Horizontal Picture Graphs to 5* and *Vertical Picture Graphs to 5*), I want `PictureGraphRead` (**اقرأ التمثيل البياني بالصور**) **Exercises** displaying colorful horizontal rows or vertical columns of SVG icons with digit tracing/writing boxes and comparison prompts ("أيهما أكثر بـ ١؟ / أقل بـ ١؟"), so that students read data visually and compare quantities.
28. As a Grade K teacher teaching Lessons 22–24 (*Count Forward to 5*, *Count Backward from 5*, and *Number Zero*), I want `SequenceAndZero` (**العدّ التصاعدي والتنازلي والعدد صفر**) **Exercises** showing increasing/decreasing snap-cube and object sequences (`١→٥` and `٥→١`) and crossed-out five-frame stories leaving `٠`, so that students understand number order and the concept of zero.
29. As a Grade K teacher teaching Lessons 25–26 (*Subitize to 5 Part I & II*), I want `SubitizePartWhole` (**اعرف العدد بسرعة: الأجزاء والكل**) **Exercises** using structured five frames and dot clusters that highlight *filled part + missing/second part = ٥*, so that students master combinations of `٥` visually without counting one by one.
30. As a teacher, I want to download a server-rendered A4 PDF of the **Worksheet** or **Answer Key** (or trigger browser print) with one click, where the PDF matches the live browser preview pixel-for-pixel.

## Implementation Decisions

1. **Unified Full-Stack TypeScript & Next.js Architecture**:
   - Build the application using TypeScript, Next.js (App Router), and Tailwind CSS so that the browser-based **Teacher Studio** preview and the headless-browser PDF renderer share the exact same React/SVG rendering pipeline and CSS `@page` rules.
   - Configure Arabic typography using geometric, child-friendly web fonts (**Cairo** and **Readex Pro**) loaded reliably for both client preview and headless PDF rendering.

2. **Curriculum Parser & Catalog Module**:
   - Parse the six curriculum Markdown files (`Grade K` through `Grade 5`) into an in-memory, strongly typed curriculum catalog containing every **Grade**, **Unit**, **Lesson**, **Standard** list, **Prerequisite** expression (preserving `,` compound and `○` alternative path structure), `isCoPresented` flag, `isEnrichment` flag, English source description, and localized Arabic title/notes.
   - Provide full Arabic localization (titles, **Teacher Notes**, **Strategy Hints**, and classroom delivery guidance) for Grade K Units 1–2 (Lessons 1–26), plus localized **Grade** and **Unit** navigation across all Grades K–5.

3. **Deterministic Seeded PRNG & Reproducibility Module (`ADR-0002`, `ADR-0004`)**:
   - Implement a pure, deterministic pseudo-random number generator initialized from a human-readable alphanumeric **Seed** (plus lesson identifier and section/exercise index).
   - Provide helpers for deterministic integer ranges, array shuffling, non-repeating picks, color/theme selection, and shape/orientation perturbation.
   - Guarantee that generating a **Worksheet** and an **Answer Key** with the same `(grade, lessonNumber, seed, difficultyLevel)` produces the exact same **Exercises** and solutions.

4. **Eastern Arabic Numerals Formatter (`ADR-0001`)**:
   - Centralize numeral formatting so every number, count, coin denomination, page number, and equation value is converted to **Eastern Arabic Numerals** (`٠١٢٣٤٥٦٧٨٩`).
   - Keep **Standard** codes (such as `K.G.4`, `K.CC.3`) in their canonical alphanumeric form.
   - Enforce RTL flow for equations, pattern rows, and five-frame cells while keeping standard positional digit order for multi-digit numbers (`١٢`, `١٠٠`).

5. **Two-Tier Generation Engine: `Lesson Blueprints` + `Exercise Archetypes` (`ADR-0005`)**:
   - Define a single deep module entry point for worksheet generation that accepts `{ grade, lessonNumber, seed, difficultyLevel? }` and returns a complete structured document containing header metadata, **Teacher Notes**, and the three canonical **Sections**:
     - 🌟 **تهيئة** (Warm-Up): Resolves the first authored **Prerequisite** **Lesson Blueprint** (preferring the primary path before `○`) and generates 1–2 `Easy` **Exercises** from it; if the lesson has no prerequisite or its prerequisite blueprint is not authored yet, falls back to the current lesson's `Easy` tier.
     - 🎨 **تدرّب** (Practice): Generates 3–4 core **Exercises** (`Intermediate` in default scaffolded mode, or clamped to the teacher's selected **Difficulty Level**).
     - 🚀 **تحدٍّ وتقييم** (Challenge & Assessment): Generates 1–2 deeper reasoning/application **Exercises** (`Advanced` in default scaffolded mode, or clamped to the selected **Difficulty Level**).
   - Implement the 7 reusable **Exercise Archetypes** for Grade K Units 1–2:
     1. `ConnectMatch` (صل بخط)
     2. `ClassifyAndCount` (صنّف وحوّط وعدّ)
     3. `PatternComplete` (أكمل النمط)
     4. `ModelCountAndTrace` (عدّ ومثّل وتتبّع الرقم)
     5. `PictureGraphRead` (اقرأ التمثيل البياني بالصور)
     6. `SequenceAndZero` (العدّ التصاعدي والتنازلي والعدد صفر)
     7. `SubitizePartWhole` (اعرف العدد بسرعة: الأجزاء والكل)
   - Author all 26 declarative **Lesson Blueprints** for Grade K Units 1–2 (Lessons 1–26), mapping each lesson's specific pedagogical focus, visual models, and difficulty constraints onto the archetype library.
   - For lessons beyond the initial 26 authored blueprints, display their parsed curriculum metadata, **Standards**, **Prerequisites**, and **Teacher Notes** in the studio with a clear indicator or fallback preview so navigation across all 810 lessons works seamlessly.

6. **First-Class Full-Color SVG `Visual Model` System (`ADR-0006`)**:
   - Build 11 parameterized, full-color inline SVG **Visual Models** with distinct silhouettes/patterns so they shine in color and remain clear on grayscale printers:
     1. **Everyday Object & Icon Bank**: Multi-category illustrated SVG objects (animals, fruits, toys, school supplies, nature items).
     2. **2D Geometric Shapes**: Circle, triangle, square, rectangle, pentagon, hexagon — parameterized by color palette, size (`small`, `medium`, `large`), and rotation angle.
     3. **3D Geometric Solids & Real-World Counterparts**: Shaded 3D SVGs for sphere, cone, cylinder, cube, rectangular box, and pyramid, plus real-world SVG objects (soup can, ice-cream cone, ice cube, gift box, ball).
     4. **Localized Metallic Coins**: Distinctly sized and colored metallic SVG coins (gold, silver, copper/bronze tones) stamped with **Eastern Arabic Numerals** (`١`, `٥`, `١٠`, `٢٥`, `٥٠`).
     5. **Five Frame**: RTL-filling 5-cell grid supporting two-tone vibrant counters, empty-cell highlights, cross-out marks (for zero), and dotted part-grouping outlines.
     6. **Snap Cubes**: Interlocking 3D-styled colorful SVG cube trains (connected or separated into parts, horizontal or vertical).
     7. **Tally Marks & Counting Sticks**: Bundled tally strokes (`١–٥` with diagonal 5th slash) and colorful craft sticks/straws.
     8. **Dice & Domino Dot Patterns**: Rounded colorful SVG dice faces (`١–٥`) with color-coded sub-groups for subitizing.
     9. **Circular Arrangements**: Objects placed evenly along a soft circular ring guide.
     10. **Horizontal & Vertical Picture Graphs**: Color-coded category rows and columns populated with SVG icons and response boxes.
     11. **Dotted Numeral Tracing Guides**: Custom SVG dotted-stroke paths for `٠`–`٩` on ruled baselines with starting dots and directional arrows, rendering traced solid strokes in the **Answer Key** view.

7. **A4 Print Layout & Headless Browser PDF Exporter (`ADR-0003`)**:
   - Style the A4 sheet container (`210mm × 297mm`) with `@page { size: A4 portrait; margin: 0; }` and `print-color-adjust: exact; -webkit-print-color-adjust: exact;` so colors, gradients, and SVGs render identically in browser preview and PDF output.
   - Expose a dedicated print-clean route and an API endpoint that uses Playwright (headless Chromium) to render the target **Worksheet** or **Answer Key** route (waiting for fonts and SVGs) and return an A4 PDF binary download.

8. **2-Pane RTL Teacher Studio UI**:
   - **Right Sidebar**: Grade switcher pills (`K–5`), searchable Unit/Lesson accordion with badges (`Standard`, `تقديم مشترك`, `إثرائي`), **Difficulty Level** selector (`متدرج`, `سهل`, `متوسط`, `متقدم`), **Seed** input/copy badge, and "Regenerate" (`توليد نموذج جديد 🎲`) action.
   - **Main Canvas**: Segmented view switcher (**ورقة العمل** | **مفتاح الإجابة** | **ملاحظات المعلم**), interactive zoomable A4 sheet preview, clickable **Prerequisite** chips inside **Teacher Notes**, and one-click PDF download / print buttons.

## Testing Decisions

1. **Philosophy — Test External Behavior at High Seams**:
   - Tests exercise public module interfaces and observable outputs (structured worksheet data, rendered RTL HTML/SVG markup, and PDF binary validity), never private helpers or internal implementation details.

2. **Primary Seam — Worksheet Generation & Render Surface**:
   - Test the curriculum parser + generation + HTML/SVG rendering pipeline through a single high-level seam accepting `{ grade, lessonNumber, seed, difficultyLevel?, viewMode }`:
     - **Curriculum Integrity**: Verify all 6 **Grades**, 12 **Units** per grade, and 135 **Lessons** per grade parse accurately from the Markdown files, preserving **Standards**, `Co-presented` / `Enrichment` flags, and `,` / `○` **Prerequisite** graphs.
     - **Seed Determinism**: Verify that calling generation twice with the same `(grade, lessonNumber, seed, difficultyLevel)` produces deep-equal **Worksheets** and **Answer Keys**, and calling with a different **Seed** produces varied exercises.
     - **Warm-Up Prerequisite Resolution**: Verify that a **Lesson** with a **Prerequisite** (e.g., `K-2` → `K-1`, or `K-18` → `K-17 ○ K-3, K-2`) pulls its **تهيئة** (Warm-Up) **Exercises** from the primary prerequisite blueprint, while a lesson without prerequisites (`K-1`, `K-12`) falls back to its own `Easy` tier.
     - **Difficulty Progression vs. Clamping**: Verify default mode (`متدرج`) produces `Easy` → `Intermediate` → `Advanced` across the three **Sections**, while selecting `Easy`, `Intermediate`, or `Advanced` clamps all **Exercises** across all three **Sections** to that **Difficulty Level**.
     - **Full Coverage of Grade K Units 1–2 (Lessons 1–26)**: Verify all 26 **Lesson Blueprints** generate valid 3-section **Worksheets** and mirrored **Answer Keys** across all 7 **Exercise Archetypes** and 11 SVG **Visual Models**, including **Strategy Hints** on every **Answer Key** exercise.
     - **Strict Eastern Arabic Numerals Invariant**: Assert across the rendered HTML/SVG output of all 26 lessons that once **Standard** code badges and SVG internal technical attributes (`viewBox`, coordinates) are stripped, zero Western digits (`0-9`) appear in any visible text node.

3. **Secondary Seam — Headless Browser PDF Export**:
   - Test the PDF export adapter with an integration test verifying that rendering a **Worksheet** and an **Answer Key** returns a valid `%PDF-` buffer formatted for A4 portrait within the 1–2 page budget.

## Out of Scope

- User accounts, login/authentication, or server-side database storage of generated worksheets.
- Student-facing interactive online quiz submission or automated grading of student-typed answers (worksheets are designed to be printed on A4 paper).
- AI/LLM-driven runtime problem generation (all generation is strictly template- and seed-driven per `ADR-0002`).
- Authoring bespoke **Lesson Blueprints** for all 810 lessons in this initial vertical slice (the curriculum parser and studio navigation support all 810 lessons across Grades K–5, while complete **Lesson Blueprints**, **Exercise Archetypes**, and **Visual Models** are authored for **Grade K Units 1–2, Lessons 1–26** first).

## Further Notes

- All domain terminology in code, tests, UI, and tickets must adhere to `GLOSSARY.md`.
- Visual polish is a hard product requirement (`ADR-0006`): every **Visual Model** must use crafted, multi-layered colorful SVG paths, playful badges, and clear spatial hierarchy suitable for 5-to-11-year-old learners.
