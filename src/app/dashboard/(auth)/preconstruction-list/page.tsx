import { cookies } from "next/headers";

// eslint-disable-next-line no-restricted-imports -- importing from src/app/.../templates/ route segment (not the top-level /templates playground). Until shared components are promoted to src/components/, the production preconstruction-list page sources its layout from this iteration location.
import { preconstructionListProjects } from "../templates/preconstruction-list/_data";
// eslint-disable-next-line no-restricted-imports -- see note above
import { PreconstructionListLayout } from "../templates/preconstruction-list/_components/preconstruction-list-layout";
// eslint-disable-next-line no-restricted-imports -- see note above
import { PreconstructionListLayoutV2 } from "../templates/preconstruction-list/_components/preconstruction-list-layout-v2";
// eslint-disable-next-line no-restricted-imports -- see note above
import { parsePreconstructionListVariant } from "../templates/preconstruction-list/_components/variants";

export default async function PreconstructionListPage() {
  const cookieStore = await cookies();
  const variant = parsePreconstructionListVariant(
    cookieStore.get("preconstruction_list_variant")?.value
  );

  return variant === "v2" ? (
    <PreconstructionListLayoutV2 projects={preconstructionListProjects} />
  ) : (
    <PreconstructionListLayout projects={preconstructionListProjects} />
  );
}
