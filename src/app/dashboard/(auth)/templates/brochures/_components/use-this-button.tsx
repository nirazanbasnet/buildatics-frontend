"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import type { BrochuresVariantId } from "./variants";

export function UseThisButton({ variant }: { variant: BrochuresVariantId }) {
  const router = useRouter();

  function applyBrochures() {
    document.cookie = `brochures_enabled=true; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `brochures_variant=${variant}; path=/; max-age=31536000; SameSite=Lax`;
    toast.success(`Brochures ${variant.toUpperCase()} promoted`, {
      description: "It is now active on /dashboard/brochures."
    });
    router.push("/dashboard/brochures");
    router.refresh();
  }

  return (
    <Button size="sm" className="h-8" onClick={applyBrochures}>
      <Check className="size-4" />
      Use this on Brochures
    </Button>
  );
}
