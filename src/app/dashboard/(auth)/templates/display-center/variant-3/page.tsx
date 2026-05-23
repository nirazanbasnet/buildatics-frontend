import { Toolbar } from "../_components/toolbar";
import { Variant3Layout } from "../_components/variant-layouts";

export default async function DisplayCenterVariant3({
  searchParams
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const view = (await searchParams).view === "floor" ? "floor" : "facade";
  return (
    <div>
      <Toolbar activeVariant={3} />
      <Variant3Layout view={view} />
    </div>
  );
}
