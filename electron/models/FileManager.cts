import fs from "fs";
import path from "path";

// 檔案管理模組
export const FileManager = {
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
    return JSON.parse(content);
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
