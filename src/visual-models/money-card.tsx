import React from "react";
import type { CoinDenomination, VisualModelSpec } from "@/domain/types";
import { toEasternArabicNumerals } from "@/lib/numerals";
import { registerVisualModel } from "@/visual-models/registry";
import { getCoinByDenomination } from "@/visual-models/shapes-solids-coins";
import { CANONICAL_SIZES_PX } from "@/components/worksheet/layout-standard";

/**
 * Money Card Visual Model — Grade K Unit 10 (WORKSHEET_CONSTITUTION.md §3.4 & §10.1, ADR-0016).
 *
 * Canonical size: 212 × 160 px (3-column friendly).
 * Renders a richly styled SVG Egyptian coin face (٢٥ قرشاً، ٥٠ قرشاً، ١ جنيه)
 * or Egyptian banknote rectangle (٥ جنيهات، ١٠ جنيهات).
 *
 * - Grayscale cue (§2.5): distinct radius, inner ring dash pattern, milled rim /
 *   bimetallic ring for coins; distinct border ornament & security bands for bills.
 * - Answer Key state (§8.2): subtle emerald solved frame around the card.
 * - Perception mode (§10.3): `perceive` — child identifies coin/bill by visual
 *   attributes without counting.
 * - Unknown positions (§10.1): name or value written below via AnswerLine.
 */

export function createMoneyCardSpec(
  denomination: CoinDenomination,
  overrides?: Partial<VisualModelSpec>
): VisualModelSpec {
  const def = getCoinByDenomination(denomination);
  return {
    kind: "money-card",
    id: `money-card-${denomination}`,
    labelAr: def.labelAr,
    denomination: def.denomination,
    colorTheme: def.colorTheme,
    meta: {
      currencyKind: def.currencyKind,
      nameAr: def.nameAr,
      valueAr: def.valueAr,
      perceptionMode: "perceive",
    },
    ...overrides,
  };
}

export function MoneyCardSvg({
  denomination = 25,
  solved = false,
}: {
  denomination?: CoinDenomination;
  solved?: boolean;
}): React.ReactElement {
  const def = getCoinByDenomination(denomination);
  const { width, height } = CANONICAL_SIZES_PX.moneyCardBox; // 212 × 160
  const cx = width / 2; // 106
  const cy = height / 2; // 80

  const cardStroke = solved ? "#059669" : "#CBD5E1";
  const cardBg = solved ? "#ECFDF5" : "#F8FAFC";

  if (def.currencyKind === "bill") {
    const isFive = denomination === 500;
    const billW = isFive ? 168 : 176;
    const billH = isFive ? 94 : 98;
    const bx = cx - billW / 2;
    const by = cy - billH / 2;
    const outerFill = isFive ? "#D1FAE5" : "#FEF3C7";
    const innerFill = isFive ? "#ECFDF5" : "#FFFBEB";
    const stroke = isFive ? "#065F46" : "#78350F";
    const accent = isFive ? "#10B981" : "#D97706";
    const textColor = isFive ? "#064E3B" : "#451A03";

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        data-visual-model="money-card"
        data-denomination={def.faceNumeralAr}
        data-currency-kind="bill"
        aria-label={toEasternArabicNumerals(def.labelAr)}
      >
        <rect
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          rx="14"
          fill={cardBg}
          stroke={cardStroke}
          strokeWidth={solved ? "2.4" : "1.5"}
        />
        {/* Banknote body */}
        <rect
          x={bx}
          y={by}
          width={billW}
          height={billH}
          rx="8"
          fill={outerFill}
          stroke={stroke}
          strokeWidth="2.4"
        />
        {/* Inner guilloche frame */}
        <rect
          x={bx + 8}
          y={by + 8}
          width={billW - 16}
          height={billH - 16}
          rx="4"
          fill={innerFill}
          stroke={stroke}
          strokeWidth="1.4"
          strokeDasharray={isFive ? "none" : "5 3"}
        />
        {/* Grayscale security band (vertical on 5 EGP, dual band + medallion on 10 EGP) */}
        <rect
          x={bx + 20}
          y={by + 8}
          width="10"
          height={billH - 16}
          fill={accent}
          opacity="0.28"
        />
        {!isFive && (
          <polygon
            points={`${cx},${by + 14} ${cx + 26},${cy} ${cx},${by + billH - 14} ${cx - 26},${cy}`}
            fill={accent}
            opacity="0.16"
            stroke={stroke}
            strokeWidth="1"
          />
        )}
        {/* Corner denomination badges */}
        <text
          x={bx + billW - 16}
          y={by + 24}
          textAnchor="end"
          fill={textColor}
          fontSize="13"
          fontWeight="900"
        >
          {def.faceNumeralAr}
        </text>
        <text
          x={bx + 16}
          y={by + billH - 14}
          textAnchor="start"
          fill={textColor}
          fontSize="13"
          fontWeight="900"
        >
          {def.faceNumeralAr}
        </text>
        {/* Center numeral + unit */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          dominantBaseline="central"
          fill={textColor}
          fontSize="28"
          fontWeight="900"
        >
          {def.faceNumeralAr}
        </text>
        <text
          x={cx}
          y={cy + 20}
          textAnchor="middle"
          dominantBaseline="central"
          fill={textColor}
          fontSize="13"
          fontWeight="800"
        >
          {def.faceUnitAr}
        </text>
      </svg>
    );
  }

  // Egyptian coins (25 piasters, 50 piasters, 1 pound bimetallic)
  const radiusMap: Record<25 | 50 | 100, number> = {
    25: 38,
    50: 46,
    100: 54,
  };
  const r = radiusMap[denomination as 25 | 50 | 100] ?? 42;
  const coinColors: Record<
    25 | 50 | 100,
    {
      outer: string;
      inner: string;
      stroke: string;
      text: string;
      shine: string;
    }
  > = {
    25: {
      outer: "#94A3B8",
      inner: "#E2E8F0",
      stroke: "#334155",
      text: "#0F172A",
      shine: "#F8FAFC",
    },
    50: {
      outer: "#64748B",
      inner: "#CBD5E1",
      stroke: "#1E293B",
      text: "#0F172A",
      shine: "#F1F5F9",
    },
    100: {
      outer: "#D97706",
      inner: "#E2E8F0",
      stroke: "#78350F",
      text: "#0F172A",
      shine: "#FEF3C7",
    },
  };
  const style = coinColors[denomination as 25 | 50 | 100] ?? coinColors[25];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      data-visual-model="money-card"
      data-denomination={def.faceNumeralAr}
      data-currency-kind="coin"
      aria-label={toEasternArabicNumerals(def.labelAr)}
    >
      <rect
        x="1"
        y="1"
        width={width - 2}
        height={height - 2}
        rx="14"
        fill={cardBg}
        stroke={cardStroke}
        strokeWidth={solved ? "2.4" : "1.5"}
      />
      {/* Outer coin disc */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={style.outer}
        stroke={style.stroke}
        strokeWidth="2.8"
      />
      {/* Inner ring */}
      <circle
        cx={cx}
        cy={cy}
        r={denomination === 100 ? r - 14 : r - 7}
        fill={style.inner}
        stroke={style.stroke}
        strokeWidth="1.6"
        strokeDasharray={
          denomination === 25 ? "3 3" : denomination === 50 ? "none" : "6 3"
        }
      />
      {/* Metallic shine arc */}
      <path
        d={`M ${cx - Math.round(r * 0.45)} ${cy - Math.round(r * 0.45)} L ${
          cx - Math.round(r * 0.2)
        } ${cy - Math.round(r * 0.65)}`}
        stroke={style.shine}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Denomination numeral + unit */}
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        dominantBaseline="central"
        fill={style.text}
        fontSize="28"
        fontWeight="900"
      >
        {def.faceNumeralAr}
      </text>
      <text
        x={cx}
        y={cy + 16}
        textAnchor="middle"
        dominantBaseline="central"
        fill={style.text}
        fontSize="13"
        fontWeight="800"
      >
        {def.faceUnitAr}
      </text>
    </svg>
  );
}

registerVisualModel("money-card", ({ model, solved }) => {
  const denomination = (model.denomination ?? 25) as CoinDenomination;
  return <MoneyCardSvg denomination={denomination} solved={solved} />;
});
