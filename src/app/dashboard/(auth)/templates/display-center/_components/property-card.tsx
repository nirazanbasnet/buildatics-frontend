import Image from "next/image";
import {
  Bath,
  BedDouble,
  Car,
  Clock,
  Maximize2,
  Plus,
  Share2,
  Sofa,
  ZoomIn
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import type { Property, PropertyView } from "../_data";

type Props = {
  property: Property;
  view?: PropertyView;
  imageClassName?: string;
};

export function PropertyCard({ property, view = "facade", imageClassName }: Props) {
  const src = view === "floor" ? property.floorPlan : property.facade;
  return (
    <Card className="overflow-hidden gap-0 p-0">
      <div className="relative">
        <Image
          src={src}
          alt={`${property.title} ${view === "floor" ? "floor plan" : "facade"}`}
          width={900}
          height={560}
          className={cn(
            "h-82.5 w-full object-cover",
            view === "floor" && "object-contain bg-muted",
            imageClassName
          )}
        />
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="bg-background/80 size-8 rounded-full backdrop-blur hover:bg-background">
            <ZoomIn className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-background/80 size-8 rounded-full backdrop-blur hover:bg-background">
            <Share2 className="size-4" />
          </Button>
        </div>
        <Badge
          variant="secondary"
          className="bg-background text-foreground absolute bottom-3 left-3 rounded-full px-3 py-1 font-medium">
          {property.brand}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-background text-foreground absolute bottom-3 right-3 gap-1 rounded-full px-3 py-1 font-medium">
          <Clock className="size-3" />
          Version {property.version}
        </Badge>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold">{property.title}</h3>
          <Button size="sm" className="rounded-md">
            <Plus className="size-4" />
            Add Lead
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <Maximize2 className="size-4" />
            <span>
              {property.width}W X {property.depth}D
            </span>
          </div>
          <Badge variant="secondary" className="rounded-md">
            {property.squareFootage} sq
          </Badge>
        </div>

        <Separator />

        <PropertyStats property={property} />
      </div>
    </Card>
  );
}

export function PropertyStats({ property }: { property: Property }) {
  return (
    <div className="text-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      <Stat icon={BedDouble} value={`${property.beds} Beds`} />
      <Separator orientation="vertical" className="h-4 data-[orientation=vertical]:h-4" />
      <Stat icon={Bath} value={`${property.baths} Baths`} />
      <Separator orientation="vertical" className="h-4 data-[orientation=vertical]:h-4" />
      <Stat icon={Sofa} value={`${property.living} Living`} />
      <Separator orientation="vertical" className="h-4 data-[orientation=vertical]:h-4" />
      <Stat icon={Car} value={`${property.garage} Garage`} />
    </div>
  );
}

function Stat({
  icon: Icon,
  value
}: {
  icon: typeof BedDouble;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="size-4" />
      <span>{value}</span>
    </div>
  );
}
