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
import { cn } from "@/lib/utils";

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

export function FilterSheetV1({ trigger }: Props) {
  const { open, working, setWorking, handleOpenChange, cancel, reset, apply } = useFilterSheet();

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" showCloseButton={false} className="w-full gap-0 p-0 sm:max-w-md">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <SheetTitle className="text-2xl font-semibold tracking-tight">Filter</SheetTitle>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={cancel}
            aria-label="Close filter"
            className="text-muted-foreground hover:text-foreground"
          >
            <XIcon className="size-4" />
          </Button>
        </div>
        <SheetDescription className="sr-only">
          Filter Display Center homes by house area, block dimensions, bedrooms, baths and garage.
        </SheetDescription>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <Section title="House Area">
            <HouseAreaSlider
              value={working.houseArea}
              onChange={(v) => setWorking((s) => ({ ...s, houseArea: v }))}
            />
          </Section>

          <Divider />

          <Section title="Min Block Depth">
            <PillRow
              options={BLOCK_OPTIONS}
              value={working.minBlockDepth}
              onChange={(v) => setWorking((s) => ({ ...s, minBlockDepth: v }))}
            />
          </Section>

          <Divider />

          <Section title="Min Block Width">
            <PillRow
              options={BLOCK_OPTIONS}
              value={working.minBlockWidth}
              onChange={(v) => setWorking((s) => ({ ...s, minBlockWidth: v }))}
            />
          </Section>

          <Divider />

          <Section title="Bedrooms">
            <PillRow
              options={COUNT_OPTIONS}
              value={working.bedrooms}
              onChange={(v) => setWorking((s) => ({ ...s, bedrooms: v }))}
            />
          </Section>

          <Divider />

          <Section title="Baths">
            <PillRow
              options={COUNT_OPTIONS}
              value={working.baths}
              onChange={(v) => setWorking((s) => ({ ...s, baths: v }))}
            />
          </Section>

          <Divider />

          <Section title="Garage">
            <PillRow
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
    <div className="py-5">
      <h3 className="text-foreground mb-4 text-base font-medium">{title}</h3>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="border-border border-t" />;
}

type PillRowProps<T extends string> = {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (next: T) => void;
};

function PillRow<T extends string>({ options, value, onChange }: PillRowProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            data-active={active}
            className={cn(
              "border-border focus-visible:ring-ring inline-flex h-9 min-w-[3.25rem] items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-2",
              active
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
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
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground bg-muted/60 rounded-md px-3 py-1.5 text-xs font-medium tabular-nums">
        {HOUSE_AREA_MIN} sq
      </span>

      <SliderPrimitive.Root
        value={value}
        min={HOUSE_AREA_MIN}
        max={HOUSE_AREA_MAX}
        step={0.1}
        minStepsBetweenThumbs={1}
        onValueChange={(v) => onChange([v[0], v[1]] as [number, number])}
        className="relative flex h-9 flex-1 touch-none items-center select-none"
      >
        <SliderPrimitive.Track className="bg-muted relative h-1.5 grow overflow-hidden rounded-full">
          <SliderPrimitive.Range className="bg-primary absolute h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="border-primary ring-ring/50 focus-visible:ring-ring relative block size-4 rounded-full border bg-white shadow-sm transition-shadow hover:ring-4 focus-visible:ring-4 focus-visible:outline-none" />
        <SliderPrimitive.Thumb className="border-primary ring-ring/50 focus-visible:ring-ring relative block size-4 rounded-full border bg-white shadow-sm transition-shadow hover:ring-4 focus-visible:ring-4 focus-visible:outline-none">
          <span className="bg-primary text-primary-foreground pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap tabular-nums shadow-sm">
            {high.toFixed(1)} sq
          </span>
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>

      <span className="text-muted-foreground bg-muted/60 rounded-md px-3 py-1.5 text-xs font-medium tabular-nums">
        {HOUSE_AREA_MAX} sq
      </span>
      <span className="sr-only" aria-live="polite">
        House area between {low.toFixed(1)} and {high.toFixed(1)} square metres.
      </span>
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
