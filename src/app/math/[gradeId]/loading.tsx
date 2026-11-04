import React from "react";
import { StudioSkeleton } from "@/components/studio/StudioSkeleton";

export default function GradeStudioLoading(): React.ReactElement {
  return (
    <div
      dir="rtl"
      lang="ar"
      className="flex min-h-screen flex-col bg-slate-100"
      data-studio-loading-root="true"
    >
      {/* Top placeholder bar */}
      <div className="no-print h-14 w-full bg-slate-300/80 animate-pulse" />
      <StudioSkeleton />
    </div>
  );
}
