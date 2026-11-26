import { describe, expect, it } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { getReadingLevel, getReadingStory } from "@/curriculum/reading-catalog";
import FreeReadingNook from "@/components/reading/stations/FreeReadingNook";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Reading Mobile Layout 04 — Reading Nook icon-only header buttons on mobile", () => {
  const level1 = getReadingLevel("level-1")!;
  const story4 = getReadingStory("level-1", 4)!;

  it("hides Teacher Shield and Print text labels on mobile (hidden sm:inline) while keeping 44px tap targets", () => {
    const html = renderToString(
      React.createElement(FreeReadingNook, {
        level: level1,
        story: story4,
        nextStoryNumber: 5,
        shieldOpen: false,
        onSetShieldOpen: () => {},
      })
    );

    const headerMatch = html.match(/<header\b[\s\S]*?<\/header>/);
    expect(headerMatch).not.toBeNull();
    const headerHtml = headerMatch![0];

    const buttons = headerHtml.match(/<button\b[\s\S]*?<\/button>/g);
    expect(buttons).not.toBeNull();
    expect(buttons!).toHaveLength(2);

    const [shieldBtn, printBtn] = buttons!;

    // Teacher Shield button: emoji visible, label hidden below sm, >= 44px tap target
    expect(shieldBtn).toContain("👩‍🏫");
    expect(shieldBtn).toMatch(
      /<span\b[^>]*class="[^"]*\bhidden\b[^"]*\bsm:inline\b[^"]*"[^>]*>درع المعلم<\/span>/
    );
    expect(shieldBtn).toContain("min-h-[44px]");

    // Print button: emoji visible, label hidden below sm, >= 44px tap target
    expect(printBtn).toContain("🖨️");
    expect(printBtn).toMatch(
      /<span\b[^>]*class="[^"]*\bhidden\b[^"]*\bsm:inline\b[^"]*"[^>]*>طباعة ورقة العمل<\/span>/
    );
    expect(printBtn).toContain("min-h-[44px]");

    // No fixed mobile bottom bar in Free Reading Nook
    expect(html).not.toMatch(
      /<nav\b[^>]*class="[^"]*\bfixed\b[^"]*\bbottom-0\b/
    );

    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });
});
