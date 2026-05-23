import { cookies } from "next/headers";

import { Toolbar } from "../templates/display-center/_components/toolbar";
import {
  VARIANT_LAYOUTS,
  type VariantId
} from "../templates/display-center/_components/variant-layouts";

function parseVariant(raw: string | undefined): VariantId {
  const n = Number(raw);
  if (n === 1 || n === 2 || n === 3 || n === 4 || n === 5) return n;
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
