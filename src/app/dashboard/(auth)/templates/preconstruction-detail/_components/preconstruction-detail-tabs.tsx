"use client";

import { cn } from "@/lib/utils";

import { preconstructionDetailTabs, type PreconstructionDetailTab } from "../_data";

type Props = {
  activeTab: PreconstructionDetailTab;
  onTabChange: (tab: PreconstructionDetailTab) => void;
};

export function PreconstructionDetailTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {preconstructionDetailTabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "border-border bg-card text-foreground border shadow-sm"
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
