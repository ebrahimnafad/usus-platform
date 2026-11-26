import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
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
        className="home-sky-bg min-h-screen flex items-center justify-center p-6"
        dir="rtl"
      >
        <div className="bg-white rounded-[32px] p-8 max-w-md w-full text-center border border-white/80 shadow-[0_24px_48px_-24px_rgba(30,60,100,0.25)]">
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
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-emerald-600 text-white font-extrabold text-sm hover:bg-emerald-700 transition"
          >
            ← العودة لمستويات القراءة
          </Link>
        </div>
      </div>
    );
  }

  const levelColor =
    level.id === "level-2"
      ? {
          badge: "bg-teal-500",
          activeBadge: "text-teal-700 font-extrabold",
          art: "radial-gradient(circle at 50% 40%, #CCFBF1, #DCEAF5)",
          button:
            "bg-teal-600 hover:bg-teal-700 shadow-[0_12px_22px_-10px_rgba(20,184,166,0.7)]",
          pill: "text-teal-700",
          border: "border-teal-200",
          hover: "hover:border-teal-400",
        }
      : {
          badge: "bg-emerald-500",
          activeBadge: "text-emerald-700 font-extrabold",
          art: "radial-gradient(circle at 50% 40%, #D1FAE5, #DCEAF5)",
          button:
            "bg-emerald-600 hover:bg-emerald-700 shadow-[0_12px_22px_-10px_rgba(5,150,105,0.7)]",
          pill: "text-emerald-700",
          border: "border-emerald-200",
          hover: "hover:border-emerald-400",
        };

  return (
    <div
      className="home-sky-bg min-h-screen text-slate-900 pb-20"
      dir="rtl"
      lang="ar"
    >
      {/* ── Glassmorphic Topbar ── */}
      <div className="sticky top-0 z-40 border-b border-slate-900/10 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-lg font-black text-slate-900 transition hover:opacity-85"
              title="العودة إلى بوابة أُسُس"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-base text-white shadow-sm">
                📚
              </span>
              <span>أُسُس</span>
            </Link>
            <span className="font-bold text-slate-300">/</span>
            <Breadcrumbs
              segments={[
                { label: "الرئيسية", href: "/" },
                { label: "القراءة", href: "/reading" },
                { label: level.titleAr },
              ]}
              listClassName="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500"
              activeItemClassName={levelColor.activeBadge}
              linkClassName="hover:text-slate-900 transition"
              separator={
                <span
                  className="select-none font-bold text-slate-300"
                  aria-hidden="true"
                >
                  &gt;
                </span>
              }
            />
          </div>

          <Link
            href="/reading"
            className="rounded-full border border-slate-900/10 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50"
          >
            ← كافة المستويات
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
        {/* ── Level Overview Banner ── */}
        <section className="mb-10 overflow-hidden rounded-[32px] bg-white shadow-[0_24px_48px_-24px_rgba(5,150,105,0.25)] border border-white/80">
          {/* Pastel art header */}
          <div
            className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 px-6 pt-6 pb-10 sm:px-8"
            style={{ background: levelColor.art }}
          >
            <div className="space-y-2 max-w-2xl">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 text-xs font-black ${levelColor.pill}`}
              >
                <span>📚</span>
                <span>{level.titleAr}</span>
                <span className="text-slate-300">•</span>
                <span>{level.subtitleAr}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                شبكة دورات القراءة (
                {toEasternArabicNumerals(level.stories.length)} دورة)
              </h1>
              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                {level.descriptionAr}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-bold shrink-0">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 px-4 py-2 text-center shadow-xs">
                <span className="text-slate-400 block mb-0.5 text-[11px]">
                  طول النص
                </span>
                <span className="text-slate-800 font-black">
                  {toEasternArabicNumerals(level.targetWordCount.min)}–
                  {toEasternArabicNumerals(level.targetWordCount.max)} كلمة
                </span>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 px-4 py-2 text-center shadow-xs">
                <span className="text-slate-400 block mb-0.5 text-[11px]">
                  الدورات الحرة
                </span>
                <span className="text-amber-700 font-black">دورتان 🌟</span>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 px-4 py-2 text-center shadow-xs">
                <span className="text-slate-400 block mb-0.5 text-[11px]">
                  اختبارات النقل
                </span>
                <span className="text-indigo-700 font-black">دورتان 🎯</span>
              </div>
            </div>
          </div>

          {/* Curved-lip body — empty, just the lip */}
          <div className="home-card-lip relative bg-white h-4" />
        </section>

        {/* ── Stories Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {level.stories.map((story) => {
            const isFreeReading = story.type === "free_reading";
            const isTransferTest = story.type === "transfer_test";

            let cardStyle = {
              border: "border-slate-200",
              hover: `${levelColor.hover}`,
              badgeBg: `bg-emerald-50 text-emerald-800 border-emerald-200`,
              badgeText: "دورة قياسية",
              artBg: levelColor.art,
            };

            if (isFreeReading) {
              cardStyle = {
                border: "border-amber-200",
                hover: "hover:border-amber-400",
                badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
                badgeText: "🌟 قراءة حرة للمتعة",
                artBg:
                  "radial-gradient(circle at 50% 30%, #FEF3C7, #FDE68A33, #FFFFFF)",
              };
            } else if (isTransferTest) {
              cardStyle = {
                border: "border-indigo-200",
                hover: "hover:border-indigo-400",
                badgeBg: "bg-indigo-100 text-indigo-900 border-indigo-300",
                badgeText: "🎯 اختبار النقل",
                artBg:
                  "radial-gradient(circle at 50% 30%, #EDE9FE, #DDD6FE33, #FFFFFF)",
              };
            }

            return (
              <Link
                key={story.id}
                href={`/reading/level/${level.id}/story/${story.storyNumber}`}
                className={`group relative flex flex-col overflow-hidden rounded-[32px] border bg-white shadow-[0_16px_32px_-16px_rgba(30,60,100,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(30,60,100,0.3)] ${cardStyle.border} ${cardStyle.hover}`}
              >
                {/* Mini art header */}
                <div
                  className="relative flex h-20 w-full items-center justify-between overflow-hidden rounded-t-[32px] px-5 pt-3 pb-6"
                  style={{ background: cardStyle.artBg }}
                >
                  <span className="w-9 h-9 rounded-xl bg-white/80 text-slate-700 text-sm font-black flex items-center justify-center shadow-xs group-hover:bg-emerald-600 group-hover:text-white transition">
                    {toEasternArabicNumerals(story.storyNumber)}
                  </span>
                  <span
                    className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg border ${cardStyle.badgeBg}`}
                  >
                    {cardStyle.badgeText}
                  </span>
                </div>

                {/* Curved-lip card body */}
                <div className="home-card-lip relative flex flex-1 flex-col justify-between bg-white px-5 pt-1 pb-5">
                  <div>
                    <h3
                      className={`text-base font-black text-slate-900 group-hover:${levelColor.pill} transition mb-2`}
                    >
                      {story.titleAr}
                    </h3>
                    <div className="space-y-1 text-xs text-slate-500 mb-4 font-bold">
                      <div className="flex items-center justify-between">
                        <span>عدد الكلمات:</span>
                        <span className="text-slate-700">
                          {toEasternArabicNumerals(story.wordCount)} كلمة
                        </span>
                      </div>
                      {story.grammarDiscovery && (
                        <div className="flex items-center justify-between">
                          <span>معمل النحو:</span>
                          <span className={`font-bold ${levelColor.pill}`}>
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

                  <div
                    className={`border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-bold ${levelColor.pill}`}
                  >
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
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
