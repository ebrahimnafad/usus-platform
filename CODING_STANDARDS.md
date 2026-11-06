# Coding Standards

Rules for code in this repo. Enforced during review (`/code-review` Standards axis).

## 1. No pure re-export shims

Do not create files that only re-export from another module. Import directly from the source module instead.

```ts
// Bad — src/archetypes/graphs-sequences-subitize.tsx
export * from "@/archetypes/picture-graph-read";
export * from "@/archetypes/sequence-and-zero";
export * from "@/archetypes/subitize-part-whole";

// Good — import directly
import { pictureGraphReadArchetype } from "@/archetypes/picture-graph-read";
```

**Why**: Re-export shims add an indirection layer with no behavior (Middle Man smell). They create a second import path for the same module, making refactoring harder and confusing grep/navigation.

## 2. Archetype registration boilerplate

Every exercise archetype must be registered using the shared `registerExerciseArchetype` helper from `@/archetypes/registry`. Do not inline a bespoke registration object with a `generate`/`render` pair in each archetype file.

```ts
// Bad — duplicated in every archetype file
export const patternCompleteArchetype = {
  id: "PatternComplete" as const,
  displayNameAr: "أكمل النمط",
  generate: generatePatternCompleteExercise,
  render: renderPatternCompleteExercise,
};
registerExerciseArchetype(patternCompleteArchetype);

// Good — use the shared helper
registerExerciseArchetype({
  id: "PatternComplete",
  displayNameAr: "أكمل النمط",
  generate: generatePatternCompleteExercise,
  render: renderPatternCompleteExercise,
});
```

**Why**: The current boilerplate shape is identical across all 7 archetype files. Extracting it into a shared helper (`registerArchetype`) would eliminate the duplication and make adding a new archetype a one-line change.

## 3. Eastern Arabic Numerals (ADR-0001)

All user-visible numbers must use Eastern Arabic Numerals (`٠١٢٣٤٥٦٧٨٩`). Western digits (`0-9`) are only permitted inside:

- Curriculum standard codes (e.g., `K.CC.3`, `1.G.3`)
- SVG technical attributes (`viewBox`, coordinates, widths/heights)
- Non-user-facing internal identifiers

**CSS counter exception**: the browser keyword `arabic-indic` is the correct CSS value for producing Eastern Arabic digit output (e.g., `counter(page, arabic-indic)`). It cannot be renamed. When used, the same line or the immediately adjacent comment must cite ADR-0001 and spell out "Eastern Arabic Numerals" so the naming contradiction is immediately explained to the reader.

```css
/* Good — inline citation */
content: "صفحة " counter(page, arabic-indic); /* eastern arabic per ADR-0001 */

/* Bad — keyword used with no context */
content: counter(page, arabic-indic);
```

**Why**: Hard product constraint (ADR-0001). The seam tests enforce this for rendered HTML/SVG, but new components should follow it by convention.

## 4. Single registration point for slices

All side-effect imports for visual models, exercise archetypes, and lesson blueprints must go in `src/registry/bootstrap.ts`. Do not add registration imports to `worksheet-engine.ts` or any other file.

**Why**: Prevents Shotgun Surgery — adding a new slice should be a one-line change in one file, not scattered edits across the generation engine. See `src/registry/bootstrap.ts` for the pattern.

## 5. Card interior centering and single-owner visual chrome

- **Center visual models inside flex-column cards**: When an exercise or slot card uses `flex-col justify-between` with a top badge row, wrap the body `<VisualModelView />` in a `flex-1 flex flex-col items-center justify-center` container. Otherwise `justify-between` pins the model against the bottom border whenever a sibling card in the grid is taller.
- **Single-owner visual chrome**: Connection ports, dividers, and item badges belong to either the HTML card or the SVG canvas, never both. Drawing a port ring inside the HTML card and a second port circle in the adjacent SVG canvas produces duplicate visual elements that drift apart when card height changes.
- **Keep header + wide visual models within column width**: In a 2-column (`324 px`) or 3-column (`212 px`) cell, stack the item header row (number badge + summary pill) above any wide visual model (`240 px` five-frame, `five-frame-and-digit`, or `PartsTableView`) rather than placing four elements on a single horizontal flex line.
