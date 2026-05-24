import { cookies } from "next/headers";

// eslint-disable-next-line no-restricted-imports -- importing from src/app/.../templates/ route segment (not the top-level /templates playground). Until shared components are promoted to src/components/, the production display-center page sources its layouts and toolbar from this iteration location.
import { Toolbar } from "../templates/display-center/_components/toolbar";
// eslint-disable-next-line no-restricted-imports -- see note above
import {
  VARIANT_LAYOUTS,
  type VariantId
} from "../templates/display-center/_components/variant-layouts";

function parseVariant(raw: string | undefined): VariantId {
  const n = Number(raw);
  if (n === 1 || n === 5 || n === 6 || n === 7) return n;
  return 1;
}

export default async function DisplayCenterPage({
  searchParams
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const cookieStore = await cookies();
  const variant = parseVariant(cookieStore.get("display_center_variant")?.value);
  const view = (await searchParams).view === "floor" ? "floor" : "facade";
  const Layout = VARIANT_LAYOUTS[variant];

  return (
    <div>
      <Toolbar mode="production" />
      <Layout view={view} />
    </div>
  );
}
