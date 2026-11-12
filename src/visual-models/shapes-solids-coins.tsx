import React from "react";
import type {
  CoinDenomination,
  ColorThemeId,
  RealWorldSolidId,
  Shape2DId,
  Solid3DId,
  VisualModelSpec,
  VisualSize,
} from "@/domain/types";
import { registerVisualModel } from "@/visual-models/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export interface ColorPalette {
  fill: string;
  fillLight: string;
  fillDark: string;
  stroke: string;
  accent: string;
}

export const COLOR_PALETTES: Record<ColorThemeId, ColorPalette> = {
  coral: {
    fill: "#EF4444",
    fillLight: "#FCA5A5",
    fillDark: "#DC2626",
    stroke: "#7F1D1D",
    accent: "#FEF2F2",
  },
  amber: {
    fill: "#F59E0B",
    fillLight: "#FDE68A",
    fillDark: "#D97706",
    stroke: "#78350F",
    accent: "#FFFBEB",
  },
  emerald: {
    fill: "#10B981",
    fillLight: "#6EE7B7",
    fillDark: "#059669",
    stroke: "#064E3B",
    accent: "#ECFDF5",
  },
  sky: {
    fill: "#0EA5E9",
    fillLight: "#7DD3FC",
    fillDark: "#0284C7",
    stroke: "#0C4A6E",
    accent: "#F0F9FF",
  },
  violet: {
    fill: "#8B5CF6",
    fillLight: "#C4B5FD",
    fillDark: "#7C3AED",
    stroke: "#4C1D95",
    accent: "#F5F3FF",
  },
  rose: {
    fill: "#F43F5E",
    fillLight: "#FDA4AF",
    fillDark: "#E11D48",
    stroke: "#881337",
    accent: "#FFF1F2",
  },
  teal: {
    fill: "#14B8A6",
    fillLight: "#5EEAD4",
    fillDark: "#0D9488",
    stroke: "#134E4A",
    accent: "#F0FDFA",
  },
  indigo: {
    fill: "#6366F1",
    fillLight: "#A5B4FC",
    fillDark: "#4F46E5",
    stroke: "#312E81",
    accent: "#EEF2FF",
  },
};

export interface Shape2DDefinition {
  id: Shape2DId;
  labelAr: string;
  sides: number;
  corners: number;
  defaultColorTheme: ColorThemeId;
  attributeNoteAr: string;
}

export const SHAPE_2D_CATALOG: Shape2DDefinition[] = [
  {
    id: "circle",
    labelAr: "دائرة",
    sides: 0,
    corners: 0,
    defaultColorTheme: "coral",
    attributeNoteAr: "منحنية ومغلقة: ٠ أضلاع و٠ زوايا",
  },
  {
    id: "triangle",
    labelAr: "مثلث",
    sides: 3,
    corners: 3,
    defaultColorTheme: "amber",
    attributeNoteAr: "٣ أضلاع مستقيمة و٣ زوايا",
  },
  {
    id: "square",
    labelAr: "مربع",
    sides: 4,
    corners: 4,
    defaultColorTheme: "sky",
    attributeNoteAr: "٤ أضلاع متساوية في الطول و٤ زوايا",
  },
  {
    id: "rectangle",
    labelAr: "مستطيل",
    sides: 4,
    corners: 4,
    defaultColorTheme: "emerald",
    attributeNoteAr: "٤ أضلاع (ضلعان طويلان وضلعان قصيران) و٤ زوايا",
  },
  {
    id: "pentagon",
    labelAr: "خماسي",
    sides: 5,
    corners: 5,
    defaultColorTheme: "violet",
    attributeNoteAr: "٥ أضلاع مستقيمة و٥ زوايا",
  },
  {
    id: "hexagon",
    labelAr: "سداسي",
    sides: 6,
    corners: 6,
    defaultColorTheme: "rose",
    attributeNoteAr: "٦ أضلاع مستقيمة و٦ زوايا",
  },
  {
    id: "heptagon",
    labelAr: "سباعي",
    sides: 7,
    corners: 7,
    defaultColorTheme: "teal",
    attributeNoteAr: "٧ أضلاع مستقيمة و٧ زوايا",
  },
  {
    id: "octagon",
    labelAr: "ثماني",
    sides: 8,
    corners: 8,
    defaultColorTheme: "indigo",
    attributeNoteAr: "٨ أضلاع مستقيمة و٨ زوايا",
  },
  {
    id: "nonagon",
    labelAr: "تساعي",
    sides: 9,
    corners: 9,
    defaultColorTheme: "coral",
    attributeNoteAr: "٩ أضلاع مستقيمة و٩ زوايا",
  },
];

export interface Solid3DDefinition {
  id: Solid3DId;
  labelAr: string;
  defaultColorTheme: ColorThemeId;
  realWorldLookalikeAr: string;
  attributeNoteAr: string;
}

export const SOLID_3D_CATALOG: Solid3DDefinition[] = [
  {
    id: "sphere",
    labelAr: "كرة",
    defaultColorTheme: "coral",
    realWorldLookalikeAr: "تشبه كرة اللعب",
    attributeNoteAr: "مجسّم كروي أملس يتدحرج في كل الاتجاهات (٠ أوجه مسطّحة)",
  },
  {
    id: "cone",
    labelAr: "مخروط",
    defaultColorTheme: "amber",
    realWorldLookalikeAr: "يشبه قمع المثلجات أو قبعة الحفلة",
    attributeNoteAr: "قاعدة دائرية مسطّحة واحدة ورأس مدبّب واحد",
  },
  {
    id: "cylinder",
    labelAr: "أسطوانة",
    defaultColorTheme: "sky",
    realWorldLookalikeAr: "تشبه علبة الحساء",
    attributeNoteAr: "قاعدتان دائريتان مسطّحتان وسطح منحنٍ",
  },
  {
    id: "cube",
    labelAr: "مكعب",
    defaultColorTheme: "emerald",
    realWorldLookalikeAr: "يشبه مكعب الثلج",
    attributeNoteAr: "٦ أوجه مربعة متساوية و٨ رؤوس",
  },
  {
    id: "rectangular-prism",
    labelAr: "متوازي مستطيلات",
    defaultColorTheme: "violet",
    realWorldLookalikeAr: "يشبه صندوق الهدايا أو علبة العصير",
    attributeNoteAr: "٦ أوجه مستطيلة مسطّحة و٨ رؤوس",
  },
  {
    id: "pyramid",
    labelAr: "هرم",
    defaultColorTheme: "teal",
    realWorldLookalikeAr: "يشبه خيمة التخييم أو الأهرامات",
    attributeNoteAr: "قاعدة مسطّحة وأوجه جانبية مثلثة تلتقي في قمة واحدة",
  },
];

export interface RealWorldSolidDefinition {
  id: RealWorldSolidId;
  labelAr: string;
  matchingSolidId: Solid3DId;
  colorTheme: ColorThemeId;
  descriptionAr: string;
}

export const REAL_WORLD_SOLID_CATALOG: RealWorldSolidDefinition[] = [
  {
    id: "soup-can",
    labelAr: "علبة حساء",
    matchingSolidId: "cylinder",
    colorTheme: "coral",
    descriptionAr: "علبة حساء أسطوانية بقاعدتين دائريتين",
  },
  {
    id: "ice-cream-cone",
    labelAr: "قمع مثلجات",
    matchingSolidId: "cone",
    colorTheme: "amber",
    descriptionAr: "قمع مثلجات مخروطي برأس مدبب",
  },
  {
    id: "ice-cube",
    labelAr: "مكعب ثلج",
    matchingSolidId: "cube",
    colorTheme: "sky",
    descriptionAr: "مكعب ثلج بستة أوجه مربعة متساوية",
  },
  {
    id: "gift-box",
    labelAr: "صندوق هدايا",
    matchingSolidId: "rectangular-prism",
    colorTheme: "violet",
    descriptionAr: "صندوق هدايا على شكل متوازي مستطيلات",
  },
  {
    id: "basketball",
    labelAr: "كرة سلة",
    matchingSolidId: "sphere",
    colorTheme: "amber",
    descriptionAr: "كرة سلة مستديرة على شكل مجسّم الكرة",
  },
  {
    id: "party-hat",
    labelAr: "قبعة حفلة",
    matchingSolidId: "cone",
    colorTheme: "rose",
    descriptionAr: "قبعة حفلة منقّطة على شكل مخروط",
  },
  {
    id: "juice-box",
    labelAr: "علبة عصير",
    matchingSolidId: "rectangular-prism",
    colorTheme: "emerald",
    descriptionAr: "علبة عصير على شكل متوازي مستطيلات",
  },
  {
    id: "tent",
    labelAr: "خيمة تخييم",
    matchingSolidId: "pyramid",
    colorTheme: "teal",
    descriptionAr: "خيمة ذات أوجه مثلثة على شكل هرم",
  },
];

export interface CoinDefinition {
  denomination: CoinDenomination;
  labelAr: string;
  metalNameAr: "نحاسي" | "فضي" | "ذهبي";
  relativeSizeRank: number; // 1 smallest .. 5 largest
  colorTheme: ColorThemeId;
  descriptionAr: string;
}

export const COIN_CATALOG: CoinDefinition[] = [
  {
    denomination: 1,
    labelAr: "عملة ١ (قرش نحاسي)",
    metalNameAr: "نحاسي",
    relativeSizeRank: 1,
    colorTheme: "coral",
    descriptionAr: "عملة نحاسية صغيرة مكتوب عليها ١",
  },
  {
    denomination: 5,
    labelAr: "عملة ٥ (فضية)",
    metalNameAr: "فضي",
    relativeSizeRank: 2,
    colorTheme: "sky",
    descriptionAr: "عملة فضية بحافة مسنّنة مكتوب عليها ٥",
  },
  {
    denomination: 10,
    labelAr: "عملة ١٠ (فضية)",
    metalNameAr: "فضي",
    relativeSizeRank: 3,
    colorTheme: "teal",
    descriptionAr: "عملة فضية متوسطة مكتوب عليها ١٠",
  },
  {
    denomination: 25,
    labelAr: "عملة ٢٥ (ذهبية بإطار)",
    metalNameAr: "ذهبي",
    relativeSizeRank: 4,
    colorTheme: "amber",
    descriptionAr: "عملة ذهبية كبيرة مكتوب عليها ٢٥",
  },
  {
    denomination: 50,
    labelAr: "عملة ٥٠ (ذهبية كبرى)",
    metalNameAr: "ذهبي",
    relativeSizeRank: 5,
    colorTheme: "amber",
    descriptionAr: "أكبر عملة ذهبية مزخرفة مكتوب عليها ٥٠",
  },
];

export function getShape2DById(id: string): Shape2DDefinition {
  return SHAPE_2D_CATALOG.find((s) => s.id === id) ?? SHAPE_2D_CATALOG[0];
}

export function getSolid3DById(id: string): Solid3DDefinition {
  return SOLID_3D_CATALOG.find((s) => s.id === id) ?? SOLID_3D_CATALOG[0];
}

const SHAPE_PLURAL_AR: Record<Shape2DId, string> = {
  circle: "دوائر",
  triangle: "مثلثات",
  square: "مربعات",
  rectangle: "مستطيلات",
  pentagon: "خماسيات",
  hexagon: "سداسيات",
  heptagon: "سباعيات",
  octagon: "ثمانيات",
  nonagon: "تساعيات",
};

const SOLID_PLURAL_AR: Record<Solid3DId, string> = {
  sphere: "كرات",
  cone: "مخاريط",
  cylinder: "أسطوانات",
  cube: "مكعبات",
  "rectangular-prism": "متوازيات مستطيلات",
  pyramid: "أهرامات",
};

/** Arabic plural label for a flat shape (مثلث → مثلثات), used by multi-category models. */
export function getShapePluralAr(shapeId: string): string {
  const def = SHAPE_2D_CATALOG.find((s) => s.id === shapeId);
  if (!def) return "";
  return SHAPE_PLURAL_AR[def.id] ?? def.labelAr;
}

/** Arabic plural label for a solid (مكعّب → مكعّبات), used by multi-category models. */
export function getSolidPluralAr(solidId: string): string {
  const def = SOLID_3D_CATALOG.find((s) => s.id === solidId);
  if (!def) return "";
  return SOLID_PLURAL_AR[def.id] ?? def.labelAr;
}

export function getRealWorldSolidById(id: string): RealWorldSolidDefinition {
  return (
    REAL_WORLD_SOLID_CATALOG.find((s) => s.id === id) ??
    REAL_WORLD_SOLID_CATALOG[0]
  );
}

export function getCoinByDenomination(
  denomination: CoinDenomination
): CoinDefinition {
  return (
    COIN_CATALOG.find((c) => c.denomination === denomination) ?? COIN_CATALOG[0]
  );
}

export function createShape2DSpec(
  shapeId: Shape2DId,
  overrides?: Partial<VisualModelSpec>
): VisualModelSpec {
  const def = getShape2DById(shapeId);
  return {
    kind: "shape-2d",
    id: def.id,
    labelAr: def.labelAr,
    colorTheme: def.defaultColorTheme,
    size: "medium",
    rotationDeg: 0,
    ...overrides,
  };
}

export function createSolid3DSpec(
  solidId: Solid3DId,
  overrides?: Partial<VisualModelSpec>
): VisualModelSpec {
  const def = getSolid3DById(solidId);
  return {
    kind: "solid-3d",
    id: def.id,
    labelAr: def.labelAr,
    colorTheme: def.defaultColorTheme,
    size: "medium",
    rotationDeg: 0,
    ...overrides,
  };
}

export function createRealWorldSolidSpec(
  objectId: RealWorldSolidId,
  overrides?: Partial<VisualModelSpec>
): VisualModelSpec {
  const def = getRealWorldSolidById(objectId);
  return {
    kind: "real-world-solid",
    id: def.id,
    labelAr: def.labelAr,
    colorTheme: def.colorTheme,
    size: "medium",
    ...overrides,
  };
}

export function createCoinSpec(
  denomination: CoinDenomination,
  overrides?: Partial<VisualModelSpec>
): VisualModelSpec {
  const def = getCoinByDenomination(denomination);
  return {
    kind: "coin",
    id: `coin-${denomination}`,
    labelAr: def.labelAr,
    denomination: def.denomination,
    colorTheme: def.colorTheme,
    size: "medium",
    ...overrides,
  };
}

function resolvePixelSize(size: VisualSize = "medium"): number {
  if (size === "small") return 22;
  if (size === "large") return 30;
  return 26;
}

export function Shape2DSvg({
  shapeId,
  colorTheme = "sky",
  size = "medium",
  rotationDeg = 0,
}: {
  shapeId: string;
  colorTheme?: ColorThemeId;
  size?: VisualSize;
  rotationDeg?: number;
}): React.ReactElement {
  const px = resolvePixelSize(size);
  const palette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.sky;
  const def = getShape2DById(shapeId);
  const transformAttr =
    rotationDeg && rotationDeg !== 0
      ? `translate(32 32) rotate(${rotationDeg}) scale(0.84) translate(-32 -32)`
      : undefined;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 64 64"
      fill="none"
      aria-label={def.labelAr}
      data-shape-id={def.id}
      data-size={size}
      data-rotation={rotationDeg}
    >
      <g transform={transformAttr}>
        {def.id === "circle" && (
          <>
            <circle
              cx="32"
              cy="32"
              r="23"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="3"
            />
            <circle
              cx="32"
              cy="32"
              r="15"
              fill="none"
              stroke={palette.fillLight}
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <path
              d="M20 20 A 16 16 0 0 1 36 15"
              stroke={palette.accent}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}

        {def.id === "triangle" && (
          <>
            <polygon
              points="32,8 56,52 8,52"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <polygon
              points="32,19 46,46 18,46"
              fill="none"
              stroke={palette.fillLight}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="8" r="2.8" fill={palette.stroke} />
            <circle cx="56" cy="52" r="2.8" fill={palette.stroke} />
            <circle cx="8" cy="52" r="2.8" fill={palette.stroke} />
          </>
        )}

        {def.id === "square" && (
          <>
            <rect
              x="11"
              y="11"
              width="42"
              height="42"
              rx="2"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="3"
            />
            <rect
              x="19"
              y="19"
              width="26"
              height="26"
              fill="none"
              stroke={palette.fillLight}
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <circle cx="11" cy="11" r="2.6" fill={palette.stroke} />
            <circle cx="53" cy="11" r="2.6" fill={palette.stroke} />
            <circle cx="53" cy="53" r="2.6" fill={palette.stroke} />
            <circle cx="11" cy="53" r="2.6" fill={palette.stroke} />
          </>
        )}

        {def.id === "rectangle" && (
          <>
            <rect
              x="6"
              y="17"
              width="52"
              height="30"
              rx="2"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="3"
            />
            <line
              x1="14"
              y1="25"
              x2="50"
              y2="25"
              stroke={palette.fillLight}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="39"
              x2="50"
              y2="39"
              stroke={palette.fillLight}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="6" cy="17" r="2.6" fill={palette.stroke} />
            <circle cx="58" cy="17" r="2.6" fill={palette.stroke} />
            <circle cx="58" cy="47" r="2.6" fill={palette.stroke} />
            <circle cx="6" cy="47" r="2.6" fill={palette.stroke} />
          </>
        )}

        {def.id === "pentagon" && (
          <>
            <polygon
              points="32,7 56,25 47,54 17,54 8,25"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <polygon
              points="32,16 47,28 41,47 23,47 17,28"
              fill="none"
              stroke={palette.fillLight}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="7" r="2.6" fill={palette.stroke} />
            <circle cx="56" cy="25" r="2.6" fill={palette.stroke} />
            <circle cx="47" cy="54" r="2.6" fill={palette.stroke} />
            <circle cx="17" cy="54" r="2.6" fill={palette.stroke} />
            <circle cx="8" cy="25" r="2.6" fill={palette.stroke} />
          </>
        )}

        {def.id === "hexagon" && (
          <>
            <polygon
              points="32,7 54,19 54,45 32,57 10,45 10,19"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <polygon
              points="32,15 46,23 46,41 32,49 18,41 18,23"
              fill="none"
              stroke={palette.fillLight}
              strokeWidth="2"
              strokeDasharray="3 2"
            />
            <circle cx="32" cy="7" r="2.5" fill={palette.stroke} />
            <circle cx="54" cy="19" r="2.5" fill={palette.stroke} />
            <circle cx="54" cy="45" r="2.5" fill={palette.stroke} />
            <circle cx="32" cy="57" r="2.5" fill={palette.stroke} />
            <circle cx="10" cy="45" r="2.5" fill={palette.stroke} />
            <circle cx="10" cy="19" r="2.5" fill={palette.stroke} />
          </>
        )}
        {def.id === "heptagon" && (
          <>
            <polygon
              points="32,7 52,16 56,38 43,55 21,55 8,38 12,16"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <polygon
              points="32,16 45,22 48,36 39,47 25,47 16,36 19,22"
              fill="none"
              stroke={palette.fillLight}
              strokeWidth="2"
              strokeDasharray="3 2"
              strokeLinejoin="round"
            />
            {[
              [32, 7],
              [52, 16],
              [56, 38],
              [43, 55],
              [21, 55],
              [8, 38],
              [12, 16],
            ].map(([x, y], idx) => (
              <g key={idx}>
                <circle cx={x} cy={y} r="2.6" fill={palette.stroke} />
                <circle cx={x} cy={y} r="1" fill="#FFFFFF" />
              </g>
            ))}
          </>
        )}
        {def.id === "octagon" && (
          <>
            <polygon
              points="22,7 42,7 57,22 57,42 42,57 22,57 7,42 7,22"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <polygon
              points="25.5,16 38.5,16 48,25.5 48,38.5 38.5,48 25.5,48 16,38.5 16,25.5"
              fill="none"
              stroke={palette.fillLight}
              strokeWidth="2"
              strokeDasharray="3 2"
              strokeLinejoin="round"
            />
            {[
              [22, 7],
              [42, 7],
              [57, 22],
              [57, 42],
              [42, 57],
              [22, 57],
              [7, 42],
              [7, 22],
            ].map(([x, y], idx) => (
              <g key={idx}>
                <circle cx={x} cy={y} r="2.6" fill={palette.stroke} />
                <circle cx={x} cy={y} r="1" fill="#FFFFFF" />
              </g>
            ))}
          </>
        )}
        {def.id === "nonagon" && (
          <>
            <polygon
              points="32,7 48,13 57,28 54,45 41,56 23,56 10,45 7,28 16,13"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <polygon
              points="32,16 42.5,20 48,29.5 46.5,40.5 38,47.5 26,47.5 17.5,40.5 16,29.5 21.5,20"
              fill="none"
              stroke={palette.fillLight}
              strokeWidth="2"
              strokeDasharray="3 2"
              strokeLinejoin="round"
            />
            {[
              [32, 7],
              [48, 13],
              [57, 28],
              [54, 45],
              [41, 56],
              [23, 56],
              [10, 45],
              [7, 28],
              [16, 13],
            ].map(([x, y], idx) => (
              <g key={idx}>
                <circle cx={x} cy={y} r="2.6" fill={palette.stroke} />
                <circle cx={x} cy={y} r="1" fill="#FFFFFF" />
              </g>
            ))}
          </>
        )}
      </g>
    </svg>
  );
}

export function Solid3DSvg({
  solidId,
  colorTheme = "sky",
  size = "medium",
  rotationDeg = 0,
}: {
  solidId: string;
  colorTheme?: ColorThemeId;
  size?: VisualSize;
  rotationDeg?: number;
}): React.ReactElement {
  const px = resolvePixelSize(size);
  const palette = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.sky;
  const def = getSolid3DById(solidId);
  const transformAttr =
    rotationDeg && rotationDeg !== 0
      ? `translate(32 32) rotate(${rotationDeg}) scale(0.84) translate(-32 -32)`
      : undefined;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 64 64"
      fill="none"
      aria-label={def.labelAr}
      data-solid-id={def.id}
      data-size={size}
      data-rotation={rotationDeg}
    >
      <g transform={transformAttr}>
        {def.id === "sphere" && (
          <>
            <circle
              cx="32"
              cy="32"
              r="23"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="2.8"
            />
            {/* 3D Equator and meridian contours */}
            <ellipse
              cx="32"
              cy="32"
              rx="23"
              ry="8"
              fill="none"
              stroke={palette.fillLight}
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <ellipse
              cx="32"
              cy="32"
              rx="9"
              ry="23"
              fill="none"
              stroke={palette.fillDark}
              strokeWidth="1.8"
              strokeDasharray="4 3"
            />
            <ellipse
              cx="23"
              cy="22"
              rx="6"
              ry="3.5"
              transform="rotate(-30 23 22)"
              fill={palette.accent}
            />
          </>
        )}

        {def.id === "cone" && (
          <>
            <path
              d="M32 8 L53 47 C53 53, 11 53, 11 47 Z"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Shaded right half */}
            <path
              d="M32 8 L53 47 C53 51, 32 52, 32 47 Z"
              fill={palette.fillDark}
              opacity="0.45"
            />
            {/* Base ellipse */}
            <ellipse
              cx="32"
              cy="47"
              rx="21"
              ry="6.5"
              fill={palette.fillLight}
              stroke={palette.stroke}
              strokeWidth="2.5"
            />
          </>
        )}

        {def.id === "cylinder" && (
          <>
            <path
              d="M14 17 L14 47 C14 53, 50 53, 50 47 L50 17 Z"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="2.8"
            />
            <rect
              x="20"
              y="19"
              width="7"
              height="28"
              fill={palette.fillLight}
              opacity="0.55"
            />
            <ellipse
              cx="32"
              cy="17"
              rx="18"
              ry="6"
              fill={palette.fillLight}
              stroke={palette.stroke}
              strokeWidth="2.6"
            />
            <path
              d="M14 47 C14 42, 50 42, 50 47"
              stroke={palette.stroke}
              strokeWidth="1.8"
              strokeDasharray="3 3"
            />
          </>
        )}

        {def.id === "cube" && (
          <>
            {/* Top face */}
            <polygon
              points="32,8 52,18 32,28 12,18"
              fill={palette.fillLight}
              stroke={palette.stroke}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Left face */}
            <polygon
              points="12,18 32,28 32,52 12,42"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Right face */}
            <polygon
              points="32,28 52,18 52,42 32,52"
              fill={palette.fillDark}
              stroke={palette.stroke}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </>
        )}

        {def.id === "rectangular-prism" && (
          <>
            {/* Top face */}
            <polygon
              points="24,12 56,12 42,24 10,24"
              fill={palette.fillLight}
              stroke={palette.stroke}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Front face */}
            <rect
              x="10"
              y="24"
              width="32"
              height="26"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="2.5"
            />
            {/* Side face */}
            <polygon
              points="42,24 56,12 56,38 42,50"
              fill={palette.fillDark}
              stroke={palette.stroke}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </>
        )}

        {def.id === "pyramid" && (
          <>
            {/* Left front face */}
            <polygon
              points="32,8 10,46 34,54"
              fill={palette.fill}
              stroke={palette.stroke}
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            {/* Right side face */}
            <polygon
              points="32,8 34,54 54,42"
              fill={palette.fillDark}
              stroke={palette.stroke}
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            {/* Hidden back base edges */}
            <path
              d="M10 46 L28 36 L54 42 M32 8 L28 36"
              stroke={palette.stroke}
              strokeWidth="1.6"
              strokeDasharray="3 3"
            />
          </>
        )}
      </g>
    </svg>
  );
}

export function RealWorldSolidSvg({
  objectId,
  size = "medium",
}: {
  objectId: string;
  size?: VisualSize;
}): React.ReactElement {
  const px = resolvePixelSize(size);
  const def = getRealWorldSolidById(objectId);

  switch (def.id) {
    case "soup-can":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label={def.labelAr}
        >
          <path
            d="M16 16 L16 48 C16 54, 48 54, 48 48 L48 16 Z"
            fill="#EF4444"
            stroke="#7F1D1D"
            strokeWidth="2.5"
          />
          <rect
            x="16"
            y="26"
            width="32"
            height="14"
            fill="#FEF2F2"
            stroke="#7F1D1D"
            strokeWidth="1.8"
          />
          <circle
            cx="32"
            cy="33"
            r="4.5"
            fill="#F59E0B"
            stroke="#78350F"
            strokeWidth="1.5"
          />
          <ellipse
            cx="32"
            cy="16"
            rx="16"
            ry="5.5"
            fill="#CBD5E1"
            stroke="#334155"
            strokeWidth="2.5"
          />
          <ellipse
            cx="32"
            cy="16"
            rx="10"
            ry="3"
            fill="none"
            stroke="#64748B"
            strokeWidth="1.5"
          />
        </svg>
      );

    case "ice-cream-cone":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label={def.labelAr}
        >
          {/* Waffle Cone */}
          <polygon
            points="19,28 45,28 32,57"
            fill="#F59E0B"
            stroke="#78350F"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line
            x1="23"
            y1="28"
            x2="35"
            y2="50"
            stroke="#92400E"
            strokeWidth="1.6"
          />
          <line
            x1="33"
            y1="28"
            x2="39"
            y2="42"
            stroke="#92400E"
            strokeWidth="1.6"
          />
          <line
            x1="41"
            y1="28"
            x2="28"
            y2="50"
            stroke="#92400E"
            strokeWidth="1.6"
          />
          {/* Scoop */}
          <path
            d="M16 28 C14 14, 24 9, 32 9 C40 9, 50 14, 48 28 Z"
            fill="#F472B6"
            stroke="#831843"
            strokeWidth="2.5"
          />
          <circle cx="26" cy="18" r="2" fill="#FEF08A" />
          <circle cx="37" cy="20" r="2" fill="#BAE6FD" />
        </svg>
      );

    case "ice-cube":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label={def.labelAr}
        >
          <polygon
            points="32,9 51,19 32,29 13,19"
            fill="#E0F2FE"
            stroke="#0369A1"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <polygon
            points="13,19 32,29 32,51 13,41"
            fill="#7DD3FC"
            stroke="#0369A1"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <polygon
            points="32,29 51,19 51,41 32,51"
            fill="#38BDF8"
            stroke="#0369A1"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <line
            x1="18"
            y1="26"
            x2="26"
            y2="31"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="18"
            y1="32"
            x2="23"
            y2="35"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );

    case "gift-box":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label={def.labelAr}
        >
          <polygon
            points="22,16 54,16 42,26 10,26"
            fill="#C4B5FD"
            stroke="#4C1D95"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <rect
            x="10"
            y="26"
            width="32"
            height="24"
            fill="#8B5CF6"
            stroke="#4C1D95"
            strokeWidth="2.4"
          />
          <polygon
            points="42,26 54,16 54,40 42,50"
            fill="#6D28D9"
            stroke="#4C1D95"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* Ribbon */}
          <rect
            x="23"
            y="26"
            width="6"
            height="24"
            fill="#FACC15"
            stroke="#854D0E"
            strokeWidth="1.6"
          />
          <path
            d="M26 21 C18 11, 14 21, 26 21 C38 21, 34 11, 26 21 Z"
            fill="#F43F5E"
            stroke="#881337"
            strokeWidth="2"
          />
        </svg>
      );

    case "basketball":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label={def.labelAr}
        >
          <circle
            cx="32"
            cy="32"
            r="22"
            fill="#F97316"
            stroke="#7C2D12"
            strokeWidth="2.6"
          />
          <line
            x1="10"
            y1="32"
            x2="54"
            y2="32"
            stroke="#431407"
            strokeWidth="2.2"
          />
          <line
            x1="32"
            y1="10"
            x2="32"
            y2="54"
            stroke="#431407"
            strokeWidth="2.2"
          />
          <path
            d="M17 16 C26 26, 26 38, 17 48"
            stroke="#431407"
            strokeWidth="2.2"
            fill="none"
          />
          <path
            d="M47 16 C38 26, 38 38, 47 48"
            stroke="#431407"
            strokeWidth="2.2"
            fill="none"
          />
        </svg>
      );

    case "party-hat":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label={def.labelAr}
        >
          <polygon
            points="32,12 52,50 12,50"
            fill="#F43F5E"
            stroke="#881337"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle
            cx="32"
            cy="10"
            r="5"
            fill="#FACC15"
            stroke="#854D0E"
            strokeWidth="2"
          />
          <circle cx="32" cy="27" r="3" fill="#FEF08A" />
          <circle cx="24" cy="40" r="3" fill="#BAE6FD" />
          <circle cx="40" cy="40" r="3" fill="#A7F3D0" />
          <ellipse
            cx="32"
            cy="50"
            rx="20"
            ry="4.5"
            fill="#FDA4AF"
            stroke="#881337"
            strokeWidth="2.2"
          />
        </svg>
      );

    case "juice-box":
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label={def.labelAr}
        >
          {/* Straw */}
          <path
            d="M35 16 L39 7 L47 9"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 3D Box */}
          <polygon
            points="22,16 48,16 40,22 14,22"
            fill="#6EE7B7"
            stroke="#064E3B"
            strokeWidth="2.2"
          />
          <rect
            x="14"
            y="22"
            width="26"
            height="32"
            fill="#10B981"
            stroke="#064E3B"
            strokeWidth="2.4"
          />
          <polygon
            points="40,22 48,16 48,48 40,54"
            fill="#059669"
            stroke="#064E3B"
            strokeWidth="2.2"
          />
          <circle
            cx="27"
            cy="38"
            r="6"
            fill="#FACC15"
            stroke="#78350F"
            strokeWidth="1.8"
          />
        </svg>
      );

    case "tent":
    default:
      return (
        <svg
          width={px}
          height={px}
          viewBox="0 0 64 64"
          fill="none"
          aria-label={def.labelAr}
        >
          <polygon
            points="32,10 8,50 36,54"
            fill="#14B8A6"
            stroke="#134E4A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="32,10 36,54 56,44"
            fill="#0D9488"
            stroke="#134E4A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="24,52 32,30 36,54"
            fill="#FACC15"
            stroke="#134E4A"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function LocalizedCoinSvg({
  denomination = 1,
  size = "medium",
}: {
  denomination?: CoinDenomination;
  size?: VisualSize;
}): React.ReactElement {
  const def = getCoinByDenomination(denomination);

  // Distinct radius per denomination so size comparisons in K-4 are visually unmistakable
  const baseRadiusMap: Record<CoinDenomination, number> = {
    1: 18,
    5: 20,
    10: 21,
    25: 24,
    50: 26,
  };
  const r = baseRadiusMap[denomination] ?? 20;
  const px = size === "small" ? 32 : size === "large" ? 48 : 40;
  // Exact 12px on-screen text size inside the 64x64 viewBox (since 32 = 64/2, 40 = 64*5/8, 48 = 64*3/4)
  const svgFontSize = size === "small" ? 24 : size === "large" ? 16 : 19.2;
  const denomAr = formatEasternNumber(denomination);

  // Metal palette per coin
  const metalColors: Record<
    CoinDenomination,
    {
      outer: string;
      inner: string;
      stroke: string;
      text: string;
      shine: string;
    }
  > = {
    1: {
      outer: "#D97706", // Copper/bronze
      inner: "#F59E0B",
      stroke: "#78350F",
      text: "#451A03",
      shine: "#FDE68A",
    },
    5: {
      outer: "#94A3B8", // Silver
      inner: "#E2E8F0",
      stroke: "#334155",
      text: "#0F172A",
      shine: "#F8FAFC",
    },
    10: {
      outer: "#64748B", // Silver with brushed rim
      inner: "#CBD5E1",
      stroke: "#1E293B",
      text: "#0F172A",
      shine: "#F1F5F9",
    },
    25: {
      outer: "#F59E0B", // Bimetallic gold rim + silver center
      inner: "#FEF3C7",
      stroke: "#92400E",
      text: "#78350F",
      shine: "#FFFBEB",
    },
    50: {
      outer: "#EAB308", // Rich Gold largest coin
      inner: "#FEF08A",
      stroke: "#854D0E",
      text: "#713F12",
      shine: "#FEF9C3",
    },
  };

  const style = metalColors[denomination] ?? metalColors[1];

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 64 64"
      fill="none"
      aria-label={toEasternArabicNumerals(def.labelAr)}
      data-coin-denomination={denomAr}
      data-coin-metal={def.metalNameAr}
    >
      {/* Outer metallic disc */}
      <circle
        cx="32"
        cy="32"
        r={r}
        fill={style.outer}
        stroke={style.stroke}
        strokeWidth="2.6"
      />
      {/* Inner coin ring with distinct dash pattern per denomination */}
      <circle
        cx="32"
        cy="32"
        r={Math.max(r - 4, 10)}
        fill={style.inner}
        stroke={style.stroke}
        strokeWidth="1.6"
        strokeDasharray={
          denomination === 1
            ? "2 2"
            : denomination === 5
              ? "4 2"
              : denomination === 10
                ? "none"
                : "5 2"
        }
      />
      {/* Specular metallic shine */}
      <path
        d={`M ${32 - Math.round(r * 0.45)} ${32 - Math.round(r * 0.45)} L ${
          32 - Math.round(r * 0.2)
        } ${32 - Math.round(r * 0.65)}`}
        stroke={style.shine}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Stamped Eastern Arabic Numeral */}
      <text
        x="32"
        y="32"
        textAnchor="middle"
        dominantBaseline="central"
        fill={style.text}
        fontSize={svgFontSize}
        fontWeight="900"
      >
        {denomAr}
      </text>
    </svg>
  );
}

export function registerShapesSolidsCoinsVisualModels(): void {
  // Register "shape-2d"
  registerVisualModel("shape-2d", ({ model }) => {
    const primary = model.count ?? 1;
    const secondary = model.secondaryCount ?? 0;
    const total = primary + secondary;
    const meta = (model.meta ?? {}) as Record<string, unknown>;
    const secondaryTheme =
      (meta.secondaryColorTheme as ColorThemeId) ?? "amber";

    if (total > 1) {
      return (
        <div
          className="inline-flex items-center gap-1"
          data-visual-model="shape-2d"
          data-shape-id={model.id}
          data-count={formatEasternNumber(total)}
        >
          <div className="flex items-center justify-center gap-0.5">
            <div
              className={`flex items-center gap-0.5 ${
                secondary > 0
                  ? "rounded-xl border border-dashed border-indigo-300 bg-indigo-50/40 px-1 py-0.5"
                  : ""
              }`}
            >
              {Array.from({ length: primary }, (_, idx) => (
                <Shape2DSvg
                  key={`p-${idx}`}
                  shapeId={model.id}
                  colorTheme={model.colorTheme}
                  size={model.size ?? "small"}
                  rotationDeg={model.rotationDeg}
                />
              ))}
            </div>
            {secondary > 0 && (
              <div className="flex items-center gap-0.5 rounded-xl border border-dashed border-amber-300 bg-amber-50/40 px-1 py-0.5">
                {Array.from({ length: secondary }, (_, idx) => (
                  <Shape2DSvg
                    key={`s-${idx}`}
                    shapeId={model.id}
                    colorTheme={secondaryTheme}
                    size={model.size ?? "small"}
                    rotationDeg={model.rotationDeg}
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
    }

    return (
      <div
        className="inline-flex items-center gap-1"
        data-visual-model="shape-2d"
        data-shape-id={model.id}
      >
        <Shape2DSvg
          shapeId={model.id}
          colorTheme={model.colorTheme}
          size={model.size ?? "medium"}
          rotationDeg={model.rotationDeg}
        />
        <span className="text-[13px] font-bold leading-tight text-slate-700">
          {toEasternArabicNumerals(model.labelAr)}
        </span>
      </div>
    );
  });

  // Register "solid-3d"
  registerVisualModel("solid-3d", ({ model }) => {
    const primary = model.count ?? 1;
    const secondary = model.secondaryCount ?? 0;
    const total = primary + secondary;
    const meta = (model.meta ?? {}) as Record<string, unknown>;
    const secondaryTheme =
      (meta.secondaryColorTheme as ColorThemeId) ?? "amber";

    if (total > 1) {
      return (
        <div
          className="inline-flex max-w-full items-center gap-1"
          data-visual-model="solid-3d"
          data-solid-id={model.id}
          data-count={formatEasternNumber(total)}
        >
          <div className="flex max-w-full flex-wrap items-center justify-center gap-0.5">
            <div
              className={`flex items-center gap-0.5 ${
                secondary > 0
                  ? "rounded-xl border border-dashed border-indigo-300 bg-indigo-50/40 px-1 py-0.5"
                  : ""
              }`}
            >
              {Array.from({ length: primary }, (_, idx) => (
                <Solid3DSvg
                  key={`p-${idx}`}
                  solidId={model.id}
                  colorTheme={model.colorTheme}
                  size={model.size ?? "small"}
                  rotationDeg={model.rotationDeg}
                />
              ))}
            </div>
            {secondary > 0 && (
              <div className="flex items-center gap-0.5 rounded-xl border border-dashed border-amber-300 bg-amber-50/40 px-1 py-0.5">
                {Array.from({ length: secondary }, (_, idx) => (
                  <Solid3DSvg
                    key={`s-${idx}`}
                    solidId={model.id}
                    colorTheme={secondaryTheme}
                    size={model.size ?? "small"}
                    rotationDeg={model.rotationDeg}
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
    }

    return (
      <div
        className="inline-flex items-center gap-1"
        data-visual-model="solid-3d"
        data-solid-id={model.id}
      >
        <Solid3DSvg
          solidId={model.id}
          colorTheme={model.colorTheme}
          size={model.size ?? "medium"}
          rotationDeg={model.rotationDeg}
        />
        <span className="text-[13px] font-bold leading-tight text-slate-700">
          {toEasternArabicNumerals(model.labelAr)}
        </span>
      </div>
    );
  });

  // Register "real-world-solid"
  registerVisualModel("real-world-solid", ({ model }) => {
    return (
      <div
        className="inline-flex items-center gap-1"
        data-visual-model="real-world-solid"
        data-object-id={model.id}
      >
        <RealWorldSolidSvg objectId={model.id} size={model.size ?? "medium"} />
        <span className="text-[13px] font-bold leading-tight text-slate-700">
          {toEasternArabicNumerals(model.labelAr)}
        </span>
      </div>
    );
  });

  // Register "coin"
  registerVisualModel("coin", ({ model }) => {
    const denomination = (model.denomination ?? 1) as CoinDenomination;
    const count = model.count ?? 1;
    if (count > 1) {
      return (
        <div
          className="inline-flex items-center gap-1"
          data-visual-model="coin"
          data-denomination={formatEasternNumber(denomination)}
        >
          <div className="flex items-center justify-center gap-0.5">
            {Array.from({ length: count }, (_, idx) => (
              <LocalizedCoinSvg
                key={idx}
                denomination={denomination}
                size={model.size ?? "small"}
              />
            ))}
          </div>
          <span className="hidden text-[13px] font-bold leading-tight text-slate-700">
            {toEasternArabicNumerals(model.labelAr)}
          </span>
        </div>
      );
    }

    return (
      <div
        className="inline-flex items-center gap-1"
        data-visual-model="coin"
        data-denomination={formatEasternNumber(denomination)}
      >
        <LocalizedCoinSvg
          denomination={denomination}
          size={model.size ?? "medium"}
        />
        <span className="text-[13px] font-bold leading-tight text-slate-700">
          {toEasternArabicNumerals(model.labelAr)}
        </span>
      </div>
    );
  });
}
registerShapesSolidsCoinsVisualModels();
