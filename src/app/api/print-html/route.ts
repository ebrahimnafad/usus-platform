import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { hasAuthoredBlueprint } from "@/blueprints/registry";
import "@/registry/bootstrap";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";
import { resolveStudioStateFromSearchParams } from "@/lib/studio-state";
import { formatEasternNumber } from "@/lib/numerals";
import type { ViewMode } from "@/domain/types";

import {
  wrapPrintSheetsHtml,
  type PrintScope,
  type PrintViewOption,
} from "@/lib/print-html-iframe";

export const runtime = "nodejs";
export type { PrintScope, PrintViewOption };

function resolvePrintViewOption(raw: string | null): PrintViewOption {
  if (raw === "answer-key" || raw === "both") return raw;
  return "worksheet";
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { searchParams } = request.nextUrl;

  const state = resolveStudioStateFromSearchParams({
    grade: searchParams.get("grade") ?? undefined,
    lesson: searchParams.get("lesson") ?? undefined,
    seed: searchParams.get("seed") ?? undefined,
    difficulty: searchParams.get("difficulty") ?? undefined,
    view: searchParams.get("view") ?? undefined,
  });

  const scope: PrintScope =
    searchParams.get("scope") === "unit" ? "unit" : "lesson";
  const viewOption = resolvePrintViewOption(searchParams.get("viewOption"));
  const qrOrigin = request.nextUrl.origin;

  const catalog = getCurriculumCatalog();
  const grade = catalog.grades[state.grade];
  const currentLesson =
    grade.lessons.find((l) => l.lessonNumber === state.lessonNumber) ??
    grade.lessons[0];

  const targetLessons =
    scope === "unit"
      ? grade.lessons.filter(
          (l) =>
            l.unitNumber === currentLesson.unitNumber &&
            hasAuthoredBlueprint(l.id)
        )
      : [currentLesson];

  const viewsToRender: ViewMode[] =
    viewOption === "both"
      ? ["worksheet", "answer-key"]
      : viewOption === "answer-key"
        ? ["answer-key"]
        : ["worksheet"];

  const htmlSheets: string[] = [];

  for (const lesson of targetLessons) {
    const bundle = generateWorksheet({
      grade: state.grade,
      lessonNumber: lesson.lessonNumber,
      seed: state.seed,
      difficultyLevel: state.difficultyLevel,
    });

    for (const viewMode of viewsToRender) {
      const markup = renderToStaticMarkup(
        React.createElement(WorksheetSurface, {
          bundle,
          viewMode,
          qrOrigin,
        })
      );
      htmlSheets.push(markup);
    }
  }

  const unitAr = formatEasternNumber(currentLesson.unitNumber);
  const lessonAr = formatEasternNumber(currentLesson.lessonNumber);
  const viewSuffix =
    viewOption === "answer-key"
      ? " - نموذج الإجابة"
      : viewOption === "both"
        ? " - ورقة العمل والإجابة"
        : "";
  const title =
    scope === "unit"
      ? `أُسُس - ${grade.labelAr} - الوحدة ${unitAr}${viewSuffix} - ${state.seed}`
      : `أُسُس - ${grade.labelAr} - الدرس ${lessonAr} - ${currentLesson.titleAr}${viewSuffix} - ${state.seed}`;

  return NextResponse.json({
    html: wrapPrintSheetsHtml(htmlSheets),
    lessonCount: targetLessons.length,
    title,
  });
}
