export type DocumentStatus = "issued" | "received";

export const documentStatusConfig: Record<DocumentStatus, { label: string; badge: string }> = {
  issued: {
    label: "Issued",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
  },
  received: {
    label: "Received",
    badge: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300"
  }
};

export type BusinessDocument = {
  id: string;
  fileName: string;
  status: DocumentStatus;
  uploadedBy: string;
  uploadedOn: string;
};

const statusSequence: DocumentStatus[] = [
  "issued",
  "received",
  "issued",
  "received",
  "issued",
  "received",
  "issued",
  "received",
  "received"
];

export const businessDocuments: BusinessDocument[] = statusSequence.map((status, i) => ({
  id: `doc-${String(i + 1).padStart(3, "0")}`,
  fileName: "file_name",
  status,
  uploadedBy: "staff_name",
  uploadedOn: "uploaded_date"
}));
