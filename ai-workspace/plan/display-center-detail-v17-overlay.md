# Plan: V17 — Editorial with Room Dimensions overlay on the floor plan

## Goal

Add a new variant **v17** that is V10 (`editorial` layout, `icon-segmented` tabs) with two structural changes:

1. **Remove** the standalone `AvailableFacades` section.
2. **Overlay** the `RoomDimensionsTable` on the **bottom-left** of the floor-plan hero image instead of rendering it as a full-width section below the stat cards.

## Architecture decision

`FloorPlanPanel` is a closed component (image + 4 overlay nodes baked in). To add a new bottom-left overlay without duplicating its JSX into v17, **extend `FloorPlanPanel` with an optional `children` prop** that renders inside its bordered container (so the overlay inherits `overflow-hidden rounded-xl`). Backward-compatible: default no children means no change for V1/V7/V10/V16.

Alternative considered: inline the entire image+overlay JSX inside `layout-editorial-overlay.tsx`. Rejected — duplicates ~30 LOC and the brand pill / zoom / share / delete overlays for no gain.

## Files touched

| File | Change |
| --- | --- |
| `_components/floor-plan-panel.tsx` | Add optional `children?: ReactNode`, render inside the container. ~3 lines. |
| `_components/layouts/layout-editorial-overlay.tsx` (new) | Copy of `LayoutEditorial`, with `AvailableFacades` removed, standalone `RoomDimensionsTable` removed, RoomDimensionsTable rendered as `FloorPlanPanel` child positioned bottom-left. |
| `_components/layouts/registry.ts` | Add `"editorial-overlay"` to `DetailLayoutId`, register `LayoutEditorialOverlay`. |
| `_components/variants.ts` | Add `v17` to `DetailVariantId`, configs `{ theme: "v1", tabVariant: "icon-segmented", layout: "editorial-overlay" }`, links, validIds. |
| `variant-17/page.tsx` (new) | Standard variant page wrapper. |

## Overlay design defaults

- **Width**: `max-w-xs` (≈ 320 px). Fits 5 rows comfortably without dominating the image.
- **Position**: `absolute bottom-4 left-4`.
- **Background**: `bg-background/95 backdrop-blur` (mostly opaque with subtle blur for legibility against floor plans).
- **Card override**: existing `RoomDimensionsTable` accepts `className`. Pass `bg-background/95 backdrop-blur max-w-xs shadow-lg border` to override the default `bg-card`.
- **Z-index**: not needed — overlay is sibling to image inside the same container; later siblings paint on top.
- **Mobile**: at narrow viewports the floor plan is `min-h-72` (288 px). The overlay (~200 px tall) would cover ~70 % of the plan. Default: still shown; user can resize / scroll. If too cluttered, we can switch to `hidden lg:block` in a follow-up.

## Tabs / theme / hero kept from V10

- Tabs: `icon-segmented` (matches V10 after the recent tab change).
- Theme: `v1` (bg-card panels).
- Hero floor plan height: `min-h-72 sm:min-h-[28rem]` (same as V10).
- Editorial title (display font h2) + description: kept.
- 4 stat cards (Width / Depth / Area / Beds-Baths): kept.

## Out of scope

- Changing the `RoomDimensionsTable` component itself.
- Making `AvailableFacades` configurable to be hidden via prop (we just don't render it in v17).
- Responsive hiding of the overlay (default: always show, revisit if user finds it cluttered on mobile).

## Tasks

### Task 1: Extend `FloorPlanPanel` with optional `children`

**Acceptance criteria.**
- [ ] `FloorPlanPanel` accepts `children?: ReactNode`.
- [ ] Renders `{children}` as the last node inside the bordered container (after the existing overlays).
- [ ] No visual or behavioral change for existing variants (V1, V7, V10, V16) — they pass no children.

**Verification.**
- [ ] `bun run typecheck` clean.
- [ ] `bun run lint` clean.
- [ ] V1/V7/V10/V16 floor-plan area still renders identical to before (snapshot check).

**Files.** `_components/floor-plan-panel.tsx`.

**Scope.** XS.

### Task 2: New `LayoutEditorialOverlay`

**Acceptance criteria.**
- [ ] New file `_components/layouts/layout-editorial-overlay.tsx`.
- [ ] Renders: tabs → editorial title/description → hero `FloorPlanPanel` (with `RoomDimensionsTable` overlay as child) → 4 stat cards.
- [ ] Does NOT render `AvailableFacades`.
- [ ] Does NOT render the standalone `RoomDimensionsTable` section that V10 has.
- [ ] Room Dimensions overlay positioned `absolute bottom-4 left-4`, className override `bg-background/95 backdrop-blur max-w-xs shadow-lg` (overrides the default `bg-card`).
- [ ] Brand pill / zoom / share / delete overlays still visible on the floor plan (no regression).

**Verification.**
- [ ] `bun run typecheck` clean.
- [ ] `bun run lint` clean.

**Files.** `_components/layouts/layout-editorial-overlay.tsx`.

**Scope.** S.

### Task 3: Register the layout and add `v17`

**Acceptance criteria.**
- [ ] `DetailLayoutId` includes `"editorial-overlay"`.
- [ ] `layoutComponents["editorial-overlay"]` is `LayoutEditorialOverlay`.
- [ ] `DetailVariantId` includes `"v17"`.
- [ ] `detailVariantConfigs.v17 = { theme: "v1", tabVariant: "icon-segmented", layout: "editorial-overlay" }`.
- [ ] `detailVariantLinks` has V17 entry pointing to `/dashboard/templates/display-center-detail/variant-17`.
- [ ] `validIds` includes `"v17"`.
- [ ] `variant-17/page.tsx` exists, mirrors v10 page (`<DetailLayout variant="v17" />`, header label "V17", subtitle e.g. "Editorial with overlaid room dimensions").

**Verification.**
- [ ] `/variant-17` returns 200.
- [ ] Room Dimensions text appears overlaid on the floor plan (snapshot: confirm "Living Room" text present inside the floor-plan container).
- [ ] `AvailableFacades` text absent on the page.
- [ ] Standalone Room Dimensions Card outside the floor-plan area absent.
- [ ] V1/V7/V10/V16 unchanged.

**Files.** `_components/layouts/registry.ts`, `_components/variants.ts`, `variant-17/page.tsx`.

**Scope.** S.

## Checkpoint (after Task 3)

- [ ] `bun run typecheck` + `bun run lint` clean.
- [ ] `/variant-17` returns 200; overlay renders; no facades section.
- [ ] Cookie flow works: `display_center_detail_variant=v17` → `/dashboard/display-center` → click card → sheet renders V17.
- [ ] Variant header shows V1, V7, V10, V16, V17.
- [ ] Human approval before commit.

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Overlay obscures most of plan on mobile (h-72 = 288 px) | Medium | Default `max-w-xs` keeps it narrow; revisit with `hidden lg:block` if needed. |
| `bg-background/95` reads poorly on certain floor plans | Low | `backdrop-blur` + 95 % opacity is high enough. Adjust to `bg-background` (fully opaque) if needed. |
| Adding `children` to `FloorPlanPanel` accidentally changes V1/V7/V10/V16 | Low | Default is `undefined`; no overlay added. Verified by snapshot. |
| The overlay's `RoomDimensionsTable` has a default `bg-card` that needs overriding | Low | Pass override via existing `className` prop; tailwind-merge handles it. |

## Open questions

None — sensible defaults chosen. If overlay sizing/position/opacity feels off after the first render, iterate.
