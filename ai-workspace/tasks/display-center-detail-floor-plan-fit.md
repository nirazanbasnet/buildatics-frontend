# Todo: Fix Floor-Plan Rendering on Display Center Detail (variant-1)

Linked plan: [../plan/display-center-detail-floor-plan-fit.md](../plan/display-center-detail-floor-plan-fit.md)

**Decision locked:** `object-fit: cover` (Option A — accepts ~35 px top/bottom crop).

## Phase 1 — Implementation

- [ ] **Task 1: Fit floor-plan image to panel** — `src/app/dashboard/(auth)/templates/display-center-detail/_components/floor-plan-panel.tsx`
  - [ ] Drop inner `bg-background flex items-center justify-center` wrapper
  - [ ] Drop image `p-3`
  - [ ] Image dimensions → `width={900} height={560}`
  - [ ] Image className → `h-full w-full object-cover bg-muted dark:bg-stone-100` plus hover scale
  - [ ] Add `group` to outer panel, `group-hover:scale-105 transition-transform duration-500` to image
  - [ ] Preserve outer `bg-card rounded-xl border p-3` framing
  - [ ] Preserve all overlays (brand pill, zoom/share, delete) at current positions/styles
  - [ ] Remove now-unused imports if any

## Phase 2 — Verification

- [ ] `bun run typecheck` (modulo preexisting variant-3 error)
- [ ] `bun run lint`
- [ ] `preview_eval` confirms rendered image width === container width, `objectFit === "cover"`
- [ ] No new console errors
- [ ] Side-by-side visual vs `/dashboard/display-center?view=floor`
- [ ] Human approval before commit
