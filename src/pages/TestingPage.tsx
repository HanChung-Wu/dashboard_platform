// src/pages/DashboardPage.tsx
import { Typography } from "@mui/material";
import { PageWrapper } from "../components/layout/PageWrapper";
import { useLayoutContext } from "../context/useLayoutContext";
import { tocMap } from "../routes/tocMap";
import type { TocItem } from "../types";

const tocItems: TocItem[] = tocMap["/testing"] || [];

export const TestingPage: React.FC = () => {
  const { toggleRightPanelEnabled, setTocItems } = useLayoutContext();
  return (
    <PageWrapper
      tocItems={tocItems}
      breadcrumbItems={[
        { label: "測試1", path: "/testing1" },
        { label: "測試2", path: "/testing2" },
        { label: "測試3", path: "/testing3" },
        { label: "測試4", path: "/testing4" },
        { label: "測試5", path: "/testing5" },
      ]}
      content={
        <div>
          主內容區塊
          <button
            onClick={() => {
              toggleRightPanelEnabled();
            }}
          >
            測試用:右側邊欄開關
          </button>
          <button
            onClick={() => {
              setTocItems([...tocItems, { label: "測試用", path: "/test" }]);
            }}
          >
            測試用:加入目錄
          </button>
        </div>
      }
      rightPanelContent={
        <div>
          <Typography variant="h6">儀表板右側內容</Typography>
          <p>這裡可以放圖表設定、說明、連結等。</p>
        </div>
      }
    />
  );
};
