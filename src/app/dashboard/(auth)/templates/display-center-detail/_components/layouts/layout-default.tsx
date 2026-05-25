"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { AvailableFacades } from "../available-facades";
import { DetailHeader } from "../detail-header";
import { DetailTabs } from "../detail-tabs";
import { FloorPlanPanel } from "../floor-plan-panel";
import { RoomDimensionsTable } from "../room-dimensions-table";
import { SpecificationsTable } from "../specifications-table";

import type { LayoutProps } from "./registry";

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

export function LayoutDefault({ property, theme, tabVariant, className }: LayoutProps) {
  return (
    <div className={cn("space-y-5", className)}>
      <Section>
        <DetailTabs variant={tabVariant} />
      </Section>
      <Section delay={0.04}>
        <DetailHeader property={property} className={theme.card} />
      </Section>
      <Section delay={0.08}>
        <div className="grid gap-4 lg:grid-cols-[5fr_4fr]">
          <FloorPlanPanel property={property} className={theme.panel} />
          <div className="space-y-3">
            <SpecificationsTable className={theme.card} headerClassName={theme.cardHeader} />
            <RoomDimensionsTable className={theme.card} headerClassName={theme.cardHeader} />
          </div>
        </div>
      </Section>
      <Section delay={0.12}>
        <AvailableFacades property={property} cardClassName={theme.facadeCard} />
      </Section>
    </div>
  );
}
