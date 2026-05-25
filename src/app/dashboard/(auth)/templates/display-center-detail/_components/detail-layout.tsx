import type { Property } from "../../display-center/_data";

import { layoutComponents } from "./layouts/registry";
import { detailThemes } from "./themes";
import { detailVariantConfigs, type DetailVariantId } from "./variants";

export function DetailLayout({
  property,
  variant = "v1",
  className
}: {
  property: Property;
  variant?: DetailVariantId;
  className?: string;
}) {
  const config = detailVariantConfigs[variant];
  const Layout = layoutComponents[config.layout];
  const theme = detailThemes[config.theme];
  return (
    <Layout
      property={property}
      theme={theme}
      tabVariant={config.tabVariant}
      className={className}
    />
  );
}
