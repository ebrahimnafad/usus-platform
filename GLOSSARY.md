# أُسُس (Usus) Platform

An Arabic-first educational platform with two domains: mathematics worksheet generation (Grades K–5) and reading comprehension training (3 proficiency levels).

## Language

### Mathematics Curriculum

**Grade**:
One of the six school grade bands from Kindergarten (K) through Grade 5.
_Avoid_: Level, year, stage

**Unit**:
A thematic grouping of consecutive lessons within a grade (12 units per grade).
_Avoid_: Chapter, module, topic

**Lesson**:
A single curriculum topic within a grade (numbered 1–135 per grade) defined by its learning description, standards, and prerequisites.
_Avoid_: Skill, lecture, session

**Standard**:
An alphanumeric curriculum code (e.g., `K.CC.3`) identifying a specific mathematical learning objective.
_Avoid_: Competency, outcome, benchmark

**Prerequisite**:
An earlier lesson (within the same grade or a prior grade) whose concepts a student should know before starting a given lesson—supporting both compound prerequisites (`,`) and alternative prerequisite paths (`○`)—from which a worksheet's warm-up exercises are drawn.
_Avoid_: Dependency, prior skill

**Teacher Notes**:
Pedagogical guidance and delivery context for the teacher (including co-presentation and enrichment notes) shown in the application but excluded from printable worksheets.
_Avoid_: Lesson plan, teacher guide

**Grade Hub**:
The intermediate screen at `/math` presenting all six grades as a visually rich card grid, serving as the entry point into the Teacher Studio for a specific grade.
_Avoid_: Grade selector, grade picker, grade menu

**Teacher Studio**:
The per-grade workspace where a teacher chooses a Lesson, tunes how its Worksheet is generated, and previews, prints, or exports it. It is entered from the Grade Hub and scoped to one Grade.
_Avoid_: Studio, worksheet editor, generator, builder

### Mathematics Worksheet Structure & Generation

**Worksheet**:
A printable, lesson-specific A4 document in Arabic containing student exercises organized into sections.
_Avoid_: Handout, test, quiz, assignment

**Answer Key**:
A companion printable A4 document paired with a specific worksheet seed, rendered as a mirrored visual overlay of the worksheet with solved visual models, completed answers, and strategy hints.
_Avoid_: Solution sheet, marking guide

**Seed**:
A short deterministic code identifying a specific randomized instance of a worksheet and its matching answer key.
_Avoid_: Version ID, random token, instance ID

**Lesson Blueprint**:
The per-lesson specification defining which exercise archetypes, visual models, number ranges, and difficulty constraints make up a lesson's worksheet.
_Avoid_: Generation template, lesson config, schema

**Exercise Archetype**:
A reusable problem pattern (such as count-and-match, frame modeling, number bond decomposition, or vertical algorithm) parameterized by a lesson blueprint to produce exercises.
_Avoid_: Question type, widget, generator class

**Section**:
One of the three canonical exercise groupings within a worksheet: Warm-Up (`تهيئة`), Practice (`تدرّب`), and Challenge & Assessment (`تحدٍّ وتقييم`).
_Avoid_: Part, block, page region

**Exercise**:
A single mathematical problem or activity within a section of a worksheet.
_Avoid_: Question, item, task, prompt

**Difficulty Level**:
One of three tiers—Easy, Intermediate, or Advanced—expressing the cognitive demand that holds across a whole worksheet.
_Avoid_: Grade level, complexity tier, skill level, difficulty mode

**Difficulty Mode**:
The worksheet-wide policy for distributing difficulty: either **Scaffolded**, where demand ramps across the three Sections, or a single Difficulty Level held throughout. A worksheet is generated under exactly one Difficulty Mode, so Scaffolded and the three Difficulty Levels are mutually exclusive choices.
_Avoid_: Difficulty setting, difficulty type, level mode, mixed difficulty

**Visual Model**:
A richly styled SVG mathematical diagram, manipulative illustration, or icon set used within an exercise to represent quantities, shapes, and relationships pictorially (such as five/ten frames, snap cubes, tally marks, 2D/3D shapes, coins, dice, number bonds, arrays, or bar models).
_Avoid_: Clip art, plain wireframe, static image

**Strategy Hint**:
A short prompt accompanying an exercise or solution that guides the student's mathematical reasoning (e.g., "make ١٠ first").
_Avoid_: Tip, clue, help text

**Eastern Arabic Numerals**:
The numeral digits `٠١٢٣٤٥٦٧٨٩` used exclusively across the user interface, worksheets, and answer keys (except inside standard codes).
_Avoid_: Hindi numerals, Arabic-Indic digits

### Reading Comprehension

**Reading Level**:
One of three proficiency tiers (Level 1, 2, 3) measuring a student's reading comprehension ability, independent of their school Grade.
_Avoid_: Grade, stage, band

**Story Cycle**:
The atomic unit of instruction in the reading domain — a complete teaching sequence around a single story, spanning two to three sessions of 20–25 minutes each.
_Avoid_: Lesson, unit, module

**Story**:
A single Arabic narrative text within a reading level, classified as standard, free-reading, or transfer-test.
_Avoid_: Passage, text, reading

**Station**:
One of six sequential phases within a story cycle: First Read, Guided Read, QAR Questions, Inductive Grammar, Expression, and Review.
_Avoid_: Step, stage, phase

**QAR (Question-Answer Relationship)**:
A comprehension strategy classifying questions by where the answer lives: direct (in the text), inferential (across clues), or creative (reader + text).
_Avoid_: Bloom's level, question type

**Target Words**:
High-frequency sight words highlighted in a story's training copy to build automatic recognition; highlighting is progressively removed as the student gains fluency.
_Avoid_: Vocabulary list, keyword, focus word

**Scaffold**:
An adjustable support dimension (tashkeel level, target word highlighting, or hint level) that the teacher controls per station and reduces over time following the one-variable-at-a-time rule.
_Avoid_: Help, aid, support level

**Teacher Shield**:
A collapsible reference panel surfacing common pedagogical blind-spot warnings and session-specific tips to prevent teaching anti-patterns.
_Avoid_: Teacher guide, help panel, tips drawer

**Tracking Matrix**:
A per-story one-click observation record capturing assistance level, comprehension depth, and next-step decision, stored locally on the teacher's device.
_Avoid_: Report card, assessment log, gradebook

**Reading Nook**:
A visually distinct, chrome-free view used exclusively for free-reading sessions — no questions, no stepper, no tracking — designed to protect the joy of reading.
_Avoid_: Free reading mode, pleasure mode

**Transfer Test**:
An assessment story cycle using an unseen text with all scaffolds locked off, measuring whether the student can apply learned skills independently.
_Avoid_: Quiz, exam, assessment

**Diagnostic**:
A short questionnaire helping the teacher identify the appropriate starting reading level for a student.
_Avoid_: Placement test, intake assessment

**Inductive Grammar**:
A grammar-discovery approach where the student extracts a grammatical pattern from story examples before it is named — example → observation → label → production.
_Avoid_: Grammar lesson, grammar drill, deductive grammar

**Production Ladder**:
A five-rung progression of expressive output: oral answer → oral sentence → written sentence → connected sentences → alternative scenario.
_Avoid_: Writing levels, output stages
