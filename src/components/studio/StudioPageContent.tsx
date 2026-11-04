"use client";

import React from "react";
import type { GeneratedWorksheetBundle, Grade, GradeId } from "@/domain/types";
import type { StudioResolvedState } from "@/lib/studio-state";
import { TeacherStudio } from "@/components/studio/TeacherStudioClient";
import { StudioCanvasRoute } from "@/components/studio/StudioCanvasRoute";
import { useStudioUi } from "@/components/studio/StudioShell";

export interface StudioPageContentProps {
  gradeId: GradeId;
  grade: Grade;
  bundle: GeneratedWorksheetBundle;
  state: StudioResolvedState;
}

/**
 * The route page normally renders only the canvas; the panel lives in the
 * layout. When this page is rendered on its own (server-render contracts and
 * the legacy direct-page tests), it falls back to the composite studio.
 */
export function StudioPageContent({
  gradeId,
  grade,
  bundle,
  state,
}: StudioPageContentProps): React.ReactElement {
  const { insideShell } = useStudioUi();

  if (insideShell) {
    return (
      <StudioCanvasRoute
        bundle={bundle}
        initialViewMode={state.viewMode}
        initialZoomPercent={state.zoomPercent}
      />
    );
  }

  return (
    <TeacherStudio
      gradeId={gradeId}
      grades={[grade]}
      initialBundle={bundle}
      initialViewMode={state.viewMode}
      initialSearchQuery={state.searchQuery}
      initialZoomPercent={state.zoomPercent}
      showGradePills={false}
    />
  );
}

export default StudioPageContent;
