import { BarChart3, Clock, DollarSign, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { PreconstructionDetailProject } from "../_data";

type StatCardProps = {
  label: string;
  value: string;
  valueSuffix?: string;
  caption?: React.ReactNode;
  icon: LucideIcon;
};

function StatCard({ label, value, valueSuffix, caption, icon: Icon }: StatCardProps) {
  return (
    <article className="bg-card flex flex-col gap-3 rounded-2xl border p-5">
      <header className="flex items-start justify-between gap-3">
        <p className="text-muted-foreground text-sm">{label}</p>
        <span className="bg-muted text-foreground flex size-9 shrink-0 items-center justify-center rounded-full">
          <Icon className="size-4" />
        </span>
      </header>
      <p className="text-foreground text-3xl font-bold tracking-tight">
        {value}
        {valueSuffix ? (
          <span className="text-foreground/80 ml-1 text-lg font-semibold">{valueSuffix}</span>
        ) : null}
      </p>
      {caption ? <div className="text-muted-foreground text-sm">{caption}</div> : null}
    </article>
  );
}

type Props = {
  project: PreconstructionDetailProject;
};

export function PreconstructionDetailStats({ project }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StatCard
        label="Progress"
        value={String(project.progress)}
        valueSuffix="%"
        icon={BarChart3}
        caption={
          <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="h-full rounded-full bg-blue-500 dark:bg-blue-400"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        }
      />
      <StatCard
        label="Total Budget"
        value={project.totalBudget}
        icon={DollarSign}
        caption={`Spent ${project.spent}`}
      />
      <StatCard
        label="Timeline"
        value={project.timeline}
        icon={Clock}
        caption={project.timelineDate}
      />
      <StatCard label="Stage" value={project.stage} icon={Settings} caption={project.stageStatus} />
    </div>
  );
}
