import React from "react";
import Link from "next/link";
import { getReadingLevel, getReadingStory } from "@/curriculum/reading-catalog";
import StoryCycleRunnerClient from "@/components/reading/StoryCycleRunnerClient";

interface Props {
  params: Promise<{
    levelId: string;
    storyId: string;
  }>;
}

export default async function StoryCycleRunnerPage({ params }: Props) {
  const { levelId, storyId } = await params;
  const level = getReadingLevel(levelId);
  const story = getReadingStory(levelId, storyId);

  if (!level || !story) {
    return (
      <div
        className="home-sky-bg min-h-screen flex items-center justify-center p-6"
        dir="rtl"
      >
        <div className="bg-white rounded-[32px] p-8 max-w-md w-full text-center border border-white/80 shadow-[0_24px_48px_-24px_rgba(30,60,100,0.25)]">
          <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-black">
            !
          </div>
          <h1 className="text-xl font-extrabold text-slate-800 mb-2">
            القصة غير موجودة
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            تعذّر العثور على القصة المطلوبة في هذا المستوى القرائي.
          </p>
          <Link
            href={`/reading/level/${levelId}`}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-emerald-600 text-white font-extrabold text-sm hover:bg-emerald-700 transition"
          >
            ← العودة لقصص المستوى
          </Link>
        </div>
      </div>
    );
  }

  return <StoryCycleRunnerClient level={level} story={story} />;
}
