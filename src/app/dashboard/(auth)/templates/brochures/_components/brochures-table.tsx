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

import { brochureStatusConfig, type Brochure } from "../_data";
import { BrochuresActionsMenu } from "./brochures-actions-menu";

type Props = {
  brochures: Brochure[];
  className?: string;
};

export function BrochuresTable({ brochures, className }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = brochures.length > 0 && selected.size === brochures.length;
  const someSelected = selected.size > 0 && selected.size < brochures.length;

  function toggleAll(value: boolean) {
    setSelected(value ? new Set(brochures.map((b) => b.id)) : new Set());
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
                aria-label="Select all brochures"
              />
            </TableHead>
            <TableHead className="font-semibold">Ref#</TableHead>
            <TableHead className="font-semibold">Client Name</TableHead>
            <TableHead className="font-semibold">Site Address</TableHead>
            <TableHead className="font-semibold">Design</TableHead>
            <TableHead className="font-semibold">Created Date</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="pr-4 text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brochures.map((brochure) => {
            const isChecked = selected.has(brochure.id);
            const status = brochureStatusConfig[brochure.status];
            return (
              <TableRow key={brochure.id}>
                <TableCell className="py-3 pl-4">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(v) => toggleOne(brochure.id, v === true)}
                    aria-label={`Select ${brochure.ref}`}
                  />
                </TableCell>
                <TableCell className="text-foreground font-medium">{brochure.ref}</TableCell>
                <TableCell className="text-muted-foreground">{brochure.client}</TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="text-muted-foreground size-4 shrink-0" />
                    {brochure.siteAddress}
                  </span>
                </TableCell>
                <TableCell className="text-foreground font-semibold">{brochure.design}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">
                  {brochure.createdDate}
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
                <TableCell className="pr-4 text-right">
                  <BrochuresActionsMenu brochureRef={brochure.ref} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
