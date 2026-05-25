import { cookies } from "next/headers";

import { properties } from "../../display-center/_data";
import { VariantHeader } from "../../_shared/variant-header";
import { DetailLayout } from "../_components/detail-layout";
import { UseThisButton } from "../_components/use-this-button";
import { detailVariantLinks, parseDetailVariant } from "../_components/variants";

export default async function DisplayCenterDetailVariant10Page() {
  const cookieStore = await cookies();
  const promoted = parseDetailVariant(cookieStore.get("display_center_detail_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Display Center Detail"
        variant="V10"
        subtitle="Editorial vertical with stat cards"
        variants={detailVariantLinks}
        activeVariant="v10"
        promotedVariant={promoted}
        action={<UseThisButton variant="v10" />}
      />
      <DetailLayout property={properties[0]} variant="v10" />
    </div>
  );
}
