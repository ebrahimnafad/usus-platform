import React from "react";
import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { resolveQrOrigin } from "@/lib/qr";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const siteOrigin = resolveQrOrigin();

export const metadata: Metadata = {
  ...(siteOrigin ? { metadataBase: new URL(siteOrigin) } : {}),
  title: {
    default: "منصة أُسُس التعليمية | أوراق عمل الرياضيات والفهم القرائي",
    template: "%s | منصة أُسُس",
  },
  description:
    "منصة عربية متكاملة لتوليد أوراق عمل الرياضيات الملونة للصفوف من الروضة حتى الصف الخامس وتدريبات الفهم القرائي مع مفاتيح الإجابة وملاحظات المعلم.",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "منصة أُسُس التعليمية",
    title: "منصة أُسُس التعليمية | أوراق عمل الرياضيات والفهم القرائي",
    description:
      "منصة عربية لتوليد أوراق عمل رياضية ملونة ومفاتيح إجابة وملاحظات المعلم للصفوف من الروضة حتى الصف الخامس، وتدريبات الفهم القرائي.",
  },
  twitter: {
    card: "summary_large_image",
    title: "منصة أُسُس التعليمية",
    description:
      "أوراق عمل رياضيات قابلة للطباعة وتدريبات فهم قرائي باللغة العربية.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
