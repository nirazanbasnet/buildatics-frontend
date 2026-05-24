import { cookies } from "next/headers";

import { properties } from "../../display-center/_data";
import { VariantHeader } from "../../_shared/variant-header";
import { DetailLayoutV2 } from "../_components/detail-layout-v2";
import { UseThisButton } from "../_components/use-this-button";
import { detailVariantLinks, parseDetailVariant } from "../_components/variants";

export default async function DisplayCenterDetailVariant2Page() {
  const cookieStore = await cookies();
  const promoted = parseDetailVariant(cookieStore.get("display_center_detail_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Display Center Detail"
        variant="V2"
        subtitle="Vertical tabs sidebar"
        variants={detailVariantLinks}
        activeVariant="v2"
        promotedVariant={promoted}
        action={<UseThisButton variant="v2" />}
      />
      <DetailLayoutV2 property={properties[0]} />
    </div>
  );
}
