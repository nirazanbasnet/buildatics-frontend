# Todo: Match Display Center Detail (variant-1) Image Overlays to Variant-7

Linked plan: [../plan/display-center-detail-overlay-match-v7.md](../plan/display-center-detail-overlay-match-v7.md)

**Decision locked:** Delete button → dark circular `Trash2` at bottom-right (Option B).

## Phase 1 — Implementation (parallelizable)

- [ ] **Task 1: Restyle `FloorPlanPanel` overlay** — `src/app/dashboard/(auth)/templates/display-center-detail/_components/floor-plan-panel.tsx`
  - [ ] Top-left dark pill: `{brand.slice(0,3).toUpperCase()} · V{version}`
  - [ ] Top-right dark zoom/share stack (size-8 rounded-full, bg-black/50, white text, backdrop-blur, hover:bg-black/70)
  - [ ] Remove bottom-left brand badge
  - [ ] Remove bottom-right `Clock + Version N` badge
  - [ ] Move `Trash2` to bottom-right with dark circular styling
  - [ ] Remove now-unused imports (`Badge`, `Clock`)

- [ ] **Task 2: Restyle `AvailableFacades` card overlay** — `src/app/dashboard/(auth)/templates/display-center-detail/_components/available-facades.tsx`
  - [ ] Top-left dark pill on each card
  - [ ] Top-right dark zoom/share stack on each card
  - [ ] Remove bottom badges on each card
  - [ ] Replace rotated `Plus` with `Trash2` at bottom-right, dark circular styling
  - [ ] Preserve scroller, arrows, `Add Facade` button, hover scale
  - [ ] Remove now-unused imports (`Badge`, `Clock`)

## Phase 2 — Verification

- [ ] `bun run typecheck`
- [ ] `bun run lint`
- [ ] Browser: `/dashboard/templates/display-center-detail/variant-1` floor-plan + facade cards visually match `/dashboard/templates/display-center/variant-7`
- [ ] `preview_snapshot` confirms no leftover `Version 1` / brand text in image regions
- [ ] No new console errors
- [ ] Human approval before commit
