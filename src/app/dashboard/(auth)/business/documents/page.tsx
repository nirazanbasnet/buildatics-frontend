import { businessDocuments } from "./_data";
import { DocumentsPagination } from "./_components/documents-pagination";
import { DocumentsTable } from "./_components/documents-table";
import { DocumentsToolbar } from "./_components/documents-toolbar";

export default function BusinessDocumentsPage() {
  return (
    <div>
      <DocumentsToolbar />
      <DocumentsTable documents={businessDocuments} />
      <DocumentsPagination />
    </div>
  );
}
