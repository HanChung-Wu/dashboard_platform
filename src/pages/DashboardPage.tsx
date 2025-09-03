// src/pages/DashboardPage.tsx
import { Typography } from "@mui/material";
import { PageWrapper } from "../components/layout/PageWrapper";

export const DashboardPage = () => {
  return (
    <PageWrapper
      breadcrumbItems={[{ label: "儀表板", path: "/dashboard" }]}
      content={<div>儀表板主內容區塊</div>}
      rightPanelContent={
        <div>
          <Typography variant="h6">儀表板右側內容</Typography>
          <p>這裡可以放圖表設定、說明、連結等。</p>
        </div>
      }
    />
  );
};
