import type { ComponentType } from "react";

import type { Property } from "../../../display-center/_data";

import type { DetailTabVariant } from "../detail-tabs";
import type { DetailTheme } from "../themes";

import { LayoutDefault } from "./layout-default";
import { LayoutEditorial } from "./layout-editorial";
import { LayoutEditorialNoFacades } from "./layout-editorial-no-facades";

export type DetailLayoutId = "default" | "editorial" | "editorial-no-facades";

export type LayoutProps = {
  property: Property;
  theme: DetailTheme;
  tabVariant: DetailTabVariant;
  className?: string;
};

export type LayoutComponent = ComponentType<LayoutProps>;

export const layoutComponents: Record<DetailLayoutId, LayoutComponent> = {
  default: LayoutDefault,
  editorial: LayoutEditorial,
  "editorial-no-facades": LayoutEditorialNoFacades
};
