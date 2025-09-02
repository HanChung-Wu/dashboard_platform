// src/pages/DataTablesPage.tsx
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PageWrapper } from "../components/layout/PageWrapper";
import type { PageConfig } from "../types";
import { DataTableList } from "../components/DataTablesPage/DataTableList";
import { UploadDataTableDialog } from "../components/DataTablesPage/UploadDataTableDialog";

// 假資料，用於模擬從後端獲取的資料
const fakeDataTables = [
  {
    id: "1",
    name: "銷售數據",
    uploadDate: "2023-10-26",
    fileSize: "1.2 MB",
  },
  {
    id: "2",
    name: "客戶資訊",
    uploadDate: "2023-10-25",
    fileSize: "800 KB",
  },
  {
    id: "3",
    name: "庫存報表",
    uploadDate: "2023-10-24",
    fileSize: "3.5 MB",
  },
];

export const DataTablesPage = () => {
  const [searchText, setSearchText] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  // 根據搜尋關鍵字過濾資料
  const filteredDataTables = fakeDataTables.filter((table) =>
    table.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // 頁面配置
  const pageConfig: Omit<PageConfig, "tocItems"> = {
    breadcrumbItems: [{ label: "資料表格管理", path: "/data-tables" }],
    content: (
      <Box sx={{ p: 3 }}>
        <Grid container alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              資料表格管理
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6 }}
            container
            justifyContent="flex-end"
            spacing={1}
          >
            <Grid>
              <TextField
                label="搜尋表格"
                variant="outlined"
                size="small"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Grid>
            <Grid>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setUploadDialogOpen(true)}
              >
                上傳資料表格
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* 資料表格列表 */}
        <DataTableList dataTables={filteredDataTables} />

        {/* 上傳資料表格對話框 */}
        <UploadDataTableDialog
          open={uploadDialogOpen}
          onClose={() => setUploadDialogOpen(false)}
        />
      </Box>
    ),
  };

  return <PageWrapper {...pageConfig} />;
};
