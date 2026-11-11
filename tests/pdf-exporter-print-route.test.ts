import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  goto: vi.fn(),
  setContent: vi.fn(),
  waitForSelector: vi.fn(),
  waitForFunction: vi.fn(),
  evaluate: vi.fn(),
  pdf: vi.fn(),
  close: vi.fn(),
  buildPrintCleanA4Html: vi.fn(),
}));

vi.mock("@/pdf/print-document", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/pdf/print-document")>();

  return {
    ...actual,
    buildPrintCleanA4Html: mocks.buildPrintCleanA4Html,
  };
});

vi.mock("playwright", () => ({
  chromium: {
    launch: async () => ({
      newPage: async () => ({
        emulateMedia: vi.fn(),
        goto: mocks.goto,
        setContent: mocks.setContent,
        waitForSelector: mocks.waitForSelector,
        waitForFunction: mocks.waitForFunction,
        evaluate: mocks.evaluate,
        pdf: mocks.pdf,
      }),
      close: mocks.close,
    }),
  },
}));

describe("exportWorksheetPdf printable route", () => {
  beforeEach(() => {
    vi.resetModules();
    mocks.goto.mockReset();
    mocks.setContent.mockReset();
    mocks.waitForSelector.mockReset();
    mocks.waitForFunction.mockReset();
    mocks.evaluate.mockReset();
    mocks.pdf.mockReset();
    mocks.close.mockReset();
    mocks.buildPrintCleanA4Html.mockReset();
    mocks.buildPrintCleanA4Html.mockResolvedValue({
      html: "<!doctype html><html></html>",
    });
    mocks.goto.mockResolvedValue({
      ok: () => true,
      status: () => 200,
    });
    mocks.pdf.mockResolvedValue(
      Buffer.from("%PDF-1.4\n1 0 obj << /Type /Page >> endobj", "latin1")
    );
  });

  it("uses the printable route and waits for its worksheet surface", async () => {
    const { exportWorksheetPdf } = await import("@/pdf/pdf-exporter");

    const result = await exportWorksheetPdf({
      grade: "K",
      lessonNumber: 57,
      seed: "K1-2026",
      difficultyLevel: "scaffolded",
      viewMode: "answer-key",
      baseUrl: "http://localhost:3000",
    });

    expect(mocks.goto).toHaveBeenCalledWith(
      "http://localhost:3000/print?grade=K&lesson=57&seed=K1-2026&difficulty=scaffolded&view=answer-key",
      { waitUntil: "domcontentloaded" }
    );
    expect(mocks.waitForSelector).toHaveBeenCalledWith(
      '.a4-sheet[data-worksheet-surface="true"]',
      { state: "attached" }
    );
    expect(mocks.waitForFunction).toHaveBeenCalled();
    expect(mocks.setContent).not.toHaveBeenCalled();
    expect(mocks.buildPrintCleanA4Html).not.toHaveBeenCalled();
    expect(result.filename).toBe("worksheet-K-57-K1-2026-answer-key.pdf");
  });

  it("uses the static document when no printable route is available", async () => {
    const { exportWorksheetPdf } = await import("@/pdf/pdf-exporter");

    await exportWorksheetPdf({
      grade: "K",
      lessonNumber: 57,
      seed: "K1-2026",
      difficultyLevel: "scaffolded",
      viewMode: "answer-key",
    });

    expect(mocks.goto).not.toHaveBeenCalled();
    expect(mocks.buildPrintCleanA4Html).toHaveBeenCalledOnce();
    expect(mocks.setContent).toHaveBeenCalledWith(
      "<!doctype html><html></html>",
      { waitUntil: "domcontentloaded" }
    );
  });

  it("surfaces printable-route failures instead of silently switching layouts", async () => {
    mocks.goto.mockRejectedValue(new Error("print route unavailable"));
    const { exportWorksheetPdf } = await import("@/pdf/pdf-exporter");

    await expect(
      exportWorksheetPdf({
        grade: "K",
        lessonNumber: 57,
        seed: "K1-2026",
        difficultyLevel: "scaffolded",
        viewMode: "answer-key",
        baseUrl: "http://localhost:3000",
      })
    ).rejects.toThrow("print route unavailable");

    expect(mocks.buildPrintCleanA4Html).not.toHaveBeenCalled();
    expect(mocks.setContent).not.toHaveBeenCalled();
    expect(mocks.close).toHaveBeenCalledOnce();
  });
});
