import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { getReadingLevel } from "@/curriculum/reading-catalog";
import PrintableReadingSheet, {
  type ReadingPrintViewMode,
} from "@/components/reading/PrintableReadingSheet";
import { toEasternArabicNumerals } from "@/lib/numerals";
import {
  getDefaultTashkeelMode,
  type TashkeelMode,
} from "@/lib/reading-scaffold";
import {
  wrapPrintSheetsHtml,
  type ReadingPrintScope,
  type ReadingPrintViewOption,
} from "@/lib/print-html-iframe";

export const runtime = "nodejs";
export type { ReadingPrintScope, ReadingPrintViewOption };

function resolveTashkeelMode(
  raw: string | null,
  levelNumber?: number
): TashkeelMode {
  if (raw === "full" || raw === "partial" || raw === "none") return raw;
  return getDefaultTashkeelMode(levelNumber);
}

function resolveViewOption(raw: string | null): ReadingPrintViewOption {
  if (raw === "answer-key" || raw === "both") return raw;
  return "student";
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { searchParams } = request.nextUrl;

  const levelId = searchParams.get("level") ?? "level-1";
  const level = getReadingLevel(levelId);
  if (!level) {
    return NextResponse.json(
      { error: "Reading level not found" },
      { status: 404 }
    );
  }

  const storyParam = Number(searchParams.get("story") ?? "1");
  const currentStory =
    level.stories.find((s) => s.storyNumber === storyParam) ?? level.stories[0];

  const scope: ReadingPrintScope =
    searchParams.get("scope") === "level" ? "level" : "story";
  const viewOption = resolveViewOption(searchParams.get("viewOption"));
  const tashkeelMode = resolveTashkeelMode(
    searchParams.get("tashkeel"),
    level.levelNumber
  );
  const includeStoryText = searchParams.get("includeStoryText") !== "false";
  const qrOrigin = request.nextUrl.origin;

  const targetStories = scope === "level" ? level.stories : [currentStory];
  const baseViews: ReadingPrintViewMode[] =
    viewOption === "both"
      ? ["student", "answer-key"]
      : viewOption === "answer-key"
        ? ["answer-key"]
        : ["student"];

  const htmlSheets: string[] = [];

  for (const story of targetStories) {
    const viewsForStory =
      story.type === "free_reading" && scope === "level"
        ? baseViews.filter((v) => v !== "answer-key")
        : baseViews;

    for (const viewMode of viewsForStory) {
      const markup = renderToStaticMarkup(
        React.createElement(PrintableReadingSheet, {
          level,
          story,
          tashkeelMode,
          includeStoryText,
          viewMode,
          qrOrigin,
          alwaysVisible: true,
        })
      );
      htmlSheets.push(markup);
    }
  }

  const storyNumAr = toEasternArabicNumerals(currentStory.storyNumber);
  const title =
    scope === "level"
      ? `${level.titleAr} – كافة القصص`
      : `${level.titleAr} – القصة ${storyNumAr}: ${currentStory.titleAr ?? currentStory.title}`;

  return NextResponse.json({
    html: wrapPrintSheetsHtml(htmlSheets),
    storyCount: targetStories.length,
    title,
  });
}
