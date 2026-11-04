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
import { buildStudioSearchParams } from "@/lib/studio-helpers";
import { ZOOM_LEVELS } from "@/lib/studio-state";

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

  const onViewModeChange = (nextViewMode: ViewMode) => {
    setViewMode(nextViewMode);
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    params.set("view", nextViewMode);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const onZoomStep = (delta: -1 | 1) => {
    setZoomPercent((current) => {
      const index = ZOOM_LEVELS.indexOf(current);
      const base = index >= 0 ? index : 2;
      const next = Math.max(0, Math.min(ZOOM_LEVELS.length - 1, base + delta));
      return ZOOM_LEVELS[next];
    });
  };

  const onSelectPrerequisite = (targetGrade: GradeId, lessonNumber: number) => {
    beginTuning();
    const params = buildStudioSearchParams({
      grade: targetGrade,
      lessonNumber,
      seed: bundle.seed,
      difficultyLevel: bundle.difficultyMode,
      viewMode,
    });
    router.push(`/math/${targetGrade.toLowerCase()}?${params}`, {
      scroll: false,
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
