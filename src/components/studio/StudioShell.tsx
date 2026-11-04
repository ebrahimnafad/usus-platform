"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import type { Grade } from "@/domain/types";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { StudioHeader } from "@/components/math/studio-header";

interface StudioUiContextValue {
  pending: boolean;
  beginTuning: () => void;
  settle: () => void;
  insideShell: boolean;
}

const StudioUiContext = createContext<StudioUiContextValue>({
  pending: false,
  beginTuning: () => undefined,
  settle: () => undefined,
  insideShell: false,
});

export function useStudioUi(): StudioUiContextValue {
  return useContext(StudioUiContext);
}

export interface StudioShellProps {
  grade: Grade;
  panel: React.ReactNode;
  children: React.ReactNode;
  entranceFade?: boolean;
}

const PENDING_TIMEOUT_MS = 10_000;

export function StudioShell({
  grade,
  panel,
  children,
  entranceFade = true,
}: StudioShellProps): React.ReactElement {
  const prefersReduced = useReducedMotion();
  const [pending, setPending] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const settle = useCallback(() => {
    clearPendingTimeout();
    setPending(false);
  }, [clearPendingTimeout]);

  const beginTuning = useCallback(() => {
    clearPendingTimeout();
    setPending(true);
    timeoutRef.current = setTimeout(() => {
      setPending(false);
      timeoutRef.current = null;
    }, PENDING_TIMEOUT_MS);
  }, [clearPendingTimeout]);

  useEffect(() => clearPendingTimeout, [clearPendingTimeout]);

  const value = useMemo(
    () => ({ pending, beginTuning, settle, insideShell: true }),
    [pending, beginTuning, settle]
  );

  return (
    <StudioUiContext.Provider value={value}>
      <div
        dir="rtl"
        lang="ar"
        data-studio-root="true"
        className="studio-shell-root flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-stone-100"
      >
        <a
          href="#studio-worksheet-region"
          data-studio-skip-link="true"
          className="sr-only focus:not-sr-only focus:fixed focus:start-2 focus:top-2 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-extrabold focus:text-stone-900 focus:shadow-lg"
        >
          تخطَّ إلى ورقة العمل
        </a>

        <StudioHeader gradeId={grade.id} gradeLabel={grade.labelAr} />

        <motion.div
          data-studio-content="true"
          initial={
            entranceFade && !prefersReduced ? { opacity: 0 } : { opacity: 1 }
          }
          animate={{ opacity: 1 }}
          transition={
            !entranceFade || prefersReduced
              ? { duration: 0 }
              : { duration: 0.3, delay: 0.3, ease: "easeOut" }
          }
          className="studio-workspace flex min-h-0 flex-1 overflow-hidden"
        >
          {panel}

          <div
            data-studio-background="true"
            className="flex min-h-0 min-w-0 flex-1 flex-col"
          >
            {children}
          </div>
        </motion.div>
      </div>
    </StudioUiContext.Provider>
  );
}

export default StudioShell;
