# 02: Combinations of 10 with Shapes and Lessons K-75 to K-77

**What to build:**

1. Extend `SubitizePartWhole` with `subitizeMode: "three-parts-to-10"` supporting 3 shape/solid categories in Ten Frames with blue/red/green color coding.
2. Extend `ConnectMatch` with `matchKind: "ten-frame-to-description"` supporting 2-part and 3-part shape descriptions and missing totals.
3. Author blueprints, Arabic titles, and Teacher Notes for K-75, K-76, and K-77.

**Blocked by:** None

**Status:** ready-for-agent

- [x] `SubitizePartWhole` supports `subitizeMode: "three-parts-to-10"` with 3 categories and color themes
- [x] `ConnectMatch` supports `matchKind: "ten-frame-to-description"` with 2 and 3 categories and optional missing totals
- [x] Localized Arabic titles, Teacher Notes, and blueprints registered for K-75, K-76, and K-77
- [x] Layout guard passes for `--lessons=K-75..K-77 --seeds=2`

## Comments

Built in 3 TDD cycles behind `tests/ticket-02-unit-7-combos-shapes-k75-k77.test.tsx` (17 tests), then the code-review pass folded in as follows.

**Slices**

- Ten Frame multi-category (`secondary`/`tertiary` shape/solid + color/count fields) in `src/visual-models/unit-2-models.tsx`; canonical Ten Frame stays 240×108, Answer Slots stay 48×48.
- `SubitizePartWhole` `three-parts-to-10`: seeded trios (blue→red→green, shape **and** color per part so §2.5 grayscale holds), 4-cell breakdown (3 part slots + read-only الكلّ badge), RTL equation line, Eastern numerals only.
- `ConnectMatch` `ten-frame-to-description`: right = 2/3-category frames (`listTenFrameCompositions`, 2 parts → 9, 3 parts → 36 candidates, §7.3 no repeats), left = «٧ مربعات و٣ دوائر» description cards via `createShapeDescriptionSpec`; `missingTotal` renders the canonical `AnswerSlot` (MATCHING C → `data-solved-match-description-total="١٠"`).
- Blueprints `src/blueprints/grade-k/lessons-k75-to-k77.ts` (K-75 practice = reuse ladder as-is + MATCHING A; K-76 = trios + MATCHING B; K-77 = count-quantify + MATCHING C missing total; challenge = Brain Builder only, ticket-01 precedent; K-76 warm-up clamps to the warm-up spec's own title/prompt/hint), registered in `src/registry/bootstrap.ts`; localization entries + Teacher Notes (POTD wording included for K-76/K-77).

**Gates**

- `npm run typecheck` ✅ · `node scripts/check-numerals.cjs` ✅ · `npm run test:fast` 263/263 ✅ · layout guard `--lessons=K-75..K-77 --seeds=2` **PASS 48/48 renders, max 2 pages** (re-ran after review fixes).
- Full `--seeds=5` batch-close sweep deferred to ticket 05, as planned.

**Review fixes applied** (CODING_STANDARDS §6, §9.4; WORKSHEET_CONSTITUTION §2.5, §7.3)

- Prompts now match visible controls: K-76 three-parts prompts no longer say «اكتب الكلّ» (the Whole is a read-only badge); same fix across K-75/K-77 both-parts practice prompts.
- Unapproved child-voice verbs replaced: `حدّد` → `اكتب`/`عدّ`, `تحقّق` → `اجمع`; archetype hint `صل` → `صِلْ`.
- `resolvedStrategyHintAr` now appends the connection summary for description-match hints too (answer-key-only, mirroring the take-apart precedent).
- Shared category pairs/trios extracted to `src/lib/ten-frame-category-sets.ts` (was duplicated across `connect-match`, `subitize-part-whole`, and the blueprint file).
- Three-parts AnswerSlot tones now match their frame colors (category 1 amber→coral/red, category 2 slate→emerald); `AnswerSlotTone` gained `coral`/`emerald`.
- Cleanup: dead `SubitizeCategoryItem` removed, counts normalization collapsed to one clamp pass, pair builder's defensive fill loop dropped (compositions are always exact-arity), `listTenFrameCompositions` unexported, test's `void expected;` replaced with real per-tier `categoryCount` assertions.

**Known deviations (accepted)**

- `0` as a part is "allowed" per spec, not required: reachable today in K-75/K-77 solids (`SOLID_CARDS_ADVANCED` filledCount 10 → 0 empty); three-parts and MATCHING frames keep parts ≥ 1.
- `TenFrameOptions` multi-category fields remain an expanded options object rather than a `CategoryRun[]` bundle (refactor risk outweighed the smell after the shared-sets extraction already removed the naming/drift hazard).
