import type { VariantLink } from "../../_shared/variant-header";

import type { DetailTabVariant } from "./detail-tabs";
import type { DetailLayoutId } from "./layouts/registry";
import type { DetailThemeId } from "./themes";

export type DetailVariantId = "v1" | "v7" | "v10" | "v16";

export type DetailVariantConfig = {
  theme: DetailThemeId;
  tabVariant: DetailTabVariant;
  layout: DetailLayoutId;
};

export const detailVariantConfigs: Record<DetailVariantId, DetailVariantConfig> = {
  v1: { theme: "v1", tabVariant: "pill", layout: "default" },
  v7: { theme: "v1", tabVariant: "segmented", layout: "default" },
  v10: { theme: "v1", tabVariant: "icon-segmented", layout: "editorial-no-facades" },
  v16: { theme: "v1", tabVariant: "icon-segmented", layout: "default" }
};

export const detailVariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/display-center-detail/variant-1" },
  { id: "v7", label: "V7", href: "/dashboard/templates/display-center-detail/variant-7" },
  { id: "v10", label: "V10", href: "/dashboard/templates/display-center-detail/variant-10" },
  { id: "v16", label: "V16", href: "/dashboard/templates/display-center-detail/variant-16" }
];

const validIds = new Set<DetailVariantId>(["v1", "v7", "v10", "v16"]);

export function parseDetailVariant(raw: string | undefined): DetailVariantId {
  return raw && (validIds as Set<string>).has(raw) ? (raw as DetailVariantId) : "v1";
}
