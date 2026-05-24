import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { detailSpecs } from "../_data";

export function SpecificationsTable({ className }: { className?: string }) {
  return (
    <Card className={cn("gap-0 p-0", className)}>
      <div className="border-b px-4 py-3">
        <h3 className="text-sm font-semibold">Specifications</h3>
      </div>
      <div className="divide-y">
        {detailSpecs.map((spec) => (
          <div key={spec.label} className="grid grid-cols-2 gap-2 px-4 py-2.5 text-sm">
            <span className="text-foreground">{spec.label}</span>
            <span className="bg-muted/40 -mx-2 rounded-md px-2 py-1 text-right font-mono text-xs">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
