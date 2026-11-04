"use client";

import React from "react";

export function StudioSidebarSkeleton(): React.ReactElement {
  return (
    <aside
      data-sidebar-skeleton="true"
      aria-busy="true"
      aria-label="جاري تحميل المنهج"
      className="no-print w-full shrink-0 border-l border-slate-200 bg-white p-4 shadow-xs lg:w-96 animate-pulse"
    >
      {/* Title placeholder */}
      <div className="mb-4 border-b border-slate-100 pb-3">
        <div className="h-6 w-3/4 rounded-lg bg-slate-200 mb-2" />
        <div className="h-3 w-1/2 rounded-md bg-slate-100" />
      </div>

      {/* Search bar placeholder */}
      <div className="mb-4 h-9 w-full rounded-xl bg-slate-100" />

      {/* Controls placeholder */}
      <div className="mb-4 h-24 w-full rounded-2xl bg-indigo-50/50" />

      {/* Units list skeleton items */}
      <div className="space-y-3">
        <div className="h-4 w-28 rounded-md bg-slate-200" />
        <div className="h-12 w-full rounded-xl bg-slate-100" />
        <div className="h-12 w-full rounded-xl bg-slate-100" />
        <div className="h-12 w-full rounded-xl bg-slate-100" />
        <div className="h-12 w-full rounded-xl bg-slate-100" />
      </div>
    </aside>
  );
}

export function StudioCanvasSkeleton(): React.ReactElement {
  return (
    <main
      data-canvas-skeleton="true"
      aria-busy="true"
      aria-label="جاري تجهيز ورقة العمل"
      className="flex flex-1 flex-col overflow-x-hidden p-6 animate-pulse"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="h-8 w-48 rounded-xl bg-slate-200" />
        <div className="h-8 w-32 rounded-xl bg-slate-100" />
      </div>
      <div className="flex-1 rounded-3xl border-2 border-dashed border-slate-200 bg-white/60 p-8 min-h-[500px]" />
    </main>
  );
}

export function StudioSkeleton(): React.ReactElement {
  return (
    <div
      data-studio-skeleton="true"
      className="flex flex-1 flex-col lg:flex-row"
    >
      <StudioSidebarSkeleton />
      <StudioCanvasSkeleton />
    </div>
  );
}

export default StudioSkeleton;
