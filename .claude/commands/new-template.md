---
description: Scaffold a new template iteration feature (V1 + Use This + production wiring + nav). Usage: /new-template Display Center Documents
---

You are scaffolding a new template iteration feature in this Buildatics project. Use this command's pattern carefully — it mirrors the existing `display-center-detail` and `display-center-filter` features. **Read `CLAUDE.md` and follow it strictly.**

## Argument

The user invoked you with: `$ARGUMENTS`

Treat `$ARGUMENTS` as the human-readable feature name (e.g. "Display Center Documents", "Project Settings", "Lead Inbox"). Derive a kebab-case **slug** from it (lowercase, hyphens, no quotes). Example: "Display Center Documents" → `display-center-documents`.

If `$ARGUMENTS` is empty, ask the user for the feature name first.

## Step 1 — Clarifying questions (BLOCKING)

Use the `AskUserQuestion` tool to confirm these before writing any code. Don't proceed without answers.

1. **Trigger pattern** — how does the feature appear on the production page?
   - **Sheet** (opens from a card click on an existing listing) — like `display-center-detail`
   - **Modal Sheet** (opens from a toolbar button) — like `display-center-filter`
   - **Standalone page** (a route the user navigates to) — like `display-center` itself
2. **Production page location** — where does this live in production?
   - `/dashboard/{slug}` (new top-level dashboard route)
   - Integrated into an existing page (which one? toolbar button? card click? where exactly?)
   - No production wiring yet (template iteration only — skip Step 5)
3. **Image / data sources** — does the user have a screenshot to provide? Should mock data live in `_data.ts`, or share data from an existing feature (e.g. `display-center/_data.ts`)?
4. **Use This persistence** — when "Use this on Display Center" (or the equivalent) is clicked:
   - Set a feature-enabled cookie + variant cookie (default — same as detail/filter)
   - Different persistence (file write, server action) — specify

After the user answers, **briefly summarize** your understanding and confirm before scaffolding. Adjust the plan based on their answers (e.g. skip Sheet wrapper if standalone page; skip production page if no wiring).

## Step 2 — Scaffold the template iteration folder

Create the following under `src/app/dashboard/(auth)/templates/{slug}/`:

```
{slug}/
├── _data.ts                          # If feature has mock data — types + arrays
├── _components/
│   ├── variants.ts                   # Variant id type + parser + variantLinks
│   ├── use-this-button.tsx           # Cookie-writing button (with toast + redirect)
│   ├── {feature}-layout.tsx          # V1 layout composition (or feature-specific names)
│   ├── {feature}-sheet.tsx           # If trigger=Sheet — wraps layout in <Sheet>
│   └── ...building blocks (header, table, gallery, etc. as needed)
├── variant-1/page.tsx                # The V1 iteration page (async; reads cookie for promotedVariant)
└── page.tsx                          # Cookie-aware redirect to promoted variant (default v1)
```

### Conventions to follow strictly

**File header for client components:**
```tsx
"use client";
```
Only when the component uses hooks, browser APIs, or event handlers. Default to Server Components.

**`variants.ts` template:**
```tsx
import type { VariantLink } from "../../_shared/variant-header";

export type {Feature}VariantId = "v1"; // extend to "v1" | "v2" later

export const {feature}VariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/{slug}/variant-1" }
];

export function parse{Feature}Variant(raw: string | undefined): {Feature}VariantId {
  return "v1"; // extend with `raw === "v2" ? "v2" : "v1"` when V2 lands
}
```

**`use-this-button.tsx` template** (cookie-based promotion):
```tsx
"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import type { {Feature}VariantId } from "./variants";

export function UseThisButton({ variant }: { variant: {Feature}VariantId }) {
  const router = useRouter();

  function apply() {
    document.cookie = `{slug_underscored}_enabled=true; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `{slug_underscored}_variant=${variant}; path=/; max-age=31536000; SameSite=Lax`;
    toast.success(`{Feature} ${variant.toUpperCase()} promoted`, {
      description: "It is now active on the production page."
    });
    router.push("{production_path}");
    router.refresh();
  }

  return (
    <Button size="sm" className="h-8" onClick={apply}>
      <Check className="size-4" />
      Use this on Display Center
    </Button>
  );
}
```

Replace `{slug_underscored}` with the slug using underscores (e.g. `display_center_documents`), and `{production_path}` with the production path the user gave you. If they said "no production wiring yet", make the button a no-op + toast that promotion isn't wired.

**`variant-1/page.tsx` template** (async, reads cookie for `promotedVariant`):
```tsx
import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { {Feature}Layout } from "../_components/{feature}-layout";
import { UseThisButton } from "../_components/use-this-button";
import { {feature}VariantLinks, parse{Feature}Variant } from "../_components/variants";

export default async function {Feature}Variant1Page() {
  const cookieStore = await cookies();
  const promoted = parse{Feature}Variant(cookieStore.get("{slug_underscored}_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="{Feature Title Case}"
        variant="V1"
        subtitle="<short subtitle the user provides, e.g. 'Two-column inline preview'>"
        variants={{feature}VariantLinks}
        activeVariant="v1"
        promotedVariant={promoted}
        action={<UseThisButton variant="v1" />}
      />
      <{Feature}Layout {...layout_props_with_mock_data} />
    </div>
  );
}
```

**Parent `page.tsx` template** (cookie-aware redirect):
```tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parse{Feature}Variant } from "./_components/variants";

export default async function {Feature}Index() {
  const cookieStore = await cookies();
  const variant = parse{Feature}Variant(cookieStore.get("{slug_underscored}_variant")?.value);
  const n = variant === "v2" ? 2 : 1;
  redirect(`/dashboard/templates/{slug}/variant-${n}`);
}
```

**Layout / building blocks:**
- Use design tokens only: `bg-card`, `bg-muted`, `bg-background`, `text-foreground`, `text-muted-foreground`, `border`, `bg-primary`, etc. **Never hex codes or named palette like `bg-red-500`.**
- Import shadcn primitives from `@/components/ui/...` (root kit). Do NOT copy them into `src/components/ui/` unless they need production-specific tweaks (the hardening flow in CLAUDE.md).
- Lucide icons from `lucide-react`.
- Subtle animations via `motion/react`: wrap each rendered section in a `Section` helper that does `initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay, ease: "easeOut" }}` — stagger sections 40ms apart.

**Sheet wrapper template** (only if trigger=Sheet):
```tsx
"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { {Feature}Layout } from "./{feature}-layout";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // ...whatever props the layout needs
};

export function {Feature}Sheet({ open, onOpenChange, ...props }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto p-6 sm:max-w-3xl lg:max-w-4xl">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>{Feature} details</SheetTitle>
            <SheetDescription>Detail view</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <{Feature}Layout {...props} />
      </SheetContent>
    </Sheet>
  );
}
```

Sheets always open from `side="right"` for consistency across the app.

## Step 3 — Mock data (when applicable)

If the user provided data values in the screenshot (e.g. labels, numbers, image URLs), encode them in `_data.ts` exactly. Use realistic Australian housing data style if the feature is property-related (see `display-center/_data.ts` for reference). Use local images from `/public/images/display-center/...` if appropriate; otherwise use Unsplash URLs with stable photo IDs.

## Step 4 — Production wiring (skip if user said no production wiring)

If trigger pattern is **Sheet on card click**:
- Update the relevant property card component to accept a `{feature}Enabled?: boolean` prop and conditionally render the Sheet
- Thread the prop through the variant layout
- Read the cookie in the production page; pass `{feature}Enabled` + `{feature}Variant` down

If trigger pattern is **Modal Sheet from toolbar button**:
- Add a button to the toolbar that opens the Sheet (gated by `{feature}Enabled` in production mode)
- Production page reads cookie, passes `{feature}Enabled` + `{feature}Variant` to the toolbar

If trigger pattern is **Standalone page**:
- Create `src/app/dashboard/(auth)/{slug}/page.tsx` that renders the V1 layout (or whichever variant is promoted via cookie)

## Step 5 — Sidebar nav entry

Edit `src/components/layout/sidebar/nav-main.tsx` and add the new entry under the `Templates → Templates` sub-items array. Use the kebab-case feature label (e.g. "Display Center Documents") and link to `/dashboard/templates/{slug}/variant-1`.

If a production route also exists, optionally add it to the production nav group too.

## Step 6 — Verify

Run these in order:
```bash
bun run typecheck
bun run lint
bun run build
```

All three must exit 0. If anything fails, fix it before declaring done.

## Step 7 — Report

Reply with:
- Brief summary of what was built
- File list (paths, no contents)
- Try-it instructions: navigation path + what to click to see the variant working

## Hard rules (from CLAUDE.md — non-negotiable)

- **Do exactly what was asked.** No drive-by refactors. No premature abstractions. No new dependencies.
- **TypeScript only** in `src/`. No `any` without justification.
- **No new comments** unless they explain *why* something non-obvious is true.
- **Server Components by default.** `"use client"` only when needed.
- **No `--no-verify`, no `git push`, no amends** unless the user explicitly asks.
- **Don't touch root `/components/`** for production-specific tweaks — copy into `src/components/` first (hardening flow).
- **Never delete `templates/{name}/`** without explicit user confirmation.
- **No extra UI.** If the user only described X, don't invent welcome cards, intro copy, or decorative tiles. Stick to what's in the screenshot / description.

## Reference implementations to learn from

When in doubt, mirror these existing features:
- **Sheet on card click** pattern: `src/app/dashboard/(auth)/templates/display-center-detail/`
- **Modal Sheet from toolbar** pattern: `src/app/dashboard/(auth)/templates/display-center-filter/` + `display-center/_components/filter-sheet.tsx`
- **Standalone listing page** pattern: `src/app/dashboard/(auth)/templates/display-center/` + production `src/app/dashboard/(auth)/display-center/page.tsx`
- **Shared variant header**: `src/app/dashboard/(auth)/templates/_shared/variant-header.tsx`

Read the relevant reference before writing — copy file structures and naming conventions exactly.
