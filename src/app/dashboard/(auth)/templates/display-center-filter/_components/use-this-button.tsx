"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import type { FilterVariantId } from "./variants";

export function UseThisButton({ variant }: { variant: FilterVariantId }) {
  const router = useRouter();

  function applyFilter() {
    document.cookie = `display_center_filter_enabled=true; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `display_center_filter_variant=${variant}; path=/; max-age=31536000; SameSite=Lax`;
    toast.success(`Filter ${variant.toUpperCase()} promoted`, {
      description: "The Filter button on /dashboard/display-center now uses this layout."
    });
    router.push("/dashboard/display-center");
    router.refresh();
  }

  return (
    <Button size="sm" className="h-8" onClick={applyFilter}>
      <Check className="size-4" />
      Use this on Display Center
    </Button>
  );
}
