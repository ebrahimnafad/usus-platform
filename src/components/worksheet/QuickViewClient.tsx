"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { GeneratedWorksheetBundle, ViewMode } from "@/domain/types";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";
import { buildStudioRouteHref } from "@/lib/studio-state";
import { formatEasternNumber } from "@/lib/numerals";
import { printHtmlInIframe } from "@/lib/print-html-iframe";
import {
  AnswerKeyIcon,
  NotesIcon,
  PrinterIcon,
} from "@/components/studio/icons";

export interface QuickViewClientProps {
  bundle: GeneratedWorksheetBundle;
  initialViewMode: "answer-key" | "teacher-notes";
}

const A4_WIDTH_PX = 794; // 210mm at 96dpi

export function QuickViewClient({
  bundle,
  initialViewMode,
}: QuickViewClientProps): React.ReactElement {
  const [viewMode, setViewMode] = useState<"answer-key" | "teacher-notes">(
    initialViewMode
  );
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setViewMode(initialViewMode);
  }, [initialViewMode]);

  useEffect(() => {
    if (viewMode !== "answer-key") {
      setScale(1);
      return;
    }

    const updateScale = () => {
      const container = containerRef.current;
      if (!container) return;
      const available = container.clientWidth;
      if (available > 0 && available < A4_WIDTH_PX) {
        setScale(Math.max(0.38, available / A4_WIDTH_PX));
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [viewMode]);

  const studioHref = buildStudioRouteHref({
    grade: bundle.grade.id,
    lessonNumber: bundle.lesson.lessonNumber,
    seed: bundle.seed,
    difficultyLevel: bundle.difficultyMode,
    viewMode: viewMode as ViewMode,
  });

  const handlePrintAnswerKey = () => {
    const surfaceHtml = sheetRef.current?.innerHTML;
    if (!surfaceHtml) {
      window.print();
      return;
    }
    const lessonAr = formatEasternNumber(bundle.lesson.lessonNumber);
    const title = `مفتاح الإجابة – ${bundle.grade.labelAr} – الدرس ${lessonAr} – ${bundle.seed}`;
    printHtmlInIframe({
      bodyHtml: surfaceHtml,
      title,
      colorMode: "color",
    });
  };

  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen bg-slate-100 text-slate-900"
      data-quick-view-page="true"
    >
      {/* Compact responsive top bar */}
      <header className="no-print sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-3 py-2.5 shadow-2xs backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="shrink-0 rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-extrabold text-white">
              {bundle.grade.labelAr}
            </span>
            <span className="truncate text-sm font-extrabold text-slate-900">
              الدرس {formatEasternNumber(bundle.lesson.lessonNumber)}:{" "}
              {bundle.lesson.titleAr}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              role="tablist"
              aria-label="التبديل السريع"
              className="inline-flex rounded-xl bg-slate-100 p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "answer-key"}
                onClick={() => setViewMode("answer-key")}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-extrabold transition-colors ${
                  viewMode === "answer-key"
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <AnswerKeyIcon size={14} />
                مفتاح الإجابة
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "teacher-notes"}
                onClick={() => setViewMode("teacher-notes")}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-extrabold transition-colors ${
                  viewMode === "teacher-notes"
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <NotesIcon size={14} />
                ملاحظات المعلم
              </button>
            </div>

            {viewMode === "answer-key" && (
              <button
                type="button"
                onClick={handlePrintAnswerKey}
                className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-extrabold text-white shadow-2xs hover:bg-emerald-700"
              >
                <PrinterIcon size={14} />
                طباعة
              </button>
            )}

            <Link
              href={studioHref}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-700 hover:bg-slate-50"
            >
              فتح في الاستوديو
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-2 py-4 sm:px-6 sm:py-6">
        {viewMode === "teacher-notes" ? (
          <WorksheetSurface bundle={bundle} viewMode="teacher-notes" />
        ) : (
          <div
            ref={containerRef}
            className="w-full overflow-x-hidden"
            data-quick-view-answer-key="true"
          >
            <div
              ref={sheetRef}
              style={
                scale < 1
                  ? {
                      transform: `scale(${scale})`,
                      transformOrigin: "top right",
                      width: `${A4_WIDTH_PX}px`,
                    }
                  : undefined
              }
            >
              <WorksheetSurface bundle={bundle} viewMode="answer-key" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
