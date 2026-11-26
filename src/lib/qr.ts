import QRCode from "qrcode";
import type { GradeId, WorksheetDifficultyMode } from "@/domain/types";
import type { ReadingLevelId } from "@/domain/reading-types";

export type QuickViewTarget = "answer-key" | "teacher-notes";

export interface BuildQuickViewUrlInput {
  origin?: string;
  grade: GradeId;
  lessonNumber: number;
  seed: string;
  difficultyLevel: WorksheetDifficultyMode;
  view: QuickViewTarget;
}

export interface BuildReadingQuickViewUrlInput {
  origin?: string;
  levelId: ReadingLevelId;
  storyNumber: number;
  tashkeelMode?: "full" | "partial" | "none";
  view: QuickViewTarget;
}

/**
 * Resolve the origin for QR target URLs.
 * Pure & SSR-safe: uses `explicitOrigin`, `NEXT_PUBLIC_SITE_URL`, or Vercel's
 * runtime host env vars (`VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL`),
 * falling back to a relative path (`""`). Client components upgrade to
 * `window.location.origin` inside `useEffect` after hydration.
 */
export function resolveQrOrigin(explicitOrigin?: string): string {
  if (explicitOrigin && explicitOrigin.trim().length > 0) {
    return explicitOrigin.replace(/\/+$/, "");
  }
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.replace(/\/+$/, "");
  }
  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelHost && vercelHost.trim().length > 0) {
    const trimmed = vercelHost.trim().replace(/\/+$/, "");
    return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
  }
  return "";
}

/**
 * Build the exact destination URL encoded into a Worksheet header QR code.
 */
export function buildQuickViewUrl({
  origin,
  grade,
  lessonNumber,
  seed,
  difficultyLevel,
  view,
}: BuildQuickViewUrlInput): string {
  const base = resolveQrOrigin(origin);
  const params = new URLSearchParams({
    lesson: String(lessonNumber),
    seed,
    difficulty: difficultyLevel,
    view,
  });
  return `${base}/q/${grade}?${params.toString()}`;
}

/**
 * Build the exact destination URL encoded into a Reading Sheet header QR code.
 */
export function buildReadingQuickViewUrl({
  origin,
  levelId,
  storyNumber,
  tashkeelMode = "full",
  view,
}: BuildReadingQuickViewUrlInput): string {
  const base = resolveQrOrigin(origin);
  const params = new URLSearchParams({
    story: String(storyNumber),
    tashkeel: tashkeelMode,
    view,
  });
  return `${base}/reading/q/${levelId}?${params.toString()}`;
}

export interface QrMatrixSvgData {
  size: number;
  path: string;
}

/**
 * Synchronously generate an SVG path representing a QR code matrix.
 * Uses error correction level "L" for maximum density and crispness at 44x44 px.
 */
export function generateQrSvgPath(value: string): QrMatrixSvgData {
  const qr = QRCode.create(value, { errorCorrectionLevel: "L" });
  const size = qr.modules.size;
  const data = qr.modules.data;
  const segments: string[] = [];

  for (let row = 0; row < size; row++) {
    let col = 0;
    while (col < size) {
      if (data[row * size + col]) {
        const start = col;
        while (col < size && data[row * size + col]) {
          col++;
        }
        segments.push(`M${start},${row}h${col - start}v1h-${col - start}z`);
      } else {
        col++;
      }
    }
  }

  return {
    size,
    path: segments.join(""),
  };
}
