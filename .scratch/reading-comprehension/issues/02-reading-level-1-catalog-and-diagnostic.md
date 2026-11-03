# 02: Reading Level 1 curriculum catalog and diagnostic questionnaire

**What to build:**
A strongly-typed, comprehensive curriculum data model for Reading Level 1 ("الانطلاق وبناء المعنى") encompassing all 12 story cycles (8 standard stories, 2 free-reading stories 🌟, and 2 transfer-test stories 🎯). Each story contains calibrated 50–75 word Arabic text, target sight words, 3-tier QAR comprehension questions with exact text evidence snippets, inductive grammar schemas, and teacher modeling scripts. In addition, an interactive starting-point diagnostic questionnaire page at `/reading/diagnostic` that guides teachers through 5–6 questions and recommends a starting reading level.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Reading curriculum catalog defines Level 1 with 12 complete story cycles adhering to the multi-dimensional progression rules (word counts 50–75 words).
- [x] Stories 4 and 10 are designated as free-reading stories (`free_reading`) with engaging text and zero questions.
- [x] Stories 6 and 12 are designated as transfer-test stories (`transfer_test`) with independent texts for measuring skill transfer.
- [x] Standard stories contain 3-tier QAR questions (direct, inferential, creative) with populated `textEvidenceSnippet` strings.
- [x] Standard stories define inductive grammar discovery steps (examples → observation → label → production prompt).
- [x] Standard stories define teacher guide properties (modeling script, blind-spot tips).
- [x] Route `/reading/diagnostic` renders a short, interactive questionnaire asking about the child's reading fluency and comprehension.
- [x] Completing the questionnaire outputs a recommended starting level with a direct link to begin.
- [x] Unit tests verify complete data integrity across all 12 stories in Level 1.
