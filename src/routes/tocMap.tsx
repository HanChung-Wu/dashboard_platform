// src/routes/tocMap.ts
import {
  BarChart,
  BugReport,
  Dashboard,
  Download,
  UploadFile,
} from "@mui/icons-material";
import type { TocItem } from "../types";

export const tocMap: Record<string, TocItem[]> = {
  "/": [
    { label: "上傳資料", path: "/upload", icon: <UploadFile /> },
    { label: "圖表設定", path: "/chart-config", icon: <BarChart /> },
    { label: "儀表板", path: "/dashboard", icon: <Dashboard /> },
    { label: "下載報表", path: "/download", icon: <Download /> },
    { label: "測試頁", path: "/testing", icon: <BugReport /> },
  ],
  "/upload": [
    { label: "上傳資料", path: "/upload", icon: <UploadFile /> },
    { label: "圖表設定", path: "/chart-config", icon: <BarChart /> },
  ],
  "/chart-config": [
    { label: "圖表設定", path: "/chart-config", icon: <BarChart /> },
    { label: "儀表板", path: "/dashboard", icon: <Dashboard /> },
  ],
  "/dashboard": [
    { label: "儀表板", path: "/dashboard", icon: <Dashboard /> },
    { label: "下載報表", path: "/download", icon: <Download /> },
  ],
  "/download": [{ label: "下載報表", path: "/download", icon: <Download /> }],
  "/testing": [
    { label: "上傳資料", path: "/upload", icon: <UploadFile /> },
    {
      label: "圖表設定",
      path: "/chart-config",
      icon: <BarChart />,
      children: [
        { label: "測試1", path: "/chart-config/ttt" },
        { label: "測試2", path: "/chart-config/ttt2" },
      ],
    },
    {
      label: "儀表板",
      path: "/dashboard",
      icon: <Dashboard />,
      children: [
        {
          label: "測試1",
          path: "/dashboard/ttt",
          children: [
            { label: "測試1-1", path: "/dashboard/ttt/test1" },
            {
              label: "測試1-2",
              path: "/dashboard/ttt/test2",
              children: [
                {
                  label: "測試1-2-1",
                  path: "/dashboard/ttt/test2/1",
                  children: [
                    { label: "測試1-2-1-1", path: "/dashboard/ttt/test2/1/1" },
                    { label: "測試1-2-1-2", path: "/dashboard/ttt/test2/1/2" },
                  ],
                },
                { label: "測試1-2-2", path: "/dashboard/ttt/test2/2" },
              ],
            },
          ],
        },
        { label: "測試2", path: "/dashboard/ttt2" },
      ],
    },
    { label: "下載報表", path: "/download", icon: <Download /> },
    { label: "測試頁", path: "/testing", icon: <BugReport /> },
  ],
};
