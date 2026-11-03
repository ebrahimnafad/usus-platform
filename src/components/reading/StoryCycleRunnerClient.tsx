"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import type { ReadingLevel, ReadingStory } from "@/domain/reading-types";
import {
  transformTashkeel,
  type TashkeelMode,
  highlightTextSnippet,
  highlightSightWords,
} from "@/lib/reading-scaffold";
import { toEasternArabicNumerals } from "@/lib/numerals";
import TeacherShieldDrawer from "./TeacherShieldDrawer";
import PrintableReadingSheet from "./PrintableReadingSheet";
import FreeReadingNook from "./stations/FreeReadingNook";
import PinnedStorySnippet from "./stations/PinnedStorySnippet";
import StationFirstRead from "./stations/StationFirstRead";
import StationGuidedRead from "./stations/StationGuidedRead";
import StationQarQuestions from "./stations/StationQarQuestions";
import StationGrammarLab from "./stations/StationGrammarLab";
import StationExpression from "./stations/StationExpression";
import StationReview from "./stations/StationReview";

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
  const [tashkeelMode, setTashkeelMode] = useState<TashkeelMode>("full");
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
  const [shieldOpen, setShieldOpen] = useState<boolean>(false);
  const [includeStoryText, setIncludeStoryText] = useState<boolean>(true);

  // Compute story text based on active Tashkeel mode
  const displayedStoryText = useMemo(() => {
    return transformTashkeel(story.text, tashkeelMode);
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
      <FreeReadingNook
        level={level}
        story={story}
        nextStoryNumber={nextStoryNumber}
        shieldOpen={shieldOpen}
        onSetShieldOpen={setShieldOpen}
      />
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
            <label className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeStoryText}
                onChange={(e) => setIncludeStoryText(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span>مع نص القصة</span>
            </label>
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

      <main className="max-w-5xl mx-auto px-4 sm:px-8 pt-6 no-print">
        {/* Pinned Condensed Story for Stations 3–6 */}
        {activeStation >= 3 && (
          <PinnedStorySnippet
            title={story.titleAr ?? story.title}
            storyHtml={pinnedStoryHtml}
            activeEvidenceSnippet={activeEvidenceSnippet}
            onClearEvidence={() => setActiveEvidenceSnippet(null)}
          />
        )}

        {/* Station 1: First Read (اكتشاف المعنى) */}
        {activeStation === 1 && (
          <StationFirstRead
            story={story}
            displayedStoryText={displayedStoryText}
            isTransferTest={isTransferTest}
            tashkeelMode={tashkeelMode}
            onSetTashkeelMode={setTashkeelMode}
          />
        )}

        {/* Station 2: Guided Read (الطلاقة) */}
        {activeStation === 2 && (
          <StationGuidedRead
            story={story}
            station2Html={station2Html}
            isTransferTest={isTransferTest}
            sightWordMode={sightWordMode}
            onSetSightWordMode={setSightWordMode}
          />
        )}

        {/* Station 3: QAR Questions (الأسئلة والتحليل) */}
        {activeStation === 3 && (
          <StationQarQuestions
            story={story}
            isTransferTest={isTransferTest}
            activeEvidenceSnippet={activeEvidenceSnippet}
            revealedHints={revealedHints}
            revealedAnswers={revealedAnswers}
            onToggleEvidence={toggleEvidence}
            onToggleHint={toggleHint}
            onToggleAnswer={toggleAnswer}
          />
        )}

        {/* Station 4: Inductive Grammar Lab (معمل النحو) */}
        {activeStation === 4 && <StationGrammarLab story={story} />}

        {/* Station 5: Expression (التعبير والإنتاج) */}
        {activeStation === 5 && <StationExpression story={story} />}

        {/* Station 6: Review & Completion (المراجعة) */}
        {activeStation === 6 && (
          <StationReview
            level={level}
            story={story}
            nextStoryNumber={nextStoryNumber}
          />
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
      <PrintableReadingSheet
        level={level}
        story={story}
        tashkeelMode={tashkeelMode}
        includeStoryText={includeStoryText}
      />
    </div>
  );
}
