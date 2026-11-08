import type { ColorThemeId, Shape2DId, Solid3DId } from "@/domain/types";

/**
 * One category run on a multi-category Ten Frame: a flat shape or a solid,
 * always paired with its fixed category color so the page still reads in
 * grayscale (constitution §2.5).
 */
export interface TenFrameCategoryDef {
  shapeId?: Shape2DId;
  solidId?: Solid3DId;
  colorTheme?: ColorThemeId;
}

/** A category run with an optional pinned count (SubitizePartWhole cards). */
export type TenFrameCountedCategory = TenFrameCategoryDef & { count?: number };

/** A pinned set of 2 or 3 category runs (MATCHING pairs, three-parts trios). */
export interface TenFrameCategorySet {
  id: string;
  categories: TenFrameCategoryDef[];
}

/** A category set of counted runs seeded by SubitizePartWhole. */
export interface TenFrameCountedCategorySet {
  id: string;
  categories: TenFrameCountedCategory[];
}

/**
 * Shared category pairs/trios for Unit 7 (K-75–K-77). Category 1 = blue (sky),
 * 2 = red (coral), 3 = green (emerald) — one fixed coding that MATCHING cards,
 * three-parts cards, and authored blueprints all reference, so the categories
 * never re-tint between exercises.
 */
export const SQUARE_CIRCLE_SET: TenFrameCategorySet = {
  id: "square-circle",
  categories: [
    { shapeId: "square", colorTheme: "sky" },
    { shapeId: "circle", colorTheme: "coral" },
  ],
};

export const TRIANGLE_SQUARE_CIRCLE_SET: TenFrameCategorySet = {
  id: "triangle-square-circle",
  categories: [
    { shapeId: "triangle", colorTheme: "sky" },
    { shapeId: "square", colorTheme: "coral" },
    { shapeId: "circle", colorTheme: "emerald" },
  ],
};

export const TRIANGLE_HEXAGON_CIRCLE_SET: TenFrameCategorySet = {
  id: "triangle-hexagon-circle",
  categories: [
    { shapeId: "triangle", colorTheme: "sky" },
    { shapeId: "hexagon", colorTheme: "coral" },
    { shapeId: "circle", colorTheme: "emerald" },
  ],
};

export const CUBE_CONE_CYLINDER_SET: TenFrameCategorySet = {
  id: "cube-cone-cylinder",
  categories: [
    { solidId: "cube", colorTheme: "sky" },
    { solidId: "cone", colorTheme: "coral" },
    { solidId: "cylinder", colorTheme: "emerald" },
  ],
};
