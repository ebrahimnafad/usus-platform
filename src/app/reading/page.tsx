import React from "react";
import Link from "next/link";
import { toEasternArabicNumerals } from "@/lib/numerals";
import { READING_LEVEL_1 } from "@/curriculum/reading-catalog";

export const metadata = {
  title: "أُسُس — نادي القراءة والفهم القرائي",
  description: "مسار تعليم القراءة والفهم القرائي لما بعد مرحلة التأسيس",
};

export default function ReadingHubPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16" dir="rtl">
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
              <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                القراءة والفهم
              </span>
            </nav>
          </div>
          <Link
            href="/"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
          >
            ← العودة للرئيسية
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        {/* Diagnostic Banner */}
        <section className="mb-10 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-800 text-white p-6 sm:p-8 shadow-md border border-emerald-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-400/30">
              <span>🎯</span>
              <span>تحديد نقطة الانطلاق المناسبة للمتعلم</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold">
              أداة تهيئة نقطة البداية وتشخيص الاستيعاب
            </h2>
            <p className="text-emerald-100/90 text-sm leading-relaxed">
              استبيان استرشادي سريع ومحدد من {toEasternArabicNumerals(6)} أسئلة
              للمربي وولي الأمر لتقييم التوازن بين الطلاقة القرائية والفهم
              السمعي، وتحديد المستوى الأمثل لبدء دورة القصة.
            </p>
          </div>
          <Link
            href="/reading/diagnostic"
            className="shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-emerald-950 font-extrabold text-sm hover:bg-emerald-50 transition shadow-sm"
          >
            <span>بدء الاستبيان التشخيصي</span>
            <span>←</span>
          </Link>
        </section>

        {/* Section Heading */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              مستويات نادي القراءة والفهم
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              مسار منهجي متدرج وفق قاعدة الشرط الواحد لتطوير الفهم القرائي
              المستقل
            </p>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Level 1: Active */}
          <div className="rounded-2xl bg-white border-2 border-emerald-500 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-2 bg-emerald-500" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                  <span>📖</span>
                  <span>المستوى النشط</span>
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {`${toEasternArabicNumerals(12)} دورة قصة`}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                {READING_LEVEL_1.titleAr}
              </h3>
              <p className="text-sm font-bold text-emerald-700 mb-3">
                {READING_LEVEL_1.subtitleAr}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {READING_LEVEL_1.descriptionAr}
              </p>

              <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>طول النصوص:</span>
                  <span className="text-slate-800">
                    {toEasternArabicNumerals(50)}–{toEasternArabicNumerals(75)}{" "}
                    كلمة
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>التركيز النحوي:</span>
                  <span className="text-slate-800">
                    الجملة الفعلية والروابط
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>استراتيجية الفهم:</span>
                  <span className="text-slate-800">
                    أسئلة الفهم الثلاثية QAR
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/reading/level/level-1"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-extrabold text-sm hover:bg-emerald-700 transition shadow-sm"
            >
              <span>دخول قصص المستوى</span>
              <span>←</span>
            </Link>
          </div>

          {/* Level 2: Preview */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 opacity-85 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                  <span>⏳</span>
                  <span>قريباً</span>
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {`${toEasternArabicNumerals(12)} دورة قصة`}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-1">
                المستوى الثاني
              </h3>
              <p className="text-sm font-bold text-slate-500 mb-3">
                التوسع والضمائر والتنويع
              </p>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                توسيع الجمل بالضمائر المتصلة والمستترة والظروف، ونصوص أطول (
                {toEasternArabicNumerals(75)}–{toEasternArabicNumerals(100)}{" "}
                كلمة) مع تعميق الأسئلة الاستنتاجية.
              </p>
            </div>
            <button
              disabled
              className="w-full py-3 px-4 rounded-xl bg-slate-100 text-slate-400 font-extrabold text-xs cursor-not-allowed"
            >
              قيد الإعداد المنهجي
            </button>
          </div>

          {/* Level 3: Preview */}
          <div className="rounded-2xl bg-white border border-slate-200 p-6 opacity-85 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                  <span>⏳</span>
                  <span>قريباً</span>
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {`${toEasternArabicNumerals(12)} دورة قصة`}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 mb-1">
                المستوى الثالث
              </h3>
              <p className="text-sm font-bold text-slate-500 mb-3">
                النصوص الوصفية والاستنتاج المركب
              </p>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                قراءة نصوص متنوعة ({toEasternArabicNumerals(100)}–
                {toEasternArabicNumerals(130)} كلمة) تعتمد على استخلاص الأفكار
                الرئيسة والتعبير البديل.
              </p>
            </div>
            <button
              disabled
              className="w-full py-3 px-4 rounded-xl bg-slate-100 text-slate-400 font-extrabold text-xs cursor-not-allowed"
            >
              قيد الإعداد المنهجي
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
