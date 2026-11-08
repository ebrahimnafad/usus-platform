// scripts/check-numerals.cjs
// Deterministic check for ADR-0001: Eastern Arabic Numerals invariant.
// Scans src/ for Western digits (0-9) in user-visible string literals and JSX text.
// Allowed: standard codes (K.CC.3), SVG attributes, CSS values, URLs, internal IDs.
const fs = require("fs");
const path = require("path");

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) files.push(...walk(full));
    else if (/\.(ts|tsx|css)$/.test(entry)) files.push(full);
  }
  return files;
}

// Patterns that are allowed to contain Western digits
const ALLOWED = [
  /^[A-Z][A-Z0-9.]*$/, // Standard codes: K.CC.3, 1.G.3
  /^\d+(\.\d+)?$/, // Pure numbers: 100, 3.5
  /^https?:\/\//, // URLs
  /^#/, // CSS hex colors
  /^rgb/, // CSS colors
  /^rgba/, // CSS colors
  /^\d+px$/, // CSS pixel values
  /^\d+%$/, // CSS percentage
  /^\d+mm$/, // CSS mm values
  /^\d+rem$/, // CSS rem values
  /^\d+em$/, // CSS em values
  /^viewBox/, // SVG viewBox
  /^\d+(\s+\d+)*$/, // SVG coordinate lists
  /^translate\(/, // SVG transforms
  /^rotate\(/, // SVG transforms
  /^scale\(/, // SVG transforms
  /^M\s/, // SVG path data
  /^L\s/, // SVG path data
  /^C\s/, // SVG path data
  /^A\s/, // SVG path data
  /^[0-9,\s.]+$/, // SVG path coordinate data
  /^data-/, // data attributes
  /^K-\d+/, // Lesson IDs: K-1, K-10
  /^[A-Z]-\d+/, // Lesson IDs: K-1, 1-2
  /^latin/, // font names
  /^utf-8$/, // charset
  /^application\//, // MIME types
  /^\.\.\//, // relative paths
  /^@/, // alias paths
  /^src\//, // source paths
  /^tests\//, // test paths
  /^node_modules/, // node_modules
  /^\.\//, // relative paths
  /^\/api\//, // API routes
];

let violations = 0;
const files = walk("src");

for (const file of files) {
  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check 1: JSX text content with Western digits
    // Match text between > and < that contains a Western digit
    const jsxTextMatches = line.matchAll(/>([^<>]*[0-9][^<>]*)</g);
    for (const m of jsxTextMatches) {
      const text = m[1].trim();
      if (!text) continue;
      // Skip if it's just an expression placeholder or whitespace
      if (text.includes("{") || text.includes("}")) continue;
      // Skip if it contains only Eastern Arabic or no Arabic (likely CSS/HTML)
      if (!/[\u0600-\u06FF]/.test(text)) continue;
      // If it has Arabic AND Western digits, it's a violation
      console.error(
        `❌ ${file}:${i + 1}: Western digit in JSX text with Arabic: "${text}"`
      );
      violations++;
    }

    // Check 2: String literals containing Arabic text AND Western digits
    // Strip template interpolations ${...} from the line first so inner quotes inside ${...} don't split template literals.
    const lineWithoutInterpolations = line.replace(/\$\{[^}]*\}/g, "");
    const strMatches = lineWithoutInterpolations.matchAll(
      /"([^"]*)"|'([^']*)'|`([^`]*)`/g
    );
    for (const m of strMatches) {
      const stripped = m[1] ?? m[2] ?? m[3] ?? "";
      if (!/[0-9]/.test(stripped)) continue;
      if (!/[\u0600-\u06FF]/.test(stripped)) continue;
      // Check allowlist on the stripped version
      if (ALLOWED.some((p) => p.test(stripped.trim()))) continue;
      // Allow standard code references (e.g., "K.G.4" inside Arabic text)
      if (/[A-Z]\.[A-Z0-9.]+/.test(stripped)) continue;
      console.error(
        `❌ ${file}:${i + 1}: Western digit in Arabic string: "${stripped}"`
      );
      violations++;
    }
  }
}

// Check 3: Constitution §9.4 (approved child-voice imperatives on K-35, K-39+) and §9.5 (no topic-label openers)
const LABEL_OPENERS = [
  "تهيئة",
  "تدرّب",
  "تحدٍّ وتقييم",
  "تحدّي",
  "مسألة اليوم",
  "بناء التفكير",
];

const APPROVED_IMPERATIVES = [
  "عدّ",
  "انظر",
  "صِلْ",
  "لوّن",
  "اختر",
  "اكتب",
  "ارسم",
  "اشطب",
  "اطرح",
  "اقرأ",
  "اجمع",
  "قِسْ",
  "رتّب",
];

const blueprintFiles = walk("src/blueprints");
for (const file of blueprintFiles) {
  const content = fs.readFileSync(file, "utf-8");

  // Track current lessonNumber as we scan through the file
  const lines = content.split("\n");
  let currentLessonNum = 0;

  for (let i = 0; i < lines.length; i++) {
    const lessonMatch = lines[i].match(/lessonNumber:\s*(\d+)/);
    if (lessonMatch) {
      currentLessonNum = Number(lessonMatch[1]);
    }

    const fieldMatch = lines[i].match(/^\s*(promptAr|strategyHintAr):\s*(.*)$/);
    if (!fieldMatch) continue;

    const fieldName = fieldMatch[1];
    // Collect the string literal on this line or the immediately following line
    const slice = `${lines[i]}\n${lines[i + 1] ?? ""}`;
    const strLiteral = slice.match(
      /(?:promptAr|strategyHintAr):\s*\n?\s*["'`]([^"'`]+)["'`]/
    );
    if (!strLiteral) continue;
    const text = strLiteral[1].trim();

    if (fieldName === "promptAr") {
      const badOpener = LABEL_OPENERS.find((label) => text.startsWith(label));
      if (badOpener) {
        console.error(
          `❌ ${file}:${i + 1} (K-${currentLessonNum}): promptAr opens with topic label "${badOpener}" (§9.5): "${text}"`
        );
        violations++;
      }
    }

    if (currentLessonNum === 35 || currentLessonNum >= 39) {
      const startsWithImperative = APPROVED_IMPERATIVES.some((verb) =>
        text.startsWith(verb)
      );
      if (!startsWithImperative) {
        console.error(
          `❌ ${file}:${i + 1} (K-${currentLessonNum}): ${fieldName} must open with one of [${APPROVED_IMPERATIVES.join("، ")}] (§9.4): "${text}"`
        );
        violations++;
      }
    }
  }
}

// Check 4: New archetypes (Unit 5+) must also open defaultPromptAr / defaultStrategyHintAr with §9.4 imperatives
const MODERN_ARCHETYPE_FILES = [
  path.join("src", "archetypes", "solve-word-problem.tsx"),
  path.join("src", "archetypes", "shift-one-decompose.tsx"),
  path.join("src", "archetypes", "measure-and-compare-length.tsx"),
  path.join("src", "lib", "word-problems.ts"),
];

for (const file of MODERN_ARCHETYPE_FILES) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n");
  let inPromptOrHintBlock = false;

  for (let i = 0; i < lines.length; i++) {
    if (/const\s+(?:defaultPromptAr|defaultStrategyHintAr)\b/.test(lines[i])) {
      inPromptOrHintBlock = true;
    }
    if (!inPromptOrHintBlock) continue;

    const strMatches = lines[i].matchAll(/"([^"]+)"|'([^']+)'|`([^`]+)`/g);
    for (const m of strMatches) {
      const text = (m[1] ?? m[2] ?? m[3] ?? "").trim();
      if (!/[\u0600-\u06FF]/.test(text) || text.length < 12) continue;

      const badOpener = LABEL_OPENERS.find((label) => text.startsWith(label));
      if (badOpener) {
        console.error(
          `❌ ${file}:${i + 1}: default prompt/hint opens with topic label "${badOpener}" (§9.5): "${text}"`
        );
        violations++;
      }

      const startsWithImperative = APPROVED_IMPERATIVES.some((verb) =>
        text.startsWith(verb)
      );
      if (!startsWithImperative) {
        console.error(
          `❌ ${file}:${i + 1}: default prompt/hint must open with one of [${APPROVED_IMPERATIVES.join("، ")}] (§9.4): "${text}"`
        );
        violations++;
      }
    }

    if (lines[i].includes(";")) {
      inPromptOrHintBlock = false;
    }
  }
}

if (violations > 0) {
  console.error(`\n${violations} numeral/language violation(s) found.`);
  process.exit(1);
} else {
  console.log(
    "✅ No Western numeral or §9.4/§9.5 blueprint prompt violations found."
  );
}
