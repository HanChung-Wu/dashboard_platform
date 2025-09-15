import fs from "fs";
import path from "path";
import { userDataPath } from "../constants.cjs";

// 檔案管理模組
export const FileManager = {
  // 取得使用者資料目錄
  getUserDataPath: (...paths: string[]) => {
    const userDataTargetPath = path.join(userDataPath, ...paths);
    FileManager.ensureDirectory(userDataTargetPath);
    return userDataTargetPath;
  },

  // 檢查檔案是否存在
  fileExists: (filePath: string) => {
    return fs.existsSync(filePath);
  },

  // 檢查資料夾是否存在
  directoryExists: (directoryPath: string) => {
    return fs.existsSync(directoryPath);
  },

  // 建立資料夾
  ensureDirectory: (directory: string) => {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  },

  // 儲存檔案
  saveFile: (directory: string, fileName: string, content: unknown) => {
    const filePath = path.join(directory, fileName);
    fs.writeFileSync(filePath, JSON.stringify(content));
    return filePath;
  },

  // 讀取檔案
  readFile: (filePath: string) => {
    if (!fs.existsSync(filePath)) {
      throw new Error(`檔案不存在: ${filePath}`);
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return content;
  },

  // 刪除檔案
  deleteFile: (filePath: string) => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  },

  // 儲存圖片
  saveImage: (directory: string, fileName: string, imageBuffer: Buffer) => {
    const filePath = path.join(directory, fileName);
    fs.writeFileSync(filePath, imageBuffer);
    return filePath;
  },
};
