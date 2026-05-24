import { cookies } from "next/headers";

import { FilterContent } from "../../display-center/_components/filter-sheet";
import { VariantHeader } from "../../_shared/variant-header";
import { UseThisButton } from "../_components/use-this-button";
import { filterVariantLinks, parseFilterVariant } from "../_components/variants";

export default async function DisplayCenterFilterVariant1Page() {
  const cookieStore = await cookies();
  const promoted = parseFilterVariant(cookieStore.get("display_center_filter_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Display Center Filter"
        variant="V1"
        subtitle="Inline preview of the Sheet in open state"
        variants={filterVariantLinks}
        activeVariant="v1"
        promotedVariant={promoted}
        action={<UseThisButton variant="v1" />}
      />
      <div className="bg-card mx-auto h-[calc(100vh-12rem)] w-full max-w-md overflow-hidden rounded-lg border shadow-sm">
        <FilterContent />
      </div>
    </div>
  );
}
