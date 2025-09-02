// src/pages/DataTablesPage.tsx
import { PageWrapper } from "../components/layout/PageWrapper";

export const DataTablesPage = () => {
  return (
    <PageWrapper
      breadcrumbItems={[{ label: "資料表格列表", path: "/data-tables" }]}
      content={<div>DataTablesPage</div>}
    />
  );
};
