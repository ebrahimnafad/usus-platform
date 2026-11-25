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

/**
 * Print clean A4 worksheet HTML via a hidden same-origin iframe (ADR-0017).
 * Avoids any Playwright/server-PDF round-trip so printing opens in milliseconds.
 */
export async function printHtmlInIframe({
  bodyHtml,
  title,
  colorMode = "color",
  fontFamily = "cairo",
}: PrintHtmlInIframeOptions): Promise<void> {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.setAttribute("data-print-iframe", "true");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";

  const headStyles = collectHeadStylesHtml();
  const bwCss = colorMode === "bw" ? BW_INK_SAVING_CSS : "";
  const fontStack = resolvePrintFontStack(fontFamily);
  const fontCss = `
html, body, .a4-sheet, .reading-a4-sheet, [data-worksheet-surface="true"], .font-serif {
  font-family: ${fontStack} !important;
}
`;

  const docHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <title>${title.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</title>
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

  document.body.appendChild(iframe);

  const cleanup = () => {
    if (iframe.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }
  };

  try {
    const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
    const win = iframe.contentWindow;
    if (!doc || !win) {
      cleanup();
      window.print();
      return;
    }

    doc.open();
    doc.write(docHtml);
    doc.close();

    // Wait briefly for font/style application on the new document
    await new Promise<void>((resolve) => {
      const fontsReady = (doc as Document & { fonts?: FontFaceSet }).fonts
        ?.ready;
      if (fontsReady && typeof fontsReady.then === "function") {
        Promise.race([
          fontsReady.then(() => undefined),
          new Promise<void>((r) => setTimeout(r, 150)),
        ]).then(resolve);
      } else {
        setTimeout(resolve, 30);
      }
    });

    win.addEventListener("afterprint", cleanup, { once: true });
    win.focus();
    win.print();

    // Fallback cleanup in case afterprint does not fire in some browsers
    setTimeout(cleanup, 60_000);
  } catch {
    cleanup();
    window.print();
  }
}
