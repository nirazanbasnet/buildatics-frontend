"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { preconstructionDetailMock } from "../../preconstruction-detail/_data";
import { PreconstructionDetailSheet } from "../../preconstruction-detail/_components/preconstruction-detail-sheet";
import type { PreconstructionDetailVariantId } from "../../preconstruction-detail/_components/variants";
import type { PreconstructionListProject } from "../_data";

import { PreconstructionListCards } from "./preconstruction-list-cards";
import { PreconstructionListPagination } from "./preconstruction-list-pagination";
import { PreconstructionListTable } from "./preconstruction-list-table";
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
  detailEnabled?: boolean;
  detailVariant?: PreconstructionDetailVariantId;
};

export function PreconstructionListLayout({
  projects,
  className,
  detailEnabled,
  detailVariant
}: Props) {
  const [view, setView] = useState<PreconstructionListView>("list");
  const [selected, setSelected] = useState<PreconstructionListProject | null>(null);

  const handleProjectClick = detailEnabled ? setSelected : undefined;

  return (
    <>
      <div className={cn("space-y-1", className)}>
        <Section>
          <PreconstructionListToolbar view={view} onViewChange={setView} />
        </Section>
        <Section delay={0.04}>
          {view === "list" ? (
            <PreconstructionListTable projects={projects} onProjectClick={handleProjectClick} />
          ) : (
            <PreconstructionListCards projects={projects} onProjectClick={handleProjectClick} />
          )}
        </Section>
        <Section delay={0.08}>
          <PreconstructionListPagination />
        </Section>
      </div>
      {detailEnabled && selected ? (
        <PreconstructionDetailSheet
          open
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
          project={{
            ...preconstructionDetailMock,
            id: selected.id,
            projectNo: selected.projectNo,
            address: selected.address
          }}
          variant={detailVariant}
        />
      ) : null}
    </>
  );
}
