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
      <div className="bg-background relative flex h-full items-center justify-center overflow-hidden rounded-md dark:bg-stone-100">
        <Image
          src={property.floorPlan}
          alt={`${property.title} floor plan`}
          width={900}
          height={900}
          className="bg-muted h-full w-full object-contain dark:bg-stone-100"
        />

        <Button
          size="icon"
          variant="secondary"
          aria-label="Delete"
          className="absolute top-3 left-3 size-8 rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
        >
          <Trash2 className="size-4" />
        </Button>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            aria-label="Zoom in"
            className="size-8 rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
          >
            <ZoomIn className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            aria-label="Share"
            className="size-8 rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
          >
            <Share2 className="size-4" />
          </Button>
        </div>

        <Badge
          variant="secondary"
          className="absolute bottom-3 left-3 bg-black/50 px-3 py-1 text-xs font-medium tracking-wider text-white backdrop-blur"
        >
          {property.brand}
        </Badge>
        <Badge
          variant="secondary"
          className="absolute right-3 bottom-3 bg-black/50 px-3 py-1 text-xs font-medium tracking-wider text-white backdrop-blur"
        >
          <Clock className="size-3" />
          Version {property.version}
        </Badge>
      </div>
    </div>
  );
}
