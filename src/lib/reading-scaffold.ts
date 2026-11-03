/**
 * Utility functions for Arabic text scaffolding, diacritics (Tashkeel) handling,
 * sight-word highlighting, and QAR evidence snippet location.
 */

// Arabic Diacritics unicode range:
// Fathatan (064B), Dammatan (064C), Kasratan (064D), Fathah (064E),
// Dammah (064F), Kasrah (0650), Shaddah (0651), Sukun (0652), Dagger Alif (0670)
const ARABIC_DIACRITICS_REGEX = /[\u064B-\u0652\u0670]/g;

/**
 * Strips all diacritical marks (Tashkeel) from Arabic text.
 */
export function stripTashkeel(text: string): string {
  return text.replace(ARABIC_DIACRITICS_REGEX, "");
}

/**
 * Strips case-ending diacritics (last vowel of words) while preserving inner word diacritics.
 * Used for "partial" Tashkeel mode.
 */
export function toPartialTashkeel(text: string): string {
  // Strip diacritics only when immediately before punctuation or whitespace
  return text.replace(/[\u064B-\u0652\u0670]+(?=[\s.,!؟;:؛)]|$)/g, "");
}

/**
 * Normalizes text for fuzzy snippet matching (strips diacritics, normalizes alifs).
 */
export function normalizeArabic(text: string): string {
  return stripTashkeel(text)
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .trim();
}

/**
 * Wraps an exact substring match (or normalized match) with `<mark>` for evidence highlighting.
 */
export function highlightTextSnippet(text: string, snippet?: string): string {
  if (!snippet || !snippet.trim()) return text;

  const trimmedSnippet = snippet.trim();

  // Try exact match first
  if (text.includes(trimmedSnippet)) {
    return text.replaceAll(
      trimmedSnippet,
      `<mark class="bg-amber-200 text-amber-950 font-bold px-1 py-0.5 rounded shadow-xs">${trimmedSnippet}</mark>`
    );
  }

  // Try stripped match if text is fully vocalized
  const strippedSnippet = stripTashkeel(trimmedSnippet);
  const words = text.split(" ");
  const snippetWords = strippedSnippet.split(" ");

  if (snippetWords.length > 0 && snippetWords[0]) {
    const firstWordClean = snippetWords[0];
    const startIndex = words.findIndex(
      (w) => stripTashkeel(w) === firstWordClean
    );
    if (startIndex !== -1) {
      const matchWords = words.slice(
        startIndex,
        startIndex + snippetWords.length
      );
      const matchedString = matchWords.join(" ");
      return text.replace(
        matchedString,
        `<mark class="bg-amber-200 text-amber-950 font-bold px-1 py-0.5 rounded shadow-xs">${matchedString}</mark>`
      );
    }
  }

  return text;
}

/**
 * Wraps target sight words with visual highlighting according to the chosen style.
 */
export function highlightSightWords(
  text: string,
  targetWords: string[],
  mode: "colored" | "underlined" | "off" = "colored"
): string {
  if (mode === "off" || !targetWords.length) return text;

  let result = text;
  for (const word of targetWords) {
    if (!word) continue;
    const cleanTarget = stripTashkeel(word);
    const regex = new RegExp(
      `(?<=^|\\s)(${escapeRegex(word)}|${escapeRegex(cleanTarget)})(?=[\\s.,!؟;:؛)]|$)`,
      "gu"
    );

    const replacement =
      mode === "colored"
        ? `<span class="bg-emerald-100 text-emerald-900 font-black px-1 rounded border border-emerald-300">$1</span>`
        : `<span class="underline decoration-emerald-500 decoration-2 font-bold text-emerald-900">$1</span>`;

    result = result.replace(regex, replacement);
  }

  return result;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
