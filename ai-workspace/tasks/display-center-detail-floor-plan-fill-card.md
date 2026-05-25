# Todo: Floor-Plan Fills the Entire Card

Linked plan: [../plan/display-center-detail-floor-plan-fill-card.md](../plan/display-center-detail-floor-plan-fill-card.md)

**Decision locked:** Option A — keep border + rounded card, drop inner wrapper + `p-3`.

## Phase 1 — Implementation

- [x] **Task 1: Collapse FloorPlanPanel to single container** — `src/app/dashboard/(auth)/templates/display-center-detail/_components/floor-plan-panel.tsx`
  - [x] Remove inner `<div className="relative h-72 ...">` wrapper
  - [x] Remove `p-3` from outer panel
  - [x] Move `<Image>` and overlays to be direct children of the outer panel
  - [x] Image className → `h-full w-full bg-muted object-cover transition-transform duration-500 group-hover:scale-105 dark:bg-stone-100`
  - [x] Outer panel className → `group bg-card relative min-h-72 overflow-hidden rounded-xl border` (no `p-3`, `min-h-72` as floor for short rows)
  - [x] Overlays unchanged in positions/styles (brand pill TL, zoom/share TR, delete BR)

## Phase 2 — Verification

- [x] `bun run typecheck` (modulo preexisting variant-3 error)
- [x] `bun run lint`
- [x] `preview_eval`: outer panel 532×428, image 530×426 (fills border-to-border), `objectFit === "cover"`, panel has 4 direct children (IMG + 3 overlays, no inner wrapper)
- [x] No new console errors
- [x] Visual: no `bg-card` halo inside the card (whitespace went from 116 px → 0 px)
- [ ] Human approval before commit
