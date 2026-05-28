"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { quotationDetailMock, type QuotationDetail } from "../../quotation-detail/_data";
import { QuotationDetailSheet } from "../../quotation-detail/_components/quotation-detail-sheet";
import type { Quotation } from "../_data";

import { QuotationPagination } from "./quotation-pagination";
import { QuotationTable } from "./quotation-table";
import { QuotationToolbar } from "./quotation-toolbar";

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

function toDetail(quotation: Quotation): QuotationDetail {
  return {
    ...quotationDetailMock,
    id: quotation.id,
    client: quotation.client,
    design: quotation.attachedDesign,
    siteAddress: quotation.siteAddress,
    status: quotation.status === "signed" ? "signed" : "draft"
  };
}

type Props = {
  quotations: Quotation[];
  className?: string;
  detailEnabled?: boolean;
};

export function QuotationLayout({ quotations, className, detailEnabled }: Props) {
  const [selected, setSelected] = useState<Quotation | null>(null);
  const handleQuotationClick = detailEnabled ? setSelected : undefined;

  return (
    <>
      <div className={cn("space-y-1", className)}>
        <Section>
          <QuotationToolbar />
        </Section>
        <Section delay={0.04}>
          <QuotationTable quotations={quotations} onQuotationClick={handleQuotationClick} />
        </Section>
        <Section delay={0.08}>
          <QuotationPagination />
        </Section>
      </div>
      {detailEnabled && selected ? (
        <QuotationDetailSheet
          open
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
          detail={toDetail(selected)}
        />
      ) : null}
    </>
  );
}
