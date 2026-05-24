"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Bath, BedDouble, Car, Share2, Sofa, ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { Property, PropertyView } from "../_data";

type Props = {
  property: Property;
  view?: PropertyView;
  index?: number;
};

export function PropertyCardV7({ property, view = "facade", index = 0 }: Props) {
  const src = view === "floor" ? property.floorPlan : property.facade;
  const brandTag = property.brand.slice(0, 3).toUpperCase();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    >
      <Card className="group gap-0 overflow-hidden p-0 transition duration-300 hover:-translate-y-1.5 hover:shadow-lg">
        <div className="relative">
          <Image
            src={src}
            alt={`${property.title} ${view === "floor" ? "floor plan" : "facade"}`}
            width={900}
            height={560}
            className={cn(
              "h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105",
              view === "floor" && "bg-muted dark:bg-stone-100"
            )}
          />
          <span
            data-slot="brand-tag"
            className="absolute top-3 left-3 rounded-lg bg-black/50 px-3 py-1 text-xs font-medium tracking-wider text-white backdrop-blur"
          >
            {brandTag} · V{property.version}
          </span>
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
            >
              <ZoomIn className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
            >
              <Share2 className="size-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="flex flex-col justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold">{property.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm tabular-nums">
                {property.width}m × {property.depth}m
              </p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold tabular-nums">{property.squareFootage}</span>
              <span className="text-muted-foreground text-sm">sq</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <SpecTile icon={BedDouble} value={property.beds} label="beds" />
            <SpecTile icon={Bath} value={property.baths} label="baths" />
            <SpecTile icon={Sofa} value={property.living} label="living" />
            <SpecTile icon={Car} value={property.garage} label="garage" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function SpecTile({
  icon: Icon,
  value,
  label
}: {
  icon: typeof BedDouble;
  value: number;
  label: string;
}) {
  return (
    <div className="bg-muted flex items-center gap-2 rounded-md p-2">
      <Icon className="text-muted-foreground size-4 shrink-0" />
      <div className="flex flex-col leading-tight">
        <span className="font-bold tabular-nums">{value}</span>
        <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}
