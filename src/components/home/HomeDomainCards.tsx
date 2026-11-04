"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function HomeDomainCards(): React.ReactElement {
  const prefersReduced = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.08,
        delayChildren: prefersReduced ? 0 : 0.04,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
    >
      {/* Mathematics Card */}
      <motion.div
        variants={cardVariants}
        whileHover={
          !prefersReduced
            ? {
                y: -4,
                transition: { duration: 0.25, ease: "easeOut" },
              }
            : undefined
        }
        data-domain-card="math"
        className="group flex flex-col justify-between rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/15"
      >
        <div>
          {/* Card Illustration */}
          <div className="mb-6 flex h-36 w-full items-center justify-center rounded-2xl bg-indigo-50/70 border border-indigo-100/60 p-4 group-hover:bg-indigo-50/90 transition-colors">
            <motion.div
              whileHover={
                !prefersReduced
                  ? {
                      scale: 1.05,
                      transition: { duration: 0.25, ease: "easeOut" },
                    }
                  : undefined
              }
              className="flex items-center justify-center"
            >
              <svg
                width="120"
                height="80"
                viewBox="0 0 120 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="text-indigo-600 transition-transform duration-300"
              >
                <rect
                  x="10"
                  y="15"
                  width="45"
                  height="45"
                  rx="8"
                  className="fill-indigo-100 stroke-indigo-400"
                  strokeWidth="2"
                />
                <circle
                  cx="85"
                  cy="38"
                  r="24"
                  className="fill-indigo-200 stroke-indigo-500"
                  strokeWidth="2"
                />
                <line
                  x1="20"
                  y1="38"
                  x2="45"
                  y2="38"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="32.5"
                  y1="25.5"
                  x2="32.5"
                  y2="50.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <text
                  x="85"
                  y="44"
                  textAnchor="middle"
                  className="fill-indigo-900 font-extrabold text-lg"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  ٥
                </text>
              </svg>
            </motion.div>
          </div>

          {/* Card Content */}
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-extrabold text-indigo-700">
            استوديو المعلم
          </div>
          <h2 className="text-2xl font-black text-indigo-950 mb-2">
            الرياضيات
          </h2>
          <p className="text-sm font-semibold text-slate-600 leading-relaxed mb-6">
            أوراق عمل تفاعلية عالية الدقة ومفاتيح إجابة مطابقة وملاحظات المعلم
            لتغطية منهج الرياضيات من الروضة K حتى الصف ٥.
          </p>

          <ul className="mb-8 space-y-2 text-xs font-semibold text-slate-500">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              طباعة ورقية نظيفة بدون إعلانات أو طفح صفحات
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              تدرج دقيق في مستويات الصعوبة مع نماذج بصرية SVG
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              توليد عشوائي محدد بالبذور لضمان إعادة إنتاج الأوراق
            </li>
          </ul>
        </div>

        <Link
          href="/math"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-xs transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span>دخول استوديو الرياضيات</span>
          <span aria-hidden="true">&larr;</span>
        </Link>
      </motion.div>

      {/* Reading Comprehension Card */}
      <motion.div
        variants={cardVariants}
        whileHover={
          !prefersReduced
            ? {
                y: -4,
                transition: { duration: 0.25, ease: "easeOut" },
              }
            : undefined
        }
        data-domain-card="reading"
        className="group flex flex-col justify-between rounded-3xl border border-emerald-100 bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/15"
      >
        <div>
          {/* Card Illustration */}
          <div className="mb-6 flex h-36 w-full items-center justify-center rounded-2xl bg-emerald-50/70 border border-emerald-100/60 p-4 group-hover:bg-emerald-50/90 transition-colors">
            <motion.div
              whileHover={
                !prefersReduced
                  ? {
                      scale: 1.05,
                      transition: { duration: 0.25, ease: "easeOut" },
                    }
                  : undefined
              }
              className="flex items-center justify-center"
            >
              <svg
                width="120"
                height="80"
                viewBox="0 0 120 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="text-emerald-600 transition-transform duration-300"
              >
                <path
                  d="M60 25C48 18 25 18 15 22V65C25 61 48 61 60 68C72 61 95 61 105 65V22C95 18 72 18 60 25Z"
                  className="fill-emerald-100 stroke-emerald-500"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <line
                  x1="60"
                  y1="25"
                  x2="60"
                  y2="68"
                  className="stroke-emerald-600"
                  strokeWidth="2"
                />
                <line
                  x1="25"
                  y1="34"
                  x2="50"
                  y2="34"
                  className="stroke-emerald-400"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="25"
                  y1="44"
                  x2="45"
                  y2="44"
                  className="stroke-emerald-400"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="70"
                  y1="34"
                  x2="95"
                  y2="34"
                  className="stroke-emerald-400"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="75"
                  y1="44"
                  x2="95"
                  y2="44"
                  className="stroke-emerald-400"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Card Content */}
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700">
            نادي القراءة
          </div>
          <h2 className="text-2xl font-black text-emerald-950 mb-2">
            الفهم القرائي
          </h2>
          <p className="text-sm font-semibold text-slate-600 leading-relaxed mb-6">
            رحلات قرائية متكاملة بمحطات تعليمية متسلسلة، تدريب استقرائي على
            القواعد، ومحدد بصري لأماكن الأدلة في النص لتعزيز الفهم العميق.
          </p>

          <ul className="mb-8 space-y-2 text-xs font-semibold text-slate-500">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ست محطات تعليمية من القراءة الاستكشافية حتى التعبير والإنتاج
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              مستويات تشكيل متدرجة وإبراز الكلمات البصرية بدون تشتيت
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ركن القراءة الحرة واختبارات قياس انتقال أثر التعلم
            </li>
          </ul>
        </div>

        <Link
          href="/reading"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white shadow-xs transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <span>دخول نادي القراءة</span>
          <span aria-hidden="true">&larr;</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default HomeDomainCards;
