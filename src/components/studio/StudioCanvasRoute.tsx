"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type {
  GeneratedWorksheetBundle,
  GradeId,
  ViewMode,
} from "@/domain/types";
import { StudioCanvas } from "@/components/studio/StudioCanvas";
import { useStudioUi } from "@/components/studio/StudioShell";
import {
  resolveStudioNavigationTransition,
  resolveStudioStateFromSearchParams,
  stepStudioZoom,
  type StudioNavigationAction,
  type StudioResolvedState,
} from "@/lib/studio-state";

export interface StudioCanvasRouteProps {
  bundle: GeneratedWorksheetBundle;
  initialViewMode: ViewMode;
  initialZoomPercent: number;
}

export function StudioCanvasRoute({
  bundle,
  initialViewMode,
  initialZoomPercent,
}: StudioCanvasRouteProps): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const { pending, beginTuning, settle } = useStudioUi();
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [zoomPercent, setZoomPercent] = useState(initialZoomPercent);

  useEffect(() => {
    setViewMode(initialViewMode);
  }, [initialViewMode]);

  useEffect(() => {
    setZoomPercent(initialZoomPercent);
  }, [initialZoomPercent]);

  useEffect(() => {
    settle();
  }, [bundle.lesson.id, bundle.seed, bundle.difficultyMode, settle]);

  const currentSnapshot = (): StudioResolvedState => {
    const rawSearch =
      typeof window !== "undefined"
        ? Object.fromEntries(new URLSearchParams(window.location.search))
        : {};
    return resolveStudioStateFromSearchParams({
      ...rawSearch,
      grade: bundle.grade.id,
      lesson: bundle.lesson.lessonNumber,
      seed: bundle.seed,
      difficulty: bundle.difficultyMode,
      view: viewMode,
      zoom: zoomPercent,
    });
  };

  const dispatchCanvasNavigation = (action: StudioNavigationAction) => {
    const transition = resolveStudioNavigationTransition(
      currentSnapshot(),
      action,
      pathname
    );
    if (transition.historyMode === "push") {
      router.push(transition.href, { scroll: false });
    } else {
      router.replace(transition.href, { scroll: false });
    }
  };

  const onViewModeChange = (nextViewMode: ViewMode) => {
    setViewMode(nextViewMode);
    if (typeof window === "undefined") return;
    dispatchCanvasNavigation({ type: "select-view", viewMode: nextViewMode });
  };

  const onZoomStep = (delta: -1 | 1) => {
    setZoomPercent((current) => stepStudioZoom(current, delta));
  };

  const onSelectPrerequisite = (targetGrade: GradeId, lessonNumber: number) => {
    beginTuning();
    dispatchCanvasNavigation({
      type: "select-prerequisite",
      grade: targetGrade,
      lessonNumber,
    });
  };

  return (
    <StudioCanvas
      bundle={bundle}
      viewMode={viewMode}
      zoomPercent={zoomPercent}
      isPending={pending}
      onViewModeChange={onViewModeChange}
      onZoomStep={onZoomStep}
      onSelectPrerequisite={onSelectPrerequisite}
    />
  );
}

export default StudioCanvasRoute;
