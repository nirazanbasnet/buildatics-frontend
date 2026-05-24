"use client";

import { useState } from "react";
import { Mail, MapPin, Pencil, Phone, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { PreconstructionDetailOwner } from "../_data";

function OwnerRow({
  icon: Icon,
  label,
  value
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" />
      </span>
      <span className="text-foreground flex-1 text-sm font-medium">{label}</span>
      <span className="text-muted-foreground text-sm">{value}</span>
    </li>
  );
}

type Props = {
  owners: PreconstructionDetailOwner[];
};

export function PreconstructionDetailOwners({ owners }: Props) {
  const [activeId, setActiveId] = useState(owners[0]?.id ?? "");
  const active = owners.find((o) => o.id === activeId) ?? owners[0];

  if (!active) return null;

  return (
    <section className="bg-card rounded-2xl border p-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="bg-muted flex items-center gap-1 rounded-md p-1">
          {owners.map((owner) => {
            const isActive = owner.id === active.id;
            return (
              <button
                key={owner.id}
                type="button"
                onClick={() => setActiveId(owner.id)}
                className={cn(
                  "rounded px-3 py-1 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {owner.label}
              </button>
            );
          })}
        </div>
        <Button variant="outline" size="icon" className="size-9" aria-label="Edit owner">
          <Pencil className="size-4" />
        </Button>
      </header>

      <ul className="mt-5 flex flex-col gap-3">
        <OwnerRow icon={User} label="Name" value={active.name} />
        <OwnerRow icon={MapPin} label="Address" value={active.address} />
        <OwnerRow icon={Mail} label="Email" value={active.email} />
        <OwnerRow icon={Phone} label="Contact" value={active.contact} />
      </ul>
    </section>
  );
}
