import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { READING_LEVEL_1, READING_LEVEL_2 } from "@/curriculum/reading-catalog";

export const metadata = {
  title: "أُسُس — نادي القراءة والفهم القرائي",
  description: "مسار تعليم القراءة والفهم القرائي لما بعد مرحلة التأسيس",
};

export default function ReadingHubPage() {
  return (
    <div
      className="home-sky-bg min-h-screen text-slate-900 pb-16"
      dir="rtl"
      lang="ar"
      data-reading-hub="true"
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
                { label: "القراءة والفهم" },
              ]}
              listClassName="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500"
              activeItemClassName="text-emerald-700 font-extrabold"
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

          <nav
            aria-label="التنقل السريع"
            className="flex items-center gap-2 text-xs font-bold"
          >
            <Link
              href="/math"
              className="rounded-full px-3.5 py-1.5 text-slate-600 transition hover:bg-indigo-500/10 hover:text-indigo-700"
            >
              الرياضيات
            </Link>
            <Link
              href="/"
              className="rounded-full border border-slate-900/10 bg-white px-3.5 py-1.5 text-slate-700 shadow-2xs transition hover:bg-slate-50"
            >
              ← الرئيسية
            </Link>
          </nav>
        </div>
      </div>

      {/* ── Airy Hero ── */}
      <header className="mx-auto max-w-4xl px-4 pt-9 pb-6 text-center sm:pt-12 sm:pb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold text-emerald-700 shadow-sm">
          <span aria-hidden="true">📖</span>
          <span>نادي القراءة والفهم القرائي</span>
          <span className="text-emerald-300">•</span>
          <span>{formatEasternNumber(24)} دورة قصة</span>
        </div>

        <h1 className="mb-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
          <span className="bg-gradient-to-l from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            نادي القراءة
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed font-medium text-slate-600 sm:text-base">
          مسار منهجي متدرج وفق قاعدة الشرط الواحد لتطوير الفهم القرائي المستقل
          من الطلاقة القرائية إلى الاستنتاج المركب.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <div className="min-w-[108px] rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-2 text-center shadow-xs">
            <b className="block text-base font-black text-emerald-700">
              {formatEasternNumber(3)}
            </b>
            <span className="text-[11px] font-semibold text-slate-500">
              مستويات قرائية
            </span>
          </div>
          <div className="min-w-[108px] rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-2 text-center shadow-xs">
            <b className="block text-base font-black text-teal-700">
              {formatEasternNumber(24)}
            </b>
            <span className="text-[11px] font-semibold text-slate-500">
              دورة قصة
            </span>
          </div>
          <div className="min-w-[108px] rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-2 text-center shadow-xs">
            <b className="block text-base font-black text-sky-700">QAR</b>
            <span className="text-[11px] font-semibold text-slate-500">
              استراتيجية الفهم
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-2 sm:px-6">
        {/* ── Diagnostic Banner ── */}
        <section className="mb-10 overflow-hidden rounded-[32px] bg-white shadow-[0_24px_48px_-24px_rgba(5,150,105,0.25)] border border-white/80">
          {/* Pastel art header */}
          <div
            className="relative flex items-center justify-between gap-4 px-6 pt-6 pb-10 sm:px-8"
            style={{
              background:
                "radial-gradient(circle at 20% 50%, #D1FAE5, #A7F3D0, #ECFDF5)",
            }}
          >
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-800 text-xs font-black">
                <span>🎯</span>
                <span>تحديد نقطة الانطلاق المناسبة</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-emerald-950">
                أداة تهيئة نقطة البداية وتشخيص الاستيعاب
              </h2>
              <p className="text-emerald-800/80 text-sm leading-relaxed font-medium">
                استبيان استرشادي سريع من {toEasternArabicNumerals(6)} أسئلة
                للمربي وولي الأمر لتقييم التوازن بين الطلاقة القرائية والفهم
                السمعي.
              </p>
            </div>
            <span className="text-5xl hidden sm:block" aria-hidden="true">
              🔍
            </span>
          </div>

          {/* Curved-lip body */}
          <div className="home-card-lip relative bg-white px-6 pt-1 pb-6 sm:px-8">
            <Link
              href="/reading/diagnostic"
              className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-emerald-600 px-6 py-3 text-sm font-black text-white shadow-[0_12px_22px_-10px_rgba(5,150,105,0.7)] transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              <span>بدء الاستبيان التشخيصي</span>
              <span aria-hidden="true">←</span>
            </Link>
          </div>
        </section>

        {/* ── Levels Grid ── */}
        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-900">
            مستويات نادي القراءة والفهم
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            مسار منهجي متدرج وفق قاعدة الشرط الواحد
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Level 1: Active ── */}
          <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_24px_48px_-24px_rgba(5,150,105,0.35)] transition-all duration-300 hover:border-emerald-300 hover:shadow-[0_32px_60px_-24px_rgba(5,150,105,0.35)] hover:-translate-y-1">
            {/* Pastel art header */}
            <div
              className="relative flex h-40 w-full flex-col justify-between overflow-hidden rounded-t-[32px] px-5 pt-4 pb-8"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, #D1FAE5, #E2EEF6)",
              }}
            >
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-1 text-xs font-black text-white shadow-xs">
                  المستوى الأول
                </span>
                <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-slate-700 shadow-2xs">
                  <span>{`${toEasternArabicNumerals(12)} دورة قصة`}</span>
                </div>
              </div>
              <div className="relative z-10 flex flex-1 items-center justify-center pt-2 text-4xl">
                📗
              </div>
            </div>

            {/* Curved-lip body */}
            <div className="home-card-lip relative flex flex-1 flex-col justify-between bg-white px-6 pt-1 pb-6">
              <div>
                <h3 className="mb-1.5 text-xl font-black text-emerald-950">
                  {READING_LEVEL_1.titleAr}
                </h3>
                <p className="mb-1 text-sm font-bold text-emerald-700">
                  {READING_LEVEL_1.subtitleAr}
                </p>
                <p className="mb-4 line-clamp-2 text-xs leading-relaxed font-semibold text-slate-600">
                  {READING_LEVEL_1.descriptionAr}
                </p>
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-5 text-xs font-bold text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>طول النصوص:</span>
                    <span className="text-slate-800">
                      {toEasternArabicNumerals(50)}–
                      {toEasternArabicNumerals(75)} كلمة
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>استراتيجية الفهم:</span>
                    <span className="text-slate-800">أسئلة QAR الثلاثية</span>
                  </div>
                </div>
              </div>
              <Link
                href="/reading/level/level-1"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-xs font-black text-white shadow-[0_12px_22px_-10px_rgba(5,150,105,0.7)] transition hover:-translate-y-0.5 hover:bg-emerald-700 sm:text-sm"
              >
                <span>دخول قصص المستوى</span>
                <span aria-hidden="true" className="text-base leading-none">
                  ←
                </span>
              </Link>
            </div>
          </div>

          {/* ── Level 2: Active ── */}
          <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_24px_48px_-24px_rgba(5,150,105,0.35)] transition-all duration-300 hover:border-teal-300 hover:shadow-[0_32px_60px_-24px_rgba(20,184,166,0.35)] hover:-translate-y-1">
            {/* Pastel art header */}
            <div
              className="relative flex h-40 w-full flex-col justify-between overflow-hidden rounded-t-[32px] px-5 pt-4 pb-8"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, #CCFBF1, #E2EEF6)",
              }}
            >
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500 px-3.5 py-1 text-xs font-black text-white shadow-xs">
                  المستوى الثاني
                </span>
                <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-slate-700 shadow-2xs">
                  <span>{`${toEasternArabicNumerals(READING_LEVEL_2.stories.length)} دورة قصة`}</span>
                </div>
              </div>
              <div className="relative z-10 flex flex-1 items-center justify-center pt-2 text-4xl">
                📘
              </div>
            </div>

            {/* Curved-lip body */}
            <div className="home-card-lip relative flex flex-1 flex-col justify-between bg-white px-6 pt-1 pb-6">
              <div>
                <h3 className="mb-1.5 text-xl font-black text-teal-950">
                  {READING_LEVEL_2.titleAr}
                </h3>
                <p className="mb-1 text-sm font-bold text-teal-700">
                  {READING_LEVEL_2.subtitleAr}
                </p>
                <p className="mb-4 line-clamp-2 text-xs leading-relaxed font-semibold text-slate-600">
                  {READING_LEVEL_2.descriptionAr}
                </p>
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-5 text-xs font-bold text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>طول النصوص:</span>
                    <span className="text-slate-800">
                      {toEasternArabicNumerals(
                        READING_LEVEL_2.targetWordCount.min
                      )}
                      –
                      {toEasternArabicNumerals(
                        READING_LEVEL_2.targetWordCount.max
                      )}{" "}
                      كلمة
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>التشكيل:</span>
                    <span className="text-slate-800">تشكيل جزئي متدرج</span>
                  </div>
                </div>
              </div>
              <Link
                href="/reading/level/level-2"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-xs font-black text-white shadow-[0_12px_22px_-10px_rgba(20,184,166,0.7)] transition hover:-translate-y-0.5 hover:bg-teal-700 sm:text-sm"
              >
                <span>دخول قصص المستوى</span>
                <span aria-hidden="true" className="text-base leading-none">
                  ←
                </span>
              </Link>
            </div>
          </div>

          {/* ── Level 3: Preview ── */}
          <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/70 opacity-80 shadow-[0_16px_32px_-16px_rgba(30,60,100,0.15)]">
            {/* Pastel art header */}
            <div
              className="relative flex h-40 w-full flex-col justify-between overflow-hidden rounded-t-[32px] px-5 pt-4 pb-8"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, #F1F5F9, #E2EEF6)",
              }}
            >
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-400 px-3.5 py-1 text-xs font-black text-white shadow-xs">
                  المستوى الثالث
                </span>
                <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-slate-500 shadow-2xs">
                  <span>{`${toEasternArabicNumerals(12)} دورة قصة`}</span>
                </div>
              </div>
              <div className="relative z-10 flex flex-1 items-center justify-center pt-2 text-4xl opacity-50">
                📙
              </div>
            </div>

            {/* Curved-lip body */}
            <div className="home-card-lip relative flex flex-1 flex-col justify-between bg-white/80 px-6 pt-1 pb-6">
              <div>
                <h3 className="mb-1.5 text-xl font-black text-slate-700">
                  المستوى الثالث
                </h3>
                <p className="mb-1 text-sm font-bold text-slate-500">
                  النصوص الوصفية والاستنتاج المركب
                </p>
                <p className="mb-4 text-xs leading-relaxed font-semibold text-slate-400">
                  قراءة نصوص متنوعة ({toEasternArabicNumerals(100)}–
                  {toEasternArabicNumerals(130)} كلمة) تعتمد على استخلاص الأفكار
                  الرئيسة والتعبير البديل.
                </p>
              </div>
              <button
                disabled
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-100 px-5 py-3 text-xs font-black text-slate-400 cursor-not-allowed sm:text-sm"
              >
                <span>⏳ قيد الإعداد المنهجي</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
