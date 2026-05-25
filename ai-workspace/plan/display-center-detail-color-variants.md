# Plan: 3 Color Variants of Display Center Detail (Muted Soft family)

## Goal

Add `variant-2`, `variant-3`, `variant-4` of `/dashboard/templates/display-center-detail` — same layout as variant-1, three different surface treatments inside the "Muted Soft" theme family.

## Sub-flavors

| Variant | Subtitle | Surfaces (panels, header, tables, facades) | Inset (spec values) | Lift |
| --- | --- | --- | --- | --- |
| **v2** | Muted soft surfaces | `bg-muted` (replaces `bg-card`) | `bg-background/60` | none |
| **v3** | Muted + accent zones | `bg-muted` | `bg-accent` (warmer contrast) | none |
| **v4** | Muted + soft lift | `bg-muted` + `rounded-2xl` + `shadow-sm`/`-xs` + `border-transparent` | `bg-background/60` | yes |

All overlays (image-overlay buttons, brand pills) stay the dark `bg-black/50` family — image-overlay convention is constant.

## Architecture

- **One theme map** (`_components/themes.ts`) — `DetailThemeId` and `detailThemes` of `{ panel, card, specInset, facadeCard }` className strings per id.
- **DetailLayout accepts `theme?: DetailThemeId = "v1"`** and threads the right `className` strings into children. v1 = empty overrides (no change).
- **Touched components** add `className` / per-slot props where missing:
  - `floor-plan-panel.tsx` — already accepts `className`.
  - `specifications-table.tsx` — add `insetClassName`.
  - `room-dimensions-table.tsx` — already accepts `className`.
  - `detail-header.tsx` — add `className`.
  - `available-facades.tsx` — add `cardClassName` for per-facade override.
- **No changes to DetailTabs** (kept constant across variants).
- **Each variant page** is variant-1 + 2 line diff (variant label, subtitle, theme).

## Out of scope (defer)

- Re-threading the `display_center_detail_variant` cookie → display-center detail-sheet so the sheet reflects the chosen variant (would require re-adding the prop chain I removed in the v2-removal task). The "Use this on Display Center" toast will say "promoted" but the sheet currently always renders v1 — flag in the summary.

## Tasks

- [ ] Create `_components/themes.ts` with `DetailThemeId` and 4-entry theme map.
- [ ] Update `_components/variants.ts` — expand `DetailVariantId` to `"v1" | "v2" | "v3" | "v4"`, add 3 links, real `parseDetailVariant`.
- [ ] Add `className` prop to `detail-header.tsx`.
- [ ] Add `insetClassName` prop to `specifications-table.tsx`.
- [ ] Add `cardClassName` prop to `available-facades.tsx`.
- [ ] Update `detail-layout.tsx` to accept `theme` prop and thread classNames.
- [ ] Create `variant-2/page.tsx`, `variant-3/page.tsx`, `variant-4/page.tsx`.
- [ ] Verify: `bun run typecheck`, `bun run lint`, navigate to all four variants via `preview_eval`, snapshot diff.
