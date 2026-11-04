import React from "react";
import { HomeDomainCards } from "@/components/home/HomeDomainCards";

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

        {/* Domain Cards Grid (Enhanced with Framer Motion & Interactive Hover Polish) */}
        <HomeDomainCards />
      </main>

      {/* Slim Footer */}
      <footer className="w-full border-t border-slate-200 py-4 text-center text-xs font-semibold text-slate-500">
        أُسُس — منصة تعليمية للمرحلة التأسيسية
      </footer>
    </div>
  );
}
