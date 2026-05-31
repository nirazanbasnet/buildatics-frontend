"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import type { Lead } from "../_data";

import { LeadsKanban } from "./leads-kanban";
import { LeadsPagination } from "./leads-pagination";
import { LeadsTable } from "./leads-table";
import { LeadsToolbar, type LeadsView } from "./leads-toolbar";

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

type Props = {
  leads: Lead[];
  className?: string;
};

export function LeadsLayout({ leads, className }: Props) {
  const [view, setView] = useState<LeadsView>("list");

  return (
    <div className={cn("flex flex-col space-y-1 overflow-hidden", className)}>
      <Section>
        <LeadsToolbar view={view} onViewChange={setView} />
      </Section>
      <Section delay={0.04} className="flex-1 overflow-auto">
        {view === "list" ? <LeadsTable leads={leads} /> : <LeadsKanban leads={leads} />}
      </Section>
      {view === "list" ? (
        <Section delay={0.08}>
          <LeadsPagination />
        </Section>
      ) : null}
    </div>
  );
}
