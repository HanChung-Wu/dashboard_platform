// src/pages/DownloadPage.tsx
import { PageWrapper } from "../components/layout/PageWrapper";

export const DownloadPage = () => {
  return (
    <PageWrapper
      breadcrumbItems={[{ label: "下載報表", path: "/download" }]}
      content={<div>DownloadPage</div>}
    />
  );
};
