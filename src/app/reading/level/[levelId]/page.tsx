import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/studio/icons";
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
            لم نتمكّن من العثور على هذا المستوى في نادي القراءة.
          </p>
          <Link
            href="/reading"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-600 text-white font-extrabold text-sm hover:bg-emerald-700 transition"
          >
            <ArrowRightIcon size={15} />
            <span>العودة لمستويات القراءة</span>
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
            />
          </div>

          <Link
            href="/reading"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-900/10 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50"
          >
            <ArrowRightIcon size={14} />
            <span>جميع المستويات</span>
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
        {/* ── Level Overview Utility Strip (distinct from story cards) ── */}
        <section
          aria-label="نظرة عامة على المستوى"
          className="relative mb-10 overflow-hidden rounded-[28px] border border-emerald-700/40 bg-gradient-to-l from-emerald-950 via-emerald-900 to-teal-900 p-5 text-white shadow-[0_22px_48px_-22px_rgba(6,78,59,0.55)] sm:p-7"
        >
          {/* Decorative radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -start-20 size-56 rounded-full bg-emerald-400/15 blur-3xl"
          />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: identity */}
            <div className="space-y-2 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-3.5 py-1 text-xs font-extrabold text-emerald-100">
                <span aria-hidden="true">📚</span>
                <span>{level.titleAr}</span>
                <span className="text-emerald-400/60">•</span>
                <span>{level.subtitleAr}</span>
              </div>

              <h1 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                {`قصص المستوى (${toEasternArabicNumerals(level.stories.length)} قصة)`}
              </h1>

              <p className="text-sm leading-relaxed font-medium text-emerald-100/80 max-w-xl">
                {level.descriptionAr}
              </p>
            </div>

            {/* Right: stat pills */}
            <div className="flex flex-wrap gap-2 text-xs font-bold shrink-0">
              {/* Word range */}
              <div className="flex flex-col items-center rounded-2xl border border-emerald-400/25 bg-white/8 px-4 py-2.5 text-center backdrop-blur-sm min-w-[88px]">
                <span className="text-emerald-300/70 text-[11px] mb-0.5 font-semibold">
                  طول النص
                </span>
                <span className="text-white font-black">
                  {`${toEasternArabicNumerals(level.targetWordCount.min)}–${toEasternArabicNumerals(level.targetWordCount.max)} كلمة`}
                </span>
              </div>
              {/* Free reading */}
              <div className="flex flex-col items-center rounded-2xl border border-amber-400/25 bg-amber-400/10 px-4 py-2.5 text-center backdrop-blur-sm min-w-[88px]">
                <span className="text-amber-300/70 text-[11px] mb-0.5 font-semibold">
                  الدورات الحرة
                </span>
                <span className="text-amber-200 font-black">قصتان 🌟</span>
              </div>
              {/* Transfer tests */}
              <div className="flex flex-col items-center rounded-2xl border border-indigo-400/25 bg-indigo-400/10 px-4 py-2.5 text-center backdrop-blur-sm min-w-[88px]">
                <span className="text-indigo-300/70 text-[11px] mb-0.5 font-semibold">
                  اختبارات النقل
                </span>
                <span className="text-indigo-200 font-black">اختباران 🎯</span>
              </div>
            </div>
          </div>
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
              badgeText: "قصة تعليمية",
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
                        ? "ابدأ القراءة الحرة"
                        : isTransferTest
                          ? "ابدأ اختبار النقل"
                          : "ابدأ القصة"}
                    </span>
                    <ArrowLeftIcon
                      size={15}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
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
