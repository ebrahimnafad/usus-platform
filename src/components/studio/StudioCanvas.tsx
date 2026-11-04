"use client";

import React, { useState } from "react";
import type {
  GeneratedWorksheetBundle,
  GradeId,
  ViewMode,
} from "@/domain/types";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";
import { buildPdfExportUrl } from "@/lib/studio-helpers";
import { formatEasternNumber } from "@/lib/numerals";
import { getGradeAccents, getGradeConfig } from "@/config/grades";
import {
  AnswerKeyIcon,
  DownloadIcon,
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
}: StudioCanvasProps): React.ReactElement {
  const gradeConfig = getGradeConfig(bundle.grade.id);
  const accents = getGradeAccents(gradeConfig?.color);

  const pdfExportUrl = buildPdfExportUrl({
    grade: bundle.grade.id,
    lessonNumber: bundle.lesson.lessonNumber,
    seed: bundle.seed,
    difficultyLevel: bundle.difficultyMode,
    viewMode,
  });

  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = async () => {
    if (typeof window === "undefined" || isPrinting) return;
    setIsPrinting(true);
    try {
      // Dynamic title per Q4
      const originalTitle = document.title;
      const lessonAr = formatEasternNumber(bundle.lesson.lessonNumber);
      document.title = `ورقة عمل – ${bundle.grade.labelAr} – الدرس ${lessonAr} – ${bundle.seed}`;

      // Fetch PDF buffer per ADR-0011
      const res = await fetch(pdfExportUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch PDF for print");
      }
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      iframe.src = blobUrl;

      iframe.onload = () => {
        setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
          } finally {
            setTimeout(() => {
              document.title = originalTitle;
              document.body.removeChild(iframe);
              URL.revokeObjectURL(blobUrl);
              setIsPrinting(false);
            }, 1000);
          }
        }, 100);
      };

      document.body.appendChild(iframe);
    } catch {
      // Fallback to native print if fetch/iframe fails
      window.print();
      setIsPrinting(false);
    }
  };

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

          <a
            href={pdfExportUrl}
            data-pdf-download="true"
            className="flex min-h-8 items-center gap-1.5 rounded-xl px-3 py-1 text-[11px] font-extrabold text-white shadow-xs transition-colors duration-150"
            style={{ backgroundColor: accents.accentHex }}
          >
            <DownloadIcon size={14} />
            تحميل PDF
          </a>

          <button
            type="button"
            data-print-trigger="true"
            disabled={isPrinting}
            onClick={handlePrint}
            className="flex min-h-8 items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1 text-[11px] font-extrabold text-white shadow-xs transition-colors duration-150 hover:bg-emerald-700 disabled:opacity-50"
          >
            <PrinterIcon size={14} />
            {isPrinting ? "جاري التجهيز..." : "طباعة"}
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[210mm]">
        <div
          className={`origin-top transition-opacity duration-150 motion-reduce:transition-none ${
            isPending ? "opacity-[0.55]" : "opacity-100"
          }`}
          style={
            zoomPercent !== 100
              ? { transform: `scale(${zoomPercent / 100})` }
              : undefined
          }
        >
          <WorksheetSurface
            bundle={bundle}
            viewMode={viewMode}
            onSelectPrerequisite={(grade, lessonNumber) =>
              onSelectPrerequisite?.(grade as GradeId, lessonNumber)
            }
          />
        </div>
      </div>
    </main>
  );
}

export default StudioCanvas;
