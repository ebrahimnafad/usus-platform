"use client";

import React, { useState, useEffect } from "react";
import type { TeacherGuide } from "@/domain/reading-types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  storyId: string;
  storyTitle: string;
  teacherGuide: TeacherGuide;
  isTransferTest?: boolean;
}

const BLIND_SPOTS = [
  {
    title: "الفصحى والعامية",
    desc: "اقبل إجابة الطفل بالعامية لتثبيت الفهم، ثم نمذجها بلطف: «أحسنت! معناها كذا، وبالفصحى نصوغها هكذا...».",
  },
  {
    title: "الوقف ليس خطأ",
    desc: "لا تحسب توقف الطفل عند علامات الترقيم أو نهاية الجملة عثرة؛ فالوقف دلالة تدبر واستيعاب.",
  },
  {
    title: "الحفظ ليس إتقاناً",
    desc: "طلاقة القراءة لنص متكرر قد تكون حفظاً لا تمكناً؛ القياس الحقيقي يظهر عند نقل المهارة لنص جديد.",
  },
  {
    title: "تجنب التصحيح المفرط",
    desc: "ركّز على خطأ نوعي واحد في الجلسة، واحتفِ بما قرأه الطفل صحيحاً لحماية شغفه.",
  },
  {
    title: "روتين ثابت",
    desc: "ثبات ترتيب المحطات يزيل القلق من نفس الطفل ويجعله مستعداً ذهنياً لما سيأتي.",
  },
  {
    title: "ليست كل جلسة امتحاناً",
    desc: "استمتع بالقصة؛ الغاية الكبرى هي غرس حب القراءة، وليست كل قراءة تتبعها تدريبات.",
  },
] as const;

const ASSISTANCE_LEVELS = [
  "مستقل تماماً",
  "تلميح عام",
  "توجيه للجملة",
  "نمذجة المعلم الكاملة",
] as const;

const COMPREHENSION_TIERS = [
  "فهم عميق ومباشر",
  "فهم جزئي بمساعدة",
  "ضعف في الفهم",
] as const;

const NEXT_STEPS = [
  "تثبيت بنص مماثل",
  "ترقية بُعد واحد",
  "تخفيف الكتابة",
  "العودة للأمان",
] as const;

interface TrackingRecord {
  assistanceLevel?: string;
  comprehensionTier?: string;
  nextStep?: string;
  notes?: string;
}

export default function TeacherShieldDrawer({
  isOpen,
  onClose,
  storyId,
  storyTitle,
  teacherGuide,
  isTransferTest,
}: Props) {
  const [tracking, setTracking] = useState<TrackingRecord>({});
  const [savedNotification, setSavedNotification] = useState(false);

  // Load tracking record from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(`usus_tracking_${storyId}`);
      if (stored) {
        setTracking(JSON.parse(stored));
      }
    } catch {
      // localStorage may fail in test runners or private mode
    }
  }, [storyId]);

  const saveTrackingField = (key: keyof TrackingRecord, value: string) => {
    const updated = { ...tracking, [key]: value };
    setTracking(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          `usus_tracking_${storyId}`,
          JSON.stringify(updated)
        );
        setSavedNotification(true);
        setTimeout(() => setSavedNotification(false), 2000);
      } catch {
        // ignore
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden no-print" dir="rtl">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <aside className="w-screen max-w-md bg-white border-r border-slate-200 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-black shadow-xs">
                👩‍🏫
              </span>
              <div>
                <h2 className="text-base font-black text-slate-900">
                  درع المعلم — التحصين التربوي
                </h2>
                <p className="text-[11px] font-bold text-slate-500">
                  إرشادات الجلسة وسجل المتابعة الميداني
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm transition"
              title="إغلاق الدرع"
            >
              ✕
            </button>
          </div>

          {/* Drawer Body Scroll */}
          <div className="p-5 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs">
            {isTransferTest && (
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-1">
                <span className="font-extrabold text-indigo-900 block">
                  🎯 إرشاد اختبار النقل:
                </span>
                <p className="text-indigo-950 font-medium leading-relaxed">
                  هذه الدورة مخصصة لقياس استقلالية المتعلم في قراءة نص جديد؛
                  تجنب تلوين الكلمات أو الإشارة لموضع الدليل، وسجّل استجابته
                  المستقلة بدقة.
                </p>
              </div>
            )}

            {/* Section 1: Modeling Script */}
            {teacherGuide.modelingScript && (
              <div className="space-y-2">
                <span className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                  <span>🗣️</span>
                  <span>نموذج التفكير بصوت مسموع (Think-Aloud):</span>
                </span>
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl leading-relaxed text-emerald-950 font-medium">
                  «{teacherGuide.modelingScript}»
                </div>
              </div>
            )}

            {/* Section 2: Session Tips */}
            {teacherGuide.blindSpotTips.length > 0 && (
              <div className="space-y-2">
                <span className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                  <span>📌</span>
                  <span>توجيهات مخصصة لقصة «{storyTitle}»:</span>
                </span>
                <ul className="space-y-1.5">
                  {teacherGuide.blindSpotTips.map((tip, i) => (
                    <li
                      key={i}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 leading-relaxed font-medium"
                    >
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 3: The 6 Canonical Blind Spots */}
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <span className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                <span>🛡️</span>
                <span>الحماية ضد النقاط التربوية العمياء:</span>
              </span>
              <div className="space-y-2">
                {BLIND_SPOTS.map((b) => (
                  <details
                    key={b.title}
                    className="group bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs"
                  >
                    <summary className="font-extrabold text-slate-800 cursor-pointer list-none flex items-center justify-between">
                      <span>• {b.title}</span>
                      <span className="text-slate-400 group-open:rotate-180 transition-transform">
                        ▾
                      </span>
                    </summary>
                    <p className="mt-2 text-slate-600 leading-relaxed border-t border-slate-200/60 pt-2 font-medium">
                      {b.desc}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* Section 4: One-Click Tracking Matrix */}
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                  <span>📊</span>
                  <span>سجل الرصد الميداني (حفظ فوري):</span>
                </span>
                {savedNotification && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full animate-pulse">
                    تم الحفظ ✓
                  </span>
                )}
              </div>

              {/* 1. Assistance Level */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 block">
                  درجة المساعدة المقدمة:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {ASSISTANCE_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() =>
                        saveTrackingField("assistanceLevel", level)
                      }
                      className={`p-2 rounded-lg text-right font-bold transition border text-[11px] ${
                        tracking.assistanceLevel === level
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Comprehension Tier */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 block">
                  مستوى الفهم القرائي:
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {COMPREHENSION_TIERS.map((tier) => (
                    <button
                      key={tier}
                      onClick={() =>
                        saveTrackingField("comprehensionTier", tier)
                      }
                      className={`p-2 rounded-lg text-right font-bold transition border text-[11px] ${
                        tracking.comprehensionTier === tier
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Next Step Decision */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 block">
                  قرار الخطوة التالية:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {NEXT_STEPS.map((step) => (
                    <button
                      key={step}
                      onClick={() => saveTrackingField("nextStep", step)}
                      className={`p-2 rounded-lg text-right font-bold transition border text-[11px] ${
                        tracking.nextStep === step
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {step}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-bold">
            <span className="text-slate-400">محفوظ محلياً على هذا الجهاز</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              إغلاق
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
