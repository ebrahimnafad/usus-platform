# Worksheets Platform

A platform that generates lesson-specific, printable A4 mathematics worksheets and answer keys in Arabic for Grades K–5.

## Language

### Curriculum

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

### Worksheet Structure & Generation

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
One of three tiers—Easy, Intermediate, or Advanced—indicating cognitive demand, either progressing across a standard worksheet or selected to produce a differentiated worksheet.
_Avoid_: Grade level, complexity tier, skill level

**Visual Model**:
A richly styled SVG mathematical diagram, manipulative illustration, or icon set used within an exercise to represent quantities, shapes, and relationships pictorially (such as five/ten frames, snap cubes, tally marks, 2D/3D shapes, coins, dice, number bonds, arrays, or bar models).
_Avoid_: Clip art, plain wireframe, static image

**Strategy Hint**:
A short prompt accompanying an exercise or solution that guides the student's mathematical reasoning (e.g., "make ١٠ first").
_Avoid_: Tip, clue, help text

**Eastern Arabic Numerals**:
The numeral digits `٠١٢٣٤٥٦٧٨٩` used exclusively across the user interface, worksheets, and answer keys (except inside standard codes).
_Avoid_: Hindi numerals, Arabic-Indic digits
