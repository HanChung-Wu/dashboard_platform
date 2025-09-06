// src/pages/DataTableEditorPage.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { PageWrapper } from "../components/layout/PageWrapper";
import EditableTitle from "../components/common/EditableTitle";
import ConfirmCancelButtons from "../components/common/ConfirmCancelButtons";
import DataTable from "../components/common/DataTable";
import PageHeader from "../components/common/PageHeader";
import { useFileParser } from "../hooks/useFileParser";
import { useTableEditor } from "../hooks/useTableEditor";

export const DataTableEditorPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const file: File | null = location.state?.file || null;

  // 使用自定義 hooks
  const { loading, data: parsedData, error } = useFileParser(file);
  const {
    tableName,
    setTableName,
    isEditingName,
    setIsEditingName,
    data,
    handleCellChange,
    updateData,
  } = useTableEditor(null, file?.name.split(".")[0] || "未命名表格");

  // 當解析完成時更新資料
  useEffect(() => {
    if (parsedData) {
      updateData(parsedData);
    }
  }, [parsedData, updateData]);

  const handleConfirm = () => {
    console.log(`確認並儲存表格: ${tableName}`);
    // 這裡可以加入儲存資料到後端的邏輯
    navigate("/data-tables");
  };

  const handleCancel = () => {
    console.log("取消編輯");
    navigate("/data-tables");
  };

  const renderContent = () => {
    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!data) return null;

    return <DataTable data={data} onCellChange={handleCellChange} />;
  };

  const renderHeaderLeftContent = () => {
    if (error) {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4" sx={{ mr: 1, fontWeight: "bold" }}>
            無檔案資料
          </Typography>
        </Box>
      );
    }

    return (
      <EditableTitle
        title={tableName}
        onTitleChange={setTableName}
        isEditing={isEditingName}
        onEditingChange={setIsEditingName}
        label="表格名稱"
        placeholder="請輸入表格名稱"
      />
    );
  };

  const pageConfig = {
    breadcrumbItems: [
      { label: "資料表格管理", path: "/data-tables" },
      { label: "編輯資料表格", path: "" },
    ],
    content: (
      <Box sx={{ p: 3 }}>
        <PageHeader
          headerLeftContent={renderHeaderLeftContent()}
          headerRightContent={
            <ConfirmCancelButtons
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              showConfirm={!error}
            />
          }
        />
        {renderContent()}
      </Box>
    ),
    rightPanelContent: (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">編輯控制面板</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          這裡可以添加欄位類型、篩選、排序等控制項。
        </Typography>
      </Box>
    ),
  };

  return <PageWrapper {...pageConfig} />;
};
