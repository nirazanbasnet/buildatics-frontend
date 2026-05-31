"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { brochureDetailMock, type BrochureDetail } from "../../brochure-detail/_data";
import { BrochureDetailSheet } from "../../brochure-detail/_components/brochure-detail-sheet";
import type { Brochure } from "../_data";

import { BrochuresPagination } from "./brochures-pagination";
import { BrochuresTable } from "./brochures-table";
import { BrochuresToolbar } from "./brochures-toolbar";

function Section({
  children,
  delay = 0,
  className
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("", className)}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function toDetail(brochure: Brochure): BrochureDetail {
  return {
    ...brochureDetailMock,
    id: brochure.id,
    ref: brochure.ref,
    siteAddress: brochure.siteAddress,
    status: brochure.status,
    dateCreated: brochure.createdDate
  };
}

type Props = {
  brochures: Brochure[];
  className?: string;
  detailEnabled?: boolean;
};

export function BrochuresLayout({ brochures, className, detailEnabled }: Props) {
  const [selected, setSelected] = useState<Brochure | null>(null);
  const handleBrochureClick = detailEnabled ? setSelected : undefined;

  return (
    <>
      <div className={cn("flex h-full flex-col space-y-1 overflow-hidden", className)}>
        <Section>
          <BrochuresToolbar />
        </Section>
        <Section delay={0.04} className="flex-1 overflow-auto">
          <BrochuresTable brochures={brochures} onBrochureClick={handleBrochureClick} />
        </Section>
        <Section delay={0.08}>
          <BrochuresPagination />
        </Section>
      </div>
      {detailEnabled && selected ? (
        <BrochureDetailSheet
          open
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
          detail={toDetail(selected)}
        />
      ) : null}
    </>
  );
}
