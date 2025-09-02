// src/pages/DashboardsPage.tsx
import { PageWrapper } from "../components/layout/PageWrapper";

export const DashboardsPage = () => {
  return (
    <PageWrapper
      breadcrumbItems={[{ label: "儀表板列表", path: "/dashboards" }]}
      content={<div>DashboardsPage</div>}
      rightPanelContent={<div>DashboardsPage</div>}
    />
  );
};
