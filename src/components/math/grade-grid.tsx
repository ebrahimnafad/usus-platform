"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { GRADES, type GradeConfig } from "@/config/grades";
import { GradeCard } from "@/components/math/grade-card";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface GradeGridProps {
  grades?: readonly GradeConfig[];
}

export function GradeGrid({
  grades = GRADES,
}: GradeGridProps): React.ReactElement {
  const prefersReduced = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.05,
        delayChildren: prefersReduced ? 0 : 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
      data-grade-grid="true"
    >
      {grades.map((grade) => (
        <GradeCard key={grade.id} grade={grade} />
      ))}
    </motion.div>
  );
}

export default GradeGrid;
