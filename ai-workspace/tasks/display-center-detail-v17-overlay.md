# Todo: V17 — Editorial with overlaid Room Dimensions

Linked plan: [../plan/display-center-detail-v17-overlay.md](../plan/display-center-detail-v17-overlay.md)

## Phase 1 — Implementation

- [ ] **Task 1: Extend FloorPlanPanel with optional `children`** — `_components/floor-plan-panel.tsx`
  - [ ] Add `children?: ReactNode` to props
  - [ ] Render `{children}` inside the bordered container (after existing overlays)
  - [ ] No regression for V1/V7/V10/V16

- [ ] **Task 2: New `LayoutEditorialOverlay`** — `_components/layouts/layout-editorial-overlay.tsx`
  - [ ] Copy of `LayoutEditorial` minus `AvailableFacades` and standalone `RoomDimensionsTable` section
  - [ ] Pass `<RoomDimensionsTable className="bg-background/95 backdrop-blur max-w-xs shadow-lg absolute bottom-4 left-4" />` as child of `<FloorPlanPanel>`
  - [ ] Keep editorial title, hero, stat cards

- [ ] **Task 3: Register layout + v17 variant**
  - [ ] `_components/layouts/registry.ts` — add `"editorial-overlay"` to type + map
  - [ ] `_components/variants.ts` — add `v17` to type, configs (`{ theme: "v1", tabVariant: "icon-segmented", layout: "editorial-overlay" }`), links, validIds
  - [ ] `variant-17/page.tsx` — variant page wrapper

## Phase 2 — Verification

- [ ] `bun run typecheck` (modulo preexisting variant-3 filter error)
- [ ] `bun run lint`
- [ ] `/variant-17` returns 200
- [ ] `preview_eval`: Room Dimensions "Living Room" text appears inside the floor-plan container; `Available Facades` text absent on the page
- [ ] V1/V7/V10/V16 still render identical floor-plan markup (no regression from FloorPlanPanel changes)
- [ ] Cookie flow: set `display_center_detail_variant=v17` → display-center → click card → sheet renders v17 with overlay
- [ ] Human approval before commit
