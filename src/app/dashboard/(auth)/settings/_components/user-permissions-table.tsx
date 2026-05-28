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

import type { SettingsStatus, SettingsUser } from "../_data";
import { PermissionBadges } from "./permission-badges";
import { SettingsActionsMenu } from "./settings-actions-menu";
import { SettingsStatusDropdown } from "./settings-status-dropdown";

type Props = {
  users: SettingsUser[];
  className?: string;
};

export function UserPermissionsTable({ users, className }: Props) {
  const [rows, setRows] = useState<SettingsUser[]>(users);

  function setStatus(id: string, status: SettingsStatus) {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status } : row)));
  }

  return (
    <div className={cn("bg-card overflow-hidden rounded-lg border", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="pl-4 font-semibold">User</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Permissions</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="pr-4 text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="text-foreground py-3 pl-4 font-medium">{user.name}</TableCell>
              <TableCell className="text-muted-foreground">{user.email}</TableCell>
              <TableCell className="text-muted-foreground">{user.role}</TableCell>
              <TableCell>
                <PermissionBadges permissions={user.permissions} max={2} />
              </TableCell>
              <TableCell>
                <SettingsStatusDropdown
                  status={user.status}
                  onStatusChange={(status) => setStatus(user.id, status)}
                />
              </TableCell>
              <TableCell className="pr-4 text-right">
                <SettingsActionsMenu label={user.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
