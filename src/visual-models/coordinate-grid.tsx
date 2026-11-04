import React from "react";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";

export interface CoordinateGridPoint {
  x: number;
  y: number;
  label?: string;
  color?: string;
}

export interface CoordinateGridProps {
  maxCoord?: number;
  points?: CoordinateGridPoint[];
  width?: number | string;
  height?: number | string;
  className?: string;
  showGridLines?: boolean;
  showLabels?: boolean;
  accentColor?: string;
}

export function CoordinateGrid({
  maxCoord = 5,
  points = [{ x: 3, y: 4, label: "ن (٣، ٤)", color: "#8b5cf6" }],
  width = "100%",
  height = "100%",
  className = "",
  showGridLines = true,
  showLabels = true,
  accentColor = "#7c3aed",
}: CoordinateGridProps): React.ReactElement {
  // SVG coordinates: viewBox 0 0 200 200
  // Origin (0,0) at (30, 170)
  // Max coord (5,5) at (170, 30)
  const originX = 35;
  const originY = 165;
  const gridWidth = 130;
  const gridHeight = 130;
  const step = gridWidth / maxCoord;

  const mapX = (x: number) => originX + x * step;
  const mapY = (y: number) => originY - y * step;

  return (
    <svg
      viewBox="0 0 200 200"
      width={width}
      height={height}
      className={className}
      aria-label="المستوى الإحداثي"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background soft fill */}
      <rect
        x="10"
        y="10"
        width="180"
        height="180"
        rx="16"
        className="fill-violet-50/50"
      />

      {/* Grid Lines */}
      {showGridLines &&
        Array.from({ length: maxCoord + 1 }, (_, i) => {
          const x = originX + i * step;
          const y = originY - i * step;
          return (
            <React.Fragment key={`grid-${i}`}>
              {/* Vertical line */}
              <line
                x1={x}
                y1={originY}
                x2={x}
                y2={originY - gridHeight}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              {/* Horizontal line */}
              <line
                x1={originX}
                y1={y}
                x2={originX + gridWidth}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </React.Fragment>
          );
        })}

      {/* X Axis */}
      <line
        x1={originX - 5}
        y1={originY}
        x2={originX + gridWidth + 12}
        y2={originY}
        stroke="#64748b"
        strokeWidth="2"
        markerEnd="url(#arrow-x)"
      />
      {/* Y Axis */}
      <line
        x1={originX}
        y1={originY + 5}
        x2={originX}
        y2={originY - gridHeight - 12}
        stroke="#64748b"
        strokeWidth="2"
        markerEnd="url(#arrow-y)"
      />

      {/* Arrowhead markers */}
      <defs>
        <marker
          id="arrow-x"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker
          id="arrow-y"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      {/* Axis Name Labels in Arabic */}
      {showLabels && (
        <>
          <text
            x={originX + gridWidth + 14}
            y={originY + 4}
            fontSize="11"
            fontWeight="bold"
            fill="#475569"
            fontFamily="Cairo, sans-serif"
          >
            س
          </text>
          <text
            x={originX}
            y={originY - gridHeight - 14}
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
            fill="#475569"
            fontFamily="Cairo, sans-serif"
          >
            ص
          </text>
          {/* Origin 0 */}
          <text
            x={originX - 8}
            y={originY + 14}
            fontSize="10"
            fontWeight="bold"
            fill="#94a3b8"
            fontFamily="Cairo, sans-serif"
          >
            {formatEasternNumber(0)}
          </text>
        </>
      )}

      {/* Tick labels */}
      {showLabels &&
        Array.from({ length: maxCoord }, (_, i) => {
          const val = i + 1;
          const x = mapX(val);
          const y = mapY(val);
          return (
            <React.Fragment key={`tick-${val}`}>
              {/* X tick */}
              <text
                x={x}
                y={originY + 13}
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
                fill="#64748b"
                fontFamily="Cairo, sans-serif"
              >
                {formatEasternNumber(val)}
              </text>
              {/* Y tick */}
              <text
                x={originX - 9}
                y={y + 3}
                fontSize="9"
                fontWeight="bold"
                textAnchor="end"
                fill="#64748b"
                fontFamily="Cairo, sans-serif"
              >
                {formatEasternNumber(val)}
              </text>
            </React.Fragment>
          );
        })}

      {/* Plotted Points */}
      {points.map((pt, idx) => {
        const px = mapX(pt.x);
        const py = mapY(pt.y);
        const color = pt.color ?? accentColor;

        return (
          <g key={`pt-${idx}`}>
            {/* Soft pulse glow ring */}
            <circle
              cx={px}
              cy={py}
              r="10"
              fill={color}
              opacity="0.2"
              className="animate-pulse"
            />
            {/* Solid point */}
            <circle
              cx={px}
              cy={py}
              r="5"
              fill={color}
              stroke="#ffffff"
              strokeWidth="2"
            />
            {/* Guide dashed lines to axes */}
            <line
              x1={px}
              y1={py}
              x2={px}
              y2={originY}
              stroke={color}
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.6"
            />
            <line
              x1={px}
              y1={py}
              x2={originX}
              y2={py}
              stroke={color}
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.6"
            />
            {/* Point label */}
            {pt.label && (
              <text
                x={px + 6}
                y={py - 6}
                fontSize="9"
                fontWeight="bold"
                fill={color}
                fontFamily="Cairo, sans-serif"
              >
                {pt.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default CoordinateGrid;
