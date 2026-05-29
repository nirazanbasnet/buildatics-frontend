"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import type { BrochureDetail } from "../_data";

import { BrochureDetailLayout } from "./brochure-detail-layout";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail: BrochureDetail;
};

export function BrochureDetailSheet({ open, onOpenChange, detail }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto p-6 sm:max-w-3xl lg:max-w-5xl">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Brochure Detail — {detail.ref}</SheetTitle>
            <SheetDescription>Brochure builder, preview, and history</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <BrochureDetailLayout detail={detail} />
      </SheetContent>
    </Sheet>
  );
}
