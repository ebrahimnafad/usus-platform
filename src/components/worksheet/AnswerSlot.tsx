import type { ReactElement, ReactNode } from "react";

/**
 * Single writing target for a one-digit answer.
 * 48px ≈ 12.7mm at 96 DPI: large enough for a kindergarten pencil grip and
 * identical across every archetype. See GLOSSARY.md → Answer Slot.
 */
export const ANSWER_SLOT_SIZE_CLASS = "h-12 w-12";

/** Free-response line for a short written explanation. */
export const ANSWER_LINE_SIZE_CLASS = "h-8 w-40";

export type AnswerSlotTone = "indigo" | "sky" | "amber" | "slate";

const SLOT_TONES: Record<AnswerSlotTone, string> = {
  indigo: "border-indigo-400 bg-indigo-50/30",
  sky: "border-sky-500 bg-white",
  amber: "border-amber-500 bg-white",
  slate: "border-slate-300 bg-white",
};

/**
 * - `unknown`: the slot is a missing value inside a mathematical model, so it
 *   carries the Arabic question mark `؟`.
 * - `write`: the child reproduces a known digit or writes freehand, so the
 *   slot stays blank. Printing a glyph there would compete with the pencil
 *   stroke and, in tracing exercises, become a second shape to copy.
 */
export type AnswerSlotKind = "unknown" | "write";

export interface AnswerSlotProps {
  solved: boolean;
  answer?: ReactNode;
  ariaLabel: string;
  kind?: AnswerSlotKind;
  tone?: AnswerSlotTone;
  className?: string;
  solvedClassName?: string;
  solvedDataAttributes?: Record<string, string>;
}

export function AnswerSlot({
  solved,
  answer,
  ariaLabel,
  kind = "unknown",
  tone = "indigo",
  className = "",
  solvedClassName,
  solvedDataAttributes,
}: AnswerSlotProps): ReactElement {
  if (solved) {
    return (
      <span
        data-answer-slot="solved-digit"
        className={`inline-flex ${ANSWER_SLOT_SIZE_CLASS} shrink-0 items-center justify-center rounded-2xl text-xl font-black shadow-xs ${
          solvedClassName ?? "bg-emerald-600 text-white"
        } ${className}`}
        {...(solvedDataAttributes ?? {})}
      >
        {answer}
      </span>
    );
  }

  return (
    <span
      data-answer-slot={kind}
      role="img"
      aria-label={ariaLabel}
      className={`inline-flex ${ANSWER_SLOT_SIZE_CLASS} shrink-0 items-center justify-center rounded-2xl border-2 border-dashed text-xl font-black leading-none ${SLOT_TONES[tone]} ${className}`}
    >
      {kind === "unknown" ? (
        <span aria-hidden="true" className="text-slate-400">
          ؟
        </span>
      ) : null}
    </span>
  );
}

export interface AnswerLineProps {
  solved: boolean;
  answer?: ReactNode;
  ariaLabel?: string;
  solvedDataAttributes?: Record<string, string>;
}

/**
 * Free-response slot for a short written explanation. It never carries `؟`:
 * the child writes words, not a missing value.
 */
export function AnswerLine({
  solved,
  answer,
  ariaLabel = "سطر كتابة الإجابة",
  solvedDataAttributes,
}: AnswerLineProps): ReactElement {
  if (solved) {
    return (
      <span
        data-answer-slot="solved-line"
        className="rounded-lg bg-emerald-600 px-2.5 py-1 text-white"
        {...(solvedDataAttributes ?? {})}
      >
        الإجابة: {answer}
      </span>
    );
  }

  return (
    <span
      data-answer-slot="line"
      role="img"
      aria-label={ariaLabel}
      className={`inline-block ${ANSWER_LINE_SIZE_CLASS} rounded-lg border-2 border-dashed border-amber-400 bg-white`}
    />
  );
}
