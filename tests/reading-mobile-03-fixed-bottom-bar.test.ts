import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import StoryCycleRunnerPage from "@/app/reading/level/[levelId]/story/[storyId]/page";
import { viewport } from "@/app/layout";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Reading Mobile Layout 03 — Fixed mobile bottom bar with merged navigation and actions", () => {
  it("renders a fixed mobile bottom bar with safe-area padding and five 44px-min-target elements", async () => {
    const pageComponent = await StoryCycleRunnerPage({
      params: Promise.resolve({ levelId: "level-1", storyId: "1" }),
    });
    const html = renderToString(pageComponent);

    const fixedBarMatch = html.match(
      /<nav\b[^>]*class="[^"]*\bfixed\b[^"]*\bbottom-0\b[^"]*\binset-x-0\b[^"]*\bz-30\b[^"]*\bsm:hidden\b[^"]*"[^>]*>[\s\S]*?<\/nav>/
    );

    expect(fixedBarMatch).not.toBeNull();
    const barHtml = fixedBarMatch![0];

    expect(barHtml).toMatch(/\bbg-white\b/);
    expect(barHtml).toMatch(/\bborder-t\b/);
    expect(barHtml).toContain("pb-[env(safe-area-inset-bottom)]");

    // 4 buttons (Shield, Prev, Next, Print) each with min-h-[44px] min-w-[44px]
    const buttons = barHtml.match(/<button\b[\s\S]*?<\/button>/g);
    expect(buttons).not.toBeNull();
    expect(buttons!).toHaveLength(4);
    for (const btn of buttons!) {
      expect(btn).toContain("min-h-[44px]");
      expect(btn).toContain("min-w-[44px]");
    }

    // Five elements in order: Shield, Prev, indicator, Next, Print
    expect(buttons![0]).toContain("👩‍🏫");
    expect(buttons![1]).toContain("السابقة");
    expect(barHtml).toContain("المحطة ١ من ٦");
    expect(buttons![2]).toContain("التالية");
    expect(buttons![3]).toContain("🖨️");

    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });

  it("hides the in-flow bottom nav and header action buttons on mobile (hidden sm:flex)", async () => {
    const pageComponent = await StoryCycleRunnerPage({
      params: Promise.resolve({ levelId: "level-1", storyId: "1" }),
    });
    const html = renderToString(pageComponent);

    // Existing in-flow bottom nav gets hidden sm:flex
    expect(html).toMatch(
      /<div\b[^>]*class="[^"]*\bmt-8\b[^"]*\bpt-4\b[^"]*\bborder-t\b[^"]*\bhidden\b[^"]*\bsm:flex\b[^"]*"/
    );

    // Header right-side actions div gets hidden sm:flex
    expect(html).toMatch(
      /<div\b[^>]*class="[^"]*\bhidden\b[^"]*\bsm:flex\b[^"]*"[^>]*>(?:(?!<\/div>)[\s\S])*?درع المعلم(?:(?!<\/div>)[\s\S])*?طباعة ورقة العمل(?:(?!<\/div>)[\s\S])*?شبكة القصص(?:(?!<\/div>)[\s\S])*?<\/div>/
    );
  });

  it("configures viewport-fit=cover in root layout", () => {
    expect(viewport.viewportFit).toBe("cover");
  });
});
