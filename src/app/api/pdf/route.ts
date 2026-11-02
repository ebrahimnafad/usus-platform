import type { GradeId, WorksheetDifficultyMode } from "@/domain/types";
import {
  VALID_DIFFICULTY_MODES,
  VALID_GRADES,
} from "@/components/studio/TeacherStudio";
import {
  exportWorksheetPdf,
  type PrintableViewMode,
} from "@/pdf/pdf-exporter";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const params = url.searchParams;

  const rawGrade = params.get("grade") ?? "K";
  const grade: GradeId = VALID_GRADES.includes(rawGrade as GradeId)
    ? (rawGrade as GradeId)
    : "K";

  const parsedLesson = parseInt(params.get("lesson") ?? "1", 10);
  const lessonNumber =
    Number.isFinite(parsedLesson) && parsedLesson >= 1 && parsedLesson <= 135
      ? parsedLesson
      : 1;

  const seed = (params.get("seed") ?? "K1-2026").trim() || "K1-2026";

  const rawDifficulty = params.get("difficulty") ?? "scaffolded";
  const difficultyLevel: WorksheetDifficultyMode =
    VALID_DIFFICULTY_MODES.includes(rawDifficulty as WorksheetDifficultyMode)
      ? (rawDifficulty as WorksheetDifficultyMode)
      : "scaffolded";

  const viewMode: PrintableViewMode =
    params.get("view") === "answer-key" ? "answer-key" : "worksheet";

  const result = await exportWorksheetPdf({
    grade,
    lessonNumber,
    seed,
    difficultyLevel,
    viewMode,
  });

  return new Response(new Uint8Array(result.pdfBuffer), {
    status: 200,
    headers: {
      "Content-Type": result.contentType,
      "Content-Disposition": `attachment; filename="${result.filename}"`,
      "X-PDF-Page-Count": String(result.pageCount),
      "Cache-Control": "no-store",
    },
  });
}
