export interface SharePrintContentOptions {
  title: string;
  text: string;
  url: string;
}

export type SharePrintResult =
  "shared" | "copied" | "cancelled" | "unsupported";

export interface SharePrintPdfFileOptions {
  title: string;
  text: string;
  file: File;
}

export type SharePrintPdfResult = "shared" | "cancelled" | "unsupported";

/**
 * Share a printable worksheet/story link via the native Web Share API on
 * mobile/supporting browsers, falling back to clipboard copy on desktop.
 */
export async function sharePrintContent({
  title,
  text,
  url,
}: SharePrintContentOptions): Promise<SharePrintResult> {
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function"
  ) {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return "cancelled";
      }
      // Fall through to clipboard fallback if navigator.share rejects for other reasons
    }
  }

  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    try {
      await navigator.clipboard.writeText(url);
      return "copied";
    } catch {
      return "unsupported";
    }
  }

  return "unsupported";
}

/**
 * Share a generated PDF `File` exclusively via the native Web Share API
 * (`navigator.share({ files })`). Never falls back to downloading to local storage.
 */
export async function sharePrintPdfFile({
  title,
  text,
  file,
}: SharePrintPdfFileOptions): Promise<SharePrintPdfResult> {
  const canShareFiles =
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    typeof navigator.canShare === "function" &&
    navigator.canShare({ files: [file] });

  if (!canShareFiles) {
    return "unsupported";
  }

  try {
    await navigator.share({ title, text, files: [file] });
    return "shared";
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return "cancelled";
    }
    return "unsupported";
  }
}
