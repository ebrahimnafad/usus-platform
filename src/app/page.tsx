import React from "react";
import Link from "next/link";
import { HomeDomainCards } from "@/components/home/HomeDomainCards";

export default function HomePage(): React.ReactElement {
  return (
    <div
      dir="rtl"
      lang="ar"
      className="home-sky-bg min-h-screen text-slate-900 flex flex-col justify-between"
    >
      {/* Glassmorphic Topbar */}
      <div className="sticky top-0 z-40 border-b border-slate-900/10 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-black text-slate-900"
          >
            <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 text-lg text-white shadow-sm">
              📚
            </span>
            <span>أُسُس</span>
          </Link>

          <nav
            aria-label="التنقل الرئيسي"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold"
          >
            <Link
              href="/math"
              className="rounded-full px-3.5 py-1.5 text-slate-600 transition hover:bg-indigo-500/10 hover:text-indigo-700"
            >
              الرياضيات
            </Link>
            <Link
              href="/reading"
              className="rounded-full px-3.5 py-1.5 text-slate-600 transition hover:bg-emerald-500/10 hover:text-emerald-700"
            >
              الفهم القرائي
            </Link>
          </nav>
        </div>
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">
        {/* Hero Header */}
        <header className="mb-10 text-center sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold text-slate-700 shadow-sm">
            <span aria-hidden="true">✨</span>
            <span>منصة أُسُس التعليمية</span>
          </div>
          <h1 className="mb-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            ماذا نتعلّم{" "}
            <span className="bg-gradient-to-l from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              اليوم
            </span>
            ؟
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            منصة عربية متكاملة لتمكين المعلمين والطلاب في الرياضيات وبناء مهارات
            الفهم القرائي وفق أحدث الأساليب التربوية
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <div className="min-w-[116px] rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-2.5 text-center shadow-xs">
              <b className="block text-lg font-black text-indigo-700">٦</b>
              <span className="text-xs font-semibold text-slate-500">
                صفوف دراسية
              </span>
            </div>
            <div className="min-w-[116px] rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-2.5 text-center shadow-xs">
              <b className="block text-lg font-black text-emerald-700">٣</b>
              <span className="text-xs font-semibold text-slate-500">
                مستويات قرائية
              </span>
            </div>
            <div className="min-w-[116px] rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-2.5 text-center shadow-xs">
              <b className="block text-lg font-black text-amber-600">١٠٠٪</b>
              <span className="text-xs font-semibold text-slate-500">
                طباعة نظيفة
              </span>
            </div>
          </div>
        </header>

        {/* Domain Cards Grid */}
        <HomeDomainCards />
      </main>

      {/* Glassmorphic Footer */}
      <footer className="w-full border-t border-slate-900/10 bg-white/70 py-5 text-center text-xs font-semibold text-slate-600 backdrop-blur-sm">
        أُسُس — منصة تعليمية للمرحلة التأسيسية
      </footer>
    </div>
  );
}
