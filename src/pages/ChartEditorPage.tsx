// src/pages/ChartEditorPage.tsx
import { PageWrapper } from "../components/layout/PageWrapper";

export const ChartEditorPage = () => {
  return (
    <PageWrapper
      breadcrumbItems={[{ label: "圖表設定", path: "/chart-edit" }]}
      content={<div>ChartEditorPage</div>}
    />
  );
};
