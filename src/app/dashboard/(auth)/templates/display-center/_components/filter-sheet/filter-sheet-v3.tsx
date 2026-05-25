"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { BathIcon, BedIcon, CarIcon, HomeIcon, RulerIcon, XIcon } from "lucide-react";

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

export function FilterSheetV3({ trigger }: Props) {
  const { open, working, setWorking, handleOpenChange, cancel, reset, apply } = useFilterSheet();

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="bg-muted/30 w-full gap-0 p-0 sm:max-w-md"
      >
        <div className="bg-background border-border flex items-center justify-between border-b px-6 py-4">
          <SheetTitle className="text-lg font-semibold">Filter</SheetTitle>
          <Button variant="ghost" size="icon-sm" onClick={cancel} aria-label="Close filter">
            <XIcon className="size-4" />
          </Button>
        </div>
        <SheetDescription className="sr-only">
          Filter Display Center homes with icon cards.
        </SheetDescription>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          <Card icon={<HomeIcon className="size-4" />} title="House Area">
            <HouseAreaSlider
              value={working.houseArea}
              onChange={(v) => setWorking((s) => ({ ...s, houseArea: v }))}
            />
          </Card>

          <Card icon={<RulerIcon className="size-4" />} title="Min Block Depth">
            <ChipRow
              options={BLOCK_OPTIONS}
              value={working.minBlockDepth}
              onChange={(v) => setWorking((s) => ({ ...s, minBlockDepth: v }))}
            />
          </Card>

          <Card icon={<RulerIcon className="size-4 rotate-90" />} title="Min Block Width">
            <ChipRow
              options={BLOCK_OPTIONS}
              value={working.minBlockWidth}
              onChange={(v) => setWorking((s) => ({ ...s, minBlockWidth: v }))}
            />
          </Card>

          <Card icon={<BedIcon className="size-4" />} title="Bedrooms">
            <ChipRow
              options={COUNT_OPTIONS}
              value={working.bedrooms}
              onChange={(v) => setWorking((s) => ({ ...s, bedrooms: v }))}
            />
          </Card>

          <Card icon={<BathIcon className="size-4" />} title="Baths">
            <ChipRow
              options={COUNT_OPTIONS}
              value={working.baths}
              onChange={(v) => setWorking((s) => ({ ...s, baths: v }))}
            />
          </Card>

          <Card icon={<CarIcon className="size-4" />} title="Garage">
            <ChipRow
              options={GARAGE_OPTIONS}
              value={working.garage}
              onChange={(v) => setWorking((s) => ({ ...s, garage: v }))}
            />
          </Card>
        </div>

        <FilterActions onReset={reset} onCancel={cancel} onApply={apply} />
      </SheetContent>
    </Sheet>
  );
}

function Card({
  icon,
  title,
  children
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border-border rounded-lg border p-4 shadow-xs">
      <div className="text-foreground mb-3 flex items-center gap-2 text-sm font-medium">
        <span className="text-muted-foreground">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

type ChipRowProps<T extends string> = {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (next: T) => void;
};

function ChipRow<T extends string>({ options, value, onChange }: ChipRowProps<T>) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "focus-visible:ring-ring inline-flex h-8 min-w-[2.5rem] items-center justify-center rounded-full px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-2",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ValuePill label="Min" value={low} />
        <div className="bg-border h-px flex-1" />
        <ValuePill label="Max" value={high} />
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
        <SliderPrimitive.Track className="bg-muted relative h-1 grow overflow-hidden rounded-full">
          <SliderPrimitive.Range className="bg-primary absolute h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="border-primary ring-ring/50 focus-visible:ring-ring block size-4 rounded-full border-2 bg-white shadow-sm transition-shadow hover:ring-4 focus-visible:ring-4 focus-visible:outline-none" />
        <SliderPrimitive.Thumb className="border-primary ring-ring/50 focus-visible:ring-ring block size-4 rounded-full border-2 bg-white shadow-sm transition-shadow hover:ring-4 focus-visible:ring-4 focus-visible:outline-none" />
      </SliderPrimitive.Root>
    </div>
  );
}

function ValuePill({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-muted text-foreground inline-flex items-baseline gap-1 rounded-md px-2 py-1">
      <span className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
        {label}
      </span>
      <span className="text-sm font-semibold tabular-nums">{value.toFixed(1)}</span>
      <span className="text-muted-foreground text-[10px]">sq</span>
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
