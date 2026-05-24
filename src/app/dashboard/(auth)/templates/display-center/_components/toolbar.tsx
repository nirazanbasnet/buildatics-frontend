"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Home, LayoutGrid, ListFilter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

import type { VariantId } from "./variant-layouts";

type Props = {
  activeVariant?: VariantId;
  mode?: "iteration" | "production";
};

const variantLabels: Record<number, string> = {
  1: "3-col grid",
  5: "Compact list",
  6: "Showcase",
  7: "Spec grid"
};

export function Toolbar({ activeVariant, mode = "iteration" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") === "floor" ? "floor" : "facade";

  function setView(next: string) {
    if (!next) return;
    const params = new URLSearchParams(searchParams.toString());
    if (next === "facade") params.delete("view");
    else params.set("view", next);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  function applyVariant(n: VariantId) {
    document.cookie = `display_center_variant=${n}; path=/; max-age=31536000; SameSite=Lax`;
    router.push("/dashboard/display-center");
    router.refresh();
  }

  return (
    <div className="space-y-3 pb-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Beds</span>
          <Badge variant="default" className="h-7 gap-1 rounded-full py-1 pr-1 pl-3">
            2 Beds
            <Button variant="ghost" size="icon" className="size-5 rounded-full hover:bg-white/20">
              <X className="size-3" />
            </Button>
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <ListFilter className="size-4" />
            Filter
          </Button>
          <ToggleGroup type="single" value={view} onValueChange={setView} className="h-9">
            <ToggleGroupItem variant="outline" value="facade" className="h-9 px-3">
              <Home className="size-4" />
              Facade View
            </ToggleGroupItem>
            <ToggleGroupItem variant="outline" value="floor" className="h-9 px-3">
              <LayoutGrid className="size-4" />
              Floor Plan View
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {mode === "iteration" && activeVariant ? (
        <div className="border-border bg-muted/40 flex flex-wrap items-center gap-1 rounded-md border p-1">
          <span className="text-muted-foreground px-2 text-xs font-medium uppercase">Layout</span>
          {([1, 5, 6, 7] as const).map((n) => (
            <Button
              key={n}
              asChild
              variant={n === activeVariant ? "default" : "ghost"}
              size="sm"
              className={cn("h-7", n !== activeVariant && "text-muted-foreground")}
            >
              <Link href={`/dashboard/templates/display-center/variant-${n}`}>
                V{n} · {variantLabels[n]}
              </Link>
            </Button>
          ))}
          {activeVariant !== 7 ? (
            <div className="ms-auto">
              <Button size="sm" className="h-7" onClick={() => applyVariant(activeVariant)}>
                <Check className="size-4" />
                Use this on Display Center
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
