"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  BLOCK_OPTIONS,
  COUNT_OPTIONS,
  GARAGE_OPTIONS,
  HOUSE_AREA_MAX,
  HOUSE_AREA_MIN,
  type FilterState
} from "./types";
import { useFilterSheet } from "./use-filter-sheet";

type Props = {
  trigger: React.ReactNode;
};

export function FilterSheetV2({ trigger }: Props) {
  const { open, working, setWorking, handleOpenChange, cancel, reset, apply } = useFilterSheet();

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" showCloseButton={false} className="w-full gap-0 p-0 sm:max-w-md">
        <div className="border-border flex items-center justify-between border-b px-6 py-5">
          <SheetTitle className="text-xl font-semibold">Filter</SheetTitle>
          <Button variant="ghost" size="icon-sm" onClick={cancel} aria-label="Close filter">
            <XIcon className="size-4" />
          </Button>
        </div>
        <SheetDescription className="sr-only">
          Filter Display Center homes with segmented controls.
        </SheetDescription>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <Section title="House Area">
            <HouseAreaSlider
              value={working.houseArea}
              onChange={(v) => setWorking((s) => ({ ...s, houseArea: v }))}
            />
          </Section>

          <Section title="Min Block Depth">
            <SegmentedRow
              options={BLOCK_OPTIONS}
              value={working.minBlockDepth}
              onChange={(v) => setWorking((s) => ({ ...s, minBlockDepth: v }))}
            />
          </Section>

          <Section title="Min Block Width">
            <SegmentedRow
              options={BLOCK_OPTIONS}
              value={working.minBlockWidth}
              onChange={(v) => setWorking((s) => ({ ...s, minBlockWidth: v }))}
            />
          </Section>

          <Section title="Bedrooms">
            <SegmentedRow
              options={COUNT_OPTIONS}
              value={working.bedrooms}
              onChange={(v) => setWorking((s) => ({ ...s, bedrooms: v }))}
            />
          </Section>

          <Section title="Baths">
            <SegmentedRow
              options={COUNT_OPTIONS}
              value={working.baths}
              onChange={(v) => setWorking((s) => ({ ...s, baths: v }))}
            />
          </Section>

          <Section title="Garage">
            <SegmentedRow
              options={GARAGE_OPTIONS}
              value={working.garage}
              onChange={(v) => setWorking((s) => ({ ...s, garage: v }))}
            />
          </Section>
        </div>

        <FilterActions onReset={reset} onCancel={cancel} onApply={apply} />
      </SheetContent>
    </Sheet>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        {title}
      </h3>
      {children}
    </div>
  );
}

type SegmentedRowProps<T extends string> = {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (next: T) => void;
};

function SegmentedRow<T extends string>({ options, value, onChange }: SegmentedRowProps<T>) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onChange(v as T)}
      variant="outline"
      className="w-full"
    >
      {options.map((opt) => (
        <ToggleGroupItem
          key={opt.value}
          value={opt.value}
          className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary flex-1"
        >
          {opt.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

function HouseAreaSlider({
  value,
  onChange
}: {
  value: FilterState["houseArea"];
  onChange: (v: FilterState["houseArea"]) => void;
}) {
  const [low, high] = value;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-foreground text-2xl font-semibold tabular-nums">
          {low.toFixed(1)}
          <span className="text-muted-foreground ml-1 text-sm font-normal">sq</span>
        </span>
        <span className="text-muted-foreground text-sm">to</span>
        <span className="text-foreground text-2xl font-semibold tabular-nums">
          {high.toFixed(1)}
          <span className="text-muted-foreground ml-1 text-sm font-normal">sq</span>
        </span>
      </div>

      <SliderPrimitive.Root
        value={value}
        min={HOUSE_AREA_MIN}
        max={HOUSE_AREA_MAX}
        step={0.1}
        minStepsBetweenThumbs={1}
        onValueChange={(v) => onChange([v[0], v[1]] as [number, number])}
        className="relative flex h-5 w-full touch-none items-center select-none"
      >
        <SliderPrimitive.Track className="bg-muted relative h-1.5 grow overflow-hidden rounded-full">
          <SliderPrimitive.Range className="bg-primary absolute h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="border-primary ring-ring/50 focus-visible:ring-ring block size-5 rounded-full border-2 bg-white shadow-sm transition-shadow hover:ring-4 focus-visible:ring-4 focus-visible:outline-none" />
        <SliderPrimitive.Thumb className="border-primary ring-ring/50 focus-visible:ring-ring block size-5 rounded-full border-2 bg-white shadow-sm transition-shadow hover:ring-4 focus-visible:ring-4 focus-visible:outline-none" />
      </SliderPrimitive.Root>

      <div className="text-muted-foreground flex justify-between text-xs tabular-nums">
        <span>{HOUSE_AREA_MIN} sq</span>
        <span>{HOUSE_AREA_MAX} sq</span>
      </div>
    </div>
  );
}

function FilterActions({
  onReset,
  onCancel,
  onApply
}: {
  onReset: () => void;
  onCancel: () => void;
  onApply: () => void;
}) {
  return (
    <div className="bg-background border-border flex items-center justify-between gap-2 border-t px-6 py-4">
      <Button variant="ghost" onClick={onReset} className="text-muted-foreground">
        Reset
      </Button>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onApply}>Apply Filter</Button>
      </div>
    </div>
  );
}
