"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import type { GradeId } from "@/domain/types";
import {
  getGradeConfig,
  type GradeConfig,
  type GradeColorToken,
} from "@/config/grades";

interface GradeThemeContextValue {
  selectedGradeId: GradeId | null;
  gradeConfig: GradeConfig | null;
  setSelectedGradeId: (id: GradeId | null) => void;
  activeColorToken: GradeColorToken | "indigo";
}

const GradeThemeContext = createContext<GradeThemeContextValue | undefined>(
  undefined
);

export interface GradeThemeProviderProps {
  children: React.ReactNode;
  initialGradeId?: GradeId | null;
}

export function GradeThemeProvider({
  children,
  initialGradeId = null,
}: GradeThemeProviderProps): React.ReactElement {
  const [selectedGradeId, setSelectedGradeId] = useState<GradeId | null>(
    initialGradeId
  );

  const gradeConfig = useMemo(() => {
    return selectedGradeId ? (getGradeConfig(selectedGradeId) ?? null) : null;
  }, [selectedGradeId]);

  const activeColorToken: GradeColorToken | "indigo" =
    gradeConfig?.color ?? "indigo";

  const value = useMemo(
    () => ({
      selectedGradeId,
      gradeConfig,
      setSelectedGradeId,
      activeColorToken,
    }),
    [selectedGradeId, gradeConfig, activeColorToken]
  );

  return (
    <GradeThemeContext.Provider value={value}>
      {children}
    </GradeThemeContext.Provider>
  );
}

export function useGradeTheme(): GradeThemeContextValue {
  const context = useContext(GradeThemeContext);
  if (!context) {
    throw new Error("useGradeTheme must be used within a GradeThemeProvider");
  }
  return context;
}
