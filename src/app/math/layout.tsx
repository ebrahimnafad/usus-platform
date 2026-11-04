"use client";

import React from "react";
import { LayoutGroup, AnimatePresence } from "framer-motion";
import { GradeThemeProvider } from "@/components/math/grade-theme-context";

export default function MathLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <GradeThemeProvider>
      <LayoutGroup id="math-navigation">
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </LayoutGroup>
    </GradeThemeProvider>
  );
}
