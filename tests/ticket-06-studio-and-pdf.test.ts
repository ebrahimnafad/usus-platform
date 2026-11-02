import { describe, expect, it } from "vitest";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";
import {
  applyStudioNavigationAction,
  filterUnitsForStudioSearch,
  renderTeacherStudio,
} from "@/components/studio/TeacherStudio";

describe("Ticket 06 — RTL Teacher Studio: Grades K–5, 12 Units Accordion, Search & Badges", () => {
  it("renders all 6 Grades (الروضة K through الصف ٥), expands all 12 Units per grade, shows Standard, تقديم مشترك, and إثرائي * badges, and enforces Eastern Arabic Numerals", () => {
    const catalog = getCurriculumCatalog();

    // Render studio with all 12 units expanded for Grade K
    const { html: studioHtmlK } = renderTeacherStudio({
      grade: "K",
      lesson: 5,
      seed: "STUDIO-K5",
      difficulty: "scaffolded",
      view: "worksheet",
      expandAllUnits: true,
    });

    // 1. All 6 Grade switcher labels are present (الروضة K through الصف ٥)
    expect(studioHtmlK).toContain("الروضة K");
    expect(studioHtmlK).toContain("الصف ١");
    expect(studioHtmlK).toContain("الصف ٢");
    expect(studioHtmlK).toContain("الصف ٣");
    expect(studioHtmlK).toContain("الصف ٤");
    expect(studioHtmlK).toContain("الصف ٥");

    // 2. All 12 Units of the selected Grade are rendered and expandable
    for (let unitNum = 1; unitNum <= 12; unitNum++) {
      expect(studioHtmlK).toContain(`data-unit-number="${unitNum}"`);
    }

    // 3. Badges in RTL sidebar: Standard codes, تقديم مشترك (Co-presented), and إثرائي * (Enrichment)
    expect(studioHtmlK).toContain("K.MD.3");
    expect(studioHtmlK).toContain("K.G.2");
    expect(studioHtmlK).toContain("تقديم مشترك");
    expect(studioHtmlK).toContain("إثرائي *");

    // 4. PDF download button (تحميل PDF) and zoom controls are visible with Eastern Arabic Numerals
    expect(studioHtmlK).toContain("تحميل PDF");
    expect(studioHtmlK).toContain("١٠٠٪");

    // 5. Strict Eastern Arabic Numerals invariant across the entire rendered studio HTML
    expect(findWesternNumeralsInRenderedHtml(studioHtmlK)).toEqual([]);

    // 6. Search/filter lessons by Arabic title or Standard code
    const gradeKUnits = catalog.grades.K.units;
    const byStandard = filterUnitsForStudioSearch(gradeKUnits, "K.CC.3");
    const matchedStandardLessons = byStandard.flatMap((u) => u.lessons);
    expect(matchedStandardLessons.length).toBeGreaterThan(0);
    expect(
      matchedStandardLessons.every((l) => l.standards.includes("K.CC.3"))
    ).toBe(true);

    const byArabicTitle = filterUnitsForStudioSearch(
      gradeKUnits,
      "مطابقة العملات"
    );
    const matchedTitleLessons = byArabicTitle.flatMap((u) => u.lessons);
    expect(matchedTitleLessons.map((l) => l.id)).toContain("K-4");
  });

  it("switches preview tabs (ورقة العمل, مفتاح الإجابة, ملاحظات المعلم), navigates via Prerequisite chips, changes Difficulty Level, and mints a new Seed updating URL query params and A4 preview deterministically", () => {
    // Start on Lesson K-18 (prerequisites: K-17 ○ K-3, K-2) in Teacher Notes view
    const initialRender = renderTeacherStudio({
      grade: "K",
      lesson: 18,
      seed: "SEED-INIT-1",
      difficulty: "scaffolded",
      view: "teacher-notes",
    });

    expect(initialRender.html).toContain('data-view-mode="teacher-notes"');
    expect(initialRender.html).toContain("ملاحظات المعلم");
    // Compound (،) and alternative (○ مسار بديل) prerequisite chips are rendered
    expect(initialRender.html).toContain("○ مسار بديل");
    expect(initialRender.html).toContain('data-prerequisite-code="K-١٧"');
    expect(initialRender.html).toContain('data-prerequisite-code="K-٣"');
    expect(initialRender.html).toContain('data-prerequisite-code="K-٢"');
    expect(findWesternNumeralsInRenderedHtml(initialRender.html)).toEqual([]);

    // Click Prerequisite chip K-2 inside Teacher Notes -> navigates directly to Lesson K-2
    const afterPrereqClick = applyStudioNavigationAction(initialRender.state, {
      type: "select-prerequisite",
      prerequisiteCode: "K-2",
    });
    expect(afterPrereqClick.grade).toBe("K");
    expect(afterPrereqClick.lessonNumber).toBe(2);

    const k2WorksheetRender = renderTeacherStudio({
      ...afterPrereqClick,
      lesson: afterPrereqClick.lessonNumber,
      difficulty: afterPrereqClick.difficultyLevel,
      view: "worksheet",
    });
    expect(k2WorksheetRender.html).toContain('data-view-mode="worksheet"');
    expect(k2WorksheetRender.html).toContain("الدرس ٢");
    expect(k2WorksheetRender.searchParamsString).toContain(
      "grade=K&lesson=2&seed=SEED-INIT-1&difficulty=scaffolded&view=worksheet"
    );

    // Switch live preview tab to مفتاح الإجابة (answer-key)
    const answerKeyState = applyStudioNavigationAction(k2WorksheetRender.state, {
      type: "select-view",
      viewMode: "answer-key",
    });
    const k2AnswerKeyRender = renderTeacherStudio({
      ...answerKeyState,
      lesson: answerKeyState.lessonNumber,
      difficulty: answerKeyState.difficultyLevel,
      view: answerKeyState.viewMode,
    });
    expect(k2AnswerKeyRender.html).toContain('data-view-mode="answer-key"');
    expect(k2AnswerKeyRender.html).toContain("مفتاح الإجابة النموذجي");
    expect(k2AnswerKeyRender.html).toContain("تلميح الاستراتيجية");
    expect(k2AnswerKeyRender.pdfExportUrl).toContain("view=answer-key");

    // Change Difficulty Level to Advanced (متقدم) -> clamps all 3 sections and updates URL query params
    const advancedState = applyStudioNavigationAction(k2WorksheetRender.state, {
      type: "select-difficulty",
      difficultyLevel: "Advanced",
    });
    const advancedRender = renderTeacherStudio({
      ...advancedState,
      lesson: advancedState.lessonNumber,
      difficulty: advancedState.difficultyLevel,
      view: advancedState.viewMode,
    });
    expect(advancedRender.searchParamsString).toContain("difficulty=Advanced");
    expect(
      advancedRender.bundle.worksheet.sections.map((s) => s.difficultyLevel)
    ).toEqual(["Advanced", "Advanced", "Advanced"]);

    // Click توليد نموذج جديد 🎲 -> mints a new deterministic Seed, updates URL query params and live A4 preview
    const regenState = applyStudioNavigationAction(advancedState, {
      type: "regenerate-seed",
      step: 1,
    });
    expect(regenState.seed).not.toBe(advancedState.seed);
    const regenRender1 = renderTeacherStudio({
      ...regenState,
      lesson: regenState.lessonNumber,
      difficulty: regenState.difficultyLevel,
      view: regenState.viewMode,
    });
    const regenRender2 = renderTeacherStudio({
      ...regenState,
      lesson: regenState.lessonNumber,
      difficulty: regenState.difficultyLevel,
      view: regenState.viewMode,
    });
    expect(regenRender1.searchParamsString).toContain(`seed=${regenState.seed}`);
    expect(regenRender1.bundle.worksheet).toEqual(regenRender2.bundle.worksheet);
    expect(regenRender1.bundle.worksheet.sections).not.toEqual(
      advancedRender.bundle.worksheet.sections
    );
    expect(findWesternNumeralsInRenderedHtml(regenRender1.html)).toEqual([]);
  });
});

describe("Ticket 06 — Secondary Seam: Headless Browser A4 PDF Exporter & /api/pdf Route", () => {
  it(
    "renders Worksheet and Answer Key via Playwright headless Chromium with @page { size: A4 portrait; margin: 0; } and print-color-adjust: exact into valid %PDF- buffers within the 1–2 page budget",
    async () => {
      const { buildPrintCleanA4Html, exportWorksheetPdf } = await import(
        "@/pdf/pdf-exporter"
      );
      const { GET } = await import("@/app/api/pdf/route");

      // 1. Verify print-clean A4 HTML rules and Eastern Arabic Numerals invariant
      const printDoc = buildPrintCleanA4Html({
        grade: "K",
        lessonNumber: 1,
        seed: "PDF-2026",
        difficultyLevel: "scaffolded",
        viewMode: "worksheet",
      });
      expect(printDoc.html).toContain("@page");
      expect(printDoc.html).toContain("size: A4 portrait");
      expect(printDoc.html).toContain("margin: 0");
      expect(printDoc.html).toContain("print-color-adjust: exact");
      expect(printDoc.html).toContain("break-inside: avoid");
      expect(findWesternNumeralsInRenderedHtml(printDoc.html)).toEqual([]);

      // 2. Headless browser PDF export for Worksheet
      const worksheetPdf = await exportWorksheetPdf({
        grade: "K",
        lessonNumber: 1,
        seed: "PDF-2026",
        difficultyLevel: "scaffolded",
        viewMode: "worksheet",
      });
      expect(worksheetPdf.pdfBuffer.subarray(0, 5).toString("ascii")).toBe(
        "%PDF-"
      );
      expect(worksheetPdf.pdfBuffer.byteLength).toBeGreaterThan(5000);
      expect(worksheetPdf.pageCount).toBeGreaterThanOrEqual(1);
      expect(worksheetPdf.pageCount).toBeLessThanOrEqual(2);
      expect(worksheetPdf.filename).toBe(
        "worksheet-K-1-PDF-2026-worksheet.pdf"
      );

      // 3. Headless browser PDF export for Answer Key via GET /api/pdf route handler
      const request = new Request(
        "http://localhost:3000/api/pdf?grade=K&lesson=1&seed=PDF-2026&difficulty=scaffolded&view=answer-key"
      );
      const response = await GET(request);
      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/pdf");
      expect(response.headers.get("Content-Disposition")).toContain(
        "worksheet-K-1-PDF-2026-answer-key.pdf"
      );

      const arrayBuffer = await response.arrayBuffer();
      const routePdfBuffer = Buffer.from(arrayBuffer);
      expect(routePdfBuffer.subarray(0, 5).toString("ascii")).toBe("%PDF-");
      expect(routePdfBuffer.byteLength).toBeGreaterThan(5000);
      const pageCountHeader = Number(response.headers.get("X-PDF-Page-Count"));
      expect(pageCountHeader).toBeGreaterThanOrEqual(1);
      expect(pageCountHeader).toBeLessThanOrEqual(2);
    },
    60000
  );
});
