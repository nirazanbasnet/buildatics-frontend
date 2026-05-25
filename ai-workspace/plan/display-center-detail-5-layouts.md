# Plan: 5 New Layout Variations of v7

## Goal

Build five **layout-differentiated** variations of v7. Today, v8–v12 = same `DetailLayout` structure (tabs → header → 2-col floor-plan/specs → facades). New ones must:

- Use **distinct arrangements** of the same building blocks (DetailHeader, DetailTabs, FloorPlanPanel, SpecificationsTable, RoomDimensionsTable, AvailableFacades)
- Be **user-friendly** (clear hierarchy, scannable, large hit targets)
- Be **modern** (generous whitespace, soft shadows, sticky/responsive patterns, photo-first where it helps)
- **Work inside the DetailSheet** (max ~896 px wide) — must degrade or restack gracefully
- **Work end-to-end with "Use this on Display Center"** — the cookie chain (display-center → PropertyCardV7 → DetailSheet → DetailLayout) already supports any variant id, so no changes to that chain are needed

## Architecture decision

Today `DetailLayout` hard-codes the JSX structure. To support multiple layouts cleanly:

1. **Extract** the current JSX into `_components/layouts/layout-default.tsx`. Pure refactor — no behavior change. Used by v1, v2, v5, v6, v7.
2. **Add** a `layout: DetailLayoutId` field to `DetailVariantConfig`. Existing variants get `layout: "default"`.
3. **DetailLayout becomes a dispatcher**: looks up the layout component by id and renders it with `{ property, theme, tabVariant }`.
4. **Each new layout** lives in its own `_components/layouts/layout-*.tsx` file. Self-contained.

Each layout component receives:

```tsx
type LayoutProps = {
  property: Property;
  theme: DetailTheme;          // already resolved (panel/card/cardHeader/facadeCard class strings)
  tabVariant: DetailTabVariant;
  className?: string;
};
```

It composes `DetailTabs`, `DetailHeader`, `FloorPlanPanel`, `SpecificationsTable`, `RoomDimensionsTable`, `AvailableFacades` in its own arrangement. Theme classes are still applied so users can pair any layout with any theme later.

## The five new layouts

For all five: theme = v1 (`bg-card`) and tabVariant = "segmented" (matches v7's current pairing). Layout is the only differentiator.

### V8 — Hero & Sticky Specs

```
┌────────────────────────────────────────────────────────┐
│  ▒▒▒▒▒▒▒▒▒  Tabs (segmented)  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
├────────────────────────────────────────────────────────┤
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│  ░░          FLOOR PLAN HERO (h-96)          ░░░░░░░░░│
│  ░░    title + description overlay  ░░░░░░░░░░░░░░░░░░│
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
├────────────────────────────────────────┬───────────────┤
│  Room Dimensions                       │  📌 Specs     │
│  Facades carousel                      │  Room Dims    │
│  (scrolls)                             │  (sticky)     │
└────────────────────────────────────────┴───────────────┘
```

- Floor plan dominates as a full-width hero (`h-96`)
- Below: 2-col split — main content (rooms + facades) on the left, **sticky specs panel** on the right
- Specs stay visible while user scrolls — useful for cross-referencing
- **Inside the sheet:** `position: sticky` inside the sheet's scroll container works; verify in implementation
- Vibe: editorial hero + dashboard sidebar

### V9 — Workspace (Three-Column)

```
┌────────────────────────────────────────────────────────┐
│  Tabs (segmented)                                      │
├──────┬─────────────────────────────────┬───────────────┤
│      │                                 │  Specs        │
│ Fac. │       FLOOR PLAN                │               │
│ thmb │      (max viewport)             │  Room Dims    │
│ list │                                 │               │
│      │                                 │               │
└──────┴─────────────────────────────────┴───────────────┘
```

- 3-col grid: left rail of facade thumbnails (vertical, click to swap main image — for v1 scope we just render the rail), center holds the floor plan large, right has specs + rooms
- All visible without scrolling on desktop
- **Stacks to single column under ~lg** (sheet width)
- Vibe: CAD/design tool, power-user friendly

### V10 — Editorial Vertical

```
┌────────────────────────────────────────────────────────┐
│  Tabs (segmented)                                      │
├────────────────────────────────────────────────────────┤
│  Title (display font, large)                           │
│  Description (generous line-height)                    │
├────────────────────────────────────────────────────────┤
│  ░░░░░░░░░░░░░░░  HERO FLOOR PLAN  ░░░░░░░░░░░░░░░░░░│
├──────────┬─────────────┬──────────────┬───────────────┤
│  📏 W    │   📏 D      │   🏠 Area    │   🛏 Beds     │
│  12.5 m  │   30 m      │   25 sq      │   4           │
├──────────┴─────────────┴──────────────┴───────────────┤
│         Room Dimensions (full-width table)             │
├────────────────────────────────────────────────────────┤
│         Available Facades (carousel)                   │
└────────────────────────────────────────────────────────┘
```

- Photo-first, magazine-style vertical scroll
- Title + description headline at top
- Hero floor plan (h-[28rem] on desktop, h-72 in sheet)
- **Stat row**: 4 numeric cards (Width / Depth / Area / Beds) with icons, large numbers
- Room dimensions as a full-width table
- Facades at bottom
- Vibe: portfolio detail / marketing landing page

### V11 — Spec-First Headline

```
┌────────────────────────────────────────────────────────┐
│  Tabs (segmented)                                      │
├────────────────────────────────────────────────────────┤
│  Header (compact)                                      │
├────────────┬────────────┬────────────┬─────────────────┤
│  Min Width │ Min Depth  │ House Area │ Beds / Baths    │
│  12.5 m    │ 30 m       │ 25 sq      │ 4 / 2           │
├────────────┴────────────┴────────────┴─────────────────┤
│  FLOOR PLAN (6fr)              │  Room Dimensions (4fr)│
├────────────────────────────────┴───────────────────────┤
│  Available Facades                                     │
└────────────────────────────────────────────────────────┘
```

- Stats become the headline (buyers/architects often scan specs first)
- 4 big stat cards across the top with the actual values
- Below: 2-col split — floor plan (6fr) vs room dimensions (4fr)
- Facades bottom
- Vibe: dashboard-style, data-driven

### V12 — Combined Media + Compact Specs

```
┌────────────────────────────────────────────────────────┐
│  Tabs (segmented)                                      │
├────────────────────────────────────────────────────────┤
│  Header (compact)                                      │
├────────────────────────────────────┬───────────────────┤
│  ░░░ MEDIA PANEL ░░░░░░░░░░░░░░░░░│  Specs            │
│  ░░  Active: floor plan OR  ░░░░░░│                   │
│  ░░  selected facade        ░░░░░░│  Room Dimensions  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│                   │
│  Thumbnail rail: [plan][fac][fac] │                   │
└────────────────────────────────────┴───────────────────┘
```

- **Combines plan + facades into a single media panel** with a thumbnail rail at the bottom
- Right side: compact specs + rooms stack
- Eliminates the separate facade carousel — saves vertical space
- Click a thumbnail to swap the main image (state lives in the layout, client-side)
- Vibe: e-commerce product page, gallery-style

## Sheet (Use this on Display Center) considerations per layout

| Layout | Width feasibility in sheet (≤ 896 px) | Action |
| --- | --- | --- |
| V8 Hero+Sticky | Hero fine. Sticky needs `sticky` inside sheet's overflow-y-auto container — verify. | Test in implementation. |
| V9 Workspace 3-col | Tight at 896 px (left rail + center + right = ~280 / ~336 / ~280 px). | Stack to single column at `< lg`. |
| V10 Editorial | Stat row collapses 4→2 cols at `< md`. Vertical scroll natural. | Standard responsive. |
| V11 Spec-first | 4 stat cards across 896 px → ~210 px each. OK. Collapses to 2 at `< md`. | Standard responsive. |
| V12 Combined Media | 2-col split at 896 px feasible. | Stack at `< md`. |

All layouts will be **mobile-first responsive** and use Tailwind breakpoints (`sm`, `md`, `lg`).

## Variant header overflow concern

After this lands, the variant-switcher row will hold **10 tabs** (V1, V2, V5, V6, V7, V8, V9, V10, V11, V12). Today the row is a flex-wrap of buttons — it'll start wrapping at narrow widths. Acceptable for v1, but flagged as a follow-up to convert to a dropdown picker at >7 tabs.

## Tasks

Vertical-slice tasks. Each one delivers a working variant from cookie → page → sheet.

### Task 0: Refactor — extract current DetailLayout into `layouts/layout-default.tsx`

**Description.** Move current `DetailLayout` JSX into a new file `_components/layouts/layout-default.tsx` exporting `LayoutDefault({ property, theme, tabVariant, className })`. Add `layout: DetailLayoutId` to `DetailVariantConfig`, with all existing variants set to `layout: "default"`. `DetailLayout` becomes a dispatcher. **No visual change for v1–v7.**

**Acceptance criteria.**
- [ ] New file `_components/layouts/layout-default.tsx` contains the current JSX, signature `{ property, theme, tabVariant, className }`.
- [ ] `_components/layouts/registry.ts` exports `layoutComponents: Record<DetailLayoutId, LayoutComponent>`.
- [ ] `DetailVariantConfig` gains a `layout: DetailLayoutId` field.
- [ ] All five existing configs (v1, v2, v5, v6, v7) have `layout: "default"`.
- [ ] `DetailLayout` becomes a thin dispatcher that resolves `theme` + picks the layout component.
- [ ] All five existing variant URLs still render identically (snapshot/visual diff).

**Verification.**
- [ ] `bun run typecheck` clean (modulo preexisting variant-3 filter error).
- [ ] `bun run lint` clean.
- [ ] `preview_eval` confirms each existing variant URL returns 200 and DOM markup matches what it was before (sampling: FloorPlanPanel className, tablist className, Specifications card structure).

**Files touched:** `_components/detail-layout.tsx`, `_components/variants.ts`, `_components/layouts/layout-default.tsx` (new), `_components/layouts/registry.ts` (new).

**Scope:** S.

### Task 1: V8 — Hero & Sticky Specs

**Acceptance criteria.**
- [ ] Hero floor plan full-width, `h-72 sm:h-96`, image fills (object-cover).
- [ ] Title + description overlay (or directly below — implementor's call). Readable on the floor-plan image (semi-transparent background if overlay).
- [ ] Below hero: 2-col grid (`lg:grid-cols-[7fr_3fr]`). Left = `space-y-4` of room dimensions + available facades. Right = sticky specs panel (`sticky top-4`).
- [ ] Sticky works in the variant page (page-level scroll) AND inside the sheet (sheet-level scroll).
- [ ] Stacks to single column under `lg`.

**Files:** `_components/layouts/layout-hero-sticky.tsx` (new), `variant-8/page.tsx` (new), `_components/variants.ts` (add v8).

**Scope:** M.

### Task 2: V9 — Workspace (Three-Column)

**Acceptance criteria.**
- [ ] 3-col grid `lg:grid-cols-[200px_1fr_280px]`. Left = vertical facade thumbnail rail. Center = floor plan (h-full). Right = specs + rooms stacked.
- [ ] Facade thumbnails render the existing `availableFacades` data as 80–96 px square thumbs in a vertical scroller. Clicking does nothing yet (out of scope for v1; just visual).
- [ ] Stacks vertically under `lg`: facades top, floor plan middle, specs bottom.

**Files:** `_components/layouts/layout-workspace.tsx`, `variant-9/page.tsx`, `_components/variants.ts`.

**Scope:** M.

### Task 3: V10 — Editorial Vertical

**Acceptance criteria.**
- [ ] Header section: title in `font-display text-2xl sm:text-3xl`, description below in `text-base text-muted-foreground` with generous line-height.
- [ ] Hero floor plan full-width `h-72 sm:h-[28rem]`.
- [ ] Stat row: 4 cards (`grid-cols-2 sm:grid-cols-4`) — Min Block Width, Min Block Depth, House Area, Beds (or Beds/Baths). Each card: icon + large value + small label. Icons sourced from `lucide-react` (no new deps).
- [ ] Room Dimensions table full-width below the stat row.
- [ ] Facades carousel at the bottom (existing `AvailableFacades`).

**Files:** `_components/layouts/layout-editorial.tsx`, `variant-10/page.tsx`, `_components/variants.ts`.

**Scope:** M.

### Task 4: V11 — Spec-First Headline

**Acceptance criteria.**
- [ ] Standard header (existing `DetailHeader`, no override).
- [ ] Stat row: 4 cards (`grid-cols-2 md:grid-cols-4`) with the actual values pulled from `detailSpecs` + a `Beds / Baths` card pulled from `property.beds` and `property.baths`.
- [ ] Below: 2-col grid `lg:grid-cols-[6fr_4fr]` — FloorPlanPanel left, RoomDimensionsTable right.
- [ ] AvailableFacades full-width below.

**Files:** `_components/layouts/layout-spec-first.tsx`, `variant-11/page.tsx`, `_components/variants.ts`.

**Scope:** M.

### Task 5: V12 — Combined Media + Compact Specs

**Acceptance criteria.**
- [ ] Standard header.
- [ ] 2-col grid `lg:grid-cols-[7fr_5fr]`. Left = combined media panel. Right = specs + rooms stacked.
- [ ] Media panel: large primary image (floor plan by default), thumbnail rail of [floor plan, facade-1, facade-2, facade-3]. Clicking a thumbnail swaps the primary image (client state via `useState`).
- [ ] Active thumbnail has a visible ring (`ring-2 ring-foreground/40`).
- [ ] Overlays (brand pill, zoom/share/delete) remain on the primary image.

**Files:** `_components/layouts/layout-combined-media.tsx` (`"use client"` because of state), `variant-12/page.tsx`, `_components/variants.ts`.

**Scope:** M-L. The thumbnail swap state makes this the most complex.

## Checkpoint after each task

- [ ] `bun run typecheck` + `bun run lint` clean
- [ ] Variant URL returns 200
- [ ] Cookie flow works: set `display_center_detail_variant=v<N>`, visit `/dashboard/display-center`, click a card → sheet renders the new layout
- [ ] Visual snapshot at desktop (1280 px) AND in sheet (~896 px)
- [ ] No new console errors

## Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Sticky positioning misbehaves inside sheet's `overflow-y-auto` container | Medium (V8) | Verify in implementation; fall back to non-sticky at sheet widths if needed. |
| V9 three-column too cramped in sheet | Medium | Stack at `< lg` (sheet is ~896 px which is `< lg=1024` so it'll stack automatically). |
| V10/V11 stat rows: icon choices subjective | Low | Use sensible Lucide defaults (Ruler, Box, Home, BedDouble); flag for user feedback. |
| V12 thumbnail-swap state lives in the layout — sheet open/close should NOT reset the active image | Low | Default state on mount = floor plan. Acceptable behavior. |
| Variant header overflow with 10 tabs | Low | Existing `flex-wrap` handles it ugly-but-functional. Follow-up: convert to dropdown at >7. |
| Performance: importing Next.js Image 5×+ per layout file | Low | Next.js Image is tree-shaken and uses native lazy loading. No issue. |

## Out of scope (defer)

- Functional tabs (Documents/Projects/Estimation/Tasks tabs switching content) — could be a separate effort.
- Variant header dropdown at >7 variants.
- Variant-specific themes (all 5 use theme=v1 + tabVariant=segmented; future could remix).
- Real facade image swapping in V9 (the rail is decorative-only in this scope).

## Open questions

1. **V8 hero treatment**: overlay title/description on the image (dramatic) or place them in a header card below the hero (safer)?
2. **V9 facade thumbnails**: clickable to swap main image, or decorative? (Default: decorative for v1; matches "out of scope" above.)
3. **V10/V11 stat cards icons**: OK with default Lucide picks (Ruler, Box, Home, BedDouble)?
4. **Beds / Baths card in V10/V11**: separate cards (5 cards total) or combined ("4 / 2") into one (4 cards total)?
