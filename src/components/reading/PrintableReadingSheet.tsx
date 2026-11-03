import React from "react";
import type {
  QARTier,
  ReadingLevel,
  ReadingStory,
} from "@/domain/reading-types";
import { toEasternArabicNumerals } from "@/lib/numerals";
import { transformTashkeel, type TashkeelMode } from "@/lib/reading-scaffold";

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

interface Props {
  level: ReadingLevel;
  story: ReadingStory;
  tashkeelMode?: TashkeelMode;
  includeStoryText?: boolean;
}

export default function PrintableReadingSheet({
  level,
  story,
  tashkeelMode = "full",
  includeStoryText = true,
}: Props) {
  const isFreeReading = story.type === "free_reading";
  const isTransferTest = story.type === "transfer_test";
  const renderedStoryText = transformTashkeel(story.text, tashkeelMode);
  const typographyClass = getStoryTypographyClass(level.levelNumber);

  return (
    <article
      className="a4-sheet bg-white text-slate-900 mx-auto box-border p-6 hidden print:block"
      style={{
        width: "210mm",
        minHeight: "297mm",
      }}
      dir="rtl"
    >
      {/* A4 Header */}
      <header className="border-b-2 border-slate-800 pb-3 mb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-black">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-black">
              أُ
            </span>
            <span className="text-sm font-black text-slate-900">
              أُسُس — نادي القراءة والفهم القرائي — {level.titleAr}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-black border border-slate-200">
              {TASHKEEL_BADGE_LABELS[tashkeelMode]}
            </span>
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
          <span className="text-slate-600 font-extrabold text-[11px]">
            [الصفحة ١/١]
          </span>
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

      {/* Free Reading Printable Layout */}
      {isFreeReading ? (
        <div className="flex flex-col justify-between h-[245mm]">
          {includeStoryText && (
            <div className="border border-amber-300 rounded-2xl p-8 bg-amber-50/20 text-center my-auto">
              <div className="text-xs font-extrabold text-amber-900 mb-4 inline-block bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                🌟 جلسة قراءة حرة للمتعة الأدبية الخالصة
              </div>
              <h1 className="text-2xl font-black font-serif text-slate-900 mb-8">
                {story.titleAr ?? story.title}
              </h1>
              <div
                className={`font-serif ${typographyClass} text-slate-900 text-justify max-w-xl mx-auto`}
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
        <div className="space-y-4">
          {/* 1. Story Text Box */}
          {includeStoryText && (
            <section className="border border-emerald-200 border-l-4 border-l-emerald-400 rounded-xl p-4 bg-emerald-50/40 break-inside-avoid">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-slate-800">
                  📖 نص القصة: «{story.titleAr ?? story.title}»
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  ({toEasternArabicNumerals(story.wordCount)} كلمة)
                </span>
              </div>
              <div
                className={`font-serif ${typographyClass} text-slate-900 text-justify`}
              >
                {renderedStoryText}
              </div>
            </section>
          )}

          {/* 2. QAR Comprehension Questions */}
          <section className="border border-sky-200 border-l-4 border-l-sky-400 rounded-xl p-4 bg-sky-50/40 break-inside-avoid">
            <div className="flex items-center justify-between mb-3 border-b border-sky-200 pb-1.5">
              <span className="text-xs font-black text-slate-900">
                🔍 أسئلة الفهم (أين تعيش الإجابة؟):
              </span>
              <span className="text-[10px] font-bold text-slate-500">
                مباشر • استنتاجي • إبداعي
              </span>
            </div>

            <div className="space-y-3.5">
              {story.qarQuestions.map((q, idx) => {
                const tierConfig = QAR_TIER_CONFIG[q.tier] ?? {
                  label: "مباشر",
                  lines: 1,
                };

                return (
                  <div
                    key={q.id}
                    data-tier={q.tier}
                    className="text-xs space-y-1"
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
                    <div className="mr-4 space-y-1">
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
            <section className="border border-violet-200 border-l-4 border-l-violet-400 rounded-xl p-3.5 bg-violet-50/40 break-inside-avoid">
              <div className="flex items-center justify-between mb-2 border-b border-violet-200 pb-1">
                <span className="text-xs font-black text-slate-900">
                  🧩 معمل اللغة (اكتشف القاعدة):
                </span>
                <span className="text-[11px] font-black text-violet-800">
                  {story.grammarDiscovery.targetRule}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {/* Step 1 & 2 compact */}
                <div className="flex flex-wrap items-center gap-3 text-slate-700 font-bold">
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
                <div className="pt-1">
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

          {/* 4. Self-Assessment Strip */}
          <section className="flex items-center justify-between px-4 py-2 border border-dashed border-slate-200 rounded-lg bg-slate-50/50 text-xs text-slate-600 break-inside-avoid">
            <span className="font-bold">كيف أحسست بأدائي؟</span>
            <span className="text-base tracking-widest text-slate-400 select-none">
              ☆ ☆ ☆
            </span>
          </section>

          {/* Print Footer */}
          <footer className="text-center text-[10px] text-slate-400 font-bold pt-1">
            منصة أُسُس التعليمية — ورقة عمل مطبوعة ومخصصة لدورة القصة
          </footer>
        </div>
      )}
    </article>
  );
}
