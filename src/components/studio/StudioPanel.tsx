"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import type {
  Grade,
  GradeId,
  ViewMode,
  WorksheetDifficultyMode,
} from "@/domain/types";
import {
  DIFFICULTY_OPTIONS,
  buildStudioSearchParams,
  formatGradePillLabelAr,
  mintNextStudioSeed,
} from "@/lib/studio-helpers";
import {
  filterUnitsForStudioSearch,
  summariseSearchResults,
} from "@/lib/arabic-search";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { getGradeAccents, getGradeConfig } from "@/config/grades";
import { LessonCatalogue } from "@/components/studio/LessonCatalogue";
import { UnitSpine } from "@/components/studio/UnitSpine";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CloseIcon,
  GripIcon,
  LinkIcon,
  MenuIcon,
  PaletteIcon,
  PanelCollapseIcon,
  PanelExpandIcon,
  RefreshIcon,
  SearchEmptyIcon,
  SearchIcon,
} from "@/components/studio/icons";

const RAIL_COOKIE = "studio_rail";
const MOBILE_BREAKPOINT = "(max-width: 1023px)";

export interface StudioPanelProps {
  grade: Grade;
  lessonNumber: number;
  seed: string;
  difficultyMode: WorksheetDifficultyMode;
  viewMode?: ViewMode;
  initialSearchQuery?: string;
  grades?: readonly Grade[];
  selectedGradeId?: GradeId;
  showGradePills?: boolean;
  expandAllUnitsByDefault?: boolean;
  initialRailCollapsed?: boolean;
  panelId?: string;
  onSelectLesson: (grade: GradeId, lessonNumber: number) => void;
  onSelectDifficulty: (mode: WorksheetDifficultyMode) => void;
  onRegenerateSeed: (nextSeed: string) => void;
  onSelectGrade?: (grade: GradeId) => void;
}

function gradeMonogram(grade: GradeId): string {
  return grade === "K" ? "K" : formatEasternNumber(Number(grade));
}

function writeRailCookie(collapsed: boolean): void {
  if (typeof document === "undefined") return;
  document.cookie = `${RAIL_COOKIE}=${
    collapsed ? "1" : "0"
  }; path=/; max-age=31536000; samesite=lax`;
}

/**
 * The curriculum cockpit and catalogue. Pure props in, intents out: no router
 * hooks, no global store, and no knowledge of how the canvas is generated.
 */
export function StudioPanel({
  grade,
  lessonNumber,
  seed,
  difficultyMode,
  viewMode = "worksheet",
  initialSearchQuery = "",
  grades = [],
  selectedGradeId,
  showGradePills = false,
  expandAllUnitsByDefault = false,
  initialRailCollapsed = false,
  panelId = "studio-panel",
  onSelectLesson,
  onSelectDifficulty,
  onRegenerateSeed,
  onSelectGrade,
}: StudioPanelProps): React.ReactElement {
  const gradeConfig = getGradeConfig(grade.id);
  const accents = getGradeAccents(gradeConfig?.color);
  const monogram = gradeMonogram(grade.id);
  const bodyId = `${panelId}-body`;
  const searchId = `${panelId}-search`;
  const difficultyLabelId = `${panelId}-difficulty-label`;
  const difficultyExplainerId = `${panelId}-difficulty-explainer`;

  const currentLesson =
    grade.lessons.find((lesson) => lesson.lessonNumber === lessonNumber) ??
    grade.lessons[0];
  const currentUnit =
    grade.units.find((unit) => unit.unitNumber === currentLesson?.unitNumber) ??
    grade.units[0];
  const currentUnitNumber = currentUnit?.unitNumber ?? 1;

  const [query, setQuery] = useState(initialSearchQuery);
  const [expandedUnitNumbers, setExpandedUnitNumbers] = useState<number[]>(
    () =>
      expandAllUnitsByDefault
        ? grade.units.map((unit) => unit.unitNumber)
        : [currentUnit?.unitNumber ?? 1]
  );
  const [pendingDifficulty, setPendingDifficulty] =
    useState<WorksheetDifficultyMode | null>(null);
  const [pendingSeed, setPendingSeed] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<"code" | "link" | null>(
    null
  );
  const [railCollapsed, setRailCollapsed] = useState(initialRailCollapsed);
  const [isMobile, setIsMobile] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetHeight, setSheetHeight] = useState<40 | 88>(88);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const searchRef = useRef<HTMLInputElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const expandRailRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const regenStep = useRef(1);
  const dragState = useRef<{ startY: number; startHeight: number } | null>(
    null
  );

  const shownDifficulty = pendingDifficulty ?? difficultyMode;
  const shownSeed = pendingSeed ?? seed;
  const selectedDifficulty =
    DIFFICULTY_OPTIONS.find((option) => option.value === shownDifficulty) ??
    DIFFICULTY_OPTIONS[0];

  useEffect(() => {
    if (pendingDifficulty !== null && pendingDifficulty === difficultyMode) {
      setPendingDifficulty(null);
    }
  }, [difficultyMode, pendingDifficulty]);

  useEffect(() => {
    if (pendingSeed !== null && pendingSeed === seed) {
      setPendingSeed(null);
    }
  }, [seed, pendingSeed]);

  // A lesson can cross into a unit the teacher had collapsed. Open that unit
  // so the active row is findable, without undoing manual collapses otherwise.
  useEffect(() => {
    setExpandedUnitNumbers((previous) =>
      previous.includes(currentUnitNumber)
        ? previous
        : [...previous, currentUnitNumber]
    );
  }, [currentUnitNumber]);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_BREAKPOINT);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onPopState = () => setSheetOpen(false);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const inField =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        Boolean(target?.isContentEditable);
      if (inField) return;
      event.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeSheet = useCallback(
    (options?: { restoreFocus?: boolean; syncHistory?: boolean }) => {
      const restoreFocus = options?.restoreFocus ?? true;
      const syncHistory = options?.syncHistory ?? true;
      setSheetOpen(false);
      if (syncHistory) {
        const state = window.history.state as {
          __studioSheet?: boolean;
        } | null;
        if (state?.__studioSheet) window.history.back();
      }
      if (restoreFocus) {
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    },
    []
  );

  const openSheet = useCallback(() => {
    setSheetHeight(88);
    setSheetOpen(true);
    window.history.pushState(
      { ...(window.history.state ?? {}), __studioSheet: true },
      ""
    );
  }, []);

  useEffect(() => {
    if (!sheetOpen || !isMobile) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);

    focusable()[0]?.focus();

    const backgrounds = Array.from(
      document.querySelectorAll<HTMLElement>("[data-studio-background]")
    );
    for (const background of backgrounds) background.inert = true;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSheet();
        return;
      }
      if (event.key !== "Tab") return;
      const elements = focusable();
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      for (const background of backgrounds) background.inert = false;
    };
  }, [sheetOpen, isMobile, closeSheet]);

  const visibleUnits = useMemo(
    () => filterUnitsForStudioSearch(grade.units, query),
    [grade.units, query]
  );
  const summary = useMemo(
    () => summariseSearchResults(visibleUnits),
    [visibleUnits]
  );
  const matchedUnitNumbers = useMemo(
    () => visibleUnits.map((unit) => unit.unitNumber),
    [visibleUnits]
  );
  const allUnitsExpanded = expandedUnitNumbers.length >= grade.units.length;
  const activeScrollSignal = `${lessonNumber}:${currentUnitNumber}:${
    isMobile && !sheetOpen ? "concealed" : "visible"
  }`;

  const toggleUnit = (unitNumber: number) => {
    setExpandedUnitNumbers((previous) =>
      previous.includes(unitNumber)
        ? previous.filter((value) => value !== unitNumber)
        : [...previous, unitNumber]
    );
  };

  const handleToggleAllUnits = () => {
    setExpandedUnitNumbers(
      allUnitsExpanded
        ? [currentUnit?.unitNumber ?? 1]
        : grade.units.map((unit) => unit.unitNumber)
    );
  };

  const selectLesson = (targetGrade: GradeId, targetLesson: number) => {
    onSelectLesson(targetGrade, targetLesson);
    if (sheetOpen) {
      closeSheet({ restoreFocus: false, syncHistory: false });
    }
  };

  const selectUnitFromSpine = (unitNumber: number) => {
    if (!visibleUnits.some((unit) => unit.unitNumber === unitNumber)) {
      setQuery("");
    }
    setExpandedUnitNumbers((previous) =>
      previous.includes(unitNumber) ? previous : [...previous, unitNumber]
    );
    requestAnimationFrame(() => {
      document
        .getElementById(`studio-unit-${unitNumber}-header`)
        ?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  };

  const selectDifficulty = (mode: WorksheetDifficultyMode) => {
    if (mode === shownDifficulty) return;
    setPendingDifficulty(mode);
    onSelectDifficulty(mode);
  };

  const handleRegenerate = () => {
    const nextSeed = mintNextStudioSeed(seed, regenStep.current);
    regenStep.current += 1;
    setPendingSeed(nextSeed);
    onRegenerateSeed(nextSeed);
  };

  const showCopyFeedback = (kind: "code" | "link") => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    setCopyFeedback(kind);
    feedbackTimer.current = setTimeout(() => setCopyFeedback(null), 1200);
  };

  const copyText = async (text: string, kind: "code" | "link") => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback(kind);
    } catch {
      // Clipboard access is optional; failure stays silent and selectable.
    }
  };

  const shareUrl = () => {
    const params = buildStudioSearchParams({
      grade: grade.id,
      lessonNumber,
      seed: shownSeed,
      difficultyLevel: shownDifficulty,
      viewMode,
    });
    if (typeof window === "undefined") {
      return `/math/${grade.id.toLowerCase()}?${params.toString()}`;
    }
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };

  const toggleRail = () => {
    const next = !railCollapsed;
    setRailCollapsed(next);
    writeRailCookie(next);
    if (next) {
      requestAnimationFrame(() => expandRailRef.current?.focus());
    }
  };

  const handleSearchEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    setQuery("");
    requestAnimationFrame(() => {
      document.getElementById(`${panelId}-catalogue`)?.focus();
    });
  };

  const dragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    dragState.current = {
      startY: event.clientY,
      startHeight: sheetHeight,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const dragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    const delta =
      ((dragState.current.startY - event.clientY) / window.innerHeight) * 100;
    const next = Math.min(
      88,
      Math.max(30, dragState.current.startHeight + delta)
    );
    setSheetHeight(next < 64 ? 40 : 88);
  };

  const dragEnd = () => {
    dragState.current = null;
  };

  const rail = (
    <div
      data-studio-rail="true"
      className="hidden h-full w-full flex-col items-center gap-3 py-3 lg:flex"
    >
      <button
        ref={expandRailRef}
        type="button"
        onClick={toggleRail}
        aria-label="توسيع لوحة المنهج"
        aria-expanded={false}
        aria-controls={bodyId}
        data-rail-toggle="true"
        className="flex size-9 items-center justify-center rounded-xl text-stone-600 transition-colors duration-150 hover:bg-stone-100"
      >
        <PanelExpandIcon size={18} />
      </button>

      <Link
        href="/math"
        aria-label="العودة إلى اختيار الصف"
        className="flex size-9 items-center justify-center rounded-xl border border-[var(--studio-seam)] text-sm font-black text-[var(--studio-accent)] transition-colors duration-150 hover:bg-stone-100"
      >
        {monogram}
      </Link>

      <div className="h-px w-8 bg-[var(--studio-seam)]" aria-hidden="true" />

      <span
        className="text-lg font-black tabular-nums text-[var(--studio-accent)]"
        aria-label={`الدرس الحالي ${formatEasternNumber(lessonNumber)}`}
      >
        {formatEasternNumber(lessonNumber)}
      </span>

      <span
        className="max-w-[56px] truncate font-mono text-[9px] font-bold text-stone-500"
        title={toEasternArabicNumerals(shownSeed)}
      >
        {toEasternArabicNumerals(shownSeed)}
      </span>
    </div>
  );

  const panelBody = (
    <div
      id={bodyId}
      className={`flex h-full min-h-0 flex-col ${
        railCollapsed ? "lg:hidden" : ""
      }`}
    >
      <div className="flex shrink-0 flex-col gap-2.5 px-3 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <PaletteIcon
              size={16}
              className="shrink-0 text-[var(--studio-accent)]"
            />
            <h1 className="truncate text-xs font-extrabold tracking-tight text-stone-800">
              استوديو المعلم لأوراق العمل
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={toggleRail}
              aria-label="طي لوحة المنهج"
              aria-expanded={!railCollapsed}
              aria-controls={bodyId}
              data-rail-toggle="true"
              className="hidden size-8 items-center justify-center rounded-lg text-stone-500 transition-colors duration-150 hover:bg-stone-100 lg:flex"
            >
              <PanelCollapseIcon size={17} />
            </button>
            <Link
              href="/math"
              aria-label="العودة إلى اختيار الصف"
              className="flex size-8 items-center justify-center rounded-lg border border-[var(--studio-seam)] text-xs font-black text-[var(--studio-accent)] transition-colors duration-150 hover:bg-stone-100"
            >
              {monogram}
            </Link>
          </div>
        </div>

        <section
          aria-label="الدرس الحالي"
          data-lesson-poster="true"
          className="rounded-[var(--studio-radius)] border border-[var(--studio-seam)] bg-white/65 p-2.5 shadow-[var(--studio-plate-shadow)]"
        >
          <p className="text-[11px] font-bold text-stone-500">
            الوحدة {formatEasternNumber(currentUnit?.unitNumber ?? 0)} ·{" "}
            {currentUnit?.titleAr}
          </p>
          <div className="mt-1.5 flex items-start gap-2.5">
            <span
              className="studio-tint-surface flex min-h-9 min-w-9 shrink-0 items-center justify-center rounded-lg px-1.5 text-lg font-black tabular-nums text-white"
              style={{ backgroundColor: "var(--studio-accent)" }}
              data-poster-lesson-number="true"
            >
              {formatEasternNumber(lessonNumber)}
            </span>
            <h2 className="line-clamp-2 pt-0.5 text-[15px] font-extrabold leading-5 text-stone-900">
              {toEasternArabicNumerals(currentLesson?.titleAr ?? "")}
            </h2>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1">
            {(currentLesson?.standards ?? []).map((standard) => (
              <span
                key={standard}
                data-standard-code="true"
                className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-stone-500"
              >
                {standard}
              </span>
            ))}
          </div>
        </section>

        {showGradePills && grades.length > 0 && (
          <div>
            <span className="mb-1 block text-[10px] font-extrabold text-stone-500">
              تغيير الصف
            </span>
            <div
              className="grid grid-cols-3 gap-1"
              role="group"
              aria-label="اختيار الصف الدراسي"
            >
              {grades.map((candidate) => {
                const active = candidate.id === (selectedGradeId ?? grade.id);
                return (
                  <button
                    key={candidate.id}
                    type="button"
                    data-grade-pill={candidate.id}
                    onClick={() => {
                      onSelectGrade?.(candidate.id);
                      setExpandedUnitNumbers([1]);
                    }}
                    className={`min-h-7 rounded-lg px-1 py-1 text-[10px] font-extrabold transition-colors duration-150 ${
                      active
                        ? "text-white"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                    style={
                      active
                        ? { backgroundColor: "var(--studio-accent)" }
                        : undefined
                    }
                  >
                    {formatGradePillLabelAr(candidate)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <span
            id={difficultyLabelId}
            className="mb-1 block text-[11px] font-extrabold text-stone-700"
          >
            نمط الصعوبة
          </span>
          <div
            className="grid grid-cols-4 gap-1"
            role="group"
            aria-labelledby={difficultyLabelId}
            aria-describedby={difficultyExplainerId}
          >
            {DIFFICULTY_OPTIONS.map((option) => {
              const isSelected = shownDifficulty === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  data-difficulty-option={option.value}
                  aria-pressed={isSelected}
                  onClick={() => selectDifficulty(option.value)}
                  className={`min-h-8 rounded-lg px-1 py-1 text-[11px] font-extrabold transition-colors duration-150 motion-reduce:transition-none ${
                    isSelected
                      ? "studio-tint-surface text-white shadow-xs"
                      : "bg-white text-stone-700 hover:bg-stone-100"
                  }`}
                  style={
                    isSelected
                      ? { backgroundColor: "var(--studio-accent)" }
                      : undefined
                  }
                >
                  {option.labelAr}
                </button>
              );
            })}
          </div>
          <p
            id={difficultyExplainerId}
            data-difficulty-explainer="true"
            className="mt-1 min-h-4 text-[10px] font-semibold leading-4 text-stone-500"
          >
            {selectedDifficulty.explainerAr}
          </p>
        </div>

        <section
          aria-label="رمز الورقة"
          data-seed-ticket="true"
          title="نفس الرمز = نفس الورقة"
          className="rounded-xl border border-dashed border-stone-300 bg-white/55 px-2.5 py-2"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="text-[10px] font-extrabold text-stone-500">
                رمز الورقة
              </span>
              <button
                type="button"
                onClick={() => copyText(shownSeed, "code")}
                aria-label="نسخ رمز الورقة"
                className="min-h-6 min-w-0 truncate rounded bg-white px-1.5 py-0.5 font-mono text-[11px] font-extrabold text-stone-800 transition-colors duration-150 hover:bg-stone-100"
              >
                <span data-seed-badge="true">
                  {toEasternArabicNumerals(shownSeed)}
                </span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => copyText(shareUrl(), "link")}
              aria-label="نسخ رابط الورقة"
              className="flex size-7 shrink-0 items-center justify-center rounded-lg text-stone-500 transition-colors duration-150 hover:bg-stone-100 hover:text-stone-800"
            >
              <LinkIcon size={15} />
            </button>
          </div>

          <div className="mt-0.5 flex h-4 items-center gap-1 text-[10px] font-bold text-emerald-700">
            {copyFeedback && <CheckIcon size={12} />}
            <span data-copy-feedback="true" aria-live="polite">
              {copyFeedback === "code"
                ? "تم نسخ الرمز"
                : copyFeedback === "link"
                  ? "تم نسخ الرابط"
                  : ""}
            </span>
          </div>

          <button
            type="button"
            data-regenerate-seed="true"
            onClick={handleRegenerate}
            className="mt-1 flex min-h-8 w-full items-center justify-center gap-1.5 rounded-lg border border-stone-200 bg-white text-[11px] font-extrabold text-stone-700 transition-colors duration-150 hover:bg-stone-100"
          >
            <RefreshIcon size={13} />
            توليد نموذج جديد
          </button>
        </section>

        <UnitSpine
          units={grade.units}
          currentUnitNumber={currentUnit?.unitNumber ?? 1}
          matchedUnitNumbers={query.trim() ? matchedUnitNumbers : []}
          allExpanded={allUnitsExpanded}
          onSelectUnit={selectUnitFromSpine}
          onToggleAllUnits={handleToggleAllUnits}
        />

        <div>
          <div className="relative">
            <SearchIcon
              size={15}
              className="pointer-events-none absolute inset-y-0 start-2.5 my-auto text-stone-400"
            />
            <input
              id={searchId}
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleSearchEscape}
              placeholder="ابحث بعنوان الدرس أو المعيار"
              aria-label="بحث في الدروس والمعايير"
              data-studio-search="true"
              className="min-h-9 w-full rounded-xl border border-[var(--studio-seam)] bg-white py-1.5 pe-8 ps-8 text-xs font-semibold text-stone-900 placeholder:text-stone-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                aria-label="مسح البحث"
                className="absolute inset-y-0 end-1 my-auto flex size-7 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700"
              >
                <CloseIcon size={13} />
              </button>
            )}
          </div>

          {query.trim() && visibleUnits.length > 0 && (
            <p
              data-search-count="true"
              aria-live="polite"
              className="mt-1 px-1 text-[10px] font-bold text-stone-500"
            >
              {summary.labelAr}
            </p>
          )}
        </div>
      </div>

      {query.trim() && visibleUnits.length === 0 ? (
        <div
          data-search-empty="true"
          className="mx-3 my-3 flex flex-col items-center gap-1 rounded-xl border border-dashed border-stone-300 px-3 py-5 text-center"
        >
          <SearchEmptyIcon size={22} className="text-stone-400" />
          <p className="text-xs font-extrabold text-stone-700">
            لا توجد نتائج لـ «{query}»
          </p>
          <p className="text-[10px] font-semibold leading-4 text-stone-500">
            جرّب رمز المعيار بدون نقاط، مثل K.G.4
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              searchRef.current?.focus();
            }}
            className="mt-1 min-h-7 rounded-lg px-3 text-[11px] font-extrabold text-white"
            style={{ backgroundColor: "var(--studio-accent)" }}
          >
            مسح البحث
          </button>
        </div>
      ) : (
        <LessonCatalogue
          units={visibleUnits}
          currentLessonNumber={lessonNumber}
          currentGradeId={grade.id}
          query={query}
          expandedUnitNumbers={expandedUnitNumbers}
          forceUnitsOpen={query.trim().length > 0}
          scrollSignal={activeScrollSignal}
          onToggleUnit={toggleUnit}
          onSelectLesson={selectLesson}
          catalogueId={`${panelId}-catalogue`}
        />
      )}
    </div>
  );

  return (
    <>
      {sheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-950/40 lg:hidden"
          onClick={() => closeSheet()}
          aria-hidden="true"
          data-mobile-sheet-backdrop="true"
        />
      )}

      <aside
        ref={dialogRef}
        id={panelId}
        dir="rtl"
        lang="ar"
        data-studio-panel="true"
        data-hydrated={hydrated ? "true" : undefined}
        data-rail-collapsed={railCollapsed ? "true" : "false"}
        role={sheetOpen && isMobile ? "dialog" : undefined}
        aria-modal={sheetOpen && isMobile ? "true" : undefined}
        aria-label={sheetOpen && isMobile ? "المنهج" : undefined}
        className={`studio-panel no-print h-full min-h-0 shrink-0 flex-col border-e border-[var(--studio-seam)] bg-[var(--studio-panel)] text-stone-800 lg:flex ${
          railCollapsed ? "lg:w-[72px]" : "lg:w-96"
        } ${
          sheetOpen
            ? "studio-panel-sheet fixed inset-x-0 bottom-0 z-50 flex rounded-t-3xl shadow-2xl lg:static lg:z-auto lg:rounded-none lg:shadow-none"
            : "hidden"
        }`}
        style={
          {
            "--studio-accent": accents.accentHex,
            "--studio-accent-soft": accents.accentSoftHex,
            "--studio-sheet-height": `${sheetHeight}dvh`,
          } as React.CSSProperties
        }
      >
        {sheetOpen && (
          <div
            className="flex shrink-0 cursor-grab touch-none items-center justify-center py-2 lg:hidden"
            onPointerDown={dragStart}
            onPointerMove={dragMove}
            onPointerUp={dragEnd}
            onPointerCancel={dragEnd}
            data-sheet-drag-handle="true"
          >
            <GripIcon size={20} className="text-stone-400" />
          </div>
        )}

        {railCollapsed && rail}
        {panelBody}
      </aside>

      <div
        data-studio-mobile-bar="true"
        className="studio-mobile-bar no-print fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-2 border-t border-[var(--studio-seam)] bg-[var(--studio-panel)] px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_-12px_rgb(28_25_23_/_0.25)] lg:hidden"
      >
        <button
          ref={triggerRef}
          type="button"
          data-mobile-open-curriculum="true"
          onClick={() => (sheetOpen ? closeSheet() : openSheet())}
          aria-expanded={sheetOpen}
          aria-controls={panelId}
          className="flex min-h-10 items-center gap-1.5 rounded-xl border border-[var(--studio-seam)] px-3 text-xs font-extrabold text-stone-700"
        >
          <MenuIcon size={15} />
          المنهج
        </button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            data-mobile-prev-lesson="true"
            disabled={lessonNumber <= 1}
            aria-label={`الدرس السابق: ${
              grade.lessons.find(
                (lesson) => lesson.lessonNumber === lessonNumber - 1
              )?.titleAr ?? ""
            }`}
            onClick={() => selectLesson(grade.id, lessonNumber - 1)}
            className="flex size-10 items-center justify-center rounded-xl text-stone-600 disabled:opacity-35"
          >
            <ArrowRightIcon size={18} />
          </button>

          <span
            className="min-w-8 text-center text-sm font-black tabular-nums text-[var(--studio-accent)]"
            aria-label={`الدرس الحالي ${formatEasternNumber(lessonNumber)}`}
          >
            {formatEasternNumber(lessonNumber)}
          </span>

          <button
            type="button"
            data-mobile-next-lesson="true"
            disabled={lessonNumber >= 135}
            aria-label={`الدرس التالي: ${
              grade.lessons.find(
                (lesson) => lesson.lessonNumber === lessonNumber + 1
              )?.titleAr ?? ""
            }`}
            onClick={() => selectLesson(grade.id, lessonNumber + 1)}
            className="flex size-10 items-center justify-center rounded-xl text-stone-600 disabled:opacity-35"
          >
            <ArrowLeftIcon size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

export default StudioPanel;
