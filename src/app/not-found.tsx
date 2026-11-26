import React from "react";
import Link from "next/link";

export default function NotFound(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-16 text-center">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl font-black text-indigo-700">
          ٤٠٤
        </div>
        <h1 className="mb-2 text-2xl font-extrabold text-slate-900">
          الصفحة غير موجودة
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-slate-600">
          تعذّر العثور على الصفحة التي تبحث عنها. يمكنك العودة إلى الصفحة
          الرئيسية أو الانتقال مباشرة إلى استوديو الرياضيات أو الفهم القرائي.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            الصفحة الرئيسية
          </Link>
          <Link
            href="/math"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            الرياضيات
          </Link>
          <Link
            href="/reading"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            الفهم القرائي
          </Link>
        </div>
      </div>
    </main>
  );
}
