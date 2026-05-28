"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import type { QuotationDetail } from "../_data";

import { QuotationDetailLayout } from "./quotation-detail-layout";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail: QuotationDetail;
};

export function QuotationDetailSheet({ open, onOpenChange, detail }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto p-6 sm:max-w-3xl lg:max-w-5xl">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Quotation Detail — {detail.title}</SheetTitle>
            <SheetDescription>Quotation builder and summary</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <QuotationDetailLayout detail={detail} />
      </SheetContent>
    </Sheet>
  );
}
