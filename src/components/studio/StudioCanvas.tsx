"use client";

import React, { useEffect, useState } from "react";
import type {
  GeneratedWorksheetBundle,
  GradeId,
  ViewMode,
  WorksheetDifficultyMode,
} from "@/domain/types";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";
import { PrintModal } from "@/components/studio/PrintModal";
import { formatEasternNumber } from "@/lib/numerals";
import { getGradeAccents, getGradeConfig } from "@/config/grades";
import { A4_WIDTH_PX, useA4FitScale } from "@/lib/use-a4-fit-scale";
import {
  AnswerKeyIcon,
  NotesIcon,
  PrinterIcon,
  WorksheetIcon,
} from "@/components/studio/icons";

const VIEW_TABS = [
  { id: "worksheet", labelAr: "ورقة العمل", Icon: WorksheetIcon },
  { id: "answer-key", labelAr: "مفتاح الإجابة", Icon: AnswerKeyIcon },
  { id: "teacher-notes", labelAr: "ملاحظات المعلم", Icon: NotesIcon },
] as const;

export interface StudioCanvasProps {
  bundle: GeneratedWorksheetBundle;
  viewMode: ViewMode;
  zoomPercent: number;
  isPending?: boolean;
  onViewModeChange?: (viewMode: ViewMode) => void;
  onZoomStep?: (delta: -1 | 1) => void;
  onSelectPrerequisite?: (grade: GradeId, lessonNumber: number) => void;
  onDifficultyChange?: (mode: WorksheetDifficultyMode) => void;
  onSeedChange?: (seed: string) => void;
}

/**
 * The A4 stage. It is orchestrated by its parent: view mode and zoom arrive as
 * props, and every intent returns through a callback.
 */
export function StudioCanvas({
  bundle,
  viewMode,
  zoomPercent,
  isPending = false,
  onViewModeChange,
  onZoomStep,
  onSelectPrerequisite,
  onDifficultyChange,
  onSeedChange,
}: StudioCanvasProps): React.ReactElement {
  const gradeConfig = getGradeConfig(bundle.grade.id);
  const accents = getGradeAccents(gradeConfig?.color);

  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [qrOrigin, setQrOrigin] = useState<string | undefined>(undefined);
  const { containerRef, fitScale } = useA4FitScale(
    viewMode !== "teacher-notes"
  );
  const effectiveScale = fitScale * (zoomPercent / 100);

  useEffect(() => {
    setQrOrigin(window.location.origin);
  }, []);

  return (
    <main
      id="studio-worksheet-region"
      tabIndex={-1}
      data-studio-canvas="true"
      data-canvas-pending={isPending ? "true" : "false"}
      aria-busy={isPending ? "true" : undefined}
      className="studio-canvas relative flex min-h-0 flex-1 flex-col overflow-y-auto bg-slate-100 px-3 pb-24 pt-3 text-slate-900 outline-none lg:px-6 lg:pb-6 lg:pt-5"
      style={
        {
          "--studio-accent": accents.accentHex,
        } as React.CSSProperties
      }
    >
      {isPending && (
        <div
          data-canvas-pending-bar="true"
          aria-hidden="true"
          className="studio-pending-bar"
          style={{ backgroundColor: accents.accentHex }}
        />
      )}

      <div
        data-studio-canvas-toolbar="true"
        className="no-print sticky top-0 z-20 mx-auto mb-4 flex w-full max-w-[210mm] flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-xs backdrop-blur"
      >
        <div
          className="inline-flex rounded-xl bg-slate-100 p-1"
          role="tablist"
          aria-label="طريقة العرض"
        >
          {VIEW_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={viewMode === tab.id}
              data-view-tab={tab.id}
              onClick={() => onViewModeChange?.(tab.id)}
              className={`flex min-h-8 items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-extrabold transition-colors duration-150 motion-reduce:transition-none ${
                viewMode === tab.id
                  ? "text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              style={
                viewMode === tab.id
                  ? { backgroundColor: accents.accentHex }
                  : undefined
              }
            >
              <tab.Icon size={14} />
              {tab.labelAr}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-1.5 py-1 text-[11px] font-extrabold text-slate-700"
            aria-label="التحكم في التكبير والتصغير"
          >
            <button
              type="button"
              onClick={() => onZoomStep?.(-1)}
              className="flex size-7 items-center justify-center rounded-lg hover:bg-slate-200"
              aria-label="تصغير العرض"
            >
              −
            </button>
            <span
              className="min-w-10 text-center tabular-nums"
              data-zoom-level="true"
            >
              {formatEasternNumber(zoomPercent)}٪
            </span>
            <button
              type="button"
              onClick={() => onZoomStep?.(1)}
              className="flex size-7 items-center justify-center rounded-lg hover:bg-slate-200"
              aria-label="تكبير العرض"
            >
              +
            </button>
          </div>

          <button
            type="button"
            data-print-trigger="true"
            onClick={() => setIsPrintModalOpen(true)}
            className="flex min-h-8 items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1 text-[11px] font-extrabold text-white shadow-xs transition-colors duration-150 hover:bg-emerald-700"
          >
            <PrinterIcon size={14} />
            طباعة
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className={`mx-auto w-full max-w-[210mm] ${
          fitScale < 1 ? "overflow-x-hidden" : ""
        }`}
      >
        <div
          className={`origin-top transition-opacity duration-150 motion-reduce:transition-none ${
            isPending ? "opacity-[0.55]" : "opacity-100"
          }`}
          style={
            effectiveScale !== 1
              ? {
                  transform: `scale(${effectiveScale})`,
                  ...(fitScale < 1
                    ? {
                        transformOrigin: "top right",
                        width: `${A4_WIDTH_PX}px`,
                      }
                    : undefined),
                }
              : undefined
          }
        >
          <WorksheetSurface
            bundle={bundle}
            viewMode={viewMode}
            qrOrigin={qrOrigin}
            onSelectPrerequisite={(grade, lessonNumber) =>
              onSelectPrerequisite?.(grade as GradeId, lessonNumber)
            }
          />
        </div>
      </div>

      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        bundle={bundle}
        activeViewMode={viewMode}
        accentHex={accents.accentHex}
        onDifficultyChange={onDifficultyChange}
        onSeedChange={onSeedChange}
      />
    </main>
  );
}

export default StudioCanvas;
