# Todo: 5 New Layout Variations of v7

Linked plan: [../plan/display-center-detail-5-layouts.md](../plan/display-center-detail-5-layouts.md)

## Phase 0 — Decisions (resolved)

- [x] **V8 hero treatment**: title + description below the hero image (safer, more readable)
- [x] **V9 facade thumbs**: decorative for v1 (no click behavior)
- [x] **Stat card icons**: Lucide defaults — `Ruler`, `Box`, `Home`, `BedDouble`
- [x] **Beds/Baths card**: 4 cards total (Beds + Baths combined into one card)

## Phase 1 — Refactor (must finish first)

- [ ] **Task 0**: extract current `DetailLayout` JSX into `_components/layouts/layout-default.tsx`. Add `layout` field to `DetailVariantConfig`. Add `layoutComponents` registry. `DetailLayout` becomes dispatcher. **No visual change** for v1–v7.

## Phase 2 — New layouts (parallelizable after Task 0)

- [ ] **Task 1 — V8 Hero & Sticky Specs** (`layout-hero-sticky.tsx` + `variant-8/page.tsx` + variants.ts)
- [ ] **Task 2 — V9 Workspace 3-col** (`layout-workspace.tsx` + `variant-9/page.tsx` + variants.ts)
- [ ] **Task 3 — V10 Editorial Vertical** (`layout-editorial.tsx` + `variant-10/page.tsx` + variants.ts)
- [ ] **Task 4 — V11 Spec-First Headline** (`layout-spec-first.tsx` + `variant-11/page.tsx` + variants.ts)
- [ ] **Task 5 — V12 Combined Media** (`layout-combined-media.tsx` + `variant-12/page.tsx` + variants.ts)

## Phase 3 — Verification per task (checkpoint after each)

- [ ] `bun run typecheck` (modulo preexisting variant-3 filter error)
- [ ] `bun run lint`
- [ ] `preview_eval`: variant URL returns 200, key DOM structure matches spec
- [ ] End-to-end: set cookie `display_center_detail_variant=v<N>`, visit `/display-center`, click card → sheet renders new layout
- [ ] Responsive: snapshot at 1280 px and at ~896 px (sheet width)
- [ ] No new console errors
