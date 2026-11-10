// Layout guard: enforces every [guard] rule of WORKSHEET_CONSTITUTION.md on the
// real print route, at full scale, in Microsoft Edge (Chromium is not installed).
//
// Usage: node scripts/layout-guard.mjs [--base-url=http://localhost:3000]
//          [--lessons=K-1..K-26|K-12,K-20] [--seeds=5] [--png=all|first|none]
//          [--concurrency=4] [--output-dir=<new-path>]

import { execFile, execFileSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { promisify } from "util";
import { chromium } from "playwright";
import {
  countPdfPages,
  createPrintHarness,
  parseLessonFilter,
  PDF_OPTS,
  printWidthCss,
  RENDER_MODES as MODES,
  RENDER_SEEDS as SEEDS,
  RENDER_VIEWS as VIEWS,
  waitForPrintFonts,
} from "./lib/print-measure.mjs";

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STANDARD = JSON.parse(
  fs.readFileSync(
    path.join(ROOT, "src/components/worksheet/layout-standard.json"),
    "utf8"
  )
);
const DEFAULT_OUTPUT_DIR = path.join(ROOT, "layout-guard-output");
const PORT = 3355;

const GRADES = ["K", "1", "2", "3", "4", "5"];
const LESSONS_PER_GRADE = 135;

const PRINT_WIDTH_CSS = printWidthCss(STANDARD.printableAreaMm);

function parseArgs(argv) {
  const args = {};
  let lastKey = null;
  for (const arg of argv.slice(2)) {
    const match = arg.match(/^--([^=]+)(?:=(.*))?$/);
    if (match) {
      lastKey = match[1];
      args[lastKey] = match[2] ?? "true";
    } else if (
      lastKey === "lessons" &&
      /^([K1-5])-(\d+)(?:\.\.(?:[K1-5]-)?(\d+))?$/.test(arg)
    ) {
      // PowerShell splits unquoted --lessons=K-14,K-15 on commas into separate argv tokens
      args.lessons = `${args.lessons},${arg}`;
    }
  }
  const pngMode = args.png ?? "first";
  const defaultConcurrency = pngMode === "none" ? 8 : 4;
  return {
    baseUrl: args["base-url"],
    lessons: args.lessons,
    outputDir: args["output-dir"],
    seedCount: Math.min(SEEDS.length, Math.max(1, Number(args.seeds ?? 5))),
    png: pngMode,
    concurrency: Math.max(1, Number(args.concurrency ?? defaultConcurrency)),
  };
}

function printUrl(baseUrl, job) {
  const params = new URLSearchParams({
    grade: job.grade,
    lesson: String(job.lesson),
    seed: job.seed,
    difficulty: job.mode,
    view: job.view,
  });
  return `${baseUrl}/print?${params.toString()}`;
}

async function waitForUrl(url, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // server still starting
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timeout waiting for ${url}`);
}

async function runPool(items, concurrency, worker) {
  let next = 0;
  const runners = Array.from({ length: concurrency }, async (_, slot) => {
    while (next < items.length) {
      const index = next++;
      await worker(items[index], slot, index);
    }
  });
  await Promise.all(runners);
}

async function discoverAuthoredLessons(baseUrl) {
  const blueprintsDir = path.join(ROOT, "src", "blueprints");
  if (fs.existsSync(blueprintsDir)) {
    const found = new Map();
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
          const text = fs.readFileSync(full, "utf8");
          for (const m of text.matchAll(
            /lessonId:\s*["']([K1-5])-(\d+)["']/g
          )) {
            const grade = m[1];
            const lesson = Number(m[2]);
            found.set(`${grade}-${lesson}`, { grade, lesson });
          }
        }
      }
    };
    walk(blueprintsDir);
    if (found.size > 0) {
      const gradeOrder = (grade) => GRADES.indexOf(grade);
      return [...found.values()].sort(
        (a, b) =>
          gradeOrder(a.grade) - gradeOrder(b.grade) || a.lesson - b.lesson
      );
    }
  }

  const candidates = GRADES.flatMap((grade) =>
    Array.from({ length: LESSONS_PER_GRADE }, (_, i) => ({
      grade,
      lesson: i + 1,
    }))
  );
  const authored = [];
  await runPool(candidates, 8, async (candidate) => {
    const html = await (
      await fetch(
        printUrl(baseUrl, {
          ...candidate,
          seed: "LG-PROBE",
          mode: "scaffolded",
          view: "worksheet",
        })
      )
    ).text();
    if (!html.includes('data-fallback-preview="true"'))
      authored.push(candidate);
  });
  const gradeOrder = (grade) => GRADES.indexOf(grade);
  return authored.sort(
    (a, b) => gradeOrder(a.grade) - gradeOrder(b.grade) || a.lesson - b.lesson
  );
}

/** Runs inside the page. Returns every [guard] violation on the sheet. */
function measureSheet(std) {
  const TOL = 0;
  const violations = [];
  const sheet = document.querySelector(
    '.a4-sheet[data-worksheet-surface="true"]'
  );
  if (!sheet)
    return [
      {
        rule: "missing-sheet",
        page: 1,
        section: null,
        exercise: null,
        element: "<body>",
        detail: "No worksheet surface",
      },
    ];

  const sheetRect = sheet.getBoundingClientRect();
  const pageHeightPx = (std.printableAreaMm.height / 25.4) * 96;
  const pageOf = (el) =>
    Math.max(
      1,
      Math.floor(
        (el.getBoundingClientRect().top - sheetRect.top) / pageHeightPx
      ) + 1
    );
  const cards = [...sheet.querySelectorAll("[data-exercise-id]")];
  const where = (el) => {
    const card = el.closest("[data-exercise-id]");
    return {
      page: pageOf(el),
      section: el.closest("[data-section-id]")?.dataset.sectionId ?? "header",
      exercise: card ? cards.indexOf(card) + 1 : null,
    };
  };
  const label = (el) => {
    const data = [...el.attributes]
      .filter((attr) => attr.name.startsWith("data-"))
      .map((attr) => `${attr.name}="${attr.value}"`)
      .join(" ");
    const text = (el.textContent ?? "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 40);
    return `<${el.tagName.toLowerCase()}${data ? " " + data : ""}>${text ? ` "${text}"` : ""}`;
  };
  const push = (rule, el, detail) =>
    violations.push({ rule, ...where(el), element: label(el), detail });

  const isShown = (el) => {
    const cs = getComputedStyle(el);
    return cs.display !== "none" && cs.visibility !== "hidden";
  };
  const hasArea = (elementRect) =>
    Math.round(elementRect.width) > TOL && Math.round(elementRect.height) > TOL;
  const excess = (elementRect, containerRect) =>
    Math.max(
      containerRect.left - elementRect.left,
      elementRect.right - containerRect.right,
      containerRect.top - elementRect.top,
      elementRect.bottom - containerRect.bottom
    );
  const isSvgInternal = (el) => el instanceof SVGElement && el.ownerSVGElement;
  const NON_RENDERED_SVG =
    "defs, clipPath, mask, pattern, marker, symbol, linearGradient, radialGradient, filter, title, desc";

  // 3.1 containment: page header and Sections inside the sheet, Section
  // chrome inside its Section, everything in a card inside that card.
  const containWithin = (container, elements, kind) => {
    const containerRect = container.getBoundingClientRect();
    for (const el of elements) {
      if (isSvgInternal(el) || !isShown(el)) continue;
      const elementRect = el.getBoundingClientRect();
      if (!hasArea(elementRect)) continue;
      const over = Math.round(excess(elementRect, containerRect));
      if (over > TOL)
        push("overflow", el, `extends ${over.toFixed(1)}px past its ${kind}`);
    }
  };
  const header = sheet.querySelector("header");
  const sections = [...sheet.querySelectorAll("[data-section-id]")];
  containWithin(sheet, [header, ...sections].filter(Boolean), "sheet");
  if (header)
    containWithin(header, header.querySelectorAll("*"), "page header");
  for (const section of sections) {
    const chrome = [...section.querySelectorAll("*")].filter(
      (el) =>
        !el.closest("[data-exercise-id]") || el.matches("[data-exercise-id]")
    );
    containWithin(section, chrome, "section");
  }
  for (const card of cards)
    containWithin(card, card.querySelectorAll("*"), "exercise card");
  for (const colChild of sheet.querySelectorAll("[data-exercise-columns] > *"))
    containWithin(colChild, colChild.querySelectorAll("*"), "column cell");

  // SVG content outside its viewport is silently clipped.
  for (const svg of sheet.querySelectorAll("svg")) {
    if (svg.ownerSVGElement || !isShown(svg)) continue;
    const containerRect = svg.getBoundingClientRect();
    for (const el of svg.querySelectorAll("*")) {
      if (!(el instanceof SVGGraphicsElement) || el.closest(NON_RENDERED_SVG))
        continue;
      const elementRect = el.getBoundingClientRect();
      if (!hasArea(elementRect)) continue;
      const over = Math.round(excess(elementRect, containerRect));
      if (over > TOL)
        push("svg-clipped", el, `drawn ${over.toFixed(1)}px outside its SVG`);
    }
  }

  // 3.1 SVG graph-cell icon centering & adjacent graph-cell non-overlap
  for (const iconGroup of sheet.querySelectorAll("[data-graph-cell-icon]")) {
    if (!isShown(iconGroup)) continue;
    const badgeCircle = iconGroup.querySelector(":scope > g > circle");
    const innerSvg = iconGroup.querySelector("svg");
    if (badgeCircle && innerSvg) {
      const circleRect = badgeCircle.getBoundingClientRect();
      const svgRect = innerSvg.getBoundingClientRect();
      if (hasArea(circleRect) && hasArea(svgRect)) {
        const dx = Math.abs(
          circleRect.left +
            circleRect.width / 2 -
            (svgRect.left + svgRect.width / 2)
        );
        const dy = Math.abs(
          circleRect.top +
            circleRect.height / 2 -
            (svgRect.top + svgRect.height / 2)
        );
        if (dx > 2.5 || dy > 2.5) {
          push(
            "svg-icon-off-center",
            iconGroup,
            `nested icon center is offset by (${dx.toFixed(1)}, ${dy.toFixed(1)})px from its badge circle`
          );
        }
        if (svgRect.width < circleRect.width * 0.55) {
          push(
            "svg-icon-under-scaled",
            iconGroup,
            `nested icon width (${svgRect.width.toFixed(1)}px) is less than 55% of badge diameter (${circleRect.width.toFixed(1)}px)`
          );
        }
      }
    }
  }
  for (const catGroup of sheet.querySelectorAll("[data-graph-category]")) {
    if (!isShown(catGroup)) continue;
    const cells = [...catGroup.querySelectorAll(":scope > [data-graph-cell]")];
    for (let i = 0; i < cells.length; i++) {
      const r1 = cells[i].getBoundingClientRect();
      if (!hasArea(r1)) continue;
      for (let j = i + 1; j < cells.length; j++) {
        const r2 = cells[j].getBoundingClientRect();
        if (!hasArea(r2)) continue;
        const ix = Math.round(
          Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left)
        );
        const iy = Math.round(
          Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top)
        );
        if (ix > 1 && iy > 1) {
          push(
            "overlap",
            cells[i],
            `graph cell overlaps ${label(cells[j])} by ${ix}×${iy}px`
          );
        }
      }
    }
  }

  // 3.1 clipped boxes
  for (const el of sheet.querySelectorAll("*")) {
    if (isSvgInternal(el) || el instanceof SVGElement || !isShown(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.overflowX === "visible" && cs.overflowY === "visible") continue;
    const dx = el.scrollWidth - el.clientWidth;
    const dy = el.scrollHeight - el.clientHeight;
    if (dx > 0 || dy > 0)
      push("clipped", el, `content clipped by ${Math.max(dx, dy)}px`);
  }

  // 3.1 overlapping siblings
  for (const parent of sheet.querySelectorAll("*")) {
    if (parent instanceof SVGElement || !isShown(parent)) continue;
    const kids = [...parent.children].filter((el) => {
      if (el instanceof SVGElement && el.ownerSVGElement) return false;
      if (!isShown(el)) return false;
      const cs = getComputedStyle(el);
      if (cs.position === "absolute" || cs.position === "fixed") return false;
      return hasArea(el.getBoundingClientRect());
    });
    for (let i = 0; i < kids.length; i++) {
      const firstRect = kids[i].getBoundingClientRect();
      for (let j = i + 1; j < kids.length; j++) {
        const secondRect = kids[j].getBoundingClientRect();
        const ix = Math.round(
          Math.min(firstRect.right, secondRect.right) -
            Math.max(firstRect.left, secondRect.left)
        );
        const iy = Math.round(
          Math.min(firstRect.bottom, secondRect.bottom) -
            Math.max(firstRect.top, secondRect.top)
        );
        if (ix > TOL && iy > TOL) {
          push(
            "overlap",
            kids[i],
            `overlaps ${label(kids[j])} by ${ix.toFixed(1)}×${iy.toFixed(1)}px`
          );
        }
      }
    }
  }

  // 3.2 exercise body width (660 px) and column layout widths (660 / 324 / 212 px)
  for (const body of sheet.querySelectorAll('[data-exercise-body="true"]')) {
    if (!isShown(body)) continue;
    const elementRect = body.getBoundingClientRect();
    if (
      Math.abs(Math.round(elementRect.width) - std.exerciseBodyWidthPx) > TOL
    ) {
      push(
        "column-layout",
        body,
        `exercise body width is ${elementRect.width.toFixed(1)}px, expected ${std.exerciseBodyWidthPx}px`
      );
    }
  }
  const columnWidthByAttr = {
    one: std.columnWidthsPx["1"],
    two: std.columnWidthsPx["2"],
    three: std.columnWidthsPx["3"],
    1: std.columnWidthsPx["1"],
    2: std.columnWidthsPx["2"],
    3: std.columnWidthsPx["3"],
  };
  for (const grid of sheet.querySelectorAll("[data-exercise-columns]")) {
    if (!isShown(grid)) continue;
    const expectedWidth = columnWidthByAttr[grid.dataset.exerciseColumns];
    if (expectedWidth === undefined) {
      push(
        "column-layout",
        grid,
        `unknown column layout "${grid.dataset.exerciseColumns}"`
      );
      continue;
    }
    for (const child of grid.children) {
      if (!isShown(child)) continue;
      const elementRect = child.getBoundingClientRect();
      if (Math.abs(Math.round(elementRect.width) - expectedWidth) > TOL) {
        push(
          "column-layout",
          child,
          `column child width is ${elementRect.width.toFixed(1)}px, expected ${expectedWidth}px`
        );
      }
    }
  }

  // 3.4 canonical sizes
  const sizes = std.canonicalSizesPx;
  const canonical = [
    [
      '[data-answer-slot="unknown"], [data-answer-slot="write"], [data-answer-slot="solved-digit"]',
      sizes.answerSlotDigit,
      "Answer Slot",
    ],
    [
      '[data-answer-slot="line"], [data-answer-slot="solved-line"]',
      sizes.answerSlotLine,
      "Answer Slot line",
    ],
    ["[data-rtl-cell-box]", sizes.fiveFrameCell, "five-frame cell"],
    [
      '[data-visual-model="five-frame"]',
      { width: sizes.fiveFrameWidth },
      "five-frame",
    ],
    ['[data-visual-model="ten-frame"]', sizes.tenFrameBox, "Ten Frame"],
    ['[data-visual-model="number-bond"]', sizes.numberBondBox, "Number Bond"],
    ["[data-number-bond-circle]", sizes.numberBondCircle, "Number Bond circle"],
    [
      '[data-visual-model="equation-strip"]',
      { height: sizes.equationStripHeight },
      "Equation Strip",
    ],
    [
      '[data-visual-model="balance-scale"]',
      sizes.balanceScaleBox,
      "Balance Scale",
    ],
    [
      '[data-graph-mode="draw-missing"] svg[data-shape-graph-box]',
      sizes.shapeGraphBox,
      "SHAPE GRAPH",
    ],
    ["[data-shape-graph-cell]", sizes.shapeGraphCell, "SHAPE GRAPH cell"],
    [
      '[data-visual-model="paper-clip-bar"]',
      sizes.paperClipBarBox,
      "Paper-Clip Bar",
    ],
    [
      '[data-visual-model="polygon-perimeter"]',
      sizes.polygonPerimeterBox,
      "Polygon Perimeter",
    ],
    [
      '[data-visual-model="numtanga-grid"]',
      sizes.numtangaGridBox,
      "Numtanga Grid",
    ],
  ];
  for (const [selector, size, name] of canonical) {
    for (const el of sheet.querySelectorAll(selector)) {
      if (!isShown(el)) continue;
      const elementRect = el.getBoundingClientRect();
      const wrongWidth =
        size.width !== undefined &&
        Math.abs(Math.round(elementRect.width) - size.width) > TOL;
      const wrongHeight =
        size.height !== undefined &&
        Math.abs(Math.round(elementRect.height) - size.height) > TOL;
      if (wrongWidth || wrongHeight) {
        const expected = `${size.width ?? "any"}×${size.height ?? "any"}`;
        push(
          "canonical-size",
          el,
          `${name} is ${elementRect.width.toFixed(1)}×${elementRect.height.toFixed(1)}px, expected ${expected}`
        );
      }
    }
  }

  // 4.1 type scale
  const allowed = Object.values(std.typeScalePx);
  const pictographOnly =
    /^[\p{Extended_Pictographic}\p{Emoji_Component}\uFE0F\u200D\s]+$/u;
  const reportedSizes = new Set();
  const walker = document.createTreeWalker(sheet, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent.trim();
    const parent = node.parentElement;
    if (!text || pictographOnly.test(text) || !parent || !isShown(parent))
      continue;
    if (parent.closest("style, script")) continue;
    let size = parseFloat(getComputedStyle(parent).fontSize);
    if (parent instanceof SVGElement) {
      const ctm = parent.getScreenCTM();
      if (ctm) size *= Math.hypot(ctm.a, ctm.b);
    }
    const roundedSize = Math.round(size);
    const onScale = allowed.some(
      (allowedSize) => Math.abs(allowedSize - roundedSize) <= TOL
    );
    if (roundedSize < std.minTextPx || !onScale) {
      const key = `${size.toFixed(1)}|${where(parent).exercise}|${parent.tagName}`;
      if (reportedSizes.has(key)) continue;
      reportedSizes.add(key);
      const rule =
        roundedSize < std.minTextPx ? "text-too-small" : "off-type-scale";
      push(
        rule,
        parent,
        `${size.toFixed(1)}px (allowed: ${allowed.join(", ")}px)`
      );
    } else if (
      !(parent instanceof SVGElement) &&
      roundedSize === std.typeScalePx.sectionTitle &&
      parent.closest("[data-exercise-id]")
    ) {
      const key = `role-20|${where(parent).exercise}|${parent.tagName}`;
      if (!reportedSizes.has(key)) {
        reportedSizes.add(key);
        push(
          "off-type-role",
          parent,
          `${size.toFixed(1)}px inside exercise card (20px is reserved for Section title per §4.1)`
        );
      }
    }

    // 3.1 text spilling out of its box
    if (parent instanceof SVGElement) continue;
    let box = parent;
    while (
      box &&
      ["inline", "contents"].includes(getComputedStyle(box).display)
    ) {
      box = box.parentElement;
    }
    if (!box) continue;
    const containerRect = box.getBoundingClientRect();
    const lineHeight = parseFloat(getComputedStyle(parent).lineHeight);
    const range = document.createRange();
    range.selectNodeContents(node);
    for (const elementRect of range.getClientRects()) {
      if (!hasArea(elementRect)) continue;
      // A text range spans the font's full ascent and descent, which can
      // exceed a tight line box without any ink leaving it; only spill past
      // that allowance counts vertically.
      const glyphAllowance = Number.isFinite(lineHeight)
        ? Math.max(0, elementRect.height - lineHeight)
        : 0;
      const overX = Math.max(
        containerRect.left - elementRect.left,
        elementRect.right - containerRect.right
      );
      const overY =
        Math.max(
          containerRect.top - elementRect.top,
          elementRect.bottom - elementRect.bottom
        ) - glyphAllowance;
      const over = Math.round(Math.max(overX, overY));
      if (over > TOL) {
        push(
          "text-overflow",
          box,
          `text spills ${over.toFixed(1)}px out of its box`
        );
        break;
      }
    }
  }

  // 4.2 prompt length
  for (const prompt of sheet.querySelectorAll(
    '[data-exercise-prompt="true"]'
  )) {
    const range = document.createRange();
    range.selectNodeContents(prompt);
    const tops = [];
    for (const elementRect of range.getClientRects()) {
      if (
        hasArea(elementRect) &&
        !tops.some((lineTop) => Math.abs(lineTop - elementRect.top) < 4)
      ) {
        tops.push(elementRect.top);
      }
    }
    if (tops.length > std.promptMaxLines) {
      push(
        "prompt-too-long",
        prompt,
        `${tops.length} lines (max ${std.promptMaxLines})`
      );
    }
  }

  // 2.3 break-inside: avoid on [data-exercise-id], break-after: avoid on
  // [data-section-id] > :first-child, and no exercise taller than a page
  for (const card of cards) {
    if (!isShown(card)) continue;
    const breakInside = getComputedStyle(card).breakInside;
    if (breakInside !== "avoid") {
      push(
        "exercise-split",
        card,
        `break-inside is "${breakInside}", expected "avoid"`
      );
    }
  }
  for (const section of sections) {
    const cs = getComputedStyle(section);
    const chrome = [
      "borderTopWidth",
      "paddingTop",
      "paddingBottom",
      "borderBottomWidth",
    ]
      .map((prop) => parseFloat(cs[prop]))
      .reduce((sum, val) => sum + val, 0);
    const sectionHeader = section.querySelector(":scope > :first-child");
    if (sectionHeader && isShown(sectionHeader)) {
      const breakAfter = getComputedStyle(sectionHeader).breakAfter;
      if (breakAfter !== "avoid") {
        push(
          "exercise-split",
          sectionHeader,
          `section header break-after is "${breakAfter}", expected "avoid"`
        );
      }
    }
    const headerBlock = sectionHeader
      ? sectionHeader.getBoundingClientRect().height +
        parseFloat(getComputedStyle(sectionHeader).marginBottom)
      : 0;
    section.querySelectorAll("[data-exercise-id]").forEach((card, i) => {
      const need = Math.round(
        card.getBoundingClientRect().height +
          chrome +
          (i === 0 ? headerBlock : 0)
      );
      if (need > Math.round(pageHeightPx) + TOL) {
        push(
          "exercise-split",
          card,
          `needs ${need.toFixed(0)}px but a page holds ${pageHeightPx.toFixed(0)}px`
        );
      }
    });
  }

  return violations;
}

function findPdftoppm() {
  try {
    execFileSync("pdftoppm", ["-v"], { stdio: "ignore" });
    return "pdftoppm";
  } catch {
    return null;
  }
}

async function main() {
  const options = parseArgs(process.argv);
  const OUTPUT_DIR = options.outputDir
    ? path.resolve(options.outputDir)
    : DEFAULT_OUTPUT_DIR;
  let server = null;
  let harness = null;
  let renderPrintMain = null;
  let baseUrl = options.baseUrl?.replace(/\/$/, "");

  const cleanup = () => {
    if (harness) {
      harness.close();
      harness = null;
    }
    if (!server) return;
    try {
      if (process.platform === "win32") {
        execFileSync("taskkill", ["/pid", String(server.pid), "/f", "/t"], {
          stdio: "ignore",
        });
      } else {
        server.kill();
      }
    } catch {
      // already gone
    }
    server = null;
  };
  process.on("exit", cleanup);
  process.on("SIGINT", () => process.exit(130));

  if (!baseUrl) {
    process.stdout.write(
      "Compiling print stylesheet and loading worksheet engine...\n"
    );
    harness = await createPrintHarness();
    baseUrl = harness.baseUrl;
    renderPrintMain = harness.renderPrintMain;
  } else {
    await waitForUrl(`${baseUrl}/print?grade=K&lesson=1&seed=LG-WARM`, 180000);
  }

  const lessons =
    parseLessonFilter(options.lessons) ??
    (await discoverAuthoredLessons(baseUrl));
  const seeds = SEEDS.slice(0, options.seedCount);
  const jobs = lessons.flatMap(({ grade, lesson }) =>
    seeds.flatMap((seed) =>
      MODES.flatMap((mode) =>
        VIEWS.map((view) => ({ grade, lesson, seed, mode, view }))
      )
    )
  );
  process.stdout.write(
    `Checking ${lessons.length} lessons × ${seeds.length} seeds × ${MODES.length} modes × ${VIEWS.length} views = ${jobs.length} renders\n`
  );

  if (options.outputDir) {
    if (fs.existsSync(OUTPUT_DIR)) {
      throw new Error(
        `Custom output directory already exists; choose a new path: ${OUTPUT_DIR}`
      );
    }
  } else {
    try {
      fs.rmSync(OUTPUT_DIR, {
        recursive: true,
        force: true,
        maxRetries: 3,
        retryDelay: 200,
      });
    } catch {
      // Directory may be open in Explorer on Windows; overwrite files in place
    }
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({
    viewport: { width: 794, height: 1123 },
  });
  await context.route("https://**", (route) => {
    const hostname = new URL(route.request().url()).hostname;
    if (
      hostname === "fonts.googleapis.com" ||
      hostname === "fonts.gstatic.com"
    ) {
      return route.continue();
    }
    return route.abort();
  });
  const pages = await Promise.all(
    Array.from({ length: options.concurrency }, async () => {
      const p = await context.newPage();
      await p.goto(`${baseUrl}/print?grade=K&lesson=1&seed=LG-WARM`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await p.emulateMedia({ media: "print" });
      await p.addStyleTag({ content: PRINT_WIDTH_CSS });
      await waitForPrintFonts(p);
      return p;
    })
  );

  const results = [];
  let done = 0;
  await runPool(jobs, options.concurrency, async (job, slot) => {
    const page = pages[slot];
    const id = `${job.grade}-${job.lesson}`;
    const violations = [];
    let pageCount = 0;
    let sheetHeight = null;
    try {
      if (renderPrintMain) {
        const mainHtml = renderPrintMain(job);
        await page.evaluate((nextMainHtml) => {
          const curMain = document.querySelector("main");
          if (curMain) curMain.outerHTML = nextMainHtml;
        }, mainHtml);
      } else {
        const res = await fetch(printUrl(baseUrl, job));
        if (!res.ok)
          throw new Error(`HTTP ${res.status} for ${printUrl(baseUrl, job)}`);
        const html = await res.text();
        await page.evaluate((rawHtml) => {
          const doc = new DOMParser().parseFromString(rawHtml, "text/html");
          const nextMain = doc.querySelector("main");
          const curMain = document.querySelector("main");
          if (nextMain && curMain) {
            curMain.replaceWith(nextMain);
          }
        }, html);
      }
      await page.evaluate(() => document.fonts.ready);
      violations.push(...(await page.evaluate(measureSheet, STANDARD)));

      sheetHeight = await page.evaluate(() => {
        const s = document.querySelector(
          '.a4-sheet[data-worksheet-surface="true"]'
        );
        return s ? Math.round(s.getBoundingClientRect().height) : 0;
      });
      const wantPng =
        options.png !== "none" &&
        (options.png === "all" || job.seed === seeds[0]);

      // Avoid caching by sheet height: fragmentation can change at an equal or
      // smaller height when a break-inside-avoid exercise crosses a page edge.
      const pdf = Buffer.from(await page.pdf(PDF_OPTS));
      pageCount = countPdfPages(pdf);

      if (pageCount > STANDARD.pageBudget) {
        violations.push({
          rule: "page-budget",
          page: pageCount,
          section: null,
          exercise: null,
          element: '<article data-worksheet-surface="true">',
          detail: `${pageCount} pages (max ${STANDARD.pageBudget}), sheet ${sheetHeight}px`,
        });
      }

      if (wantPng) {
        const dir = path.join(OUTPUT_DIR, "png", id, job.mode, job.view);
        fs.mkdirSync(dir, { recursive: true });
        await page.screenshot({
          path: path.join(dir, `${job.seed}.png`),
        });
      }
    } catch (error) {
      violations.push({
        rule: "render-error",
        page: 1,
        section: null,
        exercise: null,
        element: "<document>",
        detail: String(error),
      });
    }
    results.push({ ...job, id, pageCount, sheetHeight, violations });
    done++;
    if (done % 25 === 0 || done === jobs.length) {
      process.stdout.write(`  ${done}/${jobs.length} renders checked\n`);
    }
  });

  await browser.close();
  cleanup();

  const byLesson = new Map();
  for (const result of results) {
    const entry = byLesson.get(result.id) ?? {
      lesson: result.id,
      renders: 0,
      failing: 0,
      maxPages: 0,
      rules: {},
    };
    entry.renders++;
    entry.maxPages = Math.max(entry.maxPages, result.pageCount);
    if (result.violations.length > 0) entry.failing++;
    for (const v of result.violations)
      entry.rules[v.rule] = (entry.rules[v.rule] ?? 0) + 1;
    byLesson.set(result.id, entry);
  }
  const table = [...byLesson.values()].map((entry) => ({
    lesson: entry.lesson,
    status: entry.failing === 0 ? "PASS" : "FAIL",
    "failing renders": `${entry.failing}/${entry.renders}`,
    "max pages": entry.maxPages,
    violations: Object.entries(entry.rules)
      .map(([rule, n]) => `${rule}×${n}`)
      .join(" "),
  }));
  console.table(table);

  const failing = results.filter((r) => r.violations.length > 0);
  const sampleLines = [];
  const seenKeys = new Set();
  for (const r of failing) {
    for (const v of r.violations) {
      const key = `${r.id}|${v.rule}|${v.exercise ?? "sheet"}`;
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
      const exLabel = v.exercise !== null ? `ex#${v.exercise}` : "sheet";
      sampleLines.push(
        `  [${r.id} seed=${r.seed} mode=${r.mode} view=${r.view} sheet=${r.sheetHeight}px page=${v.page} ${exLabel}] ${v.rule}: ${v.element} — ${v.detail}`
      );
      if (sampleLines.length >= 20) break;
    }
    if (sampleLines.length >= 20) break;
  }
  if (sampleLines.length > 0) {
    process.stdout.write(`\nSample violations:\n${sampleLines.join("\n")}\n`);
  }
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "report.json"),
    JSON.stringify(
      {
        checkedAt: new Date().toISOString(),
        standard: STANDARD,
        failing,
        summary: table,
        results: results.map(({ violations, ...rest }) => rest),
      },
      null,
      2
    )
  );
  process.stdout.write(
    `\n${failing.length === 0 ? "PASS" : "FAIL"}: ${failing.length}/${results.length} renders violate the constitution. Details: ${path.join(OUTPUT_DIR, "report.json")}\n`
  );
  process.exit(failing.length === 0 ? 0 : 1);
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exit(1);
});
