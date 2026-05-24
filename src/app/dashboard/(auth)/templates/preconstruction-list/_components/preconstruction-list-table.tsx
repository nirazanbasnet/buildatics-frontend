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

import { preconstructionListStatusLabels, type PreconstructionListProject } from "../_data";

type Props = {
  projects: PreconstructionListProject[];
  className?: string;
  onProjectClick?: (project: PreconstructionListProject) => void;
};

export function PreconstructionListTable({ projects, className, onProjectClick }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = projects.length > 0 && selected.size === projects.length;
  const someSelected = selected.size > 0 && selected.size < projects.length;

  function toggleAll(value: boolean) {
    setSelected(value ? new Set(projects.map((p) => p.id)) : new Set());
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
                aria-label="Select all projects"
              />
            </TableHead>
            <TableHead className="font-semibold">Project No</TableHead>
            <TableHead className="font-semibold">Address</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Stage</TableHead>
            <TableHead className="font-semibold">Council</TableHead>
            <TableHead className="font-semibold">Developer</TableHead>
            <TableHead className="pr-4 font-semibold">Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => {
            const isChecked = selected.has(project.id);
            return (
              <TableRow
                key={project.id}
                onClick={onProjectClick ? () => onProjectClick(project) : undefined}
                className={onProjectClick ? "cursor-pointer" : undefined}
              >
                <TableCell className="py-3 pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(v) => toggleOne(project.id, v === true)}
                    aria-label={`Select ${project.projectNo}`}
                  />
                </TableCell>
                <TableCell className="text-foreground font-medium">{project.projectNo}</TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="text-muted-foreground size-4 shrink-0" />
                    {project.address}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-emerald-600">
                    {preconstructionListStatusLabels[project.status]}
                  </span>
                </TableCell>
                <TableCell className="text-foreground font-medium">{project.stage}</TableCell>
                <TableCell className="text-muted-foreground">{project.council}</TableCell>
                <TableCell className="text-muted-foreground">{project.developer}</TableCell>
                <TableCell className="pr-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted h-1 w-32 overflow-hidden rounded-full">
                      <div
                        className="bg-foreground h-full rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground w-10 text-sm">{project.progress}%</span>
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
