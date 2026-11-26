"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { GradeId } from "@/domain/types";
import { getGradeConfig, type GradeColorToken } from "@/config/grades";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BackButton } from "@/components/layout/back-button";
import { GradeCardVisualModel } from "@/components/math/grade-card-models";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { toEasternArabicNumerals } from "@/lib/numerals";

export interface StudioHeaderProps {
  gradeId: GradeId;
  gradeLabel?: string;
  className?: string;
}

const THEME_MAP: Record<
  GradeColorToken,
  {
    gradient: string;
    pill: string;
    badgeText: string;
    modelBg: string;
  }
> = {
  rose: {
    gradient: "from-rose-600 to-rose-500",
    pill: "bg-rose-50 text-rose-700 border-rose-200/80",
    badgeText: "text-rose-700",
    modelBg: "bg-rose-50/90",
  },
  orange: {
    gradient: "from-orange-600 to-orange-500",
    pill: "bg-orange-50 text-orange-700 border-orange-200/80",
    badgeText: "text-orange-700",
    modelBg: "bg-orange-50/90",
  },
  amber: {
    gradient: "from-amber-600 to-amber-500",
    pill: "bg-amber-50 text-amber-800 border-amber-200/80",
    badgeText: "text-amber-800",
    modelBg: "bg-amber-50/90",
  },
  emerald: {
    gradient: "from-emerald-600 to-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    badgeText: "text-emerald-700",
    modelBg: "bg-emerald-50/90",
  },
  sky: {
    gradient: "from-sky-600 to-sky-500",
    pill: "bg-sky-50 text-sky-700 border-sky-200/80",
    badgeText: "text-sky-700",
    modelBg: "bg-sky-50/90",
  },
  violet: {
    gradient: "from-violet-600 to-violet-500",
    pill: "bg-violet-50 text-violet-700 border-violet-200/80",
    badgeText: "text-violet-700",
    modelBg: "bg-violet-50/90",
  },
};

export function StudioHeader({
  gradeId,
  gradeLabel,
  className = "",
}: StudioHeaderProps): React.ReactElement {
  const config = getGradeConfig(gradeId);
  const color = config?.color ?? "indigo";
  const theme =
    color in THEME_MAP
      ? THEME_MAP[color as GradeColorToken]
      : {
          gradient: "from-indigo-600 to-indigo-500",
          pill: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
          badgeText: "text-indigo-700",
          modelBg: "bg-indigo-50/90",
        };
  const fallbackLabel =
    gradeId.toUpperCase() === "K"
      ? "الروضة"
      : `الصف ${toEasternArabicNumerals(gradeId)}`;
  const label = gradeLabel ?? config?.label ?? fallbackLabel;
  const gradeKey = gradeId.toLowerCase();
  const prefersReduced = useReducedMotion();

  return (
    <motion.header
      layoutId={!prefersReduced ? `grade-${gradeKey}` : undefined}
      data-layout-id={!prefersReduced ? `grade-${gradeKey}` : undefined}
      data-math-topbar="true"
      transition={
        !prefersReduced ? { duration: 0.35, ease: "easeOut" } : { duration: 0 }
      }
      className={`no-print sticky top-0 z-30 relative flex h-14 w-full items-center justify-between border-b border-slate-900/10 bg-white/80 px-3.5 sm:px-5 text-slate-900 shadow-[0_6px_24px_-14px_rgba(30,60,100,0.2)] backdrop-blur-md ${className}`}
    >
      {/* Subtle grade-colored accent line along the top edge */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l ${theme.gradient}`}
      />

      {/* Right side in RTL: Back button + Brand + Breadcrumbs */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <BackButton
          href="/math"
          ariaLabel="العودة لاختيار الصف"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-900/10 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-950"
        />

        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-full py-0.5 font-black text-slate-900 transition hover:opacity-85"
          title="بوابة أُسُس"
        >
          <span
            className={`grid size-8 place-items-center rounded-xl bg-gradient-to-br ${theme.gradient} text-sm text-white shadow-xs`}
          >
            📚
          </span>
          <span className="hidden xs:inline sm:inline text-base font-black tracking-tight">
            أُسُس
          </span>
        </Link>

        <span
          className="hidden sm:inline font-bold text-slate-300"
          aria-hidden="true"
        >
          /
        </span>

        <Breadcrumbs
          segments={[
            { label: "الرئيسية", href: "/" },
            { label: "الرياضيات", href: "/math" },
            { label },
          ]}
          listClassName="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500"
          activeItemClassName={`rounded-full border px-2.5 py-0.5 font-extrabold ${theme.pill}`}
          linkClassName="hover:text-slate-900 transition"
        />

        {/* Compact mobile grade title */}
        <span
          className={`sm:hidden truncate rounded-full border px-2.5 py-0.5 text-xs font-extrabold ${theme.pill}`}
        >
          {label}
        </span>
      </div>

      {/* Left side in RTL: Quick link + Visual Model Miniature Badge */}
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/reading"
          className="hidden md:inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-emerald-500/10 hover:text-emerald-700"
        >
          <span>الفهم القرائي</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/95 py-1 ps-1.5 pe-3 shadow-2xs">
          {config && (
            <motion.div
              layoutId={!prefersReduced ? `grade-model-${gradeKey}` : undefined}
              data-model-layout-id={
                !prefersReduced ? `grade-model-${gradeKey}` : undefined
              }
              className={`flex h-6 w-9 items-center justify-center overflow-hidden rounded-full px-1 ${theme.modelBg}`}
            >
              <GradeCardVisualModel modelKey={config.visualModel} />
            </motion.div>
          )}
          <motion.span
            layoutId={!prefersReduced ? `grade-badge-${gradeKey}` : undefined}
            data-badge-layout-id={
              !prefersReduced ? `grade-badge-${gradeKey}` : undefined
            }
            className={`text-xs font-black ${theme.badgeText}`}
          >
            {config?.shortLabel ?? label}
          </motion.span>
        </div>
      </div>
    </motion.header>
  );
}

export default StudioHeader;
