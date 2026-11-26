"use client";

import React, { useEffect } from "react";
import { CloseIcon, PrinterIcon, ShareIcon } from "@/components/studio/icons";

export interface PrintDialogShellProps {
  isOpen: boolean;
  onClose: () => void;
  titleId: string;
  titleAr: string;
  subtitleAr: string;
  accentHex?: string;
  isPrinting: boolean;
  printingLabelAr?: string;
  onConfirm: () => void;
  onShare?: () => void;
  isSharing?: boolean;
  shareFeedbackAr?: string | null;
  dialogDataAttr?: string;
  confirmDataAttr?: string;
  shareDataAttr?: string;
  children: React.ReactNode;
}

/**
 * Shared RTL modal shell for Math and Reading print option dialogs.
 * Handles Escape-key dismissal, backdrop close, header, and print/cancel footer.
 */
export function PrintDialogShell({
  isOpen,
  onClose,
  titleId,
  titleAr,
  subtitleAr,
  accentHex,
  isPrinting,
  printingLabelAr = "جاري التجهيز...",
  onConfirm,
  onShare,
  isSharing = false,
  shareFeedbackAr = null,
  dialogDataAttr,
  confirmDataAttr,
  shareDataAttr,
  children,
}: PrintDialogShellProps): React.ReactElement | null {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dialogProps = dialogDataAttr ? { [dialogDataAttr]: "true" } : {};
  const confirmProps = confirmDataAttr ? { [confirmDataAttr]: "true" } : {};
  const shareProps = shareDataAttr ? { [shareDataAttr]: "true" } : {};

  return (
    <div
      dir="rtl"
      lang="ar"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      {...dialogProps}
      className="no-print fixed inset-0 z-50 flex items-end justify-center bg-slate-900/45 p-0 backdrop-blur-xs sm:items-center sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span
              className={`flex size-9 items-center justify-center rounded-xl text-white shadow-2xs ${
                accentHex ? "" : "bg-emerald-600"
              }`}
              style={accentHex ? { backgroundColor: accentHex } : undefined}
            >
              <PrinterIcon size={18} />
            </span>
            <div>
              <h2
                id={titleId}
                className="text-base font-extrabold text-slate-900"
              >
                {titleAr}
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                {subtitleAr}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="flex size-8 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {children}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3.5">
          <div>
            {onShare && (
              <button
                type="button"
                {...shareProps}
                disabled={isPrinting || isSharing}
                onClick={onShare}
                className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-700 transition-colors hover:bg-slate-100 disabled:opacity-50 sm:min-h-0"
              >
                <ShareIcon size={15} />
                <span>
                  {shareFeedbackAr ??
                    (isSharing ? "جارٍ تجهيز PDF..." : "مشاركة PDF")}
                </span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 transition-colors hover:bg-slate-100 sm:min-h-0"
            >
              إلغاء
            </button>
            <button
              type="button"
              {...confirmProps}
              disabled={isPrinting}
              onClick={onConfirm}
              className="flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-extrabold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:opacity-50 sm:min-h-0"
            >
              <PrinterIcon size={15} />
              <span>{isPrinting ? printingLabelAr : "طباعة الآن"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
