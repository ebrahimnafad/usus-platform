import React from "react";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/studio/icons";
import type { ReadingLevel, ReadingStory } from "@/domain/reading-types";
import { toEasternArabicNumerals } from "@/lib/numerals";

interface StationReviewProps {
  level: ReadingLevel;
  story: ReadingStory;
  nextStoryNumber: number | null;
}

export default function StationReview({
  level,
  story,
  nextStoryNumber,
}: StationReviewProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="bg-white border border-emerald-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center text-3xl mx-auto">
          🎉
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          أحسنت! أتممت دورة القصة بنجاح
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          أكملت كافة محطات دورة القصة «{story.titleAr ?? story.title}»؛ قراءة
          أولى، وطلاقة موجهة، وتحليل أسئلة الفهم، ومعمل النحو، والتعبير.
        </p>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          {nextStoryNumber ? (
            <Link
              href={`/reading/level/${level.id}/story/${nextStoryNumber}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-sm hover:bg-emerald-700 transition shadow-sm"
            >
              <span>
                الانتقال للقصة التالية (
                {toEasternArabicNumerals(nextStoryNumber)})
              </span>
              <ArrowLeftIcon size={16} />
            </Link>
          ) : (
            <Link
              href={`/reading/level/${level.id}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-sm hover:bg-emerald-700 transition shadow-sm"
            >
              <ArrowRightIcon size={15} />
              <span>العودة لقصص المستوى</span>
            </Link>
          )}
          <Link
            href={`/reading/level/${level.id}`}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm transition"
          >
            جميع القصص
          </Link>
        </div>
      </div>
    </div>
  );
}
