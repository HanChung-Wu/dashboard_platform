// src/pages/ChartViewPage.tsx
import { PageWrapper } from "../components/layout/PageWrapper";

export const ChartViewPage = () => {
  return (
    <PageWrapper
      breadcrumbItems={[{ label: "圖表觀看", path: "/chart-view" }]}
      content={<div>ChartViewPage</div>}
    />
  );
};
