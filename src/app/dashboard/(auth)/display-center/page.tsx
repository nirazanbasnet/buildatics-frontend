import { cookies } from "next/headers";

// eslint-disable-next-line no-restricted-imports -- importing from src/app/.../templates/ route segment (not the top-level /templates playground). Until shared components are promoted to src/components/, the production display-center page sources its layouts and toolbar from this iteration location.
import { Toolbar } from "../templates/display-center/_components/toolbar";
// eslint-disable-next-line no-restricted-imports -- see note above
import { Variant7Layout } from "../templates/display-center/_components/variant-layouts";
// eslint-disable-next-line no-restricted-imports -- see note above
import { parseDetailVariant } from "../templates/display-center-detail/_components/variants";
// eslint-disable-next-line no-restricted-imports -- see note above
import { parseFilterVariant } from "../templates/display-center-filter/_components/variants";

export default async function DisplayCenterPage({
  searchParams
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const cookieStore = await cookies();
  const detailEnabled = cookieStore.get("display_center_detail_enabled")?.value === "true";
  const detailVariant = parseDetailVariant(cookieStore.get("display_center_detail_variant")?.value);
  const filterEnabled = cookieStore.get("display_center_filter_enabled")?.value === "true";
  const filterVariant = parseFilterVariant(cookieStore.get("display_center_filter_variant")?.value);
  const view = (await searchParams).view === "floor" ? "floor" : "facade";

  return (
    <div>
      <Toolbar mode="production" filterEnabled={filterEnabled} filterVariant={filterVariant} />
      <Variant7Layout view={view} detailEnabled={detailEnabled} detailVariant={detailVariant} />
    </div>
  );
}
