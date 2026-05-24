"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import type { Property } from "../../display-center/_data";

import { AvailableFacades } from "./available-facades";
import { DetailHeader } from "./detail-header";
import { DetailTabs } from "./detail-tabs";
import { FloorPlanPanel } from "./floor-plan-panel";
import { RoomDimensionsTable } from "./room-dimensions-table";
import { SpecificationsTable } from "./specifications-table";

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

export function DetailLayoutV2({
  property,
  className
}: {
  property: Property;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-5 lg:grid-cols-[180px_1fr]", className)}>
      <Section>
        <DetailTabs orientation="vertical" layoutId="detail-tab-pill-v2" />
      </Section>
      <div className="space-y-5">
        <Section delay={0.04}>
          <DetailHeader property={property} />
        </Section>
        <Section delay={0.08}>
          <div className="grid gap-4 lg:grid-cols-[5fr_4fr]">
            <FloorPlanPanel property={property} />
            <div className="space-y-3">
              <SpecificationsTable />
              <RoomDimensionsTable />
            </div>
          </div>
        </Section>
        <Section delay={0.12}>
          <AvailableFacades property={property} />
        </Section>
      </div>
    </div>
  );
}
