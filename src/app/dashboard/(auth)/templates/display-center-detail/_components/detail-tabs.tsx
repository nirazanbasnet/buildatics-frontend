"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Building2, FileText, Layers, ListChecks, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { detailTabs, type DetailTab } from "../_data";

export type DetailTabVariant = "pill" | "segmented" | "icon-segmented";

const TAB_ICONS: Record<string, LucideIcon> = {
  Details: Layers,
  Facades: Building2,
  Documents: FileText,
  Tasks: ListChecks
};

export function DetailTabs({
  className,
  orientation = "horizontal",
  layoutId = "detail-tab-pill",
  variant = "pill"
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
  layoutId?: string;
  variant?: DetailTabVariant;
}) {
  const [active, setActive] = useState<DetailTab>(detailTabs[0]);
  const isVertical = orientation === "vertical";

  if (variant === "segmented") {
    return (
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          "border-border inline-flex w-full items-center overflow-hidden rounded-md border",
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
                "focus-visible:ring-ring border-border flex-1 border-r px-4 py-2 text-sm font-medium transition-colors last:border-r-0 focus-visible:ring-2 focus-visible:outline-none",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === "icon-segmented") {
    return (
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          "border-border inline-flex w-full items-center overflow-hidden rounded-md border",
          className
        )}
      >
        {detailTabs.map((tab) => {
          const isActive = tab === active;
          const Icon = TAB_ICONS[tab];
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab)}
              className={cn(
                "focus-visible:ring-ring border-border flex flex-1 items-center justify-center gap-2 border-r px-4 py-2 text-sm font-medium transition-colors last:border-r-0 focus-visible:ring-2 focus-visible:outline-none",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {Icon ? <Icon className="size-4" /> : null}
              {tab}
            </button>
          );
        })}
      </div>
    );
  }

  // Default: pill (animated)
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
