"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { projectPL } from "../_data";
import { FinancePagination } from "./finance-pagination";
import { FinanceToolbar } from "./finance-toolbar";

export function FinanceProjectPL() {
  return (
    <div>
      <FinanceToolbar />
      <div className="bg-card overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="pl-4 font-semibold">Project</TableHead>
              <TableHead className="text-right font-semibold">Profit</TableHead>
              <TableHead className="font-semibold">Margin</TableHead>
              <TableHead className="font-semibold">Stage</TableHead>
              <TableHead className="font-semibold">Contract</TableHead>
              <TableHead className="font-semibold">Est. Cost</TableHead>
              <TableHead className="font-semibold">Received</TableHead>
              <TableHead className="pr-4 font-semibold">Outstanding</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectPL.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="py-3 pl-4">
                  <p className="text-foreground text-sm font-semibold">{project.project}</p>
                  <p className="text-muted-foreground text-xs">{project.clientAddress}</p>
                </TableCell>
                <TableCell className="text-foreground text-right font-medium whitespace-nowrap">
                  {project.profit}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
                      <div
                        className="bg-foreground h-full rounded-full"
                        style={{ width: `${project.margin}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground w-9 text-sm">{project.margin}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{project.stage}</TableCell>
                <TableCell className="text-foreground font-semibold whitespace-nowrap">
                  {project.contract}
                </TableCell>
                <TableCell className="text-foreground font-semibold whitespace-nowrap">
                  {project.estCost}
                </TableCell>
                <TableCell className="font-semibold whitespace-nowrap text-green-600">
                  {project.received}
                </TableCell>
                <TableCell className="pr-4 font-semibold whitespace-nowrap text-red-600">
                  {project.outstanding}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <FinancePagination />
    </div>
  );
}
