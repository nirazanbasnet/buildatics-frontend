import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { documentStatusConfig, type BusinessDocument } from "../_data";
import { DocumentsActionsMenu } from "./documents-actions-menu";

type Props = {
  documents: BusinessDocument[];
  className?: string;
};

export function DocumentsTable({ documents, className }: Props) {
  return (
    <div className={cn("bg-card overflow-hidden rounded-lg border", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="pl-4 font-semibold">File Name</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Uploaded by</TableHead>
            <TableHead className="font-semibold">Uploaded on</TableHead>
            <TableHead className="pr-4 text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => {
            const status = documentStatusConfig[document.status];
            return (
              <TableRow key={document.id}>
                <TableCell className="text-foreground py-3 pl-4 font-semibold">
                  {document.fileName}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      status.badge
                    )}
                  >
                    {status.label}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">{document.uploadedBy}</TableCell>
                <TableCell className="text-muted-foreground">{document.uploadedOn}</TableCell>
                <TableCell className="pr-4 text-right">
                  <DocumentsActionsMenu fileName={document.fileName} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
