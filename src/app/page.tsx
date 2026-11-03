import React from "react";
import Link from "next/link";

export default function HomePage(): React.ReactElement {
  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between"
    >
      <main className="max-w-5xl mx-auto px-4 py-12 sm:py-16 flex-1 w-full">
        {/* Welcome Header */}
        <header className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold mb-4">
            منصة أُسُس التعليمية
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-3">
            أُسُس
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            منصة عربية متكاملة لتمكين المعلمين والطلاب في الرياضيات وبناء مهارات
            الفهم القرائي وفق أحدث الأساليب التربوية
          </p>
        </header>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Mathematics Card */}
          <div
            data-domain-card="math"
            className="flex flex-col justify-between rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-xs transition hover:border-indigo-300 hover:shadow-md"
          >
            <div>
              {/* Card Illustration */}
              <div className="mb-6 flex h-36 w-full items-center justify-center rounded-2xl bg-indigo-50/70 border border-indigo-100/60 p-4">
                <svg
                  width="120"
                  height="80"
                  viewBox="0 0 120 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="text-indigo-600"
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
              </div>

              {/* Card Content */}
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-extrabold text-indigo-700">
                استوديو المعلم
              </div>
              <h2 className="text-2xl font-black text-indigo-950 mb-2">
                الرياضيات
              </h2>
              <p className="text-sm font-semibold text-slate-600 leading-relaxed mb-6">
                أوراق عمل تفاعلية عالية الدقة ومفاتيح إجابة مطابقة وملاحظات
                المعلم لتغطية منهج الرياضيات من الروضة K حتى الصف ٥.
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
          </div>

          {/* Reading Comprehension Card */}
          <div
            data-domain-card="reading"
            className="flex flex-col justify-between rounded-3xl border border-emerald-100 bg-white p-6 sm:p-8 shadow-xs transition hover:border-emerald-300 hover:shadow-md"
          >
            <div>
              {/* Card Illustration */}
              <div className="mb-6 flex h-36 w-full items-center justify-center rounded-2xl bg-emerald-50/70 border border-emerald-100/60 p-4">
                <svg
                  width="120"
                  height="80"
                  viewBox="0 0 120 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="text-emerald-600"
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
          </div>
        </div>
      </main>

      {/* Slim Footer */}
      <footer className="w-full border-t border-slate-200 py-4 text-center text-xs font-semibold text-slate-500">
        أُسُس — منصة تعليمية للمرحلة التأسيسية
      </footer>
    </div>
  );
}
