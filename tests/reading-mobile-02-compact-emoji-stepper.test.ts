import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import StoryCycleRunnerPage from "@/app/reading/level/[levelId]/story/[storyId]/page";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

const STATION_EMOJIS = ["📖", "⚡", "🔍", "🧩", "✍️", "🏁"] as const;

function getMobileStepperButtons(html: string): string[] {
  const mobileStepperMatch = html.match(
    /<section\b[^>]*class="[^"]*\bsm:hidden\b[^"]*"[^>]*>(?:(?!<\/section>)[\s\S])*?<\/section>/
  );
  expect(mobileStepperMatch).not.toBeNull();
  const buttonMatches = mobileStepperMatch![0].match(
    /<button\b[\s\S]*?<\/button>/g
  );
  expect(buttonMatches).not.toBeNull();
  expect(buttonMatches!).toHaveLength(6);
  return buttonMatches!;
}

describe("Reading Mobile Layout 02 — Compact emoji stepper for mobile", () => {
  it("renders a mobile-only compact emoji stepper and hides the desktop stepper below sm on standard stories", async () => {
    const pageComponent = await StoryCycleRunnerPage({
      params: Promise.resolve({ levelId: "level-1", storyId: "1" }),
    });
    const html = renderToString(pageComponent);

    const buttonMatches = getMobileStepperButtons(html);

    STATION_EMOJIS.forEach((emoji, index) => {
      const btn = buttonMatches[index];
      expect(btn).toMatch(/\bw-10\b/);
      expect(btn).toMatch(/\bh-10\b/);
      expect(btn).toContain(emoji);
    });

    // Active station (first) gets emerald-600 fill; future stations get slate tint
    expect(buttonMatches[0]).toMatch(/\bbg-emerald-600\b/);
    for (let i = 1; i < 6; i++) {
      expect(buttonMatches[i]).toMatch(/\bbg-slate-100\b/);
      expect(buttonMatches[i]).toMatch(/\bborder-slate-200\b/);
    }

    // Desktop stepper section hides on mobile (hidden sm:block) and retains min-w-[620px]
    const desktopStepperMatch = html.match(
      /<section\b[^>]*class="[^"]*\bhidden sm:(?:block|flex)\b[^"]*"[^>]*>(?:(?!<\/section>)[\s\S])*?min-w-\[620px\](?:(?!<\/section>)[\s\S])*?<\/section>/
    );
    expect(desktopStepperMatch).not.toBeNull();

    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });

  it("uses indigo-600 for the active station circle on Transfer Test stories", async () => {
    const pageComponent = await StoryCycleRunnerPage({
      params: Promise.resolve({ levelId: "level-1", storyId: "6" }),
    });
    const html = renderToString(pageComponent);

    const buttonMatches = getMobileStepperButtons(html);
    expect(buttonMatches[0]).toMatch(/\bbg-indigo-600\b/);

    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });
});
