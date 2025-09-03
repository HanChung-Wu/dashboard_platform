// src/components/DataTablesPage/UploadDataTableDialog.tsx
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const UploadDataTableDialog = ({ open, onClose }: Props) => {
  const [uploadMode, setUploadMode] = useState<"mode1" | "mode2">("mode1");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  // 追蹤拖曳狀態
  const [isDragOver, setIsDragOver] = useState(false);

  const handleCancel = () => {
    if (!uploading) {
      setSelectedFiles([]);
      onClose();
    }
  };

  const fileTypeFilter = (file: File) =>
    uploadMode === "mode1"
      ? file.type === "text/csv" || file.type === "application/json"
      : file.type === "application/json";

  const fileNameRepeatFilter = (file: File) => {
    const existingFileNames = selectedFiles.map((f) => f.name);
    return !existingFileNames.includes(file.name);
  };

  const preprocessFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    return fileArray.filter(fileTypeFilter).filter(fileNameRepeatFilter);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("檔案已添加:", event.target.files);
      setSelectedFiles([
        ...selectedFiles,
        ...preprocessFiles(event.target.files),
      ]);
    }
  };

  const handleUpload = () => {
    // 模擬上傳過程
    setUploading(true);
    console.log(`正在以模式 ${uploadMode} 上傳以下檔案:`, selectedFiles);

    setTimeout(() => {
      setUploading(false);
      onClose();
      // 這裡可以根據上傳檔案數量，執行不同的導航或通知邏輯
      if (selectedFiles.length === 1) {
        console.log("單一檔案上傳，導航至上傳資料表格頁面...");
        // 實際應用中，這裡會使用 useNavigate
      } else {
        console.log("多個檔案上傳，返回資料表格列表頁...");
        // 實際應用中，這裡會顯示成功/失敗通知
      }
      setSelectedFiles([]); // 清空已選擇的檔案
    }, 2000);
  };

  // 拖曳事件處理器
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    if (event.dataTransfer?.files) {
      console.log("檔案已拖放:", event.dataTransfer.files);
      setSelectedFiles([
        ...selectedFiles,
        ...preprocessFiles(event.dataTransfer.files),
      ]);
    }
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>上傳資料表格</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" gutterBottom>
          上傳模式
        </Typography>
        <RadioGroup
          row
          value={uploadMode}
          onChange={(e) => setUploadMode(e.target.value as "mode1" | "mode2")}
        >
          <FormControlLabel
            value="mode1"
            control={<Radio />}
            label="模式一：僅上傳資料內容"
          />
          <FormControlLabel
            value="mode2"
            control={<Radio />}
            label="模式二：包含資訊與資料"
          />
        </RadioGroup>

        <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
          上傳檔案
        </Typography>
        <Box
          // 添加拖曳相關的事件監聽
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: "2px dashed #ccc",
            borderColor: isDragOver ? "primary.main" : "#ccc", // 拖曳時改變邊框顏色
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            cursor: "pointer",
            bgcolor: isDragOver ? "action.hover" : "#f9f9f9", // 拖曳時改變背景顏色
            transition: "all 0.3s ease-in-out",
          }}
          onClick={() => document.getElementById("file-upload-input")?.click()}
        >
          <CloudUploadIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography>拖曳檔案到此處，或點擊上傳</Typography>
          <input
            id="file-upload-input"
            type="file"
            multiple
            hidden
            onChange={handleFileChange}
            accept={
              uploadMode === "mode1"
                ? "text/csv, application/json"
                : "application/json"
            }
          />
        </Box>
        {selectedFiles.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              已選擇檔案:
            </Typography>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </Box>
        )}
        {uploading && <LinearProgress sx={{ mt: 2 }} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} disabled={uploading}>
          取消
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          disabled={selectedFiles.length === 0 || uploading}
        >
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
};
