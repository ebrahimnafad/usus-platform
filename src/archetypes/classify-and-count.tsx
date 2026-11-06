import React from "react";
import { registerExerciseArchetype } from "@/archetypes/registry";
import type {
  ColorThemeId,
  Exercise,
  GenericArchetypeData,
  Shape2DId,
  Solid3DId,
  VisualModelSpec,
  VisualSize,
} from "@/domain/types";
import {
  SHAPE_2D_CATALOG,
  SOLID_3D_CATALOG,
  createShape2DSpec,
  createSolid3DSpec,
  getShape2DById,
  getSolid3DById,
} from "@/visual-models/shapes-solids-coins";
import { VisualModelView } from "@/visual-models/registry";
import {
  type ArchetypeGeneratorContext,
  type ArchetypeRenderProps,
} from "@/archetypes/registry";
import { formatEasternNumber, toEasternArabicNumerals } from "@/lib/numerals";
import { AnswerLine, AnswerSlot } from "@/components/worksheet/AnswerSlot";
import { ExerciseColumns } from "@/components/worksheet/ExerciseColumns";

export type ClassifyDomainMode =
  "shapes-2d" | "solids-3d" | "mixed-shapes-solids";

export type ClassifyVariationMode =
  "color-group" | "vary-size" | "vary-orientation";

export interface ClassifyAndCountBlueprintParams {
  domainMode?: ClassifyDomainMode;
  variationMode?: ClassifyVariationMode;
  groupCount?: number;
  partCountRange?: [number, number];
  candidateShapeIds?: Shape2DId[];
  candidateSolidIds?: Solid3DId[];
  comparisonPromptAr?: string;
  comparisonAnswerAr?: string;
}

export interface ClassifyAndCountGroup {
  groupId: string;
  labelAr: string;
  colorTheme: ColorThemeId;
  count: number;
  sampleModel: VisualModelSpec;
  attributeNoteAr: string;
}

export interface ClassifyAndCountItem {
  id: string;
  groupId: string;
  groupLabelAr: string;
  isTargetGroup: boolean;
  model: VisualModelSpec;
}

export interface ClassifyAndCountData extends GenericArchetypeData {
  kind: "ClassifyAndCount";
  domainMode: ClassifyDomainMode;
  variationMode: ClassifyVariationMode;
  targetGroupId: string;
  targetGroupLabelAr: string;
  groups: ClassifyAndCountGroup[];
  items: ClassifyAndCountItem[];
  totalCount: number;
  comparisonPromptAr: string;
  comparisonAnswerAr: string;
}

const GROUP_COLOR_THEMES: ColorThemeId[] = [
  "coral",
  "sky",
  "emerald",
  "amber",
  "violet",
  "rose",
  "teal",
];

const GROUP_RING_STYLES: Record<
  ColorThemeId,
  { border: string; bg: string; badge: string }
> = {
  coral: {
    border: "border-red-500",
    bg: "bg-red-50/80",
    badge: "bg-red-600 text-white",
  },
  amber: {
    border: "border-amber-500",
    bg: "bg-amber-50/80",
    badge: "bg-amber-600 text-white",
  },
  emerald: {
    border: "border-emerald-500",
    bg: "bg-emerald-50/80",
    badge: "bg-emerald-600 text-white",
  },
  sky: {
    border: "border-sky-500",
    bg: "bg-sky-50/80",
    badge: "bg-sky-600 text-white",
  },
  violet: {
    border: "border-violet-500",
    bg: "bg-violet-50/80",
    badge: "bg-violet-600 text-white",
  },
  rose: {
    border: "border-rose-500",
    bg: "bg-rose-50/80",
    badge: "bg-rose-600 text-white",
  },
  teal: {
    border: "border-teal-500",
    bg: "bg-teal-50/80",
    badge: "bg-teal-600 text-white",
  },
  indigo: {
    border: "border-indigo-500",
    bg: "bg-indigo-50/80",
    badge: "bg-indigo-600 text-white",
  },
};

const SIZES_CYCLE: VisualSize[] = ["small", "large", "medium"];
const ROTATION_ANGLES_CYCLE: number[] = [45, 180, 90, 0, 135, 225];

function generateClassifyAndCountExercise(
  ctx: ArchetypeGeneratorContext
): Exercise {
  const params = (ctx.spec.params ?? {}) as ClassifyAndCountBlueprintParams;
  const domainMode: ClassifyDomainMode = params.domainMode ?? "shapes-2d";
  const variationMode: ClassifyVariationMode =
    params.variationMode ?? "color-group";

  const defaultGroupCount = ctx.difficultyLevel === "Advanced" ? 3 : 2;
  const groupCount = params.groupCount ?? defaultGroupCount;

  const [minPart, maxPart] =
    params.partCountRange ??
    (ctx.difficultyLevel === "Easy"
      ? [2, 3]
      : ctx.difficultyLevel === "Intermediate"
        ? [2, 3]
        : [2, 3]);

  // Build candidate category descriptors
  interface CategoryDescriptor {
    groupId: string;
    labelAr: string;
    attributeNoteAr: string;
    buildSpec: (overrides: Partial<VisualModelSpec>) => VisualModelSpec;
  }

  const shapeIds =
    params.candidateShapeIds && params.candidateShapeIds.length > 0
      ? params.candidateShapeIds
      : SHAPE_2D_CATALOG.map((s) => s.id);

  // Exclude circle when testing orientation rotation so rotation is visually unmistakable
  const filteredShapeIds =
    variationMode === "vary-orientation"
      ? shapeIds.filter((id) => id !== "circle")
      : shapeIds;

  const solidIds =
    params.candidateSolidIds && params.candidateSolidIds.length > 0
      ? params.candidateSolidIds
      : SOLID_3D_CATALOG.map((s) => s.id);

  const filteredSolidIds =
    variationMode === "vary-orientation"
      ? solidIds.filter((id) => id !== "sphere")
      : solidIds;

  const shapeDescriptors: CategoryDescriptor[] = filteredShapeIds.map((id) => {
    const def = getShape2DById(id);
    return {
      groupId: `shape-${def.id}`,
      labelAr: def.labelAr,
      attributeNoteAr: def.attributeNoteAr,
      buildSpec: (overrides) => createShape2DSpec(def.id, overrides),
    };
  });

  const solidDescriptors: CategoryDescriptor[] = filteredSolidIds.map((id) => {
    const def = getSolid3DById(id);
    return {
      groupId: `solid-${def.id}`,
      labelAr: def.labelAr,
      attributeNoteAr: def.attributeNoteAr,
      buildSpec: (overrides) => createSolid3DSpec(def.id, overrides),
    };
  });

  let descriptorPool: CategoryDescriptor[] = [];
  if (domainMode === "shapes-2d") {
    descriptorPool = shapeDescriptors;
  } else if (domainMode === "solids-3d") {
    descriptorPool = solidDescriptors;
  } else {
    descriptorPool = [...shapeDescriptors, ...solidDescriptors];
  }

  const selectedDescriptors = ctx.rng.pickN(descriptorPool, groupCount);
  const pickedThemes = ctx.rng.pickN(
    GROUP_COLOR_THEMES,
    selectedDescriptors.length
  );

  const safePartMax =
    groupCount >= 3 ? Math.min(maxPart, 2) : Math.min(maxPart, 3);
  const safePartMin = Math.min(minPart, safePartMax);
  // Generate distinct part counts when possible so "which part has more/fewer?" has a clear winner
  const partCounts: number[] = [];
  for (let idx = 0; idx < selectedDescriptors.length; idx++) {
    const raw = ctx.rng.int(safePartMin, safePartMax);
    if (idx === 1 && raw === partCounts[0]) {
      partCounts.push(raw < safePartMax ? raw + 1 : Math.max(1, raw - 1));
    } else {
      partCounts.push(raw);
    }
  }

  const groups: ClassifyAndCountGroup[] = selectedDescriptors.map(
    (desc, gIdx) => {
      const colorTheme = pickedThemes[gIdx % pickedThemes.length];
      return {
        groupId: desc.groupId,
        labelAr: desc.labelAr,
        colorTheme,
        count: partCounts[gIdx],
        sampleModel: desc.buildSpec({
          colorTheme,
          size: "small",
          rotationDeg: 0,
        }),
        attributeNoteAr: desc.attributeNoteAr,
      };
    }
  );

  const targetGroup = groups[0];
  const unshuffledItems: ClassifyAndCountItem[] = [];
  let runningIdx = 0;

  selectedDescriptors.forEach((desc, gIdx) => {
    const group = groups[gIdx];
    for (let i = 0; i < group.count; i++) {
      const size: VisualSize =
        variationMode === "vary-size"
          ? SIZES_CYCLE[(runningIdx + i) % SIZES_CYCLE.length]
          : "medium";

      const rotationDeg: number =
        variationMode === "vary-orientation"
          ? ROTATION_ANGLES_CYCLE[
              (runningIdx + i) % ROTATION_ANGLES_CYCLE.length
            ]
          : 0;

      // In vary-size or vary-orientation, also vary color slightly or keep vibrant palette
      const itemColorTheme: ColorThemeId =
        variationMode === "color-group"
          ? group.colorTheme
          : GROUP_COLOR_THEMES[(gIdx + i) % GROUP_COLOR_THEMES.length];

      const sizeLabelAr =
        variationMode === "vary-size"
          ? size === "small"
            ? " (صغير)"
            : size === "large"
              ? " (كبير)"
              : " (متوسط)"
          : "";

      const rotationLabelAr =
        variationMode === "vary-orientation" && rotationDeg !== 0
          ? ` (مدوّر ${formatEasternNumber(rotationDeg)}°)`
          : "";

      const model = desc.buildSpec({
        colorTheme: itemColorTheme,
        size,
        rotationDeg,
        labelAr: `${desc.labelAr}${sizeLabelAr}${rotationLabelAr}`,
      });

      unshuffledItems.push({
        id: `item-${runningIdx + 1}-${group.groupId}`,
        groupId: group.groupId,
        groupLabelAr: group.labelAr,
        isTargetGroup: group.groupId === targetGroup.groupId,
        model,
      });
      runningIdx += 1;
    }
  });

  const items = ctx.rng.shuffle(unshuffledItems);
  const totalCount = items.length;

  // Determine largest and smallest part for comparison
  const sortedByCountDesc = [...groups].sort((a, b) => b.count - a.count);
  const largestGroup = sortedByCountDesc[0];
  const smallestGroup = sortedByCountDesc[sortedByCountDesc.length - 1];

  const defaultComparisonPromptAr =
    variationMode === "vary-size"
      ? `هل يتغيّر نوع الشكل «${targetGroup.labelAr}» عندما يكون كبيراً أو صغيراً؟ وهل الكل (${formatEasternNumber(
          totalCount
        )}) أكبر من كل جزء؟`
      : variationMode === "vary-orientation"
        ? `هل يتغيّر نوع «${targetGroup.labelAr}» عندما نقوم بتدويره أو قلبه؟ وأي جزء عدده أكبر؟`
        : `أي جزء يحتوي على عناصر أكثر؟ وأي جزء يحتوي على عناصر أقل؟ وهل الكلّ (${formatEasternNumber(
            totalCount
          )}) أكبر من كل جزء؟`;

  const defaultComparisonAnswerAr =
    variationMode === "vary-size"
      ? `لا يتغيّر نوع «${targetGroup.labelAr}» بتغيّر الحجم؛ والكل (${formatEasternNumber(
          totalCount
        )}) أكبر من كل جزء (${groups
          .map((g) => `${g.labelAr}: ${formatEasternNumber(g.count)}`)
          .join("، ")})`
      : variationMode === "vary-orientation"
        ? `لا يتغيّر نوع «${targetGroup.labelAr}» عند تدويره؛ والجزء الأكبر هو «${
            largestGroup.labelAr
          }» (${formatEasternNumber(largestGroup.count)}) والكل يساوي ${formatEasternNumber(
            totalCount
          )}`
        : `الأكثر: «${largestGroup.labelAr}» (${formatEasternNumber(
            largestGroup.count
          )})، والأقل: «${smallestGroup.labelAr}» (${formatEasternNumber(
            smallestGroup.count
          )})، ونعم الكل (${formatEasternNumber(totalCount)}) أكبر من كل جزء بمفرده`;

  const defaultPromptAr =
    variationMode === "vary-size"
      ? `صنّف وحوّط جميع أشكال «${targetGroup.labelAr}» مهما اختلف حجمها (صغير، متوسط، كبير)، ثم عدّ كل جزء واكتب الكلّ:`
      : variationMode === "vary-orientation"
        ? `صنّف وحوّط جميع أشكال «${targetGroup.labelAr}» حتى لو كانت مدوّرة أو مقلوبة، ثم عدّ كل جزء واكتب الكلّ:`
        : `صنّف الأشكال في مجموعات متماثلة، وحوّط مجموعة «${targetGroup.labelAr}»، ثم اكتب عدد كل جزء والكلّ:`;

  const defaultStrategyHintAr =
    variationMode === "vary-size"
      ? `الحجم صفة غير محدِّدة للشكل؛ ركّز على عدد الأضلاع والزوايا أو الأوجه لتجد كل «${
          targetGroup.labelAr
        }» (${formatEasternNumber(
          targetGroup.count
        )}) ثم اجمع الأجزاء معاً لتحصل على الكل (${formatEasternNumber(totalCount)}).`
      : variationMode === "vary-orientation"
        ? `الاتجاه والدوران لا يغيّران ماهية الشكل الهندسي؛ ابحث عن «${
            targetGroup.labelAr
          }» في كل الاتجاهات (${formatEasternNumber(
            targetGroup.count
          )}) ثم قارن الأجزاء بالكل (${formatEasternNumber(totalCount)}).`
        : `افرز العناصر المتماثلة في النوع واللون إلى أجزاء (${groups
            .map((g) => `${g.labelAr}: ${formatEasternNumber(g.count)}`)
            .join(
              "، "
            )})؛ تذكّر أن الأجزاء معاً تكوّن الكل (${formatEasternNumber(
            totalCount
          )}).`;

  const data: ClassifyAndCountData = {
    kind: "ClassifyAndCount",
    domainMode,
    variationMode,
    targetGroupId: targetGroup.groupId,
    targetGroupLabelAr: targetGroup.labelAr,
    groups,
    items,
    totalCount,
    comparisonPromptAr: params.comparisonPromptAr ?? defaultComparisonPromptAr,
    comparisonAnswerAr: params.comparisonAnswerAr ?? defaultComparisonAnswerAr,
  };

  return {
    id: `${ctx.lesson.id}-${ctx.sectionId}-ex-${ctx.exerciseNumber}`,
    exerciseNumber: ctx.exerciseNumber,
    sectionId: ctx.sectionId,
    archetype: "ClassifyAndCount",
    difficultyLevel: ctx.difficultyLevel,
    sourceLessonId: ctx.sourceLessonId,
    titleAr: "صنّف وحوّط وعدّ (الأجزاء والكل)",
    promptAr: ctx.spec.promptAr ?? defaultPromptAr,
    strategyHintAr: ctx.spec.strategyHintAr ?? defaultStrategyHintAr,
    visualModels: items.map((item) => item.model),
    data,
  };
}

function renderClassifyAndCountExercise({
  exercise,
  mode,
}: ArchetypeRenderProps): React.ReactElement {
  const data = exercise.data as ClassifyAndCountData;
  const isAnswerKey = mode === "answer-key";

  return (
    <div className="space-y-0.5" data-archetype="ClassifyAndCount">
      <ExerciseColumns columns={1}>
        {/* Mixed Sorting Tray */}
        <div className="rounded-xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/40 p-1">
          <div className="mb-0.5 flex items-center justify-between text-[13px] font-extrabold leading-none text-slate-700">
            <span>
              🎯 المطلوب تحويطه وتصنيفه:{" "}
              <strong className="text-indigo-900">
                {toEasternArabicNumerals(data.targetGroupLabelAr)}
              </strong>
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              إجمالي العناصر: {formatEasternNumber(data.totalCount)}
            </span>
          </div>

          <div className="grid grid-cols-6 gap-1">
            {data.items.map((item, idx) => {
              const group =
                data.groups.find((g) => g.groupId === item.groupId) ??
                data.groups[0];
              const ringStyle =
                GROUP_RING_STYLES[group.colorTheme] ?? GROUP_RING_STYLES.sky;
              const groupIndex =
                data.groups.findIndex((g) => g.groupId === item.groupId) + 1;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col items-center justify-center rounded-xl border p-0.5 transition ${
                    isAnswerKey
                      ? `${ringStyle.border} ${ringStyle.bg} shadow-xs`
                      : "border-dashed border-slate-300 bg-white"
                  }`}
                  data-sort-item-id={toEasternArabicNumerals(item.id)}
                  {...(isAnswerKey
                    ? {
                        "data-solved-sorted-group": toEasternArabicNumerals(
                          item.groupId
                        ),
                        "data-solved-circled": item.isTargetGroup
                          ? "true"
                          : "false",
                      }
                    : {})}
                >
                  <div className="flex w-full items-center justify-between text-xs font-bold leading-none">
                    <span className="text-slate-400">
                      {formatEasternNumber(idx + 1)}
                    </span>
                    {isAnswerKey && (
                      <span
                        className={`rounded-full px-1 py-0.5 font-extrabold ${ringStyle.badge}`}
                      >
                        {item.isTargetGroup
                          ? `✓ ج${formatEasternNumber(groupIndex)}`
                          : `ج${formatEasternNumber(groupIndex)}`}
                      </span>
                    )}
                  </div>

                  <VisualModelView model={item.model} solved={isAnswerKey} />
                </div>
              );
            })}
          </div>
        </div>
      </ExerciseColumns>

      {/* Part-Whole (الأجزاء والكل) Count Bar */}
      <ExerciseColumns columns={3}>
        {data.groups.map((group, idx) => {
          const ringStyle =
            GROUP_RING_STYLES[group.colorTheme] ?? GROUP_RING_STYLES.sky;
          return (
            <div
              key={group.groupId}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-2 py-0.5 shadow-2xs"
            >
              <div className="flex items-center gap-1">
                <VisualModelView
                  model={group.sampleModel}
                  solved={isAnswerKey}
                />
                <div>
                  <div className="text-xs font-extrabold leading-none text-slate-500">
                    الجزء {formatEasternNumber(idx + 1)}
                  </div>
                  <div className="text-[13px] font-extrabold leading-tight text-slate-900">
                    {toEasternArabicNumerals(group.labelAr)}
                  </div>
                </div>
              </div>

              <AnswerSlot
                solved={isAnswerKey}
                answer={formatEasternNumber(group.count)}
                ariaLabel="مربع كتابة عدد الجزء"
                tone="indigo"
                solvedClassName={ringStyle.badge}
                solvedDataAttributes={{
                  "data-solved-part-count": formatEasternNumber(group.count),
                }}
              />
            </div>
          );
        })}

        {/* Total / Whole Box */}
        <div className="flex items-center justify-between rounded-xl border border-indigo-300 bg-indigo-100/70 px-2 py-0.5">
          <div>
            <div className="text-xs font-extrabold leading-none text-indigo-800">
              الكلّ
            </div>
            <div className="text-[13px] font-black leading-tight text-indigo-950">
              جميع العناصر
            </div>
          </div>

          <AnswerSlot
            solved={isAnswerKey}
            answer={formatEasternNumber(data.totalCount)}
            ariaLabel="مربع كتابة الكلّ"
            tone="indigo"
            solvedDataAttributes={{
              "data-solved-total-count": formatEasternNumber(data.totalCount),
            }}
          />
        </div>
      </ExerciseColumns>

      {/* Part-Whole & Attribute Reasoning Prompt */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-300 bg-amber-50/80 px-2 py-0.5 text-[13px] font-bold leading-tight text-amber-950">
        <span>
          🤔 سؤال التفكير (الأجزاء والكل):{" "}
          {toEasternArabicNumerals(data.comparisonPromptAr)}
        </span>
        <AnswerLine
          solved={isAnswerKey}
          answer={toEasternArabicNumerals(data.comparisonAnswerAr)}
          ariaLabel="سطر كتابة إجابة سؤال التفكير"
        />
      </div>
    </div>
  );
}

export const classifyAndCountArchetype = {
  id: "ClassifyAndCount" as const,
  displayNameAr: "صنّف وحوّط وعدّ",
  generate: generateClassifyAndCountExercise,
  render: renderClassifyAndCountExercise,
};

registerExerciseArchetype(classifyAndCountArchetype);
