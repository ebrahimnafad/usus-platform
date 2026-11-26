"use client";

import React, { useEffect, useState } from "react";
import type { ReadingLevel, ReadingStory } from "@/domain/reading-types";
import type { TashkeelMode } from "@/lib/reading-scaffold";
import { toEasternArabicNumerals } from "@/lib/numerals";
import {
  printHtmlInIframe,
  type PrintColorMode,
  type PrintFontId,
  type ReadingPrintScope,
  type ReadingPrintViewOption,
} from "@/lib/print-html-iframe";
import { sharePrintContent } from "@/lib/share-print";
import { PrintDialogShell } from "@/components/print/PrintDialogShell";
import { PrintFontSelector } from "@/components/print/PrintFontSelector";

export type { ReadingPrintScope, ReadingPrintViewOption };

export interface ReadingPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: ReadingLevel;
  story: ReadingStory;
  tashkeelMode: TashkeelMode;
  includeStoryText: boolean;
  onTashkeelChange?: (mode: TashkeelMode) => void;
  onIncludeStoryTextChange?: (include: boolean) => void;
}

const TASHKEEL_OPTIONS: Array<{ id: TashkeelMode; labelAr: string }> = [
  { id: "full", labelAr: "تشكيل كامل" },
  { id: "partial", labelAr: "تشكيل جزئي" },
  { id: "none", labelAr: "بدون تشكيل" },
];

export function ReadingPrintModal({
  isOpen,
  onClose,
  level,
  story,
  tashkeelMode,
  includeStoryText,
  onTashkeelChange,
  onIncludeStoryTextChange,
}: ReadingPrintModalProps): React.ReactElement | null {
  const isFreeReading = story.type === "free_reading";
  const [scope, setScope] = useState<ReadingPrintScope>("story");
  const [viewOption, setViewOption] =
    useState<ReadingPrintViewOption>("student");
  const [colorMode, setColorMode] = useState<PrintColorMode>("color");
  const [fontFamily, setFontFamily] = useState<PrintFontId>("cairo");
  const [localTashkeel, setLocalTashkeel] =
    useState<TashkeelMode>(tashkeelMode);
  const [localIncludeStoryText, setLocalIncludeStoryText] =
    useState<boolean>(includeStoryText);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLocalTashkeel(tashkeelMode);
    setLocalIncludeStoryText(includeStoryText);
    if (isFreeReading && scope === "story" && viewOption !== "student") {
      setViewOption("student");
    }
  }, [
    isOpen,
    tashkeelMode,
    includeStoryText,
    isFreeReading,
    scope,
    viewOption,
  ]);

  if (!isOpen) return null;

  const storyNumAr = toEasternArabicNumerals(story.storyNumber);
  const levelCountAr = toEasternArabicNumerals(level.stories.length);
  const disableAnswerKeyForSingleFreeReading =
    scope === "story" && isFreeReading;

  const handleTashkeelSelect = (mode: TashkeelMode) => {
    setLocalTashkeel(mode);
    onTashkeelChange?.(mode);
  };

  const handleIncludeStoryToggle = (next: boolean) => {
    setLocalIncludeStoryText(next);
    onIncludeStoryTextChange?.(next);
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      const effectiveView = disableAnswerKeyForSingleFreeReading
        ? "student"
        : viewOption;
      const params = new URLSearchParams({
        level: level.id,
        story: String(story.storyNumber),
        scope,
        viewOption: effectiveView,
        tashkeel: localTashkeel,
        includeStoryText: String(localIncludeStoryText),
      });
      const response = await fetch(
        `/api/reading-print-html?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error(`Print HTML request failed (${response.status})`);
      }
      const data = (await response.json()) as {
        html: string;
        title: string;
      };
      await printHtmlInIframe({
        bodyHtml: data.html,
        title: data.title,
        colorMode,
        fontFamily,
      });
      onClose();
    } finally {
      setIsPrinting(false);
    }
  };

  const handleShare = async () => {
    if (isSharing || typeof window === "undefined") return;
    setIsSharing(true);
    try {
      const origin = window.location.origin;
      const effectiveView = disableAnswerKeyForSingleFreeReading
        ? "student"
        : viewOption;
      const storyTitle = story.titleAr ?? story.title;
      const shareUrl =
        scope === "level"
          ? `${origin}/reading/level/${level.id}`
          : effectiveView === "answer-key"
            ? `${origin}/reading/q/${level.id}?story=${story.storyNumber}&tashkeel=${localTashkeel}&view=answer-key`
            : `${origin}/reading/level/${level.id}/story/${story.storyNumber}`;
      const shareTitle =
        scope === "level"
          ? `أُسُس - ${level.titleAr} - كافة القصص`
          : `أُسُس - ${level.titleAr} - القصة ${storyNumAr} - ${storyTitle}`;
      const result = await sharePrintContent({
        title: shareTitle,
        text: `${level.titleAr}: «${storyTitle}»`,
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
      titleId="reading-print-modal-title"
      titleAr="إعدادات طباعة القراءة"
      subtitleAr={`${level.titleAr} — القصة ${storyNumAr}: «${story.titleAr ?? story.title}»`}
      isPrinting={isPrinting}
      printingLabelAr="جارٍ التجهيز..."
      onConfirm={handlePrint}
      onShare={handleShare}
      isSharing={isSharing}
      shareFeedbackAr={shareFeedback}
      confirmDataAttr="data-reading-print-confirm"
      shareDataAttr="data-reading-print-share"
    >
      {/* 1. Scope */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-extrabold text-slate-700">
          نطاق الطباعة
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            data-reading-print-scope="story"
            onClick={() => setScope("story")}
            className={`rounded-xl border px-3 py-2.5 text-right transition-all ${
              scope === "story"
                ? "border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <div className="text-xs font-extrabold">القصة الحالية</div>
            <div className="mt-0.5 text-[11px] font-medium text-slate-500">
              القصة {storyNumAr} فقط
            </div>
          </button>
          <button
            type="button"
            data-reading-print-scope="level"
            onClick={() => setScope("level")}
            className={`rounded-xl border px-3 py-2.5 text-right transition-all ${
              scope === "level"
                ? "border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <div className="text-xs font-extrabold">المستوى كاملاً</div>
            <div className="mt-0.5 text-[11px] font-medium text-slate-500">
              {levelCountAr} قصة متتالية
            </div>
          </button>
        </div>
      </fieldset>

      {/* 2. Content */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-extrabold text-slate-700">
          محتوى الطباعة
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: "student", label: "ورقة الطالب" },
              { id: "answer-key", label: "نموذج الإجابة" },
              { id: "both", label: "الورقة + الإجابة" },
            ] as const
          ).map((item) => {
            const disabled =
              disableAnswerKeyForSingleFreeReading && item.id !== "student";
            return (
              <button
                key={item.id}
                type="button"
                disabled={disabled}
                data-reading-print-view={item.id}
                onClick={() => setViewOption(item.id)}
                className={`rounded-xl border px-2.5 py-2 text-xs font-extrabold transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                  viewOption === item.id && !disabled
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {disableAnswerKeyForSingleFreeReading && (
          <p className="text-[11px] font-medium text-amber-800">
            قصص القراءة الحرة لا تتضمن أسئلة أو نموذج إجابة.
          </p>
        )}
      </fieldset>

      {/* 3. Color Mode */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-extrabold text-slate-700">
          نمط الألوان
        </legend>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            data-reading-print-color="color"
            onClick={() => setColorMode("color")}
            className={`rounded-xl border px-3 py-2 text-right transition-all ${
              colorMode === "color"
                ? "border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <div className="text-xs font-extrabold">ملون</div>
            <div className="mt-0.5 text-[11px] font-medium text-slate-500">
              ألوان المربعات والشارات الكاملة
            </div>
          </button>
          <button
            type="button"
            data-reading-print-color="bw"
            onClick={() => setColorMode("bw")}
            className={`rounded-xl border px-3 py-2 text-right transition-all ${
              colorMode === "bw"
                ? "border-slate-800 bg-slate-100 text-slate-950 ring-1 ring-slate-800"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <div className="text-xs font-extrabold">أبيض وأسود</div>
            <div className="mt-0.5 text-[11px] font-medium text-slate-500">
              وضع توفير الحبر بحدود واضحة
            </div>
          </button>
        </div>
      </fieldset>

      {/* 4. Arabic Print Font */}
      <PrintFontSelector value={fontFamily} onChange={setFontFamily} />

      {/* 5. Tashkeel & Story Text */}
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
        <div className="space-y-1.5">
          <span className="block text-xs font-extrabold text-slate-700">
            مستوى التشكيل في النص
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {TASHKEEL_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                data-reading-print-tashkeel={opt.id}
                onClick={() => handleTashkeelSelect(opt.id)}
                className={`rounded-lg border px-2 py-1.5 text-[11px] font-extrabold transition-all ${
                  localTashkeel === opt.id
                    ? "border-slate-800 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {opt.labelAr}
              </button>
            ))}
          </div>
        </div>

        <label className="flex cursor-pointer items-center justify-between gap-3 pt-1 border-t border-slate-200">
          <div>
            <div className="text-xs font-extrabold text-slate-800">
              تضمين نص القصة في ورقة الطالب
            </div>
            <div className="text-[11px] font-medium text-slate-500">
              يمكن إخفاؤه لطباعة الأسئلة ومعمل اللغة فقط
            </div>
          </div>
          <input
            type="checkbox"
            checked={localIncludeStoryText}
            onChange={(e) => handleIncludeStoryToggle(e.target.checked)}
            data-reading-print-include-text="true"
            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>
      </div>
    </PrintDialogShell>
  );
}
