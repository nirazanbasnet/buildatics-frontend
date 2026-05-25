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

import { leadStatusLabels, type Lead } from "../_data";

type Props = {
  leads: Lead[];
  className?: string;
  onLeadClick?: (lead: Lead) => void;
};

export function LeadsTable({ leads, className, onLeadClick }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = leads.length > 0 && selected.size === leads.length;
  const someSelected = selected.size > 0 && selected.size < leads.length;

  function toggleAll(value: boolean) {
    setSelected(value ? new Set(leads.map((l) => l.id)) : new Set());
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
                aria-label="Select all leads"
              />
            </TableHead>
            <TableHead className="font-semibold">Lead No</TableHead>
            <TableHead className="font-semibold">Address</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Stage</TableHead>
            <TableHead className="font-semibold">Budget</TableHead>
            <TableHead className="font-semibold">Client</TableHead>
            <TableHead className="pr-4 font-semibold">Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const isChecked = selected.has(lead.id);
            return (
              <TableRow
                key={lead.id}
                onClick={onLeadClick ? () => onLeadClick(lead) : undefined}
                className={onLeadClick ? "cursor-pointer" : undefined}
              >
                <TableCell className="py-3 pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(v) => toggleOne(lead.id, v === true)}
                    aria-label={`Select ${lead.leadNo}`}
                  />
                </TableCell>
                <TableCell className="text-foreground font-medium">{lead.leadNo}</TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="text-muted-foreground size-4 shrink-0" />
                    {lead.address}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-emerald-600">
                    {leadStatusLabels[lead.status]}
                  </span>
                </TableCell>
                <TableCell className="text-foreground font-medium">{lead.stage}</TableCell>
                <TableCell className="text-muted-foreground">{lead.budget}</TableCell>
                <TableCell className="text-muted-foreground">{lead.client}</TableCell>
                <TableCell className="pr-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted h-1 w-32 overflow-hidden rounded-full">
                      <div
                        className="bg-foreground h-full rounded-full"
                        style={{ width: `${lead.progress}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground w-10 text-sm">{lead.progress}%</span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
