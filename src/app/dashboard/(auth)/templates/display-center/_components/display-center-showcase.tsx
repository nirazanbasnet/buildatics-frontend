"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

import type { PropertyView } from "../_data";
import { Toolbar } from "./toolbar";
import { VARIANT_LAYOUTS, type VariantId } from "./variant-layouts";

type Props = {
  style: VariantId;
  font?: string;
  theme?: string;
  view?: PropertyView;
  className?: string;
};

export function DisplayCenterShowcase({ style, font, theme, view = "facade", className }: Props) {
  const Layout = VARIANT_LAYOUTS[style];

  return (
    <div
      data-theme-preset={theme && theme !== "default" ? theme : undefined}
      data-theme-font={font && font !== "default" ? font : undefined}
      className={cn("bg-background min-w-0 font-sans", className)}
      data-slot="share-preview"
    >
      <Toolbar mode="production" filterEnabled filterVariant="v1" />
      <Layout view={view} />
      <Pagination className="justify-end pt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {[1, 2, 3, 4].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href="#" isActive={page === 1}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
