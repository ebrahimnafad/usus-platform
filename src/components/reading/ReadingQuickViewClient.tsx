"use client";

import React, { useState } from "react";
import Link from "next/link";
import type {
  QARTier,
  ReadingLevel,
  ReadingStory,
} from "@/domain/reading-types";
import type { QuickViewTarget } from "@/lib/qr";
import type { TashkeelMode } from "@/lib/reading-scaffold";
import { toEasternArabicNumerals } from "@/lib/numerals";
import { printHtmlInIframe } from "@/lib/print-html-iframe";
import { BLIND_SPOTS } from "@/components/reading/TeacherShieldDrawer";
import { PrinterIcon } from "@/components/studio/icons";

const TIER_LABELS: Record<QARTier, string> = {
  direct: "مباشر",
  inferential: "استنتاجي",
  creative: "إبداعي",
};

export interface ReadingQuickViewClientProps {
  level: ReadingLevel;
  story: ReadingStory;
  initialView: QuickViewTarget;
  tashkeelMode: TashkeelMode;
}

export function ReadingQuickViewClient({
  level,
  story,
  initialView,
  tashkeelMode,
}: ReadingQuickViewClientProps): React.ReactElement {
  const isFreeReading = story.type === "free_reading";
  const [activeTab, setActiveTab] = useState<QuickViewTarget>(
    isFreeReading ? "teacher-notes" : initialView
  );
  const [isPrinting, setIsPrinting] = useState(false);

  const storyNumAr = toEasternArabicNumerals(story.storyNumber);
  const storyHref = `/reading/level/${level.id}/story/${story.storyNumber}`;

  const handlePrintAnswerKey = async () => {
    setIsPrinting(true);
    try {
      const viewOption = isFreeReading ? "student" : "answer-key";
      const params = new URLSearchParams({
        level: level.id,
        story: String(story.storyNumber),
        scope: "story",
        viewOption,
        tashkeel: tashkeelMode,
      });
      const response = await fetch(
        `/api/reading-print-html?${params.toString()}`
      );
      if (!response.ok) return;
      const data = (await response.json()) as { html: string; title: string };
      await printHtmlInIframe({
        bodyHtml: data.html,
        title: data.title,
        colorMode: "color",
      });
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-100 text-slate-900"
      dir="rtl"
      data-reading-quick-view="true"
    >
      {/* Mobile-first sticky top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-3 py-2.5 backdrop-blur sm:px-6 no-print">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-sm font-black text-white">
              أُ
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-extrabold text-slate-900">
                «{story.titleAr ?? story.title}»
              </div>
              <div className="truncate text-[11px] font-semibold text-slate-500">
                {level.titleAr} • القصة {storyNumAr}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintAnswerKey}
              disabled={isPrinting}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-extrabold text-white shadow-xs transition-colors hover:bg-emerald-700 disabled:opacity-60"
            >
              <PrinterIcon className="h-3.5 w-3.5" />
              <span>
                {isPrinting
                  ? "جارٍ..."
                  : isFreeReading
                    ? "طباعة القصة"
                    : "طباعة الإجابة"}
              </span>
            </button>
            <Link
              href={storyHref}
              className="inline-flex min-h-9 items-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-700 transition-colors hover:bg-slate-50"
            >
              فتح دورة القصة
            </Link>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="mx-auto mt-2.5 flex max-w-4xl gap-2">
          {!isFreeReading && (
            <button
              type="button"
              data-quick-tab="answer-key"
              onClick={() => setActiveTab("answer-key")}
              className={`flex-1 rounded-xl border px-3 py-2 text-xs font-extrabold transition-colors sm:flex-initial sm:px-5 ${
                activeTab === "answer-key"
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              نموذج الإجابة
            </button>
          )}
          <button
            type="button"
            data-quick-tab="teacher-notes"
            onClick={() => setActiveTab("teacher-notes")}
            className={`flex-1 rounded-xl border px-3 py-2 text-xs font-extrabold transition-colors sm:flex-initial sm:px-5 ${
              activeTab === "teacher-notes"
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            ملاحظات المعلم
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-3 py-4 sm:px-6 sm:py-6">
        {activeTab === "answer-key" && !isFreeReading ? (
          <div className="space-y-4">
            <section className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-xs sm:p-6">
              <h2 className="mb-3 border-b border-emerald-100 pb-2 text-sm font-black text-emerald-950">
                ✅ نموذج إجابات الفهم القرائي (QAR)
              </h2>
              <div className="space-y-3">
                {story.qarQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="font-black text-slate-900">
                        {toEasternArabicNumerals(idx + 1)}.
                      </span>
                      <span className="rounded bg-slate-200 px-2 py-0.5 text-[11px] font-black text-slate-700">
                        {TIER_LABELS[q.tier] ?? "مباشر"}
                      </span>
                      <span className="font-bold text-slate-900">
                        {q.prompt ?? q.question}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-emerald-800 sm:text-sm">
                      الإجابة: {q.sampleAnswer}
                    </p>
                    {q.textEvidenceSnippet && (
                      <p className="text-[11px] text-slate-600">
                        <span className="font-bold text-slate-700">
                          الدليل من النص:{" "}
                        </span>
                        «{q.textEvidenceSnippet}»
                      </p>
                    )}
                    {q.hint && (
                      <p className="text-[11px] text-amber-800">
                        <span className="font-bold">تلميح: </span>
                        {q.hint}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {story.grammarDiscovery && (
              <section className="rounded-2xl border border-violet-200 bg-white p-4 shadow-xs sm:p-6 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-violet-100 pb-2">
                  <h2 className="text-sm font-black text-violet-950">
                    🧩 معمل اللغة
                  </h2>
                  <span className="rounded-lg bg-violet-100 px-2.5 py-0.5 text-xs font-black text-violet-900">
                    {story.grammarDiscovery.targetRule}
                  </span>
                </div>
                <p className="text-xs text-slate-700">
                  <span className="font-bold text-slate-900">الملاحظة: </span>
                  {story.grammarDiscovery.observation}
                </p>
                <p className="text-xs font-extrabold text-violet-900 sm:text-sm">
                  القاعدة المستخلصة: {story.grammarDiscovery.label}
                </p>
                <p className="text-xs text-slate-600">
                  <span className="font-bold text-slate-800">الإنتاج: </span>
                  {story.grammarDiscovery.productionPrompt}
                </p>
              </section>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <section className="rounded-2xl border border-indigo-200 bg-white p-4 shadow-xs sm:p-6 space-y-4">
              <div className="border-b border-indigo-100 pb-2">
                <h2 className="text-sm font-black text-indigo-950">
                  👩‍🏫 درع المعلم — «{story.titleAr ?? story.title}»
                </h2>
              </div>

              <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3.5 space-y-1">
                <div className="text-xs font-black text-indigo-900">
                  نص النمذجة المقترح (فكّر بصوت عالٍ):
                </div>
                <p className="text-xs leading-relaxed text-slate-800 sm:text-sm">
                  {story.teacherGuide.modelingScript}
                </p>
              </div>

              {story.teacherGuide.focusWordsNote && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 space-y-1">
                  <div className="text-xs font-black text-emerald-900">
                    كلمات التركيز البصري:
                  </div>
                  <p className="text-xs leading-relaxed text-slate-800">
                    {story.teacherGuide.focusWordsNote}
                  </p>
                </div>
              )}

              {story.teacherGuide.blindSpotTips.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-black text-slate-800">
                    نقاط الانتباه لهذه القصة:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 list-disc pr-5">
                    {story.teacherGuide.blindSpotTips.map((tip, i) => (
                      <li key={i} className="leading-relaxed">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 space-y-3">
              <h3 className="text-xs font-black text-slate-800">
                تذكيرات تربوية عامة:
              </h3>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {BLIND_SPOTS.map((spot) => (
                  <div
                    key={spot.title}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-1"
                  >
                    <div className="text-xs font-black text-slate-900">
                      {spot.title}
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-600">
                      {spot.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
