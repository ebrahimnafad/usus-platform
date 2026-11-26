import { describe, expect, it, vi, afterEach } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { buildQuickViewUrl, generateQrSvgPath } from "@/lib/qr";
import { GET as printHtmlGet } from "@/app/api/print-html/route";
import { sanitizePrintFilenameTitle } from "@/lib/print-html-iframe";
import { sharePrintContent } from "@/lib/share-print";
import { PrintModal } from "@/components/studio/PrintModal";
import { generateWorksheet } from "@/engine/worksheet-engine";
import "@/registry/bootstrap";
import { NextRequest } from "next/server";

describe("QR codes, Quick View URLs, and Print HTML API", () => {
  it("generates synchronous SVG paths and exact quick-view URLs", () => {
    const akUrl = buildQuickViewUrl({
      origin: "https://usus.example",
      grade: "K",
      lessonNumber: 2,
      seed: "RKMJN8",
      difficultyLevel: "Advanced",
      view: "answer-key",
    });
    expect(akUrl).toBe(
      "https://usus.example/q/K?lesson=2&seed=RKMJN8&difficulty=Advanced&view=answer-key"
    );

    const tnUrl = buildQuickViewUrl({
      origin: "https://usus.example",
      grade: "K",
      lessonNumber: 2,
      seed: "RKMJN8",
      difficultyLevel: "Advanced",
      view: "teacher-notes",
    });
    expect(tnUrl).toBe(
      "https://usus.example/q/K?lesson=2&seed=RKMJN8&difficulty=Advanced&view=teacher-notes"
    );

    const svgData = generateQrSvgPath(akUrl);
    expect(svgData.size).toBeGreaterThan(20);
    expect(svgData.path.startsWith("M")).toBe(true);
  });

  it("renders two compact QR codes in the Worksheet header and omits them on the Answer Key", () => {
    const worksheetHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 2,
      seed: "RKMJN8",
      difficultyLevel: "Advanced",
      viewMode: "worksheet",
    });
    expect(worksheetHtml).toContain('data-qr-link="qr-answer-key"');
    expect(worksheetHtml).toContain('data-qr-link="qr-teacher-notes"');
    expect(worksheetHtml).toContain("الإجابة");
    expect(worksheetHtml).toContain("للمعلم");

    const answerKeyHtml = renderWorksheetSurface({
      grade: "K",
      lessonNumber: 2,
      seed: "RKMJN8",
      difficultyLevel: "Advanced",
      viewMode: "answer-key",
    });
    expect(answerKeyHtml).not.toContain('data-qr-link="qr-answer-key"');
    expect(answerKeyHtml).not.toContain('data-qr-link="qr-teacher-notes"');
  });

  it("renders single lesson and entire unit HTML quickly via /api/print-html", async () => {
    const lessonReq = new NextRequest(
      "http://localhost:3000/api/print-html?grade=K&lesson=2&seed=RKMJN8&difficulty=scaffolded&scope=lesson&viewOption=both"
    );
    const lessonRes = await printHtmlGet(lessonReq);
    expect(lessonRes.status).toBe(200);
    const lessonData = (await lessonRes.json()) as {
      html: string;
      lessonCount: number;
      title: string;
    };
    expect(lessonData.lessonCount).toBe(1);
    expect(lessonData.html).toContain('data-worksheet-surface="true"');
    expect(lessonData.html).toContain("مفتاح الإجابة النموذجي");

    const unitReq = new NextRequest(
      "http://localhost:3000/api/print-html?grade=K&lesson=2&seed=RKMJN8&difficulty=scaffolded&scope=unit&viewOption=worksheet"
    );
    const unitRes = await printHtmlGet(unitReq);
    expect(unitRes.status).toBe(200);
    const unitData = (await unitRes.json()) as {
      html: string;
      lessonCount: number;
      title: string;
    };
    expect(unitData.lessonCount).toBeGreaterThan(1);
    expect(unitData.html).toContain('class="print-unit-sheet"');
    expect(lessonData.title).toContain("أُسُس -");
    expect(lessonData.title).toContain("ورقة العمل والإجابة");
    expect(unitData.title).toContain("أُسُس -");
    expect(unitData.title).toContain("الوحدة");
    expect(lessonData.title).not.toMatch(/[\\/:*?"<>|]/);
    expect(unitData.title).not.toMatch(/[\\/:*?"<>|]/);
  });

  it("sanitizes OS-forbidden filename characters in print PDF titles", () => {
    expect(sanitizePrintFilenameTitle("أُسُس: المستوى / الأول | قصة*١?")).toBe(
      "أُسُس - المستوى - الأول - قصة - ١"
    );
  });

  describe("Print Share Button & Web Share helper", () => {
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("renders a mobile-friendly Share button inside Math PrintModal", () => {
      const bundle = generateWorksheet({
        grade: "K",
        lessonNumber: 2,
        seed: "RKMJN8",
        difficultyLevel: "Advanced",
      });
      const html = renderToStaticMarkup(
        React.createElement(PrintModal, {
          isOpen: true,
          onClose: () => {},
          bundle,
          activeViewMode: "worksheet",
          accentHex: "#059669",
        })
      );

      expect(html).toContain('data-print-share="true"');
      expect(html).toContain("مشاركة");
      expect(html).toContain("min-h-[44px]");
    });

    it("uses navigator.share when available and falls back to clipboard on desktop", async () => {
      const shareSpy = vi.fn().mockResolvedValue(undefined);
      vi.stubGlobal("navigator", { share: shareSpy });

      const shared = await sharePrintContent({
        title: "عنوان",
        text: "نص",
        url: "https://example.test/print",
      });
      expect(shared).toBe("shared");
      expect(shareSpy).toHaveBeenCalledWith({
        title: "عنوان",
        text: "نص",
        url: "https://example.test/print",
      });

      const writeTextSpy = vi.fn().mockResolvedValue(undefined);
      vi.stubGlobal("navigator", { clipboard: { writeText: writeTextSpy } });

      const copied = await sharePrintContent({
        title: "عنوان",
        text: "نص",
        url: "https://example.test/print",
      });
      expect(copied).toBe("copied");
      expect(writeTextSpy).toHaveBeenCalledWith("https://example.test/print");
    });
  });
});
