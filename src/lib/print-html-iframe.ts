import printFontsConfig from "@/config/print-fonts.json";

export type PrintColorMode = "color" | "bw";
export type PrintFontId = "cairo" | "amiri" | "noto-naskh" | "aref-ruqaa";
export type PrintScope = "lesson" | "unit";
export type PrintViewOption = "worksheet" | "answer-key" | "both";
export type ReadingPrintScope = "story" | "level";
export type ReadingPrintViewOption = "student" | "answer-key" | "both";

export interface PrintFontOption {
  id: PrintFontId;
  labelAr: string;
  subtitleAr: string;
  cssStack: string;
}

const FONT_METADATA: Record<
  PrintFontId,
  { family: string; labelAr: string; subtitleAr: string; fallback: string }
> = {
  cairo: {
    family: "Cairo",
    labelAr: "القاهرة",
    subtitleAr: "عصري وواضح",
    fallback: '"Segoe UI", Tahoma, sans-serif',
  },
  amiri: {
    family: "Amiri",
    labelAr: "الأميري",
    subtitleAr: "نسخ كلاسيكي",
    fallback: '"Noto Naskh Arabic", serif',
  },
  "noto-naskh": {
    family: "Noto Naskh Arabic",
    labelAr: "النسخ العربي",
    subtitleAr: "مريح للتشكيل",
    fallback: '"Amiri", serif',
  },
  "aref-ruqaa": {
    family: "Aref Ruqaa",
    labelAr: "عريف رقعة",
    subtitleAr: "خط الرقعة الأصيل",
    fallback: '"Amiri", serif',
  },
};

export const PRINT_FONT_OPTIONS: readonly PrintFontOption[] = (
  Object.entries(FONT_METADATA) as Array<
    [PrintFontId, (typeof FONT_METADATA)[PrintFontId]]
  >
)
  .filter(([, meta]) => printFontsConfig.families.includes(meta.family))
  .map(([id, meta]) => ({
    id,
    labelAr: meta.labelAr,
    subtitleAr: meta.subtitleAr,
    cssStack: `"${meta.family}", ${meta.fallback}`,
  }));

/** Wrap individual rendered A4 sheet markups with page-break containers. */
export function wrapPrintSheetsHtml(markups: string[]): string {
  return markups
    .map((markup) => `<div class="print-unit-sheet">${markup}</div>`)
    .join("\n");
}

export function resolvePrintFontStack(fontId?: PrintFontId): string {
  const found = PRINT_FONT_OPTIONS.find((opt) => opt.id === fontId);
  return found ? found.cssStack : PRINT_FONT_OPTIONS[0].cssStack;
}

/**
 * Normalize a print document title so browsers (Save as PDF) produce a clean,
 * concise filename without OS-forbidden characters (`\ / : * ? " < > |`).
 */
export function sanitizePrintFilenameTitle(raw: string): string {
  return raw
    .replace(/[\\/:*?"<>|]+/g, " - ")
    .replace(/\s+/g, " ")
    .replace(/^(?:\s*-\s*)+|(?:\s*-\s*)+$/g, "")
    .trim();
}

export interface PrintHtmlInIframeOptions {
  bodyHtml: string;
  title: string;
  colorMode?: PrintColorMode;
  fontFamily?: PrintFontId;
}

const BW_INK_SAVING_CSS = `
@media all {
  [data-worksheet-surface="true"],
  .reading-a4-sheet {
    filter: grayscale(100%) contrast(1.08);
  }
  [data-worksheet-surface="true"] header,
  [data-worksheet-surface="true"] [data-section-id],
  [data-worksheet-surface="true"] [data-exercise-id],
  [data-worksheet-surface="true"] [data-strategy-hint="true"],
  .reading-a4-sheet header,
  .reading-a4-sheet section {
    background: #ffffff !important;
    background-image: none !important;
  }
  [data-worksheet-surface="true"] header,
  .reading-a4-sheet header {
    border-color: #1e293b !important;
  }
  [data-worksheet-surface="true"] [data-section-id],
  .reading-a4-sheet section {
    border-color: #334155 !important;
  }
  [data-worksheet-surface="true"] [data-section-id] > div:first-child {
    background: #f1f5f9 !important;
    border-bottom: 1px solid #94a3b8;
  }
}
`;

const MULTI_SHEET_BREAK_CSS = `
.print-unit-sheet + .print-unit-sheet {
  break-before: page;
  page-break-before: always;
}
`;

function collectHeadStylesHtml(): string {
  if (typeof document === "undefined") return "";
  const nodes = document.querySelectorAll('style, link[rel="stylesheet"]');
  const parts: string[] = [];
  nodes.forEach((node) => {
    parts.push(node.outerHTML);
  });
  return parts.join("\n");
}

interface MountedPrintIframe {
  iframe: HTMLIFrameElement;
  doc: Document;
  win: Window;
  safeTitle: string;
  cleanup: () => void;
}

async function mountPrintIframe({
  bodyHtml,
  title,
  colorMode = "color",
  fontFamily = "cairo",
  visibleForCapture = false,
}: PrintHtmlInIframeOptions & {
  visibleForCapture?: boolean;
}): Promise<MountedPrintIframe | null> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return null;
  }

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.setAttribute("data-print-iframe", "true");
  iframe.style.position = "fixed";
  if (visibleForCapture) {
    iframe.style.left = "-10000px";
    iframe.style.top = "0";
    iframe.style.width = "794px";
    iframe.style.height = "1123px";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
  } else {
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.visibility = "hidden";
  }
  iframe.style.border = "0";

  const headStyles = collectHeadStylesHtml();
  const printFontsLink = `<link rel="stylesheet" href="${printFontsConfig.stylesheetHref}" />`;
  const baseHref =
    typeof window !== "undefined" && window.location?.href
      ? `<base href="${window.location.href.replace(/"/g, "&quot;")}" />`
      : "";
  const bwCss = colorMode === "bw" ? BW_INK_SAVING_CSS : "";
  const fontStack = resolvePrintFontStack(fontFamily);
  const fontCss = `
html, body, .a4-sheet, .reading-a4-sheet, [data-worksheet-surface="true"], .font-serif {
  font-family: ${fontStack} !important;
}
`;

  const safeTitle = sanitizePrintFilenameTitle(title) || "ورقة-عمل";
  const docHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  ${baseHref}
  <title>${safeTitle.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</title>
  ${printFontsLink}
  ${headStyles}
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    ${fontCss}
    ${MULTI_SHEET_BREAK_CSS}
    ${bwCss}
  </style>
</head>
<body class="${colorMode === "bw" ? "print-bw" : "print-color"}">
  ${bodyHtml}
</body>
</html>`;

  const previousTitle = document.title;
  if (!visibleForCapture) {
    document.title = safeTitle;
  }
  document.body.appendChild(iframe);

  const cleanup = () => {
    if (!visibleForCapture) {
      document.title = previousTitle;
    }
    if (iframe.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }
  };

  const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
  const win = iframe.contentWindow;
  if (!doc || !win) {
    cleanup();
    return null;
  }

  doc.open();
  doc.write(docHtml);
  doc.close();

  // Wait for all stylesheet <link> elements to finish loading before printing/capturing
  const stylesheetLinks = Array.from(
    doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
  );
  if (stylesheetLinks.length > 0) {
    await Promise.race([
      Promise.all(
        stylesheetLinks.map((link) =>
          link.sheet
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                link.addEventListener("load", () => resolve(), {
                  once: true,
                });
                link.addEventListener("error", () => resolve(), {
                  once: true,
                });
              })
        )
      ),
      new Promise<void>((r) => setTimeout(r, 5000)),
    ]);
  }

  // Wait for font/style application on the new document
  await new Promise<void>((resolve) => {
    const fontsReady = (doc as Document & { fonts?: FontFaceSet }).fonts?.ready;
    if (fontsReady && typeof fontsReady.then === "function") {
      Promise.race([
        fontsReady.then(() => undefined),
        new Promise<void>((r) => setTimeout(r, 2000)),
      ]).then(resolve);
    } else {
      setTimeout(resolve, 30);
    }
  });

  // Ensure layout has been computed with loaded styles
  if (typeof win.requestAnimationFrame === "function") {
    await new Promise<void>((resolve) => {
      win.requestAnimationFrame(() =>
        win.requestAnimationFrame(() => resolve())
      );
    });
  }

  return { iframe, doc, win, safeTitle, cleanup };
}

/**
 * Print clean A4 worksheet HTML via a hidden same-origin iframe (ADR-0017).
 * Avoids any Playwright/server-PDF round-trip so printing opens in milliseconds.
 */
export async function printHtmlInIframe(
  options: PrintHtmlInIframeOptions
): Promise<void> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  let mounted: MountedPrintIframe | null = null;
  try {
    mounted = await mountPrintIframe(options);
    if (!mounted) {
      window.print();
      return;
    }

    const { win, cleanup } = mounted;
    win.addEventListener("afterprint", cleanup, { once: true });
    win.focus();
    win.print();

    // Fallback cleanup in case afterprint does not fire in some browsers
    setTimeout(cleanup, 60_000);
  } catch {
    mounted?.cleanup();
    window.print();
  }
}

/**
 * Render printable A4 HTML client-side into a real PDF `File` object so the
 * Share button can attach an actual `.pdf` via the Web Share API (`files`).
 */
export async function renderHtmlToPdfFile(
  options: PrintHtmlInIframeOptions
): Promise<File> {
  const mounted = await mountPrintIframe({
    ...options,
    visibleForCapture: true,
  });
  if (!mounted) {
    throw new Error("Could not mount offscreen frame for PDF generation");
  }

  try {
    const { doc, safeTitle } = mounted;
    const [{ toJpeg }, { jsPDF }] = await Promise.all([
      import("html-to-image"),
      import("jspdf"),
    ]);

    const sheetNodes = Array.from(
      doc.querySelectorAll<HTMLElement>(".a4-sheet, .reading-a4-sheet")
    );
    const targets = sheetNodes.length > 0 ? sheetNodes : [doc.body];

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      if (i > 0) {
        pdf.addPage("a4", "portrait");
      }

      const dataUrl = await toJpeg(target, {
        pixelRatio: 2,
        quality: 0.92,
        backgroundColor: "#ffffff",
      });

      const widthPx = target.scrollWidth || 794;
      const heightPx = target.scrollHeight || 1123;
      const pageWidthMm = 210;
      const pageHeightMm = 297;
      const scaledHeightMm = (heightPx / widthPx) * pageWidthMm;
      const drawHeightMm = Math.min(pageHeightMm, scaledHeightMm);
      const drawWidthMm =
        scaledHeightMm > pageHeightMm
          ? pageWidthMm * (pageHeightMm / scaledHeightMm)
          : pageWidthMm;
      const offsetX = (pageWidthMm - drawWidthMm) / 2;

      pdf.addImage(
        dataUrl,
        "JPEG",
        offsetX,
        0,
        drawWidthMm,
        drawHeightMm,
        undefined,
        "FAST"
      );
    }

    const blob = pdf.output("blob");
    return new File([blob], `${safeTitle}.pdf`, { type: "application/pdf" });
  } finally {
    mounted.cleanup();
  }
}
