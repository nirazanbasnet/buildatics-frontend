import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { preconstructionListProjects } from "../_data";
import { PreconstructionListLayout } from "../_components/preconstruction-list-layout";
import { UseThisButton } from "../_components/use-this-button";
import {
  parsePreconstructionListVariant,
  preconstructionListVariantLinks
} from "../_components/variants";

export default async function PreconstructionListVariant1Page() {
  const cookieStore = await cookies();
  const promoted = parsePreconstructionListVariant(
    cookieStore.get("preconstruction_list_variant")?.value
  );

  return (
    <div>
      <VariantHeader
        designName="Preconstruction List"
        variant="V1"
        subtitle="Table view with status filter, view toggle, and pagination"
        variants={preconstructionListVariantLinks}
        activeVariant="v1"
        promotedVariant={promoted}
        action={<UseThisButton variant="v1" />}
      />
      <PreconstructionListLayout projects={preconstructionListProjects} />
    </div>
  );
}
