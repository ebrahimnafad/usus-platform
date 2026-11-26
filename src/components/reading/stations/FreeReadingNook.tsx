import React from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { ReadingLevel, ReadingStory } from "@/domain/reading-types";
import TeacherShieldDrawer from "../TeacherShieldDrawer";
import PrintableReadingSheet from "../PrintableReadingSheet";

interface FreeReadingNookProps {
  level: ReadingLevel;
  story: ReadingStory;
  nextStoryNumber: number | null;
  shieldOpen: boolean;
  onSetShieldOpen: (open: boolean) => void;
  onOpenPrintModal?: () => void;
}

export default function FreeReadingNook({
  level,
  story,
  nextStoryNumber,
  shieldOpen,
  onSetShieldOpen,
  onOpenPrintModal,
}: FreeReadingNookProps) {
  return (
    <div
      className="home-sky-bg min-h-screen text-slate-900 pb-24"
      dir="rtl"
      lang="ar"
    >
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 relative bg-white/80 backdrop-blur-md border-b border-slate-900/10 px-4 sm:px-6 py-3 shadow-[0_6px_24px_-14px_rgba(30,60,100,0.18)] no-print">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-amber-500 to-orange-400"
        />
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 group focus:outline-none"
              title="العودة إلى بوابة أُسُس"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 text-base text-white shadow-xs">
                📚
              </span>
              <span className="font-black text-lg text-slate-900">أُسُس</span>
            </Link>
            <span className="text-slate-300 font-bold">/</span>
            <Breadcrumbs
              segments={[
                { label: "الرئيسية", href: "/" },
                { label: "القراءة", href: "/reading" },
                { label: level.titleAr, href: `/reading/level/${level.id}` },
                { label: "🌟 ركن القراءة الهادئة" },
              ]}
              listClassName="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500"
              activeItemClassName="text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80 font-bold"
              linkClassName="hover:text-amber-900 transition"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => onSetShieldOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-950 font-extrabold text-xs transition border border-amber-200/80 shadow-2xs"
              title="درع المعلم"
              aria-label="درع المعلم"
            >
              <span>👩‍🏫</span>
              <span className="hidden sm:inline">درع المعلم</span>
            </button>
            <button
              type="button"
              data-reading-print-trigger="true"
              onClick={() =>
                onOpenPrintModal ? onOpenPrintModal() : window.print()
              }
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition shadow-[0_8px_18px_-8px_rgba(5,150,105,0.65)]"
              title="طباعة ورقة العمل"
              aria-label="طباعة ورقة العمل"
            >
              <span>🖨️</span>
              <span className="hidden sm:inline">طباعة ورقة العمل</span>
            </button>
          </div>
        </div>
      </header>

      {/* Reading Nook Reading Surface */}
      <main className="max-w-3xl mx-auto px-4 sm:px-8 pt-10 text-center">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 text-amber-900 text-xs font-black border border-amber-200/80 shadow-xs mb-3">
            <span>🌟</span>
            <span>ركن القراءة الهادئة</span>
          </span>
          <p className="text-xs text-slate-600 font-bold">
            جلسة استمتاع أدبي حر للمتعة — لا أسئلة، ولا تدريبات، ولا مقاطعات
          </p>
        </div>

        <article className="bg-white/95 border border-white/90 rounded-[32px] p-8 sm:p-14 shadow-[0_24px_56px_-22px_rgba(180,83,9,0.2)] text-center relative overflow-hidden">
          <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
            📖
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-10 font-serif">
            {story.titleAr ?? story.title}
          </h1>
          <div className="font-serif text-2xl sm:text-3xl leading-[2.5] text-slate-800 text-justify max-w-2xl mx-auto">
            {story.text}
          </div>

          <div className="mt-12 pt-8 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-center gap-3 no-print">
            <Link
              href={
                nextStoryNumber
                  ? `/reading/level/${level.id}/story/${nextStoryNumber}`
                  : `/reading/level/${level.id}`
              }
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-black text-sm transition shadow-[0_12px_22px_-10px_rgba(217,119,6,0.65)]"
            >
              أتممت القراءة 🎉
            </Link>
            <Link
              href={`/reading/level/${level.id}`}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold text-sm transition"
            >
              العودة لشبكة القصص
            </Link>
          </div>
        </article>
      </main>

      <TeacherShieldDrawer
        isOpen={shieldOpen}
        onClose={() => onSetShieldOpen(false)}
        storyId={story.id}
        storyTitle={story.titleAr ?? story.title}
        teacherGuide={story.teacherGuide}
      />

      {/* Printable A4 Reading Sheet */}
      <PrintableReadingSheet level={level} story={story} />
    </div>
  );
}
