"use client";

import React, { useEffect, useState } from "react";
import type {
  GeneratedWorksheetBundle,
  ViewMode,
  WorksheetDifficultyMode,
} from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";
import { mintNextStudioSeed } from "@/lib/studio-state";
import {
  printHtmlInIframe,
  type PrintScope,
  type PrintViewOption,
} from "@/lib/print-html-iframe";
import { sharePrintContent } from "@/lib/share-print";
import { usePrintPrefs } from "@/lib/use-print-prefs";
import { PrintDialogShell } from "@/components/print/PrintDialogShell";
import { PrintFontSelector } from "@/components/print/PrintFontSelector";
import { PrintPreviewStrip } from "@/components/print/PrintPreviewStrip";
import { RefreshIcon } from "@/components/studio/icons";

export type { PrintScope, PrintViewOption };

export interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  bundle: GeneratedWorksheetBundle;
  activeViewMode: ViewMode;
  accentHex: string;
  onDifficultyChange?: (mode: WorksheetDifficultyMode) => void;
  onSeedChange?: (seed: string) => void;
}

const DIFFICULTY_OPTIONS: Array<{
  id: WorksheetDifficultyMode;
  labelAr: string;
}> = [
  { id: "scaffolded", labelAr: "متدرّج" },
  { id: "Easy", labelAr: "سهل" },
  { id: "Intermediate", labelAr: "متوسط" },
  { id: "Advanced", labelAr: "متقدّم" },
];

export function PrintModal({
  isOpen,
  onClose,
  bundle,
  activeViewMode,
  accentHex,
  onDifficultyChange,
  onSeedChange,
}: PrintModalProps): React.ReactElement | null {
  const [scope, setScope] = useState<PrintScope>("lesson");
  const [viewOption, setViewOption] = useState<PrintViewOption>(
    activeViewMode === "answer-key" ? "answer-key" : "worksheet"
  );
  const { fontFamily, colorMode, setFontFamily, setColorMode } =
    usePrintPrefs();
  const [difficulty, setDifficulty] = useState<WorksheetDifficultyMode>(
    bundle.difficultyMode
  );
  const [seedInput, setSeedInput] = useState<string>(bundle.seed);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setViewOption(activeViewMode === "answer-key" ? "answer-key" : "worksheet");
    setDifficulty(bundle.difficultyMode);
    setSeedInput(bundle.seed);
  }, [isOpen, activeViewMode, bundle.difficultyMode, bundle.seed]);

  if (!isOpen) return null;

  const lessonAr = formatEasternNumber(bundle.lesson.lessonNumber);
  const unitAr = formatEasternNumber(bundle.unit.unitNumber);
  const unitLessonCountAr = formatEasternNumber(bundle.unit.lessons.length);

  const handleDifficultySelect = (next: WorksheetDifficultyMode) => {
    setDifficulty(next);
    onDifficultyChange?.(next);
  };

  const handleRerollSeed = () => {
    const nextSeed = mintNextStudioSeed(seedInput || bundle.seed);
    setSeedInput(nextSeed);
    onSeedChange?.(nextSeed);
  };

  const handleSeedCommit = (raw: string) => {
    const clean = raw.trim().toUpperCase();
    setSeedInput(clean);
    if (clean.length >= 4 && clean !== bundle.seed) {
      onSeedChange?.(clean);
    }
  };

  const handlePrintNow = async () => {
    if (isPrinting) return;
    setIsPrinting(true);

    const effectiveSeed = seedInput.trim().toUpperCase() || bundle.seed;
    const canPrintLiveDom =
      scope === "lesson" &&
      viewOption !== "both" &&
      viewOption === activeViewMode &&
      difficulty === bundle.difficultyMode &&
      effectiveSeed === bundle.seed;

    try {
      if (canPrintLiveDom && typeof document !== "undefined") {
        const surface = document.querySelector(
          '[data-worksheet-surface="true"]'
        );
        if (surface) {
          const viewSuffix =
            viewOption === "answer-key" ? " - نموذج الإجابة" : "";
          const title = `أُسُس - ${bundle.grade.labelAr} - الدرس ${lessonAr} - ${bundle.lesson.titleAr}${viewSuffix} - ${effectiveSeed}`;
          await printHtmlInIframe({
            bodyHtml: surface.outerHTML,
            title,
            colorMode,
            fontFamily,
          });
          onClose();
          return;
        }
      }

      const params = new URLSearchParams({
        grade: bundle.grade.id,
        lesson: String(bundle.lesson.lessonNumber),
        seed: effectiveSeed,
        difficulty,
        scope,
        viewOption,
      });
      const res = await fetch(`/api/print-html?${params.toString()}`);
      if (!res.ok) throw new Error(`Print HTML API failed: ${res.status}`);
      const data = (await res.json()) as { html: string; title: string };
      await printHtmlInIframe({
        bodyHtml: data.html,
        title: data.title,
        colorMode,
        fontFamily,
      });
      onClose();
    } catch {
      window.print();
    } finally {
      setIsPrinting(false);
    }
  };

  const handleShare = async () => {
    if (isSharing || typeof window === "undefined") return;
    setIsSharing(true);
    try {
      const origin = window.location.origin;
      const effectiveSeed = seedInput.trim().toUpperCase() || bundle.seed;
      const shareUrl =
        scope === "unit"
          ? `${origin}/math/${bundle.grade.id}`
          : viewOption === "answer-key"
            ? `${origin}/q/${bundle.grade.id}?lesson=${bundle.lesson.lessonNumber}&seed=${effectiveSeed}&difficulty=${difficulty}&view=answer-key`
            : `${origin}/print?grade=${bundle.grade.id}&lesson=${bundle.lesson.lessonNumber}&seed=${effectiveSeed}&difficulty=${difficulty}&view=${viewOption === "both" ? "worksheet" : viewOption}`;
      const shareTitle =
        scope === "unit"
          ? `أُسُس - ${bundle.grade.labelAr} - الوحدة ${unitAr}`
          : `أُسُس - ${bundle.grade.labelAr} - الدرس ${lessonAr} - ${bundle.lesson.titleAr}`;
      const result = await sharePrintContent({
        title: shareTitle,
        text: `${bundle.grade.labelAr} — الدرس ${lessonAr}: ${bundle.lesson.titleAr}`,
        url: shareUrl,
      });
      if (result === "copied") {
        setShareFeedback("تم نسخ الرابط ✓");
        setTimeout(() => setShareFeedback(null), 2500);
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <PrintDialogShell
      isOpen={isOpen}
      onClose={onClose}
      titleId="print-modal-title"
      titleAr="خيارات الطباعة"
      subtitleAr={`${bundle.grade.labelAr} • الوحدة ${unitAr} • الدرس ${lessonAr}`}
      accentHex={accentHex}
      isPrinting={isPrinting}
      onConfirm={handlePrintNow}
      onShare={handleShare}
      isSharing={isSharing}
      shareFeedbackAr={shareFeedback}
      dialogDataAttr="data-print-modal"
      confirmDataAttr="data-print-confirm"
      shareDataAttr="data-print-share"
    >
      {/* Scope: Lesson vs Unit */}
      <div>
        <label className="mb-1.5 block text-xs font-extrabold text-slate-700">
          نطاق الطباعة
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            data-print-scope="lesson"
            onClick={() => setScope("lesson")}
            className={`rounded-2xl border px-3 py-2.5 text-right transition-all ${
              scope === "lesson"
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500"
                : "border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <div className="text-xs font-extrabold">الدرس الحالي</div>
            <div className="mt-0.5 text-[11px] font-semibold text-slate-500">
              الدرس {lessonAr} فقط
            </div>
          </button>

          <button
            type="button"
            data-print-scope="unit"
            onClick={() => setScope("unit")}
            className={`rounded-2xl border px-3 py-2.5 text-right transition-all ${
              scope === "unit"
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500"
                : "border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <div className="text-xs font-extrabold">الوحدة كاملة</div>
            <div className="mt-0.5 text-[11px] font-semibold text-slate-500">
              الوحدة {unitAr} ({unitLessonCountAr} دروس)
            </div>
          </button>
        </div>
      </div>

      {/* View Option */}
      <div>
        <label className="mb-1.5 block text-xs font-extrabold text-slate-700">
          المحتوى المطلوب
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: "worksheet", labelAr: "ورقة العمل" },
              { id: "answer-key", labelAr: "مفتاح الإجابة" },
              { id: "both", labelAr: "الاثنان معاً" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              data-print-view={item.id}
              onClick={() => setViewOption(item.id)}
              className={`rounded-xl border px-2.5 py-2 text-xs font-extrabold transition-all ${
                viewOption === item.id
                  ? "border-indigo-500 bg-indigo-50 text-indigo-950 ring-1 ring-indigo-500"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item.labelAr}
            </button>
          ))}
        </div>
      </div>

      {/* Color vs B&W */}
      <div>
        <label className="mb-1.5 block text-xs font-extrabold text-slate-700">
          نمط الألوان
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            data-print-color="color"
            onClick={() => setColorMode("color")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-extrabold transition-all ${
              colorMode === "color"
                ? "border-sky-500 bg-sky-50 text-sky-950 ring-1 ring-sky-500"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span className="size-3 rounded-full bg-gradient-to-tr from-indigo-500 via-emerald-400 to-amber-400" />
            نسخة ملوّنة
          </button>
          <button
            type="button"
            data-print-color="bw"
            onClick={() => setColorMode("bw")}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-extrabold transition-all ${
              colorMode === "bw"
                ? "border-slate-800 bg-slate-100 text-slate-950 ring-1 ring-slate-800"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span className="size-3 rounded-full border border-slate-700 bg-gradient-to-tr from-slate-900 to-white" />
            أبيض وأسود (توفير الحبر)
          </button>
        </div>
      </div>

      {/* Arabic Print Font */}
      <PrintFontSelector value={fontFamily} onChange={setFontFamily} />

      {/* Live Preview */}
      <PrintPreviewStrip fontFamily={fontFamily} colorMode={colorMode} />

      {/* Difficulty & Seed */}
      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-extrabold text-slate-700">
            مستوى الصعوبة
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {DIFFICULTY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                data-print-difficulty={opt.id}
                onClick={() => handleDifficultySelect(opt.id)}
                className={`rounded-lg border px-2 py-1.5 text-[11px] font-extrabold transition-colors ${
                  difficulty === opt.id
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {opt.labelAr}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="print-modal-seed"
            className="mb-1.5 block text-xs font-extrabold text-slate-700"
          >
            رمز الورقة (توليد نسخة جديدة)
          </label>
          <div className="flex items-center gap-1.5">
            <input
              id="print-modal-seed"
              type="text"
              dir="ltr"
              value={seedInput}
              onChange={(e) => handleSeedCommit(e.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 text-center font-mono text-xs font-extrabold uppercase tracking-wider text-slate-900 outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              data-print-reroll-seed="true"
              onClick={handleRerollSeed}
              title="توليد رمز جديد"
              aria-label="توليد رمز جديد"
              className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-100"
            >
              <RefreshIcon size={15} />
            </button>
          </div>
        </div>
      </div>
    </PrintDialogShell>
  );
}
