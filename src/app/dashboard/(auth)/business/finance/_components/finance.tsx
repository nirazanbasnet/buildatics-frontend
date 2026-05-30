"use client";

import { useState } from "react";

import { SegmentedNav } from "@src/components/ui/segmented-nav";

import { financeTabItems, financeTabs, type FinanceTab } from "../_data";
import { FinanceCashflow } from "./finance-cashflow";
import { FinanceClaims } from "./finance-claims";
import { FinanceOverview } from "./finance-overview";
import { FinancePayables } from "./finance-payables";
import { FinanceProjectPL } from "./finance-project-pl";
import { FinanceStatCards } from "./finance-stat-cards";

export function Finance() {
  const [activeTab, setActiveTab] = useState<FinanceTab>(financeTabs[0]);

  return (
    <div className="space-y-4">
      <FinanceStatCards />
      <SegmentedNav
        items={financeTabItems}
        value={activeTab}
        onValueChange={setActiveTab}
        ariaLabel="Finance views"
      />
      <div>
        {activeTab === "Overview" ? (
          <FinanceOverview />
        ) : activeTab === "Claims" ? (
          <FinanceClaims />
        ) : activeTab === "Payables" ? (
          <FinancePayables />
        ) : activeTab === "Project P & L" ? (
          <FinanceProjectPL />
        ) : (
          <FinanceCashflow />
        )}
      </div>
    </div>
  );
}
