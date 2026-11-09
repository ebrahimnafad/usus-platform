// Shared print-measurement plumbing (layout guard + measure-sheet).
// Single source of truth for: render seeds/modes/views, Chromium PDF options,
// PDF page counting, the print-width pin, and the in-process /print harness.
// Import these; never copy them into another script — copied values are how
// screen/PDF measurement parity drifted before.
import fs from "fs";
import http from "http";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const LIB_DIR = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(LIB_DIR, "..", "..");

export const RENDER_SEEDS = ["LG-A1", "LG-B2", "LG-C3", "LG-D4", "LG-E5"];
export const RENDER_MODES = ["scaffolded", "Easy", "Intermediate", "Advanced"];
export const RENDER_VIEWS = ["worksheet", "answer-key"];

export const VIEWPORT = { width: 794, height: 1123 };

// Chromium PDF options: zero-margin A4 so /Type /Page count == physical pages.
export const PDF_OPTS = {
  format: "A4",
  landscape: false,
  printBackground: true,
  preferCSSPageSize: true,
  scale: 1,
  margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
};

export function countPdfPages(buffer) {
  const matches = buffer.toString("latin1").match(/\/Type\s*\/Page\b(?!s)/g);
  return matches ? matches.length : 1;
}

// The print stylesheet sets the sheet to `width: auto`; pinning it to the
// page's content box reproduces the PDF's layout width on screen.
export function printWidthCss(printableAreaMm) {
  return `@media print { .a4-sheet[data-worksheet-surface="true"] { width: ${printableAreaMm.width}mm !important; } }`;
}

export function parseLessonFilter(filter) {
  if (!filter) return null;
  const lessons = [];
  for (const part of filter.split(",")) {
    const range = part.match(/^([K1-5])-(\d+)(?:\.\.(?:[K1-5]-)?(\d+))?$/);
    if (!range) throw new Error(`Bad --lessons entry "${part}"`);
    const [, grade, from, to] = range;
    for (let n = Number(from); n <= Number(to ?? from); n++) {
      lessons.push({ grade, lesson: n });
    }
  }
  return lessons;
}

/**
 * Renders the /print route fully in-process (no dev server): compiled
 * Tailwind CSS plus an SSR-rendered worksheet surface per search-param job.
 * Returns { baseUrl, renderPrintMain, close }; renderPrintMain(job) builds the
 * `<main>` document so workers can hot-swap it without losing print emulation
 * or injected print-width styles.
 */
export async function createPrintHarness() {
  const postcss = require("postcss");
  const tailwind = require("@tailwindcss/postcss");
  const globalsCssPath = path.join(ROOT, "src", "app", "globals.css");
  const cssResult = await postcss([tailwind()]).process(
    fs.readFileSync(globalsCssPath, "utf8"),
    { from: globalsCssPath }
  );
  const compiledCss = cssResult.css;

  const { createServer } = await import("vite");
  const viteServer = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    esbuild: { jsx: "automatic" },
    resolve: { alias: { "@": path.join(ROOT, "src") } },
  });
  const { renderWorksheetSurface } = await viteServer.ssrLoadModule(
    "/src/lib/render-worksheet-surface.ts"
  );
  const { resolveStudioStateFromSearchParams } = await viteServer.ssrLoadModule(
    "/src/lib/studio-state.ts"
  );

  const renderPrintMain = (job) => {
    const state = resolveStudioStateFromSearchParams({
      grade: job.grade,
      lesson: String(job.lesson),
      seed: job.seed,
      difficulty: job.mode,
      view: job.view,
    });
    const viewMode =
      state.viewMode === "answer-key" ? "answer-key" : "worksheet";
    const surfaceHtml = renderWorksheetSurface({
      grade: state.grade,
      lessonNumber: state.lessonNumber,
      seed: state.seed,
      difficultyLevel: state.difficultyLevel,
      viewMode,
    });
    return `<main class="min-h-screen bg-white p-0">${surfaceHtml}</main>`;
  };

  const httpServer = http.createServer((req, res) => {
    try {
      const u = new URL(req.url ?? "/print", "http://localhost");
      const mainHtml = renderPrintMain({
        grade: u.searchParams.get("grade") ?? "K",
        lesson: u.searchParams.get("lesson") ?? "1",
        seed: u.searchParams.get("seed") ?? "LG-WARM",
        mode: u.searchParams.get("difficulty") ?? "scaffolded",
        view: u.searchParams.get("view") ?? "worksheet",
      });
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"/><style>${compiledCss}</style></head><body class="min-h-screen bg-slate-100 text-slate-900 antialiased">${mainHtml}</body></html>`
      );
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(String(err));
    }
  });
  await new Promise((resolve) => httpServer.listen(0, "127.0.0.1", resolve));
  const addr = httpServer.address();
  const baseUrl = `http://127.0.0.1:${addr.port}`;

  return {
    baseUrl,
    renderPrintMain,
    close() {
      try {
        httpServer.close();
      } catch {
        // ignore
      }
      viteServer.close().catch(() => undefined);
    },
  };
}
