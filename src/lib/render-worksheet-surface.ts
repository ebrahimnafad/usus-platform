import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type {
  GeneratedWorksheetBundle,
  RenderWorksheetSurfaceInput,
} from "@/domain/types";
import { generateWorksheet } from "@/engine/worksheet-engine";
import { WorksheetSurface } from "@/components/worksheet/WorksheetSurface";

export interface RenderedWorksheetSurface {
  bundle: GeneratedWorksheetBundle;
  html: string;
}

export function renderWorksheetSurfaceDocument(
  input: RenderWorksheetSurfaceInput
): RenderedWorksheetSurface {
  const bundle = generateWorksheet(input);
  const html = renderToStaticMarkup(
    React.createElement(WorksheetSurface, {
      bundle,
      viewMode: input.viewMode,
    })
  );
  return { bundle, html };
}

export function renderWorksheetSurface(
  input: RenderWorksheetSurfaceInput
): string {
  return renderWorksheetSurfaceDocument(input).html;
}
