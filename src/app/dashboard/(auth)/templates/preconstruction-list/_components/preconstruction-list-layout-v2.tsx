"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import type { PreconstructionListProject } from "../_data";

import { PreconstructionListCardsV2 } from "./preconstruction-list-cards-v2";
import { PreconstructionListPagination } from "./preconstruction-list-pagination";
import { PreconstructionListTableV2 } from "./preconstruction-list-table-v2";
import {
  PreconstructionListToolbar,
  type PreconstructionListView
} from "./preconstruction-list-toolbar";

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
  projects: PreconstructionListProject[];
  className?: string;
};

export function PreconstructionListLayoutV2({ projects, className }: Props) {
  const [view, setView] = useState<PreconstructionListView>("list");

  return (
    <div className={cn("space-y-1", className)}>
      <Section>
        <PreconstructionListToolbar view={view} onViewChange={setView} />
      </Section>
      <Section delay={0.04}>
        {view === "list" ? (
          <PreconstructionListTableV2 projects={projects} />
        ) : (
          <PreconstructionListCardsV2 projects={projects} />
        )}
      </Section>
      <Section delay={0.08}>
        <PreconstructionListPagination />
      </Section>
    </div>
  );
}
