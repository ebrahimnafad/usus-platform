"use client";

import React, { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Grade, GradeId, WorksheetDifficultyMode } from "@/domain/types";
import { StudioPanel } from "@/components/studio/StudioPanel";
import { useStudioUi } from "@/components/studio/StudioShell";
import { buildStudioSearchParams } from "@/lib/studio-helpers";
import {
  resolveStudioStateFromSearchParams,
  type StudioResolvedState,
} from "@/lib/studio-state";

export interface StudioRoutePanelProps {
  grade: Grade;
  initialRailCollapsed?: boolean;
}

function routeForGrade(grade: GradeId): string {
  return `/math/${grade.toLowerCase()}`;
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

  const queryString = useCallback(
    (overrides: Partial<StudioResolvedState> = {}): string =>
      buildStudioSearchParams({
        grade: state.grade,
        lessonNumber: state.lessonNumber,
        seed: state.seed,
        difficultyLevel: state.difficultyLevel,
        viewMode: state.viewMode,
        ...overrides,
      }),
    [state]
  );

  const pushState = useCallback(
    (overrides: Partial<StudioResolvedState>) => {
      const targetGrade = overrides.grade ?? state.grade;
      const params = queryString({ ...overrides, grade: targetGrade });
      router.push(`${routeForGrade(targetGrade)}?${params}`, {
        scroll: false,
      });
    },
    [queryString, router, state.grade]
  );

  const replaceState = useCallback(
    (overrides: Partial<StudioResolvedState>) => {
      const params = queryString(overrides);
      router.replace(`${pathname}?${params}`, { scroll: false });
    },
    [pathname, queryString, router]
  );

  const onSelectLesson = (targetGrade: GradeId, lessonNumber: number) => {
    beginTuning();
    pushState({ grade: targetGrade, lessonNumber });
  };

  const onSelectDifficulty = (mode: WorksheetDifficultyMode) => {
    beginTuning();
    replaceState({ difficultyLevel: mode });
  };

  const onRegenerateSeed = (nextSeed: string) => {
    beginTuning();
    replaceState({ seed: nextSeed });
  };

  const onSelectGrade = (targetGrade: GradeId) => {
    replaceState({ grade: targetGrade, lessonNumber: 1 });
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
