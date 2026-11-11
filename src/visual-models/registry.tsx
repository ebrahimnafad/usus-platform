import React from "react";
import { ANSWER_SLOT_SIZE_CLASS } from "@/components/worksheet/AnswerSlot";
import type { VisualModelKind, VisualModelSpec } from "@/domain/types";
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
  if (!visualModelRegistry.has("digit-card")) {
    registerVisualModel("digit-card", ({ model }) => {
      const digit = model.digit ?? model.count ?? 1;
      return (
        <div
          className={`inline-flex ${ANSWER_SLOT_SIZE_CLASS} items-center justify-center rounded-2xl border-2 border-indigo-600 bg-indigo-50 text-[28px] font-extrabold leading-none text-indigo-900 shadow-xs`}
          data-visual-model="digit-card"
        >
          {formatEasternNumber(digit)}
        </div>
      );
    });
  }
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
