import React, { useState } from "react";

interface PinnedStorySnippetProps {
  title: string;
  storyHtml: string;
  activeEvidenceSnippet: string | null;
  onClearEvidence: () => void;
}

export default function PinnedStorySnippet({
  title,
  storyHtml,
  activeEvidenceSnippet,
  onClearEvidence,
}: PinnedStorySnippetProps) {
  const [pinnedExpanded, setPinnedExpanded] = useState<boolean>(false);

  return (
    <section className="mb-6 bg-white border-2 border-emerald-300 rounded-2xl p-5 shadow-sm transition">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">📌</span>
          <span className="text-xs font-black text-emerald-900">
            نص القصة المرجعي ({title})
          </span>
          {activeEvidenceSnippet && (
            <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
              تم إبراز موضع الدليل 🔍
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeEvidenceSnippet && (
            <button
              onClick={onClearEvidence}
              className="text-xs text-amber-800 hover:underline font-bold"
            >
              إلغاء الإبراز ✕
            </button>
          )}
          <button
            onClick={() => setPinnedExpanded(!pinnedExpanded)}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-extrabold"
          >
            {pinnedExpanded ? "تصغير النص ▲" : "عرض النص كاملاً ▼"}
          </button>
        </div>
      </div>

      <div
        className={`font-serif text-lg leading-loose text-slate-800 transition-all ${
          pinnedExpanded ? "max-h-none" : "max-h-24 overflow-hidden relative"
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: storyHtml }} />
        {!pinnedExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>
    </section>
  );
}
