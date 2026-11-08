"use client";

import React, { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Grade, GradeId, WorksheetDifficultyMode } from "@/domain/types";
import { StudioPanel } from "@/components/studio/StudioPanel";
import { useStudioUi } from "@/components/studio/StudioShell";
import {
  resolveStudioNavigationTransition,
  resolveStudioStateFromSearchParams,
  type StudioNavigationAction,
} from "@/lib/studio-state";

export interface StudioRoutePanelProps {
  grade: Grade;
  initialRailCollapsed?: boolean;
}

/**
 * Thin route adapter: the only place in the panel path that reads the URL.
 * It hands plain values to the panel and translates intents back into history.
 */
export function StudioRoutePanel({
  grade,
  initialRailCollapsed = false,
}: StudioRoutePanelProps): React.ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { beginTuning } = useStudioUi();

  const state = resolveStudioStateFromSearchParams({
    ...Object.fromEntries(searchParams.entries()),
    grade: grade.id,
  });

  const dispatchNavigation = useCallback(
    (action: StudioNavigationAction, shouldBeginTuning: boolean) => {
      if (shouldBeginTuning) {
        beginTuning();
      }
      const transition = resolveStudioNavigationTransition(
        state,
        action,
        pathname
      );
      if (transition.historyMode === "push") {
        router.push(transition.href, { scroll: false });
      } else {
        router.replace(transition.href, { scroll: false });
      }
    },
    [beginTuning, pathname, router, state]
  );

  const onSelectLesson = (targetGrade: GradeId, lessonNumber: number) => {
    dispatchNavigation(
      { type: "select-lesson", grade: targetGrade, lessonNumber },
      true
    );
  };

  const onSelectDifficulty = (mode: WorksheetDifficultyMode) => {
    dispatchNavigation(
      { type: "select-difficulty", difficultyLevel: mode },
      true
    );
  };

  const onRegenerateSeed = (nextSeed: string) => {
    dispatchNavigation({ type: "regenerate-seed", seed: nextSeed }, true);
  };

  const onSelectGrade = (targetGrade: GradeId) => {
    dispatchNavigation({ type: "select-grade", grade: targetGrade }, false);
  };

  return (
    <StudioPanel
      grade={grade}
      lessonNumber={state.lessonNumber}
      seed={state.seed}
      difficultyMode={state.difficultyLevel}
      viewMode={state.viewMode}
      initialSearchQuery={state.searchQuery}
      selectedGradeId={grade.id}
      initialRailCollapsed={initialRailCollapsed}
      onSelectLesson={onSelectLesson}
      onSelectDifficulty={onSelectDifficulty}
      onRegenerateSeed={onRegenerateSeed}
      onSelectGrade={onSelectGrade}
    />
  );
}

export default StudioRoutePanel;
