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
import {
  applyStudioNavigationAction,
  buildStudioSearchParams,
  resolveStudioStateFromSearchParams,
  stepStudioZoom,
  type StudioNavigationAction,
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

  const currentState: StudioResolvedState = {
    grade: initialBundle.grade.id,
    lessonNumber: initialBundle.lesson.lessonNumber,
    seed: initialBundle.seed,
    difficultyLevel: initialBundle.difficultyMode,
    viewMode,
    searchQuery: initialSearchQuery,
    zoomPercent,
  };

  const navigateWithAction = (action: StudioNavigationAction) => {
    const nextState = applyStudioNavigationAction(currentState, action);

    if (onNavigateState) {
      onNavigateState(nextState);
      return;
    }

    const queryString = buildStudioSearchParams(nextState);
    if (typeof window !== "undefined") {
      window.location.search = queryString;
    }
  };

  const handleZoomStep = (delta: -1 | 1) => {
    setZoomPercent((current) => stepStudioZoom(current, delta));
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
            onSelectLesson={(grade, lessonNumber) =>
              navigateWithAction({
                type: "select-lesson",
                grade,
                lessonNumber,
              })
            }
            onSelectDifficulty={(difficultyLevel: WorksheetDifficultyMode) =>
              navigateWithAction({
                type: "select-difficulty",
                difficultyLevel,
              })
            }
            onRegenerateSeed={(seed) =>
              navigateWithAction({
                type: "regenerate-seed",
                seed,
              })
            }
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
            navigateWithAction({
              type: "select-prerequisite",
              grade,
              lessonNumber,
            })
          }
          onDifficultyChange={(difficultyLevel) =>
            navigateWithAction({
              type: "select-difficulty",
              difficultyLevel,
            })
          }
          onSeedChange={(seed) =>
            navigateWithAction({
              type: "regenerate-seed",
              seed,
            })
          }
        />
      )}
    </StudioShell>
  );
}

export const TeacherStudioClient = TeacherStudio;
