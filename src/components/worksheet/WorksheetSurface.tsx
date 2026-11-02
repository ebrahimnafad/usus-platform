import React from "react";
import type {
  DifficultyLevel,
  GeneratedWorksheetBundle,
  SectionId,
  ViewMode,
} from "@/domain/types";
import { getExerciseArchetype } from "@/archetypes/registry";
import {
  formatEasternNumber,
  formatLessonCodeAr,
  toEasternArabicNumerals,
} from "@/lib/numerals";

const SECTION_STYLES: Record<
  SectionId,
  {
    headerBg: string;
    border: string;
    badgeBg: string;
    textColor: string;
  }
> = {
  "warm-up": {
    headerBg: "bg-amber-100/90",
    border: "border-amber-300",
    badgeBg: "bg-amber-500 text-white",
    textColor: "text-amber-950",
  },
  practice: {
    headerBg: "bg-sky-100/90",
    border: "border-sky-300",
    badgeBg: "bg-sky-600 text-white",
    textColor: "text-sky-950",
  },
  challenge: {
    headerBg: "bg-violet-100/90",
    border: "border-violet-300",
    badgeBg: "bg-violet-600 text-white",
    textColor: "text-violet-950",
  },
};

const TIER_LABELS_AR: Record<DifficultyLevel, string> = {
  Easy: "سهل",
  Intermediate: "متوسط",
  Advanced: "متقدم",
};

export interface WorksheetSurfaceProps {
  bundle: GeneratedWorksheetBundle;
  viewMode: ViewMode;
  onSelectPrerequisite?: (grade: string, lessonNumber: number) => void;
}

export function WorksheetSurface({
  bundle,
  viewMode,
  onSelectPrerequisite,
}: WorksheetSurfaceProps): React.ReactElement {
  const { worksheet, lesson, teacherNotes } = bundle;
  const { header } = worksheet;

  if (viewMode === "teacher-notes") {
    return (
      <article
        dir="rtl"
        lang="ar"
        className="mx-auto w-full max-w-[210mm] rounded-3xl border-2 border-indigo-200 bg-white p-8 text-slate-900 shadow-lg"
        data-view-mode="teacher-notes"
      >
        <header className="border-b-2 border-indigo-100 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3.5 py-1 text-sm font-extrabold text-white">
                📘 ملاحظات المعلم
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                {header.gradeLabelAr} • الوحدة {header.unitNumberAr}
              </span>
              {lesson.isCoPresented && (
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-extrabold text-teal-900">
                  🤝 تقديم مشترك
                </span>
              )}
              {lesson.isEnrichment && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900">
                  ✨ إثرائي *
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {header.standards.map((std) => (
                <span
                  key={std}
                  data-standard-code="true"
                  className="rounded-lg border border-indigo-300 bg-indigo-50 px-2.5 py-0.5 font-mono text-xs font-bold text-indigo-950"
                >
                  {std}
                </span>
              ))}
            </div>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold text-slate-900">
            الدرس {header.lessonNumberAr}: {toEasternArabicNumerals(header.lessonTitleAr)}
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-600">
            {header.unitTitleAr}
          </p>
        </header>

        <div className="mt-6 space-y-6">
          {/* Prerequisites Navigation Card */}
          <section className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
            <h2 className="text-sm font-extrabold text-amber-950">
              🔗 المتطلبات السابقة ومسار التهيئة:
            </h2>
            {lesson.prerequisites.paths.length === 0 ? (
              <p className="mt-2 text-xs font-semibold text-amber-900">
                لا توجد متطلبات سابقة لهذا الدرس (درس تأسيسي في بداية المسار).
              </p>
            ) : (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {lesson.prerequisites.paths.map((pathGroup, pathIdx) => (
                  <React.Fragment key={pathIdx}>
                    {pathIdx > 0 && (
                      <span className="rounded-md bg-amber-200 px-2 py-0.5 text-xs font-extrabold text-amber-950">
                        ○ مسار بديل
                      </span>
                    )}
                    <div className="inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-2.5 py-1.5">
                      {pathGroup.map((ref, refIdx) => (
                        <React.Fragment key={ref.rawCode}>
                          {refIdx > 0 && (
                            <span className="text-xs font-bold text-amber-700">
                              ،
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              onSelectPrerequisite?.(ref.grade, ref.lessonNumber)
                            }
                            className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-extrabold text-amber-950 transition hover:bg-amber-200"
                            data-prerequisite-code={toEasternArabicNumerals(ref.rawCode)}
                          >
                            {formatLessonCodeAr(ref.rawCode)}
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </section>

          {/* Pedagogical Summary */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-extrabold text-indigo-950">
              🎯 الهدف التربوي وفكرة الدرس:
            </h2>
            <p className="mt-2 leading-relaxed text-sm font-medium text-slate-800">
              {toEasternArabicNumerals(teacherNotes.summaryAr)}
            </p>
          </section>

          {/* Pedagogical Steps */}
          <section className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5">
            <h2 className="text-base font-extrabold text-indigo-950">
              👩‍🏫 خطوات التقديم المقترحة داخل الصف:
            </h2>
            <ol className="mt-3 space-y-2.5">
              {teacherNotes.pedagogicalStepsAr.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm font-medium text-slate-800"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold text-white">
                    {formatEasternNumber(idx + 1)}
                  </span>
                  <span className="leading-relaxed">
                    {toEasternArabicNumerals(step)}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Classroom Activity / Co-presentation / Enrichment notes */}
          {(teacherNotes.classroomActivityNoteAr ||
            teacherNotes.coPresentationNoteAr ||
            teacherNotes.enrichmentNoteAr) && (
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 space-y-2">
              <h2 className="text-base font-extrabold text-emerald-950">
                🎲 أنشطة صفّية وملاحظات التقديم:
              </h2>
              {teacherNotes.classroomActivityNoteAr && (
                <p className="text-sm font-medium text-emerald-950">
                  {toEasternArabicNumerals(teacherNotes.classroomActivityNoteAr)}
                </p>
              )}
              {teacherNotes.coPresentationNoteAr && (
                <p className="text-sm font-medium text-teal-900">
                  {toEasternArabicNumerals(teacherNotes.coPresentationNoteAr)}
                </p>
              )}
              {teacherNotes.enrichmentNoteAr && (
                <p className="text-sm font-medium text-amber-900">
                  {toEasternArabicNumerals(teacherNotes.enrichmentNoteAr)}
                </p>
              )}
            </section>
          )}

          {/* Common Misconceptions */}
          {teacherNotes.commonMisconceptionsAr &&
            teacherNotes.commonMisconceptionsAr.length > 0 && (
              <section className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
                <h2 className="text-base font-extrabold text-rose-950">
                  ⚠️ أخطاء شائعة وكيفية معالجتها:
                </h2>
                <ul className="mt-2 space-y-1.5 text-sm font-medium text-rose-900">
                  {teacherNotes.commonMisconceptionsAr.map((note, idx) => (
                    <li key={idx}>• {toEasternArabicNumerals(note)}</li>
                  ))}
                </ul>
              </section>
            )}
        </div>
      </article>
    );
  }

  const isAnswerKey = viewMode === "answer-key";

  return (
    <article
      dir="rtl"
      lang="ar"
      style={{
        printColorAdjust: "exact",
        WebkitPrintColorAdjust: "exact",
      }}
      className="a4-sheet mx-auto flex min-h-[297mm] w-[210mm] flex-col justify-between rounded-none border border-slate-200 bg-white p-[10mm] text-slate-900 shadow-xl print:m-0 print:border-none print:shadow-none"
      data-view-mode={viewMode}
      data-lesson-id={toEasternArabicNumerals(worksheet.lessonId)}
    >
      <div className="space-y-4">
        {/* Illustrated Workbook Header */}
        <header className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-l from-indigo-50 via-sky-50 to-amber-50 p-4 shadow-2xs">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-extrabold text-white">
                  {header.gradeLabelAr}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-600 px-3 py-0.5 text-xs font-extrabold text-white">
                  الوحدة {header.unitNumberAr}: {toEasternArabicNumerals(header.unitTitleAr)}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900 border border-amber-300">
                  المستوى: {toEasternArabicNumerals(header.difficultyLabelAr)}
                </span>
                {isAnswerKey && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-extrabold text-white shadow-2xs">
                    ✓ مفتاح الإجابة النموذجي
                  </span>
                )}
              </div>

              <h1 className="pt-1 text-xl font-extrabold text-slate-900">
                الدرس {header.lessonNumberAr}:{" "}
                {toEasternArabicNumerals(header.lessonTitleAr)}
              </h1>
            </div>

            {/* Standard Pills */}
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex flex-wrap justify-end gap-1">
                {header.standards.map((std) => (
                  <span
                    key={std}
                    data-standard-code="true"
                    className="rounded-lg border border-indigo-300 bg-white px-2.5 py-0.5 font-mono text-xs font-extrabold text-indigo-900 shadow-2xs"
                  >
                    {std}
                  </span>
                ))}
              </div>
              {lesson.isCoPresented && (
                <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[11px] font-bold text-teal-900">
                  تقديم مشترك
                </span>
              )}
              {lesson.isEnrichment && (
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">
                  إثرائي *
                </span>
              )}
            </div>
          </div>

          {/* Student Name, Date, and Self-Check Star Bar */}
          <div className="mt-3 grid grid-cols-[1.3fr_0.9fr_1fr] items-center gap-3 rounded-2xl border border-indigo-200/80 bg-white/95 px-3.5 py-2 text-xs font-bold text-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-indigo-950">{header.studentNameLabelAr}</span>
              <span className="flex-1 border-b-2 border-dotted border-slate-400 py-1 text-emerald-700">
                {isAnswerKey ? "نموذج المعلم المحلول" : ""}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-indigo-950">{header.dateLabelAr}</span>
              <span className="flex-1 border-b-2 border-dotted border-slate-400 py-1">
                {isAnswerKey ? "١٤٤٨/٠١/٠١" : ""}
              </span>
            </div>

            <div className="flex items-center justify-end gap-1.5">
              <span className="text-amber-900">{header.selfCheckLabelAr}</span>
              <div className="inline-flex items-center gap-1" aria-label="نجوم التقييم الذاتي">
                {[1, 2, 3].map((starIdx) => (
                  <svg
                    key={starIdx}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={isAnswerKey ? "#FACC15" : "none"}
                    stroke="#D97706"
                    strokeWidth="2"
                  >
                    <polygon points="12,2 15,9 22,9.5 16.5,14.5 18,22 12,18 6,22 7.5,14.5 2,9.5 9,9" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Three Canonical Sections: تهيئة | تدرّب | تحدٍّ وتقييم */}
        <div className="space-y-4">
          {worksheet.sections.map((section) => {
            const style = SECTION_STYLES[section.id];
            return (
              <section
                key={section.id}
                className={`rounded-3xl border-2 ${style.border} bg-white p-3.5 shadow-2xs`}
                data-section-id={section.id}
              >
                <div
                  className={`mb-3 flex items-center justify-between rounded-2xl ${style.headerBg} px-3.5 py-1.5`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">
                      {section.badgeEmoji}
                    </span>
                    <h2 className={`text-base font-extrabold ${style.textColor}`}>
                      {section.titleAr}
                    </h2>
                    {section.id === "warm-up" &&
                      section.sourceLessonId !== worksheet.lessonId && (
                        <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 border border-amber-300">
                          من المتطلب السابق ({formatLessonCodeAr(section.sourceLessonId)})
                        </span>
                      )}
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold ${style.badgeBg}`}
                  >
                    {TIER_LABELS_AR[section.difficultyLevel]}
                  </span>
                </div>

                <div className="space-y-3">
                  {section.exercises.map((exercise) => {
                    const archetypeDef = getExerciseArchetype(
                      exercise.archetype
                    );
                    return (
                      <div
                        key={exercise.id}
                        className="break-inside-avoid rounded-2xl border border-slate-200 bg-slate-50/40 p-3"
                        data-exercise-id={toEasternArabicNumerals(exercise.id)}
                      >
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-extrabold text-white shadow-2xs">
                              {formatEasternNumber(exercise.exerciseNumber)}
                            </span>
                            <p className="text-sm font-extrabold text-slate-900">
                              {toEasternArabicNumerals(exercise.promptAr)}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-lg bg-slate-200/80 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                            {toEasternArabicNumerals(exercise.titleAr)}
                          </span>
                        </div>

                        {archetypeDef.render({
                          exercise,
                          mode: isAnswerKey ? "answer-key" : "worksheet",
                        })}

                        {isAnswerKey && (
                          <div
                            className="mt-2.5 flex items-start gap-2 rounded-xl border border-emerald-300 bg-emerald-50/90 px-3 py-2 text-xs font-bold text-emerald-950"
                            data-strategy-hint="true"
                          >
                            <span className="shrink-0 text-emerald-700">
                              💡 تلميح الاستراتيجية:
                            </span>
                            <span>
                              {toEasternArabicNumerals(exercise.strategyHintAr)}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* A4 Footer */}
      <footer className="mt-4 flex items-center justify-between border-t-2 border-slate-200 pt-2.5 text-xs font-bold text-slate-600">
        <span>{toEasternArabicNumerals(worksheet.footerTextAr)}</span>
        <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-extrabold text-slate-800">
          {toEasternArabicNumerals(worksheet.seedBadgeAr)}
        </span>
        <span>{toEasternArabicNumerals(worksheet.pageNumberAr)}</span>
      </footer>
    </article>
  );
}
