import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { detailRooms } from "../_data";

export function RoomDimensionsTable({ className }: { className?: string }) {
  return (
    <Card className={cn("gap-0 p-0", className)}>
      <div className="bg-muted/40 flex items-center justify-between border-b px-4 py-2.5">
        <h3 className="text-sm font-semibold">Room Dimensions</h3>
        <Button
          size="icon"
          aria-label="Add room"
          className="size-7 shrink-0 transition-transform active:scale-95"
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <div className="divide-y">
        {detailRooms.map((room, i) => (
          <div
            key={i}
            className="hover:bg-accent/30 flex items-center justify-between px-4 py-2 text-sm transition-colors"
          >
            <span>{room.name}</span>
            <span className="text-muted-foreground font-mono text-xs">{room.size}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
