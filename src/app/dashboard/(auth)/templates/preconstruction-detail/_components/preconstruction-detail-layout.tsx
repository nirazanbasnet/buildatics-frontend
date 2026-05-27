"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import {
  preconstructionDetailTabs,
  type PreconstructionDetailProject,
  type PreconstructionDetailTab
} from "../_data";

import { DocumentsV1 } from "./documents-v1";
import { ItiPreconstructionV1 } from "./iti-preconstruction-v1";
import { PreconstructionDetailOverview } from "./preconstruction-detail-overview";
import { PreconstructionDetailTabs } from "./preconstruction-detail-tabs";
import { PreconstructionTasks } from "./preconstruction-tasks";
import { PreconstructionTimeline } from "./preconstruction-timeline";

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
  project: PreconstructionDetailProject;
  className?: string;
};

export function PreconstructionDetailLayout({ project, className }: Props) {
  const [activeTab, setActiveTab] = useState<PreconstructionDetailTab>(
    preconstructionDetailTabs[0]
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Section>
        <PreconstructionDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </Section>
      <Section delay={0.04}>
        {activeTab === "Overview" ? (
          <PreconstructionDetailOverview project={project} />
        ) : activeTab === "ITI Preconstruction" ? (
          <ItiPreconstructionV1 project={project} />
        ) : activeTab === "Tasks" ? (
          <PreconstructionTasks project={project} />
        ) : activeTab === "Documents" ? (
          <DocumentsV1 project={project} />
        ) : activeTab === "Timeline" ? (
          <PreconstructionTimeline project={project} />
        ) : (
          <div className="text-muted-foreground rounded-md border border-dashed py-12 text-center text-sm">
            {activeTab} — to be designed
          </div>
        )}
      </Section>
    </div>
  );
}
