"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import type { LeadsVariantId } from "./variants";

export function UseThisButton({ variant }: { variant: LeadsVariantId }) {
  const router = useRouter();

  function applyLeads() {
    document.cookie = `leads_enabled=true; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `leads_variant=${variant}; path=/; max-age=31536000; SameSite=Lax`;
    toast.success(`Leads ${variant.toUpperCase()} promoted`, {
      description: "It is now active on /dashboard/leads."
    });
    router.push("/dashboard/leads");
    router.refresh();
  }

  return (
    <Button size="sm" className="h-8" onClick={applyLeads}>
      <Check className="size-4" />
      Use this on Leads
    </Button>
  );
}
