import React from "react";
import type { GradeId, WorksheetDifficultyMode } from "@/domain/types";
import type { ReadingLevelId } from "@/domain/reading-types";
import {
  buildQuickViewUrl,
  buildReadingQuickViewUrl,
  generateQrSvgPath,
  type QuickViewTarget,
} from "@/lib/qr";
import type { TashkeelMode } from "@/lib/reading-scaffold";

export interface QrCodeBadgeProps {
  view: QuickViewTarget;
  href: string;
}

export interface WorksheetHeaderQrCodeProps {
  view: QuickViewTarget;
  grade: GradeId;
  lessonNumber: number;
  seed: string;
  difficultyLevel: WorksheetDifficultyMode;
  qrOrigin?: string;
}

export interface ReadingHeaderQrCodeProps {
  view: QuickViewTarget;
  levelId: ReadingLevelId;
  storyNumber: number;
  tashkeelMode?: TashkeelMode;
  qrOrigin?: string;
}

const QR_META: Record<
  QuickViewTarget,
  { labelAr: string; testId: string; borderClass: string }
> = {
  "answer-key": {
    labelAr: "الإجابة",
    testId: "qr-answer-key",
    borderClass: "border-emerald-300",
  },
  "teacher-notes": {
    labelAr: "للمعلم",
    testId: "qr-teacher-notes",
    borderClass: "border-indigo-300",
  },
};

export function QrCodeBadge({
  view,
  href,
}: QrCodeBadgeProps): React.ReactElement {
  const item = QR_META[view];
  const { size, path } = generateQrSvgPath(href);
  const viewBox = `-2 -2 ${size + 4} ${size + 4}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-qr-link={item.testId}
      aria-label={item.labelAr}
      className="group flex shrink-0 flex-col items-center gap-0.5 text-center no-underline"
    >
      <span
        className={`inline-flex rounded-md border ${item.borderClass} bg-white p-0.5 shadow-2xs transition-transform group-hover:scale-105`}
      >
        <svg
          width="44"
          height="44"
          viewBox={viewBox}
          shapeRendering="crispEdges"
          aria-hidden="true"
          focusable="false"
        >
          <rect
            x="-2"
            y="-2"
            width={size + 4}
            height={size + 4}
            fill="#ffffff"
          />
          <path d={path} fill="#0f172a" />
        </svg>
      </span>
      <span className="text-[12px] font-bold leading-none text-slate-700">
        {item.labelAr}
      </span>
    </a>
  );
}

export function WorksheetHeaderQrCode({
  view,
  grade,
  lessonNumber,
  seed,
  difficultyLevel,
  qrOrigin,
}: WorksheetHeaderQrCodeProps): React.ReactElement {
  const href = buildQuickViewUrl({
    origin: qrOrigin,
    grade,
    lessonNumber,
    seed,
    difficultyLevel,
    view,
  });
  return <QrCodeBadge view={view} href={href} />;
}

export function ReadingHeaderQrCode({
  view,
  levelId,
  storyNumber,
  tashkeelMode = "full",
  qrOrigin,
}: ReadingHeaderQrCodeProps): React.ReactElement {
  const href = buildReadingQuickViewUrl({
    origin: qrOrigin,
    levelId,
    storyNumber,
    tashkeelMode,
    view,
  });
  return <QrCodeBadge view={view} href={href} />;
}
