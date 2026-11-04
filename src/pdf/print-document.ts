import type {
  GeneratedWorksheetBundle,
  GradeId,
  WorksheetDifficultyMode,
} from "@/domain/types";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";

export type PrintableViewMode = "worksheet" | "answer-key";

export interface ExportWorksheetPdfInput {
  grade: GradeId;
  lessonNumber: number;
  seed: string;
  difficultyLevel?: WorksheetDifficultyMode;
  viewMode?: PrintableViewMode;
  baseUrl?: string;
}

export interface PrintCleanA4Document {
  html: string;
  bundle: GeneratedWorksheetBundle;
  filename: string;
  viewMode: PrintableViewMode;
}

const PRINT_CLEAN_A4_CSS = `
@page {
  size: A4 portrait;
  margin: 0;
}

*, *::before, *::after {
  box-sizing: border-box;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

html, body {
  direction: ltr;
  margin: 0;
  padding: 0;
  background: #ffffff;
  color: #0f172a;
  font-family: "Cairo", "Readex Pro", "Segoe UI", Tahoma, Arial, sans-serif;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}

.a4-sheet {
  direction: rtl;
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  padding: 8mm 10mm;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.break-inside-avoid,
[data-exercise-id] {
  break-inside: avoid !important;
  page-break-inside: avoid !important;
}

[data-section-id] {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 16px;
  border: 2px solid #cbd5e1;
  background: #ffffff;
}

[data-section-id="warm-up"] { border-color: #fcd34d; }
[data-section-id="practice"] { border-color: #7dd3fc; }
[data-section-id="challenge"] { border-color: #c4b5fd; }

[data-exercise-id] {
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
}

[data-archetype="ConnectMatch"] > div:first-child {
  display: grid;
  grid-template-columns: 1fr 160px 1fr;
  gap: 8px;
  align-items: stretch;
  padding: 8px;
  border-radius: 12px;
  border: 1.5px solid #e0e7ff;
  background: #ffffff;
}

[data-match-right-id],
[data-match-left-id] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
  padding: 4px 10px;
  margin-top: 4px;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  background: #ffffff;
}

[data-strategy-hint="true"] {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 6px;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #6ee7b7;
  background: #ecfdf5;
  color: #064e3b;
  font-size: 11px;
  font-weight: 700;
}

header {
  padding: 12px;
  border-radius: 16px;
  border: 2px solid #c7d2fe;
  background: linear-gradient(to left, #eef2ff, #f0f9ff, #fffbeb);
  margin-bottom: 10px;
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid #e2e8f0;
  padding-top: 8px;
  margin-top: 10px;
  font-size: 11px;
  font-weight: 700;
  color: #475569;
}

h1 { font-size: 18px; font-weight: 800; margin: 4px 0; }
h2 { font-size: 14px; font-weight: 800; margin: 0; }
p { margin: 0; font-size: 13px; font-weight: 700; }

.flex { display: flex; }
.inline-flex { display: inline-flex; }
.grid { display: grid; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.gap-1 { gap: 4px; }
.gap-1\\.5 { gap: 6px; }
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
`;

function sanitizeFilenamePart(value: string | number): string {
  return String(value).replace(/[^a-zA-Z0-9_-]/g, "-");
}

export async function buildPrintCleanA4Html(
  input: ExportWorksheetPdfInput
): Promise<PrintCleanA4Document> {
  const viewMode: PrintableViewMode =
    input.viewMode === "answer-key" ? "answer-key" : "worksheet";
  const difficultyLevel: WorksheetDifficultyMode =
    input.difficultyLevel ?? "scaffolded";
  const seed = (input.seed ?? "K1-2026").trim() || "K1-2026";

  const bundle = generateWorksheet({
    grade: input.grade,
    lessonNumber: input.lessonNumber,
    seed,
    difficultyLevel,
  });

  const { renderToStaticMarkup } = await import("react-dom/server");
  const { default: React } = await import("react");

  const surfaceMarkup = renderToStaticMarkup(
    React.createElement(WorksheetSurface, {
      bundle,
      viewMode,
    })
  );

  const html = `<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="utf-8" />
  <style>${PRINT_CLEAN_A4_CSS}</style>
</head>
<body>
  <main class="min-h-screen bg-white p-0">${surfaceMarkup}</main>
</body>
</html>`;

  const filename = `worksheet-${sanitizeFilenamePart(
    input.grade
  )}-${sanitizeFilenamePart(input.lessonNumber)}-${sanitizeFilenamePart(
    seed
  )}-${viewMode}.pdf`;

  return {
    html,
    bundle,
    filename,
    viewMode,
  };
}
