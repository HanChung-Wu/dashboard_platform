// src/pages/UploadPage.tsx
import { PageWrapper } from "../components/layout/PageWrapper";

export const UploadPage = () => {
  return (
    <PageWrapper
      breadcrumbItems={[{ label: "上傳資料", path: "/upload" }]}
      content={<div>這是上傳資料頁面222</div>}
      rightPanelContent={<div>右側說明：如何上傳資料</div>}
    />
  );
};
