import React from "react";
import Link from "next/link";
import type { ReadingLevel, ReadingStory } from "@/domain/reading-types";
import TeacherShieldDrawer from "../TeacherShieldDrawer";
import PrintableReadingSheet from "../PrintableReadingSheet";

interface FreeReadingNookProps {
  level: ReadingLevel;
  story: ReadingStory;
  nextStoryNumber: number | null;
  shieldOpen: boolean;
  onSetShieldOpen: (open: boolean) => void;
}

export default function FreeReadingNook({
  level,
  story,
  nextStoryNumber,
  shieldOpen,
  onSetShieldOpen,
}: FreeReadingNookProps) {
  return (
    <div className="min-h-screen bg-[#fcf9f2] text-slate-900 pb-24" dir="rtl">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#fcf9f2]/95 backdrop-blur border-b border-amber-200/80 px-4 sm:px-8 py-3 no-print">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none"
              title="العودة إلى بوابة أُسُس"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-600 flex items-center justify-center text-white font-extrabold shadow-sm group-hover:bg-amber-700 transition">
                أُ
              </div>
              <span className="font-extrabold text-lg text-slate-800">
                أُسُس
              </span>
            </Link>
            <span className="text-amber-300 font-bold">/</span>
            <nav className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-900/60">
              <Link href="/" className="hover:text-amber-900 transition">
                الرئيسية
              </Link>
              <span className="text-amber-300">›</span>
              <Link href="/reading" className="hover:text-amber-900 transition">
                القراءة
              </Link>
              <span className="text-amber-300">›</span>
              <Link
                href={`/reading/level/${level.id}`}
                className="hover:text-amber-900 transition"
              >
                {level.titleAr}
              </Link>
              <span className="text-amber-300">›</span>
              <span className="text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-lg border border-amber-300">
                🌟 ركن القراءة الهادئة
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSetShieldOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold text-xs transition border border-amber-300 shadow-2xs"
            >
              <span>👩‍🏫</span>
              <span>درع المعلم</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 font-extrabold text-xs transition border border-amber-200"
              title="طباعة ورقة العمل"
            >
              <span>🖨️</span>
              <span>طباعة ورقة العمل</span>
            </button>
          </div>
        </div>
      </header>

      {/* Reading Nook Reading Surface */}
      <main className="max-w-3xl mx-auto px-4 sm:px-8 pt-10 text-center">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-950 text-xs font-black border border-amber-300 mb-3">
            <span>🌟</span>
            <span>ركن القراءة الهادئة</span>
          </span>
          <p className="text-xs text-amber-800/80 font-bold">
            جلسة استمتاع أدبي حر للمتعة — لا أسئلة، ولا تدريبات، ولا مقاطعات
          </p>
        </div>

        <article className="bg-white/90 border-2 border-amber-200/90 rounded-3xl p-8 sm:p-14 shadow-sm text-center relative overflow-hidden">
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
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm transition shadow-sm"
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
