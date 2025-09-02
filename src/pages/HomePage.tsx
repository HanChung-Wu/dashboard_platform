// src/pages/HomePage.tsx
import { PageWrapper } from "../components/layout/PageWrapper";

export const HomePage = () => {
  return (
    <PageWrapper
      breadcrumbItems={[{ label: "首頁", path: "/" }]}
      content={<div>歡迎使用資料視覺化儀表板</div>}
    />
  );
};
