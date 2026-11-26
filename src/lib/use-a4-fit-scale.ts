"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export const A4_WIDTH_PX = 794; // 210mm at 96dpi

/**
 * Compute the scale factor needed to fit a 210mm (794px) A4 sheet inside a
 * narrower container (e.g. mobile viewports), clamping at 0.38 minimum.
 */
export function computeA4FitScale(
  containerWidthPx: number,
  enabled: boolean = true
): number {
  if (!enabled || containerWidthPx <= 0 || containerWidthPx >= A4_WIDTH_PX) {
    return 1;
  }
  return Math.max(0.38, containerWidthPx / A4_WIDTH_PX);
}

/**
 * Measure a container element and return the scale factor needed to fit a
 * 210mm A4 sheet within its width. Returns `1` when disabled or wide enough.
 */
export function useA4FitScale(enabled: boolean): {
  containerRef: RefObject<HTMLDivElement | null>;
  fitScale: number;
} {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);

  useEffect(() => {
    if (!enabled) {
      setFitScale(1);
      return;
    }

    const updateScale = () => {
      const container = containerRef.current;
      if (!container) return;
      setFitScale(computeA4FitScale(container.clientWidth, true));
    };

    updateScale();

    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      const observer = new ResizeObserver(updateScale);
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [enabled]);

  return { containerRef, fitScale };
}
