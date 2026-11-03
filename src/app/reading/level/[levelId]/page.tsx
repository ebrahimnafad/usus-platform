import React from "react";
import Link from "next/link";
import { getReadingLevel } from "@/curriculum/reading-catalog";
import { toEasternArabicNumerals } from "@/lib/numerals";

interface Props {
  params: Promise<{
    levelId: string;
  }>;
}

export default async function ReadingLevelGridPage({ params }: Props) {
  const { levelId } = await params;
  const level = getReadingLevel(levelId);

  if (!level) {
    return (
      <div
        className="min-h-screen bg-slate-50 flex items-center justify-center p-6"
        dir="rtl"
      >
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-black">
            !
          </div>
          <h1 className="text-xl font-extrabold text-slate-800 mb-2">
            المستوى غير موجود
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            تعذّر العثور على المستوى المطلوب في مسار القراءة والفهم.
          </p>
          <Link
            href="/reading"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-sm hover:bg-emerald-700 transition"
          >
            ← العودة لمستويات القراءة
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20" dir="rtl">
      {/* Top Header & Breadcrumb */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none"
              title="العودة إلى بوابة أُسُس"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-extrabold shadow-sm group-hover:bg-emerald-700 transition">
                أُ
              </div>
              <span className="font-extrabold text-lg text-slate-800">
                أُسُس
              </span>
            </Link>
            <span className="text-slate-300 font-bold">/</span>
            <nav className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500">
              <Link href="/" className="hover:text-emerald-700 transition">
                الرئيسية
              </Link>
              <span className="text-slate-300">›</span>
              <Link
                href="/reading"
                className="hover:text-emerald-700 transition"
              >
                القراءة
              </Link>
              <span className="text-slate-300">›</span>
              <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                {level.titleAr}
              </span>
            </nav>
          </div>
          <Link
            href="/reading"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
          >
            ← كافة المستويات
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        {/* Level Overview Banner */}
        <section className="mb-8 bg-white border border-emerald-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              <span>📚</span>
              <span>{level.titleAr}</span>
              <span>•</span>
              <span>{level.subtitleAr}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              شبكة دورات القراءة (
              {toEasternArabicNumerals(level.stories.length)} دورة)
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              {level.descriptionAr}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2">
              <span className="text-slate-400 block mb-0.5">طول النص</span>
              <span className="text-slate-800">
                {toEasternArabicNumerals(level.targetWordCount.min)}–
                {toEasternArabicNumerals(level.targetWordCount.max)} كلمة
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2">
              <span className="text-slate-400 block mb-0.5">الدورات الحرة</span>
              <span className="text-amber-700">دورتان 🌟</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2">
              <span className="text-slate-400 block mb-0.5">
                اختبارات النقل
              </span>
              <span className="text-indigo-700">دورتان 🎯</span>
            </div>
          </div>
        </section>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {level.stories.map((story) => {
            const isFreeReading = story.type === "free_reading";
            const isTransferTest = story.type === "transfer_test";

            let cardBorder = "border-slate-200 hover:border-emerald-400";
            let badgeBg = "bg-emerald-50 text-emerald-800 border-emerald-200";
            let badgeText = "دورة قياسية";

            if (isFreeReading) {
              cardBorder =
                "border-amber-300 bg-amber-50/30 hover:border-amber-500";
              badgeBg = "bg-amber-100 text-amber-900 border-amber-300";
              badgeText = "🌟 قراءة حرة للمتعة";
            } else if (isTransferTest) {
              cardBorder =
                "border-indigo-300 bg-indigo-50/20 hover:border-indigo-500";
              badgeBg = "bg-indigo-100 text-indigo-900 border-indigo-300";
              badgeText = "🎯 اختبار النقل";
            }

            return (
              <Link
                key={story.id}
                href={`/reading/level/${level.id}/story/${story.storyNumber}`}
                className={`group rounded-2xl bg-white border p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between ${cardBorder}`}
              >
                <div>
                  {/* Top Bar: Story Number & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                      {toEasternArabicNumerals(story.storyNumber)}
                    </span>
                    <span
                      className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg border ${badgeBg}`}
                    >
                      {badgeText}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition mb-2">
                    {story.titleAr}
                  </h3>

                  {/* Metadata */}
                  <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                    <div className="flex items-center justify-between">
                      <span>عدد الكلمات:</span>
                      <span className="font-bold text-slate-700">
                        {toEasternArabicNumerals(story.wordCount)} كلمة
                      </span>
                    </div>
                    {story.grammarDiscovery && (
                      <div className="flex items-center justify-between">
                        <span>معمل النحو:</span>
                        <span className="font-bold text-emerald-700">
                          {story.grammarDiscovery.targetRule}
                        </span>
                      </div>
                    )}
                    {story.theme && (
                      <div className="flex items-center justify-between">
                        <span>المجال:</span>
                        <span className="font-bold text-slate-600">
                          {story.theme}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                  <span>
                    {isFreeReading
                      ? "دخول ركن القراءة"
                      : isTransferTest
                        ? "بدء اختبار النقل"
                        : "بدء دورة القصة"}
                  </span>
                  <span className="group-hover:-translate-x-1 transition-transform">
                    ←
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
