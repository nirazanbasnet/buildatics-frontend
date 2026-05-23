import { Toolbar } from "../_components/toolbar";
import { Variant4Layout } from "../_components/variant-layouts";

export default async function DisplayCenterVariant4({
  searchParams
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const view = (await searchParams).view === "floor" ? "floor" : "facade";
  return (
    <div>
      <Toolbar activeVariant={4} />
      <Variant4Layout view={view} />
    </div>
  );
}
