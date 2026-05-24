import { cookies } from "next/headers";

import { FilterContentV2 } from "../../display-center/_components/filter-content-v2";
import { VariantHeader } from "../../_shared/variant-header";
import { UseThisButton } from "../_components/use-this-button";
import { filterVariantLinks, parseFilterVariant } from "../_components/variants";

export default async function DisplayCenterFilterVariant2Page() {
  const cookieStore = await cookies();
  const promoted = parseFilterVariant(cookieStore.get("display_center_filter_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Display Center Filter"
        variant="V2"
        subtitle="Accordion sections with inline summaries"
        variants={filterVariantLinks}
        activeVariant="v2"
        promotedVariant={promoted}
        action={<UseThisButton variant="v2" />}
      />
      <div className="bg-card mx-auto h-[calc(100vh-12rem)] w-full max-w-md overflow-hidden rounded-lg border shadow-sm">
        <FilterContentV2 />
      </div>
    </div>
  );
}
