"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Custom hook wrapping Framer Motion's `useReducedMotion()`.
 * Returns a strict boolean indicating whether the user prefers reduced motion.
 * Defaults to false on SSR or when prefers-reduced-motion is not set.
 */
export function useReducedMotion(): boolean {
  const prefersReduced = useFramerReducedMotion();
  return Boolean(prefersReduced);
}
