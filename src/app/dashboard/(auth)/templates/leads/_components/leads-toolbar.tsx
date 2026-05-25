"use client";

import { useState } from "react";
import { LayoutGrid, List, ListFilter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type LeadsView = "list" | "card";

type Props = {
  view: LeadsView;
  onViewChange: (view: LeadsView) => void;
};

export function LeadsToolbar({ view, onViewChange }: Props) {
  const [statusActive, setStatusActive] = useState(true);

  function handleViewChange(next: string) {
    if (next === "list" || next === "card") onViewChange(next);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Status</span>
        {statusActive ? (
          <Badge variant="default" className="h-7 gap-1 rounded-full py-1 pr-1 pl-3">
            In Progress
            <Button
              variant="ghost"
              size="icon"
              className="size-5 rounded-full hover:bg-white/20"
              onClick={() => setStatusActive(false)}
              aria-label="Clear status filter"
            >
              <X className="size-3" />
            </Button>
          </Badge>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9">
          <ListFilter className="size-4" />
          Filter
        </Button>

        <ToggleGroup type="single" value={view} onValueChange={handleViewChange} className="h-9">
          <ToggleGroupItem variant="outline" value="list" className="h-9 px-3">
            <List className="size-4" />
            List View
          </ToggleGroupItem>
          <ToggleGroupItem variant="outline" value="card" className="h-9 px-3">
            <LayoutGrid className="size-4" />
            Kanban View
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
