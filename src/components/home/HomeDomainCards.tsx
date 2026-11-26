"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function useCardTilt(enabled: boolean) {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateY(-5px)`,
    });
  };

  const onPointerLeave = () => {
    if (!enabled) return;
    setTiltStyle({});
  };

  return { tiltStyle, onPointerMove, onPointerLeave };
}

export function HomeDomainCards(): React.ReactElement {
  const prefersReduced = useReducedMotion();
  const [makeTenDone, setMakeTenDone] = useState(false);
  const [chipBounceKey, setChipBounceKey] = useState<string | null>(null);

  const mathTilt = useCardTilt(!prefersReduced);
  const readingTilt = useCardTilt(!prefersReduced);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.1,
        delayChildren: prefersReduced ? 0 : 0.04,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const triggerChipBounce = (id: string) => {
    setChipBounceKey(id);
    setTimeout(() => setChipBounceKey(null), 450);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2"
    >
      {/* ── Mathematics Card (Indigo) ── */}
      <motion.div
        variants={cardVariants}
        data-domain-card="math"
        onPointerMove={mathTilt.onPointerMove}
        onPointerLeave={mathTilt.onPointerLeave}
        style={mathTilt.tiltStyle}
        className="group relative flex flex-col overflow-hidden rounded-[36px] border border-indigo-100/80 bg-white shadow-[0_30px_60px_-28px_rgba(30,60,100,0.4)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_40px_75px_-28px_rgba(67,56,202,0.35)]"
      >
        {/* Illustrated Interactive Art Header */}
        <div
          className="relative grid h-[240px] place-items-center overflow-hidden rounded-t-[36px]"
          style={{
            background: "radial-gradient(circle at 50% 40%, #EEF2FF, #D5E8F0)",
          }}
        >
          <span className="absolute top-4 right-5 z-10 rounded-full bg-white/90 px-3.5 py-1 text-xs font-extrabold text-slate-800 shadow-xs">
            الروضة K ← الصف ٥
          </span>

          <button
            type="button"
            onClick={() => setMakeTenDone((prev) => !prev)}
            aria-label="تفاعل مع إطار العشرة"
            className="h-full w-full cursor-pointer focus:outline-none"
          >
            <svg
              viewBox="0 0 260 235"
              className="mx-auto h-full w-full max-w-[280px]"
              role="img"
              aria-hidden="true"
            >
              <ellipse
                cx="130"
                cy="224"
                rx="62"
                ry="6"
                fill="#4F46E5"
                opacity="0.14"
              />
              {/* Phone Frame */}
              <rect
                x="72"
                y="12"
                width="116"
                height="206"
                rx="24"
                fill="#818CF8"
              />
              <rect
                x="79"
                y="19"
                width="102"
                height="192"
                rx="19"
                fill="#FCF7EE"
              />
              <rect
                x="110"
                y="19"
                width="40"
                height="8"
                rx="4"
                fill="#818CF8"
              />
              <rect
                x="92"
                y="38"
                width="18"
                height="3"
                rx="1.5"
                fill="#818CF8"
              />
              <rect
                x="92"
                y="45"
                width="12"
                height="3"
                rx="1.5"
                fill="#818CF8"
              />
              <circle cx="164" cy="44" r="9" fill="#34D399" />

              {/* Ten-Frame Box */}
              <rect
                x="89"
                y="60"
                width="82"
                height="50"
                rx="12"
                fill="#E0E7FF"
              />
              {Array.from({ length: 10 }).map((_, idx) => {
                const cx = 98 + (idx % 5) * 16.5;
                const cy = 76 + Math.floor(idx / 5) * 20;
                const isInitial = idx < 8;
                const isFilled = isInitial || makeTenDone;
                return (
                  <circle
                    key={idx}
                    cx={cx}
                    cy={cy}
                    r="6.5"
                    fill={isInitial ? "#4F46E5" : isFilled ? "#F43F5E" : "none"}
                    stroke={isFilled ? "none" : "#818CF8"}
                    strokeWidth="1.6"
                    strokeDasharray={isFilled ? undefined : "3 3"}
                  />
                );
              })}

              {/* Extra counters pile */}
              {Array.from({ length: 6 }).map((_, idx) => {
                const moved = makeTenDone && idx >= 4;
                return (
                  <circle
                    key={idx}
                    cx={100 + idx * 12}
                    cy={126}
                    r="5"
                    fill="#F43F5E"
                    style={{
                      opacity: moved ? 0 : 1,
                      transform: moved
                        ? "translateY(-18px) scale(0.3)"
                        : "none",
                      transition: "all 0.35s ease",
                    }}
                  />
                );
              })}

              {/* Equation */}
              <text
                x="130"
                y="174"
                textAnchor="middle"
                fontSize="20"
                fontWeight="800"
                fill="#1E1B4B"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {makeTenDone ? "١٠ + ٤ = ١٤" : "٨ + ٦"}
              </text>
              <rect
                x="104"
                y="188"
                width="52"
                height="8"
                rx="4"
                fill="#E2E8F0"
              />

              {/* Floating Chips */}
              <g
                className={`home-float home-float-2 ${chipBounceKey === "m1" ? "scale-110" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  triggerChipBounce("m1");
                }}
              >
                <rect
                  x="22"
                  y="58"
                  width="50"
                  height="46"
                  rx="14"
                  fill="#F43F5E"
                  transform="rotate(-9 47 81)"
                />
                <text
                  x="47"
                  y="89"
                  textAnchor="middle"
                  transform="rotate(-9 47 81)"
                  fontSize="22"
                  fontWeight="800"
                  fill="#FFFFFF"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  +٦
                </text>
              </g>
              <g
                className={`home-float home-float-3 ${chipBounceKey === "m2" ? "scale-110" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  triggerChipBounce("m2");
                }}
              >
                <rect
                  x="186"
                  y="130"
                  width="50"
                  height="46"
                  rx="14"
                  fill="#F59E0B"
                  transform="rotate(8 211 153)"
                />
                <text
                  x="211"
                  y="161"
                  textAnchor="middle"
                  transform="rotate(8 211 153)"
                  fontSize="23"
                  fontWeight="800"
                  fill="#FFFFFF"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  ٥
                </text>
              </g>
              <g className="home-float">
                <circle cx="212" cy="52" r="25" fill="#FCF7EE" opacity="0.95" />
                <circle
                  cx="212"
                  cy="52"
                  r="19"
                  fill="none"
                  stroke="#E0E7FF"
                  strokeWidth="5.5"
                />
                <circle
                  className="home-ring"
                  cx="212"
                  cy="52"
                  r="19"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  transform="rotate(-90 212 52)"
                />
                <text x="212" y="58" textAnchor="middle" fontSize="17">
                  🔟
                </text>
              </g>
            </svg>
          </button>
        </div>

        {/* Curved Lip Body */}
        <div className="home-card-lip relative flex flex-1 flex-col justify-between bg-white px-7 pt-2 pb-7">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-extrabold text-indigo-700">
              استوديو المعلم
            </div>
            <h2 className="mb-1.5 text-2xl font-black text-indigo-950">
              الرياضيات
            </h2>
            <p className="mb-4 text-sm font-semibold leading-relaxed text-slate-600">
              أوراق عمل تفاعلية عالية الدقة ومفاتيح إجابة مطابقة وملاحظات المعلم
              لتغطية منهج الرياضيات من الروضة K حتى الصف ٥.
            </p>

            <ul className="mb-6 space-y-2 text-xs font-semibold text-slate-500">
              <li className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-indigo-500" />
                طباعة ورقية نظيفة بدون إعلانات أو طفح صفحات
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-indigo-500" />
                تدرج دقيق في مستويات الصعوبة مع نماذج بصرية SVG
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-indigo-500" />
                توليد عشوائي محدد بالبذور لضمان إعادة إنتاج الأوراق
              </li>
            </ul>
          </div>

          <Link
            href="/math"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-indigo-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_14px_26px_-12px_rgba(79,70,229,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span>دخول استوديو الرياضيات</span>
            <span aria-hidden="true" className="text-base leading-none">
              &larr;
            </span>
          </Link>
        </div>
      </motion.div>

      {/* ── Reading Comprehension Card (Emerald) ── */}
      <motion.div
        variants={cardVariants}
        data-domain-card="reading"
        onPointerMove={readingTilt.onPointerMove}
        onPointerLeave={readingTilt.onPointerLeave}
        style={readingTilt.tiltStyle}
        className="group relative flex flex-col overflow-hidden rounded-[36px] border border-emerald-100/80 bg-white shadow-[0_30px_60px_-28px_rgba(30,60,100,0.4)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_40px_75px_-28px_rgba(5,150,105,0.35)]"
      >
        {/* Illustrated Art Header */}
        <div
          className="relative grid h-[240px] place-items-center overflow-hidden rounded-t-[36px]"
          style={{
            background: "radial-gradient(circle at 50% 40%, #ECFDF5, #D5E8F0)",
          }}
        >
          <span className="absolute top-4 right-5 z-10 rounded-full bg-white/90 px-3.5 py-1 text-xs font-extrabold text-slate-800 shadow-xs">
            مبتدئ ← متقدّم
          </span>

          <svg
            viewBox="0 0 260 235"
            className="mx-auto h-full w-full max-w-[280px]"
            role="img"
            aria-hidden="true"
          >
            <ellipse
              cx="130"
              cy="224"
              rx="62"
              ry="6"
              fill="#059669"
              opacity="0.14"
            />
            {/* Phone Frame */}
            <rect
              x="72"
              y="12"
              width="116"
              height="206"
              rx="24"
              fill="#6EE7B7"
            />
            <rect
              x="79"
              y="19"
              width="102"
              height="192"
              rx="19"
              fill="#FCF7EE"
            />
            <rect x="110" y="19" width="40" height="8" rx="4" fill="#6EE7B7" />
            <rect x="92" y="38" width="18" height="3" rx="1.5" fill="#34D399" />
            <rect x="92" y="45" width="12" height="3" rx="1.5" fill="#34D399" />
            <circle cx="164" cy="44" r="9" fill="#818CF8" />

            <rect x="90" y="62" width="80" height="48" rx="12" fill="#D1FAE5" />
            <text
              x="130"
              y="97"
              textAnchor="middle"
              fontSize="32"
              fontWeight="800"
              fill="#047857"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              ع
            </text>

            {/* Word-tracking highlight bars */}
            <rect
              x="92"
              y="124"
              width="76"
              height="9"
              rx="4.5"
              fill="#E7E0D2"
            />
            <rect
              className="home-hl"
              x="92"
              y="124"
              width="76"
              height="9"
              rx="4.5"
              fill="#F59E0B"
            />
            <rect
              x="92"
              y="142"
              width="76"
              height="9"
              rx="4.5"
              fill="#E7E0D2"
            />
            <rect
              className="home-hl home-hl-2"
              x="92"
              y="142"
              width="76"
              height="9"
              rx="4.5"
              fill="#F59E0B"
            />
            <rect
              x="92"
              y="160"
              width="50"
              height="9"
              rx="4.5"
              fill="#E7E0D2"
            />

            <circle cx="102" cy="190" r="8" fill="#10B981" />
            <path
              d="M98 190l3 3 5-6"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <rect x="116" y="186" width="42" height="8" rx="4" fill="#E7E0D2" />

            {/* Floating Arabic letter tiles */}
            <g
              className={`home-float home-float-2 cursor-pointer ${chipBounceKey === "r1" ? "scale-110" : ""}`}
              onClick={() => triggerChipBounce("r1")}
            >
              <rect
                x="24"
                y="56"
                width="48"
                height="48"
                rx="14"
                fill="#F59E0B"
                transform="rotate(-9 48 80)"
              />
              <text
                x="48"
                y="90"
                textAnchor="middle"
                transform="rotate(-9 48 80)"
                fontSize="28"
                fontWeight="800"
                fill="#FFFFFF"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                أ
              </text>
            </g>
            <g
              className={`home-float home-float-3 cursor-pointer ${chipBounceKey === "r2" ? "scale-110" : ""}`}
              onClick={() => triggerChipBounce("r2")}
            >
              <rect
                x="186"
                y="128"
                width="46"
                height="46"
                rx="13"
                fill="#10B981"
                transform="rotate(8 209 151)"
              />
              <text
                x="209"
                y="162"
                textAnchor="middle"
                transform="rotate(8 209 151)"
                fontSize="26"
                fontWeight="800"
                fill="#FFFFFF"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                ب
              </text>
            </g>
            <g className="home-float">
              <circle cx="212" cy="52" r="25" fill="#FCF7EE" opacity="0.95" />
              <circle
                cx="212"
                cy="52"
                r="19"
                fill="none"
                stroke="#D1FAE5"
                strokeWidth="5.5"
              />
              <circle
                className="home-ring"
                cx="212"
                cy="52"
                r="19"
                fill="none"
                stroke="#10B981"
                strokeWidth="5.5"
                strokeLinecap="round"
                transform="rotate(-90 212 52)"
              />
              <text x="212" y="58" textAnchor="middle" fontSize="17">
                📖
              </text>
            </g>
          </svg>
        </div>

        {/* Curved Lip Body */}
        <div className="home-card-lip relative flex flex-1 flex-col justify-between bg-white px-7 pt-2 pb-7">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
              نادي القراءة
            </div>
            <h2 className="mb-1.5 text-2xl font-black text-emerald-950">
              الفهم القرائي
            </h2>
            <p className="mb-4 text-sm font-semibold leading-relaxed text-slate-600">
              رحلات قرائية متكاملة بمحطات تعليمية متسلسلة، تدريب استقرائي على
              القواعد، ومحدد بصري لأماكن الأدلة في النص لتعزيز الفهم العميق.
            </p>

            <ul className="mb-6 space-y-2 text-xs font-semibold text-slate-500">
              <li className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
                ست محطات تعليمية من القراءة الاستكشافية حتى التعبير والإنتاج
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
                مستويات تشكيل متدرجة وإبراز الكلمات البصرية بدون تشتيت
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
                ركن القراءة الحرة واختبارات قياس انتقال أثر التعلم
              </li>
            </ul>
          </div>

          <Link
            href="/reading"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_14px_26px_-12px_rgba(5,150,105,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <span>دخول نادي القراءة</span>
            <span aria-hidden="true" className="text-base leading-none">
              &larr;
            </span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default HomeDomainCards;
