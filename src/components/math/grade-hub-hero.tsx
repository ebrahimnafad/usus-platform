"use client";

import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { formatEasternNumber } from "@/lib/numerals";

export function GradeHubHero(): React.ReactElement {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-6 sm:p-10 text-white shadow-xl mb-10">
      {/* Subtle decorative background shapes */}
      <div
        className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Navigation Breadcrumb Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-indigo-800/60 pb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-black text-white hover:text-indigo-200 transition"
              title="العودة إلى بوابة أُسُس"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black shadow-xs">
                أُ
              </div>
              <span className="text-base font-extrabold tracking-tight">
                أُسُس
              </span>
            </Link>
            <span className="text-indigo-400/60 font-bold">/</span>
            <Breadcrumbs
              segments={[
                { label: "الرئيسية", href: "/" },
                { label: "الرياضيات" },
              ]}
              listClassName="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-200/80"
              activeItemClassName="text-white font-extrabold"
              linkClassName="hover:text-white transition"
              separator={
                <span
                  className="text-indigo-400/60 font-bold select-none"
                  aria-hidden="true"
                >
                  &gt;
                </span>
              }
            />
          </div>

          <Link
            href="/"
            className="text-xs font-bold text-indigo-200 hover:text-white rounded-lg bg-indigo-800/40 hover:bg-indigo-800/70 border border-indigo-700/50 px-3 py-1.5 transition"
          >
            ← العودة للرئيسية
          </Link>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 text-xs font-extrabold text-indigo-200">
            <span>✨ استوديو المعلم التفاعلي</span>
            <span className="text-indigo-400">•</span>
            <span>{formatEasternNumber(810)} درساً معيارياً</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
            استوديو المعلم
          </h1>

          <p className="text-sm sm:text-base font-medium text-indigo-100/90 leading-relaxed max-w-2xl">
            منهج الرياضيات التأسيسي الكامل للصفوف من الروضة حتى الصف الخامس.
            اختر الصف الدراسي لتصفح الوحدات والمعايير، وتوليد أوراق عمل مخصصة
            ونماذج الإجابة بدقة متناهية.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GradeHubHero;
