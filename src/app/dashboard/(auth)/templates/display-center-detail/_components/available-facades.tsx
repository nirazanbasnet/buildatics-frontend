"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, Plus, Share2, ZoomIn } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { availableFacades } from "../_data";
import type { Property } from "../../display-center/_data";

export function AvailableFacades({
  property,
  className
}: {
  property: Property;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Available Facades</h3>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Plus className="size-4" />
            Add Facade
          </Button>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="outline"
              aria-label="Previous facade"
              onClick={() => scrollBy(-300)}
              className="size-8 transition-transform active:scale-95"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              aria-label="Next facade"
              onClick={() => scrollBy(300)}
              className="size-8 transition-transform active:scale-95"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 pb-1"
      >
        {availableFacades.map((facade) => (
          <div
            key={facade.id}
            className="group bg-card relative w-72 shrink-0 snap-start overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={facade.image}
                alt={facade.label}
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <Button
                size="icon"
                variant="secondary"
                aria-label="Delete facade"
                className="bg-background/80 hover:bg-background absolute top-3 left-3 size-8 rounded-full backdrop-blur"
              >
                <Plus className="size-4 rotate-45" />
              </Button>
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  aria-label="Zoom"
                  className="bg-background/80 hover:bg-background size-8 rounded-full backdrop-blur"
                >
                  <ZoomIn className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  aria-label="Share"
                  className="bg-background/80 hover:bg-background size-8 rounded-full backdrop-blur"
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
        ))}
      </div>
    </section>
  );
}
