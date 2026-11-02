const EASTERN_ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"] as const;

const WESTERN_TO_EASTERN_MAP: Record<string, string> = {
  "0": "٠",
  "1": "١",
  "2": "٢",
  "3": "٣",
  "4": "٤",
  "5": "٥",
  "6": "٦",
  "7": "٧",
  "8": "٨",
  "9": "٩",
};

/**
 * Converts a number or string containing Western digits (0-9) into Eastern Arabic Numerals (٠-٩),
 * while preserving alphanumeric curriculum Standard codes (e.g., K.G.4, K.CC.3, 1.NBT.2, 4.OA.5)
 * and lesson IDs when explicitly requested.
 */
export function toEasternArabicNumerals(value: number | string): string {
  const raw = String(value);
  // Protect Standard codes like K.G.4, 1.G.3, 4.NBT.5, etc.
  const standardPattern = /\b(?:K|[1-5])\.[A-Z]{1,4}\.\d+(?:\.[a-z0-9]+)?\b/g;
  const placeholders: string[] = [];
  const masked = raw.replace(standardPattern, (match) => {
    const idx = placeholders.push(match) - 1;
    return `__STD_${idx}__`;
  });

  const converted = masked.replace(/[0-9]/g, (d) => WESTERN_TO_EASTERN_MAP[d] ?? d);

  return converted.replace(/__STD_([٠-٩0-9]+)__/g, (_, idxStr: string) => {
    const westernIdx = idxStr.replace(/[٠-٩]/g, (ch) =>
      String(EASTERN_ARABIC_DIGITS.indexOf(ch as (typeof EASTERN_ARABIC_DIGITS)[number]))
    );
    return placeholders[Number(westernIdx)] ?? "";
  });
}

/**
 * Formats an integer or float directly into Eastern Arabic Numerals.
 */
export function formatEasternNumber(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => WESTERN_TO_EASTERN_MAP[d] ?? d);
}

/**
 * Formats a lesson code (e.g., "K-1" or "1-12") into Arabic display text using Eastern Arabic Numerals,
 * e.g., "الروضة K - الدرس ١" or "ك-١".
 */
export function formatLessonCodeAr(rawCode: string): string {
  const trimmed = rawCode.trim();
  const [gradePart, lessonPart] = trimmed.split("-");
  if (!gradePart || !lessonPart) {
    return toEasternArabicNumerals(trimmed);
  }
  const lessonNumAr = toEasternArabicNumerals(lessonPart);
  if (gradePart === "K") {
    return `الروضة - درس ${lessonNumAr}`;
  }
  return `الصف ${toEasternArabicNumerals(gradePart)} - درس ${lessonNumAr}`;
}

/**
 * Formats an RTL mathematical equation using Eastern Arabic Numerals.
 */
export function formatEquationRtl(left: number, operator: "+" | "-" | "=" | "×" | "÷", right: number, result?: number): string {
  const l = formatEasternNumber(left);
  const r = formatEasternNumber(right);
  if (result === undefined) {
    return `${l} ${operator} ${r}`;
  }
  return `${l} ${operator} ${r} = ${formatEasternNumber(result)}`;
}

/**
 * Extracts visible text nodes from an HTML/SVG string after stripping:
 * 1. Elements marked with `data-standard-code="true"` (curriculum Standard badges like `K.G.4`)
 * 2. All HTML/SVG tags and their attributes (`<svg viewBox="0 0 100 100">`, etc.)
 * Returns any remaining Western digits (`0-9`) found in visible user-facing text.
 */
export function findWesternNumeralsInRenderedHtml(html: string): string[] {
  // Remove elements explicitly carrying Standard codes
  const withoutStandardBadges = html.replace(
    /<([a-zA-Z0-9-]+)[^>]*data-standard-code="true"[^>]*>[\s\S]*?<\/\1>/g,
    " "
  );
  // Remove style and script tags completely
  const withoutStyleOrScript = withoutStandardBadges
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ");
  // Strip all HTML/SVG opening/closing tags and attributes
  const visibleText = withoutStyleOrScript.replace(/<[^>]+>/g, " ");
  // Also strip standalone canonical Standard codes in text if any
  const withoutInlineStandards = visibleText.replace(
    /\b(?:K|[1-5])\.[A-Z]{1,4}\.\d+(?:\.[a-z0-9]+)?\b/g,
    " "
  );
  const matches = withoutInlineStandards.match(/[0-9]+/g);
  return matches ?? [];
}
