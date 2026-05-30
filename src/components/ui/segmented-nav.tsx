"use client";

import { useId } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export type SegmentedNavItem<T extends string = string> = {
  value: T;
  label?: React.ReactNode;
  icon?: LucideIcon;
};

type Props<T extends string> = {
  items: ReadonlyArray<SegmentedNavItem<T>>;
  value: T;
  onValueChange: (value: T) => void;
  ariaLabel?: string;
  className?: string;
};

export function SegmentedNav<T extends string>({
  items,
  value,
  onValueChange,
  ariaLabel,
  className
}: Props<T>) {
  const layoutId = useId();

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      data-slot="segmented-nav"
      className={cn(
        "border-border inline-flex w-full items-center overflow-hidden rounded-md border",
        className
      )}
    >
      {items.map((item) => {
        const isActive = item.value === value;
        const Icon = item.icon;
        return (
          <motion.button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onValueChange(item.value)}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "focus-visible:ring-ring border-border relative flex flex-1 items-center justify-center gap-2 border-r px-4 py-2 text-sm font-medium transition-colors last:border-r-0 focus-visible:ring-2 focus-visible:outline-none",
              isActive
                ? "text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {isActive ? (
              <motion.span
                layoutId={layoutId}
                className="bg-primary absolute inset-0 z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                aria-hidden
              />
            ) : null}
            <span className="relative z-10 flex items-center gap-2">
              {Icon ? <Icon className="size-4" /> : null}
              {item.label ?? item.value}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
