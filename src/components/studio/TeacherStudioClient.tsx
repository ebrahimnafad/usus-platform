"use client";

import React, { useMemo, useState } from "react";
import type {
  GeneratedWorksheetBundle,
  Grade,
  GradeId,
  ViewMode,
  WorksheetDifficultyMode,
} from "@/domain/types";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export interface TeacherStudioClientProps {
  grades: Grade[];
  initialBundle: GeneratedWorksheetBundle;
  initialViewMode?: ViewMode;
}

const DIFFICULTY_OPTIONS: Array<{
  value: WorksheetDifficultyMode;
  labelAr: string;
}> = [
  { value: "scaffolded", labelAr: "متدرج" },
  { value: "Easy", labelAr: "سهل" },
  { value: "Intermediate", labelAr: "متوسط" },
  { value: "Advanced", labelAr: "متقدم" },
];

export function TeacherStudioClient({
  grades,
  initialBundle,
  initialViewMode = "worksheet",
}: TeacherStudioClientProps): React.ReactElement {
  const [selectedGradeId, setSelectedGradeId] = useState<GradeId>(
    initialBundle.grade.id
  );
  const [expandedUnitNumber, setExpandedUnitNumber] = useState<number>(
    initialBundle.unit.unitNumber
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);

  const selectedGrade = useMemo(
    () => grades.find((g) => g.id === selectedGradeId) ?? grades[0],
    [grades, selectedGradeId]
  );

  const navigateToLesson = (
    grade: GradeId,
    lessonNumber: number,
    seed: string = initialBundle.seed,
    difficulty: WorksheetDifficultyMode = initialBundle.difficultyMode,
    view: ViewMode = viewMode
  ) => {
    const params = new URLSearchParams({
      grade,
      lesson: String(lessonNumber),
      seed,
      difficulty,
      view,
    });
    window.location.search = params.toString();
  };

  const handleRegenerateSeed = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let nextCode = "";
    for (let i = 0; i < 6; i++) {
      nextCode += chars[Math.floor(Math.random() * chars.length)];
    }
    navigateToLesson(
      initialBundle.grade.id,
      initialBundle.lesson.lessonNumber,
      nextCode,
      initialBundle.difficultyMode,
      viewMode
    );
  };

  return (
    <div dir="rtl" className="flex min-h-screen flex-col lg:flex-row">
      {/* Right Sidebar: Curriculum Browser & Generation Controls */}
      <aside className="no-print w-full shrink-0 border-l border-slate-200 bg-white p-4 shadow-xs lg:w-96">
        <div className="mb-4 border-b border-slate-100 pb-3">
          <h1 className="text-lg font-extrabold text-indigo-950">
            🎨 استوديو المعلم لأوراق العمل
          </h1>
          <p className="text-xs font-semibold text-slate-600">
            منهج الرياضيات للصفوف من الروضة حتى الصف الخامس ({formatEasternNumber(810)} درساً)
          </p>
        </div>

        {/* Grade Switcher Pills */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-extrabold text-slate-700">
            الصف الدراسي:
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {grades.map((g) => {
              const active = g.id === selectedGradeId;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setSelectedGradeId(g.id);
                    setExpandedUnitNumber(1);
                  }}
                  className={`rounded-xl px-2.5 py-1.5 text-xs font-extrabold transition ${
                    active
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  {g.labelAr}
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
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Difficulty Level & Seed Controls */}
        <div className="mb-4 space-y-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-3">
          <div>
            <span className="mb-1.5 block text-xs font-extrabold text-indigo-950">
              مستوى الصعوبة:
            </span>
            <div className="grid grid-cols-4 gap-1">
              {DIFFICULTY_OPTIONS.map((opt) => {
                const isSelected = initialBundle.difficultyMode === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
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
              <span className="rounded bg-white px-2 py-0.5 font-extrabold text-indigo-900">
                {toEasternArabicNumerals(initialBundle.seed)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRegenerateSeed}
              className="rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-extrabold text-white shadow-2xs transition hover:bg-amber-600"
            >
              توليد نموذج جديد 🎲
            </button>
          </div>
        </div>

        {/* Units & Lessons Accordion */}
        <div className="max-h-[55vh] space-y-2 overflow-y-auto pl-1">
          {selectedGrade.units.map((unit) => {
            const filteredLessons = unit.lessons.filter((l) => {
              if (!searchQuery.trim()) return true;
              const q = searchQuery.trim().toLowerCase();
              return (
                l.titleAr.includes(q) ||
                l.titleEn.toLowerCase().includes(q) ||
                l.standards.some((s) => s.toLowerCase().includes(q))
              );
            });

            if (searchQuery.trim() && filteredLessons.length === 0) {
              return null;
            }

            const isOpen =
              Boolean(searchQuery.trim()) ||
              expandedUnitNumber === unit.unitNumber;

            return (
              <div
                key={unit.unitNumber}
                className="rounded-2xl border border-slate-200 bg-slate-50/70"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedUnitNumber(isOpen ? -1 : unit.unitNumber)
                  }
                  className="flex w-full items-center justify-between px-3 py-2 text-right text-xs font-extrabold text-slate-900"
                >
                  <span>
                    الوحدة {formatEasternNumber(unit.unitNumber)}: {unit.titleAr}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    ({formatEasternNumber(unit.lessonRange[0])}–
                    {formatEasternNumber(unit.lessonRange[1])})
                  </span>
                </button>

                {isOpen && (
                  <div className="space-y-1 border-t border-slate-200 bg-white p-2">
                    {filteredLessons.map((lesson) => {
                      const isCurrent =
                        lesson.grade === initialBundle.grade.id &&
                        lesson.lessonNumber === initialBundle.lesson.lessonNumber;
                      return (
                        <button
                          key={lesson.id}
                          type="button"
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
                              : "hover:bg-slate-100 text-slate-800"
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

      {/* Main Canvas: View Mode Tabs & Live A4 Preview */}
      <main className="flex-1 p-4 lg:p-6">
        <div className="no-print mx-auto mb-4 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-2xs">
          <div className="inline-flex rounded-xl bg-slate-100 p-1">
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-extrabold text-white shadow-2xs transition hover:bg-emerald-700"
            >
              🖨️ طباعة / حفظ PDF
            </button>
          </div>
        </div>

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
      </main>
    </div>
  );
}
