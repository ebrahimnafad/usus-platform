"use client";

import React from "react";
import { LayoutGroup, AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { GradeThemeProvider } from "@/components/math/grade-theme-context";

export default function MathLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const pathname = usePathname();
  return (
    <GradeThemeProvider>
      <LayoutGroup id="math-navigation">
        <AnimatePresence mode="wait">
          <motion.div key={pathname} style={{ minHeight: "100%" }}>
            {children}
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>
    </GradeThemeProvider>
  );
}
