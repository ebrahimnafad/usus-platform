import React from "react";
import { notFound } from "next/navigation";
import { getReadingLevel } from "@/curriculum/reading-catalog";
import { ReadingQuickViewClient } from "@/components/reading/ReadingQuickViewClient";
import type { QuickViewTarget } from "@/lib/qr";
import type { TashkeelMode } from "@/lib/reading-scaffold";

export const dynamic = "force-dynamic";

interface ReadingQuickViewPageProps {
  params: Promise<{ levelId: string }>;
  searchParams: Promise<{
    story?: string;
    tashkeel?: string;
    view?: string;
  }>;
}

function resolveTashkeel(raw?: string): TashkeelMode {
  if (raw === "partial" || raw === "none") return raw;
  return "full";
}

export default async function ReadingQuickViewPage({
  params,
  searchParams,
}: ReadingQuickViewPageProps): Promise<React.ReactElement> {
  const { levelId } = await params;
  const sp = await searchParams;

  const level = getReadingLevel(levelId);
  if (!level) {
    notFound();
  }

  const storyNumber = Number(sp.story ?? "1");
  const story =
    level.stories.find((s) => s.storyNumber === storyNumber) ??
    level.stories[0];
  const initialView: QuickViewTarget =
    sp.view === "teacher-notes" ? "teacher-notes" : "answer-key";

  return (
    <ReadingQuickViewClient
      level={level}
      story={story}
      initialView={initialView}
      tashkeelMode={resolveTashkeel(sp.tashkeel)}
    />
  );
}
