import { Toolbar } from "../_components/toolbar";
import { Variant2Layout } from "../_components/variant-layouts";

export default async function DisplayCenterVariant2({
  searchParams
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const view = (await searchParams).view === "floor" ? "floor" : "facade";
  return (
    <div>
      <Toolbar activeVariant={2} />
      <Variant2Layout view={view} />
    </div>
  );
}
