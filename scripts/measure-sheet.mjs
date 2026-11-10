// measure-sheet: observational companion to the layout guard.
//
// Prints real PDF page counts and per-section/per-exercise heights for a
// lesson range, so a red `guard:layout` run can be diagnosed without
// rebuilding throwaway probes. GATE NOTHING — `guard:layout` is the gate;
// this script only observes.
//
// Usage: node scripts/measure-sheet.mjs --lessons=K-84..K-85 [--seeds=2]
//          [--modes=scaffolded,Easy] [--detail]
//
// Per-render page geometry (for cutting: §2.2) each exercise is an atomic
// `break-inside: avoid` block, so a red render is usually a whole block that
// cannot reflow — cut it at blueprint level (pairCount/itemCount/one-line
// prompts), never by shrinking models.
import fs from "fs";
import path from "path";
import { chromium } from "playwright";
import {
  countPdfPages,
  createPrintHarness,
  parseLessonFilter,
  PDF_OPTS,
  printWidthCss,
  RENDER_MODES,
  RENDER_SEEDS,
  RENDER_VIEWS,
  ROOT,
  VIEWPORT,
  waitForPrintFonts,
} from "./lib/print-measure.mjs";

const STANDARD = JSON.parse(
  fs.readFileSync(
    path.join(ROOT, "src/components/worksheet/layout-standard.json"),
    "utf8"
  )
);
const PRINT_WIDTH_CSS = printWidthCss(STANDARD.printableAreaMm);

// A4 at 96dpi with zero margins — the physical height Chromium paginates at.
const PAGE_PX = (297 * 96) / 25.4; // 1122.5px
const PAGE_BUDGET = Math.round(2 * PAGE_PX);

function parseArgs(argv) {
  const args = {};
  let lastKey = null;
  for (const arg of argv.slice(2)) {
    const match = arg.match(/^--([^=]+)(?:=(.*))?$/);
    if (match) {
      lastKey = match[1];
      args[lastKey] = match[2] ?? "true";
    } else if (lastKey === "lessons") {
      // PowerShell splits unquoted --lessons=A,B on commas into separate tokens
      args.lessons = `${args.lessons},${arg}`;
    }
  }
  const modes = (args.modes ?? "")
    .split(",")
    .filter(Boolean)
    .filter((mode) => RENDER_MODES.includes(mode));
  return {
    lessons: args.lessons,
    seedCount: Math.min(
      RENDER_SEEDS.length,
      Math.max(1, Number(args.seeds ?? 2))
    ),
    modes: modes.length > 0 ? modes : RENDER_MODES,
    detail: args.detail === "true",
  };
}

async function main() {
  const options = parseArgs(process.argv);
  const lessons = parseLessonFilter(options.lessons);
  if (!lessons || lessons.length === 0) {
    throw new Error(
      "measure-sheet requires --lessons=K-N..K-M (e.g. --lessons=K-84..K-85)"
    );
  }
  const seeds = RENDER_SEEDS.slice(0, options.seedCount);
  const jobs = lessons.flatMap(({ grade, lesson }) =>
    seeds.flatMap((seed) =>
      options.modes.flatMap((mode) =>
        RENDER_VIEWS.map((view) => ({ grade, lesson, seed, mode, view }))
      )
    )
  );

  process.stdout.write(
    `Measuring ${lessons.length} lessons × ${seeds.length} seeds × ${options.modes.length} modes × ${RENDER_VIEWS.length} views = ${jobs.length} renders\n`
  );

  const harness = await createPrintHarness();
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });
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
  const page = await context.newPage();
  await page.goto(`${harness.baseUrl}/print?grade=K&lesson=1&seed=LG-WARM`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.emulateMedia({ media: "print" });
  await page.addStyleTag({ content: PRINT_WIDTH_CSS });
  await waitForPrintFonts(page);

  for (const job of jobs) {
    const label = `K-${job.lesson} ${job.seed} ${job.mode} ${job.view}`;
    try {
      const res = await fetch(
        `${harness.baseUrl}/print?${new URLSearchParams({
          grade: job.grade,
          lesson: String(job.lesson),
          seed: job.seed,
          difficulty: job.mode,
          view: job.view,
        }).toString()}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status} from the print harness`);
      const html = await res.text();
      await page.evaluate((rawHtml) => {
        const doc = new DOMParser().parseFromString(rawHtml, "text/html");
        const nextMain = doc.querySelector("main");
        const curMain = document.querySelector("main");
        if (nextMain && curMain) curMain.replaceWith(nextMain);
      }, html);
      await page.evaluate(() => document.fonts.ready);

      const m = await page.evaluate(() => {
        const sheet = document.querySelector(
          '.a4-sheet[data-worksheet-surface="true"]'
        );
        if (!sheet) return null;
        const sheetTop = sheet.getBoundingClientRect().top;
        const sections = [...sheet.querySelectorAll("[data-section-id]")].map(
          (s) => ({
            id: s.getAttribute("data-section-id"),
            h: Math.round(s.getBoundingClientRect().height),
            top: Math.round(s.getBoundingClientRect().top - sheetTop),
          })
        );
        const exercises = [...sheet.querySelectorAll("[data-exercise-id]")].map(
          (e) => {
            const sec = e.closest("[data-section-id]");
            const prompt = e.querySelector("[data-exercise-prompt]");
            const body = e.querySelector("[data-exercise-body]");
            const bodyRows = [
              ...(body?.querySelectorAll(":scope > *") ?? []),
            ].map((row) => {
              const r = row.getBoundingClientRect();
              const cs = getComputedStyle(row);
              return `h=${Math.round(r.height)} mt=${cs.marginTop} mb=${cs.marginBottom}`;
            });
            return {
              id: e.getAttribute("data-exercise-id"),
              section: sec ? sec.getAttribute("data-section-id") : "?",
              h: Math.round(e.getBoundingClientRect().height),
              top: Math.round(e.getBoundingClientRect().top - sheetTop),
              promptH: prompt
                ? Math.round(prompt.getBoundingClientRect().height)
                : null,
              bodyH: body
                ? Math.round(body.getBoundingClientRect().height)
                : null,
              bodyRows,
            };
          }
        );
        return {
          sheetH: Math.round(sheet.getBoundingClientRect().height),
          sections,
          exercises,
        };
      });
      if (!m) throw new Error("no worksheet surface rendered");

      const pdf = Buffer.from(await page.pdf(PDF_OPTS));
      const pages = countPdfPages(pdf);
      const red = pages > STANDARD.pageBudget || m.sheetH > PAGE_BUDGET;
      const headroom = Math.round(PAGE_BUDGET - m.sheetH);
      let statusLine = "";
      if (red) {
        statusLine = `!!! RED (2-page model over by ${-headroom}px)`;
      } else if (headroom < 120) {
        statusLine = `fits, ${headroom}px headroom`;
      } else {
        statusLine = "fits";
      }
      process.stdout.write(
        `${label}: sheetH=${m.sheetH} pages=${pages} ${statusLine}\n`
      );
      const showDetail = options.detail || red;
      if (showDetail) {
        for (const s of m.sections) {
          process.stdout.write(
            `\n  section ${String(s.id).padEnd(9)}: h=${String(s.h).padStart(4)} top=${String(s.top).padStart(4)}`
          );
        }
        for (const e of m.exercises) {
          process.stdout.write(
            `\n  exercise ${e.section}/${e.id}: h=${String(e.h).padStart(4)} top=${String(e.top).padStart(4)} prompt=${e.promptH} body=${e.bodyH}`
          );
          for (const rowLine of e.bodyRows) {
            process.stdout.write(`\n      row ${rowLine}`);
          }
        }
        process.stdout.write("\n");
      }
    } catch (error) {
      process.stdout.write(`${label}: ERROR ${String(error)}\n`);
    }
  }

  await browser.close();
  harness.close();
  process.exit(0);
}

main().catch((error) => {
  process.stderr.write(`${error?.stack ?? error}\n`);
  process.exit(1);
});
