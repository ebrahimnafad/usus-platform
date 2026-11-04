import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";

/**
 * Unit tests for `printPdfViaIframe` covering the lifecycle paths that
 * seam/source-read tests cannot exercise:
 *   - timeout path (onload never fires → reject + title restore)
 *   - onerror path (→ reject + title restore)
 *   - fetch failure (→ reject + title restore)
 *   - happy path (blob created, iframe appended/removed, title restored)
 *
 * Browser globals (document, window, URL, fetch) are stubbed so the tests
 * run in Node/vitest without a real DOM.
 *
 * Key technique: `printPdfViaIframe` is async and awaits `fetch()` then
 * `res.blob()` before it appends the iframe. We must flush those microtasks
 * via repeated `await Promise.resolve()` before inspecting DOM state.
 */

/** Flush the microtask queue `count` times. */
const flush = async (count = 6) => {
  for (let i = 0; i < count; i++) await Promise.resolve();
};

type TimeoutEntry = { id: number; fn: () => void; delay: number };

type MockIframe = {
  style: { cssText: string };
  src: string;
  onload: (() => void) | null;
  onerror: (() => void) | null;
  contentWindow: {
    focus: ReturnType<typeof vi.fn>;
    print: ReturnType<typeof vi.fn>;
  };
};

function makeMockIframe(): MockIframe {
  return {
    style: { cssText: "" },
    src: "",
    onload: null,
    onerror: null,
    contentWindow: { focus: vi.fn(), print: vi.fn() },
  };
}

describe("printPdfViaIframe — lifecycle unit tests", () => {
  let docTitle: string;
  let mockIframe: MockIframe;
  let appendedChildren: unknown[];
  let removedChildren: unknown[];
  let createdObjectUrls: string[];
  let timeouts: TimeoutEntry[];
  let nextTimeoutId: number;

  beforeEach(() => {
    vi.resetModules();

    docTitle = "Original Title";
    mockIframe = makeMockIframe();
    appendedChildren = [];
    removedChildren = [];
    createdObjectUrls = [];
    timeouts = [];
    nextTimeoutId = 1;

    vi.stubGlobal("document", {
      get title() {
        return docTitle;
      },
      set title(v: string) {
        docTitle = v;
      },
      body: {
        appendChild: (el: unknown) => {
          appendedChildren.push(el);
        },
        contains: () => true,
        removeChild: (el: unknown) => {
          removedChildren.push(el);
        },
      },
      createElement: () => mockIframe,
    });

    vi.stubGlobal("URL", {
      createObjectURL: (_blob: Blob) => {
        const url = `blob:mock-${createdObjectUrls.length}`;
        createdObjectUrls.push(url);
        return url;
      },
      revokeObjectURL: vi.fn(),
    });

    vi.stubGlobal("window", {
      setTimeout: (fn: () => void, delay: number) => {
        const id = nextTimeoutId++;
        timeouts.push({ id, fn, delay });
        return id;
      },
      clearTimeout: (id: number) => {
        const idx = timeouts.findIndex((t) => t.id === id);
        if (idx !== -1) timeouts.splice(idx, 1);
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // ─── 1. onerror path ───────────────────────────────────────────────────────
  it("rejects and restores title when iframe fires onerror", async () => {
    vi.stubGlobal("fetch", async () => ({
      ok: true,
      blob: async () => new Blob(["fake-pdf"]),
    }));

    const { printPdfViaIframe } = await import("@/lib/print-pdf-iframe");
    const printPromise = printPdfViaIframe("http://test/pdf", "Print Title");

    // Flush: await fetch, await res.blob(), Promise<void> constructor runs
    await flush(6);

    expect(appendedChildren).toHaveLength(1);
    expect(mockIframe.onerror).not.toBeNull();

    // Fire onerror
    mockIframe.onerror!();

    await expect(printPromise).rejects.toThrow("PDF iframe failed to load");
    expect(docTitle).toBe("Original Title");
  });

  // ─── 2. Load-timeout path ──────────────────────────────────────────────────
  it("rejects and restores title when onload never fires (15 s timeout)", async () => {
    vi.stubGlobal("fetch", async () => ({
      ok: true,
      blob: async () => new Blob(["fake-pdf"]),
    }));

    const { printPdfViaIframe } = await import("@/lib/print-pdf-iframe");
    const printPromise = printPdfViaIframe("http://test/pdf", "Print Title");

    await flush(6);

    expect(appendedChildren).toHaveLength(1);

    // Find and fire the 15 000 ms load-timeout guard
    const guardEntry = timeouts.find((t) => t.delay === 15_000);
    expect(guardEntry).toBeDefined();
    guardEntry!.fn();

    await expect(printPromise).rejects.toThrow("PDF iframe load timed out");
    expect(docTitle).toBe("Original Title");
  });

  // ─── 3. Fetch failure ──────────────────────────────────────────────────────
  it("rejects and restores title when fetch returns non-ok status", async () => {
    vi.stubGlobal("fetch", async () => ({ ok: false, status: 503 }));

    const { printPdfViaIframe } = await import("@/lib/print-pdf-iframe");

    await expect(
      printPdfViaIframe("http://test/pdf", "Print Title")
    ).rejects.toThrow("PDF fetch failed: HTTP 503");

    expect(docTitle).toBe("Original Title");
    // No iframe was ever appended
    expect(appendedChildren).toHaveLength(0);
  });

  // ─── 4. Happy path ─────────────────────────────────────────────────────────
  it("creates blob URL, appends iframe, triggers print, removes iframe, restores title", async () => {
    vi.stubGlobal("fetch", async () => ({
      ok: true,
      blob: async () => new Blob(["fake-pdf"]),
    }));

    const { printPdfViaIframe } = await import("@/lib/print-pdf-iframe");
    const printPromise = printPdfViaIframe("http://test/pdf", "Print Title");

    await flush(6);

    // Iframe appended
    expect(appendedChildren).toHaveLength(1);
    expect(mockIframe.onload).not.toBeNull();

    // Fire onload
    mockIframe.onload!();

    // Fire 100 ms renderer warm-up timer
    const warmup = timeouts.find((t) => t.delay === 100);
    expect(warmup).toBeDefined();
    warmup!.fn();

    // Fire 3 000 ms cleanup/resolve timer
    const cleanup = timeouts.find((t) => t.delay === 3_000);
    expect(cleanup).toBeDefined();
    cleanup!.fn();

    await printPromise;

    // A blob URL was created
    expect(createdObjectUrls).toHaveLength(1);
    expect(createdObjectUrls[0]).toMatch(/^blob:mock-/);
    // iframe.contentWindow.print() was called
    expect(mockIframe.contentWindow.print).toHaveBeenCalledOnce();
    // iframe removed
    expect(removedChildren).toHaveLength(1);
    // title restored
    expect(docTitle).toBe("Original Title");
  });
});
