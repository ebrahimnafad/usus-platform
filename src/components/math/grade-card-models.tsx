import React from "react";
import type { GradeVisualModelKey } from "@/config/grades";
import { CoordinateGrid } from "@/visual-models/coordinate-grid";
import { formatEasternNumber } from "@/lib/numerals";

export function FiveFrameModel(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 160 50"
      width="100%"
      height="100%"
      className="max-h-16 w-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="لوحة الخمسة"
      role="img"
    >
      <rect
        x="5"
        y="5"
        width="150"
        height="40"
        rx="8"
        className="fill-rose-50/70 stroke-rose-300"
        strokeWidth="2"
      />
      {/* 5 cells, 4 vertical dividers */}
      {[35, 65, 95, 125].map((x) => (
        <line
          key={x}
          x1={x}
          y1="5"
          x2={x}
          y2="45"
          className="stroke-rose-200"
          strokeWidth="1.5"
        />
      ))}
      {/* 3 Filled counters (RTL: right to left -> slots 0, 1, 2 from right at x=140, 110, 80) */}
      {[140, 110, 80].map((cx, i) => (
        <circle
          key={i}
          cx={cx}
          cy="25"
          r="12"
          className="fill-rose-500 shadow-xs"
        />
      ))}
      {/* 2 Empty ghost slots */}
      {[50, 20].map((cx, i) => (
        <circle
          key={i}
          cx={cx}
          cy="25"
          r="11"
          className="stroke-rose-300 fill-white"
          strokeWidth="1.5"
          strokeDasharray="3,3"
        />
      ))}
    </svg>
  );
}

export function TenFrameModel(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 160 70"
      width="100%"
      height="100%"
      className="max-h-16 w-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="لوحة العشرة"
      role="img"
    >
      <rect
        x="5"
        y="5"
        width="150"
        height="60"
        rx="8"
        className="fill-orange-50/70 stroke-orange-300"
        strokeWidth="2"
      />
      {/* Horizontal divider */}
      <line
        x1="5"
        y1="35"
        x2="155"
        y2="35"
        className="stroke-orange-200"
        strokeWidth="1.5"
      />
      {/* Vertical dividers */}
      {[35, 65, 95, 125].map((x) => (
        <line
          key={x}
          x1={x}
          y1="5"
          x2={x}
          y2="65"
          className="stroke-orange-200"
          strokeWidth="1.5"
        />
      ))}
      {/* Row 1 (all 5 filled) */}
      {[140, 110, 80, 50, 20].map((cx, i) => (
        <circle
          key={`r1-${i}`}
          cx={cx}
          cy="20"
          r="9.5"
          className="fill-orange-500 shadow-xs"
        />
      ))}
      {/* Row 2 (2 filled from right, 3 empty) */}
      {[140, 110].map((cx, i) => (
        <circle
          key={`r2-fill-${i}`}
          cx={cx}
          cy="50"
          r="9.5"
          className="fill-orange-400 shadow-xs"
        />
      ))}
      {[80, 50, 20].map((cx, i) => (
        <circle
          key={`r2-empty-${i}`}
          cx={cx}
          cy="50"
          r="9"
          className="stroke-orange-300 fill-white"
          strokeWidth="1.5"
          strokeDasharray="2,2"
        />
      ))}
    </svg>
  );
}

export function NumberLineModel(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 180 60"
      width="100%"
      height="100%"
      className="max-h-16 w-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="خط الأعداد"
      role="img"
    >
      {/* Main horizontal line with end arrows */}
      <line
        x1="12"
        y1="38"
        x2="168"
        y2="38"
        className="stroke-amber-400"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Left arrow */}
      <polyline
        points="18,33 12,38 18,43"
        className="stroke-amber-400 fill-none"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Right arrow */}
      <polyline
        points="162,33 168,38 162,43"
        className="stroke-amber-400 fill-none"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Curved hop from 0 to 4 (RTL: 0 is at right x=145, 4 is at x=65) */}
      <path
        d="M 145 34 Q 105 10 65 34"
        className="stroke-amber-600 fill-none"
        strokeWidth="2"
        strokeDasharray="3,3"
      />
      <circle cx="145" cy="38" r="3.5" className="fill-amber-600" />
      <circle cx="65" cy="38" r="4.5" className="fill-amber-600" />

      {/* Hop label */}
      <text
        x="105"
        y="16"
        textAnchor="middle"
        className="fill-amber-700 font-extrabold text-[10px]"
        fontFamily="Cairo, sans-serif"
      >
        +{formatEasternNumber(4)}
      </text>

      {/* Ticks and Arabic labels: 6 ticks from right to left */}
      {[
        { x: 145, val: 0 },
        { x: 125, val: 1 },
        { x: 105, val: 2 },
        { x: 85, val: 3 },
        { x: 65, val: 4 },
        { x: 45, val: 5 },
      ].map((tick) => (
        <React.Fragment key={tick.val}>
          <line
            x1={tick.x}
            y1="33"
            x2={tick.x}
            y2="43"
            className="stroke-amber-500"
            strokeWidth="2"
          />
          <text
            x={tick.x}
            y="54"
            textAnchor="middle"
            className="fill-amber-900 font-bold text-[9px]"
            fontFamily="Cairo, sans-serif"
          >
            {formatEasternNumber(tick.val)}
          </text>
        </React.Fragment>
      ))}
    </svg>
  );
}

export function ArrayModel(): React.ReactElement {
  // 3 rows × 4 columns of rounded elements
  return (
    <svg
      viewBox="0 0 160 70"
      width="100%"
      height="100%"
      className="max-h-16 w-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="شبكة المصفوفة"
      role="img"
    >
      <rect
        x="5"
        y="5"
        width="150"
        height="60"
        rx="8"
        className="fill-emerald-50/70 stroke-emerald-200"
        strokeWidth="1.5"
      />
      {/* 3 rows × 4 cols grid */}
      {[16, 35, 54].map((cy, row) => (
        <React.Fragment key={`row-${row}`}>
          {[130, 95, 60, 25].map((cx, col) => (
            <rect
              key={`dot-${row}-${col}`}
              x={cx - 7}
              y={cy - 7}
              width="14"
              height="14"
              rx="4"
              className="fill-emerald-500 shadow-xs transition-transform duration-300 hover:scale-110"
            />
          ))}
        </React.Fragment>
      ))}
    </svg>
  );
}

export function BarModel(): React.ReactElement {
  // Fraction tape / bar divided into 4 parts, 3 shaded
  return (
    <svg
      viewBox="0 0 170 65"
      width="100%"
      height="100%"
      className="max-h-16 w-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="النموذج الشريطي"
      role="img"
    >
      {/* Outer border bar */}
      <rect
        x="10"
        y="12"
        width="150"
        height="32"
        rx="6"
        className="fill-white stroke-sky-400"
        strokeWidth="2"
      />
      {/* 3 shaded parts (each part width 37.5) */}
      <rect
        x="47.5"
        y="12"
        width="112.5"
        height="32"
        className="fill-sky-500"
        rx="5"
      />
      {/* Internal partition lines */}
      {[47.5, 85, 122.5].map((x) => (
        <line
          key={x}
          x1={x}
          y1="12"
          x2={x}
          y2="44"
          className="stroke-white"
          strokeWidth="2"
        />
      ))}
      {/* Label bracket underneath: 3/4 */}
      <text
        x="103.75"
        y="58"
        textAnchor="middle"
        className="fill-sky-900 font-extrabold text-[11px]"
        fontFamily="Cairo, sans-serif"
      >
        {formatEasternNumber(3)} / {formatEasternNumber(4)}
      </text>
      <text
        x="28.75"
        y="58"
        textAnchor="middle"
        className="fill-slate-400 font-bold text-[10px]"
        fontFamily="Cairo, sans-serif"
      >
        {formatEasternNumber(1)} / {formatEasternNumber(4)}
      </text>
    </svg>
  );
}

export function GradeCardVisualModel({
  modelKey,
}: {
  modelKey: GradeVisualModelKey;
}): React.ReactElement {
  switch (modelKey) {
    case "FiveFrame":
      return <FiveFrameModel />;
    case "TenFrame":
      return <TenFrameModel />;
    case "NumberLine":
      return <NumberLineModel />;
    case "ArrayModel":
      return <ArrayModel />;
    case "BarModel":
      return <BarModel />;
    case "CoordinateGrid":
      return (
        <div className="h-16 w-16">
          <CoordinateGrid
            maxCoord={4}
            points={[{ x: 3, y: 3, color: "#8b5cf6" }]}
            showLabels={false}
          />
        </div>
      );
    default:
      return <FiveFrameModel />;
  }
}
