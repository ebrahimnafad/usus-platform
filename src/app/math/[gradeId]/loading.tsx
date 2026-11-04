import React from "react";
import { StudioCanvasSkeleton } from "@/components/studio/StudioSkeleton";

/**
 * The route fallback covers the canvas only. The panel belongs to the layout
 * and must never be replaced by a skeleton.
 */
export default function GradeStudioLoading(): React.ReactElement {
  return (
    <div
      data-studio-loading-root="true"
      className="flex min-h-0 flex-1 flex-col bg-slate-100"
    >
      <StudioCanvasSkeleton />
    </div>
  );
}
