"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ChevronLeftIcon } from "@/components/studio/icons";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
  hideOnMobile?: boolean;
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
    <ChevronLeftIcon
      size={14}
      className="select-none text-slate-300"
      aria-hidden="true"
    />
  );

  const activeSeparator = separator ?? defaultSeparator;

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ol className={listClassName}>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const showSeparator = index > 0;
          const hideLeadingSeparatorOnMobile =
            showSeparator &&
            !segment.hideOnMobile &&
            segments.slice(0, index).every((s) => s.hideOnMobile);
          const liClassName = segment.hideOnMobile
            ? /\binline-flex\b/.test(itemClassName)
              ? itemClassName.replace(
                  /\binline-flex\b/,
                  "hidden sm:inline-flex"
                )
              : `hidden sm:inline-flex ${itemClassName}`
            : itemClassName;
          const renderedSeparator = showSeparator ? (
            hideLeadingSeparatorOnMobile ? (
              <span className="hidden sm:inline">{activeSeparator}</span>
            ) : (
              activeSeparator
            )
          ) : null;

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
              <li key={`${index}-${segment.label}`} className={liClassName}>
                {renderedSeparator}
                {content}
              </li>
            );
          }

          return (
            <motion.li
              key={`${index}-${segment.label}`}
              className={liClassName}
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, delay: index * 0.03 }}
            >
              {renderedSeparator}
              {content}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
