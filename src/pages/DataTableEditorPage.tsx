// src/pages/DataTableEditorPage.tsx
import { PageWrapper } from "../components/layout/PageWrapper";

export const DataTableEditorPage = () => {
  return (
    <PageWrapper
      breadcrumbItems={[{ label: "資料表格設定", path: "/data-table-edit" }]}
      content={<div>DataTableEditorPage</div>}
    />
  );
};
