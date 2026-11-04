import React, { Suspense } from "react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getCurriculumCatalog } from "@/curriculum/catalog";
import { normalizeGradeId } from "@/config/grades";
import { VALID_GRADES } from "@/lib/studio-state";
import { StudioShell } from "@/components/studio/StudioShell";
import { StudioRoutePanel } from "@/components/studio/StudioRoutePanel";

export default async function GradeStudioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ gradeId: string }>;
}): Promise<React.ReactElement> {
  const { gradeId: rawGradeId } = await params;
  const normalizedGradeId = normalizeGradeId(rawGradeId);

  if (!VALID_GRADES.includes(normalizedGradeId)) {
    notFound();
  }

  const grade = getCurriculumCatalog().grades[normalizedGradeId];
  const cookieStore = await cookies();
  const railCollapsed = cookieStore.get("studio_rail")?.value === "1";

  return (
    <StudioShell
      grade={grade}
      panel={
        <Suspense fallback={null}>
          <StudioRoutePanel
            grade={grade}
            initialRailCollapsed={railCollapsed}
          />
        </Suspense>
      }
    >
      {children}
    </StudioShell>
  );
}
