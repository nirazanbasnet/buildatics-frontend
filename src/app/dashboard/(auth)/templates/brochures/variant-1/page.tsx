import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { brochures } from "../_data";
import { BrochuresLayout } from "../_components/brochures-layout";
import { UseThisButton } from "../_components/use-this-button";
import { brochuresVariantLinks, parseBrochuresVariant } from "../_components/variants";

export default async function BrochuresVariant1Page() {
  const cookieStore = await cookies();
  const promoted = parseBrochuresVariant(cookieStore.get("brochures_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Brochure List"
        variant="V1"
        subtitle="Dense table with status pills and per-row actions menu"
        variants={brochuresVariantLinks}
        activeVariant="v1"
        promotedVariant={promoted}
        action={<UseThisButton variant="v1" />}
      />
      <BrochuresLayout brochures={brochures} />
    </div>
  );
}
