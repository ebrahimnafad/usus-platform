"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  segments: BreadcrumbSegment[];
  ariaLabel?: string;
  separator?: React.ReactNode;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  linkClassName?: string;
  animated?: boolean;
}

export function Breadcrumbs({
  segments,
  ariaLabel = "التنقل",
  separator,
  className = "",
  listClassName = "flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500",
  itemClassName = "inline-flex items-center gap-1.5",
  activeItemClassName = "font-bold text-indigo-900",
  linkClassName = "transition hover:text-slate-800",
  animated = true,
}: BreadcrumbsProps): React.ReactElement {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  const defaultSeparator = (
    <span className="select-none text-slate-300 font-bold" aria-hidden="true">
      &gt;
    </span>
  );

  const activeSeparator = separator ?? defaultSeparator;

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ol className={listClassName}>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const showSeparator = index > 0;

          const content = isLast ? (
            <span aria-current="page" className={activeItemClassName}>
              {segment.label}
            </span>
          ) : segment.href ? (
            <Link href={segment.href} className={linkClassName}>
              {segment.label}
            </Link>
          ) : (
            <span className={linkClassName}>{segment.label}</span>
          );

          if (!shouldAnimate) {
            return (
              <li key={`${index}-${segment.label}`} className={itemClassName}>
                {showSeparator && activeSeparator}
                {content}
              </li>
            );
          }

          return (
            <motion.li
              key={`${index}-${segment.label}`}
              className={itemClassName}
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, delay: index * 0.03 }}
            >
              {showSeparator && activeSeparator}
              {content}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
