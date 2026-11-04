import { spawn } from "child_process";
import { chromium } from "playwright";

const PORT = 3344;
const BASE_URL = `http://localhost:${PORT}`;

async function waitUrl(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (e) {
      // wait and retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Timeout waiting for ${url}`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForParam(page, name, value) {
  await page.waitForFunction(
    ({ name, value }) =>
      new URL(window.location.href).searchParams.get(name) === value,
    { name, value }
  );
}

async function readParam(page, name) {
  return page.evaluate(
    (name) => new URL(window.location.href).searchParams.get(name),
    name
  );
}

async function waitForCanvasIdle(page) {
  await page.waitForFunction(() => {
    const canvas = document.querySelector('[data-studio-canvas="true"]');
    return canvas && canvas.getAttribute("data-canvas-pending") === "false";
  });
}

async function openStudio(page, query = "") {
  await page.goto(`${BASE_URL}/math/k${query}`);
  await page.waitForSelector(
    '[data-studio-panel="true"][data-hydrated="true"]'
  );
  await page.waitForSelector('[data-studio-canvas="true"]');
  await waitForCanvasIdle(page);
  await page.waitForTimeout(150);
}

async function main() {
  console.log(`Starting Next.js dev server on port ${PORT}...`);
  const server = spawn("npx", ["next", "dev", "-p", String(PORT)], {
    shell: true,
    stdio: "inherit",
  });

  const cleanup = () => {
    try {
      if (process.platform === "win32") {
        spawn("taskkill", ["/pid", String(server.pid), "/f", "/t"]);
      } else {
        server.kill();
      }
    } catch (e) {
      // ignore
    }
  };

  process.on("exit", cleanup);
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  try {
    await waitUrl(`${BASE_URL}/math`);
    // Warm the studio route so the first browser navigation does not race
    // Next's development compilation.
    await waitUrl(`${BASE_URL}/math/k?lesson=5&seed=E2E-WARMUP`, 120000);
    console.log("Server is ready! Launching Microsoft Edge via Playwright...");

    // AGENTS.md: Chromium is not installed; "msedge" runs Edge via Playwright's chromium launcher
    const browser = await chromium.launch({
      channel: "msedge",
      headless: true,
    });

    console.log("Edge launched. Running Normal Motion E2E test...");
    const contextNormal = await browser.newContext();
    const pageNormal = await contextNormal.newPage();

    // 1. Visit Grade Hub
    await pageNormal.goto(`${BASE_URL}/math`);
    await pageNormal.waitForSelector('[data-math-grade-hub="true"]');
    console.log("✓ Grade Hub page loaded");

    // 2. Verify all 6 cards exist
    const cards = await pageNormal.$$("[data-grade-card]");
    if (cards.length !== 6) {
      throw new Error(`Expected 6 grade cards, found ${cards.length}`);
    }
    console.log("✓ All 6 grade cards present on hub");

    // 3. Verify Grade K shared layout attributes
    const cardK = pageNormal.locator('[data-grade-card="k"]');
    const layoutIdK = await cardK.getAttribute("data-layout-id");
    if (layoutIdK !== "grade-k") {
      throw new Error(`Expected data-layout-id="grade-k", got "${layoutIdK}"`);
    }
    console.log("✓ Grade K card has layoutId 'grade-k'");

    // 4. Click Grade K card to enter Studio
    const enterStudioLink = cardK.locator("a");
    await enterStudioLink.click();
    await pageNormal.waitForURL("**/math/k");
    console.log("✓ Navigated to /math/k");

    // 5. Verify Studio Header has matching layoutId
    const header = pageNormal.locator('[data-math-topbar="true"]');
    await header.waitFor();
    const headerLayoutId = await header.getAttribute("data-layout-id");
    if (headerLayoutId !== "grade-k") {
      throw new Error(
        `Expected header data-layout-id="grade-k", got "${headerLayoutId}"`
      );
    }
    console.log("✓ StudioHeader has matching layoutId 'grade-k'");

    // 6. Verify Studio content loaded
    await pageNormal.waitForSelector('[data-studio-content="true"]');
    console.log("✓ Studio content loaded");

    // 7. Click back button (reverse transition)
    const backBtn = pageNormal.locator('a[aria-label="العودة لاختيار الصف"]');
    await backBtn.click();
    await pageNormal.waitForURL("**/math");
    await pageNormal.waitForSelector('[data-math-grade-hub="true"]');
    console.log("✓ Back button reversed transition back to /math");

    await contextNormal.close();

    // 8. Reduced Motion E2E test
    console.log("\nRunning Reduced Motion E2E test...");
    const contextReduced = await browser.newContext({
      reducedMotion: "reduce",
    });
    const pageReduced = await contextReduced.newPage();

    await pageReduced.goto(`${BASE_URL}/math`);
    await pageReduced.waitForSelector('[data-math-grade-hub="true"]');

    // Click Grade 1 card
    const card1 = pageReduced.locator('[data-grade-card="1"]');
    await card1.locator("a").click();
    await pageReduced.waitForURL("**/math/1");
    console.log("✓ Navigated instantly to /math/1 with reduced-motion");

    await pageReduced.waitForSelector('[data-math-topbar="true"]');
    await pageReduced.waitForSelector('[data-studio-content="true"]');

    // Breadcrumb reverse transition
    const breadcrumbMath = pageReduced.locator('a:has-text("الرياضيات")');
    await breadcrumbMath.click();
    await pageReduced.waitForURL("**/math");
    await pageReduced.waitForSelector('[data-math-grade-hub="true"]');
    console.log(
      "✓ Breadcrumb reversed transition back to /math with reduced-motion"
    );

    // 9. Persistent panel + optimistic tuning
    console.log("\nRunning Persistent Panel E2E test...");
    const contextPanel = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const pagePanel = await contextPanel.newPage();

    await openStudio(
      pagePanel,
      "?lesson=5&seed=PERSIST1&difficulty=scaffolded&view=worksheet"
    );

    await pagePanel.locator("#studio-unit-3-header").click();
    await pagePanel.evaluate(() => {
      document.querySelector('[data-studio-catalogue="true"]').scrollTop = 700;
    });
    await pagePanel.locator('[data-studio-search="true"]').fill("K");
    await pagePanel.waitForSelector('[data-search-count="true"]');
    await pagePanel.waitForTimeout(150);

    const beforeTuning = await pagePanel.evaluate(() => {
      window.__persistentPanel = document.querySelector(
        '[data-studio-panel="true"]'
      );
      return {
        scrollTop: document.querySelector('[data-studio-catalogue="true"]')
          .scrollTop,
        query: document.querySelector('[data-studio-search="true"]').value,
      };
    });

    await pagePanel.evaluate(() => {
      window.__pendingSeen = false;
      window.__pendingBarSeen = false;
      const canvas = document.querySelector('[data-studio-canvas="true"]');
      const observer = new MutationObserver(() => {
        if (canvas.getAttribute("data-canvas-pending") === "true") {
          window.__pendingSeen = true;
          window.__pendingBarSeen = Boolean(
            canvas.querySelector('[data-canvas-pending-bar="true"]')
          );
        }
      });
      observer.observe(canvas, {
        attributes: true,
        attributeFilter: ["data-canvas-pending"],
      });
    });

    await pagePanel.locator('[data-difficulty-option="Advanced"]').click();
    await waitForParam(pagePanel, "difficulty", "Advanced");
    await waitForCanvasIdle(pagePanel);

    const afterTuning = await pagePanel.evaluate(() => ({
      samePanel:
        window.__persistentPanel ===
        document.querySelector('[data-studio-panel="true"]'),
      scrollTop: document.querySelector('[data-studio-catalogue="true"]')
        .scrollTop,
      query: document.querySelector('[data-studio-search="true"]').value,
      pendingSeen: window.__pendingSeen,
      pendingBarSeen: window.__pendingBarSeen,
      explainer: document
        .querySelector('[data-difficulty-explainer="true"]')
        .textContent.trim(),
    }));

    assert(afterTuning.samePanel, "Panel remounted when difficulty changed");
    assert(
      afterTuning.query === "K",
      `Expected search text to survive tuning, got "${afterTuning.query}"`
    );
    assert(
      Math.abs(afterTuning.scrollTop - beforeTuning.scrollTop) <= 2,
      `Expected catalogue scroll ${beforeTuning.scrollTop} to survive tuning, got ${afterTuning.scrollTop}`
    );
    assert(
      afterTuning.pendingSeen,
      "Expected the canvas to enter its in-flight state"
    );
    assert(
      afterTuning.pendingBarSeen,
      "Expected the in-flight accent bar on the canvas"
    );
    assert(
      afterTuning.explainer === "كل التمارين بمستوى متقدم",
      `Unexpected difficulty explainer: ${afterTuning.explainer}`
    );
    console.log(
      "✓ Difficulty tuned in place: panel kept scroll, query, and identity; canvas showed pending state"
    );

    await pagePanel.locator('[data-studio-search="true"]').press("Escape");
    await pagePanel.waitForFunction(
      () => document.querySelector('[data-studio-search="true"]').value === ""
    );
    assert(
      (await pagePanel
        .locator("#studio-unit-3-header")
        .getAttribute("aria-expanded")) === "true",
      "Expected open unit to survive tuning"
    );
    console.log("✓ Open unit and cleared search state survived tuning");
    await contextPanel.close();

    // 10. Ten seed rolls and history
    console.log("\nRunning Seed History E2E test...");
    const contextSeed = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const pageSeed = await contextSeed.newPage();

    await openStudio(
      pageSeed,
      "?lesson=5&seed=HIST0001&difficulty=scaffolded&view=worksheet"
    );
    await pageSeed.locator('[data-lesson-item="K-٦"]').click();
    await waitForParam(pageSeed, "lesson", "6");
    await waitForCanvasIdle(pageSeed);

    await pageSeed.locator('[data-studio-search="true"]').fill("K");
    await pageSeed.waitForTimeout(150);
    await pageSeed.evaluate(() => {
      window.__historyPanel = document.querySelector(
        '[data-studio-panel="true"]'
      );
      document.querySelector('[data-studio-catalogue="true"]').scrollTop = 500;
    });
    const scrollBeforeRolls = await pageSeed.evaluate(
      () => document.querySelector('[data-studio-catalogue="true"]').scrollTop
    );
    const historyBeforeRolls = await pageSeed.evaluate(() => history.length);

    for (let roll = 0; roll < 10; roll += 1) {
      const previousSeed = await readParam(pageSeed, "seed");
      await pageSeed.locator('[data-regenerate-seed="true"]').click();
      await pageSeed.waitForFunction(
        (previous) =>
          new URL(window.location.href).searchParams.get("seed") !== previous,
        previousSeed
      );
      await pageSeed.waitForTimeout(120);
      await waitForCanvasIdle(pageSeed);
    }

    const historyAfterRolls = await pageSeed.evaluate(() => history.length);
    assert(
      historyAfterRolls === historyBeforeRolls,
      `Expected ten seed rolls to leave history at ${historyBeforeRolls}, got ${historyAfterRolls}`
    );

    const afterRolls = await pageSeed.evaluate(() => ({
      samePanel:
        window.__historyPanel ===
        document.querySelector('[data-studio-panel="true"]'),
      query: document.querySelector('[data-studio-search="true"]').value,
      scrollTop: document.querySelector('[data-studio-catalogue="true"]')
        .scrollTop,
    }));
    assert(afterRolls.samePanel, "Panel remounted during seed rolls");
    assert(afterRolls.query === "K", "Search text did not survive seed rolls");
    assert(
      Math.abs(afterRolls.scrollTop - scrollBeforeRolls) <= 2,
      `Catalogue scroll did not survive seed rolls (${scrollBeforeRolls} -> ${afterRolls.scrollTop})`
    );
    console.log("✓ Ten seed rolls left one history entry and kept panel state");

    await pageSeed.evaluate(() => history.back());
    await waitForParam(pageSeed, "lesson", "5");
    await waitForCanvasIdle(pageSeed);
    assert(
      (await readParam(pageSeed, "seed")) === "HIST0001",
      "Expected back to return to the previous lesson's seed"
    );
    console.log("✓ Back returned to the previously selected lesson");
    await contextSeed.close();

    // 11. Reading-mode rail with cookie persistence
    console.log("\nRunning Reading Mode E2E test...");
    const contextRail = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const pageRail = await contextRail.newPage();

    await openStudio(
      pageRail,
      "?lesson=5&seed=RAIL0001&difficulty=scaffolded&view=worksheet"
    );
    const canvasWidthBefore = (
      await pageRail.locator('[data-studio-canvas="true"]').boundingBox()
    ).width;
    await pageRail.locator('button[aria-label="طي لوحة المنهج"]').click();
    await pageRail.waitForFunction(
      () =>
        document
          .querySelector('[data-studio-panel="true"]')
          .getAttribute("data-rail-collapsed") === "true"
    );
    await pageRail.waitForTimeout(300);

    const collapsedBox = await pageRail
      .locator('[data-studio-panel="true"]')
      .boundingBox();
    const canvasWidthAfter = (
      await pageRail.locator('[data-studio-canvas="true"]').boundingBox()
    ).width;
    assert(
      collapsedBox.width >= 70 && collapsedBox.width <= 74,
      `Expected a 72px rail, got ${collapsedBox.width}px`
    );
    assert(
      canvasWidthAfter > canvasWidthBefore,
      "Canvas did not reflow into the rail's freed width"
    );
    assert(
      await pageRail.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      ),
      "Collapsing the rail introduced horizontal scrolling"
    );
    await pageRail.waitForFunction(
      () =>
        document.activeElement?.getAttribute("aria-label") ===
        "توسيع لوحة المنهج"
    );
    console.log("✓ Rail collapsed to 72px, canvas reflowed, focus moved");

    const serverHtml = await contextRail.request
      .get(
        `${BASE_URL}/math/k?lesson=5&seed=RAIL0001&difficulty=scaffolded&view=worksheet`
      )
      .then((response) => response.text());
    assert(
      serverHtml.includes('data-rail-collapsed="true"'),
      "Server-rendered markup did not carry the collapsed rail state"
    );

    await pageRail.reload();
    await pageRail.waitForSelector('[data-studio-panel="true"]');
    const reloadedBox = await pageRail
      .locator('[data-studio-panel="true"]')
      .boundingBox();
    assert(
      (await pageRail
        .locator('[data-studio-panel="true"]')
        .getAttribute("data-rail-collapsed")) === "true",
      "Rail state did not survive reload"
    );
    assert(
      reloadedBox.width >= 70 && reloadedBox.width <= 74,
      `Expected collapsed rail on first paint after reload, got ${reloadedBox.width}px`
    );
    console.log("✓ Rail cookie produced collapsed first paint after reload");

    await pageRail.locator('button[aria-label="توسيع لوحة المنهج"]').click();
    await pageRail.waitForFunction(
      () =>
        document
          .querySelector('[data-studio-panel="true"]')
          .getAttribute("data-rail-collapsed") === "false"
    );
    await pageRail.waitForTimeout(300);
    const expandedBox = await pageRail
      .locator('[data-studio-panel="true"]')
      .boundingBox();
    assert(
      expandedBox.width >= 380 && expandedBox.width <= 388,
      `Expected the full panel to return, got ${expandedBox.width}px`
    );
    await contextRail.close();

    // 12. Clipboard payloads and confirmation
    console.log("\nRunning Seed Clipboard E2E test...");
    const contextClip = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      permissions: ["clipboard-read", "clipboard-write"],
    });
    await contextClip.addInitScript(() => {
      window.__clipboardWrites = [];
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async (text) => {
            window.__clipboardWrites.push(text);
          },
        },
      });
    });
    const pageClip = await contextClip.newPage();

    await openStudio(
      pageClip,
      "?lesson=5&seed=CLIP0001&difficulty=Intermediate&view=answer-key"
    );
    await pageClip.locator('button[aria-label="نسخ رمز الورقة"]').click();
    await pageClip.waitForFunction(
      () =>
        document
          .querySelector('[data-copy-feedback="true"]')
          .textContent.trim() === "تم نسخ الرمز"
    );
    const copied = await pageClip.evaluate(() => window.__clipboardWrites);
    assert(
      copied[0] === "CLIP0001",
      `Expected raw seed payload, got "${copied[0]}"`
    );
    await pageClip.waitForFunction(
      () =>
        document
          .querySelector('[data-copy-feedback="true"]')
          .textContent.trim() === ""
    );
    console.log("✓ Copy code produced the raw seed and reverted confirmation");

    await pageClip.locator('button[aria-label="نسخ رابط الورقة"]').click();
    await pageClip.waitForFunction(
      () =>
        document
          .querySelector('[data-copy-feedback="true"]')
          .textContent.trim() === "تم نسخ الرابط"
    );
    const linkWrites = await pageClip.evaluate(() => window.__clipboardWrites);
    const copiedLink = new URL(linkWrites[1]);
    assert(
      copiedLink.origin === new URL(BASE_URL).origin,
      "Link was not absolute"
    );
    assert(
      copiedLink.pathname === "/math/k",
      `Unexpected link path ${copiedLink.pathname}`
    );
    assert(copiedLink.searchParams.get("grade") === "K", "Link lost grade");
    assert(copiedLink.searchParams.get("lesson") === "5", "Link lost lesson");
    assert(
      copiedLink.searchParams.get("seed") === "CLIP0001",
      "Link lost seed"
    );
    assert(
      copiedLink.searchParams.get("difficulty") === "Intermediate",
      "Link lost difficulty"
    );
    assert(
      copiedLink.searchParams.get("view") === "answer-key",
      "Link lost view mode"
    );
    console.log("✓ Copy link produced an absolute, reproducible payload");
    await contextClip.close();

    // 13. Unit spine navigation
    console.log("\nRunning Unit Spine E2E test...");
    const contextSpine = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const pageSpine = await contextSpine.newPage();

    await openStudio(
      pageSpine,
      "?lesson=5&seed=SPINE001&difficulty=scaffolded&view=worksheet"
    );
    const spineUrlBefore = pageSpine.url();
    await pageSpine.locator('[data-spine-unit="9"]').click();
    await pageSpine.waitForTimeout(600);

    assert(
      pageSpine.url() === spineUrlBefore,
      "Spine navigation changed the URL"
    );
    assert(
      (await pageSpine
        .locator("#studio-unit-9-header")
        .getAttribute("aria-expanded")) === "true",
      "Spine did not expand the selected unit"
    );
    const spineScroll = await pageSpine.evaluate(() => {
      const scroller = document
        .querySelector('[data-studio-catalogue="true"]')
        .getBoundingClientRect();
      const header = document
        .querySelector("#studio-unit-9-header")
        .getBoundingClientRect();
      return {
        scrollTop: document.querySelector('[data-studio-catalogue="true"]')
          .scrollTop,
        headerTop: header.top,
        scrollerTop: scroller.top,
        headerBottom: header.bottom,
        scrollerBottom: scroller.bottom,
      };
    });
    assert(spineScroll.scrollTop > 0, "Spine did not scroll the catalogue");
    assert(
      spineScroll.headerTop >= spineScroll.scrollerTop - 1 &&
        spineScroll.headerBottom <= spineScroll.scrollerBottom + 1,
      "Selected unit header did not land in view"
    );
    assert(
      (await pageSpine.locator("[data-poster-lesson-number]").textContent()) ===
        "٥",
      "Spine navigation changed the current lesson"
    );
    console.log(
      "✓ Spine expanded and scrolled unit 9 without touching the lesson or URL"
    );
    await contextSpine.close();

    // 14. Mobile paper-first sheet and chevrons
    console.log("\nRunning Mobile Sheet E2E test...");
    const contextMobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const pageMobile = await contextMobile.newPage();

    await pageMobile.goto(
      `${BASE_URL}/math/k?lesson=5&seed=MOBILE01&difficulty=scaffolded&view=worksheet`
    );
    await pageMobile.waitForSelector('[data-studio-canvas="true"]');
    await pageMobile.waitForSelector('[data-studio-mobile-bar="true"]');
    await pageMobile.waitForTimeout(500);
    assert(
      !(await pageMobile.locator('[data-studio-panel="true"]').isVisible()),
      "Panel was visible in flow on mobile"
    );
    assert(
      await pageMobile.locator('[data-studio-mobile-bar="true"]').isVisible(),
      "Mobile lesson bar was not visible"
    );
    assert(
      await pageMobile.evaluate(
        () => document.documentElement.scrollHeight <= window.innerHeight + 2
      ),
      "Mobile required page scrolling to reach the paper"
    );
    console.log("✓ Paper first on mobile with a persistent lesson bar");

    await pageMobile.locator('[data-mobile-open-curriculum="true"]').click();
    await pageMobile.waitForSelector('[data-studio-panel="true"]');
    const sheetBox = await pageMobile
      .locator('[data-studio-panel="true"]')
      .boundingBox();
    assert(
      Math.abs(sheetBox.height - 844 * 0.88) <= 20,
      `Expected an 88dvh sheet, got ${sheetBox.height}px`
    );
    assert(
      (await pageMobile
        .locator('[data-studio-panel="true"]')
        .getAttribute("role")) === "dialog",
      "Mobile sheet was not announced as a dialog"
    );
    assert(
      await pageMobile.evaluate(
        () => document.querySelector('[data-studio-background="true"]').inert
      ),
      "Mobile sheet did not make the background inert"
    );
    assert(
      await pageMobile.evaluate(() =>
        document
          .querySelector('[data-studio-panel="true"]')
          .contains(document.activeElement)
      ),
      "Mobile sheet did not move focus inside"
    );
    console.log("✓ Sheet opened at 88dvh as a modal dialog with trapped focus");

    await pageMobile.locator('[data-lesson-item="K-٦"]').click();
    await waitForParam(pageMobile, "lesson", "6");
    await waitForCanvasIdle(pageMobile);
    assert(
      !(await pageMobile.locator('[data-studio-panel="true"]').isVisible()),
      "Sheet stayed open after selecting a lesson"
    );
    assert(
      (await pageMobile
        .locator('[data-studio-mobile-bar="true"] [aria-label^="الدرس الحالي"]')
        .textContent()) === "٦",
      "Bar did not show the selected lesson"
    );
    console.log("✓ Lesson selection closed the sheet and updated the paper");

    await pageMobile.locator('[data-mobile-next-lesson="true"]').click();
    await waitForParam(pageMobile, "lesson", "7");
    await waitForCanvasIdle(pageMobile);
    await pageMobile.locator('[data-mobile-prev-lesson="true"]').click();
    await waitForParam(pageMobile, "lesson", "6");
    await waitForCanvasIdle(pageMobile);
    console.log("✓ Chevrons moved exactly one lesson at a time");

    await pageMobile.goto(
      `${BASE_URL}/math/k?lesson=11&seed=MOBILE01&difficulty=scaffolded&view=worksheet`
    );
    await pageMobile.waitForSelector('[data-studio-mobile-bar="true"]');
    await pageMobile.waitForTimeout(500);
    await pageMobile.locator('[data-mobile-next-lesson="true"]').click();
    await waitForParam(pageMobile, "lesson", "12");
    await waitForCanvasIdle(pageMobile);
    await pageMobile.locator('[data-mobile-open-curriculum="true"]').click();
    await pageMobile.waitForSelector('[data-studio-panel="true"]');
    await pageMobile.waitForFunction(
      () =>
        document
          .querySelector("#studio-unit-2-header")
          .getAttribute("aria-expanded") === "true"
    );
    await pageMobile.waitForFunction(() => {
      const scroller = document.querySelector('[data-studio-catalogue="true"]');
      const active = document.querySelector(
        '[data-lesson-item][data-active="true"]'
      );
      if (!scroller || !active) return false;
      const scrollerBox = scroller.getBoundingClientRect();
      const activeBox = active.getBoundingClientRect();
      return (
        activeBox.top >= scrollerBox.top - 1 &&
        activeBox.bottom <= scrollerBox.bottom + 1
      );
    });
    console.log(
      "✓ Crossing into a collapsed unit opened it and revealed the active lesson"
    );
    await pageMobile.keyboard.press("Escape");
    await pageMobile.waitForFunction(
      () =>
        !document
          .querySelector('[data-studio-panel="true"]')
          .classList.contains("studio-panel-sheet")
    );

    await pageMobile.goto(
      `${BASE_URL}/math/k?lesson=1&seed=MOBILE01&difficulty=scaffolded&view=worksheet`
    );
    await pageMobile.waitForSelector('[data-studio-mobile-bar="true"]');
    await pageMobile.waitForTimeout(500);
    assert(
      await pageMobile.locator('[data-mobile-prev-lesson="true"]').isDisabled(),
      "Previous chevron was enabled on lesson one"
    );
    await pageMobile.locator('[data-mobile-open-curriculum="true"]').click();
    await pageMobile.waitForSelector('[data-studio-panel="true"]');
    await pageMobile.keyboard.press("Escape");
    await pageMobile.waitForFunction(
      () =>
        !document
          .querySelector('[data-studio-panel="true"]')
          .classList.contains("studio-panel-sheet")
    );
    await pageMobile.waitForFunction(() =>
      document.activeElement?.hasAttribute("data-mobile-open-curriculum")
    );
    console.log("✓ Sheet closes on Escape and returns focus to the trigger");
    await contextMobile.close();

    // 15. Reduced motion rail and accordion
    console.log("\nRunning Reduced Motion Panel E2E test...");
    const pageReducedPanel = await contextReduced.newPage();
    await pageReducedPanel.goto(
      `${BASE_URL}/math/k?lesson=5&seed=REDUCED1&difficulty=scaffolded&view=worksheet`
    );
    await pageReducedPanel.waitForSelector('[data-studio-panel="true"]');
    await pageReducedPanel.waitForSelector('[data-studio-canvas="true"]');
    await pageReducedPanel.waitForTimeout(500);

    const reducedDurations = await pageReducedPanel.evaluate(() => ({
      panel: getComputedStyle(
        document.querySelector('[data-studio-panel="true"]')
      ).transitionDuration,
      header: getComputedStyle(document.querySelector("#studio-unit-3-header"))
        .transitionDuration,
    }));
    assert(
      reducedDurations.panel === "0s" || reducedDurations.panel === "0ms",
      `Expected rail transition to collapse, got ${reducedDurations.panel}`
    );
    assert(
      reducedDurations.header === "0s" || reducedDurations.header === "0ms",
      `Expected accordion transition to collapse, got ${reducedDurations.header}`
    );

    const reducedRailWidth = await pageReducedPanel.evaluate(async () => {
      document.querySelector('button[aria-label="طي لوحة المنهج"]').click();
      await new Promise((resolve) => requestAnimationFrame(resolve));
      return document
        .querySelector('[data-studio-panel="true"]')
        .getBoundingClientRect().width;
    });
    assert(
      reducedRailWidth <= 80,
      `Expected the rail to apply instantly, got ${reducedRailWidth}px`
    );

    const reducedAccordion = await pageReducedPanel.evaluate(async () => {
      document.querySelector('button[aria-label="توسيع لوحة المنهج"]').click();
      await new Promise((resolve) => requestAnimationFrame(resolve));
      const header = document.querySelector("#studio-unit-3-header");
      header.click();
      await new Promise((resolve) => requestAnimationFrame(resolve));
      return {
        expanded: header.getAttribute("aria-expanded"),
        duration: getComputedStyle(header).transitionDuration,
      };
    });
    assert(
      reducedAccordion.expanded === "true",
      "Accordion did not open instantly under reduced motion"
    );
    assert(
      reducedAccordion.duration === "0s" || reducedAccordion.duration === "0ms",
      `Expected accordion duration zero, got ${reducedAccordion.duration}`
    );
    console.log("✓ Rail and accordion apply instantly under reduced motion");

    await contextReduced.close();
    await browser.close();

    console.log("\n🎉 ALL PLAYWRIGHT E2E TESTS PASSED SUCCESSFULLY! 🎉");
  } finally {
    cleanup();
  }
}

main().catch((err) => {
  console.error("E2E test failed:", err);
  process.exit(1);
});
