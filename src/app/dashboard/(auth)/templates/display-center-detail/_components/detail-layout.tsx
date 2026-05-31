"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { SegmentedNav } from "@src/components/ui/segmented-nav";
import { cn } from "@/lib/utils";

import type { Property } from "../../display-center/_data";
import { detailTabItems, detailTabs, type DetailTab } from "../_data";

import { AvailableFacades } from "./available-facades";
import { DetailHeader } from "./detail-header";
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

export function DetailLayout({ property, className }: { property: Property; className?: string }) {
  const [activeTab, setActiveTab] = useState<DetailTab>(detailTabs[0]);

  return (
    <div className={cn("space-y-5", className)}>
      <Section>
        <SegmentedNav
          items={detailTabItems}
          value={activeTab}
          onValueChange={setActiveTab}
          ariaLabel="Detail views"
        />
      </Section>
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
  );
}
