import { exportWorksheetPdf } from "@/pdf/pdf-exporter";
import { type PrintableViewMode } from "@/pdf/print-document";
import { resolveStudioStateFromSearchParams } from "@/lib/studio-state";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const params = url.searchParams;

  const state = resolveStudioStateFromSearchParams({
    grade: params.get("grade") ?? undefined,
    lesson: params.get("lesson") ?? undefined,
    seed: params.get("seed") ?? undefined,
    difficulty: params.get("difficulty") ?? undefined,
    view: params.get("view") ?? undefined,
  });

  const viewMode: PrintableViewMode =
    state.viewMode === "answer-key" ? "answer-key" : "worksheet";

  const baseUrl = new URL(request.url).origin;
  const result = await exportWorksheetPdf({
    grade: state.grade,
    lessonNumber: state.lessonNumber,
    seed: state.seed,
    difficultyLevel: state.difficultyLevel,
    viewMode,
    baseUrl,
  });

  return new Response(new Uint8Array(result.pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": result.contentType,
      "Content-Disposition": `attachment; filename="${result.filename}"`,
      "X-PDF-Page-Count": String(result.pageCount),
      "X-PDF-Within-Page-Budget": String(result.withinPageBudget),
      "Cache-Control": "no-store",
    },
  });
}
