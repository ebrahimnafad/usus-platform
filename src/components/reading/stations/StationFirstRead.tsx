import React from "react";
import type { ReadingStory } from "@/domain/reading-types";
import { toEasternArabicNumerals } from "@/lib/numerals";

interface StationFirstReadProps {
  story: ReadingStory;
  displayedStoryText: string;
  isTransferTest: boolean;
  tashkeelMode: "full" | "partial" | "none";
  onSetTashkeelMode: (mode: "full" | "partial" | "none") => void;
}

export default function StationFirstRead({
  story,
  displayedStoryText,
  isTransferTest,
  tashkeelMode,
  onSetTashkeelMode,
}: StationFirstReadProps) {
  return (
    <div className="space-y-6">
      {/* Scaffold Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-600">
            درجة التشكيل:
          </span>
          {isTransferTest ? (
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              تشكيل قياسي مقفل لاختبار النقل
            </span>
          ) : (
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
              {(["full", "partial", "none"] as const).map((mode) => {
                const label =
                  mode === "full"
                    ? "تشكيل كامل"
                    : mode === "partial"
                      ? "تشكيل جزئي"
                      : "بدون تشكيل";
                return (
                  <button
                    key={mode}
                    onClick={() => onSetTashkeelMode(mode)}
                    className={`px-3 py-1 rounded-lg transition ${
                      tashkeelMode === mode
                        ? "bg-white text-emerald-800 font-black shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="text-xs font-bold text-slate-500">
          <span>طول النص: </span>
          <span className="text-slate-800 font-black">
            {toEasternArabicNumerals(story.wordCount)} كلمة
          </span>
        </div>
      </div>

      {/* Main Reading Surface */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black mb-6">
          <span>📖</span>
          <span>القصة {toEasternArabicNumerals(story.storyNumber)}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 font-serif">
          {story.titleAr ?? story.title}
        </h1>
        <div className="font-serif text-2xl sm:text-3xl leading-[2.4] text-slate-800 text-justify max-w-3xl mx-auto whitespace-pre-line">
          {displayedStoryText}
        </div>
      </div>

      {/* Teacher Guidance Note */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl">💡</span>
        <div className="text-xs text-emerald-900 leading-relaxed font-medium">
          <strong className="font-black block mb-0.5">
            توجيه المحطة الأولى:
          </strong>
          اقرأ القصة أولاً كنموذج صوتي هادئ أو دع الطفل يقرأها بصوته لاستكشاف
          المعنى العام. لا تقاطع الطفل مطلقاً في هذه القراءة الأولى لتصحيح النحو
          أو الضبط.
        </div>
      </div>
    </div>
  );
}
