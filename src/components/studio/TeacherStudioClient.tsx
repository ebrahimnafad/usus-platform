"use client";

import React, { useMemo, useState } from "react";
import type {
  GeneratedWorksheetBundle,
  Grade,
  GradeId,
  Unit,
  WorksheetDifficultyMode,
} from "@/domain/types";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import {
  VALID_GRADES,
  VALID_DIFFICULTY_MODES,
  VALID_VIEW_MODES,
  ZOOM_LEVELS,
  resolveStudioStateFromSearchParams,
  type StudioResolvedState,
  type ViewMode,
  type StudioSearchParamsInput,
} from "@/lib/studio-state";
import {
  DIFFICULTY_OPTIONS,
  applyStudioNavigationAction,
  buildPdfExportUrl,
  buildStudioSearchParams,
  filterUnitsForStudioSearch,
  formatGradePillLabelAr,
  mintNextStudioSeed,
  type StudioNavigationAction,
} from "@/lib/studio-helpers";

export type { StudioResolvedState, ViewMode, StudioSearchParamsInput };

export interface TeacherStudioProps {
  grades: Grade[];
  initialBundle: GeneratedWorksheetBundle;
  initialViewMode?: ViewMode;
  initialSearchQuery?: string;
  initialZoomPercent?: number;
  expandAllUnitsByDefault?: boolean;
  onNavigateState?: (nextState: StudioResolvedState) => void;
}

export type TeacherStudioClientProps = TeacherStudioProps;

export { resolveStudioStateFromSearchParams };

export function TeacherStudio({
  grades,
  initialBundle,
  initialViewMode = "worksheet",
  initialSearchQuery = "",
  initialZoomPercent = 100,
  expandAllUnitsByDefault = false,
  onNavigateState,
}: TeacherStudioProps): React.ReactElement {
  const [selectedGradeId, setSelectedGradeId] = useState<GradeId>(
    initialBundle.grade.id
  );

  const selectedGrade = useMemo(
    () => grades.find((g) => g.id === selectedGradeId) ?? grades[0],
    [grades, selectedGradeId]
  );

  const [expandedUnitNumbers, setExpandedUnitNumbers] = useState<number[]>(
    () =>
      expandAllUnitsByDefault
        ? selectedGrade.units.map((u) => u.unitNumber)
        : [initialBundle.unit.unitNumber]
  );

  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [zoomPercent, setZoomPercent] = useState<number>(initialZoomPercent);
  const [regenStep, setRegenStep] = useState<number>(1);

  const visibleUnits = useMemo(
    () => filterUnitsForStudioSearch(selectedGrade.units, searchQuery),
    [selectedGrade.units, searchQuery]
  );

  const navigateToLesson = (
    grade: GradeId,
    lessonNumber: number,
    seed: string = initialBundle.seed,
    difficultyLevel: WorksheetDifficultyMode = initialBundle.difficultyMode,
    view: ViewMode = viewMode
  ) => {
    const nextState: StudioResolvedState = {
      grade,
      lessonNumber,
      seed,
      difficultyLevel,
      viewMode: view,
      searchQuery,
      zoomPercent,
    };

    if (onNavigateState) {
      onNavigateState(nextState);
      return;
    }

    const queryString = buildStudioSearchParams(nextState);
    if (typeof window !== "undefined") {
      window.location.search = queryString;
    }
  };

  const handleRegenerateSeed = () => {
    const nextSeed = mintNextStudioSeed(initialBundle.seed, regenStep);
    setRegenStep((s) => s + 1);
    navigateToLesson(
      initialBundle.grade.id,
      initialBundle.lesson.lessonNumber,
      nextSeed,
      initialBundle.difficultyMode,
      viewMode
    );
  };

  const toggleUnit = (unitNumber: number) => {
    setExpandedUnitNumbers((prev) =>
      prev.includes(unitNumber)
        ? prev.filter((n) => n !== unitNumber)
        : [...prev, unitNumber]
    );
  };

  const allUnitsExpanded =
    expandedUnitNumbers.length >= selectedGrade.units.length;

  const handleToggleAllUnits = () => {
    if (allUnitsExpanded) {
      setExpandedUnitNumbers([initialBundle.unit.unitNumber]);
    } else {
      setExpandedUnitNumbers(selectedGrade.units.map((u) => u.unitNumber));
    }
  };

  const handleZoomStep = (delta: -1 | 1) => {
    const currentIdx = ZOOM_LEVELS.indexOf(zoomPercent);
    const baseIdx = currentIdx >= 0 ? currentIdx : 2;
    const nextIdx = Math.max(
      0,
      Math.min(ZOOM_LEVELS.length - 1, baseIdx + delta)
    );
    setZoomPercent(ZOOM_LEVELS[nextIdx]);
  };

  const pdfExportUrl = buildPdfExportUrl({
    grade: initialBundle.grade.id,
    lessonNumber: initialBundle.lesson.lessonNumber,
    seed: initialBundle.seed,
    difficultyLevel: initialBundle.difficultyMode,
    viewMode,
  });

  return (
    <div
      dir="rtl"
      lang="ar"
      className="flex min-h-screen flex-col bg-slate-100 lg:flex-row"
      data-studio-root="true"
    >
      {/* Right Sidebar: Curriculum Browser & Generation Controls */}
      <aside className="no-print w-full shrink-0 border-l border-slate-200 bg-white p-4 shadow-xs lg:w-96">
        <div className="mb-4 border-b border-slate-100 pb-3">
          <h1 className="text-lg font-extrabold text-indigo-950">
            🎨 استوديو المعلم لأوراق العمل
          </h1>
          <p className="text-xs font-semibold text-slate-600">
            منهج الرياضيات للصفوف من الروضة حتى الصف الخامس (
            {formatEasternNumber(810)} درساً)
          </p>
        </div>

        {/* Grade Switcher Pills (الروضة K through الصف ٥) */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-extrabold text-slate-700">
            الصف الدراسي:
          </label>
          <div
            className="grid grid-cols-2 gap-1.5"
            role="group"
            aria-label="اختيار الصف الدراسي"
          >
            {grades.map((g) => {
              const active = g.id === selectedGradeId;
              return (
                <button
                  key={g.id}
                  type="button"
                  data-grade-pill={g.id}
                  onClick={() => {
                    setSelectedGradeId(g.id);
                    setExpandedUnitNumbers([1]);
                  }}
                  className={`rounded-xl px-2.5 py-1.5 text-xs font-extrabold transition ${
                    active
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  {formatGradePillLabelAr(g)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search input */}
        <div className="mb-4">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بعنوان الدرس أو رمز المعيار (مثل K.G.4)..."
            aria-label="بحث في الدروس والمعايير"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Difficulty Level & Seed Controls */}
        <div className="mb-4 space-y-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-3">
          <div>
            <span className="mb-1.5 block text-xs font-extrabold text-indigo-950">
              مستوى الصعوبة:
            </span>
            <div
              className="grid grid-cols-4 gap-1"
              role="group"
              aria-label="مستوى الصعوبة"
            >
              {DIFFICULTY_OPTIONS.map((opt) => {
                const isSelected = initialBundle.difficultyMode === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    data-difficulty-option={opt.value}
                    onClick={() =>
                      navigateToLesson(
                        initialBundle.grade.id,
                        initialBundle.lesson.lessonNumber,
                        initialBundle.seed,
                        opt.value,
                        viewMode
                      )
                    }
                    className={`rounded-lg px-2 py-1 text-xs font-extrabold transition ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-indigo-900 hover:bg-indigo-100"
                    }`}
                  >
                    {opt.labelAr}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-bold text-slate-700">
              رمز النموذج:{" "}
              <span
                className="rounded bg-white px-2 py-0.5 font-extrabold text-indigo-900"
                data-seed-badge="true"
              >
                {toEasternArabicNumerals(initialBundle.seed)}
              </span>
            </div>
            <button
              type="button"
              data-regenerate-seed="true"
              onClick={handleRegenerateSeed}
              className="rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-extrabold text-white shadow-2xs transition hover:bg-amber-600"
            >
              توليد نموذج جديد 🎲
            </button>
          </div>
        </div>

        {/* Expand/Collapse All 12 Units header */}
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-xs font-extrabold text-slate-700">
            وحدات الصف ({formatEasternNumber(selectedGrade.units.length)} وحدة):
          </span>
          <button
            type="button"
            onClick={handleToggleAllUnits}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900"
          >
            {allUnitsExpanded ? "طي الوحدات" : "توسيع كل الوحدات"}
          </button>
        </div>

        {/* Units & Lessons Accordion */}
        <div className="max-h-[55vh] space-y-2 overflow-y-auto pl-1">
          {visibleUnits.map((unit) => {
            const isOpen =
              Boolean(searchQuery.trim()) ||
              expandedUnitNumbers.includes(unit.unitNumber);

            return (
              <div
                key={unit.unitNumber}
                data-unit-number={unit.unitNumber}
                className="rounded-2xl border border-slate-200 bg-slate-50/70"
              >
                <button
                  type="button"
                  onClick={() => toggleUnit(unit.unitNumber)}
                  className="flex w-full items-center justify-between gap-2 px-3 py-2 text-right text-xs font-extrabold text-slate-900"
                >
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span>
                      الوحدة {formatEasternNumber(unit.unitNumber)}:{" "}
                      {toEasternArabicNumerals(unit.titleAr)}
                    </span>
                    {unit.isEnrichment && (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-900">
                        إثرائي *
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-[11px] font-bold text-slate-500">
                    ({formatEasternNumber(unit.lessonRange[0])}–
                    {formatEasternNumber(unit.lessonRange[1])})
                  </span>
                </button>

                {isOpen && (
                  <div className="space-y-1 border-t border-slate-200 bg-white p-2">
                    {unit.lessons.map((lesson) => {
                      const isCurrent =
                        lesson.grade === initialBundle.grade.id &&
                        lesson.lessonNumber ===
                          initialBundle.lesson.lessonNumber;
                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          data-lesson-item={toEasternArabicNumerals(lesson.id)}
                          onClick={() =>
                            navigateToLesson(
                              lesson.grade,
                              lesson.lessonNumber,
                              initialBundle.seed,
                              initialBundle.difficultyMode,
                              viewMode
                            )
                          }
                          className={`flex w-full flex-col gap-1 rounded-xl px-2.5 py-2 text-right transition ${
                            isCurrent
                              ? "bg-indigo-600 text-white"
                              : "text-slate-800 hover:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 text-xs font-extrabold">
                            <span>
                              {formatEasternNumber(lesson.lessonNumber)}.{" "}
                              {toEasternArabicNumerals(lesson.titleAr)}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-1">
                            {lesson.standards.map((std) => (
                              <span
                                key={std}
                                data-standard-code="true"
                                className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                                  isCurrent
                                    ? "bg-indigo-800 text-indigo-100"
                                    : "bg-slate-200 text-slate-700"
                                }`}
                              >
                                {std}
                              </span>
                            ))}
                            {lesson.isCoPresented && (
                              <span className="rounded bg-teal-100 px-1.5 py-0.5 text-[10px] font-bold text-teal-900">
                                تقديم مشترك
                              </span>
                            )}
                            {lesson.isEnrichment && (
                              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-900">
                                إثرائي *
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Canvas: View Mode Tabs, Zoom Controls, PDF Export & Live A4 Preview */}
      <main className="flex-1 p-4 lg:p-6">
        <div className="no-print mx-auto mb-4 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-2xs">
          {/* Segmented View Mode Tabs */}
          <div
            className="inline-flex rounded-xl bg-slate-100 p-1"
            role="tablist"
            aria-label="طريقة العرض"
          >
            {(
              [
                { id: "worksheet", labelAr: "📄 ورقة العمل" },
                { id: "answer-key", labelAr: "✅ مفتاح الإجابة" },
                { id: "teacher-notes", labelAr: "📘 ملاحظات المعلم" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={viewMode === tab.id}
                data-view-tab={tab.id}
                onClick={() => setViewMode(tab.id)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-extrabold transition ${
                  viewMode === tab.id
                    ? "bg-indigo-600 text-white shadow-2xs"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {tab.labelAr}
              </button>
            ))}
          </div>

          {/* Zoom Controls & Headless Browser PDF Export / Print Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-extrabold text-slate-700"
              aria-label="التحكم في التكبير والتصغير"
            >
              <button
                type="button"
                onClick={() => handleZoomStep(-1)}
                className="rounded px-1.5 py-0.5 hover:bg-slate-200"
                aria-label="تصغير العرض"
              >
                −
              </button>
              <span className="min-w-[3rem] text-center" data-zoom-level="true">
                {formatEasternNumber(zoomPercent)}٪
              </span>
              <button
                type="button"
                onClick={() => handleZoomStep(1)}
                className="rounded px-1.5 py-0.5 hover:bg-slate-200"
                aria-label="تكبير العرض"
              >
                +
              </button>
            </div>

            <a
              href={pdfExportUrl}
              data-pdf-download="true"
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-2xs transition hover:bg-indigo-700"
            >
              📥 تحميل PDF
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-2xs transition hover:bg-emerald-700"
            >
              🖨️ طباعة
            </button>
          </div>
        </div>

        {/* Zoomable A4 Preview Surface */}
        <div
          className="mx-auto origin-top transition-transform"
          style={
            zoomPercent !== 100
              ? { transform: `scale(${zoomPercent / 100})` }
              : undefined
          }
        >
          <WorksheetSurface
            bundle={initialBundle}
            viewMode={viewMode}
            onSelectPrerequisite={(g, num) =>
              navigateToLesson(
                g as GradeId,
                num,
                initialBundle.seed,
                initialBundle.difficultyMode,
                viewMode
              )
            }
          />
        </div>
      </main>
    </div>
  );
}

export const TeacherStudioClient = TeacherStudio;
