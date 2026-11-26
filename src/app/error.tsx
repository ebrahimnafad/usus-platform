"use client";

import React from "react";
import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-16 text-center">
      <div className="max-w-md rounded-3xl border border-rose-200 bg-white p-8 shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-2xl font-black text-rose-600">
          !
        </div>
        <h1 className="mb-2 text-2xl font-extrabold text-slate-900">
          حدث خطأ غير متوقع
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-slate-600">
          نعتذر عن هذا الخلل المؤقت. يمكنك إعادة المحاولة أو العودة إلى الصفحة
          الرئيسية.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            إعادة المحاولة
          </button>
          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}
