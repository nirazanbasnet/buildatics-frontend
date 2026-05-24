"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import type { PreconstructionDetailVariantId } from "./variants";

export function UseThisButton({ variant }: { variant: PreconstructionDetailVariantId }) {
  const router = useRouter();

  function applyPreconstructionDetail() {
    document.cookie = `preconstruction_detail_enabled=true; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `preconstruction_detail_variant=${variant}; path=/; max-age=31536000; SameSite=Lax`;
    toast.success(`Preconstruction Detail ${variant.toUpperCase()} promoted`, {
      description: "Rows and cards on /dashboard/preconstruction-list now open this layout."
    });
    router.push("/dashboard/preconstruction-list");
    router.refresh();
  }

  return (
    <Button size="sm" className="h-8" onClick={applyPreconstructionDetail}>
      <Check className="size-4" />
      Use this on Preconstruction List
    </Button>
  );
}
