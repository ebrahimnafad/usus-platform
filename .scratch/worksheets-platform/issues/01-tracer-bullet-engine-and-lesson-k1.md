# 01: End-to-End Tracer Bullet — K–5 Curriculum Catalog, Seeded Worksheet Engine, A4 Renderer & Lesson K-1 (`Match Objects`)

**What to build:** A working RTL Arabic web application and test suite that parses all 810 lessons across **Grades K–5** (**Unit**, **Lesson**, **Standard**, `,` compound and `○` alternative **Prerequisites**, `Co-presented`, and `Enrichment` metadata), formats all numbers exclusively in **Eastern Arabic Numerals** (`٠١٢٣٤٥٦٧٨٩`), runs deterministic **Seed**-based generation with **Difficulty Level** progression (`Easy → Intermediate → Advanced`) and single-tier clamping, renders the full-color 3-section A4 **Worksheet** (**تهيئة**, **تدرّب**, **تحدٍّ وتقييم**), mirrored visual **Answer Key** (with **Strategy Hints**), and **Teacher Notes**, and delivers the **Everyday Object SVG Bank** **Visual Model** and `ConnectMatch` (`صل بخط`) **Exercise Archetype** for **Lesson K-1 (*Match Objects*)**.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [x] All 6 **Grades** (`K–5`), 12 **Units** per grade, and 135 **Lessons** per grade are parsed into the curriculum catalog with accurate **Standards**, `Co-presented` / `Enrichment` flags, and `,` / `○` **Prerequisite** graphs.
- [x] Every visible number across rendered **Worksheets**, **Answer Keys**, and **Teacher Notes** uses **Eastern Arabic Numerals** (`٠١٢٣٤٥٦٧٨٩`), while **Standard** codes (such as `K.G.4`) retain their original alphanumeric form.
- [x] Calling worksheet generation with the same `(grade, lessonNumber, seed, difficultyLevel)` produces identical **Exercises** and matching **Answer Keys**, while changing the **Seed** produces varied randomized items.
- [x] A generated **Worksheet** renders a full-color A4 workbook layout with an illustrated header (**Grade**, **Unit**, **Lesson** number and Arabic title, **Standard** pills, `الاسم`, `التاريخ`, and `كيف كان أدائي؟` star box), three color-coded **Sections** (🌟 **تهيئة**, 🎨 **تدرّب**, 🚀 **تحدٍّ وتقييم**), and a footer displaying the **Seed** (`رمز النموذج`).
- [x] Default generation progresses `Easy → Intermediate → Advanced` across the three **Sections**, while selecting a single **Difficulty Level** (`Easy`, `Intermediate`, or `Advanced`) clamps all **Exercises** across all three **Sections** to that tier.
- [x] **Lesson K-1 (*Match Objects*)** generates complete 3-section **Worksheets** and mirrored visual **Answer Keys** using the **Everyday Object SVG Bank** and the `ConnectMatch` (`صل بخط`) **Exercise Archetype** (with smooth solved connecting curves and **Strategy Hints** in the **Answer Key**), plus localized Arabic **Teacher Notes**.
- [x] Primary-seam automated tests verify curriculum parsing, **Seed** determinism, **Eastern Arabic Numerals** enforcement, **Difficulty Level** progression/clamping, and **Lesson K-1** **Worksheet**, **Answer Key**, and **Teacher Notes** rendering.
