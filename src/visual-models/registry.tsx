import React from "react";
import type { VisualModelKind, VisualModelSpec } from "@/domain/types";
import { EverydayObjectSvg } from "@/visual-models/everyday-objects";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export interface VisualModelRenderProps {
  model: VisualModelSpec;
  solved?: boolean;
}

export type VisualModelRenderer = (
  props: VisualModelRenderProps
) => React.ReactElement;

const visualModelRegistry = new Map<VisualModelKind, VisualModelRenderer>();

/**
 * Registers or overrides a renderer for a specific VisualModelKind.
 * Subsequent tickets (Tickets 02, 04, 05) can call `registerVisualModel` for new visual models.
 */
export function registerVisualModel(
  kind: VisualModelKind,
  renderer: VisualModelRenderer
): void {
  visualModelRegistry.set(kind, renderer);
}

export function getVisualModelRenderer(
  kind: VisualModelKind
): VisualModelRenderer | undefined {
  return visualModelRegistry.get(kind);
}

export function registerBuiltInVisualModels(): void {
  // Register built-in Everyday Object SVG Bank visual model (Ticket 01)
  // Enhanced to preserve `data-visual-model="everyday-object"` on grouped quantities
  // and highlight subitizable sub-groups (`secondaryCount`) when present (Lessons K-17..K-19).
  registerVisualModel("everyday-object", ({ model }) => {
    const primary = model.count ?? 1;
    const secondary = model.secondaryCount ?? 0;
    const total = primary + secondary;
    const effectiveSize = model.size ?? (total >= 4 ? "tiny" : "small");

    if (total <= 1) {
      return (
        <div
          className="inline-flex items-center gap-1"
          data-visual-model="everyday-object"
          data-object-id={model.id}
          data-count={formatEasternNumber(1)}
        >
          <EverydayObjectSvg
            objectId={model.id}
            size={model.size ?? "medium"}
          />
          <span className="text-[13px] font-bold leading-tight text-slate-700">
            {toEasternArabicNumerals(model.labelAr)}
          </span>
        </div>
      );
    }

    return (
      <div
        className="inline-flex items-center gap-1"
        data-visual-model="everyday-object"
        data-object-id={model.id}
        data-count={formatEasternNumber(total)}
      >
        <div
          className="flex shrink-0 items-center justify-center gap-0.5"
          data-visual-model="everyday-object-group"
          {...(secondary > 0
            ? {
                "data-subitize-parts": `${formatEasternNumber(
                  primary
                )}+${formatEasternNumber(secondary)}`,
              }
            : {})}
        >
          <div
            className={`flex shrink-0 items-center gap-0.5 ${
              secondary > 0
                ? "rounded-xl border border-dashed border-indigo-300 bg-indigo-50/40 px-1 py-0.5"
                : ""
            }`}
          >
            {Array.from({ length: primary }, (_, idx) => (
              <EverydayObjectSvg
                key={`p-${idx}`}
                objectId={model.id}
                size={effectiveSize}
              />
            ))}
          </div>
          {secondary > 0 && (
            <div className="flex shrink-0 items-center gap-0.5 rounded-xl border border-dashed border-amber-300 bg-amber-50/40 px-1 py-0.5">
              {Array.from({ length: secondary }, (_, idx) => (
                <EverydayObjectSvg
                  key={`s-${idx}`}
                  objectId={model.id}
                  size={effectiveSize}
                />
              ))}
            </div>
          )}
        </div>
        <span className="hidden text-[13px] font-bold leading-tight text-slate-700">
          {toEasternArabicNumerals(model.labelAr)}
        </span>
      </div>
    );
  });

  // Register Digit Card visual model
  registerVisualModel("digit-card", ({ model }) => {
    const digit = model.digit ?? model.count ?? 1;
    return (
      <div
        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-indigo-600 bg-indigo-50 text-[28px] font-extrabold leading-none text-indigo-900 shadow-xs"
        data-visual-model="digit-card"
      >
        {formatEasternNumber(digit)}
      </div>
    );
  });
}

export function VisualModelView({
  model,
  solved = false,
}: VisualModelRenderProps): React.ReactElement {
  const renderer = visualModelRegistry.get(model.kind);
  if (renderer) {
    return renderer({ model, solved });
  }

  return (
    <div
      className="inline-flex items-center justify-center rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-[13px] font-bold text-amber-900"
      data-visual-model={model.kind}
    >
      {toEasternArabicNumerals(model.labelAr)}
    </div>
  );
}
registerBuiltInVisualModels();
