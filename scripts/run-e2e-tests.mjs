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

async function main() {
  console.log(`Starting Next.js server on port ${PORT}...`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
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
    console.log("Server is ready! Launching Microsoft Edge via Playwright...");

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
