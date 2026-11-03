import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { RenderWorksheetSurfaceInput } from "@/domain/types";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";

export function renderWorksheetSurface(
  input: RenderWorksheetSurfaceInput
): string {
  const bundle = generateWorksheet(input);
  return renderToStaticMarkup(
    React.createElement(WorksheetSurface, {
      bundle,
      viewMode: input.viewMode,
    })
  );
}
