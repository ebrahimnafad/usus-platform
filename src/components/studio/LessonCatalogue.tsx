"use client";

import React, { useEffect, useRef } from "react";
import type { GradeId, Unit } from "@/domain/types";
import {
  highlightArabicMatch,
  type HighlightSegment,
} from "@/lib/arabic-search";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { ChevronDownIcon } from "@/components/studio/icons";

export interface LessonCatalogueProps {
  units: readonly Unit[];
  currentLessonNumber: number;
  currentGradeId: GradeId;
  query: string;
  expandedUnitNumbers: readonly number[];
  forceUnitsOpen?: boolean;
  scrollSignal?: string;
  onToggleUnit: (unitNumber: number) => void;
  onSelectLesson: (grade: GradeId, lessonNumber: number) => void;
  catalogueId?: string;
}

function HighlightedTitle({
  title,
  query,
}: {
  title: string;
  query: string;
}): React.ReactElement {
  const segments: HighlightSegment[] = highlightArabicMatch(title, query);
  return (
    <>
      {segments.map((segment, index) =>
        segment.matched ? (
          <mark
            key={`${segment.text}-${index}`}
            className="bg-transparent text-inherit underline decoration-amber-500 decoration-2 underline-offset-2"
          >
            {segment.text}
          </mark>
        ) : (
          <React.Fragment key={`${segment.text}-${index}`}>
            {segment.text}
          </React.Fragment>
        )
      )}
    </>
  );
}

/**
 * The browsing half of the panel. It is the only scrolling region, keeps unit
 * headers pinned, and reveals the active lesson without ever jumping on a
 * filter keystroke.
 */
export function LessonCatalogue({
  units,
  currentLessonNumber,
  currentGradeId,
  query,
  expandedUnitNumbers,
  forceUnitsOpen = false,
  scrollSignal,
  onToggleUnit,
  onSelectLesson,
  catalogueId = "studio-catalogue",
}: LessonCatalogueProps): React.ReactElement {
  const scrollerRef = useRef<HTMLElement | null>(null);
  const activeRowRef = useRef<HTMLButtonElement | null>(null);
  const pendingScrollRef = useRef(true);

  useEffect(() => {
    pendingScrollRef.current = true;
  }, [currentLessonNumber, scrollSignal]);

  useEffect(() => {
    if (!pendingScrollRef.current) return;
    const scroller = scrollerRef.current;
    const active = activeRowRef.current;
    if (!scroller || !active) return;
    // A concealed mobile sheet has no measurable scroller; keep the scroll
    // pending until the sheet opens and the active row can be located.
    if (scroller.clientHeight === 0) return;

    pendingScrollRef.current = false;
    const target =
      active.offsetTop -
      scroller.clientHeight / 2 +
      active.getBoundingClientRect().height / 2;
    scroller.scrollTo({ top: Math.max(0, target), behavior: "auto" });
  }, [currentLessonNumber, scrollSignal, expandedUnitNumbers, units]);

  return (
    <nav
      id={catalogueId}
      ref={scrollerRef}
      tabIndex={-1}
      aria-label="منهج الصف"
      data-studio-catalogue="true"
      className="studio-catalogue min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-4 outline-none [scrollbar-gutter:stable]"
    >
      <div className="space-y-1.5">
        {units.map((unit) => {
          const isOpen =
            forceUnitsOpen || expandedUnitNumbers.includes(unit.unitNumber);

          return (
            <section
              key={unit.unitNumber}
              data-unit-number={unit.unitNumber}
              data-unit-enrichment={unit.isEnrichment ? "true" : undefined}
              className="overflow-visible"
            >
              <button
                type="button"
                id={`studio-unit-${unit.unitNumber}-header`}
                onClick={() => onToggleUnit(unit.unitNumber)}
                aria-expanded={isOpen}
                aria-controls={`studio-unit-${unit.unitNumber}-lessons`}
                className="studio-unit-header sticky top-0 z-10 flex min-h-[32px] w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-right text-xs font-extrabold text-stone-800 transition-colors duration-150 hover:bg-stone-100/80"
              >
                <span className="flex min-w-0 flex-wrap items-center gap-1.5">
                  <ChevronDownIcon
                    size={14}
                    className={`shrink-0 text-stone-500 transition-transform duration-150 motion-reduce:transition-none ${
                      isOpen ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                  <span className="min-w-0">
                    الوحدة {formatEasternNumber(unit.unitNumber)}:{" "}
                    {toEasternArabicNumerals(unit.titleAr)}
                  </span>
                  {unit.isEnrichment && (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-900">
                      إثرائي *
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-[10px] font-bold text-stone-500 tabular-nums">
                  ({formatEasternNumber(unit.lessonRange[0])}–
                  {formatEasternNumber(unit.lessonRange[1])})
                </span>
              </button>

              {isOpen && (
                <div
                  id={`studio-unit-${unit.unitNumber}-lessons`}
                  className="mt-1 space-y-1 pb-1"
                >
                  {unit.lessons.map((lesson) => {
                    const isCurrent =
                      lesson.grade === currentGradeId &&
                      lesson.lessonNumber === currentLessonNumber;

                    return (
                      <button
                        key={lesson.id}
                        ref={isCurrent ? activeRowRef : undefined}
                        type="button"
                        data-lesson-item={toEasternArabicNumerals(lesson.id)}
                        data-active={isCurrent ? "true" : "false"}
                        aria-current={isCurrent ? "page" : undefined}
                        onClick={() =>
                          onSelectLesson(lesson.grade, lesson.lessonNumber)
                        }
                        className={`group relative flex min-h-[46px] w-full items-start gap-2 overflow-hidden rounded-lg py-1.5 pe-2 ps-2.5 text-right transition-colors duration-150 motion-reduce:transition-none ${
                          isCurrent
                            ? "studio-tint-surface border-s-2 border-solid bg-[var(--studio-accent-soft)] font-extrabold text-stone-900"
                            : "text-stone-700 hover:bg-stone-100/90"
                        }`}
                        style={
                          isCurrent
                            ? {
                                borderInlineStartColor: "var(--studio-accent)",
                              }
                            : undefined
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={`shrink-0 pt-0.5 text-[11px] font-bold tabular-nums ${
                            isCurrent
                              ? "text-[var(--studio-accent)]"
                              : "text-stone-400"
                          }`}
                        >
                          {formatEasternNumber(lesson.lessonNumber)}.
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="line-clamp-2 block text-xs leading-5">
                            <HighlightedTitle
                              title={toEasternArabicNumerals(lesson.titleAr)}
                              query={query}
                            />
                          </span>
                        </span>

                        <span className="flex shrink-0 items-center gap-1 pt-0.5">
                          {lesson.isCoPresented && (
                            <span
                              className="size-1.5 rounded-full bg-teal-500"
                              title="تقديم مشترك"
                              aria-label="تقديم مشترك"
                            />
                          )}
                          {lesson.isEnrichment && (
                            <span
                              className="size-1.5 rounded-full bg-amber-500"
                              title="إثرائي"
                              aria-label="إثرائي"
                            />
                          )}
                        </span>

                        <span className="pointer-events-none absolute inset-x-2 bottom-0.5 hidden flex-wrap items-center gap-1 rounded bg-[var(--studio-panel)]/95 px-1 py-0.5 group-hover:flex group-focus-visible:flex group-data-[active=true]:flex">
                          {lesson.standards.map((standard) => (
                            <span
                              key={standard}
                              data-standard-code="true"
                              className="rounded bg-stone-100 px-1 py-0.5 font-mono text-[9px] font-bold text-stone-500"
                            >
                              {standard}
                            </span>
                          ))}
                          {lesson.isCoPresented && (
                            <span className="rounded bg-teal-50 px-1 py-0.5 text-[9px] font-bold text-teal-800">
                              تقديم مشترك
                            </span>
                          )}
                          {lesson.isEnrichment && (
                            <span className="rounded bg-amber-50 px-1 py-0.5 text-[9px] font-bold text-amber-800">
                              إثرائي *
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </nav>
  );
}

export default LessonCatalogue;
