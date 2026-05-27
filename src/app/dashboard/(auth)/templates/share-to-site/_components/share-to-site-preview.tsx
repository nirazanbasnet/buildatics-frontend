"use client";

import { useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

import { Toolbar } from "../../display-center/_components/toolbar";
import { VARIANT_LAYOUTS } from "../../display-center/_components/variant-layouts";

import type { ShareConfig } from "./config";

type Props = {
  config: ShareConfig;
};

export function ShareToSitePreview({ config }: Props) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") === "floor" ? "floor" : "facade";
  const Layout = VARIANT_LAYOUTS[config.style];

  return (
    <div
      data-theme-preset={config.color !== "default" ? config.color : undefined}
      data-theme-font={config.font !== "default" ? config.font : undefined}
      className="bg-background min-w-0 font-sans"
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
