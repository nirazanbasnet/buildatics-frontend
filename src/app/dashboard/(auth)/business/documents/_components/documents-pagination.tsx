"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  totalPages?: number;
  defaultPage?: number;
};

export function DocumentsPagination({ totalPages = 4, defaultPage = 3 }: Props) {
  const [page, setPage] = useState(defaultPage);

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
          <Button
            key={p}
            type="button"
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={() => setPage(p)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "size-8 rounded-full p-0 text-sm",
              isActive
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-muted text-foreground hover:bg-muted/80"
            )}
          >
            {p}
          </Button>
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
