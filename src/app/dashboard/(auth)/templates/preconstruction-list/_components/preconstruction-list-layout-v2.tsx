"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { preconstructionDetailMock } from "../../preconstruction-detail/_data";
import { PreconstructionDetailSheet } from "../../preconstruction-detail/_components/preconstruction-detail-sheet";
import type { PreconstructionDetailVariantId } from "../../preconstruction-detail/_components/variants";
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
  detailEnabled?: boolean;
  detailVariant?: PreconstructionDetailVariantId;
};

export function PreconstructionListLayoutV2({
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
            <PreconstructionListTableV2 projects={projects} onProjectClick={handleProjectClick} />
          ) : (
            <PreconstructionListCardsV2 projects={projects} onProjectClick={handleProjectClick} />
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
