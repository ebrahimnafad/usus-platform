import React from "react";
import type { ReadingStory } from "@/domain/reading-types";

interface StationExpressionProps {
  story: ReadingStory;
}

export default function StationExpression({ story }: StationExpressionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
          <span>✍️</span>
          <span>سلم الإنتاج اللغوي</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          التعبير والإنتاج الشفهي والكتابي
        </h2>

        <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2">
          <span className="text-xs font-extrabold text-emerald-900 block">
            مهمة التعبير لهذه القصة:
          </span>
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {story.expressionPrompt ??
              "عَبِّرْ بأسلوبك عن أكثر مشهد أعجبك في القصة ولماذا."}
          </p>
        </div>

        {/* Writing Lines Simulator */}
        <div className="space-y-3 border-t border-slate-100 pt-4">
          <span className="text-xs font-bold text-slate-500 block">
            مساحة الكتابة اليدوية للطفل (أو التسجيل الشفهي):
          </span>
          <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="h-8 border-b-2 border-dotted border-slate-300" />
            <div className="h-8 border-b-2 border-dotted border-slate-300" />
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed">
          <strong className="font-extrabold text-slate-800 block mb-1">
            قاعدة التقييم التربوي:
          </strong>
          اقبل إجابة الطفل بالعامية أولاً لتثبيت المعنى وشعوره بالنجاح، ثم أعد
          صياغتها بالفصحى بلطف: «ممتاز! معناها كذا، وبالفصحى نقول...». لا تجعل
          عبء الكتابة عائقاً أمام تدفق أفكاره.
        </div>
      </div>
    </div>
  );
}
