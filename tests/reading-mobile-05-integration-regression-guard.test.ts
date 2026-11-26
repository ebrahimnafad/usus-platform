import { describe, expect, it } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { getReadingLevel, getReadingStory } from "@/curriculum/reading-catalog";
import StoryCycleRunnerClient from "@/components/reading/StoryCycleRunnerClient";
import FreeReadingNook from "@/components/reading/stations/FreeReadingNook";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

const STATION_EMOJIS = ["📖", "⚡", "🔍", "🧩", "✍️", "🏁"] as const;

function getMobileStepperButtons(html: string): string[] {
  const mobileStepperMatch = html.match(
    /<section\b[^>]*class="[^"]*\bsm:hidden\b[^"]*"[^>]*>(?:(?!<\/section>)[\s\S])*?<\/section>/
  );
  expect(mobileStepperMatch).not.toBeNull();
  const mobileButtons = mobileStepperMatch![0].match(
    /<button\b[\s\S]*?<\/button>/g
  );
  expect(mobileButtons).not.toBeNull();
  expect(mobileButtons!).toHaveLength(6);
  return mobileButtons!;
}

describe("Reading Mobile Layout 05 — Integration regression guard & Eastern Arabic numerals", () => {
  const level1 = getReadingLevel("level-1")!;
  const standardStory = getReadingStory("level-1", 1)!;
  const nookStory = getReadingStory("level-1", 4)!;
  const transferStory = getReadingStory("level-1", 6)!;

  it("renders standard StoryCycleRunnerClient with all mobile-layout and preserved desktop elements and no Western numerals", () => {
    const html = renderToString(
      React.createElement(StoryCycleRunnerClient, {
        level: level1,
        story: standardStory,
      })
    );

    // 1. Mobile bottom bar present with sm:hidden
    expect(html).toMatch(
      /<nav\b[^>]*class="[^"]*\bfixed\b[^"]*\bbottom-0\b[^"]*\binset-x-0\b[^"]*\bz-30\b[^"]*\bsm:hidden\b[^"]*"[^>]*>[\s\S]*?<\/nav>/
    );

    // 2. Mobile stepper present with six emoji icons
    const mobileButtons = getMobileStepperButtons(html);
    STATION_EMOJIS.forEach((emoji, idx) => {
      expect(mobileButtons[idx]).toContain(emoji);
    });

    // 3. Desktop stepper present with hidden sm:
    expect(html).toMatch(
      /<section\b[^>]*class="[^"]*\bhidden\b[^"]*\bsm:(?:block|flex)\b[^"]*"[^>]*>(?:(?!<\/section>)[\s\S])*?min-w-\[620px\](?:(?!<\/section>)[\s\S])*?<\/section>/
    );

    // 4. In-flow nav present with hidden sm:
    expect(html).toMatch(
      /<div\b[^>]*class="[^"]*\bmt-8\b[^"]*\bpt-4\b[^"]*\bborder-t\b[^"]*\bhidden\b[^"]*\bsm:flex\b[^"]*"/
    );

    // 5. Header actions present with hidden sm:
    expect(html).toMatch(
      /<div\b[^>]*class="[^"]*\bhidden\b[^"]*\bsm:flex\b[^"]*"[^>]*>(?:(?!<\/div>)[\s\S])*?درع المعلم(?:(?!<\/div>)[\s\S])*?طباعة ورقة العمل(?:(?!<\/div>)[\s\S])*?شبكة القصص(?:(?!<\/div>)[\s\S])*?<\/div>/
    );

    // 6. Breadcrumb early segments present with hidden sm: while level and story remain visible
    expect(html).toMatch(
      /<li[^>]*class="[^"]*\bhidden\b[^"]*\bsm:inline-flex\b[^"]*"[^>]*>[\s\S]*?الرئيسية[\s\S]*?<\/li>/
    );
    expect(html).toMatch(
      /<li[^>]*class="[^"]*\bhidden\b[^"]*\bsm:inline-flex\b[^"]*"[^>]*>[\s\S]*?القراءة[\s\S]*?<\/li>/
    );
    const levelLiMatch = html.match(
      /<li\b[^>]*>(?:(?!<\/li>)[\s\S])*?المستوى الأول(?:(?!<\/li>)[\s\S])*?<\/li>/
    );
    expect(levelLiMatch).not.toBeNull();
    expect(levelLiMatch![0]).not.toMatch(/<li[^>]*class="[^"]*\bhidden\b/);

    // 7. Eastern Arabic numerals check
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });

  it("renders Transfer Test StoryCycleRunnerClient with hidden sm: banner description, indigo active stepper, visible badge, and no Western numerals", () => {
    const html = renderToString(
      React.createElement(StoryCycleRunnerClient, {
        level: level1,
        story: transferStory,
      })
    );

    // 1. Transfer Test badge visible (not hidden)
    expect(html).toMatch(
      /<span\b[^>]*class="(?![^"]*\bhidden\b)[^"]*"[^>]*>(?:(?!<\/span>)[\s\S])*?🎯 اختبار النقل(?:(?!<\/span>)[\s\S])*?<\/span>/
    );

    // 2. Banner description has hidden sm:
    expect(html).toMatch(
      /<span\b[^>]*class="[^"]*\bhidden\b[^"]*\bsm:inline\b[^"]*"[^>]*>(?:(?!<\/span>)[\s\S])*?قياس الأداء المستقل: يُقرأ النص دون مساعدات(?:(?!<\/span>)[\s\S])*?<\/span>/
    );

    // 3. Mobile stepper active circle uses indigo theme colour
    const mobileButtons = getMobileStepperButtons(html);
    expect(mobileButtons[0]).toMatch(/\bbg-indigo-600\b/);

    // 4. Eastern Arabic numerals check
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });

  it("renders FreeReadingNook with hidden sm: Shield/Print labels, no bottom bar, and no Western numerals", () => {
    const html = renderToString(
      React.createElement(FreeReadingNook, {
        level: level1,
        story: nookStory,
        nextStoryNumber: 5,
        shieldOpen: false,
        onSetShieldOpen: () => {},
      })
    );

    // 1. Shield and Print label spans have hidden sm:
    expect(html).toMatch(
      /<span\b[^>]*class="[^"]*\bhidden\b[^"]*\bsm:inline\b[^"]*"[^>]*>درع المعلم<\/span>/
    );
    expect(html).toMatch(
      /<span\b[^>]*class="[^"]*\bhidden\b[^"]*\bsm:inline\b[^"]*"[^>]*>طباعة ورقة العمل<\/span>/
    );

    // 2. No bottom bar element present
    expect(html).not.toMatch(
      /<nav\b[^>]*class="[^"]*\bfixed\b[^"]*\bbottom-0\b/
    );

    // 3. Eastern Arabic numerals check
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });
});
