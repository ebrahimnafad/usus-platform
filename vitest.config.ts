import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
    globals: true,
    testTimeout: 30000,
    // next/font/google is only callable in the Next.js build pipeline (SWC).
    // In Vitest's Node environment it must be stubbed so that any file importing
    // layout.tsx (which calls Cairo({ ... })) doesn't throw at module load time.
    deps: {
      moduleDirectories: ["node_modules"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Stub next/font/google: every named export becomes an identity function
      // that returns a { className, variable, style } descriptor object.
      "next/font/google": path.resolve(
        __dirname,
        "__mocks__/next-font-google.ts"
      ),
    },
  },
});
