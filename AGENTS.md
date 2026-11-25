# Worksheets Platform

## Agent skills

### Issue tracker

Issues and specs are tracked as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five default canonical triage role strings (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout (`GLOSSARY.md` and `docs/adr/` at the repo root). See `docs/agents/domain.md`.

### Worksheet rules

Read `WORKSHEET_CONSTITUTION.md` before designing, authoring, or reviewing any math Worksheet, Lesson Blueprint, Exercise Archetype, or Visual Model. To start a new batch of lessons, follow `docs/agents/worksheet-batch-playbook.md`.

### Environment

- Headless browser testing uses Playwright with `channel: 'msedge'` — Microsoft Edge is installed; Chromium is not.
- Windows PowerShell 5.1: chain dependent commands with `; if ($LASTEXITCODE -eq 0) { ... }` (never `&&`).
- Use `Select-String` for repo search (`rg` is not installed).
- Run `npm run lint:numerals` after authoring blueprints or archetypes, before running `npm run test:fast`.
