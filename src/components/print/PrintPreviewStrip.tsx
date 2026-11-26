"use client";

import React from "react";
import {
  PRINT_FONT_OPTIONS,
  type PrintColorMode,
  type PrintFontId,
} from "@/lib/print-html-iframe";

/** Short fixed Arabic sample used in the preview — platform-branded, domain-neutral. */
const SAMPLE_TEXT = "أُسُس — نموذج الطباعة";

export interface PrintPreviewStripProps {
  fontFamily: PrintFontId;
  colorMode: PrintColorMode;
}

/**
 * Compact live preview rendered below the font selector inside PrintModal and
 * ReadingPrintModal.  Shows the sample text in the teacher's chosen Arabic font
 * with a visual cue for the selected color mode so they can verify their picks
 * before clicking طباعة الآن.
 */
export function PrintPreviewStrip({
  fontFamily,
  colorMode,
}: PrintPreviewStripProps): React.ReactElement {
  const font = PRINT_FONT_OPTIONS.find((f) => f.id === fontFamily);
  const isBW = colorMode === "bw";

  return (
    <div
      aria-label="معاينة الطباعة"
      className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 transition-all ${
        isBW ? "border-slate-300 bg-slate-50" : "border-slate-200 bg-white"
      }`}
    >
      {/* Mode pip — mirrors the pips used in the color-mode toggle buttons */}
      {isBW ? (
        <span className="size-3.5 shrink-0 rounded-full border border-slate-700 bg-gradient-to-tr from-slate-900 to-white" />
      ) : (
        <span className="size-3.5 shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 via-emerald-400 to-amber-400" />
      )}

      {/* Sample text */}
      <span
        style={{ fontFamily: font?.cssStack ?? "Cairo, sans-serif" }}
        className={`flex-1 text-right text-[15px] leading-relaxed transition-colors ${
          isBW ? "text-slate-900" : "text-slate-800"
        }`}
      >
        {SAMPLE_TEXT}
      </span>

      {/* Meta label */}
      <span className="shrink-0 text-left text-[10px] font-semibold text-slate-400">
        {font?.labelAr}
      </span>
    </div>
  );
}
