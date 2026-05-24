import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { preconstructionListProjects } from "../_data";
import { PreconstructionListLayoutV2 } from "../_components/preconstruction-list-layout-v2";
import { UseThisButton } from "../_components/use-this-button";
import {
  parsePreconstructionListVariant,
  preconstructionListVariantLinks
} from "../_components/variants";

export default async function PreconstructionListVariant2Page() {
  const cookieStore = await cookies();
  const promoted = parsePreconstructionListVariant(
    cookieStore.get("preconstruction_list_variant")?.value
  );

  return (
    <div>
      <VariantHeader
        designName="Preconstruction List"
        variant="V2"
        subtitle="Card grid with status pill, icon rows, and progress bar"
        variants={preconstructionListVariantLinks}
        activeVariant="v2"
        promotedVariant={promoted}
        action={<UseThisButton variant="v2" />}
      />
      <PreconstructionListLayoutV2 projects={preconstructionListProjects} />
    </div>
  );
}
