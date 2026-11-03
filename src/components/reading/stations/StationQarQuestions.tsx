import React from "react";
import type { ReadingStory } from "@/domain/reading-types";
import { toEasternArabicNumerals } from "@/lib/numerals";

interface StationQarQuestionsProps {
  story: ReadingStory;
  isTransferTest: boolean;
  activeEvidenceSnippet: string | null;
  revealedHints: Record<string, boolean>;
  revealedAnswers: Record<string, boolean>;
  onToggleEvidence: (snippet: string) => void;
  onToggleHint: (qId: string) => void;
  onToggleAnswer: (qId: string) => void;
}

export default function StationQarQuestions({
  story,
  isTransferTest,
  activeEvidenceSnippet,
  revealedHints,
  revealedAnswers,
  onToggleEvidence,
  onToggleHint,
  onToggleAnswer,
}: StationQarQuestionsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            أسئلة الفهم القرائي الثلاثية (QAR)
          </h2>
          <p className="text-xs text-slate-500 font-bold mt-0.5">
            أين تعيش الإجابة؟ (في النص صراحة • بين السطور • في عقلك وخبرتك)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {story.qarQuestions.map((q, idx) => {
          const isDirect = q.tier === "direct";
          const isInferential = q.tier === "inferential";
          const tierLabel = isDirect
            ? "مباشر — في النص صراحة"
            : isInferential
              ? "استنتاجي — بين السطور"
              : "إبداعي — أنت والنص معاً";

          const tierBadgeBg = isDirect
            ? "bg-sky-50 text-sky-800 border-sky-200"
            : isInferential
              ? "bg-violet-50 text-violet-800 border-violet-200"
              : "bg-amber-50 text-amber-900 border-amber-200";

          const isEvidenceActive =
            q.textEvidenceSnippet &&
            activeEvidenceSnippet === q.textEvidenceSnippet;

          return (
            <div
              key={q.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
                    {toEasternArabicNumerals(idx + 1)}
                  </span>
                  <span
                    className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg border ${tierBadgeBg}`}
                  >
                    {tierLabel}
                  </span>
                </div>

                {/* Evidence Button */}
                {q.textEvidenceSnippet && !isTransferTest && (
                  <button
                    onClick={() => onToggleEvidence(q.textEvidenceSnippet!)}
                    className={`text-xs font-extrabold px-3 py-1 rounded-xl transition border ${
                      isEvidenceActive
                        ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                        : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
                    }`}
                  >
                    🔍 أين الدليل في النص؟
                  </button>
                )}
              </div>

              <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                {q.prompt ?? q.question}
              </p>

              {/* Hint / Sample Answer Controls */}
              <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  {q.hint && !isTransferTest && (
                    <button
                      onClick={() => onToggleHint(q.id)}
                      className="text-slate-500 hover:text-slate-800 font-bold"
                    >
                      {revealedHints[q.id]
                        ? "إخفاء التلميح ▲"
                        : "💡 تلميح للمتعلم ▼"}
                    </button>
                  )}
                  <button
                    onClick={() => onToggleAnswer(q.id)}
                    className="text-emerald-700 hover:text-emerald-900 font-extrabold"
                  >
                    {revealedAnswers[q.id]
                      ? "إخفاء الإجابة النموذجية ▲"
                      : "عرض الإجابة النموذجية ▼"}
                  </button>
                </div>
              </div>

              {revealedHints[q.id] && q.hint && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                  <strong className="font-bold">تلميح: </strong> {q.hint}
                </div>
              )}

              {revealedAnswers[q.id] && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-bold">
                  <span>الإجابة المقترحة: </span> {q.sampleAnswer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
