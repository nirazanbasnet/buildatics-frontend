import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { preconstructionDetailMock } from "../_data";
import { PreconstructionDetailLayoutV2 } from "../_components/preconstruction-detail-layout-v2";
import { UseThisButton } from "../_components/use-this-button";
import {
  parsePreconstructionDetailVariant,
  preconstructionDetailVariantLinks
} from "../_components/variants";

export default async function PreconstructionDetailVariant2Page() {
  const cookieStore = await cookies();
  const promoted = parsePreconstructionDetailVariant(
    cookieStore.get("preconstruction_detail_variant")?.value
  );

  return (
    <div>
      <VariantHeader
        designName="Preconstruction Detail"
        variant="V2"
        subtitle="Single column with hero actions, KPI strip, and segmented category progress"
        variants={preconstructionDetailVariantLinks}
        activeVariant="v2"
        promotedVariant={promoted}
        action={<UseThisButton variant="v2" />}
      />
      <PreconstructionDetailLayoutV2 project={preconstructionDetailMock} />
    </div>
  );
}
