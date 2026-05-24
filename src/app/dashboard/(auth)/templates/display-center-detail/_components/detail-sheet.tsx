"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import type { Property } from "../../display-center/_data";

import { DetailLayout } from "./detail-layout";
import { DetailLayoutV2 } from "./detail-layout-v2";
import type { DetailVariantId } from "./variants";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property;
  variant?: DetailVariantId;
};

export function DetailSheet({ open, onOpenChange, property, variant = "v1" }: Props) {
  const Layout = variant === "v2" ? DetailLayoutV2 : DetailLayout;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto p-6 sm:max-w-3xl lg:max-w-4xl">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>{property.title} details</SheetTitle>
            <SheetDescription>Detail view for {property.title}</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <Layout property={property} />
      </SheetContent>
    </Sheet>
  );
}
