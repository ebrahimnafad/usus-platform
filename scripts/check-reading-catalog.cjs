// scripts/check-reading-catalog.cjs
// Deterministic lint check for Reading Comprehension catalogs (src/curriculum/reading-catalog.ts
// and all re-exported ReadingLevel objects).
// Checks: word counts, alias sync, textEvidenceSnippet exact match, Tashkeel Unicode validity
// & vocalization density, Inductive Grammar grounding, Target Words grounding, and orthography.

const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");

// Load .ts files on the fly using TypeScript's transpiler so we inspect the real catalog objects.
require.extensions[".ts"] = function compileTs(module, filename) {
  const source = fs.readFileSync(filename, "utf-8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: filename,
  });
  module._compile(outputText, filename);
};

// Resolve @/* path alias to src/*
const Module = require("module");
const origResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith("@/")) {
    const mapped = path.join(SRC_DIR, request.slice(2));
    return origResolveFilename.call(this, mapped, parent, isMain, options);
  }
  return origResolveFilename.call(this, request, parent, isMain, options);
};

const catalog = require(path.join(SRC_DIR, "curriculum", "reading-catalog.ts"));
const { countStoryWords } = catalog;

// Unicode ranges
const ARABIC_LETTER_RE = /[\u0621-\u064A]/;
const TASHKEEL_RE = /[\u064B-\u0652]/;
const HARAKA_OR_TANWEEN_RE = /[\u064B-\u0650]/;
const TANWEEN_RE = /[\u064B-\u064D]/;
const SHADDA = "\u0651";
const SUKUN = "\u0652";

function stripTashkeel(str) {
  return str.replace(/[\u064B-\u0652\u0670]/g, "");
}

function normalizeForMatch(str) {
  return stripTashkeel(str)
    .replace(/[،؛؟.!:"«»()[\]{}'\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeArabic(str) {
  return normalizeForMatch(str)
    .split(" ")
    .filter((w) => ARABIC_LETTER_RE.test(w));
}

function isReadingLevel(val) {
  return (
    val &&
    typeof val === "object" &&
    typeof val.id === "string" &&
    typeof val.levelNumber === "number" &&
    val.targetWordCount &&
    Array.isArray(val.stories)
  );
}

let violations = 0;
function report(ctx, message) {
  console.error(`❌ [${ctx}] ${message}`);
  violations++;
}

/**
 * Validates Unicode Tashkeel sequences and unambiguous Arabic orthographic traps.
 */
function checkTashkeelValidityAndOrthography(ctx, text) {
  if (typeof text !== "string" || !text.trim()) return;

  // 1. Post-alif tanween fath (اً) instead of canonical pre-alif (ًا)
  if (/\u0627\u064B/.test(text)) {
    report(
      ctx,
      `Post-alif Tanween Fath (اً) found; use pre-alif (ًا) in "${text.slice(0, 60)}"`
    );
  }

  // 2. Space before punctuation (excluding ellipsis "..." and tatweel "ـ ؟")
  if (/(?<!\u0640)\s+(?:[،؛؟!]|\.(?!\.\.))/.test(text)) {
    report(
      ctx,
      `Unexpected space before punctuation in "${text.slice(0, 60)}"`
    );
  }

  // 3. Unambiguous Arabic spelling traps (checked on unvocalized normalized text)
  const stripped = stripTashkeel(text);
  const traps = [
    { re: /(?:^|\s)إلي(?=\s|$|[،؛؟.!])/, msg: "Use إِلَى instead of إلي" },
    { re: /(?:^|\s)هذة(?=\s|$|[،؛؟.!])/, msg: "Use هَذِهِ instead of هذة" },
    { re: /(?:^|\s)هاذا(?=\s|$|[،؛؟.!])/, msg: "Use هَذَا instead of هاذا" },
    { re: /(?:^|\s)هاذه(?=\s|$|[،؛؟.!])/, msg: "Use هَذِهِ instead of هاذه" },
    {
      re: /(?:^|\s)لاكن(?=\s|$|[،؛؟.!])/,
      msg: "Use لَكِنْ/لَكِنَّ instead of لاكن",
    },
    { re: /(?:^|\s)ذالك(?=\s|$|[،؛؟.!])/, msg: "Use ذَلِكَ instead of ذالك" },
  ];
  for (const trap of traps) {
    if (trap.re.test(stripped)) {
      report(ctx, `Orthography trap: ${trap.msg} in "${text.slice(0, 60)}"`);
    }
  }

  // 4. Per-word diacritic sequence validation
  const words = text.trim().split(/\s+/);
  for (const rawWord of words) {
    // Strip leading/trailing punctuation
    const word = rawWord.replace(/^[«»"'(\[{]+|[»"'.,،؛؟!)\]}:]+$/g, "");
    if (!word) continue;

    if (TASHKEEL_RE.test(word[0])) {
      report(ctx, `Word starts with a diacritic: "${word}"`);
      continue;
    }

    let i = 0;
    while (i < word.length) {
      const ch = word[i];
      if (!ARABIC_LETTER_RE.test(ch)) {
        if (TASHKEEL_RE.test(ch)) {
          report(
            ctx,
            `Diacritic attached to non-Arabic character in "${word}"`
          );
        }
        i++;
        continue;
      }

      // Collect all trailing diacritics on this Arabic letter
      let j = i + 1;
      const marks = [];
      while (j < word.length && TASHKEEL_RE.test(word[j])) {
        marks.push(word[j]);
        j++;
      }

      if (marks.length > 0) {
        const shaddaCount = marks.filter((m) => m === SHADDA).length;
        const sukunCount = marks.filter((m) => m === SUKUN).length;
        const harakaCount = marks.filter((m) =>
          HARAKA_OR_TANWEEN_RE.test(m)
        ).length;

        if (shaddaCount > 1) {
          report(ctx, `Multiple shaddas on one letter in "${word}"`);
        }
        if (
          sukunCount > 1 ||
          harakaCount > 1 ||
          (sukunCount >= 1 && harakaCount >= 1)
        ) {
          report(ctx, `Conflicting harakat/sukun on one letter in "${word}"`);
        }
        if (shaddaCount === 1 && sukunCount === 1) {
          report(ctx, `Invalid shadda + sukun combination in "${word}"`);
        }

        // Tanween must be on the final letter (or followed only by trailing ا or ى for tanween fath)
        const hasTanween = marks.some((m) => TANWEEN_RE.test(m));
        if (hasTanween && j < word.length) {
          const rest = word.slice(j);
          const validTrailingAlif =
            marks.includes("\u064B") && (rest === "ا" || rest === "ى");
          if (!validTrailingAlif) {
            report(ctx, `Tanween on non-final letter in "${word}"`);
          }
        }
      }

      i = j;
    }
  }
}

/**
 * Checks that student-facing / vocalized fields have sufficient Tashkeel density.
 */
function checkVocalizationDensity(ctx, text) {
  if (typeof text !== "string" || !text.trim()) return;

  let letters = 0;
  let marks = 0;
  for (const ch of text) {
    if (ARABIC_LETTER_RE.test(ch)) letters++;
    else if (TASHKEEL_RE.test(ch)) marks++;
  }

  if (letters >= 4) {
    const ratio = marks / letters;
    if (ratio < 0.5) {
      report(
        ctx,
        `Low Tashkeel density (${Math.round(ratio * 100)}% < 50%) in "${text.slice(0, 60)}"`
      );
    }
  }

  // Flag 3+ consecutive unvocalized Arabic words (each >= 2 Arabic letters)
  const words = text.trim().split(/\s+/);
  let consecutiveUnvocalized = 0;
  for (const rawWord of words) {
    const word = rawWord.replace(/^[«»"'(\[{]+|[»"'.,،؛؟!)\]}:]+$/g, "");
    const letterCount = [...word].filter((c) =>
      ARABIC_LETTER_RE.test(c)
    ).length;
    const hasMark = TASHKEEL_RE.test(word);
    if (letterCount >= 2 && !hasMark) {
      consecutiveUnvocalized++;
      if (consecutiveUnvocalized >= 3) {
        report(
          ctx,
          `3+ consecutive unvocalized words ending at "${word}" in "${text.slice(0, 60)}"`
        );
        break;
      }
    } else {
      consecutiveUnvocalized = 0;
    }
  }
}

/**
 * Checks if a Target Word matches at least one token in the story text
 * (exact unvocalized match or standard inflectional prefix/suffix match).
 */
function targetWordMatchesStory(targetWord, storyTokens) {
  const target = normalizeForMatch(targetWord);
  if (!target) return false;

  // Proclitic conjunction "وَ" is attached to the following word in Arabic
  if (target === "و") {
    return storyTokens.some((t) => t.startsWith("و") && t.length > 1);
  }

  const prefixes = [
    "",
    "و",
    "ف",
    "ب",
    "ل",
    "ك",
    "ال",
    "وال",
    "فال",
    "بال",
    "كال",
    "لل",
  ];
  const suffixes = [
    "",
    "ه",
    "ها",
    "هم",
    "هما",
    "هن",
    "ك",
    "كم",
    "ي",
    "نا",
    "ت",
    "تي",
    "تم",
    "وا",
    "ون",
    "ين",
    "ان",
    "ات",
    "ة",
  ];

  // Also handle trailing ة/ت or bare verb stem (e.g., كَانَ -> كَانَتِ, طَارَ -> يَطِيرُ)
  const baseForms = new Set([target]);
  if (target.endsWith("ة")) baseForms.add(target.slice(0, -1) + "ت");
  if (target.endsWith("ى")) baseForms.add(target.slice(0, -1) + "ي");

  for (const token of storyTokens) {
    for (const base of baseForms) {
      if (token === base) return true;
      for (const p of prefixes) {
        if (!token.startsWith(p)) continue;
        const afterPrefix = token.slice(p.length);
        for (const s of suffixes) {
          if (afterPrefix === base + s) return true;
        }
      }
    }
  }
  return false;
}

// Collect all exported ReadingLevel objects
const levels = [];
const seenIds = new Set();
for (const val of Object.values(catalog)) {
  if (isReadingLevel(val) && !seenIds.has(val.id)) {
    seenIds.add(val.id);
    levels.push(val);
  }
}

if (levels.length === 0) {
  report(
    "catalog",
    "No ReadingLevel exports found in src/curriculum/reading-catalog.ts"
  );
}

for (const level of levels) {
  const levelCtx = level.id;
  checkTashkeelValidityAndOrthography(`${levelCtx}.titleAr`, level.titleAr);
  checkTashkeelValidityAndOrthography(
    `${levelCtx}.subtitleAr`,
    level.subtitleAr
  );
  checkTashkeelValidityAndOrthography(
    `${levelCtx}.descriptionAr`,
    level.descriptionAr
  );

  for (const story of level.stories) {
    const ctx = `${levelCtx}/${story.id}`;

    // 1. Word count
    const actualWords = countStoryWords(story.text);
    if (story.wordCount !== actualWords) {
      report(
        ctx,
        `wordCount mismatch: declared ${story.wordCount}, actual ${actualWords}`
      );
    }
    if (
      actualWords < level.targetWordCount.min ||
      actualWords > level.targetWordCount.max
    ) {
      report(
        ctx,
        `wordCount ${actualWords} out of level bounds [${level.targetWordCount.min}, ${level.targetWordCount.max}]`
      );
    }

    // 2. Alias sync
    if (story.textAr !== undefined && story.textAr !== story.text) {
      report(ctx, `textAr differs from text`);
    }
    if (story.titleAr !== undefined && story.titleAr !== story.title) {
      report(ctx, `titleAr differs from title`);
    }

    // 3. Tashkeel validity across all fields & density on vocalized fields
    const vocalizedFields = [
      ["title", story.title],
      ["text", story.text],
      ["teacherGuide.modelingScript", story.teacherGuide?.modelingScript],
      ["teacherGuide.focusWordsNote", story.teacherGuide?.focusWordsNote],
      ["expressionPrompt", story.expressionPrompt],
    ];
    for (const [field, value] of vocalizedFields) {
      if (value) {
        checkTashkeelValidityAndOrthography(`${ctx}.${field}`, value);
        checkVocalizationDensity(`${ctx}.${field}`, value);
      }
    }
    if (Array.isArray(story.teacherGuide?.blindSpotTips)) {
      story.teacherGuide.blindSpotTips.forEach((tip, idx) => {
        checkTashkeelValidityAndOrthography(
          `${ctx}.teacherGuide.blindSpotTips[${idx}]`,
          tip
        );
        checkVocalizationDensity(
          `${ctx}.teacherGuide.blindSpotTips[${idx}]`,
          tip
        );
      });
    }
    // Exempted from vocalization density, but still checked for Unicode validity & orthography
    if (story.theme) {
      checkTashkeelValidityAndOrthography(`${ctx}.theme`, story.theme);
    }

    // 4. Target Words grounding
    const storyTokens = tokenizeArabic(story.text);
    if (
      !Array.isArray(story.targetSightWords) ||
      story.targetSightWords.length === 0
    ) {
      report(ctx, `targetSightWords must be a non-empty array`);
    } else {
      story.targetSightWords.forEach((tw, idx) => {
        if (!tw.trim()) {
          report(ctx, `targetSightWords[${idx}] is empty`);
          return;
        }
        checkTashkeelValidityAndOrthography(
          `${ctx}.targetSightWords[${idx}]`,
          tw
        );
        checkVocalizationDensity(`${ctx}.targetSightWords[${idx}]`, tw);
        if (!targetWordMatchesStory(tw, storyTokens)) {
          report(ctx, `Target Word "${tw}" not found in story text`);
        }
      });
    }

    // 5. QAR questions & textEvidenceSnippet
    if (story.type === "free_reading") {
      if (story.qarQuestions.length > 0) {
        report(ctx, `free_reading story must have 0 qarQuestions`);
      }
      if (story.grammarDiscovery !== undefined) {
        report(ctx, `free_reading story must not define grammarDiscovery`);
      }
      if (story.expressionPrompt !== undefined) {
        report(ctx, `free_reading story must not define expressionPrompt`);
      }
    } else {
      const expectedQarCount = level.levelNumber >= 3 ? 4 : 3;
      if (story.qarQuestions.length !== expectedQarCount) {
        report(
          ctx,
          `Expected ${expectedQarCount} qarQuestions, got ${story.qarQuestions.length}`
        );
      }
      const tiers = new Set(story.qarQuestions.map((q) => q.tier));
      for (const requiredTier of ["direct", "inferential", "creative"]) {
        if (!tiers.has(requiredTier)) {
          report(ctx, `Missing QAR tier "${requiredTier}"`);
        }
      }

      for (const q of story.qarQuestions) {
        const qCtx = `${ctx}/${q.id}`;
        if (q.prompt !== undefined && q.prompt !== q.question) {
          report(qCtx, `prompt differs from question`);
        }
        if (!q.textEvidenceSnippet || !q.textEvidenceSnippet.trim()) {
          report(qCtx, `textEvidenceSnippet is empty`);
        } else if (!story.text.includes(q.textEvidenceSnippet)) {
          report(
            qCtx,
            `textEvidenceSnippet "${q.textEvidenceSnippet}" is not an exact substring of story.text`
          );
        }

        checkTashkeelValidityAndOrthography(`${qCtx}.question`, q.question);
        checkVocalizationDensity(`${qCtx}.question`, q.question);
        checkTashkeelValidityAndOrthography(
          `${qCtx}.sampleAnswer`,
          q.sampleAnswer
        );
        checkVocalizationDensity(`${qCtx}.sampleAnswer`, q.sampleAnswer);
        checkTashkeelValidityAndOrthography(
          `${qCtx}.textEvidenceSnippet`,
          q.textEvidenceSnippet
        );
        checkVocalizationDensity(
          `${qCtx}.textEvidenceSnippet`,
          q.textEvidenceSnippet
        );
        if (q.hint) {
          checkTashkeelValidityAndOrthography(`${qCtx}.hint`, q.hint);
        }
      }
    }

    // 6. Inductive Grammar Discovery
    if (story.type === "standard" && !story.grammarDiscovery) {
      report(ctx, `standard story must define grammarDiscovery`);
    }
    if (story.grammarDiscovery) {
      const g = story.grammarDiscovery;
      const gCtx = `${ctx}.grammarDiscovery`;
      if (g.ruleLabel !== undefined && g.ruleLabel !== g.label) {
        report(gCtx, `ruleLabel differs from label`);
      }
      for (const reqField of [
        "targetRule",
        "observation",
        "label",
        "productionPrompt",
      ]) {
        if (!g[reqField] || !g[reqField].trim()) {
          report(gCtx, `${reqField} is empty`);
        }
      }
      checkTashkeelValidityAndOrthography(`${gCtx}.targetRule`, g.targetRule);
      for (const vocField of ["observation", "label", "productionPrompt"]) {
        checkTashkeelValidityAndOrthography(`${gCtx}.${vocField}`, g[vocField]);
        checkVocalizationDensity(`${gCtx}.${vocField}`, g[vocField]);
      }

      if (!Array.isArray(g.examples) || g.examples.length < 2) {
        report(gCtx, `examples must have at least 2 items`);
      } else {
        const normalizedStory = normalizeForMatch(story.text);
        let anyGrounded = false;
        g.examples.forEach((ex, idx) => {
          if (!ex.trim()) {
            report(gCtx, `examples[${idx}] is empty`);
            return;
          }
          checkTashkeelValidityAndOrthography(`${gCtx}.examples[${idx}]`, ex);
          checkVocalizationDensity(`${gCtx}.examples[${idx}]`, ex);
          if (normalizedStory.includes(normalizeForMatch(ex))) {
            anyGrounded = true;
          }
        });
        if (!anyGrounded) {
          report(
            gCtx,
            `None of grammarDiscovery.examples appear in story.text: ${JSON.stringify(g.examples)}`
          );
        }
      }
    }
  }
}

if (violations > 0) {
  console.error(`\nFound ${violations} reading catalog violation(s).`);
  process.exit(1);
} else {
  const totalStories = levels.reduce((sum, l) => sum + l.stories.length, 0);
  console.log(
    `✅ Reading catalog check passed (${levels.length} levels, ${totalStories} stories).`
  );
}
