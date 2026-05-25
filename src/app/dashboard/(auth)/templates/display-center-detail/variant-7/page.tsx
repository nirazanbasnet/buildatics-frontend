import { cookies } from "next/headers";

import { properties } from "../../display-center/_data";
import { VariantHeader } from "../../_shared/variant-header";
import { DetailLayout } from "../_components/detail-layout";
import { UseThisButton } from "../_components/use-this-button";
import { detailVariantLinks, parseDetailVariant } from "../_components/variants";

export default async function DisplayCenterDetailVariant7Page() {
  const cookieStore = await cookies();
  const promoted = parseDetailVariant(cookieStore.get("display_center_detail_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Display Center Detail"
        variant="V7"
        subtitle="V1 body + segmented button tabs"
        variants={detailVariantLinks}
        activeVariant="v7"
        promotedVariant={promoted}
        action={<UseThisButton variant="v7" />}
      />
      <DetailLayout property={properties[0]} variant="v7" />
    </div>
  );
}
