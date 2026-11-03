import React from "react";
import type { ReadingStory } from "@/domain/reading-types";

interface StationGrammarLabProps {
  story: ReadingStory;
}

export default function StationGrammarLab({ story }: StationGrammarLabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
          <span>🧩</span>
          <span>معمل اللغة الاستقرائي</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          اكتشف القاعدة اللغوية من شواهد القصة
        </h2>

        {story.grammarDiscovery ? (
          <div className="space-y-6">
            {/* Step 1: Examples */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-slate-400 block">
                الخطوة ١: أمثلة من القصة
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {story.grammarDiscovery.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold text-slate-800"
                  >
                    «{ex}»
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Observation */}
            <div className="space-y-1 bg-amber-50/60 border border-amber-200 rounded-2xl p-4">
              <span className="text-xs font-extrabold text-amber-800 block">
                الخطوة ٢: الملاحظة
              </span>
              <p className="text-sm font-bold text-amber-950 leading-relaxed">
                {story.grammarDiscovery.observation}
              </p>
            </div>

            {/* Step 3: Concept Label */}
            <div className="space-y-1 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <span className="text-xs font-extrabold text-emerald-800 block">
                الخطوة ٣: تسمية المفهوم
              </span>
              <p className="text-base font-black text-emerald-950">
                {story.grammarDiscovery.label}
              </p>
            </div>

            {/* Step 4: Production Prompt */}
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <span className="text-xs font-extrabold text-slate-500 block">
                الخطوة ٤: إنتاج جملة مماثلة
              </span>
              <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl">
                <p className="text-sm font-bold text-slate-800 mb-3">
                  {story.grammarDiscovery.productionPrompt}
                </p>
                <div className="h-10 border-b-2 border-dotted border-slate-400 flex items-center text-slate-400 text-xs font-medium">
                  اكتب جملتك هنا بخط جميل...
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            هذه الدورة مخصصة للقراءة الحرة ولا تتضمن تمريناً نحوياً.
          </p>
        )}
      </div>
    </div>
  );
}
