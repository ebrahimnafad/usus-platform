"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import type { ReadingLevel, ReadingStory } from "@/domain/reading-types";
import {
  stripTashkeel,
  toPartialTashkeel,
  highlightTextSnippet,
  highlightSightWords,
} from "@/lib/reading-scaffold";
import { toEasternArabicNumerals } from "@/lib/numerals";
import TeacherShieldDrawer from "./TeacherShieldDrawer";
import PrintableReadingSheet from "./PrintableReadingSheet";

interface Props {
  level: ReadingLevel;
  story: ReadingStory;
}

const STATIONS = [
  {
    id: 1,
    name: "اكتشاف المعنى",
    icon: "📖",
    desc: "القراءة الأولى لاستكشاف المعنى العام",
  },
  {
    id: 2,
    name: "الطلاقة",
    icon: "⚡",
    desc: "القراءة الموجّهة وتثبيت الكلمات المستهدفة",
  },
  {
    id: 3,
    name: "الأسئلة والتحليل",
    icon: "🔍",
    desc: "علاقات السؤال والجواب (QAR) وموضع الدليل",
  },
  {
    id: 4,
    name: "معمل النحو",
    icon: "🧩",
    desc: "استقراء القاعدة اللغوية من شواهد النص",
  },
  { id: 5, name: "التعبير", icon: "✍️", desc: "سلم التعبير والإنتاج المتدرج" },
  {
    id: 6,
    name: "المراجعة",
    icon: "🏁",
    desc: "الختام وتأكيد النقل والدرس التالي",
  },
] as const;

export default function StoryCycleRunnerClient({ level, story }: Props) {
  const isFreeReading = story.type === "free_reading";
  const isTransferTest = story.type === "transfer_test";

  const [activeStation, setActiveStation] = useState<number>(1);
  const [tashkeelMode, setTashkeelMode] = useState<"full" | "partial" | "none">(
    isTransferTest ? "full" : "full"
  );
  const [sightWordMode, setSightWordMode] = useState<
    "colored" | "underlined" | "off"
  >(isTransferTest ? "off" : "colored");
  const [activeEvidenceSnippet, setActiveEvidenceSnippet] = useState<
    string | null
  >(null);
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>(
    {}
  );
  const [revealedAnswers, setRevealedAnswers] = useState<
    Record<string, boolean>
  >({});
  const [pinnedExpanded, setPinnedExpanded] = useState<boolean>(false);
  const [shieldOpen, setShieldOpen] = useState<boolean>(false);

  // Compute story text based on active Tashkeel mode
  const displayedStoryText = useMemo(() => {
    if (tashkeelMode === "none") return stripTashkeel(story.text);
    if (tashkeelMode === "partial") return toPartialTashkeel(story.text);
    return story.text;
  }, [story.text, tashkeelMode]);

  // For Station 2: highlight sight words (locked off for transfer tests)
  const station2Html = useMemo(() => {
    if (isTransferTest) return displayedStoryText;
    return highlightSightWords(
      displayedStoryText,
      story.targetSightWords,
      sightWordMode
    );
  }, [
    displayedStoryText,
    story.targetSightWords,
    sightWordMode,
    isTransferTest,
  ]);

  // For pinned story in Stations 3–6: highlight active evidence snippet
  const pinnedStoryHtml = useMemo(() => {
    if (!activeEvidenceSnippet) return displayedStoryText;
    return highlightTextSnippet(displayedStoryText, activeEvidenceSnippet);
  }, [displayedStoryText, activeEvidenceSnippet]);

  const toggleHint = (qId: string) => {
    setRevealedHints((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleAnswer = (qId: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleEvidence = (snippet: string) => {
    setActiveEvidenceSnippet((prev) => (prev === snippet ? null : snippet));
  };

  const nextStoryNumber = story.storyNumber < 12 ? story.storyNumber + 1 : null;

  // RENDER VARIANT 1: FREE READING NOOK (Stories 4 & 10)
  if (isFreeReading) {
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
                <Link
                  href="/reading"
                  className="hover:text-amber-900 transition"
                >
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
                onClick={() => setShieldOpen(true)}
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
          onClose={() => setShieldOpen(false)}
          storyId={story.id}
          storyTitle={story.titleAr ?? story.title}
          teacherGuide={story.teacherGuide}
        />

        {/* Printable A4 Reading Sheet */}
        <PrintableReadingSheet level={level} story={story} />
      </div>
    );
  }

  // RENDER VARIANT 2: STANDARD OR TRANSFER-TEST STORY CYCLE
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24" dir="rtl">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-8 py-3 no-print">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group focus:outline-none"
              title="العودة إلى بوابة أُسُس"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold shadow-sm transition ${
                  isTransferTest
                    ? "bg-indigo-600 group-hover:bg-indigo-700"
                    : "bg-emerald-600 group-hover:bg-emerald-700"
                }`}
              >
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
              <Link
                href="/reading"
                className="hover:text-emerald-700 transition"
              >
                القراءة
              </Link>
              <span className="text-slate-300">›</span>
              <Link
                href={`/reading/level/${level.id}`}
                className="hover:text-emerald-700 transition"
              >
                {level.titleAr}
              </Link>
              <span className="text-slate-300">›</span>
              <span
                className={`px-2 py-0.5 rounded-lg border max-w-[140px] sm:max-w-none truncate ${
                  isTransferTest
                    ? "bg-indigo-50 text-indigo-900 border-indigo-200 font-black"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}
              >
                {story.titleAr ?? story.title}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShieldOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition border border-slate-200"
            >
              <span>👩‍🏫</span>
              <span>درع المعلم</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition"
              title="طباعة ورقة العمل"
            >
              <span>🖨️</span>
              <span>طباعة ورقة العمل</span>
            </button>
            <Link
              href={`/reading/level/${level.id}`}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-lg transition"
            >
              ← شبكة القصص
            </Link>
          </div>
        </div>
      </header>

      {/* Transfer Test Notice Banner */}
      {isTransferTest && (
        <section className="bg-indigo-900 text-white px-4 sm:px-8 py-3 no-print">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-700 text-indigo-100 font-black">
                🎯 اختبار النقل
              </span>
              <span>
                قياس الأداء المستقل: يُقرأ النص دون مساعدات أو تلوين لقياس
                الاستيعاب الحقيقي
              </span>
            </div>
            <span className="text-indigo-200 hidden sm:inline">
              الدعامات مقفلة للملاحظة الحرة
            </span>
          </div>
        </section>
      )}

      {/* 6-Station Stepper */}
      <section className="bg-white border-b border-slate-200 py-3 px-4 sm:px-8 no-print shadow-2xs">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="flex items-center justify-between min-w-[620px] gap-2">
            {STATIONS.map((station) => {
              const isActive = activeStation === station.id;
              const isPast = activeStation > station.id;

              return (
                <button
                  key={station.id}
                  onClick={() => setActiveStation(station.id)}
                  className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl text-right transition border ${
                    isActive
                      ? isTransferTest
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                        : "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : isPast
                        ? "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-white text-slate-900"
                        : isPast
                          ? "bg-emerald-200 text-emerald-900"
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {toEasternArabicNumerals(station.id)}
                  </span>
                  <div className="min-w-0">
                    <span className="block text-xs font-extrabold truncate">
                      {station.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 pt-6">
        {/* Pinned Condensed Story for Stations 3–6 */}
        {activeStation >= 3 && (
          <section className="mb-6 bg-white border-2 border-emerald-300 rounded-2xl p-5 shadow-sm transition">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">📌</span>
                <span className="text-xs font-black text-emerald-900">
                  نص القصة المرجعي ({story.titleAr ?? story.title})
                </span>
                {activeEvidenceSnippet && (
                  <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                    تم إبراز موضع الدليل 🔍
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {activeEvidenceSnippet && (
                  <button
                    onClick={() => setActiveEvidenceSnippet(null)}
                    className="text-xs text-amber-800 hover:underline font-bold"
                  >
                    إلغاء الإبراز ✕
                  </button>
                )}
                <button
                  onClick={() => setPinnedExpanded(!pinnedExpanded)}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-extrabold"
                >
                  {pinnedExpanded ? "تصغير النص ▲" : "عرض النص كاملاً ▼"}
                </button>
              </div>
            </div>

            <div
              className={`font-serif text-lg leading-loose text-slate-800 transition-all ${
                pinnedExpanded
                  ? "max-h-none"
                  : "max-h-24 overflow-hidden relative"
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: pinnedStoryHtml }} />
              {!pinnedExpanded && (
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>
          </section>
        )}

        {/* Station 1: First Read (اكتشاف المعنى) */}
        {activeStation === 1 && (
          <div className="space-y-6">
            {/* Scaffold Toolbar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-600">
                  درجة التشكيل:
                </span>
                {isTransferTest ? (
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                    تشكيل قياسي مقفل لاختبار النقل
                  </span>
                ) : (
                  <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
                    {(["full", "partial", "none"] as const).map((mode) => {
                      const label =
                        mode === "full"
                          ? "تشكيل كامل"
                          : mode === "partial"
                            ? "تشكيل جزئي"
                            : "بدون تشكيل";
                      return (
                        <button
                          key={mode}
                          onClick={() => setTashkeelMode(mode)}
                          className={`px-3 py-1 rounded-lg transition ${
                            tashkeelMode === mode
                              ? "bg-white text-emerald-800 font-black shadow-xs"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="text-xs font-bold text-slate-500">
                <span>طول النص: </span>
                <span className="text-slate-800 font-black">
                  {toEasternArabicNumerals(story.wordCount)} كلمة
                </span>
              </div>
            </div>

            {/* Main Reading Surface */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black mb-6">
                <span>📖</span>
                <span>القصة {toEasternArabicNumerals(story.storyNumber)}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 font-serif">
                {story.titleAr ?? story.title}
              </h1>
              <div className="font-serif text-2xl sm:text-3xl leading-[2.4] text-slate-800 text-justify max-w-3xl mx-auto">
                {displayedStoryText}
              </div>
            </div>

            {/* Teacher Guidance Note */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div className="text-xs text-emerald-900 leading-relaxed font-medium">
                <strong className="font-black block mb-0.5">
                  توجيه المحطة الأولى:
                </strong>
                اقرأ القصة أولاً كنموذج صوتي هادئ أو دع الطفل يقرأها بصوته
                لاستكشاف المعنى العام. لا تقاطع الطفل مطلقاً في هذه القراءة
                الأولى لتصحيح النحو أو الضبط.
              </div>
            </div>
          </div>
        )}

        {/* Station 2: Guided Read (الطلاقة) */}
        {activeStation === 2 && (
          <div className="space-y-6">
            {/* Scaffold Toolbar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-slate-600">
                  إبراز الكلمات المستهدفة:
                </span>
                {isTransferTest ? (
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                    التلوين مقفل لاختبار النقل المستقل
                  </span>
                ) : (
                  <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
                    {(["colored", "underlined", "off"] as const).map((mode) => {
                      const label =
                        mode === "colored"
                          ? "تلوين"
                          : mode === "underlined"
                            ? "تسطير"
                            : "إيقاف";
                      return (
                        <button
                          key={mode}
                          onClick={() => setSightWordMode(mode)}
                          className={`px-3 py-1 rounded-lg transition ${
                            sightWordMode === mode
                              ? "bg-white text-emerald-800 font-black shadow-xs"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Sight Words Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-500">
                  الكلمات:
                </span>
                {story.targetSightWords.map((word) => (
                  <span
                    key={word}
                    className="px-2 py-0.5 bg-emerald-100 text-emerald-900 text-xs font-extrabold rounded-md border border-emerald-200"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Reading Surface */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
              <h2 className="text-xl font-black text-slate-900 mb-6">
                قراءة موجهة لضبط الطلاقة والتنغيم الصوتي
              </h2>
              <div
                className="font-serif text-2xl sm:text-3xl leading-[2.4] text-slate-800 text-justify max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: station2Html }}
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div className="text-xs text-amber-950 leading-relaxed font-medium">
                <strong className="font-black block mb-0.5">
                  تنبيه تربوي حاسم:
                </strong>
                «الوقف الصحيح ليس خطأً». إذا توقف الطفل عند علامات الترقيم أو
                نهايات الجمل لأخذ نفس أو استيعاب الفكرة، فهذا دليل فهم وليس
                تعثراً قرائياً!
              </div>
            </div>
          </div>
        )}

        {/* Station 3: QAR Questions (الأسئلة والتحليل) */}
        {activeStation === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  أسئلة الفهم القرائي الثلاثية (QAR)
                </h2>
                <p className="text-xs text-slate-500 font-bold mt-0.5">
                  أين تعيش الإجابة؟ (في النص صراحة • بين السطور • في عقلك
                  وخبرتك)
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {story.qarQuestions.map((q, idx) => {
                const isDirect = q.tier === "direct";
                const isInferential = q.tier === "inferential";
                const tierLabel = isDirect
                  ? "مباشر — في النص صراحة"
                  : isInferential
                    ? "استنتاجي — بين السطور"
                    : "إبداعي — أنت والنص معاً";

                const tierBadgeBg = isDirect
                  ? "bg-sky-50 text-sky-800 border-sky-200"
                  : isInferential
                    ? "bg-violet-50 text-violet-800 border-violet-200"
                    : "bg-amber-50 text-amber-900 border-amber-200";

                const isEvidenceActive =
                  q.textEvidenceSnippet &&
                  activeEvidenceSnippet === q.textEvidenceSnippet;

                return (
                  <div
                    key={q.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-black flex items-center justify-center">
                          {toEasternArabicNumerals(idx + 1)}
                        </span>
                        <span
                          className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg border ${tierBadgeBg}`}
                        >
                          {tierLabel}
                        </span>
                      </div>

                      {/* Evidence Button */}
                      {q.textEvidenceSnippet && !isTransferTest && (
                        <button
                          onClick={() => toggleEvidence(q.textEvidenceSnippet)}
                          className={`text-xs font-extrabold px-3 py-1 rounded-xl transition border ${
                            isEvidenceActive
                              ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                              : "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100"
                          }`}
                        >
                          🔍 أين الدليل في النص؟
                        </button>
                      )}
                    </div>

                    <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                      {q.prompt ?? q.question}
                    </p>

                    {/* Hint / Sample Answer Controls */}
                    <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        {q.hint && !isTransferTest && (
                          <button
                            onClick={() => toggleHint(q.id)}
                            className="text-slate-500 hover:text-slate-800 font-bold"
                          >
                            {revealedHints[q.id]
                              ? "إخفاء التلميح ▲"
                              : "💡 تلميح للمتعلم ▼"}
                          </button>
                        )}
                        <button
                          onClick={() => toggleAnswer(q.id)}
                          className="text-emerald-700 hover:text-emerald-900 font-extrabold"
                        >
                          {revealedAnswers[q.id]
                            ? "إخفاء الإجابة النموذجية ▲"
                            : "عرض الإجابة النموذجية ▼"}
                        </button>
                      </div>
                    </div>

                    {revealedHints[q.id] && q.hint && (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                        <strong className="font-bold">تلميح: </strong> {q.hint}
                      </div>
                    )}

                    {revealedAnswers[q.id] && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-bold">
                        <span>الإجابة المقترحة: </span> {q.sampleAnswer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Station 4: Inductive Grammar Lab (معمل النحو) */}
        {activeStation === 4 && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                <span>🧩</span>
                <span>معمل اللغة الاستقرائي</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                اكتشف القاعدة اللغوية من شواهد القصة
              </h2>

              {story.grammarDiscovery ? (
                <div className="space-y-6">
                  {/* Step 1: Examples */}
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold text-slate-400 block">
                      الخطوة ١: أمثلة من القصة
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {story.grammarDiscovery.examples.map((ex, i) => (
                        <div
                          key={i}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold text-slate-800"
                        >
                          «{ex}»
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Observation */}
                  <div className="space-y-1 bg-amber-50/60 border border-amber-200 rounded-2xl p-4">
                    <span className="text-xs font-extrabold text-amber-800 block">
                      الخطوة ٢: الملاحظة
                    </span>
                    <p className="text-sm font-bold text-amber-950 leading-relaxed">
                      {story.grammarDiscovery.observation}
                    </p>
                  </div>

                  {/* Step 3: Concept Label */}
                  <div className="space-y-1 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                    <span className="text-xs font-extrabold text-emerald-800 block">
                      الخطوة ٣: تسمية المفهوم
                    </span>
                    <p className="text-base font-black text-emerald-950">
                      {story.grammarDiscovery.label}
                    </p>
                  </div>

                  {/* Step 4: Production Prompt */}
                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <span className="text-xs font-extrabold text-slate-500 block">
                      الخطوة ٤: إنتاج جملة مماثلة
                    </span>
                    <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl">
                      <p className="text-sm font-bold text-slate-800 mb-3">
                        {story.grammarDiscovery.productionPrompt}
                      </p>
                      <div className="h-10 border-b-2 border-dotted border-slate-400 flex items-center text-slate-400 text-xs font-medium">
                        اكتب جملتك هنا بخط جميل...
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  هذه الدورة مخصصة للقراءة الحرة ولا تتضمن تمريناً نحوياً.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Station 5: Expression (التعبير والإنتاج) */}
        {activeStation === 5 && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                <span>✍️</span>
                <span>سلم الإنتاج اللغوي</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                التعبير والإنتاج الشفهي والكتابي
              </h2>

              <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2">
                <span className="text-xs font-extrabold text-emerald-900 block">
                  مهمة التعبير لهذه القصة:
                </span>
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {story.expressionPrompt ??
                    "عَبِّرْ بأسلوبك عن أكثر مشهد أعجبك في القصة ولماذا."}
                </p>
              </div>

              {/* Writing Lines Simulator */}
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <span className="text-xs font-bold text-slate-500 block">
                  مساحة الكتابة اليدوية للطفل (أو التسجيل الشفهي):
                </span>
                <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="h-8 border-b-2 border-dotted border-slate-300" />
                  <div className="h-8 border-b-2 border-dotted border-slate-300" />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed">
                <strong className="font-extrabold text-slate-800 block mb-1">
                  قاعدة التقييم التربوي:
                </strong>
                اقبل إجابة الطفل بالعامية أولاً لتثبيت المعنى وشعوره بالنجاح، ثم
                أعد صياغتها بالفصحى بلطف: «ممتاز! معناها كذا، وبالفصحى نقول...».
                لا تجعل عبء الكتابة عائقاً أمام تدفق أفكاره.
              </div>
            </div>
          </div>
        )}

        {/* Station 6: Review & Completion (المراجعة) */}
        {activeStation === 6 && (
          <div className="space-y-6 text-center">
            <div className="bg-white border border-emerald-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                🎉
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                أحسنت! أتممت دورة القصة بنجاح
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                أكملت كافة محطات دورة القصة «{story.titleAr ?? story.title}»؛
                قراءة أولى، وطلاقة موجهة، وتحليل أسئلة الفهم، ومعمل النحو،
                والتعبير.
              </p>

              <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                {nextStoryNumber ? (
                  <Link
                    href={`/reading/level/${level.id}/story/${nextStoryNumber}`}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-sm hover:bg-emerald-700 transition shadow-sm"
                  >
                    الانتقال للقصة التالية (
                    {toEasternArabicNumerals(nextStoryNumber)}) ←
                  </Link>
                ) : (
                  <Link
                    href={`/reading/level/${level.id}`}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-sm hover:bg-emerald-700 transition shadow-sm"
                  >
                    العودة لشبكة قصص المستوى ←
                  </Link>
                )}
                <Link
                  href={`/reading/level/${level.id}`}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm transition"
                >
                  كافة القصص
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Station Navigation Bar */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between no-print">
          <button
            disabled={activeStation <= 1}
            onClick={() => setActiveStation((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2 rounded-xl text-xs font-extrabold transition border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700"
          >
            → المحطة السابقة
          </button>

          <span className="text-xs font-bold text-slate-400">
            المحطة {toEasternArabicNumerals(activeStation)} من{" "}
            {toEasternArabicNumerals(6)}
          </span>

          <button
            disabled={activeStation >= 6}
            onClick={() => setActiveStation((prev) => Math.min(6, prev + 1))}
            className="px-5 py-2 rounded-xl text-xs font-extrabold transition bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-xs"
          >
            المحطة التالية ←
          </button>
        </div>
      </main>

      {/* Teacher Shield Collapsible Right Drawer */}
      <TeacherShieldDrawer
        isOpen={shieldOpen}
        onClose={() => setShieldOpen(false)}
        storyId={story.id}
        storyTitle={story.titleAr ?? story.title}
        teacherGuide={story.teacherGuide}
        isTransferTest={isTransferTest}
      />

      {/* Printable A4 Reading Sheet */}
      <PrintableReadingSheet level={level} story={story} />
    </div>
  );
}
