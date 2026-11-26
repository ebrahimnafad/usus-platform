# Reading domain: mobile-first layout for Story Cycle Runner and stepper

The Reading Story Cycle Runner header packs five interactive elements (logo, breadcrumbs, Teacher Shield, Print, back-link) into a single flex row, the 6-station stepper forces a 620px-wide horizontal scroll, and bottom-navigation buttons are undersized for thumb use. We decided to reorganise the below-`sm` (< 640px) layout around a **fixed bottom action bar** and a **compact icon-only stepper**, while keeping the desktop layout pixel-identical.

## Considered Options

**Header actions on mobile:**
We considered (A) a hamburger/kebab menu, (B) moving actions to a fixed bottom bar, (C) a two-row stacked header, and (D) hiding breadcrumbs to free space. We chose **(B)** because a bottom bar puts controls in the thumb zone, and the existing station-navigation prev/next bar already occupies that position semantically — merging them keeps the bar count at one.

**Stepper on mobile:**
We considered (A) active-only expansion with dots, (B) scroll-snap, (C) a dropdown selector, and (D) icon-only circles. We chose **(D)** because six 40×40px circles with emoji icons (📖 ⚡ 🔍 🧩 ✍️ 🏁) fit any width ≥ 320px, keep all stations visible at a glance, and the full station name is already shown in the content area below.

## Key decisions

| Area                 | Mobile (< `sm`)                                                                          | Desktop (≥ `sm`)                         |
| -------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------- |
| Header               | Logo + last-two breadcrumb segments only                                                 | Unchanged                                |
| Station stepper      | Six 40px emoji circles; green fill for completed, theme colour for active                | Unchanged (full labels, 620px min-width) |
| Bottom bar           | Fixed single row: `[🛡️] [← Prev] [٣/٦] [Next →] [🖨️]` with `env(safe-area-inset-bottom)` | Hidden; in-flow prev/next nav as today   |
| Transfer Test banner | Badge-only ("🎯 اختبار النقل"), no description text                                      | Unchanged                                |
| Reading Nook         | Icon-only Shield + Print in top header; no bottom bar                                    | Unchanged                                |
| Level Grid           | No changes                                                                               | No changes                               |
| Touch targets        | 44px minimum (Apple HIG) for all interactive elements                                    | Current sizes preserved                  |

## Consequences

- The `Breadcrumbs` component or its call sites must support segment-count trimming on mobile (e.g. hiding early segments with `hidden sm:inline`).
- The in-flow bottom nav (`hidden sm:flex`) and the fixed bottom bar (`sm:hidden`) coexist as two separate elements — one renders per breakpoint.
- The fixed bottom bar must include `env(safe-area-inset-bottom)` padding for iPhone home-indicator clearance.
