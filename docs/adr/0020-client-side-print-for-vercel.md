# Client-side iframe print for Vercel serverless deployment

Status: accepted

## Context

The platform originally included a server-side `/api/pdf` endpoint backed by Playwright and Microsoft Edge (`src/pdf/pdf-exporter.ts`) alongside client-side iframe printing (`/api/print-html` and `/api/reading-print-html` via `window.print()`). Vercel serverless functions have strict bundle size limits and do not ship a Chromium/Edge binary.

## Decision

Remove the `/api/pdf` route handler and keep `playwright` strictly as a local `devDependency` for E2E tests and layout guards. Production printing and PDF export rely exclusively on client-side `@media print` and `window.print()` inside a same-origin iframe (`printHtmlInIframe`), with `X-Frame-Options: SAMEORIGIN` configured in `next.config.ts`.

## Consequences

- Vercel deployments stay within serverless bundle limits with zero headless browser runtime dependencies.
- Local layout-guard and E2E scripts continue to use `src/pdf/pdf-exporter.ts` and Playwright + Edge without affecting production builds.
