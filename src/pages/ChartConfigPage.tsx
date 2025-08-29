// src/pages/ChartConfigPage.tsx
import React from "react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { tocMap } from "../routes/tocMap";
import type { TocItem } from "../types";

const tocItems: TocItem[] = tocMap["/chart-config"] || [];

export const ChartConfigPage: React.FC = () => {
  return (
    <PageWrapper
      tocItems={tocItems}
      breadcrumb={[{ label: "圖表設定", path: "/chart-config" }]}
      content={<div>ChartConfigPage</div>}
    />
  );
};
