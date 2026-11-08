import type { ArchetypeGeneratorContext } from "@/archetypes/registry";
import type {
  ColorThemeId,
  DifficultyLevel,
  EverydayObjectId,
  GenericArchetypeData,
  VisualModelSpec,
} from "@/domain/types";
import { formatEasternNumber } from "@/lib/numerals";
import {
  COLOR_PAIRS,
  selectAdditionFacts,
  type AdditionFact,
} from "@/lib/part-whole-facts";
import type { SeededRandom } from "@/lib/seed";
import {
  createEverydayObjectSpec,
  getEverydayObjectById,
} from "@/visual-models/everyday-objects";
import {
  createFiveFrameSpec,
  createSnapCubesSpec,
} from "@/visual-models/unit-2-models";
import {
  createEquationStripSpec,
  createNumberBondSpec,
  type BondMissingPosition,
} from "@/visual-models/unit-3-models";

export type WordProblemSituation =
  "add-to" | "put-together" | "take-from" | "take-apart";

export type WordProblemStyle = "learning" | "story";

export type WordProblemResponseForm =
  "model-and-bond" | "story-and-slot" | "equation" | "cloze-from-model";

export type WordProblemRepresentation =
  "snap-cubes" | "five-frame" | "everyday-object";

export type WordProblemAction = "trace" | "write";

export interface SolveWordProblemBlueprintParams {
  situation?: WordProblemSituation;
  problemStyle?: WordProblemStyle;
  responseForm?: WordProblemResponseForm;
  representation?: WordProblemRepresentation;
  allowedRepresentations?: WordProblemRepresentation[];
  action?: WordProblemAction;
  showModel?: boolean;
  clozeIncludeEquation?: boolean;
  unknownPosition?: "total" | "part2" | "part1";
  totalRange?: [number, number];
  minPart?: number;
  itemCount?: number;
}

export interface SolveWordProblemItem {
  id: string;
  itemIndex: number;
  situation: WordProblemSituation;
  problemStyle: WordProblemStyle;
  representation: WordProblemRepresentation;
  part1: number;
  part2: number;
  total: number;
  part1Ar: string;
  part2Ar: string;
  totalAr: string;
  factKey: string;
  objectId: EverydayObjectId;
  problemTextAr: string;
  questionLabelAr: string;
  clozeLeadAr: string;
  clozeMiddleAr: string;
  clozeTrailAr: string;
  showModel: boolean;
  unknownPosition: BondMissingPosition;
  tracePositions: Array<"total" | "part1" | "part2">;
  representationModel?: VisualModelSpec;
  bondModel?: VisualModelSpec;
  equationModel?: VisualModelSpec;
}

export interface SolveWordProblemData extends GenericArchetypeData {
  kind: "SolveWordProblem";
  situation: WordProblemSituation;
  problemStyle: WordProblemStyle;
  responseForm: WordProblemResponseForm;
  action: WordProblemAction;
  clozeIncludeEquation: boolean;
  items: SolveWordProblemItem[];
}

export interface SolveWordProblemPayload {
  data: SolveWordProblemData;
  visualModels: VisualModelSpec[];
  defaultPromptAr: string;
  defaultStrategyHintAr: string;
}

export interface WordProblemStoryScene {
  id: string;
  objectId: EverydayObjectId;
  questionLabelAr: "كم في الكلّ؟" | "كم أصبح الآن؟";
  buildStoryAr: (p1Ar: string, p2Ar: string) => string;
  clozeLeadAr: string;
  clozeMiddleAr: string;
  clozeTrailAr: string;
}

export type AddToStoryScene = WordProblemStoryScene;

export const ADD_TO_STORY_SCENES: AddToStoryScene[] = [
  {
    id: "apples-basket",
    objectId: "apple",
    questionLabelAr: "كم أصبح الآن؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `مع سارة ${p1Ar} تفّاحات، أعطاها أخوها ${p2Ar} تفّاحات أخرى. كم تفّاحة مع سارة الآن؟`,
    clozeLeadAr: "مع سارة",
    clozeMiddleAr: "تفّاحات، أضافت إليها",
    clozeTrailAr: "تفّاحات أخرى.",
  },
  {
    id: "birds-branch",
    objectId: "bird",
    questionLabelAr: "كم أصبح الآن؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `على الغصن ${p1Ar} عصافير، انضمّ إليها ${p2Ar} عصافير أخرى. كم عصفوراً أصبح على الغصن الآن؟`,
    clozeLeadAr: "على الغصن",
    clozeMiddleAr: "عصافير، انضمّ إليها",
    clozeTrailAr: "عصافير أخرى.",
  },
  {
    id: "books-shelf",
    objectId: "book",
    questionLabelAr: "كم في الكلّ؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `على الرفّ ${p1Ar} كتب، وضع عمر ${p2Ar} كتب أخرى. كم كتاباً في الكلّ؟`,
    clozeLeadAr: "على الرفّ",
    clozeMiddleAr: "كتب، وضع عمر",
    clozeTrailAr: "كتب أخرى.",
  },
  {
    id: "cars-track",
    objectId: "car",
    questionLabelAr: "كم أصبح الآن؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `مع رامي ${p1Ar} سيّارات، اشترى ${p2Ar} سيّارات جديدة. كم سيّارة أصبح معه الآن؟`,
    clozeLeadAr: "مع رامي",
    clozeMiddleAr: "سيّارات، أضاف إليها",
    clozeTrailAr: "سيّارات جديدة.",
  },
  {
    id: "flowers-garden",
    objectId: "flower",
    questionLabelAr: "كم في الكلّ؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `في الحديقة ${p1Ar} زهرات، تفتّحت ${p2Ar} زهرات أخرى. كم زهرة في الكلّ؟`,
    clozeLeadAr: "في الحديقة",
    clozeMiddleAr: "زهرات، تفتّحت",
    clozeTrailAr: "زهرات أخرى.",
  },
  {
    id: "stars-board",
    objectId: "star",
    questionLabelAr: "كم أصبح الآن؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `مع ليلى ${p1Ar} نجمات، نالت ${p2Ar} نجمات إضافية. كم نجمة أصبح معها الآن؟`,
    clozeLeadAr: "مع ليلى",
    clozeMiddleAr: "نجمات، نالت",
    clozeTrailAr: "نجمات إضافية.",
  },
  {
    id: "strawberries-plate",
    objectId: "strawberry",
    questionLabelAr: "كم في الكلّ؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `في الطبق ${p1Ar} حبّات فراولة، أضافت هند ${p2Ar} حبّات أخرى. كم حبّة فراولة في الكلّ؟`,
    clozeLeadAr: "في الطبق",
    clozeMiddleAr: "حبّات فراولة، أضافت هند",
    clozeTrailAr: "حبّات أخرى.",
  },
  {
    id: "pencils-case",
    objectId: "pencil",
    questionLabelAr: "كم أصبح الآن؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `في المقلمة ${p1Ar} أقلام، وضع خالد ${p2Ar} أقلام أخرى. كم قلماً في المقلمة الآن؟`,
    clozeLeadAr: "في المقلمة",
    clozeMiddleAr: "أقلام، وضع خالد",
    clozeTrailAr: "أقلام أخرى.",
  },
];

export const PUT_TOGETHER_STORY_SCENES: WordProblemStoryScene[] = [
  {
    id: "put-apples-bowl",
    objectId: "apple",
    questionLabelAr: "كم في الكلّ؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `في السلّة ${p1Ar} تفّاحات حمراء و${p2Ar} تفّاحات خضراء. كم تفّاحة في الكلّ؟`,
    clozeLeadAr: "في السلّة",
    clozeMiddleAr: "تفّاحات حمراء و",
    clozeTrailAr: "تفّاحات خضراء.",
  },
  {
    id: "put-birds-tree",
    objectId: "bird",
    questionLabelAr: "كم في الكلّ؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `على الشجرة ${p1Ar} عصافير فوق الغصن الأيمن و${p2Ar} عصافير فوق الغصن الأيسر. كم عصفوراً في الكلّ؟`,
    clozeLeadAr: "على الشجرة",
    clozeMiddleAr: "عصافير على اليمين و",
    clozeTrailAr: "عصافير على اليسار.",
  },
  {
    id: "put-books-table",
    objectId: "book",
    questionLabelAr: "كم في الكلّ؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `على الطاولة ${p1Ar} كتب كبيرة و${p2Ar} كتب صغيرة. كم كتاباً في الكلّ؟`,
    clozeLeadAr: "على الطاولة",
    clozeMiddleAr: "كتب كبيرة و",
    clozeTrailAr: "كتب صغيرة.",
  },
  {
    id: "put-cars-box",
    objectId: "car",
    questionLabelAr: "كم في الكلّ؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `في الصندوق ${p1Ar} سيّارات حمراء و${p2Ar} سيّارات زرقاء. كم سيّارة في الكلّ؟`,
    clozeLeadAr: "في الصندوق",
    clozeMiddleAr: "سيّارات حمراء و",
    clozeTrailAr: "سيّارات زرقاء.",
  },
  {
    id: "put-flowers-vase",
    objectId: "flower",
    questionLabelAr: "كم في الكلّ؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `في المزهرية ${p1Ar} زهرات صفراء و${p2Ar} زهرات وردية. كم زهرة في الكلّ؟`,
    clozeLeadAr: "في المزهرية",
    clozeMiddleAr: "زهرات صفراء و",
    clozeTrailAr: "زهرات وردية.",
  },
  {
    id: "put-stars-chart",
    objectId: "star",
    questionLabelAr: "كم في الكلّ؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `على اللوحة ${p1Ar} نجمات ذهبية و${p2Ar} نجمات فضّية. كم نجمة في الكلّ؟`,
    clozeLeadAr: "على اللوحة",
    clozeMiddleAr: "نجمات ذهبية و",
    clozeTrailAr: "نجمات فضّية.",
  },
  {
    id: "put-strawberries-dishes",
    objectId: "strawberry",
    questionLabelAr: "كم في الكلّ؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `مع منى ${p1Ar} حبّات فراولة ومع أخيها ${p2Ar} حبّات فراولة. كم حبّة فراولة معهما في الكلّ؟`,
    clozeLeadAr: "مع منى",
    clozeMiddleAr: "حبّات فراولة ومع أخيها",
    clozeTrailAr: "حبّات فراولة.",
  },
  {
    id: "put-pencils-cups",
    objectId: "pencil",
    questionLabelAr: "كم في الكلّ؟",
    buildStoryAr: (p1Ar, p2Ar) =>
      `في الكوب الأوّل ${p1Ar} أقلام وفي الكوب الثاني ${p2Ar} أقلام. كم قلماً في الكلّ؟`,
    clozeLeadAr: "في الكوب الأوّل",
    clozeMiddleAr: "أقلام وفي الكوب الثاني",
    clozeTrailAr: "أقلام.",
  },
];

const ADD_TO_LEARNING_TEMPLATES: Array<{
  buildTextAr: (p1Ar: string, p2Ar: string) => string;
  clozeLeadAr: string;
  clozeMiddleAr: string;
  clozeTrailAr: string;
}> = [
  {
    buildTextAr: (p1Ar, p2Ar) =>
      `لدينا ${p1Ar} مكعّبات، أضفنا إليها ${p2Ar} مكعّبات أخرى. كم مكعّباً في الكلّ؟`,
    clozeLeadAr: "لدينا",
    clozeMiddleAr: "مكعّبات، أضفنا إليها",
    clozeTrailAr: "مكعّبات أخرى.",
  },
  {
    buildTextAr: (p1Ar, p2Ar) =>
      `في الجزء الأوّل ${p1Ar} مكعّبات، انضمّ إليها ${p2Ar} مكعّبات في الجزء الثاني. كم مكعّباً في الكلّ؟`,
    clozeLeadAr: "في الجزء الأوّل",
    clozeMiddleAr: "مكعّبات، أضفنا إليها",
    clozeTrailAr: "مكعّبات.",
  },
  {
    buildTextAr: (p1Ar, p2Ar) =>
      `معنا ${p1Ar} مكعّبات، زدنا عليها ${p2Ar} مكعّبات أخرى. كم مكعّباً في الكلّ؟`,
    clozeLeadAr: "معنا",
    clozeMiddleAr: "مكعّبات، زدنا عليها",
    clozeTrailAr: "مكعّبات أخرى.",
  },
];

const PUT_TOGETHER_LEARNING_TEMPLATES: Array<{
  buildTextAr: (p1Ar: string, p2Ar: string) => string;
  clozeLeadAr: string;
  clozeMiddleAr: string;
  clozeTrailAr: string;
}> = [
  {
    buildTextAr: (p1Ar, p2Ar) =>
      `في الجزء الأوّل ${p1Ar} مكعّبات وفي الجزء الثاني ${p2Ar} مكعّبات. كم مكعّباً في الكلّ؟`,
    clozeLeadAr: "في الجزء الأوّل",
    clozeMiddleAr: "مكعّبات وفي الجزء الثاني",
    clozeTrailAr: "مكعّبات.",
  },
  {
    buildTextAr: (p1Ar, p2Ar) =>
      `لدينا ${p1Ar} مكعّبات في جزء و${p2Ar} مكعّبات في الجزء الآخر. كم مكعّباً في الكلّ؟`,
    clozeLeadAr: "لدينا",
    clozeMiddleAr: "مكعّبات في جزء و",
    clozeTrailAr: "مكعّبات في الجزء الآخر.",
  },
  {
    buildTextAr: (p1Ar, p2Ar) =>
      `معنا ${p1Ar} مكعّبات حمراء و${p2Ar} مكعّبات زرقاء نضمّها معاً. كم مكعّباً في الكلّ؟`,
    clozeLeadAr: "معنا",
    clozeMiddleAr: "مكعّبات حمراء و",
    clozeTrailAr: "مكعّبات زرقاء.",
  },
];

export function getStoryScenesForSituation(
  situation: WordProblemSituation
): WordProblemStoryScene[] {
  return situation === "put-together"
    ? PUT_TOGETHER_STORY_SCENES
    : ADD_TO_STORY_SCENES;
}

export function buildWordProblemText(params: {
  situation: WordProblemSituation;
  problemStyle: WordProblemStyle;
  part1: number;
  part2: number;
  templateIndex: number;
  scene?: WordProblemStoryScene;
}): {
  problemTextAr: string;
  questionLabelAr: "كم في الكلّ؟" | "كم أصبح الآن؟";
  clozeLeadAr: string;
  clozeMiddleAr: string;
  clozeTrailAr: string;
  objectId: EverydayObjectId;
} {
  const p1Ar = formatEasternNumber(params.part1);
  const p2Ar = formatEasternNumber(params.part2);

  if (params.problemStyle === "story") {
    const scenePool = getStoryScenesForSituation(params.situation);
    const scene =
      params.scene ?? scenePool[params.templateIndex % scenePool.length];
    return {
      problemTextAr: scene.buildStoryAr(p1Ar, p2Ar),
      questionLabelAr:
        params.situation === "put-together"
          ? "كم في الكلّ؟"
          : scene.questionLabelAr,
      clozeLeadAr: scene.clozeLeadAr,
      clozeMiddleAr: scene.clozeMiddleAr,
      clozeTrailAr: scene.clozeTrailAr,
      objectId: scene.objectId,
    };
  }

  const templatePool =
    params.situation === "put-together"
      ? PUT_TOGETHER_LEARNING_TEMPLATES
      : ADD_TO_LEARNING_TEMPLATES;
  const tpl = templatePool[params.templateIndex % templatePool.length];
  return {
    problemTextAr: tpl.buildTextAr(p1Ar, p2Ar),
    questionLabelAr: "كم في الكلّ؟",
    clozeLeadAr: tpl.clozeLeadAr,
    clozeMiddleAr: tpl.clozeMiddleAr,
    clozeTrailAr: tpl.clozeTrailAr,
    objectId: "apple",
  };
}

export function buildAddToWordProblemText(params: {
  problemStyle: WordProblemStyle;
  part1: number;
  part2: number;
  templateIndex: number;
  scene?: WordProblemStoryScene;
}) {
  return buildWordProblemText({ ...params, situation: "add-to" });
}

export function buildPutTogetherWordProblemText(params: {
  problemStyle: WordProblemStyle;
  part1: number;
  part2: number;
  templateIndex: number;
  scene?: WordProblemStoryScene;
}) {
  return buildWordProblemText({ ...params, situation: "put-together" });
}

function selectAddToFacts(
  rng: SeededRandom,
  difficultyLevel: DifficultyLevel,
  limits: {
    totalRange?: [number, number];
    minPart: number;
    count: number;
  },
  usedFacts?: Set<string>
): AdditionFact[] {
  // When minPart === 0 in Add-To, the starting Part (part1) is always >= 1
  // while the added change Part (part2) can be >= 0 (§6.3, spec §7).
  if (limits.minPart > 0) {
    return selectAdditionFacts(rng, difficultyLevel, limits, usedFacts);
  }

  const minTotal = Math.max(2, limits.totalRange ? limits.totalRange[0] : 2);
  const maxTotal = Math.max(
    minTotal,
    limits.totalRange
      ? limits.totalRange[1]
      : difficultyLevel === "Easy"
        ? 4
        : 5
  );

  const candidates: AdditionFact[] = [];
  for (let total = minTotal; total <= maxTotal; total++) {
    for (let part1 = 1; part1 <= total; part1++) {
      const part2 = total - part1;
      candidates.push({
        part1,
        part2,
        total,
        key: `${part1}+${part2}`,
      });
    }
  }

  const shuffled = rng.shuffle(candidates);
  const unused = shuffled.filter((f) => !usedFacts || !usedFacts.has(f.key));
  const used = shuffled.filter((f) =>
    Boolean(usedFacts && usedFacts.has(f.key))
  );
  const ordered = [...unused, ...used];

  const picked: AdditionFact[] = [];
  const seen = new Set<string>();
  for (const fact of ordered) {
    if (picked.length >= limits.count) break;
    if (seen.has(fact.key)) continue;
    seen.add(fact.key);
    picked.push(fact);
    usedFacts?.add(fact.key);
  }
  return picked;
}

function buildWordProblemConcreteModel(params: {
  representation: WordProblemRepresentation;
  objectId: EverydayObjectId;
  part1: number;
  part2: number;
  primaryTheme: ColorThemeId;
  secondaryTheme: ColorThemeId;
}): VisualModelSpec {
  const {
    representation,
    objectId,
    part1,
    part2,
    primaryTheme,
    secondaryTheme,
  } = params;
  const total = part1 + part2;
  const p1Ar = formatEasternNumber(part1);
  const p2Ar = formatEasternNumber(part2);
  const totalAr = formatEasternNumber(total);

  if (representation === "five-frame") {
    return createFiveFrameSpec({
      count: part1,
      secondaryCount: part2,
      colorTheme: primaryTheme,
      secondaryColorTheme: secondaryTheme,
      showPartOutline: true,
      highlightEmptySlots: true,
      labelAr: `لوحة الخمسة: ${p1Ar} و${p2Ar} يساوي ${totalAr}`,
    });
  }

  if (representation === "everyday-object") {
    const objDef = getEverydayObjectById(objectId);
    return createEverydayObjectSpec(objDef, {
      count: Math.max(1, part1),
      secondaryCount: part2,
      size: "small",
      labelAr: `${p1Ar} و${p2Ar} من ${objDef.labelAr} (الكلّ ${totalAr})`,
    });
  }

  return createSnapCubesSpec({
    count: Math.max(1, part1),
    secondaryCount: part2,
    separated: true,
    orientation: "horizontal",
    compact: true,
    colorTheme: primaryTheme,
    secondaryColorTheme: secondaryTheme,
    labelAr: `مكعّبات متداخلة: ${p1Ar} و${p2Ar} (الكلّ ${totalAr})`,
  });
}

export function buildSolveWordProblemPayload(
  ctx: ArchetypeGeneratorContext,
  rawParams?: SolveWordProblemBlueprintParams
): SolveWordProblemPayload {
  const params = rawParams ?? {};
  const situation: WordProblemSituation = params.situation ?? "add-to";
  const problemStyle: WordProblemStyle =
    params.problemStyle ??
    (ctx.lesson.lessonNumber >= 50 ? "story" : "learning");
  const responseForm: WordProblemResponseForm =
    params.responseForm ?? "model-and-bond";

  const defaultAction: WordProblemAction =
    ctx.difficultyLevel === "Easy" ? "trace" : "write";
  const action: WordProblemAction = params.action ?? defaultAction;

  const defaultRep: WordProblemRepresentation =
    problemStyle === "story" ? "everyday-object" : "snap-cubes";
  const representationPool: WordProblemRepresentation[] =
    params.allowedRepresentations && params.allowedRepresentations.length > 0
      ? params.allowedRepresentations
      : [params.representation ?? defaultRep];

  const itemCount =
    responseForm === "cloze-from-model"
      ? 1
      : Math.max(1, Math.min(2, params.itemCount ?? 2));

  // Concrete → Pictorial → Abstract model withdrawal in story-and-slot / equation (§6.2)
  const defaultShowModel =
    responseForm === "model-and-bond" || responseForm === "cloze-from-model"
      ? true
      : ctx.difficultyLevel === "Easy";
  const showModel = params.showModel ?? defaultShowModel;

  // Only five-frame or withdrawn-model items support 0 cleanly as the change Part in Add-To / Take-From (spec §7)
  const usesZeroCapableRep =
    !showModel || representationPool.every((r) => r === "five-frame");
  const allowsZeroChangePart =
    situation === "add-to" || situation === "take-from";
  const effectiveMinPart =
    params.minPart !== undefined
      ? params.minPart
      : ctx.difficultyLevel === "Advanced" &&
          usesZeroCapableRep &&
          allowsZeroChangePart
        ? 0
        : 1;

  const facts = selectAddToFacts(
    ctx.rng,
    ctx.difficultyLevel,
    {
      totalRange: params.totalRange,
      minPart: effectiveMinPart,
      count: itemCount,
    },
    ctx.usedFacts
  );

  const allowNonStandardUnknown =
    ctx.sectionId === "challenge" || ctx.difficultyLevel === "Advanced";
  const requestedUnknown = params.unknownPosition ?? "total";
  const resolvedUnknown: BondMissingPosition =
    requestedUnknown !== "total" && allowNonStandardUnknown
      ? requestedUnknown
      : "total";

  const clozeIncludeEquation =
    params.clozeIncludeEquation !== undefined
      ? Boolean(params.clozeIncludeEquation)
      : situation === "put-together" && responseForm === "cloze-from-model";

  const scenePool = getStoryScenesForSituation(situation);

  const pickedScenes: WordProblemStoryScene[] =
    problemStyle === "story" ? ctx.rng.pickN(scenePool, itemCount) : [];

  const items: SolveWordProblemItem[] = facts.map((fact, idx) => {
    const [primaryTheme, secondaryTheme] =
      COLOR_PAIRS[idx % COLOR_PAIRS.length];
    const itemRep = representationPool[idx % representationPool.length];
    const scene = pickedScenes[idx];

    const textBundle = buildWordProblemText({
      situation,
      problemStyle,
      part1: fact.part1,
      part2: fact.part2,
      templateIndex: idx,
      scene,
    });

    const tracePositions: Array<"total" | "part1" | "part2"> =
      action === "trace" ? ["part1", "part2"] : [];

    const unknownPosition: BondMissingPosition = resolvedUnknown;

    const representationModel = showModel
      ? buildWordProblemConcreteModel({
          representation: itemRep,
          objectId: textBundle.objectId,
          part1: fact.part1,
          part2: fact.part2,
          primaryTheme,
          secondaryTheme,
        })
      : undefined;

    const bondModel =
      responseForm === "model-and-bond"
        ? createNumberBondSpec({
            part1: fact.part1,
            part2: fact.part2,
            total: fact.total,
            missingPosition: unknownPosition,
            slotKind: "unknown",
            tracePositions,
            colorTheme: primaryTheme,
            secondaryColorTheme: secondaryTheme,
          })
        : undefined;

    const equationModel =
      responseForm === "equation" ||
      (responseForm === "cloze-from-model" && clozeIncludeEquation)
        ? createEquationStripSpec({
            operation: "add",
            part1: fact.part1,
            part2: fact.part2,
            total: fact.total,
            layout: "standard",
            missingPosition: unknownPosition,
            slotKind: "unknown",
            tracePositions:
              responseForm === "cloze-from-model" ? [] : tracePositions,
          })
        : undefined;

    return {
      id: `word-problem-item-${idx + 1}-${fact.key}`,
      itemIndex: idx,
      situation,
      problemStyle,
      representation: itemRep,
      part1: fact.part1,
      part2: fact.part2,
      total: fact.total,
      part1Ar: formatEasternNumber(fact.part1),
      part2Ar: formatEasternNumber(fact.part2),
      totalAr: formatEasternNumber(fact.total),
      factKey: fact.key,
      objectId: textBundle.objectId,
      problemTextAr: textBundle.problemTextAr,
      questionLabelAr: textBundle.questionLabelAr,
      clozeLeadAr: textBundle.clozeLeadAr,
      clozeMiddleAr: textBundle.clozeMiddleAr,
      clozeTrailAr: textBundle.clozeTrailAr,
      showModel,
      unknownPosition,
      tracePositions,
      representationModel,
      bondModel,
      equationModel,
    };
  });

  const visualModels: VisualModelSpec[] = [];
  for (const item of items) {
    if (item.representationModel) {
      visualModels.push(item.representationModel);
    }
    if (item.bondModel) {
      visualModels.push(item.bondModel);
    }
    if (item.equationModel) {
      visualModels.push(item.equationModel);
    }
  }

  const factsSummaryAr = items
    .map((it) => `${it.part1Ar} و${it.part2Ar} يساوي ${it.totalAr}`)
    .join("؛ ");

  const defaultPromptAr =
    responseForm === "cloze-from-model"
      ? problemStyle === "story"
        ? "انظر إلى النموذج لإكمال المسألة القصصية، ثم اجمع الجزأين لإيجاد الكلّ:"
        : "انظر إلى النموذج لكتابة المسألة، ثم اجمع الجزأين لإيجاد الكلّ:"
      : responseForm === "model-and-bond"
        ? problemStyle === "story"
          ? situation === "put-together"
            ? "اقرأ المسألة القصصية، ثم أكمل رابطة الأعداد واكتب كم في الكلّ:"
            : "اقرأ المسألة القصصية، ثم أكمل رابطة الأعداد واكتب كم أصبح الآن:"
          : "اقرأ المسألة وانظر إلى المكعّبات، ثم أكمل رابطة الأعداد واكتب الكلّ:"
        : "اقرأ المسألة، ثم اجمع الجزأين واكتب الكلّ في المربّع:";

  const defaultStrategyHintAr = `اقرأ المسألة لتحديد الجزء الأوّل والجزء الثاني، ثم اجمع الجزأين لإيجاد الكلّ (${factsSummaryAr}).`;

  const data: SolveWordProblemData = {
    kind: "SolveWordProblem",
    situation,
    problemStyle,
    responseForm,
    action,
    clozeIncludeEquation,
    items,
  };

  return {
    data,
    visualModels,
    defaultPromptAr,
    defaultStrategyHintAr,
  };
}
