import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { GeneratedWorksheetBundle } from "@/domain/types";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { generateWorksheet } from "@/engine/worksheet-engine";
import {
  TeacherStudio,
  TeacherStudioClient,
  DIFFICULTY_OPTIONS,
  VALID_DIFFICULTY_MODES,
  VALID_GRADES,
  VALID_VIEW_MODES,
  ZOOM_LEVELS,
  applyStudioNavigationAction,
  buildPdfExportUrl,
  buildStudioSearchParams,
  filterUnitsForStudioSearch,
  formatGradePillLabelAr,
  mintNextStudioSeed,
  resolveStudioStateFromSearchParams,
  type StudioNavigationAction,
  type StudioResolvedState,
  type StudioSearchParamsInput,
  type TeacherStudioClientProps,
  type TeacherStudioProps,
} from "@/components/studio/TeacherStudioClient";

export {
  TeacherStudio,
  TeacherStudioClient,
  DIFFICULTY_OPTIONS,
  VALID_DIFFICULTY_MODES,
  VALID_GRADES,
  VALID_VIEW_MODES,
  ZOOM_LEVELS,
  applyStudioNavigationAction,
  buildPdfExportUrl,
  buildStudioSearchParams,
  filterUnitsForStudioSearch,
  formatGradePillLabelAr,
  mintNextStudioSeed,
  resolveStudioStateFromSearchParams,
  type StudioNavigationAction,
  type StudioResolvedState,
  type StudioSearchParamsInput,
  type TeacherStudioClientProps,
  type TeacherStudioProps,
};

export interface RenderTeacherStudioInput extends StudioSearchParamsInput {
  expandAllUnits?: boolean;
}

export interface RenderedTeacherStudioResult {
  html: string;
  state: StudioResolvedState;
  bundle: GeneratedWorksheetBundle;
  searchParamsString: string;
  pdfExportUrl: string;
}

/**
 * Renders the full 2-pane RTL Arabic Teacher Studio for a given set of studio query parameters,
 * returning the rendered HTML, resolved studio state, generated worksheet bundle, and URLs.
 */
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
