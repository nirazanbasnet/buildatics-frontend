"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import type { Brochure } from "../_data";

import { BrochuresPagination } from "./brochures-pagination";
import { BrochuresTable } from "./brochures-table";
import { BrochuresToolbar } from "./brochures-toolbar";

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

type Props = {
  brochures: Brochure[];
  className?: string;
};

export function BrochuresLayout({ brochures, className }: Props) {
  return (
    <div className={cn("space-y-1", className)}>
      <Section>
        <BrochuresToolbar />
      </Section>
      <Section delay={0.04}>
        <BrochuresTable brochures={brochures} />
      </Section>
      <Section delay={0.08}>
        <BrochuresPagination />
      </Section>
    </div>
  );
}
