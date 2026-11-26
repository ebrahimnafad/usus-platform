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
    artGradient: string;
    badgeBg: string;
    badgeText: string;
    borderHover: string;
    glowShadow: string;
    buttonBg: string;
    titleText: string;
  }
> = {
  rose: {
    artGradient: "radial-gradient(circle at 50% 40%, #FFE4E6, #E2EEF6)",
    badgeBg: "bg-rose-500",
    badgeText: "text-white",
    borderHover: "hover:border-rose-300",
    glowShadow: "hover:shadow-[0_32px_60px_-24px_rgba(225,29,72,0.35)]",
    buttonBg:
      "bg-rose-600 hover:bg-rose-700 shadow-[0_12px_22px_-10px_rgba(225,29,72,0.7)]",
    titleText: "text-rose-950",
  },
  orange: {
    artGradient: "radial-gradient(circle at 50% 40%, #FFEDD5, #E2EEF6)",
    badgeBg: "bg-orange-500",
    badgeText: "text-white",
    borderHover: "hover:border-orange-300",
    glowShadow: "hover:shadow-[0_32px_60px_-24px_rgba(234,88,12,0.35)]",
    buttonBg:
      "bg-orange-600 hover:bg-orange-700 shadow-[0_12px_22px_-10px_rgba(234,88,12,0.7)]",
    titleText: "text-orange-950",
  },
  amber: {
    artGradient: "radial-gradient(circle at 50% 40%, #FEF3C7, #E2EEF6)",
    badgeBg: "bg-amber-500",
    badgeText: "text-white",
    borderHover: "hover:border-amber-300",
    glowShadow: "hover:shadow-[0_32px_60px_-24px_rgba(217,119,6,0.35)]",
    buttonBg:
      "bg-amber-600 hover:bg-amber-700 shadow-[0_12px_22px_-10px_rgba(217,119,6,0.7)]",
    titleText: "text-amber-950",
  },
  emerald: {
    artGradient: "radial-gradient(circle at 50% 40%, #D1FAE5, #E2EEF6)",
    badgeBg: "bg-emerald-500",
    badgeText: "text-white",
    borderHover: "hover:border-emerald-300",
    glowShadow: "hover:shadow-[0_32px_60px_-24px_rgba(5,150,105,0.35)]",
    buttonBg:
      "bg-emerald-600 hover:bg-emerald-700 shadow-[0_12px_22px_-10px_rgba(5,150,105,0.7)]",
    titleText: "text-emerald-950",
  },
  sky: {
    artGradient: "radial-gradient(circle at 50% 40%, #E0F2FE, #DCEAF5)",
    badgeBg: "bg-sky-500",
    badgeText: "text-white",
    borderHover: "hover:border-sky-300",
    glowShadow: "hover:shadow-[0_32px_60px_-24px_rgba(2,132,199,0.35)]",
    buttonBg:
      "bg-sky-600 hover:bg-sky-700 shadow-[0_12px_22px_-10px_rgba(2,132,199,0.7)]",
    titleText: "text-sky-950",
  },
  violet: {
    artGradient: "radial-gradient(circle at 50% 40%, #EDE9FE, #E2EEF6)",
    badgeBg: "bg-violet-500",
    badgeText: "text-white",
    borderHover: "hover:border-violet-300",
    glowShadow: "hover:shadow-[0_32px_60px_-24px_rgba(124,58,237,0.35)]",
    buttonBg:
      "bg-violet-600 hover:bg-violet-700 shadow-[0_12px_22px_-10px_rgba(124,58,237,0.7)]",
    titleText: "text-violet-950",
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
      layoutId={!prefersReduced ? `grade-${gradeKey}` : undefined}
      data-layout-id={!prefersReduced ? `grade-${gradeKey}` : undefined}
      variants={CARD_VARIANTS}
      whileHover={
        !prefersReduced
          ? {
              y: -5,
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : undefined
      }
      data-grade-card={gradeKey}
      className={`group relative flex flex-col overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_24px_48px_-24px_rgba(30,60,100,0.38)] transition-all duration-300 ${theme.borderHover} ${theme.glowShadow}`}
    >
      {/* Pastel Art Header matching Home Subject Cards */}
      <div
        className="relative flex h-40 w-full flex-col justify-between overflow-hidden rounded-t-[32px] px-5 pt-4 pb-8"
        style={{ background: theme.artGradient }}
      >
        <div className="relative z-10 flex items-center justify-between gap-2">
          <motion.span
            layoutId={!prefersReduced ? `grade-badge-${gradeKey}` : undefined}
            data-badge-layout-id={
              !prefersReduced ? `grade-badge-${gradeKey}` : undefined
            }
            className={`inline-flex items-center justify-center rounded-full px-3.5 py-1 text-xs font-black shadow-xs ${theme.badgeBg} ${theme.badgeText}`}
          >
            {grade.shortLabel}
          </motion.span>

          <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-slate-700 shadow-2xs">
            <span>{formatEasternNumber(grade.unitCount)} وحدة</span>
            <span className="text-slate-300">•</span>
            <span>{formatEasternNumber(grade.lessonCount)} درساً</span>
          </div>
        </div>

        <motion.div
          layoutId={!prefersReduced ? `grade-model-${gradeKey}` : undefined}
          data-model-layout-id={
            !prefersReduced ? `grade-model-${gradeKey}` : undefined
          }
          className="relative z-10 flex flex-1 items-center justify-center pt-1"
          whileHover={
            !prefersReduced
              ? {
                  scale: 1.06,
                  transition: { duration: 0.25, ease: "easeOut" },
                }
              : undefined
          }
        >
          <GradeCardVisualModel modelKey={grade.visualModel} />
        </motion.div>
      </div>

      {/* Curved Lip Body */}
      <div className="home-card-lip relative flex flex-1 flex-col justify-between bg-white px-6 pt-1 pb-6">
        <div>
          <h2 className={`mb-1.5 text-xl font-black ${theme.titleText}`}>
            {grade.label}
          </h2>
          <p className="mb-5 line-clamp-2 text-xs leading-relaxed font-semibold text-slate-600">
            {grade.descriptionAr}
          </p>
        </div>

        <Link
          href={`/math/${gradeKey}`}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-black text-white transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm ${theme.buttonBg}`}
          aria-label={`دخول استوديو ${grade.label}`}
        >
          <span>تصفح استوديو {grade.label}</span>
          <span aria-hidden="true" className="text-base leading-none">
            ←
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

export default GradeCard;
