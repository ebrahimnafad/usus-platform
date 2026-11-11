# The platform adopts Greg Tang's pedagogical principles as its mathematical foundation

Every Visual Model, Exercise Archetype, and child-facing prompt in the platform
is designed around three core principles from Greg Tang's methodology:

1. **See before you count.** Visual Models (Ten Frames, Linear Comparisons,
   Dice Patterns, Subitize Groupings) are structured so the child perceives
   quantity, comparison, or decomposition at a glance. Prompts that accompany
   perceptual models open with `انظر` (look), not `عدّ` (count).

2. **Group to know.** Quantities are anchored to benchmarks (5 in a Five Frame,
   5+n in a Ten Frame, sub-groups in Subitize Groupings) so the child
   recognises the structure rather than counting units one by one.

3. **Extras tell the story.** In comparison exercises, the child identifies the
   extra items (القطع الإضافية) in the larger group by 1-to-1 visual
   correspondence, not by counting both groups and comparing numbers.

These principles inform the Constitution (§0, §6.2, §9.7, §10.3), the Glossary
vocabulary, and the imperative-selection rule for child-facing prompts.

## Considered Options

- **Leave pedagogy implicit**: cheaper, but agents repeatedly generate prompts
  that open with `عدّ` on perceptual models, defeating the model's purpose.
  The K-99–K-102 batch produced ~43 such prompts before review caught them.

- **A standalone pedagogy guide**: risks drift from the Constitution, and agents
  must consult yet another document.

## Consequences

- Every new Visual Model declares its perception mode (§10.3: `perceive`,
  `group`, or `count`), and the imperative-selection rule (§9.7) is tied to
  that mode.
- The Constitution opens with §0 (Pedagogical Foundation) so this commitment
  is the first thing any author or agent reads.
- Existing prompts in K-99–K-102 and several archetypes have been corrected.
- `عناصر` is added to `GLOSSARY.md` `_Avoid_` for child-facing text; the
  §9.1 rendered-surface test catches it automatically.
- The platform's branding does not reference Tang by name in any student- or
  teacher-facing material (Reading Comprehension spec §Platform Branding).
