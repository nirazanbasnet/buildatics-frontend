"use client";

import { motion } from "motion/react";
import { BedDouble, Box, Home, Ruler, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { detailDescription, detailSpecs } from "../../_data";
import { DetailTabs } from "../detail-tabs";
import { FloorPlanPanel } from "../floor-plan-panel";
import { RoomDimensionsTable } from "../room-dimensions-table";

import type { LayoutProps } from "./registry";

const SPEC_ICONS: LucideIcon[] = [Ruler, Box, Home];

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  className
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col gap-3 p-4", className)}>
      <Icon className="text-muted-foreground size-5" />
      <div className="space-y-1">
        <div className="font-display text-xl sm:text-2xl">{value}</div>
        <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          {label}
        </div>
      </div>
    </Card>
  );
}

export function LayoutEditorialNoFacades({ property, theme, tabVariant, className }: LayoutProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <Section>
        <DetailTabs variant={tabVariant} />
      </Section>

      <Section delay={0.04}>
        <div className="space-y-2">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">{property.title}</h2>
          <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
            {detailDescription}
          </p>
        </div>
      </Section>

      <Section delay={0.08}>
        <FloorPlanPanel
          property={property}
          className={cn("min-h-72 sm:min-h-[28rem]", theme.panel)}
        />
      </Section>

      <Section delay={0.12}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {detailSpecs.map((spec, i) => (
            <StatCard
              key={spec.label}
              icon={SPEC_ICONS[i]}
              value={spec.value}
              label={spec.label}
              className={theme.card}
            />
          ))}
          <StatCard
            icon={BedDouble}
            value={`${property.beds} / ${property.baths}`}
            label="Beds / Baths"
            className={theme.card}
          />
        </div>
      </Section>

      <Section delay={0.16}>
        <RoomDimensionsTable className={theme.card} headerClassName={theme.cardHeader} />
      </Section>
    </div>
  );
}
