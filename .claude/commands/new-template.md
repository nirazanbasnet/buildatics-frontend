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
3. **Nav placement** — is this a brand-new top-level feature, or does it belong under an existing nav section (e.g. "Preconstruction List" under an existing "Preconstruction" group)?
   - **New top-level entry** — gets its own icon + position in the top nav group
   - **Sub-page under an existing section** — specify the parent (e.g. "Preconstruction"). The parent's top-level entry stays as-is; the new page is added to a sub-items list under it. See the nesting note in Step 5.
4. **Image / data sources** — does the user have a screenshot to provide? Should mock data live in `_data.ts`, or share data from an existing feature (e.g. `display-center/_data.ts`)? **Don't wait silently for the next message** — if they hinted "I'll send a screenshot for X" or "for Y I'll provide later," ask in the same blocking round what to scaffold first vs defer.
5. **Use This persistence** — when "Use this on Display Center" (or the equivalent) is clicked:
   - Set a feature-enabled cookie + variant cookie (default — same as detail/filter)
   - Different persistence (file write, server action) — specify

After the user answers, **briefly summarize** your understanding and confirm before scaffolding. Adjust the plan based on their answers (e.g. skip Sheet wrapper if standalone page; skip production page if no wiring).

**Variants:** Always scaffold **two variants (V1 + V2)** by default — most features get iterated on, and a stub V2 page costs nothing now but saves the rename of `variants.ts` + the parent redirect later. Each variant is a **complete design** of the feature, not a display mode. If the feature has multiple display modes (e.g. list view vs card view), **both modes live inside each variant** — owned by the variant's layout via lifted state, with the toolbar's toggle as a controlled component. V1 and V2 then represent two different *visual treatments* of the same feature, each capable of toggling between its own list and card views.

There are three modes for V2's design content:

1. **User supplies V2 designs** (screenshots / mockups). Implement them literally, same as V1.

2. **User asks you to design V2 yourself** ("design V2 from your side", "create a V2 so I can compare", "make me 2 variants so I can pick"). In this case, treat V2 as a real, polished alternative — **not a placeholder**. Make V2 differ from V1 in *at least 3* of these levers, so the comparison is meaningful:
   - **Layout shape** (e.g. V1 traditional table → V2 row cards / list of horizontal blocks)
   - **Density** (e.g. V1 3-col card grid → V2 4-col denser grid, or vice versa)
   - **Status treatment** (e.g. V1 solid pill with chevron → V2 colored dot + label, or left-edge color stripe)
   - **Progress visualization** (e.g. V1 horizontal bar → V2 circular progress ring, segmented bar, or % with caption)
   - **Icon treatment** (e.g. V1 lucide icons in rounded-square backgrounds → V2 no icon backgrounds, smaller inline icons)
   - **Typography hierarchy** (e.g. V1 leads with project name → V2 leads with status; V1 sentence-case labels → V2 uppercase tracked labels)
   - **Information ordering** (different field ordering, grouping, or which info gets visual weight)
   Both V1 and V2 must follow the design system: tokens only (no hex), shadcn primitives, accessible markup, named exports, `className` forwarded, etc.

3. **User says "just V1 for now"** — skip V2 entirely.

If you're scaffolding V1 from a screenshot but the user hasn't decided on V2 yet (no designs, no design request), default to *mode 2 stubs*: scaffold V2's per-mode building blocks (`{feature}-table-v2.tsx`, `{feature}-cards-v2.tsx`, etc.) as **clearly-marked "design pending" stubs** that still render the data in a visually-distinct, minimal way — never a copy-paste of V1. Include a dashed-border banner like `<p className="text-muted-foreground rounded-md border border-dashed px-3 py-2 text-xs">V2 list design — to be designed</p>` at the top of each stub. Call this out in the report so the user knows V2 needs designs OR can ask you to design V2 yourself.

## Step 2 — Scaffold the template iteration folder

Create the following under `src/app/dashboard/(auth)/templates/{slug}/`:

```
{slug}/
├── _data.ts                          # If feature has mock data — types + arrays
├── _components/
│   ├── variants.ts                   # Variant id type + parser + variantLinks (v1 + v2 by default)
│   ├── use-this-button.tsx           # Cookie-writing button (with toast + redirect)
│   ├── {feature}-toolbar.tsx         # Shared toolbar — controlled (view + onViewChange props)
│   ├── {feature}-layout.tsx          # V1 layout composition (owns view state, switches body)
│   ├── {feature}-layout-v2.tsx       # V2 layout composition — even if a stub, scaffold the file
│   ├── {feature}-table.tsx           # V1 list-mode body (if feature has list view)
│   ├── {feature}-cards.tsx           # V1 card-mode body (if feature has card view)
│   ├── {feature}-table-v2.tsx        # V2 list-mode body — stub allowed, must be visually distinct
│   ├── {feature}-cards-v2.tsx        # V2 card-mode body — stub allowed, must be visually distinct
│   ├── {feature}-sheet.tsx           # If trigger=Sheet — wraps layout in <Sheet>
│   └── ...other building blocks (header, pagination, gallery, etc. as needed)
├── variant-1/page.tsx                # The V1 iteration page (async; reads cookie for promotedVariant)
├── variant-2/page.tsx                # The V2 iteration page (always scaffold; can render a stub layout)
└── page.tsx                          # Cookie-aware redirect to promoted variant (default v1)
```

The per-mode body files (`*-table.tsx`, `*-cards.tsx`, etc.) only exist when the feature actually has multiple display modes. For a single-mode feature (e.g. just a detail layout, no toggle), skip the body splits and put the content directly in `{feature}-layout.tsx`.

### Conventions to follow strictly

**File header for client components:**
```tsx
"use client";
```
Only when the component uses hooks, browser APIs, or event handlers. Default to Server Components.

**`variants.ts` template** (V1 + V2 by default):
```tsx
import type { VariantLink } from "../../_shared/variant-header";

export type {Feature}VariantId = "v1" | "v2";

export const {feature}VariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/{slug}/variant-1" },
  { id: "v2", label: "V2", href: "/dashboard/templates/{slug}/variant-2" }
];

export function parse{Feature}Variant(raw: string | undefined): {Feature}VariantId {
  return raw === "v2" ? "v2" : "v1";
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

**`variant-2/page.tsx` stub** (when V2 design hasn't been provided — render V1's layout so the page works, and leave a comment marker for future iteration):
```tsx
import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { {Feature}Layout } from "../_components/{feature}-layout";
import { UseThisButton } from "../_components/use-this-button";
import { {feature}VariantLinks, parse{Feature}Variant } from "../_components/variants";

export default async function {Feature}Variant2Page() {
  const cookieStore = await cookies();
  const promoted = parse{Feature}Variant(cookieStore.get("{slug_underscored}_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="{Feature Title Case}"
        variant="V2"
        subtitle="V2 — design pending"
        variants={{feature}VariantLinks}
        activeVariant="v2"
        promotedVariant={promoted}
        action={<UseThisButton variant="v2" />}
      />
      <{Feature}Layout {...layout_props_with_mock_data} />
    </div>
  );
}
```
When V2's design is provided, swap `{Feature}Layout` for a real `{Feature}LayoutV2` component (created in `_components/{feature}-layout-v2.tsx`).

**Layout / building blocks:**
- Use design tokens only: `bg-card`, `bg-muted`, `bg-background`, `text-foreground`, `text-muted-foreground`, `border`, `bg-primary`, etc. **Never hex codes or named palette like `bg-red-500`.**
- Import shadcn primitives from `@/components/ui/...` (root kit). Do NOT copy them into `src/components/ui/` unless they need production-specific tweaks (the hardening flow in CLAUDE.md).
- Lucide icons from `lucide-react`.
- Subtle animations via `motion/react`: wrap each rendered section in a `Section` helper that does `initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay, ease: "easeOut" }}` — stagger sections 40ms apart.

**Toolbar consistency (filter chips + view toggle):**
The Display Center toolbar at `src/app/dashboard/(auth)/templates/display-center/_components/toolbar.tsx` is the canonical pattern — mirror it whenever your feature needs a filter chip row + view switcher so the whole app looks like one system. Specifically:
- **Active filter chips:** `<Badge variant="default" className="h-7 gap-1 rounded-full py-1 pr-1 pl-3">` containing the label + a `<Button variant="ghost" size="icon" className="size-5 rounded-full hover:bg-white/20">` with `<X className="size-3" />`. The chip is preceded by a `<span className="text-muted-foreground text-sm">` label (e.g. `Status`, `Beds`).
- **View toggles / segmented controls:** use `<ToggleGroup type="single">` with `<ToggleGroupItem variant="outline" className="h-9 px-3">` children. Do NOT roll your own bordered button row.
- **Action buttons (Filter, etc.):** `<Button variant="outline" size="sm" className="h-9">` with a leading lucide icon.

**Toolbar is a controlled component.** When the feature has list+card (or any other) display modes, the toolbar takes `view` + `onViewChange` props — the parent layout owns the state. Do NOT keep view state inside the toolbar; that prevents the layout from swapping the body in response. Example signature:

```tsx
export type {Feature}View = "list" | "card";
type ToolbarProps = { view: {Feature}View; onViewChange: (v: {Feature}View) => void };
```

The layout then does `const [view, setView] = useState<{Feature}View>("list")` and renders `view === "list" ? <Table /> : <Cards />` in the body section.

Read the Display Center toolbar before writing yours — copy the structure exactly unless you have a concrete reason to diverge.

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
      <SheetContent side="right" className="w-full overflow-y-auto p-6 sm:max-w-3xl lg:max-w-234">
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

Edit `src/components/layout/sidebar/nav-main.tsx`. The exact edits depend on whether the user said this is a **new top-level feature** or a **sub-page under an existing section** in Step 1.

### Case A — New top-level feature (default)

Three required edits:

1. **Templates submenu (always).** Add the new entry under the `Templates → Templates` sub-items array. Use the human-readable feature label (e.g. "Display Center Documents", "Preconstruction List") and link to `/dashboard/templates/{slug}/variant-1`.

2. **Top production nav group (when production route exists).** Add the entry to the first nav group (alongside Display Center) with `href: "/dashboard/{slug}"`. **Pick a distinct lucide icon** — do NOT reuse `Building2Icon` if it's already taken by Display Center. Skim `lucide-react` for a semantically fitting icon (e.g. `HardHatIcon` for preconstruction, `FolderIcon` for documents, `UsersIcon` for leads). Import it in the existing lucide-react import block at the top of the file.

3. **`useMinimal` allowlist (when production route exists).** The `useMinimal` boolean inside `NavMain()` decides whether to show the minimal nav (templates + reference) vs the full `referenceNavItems` mega-nav. Add the new production path so it gets the minimal nav too:

   ```ts
   const useMinimal =
     pathname === "/dashboard" ||
     pathname === "/dashboard/display-center" ||
     pathname === "/dashboard/{slug}" ||           // <-- add this line
     pathname.startsWith("/dashboard/templates/") ||
     pathname.startsWith("/dashboard/components");
   ```

   Skipping this will dump the entire dashboard reference nav onto your new page.

### Case B — Sub-page under an existing nav section

When the feature belongs under an existing parent (e.g. "Preconstruction List" / "Preconstruction Calendar" / "Preconstruction Documents" all under a "Preconstruction" parent):

1. **Templates submenu.** Same as Case A — add an entry under `Templates → Templates` with the full human-readable label including the parent name (e.g. "Preconstruction List", NOT just "List"), linked to `/dashboard/templates/{slug}/variant-1`.

2. **Top production nav group — convert the parent into a collapsible group.** The existing parent entry might currently be a flat link (e.g. `{ title: "Preconstruction", href: "/dashboard/preconstruction-list", icon: HardHatIcon }`). When a second sibling is added, convert it to a collapsible group by adding an `items: NavItem[]` array:

   ```ts
   {
     title: "Preconstruction",         // parent label — leave as-is, do NOT rename to include the child
     href: "/dashboard/preconstruction-list",  // can stay; the collapsible UI takes over rendering
     icon: HardHatIcon,
     items: [
       { title: "List",      href: "/dashboard/preconstruction-list" },
       { title: "Calendar",  href: "/dashboard/preconstruction-calendar" }, // new
     ]
   }
   ```

   The existing nav-main component (collapsible block) automatically handles dropdown + collapsible rendering when `items.length > 0`. The parent stays clickable in icon-collapsed mode via the existing DropdownMenu wrapper.

3. **`useMinimal` allowlist.** Add **every** child's production path:

   ```ts
   pathname === "/dashboard/preconstruction-list" ||
   pathname === "/dashboard/preconstruction-calendar" ||  // new
   ```

**Critical:** when the user said "main nav {parent} name is OK" or similar, **leave the parent's `title` field alone** — only the child's submenu label changes (e.g. nest "List" under existing "Preconstruction" instead of renaming the parent to "Preconstruction List").

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
