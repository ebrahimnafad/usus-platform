/**
 * Vitest stub for `next/font/google`.
 *
 * In production, Next.js's SWC transform rewrites `Cairo({ ... })` into a
 * static CSS descriptor at build time. In Vitest's plain Node environment that
 * transform never runs, so the import resolves to an empty module and
 * `Cairo(...)` throws "is not a function".
 *
 * This stub returns a Proxy whose every property is a function that returns a
 * minimal { className, variable, style } font descriptor — enough for
 * RootLayout to render without errors during unit tests.
 */

type FontDescriptor = {
  className: string;
  variable: string;
  style: { fontFamily: string };
};

function makeFontFactory(name: string): (opts?: unknown) => FontDescriptor {
  return () => ({
    className: `font-${name.toLowerCase()}`,
    variable: `--font-${name.toLowerCase()}`,
    style: { fontFamily: name },
  });
}

export const Cairo = makeFontFactory("Cairo");
export const Amiri = makeFontFactory("Amiri");
export const Noto_Naskh_Arabic = makeFontFactory("Noto_Naskh_Arabic");
export const Aref_Ruqaa = makeFontFactory("Aref_Ruqaa");
export const Readex_Pro = makeFontFactory("Readex_Pro");
