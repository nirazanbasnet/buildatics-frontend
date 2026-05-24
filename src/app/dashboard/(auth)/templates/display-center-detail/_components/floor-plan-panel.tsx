import Image from "next/image";
import { Clock, Share2, Trash2, ZoomIn } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { Property } from "../../display-center/_data";

export function FloorPlanPanel({
  property,
  className
}: {
  property: Property;
  className?: string;
}) {
  return (
    <div className={cn("bg-card relative rounded-xl border p-3", className)}>
      <div className="bg-background relative flex h-72 items-center justify-center overflow-hidden rounded-md dark:bg-stone-100">
        <Image
          src={property.floorPlan}
          alt={`${property.title} floor plan`}
          width={900}
          height={900}
          className="h-full w-full object-contain p-3"
        />

        <Button
          size="icon"
          variant="secondary"
          aria-label="Delete"
          className="bg-background/80 hover:bg-background absolute top-3 left-3 size-8 rounded-full backdrop-blur transition"
        >
          <Trash2 className="size-4" />
        </Button>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            aria-label="Zoom in"
            className="bg-background/80 hover:bg-background size-8 rounded-full backdrop-blur transition"
          >
            <ZoomIn className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            aria-label="Share"
            className="bg-background/80 hover:bg-background size-8 rounded-full backdrop-blur transition"
          >
            <Share2 className="size-4" />
          </Button>
        </div>

        <Badge
          variant="secondary"
          className="bg-background text-foreground absolute bottom-3 left-3 rounded-full px-3 py-1 font-medium"
        >
          {property.brand}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-background text-foreground absolute right-3 bottom-3 gap-1 rounded-full px-3 py-1 font-medium"
        >
          <Clock className="size-3" />
          Version {property.version}
        </Badge>
      </div>
    </div>
  );
}
