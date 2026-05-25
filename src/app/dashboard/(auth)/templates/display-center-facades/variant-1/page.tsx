import Image from "next/image";
import { Check, Share2, ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { properties } from "../../display-center/_data";
import { availableFacades, detailDescription } from "../../display-center-detail/_data";
import { VariantHeader } from "../../_shared/variant-header";

export default function DisplayCenterFacadesVariant1Page() {
  const property = properties[0];
  const brandTag = property.brand.slice(0, 3).toUpperCase();

  return (
    <div>
      <VariantHeader
        designName="Display Center Facades"
        variant="V1"
        subtitle="Browse and select facade options"
      />

      <section className="mb-6 space-y-2">
        <h2 className="font-display text-2xl tracking-tight sm:text-3xl">{property.title}</h2>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
          {detailDescription}
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {availableFacades.map((facade) => (
          <Card key={facade.id} className="group gap-0 overflow-hidden p-0">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={facade.image}
                alt={facade.label}
                width={600}
                height={450}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  aria-label="Zoom"
                  className="size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
                >
                  <ZoomIn className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  aria-label="Share"
                  className="size-8 rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70"
                >
                  <Share2 className="size-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <h3 className="font-display truncate text-base">{facade.label}</h3>
                <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  {property.brand}
                </p>
              </div>
              <Button size="sm" className="shrink-0">
                <Check className="size-4" />
                Select
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
