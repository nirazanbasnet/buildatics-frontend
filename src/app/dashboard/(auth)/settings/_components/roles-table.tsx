"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import type { Role, SettingsStatus } from "../_data";
import { PermissionBadges } from "./permission-badges";
import { SettingsActionsMenu } from "./settings-actions-menu";
import { SettingsStatusDropdown } from "./settings-status-dropdown";

type Props = {
  roles: Role[];
  className?: string;
};

export function RolesTable({ roles, className }: Props) {
  const [rows, setRows] = useState<Role[]>(roles);

  function setStatus(id: string, status: SettingsStatus) {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
  }

  return (
    <div className={cn("bg-card overflow-hidden rounded-lg border", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="pl-4 font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Permissions</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="pr-4 text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="text-foreground py-3 pl-4 font-medium">{role.name}</TableCell>
              <TableCell>
                <PermissionBadges permissions={role.permissions} max={3} />
              </TableCell>
              <TableCell>
                <SettingsStatusDropdown
                  status={role.status}
                  onStatusChange={(status) => setStatus(role.id, status)}
                />
              </TableCell>
              <TableCell className="pr-4 text-right">
                <SettingsActionsMenu label={role.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
