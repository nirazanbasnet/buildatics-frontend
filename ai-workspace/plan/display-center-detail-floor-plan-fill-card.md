# Plan: Floor-Plan Fills the Entire Card (no inner wrapper, no inner padding)

## The problem (measured)

`FloorPlanPanel` currently has **two nested containers** and **116 px of unused vertical whitespace** inside the white card.

Measured on `/dashboard/templates/display-center-detail/variant-1` at 1280-px viewport (just before this plan):

| Element | Size | Notes |
| --- | --- | --- |
| Outer white card (`bg-card border rounded-xl p-3`) | **532 × 428** | Stretched by CSS grid to match the right column. |
| Specs + RoomDimensions (right column) | 426 × 428 | What forces the row height. |
| Inner gray wrapper (`h-72 rounded-md`) | 506 × **288** | Hard-coded `h-72` caps the image area. |
| Wasted vertical space inside the outer card | **116 px** | = 428 − 288 − 24 (`p-3` top + bottom). |

User intent (verbatim):

> "I don't want to wrap in another container. whole section is for the plan."

So we want **one** container, and the floor plan fills it.

## Root cause (file & line)

`src/app/dashboard/(auth)/templates/display-center-detail/_components/floor-plan-panel.tsx`:

```tsx
<div className="group bg-card relative overflow-hidden rounded-xl border p-3">   {/* outer card */}
  <div className="relative h-72 overflow-hidden rounded-md">                       {/* inner wrapper — capper */}
    <Image … className="h-full w-full bg-muted object-cover …" />
    {/* overlays */}
  </div>
</div>
```

Two things are wrong for this layout:

1. **Inner wrapper exists.** Its `h-72` caps the image at 288 px regardless of the grid row's height.
2. **Outer `p-3`** adds 12 px of `bg-card` halo on every side, also visible as whitespace.

## Architecture decisions

- **Drop the inner wrapper.** The outer card becomes the single container. (Matches the user's "I don't want to wrap in another container.")
- **Drop the outer `p-3`.** The image goes edge-to-edge inside the rounded border. Removes the visible halo. Overlays stay at `top-3 / right-3 / bottom-3` so they sit *inside* the rounded corner with comfortable spacing.
- **Keep `overflow-hidden rounded-xl border bg-card group`** on the outer panel. The card frame is still desirable as a visual unit; only the chrome inside is removed.
- **Image gets `h-full w-full object-cover`.** Width fills the column; height fills the stretched row. `bg-muted dark:bg-stone-100` stays as a fallback background.
- **Hover scale stays** (`transition-transform duration-500 group-hover:scale-105`).
- **Intrinsic dimensions stay** at `width={900} height={560}`.

### Crop geometry (verified upfront)

Once the inner wrapper is gone and `p-3` is dropped, the image container becomes the full outer panel ≈ 532 × 428 → **aspect 1.24**. Source PNG is **1.42**.

Under `object-cover`, the image scales to fit the **height** (404 px after `p-3` is dropped, or 428 if `p-3` is also dropped), and the **width overflows by ~32–34 px on each side → side crop**. This is the original outcome the user wanted ("side cropped to fit the height") — the wider-than-source container of the previous turn flipped to a taller-than-source container the moment we let it stretch.

### Outer card framing — open question

The user's red outline includes the bordered outer card. Two readings of "whole section is for the plan":

| Option | What it means | Visual |
| --- | --- | --- |
| **A. Keep border + rounded** | One container = the bordered card. Drop inner wrapper, drop `p-3`. Image is edge-to-edge inside the rounded border. | Same rounded card outline, plan fills it. |
| **B. Drop the card chrome entirely** | The grid cell itself is the plan. No border, no rounded corners, no `bg-card`. Image fills the cell directly with overlays on top. | Plan abuts the specs panel with no frame around it. |

**Recommendation: A.** The user circled the bordered card in their screenshot — they want the *area* inside that border filled, not the border deleted. Removing the border would un-match the visual weight of the specs panel next to it.

## Task list

### Phase 1: Decide

- [ ] Confirm Option A (keep border, drop inner + `p-3`) vs Option B (drop the whole card chrome).

### Phase 2: Implement

#### Task 1: Collapse FloorPlanPanel to a single container that the image fills

**Description.** Remove the inner `<div className="relative h-72 …">` wrapper. Remove `p-3` from the outer panel. Move the `<Image>` and the three overlay blocks (brand pill, zoom/share stack, delete button) to be direct children of the outer card. Image fills `h-full w-full object-cover` and stretches with the grid row.

**Acceptance criteria.**
- [ ] `FloorPlanPanel` returns one `<div>` (the outer card) with the image and three overlays as direct children — no nested wrapper.
- [ ] Outer panel className: `group bg-card relative overflow-hidden rounded-xl border` (no `p-3`, no `h-72`).
- [ ] Image className: `h-full w-full bg-muted object-cover transition-transform duration-500 group-hover:scale-105 dark:bg-stone-100` with `width={900} height={560}`.
- [ ] Overlay positions unchanged: brand pill `absolute top-3 left-3`, zoom/share stack `absolute top-3 right-3 flex flex-col gap-2`, delete `absolute right-3 bottom-3`. Sizes/colors unchanged.
- [ ] No `min-h-*` or `h-*` constraint on the outer panel — grid stretching does the work.

**Verification.**
- [ ] `bun run typecheck` (preexisting `display-center-filter/variant-3` error excluded).
- [ ] `bun run lint`.
- [ ] `preview_eval` reports:
  - Outer panel and grid cell have the **same height** (no whitespace inside the card).
  - Image rendered width === panel width and image rendered height === panel height.
  - `objectFit === "cover"`.
- [ ] Visual snapshot: no `bg-card` halo around the plan inside the card; overlays sit comfortably inside the rounded border at 12 px from each edge.

**Dependencies.** Phase 1 decision.

**Files touched.**
- `src/app/dashboard/(auth)/templates/display-center-detail/_components/floor-plan-panel.tsx`

**Scope.** XS (1 file, ~10 LOC delta).

### Checkpoint: After Task 1

- [ ] Plan visually fills the entire card; no internal whitespace.
- [ ] Specs / RoomDimensions panel unchanged.
- [ ] AvailableFacades unchanged.
- [ ] Human approval before commit.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| When the right column is *shorter* than the source's natural height (e.g. mobile, narrow viewports), the floor-plan card collapses to ~zero | Medium | Add a sensible `min-h-72` (or similar) to the outer panel as a floor. Flag in implementation. |
| Overlay buttons sit close to the rounded corner and look cramped | Low | Existing `top-3 / right-3 / bottom-3` offsets are already comfortable on v7; same here. |
| Hover scale magnifies the crop noticeably | Low | v7 uses the same `1.05` scale without complaints. |
| Side crop is too aggressive on certain viewport sizes | Medium | Crop depends on row height (driven by the right column). On larger viewports the card grows even taller and crop increases. Revisit if it gets ugly. |

## Out of scope (explicitly)

- `available-facades.tsx`, `detail-tabs.tsx`, `detail-header.tsx`, specs/room-dim tables.
- Removing the rounded border / converting the card to "no chrome" (only on the table if Option B is chosen).
- Fixing the preexisting `display-center-filter/variant-3` typecheck error.

## Open questions

1. Outer card chrome — keep (A) or drop (B). (Resolved per user response.)
