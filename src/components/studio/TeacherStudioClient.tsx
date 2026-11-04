"use client";

import React, { useMemo, useState } from "react";
import type {
  GeneratedWorksheetBundle,
  Grade,
  GradeId,
  ViewMode,
  WorksheetDifficultyMode,
} from "@/domain/types";
import { StudioShell } from "@/components/studio/StudioShell";
import { StudioPanel } from "@/components/studio/StudioPanel";
import { StudioCanvas } from "@/components/studio/StudioCanvas";
import { StudioSkeleton } from "@/components/studio/StudioSkeleton";
import { GRADES, getGradeAccents, getGradeConfig } from "@/config/grades";
import { ZOOM_LEVELS } from "@/lib/studio-state";
import { buildStudioSearchParams } from "@/lib/studio-helpers";
import {
  resolveStudioStateFromSearchParams,
  type StudioResolvedState,
  type StudioSearchParamsInput,
} from "@/lib/studio-state";

export type { StudioResolvedState, ViewMode, StudioSearchParamsInput };

export interface TeacherStudioProps {
  gradeId?: GradeId;
  grades: Grade[];
  initialBundle: GeneratedWorksheetBundle;
  initialViewMode?: ViewMode;
  initialSearchQuery?: string;
  initialZoomPercent?: number;
  expandAllUnitsByDefault?: boolean;
  showGradePills?: boolean;
  isLoading?: boolean;
  onNavigateState?: (nextState: StudioResolvedState) => void;
}

export type TeacherStudioClientProps = TeacherStudioProps;

export {
  resolveStudioStateFromSearchParams,
  GRADES,
  getGradeConfig,
  getGradeAccents,
};

/**
 * Composite studio used by the legacy `/math?grade=` route, the scripted
 * loading state, and server-render helpers. The live route splits this into a
 * persistent panel (layout) and a canvas (page).
 */
export function TeacherStudio({
  gradeId,
  grades,
  initialBundle,
  initialViewMode = "worksheet",
  initialSearchQuery = "",
  initialZoomPercent = 100,
  expandAllUnitsByDefault = false,
  showGradePills = !Boolean(gradeId),
  isLoading = false,
  onNavigateState,
}: TeacherStudioProps): React.ReactElement {
  const [selectedGradeId, setSelectedGradeId] = useState<GradeId>(
    gradeId ?? initialBundle.grade.id
  );
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [zoomPercent, setZoomPercent] = useState<number>(initialZoomPercent);

  const selectedGrade = useMemo(
    () => grades.find((grade) => grade.id === selectedGradeId) ?? grades[0],
    [grades, selectedGradeId]
  );

  const navigateToLesson = (
    grade: GradeId,
    lessonNumber: number,
    seed: string = initialBundle.seed,
    difficultyLevel: WorksheetDifficultyMode = initialBundle.difficultyMode,
    view: ViewMode = viewMode
  ) => {
    const nextState: StudioResolvedState = {
      grade,
      lessonNumber,
      seed,
      difficultyLevel,
      viewMode: view,
      searchQuery: initialSearchQuery,
      zoomPercent,
    };

    if (onNavigateState) {
      onNavigateState(nextState);
      return;
    }

    const queryString = buildStudioSearchParams(nextState);
    if (typeof window !== "undefined") {
      window.location.search = queryString;
    }
  };

  const handleRegenerateSeed = (nextSeed: string) => {
    navigateToLesson(
      initialBundle.grade.id,
      initialBundle.lesson.lessonNumber,
      nextSeed,
      initialBundle.difficultyMode,
      viewMode
    );
  };

  const handleZoomStep = (delta: -1 | 1) => {
    setZoomPercent((current) => {
      const index = ZOOM_LEVELS.indexOf(current);
      const base = index >= 0 ? index : 2;
      const next = Math.max(0, Math.min(ZOOM_LEVELS.length - 1, base + delta));
      return ZOOM_LEVELS[next];
    });
  };

  return (
    <StudioShell
      grade={selectedGrade}
      panel={
        isLoading ? null : (
          <StudioPanel
            grade={selectedGrade}
            lessonNumber={initialBundle.lesson.lessonNumber}
            seed={initialBundle.seed}
            difficultyMode={initialBundle.difficultyMode}
            viewMode={viewMode}
            initialSearchQuery={initialSearchQuery}
            grades={grades}
            selectedGradeId={selectedGradeId}
            showGradePills={showGradePills}
            expandAllUnitsByDefault={expandAllUnitsByDefault}
            onSelectLesson={navigateToLesson}
            onSelectDifficulty={(mode) =>
              navigateToLesson(
                initialBundle.grade.id,
                initialBundle.lesson.lessonNumber,
                initialBundle.seed,
                mode,
                viewMode
              )
            }
            onRegenerateSeed={handleRegenerateSeed}
            onSelectGrade={setSelectedGradeId}
          />
        )
      }
      entranceFade
    >
      {isLoading ? (
        <StudioSkeleton />
      ) : (
        <StudioCanvas
          bundle={initialBundle}
          viewMode={viewMode}
          zoomPercent={zoomPercent}
          onViewModeChange={setViewMode}
          onZoomStep={handleZoomStep}
          onSelectPrerequisite={(grade, lessonNumber) =>
            navigateToLesson(
              grade,
              lessonNumber,
              initialBundle.seed,
              initialBundle.difficultyMode,
              viewMode
            )
          }
        />
      )}
    </StudioShell>
  );
}

export const TeacherStudioClient = TeacherStudio;
