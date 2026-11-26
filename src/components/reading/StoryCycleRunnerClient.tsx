"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { ReadingLevel, ReadingStory } from "@/domain/reading-types";
import {
  transformTashkeel,
  getDefaultTashkeelMode,
  type TashkeelMode,
  highlightTextSnippet,
  highlightSightWords,
} from "@/lib/reading-scaffold";
import { toEasternArabicNumerals } from "@/lib/numerals";
import TeacherShieldDrawer from "./TeacherShieldDrawer";
import PrintableReadingSheet from "./PrintableReadingSheet";
import { ReadingPrintModal } from "./ReadingPrintModal";
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
  const [tashkeelMode, setTashkeelMode] = useState<TashkeelMode>(() =>
    getDefaultTashkeelMode(level.levelNumber)
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
  const [shieldOpen, setShieldOpen] = useState<boolean>(false);
  const [includeStoryText, setIncludeStoryText] = useState<boolean>(true);
  const [printModalOpen, setPrintModalOpen] = useState<boolean>(false);
  const [qrOrigin, setQrOrigin] = useState<string | undefined>(undefined);

  useEffect(() => {
    setQrOrigin(window.location.origin);
  }, []);

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

  const getStationToneClass = (
    isActive: boolean,
    isPast: boolean,
    variant: "mobile" | "desktop"
  ) => {
    if (isActive) {
      return isTransferTest
        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
        : "bg-emerald-600 text-white border-emerald-600 shadow-sm";
    }
    if (isPast) {
      return variant === "desktop"
        ? "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
        : "bg-emerald-50 border-emerald-200 hover:bg-emerald-100";
    }
    return variant === "desktop"
      ? "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
      : "bg-slate-100 border-slate-200 hover:bg-slate-200";
  };

  // RENDER VARIANT 1: FREE READING NOOK (Stories 4 & 10)
  if (isFreeReading) {
    return (
      <>
        <FreeReadingNook
          level={level}
          story={story}
          nextStoryNumber={nextStoryNumber}
          shieldOpen={shieldOpen}
          onSetShieldOpen={setShieldOpen}
          onOpenPrintModal={() => setPrintModalOpen(true)}
        />
        <ReadingPrintModal
          isOpen={printModalOpen}
          onClose={() => setPrintModalOpen(false)}
          level={level}
          story={story}
          tashkeelMode={tashkeelMode}
          includeStoryText={includeStoryText}
          onTashkeelChange={setTashkeelMode}
          onIncludeStoryTextChange={setIncludeStoryText}
        />
      </>
    );
  }

  // RENDER VARIANT 2: STANDARD OR TRANSFER-TEST STORY CYCLE
  return (
    <div
      className="home-sky-bg min-h-screen text-slate-900 pb-24 print:pb-0 print:min-h-0 print:bg-white"
      dir="rtl"
      lang="ar"
    >
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 relative bg-white/80 backdrop-blur-md border-b border-slate-900/10 px-4 sm:px-6 py-3 shadow-[0_6px_24px_-14px_rgba(30,60,100,0.18)] no-print">
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l ${
            isTransferTest
              ? "from-indigo-600 to-violet-500"
              : "from-emerald-500 to-teal-500"
          }`}
        />
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 group focus:outline-none"
              title="العودة إلى بوابة أُسُس"
            >
              <span
                className={`grid size-9 place-items-center rounded-xl text-base text-white shadow-xs transition ${
                  isTransferTest
                    ? "bg-gradient-to-br from-indigo-600 to-violet-500"
                    : "bg-gradient-to-br from-emerald-500 to-teal-500"
                }`}
              >
                📚
              </span>
              <span className="font-black text-lg text-slate-900">أُسُس</span>
            </Link>
            <span className="text-slate-300 font-bold">/</span>
            <Breadcrumbs
              segments={[
                { label: "الرئيسية", href: "/", hideOnMobile: true },
                { label: "القراءة", href: "/reading", hideOnMobile: true },
                { label: level.titleAr, href: `/reading/level/${level.id}` },
                { label: story.titleAr ?? story.title },
              ]}
              activeItemClassName={`rounded-full px-2.5 py-0.5 border max-w-[140px] sm:max-w-none truncate ${
                isTransferTest
                  ? "bg-indigo-50 text-indigo-900 border-indigo-200/80 font-black"
                  : "bg-emerald-50 text-emerald-800 border-emerald-200/80 font-extrabold"
              }`}
              linkClassName="hover:text-emerald-700 transition"
            />
          </div>

          <div className="hidden sm:flex shrink-0 items-center gap-2">
            <button
              onClick={() => setShieldOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs transition border border-slate-900/10 shadow-2xs"
            >
              <span>👩‍🏫</span>
              <span>درع المعلم</span>
            </button>
            <button
              type="button"
              data-reading-print-trigger="true"
              onClick={() => setPrintModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition shadow-[0_8px_18px_-8px_rgba(5,150,105,0.65)]"
              title="طباعة ورقة العمل"
            >
              <span>🖨️</span>
              <span>طباعة ورقة العمل</span>
            </button>
            <Link
              href={`/reading/level/${level.id}`}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-900/10 px-3.5 py-1.5 rounded-full transition"
            >
              ← شبكة القصص
            </Link>
          </div>
        </div>
      </header>

      {/* Transfer Test Notice Banner */}
      {isTransferTest && (
        <section className="bg-gradient-to-l from-indigo-950 via-indigo-900 to-violet-900 text-white px-4 sm:px-6 py-3 no-print shadow-xs">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-100 font-black">
                🎯 اختبار النقل
              </span>
              <span className="hidden sm:inline">
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

      {/* 6-Station Stepper (Mobile Compact Emoji) */}
      <section className="sm:hidden bg-white/75 backdrop-blur-md border-b border-slate-900/10 py-2.5 px-4 no-print shadow-2xs">
        <div className="flex items-center justify-between max-w-md mx-auto gap-2">
          {STATIONS.map((station) => {
            const isActive = activeStation === station.id;
            const isPast = activeStation > station.id;

            return (
              <button
                key={station.id}
                type="button"
                onClick={() => setActiveStation(station.id)}
                aria-label={station.name}
                title={station.name}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition border shrink-0 ${getStationToneClass(
                  isActive,
                  isPast,
                  "mobile"
                )}`}
              >
                {station.icon}
              </button>
            );
          })}
        </div>
      </section>

      {/* 6-Station Stepper (Desktop) */}
      <section className="hidden sm:block bg-white/75 backdrop-blur-md border-b border-slate-900/10 py-3 px-4 sm:px-6 no-print shadow-2xs">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="flex items-center justify-between min-w-[620px] gap-2">
            {STATIONS.map((station) => {
              const isActive = activeStation === station.id;
              const isPast = activeStation > station.id;

              return (
                <button
                  key={station.id}
                  onClick={() => setActiveStation(station.id)}
                  className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-2xl text-right transition border ${getStationToneClass(
                    isActive,
                    isPast,
                    "desktop"
                  )}`}
                >
                  <span
                    className={`w-6 h-6 rounded-xl text-xs font-black flex items-center justify-center shrink-0 ${
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
        <div className="mt-8 pt-4 border-t border-slate-900/10 hidden sm:flex items-center justify-between rounded-2xl bg-white/80 px-4 pb-3 backdrop-blur-md shadow-xs no-print">
          <button
            disabled={activeStation <= 1}
            onClick={() => setActiveStation((prev) => Math.max(1, prev - 1))}
            className="px-5 py-2 rounded-full text-xs font-extrabold transition border border-slate-900/10 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700"
          >
            → المحطة السابقة
          </button>

          <span className="text-xs font-bold text-slate-500">
            المحطة {toEasternArabicNumerals(activeStation)} من{" "}
            {toEasternArabicNumerals(6)}
          </span>

          <button
            disabled={activeStation >= 6}
            onClick={() => setActiveStation((prev) => Math.min(6, prev + 1))}
            className="px-5 py-2 rounded-full text-xs font-black transition bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-[0_8px_18px_-8px_rgba(5,150,105,0.65)]"
          >
            المحطة التالية ←
          </button>
        </div>
      </main>

      {/* Fixed Mobile Bottom Bar */}
      <nav
        aria-label="التنقل السريع"
        className="fixed bottom-0 inset-x-0 z-30 sm:hidden rounded-t-2xl bg-white/90 backdrop-blur-md border-t border-slate-900/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_28px_-14px_rgb(30_60_100_/_0.22)] no-print"
      >
        <div className="flex items-center justify-between gap-1 px-2 py-1.5 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setShieldOpen(true)}
            aria-label="درع المعلم"
            title="درع المعلم"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-base transition shrink-0"
          >
            👩‍🏫
          </button>

          <button
            type="button"
            disabled={activeStation <= 1}
            onClick={() => setActiveStation((prev) => Math.max(1, prev - 1))}
            className="min-h-[44px] min-w-[44px] px-3 inline-flex items-center justify-center rounded-full text-xs font-extrabold transition border border-slate-900/10 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 shrink-0"
          >
            → السابقة
          </button>

          <span className="text-xs font-bold text-slate-600 text-center whitespace-nowrap px-1">
            {`المحطة ${toEasternArabicNumerals(activeStation)} من ${toEasternArabicNumerals(6)}`}
          </span>

          <button
            type="button"
            disabled={activeStation >= 6}
            onClick={() => setActiveStation((prev) => Math.min(6, prev + 1))}
            className="min-h-[44px] min-w-[44px] px-3 inline-flex items-center justify-center rounded-full text-xs font-black transition bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-xs shrink-0"
          >
            التالية ←
          </button>

          <button
            type="button"
            onClick={() => setPrintModalOpen(true)}
            aria-label="طباعة ورقة العمل"
            title="طباعة ورقة العمل"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-base transition shadow-xs shrink-0"
          >
            🖨️
          </button>
        </div>
      </nav>

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
        qrOrigin={qrOrigin}
      />

      <ReadingPrintModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        level={level}
        story={story}
        tashkeelMode={tashkeelMode}
        includeStoryText={includeStoryText}
        onTashkeelChange={setTashkeelMode}
        onIncludeStoryTextChange={setIncludeStoryText}
      />
    </div>
  );
}
