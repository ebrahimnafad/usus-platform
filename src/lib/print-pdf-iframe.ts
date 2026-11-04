/**
 * Prints a PDF document via a hidden iframe so the browser's native PDF print
 * dialog is used instead of a raw `window.print()` on the host page.
 *
 * Per ADR-0011: this module owns the full iframe print lifecycle — blob URL
 * creation, load timeout, title management, cleanup, and blob revocation.
 */

/** How long to wait for the iframe to load the PDF before giving up (ms). */
const IFRAME_LOAD_TIMEOUT_MS = 15_000;

/**
 * How long to wait after `iframe.contentWindow.print()` is called before
 * revoking the blob URL and removing the iframe.  Generous to allow the
 * OS print spooler to finish reading the bytes.
 */
const POST_PRINT_CLEANUP_DELAY_MS = 3_000;

/**
 * Fetches a PDF from `pdfUrl`, injects it into a hidden iframe, and triggers
 * the browser print dialog on that iframe's content window.
 *
 * @param pdfUrl        URL of the PDF to print (can be `/api/pdf?…`).
 * @param documentTitle Optional title to set on `document.title` while the
 *                      print dialog is open.  The original title is always
 *                      restored — even on failure.
 *
 * @throws If the PDF cannot be fetched, or if the iframe times out or fails
 *         to load.  The caller should fall back to `window.print()`.
 */
export async function printPdfViaIframe(
  pdfUrl: string,
  documentTitle?: string
): Promise<void> {
  const originalTitle = document.title;

  if (documentTitle) {
    document.title = documentTitle;
  }

  try {
    const res = await fetch(pdfUrl);
    if (!res.ok) {
      throw new Error(`PDF fetch failed: HTTP ${res.status}`);
    }

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    return new Promise<void>((resolve, reject) => {
      const iframe = document.createElement("iframe");
      iframe.style.cssText =
        "position:fixed;right:0;bottom:0;width:0;height:0;border:0";

      const cleanup = () => {
        document.title = originalTitle;
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
        // Revoke after a generous delay so the OS spooler finishes reading.
        setTimeout(
          () => URL.revokeObjectURL(blobUrl),
          POST_PRINT_CLEANUP_DELAY_MS
        );
      };

      // Guard against the iframe never firing `onload` (e.g. network error,
      // unsupported MIME type, or browser security policy).
      const loadTimeout = window.setTimeout(() => {
        cleanup();
        reject(new Error("PDF iframe load timed out"));
      }, IFRAME_LOAD_TIMEOUT_MS);

      iframe.onload = () => {
        clearTimeout(loadTimeout);
        // Brief delay lets the PDF renderer finish before the print dialog opens.
        window.setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
          } finally {
            // Revoke/cleanup after print has had time to spool.
            window.setTimeout(() => {
              cleanup();
              resolve();
            }, POST_PRINT_CLEANUP_DELAY_MS);
          }
        }, 100);
      };

      iframe.onerror = () => {
        clearTimeout(loadTimeout);
        cleanup();
        reject(new Error("PDF iframe failed to load"));
      };

      iframe.src = blobUrl;
      document.body.appendChild(iframe);
    });
  } catch (err) {
    // Always restore the title on any error path.
    document.title = originalTitle;
    throw err;
  }
}
