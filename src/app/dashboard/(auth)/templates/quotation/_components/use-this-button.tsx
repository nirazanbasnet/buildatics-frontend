"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import type { QuotationVariantId } from "./variants";

export function UseThisButton({ variant }: { variant: QuotationVariantId }) {
  const router = useRouter();

  function applyQuotation() {
    document.cookie = `quotation_enabled=true; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `quotation_variant=${variant}; path=/; max-age=31536000; SameSite=Lax`;
    toast.success(`Quotation ${variant.toUpperCase()} promoted`, {
      description: "It is now active on /dashboard/quotation."
    });
    router.push("/dashboard/quotation");
    router.refresh();
  }

  return (
    <Button size="sm" className="h-8" onClick={applyQuotation}>
      <Check className="size-4" />
      Use this on Quotation
    </Button>
  );
}
