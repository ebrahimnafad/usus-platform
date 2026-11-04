"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { GradeConfig, GradeColorToken } from "@/config/grades";
import { GradeCardVisualModel } from "@/components/math/grade-card-models";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { formatEasternNumber } from "@/lib/numerals";

export interface GradeCardProps {
  grade: GradeConfig;
}

const COLOR_MAP: Record<
  GradeColorToken,
  {
    badgeBg: string;
    badgeText: string;
    borderHover: string;
    glowShadow: string;
    pillBg: string;
    buttonBg: string;
    accentText: string;
  }
> = {
  rose: {
    badgeBg: "bg-rose-500",
    badgeText: "text-white",
    borderHover: "hover:border-rose-400",
    glowShadow: "hover:shadow-rose-500/15",
    pillBg: "bg-rose-50 text-rose-700 border-rose-200",
    buttonBg: "bg-rose-600 hover:bg-rose-700",
    accentText: "text-rose-700",
  },
  orange: {
    badgeBg: "bg-orange-500",
    badgeText: "text-white",
    borderHover: "hover:border-orange-400",
    glowShadow: "hover:shadow-orange-500/15",
    pillBg: "bg-orange-50 text-orange-700 border-orange-200",
    buttonBg: "bg-orange-600 hover:bg-orange-700",
    accentText: "text-orange-700",
  },
  amber: {
    badgeBg: "bg-amber-500",
    badgeText: "text-white",
    borderHover: "hover:border-amber-400",
    glowShadow: "hover:shadow-amber-500/15",
    pillBg: "bg-amber-50 text-amber-800 border-amber-200",
    buttonBg: "bg-amber-600 hover:bg-amber-700",
    accentText: "text-amber-800",
  },
  emerald: {
    badgeBg: "bg-emerald-500",
    badgeText: "text-white",
    borderHover: "hover:border-emerald-400",
    glowShadow: "hover:shadow-emerald-500/15",
    pillBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    buttonBg: "bg-emerald-600 hover:bg-emerald-700",
    accentText: "text-emerald-700",
  },
  sky: {
    badgeBg: "bg-sky-500",
    badgeText: "text-white",
    borderHover: "hover:border-sky-400",
    glowShadow: "hover:shadow-sky-500/15",
    pillBg: "bg-sky-50 text-sky-700 border-sky-200",
    buttonBg: "bg-sky-600 hover:bg-sky-700",
    accentText: "text-sky-700",
  },
  violet: {
    badgeBg: "bg-violet-500",
    badgeText: "text-white",
    borderHover: "hover:border-violet-400",
    glowShadow: "hover:shadow-violet-500/15",
    pillBg: "bg-violet-50 text-violet-700 border-violet-200",
    buttonBg: "bg-violet-600 hover:bg-violet-700",
    accentText: "text-violet-700",
  },
};

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export function GradeCard({ grade }: GradeCardProps): React.ReactElement {
  const prefersReduced = useReducedMotion();
  const theme = COLOR_MAP[grade.color];
  const gradeKey = grade.id.toLowerCase();

  return (
    <motion.div
      layoutId={`grade-${gradeKey}`}
      variants={CARD_VARIANTS}
      whileHover={
        !prefersReduced
          ? {
              y: -4,
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : undefined
      }
      data-grade-card={gradeKey}
      className={`group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-xl ${theme.borderHover} ${theme.glowShadow}`}
    >
      <div>
        {/* Top Header: Grade Badge & Model Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center justify-center rounded-xl px-3 py-1 text-sm font-black shadow-xs ${theme.badgeBg} ${theme.badgeText}`}
            >
              {grade.shortLabel}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {grade.label}
            </span>
          </div>

          <div
            className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-0.5 text-[11px] font-bold ${theme.pillBg}`}
          >
            <span>{formatEasternNumber(grade.unitCount)} وحدة</span>
            <span className="text-slate-300">•</span>
            <span>{formatEasternNumber(grade.lessonCount)} درساً</span>
          </div>
        </div>

        {/* Visual Model Container */}
        <div className="mb-5 flex h-28 w-full items-center justify-center rounded-2xl bg-slate-50/70 p-3 border border-slate-100 group-hover:bg-slate-50/90 transition-colors">
          <motion.div
            className="flex h-full w-full items-center justify-center"
            whileHover={
              !prefersReduced
                ? {
                    scale: 1.05,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }
                : undefined
            }
          >
            <GradeCardVisualModel modelKey={grade.visualModel} />
          </motion.div>
        </div>

        {/* Grade Description */}
        <p className="text-xs font-semibold text-slate-600 leading-relaxed line-clamp-2 mb-6">
          {grade.descriptionAr}
        </p>
      </div>

      {/* Action Button: Enters Studio */}
      <Link
        href={`/math/${gradeKey}`}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-black text-white shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.buttonBg}`}
        aria-label={`دخول استوديو ${grade.label}`}
      >
        <span>تصفح استوديو {grade.label}</span>
        <span aria-hidden="true" className="text-base leading-none">
          ←
        </span>
      </Link>
    </motion.div>
  );
}

export default GradeCard;
