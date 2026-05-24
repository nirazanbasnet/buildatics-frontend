"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import type { PreconstructionListVariantId } from "./variants";

export function UseThisButton({ variant }: { variant: PreconstructionListVariantId }) {
  const router = useRouter();

  function applyPreconstructionList() {
    document.cookie = `preconstruction_list_enabled=true; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `preconstruction_list_variant=${variant}; path=/; max-age=31536000; SameSite=Lax`;
    toast.success(`Preconstruction List ${variant.toUpperCase()} promoted`, {
      description: "It is now active on /dashboard/preconstruction-list."
    });
    router.push("/dashboard/preconstruction-list");
    router.refresh();
  }

  return (
    <Button size="sm" className="h-8" onClick={applyPreconstructionList}>
      <Check className="size-4" />
      Use this on Preconstruction List
    </Button>
  );
}
