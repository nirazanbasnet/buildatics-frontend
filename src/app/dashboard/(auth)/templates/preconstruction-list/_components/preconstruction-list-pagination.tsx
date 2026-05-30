"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  totalPages?: number;
  defaultPage?: number;
};

export function PreconstructionListPagination({ totalPages = 4, defaultPage = 3 }: Props) {
  const [page, setPage] = useState(defaultPage);
  const reduceMotion = useReducedMotion() ?? false;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="mt-4 flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1 px-2 text-sm"
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
      >
        <ChevronLeft className="size-4" />
        Previous
      </Button>
      {pages.map((p) => {
        const isActive = p === page;
        return (
          <motion.button
            key={p}
            type="button"
            onClick={() => setPage(p)}
            aria-current={isActive ? "page" : undefined}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "focus-visible:ring-ring relative flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
              isActive
                ? "text-primary-foreground z-10"
                : "bg-muted text-foreground hover:bg-muted/80"
            )}
          >
            {isActive ? (
              reduceMotion ? (
                <span aria-hidden className="bg-primary absolute inset-0 z-0 rounded-full" />
              ) : (
                <motion.span
                  aria-hidden
                  layoutId="pagination-active-pill"
                  transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-primary absolute inset-0 z-0 rounded-full"
                />
              )
            ) : null}
            <span className="relative z-10">{p}</span>
          </motion.button>
        );
      })}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1 px-2 text-sm"
        disabled={page === totalPages}
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
      >
        Next
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}
