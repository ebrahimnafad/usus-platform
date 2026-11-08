import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { GeneratedWorksheetBundle } from "@/domain/types";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { TeacherStudio } from "@/components/studio/TeacherStudioClient";
import {
  buildPdfExportUrl,
  buildStudioSearchParams,
  resolveStudioStateFromSearchParams,
  type StudioSearchParamsInput,
} from "@/lib/studio-state";

export interface RenderTeacherStudioInput extends StudioSearchParamsInput {
  expandAllUnits?: boolean;
}

export interface RenderedTeacherStudioResult {
  html: string;
  state: ReturnType<typeof resolveStudioStateFromSearchParams>;
  bundle: GeneratedWorksheetBundle;
  searchParamsString: string;
  pdfExportUrl: string;
}

export function renderTeacherStudio(
  input: RenderTeacherStudioInput = {}
): RenderedTeacherStudioResult {
  const catalog = getCurriculumCatalog();
  const state = resolveStudioStateFromSearchParams(input);
  const bundle = generateWorksheet({
    grade: state.grade,
    lessonNumber: state.lessonNumber,
    seed: state.seed,
    difficultyLevel: state.difficultyLevel,
  });

  const html = renderToStaticMarkup(
    React.createElement(TeacherStudio, {
      grades: catalog.gradeList,
      initialBundle: bundle,
      initialViewMode: state.viewMode,
      initialSearchQuery: state.searchQuery,
      initialZoomPercent: state.zoomPercent,
      expandAllUnitsByDefault: Boolean(input.expandAllUnits),
    })
  );

  return {
    html,
    state,
    bundle,
    searchParamsString: buildStudioSearchParams(state),
    pdfExportUrl: buildPdfExportUrl(state),
  };
}
