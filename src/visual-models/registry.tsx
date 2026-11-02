import React from "react";
import type { VisualModelKind, VisualModelSpec } from "@/domain/types";
import { EverydayObjectSvg } from "@/visual-models/everyday-objects";
import { formatEasternNumber } from "@/lib/numerals";

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

// Register built-in Everyday Object SVG Bank visual model (Ticket 01)
registerVisualModel("everyday-object", ({ model }) => {
  const count = model.count ?? 1;
  if (count <= 1) {
    return (
      <div className="inline-flex flex-col items-center gap-1" data-visual-model="everyday-object" data-object-id={model.id}>
        <EverydayObjectSvg objectId={model.id} size={model.size ?? "medium"} />
        <span className="text-xs font-bold text-slate-700">{model.labelAr}</span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-center gap-1" data-visual-model="everyday-object-group" data-object-id={model.id}>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {Array.from({ length: count }, (_, idx) => (
          <EverydayObjectSvg key={idx} objectId={model.id} size={model.size ?? "small"} />
        ))}
      </div>
      <span className="text-xs font-bold text-slate-700">{model.labelAr}</span>
    </div>
  );
});

// Register Digit Card visual model
registerVisualModel("digit-card", ({ model }) => {
  const digit = model.digit ?? model.count ?? 1;
  return (
    <div
      className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-indigo-600 bg-indigo-50 text-2xl font-extrabold text-indigo-900 shadow-xs"
      data-visual-model="digit-card"
    >
      {formatEasternNumber(digit)}
    </div>
  );
});

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
      className="inline-flex items-center justify-center rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900"
      data-visual-model={model.kind}
    >
      {model.labelAr}
    </div>
  );
}
