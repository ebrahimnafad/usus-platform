import React from "react";
import type { ReadingStory } from "@/domain/reading-types";

interface StationGuidedReadProps {
  story: ReadingStory;
  station2Html: string;
  isTransferTest: boolean;
  sightWordMode: "colored" | "underlined" | "off";
  onSetSightWordMode: (mode: "colored" | "underlined" | "off") => void;
}

export default function StationGuidedRead({
  story,
  station2Html,
  isTransferTest,
  sightWordMode,
  onSetSightWordMode,
}: StationGuidedReadProps) {
  return (
    <div className="space-y-6">
      {/* Scaffold Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-slate-600">
            إبراز الكلمات المستهدفة:
          </span>
          {isTransferTest ? (
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              التلوين مقفل لاختبار النقل المستقل
            </span>
          ) : (
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
              {(["colored", "underlined", "off"] as const).map((mode) => {
                const label =
                  mode === "colored"
                    ? "تلوين"
                    : mode === "underlined"
                      ? "تسطير"
                      : "إيقاف";
                return (
                  <button
                    key={mode}
                    onClick={() => onSetSightWordMode(mode)}
                    className={`px-3 py-1 rounded-lg transition ${
                      sightWordMode === mode
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

        {/* Sight Words Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-500">الكلمات:</span>
          {story.targetSightWords.map((word) => (
            <span
              key={word}
              className="px-2 py-0.5 bg-emerald-100 text-emerald-900 text-xs font-extrabold rounded-md border border-emerald-200"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Reading Surface */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
        <h2 className="text-xl font-black text-slate-900 mb-6">
          قراءة موجهة لضبط الطلاقة والتنغيم الصوتي
        </h2>
        <div
          className="font-serif text-2xl sm:text-3xl leading-[2.4] text-slate-800 text-justify max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: station2Html }}
        />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl">⚠️</span>
        <div className="text-xs text-amber-950 leading-relaxed font-medium">
          <strong className="font-black block mb-0.5">تنبيه تربوي حاسم:</strong>
          «الوقف الصحيح ليس خطأً». إذا توقف الطفل عند علامات الترقيم أو نهايات
          الجمل لأخذ نفس أو استيعاب الفكرة، فهذا دليل فهم وليس تعثراً قرائياً!
        </div>
      </div>
    </div>
  );
}
