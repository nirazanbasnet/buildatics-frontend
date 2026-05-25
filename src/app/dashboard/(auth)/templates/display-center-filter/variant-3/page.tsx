import { Toolbar } from "../../display-center/_components/toolbar";
import { Variant1Layout } from "../../display-center/_components/variant-layouts";

export default async function DisplayCenterFilterVariant3({
  searchParams
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const view = (await searchParams).view === "floor" ? "floor" : "facade";
  return (
    <div>
      <Toolbar activeFilterVariant={3} />
      <Variant1Layout view={view} />
    </div>
  );
}
