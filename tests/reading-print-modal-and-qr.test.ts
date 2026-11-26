import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NextRequest } from "next/server";
import PrintableReadingSheet from "@/components/reading/PrintableReadingSheet";
import { ReadingQuickViewClient } from "@/components/reading/ReadingQuickViewClient";
import { getReadingLevel, getReadingStory } from "@/curriculum/reading-catalog";
import { buildReadingQuickViewUrl } from "@/lib/qr";
import { GET as readingPrintHtmlGet } from "@/app/api/reading-print-html/route";
import { ReadingPrintModal } from "@/components/reading/ReadingPrintModal";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import { PRINT_FONT_OPTIONS } from "@/lib/print-html-iframe";

describe("Reading Print Modal, /api/reading-print-html, and Header QR Codes", () => {
  const level1 = getReadingLevel("level-1")!;
  const standardStory = getReadingStory("level-1", 1)!;
  const freeReadingStory = getReadingStory("level-1", 4)!;

  it("renders opposite-edge header QR codes on standard student sheet and omits them on answer-key", () => {
    const studentHtml = renderToStaticMarkup(
      React.createElement(PrintableReadingSheet, {
        level: level1,
        story: standardStory,
        viewMode: "student",
        qrOrigin: "https://example.test",
      })
    );

    expect(studentHtml).toContain('data-qr-link="qr-teacher-notes"');
    expect(studentHtml).toContain('data-qr-link="qr-answer-key"');
    expect(studentHtml).toContain("للمعلم");
    expect(studentHtml).toContain("الإجابة");
    expect(studentHtml).toContain(
      "https://example.test/reading/q/level-1?story=1&amp;tashkeel=full&amp;view=teacher-notes"
    );
    expect(studentHtml).toContain(
      "https://example.test/reading/q/level-1?story=1&amp;tashkeel=full&amp;view=answer-key"
    );
    expect(findWesternNumeralsInRenderedHtml(studentHtml)).toEqual([]);

    const answerKeyHtml = renderToStaticMarkup(
      React.createElement(PrintableReadingSheet, {
        level: level1,
        story: standardStory,
        viewMode: "answer-key",
        qrOrigin: "https://example.test",
      })
    );

    expect(answerKeyHtml).not.toContain('data-qr-link="qr-teacher-notes"');
    expect(answerKeyHtml).not.toContain('data-qr-link="qr-answer-key"');
    expect(answerKeyHtml).toContain("نموذج الإجابة");
    expect(answerKeyHtml).toContain(standardStory.qarQuestions[0].sampleAnswer);
    expect(findWesternNumeralsInRenderedHtml(answerKeyHtml)).toEqual([]);
  });

  it("renders only teacher-notes QR on free_reading student sheet", () => {
    const freeHtml = renderToStaticMarkup(
      React.createElement(PrintableReadingSheet, {
        level: level1,
        story: freeReadingStory,
        viewMode: "student",
        qrOrigin: "https://example.test",
      })
    );

    expect(freeHtml).toContain('data-qr-link="qr-teacher-notes"');
    expect(freeHtml).not.toContain('data-qr-link="qr-answer-key"');
    expect(findWesternNumeralsInRenderedHtml(freeHtml)).toEqual([]);
  });

  it("builds reading quick-view URLs and renders ReadingQuickViewClient for both tabs", () => {
    const url = buildReadingQuickViewUrl({
      origin: "https://example.test",
      levelId: "level-1",
      storyNumber: 1,
      tashkeelMode: "partial",
      view: "answer-key",
    });
    expect(url).toBe(
      "https://example.test/reading/q/level-1?story=1&tashkeel=partial&view=answer-key"
    );

    const answerHtml = renderToStaticMarkup(
      React.createElement(ReadingQuickViewClient, {
        level: level1,
        story: standardStory,
        initialView: "answer-key",
        tashkeelMode: "full",
      })
    );
    expect(answerHtml).toContain("نموذج إجابات الفهم القرائي");
    expect(answerHtml).toContain(standardStory.qarQuestions[0].sampleAnswer);

    const notesHtml = renderToStaticMarkup(
      React.createElement(ReadingQuickViewClient, {
        level: level1,
        story: standardStory,
        initialView: "teacher-notes",
        tashkeelMode: "full",
      })
    );
    expect(notesHtml).toContain(standardStory.teacherGuide.modelingScript);
  });

  it("returns fast print HTML for single story and entire level from /api/reading-print-html", async () => {
    const reqSingle = new NextRequest(
      "http://localhost:3000/api/reading-print-html?level=level-1&story=1&scope=story&viewOption=both&tashkeel=full"
    );
    const resSingle = await readingPrintHtmlGet(reqSingle);
    expect(resSingle.status).toBe(200);
    const dataSingle = (await resSingle.json()) as {
      html: string;
      storyCount: number;
      title: string;
    };
    expect(dataSingle.storyCount).toBe(1);
    expect(dataSingle.html).toContain('data-reading-view="student"');
    expect(dataSingle.html).toContain('data-reading-view="answer-key"');
    expect(dataSingle.title).toBe(
      "أُسُس - المستوى الأول - القصة ١ - عُصْفُورُ سَامِي - أوراق العمل والإجابات"
    );
    expect(dataSingle.title).not.toMatch(/[\\/:*?"<>|]/);

    const reqLevel = new NextRequest(
      "http://localhost:3000/api/reading-print-html?level=level-1&story=1&scope=level&viewOption=both&tashkeel=partial"
    );
    const resLevel = await readingPrintHtmlGet(reqLevel);
    expect(resLevel.status).toBe(200);
    const dataLevel = (await resLevel.json()) as {
      html: string;
      storyCount: number;
      title: string;
    };
    expect(dataLevel.storyCount).toBe(level1.stories.length);
    expect(dataLevel.title).toBe(
      "أُسُس - المستوى الأول - كافة القصص - أوراق العمل والإجابات"
    );
    expect(dataLevel.title).not.toMatch(/[\\/:*?"<>|]/);
  });

  it("renders all 4 convenient Arabic print fonts inside ReadingPrintModal", () => {
    const html = renderToStaticMarkup(
      React.createElement(ReadingPrintModal, {
        isOpen: true,
        onClose: () => {},
        level: level1,
        story: standardStory,
        tashkeelMode: "full",
        includeStoryText: true,
      })
    );

    expect(PRINT_FONT_OPTIONS).toHaveLength(4);
    for (const opt of PRINT_FONT_OPTIONS) {
      expect(html).toContain(`data-print-font="${opt.id}"`);
      expect(html).toContain(opt.labelAr);
    }
  });

  it("keeps self-assessment strip and footer inside a break-inside-avoid wrapper to prevent orphan footer pages", () => {
    const level2 = getReadingLevel("level-2")!;
    const story12 = getReadingStory("level-2", 12)!;
    const html = renderToStaticMarkup(
      React.createElement(PrintableReadingSheet, {
        level: level2,
        story: story12,
        viewMode: "student",
        alwaysVisible: true,
      })
    );

    expect(html).toMatch(
      /<div[^>]*class="[^"]*\bbreak-inside-avoid\b[^"]*"[^>]*>[\s\S]*?كيف أحسست بأدائي؟[\s\S]*?<footer[\s\S]*?منصة أُسُس التعليمية[\s\S]*?<\/footer>[\s\S]*?<\/div>/
    );
  });

  it("renders a mobile-friendly Share button inside ReadingPrintModal", () => {
    const html = renderToStaticMarkup(
      React.createElement(ReadingPrintModal, {
        isOpen: true,
        onClose: () => {},
        level: level1,
        story: standardStory,
        tashkeelMode: "full",
        includeStoryText: true,
      })
    );

    expect(html).toContain('data-reading-print-share="true"');
    expect(html).toContain("مشاركة");
    expect(html).toContain("min-h-[44px]");
  });
});
