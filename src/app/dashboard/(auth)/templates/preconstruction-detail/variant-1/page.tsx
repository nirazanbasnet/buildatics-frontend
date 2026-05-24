import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { preconstructionDetailMock } from "../_data";
import { PreconstructionDetailLayout } from "../_components/preconstruction-detail-layout";
import { UseThisButton } from "../_components/use-this-button";
import {
  parsePreconstructionDetailVariant,
  preconstructionDetailVariantLinks
} from "../_components/variants";

export default async function PreconstructionDetailVariant1Page() {
  const cookieStore = await cookies();
  const promoted = parsePreconstructionDetailVariant(
    cookieStore.get("preconstruction_detail_variant")?.value
  );

  return (
    <div>
      <VariantHeader
        designName="Preconstruction Detail"
        variant="V1"
        subtitle="Two-column overview with stat cards, owner tabs, and category sidebar"
        variants={preconstructionDetailVariantLinks}
        activeVariant="v1"
        promotedVariant={promoted}
        action={<UseThisButton variant="v1" />}
      />
      <PreconstructionDetailLayout project={preconstructionDetailMock} />
    </div>
  );
}
