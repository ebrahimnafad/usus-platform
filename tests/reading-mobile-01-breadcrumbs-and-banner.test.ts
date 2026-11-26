import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import StoryCycleRunnerPage from "@/app/reading/level/[levelId]/story/[storyId]/page";
import { findWesternNumeralsInRenderedHtml } from "@/lib/numerals";

describe("Reading Mobile Layout 01 — Trim breadcrumbs and Transfer Test banner on mobile", () => {
  it('applies "hidden sm:inline-flex" to the "الرئيسية" and "القراءة" breadcrumb items while keeping level and story visible', async () => {
    const pageComponent = await StoryCycleRunnerPage({
      params: Promise.resolve({ levelId: "level-1", storyId: "1" }),
    });
    const html = renderToString(pageComponent);

    // "الرئيسية" and "القراءة" <li> items should carry hidden sm:inline-flex
    expect(html).toMatch(
      /<li[^>]*class="[^"]*hidden sm:inline-flex[^"]*"[^>]*>[\s\S]*?الرئيسية[\s\S]*?<\/li>/
    );
    expect(html).toMatch(
      /<li[^>]*class="[^"]*hidden sm:inline-flex[^"]*"[^>]*>[\s\S]*?القراءة[\s\S]*?<\/li>/
    );

    // Level name and story title <li> items should remain visible on mobile (no "hidden" class on their <li>)
    const levelLiMatch = html.match(
      /<li\b[^>]*>(?:(?!<\/li>)[\s\S])*?المستوى الأول(?:(?!<\/li>)[\s\S])*?<\/li>/
    );
    expect(levelLiMatch).not.toBeNull();
    expect(levelLiMatch![0]).not.toMatch(/<li[^>]*class="[^"]*\bhidden\b/);
    expect(levelLiMatch![0]).toMatch(
      /<span[^>]*class="[^"]*hidden sm:inline[^"]*"[^>]*><svg[^>]*>[\s\S]*?<\/svg><\/span>/
    );

    const storyLiMatch = html.match(
      /<li\b[^>]*>(?:(?!<\/li>)[\s\S])*?عُصْفُورُ سَامِي(?:(?!<\/li>)[\s\S])*?<\/li>/
    );
    expect(storyLiMatch).not.toBeNull();
    expect(storyLiMatch![0]).not.toMatch(/<li[^>]*class="[^"]*\bhidden\b/);

    // Eastern Arabic numerals check
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });

  it('applies "hidden sm:inline" to the Transfer Test banner description span while keeping the badge visible', async () => {
    const pageComponent = await StoryCycleRunnerPage({
      params: Promise.resolve({ levelId: "level-1", storyId: "6" }),
    });
    const html = renderToString(pageComponent);

    // Badge remains visible on mobile
    expect(html).toMatch(
      /<span\b[^>]*class="(?![^"]*\bhidden\b)[^"]*"[^>]*>(?:(?!<\/span>)[\s\S])*?🎯 اختبار النقل(?:(?!<\/span>)[\s\S])*?<\/span>/
    );

    // Description span carries hidden sm:inline
    expect(html).toMatch(
      /<span\b[^>]*class="[^"]*hidden sm:inline[^"]*"[^>]*>(?:(?!<\/span>)[\s\S])*?قياس الأداء المستقل: يُقرأ النص دون مساعدات(?:(?!<\/span>)[\s\S])*?<\/span>/
    );

    // Eastern Arabic numerals check
    expect(findWesternNumeralsInRenderedHtml(html)).toEqual([]);
  });
});
