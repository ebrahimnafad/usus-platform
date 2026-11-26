import React from "react";
import type { Metadata, Viewport } from "next";
import printFonts from "@/config/print-fonts.json";
import "./globals.css";

export const metadata: Metadata = {
  title: "منصة أوراق العمل الرياضية | الصفوف K–٥",
  description:
    "منصة عربية لتوليد أوراق عمل رياضية ملونة ومفاتيح إجابة وملاحظات المعلم للصفوف من الروضة حتى الصف الخامس",
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
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={printFonts.stylesheetHref} rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
