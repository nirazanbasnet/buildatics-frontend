"use client";

import { cn } from "@/lib/utils";

import { brochureDetailTabs, type BrochureDetailTab } from "../_data";

type Props = {
  activeTab: BrochureDetailTab;
  onTabChange: (tab: BrochureDetailTab) => void;
  className?: string;
};

export function BrochureDetailTabs({ activeTab, onTabChange, className }: Props) {
  return (
    <div
      className={cn("bg-muted/60 grid grid-cols-3 gap-1 rounded-lg p-1", className)}
      role="tablist"
      aria-label="Brochure views"
    >
      {brochureDetailTabs.map((tab) => {
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
