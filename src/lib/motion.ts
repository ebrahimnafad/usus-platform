export { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Standard Framer Motion transition curves and durations for the Usus platform.
 */
export const MOTION_TRANSITIONS = {
  springGentle: {
    type: "spring",
    stiffness: 260,
    damping: 24,
  },
  heroTransition: {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1], // easeOutExpo
  },
  fadeStagger: {
    staggerChildren: 0.05,
    delayChildren: 0.05,
  },
} as const;
