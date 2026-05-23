import { properties, type PropertyView } from "../_data";
import { PropertyCard } from "./property-card";
import { PropertyListItem } from "./property-list-item";
import { PropertyRow } from "./property-row";

type Props = { view?: PropertyView };

export function Variant1Layout({ view }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} view={view} />
      ))}
    </div>
  );
}

export function Variant2Layout({ view }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          view={view}
          imageClassName="h-72"
        />
      ))}
    </div>
  );
}

export function Variant3Layout({ view }: Props) {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {properties.map((property) => (
        <PropertyRow key={property.id} property={property} view={view} />
      ))}
    </div>
  );
}

export function Variant4Layout({ view }: Props) {
  const [featured, ...rest] = properties;
  return (
    <div className="space-y-5">
      <PropertyRow property={featured} view={view} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((property) => (
          <PropertyCard key={property.id} property={property} view={view} />
        ))}
      </div>
    </div>
  );
}

export function Variant5Layout({ view }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {properties.map((property) => (
        <PropertyListItem key={property.id} property={property} view={view} />
      ))}
    </div>
  );
}

export const VARIANT_LAYOUTS = {
  1: Variant1Layout,
  2: Variant2Layout,
  3: Variant3Layout,
  4: Variant4Layout,
  5: Variant5Layout
} as const;

export type VariantId = keyof typeof VARIANT_LAYOUTS;
