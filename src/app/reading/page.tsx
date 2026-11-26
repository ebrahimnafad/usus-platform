import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
} from "@/components/studio/icons";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import {
  READING_LEVEL_1,
  READING_LEVEL_2,
  READING_LEVEL_3,
} from "@/curriculum/reading-catalog";

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
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-900/10 bg-white px-3.5 py-1.5 text-slate-700 shadow-2xs transition hover:bg-slate-50"
            >
              <ArrowRightIcon size={14} />
              <span>الرئيسية</span>
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
          <span>{formatEasternNumber(36)} قصة تفاعلية</span>
        </div>

        <h1 className="mb-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
          <span className="bg-gradient-to-l from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            نادي القراءة
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed font-medium text-slate-600 sm:text-base">
          رحلة قرائية متدرّجة تنقل الطفل خطوةً بخطوة من التهجئة والطلاقة إلى فهم
          المعنى والتعبير السليم.
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
              {formatEasternNumber(36)}
            </b>
            <span className="text-[11px] font-semibold text-slate-500">
              قصة تفاعلية
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
        {/* ── Diagnostic Utility Strip (distinct from Level Cards) ── */}
        <section
          aria-label="أداة التشخيص وتحديد المستوى"
          className="relative mb-10 overflow-hidden rounded-[28px] border border-emerald-700/40 bg-gradient-to-l from-emerald-950 via-emerald-900 to-teal-900 p-6 text-white shadow-[0_22px_48px_-22px_rgba(6,78,59,0.6)] sm:p-8"
        >
          {/* Subtle decorative radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -start-24 size-64 rounded-full bg-emerald-400/15 blur-3xl"
          />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-3.5 py-1 text-xs font-extrabold text-emerald-100">
                <span aria-hidden="true">🧭</span>
                <span>من أين يبدأ طفلك؟</span>
              </div>

              <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                اختيار مستوى القراءة المناسب
              </h2>

              <p className="text-sm leading-relaxed font-medium text-emerald-100/85">
                {toEasternArabicNumerals(6)} أسئلة سريعة تساعد المعلّم وولي
                الأمر على معرفة مستوى الطفل في القراءة والفهم، واختيار البداية
                الأنسب له.
              </p>

              {/* Compact 3-step convenience pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold text-emerald-100/90">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
                  <span>{toEasternArabicNumerals(1)}.</span>
                  <span>{toEasternArabicNumerals(6)} أسئلة سريعة</span>
                </span>
                <ChevronLeftIcon
                  size={13}
                  className="text-emerald-400/70"
                  aria-hidden="true"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
                  <span>{toEasternArabicNumerals(2)}.</span>
                  <span>توصية فورية بالمستوى</span>
                </span>
                <ChevronLeftIcon
                  size={13}
                  className="text-emerald-400/70"
                  aria-hidden="true"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
                  <span>{toEasternArabicNumerals(3)}.</span>
                  <span>انتقال مباشر للقصص</span>
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-stretch gap-2 sm:items-start lg:items-end">
              <Link
                href="/reading/diagnostic"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-black text-emerald-950 shadow-[0_14px_28px_-12px_rgba(0,0,0,0.45)] transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                <span>ابدأ تحديد المستوى</span>
                <ArrowLeftIcon size={16} />
              </Link>
              <span className="text-center text-[11px] font-semibold text-emerald-200/80 lg:px-2">
                دقيقتان فقط • خطوة اختيارية قبل البدء
              </span>
            </div>
          </div>
        </section>

        {/* ── Levels Grid ── */}
        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-900">
            مستويات نادي القراءة والفهم
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            اختر المستوى المناسب لبداية طفلك، وتدرّج معه في القراءة والفهم
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
                  <span>{`${toEasternArabicNumerals(12)} قصة`}</span>
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
                <span>تصفّح القصص</span>
                <ArrowLeftIcon size={16} />
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
                  <span>{`${toEasternArabicNumerals(READING_LEVEL_2.stories.length)} قصة`}</span>
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
                <span>تصفّح القصص</span>
                <ArrowLeftIcon size={16} />
              </Link>
            </div>
          </div>

          {/* ── Level 3: Active ── */}
          <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_24px_48px_-24px_rgba(5,150,105,0.35)] transition-all duration-300 hover:border-amber-300 hover:shadow-[0_32px_60px_-24px_rgba(217,119,6,0.28)] hover:-translate-y-1">
            {/* Pastel art header */}
            <div
              className="relative flex h-40 w-full flex-col justify-between overflow-hidden rounded-t-[32px] px-5 pt-4 pb-8"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, #FEF3C7, #E2EEF6)",
              }}
            >
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3.5 py-1 text-xs font-black text-white shadow-xs">
                  المستوى الثالث
                </span>
                <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-slate-700 shadow-2xs">
                  <span>{`${toEasternArabicNumerals(READING_LEVEL_3.stories.length)} قصة`}</span>
                </div>
              </div>
              <div className="relative z-10 flex flex-1 items-center justify-center pt-2 text-4xl">
                📙
              </div>
            </div>

            {/* Curved-lip body */}
            <div className="home-card-lip relative flex flex-1 flex-col justify-between bg-white px-6 pt-1 pb-6">
              <div>
                <h3 className="mb-1.5 text-xl font-black text-amber-950">
                  {READING_LEVEL_3.titleAr}
                </h3>
                <p className="mb-1 text-sm font-bold text-amber-700">
                  {READING_LEVEL_3.subtitleAr}
                </p>
                <p className="mb-4 line-clamp-2 text-xs leading-relaxed font-semibold text-slate-600">
                  {READING_LEVEL_3.descriptionAr}
                </p>
                <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-5 text-xs font-bold text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>طول النصوص:</span>
                    <span className="text-slate-800">
                      {toEasternArabicNumerals(
                        READING_LEVEL_3.targetWordCount.min
                      )}
                      –
                      {toEasternArabicNumerals(
                        READING_LEVEL_3.targetWordCount.max
                      )}{" "}
                      كلمة
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>التشكيل:</span>
                    <span className="text-slate-800">بلا تشكيل</span>
                  </div>
                </div>
              </div>
              <Link
                href="/reading/level/level-3"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-600 px-5 py-3 text-xs font-black text-white shadow-[0_12px_22px_-10px_rgba(217,119,6,0.7)] transition hover:-translate-y-0.5 hover:bg-amber-700 sm:text-sm"
              >
                <span>تصفّح القصص</span>
                <ArrowLeftIcon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
