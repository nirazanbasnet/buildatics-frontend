"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { quotationStatusConfig, type Quotation } from "../_data";
import { QuotationActionsMenu } from "./quotation-actions-menu";

type Props = {
  quotations: Quotation[];
  className?: string;
  onQuotationClick?: (quotation: Quotation) => void;
};

export function QuotationTable({ quotations, className, onQuotationClick }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = quotations.length > 0 && selected.size === quotations.length;
  const someSelected = selected.size > 0 && selected.size < quotations.length;

  function toggleAll(value: boolean) {
    setSelected(value ? new Set(quotations.map((q) => q.id)) : new Set());
  }

  function toggleOne(id: string, value: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <div className={cn("bg-card overflow-hidden rounded-lg border", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-12 pl-4">
              <Checkbox
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={(v) => toggleAll(v === true)}
                aria-label="Select all quotations"
              />
            </TableHead>
            <TableHead className="font-semibold">Ref#</TableHead>
            <TableHead className="font-semibold">Client Name</TableHead>
            <TableHead className="font-semibold">Site Address</TableHead>
            <TableHead className="font-semibold">Attached Design</TableHead>
            <TableHead className="font-semibold">Amount</TableHead>
            <TableHead className="font-semibold">Quote Date</TableHead>
            <TableHead className="font-semibold">Expiry Date</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="pr-4 text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotations.map((quotation) => {
            const isChecked = selected.has(quotation.id);
            const status = quotationStatusConfig[quotation.status];
            return (
              <TableRow
                key={quotation.id}
                onClick={onQuotationClick ? () => onQuotationClick(quotation) : undefined}
                className={onQuotationClick ? "cursor-pointer" : undefined}
              >
                <TableCell className="py-3 pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(v) => toggleOne(quotation.id, v === true)}
                    aria-label={`Select ${quotation.ref}`}
                  />
                </TableCell>
                <TableCell className="text-foreground font-medium">{quotation.ref}</TableCell>
                <TableCell className="text-muted-foreground">{quotation.client}</TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="text-muted-foreground size-4 shrink-0" />
                    {quotation.siteAddress}
                  </span>
                </TableCell>
                <TableCell className="text-foreground font-semibold">
                  {quotation.attachedDesign}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {quotation.amount}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {quotation.quoteDate}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {quotation.expiryDate}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      status.solid
                    )}
                  >
                    {status.label}
                  </span>
                </TableCell>
                <TableCell className="pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <QuotationActionsMenu
                    quotationRef={quotation.ref}
                    onView={onQuotationClick ? () => onQuotationClick(quotation) : undefined}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
