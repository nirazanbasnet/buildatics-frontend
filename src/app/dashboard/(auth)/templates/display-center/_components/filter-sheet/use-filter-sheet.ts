"use client";

import * as React from "react";

import { DEFAULT_FILTER, type FilterState } from "./types";

export function useFilterSheet() {
  const [open, setOpen] = React.useState(false);
  const [applied, setApplied] = React.useState<FilterState>(DEFAULT_FILTER);
  const [working, setWorking] = React.useState<FilterState>(DEFAULT_FILTER);

  function handleOpenChange(next: boolean) {
    if (next) setWorking(applied);
    setOpen(next);
  }

  function cancel() {
    setWorking(applied);
    setOpen(false);
  }

  function reset() {
    setWorking(DEFAULT_FILTER);
  }

  function apply() {
    setApplied(working);
    setOpen(false);
  }

  return {
    open,
    working,
    setWorking,
    handleOpenChange,
    cancel,
    reset,
    apply
  };
}
