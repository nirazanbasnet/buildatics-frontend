"use client";

import { cn } from "@/lib/utils";

import { financeTabs, type FinanceTab } from "../_data";

type Props = {
  activeTab: FinanceTab;
  onTabChange: (tab: FinanceTab) => void;
  className?: string;
};

export function FinanceTabs({ activeTab, onTabChange, className }: Props) {
  return (
    <div
      className={cn("bg-muted/60 grid grid-cols-2 gap-1 rounded-lg p-1 sm:grid-cols-5", className)}
      role="tablist"
      aria-label="Finance views"
    >
      {financeTabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab)}
            className={cn(
              "rounded-md px-4 py-2 text-center text-sm font-medium transition-colors",
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
