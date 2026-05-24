import { Check, MinusCircle, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

import type { PreconstructionCategory, PreconstructionCategoryStatus } from "../_data";

const statusStyles: Record<PreconstructionCategoryStatus, { wrapper: string; icon: typeof Check }> =
  {
    done: {
      wrapper: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      icon: Check
    },
    "in-progress": {
      wrapper: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
      icon: MoreHorizontal
    },
    pending: {
      wrapper: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
      icon: MinusCircle
    }
  };

type Props = {
  categories: PreconstructionCategory[];
};

export function PreconstructionDetailCategoryProgress({ categories }: Props) {
  return (
    <section className="bg-card rounded-2xl border p-5">
      <h3 className="text-foreground text-base font-semibold">Category Progress</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {categories.map((category) => {
          const { wrapper, icon: Icon } = statusStyles[category.status];
          return (
            <li key={category.id} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full",
                  wrapper
                )}
              >
                <Icon className="size-4" />
              </span>
              <span className="text-foreground flex-1 text-sm font-medium">{category.label}</span>
              <span className="text-muted-foreground text-sm tabular-nums">
                {category.completed}/{category.total}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
