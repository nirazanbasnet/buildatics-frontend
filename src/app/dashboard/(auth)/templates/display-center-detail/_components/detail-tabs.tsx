"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { detailTabs, type DetailTab } from "../_data";

export function DetailTabs({
  className,
  orientation = "horizontal",
  layoutId = "detail-tab-pill"
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
  /** Override the shared layoutId when multiple tab groups appear on the same page. */
  layoutId?: string;
}) {
  const [active, setActive] = useState<DetailTab>(detailTabs[0]);
  const isVertical = orientation === "vertical";

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        "bg-muted/40 rounded-lg p-1",
        isVertical ? "flex flex-col gap-1" : "flex flex-wrap items-center gap-1",
        className
      )}
    >
      {detailTabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActive(tab)}
            className={cn(
              "focus-visible:ring-ring relative rounded-md px-4 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
              isVertical ? "text-left" : "flex-1",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive ? (
              <motion.span
                layoutId={layoutId}
                className="bg-background absolute inset-0 -z-0 rounded-md shadow-sm"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : null}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
