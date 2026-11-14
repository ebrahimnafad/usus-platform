import React from "react";
import type { ColorThemeId, VisualModelSpec } from "@/domain/types";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { registerVisualModel } from "@/visual-models/registry";
import { EverydayObjectSvg } from "@/visual-models/everyday-objects";
import { Shape2DSvg, Solid3DSvg } from "@/visual-models/shapes-solids-coins";

/**
 * Linear Comparison Visual Model — Grade K Unit 9 (WORKSHEET_CONSTITUTION.md §3.4).
 *
 * Canonical size: 660 × 120 px (1-column only).
 * Two horizontal rows of objects aligned 1-to-1, right to left.
 *
 * - Grayscale cue (§2.5): Row A and Row B use distinct object shapes or 2D shapes,
 *   never differing by color alone.
 * - RTL fill (§9.3): Objects fill right-to-left; column 0 is rightmost.
 * - 1-to-1 alignment: Corresponding columns in Row A and Row B share exact horizontal
 *   alignment with subtle vertical pairing lines, making visual comparison immediate.
 * - Solved mode (§8.2): In the Answer Key, extra objects in the larger group are
 *   highlighted with accent background/border, and the winning group receives the circled state.
 */

export interface LinearComparisonGroupSpec {
  id: string;
  labelAr: string;
  count: number;
  iconKind?: "everyday-object" | "shape-2d" | "solid-3d";
  objectId?: string;
  shapeId?: string;
  /** `iconKind: "solid-3d"` (K-107/K-108 Problem of the Day): solid-shape icons */
  solidId?: string;
  colorTheme?: ColorThemeId;
}

export interface LinearComparisonSpecOptions {
  id?: string;
  labelAr?: string;
  groupA: LinearComparisonGroupSpec;
  groupB: LinearComparisonGroupSpec;
  targetComparison?: "more" | "fewer" | "equal";
  circledGroup?: "A" | "B" | "none";
  highlightExtras?: boolean;
}

export function createLinearComparisonSpec(
  options: LinearComparisonSpecOptions
): VisualModelSpec {
  const { groupA, groupB } = options;
  const countA = groupA.count;
  const countB = groupB.count;
  const moreGroup = countA > countB ? "A" : countB > countA ? "B" : "equal";
  const fewerGroup = countA < countB ? "A" : countB < countA ? "B" : "equal";
  const difference = Math.abs(countA - countB);

  const circledGroup =
    options.circledGroup ??
    (options.targetComparison === "fewer"
      ? fewerGroup === "equal"
        ? "none"
        : fewerGroup
      : moreGroup === "equal"
        ? "none"
        : moreGroup);

  return {
    kind: "linear-comparison",
    id: options.id ?? `linear-comp-${groupA.id}-${groupB.id}`,
    labelAr: options.labelAr ?? "نموذج المقارنة الخطّي",
    count: countA,
    secondaryCount: countB,
    meta: {
      groupA,
      groupB,
      moreGroup,
      fewerGroup,
      difference,
      circledGroup,
      highlightExtras: options.highlightExtras ?? true,
    },
  };
}

const SLOT_WIDTH = 48;
const SLOT_HEIGHT = 44;
const SLOT_GAP = 7;
const MAX_SLOTS = 10;

function renderGroupItem(
  group: LinearComparisonGroupSpec,
  slotIdx: number
): React.ReactElement {
  if (group.iconKind === "everyday-object" || group.objectId) {
    return (
      <EverydayObjectSvg objectId={group.objectId ?? "apple"} size="small" />
    );
  }
  if (group.iconKind === "shape-2d" || group.shapeId) {
    return (
      <Shape2DSvg
        shapeId={group.shapeId ?? "circle"}
        colorTheme={group.colorTheme ?? "sky"}
        size="small"
      />
    );
  }
  if (group.iconKind === "solid-3d" || group.solidId) {
    return (
      <Solid3DSvg
        solidId={group.solidId ?? "cube"}
        colorTheme={group.colorTheme ?? "sky"}
        size="small"
      />
    );
  }
  // Fallback: styled geometrical counter
  return (
    <svg width={32} height={32} viewBox="0 0 32 32">
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="#38BDF8"
        stroke="#0284C7"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export function LinearComparisonView({
  model,
  solved = false,
}: {
  model: VisualModelSpec;
  solved?: boolean;
}): React.ReactElement {
  const meta = (model.meta ?? {}) as Record<string, unknown>;
  const groupA = (meta.groupA as LinearComparisonGroupSpec | undefined) ?? {
    id: "A",
    labelAr: "المجموعة (أ)",
    count: model.count ?? 5,
    iconKind: "everyday-object",
    objectId: "apple",
    colorTheme: "coral",
  };
  const groupB = (meta.groupB as LinearComparisonGroupSpec | undefined) ?? {
    id: "B",
    labelAr: "المجموعة (ب)",
    count: model.secondaryCount ?? 3,
    iconKind: "everyday-object",
    objectId: "star",
    colorTheme: "amber",
  };

  const countA = groupA.count;
  const countB = groupB.count;
  const minCount = Math.min(countA, countB);
  const maxCount = Math.max(countA, countB);
  const circledGroup = (meta.circledGroup as "A" | "B" | "none") ?? "none";
  const isCircledA = solved && circledGroup === "A";
  const isCircledB = solved && circledGroup === "B";

  const slots = Array.from({ length: MAX_SLOTS }, (_, i) => i);

  return (
    <div
      dir="rtl"
      data-visual-model="linear-comparison"
      data-direction="rtl"
      data-count-a={formatEasternNumber(countA)}
      data-count-b={formatEasternNumber(countB)}
      className="relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-2xs select-none"
      style={{ width: "660px", height: "120px" }}
    >
      {/* 1-to-1 Pairing alignment guides (subtle dashed vertical lines) */}
      <svg
        viewBox="0 0 660 120"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {slots.map((idx) => {
          // Calculate right offset for slot center:
          // padding-right = 12px, badge-width = 54px, gap = 12px
          const rightOffset =
            12 + 54 + 12 + idx * (SLOT_WIDTH + SLOT_GAP) + SLOT_WIDTH / 2;
          const x = 660 - rightOffset;
          const isPaired = idx < minCount;
          return (
            <line
              key={idx}
              x1={x}
              y1={20}
              x2={x}
              y2={100}
              stroke={isPaired ? "#CBD5E1" : "#F1F5F9"}
              strokeWidth="1.5"
              strokeDasharray={isPaired ? "3 3" : "2 4"}
            />
          );
        })}
      </svg>

      {/* Row A */}
      <div
        className={`relative z-10 flex h-[48px] items-center gap-2 rounded-lg px-1 transition-colors ${
          isCircledA ? "bg-emerald-50/80 ring-2 ring-emerald-600 shadow-xs" : ""
        }`}
        data-linear-row="A"
        {...(isCircledA ? { "data-circled-group": "A" } : {})}
      >
        {/* Row A Badge */}
        <div
          className={`flex h-[38px] w-[54px] shrink-0 items-center justify-center rounded-lg border-2 text-[13px] font-extrabold leading-none ${
            isCircledA
              ? "border-emerald-600 bg-emerald-100 text-emerald-950"
              : "border-slate-300 bg-slate-50 text-slate-800"
          }`}
        >
          {toEasternArabicNumerals(groupA.labelAr)}
        </div>

        {/* Row A Items */}
        <div className="flex items-center gap-[7px]">
          {slots.map((idx) => {
            const hasItem = idx < countA;
            const isExtra =
              solved && countA > countB && idx >= countB && idx < countA;
            return (
              <div
                key={idx}
                className={`flex h-[42px] w-[48px] shrink-0 items-center justify-center rounded-lg transition-all ${
                  isExtra
                    ? "border-2 border-dashed border-amber-500 bg-amber-100/70 shadow-xs"
                    : hasItem
                      ? "border border-transparent"
                      : "border border-dashed border-slate-200/80 bg-slate-50/40"
                }`}
                {...(isExtra ? { "data-extra-item": "true" } : {})}
              >
                {hasItem ? renderGroupItem(groupA, idx) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Row B */}
      <div
        className={`relative z-10 flex h-[48px] items-center gap-2 rounded-lg px-1 transition-colors ${
          isCircledB ? "bg-emerald-50/80 ring-2 ring-emerald-600 shadow-xs" : ""
        }`}
        data-linear-row="B"
        {...(isCircledB ? { "data-circled-group": "B" } : {})}
      >
        {/* Row B Badge */}
        <div
          className={`flex h-[38px] w-[54px] shrink-0 items-center justify-center rounded-lg border-2 text-[13px] font-extrabold leading-none ${
            isCircledB
              ? "border-emerald-600 bg-emerald-100 text-emerald-950"
              : "border-slate-300 bg-slate-50 text-slate-800"
          }`}
        >
          {toEasternArabicNumerals(groupB.labelAr)}
        </div>

        {/* Row B Items */}
        <div className="flex items-center gap-[7px]">
          {slots.map((idx) => {
            const hasItem = idx < countB;
            const isExtra =
              solved && countB > countA && idx >= countA && idx < countB;
            return (
              <div
                key={idx}
                className={`flex h-[42px] w-[48px] shrink-0 items-center justify-center rounded-lg transition-all ${
                  isExtra
                    ? "border-2 border-dashed border-amber-500 bg-amber-100/70 shadow-xs"
                    : hasItem
                      ? "border border-transparent"
                      : "border border-dashed border-slate-200/80 bg-slate-50/40"
                }`}
                {...(isExtra ? { "data-extra-item": "true" } : {})}
              >
                {hasItem ? renderGroupItem(groupB, idx) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Self-register visual model
registerVisualModel("linear-comparison", ({ model, solved }) => {
  return <LinearComparisonView model={model} solved={solved} />;
});
