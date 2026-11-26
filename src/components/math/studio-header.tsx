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

const GRADIENT_MAP: Record<GradeColorToken, string> = {
  rose: "from-rose-600 to-rose-500",
  orange: "from-orange-600 to-orange-500",
  amber: "from-amber-600 to-amber-500",
  emerald: "from-emerald-600 to-emerald-500",
  sky: "from-sky-600 to-sky-500",
  violet: "from-violet-600 to-violet-500",
};

export function StudioHeader({
  gradeId,
  gradeLabel,
  className = "",
}: StudioHeaderProps): React.ReactElement {
  const config = getGradeConfig(gradeId);
  const color = config?.color ?? "indigo";
  const gradientClass =
    color in GRADIENT_MAP
      ? GRADIENT_MAP[color as GradeColorToken]
      : "from-indigo-600 to-indigo-500";
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
      className={`no-print sticky top-0 z-30 flex h-14 w-full items-center justify-between bg-gradient-to-l ${gradientClass} px-4 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.35)] backdrop-blur-md text-white ${className}`}
    >
      {/* Right side in RTL: Back button + Logo + Breadcrumbs */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <BackButton href="/math" ariaLabel="العودة لاختيار الصف" />

        <div className="h-5 w-px bg-white/25" aria-hidden="true" />

        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-full px-2 py-1 font-black text-white transition hover:bg-white/15"
          title="بوابة أُسُس"
        >
          <span className="text-base font-extrabold tracking-tight">أُسُس</span>
        </Link>

        <span className="text-white/40 font-bold">/</span>

        <Breadcrumbs
          segments={[
            { label: "الرئيسية", href: "/" },
            { label: "الرياضيات", href: "/math" },
            { label },
          ]}
          listClassName="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white/85"
          activeItemClassName="rounded-full bg-white/20 px-2.5 py-0.5 text-white font-extrabold"
          linkClassName="hover:text-white transition"
          separator={
            <span
              className="text-white/40 font-bold select-none"
              aria-hidden="true"
            >
              &gt;
            </span>
          }
        />
      </div>

      {/* Left side in RTL: Quick link + Visual Model Miniature Badge & Grade Title */}
      <div className="flex items-center gap-2">
        <Link
          href="/reading"
          className="hidden md:inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/90 transition hover:bg-white/25 hover:text-white"
        >
          <span>الفهم القرائي</span>
        </Link>
        <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-xs border border-white/25 shadow-2xs">
          {config && (
            <motion.div
              layoutId={!prefersReduced ? `grade-model-${gradeKey}` : undefined}
              data-model-layout-id={
                !prefersReduced ? `grade-model-${gradeKey}` : undefined
              }
              className="h-5 w-8 flex items-center justify-center overflow-hidden"
            >
              <GradeCardVisualModel modelKey={config.visualModel} />
            </motion.div>
          )}
          <motion.span
            layoutId={!prefersReduced ? `grade-badge-${gradeKey}` : undefined}
            data-badge-layout-id={
              !prefersReduced ? `grade-badge-${gradeKey}` : undefined
            }
            className="text-xs font-black text-white"
          >
            {config?.shortLabel ?? label}
          </motion.span>
        </div>
      </div>
    </motion.header>
  );
}

export default StudioHeader;
