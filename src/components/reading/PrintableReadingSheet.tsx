import React from "react";
import type {
  QARTier,
  ReadingLevel,
  ReadingStory,
} from "@/domain/reading-types";
import { toEasternArabicNumerals } from "@/lib/numerals";
import {
  transformTashkeel,
  getDefaultTashkeelMode,
  type TashkeelMode,
} from "@/lib/reading-scaffold";
import { ReadingHeaderQrCode } from "@/components/worksheet/WorksheetHeaderQrCodes";

const QAR_TIER_CONFIG: Record<QARTier, { label: string; lines: number }> = {
  direct: { label: "مباشر", lines: 1 },
  inferential: { label: "استنتاجي", lines: 2 },
  creative: { label: "إبداعي", lines: 3 },
};

const TASHKEEL_BADGE_LABELS: Record<TashkeelMode, string> = {
  full: "تشكيل كامل",
  partial: "تشكيل جزئي",
  none: "بدون تشكيل",
};

const LEVEL_TYPOGRAPHY: Record<number, string> = {
  1: "text-[22px] leading-[2.6]",
  2: "text-[19px] leading-[2.3]",
  3: "text-[16px] leading-[2.1]",
};

function getStoryTypographyClass(levelNumber?: number): string {
  return (levelNumber && LEVEL_TYPOGRAPHY[levelNumber]) || LEVEL_TYPOGRAPHY[2];
}

export type ReadingPrintViewMode = "student" | "answer-key";

interface Props {
  level: ReadingLevel;
  story: ReadingStory;
  tashkeelMode?: TashkeelMode;
  includeStoryText?: boolean;
  viewMode?: ReadingPrintViewMode;
  qrOrigin?: string;
  alwaysVisible?: boolean;
}

export default function PrintableReadingSheet({
  level,
  story,
  tashkeelMode,
  includeStoryText = true,
  viewMode = "student",
  qrOrigin,
  alwaysVisible = false,
}: Props) {
  const effectiveTashkeel =
    tashkeelMode ?? getDefaultTashkeelMode(level.levelNumber);
  const isFreeReading = story.type === "free_reading";
  const isTransferTest = story.type === "transfer_test";
  const isAnswerKey = viewMode === "answer-key";
  const renderedStoryText = transformTashkeel(story.text, effectiveTashkeel);
  const typographyClass = getStoryTypographyClass(level.levelNumber);

  return (
    <article
      data-reading-sheet="true"
      data-reading-view={viewMode}
      className={`a4-sheet reading-a4-sheet bg-white text-slate-900 mx-auto box-border px-6 py-2.5 ${
        alwaysVisible ? "block" : "hidden print:block"
      }`}
      style={{
        width: "210mm",
      }}
      dir="rtl"
    >
      {/* Scoped CSS for native A4 margin box continuation headers on page 2+ */}
      <style>{`
        @page reading-page {
          size: A4 portrait;
          margin: 7mm 0 4mm 0;
          @top-center {
            content: "أُسُس | ${level.titleAr} | «${story.titleAr ?? story.title}» | الاسم: __________ | صفحة " counter(page, arabic-indic);
            font-family: "Cairo", "Readex Pro", "Segoe UI", Tahoma, sans-serif;
            font-size: 8pt;
            font-weight: 700;
            color: #334155;
            direction: rtl;
            white-space: nowrap;
            vertical-align: middle;
          }
        }
        @page reading-page:first {
          margin: 0;
          @top-center {
            content: none !important;
          }
        }
      `}</style>

      {/* Continuation mini-header DOM element — hidden on screen & in print; serves as test & accessibility anchor */}
      <div
        className="reading-continuation-header hidden"
        aria-hidden="true"
        dir="rtl"
      >
        <span>أُسُس</span>
        <span> | </span>
        <span>{level.titleAr}</span>
        <span> | </span>
        <span>«{story.titleAr ?? story.title}»</span>
        <span> | </span>
        <span>
          الاسم: <span className="text-slate-400">__________</span>
        </span>
        <span> | </span>
        <span className="reading-print-page-number" />
      </div>

      {/* A4 Header */}
      <header className="border-b-2 border-slate-800 pb-1.5 mb-2 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-3 text-xs font-black">
          {!isAnswerKey && (
            <ReadingHeaderQrCode
              view="teacher-notes"
              levelId={level.id}
              storyNumber={story.storyNumber}
              tashkeelMode={tashkeelMode}
              qrOrigin={qrOrigin}
            />
          )}

          <div className="flex flex-1 flex-wrap items-center justify-center gap-2 text-center">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-black">
              أُ
            </span>
            <span className="text-sm font-black text-slate-900">
              أُسُس — نادي القراءة والفهم القرائي — {level.titleAr}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-black border border-slate-200">
              {TASHKEEL_BADGE_LABELS[effectiveTashkeel]}
            </span>
            {isAnswerKey && (
              <span className="px-2 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-black">
                نموذج الإجابة
              </span>
            )}
            {isTransferTest && (
              <span className="px-2 py-0.5 rounded bg-slate-800 text-white text-[10px] font-black">
                🎯 اختبار النقل
              </span>
            )}
            {isFreeReading && (
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-950 text-[10px] font-black border border-amber-300">
                🌟 جلسة قراءة حرة للمتعة
              </span>
            )}
          </div>

          {!isAnswerKey && !isFreeReading && (
            <ReadingHeaderQrCode
              view="answer-key"
              levelId={level.id}
              storyNumber={story.storyNumber}
              tashkeelMode={tashkeelMode}
              qrOrigin={qrOrigin}
            />
          )}
          {!isAnswerKey && isFreeReading && (
            <span className="w-[50px] shrink-0" aria-hidden="true" />
          )}
        </div>

        {/* Student metadata row */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-1 border-t border-slate-200">
          <div>
            الاسم:{" "}
            <span className="text-slate-400 font-normal">
              ..........................................
            </span>
          </div>
          <div>
            التاريخ:{" "}
            <span className="text-slate-400 font-normal">
              ..... / ..... / ١٤٤...هـ
            </span>
          </div>
          <div>
            القصة:{" "}
            <span className="font-black text-slate-900">
              «{story.titleAr ?? story.title}»
            </span>
          </div>
        </div>
      </header>

      {/* Answer Key Printable Layout */}
      {isAnswerKey ? (
        isFreeReading ? (
          <div className="border border-amber-300 rounded-2xl p-6 bg-amber-50/30 text-center text-sm font-bold text-amber-950">
            جلسة قراءة حرة للمتعة الأدبية الخالصة — لا توجد أسئلة أو نموذج إجابة
            لهذه القصة.
          </div>
        ) : (
          <div className="space-y-3">
            {/* QAR Sample Answers & Evidence */}
            <section className="border border-emerald-300 border-l-4 border-l-emerald-500 rounded-xl p-3.5 bg-emerald-50/30">
              <div className="flex items-center justify-between mb-2 border-b border-emerald-200 pb-1">
                <span className="text-xs font-black text-emerald-950">
                  ✅ نموذج إجابات الفهم القرائي (QAR):
                </span>
                <span className="text-[10px] font-bold text-emerald-800">
                  الإجابة النموذجية + الدليل النصي
                </span>
              </div>

              <div className="space-y-2.5">
                {story.qarQuestions.map((q, idx) => {
                  const tierConfig = QAR_TIER_CONFIG[q.tier] ?? {
                    label: "مباشر",
                    lines: 1,
                  };
                  return (
                    <div
                      key={q.id}
                      data-tier={q.tier}
                      className="rounded-lg border border-emerald-200 bg-white p-2.5 text-xs space-y-1 break-inside-avoid"
                    >
                      <div className="flex items-start gap-1.5">
                        <span className="font-black text-slate-800">
                          {toEasternArabicNumerals(idx + 1)}.
                        </span>
                        <span className="font-black text-slate-500 text-[10px]">
                          [{tierConfig.label}]
                        </span>
                        <span className="font-bold text-slate-900">
                          {q.prompt ?? q.question}
                        </span>
                      </div>
                      <div className="mr-4 text-emerald-900 font-bold">
                        <span className="text-emerald-700">الإجابة: </span>
                        {q.sampleAnswer}
                      </div>
                      {q.textEvidenceSnippet && (
                        <div className="mr-4 text-[11px] text-slate-600">
                          <span className="font-bold text-slate-700">
                            الدليل من النص:{" "}
                          </span>
                          «{q.textEvidenceSnippet}»
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Grammar Discovery Answer Key */}
            {story.grammarDiscovery && (
              <section className="border border-violet-300 border-l-4 border-l-violet-500 rounded-xl p-3 bg-violet-50/30 break-inside-avoid">
                <div className="flex items-center justify-between mb-1.5 border-b border-violet-200 pb-1">
                  <span className="text-xs font-black text-violet-950">
                    🧩 إجابة معمل اللغة:
                  </span>
                  <span className="text-[11px] font-black text-violet-800">
                    {story.grammarDiscovery.targetRule}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-slate-800">
                  <div>
                    <span className="font-bold text-violet-900">
                      الملاحظة:{" "}
                    </span>
                    {story.grammarDiscovery.observation}
                  </div>
                  <div>
                    <span className="font-bold text-violet-900">
                      القاعدة المستخلصة:{" "}
                    </span>
                    <span className="font-black">
                      {story.grammarDiscovery.label}
                    </span>
                  </div>
                </div>
              </section>
            )}

            <footer className="text-center text-[10px] text-slate-400 font-bold pt-0.5">
              منصة أُسُس التعليمية — نموذج إجابة المعلم لدورة القصة
            </footer>
          </div>
        )
      ) : isFreeReading ? (
        <div className="flex flex-col justify-between h-[238mm]">
          {includeStoryText && (
            <div className="border border-amber-300 rounded-2xl p-8 bg-amber-50/20 text-center my-auto">
              <div className="text-xs font-extrabold text-amber-900 mb-4 inline-block bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                🌟 جلسة قراءة حرة للمتعة الأدبية الخالصة
              </div>
              <h1 className="text-2xl font-black font-serif text-slate-900 mb-8">
                {story.titleAr ?? story.title}
              </h1>
              <div
                className={`font-serif ${typographyClass} text-slate-900 text-justify max-w-xl mx-auto whitespace-pre-line`}
              >
                {renderedStoryText}
              </div>
            </div>
          )}
          <footer className="text-center text-[11px] text-slate-400 font-bold border-t border-slate-200 pt-3">
            منصة أُسُس التعليمية — نادي القراءة والفهم القرائي
          </footer>
        </div>
      ) : (
        /* Standard & Transfer Test Printable Layout (Story + QAR + Grammar Lab) */
        <div className="space-y-1.5">
          {/* 1. Story Text Box */}
          {includeStoryText && (
            <section className="border border-emerald-200 border-l-4 border-l-emerald-400 rounded-xl p-2 bg-emerald-50/40 break-inside-avoid">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-slate-800">
                  📖 نص القصة: «{story.titleAr ?? story.title}»
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  ({toEasternArabicNumerals(story.wordCount)} كلمة)
                </span>
              </div>
              <div
                className={`font-serif ${typographyClass} text-slate-900 text-justify whitespace-pre-line`}
              >
                {renderedStoryText}
              </div>
            </section>
          )}

          {/* 2. QAR Comprehension Questions */}
          <section className="border border-sky-200 border-l-4 border-l-sky-400 rounded-xl p-2 bg-sky-50/40">
            <div className="flex items-center justify-between mb-1 border-b border-sky-200 pb-1">
              <span className="text-xs font-black text-slate-900">
                🔍 أسئلة الفهم (أين تعيش الإجابة؟):
              </span>
              <span className="text-[10px] font-bold text-slate-500">
                مباشر • استنتاجي • إبداعي
              </span>
            </div>

            <div className="space-y-1">
              {story.qarQuestions.map((q, idx) => {
                const tierConfig = QAR_TIER_CONFIG[q.tier] ?? {
                  label: "مباشر",
                  lines: 1,
                };

                return (
                  <div
                    key={q.id}
                    data-tier={q.tier}
                    className="text-xs space-y-0.5 break-inside-avoid"
                  >
                    <div className="flex items-start gap-1.5">
                      <span className="font-black text-slate-800">
                        {toEasternArabicNumerals(idx + 1)}.
                      </span>
                      <span className="font-black text-slate-500 text-[10px]">
                        [{tierConfig.label}]
                      </span>
                      <span className="font-bold text-slate-900">
                        {q.prompt ?? q.question}
                      </span>
                    </div>
                    {/* Dotted Writing Answer Lines scaled by tier */}
                    <div className="mr-4 space-y-0.5">
                      {Array.from({ length: tierConfig.lines }).map(
                        (_, lineIdx) => (
                          <div
                            key={lineIdx}
                            data-answer-line
                            className="h-[12mm] border-b border-dotted border-slate-400"
                          />
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. Inductive Language Lab */}
          {story.grammarDiscovery && (
            <section className="border border-violet-200 border-l-4 border-l-violet-400 rounded-xl p-2 bg-violet-50/40 break-inside-avoid">
              <div className="flex items-center justify-between mb-1 border-b border-violet-200 pb-1">
                <span className="text-xs font-black text-slate-900">
                  🧩 معمل اللغة (اكتشف القاعدة):
                </span>
                <span className="text-[11px] font-black text-violet-800">
                  {story.grammarDiscovery.targetRule}
                </span>
              </div>

              <div className="space-y-1 text-xs">
                {/* Step 1 & 2 compact */}
                <div className="flex flex-wrap items-center gap-2 text-slate-700 font-bold">
                  <span>الشواهد:</span>
                  {story.grammarDiscovery.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-white border border-violet-200 rounded text-[11px]"
                    >
                      «{ex}»
                    </span>
                  ))}
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-800">
                    القاعدة: {story.grammarDiscovery.label}
                  </span>
                </div>

                {/* Step 4: Production Prompt */}
                <div className="pt-0.5">
                  <span className="font-bold text-slate-900">
                    * {story.grammarDiscovery.productionPrompt}
                  </span>
                  <div
                    data-answer-line
                    className="h-[12mm] border-b border-dotted border-slate-400 mt-0.5"
                  />
                </div>
              </div>
            </section>
          )}

          {/* 4. Self-Assessment Strip + Footer kept together so footer is never orphaned */}
          <div className="space-y-1 break-inside-avoid">
            <section className="flex items-center justify-between px-4 py-1 border border-dashed border-slate-200 rounded-lg bg-slate-50/50 text-xs text-slate-600">
              <span className="font-bold">كيف أحسست بأدائي؟</span>
              <span className="text-base tracking-widest text-slate-400 select-none">
                ☆ ☆ ☆
              </span>
            </section>

            {/* Print Footer */}
            <footer className="text-center text-[10px] text-slate-400 font-bold pt-0.5">
              منصة أُسُس التعليمية — ورقة عمل مطبوعة ومخصصة لدورة القصة
            </footer>
          </div>
        </div>
      )}
    </article>
  );
}
