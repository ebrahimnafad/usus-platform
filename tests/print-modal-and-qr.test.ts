import { describe, expect, it } from "vitest";
import { renderWorksheetSurface } from "@/lib/render-worksheet-surface";
import { buildQuickViewUrl, generateQrSvgPath } from "@/lib/qr";
import { GET as printHtmlGet } from "@/app/api/print-html/route";
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
  });
});
