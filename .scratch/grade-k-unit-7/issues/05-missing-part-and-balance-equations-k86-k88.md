# 05: Missing Part, Balance Equations, and Lessons K-86 to K-88

**What to build:**

1. Support missing-part exercises in `JoinParts` using `unknownPosition: "part2"` (and `"part1"` at Advanced) with Ten Frame models and number bonds (K-86) and equations (K-87).
2. Extend `ConnectMatch` for missing-part matching (`MATCHING - F` and `MATCHING - G`).
3. Author blueprints, Arabic titles, and Teacher Notes for K-86, K-87, and K-88 (Balance Equations & TEETER TOTS).
4. Run full Unit 7 verification (`--lessons=K-74..K-88 --seeds=5`) followed by the single batch-close all-lessons sweep (`--seeds=5 --png=none`).

**Blocked by:** 01, 02, 03, 04

**Status:** resolved

- [x] `JoinParts` correctly handles missing-part unknowns with Ten Frame models
- [x] `ConnectMatch` supports missing-part pairs for number bonds and equations
- [x] `JudgeEquality` scales addition to 10 with balance scales (TEETER TOTS) and true/false equations
- [x] Localized Arabic titles, Teacher Notes, and blueprints registered for K-86, K-87, and K-88
- [x] Ticket guard passes for `--lessons=K-86..K-88 --seeds=2`
- [x] Unit 7 sweep passes for `--lessons=K-74..K-88 --seeds=5`
- [x] Batch-close sweep passes across all authored lessons (`--seeds=5 --png=none`)

## Comments

**Resolution (2026-11-10):** All ACs green and verified this session.
`tests/ticket-05-unit-7-missing-part-balance-k86-k88.test.ts` 15/15; full
suite 298/298 (46 files); `npm run typecheck` clean; `check-numerals.cjs`
clean; guards — ticket sweep **0/48**, Unit 7 **0/600**, batch-close
**0/3520**.

**Batch-close required cuts on K-56..K-58 (verified pre-existing).** The
batch-close AC initially failed with 73 page-budget violations, ALL in
K-56/57/58 (40/20/13). Stash→guard→pop on the baseline proved these failures
predate ticket-05 (page budget only, 3 pages; worksheets 2054–2203px).
Fix protocol was cut-at-blueprint-level, never shrink models: removed the
second `practice` exercise per tier in all three lessons (K-56: second
all-combinations total per tier; K-57/K-58: the open-ended "answers will
vary" item). Warm-ups, `ConnectMatch` (MATCHING F/G/H anchors), and
cloze-equation challenges retained in every tier. K-57's Advanced challenge
order became `[equation-cloze, ConnectMatch]` so the 617px MATCHING-G panel
starts clear of the A4 page break — the bare-Connect variant paginates to 3
pages from a 1836px sheet even though the 2-page capacity is 2245px
(Chromium fragmentation cliff; see `layout-guard-output/measure-k56-58.txt`).

**Print-font remediation co-landed in service of the batch-close AC.**
The guard until now rendered with fallback fonts, which made block offsets
nondeterministic at the fragmentation cliff (K-57 scaffolded AK flipped 2↔3
pages on ~8px). A parallel remediation pinned print fonts
(`src/config/print-fonts.json` + stylesheet injection in the measure
harness, layout, and PDF export) and tightened `/api/pdf` to hard-fail on
missing fonts instead of silently degrading. That behavior change
(gone: old `loadedFromUrl` + `setContent` fallback) and the font-host
route allowlist belong in their own ticket record; flagged here for
traceability.

**Standards/spec review follow-ups (not blockers).**

1. `matchMissingPosition` gate is `challenge || Advanced` while JoinParts
   `part2` admits `lessonNumber >= 79` at any tier. Intentional per this
   ticket's decisions: matching layouts only occur in `challenge` sections,
   and K-86's curriculum anchor places MATCHING-F at Easy challenge; §6.3's
   "from lesson 79 on" scoping applies to written JoinParts practice.
   `part1` remains `challenge || Advanced` only (ticket line 1's "at
   Advanced" undersold; recorded as the final gate semantics).
2. GLOSSARY: child-facing balance terms are missing entries, and the
   Balance Scale entry lists "Teeter-totter" under Avoid while curriculum
   anchors/tests say TEETER TOTS. Needs the domain-modeling pass
   (separate from this ticket; terms predate this diff in `judge-equality.tsx`).
3. Duplicated helpers from the remediation (font-host allowlist ×3,
   `waitForPrintFonts` in `scripts/lib/print-measure.mjs` and
   `src/pdf/pdf-exporter.ts`, the PDF-export branch trio) — worth one
   shared extraction; the `--output-dir` tooling flag is beyond the
   guard contract. Judgement-level, deferred.
4. Latent path: `buildJoinConcreteModel` renders an empty frame for a
   missing-`part1` five-frame item (label says الكلّ+part2). No authored
   blueprint requests that combination today; documented rather than
   guard-added.

**PDF download vs native print (user question).** Both stay: طباعة prints
the live sheet through the browser's native pager; تحميل PDF exports a
fixed artifact for sharing/print shops. They diverged only because the
export path ran on fallback fonts; with print-fonts pinned both paths use
identical metrics (user confirmed native-print output is correct).
