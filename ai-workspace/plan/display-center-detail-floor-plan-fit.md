# Plan: Fix Floor-Plan Rendering on Display Center Detail (variant-1)

## The problem

On `/dashboard/templates/display-center-detail/variant-1`, the floor plan renders **small and centered with a large halo of whitespace** instead of filling its panel. Compare to `/dashboard/display-center?view=floor` (Variant 7 floor view) where the plan fills the card edge-to-edge.

## Root cause (file & line evidence)

`src/app/dashboard/(auth)/templates/display-center-detail/_components/floor-plan-panel.tsx` lines 19–27:

```tsx
<div className="bg-background relative flex h-72 items-center justify-center overflow-hidden rounded-md dark:bg-stone-100">
  <Image
    src={property.floorPlan}
    alt={`${property.title} floor plan`}
    width={900}
    height={900}                          // square dimensions
    className="h-full w-full object-contain p-3"  // contain + extra padding
  />
  …
</div>
```

Three forces shrink the image:

1. **`object-contain`** — image is letterboxed to preserve its natural aspect (1.42:1 landscape source). Inside a `h-72` (~288 px tall) container that is much wider than tall in this layout column, the image fits to height, leaving large left/right blanks.
2. **`p-3` on the image itself** — adds another ~12 px ring of inset.
3. **`width={900} height={900}` square dimensions** passed to `next/image` — wrong intrinsic aspect ratio hint (source PNGs are 3000×2118 ≈ 1.417, not square).

By contrast, `property-card-v7.tsx` line 62–71 (the v7 reference):

```tsx
<Image
  src={src}
  alt={…}
  width={900}
  height={560}                                  // landscape dimensions (~1.61)
  className={cn(
    "h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105",
    view === "floor" && "bg-muted dark:bg-stone-100"
  )}
/>
```

`object-cover`, landscape dimensions, no internal padding, hover scale, group context — image fills the card.

## Source image facts (measured)

| File | Pixels | Natural aspect |
| --- | --- | --- |
| `PLAN_DP01_…png` | 3000 × 2118 | 1.417 |
| `PLAN_DP02_…png` | 3000 × 2118 | 1.417 |
| `PLAN_DP03_…png` | 4000 × 2825 | 1.416 |

All three are roughly **1.42:1 landscape**.

## Container facts (measured on v7 in browser)

| Variant | Cell width × height | Aspect | Under `object-cover` |
| --- | --- | --- | --- |
| v7 plan card (3-col grid) | 309 × 288 | **1.07** | crops ~25 % off image **sides** |
| v1 plan panel (5fr cell in 5fr / 4fr split) | ~544 × 288 (typical 1280-px viewport) | **~1.89** | would crop ~25 % off image **top + bottom** |

This is the crux of the design question: copying v7's exact `object-cover` formula on the wider variant-1 cell **crops master-bedroom / driveway content**, because v7's container is narrower than the source whereas v1's is wider. The two cards solve different geometry.

## Architecture decisions

- **Single file change.** Only `floor-plan-panel.tsx` is touched. No abstraction extracted — same reasoning as the previous task (only one consumer per component).
- **Keep the outer `bg-card rounded-xl border p-3` panel chrome** — it gives the floor-plan column visual parity with the sibling `SpecificationsTable` / `RoomDimensionsTable` panels in the side-by-side grid. The user said "match only plan section," not "rebuild the whole frame".
- **Drop the inner `bg-background … flex items-center justify-center` wrapper** — it exists only to letterbox the contained image; once the image fills the area, the wrapper is dead chrome.
- **Carry over v7's `bg-muted dark:bg-stone-100`** for the image background — visible only where letterboxing or transparency exposes it.
- **Carry over v7's hover scale (`group-hover:scale-105 transition-transform duration-500`)** — gives the same tactile feel as v7. The overlay buttons must stop event propagation if we make the whole tile clickable later (not in scope).
- **Re-issue `width={900} height={560}`** to match v7's intrinsic-aspect hint and unblock browser fast-path layout.

## Decision (resolved)

**`object-fit: cover`** (Option A — exact v7 parity). Drop the image `p-3`, drop the inner centred-flex wrapper. The plan fills the `h-72` panel edge-to-edge. Geometry: container 506×288 (1.76) vs source 1.42 → image scales to fill width, ~35 px crops off **top and bottom** (some alfresco / driveway lost). User accepts this trade-off in exchange for the "filled panel" look.

## Task list

### Phase 1: Implement

#### Task 1: Fit the floor-plan image to its panel (matches v7 styling, `object-cover`)

**Description.** Replace the floor-plan area's inner letterbox wrapper with the v7 image pattern. Drop dead chrome (`flex items-center justify-center`, inner `bg-background`, image `p-3`). Carry over v7's intrinsic dimensions, `bg-muted dark:bg-stone-100` background, hover scale, and `group` context. Use `object-cover` (decision locked).

**Acceptance criteria.**
- [ ] Image renders at full panel width (no extra left/right margin from the `p-3` ring or `flex items-center` centering); thin `bg-muted` letterbox is acceptable.
- [ ] Image fits the `h-72` height of the panel.
- [ ] Image className includes `h-full w-full object-cover` and the intrinsic dims are `width={900} height={560}`.
- [ ] Image background is `bg-muted dark:bg-stone-100` (matches v7 floor view).
- [ ] Hover on the panel scales the image (`group` on outer, `group-hover:scale-105 transition-transform duration-500` on image).
- [ ] Overlays (brand pill top-left, zoom/share stack top-right, delete bottom-right) remain in identical positions and unchanged in style.
- [ ] No dangling unused imports.
- [ ] Outer `bg-card rounded-xl border p-3` panel framing is preserved (parity with sibling specs panels).

**Verification.**
- [ ] `bun run typecheck` shows no new errors (the preexisting `display-center-filter/variant-3` typecheck error is out of scope).
- [ ] `bun run lint` clean.
- [ ] In browser at `/dashboard/templates/display-center-detail/variant-1`:
  - [ ] `preview_eval` reports the floor-plan `img`'s rendered width === container width (within 1 px) and `objectFit === "cover"`.
  - [ ] No console errors related to next/image.
  - [ ] Visual: the plan fills the panel completely; no whitespace halo as in the user's screenshot.
- [ ] Side-by-side compare: `/dashboard/templates/display-center-detail/variant-1` vs `/dashboard/display-center?view=floor` — image area looks like the same component family (same background, overlays, hover scale).

**Dependencies.** None.

**Files touched.**
- `src/app/dashboard/(auth)/templates/display-center-detail/_components/floor-plan-panel.tsx`

**Scope.** XS (1 file, ~20 LOC delta).

### Checkpoint: After Task 1

- [ ] `bun run typecheck`, `bun run lint` clean (modulo the preexisting variant-3 error).
- [ ] Plan visually matches v7 family on the variant-1 page.
- [ ] No regression in `available-facades.tsx`, `detail-header.tsx`, `detail-tabs.tsx`, the specs panels, or the page redirect/index.
- [ ] Human approval before commit.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Top/bottom crop hides critical plan content (driveway, master) more than the ~35 px estimate suggests | Medium | Decision was made knowing the trade-off. If the rendered crop is worse than expected, switch to Option C (aspect-locked panel) in a follow-up. |
| `bg-muted` token differs in light/dark from `bg-background` and looks off in dark mode | Low | v7 already ships with this pair; verify in browser after the change. |
| Hover scale clips against the `overflow-hidden` panel and creates a jumpy edge | Low | v7 already uses the same pattern without issue; keep `overflow-hidden` on the inner container. |
| Removing the inner wrapper drops a stylistic boundary the user actually wanted | Low | Outer `bg-card rounded-xl border p-3` is preserved; only the second padded box is removed. |

## Out of scope (explicitly)

- Overlay restyle on facade cards (already done in previous task).
- Removing the outer panel framing.
- Refactoring `available-facades.tsx`, `detail-tabs.tsx`, `detail-header.tsx`, or other detail-page components.
- Fixing the preexisting `display-center-filter/variant-3` typecheck error (untracked, predates this branch).

## Open questions

None — object-fit resolved (`cover`).
