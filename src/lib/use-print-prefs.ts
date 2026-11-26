"use client";

import { useState } from "react";
import type { PrintColorMode, PrintFontId } from "@/lib/print-html-iframe";

/** The two teacher preferences that survive across sessions. */
export interface PrintPrefs {
  fontFamily: PrintFontId;
  colorMode: PrintColorMode;
}

const STORAGE_KEY = "print-prefs";

const VALID_FONTS: readonly PrintFontId[] = [
  "cairo",
  "amiri",
  "noto-naskh",
  "aref-ruqaa",
];
const VALID_COLORS: readonly PrintColorMode[] = ["color", "bw"];

const DEFAULT_PREFS: PrintPrefs = { fontFamily: "cairo", colorMode: "color" };

function readPrefs(): PrintPrefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<PrintPrefs>;
    return {
      fontFamily: VALID_FONTS.includes(parsed.fontFamily as PrintFontId)
        ? (parsed.fontFamily as PrintFontId)
        : DEFAULT_PREFS.fontFamily,
      colorMode: VALID_COLORS.includes(parsed.colorMode as PrintColorMode)
        ? (parsed.colorMode as PrintColorMode)
        : DEFAULT_PREFS.colorMode,
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

function writePrefs(prefs: PrintPrefs): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore quota / private-browsing errors silently.
  }
}

/**
 * Reads the teacher's preferred Arabic print font and color mode from
 * localStorage ("print-prefs") and writes any change back immediately.
 *
 * Both PrintModal (Math) and ReadingPrintModal (Reading) share one key so the
 * teacher's habit (e.g. "always Amiri, always B&W") is remembered regardless
 * of which domain they open the dialog from.
 *
 * Initialised synchronously on the client using a lazy useState initialiser so
 * there is no one-frame flash of the default value when the modal first opens.
 */
export function usePrintPrefs() {
  const [prefs, setPrefs] = useState<PrintPrefs>(() => readPrefs());

  const setFontFamily = (fontFamily: PrintFontId) => {
    setPrefs((prev) => {
      const next = { ...prev, fontFamily };
      writePrefs(next);
      return next;
    });
  };

  const setColorMode = (colorMode: PrintColorMode) => {
    setPrefs((prev) => {
      const next = { ...prev, colorMode };
      writePrefs(next);
      return next;
    });
  };

  return {
    fontFamily: prefs.fontFamily,
    colorMode: prefs.colorMode,
    setFontFamily,
    setColorMode,
  };
}
