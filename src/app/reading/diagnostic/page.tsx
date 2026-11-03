"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DIAGNOSTIC_QUESTIONS,
  evaluateDiagnosticAnswers,
  type DiagnosticAnswerMap,
  type DiagnosticResult,
} from "@/curriculum/reading-diagnostic";
import { formatEasternNumber } from "@/lib/numerals";

export default function DiagnosticPage() {
  const [answers, setAnswers] = useState<DiagnosticAnswerMap>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalQuestions = DIAGNOSTIC_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === totalQuestions;

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
  };

  const result: DiagnosticResult = evaluateDiagnosticAnswers(answers);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900"
    >
      {/* Top Header / Breadcrumbs */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-emerald-800 hover:text-emerald-900 transition-colors"
            >
              أُسُس
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              href="/reading"
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
            >
              نادي القراءة
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-sm font-semibold text-emerald-800">
              أداة التشخيص وتحديد المستوى
            </span>
          </div>

          <Link
            href="/reading"
            className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
          >
            ← العودة للمكتبة
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Intro Hero */}
        <section className="mb-8 text-center sm:text-right bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent p-6 sm:p-8 rounded-2xl border border-emerald-100">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <span>🎯 أداة تحديد نقطة الانطلاق القرائية</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
            استبانة تشخيص مستوى القراءة والفهم
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            أجب عن الأسئلة الستة التالية لتحديد قدرات الطفل بدقة بين التهجئة الصوتية، والتعرف البصري، والفهم الذاتي مقابل السماعي، وتحديد الجاهزية لدخول المستوى الأول (الانطلاق وبناء المعنى) أو مستويات أخرى، والحصول على رابط فوري للبدء.
          </p>

          {/* Progress Bar */}
          <div className="mt-6 pt-4 border-t border-emerald-100/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-emerald-800">
                الأسئلة المجاب عنها:
              </span>
              <span className="font-mono bg-white px-2.5 py-0.5 rounded-md border border-slate-200 text-slate-800">
                {formatEasternNumber(answeredCount)} من {formatEasternNumber(totalQuestions)}
              </span>
            </div>
            <div className="w-full sm:w-48 bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </section>

        {/* Questions List */}
        <div className="space-y-6">
          {DIAGNOSTIC_QUESTIONS.map((question, qIdx) => {
            const isAnswered = Boolean(answers[question.id]);
            const selectedOptId = answers[question.id];

            return (
              <div
                key={question.id}
                className={`bg-white rounded-xl p-5 sm:p-6 border transition-all duration-200 shadow-xs ${
                  isAnswered
                    ? "border-emerald-200 ring-1 ring-emerald-100"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {formatEasternNumber(qIdx + 1)}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {question.title}
                    </h2>
                  </div>
                  {isAnswered && (
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      تم الاختيار ✓
                    </span>
                  )}
                </div>

                {/* Question Prompt */}
                <p className="text-sm text-slate-700 mb-4 font-medium leading-relaxed">
                  {question.promptAr}
                </p>

                {/* Options Radio List */}
                <div className="space-y-2.5">
                  {question.options.map((option) => {
                    const isSelected = selectedOptId === option.id;

                    return (
                      <button
                        type="button"
                        key={option.id}
                        onClick={() => handleSelectOption(question.id, option.id)}
                        className={`w-full text-right p-3.5 rounded-lg border text-sm transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? "bg-emerald-50/80 border-emerald-500 text-emerald-950 font-medium shadow-xs"
                            : "bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/60 text-slate-700"
                        }`}
                      >
                        <div
                          className={`mt-0.5 w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "border-emerald-600 bg-emerald-600"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                          )}
                        </div>
                        <span className="leading-relaxed">{option.textAr}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion & Recommendation Action Banner */}
        <div className="mt-8">
          {!isSubmitted && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <button
                type="button"
                disabled={!isComplete}
                onClick={() => setIsSubmitted(true)}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm sm:text-base transition-all shadow-sm ${
                  isComplete
                    ? "bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer hover:shadow"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                }`}
              >
                {isComplete
                  ? "إظهار النتيجة والمستوى الموصى به 🎯"
                  : `يُرجى الإجابة عن كافة الأسئلة (المتبقي: ${formatEasternNumber(
                      totalQuestions - answeredCount
                    )})`}
              </button>
            </div>
          )}

          {/* Result Card */}
          {isSubmitted && (
            <div
              id="diagnostic-result"
              className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-6 sm:p-8 border-2 border-emerald-500 shadow-md transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                  {result.levelBadgeAr}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  مجموع النقاط: {formatEasternNumber(result.totalScore)} من{" "}
                  {formatEasternNumber(result.maxScore)}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
                {result.titleAr}
              </h2>
              <p className="text-sm font-medium text-emerald-800 mb-4">
                {result.subtitleAr}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed mb-6 bg-white/70 p-4 rounded-xl border border-emerald-100">
                {result.descriptionAr}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={result.directLink}
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-center font-bold text-sm shadow hover:shadow-md transition-all"
                >
                  الانتقال إلى المستوى والبدء بالقصة الأولى ←
                </Link>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                >
                  إعادة التشخيص ↻
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
