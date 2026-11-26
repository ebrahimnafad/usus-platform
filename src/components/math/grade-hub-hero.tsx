"use client";

import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ArrowRightIcon } from "@/components/studio/icons";
import { formatEasternNumber } from "@/lib/numerals";

export function GradeHubHero(): React.ReactElement {
  return (
    <>
      {/* Glassmorphic Topbar matching Home */}
      <div className="sticky top-0 z-40 border-b border-slate-900/10 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-lg font-black text-slate-900 transition hover:opacity-85"
              title="العودة إلى بوابة أُسُس"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 text-base text-white shadow-sm">
                📚
              </span>
              <span>أُسُس</span>
            </Link>
            <span className="font-bold text-slate-300">/</span>
            <Breadcrumbs
              segments={[
                { label: "الرئيسية", href: "/" },
                { label: "الرياضيات" },
              ]}
              listClassName="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500"
              activeItemClassName="text-indigo-700 font-extrabold"
              linkClassName="hover:text-slate-900 transition"
            />
          </div>

          <nav
            aria-label="التنقل السريع"
            className="flex items-center gap-2 text-xs font-bold"
          >
            <Link
              href="/reading"
              className="rounded-full px-3.5 py-1.5 text-slate-600 transition hover:bg-emerald-500/10 hover:text-emerald-700"
            >
              الفهم القرائي
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

      {/* Airy Hero matching Home */}
      <header className="mx-auto max-w-4xl px-4 pt-9 pb-6 text-center sm:pt-12 sm:pb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-extrabold text-indigo-700 shadow-sm">
          <span aria-hidden="true">✨</span>
          <span>استوديو المعلم التفاعلي</span>
          <span className="text-indigo-300">•</span>
          <span>{formatEasternNumber(810)} درساً معيارياً</span>
        </div>

        <h1 className="mb-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
          <span className="bg-gradient-to-l from-indigo-600 to-sky-600 bg-clip-text text-transparent">
            استوديو المعلم
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed font-medium text-slate-600 sm:text-base">
          منهج الرياضيات التأسيسي الكامل للصفوف من الروضة حتى الصف الخامس. اختر
          الصف الدراسي لتصفح الوحدات والمعايير، وتوليد أوراق عمل مخصصة ونماذج
          الإجابة بدقة متناهية.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <div className="min-w-[108px] rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-2 text-center shadow-xs">
            <b className="block text-base font-black text-indigo-700">
              {formatEasternNumber(6)}
            </b>
            <span className="text-[11px] font-semibold text-slate-500">
              صفوف دراسية
            </span>
          </div>
          <div className="min-w-[108px] rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-2 text-center shadow-xs">
            <b className="block text-base font-black text-sky-700">
              {formatEasternNumber(72)}
            </b>
            <span className="text-[11px] font-semibold text-slate-500">
              وحدة تعليمية
            </span>
          </div>
          <div className="min-w-[108px] rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-2 text-center shadow-xs">
            <b className="block text-base font-black text-emerald-700">
              {formatEasternNumber(810)}
            </b>
            <span className="text-[11px] font-semibold text-slate-500">
              درساً معيارياً
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

export default GradeHubHero;
