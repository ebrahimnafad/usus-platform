"use client";

import React from "react";
import { PRINT_FONT_OPTIONS, type PrintFontId } from "@/lib/print-html-iframe";

export interface PrintFontSelectorProps {
  value: PrintFontId;
  onChange: (fontId: PrintFontId) => void;
}

export function PrintFontSelector({
  value,
  onChange,
}: PrintFontSelectorProps): React.ReactElement {
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-extrabold text-slate-700">
        خط الطباعة العربي
      </legend>
      <div className="grid grid-cols-2 gap-2">
        {PRINT_FONT_OPTIONS.map((opt) => {
          const isSelected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              data-print-font={opt.id}
              onClick={() => onChange(opt.id)}
              style={{ fontFamily: opt.cssStack }}
              className={`rounded-xl border px-3 py-2 text-right transition-all ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold">{opt.labelAr}</span>
                <span className="text-[11px] font-bold text-slate-500">
                  أ ب ت
                </span>
              </div>
              <div className="mt-0.5 text-[11px] font-medium text-slate-500">
                {opt.subtitleAr}
              </div>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
