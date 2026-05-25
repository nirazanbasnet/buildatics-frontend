# Plan: Match Display Center Detail (variant-1) Image Overlays to Display Center (variant-7)

## Overview

Bring the floor-plan image and the available-facade images on `/dashboard/templates/display-center-detail/variant-1` in line with the property-card overlay style used on `/dashboard/templates/display-center/variant-7`:

- One **dark black-translucent pill** at top-left: `ITI · V1.0` (brand acronym + version).
- A **vertical stack of two dark circular icon buttons** at top-right: `ZoomIn`, `Share2`.
- Remove the existing **light** bottom-left brand badge and bottom-right `Clock` "Version 1" badge — their content is consolidated into the single top-left pill.

This is a purely visual harmonisation. No data model, props, or routing changes.

## Source of Truth

`src/app/dashboard/(auth)/templates/display-center/_components/property-card-v7.tsx` lines 74–98:

```tsx
<span
  data-slot="brand-tag"
  className="absolute top-3 left-3 rounded-lg bg-black/50 px-3 py-1 text-xs font-medium tracking-wider text-white backdrop-blur"
>
  {brandTag} · V{property.version}
</span>
<div className="absolute top-3 right-3 flex flex-col gap-2">
  <Button size="icon" variant="secondary" onClick={stop}
    className="size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70">
    <ZoomIn className="size-4" />
  </Button>
  <Button size="icon" variant="secondary" onClick={stop}
    className="size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70">
    <Share2 className="size-4" />
  </Button>
</div>
```

Where `brandTag = property.brand.slice(0, 3).toUpperCase()` (line 38) — gives `"ITI"` for `"ITI"`.

## Targets

| File | Current overlay | Required change |
| --- | --- | --- |
| `src/app/dashboard/(auth)/templates/display-center-detail/_components/floor-plan-panel.tsx` | Top-left: `Trash2` (light). Top-right: zoom/share (**light** `bg-background/80`). Bottom-left: brand badge. Bottom-right: `Clock` + `Version N` badge. | Replace zoom/share with dark v7 style. Add dark top-left pill `ITI · V1.0`. Remove both bottom badges. Decide what to do with `Trash2` (see open question). |
| `src/app/dashboard/(auth)/templates/display-center-detail/_components/available-facades.tsx` | Top-left: rotated `Plus` delete (light). Top-right: zoom/share (**light**). Bottom-left: brand badge. Bottom-right: `Clock` + `Version N` badge. | Same as above. `Delete facade` button has same placement conflict. |

## Architecture Decisions

- **No new shared component.** The overlay block is ~30 LOC and used in only two places. CLAUDE.md rule #2 (no premature abstractions) applies — copy the pattern, don't extract.
- **Use the same `brandTag` derivation as v7** (`property.brand.slice(0, 3).toUpperCase()`) — keeps the two views consistent if `property.brand` ever stops being a 3-letter string.
- **Keep tokens.** Variant-7 uses `bg-black/50` + `text-white` — that's already a hardcoded overlay convention in the kit (used for image-overlay UI where translucency over arbitrary photos rules out semantic tokens). Match it exactly rather than invent a token.
- **No animation/motion changes.** Existing `Section` motion wrappers in `detail-layout.tsx` stay untouched.

## Decision (resolved)

**Delete button → Option B:** single dark circular `Trash2` button at bottom-right of each image (floor plan and each facade card), styled `size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70` to match the zoom/share buttons. Keeps the delete affordance without colliding with the new top-left brand pill.

For the facade cards, the existing `aria-label="Delete facade"` button (rotated `Plus`) becomes a `Trash2` for visual consistency.

## Task List

### Phase 1: Implementation

#### Task 1: Restyle `FloorPlanPanel` overlay

**Description:** Replace the floor-plan image overlay in `floor-plan-panel.tsx` so it matches v7: dark top-left brand pill, dark top-right zoom/share stack, remove bottom badges. Re-place the delete button per Phase 1 decision.

**Acceptance criteria:**
- [ ] Top-left shows a single dark pill: `{brand.slice(0,3).toUpperCase()} · V{version}` (e.g. `ITI · V1.0`).
- [ ] Top-right shows a vertical stack of two `size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70` buttons containing `ZoomIn` then `Share2`.
- [ ] Both bottom badges (`brand` and `Clock + Version N`) are removed.
- [ ] Delete button repositioned: dark circular `Trash2` at bottom-right (`size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70`).
- [ ] No remaining import of `Badge`, `Clock` (unless still used by Trash2 area).
- [ ] No semantic-token regressions elsewhere in the file.

**Verification:**
- [ ] `bun run typecheck` passes.
- [ ] `bun run lint` passes.
- [ ] In browser at `/dashboard/templates/display-center-detail/variant-1`, the floor-plan overlay visually matches the v7 property-card overlay (compare side-by-side with `/dashboard/templates/display-center/variant-7`).
- [ ] `preview_snapshot` shows no `Version 1` / brand badge text in the floor-plan region.

**Dependencies:** None.

**Files touched:**
- `src/app/dashboard/(auth)/templates/display-center-detail/_components/floor-plan-panel.tsx`

**Scope:** XS (1 file, ~30 LOC delta)

---

#### Task 2: Restyle `AvailableFacades` card overlay

**Description:** Apply the same overlay pattern to each facade card inside `available-facades.tsx`. Pill uses each facade's property brand + version (currently the parent property's brand/version — keep that source unchanged unless Phase 1 also addresses per-facade versioning).

**Acceptance criteria:**
- [ ] Each facade card shows dark top-left pill: `{brand.slice(0,3).toUpperCase()} · V{version}`.
- [ ] Each facade card shows dark top-right zoom/share stack matching v7.
- [ ] Both bottom badges (`brand` and `Clock + Version N`) removed from each card.
- [ ] Delete button repositioned to bottom-right as dark circular `Trash2` (replacing the rotated `Plus`).
- [ ] Carousel scroll behaviour, arrow buttons, and `Add Facade` button are unchanged.
- [ ] Hover scale (`group-hover:scale-[1.03]`) on the image is preserved.

**Verification:**
- [ ] `bun run typecheck` passes.
- [ ] `bun run lint` passes.
- [ ] In browser, each facade card matches v7's visual treatment.
- [ ] Horizontal scroll arrows still work; `preview_click` on the right arrow advances the scroller.

**Dependencies:** None. Independent of Task 1 (can be done in parallel).

**Files touched:**
- `src/app/dashboard/(auth)/templates/display-center-detail/_components/available-facades.tsx`

**Scope:** XS (1 file, ~30 LOC delta)

---

### Checkpoint: After Tasks 1 & 2

- [ ] `bun run typecheck` passes.
- [ ] `bun run lint` passes.
- [ ] Side-by-side visual comparison: detail variant-1 floor-plan + facade cards match v7 property card.
- [ ] No new console errors.
- [ ] No regressions in the rest of the detail layout (header, tabs, specifications table, room dimensions table).
- [ ] Human review and approval before committing.

## Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Delete-button placement (bottom-right) clashes with future bottom-row UI | Low — easy to revert | Single small circular button, won't crowd. Revisit if a bottom row is later added. |
| Dark overlay reduces contrast on light floor-plan images (white SVG plans) | Medium — top-left pill could disappear over white | The pill uses `bg-black/50` not pure transparent, so it stays visible. v7 already proves this works on the same images. |
| Removing `Clock`/`Badge` imports breaks unrelated code in the same file | Low | Verify with `bun run typecheck` after each task. |
| `availableFacades` data has no per-facade `brand`/`version` — pill would say the same thing on every card | Low — design intent | Confirmed: existing code already uses parent `property.brand` + `property.version` for every card. No behaviour change. |

## Open Questions

None — delete placement resolved (Option B).

## Parallelization

Task 1 and Task 2 are independent files and can run in parallel.
