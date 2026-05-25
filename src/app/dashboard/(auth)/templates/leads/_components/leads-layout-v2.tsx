"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import type { Lead } from "../_data";

import { LeadsKanbanV2 } from "./leads-kanban-v2";
import { LeadsPagination } from "./leads-pagination";
import { LeadsTableV2 } from "./leads-table-v2";
import { LeadsToolbar, type LeadsView } from "./leads-toolbar";

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
  leads: Lead[];
  className?: string;
};

export function LeadsLayoutV2({ leads, className }: Props) {
  const [view, setView] = useState<LeadsView>("list");

  return (
    <div className={cn("space-y-1", className)}>
      <Section>
        <LeadsToolbar view={view} onViewChange={setView} />
      </Section>
      <Section delay={0.04}>
        {view === "list" ? <LeadsTableV2 leads={leads} /> : <LeadsKanbanV2 leads={leads} />}
      </Section>
      {view === "list" ? (
        <Section delay={0.08}>
          <LeadsPagination />
        </Section>
      ) : null}
    </div>
  );
}
