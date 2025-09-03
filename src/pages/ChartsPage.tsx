// src/pages/ChartsPage.tsx
import { PageWrapper } from "../components/layout/PageWrapper";

export const ChartsPage = () => {
  return (
    <PageWrapper
      breadcrumbItems={[{ label: "圖表列表", path: "/charts" }]}
      content={<div>ChartsPage</div>}
    />
  );
};
