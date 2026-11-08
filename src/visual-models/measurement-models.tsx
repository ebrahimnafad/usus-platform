import React from "react";
import type { ColorThemeId, VisualModelSpec } from "@/domain/types";
import { COLOR_PALETTES } from "@/visual-models/shapes-solids-coins";
import { registerVisualModel } from "@/visual-models/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

// ============================================================================
// Paper Clip Bar Visual Model (Canonical: 312 × 56 px)
// ============================================================================

export type PaperClipBarType = "bar" | "ribbon" | "caterpillar";

export interface PaperClipBarOptions {
  length: number; // 1 to 10
  colorTheme?: ColorThemeId;
  labelAr?: string;
  barType?: PaperClipBarType;
  mysteryMode?: boolean;
}

export function createPaperClipBarSpec(
  options: PaperClipBarOptions
): VisualModelSpec {
  const length = Math.max(1, Math.min(10, options.length));
  const colorTheme = options.colorTheme ?? "coral";
  const lengthAr = formatEasternNumber(length);
  const defaultLabel = `${lengthAr} مشابك`;

  return {
    id: `paper-clip-bar-${length}-${colorTheme}-${options.barType ?? "bar"}`,
    kind: "paper-clip-bar",
    count: length,
    colorTheme,
    labelAr: options.labelAr ?? defaultLabel,
    meta: {
      barType: options.barType ?? "bar",
      mysteryMode: options.mysteryMode ?? false,
    },
  };
}

export function PaperClipBarSvg({
  length = 5,
  colorTheme = "coral",
  labelAr,
  barType = "bar",
  mysteryMode = false,
  solved = false,
}: {
  length?: number;
  colorTheme?: ColorThemeId;
  labelAr?: string;
  barType?: PaperClipBarType;
  mysteryMode?: boolean;
  solved?: boolean;
}): React.ReactElement {
  const safeLength = Math.max(1, Math.min(10, length));
  const pal = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.coral;
  const isMysteryWorksheet = mysteryMode && !solved;

  const width = 312;
  const height = 56;
  const startLineX = 265;
  const clipWidth = 25;
  const barWidth = safeLength * clipWidth;
  const barStartX = startLineX - barWidth;

  const barY = 5;
  const barH = 22;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-label={toEasternArabicNumerals(labelAr ?? `${safeLength} مشابك`)}
      data-visual-model="paper-clip-bar"
      data-length={safeLength}
      data-bar-type={barType}
    >
      {/* Background card container */}
      <rect
        x="1"
        y="1"
        width={width - 2}
        height={height - 2}
        rx="10"
        fill="#F8FAFC"
        stroke="#E2E8F0"
        strokeWidth="1.2"
      />

      {/* Start Line on the right (RTL baseline) */}
      <line
        x1={startLineX}
        y1="2"
        x2={startLineX}
        y2="54"
        stroke="#EF4444"
        strokeWidth="2"
        strokeDasharray="4 2"
      />
      <text
        x="288"
        y="32"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="#DC2626"
      >
        بدء
      </text>

      {/* The Measured Object (Bar / Ribbon / Caterpillar) */}
      {isMysteryWorksheet ? (
        // Mystery Mode (Worksheet state): Outline only
        <g data-mystery-state="worksheet">
          <rect
            x={barStartX}
            y={barY}
            width={barWidth}
            height={barH}
            rx="6"
            fill="#FFFFFF"
            stroke="#94A3B8"
            strokeWidth="1.8"
            strokeDasharray="4 3"
          />
          <text
            x={barStartX + barWidth / 2}
            y={barY + 15}
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill="#64748B"
          >
            ؟ {labelAr ? toEasternArabicNumerals(labelAr) : "شريط مجهول"}
          </text>
        </g>
      ) : barType === "caterpillar" ? (
        // Caterpillar segmented body
        <g data-bar-type="caterpillar">
          {Array.from({ length: safeLength }, (_, i) => {
            const segX = startLineX - (i + 1) * clipWidth + clipWidth / 2;
            const isHead = i === safeLength - 1;
            return (
              <g key={i}>
                {/* Cute caterpillar feet */}
                <circle
                  cx={segX - 3}
                  cy={barY + barH + 1}
                  r="1.5"
                  fill={pal.stroke}
                />
                <circle
                  cx={segX + 3}
                  cy={barY + barH + 1}
                  r="1.5"
                  fill={pal.stroke}
                />

                {/* Main body sphere segment */}
                <circle
                  cx={segX}
                  cy={barY + barH / 2}
                  r={barH / 2 - 1}
                  fill={
                    isHead ? pal.stroke : i % 2 === 0 ? pal.fill : pal.accent
                  }
                  stroke={pal.stroke}
                  strokeWidth="1.5"
                />

                {/* 3D highlight crescent on each segment */}
                <ellipse
                  cx={segX - 2}
                  cy={barY + 6}
                  rx="3.5"
                  ry="2"
                  fill="#FFFFFF"
                  opacity={isHead ? "0.2" : "0.5"}
                />

                {isHead && (
                  <>
                    {/* Cheerful antennae with candy beads */}
                    <path
                      d={`M ${segX - 2} ${barY + 2} Q ${segX - 4} ${barY} ${segX - 5} ${barY + 1}`}
                      stroke={pal.stroke}
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle
                      cx={segX - 5}
                      cy={barY + 1}
                      r="1.8"
                      fill="#F43F5E"
                    />
                    <path
                      d={`M ${segX + 2} ${barY + 2} Q ${segX + 4} ${barY} ${segX + 5} ${barY + 1}`}
                      stroke={pal.stroke}
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle
                      cx={segX + 5}
                      cy={barY + 1}
                      r="1.8"
                      fill="#F43F5E"
                    />

                    {/* Cute blushing cheeks */}
                    <ellipse
                      cx={segX - 5.5}
                      cy={barY + 13}
                      rx="1.5"
                      ry="0.9"
                      fill="#FDA4AF"
                    />
                    <ellipse
                      cx={segX + 5.5}
                      cy={barY + 13}
                      rx="1.5"
                      ry="0.9"
                      fill="#FDA4AF"
                    />

                    {/* Expressive shiny eyes */}
                    <circle
                      cx={segX - 3}
                      cy={barY + 8}
                      r="2.2"
                      fill="#FFFFFF"
                      stroke={pal.stroke}
                      strokeWidth="0.5"
                    />
                    <circle
                      cx={segX - 3.2}
                      cy={barY + 8.2}
                      r="1.3"
                      fill="#0F172A"
                    />
                    <circle
                      cx={segX - 3.7}
                      cy={barY + 7.5}
                      r="0.6"
                      fill="#FFFFFF"
                    />

                    <circle
                      cx={segX + 3}
                      cy={barY + 8}
                      r="2.2"
                      fill="#FFFFFF"
                      stroke={pal.stroke}
                      strokeWidth="0.5"
                    />
                    <circle
                      cx={segX + 3.2}
                      cy={barY + 8.2}
                      r="1.3"
                      fill="#0F172A"
                    />
                    <circle
                      cx={segX + 2.7}
                      cy={barY + 7.5}
                      r="0.6"
                      fill="#FFFFFF"
                    />

                    {/* Happy smile */}
                    <path
                      d={`M ${segX - 3} ${barY + 14} Q ${segX} ${barY + 16.5} ${segX + 3} ${barY + 14}`}
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </>
                )}
              </g>
            );
          })}
        </g>
      ) : barType === "ribbon" ? (
        // Ribbon with swallowtail notch and textile texture
        <g data-bar-type="ribbon">
          <path
            d={`M ${barStartX} ${barY} L ${startLineX} ${barY} L ${startLineX} ${barY + barH} L ${barStartX} ${barY + barH} L ${barStartX + 5} ${barY + barH / 2} Z`}
            fill={pal.fill}
            stroke={pal.stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Decorative stitched borders */}
          <line
            x1={barStartX + 6}
            y1={barY + 3}
            x2={startLineX - 2}
            y2={barY + 3}
            stroke={pal.fillLight}
            strokeWidth="1.2"
            strokeDasharray="3 2"
          />
          <line
            x1={barStartX + 6}
            y1={barY + barH - 3}
            x2={startLineX - 2}
            y2={barY + barH - 3}
            stroke={pal.fillLight}
            strokeWidth="1.2"
            strokeDasharray="3 2"
          />
          {labelAr && (
            <g data-bar-label="true">
              <rect
                x={barStartX + barWidth / 2 - 38}
                y={barY + 3}
                width="76"
                height={barH - 6}
                rx="4"
                fill="#FFFFFF"
                fillOpacity="0.9"
                stroke={pal.stroke}
                strokeWidth="0.8"
              />
              <text
                x={barStartX + barWidth / 2}
                y={barY + barH / 2 + 3.5}
                textAnchor="middle"
                fontSize="12"
                fontWeight="900"
                fill={pal.stroke}
              >
                {toEasternArabicNumerals(labelAr)}
              </text>
            </g>
          )}
        </g>
      ) : (
        // Standard Craft Bar (Cuisenaire-style math manipulative)
        <g data-bar-type="bar">
          {/* Subtle bottom drop shadow */}
          <rect
            x={barStartX + 1}
            y={barY + 1.5}
            width={barWidth}
            height={barH}
            rx="5"
            fill="#0F172A"
            opacity="0.12"
          />
          {/* Main manipulative rod body */}
          <rect
            x={barStartX}
            y={barY}
            width={barWidth}
            height={barH}
            rx="5"
            fill={pal.fill}
            stroke={pal.stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Top edge bevel highlight */}
          <line
            x1={barStartX + 4}
            y1={barY + 2.5}
            x2={startLineX - 4}
            y2={barY + 2.5}
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
          />
          {/* Bottom edge shadow rim */}
          <line
            x1={barStartX + 4}
            y1={barY + barH - 2}
            x2={startLineX - 4}
            y2={barY + barH - 2}
            stroke={pal.fillDark}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Unit segment divider grooves (1-to-1 match with paper clips) */}
          {Array.from({ length: safeLength - 1 }, (_, segIdx) => {
            const seamX = startLineX - (segIdx + 1) * clipWidth;
            return (
              <g key={segIdx}>
                <line
                  x1={seamX}
                  y1={barY + 2}
                  x2={seamX}
                  y2={barY + barH - 2}
                  stroke={pal.stroke}
                  strokeWidth="1.2"
                  opacity="0.35"
                />
                <line
                  x1={seamX - 0.8}
                  y1={barY + 2}
                  x2={seamX - 0.8}
                  y2={barY + barH - 2}
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                  opacity="0.45"
                />
              </g>
            );
          })}
          {labelAr && (
            <g data-bar-label="true">
              <rect
                x={barStartX + barWidth / 2 - 38}
                y={barY + 3}
                width="76"
                height={barH - 6}
                rx="4"
                fill="#FFFFFF"
                fillOpacity="0.9"
                stroke={pal.stroke}
                strokeWidth="0.8"
              />
              <text
                x={barStartX + barWidth / 2}
                y={barY + barH / 2 + 3.5}
                textAnchor="middle"
                fontSize="12"
                fontWeight="900"
                fill={pal.stroke}
              >
                {toEasternArabicNumerals(labelAr)}
              </text>
            </g>
          )}
        </g>
      )}

      {/* Row of Real Metallic Wire Paper Clips Underneath (or mystery placeholder) */}
      {isMysteryWorksheet ? (
        <g data-mystery-clips="true">
          <rect
            x={barStartX}
            y="26"
            width={barWidth}
            height="20"
            rx="5"
            fill="#F1F5F9"
            stroke="#94A3B8"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <text
            x={barStartX + barWidth / 2}
            y="40"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#64748B"
          >
            ؟ مشابك
          </text>
        </g>
      ) : (
        <g data-clips-row="true">
          {Array.from({ length: safeLength }, (_, i) => {
            const clipRightX = startLineX - i * clipWidth;
            const clipLeftX = clipRightX - clipWidth;
            const clipY = 27;

            return (
              <g
                key={i}
                data-clip-index={formatEasternNumber(i + 1)}
                transform={`translate(${clipLeftX + 2}, ${clipY})`}
              >
                {/* Soft ground shadow */}
                <path
                  d="M 5.5 4.5 L 14.5 4.5 A 5.5 5.5 0 0 1 14.5 15.5 L 5.5 15.5 A 3.8 3.8 0 0 1 5.5 7.9 L 12.5 7.9 A 1.9 1.9 0 0 1 12.5 11.7 L 7.5 11.7"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.35"
                />
                {/* Dark steel wire base */}
                <path
                  d="M 5 3.5 L 14.5 3.5 A 5.5 5.5 0 0 1 14.5 14.5 L 5.5 14.5 A 3.8 3.8 0 0 1 5.5 6.9 L 12.5 6.9 A 1.9 1.9 0 0 1 12.5 10.7 L 7 10.7"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Metallic chrome wire core */}
                <path
                  d="M 5 3.5 L 14.5 3.5 A 5.5 5.5 0 0 1 14.5 14.5 L 5.5 14.5 A 3.8 3.8 0 0 1 5.5 6.9 L 12.5 6.9 A 1.9 1.9 0 0 1 12.5 10.7 L 7 10.7"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Top horizontal specular glint */}
                <line
                  x1="6"
                  y1="3.2"
                  x2="14"
                  y2="3.2"
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                {/* Middle horizontal specular glint */}
                <line
                  x1="6.5"
                  y1="6.6"
                  x2="12"
                  y2="6.6"
                  stroke="#FFFFFF"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                />
                {/* Right bend outer glint */}
                <path
                  d="M 17 5.5 A 5.5 5.5 0 0 1 19.5 9"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}

// ============================================================================
// Polygon Perimeter Visual Model (Canonical: 212 × 160 px)
// ============================================================================

export interface PolygonPerimeterOptions {
  shapeId: string; // triangle, square, rectangle, pentagon, hexagon, heptagon, octagon, nonagon
  sideCount: number;
  clipsPerSide?: number;
  totalClips?: number;
  colorTheme?: ColorThemeId;
  showTicks?: boolean; // Ticket 05 side tick marks
}

export interface PolygonPerimeterOptions {
  shapeId: string;
  sideCount: number;
  clipsPerSide?: number;
  totalClips?: number;
  colorTheme?: ColorThemeId;
  showTicks?: boolean;
  mode?: "polygon-sides" | "polygon-perimeter";
  compact?: boolean;
}

export function createPolygonPerimeterSpec(
  options: PolygonPerimeterOptions
): VisualModelSpec {
  const sideCount = Math.max(3, Math.min(9, options.sideCount));
  const clipsPerSide = options.clipsPerSide ?? 1;
  const totalClips = options.totalClips ?? sideCount * clipsPerSide;
  const colorTheme = options.colorTheme ?? "indigo";
  const mode = options.mode ?? "polygon-sides";
  const compact = options.compact ?? false;

  return {
    id: `polygon-perimeter-${options.shapeId}-${sideCount}-${totalClips}${compact ? "-compact" : ""}`,
    kind: "polygon-perimeter",
    count: totalClips,
    colorTheme,
    labelAr: `${formatEasternNumber(sideCount)} أضلاع، ${formatEasternNumber(totalClips)} مشابك`,
    meta: {
      shapeId: options.shapeId,
      sideCount,
      clipsPerSide,
      totalClips,
      showTicks: options.showTicks ?? mode === "polygon-sides",
      mode,
      compact,
    },
  };
}

export function PolygonPerimeterSvg({
  shapeId = "pentagon",
  sideCount = 5,
  clipsPerSide = 1,
  totalClips = 5,
  colorTheme = "indigo",
  showTicks = false,
  mode = "polygon-sides",
  solved = false,
  compact = false,
}: {
  shapeId?: string;
  sideCount?: number;
  clipsPerSide?: number;
  totalClips?: number;
  colorTheme?: ColorThemeId;
  showTicks?: boolean;
  mode?: "polygon-sides" | "polygon-perimeter";
  solved?: boolean;
  compact?: boolean;
}): React.ReactElement {
  const width = compact ? 96 : 212;
  const height = compact ? 48 : 160;
  const cx = width / 2;
  const cy = height / 2;
  const radius = compact ? 18 : 54;
  const pal = COLOR_PALETTES[colorTheme] ?? COLOR_PALETTES.indigo;

  // Regular polygon vertex points (or rectangle if shapeId === "rectangle")
  const points: [number, number][] = [];
  if (shapeId === "rectangle") {
    const rx = compact ? 26 : totalClips === 6 ? 52 : 44;
    const ry = compact ? 14 : 30;
    points.push([cx - rx, cy - ry]);
    points.push([cx + rx, cy - ry]);
    points.push([cx + rx, cy + ry]);
    points.push([cx - rx, cy + ry]);
  } else {
    for (let i = 0; i < sideCount; i++) {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / sideCount;
      points.push([
        cx + radius * Math.cos(angle),
        cy + radius * Math.sin(angle),
      ]);
    }
  }
  const pointsStr = points
    .map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(" ");
  const innerScale = compact ? 0.65 : 0.72;
  const innerPointsStr = points
    .map(
      (p) =>
        `${(cx + (p[0] - cx) * innerScale).toFixed(1)},${(cy + (p[1] - cy) * innerScale).toFixed(1)}`
    )
    .join(" ");

  // Edges data for ticks or clips
  const edges = points.map((p1, idx) => {
    const p2 = points[(idx + 1) % points.length];
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const len = Math.hypot(dx, dy);
    const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
    const midX = (p1[0] + p2[0]) / 2;
    const midY = (p1[1] + p2[1]) / 2;
    const nx = (-dy / len) * (compact ? 3.5 : 6);
    const ny = (dx / len) * (compact ? 3.5 : 6);
    return { p1, p2, dx, dy, len, angleDeg, midX, midY, nx, ny, index: idx };
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      data-visual-model={
        compact ? "polygon-perimeter-compact" : "polygon-perimeter"
      }
      data-sides={sideCount}
      data-clips={totalClips}
      data-polygon-mode={mode}
    >
      <rect
        x="1"
        y="1"
        width={width - 2}
        height={height - 2}
        rx={compact ? 8 : 12}
        fill="#F8FAFC"
        stroke="#E2E8F0"
        strokeWidth="1.2"
      />

      {/* Polygon outline */}
      <polygon
        points={pointsStr}
        fill={pal.accent}
        stroke={pal.stroke}
        strokeWidth={compact ? "2" : "2.8"}
        strokeLinejoin="round"
      />

      {/* Inner geometric concentric guideline */}
      <polygon
        points={innerPointsStr}
        fill="none"
        stroke={pal.fillLight}
        strokeWidth={compact ? "1.2" : "2"}
        strokeDasharray="4 3"
        strokeLinejoin="round"
      />

      {/* Vertex tactile beads */}
      {points.map(([px, py], vIdx) => (
        <g key={vIdx}>
          <circle cx={px} cy={py} r={compact ? 2 : 3.2} fill={pal.stroke} />
          <circle cx={px} cy={py} r={compact ? 0.8 : 1.2} fill="#FFFFFF" />
        </g>
      ))}

      {/* Edge ticks or paper clips */}
      {mode === "polygon-sides" || showTicks ? (
        // Side tick marks
        <g data-edge-ticks="true">
          {edges.map((e) => (
            <g key={e.index}>
              {/* Soft tick contrast shadow */}
              <line
                x1={(e.midX - e.nx).toFixed(1)}
                y1={(e.midY - e.ny).toFixed(1)}
                x2={(e.midX + e.nx).toFixed(1)}
                y2={(e.midY + e.ny).toFixed(1)}
                stroke="#FFFFFF"
                strokeWidth={compact ? "3" : "4.5"}
                strokeLinecap="round"
              />
              {/* Vibrant red tick mark */}
              <line
                x1={(e.midX - e.nx).toFixed(1)}
                y1={(e.midY - e.ny).toFixed(1)}
                x2={(e.midX + e.nx).toFixed(1)}
                y2={(e.midY + e.ny).toFixed(1)}
                stroke="#DC2626"
                strokeWidth={compact ? "1.8" : "2.8"}
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>
      ) : (
        // Perimeter paper clips along each edge
        <g data-edge-clips="true">
          {edges.map((e) => {
            let count = Math.max(1, clipsPerSide);
            if (shapeId === "rectangle" && totalClips === 6) {
              count = e.index % 2 === 0 ? 2 : 1;
            }
            return (
              <g key={e.index}>
                {Array.from({ length: count }, (_, cIdx) => {
                  const frac = (cIdx + 0.5) / count;
                  const px = e.p1[0] + frac * e.dx;
                  const py = e.p1[1] + frac * e.dy;
                  const clipTransform = compact
                    ? `translate(${px.toFixed(1)}, ${py.toFixed(1)}) rotate(${e.angleDeg.toFixed(1)}) scale(0.55)`
                    : `translate(${px.toFixed(1)}, ${py.toFixed(1)}) rotate(${e.angleDeg.toFixed(1)})`;
                  return (
                    <g key={cIdx} transform={clipTransform}>
                      {/* Wire ground shadow */}
                      <path
                        d="M -4.5 -3.5 L 4.5 -3.5 A 3.8 3.8 0 0 1 4.5 4.5 L -4.5 4.5 A 2.7 2.7 0 0 1 -4.5 -1.2 L 3 -1.2 A 1.3 1.3 0 0 1 3 1.6 L -2 1.6"
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.4"
                      />
                      {/* Dark steel wire base */}
                      <path
                        d="M -5 -4 L 4.5 -4 A 4 4 0 0 1 4.5 4 L -4.5 4 A 2.8 2.8 0 0 1 -4.5 -1.6 L 3 -1.6 A 1.4 1.4 0 0 1 3 1.2 L -2 1.2"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="2.0"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Metallic chrome core */}
                      <path
                        d="M -5 -4 L 4.5 -4 A 4 4 0 0 1 4.5 4 L -4.5 4 A 2.8 2.8 0 0 1 -4.5 -1.6 L 3 -1.6 A 1.4 1.4 0 0 1 3 1.2 L -2 1.2"
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Specular shine */}
                      <line
                        x1="-4"
                        y1="-4.2"
                        x2="4"
                        y2="-4.2"
                        stroke="#FFFFFF"
                        strokeWidth="0.7"
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </g>
      )}

      {/* Center count badge with layered depth (Answer Key mode only) */}
      {solved && (
        <g data-center-badge="true">
          <circle
            cx={cx}
            cy={cy}
            r={compact ? 9 : 16}
            fill="#FFFFFF"
            stroke={pal.stroke}
            strokeWidth={compact ? "1.2" : "2"}
          />
          <circle
            cx={cx}
            cy={cy}
            r={compact ? 7 : 13}
            fill={pal.accent}
            stroke={pal.fillLight}
            strokeWidth="1"
          />
          <text
            x={cx}
            y={cy + (compact ? 4 : 4.5)}
            textAnchor="middle"
            fontSize="12"
            fontWeight="900"
            fill={pal.stroke}
          >
            {formatEasternNumber(
              mode === "polygon-perimeter" ? totalClips : sideCount
            )}
          </text>
        </g>
      )}
    </svg>
  );
}

// ============================================================================
// Shape Description Visual Model (for ConnectMatch matching cards)
// ============================================================================

export interface ShapeDescriptionOptions {
  id: string;
  textAr: string;
  missingNumber?: number;
}

export function createShapeDescriptionSpec(
  options: ShapeDescriptionOptions
): VisualModelSpec {
  return {
    id: `desc-${options.id}`,
    kind: "shape-description",
    count: options.missingNumber ?? 0,
    labelAr: options.textAr,
    meta: {
      textAr: options.textAr,
      missingNumber: options.missingNumber,
    },
  };
}

// Self-register with VisualModel registry
registerVisualModel("paper-clip-bar", ({ model, solved }) => {
  const meta = (model.meta ?? {}) as Record<string, unknown>;
  return (
    <PaperClipBarSvg
      length={model.count ?? 5}
      colorTheme={model.colorTheme}
      labelAr={model.labelAr}
      barType={meta.barType as PaperClipBarType}
      mysteryMode={meta.mysteryMode as boolean}
      solved={solved}
    />
  );
});

registerVisualModel("polygon-perimeter", ({ model, solved }) => {
  const meta = (model.meta ?? {}) as Record<string, unknown>;
  return (
    <PolygonPerimeterSvg
      shapeId={(meta.shapeId as string) ?? "pentagon"}
      sideCount={(meta.sideCount as number) ?? model.count ?? 5}
      clipsPerSide={(meta.clipsPerSide as number) ?? 1}
      totalClips={(meta.totalClips as number) ?? model.count ?? 5}
      colorTheme={model.colorTheme}
      showTicks={(meta.showTicks as boolean) ?? false}
      mode={
        (meta.mode as "polygon-sides" | "polygon-perimeter") ?? "polygon-sides"
      }
      solved={solved}
      compact={(meta.compact as boolean) ?? false}
    />
  );
});

registerVisualModel("shape-description", ({ model, solved }) => {
  const meta = (model.meta ?? {}) as Record<string, unknown>;
  const textAr = String(meta.textAr ?? model.labelAr ?? "");
  const missingNum =
    meta.missingNumber !== undefined ? Number(meta.missingNumber) : undefined;

  return (
    <div
      className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/70 px-2.5 py-1 shadow-2xs"
      data-visual-model="shape-description"
      dir="rtl"
    >
      <span className="text-[13px] font-bold leading-tight text-indigo-950">
        {toEasternArabicNumerals(textAr)}
      </span>
      {missingNum !== undefined && (
        <span className="inline-flex items-center">
          <span
            className={`inline-flex h-7 min-w-7 items-center justify-center rounded-lg border-2 px-1 text-xs font-black shadow-2xs ${
              solved
                ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                : "border-amber-400 bg-white text-slate-400"
            }`}
            data-solved-missing-shape-number={
              solved ? formatEasternNumber(missingNum) : undefined
            }
          >
            {solved ? formatEasternNumber(missingNum) : "؟"}
          </span>
        </span>
      )}
    </div>
  );
});
