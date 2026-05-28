"use client";

import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type { DataSetupRow, SettingsStatus } from "../_data";
import { SettingsActionsMenu } from "./settings-actions-menu";
import { SettingsStatusDropdown } from "./settings-status-dropdown";

type Props = {
  columnLabel: string;
  rows: DataSetupRow[];
  className?: string;
};

export function DataSetupTable({ columnLabel, rows, className }: Props) {
  const [data, setData] = useState<DataSetupRow[]>(rows);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  function setStatus(id: string, status: SettingsStatus) {
    setData((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
  }

  return (
    <div className={cn("bg-card overflow-hidden rounded-lg border", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="pl-4 font-semibold">{columnLabel}</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="pr-4 text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="text-foreground py-3 pl-4 font-medium">{row.name}</TableCell>
              <TableCell>
                <SettingsStatusDropdown
                  status={row.status}
                  onStatusChange={(status) => setStatus(row.id, status)}
                />
              </TableCell>
              <TableCell className="pr-4 text-right">
                <SettingsActionsMenu label={row.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
