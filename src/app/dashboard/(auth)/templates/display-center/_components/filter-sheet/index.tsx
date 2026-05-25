"use client";

import * as React from "react";

import { FilterSheetV1 } from "./filter-sheet-v1";
import { FilterSheetV2 } from "./filter-sheet-v2";
import { FilterSheetV3 } from "./filter-sheet-v3";

export type FilterVariantId = 1 | 2 | 3;

const REGISTRY = {
  1: FilterSheetV1,
  2: FilterSheetV2,
  3: FilterSheetV3
} as const;

export const FILTER_VARIANT_LABELS: Record<FilterVariantId, string> = {
  1: "Pill",
  2: "Segmented",
  3: "Icon cards"
};

type Props = {
  variant: FilterVariantId;
  trigger: React.ReactNode;
};

export function FilterSheet({ variant, trigger }: Props) {
  const Component = REGISTRY[variant];
  return <Component trigger={trigger} />;
}
