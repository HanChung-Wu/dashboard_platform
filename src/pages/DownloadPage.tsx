// src/pages/DownloadPage.tsx
import React from "react";
import { PageWrapper } from "../components/layout/PageWrapper";
import { tocMap } from "../routes/tocMap";
import type { TocItem } from "../types";

const tocItems: TocItem[] = tocMap["/download"] || [];

export const DownloadPage: React.FC = () => {
  return (
    <PageWrapper
      tocItems={tocItems}
      breadcrumbItems={[{ label: "下載報表", path: "/download" }]}
      content={<div>DownloadPage</div>}
    />
  );
};
