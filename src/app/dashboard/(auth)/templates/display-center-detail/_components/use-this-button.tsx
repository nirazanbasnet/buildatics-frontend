"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import type { DetailVariantId } from "./variants";

export function UseThisButton({ variant }: { variant: DetailVariantId }) {
  const router = useRouter();

  function applyDetail() {
    document.cookie = `display_center_detail_enabled=true; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `display_center_detail_variant=${variant}; path=/; max-age=31536000; SameSite=Lax`;
    toast.success(`Detail ${variant.toUpperCase()} promoted`, {
      description: "Cards on /dashboard/display-center will now open this layout."
    });
    router.push("/dashboard/display-center");
    router.refresh();
  }

  return (
    <Button size="sm" className="h-8" onClick={applyDetail}>
      <Check className="size-4" />
      Use this on Display Center
    </Button>
  );
}
