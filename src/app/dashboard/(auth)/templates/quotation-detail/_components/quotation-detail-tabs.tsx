"use client";

import { cn } from "@/lib/utils";

import { quotationDetailTabs, type QuotationDetailTab } from "../_data";

type Props = {
  activeTab: QuotationDetailTab;
  onTabChange: (tab: QuotationDetailTab) => void;
  className?: string;
};

export function QuotationDetailTabs({ activeTab, onTabChange, className }: Props) {
  return (
    <div
      className={cn("bg-muted/60 grid grid-cols-3 gap-1 rounded-lg p-1", className)}
      role="tablist"
      aria-label="Quotation views"
    >
      {quotationDetailTabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
